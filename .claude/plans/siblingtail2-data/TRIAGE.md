# siblingtail2 — Phase 1 triage

Re-triage of the `<Head Noun> (<modifier>)` parenthetical-modifier class in
`course-offerings`, including the three `course-offerings` edits PR #200 shipped.

All measurements taken on branch `i18n/sibling-tail-2` off `main` at 2026-08-24.

## 1. The measurement reproduces

`node .claude/plans/siblingtail2-data/measure_parenmods.mjs` on `main` today reproduces the
plan's *Context* table exactly — no drift:

```
  lang  total  kept  paren-only  HEAD-NOUN
  es       39    16           1         22
  bn       39    33           3          3
  ht       39    29           1          9
  te       39    38           1          0
  fr       39    36           1          2   <- both created by PR #200
  fa       39    38           1          0
  it       39    38           1          0
  hi       39    33           1          5
  ar       39    37           1          1   <- created by PR #200
```

## 2. The pre-#200 baseline is confirmed as fact

The same script run against `569a9bd^` (the commit before PR #200):

```
  lang  total  kept  paren-only  HEAD-NOUN
  te       39    38           1          0
  fr       39    38           1          0   <- was 0
  fa       39    38           1          0
  it       39    38           1          0
  ar       39    38           1          0   <- was 0
```

`fr` and `ar` were both **HEAD-NOUN = 0 of 39**, exactly like `te`/`fa`/`it`. Every
head-noun instance those two locales now hold was created by PR #200. The load-bearing
claim holds; the plan proceeds.

Widened to the full class rather than the 39-row sample, the same fact is sharper still —
**parenthesised course titles, translated / total**:

| lang | no-paren titles | with-paren titles |
|---|---|---|
| `te` | 24/1100 | **0/69** |
| `fa` | 33/1100 | **0/69** |
| `it` | 37/1100 | **0/69** |
| `fr` | 32/1100 | **2/69** ← both from PR #200 |
| `ar` | 29/1100 | **1/69** ← from PR #200 |

Pre-#200, `fr` and `ar` were at 0/69 too. PR #200's three edits are the *only* exceptions
these two locales contain.

## 3. The governing question, answered

> Does a locale's treatment of a **department name** (`Fine Arts` → `Beaux-arts`) license
> translating a **course title's** head noun?

**No. They are demonstrably separate classes, and PR #200's inference was unsound.**

The plan named the exact test: *"whether `te`/`fa`/`it` translate department names while
refusing course titles. If they do, the two fields are demonstrably separate classes."*
They do — measured across all nine locales:

| lang | `departments[].name` translated | `courses[].title` translated |
|---|---|---|
| `es` | 76/85 (89%) | 334/1156 (29%) |
| `bn` | 69/85 (81%) | 69/1156 (6%) |
| `ht` | 75/85 (88%) | 59/1156 (5%) |
| `te` | 61/85 (72%) | 21/1156 (2%) |
| `fr` | 53/85 (62%) | 31/1156 (3%) |
| `fa` | 70/85 (82%) | 27/1156 (2%) |
| `it` | 54/85 (64%) | 34/1156 (3%) |
| `hi` | 74/85 (87%) | 45/1156 (4%) |
| `ar` | 48/85 (56%) | 27/1156 (2%) |

Every locale translates department names at 56–89% and course titles at 2–29%. The gap is
present in all nine, so the field distinction is a project-wide convention, not one
locale's quirk.

**The decisive single case.** Take the *same string*, `Fine Arts`, in both slots:

| lang | `Fine Arts` as department name | `Fine Arts electives` as course title |
|---|---|---|
| `fr` | `Beaux-arts` | **`Options Fine Arts`** — head noun kept |
| `te` | `లలిత కళలు` | **`Fine Arts electives`** — kept entire |
| `fa` | `هنرهای زیبا` | **`Fine Arts electives`** — kept entire |
| `it` | `Belle arti` | `Corsi opzionali di belle arti` — translated |
| `es` | `Bellas artes` | `Optativas de bellas artes` — translated |
| `ht` | `Bozar` | `Elektif Bozar` — translated |
| `ar` | `الفنون الجميلة` | `مواد الفنون الجميلة الاختيارية` — translated |

`fr` translates `Fine Arts` in a department slot and **deliberately keeps it in a course
title** — in its own pre-existing data, untouched by PR #200. That is `fr` answering the
governing question against itself. `te` and `fa` do the same.

### The counter-evidence, weighed

The plan requires the four head-noun-translating locales be weighed explicitly. `es` (22),
`ht` (9), `hi` (5), `bn` (3) all translate these very rows, and their behaviour is
internally consistent — `es`/`ht` also translate `Fine Arts electives`. **Their rows are
not in question and are not touched.** The finding is not "nobody translates this class";
it is "each locale has a settled position, and `fr`/`ar`'s was 0/69 until PR #200".

### The sibling evidence PR #200 actually used, re-examined

PR #200's sibling groups do contain translated *course titles*, so the inference was not
baseless:

- `charlotte-country-day:divisions[0].departments[2]` — `Physical Education` and
  `Library / Information Literacy` are translated by **all nine** locales.
- `cannon:divisions[1].departments[2]` — `World Language Rotation` translated by **all nine**.

But `te`/`fa`/`it` translate those same siblings while still keeping
`Fine Arts (Art, Music, Drama)` and `World Language (daily)` in English. So the sibling
group does **not** discriminate: the real rule these locales follow is *generic
subject-area label → translate; catalog entry a parent looks up → keep*, and the
parenthetical modifier is the marker of the latter. `it`'s kept list makes the same point
without parentheses — `Dual Enrollment: Public Speaking` keeps its colon-suffix in English.

## 4. Verdicts — all 8 rows

**Split: 0 LEAK : 5 KEEP : 3 REVERT.**

| # | Row | Locale | Verdict | Evidence |
|---|---|---|---|---|
| 1 | `Fine Arts (Art, Music, Drama)` | `fr` | **REVERT** | `fr` was 0/69 on parenthesised titles pre-#200, and keeps `Fine Arts` inside the course title `Options Fine Arts` in its own untouched data. |
| 2 | `Fine Arts (Art, Music, Drama)` | `ar` | **REVERT** | `ar` was 0/69 pre-#200. Its `Fine Arts electives` translation is department-adjacent; against a 0/69 course-title record one edit is the exception, not the rule. |
| 3 | `World Language (daily)` | `fr` | **REVERT** | Same 0/69 record. `fr` keeps `Spanish I / French I / Mandarin I` in the same parent group. |
| 4 | `Fine Arts (Art, Music, Drama)` | `te` | **KEEP** | 0/69 parenthesised titles; keeps `Fine Arts electives` entire while translating the `Fine Arts` department name. |
| 5 | `Fine Arts (Art, Music, Drama)` | `fa` | **KEEP** | Identical to `te` — 0/69, keeps `Fine Arts electives` entire. |
| 6 | `Fine Arts (Art, Music, Drama)` | `it` | **KEEP** | 0/69 parenthesised titles. Translates `Fine Arts electives`, so its rule is parenthesis-marked, not noun-marked. |
| 7 | `World Language (daily)` | `te`, `fa`, `it`, `ar` | **KEEP** | 0/69 each; all four keep `Spanish I / French I / Mandarin I` in the same group. |
| 8 | `World Language (Online)` | all nine | **KEEP** | Its parent group (`carmel-christian` dept 5) is `Spanish I`, `Spanish II`, `Spanish III`, `Honors Spanish IV`, `AP Spanish (Language & Culture)` — kept by **every** locale including `es`, which has 22 head-noun translations elsewhere. A 9/9 convention on a catalog group, not a threshold artefact. |

**No row is triaged LEAK.** The plan's stated honest outcome range was 0–5 translated and
0–3 reverted; this lands at 0 translated, 3 reverted.

`World Language (Online)` resolves under the plan's own default: it is a LEAK only for
locales that translate the sibling `World Language (daily)` after Phase 1 settles. After
Phase 1, no locale that kept it translates the sibling — `es`/`ht`/`hi` did already and
still keep `(Online)`, because its parent group is all-Spanish-catalog. KEEP for all nine.

## 5. Reverts applied

Values restored char-for-char from `git show 569a9bd^:…`, never re-typed.

| File | Index | Restored to |
|---|---|---|
| `course-offerings.fr.json` | 1451 | `Fine Arts (Art, Music, Drama)` |
| `course-offerings.fr.json` | 1782 | `World Language (daily)` |
| `course-offerings.ar.json` | 1451 | `Fine Arts (Art, Music, Drama)` |

After the reverts, `fr` and `ar` return to **HEAD-NOUN = 0 of 39** and **0 of 69**,
restoring the uniform pre-#200 convention across `te`/`fr`/`fa`/`it`/`ar`.

## 6. Phase 2 worklist

No forward translations — nothing was triaged LEAK. Phase 2 is ledger-and-verify only:

1. Append the 5 KEEP groups and 3 REVERT rows to `src/data/overlays/NOTES.md`, keyed by
   `(string, locale)`. Each REVERT must state that it reverses part of PR #200 and why.
2. Record the final HEAD-NOUN table in the ledger so the next pass inherits the convention.
3. Re-run **both** detectors × 9 locales; confirm every remaining flag is ledgered.
