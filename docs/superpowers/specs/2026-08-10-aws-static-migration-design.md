# Migrate portfolio from Cloudflare Pages to AWS static hosting

**Date:** 2026-08-10
**Status:** Approved

## Goal

Serve the portfolio at `https://seb.onlineo.live` from AWS as a fully static site,
provisioned with SST and deployed by GitHub Actions on push to `main`.

## Background

The site is a Remix 2 app targeting Cloudflare Pages (`@remix-run/cloudflare`,
`functions/[[path]].js`, `wrangler.toml`). Its entire server-side surface is the theme
cookie: the `app/root.jsx` loader reads it and `app/routes/api.set-theme.js` writes it.
The article loaders only read MDX metadata already present in the bundle.

`MY_KV` is declared in `wrangler.toml` but never referenced. The SES/email variables in
`.dev.vars.example` are leftovers from the upstream template — no code sends email.
`netlify.toml` and `next.config.cjs` are likewise dead template files.

The current domain `seb.onlineolive.com` does not resolve, so there is nothing live to
preserve. `onlineo.live` is already a Route 53 hosted zone (`Z04825702KKCLX3C6NSRH`) in
AWS account `203918846799`, which the local CLI is authenticated against as user
`PrenSJ2`.

Because the only dynamic behaviour is a theme preference, the site can be fully static.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Hosting shape | S3 + CloudFront, static | No server needed; cheapest, fastest, nothing to keep alive |
| Provisioning | SST v3 (`sst.config.ts`) | Infrastructure reviewable in-repo; one command builds and deploys |
| Static generation | Migrate Remix v2 → React Router v7 | Official successor with first-class `ssr: false` + `prerender`; real HTML per route |
| Deploys | GitHub Actions on push to `main`, GitHub OIDC | No long-lived AWS keys in the repo |

Rejected: Amplify Hosting (keeps an unnecessary managed SSR layer), CloudFront+Lambda
SSR (over-built for a static portfolio), Remix v2 SPA mode (no per-route HTML or meta
tags, and a blank flash before the 3D homepage hydrates), Remix v2 with a custom
crawl-prerender script (custom machinery on a maintenance-only framework).

## Architecture

```
GitHub push to main
  └─ Actions workflow, OIDC → IAM role
       └─ sst deploy --stage production
            ├─ react-router build  (prerenders 14 routes + 404 → build/client)
            ├─ S3 bucket (private, OAC-only)
            ├─ CloudFront distribution
            │    └─ 404 error response → /404.html
            ├─ ACM certificate (us-east-1)
            └─ Route 53 A/AAAA alias → seb.onlineo.live
```

## Components

### 1. Framework migration (Remix v2 → React Router v7)

Mechanical, no logic changes:

- `@remix-run/react` → `react-router` (12 imports across the app).
- `@remix-run/dev` vite plugin → `@react-router/dev`; `vite.config.js` swaps the plugin
  and drops `remixCloudflareDevProxy()`. The route config moves to `app/routes.js`.
- All 4 `@remix-run/cloudflare` imports disappear: `json()` calls in
  `app/routes/articles/route.jsx` and `app/routes/articles_._index/route.jsx` become
  plain object returns; the `createCookieSessionStorage` usage is deleted with the theme
  work below.
- `react-router.config.js` sets `ssr: false` and an explicit `prerender` array.

**Prerendered paths (14, plus a 404 page):**

```
/                                  /projects/mormonize
/uses                              /projects/slice
/articles                          /projects/smart-sparrow
/articles/django-elastic-beanstalk /projects/teamworks
/articles/instagram-platform-api   /projects/thoth
/projects/ancient-bots             /projects/volkihar-knight
/projects/fitcheck                 /projects/voulez-vous
```

The `app/routes/$.jsx` catch-all prerenders to `404.html`, wired to CloudFront's custom
error response so unknown paths render the styled 404 page. If prerendering the splat
route to a fixed filename proves awkward, the fallback is to prerender a dedicated
`/404` path and rename its `index.html` to `404.html` in the build output.

### 2. Theme handling

Replaces the cookie round-trip:

- An inline blocking script, rendered as the first child of `<body>`, reads the stored
  preference from `localStorage` and sets `data-theme` before first paint. It lives at
  the top of `<body>` (not `<head>`) because the attribute is set on `<body>`, which
  does not exist yet during head execution.
- `ThemeProvider` syncs its React state from the same source after mount, so the toggle
  UI reflects the active theme.
- Toggling writes to `localStorage` instead of submitting to `/api/set-theme`.
- `app/routes/api.set-theme.js` is deleted; `root.jsx`'s `toggleTheme` no longer uses
  `useFetcher`.

**Hydration constraint:** the prerendered HTML must omit the `data-theme` attribute on
`<body>` entirely rather than baking in `"dark"`. If the build emits `data-theme="dark"`
and the inline script changes it to `"light"`, React's hydration and the script disagree
about the DOM. The same applies to the `theme-color` and `color-scheme` meta tags in
`root.jsx`, which currently branch on the loader's theme value — they render with the
dark-mode defaults and are updated client-side after mount.

`root.jsx`'s loader shrinks to returning `canonicalUrl` only, computed at build time from
the route path.

### 3. SST configuration

`sst.config.ts` defines a single `sst.aws.StaticSite`:

- `build.command`: `npm run build`; `build.output`: `build/client`
- `domain.name`: `seb.onlineo.live`, resolved through `sst.aws.dns()` against the
  existing `onlineo.live` hosted zone
- `errorPage`: `404.html`
- Stage `production`

SST bootstraps its own state bucket in the account on first run.

### 4. Deployment

- **Initial deploy:** run locally with the existing CLI credentials, so the site is
  confirmed live before CI is wired.
- **CI:** `.github/workflows/deploy.yml` triggers on push to `main`, authenticates via
  `aws-actions/configure-aws-credentials` using GitHub OIDC, and runs
  `sst deploy --stage production`.
- **IAM:** a dedicated role trusted by GitHub's OIDC provider, scoped to the
  `PrenSJ2/portfolio` repo. Whether the OIDC provider already exists in account
  `203918846799` must be checked; create it if absent.

### 5. Cleanup

Delete: `functions/`, `wrangler.toml`, `netlify.toml`, `next.config.cjs`,
`.dev.vars.example`, `app/routes/api.set-theme.js`.

`package.json`: drop `@remix-run/cloudflare`, `@remix-run/cloudflare-pages`,
`@remix-run/react`, `@remix-run/dev` and `wrangler`; add `react-router`,
`@react-router/dev`, `@react-router/node` and `sst`. The `start` and `deploy` scripts
(both wrangler-based) are replaced.

Dropping `wrangler` also breaks the `deploy:storybook` script, which deploys to
Cloudflare Pages. That script is removed. `dev:storybook` and `build:storybook` are
unaffected and stay.

Update `seb.onlineolive.xyz` → `seb.onlineo.live` in `app/config.json` and
`public/sitemap.xml`. Update the `homepage` field in `package.json`, which points at the
also-dead `seb.onlineolive.com`.

## Verification

1. `npm run build` produces `build/client` containing an `index.html` for each of the 14
   prerendered paths plus `404.html`.
2. Local preview: every route renders server-side content with correct `<title>`, meta
   and canonical tags; no blank shell.
3. Theme toggle persists across reload with no flash of the wrong theme, and no React
   hydration warnings in the console.
4. After deploy: `https://seb.onlineo.live` serves over HTTPS with a valid cert; deep
   links (e.g. `/projects/thoth`) return 200 with real HTML; an unknown path returns the
   styled 404.
5. A push to `main` triggers the workflow and the change appears on the live site.

## Out of scope

- `app/layouts/navbar/nav-data.js:21` links to `https://cv.onlineolive.xyz`, a separate
  CV site on the dead domain. This link stays broken; repointing it is a separate task.
- No redirect from `seb.onlineolive.com` or `seb.onlineolive.xyz`. Neither resolves, so
  this is a clean cut-over.
- Storybook deployment is not migrated to AWS. The `deploy:storybook` script is removed
  along with wrangler; re-hosting Storybook is a separate task.
