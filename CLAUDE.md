# Elements — 3D Periodic Table Visualizer

Interactive 3D web app: pick or cycle through any of the 118 chemical elements and see a Bohr-style atom (nucleus + revolving electrons on inclined orbital shells) with a colorful, poppy aesthetic and a clean info panel.

## Stack

- **React 18** + **Vite** + **TypeScript**
- **three** + **@react-three/fiber** + **@react-three/drei** + **@react-three/postprocessing**
- **Tailwind CSS** + **clsx**

## Workflow

The user executes one phase at a time. After each phase, stop and wait. Each phase leaves the project in a runnable, verifiable state.

```bash
npm run dev    # served by Vite, http://localhost:5173
```

## File structure (target)

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

---

## Phases

Execute one at a time. Each phase is self-contained and verifiable.

### Phase 1 — Scaffold & dependencies

- `npm create vite@latest . -- --template react-ts`
- Install: `three @react-three/fiber @react-three/drei @react-three/postprocessing clsx`
- Dev: `tailwindcss postcss autoprefixer @types/three`
- `npx tailwindcss init -p`
- Configure `tailwind.config.ts` (content globs, category color tokens)
- Add Tailwind directives + body gradient to `src/index.css`
- Replace default Vite App with a minimal `App.tsx` showing "Elements" placeholder

**Verify:** `npm run dev` shows the placeholder with the gradient background, no errors.

### Phase 2 — Data & types

- Add `src/data/elements.json` (full 118 elements, Bowserinator-derived; download via `curl` or paste)
- Add `src/types/element.ts` with the `Element` and `ElementCategory` types
- Add `src/data/categoryColors.ts` mapping category → hex

**Verify:** `App.tsx` imports the JSON, asserts `length === 118`, logs Iron's shells. Browser console shows `[2, 8, 14, 2]`.

### Phase 3 — Shell layout, state, keyboard nav

- `src/components/layout/AppShell.tsx` — CSS-grid skeleton with placeholder colored blocks for header / canvas / info panel / periodic drawer
- `src/components/layout/Header.tsx` — wordmark only
- `src/state/useElementStore.tsx` — Context: `{ selected, setSelected, next, prev }` clamped 1..118
- `src/hooks/useKeyboardNav.ts` — wires ArrowLeft/Right to `prev`/`next`
- `src/hooks/useSelectedElement.ts` — derives `Element` from store + JSON

**Verify:** layout renders at full viewport with four visible regions. Pressing arrow keys logs the changing atomic number to console.

### Phase 4 — Periodic table grid

- `src/components/periodic/PeriodicTable.tsx` — CSS grid with 18 cols. Map elements via `gridColumnStart={group}` + `gridRowStart={period}`. Lanthanides (57–71) and actinides (89–103) rendered separately below in two rows of 15 with a visual gap.
- `src/components/periodic/ElementCell.tsx` — button: category color background, big symbol, tiny atomic number top-left. Hover: scale + ring. Selected: ring-2 + brightness 1.2.
- `src/components/periodic/PeriodicDrawer.tsx` — collapsible bottom container

**Verify:** all 118 cells visible in textbook layout. Clicking a cell highlights it and updates the store. Lanth/actin block is visually separated.

### Phase 5 — Element info panel

- `src/components/info/ElementInfoPanel.tsx` — wrapper that sets `--accent` CSS var from category
- `src/components/info/ElementCard.tsx` — symbol (large), atomic number, mass, name, category, shells `[2,8,14,2]`, electron config, summary
- `src/components/info/CategoryPill.tsx`
- `src/components/info/PrevNextControls.tsx` — `<` / `>` buttons, disabled at boundaries

**Verify:** clicking any cell updates the panel. Color accent matches the cell color. Prev/Next clamps at 1 and 118.

### Phase 6 — 3D scene foundation

- `src/components/scene/AtomScene.tsx` — `<Canvas camera={{ fov: 50, position: [0,0,18] }}>` with ambient + warm + cool point lights, `<OrbitControls enableDamping minDistance={6} maxDistance={40} />`
- `src/components/scene/SceneEffects.tsx` — `<EffectComposer><Bloom intensity={0.8} luminanceThreshold={0.2} mipmapBlur /></EffectComposer>`
- Render a temporary placeholder sphere to confirm scene works
- Mount `AtomScene` in `AppShell` center region

**Verify:** placeholder sphere renders, OrbitControls drag/zoom works, bloom visibly glows on the sphere.

### Phase 7 — Atom: nucleus

- `src/utils/fibonacciSphere.ts` — generate N evenly-distributed unit-sphere points
- `src/components/scene/Nucleus.tsx` — pack `min(protons + neutrons, 30)` small spheres at radius `0.6 + log(Z) * 0.15`. Protons `#ff4d5e`, neutrons `#c0c4cc`. For high-Z, render translucent emissive sphere underneath sized to actual nucleon count. Slow self-rotation (~0.05 rad/s).
- `src/components/scene/Atom.tsx` — reads selected element, renders `<Nucleus>`
- Replace placeholder in `AtomScene` with `<Atom>`

**Verify:** H shows 1 red sphere. He shows 2 red + 2 grey. Fe shows ~30 mixed spheres + glow. U shows the heaviest nucleus capped at 30 + strong glow underneath.

### Phase 8 — Atom: electron shells

- `src/components/scene/ElectronShell.tsx` — for shell `i` in `element.shells`:
  - Radius `r_i = 2.0 + i * 1.4`
  - `TorusGeometry(r_i, 0.01, 8, 96)` ring colored to category, opacity 0.35
  - One `<group>` with inclination `rotation.x = (i*0.37) % π`, `rotation.z = (i*0.91) % π`
  - Spawn `shells[i]` electrons evenly + small phase offset
  - `useFrame((_, delta) => groupRef.current.rotation.y += speed * delta)`, `speed = 0.4 + i*0.15` alternating sign per shell
- `src/components/scene/Electron.tsx` — emissive `SphereGeometry(0.12)` with category-accent emissive (bloom hero)
- Compose into `Atom.tsx`

**Verify:** H = 1 ring + 1 electron. Fe = 4 inclined rings with `[2,8,14,2]` electrons. U = 7 rings, no clipping. Electrons orbit smoothly, bloom glow visible.

### Phase 9 — Polish & full verification

- Background gradient + typography (Space Grotesk or Inter Tight for symbols)
- Mobile responsive: vertical stack, horizontal-scroll grid, collapsible info sheet
- Autorotate toggle in header (binds to `OrbitControls`)
- Performance pass on high-Z elements (target ≥30fps)
- Run the full verification checklist below

---

## Verification checklist (full app)

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
