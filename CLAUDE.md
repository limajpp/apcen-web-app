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

APCEN is a slide-labeling tool for histology images (ganglion/layer presence). Flow: **login → label a queue of slides**. The daily goal is assigned and raised by the backend; there is no goal picker.

- `src/routes/router.tsx` — route table. `/` redirects to `/login`; `/slide-analysis` is wrapped in `PrivateRoute`; unknown paths redirect to `/`.
- `src/lib/jwt.ts` — framework-free token helpers used by the auth store: `decodeUserFromToken` (decodes the access token's JWT claims — `sub`, `username`, `role`, `goal` — into a `User`, returning `null` if expired/malformed), `loadStoredUser` (reads `localStorage["@App:token"]` and decodes it, clearing both token keys on failure), `clearStoredTokens`. Also defines and exports the `User` type (`id`, `username`, `role`, `goal`), re-exported from `src/store/auth.tsx` for existing `@/store/auth` imports.
- `src/store/auth.tsx` (`AuthProvider`/`AuthContext`) + `src/hooks/useAuth.ts` — the React layer only; delegates token decoding/storage to `src/lib/jwt.ts`. There is no `/user/me` fetch — it hydrates from `loadStoredUser()` in a lazy `useState` initializer. `handleSetUser(accessToken, refreshToken)` persists both tokens then decodes the user; `handleRefreshUser()` re-mints the pair via `POST auth/refresh` (the API rebuilds claims from the database, so this is how a changed `goal` reaches the UI); `handleDisconnectUser()` clears tokens and hard-redirects to `/`.
- `src/components/PrivateRoute.tsx` — gates the private routes on `isAuthenticated`. No loading state is needed: the user is decoded from the stored token synchronously, so it is already correct on the first render.
- `src/layout/Slide/SlideLayout.tsx` — the core screen and its session state. Loads the queue with `fetchSlideQueue` (admins get `GET /image/conflict`, everyone else `GET /image/me`), walks it one slide at a time and saves each slide with `createSlideRecord` (`POST /verdict` for admins, `POST /analysis` otherwise). It keeps the last saved slide so the user can go back exactly one slide: the current form is kept as a draft, the edit is sent with `updateSlideRecord` (`PATCH /analysis/:id` or `/verdict/:id`), and a 409 means a verdict now exists and the edit is refused. Progress, goal flags and the current draft are persisted per user in `localStorage` (`@Apcen:slide-session:<userId>`) so a reload resumes the session. Renders `AnalysisLayout` for the active screen and `BaseLayout` (with the side art) for the result and load-error screens. The labeling form collects the full `CreateResultDto` — ten clinical enum fields defined in `src/lib/analysis/fields.ts`.
- `src/components/Slide/SlideView/SlideViewer.tsx` — wraps OpenSeadragon for deep-zoom/pan of the slide image; imperative `zoomIn`/`zoomOut`/`reset` handle exposed via `forwardRef`/`useImperativeHandle`. Logs on `open-failed` and refuses to construct a viewer over an empty URL, so a broken image contract fails loudly rather than rendering a blank panel.
- `src/components/Slide/SlideLabel/*` — the labeling form. `SlideLabeling` is a bordered panel with one continuous scroll (`analysis-scroll` utility in `src/index.css`) holding the ten numbered questions as inline radio/checkbox pills. After a blocked submit, unanswered questions turn red with an asterisk. State is `AnalysisResultState`, threaded down as props — there's no separate slide-labeling store.
- `src/components/Slide/AnalysisProgress.tsx` — four-segment progress bar with a stage label (*No começo…* → *Última lâmina*) and an info tooltip; while the previous slide is being corrected, an animated cream dot (`showBackMarker`, `animate-back-nudge` in `src/index.css`) marks the tip of the fill. `SlideView/SlideArrow.tsx` is the full-height back/next arrow.
- `src/lib/analysis/*` — the analysis contract in one place: `types.ts` (enums mirroring the backend wire values), `labels.ts` (**all pt-BR copy — edit terminology here, not in components**), `fields.ts` (the descriptor array driving order, the `required` flag and exclusive values), `state.ts` (pure toggles, including exclusivity), `validation.ts` (the completeness gate and payload mapping) and `progress.ts` (progress stages and segment fills). All ten questions are required; `null` means unanswered.

### Images

The API never returns a usable image link. `ReturnImageDto` carries a `storageKey` — a MinIO
object key like `images/<uuid>/<uuid>.png`. To load the bytes, build
`${API_URL}image/${encodeURIComponent(storageKey)}/redirect` via `buildImagePreviewUrl`
(`src/services/api.ts`); that endpoint 307-redirects to a presigned MinIO URL valid for an hour.

Two constraints: the endpoint is deliberately **unauthenticated** (OpenSeadragon fetches it as an
image resource and cannot send a `Bearer` header), and the key **must be percent-encoded**
because it contains slashes while the backend route param matches one path segment.

### API/auth conventions

- `src/services/api.ts` is a single shared axios instance. Request interceptor attaches `Bearer` from `localStorage["@App:token"]`. Response interceptor handles 401s: queues concurrent requests while a token refresh (`POST auth/refresh` using `localStorage["@App:refreshToken"]`) is in flight, replays them on success, and on failure clears tokens and hard-redirects to `/`.
- Tokens are read directly from `localStorage` (keys `@App:token` / `@App:refreshToken`) rather than from `AuthContext`, so `api.ts` has no dependency on the auth store.
- Auth/domain state is prop-drilled through layout → content → view components (e.g. `AnalysisResultState` in the slide flow) rather than pulled from context in each leaf component; only `user`/`isAuthenticated` come from `useAuth()`.

### UI conventions

- Pages (`src/pages/*`) are thin wrappers that just render a layout (`src/layout/**`); layouts hold the data-fetching/state logic; `src/components/**` holds presentational/composed pieces.
- `BaseLayout` (`src/layout/BaseLayout.tsx`) is a resizable split between the main content and `SupportArt` (decorative panel), via `react-resizable-panels`; the slide flow uses it for its result and load-error screens. The active analysis screen uses the full-width `AnalysisLayout` (`src/layout/AnalysisLayout.tsx`) instead.
- Two custom fonts are declared in `src/index.css`: `Clother` (`--font-sans`, body) and `Gunter` (`--font-heading`); font files are served from `public/fonts/`.
- UI copy is in Portuguese (pt-BR).
