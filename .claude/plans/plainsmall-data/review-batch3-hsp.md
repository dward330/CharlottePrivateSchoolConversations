# Plain-language review — src/data/highSchoolPlacementPrograms

Base `b11f2a86` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-prep | 2 |
| trinity-episcopal | 1 |
| **Total** | **3** |

Guards: all pass (paths, digits, URLs/emails, quotes, year spans, non-prose leaves, dates/times, money/percent/year tokens, markers, repeats, worklist-only edits, markdown fields).

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-prep | `outcomes.headline` | 97% of the Class of 2026 were accepted into one or both of their top two high school choices — and Charlotte Prep has published a rate like it for every class since 2023. | 97% of the Class of 2026 were accepted into one or both of their top two high school choices. Charlotte Prep has published a rate like it for every class since 2023. | 30→29 | 10.3→— | pass |  |
| 2 | charlotte-prep | `placement.steps[3].text` | The team meets individually with each 8th grader and separately with each student's parents "to discuss their plans, their objectives for their child, and appropriate placement opportunities." Families are encouraged to visit open houses and tours, and students make day visits to the schools on their list. | The team meets individually with each 8th grader. The team also meets separately with each student's parents "to discuss their plans, their objectives for their child, and appropriate placement opportunities." Families are encouraged to visit open houses and tours. Students make day visits to the schools on their list. | 35→37 | 15.9→7.1 | pass |  |
| 3 | trinity-episcopal | `placement.steps[1].text` | Boarding placement is handled separately and by a different person. It is not a marginal path here: 12% of all graduates since 2004 went to boarding schools, and the destination list includes Deerfield, Lawrenceville, Mercersburg, Woodberry Forest, St. Paul’s and The Taft School. | Boarding placement is handled separately and by a different person. It is not a minor path here: 12% of all graduates since 2004 went to boarding schools. The destination list includes Deerfield, Lawrenceville, Mercersburg, Woodberry Forest, St. Paul’s and The Taft School. | 41→40 | 11.1→8.2 | pass |  |

## Independent review

A fresh `general-purpose` reviewer read all 3 rows. **1 finding, fixed:** charlotte-prep
`placement.steps[3].text`, a bare "It also meets…" after the split → "The team also
meets…". Checked and kept: "accepted", "one or both", "top two", "every class since 2023"
(acceptance, not enrollment); Trinity "went to" (enrollment), "12% of all graduates since
2004" and the six schools in order; the quote and "encouraged".
