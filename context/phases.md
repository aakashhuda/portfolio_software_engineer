# Development Phases

Run these phases in order, one at a time. Each phase has a
clear goal, the files it touches, and a "done when" checklist you can verify
before moving to the next phase. Don't skip ahead — later phases assume
earlier ones are working first.

Reference `project-overview.md`, `architecture.md`, `conding-standards.md`,
and `git-conventions.md` throughout — they define the rules that must not be
relaxed in any phase (vanilla HTML/CSS/JS only, static output, Markdown-only
content, no secrets in the repo).

---

## Phase 0 — Project scaffold

**Goal:** A running Astro project with static output and content
collections, ready for everything else to build on.

**Tasks:**

- Initialize the Astro project in the repo root (the repo currently holds
  only the `context/` docs) with TypeScript strict and
  `output: 'static'` in `astro.config.mjs`, per `architecture.md`.
- Set `site` in `astro.config.mjs` to the production domain (final value
  confirmed in Phase 4 — a placeholder is fine here).
- Create `src/content.config.ts` with the `projects` and `blog`
  collections exactly as specified in `architecture.md`.
- Create `src/layouts/BaseLayout.astro` — `<html>`, `<head>`, shared nav,
  and the footer with the plain `mailto:` email link.
- Create `src/styles/global.css` placeholder (CSS variables, reset, base
  typography only — the real design system comes in Phase 1).
- Create minimal placeholder pages: `src/pages/index.astro`,
  `src/pages/projects/[id].astro`, `src/pages/blog/index.astro`,
  `src/pages/blog/[id].astro`.
- Add `.gitignore` per `git-conventions.md` (`node_modules/`, `dist/`,
  `.astro/`, `.env`).

**Done when:**

- `npm run dev` runs without errors and serves a placeholder home page.
- `npm run build` completes with no Content Collection or config errors.

---

## Phase 1 — Design system & UI

**Goal:** A unique visual identity that fuses **Brutalism** and
**Minimalism** — thick black borders and hard offset shadows (the Brutalist
foundation), but on a soft, muted, minimalist palette instead of loud flat
colors. Built as a reusable design system first, then applied to every page.

**Tasks:**

- Run the design prompt below (it's self-contained — hand it to command code
  directly).
- Author the design tokens in `src/styles/global.css`: color palette,
  spacing scale, type scale (strong display face + monospace accents),
  border widths, hard-offset shadow tokens, focus states.
- Build base component styles from those tokens only: buttons, cards, tags,
  links, nav, footer.
- Apply the system to every page: hero/about, projects grid, project
  details, blog list, blog post, contact/footer.
- Make it responsive — the brutalist borders and offset shadows must hold
  together down to phone widths.
- Keep accessibility intact: sufficient contrast for the muted palette,
  visible focus outlines, and a clear pressed effect (shadow shift) on
  interactive elements.

**Design prompt (copy-paste):**

```text
Design the UI for my portfolio website using a fusion of Brutalism and
Minimalism.

Foundation (Brutalism): thick black borders (2-3px solid), hard offset
shadows with zero blur (e.g. box-shadow: 6px 6px 0 0 #000), bold confident
typography, visible structural grid, raw edges that feel intentional.

Color (Minimalism): instead of loud flat primaries, use a soft, muted,
minimalist palette — a warm off-white/cream background, soft desaturated
accents, and black as the dominant structural color. The overall feel is
calm and refined; only the layout and borders stay hard-edged.

Restraint (Minimalism): generous whitespace, clear hierarchy, nothing
decorative that doesn't earn its place.

Deliverables:
1. A design system in src/styles/global.css: CSS custom properties for the
   palette, spacing scale, type scale (strong display face + monospace
   accents), border widths, shadow tokens, focus states, and base styles
   for buttons, cards, tags, links, nav, and footer.
2. Apply it consistently to every page: hero/about, projects grid, project
   details, blog list, blog post, and the contact footer.
3. Responsive behavior down to phone widths — offsets and grid must not
   break.
4. Accessible: readable contrast on the muted palette, visible focus
   outlines, hover/pressed states that shift the hard shadows.

Constraints: vanilla HTML, CSS, and JavaScript only. No UI framework, no
CSS framework, no utility classes, no extra npm packages. Styling lives in
src/styles/global.css plus scoped <style> blocks in .astro components.
```

**Done when:**

- Every page is styled from design tokens only — no hard-coded colors,
  border widths, or shadows scattered in component styles.
- The home page looks intentional and consistent on a desktop browser and a
  phone-sized viewport, and the brutalist/minimalist fusion reads as a
  deliberate style, not a clash.
- All links, buttons, and cards have visible hover/focus/pressed states.
- `npm run build` passes.

---

## Phase 2 — Project & blog content

**Goal:** Real content behind the design — full write-ups for every project
listed in `project-overview.md`, plus enough blog posts to make the blog
section credible.

**Tasks:**

- For each project in `project-overview.md` (SyncDots, InstaPrivat,
  EchoLogyx, ELX ChatBot, WorkshopLogic, Ninety Percent), write a Markdown
  file in `src/content/projects/` with frontmatter per `architecture.md`
  (`title`, `description`, `date`, `tags`, `role`, `status`, `featured`,
  `liveUrl`/`repoUrl` where they exist, `images` where screenshots are
  available).
- Write each body with real depth — approach, challenges, stack decisions,
  what the user would learn from it — not just a feature list. The write-up
  is the point for this audience (recruiters and fellow developers).
- Add screenshots under `public/images/projects/<id>/` where available;
  cards never show images, only the detail page does.
- Flag any project that has no live link and lean on screenshots + write-up
  to carry it.
- Write 2–3 blog posts that fit the site's voice (e.g. agentic development,
  why the vanilla/Astro setup, lessons from a shipped project) into
  `src/content/blog/`.
- Mark work-in-progress entries with `status: "in-progress"` or `draft:
true` rather than leaving them half-finished.

**Done when:**

- Every project from `project-overview.md` renders at `/projects/[id]` with
  its full write-up and (where provided) screenshots, with no schema
  errors.
- The projects grid and blog list render all entries with sensible
  ordering.
- `npm run build` passes.

---

## Phase 3 — Design review & polish

**Goal:** Audit the built site against the Phase 1 design system, catch
inconsistencies and edge cases, and polish until the details hold up.

**Tasks:**

- Walk every page and check it against the design tokens: no stray colors,
  consistent spacing, consistent border/shadow treatment, no leftover
  placeholder styling.
- Review typography and readability on the long-form pages (project
  details, blog posts) — line length, heading hierarchy, inline code.
- Test every interactive state: nav on mobile, hover/focus/active on all
  links and buttons, pressed shadow effects.
- Check edge cases: project with no images, project with no live link,
  very long titles, missing image placeholders, a one-post blog.
- Optimize assets: compress screenshots, confirm no oversized images on the
  pages that matter most.
- Run a build + a quick accessibility pass (contrast on the muted palette,
  focus visibility, semantic HTML).

**Done when:**

- A desktop + mobile walkthrough of every page shows no visual
  inconsistencies or broken states.
- Accessibility basics pass (manual or tool-assisted check).
- `npm run build` passes with no warnings about missing/broken assets.

---

## Phase 4 — VPS deployment guide & deploy

**Goal:** The site is live at the production domain over HTTPS on a VPS,
and the deployment process is documented so it can be repeated and updated
without head-scratching.

**Tasks:**

- Provision the VPS; install Node (matching `package.json`'s `engines`
  field), nginx, and certbot.
- Document the build-and-deploy path: `npm run build` → `dist/` → server,
  plus nginx reverse-proxy config and TLS via certbot.
- Point the domain's DNS at the VPS and obtain the certificate.
- Add a `deployment.md` guide under `context/references/` (or similar)
  covering: server setup, build/deploy steps, updating content, renewing
  the certificate, and rolling back a bad deploy.
- Add a favicon, meta description, and social/OG tags before launch if not
  already in place from Phase 1.

**Done when:**

- The site is reachable over `https://` at the production domain and serves
  the Phase 3 build.
- A fresh clone + documented steps would let a new machine reproduce the
  deploy (the guide is accurate enough to follow top-to-bottom).
- The domain in `astro.config.mjs` (`site`) matches production.

---

## Phase 5 — Launch & final QA

**Goal:** Final end-to-end check on the live site, then hand over.

**Tasks:**

- Verify every link on the live site: project links, socials, GitHub,
  resume download, `mailto:` email.
- Confirm meta tags, OG tags, favicon, and (if added) sitemap are live and
  correct.
- Do one last full walkthrough on desktop and mobile against the live URL.
- Tag the deploy commit `v1.0.0` on `main` per `git-conventions.md`.

**Done when:**

- The live site is fully working — every page renders, every link resolves,
  every asset loads over HTTPS.
- The `v1.0.0` tag exists on `main` at the deploy commit.

---

## After launch (not a phase, ongoing)

Revisit `project-overview.md`'s "Out of Scope" list if new needs come up
(dark mode toggle, analytics, RSS feed, more blog posts). Each of those is
a small, separate piece of work — not a continuation of Phase 5 — and gets
its own branch and review rather than being bolted on ad hoc.
