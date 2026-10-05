---
name: figuredates
title: Translate the English dates and words left in skipped figure fields (admissions deadline strip + stat tiles, clubs service tiles) by promoting three paths to prose, plus a rendered-page date census
status: in-progress
phases: 1
created: 2026-10-05
branch: fix/figuredates
prs: []
---

# Translate the dates the extractor never saw

## Goal

Every locale's admissions guide shows its key dates in English: the deadline strip under
the band selector and the stat tiles at the top of the Admissions topic. For example, the
Italian Hickory Grove page shows `Nov 2, 2026` and `Nov 16, 2026` beside fully translated
prose. These are `value` fields that the prose extractor skips as "numeric stat figure", so
they never reach a work file, and `check:dates` (PR #329) cannot see them.

**Done when:**
- a rendered-page census finds no English-form date outside the deliberate exclusions on
  any school, Compare or checklist page in any of the nine prose locales;
- the census ships as `npm run audit:daterender` so the next skipped field is found by a
  scan, not by a reader.

## Context

**Measured 2026-10-05 on `main` @ `0c107e02`.** Real Chrome; every school, Compare and
checklist page; all `<details>` open; every admissions band tab clicked; the Latest News
subtree excluded. The prototype script is described in step 6.

| Render site (class) | es | te | What it is |
|---|---|---|---|
| `adm-deadline-val` | 39 | 39 | `guide.bands[].deadlines[].value`: the 4-tile deadline strip, `AdmissionsProgram.tsx` L114–116 |
| `stat-tile-val` (Admissions) | 14 | 14 | `guide.stats[].value`: `AdmissionsStatBand`, `AdmissionsProgram.tsx` L421–428 |
| `clubs-program-val` | 1 | 1 | `service.programs[].value`: Charlotte Catholic `March 1` |
| `prose-table` | 1 | 1 | Gaston Day `src/content/financial-aid-tuition/gaston-day.json` table cell `February 1 – March 1`. **By design**, see Out of scope. |
| `as-flag`, `as-mark-row`, `sports-note`, `adx-panel-list` | 4 | 3 | Dates inside verbatim quotes of the school (`“coming August 2026”`, `"Thursday, February 1, 2026"`, Trinity's `"…on Feb. 8…"`). **Legitimate KEEPs** under NOTES.md's date rule. |

So **53 of the 59 es findings are two admissions fields**, across the seven schools that
have an `admissionsPrograms/*.ts` file.

**Every distinct value in those two admissions fields** (counted from
`src/data/admissionsPrograms/*.ts`): `Jan 15, 2027` ×23, `Feb 26, 2027` ×18,
`Jan 2, 2027` ×12, `Apr 9, 2027` ×9, `Apr 16, 2027` ×7, `$500` ×6, `Nov 2, 2026` ×5,
`Nov 16, 2026` ×5, `Feb 1, 2027` ×5, `Mar 5, 2027` ×4, `$2,500` ×4, `$275` ×3, `$100` ×2,
and once each `TOEFL Jr. 750+`, `Oct 10, 2026`, `Fri Feb 26, 2027`, `Fri Apr 9, 2027`,
`Before day one` and `10%`. `Before day one` is an English phrase in a figure field, the
same leak shape with no date in it.

**Most are already translated.** The work file holds one entry per distinct English
string, with every site listed in `at`. The identical date strings already exist as
`*.checklistRows[].due` entries, which were promoted to prose for exactly this reason (see
the comment above `['*.checklistRows[].due', true]` in `scripts/i18n_fields.mjs`). They
were then fixed to locale form by PR #329. A splice therefore reuses 11 of the 19 strings'
translations and adds `at` paths. **Only 8 strings per locale are new:** `Nov 2, 2026` and
`Nov 16, 2026`, which need translating, and `$500`, `$2,500`, `$275`, `$100`,
`TOEFL Jr. 750+` and `10%`, which round-trip identical. Verified for es/te/ht. The
splice's ADDED column gives the exact count per locale.

**`service.programs[].value` (Student Clubs, the service card)** holds 36 values across
12 schools, mostly figures (`70`, `~10,000`, `100%`). Nine carry English: `March 1`,
`1 hr/wk`, `20 hrs`, `40 hrs`, `25 hrs`, `req.`, `Gr. 6`, `Yr-long` and `a mile`. Each is
rendered beside a translated `valueLabel`.

**The nearest precedent is `['cost.fees[].value', true]`** in `PATH_OVERRIDES`: a `value`
field that holds phrases and dates as often as figures, promoted by path so `value` stays a
skip everywhere else. `localizeMoneyText()` still runs at render on the translated text, so
`$500` keeps localizing exactly as today.

**Why not render-time localization** (an `Intl.DateTimeFormat` pass like `money()`):
- `ht` has no Intl locale data and would render English;
- `fa` defaults to the Persian calendar, and bn/fa/ar emit native digits unless forced;
- te's corpus form (`జనవరి 2, 2027`) and hi's abbreviations differ from Intl's output, so
  a tile would disagree with the prose beside it;
- `Before day one` and `20 hrs` are not dates, so a date formatter cannot fix them.

Extraction reuses translations that already follow the corpus convention, and
`check:dates` then guards the new entries automatically.

**Consumers.** `deadlines[].value` and `guide.stats[].value` are read only by the two
render sites above (`grep -rn "deadlines\|guide?.stats" src`). React keys use `label`, not
`value`. Nothing parses or compares the value, so translating it is safe.

## Decisions

- **Promote three paths, not the `value` leaf.** `CLAUDE.md` records that extracting
  `value` app-wide would send every figure through translation. Path-scoped overrides avoid
  that, per the `cost.fees[].value` precedent.
- **Include `service.programs[].value`.** It is a different path from the `value` rows
  `CLAUDE.md` records as deliberately left (`artsPrograms` `2 years` / `1 credit`, and
  College Support `year`), so it does not re-open that decision. The user can veto; see
  Open questions.
- **Single-phase: no English changes.** These translate existing, already-published
  English. There is no new wording for an English review gate to settle. This is the same
  call as `datetranslate`.
- **Figures round-trip identical** (`$500` → `$500`), the way every locale already handles
  `metric-values` cells such as `66 / 75`. Localization stays `localizeMoneyText()`'s job
  at render.
- **The census is a manual audit, not a build gate.** It needs a served build, exactly
  like `audit:moneyrender`. Its exclusions are structural (quotes, the news subtree,
  verbatim markdown tables), never a hash or string allowlist, so it can read 0.
- **Join by stamp via `i18n_splice_work.mjs`, never re-extract** (memory and CLAUDE.md:
  re-extracting blanks a translated work file).

## Approvals needed

**None.** No card, section, key, topic or layout changes. This is translation coverage for
data that already renders. **Not deploy authorization**: merge and stop.

## Out of scope

- **The Gaston Day `prose-table` cell.** `src/content` markdown table rows are verbatim by
  design: `isVerbatimLine()` in `scripts/i18n_extract_content.mjs` keeps tuition grids and
  Wayback rows untranslated as citations.
- **Dates in verbatim quotes.** These are the NOTES.md KEEP.
- **The other `value` rows `CLAUDE.md` records as deliberately left.**
- Telugu's year-first `2027 ఫిబ్రవరి 26, శుక్ర` and the es `Vie 26 de feb de 2027` style.
  These are existing translations reused as-is; a style pass is separate.
- Deploying.

## Steps

Single-phase — translates existing English; no English text changes.

1. **Branch.** `git checkout main && git pull && git checkout -b fix/figuredates`. Set
   this plan and its INDEX row to `in-progress`.

2. **Add three `PATH_OVERRIDES` entries** in `scripts/i18n_fields.mjs`.
   - Put the admissions pair in the `admissions` block, directly after
     `['*.checklistRows[].due', true]`, with a comment in that file's style. Say these hold
     the same dates as `due` plus figures, and that `Before day one` is the leak shape:
     ```js
     ['guide.bands[].deadlines[].value', true],
     ['guide.stats[].value', true],
     ```
   - Put the clubs entry with a comment listing its English values (`March 1`,
     `20 hrs`, `Yr-long`, `a mile`, …):
     ```js
     ['service.programs[].value', true],
     ```
   - Confirm the paths match: `node scripts/i18n_extract.mjs --report --residual` should
     exit 0. Then run a throwaway extract to check that the new strings appear:
     `node scripts/i18n_extract.mjs --topic admissions --lang __probe --out /tmp/<dir>`
     (and `--topic student-clubs`), grep for `deadlines[0].value`, and delete the temp dir.

3. **Splice, never re-extract.** Run
   `node scripts/i18n_splice_work.mjs --lang <l> --topic admissions` and
   `--topic student-clubs` for each of the nine `PROSE_TRANSLATED` locales. Record
   KEPT/ADDED/DROPPED per topic. Expect admissions ADDED ≈ 8 and student-clubs ADDED ≈ 36
   less any value already present as a string elsewhere. **DROPPED must be 0.** Anything
   else means a misconfigured extract: stop and investigate.

4. **Fill the new entries** (every `t: ''` the splice added, in all nine locales).
   - **Figures** (no letters, or only `TOEFL Jr.`-style identifiers): set `t = text`.
   - **Dates** (`Nov 2, 2026`, `Nov 16, 2026`, `March 1`): use each locale's form from
     `.claude/plans/datetranslate.md`'s Context table. Copy the locale's existing rendering
     of the same date if one exists. For example, the work files already hold
     `2 de noviembre de 2026`-style strings from PR #329; grep `admissions.<l>.json`.
   - **Unit words** (`20 hrs`, `1 hr/wk`, `req.`, `Gr. 6`, `Yr-long`, `a mile`): translate
     the words and copy digits char-for-char.
   - With ~11 strings to translate per locale this is small enough to do directly. If you
     use agents, use **one agent per locale, each writing its own output file** (memory:
     parallel locale agents collide), then apply by stamp with the datetranslate validator
     rules: digit multiset, `-`/`–` counts, no bidi controls for fa/ar.

5. **Rebuild overlays.** For each locale, run
   `npm run i18n:build -- --topic admissions --lang <l>` and the same for `student-clubs`.

6. **Add `scripts/audit_date_render.mjs`** and
   `"audit:daterender": "node scripts/audit_date_render.mjs"` in `package.json` (beside
   `audit:moneyrender`).
   - Model it on `scripts/audit_money_render.mjs`: same route list, band clicking,
     `<details>` opening, `domcontentloaded` + settle wait, headed Chrome via
     `channel: 'chrome'`, and the exit codes 0/1/2.
   - Differences from the money audit:
     - **Locales:** all `PROSE_TRANSLATED`, parsed from `src/lib/i18n.ts` with the
       `export const PROSE_TRANSLATED` anchor. An English month name is detectable in
       every script, so no `SCANNABLE` restriction applies.
     - **Detector:** the `DATE` regex from `scripts/check_date_forms.mjs`. Copy it; do not
       import that file, which runs at module scope.
     - **Exclusions, all structural:**
       1. any ancestor whose class starts with `news-` (the Latest News section is never
          translated, by `CLAUDE.md`'s one exception);
       2. any element under `.prose-table` (verbatim markdown tables);
       3. a date token inside a quoted span of the rendered text (`“…”`, `"…"`, `«…»`,
          `„…“`). That is the NOTES.md verbatim-quote KEEP.
     - Read `schools.json` relative to `ROOT`. The money audit's `join(ROOT, …)` resolves
       correctly only when the script lives in `scripts/`.
     - Watch for automatic semicolon insertion: a line beginning `(` after a line ending
       `]` (the prototype tripped on this).
   - **Write the doc header** naming what it found when written: 53 deadline/stat-tile
     dates plus 1 clubs date per locale.

7. **Document.**
   - `CLAUDE.md`: next to the `check:dates` paragraph, add a sentence. Say that
     `check:dates` sees only extracted strings, and that `npm run audit:daterender` (served
     build) is the render-site census for dates in skipped figure fields, mirroring the
     `audit:moneyrender` paragraph.
   - `src/data/overlays/NOTES.md`, "Dates and session labels": add one line pointing to the
     audit.
   - Add a comment above each new `PATH_OVERRIDES` entry (done in step 2).

8. **Verify** (below), then commit with explicit paths. Push and verify the push, open the
   PR with `--body-file`, squash-merge, then `git checkout main && git pull`. Flip the
   plan and INDEX row to *Implemented* with the PR link. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `scripts/i18n_fields.mjs` | 3 `PATH_OVERRIDES` entries + comments |
| `src/data/overlays/work/{admissions,student-clubs}.{9 locales}.json` | spliced: new entries filled, `at` refreshed |
| `src/data/overlays/{admissions,student-clubs}.{9 locales}.json` | rebuilt |
| `scripts/audit_date_render.mjs` | new: the rendered-page date census |
| `package.json` | `audit:daterender` |
| `CLAUDE.md`, `src/data/overlays/NOTES.md` | pointer to the audit |
| `.claude/plans/figuredates.md`, `.claude/plans/INDEX.md` | status, PR |

## Verification

- [ ] `node scripts/i18n_extract.mjs --report --residual`: exit 0, with no unclassified
      fields.
- [ ] Splice report: DROPPED 0 for both topics in all nine locales.
- [ ] Work-file diff vs `main`: no pre-existing `t` or `text` changed. Only added entries
      and `at` refreshes. Use the same diff method as the `#330` re-splice: compare by `of`.
- [ ] `npm run check:dates`: 0. It now covers the new entries.
- [ ] `npm run check:translations`: admissions and student-clubs at 100% with 0 STALE in
      all nine locales.
- [ ] `npm run check:runtime`, `check:live`, `check:script`, `check:hi`, `check:fa`,
      `check:fr`, `check:bidi`, `check:moneytext`: clean.
      `npm run check:sepdrift -- --lang <l>` ×9: 0.
- [ ] `npm run i18n:leaks -- --lang <l>` ×9: no new flags versus a pre-change baseline.
- [ ] `npx tsc -b`; `npm run build` exits 0.
- [ ] **Negative test (isolated):** on a copied work dir, blank one filled date's `t`
      back to English, run `check:dates --dir <copy>`, and confirm exactly that row is
      reported under rule 1.
- [ ] **Browser census:** `npm run build && npx vite preview`, then
      `npm run audit:daterender`. It should report **0 in all nine locales**. Before the
      fix, it should reproduce 54 per locale (53 admissions + 1 clubs), which proves the
      detector. Run it on `main` first or on a stash-free copy; **never `git stash`** in
      this tree (memory).
- [ ] **Spot-check in real Chrome:** it Hickory Grove shows `2 novembre 2026` in the
      deadline strip and stat tiles; es Covenant Day shows `2 de enero de 2027` tiles beside
      the `$100` tile, which still renders `100 US$`; ht Trinity shows a Kreyòl date in the
      deadline strip; ar Charlotte Catholic's service tile shows `1 مارس`.
- [ ] `npm run audit:moneyrender`: still clean for es/fr. Figures in the newly extracted
      fields must still localize.

## Risks

| Risk | Mitigation |
|---|---|
| A path pattern doesn't match and nothing is extracted, which passes silently | Step 2's throwaway extract greps for the new path, and the census must drop to 0 |
| A splice re-keys or blanks existing translations | Use `i18n_splice_work.mjs` only; DROPPED 0; the by-`of` diff shows 0 changed `t` |
| A translated `$500` stops localizing | The render still calls `localizeMoneyText()` on the overlay value, and `audit:moneyrender` verifies it |
| The audit parks at a non-zero count | Exclusions are structural, and the plan requires 0 before merge |

## Open questions

- **Include the clubs `service.programs[].value` path?** Default: **yes.** It is the only
  other dated skipped field the census found, and it also clears eight English unit words.
  If the user prefers not to touch `value` beyond admissions, drop that override and its
  splice. The census then needs a documented reason for the one Charlotte Catholic
  `March 1`, and it cannot read 0.
