# Phase 1 — Design system & UI

## Overview

A unique visual identity that fuses Brutalism and Minimalism — thick black borders and hard offset shadows (the Brutalist foundation), but on a soft, muted, minimalist palette instead of loud flat colors. Built as a reusable design system first in `src/styles/global.css`, then applied to every page in the Phase 0 scaffold. The result is a deliberate, accessible, responsive portfolio UI ready for real content in Phase 2.

## Requirements

- Run the self-contained design prompt from `context/phases.md` directly through command code to produce the design system.
- Author the design tokens in `src/styles/global.css`: color palette, spacing scale, type scale (strong display face + monospace accents), border widths, hard-offset shadow tokens, focus states.
- Build base component styles from those tokens only: buttons, cards, tags, links, nav, footer.
- Apply the system to every page: hero/about, projects grid, project details, blog list, blog post, contact/footer.
- Make it responsive — the brutalist borders and offset shadows must hold together down to phone widths.
- Keep accessibility intact: sufficient contrast for the muted palette, visible focus outlines, and a clear pressed effect (shadow shift) on interactive elements.

Acceptance criteria:

- Every page is styled from design tokens only — no hard-coded colors, border widths, or shadows scattered in component styles.
- The home page looks intentional and consistent on a desktop browser and a phone-sized viewport, and the brutalist/minimalist fusion reads as a deliberate style, not a clash.
- All links, buttons, and cards have visible hover/focus/pressed states.
- `npm run build` passes.

## Note

- Preserve the project's non-negotiable constraints: vanilla HTML/CSS/JS only (no UI framework, no CSS framework, no utility classes, no extra npm packages), static Astro output, and no secrets in the repo. Styling lives in `src/styles/global.css` plus scoped `<style>` blocks in `.astro` components.
- This phase touches no session/order data, but the five business rules in `AGENTS.md` remain in force for any future work; do not relax them here.
- Expected git workflow: branch off an up-to-date `main` as `phase-1-design-system-ui`, commit with `[phase-1]` prefixes, merge only after the "done when" checklist passes, then tag the merge on `main` as `phase-1-complete`.
- The design prompt is copy-paste ready and self-contained; it defines the exact deliverable for the tokens and their application.

## References

- `context/phases.md` — Phase 1 section (goal, tasks, design prompt, done-when).
- `context/architecture.md` — tech stack and directory layout constraints.
- `context/coding-standards.md` — conventions, error handling, security rules.
- `context/git-conventions.md` — branching, commit, and tag conventions.
- `context/docs/plans/how-feature-spec-made.md` — the spec structure this file follows.
- `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/*` — Phase 0 files to be styled.
