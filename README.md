# Elements

Interactive 3D periodic table visualizer built with React, Vite, TypeScript, Three.js, and Tailwind CSS.

Pick any of the 118 chemical elements and inspect a colorful Bohr-style atom with a packed nucleus, inclined orbital shells, revolving electrons, and an element detail panel. The periodic table drawer lets you jump between elements, while previous/next controls and keyboard arrows make it easy to cycle through the dataset.

## Features

- 3D atom scene powered by `@react-three/fiber`, `three`, `@react-three/drei`, and postprocessing bloom.
- Bohr-style shells generated from each element's shell data.
- Nucleus rendering with capped visible nucleons and a glow for heavier elements.
- Complete 118-element periodic table dataset.
- Category-colored element cells, shells, accents, and info badges.
- Collapsible element info panel with atomic number, symbol, mass, phase, block, electron configuration, and summary.
- Bottom periodic table drawer with hover and selected-cell states.
- Previous/next controls plus global `ArrowLeft` and `ArrowRight` navigation.
- Responsive layout for desktop, tablet, and phone-sized screens.

## Tech Stack

- React 18
- Vite
- TypeScript
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing`
- Tailwind CSS
- clsx

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── info/       # element detail panel and navigation controls
│   ├── layout/     # main app shell
│   ├── periodic/   # periodic table drawer, grid, and cells
│   ├── scene/      # 3D atom scene, nucleus, shells, electrons, effects
│   └── ui/         # shared icon components
├── data/
│   ├── categoryColors.ts
│   └── elements.json
├── hooks/
├── state/
├── types/
└── utils/
```

## Controls

- Click a periodic table cell to select an element.
- Use the info panel's previous and next controls to cycle through elements.
- Press `ArrowLeft` or `ArrowRight` to move through the periodic table globally.
- Drag in the 3D scene to orbit the atom.
- Scroll or pinch in the 3D scene to zoom.
- Expand the bottom drawer to browse the full periodic table.
- Collapse the side info panel on wider screens when you want more scene space.

## Data Model

Element records live in `src/data/elements.json` and follow this shape:

```ts
type Element = {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  shells: number[];
  electronConfig: string;
  cpkHex: string;
  summary: string;
  period: number;
  group: number | null;
  block: "s" | "p" | "d" | "f";
  phase: "Solid" | "Liquid" | "Gas" | "Unknown";
};
```

The `shells` array drives electron shell generation in the 3D scene. Period, group, category, and block drive the periodic table layout and visual styling.
