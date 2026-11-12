# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| providence-day | 2 |
| charlotte-latin | 5 |
| charlotte-country-day | 6 |
| **Total** | **13** |

Guards: **15 FAILED**.

- (h) providence-day:divisions[2].departments[1].courses[22].description: REQUIRED marker added (0→1)
- (p) charlotte-latin:divisions[1].departments[4].courses[1].description: name gone "Upper"
- (h) charlotte-latin:divisions[1].departments[4].courses[1].description: IMMERSION marker added (0→1)
- (p) charlotte-latin:divisions[1].departments[4].courses[4].description: name gone "Upper"
- (p) charlotte-latin:divisions[1].departments[4].courses[4].description: name new "Novice"
- (p) charlotte-latin:divisions[1].departments[4].courses[4].description: name new "High"
- (h) charlotte-latin:divisions[1].departments[4].courses[4].description: IMMERSION marker added (0→1)
- (p) charlotte-latin:divisions[1].departments[4].courses[7].description: name gone "Upper"
- (p) charlotte-latin:divisions[1].departments[4].courses[7].description: name new "Novice"
- (p) charlotte-latin:divisions[1].departments[4].courses[7].description: name new "High"
- (h) charlotte-latin:divisions[1].departments[4].courses[7].description: IMMERSION marker added (0→1)
- (p) charlotte-country-day:divisions[2].departments[1].courses[4].description: name gone "Accelerated"
- (p) charlotte-country-day:divisions[2].departments[1].courses[9].description: name gone "Accelerated"
- (p) charlotte-country-day:divisions[2].departments[1].courses[9].description: name new "AP"
- (p) charlotte-country-day:divisions[2].departments[1].courses[9].description: name new "Calculus"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | providence-day | `divisions[2].departments[0].courses[14].description` | College-level expository, analytical, and argumentative writing drawn from non-fiction genres, with focus on rhetorical technique and logic. | College-level expository, analytical, and argumentative writing, with readings from non-fiction genres and a focus on rhetorical technique and logic. | 17→19 | —→— | pass |  |
| 2 | providence-day | `divisions[2].departments[1].courses[22].description` | Seniors in the Global Studies Diploma become effective global collaborators and leaders, completing a research project and exit interview process. | Required for seniors in the Global Studies Diploma; aims to make students more effective global collaborators and leaders, with a research project and an exit interview. | 20→26 | —→— | pass |  |
| 3 | charlotte-latin | `divisions[1].departments[4].courses[1].description` | The Upper School Latin I credit taken in Middle School. | Latin I taught in Middle School, introducing elementary Latin vocabulary and grammar and simple Latin stories. | 10→16 | —→— | pass | caps gone: Upper |
| 4 | charlotte-latin | `divisions[1].departments[4].courses[4].description` | The Upper School French I credit taken in Middle School. | French I taught in Middle School, with tasks targeting the Novice High level of proficiency. | 10→15 | —→— | pass | caps gone: Upper |
| 5 | charlotte-latin | `divisions[1].departments[4].courses[7].description` | The Upper School Spanish I credit taken in Middle School. | Spanish I taught in Middle School, with tasks targeting the Novice High level of proficiency. | 10→15 | —→— | pass | caps gone: Upper |
| 6 | charlotte-latin | `divisions[2].departments[0].courses[11].description` | A semester elective, open mainly to seniors, on speculative and futurist literature. | A semester elective, open mainly to seniors, on dystopian fiction. | 12→10 | —→— | pass |  |
| 7 | charlotte-latin | `divisions[2].departments[8].courses[2].description` | The introductory technical theatre course. | An introductory technical theatre course. | 5→5 | —→— | pass |  |
| 8 | charlotte-country-day | `divisions[1].departments[0].courses[6].description` | Foundations of expressions and equations, linear equations and inequalities, systems, exponents and polynomials; students then move to Algebra 1 in 9th grade. | Foundations of expressions and equations, properties of real numbers, linear equations and inequalities, systems, exponents and polynomials; students then move to Algebra 1 in 9th grade. | 21→25 | —→— | pass |  |
| 9 | charlotte-country-day | `divisions[1].departments[0].courses[7].description` | Algebra I covering linear functions and systems, exponents, polynomials, quadratics, and radicals. | Algebra I covering algebra foundations, linear functions and systems, exponents, polynomials, quadratics, radicals, and an introduction to geometry. | 12→18 | —→— | pass |  |
| 10 | charlotte-country-day | `divisions[2].departments[1].courses[4].description` | Accelerated Algebra II; requires 90 in Geometry or 83 in Honors Geometry, plus teacher recommendation. | A more in-depth Algebra II with more theory, plus trigonometry and rational functions; requires 90 in Geometry or 83 in Honors Geometry, plus teacher recommendation. | 13→23 | —→— | pass |  |
| 11 | charlotte-country-day | `divisions[2].departments[1].courses[9].description` | Accelerated precalculus; requires 90 in Algebra II or 83 in Honors Algebra II, plus teacher recommendation. | An in-depth precalculus course that prepares students for AP Calculus; requires 90 in Algebra II or 83 in Honors Algebra II, plus teacher recommendation. | 14→22 | —→— | pass | LEVEL 1→2 |
| 12 | charlotte-country-day | `divisions[2].departments[2].courses[2].description` | College-level biology; prerequisites Biology I and Chemistry I, plus 90 in the current full-year science course (85 in Honors, 83 in AP). | College-level biology; prerequisites Biology I and Chemistry I or Honors Chemistry I, plus 90 in the current full-year science course (85 in Honors, 83 in AP). | 19→23 | —→— | pass | LEVEL 2→3 |
| 13 | charlotte-country-day | `divisions[2].departments[2].courses[16].description` | A more analytical physics course; requires 87 in the current full-year science course and 87 in math (83 in Honors), plus previous or concurrent Precalculus. | A more analytical physics course; requires 87 in the current full-year science course and 87 in math (83 in Honors for each), plus previous or concurrent Precalculus. | 22→24 | —→— | pass |  |

## Evidence and guard hits (second fixes commit, Batch 1)

Found by the Batch 1 independent reviewer (five fact findings on the first fixes, three on its 5%
re-check of census `OK` rows) and two related rows the reviewer flagged as outside its edit scope.
Each was re-checked against the school's own text by the implementer. Fixed against the committed
text (`39408ece`), before the wording pass is restored on top (plaincourses Batch 1 `db076885`
pattern).

| School | Path | Title | Problem | After | Evidence |
|---|---|---|---|---|---|
| charlotte-country-day | `divisions[2].departments[1].courses[4]` | Honors Algebra II | "Accelerated" is not in the guide (UNSUPPORTED; same class as Honors Physics I in the first fixes) | A more in-depth Algebra II with more theory, plus trigonometry and rational functions; … | p. 13: "much of the same material as Algebra II plus a unit on trigonometry and rational functions, but with more theory and in greater depth" |
| charlotte-country-day | `divisions[2].departments[1].courses[9]` | Honors Pre-calculus | "Accelerated" is not in the guide (UNSUPPORTED) | An in-depth precalculus course that prepares students for AP Calculus; … | p. 14: "an in-depth examination of polynomial, exponential … functions … in preparation for AP Calculus" |
| charlotte-country-day | `divisions[1].departments[0].courses[6]` | Algebra 8A | The first fix's topic list reads as the full list but drops "properties of real numbers" (NARROWS) | "properties of real numbers" restored in place | Middle School pages, eighth grade: "foundations of expressions and equations, properties of real numbers, solving and graphing linear equations …" |
| charlotte-country-day | `divisions[1].departments[0].courses[7]` | Algebra 1 (Gr 8) | The first fix kept a trimmed list with no "such as", dropping "algebra foundations" and "an introduction to geometry" (NARROWS) | both restored in place | Middle School pages, eighth grade: "algebra foundations, linear functions, … radicals, and an introduction to geometry" |
| charlotte-country-day | `divisions[2].departments[2].courses[16]` | Honors Physics I | The "83 in Honors" route applies to both the science and the math grade; the first fix attached it to math only (NARROWS) | "(83 in Honors for each)" | p. 8: "87 in current full-year science course (83 in Hon.)" … "and 87 in math (83 in Hon.)" |
| charlotte-country-day | `divisions[2].departments[2].courses[2]` | AP Biology | The Honors Chemistry I route was dropped (NARROWS) | "Chemistry I or Honors Chemistry I" | p. 16: "Prerequisites: Biology I, Chemistry I or Honors Chemistry I, and qualification"; p. 8: "Chem I/Hon. Chemistry" |
| charlotte-latin | `divisions[2].departments[0].courses[11]` | Visions of the Future | "speculative and futurist literature" can read as the Futurism movement; the post says dystopian fiction (MISSTATES, minor) | … on dystopian fiction. | post 3715: "the gripping worlds of dystopian fiction, from classics like 1984 and Brave New World" |
| charlotte-latin | `divisions[1].departments[4].courses[4]` | French I (MS) | "The Upper School French I credit taken in Middle School" — no school text supports an Upper School credit; the older record only restates the app (UNSUPPORTED; census OK overturned) | French I taught in Middle School, with tasks targeting the Novice High level of proficiency. | Middle School page, ## World Languages: "French I … while performing tasks targeting the Novice High level of proficiency" |
| charlotte-latin | `divisions[1].departments[4].courses[7]` | Spanish I (MS) | Same unsupported credit claim (census OK overturned) | Spanish I taught in Middle School, with tasks targeting the Novice High level of proficiency. | Middle School page: "Spanish I (MS) … performing tasks targeting the Novice High level of proficiency" |
| charlotte-latin | `divisions[1].departments[4].courses[1]` | Latin I (MS) | Same unsupported credit claim (census OK overturned; the census had noted it came from the record) | Latin I taught in Middle School, introducing elementary Latin vocabulary and grammar and simple Latin stories. | Middle School page: "This course introduces students to elementary Latin vocabulary and grammar and begins to build their ability to read simple Latin stories" |
| charlotte-latin | `divisions[2].departments[8].courses[2]` | Stagecraft I | "The introductory technical theatre course" implies the sequence the Stagecraft II fix denies (MISSTATES, minor) | An introductory technical theatre course. | post 2292: "Students may enroll in Stagecraft I or II as schedule allows. The courses cover independent topics and are not required in sequence." |
| providence-day | `divisions[2].departments[0].courses[14]` | AP English Language and Composition | The writing was said to be "drawn from non-fiction genres"; it is the readings that are (MISSTATES; census OK overturned) | … writing, with readings from non-fiction genres and a focus on rhetorical technique and logic. | S1 p. 22: "Readings come from non-fiction genres such as autobiography, criticism …" |
| providence-day | `divisions[2].departments[1].courses[22]` | Global Leadership | The school's aim ("will be empowered to become more effective") stated as an outcome, and "more" dropped (MISSTATES, minor; census OK overturned) | Required for seniors in the Global Studies Diploma; aims to make students more effective global collaborators and leaders, … | S1 p. 30: "Students in this course will be empowered to become more effective collaborators and leaders"; "Prerequisite: Required for seniors in the Global Studies Diploma Program" |

**Guard hits by design** (no `--check`): (p) the removed "Upper" (the dropped credit claim) and
"Accelerated", and the added "Novice High", "AP Calculus" (each from the school's own entry);
(h) IMMERSION on "taught in Middle School" (the IMMERSION pattern matches "taught … in"; no
language-of-instruction claim is made) and REQUIRED on "Required for seniors" (from the guide).
Guards (q) and (r) pass.

**What the 5% re-check says about the census.** 3 of the 25 sampled `OK` rows (12%) were
overturned, all at Providence Day and Latin, and the same unsupported claim sat on a fourth
unsampled row (Latin I). Recorded for the Batch 1 review.
