# Project Overview — Developer Portfolio Website

- Name: Syed Mahbubul Huda
- Software Engineer
- Experience: 5 years
- Primary Stack: Python, Django, FastAPI, Vue, Nuxt, Astro, SQL based DBs, NoSQL(firebase, etc), Shopify
- Primary Interest: Agentic Development
- GitHub: https://github.com/aakashhuda
- Worked with: SyncDots, Instaprivat - (2021-2022), EchoLogyx - (2022-2024), Ichiban Autos(WorkshopLogic) - (2024-Present)
- Work Links
  - SyncDots: https://syncdots.id/
  - InstaPrivat: https://instaprivat.com/
  - EchoLogyx: https://www.echologyx.com/
  - WorkhopLogic: https://www.workshoplogic.com/
- Projects Worked:
  - SyncDots
    - InstaPrivat: https://instaprivat.com/
  - EchoLogyx
    - Ninety Percent: https://ninetypercent.com/
    - ELX ChatBot: https://www.elxchatbot.ai/
  - Ichiban Autos
    - WorkshopLogic: https://www.workshoplogic.com/

## Purpose

A personal portfolio website to showcase who I am as a software developer,
the projects I've built, my professional experience, and a way for people
to contact me. Fully static, fast, and free of framework bloat.

## Goals

- Present a clear, credible snapshot of my skills and work to recruiters,
  clients, and collaborators.
- Give each project real depth — not just a card, but a full write-up page.
- Keep the codebase simple enough to hand-maintain: no build complexity
  beyond what Astro provides out of the box.
- Ship a fast, static site with no client-side framework overhead.

## Target Audience

- Recruiters / hiring managers scanning quickly for relevant experience.
- Fellow developers or potential clients who want to see project depth
  (approach, challenges, stack decisions) — not just a live link.

## Core Features

1. **Hero / About**
   Short intro, who I am, what I do, links to socials/resume.

2. **Projects Showcase**
   - A grid/list of project cards (title, short description, tags, links).
   - Each project links to its own **details page**, generated from a
     Markdown file, with the full write-up and (optionally) screenshots.
   - Not every project has a live demo — screenshots on the details page
     fill that gap where relevant.

3. **Experience**
   Timeline or list of roles, companies, dates, and highlights.

4. **Contact**
   No contact form. My email address is simply listed in the site
   footer (plain `mailto:` link) — no backend, no form handling needed.

5. **Blog**
   - A blog list page showing all posts (title, date, short excerpt/tags).
   - Each post links to its own **details page**, generated from a
     Markdown file, same pattern as projects.
   - Authored the same way as project write-ups: one Markdown file per
     post, read via Astro Content Collections.

## Content Strategy

- Both project write-ups and blog posts are authored as **Markdown
  files**, one per project / one per post.
- Astro's **Content Collections** (content layer) read and type-check
  these files, and generate a static route per entry at build time
  (`/projects/[id]` and `/blog/[id]`).
- Card-level info (title, description, tags, etc.) lives in each file's
  frontmatter; the full write-up is the Markdown body.
- For projects: screenshots are optional and only appear on that
  project's details page — never on the card.
- For blog posts: same pattern, just without the project-specific
  fields (links, images gallery) — see `architecture.md` for the schema.

## Constraints & Decisions

- **Astro** as the framework, with **static output** (`output: 'static'`)
  — the whole site is pre-rendered to HTML at build time.
- **Vanilla HTML, CSS, and JavaScript only.** No UI framework (React,
  Vue, Svelte, etc.), no CSS framework (Tailwind, Bootstrap, etc.), and
  no additional npm packages beyond Astro itself. Any interactivity
  (nav toggle, form validation, etc.) is plain `<script>` JS.
- **Design/UI comes later.** This phase defines structure and content
  plumbing only. Visual design will be done in a follow-up pass using
  Claude Code, working against the scaffolding defined here.
- **No CMS, no database.** Content is just Markdown files in the repo.

## Out of Scope (for now)

- Contact form (deliberately dropped — email in footer is sufficient).
- Dark mode toggle (can be added later without changing content structure).
- Analytics/tracking integration.
- Any client-side framework islands.

## Success Criteria

- `npm run build` produces a fully static `dist/` deployable to any
  static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
- Adding a new project requires only: dropping a new `.md` file into
  `src/content/projects/` (plus images if any) — no code changes.
- Adding a new blog post requires only: dropping a new `.md` file into
  `src/content/blog/` — no code changes.
- Zero runtime dependencies beyond what Astro's core needs to build.
