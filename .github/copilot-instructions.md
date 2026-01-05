## Summary

This repository contains a React + TypeScript single-page application scaffolded for Vite (root) and a nested `SchoolManagementSystem/` app (Create React App style). The main active app in this workspace uses Vite (see `package.json` at project root). AI agents should focus on the Vite-based app under the repository root unless instructed otherwise.

## Quick facts

- Build system: Vite (root `package.json`) — dev: `npm run dev`, build: `npm run build`, preview: `npm run preview`.
- TypeScript: Yes (root uses TS ~5.9). Check `tsconfig.*.json` files at repo root for project references.
- UI libs: MUI (v7), emotion, MUI icons. Routing uses `react-router-dom` v7.
- Two apps: root Vite app and `SchoolManagementSystem/` subfolder (CRA-like). Prefer root Vite app as the primary working target.

## Files/directories that matter

- `src/App.tsx` — central router and role-based rendering logic. Many components are imported here; ensure imports match files under `src/components`.
- `src/components/*` — main UI components (Layout, Login, Dashboard, Students, Teachers, dashboards/*). New/updated components must preserve named exports used by `App.tsx`.
- `src/context/DataContext.tsx` — React context provider used across components. Keep API stable: DataProvider, useData, types for Role/User.
- `package.json` (root) — dev/build scripts, dependencies (MUI v7 + react-router-dom v7). Use these when suggesting dependency changes.
- `SchoolManagementSystem/` — a legacy CRA-style copy. Avoid editing unless user asks; changes here can be confusing.

## Architecture notes (big picture)

- Single-page React app with role-based view switching. `App.tsx` holds a local `user` state (id, role) and `currentPage` string. Navigation is driven by passing `onNavigate(page)` down to dashboards and `Layout`.
- Data is provided through `DataProvider` from `src/context/DataContext.tsx`. Components call `useData()` for students/teachers arrays and simple mutators (addStudent/addTeacher) — expect a small in-memory store, not a remote API.
- Most dashboard components are small presentational cards that call `onNavigate` for internal navigation. Keep these components simple and pure when possible.

## Project-specific conventions and patterns

- Role enum: `'headteacher' | 'deputy' | 'classteacher' | 'subjectteacher' | 'student'`. Keep casing and exact string values when matching role checks in `App.tsx`.
- Navigation: `onNavigate(page: string)` with pages like `dashboard`, `students`, `teachers`, `student-staff`, `attendance`, `results`, `fees`.
- Components expect MUI `sx` styling and `@mui/material` v7 APIs. Use MUI components consistently for layout (Box, Stack, Card).
- Keep `DataProvider` API stable: `currentUser`, `setCurrentUser`, `students`, `teachers`, `addStudent`, `addTeacher`. If adding fields, update `useData()` usages.

## Common tasks & commands

- Start dev server (Vite):

```powershell
npm run dev
```

- Build production bundle:

```powershell
npm run build
```

- Lint the codebase:

```powershell
npm run lint
```

If asked to modify dependencies, prefer adding to the root `package.json` (Vite app) and keep versions aligned with currently used MUI v7 and React 19.

## Editing guidance for AI agents

- When adding or updating components referenced by `src/App.tsx`, create files under `src/components/` matching import paths exactly (e.g., `src/components/dashboards/DeputyDashboard.tsx`).
- Preserve exported default components for present imports (App uses default imports). If you convert to named exports, update `App.tsx` accordingly.
- Keep TypeScript types aligned — `App.tsx` defines a `Role` type and `User` shape. Prefer importing or re-exporting a shared `Role`/`User` type from `src/types/index.ts` or `src/context/DataContext.tsx` when adding types.
- Minimal edits: prefer adding safe, presentational code (Cards, Lists) and wiring to `useData()` rather than implementing new backend logic.

## Examples from the codebase

- Role-checking in `src/App.tsx`:

  - switch (user.role) { case 'deputy': return <DeputyDashboard onNavigate={handleNavigate} /> ... }

- DataProvider API shape to preserve (example usage in `Students` component):

  - const { students } = useData();

When you need to persist or mock data, add simple in-memory arrays inside `DataContext` and expose add/remove functions.

## Tests & verification

- There are currently no automated tests in the repo. Verify TypeScript build and Vite dev server after edits:

```powershell
npm run build
npm run dev
```

Look for TypeScript errors; the root `build` script runs `tsc -b` first. If adding new files, ensure they compile with tsconfig settings.

## When to change the `SchoolManagementSystem/` subfolder

- Only touch the `SchoolManagementSystem/` subfolder when the user explicitly asks. This folder is a legacy CRA copy and can cause confusion with two active apps.

## Security & side-effects

- Do not introduce network calls or credentials. This project currently has no API layer; prefer mock/in-memory data or explicit user-provided endpoints.

## If anything is unclear

- Ask the user which app they want: the root Vite app or the nested CRA-style app. Also ask whether new types should be centralized under `src/types/index.ts` or kept local.

---

Please review this guidance and tell me where you'd like it tightened (e.g., add examples for creating tests, or include more file-level guidance for `src/context/DataContext.tsx`).
