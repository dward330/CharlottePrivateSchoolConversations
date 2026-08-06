---
name: seo
title: Make the app search-engine indexable — pre-rendered path URLs alongside the hash router, plus the full SEO metadata surface
status: implemented
phases: 1
created: 2026-08-06
branch: feat/seo
prs: []
---

# Make the app search-engine indexable

## Goal

The site is currently invisible to search engines. Every school page, every Compare view
and all ten locales collapse into **one indexable URL** (`https://charlotteschoolinsights.com/`),
because the app is a hash router serving a 2 KB HTML shell with an empty `<div id="root">`.
Google discards everything after `#`, so ~165k words of original, cited research rank for
nothing.

This plan makes the six school pages, the Compare view and the home page **real URLs that
return HTTP 200 with real HTML**, and adds the metadata surface search engines and social
platforms expect (`robots.txt`, `sitemap.xml`, Open Graph / Twitter Card tags, per-page
titles and descriptions, canonical links, `hreflang`, JSON-LD).

We will know it worked when `curl https://charlotteschoolinsights.com/school/cannon/`
returns 200 with `<title>Cannon School — …</title>` and the school's prose present in the
HTML **before any JavaScript runs**, when a link pasted into iMessage/Facebook renders a
title-image-description card, and when `sitemap.xml` lists nine real URLs.

Three constraints are load-bearing and each is verified in the plan, not assumed:
**GitHub Pages must keep working, Cloudflare page-view analytics must keep working, and no
user may notice a change** (every existing shared `#/school/…` link keeps resolving).

## Context

### What exists today

- **Router** — [`src/lib/router.ts`](../../src/lib/router.ts) is a dependency-free hash
  router. `parse()` (line 16) reads `window.location.hash` via `useSyncExternalStore`
  (line 49) and returns a `Route` union: `{name:'home'}`, `{name:'school', slug}`,
  `{name:'compare', topic, schools}`. Navigation helpers `toHome()`, `toSchool()`,
  `toCompare()` return `#/…` strings.
- **Dispatch** — [`src/App.tsx:56-58`](../../src/App.tsx#L56-L58) switches on `route.name`
  to render `<Home/>`, `<SchoolDetail slug=…/>` or `<Compare …/>`. **The `Route` shape does
  not change in this plan**, so these three components are untouched.
- **Entry** — [`src/main.tsx`](../../src/main.tsx) awaits `ready` from i18n, calls
  `initAnalytics()`, then `createRoot(...).render(<App/>)`.
- **Build/deploy** — Vite with `base: '/'`
  ([`vite.config.ts`](../../vite.config.ts)); `npm run deploy` = `npm run build && gh-pages -d dist`.
  `gh-pages` publishes `dist/` verbatim. `public/CNAME` pins the custom domain.
- **Head** — [`index.html`](../../index.html) has `<title>` and one `<meta name="description">`.
  **No** Open Graph, Twitter Card, canonical, or `hreflang` tags. No `document.title` write
  exists anywhere in `src/` — every view shows "Charlotte School Insights".
- **Live check (2026-08-06)** — `robots.txt` → **404**, `sitemap.xml` → **404**.

### Analytics — the constraint that just got expensive

[`src/lib/analytics.ts`](../../src/lib/analytics.ts) exists *solely* because the Cloudflare
beacon reads `pathname` and ignores the hash. `pushRoute()` pushes a synthetic path so the
beacon logs a distinct page, then `replaceState`s back to the canonical hash URL.

**PR #104 (merged and deployed 2026-08-06) fixed a live bug here**: the beacon's URL
normaliser does ``return `${x.protocol}://${x.host}${x.pathname}` `` and `URL.protocol`
already ends in `:`, so passing an **absolute** URL emitted `https:://host/path` — malformed,
and Cloudflare bucketed every hit under `/`. Passing a **relative** path takes a different,
correct branch. See the long comment in `pushRoute()` and the memory note
`cf-beacon-absolute-url-bug`.

**Why this matters here:** with real path URLs the beacon works natively (`"spa": true`
already handles History API navigation), so most of `analytics.ts` becomes unnecessary.
This plan **does not delete it** — see Decisions. Deleting a just-fixed workaround in the
same change that alters routing would make a regression impossible to attribute.

### Why pre-rendering, not SPA path routing

GitHub Pages serves static files with **no rewrite rules**. Two options exist and only one
meets the constraints:

- **SPA path routing (`BrowserRouter`-style)** — a request for `/school/cannon` finds no
  file and returns **404**. The usual workaround copies `index.html` to `404.html` to bounce
  the path into the SPA. It works for humans but **serves a real HTTP 404 status first**,
  and Google declines to index 404s. All the work, none of the SEO. **Rejected.**
- **Pre-rendering** — emit an actual `dist/school/cannon/index.html` at build time. Pages
  serves it as a normal static file with **200**, because it is one. **Chosen.**

**Verified during planning, not assumed:** a nested `index.html` served from a plain static
host returns `200` with its own `<title>`. (`/logos/` and `/arts/` currently 404 on the live
site only because those directories contain PNGs and no `index.html` — not evidence against
nested serving.)

### i18n interaction

Locale is a **query param** (`?lang=xx`), deliberately outside the hash router —
`LANG_PARAM` at [`i18n.ts:234`](../../src/lib/i18n.ts#L234), read by `urlLang()` (line 247),
written by `syncUrl()` (line 262) via `replaceState`. `TRANSLATED` lists ten locales
(line 108). Because locale lives in the query string it **survives path navigation
untouched**, exactly as it survives hash navigation today — no change needed.

## Decisions

- **Pre-render, don't switch to SPA path routing** — GitHub Pages has no rewrites; the
  `404.html` trick serves a real 404 status, which Google won't index.
- **Keep the hash router permanently, as a compatibility layer** — every existing shared
  `#/school/…` link (Facebook is already the #2 referrer) must keep resolving. `parse()`
  gains a pathname branch and *falls back* to the hash; the hash form is never removed.
- **Path URLs are canonical; hash URLs redirect to them on load** — one canonical form for
  crawlers, zero broken links for humans.
- **English only for pre-rendered pages** (user decision) — 9 pages, not ~90. The other nine
  locales keep working exactly as today via `?lang=` + client rendering. The locale URL
  scheme is deliberately left undesigned; adding locales later needs no rework of this plan.
- **Do NOT delete `src/lib/analytics.ts` in this plan** — PR #104 fixed a live bug there
  days ago. Removing the workaround in the same change that alters routing would confound
  any regression. Leave it working (it is harmless under path routing) and retire it in a
  separate follow-up once path analytics are confirmed in the dashboard.
- **Trailing-slash directory form (`/school/cannon/index.html`)** — the form static hosts
  serve natively at `/school/cannon/` without content negotiation.
- **Playwright drives the pre-render** — already a devDependency (`^1.62.1`), already used
  for verification in this repo. No new dependency.
- **JSON-LD is scoped to what the repo actually has** — see Out of scope.

## Approvals needed

**None.** This plan adds no card, section, stat tile, Compare row, metric key or topic, so
the UX-design gate does not apply. It changes no visible layout: pre-rendering changes what
the *first HTTP response* contains, not what the user sees.

Two things worth flagging to the user rather than gating on:

- **Deploy is user-only.** `npm run deploy` must NOT be run by `/implement`. The user runs
  it when they choose (standing rule, memory `never-deploy-without-explicit-ok`).
- **Build time increases** — the pre-render step visits 9 routes in a headless browser.
  Expect roughly +20-40s on `npm run build`.

## Out of scope

- **Locale-prefixed pre-rendered pages** (`/es/school/cannon`) and cross-locale `hreflang`
  between them. English-only was chosen; `hreflang` in this plan is limited to advertising
  the `?lang=` variants of each pre-rendered English page.
- **Deleting `src/lib/analytics.ts`** — separate follow-up, see Decisions.
- **Any change to `Route`, `Home.tsx`, `SchoolDetail.tsx`, or `Compare.tsx` rendering.**
- **JSON-LD requiring data the repo does not have.** Confirmed during planning: there is
  **no structured address, geo, phone, or founding data** in `src/data/`. `BRANDS`
  ([`src/data/brands.ts`](../../src/data/brands.ts)) holds only `color`, `initials`, `logo`,
  `welcomeVideoUrl`. So JSON-LD is limited to `name`, `url`, `logo`, and `description` —
  fields we can populate truthfully. **Do not invent addresses or EINs to fill the schema.**
- **Running `npm run deploy`.**

## Steps

**Single-phase — adds no user-facing text.** Every string introduced here is `<head>`
metadata (titles, descriptions, OG tags), which is not rendered UI chrome and is not
translated via `src/locales/*.json`. No `en.json` key is added, so there is nothing for a
Phase 2 to propagate. The nine non-English locales are unaffected and untouched.

1. **Teach the router to read a pathname, keeping the hash as fallback** — in
   [`src/lib/router.ts`](../../src/lib/router.ts), extract the segment-parsing body of
   `parse()` into a helper that takes a path-like string. Add `parseLocation()` that reads
   `window.location.pathname` first and falls back to `window.location.hash` when the
   pathname is `/` (or `BASE_URL`). `useRoute()` subscribes to the same events plus
   `popstate` (already subscribed). **The returned `Route` union does not change**, so
   `App.tsx` and the three page components need no edit.

2. **Make navigation helpers emit paths** — change `toHome()`, `toSchool()`, `toCompare()`
   to return `/`, `/school/<slug>/`, `/compare/?topic=…&schools=…`. Keep the query-string
   construction in `toCompare()` exactly as it is (`URLSearchParams`).

3. **Redirect legacy hash URLs to their path form on load** — in
   [`src/main.tsx`](../../src/main.tsx), before `createRoot`, if `location.hash` starts with
   `#/`, `history.replaceState` to the equivalent path URL (preserving `location.search`, so
   `?lang=` survives). `replaceState`, not `pushState` — the legacy URL should not occupy a
   history entry. This is what keeps every shared link working.

4. **Update in-app navigation to use the History API on paths** — in
   [`src/lib/analytics.ts`](../../src/lib/analytics.ts), `pushRoute()` now receives a path
   rather than a hash. Push the path directly (it is already relative, which is the branch
   that avoids the beacon's `https:://` bug — keep it relative and keep the comment
   explaining why). Continue dispatching `popstate` so `useRoute()` re-reads. Update
   `initAnalytics()`'s delegated click handler to intercept `href^="/"` in-app links as well
   as legacy `href^="#/"` ones.

5. **Add a per-page metadata module** — new file `src/lib/head.ts` exporting
   `setPageMeta(route: Route)`. It sets `document.title`, `<meta name="description">`,
   `<link rel="canonical">`, and the OG/Twitter tags, creating the elements if absent.
   School names come from `schoolBySlug()` in
   [`src/lib/manifest.ts`](../../src/lib/manifest.ts) (line 23). Call it from `App.tsx` in a
   `useEffect` keyed on `route`. **This is the only `src/` file that writes head metadata at
   runtime** — the pre-render step (7) captures its output into the static HTML.

6. **Add the static head tags** — in [`index.html`](../../index.html), add Open Graph
   (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`), Twitter
   Card (`summary_large_image`), and `<link rel="canonical">`. Use `/logo.png` (exists at
   [`public/logo.png`](../../public/logo.png)) for `og:image`, referenced as an absolute
   `https://charlotteschoolinsights.com/logo.png` — social scrapers require absolute URLs.
   These are the defaults; step 5 overrides them per route at runtime and step 7 bakes the
   per-page values into each pre-rendered file.

7. **Write the pre-render script** — new file `scripts/prerender.mjs`. It:
   - reads the six school slugs from [`src/data/schools.json`](../../src/data/schools.json)
     (`manifest.schools`, confirmed 6) so it never goes stale;
   - serves `dist/` on a local port (`vite preview` or a tiny static server);
   - visits `/`, `/school/<slug>/` ×6, and `/compare/` in Playwright chromium;
   - waits for `#root` to have content **and for the `<details>` prose to be present in the
     DOM** (see Risks);
   - writes `document.documentElement.outerHTML` to `dist/<route>/index.html`.

   Wire it into `package.json` as `"prerender": "node scripts/prerender.mjs"` and chain it:
   `"build": "tsc -b && vite build && npm run prerender"`.

8. **Generate `robots.txt` and `sitemap.xml`** — new file `scripts/gen_seo_files.mjs`,
   generating both into `dist/` from `schools.json` so they cannot drift. `robots.txt`
   allows all and declares `Sitemap: https://charlotteschoolinsights.com/sitemap.xml`.
   `sitemap.xml` lists the nine English URLs, each with `<xhtml:link rel="alternate"
   hreflang="…">` entries for the nine `?lang=` variants plus `x-default`. Run it from the
   `build` script alongside the pre-render. **Do not hand-write these into `public/`** —
   generated from the manifest is the repo's convention and avoids staleness.

9. **Add JSON-LD to the pre-rendered school pages** — in `src/lib/head.ts`, inject a
   `<script type="application/ld+json">` with an `EducationalOrganization` object per school:
   `name` (from the manifest), `url` (canonical path URL), `logo` (from `BRANDS`), and
   `description`. **Only these fields** — see Out of scope; the repo has no address/geo data
   and none may be invented. Add a `WebSite` object on the home page.

10. **Add a check script** — new file `scripts/check_seo.mjs`, wired as
    `"check:seo": "node scripts/check_seo.mjs"`. It asserts, against `dist/` after a build:
    every expected `index.html` exists; each has a unique non-default `<title>`; each has
    `og:title`/`og:description`/`og:image` and a `<link rel="canonical">`; `sitemap.xml`
    lists exactly the routes that exist on disk; `robots.txt` names the sitemap. This is the
    guard that stops a future route being added without its pre-rendered page.

## Files touched

| File | Change |
|---|---|
| `src/lib/router.ts` | edit — parse pathname first, fall back to hash; helpers emit paths |
| `src/main.tsx` | edit — redirect legacy `#/` URLs to path form before render |
| `src/lib/analytics.ts` | edit — `pushRoute()` takes a path; click handler also catches `href^="/"` |
| `src/lib/head.ts` | **new** — per-route title/description/canonical/OG/JSON-LD |
| `src/App.tsx` | edit — one `useEffect` calling `setPageMeta(route)` |
| `index.html` | edit — static OG/Twitter/canonical tags |
| `scripts/prerender.mjs` | **new** — Playwright pre-render of 9 routes into `dist/` |
| `scripts/gen_seo_files.mjs` | **new** — generate `robots.txt` + `sitemap.xml` into `dist/` |
| `scripts/check_seo.mjs` | **new** — assert the SEO surface after a build |
| `package.json` | edit — add `prerender`, `check:seo`; chain both into `build` |

## Verification

Single-phase, so one pass.

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — no **new** warnings (two pre-existing ones in
      `scripts/check_fa_script.mjs` and `scripts/check_chrome_keys.mjs` are unrelated)
- [ ] `npm run build` — succeeds, and `find dist -name index.html` lists **9** files
      *(corrected at implementation: the route set is **8** — 6 schools + home + compare.
      See Implementation notes #1. Every other "9"/"nine" in this document is the same slip.)*
- [ ] `npm run check:seo` — passes
- [ ] `npm run check:translations`, `npm run check:metrics`, `npm run check:hashes` — still
      pass (this plan must not perturb the i18n or data layers)
- [ ] **The no-JS check, which is the whole point:**
      `npx vite preview` then
      `curl -s localhost:4173/school/cannon/ | grep -c "Cannon"` — must be **> 0**. The prose
      must be in the HTML with JavaScript never executed.
- [ ] **Browser check** (this repo's standing rule — render-layer defects survive every
      source-level check):
      - Load `/school/cannon/` directly. Page renders; no flash of wrong content.
      - Click between schools and Compare. Transitions are instant (still an SPA), the URL
        shows real paths, **Back returns one step per press**.
      - Load a legacy `#/school/cannon` URL — it must silently become `/school/cannon/`
        and render the right school.
      - Switch language to Spanish. `?lang=es` persists across path navigation and the page
        renders Spanish. Repeat for one RTL locale (`?lang=fa`) to confirm `dir` still applies.
- [ ] **Cloudflare beacon check** — with the preview server running, observe the beacon POST
      to `/cdn-cgi/rum` in a browser and confirm the reported `location` is well-formed
      (single colon, e.g. `http://localhost:4173/school/cannon`) and distinct per page. The
      `https:://` double-colon is the regression signature from PR #104.
- [ ] `git status` clean of stray probe scripts before the PR.

## Risks

| Risk | Mitigation |
|---|---|
| **Collapsed `<details>` prose missing from pre-rendered HTML.** The research prose sits inside `<details>` panels; a default school page renders ~17k chars vs ~152k expanded. If the pre-render captures the DOM before content mounts, pages ship as empty shells that *look* fine. | The `curl \| grep` no-JS check above is exactly this test. Additionally, assert a **minimum byte size** per pre-rendered file in `check_seo.mjs`. Note: `<details>` content IS in the DOM when collapsed, so it should be captured — but verify rather than assume. |
| **Deep-linked path 404s on GitHub Pages** if a route is added later without a pre-rendered page. | `check:seo` fails the build when a route has no `index.html`. |
| **Analytics regression** re-introducing the `https:://` bug. | Keep the synthetic path **relative**; keep the explanatory comment; the beacon check above is an explicit verification line. |
| **Double history entries / broken Back** during the hash→path migration. | Explicit browser check: Back must return one step per press. `main.tsx` uses `replaceState` (not `pushState`) for the legacy redirect. |
| **`?lang=` lost on path navigation.** | Locale lives in the query string, outside the router, and `syncUrl()` preserves it — but the browser check exercises it explicitly across a path navigation. |
| **Build-time increase** from Playwright visiting 9 routes. | Acceptable (~+20-40s). If it becomes painful, gate the pre-render behind an env var so `npm run dev` is unaffected — it already is, since this only runs in `build`. |

## Open questions

- **Should `/compare/` be pre-rendered at all?** Its content depends on query params
  (`?topic=…&schools=…`), so the pre-rendered version shows only the default selection.
  **Default:** pre-render it with the default selection — it is a real page with real content
  and should be indexable; the query-param variants are not worth separate URLs.
- **Trailing slash canonicalisation** — `/school/cannon` vs `/school/cannon/`. GitHub Pages
  redirects the former to the latter for directory-index files.
  **Default:** use the trailing-slash form everywhere (canonical, sitemap, in-app links) and
  let Pages handle the redirect for anyone who types it without.
- **When to retire `src/lib/analytics.ts`** — it is redundant under path routing.
  **Default:** leave it in place for this plan; open a follow-up once the Cloudflare
  dashboard confirms path analytics are landing.

## Implementation notes

Built as planned. Five deviations, each recorded with its reason.

**1. Eight pre-rendered pages, not nine.** The plan says "nine URLs" throughout, but the
route set is 6 schools + home + compare = **8**. Arithmetic slip in the plan; nothing was
dropped. `check:seo` derives the count from the manifest, so it stays right as schools are
added.

**2. A shared `scripts/seo_routes.mjs` was added (not in *Files touched*).** The pre-render,
the sitemap generator and the checker all need the same route list. Having each derive its
own would allow the exact drift the checker exists to catch — a page pre-rendered but absent
from the sitemap, or listed in the sitemap but 404 on the site. One module, three consumers.

**3. `/compare/` is canonicalised WITH its query string.** The open question assumed a bare
`/compare/` would pre-render "the default selection". It does not: `Compare.tsx` renders
exactly the schools named in `?schools=` and has **no all-schools default**, so a bare
`/compare/` pre-rendered as an 8 KB shell of empty controls — caught by the pre-render's
minimum-byte guard on the first run. The indexable compare URL therefore carries the same
selection the in-app nav link uses, and the pre-render, the sitemap `<loc>`, and the
`<link rel="canonical">` inside the file all agree on it (`check:seo` asserts that). Giving
`Compare.tsx` a default was the alternative and was rejected — the plan puts its rendering
explicitly out of scope. The file at `dist/compare/index.html` serves the full six-school
table either way, so a crawler arriving at the bare URL still indexes real content.

**4. `?lang=` needed explicit carry-over — the plan's assumption was wrong.** *Context* says
locale "survives path navigation untouched" because it lives in the query string. That held
under the hash router, where the route lived after the `#` and the locale before it. With
path routing they **share one query string**, and `toCompare()` builds `?topic=…&schools=…`
from scratch — so a Spanish reader clicking "Comparar" landed on a URL with no `?lang=es`.
The page still rendered Spanish (localStorage), so this was invisible except in the address
bar, and it broke the shareable-link contract. Fixed with `carryOverParams()` in
`analytics.ts`, applied in `pushRoute()` so every navigation path inherits it.
**Found only by the browser check**, consistent with this repo's record.

**5. `beaconReady()` was deleted from `analytics.ts`.** Under the hash router it gated a
synthetic-path push that had to be reverted immediately; the URL pushed now is the page's
real address, correct whether or not the beacon loads. The rest of the module stays, per the
plan's decision not to retire it in this change.

### Verification results

All green: `tsc --noEmit`; `lint` (only the two pre-existing warnings); `build` (8 pages);
`check:seo`; `check:translations`, `check:metrics`, `check:hashes`, `check:currency`,
`check:money`. No-JS check: `/school/cannon/` returns **200** with
`<title>Cannon School — …</title>` and **128k characters of visible text**, including
7-digit financial figures from the collapsed `<details>` deep-dives — so the Risks table's
first row is resolved by measurement, not assumption. Browser check: direct path loads,
one-press Back, legacy `#/` URLs silently rewritten (including `?lang=` + hash together),
`?lang=es`/`?lang=fa` surviving navigation with `dir=rtl` intact. Beacon check: five RUM
requests captured, each reporting a distinct well-formed URL, **no `https:://`**.

### Deliberately left out

- Retiring `src/lib/analytics.ts` — per the plan's decision, a separate follow-up once the
  Cloudflare dashboard confirms path analytics are landing.
- Locale-prefixed pre-rendered pages — out of scope; the nine non-English locales remain
  `?lang=` + client-rendered, advertised via `hreflang`.
- `npm run deploy` — **not run**. Publishing is the user's call. Nothing in this change is
  live until they deploy.
