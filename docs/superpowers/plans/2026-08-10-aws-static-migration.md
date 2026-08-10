# AWS Static Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve the portfolio at `https://seb.onlineo.live` as a fully static site on S3 + CloudFront, provisioned by SST and deployed by GitHub Actions on push to `main`.

**Architecture:** The app is a Remix 2 site on Cloudflare Pages whose only server-side behaviour is a theme cookie. We remove that dependency (theme moves to `localStorage`), migrate Remix v2 → React Router v7 to get first-class prerendering, build 14 routes plus a 404 page to static HTML, and serve `build/client` from S3 behind CloudFront with a Route 53 alias.

**Tech Stack:** React Router v7, Vite 5, MDX, SST v3 (Pulumi-based), AWS S3 + CloudFront + ACM + Route 53, GitHub Actions with OIDC.

**Spec:** `docs/superpowers/specs/2026-08-10-aws-static-migration-design.md`

## Global Constraints

- Target domain: `seb.onlineo.live`. Route 53 hosted zone `onlineo.live` = `Z04825702KKCLX3C6NSRH`, AWS account `203918846799`.
- Node `>=19.9.0` (existing `engines` field). Do not lower it.
- The site must remain **fully static** — no Lambda, no SSR at request time. Any change that reintroduces a server request-time dependency is out of bounds.
- Prerendered HTML must **never** contain a `data-theme` attribute on `<body>`. The inline script sets it. Baking it in causes a hydration conflict.
- Default theme is `dark` everywhere a preference is missing or unreadable.
- Work happens on branch `aws-static-migration`. Commit after every task.
- This codebase has **no test runner**. "Tests" in this plan are executable verification scripts and explicit manual browser checks, not unit tests. Do not add a test framework.

---

### Task 1: Move theme from cookie to localStorage

Do this first, while still on Remix — it decouples the theme from the server, which is what makes everything after it possible. After this task the site still runs on Remix and Cloudflare, but nothing reads or writes the session cookie.

**Files:**
- Modify: `app/root.jsx` (loader at :49-87, `App` at :89-105, `<body>` at :127)
- Delete: `app/routes/api.set-theme.js`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `themeScript` exported from `app/root.jsx` — a string of IIFE JavaScript, injected via `dangerouslySetInnerHTML` as the first child of `<body>`. `toggleTheme(newTheme?: 'light'|'dark') => void` continues to be passed to `ThemeProvider`, unchanged in signature, so `app/layouts/navbar/theme-toggle.jsx:8` keeps working untouched.

- [ ] **Step 1: Replace the root loader**

In `app/root.jsx`, delete the `createCookieSessionStorage` import from the `@remix-run/cloudflare` import line (keep `json` for now — it is removed in Task 2). Replace the whole `loader` export with:

```jsx
export const loader = async ({ request }) => {
  const { url } = request;
  const { pathname } = new URL(url);
  const pathnameSliced = pathname.endsWith('/') ? pathname.slice(0, -1) : url;
  const canonicalUrl = `${config.url}${pathnameSliced}`;

  return json({ canonicalUrl });
};
```

- [ ] **Step 2: Add the pre-paint theme script**

Add near the top of `app/root.jsx`, after the imports:

```jsx
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    document.body.dataset.theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
  } catch (e) {
    document.body.dataset.theme = 'dark';
  }
})();
`;
```

- [ ] **Step 3: Rewire the App component**

In `app/root.jsx`, add `useState` to the existing `react` import (it currently imports `useEffect`). Replace the first lines of `App` — the `useLoaderData`/`useFetcher` destructuring, the `fetcher.formData` block, and `toggleTheme` — with:

```jsx
export default function App() {
  const { canonicalUrl } = useLoaderData();
  const [theme, setTheme] = useState('dark');
  const { state } = useNavigation();

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, []);

  function toggleTheme(newTheme) {
    const next = newTheme || (theme === 'dark' ? 'light' : 'dark');
    setTheme(next);
    document.body.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Private browsing with storage disabled — theme still applies for this page view
    }
  }
```

Remove the now-unused `useFetcher` import from the `@remix-run/react` import list.

- [ ] **Step 4: Strip `data-theme` from the rendered body**

In `app/root.jsx`, change the `App` component's body tag from `<body data-theme={theme}>` to:

```jsx
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
```

The `<script>` must be the **first child** of `<body>` — it sets the attribute on `document.body`, which does not exist yet if placed in `<head>`.

Do the same in `ErrorBoundary` (`app/root.jsx:164`): change `<body data-theme="dark">` to `<body>` followed by the same `<script>` line. The `ThemeProvider` call at :128 keeps `theme={theme}` — it feeds `useTheme()` consumers like `app/layouts/navbar/navbar.jsx:20`.

- [ ] **Step 5: Delete the theme API route**

```bash
git rm app/routes/api.set-theme.js
```

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev` and open `http://localhost:7777`

Check all of these:
1. Page loads in dark theme.
2. Clicking the theme toggle in the navbar switches to light immediately.
3. Reload — the page stays light, with **no flash of dark** before paint.
4. DevTools console shows no React hydration warnings (look for "did not match" / "Hydration failed").
5. Application → Local Storage shows `theme: "light"`.
6. Application → Cookies shows **no** `__session` cookie.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Move theme preference from session cookie to localStorage"
```

---

### Task 2: Migrate Remix v2 to React Router v7

Framework swap only — the site still server-renders at the end of this task. Prerendering comes in Task 3, so any breakage here is a migration bug, not a static-build bug.

**Files:**
- Modify: `package.json`, `vite.config.js`, `app/root.jsx`, `app/routes/$.jsx`, `app/routes/articles/route.jsx`, `app/routes/articles_._index/route.jsx`, `app/routes/articles_._index/posts.server.js`, and every remaining file importing `@remix-run/react`
- Create: `app/routes.js`

**Interfaces:**
- Consumes: `themeScript` and the `canonicalUrl`-only loader from Task 1.
- Produces: `app/routes.js` default-exporting a React Router route config array — Task 3 adds the matching `prerender` list against these exact paths. `getPosts()` in `posts.server.js` keeps its signature, returning `Array<{slug: string, timecode: string, frontmatter: object}>`.

- [ ] **Step 1: Swap the packages**

```bash
npm uninstall @remix-run/cloudflare @remix-run/cloudflare-pages @remix-run/react @remix-run/dev
npm install react-router@^7
npm install -D @react-router/dev@^7 @react-router/node@^7
```

- [ ] **Step 2: Rewrite the framework imports**

Every `@remix-run/react` import becomes `react-router`. The named exports in use (`Links`, `Meta`, `Outlet`, `Scripts`, `ScrollRestoration`, `useLoaderData`, `useNavigation`, `useRouteError`, `Link`, `NavLink`, `useLocation`) all exist in React Router v7 under the same names.

```bash
grep -rl "@remix-run/react" app | xargs sed -i '' "s|@remix-run/react|react-router|g"
```

Then verify nothing is left behind:

```bash
grep -rn "@remix-run" app
```

Expected: no output.

If that grep still shows `@remix-run/cloudflare` in `app/root.jsx`, `app/routes/articles/route.jsx` or `app/routes/articles_._index/route.jsx`, Step 3 removes them.

- [ ] **Step 3: Drop the `json()` helper**

React Router v7 loaders return plain objects. In all three files, remove the `@remix-run/cloudflare` import line and unwrap the return values.

`app/root.jsx` loader return becomes:

```jsx
  return { canonicalUrl };
```

`app/routes/articles/route.jsx` loader return becomes:

```jsx
  return {
    ogImage,
    frontmatter: module.frontmatter,
    timecode: formatTimecode(readTime),
  };
```

`app/routes/articles_._index/route.jsx` loader return becomes:

```jsx
  return { posts, featured };
```

- [ ] **Step 4: Fix the article slug lookup**

`app/routes/articles_._index/posts.server.js` imports `virtual:remix/server-build` to map a file to its route path. That virtual module does not exist in React Router, and with static prerendering there is no server build to read. Derive the slug from the filename instead.

Replace the top of `getPosts()` — the `const build = await import(...)` line and the three lines computing `id` and `slug` — so the map callback begins:

```js
    Object.entries(modules).map(async ([file, post]) => {
      const slug = file.replace('../articles.', '').replace(/\.mdx$/, '');

      const text = await import(`../articles.${slug}.mdx?raw`);
```

Delete the `import build` line and the `if (slug === undefined) throw` check entirely.

- [ ] **Step 5: Add the explicit route config**

React Router v7 requires `app/routes.js`. The old config lived in the `routes()` callback in `vite.config.js` and relied on Remix flat-file conventions. Make it explicit. Create `app/routes.js`:

```js
import { index, layout, route } from '@react-router/dev/routes';

export default [
  index('routes/home/route.js'),
  route('uses', 'routes/uses/route.js'),
  route('articles', 'routes/articles_._index/route.jsx'),
  layout('routes/articles/route.jsx', [
    route('articles/django-elastic-beanstalk', 'routes/articles.django-elastic-beanstalk.mdx'),
    route('articles/instagram-platform-api', 'routes/articles.instagram-platform-api.mdx'),
  ]),
  route('projects/ancient-bots', 'routes/projects.ancient-bots/route.js'),
  route('projects/fitcheck', 'routes/projects.fitcheck/route.js'),
  route('projects/mormonize', 'routes/projects.mormonize/route.js'),
  route('projects/slice', 'routes/projects.slice/route.js'),
  route('projects/smart-sparrow', 'routes/projects.smart-sparrow/route.js'),
  route('projects/teamworks', 'routes/projects.teamworks/route.js'),
  route('projects/thoth', 'routes/projects.thoth/route.js'),
  route('projects/volkihar-knight', 'routes/projects.volkihar-knight/route.js'),
  route('projects/voulez-vous', 'routes/projects.voulez-vous/route.js'),
  route('*', 'routes/$.jsx'),
];
```

`layout()` is pathless, so the two MDX articles carry their full paths and still render inside the `Post`/`MDXProvider` wrapper from `routes/articles/route.jsx` — while `/articles` itself (the index listing) stays outside that wrapper, matching the old `articles_._index` escape-nesting behaviour.

- [ ] **Step 6: Swap the Vite plugin**

In `vite.config.js`, replace the `@remix-run/dev` import with:

```js
import { reactRouter } from '@react-router/dev/vite';
```

Then replace both the `remixCloudflareDevProxy()` and `remix({ routes... })` entries in the `plugins` array with a single `reactRouter()`. The `mdx()` plugin must stay **before** it. The array becomes:

```js
  plugins: [
    mdx({
      rehypePlugins: [[rehypeImgSize, { dir: 'public' }], rehypeSlug, rehypePrism],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    reactRouter(),
    jsconfigPaths(),
  ],
```

- [ ] **Step 7: Update the build and dev scripts**

In `package.json`, change these two scripts:

```json
    "build": "react-router build",
    "dev": "node ./scripts/dev.cjs && react-router dev",
```

- [ ] **Step 8: Verify dev and build**

Run: `npm run dev` and visit `/`, `/articles`, `/articles/instagram-platform-api`, `/projects/thoth`, `/uses`, and a nonsense path like `/nope`.

Expected: every real route renders with correct content and page title; `/articles` lists both articles with reading times; `/nope` renders the styled 404. Console shows no errors.

Then run: `npm run build`

Expected: exits 0, producing `build/client` and `build/server`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Migrate from Remix v2 to React Router v7"
```

---

### Task 3: Prerender to static HTML

**Files:**
- Create: `react-router.config.js`, `app/routes/404.jsx`
- Modify: `app/routes/$.jsx`, `app/routes.js`

**Interfaces:**
- Consumes: the route paths defined in `app/routes.js` (Task 2).
- Produces: `build/client/` containing an `index.html` per route plus `build/client/404.html`. Task 4 asserts on exactly these paths; Task 6 uploads this directory.

- [ ] **Step 1: Make a prerenderable 404 route**

`app/routes/$.jsx` currently throws a `Response` from its loader, which would fail the build if prerendered. Split the rendering out into a route that can be prerendered as a normal page. Create `app/routes/404.jsx`:

```jsx
import { Error } from '~/layouts/error';

export const meta = () => {
  return [{ title: '404 | Redacted' }];
};

export default function NotFound() {
  return <Error error={{ status: 404 }} />;
}
```

`Error` reads `error.status` (`app/layouts/error/error.jsx:14-21`), so `{ status: 404 }` is all it needs to render the "Error: redacted" page.

- [ ] **Step 2: Make the splat route render without throwing**

Replace the whole contents of `app/routes/$.jsx` with:

```jsx
export { default, meta } from './404';
```

The splat still handles client-side navigation to unknown paths; CloudFront handles direct hits in Task 6.

- [ ] **Step 3: Register the 404 route**

In `app/routes.js`, add this line immediately before the `route('*', ...)` entry:

```js
  route('404', 'routes/404.jsx'),
```

- [ ] **Step 4: Configure static prerendering**

Create `react-router.config.js`:

```js
export default {
  ssr: false,
  prerender: [
    '/',
    '/uses',
    '/articles',
    '/articles/django-elastic-beanstalk',
    '/articles/instagram-platform-api',
    '/projects/ancient-bots',
    '/projects/fitcheck',
    '/projects/mormonize',
    '/projects/slice',
    '/projects/smart-sparrow',
    '/projects/teamworks',
    '/projects/thoth',
    '/projects/volkihar-knight',
    '/projects/voulez-vous',
    '/404',
  ],
};
```

- [ ] **Step 5: Flatten the 404 page to a top-level file**

CloudFront's custom error response needs `404.html` at the bucket root, but prerendering emits `404/index.html`. Add a build step. In `package.json`, change the build script to:

```json
    "build": "react-router build && node ./scripts/flatten-404.mjs",
```

Create `scripts/flatten-404.mjs`:

```js
import { rename, rm } from 'node:fs/promises';

const dir = 'build/client';

await rename(`${dir}/404/index.html`, `${dir}/404.html`);
await rm(`${dir}/404`, { recursive: true, force: true });

console.log('Flattened 404/index.html -> 404.html');
```

- [ ] **Step 6: Build and inspect the output**

Run: `npm run build`

Expected: exits 0. Then:

```bash
find build/client -name '*.html' | sort
```

Expected: 15 files — `404.html` plus an `index.html` for each of the 14 prerendered routes.

- [ ] **Step 7: Confirm the HTML is real, not an empty shell**

```bash
grep -c "Sebastian Prentice" build/client/projects/thoth/index.html
grep -o "<title>[^<]*</title>" build/client/articles/instagram-platform-api/index.html
grep -c "data-theme" build/client/index.html
```

Expected: first returns a non-zero count; second prints the article's real title (not a generic fallback); third returns `0` — confirming the Global Constraint that no `data-theme` is baked into the markup.

- [ ] **Step 8: Preview the static output locally**

```bash
npx serve build/client
```

Visit the printed URL and check `/`, `/articles/instagram-platform-api`, `/projects/thoth`, and the theme toggle + reload persistence. Expected: all render, no hydration warnings in the console.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Prerender all routes to static HTML"
```

---

### Task 4: Add a build verification script

Guards the thing most likely to silently regress: a build that succeeds but emits an empty SPA shell instead of real prerendered HTML.

**Files:**
- Create: `scripts/verify-build.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `build/client` output from Task 3.
- Produces: `npm run verify` — exits 0 on success, exits 1 with a printed reason on failure. Task 7 runs it in CI.

- [ ] **Step 1: Write the verification script**

Create `scripts/verify-build.mjs`:

```js
import { readFile } from 'node:fs/promises';

const dir = 'build/client';

const routes = [
  '/',
  '/uses',
  '/articles',
  '/articles/django-elastic-beanstalk',
  '/articles/instagram-platform-api',
  '/projects/ancient-bots',
  '/projects/fitcheck',
  '/projects/mormonize',
  '/projects/slice',
  '/projects/smart-sparrow',
  '/projects/teamworks',
  '/projects/thoth',
  '/projects/volkihar-knight',
  '/projects/voulez-vous',
];

const failures = [];

async function check(label, file, assertions) {
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    failures.push(`${label}: missing ${file}`);
    return;
  }
  for (const [description, passed] of assertions(html)) {
    if (!passed) failures.push(`${label}: ${description}`);
  }
}

for (const route of routes) {
  const file = `${dir}${route === '/' ? '' : route}/index.html`;
  await check(route, file, html => [
    ['has a non-empty <title>', /<title>[^<]+<\/title>/.test(html)],
    ['has prerendered body content', html.length > 5000],
    ['must not bake in data-theme', !html.includes('data-theme=')],
  ]);
}

await check('404', `${dir}/404.html`, html => [
  ['has a non-empty <title>', /<title>[^<]+<\/title>/.test(html)],
  ['must not bake in data-theme', !html.includes('data-theme=')],
]);

if (failures.length) {
  console.error(`Build verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`Build verification passed: ${routes.length + 1} pages.`);
```

- [ ] **Step 2: Add the script**

In `package.json`, add to `scripts`:

```json
    "verify": "node ./scripts/verify-build.mjs",
```

- [ ] **Step 3: Run it against the good build**

Run: `npm run verify`
Expected: PASS — `Build verification passed: 15 pages.`

- [ ] **Step 4: Prove it actually catches a regression**

```bash
mv build/client/projects/thoth/index.html /tmp/thoth-index.html
npm run verify
```

Expected: FAIL, exit code 1, with `/projects/thoth: missing build/client/projects/thoth/index.html`.

Then restore it:

```bash
mv /tmp/thoth-index.html build/client/projects/thoth/index.html
npm run verify
```

Expected: PASS again.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add prerender output verification script"
```

---

### Task 5: Remove dead Cloudflare and template files

**Files:**
- Delete: `functions/`, `wrangler.toml`, `netlify.toml`, `next.config.cjs`, `.dev.vars.example`
- Modify: `package.json`, `app/config.json`, `public/sitemap.xml`, `app/components/link/link.stories.jsx`

- [ ] **Step 1: Delete the dead files**

```bash
git rm -r functions
git rm wrangler.toml netlify.toml next.config.cjs .dev.vars.example
```

`functions/[[path]].js` is the Cloudflare Pages handler, `wrangler.toml` declares a `MY_KV` namespace nothing references, and `netlify.toml` + `next.config.cjs` + `.dev.vars.example` are leftovers from the upstream template — `.dev.vars.example`'s SES variables are referenced by no code in this repo.

- [ ] **Step 2: Remove dead dependencies**

```bash
npm uninstall wrangler miniflare next @next/mdx @aws-sdk/client-ses isbot
```

All six are unreachable now: `wrangler`/`miniflare` served Cloudflare, `next`/`@next/mdx` came from the template's Next.js origins, `@aws-sdk/client-ses` backed a contact form this fork does not have, and `isbot` was only used by Remix's server entry, which no longer exists.

- [ ] **Step 3: Replace the deploy scripts**

In `package.json`, delete the `start`, `deploy` and `deploy:storybook` scripts — all three shell out to `wrangler`. Add in their place:

```json
    "deploy": "sst deploy --stage production",
```

`dev:storybook` and `build:storybook` stay as they are.

- [ ] **Step 4: Point the domain strings at the new host**

In `app/config.json`, set `"url": "https://seb.onlineo.live"`.

In `package.json`, set `"homepage": "https://seb.onlineo.live"`.

In `public/sitemap.xml`, replace every `https://seb.onlineolive.xyz` with `https://seb.onlineo.live`:

```bash
sed -i '' 's|https://seb.onlineolive.xyz|https://seb.onlineo.live|g' public/sitemap.xml app/components/link/link.stories.jsx
```

Then confirm only the intentionally-out-of-scope CV link remains:

```bash
grep -rn "onlineolive" app public package.json
```

Expected: exactly one hit — `app/layouts/navbar/nav-data.js:21` pointing at `https://cv.onlineolive.xyz`. Leave it; repointing it is out of scope per the spec.

- [ ] **Step 5: Rebuild and verify nothing broke**

Run: `npm run build && npm run verify`
Expected: build exits 0, verification passes 15 pages.

Then confirm the canonical URL picked up the new domain:

```bash
grep -o 'rel="canonical" href="[^"]*"' build/client/projects/thoth/index.html
```

Expected: `rel="canonical" href="https://seb.onlineo.live/projects/thoth"`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Remove Cloudflare and template leftovers, point domain at seb.onlineo.live"
```

---

### Task 6: Provision AWS infrastructure with SST and deploy

**Files:**
- Create: `sst.config.ts`
- Modify: `.gitignore`, `package.json`

**Interfaces:**
- Consumes: `build/client` (Task 3), `npm run build` (Task 3).
- Produces: a live site at `https://seb.onlineo.live`, and an SST app named `portfolio` with stage `production` that Task 7 deploys to from CI.

- [ ] **Step 1: Install SST**

```bash
npm install -D sst@^3
```

- [ ] **Step 2: Write the SST config**

Create `sst.config.ts`:

```ts
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'portfolio',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: { aws: { region: 'us-east-1' } },
    };
  },
  async run() {
    new sst.aws.StaticSite('Portfolio', {
      build: {
        command: 'npm run build',
        output: 'build/client',
      },
      domain: {
        name: 'seb.onlineo.live',
        dns: sst.aws.dns({ zone: 'Z04825702KKCLX3C6NSRH' }),
      },
      errorPage: '404.html',
    });
  },
});
```

`removal: 'retain'` protects the production bucket and distribution from an accidental `sst remove`. The region is `us-east-1` because CloudFront requires its ACM certificate there.

- [ ] **Step 3: Ignore SST's local state**

Add to `.gitignore`:

```
.sst
```

- [ ] **Step 4: Confirm the AWS identity before creating anything**

Run: `aws sts get-caller-identity`

Expected: `"Account": "203918846799"`. If it differs, stop — do not create resources in the wrong account.

- [ ] **Step 5: Deploy**

Run: `npx sst deploy --stage production`

This bootstraps SST's state bucket on first run, then creates the S3 bucket, CloudFront distribution, ACM certificate and Route 53 records. Certificate validation plus CloudFront propagation typically takes 5-15 minutes. Expected: SST prints a `url` output of `https://seb.onlineo.live`.

- [ ] **Step 6: Verify DNS and TLS**

```bash
dig +short seb.onlineo.live
curl -sI https://seb.onlineo.live | head -1
```

Expected: `dig` returns CloudFront IP addresses (not empty); `curl` returns `HTTP/2 200`.

- [ ] **Step 7: Verify routing end to end**

```bash
curl -s https://seb.onlineo.live/projects/thoth | grep -o "<title>[^<]*</title>"
curl -so /dev/null -w '%{http_code}\n' https://seb.onlineo.live/definitely-not-a-page
curl -s https://seb.onlineo.live/definitely-not-a-page | grep -c "Error: redacted"
```

Expected: the project's real title; status `404`; a non-zero count proving the styled 404 page is served rather than an S3 XML error.

- [ ] **Step 8: Verify in a real browser**

Open `https://seb.onlineo.live`. Check: the 3D homepage renders, navigation between routes works, the theme toggle persists across a reload with no flash, and the console shows no errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Provision S3 + CloudFront hosting at seb.onlineo.live with SST"
```

---

### Task 7: Deploy from GitHub Actions on push to main

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: the SST app and `production` stage from Task 6; `npm run verify` from Task 4.
- Produces: automated deploys on push to `main`.

- [ ] **Step 1: Check whether the GitHub OIDC provider already exists**

```bash
aws iam list-open-id-connect-providers
```

If the output contains `token.actions.githubusercontent.com`, skip Step 2 and note the ARN. Otherwise continue.

- [ ] **Step 2: Create the OIDC provider (only if absent)**

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com
```

- [ ] **Step 3: Create the deploy role**

Write the trust policy, scoped to this repo only. Save as `/tmp/trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::203918846799:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:PrenSJ2/portfolio:*"
        }
      }
    }
  ]
}
```

```bash
aws iam create-role \
  --role-name portfolio-github-deploy \
  --assume-role-policy-document file:///tmp/trust-policy.json

aws iam attach-role-policy \
  --role-name portfolio-github-deploy \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

SST provisions and mutates S3, CloudFront, ACM, Route 53, IAM and SSM, so a narrowly-scoped policy is a research task in itself. `AdministratorAccess` is the pragmatic choice for a single-owner personal account, and the trust policy — not the permission policy — is what keeps this role reachable only from this repo. **Flag this to the user rather than silently accepting it**; if they want it tightened, that is a follow-up task.

- [ ] **Step 4: Write the workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: deploy-production
  cancel-in-progress: false

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run build

      - run: npm run verify

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::203918846799:role/portfolio-github-deploy
          aws-region: us-east-1

      - run: npx sst deploy --stage production
```

`concurrency` with `cancel-in-progress: false` prevents two deploys mutating the same CloudFront distribution at once. `npm run verify` runs before credentials are assumed, so a bad build fails the job without touching AWS.

- [ ] **Step 5: Document the deploy process**

In `README.md`, find the existing deployment section (it describes `wrangler pages deploy`) and replace it with a `## Deployment` section stating:

- The site is hosted on AWS — S3 + CloudFront at `https://seb.onlineo.live`, provisioned by SST via `sst.config.ts`.
- Pushing to `main` deploys automatically through `.github/workflows/deploy.yml`, which authenticates to AWS using GitHub OIDC (role `portfolio-github-deploy`).
- Manual deploys use `npm run deploy`, shown in a `bash` code fence.

Remove any remaining references to Cloudflare, `wrangler`, or `.dev.vars` from the README while you are in there.

- [ ] **Step 6: Commit and merge to main**

```bash
git add -A
git commit -m "Deploy from GitHub Actions via OIDC on push to main"
git push -u origin aws-static-migration
```

Then merge the branch to `main` — this is what triggers the first CI deploy. Confirm with the user before merging.

- [ ] **Step 7: Verify the CI deploy ran**

```bash
gh run watch
```

Expected: the `Deploy` workflow succeeds. Then confirm the live site still responds:

```bash
curl -so /dev/null -w '%{http_code}\n' https://seb.onlineo.live
```

Expected: `200`.

- [ ] **Step 8: Prove CI actually publishes changes**

Temporarily change `"role"` in `app/config.json` from `"Developer"` to `"Software Developer"`, push to `main`, and wait for the workflow to finish. Then:

```bash
curl -s https://seb.onlineo.live | grep -c "Software Developer"
```

Expected: non-zero — confirming the pipeline reaches the live site. Then revert `"role"` back to `"Developer"` and push again.

---

## Notes for the implementer

- **If `npm run build` fails inside an MDX route after Task 2:** the `mdx()` plugin must come before `reactRouter()` in the Vite plugins array. Order matters.
- **If prerendering fails on `/articles`:** `posts.server.js` uses `import.meta.glob`, which resolves at build time. Confirm Task 2 Step 4 removed the `virtual:remix/server-build` import — that module does not exist in React Router.
- **If the theme flashes on load after Task 3:** the inline `<script>` is not the first child of `<body>`, or `data-theme` got baked into the prerendered HTML. `npm run verify` catches the second case.
- **Do not** add a `_redirects`, `_headers` rewrite, or SPA fallback that maps every path to `index.html`. Each route has its own real HTML file; a catch-all rewrite would silently defeat the prerendering. Note `public/_headers` is a Cloudflare file that is now inert — it ships to S3 harmlessly and can be deleted opportunistically.
