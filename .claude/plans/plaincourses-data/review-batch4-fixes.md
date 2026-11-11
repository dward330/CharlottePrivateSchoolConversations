# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-catholic | 1 |
| **Total** | **1** |

Guards: **1 FAILED**.

- (p) charlotte-catholic:divisions[0].departments[10].courses[4].description: name gone "Spanish"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-catholic | `divisions[0].departments[10].courses[4].description` | This course is designed to prepare the student for Honors Spanish IV or AP French Language and Culture, developing in the student a greater comprehension and understanding of more complex reading, writing, listening and speaking. | This course is designed to prepare the student for Honors French IV or AP French Language and Culture, developing in the student a greater comprehension and understanding of more complex reading, writing, listening and speaking. | 35→35 | 18.0→17.6 | sentence of 35 words (max 30): "This course is designed to prepare the student for Honors French IV…"; reading grade 17.6 (max 12; target 10) over 35 words | caps gone: Spanish; grade 17.6 > 10 |

## Evidence (Batch 4 fixes commit — the plan's default, Open questions)

| Path | Problem | Fix | Evidence |
|---|---|---|---|
| `charlotte-catholic:divisions[0].departments[10].courses[4].description` (Honors French III) | The school's guide itself says the French course prepares students "for Honors Spanish IV" (a typing error in the guide, carried into the app) | "Honors French IV" | The guide's French ladder: course 441 "Honors French IV" (`Charlotte Catholic - Course Offerings - Curriculum Guide 2026-2027.md` line 305), and AP French V's prerequisite "Honors French IV with a minimum B average or Honors French III with a minimum A average" (`… Curriculum Guide Full Descriptions 2026-2027.md` line 385). Honors Spanish III's own entry is the one that leads to Honors Spanish IV. |

The provenance header of the full-descriptions file records the guide's error as printed; this
fix changes only the app text. The hook still flags the unit (it was on the worklist); the
wording pass rewrites it.
