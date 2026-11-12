# Providence Day School — Course Offerings
> Distilled from 2 source document(s) in `source-material/course-offerings/providence-day/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-11.
**Documents:** Curriculum Guide Full Descriptions 2025-2026, Curriculum Guide


---

## Curriculum Guide Full Descriptions 2025-2026

*Source file: `Providence Day - Course Offerings - Curriculum Guide Full Descriptions 2025-2026.md`*

# Providence Day School — Course Offerings — Curriculum Guide Full Descriptions 2025-2026

**Provenance**

- **Compiled by:** Claude Code, plan `coursecensus` Batch 1, at Derrick's request
- **Date fetched:** 2026-11-11
- **Why:** the earlier record (`Providence Day - Course Offerings - Curriculum Guide.md`) holds
 one-line condensations of each course, the same kind of text as the app, so it cannot show
 what the catalog itself says. This file holds the school's own text, for the
 description-to-catalog census. (The plan expected the record to hold fuller catalog prose; it
 does not, so Providence Day was re-sourced too.)
- **Method:** the 2025-2026 Upper School Course of Study (72 pp.) and Middle School Course of
 Study (28 pp.) PDFs were re-downloaded from the URLs the record cites and their text extracted
 with `pdfplumber`, page by page. U+200B read as a space, runs of spaces collapsed, no other
 change. The Lower School and Lower School Global Education pages were fetched as HTML and
 converted to text (navigation, staff bios and footer dropped); the two Global Education
 click-to-open posts ("Connect", "Explore") were fetched from the site's popup endpoint.
 The Lower School page's 11 Special Area Classes tiles are click-to-open posts too
 (element 27256, posts 3747–3749, 3851–3858); each was fetched and holds **only its title**,
 no description, so the titles below are all the school publishes for those classes.
 - Upper School PDF SHA-256: `41e60800a257973430a536a6cc3c272c0562e0286218358b5ed844323e241111`
 - Middle School PDF SHA-256: `5141cb01322e2eeebee03830e55a6b305874e512f02a2ac43c6be196c5c16623`
- **Catalog year:** the app was built from these same 2025-26 editions (record, 2026-07-26). No
 newer edition was looked for or used.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1759758182/provday/wekh9bxtsqah5givkjk2/2025-2026UpperSchoolCourseofStudy.pdf | 2025-2026 Upper School Course of Study, every Upper School course entry |
| S2 | https://resources.finalsite.net/images/v1759322022/provday/z3tij4sfwwhthez2vijd/2025-2026MiddleSchoolCourseofStudy.pdf | 2025-2026 Middle School Course of Study, every Grade 6–8 course entry |
| S3 | https://www.providenceday.org/lower-school | Lower School curriculum areas and Special Area Classes |
| S4 | https://www.providenceday.org/lower-school/global-education | Lower School world-language sequence and global education |
| S4-post | https://www.providenceday.org/fs/elements/34691?is_popup=true&post_id=<4490, 4491>&show_post=true | The "Connect" and "Explore" posts on S4 |

## Index — every app course, in app order

Upper and Middle School rows point to the PDF page (as `===== PAGE N =====` below) where a
heading-like line holds the course title; "check by hand" means the title search found no page.

| App path | Division | Department | Title | Where |
| --- | --- | --- | --- | --- |
| `divisions[0].departments[0].courses[0]` | Lower School Courses | Core Curriculum | Math | Lower School pages (S3, S4) |
| `divisions[0].departments[0].courses[1]` | Lower School Courses | Core Curriculum | Language Arts | Lower School pages (S3, S4) |
| `divisions[0].departments[0].courses[2]` | Lower School Courses | Core Curriculum | Science | Lower School pages (S3, S4) |
| `divisions[0].departments[0].courses[3]` | Lower School Courses | Core Curriculum | Social Studies | Lower School pages (S3, S4) |
| `divisions[0].departments[1].courses[0]` | Lower School Courses | World Language | French, Spanish & Mandarin Exposure | Lower School pages (S3, S4) |
| `divisions[0].departments[1].courses[1]` | Lower School Courses | World Language | Selected Language of Study | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[0]` | Lower School Courses | Special Area Classes | Art | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[1]` | Lower School Courses | Special Area Classes | Music | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[2]` | Lower School Courses | Special Area Classes | Band, Orchestra & Chorus | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[3]` | Lower School Courses | Special Area Classes | Theatre | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[4]` | Lower School Courses | Special Area Classes | Physical Education | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[5]` | Lower School Courses | Special Area Classes | Science Lab | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[6]` | Lower School Courses | Special Area Classes | Tech Tank | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[7]` | Lower School Courses | Special Area Classes | IDEAS | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[8]` | Lower School Courses | Special Area Classes | Learning Loft | Lower School pages (S3, S4) |
| `divisions[0].departments[2].courses[9]` | Lower School Courses | Special Area Classes | Library | Lower School pages (S3, S4) |
| `divisions[1].departments[0].courses[0]` | Middle School Courses | English | English 6 | S2 p. 2, 10, 15 |
| `divisions[1].departments[0].courses[1]` | Middle School Courses | English | English 7 | S2 p. 4 |
| `divisions[1].departments[0].courses[2]` | Middle School Courses | English | English 8 | S2 p. 7 |
| `divisions[1].departments[0].courses[3]` | Middle School Courses | English | Creative Writing 6 | S2 p. 2 |
| `divisions[1].departments[0].courses[4]` | Middle School Courses | English | World Myths and Legends | S2 p. 2, 5, 12, 15 |
| `divisions[1].departments[0].courses[5]` | Middle School Courses | English | Lights, Camera, Action: Literature through Movies | S2 p. 16 |
| `divisions[1].departments[1].courses[0]` | Middle School Courses | Mathematics | Mathematics 6 | S2 p. 2, 11 |
| `divisions[1].departments[1].courses[1]` | Middle School Courses | Mathematics | Math 7 | S2 p. 4 |
| `divisions[1].departments[1].courses[2]` | Middle School Courses | Mathematics | Pre-Algebra 7 – Accelerated | S2 p. 4, 7 |
| `divisions[1].departments[1].courses[3]` | Middle School Courses | Mathematics | Advanced Pre-Algebra | S2 p. 4, 7, 16, 17 |
| `divisions[1].departments[1].courses[4]` | Middle School Courses | Mathematics | Pre-Algebra 8 | S2 p. 7 |
| `divisions[1].departments[1].courses[5]` | Middle School Courses | Mathematics | Algebra I-8 Accelerated | S2 p. 7, 16 |
| `divisions[1].departments[1].courses[6]` | Middle School Courses | Mathematics | Advanced Algebra I | S2 p. 7, 17 |
| `divisions[1].departments[2].courses[0]` | Middle School Courses | Science | Science 6 | S2 p. 2, 11 |
| `divisions[1].departments[2].courses[1]` | Middle School Courses | Science | Science 7 | S2 p. 4, 17 |
| `divisions[1].departments[2].courses[2]` | Middle School Courses | Science | Science 8 | S2 p. 7, 17 |
| `divisions[1].departments[2].courses[3]` | Middle School Courses | Science | The Amazing Human Body | S2 p. 2, 5, 13, 17 |
| `divisions[1].departments[3].courses[0]` | Middle School Courses | History | History 6 | S2 p. 2, 11 |
| `divisions[1].departments[3].courses[1]` | Middle School Courses | History | U.S. History 7 | S2 p. 4 |
| `divisions[1].departments[3].courses[2]` | Middle School Courses | History | Global Perspectives 8 | S2 p. 7 |
| `divisions[1].departments[3].courses[3]` | Middle School Courses | History | History in Action: Collaborative Research | S2 p. 18 |
| `divisions[1].departments[3].courses[4]` | Middle School Courses | History | Contemporary Global Issues | S2 p. 5, 8, 18 |
| `divisions[1].departments[4].courses[0]` | Middle School Courses | IDEAS@PDS | Computer Applications | S2 p. 3, 6, 9, 14 |
| `divisions[1].departments[4].courses[1]` | Middle School Courses | IDEAS@PDS | Computer Programming | S2 p. 3, 6, 9, 14 |
| `divisions[1].departments[4].courses[2]` | Middle School Courses | IDEAS@PDS | Robotics | S2 p. 3, 6, 9, 14 |
| `divisions[1].departments[4].courses[3]` | Middle School Courses | IDEAS@PDS | Web Design | S2 p. 3, 6, 9, 14 |
| `divisions[1].departments[4].courses[4]` | Middle School Courses | IDEAS@PDS | Introduction to Engineering 6 | S2 p. 14 |
| `divisions[1].departments[4].courses[5]` | Middle School Courses | IDEAS@PDS | SPARK: Environmental Problem Solving by Design | S2 p. 14, 22 |
| `divisions[1].departments[4].courses[6]` | Middle School Courses | IDEAS@PDS | Broadcast Media | S2 p. 6, 9, 22 |
| `divisions[1].departments[4].courses[7]` | Middle School Courses | IDEAS@PDS | Social Entrepreneurship: Incubation & Acceleration | S2 p. 22 |
| `divisions[1].departments[4].courses[8]` | Middle School Courses | IDEAS@PDS | Engineering the Future | S2 p. 6, 9, 23 |
| `divisions[1].departments[4].courses[9]` | Middle School Courses | IDEAS@PDS | Introduction to Personal Finance | S2 p. 23 |
| `divisions[1].departments[5].courses[0]` | Middle School Courses | World Language | Exploring Latin through Mythology | S2 p. 18 |
| `divisions[1].departments[5].courses[1]` | Middle School Courses | World Language | Latin 1 | S2 p. 7, 10, 19, 27 |
| `divisions[1].departments[5].courses[2]` | Middle School Courses | World Language | Latin 2 | S2 p. 10, 19, 27 |
| `divisions[1].departments[5].courses[3]` | Middle School Courses | World Language | Spanish 1–4 | S2, check by hand |
| `divisions[1].departments[5].courses[4]` | Middle School Courses | World Language | French 1–4 | S2, check by hand |
| `divisions[1].departments[5].courses[5]` | Middle School Courses | World Language | Mandarin Chinese 1–4 | S2, check by hand |
| `divisions[1].departments[5].courses[6]` | Middle School Courses | World Language | German 1–3 | S2, check by hand |
| `divisions[1].departments[6].courses[0]` | Middle School Courses | Fine Arts & PE | Band 6 / Band 7–8 | S2, check by hand |
| `divisions[1].departments[6].courses[1]` | Middle School Courses | Fine Arts & PE | Chorus 6 / Chorus 7–8 | S2, check by hand |
| `divisions[1].departments[6].courses[2]` | Middle School Courses | Fine Arts & PE | Orchestra 6 / Orchestra 7–8 | S2, check by hand |
| `divisions[1].departments[6].courses[3]` | Middle School Courses | Fine Arts & PE | Art 6 & Art Foundations | S2, check by hand |
| `divisions[1].departments[6].courses[4]` | Middle School Courses | Fine Arts & PE | Introduction to Art and Design | S2 p. 6, 9, 25 |
| `divisions[1].departments[6].courses[5]` | Middle School Courses | Fine Arts & PE | Introduction to Painting | S2 p. 6, 9, 25 |
| `divisions[1].departments[6].courses[6]` | Middle School Courses | Fine Arts & PE | Introduction to Printmaking | S2 p. 6, 9, 25 |
| `divisions[1].departments[6].courses[7]` | Middle School Courses | Fine Arts & PE | Introduction to 3D Design | S2 p. 6, 9, 25 |
| `divisions[1].departments[6].courses[8]` | Middle School Courses | Fine Arts & PE | Theatre Arts 6 | S2, check by hand |
| `divisions[1].departments[6].courses[9]` | Middle School Courses | Fine Arts & PE | Acting 1, 2 & 3 | S2, check by hand |
| `divisions[1].departments[6].courses[10]` | Middle School Courses | Fine Arts & PE | Middle School Stagecraft | S2 p. 5, 8 |
| `divisions[1].departments[6].courses[11]` | Middle School Courses | Fine Arts & PE | Communication Arts | S2 p. 3, 5, 8, 12 |
| `divisions[1].departments[6].courses[12]` | Middle School Courses | Fine Arts & PE | Physical Education/Health 6, 7 & 8 | S2, check by hand |
| `divisions[1].departments[6].courses[13]` | Middle School Courses | Fine Arts & PE | Movement & Yoga | S2 p. 9, 21 |
| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | English I | S1 p. 8, 19 |
| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | English II | S1 p. 8, 19 |
| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | Writing Seminar | S1 p. 8, 19 |
| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | Creative Writing | S1 p. 20 |
| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | New Media Storytelling | S1 p. 20 |
| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | English Studies in Film: Philosophy in Film | S1 p. 20 |
| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | Detective and Crime Fiction | S1 p. 20 |
| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | Global Literature Topics | S1 p. 21 |
| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Graphic Novels | S1 p. 11, 21, 52 |
| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Modern Dramatic Literature | S1 p. 11, 21 |
| `divisions[2].departments[0].courses[10]` | Upper School Courses | English | Shakespeare | S1 p. 11, 21, 23 |
| `divisions[2].departments[0].courses[11]` | Upper School Courses | English | War Literature | S1 p. 22 |
| `divisions[2].departments[0].courses[12]` | Upper School Courses | English | Latino American Literature | S1 p. 11, 22 |
| `divisions[2].departments[0].courses[13]` | Upper School Courses | English | AP African American Studies | S1 p. 5, 11, 22 |
| `divisions[2].departments[0].courses[14]` | Upper School Courses | English | AP English Language and Composition | S1 p. 20, 22 |
| `divisions[2].departments[0].courses[15]` | Upper School Courses | English | AP English Literature and Composition | S1 p. 23 |
| `divisions[2].departments[1].courses[0]` | Upper School Courses | History | Global Civics: Government Structures and Economic Systems | S1 p. 24 |
| `divisions[2].departments[1].courses[1]` | Upper School Courses | History | World History | S1 p. 5, 8, 10, 24 |
| `divisions[2].departments[1].courses[2]` | Upper School Courses | History | AP World History: Modern | S1 p. 24 |
| `divisions[2].departments[1].courses[3]` | Upper School Courses | History | United States History | S1 p. 5, 8, 25 |
| `divisions[2].departments[1].courses[4]` | Upper School Courses | History | AP United States History | S1 p. 8, 25 |
| `divisions[2].departments[1].courses[5]` | Upper School Courses | History | AP European History | S1 p. 11, 25 |
| `divisions[2].departments[1].courses[6]` | Upper School Courses | History | AP U.S. Government and Politics | S1 p. 25 |
| `divisions[2].departments[1].courses[7]` | Upper School Courses | History | AP Human Geography | S1 p. 11, 26 |
| `divisions[2].departments[1].courses[8]` | Upper School Courses | History | AP Microeconomics | S1 p. 26, 28 |
| `divisions[2].departments[1].courses[9]` | Upper School Courses | History | AP Macroeconomics | S1 p. 11, 26 |
| `divisions[2].departments[1].courses[10]` | Upper School Courses | History | AP Psychology | S1 p. 27 |
| `divisions[2].departments[1].courses[11]` | Upper School Courses | History | Introduction to Psychology | S1 p. 27 |
| `divisions[2].departments[1].courses[12]` | Upper School Courses | History | Comparative Government and Politics | S1 p. 10, 27 |
| `divisions[2].departments[1].courses[13]` | Upper School Courses | History | Herstory: Women in Global History | S1 p. 11, 27 |
| `divisions[2].departments[1].courses[14]` | Upper School Courses | History | Legal Issues | S1 p. 11, 28 |
| `divisions[2].departments[1].courses[15]` | Upper School Courses | History | Economics of Development | S1 p. 11, 28 |
| `divisions[2].departments[1].courses[16]` | Upper School Courses | History | Global Studies: Genocide | S1 p. 10, 28 |
| `divisions[2].departments[1].courses[17]` | Upper School Courses | History | Global Studies: Europe and Latin America | S1 p. 10, 29 |
| `divisions[2].departments[1].courses[18]` | Upper School Courses | History | Global Studies: Comparative Religions | S1 p. 10, 29 |
| `divisions[2].departments[1].courses[19]` | Upper School Courses | History | Global Studies: Africa | S1 p. 10, 29 |
| `divisions[2].departments[1].courses[20]` | Upper School Courses | History | Global Studies: Asia | S1 p. 10, 30 |
| `divisions[2].departments[1].courses[21]` | Upper School Courses | History | Global Studies: Middle East and North Africa | S1 p. 10, 30 |
| `divisions[2].departments[1].courses[22]` | Upper School Courses | History | Global Leadership | S1 p. 5, 10, 30 |
| `divisions[2].departments[2].courses[0]` | Upper School Courses | Mathematics | Algebra I | S1 p. 8, 18, 31, 32 |
| `divisions[2].departments[2].courses[1]` | Upper School Courses | Mathematics | Geometry | S1 p. 5, 8, 14, 16 |
| `divisions[2].departments[2].courses[2]` | Upper School Courses | Mathematics | Geometry (Accelerated) | S1 p. 31, 32 |
| `divisions[2].departments[2].courses[3]` | Upper School Courses | Mathematics | Geometry (Advanced) | S1 p. 5, 31, 32 |
| `divisions[2].departments[2].courses[4]` | Upper School Courses | Mathematics | Algebra II | S1 p. 5, 8, 16, 26 |
| `divisions[2].departments[2].courses[5]` | Upper School Courses | Mathematics | Algebra II/Trigonometry (Accelerated) | S1 p. 32, 33 |
| `divisions[2].departments[2].courses[6]` | Upper School Courses | Mathematics | Algebra II/Trigonometry (Advanced) | S1 p. 5, 32, 33 |
| `divisions[2].departments[2].courses[7]` | Upper School Courses | Mathematics | Precalculus | S1 p. 5, 8, 31, 32 |
| `divisions[2].departments[2].courses[8]` | Upper School Courses | Mathematics | Precalculus (Advanced) | S1 p. 5, 33 |
| `divisions[2].departments[2].courses[9]` | Upper School Courses | Mathematics | Analysis (Advanced) | S1 p. 5, 33 |
| `divisions[2].departments[2].courses[10]` | Upper School Courses | Mathematics | Statistics | S1 p. 5, 32, 33, 34 |
| `divisions[2].departments[2].courses[11]` | Upper School Courses | Mathematics | Calculus (Advanced) | S1 p. 5, 33 |
| `divisions[2].departments[2].courses[12]` | Upper School Courses | Mathematics | AP Calculus AB | S1 p. 34 |
| `divisions[2].departments[2].courses[13]` | Upper School Courses | Mathematics | AP Calculus BC | S1 p. 34, 35 |
| `divisions[2].departments[2].courses[14]` | Upper School Courses | Mathematics | AP Statistics | S1 p. 34 |
| `divisions[2].departments[2].courses[15]` | Upper School Courses | Mathematics | Calculus III (Advanced) | S1 p. 34 |
| `divisions[2].departments[2].courses[16]` | Upper School Courses | Mathematics | Linear Algebra (Advanced) | S1 p. 5, 35 |
| `divisions[2].departments[2].courses[17]` | Upper School Courses | Mathematics | Differential Equations (Advanced) | S1 p. 35 |
| `divisions[2].departments[3].courses[0]` | Upper School Courses | Science | Physics I | S1 p. 18, 42, 43, 44 |
| `divisions[2].departments[3].courses[1]` | Upper School Courses | Science | Physics I Accelerated | S1 p. 42, 43 |
| `divisions[2].departments[3].courses[2]` | Upper School Courses | Science | Chemistry I | S1 p. 42, 43, 45, 46 |
| `divisions[2].departments[3].courses[3]` | Upper School Courses | Science | Chemistry I Accelerated | S1 p. 42, 43, 45, 46 |
| `divisions[2].departments[3].courses[4]` | Upper School Courses | Science | Biology I | S1 p. 43, 46 |
| `divisions[2].departments[3].courses[5]` | Upper School Courses | Science | Biology I Accelerated | S1 p. 43, 46 |
| `divisions[2].departments[3].courses[6]` | Upper School Courses | Science | Anatomy and Physiology | S1 p. 43 |
| `divisions[2].departments[3].courses[7]` | Upper School Courses | Science | Applied Sports Anatomy | S1 p. 43 |
| `divisions[2].departments[3].courses[8]` | Upper School Courses | Science | Astronomy | S1 p. 43 |
| `divisions[2].departments[3].courses[9]` | Upper School Courses | Science | Bioethics/Biotechnology | S1 p. 11, 44 |
| `divisions[2].departments[3].courses[10]` | Upper School Courses | Science | Environmental Sustainability | S1 p. 11, 44 |
| `divisions[2].departments[3].courses[11]` | Upper School Courses | Science | Forensic Science | S1 p. 44 |
| `divisions[2].departments[3].courses[12]` | Upper School Courses | Science | Microbiology | S1 p. 44 |
| `divisions[2].departments[3].courses[13]` | Upper School Courses | Science | Neuroscience | S1 p. 27, 45 |
| `divisions[2].departments[3].courses[14]` | Upper School Courses | Science | STEM Research and Design | S1 p. 18, 45 |
| `divisions[2].departments[3].courses[15]` | Upper School Courses | Science | AP Biology | S1 p. 45, 46 |
| `divisions[2].departments[3].courses[16]` | Upper School Courses | Science | AP Chemistry | S1 p. 45 |
| `divisions[2].departments[3].courses[17]` | Upper School Courses | Science | AP Environmental Science | S1 p. 11, 45 |
| `divisions[2].departments[3].courses[18]` | Upper School Courses | Science | AP Physics 1 | S1 p. 46 |
| `divisions[2].departments[3].courses[19]` | Upper School Courses | Science | AP Physics C | S1 p. 46 |
| `divisions[2].departments[4].courses[0]` | Upper School Courses | Computing & Innovation | Computer-Aided Design with 3D Printing | S1 p. 14 |
| `divisions[2].departments[4].courses[1]` | Upper School Courses | Computing & Innovation | Computer Programming with Python | S1 p. 14 |
| `divisions[2].departments[4].courses[2]` | Upper School Courses | Computing & Innovation | Advanced Data Structures in Java | S1 p. 5, 14 |
| `divisions[2].departments[4].courses[3]` | Upper School Courses | Computing & Innovation | Game Development with Unity and C# | S1 p. 15 |
| `divisions[2].departments[4].courses[4]` | Upper School Courses | Computing & Innovation | iOS Programming with Swift | S1 p. 15 |
| `divisions[2].departments[4].courses[5]` | Upper School Courses | Computing & Innovation | Physical Computing | S1 p. 15 |
| `divisions[2].departments[4].courses[6]` | Upper School Courses | Computing & Innovation | Robotics & Engineering | S1 p. 11, 15 |
| `divisions[2].departments[4].courses[7]` | Upper School Courses | Computing & Innovation | AP Computer Science A | S1 p. 16 |
| `divisions[2].departments[4].courses[8]` | Upper School Courses | Computing & Innovation | AP Computer Science Principles | S1 p. 16 |
| `divisions[2].departments[5].courses[0]` | Upper School Courses | Design & Entrepreneurship | Broadcast Journalism | S1 p. 17 |
| `divisions[2].departments[5].courses[1]` | Upper School Courses | Design & Entrepreneurship | Introduction to Financial Analytics | S1 p. 17 |
| `divisions[2].departments[5].courses[2]` | Upper School Courses | Design & Entrepreneurship | Architecture Design | S1 p. 11, 14, 17 |
| `divisions[2].departments[5].courses[3]` | Upper School Courses | Design & Entrepreneurship | Social Entrepreneurship | S1 p. 11, 18 |
| `divisions[2].departments[5].courses[4]` | Upper School Courses | Design & Entrepreneurship | STEM Research and Design | S1 p. 18, 45 |
| `divisions[2].departments[5].courses[5]` | Upper School Courses | Design & Entrepreneurship | Design & Entrepreneurship | S1 p. 14, 17, 18 |
| `divisions[2].departments[6].courses[0]` | Upper School Courses | World Language | French / German / Spanish I–V | S1, check by hand |
| `divisions[2].departments[6].courses[1]` | Upper School Courses | World Language | French / German / Spanish 6 | S1, check by hand |
| `divisions[2].departments[6].courses[2]` | Upper School Courses | World Language | Spanish 7 Advanced: Conversation and Culture | S1 p. 52 |
| `divisions[2].departments[6].courses[3]` | Upper School Courses | World Language | French 7 Advanced: Francophone Culture through Literature | S1 p. 52, 53 |
| `divisions[2].departments[6].courses[4]` | Upper School Courses | World Language | French 7 Advanced: Francophone Culture through Movies | S1 p. 52 |
| `divisions[2].departments[6].courses[5]` | Upper School Courses | World Language | AP French Language | S1 p. 53 |
| `divisions[2].departments[6].courses[6]` | Upper School Courses | World Language | AP Spanish Language | S1 p. 53 |
| `divisions[2].departments[6].courses[7]` | Upper School Courses | World Language | Latin 1 | S1 p. 53, 54 |
| `divisions[2].departments[6].courses[8]` | Upper School Courses | World Language | Latin 2 | S1 p. 54 |
| `divisions[2].departments[6].courses[9]` | Upper School Courses | World Language | Latin 3 | S1 p. 54 |
| `divisions[2].departments[6].courses[10]` | Upper School Courses | World Language | Latin 4 | S1 p. 50, 54, 55 |
| `divisions[2].departments[6].courses[11]` | Upper School Courses | World Language | Latin 5 (Advanced) | S1 p. 54 |
| `divisions[2].departments[6].courses[12]` | Upper School Courses | World Language | AP Latin | S1 p. 54, 55 |
| `divisions[2].departments[6].courses[13]` | Upper School Courses | World Language | Mandarin Chinese 1–5 | S1, check by hand |
| `divisions[2].departments[6].courses[14]` | Upper School Courses | World Language | Mandarin Chinese 6 (Advanced) | S1 p. 56 |
| `divisions[2].departments[6].courses[15]` | Upper School Courses | World Language | Mandarin Chinese 7 (Advanced) | S1 p. 57 |
| `divisions[2].departments[6].courses[16]` | Upper School Courses | World Language | AP Chinese Language and Culture | S1 p. 57 |
| `divisions[2].departments[7].courses[0]` | Upper School Courses | Visual Arts | Foundations of Art and Design | S1 p. 47, 48, 49 |
| `divisions[2].departments[7].courses[1]` | Upper School Courses | Visual Arts | Drawing | S1 p. 14, 47, 48, 49 |
| `divisions[2].departments[7].courses[2]` | Upper School Courses | Visual Arts | Painting | S1 p. 47, 48, 49 |
| `divisions[2].departments[7].courses[3]` | Upper School Courses | Visual Arts | 3D Design | S1 p. 47, 48 |
| `divisions[2].departments[7].courses[4]` | Upper School Courses | Visual Arts | Photography | S1 p. 8, 48, 49 |
| `divisions[2].departments[7].courses[5]` | Upper School Courses | Visual Arts | Digital Media | S1 p. 48, 49 |
| `divisions[2].departments[7].courses[6]` | Upper School Courses | Visual Arts | Studio Art | S1 p. 5, 47 |
| `divisions[2].departments[7].courses[7]` | Upper School Courses | Visual Arts | Understanding Art: A Global View | S1 p. 11, 49 |
| `divisions[2].departments[7].courses[8]` | Upper School Courses | Visual Arts | Yearbook | S1 p. 8, 49 |
| `divisions[2].departments[7].courses[9]` | Upper School Courses | Visual Arts | AP Art History | S1 p. 8, 11, 48 |
| `divisions[2].departments[7].courses[10]` | Upper School Courses | Visual Arts | AP Art and Design | S1 p. 47, 48 |
| `divisions[2].departments[8].courses[0]` | Upper School Courses | Performing Arts | Band | S1 p. 5, 8, 36, 38 |
| `divisions[2].departments[8].courses[1]` | Upper School Courses | Performing Arts | Chorus | S1 p. 5, 8, 11, 36 |
| `divisions[2].departments[8].courses[2]` | Upper School Courses | Performing Arts | Jazz Ensemble | S1 p. 5, 36, 38 |
| `divisions[2].departments[8].courses[3]` | Upper School Courses | Performing Arts | Orchestra | S1 p. 5, 8, 36, 37 |
| `divisions[2].departments[8].courses[4]` | Upper School Courses | Performing Arts | Theatre I: Introduction to Performance | S1 p. 37 |
| `divisions[2].departments[8].courses[5]` | Upper School Courses | Performing Arts | Theatre II: Advanced Acting | S1 p. 37 |
| `divisions[2].departments[8].courses[6]` | Upper School Courses | Performing Arts | Theatrical Performing Arts Lab | S1 p. 37 |
| `divisions[2].departments[8].courses[7]` | Upper School Courses | Performing Arts | Theatre Around the World | S1 p. 11, 37 |
| `divisions[2].departments[8].courses[8]` | Upper School Courses | Performing Arts | Theatrical Production and Design | S1 p. 38 |
| `divisions[2].departments[8].courses[9]` | Upper School Courses | Performing Arts | RE(ACT): Theatre and Social Change | S1 p. 11, 38 |
| `divisions[2].departments[8].courses[10]` | Upper School Courses | Performing Arts | Technical Theatre | S1 p. 38 |
| `divisions[2].departments[8].courses[11]` | Upper School Courses | Performing Arts | Honors Band | S1 p. 5, 38 |
| `divisions[2].departments[8].courses[12]` | Upper School Courses | Performing Arts | Honors Chorus | S1 p. 5, 38 |
| `divisions[2].departments[8].courses[13]` | Upper School Courses | Performing Arts | Honors Jazz Ensemble | S1 p. 5, 38 |
| `divisions[2].departments[8].courses[14]` | Upper School Courses | Performing Arts | Honors Orchestra | S1 p. 5, 39 |
| `divisions[2].departments[8].courses[15]` | Upper School Courses | Performing Arts | AP Music Theory | S1 p. 39 |
| `divisions[2].departments[9].courses[0]` | Upper School Courses | PE & Health | Ninth Grade Health | S1 p. 40 |
| `divisions[2].departments[9].courses[1]` | Upper School Courses | PE & Health | P.E. — Lifetime Wellness | S1 p. 40, 41 |
| `divisions[2].departments[9].courses[2]` | Upper School Courses | PE & Health | P.E. — Athletic Development | S1 p. 40 |
| `divisions[2].departments[9].courses[3]` | Upper School Courses | PE & Health | P.E. — Dancercise | S1 p. 41 |
| `divisions[2].departments[9].courses[4]` | Upper School Courses | PE & Health | P.E. — Dancercise II | S1 p. 41 |
| `divisions[2].departments[9].courses[5]` | Upper School Courses | PE & Health | P.E. — Yoga and Mindfulness | S1 p. 41 |
| `divisions[2].departments[9].courses[6]` | Upper School Courses | PE & Health | P.E. — International Games | S1 p. 41 |
| `divisions[2].departments[10].courses[0]` | Upper School Courses | Teaching | The Art and Science of Teaching | S1 p. 58 |

## Lower School — page text (S3)

# Lower School

## Transitional Kindergarten (TK) Through Fifth Grade

Relationships serve as the foundation of every child’s life and learning experience. Our sense of community establishes a caring learning environment throughout the school. The pathways to each child’s future are carved by movement, engagement, collaboration, intentional design, and the use of technology as learning tools. This is where the magic of learning begins.

### Social Emotional Learning

Lower School strives to develop the whole child, which includes an intentional and thoughtful emphasis on Social-Emotional Learning (SEL). Every day, whether during classroom instruction or less structured activities such as recess or lunch, students have opportunities to develop and fine-tune their SEL skills. Each Lower School classroom has a Lead Teacher and a full-time Assistant Teacher, many with extensive training in the Responsive Classroom model. All teachers appreciate the value of building a safe and nurturing classroom community. Every day begins with a morning meeting in each classroom, a favorite routine filled with activities that give students a chance to share and connect with others. Lessons on mindfulness and the regulation of daily emotions are other important components of Lower School SEL. The Zones of Regulation lessons provide a common framework for students to recognize, express and discuss their emotions with parents, teachers, counselors and classmates.

Lower School has two full-time counselors who guide and support the SEL needs of our students. Counselors partner with students, teachers and families to navigate the school year while promoting the growth and well-being of all. They spend quality time in classrooms, teach character education lessons, work with students individually and in groups and consult with parents, professionals and faculty members.

-
Math

-
Language Arts

-
Science

-
Social Studies

-
Lower School Clubs

### Math

Providence Day uses the concepts of Singapore Math for kindergarten through fifth grade. This method teaches the "why" and "how" behind mathematical concepts and builds a strong foundation of number sense including relationships between numbers. Singapore Math encourages problem-solving strategies with an emphasis on bar modeling in second through fifth grades and incorporates whole group, partner work, small group, and independent practice in math instruction.

### Language Arts

Providence Day School's Lower School literacy program begins in Transitional Kindergarten and is built on structured literacy principles. Teachers implement a systematic and explicit approach to foster key skills such as phonological awareness, phonics, fluency, vocabulary, and comprehension.

As students advance from kindergarten through fifth grade, the curriculum focuses on fluent decoding and language comprehension while enhancing vocabulary and background knowledge. Students are encouraged to express their thoughts by writing about their reading experiences. They engage with a variety of genres through read-alouds, small group sessions, and individual instruction, all designed to deepen their understanding of texts and literacy skills. Lower School’s structured literacy approach aims to nurture capable and confident lifelong readers and writers.

### Science

Lower School science uses inquiry-based methodology to nurture the inherent curiosity of students. This approach empowers students to rely on their own reasoning, rather than seeking answers from teachers. Lower School students are presented with open-ended challenges that foster collaboration. Additionally, science teachers model the scientific method, emphasizing process over product. Lower School students have fun while exploring!

### Social Studies

Our Lower School social studies curriculum allows students to explore their identities, experiences, and contributions as part of the Providence Day family, the Charlotte community, and the world in which they live. Beginning in Transitional Kindergarten, students learn about family and community and are introduced to cultures around the world during the TK Goes Global unit. The social studies curriculum is thoughtfully constructed to build upon the year(s) before and offers more expansive and detailed lessons that highlight diversity in different countries and cultures. Each grade level has its own focus, with unique projects and activities, to engage and educate its students so they are better prepared citizens of the world.

### Lower School Clubs

- Kaleidoscope, third through fifth grades

- Affinity Groups, third through fifth grades

- Science Olympiad, fourth and fifth grades

- Battle of the Books, fifth grade

Additionally, a variety of after-school enrichments ranging from Girls on the Run to American Sign Language to martial arts are available via the Extended Day program.

### Special Area Classes

Art

Physical Education

World Language

Learning Loft

Library

Music

Science Lab

Tech Tank

Band, Orchestra, Chorus

Theatre

IDEAS

<
>

## Lower School — Global Education page (S4)

# Global Education

Our youngest students explore the cultures of India, China, Germany, Peru, and Kenya through art, language, music, food, traditions, guest speakers, and more during "TK Goes Global."

## Wonder and Awareness

Global education begins with curiosity! In the Lower School, students begin their global education journey by exploring cultures, traditions, languages, and perspectives beyond their own experiences. Through hands-on learning, storytelling, language study, music, art, and meaningful connections with others, students develop the curiosity and empathy that form the foundation of global citizenship.

##### INWARD: Students learn about themselves and their own communities.

##### OUTWARD: Students explore cultures, languages, and traditions around the world.

##### FORWARD: Students begin developing the empathy, curiosity, and confidence needed to engage with an interconnected world.

## Signature Experiences

Click on any photo below to learn more about our global experiences for Lower School students.

Connect

Explore

## Part of a Larger Journey

Click to view the image in full size.

Global Education begins in the Lower School and grows throughout a student's time at Providence Day. Knowing the world is interconnected and ever-changing, we purposefully develop opportunities for our students to become empathetic, informed, and empowered global beings.

Through language study, cultural exploration, and age-appropriate global experiences, students build the foundation for the deeper inquiry, engagement, and leadership opportunities they will encounter in Middle and Upper School.

### S4 post 4490

Connect

Round Square’s Worldwide Show and Tell is an interactive online program for students that connects them globally through collaborative presentations. Each session, participants share insights on various topics like celebrating birthdays and favorite foods. This initiative sparks curiosity, builds cultural awareness, and encourages global friendships.

### S4 post 4491

Explore

Early exposure to a foreign language has been shown to enhance brain development, improve task-switching and problem-solving skills, and build a broader, more open-minded worldview and appreciation for cultural nuances.

Students at Providence Day are exposed to French, Spanish, and Mandarin Chinese beginning in TK. By second grade, students select one language of study for the remaining four years of Lower School.

## Middle School — 2025-2026 Course of Study, full text (S2)

===== PAGE 1 =====

```text

```

===== PAGE 2 =====

```text
Course of Study
Grade 6
Required Courses
Course Term Prerequisite
English 6 Year
Mathematics 6 Year
History 6 Year
Science 6 Year
Physical Education/Health 6 Year
Electives
English
Course Term Prerequisite
Creative Writing 6 Semester
World Myths and Legends Semester
6,7
Science
Course Term Prerequisite
The Amazing Human Body Semester
6, 7
Fine Arts
Course Term Prerequisite
Chorus 6 Year or
Semester
```

===== PAGE 3 =====

```text
Band 6 Year 5
Orchestra 6 Year 5
Art 6 Semester M
Theatre Arts (Grade 6) Semester
Communication Arts 6,7,8 Semester
IDEAS@PDS - Innovation, Design, Entrepreneu
Course Term P
Computer Programming Semester
Robotics Semester
Web Design Semester C
Computer Applications Semester
Introduction to Engineering 2nd
Semester
SPARK: 2nd
Environmental Problem Semester
Solving by Design
6, 7, 8
World Language
See Descriptions in the “Course Offerings” Section
(World Language level 2 or above requires teacher signatu
Course Term P
Mandarin Chinese 1 Year
Mandarin Chinese 2 Year R
French 1 Year
French 2 Year R
Spanish 1 Year
Spanish 2 Year R
5th grade band, or director permission
5th grade orchestra, or director permission
May be taken both semesters
urship, Analytics, Sustainability
Prerequisite
Computer Applications
ure)
Prerequisite
Requires Prerequisite Approval
Requires Prerequisite Approval
Requires Prerequisite Approval
```

===== PAGE 4 =====

```text
German 1 Year
Exploring Latin through Semester
Mythology
***New students to Providence Day School with previous y
appropriate placement by the World Language Departmen
Study Hall
Course Term
Study Hall 1st Semester a
Grade 7
Required Courses
Course Term P
English 7 Year
Math 7 Year
Pre-Algebra 7 - Accelerated Year T
R
Advanced Pre-Algebra Year T
R
Science 7 Year
U.S. History 7 Year
Physical Education/Health 7 Year
Electives
English
Course Term P
Lights, Camera, Action: Semester
Literature through Movies
7,8
year-long language instruction will be assessed for
nt Chair.
and/or 2nd Semester
Prerequisite
Teacher/ Department Recommendation
Required
Teacher/ Department Recommendation
Required
Prerequisite
```

===== PAGE 5 =====

```text
World Myths and Legends Semester
6,7
Science
Course Term P
The Amazing Human Body Semester
6, 7
History
Course Term P
History in Action: Fall
Collaborative Research and
Project Presentations based
on Student Choice
7,8
Contemporary Global Issues Spring
7,8
Fine Arts
Course Term P
Band 7, 8 Year P
Chorus 7, 8 Year or
Semester
Orchestra 7, 8 Year P
Acting 1 - 7, 8 Semester
Acting 2 (Acting through the Semester
Ages) - 7, 8 (Spring)
Acting 3 (One Act Play) - 7,8 Semester A
(Fall)
Communication Arts 6, 7, 8 Semester
Middle School Stagecraft Semester
7, 8
Prerequisite
Prerequisite
Prerequisite
Prior Band Experience or Director Approval
Prior Strings Experience or Director Approval
Any prior theater experience
```

===== PAGE 6 =====

```text
Art Foundations Semester
Introduction to Art and Design Semester A
Introduction to 3D Design Semester A
Introduction to Painting Semester A
Introduction to Printmaking Semester A
IDEAS@PDS- (Innovation, Design, Entrepreneu
Course Term P
Computer Applications Semester
Web Design Semester C
Computer Programming Semester
Robotics Semester
Broadcast Media Semester
Social Entrepreneurship: Semester
Incubation & Acceleration
7,8
Engineering the Future 7, 8 1st
Semester
SPARK: 2nd
Environmental Problem Semester
Solving by Design
6, 7, 8
World Language
See Descriptions in the “Course Offerings” Section
(World Language level 2 or above requires teacher signatu
Course Term P
French 1 Year
French 2, 3, 4 Year R
Art Foundations
Art Foundations
Art Foundations
Art Foundations
urship, Analytics, and Sustainability)
Prerequisite
Computer Applications
ure)
Prerequisite
Requires Prerequisite Approval
```

===== PAGE 7 =====

```text
German 1 Year
German 2 Year R
Exploring Latin through Semester
Mythology
Latin 1 Year
Mandarin Chinese 1 Year
Mandarin Chinese 2, 3, 4 Year R
Spanish 1 Year
Spanish 2, 3, 4 Year R
Study Hall
Course Term
Study Hall 1st Semester a
Grade 8
Required Courses
Course Term P
English 8 Year
Pre-Algebra 8 Year
Algebra I-8 Accelerated Year P
Advanced Algebra I Year A
Science 8 Year
Global Perspectives 8 Year
Physical Education/Health 8 Semester
Requires Prerequisite Approval
Requires Prerequisite Approval
Requires Prerequisite Approval
and/or 2nd Semester
Prerequisite
Pre-Algebra 7 - Accelerated
Advanced Pre-Algebra
```

===== PAGE 8 =====

```text
Electives
English
Course Term P
Lights, Camera, Action: Semester
Literature through Movies
7,8
History
Course Term P
History in Action: Fall
Collaborative Research and
Project Presentations based
on Student Choice
7,8
Contemporary Global Issues Spring
7,8
Fine Arts
Band 7, 8 Year P
Chorus 7, 8 Year or
Semester
Orchestra 7, 8 Year P
Acting 1 - 7, 8 Semester
Acting 2 (Acting through the Semester
Ages) - 7, 8 (Spring)
Acting 3 (One Act Play) - 7,8 Semester A
(Fall)
Communication Arts 6, 7, 8 Semester
Middle School Stagecraft Semester N
7, 8
Prerequisite
Prerequisite
Prior Band Experience
Prior Strings Experience
Any prior theater experience
None
```

===== PAGE 9 =====

```text
Introduction to Painting Semester A
Introduction to Printmaking Semester A
Introduction to Art and Design Semester A
Introduction to 3D Design Semester A
IDEAS@PDS- Innovation, Design, Entrepreneu
Course Term P
Computer Applications Semester
Web Design Semester C
Computer Programming Semester
Robotics Semester
Broadcast Media Semester
Social Entrepreneurship: Semester
Incubation & Acceleration
Introduction to Personal Semester
Finance
Engineering the Future 7, 8 1st
Semester
SPARK: 2nd
Environmental Problem Semester
Solving by Design
6, 7, 8
Physical Education
Course Term P
Movement & Yoga Semester D
r
World Language
See Descriptions in the “Course Offerings” Section
(World Language level 2 or above requires teacher signatu
Art Foundations
Art Foundations
Art Foundations
Art Foundations
urship, Analytics, Sustainability
Prerequisite
Computer Applications
Prerequisite
Does not replace the 8th grade PE
requirement.
ure)
```

===== PAGE 10 =====

```text
Course Term Prerequisite
French 1 Year
French 2, 3, 4 Year Requires Prerequisite Approval
German 1 Year
German 2, 3 Year Requires Prerequisite Approval
Exploring Latin through Semester
Mythology
Latin 1 (Grades 7-12 only) Year
Latin 2 (Grades 8-12 only) Year Requires successful completion of Latin I
Mandarin Chinese 1 Year
Mandarin Chinese 2, 3, 4 Year Requires Prerequisite Approval
Spanish 1 Year
Spanish 2, 3, 4 Year Requires Prerequisite Approval
Study Hall
Course Term
Study Hall 1st Semester and/or 2nd Semester
Course Offerings
Grade 6
The sixth grade curriculum consists of daily instruction in the areas of English, Mathematics, History, Science, and
Physical Education/Health.
English 6 - Year
Sixth grade English lays a foundation of skills for the cultivation of effective communicators. The responsive,
flexible curriculum attends to the needs of students as they study novels, poetry, short stories, and nonfiction
selections. Students practice active listening, meaningful reflection, and self-assessment. They learn vocabulary in
context, utilize grammar and mechanics as tools of effective and efficient writing, and interact with literature through
```

===== PAGE 11 =====

```text
developing habits of observation and inference. Sixth graders also gain an understanding of the function and
makeup of a paragraph and begin to recognize transitions and purpose for multi-paragraph pieces. Audience and
purpose shape and motivate the writing process.
Mathematics 6 - Year
The sixth grade math program includes the seven elements that serve as the foundation for the program: number
skills, measurement, geometry, patterns and functions, statistics and probability, logic and algebra, and their
applications in typical, real-world activities of sixth grade students. Special emphasis is placed on problem solving,
estimation, mental arithmetic, and computational skills.
History 6 - Year
The sixth grade history course focuses on the history of selected cultures of the ancient and medieval world.
Teachers use student-centered learning and stress skills such as listening, note takin

…[truncated]


---

## Curriculum Guide

*Source file: `Providence Day - Course Offerings - Curriculum Guide.md`*

# Providence Day School — Course Offerings

**Provenance**

- **Compiled by:** Claude Code deep research pass, at Derrick's request
- **Date compiled:** 2026-07-26
- **Method:** Web search + direct fetch of Providence Day's own published Course of Study
 PDFs and division curriculum pages. All course titles are verbatim from the school's
 2025-26 catalogs; all descriptions are condensed from the school's own catalog prose.
- **Divisions:** Lower School TK–5 · Middle School 6–8 · Upper School 9–12

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1759758182/provday/wekh9bxtsqah5givkjk2/2025-2026UpperSchoolCourseofStudy.pdf | **2025-2026 Upper School Course of Study** (72 pp.) — primary source for every Upper School department, course title, description, graduation requirement, the AP list, and the Global Studies Diploma |
| S2 | https://resources.finalsite.net/images/v1759322022/provday/z3tij4sfwwhthez2vijd/2025-2026MiddleSchoolCourseofStudy.pdf | **2025-2026 Middle School Course of Study** (28 pp.) — primary source for all Grade 6–8 required courses and electives |
| S3 | https://www.providenceday.org/fs/resource-manager/view/bc5f6760-48c2-4973-ad2c-4c464f495902 | School-hosted stable permalink to the Upper School Course of Study (survives PDF re-upload) |
| S4 | https://www.providenceday.org/fs/resource-manager/view/f7d52609-86e2-49c2-9e61-e645bc828d0b | School-hosted stable permalink to the Middle School Course of Study |
| S5 | https://www.providenceday.org/upper-school | Upper School landing page — per-department course/AP tallies (marketing-side; see Gaps) |
| S6 | https://www.providenceday.org/middle-school | Middle School landing page — Grades 6–8 required subjects |
| S7 | https://www.providenceday.org/lower-school | Lower School page — TK–5, four core curriculum areas, Special Area Classes |
| S8 | https://www.providenceday.org/lower-school/global-education | Lower School world-language sequence (French / Spanish / Mandarin; one language selected by Grade 2) |
| S9 | https://www.providenceday.org/the-pd-difference/academics | TK–12 grade range, the "11-year journey" language pathway |

Older editions located for provenance/versioning (not current, do not cite as such):
[2023-24 Upper School](https://resources.finalsite.net/images/v1690493877/provday/xvn9g3vbgghqjeyy0jxq/2023-2024UpperSchoolCourseofStudy.pdf) ·
[2020-21 Upper School](https://resources.finalsite.net/images/v1597864340/provday/yreq3ftuqhypxp1quflw/2020-2021CourseofStudyUpperSchool.pdf)

**Publication year:** both current guides are the **2025-26** editions. No 2026-27 edition was
published as of 2026-07-26.

## Metrics

| Metric | Value | Source |
| --- | --- | --- |
| Grade range | TK–12 | S9, S7 |
| Academic divisions | 3 (Lower TK–5, Middle 6–8, Upper 9–12) | S7, S6, S1 |
| Upper School departments | 11 catalog sections (Computing & Innovation, Design & Entrepreneurship, English, History, Mathematics, Performing Arts, PE & Health, Science, Visual Arts, World Language, + The Art and Science of Teaching) | S1 p.2 |
| Upper School courses catalogued | 149 distinct entries | S1 |
| Middle School courses catalogued | ~75 distinct entries across Grades 6–8 | S2 |
| AP courses with full descriptions | 28 | S1 |
| AP subject areas named in catalog prose | 27 | S1 p.5 |
| Advanced (5-point weighted) courses | 22 named | S1 p.5 |
| Single-section courses | "over seventy-five" | S1 |
| Graduation credit requirement | 22.50 units, grades 9–12, plus a senior project | S1 p.8 |
| World languages offered | 5 — French, German, Spanish, Latin, Mandarin Chinese | S1 p.50 |
| Second diploma offered | Global Studies Diploma (GSD), grades 9–12 | S1 pp.9–11 |
| Global Online Academy | 30 online course slots (14 fall / 16 spring) for elective + GSD credit | S1 pp.12–13 |
| IB Diploma Programme | **NOT offered** — see Gaps | S1, S2, S9 |

## Upper School (Grades 9–12) — source S1

### English (16 courses)

- **English I** — *Gr 9 · Required* — Ninth-graders read novels, short stories, and plays including *Macbeth* and *The House on Mango Street*, building analytical skills through essays, journals, and a research-based podcast project.
- **English II** — *Gr 10 · Required* — Sophomore English focuses writing skills on American literature such as *The Great Gatsby* and *Their Eyes Were Watching God*.
- **Writing Seminar** — *Semester* — A junior course in which student writing constitutes the text, emphasizing style, voice, and rhetorical organization.
- **Creative Writing** — *Semester* — Students write original prose fiction and poetry in a workshop setting, inventing characters and plots while critiquing classmates' work.
- **New Media Storytelling** — *Semester* — Students examine storytelling strategies from news articles to Instagram reels and apply narrative methods across formats.
- **English Studies in Film: Philosophy in Film** — *Semester* — Students pair film with classical philosophical texts to investigate good and evil, self, existence, and reality.
- **Detective and Crime Fiction** — *Semester* — Students explore the detective and crime fiction genre from the 1800s to the present across stories, drama, novels, film, and TV.
- **Global Literature Topics** — *Semester* — Students engage genres spanning Asia, the Caribbean, Africa, and Latin America around a rotating common topic.
- **Graphic Novels** — *Semester* — Students scrutinize long-form comics as global literature and design a multimedia work of literary analysis.
- **Modern Dramatic Literature** — *Semester* — A survey of modern drama from Ibsen to Ionesco exploring individualism, empathy, and communication through reader's theater.
- **Shakespeare** — *Semester* — Students study *The Merchant of Venice*, *Othello*, *The Tempest*, *Measure for Measure*, and *Richard III*, reading aloud and analyzing film versions.
- **War Literature** — *Semester* — Students read poetry, songs, plays, novels, and non-fiction spanning the Thirty Years' War through Afghanistan and Iraq.
- **Latino American Literature** — *Semester* — An introduction to Latino American literature and cultures in the U.S. from 1960 to the present.
- **AP African American Studies** — *AP* — An interdisciplinary AP course reaching into literature, arts, political science, geography, and science.
- **AP English Language and Composition** — *AP* — College-level expository, analytical, and argumentative writing drawn from non-fiction genres.
- **AP English Literature and Composition** — *AP · Gr 12* — Refines literary analysis via *Moby-Dick*, *Invisible Man*, and *Mrs. Dalloway*, plus Dickinson, Frost, and Shakespeare.

### History (23 courses)

- **Global Civics: Government Structures and Economic Systems** — *Gr 9 · Required* — Focuses on the roles and responsibilities of citizens from local to global perspectives.
- **World History** — *Year* — Fosters appreciation for cultural diversity through events from 1000 CE to the Age of Globalization.
- **AP World History: Modern** — *AP* — Surveys Afro-Eurasian and American societies from 1200 CE to the present.
- **United States History** — *Year* — A general survey from the European encounter of the Americas to the present, using role-play simulations and source analysis.
- **AP United States History** — *AP* — A college-level course stressing causation, comparison, and continuity and change.
- **AP European History** — *AP* — Investigates major events and ideas from the Renaissance to the present.
- **AP U.S. Government and Politics** — *AP* — Constitutional underpinnings, parties, institutions, and civil liberties, plus civic-engagement projects.
- **AP Human Geography** — *AP* — Geographic study of population, political organization of space, land use, and urbanization.
- **AP Microeconomics** — *AP* — Principles relating to consumers and producers, including supply/demand models and factor markets.
- **AP Macroeconomics** — *AP* — GDP, unemployment, inflation, aggregate demand and supply, fiscal and monetary policy, and international trade.
- **AP Psychology** — *AP* — Research methods, neuroscience, development, learning, memory, cognition, personality, and mental health.
- **Introduction to Psychology** — *Semester* — A broad overview emphasizing everyday application, covering research methods, identity, and positive psychology.
- **Comparative Government and Politics** — *Semester* — Students study the governmental systems of the UK, Nigeria, China, Russia, Iran, and Mexico.
- **Herstory: Women in Global History** — *Semester* — The progression of gender roles and the history of women worldwide over the last 1500 years.
- **Legal Issues** — *Semester* — Students apply legal case studies to real court cases, arguing as both lawyer and judge.
- **Economics of Development** — *Semester* — International trade, foreign exchange, and growth with focus on Latin American economic dependencies.
- **Global Studies: Genocide** — *Semester* — Introduces the Universal Declaration of Human Rights and investigates genocides and human rights violations.
- **Global Studies: Europe and Latin America** — *Semester* — Regional trends and cultures, generating research-driven policy recommendations.
- **Global Studies: Comparative Religions** — *Semester* — Christianity, Judaism, Islam, Hinduism, and Buddhism through readings and philosophical discussion.
- **Global Studies: Africa** — *Semester* — Sub-Saharan Africa with in-depth study of South Africa, the DRC, Rwanda, and Nigeria.
- **Global Studies: Asia** — *Semester* — Asia with in-depth examinations of China and the Koreas.
- **Global Studies: Middle East and North Africa** — *Semester* — Regional trends and cultures of the Middle East and North Africa through a historical lens.
- **Global Leadership** — *Advanced · Semester* — GSD seniors become global collaborators and leaders, completing a research project and exit interview.

Also listed as GSD-required but rotating: **Global Studies: Themes and Challenges** (summer term, topic changes).

### Mathematics (18 courses)

- **Algebra I** — *Year* — A first-year algebra course integrating algebra and physics concepts through data collection and symbolic rule-building.
- **Geometry** — *Year* — Points, lines, planes, triangles, polygons, circles, and solids, with congruence, similarity, and ACT/SAT geometry content.
- **Geometry (Accelerated)** — *Accelerated* — Teaches how mathematics develops from a postulate system, with proof, constructions, and coordinate geometry.
- **Geometry (Advanced)** — *Advanced* — Rigorous treatment of direct and indirect proofs across congruence, similarity, circles, and triangle trigonometry.
- **Algebra II** — *Year* — Polynomials, linear and quadratic equations, real and complex numbers, logarithms, graphing, inequalities, and functions.
- **Algebra II/Trigonometry (Accelerated)** — *Accelerated* — Functions, graphing, rational exponents, polynomials, systems, sequences, series, logarithms, conics, and trigonometry.
- **Algebra II/Trigonometry (Advanced)** — *Advanced* — Linear through trigonometric functions plus logic, set theory, and proof.
- **Precalculus** — *Year* — Trigonometry and advanced algebraic topics viewed through personal finance, culminating in a detailed personal budget.
- **Precalculus (Advanced)** — *Advanced* — Trigonometry, logarithmic and exponential functions, induction, conics, complex numbers, polar coordinates, and limits.
- **Analysis (Advanced)** — *Advanced* — Polynomial, rational, exponential, and logarithmic functions plus vectors and an introduction to limits and derivatives.
- **Statistics** — *Year · Elective* — Data collection, experimental design, descriptive and inferential statistics, and probability using applets and Excel.
- **Calculus (Advanced)** — *Advanced* — Introduces differential calculus concepts and applications, evaluating limits and differentiating elementary functions.
- **AP Calculus AB** — *AP* — Students evaluate limits, differentiate, and integrate elementary functions, with the graphing calculator integral to the course.
- **AP Calculus BC** — *AP* — Covers AB content plus vector, polar, and parametric equations and the calculus of infinite series.
- **AP Statistics** — *AP* — Students simulate probability distributions and analyze relationships between variables via correlation and regression.
- **Calculus III (Advanced)** — *Post-AP* — Follows BC Calculus with multivariable and vector-valued functions, curvature, multiple integrals, and vector analysis.
- **Linear Algebra (Advanced)** — *Post-AP · Semester* — Matrices, determinants, simultaneous linear equations, vector spaces, rank, inverses, and inner products.
- **Differential Equations (Advanced)** — *Post-AP · Semester* — Differential equations, Laplace Transforms, linear and nonlinear systems, series methods, Fourier Series, and numerical methods.

### Science (20 courses)

- **Physics I** — *Year · Required* — A modeling-based course developing models for motion, forces, energy, and electrostatics using algebra.
- **Physics I Accelerated** — *Accelerated* — Faster and more mathematically rigorous than Physics I, adding circular motion and waves.
- **Chemistry I** — *Year · Required* — Matter, composition, periodicity, energy, and reactions, developing models to explain the structure of matter.
- **Chemistry I Accelerated** — *Accelerated* — Chemistry I topics at greater depth and pace, recommended for students considering AP sciences.
- **Biology I** — *Year · Required* — Basic ecology, human anatomy and physiology, cell biology, and evolution with mammalian dissection.
- **Biology I Accelerated** — *Accelerated* — Differs in range, depth, pace, and longer-term guided-independent laboratory work, with dissection central.
- **Anatomy and Physiology** — *Semester* — Students learn human anatomy and physiology while working in pairs on a semester-long cat dissection.
- **Applied Sports Anatomy** — *Semester* — Musculoskeletal anatomy and injury management, completing 15 hours as student athletic trainers for PDS teams.
- **Astronomy** — *Semester* — Stars, galaxies, the solar system, and the composition, structure, and origins of the universe using astrolabs and sun spots.
- **Bioethics/Biotechnology** — *Semester* — Lab and case-study course using PCR, DNA isolation, and gel electrophoresis while debating GMOs, transgenics, and cloning.
- **Environmental Sustainability** — *Semester* — Sustainable development in urban planning, energy, water, and agriculture with hands-on work in Charger Gardens.
- **Forensic Science** — *Semester · Gr 10-12* — Fingerprint analysis, DNA profiling, and bloodstain pattern interpretation through labs and case studies.
- **Microbiology** — *Semester · Gr 10-12* — A hands-on introduction to bacteria and viruses, identifying environmental bacteria and discussing antibiotic resistance.
- **Neuroscience** — *Semester* — The cellular and molecular functioning of the nervous system, recording electrical activity from nerves, muscles, and plants.
- **STEM Research and Design** — *Semester* — Students pursue original scientific research, designing and conducting experiments and presenting results.
- **AP Biology** — *AP* — Evolution, energetics, information storage, and systems interactions with double class periods for college-level labs.
- **AP Chemistry** — *AP* — In-depth study of atomic theory, chemical kinetics, thermodynamics, and equilibrium with double class periods for labs.
- **AP Environmental Science** — *AP* — Principles to analyze natural and human-made environmental problems across physics, chemistry, biology, geology, and economics.
- **AP Physics 1** — *AP* — Students use algebra to study introductory college physics, modeling systems, fields, forces, conservation, and waves.
- **AP Physics C** — *AP* — Calculus-based classical mechanics and electricity and magnetism, meeting two periods daily for frequent lab activities.

### Computing & Innovation (9 courses)

- **Computer-Aided Design with 3D Printing** — *Semester* — Traditional mechanical drawing using CAD software plus 3D printing, isometric drawings, and 3D modeling.
- **Computer Programming with Python** — *Semester* — Variables, data types, iteration, flow of control, functions, GUIs, and event-driven programming.
- **Advanced Data Structures in Java** — *Post-AP · Semester* — Data abstraction and encapsulation including stacks, queues, linked lists, binary trees, recursion, hash maps, and heaps.
- **Game Development with Unity and C#** — *Semester* — Students develop video games from scratch using C# and the Unity engine.
- **iOS Programming with Swift** — *Semester* — Students use Xcode and the iOS SDK to learn Swift and the Cocoa Touch frameworks, testing apps on their own devices.
- **Physical Computing** — *Semester* — Students engineer interactive systems with Arduinos and Raspberry Pis using sensors, displays, motors, and wireless modules.
- **Robotics & Engineering** — *Semester* — Robotics and engineering foundations and global issues in the field, with debate over ethical implications.
- **AP Computer Science A** — *AP* — Java syntax, class structure, object-oriented methodologies, algorithms, and data structures.
- **AP Computer Science Principles** — *AP* — Creative aspects of computer science, using computational tools to analyze large data sets and draw conclusions.

### Design & Entrepreneurship (6 courses)

- **Broadcast Journalism** — *Semester* — Students create and edit stories in Adobe Premiere Pro, producing features, interviews, sports, podcasts, and film challenges.
- **Introduction to Financial Analytics** — *Semester · Gr 10-12* — Daily personal finance skills through advanced topics such as fundamental versus technical analysis.
- **Architecture Design** — *Semester* — Architectural design principles and Building Information Modeling using 3D CAD tools such as REVIT.
- **Social Entrepreneurship** — *Semester · Gr 10-12* — An experiential course launching businesses that create social value, testing ideas against customer feedback.
- **STEM Research and Design** — *Semester* — Original scientific research with student-chosen topic, experiment design, and presentation of results.
- **Design & Entrepreneurship** — *Semester* — Students cultivate design-thinking skills as a studio of designers and enterprise of entrepreneurs.

### World Language (5 languages, 22 entries)

- **French / German / Spanish I–V** — *Year* — Sequenced ACTFL-aligned courses from Novice High through Intermediate Mid 2 proficiency.
- **French / German / Spanish 6** — *Advanced* — Advanced courses promoting fluency and accuracy toward Intermediate High proficiency.
- **Spanish 7 Advanced: Conversation and Culture** — *Advanced* — Strong conversational skills and appreciation of Hispanic culture through contact with native speakers.
- **French 7 Advanced: Francophone Culture through Literature** — *Advanced* — Proficiency and cultural awareness through francophone novels and graphic novels.
- **French 7 Advanced: Francophone Culture through Movies** — *Advanced* — Proficiency and cultural awareness through francophone films.
- **AP French Language** — *AP · Gr 12* — Prepares seniors for the AP exam through persuasive essays and timed guided conversations using authentic sources.
- **AP Spanish Language** — *AP · Gr 12* — Prepares seniors for the AP Spanish Language Exam with Spanish-only classroom conversation.
- **Latin 1** — *Year* — Classical language acquisition through language, historical context, and Rome's impact, covering daily life, gods, and heroes.
- **Latin 2** — *Year* — Students read Latin stories set in ancient Rome, studying grammar through feasting, bathing, piracy, gladiators, and political unrest.
- **Latin 3** — *Year* — Reviews grammar and introduces clauses, progressing to unadapted Latin through Livy, Pliny, and Catullus.
- **Latin 4** — *Year* — A literature course exploring the poetry of Catullus, Ovid, and Vergil, reading aloud to hear meter.
- **Latin 5** — *Advanced* — A prose and poetry literature course with a comparative-texts project spanning Vergil, Pliny, Catullus, Ovid, Vespucci, and Boccaccio.
- **AP Latin** — *AP* — Analyzing text, recognizing literary devices, and citing underlying themes for the AP Latin Exam.
- **Mandarin Chinese 1–5** — *Year* — Sequenced courses from Novice Mid to Intermediate Mid 1 across themes such as Greetings, Dining, and Travel.
- **Mandarin Chinese 6** — *Advanced* — Consolidates Intermediate Mid 2 abilities while exploring contemporary Chinese culture.
- **Mandarin Chinese 7** — *Advanced* — Continues Intermediate Mid 2 work through Education, Festivals, Environmental Challenges, and Healthy Living.
- **AP Chinese Language and Culture** — *AP · Gr 12* — Aural/oral skills, reading comprehension, grammar, and composition across the five goal areas.

Students completing Spanish/French/Chinese/German 6, 7, or AP, or enrolled in Latin 4+, may apply for the **Seal of Biliteracy**.

### Visual Arts (11 courses)

- **Foundations of Art and Design** — *Semester* — Students communicate visually through elements and principles of aesthetic design across drawing, painting, and 3D design.
- **Drawing** — *Semester* — Drawing as visual investigation involving perspective, proportion, rendering, and expression across media.
- **Painting** — *Semester* — A foundation of painting concepts with water-based and mixed media, brush technique, and basic color theory.
- **3D Design** — *Semester* — Three-dimensional elements through figurative and non-figurative sculpture, assemblage, ceramics, and installation.
- **Photography** — *Semester* — Traditional black-and-white darkroom processes plus digital color correction and manipulation in Adobe Photoshop.
- **Digital Media** — *Semester* — Adobe Photoshop, InDesign, Illustrator, and Premiere Pro for print, video, and web projects.
- **Studio Art** — *Semester* — For motivated students working independently, practicing various media, art criticism, and an individual exploratory approach.
- **Understanding Art: A Global View** — *Semester* — Fine art across cultures with focus on Postmodern and Global Contemporary periods.
- **Yearbook** — *Year* — A collaborative course using Photoshop and InDesign to design and produce the school's yearbook.
- **AP Art History** — *AP* — From Paleolithic cave paintings to contemporary works, covering historical styles, movements, and individual artists.
- **AP Art and Design** — *AP · Portfolio* — A year-long program of AP 2-D Art and Design, AP 3-D Art and Design, and AP Drawing.

### Performing Arts (16 courses)

- **Band** — *Year* — Students explore, rehearse, and perform wind band repertoire, also performing at athletic events as pep band.
- **Chorus** — *Year* — Students sing music representing a variety of genres, working for unified tone quality and intonation.
- **Jazz Ensemble** — *Year · Audition* — Instruction in performing jazz styles with preparation in improvisation, harmony, and chord/scale relationships.
- **Orchestra** — *Year* — Instruction and performance on orchestral stringed instruments, mastering tone, intonation, technique, and interpretation.
- **Theatre I: Introduction to Performance** — *Semester* — Theatrical performance from the actor's perspective through pantomime, improvisation, and scene work.
- **Theatre II: Advanced Acting** — *Semester* — Advanced techniques including Meisner and Stanislavski, musical theatre, and audition technique.
- **Theatrical Performing Arts Lab** — *Semester* — Students select, cast, design, rehearse, and produce a one-act play.
- **Theatre Around the World** — *Semester* — Global theatrical traditions including Japanese Noh, Indian Kathakali, UK Pantomime, and Theatre of the Oppressed.
- **Theatrical Production and Design** — *Semester* — Costumes, stage makeup, props, and stage management, learning sewing, special-effect makeup, and prop building.
- **RE(ACT): Theatre and Social Change** — *Semester* — Dramatic performance as social change, studying Augusto Boal's Theatre of the Oppressed.
- **Technical Theatre** — *Semester* — Students design and build scenery, paint backdrops, focus lighting, and create sound and special effects.
- **Honors Band** — *Honors · Gr 12* — For seniors who completed three years of Upper School Band, meeting audition requirements.
- **Honors Chorus** — *Honors · Gr 12* — For seniors who completed three years of Upper School Chorus, meeting audition requirements.
- **Honors Jazz Ensemble** — *Honors · Gr 12* — For seniors who completed three years of Upper School Band or Jazz Ensemble.
- **Honors Orchestra** — *Honors · Gr 12* — For seniors who completed three years of Upper School Orchestra.
- **AP Music Theory** — *AP* — Melody, harmony, texture, rhythm, form, and some history and style, entering with basic theory and notation skills.

### Physical Education and Health (7 courses)

- **Ninth Grade Health** — *Gr 9 · Required* — Students research, analyze, and set goals across spiritual, mental, physical, intellectual, environmental, and social health.
- **P.E. — Lifetime Wellness** — *Semester* — Fitness, health, and wellness concepts using heart rate monitors and fitness lab testing.
- **P.E. — Athletic Development** — *Semester* — Personal strength and movement enhancement through Olympic lifts, metabolic conditioning, plyometrics, and agility.
- **P.E. — Dancercise** — *Semester* — Students learn techniques from jazz to hip hop while improving fitness.
- **P.E. — Dancercise II** — *Semester* — Advanced dance and hatha yoga with advanced jazz and ballet movements plus mindfulness.
- **P.E. — Yoga and Mindfulness** — *Semester* — Yoga's history and philosophy alongside daily practice of poses and vinyasas.
- **P.E. — International Games** — *Semester* — Core fitness components with the history and play of games such as Sepak Takraw, Floorball, and Gaelic Football.

### Standalone elective

- **The Art and Science of Teaching** — *Gr 11-12* — Students explore the teaching profession through child development, psychology of learning, instructional practices, and classroom management.

## Middle School (Grades 6–8) — source S2

### Required core by grade

- **English 6** — *Gr 6* — Lays a foundation for effective communication through novels, poetry, short stories, and nonfiction, with paragraph structure and vocabulary in context.
- **Mathematics 6** — *Gr 6* — Built on number skills, measurement, geometry, patterns and functions, statistics and probability, logic, and algebra.
- **History 6** — *Gr 6* — Selected cultures of the ancient and medieval world, stressing note taking, research, map reading, and cooperative learning.
- **Science 6** — *Gr 6* — The first part of an integrated inquiry-based sequence, with units on properties of matter and organisms.
- **Physical Education/Health 6** — *Gr 6* — Weekly fitness-based exercise and sport skills plus seven weeks of health.
- **English 7** — *Gr 7* — Written and verbal expression through literature, composition, and mechanics, introducing thesis statements and the formal research paper.
- **Math 7** — *Gr 7* — Whole numbers, fractions, decimals, percent, ratios, proportions, powers and roots, equations, integers, and rational numbers.
- **Pre-Algebra 7 – Accelerated** — *Gr 7 · Accelerated* — Reinforces basic concepts as an introduction to algebra covering the number system, percents, and linear equations.
- **Advanced Pre-Algebra** — *Gr 7 · Advanced* — Extends Pre-Algebra with rational number computation, equations and inequalities, linear functions, polynomials, and factoring.
- **Science 7** — *Gr 7* — The second part of the integrated sequence, with units on catastrophic events and light and optics.
- **U.S. History 7** — *Gr 7* — An in-depth study of the formation and development of the U.S. from the Constitution to civil rights.
- **Physical Education/Health 7** — *Gr 7* — Fitness and sport instruction with FITNESSGRAM monitoring plus health discussion.
- **English 8** — *Gr 8* — Students synthesize skills from English 6 and 7, writing analytical essays across genres.
- **Pre-Algebra 8** — *Gr 8* — The traditional eighth-grade Pre-Algebra course covering the number system, percents, and linear equations and inequalities.
- **Algebra I-8 Accelerated** — *Gr 8 · Accelerated* — Algebraic expressions, linear and quadratic equations, systems, factoring, and radicals.
- **Advanced Algebra I** — *Gr 8 · Advanced* — Similar to Algebra I Accelerated with more emphasis on proofs, applications, and mathematical reasoning.
- **Science 8** — *Gr 8* — The final part of the integrated sequence, with units on human body systems and electricity.
- **Global Perspectives 8** — *Gr 8* — Countries, landforms, resources, climates, peoples, cultures, religions, and governmental systems.
- **Physical Education/Health 8** — *Gr 8 · Semester* — Fitness and health instruction with FITNESSGRAM monitoring.

### Middle School electives

**English:** Creative Writing 6 *(Gr 6, semester)*; World Myths and Legends *(Gr 6-7, semester)*; Lights, Camera, Action: Literature through Movies *(Gr 7-8, semester)*.

**Science:** The Amazing Human Body *(Gr 6-7, semester)*.

**History:** History in Action: Collaborative Research and Project Presentations *(Gr 7-8, fall)*; Contemporary Global Issues *(Gr 7-8, spring)*.

**IDEAS@PDS:** Computer Applications; Computer Programming; Robotics; Web Design; Introduction to Engineering 6; SPARK: Environmental Problem Solving by Design; Broadcast Media; Social Entrepreneurship: Incubation & Acceleration; Engineering the Future; Introduction to Personal Finance.

**Fine Arts:** Band 6, Band 7/8; Chorus 6, Chorus 7/8; Orchestra 6, Orchestra 7/8; Art 6; Art Foundations; Introduction to Art and Design; Introduction to Painting; Introduction to Printmaking; Introduction to 3D Design; Theatre Arts 6; Acting 1; Acting 2; Acting 3; Middle School Stagecraft; Communication Arts.

**Physical Education:** Movement & Yoga *(Gr 8 only, semester)*.

**World Language:** Exploring Latin through Mythology *(Gr 6-8, semester)*; Latin 1 *(Gr 7-12)*; Latin 2 *(Gr 8-12)*; French 1–4; German 1–3; Spanish 1–4; Mandarin Chinese 1–4.

## Lower School (TK–Grade 5) — sources S7, S8

**Providence Day does not publish named Lower School courses or a Lower School course-of-study
guide.** What IS published is four core curriculum areas plus a Special Area Class list — this is
the correct grain of published data for this division.

### Four core curriculum areas (S7)

- **Math** — Uses the concepts of Singapore Math for kindergarten through fifth grade, teaching the why and how behind concepts with bar modeling emphasized in Grades 2–5.
- **Language Arts** — A structured-literacy program beginning in TK, systematically fostering phonological awareness, phonics, fluency, vocabulary, and comprehension.
- **Science** — Uses inquiry-based methodology with open-ended challenges, empowering students to rely on their own reasoning.
- **Social Studies** — Students explore identity and community from the TK Goes Global unit outward to Charlotte and the world, with each grade level having its own focus.

### Special Area Classes (S7 — subject areas, not named courses)

Art · Physical Education · World Language · Learning Loft · Library · Music · Science Lab ·
Tech Tank · Band, Orchestra, Chorus · Theatre · IDEAS.

### World language pathway (S8, S9)

Students are exposed to French, Spanish, and Mandarin Chinese in their earliest years. By second
grade one language of study is selected for the remaining four years of Lower School — the start
of an "11-year journey toward language proficiency."

## Gaps — what Providence Day does not publish

1. **No IB Diploma Programme.** Providence Day does **not** offer the International Baccalaureate.
 Both 2025-26 catalogs (S1, S2) and the academics pages (S9, S5) contain zero occurrences of
 "International Baccalaureate," "IB Diploma," or "IB." PDS's second diploma is the school-designed
 **Global Studies Diploma**; it also references a Diploma in Entrepreneurial Studies with no
 published detail. Do not surface IB data for this school.
2. **Lower School named courses are not published.** Only subject areas and a Special Area Class
 list. There is no Lower School course-of-study PDF — verified by scraping all internal links
 off the Lower School page.
3. **German 6 and AP German have no course descriptions.** German appears in the AP prose list and
 Seal of Biliteracy eligibility text, and Years 1–6 are covered by the shared French/German/Spanish
 sequence descriptions, but there is no standalone AP German or German 7 catalog entry. German also
 caps at level 3 in Middle School. Treat AP German as offered-but-undescribed.
4. **AP course count is inconsistent across sources.** Catalog prose names 27 subject areas; the
 catalog body describes 28 AP courses; the Upper School landing page tallies sum to 30; a
 third-party aggregator says 30; an older college profile says 24. Use **28 courses / 27 subject
 areas**, both traceable to S1. Do not cite the third-party figures.
5. **The Upper School landing page course counts (S5) do not reconcile with the catalog.** S5 is
 marketing-side and should not be treated as authoritative over S1.
6. **Global Studies: Themes and Challenges** is a GSD-required option with no course description —
 its topic changes annually.
7. **No 2026-27 catalog published** as of 2026-07-26; the 2025-26 editions are current.
8. **Course availability caveats.** Calculus III, Linear Algebra, and Differential Equations are all
 marked "Offered when supported by course enrollment," and the two French 7 Advanced courses run
 in alternating years.


---

## Sources referenced across these documents

- https://resources.finalsite.net/images/v1597864340/provday/yreq3ftuqhypxp1quflw/2020-2021CourseofStudyUpperSchool.pdf
- https://resources.finalsite.net/images/v1690493877/provday/xvn9g3vbgghqjeyy0jxq/2023-2024UpperSchoolCourseofStudy.pdf
- https://resources.finalsite.net/images/v1759322022/provday/z3tij4sfwwhthez2vijd/2025-2026MiddleSchoolCourseofStudy.pdf
- https://resources.finalsite.net/images/v1759758182/provday/wekh9bxtsqah5givkjk2/2025-2026UpperSchoolCourseofStudy.pdf
- https://www.providenceday.org/fs/elements/34691?is_popup=true&post_id=<4490
- https://www.providenceday.org/fs/resource-manager/view/bc5f6760-48c2-4973-ad2c-4c464f495902
- https://www.providenceday.org/fs/resource-manager/view/f7d52609-86e2-49c2-9e61-e645bc828d0b
- https://www.providenceday.org/lower-school
- https://www.providenceday.org/lower-school/global-education
- https://www.providenceday.org/middle-school
- https://www.providenceday.org/the-pd-difference/academics
- https://www.providenceday.org/upper-school
