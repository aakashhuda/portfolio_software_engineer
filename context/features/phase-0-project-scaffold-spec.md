# Phase 0 — Project scaffold

## Overview

A running Astro project with static output and content collections, ready for everything else to build on. The repo currently holds only the `context/` docs — there is no `package.json` yet. This phase installs Astro (JavaScript, no TypeScript), wires up the content layer, and adds minimal placeholder pages and layout so `npm run dev` and `npm run build` both work cleanly.

## Requirements

- Install Astro in the repo root with JavaScript (no TypeScript): `npm create astro@latest -- --template minimal`, then set `output: 'static'` in `astro.config.mjs` per `architecture.md`.
- Set `site` in `astro.config.mjs` to the production domain — a placeholder is fine; the final value is confirmed in Phase 4.
- Create `src/content.config.js` (JavaScript, not `.ts`; Astro supports `.js` content config files) with the `projects` and `blog` collections exactly as specified in `architecture.md`:
  - `projects`: `title`, `description`, `date`, `tags` (default `[]`), `role` (optional), `status` enum (`completed` | `in-progress` | `archived`, default `completed`), `featured` (default `false`), `liveUrl`/`repoUrl` (optional URLs), `images` gallery (default `[]`), `order` (optional).
  - `blog`: `title`, `description`, `date`, `tags` (default `[]`), `draft` (default `false`).
- Create `src/layouts/BaseLayout.astro` — `<html>`, `<head>`, shared nav, and a footer with the plain `mailto:` email link.
- Create `src/styles/global.css` placeholder — CSS variables, reset, base typography only (the real design system comes in Phase 1).
- Create minimal placeholder pages: `src/pages/index.astro`, `src/pages/projects/[id].astro`, `src/pages/blog/index.astro`, `src/pages/blog/[id].astro`.
- Add `.gitignore` per `git-conventions.md`: `node_modules/`, `dist/`, `.env`, `.env.*`, `!.env.example`, `.astro/`.
- Acceptance criteria:
  - `npm run dev` runs without errors and serves a placeholder home page.
  - `npm run build` completes with no Content Collection or config errors.

## Note

- **Business rules:** AGENTS.md's five business rules concern session/order data, which does not exist in this portfolio project — nothing to preserve in this phase.
- **Git workflow:** branch `phase-0-project-scaffold` off `main`; commit messages prefixed `[phase-0]` in imperative mood; squash-merge to `main` once "done when" passes; tag the merge commit `phase-0-complete`. Git is already initialized in this repo (context docs committed) — the Phase 0 `git init` per `git-conventions.md` is effectively already done.
- **JS over TS:** `architecture.md` shows `src/content.config.ts`, but this project mandates plain JavaScript (no TypeScript). Use `src/content.config.js` — Astro supports it. Do not create `tsconfig.json` or `.ts` files.
- **No secrets:** never commit `.env`; the `!.env.example` gitignore exception keeps a placeholder example committable if env vars ever appear.
- **Placeholder by design:** pages carry no real content or styling yet — the design system lands in Phase 1, content in Phase 2.
- **Astro versions:** `npm create astro@latest` may scaffold a newer Astro than the docs assume; use the Content Layer loader API (`glob` from `astro/loaders` + `defineCollection` from `astro:content`) as shown in `architecture.md`.

## References

- `context/phases.md` — Phase 0 source (goal, tasks, done-when)
- `context/architecture.md` — tech stack, folder structure, content collection schemas, Astro config
- `context/git-conventions.md` — `.gitignore` contents, branch/tag/commit conventions
- `context/project-overview.md` — project constraints (vanilla-only, static output)
- AGENTS.md — build commands (`npm run dev`, `npm run build`) and doc-reading order
