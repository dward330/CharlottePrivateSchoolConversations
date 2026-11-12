# Census — trinity-episcopal (plan `coursecensus`, Batch 3)

Every Course Offerings description for trinity-episcopal, checked against the school's own text in `source-material/course-offerings/trinity-episcopal/ (Lower School and Technology; Middle School Curriculum records)`. Verdicts are the plan's ("Decisions"). The table was drafted by a fresh census subagent; every non-OK row was then re-checked against the source by the implementer, and any change to the subagent's verdict is noted in the row.

## Verdicts

| Verdict | Rows |
|---|--:|
| OK | 24 |
| SITE-WRITTEN-OK | 18 |
| NOT-ABOUT-COURSE | 0 |
| MISSTATES | 0 |
| NARROWS | 1 |
| UNSUPPORTED | 1 |
| **Total** | **44** |

## Rows fixed

| Path | Title | Verdict | Evidence | Before | After |
|---|---|---|---|---|---|
| `divisions[0].departments[1].courses[5]` | Faith Studies | NARROWS | Profile: "K-8 Faith Studies: Bible lessons, study of world religions, etc." (LS&Tech file, ## Other whole-school programmes). The school's "etc." marks a sample; the row shows the two items as the whole program. | Bible lessons and the study of world religions, taught K–8 and running weekly in the Lower School. | Bible lessons, the study of world religions and more, taught K–8 and running weekly in the Lower School. |
| `divisions[1].departments[0].courses[7]` | Geometry | UNSUPPORTED | School only lists "8th Grade: Foundations in Algebra, Math 1, Algebra 1, Math 2, Geometry" (MS Curriculum file, ## The math track) and ranks none; "the furthest" is site inference from list order (Math 2 and Geometry are both second-year courses). Also drops the placement rule ("placed … based on specific performance criteria"). Credit sentence is correct. | The furthest of the five 8th-grade mathematics courses. The school states no credit arrangement for it. | One of five distinct 8th-grade mathematics courses, with no credit arrangement stated by the school. |

## All rows

<details>
<summary>All 44 rows</summary>

| Path | Title | Verdict | Evidence |
|---|---|---|---|
| `divisions[0].departments[0].courses[0]` | Mathematics — Math in Focus 2020 | OK | "develops mathematicians in Kindergarten through Grade 5 using the Math in Focus 2020 curriculum" (LS&Tech file, ## Named curricula), verbatim |
| `divisions[0].departments[0].courses[1]` | Science — Amplify Science | OK | "…utilizes the Amplify Science units of study as its core curriculum…" (LS&Tech file, ## Named curricula) |
| `divisions[0].departments[0].courses[2]` | Social Studies — Storypaths | OK | Social Studies uses "Storypaths" units (LS&Tech file, ## Named curricula). NOTE: record summary, no grade band given; "across the Lower School grades" stays inside the LS-page summary |
| `divisions[0].departments[0].courses[3]` | Literacy | OK | Literacy covers "phonemic and phonological awareness" in K–2, with word study through Grade 5 (LS&Tech file, ## Named curricula) |
| `divisions[0].departments[1].courses[0]` | Spanish — Descubre el Español | OK | "introduced to Spanish as an enrichment class in grades K-5"; "five Cs"; "20 Spanish-speaking countries"; heritage speakers "grades 4-5 access this program at school and at home" (LS&Tech file, ## Spanish K–5) |
| `divisions[0].departments[1].courses[1]` | IDEA (STEM) Lab | OK | "The IDEA (STEM) Lab is the only named academic facility on the entire campus... not an arts space"; in the LS weekly enrichment list (LS&Tech file, ## Technology / ## Weekly Enrichments). NOTE: "only named facility" and "not an arts space" are the record's research summary, not school text |
| `divisions[0].departments[1].courses[2]` | Healthful Living (PE & Wellness) | SITE-WRITTEN-OK | "Weekly Enrichments: Lower School- Healthful Living (PE & Wellness)…" (LS&Tech file, ## Weekly Enrichments, 2026-27 Profile) |
| `divisions[0].departments[1].courses[3]` | Visual Arts | SITE-WRITTEN-OK | "Weekly Enrichments: Lower School- … Visual Arts …" — six listed (LS&Tech file, ## Weekly Enrichments) |
| `divisions[0].departments[1].courses[4]` | Music | SITE-WRITTEN-OK | "Weekly Enrichments: Lower School- … and Music" — six listed (LS&Tech file, ## Weekly Enrichments) |
| `divisions[0].departments[1].courses[5]` | Faith Studies | NARROWS | Profile: "K-8 Faith Studies: Bible lessons, study of world religions, etc." (LS&Tech file, ## Other whole-school programmes). The school's "etc." marks a sample; the row shows the two items as the whole program. |
| `divisions[0].departments[2].courses[0]` | K–8 Technology Program | OK | "K-8 Technology Program: facilitated by Digital Learning Catalysts" "1:1 iPads for all students K-1" "1:1 Chromebooks for all students Gr. 2-8"; "Confirmed absent from every curriculum and enrichment web page" (LS&Tech file, ## Technology). NOTE: 2nd sentence is research bookkeeping, see notes.md |
| `divisions[0].departments[2].courses[1]` | K–8 Service Learning | OK | "K-8 Service Learning: Curriculum & Community Partnerships, Community Garden and Aquaponics Program" (LS&Tech file, ## Other whole-school programmes) |
| `divisions[0].departments[2].courses[2]` | RISE | OK | "In the last trimester of 5th Grade, students split into gender-based small groups for the RISE program to develop personal leadership skills" (LS&Tech file, ## The RISE programme) |
| `divisions[1].departments[0].courses[0]` | Math 6 | OK | "6th Grade: Math 6"; "grounded in a problem-based core curriculum rooted in content and practice standards" (MS Curriculum file, ## The math track) |
| `divisions[1].departments[0].courses[1]` | Pre-Algebra | SITE-WRITTEN-OK | "7th Grade: Pre-Algebra and Advanced Pre-Algebra"; "placed in grade-level and accelerated courses" (MS Curriculum file, ## The math track). NOTE: "grade-level" is inferred from the pair (the other is "Advanced"); the school does not label each course |
| `divisions[1].departments[0].courses[2]` | Advanced Pre-Algebra | OK | "placed in grade-level and accelerated courses based on specific performance criteria"; "The placement criteria themselves are NOT published" (MS Curriculum file, ## The math track) |
| `divisions[1].departments[0].courses[3]` | Foundations in Algebra | OK | School: "Students are placed in grade-level and accelerated courses based on specific performance criteria." then "8th Grade: Foundations in Algebra, Math 1, Algebra 1, Math 2, Geometry" (MS Curriculum file, ## The math track). The placement rule governs which of the five a student takes; the row drops it and reads as a free choice. Rule is shown only on the 7th-grade Advanced Pre-Algebra row. |
| `divisions[1].departments[0].courses[4]` | Math 1 | OK | School: "Students are placed in grade-level and accelerated courses based on specific performance criteria." then "8th Grade: Foundations in Algebra, Math 1, Algebra 1, Math 2, Geometry" (MS Curriculum file, ## The math track). The placement rule governs which of the five a student takes; the row drops it and reads as a free choice. Rule is shown only on the 7th-grade Advanced Pre-Algebra row. |
| `divisions[1].departments[0].courses[5]` | Algebra 1 | OK | School: "Students are placed in grade-level and accelerated courses based on specific performance criteria." then "8th Grade: Foundations in Algebra, Math 1, Algebra 1, Math 2, Geometry" (MS Curriculum file, ## The math track). The placement rule governs which of the five a student takes; the row drops it and reads as a free choice. Rule is shown only on the 7th-grade Advanced Pre-Algebra row. Credit sentence is correct: "says nothing whatsoever about credit" (## DO NOT SHIP). |
| `divisions[1].departments[0].courses[6]` | Math 2 | OK | School: "Students are placed in grade-level and accelerated courses based on specific performance criteria." then "8th Grade: Foundations in Algebra, Math 1, Algebra 1, Math 2, Geometry" (MS Curriculum file, ## The math track). The placement rule governs which of the five a student takes; the row drops it and reads as a free choice. Rule is shown only on the 7th-grade Advanced Pre-Algebra row. |
| `divisions[1].departments[0].courses[7]` | Geometry | UNSUPPORTED | School only lists "8th Grade: Foundations in Algebra, Math 1, Algebra 1, Math 2, Geometry" (MS Curriculum file, ## The math track) and ranks none; "the furthest" is site inference from list order (Math 2 and Geometry are both second-year courses). Also drops the placement rule ("placed … based on specific performance criteria"). Credit sentence is correct. |
| `divisions[1].departments[1].courses[0]` | Spanish I | OK | "Students will graduate from Trinity having completed Spanish I, a high school level course, and will be ready for Spanish II…" (MS Curriculum file, ## World language), verbatim |
| `divisions[1].departments[1].courses[1]` | Latin I | OK | "Middle School students choose between Latin and Spanish, completing Level 1, a high school course, by the end of their 8th Grade year." (MS Curriculum file, ## World language), verbatim |
| `divisions[1].departments[2].courses[0]` | Geography, Civics, and Global Issues | SITE-WRITTEN-OK | "The Social Studies course of study is 6th Grade Geography, Civics, and Global Issues" (MS Curriculum file, ## Social Studies) |
| `divisions[1].departments[2].courses[1]` | Modern World History | SITE-WRITTEN-OK | "7th Grade Modern World History" (MS Curriculum file, ## Social Studies) |
| `divisions[1].departments[2].courses[2]` | Modern United States History | SITE-WRITTEN-OK | "8th Grade Modern United States History" (MS Curriculum file, ## Social Studies) |
| `divisions[1].departments[3].courses[0]` | English / Language Arts | SITE-WRITTEN-OK | Core list "English/Language Arts" with no grade names; "Subjects get narrative paragraphs; no per-course description exists" (MS Curriculum file, ## enumerable MS course list / ## Confirmed absent) |
| `divisions[1].departments[3].courses[1]` | Science | OK | "Science, grades 6–8 — integrated, no per-grade course names published" (MS Curriculum file, ## enumerable MS course list) |
| `divisions[1].departments[4].courses[0]` | Hebrew Scriptures | SITE-WRITTEN-OK | Profile list of 13: "Hebrew Scriptures (6)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[1]` | Christian Narratives | SITE-WRITTEN-OK | Profile list of 13: "Christian Narratives (7)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[2]` | World Religions | SITE-WRITTEN-OK | Profile list of 13: "World Religions (8)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[3]` | Computer Science | OK | "Computer Science (7)"; "A 6th Grade technology class will be added to Middle School as digital learning catalysts teach students how to use AI to create code…" (MS Curriculum file, ## A forthcoming addition). NOTE: announced class is a separate course, attributed as announced; fine as context |
| `divisions[1].departments[4].courses[4]` | Learning Lab | SITE-WRITTEN-OK | Profile list of 13: "Learning Lab (6)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[5]` | Speech & Debate | SITE-WRITTEN-OK | Profile list of 13: "Speech & Debate (7)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[6]` | Social Issues Seminar | SITE-WRITTEN-OK | Profile list of 13: "Social Issues Seminar (8)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[7]` | Healthful Living | SITE-WRITTEN-OK | Profile list of 13: "Healthful Living (7)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[8]` | FOCUS Period | SITE-WRITTEN-OK | Profile list of 13: "FOCUS Period (6-8)" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[9]` | Choice Electives | OK | "Choice Electives (7-8)"; "appears only in the profile PDF and nowhere on the website at all" (MS Curriculum file, ## Weekly Enrichments / ## Confirmed absent). NOTE: 2nd sentence is research bookkeeping, see notes.md |
| `divisions[1].departments[4].courses[10]` | Art | SITE-WRITTEN-OK | Profile list of 13: "Middle School- Art, PE, …" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[4].courses[11]` | PE | SITE-WRITTEN-OK | Profile list of 13: "Middle School- Art, PE, …" (MS Curriculum file, ## Weekly Enrichments) |
| `divisions[1].departments[5].courses[0]` | Music Ensembles — Choir or Band | OK | "6th Grade students choose from one of two ensembles: choir or band." "Ensembles perform at chapels, commencement, and various venues outside of school." (MS Curriculum file, ## Ensembles and drama) |
| `divisions[1].departments[5].courses[1]` | Advanced Band / Advanced Choir | OK | "7th and 8th Grade students who decide to continue in an ensemble can choose Advanced Band or Advanced Choir" (MS Curriculum file, ## Ensembles and drama), verbatim |
| `divisions[1].departments[5].courses[2]` | Drama Elective | OK | "may also choose to take the drama elective within their schedule, or participate in the winter play or spring musical." (MS Curriculum file, ## Ensembles and drama), verbatim |
| `divisions[1].departments[6].courses[0]` | Koinonia | OK | "a Koinonia with 10-12 other Middle School students and one adult leader… every morning for check-in and twice a week for activities" (MS Curriculum file, ## Koinonia) |

</details>
