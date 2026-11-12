# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `eb5cdac7` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| covenant-day | 0 |
| carmel-christian | 2 |
| hickory-grove-christian | 2 |
| gaston-day | 1 |
| trinity-episcopal | 9 |
| charlotte-prep | 0 |
| **Total** | **14** |

Guards: **15 FAILED**.

- (h) trinity-episcopal:divisions[0].departments[1].courses[1].description: ONLY marker lost (1→0)
- (p) trinity-episcopal:divisions[0].departments[2].courses[0].description: name gone "Gr"
- (p) trinity-episcopal:divisions[0].departments[2].courses[0].description: name gone "Published"
- (h) trinity-episcopal:divisions[0].departments[2].courses[0].description: ONLY marker lost (1→0)
- (h) trinity-episcopal:divisions[0].departments[2].courses[0].description: GRADELEVEL marker added (0→1)
- (b) trinity-episcopal:divisions[1].departments[4].courses[3].description: digit tokens differ -6 +13
- (p) trinity-episcopal:divisions[1].departments[4].courses[3].description: name gone "Grade"
- (p) trinity-episcopal:divisions[1].departments[4].courses[3].description: name gone "AI"
- (p) trinity-episcopal:divisions[1].departments[4].courses[3].description: name new "Middle"
- (p) trinity-episcopal:divisions[1].departments[4].courses[3].description: name new "School"
- (p) trinity-episcopal:divisions[1].departments[4].courses[3].description: name new "Profile"
- (h) trinity-episcopal:divisions[1].departments[4].courses[3].description: GRADELEVEL marker lost (1→0)
- (d) trinity-episcopal:divisions[1].departments[4].courses[3].description: quoted spans differ -"as digital learning catalysts teach students how to use AI to create code and build, not just how to input questions."
- (p) trinity-episcopal:divisions[1].departments[4].courses[9].description: name gone "Named"
- (p) trinity-episcopal:divisions[1].departments[4].courses[9].description: name gone "PDF"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | carmel-christian | `divisions[0].departments[2].courses[7].description` | Precalculus at the honors level. | Honors precalculus. | 5→2 | —→— | pass |  |
| 2 | carmel-christian | `divisions[2].teaser` | Five core subjects described per grade and six Special Areas for all grades, from the 2026-27 Elementary Course Description Guide. It includes structured literacy (Orton-Gillingham) and a hands-on STEM lab from Kindergarten. | Five core subjects described per grade and six Special Areas for all grades, from the 2026-27 Elementary Course Description Guide. The guide describes structured literacy (Orton-Gillingham) and a hands-on STEM lab from Kindergarten. | 31→32 | 7.6→7.6 | pass |  |
| 3 | hickory-grove-christian | `divisions[0].departments[11].courses[11].description` | For seniors with a 3.0 GPA and an employer letter who leave school early for work · not available to a student during the season of a sport they play with after-school practices. | For seniors with a 3.0 GPA and an employer letter who leave school early for work · not available during the season of any sport the student plays that has after-school practices. | 31→30 | 7.6→7.6 | pass |  |
| 4 | hickory-grove-christian | `divisions[1].departments[3].courses[3].description` | Offered to qualifying 8th Grade Honors students — equations, expressions, order of operations, properties, signed numbers, inequalities, proportions, polynomials, factoring, graphing and radicals, with nightly homework. | Offered to qualifying 8th Grade Honors students — equations, expressions, order of operations, properties, positive and negative numbers, inequalities, proportions, polynomials, factoring, graphing and radicals, with nightly homework. | 25→27 | —→— | pass |  |
| 5 | gaston-day | `divisions[0].departments[1].courses[0].description` | A required course sequence carrying digital citizenship instruction alongside advisory. | Required courses that, along with advisory, teach digital citizenship. | 10→9 | —→— | pass |  |
| 6 | trinity-episcopal | `divisions[0].departments[1].courses[1].description` | The school's only named academic facility, and a weekly Lower School enrichment. It is a STEM space, not an arts space. | A weekly Lower School enrichment in STEM. | 21→7 | —→— | pass |  |
| 7 | trinity-episcopal | `divisions[0].departments[2].courses[0].description` | Facilitated by Digital Learning Catalysts, with 1:1 iPads for all students K-1 and 1:1 Chromebooks for all students Gr. 2-8. Published in the School Profile only — it appears on no /academics/ page. | The School Profile says the program is facilitated by Digital Learning Catalysts, with 1:1 iPads for all students K-1 and 1:1 Chromebooks for all students in grades 2-8. | 29→25 | —→— | pass | caps gone: Gr |
| 8 | trinity-episcopal | `divisions[1].departments[0].courses[0].description` | The 6th-grade course. Instruction across the department is "grounded in a problem-based core curriculum rooted in content and practice standards." | The 6th-grade course, in a department whose instruction is "grounded in a problem-based core curriculum rooted in content and practice standards." | 9→10 | —→— | pass |  |
| 9 | trinity-episcopal | `divisions[1].departments[0].courses[2].description` | The accelerated 7th-grade course. Students are placed in grade-level and accelerated courses "based on specific performance criteria" — the criteria themselves are not published. | The accelerated 7th-grade course, with students placed in grade-level and accelerated courses "based on specific performance criteria" that the school does not publish. | 19→19 | —→— | pass |  |
| 10 | trinity-episcopal | `divisions[1].departments[0].courses[5].description` | One of five distinct 8th-grade mathematics courses. The school states no credit arrangement for it. | One of five distinct 8th-grade mathematics courses, with no credit arrangement stated by the school. | 15→15 | —→— | pass |  |
| 11 | trinity-episcopal | `divisions[1].departments[3].courses[1].description` | An integrated science program across grades 6-8. No per-grade course names are published. | An integrated science program across grades 6-8, with no per-grade course names published. | 12→12 | —→— | pass |  |
| 12 | trinity-episcopal | `divisions[1].departments[4].courses[3].description` | A weekly enrichment. A 6th Grade technology class has been announced as an addition, "as digital learning catalysts teach students how to use AI to create code and build, not just how to input questions." | One of the 13 weekly Middle School enrichments listed in the School Profile. | 15→12 | —→— | pass | caps gone: Grade |
| 13 | trinity-episcopal | `divisions[1].departments[4].courses[9].description` | Named in the School Profile's enrichment list. Their contents are published nowhere — the phrase appears in the profile PDF and on no page of the website. | The School Profile names them in its enrichment list but does not describe what they cover. | 26→16 | —→— | pass | caps gone: Profile's, PDF |
| 14 | trinity-episcopal | `divisions[1].departments[5].courses[0].description` | "6th Grade students choose from one of two ensembles: choir or band." Ensembles perform at chapels, commencement, and venues outside of school. | Ensembles perform at chapels, commencement, and venues outside of school, and "6th Grade students choose from one of two ensembles: choir or band." | 11→12 | —→— | pass |  |

## Guard hits by design

`--check` exits 1 on these 15 hits, all from deliberate removals while condensing Trinity's multi-sentence rows:

- **IDEA (STEM) Lab** — (h) ONLY lost: "the school's only named academic facility" is the record's own research summary, not school text (census note), so it is dropped under the dev-only bookkeeping standard. The row is now "A weekly Lower School enrichment in STEM." (the profile names the enrichment "IDEA (STEM) Lab"; it does not describe a room).
- **K–8 Technology Program** — (p) "Gr", "Published", (h) ONLY lost, GRADELEVEL added: "Published in the School Profile only — it appears on no /academics/ page" is research bookkeeping, dropped; the attribution stays ("The School Profile says …"). "Gr. 2-8" is written "grades 2-8" because "Gr." splits the sentence (digits unchanged).
- **Computer Science** — (b), (p), (h), (d): the second sentence described a different, announced course (a 6th Grade technology class). It is dropped, and the row takes the wording its 12 sibling enrichment rows use. Raised at review.
- **Choice Electives** — (p) "Named", "PDF": "the phrase appears in the profile PDF and on no page of the website" is research bookkeeping, dropped; the row keeps that the School Profile names them and does not describe them.

## Independent review

A fresh `general-purpose` subagent checked all 70 changed strings (61 fixes, 9 wording rows) and a random 40 of the census `OK` verdicts.

- **6 wording edits, made in place** (hook passed): Carmel Honors Precalculus ("Precalculus at the honors level." → "Honors precalculus.", restoring the FROZEN "Honors" and matching its siblings); Carmel's Lower School teaser ("It includes" → "The guide describes", a bare pronoun); Hickory Grove Work Release (clause made easier to follow, same meaning); Hickory Grove 8th Grade Algebra 1 ("signed numbers" → the catalog's "positive and negative numbers"); Gaston Day LEAD ("Required courses that, along with advisory, teach digital citizenship." — closer to the record, drops an unsupported "sequence"); Trinity K–8 Technology Program (attribution moved to the front).
- **Fact findings**, applied in `eb5cdac7` against the committed text, wording restored on top (`review-batch3-fixes2.md`): Hickory Grove 6th Grade Math ("surface area"), Gaston Day Advanced Functions and Models, Trinity IDEA (STEM) Lab (wording row; applied here); plus Covenant Day ContainIt tightened and Trinity's "Profile PDF only" tag.
- **OK re-check: 38 of 40 confirmed, 2 overturned** (5%): Gaston Day Middle School Drama ("as early as") and Hickory Grove In-Season Weight Training (one credit toward graduation). Both fixed in `eb5cdac7`.
- **Raised for the user, not changed:** whether prerequisite, "Approval Required" and required-AP-exam lines count as `NARROWS` (Hickory Grove AP Calculus BC, AP Statistics, AP Government and Politics, and the wider class at Hickory Grove and Gaston Day); Gaston Day Spanish IV's "terminal" wording.
