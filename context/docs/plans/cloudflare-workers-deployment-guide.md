# Cloudflare Workers Deployment Guide (Phase 4)

Deploy this Astro portfolio to **Cloudflare Workers** using **Workers Static
Assets**, with **CI/CD via Workers Builds** connected to the GitHub repo. Every
push to `main` rebuilds and redeploys automatically.

The site is fully static (`output: 'static'`), so **no adapter is needed** —
Wrangler uploads the built `dist/` folder as static assets served at the
edge. This guide is written to be executed top to bottom, one step at a
time. After each step succeeds, log it in `context/current-feature.md`.

> Replace the placeholder **`YOUR-DOMAIN.COM`** below with the real domain
> from your Cloudflare account (e.g. `mahbub.dev`). It appears in
> `astro.config.mjs`, `wrangler.jsonc`, and the verification URLs. The
> `.workers.dev` URL needs no replacement — Wrangler generates it.

---

## 1. Prerequisites

- [ ] Cloudflare account (already have one) with the production domain on it.
- [ ] GitHub repo connected as `origin`:
      `github.com/aakashhuda/portfolio_software_engineer`.
- [ ] Node `>=22.12.0` locally (matches `package.json` `engines`).
- [ ] Decide the production domain and keep it handy as `YOUR-DOMAIN.COM`.

---

## 2. Set the production `site` in `astro.config.mjs`

Currently the `site` is a placeholder confirmed in this phase. Open
`astro.config.mjs` and set it to the real domain:

```js
// astro.config.mjs
export default defineConfig({
  output: 'static',
  site: 'https://YOUR-DOMAIN.COM', // real domain, replaces the Phase 0 placeholder
});
```

The `site` value is used for any absolute/canonical URLs Astro generates, so
set it before building.

---

## 3. Add `wrangler.jsonc` at the repo root

Create `wrangler.jsonc` so the project deploys as a Worker with static
assets. The `assets.directory` points Wrangler at the built `dist/`.

```jsonc
// wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "portfolio",
  "main": "src/worker.js",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

Notes:

- **`name`** — kebab-case Worker project name (must be unique on
  `workers.dev`; pick e.g. `portfolio` or `mahbub-portfolio`).
- **`main`** — points at `src/worker.js`, the minimal Worker entry created in
  step 4. Workers Static Assets serves `dist/` itself; the entry is what makes
  this a deployable Worker project that Workers Builds can manage.
- **`assets.not_found_handling`** — `"single-page-application"` serves
  `index.html` for unknown paths; switch to `"none"` if you'd rather have
  real 404s. This is a multi-page Astro site (no client router), so
  `"single-page-application"` is the safest fallback.
- **`compatibility_date`** — today's date (or newer). Wrangler suggests a
  date on first run; use that if it differs.

---

## 4. Create the minimal Worker entry `src/worker.js`

This file exists so the project is a real Worker (needed for Workers
Builds). It does nothing but let the static assets serve the request:

```js
// src/worker.js
export default {
  async fetch(request, env, ctx) {
    return env.ASSETS.fetch(request);
  },
};
```

With Workers Static Assets, `env.ASSETS.fetch(request)` serves the files in
`dist/` (the assets directory from `wrangler.jsonc`) and applies the
`not_found_handling` fallback automatically.

---

## 5. Install Wrangler as a dev dependency

```bash
npm install -D wrangler
```

Verify the install:

```bash
npx wrangler --version
```

This is the first new package since Phase 0, so `package.json` and
`package-lock.json` both change. Wrangler is a dev dependency only — it never
ships in the built site.

---

## 6. Build the site locally

```bash
npm run build
```

Confirm the static output exists:

```bash
ls dist/
# index.html, projects/, blog/, _astro/, ...  (your built site)
```

`dist/` stays in `.gitignore` — the built site is never committed. Workers
Builds will run `npm run build` on Cloudflare's side in step 9.

---

## 7. Authenticate Wrangler

```bash
npx wrangler login
```

This opens a browser to authorize Wrangler against your Cloudflare account.
Confirm it succeeds with:

```bash
npx wrangler whoami
```

---

## 8. First manual deploy

Deploy once to create the project and confirm the assets serve over HTTPS:

```bash
npx wrangler deploy
```

When it finishes, Wrangler prints the Worker's URLs. Open the
`https://<project-name>.<your-subdomain>.workers.dev` URL and confirm the
home page and its assets load. This is the same static build that Workers
Builds will produce from now on.

---

## 9. Connect Workers Builds (CI/CD)

This wires the GitHub repo so every push to `main` rebuilds and redeploys.

1. Cloudflare dashboard → **Workers & Pages** → **Workers Builds**.
2. **Create application** → connect the GitHub account/repo
   `aakashhuda/portfolio_software_engineer`.
3. Configure the build:
   - **Framework preset:** Astro (if offered), or set manually:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `22` (or whatever matches `package.json` `engines`,
     which is `>=22.12.0`).
4. Save. Cloudflare installs dependencies and runs the build on its side.

> Workers Builds builds on Cloudflare's infrastructure from the pushed
> source. It runs `npm install` then `npm run build`, uploads the resulting
> `dist/` as static assets, and creates a **preview deployment** for PRs and
> a **production deployment** for pushes to `main`.

---

## 10. Attach the production domain

Your domain is already on Cloudflare, so DNS is handled automatically.

1. Cloudflare dashboard → **Workers & Pages** → your Worker project.
2. **Settings** → **Domains & Routes** → **Add** → **Custom domain**.
3. Enter `YOUR-DOMAIN.COM` and save. Cloudflare creates/updates the DNS
   record and issues the certificate automatically.

You can also add the `www` subdomain the same way if you want both the apex
and `www` to resolve.

---

## 11. Verify the live deploy

- Visit `https://YOUR-DOMAIN.COM` — the home page, projects, blog, and
  assets should all load over HTTPS.
- Push a real commit to `main` (or make a trivial one such as a content
  change) and confirm **Workers Builds** runs a new build and production
  deployment automatically. Reload the live URL to confirm the change is up.
- Check a PR preview once: open a PR against `main` and confirm Workers
  Builds creates a preview URL.

---

## 12. Logging progress

Per the project workflow, after each completed step, append a bullet under a
new **Phase 4 — Cloudflare Workers deployment & CI/CD** section in
`context/current-feature.md`'s History, e.g.:

```markdown
- **Phase 4 — Cloudflare Workers deployment & CI/CD** — In Progress
  - Set `site` to https://YOUR-DOMAIN.COM in `astro.config.mjs`.
  - Added `wrangler.jsonc` + minimal `src/worker.js`.
  - Installed Wrangler as a dev dependency.
  - `npx wrangler deploy` serves the site at <project>.workers.dev.
  - Connected Workers Builds to the GitHub repo (build `npm run build`, output `dist`).
  - Attached `YOUR-DOMAIN.COM` to the Worker.
  - Pushed to `main` and confirmed the auto-build/deploy.
```

---

## Done when

- [ ] `https://YOUR-DOMAIN.COM` serves the site over HTTPS.
- [ ] Pushing to `main` triggers a Workers Build that deploys automatically
      (verified once end-to-end).
- [ ] `site` in `astro.config.mjs` matches the live production domain.

---

## Troubleshooting

- **Workers Builds build fails** — check the build logs in the Workers Builds
  dashboard. Most likely causes: the Node version doesn't satisfy
  `engines` (`>=22.12.0`), or the build command / output directory doesn't
  match (`npm run build`, `dist`).
- **Custom domain doesn't resolve** — confirm the domain's zone is active in
  Cloudflare and the Worker's **Domains & Routes** shows the custom domain.
  DNS propagation can take a few minutes.
- **`wrangler deploy` auth error** — re-run `npx wrangler login`, then
  `npx wrangler whoami`.
- **Assets 404 / fallback not working** — check `assets.not_found_handling`
  in `wrangler.jsonc` and that `assets.directory` points at `./dist`.
- **Portfolio is a multi-page site, not an SPA** — every route
  (`/projects/[id]`, `/blog/[id]`) is a real generated HTML file, so it works
  fine with Workers Static Assets. The `single-page-application` fallback
  only matters for truly unknown paths.
