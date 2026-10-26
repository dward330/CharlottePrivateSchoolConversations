---
name: globalcellsize
title: Global Exposure Compare — shrink the coloured value on the two word-valued rows so phrases stop looking bigger than figures
status: implemented
phases: 1
created: 2026-10-26
branch: fix/globalcellsize
prs: [379]
---

# Global Exposure Compare: smaller coloured values on word rows

## Goal

On `/compare/?topic=international-travel`, the coloured value in each cell looks bigger on
some rows than others. The user asked to make the coloured words consistent. After this
change, the two rows whose values are **phrases**, *Youngest division that travels abroad*
(`Middle School`, `Upper School`) and *Global diploma or certificate* (`Global Studies
Diploma Distinction`, …), render their coloured value at **20px**. The three **number**
rows (*Trips abroad*, *Trips with a host-family stay*, *Countries reached*) keep the
existing **26px**. Every other Compare topic is unchanged.

It worked when, in real Chrome, every `.mark-val` in those two rows computes to `20px` and
every other `.mark-val` on every topic still computes to `26px`.

## Context

**Measured at planning time (real Chrome, 1400px and 390px wide): every `.mark-val` on
this topic already computes to exactly `26px`.** There is no CSS size difference. The
discrepancy the user sees is visual weight: a 26px `Global Studies Diploma Distinction`
carries many times the ink of a 26px `7`, so the word rows *read* as larger. The user was
shown this and chose **"shrink the word rows only"**, accepting that words and numbers end
up at deliberately different sizes. Two other options were declined: one smaller size for
every row, and shrinking word values on every topic.

- **The size rule** is `.mark-val` in `src/index.css` (~line 2425):
  `font-family: var(--heading); font-weight: 600; font-size: 26px; line-height: 1; color:
  var(--brand); white-space: nowrap;`. It is shared by every Compare topic, so it must not
  change.
- **The cell markup** is in `src/pages/Compare.tsx` (~lines 547-606). Each value cell is
  `<td className={v != null ? \`cell val${lead ? ' lead' : ''}\` : 'cell no'} …>`. Inside
  it, `.mark-val` comes from one of three paths: the NC-admit `TopLayerTip` (~567),
  `CellQual` (`src/components/CellQual.tsx:29`), or a plain span (~598). All Global Exposure
  cells go through `CellQual`, because every filled cell has a `quals` entry. A class on
  the **`<td>`** reaches all three paths without touching `CellQual`.
- **The rows** are the five `topic: 'international-travel'` entries at the end of
  `VALUE_METRICS` in `src/data/metricValues.ts` (~lines 1973-2240). The two word rows are
  `key: 'travel-youngest-division'` and `key: 'travel-credential'`. Both already carry
  `noLead: true` and `compareOnly: true`.
- **The `ValueMetric` type** (`src/data/metricValues.ts` ~line 33) already holds
  display-only boolean flags with JSDoc (`noLead`, `lowerIsBetter`, `compareOnly`). A new
  flag beside them follows that pattern.
- **Scripts that read these rows** are all safe with a new optional boolean.
  `check_travel_compare_rows.mjs` asserts `compareOnly`, school keys and cell values, not
  the full key set. `gen_data_schema.mjs:765` reads `noLead` only. The i18n extractor
  (`metric-values` in `scripts/i18n_topics.mjs`) extracts strings, and adding a property
  shifts no `[N]` overlay path because no row moves.
- **Other topics with word values** exist (Student Clubs `Model UN — 6 awards`, The Arts
  `40+ electives`, Summer Programs `rising K–8`). They are out of scope by the user's
  choice. The flag is per-row, so a later plan can opt any of them in with one line.

## Decisions

- **Per-row opt-in flag `textValues?: boolean` on `ValueMetric`**, rather than detecting
  words at render. The user wants exactly these two rows changed. A regex on the value
  would also catch `22 AP subjects` and the Clubs/Arts rows, and would flip if a value
  were rewritten.
- **The class goes on the `<td>` (`val-text`), and the CSS is `.cell.val-text .mark-val`.**
  This covers the `CellQual`, tooltip and plain paths in one rule, and leaves `CellQual`
  untouched.
- **20px.** It is clearly smaller than the 26px figures and still larger than the 17px row
  label (`.row-metric-label`), so the value stays the cell's headline. At 20px the longest
  value, `Global Studies Diploma Distinction`, fits on one line in a column without forcing
  extra width. Keep `white-space: nowrap`.
- **The `.mark-sub` line (14px grey) is unchanged.**
- **Single-phase.** The plan adds no user-facing text.

## Approvals needed

None. This is a direct user request to restyle an existing row. It adds no card, row,
metric key or topic.

## Out of scope

- Every other Compare topic, including word values on Clubs, Arts and Summer Programs.
- The three number rows. They stay 26px.
- `.mark-sub`, row labels, notes, tooltips and the pinned header copy (`.compare-pin*`).
  The pinned copy holds only `thead`, so it renders no value cells.

## Steps

Single-phase: the plan adds no user-facing text.

1. **Branch.** Run `git checkout main && git pull`, then `git checkout -b fix/globalcellsize`.
2. **Add the flag to the type.** In `src/data/metricValues.ts`, add the following to
   `export type ValueMetric` beside `noLead` / `lowerIsBetter`:
   ```ts
   /**
    * Render this row's coloured values at a smaller size than a figure.
    *
    * For a row whose values are PHRASES ('Middle School', 'Global Studies
    * Diploma Distinction') rather than numbers. At the figure size a phrase
    * carries far more ink than a '7' and reads as a larger font. Display only;
    * the leader tint and every checker are unaffected.
    */
   textValues?: boolean
   ```
3. **Set it on the two word rows.** In the same file, add `textValues: true,` after
   `noLead: true,` in the `travel-youngest-division` row and in the `travel-credential`
   row. Change nothing else in either row, and move no rows.
4. **Put the class on the cell.** In `src/pages/Compare.tsx`, in the value-row `<td>`
   (~line 555), change the className to
   `v != null ? \`cell val${lead ? ' lead' : ''}${vm.textValues ? ' val-text' : ''}\` : 'cell no'`.
   An N/A cell keeps `cell no`.
5. **Add the CSS.** In `src/index.css`, directly after the `.mark-val { … }` block
   (~line 2432), add:
   ```css
   /* A row of phrases (metricValues `textValues`) — at 26px a phrase outweighs a
      figure and reads as a bigger font, so it steps down a size. */
   .cell.val-text .mark-val { font-size: 20px; }
   ```
   The `.qual .mark-val` underline and the dark-mode colour rules (~lines 154, 162) need
   no change. They do not set a size.
6. **Commit, PR, merge.** Stage only the three app files and the two plan files: run `git status --short` first, then
   `git add src/data/metricValues.ts src/pages/Compare.tsx src/index.css .claude/plans/globalcellsize.md .claude/plans/INDEX.md`.
   Open the PR with `--body-file` and squash-merge it. Flip the INDEX row to *Implemented*
   with the PR link, then check out `main` and pull. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | edit: add `textValues?` to `ValueMetric`, set it on 2 rows |
| `src/pages/Compare.tsx` | edit: add the `val-text` class on value cells of flagged rows |
| `src/index.css` | edit: add one rule, `.cell.val-text .mark-val { font-size: 20px; }` |

## Verification

- [ ] `npx tsc -b`: clean. Use `tsc -b` here, not `--noEmit` (see memory
      `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run check:travelrows`: passes, with all five rows still last and the cells
      unchanged.
- [ ] `npm run build`: succeeds. It chains `check:schema`, `check:live`, `check:runtime`
      and others. `DATA-SCHEMA.md` should not change. If `check:schema` reports drift, run
      `npm run schema` and include the result.
- [ ] **Browser check (required, real Chrome).** Run `npx vite`, open
      `/compare/?topic=international-travel&schools=cannon,charlotte-christian,charlotte-country-day,charlotte-latin,davidson-day,providence-day`,
      and with Playwright read `getComputedStyle(el).fontSize` for every `.value-row .mark-val`:
      - Rows *Youngest division that travels abroad* and *Global diploma or certificate*:
        every value is `20px`.
      - Rows *Trips abroad*, *Trips with a host-family stay* and *Countries reached by
        trips*: every value is `26px`.
      - Spot-check one other topic (`?topic=student-clubs`): every `.mark-val` is `26px`.
      - The tooltip still opens on hover over a 20px value, and the dotted underline sits
        under it.
      - At 390px wide, the table scrolls sideways as before and no value is clipped.
- [ ] Optional: `npm run build && npx vite preview`, then `npm run audit:mobile`. This
      should be clean, because the change only narrows text.

## Risks

| Risk | Mitigation |
|---|---|
| The user wanted a different size than 20px | It is one CSS value. Adjust it in review before merging if asked |
| A future word-valued row on another topic still looks large | It opts in with `textValues: true`. The JSDoc says when to use it |

## Implementation notes

- **`DATA-SCHEMA.md` did change**, contrary to the Verification expectation: the generator
  lists every `ValueMetric` field, so `textValues` added one row to that table. It was
  regenerated with `npm run schema` and committed, as the fallback in Verification allows.
- Otherwise built as planned. In the browser check at 1400px and 390px, both word rows are
  20px, the number rows are 26px, and `student-clubs` and `college-support` are 26px
  throughout. The tooltip and its underline are intact and nothing is clipped.
