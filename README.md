# APCEN — Web App

Slide-labeling tool for histology images. Analysts log in, go through a queue of slides and answer the analysis questions for each one; admins resolve the slides whose analyses conflict.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/radix-ui, OpenSeadragon and axios.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- The APCEN API running and reachable

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs on http://localhost:5173.

## Environment variables

| Name | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the API, including the `/api/v1` prefix. Example: `https://api.yourdomain.com/api/v1` |

The value is read at build time. Changing it requires a new build.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks and builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Deploying to Vercel

1. Import the repository in Vercel. The framework preset is **Vite** and the root directory is the repository root.
2. Add `VITE_API_URL` in **Settings → Environment Variables**. It must be an `https://` URL, otherwise the browser blocks the requests.
3. Deploy. `vercel.json` already sets the build command, the output directory and the rewrite that keeps routes such as `/slide-analysis` working after a reload.

The API must also be ready for the deployed domain:

- Its `ALLOWED_ORIGINS` must include the Vercel domain when it runs with `NODE_ENV=production`.
- The storage behind the slide images must be reachable over HTTPS, because the images are loaded through presigned URLs.
