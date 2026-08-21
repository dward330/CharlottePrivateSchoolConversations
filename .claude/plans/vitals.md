---
name: vitals
title: Fix the school-page layout shift (CLS 0.32) and mobile LCP (4.3s)
status: in-progress
partial: mobile CLS fixed; desktop CLS and LCP still open
phases: 1
created: 2026-08-06
branch: perf/vitals
prs: [110]
---

# Fix the school-page layout shift and mobile LCP

## Goal

School pages — the pages that matter most for search — fail two of the three Core Web
Vitals:

| Metric | School page | Threshold | Verdict |
|---|---|---|---|
| **CLS** | **0.32** | ≤ 0.10 | **POOR** (>3× over) |
| **LCP** (mobile) | **4.27s** | ≤ 2.5s | **POOR** |
| LCP (desktop) | 92ms | ≤ 2.5s | good |
| CLS (home / Compare) | 0.001 / 0.06 | ≤ 0.10 | good |

We will know it worked when the school page measures **CLS ≤ 0.1** and **mobile LCP ≤
2.5s** under the same harness that produced the numbers above, with no visual change to
the page at rest.

## Context

### Measured, not assumed (2026-08-06)

Numbers came from a headless Chromium harness against a real `vite preview` of the
production build: `PerformanceObserver` for `largest-contentful-paint` and `layout-shift`,
CPU throttled 4× with Fast-3G network emulation for the mobile figures.

**Caveat worth carrying into the work:** these are **lab numbers on one machine**. Google
ranks on *field* data (CrUX, real visitors). Lab data finds problems; it does not predict
the score. The site is also **not yet deployed**, so no field data exists at all.

### The CLS mechanism, traced

Page height over time on `/school/cannon/`:

```
+ 87ms   bodyH 4986
+102ms   bodyH 3310     <- collapses ~1700px
+141ms   bodyH 4966     <- restores
```

One shift at +88ms accounts for **0.3175 of the 0.3195 total**. Everything below y≈216
jumps up, then back down. At the moment of the shift, `document.querySelectorAll('details')`
returns **0** — the research panels do not exist yet — and the shift's source nodes are
already detached, the signature of nodes being removed and replaced.

### What it is NOT — ruled out by experiment

Three hypotheses were tested and **refuted**; do not re-derive them:

- **Not caused by pre-rendering / PR #105.** The same page served with `#root` emptied (a
  bare shell, no pre-rendered markup) shifts **just as much**: 0.3187 vs 0.3195. This CLS
  is pre-existing and predates the SEO work.
- **Not a web-font reflow.** Blocking `fonts.googleapis.com` and `fonts.gstatic.com`
  entirely leaves CLS at 0.3175.
- **Not images without dimensions.** At the moment of the shift, `document.images` has zero
  incomplete entries.

### The remaining hypothesis

The collapse-then-restore pattern points at the **school page mounting in two passes**:
a first render without the topic content, then a second once lazily-loaded content
resolves. `SchoolDetail` renders topic sections from `src/content/<topic>/<school>.json`
loaded through `import.meta.glob`, and the locale overlay warms separately (see the
`loadMetricValuesOverlay` effect in `Compare.tsx` for the same shape).

**This is a hypothesis, not a finding.** Step 1 is to confirm it before changing anything.

### LCP context

The main bundle is **1,441 KB (396 KB gzipped)** and Vite warns about it on every build.
Per-topic per-locale chunks are separate and lazy, which is already right. Desktop LCP is
92ms, so this is purely a slow-connection problem: the bundle has to arrive and execute
before the largest element paints.

## Approvals needed

**None** — no new card, section, stat tile, Compare row, metric key or topic; no
reordering. The goal is explicitly that the page at rest looks **identical**.

One thing to flag rather than gate on: if the fix requires reserving vertical space for
content that has not loaded, readers may see a placeholder region where today they see the
page's own (shifted) content. That is a visible change to the *loading* experience, though
not to the settled page — surface it with a before/after if it comes to that.

## Out of scope

- **Any change to what the settled page renders.** This is a timing and layout-stability
  fix, not a redesign.
- **Route-level code splitting of the main bundle.** Tempting for LCP, but it is a
  structural change to how the app loads and deserves its own plan if step 5 shows the
  bundle is genuinely the binding constraint.
- **The home page and Compare.** Both already pass (CLS 0.001 / 0.06).
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Single-phase — adds no user-facing text.** No `en.json` key, no locale work.

1. **Confirm the two-pass hypothesis before changing code.** Instrument
   `SchoolDetail`'s render path: log what is present at each commit, and correlate against
   the `layout-shift` timeline. Identify the exact subtree that is absent at +88ms and
   present at +141ms. **If the hypothesis is wrong, stop and re-plan** — the rest of these
   steps assume it.

2. **Reserve the space.** Whatever subtree collapses, give its container a stable height
   before the content arrives — `min-height` on the section wrapper, sized from what the
   pre-rendered markup already knows. The pre-rendered HTML contains the *full* expanded
   content, so the correct height is knowable at build time in a way it usually is not.

3. **Re-measure CLS.** Same harness, same route. Target ≤ 0.1. Also measure the home page
   and Compare to confirm no regression there.

4. **Check the other five school pages.** Cannon was the probe; Providence Day is the
   largest (416 KB pre-rendered) and Davidson Day the smallest (266 KB). CLS should be
   ≤ 0.1 on all six.

5. **Only then look at LCP.** With CLS fixed, re-measure mobile LCP. If it is still >2.5s,
   identify what the LCP element actually is (likely the `h1` or the header block) and
   whether it is blocked on the bundle or on the font. Report the finding; do **not**
   start splitting the bundle inside this plan.

6. **Add a regression guard.** A `scripts/check_vitals.mjs` wired as `check:vitals`,
   asserting CLS ≤ 0.1 on the six school pages against a built `dist/`. Keep it out of the
   default `build` chain — it needs a browser and adds seconds — but make it runnable.

## Files touched

| File | Change |
|---|---|
| `src/pages/SchoolDetail.tsx` | likely edit — reserve height for the late-mounting subtree |
| `src/index.css` | likely edit — the `min-height` rule |
| `scripts/check_vitals.mjs` | **new** — CLS regression guard |
| `package.json` | edit — add `check:vitals` |

Deliberately provisional: step 1 decides the real target. If the collapse turns out to be
in a component rather than the page, that component is edited instead.

## Verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — no new warnings (two pre-existing in `check_fa_script.mjs` and
      `check_chrome_keys.mjs`)
- [ ] `npm run build` — succeeds, 8 pre-rendered pages
- [ ] `npm run check:seo` — still passes
- [ ] **CLS ≤ 0.1 on all six school pages**, measured with the harness described in Context
- [ ] **Home and Compare CLS unchanged** (0.001 / 0.06) — no regression
- [ ] Mobile LCP re-measured and reported, whether or not it improved
- [ ] **Browser check**: the settled page is visually identical to before — same spacing,
      same content, no placeholder left visible after load
- [ ] **Non-English check**: `?lang=es` and `?lang=fa` still render correctly and the
      PR #106 no-English-flash behaviour still holds (this touches the mount path)
- [ ] `git status` clean of probe scripts

## Risks

| Risk | Mitigation |
|---|---|
| **A reserved height that is wrong leaves a visible gap** on the settled page — trading an invisible shift for a visible defect. | Step 3's browser check is explicitly "identical at rest". Measure the real height from the pre-rendered HTML rather than guessing a round number. |
| **The two-pass hypothesis is wrong**, and step 2 papers over a different cause. | Step 1 is a hard gate: confirm before changing. If it does not hold, stop and re-plan. |
| **Fixing CLS regresses the non-English paint fix (#106)**, which gates on the same mount. | Explicit verification line; re-run the visibility harness, not a DOM probe — the DOM transitions identically either way, which is what made the original bug invisible. |
| **Lab numbers improve, field numbers do not.** | Accept and state it. After deploy, check Search Console's Core Web Vitals report against real visitors before declaring it fixed. |
| CLS differs by viewport; a mobile viewport may shift differently than the 1280×800 used here. | Measure at both a desktop and a mobile viewport in step 3. |

## Open questions

- **Is the ~1700px collapse the topic sections, or the `<details>` panels themselves?**
  At +88ms `details` count is 0 and at +141ms it is 35, which suggests the panels — but the
  pre-rendered HTML contains them, so the question is really *why they leave*.
  **Default:** treat step 1 as the answer; do not guess.
- **Should the reserved height come from the pre-rendered markup at build time?**
  The pre-render already knows each page's true expanded height, so it could emit a
  per-page value.
  **Default:** try the simpler CSS `min-height` first; only reach for build-time values if
  a static rule cannot fit all six pages.
- **Is mobile LCP worth fixing at all if it needs bundle splitting?**
  **Default:** measure and report in step 5, decide separately. A 4.3s LCP on emulated
  Fast-3G may correspond to a much better real-world number for this audience.

## Implementation notes (partial — PR pending)

**Outcome: mobile CLS fixed, desktop CLS not.** Committed as a partial rather than
reverted, because mobile-first indexing makes the mobile half the more valuable one and
the negative findings below are worth keeping.

| Route | Desktop before | Desktop after | Mobile before | Mobile after |
|---|---|---|---|---|
| 6 school pages | 0.32 POOR | **0.32 POOR** | 0.32 POOR | **0.003 GOOD** |
| home | 0.001 | 0.001 | — | 0.165 needs work |
| compare | 0.06 | 0.16 | — | 0.134 needs work |

### Step 1's gate passed — the hypothesis was right, and incomplete

The two-pass mount is real and was proven, not assumed. At the shift the DOM goes from 35
`<details>` to **0**, with seven `p.loading` placeholders, and page height drops
4986 → 3310 → 4966px. The `ready` flag in `SchoolDetail` (`useState(false)`, flipped only
after eight overlay promises resolve) is the cause.

**But the diagnosis explained the height change, not the score.** After reserving space,
the remaining desktop shift is only **20–40px per element** — the reserve worked — yet CLS
stays 0.3175, because CLS weights the *fraction of viewport affected*, not the distance
moved. On a ~5000px page, nudging nearly every element 40px scores as badly as moving it
400px. Optimising displacement was optimising the wrong quantity.

### What was tried and rejected

- **Synchronous content loading** (seed first render from cache). Implemented, then found
  useless for the case that matters: a cold page load has an empty cache, and the pre-render
  and every real first visit are cold. Making it truly synchronous would mean bundling
  **396–478 KB per school** into the main chunk — trading a layout shift for a worse LCP,
  the other metric this plan is trying to fix. The cache was **kept** (it removes the
  placeholder on re-visits: back button, language switch) but it is not the CLS fix.
- **Raising the desktop `min-height`.** Makes it **worse**: 220px → 0.3184, 300px+ → 0.3365.
  Overshoot causes sections to shrink back after load, shifting content the other way.
  Settled desktop sections span 271–684px, so no single floor fits — and the plan's own risk
  row (a wrong reserve leaves a visible gap) is the reason not to force it.

### A measurement trap worth recording

A probe reported *identical* CLS across six candidate `min-height` values, which first read
as "the injected rule isn't applying." It **was** applying (`getComputedStyle` confirmed
`min-height: 220px`); the values genuinely did not matter, for the viewport-fraction reason
above. Nearly drew the opposite conclusion. Verify that a rule applied before concluding it
had no effect — and vice versa.

### Two findings outside the plan's scope

Both were previously measured desktop-only, which is why the plan called them passing:

- **`/compare/` needs work** — 0.16 desktop, 0.13 mobile. The plan scoped it out as good.
- **The home page is 0.165 on mobile** despite 0.001 on desktop.

### What shipped

- `src/lib/content.ts` — `GROUPS_CACHE` + `peekMetricGroups()`, a synchronous read of
  already-loaded research, keyed by topic×school×**lang** so an `es` result can never be
  served to an `en` reader.
- `src/pages/SchoolDetail.tsx` — seeds initial state from that cache, and no longer blanks
  the page on a re-render when the data is already warm.
- `src/index.css` — `.topic-section .loading` reserve: 220px desktop, 400px mobile. The
  mobile value is what fixes mobile CLS.

### Remaining work

Desktop needs the topic sections to render their real content on the **first** pass, which
means reworking the `ready` gate rather than reserving space around it — a more invasive
change to the school-page mount than this plan scoped. **Re-plan rather than improvise**,
now that the viewport-fraction insight changes the approach. Steps 5 (LCP) and 6
(`check_vitals.mjs` regression guard) are untouched and still open.

## Baseline — 2026-08-21, `npm run check:vitals`

`scripts/check_vitals.mjs` now exists (`.claude/plans/valuegates.md`, workstream C), so
every number below is reproducible on demand rather than remembered. `src/index.css:557`
told readers to "re-measure with `scripts/check_vitals.mjs`" for months while that file did
not exist; it does now, and this is its first run.

Median of 3 runs per route, against a real `vite preview`-equivalent server over the
production `dist/`. Desktop 1280×900, CPU 1×. Mobile 390×844, CPU 4×, Fast-3G.

### Desktop

| Route | CLS | LCP |
|---|---|---|
| `/` | 0.0012 GOOD | 148ms |
| `/compare/` | **0.1608 NEEDS-WORK** | 140ms |
| `/school/cannon/` | 0.0101 GOOD | 152ms |
| `/school/carmel-christian/` | 0.0023 GOOD | 144ms |
| `/school/charlotte-catholic/` | **0.3505 POOR** | 148ms |
| `/school/charlotte-christian/` | 0.0102 GOOD | 152ms |
| `/school/charlotte-country-day/` | 0.0102 GOOD | 160ms |
| `/school/charlotte-latin/` | 0.0101 GOOD | 160ms |
| `/school/covenant-day/` | 0.0023 GOOD | 152ms |
| `/school/davidson-day/` | **0.3509 POOR** | 148ms |
| `/school/gaston-day/` | 0.0023 GOOD | 152ms |
| `/school/hickory-grove-christian/` | 0.0023 GOOD | 148ms |
| `/school/providence-day/` | 0.0102 GOOD | 156ms |

### Mobile (CPU 4×, Fast-3G)

| Route | CLS | LCP |
|---|---|---|
| `/` | 0.0135 GOOD | **12,708ms POOR** |
| `/compare/` | **0.1747 NEEDS-WORK** | 1,628ms GOOD |
| `/school/cannon/` | 0.0031 GOOD | **20,648ms POOR** |
| `/school/carmel-christian/` | 0.0277 GOOD | 2,008ms GOOD |
| `/school/charlotte-catholic/` | 0.0274 GOOD | 2,004ms GOOD |
| `/school/charlotte-christian/` | 0.0236 GOOD | 2,016ms GOOD |
| `/school/charlotte-country-day/` | 0.0236 GOOD | 2,004ms GOOD |
| `/school/charlotte-latin/` | 0.0031 GOOD | 2,016ms GOOD |
| `/school/covenant-day/` | 0.0030 GOOD | 2,016ms GOOD |
| `/school/davidson-day/` | 0.0028 GOOD | **20,820ms POOR** |
| `/school/gaston-day/` | 0.0030 GOOD | 2,008ms GOOD |
| `/school/hickory-grove-christian/` | 0.0277 GOOD | 2,008ms GOOD |
| `/school/providence-day/` | 0.0031 GOOD | 2,012ms GOOD |

### What this baseline changes about the plan above

**The desktop CLS problem is SCHOOL-SPECIFIC, not universal — and that is new.** The
"CLS 0.32" in this plan's title and opening table was measured on `/school/cannon/`, and
Cannon now measures **0.0101 GOOD**. Ten of eleven school pages are GOOD on desktop. Only
**`charlotte-catholic` (0.3505)** and **`davidson-day` (0.3509)** are POOR, and they
reproduce the ~0.35 magnitude tightly across runs, so this is the same defect — it just
does not affect the page the original diagnosis profiled.

That reframes the remaining work. This plan's "Remaining work" section says desktop needs
the `ready` gate reworked for *every* school page; the measurement says nine schools no
longer need anything. **Do not start from that section.** Start from what those two pages
have that the other nine do not.

One lead, offered as a lead and NOT as a finding — it was not tested: Charlotte Catholic
and Davidson Day are the two schools with **seven** research areas rather than eight
(Davidson Day has no Summer Programs material at all; Charlotte Catholic shipped across
seven areas). Both pre-render fully — 33 and 31 `<details>`, zero `.loading` placeholders
in the shipped HTML — so it is *not* a pre-rendering failure. Whether a missing topic
section is causally involved is exactly the sort of thing the next plan should measure
before believing.

**`/compare/` reproduces its recorded regression precisely** — 0.16 desktop, recorded here
as 0.16 in "Two findings outside the plan's scope". It is now 0.1747 on mobile too, where
this plan recorded 0.13. Still the worst non-school route.

**The home page's mobile CLS is FIXED** — this plan records 0.165; it now measures 0.0135.

### Caveats on these numbers

- **The mobile LCP figures are not comparable to this plan's 4.27s.** That figure came
  from a discarded harness whose throttle settings are unrecoverable. `check_vitals.mjs`
  uses Chrome DevTools' Fast-3G preset (1.6 Mbps / 750 Kbps / 150ms RTT) at CPU 4×, which
  is stricter. The POOR *verdict* agrees; the magnitude does not, and nothing is gained by
  pretending otherwise. **Compare future runs to THIS table, not to the 2026-08-06 one.**
- The three ~20s mobile LCP outliers are **reproducible, not noise** — `/school/cannon/`
  re-measured at 20,640ms on an independent run. Ten routes sit near 2,010ms, which is
  suspiciously uniform and looks like a resource-timing boundary rather than a per-page
  property. Worth understanding before treating any of it as a page defect.
- Lab numbers on one machine. They find problems; they do not predict the field score
  Google ranks on. The site now has real traffic, so CrUX data may exist — check it before
  spending effort on a lab number.
