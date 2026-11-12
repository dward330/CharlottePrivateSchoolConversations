# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `647257fb` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| providence-day | 2 |
| charlotte-latin | 1 |
| charlotte-country-day | 5 |
| **Total** | **8** |

Guards: **1 FAILED**.

- (p) charlotte-country-day:divisions[2].departments[2].courses[16].description: name new "I"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | providence-day | `divisions[1].departments[6].courses[9].description` | Three semester acting courses for Grades 7 and 8; Acting 3 requires prior theatre experience. | Three semester-long acting courses for Grades 7 and 8; Acting 3 requires prior theatre experience. | 12→12 | —→— | pass |  |
| 2 | providence-day | `divisions[2].departments[6].courses[11].description` | A prose and poetry literature course with a project-based comparative-texts component, reading authors such as Vergil, Pliny, Catullus, Ovid, Vespucci, and Boccaccio. | A prose and poetry literature course with a project-based comparative-texts component and readings from authors such as Vergil, Pliny, Catullus, Ovid, Vespucci, and Boccaccio. | 22→24 | —→— | pass |  |
| 3 | charlotte-latin | `divisions[2].departments[10].courses[0].description` | The Upper School physical education and health requirement; half can be waived by playing on or managing a school team, or by a dance role in an approved musical. | The Upper School physical education and health requirement; half can be waived by playing on or managing a school team, or by dancing in an approved musical. | 29→27 | —→— | pass |  |
| 4 | charlotte-country-day | `divisions[2].departments[1].courses[6].description` | An alternative to Pre-calculus that reviews and extends Algebra II topics, including trigonometry, at a slower pace; it does not lead to Pre-calculus or AP Calculus. | An alternative to Pre-calculus that reviews and extends Algebra II topics, including trigonometry, at a slower pace; students who take it cannot go on to Pre-calculus or AP Calculus. | 26→29 | —→— | pass |  |
| 5 | charlotte-country-day | `divisions[2].departments[2].courses[16].description` | A more analytical physics course; requires 87 in the current full-year science course and 87 in math (83 in Honors for each), plus previous or concurrent Precalculus. | A more analytical version of Physics I; requires 87 in the current full-year science course and 87 in math (83 in Honors for each), plus previous or concurrent Precalculus. | 24→26 | —→— | pass |  |
| 6 | charlotte-country-day | `divisions[2].departments[3].courses[12].description` | The origins, evolution, and varieties of ancient civilizations from c. 3000 BCE to c. 1000 CE using primary sources and archaeological findings. | The origins, evolution, and varieties of ancient civilizations from about 3000 BCE to about 1000 CE, using primary sources and archaeological findings. | 20→20 | —→— | pass |  |
| 7 | charlotte-country-day | `divisions[2].departments[3].courses[16].description` | Open to IB and non-IB students in 11th and 12th grade; requires 87 in current history (80 in honors) and previous or concurrent Precalculus. | Open to IB and non-IB students in 11th and 12th grade; requires 87 in the current history course (80 in honors) and previous or concurrent Precalculus. | 22→24 | —→— | pass |  |
| 8 | charlotte-country-day | `divisions[2].departments[4].courses[0].description` | A five-level Honors Mandarin sequence; entry requires 87 in a current French, Spanish, or Latin class or 80 in a current Honors class. | A five-level Honors Mandarin sequence; entry requires 87 in a current French, Spanish, or Latin class, or 80 in a current Honors class. | 21→21 | —→— | pass |  |

## Guard hits by design

- (p) `charlotte-country-day:divisions[2].departments[2].courses[16]` (Honors Physics I): name new "I" — the
  reviewer's wording names the course the guide compares it with: "a more analytical approach to the
  concepts studied in Physics I" (p. 18). Not stoplisted (one site).

## Independent review

A fresh `general-purpose` subagent, which saw none of the drafting, checked all 54 first-round fixes, the
Ancient Empires wording and a random 5% of each school's census `OK` rows (25 rows: Providence Day 10,
Latin 7, Country Day 8) against the schools' own text.

- **All 54 fixes** match the module and correct their census finding; no over-correction found.
- **7 wording edits**, made in place (hook passed): Acting "semester" → "semester-long" (could read as a
  three-semester course); Latin 5 "reading authors" → "readings from authors" (no subject); Latin PE "a
  dance role" → "dancing"; Algebra III/Trigonometry "it does not lead to" → "students who take it cannot go
  on to" (the guide's "not eligible"); Honors Physics I "physics course" → "version of Physics I"; IB Digital
  Society "current history" → "the current history course"; Honors Chinese, a comma before the second "or".
- **5 fact findings and 3 overturned `OK` rows**, plus two related rows it flagged outside its scope (Latin
  Stagecraft I, Country Day Middle School Algebra 1): all re-checked against the source by the implementer
  and fixed in the second fixes commit `647257fb` (evidence in `review-batch1-fixes2.md`). The wording above
  was then restored on top; this file's base is `647257fb`.
- **5% re-check:** 22 of 25 agreed; 3 overturned (Providence Day AP English Language and Composition and
  Global Leadership; Latin Spanish I (MS)). The same unsupported Upper School credit claim was on French I
  (MS) and Latin I (MS), also fixed.
- **Reported, not changed (identity fields and notes are out of scope):** Latin tags that contradict the
  school's posts — History of Music Seminar and Strangers in a Common Land tagged `Honors` (seminars with an
  honors option), Engineering I and II tagged `Year` (semester electives), Middle School Engineering tagged
  `Gr 6` (offered in Grades 6–8), four English electives tagged `Semester` with no semester line in their
  posts.
