# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-christian | 4 |
| cannon | 0 |
| davidson-day | 1 |
| **Total** | **5** |

Guards: **5 FAILED**.

- (p) charlotte-christian:divisions[2].departments[2].courses[8].description: name new "AP"
- (p) charlotte-christian:divisions[2].departments[2].courses[8].description: name new "May"
- (h) charlotte-christian:divisions[2].departments[2].courses[8].description: REQUIRED marker added (0→1)
- (h) charlotte-christian:divisions[2].departments[2].courses[8].description: LEVEL marker added (0→1)
- (h) charlotte-christian:divisions[2].departments[2].courses[8].description: EXAM marker added (0→1)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-christian | `divisions[2].departments[1].courses[6].description` | A Survey of European Literature and Legacy examining adulthood, choices, and consequences from Greek and Roman classics through modern Europe. | A Survey of European Literature and Legacy examining adulthood, choices, and consequences from Greek and Roman classics through modern Europe and the colonial legacy. | 20→24 | —→— | pass |  |
| 2 | charlotte-christian | `divisions[2].departments[2].courses[8].description` | Covers the topics of a freshman college algebra course with in-depth study of functions, analytic trigonometry, vectors, and discrete mathematics. | Covers the topics of a freshman college algebra course: functions in depth · analytic trigonometry · vectors · parametric and polar equations · analytic geometry · discrete math · students must take the AP exam in May. | 20→31 | —→9.0 | pass |  |
| 3 | charlotte-christian | `divisions[2].departments[9].courses[2].description` | NFHS rules, game management, and 2-person crew mechanics preparing students for certification. | NFHS rules, game management, handling conflict, and 2-person crew mechanics preparing students for certification. | 12→14 | —→— | pass |  |
| 4 | charlotte-christian | `divisions[2].departments[9].courses[3].description` | NFHS rules, game management, and 2-person crew mechanics preparing students for certification. | NFHS rules, game management, handling conflict, and 2-person crew mechanics preparing students for certification. | 12→14 | —→— | pass |  |
| 5 | davidson-day | `divisions[2].departments[1].courses[4].description` | Polynomial functions in depth plus rational, square-root, logarithmic, and exponential models, with graphing-calculator work integral. | Polynomial functions in depth plus rational and square-root functions, complex numbers, and logarithmic and exponential models, with graphing-calculator work integral. | 15→20 | —→— | pass |  |

## Evidence (second fixes commit, Batch 2: independent-review findings)

The independent reviewer re-checked a random 20 of the census's `OK` verdicts (6 Cannon, 9 Charlotte Christian, 5 Davidson Day) and disagreed with 4, covering 5 rows. Each was re-checked against the source and confirmed. Fixes are applied against the committed text (`6624057f`) and the Batch 2 wording is restored on top (plaincourses `db076885` pattern). The guard hits above all belong to row 1, by design: it restores the guide's AP-exam requirement.

| School | Path | Title | Verdict | Before | After | Source |
|---|---|---|---|---|---|---|
| charlotte-christian | `divisions[2].departments[2].courses[8]` | Advanced Placement Pre-Calculus | NARROWS (was OK) | Covers the topics of a freshman college algebra course with in-depth study of functions, analytic trigonometry, vectors, and discrete mathematics. | Covers the topics of a freshman college algebra course: functions in depth · analytic trigonometry · vectors · parametric and polar equations · analytic geometry · discrete math · students must take the AP exam in May. | US guide p. 16: "Also included is a study of analytic trigonometry, vectors, parametric and polar equations, analytic geometry and discrete mathematics. Students taking this course are required to take the AP exam in May." The row dropped two items from a full list and the required exam. |
| charlotte-christian | `divisions[2].departments[9].courses[2]` | Refereeing: Basketball I — Male | NARROWS (was OK) | NFHS rules, game management, and 2-person crew mechanics preparing students for certification. | NFHS rules, game management, handling conflict, and 2-person crew mechanics preparing students for certification. | US guide p. 47: "NFHS basketball rules, game management skills, conflict navigation and officiating mechanics for 2-person crews". A full list with one item dropped. |
| charlotte-christian | `divisions[2].departments[9].courses[3]` | Refereeing: Basketball I — Female | NARROWS (was OK) | (same as Male) | (same as Male) | US guide p. 47, identical entry. |
| davidson-day | `divisions[2].departments[1].courses[4]` | Algebra II | NARROWS (was OK) | Polynomial functions in depth plus rational, square-root, logarithmic, and exponential models, with graphing-calculator work integral. | Polynomial functions in depth plus rational and square-root functions, complex numbers, and logarithmic and exponential models, with graphing-calculator work integral. | Catalog p. 29: "cover polynomial functions in depth and to introduce rational, square root functions, and complex numbers. Transcendental functions like logarithms and exponential models are covered". |
| charlotte-christian | `divisions[2].departments[1].courses[6]` | English 12 | NARROWS (was OK) | A Survey of European Literature and Legacy examining adulthood, choices, and consequences from Greek and Roman classics through modern Europe. | A Survey of European Literature and Legacy examining adulthood, choices, and consequences from Greek and Roman classics through modern Europe and the colonial legacy. | US guide p. 11: "a chronological literary exploration of Greek and Roman Classics, Medieval Europe, Restoration and 18th Century, Romantics, Victorian Period, Modern Europe and Colonial Legacy". The row's end point stopped one period short. |
