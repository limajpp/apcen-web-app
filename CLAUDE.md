# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

The actual application lives in the `apcen/` subdirectory, not the repo root — run all commands from there:

```bash
cd apcen
```

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # tsc -b (project references, type-check only) + vite build
npm run lint      # eslint .
npm run preview   # preview the production build
```

There is no test suite/runner configured in this project.

## Environment

Requires `VITE_API_URL` (see `.env.example`), the base URL of the backend API. `src/services/api.ts` throws at import time if it's unset, so the app won't boot without a `.env`.

## Architecture

React 19 + TypeScript + Vite SPA (React Compiler enabled via `@rolldown/plugin-babel`). Tailwind CSS v4 (config lives in `src/index.css` via `@theme`, not a `tailwind.config.js`). shadcn/radix-ui components live in `src/components/ui/`; `components.json` sets the `@/*` aliases (`@/components`, `@/lib`, `@/ui`, `@/hooks`) resolved via the `@` → `src` path alias in `vite.config.ts`/`tsconfig.app.json`.

### App domain

APCEN is a slide-labeling tool for histology images (ganglion/layer presence). Flow: **login → set a review goal (once) → label a queue of slides**.

- `src/routes/router.tsx` — route table. `/` redirects to `/login`. `/goals` and `/slide-analysis` are wrapped in `PrivateRoute`.
- `src/store/auth.tsx` (`AuthProvider`/`AuthContext`) + `src/hooks/useAuth.ts` — holds the `User` object (`id`, `username`, `role`, `goal`, `createdAt`). On mount, if a token exists in `localStorage`, it fetches `/user/me` to hydrate the user. `login()` stores tokens then fetches `/user/me`; `logout()` clears tokens and hard-redirects to `/`.
- `src/components/PrivateRoute.tsx` — gates the private routes on `isAuthenticated`, showing a loading state while `useAuth().isLoading`.
- `src/layout/Goals/GoalsLayout.tsx` — one-time goal picker; redirects straight to `/slide-analysis` if `user.goal` is already set (a goal, once patched via `PATCH /user/me`, cannot be changed again from the UI).
- `src/layout/Slide/SlideLayout.tsx` — the core screen. Fetches a page of images (`GET /image/me`), walks through them one at a time (`currentIndex`), and `POST`s each labeling result to `/analysis` (`{ imageId, result: "healthy" | "sickness" }`) before advancing. Tracks `isFinished` (queue exhausted) and `goalDone` (last image reached and a goal exists) to drive the results screen (`SlideSessionResults`).
- `src/components/Slide/SlideView/SlideViewer.tsx` — wraps OpenSeadragon for deep-zoom/pan of the slide image; imperative `zoomIn`/`zoomOut`/`reset` handle exposed via `forwardRef`/`useImperativeHandle`.
- `src/components/Slide/SlideLabel/*` — the labeling form (radio for ganglion presence, checkboxes for tissue layers) feeding `LabelFieldsState` (defined in `SlideLayout.tsx` and threaded down as props — there's no separate slide-labeling store).

### API/auth conventions

- `src/services/api.ts` is a single shared axios instance. Request interceptor attaches `Bearer` from `localStorage["@App:token"]`. Response interceptor handles 401s: queues concurrent requests while a token refresh (`POST auth/refresh` using `localStorage["@App:refreshToken"]`) is in flight, replays them on success, and on failure clears tokens and hard-redirects to `/`.
- Tokens are read directly from `localStorage` (keys `@App:token` / `@App:refreshToken`) rather than from `AuthContext`, so `api.ts` has no dependency on the auth store.
- Auth/domain state is prop-drilled through layout → content → view components (e.g. `LabelFieldsState` in the slide flow) rather than pulled from context in each leaf component; only `user`/`isAuthenticated` come from `useAuth()`.

### UI conventions

- Pages (`src/pages/*`) are thin wrappers that just render a layout (`src/layout/**`); layouts hold the data-fetching/state logic; `src/components/**` holds presentational/composed pieces.
- `BaseLayout` (`src/layout/BaseLayout.tsx`) is the shared shell for authenticated screens: a resizable split between the main content and `SupportArt` (decorative panel), via `react-resizable-panels`.
- Two custom fonts are declared in `src/index.css`: `Clother` (`--font-sans`, body) and `Gunter` (`--font-heading`); font files are served from `public/fonts/`.
- UI copy is in Portuguese (pt-BR).
