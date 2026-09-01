# Current Feature

<!-- Feature name -->

## Status

Not Started | Loaded | In Progress | Completed

## Goals

<!-- Placeholder: goals are populated by the `start` action when a feature begins. -->

## References

<!-- Placeholder: references are populated by the `start` action when a feature begins. -->

## Notes

<!-- Placeholder: notes are populated by the `start` action when a feature begins. -->

## History

- **Phase 0 — Project scaffold** — Completed
  - Astro 7.2 installed (JS, no TypeScript) with `output: 'static'` and placeholder `site` in `astro.config.mjs`.
  - `src/content.config.js` with `projects` and `blog` content collections per `architecture.md`.
  - `src/layouts/BaseLayout.astro` with shared nav and plain `mailto:` footer; `src/styles/global.css` placeholder.
  - Placeholder pages: `src/pages/index.astro`, `src/pages/projects/[id].astro`, `src/pages/blog/index.astro`, `src/pages/blog/[id].astro`.
  - `.gitignore` updated per `git-conventions.md`.
  - Verified: `npm run dev` serves home page; `npm run build` completes with no config/content collection errors.
  - Merged to `main` and tagged `phase-0-complete`.
