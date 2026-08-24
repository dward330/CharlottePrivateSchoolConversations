---
name: bundlesplit
title: Split the 2.2 MB main chunk — all 11 schools' English research ships on every page
status: abandoned
phases: 1
created: 2026-08-24
branch: perf/bundle-split
prs: [195]
---

# Split the main chunk

## Goal

The main bundle is **2.2 MB raw / 593 KB gzipped** and takes **~18s to transfer** under the
harness's Fast-3G emulation. Sourcemap attribution shows **~2.2 MB of it is
`src/data/**` research prose — all eleven schools, eagerly loaded on every page**, including
the home page, which displays none of it.

We will know it worked when the initial chunk a home-page visitor downloads is
**substantially smaller** (target: under 250 KB gzipped, i.e. under half), no route
regresses on `npm run check:vitals -- --both`, and the settled pages render identically.

## Context

### Measured 2026-08-24, not assumed

Built once with `--sourcemap true` into a scratch directory and attributed the index chunk
by source module. Of **2.77 MB of app source** in that chunk:

```
  488 KB  src/data/collegeSupportPrograms      104 KB  src/data/clubsPrograms
  401 KB  src/data/courseOfferings.ts           68 KB  src/data/clubCatalog.ts
  260 KB  src/data/summer                       48 KB  src/pages/SchoolDetail.tsx
  257 KB  src/data/sportsPrograms               35 KB  src/lib/prose.ts
  204 KB  src/data/artsPrograms                 32 KB  src/data/clubClusters.ts
  162 KB  src/data/financialAidReports.ts       31 KB  src/components/CollegeSupport.tsx
  159 KB  src/data/afterSchoolPrograms          27 KB  src/data/collegeRankings.ts
  117 KB  src/data/metricValues.ts              23 KB  src/data/podcastEpisodes.ts
```

Vendor is a rounding error by comparison: `react-dom` 533 KB, `i18next` 80 KB, `react`
18 KB. **The problem is data, not libraries** — so a vendor-chunking exercise would miss it.

### The mechanism, traced

Three facts, each verified:

1. **No route-level code splitting exists.** `src/App.tsx` statically imports `Home`,
   `SchoolDetail` and `Compare` (lines 9–11). There is **no `React.lazy`, no `Suspense`,
   no dynamic `import()`** anywhere in `App.tsx` or `main.tsx`.
2. **`SchoolDetail.tsx` statically imports every accessor** — `courseOfferings`,
   `collegeSupportProgram`, the after-school/summer/sports/arts/clubs card bodies.
3. **Each accessor statically imports all eleven schools.** `src/data/collegeSupport.ts`
   lines 536+ are eleven `import { providenceDay } from './collegeSupportPrograms/…'`
   lines; `afterSchool.ts` and `summerPrograms.ts` follow the same shape (10–11 static
   imports each).

So visiting the home page downloads Providence Day's college-support prose, Gaston Day's
sports data, and every other school's research for all eight topics.

### The inversion worth noticing

Locale overlays are **already lazy** — the registries load them through
`import.meta.glob(…)`, which Vite splits into the per-locale chunks visible in `dist`
(`course-offerings.te-*.js` at 808 KB, etc., loaded on demand). **The translations are
lazy while the English is eager**, which is exactly backwards: English is what every
visitor needs *some* of, and never all of.

### The constraint that shapes the fix

CLAUDE.md records it and the code repeats it in comments: `import.meta.glob` is a
**compile-time transform**, and the registries "MUST stand alone" — a runtime guard around
one survives into the bundle and **silently kills every overlay**. `scripts/gen_data_schema.mjs`
parses those registries out of source rather than importing them for the same reason.

Any split must therefore keep `import.meta.glob` calls at module scope, unguarded. This is
the single easiest way to break the site invisibly — overlays fail *silently*, so the page
renders English with no error.

### Why this is not an LCP fix

Established and re-verified: the pre-rendered HTML paints at **~2.0–2.3s on every school
page** regardless of the bundle. The 20.7s mobile LCP figures on two routes are a
measurement artifact (a second LCP candidate when the bundle lands), documented in
`vitals.md` follow-up 3. **Do not justify this work with LCP numbers, and do not expect LCP
to move.** The win is time-to-interactive and bytes over the wire — real, but different.

## Decisions

- **Split by route first, data second.** Making `SchoolDetail` and `Compare` lazy is one
  small change to `App.tsx` and should move the home-page chunk immediately. Per-school
  data splitting is more invasive; do it only if step 4 shows route splitting is not enough.
- **Prefer `React.lazy` + `Suspense` over manual `rollupOptions.manualChunks`** — it is the
  idiomatic React approach, it splits along the boundary users actually traverse, and it
  does not require hand-maintaining a chunk map as schools are added.
- **Do not touch the overlay `import.meta.glob` calls.** They already do the right thing.
- **Single-phase — adds no user-facing text**, with one exception to watch: a `Suspense`
  fallback is user-visible. Use the existing `loading` treatment
  (`SchoolDetail.tsx` already renders `<p className="loading">`), not a new string.
- **Do not add `check:vitals` to `npm run build`.** Its docstring gives the reason.

## Approvals needed

**None** — no new card, section, stat tile, Compare row, metric key or topic.

One thing to *flag* rather than gate on: route splitting means a school page may briefly
show a loading state where today it shows pre-rendered content immediately. The pre-render
must keep working — see the risk table, and step 5.

## Out of scope

- **LCP.** Not the mechanism; see above.
- **Vendor chunking.** `react-dom` at 533 KB is not the problem.
- **The per-locale overlay chunks.** Already lazy and correctly sized.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Single-phase — adds no user-facing text** (the `Suspense` fallback reuses the existing
`loading` element).

1. **Reproduce the baseline.** `npm run build`, then record: the index chunk's raw and
   gzipped size, and `npm run check:vitals -- --both --runs 3` for every route. Save the
   numbers — step 6 compares against them.

2. **Re-derive the attribution** rather than trusting this document:
   `npx vite build --sourcemap true --outDir <scratch> --emptyOutDir`, then attribute the
   index chunk's `sourcesContent` by module. Confirm `src/data/**` still dominates. If it
   does not, **stop and re-plan** — the rest of these steps assume it.

3. **Make the routes lazy.** In `src/App.tsx`, convert `SchoolDetail` and `Compare` (lines
   10–11) to `React.lazy(() => import(…))` behind a `<Suspense>` boundary. Keep `Home`
   static — it is the entry point and splitting it buys nothing.

4. **Measure the win.** Rebuild and compare the index chunk. If the home-page chunk is
   under ~250 KB gzipped, the route split was sufficient — skip step 5.

5. **Only if step 4 falls short: split the per-school data.** Convert the eleven static
   imports in `src/data/collegeSupport.ts` (and the equivalents in `afterSchool.ts`,
   `summerPrograms.ts`, and the `*Programs/` registries) to a lazy accessor keyed by slug.
   **`import.meta.glob` is the pattern already proven here** — the overlay loaders use it,
   so a `import.meta.glob('./collegeSupportPrograms/*.ts')` at module scope splits per
   school without hand-maintaining a map. **Keep every glob call at module scope and
   unguarded**, and check `npm run schema` still passes: `gen_data_schema.mjs` *parses*
   these registries out of source, so changing their import shape can break it.

6. **Re-measure every route, both profiles.** `npm run check:vitals -- --both --runs 3`.
   No route may regress on CLS. LCP is not expected to move; report it either way.

7. **Verify the pre-render still works.** `npm run check:seo` must pass, and the
   pre-rendered pages must still contain real content — a lazy route that renders only a
   fallback at build time would silently gut every indexable page. Check a pre-rendered
   file's byte size against the baseline, not just its existence.

8. **Browser check.** Load home → a school page → Compare, and confirm no flash of loading
   state on the pre-rendered first paint. Check `?lang=fa` too — the RTL locale exercises
   the overlay path this plan must not disturb.

## Files touched

| File | Change |
|---|---|
| `src/App.tsx` | edit — `React.lazy` + `Suspense` for `SchoolDetail` and `Compare` |
| `src/data/collegeSupport.ts`, `afterSchool.ts`, `summerPrograms.ts`, `*Programs/` registries | possible edit — only if step 5 triggers |
| `.claude/plans/bundlesplit.md` | edit — implementation notes |

## Verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — no new warnings (two pre-existing, in `check_fa_script.mjs` and
      `check_chrome_keys.mjs`)
- [ ] `npm run build` — succeeds; all eight chained checks pass
- [ ] **Index chunk gzipped size recorded before and after**, with the delta stated
- [ ] `npm run check:seo` — passes; pre-rendered pages still carry real content (compare
      byte sizes against the baseline, not just existence)
- [ ] `npm run schema` + `npm run check:schema` — the generator still parses the registries
- [ ] `npm run check:runtime` and `npm run check:live` — overlays still resolve (the
      silent-failure mode)
- [ ] `npm run check:vitals -- --both --runs 3` — no CLS regression on any route
- [ ] **Browser**: home → school → Compare, no loading flash on first paint
- [ ] **Browser**: `?lang=fa` on a school page — overlay still resolves, RTL intact

## Risks

| Risk | Mitigation |
|---|---|
| **Breaking `import.meta.glob` kills every overlay SILENTLY** — no error, page renders English. The repo's most-recorded i18n trap. | Keep every glob call at module scope, unguarded. `check:runtime` + `check:live` + a browser check in `fa` are all in the verification for this one failure. |
| **A lazy route pre-renders as an empty fallback**, gutting every indexable page while the SPA still works for anyone who clicks in. | Step 7 checks pre-rendered *byte size*, not existence — `check:seo` has a byte floor for exactly this class. |
| **`gen_data_schema.mjs` parses the registries out of source**, so changing their import shape can break the schema doc. | `npm run schema` + `check:schema` are in the verification; `check:schema` is already a build gate. |
| **A visible loading flash replaces instant pre-rendered content.** | Step 8's browser check. The pre-render should make this a non-issue — if it is not, that is a finding worth reporting rather than papering over. |
| **The win is smaller than hoped** because `SchoolDetail` is what most visitors load anyway. | Honest framing: the home page and Compare benefit most. Report the actual per-route delta rather than a single headline number. |

## Open questions

- **Is route splitting enough, or is per-school data splitting needed?** — **default:** try
  routes first (step 3), measure (step 4), and only escalate to step 5 if the target is
  missed. Do not do both in one pass.
- **Should `Home` be lazy too?** — **default:** no. It is the entry route; splitting it adds
  a round trip for the most common first paint.
- **Does this change what a returning visitor caches?** More chunks means finer-grained
  cache invalidation, which is usually a win but is untested here. — **default:** do not
  optimise for it; note the chunk count before and after.


## Implementation notes — ABANDONED 2026-08-24

Built, measured, and **reverted** (PR #195). The branch `perf/bundle-split` carries both the
implementing commit (`41a337b`) and its revert (`748d0c8`), so the work is
recoverable if the tradeoff is ever re-judged. No app code shipped.

### What was built

Step 3 only: `React.lazy` + `Suspense` on `SchoolDetail` and `Compare` in
`src/App.tsx`, `Home` left static. Step 5 (per-school data splitting) never
triggered, because step 4's target was met comfortably.

### The byte win was real and large

| | baseline | split | |
|---|---|---|---|
| Home page JS | 607,287 gz | **101,058 gz** | **−83%** |
| `/compare/` | 607,287 gz | ~123,000 gz | −80% |
| school pages | 607,287 gz | ~608,000 gz | unchanged |

The plan's target was "under 250 KB gzipped" for the initial chunk. Met with room
to spare, by route splitting alone.

### Why it was abandoned anyway: CLS

The plan's verification says **"No route may regress on CLS."** It did, on the
emulated mobile profile (390×844, CPU 4×, Fast-3G, median of 3):

| route | baseline | split | |
|---|---|---|---|
| `/school/*` (all 11) | 0.0021 GOOD | **0.1197 NEEDS-WORK** | crosses the 0.1 threshold |
| `/compare/` | 0.0618 GOOD | **0.1197 NEEDS-WORK** | crosses |
| `/` | 0.0000 GOOD | 0.0935 GOOD | stays under |

Desktop was mixed rather than uniformly worse — `/compare/` **improved**
(0.1254 NEEDS-WORK → 0.0322 GOOD, incidentally closing the `compare-cls`
residual) while school pages went 0.0000 → 0.0913, still GOOD but close to the line.

User's call, 2026-08-24: the CLS constraint wins over the byte win. Abandoned.

### The mechanism, traced (worth keeping)

A `layout-shift` PerformanceObserver plus a `MutationObserver` on `#root`:

```
{"k":"lcp","t":2864,"el":"SPAN"}
{"k":"mut","t":20387,"tgt":"DIV#root","add":0,"rem":1}   <- whole subtree replaced
{"k":"mut","t":20387,"tgt":"DIV#root","add":1,"rem":0}
{"k":"shift","v":0.1197,"t":20696,"n":"FOOTER.footer"}   <- footer 743x101 -> 0x0
```

React replaces the entire `#root` subtree once, ~20s in on this throttled profile.
**The baseline does this too** — but it re-renders a page identical in height to
the pre-rendered markup, so nothing moves. Split, the research arrives later
(cannon LCP 2.4s → 8.4s), the two heights differ, and the footer shifts.

That distinction is the whole finding: the defect is not the split *per se*, it is
the split **interacting with the pre-render**. A page that is pre-rendered to its
full settled height cannot tolerate a client re-render that arrives at a different
height.

### A fix that was tried and did NOT work

Awaiting the matching route's chunk in `src/main.tsx` before the first
`createRoot().render()` — same shape as the existing `await ready` for the locale
catalog, and it preserved the byte win (only the matching route is warmed). It
left CLS at **0.1197, unchanged**, which is what proves the shift is not a
Suspense suspend. It was removed rather than kept as a plausible-looking non-fix.

Two wrong guesses are recorded here because each cost a measurement cycle:

- *"The Suspense fallback replaces pre-rendered content."* It does not — a
  MutationObserver on `main > .loading` counted **zero** fallback appearances, and
  the browser check found 34 note-cards and intact `fa` RTL on the split build.
- *"The `#root` teardown at ~20s is the bug."* It is present on the **baseline**
  too. Always probe the baseline before attributing a timeline event to the change.

### What the next attempt should do differently

Not "split more carefully" — split, then **reserve the height**. The existing
`.topic-section .loading { min-height: 220px }` reserve in `src/index.css` is the
same idea one layer down, and its comment already records that CLS weights
*viewport fraction*, not distance, so a reserve must match the settled height
rather than merely shrink the gap. Alternatively, drop the pre-render for split
routes so there is no settled-height markup to disagree with — a much larger
change that trades against the search-indexability standard.

### Verification results (on the split build, before revert)

- ✅ `npx tsc --noEmit` — clean
- ✅ `npm run lint` — unchanged (1 pre-existing warning; the plan said 2, stale)
- ✅ `npm run build` — succeeds, all chained checks pass
- ✅ `npm run check:seo` — 13 pages OK; **none shrank** (byte-compared, not existence)
- ✅ `npm run schema` + `check:schema` — generator still parses the registries
- ✅ `npm run check:runtime` — all 9 prose locales resolve, 11,408 entries each
- ✅ **Browser** — home → school → Compare; 34 note-cards; no loading flash
- ✅ **Browser `?lang=fa`** — `dir=rtl`, 2,412 Persian glyphs; overlays intact
- ❌ `npm run check:vitals -- --both --runs 3` — **CLS regression above**

The `import.meta.glob` risk the plan flagged as most dangerous never materialised:
no glob call was touched, and `check:runtime` confirmed all nine locales.
