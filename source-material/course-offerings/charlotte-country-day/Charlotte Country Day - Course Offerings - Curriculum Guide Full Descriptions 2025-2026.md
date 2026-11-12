# Charlotte Country Day School — Course Offerings — Curriculum Guide Full Descriptions 2025-26
**Provenance**

- **Compiled by:** Claude Code, plan `coursecensus` Batch 1, at Derrick's request
- **Date fetched:** 2026-11-11
- **Why:** the earlier record (`Charlotte Country Day - Course Offerings - Curriculum Guide.md`)
  holds the app's own condensed descriptions word for word for 92% of courses, so it cannot
  catch a description that drifted from the catalog. This file holds the school's own text,
  for the description-to-catalog census.
- **Upper School method:** the 2025-26 Upper School Academic Policies and Course Guide PDF
  ("August update", 44 pp.) was re-downloaded from S1 and its text extracted column by column
  with `pdfplumber` (each two-column page is read left column, then right column; a page heading
  that spans both columns can be split across them, e.g. "Engli" … "ish as a Second Language").
  U+200B was read as a space and runs of spaces collapsed. No other change.
  - PDF SHA-256: `b777a4f809f4a527938cc1801f6c6c15575bf2df71b584b7244bee971382af0d`
  - PDF metadata: created 2025-08-19; the PDF's `Subject` field still reads "Academic Policies and
    Course Guide: 2023-24", a leftover from an older file; the cover and every page footer read
    2025-26 / "August 2025".
- **Lower and Middle School method:** each division's live curriculum hub and grade pages
  (S3–S15) were fetched as HTML and converted to text; site navigation, news and footer
  blocks were removed. The pages have no click-to-open tiles (checked for `fsPostLink`).
- **Catalog year:** the app was built from this same 2025-26 guide (record, 2026-07-26). No
  newer Upper School guide was looked for or used (freshness is out of scope for the census).
## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1755633363/charlottecds/kt72slq7bqecmr1hswmm/2025-26CourseCatalogueAugustupdate.pdf | 2025-26 Upper School Academic Policies and Course Guide (44 pp.), every Upper School course entry |
| S2 | https://www.charlottecountryday.org/fs/resource-manager/view/bc87ead7-8dee-4694-ab5b-b04ebf5710de | School-hosted permalink to the current guide (the app's citation link) |
| S3 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum | Lower School curriculum hub |
| S4 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/jk | Lower School, jk |
| S5 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/kindergarten | Lower School, kindergarten |
| S6 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/first-grade | Lower School, first-grade |
| S7 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/second-grade | Lower School, second-grade |
| S8 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/third-grade | Lower School, third-grade |
| S9 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/fourth-grade | Lower School, fourth-grade |
| S10 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum | Middle School curriculum hub |
| S11 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/fifth-grade | Middle School, fifth-grade |
| S12 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/sixth-grade | Middle School, sixth-grade |
| S13 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/seventh-grade | Middle School, seventh-grade |
| S14 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/eighth-grade | Middle School, eighth-grade |
| S15 | https://www.charlottecountryday.org/cd-education/middle-school | Middle School overview (language options, math classes); added during the Batch 1 census |

## Index — every app course, in app order

Where each app row's own text sits below. Upper School rows point to the guide page (PDF page number, as `===== PAGE N =====` below); Lower and Middle School rows point to the division section.

| App path | Division | Department | Title | Where |
| --- | --- | --- | --- | --- |
| `divisions[0].departments[0].courses[0]` | Lower School Courses | Core Academics | Units of Inquiry | Lower School pages |
| `divisions[0].departments[0].courses[1]` | Lower School Courses | Core Academics | Language Arts / Literacy | Lower School pages |
| `divisions[0].departments[0].courses[2]` | Lower School Courses | Core Academics | Mathematics | Lower School pages |
| `divisions[0].departments[0].courses[3]` | Lower School Courses | Core Academics | Science | Lower School pages |
| `divisions[0].departments[0].courses[4]` | Lower School Courses | Core Academics | Social Studies | Lower School pages |
| `divisions[0].departments[1].courses[0]` | Lower School Courses | Modern Languages | French & Spanish | Lower School pages |
| `divisions[0].departments[2].courses[0]` | Lower School Courses | Arts, PE & Design | Fine Arts (Art, Music, Drama) | Lower School pages |
| `divisions[0].departments[2].courses[1]` | Lower School Courses | Arts, PE & Design | Physical Education | Lower School pages |
| `divisions[0].departments[2].courses[2]` | Lower School Courses | Arts, PE & Design | Design Lab | Lower School pages |
| `divisions[0].departments[2].courses[3]` | Lower School Courses | Arts, PE & Design | Library / Information Literacy | Lower School pages |
| `divisions[1].departments[0].courses[0]` | Middle School Courses | Mathematics | Fifth Grade Math | Middle School pages |
| `divisions[1].departments[0].courses[1]` | Middle School Courses | Mathematics | Sixth Grade Math | Middle School pages |
| `divisions[1].departments[0].courses[2]` | Middle School Courses | Mathematics | Sixth Grade Pre-Algebra | Middle School pages |
| `divisions[1].departments[0].courses[3]` | Middle School Courses | Mathematics | Pre-Algebra | Middle School pages |
| `divisions[1].departments[0].courses[4]` | Middle School Courses | Mathematics | Honors Pre-Algebra | Middle School pages |
| `divisions[1].departments[0].courses[5]` | Middle School Courses | Mathematics | Honors Algebra 1 | Middle School pages |
| `divisions[1].departments[0].courses[6]` | Middle School Courses | Mathematics | Algebra 8A | Middle School pages |
| `divisions[1].departments[0].courses[7]` | Middle School Courses | Mathematics | Algebra 1 | Middle School pages |
| `divisions[1].departments[0].courses[8]` | Middle School Courses | Mathematics | Geometry | Middle School pages |
| `divisions[1].departments[1].courses[0]` | Middle School Courses | English & Social Studies | Language Arts & Social Studies (integrated) | Middle School pages |
| `divisions[1].departments[1].courses[1]` | Middle School Courses | English & Social Studies | Language Arts & Social Studies (integrated) | Middle School pages |
| `divisions[1].departments[1].courses[2]` | Middle School Courses | English & Social Studies | English | Middle School pages |
| `divisions[1].departments[1].courses[3]` | Middle School Courses | English & Social Studies | Social Studies | Middle School pages |
| `divisions[1].departments[1].courses[4]` | Middle School Courses | English & Social Studies | English | Middle School pages |
| `divisions[1].departments[1].courses[5]` | Middle School Courses | English & Social Studies | Social Studies | Middle School pages |
| `divisions[1].departments[2].courses[0]` | Middle School Courses | Science & Engineering | Science | Middle School pages |
| `divisions[1].departments[2].courses[1]` | Middle School Courses | Science & Engineering | Science: Forces of Change | Middle School pages |
| `divisions[1].departments[2].courses[2]` | Middle School Courses | Science & Engineering | Science | Middle School pages |
| `divisions[1].departments[2].courses[3]` | Middle School Courses | Science & Engineering | Science | Middle School pages |
| `divisions[1].departments[2].courses[4]` | Middle School Courses | Science & Engineering | Engineering | Middle School pages |
| `divisions[1].departments[3].courses[0]` | Middle School Courses | Modern & Classical Languages | Spanish | Middle School pages |
| `divisions[1].departments[3].courses[1]` | Middle School Courses | Modern & Classical Languages | French | Middle School pages |
| `divisions[1].departments[3].courses[2]` | Middle School Courses | Modern & Classical Languages | Latin | Middle School pages |
| `divisions[1].departments[4].courses[0]` | Middle School Courses | Fine Arts | Visual Art | Middle School pages |
| `divisions[1].departments[4].courses[1]` | Middle School Courses | Fine Arts | Band | Middle School pages |
| `divisions[1].departments[4].courses[2]` | Middle School Courses | Fine Arts | Choir | Middle School pages |
| `divisions[1].departments[4].courses[3]` | Middle School Courses | Fine Arts | Orchestra | Middle School pages |
| `divisions[1].departments[4].courses[4]` | Middle School Courses | Fine Arts | Drama | Middle School pages |
| `divisions[1].departments[4].courses[5]` | Middle School Courses | Fine Arts | General Music | Middle School pages |
| `divisions[1].departments[5].courses[0]` | Middle School Courses | PE, Health & Advisory | Physical Education | Middle School pages |
| `divisions[1].departments[5].courses[1]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |
| `divisions[1].departments[5].courses[2]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |
| `divisions[1].departments[5].courses[3]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |
| `divisions[1].departments[5].courses[4]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |
| `divisions[1].departments[5].courses[5]` | Middle School Courses | PE, Health & Advisory | Counseling | Middle School pages |
| `divisions[1].departments[5].courses[6]` | Middle School Courses | PE, Health & Advisory | Counseling: Too Good For Drugs | Middle School pages |
| `divisions[1].departments[5].courses[7]` | Middle School Courses | PE, Health & Advisory | Information Literacy | Middle School pages |
| `divisions[1].departments[5].courses[8]` | Middle School Courses | PE, Health & Advisory | Advisory | Middle School pages |
| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | English 9: Foundations in English | guide p. 9, 10 |
| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | English 10: Foundations in English II: The Individual in Society | guide p. 10 |
| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | English 11: American Literature | guide p. 9, 10, 11 |
| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | AP English 11: Language & Composition | guide p. 9, 11 |
| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | AP English 12: Literature & Composition | guide p. 9, 11 |
| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | IB English 11 (HL) | guide p. 11, 37 |
| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | IB English 12 (HL) | guide p. 11, 37 |
| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | English 12 | guide p. 9, 10, 11, 37 |
| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Creative Writing | guide p. 9 |
| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Intermediate & Advanced ESL | guide p. 12 |
| `divisions[2].departments[1].courses[0]` | Upper School Courses | Mathematics | Algebra I | guide p. 9, 13 |
| `divisions[2].departments[1].courses[1]` | Upper School Courses | Mathematics | Geometry | guide p. 9, 13, 14 |
| `divisions[2].departments[1].courses[2]` | Upper School Courses | Mathematics | Honors Geometry | guide p. 9, 13 |
| `divisions[2].departments[1].courses[3]` | Upper School Courses | Mathematics | Algebra II | guide p. 9, 13, 14, 17 |
| `divisions[2].departments[1].courses[4]` | Upper School Courses | Mathematics | Honors Algebra II | guide p. 9, 13, 14 |
| `divisions[2].departments[1].courses[5]` | Upper School Courses | Mathematics | Honors Algebra II/Precalculus | guide p. 9 |
| `divisions[2].departments[1].courses[6]` | Upper School Courses | Mathematics | Algebra III/Trigonometry | guide p. 9, 13, 14 |
| `divisions[2].departments[1].courses[7]` | Upper School Courses | Mathematics | Dynamic Math | guide p. 9, 14 |
| `divisions[2].departments[1].courses[8]` | Upper School Courses | Mathematics | Pre-calculus | guide p. 9, 13, 14, 15 |
| `divisions[2].departments[1].courses[9]` | Upper School Courses | Mathematics | Honors Pre-calculus | guide p. 9, 14, 15, 34 |
| `divisions[2].departments[1].courses[10]` | Upper School Courses | Mathematics | Introduction to Calculus & Statistics | guide p. 9 |
| `divisions[2].departments[1].courses[11]` | Upper School Courses | Mathematics | AP Statistics | guide p. 9, 14 |
| `divisions[2].departments[1].courses[12]` | Upper School Courses | Mathematics | Advanced AP Statistics with R and R Studio | guide p. 9, 14 |
| `divisions[2].departments[1].courses[13]` | Upper School Courses | Mathematics | AP Calculus AB | guide p. 9, 14 |
| `divisions[2].departments[1].courses[14]` | Upper School Courses | Mathematics | AP Calculus BC | guide p. 9, 14, 15, 39 |
| `divisions[2].departments[1].courses[15]` | Upper School Courses | Mathematics | IB Applications SL | guide p. 9, 15, 39 |
| `divisions[2].departments[1].courses[16]` | Upper School Courses | Mathematics | IB Analysis SL | guide p. 9, 15, 39 |
| `divisions[2].departments[1].courses[17]` | Upper School Courses | Mathematics | Calculus III/IB Analysis HL | guide p. 15 |
| `divisions[2].departments[2].courses[0]` | Upper School Courses | Sciences | Inquiries in Biological and Physical Science | guide p. 9, 16 |
| `divisions[2].departments[2].courses[1]` | Upper School Courses | Sciences | Biology I | guide p. 9, 16, 17, 18 |
| `divisions[2].departments[2].courses[2]` | Upper School Courses | Sciences | AP Biology | guide p. 9, 16, 19, 21 |
| `divisions[2].departments[2].courses[3]` | Upper School Courses | Sciences | IB Biology SL | guide p. 9, 16, 38, 40 |
| `divisions[2].departments[2].courses[4]` | Upper School Courses | Sciences | IB Biology HL | guide p. 9, 16, 38 |
| `divisions[2].departments[2].courses[5]` | Upper School Courses | Sciences | AP Environmental Science | guide p. 9, 17 |
| `divisions[2].departments[2].courses[6]` | Upper School Courses | Sciences | Environmental Issues | guide p. 9, 17, 43 |
| `divisions[2].departments[2].courses[7]` | Upper School Courses | Sciences | Marine Biology | guide p. 9, 17 |
| `divisions[2].departments[2].courses[8]` | Upper School Courses | Sciences | Human Anatomy: External Structural Systems | guide p. 17 |
| `divisions[2].departments[2].courses[9]` | Upper School Courses | Sciences | Human Anatomy: Internal Structural Systems | guide p. 9, 17 |
| `divisions[2].departments[2].courses[10]` | Upper School Courses | Sciences | Chemistry I | guide p. 9, 16, 17, 18 |
| `divisions[2].departments[2].courses[11]` | Upper School Courses | Sciences | Honors Chemistry I | guide p. 16, 17, 18 |
| `divisions[2].departments[2].courses[12]` | Upper School Courses | Sciences | AP Chemistry | guide p. 9, 18, 19 |
| `divisions[2].departments[2].courses[13]` | Upper School Courses | Sciences | IB Chemistry SL | guide p. 9, 18, 38, 39 |
| `divisions[2].departments[2].courses[14]` | Upper School Courses | Sciences | IB Chemistry HL | guide p. 9, 18, 39 |
| `divisions[2].departments[2].courses[15]` | Upper School Courses | Sciences | Physics I | guide p. 9, 18, 19 |
| `divisions[2].departments[2].courses[16]` | Upper School Courses | Sciences | Honors Physics I | guide p. 18 |
| `divisions[2].departments[2].courses[17]` | Upper School Courses | Sciences | AP Physics C: Mechanics, E&M | guide p. 9 |
| `divisions[2].departments[2].courses[18]` | Upper School Courses | Sciences | Astronomy: Solar Systems | guide p. 9, 18 |
| `divisions[2].departments[2].courses[19]` | Upper School Courses | Sciences | Forensic Science: Biochemical Applications | guide p. 18 |
| `divisions[2].departments[2].courses[20]` | Upper School Courses | Sciences | Forensic Science: Physical Applications | guide p. 9, 19 |
| `divisions[2].departments[2].courses[21]` | Upper School Courses | Sciences | Organic Chemistry | guide p. 9, 19, 38 |
| `divisions[2].departments[2].courses[22]` | Upper School Courses | Sciences | Honors Principles of Engineering | guide p. 19 |
| `divisions[2].departments[2].courses[23]` | Upper School Courses | Sciences | Physical Computational Biochemistry | guide p. 19 |
| `divisions[2].departments[3].courses[0]` | Upper School Courses | History & Social Studies | 9th Grade History | guide p. 20 |
| `divisions[2].departments[3].courses[1]` | Upper School Courses | History & Social Studies | Modern World History | guide p. 9, 20 |
| `divisions[2].departments[3].courses[2]` | Upper School Courses | History & Social Studies | Honors Modern World History | guide p. 9, 20 |
| `divisions[2].departments[3].courses[3]` | Upper School Courses | History & Social Studies | IB World History SL | guide p. 20, 38 |
| `divisions[2].departments[3].courses[4]` | Upper School Courses | History & Social Studies | United States History | guide p. 9, 20, 38 |
| `divisions[2].departments[3].courses[5]` | Upper School Courses | History & Social Studies | AP United States History | guide p. 9, 20 |
| `divisions[2].departments[3].courses[6]` | Upper School Courses | History & Social Studies | IB History of the Americas HL | guide p. 21, 38 |
| `divisions[2].departments[3].courses[7]` | Upper School Courses | History & Social Studies | AP Psychology | guide p. 9, 21 |
| `divisions[2].departments[3].courses[8]` | Upper School Courses | History & Social Studies | IB Psychology SL | guide p. 21, 38, 41 |
| `divisions[2].departments[3].courses[9]` | Upper School Courses | History & Social Studies | AP Human Geography | guide p. 9, 21 |
| `divisions[2].departments[3].courses[10]` | Upper School Courses | History & Social Studies | AP European History | guide p. 9, 21 |
| `divisions[2].departments[3].courses[11]` | Upper School Courses | History & Social Studies | AP US Government and Politics | guide p. 9, 21 |
| `divisions[2].departments[3].courses[12]` | Upper School Courses | History & Social Studies | Ancient Empires | guide p. 9, 22 |
| `divisions[2].departments[3].courses[13]` | Upper School Courses | History & Social Studies | Adolescent Psychology and Behavior | guide p. 9, 22 |
| `divisions[2].departments[3].courses[14]` | Upper School Courses | History & Social Studies | African American History: From Slavery to Civil Rights | guide p. 22 |
| `divisions[2].departments[3].courses[15]` | Upper School Courses | History & Social Studies | Education for Social Justice | guide p. 22 |
| `divisions[2].departments[3].courses[16]` | Upper School Courses | History & Social Studies | IB Digital Society | guide p. 8 |
| `divisions[2].departments[4].courses[0]` | Upper School Courses | Modern & Classical Languages | Honors Chinese I–V | guide p. 23 |
| `divisions[2].departments[4].courses[1]` | Upper School Courses | Modern & Classical Languages | Chinese II | guide p. 9, 23 |
| `divisions[2].departments[4].courses[2]` | Upper School Courses | Modern & Classical Languages | IB Chinese | guide p. 9, 23, 37 |
| `divisions[2].departments[4].courses[3]` | Upper School Courses | Modern & Classical Languages | French I–V | guide p. 24 |
| `divisions[2].departments[4].courses[4]` | Upper School Courses | Modern & Classical Languages | Honors French II, III, IV | guide p. 9 |
| `divisions[2].departments[4].courses[5]` | Upper School Courses | Modern & Classical Languages | AP French Language & Culture | guide p. 9, 25 |
| `divisions[2].departments[4].courses[6]` | Upper School Courses | Modern & Classical Languages | IB French HL | guide p. 9, 37 |
| `divisions[2].departments[4].courses[7]` | Upper School Courses | Modern & Classical Languages | Spanish I–V | guide p. 25 |
| `divisions[2].departments[4].courses[8]` | Upper School Courses | Modern & Classical Languages | Honors Spanish II, III, IV | guide p. 9 |
| `divisions[2].departments[4].courses[9]` | Upper School Courses | Modern & Classical Languages | AP Spanish Language & Culture | guide p. 9, 26 |
| `divisions[2].departments[4].courses[10]` | Upper School Courses | Modern & Classical Languages | IB Spanish HL | guide p. 9, 37 |
| `divisions[2].departments[4].courses[11]` | Upper School Courses | Modern & Classical Languages | Latin I–V | guide p. 26 |
| `divisions[2].departments[4].courses[12]` | Upper School Courses | Modern & Classical Languages | Honors Latin II, III, IV | guide p. 9 |
| `divisions[2].departments[4].courses[13]` | Upper School Courses | Modern & Classical Languages | AP Latin | guide p. 9, 27 |
| `divisions[2].departments[4].courses[14]` | Upper School Courses | Modern & Classical Languages | IB Latin | guide p. 9, 27, 37 |
| `divisions[2].departments[5].courses[0]` | Upper School Courses | Fine Arts | Concert Choir | guide p. 9, 28 |
| `divisions[2].departments[5].courses[1]` | Upper School Courses | Fine Arts | Honors Concert Choir | guide p. 9, 28 |
| `divisions[2].departments[5].courses[2]` | Upper School Courses | Fine Arts | Honors Chamber Choir | guide p. 9, 28 |
| `divisions[2].departments[5].courses[3]` | Upper School Courses | Fine Arts | Symphonic Band | guide p. 9, 28, 29 |
| `divisions[2].departments[5].courses[4]` | Upper School Courses | Fine Arts | Honors Symphonic Band | guide p. 9, 28, 29 |
| `divisions[2].departments[5].courses[5]` | Upper School Courses | Fine Arts | Orchestra | guide p. 9, 29, 40 |
| `divisions[2].departments[5].courses[6]` | Upper School Courses | Fine Arts | Honors Orchestra | guide p. 9, 29 |
| `divisions[2].departments[5].courses[7]` | Upper School Courses | Fine Arts | Introduction to Piano | guide p. 9, 29 |
| `divisions[2].departments[5].courses[8]` | Upper School Courses | Fine Arts | Supersonic: Percussion Ensemble | guide p. 9, 29 |
| `divisions[2].departments[5].courses[9]` | Upper School Courses | Fine Arts | AP Music Theory | guide p. 9, 29 |
| `divisions[2].departments[5].courses[10]` | Upper School Courses | Fine Arts | Acting/Directing I | guide p. 9, 29, 30 |
| `divisions[2].departments[5].courses[11]` | Upper School Courses | Fine Arts | Acting/Directing II | guide p. 9, 30 |
| `divisions[2].departments[5].courses[12]` | Upper School Courses | Fine Arts | Theater Workshop | guide p. 9 |
| `divisions[2].departments[5].courses[13]` | Upper School Courses | Fine Arts | Improvisation I | guide p. 9, 30 |
| `divisions[2].departments[5].courses[14]` | Upper School Courses | Fine Arts | Improvisation II | guide p. 30 |
| `divisions[2].departments[5].courses[15]` | Upper School Courses | Fine Arts | IB Theatre Arts (SL, HL) | guide p. 9, 29, 30, 40 |
| `divisions[2].departments[5].courses[16]` | Upper School Courses | Fine Arts | 2-D Art I–IV | guide p. 9, 30 |
| `divisions[2].departments[5].courses[17]` | Upper School Courses | Fine Arts | Design/Photography I–IV | guide p. 31 |
| `divisions[2].departments[5].courses[18]` | Upper School Courses | Fine Arts | Sculpture I–IV | guide p. 9, 31 |
| `divisions[2].departments[5].courses[19]` | Upper School Courses | Fine Arts | Architectural Design Studio | guide p. 32 |
| `divisions[2].departments[5].courses[20]` | Upper School Courses | Fine Arts | Special Projects in Visual Arts | guide p. 32 |
| `divisions[2].departments[5].courses[21]` | Upper School Courses | Fine Arts | AP Studio: 2D Art | guide p. 9, 32 |
| `divisions[2].departments[5].courses[22]` | Upper School Courses | Fine Arts | AP Studio: Design/Photography | guide p. 9, 32 |
| `divisions[2].departments[5].courses[23]` | Upper School Courses | Fine Arts | AP Studio: Sculpture | guide p. 9, 33 |
| `divisions[2].departments[5].courses[24]` | Upper School Courses | Fine Arts | AP Art History | guide p. 9, 33 |
| `divisions[2].departments[5].courses[25]` | Upper School Courses | Fine Arts | IB Art I & II (SL, HL) | guide p. 9 |
| `divisions[2].departments[5].courses[26]` | Upper School Courses | Fine Arts | Yearbook | guide p. 9, 33 |
| `divisions[2].departments[5].courses[27]` | Upper School Courses | Fine Arts | Yearbook Editor, Honors | guide p. 33 |
| `divisions[2].departments[6].courses[0]` | Upper School Courses | Technology & Computer Science | Exploring Computer Science | guide p. 9, 34 |
| `divisions[2].departments[6].courses[1]` | Upper School Courses | Technology & Computer Science | AP Computer Science A | guide p. 9, 34 |
| `divisions[2].departments[6].courses[2]` | Upper School Courses | Technology & Computer Science | Advanced Topics in Computer Science | guide p. 9, 34 |
| `divisions[2].departments[7].courses[0]` | Upper School Courses | Non-Departmental | 9th Grade Seminar | guide p. 9, 35 |
| `divisions[2].departments[7].courses[1]` | Upper School Courses | Non-Departmental | IB Theory of Knowledge | guide p. 9, 36 |
| `divisions[2].departments[7].courses[2]` | Upper School Courses | Non-Departmental | Public Speaking and Professional Communication | guide p. 35 |
| `divisions[2].departments[7].courses[3]` | Upper School Courses | Non-Departmental | IB Extended Essay & CAS | guide p. 36 |
| `divisions[2].departments[8].courses[0]` | Upper School Courses | Physical Education | Strength Training | guide p. 9, 35, 42 |
| `divisions[2].departments[8].courses[1]` | Upper School Courses | Physical Education | Ultimate Frisbee | guide p. 42 |

## Lower School — curriculum pages (S3–S9)

### Lower School curriculum hub (S3)

# Lower School Curriculum

In Lower School, we value social, emotional, physical, and academic growth and development. Each classroom includes two full-time instructional teachers who work to build a solid foundation of underlying skills and conceptual understanding to develop deep, critical thinkers and problem solvers.

In addition to a strong academic program, students gain skills to cultivate self-knowledge, develop empathy, and make responsible decisions. Experiences across the Lower School encourage and develop creativity, collaboration, and communication to foster lifelong, curious, joyful learners.

- Special area classes include science, design lab, physical education, modern languages (French and Spanish), music, art, drama, and library.

- Guest speakers, visiting performers and artists, and curriculum-related field trips help expand our student’s knowledge and help them grow in awareness, expression, and appreciation.

### jk (lower-school/ls-curriculum/jk)

# Junior Kindergarten Experience

Our Junior Kindergarten (JK) program was designed with best practices in early childhood education in mind, and it fosters each child’s growth in the following areas: social, emotional, academic, and physical.

The curriculum is student-centered, differentiated and designed to engage and inspire students through inquiry, direct instruction, and play. The curriculum is comprehensive and covers literacy, motor development, oral language development, math, themed inquiry work, and social-emotional learning.

## Curriculum

►Click to learn more

-
Units of Inquiry

-
Literacy

-
Mathematics

-
Science

-
Modern Languages

-
Physical Education

-
Fine Arts

-
Library

-
Design Lab

## Units of Inquiry

Our Units of Inquiry intentionally weave together literacy, math, science, and social studies instruction to build a strong academic foundation for our junior kindergarten students.

My Place in the World

This unit is designed to build community, build a healthy sense of identity for each child, celebrate and understand similarities and differences, understand the roles and responsibilities of community members and teach children to care for one another and for the environment.

Full STEAM Ahead

In this design and engineering unit, students learn to create blueprint plans and models to create structures, and they study different kinds of structures around the world. Fairy tales and folktales are the literacy focus of this unit. Students name problems that arise in the stories and work together to find solutions as they cycle through the engineering design process. This unit aims to develop social-emotional learning skills as students learn to work together as a group and to practice persevering when projects don’t go as planned.

Nursery Rhymes

In this literacy/dramatic play unit, students develop emergent reading and writing skills. Students practice the art of retelling and create their own nursery rhymes using the literary techniques they learn. Puppeteering, art, and drama are utilized to bring nursery rhymes to life! At the end of the unit, each class takes the stage to perform their favorite nursery rhyme!

Backyard Scientists

Students focus on the concept of change over time by examining the seasons. The unit aims to develop close observation skills, understanding what makes something living vs nonliving, and beginning to see growth/change over time. Students also examine their role in stewarding the environment.

## Literacy

Our junior kindergarteners are immersed in joyful, literacy-rich classroom environments where reading and writing are intentionally embedded in all parts of the day. Our JK literacy program is designed to foster a love of literature, to offer students many opportunities to engage in purposeful reading and writing attempts, and to develop students’ background knowledge and vocabulary. Teachers provide explicit, differentiated instruction in phonological awareness, the alphabet, and phonics.

Areas of Focus

- Fostering a love of reading and writing

- Developing vocabulary

- Hearing, segmenting, and manipulating individual sounds in spoken words

- Learning to recognize letters and sounds

- Engaging with a variety of literary genres: poetry, fiction, nonfiction, folktales

- Participating in story dramatizations

- Expressing oneself through drawing, story dictation, and emergent writing

- Building comprehension skills in retelling, comparing and contrasting, sequencing, asking questions, and analyzing characters

## Mathematics

Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers and creative thinkers. JK students develop number sense, spatial awareness, and math language skills through active exploration and playing hands-on games. Rather than being taught in isolation, math in JK is integrated throughout the day.

Skills and Concepts

- Developing number sense

- Identifying, sorting and classifying objects by common attributes

- Describing and extending repeating patterns

- Identifying, categorizing and describing 2-dimensional shapes

## Science

Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In JK, students learn the basics of observation skills and what it means to be a scientist. They cover the physical, life, and earth sciences, specifically related to seasonal changes, the color spectrum, and the human body.

## Modern Languages

Our goals are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies that will help them thrive in our global world.

All junior kindergarten students are exposed to the language and culture of both French and Spanish. Our goals are for students to become familiar with the sound of both languages and explore it by playing with basic vocabulary.

## Physical Education

The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. Our PE program provides every Lower School student with a daily opportunity to move, play and learn! The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills. Fundamental athletic skills are introduced, while students develop problem-solving strategies and sportsmanship through an environment of cooperative learning.

## Fine Arts

Students are immersed in art, music, and drama every week. Our goals are to instill a love of arts in our students, to build design-thinking skills, and to find joy in the creative process.

Art

Student artists explore the fundamental elements of art including line, shape, pattern, and color through drawing, painting, collage, printmaking and clay. Using a variety of materials and creative process lays the foundation of artistic expression.

Drama

For our youngest students, drama class is an exploration of their imagination through movement, voice, and emotions. Junior Kindergarteners also perform in an end-of-the-year play with songs highlighting the alphabet—an important foundation for reading and literacy development.

Music

JK students explore music by practicing steady beat, repeating rhythm patterns, singing solfege patterns (do-mi-sol), composing their own rhythms, playing percussion instruments, and singing fun songs.

## Library

The library is a critical component of our junior kindergarten year. The librarians help students learn to engage with pictures and text, and support a growing love of reading. In addition, the librarians teach emerging literacy skills in their regularly scheduled classes to further support the literacy instruction in the classroom.

## Design Lab

Our youngest learners enter our Design Lab ready to explore and impact the world around them. Through purposeful play and guided exploration, junior kindergarten students begin their engineering and design journey with meaningful experiences that set the stage for skill development moving forward.

### kindergarten (lower-school/ls-curriculum/kindergarten)

# Kindergarten Experience

## Curriculum at a Glance

►Click to learn more

-
Language Arts

-
Mathematics

-
Social Studies

-
Science

-
Physical Education

-
Modern Languages

-
Design Lab

-
Library

-
Fine Arts

## Language Arts

Our Lower School literacy curriculum focuses on the Five Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension.

Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and pleasure. Instruction is delivered through two programs: IMSE (Institute for Multi-Sensory Education) and Wit & Wisdom. Both programs align with the Science of Reading, have a clear scope and sequence, and explicitly teach literacy skills. IMSE is an Orton-Gillingham approach to teaching phonics. Wit & Wisdom is a knowledge-based language arts curriculum designed to help students build the knowledge and skills they need to be successful readers, writers, and effective communicators. It intentionally builds knowledge across grade levels, integrates writing into the unit modules, and provides rich text sets that align with our LS SEL and DEIB goals. Literacy instruction in kindergarten is differentiated to provide students with appropriate enrichment and support. Students work in small groups, in partnerships, and one-on-one with teachers.

Our early-reading curriculum focuses on the explicit, systematic instruction of the following skills:

- Awareness of speech sounds, segmentation, manipulation of sounds

- Letter formation and writing by hand

- Phoneme-grapheme correspondence

- Spelling patterns

- Meaningful word parts (morphemes)

Kindergarten Modules:

Module 1: The Five Senses

Module 2: Once Upon a Farm

Module 3: American, Then and Now

Module 4: The Continents

## Mathematics

Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers, and creative thinkers. The Developing Roots program is designed to build a foundation for our Math in Focus program through child-centered, hands-on experiences. The core focus in math in the Lower School is building a deep understanding of number sense, operations, and computation. Our students learn not just how to solve rote problems, but how to think mathematically and tackle real-world, rigorous mathematical problems.

Skills and Concepts

- Counting to 100 by 1s, 5s and 10s

- Composing and decomposing numbers 1–10

- Reading and writing 2-digit numbers

- Identifying, describing, sorting, and classifying 2- and 3- dimensional shapes

- Representing and solving addition and subtraction stories (within 10)

- Classifying objects based on attributes

- Measuring and comparing length and weight

## Social Studies

The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural identities, and they acquire the skills and knowledge needed to actively participate in their classroom, school, community, and world.

Units of Study

- Unit 1: Civic Ideals and Rules

- Unit 2: Getting to Know “Me” and “Us”

- Unit 3: Maps and Globes

- Unit 4: Wants and Needs

## Science

Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In kindergarten, students continue to hone their observation skills and learn to make predictions. They explore the physical, life, and earth sciences, specifically magnetism, life cycles, and environmental stewardship.

## Physical Education

The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. Our PE program provides every Lower School student with a daily opportunity to move, play and learn. The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills. Fundamental athletic skills are introduced, while students develop problem-solving strategies and sportsmanship through an environment of cooperative learning.

## Modern Languages

Our goals in Lower School are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies. Students are exposed to French and Spanish in JK through first grade. In second grade, students choose one target language with the goal of developing a Novice Low proficiency level (based on ACTFL Standards) by the end of fourth grade.

All kindergarten students are exposed to the language and culture of both French and Spanish. They practice basic words, respond to simple commands in both languages, and explore the cultures of people who speak French and Spanish around the world.

## Design Lab

Our kindergarten Design Lab learning experiences are created to develop skill, allow for application of new learning, and set design challenges that work to empower students to creatively communicate and solve problems with empathy.

Skills in engineering, coding, robotics, and multi-media design are reinforced in mini projects and authentic design challenges throughout the year.

## Library

Through the library curriculum, we strive to instill the joy and value of reading, provide access to diverse information and ideas, and equip students with the skills and knowledge necessary to access, evaluate, and apply new learning in both personal and academic pursuits. Students receive whole-class, small-group, and one-on-one instruction and practice their skills through authentic activities and research.

In kindergarten, students learn about book care, the parts of a book, how to browse books, about authors, illustrators, and characters, the difference between fiction and non-fiction, how to sequence a story, and how to question when reading. Children also explore award-winning books, and learn to listen, share their thinking, and engage in dramatic play.

## Fine Arts

Art

Kindergarten artists explore the fundamental elements of art: line, shape, pattern and color. Design concepts of emphasis, contrast, and balance give students visual structures to express ideas. A variety of techniques such as painting, drawing, collage and sculpture enable students to build creative confidence and experience the joy of hands-on materials.

Drama

Kindergarten students explore using their bodies, voices, emotions, and imaginations through the lens of children’s literature and storytelling. Our Kindergarteners also perform a play we created titled K is for Kindness which features songs about the power of friendship, kindness, and impacting the world for good.

Music

Kindergarten students explore music by practicing steady beat, repeating rhythm patterns, singing solfege patterns, composing rhythms, playing unpitched percussion and Orff instruments, learning music theory, and singing songs.

### first-grade (lower-school/ls-curriculum/first-grade)

# First Grade Experience

## Curriculum at a Glance

►Click to learn more

-
Language Arts

-
Mathematics

-
Social Studies

-
Science

-
Physical Education

-
Modern Languages

-
Design Lab

-
Library

-
Fine Arts

## Language Arts

Our Lower School literacy curriculum focuses on the 5 Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension. Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and pleasure. Instruction is delivered through two programs: IMSE (Institute for Multi-Sensory Education) and Wit & Wisdom. Both programs align with the Science of Reading, have a clear scope and sequence, and explicitly teach literacy skills. IMSE is an Orton-Gillingham approach to teaching phonics. Wit & Wisdom is a knowledge-based language arts curriculum designed to help students build the knowledge and skills they need to be successful readers and writers, and effective communicators. It intentionally builds knowledge across grade levels, integrates writing into the unit modules, and provides rich text sets that align with our LS SEL and DEIB goals. Literacy instruction in first grade is differentiated to provide students with appropriate enrichment and support. Students work in small groups, in partnerships, and one-on-one with teachers.

First Grade Modules:

Module 1: A World of Books

Module 2: Creature Features

Module 3: Powerful Forces

Module 4: Cinderella Stories

## Mathematics

Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers, and creative thinkers. Our teaching is based on the Math in Focus program, and the core focus in the Lower School is on building a deep understanding of number sense, operations, and computation. Our students learn not just how to solve rote problems, but how to think mathematically and tackle real-world, rigorous mathematical problems.

Skills and Concepts

-

Counting by 1s, 2s, 5s, and 10s forward and backward to 100

-

Identifying and relating coin values

-

Describing and extending patterns

-

Reading, writing, and explaining expressions and number sentences

-

Fluently adding and subtracting to 10

-

Adding and subtracting 2-digit numbers

-

Identifying, describing, sorting, and classifying 2-and 3- dimensional shapes

-

Measuring and comparing length and weight

-

Interpreting data in charts and graphs

-

Telling time to the half hour

## Social Studies

The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural identities, and they acquire the skills and knowledge needed to actively participate in their classroom, school, community, and world.

Units of Study

- Unit 1: Family History

- Unit 2: Economic Choices

- Unit 3: Roles in Our Community & Citizenship

- Unit 4: Urban, Suburban, and Rural Geography

## Science

Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In first grade, students practice observing, predicting, inferring, data collection and analysis, and the design process. They explore the physical, life, and earth sciences, specifically properties of light, animal anatomy, and adaptations, water cycle and weather, and the ocean.

## Physical Education

The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills.

Students pursue personal fitness goals and an understanding of skills, strategies, and rules of individual and team sports and activities. Problem-solving strategies and sportsmanship are developed through an environment of cooperative learning.

## Modern Languages

Our goals in Lower School are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies. Students are exposed to French and Spanish in JK through first grade. In second grade, students choose one target language with the goal of developing a Novice Low proficiency level (based on ACTFL Standards) by the end of fourth grade.

All first-grade students are exposed to the language and culture of both French and Spanish. They practice basic words and phrases, respond to simple commands in both languages, and explore the culture of people who speak French and Spanish around the world. Children start to participate with oral and reading skills using words and short sentences.

## Design Lab

Our first grade Design Lab learning experiences are created to develop skill, allow for application of new learning, and set design challenges that work to empower students to creatively communicate and solve problems with empathy.

Skills in engineering, coding, robotics, and multi-media design are reinforced in mini projects. Design challenges become more focused on “real world” problems allowing students to begin identifying ways to create solutions that positively impact the world around them.

## Library

Through the library curriculum, we strive to instill the joy and value of reading, provide access to diverse information and ideas, and equip students with the skills and knowledge necessary to access, evaluate, and apply new learning in both personal and academic pursuits. Students receive whole-class, small-group, and one-on-one instruction and practice their skills through authentic activities and research.

In first grade, students learn about book care, location and organization of materials in the library, how to select a “just right” book, how to read call numbers, the process for independently checking out books, how to use age-appropriate databases for learning, how to conduct basic research, the features of non-fiction literature, and strategies to use for reading comprehension.

## Fine Arts

Art

First grade artists build on their foundation of the elements of art: line, shape, pattern, and color. Design concepts of emphasis, contrast, and balance give students visual structures to express ideas. Techniques such as painting, drawing, collage, and sculpture enable students to build creative confidence and experience the joy of hands-on materials.

Drama

In first grade, students are introduced to the concept of working as an ensemble and experience supporting and encouraging one another. In addition to process-based learning in drama class, students also practice performance bravery while learning choreography, memorizing lines as a whole-class, and singing songs for the annual Country Day Thanksgiving Parade play which features fun characters such as fall leaves, cranberries, and of course, turkeys!

Music

First grade students explore music by practicing steady beat, repeating rhythm patterns, singing solfege patterns, composing rhythms, playing unpitched percussion and Orff instruments, learning music theory, and singing fun songs!

### second-grade (lower-school/ls-curriculum/second-grade)

# Second Grade Experience

## Curriculum at a Glance

►Click to learn more

-
Language Arts

-
Mathematics

-
Social Studies

-
Science

-
Physical Education

-
Modern Languages

-
Design Lab

-
Library

-
Fine Arts

## Language Arts

Our Lower School literacy curriculum focuses on the Five Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension. Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and pleasure. Instruction is delivered through two programs: IMSE (Institute for Multi-Sensory Education) and Wit & Wisdom. Both programs align with the Science of Reading, have a clear scope and sequence, and explicitly teach literacy skills. IMSE is an Orton-Gillingham approach to teaching phonics. Wit & Wisdom is a knowledge-based language arts curriculum designed to help students build the knowledge and skills they need to be successful readers and writers, and effective communicators. It intentionally builds knowledge across grade levels, integrates writing into the unit modules, and provides rich text sets that align with our LS SEL and DEIB goals. Literacy instruction in second grade is differentiated to provide students with appropriate enrichment and support. Students work in small groups, in partnerships, and one-on-one with teachers.

Second Grade Modules:

Module 1: A Season of Change

Module 2: The American West

Module 3: Civil Rights Heroes

Module 4: Good Eating

## Mathematics

Country Day’s math program is designed to build fluent mathematicians, skilled and persevering problem solvers and creative thinkers. Our teaching is based on the Math in Focus program, and the core focus in the Lower School is on building a deep understanding of number sense, operations, and computation. Our students learn not just how to solve rote problems, but how to think mathematically and tackle real-world, rigorous mathematical problems.

Skills and Concepts

- Counting by 1s, 10s, and 100s to 1000

- Identifying, counting, and making combinations of coins and bills

- Adding and subtracting within 100

- Multiplying and dividing with 2, 3, 4, 5, and 10

- Applying mental math strategies

- Describing, modeling, drawing, and adding fractions

- Describing, extending, and creating patterns

- Identifying, describing, sorting, and classifying 2- and 3- dimensional shapes

- Measuring length, mass, and volume

- Telling time to 5 minutes

- Interpreting and representing data in simple charts and graphs

## Social Studies

The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural identities, and they acquire the skills and knowledge needed to actively participate in their classroom, school, community, and world.

Units of Study

- Unit 1: Civic Ideals and Practices

- Unit 2: Locating Ourselves in the World and Our Environment

- Unit 3: Native American Groups and Cultures

- Unit 4: Migration and Immigration

- Unit 5: Symbols

## Science

Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In second grade, students practice observing, predicting, inferring, data collection and analysis, and developing the design process. They cover the physical, life, and earth sciences, specifically the states of matter, animal migration, and landforms and paleontology.

## Physical Education

The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills. Students pursue personal fitness goals and an understanding of skills, strategies, and rules of individual and team sports and activities. Problem-solving strategies, leadership, and sportsmanship are developed through an environment of cooperative learning.

## Modern Languages

Our goals in Lower School are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies. Students are exposed to French and Spanish in JK through first grade. In second grade, students choose one target language with the goal of developing a Novice Low proficiency level (based on ACTFL Standards) by the end of fourth grade.

Second graders begin to develop their vocabulary on different topics of interest and age appropriate, through the four language skills: listening, reading, pronouncing, and speaking while learning the basics of writing skills. Students communicate using memorized sentences and dialogues and are encouraged to communicate in the target language during class.

## Design Lab

Our second-grade Design Lab learning experiences are created to develop skill, allow for application of new learning, and set design challenges that work to empower students to creatively communicate and solve problems with empathy.

Skills in engineering, coding, robotics, and multi-media design are reinforced in mini projects. Design challenges become more focused on “real world” problems allowing students to begin identifying ways to create solutions that positively impact the world around them.

## Library

Through the library curriculum, we strive to instill the joy and value of reading, provide access to diverse information and ideas, and equip students with the skills and knowledge necessary to access, evaluate, and apply new learning in both personal and academic pursuits. Students receive whole-class, small-group, and one-on-one instruction and practice their skills through authentic activities and research.

In second grade, students learn how to:

- Independently select “just right” books

- Use call numbers to locate books and use the online catalog

- Effectively research topics of interest using the research cycle

- Read a database or book for evidence

- View information critically

- Use primary sources for research

- Record learned information

- Recognize different genres, and

- Communicate their understandings

## Fine Arts

Students are immersed in art, music, and drama every week. Our goals are to instill a love of art in our students, to build design-thinking skills, and to find joy in the creative process.

Art

Second grade artists continue to grow their confidence using materials and techniques taking inspiration from art history as well as the world around them. The exciting fine art crafts of weaving and clay provide a rich hands-on experience.

Drama

Second graders learn the skill of pantomime in drama class and their production shifts from a music-review to a plot-driven story centered around the theme of resiliency. Students learn class and grade level songs, choreography, and even have the opportunity to volunteer for individual speaking lines. The second grade works together to tell the tale of how to keep going even when you experience challenges in life!

Music

Second grade students explore music by practicing steady beat, repeating rhythm patterns, singing solfege patterns, composing rhythms, playing unpitched percussion and Orff instruments, learning music theory, and singing fun songs.

### third-grade (lower-school/ls-curriculum/third-grade)

# Third Grade Experience

## Curriculum at a Glance

►Click to learn more

-
Language Arts

-
Mathematics

-
Social Studies

-
Science

-
Physical Education

-
Modern Languages

-
Design Lab

-
Library

-
Fine Arts

## Language Arts

Our Lower School literacy curriculum focuses on the Five Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension. Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and pleasure. Instruction is delivered through two programs: IMSE (Institute for Multi-Sensory Education) and Wit & Wisdom. Both programs align with the Science of Reading, have a clear scope and sequence, and explicitly teach literacy skills. IMSE is an Orton-Gillingham approach to teaching phonics and morphology. Wit & Wisdom is a knowledge-based language arts curriculum designed to help students build the knowledge and skills they need to be successful readers and writers, and effective communicators. It intentionally builds knowledge across grade levels, integrates writing into the unit modules, and provides rich text sets that align with our LS SEL and DEIB goals. Literacy instruction in 3rd grade is differentiated to provide students with appropriate enrichment and support. Students work in small groups, in partnerships, and one-on-one with teachers.

Third Grade Modules:

Module 1: The Sea

Module 2: Outer Space

Module 3: A New Home

Module 4: Artists Make Art

## Mathematics

Country Day’s math program is designed to build fluent mathematicians, skilled and persevering problem solvers and creative thinkers. Our teaching is based on the Math in Focus program, and the core focus in the Lower School is on building a deep understanding of number sense, operations, and computation. Our students learn not just how to solve rote problems, but how to think mathematically and tackle real-world, rigorous mathematical problems.

Skills and Concepts

-

Adding and subtracting within 10,000

-

Building fluency in multiplication and division facts

-

Applying mental math strategies

-

Describing and manipulating fractions

-

Applying transformations and symmetry in geometric shapes

-

Identifying units and tools to measure length, mass, and volume

-

Collecting, interpreting, and representing data using tables and graphs

## Social Studies

The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural identities, and they acquire the skills and knowledge needed to actively participate in their classroom, school, community, and world.

Units of Study

- Unit 1: Country Studies

- Unit 2: Economics and Global Economics

- Unit 3: Exploration

## Science

Lower School Science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In third grade, students practice observing, predicting, inferring, data collection and analysis, the design process, and the communication of data and results. They cover the physical, life, and earth sciences, specifically force and motion/simple machines, plants, animal food chains/webs and adaptations, geology, magnifiers and microscopes.

## Physical Education

The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills. Students pursue personal fitness goals and an understanding of skills, strategies, and rules of individual and team sports and activities. Problem-solving strategies, leadership, and sportsmanship are developed through an environment of cooperative learning.

## Modern Languages

Our goals in Lower School are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies. Students are exposed to French and Spanish in JK through first grade. In second grade, students choose one target language with the goal of developing a Novice Low proficiency level (based on ACTFL Standards) by the end of fourth grade.

Third graders continue to increase their vocabulary on different topics of interest and age appropriate through the four language skills: listening, reading, pronouncing, and speaking while developing basic writing skills. Students communicate using memorized sentences and question patterns and are encouraged to communicate in the target language during class.

## Design Lab

Our third grade Design Lab learning experiences are created to develop skills, allow for application of new learning, and set design challenges that work to empower students to creatively communicate and solve problems with empathy.

Skills in engineering, coding, robotics, 3D printing, and multi-media design are reinforced in mini projects and provide opportunities for student choice and voice.

Design challenges in third grade begin to incorporate interviews into the design thinking process. These interviews help students develop skill in designing solutions tailored to specific user needs and wants.

## Library

Through the library curriculum, we strive to instill the joy and value of reading, provide access to diverse information and ideas, and equip students with the skills and knowledge necessary to access, evaluate, and apply new learning in both personal and academic pursuits. Students receive whole-class, small-group, and one-on-one instruction and practice their skills through authentic activities and research.

In third grade, students learn how to locate all materials in the library, search the online catalog for books of interest, use advanced reading strategies for comprehension, conduct research using all steps of the research cycle, record information by taking notes, use age-appropriate websites and databases as research resources, and cite sources.

## Fine Arts

Art

Third graders explore a multitude of artists, genres, and techniques using a range of artistic mediums. Art enables students to express emotion, communicate ideas, and find their creative voice.

Drama

Our third-grade drama curriculum focuses on creating characters and making bold choices through the art of improvisation while strengthening collaboration, communication, and creative problem solving skills. Their production offers challenging acting roles, and solo and duet singing opportunities.

Music

Third grade students explore music with vocal warm-ups, singing an array of songs, playing unpitched and Orff instruments, and studying music theory. They also begin the Recorder Karate program where every student has an opportunity to play the recorder and earn belts for the songs they play. Third graders also study international folk music and dance, integrating and enriching their classroom curriculum.

### fourth-grade (lower-school/ls-curriculum/fourth-grade)

# Fourth Grade Experience

## Curriculum at a Glance

►Click to learn more

-
Language Arts

-
Mathematics

-
Social Studies

-
Science

-
Physical Education

-
Modern Languages

-
Design Lab

-
Library

-
Fine Arts

## Language Arts

Our Lower School literacy curriculum focuses on the Five Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension. Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and pleasure. Instruction is delivered through two programs: IMSE (Institute for Multi-Sensory Education) and Wit & Wisdom. Both programs align with the Science of Reading, have a clear scope and sequence, and explicitly teach literacy skills. IMSE is an Orton-Gillingham approach to teaching phonics and morphology. Wit & Wisdom is a knowledge-based language arts curriculum designed to help students build the knowledge and skills they need to be successful readers and writers, and effective communicators. It intentionally builds knowledge across grade levels, integrates writing into the unit modules, and provides rich text sets that align with our LS SEL and DEIB goals. Literacy instruction in 4th grade is differentiated to provide students with appropriate enrichment and support. Students work in small groups, in partnerships, and one-on-one with teachers.

Fourth Grade Modules:

Module 1: A Great Heart

Module 2: Extreme Settings

Module 3: The Redcoats are Coming!

Module 4: Myth Making

## Mathematics

Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers and creative thinkers. Our teaching is based on the Math in Focus program, and the core focus in the Lower School is on building a deep understanding of number sense, operations, and computation. Our students learn not just how to solve rote problems, but how to think mathematically and tackle real-world, rigorous mathematical problems.

Skills and Concepts

- Adding and subtracting multi-digit whole numbers using the standard algorithm

- Fluently multiplying and dividing numbers 1-12

- Applying mental math strategies

- Recognizing, writing, naming, and converting among mixed numbers and improper fractions

- Understanding decimal notation through hundredths

- Solving addition and subtraction problems with fractions and decimals

- Identifying line and rotational symmetry

- Estimating, measuring, and classifying angles

- Collecting, interpreting, and representing data using tables, bar graphs, line graphs, and pictographs

## Social Studies

The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural identities, and they acquire the skills and knowledge needed to actively participate in their classroom, school, community, and world.

Units of Study

-
Unit 1: NC History and NC Native Americans

-
Unit 2: Freedom in a New Nation and Building a New Nation

-
Unit 3: Making Change Through Government and Citizenship

## Science

Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In fourth grade, students practice observing, predicting, inferring, data collection/analysis, the design process, communication of data and results, and they develop lab science competencies. They cover the physical, life, and earth sciences, specifically sound, food chemistry, water quality, plant adaptations, and the solar system.

## Physical Education

The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills. Students pursue personal fitness goals and an understanding of skills, strategies, and rules of individual and team sports and activities. Problem-solving strategies, leadership, and sportsmanship are developed through an environment of cooperative learning.

## Modern Languages

Our goals in Lower School are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies. Students are exposed to French and Spanish in JK through first grade. In second grade, students choose one target language with the goal of developing a Novice Low proficiency level (based on ACTFL Standards) by the end of fourth grade.

Fourth graders continue to increase their vocabulary on different topics of interest and age appropriate, through the four language skills: listening, reading, pronouncing, and speaking while developing basic writing skills. Students strengthen their four language skills at this level. They communicate using memorized sentences and question patterns and are encouraged to communicate in the target language during class.

## Design Lab

Our fourth grade Design Lab learning experiences are created to further develop skills, allow for application of new learning, and set design challenges that work to empower students to creatively communicate and solve problems with empathy.

Skills in engineering, coding, robotics, 3D printing, and multi-media design are reinforced in mini projects. In fourth grade, students begin to move seamlessly through the design process and learn how to solve design problems collaboratively.

## Library

Through the library curriculum, we strive to instill the joy and value of reading, provide access to diverse information and ideas, and equip students with the skills and knowledge necessary to access, evaluate, and apply new learning in both personal and academic pursuits. Students receive whole-class, small-group, and one-on-one instruction and practice their skills through authentic activities and research.

In fourth grade, students learn how use advanced reading strategies for comprehension, conduct research using the full research cycle, use all types of online resources for research, discuss the credibility, correctness, and currency of websites, databases, and books, use copyright principles in their work, and apply their learning to their Exhibition project at the end of the year.

## Fine Arts

Art

Fourth grade artists continue to use their knowledge of the elements of art and principles of design. With an emphasis on expression and finding their personal voice, students create works that communicate ideas and emotion. Documenting and sharing their art process with others is an essential part of our studio practice. Exploration of paint, oil pastel, markers, clay, fibers, and mixed media prepare students for Middle School art.

Drama

In fourth grade, students are immersed in the process of auditioning for a play and challenge themselves by bravely speaking in front of their peers, being a leader in all roles, and celebrating each other. The fourth grade musical changes each year and offers the most advanced lower school performance experience. Theatre skills translate into life skills which contribute to our students shining on stage and around campus throughout their time in Lower School and beyond.

Music

Fourth grade students explore music with vocal warm-ups, singing a variety of songs, playing unpitched and Orff instruments, studying music theory, and continuing the Recorder Karate program that began in third grade. Fourth graders also create a Music Showcase which encompasses the Changemakers unit from their classroom curriculum, extending their knowledge of the power music has to make a difference in the world.

## Middle School — curriculum pages (S10–S14)

### Middle School curriculum hub (S10)

# Middle School Curriculum

A rotating class schedule with seven class periods—including physical education every day—offers active engagement for students’ developing minds.

- Technology supports learning in every discipline as Middle School students build a strong foundation and prepare for the challenges of Upper School.

- Math is a strong focus for Middle School students, opportunities for honors placement and advanced math courses provide an environment where students can excel.

- Our comprehensive Middle School fine arts program provides an important outlet for creativity and self-expression during these critical transition years.

- Our two dozen Middle School sports teams and physical education program build athletic abilities, teamwork, and life-balance skills.

Throughout their four years in the Middle School, students learn study strategies and executive functioning skills that set them up for success in the Middle School and beyond.

## Middle School Science Engineering Curriculum

Since 2016, the Middle School engineering curriculum has taught students engineering design-thinking and the skills to design, build, and test prototypes.

- Engineering skills and the engineering design process are scaffolded in grades 5–8 to build on previous knowledge and experiences.

- Rooted in real-world problem-solving, engineering practices are blended with scientific concepts to develop practical, innovative solutions.

- By integrating engineering into science, students use their knowledge to inform design choices, analyze prototype performance, and make data-driven improvements. This deepens their understanding of how scientific reasoning and engineering work hand in hand.

- Students strengthen critical thinking, creativity, and collaboration while gaining real-world insight into the connection between science and engineering.

- From designing medicine coolers and rockets to creating a prototype rover to land a payload safely on Mars, we are continuously updating engineering challenges.

Advisory Program

The Advisory Program is an important part of the Middle School experience. Each student is assigned a faculty advisor and is a member of an advisory group that meets daily. The advisor provides academic and personal guidance, while the advisory group forms a supportive unit. Advisors become mentors and advocates for their students and are an important communication link between the school and the parents. Close bonds typically develop between advisor and advisee that remain well beyond the Country Day years.

Information Literacy

The library curriculum is critical to daily instruction in all disciplines. Students receive whole-class, small-group, and one-on-one instruction and practice their skills through authentic activities and research. These classes encompass a holistic approach to technology integration, critical evaluation of resources including electronic platforms, and principles of digital citizenship. The course of study is designed to teach students skills in locating, evaluating, and applying information to help them function effectively and the goal of the program is to ensure that each student acquires skills necessary to become an independent learner.

### fifth-grade (middle-school/ms-curriculum/fifth-grade)

# Fifth Grade

## Curriculum at a Glance

►Click to learn more

-
Language Arts & Social Studies

-
Mathematics

-
Modern & Classical Languages

-
Science

-
Fine Arts

-
Physical Education

-
Health

-
Counseling

## Language Arts & Social Studies

In fifth grade, language arts and social studies are integrated. The integrated program features the cross-curricular skills of reading to enhance understanding of the world, writing to communicate key ideas and opinions, critical thinking to understand one’s place in the community, and speaking as a form of empowerment.

The language arts curriculum specifically focuses on vocabulary skills, grammar concepts, and analyzing texts. The social studies curriculum guides students in the study of U.S history through the Civil War and Reconstruction. Students analyze and discuss varying perspectives on historical events. Our current event study ties closely with our historical studies, allowing students to reflect on why studying history through different lenses is vital to understanding our role in the community today.

## Mathematics

Fifth grade math topics include addition, subtraction, multiplication, and division of whole numbers, decimal numbers, and fractions, and the course concludes with a study of basic geometry. Pre-algebra skills and problem solving are included in all units of study.

## Modern & Classical Languages

The goals of the Modern and Classical Languages Department are to develop language-competent, global-minded citizens. Fifth grade Spanish and French are proficiency-oriented courses in which students practice the four skills of reading, writing, listening, and speaking, in all modes: interpretive, interpersonal, and presentational.

Units of study are thematically based, enabling students to acquire new language skills through the medium of new information. By means of a broad array of input, including authentic websites, videos, print and maps, students develop language skills and cultural awareness.

Games, skits, songs, puppet shows, and other developmentally appropriate activities motivate student learning. The resources employed support the students’ transition from the Novice Low to Novice Mid proficiency level, as defined by the American Council on the Teaching of Foreign Languages (ACTFL).

## Science

In fifth grade science, students explore science as a process, making observations, measurements, inferences, and predictions about a variety of phenomena. The curriculum has been designed to encourage students to become working scientists, to make authentic connections to the world around them, and construct solutions using the engineering design process.

Topics of exploration include lab safety, measurement skills, water cycle, pH, matter, atoms, electricity, classification of living things and flight. As an introductory course to middle school science, the course reinforces study skills, note-taking skills, and non-fiction reading strategies.

## Fine Arts

All Middle School students participate in the fine arts every day. Students are offered opportunities in the visual and performing arts. Each student in fifth grade will study art, band, choir, drama, general music, and orchestra. This allows all students to gain a better understanding of the different performing arts opportunities at the middle school. The program concentrates on developing a basic knowledge of the arts and an appreciation for them.

## Physical Education

All Middle School students participate in daily physical education. Focusing on individual improvements in physical fitness, students are asked to work on cardiovascular endurance and physical strength regularly. Additionally, students are exposed to a variety of sports throughout the year with the hope that they will be enticed to continue participating in Middle School athletics when the time comes.

## Health

Fifth grade health focuses on human growth and development. Topics discussed include the male and female reproductive system, pregnancy, and childbirth. Health is taught by the Physical Education instructors and occurs within the structures of PE class.

## Counseling

Fifth graders are taught regularly throughout the school year by our full-time Middle School Director of Counseling. The program is designed to help emerging adolescents learn important life skills. Several weeks are spent on topics such as values, friendships, cooperation, decision-making, and social skills. The goal is to increase the interpersonal and intrapersonal skills of the pre-adolescent and the classes are tailored to fit their developmental needs.

In addition, support groups are offered at all grade levels. Topics range from students who are experiencing a change in their family structure, students who are new to our school, or any other identified need. Students are invited to the group on a voluntary basis and develop skills to help them adjust to the changes in their life in a positive way. Students in these groups provide support for one another and are bound by the rules to keep all discussions in confidence.

### sixth-grade (middle-school/ms-curriculum/sixth-grade)

# Sixth Grade

## Curriculum at a Glance

►Click to learn more

-
Language Arts & Social Studies

-
Mathematics

-
Modern & Classical Languages

-
Science

-
Fine Arts

-
Physical Education

-
Health

-
Counseling

## Language Arts & Social Studies

In sixth grade, language arts and social studies are integrated. In social studies, students journey through the past learning about the creation and development of communities in global civilizations and their influences on our world today. Within this process, we aim for our students to further extend their knowledge about the diverse cultures and histories that influence humanity in the present time.

As a result, students foster a sense of empathy and understanding of others. In our language arts curriculum, students continue to develop essential skills in reading, writing, listening, and speaking. Students use these skills to become more confident and independent readers, writers, speakers, and thinkers.

## Mathematics

Sixth grade math students are placed in the appropriate level math class after carefully considering the following categories: performance in 5th grade math, algebra assessment test, standardized test scores, and teacher recommendation. A very small percentage of students are placed in 6th grade Pre-Algebra and all other students are placed in 6th grade math. Problem solving is included throughout both courses.

6th Grade Math

The topics covered include number line, values, operations with decimals and fractions, ratio and percent, algebraic expressions and equations, inequalities, coordinate plane and graphing, area of polygons, circumference and area of circles, mean, median, and mode.

6th Grade Pre-Algebra

The topics covered include number sense, fractions, factors, exponents, simplifying expressions, solving and graphing linear equations, ratios, proportions, percent, probability, and statistics.

## Modern & Classical Languages

The goals of the Modern and Classical Languages Department are to develop language-competent, global-minded citizens. Sixth grade Spanish and French are proficiency-oriented courses in which students practice the four skills of reading, writing, listening and speaking, in all modes: interpretive, interpersonal, and presentational.

Units of study are thematically based, enabling students to acquire new language skills through the medium of new information. By means of a broad array of input, including authentic websites, videos, print and maps, students develop language skills and cultural awareness.

Games, skits, songs, puppet shows, and other developmentally appropriate activities motivate student learning. The resources employed support the students’ transition from the Novice Mid to Novice High proficiency level, as defined by the American Council on the Teaching of Foreign Languages (ACTFL).

## Science

Sixth grade scientists explore a variety of topics through the lens of the scientific method. With a focus on "thinking like a scientist," students engage in the scientific process to answer questions about the world around them. From Forces and Motion to Earth Science and Astronomy, students explore "Forces of Change" while utilizing the scientific method and the engineering design process.

## Fine Arts

All Middle School students participate in the fine arts every day. Sixth grade students continue their art and drama class begun in the fifth grade and choose one of the following: band, choir/general music, or orchestra. The program concentrates on students learning and expanding their individual skill sets for each discipline in the fine arts. The goal is to develop the creative capacity within the students to think, invent, and express themselves

## Physical Education

All Middle School students participate in daily physical education. Focusing on individual improvements in physical fitness, students are asked to work on cardiovascular endurance and physical strength regularly. Additionally, students are exposed to a variety of sports throughout the year with the hope that they will be enticed to continue participating in Middle School athletics when the time comes.

## Health

Sixth grade health focuses on nutrition. With an emphasis on “Food is Fuel,” students learn how their bodies use energy from the food they eat to engage in their everyday activities. Foods are highlighted by their nutritional make-up, emphasizing what different nutrients can do for the body.

## Counseling

Sixth graders are taught regularly throughout the school year by our full-time Middle School Director of Counseling. The curriculum is called “Too Good For Drugs,” a comprehensive drug education program and addresses issues such as goal setting, decision-making, communication skills, and feeling identification.

In addition, support groups are offered at all grade levels. Topics range from students who are experiencing a change in their family structure, students who are new to our school, or any other identified need. Students are invited to the group on a voluntary basis and develop skills to help them adjust to the changes in their life in a positive way. Students in these groups provide support for one another and are bound by the rules to keep all discussions in confidence.

### seventh-grade (middle-school/ms-curriculum/seventh-grade)

# Seventh Grade

## Curriculum at a Glance

►Click to learn more

-
English

-
Social Studies

-
Mathematics

-
Modern & Classical Languages

-
Science

-
Fine Arts

-
Physical Education

-
Health

## English

The seventh-grade English curriculum further develops basic communication skills through the study of literature, reading strategies, and process writing. A workshop approach is often utilized to aid students in the development, practice, and internalization of effective reading and writing strategies and skills.

Readers' Workshop includes the use of short stories, class novels, genre studies, poetry, supplementary materials, and self-selected readings. During Writers' Workshop, students continue to craft and write original pieces while studying exemplars of the genre. Word study and grammar practice are also integral parts of class lessons and activities.

## Social Studies

In seventh grade, students enhance their understanding of global geography and representative cultures as it applies to the modern world. Students develop an understanding of the historical roots of current global issues and skills that will aid them in their investigation of major turning points that shape our world.

With an emphasis on inquiry and problem-based learning, students learn to identify and investigate the issues using critical thinking skills and domain knowledge to explore several geopolitical issues.

Each year students are challenged to become a participant in the Global Village. As students become more knowledgeable of the physical landscape and social values of the world, they demonstrate their understanding of a regional issue using model diplomacy and various performance assessments.

## Mathematics

Seventh grade students are placed in the appropriate level math class after carefully considering the following categories: performance in 6th grade math, algebra assessment test, standardized test scores, and teacher recommendation.

Pre-Algebra

The topics covered include number sense, fractions, factors, exponents, simplifying expressions, solving and graphing linear equations, ratios, proportions, percent, probability, and statistics.

Honors Pre-Algebra

Topics covered include Number Sense, Fractions, Factors & Exponents, Simplifying Expressions, Solving and Graphing Linear Equations, Ratios & Proportions, Percent, Probability, and Statistics. While these are the same topics as the Pre-Algebra course, the topics are covered in greater depth and at a faster pace.

Honors Algebra 1

Students who have completed the 6th grade Pre-Algebra course are placed in Honors Algebra. Topics covered include Algebra Foundations, Linear Functions, Writing Linear Functions, Linear Systems, Exponents and Functions, Polynomials, Quadratic Functions and Equations, Radicals and Introduction to Geometry, and Rational Expressions and Equations. While the topics are nearly the same as the Algebra 1 course, the topics are covered in greater depth and at a faster pace.

## Modern & Classical Languages

The goals of the Modern and Classical Languages Department are to develop language-competent, global-minded citizens. Seventh grade Spanish and French are proficiency-oriented courses in which students practice the four skills of reading, writing, listening, and speaking, in all modes: interpretive, interpersonal, and presentational.

Units of study are thematically based, enabling students to acquire new language skills through the medium of new information. By means of a broad array of input, including authentic websites, videos, print and maps, students develop language skills and cultural awareness.

Games, skits, songs, puppet shows, and other developmentally appropriate activities motivate student learning. The resources employed support the students’ transition from Novice to the Intermediate proficiency level, as defined by the American Council on the Teaching of Foreign Languages (ACTFL).

## Science

From body systems to cells and genetics, seventh grade science is an exploration of life science and physical science. This course is an inquiry-based study of the human body to demonstrate how these concepts are interconnected for survival.

Unit topics include energy, body systems, cells, cellular respiration, basic chemistry, immune response, genetics, natural selection, and energy transformations including light and sound. Students hone science process skills for laboratory explorations and use the engineering design process to construct solutions to problems related to these topics.

## Fine Arts

All Middle School students participate in the arts every day. In seventh grade, students experience concentrated study in one area of fine arts choosing between band, choir, drama, orchestra, or visual art. Our goal is to grow the creative capacity within the students to think, invent, and express themselves. Students gain an appreciation of and understanding of music, art, and drama. By participating in the creative process, students discover and develop their individual and collective talents

## Physical Education

All Middle School students participate in daily physical education. Focusing on individual improvements in physical fitness, students are asked to work on cardiovascular endurance and physical strength regularly. Additionally, students are exposed to a variety of sports throughout the year with the hope that they will be enticed to continue participating in Middle School athletics, which begin in seventh grade. Focus also starts being placed on non-sport related areas of fitness, such as weight training.

## Health

In seventh grade, students learn about identity, stress management, coping skills, mental well-being, and decision making. This course also examines the positives and negatives of social media. Students explore who they are and how their actions affect the world around them.

### eighth-grade (middle-school/ms-curriculum/eighth-grade)

# Eighth Grade

## Curriculum at a Glance

►Click to learn more

-
English

-
Social Studies

-
Mathematics

-
Modern & Classical Languages

-
Science

-
Fine Arts

-
Physical Education

-
Health

## English

The eighth grade English curriculum uses both classic and contemporary literature to help foster a love of reading and writing. Throughout the year, students are exposed to a variety of model texts, not only for the pleasure of reading but also to aid them in becoming more effective writers and assessing their comprehension. They write several pieces, including a vignette, a memoir, and a DBQ essay.

Grammatically, students focus on mastering rules of punctuation, usage, and agreement, and they explore new vocabulary from the literature. Collectively, these components are designed to further establish English skills and aid in the transition from Middle to Upper School.

## Social Studies

In eighth grade, students explore the history of the United States during the late 19th century through much of the 20th century. They examine the historical eras of reconstruction, industrialization, immigration, progressivism, the 1920’s, the Great Depression, World War II, the Cold War, Vietnam, the Civil Rights Movement, and Watergate. Students examine the role of government within the country’s growth, citizen’s rights, decision making, movements of change, and economic growth/decline for each topic.

Students do not rely on a textbook; instead they investigate each topic from multiple perspectives utilizing primary/secondary sources such as historical images, films, political cartoons, articles, art, and literature. In addition, students develop expository writing, research, organization, study, and critical thinking skills throughout the year.

## Mathematics

Eighth grade students are placed in the appropriate level math class after carefully considering the following categories: performance in 7th grade math, standardized test scores, and teacher recommendation.

Algebra 8A

The topics covered include foundations of expressions and equations, properties of real numbers, solving and graphing linear equations and inequalities, systems of linear equations and inequalities, exponents, and operations with polynomials. Students who take Algebra 8A will be placed in Algebra 1 in 9th grade.

Algebra 1

The topics covered include algebra foundations, linear functions, writing linear functions, linear systems, exponents and functions, polynomials, quadratic functions and equations, radicals, and an introduction to geometry.

Honors Algebra 1

The topics covered include algebra foundations, linear functions, writing linear functions, linear systems, exponents, functions, polynomials, quadratic functions and equations, and radicals. Students are also introduced to geometry, rational expressions and equations. While the topics are nearly the same as the Algebra 1 course, the topics are covered in greater depth and at a faster pace.

Geometry

Students who have completed the honors Algebra I course are placed in Geometry. Topics include foundations of geometry, deductive reasoning, proofs, parallel lines and planes, congruent lines, quadrilaterals, inequalities in triangles, indirect proofs, similar polygons, right triangles, trigonometry, circles, area of plane figures, areas and volumes of solids, coordinate geometry, and quadratic equations review.

## Modern & Classical Languages

The goals of the Modern and Classical Languages Department are to develop language-competent, global-minded citizens. Eighth grade Spanish and French are proficiency-oriented courses in which students practice the four skills of reading, writing, listening and speaking, in all modes: interpretive, interpersonal, and presentational.

Units of study are thematically based, enabling students to acquire new language skills through the medium of new information. By means of a broad array of input, including authentic websites, videos, print and maps, students develop language skills and cultural awareness.

Games, skits, songs, puppet shows, and other developmentally appropriate activities motivate student learning. The resources employed support the students’ transition to the Intermediate proficiency level, as defined by the American Council on the Teaching of Foreign Languages (ACTFL).

## Science

Eighth grade science is an introduction to the multidisciplinary field of environmental science. Using case studies as a springboard, students are challenged to use their scientific skills and knowledge to critically evaluate local and global environmental issues. Topics include biodiversity, water pollution, waste management, air pollution, climate change, and population ecology. Significant emphasis is placed on evaluating multiple sides of an argument and understanding the complexity of the environmental problems society faces today.

## Fine Arts

All Middle School students participate in the arts every day. In eighth grade, students continue their participation in their fine arts selection from seventh grade, completing two years of a concentrated study in band, choir, drama, or visual art. Our goal is to nurture the creative capacity within the students to think, invent, and express themselves. Students will gain an appreciation of and understanding of music, art, and drama. By participating in the creative process, students will discover and develop their individual and collective talents.

## Physical Education

All Middle School students participate in daily physical education. Focusing on individual improvements in physical fitness, students are asked to work on cardiovascular endurance and physical strength regularly. Additionally, students are exposed to a variety of sports throughout the year with the hope that they will be enticed to continue participating in Middle School athletics. Focus also starts being placed on non-sport related areas of fitness, such as weight training and yoga.

## Health

Eighth grade health focuses on human growth and development and decision making. Students review the male and female reproductive systems, followed by discussions about consequences of sexual activity. Students learn about decision making skills, communication, consent, and sexually transmitted diseases.

### Middle School overview (S15)

# Middle School

### Fifth–Eighth Grade

On its own distinct campus, Middle School students are guided by teachers who specialize in adolescent education and how to encourage student development through a time of great change.

As they navigate the emotional, physical, and social transition from childhood to adolescence, we prepare our students to take on more responsibility, make good decisions, and see the world through a wider lens.

Learn About Our Integrated Curriculum

Michael RinehartHead of Middle School

One of the unique things about Country Day is our separate Middle School campus. While this provides our very own athletic fields and facilities, more importantly, it allows us to elongate childhood for our students in a space where kids can be kids with access to faculty who are specifically focused on the needs of Middle Schoolers in a spacious campus. All of this allows students to gain the skills needed not only to be successful in Upper School but to be great kids.”

As a member of the Country Day Middle School community, each student:

- Develops leadership, respect, perseverance, and talent by participating in service clubs, special-interest groups, and academic competitions.

- Attends gender-specific math classes that offer the opportunity to learn in an environment free from stereotypes.

- Works with an advisor who serves as mentor and advocate, providing both academic and personal guidance.

- Participates in French, Spanish, and Latin language options.

- Enjoys a unique opportunity to participate in travel and study exchanges with sister schools in locations throughout the world.

- Gains hands-on experience with the arts, participating in visual arts, drama, band, orchestra, choir, or general music.

- Is prepared for a seamless transition to Upper School, carefully facilitated by Middle and Upper School faculty members working in close collaboration.

- Cultivates time-management, study skills, and self-discipline.

## Upper School — 2025-26 Academic Policies and Course Guide, full text (S1)

Column-ordered extraction, every page. Page numbers are the PDF's; the printed footer number is one lower.

===== PAGE 1 =====

```text
C C
HARLOTTE
U S
PPER
Academic Poli
C D
OUNTRY AY
S
CHOOL
2025-26
icies and Course Guide
```

===== PAGE 2 =====

```text
Table of Contents
General Information
Graduation Requirements . . . . . 2
Academic Honor . . . . . . . 3
Academic Information & Policies . . . . . 3
Academic Support. . . . . . . 5
A Note on Course Descriptions, Grade Requirements . . 6-7
Total Index of Courses by Department . . . . 8
Course Descriptions
English Literature & Language . . . . . 9
English as a Second Language (ESL) . . . . 11
Mathematics . . . . . . . 12
Science, Life Sciences. . . . . . . 15
Science, Physical Sciences. . . . . . 16
Science Research. . . . . . . 18
History & Social Studies . . . . . . 19
Modern & Classical Languages, Chinese . . . . 22
Modern & Classical Languages, French . . . . 23
Modern & Classical Languages, Spanish . . . . 24
Modern & Classical Languages, Latin . . . . 25
Fine Arts, Music Arts . . . . . . 27
Fine Arts, Theatre Arts . . . . . . 28
Fine Arts, Visual Arts . . . . . . 29
Technology & Computer Science . . . . . 33
Non-departmental Courses . . . . . 34
International Baccalaureate Program and Courses . . . 35
Physical Education Offerings . . . . . 41
Off-Campus and Summer Academic Opportunities . . . 42
August 2025 1
```

===== PAGE 3 =====

```text
Graduation Requirements
Each Upper School student earning a Charlotte Country Day School diploma will have
successfully completed a minimum of 21 academic credits in a series of required courses and
electives, based on individual interests and needs. Full-year courses earn 1.0 academic credits
and semester courses earn 0.5 academic credits. Students are expected to be enrolled in six
courses per semester during the years they attend Country Day. The minimum of 21 total credits
must include the following:
English Language & Literature History & Social Studies
4.0 credits 3.0 credits
All students must be enrolled in an English course during All students must complete 9th Grade History and Modern
every semester in the Upper School. Students needing World History, typically in their 9th and 10th grade years.
additional English language support may take English as a United States History (whether college preparatory or AP
Second Language (ESL) courses, which count toward the level) is required for all graduates and is usually
4.0 required English credits. completed in the junior year. Successful completion of a
research paper is required in each of grades 9-11. IB
Mathematics students typically complete their US History requirement
4.0 credits in their senior year through the History of the Americas
All students must be enrolled in a math course during course.
every semester in the Upper School.
Modern & Classical Languages
Sciences 2.0 credits
3.0 credits All students must complete at least two years of
All students must complete Biology I in their 9th or 10th consecutive study in the same language in the Upper
grade year. Students joining Country Day after the 9th or School. Most students complete three or more years of
10th grade must still fulfill the high school Biology study, with four highly recommended by most colleges
requirement, although credit may transfer from another and universities.
high school. 2.0 additional credits in lab science are
required in the Upper School. Fine Arts
1.5 credits
All students must complete 1.5 credits in the Fine Arts,
with 0.5 credits usually completed in the 9th grade. Any
combination of courses in the Visual, Theatre, or Music
Arts programs may satisfy this requirement.
Diploma requirements also include:
1) A passing grade (D-/60 or above) earned in all courses, each semester, during the senior year
2) Co-curriculars: 8 activities, 0.25 credits each (2 per year):
• participating (as player, manager, or intern) on a Country Day athletic team
• completing a Country Day physical education course
• being a part of an intensive travel team with regular practices and competitions (e.g., year-round Swim, Equestrian
competitions, etc.)
• participating in a Country Day theater production (onstage or backstage)
• completing CAS experiences (IB students only; may only be applied one time per year)
• being employed at least 40 hours over the duration of an athletic season
August 2025 2
```

===== PAGE 4 =====

```text
Academic Honor
“I pledge my honor that I have neither
given nor received aid on this assignment.”
The Honor Code is central to the student experience at Charlotte Country Day School. Students
sign the code each year and write the Honor Pledge on all graded work. Lying, cheating, and
plagiarism are all violations of the Honor Code and may result in an Honor Council hearing and
disciplinary measures with academic consequences. Please see the Upper School Student
Handbook for complete information on the Honor Code and Academic Honesty.
Academic Information & Policies
Course Load
All students in grades 9-12 are expected to take a full combined with all other student commitments, should be
course load, defined as six courses per semester. In taken into consideration when selecting courses.
certain circumstances, a student may be recommended
for a reduced course load, and this occurs with the Add/Drop
approval of the Division Head and the Director of Studies. During the first full seven cycle days of the first semester
Seniors in good academic standing may enroll in five (for first semester and full-year courses) and at the
courses in the spring semester of their senior year. Seniors beginning of the second semester (for second semester
who wish to drop from 6 to 5 courses for the spring courses only), Upper School students must follow the
semester of their senior year must do so by the last week add/drop procedure to change courses. Students are not
of first semester. Full year courses may not be dropped. If permitted to add a new course to their schedules after the
a senior wishes to drop from 6 to 5 courses, including add/drop period has ended. Dropping a course after the
Independent Studies, the student must get approval from major deadlines date in the student planner will result in
their College Counselor and notify the colleges and the designation WP (Withdrew Passing) or WF (Withdrew
universities to which applications have been submitted. Failing) on a student’s final transcript. Adding or dropping
a course may require permission of the advisor,
Homework department chair, parent, college counselor, and Director
The purpose of homework is to prepare for the next day’s of Studies.
class and to practice introduced skills. All younger
Level Changes
students should expect to be assigned approximately 20-
Course selections and placements are made with great
30 minutes of homework in each class per night, while
care, but occasionally a student is best placed in a less
older students can expect more. Major projects, tests,
rigorous course level. Students must request a level
essays, etc. may require more time outside of class. AP,
change by the first week of October, as indicated each
Honors and IB classes typically assign a heavier homework
year on the all-school calendar. When a student changes
course levels, an adjusted grade may be carried to the
load, with AP and IB course curriculum driven by
new course, depending upon the volume and type of work
overseeing organizations. This time commitment, when
completed.
August 2025 3
```

===== PAGE 5 =====

```text
Course Withdrawals
Permission to withdraw from a course after the deadline
has passed is granted by the Director of Studies on a case-
by-case basis, and not all requests for withdrawal are
granted. Withdrawals are recorded on the transcript as
Withdrawn Passing (WP) or Withdrawn Failing (WF). A
student who withdraws receives no credit for the course,
unless one full semester has been completed, in which
case the student receives 0.5 credits. In general, a student
may not be permitted to withdraw from a course if it
means that the student will drop below the minimum
course load.
Grade Reporting
The Upper School academic year consists of two
semesters, with letter grades and/or comments reported
at four intervals in a semester (accessible via the Parent
Portal). Formal comments for all students are posted at
the midterm of Semester 1 and 2; at all other times,
comments are required for any student earning an
average grade of C- or below.
Grade Point Average and Class Rank
The Upper School calculates a semester and cumulative
GPA for each student on the semester report card and the
overall transcript. The GPA calculation is used to
determine cum laude list for graduating seniors, as well as
to determine the cumulative top scholar for the
graduating class. Please note that apart from these
events, Country Day does not rank students but uses
quintile placement with colleges and universities to
convey students’ relative academic position within their
class.
Advanced Placement Courses
Country Day offers a rigorous college preparatory
curriculum designed to prepare all students for success
and achievement in college and university level study. For
those students seeking additional challenge, Country Day
offers many classes at the Honors and Advanced
Placement level, across all academic departments. The
final AP exam is the driver for the curriculum, and all AP
courses are taught with the intention of students earning
high marks on these exams. Should a student qualify for
an Advanced Placement course, families should consider
the workload in relation to other priorities in the student’s
life. For a complete index of courses, including AP
offerings, please see the Total Index of Courses by
Department.
International Baccalaureate
Diploma Program
The International Baccalaureate Diploma Program (IB) is a
two-year program that provides 11th and 12th grade
August 2025
students with a well-rounded, rigorous curriculum,
promotes international-mindedness, and service learning.
The IB program is best suited to students who are
independent workers, think critically, are passionate
about learning, and are committed to personal growth
both inside and outside of the classroom. Students in the
IB program are expected to complete the necessary level
of high-quality work to earn the IB diploma in addition to
their Country Day diploma. For complete information on
IB course offerings, please see the IB section of this course
catalog.
Course Selection
Students and parents work with the student’s advisor in
the Spring of each school year to determine a challenging
but reasonable course load for each student in the next
year. Honors, AP, and IB classes have specific qualifying
requirements that must be met for registration and must
be maintained for the remainder of the school year.
Please note that every effort is made to place students in
their chosen courses, but in some situations preferred
courses conflict in the schedule and the students will not
be able to enroll in both.
Independent Studies
Independent Studies are an opportunity for students to
pursue specialized topics not offered within the regular
curriculum. Interested students in good academic
standing may plan an Independent Study with a faculty
member and submit a proposal for approval to the
Director of Studies. Students are limited to one
Independent Study credit per semester, and with
permission, the Independent Study may replace a sixth
course. In general, an Independent Study may not replace
a graduation requirement. Completed proposals for
Independent Studies must be submitted to the Director of
Studies by the end of the final exam period in the
preceding semester. Late applications may be deferred to
the following semester or academic year. The required
proposal form can be found on the Student Life page.
Independent Studies are graded as Credit/No Credit
(CR/NC) based on criteria agreed upon between student
and supervisor, and a final presentation of work to the
Committee of Department Chairs.
Off-Campus Academic Opportunities
Country Day Upper School students have multiple
opportunities to travel and study off campus and abroad,
either through Country Day sponsored programs or
affiliate programs. For more information on these
programs, please see the section at the end of this guide.
4
```

===== PAGE 6 =====

```text
Summer Academic Programs
Country Day does not offer summer courses for academic
credit. Students taking courses at other institutions may
petition the Country Day department chair for
Educational Resource Program
The Educational Resource Program (ERP) in the Upper
School provides academic coaching for students within
the academic day. These pre-scheduled appointments are
available during school hours for a per-session fee.
Parents can indicate interest in this program by
completing the form available in the Parent Portal. Every
effort is made to match a student’s session to a free
period, but the Flex and lunch period may also be used. As
Upper School students prepare for college life, content
tutoring is balanced with a coaching approach for
problem-solving. Students should make every effort to
meet with their classroom teachers first for primary
support.
Approved Classroom Accommodations
Country Day strives to meet the needs of its students.
Students with a documented learning diagnosis (i.e.,
Dyslexia) may be recommended for certain
accommodations. Not all psychologist recommendations
August 2025
acceleration to the next level, and the transcript for the
additional coursework can be included with their college
application. Only courses taken at Country Day appear on
the Country Day transcript and factor into the GPA.
Academic Support
can be supported, however. For more information on
approved classroom accommodations, please contact the
Upper School ERP Director or visit the ERP page in the
Parent Portal.
Grading Options for ESL students
In order to manage academic pressure while they are
developing their language skills and adjusting to Country
Day’s expectations, English as a Second Language
students may opt to take certain courses as Credit/No
credit or Audit, rather than for a letter grade. The Director
of Studies must approve this recommendation, and
students should understand that Credit/No Credit and
Audit courses do not impact GPA. If an ESL student
expects to matriculate at a college or university in the
United States, this option may not be recommended.
5
```

===== PAGE 7 =====

```text
A Note on Grading Scale,
Qualifying Grades, Grade Reporting
Course Descriptions
All academic courses in this guide are designated as full year, first semester and/or second semester. If a course is listed
without a prerequisite, it is reasonable to assume that there is open enrollment for that class, but qualifying grades may be
required.
Qualifying Grades for Advanced Courses
At the midterm mark of the second semester, each department will determine respective student eligibility for Honors and
Advanced Placement courses. Eligibility is based on first semester performance and second semester performance at that
point in the year, with qualifying grades often in the A or A- range. The qualifying grades are established each year by each
department and are reflective of the content and skill mastery necessary for success at the more advanced level.
Once students have qualified for an advanced course in the spring, they must maintain the qualifying grades for the
remainder of the academic year to enroll in the advanced course for the following academic year. Students who have earned
the qualifying grade by the end of the academic year should reach out to their respective teacher and advisor to discuss the
possibility of moving to the honors or AP course for which they have qualified.
For information about eligibility for the IB Diploma program, please turn to the IB section in this catalogue.
Grading Scale Grade Reporting
Grades are reported eight times a year and
98-100 A+ 4.33
may be found in the Parent Portal.
93-97 A 4.0
90-92 A- 3.67 September: Progress Report 1
87-89 B+ 3.33 October: Midterm Report 1
December: Progress Report 2
83-86 B 3.0
January: Semester 1 grades, including
80-82 B- 2.67
exams
77-79 C+ 2.33
73-76 C 2.0 February: Progress Report 3
70-72 C- 1.67 March/April: Midterm Report 2
April/May: Progress Report 4
67-69 D+ 1.33
June: Semester 2 grades, including exams;
63-66 D 1.0
Final grades for year-long courses
60-62 D- 0.67
below 60 F/no credit 0 Note that only year-end grades appear on
the official transcript.
August 2025 6
```

===== PAGE 8 =====

```text
QUALIFICATION REQUIREMENTS TO ENTER 2025-26 HONORS/AP/ADVANCED
Minimum qualifying
Department To enter: Additional requirement (if any):
grade average:
AP English 11 87 in English 10
ENGLISH
AP English 12 87 in English 11 or 80 in AP English 11
Honors Algebra II 90 in Geometry or 83 in Hon. Geometry Teacher recommendation
Honors Geometry 90 in Algebra I Teacher recommendation
Honors Precalculus 90 in Algebra II or 83 in Hon. Alg. II Teacher recommendation
This course is only available to 10th graders. Entry to this course is limited
Honors Algebra Successful completion of Honors Geometry in 9th
to those recommended by faculty and is not designated by a grade cut-
II/Precalculus grade AND department recommendation
off.
Precalc students who qualify should choose AP Calculus AB or AP
AP Calculus AB 90 in Precalc or 83 in Hon. Precalc
Statistics, but not both.
MATH
AP Calculus BC 87 in Hon. Precalc or Hon. Alg II/Precalc
IB Analysis SL 83 in Hon. Precalc or Hon. Alg II/ Precalc
Precalc students who qualify should choose AP Calculus AB or AP
AP Statistics 90 in Precalc or 83 in Hon. Precalc
Statistics, but not both.
Adv. AP Stat with R 83 in BC Calc or enrolled in BC Calc
Calc III/IB Analysis HL 83 in BC Calc
Honors Chemistry 87 in Biology and 87 in math course (83 in Hon.) Minimum math requirement: Algebra II (previous or concurrent)
87 in current full-year science course (83 in Hon.) Minimum math requirement: Precalculus (previous or concurrent)
Honors Physics
and 87 in math (83 in Hon.)
Honors Engineering 87 in Physics I or 83 in Hon. Physics
Minimum math requirement: AP Calculus or IB Calculus (previous or
AP Physics 90 in Physics I or 85 in Hon. Physics
concurrent)
SCIENCES 90 in current full-year science course or 85 in Prerequisites: Biology I and Chem I/Hon. Chemistry
AP Biology
Hon./83 in AP *less than 87 in Bio 1 requires departmental approval
90 in current full-year science course or 85 in Prerequisites: Biology I and Chem I/Hon. Chemistry
AP Environmental
Hon./83 in AP *less than 87 in Bio 1 requires departmental approval
AP Chemistry 90 in Chemistry I or 85 in Hon. Chemistry Minimum math requirement: Precalculus (previous or concurrent)
Organic Chemistry 83 in AP or IB Chemistry
Hon Modern World 87 in History 9
AP U.S. History 87 in MWH (80 in Hon. MWH)
AP Government & AP 87 in U.S. History (80 AP US History) or 87 in MWH Open to 11th and 12th grade students; preference given to seniors
European (83 Hon.) (qualification based on current year’s History course)
HISTORY & 90 in History 9 or 85 in MWH or US; 80 in Hon. Open to 10th, 11th and 12th grade students (qualification based on
AP Human Geography
SOCIAL SCIENCES MWH or AP US current year’s History course)
Open to 11th & 12th grade students; preference given to seniors
87 in current English (80 in AP) or 87 in current
AP Psychology (qualification based on current year’s History, English, or Biology
history (80 in AP/ Hon.) or 80 in AP Bio
courses)
Open to 11th and 12th grade students; Minimum math requirement:
Precalculus (completed or concurrent); non-IB students are eligible for
IB Digital Society 87 in current history (80 in honors)
this course
All Honors Modern & 93 in current language class Students who do not qualify for Honors/AP courses may petition the
Classical Languages or 85 in current Honors class Department for special approval.
All AP/IB Higher Level
MODERN & Modern & Classical 87 in Level 4 Honors Students in Level 4 may not sign up for AP/IB HL unless approved by
CLASSICAL Languages the Department Chair.
LANGUAGES 87 in current French, Spanish, or Latin class Interested students whose grades do not meet the minimum qualifying
Honors Chinese Level I
or 80 in current Honors Class average may petition the Department for special approval.
Students who are repeating a level I course (including MS and/or US) must earn at least a 93 in order to advance to Honors II.
After Level 3, advancement from a non-honors course into an honors course is not recommended.
Hon. Chamber Choir;
Honors Chamber Choir open to students in 10th-12th grades
Hon. Orchestra; Hon. by audition (week of 3/10-3/14, 2025)
Honors Orchestra and Band open to 9th-12th grades
Symphonic Band
AP Music Theory 87 in current music class Entrance evaluation (for music proficiency before 3/14/25)
FINE ARTS AP Studio Art 87 in Level III art class Evaluation of a submitted art portfolio (due 3/12/25). See guidelines
(2D, 3D, Design) posted outside FAC 206.
Studio Art: Special Evaluation of a submitted art portfolio (due 3/12/25). See guidelines
Successful completion of Level IV visual art class.
Projects posted outside FAC 207.
AP Art History 85 in history (80 Hon/AP)
Honors Yearbook Second year and teacher approval Second year and teacher approval
COMPUTER Enrolled in Hon. Precalculus or higher or a 90 in Open to students in 10th-12th grades only.
AP Computer Science
SCIENCE ECS
August 2025 7
```

===== PAGE 9 =====

```text
Total Index of Courses by Department
English Physical Science Semester Courses: Instrumental Music Semester Courses
Full Year Courses: Astronomy: Solar Systems Introduction to Piano
English 9: Foundations in English I Forensic Science: Biomedical Applications Supersonic: Percussion Ensemble
English 10: Foundations in English II Forensic Science: Physical Applications
English 11: American Literature Honors Engineering Music Theory & Production Full Year
IB English 11 Organic Chemistry AP Music Theory
AP English 11: Language & Composition Science Research:
AP English 12: Literature & Composition Physical Computational Theatre Arts Semester Courses
IB English 12 Biochemistry Acting/Directing I
English 12 Acting/Directing II
Semester Courses: History & Social Studies Theater Workshop
Creative Writing Full Year Courses: Improvisation I, II
Ninth Grade History Visual Arts Full Year Course:
Mathematics Modern World History Yearbook
Full Year Courses: Honors Modern World History Yearbook Editor (H)
Algebra I IB World History
Geometry United States History Visual Arts Semester Courses:
Honors Geometry AP United States History 2-D Art I, II, III, IV
Algebra II IB History of the Americas Architectural Design
Honors Algebra II AP Psychology Design I, II, III, IV
Honors Algebra II/Precalculus IB Psychology Sculpture I, II, III, IV
Algebra III/Trigonometry AP Human Geography Special Topics in Visual Arts
Dynamic Math AP European History
Pre-calculus AP US/Government & Politics Full Year AP and IB Art Courses:
Honors Pre-calculus Semester Courses: AP Music Theory
Introduction to Calculus & Statistics Ancient Empires AP Studio: 2D Art
AP Statistics Adolescent Psychology and Behavior IB Art I & II (SL, HL)
Advanced AP Statistics with R and R Studio African American History AP Studio: Design/ Photography
AP Calculus AB AP Studio: Sculpture
AP Calculus BC Modern & Classical Languages AP Art History
IB Applications SL Full Year Courses: IB Theater Arts (SL, HL)
IB Analysis SL Honors Chinese I, II, III, IV, V
Calc III/IB Analysis HL Chinese II Technology & Computer Science
IB Chinese Full Year Course:
Sciences French I, II, III, IV, V AP Computer Science A
Life Science Full Year Courses: Honors French II, III, IV Semester Courses:
Inquiries in Biological and Physical Science AP French Language & Culture Exploring Computer Science
Biology I IB French HL Advanced Topics in Computer Science
AP Biology Spanish I, II, III, IV, V
IB Biology SL Honors Spanish II, III, IV Non-Departmental Courses
IB Biology HL AP Spanish Language & Culture Full Year:
AP Environmental Science IB Spanish HL 9th Grade Seminar
Life Science Semester Courses: Latin I, II, III, IV, V IB Theory of Knowledge
Environmental Issues Honors Latin II, III, IV
Marine Biology AP Latin Semester Courses:
Human Anatomy: Internal Structural Systems IB Latin Public Speaking
Human Anatomy: External Structural Podcasting: Amplify your Voice
Systems
Fine Arts
Physical Science Full Year Courses: Physical Education
Choral Music Full Year Courses:
Chemistry I Semester Course:
Honors Chamber Choir
Honors Chemistry Strength Training
Honors Concert Choir
AP Chemistry
Concert Choir
IB Chemistry SL
Instrumental Music Full Year Courses
IB Chemistry HL
Symphonic Band
Physics I
Honors Symphonic Band
Honors Physics
Orchestra
AP Physics C: Mechanics, E&M
Honors Orchestra
August 2025 8
```

===== PAGE 10 =====

```text
T
he Upper School English curriculum
inspires students to understand the
power of literature – to instruct, to
challenge, to delight, and to transform us.
Through the daily practice of reading,
writing, reflecting, and discussing, students
connect with literature, each other, and the
world. We believe that thoughtful study of
writing and literature aids the development
and articulation of a student’s distinct self
as well as a deeper understanding of others.
In our classrooms, students will question,
explore, and build their knowledge of
themselves and the world around them.
English 9 and English 10 provide a common
foundation for students through the study
of a variety of modes of writing and the
primary genres of literature – poetry, prose,
and drama. In the 11th grade, students
pursue one of three paths: English 11 and
12, Advanced Placement, or International
Baccalaureate. Qualifying students in AP 11
or English 11 may continue to AP 12 or
English 12. Students commencing IB courses
in their junior year are expected to fulfill a
two-year IB commitment.
August 2025
English Language & Literature
ENGLISH 9: Foundations in English (full year)
This course, the first in a two-year study of the
foundations of English, introduces students to the
advanced literary study required in the courses of the
Upper School English Department. The beginning of the
semester focuses on helping students build an
understanding of and proficiency with developing and
presenting arguments. Later, students use in-depth
examinations of poetry, short stories, and longer texts to
explore and present their personal and academic views,
ideas, and opinions through a variety of exercises. In
addition to literary study, students develop speaking and
oral presentation skills through a variety of activities
including the annual Ninth Grade Poem Off. The year
culminates in a portfolio of examples of the students’ best
revised written work.
ENGLISH 10: Foundations in English II: The Individual in
Society (full year)
English 10 is the second year of Country Day’s
Foundations of English course. Students continue their
study of classic and modern texts with a specific look at
how literature reflects humans’ desire to understand
themselves in relation to their world. Students study texts
during the year to inform their perspectives on and
responses to literature and demonstrate their knowledge
of a work through writing in different genres. Course
literature includes full length and short fiction as well as
major poetic forms. Analysis and argumentative thesis
development are at the forefront of all writing projects,
and a focus is placed on MLA citation for documentation
of sources. The year culminates in a multi-genre portfolio
of original student work.
ENGLISH 11: American Literature (full year)
English 11, a selected survey of American Literature,
enables juniors to apply knowledge of genre and
authorship gleaned in English 9 and English 10 to
specifically American themes, questions, and voices.
Through close reading, careful textual analysis, writing in
various rhetorical modes, and small group discussions,
students in their junior year develop specific
understandings of American culture and expression,
including the major movements of the Enlightenment,
Romanticism, and Modernism. As a culminating
assignment, students write, revise, and edit an
autobiographical portfolio of considerable length and
variety.
9
```

===== PAGE 11 =====

```text
AP ENGLISH 11:
Language & Composition (full year)
Prerequisites: grade qualification
AP English 11 is an accelerated version of English 11
(American Literature), emphasizing the same skills noted
in the English 11 description, but adding the specific
exercise of academic research. In addition, students
independently explore the role literary criticism plays in
our understanding of literature. In addition, AP students
actively prepare for the Language and Composition exam
by engaging in the study of rhetorical and literary
strategies in non-fiction, poetry, and fiction. Timed essays
and practice multiple-choice assessments are
administered throughout the year. Students are expected
to sit the AP Language and Composition Exam in May. Like
their peers in other 11th grade English courses, spring
semester AP 11 students write, revise, and edit an
autobiographical portfolio in the spring.
IB ENGLISH 11 (HL) (full year)
Please see the IB section of the course catalog for more
information.
AP ENGLISH 12: Literature & Composition (full year)
Prerequisites: grade qualification in AP English 11 or
grade qualification in English
This intensive class explores expository, analytical, and
argumentative writing with an aim towards an advanced
understanding of themes, stylistic elements, and literary
features in literature. Qualified students continue critical
reading of canonical texts and actively prepare for the
Literature and Composition test in May. In addition,
students study a survey of poetry from the 1600’s to the
present. Students are expected to sit the AP Literature
and Composition Exam in May.
IB ENGLISH 12 (HL) (full year)
Please see the IB section of the course catalog for more
information.
ENGLISH 12 (full year)
In the fall, all students will investigate the role of narrative
writing as it pertains to the world. The goal for the
semester is for students to authentically investigate and
come to understand how we use stories and narratives to
August 2025
tell the story of the world around us and our place within
that world.
Students will start the year with summer reading
exploring memoir writing and leading to an investigation
of the way memoirs tell the “truth” through the
perspective of the author who experienced it. Students
will move to more narrative non-fiction and realistic
fiction to uncover other ways in which truth is rooted in
perspective. Finally, students will use smaller works –
interviews, periodical feature articles, videos,
photographs, etc. – to uncover the stories they tell.
The fall semester will culminate with a project that tells
the story of an institution or community that matters to
them. That could be a family, a school, a place of worship,
a neighborhood, a city, or a university. The portfolio will
present, through multiple genres, the story of the chosen
institution and the student’s place relative to it.
In the spring, students will investigate thematic units
designed by their respective instructors. These give
students the opportunity to take a deeper dive into a
specific aspect of literature to continue the preparation
for college-level reading and writing. Topics previously
offered are 21st Century Literature and Film; Science
Fiction and Artificial Intelligence in Literature; Critical
Analysis of Adolescent and Fantasy Literature; and
Writers Who Paint. Each of these courses uses relevant
literature and writing assignments to help students
experience literature study more deeply than in a
traditional English class. The spring semester will
culminate with a final project representative of the
thematic focus.
10
```

===== PAGE 12 =====

```text
Engli
C
ountry Day can offer English as a
Second Language support for
students who are still developing
their English skills. ESL courses (with the
exception of TOEFL Prep) can substitute for
credits in the English or History
departments, as appropriate. ESL students
at a more advanced level frequently enroll
in a regular English course rather than an
ESL class(es) (Audit or Credit/No credit).
Intermediate ESL (full year)
Students learn to communicate in English as they practice
speaking, listening, reading, and writing skills. Basic
grammatical structures are introduced. Students also
develop an understanding of American culture through
discussion, reading, and writing about cultural issues.
Students are taught all of the English verb tenses as well
as other intermediate level grammatical skills. This course
may be repeated as needed for mastery.
Advanced ESL (full year)
High-intermediate to low-advanced level reading, writing,
and grammatical skills are taught in this course. Students
August 2025
ish as a Second Language (ESL)
read a short novel, newspaper articles, short stories, and
learn to write analytical essays and other types of essays.
The course also includes a comprehensive review of
English grammar and composition. Vocabulary building is
emphasized throughout the year to enhance reading
comprehension and written expression. This course may
be repeated as needed for mastery.
ESL American History (full year)
This course is designed for Upper School students whose
proficiency in English requires practice in reading, writing,
and speaking techniques. The goals of the course are to
develop English proficiency, to provide an overview of the
major events and figures in American history, and to
encourage students to apply learning strategies and skills
to their study of a second language. This course may
substitute for the required American History course for
ESL students.
ESL World History (full year)
This course is designed for Upper School students whose
proficiency in English requires practice in reading, writing,
and speaking techniques. Additionally, research skills are
taught along with frequent essays and papers. The course
allows students to receive an overview of World History
with an emphasis on European History. The course meets
the World History requirement for ESL students.
11
```

===== PAGE 13 =====

```text
T
he Mathematics curriculum at
Country Day promotes the optimal
mathematical development of each
student. Through innovative, challenging,
and differentiated instruction we seek to
develop student’s problem-solving & critical
thinking skills and foster an appreciation for
the power and beauty of mathematics.
Students are encouraged to question, think,
reason, compute, and communicate
mathematically to solve real-world
problems with enthusiasm, confidence, and
creativity.
ALGEBRA I (full year)
Students use graphical, symbolic, tabular, and numerical
representations as they solve problems involving
unknown quantities. Linear equations and linear
relationships are examined in great detail, and conceptual
understanding is emphasized throughout the course. The
graphing calculator is utilized and required. Students are
introduced to quadratic equations, factoring, and
irrational numbers.
GEOMETRY (full year)
Prerequisite: Algebra I
In this course, students will study parallelism, congruence,
similarity, polygons, circles, area, volume, and
transformations. Particular emphasis is placed on
inductive and deductive reasoning, logic, and proof.
Students will use Geometer’s Sketchpad to explore
relationships and formulate conjectures. Concepts of
Algebra I are reinforced, including linear equations,
graphing, and solving systems. Students are introduced to
right triangle trigonometry and counting principles.
Algebraic applications of geometry and problem solving
are greatly emphasized.
HONORS GEOMETRY (full year)
Prerequisite: Algebra I and qualification
In this course, students will study all of the topics in
Geometry but with more theory and in greater depth. A
mastery of many algebraic skills will be necessary for
students to succeed and meet the demands of this
August 2025
Mathematics
rigorous course. Particular emphasis is placed on
inductive and deductive reasoning, logic, proof, and
independent problem-solving. Students will use
Geometer’s Sketchpad to explore relationships and
formulate conjecture.
ALGEBRA II (full year)
Prerequisite: Geometry
Algebra II is an extension of Algebra I with new topics
including transformations, higher-order polynomials,
exponential, and logarithmic functions. Emphasis is
placed on describing relations in multiple ways,
developing problem-solving skills, and communicating
understanding in verbal and written formats. Students
investigate concepts and solve both with and without the
use of the graphing calculator.
HONORS ALGEBRA II (full year)
Prerequisite: Geometry or Honors Geometry and
qualification
Includes much of the same material as Algebra II plus a
unit on trigonometry and rational functions, but with
more theory and in greater depth. Significant emphasis is
placed on communication (verbal, partner and written) as
well as on applications and problem-solving.
HONORS ALGEBRA II AND PRECALCULUS (full year)
Prerequisite: Honors Geometry in 9th grade, and
recommendation of department
This course will cover the topics in Honors Algebra II and
Honors Precalculus. The pace will be greater and
independent thinking and reasoning will be emphasized
throughout the course. Students will be expected to
investigate concepts and apply their knowledge in a
variety of ways. Technology will be used extensively, and
students will be required to explore many ideas outside of
class time. The course is open to students in grade 10.
ALGEBRA III/TRIGONOMETRY (full year)
Prerequisite: Algebra II
This alternative to Pre-calculus is a comprehensive review
and extension of Algebra II topics with a study of
functions, their graphs and applications. Topics covered
include matrices, trigonometry, conics, sequences and
series, probability, and statistics. Much of the course
content is similar to that of Pre-calculus, but material is
presented at a slower pace. Students who do not meet the
minimum Algebra II grade requirement for Pre-Calculus
should take Algebra III/Trigonometry. Please note that
12
```

===== PAGE 14 =====

```text
students in Algebra III/Trigonometry are not eligible to
qualify for AP Calculus.
PRE-CALCULUS (full year)
Prerequisite: Grade qualification Algebra II (83%)
This course is a study of functions and graphs including
trigonometry, higher order polynomials, exponents,
logarithms, analytic geometry, sequences and series, and
transformations, also including some principles of
probability. Students continuously seek understanding by
communicating through use of words, tables, graphs and
Algebra. Please note: students who have completed
Algebra III/Trigonometry are not eligible to enroll in Pre-
calculus. Students should continue to Intro to Calculus &
Statistics (below).
HONORS PRE-CALCULUS (full year)
Prerequisite: Algebra II or Honors Algebra II and
qualification
This course provides an in-depth examination of
polynomial, exponential, logarithmic, power, rational,
and trigonometric functions (graphs, equations, and
applications) in preparation for AP Calculus. Students
communicate their understanding in verbal and written
formats. In addition, students thoroughly explore
sequences and series, probability, counting methods, and
polar graphing, and begin the study of limits, derivatives,
and continuity.
INTRO TO CALCULUS & STATISTICS (full year)
Prerequisite: Pre-calculus or Algebra III/Trigonometry
The first semester of this course is devoted to developing
an understanding of elementary statistics – graphing and
describing data, using data to draw conclusions, and
gathering data through surveys and experiments.
Students also study normal distributions in depth,
including standardizing normal variables and calculating
probabilities. In the second semester, students analyze
selected topics from Differential Calculus, including limits,
continuity, differentiability, and finding and applying
derivatives. The final portion of the course focuses on
financial mathematics such as investments, exponential
models of growth for compound interest, and Business
Calculus.
DYNAMIC MATH (full year)
Prerequisite: Algebra III/Trigonometry or Precalculus
Mathematical methods can be applied to solve problems
in a variety of fields, from biology to computer science to
business. This course focuses on applied math problem-
solving by utilizing topics such as matrices, sequences and
series, trigonometry, and data analysis. Through project-
based learning, students will research and learn about
applications of mathematics and statistics in exercise
August 2025
science, dietetics, and kinesiology. Data collection
methods and statistical analyses will be employed in the
context of decision science and optimization. While the
brain navigates through the math, the body will not
remain at rest. The student’s work through each unit will
culminate in a mathematically-supported fitness program
that will be executed during a class period. This course is
guaranteed to grow your brain, appreciation for math,
and physical and mental wellness! The course is open to
students in grade 12.
Advanced Math Options
AP STATISTICS (full year)
Prerequisite: Pre-calculus or Honors Pre-calculus and
qualification
A secondary school equivalent of a one-semester
introductory, non-Calculus based college course in
Statistics. Four broad conceptual themes emerge in the
course: (1) Exploring Data: observing patterns and
departures from patterns, (2) Planning a Study: deciding
what and how to measure, (3) Anticipating Patterns in
Advance: producing models using probability and
simulation, and (4) Statistical Inference: confirming
models. Students are expected to sit the AP Statistics
exam at the end of the course.
ADVANCED AP STATISTICS with R and R Studio (full year)
Prerequisite or Corequisite: AP Calculus BC
R is a programming language and statistics software
environment used for all aspects of data analysis.
RStudio® is a free, open-source integrated development
environment that facilitates the use of R. Widely used in
higher education, science, government, and industry,
these tools easily manipulate and visualize complex data.
Advanced AP Statistics with R and Rstudio® embeds the
standard AP Statistics curriculum in these statistical
software packages. Students interested in this course
should have strong analytic skills, the ability to reason
conceptually, and be comfortable in a rapid-paced
learning environment.
AP CALCULUS “AB” (full year)
Prerequisite: Pre-calculus or Honors Pre-calculus and
qualification
A college-level study that begins with limits and continuity
and continues with a study of derivatives and their
applications, integration and some applications of definite
integrals, as well as a limited number of techniques of
integration. This is a year-long course designed to prepare
the student to take the AP Calculus AB exam. Students
who take AP Calculus (AB) prior to their senior year may
13
```

===== PAGE 15 =====

```text
not take AP Calculus “BC” in any subsequent year.
Students are expected to sit the AP Calculus exam at the
end of the course.
AP CALCULUS “BC” (full year)
Prerequisite: Honors Pre-calculus and qualification
This college-level study begins with the applications of
derivatives and continues with integrals and their
applications, techniques of integration, infinite series, the
calculus of parametric and polar functions, as well as the
calculus of two-dimensional vectors. The course content
is approximately equivalent to the first two semesters of
college-level Calculus. Students are expected to sit the AP
Calculus exam at the end of the course.
CALCULUS III/IB ANALYSIS HL
Prerequisite: Satisfactory completion of AP Calculus BC
Designed for motivated high school students who have
successfully completed AP Calculus BC and are eager to
delve deeper into advanced mathematical principles, this
course follows an integrated approach to university-level
mathematics curriculum. Topics include three-
dimensional space, vectors, calculus-based statistics, and
differential equations. Additionally, students must
August 2025
formulate and justify sound mathematical arguments as
they complete mathematical investigations, make
conjectures, and construct formal proofs. In order to
prepare students for pursuing STEM-related fields in
college and beyond, this course will develop students’
ability to reason abstractly, communicate precisely, and
approach problems with patience and tenacity. Students
will complete a research paper investigating and applying
an area of mathematics commensurate with the level of
the course. Interested seniors may elect to take the IB
Analysis and Approaches HL examinations at the
conclusion of the course. Prerequisite: AP Calculus BC.
IB APPLICATIONS SL (full year, IB Students Only)
Please see the IB section of the course catalog for more
information.
IB ANALYSIS SL (full year, IB Students Only)
Please see the IB section of the course catalog for more
information.
14
```

===== PAGE 16 =====

```text
T
he Science Department at Country
Day aims to inspire a life-long love for
learning by fostering curiosity and
encouraging positive risk-taking. The
expectations will be to develop critical
thinking skills with an appreciation of and
respect for an ever-changing world of
science. Through a creative, open-ended,
multi-sensory, interdisciplinary curriculum,
students become scientifically literate
stewards of the environment and
humankind.
Biology I is the core class in the
Country Day science curriculum, required of
all current students and transfers who have
not completed a comprehensive lab course
in high school biology. This course develops
the skills and lab experience necessary to
move on in the sciences. Most students
move on to Chemistry and Physics in their
sophomore and junior years.
Current students entering 9th grade
and students new to the school have the
option to take Inquiries in Biological and
Physical Science before taking Biology 1. This
qualifies as one of the three required years
of science for graduation.
The foundations of Biology I and
Chemistry I give students the necessary
fundamentals to take on upper-level AP and
IB sciences. In addition, the science
department offers a rich array of electives
in the life sciences and physical sciences so
that students can pursue their unique
interests.
August 2025
Sciences
I. Life Sciences
INQUIRIES IN BIOLOGICAL AND PHYSICAL SCIENCE (full
year)
This foundational class will introduce a range of topics
from life and physical sciences while emphasizing critical
reading and thinking, the scientific method, and lab skills
that are crucial for success in the required Biology I
course. Students will complete a broad lab curriculum
that covers aspects of measurement, data recording and
processing, along with analysis of results and drawing
conclusions. Topics studied will include cell biology,
ecology, earth science, conceptual chemistry, chemical
reactions, materials science, and conceptual physics.
The course is open to 9th grade students ONLY
BIOLOGY I (full year)
Required for any subsequent science course
A conceptual and lab-based survey of basic Biology with
emphasis on the scientific method, biochemistry, cell
structure and function, genetics, biotechnology, human
systems, and evolution. Rather than focusing on a body of
facts, the course uses broad themes and questions to
guide student learning by drawing connections between
the different aspects of Biology. Intentional development
of study and laboratory skills is integral to the course.
AP BIOLOGY (full year)
Prerequisites: Biology I, Chemistry I or Honors Chemistry
I, and qualification
This college-level survey course includes the study of
cellular and molecular Biology, signal transduction,
Biotechnology, Genetics, Evolution, diversity of living
things, animal form and function, populations, and
ecology equivalent to a two-semester introductory level
Biology course. The course explores science as a process,
uses personal experience in scientific inquiry, and applies
biological knowledge and critical thinking to
environmental and social concerns. The goal of the course
is to develop advanced inquiry and reasoning skills,
application of mathematical routines, and connection of
concepts in and across domains structured around four
big ideas. Extended lab time is required, and students are
expected to sit the AP Biology exam.
IB BIOLOGY SL (full year); IB BIOLOGY HL (full year)
Please see the IB section of the course catalog for more
information.
15
```

===== PAGE 17 =====

```text
AP ENVIRONMENTAL SCIENCE (full year)
Prerequisites: Biology I, Chemistry I or Honors Chemistry
I and qualification
AP Environmental Science is a lab-based, college-level
course designed to provide students with the scientific
principles, concepts, and methodologies to understand
the interrelatedness of the natural world. In addition,
students are taught to identify, analyze, and evaluate
environmental issues and their potential risks and
solutions, and to become critical thinkers and problem
solvers. Topics include energy flow and matter cycling in
ecosystems, basic ecology, human population dynamics,
resource use, energy issues, food/soil resources, water
resources, biodiversity loss, air/water pollution detection
and management, eutrophication, acid rain, ozone
depletion, and climate change. Participation in a research-
driven fall semester Saturday field trip within Charlotte,
and a spring field trip to Charleston, is mandatory.
Extended lab time is required, and it is expected that
students will sit the AP Environmental Science exam. The
course is open to grades 10-12.
ENVIRONMENTAL ISSUES (first semester)
Prerequisite: Biology I
This semester course provides a survey of contemporary
environmental issues, such as climate change,
endangered species, food production, and others.
Students learn about the underlying science behind these
issues as well as explore different perspectives on them.
The course draws from the Humanities, Social Sciences,
and Natural Sciences. Debate over issues takes place in
class discussions and also on tests and lab reports. As a
culmination to the course, teams of students will present
on an issue of their choice and argue from different
perspectives. The course is open to grades 10-12.
MARINE BIOLOGY (second semester)
Prerequisite: Biology I
This semester course is a survey of the basic concepts of
Marine Biology. Topics include the interdependence of
organisms to each other and to their environments,
properties of water, the physical and chemical dynamics
of marine environments, food webs and trophic
dynamics, marine plants, marine invertebrates and
vertebrates, adaptation of marine organisms, and a
survey of selected marine ecosystems. Students study
these topics through readings and discussions, hands-on
activities, and labs. An overnight weekend trip to
Charleston for data collection is expected of all students.
The course is open to grades 10-12.
August 2025
HUMAN ANATOMY: EXTERNAL STRUCTURAL SYSTEMS (first
semester)
Prerequisite: Biology I
This semester course examines the structure and function
of the human body. All the major organ systems of the
body are introduced along with an in-depth study of the
skeletal and muscular systems. Through various case
studies, class activities, including an internal cat dissection
of the muscles, the students can enhance their
appreciation of these systems as each function both
individually and collectively in the human body. With the
basic knowledge of the body’s structure and function,
students also begin to understand the basic components
involved in achieving wellness and optimum
performance. Dissection is a mandatory requirement of
this course. The course is open to grades 10-12.
HUMAN ANATOMY: INTERNAL STRUCTURAL SYSTEMS
(second semester)
Prerequisite: Biology I (required); Human Anatomy: External
Structural Systems (recommended but not required)
This semester course is offered to students who are
interested in deeper study into the structure and function
of the internal systems of the human body. Students will
participate in lab activities, including an internal
dissection of the cat, that are designed to further enhance
their understanding and appreciation of how functions
both individually and collectively in the human body. The
systems covered are nervous, blood, cardiovascular,
respiratory, and digestive. With the basic knowledge of
the body’s structure and function, students continue to
understand the basic components involved in achieving
wellness and optimum performance as well as integrating
their knowledge of case studies. Furthermore, students
will gain insights into the prevention, care, and treatment
of a variety of medical conditions. Dissection is a
mandatory requirement of this course. The course is open
to grades 10-12.
II. Physical Sciences
CHEMISTRY I (full year)
Prerequisites: Biology I and Algebra II or higher Math
required concurrently
This course is designed to develop a conceptual
understanding of the physical and chemical properties of
matter and energy and relies extensively on problem
solving (including algebraic manipulation) and laboratory
experiences. Concepts central to the course include
atomic theory, the mole concept, chemical reactions and
16
```

===== PAGE 18 =====

```text
reactivity, quantitative analysis of chemical changes,
chemical bonding and the properties of substances,
chemical kinetics and thermodynamics, and chemical
equilibrium.
HONORS CHEMISTRY I (full year)
Prerequisites: Biology I, Algebra II or higher Math required
concurrently; qualification based on current science and
math grades
This course will cover the same topics as Chemistry I (in
addition to Nuclear Chemistry) but in more depth and at
a faster pace. An emphasis on problem-solving, analysis,
and applications of concepts is stressed through
homework, inquiry projects, and quantitative laboratory
assignments. Development of investigative techniques
and the ability to interpret results using math skills and
laboratory experiments are integral parts of the
curriculum.
AP CHEMISTRY (full year)
Prerequisites: Chemistry I or Honors Chemistry I and
qualification; Pre-calculus or higher Math required
concurrently
Through this college-level course, students will develop
an in-depth understanding of topics which include the
structure of matter and properties of matter, chemical
reactions and stoichiometry, thermodynamics, chemical
kinetics and equilibrium, the chemistry of acids and bases,
fundamental quantum mechanics, periodicity, and
chemical bonding and properties. Principles are
extensively applied both through classroom
demonstrations and laboratory work, allowing students
to develop competency in the typical laboratory skills of a
college course. This course should contribute to the
development of the ability to think clearly and to express
ideas with clarity and logic. Extended lab time is required.
Students are expected to sit the AP Chemistry exam.
IB CHEMISTRY SL (full year); IB CHEMISTRY HL (full year)
Please see the IB section of the course catalog for more
information.
PHYSICS I (full year)
Prerequisite: Completion of Algebra III, or minimum
Precalculus concurrently
This course stresses a conceptual understanding and
application of the fundamental principles of Physics and
emphasizes the illustration of those principles to
mathematical problems and questions that are relevant
to students’ daily lives and interests. Topics studied
include motion, forces, momentum, energy, waves and
wave motion, sound, light and optics, and electricity and
magnetism. The course is based on an inquiry through
labs and mathematical application of topics.
August 2025
HONORS PHYSICS I (full year)
Prerequisites: Qualification and Pre-calculus or higher
Math required concurrently
Honors Physics provides a more analytical approach to the
concepts studied in Physics I for the student who enjoys
mathematical applications. This course includes
laboratory activities, problem-solving exercises, and
student projects.
AP PHYSICS C: MECHANICS and AP PHYSICS C: ELECTRICITY
& MAGNETISM (full year)
Prerequisites: Physics I OR Honors Physics I, AB/IB Calculus
or higher Math required concurrently, AND qualification
AP Physics is a second-year physics course for the student
interested in preparing for the Level C Advanced
Placement examinations in Mechanics and in Electricity
and Magnetism. The course includes laboratory activities,
problem-solving exercises, and independent student
projects. Students are expected to sit the AP Physics
exam.
ASTRONOMY: SOLAR SYSTEMS (second semester)
Prerequisite: Chemistry I/Honors Chemistry AND Algebra II
(any level, previous or concurrent.)
This course is designed to introduce students to
Astronomy and the extraordinary space beyond our
atmosphere. Students gain basic knowledge of the
history and position of the constellations, celestial
navigation, telescope design and function,
electromagnetic radiation, the planets of our solar
system, the Sun and the Moon, comets, meteors, and
asteroids. Rather than a final exam, students complete
a significant project. The course is open to grades 11‐
12.
FORENSIC SCIENCE: BIOCHEMICAL APPLICATIONS (first
semester)
Prerequisite: Chemistry I/Honors Chemistry
This semester course offers an in-depth examination of
the biochemical aspects of forensic science, focusing on
the vital biological and biochemical methods used in
criminal investigations. Students will explore key
forensic disciplines, including general crime scene
analysis, forensic pathology, forensic entomology,
forensic anthropology, hair and fiber analysis,
fingerprinting, and DNA profiling. Through practical
laboratory exercises and case study analysis, students
will develop proficiency in techniques such as DNA
extraction, fingerprint analysis, and the examination of
insect development and skeletal remains.
17
```

===== PAGE 19 =====

```text
FORENSIC SCIENCE: PHYSICAL APPLICATIONS (second
semester)
Prerequisite: Chemistry I/Honors Chemistry
This semester course is designed to engage students in
the comprehensive exploration of the physical science-
based aspects of forensic science, focusing on the
scientific principles and techniques used to investigate
criminal cases. Students will delve into key forensic
disciplines, including the analysis of matter and glass
properties, drug and toxicology testing, serology and
bloodstain pattern analysis, fire and explosion
investigations, and firearms and tool mark identification.
Throughout the course, students will learn how to apply
scientific methods and forensic techniques to solve real-
world crimes. Hands-on laboratory experiences and case
studies will provide students with practical skills in
evidence collection, laboratory analysis, and the
interpretation of physical evidence.
ORGANIC CHEMISTRY (first semester)
Prerequisite: AP Chemistry/IB Chemistry and qualification
This semester course replicates a semester of
undergraduate Organic Chemistry – the study of the
chemistry of the element carbon. This rigorous course
offers students a rare opportunity: to develop the skills
needed to excel in the college course that is dreaded by
so many. Topics included range over structure, reactivity
and synthesis of organic molecules through to
identification of organic compounds from spectra. There
is a full synthetic lab component to the course and
extensive molecular modeling, both hands-on and
computerized. A synoptic exam of the concepts covered is
taken at the end of the semester.
HONORS PRINCIPLES of ENGINEERING (first
semester)
Prerequisite: Physics I OR Honors Physics and qualification
This Honors level course focuses on three major branches
of Engineering: Structural Mechanics, Material Science,
and Digital Electronics. Students will be introduced to
the principles of particle and rigid body mechanics with
engineering applications; force and momentum
August 2025
(rotation) systems and resultants; equilibrium of particles
and rigid bodies; material effects, and friction. Students
will also learn about the behavior of materials based
upon composition and therefore their applications;
properties of concretes and metal alloys that will be
crafted in the classroom setting; and basic principles of
digital electronics based upon physical coding. Projects
will include the construction of electronic devices from
simple (digital keyboard) to complex (wirelessly
controlled robotic hand); and the concept of using
technology to “build something that actually does
something.” Open to grades 11‐12.
III. Science Research
PHYSICAL COMPUTATIONAL BIOCHEMISTRY (second
semester)
Prerequisites: Organic Chemistry or previous or concurrent
AP Physics, AP Computer Science, AP Biology or IB HL
Biology or HL Chemistry (CR/NC)
In this course, students can extend their study of science
into actual primary research. The research students will
do in this course revolves around the folding of proteins
and the constructing of dynamic physical models that
show how they interact. Students with skills in Chemistry,
Biology, Physics and Computer Science are especially
needed to create 3D printed models that can be used to
further our understanding of biochemistry. Small groups
of students with weekly targets to solve problems will
work towards the ultimate goal of developing an
improved physical model. It is expected that students will
keep track of their hours, present their progress at weekly
group meetings and write a literature review and a final
research paper in collaboration with their group. Students
will work with professors around the country and may
publish findings and/or present at conferences as the
work progresses. Due to the unique nature of this course,
there are no grades assigned, only transcript credit. Please
see the group website: www.ccdsbiochem.com.
18
```

===== PAGE 20 =====

```text
The Upper School History and Social
Studies Department offers students a
rigorous college preparatory curriculum
rooted in further development of
analytical writing, research skills, content
comprehension and synthesis, document
evaluation and analysis, and examination
of globally diverse perspectives. In
addition to the AP and the IB programs,
students have access to a wide range of
electives. In each of the three required
years of history, students complete a
research paper, engage in debate, and
develop effective study tools and
independent project skills.
I. Full Year Courses
9th GRADE HISTORY (full year)
This course introduces students to basic historical thinking
through the in-depth study of several crucial themes in
developing a basic foundation of American Government
and American Capitalism. The class will explore multiple
forms of government and why a Democratic Republic
ended up being selected. We will also look at the
development and implementation of the Constitution
from its creation and the debates over what and who it
included/excluded and how it changed over time to serve
the citizens of the US. Our exploration will include looking
at primary and secondary resources as they pertain to the
subject matter, US Supreme Court cases and their
decisions as well as a look at the political, social and
cultural events that shaped the evolution of the American
system. The second half of the class will look at the
development of the economic systems in the US. We will
explore the creation of a market system on a macro and
micro level. The class will also explore the intertwined
nature of government and economic systems through the
development of the US. The class will also include a focus
on the foundations of research and developing a research
thesis and paper.
MODERN WORLD HISTORY (full year)
August 2025
History & Social Studies
Modern World History (or Honors Modern World History)
is required for all 10th graders. The course focuses on the
emergence of the modern world, from the 1500s to
modern times. It considers the revolutionary upheavals of
the eighteenth century, the rapid political and economic
change of the nineteenth century, the emergence of
totalitarian ideologies and regimes in the twentieth
century, and the subsequent strivings of peoples of the
world for self-determination. The course emphasizes the
refining of skills developed in 9th Grade History, including
the use of primary, secondary, and artistic sources.
Satisfactory completion of a research project is required.
HONORS MODERN WORLD HISTORY (full year)
Prerequisite: 9th Grade History and qualification
The Honors Modern World History course examines
modern world history through thematic and artistic lenses
and provides students desiring a greater challenge in
history with a broader exposure to primary sources and
increased frequency and depth of expectation in written
work and volume of reading.
IB WORLD HISTORY SL (full year)
Please see the IB section of the course catalog for more
information.
UNITED STATES HISTORY (full year)
United States History is a topical study of American history
from Indo-European contact through the present day. By
examining the political, cultural and intellectual
foundations of American civilization, students continue to
apply the question-asking, writing and research skills
learned during the previous two years. Topics include the
America’s colonial foundations, the causes and
consequences of the American Revolution and the Civil
War, the growth of American Industry, and the role of the
United States in the twentieth century world. Satisfactory
completion of a major research paper is required.
AP UNITED STATES HISTORY (full year)
Prerequisite: Modern World/ Modern World Honors and
grade qualification
This advanced survey of United States history (1600-
present) asks students to examine the origins and
development of the United States through reading,
discussion, writing, and research. Special attention is paid
to the intellectual, cultural, and political development of
the United States as well as to the basics of historical
thinking. The reading and writing load for this course is
19
```

===== PAGE 21 =====

```text
substantial. Students are expected to sit the AP US History
exam.
AP PSYCHOLOGY (full year)
Prerequisite: Qualification based on grades in the previous
yearlong English, History, or AP Biology grades
This advanced survey of introductory psychology
familiarizes students with the basic concepts in the
scientific study of human behavior. Particular emphasis is
placed on the most current neurobiological findings as
well as the important roles of learning, memory, and
consciousness in psychological processes. Students are
expected to sit the AP Psychology exam. Open to grades
11-12, with preference given to seniors.
AP HUMAN GEOGRAPHY (full year)
Prerequisite: Qualification based on grades in the previous
yearlong history course
This advanced course introduces students to the study of
patterns and processes that impact the way humans
understand, use, and change their surroundings. Students
use geographic models, methods, and tools to examine
human organization (social, political, and economic) and
its global and regional effects. Students learn to use maps
and various types of data (demographic, economic,
political, etc.) to examine spatial patterns and analyze the
ever-changing interactions among people and places.
Students are expected to sit the AP Human Geography
exam. Open to grades 10-12, with preference given to
upperclassmen.
AP EUROPEAN HISTORY (full year)
Prerequisite: Qualification based on grades in the previous
yearlong history course
This advanced course is a college-level survey of European
History from 1400-2008 offered to students
demonstrating interest and skill, writing and analysis. The
topics covered represent a chronological survey of major
political, economic, social, diplomatic, military, and
religious themes with added focus on philosophical
developments, social movements, and cross-cultural
comparisons. Writing will focus on document analysis,
historiography, and critical thinking skills in preparation
for the AP European History exam. Students are expected
to sit the AP European History Exam. Open to grades 11-
12, with preference given to seniors.
AP US GOVERNMENT AND POLITICS (full year)
Prerequisite: Qualification based on grades in the previous
yearlong history course
This advanced course examines fundamental concepts
used by political scientists to study processes, institutions,
August 2025
and outcomes of politics in a variety of settings. Students
learn to analyze and compare data on political structures
around the globe. Special emphasis is given to the
processes and institutions of the United States
government, implementation of public policies, and key
figures in charge of making and implementing policies in
the United States. The course prepares students for the
Advanced Placement US Government exam. Open to
grades 11-12, with preference given to seniors.
IB HISTORY OF THE AMERICAS HL (full year)
Please see the IB section of the course catalog for more
information.
IB INFORMATION TECHNOLOGY IN A GLOBAL SOCIETY SL
(full year)
Prerequisite: Qualification based on grades in History,
concurrent enrollment in Precalculus or higher math or
enrollment in IB program
The Information Technology in a Global Society (ITGS)
course is the study and evaluation of the impact of
information technology on individuals and society. It
explores the advantages and disadvantages of the access
and use of digitized information at the local and global
level. ITGS provides a framework for students to make
informed judgments and decisions about the use of IT
within social contexts. This course fulfills the
requirements of IB ITGS SL. This course is also open to
both IB and non-IB students in grades 11-12.
IB PSYCHOLOGY SL (full year)
Please see the IB section of the course catalog for more
information.
20
```

===== PAGE 22 =====

```text
II. Semester Electives
ADOLESCENT PSYCHOLOGY & BEHAVIOR (first semester,
repeats second semester)
This course ventures into the facets of adolescent psychology
and behavior, with a particular focus on understanding and
addressing the mental health challenges that adolescents
face in today's world. Adolescence is a critical
developmental period marked by significant physical,
cognitive, emotional, and social changes. Emphasis will be
placed on understanding the unique challenges and
opportunities of this transitional period. Through relevant
topics and perspectives, students will be involved in
discussions of various psychosocial factors that influence
adolescent mental health, including family dynamics, peer
relationships, cultural influences, media exposure, and
societal pressures. Students will learn about protective
factors, such as supportive relationships, self-esteem,
problem-solving skills, and emotional regulation techniques.
This course will also examine preventive measures and
intervention strategies aimed at promoting mental health
and addressing mental health concerns in adolescents. Open
to grades 11-12.
AFRICAN AMERICAN HISTORY: FROM SLAVERY TO CIVIL
RIGHTS (first Semester)
This semester course will explore major themes in African
American history beginning with a discussion of slavery in
Africa, the Caribbean, and Latin America. The course will
also cover topics including abolition, the Civil War,
migration, the Harlem Renaissance, the Civil Rights
Movement, and early 21st century events that pertain to
African Americans living in the United States and
internationally. Open to grades 11-12.
August 2025
ANCIENT EMPIRES (first semester, repeats second semester)
The purpose of this course is to explore the origins,
evolution, and varieties of ancient civilizations from their
origins c. 3000 BCE, ending the course around 1000 CE.
This course offers a comprehensive exploration of the
fascinating histories, cultures, and achievements of
ancient civilizations, but this does not mean they do not
represent key aspects of our present culture. We will
explore aspects of our “modern” world that have origins
in the “ancient” such as: government, religion, economy,
science, and art. The prime focus of this course will not be
on the names and dates of dynasties, kings, rulers, battles
etc. (though discussed in the context of the course) but
rather on expanding student’s worldview concerning the
nature of civilizations, its failures and successes, their
comparisons, and as a lens to interpret our modern world.
Throughout the course, students will engage with primary
sources, archaeological findings, and scholarly
interpretations to develop critical thinking and analytical
skills. By the end of the course, participants will have a
nuanced understanding of the interconnectedness of
these ancient civilizations and their enduring impact on
the modern world. Open to grades 11-12.
EDUCATION FOR SOCIAL JUSTICE (second semester)
The goal of this course is for students to undertake critical
analysis of several forms of social oppression and their
operating worldview and to be able to examine
alternative ways of understanding the world and social
relations. This class includes both an interdisciplinary
subject matter that analyzes multiple forms of oppression
and a set of interactive, experiential pedagogical
principles that help students understand the meaning of
social difference and oppression in their personal lives
and the social system. Open to grades 11-12.
21
```

===== PAGE 23 =====

```text
M
I
t is the belief of the Department of
Modern and Classical Languages that the
acquisition of languages prepares our
students to function in a global community
by providing an appreciation of cultural
differences and similarities, enhancing life
opportunities and increasing cognitive skills
and literacy. Students should continue the
study of one or more languages until an
appropriate level of proficiency is achieved,
taking into consideration individual learning
styles and longevity in the language
program.
Please note that based on enrollment numbers, courses
may function as mixed-level classes (for example, honors
and non-honors, or Levels IV and V in the same class). These
groupings vary from year to year.
I-a. Modern Languages: Chinese
HONORS CHINESE I (full year)
This course infuses the study of simplified Mandarin with
Chinese culture. Students will begin to read, write, speak,
and understand spoken Mandarin, while studying Chinese
philosophy, poetry, festivals, and art. Activities including
excursions to local markets and restaurants, cooking,
origami, calligraphy, and more!
HONORS CHINESE II (full year)
This course builds on the linguistic and cultural
foundations developed in Honors Chinese language and
Culture I. Students will further develop their Chinese
language skills of reading, writing, listening, and speaking,
while continuing to explore Chinese culture.
CHINESE II (full year)
Prerequisite: Qualification based on Chinese level I
performance
This course will meet at the same time as Honors Chinese
II, but is available to those students who did not meet the
threshold for an honors placement at the end of Honors
Chinese I. While still rigorous, the demands of the course
August 2025
Modern & Classical Languages
will be somewhat less while still developing skills in
reading, writing, listening, and speaking, while continuing
to explore Chinese culture.
HONORS CHINESE III (full year)
This course builds on the linguistic and cultural
foundations developed in Honors Chinese language and
Culture II. Students will further develop their Chinese
language skills of reading, writing, listening, and speaking,
while continuing to explore Chinese culture.
HONORS CHINESE IV (full year)
This course builds on the linguistic and cultural
foundations developed in Honors Chinese language and
Culture III. Students will further develop their Chinese
language skills of reading, writing, listening, and speaking,
while continuing to explore Chinese culture.
HONORS CHINESE V (full year)
This course builds on the linguistic and cultural
foundations developed in Honors Chinese language and
Culture IV. Students will further develop their Chinese
language skills of reading, writing, listening, and speaking,
while continuing to explore Chinese culture.
IB CHINESE (full year)
In this capstone course, students develop the ability to
communicate in Chinese Mandarin through the study of
language, themes, and texts. In doing so, they also
develop conceptual understandings of how language
works. Communication is evidenced through receptive,
productive, and interactive skills across a range of
contexts and purposes that are appropriate to the level of
the course. IB ab initio Chinese Mandarin is organized into
five prescribed themes: identities, experiences, human
ingenuity, social organization and sharing the planet. The
class will be conducted entirely in Chinese Mandarin.
22
```

===== PAGE 24 =====

```text
I-b. Modern Languages: French
FRENCH I (full year)
This course is an introduction to the Francophone cultures
and the basic structure of the French language.
Fundamental skills including speaking, writing, reading,
and listening. Understanding and building a good
vocabulary are strongly emphasized through games,
dialogues, skits, and projects. The class is conducted
predominantly in French.
FRENCH II (full year)
This course continues to build on the
knowledge of French language and francophone cultures
studied in French I. Students are introduced
to new grammar and vocabulary concepts, working to
communicate in simple and complex sentences. Students
continue to develop all their language skills and work to
grow their French language proficiency from the novice to
the intermediate level. The class is conducted
predominantly in French.
HONORS FRENCH II (full year)
Prerequisite: Qualification based on French level I
performance
This course continues to build on the knowledge of French
language and francophone cultures studied in French
I. Working at an accelerated pace, students are
introduced to new grammar and vocabulary concepts,
working to communicate in simple and complex
sentences. Students continue to develop all their
language skills and work to grow their French language
proficiency from the novice to the intermediate level. The
class is conducted entirely in French.
FRENCH III (full year)
This course continues to build on the knowledge of French
language and Francophone cultures studied in French
II. Students are introduced to more complex grammar
and vocabulary concepts, allowing them to narrate in
different time frames while incorporating more advanced
sentence structures. French language proficiency
continues to develop at the intermediate level. The class
is conducted in French.
August 2025
HONORS FRENCH III (full year)
Prerequisite: Qualification based on French level II
performance
This accelerated course continues to build on the
knowledge of French language and Francophone
cultures acquired in French II Honors. Students are
introduced to more complex grammar and vocabulary
concepts, allowing them to narrate in different time
frames while incorporating more advanced sentence
structures. Students are introduced to authentic
literature from Francophone countries. French language
proficiency continues to develop at the intermediate
level. The class is conducted entirely in French.
FRENCH IV (full year)
In this advanced course students continue to
develop their understanding of French and Francophone
cultures and focus on the practical application of their
French language skills. Students use authentic materials
as a springboard to enhance their conversational skills and
understanding of Francophone cultures and current
events. Daily, students are expected to engage in
conversations, expand their vocabulary and practice
their language skills. This course is conducted in French.
HONORS FRENCH IV (full year)
Prerequisite: Qualification based on French level III
performance
In this advanced course, students continue their study
of authentic literature and other materials to enhance
their French language skills and understanding of
Francophone cultures and current events. Daily, students
are expected to engage in conversations, expand their
vocabulary and practice their French language skills. This
course is conducted entirely in French.
FRENCH V (full year)
This course is designed to be a bridge between a
grammar/vocabulary-based course and a university-
level conversation class. Students continue to practice
listening, reading, writing, and speaking in French.
Students use authentic materials as a springboard to
enhance their conversational skills and understanding of
Francophone cultures and current events. French
grammar is reviewed as needed, and the class is
conducted entirely in French.
23
```

===== PAGE 25 =====

```text
AP FRENCH LANGUAGE AND CULTURE (full year)
Prerequisite: Qualification based on Honors French level
IV performance
This program of advanced reading, composition, speaking
and vocabulary building provides preparation for the
Advanced Placement French Language and
Culture Examination. The core themes of AP
(family/community, science/technology, beauty/
aesthetics, contemporary life, global issues,
personal/public identity) are addressed throughout the
year. Students are expected to express themselves in
French, both written and spoken, in a variety of contexts
and modes including presentational, interpersonal,
formal and informal. The class is conducted entirely in
French.
IB FRENCH HIGHER LEVEL (full year)
Prerequisite: Qualification based on Honors French level
IV performance AND enrollment in the IB Program
At the Higher Level, students are expected to extend the
range and complexity of the language they use and
understand in order to communicate. They continue to
develop their knowledge of vocabulary and grammar, as
well as their conceptual understanding of how language
works, in order to construct, analyze and
evaluate arguments on a variety of topics relating to
course content and the target language culture(s).
Students will also engage with the text types and themes
required for the IB examinations. This course is
conducted entirely in French. Note: this course prepares
students for the Higher Level IB assessments.
I-c. Modern Languages: Spanish
SPANISH I (full year)
This course is an introduction to the Spanish language and
culture, with emphasis on the basics of grammar and
spoken Spanish. Students are expected to master
essential verb structures and to express themselves both
orally and in writing. The class is conducted
predominantly in Spanish.
SPANISH II (full year)
This course is a continuation of the introduction to the
language and culture begun in Spanish I. Students are
introduced to most Spanish verb tenses in the indicative
mood and grow their Spanish language proficiency
through reading, writing, listening, and speaking. The
class is conducted predominantly in Spanish.
August 2025
HONORS SPANISH II (full year)
Prerequisite: Qualification based on Spanish level I
performance
This course is a faster-paced study of Spanish II that
emphasizes the four critical skills in second language
learning of speaking, listening, writing, and
reading. Students strengthen and expand conversational
skills while developing their abilities to communicate and
move from present to past to future in their speech,
writing, and interpretation of the language. Students are
introduced to the geography, music, and culture of
Spanish speaking countries. The class is conducted in
Spanish.
SPANISH III (full year)
This course is an extension of the skills covered in Spanish
I and II with a curriculum designed to strengthen the
language foundation of each student through the
incorporation of new vocabulary and grammar. The
course includes fluency-building activities; and the
language skills of reading, writing, listening, and speaking
are equally emphasized. The class is conducted
predominantly in Spanish.
HONORS SPANISH III (full year)
Prerequisite: Qualification based on Spanish level II
performance
This course is an extension of the skills covered in Spanish
I and II with a curriculum designed to strengthen and
deepen the language foundation of each student through
the incorporation of new vocabulary and grammar. The
course includes extensive fluency-building activities; and
the language skills of reading, writing, listening, and
speaking are equally emphasized. The class moves at an
accelerated pace and is conducted entirely in Spanish.
SPANISH IV (full year)
This course is a comprehensive review of Spanish
grammar that places emphasis on improving composition
and conversation skills while expanding
vocabulary. Students will use authentic materials and
task-based activities to practice communication through
reading, writing, listening, and speaking. The class
includes reading and discussions on Hispanic civilization
and tradition, emphasizing similarities and points of
contrast with the North American culture. The class is
conducted entirely in Spanish.
HONORS SPANISH IV (full year)
Prerequisite: Qualification based on Spanish level III
performance
This is an advanced course where students continue to
develop and expand their awareness and general
knowledge of the Hispanic and Latin American culture.
24
```

===== PAGE 26 =====

```text
The class focuses on the practical application of every skill.
It is the expectation of this course that students develop
an understanding of advanced grammar skills and acquire
beyond the required vocabulary. Work includes – but is
not limited to – oral presentations and projects, the study
of contemporary issues, periodicals, short stories, and
movies. On a daily basis, students are expected to engage
in speaking interactions, expand their own vocabulary,
and practice their writing skills. This course is conducted
entirely in Spanish.
SPANISH V (full year)
This is an advanced course where students continue to
develop and expand their knowledge of Hispanic and Latin
American cultures. The class focuses on the practical
application of every skill. It is expected that students
develop advanced grammar skills and move beyond the
required vocabulary. Work includes – but is not limited to
– oral presentations, projects, discussing contemporary
issues, reading short stories, and studying Spanish films.
Students will use authentic materials (newspapers,
magazine articles, short stories, and films) as a
springboard to enhance their conversational skills. This
class is conducted entirely in Spanish. Note: this course
also prepares IB students for the Standard Level
assessments.
AP SPANISH LANGUAGE AND CULTURE (full year)
Prerequisite: Qualification based on Honors Spanish level
IV performance
This course is a program of advanced reading,
composition, speaking, and vocabulary building which
provides preparation for the Advanced Placement and
International Baccalaureate Spanish language
examinations. The core themes of AP (family/community,
science/technology, beauty/aesthetics, contemporary
life, global issues, personal/public identity) are addressed
throughout the year. Students are expected to express
themselves in Spanish, both written and spoken, in a
variety of contexts and modes: presentational,
interpersonal, formal and informal. The class is conducted
entirely in Spanish.
IB SPANISH HIGHER LEVEL (full year)
Prerequisite: Qualification based on Honors Spanish level
IV performance AND enrollment in the IB Program
At the Higher Level, students are expected to extend the
range and complexity of the language they use and
understand in order to communicate. They continue to
develop their knowledge of vocabulary and grammar, as
well as their conceptual understanding of how language
works, in order to construct, analyze and evaluate
arguments on a variety of topics relating to course
August 2025
content and the target language culture(s). Students will
also engage with the text types and themes required for
the IB examinations. This course is conducted entirely in
Spanish. Note: this course prepares students for the
Higher Level IB assessments.
II. Classical Languages: Latin
Please note that based on enrollment numbers, courses may
function as mixed level classes (for example, honors and
non-honors level students in the same class). These
groupings vary from year to year.
LATIN I (full year)
This course is an introduction to the basic grammar,
syntax, and vocabulary of Latin. Students learn to
manipulate the myriad inflections of Latin and become
adept at reading edited original texts in Latin. Students
are also introduced to the cultural contributions of the
Roman Empire, particularly as they are reflected in our
language and vocabulary.
LATIN II (full year)
This course is a continuation of Latin I with a more in-
depth study of grammar and more lines of translation.
Additional topics, such as history and culture, are also
covered as time permits.
HONORS LATIN II (full year)
Prerequisite: Qualification based on Latin level I
performance
This course is a study of Latin II with a more in-depth study
of grammar and more complex translation passages.
Additional topics, such as history and culture, will also be
covered as time permits.
Note: The Honors Latin II class schedule will be modified
to meet face-to-face 3x/cycle. The modified schedule
allows all Honors Latin II students, Double-Language (DL)
& non-DL, to share in the classroom experience and
supports the transition to more independent learning,
which is essential in Honors Latin III. As this modification
accommodates the scheduling needs of DL Latin students,
the asynchronous Latin II DL9 class is no longer offered.
LATIN III (full year)
Latin III is a continuation of the study of advanced
grammatical structures with a focus on Classical authors,
including readings from Caesar, Catullus, Cicero, Vergil,
Horace and Ovid. Students will begin to think critically
about the texts as literature.
25
```

===== PAGE 27 =====

```text
HONORS LATIN III (full year)
Prerequisite: Qualification based on Latin level II
performance
Honors Latin III is a faster‐paced study of advanced
grammatical structures and a more in-depth exploration
of the authors. Students will read authentic selections
from Caesar’s De Bello Gallico, Catullus, Cicero’s various
works, Vergil’s Aeneid, Horace’s Carmina, and Ovid’s
Metamorphoses.
LATIN IV (full year)
Prerequisite: Latin III
Students will read selections from Sallust, Martial,
Catullus, Ovid, Cicero, Livy, Horace, and Vergil. Literary
analysis and critical writing will be emphasized as the
course progresses, as will the critical reading of and
reaction to scholarly articles pertaining to the above
topics. This course prepares students for the Standard
Level Latin International Baccalaureate exam.
LATIN IV HONORS (full year)
Prerequisite: Qualification based on Latin level III
performance
Students will read selections from Martial, Catullus, Ovid,
Cicero, Livy, Horace, Sallust, and Vergil. Literary analysis
and critical writing will be emphasized as the course
progresses, as will the critical reading of and reaction to
scholarly articles pertaining to the above topics. This
course prepares students for the HL Latin IB exam.
LATIN V (full year)
Prerequisite: Latin IV
Students will read additional selections from Martial,
Catullus, Ovid, Cicero, Livy, Horace, Sallust, and Vergil.
Literary analysis and critical writing will be emphasized as
the course progresses, as will the critical reading of and
reaction to scholarly articles pertaining to the above
August 2025
topics. Note: this course also prepares IB students for the
Standard Level assessments.
AP LATIN (full year)
Prerequisite: Latin IV Honors and qualification
This course is a college level course which studies excerpts
from Books I, IV, V, and VI of Caesar’s Commentarii de Bello
Gallico, as well as excerpts from Books I, II, IV, and VI of
Vergil’s Aeneid. The students will also read those entire
works in English. Emphasis is on literary analysis and critical
writing.
IB LATIN (full year)
Prerequisite: Latin IV or IV Honors and enrollment in the IB
Program
IB Latin is comprised of three main parts: study of
language, study of literature, and the research dossier
project. The main aim of the first part of the syllabus is to
equip students with the language skills to read and
understand Classical authors in the original Latin. For the
second part of the syllabus, students are given experience
of Classical literature through prescribed passages in the
original language (Catullus, Horace, Ovid, Martial and
Vergil). The research dossier offers students the
opportunity to examine an aspect of Classical language,
literature or civilization that is of particular interest to
them. The student will compile annotated primary source
materials relating to a topic in Roman history or culture.
Note: this course prepares students for the Higher Level
and Standard Level IB assessments.
International Baccalaureate
All languages are available at certain levels; please see the
IB section of this course guide for more information.
26
```

===== PAGE 28 =====

```text
T
he Fine Arts Department believes in
the value of the arts as the physical
manifestation of the human spirit. Our
goal is to develop the creative capacity
within students to think, invent, and express
themselves. We strive to cultivate an
enduring appreciation for and
understanding of music, visual art, and
drama. By participating in the creative
process, students discover and develop
their individual and collective talents.
I. Choral Music
CONCERT CHOIR (full year)
The Upper School’s beginning choir welcomes all students
in grades 9-12 who enjoy singing and making music with
friends! There is no experience necessary for this
ensemble. Students will learn to stand tall, raise their
voice and support each other in their growth. Singers will
discover the fundamentals of music, sight-reading and
vocal pedagogy through the performance of a variety of
music. Students must be able to match pitch by the
beginning of the class. See instructor for approval. All are
welcome in grades 9-12. Students may re-enroll in Concert
Choir multiple semesters/ years or can move up to Chamber
Choir after Concert Choir.
HONORS CONCERT CHOIR (full year)
The Honors option for Concert Choir is offered to
continuing choral students who demonstrate exceptional
ability in their knowledge of music and in performance
both in daily classroom work and in public performance.
In addition to the requirements of Concert Choir, students
choosing the Honors option must meet higher
performance goals and broader, more rigorous
expectations including fundamentals of music theory and
music history. There may be additional opportunities to
perform as representatives of the school community
throughout the year. Details are available in the spring
each year from the instructor. Honors students must
August 2025
Fine Arts
apply and successfully complete an audition each to be
accepted into this program. All are welcome in grades 9-
12. Students may re-enroll in Honors Concert Choir
multiple years.
HONORS CHAMBER CHOIR (full year)
Prerequisites: one year of Upper School Concert Choir (or
an equivalent) and by audition
The Honors Chamber Choir is Country Day’s top vocal
group. This elite choral ensemble performs a variety of
challenging pieces for concerts within the school
community, the greater Charlotte area, and the
Southeast. Students are accepted into this choir after one
year of Concert Choir and by audition. Building upon
principles taught in the Concert Choir, students continue
their study of the fundamentals of music, sight-reading,
music theory, and vocal pedagogy. Additionally, Honors
Chamber Choir students will engage in monthly coaching
sessions with the director. This choir is open to grades 10-
12; students may re-enroll in Honors Chamber Choir
multiple years with the approval of the director.
II. Instrumental Music
SYMPHONIC BAND (full year)
Prerequisites: Participation in the MS Band program OR
audition and permission of the instructor
This performing ensemble comprised of brass, winds, and
percussion instruments is designed to develop the
potential of the instrumental musician and to foster an
appreciation of music. Students continue to develop their
ensemble and musicianship skills through the preparation
of music from the symphonic band literature for
performance in concert twice during the school year.
There may be additional opportunities to perform as
representatives of the school community throughout the
year. Students may re-enroll in Symphonic Band multiple
years.
HONORS SYMPHONIC BAND (full year)
Prerequisites: Current enrollment in MS or US Symphonic
(formerly Concert) Band; by audition
The Honors option for Band is offered to continuing band
students who demonstrate exceptional ability in their
knowledge of music and in performance both in daily
classroom work and in public performance. In addition to
the requirements of Symphonic Band, students choosing
the Honors option must meet higher performance goals
and broader, more rigorous expectations including
27
```

===== PAGE 29 =====

```text
fundamentals of music theory and music history. There
may be additional opportunities to perform as
representatives of the school community throughout the
year. Details are available in the spring each year from the
instructor. Honors students must apply and successfully
complete an audition each year in order to be accepted
into this program. Students may re-enroll in Honors
Symphonic Band multiple years.
ORCHESTRA (full year)
Prerequisites: Participation in the MS orchestra program
OR audition and permission of the instructor
This performing ensemble includes violin, viola, cello,
double bass, and piano and is designed to develop the
potential of the instrumental musician to foster an
appreciation of music. Students continue to develop their
ensemble and musicianship skills through the preparation
of music from the string orchestra and chamber music
literature for performance in concert twice during the
school year. There may be additional opportunities to
perform as representatives of the school community
throughout the year. Students may reenroll in Orchestra
multiple years. Students wishing to play piano must
successfully complete an audition with the instructor.
HONORS ORCHESTRA (full year)
Prerequisites: Current enrollment in MS or US Honors
Orchestra; by audition
This Honors option for orchestra is offered to students
who demonstrate exceptional ability in their knowledge
of music and in performance both in daily classroom work
and in public performance. In addition to the
requirements of Orchestra, students choosing the Honors
option must meet higher performance goals and broader,
more rigorous expectations including fundamentals of
music theory and music history. Details are available in
the spring each year from the instructor. Honors students
must apply and successfully complete an audition each
year to be accepted into this program. There may be
additional opportunities to perform as representatives of
the school community throughout the year. Students
wishing to play piano must successfully complete an
audition with the instructor.
INTRODUCTION TO PIANO (first semester, repeats second
semester)
Introduction to Piano is for the absolute beginner with no
previous piano experience, or for those who wish to bring
back skills they have lost from early childhood. This course
includes the basic skills of reading music and
understanding popular chord notation. Class time is
divided between discussion and lecture portions, practice
time at the piano, and performing for each other. A
August 2025
portion of the class involves duet playing. Open to grades
9-12.
SUPERSONIC: PERCUSSION ENSEMBLE (first semester,
repeats second semester)
Do you like the awesome beats of Blue Man Group or
STOMP? You will love this course as it focuses on
performing music written specifically for the percussion
ensemble. Students will learn notation and the
techniques of all types of drums and percussion
instruments, including traditional and non-traditional
drumming. In addition, the class may construct
instruments to be played within the group. No musical
experience necessary. This course may be repeated each
semester for credit. Open to grades 10-12.
III. Music Theory & Production
AP MUSIC THEORY (full year)
Prerequisites: qualification based on performance in
current music class and proficiency exam
The goal of AP Music Theory is to develop the students’
ability to recognize, understand, and describe the basic
materials and processes of music as heard or presented in
a score. This goal is achieved by integrating aspects of
melody, harmony, texture, rhythm, form, history, and
style while engaging with listening and written exercises.
A student's ability to read and write musical notation is
fundamental to this course, and a student must possess
basic performance skills in voice or on a musical
instrument in order to be admitted. Students must also
score well on an entrance exam, which includes a general
knowledge of musical terminology, basic music theory,
and sight-singing. Open to grades 10-12 after receiving
approval from the instructor.
IV. Theatre Arts
ACTING/DIRECTING I (first semester)
In this class, students dive into their imagination,
emotion, and intellect. By making each actor aware of the
universality of theatre, the tools of acting are enhanced,
developed, and learned. It is the beginning of the actor’s
journey of exploration to uncover the creative vision of
the playwright. In order to discover the “who, why, where,
when, and how” of each character it is imperative the
student actor understands the craft of acting. This course
requires a disciplined approach to voice, speech,
movement, and the actor’s ability to use “self” (body,
mind, and experience). Note: Students who have taken
28
```

===== PAGE 30 =====

```text
Acting I may apply for the Directing I portion of this class
by March 15th prior to enrollment. See qualification
requirements for dates.
ACTING/DIRECTING II (second semester)
Prerequisites: Acting/Directing I
This more advanced acting class emphasizes the process
of acting and directing. Actors will be introduced to a wide
array of acting schools and approaches to a role and
techniques, including Stanislavsky, Strasberg, Adler,
Meisner, and the New School. However, the class
activates processes so students discover their personal
voices in the craft. Additionally, students explore scripts
from all genres and look at the connection between
written word, interpretation, and presentation. The class
is run in workshop format where the concepts are put into
practice. Students who have taken Acting I may apply for
the Directing II portion of this class by November 20th prior
to enrollment. See qualification requirements. Open to
grades 10-12.
THEATRE WORKSHOP (second semester)
Prerequisites: Completion of a Level 2 theater course
and permission of the instructor.
This class is designed for students who are looking for
more advanced work in one of the following areas of
theater: Acting, Directing, or Improv. Students will
participate in a capstone project that incorporates all
theatrical skills learned and practiced through advanced
level classes. Open to grades 10-12.
IMPROVISATION I (first and second semester)
This course is designed to give students an in-depth look
at the art of improvisation by learning how to give an
unscripted response to an idea or situation. Students will
gain inductive discovery, nonverbal communication, risk-
taking, team building, critical thinking skills, and
understand how to integrate improvisational thinking into
their daily lives. While performing improvisation will be
the focus of this course, students will also engage in their
own sketch writing skills. Students will study both short
form and long form improvisation while researching
successful improvisational actors (such as Robin Williams,
Steve Carell, Mindy Kaling, Amy Poehler and Eddie
Murphy). Additionally, this class will explore historical
aspects and current trends in improvisation and
improvisation groups/art forms. Student assessment will
be determined based on participation, class projects, daily
activities, and presentations. Open to grades 9-12.
IMPROVISATION II (second semester)
Prerequisites: Improvisation I
This course is designed to give students an advanced
exploration of the art of improvisation by learning how to
August 2025
give an unscripted response to an idea or situation.
Students will gain an in-depth discovery of understanding
how to integrate improvisational skills into the creative
process. While performing improvisation will be the focus
of this course, students will also engage in forming an idea
from quick thinking to a concrete, rehearsed format.
Students will study both short form and long form
improvisation while writing and performing sketches.
Additionally, the class will explore historical aspects and
current trends in acting and improvisation groups/art
forms. Student assessment will be determined based on
participation, research papers, daily activities, journals,
and presentations. Open to grades 9-12.
IB THEATRE ARTS (SL- full year, HL- first semester)
Please see the IB section of the course catalog for more
information.
V. The Visual Arts
The Visual Arts curriculum at Country Day offers students
an in-depth study of art principles and processes in several
media. Students typically enter 2D Art, Sculpture, or
Design at Level I. Students may explore a variety of Level I
courses to fulfill their three-semester graduation
requirement. However, many students progress through
all three levels of a particular strand in preparation for an
AP or IB Studio Art experience. Completion of Level III in
any area and a successful portfolio evaluation are required
for placement in an AP Studio Art class.
2D ART I (first semester, repeats second semester)
2D Art I introduces the basics of two-dimensional art
production, artistic investigation, art criticism, and art
history. Students explore printmaking, painting, drawing,
and mixed media to learn how to creatively solve artistic
problems around teacher-directed themes. Individual
reflection and experimentation are encouraged as
students build a base knowledge of the elements and
principles of design. Open to grades 9-12.
2D ART II (first semester, repeats second semester)
Prerequisites: 2D Art I
2D Art II builds upon techniques and concepts introduced
in 2D Art I. Students continue their investigation of
drawing, painting, printmaking, and mixed media to
express personal ideas. Art criticism and art history are
integral components to the course in order to help
students evaluate and articulate their views on art.
Students are encouraged to set individual goals and work
with teachers to attain those goals. Creative problem-
29
```

===== PAGE 31 =====

```text
solving and individual experimentation are encouraged.
Open to grades 9-12.
2D ART III (first semester, repeats second semester)
Prerequisites: 2D Art II
2D Art III builds upon the techniques and concepts of 2D
Art II as students work toward building a portfolio of
artwork. Advanced techniques in drawing, painting, and
printmaking are introduced as students are encouraged to
develop a personal voice through their art. Students learn
about contemporary artists through gallery visits,
research, reading, and reflection. Greater student
independence is fostered as students select the subject
matter, materials, and methods to develop their images.
At this level, the students continue to build skills, work on
compositional problems, and experiment with multiple
media. Open to grades 10-12.
2D ART IV (first semester, repeats second semester)
Prerequisites: 2D Art III
2D Art IV is intended for advanced students who wish to
continue building technical skill and develop their own
portfolio. Independent exploration of subject and media
is critical to student success. Students enrolling in level IV
will be scheduled with another 2D Art class.
DESIGN/ PHOTOGRAPHY I (first semester, repeats second
semester)
Design I provides a foundation for photographic and
digital media study in the Upper School. The course
introduces digital photography and two-dimensional
image manipulation on the computer. Students develop a
working knowledge of computer-based design and
aesthetic theories. This course emphasizes the study of
the elements of art and principles of design, composition,
color theory, art criticism, and art history. Individual
problem solving and decision-making are emphasized
throughout Design I. Open to grades 9-12.
DESIGN/ PHOTOGRAPHY II (first semester, repeats second
semester)
Prerequisites: Design I
Design II continues the study of digital media begun in
Design I by building upon the student’s technical skill and
foundation of knowledge. Traditional black and white
photographic processes are introduced in Design II. Art
criticism and art history are integral components to the
course to help students evaluate and articulate their
views on art. Students are encouraged to set individual
goals and work with the teacher to attain those goals.
Creative problem solving and individual experimentation
are encouraged. The student’s work in Design II is more
experimental and based on informed choices. Open to
grades 9-12.
August 2025
DESIGN/PHOTOGRAPHY III (first semester, repeats second
semester)
Prerequisites: Design II
Design III is intended for the serious design student who
may wish to pursue AP Art in the junior or senior year.
Students strengthen their computer and photographic
image making skills learned in Design II and continue to
pursue issues in art criticism and art history. Students
work individually and in groups to solve realistic design
problems such as the creation of logos, signs and symbols,
products and videos. Students build a portfolio of artwork
that shows experience with different media and
techniques. Knowledge of design in relation to culture,
history, other disciplines, and careers are encouraged
through gallery visits, research, reading, and reflection.
Students have the option to concentrate on computer
generated work, camera/darkroom-based expression or a
combination of the two. Open to grades 10-12.
DESIGN/PHOTOGRAPHY IV (first semester, repeats second
semester)
Prerequisites: Design III
Design IV is intended for advanced students who wish to
continue building technical skill and develop their own
portfolio. Independent exploration of subject and media
is critical to student success. Open to grades 10-12.
Students enrolling in level IV will be scheduled with
another Design class.
SCULPTURE I (first semester, repeats second semester)
This course is designed to reinforce and build on
knowledge and skills developed at the elementary and
middle school levels. It is the foundation level for three-
dimensional art throughout the Upper School. This course
emphasizes the study of the elements of art and principles
of design, color theory, vocabulary, art criticism, art
history, machinery knowledge, and safety in the art room.
The course is devoted to investigating various sculpture
processes, procedures, theories, and historical
developments. Students will explore a variety of three-
dimensional media including glass, wire, plaster, wood,
metal smithing, and clay. Students are provided a strong
foundation in design, sculpture, and vocabulary in a
teacher-structured environment. Problem-solving and
decision-making are emphasized throughout Sculpture I.
Open to grades 9-12.
SCULPTURE II (first semester, repeats second semester)
Prerequisites: Sculpture I
Sculpture II builds upon the student’s technical skill and
foundation of knowledge developed in Sculpture I.
Various fine crafts processes, procedures, and theories
are presented in a problem-solving manner, which allows
30
```

===== PAGE 32 =====

```text
for independent choices and personal solutions to
problems. Students research three-dimensional art to
gain an appreciation for art of the past and present.
Students continue their study of the elements of art and
principles of design, color theory, vocabulary, and art
history while producing a variety of sculptural works.
Open to grades 9-12.
SCULPTURE III (first semester, repeats second semester)
Prerequisites: Sculpture II
Sculpture III presents students with an in-depth approach
to the study of three-dimensional processes and
techniques, aesthetic issues, art criticism, and art history.
It is designed for the serious sculpture student who may
wish to pursue AP Sculpture in their junior and senior
year. The teacher will help students set goals and develop
work habits similar to that of professionals. Knowledge of
sculpture in relation to culture, history, other disciplines,
and careers will be promoted through visual, verbal, and
written means. Students are encouraged to develop a
personal style and philosophy of three-dimensional art. In
Sculpture III, students will begin to build a portfolio that
focuses on technical quality, personal style, growth, and
function. Open to grades 10-12.
SCULPTURE IV (first semester, repeats second semester)
Prerequisites: Sculpture III
This class advances students who wish to continue
building technical skill and develop their own portfolio.
Independent exploration of subject and media is critical to
student success. The teacher will help students set goals
and develop work habits similar to that of professionals.
Knowledge of sculpture in relation to culture, history,
other disciplines, and careers will be promoted through
visual, verbal, and written means. Students are
encouraged to develop a personal style and philosophy of
three-dimensional art. In Sculpture III, students will begin
to build a portfolio that focuses on technical quality,
personal style, growth, and function. Open to grades 10-
12. Students may re-enroll in multiple years.
ARCHITECTURAL DESIGN STUDIO (first semester, repeats
second semester)
Prerequisites: completion of 2D II, Design II, or Sculpture II
Architecture presents students with the foundational
concepts and skills necessary for designing functional and
aesthetic spaces. The course focuses on the principles of
architectural design, including form, space, order, and
precedents, with an emphasis on both historical and
contemporary examples. Students will explore the
process of creating architectural solutions, from
conceptual design to physical modeling, while developing
a deeper understanding of how built environments shape
our daily experiences. Open to grades 10-12.
August 2025
SPECIAL PROJECTS IN VISUAL ARTS (first semester, repeats
second semester)
Prerequisites: Level IV Design, 2D Art, or Sculpture;
approval of the teacher.
This semester-long class is designed for experienced,
highly motivated, dedicated art students specializing in
Design, 2D Art, 3D Art, or a combination therein. The class
is for students who want to advance but do not wish to
take AP or IB Art. Students should be motivated to work
independently in and out of the classroom, as they will be
responsible for selecting the subject matter, materials,
and methods used to develop their ideas. The sketchbook
is an integral part of the art-making process and a
minimum of two hours per week (homework) is spent on
sketchbook work. This includes recording and developing
ideas; investigating and critically analyzing work;
practicing drawing and design skills, etc. Students are
expected to study Art History, aesthetics, and the artwork
of other cultures and historical time periods as it relates
to their own work. A complete sketchbook as well as a
portfolio of finished work, archived digitally and collected
in an actual portfolio, are due at the completion of the
course. Students are expected to use different media,
techniques and genres and to master at least one
medium. Open to grades 11-12.
AP STUDIO: 2D ART (full year)
Prerequisites: Successful completion of level III or IV 2D Art
courses, and portfolio evaluation
AP Studio is designed for students who are seriously
interested in the practical experience of art. Students
submit portfolios for evaluation at the end of the school
year, which are composed of breadth and concentration
sections. This course emphasizes making art as an
ongoing process of informed and critical decision-
making. AP students must be self-directed with the
ability to produce works of art at an accelerated pace
and with exceptional technical skill. Concentrations
within the class may be on drawing or two-dimensional
design. Open to grades 11-12. This course may be
repeated to explore new portfolios.
IB Art (HL) (two years)
Please see the IB section of the course catalog for more
information. IB Art Portfolios are due in February of the
sophomore year for admittance.
AP STUDIO: DESIGN/PHOTOGRAPHY (full year)
Prerequisites: Successful completion of level III or IV Design
courses, and portfolio evaluation
AP Design is intended for students who are seriously
interested in the practical experience of digital and
photographic arts. Students develop portfolios for
31
```

===== PAGE 33 =====

```text
evaluation that are composed of breadth and
concentration sections. This course emphasizes informed
and critical decision-making. AP students must be self-
directed with the ability to produce works of art at an
accelerated pace and with exceptional technical skill.
Open to grades 11-12. This course may be repeated to
explore new portfolios.
AP STUDIO: SCULPTURE (full year)
Prerequisites: Successful completion of level III or IV
Sculpture course, and portfolio evaluation
AP Sculpture is designed for students who are interested
in the practical experience of art. Students submit
portfolios for evaluation at the end of the school year
that include breadth and concentration sections. The AP
portfolio is intended to address sculptural issues and
purposeful decision-making utilizing the elements and
principles of art in an integrative way. AP students must
be self-directed with the ability to produce works of art
at an accelerated pace and with exceptional technical
skill. Open to grades 11-12. This course may be repeated
to explore new portfolios.
AP ART HISTORY (full year)
Prerequisites: qualification based on grade of 85 or better in
current history class grade
This course is designed to introduce students to
significant works of art and architecture in both the
European and Non-European tradition. The goal is to
promote the understanding and enjoyment of art while
developing students’ abilities to examine works of art
intelligently by acquainting them with the major forms of
artistic expression historically and in their own time.
Students examine and develop and appreciation of art
from cave paintings to the twenty-first century in addition
to the art of Africa, Asia, and the Americas. Open to
grades 11-12.
August 2025
YEARBOOK (full year)
Prerequisite: Instructor approval for grades 9 and 12
Students produce the school’s yearbook, The Postscript,
over the course of the first three quarters of the school
year. The remaining quarter is spent planning the Spring
edition for the following year. Student editors organize
small groups to compile and complete sections of the
yearbook, including senior ads, athletics, divisional
highlights, student photos, clubs, and more. All students
learn the essentials of page layout, photo and copy
editing, and writing. Student photographers must be able
to cover events during the day, after school, and on the
weekends. Above all, meeting deadlines and teamwork
are essential skills. Open to grades 9-12. Note: rising
seniors must have at least one year of yearbook or
permission of the teacher to enroll.
YEARBOOK EDITOR, HONORS (full year)
Prerequisite: Previous experience; Application and Instructor
approval for grades 10 and 12
The Honors option for Yearbook is available to returning
staff members who have demonstrated exceptional
dedication to the creation of Postscript. These students
have shown strong organization, punctuality, and a
commitment to preserving the school’s history. In
addition to the standard yearbook class requirements, the
Honors option requires staff members to take on
leadership roles as team leaders and/or editors, managing
greater responsibilities, meeting more rigorous
expectations, and consistently meeting deadlines. Work
outside of class will be required to ensure the successful
completion of the yearbook. All returning or former
yearbook staff members are welcome to apply but must
complete an application and be accepted in order to
participate.
32
```

===== PAGE 34 =====

```text
Te
T
echnology & Computer Science
courses promote technological and
information literacy as well as critical
thinking, problem-solving, and decision-
making skills necessary for all individuals to
compete in our ever-changing global
economy. Courses enhance students’
conceptual understanding, procedural
knowledge, and problem-solving skills in
technology, including its nature, impact, and
social, ethical, and human aspects.
EXPLORING COMPUTER SCIENCE (second semester)
What is Computer Science? Most students believe
computer science is learning how to write programs.
While that, in part, is true, computer science is much
more. Exploring Computer Science is designed to
introduce students to the breadth of the field of computer
science through an exploration of engaging and accessible
topics. Have you ever wanted to write computer code?
Have you ever wanted to learn more about computer
game design? Students are introduced to topics such as
programming in Python, web page design, problem
solving and data analysis, societal and ethical issues in
computing, and phone apps. Open to grades 9-12.
AP COMPUTER SCIENCE “A” (full year)
Prerequisite: Qualification based on grades in Honors
Pre-Calculus or higher math course OR ECS.
Students follow the College Board’s Advanced Placement
Computer Science syllabus, learning to program in the
Java language. The major emphasis of the course is on
problem-solving techniques, object-oriented solution
methodologies, algorithms, and container classes.
Students learn the context of these subjects through
August 2025
echnology & Computer Science
applications of computing. Students are expected to sit
the AP Computer Science exam. Open to grades 10-12.
ADVANCED TOPICS IN COMPUTER SCIENCE – Honors (first
semester)
Prerequisites: AP Computer Science and project
proposal
This course will be divided into two parts. The first four to
six weeks of the class will be devoted to studying data
structures in Java. Linked lists, stacks and queues will be
discussed as a means to manage large amounts of data
efficiently. The remainder of the course will be devoted to
student inspired computer science projects. Each student
project must be submitted to and approved by the
instructor. The scope and depth of the project,
tools/programming languages needed are to be
determined by the student and will be monitored daily in
class. Projects must be submitted for approval at the time
of registration. Weekly goals will be set to gauge student
progress. Final completed projects will be presented
before the academic council in January. Open to grades
11-12.
33
```

===== PAGE 35 =====

```text
Non-Departmental Credit Courses
Many students opt to take elective credits in the form of a second Science
or Foreign Language class, or an additional class in the Fine Arts.
Semester electives also exist in the Social Studies and English and Computer
Science departments. Additional Non-Departmental offerings are listed below:
9th GRADE SEMINAR (full year, two days each cycle) PUBLIC SPEAKING AND PROFESSIONAL COMMUNICATION
Required for all 9th grade students (first semester, repeats second semester)
This semester-long course is designed specifically for 9th The primary purpose behind this class is to give students
graders and addresses various issues and developmental the opportunity to be comfortable in front of an audience.
needs of young adolescents as they transition to the In addition to gaining confidence to speak to anyone,
expectations of the Upper School. Topics include goal students become proficient in gathering and organizing
setting; time management; decision-making skills; media content for a variety of different categories of
literacy; study skills; leadership; character and integrity; speeches. Students learn the importance of active
drug, alcohol and tobacco education; wellness; emotional listening, in-person and online interviews, nonverbal and
well-being; stress management; bullying; harassment verbal communication, constructive criticism, as well as
awareness; identity development; difference; and knowing and growing their audience as they enter the
cooperation. The purpose of the course is to help students professional world.
on their way to a healthy, productive Upper School career.
STRENGTH TRAINING
PODCASTING: AMPLIFY YOUR VOICE
Successful completion of this course qualifies as one of the
not offered in the 2025-26 Academic Year
two co-curricular credits needed each year
This course is a broad introduction to the exciting realm
This course is suitable for all levels (beginner through
of podcasting—a way of telling a story through audio,
advanced), athletes and non-athletes. Students will learn
using sound files, voice overs, recorded conversations,
proper weightlifting techniques, functional movement
interviews, and effects woven into a narrative. We'll
patterns and the principles of strength development. The
explore some pivotal moments and influential figures that
course will cover topics such as nutrition, injury
shaped podcasting's history and explore various podcast
prevention, regeneration and goal setting for
genres and formats. Through hands-on exercises and
performance. Training will include a combination of
practical demonstrations, you'll learn essential skills such
resistance training, power development, speed
as conceptualizing a show, scripting episodes, and
development and mobility exercises. Please note that for
mastering basic audio production techniques. By the end
in-season student-athletes, workout completion during
of the course, you’ll have the opportunity and knowledge
Strength Training course will fulfill their afterschool
to plan, produce, and launch your very own podcast,
training requirements.
ready to make your mark in the ever-expanding
podosphere.
August 2025 34
```

===== PAGE 36 =====

```text
Internatio
T
he International Baccalaureate (IB)
Diploma Program is a 2-year course of
study for students in 11th and 12th
grades. Students in the IB Diploma Program
gain rigorous and balanced academic
preparation, an ability to draw on
knowledge and understanding of various
cultures and histories, and the experience
of learning how to think critically and apply
what they have learned across disciplines.
The IB Diploma Program consists of the
IB core curriculum and six distinct “groups”
of study, listed below. At least three but no
more than four will be at the higher level
(HL) and the remainder will be at the
standard level (SL). Course selection within
IB is based on student interest, availability,
and prerequisites. In most cases, IB
students are in dedicated IB classes, listed
below; in certain disciplines, students
continue in the regular departmental
offerings.
There are no required “pre-IB” courses at
Country Day but completing some
advanced/Honors level courses during 9th
and 10th grades is recommended.
Interested students apply to the IB program
during February of the 10th grade year.
Please see the IB page on BucsNet and/or
consult the IB Coordinator for further
information.
August 2025
onal Baccalaureate Program
The IB Core Curriculum:
The following items form the “core” of the IB experience
and are required for all IB students:
IB THEORY OF KNOWLEDGE (full year course)
Prerequisite: Enrollment in the IB Program
In this junior year course, IB students strive to develop
their critical awareness of what they and others know and
value. Students analyze “personal knowledge” and
“shared knowledge,” observing the overlap and exchange
between these categories. Students learn to ask and to
answer “knowledge questions” and use “the knowledge
framework” to explore eight “ways of knowing” and eight
“areas of knowledge.” Students are evaluated through
class activities and discussion, textbook and parallel
reading, oral presentations, regular informal journals, and
online writing. Enrollment in the IB program is required.
EXTENDED ESSAY
The extended essay is an in-depth study of a topic that
culminates in a major research paper. Students choose
their research topic from a wide variety of disciplines and
choose a faculty mentor for guidance throughout the
essay-writing process. The extended essay is completed
during the junior year (as part of Theory of Knowledge)
and submitted to IB during the senior year as part of the
IB diploma requirements.
CREATIVITY, ACTIVITY & SERVICE (CAS)
CAS is designed to be an opportunity for students to be
involved in learning experiences that occur outside of
the classroom. Working with the CAS Coordinators,
students choose experiences that involve goal setting,
personal growth, and reflection in the three general
areas of creativity, physical activity, and service learning.
Students maintain a digital notebook to log experiences
and discuss and reflect on their learning outcomes. All IB
students are expected to be regularly involved in and
reflecting upon CAS throughout their time in the IB
program.
35
```

===== PAGE 37 =====

```text
Group I: Language & Literature
IB ENGLISH 11 HL (full year) IB ENGLISH 12 HL (full year)
Prerequisite: enrollment in the IB program Prerequisite: IB English 11, enrollment in the IB program
Required for all IB juniors, IB English 11 builds on skills Required for all IB seniors, IB English 12 builds on and
acquired in English 10 by expanding students’ experience extends beyond the work begun in IB English 11, with a
with a broad range of genres, periods, and styles in continued focus on fulfilling the course aims and
literature, including world literature texts in preparing students for official IB assessments: the
translation. IB literature studies aim for students to Individual Oral passage analysis and the end-of-year IB
develop skills in listening, speaking, reading, and written exams. Over the two years of IB English, students
presenting, along with skills in interpretation, analysis, typically study texts by authors such as Adichie, Allende,
and evaluation of literature in context and related to Atwood, Butler, Fitzgerald, García Márquez,
global issues. Ultimately, students aim to communicate Heaney, Ibsen, Larsen, Orange, Morrison, Shakespeare,
and collaborate in confident and creative ways. The Shelley, Spiegelman, Szymborska, and Walls. This course
junior course typically includes the IB “Written fulfills the requirements of IB Language A: Literature HL.
Assignment” essay. Like their peers in other 11th-grade
English courses, IB students complete an autobiography.
II. Group 2: Language Acquisition
IB Languages study occurs at three possible levels. “Ab initio” is the most basic level and intended for students beginning a new
language. Standard level (SL) is for students with multiple years of experience with the language. Higher level (HL) is for high-
performing students with multiple years of experience. Students in the IB program move within the language curriculum at the
appropriate level of language proficiency. For any AP or Honors course, IB students must qualify like any other Country Day
student.
The chart below describes which courses students should attain in their junior and senior years to be best prepared for IB
assessments at a particular level. However, there is some flexibility and students may be allowed to take alternate courses with
permission from the teacher and IB coordinator.
IB Language of Choice
11th grade course 12th grade course
and Minimum Level
ab initio (not available) (not available)
LATIN Standard Level (SL) Honors or regular Latin IV IB Latin
Higher Level (HL) Honors Latin IV IB Latin
ab initio Honors Chinese III IB Chinese
CHINESE Standard Level (SL) (not available) (not available)
Higher Level (HL) (not available) (not available)
ab initio French I Honors French II
Honors French IV, French IV, or
FRENCH Standard Level (SL) French V or Honors French IV
Honors French III
Higher Level (HL) Honors French IV IB French HL
ab initio Spanish I Honors Spanish II
Hon Spanish IV, Spanish IV, or Honors
SPANISH Standard Level (SL) Spanish V or Honors Spanish IV
Spanish III
Higher Level (HL) Honors Spanish IV IB Spanish HL
August 2025 36
```

===== PAGE 38 =====

```text
III. Group 3:
Individuals & Societies
IB WORLD HISTORY SL (full year)
Prerequisite: Enrollment in the IB Program
Required for all IB juniors, this course focuses on in-depth
study of selected World History topics. These topics may
include the US Civil Rights movement, South African
apartheid, industrialization from 1750-2005, and the Cold
War. Through examination of these topics, students
develop greater international mindedness, engage with
and evaluate primary sources, and continue to develop
their ability to write effectively in History. Major
assessments are writing intensive and include the IB
historical investigation. At the completion of this course,
students either take the IB History SL exam or continue to
IB History of the Americas as an HL history candidate. This
course fulfills the requirements of IB History SL.
IB HISTORY OF THE AMERICAS HL (full year)
Prerequisite: IB World History
This course emphasizes several topics in United States
history, but also integrates topics emphasizing the
experiences of other nations and peoples in the Americas.
The reading and evaluation of primary sources is central
to this course, and students will learn how to evaluate and
frame historical arguments. This course fulfills the
requirements for IB History HL. Please note: IB seniors
who choose not to complete this HL history class must
enroll in a standard or AP US History class in the senior
year in order to fulfill the Country Day graduation
requirement.
IB PSYCHOLOGY SL (full year) – Available as a Group 6
Elective
Prerequisite: Enrollment in the IB Program
An introductory course on the scientific study of human
behavior, with some reference to animal studies. This
course focuses on three levels of analysis in psychology:
the biological, the cognitive, and the sociocultural.
Additionally, students are introduced to mental disorders
and their treatment as they relate to these three levels.
Several weeks in the second semester are spent
conducting a replication of a published experiment in
psychology. There is a focus on specific examples of
primary research throughout the course.
IB INFORMATION TECHNOLOGY IN A GLOBAL SOCIETY SL
(full year)
Prerequisite: Qualification based on grades in History,
concurrent enrollment in Precalculus or higher math or
enrollment in IB program
August 2025
The Information Technology in a Global Society (ITGS)
course is the study and evaluation of the impact of
information technology on individuals and society. It
explores the advantages and disadvantages of the access
and use of digitized information at the local and global
level. ITGS provides a framework for students to make
informed judgments and decisions about the use of IT
within social contexts. This course fulfills the
requirements of IB ITGS SL. This course is also open to
both IB and non-IB students in grades 11-12.
IV. Group 4: Sciences
IB BIOLOGY SL (full year)
Prerequisites: Chemistry I/Honors Chemistry, enrollment in
the IB program
IB students who wish to study biology as a Standard
Level (SL) course take IB Biology during the junior or
senior year. This course covers the core curriculum
topics: biochemistry, cellular processes, genetics,
biotechnology, evolution, ecology, and human
physiology. Students perform a minimum of 40 hours of
lab activities, some of which occur outside of class.
IB BIOLOGY HL (full year)
Prerequisites: IB Biology SL, enrollment in the IB
program
IB students who wish to study biology as a Higher Level
course will take IB Biology SL during the junior year and
an additional two semesters of biology during senior
year. The core topics from junior year are covered in
greater depth and additional topics (such as other
human systems and plant biology) are introduced.
Students also complete an additional 20 hours of lab
work, some of which occur outside of class.
IB CHEMISTRY SL (full year)
Prerequisites: Chemistry I/Honors Chemistry,
enrollment in the IB program
IB students who wish to study chemistry as a Standard
Level course take IB Chemistry during their junior or
senior year. The course covers the core curriculum topics:
stoichiometry, atomic theory, periodicity, bonding, states
of matter, energetics, kinetics, equilibrium, REDOX
reactions, and organic chemistry. Emphasis is placed upon
deep understanding of chemical concepts and the
application of these concepts to novel situations.
Assessments are of the IB style, using IB questions and
grading schemes. Students perform a minimum of 40
hours of laboratory activities, some of which occur
outside of class.
37
```

===== PAGE 39 =====

```text
IB CHEMISTRY HL (full year)
Prerequisites: IB Chemistry SL, enrollment in the IB
program
IB students who wish to study chemistry as a Higher
Level course will take IB Chemistry SL during the junior
year and an additional two semesters of chemistry
during senior year. The core topics from junior year are
covered in greater depth. Students also complete an
additional 20 hours of lab work, some which occur
outside of class.
V. Group 5: Mathematics
In general, eleventh grade students in the IB diploma
program follow within the math course curriculum for their
area of study at the honors or regular level. In the 12th
grade, they choose one of the following options. It is
possible for accelerated math students to complete an IB
course in 11th grade, but they must enroll in an AP math
course during 12th grade to meet graduation requirements.
Please note carefully the pre-requisites or co-requisites for
each.
IB APPLICATIONS SL (full year)
Prerequisite: Enrollment in the IB program, completion
of Precalculus
This course recognizes the increasing role that
mathematics and technology play in a diverse range of
fields in a data-rich world. As such, it emphasizes the
meaning of mathematics in context by focusing on topics
that are often used as applications or in mathematical
modelling. To give this understanding a firm base, this
course also includes topics that are traditionally part of a
pre-university mathematics course such as calculus and
statistics. In addition, students will complete a research
paper investigating an area of mathematics
commensurate with the level of the course.
IB ANALYSIS SL (full year)
Prerequisite: Qualifying grade average from Honors
Precalculus or Honors Algebra 2/Precalculus
This course recognizes the need for analytical expertise in
a world where innovation is increasingly dependent on a
deep understanding of mathematics. This course includes
topics that are both traditionally part of a pre-university
mathematics course (for example, functions,
trigonometry, calculus) as well as topics that are
amenable to investigation, conjecture and proof, for
instance the study of sequences and series. In addition,
students will complete a research paper investigating an
August 2025
area of mathematics commensurate with the level of the
course.
IB ANALYSIS HL (full year)
Prerequisite: Successful completion of AP BC Calculus
Designed for motivated high school students who have
successfully completed AP Calculus BC and are eager to
delve deeper into advanced mathematical principles, this
course follows an integrated approach to university-level
mathematics curriculum. Topics include three-
dimensional space, vectors, calculus-based statistics, and
differential equations. Additionally, students must
formulate and justify sound mathematical arguments as
they complete mathematical investigations, make
conjectures, and construct formal proofs. In order to
prepare students for pursuing STEM-related fields in
college and beyond, this course will develop students’
ability to reason abstractly, communicate precisely, and
approach problems with patience and tenacity. Students
will complete a research paper investigating and applying
an area of mathematics commensurate with the level of
the course. Interested seniors may elect to take the IB
Analysis and Approaches HL examinations at the
conclusion of the course. Prerequisite: AP Calculus BC.
Group 6 offerings may be found
on the following page.
38
```

===== PAGE 40 =====

```text
VI. Group 6: Fine Arts OR Other Elective
Offerings for the sixth subject area of IB at Charlotte Country Da
Category Course
Fine Arts IB Art
Fine Arts IB Theatre
Elective Social Studies IB Psychology
Additional language Spanish, French, Latin, Chinese
Additional science IB Chemistry SL or IB Biology SL
IB ART I (SL, HL) (full year)
Prerequisite: Completion of level III in any Visual Art
course, submission of a portfolio, and enrollment in the
IB program
This IB Visual Arts course is a two-year creative, practice-
based course. Students work in the classroom as they
would in an art studio and are encouraged to engage,
transform and emerge as young artists. Art-making as
inquiry is at the center of the syllabus. Students will
develop their own personal inquiries and generative
statements. Through the creative process of making their
art, students explore connections between their works
created and the connections to other artists who are
working in the same theme or mediums of their interest.
At the end of their second-year students will complete the
program with an Art-making inquiries portfolio and
resolved works that will fulfill SL and HL requirements.
IB ART II (SL, HL) (full year)
Prerequisites: IB Art I
This course continues the work started in IB Art I and
culminates with an exhibit of student work.
IB MUSIC I (SL) (full year) (not offered 2025-26)
Prerequisite: Honors ensemble audition and enrollment
in the IB program
This IB course is the first of a two-year program designed
to meet the requirements of IB Music Standard Level.
Over the two-year program, students will study music as
researchers, creators, and performers while being
simultaneously enrolled in a performing ensemble (band,
orchestra, or choir). Students will develop their personal
knowledge as a musician while learning to collaborate and
partner with others through the exploration of diverse
musical material. Students will learn about musical
context and perception by listening to a wide range of
music from different parts of the world. Through the study
of varied musical cultures and time periods, students will
develop an understanding of musical elements, including
August 2025
e
ay School include the following:
Semester commitment
4 semesters (HL only)
2 semesters (SL) or 3 semesters
(HL)
2 semesters (SL only)
4 semesters (SL or HL)
2 semesters (SL only)
notation, terminology, context, form, and structure.
Students will explore the connection of musical processes
while creating and performing music and maintaining a
portfolio of their work.
IB MUSIC II (SL) (full year) (not offered 2025-26)
Prerequisites: IB Art I
This course continues the work started in IB Music I and
culminates with the completion of all three major IB
assessments for IB Music Standard Level.
IB THEATRE ARTS SL (full year)
Prerequisite: Successful completion of at least one
Upper School theatre class and production
IB Theatre Arts gives students the opportunity to actively
engage in theatre as creators, designers, directors, and
performers. Through researching, creating, preparing,
presenting and critically reflecting on theatre, students
gain a richer understanding of themselves, their
community and the world. They learn about theatre from
around the world, the importance of making theatre with
integrity, and the impact that theatre can have on the
world. It enables them to discover and engage with
different forms of theatre across time, place and culture,
promoting international-mindedness and an appreciation
of the diversity of theatre. Major assessments will include
an original solo theatre piece, a formal presentation on a
theatre tradition, and creation and performance of an
original and collaborative theatre piece. Students will also
participate in at least one of the extracurricular CCDS
productions. Students in IB Theatre Arts will be scheduled
within existing theatre classes to be determined between
the student and the IB coordinator. This course fulfills the
requirements of IB Theatre Standard Level.
IB THEATRE ARTS HL (fall semester only)
Prerequisites: IB Theater Arts SL
This course builds upon the work completed in IB Theater
Arts SL. In addition to that work, HL IB Theater Arts
students will study theory and create an original solo
39
```

===== PAGE 41 =====

```text
piece based on their research. Involvement in the fall one-
act plays is required.
Other Group 6 elective offerings include the following
(see Groups 3 & 4 for full descriptions):
IB PSYCHOLOGY SL (full year)
August 2025
IB CHEMISTRY SL (full year)
IB BIOLOGY SL (full year)
40
```

===== PAGE 42 =====

```text
T
he Country Day Physical Education
program encourages students to
experience the benefits and
enjoyment of physical activity and to
discover the value of personal wellness as
part of daily living. An outcome of the
program should be that students begin to
make responsible and thoughtful decisions
relative to their personal health habits and
practices in high school, college and
throughout their lives.
SCHEDULED CLASS OPTIONS
STRENGTH TRAINING
Successful completion of this course qualifies as one of the
two co-curricular credits needed each year
This course is suitable for all levels (beginner through
advanced), athletes and non-athletes. Students will learn
proper weightlifting techniques, functional movement
August 2025
Physical Education Offerings
patterns and the principles of strength development. The
course will cover topics such as nutrition, injury
prevention, regeneration and goal setting for
performance. Training will include a combination of
resistance training, power development, speed
development and mobility exercises. Please note that for
in-season student-athletes, workout completion during
Strength Training course will fulfill their afterschool
training requirements.
AFTER SCHOOL OPTIONS
ULTIMATE FRISBEE
Students of all levels are welcome to play Ultimate
Frisbee. The team practices three days a week with a
focus on learning the basics of the game. The program’s
goals include learning throwing techniques, proper
defense, motion offense, and other game strategies. The
team has several scrimmages against local teams during
the winter term. Credit is based on regular attendance of
practices and games.
41
```

===== PAGE 43 =====

```text
Sum
U
pper School students have
opportunities to travel and study off
campus and abroad, either through
Country Day sponsored programs or affiliate
programs, such as School Year Abroad,
Alzar, and Maine Coast Semester at
Chewonki. Students who have interest in
other semester-away opportunities not
listed below are free to pursue those as
well. Country Day awards graduation credit
as able for work with most accredited
programs, however the Country Day GPA is
not impacted by courses completed outside
of Country Day.
Sister School Exchanges, Study Trips, and Cultural and
Academic Experiences
The International Studies office administers Sister School
exchanges, study trips, and Cultural and
Academic experiences. Upper School students travel and,
depending upon the experience, spend some time at
schools for approximately two weeks (usually in June).
Faculty-led experiences abroad take place during school
breaks during the academic year and the summer.
Exchanges, study trips, and Cultural and Academic
experiences vary from year to year, based on program
developments by the Office of International Studies in
collaboration with the Upper School Office and
Department Chairs.
School Year Abroad
Offering a high school semester or year in France, Italy, or
Spain, this program is the only secondary-level program
that allows students to live with a host family while
earning Upper School graduation credits and preparing
for selective United States colleges and universities.
Founded in 1965 and sponsored by three New England
boarding schools (Phillips Academy, Phillips Exeter
Academy, and St. Paul’s School), School Year Abroad (SYA)
operates its own schools in Rennes, France, in Zaragoza,
Spain, and in Viterbo, Italy. SYA’s program includes a nine
August 2025
Off-Campus and
mmer Academic Opportunities
month home-stay with courses taught exclusively in the
native language plus American core courses taught by
faculty from the sponsoring schools.
High School Study Abroad Programs | Year & Semester |
France | Italy | Spain (sya.org)
Alzar
Splitting time between Patagonia and Idaho, this
semester-long program is a favorite among those who
enjoy the outdoors. Students are involved in experiential
learning, including time spent immersed in Chilean
culture. Core subjects are required as part of the program,
and Alzar is able to offer a limited number of AP exams on
the national testing days.
Outdoor Classroom and Cultural Exchange | Semester
School | Alzar School
Maine Coast Semester at Chewonki
Founded in 1988, Maine Coast Semester at Chewonki,
offers about 40 juniors from top day and boarding schools
around the country the chance to spend half of their year
on a 400-acre coastal peninsula, surrounded by salt
marshes and tidal inlets and bordered with several miles
of shoreline. The Afternoon Work Program affords the
opportunity to work on an organic farm, chop firewood,
and help with construction projects. The curriculum
includes traditional junior year courses as well as
distinctive courses such as Environmental Issues, Natural
History of the Maine Coast, and Art and the Natural
World. Country Day and Chewonki coordinate the
program of study for our students’ year courses. One co-
curricular credit is granted for the work program, and a
fine arts studio credit is granted for Art and the Natural
World. Charlotte Country Day School is pleased to be one
of fourteen member schools. Life-Changing Learning in
Nature - Maine Coast Semester (chewonki.org)
Science Outreach Program
We have many high school students who are passionate
about science. The school promotes relationships with
science professors at local institutions to give our
students primary research opportunities over the
summer. Interested students should speak to their
current science teacher and get in touch with the Science
Outreach Coordinator who can provide guidance about
42
```

===== PAGE 44 =====

```text
possible placements. These experiences involve a large
time commitment over the summer and are generally
offered to rising seniors and juniors. The Science Outreach
Coordinator can also help with applications to existing
summer research programs across the nation. Students
who take part in summer research are asked to present
their work at the annual Science Symposium in the fall
each year.
August 2025
Summer School Programs
Country Day does not offer summer general academic
courses for credit. Summer courses taken at other
institutions do not transfer to the Country Day transcript
or factor into a student’s GPA.
43
```

