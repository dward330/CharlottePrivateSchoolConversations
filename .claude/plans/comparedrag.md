---
name: comparedrag
title: Drag-to-pan on the Compare table — a grab cursor on non-interactive areas, and click-and-drag scrolls the table sideways
status: implemented
phases: 1
created: 2026-10-26
branch: feat/comparedrag
prs: [377]
---

# Drag-to-pan on the Compare table

## Goal

On `/compare/`, the table scrolls sideways inside its frame once more schools are selected
than fit. Today a mouse user has to find the scrollbar or use shift+wheel. After this
change, hovering any **non-interactive** part of the table shows an open-hand cursor
(`grab`). Pressing and holding the mouse button turns it into a closed hand (`grabbing`),
and moving the mouse left/right pans the table with it. Releasing ends the pan. Tooltip
cells, school-name links and every other interactive element keep their own cursor and
behaviour.

It worked when, in real Chrome at desktop width with all 11 schools selected, a drag on a
plain cell scrolls the table, a click on a school name still opens it, a drag that ends on
a school name does **not** open it, every tooltip still opens on hover, and nothing changes
on a phone or with touch.

## Context

- **The scroll container** is `<div className="table-wrap" ref={wrapRef} …>` in
  `src/pages/Compare.tsx` (~line 492), `overflow: auto` in `src/index.css` (~line 2293).
  **`.table-wrap` is shared**: `src/components/AdmissionsProgram.tsx:173` uses the same
  class on school pages, and `src/lib/useScrollEdges.ts` lists it in `WRAPPERS`. Any CSS
  must therefore be scoped to a NEW class added only on Compare's wrapper, never to bare
  `.table-wrap`. The same file's own comment at ~line 2348 already records this rule for
  `.compare-pin*`.
- **The pinned header copy.** `.compare-pin` / `.compare-pin-inner` (`Compare.tsx`
  ~lines 482-490; CSS ~2353-2365) is a second, `overflow: hidden` copy of the header that
  stays under the nav. A `scroll` listener on `wrapRef` mirrors `wrap.scrollLeft` into it
  (`Compare.tsx` ~lines 379-389). **Setting `wrap.scrollLeft` programmatically fires that
  `scroll` event, so the pinned copy follows a drag with no extra code.** The copy is
  `aria-hidden`, and its school links are clickable with the mouse (`CompareHead`
  `pinned` prop).
- **Interactive things inside the table**, all of which must NOT start a pan:
  - school-name links: `<a className="col-school-link">` in `CompareHead` (both copies);
  - tooltip triggers: `TopLayerTip` (`src/components/TopLayerTip.tsx`) renders a
    `<button className="qual">` (cell tooltips via `CellQual`, NC row-header tips as
    `"qual row-tip"`, NC cell tips). They open on `pointerenter` / focus;
  - the popovers themselves (`.tip`, `popover="manual"`) render in the top layer, outside
    `.table-wrap`'s box. A `pointerdown` inside an open popover will not reach the wrapper,
    but guard on `.tip` anyway.
- **Non-interactive areas that SHOULD pan:** plain value cells (`.mark-val` with no tooltip,
  `.mark-sub`), n/a cells (`.mark-na`, which carries a native `title`; that is a browser
  hint, not one of our tooltips, and is fine to pan over), research-coverage check cells,
  row headers (`th.row-metric`, unless it holds a `.qual`), the corner cell, and the group
  label rows.
- **RTL.** In `fa`/`ar` the wrapper starts at its right edge and `scrollLeft` runs
  0 → negative (see `useScrollEdges.ts` header). The pan formula
  `wrap.scrollLeft = startScrollLeft - (e.clientX - startX)` is correct in both
  directions without special-casing: in each, dragging the mouse right reveals content to
  the left. Verify it in `ar` rather than assume.
- **No existing drag code** anywhere in `src/` (no `pointerdown` / `setPointerCapture`).
  The nearest hook precedent is `src/lib/useScrollEdges.ts`: a small `useX(ref)` hook in
  `src/lib/`, attaching listeners in a `useEffect` and cleaning up. Follow its shape and
  header-comment style.

## Decisions

- **A hook `useDragPan(ref)` in `src/lib/useDragPan.ts`**, called once from `Compare`
  with `wrapRef`. It uses native listeners, not React `onPointer*` props. This matches
  `useScrollEdges` and keeps the drag logic out of the 600-line component.
- **Mouse only:** act only when `e.pointerType === 'mouse'` and `e.button === 0`. Touch
  and pen already scroll natively (`-webkit-overflow-scrolling: touch`), and stealing
  touch gestures would break vertical page scrolling on phones.
- **Pan is offered only when the table actually overflows.** The hook toggles a class
  `can-pan` on the wrapper when `scrollWidth - clientWidth > 1`, re-measured by a
  `ResizeObserver` on the wrapper **and** its first child (the `<table>`; the wrapper's
  size need not change when the table widens, the same trick `useScrollEdges` uses). No
  grab cursor appears when there is nothing to scroll.
- **Interactive-target test:** a pan starts only if
  `!(e.target as Element).closest('a, button, input, select, textarea, summary, label, [role="button"], .qual, .tip')`.
  One selector constant, named `INTERACTIVE`, with a comment.
- **5px threshold** before a press becomes a drag: `Math.abs(dx) >= 5`. Below that it
  is still a click.
- **Click suppression after a drag:** if a drag happened, swallow the very next `click`
  on the wrapper in the **capture** phase (`preventDefault` + `stopPropagation`, a
  one-shot listener, also cleared on the next `pointerdown`). That stops a drag ending
  over a school name from navigating. It is a safety net: a drag cannot *start* on a link,
  but it can *end* on one.
- **Pointer capture:** `wrap.setPointerCapture(e.pointerId)` once the threshold is crossed,
  so the pan keeps tracking when the mouse leaves the table. End on `pointerup`,
  `pointercancel` and `lostpointercapture`.
- **Text selection:** the user accepted (2026-10-26) that dragging across table text pans
  instead of selecting. Implement it as `user-select: none` on `.compare-pan.can-pan`
  (cursor area only), plus `e.preventDefault()` on the qualifying `pointerdown`. Never
  apply it to the whole page or to the Admissions table.
- **CSS classes:** add `compare-pan` to Compare's wrapper `className`
  (`"table-wrap compare-pan"`). Rules:
  `.compare-pan.can-pan { cursor: grab; user-select: none; }`,
  `.compare-pan.is-panning, .compare-pan.is-panning * { cursor: grabbing; }`, and
  `.compare-pan.can-pan :is(a, button, .qual) { cursor: pointer; }` so links and tooltip
  triggers do not inherit `grab`. Check each trigger's current cursor first and keep it if
  it is already set (e.g. `cursor: help`). Place the rules next to the `.table-wrap` block
  in `src/index.css`, with a comment naming this plan and the shared-class trap.
- **The pinned header copy does not get its own pan.** It is `overflow: hidden`, and its
  cells are mostly links. Dragging on the real table already moves it. Keeping it out
  avoids a second, `aria-hidden` drag surface.
- **No `scroll-behavior: smooth`** during a pan (direct assignment), and no momentum or
  inertia. Plain 1:1 tracking is what was asked for.
- **Separate branch from `feat/globalcompare`**, built after that plan merges.

## Approvals needed

None. This is a UI change the user asked for directly (2026-10-26: hand cursor on
non-tooltip areas, grab-and-drag to scroll left/right), and under the UX-design standard a
direct request is its own approval. It adds no card, row, section or metric. No deploy.

## Out of scope

- Drag-to-pan on any other sideways-scroll table (school-page ledgers, the Admissions
  table, After School / Summer tables).
- Vertical panning, inertia/momentum, and keyboard changes (the wrapper is already
  `tabIndex={0}` and arrow-key scrollable).
- Edge fades or scroll hints on Compare.

## Steps

Single-phase. It adds no user-facing text: no locale keys, and no overlay changes.

0. **Start from merged `main`.** This plan is meant to run after `globalcompare` merges.
   `git checkout main && git pull`. If `.claude/plans/INDEX.md` on `main` lacks the
   `globalcompare` row as Implemented, tell the user and ask before continuing. Then
   `git checkout -b feat/comparedrag`. This plan file and its INDEX row may be
   uncommitted in the working tree; commit them on this branch.

1. **Write `src/lib/useDragPan.ts`.** Export `useDragPan(ref: RefObject<HTMLElement | null>)`.
   It needs a header comment in the `useScrollEdges.ts` style: what it does, mouse-only,
   why click suppression exists, the RTL note. Inside one `useEffect` (deps `[ref]`; the
   wrapper only mounts when `cols.length > 0`, so also take a second `enabled: boolean`
   argument and pass `hasCols`, the same dependency the sync effect already uses):
   - `measure()` toggles `can-pan`; a `ResizeObserver` on `el` and `el.firstElementChild`
     calls it.
   - `pointerdown`: bail unless mouse, button 0, `can-pan`, and target not
     `INTERACTIVE`. Record `startX`, `startLeft = el.scrollLeft`, `pointerId`. Set
     `dragged = false`, and call `e.preventDefault()`.
   - `pointermove` (only while pressed): `dx = e.clientX - startX`. When `|dx| >= 5` for
     the first time, set `dragged = true`, add `is-panning` and `setPointerCapture`.
     While dragged, `el.scrollLeft = startLeft - dx`.
   - `pointerup` / `pointercancel` / `lostpointercapture`: remove `is-panning` and release
     capture if held. If `dragged`, arm a one-shot capture-phase `click` swallower on
     `el`, and also clear it with `setTimeout(…, 0)` so a drag that ends off-element does
     not eat a later unrelated click.
   - Cleanup removes every listener, disconnects the observer and strips both classes.

2. **Wire it into `src/pages/Compare.tsx`.** Import `useDragPan` from
   `'../lib/useDragPan.ts'` (the repo imports with the `.ts` extension; check a
   neighbouring import). Call `useDragPan(wrapRef, hasCols)` beside the other wrapper
   effects (~line 389). Change the wrapper to `className="table-wrap compare-pan"`.
   Add one comment line pointing to the hook.

3. **Add the CSS** in `src/index.css` beside the `.table-wrap` block (~line 2299), as in
   Decisions. Keep it scoped to `.compare-pan`.

4. **Verify** (below), then commit with explicit paths only (`git status --short` first:
   `source-material/learning-support/providence-day/` and anything else unrelated stays
   unstaged), push, open the PR with `--body-file`, squash-merge, and pull `main`. Flip
   this plan and its INDEX row to Implemented. **Do not deploy.**

## Verification

- [ ] `npx tsc -b`: clean
- [ ] `npm run build`: succeeds (the full chained check suite)
- [ ] **Real Chrome via Playwright** (`npm run build && npx vite preview`; launch
  `channel: 'chrome', headless: false`; the driver script must live inside the project tree
  and be deleted after; don't wait on `networkidle`). Use
  `/compare/?topic=college-support` with all 11 schools at 1280×900:
  - computed `cursor` is `grab` on a plain value cell, on a `.mark-na` cell and on a row
    header, and **not** `grab` on a `.col-school-link` or a `.qual` button;
  - `page.mouse.down()` on a plain cell, then move −300px in steps, then `up()`:
    `wrap.scrollLeft` grew by ~300, the cursor read `grabbing` mid-drag, the pinned
    header copy's `scrollLeft` matches the wrapper's, and `getSelection().toString()` is
    empty;
  - a **drag that ends over a school-name link** leaves the URL unchanged, and a plain
    click on the same link (no movement) navigates to the school page;
  - hovering a `.qual` cell still opens its popover. A `mouse.down()` on a `.qual` and a
    move does **not** scroll;
  - a 3px wiggle-click on a plain cell does not scroll and is not swallowed;
  - releasing the mouse **outside** the table ends the pan (the `is-panning` class is gone);
  - with only 2 schools selected (no overflow) there is no `can-pan` class and no grab
    cursor;
  - `?lang=ar`: dragging the mouse right reveals the columns to the left, and the pan
    tracks 1:1.
- [ ] **Touch is untouched:** a Playwright context with `hasTouch: true, isMobile: true`
  at 360px, swiping the table, still scrolls it natively. Then `npm run audit:mobile`
  passes.
- [ ] **No leak to school pages:** on `/school/providence-day/`, the Admissions table's
  `.table-wrap` has no `can-pan` class and a default cursor.

## Implementation notes

- The plan's single rule `:is(a, button, .qual) { cursor: pointer }` would have overridden `.qual`'s
  existing `cursor: help`. It was split into `:is(a, button) { cursor: pointer }` and
  `.qual { cursor: help }`, following the plan's own "keep an existing cursor" instruction.
- `pointermove` also ends the press when no button is held (`(e.buttons & 1) === 0`). A
  sub-threshold press released outside the table has no pointer capture yet, so its `pointerup`
  never reaches the wrapper.
- On College Support, every value cell in the middle columns holds a `.qual` button. Those cells
  still pan from their padding, and the link-release test grabbed there.
