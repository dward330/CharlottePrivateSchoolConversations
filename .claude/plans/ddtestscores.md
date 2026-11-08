---
name: ddtestscores
title: Davidson Day gets SAT and ACT figures on Compare › College Support (Class of 2021, from its 2020–21 profile, the last to print scores) and score tables on its Whole Class card
status: implemented
phases: 2
created: 2026-11-07
branch: feat/ddtestscores
prs: [444]
---

# Davidson Day SAT/ACT: Compare cells and Whole Class score tables

## Goal

Davidson Day is the one high school whose SAT and ACT cells on Compare › College Support
read N/A. Its current profiles withhold scores, but its **2020–21 College Profile**, still
live on the school's own Issuu account, prints a mean and a middle 50% for SAT and ACT. That
profile is the last one with scores. This plan fills Davidson Day's two Compare cells from
the **Class of 2021** figures in it. Each cell gets a qual that says how old the figures
are and how few students took the SAT. The plan also adds matching score tables to Davidson
Day's Whole Class Analytics card, and rewords the card's "withholds all SAT and ACT data"
text, so the school page and Compare agree. Success: Davidson Day's SAT cell reads
Average 1179 / Middle 50% 1060–1230 / (Class of 2021), its ACT cell reads 23 / 18–26, and
every figure traces to the committed source file. All ten locales.

## Context

- **The rows.** `sat-scores` and `act-scores` are the first two College Support rows in
  `VALUE_METRICS`, `src/data/metricValues.ts` (about lines 300–410). They were shipped by
  plan [`testscores`](testscores.md) (#439), which is the reference for their shape. Each
  row has `values[slug]` (it mirrors the first non-null of median → mean → mid50),
  `subs[slug]` (`(Class of YYYY)`), `scores[slug]` (`{ median, mean, mid50 }`) and
  optional `quals[slug]`. Davidson Day is `'davidson-day': null, // withholds all test data
  by choice` in both rows, with no `subs`/`scores` entry.
- **Both row `note`s end "…; Davidson Day publishes no test scores."** That clause becomes
  false and must go.
- **`check:scores`** (`scripts/check_score_rows.mjs`, chained into `npm run build`)
  enforces the mirror, the en-dash range format, `(Class of YYYY)` sub-lines, SAT/ACT
  agreement on which schools have data and on the class, and **traceability**: every
  figure, both endpoints of each range, and the class year must appear verbatim in
  `src/data/collegeSupportPrograms/<slug>.ts`. So Davidson Day's figures must appear on
  its card, which is the main reason the card gets score tables. The user chose
  "Compare + card".
- **The card.** `src/data/collegeSupportPrograms/davidson-day.ts`, `wholeClass` (about line
  706): `headline` says "Davidson Day withholds all SAT and ACT data by choice — …Class of
  2027”", `scoreTables: []` with a comment explaining the omission, and the first `flags[]`
  entry (`kind: 'gap'`) says "All SAT and ACT data is withheld…". The file's header comment
  (lines 13–17) says the Whole Class card "carries no score tables". The `ScoreTable` type
  is in `src/data/collegeSupport.ts` (about line 383). Values are six columns: 10th, 25th,
  50th, 75th, 90th, mean, with `'—'` for an unpublished percentile. The pattern to copy is
  Providence Day's mean + middle-50% tables
  (`src/data/collegeSupportPrograms/providence-day.ts` about line 818). Gaston Day's
  per-year row labels (`'SAT total — 2025'`) are the precedent for more than one class in
  one table.
- **Other card text stays true** and is left alone: the checklist question "The Profile
  says you won’t provide testing profiles. What were the actual middle-50% SAT and ACT
  ranges for the last class…" (about line 797), the transcript subhead "The School Profile
  does the work test scores would otherwise do", and the verdict item "The Profile does
  the work test scores would". All of these describe the current profile.
- **The data has been verified.** It was read during planning from the profile's page images
  and saved to `source-material/college-support/davidson-day/Davidson Day - College
  Support - School Profile 2020-2021.md`. That file also records why 2020–21 is the latest:
  the 2022–23, 2023–24, 2024–25, 2025–26 and 2026–27 profiles each withhold scores in the
  school's own words. The 2021–22 edition can't be read because Issuu overwrote it in place.
- **Ingest routing.** The new file's subtopic "School Profile 2020-2021" matches the
  `college-support` rule `{ match: /school profile/i, key: 'outcomes' }` in
  `src/lib/metrics.ts` (about line 220), the same rule as the other schools' "School
  Profile 2026-2027" files. It should not create a new card. `check:metrics` confirms.
- **Coverage floor.** `npm run coverage:floor` today: Davidson Day is the floor school at
  **28/44 (63%)**, 9/12 areas. With two more filled rows it becomes **30/44 (68%)**. The
  next-thinnest schools are at 34, so Davidson Day stays the floor school and the bar rises
  to ≥30 of 44. CLAUDE.md, `.claude/skills/add-school/SKILL.md` and `.claude/SKILLS.md`
  quote 28/44 and 63% in several places.
- **i18n.** No chrome keys change. Prose changes land in two overlay topics:
  `metric-values` (two edited notes, two new quals, the new `values`/`subs` cells) and
  `college-support` (the headline, the gap flag, and the new score tables' titles, hints,
  row labels and notes, plus a sources label). No `VALUE_METRICS` row is inserted or
  moved, so the index-path shift from memory `metric-values-midarray-insert-shifts-paths`
  does not apply. Still splice by stamp. Locales: `PROSE_TRANSLATED` = es bn ht te fr fa
  it hi ar.

## Decisions

- **Class of 2021, not 2020** (user, 2026-11-07). It is the latest class the school
  published. Compare figures: SAT mean `1179`, mid50 `1060–1230`; ACT mean `23`, mid50
  `18–26`; median null for both, because no median is published.
- **Compare + card** (user, 2026-11-07). The card gets score tables and its "withholds all"
  wording is narrowed to "since the Class of 2021". This keeps the school page from
  contradicting Compare, and lets `check:scores` trace the figures without changing the
  checker.
- **Plan name `ddtestscores`** (user).
- **Using a superseded profile is the user's explicit call.** It overrides the usual
  current-data preference (memory `no-sections-from-non-current-data`) for this one case.
  The document is still live on the school's own Issuu account, and every surface labels
  the class year and the source profile. No other figure from the 2020–21 profile (old
  GPA, enrollment, 2015–2020 acceptance list) enters the app.
- **A `scope` qual on both Davidson Day cells.** The figures are 5–6 years older than any
  other school's, and the SAT sample is 12 of 53. A parent must see both facts on the
  Compare cell itself. The qual dot attaches to the first published line, the Average,
  as the testscores implementation does.
- **The card tables include the Class of 2020 as a second row.** The profile prints both
  classes side by side, and the school itself says it added 2020 because 2021's testing was
  COVID-limited. Compare shows only 2021.
- **Ranges use an en dash** (`1060–1230`) in Compare, as `check:scores` requires. The card
  splits them into the 25th/75th columns. Digits are never changed.
- **The research note about the unrecoverable 2021–22 edition is dev-only.** It goes in a
  `kind: 'verify'` flag, never in prose (CLAUDE.md "Research bookkeeping is dev-only").
- **No checker or component change.** The existing render (`score-stack`) and checks cover
  a new filled cell.

## Approvals needed

**None outstanding.** The user asked for Davidson Day's figures on Compare and chose the
card change in planning (2026-11-07). No new card, row, metric key or section is added.
The score-table block already exists on this card type and is only empty for Davidson Day,
so filling it is data enrichment.

## Source material

- `source-material/college-support/davidson-day/Davidson Day - College Support - School
  Profile 2020-2021.md`, **written during planning, uncommitted, not yet ingested.**
  Source: https://issuu.com/davidsondayschool/docs/dds80-college_profile-2020-21_online
  (pages read as images). It also cites the later profiles' withholding statements.
  `/implement` ingests it in step 2.

## Out of scope

- No change to any other school's cells or cards.
- No other 2020–21 figures (GPA distribution, enrollment, merit totals, the 2015–2020
  acceptance list).
- No Class of 2020 figures on Compare.
- No change to `check:scores`, `Compare.tsx` or CSS.
- No deploy. Publishing is the user's call, every time.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/ddtestscores`.

2. **Ingest the source file.** Run the `ingest-source-material` skill for
   `source-material/college-support/davidson-day/Davidson Day - College Support - School
   Profile 2020-2021.md`. Confirm the new subtopic maps to `outcomes` and creates no new
   metric key: `npm run check:metrics` shows no new ⚠️. If `schools.json` reorders, restore
   HEAD order (memory `two-topic-ingest-reorders-manifest`).

3. **Card: `src/data/collegeSupportPrograms/davidson-day.ts`.**
   - Add a constant near `PROFILE`/`CATALOG` (about line 325):
     `const PROFILE_2021 = 'https://issuu.com/davidsondayschool/docs/dds80-college_profile-2020-21_online'`.
   - **Header comment (lines 13–17):** reword point 1. The school has withheld testing
     profiles for every class since 2021. The Whole Class card carries the last published
     scores (Classes of 2021 and 2020, from the 2020–21 profile). The AP-score and merit
     blocks stay absent.
   - `wholeClass.headline` →
     `'Davidson Day has published no SAT or ACT scores since its 2020–21 profile — the current one says “due to the popularity of test-optional policies, we will not be providing the testing profiles for the Class of 2027”.'`
   - Replace the `// No score tables at all…` comment and `scoreTables: []` with a short
     comment ("last published scores: 2020–21 profile; see source-material … School
     Profile 2020-2021.md") and:
     ```ts
     scoreTables: [
       {
         title: 'SAT score percentiles',
         hint: '— Class of 2021 · 12 testers (of 53) · 2020–21 School Profile',
         rows: [
           { label: 'SAT total — Class of 2021', values: ['—', '1060', '—', '1230', '—', '1179'] },
           { label: 'SAT EBRW — Class of 2021', values: ['—', '510', '—', '600', '—', '590'] },
           { label: 'SAT Math — Class of 2021', values: ['—', '550', '—', '640', '—', '589'] },
           { label: 'SAT total — Class of 2020', values: ['—', '1090', '—', '1320', '—', '1198'] },
         ],
         note:
           'These are the last SAT scores the school has published, from its 2020–21 profile. The school says COVID-19 limited the Class of 2021’s testing: only 12 of its 53 seniors had taken the SAT, so it printed the Class of 2020 (43 testers) beside it. The middle-50% endpoints ARE the 25th and 75th percentiles; the 10th, 50th and 90th are shown as “—” because the school does not publish them.',
       },
       {
         title: 'ACT composite percentiles',
         hint: '— Class of 2021 · 43 testers (of 53) · 2020–21 School Profile',
         rows: [
           { label: 'ACT composite — Class of 2021', values: ['—', '18', '—', '26', '—', '23'] },
           { label: 'ACT composite — Class of 2020', values: ['—', '22', '—', '29', '—', '24'] },
         ],
         note:
           'From the same profile: 43 students in the Class of 2021 and 51 in the Class of 2020 took the ACT. Every profile since has withheld testing data.',
       },
     ],
     ```
     Re-read every figure against the source file before typing. If one differs, the
     source file wins. Note it under Implementation notes.
   - First `flags[]` entry (`kind: 'gap'`), text →
     `'For every class after 2021, all SAT and ACT data is withheld — means, ranges, and even the number of testers. The count of testers is as revealing as the scores, since it shows whether a class is testing at all; neither is available. This is a disclosure decision tied to test-optional admissions, not a signal about how students score.'`
   - Append (last, so existing flag indices do not shift) a dev-only flag:
     `{ kind: 'verify', text: 'Latest-scores check, 2026-11-07: the 2022–23 through 2026–27 profiles all withhold testing. The 2021–22 edition (Issuu slug dds81-college_profile-2022-22_online) was overwritten in place and could not be read, so a Class of 2022 figure, if it was ever printed, is unseen. Record: School Profile 2020-2021.md.' }`.
     First confirm `'verify'` is a valid flag kind in `src/data/collegeSupport.ts`. If it
     is not, drop the flag and put the note in a code comment instead.
   - `wholeClass.sources`: insert after the 2026–27 profile entry
     `{ label: 'Issuu — College Profile 2020–21 (the last profile to print SAT and ACT scores)', url: PROFILE_2021 }`.

4. **Compare: `src/data/metricValues.ts`.**
   - In **both** row `note`s, delete `; Davidson Day publishes no test scores` so each ends
     `…A dash means the school does not publish that figure.`
   - `sat-scores`: `values['davidson-day'] = '1179'` (drop the "withholds" comment),
     `subs['davidson-day'] = '(Class of 2021)'`,
     `scores['davidson-day'] = { median: null, mean: '1179', mid50: '1060–1230' }` (en dash),
     `quals['davidson-day'] = { kind: 'scope', text: 'From the school’s 2020–21 profile, the last to print test scores: only 12 of 53 seniors had taken the SAT, a sample the school attributes to COVID-19. Every later profile withholds scores.' }`.
   - `act-scores`: `values['davidson-day'] = '23'`, `subs['davidson-day'] = '(Class of 2021)'`,
     `scores['davidson-day'] = { median: null, mean: '23', mid50: '18–26' }`,
     `quals['davidson-day'] = { kind: 'scope', text: 'From the school’s 2020–21 profile, the last to print test scores: 43 of 53 seniors took the ACT. Every later profile withholds scores.' }`.
   - Place each new key in the same slug order the row already uses (Davidson Day last).

5. **Floor documentation.** Run `npm run coverage:floor` and take the numbers from its
   output. Expected: Davidson Day still the floor school, **30/44 (68%)**, 9/12 areas. Then
   update every dated floor figure:
   - `CLAUDE.md` "Adding a school": lines ~97–99 (`28/44 Compare rows (**63%**)`,
     `≥28 of 44`, `exactly 28/44 passes, 27/44 does not`) become 30/44, 68%, ≥30, and
     30 passes / 29 does not. Date it 2026-11-07 and say Davidson Day's SAT/ACT cells
     filled from its 2020–21 profile. Line ~102 ("both null for Davidson Day, which publishes no
     test scores") gets a note that they were filled later the same day. Lines ~130–136:
     "school-wide 63%", "the 63% is a rate", "a 63% per-area gate", and "“63%” is
     unreachable" become 68%. The 75% quantization point still holds.
   - `.claude/skills/add-school/SKILL.md`: lines ~216, 223, 268, 292–321, 346 and 473
     (`63%`, `≥28/44`, `28/44`, `27/44 (61%)`) take the new figures. 29/44 is 65%. Use the
     script's floor rounding, never round up.
   - `.claude/SKILLS.md` lines ~94–97 (the `63%` mentions in the add-school entry). This
     is a material change to how a skill gates, so it lands in this PR per the SKILLS.md
     rule.
   - Grep afterwards: `grep -rn "63%\|28/44\|≥28" CLAUDE.md .claude/skills .claude/SKILLS.md`.
     Each remaining hit must be a deliberate historical mention.
   - Leave `scripts/coverage_floor.mjs`'s historical `23/36` comment alone.

6. **Regenerate and check.** `npm run schema` (expect Davidson Day's SAT/ACT cells to
   appear in `DATA-SCHEMA.md`), then `npm run check:scores`, `npm run check:quals`,
   `npm run check:metrics`, `npx tsc -b`, `npm run build`. In Phase 1, `check:live` may
   report the changed English units as awaiting translation. That is expected (see
   ddprofile2's Phase 1 notes).

7. **Schema-doc rule check.** No new data-schema rule is expected. The generator needs no
   edit. Say so explicitly in the report.

8. **Commit Phase 1.** Run `git status --short` first and stage explicit paths only: the
   source file, `schools.json` and `.claude/docs/college-support/davidson-day.md` from the
   ingest, the card, `metricValues.ts`, `DATA-SCHEMA.md`, CLAUDE.md, the two skill docs,
   this plan and INDEX.md. Push, then verify the push (`git rev-parse HEAD` against
   `git ls-remote origin feat/ddtestscores`). Open the PR with `--body-file`. Set
   `status: english-done` and the INDEX row to **English shipped**.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Review
points: Davidson Day's two Compare cells and their qual tooltips, the reworded row notes,
the card headline, the two score tables (Class of 2020 row included?), and the reworded gap
flag. Nothing below runs until the user confirms.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on overlay
topics **`metric-values`** and **`college-support`**. **No chrome catalogs.** Mechanism:
`.claude/docs/prose-translation-architecture.md`. The proven recipe is `ddprofile2`'s
Phase 2 (and `testscores` for metric-values cells).

1. **Dry-run the extract** to a throwaway `--lang __verify` and confirm the exact new-unit
   diff: 2 edited notes, 2 new quals, Davidson Day `values`/`subs` cells (metric-values);
   the headline, the gap flag, 2 table titles, 2 hints, 6 row labels, 2 notes and 1 source
   label (college-support). Confirm no `scores.*` leaf and no score-table `values` cell was
   extracted. Those are figure-only.
2. **Splice by stamp:** `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`
   for each locale × topic. Dry-run one locale first and explain the added and dropped
   counts. Never pop stamps: a stamp can recur across topics (memory `pdprofile-shipped`).
3. **Translate.** The two notes lost only a trailing clause, so edit each locale's
   existing `t` and keep its wording. Translate the rest by hand, reusing each locale's
   terms from Davidson Day's existing college-support units and the other schools' score
   tables (`SAT score percentiles`, `Class of 2026`, `testers`). Copy figures
   char-for-char (`1179`, `1060–1230`, `18–26`, `12`, `53`, `43`, `2020–21`). Keep `SAT`,
   `ACT`, `EBRW` and `COVID-19` in Latin script. Keep the quoted 2027 sentence in the
   headline the way each locale already handles it (check the current headline's
   translation, since only the framing changed).
4. **Build overlays** (`i18n_build_overlay.mjs` per locale × topic), then run the checks
   below. Commit to the same branch and PR, merge (`gh pr merge --squash
   --delete-branch`), pull `main`, flip the INDEX row to **Implemented** with the PR link,
   and add `## Implementation notes` if anything deviated. **Do not deploy.** Say "merged —
   ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2020-2021.md` | new (written in planning) |
| `src/data/schools.json`, `.claude/docs/college-support/davidson-day.md` | regenerated by ingest |
| `src/data/collegeSupportPrograms/davidson-day.ts` | header comment, headline, two score tables, gap flag, verify flag, source |
| `src/data/metricValues.ts` | two notes; Davidson Day values/subs/scores/quals on both rows |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `CLAUDE.md`, `.claude/skills/add-school/SKILL.md`, `.claude/SKILLS.md` | floor 28/44 (63%) → 30/44 (68%) |
| metric-values + college-support work files and overlays ×9 (Phase 2) | spliced and translated |
| `.claude/plans/INDEX.md`, this plan | status, PR, notes |

## Verification

### Phase 1 — English

- [ ] `npm run check:metrics`: no new ⚠️ (the 2020-2021 file folds into `outcomes`)
- [ ] `npm run check:scores`: passes, and the reported cell count rises by 2
- [ ] `npm run check:quals`: no new flags
- [ ] `npm run coverage:floor`: Davidson Day 30/44 (68%), still the floor school; the docs match
- [ ] `npm run check:schema`: clean after `npm run schema`
- [ ] `npx tsc -b`: clean
- [ ] `npm run build`: green, apart from `check:live` listing the changed English units awaiting translation
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright):
      Compare › College Support with Davidson Day selected. The SAT cell reads Average
      `1179`, Middle 50% `1060–1230`, `(Class of 2021)`, with a qual dot on the Average
      whose tooltip has the correct text. The ACT cell reads `23` / `18–26`. No leader
      tint. Row notes no longer mention Davidson Day.
- [ ] Browser: `/school/davidson-day`, College Support, Whole Class card opened. The two
      tables render with the 25th/75th/mean columns filled and the rest "—". The headline
      and gap flag show the new text. The verify flag shows on the dev server only and is
      absent from the preview build.
- [ ] `npm run audit:mobile`: no overflow at 320/360/390 with the card open

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all nine locales resolve
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted;
      `python3 scripts/check_figures.py --lang <code> --topic <topic>` for both topics
- [ ] `npm run check:digits`: no finding on the new units
- [ ] `npm run check:dates`, `check:fr`, `check:bidi`, `check:moneytext`: clean
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, filtered to the touched paths: 0
- [ ] Browser, `fa` and `ar`: `1060–1230` and `18–26` read low–high. Verify by glyph-x
      position, not by text. Spot-check `bn` (native digits) and `hi`.
- [ ] `npm run build`: exit 0

## Risks

| Risk | Mitigation |
|---|---|
| A parent reads a 2021 figure as current | `(Class of 2021)` sub-line + scope qual on both cells + card hints name the 2020–21 profile |
| The 12-tester SAT mean is over-read | The qual and card note state 12 of 53 |
| The ingest slugifies the new file into an orphan card | The existing `/school profile/i → outcomes` rule; `check:metrics` |
| Floor docs go stale again | Step 5 takes figures from the script and greps for leftovers |

## Implementation notes

- **Phase 1 (2026-11-07).** Built as planned, and every figure matched the source file. The
  ingest reordered `schools.json` again, so the documents were put back in HEAD order and the
  new one inserted, leaving an 11-line diff. While updating the floor docs, two other stale
  figures were also fixed: the add-school SKILL.md said "7 of the areas" where the script
  derives 9, and SKILLS.md said "not 36" where it should say 44. The PR was opened after
  Phase 2 rather than at step 8, following `/implement`'s Phase 1 gate. The user approved the
  English, and Phase 2 ran in the same window.
- **Phase 2.** The splice paired exactly: per locale, metric-values had 6 added and 2 dropped,
  and college-support had 14 added and 2 dropped. That is 20 units, one more than planned,
  because the dev-only `verify` flag is also extracted, so it was translated too. Contrary to
  the plan, the `values['davidson-day']` cell (`1179`) was extracted. It is figure-only, and
  its `t` is the figure. No source label and no `SAT score percentiles` title were added,
  because both stamps already existed. Each row note's `t` is the shipped translation with
  only its final Davidson Day clause cut. `check:digits` compared 180 units and flagged 0.
  `i18n:leaks` had 0 flags on the touched paths. A glyph-x check in fa, ar, bn, hi and es
  confirmed low→high ranges.
- **No deploy.**
