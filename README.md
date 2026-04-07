# IPL Fantasy Workspace

This repository contains the Angular recreation of the IPL fantasy app, along with the original source artifacts used as reference during the rebuild.

## Structure

- `ipl-fantasy/` — Angular application source, build scripts, and GitHub Pages workflow
- `reference/ipl.js` — original JavaScript bundle that was reverse-engineered
- `reference/SRC.txt` — reference asset links used by the UI

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

The Angular app already includes a GitHub Pages workflow in `ipl-fantasy/.github/workflows/deploy-pages.yml`.

To publish:

1. Create a new GitHub repository.
2. Push this workspace to the `main` branch.
3. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Push future changes to `main` to trigger deployment.

For local Pages validation:

```bash
cd ipl-fantasy
npm run build:pages
```
