# Phase 2 — Project & blog content

## Overview

Put real content behind the Phase 1 design: full, depth-first write-ups for
every project listed in `project-overview.md`, plus 2–3 blog posts that
match the site's voice. Content is authored as Markdown files in
`src/content/projects/` and `src/content/blog/`, read through Astro Content
Collections, and rendered as static pages by the existing
`/projects/[id]` and `/blog/[id]` routes. The write-up depth — approach,
challenges, stack decisions — is the point for this audience (recruiters and
fellow developers).

## Requirements

- For each project in `project-overview.md` — SyncDots, InstaPrivat,
  EchoLogyx, ELX ChatBot, WorkshopLogic, Ninety Percent — write a Markdown
  file in `src/content/projects/` with frontmatter per `architecture.md`:
  `title`, `description`, `date`, `tags`, `role`, `status`, `featured`,
  `liveUrl`/`repoUrl` where they exist, and `images` where screenshots are
  available.
- Write each project body with real depth — approach, challenges, stack
  decisions, what the reader would learn from it — not just a feature list.
- Add screenshots under `public/images/projects/<id>/` where available.
  Cards never show images; only the detail page does (via the `images`
  gallery).
- Flag any project that has no live link and lean on screenshots + write-up
  to carry it.
- Write 2–3 blog posts that fit the site's voice (e.g. agentic development,
  why the vanilla/Astro setup, lessons from a shipped project) into
  `src/content/blog/`.
- Mark work-in-progress entries with `status: "in-progress"` or
  `draft: true` rather than leaving them half-finished.

### Acceptance criteria (from "Done when")

- Every project from `project-overview.md` renders at `/projects/[id]` with
  its full write-up and (where provided) screenshots, with no schema errors.
- The projects grid and blog list render all entries with sensible ordering.
- `npm run build` passes.

## Note

- The five business rules in AGENTS.md: this phase touches content/session
  and order data only through project frontmatter — real links, correct
  employer attribution (Ichiban Autos → WorkshopLogic), and no invented
  credentials or misrepresented work. Content must stay truthful and
  maintainable as Markdown-only.
- Git workflow: branch `phase-2-project-blog-content` off an up-to-date
  `main`, commit messages tagged `[phase-2] ...`, and tag the merge commit
  on `main` as `phase-2-complete` after the "Done when" checklist passes.
- The projects collection schema lives in `src/content.config.js`
  (JavaScript, per Phase 0) — `liveUrl`, `repoUrl`, and `images` are
  optional; omit them rather than leaving empty stubs.
- Blog posts support a `draft: true` frontmatter flag that filters them out
  of the blog list and static paths; use it for WIP posts.
- Screenshots are optional everywhere — a project with no images is a valid
  state already handled by the gallery component.
- Where the source-of-truth lives: `project-overview.md` is the canonical
  list of projects and their links; it is a "Worked with" history, so dates
  and statuses should reflect real chronology (2021–2022 SyncDots/InstaPrivat,
  2022–2024 EchoLogyx, 2024–present WorkshopLogic).
- No new npm packages, no client-side frameworks — plain Markdown content
  only, per `architecture.md`.

## References

- `context/phases.md` — Phase 2 section (source of Goal/Tasks/Done when)
- `context/project-overview.md` — canonical project list and work history
- `context/architecture.md` — content collections schema, folder structure,
  example project/blog entries
- `src/content.config.js` — the actual collection schemas (projects + blog)
- `src/pages/projects/[id].astro`, `src/pages/blog/index.astro`,
  `src/pages/blog/[id].astro` — the rendering routes the content feeds
- `src/components/ProjectGallery.astro` — the detail-page-only image gallery
- `context/git-conventions.md` — branching and tagging rules for phases
