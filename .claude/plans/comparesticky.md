---
name: comparesticky
title: Freeze the Compare table's header row (topic + school columns) under the site nav while scrolling
status: implemented
phases: 1
created: 2026-10-05
branch: feat/compare-sticky-header
prs: [334]
---

# Freeze the Compare table header while scrolling

## Goal

On `/compare/`, a reader scrolling down through the Key Stats and Research Coverage rows
loses sight of the table's header row. That row has the topic name in the corner cell
(e.g. *College Support / Research metric*) and each school's badge and name above its
column. Once it scrolls away, a value like `94%` no longer says whose it is or what it
measures.

After this change the header row stays pinned directly under the site's sticky top bar
for as long as any part of the table body is on screen. It also stays aligned with the
columns when the table is scrolled sideways. It works when we can scroll to the bottom of
a College Support table with all 11 schools selected, at desktop and phone widths, and
always see the topic and the school above every column.

## Context

### What the user asked for, and the scope decided

The user asked to "freeze everything on the page up to the row that says key stats".
During planning they were shown that the title, the topic pills, the school pills and
the table header together fill about 65% of a laptop screen, and more than a whole phone
screen. **They chose "Table header only"**: freeze the `<thead>` row only. The title,
subtitle, topic pills and school pills scroll away normally. Do not re-open this.

The thead already holds everything the user wanted to keep visible. The corner cell shows
the active topic (`topicLabel(...)`, [Compare.tsx](../../src/pages/Compare.tsx), the
`<th className="corner">`), and each `<th className="col-school">` shows the school badge
and name.

### Why the existing sticky header does nothing

The CSS already tries to do this
([index.css:2243](../../src/index.css#L2243)):

```css
table.compare thead th { position: sticky; top: 0; z-index: 3; background: var(--bg); vertical-align: bottom; }
```

It has no visible effect. The table sits inside `.table-wrap`
([index.css:2222](../../src/index.css#L2222)), which has `overflow: auto` so the table can
scroll sideways when many schools are selected. Any `overflow` value other than
`visible`/`clip` turns the element into a scroll container **in both axes**, and
`position: sticky` sticks relative to the *nearest scroll container*. That container is
`.table-wrap`, which has no height limit and therefore never scrolls vertically. So the
header is "stuck" inside a box that never moves. This rule has been dead since the
initial commit (`f7326aa4`).

The horizontal sticky does work: `.corner` / `.row-metric` / `.group-label` with
`left: 0` ([index.css:2245](../../src/index.css#L2245),
[2273](../../src/index.css#L2273)). That is the first column staying put during sideways
scroll, and it must keep working.

### Approaches considered

| Approach | Verdict |
|---|---|
| Give `.table-wrap` a `max-height` (≈ viewport − nav) so it scrolls vertically and the existing sticky starts working | **Rejected.** It creates a scroll area inside the page. A wheel or touch gesture scrolls the inner box first and the page only after, which phones handle badly. It also changes how the whole page scrolls, not just the header. |
| `overflow-x: clip` instead of `auto` | **Rejected.** `clip` doesn't create a scroll container, but it also removes horizontal scrolling. With 11 schools selected the table is wider than any laptop. |
| JS moves the real `<thead>` down each scroll frame (`transform: translateY`) | **Rejected.** The header would trail the page scroll by a frame and jitter, especially during iOS momentum scroll. |
| **A second copy of the header outside `.table-wrap`, pinned with native `position: sticky` under the nav, kept in sync with the table's sideways scroll** | **Chosen.** The browser handles vertical pinning natively, so there is no jitter. JS runs only for sideways scroll, column-width sync and show/hide, and none of those happen on every vertical scroll frame. |

### The site nav height is not a constant

`.topnav` ([index.css:196](../../src/index.css#L196), rendered in
[App.tsx:45](../../src/App.tsx#L45)) is `position: sticky; top: 0; z-index: 20`. Its
height depends on the viewport and the locale, because the language trigger and the
brand name change width. Other code hardcodes about 80px (`scroll-margin-top: 80px`, and
`StickySchoolTitle`'s `rootMargin: '-80px …'`). The pinned header needs an exact edge, so
it **measures** the nav (see step 2) rather than assuming 80px. A gap or an overlap of a
few pixels would be visible.

### Things that share these class names (do not break them)

- `src/components/AdmissionsProgram.tsx:173` uses `.table-wrap` with
  `<table className="table adm-table">`, **not** `table.compare`. Any new CSS must be
  scoped to the Compare page (e.g. new class names under `.compare-pin`), never applied
  to bare `.table-wrap`.
- Print CSS ([index.css:2533-2537](../../src/index.css#L2533)) sets the Compare sticky
  cells to `position: static`. The pinned copy must be `display: none` in print, or it
  prints a second header.

## Decisions

- **Header row only. The title and pills scroll away.** The user picked this during
  planning (see Context).
- **Duplicate the header rather than moving the real one.** Pinning is native sticky, so
  there is no scroll jitter (see table above).
- **Extract the thead JSX into one function used by both copies** (`CompareHead`, in
  `Compare.tsx`). Without it, the two copies drift the next time someone edits a header
  cell.
- **The copy is `aria-hidden="true"` and its links are `tabIndex={-1}`.** Screen readers
  and keyboard users already get the real `<thead>` with `scope="col"`. A second header
  would be announced twice. The copy's school links still **work on click** for mouse and
  touch users, because clicking a pinned school name to open its page is the natural
  thing to try.
- **The copy uses a scroll container with `overflow: hidden`, and its `scrollLeft` is set
  from `.table-wrap`'s `scrollLeft`.** It does not use `transform: translateX`. With
  `scrollLeft`, the existing `.corner { position: sticky; left: 0 }` rule keeps the
  corner cell fixed inside the copy with no extra code. A transform would break that.
- **Column widths are copied from the real header with a `ResizeObserver`** into a
  `<colgroup>` on the copy, which uses `table-layout: fixed`. Widths change with the
  font swap (see `compare-cls.md`), locale, selection and window size. Measuring is the
  only reliable way.
- **Show/hide is computed in one rAF-throttled `scroll` + `resize` handler** from
  `getBoundingClientRect()`. Show the copy when the real thead's bottom is above the
  nav's bottom edge **and** the table's bottom is still below the nav's bottom edge plus
  the copy's height. Otherwise hide it, so it never hangs past the last row over the
  footnote. Use `visibility`, not mount/unmount, so it never causes a layout shift.
- **The copy takes up no layout height** (a sticky wrapper with `height: 0`, with the
  copy absolutely positioned inside it). Adding or showing it must not move anything,
  because `/compare/` has a recorded CLS history (`compare-cls.md`). Desktop CLS sits at
  0.1263, accepted. This change must not raise it.
- **z-index: above the table body's sticky cells (≤ 4), below `.topnav` (20).** Use 10.
- **Nav height is measured once and on resize** with a `ResizeObserver` on `.topnav`,
  stored in local state and applied as the copy's `top`. Do not add a global CSS
  variable. Nothing else needs one, and adding it would mean revisiting the other
  hardcoded 80px values, which is out of scope.
- **No phone-specific compact header.** On a phone the pinned row (40px badge + wrapped
  name, about 100–110px) plus the nav (about 60px) takes roughly 170px of a ~700px
  screen. That is acceptable. Shrinking the badge while pinned is a possible follow-up,
  not part of this plan.
- **Single-phase.** It adds no user-facing text. The copy reuses the same strings
  (`topicLabel`, `compare.researchMetric`, school names) as the real header.

## Approvals needed

None. This is a direct user request to change the UI, which the CLAUDE.md UX standard
exempts from the approval gate. It adds no card, row, metric or topic.

## Out of scope

- Freezing the page title, subtitle, topic pills or school pills.
- A compact topic switcher in the pinned bar. This was offered as an option and not
  chosen. It would be a new control and would need its own approval.
- Making the existing rule at [index.css:2243](../../src/index.css#L2243) start working
  by changing `.table-wrap`'s overflow. Rejected above.
- Changing the other hardcoded `80px` nav offsets.
- The Admissions comparison table (`AdmissionsProgram.tsx`), which has no such request.

## Steps

Single-phase. It adds no user-facing text.

1. **Branch.** `git checkout -b feat/compare-sticky-header` from an up-to-date `main`.

2. **Extract `CompareHead` in [src/pages/Compare.tsx](../../src/pages/Compare.tsx).**
   Move the current `<thead>…</thead>` JSX into a local function component that takes
   `{ cols, activeTopic, pinned }`. It uses `useTranslation()` and `useNavigate()` itself,
   as `Compare` does. When `pinned` is true:
   - put `tabIndex={-1}` on each `.col-school-link`;
   - otherwise render identically, with the same classes, so every existing
     `table.compare thead th`, `.corner` and `.col-school*` rule applies to both copies.
   The real table renders `<CompareHead … pinned={false} />` in place of the old JSX.
   Check that the page renders exactly as before at this point.

3. **Add the pinned copy in the same file**, as a sibling **before** `.table-wrap` inside
   `.table-frame`:
   ```tsx
   <div className="compare-pin" style={{ top: navH }} aria-hidden="true">
     <div className={`compare-pin-inner${pinShown ? ' on' : ''}`} ref={pinScrollRef}>
       <table className="compare compare-pin-table" style={{ width: tableW }}>
         <colgroup>{colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}</colgroup>
         <CompareHead cols={cols} activeTopic={activeTopic} pinned />
       </table>
     </div>
   </div>
   ```
   Render it only when `cols.length > 0`, just like the table.

4. **Wire the behaviour in `Compare`**, using `useRef` / `useState` / `useEffect` /
   `useLayoutEffect`. All `window`/`document` access goes **inside effects**, because
   `scripts/prerender.mjs` renders this page at build time.
   - Add refs `wrapRef` (`.table-wrap`), `realTheadRef` (the real `<thead>`; pass it
     through `CompareHead` with `forwardRef` or a `theadRef` prop) and `pinScrollRef`.
   - **Nav height:** in an effect, `document.querySelector('.topnav')`, then use a
     `ResizeObserver` to set `navH` to its `getBoundingClientRect().height`. Disconnect
     on cleanup.
   - **Column widths:** use a `ResizeObserver` on the real `<table>`. On each callback,
     read `realThead.rows[0].cells` → `getBoundingClientRect().width` into `colWidths`,
     and the table's `offsetWidth` into `tableW`. Re-run when `cols`/`activeTopic`
     change, since the effect deps must include the selection. **Read widths with
     `getBoundingClientRect().width`, not `offsetWidth`**, because the cells have
     fractional widths and rounding adds up to a visible drift across 11 columns.
   - **Sideways sync:** add a passive `scroll` listener on `wrapRef` that sets
     `pinScrollRef.current.scrollLeft = wrap.scrollLeft`. Also set it once whenever the
     copy is shown, because the copy may have been hidden while the table was scrolled.
   - **Show/hide:** add a passive `scroll` (window) + `resize` listener, throttled with
     `requestAnimationFrame`. It computes `headBottom = realThead.getBoundingClientRect().bottom`,
     `tableBottom = table.getBoundingClientRect().bottom` and `pinH = realThead.offsetHeight`,
     then `setPinShown(headBottom <= navH && tableBottom > navH + pinH)`. Run it once on
     mount and when `cols`/`activeTopic` change. Only call `setPinShown` when the value
     changes.

5. **CSS in [src/index.css](../../src/index.css)**, placed right after the
   `table.compare` block (about line 2270). Scope everything to `.compare-pin*`:
   ```css
   /* A pinned copy of the Compare header. The real thead's sticky (above) is inert:
      .table-wrap's overflow makes it the scroll container, and it never scrolls
      vertically. This copy sits OUTSIDE that container, so its sticky is relative to
      the page. Zero height, so showing it moves nothing (CLS — see compare-cls). */
   .compare-pin { position: sticky; height: 0; z-index: 10; }
   .compare-pin-inner {
     position: absolute; left: 0; right: 0; top: 0;
     overflow: hidden;            /* a scroll container: .corner's left:0 sticks inside it */
     visibility: hidden;
     border: 1px solid var(--border); border-top: none;
     background: var(--bg);
     box-shadow: 0 6px 12px -8px rgb(0 0 0 / 0.18);
   }
   .compare-pin-inner.on { visibility: visible; }
   .compare-pin-table { table-layout: fixed; min-width: 0; }
   .compare-pin-table thead th { position: static; }   /* keep .corner's left-sticky only */
   .compare-pin-table .corner { position: sticky; left: 0; }
   ```
   Then **check the borders line up**. `.table-wrap` has a 1px border on every side, so
   the copy's left and right edges need the same 1px inset for its column lines to sit
   exactly over the real ones. Adjust `left`/`right` or the border, and verify at 200%
   zoom. Check dark mode: `var(--bg)` and `var(--border)` already switch themes, but
   adjust the shadow if it looks heavy on the dark background.
   Add `.compare-pin { display: none; }` to the `@media print` block next to the
   existing Compare `position: static` rules (about line 2533).

6. **RTL check (`fa`, `ar`).** In RTL the table's columns run right-to-left, and browsers
   report `scrollLeft` as 0 at the start and going negative. Copying `scrollLeft`
   directly from wrap to copy still lines up, because both elements use the same
   convention. Confirm this in the browser (Verification) rather than assuming it.
   The `:root:is([lang='fa'], …) .corner-label` rule at
   [index.css:5418](../../src/index.css#L5418) applies to the copy automatically,
   because the copy uses the same class.

7. **Commit, PR, merge.** Stage only `src/pages/Compare.tsx`, `src/index.css` and
   `.claude/plans/comparesticky.md` / `.claude/plans/INDEX.md`. Check them with
   `git status --short`, and never use `git add -A`. Pass the PR body via `--body-file`.
   Then `gh pr merge --squash --delete-branch`, and `git checkout main && git pull`.
   **Do not run `npm run deploy`.** End with "merged — ready to deploy whenever you want
   it".

## Files touched

| File | Change |
|---|---|
| `src/pages/Compare.tsx` | edit — extract `CompareHead`; add pinned copy + nav-height / column-width / scroll-sync / show-hide effects |
| `src/index.css` | edit — `.compare-pin*` rules; print `display: none` |
| `.claude/plans/comparesticky.md`, `.claude/plans/INDEX.md` | status → Implemented, PR link |

## Verification

- [ ] `npx tsc -b` passes. (Use `tsc -b`, not `--noEmit`; see memory
      `trust-tsc-b-not-tsc-noemit`.)
- [ ] `npm run build` passes. It includes prerender, so this also proves no `window`
      access happens during render.
- [ ] `npm run check:vitals -- --both --runs 5`. `/compare/` CLS must be **no worse than**
      the recorded baseline (desktop ≈ 0.1263, mobile ≈ 0.0636). The copy takes no
      layout space, so any increase means something is wrong.
- [ ] **Real-browser check** (`npm run build && npx vite preview`, Playwright with
      `channel: 'chrome', headless: false`; see memory `headed-chrome-via-playwright`).
      Use `/compare/?topic=college-support&schools=<all 11 comparable slugs>` and check:
  - [ ] At the top of the page the copy is hidden and nothing is duplicated.
  - [ ] Scrolling down: once the real header passes under the nav, the copy appears
        **flush under the nav**, with no gap and no overlap. Measure
        `copy.getBoundingClientRect().top === nav.getBoundingClientRect().bottom`
        (±1px).
  - [ ] Each column line in the copy sits over the matching column line below it
        (within 1px). Compare the `getBoundingClientRect().left` of each copy `th`
        against the real `th`, at 1440px, 1024px and 390px widths.
  - [ ] Scroll the table sideways: the copy's columns move in step, and the corner cell
        (topic name) stays fixed on the left.
  - [ ] Scroll to the end of the table: the copy disappears before it covers the
        footnote (`.table-note`).
  - [ ] Switch topic and toggle a school on and off while scrolled down: the copy shows
        the new topic and columns and stays aligned.
  - [ ] Clicking a school name in the copy opens that school's page. Tab never lands on
        the copy's links.
  - [ ] Dark mode: background, borders and shadow look right.
  - [ ] Repeat the alignment checks in **`?lang=ar`** (RTL) and **`?lang=hi`** (a taller
        line-height for the corner label).
  - [ ] Print preview (`page.emulateMedia({ media: 'print' })`): there is no second
        header.
- [ ] Screenshot desktop and phone widths while scrolled mid-table, and show them to
      the user in the PR / closing report.

## Risks

| Risk | Mitigation |
|---|---|
| The copy's columns drift from the real ones by a few px | Copy widths with `getBoundingClientRect().width` (fractional) + `table-layout: fixed` + `<colgroup>`; check alignment per column in the browser |
| The font swap (Barlow Condensed arriving late) changes widths after the first measurement | The `ResizeObserver` on the real table fires on that reflow and measures again |
| Wrong `top` in a locale with a taller nav | `top` comes from a `ResizeObserver` on `.topnav`, not the 80px constant |
| CLS gets worse on `/compare/` | The copy has zero layout height and only toggles `visibility`; `check:vitals` gate |
| RTL `scrollLeft` sign conventions | Both elements share the same convention; checked in the `ar` browser pass |

## Open questions

- Should the pinned row be shorter on phones (smaller badge, single-line name)? —
  **default:** no; ship the full-size copy and let the user judge from the screenshots.

## Implementation notes

- **Built as planned** (steps 2–5): `CompareHead` extracted, pinned copy outside
  `.table-wrap`, nav height / column widths via `ResizeObserver`, sideways sync via
  `scrollLeft`, rAF-throttled show/hide, zero-height sticky wrapper, print `display: none`.
  The 1px border inset needed no adjustment — the copy's `left/right: 0` + 1px side
  borders put every column line within 0.00px of the real one.
- **Specificity correction.** The plan's `.compare-pin-table thead th { position: static }`
  (0,1,2) loses to `table.compare thead th` (0,1,3); shipped as
  `table.compare-pin-table thead th`.
- **Three pre-existing sideways-scroll defects fixed, at the user's mid-build request**
  ("when I scroll to the right … the research metric should freeze too", with a screenshot
  of Cannon's header cell sliding over *The Arts* corner):
  1. `table.compare thead th { z-index: 3 }` outranked `.corner { z-index: 4 }`, so the
     corner sat level with the school cells and later cells painted over it. Restated as
     `table.compare thead th.corner { z-index: 4 }`.
  2. In RTL (`fa`, `ar`) the first column sits on the right and `left: 0` never engaged, so
     the topic and every metric name scrolled away. `.corner, .row-metric` (and the copy's
     corner) now use `inset-inline-start: 0`.
  3. The *Key Stats* / *Research Coverage* label cell spans the whole row, so its sticky had
     no room to move and it scrolled away in every locale. The text is now wrapped in
     `.group-label-text`, which is what sticks; the cell's `text-align: left` became
     `start` so in RTL the label sits at the reading-start edge.
- **CLS baseline in the plan was stale.** `/compare/` measured desktop 0.1852 / mobile
  0.1616 on the branch — above the plan's 0.1263 / 0.0636 — but an A/B against a `main`
  build on the same machine gave 0.1868 / 0.1616. No regression; the baseline predates
  #333's six added rows.
