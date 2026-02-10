# UX Technology Radar

An interactive technology radar for UI/UX designers, HCI experts, and UX professionals. Track the tools, techniques, frameworks, and emerging technologies shaping the design and user experience landscape.

Inspired by [ThoughtWorks Technology Radar](https://www.thoughtworks.com/radar) — no JSON imports required. Manage everything directly in the browser.

## Features

- **Interactive D3.js radar** with four quadrants and four adoption rings
- **Pre-populated** with 48+ technologies curated for the UX community
- **Add, edit, and delete** items directly through the UI
- **Search and filter** by quadrant, ring, or keyword
- **Persistent storage** via localStorage — your data survives page refreshes
- **Export/import** radar configurations as JSON for sharing and backup
- **Responsive** layout for desktop and tablet

## Quadrants

| Quadrant | What it covers |
|---|---|
| **Design Tools & Platforms** | Software tools used in design workflows (Figma, Miro, Framer, etc.) |
| **Techniques & Methods** | Research, design, and delivery approaches (Design Systems, DesignOps, JTBD, etc.) |
| **Frameworks & UI Libraries** | Code frameworks, component libraries, and standards (React, Tailwind, WCAG, etc.) |
| **AI & Emerging Technology** | AI-powered tools and emerging tech (Copilot, Generative UI, Voice UI, etc.) |

## Rings

| Ring | Meaning |
|---|---|
| **Adopt** | Proven, strongly recommended for broad use |
| **Trial** | Worth pursuing — proven value in real projects |
| **Assess** | Worth exploring — understand the potential impact |
| **Hold** | Proceed with caution — evaluate before investing |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the radar.

## Build for Production

```bash
npm run build
npm run preview
```

Output is written to `dist/`.

## Tech Stack

- **Vite** — build tooling
- **D3.js v7** — radar visualization
- **Vanilla JavaScript** — no framework dependencies
- **CSS** — custom properties, grid, flexbox

## License

MIT
