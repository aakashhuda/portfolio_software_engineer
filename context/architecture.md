# Architecture — Developer Portfolio Website

## 1. Tech Stack

| Layer         | Choice                                                             |
| ------------- | ------------------------------------------------------------------ |
| Framework     | Astro (core only — no UI framework integrations)                   |
| Rendering     | Fully static (`output: 'static'`)                                  |
| Content       | Astro Content Collections, reading local Markdown                  |
| Styling       | Plain CSS (global stylesheet + scoped `<style>` in `.astro` files) |
| Interactivity | Plain `<script>` JS, no client framework islands                   |
| Package deps  | None beyond Astro itself                                           |

No React/Vue/Svelte/Tailwind/Sass/npm UI kits. Astro's own `astro:content`
and `astro:assets` modules cover everything needed here.

---

## 2. Folder Structure

```
portfolio/
├── astro.config.mjs
├── package.json
├── src/
│   ├── content.config.ts          # Content Collections schema + loader
│   ├── content/
│   │   ├── projects/
│   │   │   ├── task-tracker-app.md
│   │   │   ├── ai-recipe-finder.md
│   │   │   └── ...
│   │   └── blog/
│   │       ├── learning-astro-content-layer.md
│   │       ├── why-i-went-vanilla-js.md
│   │       └── ...
│   ├── layouts/
│   │   └── BaseLayout.astro       # <html>, <head>, shared nav/footer (footer has email link)
│   ├── pages/
│   │   ├── index.astro            # Hero + About + Experience + Projects grid
│   │   ├── projects/
│   │   │   └── [id].astro         # Project details page (one per Markdown file)
│   │   └── blog/
│   │       ├── index.astro        # Blog list page
│   │       └── [id].astro         # Blog post details page
│   ├── components/
│   │   ├── ProjectCard.astro
│   │   ├── ProjectGallery.astro
│   │   ├── BlogPostCard.astro
│   │   └── ExperienceItem.astro
│   └── styles/
│       └── global.css             # CSS variables, resets, base typography
└── public/
    ├── images/
    │   └── projects/
    │       └── task-tracker-app/
    │           ├── board-view.png
    │           └── dark-mode.png
    └── resume.pdf
```

Whether Home is a single page with anchor sections (`#about`, `#projects`,
`#experience`) or split into separate pages is a design-time decision —
the content layer below doesn't care either way. Blog gets its own
top-level section (`/blog`, `/blog/[id]`) since it's an ongoing stream
of content rather than a fixed showcase.

---

## 3. Astro Config

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static", // full static site generation, no server/SSR
  site: "https://yourdomain.com", // needed for sitemap/canonical URLs later
});
```

No integrations are required for vanilla HTML/CSS/JS — Astro components
(`.astro`) already compile down to static HTML with scoped CSS, and any
`<script>` tags are bundled and shipped as plain JS by Vite under the hood
(no framework runtime included).

---

## 4. Content Collections

### `src/content.config.ts`

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // shown on the card
    date: z.coerce.date(),

    tags: z.array(z.string()).default([]),
    role: z.string().optional(),
    status: z
      .enum(["completed", "in-progress", "archived"])
      .default("completed"),
    featured: z.boolean().default(false),

    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),

    // Details-page-only screenshot gallery. Never used on the card.
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
      )
      .default([]),

    order: z.number().optional(),
  }),
});

export const collections = { projects };
```

Each Markdown file in `src/content/projects/` becomes one entry. The
filename (minus extension) is used as `project.id` and drives the route
`/projects/[id]`.

### Example project entry

```markdown
---
title: "Task Tracker App"
description: "A minimal Kanban-style task manager."
date: 2025-11-02
tags: ["SvelteKit", "PostgreSQL"]
status: "completed"
featured: true
liveUrl: "https://tasktracker.example.com"
repoUrl: "https://github.com/yourname/task-tracker"
images:
  - src: "/images/projects/task-tracker-app/board-view.png"
    alt: "Kanban board view"
    caption: "Drag-and-drop board"
---

## Overview

Full write-up in Markdown here.
```

### Blog collection — `src/content.config.ts` (add alongside `projects`)

Same pattern as projects, but without the project-specific fields
(links, screenshot gallery). A `draft` flag is useful here since blog
posts tend to get started before they're ready to publish.

```ts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // shown on the blog list page
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
```

### Example blog entry

```markdown
---
title: "Why I Went Vanilla JS for My Portfolio"
description: "No frameworks, no build-step drama — just HTML, CSS, and JS."
date: 2026-01-10
tags: ["Astro", "Vanilla JS", "Web Dev"]
draft: false
---

## The reasoning

Full post body in Markdown here.
```

---

## 5. Pages & Routing

### Home (`src/pages/index.astro`)

Pulls the collection, sorts/filters it, and renders `ProjectCard` for
each entry as plain HTML (no client JS needed for the grid itself).

```astro
---
import { getCollection } from 'astro:content';
import ProjectCard from '../components/ProjectCard.astro';

const projects = (await getCollection('projects'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<section id="projects">
  {projects.map(project => (
    <ProjectCard project={project} />
  ))}
</section>
```

### Project details (`src/pages/projects/[id].astro`)

Static paths are generated at build time — one HTML file per Markdown
file, fully pre-rendered.

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectGallery from '../../components/ProjectGallery.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(project => ({
    params: { id: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
---
<BaseLayout title={project.data.title}>
  <h1>{project.data.title}</h1>

  <div class="links">
    {project.data.liveUrl && <a href={project.data.liveUrl}>Live Demo</a>}
    {project.data.repoUrl && <a href={project.data.repoUrl}>Source Code</a>}
  </div>

  {project.data.images.length > 0 && (
    <ProjectGallery images={project.data.images} />
  )}

  <article>
    <Content />
  </article>
</BaseLayout>
```

### Blog list (`src/pages/blog/index.astro`)

Filters out drafts and sorts newest-first.

```astro
---
import { getCollection } from 'astro:content';
import BlogPostCard from '../../components/BlogPostCard.astro';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<section id="blog">
  {posts.map(post => (
    <BlogPostCard post={post} />
  ))}
</section>
```

### Blog post details (`src/pages/blog/[id].astro`)

Same static-paths pattern as project details.

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(post => ({
    params: { id: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<BaseLayout title={post.data.title}>
  <h1>{post.data.title}</h1>
  <p>{post.data.date.toLocaleDateString()}</p>
  <article>
    <Content />
  </article>
</BaseLayout>
```

---

## 6. Styling Approach

- One global stylesheet (`src/styles/global.css`) imported in
  `BaseLayout.astro`, holding CSS custom properties (colors, spacing,
  font stacks), resets, and base typography.
- Component-specific styling lives in each `.astro` file's `<style>`
  block, which Astro scopes automatically — no BEM gymnastics needed,
  no CSS-in-JS, no preprocessor.
- No design tokens/utility classes from any external library — that's
  intentional groundwork for whatever visual direction gets picked
  later with Claude Code.

---

## 7. JavaScript Approach

- Any interactivity (mobile nav toggle, contact form submit handling,
  smooth-scroll to sections) is written as plain JS in `<script>` tags
  inside `.astro` files, or imported from `src/scripts/*.js`.
- Astro strips these of any framework runtime — they ship as small,
  plain `<script type="module">` bundles.
- No client directives (`client:load`, etc.) are needed since there are
  no framework components to hydrate.

---

## 8. Contact

No contact form, no backend needed. The footer in `BaseLayout.astro`
simply includes a plain `mailto:` link:

```astro
<footer>
  <a href="mailto:you@example.com">you@example.com</a>
</footer>
```

Nothing further to build here — it's static markup like everything else.

---

## 9. Build & Deployment

```bash
npm run build   # outputs fully static site to ./dist
```

`dist/` is deployable as-is to any static host: Netlify, Vercel
(static mode), GitHub Pages, Cloudflare Pages, etc. No server process
required at runtime.

---

## 10. Non-Goals

- No contact form / no backend of any kind.
- No UI framework islands (React/Vue/Svelte).
- No CSS framework or utility-class library.
- No CMS or database — Markdown files in the repo are the only
  content source.
- No server-side rendering — every route is pre-rendered at build time.

---

## 11. Extension Points (later, if wanted)

- Add a `draft: boolean` field to the project schema too (blog already
  has one), to stage unpublished project write-ups.
- Add pagination or tag-filtering to the projects grid and/or blog list
  once there are enough entries to warrant it — still doable in vanilla JS.
- Add an RSS feed for the blog using Astro's built-in `@astrojs/rss`
  helper if desired later (only addition that would touch `package.json`).
