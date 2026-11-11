# Plain-language review — src/data/afterSchoolPrograms

Base `main` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 1 |
| carmel-christian | 0 |
| charlotte-christian | 0 |
| charlotte-country-day | 1 |
| charlotte-latin | 0 |
| charlotte-prep | 0 |
| covenant-day | 0 |
| davidson-day | 0 |
| gaston-day | 0 |
| hickory-grove-christian | 0 |
| providence-day | 0 |
| trinity-episcopal | 0 |
| **Total** | **2** |

Guards: **4 FAILED**.

- (n) cannon:verdict.strengths[4]: count words differ -six
- (f) charlotte-country-day:dayInside.flags[4].kind: non-prose leaf added
- (f) charlotte-country-day:dayInside.flags[4].text: non-prose leaf added
- (l) charlotte-country-day:dayInside.flags[0].text: ** 2→0 in a field that does not render markdown

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `verdict.strengths[4]` | **The deepest published enrichment catalog of the six** — 22 distinct classes in a single session spanning robotics, ballet, chess, pottery, golf and photography, each with a named provider and a real fee. | **The largest fully priced enrichment catalog on this site** — 22 distinct classes in a single session, from robotics, ballet and chess to pottery, golf and photography. Each has a named provider and a real fee. | 31→34 | 15.9→9.4 | pass |  |
| 2 | charlotte-country-day | `dayInside.flags[0].text` | The enrichment catalog is invisible to prospective families. The school advertises "more than 25 after-school enrichment classes" — music, art, science, chess, karate, cheerleading, field hockey, baseball, volleyball, SAT/ACT prep, coding, drama, robotics — but the class list lives behind the UltraCamp portal, which returned **zero results** when checked. No public page gives names with days, grades and fees. | Families looking at the school cannot see the enrichment catalog. The school advertises "more than 25 after-school enrichment classes". Its examples: music · art · science · chess · karate · cheerleading · field hockey · baseball · volleyball · SAT/ACT prep · coding · drama · robotics. But the class list sits behind the UltraCamp registration portal, so it is not public. No public page gives names with days, grades and fees. | 52→56 | 10.7→4.7 | pass | UNPUBLISHED 1→2 |

## Evidence and expected guard hits (plan plainsmall, Step 2a)

These are the Batch 1 fixes, landed before the wording pass so its guards compare
against the fixed text. Run without `--check`. The four guard hits are by design:

| Guard | Unit | Why it fires |
|---|---|---|
| (n) | cannon `verdict.strengths[4]` | "of the six" is the stale claim being removed |
| (f) ×2 | charlotte-country-day `dayInside.flags[4].kind` / `.text` | the appended dev-only `verify` flag (new leaves; appended, so no existing `flags[N]` moved) |
| (l) | charlotte-country-day `dayInside.flags[0].text` | **zero results** moved into the verify flag with its bold |

**Cannon "deepest … of the six" → "largest fully priced … on this site".** Re-measured
2026-11-10 from `dayInside.classes` in all 12 `src/data/afterSchoolPrograms/*.ts` files,
counting a field as published only when it is not the `—` placeholder:

| School | Classes | With a day | With a fee | With a grade range |
|---|--:|--:|--:|--:|
| cannon | 22 | 22 | 22 | 22 |
| providence-day | 15 | 15 | 15 | 15 |
| charlotte-latin | 27 | 0 | 0 | 27, all `'LS'` (the whole Lower School, so no per-class range) |
| charlotte-prep | 9 | 0 | 0 | 9 |
| trinity-episcopal | 4 | 0 | 0 | 4 |
| carmel-christian, charlotte-christian, charlotte-country-day, davidson-day, gaston-day, hickory-grove-christian | 0 | — | — | — |
| covenant-day | no catalog | — | — | — |

So "deepest" (by count) is false since Latin lists 27, and "of the six" is stale with 12
After School schools. "Largest fully priced" is true: Cannon's 22 beat PD's 15, the only
other catalog with a day and a fee for every class.

**CCD UltraCamp note → dev-only verify flag.** "which returned **zero results** when
checked" reports what a research check saw, not what the school publishes. The prose keeps
the parent point ("it is not public"; "No public page gives names with days, grades and
fees"). The check result moves to the appended `{ kind: 'verify' }` flag, which renders on
the dev server only. The source does not record when the portal was checked, so no date
was added. The quoted school phrase is byte-identical, and the 13-item list became a `·`
run with every item in order.
