---
name: vitals
title: Fix the Davidson Day desktop CLS (0.35) — a webfont reflow, not the mount path
status: in-progress
phases: 1
created: 2026-08-06
revised: 2026-08-22
branch: perf/vitals-cls
prs: [110]
---

# Fix the Davidson Day desktop CLS

## Goal

`/school/davidson-day/` measures **CLS 0.3496 on desktop** — 3.5× the 0.1 threshold and
the worst Core Web Vital on the site. Every other route is GOOD. The cause is now traced
by experiment to the **Google Fonts stylesheet** swapping metrics under the header's topic
chip row, which re-wraps from one line to two and pushes the whole page down 39px.

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
