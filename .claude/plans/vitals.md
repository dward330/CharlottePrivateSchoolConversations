---
name: vitals
title: Fix the Davidson Day desktop CLS (0.35) — an unsized header crest, not a webfont reflow
status: implemented
phases: 1
created: 2026-08-06
revised: 2026-08-22
branch: perf/vitals-cls
prs: [110, 175]
---

# Fix the Davidson Day desktop CLS

## Goal

`/school/davidson-day/` measures **CLS 0.3496 on desktop** — 3.5× the 0.1 threshold and
the worst Core Web Vital on the site. Every other route is GOOD. The cause is now traced
by experiment to the **Google Fonts stylesheet** swapping metrics under the header's topic
chip row, which re-wraps from one line to two and pushes the whole page down 39px.

> **Superseded at implementation — read `## Implementation notes` first.** The chip row
> does re-wrap and the page does drop 39px, but the element that squeezes it is the
> **unsized, lazy-loaded header crest `<img>`**, not the font swap. The font-blocking
> experiment below reproduces reliably and is still the wrong mechanism. Everything from
> here to the Follow-ups is preserved as written on 2026-08-22, corrections at the bottom.

We will know it worked when `npm run check:vitals -- --route /school/davidson-day/ --runs 3`
reports **CLS ≤ 0.1**, with no other route regressing and the settled page visually
identical.

## Context

### THIS PLAN WAS REWRITTEN 2026-08-22 — the original was measuring a stale build

PR #110 landed a partial fix (mobile CLS) and left this document describing a problem that
no longer matches reality. Re-measured today against a fresh `npm run build`, using the
`scripts/check_vitals.mjs` harness added by PR #172:

| | This plan used to say | Measured 2026-08-22 |
|---|---|---|
| Desktop CLS, school pages | 0.32 POOR on **all 6** | GOOD on **10 of 11** |
| Desktop CLS, Davidson Day | — | **0.3496 POOR** |
| Desktop CLS, Compare | 0.16 regressed | 0.1602 NEEDS-WORK (see follow-ups) |
| Mobile CLS | 0.003 fixed | 0.003 confirmed GOOD everywhere |
| Mobile LCP | 4.27s POOR | **artifact — real paint is ~2.0–2.3s GOOD** |

There are also **11 schools now, not 6**. Any step that says "the six school pages" is
stale; use the route list from `scripts/seo_routes.mjs`.

### Root cause — confirmed by experiment, not inferred

Blocking Google Fonts takes Davidson Day from **0.3485 → 0.0000**:

```
/school/davidson-day/   fonts ALLOWED               CLS=0.3485
/school/davidson-day/   googleapis+gstatic BLOCKED  CLS=0.0000
/school/cannon/         fonts ALLOWED               CLS=0.0107
/school/cannon/         googleapis+gstatic BLOCKED  CLS=0.0000
```

The mechanism, sampled every 3ms through the load:

```
+ 92ms  hdrH=237  chipH=32  navY=424   <- one-line chip row, fallback metrics
+149ms  hdrH=277  chipH=71  navY=463   <- chip row WRAPS to two lines, page drops 39px
+172ms  det=0                          <- (React teardown, see "ruled out" below)
+229ms  det=31                          <- remount; settled geometry
```

`.school-header-topics` is the row of topic chips in the school-page header
([SchoolDetail.tsx](../../src/pages/SchoolDetail.tsx), rendered from `covered`). It is
laid out at **830px wide**. With fallback metrics Davidson Day's eight chips total
**921px** of content; with Barlow loaded they total **849px**. Both exceed 830px, so it
wraps to two lines either way — but the *transition* between the two states is what
shifts, and everything below the header (nav, main, all 31 research cards) moves 39px.

**Why Davidson Day and not the others.** It is the only school sitting near the wrap
boundary at both metrics. Cannon carries nine chips totalling 979px (fallback) / 1063px
(loaded) — already comfortably two lines in both states, so its row height never changes
and it scores 0.0079. Davidson Day has **7 research areas** (no Summer Programs — a
deliberate documented absence, not a gap) which is what puts its chip count on the knife
edge.

### The font stylesheet, not the font files

Blocking **only** `fonts.gstatic.com` (the `.woff2` binaries) leaves CLS at 0.3485.
Blocking `fonts.googleapis.com` (the stylesheet) is what takes it to zero. The stylesheet
is a **render-blocking `<link>`** in [index.html:41-44](../../index.html#L41-L44) with
`display=swap`, alongside `preconnect` hints on lines 39–40.

Font stacks are in [index.css:35-36](../../src/index.css#L35-L36):

```css
--heading: 'Barlow Condensed', system-ui, sans-serif;
--sans: 'Barlow', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

### What it is NOT — ruled out by experiment, do not re-derive

- **NOT the two-pass mount / `ready` gate.** The original plan's central hypothesis. The
  pre-rendered markup *is* torn out and remounted (`details` 31 → 0 → 31 at +172/+229ms)
  — but **Cannon and Gaston Day do exactly the same and score 0.008 and 0.000**. The
  teardown is universal and is not the differentiator. Do not spend the plan reworking
  `seed()` / `ready` in `SchoolDetail.tsx`.
- **NOT the settled layout.** Header, nav, layout, main and body heights are byte-identical
  pre- and post-hydration on every school page. The shift is purely transient.
- **NOT `.dossier-nav` shrinking.** An earlier reading of the CLS attribution rects
  suggested the nav shrank 477→438px. Measured directly it is **stable at 425px** before
  and after hydration. The attribution rects report the *shifted region*, not the element
  that changed size.
- **NOT the bundle.** See follow-up 2.

### A correction this plan must carry

The previous version of this document listed **"Not a web-font reflow"** as a refuted
hypothesis, citing a test that blocked `fonts.googleapis.com` and `fonts.gstatic.com` and
saw CLS stay at 0.3175. **That refutation was wrong**, and it is very likely why this bug
survived PR #110. A re-run of that same test today shows the route pattern matching **zero
requests** — the block silently applied to nothing, so the experiment tested the unmodified
page and "confirmed" the null result.

The lesson generalises and belongs in the implementer's head: **verify an intervention
actually applied before believing a null result.** This repo's `check_vitals.mjs` header
already records the mirror-image trap (verify a rule *did not* apply before concluding it
had no effect). Count the blocked requests; assert the number is non-zero.

## Decisions

- **Fix the chip row, not the font loading strategy** — self-hosting Barlow or switching to
  `font-display: optional` would also fix it, but both are site-wide changes with their own
  risk surface (FOUT/FOIT tradeoffs, a new asset pipeline, licensing). The chip row is the
  one element whose wrap count changes; stabilising it is the narrow fix.
- **Prefer `min-height` on `.school-header-topics` over `size-adjust` metric overrides** —
  a `@font-face` metric override matched to the fallback is the "correct" general fix, but
  it must be tuned per family and re-tuned whenever the stack changes. A reserved
  two-line height is one rule and is obviously right for a row that is two lines in both
  metric states on every school.
- **Do not gate `check:vitals` in `npm run build`** — the harness's own docstring explains
  why (a browser dependency, seconds of runtime, and the repo's recorded history of
  permanently-red checkers). Keep it runnable, keep it out of the chain.
- **Single-phase — adds no user-facing text.** A CSS rule and possibly one `<link>`
  attribute. No `src/locales/*.json` key, no overlay work.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic; no reordering.
The goal is explicitly that the settled page renders identically.

One thing to *flag* rather than gate on: if step 3 reserves two lines of height for the
chip row, a school whose chips genuinely fit on one line would gain ~39px of blank header
space. Check every school at step 4; if any is affected, say so before proceeding rather
than trading an invisible shift for a visible gap.

## Out of scope

- **Compare's CLS** and **the main bundle** — recorded as follow-ups below, deliberately
  not fixed here. They are different mechanisms in different files.
- **Mobile LCP.** Dropped entirely — it was a measurement artifact, see follow-up 3.
- **Reworking the `ready` gate or the pre-render/hydration path.** Ruled out above.
- **Self-hosting the webfonts.** A defensible alternative fix, but a larger change; if
  step 3 fails, it becomes the fallback and gets its own plan.
- **Deploying.** `npm run deploy` stays the user's call, every time.

## Steps

**Single-phase — adds no user-facing text.**

1. **Reproduce the baseline.** `npm run build`, then
   `npm run check:vitals -- --route /school/davidson-day/ --runs 3`. Confirm **CLS ≈ 0.35
   POOR**. If it is already GOOD, stop and re-measure the whole route set — something
   changed and this plan needs revisiting before any edit.

2. **Reproduce the root cause.** Re-run with `fonts.googleapis.com` blocked and confirm
   CLS drops to ~0. **Assert the block matched a non-zero number of requests** — that
   assertion is the entire point of this step, per the correction above.

3. **Reserve the chip row's height.** In [src/index.css](../../src/index.css), give
   `.school-header-topics` a `min-height` equal to its settled two-line height (**71px** at
   1280px wide, measured; confirm rather than copying the number). Scope it to the desktop
   breakpoint if a narrower viewport wraps to a different line count.

4. **Re-measure every route, both profiles.** `npm run check:vitals -- --both --runs 3`.
   Requirements: Davidson Day **CLS ≤ 0.1**; no other route regresses; mobile stays GOOD
   throughout. Note this takes several minutes — run it in the background.

5. **Browser check at rest.** Load Davidson Day and two others (Cannon, Gaston Day) in a
   real browser and confirm the settled header is visually identical to `main` — no extra
   blank band above the nav. Check `?lang=fa` too: RTL and the longer translated chip
   labels are the case most likely to wrap differently.

6. **If step 4 fails, stop.** Do not stack a second fix on top. The harness header records
   that CLS weights **viewport fraction**, not distance — reserving space can shrink the
   movement without moving the score. If `min-height` does not clear it, record what the
   number did and re-plan toward `size-adjust`/`ascent-override` metric overrides or
   self-hosting Barlow. A failed step 3 is a useful finding, not a failure of the plan.

7. **Update this document** with an `## Implementation notes` section: the measured
   before/after, and — if step 6 triggered — what the reserved height actually did.

## Files touched

| File | Change |
|---|---|
| `src/index.css` | edit — `min-height` on `.school-header-topics` |
| `index.html` | possible edit — only if step 6 sends the fix toward font loading |
| `.claude/plans/vitals.md` | edit — implementation notes at step 7 |

## Verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — no new warnings (two pre-existing, in `check_fa_script.mjs` and
      `check_chrome_keys.mjs`)
- [ ] `npm run build` — succeeds; all eight chained checks pass
- [ ] `npm run check:vitals -- --route /school/davidson-day/ --runs 3` — **CLS ≤ 0.1**
- [ ] `npm run check:vitals -- --both --runs 3` — no route regresses on either profile
- [ ] Browser: Davidson Day, Cannon, Gaston Day settled headers identical to `main`
- [ ] Browser: `?lang=fa` on Davidson Day — chip row still correct in RTL
- [ ] `git status` clean of probe scripts (this plan's research left none; keep it that way)

## Risks

| Risk | Mitigation |
|---|---|
| **A reserved height leaves a visible gap** on a school whose chips fit one line — trading an invisible shift for a visible defect. | Step 5 checks three schools plus a locale; the Approvals note says to surface it rather than ship it. |
| **`min-height` shrinks the distance but not the score**, because CLS weights viewport fraction. | Step 6 is an explicit stop-and-re-plan gate, not a licence to keep patching. |
| **The fix is viewport-dependent** — 71px is measured at 1280px. | Step 4 runs both desktop and mobile profiles; scope the rule to a breakpoint if needed. |
| **Lab numbers improve, field numbers do not.** The site has been live since 2026-08-21, so CrUX data now exists. | Check Search Console's Core Web Vitals report after deploy before declaring it fixed. State plainly that these are lab numbers on one machine. |

## Open questions

- **Is `min-height` enough, or does this need font metric overrides?** — **default:** try
  `min-height` first (step 3); if step 4 fails, stop at step 6 and re-plan rather than
  improvising a second fix in the same pass.
- **Should Barlow be self-hosted?** It would fix this class of bug permanently and remove a
  third-party render-blocking request, but it is a larger change. — **default:** out of
  scope here; raise it as a follow-up if step 3 succeeds, or as the fallback plan if it
  does not.

---

## Follow-ups — measured 2026-08-22, deliberately NOT in this plan

Recorded here so they are not lost; each needs its own plan.

### 1. Compare page CLS — 0.1602 desktop / 0.1747 mobile (NEEDS-WORK)

A **different mechanism** from the one above. The shift at +155ms is the school-picker pill
row reflowing: `.control-hint`, `.empty` and the `BUTTON.pill.school` elements all move
**up 45px** as one row of pills collapses.

Two things make it a poor first target, which is why it is not this plan:

- **The numbers are unstable.** A single-route re-run measured 0.0027 GOOD; the median-of-3
  says 0.1602. Reproduce it reliably before planning against it.
- **It is measured in the empty state.** The timeline shows the table present at +127ms
  (`rows=7`) then gone at +138ms (`tables=0`) — with no schools selected, the page renders
  `compare.empty` ([Compare.tsx:263](../../src/pages/Compare.tsx#L263)). That is not what a
  visitor who arrives from a school page sees, so the number may not describe the real
  experience.

### 2. Main bundle — 2.2 MB raw / 593 KB gzipped

Up ~50% gzipped from the 396 KB this plan recorded on 2026-08-06. It takes **~18s to
transfer under the harness's Fast-3G emulation**.

**This is an interactivity cost, not an LCP cost** — the pre-rendered HTML paints at ~2.3s
regardless. Route-level code splitting would not move LCP. Worth its own plan on TTI/INP
grounds, but do not justify it with LCP numbers.

### 3. Mobile LCP — the 20.7s figures are an ARTIFACT, not a regression

`check:vitals -- --mobile` reports ~20.7s on `/school/cannon/` and
`/school/davidson-day/`, and ~2.0s on the other nine — including
`/school/providence-day/`, which is the **largest** page (484 KB) and therefore cannot be
explained by size.

Traced: both slow pages emit a **second LCP candidate at ~+17.9s**, for the *same* element
grown from 11160 to 11412 bytes — a podcast line ("… is also covered in 1 episode
outside…") reflowing when the bundle finally lands. LCP takes the last candidate, so those
two pages report the bundle's arrival time while the other nine report their real paint.

**The real first paint is ~2.0–2.3s GOOD on every school page.** The original plan's
mobile-LCP work is therefore dropped, not deferred. If a future pass wants a true mobile
LCP number, it must exclude late candidates that merely re-measure an already-painted
element.

---

## Implementation notes — 2026-08-22

**Shipped, and the fix is NOT the one this plan specified.** Davidson Day desktop CLS went
**0.3485 POOR → 0.0000 GOOD**, but via the header crest `<img>`, not `min-height` on
`.school-header-topics` and not the Google Fonts stylesheet.

### The measured root cause: an unsized, lazy-loaded image

`.dossier-crest` was an `<img>` with **no `width`/`height` attributes and
`loading="lazy"`**. It therefore occupied **zero width** until the PNG arrived, then popped
in at 156px and squeezed its flex sibling — the chip row — from **986px to 830px**:

```
+ 88ms  chipRow h=32  boxW=986  crestW=0     <- crest not yet loaded, chips fit ONE line
+125ms  chipRow h=71  boxW=830  crestW=156   <- crest lands, row re-wraps to TWO lines
+137ms  layout-shift v=0.3603                <- everything below moves 39px
```

Davidson Day's eight chips total 906px: they fit on one line at 986px and wrap at 830px.
That 906px is the whole story — it is the only school whose chip total falls **between** the
two box widths.

### Two claims in the plan's Context section were wrong

Both were reproduced honestly and still misattributed, so they are corrected here rather
than quietly dropped:

1. **"The chip row wraps to two lines either way" is false for the school that matters.**
   Measured fallback-vs-Barlow content widths per school show Davidson Day at 977px
   (fallback) / 906px (Barlow) against an **830px** box — two lines in both states, so the
   font swap never changes its settled row count. The school whose row count *does* flip on
   the font swap is **Charlotte Catholic** (2 rows → 1), and it scored **0.0000** throughout.
   The plan's 830px figure was the *post-crest* width; the pre-crest 986px was never measured.

2. **"Blocking `fonts.googleapis.com` takes it to 0.0000" is real but not causal.** Re-run
   with request counting (`blocked=1` / `allowed=1`, so neither arm was a silent no-op),
   it reproduces exactly. Blocking the stylesheet removes a render-blocking request, which
   reorders the load enough that the crest lands *before* the chips paint — masking the
   shift rather than removing its cause. A correlation that survives a request-count
   assertion can still be the wrong mechanism.

The plan's own warning — *verify an intervention actually applied before believing a
result* — is what caught this. Three CSS-only candidates (`width: clamp()`, `aspect-ratio`,
`min-width`) all measured as no-change; checking whether they applied showed the injected
attributes were **stripped by React hydration**, i.e. no-ops rather than null results.

### The fix

`src/pages/SchoolDetail.tsx` — the crest carries its real intrinsic
`width={1200} height={800}` (every file in `public/logos/` is 1200×800) and drops
`loading="lazy"`, which was wrong anyway for an above-the-fold image.
`src/index.css` — `aspect-ratio: 3 / 2` on `.dossier-crest`, so the reserved box survives
the `height: clamp()` that would otherwise re-collapse `width: auto`.

### Why `min-height` would have been the wrong fix

Step 3's rule would have shipped a visible defect. The chip row's settled height is **not**
a constant: measured across viewports and locales it is 1–4 rows (32 / 71 / 111 / 150px),
varying by school, by crest presence (box is 830px with a crest, 1014px without) and by
locale. A flat 71px would have left a **~39px blank band** under the chip row on
**Charlotte Catholic in English** and on **carmel-christian, covenant-day, gaston-day and
hickory-grove-christian in Farsi** — all of which genuinely settle at one line. This is the
exact trade the Approvals section said to surface rather than ship.

### Results — `npm run check:vitals -- --both --runs 3`

| Route | Desktop CLS before | after |
|---|---|---|
| `/school/davidson-day/` | 0.3485 POOR | **0.0000 GOOD** |
| `/school/cannon/` | 0.0079 | 0.0000 |
| `/school/providence-day/` | 0.0079 | 0.0000 |
| `/school/charlotte-christian/` | 0.0093 | 0.0000 |
| every other school page | GOOD | GOOD (0.0000–0.0012) |
| `/compare/` | 0.1602 | 0.1602 (unchanged — follow-up 1) |

The other crested schools improving from 0.0079 to 0.0000 is the same defect, smaller: they
were already two lines at both box widths, so the pop-in shifted only the crest's own row.
Mobile CLS is GOOD on every route. Mobile LCP still reports ~20.7s on cannon/davidson-day
and 12.7s on `/` — the documented artifact in follow-up 3, untouched here.

Browser-verified at rest (real Chrome, 1280×900): Davidson Day, Cannon, Gaston Day,
Charlotte Catholic and Davidson Day `?lang=fa`. Crest renders 156×104 from `nat=1200x800`,
settled header heights match the pre-fix values (277px crested / 238px uncrested), Charlotte
Catholic keeps its single 32px chip row with no blank band, and RTL mirrors correctly.

### Post-deploy observation — a possible second wrap-boundary case

Deployed 2026-08-22 (Pages build `b5a5a86`, 42s, built clean). Measured against the **live**
site, Davidson Day is **CLS 0.0000** with the crest rendering 156×104 from `attr=1200x800`,
so the fix holds in production and not just against local `dist/`.

But **`/school/charlotte-catholic/` threw 0.3492 on one of three production runs** (median
0.0000; 0.0000 on every local run). That page has **no crest**, so it is *not* the defect
fixed here. The likely shape: Charlotte Catholic is the one school whose chip row settles at
a **single** line (8 chips, 941px content in a 1014px box — only 73px of slack), making it
the page where variable real-network timing can still flip the row count. That is the same
wrap-boundary sensitivity, on a different trigger.

Deliberately **not** chased in this pass, per step 6 — one sample, and stacking a second fix
was explicitly out of bounds. Whoever picks it up should reproduce it first over many runs
against the live site; if it is real, the durable fix is the chip row's slack, not another
image. Note it would ALSO have been invisible to the plan's `min-height`, which reserves two
lines for a row that legitimately wants one here.

#### RESOLVED 2026-08-24 — it was real, deterministic, and NOT intermittent

Chased in [`ccwrap.md`](ccwrap.md) (PR pending) and **fixed**. Three corrections to the
reading above, each of which changes what the observation meant:

1. **It is not intermittent.** Measured over 20 live runs against the deployed site
   (`--origin`, added to `check_vitals.mjs` for exactly this), Charlotte Catholic was
   **POOR on 19 of 20** at ~0.3494. The clean 0.0000 is the *outlier*. The original "1 of 3"
   reading was a small-sample artifact — two of those three runs happened to be the rare
   clean one. **`0.3492` was not a spike; it was the normal value.** Controls were clean and
   near-zero-variance (davidson-day 0.0016, cannon 0.0018, both 0/20).
2. **The trigger is the WEBFONT SWAP, not network timing.** Proven by blocking
   `fonts.googleapis.com`/`gstatic.com`: CLS drops 0.3494 → **0.0002**, and the row stays at
   71px. Barlow renders the chip strings ~7% narrower than the Arial-ish fallback, so the row
   is one width before the swap and another after. Desktop-only — mobile is 0/20 at 0.0229,
   because at 390px the row wraps regardless and has no boundary to cross.
3. **The slack figure was backwards.** The note reads "941px content in a 1014px box — 73px
   of slack", describing the *settled* state. The wrap decision is made in the **fallback**
   state, where the same chips measure **1016px against that 1014px box — over by two
   pixels.** So the row laid out as TWO lines, then Barlow shrank it to 941px and it
   collapsed to one: header 238px → 198px, everything below jumped up 39px, one 0.3490 shift.

The fix is the chip row's slack, as predicted — `.school-header-topics` gap 8px → **6px**,
removing 12px from both states so the fallback fits the same single row the settled layout
uses. Every school page is now GOOD (0/3 over threshold); settled geometry is byte-identical
on all eleven pages apart from the expected 2px inter-row gap. A `size-adjust` metric-override
on the body face was tried first and **rejected**: it fixed this page but pushed
carmel-christian, covenant-day, gaston-day and hickory-grove-christian from 0.0022 to ~0.39
by moving *them* onto the boundary.

### Follow-ups unchanged

Compare's CLS (1), the bundle (2) and the mobile-LCP artifact (3) are all as recorded — none
were touched. One new observation for whoever takes (1): `/` now also reports a POOR mobile
LCP (12.7s), which has the same late-candidate shape as (3) and is probably the same artifact.
