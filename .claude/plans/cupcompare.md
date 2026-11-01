---
name: cupcompare
title: Add two Wells Fargo Cup rows to Compare → Sports — 2025–26 finish and six-season titles, both compare-only with no leader tint
status: implemented
phases: 2
created: 2026-11-01
branch: feat/cupcompare
prs: [396]
---

# Wells Fargo Cup rows on Compare → Sports

## Goal

Compare → Sports has only two rows today, Power 4 commits and Division I commits, and both
are documented minimums about top recruits. Add two rows from the official Wells Fargo Cup
ledger so parents can see each school's **whole athletic program** in one place:

1. **Wells Fargo Cup finish, 2025–26**: `5th of 17`, with `NCISAA 4A` on the second line.
2. **Wells Fargo Cup titles, 2020–21 to 2025–26**: `5`, with `Top 3 in 6 of 6` on the second
   line.

It worked when `/compare/?topic=sports` shows both rows for all 11 high schools, neither
row tints a leader, no school page gains a tile, `npm run coverage:floor` still reports
**Davidson Day 23/36**, and `npm run check:cup` fails if a cell drifts from the ledger.

## Context

**The ledger.** `src/data/wellsFargoCup.ts` holds `CUP_RECORDS`, `CUP_DIVISION_LEADERS` and
`CUP_SEASONS`. `src/lib/wellsFargoCup.ts` computes from it: `recordsFor`, `headlineStats`
(`cupsWon`, `seasonsTotal`, `latest`), `seasonRival`, `cupName`. Both import cleanly under
plain Node.

- 10 NCISAA roster schools have six seasons each. All 60 rows were re-checked against the
  six official tables on 2026-11-01 and matched on place, points, splits and class.
- **Only four schools have a Cup card** (`providence-day`, `charlotte-latin`,
  `charlotte-country-day`, `cannon`). The other seven are in the ledger with no card. The
  Compare rows read the ledger, so they cover all 11.
- **Charlotte Catholic has one row:** NCHSAA 6A, 2025–26, 1st, 655, no splits. Its earlier
  seasons are unverified, and no NCHSAA field size is held.
- **The ledger holds the whole 4A field but only part of 2A and 3A**, so "of 25" and
  "of 26" cannot be computed from it. Step 2 adds them.

**Compare rows are `VALUE_METRICS`** in `src/data/metricValues.ts`. There are 41 rows, at
indices 0-40. `ValueMetric` carries `values`, `subs` (second line), `quals` (per-cell
tooltip), `noLead`, `textValues` and `compareOnly`. `Compare.tsx` filters by topic, so a
row's position relative to other topics does not matter, and rows in a topic render in array
order.

**Overlays are keyed by array index** (`providence-day:[N].label`, see
`valueMetricsForTopic`). Inserting mid-array shifts every later path, so new rows go at the
very end. **That conflicts with a gate:** `scripts/check_travel_compare_rows.mjs` asserts
the travel rows are **last**, so an append fails the build until Step 5 relaxes it.

**The leader tint parses display strings.** `numericOf` in `src/pages/Compare.tsx` strips
non-digits, so `16th of 17` reads as 1617 and `1st of 17` as 117: the default would tint
Carmel Christian over Providence Day. `noLead: true` is required, not cosmetic.

**`compareOnly` matters.** `SchoolDetail.tsx:831` builds stat tiles from `VALUE_METRICS`
filtered by `!vm.compareOnly`.

**Precedents.** `.claude/plans/globalcompare.md` is the nearest: rows appended, a gate
re-deriving typed cells, a floor exclusion and a `metric-values` Phase 2. Its Implementation
notes are worth reading. Follow `check_travel_compare_rows.mjs` for the gate's assertions,
but extend `scripts/check_cup_ledger.mjs`, because `check:cup` is already chained into
`npm run build`.

**The floor parses `metricValues.ts`.** `scripts/coverage_floor.mjs` has
`FLOOR_EXCLUDED_TOPICS`, which works by topic only. Sports is a counted topic, so the two
Cup rows need a per-key exclusion. Counted, they would move the bar to 25/38 and score any
out-of-state candidate 0 on both.

**`npm run check:quals`** treats any value with words as coded and wants a tooltip, so every
`cup-finish` cell needs a `quals` entry. A bare integer does not, so `cup-titles` cells need
one only where it adds something.

## Decisions

- **Keys:** `cup-finish`, `cup-titles`. They contain no year, so a rollover changes the label
  and values, never the key.
- **Appended at the very end of `VALUE_METRICS`, indices 41 and 42**, in that order. No
  overlay path shifts. On the Sports pill they render after the two commit rows.
- **Both rows are `compareOnly: true`.** Four school pages already show this in the Cup card.
- **Both rows are `noLead: true`.** A `1st` in 2A is not a `1st` in 4A, and a 2A title should
  not tint over a 4A school. The division sits on the second line and in the tooltip.
- **`cup-finish` is `textValues: true`.** `15th of 17` is a phrase, and 26px with
  `white-space: nowrap` crowds the column. `cup-titles` stays at figure size.
- **The denominator is schools listed, not schools placed:** 2A 25, 3A 26, 4A 17. It is the
  division's size as the association publishes it. Three 2A schools are listed with no place
  and 0 points.
- **Charlotte Catholic's finish is `1st`, with no "of N",** and `NCHSAA 6A` beneath. Its
  titles cell is `null` (n/a), never `1`, because five of its six seasons are unverified.
- **Cells are typed strings, and the gate re-derives them.** This is the `travel-*`
  precedent: `coverage_floor.mjs` parses literals and overlays stamp the English. The
  "computed figures are never typed" rule is met by `check:cup` failing on any mismatch.
- **Top-3 goes on the titles row's second line, not in a third row.** It is omitted at zero,
  like the zero side of `travel-trips`. `Top 3 in 0 of 6` says nothing useful, and the `0`
  already reads.
- **`CUP_FIELD_SIZES` lives in the ledger file**, not the check, because it is published data
  with a source. It is used only by `check:cup`, so it adds nothing to the page bundle.
- **The Cup rows are excluded from the floor.** Only schools in these NC associations can
  score them, and a candidate should not be gated on a standing it can't hold.
- **Points, average points, fall/winter/spring share, streaks and margins are excluded.**
  Points are earned against different fields, and winter has 5 NCISAA sports against 9 each
  in fall and spring, so a term share mostly measures the calendar.
- **One chrome key, added at the Phase 1 review.** Row text sits in `VALUE_METRICS` and goes
  through the `metric-values` overlay, like `travel-*`. The one exception is
  `compare.cupTipKind`, below.
- **Both Cup row headers carry a tip explaining the Cup** (user request at the Phase 1
  review, 2026-11-01): `rowTip: 'cup'`. Seven schools have no Cup card, so Compare is the
  only place a parent meets the term for them. The body reuses `sports.cup.what1` and
  `what3`, translated in every catalog and identical to the card. Only the kicker
  `compare.cupTipKind` ("What it is") is new.

## Approvals needed

- **UX gate — GRANTED (2026-11-01).** The user approved the recommendation: the two Compare
  rows and metric keys, compare-only, no leader tint, excluded from the floor. The header
  tip was approved the same day, at the Phase 1 review.
- **Deploy: not part of this plan.** Merge, then stop.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Division Sizes 2025-26.md`
  — division sizes from https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/,
  plus the 60-row re-check.

Every other figure already traces to
`source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`.

Step 1 ingests the new file. `## Method` is dropped on ingest, and its one other heading
contains "Wells Fargo Cup", so the first `sports` rule in `RULES` folds it and no new card or
subtopic can appear.

## Out of scope

- Cup cards for the seven schools without one.
- Verifying Charlotte Catholic's earlier NCHSAA seasons. That belongs to its
  `/wells-fargo-cup` pass, which then fills its titles cell.
- A field size for NCHSAA 6A.
- Any change to the Cup card or `src/index.css`. `Compare.tsx` changes only for the `cup`
  header tip.
- Moving the Cup rows above the commit rows, which would need the overlay paths re-spliced.

## Steps

### Phase 1 — English

1. **Branch and ingest.** `git checkout main && git pull && git checkout -b feat/cupcompare`.
   This plan, the INDEX row and the source file are uncommitted in the working tree and come
   with you. Check `git status --short` first. Follow the `ingest-source-material` skill for
   the `sports` topic only: `build_docs.py sports`, then `scripts/build_site_content.py`.
   Diff `src/data/schools.json` against `HEAD` so no other topic was swept in. Run
   `npm run check:metrics`; no new ⚠️ subtopic should appear.

2. **Add field sizes to the ledger.** In `src/data/wellsFargoCup.ts`, after
   `CUP_DIVISION_LEADERS`:

   ```ts
   /**
    * Schools listed in a division's published table for the latest season. The
    * ledger holds only part of 2A and 3A, so "of 25" cannot be computed from it.
    * Listed, not placed: 2A has three unplaced schools on 0 points. Read only by
    * check:cup, which re-derives the Compare rows. Bump with a new season.
    */
   export const CUP_FIELD_SIZES: Record<string, number> = {
     'NCISAA|2A': 25,
     'NCISAA|3A': 26,
     'NCISAA|4A': 17,
   }
   ```

3. **Append the two rows** at the very end of `VALUE_METRICS`, after `travel-countries`,
   with a section comment: rows user-approved 2026-11-01 (plan `cupcompare`); every cell is
   typed and re-derived by `check:cup` from `src/data/wellsFargoCup.ts`; `noLead` because
   places and titles do not compare across divisions and the default parser would read
   `16th of 17` as 1617; appended last because overlays are keyed by index.

   Both rows use `topic: 'sports'`, `compareOnly: true`, `noLead: true`, and list all 11
   comparable schools in the key order the commit rows use. Never omit a key. Every `quals`
   entry is `{ kind: 'scope', text }`. Texts render to parents, so no "ledger" or plan names.
   The drafts below are reviewed at the Phase 1 stop.

   **`cup-finish`** — add `textValues: true`.
   Label: `Wells Fargo Cup finish, 2025–26`.
   Note: *The all-sports standings each association publishes. The place is within the
   school’s own division, out of the schools listed in it; beneath, the association and
   division. Divisions differ in size and competition, so places do not compare across them.*

   | School | value | sub | quals.text |
   |---|---|---|---|
   | providence-day | `1st of 17` | `NCISAA 4A` | 692.5 points. Charlotte Latin was second with 690. |
   | charlotte-latin | `2nd of 17` | `NCISAA 4A` | 690 points. Providence Day won 4A with 692.5. |
   | charlotte-country-day | `3rd of 17` | `NCISAA 4A` | 602.5 points. Providence Day won 4A with 692.5. |
   | cannon | `5th of 17` | `NCISAA 4A` | 407.5 points. Providence Day won 4A with 692.5. |
   | charlotte-christian | `8th of 17` | `NCISAA 4A` | 347.5 points. Providence Day won 4A with 692.5. |
   | covenant-day | `15th of 17` | `NCISAA 4A` | 185 points. Providence Day won 4A with 692.5. |
   | carmel-christian | `16th of 17` | `NCISAA 4A` | 160 points. Providence Day won 4A with 692.5. |
   | davidson-day | `8th of 26` | `NCISAA 3A` | 267.5 points. Cape Fear Academy won 3A with 450. |
   | hickory-grove-christian | `18th of 26` | `NCISAA 3A` | 110 points. Cape Fear Academy won 3A with 450. |
   | gaston-day | `6th of 25` | `NCISAA 2A` | 232.5 points. Caldwell Academy won 2A with 482.5. |
   | charlotte-catholic | `1st` | `NCHSAA 6A` | 655 points, ahead of Watauga with 580 and East Chapel Hill with 515. The NCHSAA is a separate association, so its points do not compare with NCISAA points. |

   **`cup-titles`** — `textValues` off.
   Label: `Wells Fargo Cup titles, 2020–21 to 2025–26`.
   Note: *Division titles in these six seasons. Beneath, how many seasons the school
   finished in its division’s top 3. A title in one division does not compare with a title
   in another. Charlotte Catholic shows n/a because only its latest season is verified here.*

   | School | value | sub | quals.text |
   |---|---|---|---|
   | providence-day | `5` | `Top 3 in 6 of 6` | Won in 2020–21, 2022–23, 2023–24, 2024–25 and 2025–26, all in NCISAA 4A. |
   | charlotte-country-day | `1` | `Top 3 in 6 of 6` | Won in 2021–22, in NCISAA 4A. |
   | charlotte-latin | `0` | `Top 3 in 6 of 6` | Second in 2021–22, 2022–23, 2024–25 and 2025–26, and third in 2020–21 and 2023–24, all in NCISAA 4A. |
   | davidson-day | `1` | `Top 3 in 4 of 6` | Won in 2023–24, in NCISAA 2A. The school moved up to NCISAA 3A in 2024–25. |
   | gaston-day | `1` | `Top 3 in 2 of 6` | Won in 2021–22, in NCISAA 2A. |
   | cannon, charlotte-christian, covenant-day, carmel-christian, hickory-grove-christian | `0` | — | — |
   | charlotte-catholic | `null` | — | — |

4. **Extend `check:cup`** in `scripts/check_cup_ledger.mjs`. Add
   `const { VALUE_METRICS } = await import('../src/data/metricValues.ts')`, import
   `CUP_FIELD_SIZES`, and add a Compare-rows section before the report. Add the assertions
   to the header comment. Assert:
   - exactly two rows with these keys, **contiguous and last** in `VALUE_METRICS`, in order,
     with `topic: 'sports'`, `compareOnly` and `noLead` both true;
   - `cup-finish.label` contains `CUP_SEASONS.at(-1)`, and `cup-titles.label` contains both
     `CUP_SEASONS[0]` and `CUP_SEASONS.at(-1)`;
   - `CUP_FIELD_SIZES['NCISAA|4A']` equals the count of ledger rows in NCISAA 4A for the
     latest season, the one division the ledger holds whole;
   - both rows' school keys equal those of `d1-commits-2426`.

   Then for each school, with `own = cup.recordsFor(slug)` and `latest = own.at(-1)`:
   - **`cup-finish` value:** `${T}${ordinal(place)} of ${size}` where `T` is `T` when
     `latest.tied`, and size comes from `CUP_FIELD_SIZES`. With no size, drop ` of N`. With no
     record for `CUP_SEASONS.at(-1)`, the value must be `null` with no sub. The English
     `ordinal` helper lives here, like the travel counting helpers.
   - **`cup-finish` sub:** `${association} ${classification}`.
   - **`cup-finish` quals:** required on every non-null cell. For a record with a leader
     table, text equals exactly `${pts} points. ${rival.name} was second with ${rival.points}.`
     at place 1, otherwise `${pts} points. ${rival.name} won ${classification} with ${rival.points}.`,
     using `cup.seasonRival`. With no rival (NCHSAA), text must start with `${pts} points`.
   - **`cup-titles` value:** `String(cups won)`, or `null` when
     `own.length !== CUP_SEASONS.length`, since a partial record cannot claim six seasons.
   - **`cup-titles` sub:** `Top 3 in ${n} of ${CUP_SEASONS.length}`, and absent at `n === 0`.
   - **`cup-titles` quals:** required when titles > 0, and the text must contain every
     season the school won.

   Negative tests (corrupt `metricValues.ts`, read which message printed, restore with
   `git diff` clean, and do not use `git stash`):
   (a) Cannon `5th of 17` → `4th of 17`;
   (b) delete Latin's `cup-finish` quals;
   (c) Gaston's sub `Top 3 in 2 of 6` → `Top 3 in 3 of 6`;
   (d) move `cup-titles` before `cup-finish`;
   (e) change `CUP_FIELD_SIZES['NCISAA|4A']` to 18.

5. **Relax `check:travelrows`.** In `scripts/check_travel_compare_rows.mjs`, the "must be
   LAST" assertion becomes: only `cup-finish` and `cup-titles` may follow the travel rows.
   Add `const TAIL_KEYS = ['cup-finish', 'cup-titles']` and require
   `VALUE_METRICS.slice(lastTravel + 1).map((r) => r.key)` to equal it. Update the header
   comment and the failure message. Do not weaken "contiguous".

6. **Keep the floor at 23/36.** In `scripts/coverage_floor.mjs`, add
   `const FLOOR_EXCLUDED_KEYS = new Set(['cup-finish', 'cup-titles'])`, with a comment: user
   decision 2026-11-01 (plan `cupcompare`); only members of these NC associations can score
   them, so an out-of-state candidate would get 0 of 2. Apply it alongside the topic set in
   both `floorExcluded` and `rows`, and fix the "Not counted" line so it names all seven
   rows correctly. Output must be identical to `main` apart from that line.

   Add one sentence to `CLAUDE.md`'s "Adding a school — `/add-school`" section and to
   `.claude/skills/add-school/SKILL.md`, beside the Global Exposure sentence: *The two Wells
   Fargo Cup Compare rows (2026-11-01) are excluded by `FLOOR_EXCLUDED_KEYS`, because only
   schools in these NC associations can hold them.*

7. **Update the docs that describe the Cup.**
   - `scripts/gen_data_schema.mjs` (~line 438): "Ten rules" → "Eleven rules", and add:
     **Two Compare rows read the ledger.** `cup-finish` and `cup-titles` are typed in
     `metricValues.ts` for every high school, card or not, and `check:cup` fails until they
     match. A new season or a ledger correction moves them. Then run `npm run schema`.
   - `CLAUDE.md`, "Wells Fargo Cup card" section: one sentence saying the same.
   - `.claude/skills/wells-fargo-cup/SKILL.md`: in Step 2's newer-season paragraph, say a new
     season also moves `CUP_FIELD_SIZES` and every `cup-finish` and `cup-titles` cell,
     including both labels. In the NCHSAA branch, say a verified six-season record fills
     Charlotte Catholic's titles cell. In Step 6's scope, add any Compare cells that change.
   - `.claude/SKILLS.md`: update the `wells-fargo-cup` entry with the same point and bump
     "updated" to the merge date. **Same PR**, per `CLAUDE.md`.

8. **Splice the new strings into the nine work files.** For each lang in `PROSE_TRANSLATED`
   (`es bn ht te fr fa it hi ar`):
   `node scripts/i18n_splice_work.mjs --lang <lang> --topic metric-values`. Expect **0
   dropped**. Rebuild with `node scripts/i18n_build_overlay.mjs --topic metric-values --lang <lang>`.
   Assert zero duplicate `at` paths:

   ```python
   import json, collections
   for l in 'es bn ht te fr fa it hi ar'.split():
       d = json.load(open(f'src/data/overlays/metric-values.{l}.json'))
       c = collections.Counter(a for e in d['strings'] for a in e['at'])
       assert not [a for a, n in c.items() if n > 1], l
   ```

   Spot-check that `[40]`, the last existing row, kept its translations.

9. **Verify (Phase 1 checklist), commit, push, open the PR.** Stage explicit paths only,
   after `git status --short`. Body via `--body-file`. Set this plan to `english-done` and
   the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review** of the rendered
English: both labels, both notes, the second lines and every tooltip. Nothing below runs
until they confirm.

### Phase 2 — Every other locale

Two layers: the `metric-values` overlay for research prose, per `PROSE_TRANSLATED`
(`es bn ht te fr fa it hi ar`), and **one chrome key**, `compare.cupTipKind`, added to the same
nine `src/locales/*.json` catalogs. For the mechanism, read
`.claude/docs/prose-translation-architecture.md`; for register and traps, read the matching
`.claude/docs/prose-translation-<lang>.md`. Italian has no rollout doc, so follow Telugu's
or Bangla's method.

1. **Translate the new units** in each `src/data/overlays/work/metric-values.<lang>.json`,
   only those with `t: ''`, identified by `of` stamp and never by position:
   - **Ordinals use that locale's own Cup form.** Read `sports.cup.place_ordinal_*` in
     `src/locales/<lang>.json`. For example, `es` is `{{count}}.º`; the card's ht ordinals
     are a recorded trap (memory `wellsfargocup-shipped`), so copy the catalog rather than
     composing one. French first is `1er`.
   - **Figures are copied char-for-char:** `692.5`, `17`, `2025–26`. No separator swap, no
     native digits typed in. `692.5` never becomes `692,5`. `bn`/`fa` digits and `hi`/`te`
     grouping happen at render.
   - **Names stay Latin:** `Wells Fargo Cup`, `NCISAA`, `NCHSAA`, `4A`, `3A`, `2A`, `6A`, and
     every school name as printed. `NCISAA 4A` may be byte-identical to English, which is a
     correct keep.
   - **Season spans** follow "Dates and session labels" in `src/data/overlays/NOTES.md`.
2. **Build the overlays** per lang, then re-run the zero-duplicate-`at` assertion.
3. **Add `compare.cupTipKind`** ("What it is") to the nine catalogs. The tip body needs no work: it
   reuses `sports.cup.what1` and `what3`.
4. **Run Phase 2 verification**, commit, push, merge
   (`gh pr merge --squash --delete-branch`), then `git checkout main && git pull`. Flip the
   INDEX row to `Implemented` with the PR link, and add `## Implementation notes` if anything
   deviated. **Do not deploy.** Say "merged — ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/providence-day/…Division Sizes 2025-26.md` | new, written during planning |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `src/data/wellsFargoCup.ts` | edit: `CUP_FIELD_SIZES` |
| `src/data/metricValues.ts` | edit: two rows appended, with `subs` and `quals` |
| `scripts/check_cup_ledger.mjs` | edit: Compare-rows gate |
| `scripts/check_travel_compare_rows.mjs` | edit: allow the two Cup rows after the travel rows |
| `scripts/coverage_floor.mjs` | edit: `FLOOR_EXCLUDED_KEYS` |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit and regenerate: eleventh Cup rule |
| `CLAUDE.md`, `.claude/skills/add-school/SKILL.md` | edit: floor sentence |
| `CLAUDE.md`, `.claude/skills/wells-fargo-cup/SKILL.md`, `.claude/SKILLS.md` | edit: a new season moves the rows |
| `src/data/overlays/work/metric-values.<lang>.json` ×9, `src/data/overlays/metric-values.<lang>.json` ×9 | Phase 1 splice, Phase 2 translations |
| `src/pages/Compare.tsx`, `src/locales/en.json`, `scripts/i18n_fields.mjs` | edit: `cup` header tip; the nine other catalogs in Phase 2 |
| `.claude/plans/INDEX.md`, this plan | status, PR, notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (trust `tsc -b`, not `tsc --noEmit`)
- [ ] `npm run check:cup`: passes, and all five negative tests failed with the right message
- [ ] `npm run check:travelrows`: passes
- [ ] `npm run check:quals`: prints that every coded cell carries a tooltip
- [ ] `npm run check:metrics`: no new findings
- [ ] `npm run coverage:floor`: **Davidson Day 23/36 (63%)**, as on `main`
- [ ] `npm run check:schema`, `npm run check:live`, `npm run check:chrome`: pass
- [ ] Zero-duplicate-`at` assertion passes for all nine locales
- [ ] `npm run build`: succeeds
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright; don't wait on `networkidle`):
  - `/compare/?topic=sports` with all 11 schools: four Key-stats rows, Cup rows after the commit rows; every cell matches the tables in Step 3; Charlotte Catholic's titles cell is n/a.
  - Both Cup row headers open the "What it is" tip by hover and keyboard focus, and it fits at 360px.
  - **No `.lead` class on either Cup row**, including when only Carmel Christian and Providence Day are selected. Assert the class, not just the text. Power 4 and Division I still tint.
  - Hover or focus every `.qual-dot` cell in both rows and confirm the text and the "Scope note" kicker.
  - `15th of 17` and `Top 3 in 6 of 6` fit their cells at the narrowest column, and the Compare table scrolls inside its frame at 360px with the longest tooltip open. Run `npm run audit:mobile`.
  - A card school (Providence Day) and a no-card school (Gaston Day): the Sports stat tiles are the **same as `main`**.
  - `?lang=es` on Compare: the new rows show English (expected until Phase 2), and every other Spanish row still renders.

### Phase 2 — Locales

- [ ] `npm run check:runtime`, `npm run check:live`: pass
- [ ] `check_figures.py` for `metric-values`, per lang: no new findings
- [ ] `npm run check:sepdrift -- --lang <code>` for each of the nine: no new findings in `metric-values`
- [ ] `npm run check:dates`, `npm run check:fr`, and the RTL and script checks the rollout docs name for `fa`, `ar`, `hi`: pass
- [ ] `npm run build`: succeeds
- [ ] **Browser check in every prose locale** on `/compare/?topic=sports`: labels, notes, subs, tooltips and the header tip translated; school names and `NCISAA 4A` Latin; figures correct. In `fa`/`ar`, `2020–21` does not reverse and `5th of 17` reads place-then-total (memory "RTL figure ranges reverse"). Non-Latin assertions are not case-sensitive substring checks (memory "innerText case false-pass").

## Risks

| Risk | Mitigation |
|---|---|
| The 2026–27 table posts and the rows go stale | `check:cup` fails once `CUP_SEASONS` moves, and the skill's newer-season step names the rows |
| Readers compare places across divisions | The note says not to, the division is on line two, and there is no tint |
| A tooltip claims a points gap the ledger disagrees with | The gate matches NCISAA tooltips exactly |
| Charlotte Catholic's `1st` reads as ranked beside Providence Day's | Different association on line two, and the tooltip says the points do not compare |
| The travel gate is loosened too far | It names the exact tail keys, and `check:cup` asserts the Cup rows' own placement |
| Ordinals composed by hand in a locale | Phase 2 copies each catalog's `sports.cup.place_ordinal_*` form |

## Open questions

- Should Charlotte Catholic get a denominator once a 6A field size is sourced? **Default:**
  leave `1st` until its `/wells-fargo-cup` pass.
- Should the Cup rows sit above the commit rows? **Default:** after them. Moving them is a
  later overlay re-splice if the user asks at review.

## Implementation notes

- **The PR opens after Phase 2, not at step 9.** `/implement` lands both phases in one PR, so
  Phase 1 stopped at a pushed branch.
- **The header tip was added at the Phase 1 review** by user request: `rowTip: 'cup'` on both
  rows, guarded by `check:cup`. It added the plan's only chrome key and its only `Compare.tsx`
  change.
- **Phase 2 ran in the Phase 1 window,** at the user's "english approved". Ordinals were
  generated from each catalog's `sports.cup.place_ordinal_*` with `Intl.PluralRules`, so they
  match the card, and translations were matched by English text.
- **`fr` and `te` reword the top-3 line** to read naturally: `Top 3 : 6 sur 6` and
  `6 సీజన్లలో 6సార్లు టాప్ 3`. Bangla and Hindi put the total first, as the plan allows.
- **Follow-up after #396, same day.** Charlotte Catholic's `1st` / 655 was confirmed against
  the NCHSAA's own post, which is now the cited source. The row-header dot moved inside the
  label and anchors to the end of its last line, for the NC admit-rate rows too. A dot in
  flow, even with a word joiner, drops onto its own line when the label fills its last line.
  Cup labels also keep a season whole at render, because `2025–26` could wrap at the dash.
