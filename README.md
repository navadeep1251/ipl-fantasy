# IPL Fantasy Workspace

This repository contains the Angular recreation of the IPL fantasy app, along with the original source artifacts used as reference during the rebuild.

## Structure

- `ipl-fantasy/` — Angular application source and build scripts
- `reference/ipl.js` — original JavaScript bundle that was reverse-engineered
- `reference/SRC.txt` — reference asset links used by the UI
- `.github/workflows/deploy-pages.yml` — repo-level GitHub Pages workflow

## Quick start

```bash
cd ipl-fantasy
npm install
npm start
```

## Production build

```bash
cd ipl-fantasy
npm run build
```

## GitHub Pages

This repository is configured for GitHub Pages using the repo-level workflow in `.github/workflows/deploy-pages.yml`.

To publish:

1. Push this workspace to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Future pushes to `main` will build from `ipl-fantasy/` and deploy automatically.

Notes:

- The workflow runs from the repository root and builds the Angular app from `ipl-fantasy/`.
- The Pages base path is detected from the GitHub repository name automatically.
- The site URL will be `https://<account>.github.io/my-first-ai-app/` once Pages is enabled and the workflow succeeds.

For local Pages validation:

```bash
cd ipl-fantasy
npm run build:pages
```
