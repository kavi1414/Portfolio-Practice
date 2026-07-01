# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QA portfolio site for **Kavishka Jayathilake** — QA Automation Engineer | ISTQB® CTFL Certified.

Full-stack: React 19 + Vite 8 frontend (`frontend/`) and a Node.js + Express backend (`backend/`, not yet scaffolded). The site showcases 6 QA projects from Kavishka's CV and includes a contact form that sends email.

## Commands

**Frontend** (run from `frontend/`):
```bash
npm run dev      # Dev server with HMR (http://localhost:5173)
npm run build    # Production build to frontend/dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

**Backend** (run from `backend/` once scaffolded):
```bash
npm run dev      # Express dev server (nodemon)
npm start        # Production start
```

## Architecture

### Frontend (`frontend/`)
- **Entry:** `index.html` → `src/main.jsx` → `<App />`
- `src/App.jsx` is the root component; portfolio sections will be composed here
- `src/App.css` for component styles, `src/index.css` for global/reset styles
- Static assets in `public/` (served at root); imported assets in `src/assets/`
- Vite config: `@vitejs/plugin-react` (Oxc transform), no path aliases yet

### Backend (`backend/`) — to be scaffolded
- Node.js + Express REST API
- Will handle the contact form's email submission (POST `/api/contact`)
- Keep frontend and backend as separate npm workspaces/projects

### Portfolio Content
- **Owner:** Kavishka Jayathilake
- **Title:** QA Automation Engineer | ISTQB® CTFL Certified
- **Sections:** Hero, About, Projects (6 CV projects), Contact
- **Contact form:** submits to the Express backend which sends email

## Conventions

- JavaScript (not TypeScript); JSX files use `.jsx` extension
- ESLint configured with `react-hooks` and `react-refresh` plugins
- Frontend and backend are independent npm projects — do not mix their `package.json` files
