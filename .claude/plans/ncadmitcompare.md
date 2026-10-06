---
name: ncadmitcompare
title: Add six Compare rows under College Support — each school's Fall 2025 admit rate at each of the Top 6 NC public universities
status: english-done
phases: 2
created: 2026-10-05
branch: feat/ncadmitcompare
prs: []
---

# NC university admit rates on the Compare page

## Goal

Add **six rows to the Compare page's College Support "Key stats" table**, one per Top 6 NC
public university (UNC-Chapel Hill, NC State University, UNC Charlotte, East Carolina
University, UNC Wilmington, UNC Greensboro). Each cell shows the **Fall 2025 admit rate** at
which that university admitted the selected private school's applicants, e.g. `32%`, with the
denominator `20 / 63` (admitted / applied) on a second line beneath it. A parent picking three
schools can then read across a row and see where in-state odds differ. The six rows appear
**on Compare only**: they do not add stat tiles to school pages.

It worked when Compare → College Support shows the six rows between "Power Four" and
"HBCUs", every one of the 11 high schools has a filled cell, the figures match the school
page's NC admissions card (rounded to whole numbers), and a school page's College Support
tile strip still shows the same 8 tiles as before.

## Context

**The data already exists. No new fetching is needed.** All 11 high schools carry an
`ncAdmissions` structured card (`src/data/collegeSupportPrograms/<slug>.ts`, type
`NcAdmissions` / `NcUniversity` in `src/data/collegeSupport.ts:100-175`). Each school has
`latestTerm: '2025'`, and its `universities[]` holds exactly the six universities in US News
order, each with `key`, `name`, `applied`, `accepted`, `rate` (one decimal, e.g. `'31.7%'`),
`ratePct`, and the five-year fields. Provenance is in
`source-material/college-support/<school>/<School> - College Support - UNC System Admissions.md`
(all 11 exist; they are already ingested). Trinity Episcopal (K–8) has no College Support
data and is excluded from Compare (`hasHighSchool: false`).

**Compare rows are `VALUE_METRICS` in `src/data/metricValues.ts`.** That file is
hand-maintained and the ingest never writes it. Row shape: `ValueMetric` (`topic`, `key`,
`label`, `note?`, `values`, `subs?`, `noLead?`, `lowerIsBetter?`, `compareAs?`, `quals?`).
`src/pages/Compare.tsx:340-390` renders each row: the label, the note, then per school
`values[slug]` with an optional `subs[slug]` second line (`.mark-sub`). The leader tint goes
to the max of `rankValueOf()`, which for a plain `32%` reads 32. Current College Support rows,
in array order (index in `VALUE_METRICS`):

| idx | key |
|---|---|
| 3 | `ap-performance` |
| 4–8 | `bucket-ivy`, `bucket-ivyplus`, `bucket-nu75`, `bucket-lac75`, `bucket-p4` |
| 9 | `bucket-hbcu` |
| 10 | `counselor-caseload` |

Rows 11–29 belong to the other areas. The nearest precedent is the `bucket-*` rows: a value
derived from the College Support card data, with one row per category.

**The same array also feeds the school-page stat tiles.** `src/pages/SchoolDetail.tsx:780`:
`const stats = valueMetricsForTopic(t.slug, lang).filter((vm) => vm.values[slug] != null)`.
Each stat renders as a `.stat-tile` at lines 1010-1026. Without an opt-out, these six rows
would add six tiles to every school's College Support header, directly above the
`ncAdmissions` card that already shows the same figures. The user chose Compare-only. The
comment at `SchoolDetail.tsx:1028-1033` (Admissions) records the same coupling.

**The overlay is keyed by ARRAY INDEX.** `valueMetricsForTopic()`
(`metricValues.ts`, bottom of file) localizes the whole `VALUE_METRICS` array under the slug
prefix `providence-day`, so overlay paths read `providence-day:[9].label`. Inserting six rows
before `bucket-hbcu` moves rows 9–29 to 15–35 in all nine `src/data/overlays/metric-values.<lang>.json`
files and their `work/` files. `localized()` resolves strictly by path. **`check:live` does
NOT catch a shifted path**, because it only asks whether a stamp exists anywhere in live
English (`scripts/check_live_resolution.mjs:666`). The shifted rows would therefore render
English in nine locales with every check green. See the memory note "Overlay at-paths go
stale on row delete" (PR #303). Re-deriving `at` from a fresh extract with
`scripts/i18n_splice_work.mjs` fixes it. That script joins by `of` stamp, keeps every
existing `t`, and refreshes `at`.

**The extractor treats `values.<slug>` and `subs.<slug>` as prose**
(`scripts/i18n_fields.mjs:395-410`). The shipped overlays store figure strings verbatim in
every locale (`66 / 75`, `$3,784/বছর`), so new cells extract as units whose translation is the
English figure copied char-for-char.

**The add-school coverage floor moves.** `npm run coverage:floor` (`scripts/coverage_floor.mjs`)
reads `VALUE_METRICS.length`. Today it reports 30 rows and Davidson Day at 17/30 (56%). Every
high school fills all six new rows, so this becomes **36 rows, Davidson Day 23/36**. The
script will derive that. The prose documents that transcribe "17/30" / "56%" / "~3.3 points"
will go stale and must be updated in the same PR (Step 7).

## Decisions

- **Latest year (Fall 2025) rate, not the pooled five-year rate.** User's choice (2026-10-05).
  It matches the card's Admit Rate column and `check:ncsuper`'s anchor. The cost is accepted:
  some cells rest on 3–9 applicants (Charlotte Christian at UNC Greensboro is 3 / 3). The
  denominator sub-line makes that visible.
- **Compare page only. No school-page tiles.** User's choice. Add an optional
  `compareOnly?: boolean` to `ValueMetric`, and filter it out in `SchoolDetail.tsx:780`.
- **Placement: immediately before `bucket-hbcu`.** User's choice. The six rows become
  `VALUE_METRICS` indices 9–14, `bucket-hbcu` becomes 15, and everything after shifts by 6.
- **Row order follows US News rank, matching the card:** Chapel Hill, NC State, Charlotte,
  ECU, Wilmington, Greensboro.
- **Keys:** `nc-admit-<university key>` → `nc-admit-unc-chapel-hill`,
  `nc-admit-nc-state-university`, `nc-admit-unc-charlotte`, `nc-admit-east-carolina-university`,
  `nc-admit-unc-wilmington`, `nc-admit-unc-greensboro`.
- **Cell value is a whole-number percent, computed from the raw counts:
  `Math.round(100 * accepted / applied)`.** The repo convention is whole-number percentages.
  **Never re-round the card's one-decimal `rate` string**: Covenant Day at UNC Charlotte is
  17/19 = 89.47%, and the card shows `89.5%`, which re-rounds to 90. The true whole number
  is **89**. That is the only such case today, but the check in Step 5 enforces the rule.
- **The second line carries the denominator as `<accepted> / <applied>`**, e.g. `20 / 63`. It
  has no words, so it is a keep in every locale (same shape as the shipped `66 / 75` bucket
  cells). This satisfies the standing rule that every NC rate carries its denominator.
- **No `quals` tooltips.** The value is a plain percent (`check:quals` does not flag it), and
  the sub-line already carries the denominator. 66 tooltips × 9 locales would add no
  information.
- **Default leader tint (highest rate wins).** Higher odds is better for a parent, so no
  `noLead`/`lowerIsBetter`/`compareAs` is needed. Ties at 100% tint every tied school. That
  is accepted, and the sub-line shows how thin each 100% is.
- **Label shape: `Admit rate — <University>`**, with the university as an exact dashboard string.
  The university name sits at the end so translators can reorder the head phrase. A bare
  university name would be ambiguous beside "Ivy League", which is a count of acceptances.
- **Only the first row (UNC-Chapel Hill) carries a `note`, and it explains all six.** The
  six rows sit together, and repeating the note five more times adds height without adding
  information. The user can change this at the Phase 1 review.
- **Values are hand-typed in `metricValues.ts`, guarded by a new build check, not derived at
  import time.** This follows the file's hand-maintained convention and every other row. The
  check catches drift when the dashboard is next refreshed (Fall 2026).
- **The new rows count toward the add-school floor.** They are real Compare rows. Every NC
  high school has dashboard data, so the floor rises uniformly and the relative bar is
  unchanged. Caveat to record in the docs: a candidate outside NC (e.g. a Fort Mill, SC
  school) would score 0/6 on these rows.

## Approvals needed

- **Six new Compare rows (UX gate): GRANTED.** The user requested these rows directly on
  2026-10-05 and chose their placement, rate window, and Compare-only scope. A direct
  request to add UI counts as approval under CLAUDE.md's UX standard. The `compareOnly`
  flag changes nothing visible, because it keeps school pages exactly as they are.
- **Deploy: not part of this plan.** Merge, then stop. `npm run deploy` is the user's call.

## Out of scope

- The pooled five-year rate on Compare (not chosen). Changing the ncAdmissions card itself.
- Any campus beyond the standing Top 6.
- Per-cell `quals` tooltips.
- Refreshing the dashboard data. The figures stay at the Fall 2025 term already in the repo.
- Updating `.claude/docs/prek8-shape-assessment.md`. It is a dated historical assessment,
  and its 17/30 figures were true when written.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/ncadmitcompare`.

2. **Add `compareOnly` to `ValueMetric`** in `src/data/metricValues.ts`. Add the optional
   field `compareOnly?: boolean` with a doc comment in the file's style. The comment says it
   keeps the row off the school-page stat-tile strip (`SchoolDetail.tsx`) because the
   school page already presents the same figures in a structured card. Name `ncAdmissions`
   as the first user.

3. **Honor it on school pages.** In `src/pages/SchoolDetail.tsx:780`, change the filter to
   `.filter((vm) => !vm.compareOnly && vm.values[slug] != null)`. Update the nearby
   Admissions comment (lines 1028-1033) only if it now reads as wrong. It says the strip and
   the Key Stats rows are "the same array filtered by topic", so add "minus `compareOnly`
   rows".

4. **Insert the six rows** into `VALUE_METRICS` immediately **before** the `bucket-hbcu`
   entry (currently at `metricValues.ts:528`). Start with a section comment: these are
   government-published figures from the UNC System Insight dashboard via the
   `nc-admissions-data` skill. Give the source-material path pattern, and say that each cell
   is `Math.round(100*accepted/applied)` from the school's `ncAdmissions.universities[]`.
   **Never re-round `rate`.** Each row:

   ```ts
   {
     topic: 'college-support',
     key: 'nc-admit-unc-chapel-hill',
     label: 'Admit rate — UNC-Chapel Hill',
     note: '…',            // first row only — see below
     compareOnly: true,
     values: { cannon: '32%', … },   // all 11 schools, from the table below
     subs:   { cannon: '20 / 63', … },
   },
   ```

   Note text for the first row (English draft. The user reviews it at the Phase 1 stop):

   > The share of each school's own applicants that the university admitted for Fall 2025,
   > from the UNC System's published admissions dashboard. It is a figure for that school at
   > that university, not either one's overall admit rate. Beneath each rate: admitted /
   > applied. Small schools send few applicants, so a single-year rate can rest on a handful
   > of students; the NC admissions card on each school page adds the five-year rate.

   Keep it unhedged and free of internal apparatus (it renders to parents). It must not call
   the figure a matriculation or enrollment figure.

   **Exact cells** (computed 2026-10-05 from the committed card data. Step 5's check
   re-derives them, so a typo fails the build):

   **UNC-Chapel Hill** (`unc-chapel-hill`)

   | School | Cell | Sub | Card rate |
   |---|--:|--:|--:|
   | cannon | 32% | 20 / 63 | 31.7% |
   | carmel-christian | 25% | 4 / 16 | 25.0% |
   | charlotte-catholic | 23% | 24 / 103 | 23.3% |
   | charlotte-christian | 26% | 10 / 38 | 26.3% |
   | charlotte-country-day | 29% | 20 / 69 | 29.0% |
   | charlotte-latin | 33% | 23 / 69 | 33.3% |
   | covenant-day | 27% | 9 / 33 | 27.3% |
   | davidson-day | 40% | 10 / 25 | 40.0% |
   | gaston-day | 27% | 3 / 11 | 27.3% |
   | hickory-grove-christian | 20% | 2 / 10 | 20.0% |
   | providence-day | 46% | 47 / 103 | 45.6% |

   **NC State University** (`nc-state-university`)

   | School | Cell | Sub | Card rate |
   |---|--:|--:|--:|
   | cannon | 65% | 34 / 52 | 65.4% |
   | carmel-christian | 31% | 8 / 26 | 30.8% |
   | charlotte-catholic | 28% | 39 / 141 | 27.7% |
   | charlotte-christian | 45% | 14 / 31 | 45.2% |
   | charlotte-country-day | 23% | 11 / 48 | 22.9% |
   | charlotte-latin | 34% | 23 / 67 | 34.3% |
   | covenant-day | 52% | 22 / 42 | 52.4% |
   | davidson-day | 43% | 9 / 21 | 42.9% |
   | gaston-day | 47% | 7 / 15 | 46.7% |
   | hickory-grove-christian | 53% | 10 / 19 | 52.6% |
   | providence-day | 32% | 23 / 71 | 32.4% |

   **UNC Charlotte** (`unc-charlotte`)

   | School | Cell | Sub | Card rate |
   |---|--:|--:|--:|
   | cannon | 100% | 25 / 25 | 100.0% |
   | carmel-christian | 57% | 17 / 30 | 56.7% |
   | charlotte-catholic | 88% | 57 / 65 | 87.7% |
   | charlotte-christian | 73% | 8 / 11 | 72.7% |
   | charlotte-country-day | 88% | 14 / 16 | 87.5% |
   | charlotte-latin | 79% | 11 / 14 | 78.6% |
   | covenant-day | **89%** | 17 / 19 | 89.5% ← re-rounding trap, true value 89.47% |
   | davidson-day | 86% | 6 / 7 | 85.7% |
   | gaston-day | 86% | 6 / 7 | 85.7% |
   | hickory-grove-christian | 84% | 21 / 25 | 84.0% |
   | providence-day | 85% | 17 / 20 | 85.0% |

   **East Carolina University** (`east-carolina-university`)

   | School | Cell | Sub | Card rate |
   |---|--:|--:|--:|
   | cannon | 100% | 12 / 12 | 100.0% |
   | carmel-christian | 100% | 20 / 20 | 100.0% |
   | charlotte-catholic | 98% | 47 / 48 | 97.9% |
   | charlotte-christian | 89% | 8 / 9 | 88.9% |
   | charlotte-country-day | 100% | 11 / 11 | 100.0% |
   | charlotte-latin | 100% | 10 / 10 | 100.0% |
   | covenant-day | 86% | 6 / 7 | 85.7% |
   | davidson-day | 100% | 6 / 6 | 100.0% |
   | gaston-day | 100% | 4 / 4 | 100.0% |
   | hickory-grove-christian | 100% | 5 / 5 | 100.0% |
   | providence-day | 92% | 12 / 13 | 92.3% |

   **UNC Wilmington** (`unc-wilmington`)

   | School | Cell | Sub | Card rate |
   |---|--:|--:|--:|
   | cannon | 71% | 12 / 17 | 70.6% |
   | carmel-christian | 61% | 19 / 31 | 61.3% |
   | charlotte-catholic | 68% | 62 / 91 | 68.1% |
   | charlotte-christian | 60% | 9 / 15 | 60.0% |
   | charlotte-country-day | 59% | 10 / 17 | 58.8% |
   | charlotte-latin | 52% | 13 / 25 | 52.0% |
   | covenant-day | 73% | 16 / 22 | 72.7% |
   | davidson-day | 78% | 7 / 9 | 77.8% |
   | gaston-day | 75% | 6 / 8 | 75.0% |
   | hickory-grove-christian | 88% | 7 / 8 | 87.5% |
   | providence-day | 53% | 10 / 19 | 52.6% |

   **UNC Greensboro** (`unc-greensboro`)

   | School | Cell | Sub | Card rate |
   |---|--:|--:|--:|
   | cannon | 100% | 8 / 8 | 100.0% |
   | carmel-christian | 100% | 9 / 9 | 100.0% |
   | charlotte-catholic | 94% | 16 / 17 | 94.1% |
   | charlotte-christian | 100% | 3 / 3 | 100.0% |
   | charlotte-country-day | 92% | 11 / 12 | 91.7% |
   | charlotte-latin | 100% | 8 / 8 | 100.0% |
   | covenant-day | 40% | 2 / 5 | 40.0% |
   | davidson-day | 100% | 3 / 3 | 100.0% |
   | gaston-day | 100% | 4 / 4 | 100.0% |
   | hickory-grove-christian | 100% | 6 / 6 | 100.0% |
   | providence-day | 100% | 7 / 7 | 100.0% |

   Use the same school-key order the neighbouring rows use (`cannon`, `charlotte-christian`,
   `charlotte-catholic`, …) for consistency. Put a short trailing comment per cell only where
   it adds something (e.g. the Covenant Day 89% trap).

5. **Add a build gate: `scripts/check_nc_compare_rows.mjs` → `npm run check:ncrows`.**
   Model its header comment on `scripts/check_nc_superlatives.mjs` (why it exists, what it
   asserts). It runs under plain Node: `metricValues.ts` and the
   `collegeSupportPrograms/*.ts` files both import cleanly (verified while planning). Each
   program file exports one object with an `ncAdmissions` property. Assert:
   - exactly six `college-support` rows whose key starts `nc-admit-`, contiguous, in the
     card's university order, positioned **immediately before** `bucket-hbcu`;
   - each row's key equals `nc-admit-${university.key}` and its label ends with the exact
     dashboard name (`university.name`);
   - every row has `compareOnly: true`;
   - for every school whose program has `ncAdmissions`, `values[slug] ===
     \`${Math.round(100*accepted/applied)}%\`` and `subs[slug] === \`${accepted} / ${applied}\``
     (parse counts with commas stripped). Compute from the counts, never from `rate`;
   - every slug in `values` either has `ncAdmissions` data or is `null`, and no school with
     data is missing a key;
   - every school's `latestTerm` equals one shared term, and the first row's `note`
     mentions `Fall <that term>`. A data refresh to Fall 2026 then fails the build until the
     Compare note is updated too.
   Exit 1 with a per-cell message on any mismatch. Add `"check:ncrows": "node
   scripts/check_nc_compare_rows.mjs"` to `package.json`, and chain `&& npm run check:ncrows`
   into `build` right after `check:ncsuper`.
   **Negative test** (standing rule: isolate the assertion). Change one cell in
   `metricValues.ts` (e.g. Covenant Day UNC Charlotte `89%` → `90%`), run the check, and
   confirm it fails **with the cell-mismatch message for that cell**. Restore it with
   `git diff`-clean. Then repeat once for a `subs` cell.

6. **Keep the nine locales' existing translations on their rows.** This is mechanical and
   adds no translation. The insert shifted rows 9–29 → 15–35, and runtime resolution is by
   path. For each lang in `PROSE_TRANSLATED` (`es bn ht te fr fa it hi ar`, from
   `src/lib/i18n.ts:182`):
   `node scripts/i18n_splice_work.mjs --lang <lang> --topic metric-values`. Confirm the report
   shows **0 dropped**, and that the added stamps are only the new rows' strings (6 labels,
   1 note, the new percent and `a / n` strings that did not already exist). Then
   `node scripts/i18n_build_overlay.mjs` for `metric-values` per lang (check its usage line
   for the exact flags). New units carry `t: ''` and stay English until Phase 2. That is
   expected. Then assert **zero duplicate `at` paths** in each rebuilt
   `src/data/overlays/metric-values.<lang>.json`:
   ```python
   import json, collections
   for l in 'es bn ht te fr fa it hi ar'.split():
       d = json.load(open(f'src/data/overlays/metric-values.{l}.json'))
       c = collections.Counter(a for e in d['strings'] for a in e['at'])
       assert not [a for a, n in c.items() if n > 1], l
   ```
   Also spot-check one shifted row: in `metric-values.es.json`, the Spanish `HBCUs` label must
   now sit at `providence-day:[15].label`, and `counselor-caseload`'s at `[16]`.

7. **Update the documents that transcribe the coverage floor.** First run
   `npm run coverage:floor` and read the new figures from it. Expect 36 rows, Davidson Day
   23/36. Use whatever it prints. Then update every place that hardcodes the old numbers:
   - `CLAUDE.md` § "Adding a school — `/add-school`" (lines ~96-125): `17/30`, `56%`,
     `≥17 of 30`, `16/30`, `zero of 30`, "each row moves the figure ~3.3 points", "56% is a
     rate over 30 Compare rows". Also re-check the "area's denominator is 4–23" claim, since
     College Support gains 6 rows. Add one sentence: the six NC admit-rate rows only exist
     for NC high schools, so an out-of-state candidate scores 0 on them.
   - `.claude/skills/add-school/SKILL.md`: lines ~215-308, 330-344, 460, 626. Update the same
     figures. At line 626 ("a 56%-fill school"), re-check Covenant Day's new fill.
   - `.claude/SKILLS.md` lines ~70-86 (the add-school entry). **This is a material change to a
     skill's gate figures, so SKILLS.md is updated in this same PR**, per the living-index rule.
   - `scripts/coverage_floor.mjs` comments at lines ~80 and ~96 ("17/30 is 56.67%", "Davidson
     Day at 17/30 as documented"). Update the numbers, not the logic.

8. **Regenerate the schema doc.** `npm run schema`. `.claude/docs/DATA-SCHEMA.md` §4 should list the six rows
   under College Support, and the total should read 36. If `gen_data_schema.mjs` prints a
   flag legend (↓ / – / Q), add a marker for `compareOnly` (e.g. `C` = "Compare only, no
   school-page tile") in the generator, so the doc does not hide that these rows skip the
   tiles. Then run `npm run schema` again.

9. **Verify English (Phase 1 checklist below), commit, push, open the PR as a draft or
   leave it unmerged, and set the INDEX row to `English shipped`.** Stage explicit paths
   only. Check `git status --short` first.

**→ STOP. `/implement` ends its turn here and waits for the user's review** of the rendered
English: the label wording, the note, the sub-line format, and the placement. Nothing below
runs until they confirm.

### Phase 2 — Every other locale

Research-prose layer only: the `metric-values` overlay, per `PROSE_TRANSLATED`
(`es bn ht te fr fa it hi ar`). **No `src/locales/*.json` change.** This plan adds no chrome
keys, since labels and notes live in `VALUE_METRICS`. Mechanism:
`.claude/docs/prose-translation-architecture.md`. For per-locale register and traps, read the
matching `.claude/docs/prose-translation-<lang>.md`. Italian has no rollout doc, so follow
Telugu's or Bangla's method.

1. **Translate the new units** in each `src/data/overlays/work/metric-values.<lang>.json`.
   Only the units with `t: ''`, identified by `of` stamp and never by position:
   - the six labels. `Admit rate — ` is translated. The university name is an exact
     dashboard string and **stays Latin, verbatim**, in every locale (`UNC-Chapel Hill`,
     `NC State University`, `East Carolina University`, …), the same as other searchable
     identifiers;
   - the one note. Carry its facts exactly: Fall 2025, admitted / applied, five-year rate on
     the school page, and not an overall admit rate. `Fall 2025` translates per the
     "Dates and session labels" rule in `src/data/overlays/NOTES.md`; its digits do not;
   - the percent cells (`32%`) and the `a / n` sub-lines: **`t` is the English,
     char-for-char.** No separator swap, no native digits typed into the data, and no space
     before `%` (also in French). `bn`/`fa` digit rendering and `hi`/`te` grouping happen
     at render time, never in the data.
2. **Build the overlays.** Run `node scripts/i18n_build_overlay.mjs` for `metric-values`
   per lang, then re-run the zero-duplicate-`at` assertion from Phase 1 step 6.
3. **Run the Phase 2 verification**, commit, push, merge
   (`gh pr merge --squash --delete-branch`), then `git checkout main && git pull`. Flip the
   INDEX row to `Implemented` with the PR link. **Do not deploy.** Say "merged — ready to
   deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | edit: `compareOnly?` on `ValueMetric`; six new rows before `bucket-hbcu` |
| `src/pages/SchoolDetail.tsx` | edit: tile filter skips `compareOnly`; comment touch-up |
| `scripts/check_nc_compare_rows.mjs` | new: `check:ncrows` gate |
| `package.json` | edit: `check:ncrows` script, chained into `build` |
| `src/data/overlays/work/metric-values.<lang>.json` ×9 | Phase 1: re-spliced `at` paths; Phase 2: new translations |
| `src/data/overlays/metric-values.<lang>.json` ×9 | rebuilt in both phases |
| `scripts/gen_data_schema.mjs` | edit: `compareOnly` legend marker (if the legend exists) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `CLAUDE.md`, `.claude/skills/add-school/SKILL.md`, `.claude/SKILLS.md`, `scripts/coverage_floor.mjs` | floor figures 17/30 → the new script output |
| `.claude/plans/INDEX.md`, this plan | status, PR, implementation notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (trust `tsc -b`, not `tsc --noEmit`)
- [ ] `npm run check:ncrows`: passes, and both negative tests failed for the right reason
- [ ] `npm run check:metrics` and `npm run check:quals`: no new findings for the `nc-admit-*` rows
- [ ] `npm run coverage:floor`: 36 rows. The docs in Step 7 quote exactly what it prints
- [ ] `npm run check:schema` and `npm run check:live`: pass
- [ ] Zero-duplicate-`at` assertion passes for all nine locales; the `es` HBCUs label sits at `[15]`
- [ ] `npm run build`: succeeds (it chains `check:runtime`, `check:live`, `check:ncrows`, …)
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright; don't wait on `networkidle`):
  - `/compare?topic=college-support` with 3+ schools selected: six rows sit between Power Four and HBCUs. Each cell shows the percent plus the `a / n` line. Covenant Day UNC Charlotte reads **89%**. The UNC-Chapel Hill row shows the note. The leader tint marks the highest rate per row.
  - A school page (e.g. Cannon), College Support: the tile strip shows the **same 8 tiles as `main`** (no admit-rate tiles), and the ncAdmissions card is unchanged.
  - `?lang=es` on the same Compare view: the six new rows show English (expected until Phase 2), while **HBCUs, Seniors per counselor, and every non-College-Support area's rows are still Spanish**. This proves the at-path re-splice worked.

### Phase 2 — Locales

- [ ] `npm run check:runtime` and `npm run check:live`: pass
- [ ] `npm run check:sepdrift -- --lang <code>` for each of the nine: no new findings in `metric-values`
- [ ] `npm run check:dates`: passes (the note's `Fall 2025`)
- [ ] `npm run check:fr`, `npm run check:bidi`, `npm run check:fa`, `npm run check:hi`: pass
- [ ] `npm run build`: succeeds
- [ ] **Browser check in every prose locale** on `/compare?topic=college-support`: labels and note are translated, university names are Latin, and figures are correct (`bn`/`fa` render native digits from the English data; `ar` and `fa` are RTL, so check that `20 / 63` still reads admitted-over-applied). The `ar`, `bn`, and `hi` assertions must not be case-sensitive substring checks (see memory "innerText case false-pass").

## Risks

| Risk | Mitigation |
|---|---|
| Inserting mid-array shifts overlay paths, so rows 15–35 render English in nine locales with every check green | Phase 1 step 6 re-splice + zero-dup assertion + the `?lang=es` browser check on a shifted row |
| Double-rounding a cell from the card's one-decimal `rate` | Cells are computed from counts; `check:ncrows` enforces it; the Covenant Day 89% trap is named |
| Six admit-rate tiles appear on every school page | `compareOnly` filter + the school-page browser check |
| Floor documents go stale (as they have twice before) | Step 7 updates all four from the script's own output |
| Fall 2026 data refresh updates the card but not the Compare rows | `check:ncrows` re-derives every cell and checks the note's term on every build |
| 100% leader tint on 3 / 3 cells reads as a strong result | Accepted with the latest-year choice; the sub-line shows the denominator in every cell |

## Open questions

- Should the five other rows also carry a (shorter) note? **Default:** no. Only the
  UNC-Chapel Hill row has a note, and the user can ask for more at the Phase 1 review.

## Implementation notes

- **Phase 1 (2026-10-05).** The six rows were generated from the card data, not hand-typed,
  and every cell matched the tables above. `check:ncrows` negative tests: Covenant Day UNC
  Charlotte `89%`→`90%` and `17 / 19`→`17 / 20` each failed with exactly that cell's message.
- **Splice:** 513 kept / 93 added / 0 dropped in all nine locales. The 93 added are only the
  new rows' strings (6 labels, 1 note, the percent and `a / n` cells not already present); 15
  new cells re-use an already-translated figure string (e.g. `100%`) and resolve now.
- **Deviation, `coverage_floor.mjs`:** the step said "numbers, not logic", but the script
  *printed* a hardcoded `their 0/30 is correct` for the K–8 exclusion. It now interpolates
  `0/${rows.length}`. The dated 2026-09-16 verification comment keeps its `0/30` / `17/30`
  as history, with a note that rows have since grown to 36.
- **Docs:** floor is Davidson Day **23/36 (63%)**, ~2.8 points per row; the per-area
  denominator range is now **2–28** (College Support 22 → 28; Admissions at 2 had already
  made the old "4–23" low end stale). `DATA-SCHEMA.md` gains a **C** flag for `compareOnly`.
- **Phase 1 revision after review (2026-10-05).** The user dropped the UNC-Chapel Hill
  `note` and asked for tooltips instead: one on each of the six row headers (what the
  percentages are, which year) and one on every cell (admitted first, then applied, and the
  year). Both are composed at render from **chrome keys** (`compare.ncAdmitTip*`,
  `compare.ncAdmitCell*` in `en.json`) interpolating `{{term}}` / `{{university}}` /
  `{{school}}` / the counts, read from each school's `ncAdmissions` card. The year is
  therefore the same `latestTerm` the school-page card uses and moves with a data refresh.
  Rows carry `rowTip: 'ncAdmit'` (classified skip in `i18n_fields.mjs`). The popover
  mechanics moved from `CellQual` into a shared `TopLayerTip`. `check:ncrows` now asserts
  `rowTip`, refuses any `Fall <year>` typed into a row's label or note, and requires the tip
  keys to interpolate `{{term}}`. Its negative tests (one `rowTip` removed, a typed year in a
  note) each failed with that row's message. The re-splice dropped exactly 1 unit per locale
  (the note) and added 0.
- **Second revision: the year moves into the row label** — `Admit rate (Fall 2025) — UNC-Chapel
  Hill`. Compare renders the header from the chrome key `compare.ncAdmitLabel`
  (`Admit rate (Fall {{term}}) — {{university}}`) with the same card-derived `term`, so the
  year is still never typed. `VALUE_METRICS[].label` stays the year-free source name
  (read by `check:ncrows` and the schema doc). Its nine prose-overlay translations are
  now **unrendered on Compare** (harmless; they still resolve if anything shows `label`).
- **Phase 2 scope therefore changed.** It is **six new chrome keys**
  (`compare.ncAdmitLabel`, `ncAdmitTipKind`, `ncAdmitTip`, `ncAdmitCellKind`,
  `ncAdmitCellAdmitted`, `ncAdmitCellApplied`) in the nine non-English
  `src/locales/*.json` catalogs (`TRANSLATED`), not prose. Reuse the overlay's existing
  "Admit rate" rendering per locale for `ncAdmitLabel`. `Fall {{term}}` translates per
  the dates rule (es `otoño de {{term}}`); university and school names arrive by
  interpolation and stay Latin.
- **Phase 2 (2026-10-05).** The six chrome keys were translated into all nine `TRANSLATED`
  catalogs, inserted after `compare.qualAria`. A JSON round-trip was confirmed
  byte-identical first, and every `{{placeholder}}` was asserted to survive per key. The
  last review then dropped the row tip's closing sentence ("This is not the university's
  overall admit rate; each school's own page adds the five-year rate.") in all ten. Real
  Chrome, all 10 locales: label, row tip and cell tip translated, with 0 English chrome
  left; university and school names stay Latin, and figures render from the card counts.
