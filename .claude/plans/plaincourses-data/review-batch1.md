# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `db076885` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| providence-day | 6 |
| charlotte-latin | 2 |
| charlotte-country-day | 2 |
| cannon | 7 |
| davidson-day | 5 |
| **Total** | **22** |

Guards: all pass (paths, digits, URLs/emails, quotes, year spans, non-prose leaves, dates/times, money/percent/year tokens, markers, repeats across schools, worklist-only edits, markdown fields).

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | providence-day | `divisions[1].departments[4].courses[7].description` | Interdisciplinary innovation work through entrepreneurial sprints. | Innovation projects that combine subjects, run as short entrepreneurial sprints. | 6→10 | —→— | pass |  |
| 2 | providence-day | `divisions[2].departments[0].courses[13].description` | An interdisciplinary AP course reaching into literature, arts, political science, geography, and science to explore African American experience. | An AP course that draws on literature, arts, political science, geography, and science to explore African American experience. | 18→18 | —→— | pass |  |
| 3 | providence-day | `divisions[2].departments[2].courses[3].description` | Offers rigorous treatment and in-depth development of direct and indirect proofs across congruence, similarity, circles, and triangle trigonometry. | Develops direct and indirect proofs carefully and in depth across congruence, similarity, circles, and triangle trigonometry. | 18→16 | —→— | pass | PACE 2→1 |
| 4 | providence-day | `divisions[2].departments[3].courses[1].description` | Moves faster and is more mathematically rigorous than Physics I, adding circular motion and waves. | Moves faster than Physics I and uses more math, adding circular motion and waves. | 15→14 | —→— | pass | PACE 2→1 |
| 5 | providence-day | `divisions[2].departments[5].courses[3].description` | An experiential course guiding students to launch businesses creating social value, rapidly testing ideas against customer and marketplace feedback. | A hands-on course guiding students to launch businesses that create social value, testing ideas quickly against customer and marketplace feedback. | 19→20 | —→— | pass |  |
| 6 | providence-day | `divisions[2].departments[6].courses[6].description` | Prepares seniors for the AP Spanish Language Exam with a holistic proficiency approach and Spanish-only classroom conversation. | Prepares seniors for the AP Spanish Language Exam by building all-around language skills, with Spanish-only classroom conversation. | 17→17 | —→— | pass |  |
| 7 | charlotte-latin | `divisions[2].notPublished` | Charlotte Latin publishes Upper School course titles without per-course descriptions. Titles here are verbatim; descriptions are drawn from the school’s department-level framing. | Charlotte Latin publishes Upper School course titles without per-course descriptions. The course titles are the school’s own; each description comes from how the school describes that department. | 22→27 | —→— | pass |  |
| 8 | charlotte-latin | `divisions[2].departments[1].courses[7].description` | An honors course the school’s profile describes as equivalent in rigor to AP U.S. History. | An honors course that the school’s profile says is as demanding as AP U.S. History. | 15→15 | —→— | pass |  |
| 9 | charlotte-country-day | `divisions[0].departments[0].courses[2].description` | Develops number sense, spatial awareness, and math language through active exploration and hands-on games toward rigorous problem solving. | Develops number sense, spatial awareness, and math language through active exploration and hands-on games, building toward harder problem solving. | 18→19 | —→— | pass |  |
| 10 | charlotte-country-day | `divisions[1].departments[2].courses[4].description` | Scaffolded across the Middle School with design-thinking and prototyping work. | Built up step by step across the Middle School with design-thinking and prototyping work. | 10→14 | —→— | pass |  |
| 11 | cannon | `divisions[0].departments[0].courses[0].description` | A literacy block integrating whole-class and small-group differentiated instruction across phonics, fluency, vocabulary, and comprehension. | A literacy block that mixes whole-class and small-group teaching, adjusted to each student’s level, across phonics, fluency, vocabulary, and comprehension. | 15→20 | —→— | pass |  |
| 12 | cannon | `divisions[0].departments[0].courses[4].description` | Curriculum builds a strong academic foundation in reading, writing, and math through hands-on, collaborative, experiential, and multi-sensory learning. | The curriculum builds a strong academic foundation in reading, writing, and math through hands-on, collaborative, and multi-sensory learning. | 18→18 | —→— | pass |  |
| 13 | cannon | `divisions[2].departments[1].courses[2].description` | Euclidean geometry with heavy emphasis on notation, justification, and proof at greater rigor and depth than Honors Geometry. | Euclidean geometry with heavy emphasis on notation, justification, and proof, in more depth and at a harder level than Honors Geometry. | 18→21 | —→— | pass |  |
| 14 | cannon | `divisions[2].departments[1].courses[12].description` | A rigorous course covering a semester of college calculus through limits, differential calculus, and integral calculus. | A demanding course covering a semester of college calculus through limits, differential calculus, and integral calculus. | 16→16 | —→— | pass |  |
| 15 | cannon | `divisions[2].departments[2].courses[16].description` | An asynchronous fully online course building appreciation for scientific phenomena relevant to scientifically literate adults. | A fully online course, taken on the student’s own schedule, building appreciation for scientific phenomena relevant to scientifically literate adults. | 15→20 | —→— | pass |  |
| 16 | cannon | `divisions[2].departments[4].courses[5].description` | A rigorous interdisciplinary course taught exclusively in Spanish, building proficiency toward advanced-low. | A demanding course that combines subjects, taught only in Spanish, building students’ proficiency toward advanced-low (a level on a standard language-proficiency scale). | 12→22 | —→— | pass |  |
| 17 | cannon | `divisions[2].departments[7].courses[0].description` | A holistic wellness and athletic development course informed by kinesiology, exercise physiology, and biomechanics. | A whole-person wellness and athletic development course informed by kinesiology, exercise physiology, and biomechanics. | 14→14 | —→— | pass |  |
| 18 | davidson-day | `divisions[0].departments[0].courses[0].description` | Early Preschool (2s/3s), Preschool (3s/4s), and Junior Kindergarten (4s/5s) target cognitive skills, language development, fine and gross motor skills, executive functioning, and social-emotional wellness. | Early Preschool (2s/3s), Preschool (3s/4s), and Junior Kindergarten (4s/5s) work on cognitive skills, language development, fine and gross motor skills, planning and focus skills, and emotional and social well-being. | 24→29 | —→— | pass |  |
| 19 | davidson-day | `divisions[2].departments[0].courses[3].description` | Reads fiction and nonfiction such as A Long Way Gone, Much Ado About Nothing, and Predictably Irrational, extending English II skills through scaffolded responses and added writing. | Reads fiction and nonfiction such as A Long Way Gone, Much Ado About Nothing, and Predictably Irrational, extending English II skills through guided, step-by-step responses and added writing. | 27→28 | —→— | pass |  |
| 20 | davidson-day | `divisions[2].departments[2].courses[1].description` | The Civics course with added analytical rigor, primary-source interpretation, and AP-style writing prompts to prepare for AP World History. | The Civics course with harder analysis, primary-source interpretation, and AP-style writing prompts to prepare for AP World History. | 19→18 | —→— | pass |  |
| 21 | davidson-day | `divisions[2].departments[3].courses[8].description` | Biology with greater depth and rigor, adding inquiry learning with current research data and independent experiment design. | Biology in greater depth and at a harder level, adding inquiry learning with current research data and independent experiment design. | 17→20 | —→— | pass |  |
| 22 | davidson-day | `divisions[2].departments[8].courses[4].description` | Upper School students serve as instructional partners in middle-school classrooms and lead mini-lessons, with monthly pedagogy seminars. | Upper School students serve as instructional partners in middle-school classrooms and lead mini-lessons, with monthly seminars on teaching. | 17→18 | —→— | pass |  |

## Independent review

A fresh `general-purpose` subagent checked all 22 rows and the Davidson Day fixes note against
the plan's checklist, the Style rulings and each school's source record. **4 findings, all fixed.**

| Path | Problem | Fix |
|---|---|---|
| `cannon:divisions[2].departments[4].courses[5].description` | The gloss changed the term: "(a standard measure of language proficiency)" made advanced-low sound like a test; "building students toward" dropped "proficiency" | "…building students’ proficiency toward advanced-low (a level on a standard language-proficiency scale)." (reviewer's edit) |
| `davidson-day:divisions[2].departments[0].courses[3].description` | Pre-existing: the catalog's example books were shown as the full list; "and added writing" was dropped | Fact fix in its own commit `db076885` (`review-batch1-fixes2.md`); wording now "Reads fiction and nonfiction such as … through guided, step-by-step responses and added writing." |
| `davidson-day:divisions[2].departments[2].courses[1].description` | Pre-existing: dropped "to prepare for AP World History" | Fact fix in `db076885`; carried into the wording |
| `davidson-day:divisions[0].departments[0].courses[0].description` | Pre-existing: "motor skills" narrowed "fine and gross motor skills" | Fact fix in `db076885`; carried into the wording |

**Borderline rows the reviewer left, with reasons:** PD Geometry (Advanced) "carefully and in
depth" for "rigorous" (in mathematics rigor means careful, exact reasoning; "in depth" keeps
PACE); Cannon AP Calculus AB "demanding" (the unit's own college claim already carries the
difficulty, but "demanding" is accurate and keeps PACE); CCD Mathematics "harder problem
solving" (the plan's default; the record names no specific demand); Latin `notPublished`
(matches record line 66); Latin Honors American Studies (matches the profile's "equivalent level
of rigor and depth to Advanced Placement curricula", attribution kept); Cannon Early Childhood
dropping "experiential" beside "hands-on" (the register's rule).

After the fixes, the Step 4 `--check` (base `db076885`) exits 0, 22/22 `hook: pass`.
