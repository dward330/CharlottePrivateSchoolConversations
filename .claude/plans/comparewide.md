---
name: comparewide
title: Compare page widens on wide screens to show more school columns, keeping proportional side margins
status: in-progress
phases: 1
created: 2026-11-07
branch: feat/compare-wide
prs: []
---

# Compare page widens on wide screens

## Goal

On a wide monitor or a TV, the Compare page stops at the site-wide 1240px width, so a
reader who selects all 11 schools still has to scroll the table sideways while a third
of the screen stays blank. This plan lets **the Compare page only** grow past 1240px on
wide viewports, as far as the table's columns need and no further. Its left and right
margins stay a fixed share of the screen, the same share a 1440px laptop shows today.
It worked if layouts at or below ~1440px are pixel-identical to today, and if at 1920px
and above all selected columns fit without a sideways scroll, with equal margins on both
sides.

## Context

- **Width cap.** `.page` in `src/index.css` (~line 480) is
  `max-width: var(--maxw); margin: 0 auto; padding: clamp(18px,4vw,40px) clamp(14px,4vw,28px) 64px`,
  and `--maxw: 1240px` is set on `:root` (~line 69). `.page.home` overrides the cap to 1160px
  (~line 618), so a per-page modifier class has a precedent. Print resets
  `.page { padding-bottom: 0; max-width: none; }` (~line 2771).
- **Compare markup.** `src/pages/Compare.tsx` renders `<div className="page">` (~line 435).
  Its children are, in order: `a.back`, `h1.compare-title`, `p.compare-sub`, `div.controls`
  (two fieldsets of `.pill-row`, flex-wrap, plus `p.control-hint`), then either
  `p.empty` or `div.table-frame` (holding `.compare-pin` and `.table-wrap.compare-pan` >
  `table.compare`), then `p.table-note` footnotes.
- **Table sizing.** `table.compare { width: 100%; min-width: max-content }`, with the
  metric column (`.corner, .row-metric`) at 200–260px and each school column at least
  118px (`.col-school`). With the default 6 schools (`COMPARE_DEFAULT_SCHOOLS` in
  `src/lib/metrics.ts`) the table fits in 1240px and stretches. With all 11 comparable
  schools it is wider than 1240px and scrolls inside `.table-wrap` (`overflow: auto`).
- **Things that already adapt to width, so they need no change:**
  - the pinned header copy (`.compare-pin`, plan `comparesticky`), whose `colWidths` and
    `tableW` are re-measured by a `ResizeObserver` on the table;
  - drag-to-pan (`src/lib/useDragPan.ts`, plan `comparedrag`), which toggles `.can-pan`
    only while the wrapper overflows, so it switches itself off once the table fits.
- **Margin ratio.** At a 1440px viewport today the page's side margin outside the
  1240px box is (1440 − 1240) / 2 = 100px, or about 7% of the viewport per side, so the
  content box is about 86% of the viewport. Above 1440px, keeping that ratio means
  `max-width: 86vw`. At 1442px, 86vw is 1240px, so the change does not jump.

## Decisions

- **Plain CSS: the page shrink-wraps the table, with limits on both sides.** Add a
  `compare-page` modifier and give it
  `width: fit-content; min-width: min(100%, var(--maxw)); max-width: max(var(--maxw), 86vw)`.
  The page sizes itself to the table's natural width. It is never narrower than today's
  1240px when the screen allows it, and never wider than 86% of the viewport.
  `margin: 0 auto` (already on `.page`) centres it, so both margins are always equal.
  This is "expand when it makes sense": a 3-school selection keeps today's 1240px page
  instead of stretching three columns across a TV. Chosen over a JS measurement because
  the browser already knows the table's max-content width. Measuring it in
  `Compare.tsx` would add a layout pass and a CLS risk (see `compare-cls`).
- **The text blocks must not drive the width.** `width: fit-content` uses the widest
  child's max-content width. The school `.pill-row` laid out on one line (13 pills,
  roughly 1,900px) and the longer `.table-note` lines would otherwise widen the page even
  with only 3 schools selected. Put `contain: inline-size` on the page's non-table
  children: `.compare-page > :not(.table-frame)`. They then add no intrinsic width and
  fill whatever width the table sets. Their wrapping is unchanged at ≤1440px. Supported
  in Chrome 105+, Safari 15.4+ and Firefox 101+.
- **Use `86vw`, kept in one custom property** (`--compare-maxw-fluid: 86vw`) with a
  comment giving the derivation above, so the ratio can be retuned in one place.
- **No absolute upper cap.** The table's own max-content width is the cap. Even 11
  schools at a 3840px 4K TV stop at the table's natural width, centred.
- **Compare only.** School pages, Home and the checklist keep `--maxw`. This was the
  user's explicit scope.
- **The phone and tablet layout is untouched by construction.** Below 1240px,
  `min(100%, 1240px)` = 100%, and `fit-content` is clamped to the available width, so
  the page fills the viewport as it does today.
- **Print resets the new properties** (`width: auto; min-width: 0`) next to the existing
  `.page { max-width: none }` rule, so printing follows the current print path.
- Single-phase: the change adds no user-facing text, only CSS and one className.

## Approvals needed

None. This is a direct user request to change the layout (the CLAUDE.md UX-design gate
covers ingestion only). It adds no card, row, metric or text.

## Out of scope

- Any other page's width, and the global `--maxw`.
- Column widths, cell padding, fonts and the pinned-header behaviour.
- Changing which schools are selected by default.
- The nav and footer. They already run edge to edge with their own padding.

## Steps

Single-phase — adds no user-facing text.

1. **Branch.** `git checkout -b feat/compare-wide` from an up-to-date `main`.
2. **Modifier class** — in `src/pages/Compare.tsx` (~line 435), change
   `<div className="page">` to `<div className="page compare-page">`. Check that no other
   early-return branch of the component renders its own `.page` wrapper. If one does,
   give it the class too.
3. **CSS** — in `src/index.css`, in the `/* --- compare */` block (~line 2261), add:
   ```css
   /* Wide screens (plan comparewide): the Compare page grows past --maxw to fit the
      table's columns, and no further. Its margins keep the ratio a 1440px laptop
      shows today, (1440 − 1240) / 2 ≈ 7% per side, so the box is 86vw. At ≤1442px
      this resolves to exactly today's layout. fit-content sizes the page to the
      table, and contain keeps the pill rows and notes from widening it. */
   .page.compare-page {
     --compare-maxw-fluid: 86vw;
     width: fit-content;
     min-width: min(100%, var(--maxw));
     max-width: max(var(--maxw), var(--compare-maxw-fluid));
   }
   .compare-page > :not(.table-frame) { contain: inline-size; }
   ```
   Check that `.page`'s `box-sizing` is `border-box`, via the global reset near the top
   of `index.css`. If it is not, `min-width`/`max-width` also need to account for the
   inline padding.
4. **Print reset** — in the `@media print` block, next to
   `.page { padding-bottom: 0; max-width: none; }` (~line 2771), add
   `.page.compare-page { width: auto; min-width: 0; }`.
5. **Commit and PR** — stage only `src/pages/Compare.tsx`, `src/index.css`,
   `.claude/plans/comparewide.md` and `.claude/plans/INDEX.md` (check with
   `git status --short` first, and never use `git add -A`). Open the PR with
   `--body-file`, merge with `gh pr merge --squash --delete-branch`, then check out
   `main` and pull. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/pages/Compare.tsx` | edit — add `compare-page` class to the page wrapper |
| `src/index.css` | edit — wide-screen rule + `contain` on non-table children + print reset |
| `.claude/plans/INDEX.md` | edit — flip row to Implemented with PR link |

## Verification

- [ ] `npx tsc -b`: clean.
- [ ] `npm run build`: succeeds, with every chained check green.
- [ ] **Browser check** (`npm run build && npx vite preview`, then Playwright in real
      Chrome; see memory `headed-chrome-via-playwright`). For each viewport width
      **1280, 1440, 1920, 2560 and 3840** (height 1000), on `/compare/` with (a) the
      default 6 schools, (b) all schools selected and (c) 2 schools selected, record
      `.compare-page` `getBoundingClientRect()` left/width,
      `.table-wrap` `scrollWidth − clientWidth`, and
      `document.documentElement.scrollWidth`. Pass if:
  - at 1280 and 1440, the page width matches `main` for all three selections (run the
    same script on `main` first and compare; the expected value is
    `min(viewport, 1240)`);
  - at 1920 and above with all schools, the `.table-wrap` overflow is 0 (no sideways
    scroll) when the table's natural width ≤ 86vw, and `.can-pan` is absent;
  - left margin = right margin (±1px) in every case;
  - with 2 schools at 2560, the page width is 1240 (not 86vw);
  - `documentElement.scrollWidth` never exceeds the viewport.
- [ ] Scroll down with all schools at 1920: the pinned header copy appears and its
      columns line up with the table (no drift), and topic pills still wrap normally.
- [ ] Repeat the 1920/all-schools check in `?lang=fa` (RTL): the page is centred and
      the metric column stays pinned on the right.
- [ ] `npm run audit:mobile`: no new findings (the phone widths should be unaffected).
- [ ] `npm run check:vitals -- --route /compare/`: CLS no worse than `main`.

## Risks

| Risk | Mitigation |
|---|---|
| A child not covered by the `contain` selector (e.g. a new note later) widens the page on small selections | The selector excludes only `.table-frame`, so any new sibling is contained automatically |
| `fit-content` with an `overflow: auto` child behaves differently in Safari | Check one wide viewport in Safari/WebKit (Playwright `webkit`) if available; the min/max bounds still cap the worst case at today's layout or 86vw |
| `contain: inline-size` collapses a child that has no definite width source | Every contained child is block-level in a parent whose width the table sets, so it fills that width; the browser check covers the pills and notes visually |
| Pinned header misaligns after the width change | It is already driven by a ResizeObserver on the table; covered by the scroll check |

## Open questions

- Is 86vw (calibrated on a 1440px laptop) the margin the user likes? **Default:** ship
  86vw. It is one custom property to retune after they see it on their screen.
