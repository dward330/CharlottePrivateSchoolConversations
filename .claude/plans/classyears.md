---
name: classyears
title: College Pipeline class years — Charlotte Catholic to the Providence Day "'26" form, with a type guard
status: implemented
phases: 1
created: 2026-11-09
branch: fix/pipeline-class-years
prs: [463]
---

# College Pipeline class years in one format

## Goal

The College Pipeline card's roster table (Sports area) shows each athlete's graduating class
in its first column. Providence Day and nine other schools show it as `'26`; Charlotte
Catholic shows `2026`. Change Charlotte Catholic's 59 rows to the `'26` form, and add a
type-level guard so a future `/athlete-commits` refresh cannot reintroduce a different form.
Done when every pipeline roster renders `'24`–`'27` and `tsc -b` rejects `cls: '2026'`.

## Context

- The roster type is `Commit` in [src/data/sportsProgram.ts](../../src/data/sportsProgram.ts)
  (around line 184): `cls: string`, whose doc comment already says *Graduating class, e.g. "'26"*.
- It renders verbatim in `RosterRow` in
  [src/components/SportsProgram.tsx](../../src/components/SportsProgram.tsx) (~line 780:
  `<span className="sports-td text-muted">{row.cls}</span>`). `cls` is not used for filtering
  (the filter is by `level`; search covers name/sport/college/conf) or sorting.
- Audit of every `src/data/sportsPrograms/*.ts` (done during planning, `grep -o "cls: ..."`):

  | School | Format | Rows |
  |---|---|---|
  | providence-day | `"'24"`…`"'27"` | 96 |
  | cannon, carmel-christian, charlotte-christian, charlotte-country-day, charlotte-latin, covenant-day, davidson-day, gaston-day, hickory-grove-christian | `"'24"`…`"'27"` | all |
  | **charlotte-catholic** | **`'2024'`, `'2025'`, `'2026'`, `'2027'`** | **20 / 19 / 15 / 5 = 59** |
  | charlotte-prep, trinity-episcopal | no pipeline roster (K–8) | — |

  Charlotte Catholic is the only outlier.
- **i18n:** `cls` is in `SKIP_KEYS` in `scripts/i18n_fields.mjs` (line ~204, `'class year — "\'26"'`),
  so no overlay holds these values and no stamp hashes them. Changing them moves nothing in any
  locale file.
- `npm run build` starts with `tsc -b`, so a narrowed type is enforced in the build.

## Decisions

- **Target form is `"'26"`** — ASCII apostrophe + two digits, exactly as Providence Day and the
  other nine schools store it (not the typographic `’26` used in prose). — It is the established
  form, and the user named Providence Day as the reference.
- **Only `cls` values change.** Prose in `charlotte-catholic.ts` that says "Class of 2024" etc.
  (rankedRecruits, scope note, source labels, the line-310 code comment) stays — that is running
  text, and PD's prose also spells out full years.
- **Add a compile-time guard** by narrowing `cls` to a two-digit template literal type, rather
  than a new script. — Zero new tooling, already enforced by `tsc -b` inside `npm run build`.
- **Single-phase — adds no user-facing text.** `cls` is a skip key (never translated), so the
  change re-renders an untranslated figure field; no locale or overlay work.
- Name `classyears` picked by the planner (session was on `main`).

## Approvals needed

None. Data-format correction to an existing card; no new card, row, key or layout.

## Out of scope

- Class-year text in prose, `metricValues.ts` comments, or `source-material/` files.
- Any change to roster content, counts, funnel, Compare rows.
- Deploying (the user's call, separately).

## Steps

Single-phase — adds no user-facing text.

1. **Branch** — `git checkout main && git pull && git checkout -b fix/pipeline-class-years`.
2. **Rewrite Charlotte Catholic's `cls` values** in
   [src/data/sportsPrograms/charlotte-catholic.ts](../../src/data/sportsPrograms/charlotte-catholic.ts):
   every `cls: '20NN'` → `cls: "'NN"` (59 rows; `2024→'24`, `2025→'25`, `2026→'26`, `2027→'27`).
   A safe mechanical edit:
   `sed -i '' -E "s/cls: '20([0-9]{2})'/cls: \"'\1\"/g" src/data/sportsPrograms/charlotte-catholic.ts`
   Then confirm: `grep -c "cls: '20" …` → `0`, and `grep -o "cls: \"'[0-9]*\"" … | sort | uniq -c`
   → `20 '24`, `19 '25`, `15 '26`, `5 '27`.
3. **Narrow the type** in [src/data/sportsProgram.ts](../../src/data/sportsProgram.ts), on `Commit`:
   ```ts
   type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
   /** Graduating class as an apostrophe + two digits, e.g. "'26" — never "2026" or "’26". */
   export type ClassYear = `'${Digit}${Digit}`
   ...
   cls: ClassYear
   ```
   Keep `Digit` module-local; export `ClassYear` only if something else needs it (grep first —
   nothing does today). Then grep for any other place that constructs a `Commit`/roster row
   (`grep -rn "cls:" src --include=*.ts --include=*.tsx`) to confirm all compile.
4. **Record the rule for future refreshes** — in
   [.claude/skills/athlete-commits/SKILL.md](../skills/athlete-commits/SKILL.md), wherever it
   describes the roster rows it hands to `/plan`, add one line: *roster `cls` is an apostrophe
   plus two digits (`"'26"`), matching Providence Day; `tsc -b` rejects any other form.* This is
   a one-line clarification, not a material change to the skill, so `.claude/SKILLS.md` needs no
   edit — say so in the PR body.
5. **Regenerate / check the schema doc** — `npm run schema && npm run check:schema` (expected:
   no diff, since the generator does not list `cls` values; commit only if it changed).
6. **Commit, PR, merge** — stage explicit paths only (`charlotte-catholic.ts`, `sportsProgram.ts`,
   the skill file, this plan, `INDEX.md`); `git status --short` first. PR body via
   `--body-file`. `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   Flip the INDEX row to *Implemented* with the PR link. **Do not run `npm run deploy`.**

## Verification

1. `npx tsc -b` passes.
2. **Negative test of the guard** — temporarily change one Catholic row back to `cls: '2026'`,
   run `npx tsc -b`, confirm it fails *on that line* with a `ClassYear` assignability error,
   then revert and confirm `git diff` shows only the intended changes.
3. Format audit across every school:
   `for f in src/data/sportsPrograms/*.ts; do grep -o "cls: *[\"'][^,]*" $f; done | sort | uniq -c`
   → only `"'24"`, `"'25"`, `"'26"`, `"'27"`.
4. `npm run build` passes (includes `check:schema`, `check:live`, `check:runtime`).
5. **Browser check** — `npm run dev`, open Charlotte Catholic's page, Sports → open *College
   Pipeline*: the Class column reads `'24`…`'27`, including the `'27` verbal rows; compare
   against Providence Day's card for identical styling. Spot-check one non-English locale
   (`?lang=es`) to confirm the column is unchanged there too.

## Implementation notes

- **Schema doc.** Step 5 expected no diff, but the first draft put an undocumented `type Digit`
  line straight after `CommitLevel`. `unionValues()` in `scripts/gen_data_schema.mjs` stops a
  union only at an `export`/`const`/`function`/`/*` line, so it read `Digit` as part of
  `CommitLevel` and dropped `CommitLevel` from `DATA-SCHEMA.md`. `check:schema` passed, because
  it compares against the regenerated doc. Fixed by giving `Digit` a doc comment. After that,
  regeneration shows no diff. The generator gap (a bare `type` line) is not fixed here.
- The browser check ran against `vite preview` in real Chrome (Playwright). Catholic's column
  in en and es shows 20/19/15/5 for `'24`–`'27`, and its styling matches Providence Day's.
