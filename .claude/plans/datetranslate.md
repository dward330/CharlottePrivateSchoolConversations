---
name: datetranslate
title: Translate the English-form dates left in 776 translated strings (211 distinct, all 9 prose locales, 10 topics) to each locale's established form, normalize the it/ht first-of-month forms, and add a check:dates build gate
status: implemented
phases: 1
created: 2026-10-04
branch: fix/datetranslate
prs: []
---

# Translate the dates the translations left in English

## Goal

The project has a written date convention: **"the month name and the counter word translate;
the numbers do not"** (`src/data/overlays/NOTES.md`, the "Dates and session labels" rule near
L1960: `Week 1 (Jun 8–11)` → es `Semana 1 (8–11 jun)`, `August 12, 2025` → ar
`12 أغسطس 2025`). Most dated strings follow it. **776 (string, locale) translations do not**:
they leave an English-form date inside otherwise translated prose. For example, ar
`الأسبوع 1 — June 1-5`, ar `بحلول Jan 22, 2027`, te `March 1 లోపు`, and fr
`entre June 1 et July 3`.

**Done when** no translated `t` holds an English month name next to a number, except
verbatim quotes the translation also keeps verbatim. `npm run check:dates` enforces this in
the build. Italian and Kreyòl also write the first of the month one way throughout.

## Context

**Measured 2026-10-04 on `main` @ `99b9ef9a`** with the scan in Appendix A, which looks for
month-then-day, day-then-month and month-then-year, full or abbreviated:

- **776 rows; 211 distinct English strings.**
- **By locale:** te 148, hi 120, fa 99, bn 86, ar 82, fr 78, it 65, es 50, ht 48.
- **By topic:** summer-programs 382, admissions 120, financial-aid-report 120, the-arts 47,
  sports 37, after-school 29, college-support 29, metric-values 7, student-clubs 4,
  course-offerings 1.
- **Biggest fields:** `summer-programs :: catalog.camps[].weeks` (229, e.g.
  `Week 1 — June 1-5`); `catalog.subhead` (49); admissions `steps[].tag` and
  `checklistRows[].due` (44 each, `Nov 2 or Nov 16, 2026`); financial-aid-report `meta`
  (42, `figures as of 15 Aug 2026`); and summer `costPlanner.fees[].label` (37).
- **41 rows put every date inside a quoted span of the English** (`"…"` / `“…”`), for
  example `theatre.season[].detail`, which quotes the school. **These are the legitimate
  KEEPs**, but only where the translation keeps the quote itself verbatim.
- **18 rows are a bare date label left identical to English:** `Nov 2026` (es, fr, ht,
  it), `1 Dec 2026` (ht), `15 Sep` (te), and so on. These are leaks too. NOTES.md (~L2343)
  records that **8 of 8 locales translate `JUN–AUG`**, so a date label is prose, not a
  code. `scripts/find_english_leaks.mjs` likewise lists "month abbreviations inside dates"
  among the Hindi leaks it found.
- **English phrases kept around the date are also leaks:** ar
  `**by October 16**`, `on or before Apr 16`. The fix translates the whole phrase,
  not just the month.

**Each locale's established form**, taken from strings that already follow the rule (the
target for every fix):

| | `Jan 2, 2027` | `Feb 1, 2027` |
|---|---|---|
| es | `2 de enero de 2027` | `1 de febrero de 2027` |
| fr | `2 janvier 2027` | `1er février 2027` |
| it | `2 gennaio 2027` | `1º febbraio 2027` |
| ht | `2 janvye 2027` | `1ye fevriye 2027` |
| bn | `2 জানুয়ারি 2027` | `1 ফেব্রুয়ারি 2027` |
| te | `జనవరి 2, 2027` | `ఫిబ్రవరి 1, 2027` |
| hi | `2 जनवरी 2027` | `1 फ़रवरी 2027` |
| fa | `2 ژانویه 2027` | `1 فوریه 2027` |
| ar | `2 يناير 2027` | `1 فبراير 2027` |

Short labels use each locale's existing abbreviation, for example es `15 feb`, hi
`15 फ़र.`, and bn `ফেব্রু`. Digits stay Western everywhere.

**First-of-month drift.** Italian uses `1º` 30 times and `1°` (a degree sign, U+00B0) 13
times. Kreyòl uses `1ye <month>` 69 times and `1 <month>` 10 times. French is consistent
(`1er`, 73). Some of the drift came from PR #326, the Hickory Grove refresh, which wrote
`1° giugno` and `1 jen`. Normalize to the majority: it `1º` and ht `1ye`.

**Mechanism.** Only `t` changes. English (`text`) is untouched, so every stamp (`of`) and
path (`at`) is unchanged, and no splice or re-extract is needed. Edit `t` in
`src/data/overlays/work/<topic>.<lang>.json`, then rebuild each touched overlay with
`npm run i18n:build -- --topic <topic> --lang <code>`. The method is in
`.claude/docs/prose-translation-architecture.md`. **Join by stamp (`of`), never by array
index** (`CLAUDE.md` testing conventions).

**Figure checks will not object.** `check:sepdrift` asserts that separator-bearing numeric
tokens in `t` also appear in `text`. `31 de julio de 2026` contains none. Dates keep their
digits and the `-`/`–` in ranges char-for-char: `1-5` stays `1-5` and never becomes `1–5`.

## Decisions

- **Single-phase: no English changes.** These correct existing translations to a written
  convention, so there is no new wording for an English review gate to settle.
- **The convention is the existing one**, not a new one. Cite NOTES.md; don't restate a
  rule per locale.
- **Verbatim-quote KEEP rule:** an English date may remain in `t` **only** if the English
  `text` holds it inside a quoted span **and** `t` contains that same quoted span
  verbatim. A quote the locale has already translated gets its dates translated too.
- **No hash allowlist.** `check:dates` decides from the English text, so editing the
  English never leaves a stale exemption behind (the `check:runtime` precedent in `CLAUDE.md`).
- **Translate the whole phrase around the date** (`by October 16`, `on or before`), not
  just the month word.
- **Normalize it `1°` → `1º` and ht `1 <month>` → `1ye <month>`** everywhere, not only on
  the 776 rows.
- **`check:dates` is chained into `npm run build`** once it reads 0. A gate that starts
  red is the failure mode `CLAUDE.md` records three times.
- **Fix with one agent per locale**, each writing its own output file. Shared scratch
  files collide (memory: parallel locale agents). The orchestrator validates every
  output and applies it by stamp.

## Approvals needed

**None.** This corrects translations to an existing convention. It adds no card, section,
key or topic, and changes no layout.

This is **not** deploy authorization. Merge and stop.

## Out of scope

- English source text.
- Clock-time conventions (`a.m.`/`p.m.` per locale): a separate, documented convention.
- Weekday names, unless they sit inside a phrase being re-translated anyway.
- The `src/content` block overlay. The scan found no dated rows there; confirm in step 3.
- Deploying.

## Steps

Single-phase — corrects existing translations; no English text changes.

1. **Branch.** `git checkout main && git pull`, then `git checkout -b fix/datetranslate`.
   Set this plan and the INDEX row to `in-progress`.

2. **Write `scripts/check_date_forms.mjs`** and add
   `"check:dates": "node scripts/check_date_forms.mjs"` to `package.json`.
   - Read every `src/data/overlays/work/*.json` whose locale is in `PROSE_TRANSLATED`
     (parse it from `src/lib/i18n.ts`, never hardcode).
   - **Rule 1, English date:** flag any `t` matching `DATE` from Appendix A, unless every
     matched token is covered by the KEEP rule in Decisions.
   - **Rule 2, first of month:** flag it `1°` before a month name, and ht `\b1 ` before one
     of `janvye fevriye mas avril me jen jiyè out septanm oktòb novanm desanm`.
   - Print counts per locale and topic, plus the first 5 rows each (stamp, `at[0]`, English
     and `t`). Exit 1 on any finding.
   - **Run it now.** Expect about 776 rule-1 rows plus about 23 rule-2 rows. Record the
     baseline. Also run `npm run i18n:leaks -- --lang <code>` for all nine and save the
     outputs as the baseline.

3. **Generate per-locale worklists** with Appendix A's scan plus the rule-2 rows into a
   scratch dir: one `in.<lang>.json` per locale, each row holding `topic`, `of`, `at`,
   `text`, `t` and the offending tokens. Confirm no row's topic is a `src/content` block
   overlay.

4. **Translate with nine parallel agents**, one per locale. Give each one this brief:
   - **Change ONLY the date portion** of `t` and any English words around it (`by`,
     `on or before`, `from`, `to`). Leave everything else in `t` byte-identical.
   - Use the locale form from the Context table, and the locale's own existing
     abbreviations for short labels. Grep that locale's work files for siblings.
   - **Digits and range separators are copied char-for-char.** `June 1-5` becomes
     es `1-5 de junio`; the `-` never turns into `–` and digits never become native. No
     year is added where the English has none.
   - Apply the KEEP rule exactly. Return the row unchanged if it qualifies, and say so.
   - Write `out.<lang>.json` as `{ "<topic>|<of>": "<new t>" }`. Touch nothing else.

5. **Apply by stamp, with a validator.** For each output row, check before writing:
   - the `topic|of` exists;
   - no English date token remains (rule 1, KEEP-aware);
   - the multiset of digit runs is identical to the old `t`;
   - the `**` count is unchanged;
   - fa/ar contain no bidi control characters;
   - the length ratio new/old is within 0.7–1.6.

   Reject and re-ask on any failure. Write the work files with
   `JSON.stringify(…, null, 2)` plus the original trailing newline. Confirm first that
   this round-trips every untouched work file byte-identically.

6. **Normalize first-of-month (rule 2)** in all it/ht work files with the same validator.

7. **Rebuild every touched overlay:** `npm run i18n:build -- --topic <t> --lang <l>` for
   each (topic, locale) pair that changed.

8. **Chain `check:dates` into `build`**, after `check:moneytext`, once it reads 0.

9. **Document it.** In `src/data/overlays/NOTES.md`, under the "Dates and session labels"
   rule, add three things: the KEEP rule, the it `1º` / ht `1ye` forms, and a line saying
   `check:dates` enforces it. Add one sentence to `CLAUDE.md`'s i18n standard pointing to
   `check:dates`.

10. **Verify** (below), commit with explicit paths, push and verify the push, open the PR
    with `--body-file`, merge, then `git checkout main && git pull`. Flip the plan and the
    INDEX row to *Implemented* with the PR link. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `scripts/check_date_forms.mjs` | new: the `check:dates` gate |
| `package.json` | `check:dates`; chained into `build` |
| `src/data/overlays/work/{10 topics}.{9 locales}.json` | `t` fields only |
| `src/data/overlays/{topic}.{lang}.json` | rebuilt by `i18n:build` |
| `src/data/overlays/NOTES.md`, `CLAUDE.md` | KEEP rule, first-of-month forms, check pointer |
| `.claude/plans/datetranslate.md`, `.claude/plans/INDEX.md` | status, PR, notes |

## Verification

- [ ] `check:dates`: baseline about 776 + 23 recorded; after the fix, **0**, exit 0.
- [ ] **Negative test (isolated):** copy one fixed work file, put back a single English
      date in one `t`, and run the checker against the copy. It must report exactly that
      row under rule 1. Do the same for one it `1°` under rule 2. Read which rule printed.
- [ ] **Work-file diff against `main`:** only `t` changed, only on worklist stamps, and
      every `text`, `of` and `at` is byte-identical.
- [ ] `npm run check:runtime`: all 9 locales resolve. `check:live` and `check:script`
      clean.
- [ ] `check:sepdrift -- --lang <code>` ×9: 0 drifted. `check:hi`, `check:fa`, `check:fr`,
      `check:bidi`, `check:moneytext`: clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against the step-2 baseline: no
      new flags. Many date flags should disappear.
- [ ] `npx tsc -b` clean; `npm run build` exits 0 with `check:dates` in the chain.
- [ ] **Browser check (real Chrome, panels forced open):**
      - `/school/charlotte-country-day/?lang=ar` summer catalog: camp weeks read
        `الأسبوع 1 — 1-5 يونيو`.
      - `?lang=es`, Hickory Grove admissions: `2 de nov. o 16 de nov.`-style tags, using
        es's own abbreviation.
      - `?lang=te`, any Financial Aid card: the `meta` line has a Telugu month.
      - `?lang=it`, Hickory Grove: `1º giugno 2027`.
      - Run `npm run audit:moneyrender` once to confirm figures are untouched.

## Risks

| Risk | Mitigation |
|---|---|
| An agent rewrites prose around the date | The validator's digit-multiset and length-ratio checks, plus "byte-identical outside the date" in the brief; the work-file diff shows every change |
| A quote that should stay English gets translated | The KEEP rule is applied by the checker as well as the agents |
| The range separator changes (`1-5` → `1–5`) | The digit-run multiset will not catch that, so the validator also compares `[-–]` counts |
| A Telugu month-first form trips rule 1 | Rule 1 matches only English month names, and te's are in Telugu script |

## Open questions

None.

## Appendix A — the scan (verified 2026-10-04)

```js
const M = '(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)'
const DATE = new RegExp(`\\b${M}\\.? \\d{1,2}(?:st|nd|rd|th)?\\b|\\b\\d{1,2} ${M}\\b\\.?|\\b${M} \\d{4}\\b`, 'g')
const quoteSpans = (s) => [...s.matchAll(/["“]([^"”]+)["”]/g)].map(m => m[1])
// for every work-file entry with a non-empty t:
//   kept = t.match(DATE); if none, skip
//   KEEP iff every kept token sits in some quoteSpans(text) span Q AND t.includes(Q)
```

## Implementation notes

- **Counts.** `check:dates` found **750** rule-1 rows and **21** rule-2 rows (771 total; the
  plan's 776 / ~23 came from a scan that also counted rows the verbatim-quote KEEP clears).
  All 771 were fixed: 771 `t` changes across 61 work files, the same 771 leaves changed in
  the 61 rebuilt overlays (one-for-one, no rebuild regressions), and 0 other fields touched.
- **The `src/content` overlay was NOT date-free.** One row, hi
  `financial-aid-tuition.content` `45fe4467` (`February 15`), was fixed too and rebuilt with
  `i18n_build_content_overlay.mjs`. `check:dates` reads `sections` as well as `strings`, so it
  covers that overlay.
- **KEEP rule refinement.** A US-style quote holds its trailing punctuation
  (`“coming August 2026,”`), so a translation that kept the quote without the comma did not
  count as verbatim. The checker strips trailing `,.;:` from a quoted span before matching.
- **Validator length ratio** is applied only to strings ≥20 chars: `15 Sep` →
  `సెప్టెంబర్ 15` is 2.2× and correct.
- **Seven of the nine translation agents hit a session rate limit** after writing their
  output but before reporting. Every output passed the orchestrator's validator
  (stamp, no English date, digit multiset, `**` count, `-`/`–` counts, no added bidi
  controls, length ratio) and was spot-read across ~8 rows per locale before applying.
- **Out of scope, found by the browser check:** English dates in **figure fields the prose
  extractor skips**: Hickory Grove's stat-tile values and admissions deadline values render
  `Nov 2, 2026` on the `it` page (and every locale). These never reach a work file, so
  `check:dates` cannot see them. Fixing them needs either new `PATH_OVERRIDES` or
  render-time date formatting. That's a separate plan.
- `check:work_integrity` reports every fix as "existing translation overwritten", as
  intended for a correction pass. Its other rules were clean. `check:translations`' 27
  findings are identical on `main`.
