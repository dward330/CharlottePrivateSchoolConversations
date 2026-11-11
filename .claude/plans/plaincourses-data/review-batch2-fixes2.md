# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| covenant-day | 1 |
| **Total** | **1** |

Guards: all pass (paths, digits, URLs/emails, quotes, year spans, non-prose leaves, dates/times, money/percent/year tokens, markers, repeats across schools, markdown fields).

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | covenant-day | `divisions[2].departments[5].courses[1].description` | Multi-digit operations, common multiples and factors, mean, median, mode and range, fractions and decimals across all four operations, customary and metric measurement, perimeter and area, lines and angles, quadrilaterals, congruence and symmetry, and multi-step bar models. | Multi-digit operations, common multiples and factors, mean, median, mode and range, adding and subtracting fractions, decimals across all four operations, customary and metric measurement, perimeter and area, lines and angles, quadrilaterals, congruence and symmetry, and multi-step bar models. | 36→38 | 23.4→24.4 | sentence of 38 words (max 30): "Multi-digit operations, common multiples and factors, mean, median, mode and range, adding…"; reading grade 24.4 (max 12; target 10) over 38 words | grade 24.4 > 10 |

## Evidence (fixes commit 2, found by the Batch 2 independent reviewer)

| Path | Problem | Fix | Evidence |
|---|---|---|---|
| `covenant-day:divisions[2].departments[5].courses[1].description` (Gr 4 Math) | Pre-existing drift from the school's page, made when the row was first condensed: "fractions and decimals across all four operations" says fractions get all four operations. The school lists only adding and subtracting for fractions. | "…mean, median, mode and range, adding and subtracting fractions, decimals across all four operations, customary…" (every other item unchanged, in order) | `source-material/course-offerings/covenant-day/Covenant Day School - Course Offerings - Lower School Curriculum.md` line 154: "fractions (adding and subtracting, equivalent, mixed numbers and improper), decimals (understanding, adding, subtracting, multiplying and dividing)". |

Like Batch 1's `db076885`, this is committed against the original text so that the wording
pass is diffed against corrected facts. The hook still flags the unit here (it was already on the
worklist: 36→38 words); the wording pass fixes that.
