var e=`charlotte-country-day`,t=`course-offerings`,n=36,r=[{subtopic:`Curriculum Guide Full Descriptions 2025-2026`,source_file:`Charlotte Country Day - Course Offerings - Curriculum Guide Full Descriptions 2025-2026.md`,preview:"# Charlotte Country Day School — Course Offerings — Curriculum Guide Full Descriptions 2025-26 - Date fetched: 2026-11-11 - Why: the earlier record (`Charlotte Country Day - Course Offerings - Curriculum Guide.md`) holds the app's own condensed descriptions word for word for 92% of courses, so it cannot catch a…",text:`# Charlotte Country Day School — Course Offerings — Curriculum Guide Full Descriptions 2025-26

- **Date fetched:** 2026-11-11
- **Why:** the earlier record (\`Charlotte Country Day - Course Offerings - Curriculum Guide.md\`)
 holds the app's own condensed descriptions word for word for 92% of courses, so it cannot
 catch a description that drifted from the catalog. This file holds the school's own text,
 for the description-to-catalog census.
- **Upper School method:** the 2025-26 Upper School Academic Policies and Course Guide PDF
 ("August update", 44 pp.) was re-downloaded from S1 and its text extracted column by column
 with \`pdfplumber\` (each two-column page is read left column, then right column; a page heading
 that spans both columns can be split across them, e.g. "Engli" … "ish as a Second Language").
 U+200B was read as a space and runs of spaces collapsed. No other change.
 - PDF SHA-256: \`b777a4f809f4a527938cc1801f6c6c15575bf2df71b584b7244bee971382af0d\`
 - PDF metadata: created 2025-08-19; the PDF's \`Subject\` field still reads "Academic Policies and
 Course Guide: 2023-24", a leftover from an older file; the cover and every page footer read
 2025-26 / "August 2025".
- **Lower and Middle School method:** each division's live curriculum hub and grade pages
 (S3–S15) were fetched as HTML and converted to text; site navigation, news and footer
 blocks were removed. The pages have no click-to-open tiles (checked for \`fsPostLink\`).
- **Catalog year:** the app was built from this same 2025-26 guide (record, 2026-07-26). No
 newer Upper School guide was looked for or used (freshness is out of scope for the census).`},{subtopic:`Source URLs`,source_file:null,preview:`| Ref | URL | What it covers | | --- | --- | --- | | S1 | https://resources.finalsite.net/images/v1755633363/charlottecds/kt72slq7bqecmr1hswmm/2025-26CourseCatalogueAugustupdate.pdf | 2025-26 Upper School Academic Policies and Course Guide (44 pp.), every Upper School course entry | | S2 |…`,text:`| Ref | URL | What it covers |
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
| S15 | https://www.charlottecountryday.org/cd-education/middle-school | Middle School overview (language options, math classes); added during the Batch 1 census |`},{subtopic:`Index — every app course, in app order`,source_file:null,preview:"Where each app row's own text sits below. Upper School rows point to the guide page (PDF page number, as `===== PAGE N =====` below); Lower and Middle School rows point to the division section. | App path | Division | Department | Title | Where | | --- | --- | --- | --- | --- | |…",text:"Where each app row's own text sits below. Upper School rows point to the guide page (PDF page number, as `===== PAGE N =====` below); Lower and Middle School rows point to the division section.\n\n| App path | Division | Department | Title | Where |\n| --- | --- | --- | --- | --- |\n| `divisions[0].departments[0].courses[0]` | Lower School Courses | Core Academics | Units of Inquiry | Lower School pages |\n| `divisions[0].departments[0].courses[1]` | Lower School Courses | Core Academics | Language Arts / Literacy | Lower School pages |\n| `divisions[0].departments[0].courses[2]` | Lower School Courses | Core Academics | Mathematics | Lower School pages |\n| `divisions[0].departments[0].courses[3]` | Lower School Courses | Core Academics | Science | Lower School pages |\n| `divisions[0].departments[0].courses[4]` | Lower School Courses | Core Academics | Social Studies | Lower School pages |\n| `divisions[0].departments[1].courses[0]` | Lower School Courses | Modern Languages | French & Spanish | Lower School pages |\n| `divisions[0].departments[2].courses[0]` | Lower School Courses | Arts, PE & Design | Fine Arts (Art, Music, Drama) | Lower School pages |\n| `divisions[0].departments[2].courses[1]` | Lower School Courses | Arts, PE & Design | Physical Education | Lower School pages |\n| `divisions[0].departments[2].courses[2]` | Lower School Courses | Arts, PE & Design | Design Lab | Lower School pages |\n| `divisions[0].departments[2].courses[3]` | Lower School Courses | Arts, PE & Design | Library / Information Literacy | Lower School pages |\n| `divisions[1].departments[0].courses[0]` | Middle School Courses | Mathematics | Fifth Grade Math | Middle School pages |\n| `divisions[1].departments[0].courses[1]` | Middle School Courses | Mathematics | Sixth Grade Math | Middle School pages |\n| `divisions[1].departments[0].courses[2]` | Middle School Courses | Mathematics | Sixth Grade Pre-Algebra | Middle School pages |\n| `divisions[1].departments[0].courses[3]` | Middle School Courses | Mathematics | Pre-Algebra | Middle School pages |\n| `divisions[1].departments[0].courses[4]` | Middle School Courses | Mathematics | Honors Pre-Algebra | Middle School pages |\n| `divisions[1].departments[0].courses[5]` | Middle School Courses | Mathematics | Honors Algebra 1 | Middle School pages |\n| `divisions[1].departments[0].courses[6]` | Middle School Courses | Mathematics | Algebra 8A | Middle School pages |\n| `divisions[1].departments[0].courses[7]` | Middle School Courses | Mathematics | Algebra 1 | Middle School pages |\n| `divisions[1].departments[0].courses[8]` | Middle School Courses | Mathematics | Geometry | Middle School pages |\n| `divisions[1].departments[1].courses[0]` | Middle School Courses | English & Social Studies | Language Arts & Social Studies (integrated) | Middle School pages |\n| `divisions[1].departments[1].courses[1]` | Middle School Courses | English & Social Studies | Language Arts & Social Studies (integrated) | Middle School pages |\n| `divisions[1].departments[1].courses[2]` | Middle School Courses | English & Social Studies | English | Middle School pages |\n| `divisions[1].departments[1].courses[3]` | Middle School Courses | English & Social Studies | Social Studies | Middle School pages |\n| `divisions[1].departments[1].courses[4]` | Middle School Courses | English & Social Studies | English | Middle School pages |\n| `divisions[1].departments[1].courses[5]` | Middle School Courses | English & Social Studies | Social Studies | Middle School pages |\n| `divisions[1].departments[2].courses[0]` | Middle School Courses | Science & Engineering | Science | Middle School pages |\n| `divisions[1].departments[2].courses[1]` | Middle School Courses | Science & Engineering | Science: Forces of Change | Middle School pages |\n| `divisions[1].departments[2].courses[2]` | Middle School Courses | Science & Engineering | Science | Middle School pages |\n| `divisions[1].departments[2].courses[3]` | Middle School Courses | Science & Engineering | Science | Middle School pages |\n| `divisions[1].departments[2].courses[4]` | Middle School Courses | Science & Engineering | Engineering | Middle School pages |\n| `divisions[1].departments[3].courses[0]` | Middle School Courses | Modern & Classical Languages | Spanish | Middle School pages |\n| `divisions[1].departments[3].courses[1]` | Middle School Courses | Modern & Classical Languages | French | Middle School pages |\n| `divisions[1].departments[3].courses[2]` | Middle School Courses | Modern & Classical Languages | Latin | Middle School pages |\n| `divisions[1].departments[4].courses[0]` | Middle School Courses | Fine Arts | Visual Art | Middle School pages |\n| `divisions[1].departments[4].courses[1]` | Middle School Courses | Fine Arts | Band | Middle School pages |\n| `divisions[1].departments[4].courses[2]` | Middle School Courses | Fine Arts | Choir | Middle School pages |\n| `divisions[1].departments[4].courses[3]` | Middle School Courses | Fine Arts | Orchestra | Middle School pages |\n| `divisions[1].departments[4].courses[4]` | Middle School Courses | Fine Arts | Drama | Middle School pages |\n| `divisions[1].departments[4].courses[5]` | Middle School Courses | Fine Arts | General Music | Middle School pages |\n| `divisions[1].departments[5].courses[0]` | Middle School Courses | PE, Health & Advisory | Physical Education | Middle School pages |\n| `divisions[1].departments[5].courses[1]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |\n| `divisions[1].departments[5].courses[2]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |\n| `divisions[1].departments[5].courses[3]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |\n| `divisions[1].departments[5].courses[4]` | Middle School Courses | PE, Health & Advisory | Health | Middle School pages |\n| `divisions[1].departments[5].courses[5]` | Middle School Courses | PE, Health & Advisory | Counseling | Middle School pages |\n| `divisions[1].departments[5].courses[6]` | Middle School Courses | PE, Health & Advisory | Counseling: Too Good For Drugs | Middle School pages |\n| `divisions[1].departments[5].courses[7]` | Middle School Courses | PE, Health & Advisory | Information Literacy | Middle School pages |\n| `divisions[1].departments[5].courses[8]` | Middle School Courses | PE, Health & Advisory | Advisory | Middle School pages |\n| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | English 9: Foundations in English | guide p. 9, 10 |\n| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | English 10: Foundations in English II: The Individual in Society | guide p. 10 |\n| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | English 11: American Literature | guide p. 9, 10, 11 |\n| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | AP English 11: Language & Composition | guide p. 9, 11 |\n| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | AP English 12: Literature & Composition | guide p. 9, 11 |\n| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | IB English 11 (HL) | guide p. 11, 37 |\n| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | IB English 12 (HL) | guide p. 11, 37 |\n| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | English 12 | guide p. 9, 10, 11, 37 |\n| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Creative Writing | guide p. 9 |\n| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Intermediate & Advanced ESL | guide p. 12 |\n| `divisions[2].departments[1].courses[0]` | Upper School Courses | Mathematics | Algebra I | guide p. 9, 13 |\n| `divisions[2].departments[1].courses[1]` | Upper School Courses | Mathematics | Geometry | guide p. 9, 13, 14 |\n| `divisions[2].departments[1].courses[2]` | Upper School Courses | Mathematics | Honors Geometry | guide p. 9, 13 |\n| `divisions[2].departments[1].courses[3]` | Upper School Courses | Mathematics | Algebra II | guide p. 9, 13, 14, 17 |\n| `divisions[2].departments[1].courses[4]` | Upper School Courses | Mathematics | Honors Algebra II | guide p. 9, 13, 14 |\n| `divisions[2].departments[1].courses[5]` | Upper School Courses | Mathematics | Honors Algebra II/Precalculus | guide p. 9 |\n| `divisions[2].departments[1].courses[6]` | Upper School Courses | Mathematics | Algebra III/Trigonometry | guide p. 9, 13, 14 |\n| `divisions[2].departments[1].courses[7]` | Upper School Courses | Mathematics | Dynamic Math | guide p. 9, 14 |\n| `divisions[2].departments[1].courses[8]` | Upper School Courses | Mathematics | Pre-calculus | guide p. 9, 13, 14, 15 |\n| `divisions[2].departments[1].courses[9]` | Upper School Courses | Mathematics | Honors Pre-calculus | guide p. 9, 14, 15, 34 |\n| `divisions[2].departments[1].courses[10]` | Upper School Courses | Mathematics | Introduction to Calculus & Statistics | guide p. 9 |\n| `divisions[2].departments[1].courses[11]` | Upper School Courses | Mathematics | AP Statistics | guide p. 9, 14 |\n| `divisions[2].departments[1].courses[12]` | Upper School Courses | Mathematics | Advanced AP Statistics with R and R Studio | guide p. 9, 14 |\n| `divisions[2].departments[1].courses[13]` | Upper School Courses | Mathematics | AP Calculus AB | guide p. 9, 14 |\n| `divisions[2].departments[1].courses[14]` | Upper School Courses | Mathematics | AP Calculus BC | guide p. 9, 14, 15, 39 |\n| `divisions[2].departments[1].courses[15]` | Upper School Courses | Mathematics | IB Applications SL | guide p. 9, 15, 39 |\n| `divisions[2].departments[1].courses[16]` | Upper School Courses | Mathematics | IB Analysis SL | guide p. 9, 15, 39 |\n| `divisions[2].departments[1].courses[17]` | Upper School Courses | Mathematics | Calculus III/IB Analysis HL | guide p. 15 |\n| `divisions[2].departments[2].courses[0]` | Upper School Courses | Sciences | Inquiries in Biological and Physical Science | guide p. 9, 16 |\n| `divisions[2].departments[2].courses[1]` | Upper School Courses | Sciences | Biology I | guide p. 9, 16, 17, 18 |\n| `divisions[2].departments[2].courses[2]` | Upper School Courses | Sciences | AP Biology | guide p. 9, 16, 19, 21 |\n| `divisions[2].departments[2].courses[3]` | Upper School Courses | Sciences | IB Biology SL | guide p. 9, 16, 38, 40 |\n| `divisions[2].departments[2].courses[4]` | Upper School Courses | Sciences | IB Biology HL | guide p. 9, 16, 38 |\n| `divisions[2].departments[2].courses[5]` | Upper School Courses | Sciences | AP Environmental Science | guide p. 9, 17 |\n| `divisions[2].departments[2].courses[6]` | Upper School Courses | Sciences | Environmental Issues | guide p. 9, 17, 43 |\n| `divisions[2].departments[2].courses[7]` | Upper School Courses | Sciences | Marine Biology | guide p. 9, 17 |\n| `divisions[2].departments[2].courses[8]` | Upper School Courses | Sciences | Human Anatomy: External Structural Systems | guide p. 17 |\n| `divisions[2].departments[2].courses[9]` | Upper School Courses | Sciences | Human Anatomy: Internal Structural Systems | guide p. 9, 17 |\n| `divisions[2].departments[2].courses[10]` | Upper School Courses | Sciences | Chemistry I | guide p. 9, 16, 17, 18 |\n| `divisions[2].departments[2].courses[11]` | Upper School Courses | Sciences | Honors Chemistry I | guide p. 16, 17, 18 |\n| `divisions[2].departments[2].courses[12]` | Upper School Courses | Sciences | AP Chemistry | guide p. 9, 18, 19 |\n| `divisions[2].departments[2].courses[13]` | Upper School Courses | Sciences | IB Chemistry SL | guide p. 9, 18, 38, 39 |\n| `divisions[2].departments[2].courses[14]` | Upper School Courses | Sciences | IB Chemistry HL | guide p. 9, 18, 39 |\n| `divisions[2].departments[2].courses[15]` | Upper School Courses | Sciences | Physics I | guide p. 9, 18, 19 |\n| `divisions[2].departments[2].courses[16]` | Upper School Courses | Sciences | Honors Physics I | guide p. 18 |\n| `divisions[2].departments[2].courses[17]` | Upper School Courses | Sciences | AP Physics C: Mechanics, E&M | guide p. 9 |\n| `divisions[2].departments[2].courses[18]` | Upper School Courses | Sciences | Astronomy: Solar Systems | guide p. 9, 18 |\n| `divisions[2].departments[2].courses[19]` | Upper School Courses | Sciences | Forensic Science: Biochemical Applications | guide p. 18 |\n| `divisions[2].departments[2].courses[20]` | Upper School Courses | Sciences | Forensic Science: Physical Applications | guide p. 9, 19 |\n| `divisions[2].departments[2].courses[21]` | Upper School Courses | Sciences | Organic Chemistry | guide p. 9, 19, 38 |\n| `divisions[2].departments[2].courses[22]` | Upper School Courses | Sciences | Honors Principles of Engineering | guide p. 19 |\n| `divisions[2].departments[2].courses[23]` | Upper School Courses | Sciences | Physical Computational Biochemistry | guide p. 19 |\n| `divisions[2].departments[3].courses[0]` | Upper School Courses | History & Social Studies | 9th Grade History | guide p. 20 |\n| `divisions[2].departments[3].courses[1]` | Upper School Courses | History & Social Studies | Modern World History | guide p. 9, 20 |\n| `divisions[2].departments[3].courses[2]` | Upper School Courses | History & Social Studies | Honors Modern World History | guide p. 9, 20 |\n| `divisions[2].departments[3].courses[3]` | Upper School Courses | History & Social Studies | IB World History SL | guide p. 20, 38 |\n| `divisions[2].departments[3].courses[4]` | Upper School Courses | History & Social Studies | United States History | guide p. 9, 20, 38 |\n| `divisions[2].departments[3].courses[5]` | Upper School Courses | History & Social Studies | AP United States History | guide p. 9, 20 |\n| `divisions[2].departments[3].courses[6]` | Upper School Courses | History & Social Studies | IB History of the Americas HL | guide p. 21, 38 |\n| `divisions[2].departments[3].courses[7]` | Upper School Courses | History & Social Studies | AP Psychology | guide p. 9, 21 |\n| `divisions[2].departments[3].courses[8]` | Upper School Courses | History & Social Studies | IB Psychology SL | guide p. 21, 38, 41 |\n| `divisions[2].departments[3].courses[9]` | Upper School Courses | History & Social Studies | AP Human Geography | guide p. 9, 21 |\n| `divisions[2].departments[3].courses[10]` | Upper School Courses | History & Social Studies | AP European History | guide p. 9, 21 |\n| `divisions[2].departments[3].courses[11]` | Upper School Courses | History & Social Studies | AP US Government and Politics | guide p. 9, 21 |\n| `divisions[2].departments[3].courses[12]` | Upper School Courses | History & Social Studies | Ancient Empires | guide p. 9, 22 |\n| `divisions[2].departments[3].courses[13]` | Upper School Courses | History & Social Studies | Adolescent Psychology and Behavior | guide p. 9, 22 |\n| `divisions[2].departments[3].courses[14]` | Upper School Courses | History & Social Studies | African American History: From Slavery to Civil Rights | guide p. 22 |\n| `divisions[2].departments[3].courses[15]` | Upper School Courses | History & Social Studies | Education for Social Justice | guide p. 22 |\n| `divisions[2].departments[3].courses[16]` | Upper School Courses | History & Social Studies | IB Digital Society | guide p. 8 |\n| `divisions[2].departments[4].courses[0]` | Upper School Courses | Modern & Classical Languages | Honors Chinese I–V | guide p. 23 |\n| `divisions[2].departments[4].courses[1]` | Upper School Courses | Modern & Classical Languages | Chinese II | guide p. 9, 23 |\n| `divisions[2].departments[4].courses[2]` | Upper School Courses | Modern & Classical Languages | IB Chinese | guide p. 9, 23, 37 |\n| `divisions[2].departments[4].courses[3]` | Upper School Courses | Modern & Classical Languages | French I–V | guide p. 24 |\n| `divisions[2].departments[4].courses[4]` | Upper School Courses | Modern & Classical Languages | Honors French II, III, IV | guide p. 9 |\n| `divisions[2].departments[4].courses[5]` | Upper School Courses | Modern & Classical Languages | AP French Language & Culture | guide p. 9, 25 |\n| `divisions[2].departments[4].courses[6]` | Upper School Courses | Modern & Classical Languages | IB French HL | guide p. 9, 37 |\n| `divisions[2].departments[4].courses[7]` | Upper School Courses | Modern & Classical Languages | Spanish I–V | guide p. 25 |\n| `divisions[2].departments[4].courses[8]` | Upper School Courses | Modern & Classical Languages | Honors Spanish II, III, IV | guide p. 9 |\n| `divisions[2].departments[4].courses[9]` | Upper School Courses | Modern & Classical Languages | AP Spanish Language & Culture | guide p. 9, 26 |\n| `divisions[2].departments[4].courses[10]` | Upper School Courses | Modern & Classical Languages | IB Spanish HL | guide p. 9, 37 |\n| `divisions[2].departments[4].courses[11]` | Upper School Courses | Modern & Classical Languages | Latin I–V | guide p. 26 |\n| `divisions[2].departments[4].courses[12]` | Upper School Courses | Modern & Classical Languages | Honors Latin II, III, IV | guide p. 9 |\n| `divisions[2].departments[4].courses[13]` | Upper School Courses | Modern & Classical Languages | AP Latin | guide p. 9, 27 |\n| `divisions[2].departments[4].courses[14]` | Upper School Courses | Modern & Classical Languages | IB Latin | guide p. 9, 27, 37 |\n| `divisions[2].departments[5].courses[0]` | Upper School Courses | Fine Arts | Concert Choir | guide p. 9, 28 |\n| `divisions[2].departments[5].courses[1]` | Upper School Courses | Fine Arts | Honors Concert Choir | guide p. 9, 28 |\n| `divisions[2].departments[5].courses[2]` | Upper School Courses | Fine Arts | Honors Chamber Choir | guide p. 9, 28 |\n| `divisions[2].departments[5].courses[3]` | Upper School Courses | Fine Arts | Symphonic Band | guide p. 9, 28, 29 |\n| `divisions[2].departments[5].courses[4]` | Upper School Courses | Fine Arts | Honors Symphonic Band | guide p. 9, 28, 29 |\n| `divisions[2].departments[5].courses[5]` | Upper School Courses | Fine Arts | Orchestra | guide p. 9, 29, 40 |\n| `divisions[2].departments[5].courses[6]` | Upper School Courses | Fine Arts | Honors Orchestra | guide p. 9, 29 |\n| `divisions[2].departments[5].courses[7]` | Upper School Courses | Fine Arts | Introduction to Piano | guide p. 9, 29 |\n| `divisions[2].departments[5].courses[8]` | Upper School Courses | Fine Arts | Supersonic: Percussion Ensemble | guide p. 9, 29 |\n| `divisions[2].departments[5].courses[9]` | Upper School Courses | Fine Arts | AP Music Theory | guide p. 9, 29 |\n| `divisions[2].departments[5].courses[10]` | Upper School Courses | Fine Arts | Acting/Directing I | guide p. 9, 29, 30 |\n| `divisions[2].departments[5].courses[11]` | Upper School Courses | Fine Arts | Acting/Directing II | guide p. 9, 30 |\n| `divisions[2].departments[5].courses[12]` | Upper School Courses | Fine Arts | Theater Workshop | guide p. 9 |\n| `divisions[2].departments[5].courses[13]` | Upper School Courses | Fine Arts | Improvisation I | guide p. 9, 30 |\n| `divisions[2].departments[5].courses[14]` | Upper School Courses | Fine Arts | Improvisation II | guide p. 30 |\n| `divisions[2].departments[5].courses[15]` | Upper School Courses | Fine Arts | IB Theatre Arts (SL, HL) | guide p. 9, 29, 30, 40 |\n| `divisions[2].departments[5].courses[16]` | Upper School Courses | Fine Arts | 2-D Art I–IV | guide p. 9, 30 |\n| `divisions[2].departments[5].courses[17]` | Upper School Courses | Fine Arts | Design/Photography I–IV | guide p. 31 |\n| `divisions[2].departments[5].courses[18]` | Upper School Courses | Fine Arts | Sculpture I–IV | guide p. 9, 31 |\n| `divisions[2].departments[5].courses[19]` | Upper School Courses | Fine Arts | Architectural Design Studio | guide p. 32 |\n| `divisions[2].departments[5].courses[20]` | Upper School Courses | Fine Arts | Special Projects in Visual Arts | guide p. 32 |\n| `divisions[2].departments[5].courses[21]` | Upper School Courses | Fine Arts | AP Studio: 2D Art | guide p. 9, 32 |\n| `divisions[2].departments[5].courses[22]` | Upper School Courses | Fine Arts | AP Studio: Design/Photography | guide p. 9, 32 |\n| `divisions[2].departments[5].courses[23]` | Upper School Courses | Fine Arts | AP Studio: Sculpture | guide p. 9, 33 |\n| `divisions[2].departments[5].courses[24]` | Upper School Courses | Fine Arts | AP Art History | guide p. 9, 33 |\n| `divisions[2].departments[5].courses[25]` | Upper School Courses | Fine Arts | IB Art I & II (SL, HL) | guide p. 9 |\n| `divisions[2].departments[5].courses[26]` | Upper School Courses | Fine Arts | Yearbook | guide p. 9, 33 |\n| `divisions[2].departments[5].courses[27]` | Upper School Courses | Fine Arts | Yearbook Editor, Honors | guide p. 33 |\n| `divisions[2].departments[6].courses[0]` | Upper School Courses | Technology & Computer Science | Exploring Computer Science | guide p. 9, 34 |\n| `divisions[2].departments[6].courses[1]` | Upper School Courses | Technology & Computer Science | AP Computer Science A | guide p. 9, 34 |\n| `divisions[2].departments[6].courses[2]` | Upper School Courses | Technology & Computer Science | Advanced Topics in Computer Science | guide p. 9, 34 |\n| `divisions[2].departments[7].courses[0]` | Upper School Courses | Non-Departmental | 9th Grade Seminar | guide p. 9, 35 |\n| `divisions[2].departments[7].courses[1]` | Upper School Courses | Non-Departmental | IB Theory of Knowledge | guide p. 9, 36 |\n| `divisions[2].departments[7].courses[2]` | Upper School Courses | Non-Departmental | Public Speaking and Professional Communication | guide p. 35 |\n| `divisions[2].departments[7].courses[3]` | Upper School Courses | Non-Departmental | IB Extended Essay & CAS | guide p. 36 |\n| `divisions[2].departments[8].courses[0]` | Upper School Courses | Physical Education | Strength Training | guide p. 9, 35, 42 |\n| `divisions[2].departments[8].courses[1]` | Upper School Courses | Physical Education | Ultimate Frisbee | guide p. 42 |"},{subtopic:`Lower School — curriculum pages (S3–S9)`,source_file:null,preview:`### Lower School curriculum hub (S3) # Lower School Curriculum In Lower School, we value social, emotional, physical, and academic growth and development. Each classroom includes two full-time instructional teachers who work to build a solid foundation of underlying skills and conceptual understanding to develop deep,…`,text:`### Lower School curriculum hub (S3)

# Lower School Curriculum

In Lower School, we value social, emotional, physical, and academic growth and development. Each classroom includes two full-time instructional teachers who work to build a solid foundation of underlying skills and conceptual understanding to develop deep, critical thinkers and problem solvers.

In addition to a strong academic program, students gain skills to cultivate self-knowledge, develop empathy, and make responsible decisions. Experiences across the Lower School encourage and develop creativity, collaboration, and communication to foster lifelong, curious, joyful learners.

- Special area classes include science, design lab, physical education, modern languages (French and Spanish), music, art, drama, and library.

- Guest speakers, visiting performers and artists, and curriculum-related field trips help expand our student’s knowledge and help them grow in awareness, expression, and appreciation.

### jk (lower-school/ls-curriculum/jk)

# Junior Kindergarten Experience

Our Junior Kindergarten (JK) program was designed with best practices in early childhood education in mind, and it fosters each child’s growth in the following areas: social, emotional, academic, and physical.

The curriculum is student-centered, differentiated and designed to engage and inspire students through inquiry, direct instruction, and play. The curriculum is comprehensive and covers literacy, motor development, oral language development, math, themed inquiry work, and social-emotional learning.`},{subtopic:`Curriculum`,source_file:null,preview:`►Click to learn more - Units of Inquiry - Literacy - Mathematics - Science - Modern Languages - Physical Education - Fine Arts - Library - Design Lab`,text:`►Click to learn more

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
Design Lab`},{subtopic:`Units of Inquiry`,source_file:null,preview:`Our Units of Inquiry intentionally weave together literacy, math, science, and social studies instruction to build a strong academic foundation for our junior kindergarten students. My Place in the World This unit is designed to build community, build a healthy sense of identity for each child, celebrate and…`,text:`Our Units of Inquiry intentionally weave together literacy, math, science, and social studies instruction to build a strong academic foundation for our junior kindergarten students.

My Place in the World

This unit is designed to build community, build a healthy sense of identity for each child, celebrate and understand similarities and differences, understand the roles and responsibilities of community members and teach children to care for one another and for the environment.

Full STEAM Ahead

In this design and engineering unit, students learn to create blueprint plans and models to create structures, and they study different kinds of structures around the world. Fairy tales and folktales are the literacy focus of this unit. Students name problems that arise in the stories and work together to find solutions as they cycle through the engineering design process. This unit aims to develop social-emotional learning skills as students learn to work together as a group and to practice persevering when projects don’t go as planned.

Nursery Rhymes

In this literacy/dramatic play unit, students develop emergent reading and writing skills. Students practice the art of retelling and create their own nursery rhymes using the literary techniques they learn. Puppeteering, art, and drama are utilized to bring nursery rhymes to life! At the end of the unit, each class takes the stage to perform their favorite nursery rhyme!

Backyard Scientists

Students focus on the concept of change over time by examining the seasons. The unit aims to develop close observation skills, understanding what makes something living vs nonliving, and beginning to see growth/change over time. Students also examine their role in stewarding the environment.`},{subtopic:`Literacy`,source_file:null,preview:`Our junior kindergarteners are immersed in joyful, literacy-rich classroom environments where reading and writing are intentionally embedded in all parts of the day. Our JK literacy program is designed to foster a love of literature, to offer students many opportunities to engage in purposeful reading and writing…`,text:`Our junior kindergarteners are immersed in joyful, literacy-rich classroom environments where reading and writing are intentionally embedded in all parts of the day. Our JK literacy program is designed to foster a love of literature, to offer students many opportunities to engage in purposeful reading and writing attempts, and to develop students’ background knowledge and vocabulary. Teachers provide explicit, differentiated instruction in phonological awareness, the alphabet, and phonics.

Areas of Focus

- Fostering a love of reading and writing

- Developing vocabulary

- Hearing, segmenting, and manipulating individual sounds in spoken words

- Learning to recognize letters and sounds

- Engaging with a variety of literary genres: poetry, fiction, nonfiction, folktales

- Participating in story dramatizations

- Expressing oneself through drawing, story dictation, and emergent writing

- Building comprehension skills in retelling, comparing and contrasting, sequencing, asking questions, and analyzing characters`},{subtopic:`Mathematics`,source_file:null,preview:`Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers and creative thinkers. JK students develop number sense, spatial awareness, and math language skills through active exploration and playing hands-on games. Rather than being taught in isolation, math in JK is…`,text:`Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers and creative thinkers. JK students develop number sense, spatial awareness, and math language skills through active exploration and playing hands-on games. Rather than being taught in isolation, math in JK is integrated throughout the day.

Skills and Concepts

- Developing number sense

- Identifying, sorting and classifying objects by common attributes

- Describing and extending repeating patterns

- Identifying, categorizing and describing 2-dimensional shapes`},{subtopic:`Science`,source_file:null,preview:`Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems. In JK, students learn the…`,text:`Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In JK, students learn the basics of observation skills and what it means to be a scientist. They cover the physical, life, and earth sciences, specifically related to seasonal changes, the color spectrum, and the human body.`},{subtopic:`Modern Languages`,source_file:null,preview:`Our goals are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies that will help them thrive in our global world. All junior kindergarten students are exposed to the language and culture of both French and Spanish.…`,text:`Our goals are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies that will help them thrive in our global world.

All junior kindergarten students are exposed to the language and culture of both French and Spanish. Our goals are for students to become familiar with the sound of both languages and explore it by playing with basic vocabulary.`},{subtopic:`Physical Education`,source_file:null,preview:`The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. Our PE program provides every Lower School student with a daily opportunity to move, play and learn! The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition…`,text:`The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. Our PE program provides every Lower School student with a daily opportunity to move, play and learn! The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills. Fundamental athletic skills are introduced, while students develop problem-solving strategies and sportsmanship through an environment of cooperative learning.`},{subtopic:`Fine Arts`,source_file:null,preview:`Students are immersed in art, music, and drama every week. Our goals are to instill a love of arts in our students, to build design-thinking skills, and to find joy in the creative process. Art Student artists explore the fundamental elements of art including line, shape, pattern, and color through drawing, painting,…`,text:`Students are immersed in art, music, and drama every week. Our goals are to instill a love of arts in our students, to build design-thinking skills, and to find joy in the creative process.

Art

Student artists explore the fundamental elements of art including line, shape, pattern, and color through drawing, painting, collage, printmaking and clay. Using a variety of materials and creative process lays the foundation of artistic expression.

Drama

For our youngest students, drama class is an exploration of their imagination through movement, voice, and emotions. Junior Kindergarteners also perform in an end-of-the-year play with songs highlighting the alphabet—an important foundation for reading and literacy development.

Music

JK students explore music by practicing steady beat, repeating rhythm patterns, singing solfege patterns (do-mi-sol), composing their own rhythms, playing percussion instruments, and singing fun songs.`},{subtopic:`Library`,source_file:null,preview:`The library is a critical component of our junior kindergarten year. The librarians help students learn to engage with pictures and text, and support a growing love of reading. In addition, the librarians teach emerging literacy skills in their regularly scheduled classes to further support the literacy instruction in…`,text:`The library is a critical component of our junior kindergarten year. The librarians help students learn to engage with pictures and text, and support a growing love of reading. In addition, the librarians teach emerging literacy skills in their regularly scheduled classes to further support the literacy instruction in the classroom.`},{subtopic:`Design Lab`,source_file:null,preview:`Our youngest learners enter our Design Lab ready to explore and impact the world around them. Through purposeful play and guided exploration, junior kindergarten students begin their engineering and design journey with meaningful experiences that set the stage for skill development moving forward. ### kindergarten…`,text:`Our youngest learners enter our Design Lab ready to explore and impact the world around them. Through purposeful play and guided exploration, junior kindergarten students begin their engineering and design journey with meaningful experiences that set the stage for skill development moving forward.

### kindergarten (lower-school/ls-curriculum/kindergarten)

# Kindergarten Experience`},{subtopic:`Curriculum at a Glance`,source_file:null,preview:`►Click to learn more - Language Arts - Mathematics - Social Studies - Science - Physical Education - Modern Languages - Design Lab - Library - Fine Arts`,text:`►Click to learn more

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
Fine Arts`},{subtopic:`Language Arts`,source_file:null,preview:`Our Lower School literacy curriculum focuses on the Five Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension. Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and…`,text:`Our Lower School literacy curriculum focuses on the Five Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension.

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

Module 4: The Continents`},{subtopic:`Mathematics`,source_file:null,preview:`Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers, and creative thinkers. The Developing Roots program is designed to build a foundation for our Math in Focus program through child-centered, hands-on experiences. The core focus in math in the Lower School is…`,text:`Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers, and creative thinkers. The Developing Roots program is designed to build a foundation for our Math in Focus program through child-centered, hands-on experiences. The core focus in math in the Lower School is building a deep understanding of number sense, operations, and computation. Our students learn not just how to solve rote problems, but how to think mathematically and tackle real-world, rigorous mathematical problems.

Skills and Concepts

- Counting to 100 by 1s, 5s and 10s

- Composing and decomposing numbers 1–10

- Reading and writing 2-digit numbers

- Identifying, describing, sorting, and classifying 2- and 3- dimensional shapes

- Representing and solving addition and subtraction stories (within 10)

- Classifying objects based on attributes

- Measuring and comparing length and weight`},{subtopic:`Social Studies`,source_file:null,preview:`The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural…`,text:`The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural identities, and they acquire the skills and knowledge needed to actively participate in their classroom, school, community, and world.

Units of Study

- Unit 1: Civic Ideals and Rules

- Unit 2: Getting to Know “Me” and “Us”

- Unit 3: Maps and Globes

- Unit 4: Wants and Needs`},{subtopic:`Science`,source_file:null,preview:`Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems. In kindergarten, students…`,text:`Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds to design innovative, sustainable solutions to real world problems.

In kindergarten, students continue to hone their observation skills and learn to make predictions. They explore the physical, life, and earth sciences, specifically magnetism, life cycles, and environmental stewardship.`},{subtopic:`Physical Education`,source_file:null,preview:`The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. Our PE program provides every Lower School student with a daily opportunity to move, play and learn. The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition…`,text:`The physical education curriculum focuses on the physical, mental, and social emotional growth of our students. Our PE program provides every Lower School student with a daily opportunity to move, play and learn. The curriculum focuses on developing and maintaining a physically active and healthy lifestyle in addition to developing gross motor, body control, and spatial awareness skills. Fundamental athletic skills are introduced, while students develop problem-solving strategies and sportsmanship through an environment of cooperative learning.`},{subtopic:`Modern Languages`,source_file:null,preview:`Our goals in Lower School are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies. Students are exposed to French and Spanish in JK through first grade. In second grade, students choose one target language with the…`,text:`Our goals in Lower School are to expose students to language and culture, instill a love for the language, develop an appreciation for the larger world, and build cultural competencies. Students are exposed to French and Spanish in JK through first grade. In second grade, students choose one target language with the goal of developing a Novice Low proficiency level (based on ACTFL Standards) by the end of fourth grade.

All kindergarten students are exposed to the language and culture of both French and Spanish. They practice basic words, respond to simple commands in both languages, and explore the cultures of people who speak French and Spanish around the world.`},{subtopic:`Design Lab`,source_file:null,preview:`Our kindergarten Design Lab learning experiences are created to develop skill, allow for application of new learning, and set design challenges that work to empower students to creatively communicate and solve problems with empathy. Skills in engineering, coding, robotics, and multi-media design are reinforced in mini…`,text:`Our kindergarten Design Lab learning experiences are created to develop skill, allow for application of new learning, and set design challenges that work to empower students to creatively communicate and solve problems with empathy.

Skills in engineering, coding, robotics, and multi-media design are reinforced in mini projects and authentic design challenges throughout the year.`},{subtopic:`Library`,source_file:null,preview:`Through the library curriculum, we strive to instill the joy and value of reading, provide access to diverse information and ideas, and equip students with the skills and knowledge necessary to access, evaluate, and apply new learning in both personal and academic pursuits. Students receive whole-class, small-group,…`,text:`Through the library curriculum, we strive to instill the joy and value of reading, provide access to diverse information and ideas, and equip students with the skills and knowledge necessary to access, evaluate, and apply new learning in both personal and academic pursuits. Students receive whole-class, small-group, and one-on-one instruction and practice their skills through authentic activities and research.

In kindergarten, students learn about book care, the parts of a book, how to browse books, about authors, illustrators, and characters, the difference between fiction and non-fiction, how to sequence a story, and how to question when reading. Children also explore award-winning books, and learn to listen, share their thinking, and engage in dramatic play.`},{subtopic:`Fine Arts`,source_file:null,preview:`Art Kindergarten artists explore the fundamental elements of art: line, shape, pattern and color. Design concepts of emphasis, contrast, and balance give students visual structures to express ideas. A variety of techniques such as painting, drawing, collage and sculpture enable students to build creative confidence…`,text:`Art

Kindergarten artists explore the fundamental elements of art: line, shape, pattern and color. Design concepts of emphasis, contrast, and balance give students visual structures to express ideas. A variety of techniques such as painting, drawing, collage and sculpture enable students to build creative confidence and experience the joy of hands-on materials.

Drama

Kindergarten students explore using their bodies, voices, emotions, and imaginations through the lens of children’s literature and storytelling. Our Kindergarteners also perform a play we created titled K is for Kindness which features songs about the power of friendship, kindness, and impacting the world for good.

Music

Kindergarten students explore music by practicing steady beat, repeating rhythm patterns, singing solfege patterns, composing rhythms, playing unpitched percussion and Orff instruments, learning music theory, and singing songs.

### first-grade (lower-school/ls-curriculum/first-grade)

# First Grade Experience`},{subtopic:`Curriculum at a Glance`,source_file:null,preview:`►Click to learn more - Language Arts - Mathematics - Social Studies - Science - Physical Education - Modern Languages - Design Lab - Library - Fine Arts`,text:`►Click to learn more

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
Fine Arts`},{subtopic:`Language Arts`,source_file:null,preview:`Our Lower School literacy curriculum focuses on the 5 Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension. Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and pleasure.…`,text:`Our Lower School literacy curriculum focuses on the 5 Pillars of Reading: phonics, phonological awareness, fluency, vocabulary, and comprehension. Instruction is grounded in scientific evidence about how the brain acquires language, and it is designed to inspire a love of reading and writing for learning and pleasure. Instruction is delivered through two programs: IMSE (Institute for Multi-Sensory Education) and Wit & Wisdom. Both programs align with the Science of Reading, have a clear scope and sequence, and explicitly teach literacy skills. IMSE is an Orton-Gillingham approach to teaching phonics. Wit & Wisdom is a knowledge-based language arts curriculum designed to help students build the knowledge and skills they need to be successful readers and writers, and effective communicators. It intentionally builds knowledge across grade levels, integrates writing into the unit modules, and provides rich text sets that align with our LS SEL and DEIB goals. Literacy instruction in first grade is differentiated to provide students with appropriate enrichment and support. Students work in small groups, in partnerships, and one-on-one with teachers.

First Grade Modules:

Module 1: A World of Books

Module 2: Creature Features

Module 3: Powerful Forces

Module 4: Cinderella Stories`},{subtopic:`Mathematics`,source_file:null,preview:`Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers, and creative thinkers. Our teaching is based on the Math in Focus program, and the core focus in the Lower School is on building a deep understanding of number sense, operations, and computation. Our…`,text:`Country Day’s math program is designed to build fluent mathematicians, skilled and perseverant problem solvers, and creative thinkers. Our teaching is based on the Math in Focus program, and the core focus in the Lower School is on building a deep understanding of number sense, operations, and computation. Our students learn not just how to solve rote problems, but how to think mathematically and tackle real-world, rigorous mathematical problems.

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

Telling time to the half hour`},{subtopic:`Social Studies`,source_file:null,preview:`The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural…`,text:`The Lower School social studies program focuses on the study of people in relation to their past, present, and future, their environment, and their society. Our curriculum encourages curiosity and helps students develop an understanding of a rapidly changing world. Students become aware of their personal and cultural identities, and they acquire the skills and knowledge needed to actively participate in their classroom, school, community, and world.

Units of Study

- Unit 1: Family History

- Unit 2: Economic Choices

- Unit 3: Roles in Our Community & Citizenship

- Unit 4: Urban, Suburban, and Rural Geography`},{subtopic:`Science`,source_file:null,preview:`Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds …[truncated] ---`,text:`Lower School science focuses on engaging in investigation and discovery through the scientific method in Country Day’s state-of-the-art science lab. An integrated STEM program brings together engineering and inquisitive minds

…[truncated]

---`},{subtopic:`Curriculum Guide`,source_file:`Charlotte Country Day - Course Offerings - Curriculum Guide.md`,preview:`# Charlotte Country Day School — Course Offerings - Divisions: Lower School JK–4 · Middle School 5–8 · Upper School 9–12 Country Day offers BOTH AP and IB. It was the first independent school in North Carolina to offer the IB Diploma Programme. This is not an AP-only school.`,text:`# Charlotte Country Day School — Course Offerings

- **Divisions:** Lower School JK–4 · Middle School 5–8 · Upper School 9–12

**Country Day offers BOTH AP and IB.** It was the first independent school in North Carolina to
offer the IB Diploma Programme. This is not an AP-only school.`},{subtopic:`Source URLs`,source_file:null,preview:`| Ref | URL | What it covers | | --- | --- | --- | | S1 | https://resources.finalsite.net/images/v1755633363/charlottecds/kt72slq7bqecmr1hswmm/2025-26CourseCatalogueAugustupdate.pdf | 2025-26 Upper School Academic Policies and Course Guide (44 pp., "August update") — authoritative for all Upper School courses, the…`,text:`| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1755633363/charlottecds/kt72slq7bqecmr1hswmm/2025-26CourseCatalogueAugustupdate.pdf | **2025-26 Upper School Academic Policies and Course Guide** (44 pp., "August update") — authoritative for all Upper School courses, the Total Index of Courses by Department (p.8), graduation requirements (p.2), and every course description |
| S2 | https://www.charlottecountryday.org/fs/resource-manager/view/bc87ead7-8dee-4694-ab5b-b04ebf5710de | **Preferred app link** — stable school-hosted permalink that redirects to the current catalogue PDF (survives re-upload; S1's finalsite URL carries a version stamp that will break) |
| S3 | https://www.charlottecountryday.org/cd-education/upper-school/us-curriculum | Upper School Curriculum hub — lists the 9 department pages and links the course catalogue |
| S4 | https://resources.finalsite.net/images/v1726775598/charlottecds/enzt08thdabvh3uxiz0i/2024-2025CCDSSchoolProfile.pdf | 2024-25 School Profile — Honors/AP/IB/Post-AP course table, AP exam results, IB pass rate, grades-served count |
| S5 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum | Middle School Curriculum hub |
| S6 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/fifth-grade | Grade 5 named subjects |
| S7 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/sixth-grade | Grade 6 named subjects incl. two math tracks |
| S8 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/seventh-grade | Grade 7 named subjects incl. three math tracks |
| S9 | https://www.charlottecountryday.org/cd-education/middle-school/ms-curriculum/eighth-grade | Grade 8 named subjects incl. four math tracks |
| S10 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum | Lower School Curriculum hub — 10 subject areas, six grade subpages |
| S11 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/jk | Junior Kindergarten subject areas |
| S12 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/first-grade | Grade 1 subject areas |
| S13 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum/fourth-grade | Grade 4 subject areas |
| S14 | https://www.charlottecountryday.org/cd-education/middle-school | Middle School overview — gender-specific math classes, French/Spanish/Latin, seven-period rotating schedule |

**Superseded — do not cite as current:**
\`https://resources.finalsite.net/images/v1646682559/charlottecds/t45jijpoevbcpbkug9dk/2022-23CourseCatalogue.pdf\`
(the 2022-23 catalogue, still live at a public URL and easily mistaken for current).

**Publication year:** the current guide is **2025-26** (footer reads "August 2025").`},{subtopic:`Metrics`,source_file:null,preview:`| Metric | Value | Source | | --- | --- | --- | | Grade range | JK–12 (13 grades served) | S4 | | Upper School academic departments | 9 (English; Mathematics; Sciences; History & Social Studies; Modern & Classical Languages; Fine Arts; Technology & Computer Science; Non-Departmental; Physical Education) — 7 counting…`,text:`| Metric | Value | Source |
| --- | --- | --- |
| Grade range | JK–12 (13 grades served) | S4 |
| Upper School academic departments | 9 (English; Mathematics; Sciences; History & Social Studies; Modern & Classical Languages; Fine Arts; Technology & Computer Science; Non-Departmental; Physical Education) — 7 counting core academic only | S1 p.8, S3 |
| Upper School course lines catalogued | 119 | S1 p.8 (counted) |
| Distinct AP courses | 23 named AP titles (24 counting Advanced AP Statistics with R) | S1 p.8 |
| Distinct IB courses | 18, plus the IB core (Theory of Knowledge, Extended Essay, CAS) | S1 p.8 |
| Honors-designated course lines | 16 | S1 p.8 |
| Credits required to graduate | 21 academic credits | S1 p.2 |
| IB enrollment | ~20 students/year; 91% five-year average diploma pass rate | S4 |
| AP exam volume | 223 students wrote 532 AP exams (2024); 89% scored 3+, 70% scored 4–5 | S4 |
| Advanced-course participation | 82% of Upper School students take ≥1 Honors/AP/IB course before graduating | S4 |
| IB distinction | First independent school in North Carolina to offer the IB Diploma Programme | S4 |

**Graduation requirements** (S1 p.2): English 4.0 · Mathematics 4.0 · Sciences 3.0 (must include
Biology I plus 2.0 more lab credits) · History & Social Studies 3.0 (must include US History) ·
Modern & Classical Languages 2.0 (two consecutive years in the same language) · Fine Arts 1.5 ·
plus 8 co-curriculars at 0.25 each. A research paper is required in each of grades 9–11.`},{subtopic:`Upper School (Grades 9–12) — source S1`,source_file:null,preview:`### English Language & Literature - English 9: Foundations in English — Gr 9 · Year — First of a two-year foundations sequence, introducing advanced literary study through argument-building and examination of poetry, short stories, and longer texts. - English 10: Foundations in English II: The Individual in Society —…`,text:`### English Language & Literature

- **English 9: Foundations in English** — *Gr 9 · Year* — First of a two-year foundations sequence, introducing advanced literary study through argument-building and examination of poetry, short stories, and longer texts.
- **English 10: Foundations in English II: The Individual in Society** — *Gr 10 · Year* — Studies classic and modern texts through how literature reflects the desire to understand oneself in relation to the world.
- **English 11: American Literature** — *Gr 11 · Year* — A selected survey covering the Enlightenment, Romanticism, and Modernism, culminating in an autobiographical portfolio.
- **AP English 11: Language & Composition** — *AP* — College-level study of rhetoric and composition, with students expected to sit the AP exam.
- **AP English 12: Literature & Composition** — *AP* — College-level literary analysis across genres and periods, with students expected to sit the AP exam.
- **IB English 11 (HL)** — *IB HL* — Required first year for IB juniors, expanding experience with a broad range of genres, periods, and styles.
- **IB English 12 (HL)** — *IB HL* — Second year of the two-year IB Language & Literature commitment.
- **English 12** — *Gr 12 · Year* — Senior English for students continuing from English 11 outside the AP and IB tracks.
- **Creative Writing** — *Semester* — A semester elective in original composition.
- **Intermediate ESL / Advanced ESL / ESL American History / ESL World History** — *Year* — English-language-support courses that may substitute for English or History credit.

### Mathematics

- **Algebra I** — *Year* — The foundational algebra course.
- **Geometry** — *Year* — Standard-level geometry.
- **Honors Geometry** — *Honors* — Accelerated geometry; requires 90 in Algebra I plus teacher recommendation.
- **Algebra II** — *Year* — The second-year algebra course.
- **Honors Algebra II** — *Honors* — Accelerated Algebra II; requires 90 in Geometry or 83 in Honors Geometry.
- **Honors Algebra II/Precalculus** — *Honors · Gr 10 only* — A compressed two-subject course open only to sophomores who completed Honors Geometry in ninth grade.
- **Algebra III/Trigonometry** — *Year* — A bridge course extending algebra into trigonometry.
- **Dynamic Math** — *Year* — An alternative mathematics pathway.
- **Pre-calculus** — *Year* — Standard precalculus.
- **Honors Pre-calculus** — *Honors* — Accelerated precalculus; requires 90 in Algebra II or 83 in Honors Algebra II.
- **Introduction to Calculus & Statistics** — *Year* — A survey of both calculus and statistics concepts.
- **AP Statistics** — *AP* — College-level statistics; qualifying students should choose either AP Calculus AB or AP Statistics, not both.
- **Advanced AP Statistics with R and R Studio** — *Post-AP* — Post-BC-Calculus statistics using the R language; requires 83 in BC Calculus or concurrent enrollment.
- **AP Calculus AB** — *AP* — First-semester college calculus.
- **AP Calculus BC** — *AP* — The full-year college calculus sequence; requires 87 in Honors Precalculus or Honors Algebra II/Precalculus.
- **IB Applications SL** — *IB SL* — IB Mathematics: Applications and Interpretation at standard level.
- **IB Analysis SL** — *IB SL* — IB Mathematics: Analysis and Approaches at standard level; requires 83 in Honors Precalculus.
- **Calculus III/IB Analysis HL** — *Post-AP · IB HL* — Multivariable calculus doubling as IB Analysis Higher Level; requires 83 in BC Calculus.

### Sciences

- **Inquiries in Biological and Physical Science** — *Year* — An introductory integrated science course.
- **Biology I** — *Required · Gr 9-10* — Required of all students in ninth or tenth grade; the core high-school biology requirement.
- **AP Biology** — *AP* — College-level biology; prerequisites Biology I and Chemistry I.
- **IB Biology SL** — *IB SL* — IB biology at standard level.
- **IB Biology HL** — *IB HL* — IB biology at higher level.
- **AP Environmental Science** — *AP* — College-level environmental science covering eutrophication, acid rain, ozone depletion, and climate change, with mandatory Charlotte and Charleston field trips.
- **Environmental Issues** — *Semester · Gr 10-12* — A survey of contemporary environmental issues drawing on the humanities, social sciences, and natural sciences, culminating in team perspective debates.
- **Marine Biology** — *Semester · Gr 10-12* — Marine biology concepts including trophic dynamics and marine ecosystems, with an expected overnight Charleston data-collection trip.
- **Human Anatomy: External Structural Systems** — *Semester · Gr 10-12* — The body's major organ systems with in-depth study of the skeletal and muscular systems; dissection is mandatory.
- **Human Anatomy: Internal Structural Systems** — *Semester · Gr 10-12* — Deeper study of the nervous, blood, cardiovascular, respiratory, and digestive systems; dissection is mandatory.
- **Chemistry I** — *Year* — Develops conceptual understanding of chemistry; requires Biology I and concurrent Algebra II or higher.
- **Honors Chemistry I** — *Honors* — Accelerated chemistry; requires 87 in Biology and 87 in a math course.
- **AP Chemistry** — *AP* — College-level chemistry; requires previous or concurrent Precalculus.
- **IB Chemistry SL** — *IB SL* — IB chemistry at standard level.
- **IB Chemistry HL** — *IB HL* — IB chemistry at higher level.
- **Physics I** — *Year* — Introductory physics.
- **Honors Physics I** — *Honors* — Accelerated physics; requires previous or concurrent Precalculus.
- **AP Physics C: Mechanics, E&M** — *AP* — Calculus-based college physics in mechanics and electricity and magnetism; requires previous or concurrent AP or IB Calculus.
- **Astronomy: Solar Systems** — *Semester · Gr 11-12* — Constellations, celestial navigation, telescope design, electromagnetic radiation, and solar-system bodies, assessed by a major project.
- **Forensic Science: Biochemical Applications** — *Semester* — Biological and biochemical methods of criminal investigation including forensic pathology, entomology, anthropology, and DNA profiling.
- **Forensic Science: Physical Applications** — *Semester* — Physical-science forensics including glass and matter analysis, toxicology, bloodstain pattern analysis, fire investigation, and firearms identification.
- **Organic Chemistry** — *Post-AP · Semester* — Replicates a semester of undergraduate organic chemistry with a full synthetic lab component; requires AP or IB Chemistry.
- **Honors Principles of Engineering** — *Honors · Semester · Gr 11-12* — Structural mechanics, material science, and digital electronics through projects from digital keyboards to a wirelessly controlled robotic hand.
- **Physical Computational Biochemistry** — *Research · Semester* — Primary research on protein folding and 3D-printed dynamic models, working with professors nationally with potential to publish; credit/no-credit only.

### History & Social Studies

- **9th Grade History** — *Required · Gr 9* — Introduces basic historical thinking through in-depth study of several crucial themes.
- **Modern World History** — *Required · Gr 10* — The second required history course, typically taken in tenth grade.
- **Honors Modern World History** — *Honors* — Accelerated Modern World History; requires 87 in 9th Grade History.
- **IB World History SL** — *IB SL* — IB history at standard level.
- **United States History** — *Required · Gr 11* — Required of all graduates, usually completed junior year.
- **AP United States History** — *AP* — College-level US History satisfying the graduation requirement; requires 87 in Modern World History.
- **IB History of the Americas HL** — *IB HL* — IB higher-level history through which IB students typically fulfill the US History requirement senior year.
- **AP Psychology** — *AP · Gr 11-12* — College-level psychology, with preference given to seniors.
- **IB Psychology SL** — *IB SL* — IB psychology at standard level.
- **AP Human Geography** — *AP · Gr 10-12* — College-level human geography.
- **AP European History** — *AP · Gr 11-12* — College-level European history, with preference given to seniors.
- **AP US Government and Politics** — *AP · Gr 11-12* — College-level American government and politics, with preference given to seniors.
- **Ancient Empires** — *Semester · Gr 11-12* — The origins, evolution, and varieties of ancient civilizations from c. 3000 BCE to c. 1000 CE using primary sources and archaeological findings.
- **Adolescent Psychology and Behavior** — *Semester · Gr 11-12* — Adolescent psychosocial development and the mental-health challenges adolescents face, including protective factors and intervention strategies.
- **African American History: From Slavery to Civil Rights** — *Semester · Gr 11-12* — Major themes from slavery in Africa and the Americas through abolition, the Harlem Renaissance, and the Civil Rights Movement.
- **Education for Social Justice** — *Semester · Gr 11-12* — Critical analysis of several forms of social oppression and alternative ways of understanding social relations.
- **IB Digital Society** — *IB · Gr 11-12* — Open to IB and non-IB students; requires previous or concurrent Precalculus.

### Modern & Classical Languages

Chinese is offered only at Honors level. The guide cautions that "based on enrollment numbers,
courses may function as mixed-level classes."

- **Honors Chinese I–V** — *Honors* — A five-level Honors-only Mandarin sequence; entry requires 87 in a current French, Spanish, or Latin class.
- **Chinese II** — *Year* — Non-honors second-level Mandarin.
- **IB Chinese** — *IB* — The IB Mandarin course.
- **French I–V** — *Year* — A five-level French sequence building proficiency across all four skills.
- **Honors French II, III, IV** — *Honors* — Accelerated French; requires 93 in the current language class or 85 in current Honors.
- **AP French Language & Culture** — *AP* — College-level French language and culture; requires 87 in Level 4 Honors.
- **IB French HL** — *IB HL* — IB French at higher level.
- **Spanish I–V** — *Year* — A five-level Spanish sequence.
- **Honors Spanish II, III, IV** — *Honors* — Accelerated Spanish.
- **AP Spanish Language & Culture** — *AP* — College-level Spanish language and culture.
- **IB Spanish HL** — *IB HL* — IB Spanish at higher level.
- **Latin I–V** — *Year* — A five-level Latin sequence.
- **Honors Latin II, III, IV** — *Honors* — Accelerated Latin.
- **AP Latin** — *AP* — College-level Latin.
- **IB Latin** — *IB* — The IB Latin course.

### Fine Arts

- **Concert Choir** — *Year* — A non-audition choral ensemble.
- **Honors Concert Choir** — *Honors* — Honors-level concert choir.
- **Honors Chamber Choir** — *Honors · Gr 10-12 · Audition* — A select choral ensemble admitted by audition.
- **Symphonic Band** — *Year* — The concert wind band.
- **Honors Symphonic Band** — *Honors · Audition* — Honors wind band admitted by audition.
- **Orchestra** — *Year* — The string and full orchestra ensemble.
- **Honors Orchestra** — *Honors · Audition* — Honors orchestra admitted by audition.
- **Introduction to Piano** — *Semester* — Beginning keyboard instruction.
- **Supersonic: Percussion Ensemble** — *Semester* — A percussion performance ensemble.
- **AP Music Theory** — *AP · Gr 10-12* — Develops the ability to recognize and describe melody, harmony, texture, rhythm, form, history, and style; requires an entrance proficiency exam.
- **Acting/Directing I** — *Semester* — Introduces the tools of acting through disciplined work on voice, speech, movement, and the actor's use of self.
- **Acting/Directing II** — *Semester · Gr 10-12* — Advanced acting and directing across Stanislavsky, Strasberg, Adler, and Meisner approaches in workshop format.
- **Theater Workshop** — *Semester · Gr 10-12* — A capstone project course for advanced students in acting, directing, or improv.
- **Improvisation I** — *Semester* — In-depth study of short- and long-form improvisation plus sketch writing.
- **Improvisation II** — *Semester* — Advanced improvisation building on Improvisation I.
- **IB Theatre Arts (SL, HL)** — *IB* — IB theatre at standard or higher level.
- **2-D Art I–IV** — *Semester* — A four-level sequence in two-dimensional art and drawing.
- **Design/Photography I–IV** — *Semester* — A four-level sequence in digital design and photography.
- **Sculpture I–IV** — *Semester* — A four-level sequence in three-dimensional and sculptural work.
- **Architectural Design Studio** — *Semester* — A studio course in architectural design.
- **Special Projects in Visual Arts** — *Semester* — Portfolio-based independent studio work following Level IV; requires portfolio evaluation.
- **AP Studio: 2D Art** — *AP · Gr 11-12* — A portfolio course emphasizing art-making as informed and critical decision-making.
- **AP Studio: Design/Photography** — *AP · Gr 11-12* — An AP portfolio course in digital and photographic arts.
- **AP Studio: Sculpture** — *AP · Gr 11-12* — An AP portfolio course addressing sculptural issues and purposeful decision-making.
- **AP Art History** — *AP · Gr 11-12* — Significant works of art and architecture in European and non-European traditions from cave paintings to the twenty-first century.
- **IB Art I & II (SL, HL)** — *IB* — A two-year IB visual arts course; portfolios due February of sophomore year for admittance.
- **Yearbook** — *Year* — Students produce *The Postscript*, learning page layout, photo and copy editing, and writing.
- **Yearbook Editor, Honors** — *Honors* — A leadership option for returning yearbook staff serving as team leaders and editors.
- **IB Music I & II (SL)** — *IB SL* — Listed in the catalogue but **not offered in 2025-26**.

### Technology & Computer Science

- **Exploring Computer Science** — *Semester · Gr 9-12* — The breadth of computer science including Python programming, web page design, data analysis, phone apps, and ethical issues in computing.
- **AP Computer Science A** — *AP · Gr 10-12* — Follows the College Board syllabus in Java, emphasizing problem-solving, object-oriented methodologies, algorithms, and container classes.
- **Advanced Topics in Computer Science** — *Honors · Semester · Gr 11-12* — Data structures in Java, then student-designed projects presented before the academic council; requires AP Computer Science and an approved proposal.

### Non-Departmental

- **9th Grade Seminar** — *Required · Gr 9* — A required transition course covering goal setting, time management, decision-making, media literacy, leadership, wellness, and identity development.
- **IB Theory of Knowledge** — *IB core · Year* — A junior-year IB core course analyzing personal and shared knowledge using the knowledge framework.
- **Public Speaking and Professional Communication** — *Semester* — Builds confidence before an audience and proficiency organizing content for varied speech categories, interviews, and active listening.
- **Podcasting: Amplify Your Voice** — *Semester* — Podcast conceptualization, scripting, and audio production; **not offered in 2025-26**.

The IB core also requires the **Extended Essay** (a major research paper completed junior year) and
**Creativity, Activity & Service (CAS)**.

### Physical Education

- **Strength Training** — *Semester* — Weightlifting technique, functional movement, nutrition, injury prevention, and goal setting; satisfies one of two annual co-curricular credits.
- **Ultimate Frisbee** — *After-school* — Practices three days a week with winter-term scrimmages; credit based on attendance.`},{subtopic:`Middle School (Grades 5–8) — sources S5–S9, S14`,source_file:null,preview:`Country Day publishes named courses only for Middle School mathematics; other disciplines are published as grade-level subjects. Math is tracked aggressively, and the school notes Middle School students "attend gender-specific math classes." Grades 5–8 run a seven-period rotating schedule with daily PE. ###…`,text:`Country Day publishes **named courses only for Middle School mathematics**; other disciplines are
published as grade-level subjects. Math is tracked aggressively, and the school notes Middle School
students "attend gender-specific math classes." Grades 5–8 run a seven-period rotating schedule
with daily PE.

### Mathematics (the tracked, named courses)

- **Fifth Grade Math** — *Gr 5* — Addition, subtraction, multiplication, and division of whole numbers, decimals, and fractions, concluding with basic geometry.
- **Sixth Grade Math** — *Gr 6* — The number line, values, operations with decimals and fractions, ratio and percent, and algebraic expressions and equations.
- **Sixth Grade Pre-Algebra** — *Gr 6 · Accelerated* — Number sense, fractions, factors, exponents, simplifying expressions, and solving and graphing linear equations.
- **Pre-Algebra** — *Gr 7* — Number sense, fractions, factors, exponents, linear equations, ratios, proportions, percent, probability, and statistics.
- **Honors Pre-Algebra** — *Gr 7 · Honors* — The same topics as Pre-Algebra covered in greater depth and at a faster pace.
- **Honors Algebra 1** — *Gr 7-8 · Honors* — Algebra foundations, linear functions and systems, exponents, polynomials, quadratics, radicals, rational expressions, and an introduction to geometry.
- **Algebra 8A** — *Gr 8* — Foundational expressions, equations, and linear functions for students needing additional preparation.
- **Algebra 1** — *Gr 8* — Full high-school Algebra I covering linear functions and systems, exponents, polynomials, quadratics, radicals, and introductory geometry.
- **Geometry** — *Gr 8 · HS credit* — Placement for students who completed Honors Algebra I, studying deductive reasoning, proofs, trigonometry, and coordinate geometry.

### English / Language Arts & Social Studies

- **Language Arts & Social Studies (integrated)** — *Gr 5* — An integrated program featuring cross-curricular reading to enhance understanding of the world and writing to communicate key ideas and opinions.
- **Language Arts & Social Studies (integrated)** — *Gr 6* — Students journey through the past learning about the creation and development of communities in global civilizations.
- **English** — *Gr 7* — Further develops basic communication skills through the study of literature, reading strategies, and process writing.
- **Social Studies** — *Gr 7* — Builds understanding of global geography and cultures while investigating the major turning points shaping the world through inquiry-based learning.
- **English** — *Gr 8* — Uses both classic and contemporary literature to help foster a love of reading and writing.
- **Social Studies** — *Gr 8* — Examines U.S. history from the late nineteenth century through the twentieth, from Reconstruction through Watergate.

### Science & Engineering

- **Science** — *Gr 5* — Students become working scientists, making authentic connections to the world and constructing solutions using the engineering design process.
- **Science: Forces of Change** — *Gr 6* — Examines topics through the lens of Forces of Change while using the scientific method and the engineering design process.
- **Science** — *Gr 7* — Inquiry-based study of the human body covering energy, body systems, cells, genetics, natural selection, and energy transformations.
- **Science** — *Gr 8* — An introduction to the multidisciplinary field of environmental science, using case studies to evaluate environmental issues.
- **Engineering** — *Gr 5-8* — Scaffolded across the Middle School with design-thinking and prototyping work.

### Modern & Classical Languages

- **Spanish** — *Gr 5-8* — A proficiency-oriented course practicing reading, writing, listening, and speaking in interpretive, interpersonal, and presentational modes.
- **French** — *Gr 5-8* — Develops language competency and cultural awareness through thematic units using authentic websites, videos, print, and maps.
- **Latin** — *Gr 5-8* — Offered as one of the Middle School language options alongside French and Spanish.

### Fine Arts

- **Visual Art** — *Gr 5-8* — Foundational visual-arts instruction expanding individual skill sets across the Middle School years.
- **Band** — *Gr 5-8* — An instrumental ensemble in wind and percussion performance.
- **Choir** — *Gr 5-8* — A vocal ensemble developing singing skills and musical understanding.
- **Orchestra** — *Gr 5-8* — Instrumental ensemble training for string players.
- **Drama** — *Gr 5-8* — Performing-arts instruction developing creative thinking and self-expression.
- **General Music** — *Gr 5* — Musical fundamentals and concepts for all fifth-grade students.

Grades 7 and 8 concentrate in one chosen fine-arts discipline (Band, Choir, Drama, Orchestra, or
Visual Art).

### Physical Education, Health & Advisory

- **Physical Education** — *Gr 5-8 · Daily* — A daily class focused on individual fitness improvement, cardiovascular endurance, physical strength, and exposure to various sports.
- **Health** — *Gr 5* — Instruction on human growth and development including reproductive systems and childbirth.
- **Health** — *Gr 6* — Focuses on nutrition, emphasizing "Food is Fuel" and how bodies use energy.
- **Health** — *Gr 7* — Identity, stress management, coping skills, mental well-being, and decision making, including social-media impacts.
- **Health** — *Gr 8* — Human growth and development, decision making, and reproductive systems.
- **Counseling** — *Gr 5* — Life-skills development addressing values, friendships, cooperation, decision-making, and social skills.
- **Counseling: Too Good For Drugs** — *Gr 6* — A curriculum addressing decision-making and communication skills.
- **Information Literacy** — *Gr 5-8* — Library-based research and digital-citizenship skills.
- **Advisory** — *Gr 5-8* — Each student is assigned a faculty advisor providing academic and personal guidance and serving as a school-family communication link.`},{subtopic:`Lower School (JK–Grade 4) — sources S10–S13`,source_file:null,preview:`Documented gap: the Lower School publishes subject areas only — no named individual courses. Confirmed across the curriculum hub and all grade-level pages. The ten subject areas below are the correct grain for this division. Each classroom has two full-time instructional teachers. - Units of Inquiry — JK —…`,text:`**Documented gap: the Lower School publishes subject areas only — no named individual courses.**
Confirmed across the curriculum hub and all grade-level pages. The ten subject areas below are the
correct grain for this division. Each classroom has two full-time instructional teachers.

- **Units of Inquiry** — *JK* — Intentionally weave together literacy, math, science, and social studies instruction.
- **Language Arts / Literacy** — *JK-4* — Focuses on the Five Pillars of Reading — phonics, phonological awareness, fluency, vocabulary, and comprehension — with reading and writing embedded throughout the day.
- **Mathematics** — *JK-4* — Develops number sense, spatial awareness, and math language through active exploration and hands-on games, building toward real-world rigorous problem solving.
- **Science** — *JK-4* — Hands-on investigation via the scientific method across physical, life, and earth sciences — from seasonal change in JK to water quality and the solar system by Grade 4.
- **Social Studies** — *JK-4* — Examines people in relation to their past, present, and future, their environment, and their society.
- **Modern Languages (French & Spanish)** — *JK-4* — All students are exposed to both French and Spanish, progressing from the sound of each language to the four language skills plus basic writing by Grade 4.
- **Fine Arts (Art, Music, Drama)** — *JK-4 · Weekly* — Weekly immersion in art, music, and drama to instill a love of the arts and build design-thinking skills.
- **Physical Education** — *JK-4 · Daily* — A daily opportunity to move, play, and learn, developing gross motor, body control, and spatial awareness skills.
- **Design Lab** — *JK-4* — Engineering, coding, robotics, 3D printing, and multi-media design used to solve design problems collaboratively.
- **Library / Information Literacy** — *JK-4* — Supports a growing love of reading and builds toward conducting research using the full research cycle, applied in the Grade 4 Exhibition project.`},{subtopic:`Gaps — what Charlotte Country Day does not publish`,source_file:null,preview:`1. Lower School (JK–4) publishes no named courses. Only the ten subject areas above, described narratively per grade. There is no Lower School course catalogue or PDF. This is a publication choice, not a research failure. 2. Middle School publishes named courses only for mathematics. The tracked math levels are…`,text:`1. **Lower School (JK–4) publishes no named courses.** Only the ten subject areas above, described
 narratively per grade. There is no Lower School course catalogue or PDF. This is a publication
 choice, not a research failure.
2. **Middle School publishes named courses only for mathematics.** The tracked math levels are
 genuinely named; all other Middle School disciplines are published as grade-level subjects.
 **There is no Middle School course catalogue or program-of-studies PDF** — only the four HTML
 grade pages.
3. **Middle School Latin has no dedicated page.** Latin is named as an option on the division
 overview (S14) but the Grade 5–8 curriculum pages describe only Spanish and French, so no Latin
 level structure or description is published.
4. **No school-stated total course count.** The 119 figure is a line-by-line count of the school's
 own Total Index of Courses by Department (S1 p.8). Because index lines bundle levels ("French I,
 II, III, IV, V" is one line), the distinct course count exceeds 119 — do not present 119 as a
 school-stated number.
5. **Internal inconsistency in the school's own guide.** *Education for Social Justice* and *IB
 Digital Society* have full descriptions and appear in the qualification-requirements table but
 are missing from the p.8 index. Conversely *IB Music I & II (SL)* and *Podcasting: Amplify Your
 Voice* are indexed but flagged "not offered 2025-26."
6. **Section counts and per-course enrollment are not published.** No data on how many sections
 of each course actually run, or class sizes by course. The guide warns that language courses
 "may function as mixed-level classes" depending on enrollment.
7. **No published department-chair or faculty-per-department roster** in the curriculum materials.
8. **The 2022-23 catalogue PDF is still live** at a public URL and is easily mistaken for current —
 cite only S1/S2.
9. **The School Profile is 2024-25**, one year behind the 2025-26 catalogue; its AP results are from
 2024 exams. No 2025-26 profile was found.

---`}],i={school_slug:e,topic_slug:t,section_count:36,sections:r};export{i as default,e as school_slug,n as section_count,r as sections,t as topic_slug};