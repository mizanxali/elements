# Elements — 3D Periodic Table Visualizer

Interactive 3D web app: pick or cycle through any of the 118 chemical elements and see a Bohr-style atom (nucleus + revolving electrons on inclined orbital shells) with a colorful, poppy aesthetic and a clean info panel.

## Stack

- **React 18** + **Vite** + **TypeScript**
- **three** + **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing**
- **Tailwind CSS** + **clsx**

## Workflow

```bash
npm run dev    # served by Vite, http://localhost:5173
```

## File structure

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── data/
│   ├── elements.json           # 118-element dataset (Bowserinator-derived)
│   └── categoryColors.ts
├── types/element.ts
├── state/useElementStore.tsx   # React Context: { selected, setSelected, next, prev }
├── hooks/
│   ├── useSelectedElement.ts
│   └── useKeyboardNav.ts       # ArrowLeft/Right -> prev/next
├── utils/
│   ├── fibonacciSphere.ts      # nucleon packing
│   └── math.ts
└── components/
    ├── layout/{AppShell,Header}.tsx
    ├── periodic/{PeriodicTable,ElementCell,PeriodicDrawer}.tsx
    ├── info/{ElementInfoPanel,ElementCard,CategoryPill,PrevNextControls}.tsx
    └── scene/{AtomScene,Atom,Nucleus,ElectronShell,Electron,SceneEffects}.tsx
```

## Data shape

```ts
type Element = {
  atomicNumber: number;        // 1..118
  symbol: string;              // "Fe"
  name: string;                // "Iron"
  atomicMass: number;
  category: ElementCategory;
  shells: number[];            // [2,8,14,2] — drives the Bohr model
  electronConfig: string;      // "[Ar] 3d6 4s2"
  cpkHex: string;
  summary: string;             // 1–2 sentences
  period: number;
  group: number | null;
  block: 's' | 'p' | 'd' | 'f';
  phase: 'Solid' | 'Liquid' | 'Gas' | 'Unknown';
};
```

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Header: "Elements" wordmark + autorotate toggle              │ 56px
├──────────────────────────────────────┬───────────────────────┤
│   3D Canvas (full bleed)             │  Element Info Panel   │
│   OrbitControls + Bloom              │  symbol + Z + mass    │
│                                      │  category pill        │
│                                      │  shells / config      │
│                                      │  summary              │
│                                      │  [<] prev | next [>]  │
├──────────────────────────────────────┴───────────────────────┤
│ Periodic Table grid (drawer)                                 │ ~280px
│ 18×7 + separated lanthanide / actinide block                 │
└──────────────────────────────────────────────────────────────┘
```

Background: deep navy → violet gradient. Accent = element's category color via `--accent` CSS var on a wrapper.

## Category palette (used in grid + info accent + 3D ring color)

| Category | Hex |
|---|---|
| alkali metal | `#ff6b6b` |
| alkaline earth | `#ffa94d` |
| transition metal | `#ffd43b` |
| post-transition | `#a9e34b` |
| metalloid | `#63e6be` |
| nonmetal / diatomic | `#4dabf7` |
| noble gas | `#b197fc` |
| lanthanide | `#f783ac` |
| actinide | `#e599f7` |
| unknown | `#868e96` |

## Atom rendering rules

**Nucleus** (`scene/Nucleus.tsx`, `utils/fibonacciSphere.ts`)
- Pack `min(protons + neutrons, 30)` small spheres on a Fibonacci sphere at radius `0.6 + log(Z) * 0.15`.
- Protons `#ff4d5e`, neutrons `#c0c4cc`. Slow self-rotation (~0.05 rad/s).
- For high-Z, render a translucent emissive sphere underneath sized to actual nucleon count.

**Electron shells** (`scene/ElectronShell.tsx`, `scene/Electron.tsx`) — for shell `i` in `element.shells`:
- Radius `r_i = 2.0 + i * 1.4`.
- `TorusGeometry(r_i, 0.01, 8, 96)` ring colored to category, opacity 0.35.
- One `<group>` with inclination `rotation.x = (i*0.37) % π`, `rotation.z = (i*0.91) % π`.
- Spawn `shells[i]` electrons evenly + small phase offset.
- `useFrame((_, delta) => groupRef.current.rotation.y += speed * delta)`, `speed = 0.4 + i*0.15`, sign alternates per shell.
- Electrons: emissive `SphereGeometry(0.12)` with category-accent emissive (bloom hero).

**Scene** (`scene/AtomScene.tsx`, `scene/SceneEffects.tsx`)
- `<Canvas camera={{ fov: 50, position: [0,0,18] }}>` with ambient + warm + cool point lights.
- `<OrbitControls enableDamping minDistance={6} maxDistance={40} />`.
- `<EffectComposer><Bloom intensity={0.8} luminanceThreshold={0.2} mipmapBlur /></EffectComposer>`.

## Periodic grid rules

- 18-column CSS grid. Map elements via `gridColumnStart={group}` + `gridRowStart={period}`.
- Lanthanides (57–71) and actinides (89–103) rendered separately below in two rows of 15 with a visual gap.
- Cell: category-color background, big symbol, tiny atomic number top-left. Hover = scale + ring. Selected = ring-2 + brightness 1.2.

## State

`useElementStore` exposes `{ selected, setSelected, next, prev }` clamped to 1..118. ArrowLeft/Right are wired globally via `useKeyboardNav`.

---

## Verification checklist

1. Default selection: Hydrogen.
2. **H (Z=1):** 1 proton, 1 shell, 1 electron. Mass `1.008`, category nonmetal.
3. **He (Z=2):** 2p + 2n nucleus, 1 shell × 2 electrons.
4. **Fe (Z=26):** ~30 capped nucleons + glow; 4 shells `[2, 8, 14, 2]`.
5. **U (Z=92):** 7 shells, no clipping, heavy glow.
6. Prev/Next clamps at 1 and 118.
7. ArrowLeft/Right cycles globally.
8. OrbitControls drag/zoom smooth, ≥60fps low-Z, ≥30fps high-Z.
9. Hover cell scales; click selects + updates 3D + info panel together.
10. Info panel accent color matches grid cell for the same element.
11. Electrons visibly bloom against dark background.
12. Layout holds at 1280px / 1024px / 768px / 375px.

## Out of scope

Search bar, isotopes, real s/p/d/f orbital probability clouds, compare mode, URL routing per element, sound design, element-transition morph animations.
