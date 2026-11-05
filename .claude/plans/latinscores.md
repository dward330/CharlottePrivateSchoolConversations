---
name: latinscores
title: Add Charlotte Latin's SAT and ACT section averages (2026–27 profile) to the Whole Class card — two per-class tables
status: english-done
phases: 2
created: 2026-11-04
branch: feat/latin-scores
prs: []
---

# Add Charlotte Latin's SAT and ACT section averages

## Goal

Charlotte Latin's College Support **Whole Class** card shows only the SAT total and the
ACT composite average for each class. The school's 2026–27 Upper School Profile also prints
**section averages**: SAT Math and Reading & Writing, and ACT English, Math, Reading and
Science. This plan adds them by replacing the one two-row table with **two tables, one per
class (2026 and 2027)**, each listing every section beside the total, with the tester count
in the table's hint. Success means a parent can read every average the profile prints, each
figure exactly as printed, in all ten locales.

## Context

- **The data is already in the repo, committed in #419.** See the "SAT and ACT results"
  section of
  `source-material/college-support/charlotte-latin/Charlotte Latin - College Support - School Profile 2026-2027.md`
  (about lines 184–200). It holds these figures, all means and all "as of 8/6/26":

  | | SAT N | SAT Math | SAT R&W | SAT Total | ACT N | ACT English | ACT Math | ACT Reading | ACT Science Reasoning | ACT Composite |
  |---|---|---|---|---|---|---|---|---|---|---|
  | Class of 2026 | 123 | 650.0 | 658.5 | 1308.5 | 58 | 27.5 | 27.2 | 27.9 | 26.1 | 27.2 |
  | Class of 2027 | 117 | 656.8 | 646.2 | 1303.0 | 79 | 28.5 | 29.0 | 29.2 | 28.5 | 28.8 |

  The source PDF is
  <https://resources.finalsite.net/images/v1793645005/charlottelatin/izzo9suck4uojytpwadd/2026_27UpperSchoolProfileforCC1.pdf>
  (`PROFILE_2627` in the data file). **No new fetch is needed and no source file changes, so
  there is no ingest step.**
- **The current table** is in `src/data/collegeSupportPrograms/charlotte-latin.ts`, under
  `wholeClass.scoreTables`, at about lines 780–795:

  ```ts
  scoreTables: [
    {
      title: 'SAT & ACT class means',
      hint: '— as of 8/6/26 · testers shown per row',
      noPercentiles: true,
      rows: [
        { label: 'Class of 2026', values: ['SAT 1308.5 (N=123)', 'ACT 27.2 (N=58)'] },
        { label: 'Class of 2027', values: ['SAT 1303.0 (N=117)', 'ACT 28.8 (N=79)'] },
      ],
      note: 'Means only — the profile prints no percentiles or middle-50% band. The Class of 2027 is still testing, so its figures are partial. The Class of 2026’s size is not printed, so no testing rate can be computed.',
    },
  ],
  ```

- **How the table renders:** `src/components/CollegeSupport.tsx`, about lines 762–803. A
  `noPercentiles` table has **no header row**. Each row is the label cell followed by one
  cell per `values` entry. The React key is `t.title`, so **two tables need distinct titles**.
- **Which strings get translated** (`scripts/i18n_fields.mjs`):
  - Score-table `title`, `hint`, row `label` and `note` are extracted and translated.
  - Row `values` are **skipped** as "score-table cell — figures and em-dashes". A section
    name inside a value (`'Math 650.0'`) would therefore render English in every locale.
    **Section names go in the row label; values stay bare figures.**
- **The row-label precedent** is Providence Day (`providence-day.ts` ~805–825) and Country
  Day (`charlotte-country-day.ts` ~748–765): `'SAT total'`, `'Reading & Writing'`,
  `'SAT Math'`, `'ACT composite'`, `'ACT English'`, `'ACT Math'`. All six are **already
  translated in all nine locales**. Only `'ACT Reading'` and `'ACT Science'` are new.
- **Prose around the table needs no change:**
  - The wholeClass headline says Latin publishes "SAT and ACT means".
  - The subhead says "The figures are means, not distributions".
  - `flags[0]` says "Means only".
  - None of these claims that section scores are missing; the step-3 grep confirms.
  - Compare has no SAT or ACT row, so `metricValues.ts` is untouched.

## Decisions

- **Scope is SAT/ACT section averages only** (user, 2026-11-04). The user was offered AP
  results by subject, the Seal of Biliteracy and a grades-by-course table, and chose only
  this. **GPA percentiles are not in the PDF.** It prints no GPA distribution, quintiles or
  deciles, so the plan adds none and `quintiles` stays `[]`.
- **Two tables, one per class, not one table per test** — a means-only table has no header
  row (the noPercentiles rule), so a table with two value columns could not say which column
  is which class. One class per table keeps every cell unambiguous, with the class and its
  tester counts in the title and hint.
- **Keep `noPercentiles: true`** — these are means. A mean is never filed under the
  percentile header (standing rule, memory `wholeclass-nopercentiles-rule`). Do **not** use
  Providence Day's six-column percentile layout with five `'—'` cells.
- **Row labels reuse Providence Day's translated strings.** The rows are, in this order:
  `'SAT total'`, `'Reading & Writing'`, `'SAT Math'`, `'ACT composite'`, `'ACT English'`,
  `'ACT Math'`, `'ACT Reading'`, `'ACT Science'`.
  - The order is total first, then sections, matching PD.
  - The profile's "Reading and Writing" becomes PD's `'Reading & Writing'`, and
    "Science Reasoning" becomes `'ACT Science'`. These labels are our own names for each
    row; only the figures must be char-for-char.
- **Figures stay char-for-char, decimals included:** `650.0`, `1303.0`, `29.0`. Never
  `650` or `1303`.
- **The existing note moves, unchanged, to the second table**, so its translation carries
  over. The first table has no note, so the caveat appears once, below both tables.
- **Titles and hints, exact strings:**
  - Table 1: title `'SAT & ACT means, Class of 2026'`, hint
    `'— as of 8/6/26 · 123 SAT and 58 ACT testers'`.
  - Table 2: title `'SAT & ACT means, Class of 2027'`, hint
    `'— as of 8/6/26 · 117 SAT and 79 ACT testers'`.
  - `'Class of 2027'` as a row label retires; Covenant Day still uses `'Class of 2026'`.

## Approvals needed

None. This adds rows to the existing `scoreTables` field of an existing card, which is data
enrichment under the UX standard. Covenant Day, Carmel Christian and Hickory Grove already
render two score tables in this card. The user asked for this data directly (2026-11-04).

## Out of scope

- AP results by subject, the Class of 2027 AP record (136 students, 357 exams, 95.23%), the
  Global Seal of Biliteracy, the grade-distribution tables and the fast facts (1,555
  enrollment, 100 faculty, 60% advanced degrees). All were offered and not chosen; they are
  available in the same source file for a later plan.
- Any Compare row for SAT or ACT. No metric key exists, and adding one needs UX approval.
- Changes to other schools' tables.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/latin-scores` from an up-to-date `main`. Other sessions
   are working in this tree: stage explicit paths only, and never `git stash`.
2. **Replace the table.** In `src/data/collegeSupportPrograms/charlotte-latin.ts`, replace
   the single `wholeClass.scoreTables` entry with the following. Keep the comment above the
   array, and add one line noting section scores come from the same profile page.

   ```ts
   scoreTables: [
     {
       title: 'SAT & ACT means, Class of 2026',
       hint: '— as of 8/6/26 · 123 SAT and 58 ACT testers',
       noPercentiles: true,
       rows: [
         { label: 'SAT total', values: ['1308.5'] },
         { label: 'Reading & Writing', values: ['658.5'] },
         { label: 'SAT Math', values: ['650.0'] },
         { label: 'ACT composite', values: ['27.2'] },
         { label: 'ACT English', values: ['27.5'] },
         { label: 'ACT Math', values: ['27.2'] },
         { label: 'ACT Reading', values: ['27.9'] },
         { label: 'ACT Science', values: ['26.1'] },
       ],
     },
     {
       title: 'SAT & ACT means, Class of 2027',
       hint: '— as of 8/6/26 · 117 SAT and 79 ACT testers',
       noPercentiles: true,
       rows: [
         { label: 'SAT total', values: ['1303.0'] },
         { label: 'Reading & Writing', values: ['646.2'] },
         { label: 'SAT Math', values: ['656.8'] },
         { label: 'ACT composite', values: ['28.8'] },
         { label: 'ACT English', values: ['28.5'] },
         { label: 'ACT Math', values: ['29.0'] },
         { label: 'ACT Reading', values: ['29.2'] },
         { label: 'ACT Science', values: ['28.5'] },
       ],
       note: 'Means only — the profile prints no percentiles or middle-50% band. The Class of 2027 is still testing, so its figures are partial. The Class of 2026’s size is not printed, so no testing rate can be computed.',
     },
   ],
   ```

   Copy the `note` **byte-for-byte** from the current file, including the curly `’`, rather
   than from this plan, so its stamp is unchanged.
3. **Prose sweep.** Run
   `grep -n -i "section\|composite only\|total only\|SAT 1308.5\|ACT 27.2 (N" src/data/collegeSupportPrograms/charlotte-latin.ts`
   and expect no prose claiming section scores are unpublished, and no leftover old cell
   strings. Read `wholeClass` `headline`, `subhead`, `middle` and `flags` once in full to
   confirm nothing contradicts the new tables.
4. **Schema doc.** Run `npm run schema`, then `npm run check:schema`. Commit
   `.claude/docs/DATA-SCHEMA.md` only if it changed.
5. **Verify** (Phase 1 list below). Commit with explicit paths, push, and confirm
   `git rev-parse HEAD` equals `git ls-remote origin feat/latin-scores`. Set this plan's
   status to `english-done` and the INDEX row to *English shipped*, staging **only** this
   plan's row (another session's rows may be unstaged in `INDEX.md`; build the staged blob
   from `HEAD` as `latinprofile` did). Stop for the user's review.

**→ STOP. `/implement` ends its turn here and waits for the user's review.**

### Phase 2 — Every other locale

**Scope:** prose overlays only, topic `college-support`, for `PROSE_TRANSLATED`: es, bn,
ht, te, fr, fa, it, hi, ar. There are no `src/locales/*.json` changes. The mechanism is in
`.claude/docs/prose-translation-architecture.md`, and per-locale traps are in
`src/data/overlays/NOTES.md`.

6. **Measure.** Run
   `node scripts/i18n_extract.mjs --topic college-support --lang xx --out <scratch>` and
   diff the stamps against `src/data/overlays/work/college-support.es.json`.
   - **Expect 6 new units:** 2 titles, 2 hints, `'ACT Reading'` and `'ACT Science'`.
   - **Expect 3 retired units:** the old title, the old hint and the `'Class of 2027'` row
     label.
   - The six reused labels and the note should be carried units with new `at` paths. If the
     note shows as new, step 2 changed its bytes; fix the English, don't translate it.
7. **Translate the 6 units per locale, splicing by stamp.** Never re-extract in place (it
   blanks every `t`).
   - Base the titles on each locale's existing `'SAT & ACT class averages'` (Covenant Day)
     and `'SAT & ACT class means'` wording, and its own "Class of 2026" convention: es
     `Promoción de 2026`, fr `promotion 2026`, ht `Klas 2026`, fa `دورهٔ 2026`,
     ar `دفعة 2026`. bn, te, it and hi keep `Class of 2026`.
   - Base the `'ACT Reading'` and `'ACT Science'` wording on each locale's `'ACT English'`
     and `'ACT Math'` (e.g. es `ACT Inglés` → `ACT Lectura`, `ACT Ciencias`).
   - Copy figures char-for-char (`8/6/26`, `123`, `58`, `117`, `79`). fa and ar store no
     bidi isolates.
8. **Build overlays:**
   `node scripts/i18n_build_overlay.mjs --topic college-support --lang <code>` ×9.
9. **Verify** (Phase 2 list), commit with explicit paths, push, open the PR with
   `--body-file`, then `gh pr merge --squash --delete-branch`. If its local checkout fails
   because of another session's unstaged `INDEX.md` row, copy the file aside, run
   `git checkout HEAD -- .claude/plans/INDEX.md`, switch to `main` and pull, re-apply the
   row, and delete the branch by hand. Flip this plan to `implemented` (`prs: [N]`) and the
   INDEX row to *Implemented* inside the PR before merging. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupportPrograms/charlotte-latin.ts` | edit: one score table becomes two per-class tables with section rows |
| `.claude/docs/DATA-SCHEMA.md` | regenerated only if it changes |
| `src/data/overlays/work/college-support.<lang>.json` ×9 + `src/data/overlays/college-support.<lang>.json` ×9 | Phase 2 |
| `.claude/plans/latinscores.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean.
- [ ] `npm run check:schema`: passes.
- [ ] `npm run build`: fails **only** at `check:live`, with findings limited to the new
      Latin `wholeClass.scoreTables` units (expected until Phase 2). Run the checks after it
      in the chain (`check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`,
      `check:spans`, `check:news`, `check:photos`) separately; each should pass.
- [ ] **Browser check (required).**
  - Setup: `npx vite build && npm run prerender`, then `npx vite preview`. Use Playwright
    with real Chrome (`channel: 'chrome'`) and `domcontentloaded`, **not** `networkidle`.
    Open **every `<details>`**.
  - On `/school/charlotte-latin/`, College Support, Whole Class: two tables appear, titled
    "SAT & ACT means, Class of 2026" and "… Class of 2027". Each has 8 rows and **no header
    row**. Every figure matches the Context table, including `650.0`, `1303.0` and `29.0`.
    The note appears once, below the second table.
  - Titles render uppercase by CSS, so assert on `textContent`, not `innerText`.
- [ ] `npm run audit:mobile -- --only charlotte-latin`: 0 page overflow at 320/360/390px.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**, with `check:live` and `check:runtime` green.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted tokens. `1308.5`, `650.0`
      and `8/6/26` are all separator-bearing.
- [ ] `python3 scripts/check_figures.py --topic college-support --lang <code>` ×9: figures
      intact.
- [ ] `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script` and `check:dates`:
      clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: foreign-script
      separation clean. Unit-count "violations" are expected after a splice.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, filtered to the new `at` paths: no hits, or
      only a locale's established English keep.
- [ ] **Browser:** `/school/charlotte-latin/?lang=es` and `?lang=ar`, every `<details>`
      open. Both titles and the two new labels are translated, and the figures are intact.

## Risks

| Risk | Mitigation |
|---|---|
| The note's bytes change, so 9 translations go stale for no reason | Copy it from the current file, not from this plan. Step 6 flags it as new if this happened |
| A figure loses its trailing zero (`650` for `650.0`) | `check_figures.py`, plus the browser assertion on `650.0`, `1303.0` and `29.0` |
| A section name is put in `values`, where it is never translated | Labels only. Values hold bare figures (step 2) |
