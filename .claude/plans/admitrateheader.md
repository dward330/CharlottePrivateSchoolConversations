---
name: admitrateheader
title: NC admissions ledger — "Admit rate from <School name>" column header
status: implemented
phases: 2
created: 2026-11-09
branch: feat/admitrateheader
prs: [464]
---

# NC admissions ledger: "Admit rate from <School name>" column header

## Goal

The College Support card *Admission Rates at the Top NC Public Universities* has a ledger
whose rate column is headed **"Admit rate from this school"**. On a school's own page,
"this school" is ambiguous: the row is a university, so "this school" can read as
*that university*. The header should name the school instead, e.g. **"Admit rate from
Providence Day School"**. It works when every school page's ledger header (and the
stacked phone-width label) shows that page's school name in all ten locales.

## Context

- The header is the chrome key `tables.ncAdmitRate` in `src/locales/en.json:611`
  (`"Admit rate from this school"`). It has a translation in all ten catalogs
  (`ar bn en es fa fr hi ht it te`).
- It is rendered twice in `NcAdmissionsBody` in `src/components/CollegeSupport.tsx`:
  - the `<th className="cs-th cs-th-rate">` (line ~257)
  - the `data-label` on the rate `<td>` (line ~277), which is the label shown when the
    table stacks into one block per university at ≤600px.
  These are the only two uses (`grep -rn ncAdmitRate src`).
- `NcAdmissionsBody({ data })` takes no school name today. Its only caller is
  `CollegeSupportCardBody` in `src/pages/SchoolDetail.tsx` (`case 'ncAdmissions'`, line
  ~294), which **already receives `schoolName`** (passed in as `school.name` at
  line ~1234) and already forwards it to `CounselingBody`. So the plumbing is one prop.
- Nearest precedent for a `{{school}}` chrome interpolation: `compare.ncAdmitCellAdmitted`
  (`"Admitted: {{admitted}} — students from {{school}} whom …"`), also passed
  `school.name`. Follow that pattern.
- The card currently ships for 11 schools (every high school in
  `src/data/collegeSupportPrograms/` with an `ncAdmissions` key). The longest name is
  "Hickory Grove Christian School".
- The column is fixed at `width: 200px` (`.cs-th-rate`, `src/index.css:4754`); the header
  is 10.5px uppercase with 0.1em tracking and already wraps to two lines (see the
  user's screenshot). A full school name will wrap to two or three lines.
- The Compare page uses its own `compare.ncAdmit*` keys and is not affected.

## Decisions

- **Use the school's full `school.name`** (from `schools.json`), not a shortened form —
  it is what every other `{{school}}` chrome string uses, and there is no short-name
  field to draw from. Do not invent one by stripping " School".
- **Keep the key name `tables.ncAdmitRate`** and change its value to interpolate
  `{{school}}`. Renaming the key buys nothing and touches more lines.
- **Lowercase "from"** in English: `"Admit rate from {{school}}"`. The header is rendered
  uppercase by CSS anyway; the `data-label` on phones shows sentence case.
- **Both render sites get the name** — the `<th>` and the stacked `data-label` — since they
  share the key and the phone label has the same ambiguity.
- **Accept a two-to-three-line wrap** in the header rather than widening the column; the
  `thead` row grows a little. Only if the browser check shows the header breaking
  mid-word or overflowing the 200px cell should the implementer raise it with the user
  (do not change the column width or styling unasked).
- **No UX approval gate** — this is a wording change the user asked for directly, not a
  new card, row or layout change.

## Approvals needed

None.

## Out of scope

- Any other header in the ledger (`Applied`, `Accepted`, `5-yr avg`).
- The Compare page's NC admit rows and tooltips.
- The card title, teaser, takeaway sentence or `sections.ncLedgerTerm` heading.
- Column widths or any CSS.

## Steps

Two-phase — changes a user-facing chrome string.

### Phase 1 — English

1. **Branch** — `git checkout -b feat/admitrateheader` from an up-to-date `main`.
2. **Plumb the name** — in `src/components/CollegeSupport.tsx`, change
   `NcAdmissionsBody({ data }: { data: NcAdmissions })` to also take
   `schoolName: string` (with a one-line doc comment: "For the rate column's header,
   'Admit rate from <School name>'"). Replace both `t('tables.ncAdmitRate')` calls with
   `t('tables.ncAdmitRate', { school: schoolName })` — compute it once into a local
   `const rateLabel` and use it for the `<th>` and the `data-label`.
3. **Pass it in** — in `src/pages/SchoolDetail.tsx`, `CollegeSupportCardBody`'s
   `case 'ncAdmissions'`: `<NcAdmissionsBody data={program.ncAdmissions!} schoolName={schoolName} />`.
   Update the `schoolName` prop's doc comment there to mention both uses.
4. **English string** — `src/locales/en.json`: `"ncAdmitRate": "Admit rate from {{school}}"`.
   Leave the other nine catalogs untouched in this phase (they still say "this school"
   in their language — correct, just not yet updated; `check:chrome` reports nothing
   missing since the key exists everywhere).
5. **Type check and checks** — `npx tsc -b`, `npm run check:chrome`, `npm run build`.
6. **Browser check (English)** — `npm run build && npx vite preview`, open the College
   Support area on Providence Day and Hickory Grove Christian (longest name), expand the
   NC admissions card, and confirm: header reads "ADMIT RATE FROM PROVIDENCE DAY SCHOOL",
   wraps cleanly within the 200px column, nothing overflows. Then at 360px width confirm
   the stacked per-university label reads "Admit rate from Hickory Grove Christian School"
   and fits. Screenshot both for the user.
7. **Commit** (stage the three paths explicitly) and push; open the PR as draft or note
   in the body that Phase 2 follows.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing
below runs until they confirm the English wording.

### Phase 2 — Every other locale

UI chrome only — the `src/locales/*.json` catalogs in `TRANSLATED` (`src/lib/i18n.ts`):
`ar bn es fa fr hi ht it te`. No overlay / `PROSE_TRANSLATED` work.

8. **Translate `tables.ncAdmitRate`** in each of the nine catalogs, replacing the
   "this school" phrase with `{{school}}` and placing it where the language's grammar
   wants it (postpositional languages put it before the particle). Starting points,
   derived from the current values — adjust for naturalness:
   - es `Tasa de admisión desde {{school}}`
   - fr `Taux d'admission depuis {{school}}`
   - it `Tasso di ammissione da {{school}}`
   - ht `To admisyon soti nan {{school}}`
   - hi `{{school}} से प्रवेश दर`
   - bn `{{school}} থেকে ভর্তির হার`
   - te `{{school}} నుండి ప్రవేశ రేటు`
   - fa `نرخ پذیرش از {{school}}`
   - ar `نسبة القبول من {{school}}`
   The school name stays in English (it is a proper noun from `schools.json`); in `fa`/`ar`
   a strong-L Latin name needs no bidi isolate (see the i18n standard in `CLAUDE.md`).
9. **Checks** — `npm run check:chrome`, `npm run build`.
10. **Browser check (locales)** — on Providence Day, view the card with `?lang=es`,
    `?lang=fa` and `?lang=hi`; confirm the name interpolates (no literal `{{school}}`),
    and in `fa` the Latin name sits correctly inside the RTL header.
11. **Commit, mark PR ready, merge** (`gh pr merge --squash --delete-branch`), pull `main`,
    flip the INDEX row to Implemented with the PR link. Do **not** deploy.

## Verification

### Phase 1
- `npx tsc -b` clean; `npm run check:chrome` and `npm run build` pass.
- Browser: header and phone-width stacked label show the school's name on Providence Day
  and Hickory Grove Christian, no overflow at desktop or 360px.

### Phase 2
- `npm run check:chrome` and `npm run build` pass.
- Browser: `es`, `fa`, `hi` pages show the translated header with the English school name
  interpolated; no `{{school}}` literal anywhere (`grep -n "ncAdmitRate" src/locales/*.json`
  — every value contains `{{school}}`).
