# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| covenant-day | 1 |
| gaston-day | 1 |
| charlotte-prep | 4 |
| **Total** | **6** |

Guards: **4 FAILED**.

- (n) covenant-day:divisions[2].teaser: count words differ -six
- (h) charlotte-prep:divisions[1].notPublished: CLAIM marker lost (1→0)
- (p) charlotte-prep:divisions[1].departments[0].courses[2].description: name new "Math"
- (d) charlotte-prep:divisions[1].departments[0].courses[2].description: quoted spans differ -"Grounded in a global philosophy. A balanced approach is used to build and apply computational, conceptual, and problem-solving knowledge." +"grounded in a global philosophy," +"a balanced approach is used to build and apply computational, conceptual, and problem-solving knowledge."

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | covenant-day | `divisions[2].teaser` | Five to six subject areas described for each of seven grades, plus six named Specials. These include CREATE Junior, Spanish, and recorder in 4th grade before band instruments in 5th. | Five subject areas described for each of seven grades, plus six named Specials. These include CREATE Junior, Spanish, and recorder in 4th grade before band instruments in 5th. | 30→28 | 7.2→— | pass |  |
| 2 | gaston-day | `divisions[1].departments[4].courses[1].description` | The terminal Spanish course, beyond the graduation requirement. | The final course in the Spanish sequence, beyond the graduation requirement. | 8→11 | —→— | pass |  |
| 3 | charlotte-prep | `divisions[0].notPublished` | The Early School teaches by the Montessori method in mixed-age classrooms rather than in separate courses. The rows below are the stages, milestones and specials the school names, in its own words. | The Early School teaches by the Montessori method in mixed-age classrooms rather than in separate courses. The rows below are the stages, milestones and specials the school names, with its own words in quotation marks. | 32→35 | 7.2→8.1 | pass |  |
| 4 | charlotte-prep | `divisions[1].notPublished` | Charlotte Prep publishes subjects and named programs for the Lower School, not individually described courses. The rows below are those, in the school’s words. | Charlotte Prep publishes subjects and named programs for the Lower School, not individually described courses. The rows below are those, with the school’s own words in quotation marks. | 24→28 | —→— | pass |  |
| 5 | charlotte-prep | `divisions[1].departments[0].courses[2].description` | "Grounded in a global philosophy. A balanced approach is used to build and apply computational, conceptual, and problem-solving knowledge." | Math "grounded in a global philosophy," where "a balanced approach is used to build and apply computational, conceptual, and problem-solving knowledge." | 1→4 | —→— | pass |  |
| 6 | charlotte-prep | `divisions[2].notPublished` | Charlotte Prep publishes no course catalog or program of studies. These are the subjects, programs and electives the school itself names, in its own words. | Charlotte Prep publishes no course catalog or program of studies. These are the subjects, programs and electives the school itself names, with its own words in quotation marks. | 25→28 | —→— | pass |  |

## Rulings (user, 2026-11-12: "for everything listed and decisions for me let's go with your recommendations")

Every guard hit above belongs to a ruling below.

**Changed (6 leaves):**

| School | Path | Ruling | Before | After | Source |
|---|---|---|---|---|---|
| charlotte-prep | `divisions[1].departments[0].courses[2]` (Math) | one sentence, Latin 7 precedent (Batch 1) | "Grounded in a global philosophy. A balanced approach is used to build and apply computational, conceptual, and problem-solving knowledge." | Math "grounded in a global philosophy," where "a balanced approach is used to build and apply computational, conceptual, and problem-solving knowledge." | record l.63: "grounded in a global philosophy. A balanced approach is used …" (the record's lowercase "grounded"; the words are unchanged, split at the school's own sentence break) |
| charlotte-prep | `divisions[0].notPublished`, `divisions[1].notPublished`, `divisions[2].notPublished` | "in its own words" claimed every row was a quote; about half paraphrase | … in its own words. / … in the school’s words. | … with its own words in quotation marks. / … with the school’s own words in quotation marks. | census-charlotte-prep.md notes (rows 4, 5, 6, 14, 32 and others paraphrase) |
| gaston-day | `divisions[1].departments[4].courses[1]` (Spanish IV) | plain language, matching Visual Art IV's fix | The terminal Spanish course, beyond the graduation requirement. | The final course in the Spanish sequence, beyond the graduation requirement. | record l.83: "Spanish I, II, III · Spanish IV (H)" |
| covenant-day | `divisions[2].teaser` | every grade tile has five headed areas (JK's "Science and Social Studies" is one heading) | Five to six subject areas … | Five subject areas … | Lower School record l.35–61 and each grade tile |

**Left as they are (the recommendation was no change):**

- Prerequisite, "Approval Required" and required-AP-exam lines (Hickory Grove, Gaston Day): school-wide policy, `OK`.
- Trinity's 8th-grade placement rule: stated once, on Advanced Pre-Algebra.
- Trinity Computer Science: keeps its siblings' enrichment wording.
- Covenant Day children's choir: grades 4–5, as the course record says (the Arts and Clubs records' 3–5 is recorded only).
- Carmel's Biology / Honors Biology and Chemistry / Honors Chemistry rows: the record lists both ("Biology (S, H) · Honors Biology"), so there is no evidence to merge them; the Bible titles the record marks TO VERIFY stay as the record has them.
- Hickory Grove's six `Gr 9–12` tags: the catalog's grade field is blank for those courses, and `Gr 9–12` is the Upper School's band, so the tag claims nothing the division does not.
