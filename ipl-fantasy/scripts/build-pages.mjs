import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const repoSlug = process.env.GITHUB_REPOSITORY ?? '';
const repoName = repoSlug.split('/')[1] ?? '';
const explicitBaseHref = process.env.PAGES_BASE_HREF;
const baseHref = explicitBaseHref || (repoName ? `/${repoName}/` : '/');

try {
  execSync(`npx ng build --configuration production --base-href "${baseHref}"`, {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('GitHub Pages build failed.', error);
  process.exit(1);
}

const browserOutDir = join(process.cwd(), 'dist', 'ipl-fantasy', 'browser');
const indexPath = join(browserOutDir, 'index.html');
const fallbackPath = join(browserOutDir, '404.html');
const noJekyllPath = join(browserOutDir, '.nojekyll');

if (!existsSync(browserOutDir)) {
  mkdirSync(browserOutDir, { recursive: true });
}

if (existsSync(indexPath)) {
  copyFileSync(indexPath, fallbackPath);
}

writeFileSync(noJekyllPath, '');
console.log(`GitHub Pages build prepared with base href: ${baseHref}`);
