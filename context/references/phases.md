_`This File doesn't relate to this project. It is here for understanding the structure of the phase.md file`_

# Development Phases

Run these phases in order, one at a time, with Claude Code. Each phase has a
clear goal, the files it touches, and a "done when" checklist you can verify
before moving to the next phase. Don't skip ahead — later phases assume
earlier ones are working (in mock mode) first.

Reference `project-overview.md`, `architecture.md`, and
`coding-standards.md` throughout — they define the rules that must not be
relaxed in any phase (one open session per tea, auto-summed kg, manual
delivery charge, etc.).

---

## Phase 0 — Project scaffold

**Goal:** A running Astro project with the right output mode, ready for
everything else to build on.

**Tasks:**

- Initialize Astro project, TypeScript strict.
- Install and configure `@astrojs/node` adapter, `mode: 'standalone'`,
  `output: 'server'` in `astro.config.mjs`.
- Install `googleapis` and `uuid` as dependencies (used in later phases).
- Set up `src/content.config.ts` using Astro's Content Layer API (`glob`
  loader) — not the legacy `src/content/config.ts` path.
- Basic `src/layouts/Base.astro` and `public/styles/global.css` placeholder
  (real styling comes in Phase 7, once the UI design is referenced).

**Done when:**

- `npm run dev` runs without errors and serves a blank/placeholder home
  page.
- `npm run build` completes with no Content Collection or adapter errors.

---

## Phase 1 — Tea catalog (Content Collections)

**Goal:** Static tea/product data is modeled and readable.

**Tasks:**

- Define the `teas` collection schema in `src/content.config.ts` per
  `architecture.md` (`id`, `name`, `origin`, `supplier`, `description`,
  `longDescription?`, `image`, `defaultUnit`).
- Add JSON entries under `src/content/teas/` for your real teas (start
  with at least the two Tea Gold origins — Sreemangal, Chittagong).
- Add placeholder images under `public/teas/`.

**Done when:**

- A throwaway test page (or the real listing page stubbed later) can call
  `getCollection('teas')` and render all entries without schema errors.

---

## Phase 2 — Data layer in mock mode

**Goal:** The one seam (`src/lib/sheets.ts`) that all pages/APIs will call,
fully working against an in-memory store — no real Google Sheets yet.

**Tasks:**

- Create `src/lib/types.ts` (`Session`, `OrderRow`, input types) exactly as
  specified in `architecture.md`.
- Create `src/lib/mockStore.ts` (in-memory `Map`-based store, reset on
  restart, seeded with one demo open session).
- Create `src/lib/sheets.ts` with `GOOGLE_SHEETS_MOCK` switch and full mock
  implementations of: `listSessions`, `getSession`, `openSession`,
  `closeSession`, `listOrders`, `createOrder`. Real-mode branches can throw
  "not yet implemented" for now — they're built in Phase 8.
- Enforce all five business rules from `coding-standards.md` in the mock
  implementations (one open session per tea, auto-summed kg at close,
  manual delivery charge, re-check session is open before creating an
  order, locked-in rate/price).

**Done when:**

- You can write a quick manual script or temporary test page that: opens a
  session, creates a few orders, closes the session, and gets back
  correct per-client courier/total numbers matching the proration formula.
- Attempting to open a second session for the same `teaId` while one is
  open throws the expected error.
- Attempting to order against a closed session throws the expected error.

---

## Phase 3 — Read-only API routes

**Goal:** `GET` endpoints that expose session data over HTTP, ready for
pages to consume.

**Tasks:**

- `GET /api/sessions` (optional `?status=open|closed` filter).
- `GET /api/sessions/:id` (session + its orders).
- Both call only `src/lib/sheets.ts` functions, never the store directly.
- Both set `export const prerender = false` and return proper status codes
  / `{ error }` shape on failure per `coding-standards.md`.

**Done when:**

- Hitting both endpoints directly (browser or curl) returns correct JSON
  for the seeded mock session, and a 404 for an unknown session id.

---

## Phase 4 — Public pages: landing, listing, product detail

**Goal:** Clients can browse teas and see live open/closed status.

**Tasks:**

- Landing page (`src/pages/index.astro`): show teas from the collection,
  cross-referenced against `listSessions({ status: 'open' })` for
  open/closed badges.
- Product listing page (`src/pages/products/index.astro`): same idea, full
  catalog.
- Product detail page (`src/pages/products/[id].astro`): shows tea info;
  if an open session exists for that tea, shows the order form (quantity
  input); otherwise shows a clear "not currently open" state.
- No cart/checkout wiring yet — the "add to cart" button can be a no-op or
  console-log stub in this phase.

**Done when:**

- Opening/closing the demo session in mock mode visibly changes badges and
  form availability across these three pages without a restart (i.e. data
  is read live per-request, not cached at build time).

---

## Phase 5 — Cart and checkout

**Goal:** A client can go from product detail → cart → checkout → a real
order row in the mock store.

**Tasks:**

- `public/scripts/cart.js`: localStorage-backed cart helpers
  (`getCart`, `addToCart`, `updateQty`, `removeFromCart`, `clearCart`,
  `cartTotal`) — vanilla JS, no framework.
- Wire the product detail page's order form to `addToCart` and redirect to
  `/cart`.
- Build `src/pages/cart.astro`: list cart items, editable quantities,
  remove, subtotal, link to checkout.
- Build `src/pages/checkout.astro`: name + phone form; on submit, POST one
  `/api/orders` call per cart item (a cart can span multiple open
  sessions/teas); on all success, clear cart and redirect to the success
  page with order id(s); on any failure, redirect to the failure page with
  the reason.
- `POST /api/orders` route: validates input, calls `createOrder`, returns
  `201`/`400` per the contract in `architecture.md`.
- `src/pages/order/success.astro` and `src/pages/order/failure.astro`.

**Done when:**

- A full client journey — browse → add to cart → checkout → success page
  — produces a real order row visible via `GET /api/sessions/:id`.
- Ordering against a session that gets closed mid-checkout correctly lands
  on the failure page with a clear message (test by closing the session
  in another tab between adding to cart and submitting checkout).

---

## Phase 6 — Session details page

**Goal:** The live "order sheet" view clients and the owner can check.

**Tasks:**

- `src/pages/sessions/[id].astro`: fetch session + orders, render the
  table (Name, Order kg, Tea Price, Courier, Total) matching the original
  spreadsheet's columns.
- Courier/Total columns show "pending" while the session is open, and
  real computed values once closed.
- Show session-level summary (rate, total kg so far, and — once closed —
  final total kg and delivery charge).

**Done when:**

- Viewing this page for the seeded demo session before and after closing
  it (via a temporary manual call to `closeSession`, since admin UI is
  Phase 7) shows the expected transition from "pending" to real numbers.

---

## Phase 7 — Admin area

**Goal:** The owner can open and close sessions from the app itself,
without touching mock/real Sheets data by hand.

**Tasks:**

- `src/lib/adminAuth.ts`: cookie-based check against `ADMIN_PASSWORD`.
- `src/middleware.ts`: guard `/admin/*` pages (except `/admin/login`),
  redirect unauthenticated visitors to login.
- `POST /api/admin/login`, `POST /api/admin/open-session`,
  `POST /api/admin/close-session` — each independently checks admin auth
  (don't rely on middleware alone, per `coding-standards.md`).
- `src/pages/admin/login.astro`, `src/pages/admin/index.astro`
  (dashboard listing all sessions with status), `open-session.astro`
  (tea dropdown + rate input), `close-session.astro` (**single** input:
  delivery charge — total kg is shown as an auto-computed, non-editable
  figure).

**Done when:**

- With `ADMIN_PASSWORD` set, you can log in, open a new session for a tea
  with no currently-open session, watch it appear as orderable on the
  public site, close it with just a delivery charge, and see correct
  per-client totals on the session details page — entirely through the UI,
  no direct store manipulation.
- Attempting to open a second session for a tea that's already open shows
  a clear in-UI error, not a crash.

---

## Phase 8 — Real Google Sheets integration

**Goal:** Replace the mock store with real reads/writes to the owner's
actual Google Sheet, matching the exact column layout from the original
spreadsheet.

**Tasks:**

- Set up a Google Cloud service account, enable the Sheets API, share the
  target spreadsheet with the service account's email (edit access).
- Add real env vars: `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
  `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
- Implement the real-mode branches in `src/lib/sheets.ts`:
  - `listSessions` / `getSession`: read the `Sessions` control tab.
  - `openSession`: append a `Sessions` row + create a new sheet tab with
    the header row (Name, Order (kg), Tea Price, Courier, Total, Total
    (Rounded), Phone, Timestamp).
  - `createOrder`: re-check session is open, then append a row to that
    session's tab.
  - `closeSession`: read all order rows, sum kg, compute
    courier/total/rounded per row, batch-write those columns back, then
    update the `Sessions` row (status, total_order_kg, delivery_charge,
    closedAt).
- Keep all five business rules identical to mock mode — call sites in
  pages/API routes should not need to change at all.
- Set `GOOGLE_SHEETS_MOCK=false` locally once this is implemented and test
  against a real (test/duplicate) spreadsheet before touching the actual
  production sheet.

**Done when:**

- The full Phase 4–7 journey (browse → order → admin close → session
  details) works identically against the real spreadsheet as it did in
  mock mode, and the resulting sheet rows/columns match the original
  manual format exactly.
- Re-run the multi-client proration test from Phase 2 against the real
  sheet and confirm the numbers match what the owner would have gotten
  doing it by hand.

---

## Phase 9 — Hardening and QA pass

**Goal:** Catch edge cases before going live.

**Tasks:**

- Verify error messages shown on the failure page are accurate and
  non-technical for every failure mode (closed session, invalid quantity,
  Sheets API error, network error).
- Confirm no secrets (service account key, admin password) ever appear in
  a client-facing response, page source, or browser console.
- Add short server-side caching (30–60s) to session list/detail reads to
  stay well under Sheets API rate limits, per `architecture.md`.
- Manually test: two sessions open at once for different teas, a client
  cart containing items from both, checkout producing correct rows in
  both session tabs.
- Confirm mobile layout is usable for at least product detail, cart, and
  checkout (these are what real clients will use most).

**Done when:**

- You've walked through the full journey on a phone-sized viewport at
  least once, and induced at least one of each failure mode on purpose to
  confirm the failure page behaves correctly.

---

## Phase 10 — Product management (admin)

**Goal:** The owner can add, edit, and toggle products (teas) entirely
from the admin panel — no more hand-editing JSON files in the repo or
rebuilding the app to onboard a new origin.

**Tasks:**

- **Data layer:** Add an `active` boolean field to the tea schema
  (default `true`). Switch the catalog from Astro's build-time Content
  Collection read path to a runtime-friendly read/write against the JSON
  files under `src/content/teas/`. A new `src/lib/teas.ts` module owns
  this: `listTeas()` (returns all), `listActiveTeas()` (filters `active`),
  `getTea(id)` (single), `createTea(input)`, `updateTea(id, patch)`,
  `setTeaActive(id, active)`. Each function reads the JSON file directly
  from disk on the server, validates against the schema in
  `src/content.config.ts`, and writes back atomically. (Rationale: Astro
  Content Collections are build-time by design — a `glob` loader freezes
  the set of files at build, so runtime additions won't appear without a
  rebuild. Reading the JSON files directly at request time is the
  smallest deviation that keeps the admin flow working without a
  build/deploy round-trip. The Zod schema in `content.config.ts` remains
  the canonical source of truth for field names and types — both the
  loader and the admin write paths validate against it.)
- **Public surface:** Update `src/pages/products/index.astro` and
  `src/pages/products/[id].astro` to use `listActiveTeas()` /
  `getTea(id)` instead of `getCollection('teas')`. Inactive products
  are hidden from the listing page; the detail page returns a 404 for
  them so a stale link can't place an order against an inactive tea.
- **Admin pages:** Add `src/pages/admin/products/index.astro` (list of
  all teas with status, edit link, deactivate/activate toggle), and
  `src/pages/admin/products/new.astro` + `[id]/edit.astro` (forms for
  create and update, all admin-only via the existing middleware). The
  tea dropdown on `open-session.astro` filters to active teas
  automatically because it already calls `listTeas()` — switch it to
  `listActiveTeas()`.
- **Admin API routes:** `POST /api/admin/products` (create),
  `PUT /api/admin/products/:id` (update), `POST
/api/admin/products/:id/active` (toggle active). Each one
  independently checks `isAdminRequest()` (do not rely on middleware
  alone, per `coding-standards.md`). All input is validated against the
  same Zod schema the content collection uses.
- **Active-session guard:** `setTeaActive(id, false)` must check
  `listSessions({ status: 'open' })` and refuse to deactivate if any
  open session exists for that tea, returning a clear in-UI error
  ("This tea has an open session — close it before deactivating"). The
  UI on the products list page surfaces this as a per-row error inline
  with the toggle, not a page-level crash.
- **No image uploads in this phase.** Image is a fixed string the
  admin supplies by filename (e.g. `tea-gold-neworigin.svg`). The
  admin is expected to drop the SVG into `public/teas/` out-of-band
  (matching the existing pattern for the two seed teas). Field defaults
  to the empty string and the product detail page renders a tasteful
  placeholder when the image is missing. Document this limitation in
  the form UI itself — don't pretend it's a complete image management
  story.
- **Editor experience:** Reuse the existing `bindAdminForm` helper
  where the form shape fits (create, update). The active-toggle
  endpoint is a small standalone POST button per row, not a form —
  inline on the products list page.

**Done when:**

- Creating a new tea from `/admin/products/new` makes it immediately
  visible on the public listing page (no rebuild required) and shows
  up in the open-session dropdown.
- Editing a tea from the products list updates the public detail page
  in real time.
- Deactivating a tea hides it from the public listing and detail page
  (detail page returns 404), and the tea disappears from the
  open-session dropdown.
- Attempting to deactivate a tea that has an open session returns a
  clear error in the UI; the active state stays unchanged.
- The two seed teas (`tea-gold-sreemangal`, `tea-gold-chittagong`)
  still render correctly — they're now read via the runtime path
  instead of the content-collection loader, but the schema and field
  shape are identical.

---

## Phase 11 — VPS deployment

**Goal:** The app is live, running behind HTTPS, and survives a reboot.

**Tasks:**

- Provision the VPS, install Node (matching the version in
  `package.json`'s `engines` field), nginx, and PM2.
- `npm run build` on the server (or build locally/in CI and copy `dist/` +
  `package.json` + `node_modules` over — pick one and document it).
  Note: because Phase 10 made the catalog runtime-mutable, a rebuild
  is _not_ required to add or edit a product — but it is still
  required for code changes (schema tweaks, page work, etc.).
- `.env` file on the server with real production values (`GOOGLE_SHEET_ID`,
  service account credentials, `ADMIN_PASSWORD`, `GOOGLE_SHEETS_MOCK=false`).
  Never commit this file.
- Start with PM2: `pm2 start dist/server/entry.mjs --name tea-orders`,
  then `pm2 save` and `pm2 startup` so it survives reboots.
- Configure nginx as a reverse proxy from `443` → the app's port, obtain a
  TLS certificate via certbot.
- Point your domain's DNS at the VPS.

**Done when:**

- The site is reachable over `https://` at your domain, the admin login
  works, and a full test order goes through end-to-end against the real
  spreadsheet.
- Rebooting the VPS (or simulating a crash: `pm2 restart tea-orders`)
  results in the app coming back up on its own.

---

## Phase 12 — Launch

**Goal:** Hand the app over for real use.

**Tasks:**

- Do one final real session end-to-end with a small trusted group of
  clients (or just yourself) before opening it up broadly.
- Share the live product listing URL with clients going forward instead
  of the old manual order-taking process.
- Keep the original Google Sheet file as-is — the app now writes to it
  directly, so no parallel manual entry is needed once this phase starts.

**Done when:**

- A real ordering session for a real tea has been opened, taken real
  client orders, closed, and paid out — entirely through the app — and
  the owner is comfortable running the next one solo.

---

## After launch (not a phase, ongoing)

Revisit `project-overview.md`'s "out of scope" list if new needs come up
(client accounts, notifications, multi-admin, payments). Each of those is
a new, separate project of work — not a continuation of Phase 12 — and
deserves its own planning pass rather than being bolted on ad hoc.
