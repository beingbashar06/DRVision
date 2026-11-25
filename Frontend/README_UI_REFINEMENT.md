# DRVision — UI Refinement Update

This update focuses on the frontend visual system and motion design while preserving the existing routes, page components, and demo interactions.

## What changed
- Rebuilt the landing hero as a balanced, full-width two-column layout.
- Added animated retinal-inspired rings, orbit nodes, a scanning line, ambient glow, floating clinical information cards, and subtle motion.
- Added a scroll progress indicator to the navbar.
- Improved responsive behavior for the hero on tablet and mobile.
- Expanded the shared content width on wide screens to reduce unused horizontal space.
- Added consistent surface, form, table, hover, and route-entry styling across the portal.
- Added staggered reveal animation to the impact statistics cards.
- Respects `prefers-reduced-motion` for accessibility.

## Run locally
1. Open this folder in VS Code.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local URL printed by Vite.

The supplied `node_modules` folder is intentionally excluded. Install dependencies on your machine with `npm install` so Vite/Rollup can select the correct platform-specific packages.

## Important
This is a frontend UI refinement. Existing routes and demo/backend-pending behavior are intentionally preserved. The visual AI/retinal graphic is illustrative and is not a real clinical scan or model output.
