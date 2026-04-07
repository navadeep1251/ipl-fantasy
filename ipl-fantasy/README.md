# IplFantasy

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## GitHub Pages

This repo is prepared for deployment to GitHub Pages using GitHub Actions.

### One-time setup

1. Push this project to a GitHub repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Make sure your default branch is `main`, or update `.github/workflows/deploy-pages.yml` if you use a different branch.

### Deploy

Every push to `main` will automatically:

- install dependencies
- build the Angular app for GitHub Pages
- generate `404.html` and `.nojekyll` for static hosting
- deploy the contents of `dist/ipl-fantasy/browser`

### Local Pages build

To test the GitHub Pages build locally, run:

```bash
npm run build:pages
```

If your repository name is not the same as the Pages path you want to use, you can override the base href:

```bash
PAGES_BASE_HREF=/your-repo-name/ npm run build:pages
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
