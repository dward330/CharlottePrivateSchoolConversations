---
name: seogaps
title: Close the four SEO reach gaps — head-level hreflang, social cards, school-to-school links, and a 404 fallback
status: implemented
phases: 2
created: 2026-09-03
branch: feat/seogaps
prs: []
---

# Close the four SEO reach gaps

## Goal

The site's SEO **correctness** is already done and verified live — 13 pre-rendered pages,
unique titles, absolute canonicals, per-school JSON-LD, a sitemap with ten locales of
`hreflang`, all green under `npm run check:seo`. What is missing is **reach**: signals the
site could send and currently does not.

This plan closes four of them:

1. **`hreflang` only exists in `sitemap.xml`, never in the page `<head>`.** Google accepts
   sitemap-only annotation; Bing largely does not. Nine translated locales are
   under-advertised to every engine but one.
2. **`og:image` is a 256×256 square** while the pages declare
   `twitter:card = summary_large_image`, which expects ~1200×630. Every Facebook, iMessage
   and Slack share of every page renders a cropped or letterboxed logo — and Facebook is
   the site's **#2 referrer**.
3. **No school page links to any other school page.** All 11 sit at equal depth off the
   home page with zero lateral crawl paths.
4. **`/school/<slug>/admissions-checklist/` returns a real 404 in production** (confirmed
   live, 2026-09-03). There is no `404.html`, so a pasted or shared checklist link
   dead-ends instead of booting the SPA.

We will know it worked when: every pre-rendered page carries ten `<link rel="alternate"
hreflang>` tags plus `x-default`; `og:image` is a 1200×630 per-school card; each school
page carries a row of links to the other ten; and a deep link to the checklist route
renders the sheet instead of GitHub's error page.

## Context

Researched 2026-09-03 against a clean `main` (`bef0aa3`) with a full `npm run build`.
Every path, export and figure below was confirmed, not assumed.

**The SEO surface is generated from one list.** `scripts/seo_routes.mjs` exports `ROUTES`
(derived from `src/data/schools.json`), `LOCALES`, `SITE_ORIGIN` and `urlFor(route, lang)`.
Three consumers share it: `prerender.mjs` writes the files, `gen_seo_files.mjs` writes
`robots.txt` + `sitemap.xml`, `check_seo.mjs` asserts they agree. All are chained into
`npm run build`. **`urlFor(route, lang)` already produces exactly the per-locale URLs this
plan needs for head-level hreflang** — `gen_seo_files.mjs:57-62` calls it in a loop over
`LOCALES` to build the sitemap's alternates. Reuse it; do not re-derive the URL shape.

**`src/lib/head.ts` is the only place in `src/` that writes head metadata at runtime.**
`setPageMeta(route)` is called from an effect in `App.tsx` keyed on the route, and
`prerender.mjs` snapshots `document.documentElement.outerHTML` *after* the app mounts — so
whatever `setPageMeta` writes becomes the static head of the pre-rendered file. It already
has `setLink(rel, href)`, but that helper **keys on `rel` alone**
(`document.head.querySelector('link[rel="…"]')`), so it can only ever manage *one* link per
rel value. Ten `<link rel="alternate">` tags need a different helper — see step 2.

`head.ts` holds `OG_IMAGE = ${SITE_ORIGIN}/logo.png`, a single module constant used by both
`og:image` and `twitter:image` on all 13 pages (verified: `find dist -name index.html |
xargs grep -oh 'og:image…' | sort | uniq -c` → `13` identical).

**Brand assets today.** `public/logo.png` is **256×256**; `public/icon.png` is 512×512 and
is the favicon. As of the planning pass there was no larger source in the repo
(`find -iname '*logo*'` returned only these plus seven
`source-material/branding/**/*.md` text files). **The user has since supplied a 2048×2048
horizontal wordmark** — see *Open questions* for its intended path and the two handling
notes (trim to bounding box; check whether the cream ground is opaque). Verify it is on
disk before starting step 5. `BRANDS` in
`src/data/brands.ts` carries a `logo:` path for only **6 of 11** schools — cannon,
charlotte-christian, charlotte-country-day, charlotte-latin, davidson-day, providence-day.
That gap is why the OG cards must not be composed from school crests.

**`SchoolBadge` covers all 11 schools.** `src/components/SchoolBadge.tsx` renders a
brand-colored **monogram** from `brandOf(slug)` (initials + color), not an image file — so
it works for every school regardless of the crest gap. It is the right mark for the
internal-links row.

**Routing already understands the checklist route.** `src/lib/router.ts` has
`{ name: 'admissions-checklist'; slug; band }` in the `Route` union, `parsePath()` matches
`/school/<slug>/admissions-checklist/` (deliberately *before* the plain-school branch), and
`toAdmissionsChecklist(slug, band)` exists. So the 404 is purely a **static-hosting**
problem: GitHub Pages has no rewrite rules and there is no `404.html`, so the SPA never
boots. Nothing in the router needs changing.

`toSchool(slug)` and `toHome()` already exist in `router.ts` alongside `toCompare()`.
`SchoolDetail.tsx` currently links only to home (`:485`) and to Compare (`:848`) — 11
unique `href="/…"` values on a school page, **0** of them to another school.

**`seo_routes.mjs` deliberately omits the checklist route from `ROUTES`**, with a long
comment giving three measured obstacles to pre-rendering it: the sheet renders 14.4–14.9 KB
against a 20 KB `MIN_BYTES` floor; `head.ts` has no branch for the route so it would
inherit the site-default title and a `/` canonical, which `check_seo.mjs` rejects on both
counts; and **reachability and indexability are separate concerns**. That comment
explicitly anticipates this plan's approach: *"A `404.html` fallback would fix reachability
alone and leave this sitemap decision intact."* We are taking exactly that option. The
route stays out of `ROUTES` and out of the sitemap.

**The pre-paint locale guard.** `index.html` sets `data-i18n-pending` (hiding `body`) when
the detected language is not English, cleared by `src/lib/i18n.ts` with a CSS-animation
failsafe at 2s. It is correctly gated — crawlers report `en` and never trip it. **The
404 page must not be broken by this**: it is a static file outside the React app, so it
must not depend on the attribute ever being cleared.

**Locale lists.** `TRANSLATED` in `src/lib/i18n.ts:108` is
`['en','es','bn','ht','te','fr','fa','it','hi','ar']`, mirrored by `LOCALES` in
`seo_routes.mjs`; `check_seo.mjs` re-parses `TRANSLATED` and fails on drift. There are ten
files in `src/locales/`.

**Related closed plans, for contrast.** `compare-cls` (desktop `/compare/` CLS 0.126) was
closed as an accepted known limit, and `bundlesplit` (the 2.5 MB main bundle) was tried and
**reverted** because splitting pushed mobile CLS past 0.1. Both were considered for this
plan and deliberately excluded — see *Out of scope*.

## Decisions

- **Head-level hreflang is added alongside the sitemap's, not instead of it** — Google
  reads both and treats them as corroborating; removing the sitemap set would trade one
  gap for another.
- **The alternate set is self-referential** — each page lists itself among its alternates,
  which Google requires. `gen_seo_files.mjs:54-56` already documents this for the sitemap;
  the head must match.
- **`urlFor()` is imported, never reimplemented** — the sitemap and the head must produce
  byte-identical URLs. `urlFor` handles the `?`-vs-`&` join for Compare's query-carrying
  route, which is exactly where a hand-rolled version would diverge.
- **A new `setAlternates()` helper rather than extending `setLink()`** — `setLink` keys on
  `rel` alone and is used for `canonical`; making it multi-valued would risk the canonical.
- **OG cards are generated per-school at build time, from one designed template** — the
  user chose per-school over a single shared card. Facebook being the #2 referrer makes the
  school name in the preview worth the build step.
- **Cards are NOT composed from school crests** — only 6 of 11 schools have a `logo:` in
  `BRANDS`, so a crest-based template would leave 5 schools with a broken or inconsistent
  card. The template uses the **site** logo + the school name + brand color.
- **The site logo is a blocking input for the OG step only** — the current 256×256 upscales
  poorly into a 1200×630 frame. Steps 1–3 and 8 do not depend on it, so the plan is
  ordered to let everything else proceed.
- **The 404 page is designed with Claude Design** — the user asked for this explicitly.
- **`404.html` serves the SPA but is NOT added to `ROUTES` or the sitemap** — it fixes
  reachability only, per the reasoning already written into `seo_routes.mjs`. A 404 page in
  a sitemap would be a contradiction.
- **The internal-links row is a new UI section and needs UX approval** — see below.
- **Two phases** — the internal-links row and the 404 page both add user-facing strings.

## Approvals needed

**1. UX-design gate — the school-to-school links row.** Adding a "More Charlotte-area
schools" row to the bottom of every school page is a **new section** on an existing page,
which `CLAUDE.md` puts behind the user's prior approval. It is not ingestion-driven, so it
needs an explicit OK before `/implement` runs step 3.

What it would be: a single row at the end of `SchoolDetail.tsx`, after the topic sections
and before the footer, containing the other ten schools as `SchoolBadge` monogram + name
links. No new data, no new metric key, no Compare row — it reuses `SchoolBadge`,
`toSchool()` and the existing `.note-cards`/badge styling.

**2. The high-def site logo (blocking for steps 5–7 only).** The repo's only brand asset is
256×256. Needed: a PNG with transparency, ≥1000px on its longest side (SVG preferred), and
a **horizontal/wordmark** variant if one exists — a wordmark sits far better in a landscape
banner than a square mark. Drop it in `source-material/branding/_shared/` and name the file
in the plan's *Open questions* answer.

**3. No deploy.** This plan ends at a merged PR. Publishing is a separate act the user
authorizes in the moment.

## Out of scope

- **The Compare desktop CLS (0.126).** Investigated and closed in `compare-cls.md` as an
  accepted limit. Reopening it here would re-litigate a settled decision.
- **Bundle splitting / mobile LCP (the 2.5 MB main bundle).** `bundlesplit.md` tried this
  and was **reverted** — splitting cut home JS 83% but pushed mobile CLS past 0.1.
- **Pre-rendering or indexing the checklist route.** We fix reachability only. The route
  stays out of `ROUTES` and `sitemap.xml`, and `head.ts` gets no branch for it.
- **Per-locale pre-rendered pages.** Pre-rendering stays English-only per `.claude/plans/seo.md`;
  the other nine locales keep working via `?lang=` and client rendering.
- **Any change to the pre-paint `data-i18n-pending` guard.** It is correct.
- **New school crests.** The 5 schools without a `logo:` in `BRANDS` stay as they are.

## Source material

None. This plan adds no external school data — the only new asset is the user's own site
logo, which is a branding file rather than research. Drop it in
`source-material/branding/_shared/` for provenance; no `ingest-source-material` run is
needed, since it feeds no metric.

## Steps

Two phases. Steps 1–2 and 5–8 add **no** user-facing text; steps 3–4 do. The phase split
below follows that.

### Phase 1 — English

1. **Add a multi-value alternates helper to `src/lib/head.ts`** — a `setAlternates(route)`
   that removes any existing `link[rel="alternate"][hreflang]` nodes from `document.head`,
   then appends one per locale plus `x-default`. It must remove-then-append (not update in
   place) so an in-app navigation replaces the whole set rather than leaving a stale
   locale's href behind. Do **not** modify the existing `setLink()`, which manages
   `canonical` and keys on `rel` alone.

2. **Emit the alternates from `setPageMeta()`** — call `setAlternates(route)` alongside the
   existing `setLink('canonical', …)`. The href for each locale must equal what
   `scripts/seo_routes.mjs`'s `urlFor(route, lang)` produces for the same route.
   `head.ts` is TypeScript under `src/` and `seo_routes.mjs` is a build script, so **import
   the shared logic in whichever direction typechecks cleanly** — prefer exporting a small
   pure `alternateUrls(path, query)` from `head.ts` and having `seo_routes.mjs` keep calling
   its own `urlFor`, then assert equality in step 8 rather than sharing a module across the
   `src/`↔`scripts/` boundary. The locale list must come from `TRANSLATED` in
   `src/lib/i18n.ts`, never a hardcoded array. Include `x-default` pointing at the bare
   English URL, and make the set self-referential (English lists itself).

3. **Add the school-to-school links row** *(requires approval #1)* — a new section at the
   end of `src/pages/SchoolDetail.tsx`, after the topic sections, before the footer. Render
   the other ten schools (all schools from the manifest, filtered to exclude the current
   `slug`) as links built with `toSchool(slug)`, each showing a `SchoolBadge` monogram plus
   the school name. Wire `onClick` with `preventDefault()` + `navigate()` exactly as the
   existing Compare link at `SchoolDetail.tsx:848` does, so in-app navigation stays
   client-side while the `href` remains a real crawlable URL. Reuse existing badge/card CSS
   rather than adding new styling.

4. **Add the English strings for the new row** — a heading key (e.g.
   `school.moreSchools`) in `src/locales/en.json` only. Per the i18n standard this is UI
   chrome, so it is a catalog key, never hardcoded JSX. **English only in this phase.**

5. **Design the 404 page and the OG card template in Claude Design** — one project, two
   artboards: a 404 page matching the site's look (logo, a short "page not found" message,
   a link home and a link to Compare), and a **1200×630** OG card template showing the site
   logo, the site name, and a slot for the school name on a brand-colored ground. Export
   both. *(The OG artboard depends on approval #2, the high-def logo; the 404 artboard does
   not.)*

6. **Add `public/404.html`** — a static page built from the Claude Design 404 artboard,
   which GitHub Pages serves for any unmatched path. It must (a) render readable content
   with **no JavaScript**, since it is outside the React app, and (b) **not** depend on
   `data-i18n-pending` ever being cleared — do not copy the pre-paint hide script into it.
   Vite copies `public/` into `dist/` verbatim, so no build wiring is needed. Confirm it
   does not disturb `check:seo`, which enumerates `ROUTES` and will not see it.

7. **Generate the per-school OG cards** *(requires approval #2)* — add
   `scripts/gen_og_images.mjs` that renders the step-5 template once per route (11 schools
   + home + compare) to `dist/og/<slug>.png` at 1200×630, driven by the same headless
   Chromium `prerender.mjs` already depends on (`playwright` is already a devDependency —
   do not add an image library). Chain it into `npm run build` **before** `prerender`, so
   the files exist when pages reference them. Then replace the single `OG_IMAGE` constant in
   `src/lib/head.ts` with a per-route absolute URL, keeping `twitter:image` in step with
   `og:image`. Both must stay **absolute** — `check_seo.mjs` already fails a relative
   `og:image`.

8. **Extend `scripts/check_seo.mjs`** with four assertions, so these gaps cannot silently
   reopen:
   - every pre-rendered page carries exactly `LOCALES.length` `<link rel="alternate"
     hreflang>` tags plus one `x-default`;
   - each alternate's `href` **equals `urlFor(route, lang)`** — this is the check that
     catches head/sitemap drift, and is why step 2 may duplicate the logic;
   - `og:image` and `twitter:image` are absolute **and differ across school pages** (the
     current state — 13 identical URLs — must fail);
   - `public/404.html` exists in `dist/` and is over a small byte floor.

   Follow the file's existing style: push to `problems`, exit 1 with a `✗` list. Do **not**
   assert the checklist route is in `ROUTES` — it is deliberately absent.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording and the rendered 404 page are what they want.

### Phase 2 — Every other locale

Only after that confirmation. This phase touches the **UI-chrome layer only** — the
`src/locales/*.json` catalogs. No `src/data` research prose changes, so the overlay layer
and `PROSE_TRANSLATED` are **not** involved and no overlay rebuild is needed.

1. **Translate the new chrome keys into the nine other catalogs** — the step-4 key(s) in
   each of `ar.json`, `bn.json`, `es.json`, `fa.json`, `fr.json`, `hi.json`, `ht.json`,
   `it.json`, `te.json` (the ten files in `src/locales/`, minus `en.json`). Confirm the list
   against `TRANSLATED` in `src/lib/i18n.ts` rather than trusting this sentence.
   `npm run check:chrome` reads **all ten** catalogs and reports a key present in `en` but
   missing elsewhere on a separate exit path — use it as the gate.

2. **Translate the 404 page's text** — `public/404.html` is a static file outside React and
   **cannot** use `useTranslation()`. Decide between two options and record which:
   **(a)** ship it English-only, consistent with pre-rendering being English-only by
   decision; or **(b)** add a tiny inline script that reads the same `csc.lang`
   localStorage key `index.html` reads and swaps a few strings. **Default: (a)** — it is a
   dead-end error page, it must work with no JavaScript, and option (b) reintroduces the
   English-flash class of bug the pre-paint guard exists to prevent.

3. **Do not translate the OG cards.** They are English-only, matching the English-only
   pre-rendered pages. Note it in the plan's implementation notes so a later i18n pass does
   not "fix" it.

## Files touched

| File | Change |
|---|---|
| `src/lib/head.ts` | edit — add `setAlternates()`, call it from `setPageMeta()`, replace the single `OG_IMAGE` constant with a per-route URL |
| `src/pages/SchoolDetail.tsx` | edit — new school-to-school links row before the footer |
| `src/locales/en.json` | edit — heading key for the new row (Phase 1) |
| `src/locales/{ar,bn,es,fa,fr,hi,ht,it,te}.json` | edit — same key translated (Phase 2) |
| `public/404.html` | new — static SPA-fallback page from the Claude Design artboard |
| `scripts/gen_og_images.mjs` | new — renders 13 OG cards at 1200×630 into `dist/og/` |
| `scripts/check_seo.mjs` | edit — four new assertions (hreflang count + href equality, distinct absolute OG images, 404.html present) |
| `package.json` | edit — chain `gen_og_images.mjs` into `build` before `prerender` |
| `source-material/branding/_shared/` | new — the user's high-def logo, for provenance |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean. **Then `npm run build` and read its exit code** — this
      repo has a recorded case of `--noEmit` passing on a type error the build caught.
- [ ] `npm run build` — succeeds, including the newly chained `gen_og_images` step.
- [ ] `npm run check:seo` — passes with the four new assertions active.
- [ ] **Negative test, isolating each assertion.** Temporarily corrupt the *built artifact*
      (not an upstream input) and confirm the check fails **with the expected message**, then
      restore: delete one `hreflang` line from a `dist/**/index.html`; point two school pages
      at the same `og:image`; remove `dist/404.html`. A negative test that fails for the
      wrong reason proves nothing.
- [ ] `grep -c hreflang dist/school/cannon/index.html` → **11** (ten locales + `x-default`);
      today it is **0**.
- [ ] `find dist -name index.html | xargs grep -oh 'og:image" content="[^"]*"' | sort -u |
      wc -l` → **13**; today it is **1**.
- [ ] `file dist/og/cannon.png` → `1200 x 630`.
- [ ] `grep -c 'href="/school/' dist/school/cannon/index.html` → **10**; today it is **0**.
- [ ] **Browser check** (`npm run preview`, real browser — this repo's standing lesson is
      that render-layer defects survive every source-level check):
      - a school page's new row renders, and clicking a school navigates client-side
        without a full reload;
      - visiting an unknown path (e.g. `/nonsense/`) renders the new 404 page;
      - visiting `/school/cannon/admissions-checklist/?band=lower` renders the **checklist
        sheet**, not the 404 page — this is the actual bug being fixed;
      - the 404 page renders correctly **with JavaScript disabled**.
- [ ] **Social-card preview** — paste a deployed-preview or local URL into a link-preview
      validator and confirm a wide card with the school's name, not a cropped square.

### Phase 2 — Locales

- [ ] `npm run check:chrome` — the new key resolves in all ten catalogs (a key missing
      outside `en` is its own exit path; do not accept the "awaiting translation" pass).
- [ ] `npm run build` — still green with the locale catalogs updated.
- [ ] **Browser check in at least three locales, including one RTL (`ar` or `fa`) and one
      non-Latin (`hi`/`te`/`bn`)** — the new row's heading renders translated, and the RTL
      locale lays the row out right-to-left without breaking the badges.
- [ ] `npm run check:runtime` and `npm run check:live` — expected **unchanged**, since no
      `src/data` prose moved. If either reports a delta, something touched the overlay layer
      that should not have.

## Risks

| Risk | Mitigation |
|---|---|
| Head hreflang and sitemap hreflang drift apart, so a page names one URL and the sitemap another — search engines resolve the contradiction by ignoring both | Step 8 asserts head `href` **equals** `urlFor(route, lang)`, the same function the sitemap uses. This is the single most important new assertion |
| `setAlternates()` leaves stale `<link rel="alternate">` nodes after an in-app navigation, so a school page advertises the previous page's alternates | Remove all matching nodes before appending, never update in place; verify by navigating between two schools in a browser and re-counting the tags in DevTools |
| The OG generator races `prerender.mjs` or bloats the build | Chain it **before** `prerender` in `package.json`; reuse the Playwright Chromium already in devDependencies; 13 renders at 1200×630 is a few seconds |
| The 404 page depends on the pre-paint locale guard and renders blank | It is a static file outside React — do not copy the `data-i18n-pending` script into it; explicitly verify it with JavaScript disabled |
| The new links row regresses Compare/school-page CLS, which is already at an accepted limit | Run `npm run check:vitals` before and after and compare; the row is at the page bottom, below the fold, so viewport-fraction impact should be nil — but measure rather than assume |
| The internal-links row ships before the UX gate is cleared | It is approval #1; `/implement` must confirm before running step 3, and can build steps 1–2 and 5–8 meanwhile |
| The high-def logo never arrives and blocks the whole plan | Steps 1–4, 6 and 8 are independent of it. Ship those; leave steps 5 (OG artboard) and 7 for a follow-up rather than upscaling the 256×256 |

## Open questions

- **The high-def site logo — filename and location?** *(blocks steps 5, 7)*
  The user supplied it on 2026-09-03: a **2048×2048 horizontal wordmark** — compass-and-books
  emblem at left, "CHARLOTTE PRIVATE SCHOOL CONVERSATIONS" in gold/charcoal at right, with
  the tagline "Navigating Your Family's Options" under a gold rule. It was shown in
  conversation but **may not yet be on disk**; the intended home is
  `source-material/branding/_shared/Charlotte Private School Conversations - Branding - Site Logo.png`.
  **Default:** if the file is not present when `/implement` reaches step 5, build and merge
  everything else, and leave the OG-card work as a documented follow-up. **Do not** upscale
  `public/logo.png` into a 1200×630 frame — a soft card is worse than the current cropped
  one, and it would silently close a gap that is still open.
- **Trim the logo to its artwork bounding box before compositing.** The asset is a *square*
  2048×2048 canvas holding *horizontal* artwork, so it carries substantial left/right
  padding. Placing it untrimmed in the 1200×630 card renders the mark visibly smaller than
  intended. Measure the actual ink extents and crop before scaling.
- **Is the cream ground baked in, or transparent?** The logo sits on a cream (~`#FAF7F0`)
  field. If that is opaque rather than alpha, compositing it over a brand-colored ground
  shows as a cream rectangle. **Default:** make the card's ground the **same cream** and use
  `brandOf(slug).color` for an accent bar and the school-name text, rather than as the full
  background. This is truer to the supplied brand, needs no new asset, and still yields 11
  visibly distinct cards. Only if a transparent-background version is supplied should the
  brand color become the full ground.
- **Heading wording for the new links row.** **Default:** "More Charlotte-area schools".
  It is one `en.json` value and the user reviews it at the Phase 1 gate, which is exactly
  what that gate is for.
- **404 page localization.** **Default:** English-only (Phase 2, option (a)) — recorded as a
  decision so a later i18n pass does not treat it as a bug.


## Implementation notes

### Phase 2 (locales) — 2026-09-03

**Two chrome keys shipped, not one.** The plan's step 4 anticipated a single heading key
(`school.moreSchools`); Phase 1 also added `school.cityState` (`"{{city}}, NC"`) for the
sub-label under each school name in the row. Both were translated into the nine non-English
catalogs. No `src/data` prose moved, so the overlay layer and `PROSE_TRANSLATED` were not
involved, exactly as the plan predicted.

**Per-locale renderings follow each catalog's OWN existing precedent, not a fresh
translation.** Two conventions were already settled in these catalogs and were mirrored
rather than re-decided:

- *"Charlotte-area"* — each locale has an established phrasing in `nav.footerDisclaimer`
  and `home.lede` (`del área de Charlotte`, `nan zòn Charlotte`, `de la région de
  Charlotte`, `dell'area di Charlotte`, `منطقة شارلوت`, `منطقهٔ شارلوت`, `Charlotte
  ప్రాంతంలోని`, `Charlotte क्षेत्र के`, `Charlotte এলাকার`). Each was reused verbatim.
- *Latin vs. native script for "Charlotte"* — `bn`/`te`/`hi` keep the searchable Latin
  `Charlotte` in these keys; `fa`/`ar` transliterate (`شارلوت`). Each locale's own dominant
  pattern was followed.

**`cityState` is the direct analogue of `school.dossierKicker`**, which already renders
`{{city}}, NC` per locale — so it inherits that key's two established divergences: `ar`
expands `NC` to `نورث كارولاينا`, and both `ar` and `fa` use the Arabic comma `،`. Every
other locale keeps the bare `NC`.

**A key-ordering pass silently deleted Arabic's plural forms, and was reverted.** The first
attempt normalised each catalog's `school.*` key order against `en.json`. Arabic carries
**six CLDR plural categories** (`_zero`/`_one`/`_two`/`_few`/`_many`/`_other`) across
`divisions`, `subAreas`, `subDocs` and `topics`, where `en.json` has only `_one`/`_other` —
so filtering by English's key list dropped **16 Arabic keys**, breaking pluralization in a
way `tsc`, `npm run build` and `check:chrome` all pass on. Redone as an insert-only edit:
the final diff is **+18 lines and 0 deletions** across the nine files, and Arabic's
`school.*` went 39 → 41 keys with all 24 plural forms verified intact.

**`npm run check:chrome` is NOT a sufficient gate for this, despite the plan naming it as
one.** It audits *skip-field promises* — that a field skipped by the prose extractor
resolves to an `afterSchool.day_*`-style key in all ten catalogs — and knows nothing about
an arbitrary new `school.*` key. It passes identically before and after this change. The
real gate used was an explicit assertion that both keys exist, are non-empty, and retain
their `{{city}}` interpolation in all ten catalogs. Worth fixing in the checker separately;
kept out of this diff as out of scope.

**Plan step 2 — 404 localization: option (a), English-only, as defaulted.**
`public/404.html` ships English-only. It is a static file outside React that must render
with no JavaScript, and option (b)'s inline `csc.lang` swap would reintroduce the
English-flash class of bug the pre-paint guard exists to prevent. Recorded here so a later
i18n pass treats it as a decision rather than a gap.

**Plan step 3 — the OG cards are English-only**, matching the English-only pre-rendered
pages. Likewise not a gap.

**Verification.** `npx tsc --noEmit` clean; `npm run build` exit 0 (which chains
`check:seo`, `check:live` and `check:schema`); `check:chrome` exit 0; `check:runtime` and
`check:live` both **unchanged at 12,329 entries × 9 locales**, confirming no overlay was
touched. Browser check (Playwright, `npm run preview`) covered **all nine** locales — the
plan asked for three. The heading renders translated in every one, the row holds 10 cards,
`body` is visible (the pre-paint guard cleared), and badges stay 40×40. Both RTL locales
genuinely **mirror**: the first card sits at x=944 versus x=48 in English, and the badge
flips to the right of the text.
