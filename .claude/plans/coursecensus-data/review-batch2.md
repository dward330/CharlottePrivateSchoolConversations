# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `9d29ea5d` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-christian | 7 |
| cannon | 4 |
| davidson-day | 1 |
| **Total** | **12** |

Guards: **3 FAILED**.

- (h) charlotte-christian:divisions[2].departments[8].courses[7].description: ONLY marker added (0→1)
- (b) cannon:divisions[1].teaser: digit tokens differ +6 +7 +8
- (p) davidson-day:divisions[2].departments[2].courses[2].description: name new "Honors"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-christian | `divisions[0].notPublished` | Charlotte Christian publishes Lower School subject strands with grade-band content tables, not named courses, and publishes no Lower School course catalog. | Charlotte Christian publishes Lower School subject strands with grade-band content tables, not named courses. It publishes no Lower School course catalog. | 21→21 | —→— | pass |  |
| 2 | charlotte-christian | `divisions[1].departments[4].courses[1].description` | Students choose one of French, Latin, or Spanish to introduce. | Students choose one of French, Latin, or Spanish to begin. | 10→10 | —→— | pass |  |
| 3 | charlotte-christian | `divisions[2].departments[1].courses[4].description` | A Survey of World Literature asking "What does it mean to be an engaged global citizen?" through literature of Latin America, Africa, and Asia. | A Survey of World Literature that reads literature of Latin America, Africa, and Asia around the question "What does it mean to be an engaged global citizen?" | 15→18 | —→— | pass |  |
| 4 | charlotte-christian | `divisions[2].departments[4].courses[2].description` | Surveys c. 1200 onward, exploring the political, religious, social, and ideological forces that shaped the modern world. | Surveys the period from about 1200 onward, exploring the political, religious, social, and ideological forces that shaped the modern world. | 16→19 | —→— | pass |  |
| 5 | charlotte-christian | `divisions[2].departments[4].courses[4].description` | A college-level survey of major civilizations, events, religions, and ideologies from c. 1200 through the end of the twentieth century. | A college-level survey of major civilizations, events, religions, and ideologies from about 1200 through the end of the twentieth century. | 19→19 | —→— | pass |  |
| 6 | charlotte-christian | `divisions[2].departments[4].courses[7].description` | Studies cultural, economic, political, and social developments shaping the U.S. from c. 1491 to the present. | Studies cultural, economic, political, and social developments shaping the U.S. from about 1491 to the present. | 15→15 | —→— | pass |  |
| 7 | charlotte-christian | `divisions[2].departments[8].courses[7].description` | One week in second semester of nontraditional enrichment courses, mission and service trips, and career shadowing for juniors and seniors. | One week in second semester of nontraditional enrichment courses, mission and service trips, and career shadowing (juniors and seniors only). | 20→20 | —→— | pass |  |
| 8 | cannon | `divisions[0].departments[3].courses[3].description` | The grade pages point families to the School Counseling webpage for typical challenges and characteristics of children by age and developmental stage. | The school’s grade pages point families to the School Counseling webpage for typical challenges and characteristics of children by age and developmental stage. | 22→23 | —→— | pass |  |
| 9 | cannon | `divisions[1].teaser` | Seven subject areas per grade, with select-group Pre-Algebra, Algebra I and Geometry options — a Grade 5 rotation through all three world languages, and the ThinkTank makerspace. | Seven subject areas per grade, a Grade 5 rotation through all three world languages, and the ThinkTank makerspace. A select group takes Pre-Algebra in Grade 6, Algebra I in Grade 7 and Geometry in Grade 8. | 25→32 | —→7.2 | pass | GRADELEVEL 1→4 |
| 10 | cannon | `divisions[1].notPublished` | Cannon publishes Middle School curriculum as per-grade subject descriptions, not a named-course catalog. Cannon publishes no Middle School equivalent of the 44-page Upper School catalog. | Cannon publishes Middle School curriculum as per-grade subject descriptions, not a named-course catalog. It publishes no Middle School equivalent of the 44-page Upper School catalog. | 25→25 | —→— | pass |  |
| 11 | cannon | `divisions[2].departments[5].courses[9].description` | For experienced students committing to public acting, directing, or production design including Fall One-Acts and Arts Jam. | For experienced students committing to public acting, directing, or production design, including Fall One-Acts and Arts Jam. | 17→17 | —→— | pass |  |
| 12 | davidson-day | `divisions[2].departments[2].courses[2].description` | Meets the sophomore World History requirement, which AP World History (Modern) also meets; the school publishes no course description for it. | Meets the sophomore World History requirement, which AP World History (Modern) also meets; the school publishes no description of this Honors course. | 21→22 | —→— | pass | LEVEL 1→2 |

## Guard hits by design

`--check` exits 1 on three hits, each from a reviewer wording edit that puts back the school's own words:

- (h) ONLY, charlotte-christian Winterim: "career shadowing (juniors and seniors only)" is the guide's own limit (US guide p. 46, "career shadowing (juniors and seniors only.)"). The census fix's "for juniors and seniors" could read as limiting the whole required week.
- (b) digits +6 +7 +8, cannon `divisions[1].teaser`: "A select group takes Pre-Algebra in Grade 6, Algebra I in Grade 7 and Geometry in Grade 8." The grade pages name Sixth-Grade Pre-Algebra, Seventh-Grade Algebra I and Eighth-Grade Geometry, each "a select group" (S13–S15). Eighth-grade Algebra I is open to all, which the fixes-commit wording ("select-group … Algebra I … options") blurred.
- (p) "Honors", davidson-day World History Honors: "the school publishes no description of this Honors course". It is the course's own title; the edit replaces an "it" whose nearest noun was AP World History (Modern), which does have a description (p. 35).

## Independent review

A fresh `general-purpose` subagent that never saw the drafting reviewed every Batch 2 fix (`6624057f`), the 4 wording rows and the teaser, note and tag table, against the sources and plaincourses' rules. It checked Davidson Day pp. 28 and 70 against the page images.

- **All 31 fixes and 4 wording rows confirmed.** No dropped prerequisite, grade, exam or selection rule, no re-typed figure, no FROZEN identifier lost, no first- or second-person voice, no comparison.
- **8 wording edits made in place** (included above): Cannon Middle School teaser (W1) and note ("It publishes no …", the Batch 1 form), Cannon School Counseling ("The school’s grade pages"), Cannon Honors Theater in Performance (a comma: "production design, including …"), Charlotte Christian Lower School note ("It publishes no …"), Charlotte Christian Introduction ("to begin" for "to introduce"), Charlotte Christian Winterim, Davidson Day World History Honors.
- **OK re-check: 20 random rows, 16 agree, 4 disagree (5 rows):** AP Pre-Calculus (dropped the required AP exam and two list items), both Basketball Refereeing rows ("conflict navigation" dropped from a full list), Davidson Day Algebra II (complex numbers dropped), English 12 (its period list stops short of "Colonial Legacy"). All re-checked and confirmed; fixed in the second fixes commit `9d29ea5d` (`review-batch2-fixes2.md`).
- **Reported, not changed (structural; the user's call):** Davidson Day AFAR International Research sits in the Middle School division although no source places it there (it is in the Upper School catalog and on the Global Studies Diploma page); Davidson Day Specials now holds no course and repeats its division's note.
- **Agreed rows, shorter but true (left under the plan's `OK` rule):** Cannon Honors Upper School Band (catalog p. 21: an audition for students without two years of middle school band), Cannon AP Computer Science A ("Open to juniors and seniors only", p. 38), Charlotte Christian AP Art and Design ("for eligible juniors and seniors", p. 43).
