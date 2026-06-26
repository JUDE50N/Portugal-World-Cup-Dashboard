# Portugal National Team — World Cup HUD

A high-fidelity tactical dashboard for the Federação Portuguesa de Futebol (FPF) Qatar 2026 campaign. Built with custom interactive widgets, real-time match simulations, tactile audio-visual dossiers, and clean animations.

## Tech Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS (Bento-grid HUD theme)
- **Animations**: Framer Motion
- **Sound Design**: Web Audio API synthesizer for typewriter cues and clicks

## Project Architecture
- `/src/components`: UI widgets (Header, Squad Grid, Player Dossier, Live Simulator, Match Countdown)
- `/src/data/squad.ts`: High-fidelity squad data, stats, biographies, and photorealistic player portrait assets
- `/src/types.ts`: Core TypeScript definitions for players, stats, and states

## Setup & Running
Install dependencies and run the local development server:
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
