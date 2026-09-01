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

- **Phase 1 — Design system & UI** — Completed
  - Authored brutalist × minimalist design tokens in `src/styles/global.css`: muted-warm palette, spacing/type scales, border widths, hard offset shadows, focus states.
  - Brightened the palette with a signal blue action/identity color and amber moment/status color; wired in Space Grotesk, Inter, and JetBrains Mono via Google Fonts.
  - Built base component styles (buttons, cards, tags, links, nav, footer) and reusable components: `ProjectCard`, `BlogPostCard`, `ProjectGallery`, `ExperienceItem`.
  - Applied the system to the home page (hero/about, projects grid, experience), project detail, blog list, and blog post pages.
  - Added one authored hero entrance (mark slide-in, name clip reveal, accent underline draw) plus fast hover/press feedback, respecting reduced-motion preferences.
  - Made the layout responsive down to phone widths with intact brutalist borders and offset shadows.
  - Verified: `npm run build` passes with no config/content collection errors (empty-content warnings are expected until Phase 2).
