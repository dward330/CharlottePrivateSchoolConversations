---
name: cupbest
title: Compare › Sports — a "Best Wells Fargo Cup finish" row, with the season beneath
status: english-done
phases: 2
created: 2026-11-07
branch: feat/cupbest
prs: []
---

# Compare › Sports — "Best Wells Fargo Cup finish, 2020–21 to 2025–26"

## Goal

The user asked on 2026-11-07, directly in conversation, for a Compare-page row right after the two
Wells Fargo Cup rows, holding each school's **best finish across the tracked seasons**, with **the
season it happened** beneath the place. That request is the UX approval (CLAUDE.md, UX-design
standard). It is Compare only: the school-page Cup card already states its best finish in its
headline.

## Decisions (made while building, recorded for Phase 2 and later seasons)

- **Rule = the card's own rule.** `headlineStats(slug).bestFinish` in `src/lib/wellsFargoCup.ts`:
  the lowest place number, and **the most recent season on a tie**. Re-using it means the Compare
  cell and the school-page headline cannot disagree.
- **Value:** the ordinal alone (`1st`, `14th`, with `T` for a marked tie), with **no `of N`**,
  because `CUP_FIELD_SIZES` holds today's division sizes, not past seasons'.
- **Sub:** the season only (`2023–24`), as the user asked.
- **Tooltip (`quals`, kind `scope`):** `<points> points, in <association> <class>.` then every
  other season at the same place (`Also won in …` / `Also 2nd in …` / `Also tied for 14th in …`),
  then `The school moved to <division> in <season>.` when the best came in a different division
  (Davidson Day, 2A → 3A). Charlotte Catholic's NCHSAA tip carries the same cross-association
  caveat as `cup-finish`.
- `compareOnly`, `noLead`, `textValues`, `rowTip: 'cup'`, like its two siblings. It is appended
  **last** in `VALUE_METRICS` (overlays are keyed by index), after `cup-titles`.
- Left out of the coverage floor (`FLOOR_EXCLUDED_KEYS`), like the other Cup rows.

## Files touched (Phase 1, English)

| File | Change |
|---|---|
| `src/data/metricValues.ts` | new `cup-best` row, every cell generated from the ledger |
| `scripts/check_cup_ledger.mjs` | `check:cup` re-derives every `cup-best` value, sub and tooltip lead; three tail rows |
| `scripts/check_travel_compare_rows.mjs` | `TAIL_KEYS` gains `cup-best` |
| `scripts/coverage_floor.mjs` | `FLOOR_EXCLUDED_KEYS` gains `cup-best` |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | "Three Compare rows read the ledger" |
| `CLAUDE.md`, `.claude/SKILLS.md`, `.claude/skills/wells-fargo-cup/SKILL.md` | two → three Cup rows |

No new chrome keys: the row-header tip reuses `compare.cupTipKind`, `sports.cup.what1` / `what3`.

## Phase 2 — Every other locale

**Research prose only**: the `metric-values` overlay per `PROSE_TRANSLATED`
(`es bn ht te fr fa it hi ar`). **No `src/locales` work.** Follow exactly the method of
`cupcompare.md` § Phase 2 step 1–2 (read it). In short:

1. Extract, then translate the new `cup-best` units in each
   `src/data/overlays/work/metric-values.<lang>.json` (only `t: ''`, found by stamp, never by
   position): the label, the note, 11 values, 11 subs and 11 tooltips.
   - Ordinals use the locale's own Cup form from `sports.cup.place_ordinal_*` (es `1.º`, fr `1er`;
     ht is a recorded trap, so copy the catalog). Mirror how each locale already rendered the
     sibling `cup-finish` values (`1st`, `5th of 17`) in the same work file.
   - Figures char-for-char (`692.5`, `2023–24`); `NCISAA 4A`, `NCHSAA 6A`, school names stay Latin.
     A season sub such as `2023–24` may be byte-identical to English, which is a correct keep.
   - Reuse each locale's existing rendering of the sibling sentences ("The school moved up to
     NCISAA 3A in 2024–25", the NCHSAA caveat) from the `cup-titles` / `cup-finish` units.
2. Build the overlays per lang.

### Phase 2 verification

- [ ] `npm run check:runtime` and `npm run check:live`: pass
- [ ] `npm run check:digits`, `check:sepdrift -- --lang <code>` for all nine: no new findings
- [ ] `npm run check:dates`, `npm run check:fr`, and the `fa` / `ar` / `hi` checks the rollout docs name
- [ ] `npm run i18n:leaks -- --lang <code>` for each: no new `cup-best` leak
- [ ] `npm run build`: succeeds
- [ ] Browser: `/compare/?topic=sports&lang=es`, `fa`, `hi`. The label, note, cells and tooltips
      are translated; in `fa`, `2020–21` does not reverse.

Then commit, push, open the PR, flip INDEX to Implemented, merge, pull. **Do not deploy.**

## Phase 1 verification (done 2026-11-07)

- `npx tsc -b` clean; `npm run build` passes (includes `check:cup`, `check:schema`)
- `check:cup` OK. Negative test: Carmel's sub set to `2021–22` gave
  `cup-best carmel-christian: sub: got "2021–22", expected "2022–23"`; file restored
- `coverage:floor`: identical to `main` except `cup-best` listed among excluded rows
- Chrome (Playwright), light and dark, all 11 schools: the row sits after Cup titles and before
  Sports offered; the cells read place then season, and the PD and DD tooltips read as specified
