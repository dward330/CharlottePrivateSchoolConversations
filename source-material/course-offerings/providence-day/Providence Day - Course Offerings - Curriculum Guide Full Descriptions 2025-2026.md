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
Teachers use student-centered learning and stress skills such as listening, note taking, writing, reading,
comprehension, research, organization, map reading and cooperative learning. Students learn to appreciate,
understand, and compare early civilizations and world religions.
Science 6 - Year
Sixth grade science is the first part of an integrated, inquiry-based approach to middle school science. An
integrated approach to teaching science is one that includes topics from the major domains of science each year of
middle school. Inquiry-based methods maximize hands-on experiments by students and questioning strategies by
teachers to elicit deep learning. Major units of the sixth grade science curriculum are properties of matter (basic
chemistry) and organisms (basic biology). Lessons and activities within each unit meet National Science Education
Standards by following curricula written by the National Science Resources Center of the Smithsonian.
Physical Education/Health 6 - Year
This sixth grade course is designed to educate our students and equip them with the necessary life skills they will
need as they grow and mature. Students will spend time exploring the benefits of physical activity through weekly
fitness-based exercise as well as learning basic concepts and skills through a multitude of sports. The
FITNESSGRAM Physical Fitness Test will be administered each semester. At all times the values of
sportsmanship, fair play, and hard work will be taught and modeled. Additionally, they will spend seven weeks in
the health classroom discussing healthy communication, injury prevention/living life to the fullest,
alcohol/tobacco/drugs, the influence of culture, media, and technology on health, health promotion and disease
prevention, nutrition, and human development and sexuality.
Grade 6 (Electives)
Band 6 (Grade 6) – Year
Band 6 is for students with approximately one year of music instruction or experience playing a band instrument.
Students work in an ensemble setting to explore, rehearse, and perform repertoire written for wind band. The class
focuses on the development of fundamental musical skills in the areas of rhythmic interpretation, technical
development, and the reading of musical notation. Several performances are planned throughout the year. Concert
attire is required. Students who wish to enroll without prior band experience should contact the band director.
```

===== PAGE 12 =====

```text
Chorus 6 (Grade 6) – Year or Semester
Students in Chorus 6 study and perform choral literature of various genres. Singers are instructed in proper vocal
technique while learning elements of musical structure and basic music theory. Several performances are planned
throughout the year. Each semester offers new performance opportunities and repertoire. Concert attire is required.
Orchestra 6 (Grade 6) – Year
Orchestra 6 is for students with at least one year of music instruction or experience playing an orchestral stringed
instrument. The curriculum reinforces and introduces a variety of technical skills for the performance of string
orchestra repertoire. Several performances are planned throughout the year. Concert attire is required. Prior strings
experience is required. Students who wish to enroll without prior strings experience should contact the orchestra
director.
Communication Arts (Grades 6 - 8) Semester (both)
Excellent communication is the key to helping students impress, stand out, and inspire action as they move on in
higher education and eventually into the workforce. This course focuses on overcoming communication
apprehension and providing students with opportunities to practice and reinforce the skills needed to be effective,
confident communicators in a variety of situations, including public speaking, in a comfortable, encouraging
atmosphere.
Theatre Arts (Grade 6) – Semester (offered both Semesters)
This course introduces students to the tools and skills needed for successful theatrical performances, including:
concentration, observation, imagination, self-confidence, vocal production and expression, physical movement, and
collaboration. The basic elements of acting techniques are studied and demonstrated through the performance of
scenes and various other dramatic presentations. Students in this course read plays, act in a variety of types of
theatrical performances, practice playwriting, and engage in games and exercises that teach good performance
habits as well as build confidence and encourage positive collaboration.
Special requirement: Students are required to attend one live theatrical performance produced at PDS during the
semester they are in the class.
Art 6 – (Grade 6) Semester, may be taken for either a semester or full year
Art 6 explores observational drawing and compositional techniques in drawing, painting, clay, and collage. Students
are introduced to selected art history topics and art criticism. With emphasis on creativity and craftsmanship, each
assignment in Art 6 is simultaneously challenging and fun.
Creative Writing (Grade 6) – Semester
In this class, students have the opportunity to work together as writers. They will read works of their own choosing
and respond to them creatively. They will write a personal narrative, a short story, and a variety of poems. Using
the writing process, these young writers will learn to develop their ideas and to accept useful responses from each
other as they polish their pieces. The class will become a community of writers who provide an encouraging
audience for one another.
World Myths and Legends (Grade 6 and 7) – Semester
In this semester elective, come read, hear, watch, create, write, act, and illustrate a world of stories. Our journey
will take us through myths and legends from six different continents, and we’ll meet characters like King Arthur,
```

===== PAGE 13 =====

```text
Ching Shih the Pirate Queen, Loki, Mulan, Beowulf, Rama, Anansi the Spider, Sundiata Keita, and the Sasquatch.
We’ll go on quests with heroes and meet supernatural creatures, and we’ll discuss all the gods, goddesses,
heroes, tricksters, mythical creatures, and everyday people who get caught up in legendary tales. This course is a
semester elective for sixth and seventh graders.
The Amazing Human Body (Grades 6 and 7) – Semester
This course will cover the main human body systems at a general level appropriate for 6th and 7th grade students.
Class time will be spent learning about the makeup and function of the heart, lungs, guts, brain, bones, muscles,
nerves, and more. There will be many opportunities for hands-on learning with lab specimens, models, and
microscopes, and general first aid, CPR, and guest speakers will add to the fun of this exciting elective.
Exploratory Latin through Mythology (Grades 6, 7, 8)
This semester course is a whirlwind introduction to the language and mythology of ancient Rome. It invites
students to read, write, and speak simple Latin sentences as they explore the Greco-Roman gods, heroes, and
monsters. Students will learn where, when, and by whom Latin was spoken as they venture into the experience of
classical language acquisition. As a class, students will learn to make connections between Latin and modern
languages; and will learn about Rome’s lasting impact on the world.
Year 1 or 2 courses in French, German and Spanish
These courses are for beginning language students working towards achievement of benchmarks for the Novice
High* proficiency level - i.e. expressing themselves in simple conversations and presentations on familiar topics
using highly practiced, memorized words and phrases. Students are able to understand speech dealing with areas
of practical need such as highly standardized messages, phrases, and instructions surrounding familiar topics such
as “Who am I?,” “Let’s go shopping!,” “What do you like to do?,” “My family”.
Mandarin Chinese 1
This course is for beginning language students working towards achievement of the Novice Mid proficiency level
benchmarks - i.e. using words, phrases and simple memorized sentences to practice and improve upon
comprehension and communicative skills. Themes include: “Greetings,” “Family,” “Hobbies,” “Dates and Time,”
“Visiting Friends,” and “Weather.”
Mandarin Chinese 2
Students in Year 2 will build upon the foundation set in Year 1 and work toward the benchmarks of the Novice High
proficiency level. Focus will be placed on keeping a conversation going by asking follow up questions on the same
topic and working to understand and talk around words that students may not know. Students are able to
understand speech dealing with areas of practical needs in highly standardized messages, phrases, or instructions
on familiar topics such as “Making Appointments,” “Studying Chinese,” “School Life,” “Shopping,”, and
“Transportation.”
Year 2 course prerequisite: Successful completion of Year 1, with a “B-” (80) or better. Successful completion of the
Lower School Mandarin Chinese and fifth grade world language teacher approval. (Year)
```

===== PAGE 14 =====

```text
Introduction to Engineering 6 – 2nd Semester
This course appeals to the budding scientist entering middle school who wants to develop and hone their
problem-solving and project-based skills. It is designed to pique the interests of 6th graders who want a hands-on
science experience, and introduce the student to the world of STEM (science, technology, engineering and math).
Computer Applications (Grades 6, 7 & 8) – Semester
In Computer Applications students develop practical digital and media literacy skills through a variety of projects.
Projects include a family oral history audio interview, sketchnoting, and interactive digital writing assignments
focusing on effectively using text, images, and hyperlinks to communicate with an outside audience. Students
develop critical thinking and web literacy skills learning how to apply the “SIFT” framework to STOP when
encountering new online information, INVESTIGATE the source, FIND better coverage, and TRACE claims, quotes
and media back to their original context. Students practice keyboarding skills, focusing on improving both speed
and accuracy. Students further develop digital storytelling skills, and practice wisely using WikiPedia as a
“launchpad” for research using other, additional sources. The safe and legal reuse of images in media projects and
respect for intellectual property / copyright is emphasized, as well as ways to safely and constructively share ideas
and interact with others online, as good digital citizens. Scientific and intellectual curiosity are cultivated regularly
through the discussion of weekly “Wonder Links.” Students learn to create basic websites with Google Sites,
sharing their class projects in a digital portfolio.
Computer Programming (Grades 6, 7 & 8) – Semester
This course concentrates on interactive programming using Scratch, an innovative graphical programming
language developed at The Massachusetts Institute of Technology. Students learn to create animations, build
interactive narratives, and program simple games. Scratch is designed to teach logical and computational thinking
skills, fundamental principles of programming and provide both a "low bar and high ceiling" for computer
programming.
Robotics (Grades 6, 7 & 8) – Semester
This course introduces students to the fundamentals of robot development and design using Lego Spike Prime
robotic kits and a "Scratch-like" / block-based programming language. Skills taught include applied physics,
mathematical concepts, and robotic programming. The course uses a practical, project-based approach for delivery
of course content. Work is individual as well as group / team-based.
Web Design (Grades 6, 7, & 8) (Prerequisite: Computer Applications) – Semester
This course will expose students to the power, usefulness and fun of the Internet. Each student will create several
HTML projects using a variety of publishing tools. They will learn to use the World Wide Web for research and in
turn publish their results in a variety of ways. Further, they will use the input devices available IPAD, digital camera,
etc. - to add excitement and interest to their work. Prerequisite: Computer Applications
SPARK : Environmental Problem Solving by Design (Grades 6, 7, & 8) - Semester
Students will be immersed in the design thinking and engineering design processes in order to investigate local,
national, or global environmental issues. Using the UN Sustainable Goals as a framework, students will have the
opportunity to analyze data to evaluate community needs and create prototypes, products, or legislation in order to
resolve an issue. Students will sharpen research skills while sharing their creativity through engineering challenges.
Students will also partner with MS and US classes and clubs to enhance the sustainability initiatives around
```

===== PAGE 15 =====

```text
campus. Students will wrap up the semester by developing and presenting their own solutions to sustainability
around the world.
Study Hall – 1st Semester and/or 2nd Semester
This class is a supervised, quiet period in which students are expected to work on homework, reading, reports, or
projects. This class will meet in the library or teacher’s classroom.
Grades 7-8
Study Hall – 1st Semester and/or 2nd Semester
This class is a supervised, quiet period in which students are expected to work on homework, projects, reports, or
reading. This class will meet in the library or the teacher’s classroom.
English
English (Grade 7) - Year
Seventh grade English emphasizes both written and verbal expression through the study of literature, composition,
and writing mechanics. The focus is on writing as a process, emphasizing all steps: invention (prewriting), drafting,
and revising. Students are introduced to writing a thesis statement, using textual evidence to support a thesis, and
crafting a formal research paper. Mechanics and usage are taught in conjunction with writing instruction. The
literature program includes the study of short stories, non-fiction pieces, modern poetry, and select novels.
Organization and responsibility for completing and submitting assignments on time are stressed.
English (Grade 8) - Year
Eighth grade English students learn to synthesize the skills, terms, and concepts to which they have been
introduced in English 6 and 7. In this culminating year of middle school, students write analytical essays on several
genres of literature, using literary terminology. Students learn to analyze a text independently, and they employ new
and familiar concepts in their own descriptive and narrative writing. Grammar lessons treat mechanics and usage
as vital elements of clear and effective expression. The ultimate goal is for eighth graders to build a strong sense of
self through becoming independent writers and thinkers.
English Electives
World Myths and Legends (Grade 6 and 7) – Semester
In this semester elective, come read, hear, watch, create, write, act, and illustrate a world of stories. Our journey
will take us through myths and legends from six different continents, and we’ll meet characters like King Arthur,
Ching Shih the Pirate Queen, Loki, Mulan, Beowulf, Rama, Anansi the Spider, Sundiata Keita, and the Sasquatch.
We’ll go on quests with heroes and meet supernatural creatures, and we’ll discuss all the gods, goddesses,
heroes, tricksters, mythical creatures, and everyday people who get caught up in legendary tales. This course is a
semester elective for sixth and seventh graders.
```

===== PAGE 16 =====

```text
Lights, Camera, Action: Literature through Movies (Grade 7 and 8)- Semester
This is a writing focused course which uses a variety of films as the foundation of understanding how meaning is
conveyed. In the same way literature is used to learn key concepts such as tone, imagery, or symbolism, this
course will use the visual platform found in movie making to further comprehend how storytellers create these and
other “literary” devices onto the big screen. Key concepts from Language Arts will be included into the curriculum
in an attempt to create the foundational knowledge, reinforce existing understanding, or deepen the understanding
of topics related to the students’ Language Arts classes.
Mathematics
Placement for mathematics in 7th grade is made after careful consideration of the most appropriate level for each
individual. Course assignment is based on concept mastery, assessment performance, standardized test scores,
and teacher recommendations. Parents will be notified in writing in the spring as to their child’s assignment.
Placement tests will also be administered, when appropriate.
Math (Grade 7) - Year
The traditional seventh grade math course emphasizes continuous and recurring practice on the basic
mathematical concepts and operations of whole numbers, fractions, and decimals. Students work with percent,
ratios and proportions, powers and roots, solving equations and inequalities, integers, and rational numbers. In
addition, they explore math study skills, the use of the calculator, and problem solving strategies.
Pre-Algebra (Grade 7 or 8) – Year (Department Recommendation Required for 7th Graders-
Accelerated)
Pre-Algebra reinforces the basic mathematical concepts and serves as an introduction to Algebra. It includes a
thorough study of the number system, percents, linear equations and inequalities. Graphing linear equations and
inequalities are explored and topics such as geometry are discussed. The application of these topics through
problem solving is emphasized. Calculators will be used to strengthen problem-solving strategies. Pre-Algebra, a
traditional eighth grade course, is offered to seventh grade students whose past performance in class and on
standardized tests demonstrates the ability for an accelerated program.
Advanced Pre-Algebra (Grade 7) – Year (Department Recommendation Required)
Advanced Pre-Algebra is offered to those students whose past record and aptitude in mathematics indicates a
readiness for advanced work. This course extends the traditional Pre-Algebra curriculum and includes such topics
as rational number computation, solving equations and inequalities, linear functions, polynomials, and factoring. A
special emphasis is placed on developing problem-solving skills and using algebra to solve word problems.
Algebra I-8 Accelerated (Grade 8) – Year (Prerequisite – Pre-Algebra 7)
Algebra I-8 Accelerated is available to those students who have completed Pre-Algebra. The principles taught in
this course serve as a foundation for the entire sequence of Upper School mathematics courses and emphasize
the structure of our number system, algebraic manipulations, and the solution of various equations and inequalities.
Topics include algebraic expressions, linear and quadratic equations, systems of equations, inequalities, absolute
value, graphing, factoring, rational expressions, radicals and the application of these concepts to word problems.
Students will use graphing calculators to discover and reinforce relationships and function concepts and to extend
problem-solving strategies.
```

===== PAGE 17 =====

```text
Advanced Algebra I (Grade 8) – Year (Prerequisite – Advanced Pre Algebra)
Advanced Algebra I is similar to Algebra I Accelerated but puts more emphasis on proofs, applications, and
mathematical thinking and reasoning. Topics include algebraic expressions, linear and quadratic equations,
systems of equations, inequalities, absolute value, graphing, factoring, rational expressions, and radicals. In
addition, there is a strong emphasis on word problems and the development of problem-solving skills. Calculators
will be utilized for understanding the graphing of various functions and to strengthen problem-solving techniques.
Science
Science 7 - Year
Seventh grade science is the second part of an integrated, inquiry-based approach to middle school science. An
integrated approach to teaching science is one that includes topics from the major domains of science each year of
middle school. Inquiry-based methods maximize hands-on science learning by students. Major units of the seventh
grade science curriculum are catastrophic events (weather, earthquakes, and volcanoes), and the nature of light
and optics. Lessons and activities within each unit meet National Science Education Standards by following
curricula written by the National Science Resources Center of the Smithsonian.
Science 8 - Year
Eighth grade science is the final part of an integrated, inquiry-based approach to middle school science. An
integrated approach to teaching science is one that includes topics from the various domains of science each year
of middle school. Inquiry-based methods maximize hands-on science learning by students. Major units of the
eighth grade science curriculum include human body systems (basic anatomy and physiology) and electricity
(energy and alternative resources.). Lessons and activities within each unit meet National Science Education
Standards by following curricula written by the National Science Resources Center of the Smithsonian.
Science Electives
The Amazing Human Body (Grades 6 and 7) – Semester
This course will cover the main human body systems at a general level appropriate for 6th and 7th grade students.
Class time will be spent learning about the makeup and function of the heart, lungs, guts, brain, bones, muscles,
nerves, and more. There will be many opportunities for hands-on learning with lab specimens, models, and
microscopes, and general first aid, CPR, and guest speakers will add to the fun of this exciting elective.
History
United States History 7 - Year
This course provides an in-depth study of issues integral to the formation and development of the United States. By
examining major themes and events from the Constitution to civil rights, students gain an understanding of the
social, geographic, political, and economic forces that continue to shape our nation and world today. In addition,
students learn to relate the past to the present through an ongoing analysis of current events. This course also
focuses on study skills and effective thinking methods that may be applied to other disciplines.
```

===== PAGE 18 =====

```text
Global Perspectives (Grade 8) - Year
The curriculum examines countries, landforms, resources, climates, peoples, cultures, religions, and governmental
systems. Students strive to develop an appreciation of diverse cultures, enhance global awareness about political
events and physical locations, and understand maps, globes, statistics, and graphs. Emphasis is placed on critical
thinking, research, reading, and study skills.
History Electives
History in Action:Collaborative Research and Project Presentations based on Student
Choice (Grades 7,8) – Fall Semester
In History in Action, Providence Day Middle School students are offered a unique opportunity to engage in an
in-depth historical inquiry on a topic of their choosing. Over the course of the semester, students will focus on
honing essential research skills, developing a strong thesis, and analyzing primary and secondary sources.
Students will learn to construct evidence-based arguments, recognize historical context, and present findings in
one of five presentation categories: website, documentary, exhibit, performance, or research paper.
Whether working individually or collaboratively, students will deepen their understanding of history and enhance
skills in critical thinking, research, and effective communication. This course will culminate in school-level
presentations to classmates and other members of the PDS community.
Contemporary Global Issues (Grade 7,8) – Spring Semester
The goal of this class is to help students think beyond themselves in an ever-changing world. In this course,
students investigate selected current events and issues from around the world in depth. Through multiple projects
and assignments, the students learn the historical context of the issues and apply that knowledge to the present,
allowing them to make predictions and formulate solutions to problems. The teacher chooses the content based on
the most interesting and significant current events.
World Languages
Semester Course:
Exploring Latin through Mythology (Grades 6, 7, 8)
This semester course is a whirlwind introduction to the language and mythology of ancient Rome. It invites
students to read, write, and speak simple Latin sentences as they explore the Greco-Roman gods, heroes, and
monsters. Students will learn where, when, and by whom Latin was spoken as they venture into the experience of
classical language acquisition. As a class, students will learn to make connections between Latin and modern
languages; and will learn about Rome’s lasting impact on the world.
Year Long Courses:
Year 1 course in French, German and Spanish
These courses are for beginning language students working towards achievement of benchmarks for the Novice
High* proficiency level - i.e. expressing themselves in simple conversations and presentations on familiar topics
using highly practiced, memorized words and phrases. Students are able to understand speech dealing with areas
```

===== PAGE 19 =====

```text
of practical need such as highly standardized messages, phrases, and instructions surrounding familiar topics such
as “Who am I?,” “Let’s go shopping!,” “What do you like to do?,” “My family”.
Year 2 course in French, German and Spanish
Students in Year 2 will build upon the foundation set in Year 1 as students work toward the benchmarks of the
Intermediate Low proficiency level. Further practice initiating, sustaining and bringing to a close conversations
revolving around familiar situations (themselves, family, friends, school) will be the focus. At this level, students are
encouraged to speak as much as possible and to try adding something more (another fact, thought, or question) to
keep the conversation going. Communicative tasks will require students to create with the language in
straightforward social situations, restricted to the concrete exchanges and predictable topics necessary for survival
in the target-language culture. Themes include: “Going Out,” “Traveling,” “Vacation,” “Activities,” “My Routine,” and
“Health.”
Year 3 courses in French, German and Spanish
These courses build upon the foundation set in Year 2 as students begin to work towards achievement of
benchmarks for the Intermediate Mid 1 proficiency level, i.e. being able to handle successfully a limited number of
uncomplicated communicative tasks and creating with the language using compound sentences. Students will be
required to ask questions in order to sustain a conversation and practice adding new information in order to
achieve completion and clarity.
Year 3 course prerequisite: Successful completion of Year 2, with a “B-” (80) or better. (Year)
Latin 1:
This course familiarizes students with classical language acquisition through a combined study of language, its historical
context, and its impact on the modern world. Students increase their Latin (and English) vocabulary, develop their
reading comprehension skills, learn basic Latin structures, and explore the many cultural aspects of ancient Rome.
Students will comprehend classroom commands in Latin and will be able to respond to simple questions. Themes
include: daily life of a wealthy Roman family, gods and heroes, murderers and rulers, building a city and entertaining the
masses.
No prerequisite (Year)
Latin 2:
In Latin 2, students read Latin stories set in the ancient metropolis of Rome. In addition to strengthening their Latin
vocabulary base, students increase their knowledge of the language through the intentional study of grammar concepts
and through interpreting stories of increasing complexity. These lively stories invite comparisons with modern diverse
cultural practices. Themes include: feasting with friends, public bathing, piracy, gladiatorial combat, political unrest,
resistance, and propaganda.
Prerequisite: Successful completion of Latin 1, with a “B-” (80) or better. (Year)
Mandarin Chinese 1
This course is for beginning language students working towards achievement of the Novice Mid proficiency level
benchmarks - i.e. using words, phrases and simple memorized sentences to practice and improve upon
```

===== PAGE 20 =====

```text
comprehension and communicative skills. Themes include: “Greetings,” “Family,” “Hobbies,” “Dates and Time,”
“Visiting Friends,” and “Weather.”
Mandarin Chinese 2
Students in Year 2 will build upon the foundation set in Year 1 and work toward the benchmarks of the Novice High
proficiency level. Focus will be placed on keeping a conversation going by asking follow up questions on the same
topic and working to understand and talk around words that students may not know. Students are able to
understand speech dealing with areas of practical needs in highly standardized messages, phrases, or instructions
on familiar topics such as “Making Appointments,” “Studying Chinese,” “School Life,” “Shopping,”, and
“Transportation.”
Year 2 course prerequisite: Successful completion of Year 1, with a “B-” (80) or better. Successful completion of the
Lower School Mandarin Chinese and fifth grade world language teacher approval. (Year)
Mandarin Chinese 3
Students in Year 3 will build upon the foundation set in Year 2 as students work toward the benchmarks of the
Intermediate Low proficiency level. Further practice initiating, sustaining and bringing to a close conversations
revolving around familiar situations (themselves, family, friends, school) will be the focus. At this level, students are
encouraged to speak as much as possible and to try adding more information (another fact, thought, or question) to
keep the conversation going. Communicative tasks will require students to create with the language in
straightforward social situations, restricted to concrete exchanges and predictable topics necessary for survival in
the target-language culture. Themes include: “Dining,” “Asking Directions,” “Birthday Party,” “Seeing a Doctor”, and
“Hanging Out”.
Year 3 course prerequisite: Successful completion of Year 2, with a “B-” (80) or better. (Year)
Physical Education
Physical Education/Health 7 - Year
In this course, students will explore the importance of careful decision-making and the physical impact daily
choices have on us. Course content includes learning the fundamentals, strategies, and rules of individual and
team sports, as well as health and sports-related fitness components. The incorporation of heart rate monitors and
fitness days educate our students on fundamental ways to exercise and stay fit. The FITNESSGRAM Physical
Fitness Test will be administered each semester. At all times the values of sportsmanship, fair play, and hard work
will be taught and modeled. Additionally, they will spend seven weeks in the health classroom diving into projects
and discussions on healthy communication, injury prevention/living life to the fullest, alcohol/tobacco/drugs, health
promotion and disease prevention, the influence of culture, media, and technology on health, nutrition, and human
development and sexuality.
Physical Education/Health 8 - Semester
This course is designed to build upon the foundation of physical, social, and sports-related skills taught in 6th and
7th grade. Additionally, students are introduced to the Wellness Center and spend time exploring the benefits and
demands of varying forms of resistance training. Students will also learn muscle groups, training principles, and a
variety of lifts and exercises. Heart rate monitors are used in the Wellness Center as well as the gym to assist in
their understanding of exertion, as pertaining to their overall fitness level. The FITNESSGRAM Physical Fitness
```

===== PAGE 21 =====

```text
Test will be administered throughout the semester as a tool to monitor student’s development. Students will be
encouraged to assess and work towards improving their level of physical fitness. Finally, students will spend time in
the health classroom throughout the semester diving into discussions regarding alcohol/tobacco/drugs, mental &
emotional health, nutrition, and human development and sexuality.
PE Elective
Movement & Yoga - Semester (8th grade only)
The aim of this course is to give students an introduction and exposure to dance, yoga, and mindfulness while
providing them with an athletic and creative outlet. Students will learn how to properly stretch and physically warm
their bodies up for dance to help improve their mobility and flexibility. They will be introduced to the world of dance
through jazz and ballet. Students will be introduced to hatha yoga and learn practices to help promote self-care and
mindfulness. Students will participate in groups to lead the class in a physical warm-up and a yoga sequence using
the knowledge they gain throughout the semester.
IDEAS@PDS
This reimagined department serves our students by bringing together Innovation, Design, Entrepreneurship,
Analytics, and Sustainability. IDEAS@PDS is a TK-12 initiative that invites faculty and students to work across
boundaries and at the intersections of traditional disciplines and departments. The learning arising from these
courses always aims at applied, collaborative problem solving. Students have the opportunity to identify challenges
they care about and want to pursue calling upon skills and mindsets delineated in the PD Passport.
Computer Applications (Grades 6, 7 & 8) – Semester
In Computer Applications students develop practical digital and media literacy skills through a variety of projects.
Projects include a family oral history audio interview, sketchnoting, and interactive digital writing assignments
focusing on effectively using text, images, and hyperlinks to communicate with an outside audience. Students
develop critical thinking and web literacy skills learning how to apply the “SIFT” framework to STOP when
encountering new online information, INVESTIGATE the source, FIND better coverage, and TRACE claims, quotes
and media back to their original context. Students practice keyboarding skills, focusing on improving both speed
and accuracy. Students further develop digital storytelling skills, and practice wisely using WikiPedia as a
“launchpad” for research using other, additional sources. The safe and legal reuse of images in media projects and
respect for intellectual property / copyright is emphasized, as well as ways to safely and constructively share ideas
and interact with others online, as good digital citizens. Scientific and intellectual curiosity are cultivated regularly
through the discussion of weekly “Wonder Links.” Students learn to create basic websites with Google Sites,
sharing their class projects in a digital portfolio.
Computer Programming (Grades 6, 7 & 8) – Semester
This course concentrates on interactive programming using Scratch, an innovative graphical programming
language developed at The Massachusetts Institute of Technology. Students learn to create animations, build
interactive narratives, and program simple games. Scratch is designed to teach logical and computational thinking
skills, fundamental principles of programming and provide both a "low bar and high ceiling" for computer
programming.
```

===== PAGE 22 =====

```text
Robotics (Grades 6, 7 & 8) – Semester
This course introduces students to the fundamentals of robot development and design using Lego Spike Prime
robotic kits and a "Scratch-like" / block-based programming language. Skills taught include applied physics,
mathematical concepts, and robotic programming. The course uses a practical, project-based approach for delivery
of course content. Work is individual as well as group / team-based.
Web Design (Grades 6, 7, & 8) (Prerequisite: Computer Applications) – Semester
This course will expose students to the power, usefulness and fun of the Internet. Each student will create several
HTML projects using a variety of publishing tools. They will learn to use the World Wide Web for research and in
turn publish their results in a variety of ways. Further, they will use the input devices available IPAD, digital camera,
etc. - to add excitement and interest to their work. Prerequisite: Computer Applications
Broadcast Media (Grades 7 & 8) - Semester
This course is designed to give Middle School students experience with television production. Students experience
both the creative and technical aspects of filmmaking in conjunction with learning about historical and present day
traditions and conventions. Students are instructed on the three stages of project creation. In pre-production,
students learn the basic principles of story development, screenplay writing, storyboarding, and scheduling.
Instruction in the production stage includes basic visual composition, color theory, set up and operation of camera,
sound, and lighting equipment. Students learn to use software applications for video and audio post-production.
Students will work in small groups to create narratives and short films. Students may be working at different
locations throughout campus (with teacher supervision) at times to film a story.
Social Entrepreneurship: Incubation and Acceleration (Grades 7 & 8) - Semester
If you have enjoyed the PD Hackathons or are interested in developing your startup skills, then this class is for you!
Middle-school students will participate in a series of interdisciplinary innovation and entrepreneurial sprints over the
course of a semester. In between each of these sprints, they will read, watch, analyze, discuss, and write about
texts (literary, auditory, and visual) with an eye toward developing analytical skills and a more wide-ranging
understanding of entrepreneurial endeavors in order to apply rapid learning adaptation to the next iteration or
challenge. This class will look to push students to reconsider how they form ideas to address problems and make
tangible solutions.
Students will regularly work with partners or in groups to iterate and discuss topics of interest from the reading.
Research and contextualization of historical and current events related to value, loans, credit, various financial
markets and institutions, contracts, and contemporary issues will occur frequently. Guest speakers will join the
class with regularity. This course will allow students to Embark as Global Citizens without leaving the confines of
Charlotte, though we sincerely hope this class will push students to more seriously consider traveling abroad to
further their education.
SPARK : Environmental Problem Solving by Design (Grades 6, 7, & 8) - Semester
Students will immerse in the design thinking and engineering design processes in order to investigate local,
national, or global environmental issues. Using the UN Sustainable Goals as a framework, students will have the
opportunity to analyze data to evaluate community needs and create prototypes, products, or legislation in order to
resolve an issue. Students will sharpen research skills while sharing their creativity through engineering challenges.
Students will also partner with MS and US classes and clubs to enhance the sustainability initiatives around
```

===== PAGE 23 =====

```text
campus. Students will wrap up the semester by developing and presenting their own solutions to sustainability
around the world.
Engineering the Future 7/8 – 1st Semester
This course is designed to introduce students to the world of technology and engineering. Students in 7th and 8th
grades will be involved in labs and hands-on activities that promote the concepts of STEM (science, technology,
engineering and math). Special emphasis is given to engage students in engineering activities that will provide
benefits to the local and global community.
Introduction to Personal Finance (Grade 8) - Semester
Students will learn the ins and outs of money management in an exciting, interactive, collaborative, and fully
accessible class that focuses on the real world applications of personal finance. Topics and skills taught include
taxes, creating checking/savings accounts, paying for college, types of credit, managing credit, basic investing
skills, insurance, career management, budgeting, and understanding positive financial behavior.
Fine Arts Electives
Band (Grades 7/8) – Year
(Prerequisite – Prior Band Experience)
Band 7/8 is designed for students with more than one year’s instruction on a band instrument. Students work in an
ensemble setting to explore, rehearse, and perform varying styles of repertoire for wind bands. The class focuses
on the development of fundamental musical skills in the areas of rhythmic interpretation, technical development,
and the reading of musical notation. Band 7/8 performs on and off campus several times each year. Concert attire
is required. Students who wish to enroll without prior band experience should contact the band director.
Chorus (Grades 7/8) – Year or Semester
Students in Chorus 7/8 study and perform choral literature of various genres. Singers are instructed in proper vocal
technique while learning elements of musical structure and basic music theory. The chorus performs on and off
campus throughout the year. Each semester offers new performance opportunities and repertoire. Concert attire is
required.
Orchestra (Grades 7/8) – Year
(Prerequisite – Prior Strings Experience)
Orchestra 7/8 is designed for students with more than one year’s instruction on an orchestral stringed instrument.
Students rehearse and perform a variety of intermediate and advanced repertoire, as they continue to refine
musical and technical skills. Several performances, including off-campus trips are planned throughout the year.
Concert attire is required. Students who wish to enroll without prior strings experience should contact the orchestra
director.
Acting 1 (Grades 7 & 8)- Semester
The curriculum for this course builds on the basics introduced in Theater 6 and focuses primarily on modern
performance. The techniques and mechanics of acting will be studied, including vocal production and exploring
physicality and character psychology. Students will interpret and analyze plays, concentrating on characters and
their portrayal. Scenes and other dramatic presentations will be produced. Units in this course include:
Improvisation; Stage Combat; Character Analysis; Monologues; Duet Scenes; and Musical Theatre.
```

===== PAGE 24 =====

```text
Special Requirement: Students are required to attend one PDS production during the semester they are in class.
Acting 2 - Acting Through the Ages (Grades 7 & 8) - Semester
Students in this course will explore theatrical development from significant historical periods, representing a variety
of different countries and eras. They will read plays from each of these periods and engage in an in-depth analysis
of scripts, language, themes, and characters. The techniques and mechanics of period-style acting will be practiced
as students move beyond modern acting to perform in the style of each period. Units of study include: Rituals of
Ancient Man; Greek Theatre (Comedy/Tragedy); Roman Theatre (Pantomime/Farce); Medieval (European)
Theatre (Shakespeare); Japanese Noh Drama; American Musical Theatre.
*Special Requirements: Attendance at a PDS production during the semester in which the course is offered is
required.
Acting 3 - Production Practices [One Act Play] (Grades 7 & 8) - Semester
(Prerequisite: Prior Theatre Experience Required)
The students in this course will review the acting techniques and stage conventions and use this foundation to aid
them in mounting a one-act play. Students will be involved in every aspect of the rehearsal process and essential
steps in play production, including: acting, creating props, costumes, and set pieces, and involvement in sound and
lighting choices. Students will perform for an audience at PDS. Additional units of study may include: Children’s
Theater, Reader’s Theater, dramatic acting, playwriting, or auditioning.
*Special Requirements: Students are required to attend one PDS production during the semester they are in class.
Communication Arts (Grades 6 - 8) Semester
Excellent communication is the key to helping students impress, stand out, and inspire action as they move on in
higher education and eventually into the workforce. This course focuses on overcoming communication
apprehension and providing students with opportunities to practice and reinforce the skills needed to be effective,
confident communicators in a variety of situations, including public speaking, in a comfortable, encouraging
atmosphere.
Stagecraft (Grades 7 & 8) – Semester
Students in this course will engage in stagecraft production for mainstage PDS shows. Focus will be placed on
safety, construction, stage geography, common terminology, basic design elements, and the roles of tech
personnel. Students will discuss, examine, and demonstrate the basic elements involved in producing a live
production. Emphasis will be placed on set and prop construction, set painting, lighting for the stage and its
instruments, and basic sound knowledge. Students will demonstrate a working knowledge of safety measures and
precautions used in technical theatre construction, as well as identify different types of instruments, tools, and other
equipment commonly used in the production process.
*Special Requirements: Attendance at a PDS production during the semester in which the course is offered is
required.
Art Foundations (Grades 7 & 8) - Semester
This course is designed to build students’ skills and confidence, preparing them for the next level courses. Students explore
mostly drawing and painting techniques, mixed media and 3D design. This course serves as a prerequisite for our next level
Intro courses and can only be taken once.
```

===== PAGE 25 =====

```text
Introduction to Art and Design (Grades 7 & 8) (Prerequisite – Art Foundations) – Semester
The experienced middle school artist demonstrates originality and creativity in all assignments. Imagination,
manipulation of media, and effective self-evaluation are vital parts of this course. Students verbally discuss their
work and those of their classmates in critique sessions. Major units of study include drawing, painting, clay hand
building, and printmaking techniques and processes. Students may enroll in this course only once in middle school.
Several art projects include art historical references.
Introduction to Painting (Grades 7 & 8) (Prerequisite – Art Foundations) – Semester
While exploring various painting techniques and processes, major units of study in this course include acrylic,
watercolor, and mixed media. Student work is created on a variety of materials including canvas, paper, and wood
panels. All assignments integrate art historical references including contemporary art and artists from diverse
cultures.
Introduction to Printmaking (Grades 7 & 8) (Prerequisite – Art Foundations) – Semester
Students will become familiar with both traditional and contemporary printmaking processes. This will include
multiple relief printing techniques: Lino soft cut and collographs. Students will work with gelli printing techniques
and layering with other materials and mediums. Cyanotypes and screen printing will also be part of this class.
Prerequisite: Art Foundations.
Introduction to 3D Design (Grades 7 & 8) (Prerequisite – Art Foundations) – Semester
Student-artists explore various three-dimensional art media, techniques, and processes. This course challenges
students to creatively solve three-dimensional assignments in a variety of media including wire, paper-mache, and
clay. At least one assignment will be collaborative. Projects integrate art historical references including
contemporary art and artists from diverse cultures.
World Language Electives
Grades 6-8
The World Language Department is committed to teaching according to the ACTFL (American Council on the
Teaching of Foreign Languages) Proficiency Scale within the modes of communication (Interpersonal Speaking,
Presentational Speaking, Presentational Writing, Interpretive Listening, and Interpretive Reading). Students will
learn to engage in conversations, provide and obtain information, express feelings and emotions, and exchange
opinions. They will learn to understand and interpret written and spoken language on a variety of topics, and they
will work to be able to present information, concepts, and ideas to an audience of listeners or readers on a variety
of topics. Culture is integrated on a daily basis into language study. The teaching of language and culture goes
hand in hand and one informs the other. Students will learn language structures in context and use them to convey
meaning. The courses address language structures in as much as they serve the communicative task and not as
the end goal unto themselves. As a requirement for graduation, students must complete two sequential years of the
same language in the Upper School.
*Level 2 is the highest placement a 6th grader can achieve after taking a placement test.
```

===== PAGE 26 =====

```text
Seal of Biliteracy
The Seal of Biliteracy serves to formally certify attainment of biliteracy for students. It is a statement of
accomplishment that helps to signal a student’s linguistic and cultural readiness not only for career and college but
also for engagement as a global citizen. The Seal of Biliteracy is already awarded by schools located in the 50 US
states. Students who have completed Year 6, 7, or AP in their Senior year are eligible to apply (Levels 4, 5 or AP
for Latin).
To earn the Seal of Biliteracy in French, German and Spanish students will participate in an external assessment
and must demonstrate that they have attained Intermediate High proficiency in reading, writing, listening, and
speaking or a 4 or 5 on the AP exam. Mandarin Chinese and Latin students will also take an external assessment
and must demonstrate Intermediate Mid proficiency or a 3 or above on the AP exam.
Please Note:*=Proficiency descriptors taken from the American Council on the Teaching of Foreign Languages
(www.ACTFL.org).
Policy for dropping a World Language Course with the hope to return to it another year:
In Middle School, if a student drops their language and later decides to re-enroll, students will be given the
opportunity to return to the most recent level completed.
World Language Course Sequencing
FRENCH
Course Term Prerequisite
French 1 Year
French 2 Year 80% or higher in French 1
French 3 Year 80% or higher in French 2
French 4 Year 80% or higher in French 3
French 5 Year 80% or higher in French 4
French 6 (Adv) Year 80% or higher in French 5. Option: Successful
completion of Year 4 with an “A” (93%) or better
and Department approval.
French 7 (Adv) Year 80% or higher in French 6 Adv.
Francophone Culture through
Movies
Francophone Culture through
Literature
* These courses alternate
```

===== PAGE 27 =====

```text
French AP Year 80% or above in French 7 Adv. and Department
approval. For senior only: 87% or above in
French 6
GERMAN
Course Term Prerequisite
German 1 Year
German 2 Year 80% or higher in German 1
German 3 Year 80% or higher in German 2
German 4 Year 80% or higher in German 3
German 5 Year 80% or higher in German 4
German 6 (Adv) Year 80% or higher in German 5
German AP Year 87% or higher in German 5 or German 6 Adv.
and Department approval.
LATIN
Course Term Prerequisite
Exploratory Latin through Semester
Mythology
Latin 1 Year 7th-12th grade only
Latin 2 Year 80% or higher in Latin 1
Latin 3 Year 80% or higher in Latin 2
Latin 4 Year 80% or higher in Latin 3
Latin 5 (Adv) Year 80% or higher in Latin 4
AP Latin Year 87% or higher in Latin 4 or 5 and Department
approval.
MANDARIN CHINESE
Course Term Prerequisite
```

===== PAGE 28 =====

```text
Mandarin Chinese 1 Year
Mandarin Chinese 2 Year 80% or higher in Mandarin Chinese 1
Mandarin Chinese 3 Year 80% or higher in Mandarin Chinese 2
Mandarin Chinese 4 Year 80% or higher in Mandarin Chinese 3
Mandarin Chinese 5 Year 80% or higher in Mandarin Chinese 4
Mandarin Chinese 6 (Adv) Year 80% or higher in Mandarin Chinese 5
Mandarin Chinese 7 (Adv) Year 80% or higher in Mandarin Chinese 6
Mandarin Chinese AP Year 87% or higher in Mandarin Chinese 6 (seniors)
or 80% or above in Chinese 7 and Department
approval.
SPANISH
Course Term Prerequisite
Spanish 1 Year
Spanish 2 Year 80% or higher in Spanish 1
Spanish 3 Year 80% or higher in Spanish 2
Spanish 4 Year 80% or higher in Spanish 3
Spanish 5 Year 80% or higher in Spanish 4
Spanish 6 (Advanced) Year 80% or higher in Spanish 5. Option: Successful
completion of Year 4 with an “A” (93%) or better
(S2) and Department approval.
Spanish 7 (Advanced) Year 80% or higher in Spanish 6 Adv.
Spanish AP Year 80% or higher in Spanish 7 Adv. and
Department approval. For senior only: 87% or
higher in Spanish 6
```

## Upper School — 2025-2026 Course of Study, full text (S1)

===== PAGE 1 =====

```text

```

===== PAGE 2 =====

```text
Academic Program
Table Contents
Introduction
Mission/Philosophy
Promotion Requirements
Graduation Requirements
Global Studies Diploma
Global Online Academy for GSD
Global Online Academy
IDEAS@PDS
Computing & Innovation
Design & Entrepreneurship
English
History
Mathematics
Performing Arts
Physical Education and Health
Science
Visual Arts
World Language
The Art and Science of Teaching
Upper School Administration & Staff
m
Table of Contents 2
```

===== PAGE 3 =====

```text
Introduction
Since choosing courses next year and beyond constitutes the basis of a good education, students
should plan each year as part of a larger course of study, remembering that long-range goals may
influence or constrain choices for the next year. Breadth, depth, and rigor are important
considerations, but so is balance. Students should select courses that are challenging and
stimulating, yet manageable. Courses taken should also be ones that allow students to pursue areas
of interest while being introduced to new areas of learning. Students will no doubt change their career
goals over the years, but they will preserve their options by taking as broad a range of courses in
English, History, Mathematics, Science, World Language, and electives as possible.
Students and parents should read the entire catalog carefully and recognize that the diploma
requirements represent only a minimum level of expectation that Providence Day believes is
necessary in a student’s education. The following questions need to be considered in the planning
process: Do the course selections fulfill the annual course load requirement? Will the courses
selected over the high school career fulfill the graduation requirements? Are the courses selected
compatible with the student’s ability and interests?
The courses students choose represent only the beginning of their education. Often, there is no room
to take every discipline each year or even to allow for every exciting course over the Providence Day
career. Colleges will offer students the opportunity to explore a broader range of courses, provided
they have prepared themselves as well as possible with a strong foundation at Providence Day
School.
Table of Contents 3
```

===== PAGE 4 =====

```text
Mission/Philosophy
Mission Statement
Providence Day exists to inspire in its students a passion for learning, a commitment to personal
integrity, and a sense of social responsibility.
School Philosophy
Providence Day School centers all goals and efforts on the comprehensive development of the
student. The school provides a strong preparatory education and guides growth through an
appreciation for aesthetic, cultural, and moral values. The school creates an environment that
encourages the importance of education and the value of approaching life with confidence and
enthusiasm. Parent involvement and support of the efforts of the school are essential to each
student’s success. Moreover, the school relies on the larger Providence Day family, including
trustees, parents, students, alumni, and friends of the school as a powerful team to achieve its goals.
Teachers at Providence Day expect students to reach their full academic potential to develop the
ability to question critically, to learn openly, to listen actively, to think creatively, and to communicate
effectively. Advanced and individualized instruction provides students with the knowledge and
incentive to excel in a college setting as well as in their chosen careers.
Students at Providence Day recognize that they are preparing for a future of leadership and
responsibility. The faculty and staff realize that, while these students require challenging, stimulating
academic programs, a wide range of enrichment opportunities enables them to become responsible,
sensitive, mature young adults with diverse abilities and interests. Therefore, Providence Day
provides activities of a varied nature at all grade levels to aid students’ appreciation of their culture,
community, and world. A strong program of athletic competition also provides students at Providence
Day with opportunities for rich choices in service and leadership.
Graduates of Providence Day are enriched as individuals, academically confident to face the
challenges of additional educational opportunities. Lasting friendships and personal bonds with
students and faculty are the result of the strong commitment shared by everyone in the school family
to help students continue to achieve.
The Providence Day curriculum is strongly rooted in the liberal arts tradition. At the same time, it is
open to change as departments review and revise their offerings based on the skills students will
need in the twenty-first century.
Class sizes remain low to meet the needs of an able and active student body. Students spend five to
six hours each day in classes and should expect to spend two and a half to four hours per day
outside of class in preparation. Effective education cannot be measured by the amount of time
expended, of course, but a lasting education requires considerable effort on the part of students, and
those who attend Providence Day need to have high expectations of themselves.
Normally, students at Providence Day enroll in at least five academic courses each semester while
taking one or two non-academic elective courses. Some students, usually seniors, who face an
Table of Contents 4
```

===== PAGE 5 =====

```text
unusually demanding semester, are occasionally advised to take four courses, provided at least three
are Advanced Placement. The academic year at Providence Day consists of thirty-six weeks.
While Providence Day’s classes begin at 8:15 a.m., teachers are available from 7:45 a.m. In this
tradition, students may find teachers in their classrooms and office areas each day of the week
should they have questions or wish to discuss an academic issue. Teachers frequently encourage
and require students to attend morning, lunch, or after-school review or discussion sessions.
Each student has an Advisor; this member of the faculty has the responsibility of guiding the student
in shaping a well-thought-out, long-term academic program incorporating both breadth and depth. In
planning a program of studies, the student’s needs and aspirations are carefully considered, in
addition to the necessity of meeting all of the diploma requirements. These needs may include
college and career plans, strengths and weaknesses as revealed by previous performance and
aptitude tests, and character and personal development.
Advisors prepare a written selection of courses for each advisee; a copy of this selection is sent home
to parents in March. Advisors welcome information and suggestions from parents concerning student
course selection. In addition to the Advisor, the Upper School Head approves the student’s course
selection.
Students have the opportunity to select Advanced Courses that have been determined by the
departments as being above average in difficulty. These courses are given extra weight (five points)
when computing a student’s grade point average, determining honor roll status and membership in
the National Honor Society. Advanced Geometry, Advanced Algebra II/ Trigonometry, Advanced
Precalculus, Advanced Analysis, Advanced Calculus, Advanced Differential Equations, and
Advanced Linear Algebra, Advanced Calculus III and Calculus Topics, Advanced Data Structures in
Java, Advanced Global Leadership, Advanced European Literature, Advanced Current American
Literature, Honors Band, Honors Jazz Ensemble, Honors Chorus, Honors Orchestra, Level 6 of
German, Levels 6 and 7 of Spanish, French, and Mandarin Chinese, and Level 5 of Latin are
considered advanced. Students making below a 70 in an advanced course do not receive any extra
weighting.
Students of superior promise may prepare for the AP examinations of the College Entrance
Examination Board by taking special AP courses or a suitable program of upper-level electives. AP
programs are currently offered in English Literature and Composition, English Language and
Composition, AP African American Studies, Calculus AB, Calculus BC, Statistics, U.S. Government
and Politics, Computer Science, Environmental Science, Physics, Chemistry, United States History,
World History, European History, Psychology, Human Geography, Microeconomics, Macroeconomics,
Biology, Latin, Spanish Language, Mandarin Chinese Language and Culture, French Language,
German Language, Studio Art, Art History, and Music Theory. Students who take an Advanced
Placement course must purchase their books and take the AP exam at the end of the year. These
courses are given extra weight (ten points) when computing a student’s grade point average.
Students making below a 70 or below in an AP or Advanced Placement course do not receive any
extra weighting.
Students may also choose to delve deeper into global leadership through the Global Studies Diploma
program. This second diploma explores a focused curriculum in global studies, challenges students to
enrich their cultural awareness, and embark on a journey as a global citizen
Table of Contents 5
```

===== PAGE 6 =====

```text
Graduates, almost without exception, go on to four-year colleges, where they find themselves well
prepared. In an environment where excellence is the norm, students challenge each other, and
dedicated teachers listen, encourage, and inspire. Students leave Providence Day having learned to
think critically and communicate effectively. Students achieve much more than test scores attractive
to college admissions offices; they prepare for success in college and beyond. With the help of
committed teachers, students learn to take responsibility, overcome barriers, and assume leadership.
Table of Contents 6
```

===== PAGE 7 =====

```text
Promotion Requirements
Promotion in the Upper School is based on the following criteria:
Entering Grade 10
To have sophomore standing, a student must have earned at least four units of credit, including one
unit each of English and math.
Entering Grade 11
To have junior standing, a student must have earned at least ten units of credit, including two units
each of English and math, two laboratory science units, and two units of history.
Entering Grade 12
To have senior standing, a student must have earned at least sixteen units of credit, including three
units each of English and math, two laboratory science units, two units of history, one unit of World
Language, and have met the computer science requirement of .5 units credit during grades 9-12.
In order to graduate, a student must earn at least twenty-two and a half units of credit with a
distribution of courses outlined in the Graduation Requirements Schedule. In addition, all seniors
must successfully complete a senior project.
Table of Contents 7
```

===== PAGE 8 =====

```text
Graduation Requirements
Students are required to earn a total of twenty-two and one-half (22.50) units of credit during grades
nine through twelve and successfully complete a senior project in order to receive a diploma. The
number of required units is as follows:
Courses Units Comments
English 4.0 One course per semester is required. English I, English II, and either
Writing Seminar or AP Language and Composition are required.
Mathematics 4.0 Algebra I, Algebra II, Geometry, and one year of math beyond Algebra II
(usually Precalculus) are required.
Laboratory 3.0 Three years of a laboratory science class are required: Physics,
Science Chemistry, and Biology.
History 3.0 Three years of history courses are required. Students must take Global
Civics, World History or AP World History, and U.S. History or AP United
States History. Students entering Providence Day after grade 9 are not
required to take Global Civics.
World 2.0 Two years of the same language in grades 9-12 are required. It is
Language strongly recommended that students who are proficient and interested in
a language continue beyond the requirement.
P.E 1.0 One year of physical education/health is required in grade 9. Students
may also take physical education in grades 10-12 as elective credit.
Fine Arts 1.0 One unit must be earned in Fine Arts. One year or two-semester courses
may be taken in Art, Band, Chorus, Orchestra, Theatre, Yearbook,
Photography, or AP Art History.
Computing & 0.5 At least one-semester of a Computing & Innovation course must be taken
Innovation in grades 9 - 12.
Electives 4.0 Any course taken beyond the required units listed above will be given
elective credit. Global Online Academy courses may meet this
requirement. A student may count a maximum of two units in physical
education and a maximum of two units in fine arts (Art, Chorus, Band,
Theater, Yearbook, Orchestra, Photography) toward the 22.5 units
required for graduation.
Table of Contents 8
```

===== PAGE 9 =====

```text
Global Studies Diploma
Mission Statement
Our purpose is to promote within our students an ability to appreciate and value the differences
among people locally and globally and help them develop the knowledge, skills, and character
dispositions to become active global citizens.
Goals:
● Understand commonalities among all cultures.
● Appreciate new knowledge systems and ways of thinking about the world.
● Demonstrate high proficiency in a spoken world language.
● Understand and promote the value of living to sustain the planet.
● Understand the connectedness and complexity of global issues.
● Demonstrate tolerance and an active empathy towards others in the world.
● Develop a genuine concern for world problems and a commitment to finding solutions.
PDS Global Studies Diploma
The Providence Day School Global Studies Diploma program (GSD) allows students in grades 9-12
to choose a curriculum and a set of experiences that focus on developing successful and responsible
global citizens. Students who earn the GSD will have the knowledge, skills, and values to understand
and act purposefully in the local-global context. The GSD is in addition to the Providence Day School
Diploma.
Joining the GSD Program:
● Students in 8th grade may sign up for the GSD Program at the end of their spring semester. If
students are interested and have attended an information session they can fill out this form to
join.
● Freshmen should sign up prior to the end of the freshman year in order to facilitate schedule
planning.
● Sophomores may sign up for the program provided the student’s world language level is
sufficient to meet the world language requirement before graduation - successful completion of
Year 4.
● Students who travel abroad, host an international student, or attend global events may be able
to earn global points after they join the program provided the experience occurred within the
previous six months of joining.
Students must maintain a grade of B- or better in all global studies courses taken to complete the
GSD. A student who receives less than a B- may be put on probationary status by the Global
Education Program Office. A review by the Academic Committee will determine probation if a global
studies student earns a grade of less than a B- in any global education course. If placed on probation,
a student will have the next academic semester to demonstrate academic success at a B- or higher
level. At the end of that semester, the Academic Committee reviews the academic standings of the
student's progress. If a student does not maintain an academic standard consistent to a B- or higher
Table of Contents 9
```

===== PAGE 10 =====

```text
in all of the courses taken to complete the Global Studies Diploma including Global Leadership, he or
she may be removed from the GSD program. In addition, a student who earns a D or below in a
global studies course taken to complete the Global Studies Diploma will be dropped from the program
without a probationary period.
Curriculum Requirements
Required Courses
Students are required to take the following courses while in grades 9-12:
● Global Civics (1 year/1 credit)
● World History (1 year/1 credit) or AP World History (1 year/1 credit)
● Comparative Government and Politics (semester/0.5 credit)
● TWO Global Studies courses from any of the following six:
○ Global Studies: Europe and Latin America (semester/0.5 credit)
○ Global Studies: Middle East and North Africa (semester/0.5 credit)
○ Global Studies: Genocide (semester/0.5 credit)
○ Global Studies: Asia (semester/0.5 credit)
○ Global Studies: Africa (semester/0.5 credit)
○ Global Studies: Comparative Religions (semester/0.5 credit)
○ Global Studies: Themes and Challenges -Topic changes (Summer term/0.5 credit)
● Global Leadership, Advanced (Spring semester/0.5 credit) See below for details.
● World Language: A GSD student must take ONE world language ALL four years in Upper
School AND satisfactorily complete at least through Year 4 of that language. The student may
select Chinese, French, German, Spanish, or Latin.
Global Leadership Course (Advanced) This course develops and directs global leadership thinking,
skills, and action. Components include:
● A major research and solutions essay (12+ pages) that investigates and analyzes a world or
regional problem of genuine interest and develops and provides proposals for how to make it
better or steps towards change.
● The study of leadership styles and their impact on group dynamics
● Group trip to investigate governmental and non-governmental offices that address global
challenges
● Organization and participation in a mock convention or role-playing activity to address a global
issue
● End of senior year defense of the student’s research paper, reflection on the course of study,
and articulation of what it means to be a global citizen after graduation before a panel of faculty
and staff
In the fall of the senior year, each student will meet to define one’s global issue for the Global
Leadership course.
Elective Courses
Two and one-half credits (2.5) are required from any of the following courses while in grades 9-12:
English
● Women’s Voices (semester/0.5 credit)
Table of Contents 10
```

===== PAGE 11 =====

```text
● AP African American Studies (1 year/0.5 credit)
● Modern Dramatic Literature (semester/0.5 credit)
● Latino American Literature (semester/0.5 credit)
● Graphic Novels (semester/0.5 credit)
● Shakespeare (semester/0.5 credit)
● AP English Literature (1 year/0.5 credit)
History
● Economics of Development (semester/0.5 credit)
● Legal Issues (semester/0.5 credit)
● Herstory: Women in Global History (semester/0.5 credit)
● AP European History (1 year/1 credit)
● AP Human Geography (1 year/1 credit)
● AP Macroeconomics (1 year/0.5 credit)
● Global Studies course beyond 2 required (see “Required Courses” above) (semester/0.5 credit)
Science
● AP Environmental Science (1 year/1 credit)
● Bioethics/Biotechnology (semester/0.5 credit)
● Environmental Sustainability (semester/0.5 credit)
Visual & Performing Arts
● AP Art History (1 year/1 credit)
● Understanding Art: A Global View (semester/0.5 credit)
● (Re)Act: Theatre and Social Change (semester/0.5 credit)
● Theatre Around the World (semester/0.5 credit)
● Upper School Chorus (year/one-time 0.5 credit)
World Language
● Second Modern Language (1 credit)
Physical Education
● International Games (semester/0.5 credit)
● Yoga and Mindfulness (semester/0.5 credit)
I.D.E.A.S.
● Social Entrepreneurship (semester/0.5 credit)
● Robotics & Engineering (semester/0.5 credit)
● Architecture Design (semester/0.5 credit)
Each GSD student will create a personal website that demonstrates their development, learning, and
achievements. As they log participation in co-curricular experiences, they will add reflections tied to
each of the core competencies that define an effective and responsible global citizen. The details
and requirements are outlined in this GSD Portfolio document.
Table of Contents 11
```

===== PAGE 12 =====

```text
Global Online Academy for GSD
A GSD student can register for one of these fully online courses as part of the normal registration
process which will count as GSD elective credits. The student must get approval from the Upper
School Head before registering. Students must submit this GOA Course Request Form to the Upper
School office for enrollment.
Formal registration for online courses will begin in April for semester one and two courses. Summer
GOA opportunities are discussed below and there is a fee for these classes during the summer
session. To learn more, please go to:
https://globalonlineacademy.org/what-we-do/student-program/student-courses
*As GOA classes change frequently, the Upper School Head may endorse other GOA classes.
Semester 1 (Fall)
● Cybersecurity
● Problem-Solving with Engineering and Design
● Bioethics
● Global Health
● Medical Problem Solving I
● Business Problem Solving
● Applying Philosophy to Global Issues
● Entrepreneurship in a Global Context
● Climate Action and Sustainability
● Genocide & Human Rights
● International Relations
● Race & Society
● Introduction to Legal Thinking
● Prisons and Criminal Justice Systems
Semester 2 (Spring)
● Arts Entrepreneurship
● Cybersecurity
● Bioethics
● Medical Problem Solving I
● Medical Problem Solving II
● Business Problem Solving
● Race & Society
● Climate Action and Sustainability
● Entrepreneurship in a Global Context
● Religion & Society
● International Relations
● Prisons and Criminal Justice Systems
● Introduction to Investments
● Introduction to Legal Thinking
● Introduction to Blockchain and Cryptocurrency
● Gender & Society
To learn more about the Global Online Academy, please go to
http://www.globalonlineacademy.org/the-goa-experience/courses/
Table of Contents 12
```

===== PAGE 13 =====

```text
Global Online Academy
Rising 9-12 grade students may enroll in a GOA course to meet elective credits towards graduation.
● A Global Online Academy course is an asynchronous and sometimes synchronous learning
experience through an online forum. These courses are taught by Independent School
teachers from around the United States and the world. The courses meet a rigor equal to a
Providence Day School course with an expectation of up to one hour of work per regular
school day. Students are expected to be well organized and highly motivated to work in this
learning environment. Teachers of a GOA course do connect via a video conference forum
and also communicate regularly. Final grades from these courses are listed on the Providence
Day School transcript and average with the Providence Day School grade point average.
Students request a study hall while taking a Global Online Academy (GOA) class to give them
time during the school day to dedicate towards getting the work done for this class.
● A list of available courses can be found here.
● Students must submit the GOA Course Request Form to the Upper School office for
enrollment.
● Certain GOA courses meet credit requirements towards the Global Studies Diploma.
Providence Day School students can register for one of these fully online courses as part of the
normal registration process.
Summer GOA Classes
Summer GOA classes must be registered through the PD Academy with Summer Programs. Summer
courses for Upper School graduation credit must also be approved by the US Head and you can
register by clicking here prior to taking a class.
A GSD candidate course selection from the Global Online Academy must be:
• a course not offered at Providence Day School.
• a course approved as a global course defined by the Global Education Office.
The course will appear on the student’s transcript and will fulfill a GSD elective and a graduation
elective credit. A minimum GPA of 2.5 is required for approval to participate in a Global Online
Academy course.
The course may be inserted into the regular academic day schedule or could be an additional course
to the seven courses allowed in a schedule. Students are encouraged to allocate time during the
school day for this course.
Acceptance into a course is prioritized by seniors, then juniors, then sophomores, and finally
freshmen. The Upper School Office and the Global Education Office have the final approval of any
student seeking to take a Global Online Academy course.
Table of Contents 13
```

===== PAGE 14 =====

```text
I.D.E.A.S.@PDS
Ideas@PDS is a reimagining of the Computer Science department that offers students the chance to
explore and expand their passions and curiosities around innovation, design, entrepreneurship,
analytics, and sustainability. This unique program invites faculty and students to work across
boundaries and at the intersections of traditional disciplines and departments. The learning arising
from these courses always aims at applied, collaborative problem solving. Students have the
opportunity to identify challenges they care about and want to pursue calling upon skills and mindsets
delineated in the PD Passport. These courses fit into two interdisciplinary strands (1. Computing &
Innovation and 2. Design & Entrepreneurship).
Students will need to select a course from the Computing and Innovation course choices to fulfill their
computer science graduation credit. The Architecture Design course will continue to count toward the
computer science graduation credit.
Computing & Innovation
As a part of the Ideas@PDS Program, the Computing & Innovation Department prepares students for
the fast-paced, technological world they will encounter. The school’s computer labs offer students the
opportunity for classroom instruction in computer programming and computer applications to help
students become computer literate and prepared for college.
Computer-Aided Design with 3D Printing
This course will consist of a basic introduction to traditional mechanical drawing using a
computer-aided design (CAD) software package, as well as an introduction to 3D printing. Students
will learn to use these sophisticated computer programs as they construct mechanical drawings that
can then be printed using a 3D printer. The course will also include an introduction to isometric
drawings and full three-dimensional modeling techniques.
Prerequisite: Geometry completed, (Preference will be given to students who have completed Art I)
(Semester) Fall Term
Computer Programming with Python
Computers are becoming more and more pervasive in our society and are found in all parts of our
lives. Learning to program a computer can be useful, fun, and help you to become a better problem
solver. This course is an introduction to computer programming using the Python programming
language. This course covers basic programming concepts such as variables, data types, iteration,
flow of control, input/output, functions, graphical user interfaces, and event-driven programming. The
course will conclude with a 2 week-long programming project, and by the end of the course, students
should be able to build a moderately-sized Python program on their own.
No prerequisite: (Semester) FallTerm
Advanced Data Structures in Java (Advanced)
This course is designed for students who have successfully completed APCS A and who are looking
to expand their knowledge of the Java programming language. The course content is similar to what
Table of Contents 14
```

===== PAGE 15 =====

```text
is typically covered in a second-semester college programming class and will cover concepts of data
abstraction and encapsulation including stacks, queues, linked lists, binary trees, recursion, hash
maps, and heaps.
Prerequisite: APCS A (Semester) Fall Term
Game Development with Unity and C#
Game Development w/ Unity and C# is all about starting to learn using the "Create with Code"
curriculum how to develop video games using the C# programming language and the Unity game
engine. In this course, you will learn to Create with Code as you program your own exciting projects
from scratch in C#. As you iterate with prototypes, tackle programming challenges, complete
quizzes, and develop your own personal project, you will transform from an absolute beginner to a
capable Unity developer.
No prerequisite: (Semester) Spring Term
iOS Programming with Swift
This course is designed for students to explore all elements of mobile app development for iOS
devices. Students will use Xcode and iOS SDK to learn the basics of the Swift programming language
as well as exploring the Cocoa Touch frameworks. Online videos and tutorials will support instruction.
Students will have plenty of time for programming practice on lab computers and testing their apps on
their own personal mobile devices.
No prerequisite: (Semester) Spring Term
Physical Computing
This course will introduce students to the concepts and practices of engineering interactive systems
and environments using low-cost microcontrollers. They will use Arduinos and Raspberry Pis to
construct prototypes using electronic components such as buttons, switches, low-cost sensors,
displays, LEDs, motors, and wireless communication modules. The possibilities are limitless. After
learning fundamental concepts through an introductory assignment, students will create a larger
project of their own design. This project will require a high level of critical thinking, problem-solving,
and innovation.
No prerequisite: (Semester) Spring Term
Robotics & Engineering
This class explores the foundations of Robotics & Engineering, Global issues surrounding the field,
and the skills of “integrated thinking” required for a successful Roboticist/Engineer. This class focuses
on hands-on learning and active discussion where students are given prompts, ideas, and real world
problems and challenged to solve them using robots and their developing engineering skills. Students
will be challenged to think of the complex implications of their solutions and present compelling
arguments for their solutions to their peers, teachers, and greater community. This will include the
ethical uses of technologies within the field, for intended as well as potentially unintended
consequences.
Table of Contents 15
```

===== PAGE 16 =====

```text
No prerequisite: (Semester) Fall/Spring Term (0.5 Global Studies credit)
AP Computer Science A
This course follows the College Board’s Advanced Placement Computer Science syllabus, learning to
program in the Java language, and is meant to be the equivalent of a first-semester college course in
computer science. The major emphasis of the course is on Java syntax and class structure, problem-
solving techniques, object-oriented solution methodologies, algorithms, and data structures. Students
learn the context of these subjects through applications of computing.
Prerequisite: Accelerated Algebra II or Advanced Geometry with a consistent B average or better in
all math classes from Accelerated Algebra II or Advanced Geometry through current math course and
department approval. (Year)
AP Computer Science Principles
This course engages students in the creative aspects of the computer science field. Students will
develop a range of skills vital to success in subsequent college courses, such as using computational
tools to analyze and study data and working with large data sets to analyze, visualize, and draw
conclusions from trends. They will also develop effective communication and collaboration skills,
working individually and collaboratively to solve problems and discussing and writing about the
importance of these problems and the impacts on their community, society, and the world.
Prerequisite: Geometry with a consistent B average or better in all math classes from Geometry
through current math course and department approval. (Year)
Table of Contents 16
```

===== PAGE 17 =====

```text
Design & Entrepreneurship
As a part of the Ideas@PDS Program, the classes in the Design & Entrepreneurship offer students
unique opportunities to explore their own passions and pursuits while developing and enhancing their
problem solving skills.
Broadcast Journalism
This course is designed for Upper School students as a continuation of Broadcast Media (middle
school course) or as an exploratory course. Students will learn, manage, and incorporate the
technical components necessary to create a compelling story, and edit and produce using Adobe
Premiere Pro editing software. Giving students voice and empowerment are the focal points. Video
segment productions will include feature stories, interviews, sports, podcasts, and film challenges that
incorporate specific cinematic techniques such as camera and editing processes, sound and visual
effects, and certain types of dramatic performances.
No prerequisite: (Semester) Fall/Spring Term
Introduction to Financial Analytics
Over 50% of Americans cannot cover a $1000 emergency. Almost half the US population of African
Americans and Hispanics do not own any stocks, bonds, mutual funds, ETFs, or real estate. Current
studies indicate a staggering 30% retirement income gap between men and women. The average
credit card debt in our nation is around $6000. On top of all this, studies also show that approximately
70% of wealthy families will lose their wealth by the second generation. The need for quality financial
education has never been more important. As one of the top independent schools in the nation, we
have a responsibility to not only prepare our students for college, but for the real world. This course
will cover a robust curriculum, ranging from daily personal finance skills to exploring advanced topics
such as understanding the difference between fundamental and technical analysis techniques.
No prerequisite but limited to grades 10-12 only (Semester) Fall/Spring Term
Architecture Design
This course focuses on the principles and concepts of architectural design, and the use of Building
Information Modeling (BIM), used in the field of architecture. An emphasis is placed on the use of 3D
CAD tools in the design and execution of residential floor plans, foundation plans, wall sections, and
elevation drawings. An understanding of 3D CAD concepts and terms, and the use of 3D CAD
software such as REVIT, are essential to this course, and the required method of producing finished
drawings. English language arts, mathematics, and science are reinforced.
No prerequisite: (Semester) Fall/Spring Term (Beginning Fall 2024 - 0.5 Global Studies credit)
**This course will continue to count as a Computer Science graduation credit
Table of Contents 17
```

===== PAGE 18 =====

```text
Social Entrepreneurship
Social Entrepreneurship is an experiential learning elective course designed to guide and propel
students through the knowledge and processes necessary to launch businesses that create social
value. Students will learn and apply new knowledge and skills in order to collaboratively
problem-solve to develop and implement creative business models that sustainably address
real-world social problems. They will learn how to rapidly develop and test ideas by gathering
massive amounts of customer and marketplace feedback. In addition to learning about complex
social problems and applying rigorous entrepreneurial processes to address them, students will also
focus on collaboration, leadership, writing, research, and presentation skills that will serve them for
the rest of their lives. This course also uses just-in-time content and resource acquisition to support
learning toward the creation and realization of students’ capacity to positively impact the world
through social entrepreneurship.
No prerequisite but limited to grades 10-12 only (Semester) Fall Term (0.5 Global Studies credit)
STEM Research and Design
This course offers students the opportunity to pursue original scientific research. Students will choose
their own research topic, design and conduct experiments, and present the results at the end of the
semester. This is a unique chance for students to have an authentic, in-depth experience in scientific
research. This course also will count as a Science credit.
Prerequisite: Physics I and Algebra I (Semester) Spring Term
Design & Entrepreneurship
How might we utilize the skills and practices of a design thinker to serve students while growing as
entrepreneurs? We will spend the semester cultivating the skills and practices of a design thinker in
order to solve problems that impact students. Learner-designers in the class will come together as a
studio of designers, a collective of artists, a firm of consultants, a cadre of innovators, an enterprise of
entrepreneurs to excavate and address pressing issues and opportunities for students. Having
formed a creative, collaborative problem solving group, the team will help one another to create
personal designs that advance their individual causes as well as coming together to identify a shared
design opportunity that gets addressed by the entire group.
No prerequisite: (Semester) Fall/Spring Term
Table of Contents 18
```

===== PAGE 19 =====

```text
English
The English Department is committed to teaching students to negotiate meaning, through the reading
and analysis of literary art and through the writing of original prose and, occasionally, poetry. At the
heart of our curriculum is linguistic analysis: when we read closely, we analyze others’ language;
when we write with care, we analyze our own (and our classmates’); and, whether in the midst of a
discussion of literature or of the drafting of an essay, when we focus on grammar, we analyze
sentences. Furthermore, a guiding assumption for every English teacher is the correlation between
the quality of thought and writing. Ultimately, though, what occurs in English classes has to do with no
less than understanding oneself and one’s place in the world, a process that tends to swing between
delight and discomfort. English is required in grades nine through twelve.
English I
Ninth-grade students read, discuss, and write about novels, short stories, and plays— including
Macbeth and The House on Mango Street—with an eye toward developing analytical skills and
appreciation for literary art characterization and thematic development are the focal points. Writing
assignments include essays, journal entries, and a research-based podcast project. Students often
work in small groups to discuss writing and topics of interest from the readings. Grammar instruction
and review occurs frequently.
Required for graduation (Freshman Year)
No prerequisite (Year)
English II
Tenth-grade English provides an intensive focus on writing skills, through essays that scrutinize
literature from a variety of rhetorical approaches. Great poetry and prose of American
literature—including such works as The Great Gatsby and Their Eyes Were Watching God—provide
the thematic and stylistic matter out of which students will develop analytical arguments (including
writing from research), personal responses, and imitative narratives. Because assignments begin to
require attention to varying audience expectations, English II students have more freedom with regard
to paragraph and essay organization than ever before. Working often in small groups, students help
each other internalize the notion of audience.
Required for graduation (Sophomore Year)
No prerequisite (Year)
Writing Seminar
In this course for juniors, student writing constitutes the text. During the first month, frequent brief
essays that draw upon students’ own experiences and knowledge provide students with a body of
work with which to practice revising and editing skills. Writing Seminar places more emphasis on style
and voice than in past courses, providing direct instruction in ways to organize one’s prose to achieve
particular rhetorical aims. Longer essays include researched arguments about the campus
community and about a broader issue. Students continue to work with each other to refine their
developing sense of what it means to write for an audience. Grammar review occurs throughout.
Table of Contents 19
```

===== PAGE 20 =====

```text
Required for graduation unless AP English Language and Composition is taken during their junior
year.
(Semester) Fall or Spring of Junior Year
Creative Writing
Creative Writing students write original prose fiction and poetry in a workshop setting. The course
develops creativity and communication skills as students invent characters and plots, using language
that is energetic and vibrant and that achieves desired effects on readers. It instills collaborative
values and deep thinking as classmates provide analytical feedback on each other’s work. Writing is
judged according to overall literary quality (a concept the course rigorously examines) and
grammatical consistency. Particularly talented students are urged to enter national contests and to
submit their work for publication.
(Semester) Fall or Spring of Junior or Senior Year
New Media Storytelling
Media—from news articles to Instagram reels—is storytelling. In this class, we will examine
storytelling strategies: how they have been utilized in the past and how they show up in new media.
Over the course of the semester, students will learn to identify and apply narrative methods to a
variety of communication formats. Class discussions will focus on challenges around ethics and
representation in the past and in new media.
(Semester) Fall or Spring of Junior or Senior Year
English Studies in Film: Philosophy in Film
This course will use the medium of film to investigate how writers and directors explore life’s profound
questions. To form a basic foundation of knowledge on the subject, students will read excerpts from
classical philosophical texts and articles from contemporary journals. They will then use this
understanding as they watch, analyze, and discuss a variety of movies and television programs.
Potential topics for discussion include how we define good and evil, moral and immoral behavior, as
well as what constitutes the self, existence, and reality. Some of the films and programs that students
might analyze include The Matrix, The Truman Show, and Batman Begins. Students will maintain a
journal and write several short papers and one summative essay.
Detective and Crime Fiction
This course explores the genre of detective and crime fiction as it exists in the English/American
literary canon from its early beginnings in the 1800s until present day. This genre is both an important
and popular form of narrative, appealing to writers and readers with diverse interests and ideologies.
At its core, crime and detective fiction seek to reveal the mysterious nature of human life and death,
while simultaneously narrating the clash between good and evil. In this course, students will read
short stories, dramatic works, novels, and analyze film and TV within this genre and respond critically
and creatively to the texts in focus. Additionally, students will become fluent in the essential elements,
vocabulary, structure, and characters of detective and crime fiction. Through assigned readings and
course materials, students will examine the development of this genre and analyze depictions of the
law and legal system within the texts. (Semester) Fall or Spring of Junior or Senior Year
Table of Contents 20
```

===== PAGE 21 =====

```text
Global Literature Topics
In these courses, students will engage with a variety of genres including short stories, novels,
non-fiction, as well as some relevant pop-culture performances. The texts will span diverse countries
and cultures, from Asia to the Caribbean, from Africa to Latin America. Through class discussions
and analytical writing assignments, students will be taught to think critically about texts that share a
general common topic, which may vary from year to year, such as gender, magical realism, or justice.
In doing so, they will sharpen their thinking and expand their awareness of humanity. They will also
be asked to reflect on what global citizenship entails, including their own understanding of themselves
as global citizens.
(Semester) Fall or Spring of Junior or Senior year (0.5 Global Studies credit)
Graphic Novels
Students will scrutinize texts that combine words and images. Graphic novels--long-form
comics--have gained considerable global representation and collaboration, the study of which will
allow students to expand the breadth of their literary experience. These visually engaging texts will
provide students the chance to read cultural histories from around the world through the sophisticated
storytelling of this evolving medium. Moreover, students will design a multimedia work of literary
analysis, leading students toward the collaborative creation of their own mini-comics. We will work
through two graphic novels collectively before students begin to select works they will read, write
about, and think through individually and in small groups. The course will culminate in students
sharing their work and learning through a student-organized in-school convention that will mimic
elements of an actual comic-con.
(Semester) Fall or Spring of Junior or Senior Year (0.5 Global Studies credit)
Modern Dramatic Literature
This course surveys classics in modern drama, highlighting the evolution of the period. The aim of the
course is to introduce students to plays that may initially confound and amuse but that ultimately
deepen our understanding of the human condition. The syllabus includes translated works, from
Ibsen to Ionesco, that explore the loss of individualism, empathy, and meaningful communication. In
addition to “performing” each play as reader’s theater, students will create individual and collaborative
responses demonstrating their understanding of each work.
(Semester) Fall or Spring of Junior or Senior Year (0.5 Global Studies credit)
Shakespeare
Students will spend this course with a broad sampling of Shakespeare’s work, including The
Merchant of Venice, Othello, The Tempest, Measure for Measure, and Richard III. We will delve into
these rich texts, focusing on both intellectual analysis and the potential for various effects on an
audience. The structure of the class will rely largely on the discussion that emerges from reading the
plays aloud together. Students will write responses and analytical papers, and they will scrutinize
directing and acting choices in film versions.
(Semester) Fall or Spring of Junior or Senior Year (0.5 Global Studies credit)
Table of Contents 21
```

===== PAGE 22 =====

```text
War Literature
Students will read a variety of genres including poetry, songs, plays, novels, as well as excerpts from
non-fiction works spanning from the Thirty-Years War through the American Civil War to World Wars I
and II, Vietnam, and finally the wars in Afghanistan and Iraq. Students will be asked to use
critical-thinking and problem-solving skills as they navigate reading and writing about the reality and
humanity of the war experience. With each piece of literature, students will research the facts of the
war and then hold them up to the experience as described in the literature. Students will be asked to
write for a variety of audiences as they try both to make sense of something they are too young and
too lucky to have experienced first hand and also to notice how these published authors have worked
to capture war on the page.
(Semester) Fall or Spring of Junior or Senior Year
Latino American Literature
This course will provide an introduction to Latino American literature and cultures in the United States
from 1960 to the present, paying close attention to the historical and social events that have
influenced the construction of Latino identities. We will analyze questions of racial, ethnic, sexual, and
cultural identity in conversation with concepts such as diaspora, border identities, code-switching, and
double-consciousness as represented in literature and popular culture. Students will analyze a variety
of texts including novels, short stories, non-fiction, podcasts, and essays to explore a wide range of
themes, including parental relationships, the tension of living between two cultures, and how one
might negotiate language, colorism, classism, and identity formation.
(Semester) Fall of Junior or Senior Year (0.5 Global Studies credit)
AP African American Studies
AP African American Studies is an interdisciplinary course that reaches into a variety of
fields—literature, the arts and humanities, political science, geography, and science—to explore the
vital contributions and experiences of African Americans. The course will explore these topics through
fiction, non-fiction, primary documents, visual art, music, and podcasts. Students will develop a rich
understanding of African American history and culture, become fluent in significant themes and
patterns in African American history, and learn to identify and define significant and relevant legacies
in African American history.
(Year) Junior or Senior Year (1.0 English credit, 0.5 Global Studies credit)
AP English Language and Composition
AP Language and Comp offer college-level writing assignments in expository, analytical, and
argumentative modes. Readings come from non-fiction genres such as autobiography, criticism, the
scientific essay, the political column, and the place narrative. Discussions focus on rhetorical
technique, critical and analytical thinking, and logic. Students prepare drafts in and out of class and
revise them with feedback from peers, taking the AP Exam in May.
Prerequisite: Departmental approval (Semester) Spring of Junior or Senior Year
Table of Contents 22
```

===== PAGE 23 =====

```text
AP English Literature and Composition
This course refines students’ skills with literary analysis, and it provides students with an intellectual
framework within which some of the greatest works of all time can be placed. Regularly taught novels
include Melville's Moby-Dick, Ellison’s Invisible Man, and Woolf’s Mrs. Dalloway. Other emphasized
writers include Dickinson, Frost, and Shakespeare. Students also read novels and plays,
independently, from an “outside reading” list. AP English Lit works toward helping students develop
an appreciation for literary art. Students take the AP Exam in May.
Prerequisite: Departmental approval (Senior Year) (0.5 Global Studies credit)
Table of Contents 23
```

===== PAGE 24 =====

```text
History
The History Department emphasizes teaching students the skills and knowledge necessary for civic
competence and the historical perspective critical for interpreting the complex issues of today and
tomorrow. The teachers strive to instill a love of learning, exploration, and inquiry as an inspiration for
further study. They work closely together to develop teaching approaches that motivate student
learning and use a variety of cooperative learning, role-playing, and debate activities to promote
historical thinking. The students learn to interpret primary and secondary sources, to think critically,
and to write analytically. The department endeavors to develop students who have the ability to make
informed and reasoned decisions for the public good as citizens of a culturally diverse, democratic
society in an interdependent world.
Global Civics: Government Structures and Economic Systems
Global Civics focuses on the roles and responsibilities of citizens from local, state, national, and
global perspectives. Teachers place emphasis on developing both the knowledge and skills
necessary to be an active and engaged citizen. Students gain an awareness and appreciation for
government and economic systems and how those American systems compare to others throughout
the world. Teachers incorporate simulations and interactive activities to develop 21st-century skills
such as critical thinking, research, problem-solving, creativity, innovation, communication, and
collaboration. In order to best prepare students to be engaged citizens in the world in which they live,
21st-century technology tools and skills will be incorporated throughout the course.
No prerequisite (Year)
World History
World History fosters a greater appreciation for cultural diversity through a better understanding of
how different societies have developed through time. Students learn to recognize how various
aspects of our culture have come to us from other times and places. The course emphasizes a
geographical & thematic development of events from 1000 CE to the Age of Globalization. This
approach facilitates an understanding of the interconnected nature between societies as well as a
framework for viewing the complexity of current issues.
No prerequisite (Year)
AP World History: Modern
The AP World History course will survey changes and continuities within Afro-Eurasian and American
societies from 1200 CE to the present, concentrating on six overall themes: governance, innovation,
culture, economic systems, social structures, and interactions between humans and the environment.
This course is also designed to establish and enhance historical thinking skills using stimulus-based
tests, essay writing, and document analysis. Students will also further develop their reading
comprehension and critical thinking skills. All enrolled students are required to take the AP exam in
May.
Prerequisite: Department approval (Year)
Table of Contents 24
```

===== PAGE 25 =====

```text
United States History
This course is a general survey of United States history from the European encounter of the Americas
to the present day. Students participate in a wide variety of activities and role-playing simulations and
learn advanced interpretive reading, writing, and speaking skills. The curriculum concentrates on
colonial settlement, the American Revolution and the Constitution, the growth of democracy, the Civil
War, industrialization and its effects, the development of the U.S. as a world power, and modern
America. Students further develop their historical thinking skills as they strive to understand the past
by examining primary and secondary source. Students learn the value of historical perspective for
interpreting today’s social and political issues.
No prerequisite (Year)
AP United States History
AP United States history is a college-level course that seeks to apprentice students to the practice of
history by explicitly stressing the development of historical thinking skills and reasoning processes
while learning about the past. The reasoning processes of causation, comparison, and continuity and
change over time focus on “thinking historically” (the habits of mind that historians use when they
approach the past in a critical way), while the skills of crafting historical arguments from historical
evidence and historical interpretation are used by historians when they construct, review and assess
arguments about United States history. Students will use these processes and skills to interrogate a
variety of sources including maps, graphs, charts, images, audio-visuals, and primary and secondary
readings. These materials, coupled with a college-level textbook, help students to understand the
relationship between themes and key concepts. The course content provides students with an
in-depth study of critical trends and moments that have shaped our nation as well as an
understanding of the historiography of those processes. The teachers emphasize that understanding
the past enhances people’s ability to understand current and future situations. All enrolled students
are required to take the AP exam in May.
Prerequisite: Department approval (Year)
AP European History
This course allows students to investigate the major events and ideas of European history from the
Renaissance to the present. It is designed to facilitate a more complete understanding of the cultural
diversity of the region as well as the complexity of current European and world affairs. Although the
class has a strong focus on political events, there will also be considerable development of religious,
artistic, economic, social and intellectual themes. Students will be expected to work with both original
and secondary sources to develop their sense of history as an interpretive discipline. They will be
encouraged to develop sophisticated approaches in their essay writing with a special emphasis on
the use of evidence and the development of an academic argument. All enrolled students are
required to take the AP exam in May.
Prerequisite: Department approval (Year) (1 Global Studies credit)
AP U.S. Government and Politics
This college-level course is designed to give highly motivated students a critical perspective on
government and politics in the United States. This course includes both the study of general concepts
used to interpret American politics and an analysis of specific case studies. It also emphasizes
Table of Contents 25
```

===== PAGE 26 =====

```text
familiarity with the various institutions, groups, beliefs, and ideas that make up American political
philosophies. Students examine the following topics: Constitutional underpinnings, political beliefs
and behaviors, political parties and interest groups, institutions (Legislative, Judiciary, Executive) and
public policy processes, and civil rights and civil liberties. The teacher uses cooperative-learning
simulations, seminar-style discussions, data analysis, and interpretive writings to process information.
In addition to the advanced placement curriculum, students design and stage a series of
community-wide civic engagement projects. For example, in the past, the class created
NCGOVOTE.org to increase awareness of low voter turnout in North Carolina. Students also attend
city council and county commission meetings as part of a civic engagement requirement of the
course. All enrolled students are required to take the AP exam in May.
Prerequisite: Department approval (Year)
AP Human Geography
AP Human Geography is a college-level course designed to promote global literacy and citizenship
through the study of the contemporary world and regional issues viewed through a geographic lens.
Students will develop their communication and critical thinking skills as well as geographic literacy
and empathy. Units of study focus on themes such as population, the political organization of space,
agricultural and rural land use, industrialization and economic development, and cities and urban land
use. The course will utilize a problem-based approach to examine issues such as the plight of
refugees, population growth and its environmental and political consequences, the role of religion in
culture and politics, the role of race in urban development, the role of women in the developing world,
and the role of micro-financing in the world economy. Course activities will include simulations,
research assignments, and collaborative problem-solving. All enrolled students are required to take
the AP exam in May.
Prerequisite: Department approval (Year) (1 Global Studies credit)
AP Microeconomics
Through this course, students gain a thorough understanding of the economic principles that relate to
consumers and producers, and they learn about basic economic concepts, such as opportunity costs
and comparative advantage. This course, which emphasizes the nature and function of product
markets, includes a study of supply and demand models, the theory of consumer choice, production
and cost analysis, and the theory of the firm. Students also learn about factor markets - markets of
labor, capital, and land. Finally, the course includes a study of economic efficiency and equity as well
as the role of government in economic affairs. All enrolled students are required to take the AP exam
in May.
Prerequisite: Algebra II and department approval (Year)
AP Macroeconomics
Through this course, students gain a thorough understanding of the economic principles that relate to
an economic system as a whole. Students learn about measures of economic performance, including
GDP, unemployment, and inflation. This course emphasizes aggregate demand and aggregate
supply analysis, including fiscal and monetary policy analysis for both the short-run and the long-run.
Students learn about the financial sector, with emphasis on money supply and demand. Finally, the
Table of Contents 26
```

===== PAGE 27 =====

```text
course includes a study of long-run economic growth and international trade. All enrolled students are
required to take the AP exam in May.
Prerequisite: Department approval (Year) (0.5 Global Studies credit)
AP Psychology
Advanced Placement Psychology is a college-level course that covers a wide number of detailed
topics in Psychology. Students learn the basic concepts behind psychological experimentation and
use them to better understand the contributions of prominent psychologists. The specific areas
covered in this course are research methods, neuroscience, development, sensation and perception,
learning, memory, cognitive processes, personality, social psychology, and mental health. Classroom
methods include a balance of lecture, discussion, interactive activities, and demonstrations, and
assessment involves concept application and writing. This course seeks to illustrate the extent to
which psychology is involved in the everyday lives of students. All enrolled students are required to
take the AP exam in May.
Prerequisite: Department approval (Year)
Introduction to Psychology
This course gives a broad overview of the field of psychology. A focus throughout the course is for
students to develop knowledge of how various areas of psychology apply to their everyday lives.
Topics of study include fundamental psychological perspectives, research methods, personal identity,
neuroscience, positive psychology, and developmental psychology. Classroom methods include
fieldwork, design challenges, discussion, interactive activities, and demonstrations. An interest in how
individuals think, feel, and act is essential, as students will be asked to regularly express themselves
in class and in assignments with regard to the experience of being human. Throughout this course,
students gain insight into their own behaviors and mental processes, as well as an appreciation for
the similarities and differences among classmates.
No prerequisite (Semester) Fall or Spring Term
Comparative Government and Politics
Students in Comparative Government and Politics will study the conceptual tools necessary to
develop an understanding of some of the world’s diverse political structures and practices. Students
will examine both specific countries and their governments and general concepts used to interpret the
political relationships and institutions found in virtually all national politics. Students will study the
governmental systems of the United Kingdom, Nigeria, China, Russia, Iran, and Mexico, providing a
foundation for developing paradigms of different types of political systems. Using these countries as
case studies, students will also seek to understand the political implications of different levels of
economic development and globalization.
No prerequisite (Semester) Fall Term (0.5 Global Studies credit)
Herstory: Women in Global History
This course will introduce students to the progression of gender roles through history, examine the
concept of womanhood through various lenses, and introduce the history of women and gender
Table of Contents 27
```

===== PAGE 28 =====

```text
around the world over the last 1500 years, using primary and secondary source documents. This
course will utilize project-based learning, discussions, debates, and critical analysis to fully
comprehend women’s historical experiences in the context of their diverse backgrounds and how
race, ethnicity, class, sexual orientation, and gender non-conformity intersect with women’s history
and the overall concept of feminism. The course will help students develop their research skills and
writing skills as they dive into the world of historical investigation and analysis.
No prerequisite (Semester) Fall Term (0.5 Global Studies credit)
Legal Issues
What does it mean to think like a lawyer? How can logic help us see multiple sides to an issue? And,
importantly, can legal thinking help us resolve the challenges facing the global population? These
questions are at the core of Introduction to Legal Issues, and anchor our multifaceted understanding
of what thinking like a lawyer encompasses. As they move through the course, students explore the
impact of the law by asking and responding to the following question: How does legal thinking help
me understand myself, others, and the world? Using an interdisciplinary approach, students explore
legal case studies wherein they apply what they learn to real court cases drawn from around the
world. Students then take on the roles of both lawyer and judge to argue for, and decide upon, a
major legal decision pulled from the day’s most compelling headlines. Throughout the course,
students collaborate on a variety of activities and assessments, which enable learning about each
other’s unique perspectives, while building logic-based reasoning, research, and critical thinking skills
in service of understanding the use and application of the law.
No prerequisite (Semester) Spring Term (0.5 Global Studies credit)
Economics of Development
Students will explore economic concepts related to international trade, foreign exchange markets,
foreign direct investment, and economic growth, with an overall focus on how these topics relate to
economic dependencies and development, particularly in Latin American countries. Instructional
strategies will be student-centered, with an emphasis on peer-led discussions of key topics,
examination of differing perspectives, analysis of real-world data, and collaborative problem-solving.
Students may take the course during or after completing AP Microeconomics or Macroeconomics, but
the AP courses are not a prerequisite.
Prerequisite: Global Civics (Semester) Spring Term (0.5 Global Studies credit)
Global Studies: Genocide
This course will introduce students to the foundations of the Universal Declaration of Human Rights
granted to all persons following the Second World War. Students will learn the history and application
of the UDHR and will study and investigate past genocides and human rights violations, as well as
current human rights violations through case studies. This course will utilize project-based learning,
discussions, debates, and critical analysis to fully comprehend the how and why behind these
atrocities and to evaluate possible responses. The course will help students develop their research
skills and writing skills as they dive into the world of historical investigation and analysis.
No prerequisite (Semester) Spring Term
(2 Global Studies: classes required for GSD. Third Global Studies class 0.5 Global Studies credit)
Table of Contents 28
```

===== PAGE 29 =====

```text
Global Studies: Europe and Latin America
Students will examine regional trends and cultures through a multi-disciplinary exploration of Europe
and Latin America. They will investigate recent events through a historical lens, practice empathy
through the use of primary sources, and generate research-driven conclusions and policy
recommendations. The course will focus on developing the skills necessary to be an active and
engaged global citizen in the 21st century: exemplary written and oral communication, critical policy
analysis, advocacy, and social responsibility, research based on a variety of reliable sources,
geographic awareness, collaboration which welcomes multiple perspectives, cultural competence,
excellent listening skills, and solutions-based thinking.
No prerequisite (Semester) Fall Term
(2 Global Studies: classes required for GSD. Third Global Studies class 0.5 Global Studies credit)
Global Studies: Comparative Religions
This course will seek to enhance a student’s understanding of the world’s religions by creating a
classroom environment that encourages the discussion of the history and beliefs of philosophies and
religions such as Christianity, Judaism, Islam, Hinduism and Buddhism. Students will expand on what
they have learned about the major world religions in World History by examining primary and
secondary source readings and by participating in philosophical discussions. The course will
introduce students to ways of thinking that go beyond the typical history course and will ask students
to investigate a multitude of possibilities in the religious and philosophical world.
No prerequisite (Semester) Fall Term
(2 Global Studies: classes required for GSD. Third Global Studies class 0.5 Global Studies credit)
Global Studies: Africa
Students will examine regional trends and cultures through a multi-disciplinary exploration of
Sub-Saharan Africa. They will investigate recent events through a historical lens, practice empathy
through the use of primary sources, and generate research-driven conclusions and policy
recommendations. The course will focus on developing the skills necessary to be an active and
engaged global citizen in the 21st century: exemplary written and oral communication, critical policy
analysis, advocacy, and social responsibility, research based on a variety of reliable sources,
geographic awareness, and collaboration which welcomes multiple perspectives, cultural
competence, excellent listening skills, and solutions-based thinking. Students will conduct in-depth
examinations of several countries including South Africa, the Democratic Republic of Congo,
Rwanda, and Nigeria.
No prerequisite (Semester) Spring Term
(2 Global Studies: classes required for GSD. Third Global Studies class 0.5 Global Studies credit)
Table of Contents 29
```

===== PAGE 30 =====

```text
Global Studies: Asia
Students will examine regional trends and cultures through a multi-disciplinary exploration of Asia.
They will investigate recent events through a historical lens, practice empathy through the use of
primary sources, and generate research-driven conclusions and policy recommendations. The course
will focus on developing the skills necessary to be an active and engaged global citizen in the 21st
century: exemplary written and oral communication, critical policy analysis, advocacy, and social
responsibility, research based on a variety of reliable sources, geographic awareness, collaboration
which welcomes multiple perspectives, cultural competence, excellent listening skills, and
solutions-based thinking. Students will conduct in-depth examinations of several countries including
China and the Koreas.
No prerequisite (Semester) Spring Term
(2 Global Studies: classes required for GSD. Third Global Studies class 0.5 Global Studies credit)
Global Studies: Middle East and North Africa
Students will examine regional trends and cultures through a multi-disciplinary exploration of the
Middle East and North Africa. They will investigate recent events through a historical lens, practice
empathy through the use of primary sources, and generate research-driven conclusions and policy
recommendations. The course will focus on developing the skills necessary to be an active and
engaged global citizen in the 21st century: exemplary written and oral communication, critical policy
analysis, advocacy, and social responsibility, research based on a variety of reliable sources,
geographic awareness, and collaboration which welcomes multiple perspectives, cultural
competence, excellent listening skills, and solutions-based thinking.
No prerequisite (Semester) Spring Term
(2 Global Studies: classes required for GSD. Third Global Studies class 0.5 Global Studies credit)
Global Leadership (Advanced)
Students in this course will be empowered to become more effective collaborators and leaders in a
globally interconnected world. Students will be challenged to think strategically and reflectively as
they participate in individual and collective activities designed to help students explore the skill set
needed for effective, thoughtful, and ethical leadership in collaborative environments. Students will
complete a research project, collaborative projects, and an exit interview process. Students will
develop a deeper understanding of their personal agency and will approach problem-solving with
enhanced curiosity, compassion, and commitment.
Prerequisite: Required for seniors in the Global Studies Diploma Program (Semester) Spring Term
Table of Contents 30
```

===== PAGE 31 =====

```text
Mathematics
The primary goal of the Mathematics Department is to assist students in developing skills to solve
problems, analyze data, and use technology. Teachers and students cooperate in the process of
exploring mathematical reasoning, conjectures, and problem-solving. Students use both inductive and
deductive processes. The bases for instruction are the concepts and algorithms of mathematics, but
real-world applications of the theories comprise a significant portion of instructional time. Students are
required to take four mathematics courses during their Upper School years, with Algebra I, Geometry,
Algebra II, and Precalculus being the required courses for the majority of students. Students in
Advanced classes have several options in completing the four required courses.
Algebra I
This first-year course in Algebra is designed to integrate concepts studied in both algebra and
physics. Students develop a deeper understanding of the interconnectedness between these
disciplines using real-world applications. Students study families of functions and realistic problems
through activities that engage them in data collection, the use of tables and graphs to organize and
display data, the development of symbolic rules to model relations among important variables, and
meaningful questions about those relations. Being able to use algebra comfortably and confidently
will enable students to develop a more powerful understanding of physics. The foundational algebraic
skills taught include a study of lines and linear functions, systems of linear equations and inequalities,
polynomials, factoring, quadratic functions, algebraic fractions, rational and irrational numbers,
absolute values, and an introduction to statistical modeling.
Prerequisite: Pre-Algebra (Year)
Geometry (Advanced)
With department approval, a student may elect to take Advanced Geometry, which offers a rigorous
treatment of topics and an in-depth development of direct and indirect proofs. Topics include angle
relationships, congruence, lines, planes, similarity, circles, polygons, coordinate geometry,
transformational geometry, and right and oblique triangle trigonometry.
Prerequisite: Algebra I (Advanced) and Department Approval (Year)
Geometry (Accelerated)
This course teaches students how mathematics can develop from a postulate system using deductive
reasoning. Students think in spatial terms incorporating points, lines, planes, congruence, and
similarity. The students will work with triangles, polygons, circles, and geometric solids. Students will
use mathematical proof to justify statements. Students will explore classic geometric constructions.
Teachers introduce coordinate geometry and transformational geometry as time permits.
Prerequisite: Algebra I (Year) and Department Approval.
Geometry
Students in this course will study geometric figures such as points, lines, planes, triangles, polygons,
circles, and geometric solids. Students will explore relationships such as congruence, and similarity.
Students learn to approach a problem with a specific goal in mind and logically develop the
Table of Contents 31
```

===== PAGE 32 =====

```text
appropriate steps to reach their conclusion using deductive reasoning. Students will strengthen
algebra skills by modeling geometric properties with algebraic equations. Geometry content required
for ACT and SAT will be covered.
Prerequisite: Algebra I (Year)
Algebra II/Trigonometry (Advanced)
Students study functions and their properties in the following areas: linear, quadratic, polynomial,
rational, power, exponential, logarithmic, and trigonometric. Students increase their knowledge of
mathematical systems using logic, set theory, and proof. Students become experts with graphing
calculators, which aid them in understanding relationships. Students study the concepts of functions,
inverses, factoring, systems of equations, conic sections, sequences, and series, and they apply
these concepts to solve a variety of real-world applications and word problems. In all areas, students
seek to understand multiple treatments of functions: algebraic, graphical, numerical, and verbal.
Prerequisite: Geometry (Advanced) and Department Approval (Year)
Algebra II/Trigonometry (Accelerated)
In this course, students expand upon their thinking skills by analyzing information and incorporating
strategies for resolving problems. Students continue to integrate problem-solving throughout the year
by exploring a variety of applications and word problems. Students study the concepts of functions,
graphing, rational exponents/expressions, polynomial expressions, systems of equations, sequences,
series, logarithms, conic sections, trigonometry, and an introduction to statistics. With the help of a
graphing calculator, students look beyond the simple computed answers and seek an understanding
of these concepts graphically as well as algebraically.
Prerequisite: Geometry Accelerated (Year) and Department Approval
Algebra II
This course includes a thorough review of Algebra I followed by an introduction to a study of the
fundamentals of Algebra II including operations with polynomials, solving linear and quadratic
equations, real and complex numbers, logarithms, graphing on the coordinate plane, inequalities, and
functions. This course encourages students to develop abstract and independent thinking through
the use of concrete examples. Students will be exposed to content required for SAT and ACT.
Prerequisite: Geometry (Year)
Precalculus
This course will satisfy the four-year mathematics requirement. Students will not receive advanced
credit. The first semester begins with an introduction to trigonometry through triangles, the unit circle,
graphing sinusoids, and basic trigonometric proofs. The following units include a study of advanced
algebraic topics (regression equations, graphing, and analysis) through the lens of personal finance.
Students will use a variety of methods and techniques to analyze and solve “real-world” problems.
Topics include consumer credit, loans, mortgages, and taxes. In a culminating activity at the end of
the year, students will prepare a detailed personal budget.
Table of Contents 32
```

===== PAGE 33 =====

```text
Prerequisite: Algebra II and Department Recommendation (This course is recommended for the
student who anticipates needing a Calculus class at the college level.)(Year)
Statistics
This introductory statistics course will offer students a comprehensive understanding of the
fundamental concepts and methods used to analyze data. In today's data-driven world, the ability to
interpret and make informed decisions based on data is an essential skill required in a variety of fields
including business, economics, social sciences, and life sciences. Students will explore key topics
such as data collection, experimental design, descriptive and inferential statistics, and probability.
Throughout the course, they will apply these concepts using real-world examples, gaining hands-on
experience with statistical applets and Microsoft Excel to visualize and analyze data. This course may
be taken as an additional elective.
Prerequisite: Precalculus or equivalent and Department Approval. (Year)
Precalculus (Advanced)
Students will review linear and other polynomial equations. They will then study trigonometry,
focusing on graphing of trigonometric functions, and using the Laws of Sines and Cosines.
Additionally, students will study logarithmic and exponential functions, mathematical induction, conic
sections, complex numbers, polar coordinates, parametric equations, probability, and statistics. The
course will also include a unit on limits and continuity that will prepare students for a college-level
calculus class. Students will use a graphing calculator as an integral part of the course, learning to
link together the algebraic, numerical, and geometric representations of functions. Students taking
this course will receive advanced credit.
Prerequisite: Algebra II/Trigonometry Accelerated and Department Recommendation (This course is
recommended for the student who anticipates needing a Calculus class at the college level.) (Year)
Analysis (Advanced)
This advanced course is for students who are preparing for a college program that will be demanding
in mathematics and science and will include a study of Calculus. The course develops a thorough
analysis of polynomial, rational, exponential, and logarithmic functions. Analytic geometry and
trigonometry as well are included along with vectors, polar and parametric equations. Instruction also
includes an introduction into the theory of limits, first derivatives, and their applications. Students
master the use of the graphing calculator through application problems. This course is for students
who plan to complete AB or Advanced Placement Calculus BC in their senior year.
Prerequisite: Algebra II/Trigonometry Advanced and Department Approval. (Year)
Calculus (Advanced)
This course provides students with an introduction to the concepts of differential calculus and the
applications of calculus. Students develop an understanding of calculus concepts and use these
concepts in solving real-world problems. Students learn the concepts of a limit and how to evaluate a
Table of Contents 33
```

===== PAGE 34 =====

```text
limit and learn to differentiate and integrate a variety of elementary functions. Students taking this
course will receive advanced credit.
Prerequisite: Precalculus (Year)
AP Calculus AB
Students in this course will learn the material necessary for the AP AB examination in Calculus. They
will learn to evaluate limits, to differentiate and to integrate various elementary functions, and to apply
those skills to problems in many different settings. Students will use a graphing calculator as an
integral part of the course, learning to link together the algebraic, numerical, and geometric
representations of functions, and will be required to use the calculator on the AP exam. At the
completion of the course, all students are required to take the AP exam.
Prerequisite: Analysis and Department Approval. (Year)
AP Calculus BC
Students in this course will learn the material necessary for the AP BC examination in Calculus. They
will learn to evaluate limits, to differentiate and to integrate various elementary functions, and to apply
those skills to problems in many different settings. They will also cover vector, polar and parametric
equations and the calculus of infinite series. Students will use a graphing calculator as an integral part
of the course, learning to link together the algebraic, numerical, and geometric representations of
functions, and will be required to use the calculator on the AP exam. At the completion of the course,
all students are required to take the AP exam.
Prerequisite: Analysis and Department Approval. (Year)
AP Statistics
Students will use a graphing calculator and computer software as their method of discovery and
understanding concepts, linking them algebraically, graphically, and numerically, as the AP Exam
requires. Students will examine and simulate probability distributions in order to predict and estimate
future events. Students will investigate ways to analyze the relationship between two or more
variables through the concepts of correlation and regression. At the completion of the course, all
students are required to take the AP exam.
Prerequisite: Advanced Precalculus and Department Approval. (Year)
Calculus III (Advanced)
This course follows BC Calculus and includes the study of multivariable functions, vector-valued
functions in plane and space, curvature, double and triple integrals, vector analysis, and various
engineering physical and mathematical applications. Students will explore three-dimensional
relationships using computer software and examine advanced calculus topics as time permits.
Offered when supported by course enrollment.
Prerequisite: Advanced Placement Calculus BC. (Year)
Table of Contents 34
```

===== PAGE 35 =====

```text
Linear Algebra (Advanced)
The basic operations of linear algebra are those learned in algebra - addition, and multiplication to
produce “linear combinations.” But with vectors, the use of CAS (Computer Algebra System), 3D
graphing applets, we move into three-dimensional space and n-dimensional space! Topics may
include matrices and their applications, determinants, simultaneous linear equations, and elementary
operations, vector spaces, Euclidean spaces, rank and inverses, inner products and ‘best’
approximations, systems of linear equations. Advanced credit is given. Offered when supported by
course enrollment.
Prerequisite: Analysis and Department Approval. (Semester) Fall Term
Differential Equations (Advanced)
Students will examine various differential equations and their solutions, Laplace Transforms, linear
and nonlinear systems, series methods, Fourier Series, boundary value problems, and numerical
methods. Advanced credit is given. Offered when supported by course enrollment.
Prerequisite: AP Calculus BC and Department Approval. (Semester) Spring Term
Table of Contents 35
```

===== PAGE 36 =====

```text
Performing Arts
The performing arts department offers courses and performance opportunities in vocal and
instrumental music and in theater. The department's goal is to allow students the freedom to explore
their own creativity within the context of our various disciplines while challenging them to broaden
their understanding and appreciation of the arts in general.
Band
Students work in an ensemble setting to explore, rehearse, and perform varying styles of repertoire
written for a wind band. This class continues to focus on the development of fundamental musical
skills. Additional concentration on individual elements such as intonation, articulation, and technical
facility are taught along with ensemble-level musical elements such as style, balance, and blend. In
addition to concert performances both on and off-campus throughout the year, band members
perform at athletic events as part of the pep band. Concert attire is required and will be issued on
loan. This course may be repeated for credit.
Prerequisite: Prior band experience. New students with prior instrumental experience should contact
the band director. (Year)
Chorus
Chorus offers students the opportunity to sing music representing a variety of genres within an
ensemble setting. Collaboration and problem-solving are skills used on a daily basis as the students
work for unified tone quality and intonation. Performances throughout the year usually include two
contest events, two formal concerts, and various campus performances. Concert attire is required
and will be issued on loan. This course may be repeated for credit.
No prerequisite but prior choral experience preferred. (Year) (.5 Global Studies credit allowed only
once)
Jazz Ensemble
The Jazz Ensemble course provides students with instruction in the basics of performing in various
jazz styles. Students receive practical preparation in jazz improvisation through group and individual
rehearsal as well as the study of harmony, chord/scale relationships, melodic embellishment, motivic
development, and common jazz rhythms and articulations. Students perform throughout the school
year at various events, both on and off-campus. This course may be repeated for credit.
Prerequisite: Audition is required. (Year)
Orchestra
This course offers instruction and performances of orchestral stringed instruments. The students work
in an ensemble to master tone, intonation, technique, and interpretation of repertoire appropriate to
their ability level. Several performances, including off-campus trips, are planned throughout the year.
Concert attire is required and will be issued on loan. This course may be repeated for credit.
Table of Contents 36
```

===== PAGE 37 =====

```text
Prerequisite: Prior orchestra experience. New students with prior orchestra experience should contact
the Orchestra Director. (Year)
Theatre I: Introduction to Performance
This course will introduce students to theatrical performance from the perspective of the actor.
Students will learn to use movement and vocal techniques to portray believable characters. They will
participate in a variety of performance-based activities such as pantomime, improvisation, scene
work, and contentless scenes. Students will analyze a variety of scripted stories, learn stage
directions, and identify character objectives and obstacles. Successful completion of this course will
give students a greater sense of self-confidence, multiple ways to express themselves, critical
thinking skills, and opportunities to collaborate with their peers.
No prerequisite (Semester) Fall Term
Theatre II: Advanced Acting
This course is for students who have taken Theatre I or been a part of a PDS production, and want to
dive deeper. Students will explore advanced acting techniques including Meisner and Stanislavski,
musical theatre performance including dance and song, as well as modern plays, text/character
analysis, and principles of good audition technique. Students will also explore the role of the theatre
director and have the opportunity to write original scenes in which they direct their peers. This course
will culminate in a final project of the students’ choosing from one of the areas studied throughout the
semester.
*Prerequisite: Any Upper School Theatre Course OR Participation in a PDS Production and with
Faculty approval (semester) Spring Term
Theatrical Performing Arts Lab
Theatrical Performing Arts Lab is for the student who loves to perform or work behind the scenes of a show!
Students will come together to select, cast, design, rehearse, and produce a one-act play, which will be
presented during the semester for an appropriate audience, depending on the theme or script chosen. The
class will choose the script, audition for roles, then rehearse the play during class. Students more interested in
tech theatre will serve as designers for the production. For example, if you are interested in costuming, you
could become our costume designer. Students will participate in all aspects of the production. In addition to
the creative process of producing a show, students will learn how theater can be used for social or political
critique, entertainment, or impact.
No Prerequisite (Semester) Fall Term
Theatre Around the World
This course will examine theatrical traditions around the world, each rich in history and culture.
Students will be exposed to a variety of theatrical representations of cultures such as Noh from
Japan, Kathakali from India, Pantomime from the United Kingdom, Opera from Italy, and Theatre of
the Oppressed from Brazil to name a few. This course will ignite students’ desire to travel the globe
and experience the universal power theatre holds, all while learning more about the countries
represented in our studies.
No Prerequisite (semester) Fall Term (.5 global credit)
Table of Contents 37
```

===== PAGE 38 =====

```text
Theatrical Production and Design
Production and Design requires an active, creative student willing to work at a variety of tasks in a
hands-on environment. Students will explore the various design elements of theatrical costumes,
stage makeup, props, as well as stage management. In addition to design knowledge, students will
learn hand and machine sewing skills, special effect makeup technique and application, and how to
build hand props. Work in this course will also include participating in the design and build elements
of school productions, giving students practical skills applicable to real world settings.
No Prerequisite (Semester) Spring Term
RE(ACT): Theatre and Social Change
This course will establish that dramatic performance can be used as an expression of social change
or social awareness. Students will study the influence Augusto Boal had on social change with his
Theatre of the Oppressed. They will also explore major historical and social world events through the
study of modern plays. They will be exposed to these theatrical texts through reading, research,
analysis, and performance. They will also identify opportunities to highlight social issues that
resonate now.
No Prerequisite (semester) Spring Term (0.5 Global Studies credit)
Technical Theatre
This hands-on course is for students who would like to explore the technical side of theatre. Students
will design and build scenery, paint backdrops, focus-lighting instruments, create sound effects, and
invent special effects.
No Prerequisite (Semester) Fall or Spring Term
Honors Band
This course is for seniors who have successfully completed three years in the Upper School Band,
meet audition requirements, and agree to fulfill additional course requirements set forth by the
instructor. Students taking this course will receive advanced credit.
Prerequisite: Department approval. (Year)
Honors Chorus
This course is for seniors who have successfully completed three years in the Upper School Chorus,
meet audition requirements, and agree to fulfill additional course requirements set forth by the
instructor. Students taking this course will receive advanced credit.
Prerequisite: Department approval. (Year)
Honors Jazz Ensemble
This course is for seniors who have successfully completed three years in the Upper School Band or
Jazz Ensemble, meet audition requirements, and agree to fulfill additional course requirements set
forth by the instructor. Students taking this course will receive advanced credit.
Prerequisite: Department approval. (Year)
Table of Contents 38
```

===== PAGE 39 =====

```text
Honors Orchestra
This course is for seniors who have successfully completed three years in the Upper School
Orchestra, meet audition requirements, and agree to fulfill additional course requirements set forth by
the instructor. Students taking this course will receive advanced credit.
Prerequisite: Department approval. (Year)
AP Music Theory
Students study the aspects of melody, harmony, texture, rhythm, form, and to some extent, history
and style. Students should enter this class with a knowledge of basic theory, including rhythmic
patterns, pitch recognition, and key signatures. Additionally, they should demonstrate the ability to
read and write musical notation and to perform vocally or instrumentally. Prior to enrollment, students
must meet with the instructor to complete a pre-assessment with both aural and non-aural stimulus
questions.
Prerequisite: Successful completion of one year in US Band, US Chorus, US Orchestra, or Jazz
Band. Department approval. (Year)
Table of Contents 39
```

===== PAGE 40 =====

```text
Physical Education and Health
“A sound body is a prerequisite for a fully functioning person.”
If we are to view the student as a whole, we must value his or her physical development as much as
his or her intellectual, emotional, or social growth. Students are required to take PE and Health in the
9th grade for one unit of credit.
Ninth Grade Health
In today’s society, we are inundated with ideas about healthy living and what others suggest we do to
improve our quality of life. It would be simple to believe and follow the first health theory thrown our
way, but in so many cases, this may not improve our quality of life, but instead have a reverse effect.
With this in mind, the ninth grade health course is designed to empower students to follow three
simple steps to attack and analyze relevant health topics. Students will be equipped with tools and
strategies to enhance all six aspects of their health; Spiritual, Mental, Physical, Intellectual,
Environmental, & Social. First, students must research and acquire knowledge about the subject.
Second, they must analyze their research and determine what their attitude is about the subject.
Finally, the students are challenged to look at pre-existing behaviors that impact the subject and set
goals to make any necessary changes to improve their quality of life.
No Prerequisite (Semester) Fall Term or Spring Term
P.E.-Lifetime Wellness
This course is designed to help students become physically literate individuals. It is a unique P.E.
course as it has a substantial emphasis on the cognitive as well as the psychomotor ability of the
student. Students will study important concepts and principles of fitness, health, and wellness through
the use of the Fitness for Life iBook. They will apply these principles physically through the use of
heart rate monitors, peer and self-assessments of weight training techniques through video analysis,
and fitness lab testing. Additionally, the course culminates with a major project in which students will
develop and implement a personal fitness program. Students will experience a variety of physical
activities including yoga and high-intensity interval training. Ultimately, students will work towards
understanding self-management skills that will promote healthy lifestyles.
No Prerequisite (Semester) Fall Term or Spring Term
P.E.-Athletic Development
Personal strength and movement enhancement are two of the major goals of this course. Students
participating in interscholastic athletics, as well as non-athletes, will enjoy and benefit from the
course. Training techniques include Olympic lifts (ground-based multi-joint movements), strength lifts,
metabolic conditioning, plyometrics, agility, speed and acceleration drills, core stability, and flexibility
of movement. Video analysis of the movements in class will be used to correct, improve, and learn
new techniques.
Prerequisite P.E. Lifetime Wellness (Semester) Fall Term or Spring Term
Table of Contents 40
```

===== PAGE 41 =====

```text
P.E.-Dancercise
Students express themselves artistically while receiving numerous health-related fitness benefits in
this course. Students learn techniques from Jazz to Hip Hop as they push themselves to improve
their level of fitness. This course may only be taken once for a half unit of credit.
Prerequisite: P.E. – Lifetime Wellness (Semester) Fall Term or Spring Term
P.E.-Dancercise II
The aim of this course is to give students advanced instruction and further exposure to dance and
hatha yoga while providing an athletic and creative outlet. Students will learn how to properly stretch
and physically warm their bodies up for dance to help improve their mobility and flexibility. Students
will continue building on their previous Dancercise knowledge by learning and executing advanced
movements in jazz and ballet. Students will be introduced to different variations of advanced hatha
yoga and mindfulness exercises.
Prerequisite P.E. - Lifetime Wellness & Dancercise (Semester) Fall Term or Spring Term
P.E.-Yoga and Mindfulness
The aim of this course is for students to experience the mental and physical benefits of daily yoga
and mindfulness practice. In this course students will gain a deep understanding of the history and
philosophy of yoga to accompany their physical daily practice.
They will achieve proper placement of yoga poses and vinyasas. Through daily practices students will
understand and experience first hand the mental and physical benefits of practicing yoga in their daily
lives. Yoga and mindfulness has been proven to help adolescents cope with daily stresses and
anxieties stemming from mental health, social interaction, academics, athletics and social media.
Prerequisite P.E. - Lifetime Wellness (Semester) Fall Term or Spring Term (0.5 Global Studies credit)
P.E.-International Games
As with our global studies program, this course will assist in teaching our students to appreciate and
value the differences in people throughout the world. The course will combine core fitness/sports
components with the history and participation of games from a variety of countries, such as Sepak
Takraw (Thailand), Floorball (Scandinavia), and Gaelic Football (Ireland). Students will discuss the
origin, rules, strategies, and techniques needed to participate in the sport. Additionally, students will
focus on improving their physical fitness through a variety of activities while having their heart rate
monitored.
Prerequisite P.E. Lifetime Wellness (Semester) Fall Term or Spring Term (0.5 Global Studies credit)
Table of Contents 41
```

===== PAGE 42 =====

```text
Science
The primary goals of the Science Department are to develop a correct understanding of scientific
processes and phenomena, through inquiry and modeling methods. The very nature of laboratory
investigations promotes students’ ability to think critically, work collaboratively, and communicate
effectively. The Science Department believes that all students should have a foundation in each of the
sciences and therefore requires students to take all three basic courses - physics, chemistry, and
biology - as minimal preparation for college. There is a wide range of elective and advanced studies
offered beyond the basic course of study.
Physics I
Physics I is a modeling-based physics course that gives students an understanding of the
fundamental concepts and laws that govern the world. Using a variety of techniques for collecting and
analyzing data, students develop models to describe fundamental phenomena. Although conceptual
understanding is the emphasis of this course, students use algebra to express quantitative
relationships and draw conclusions, in addition to developing skills in problem-solving and analytical
thinking. Topics include motion, forces, energy, and electrostatics.
No prerequisite (Year)
Physics I Accelerated
Physics I Accelerated is a modeling-based physics course that gives students an understanding of
the fundamental concepts and laws that govern the world. Using a variety of techniques for collecting
and analyzing data, students develop models to describe fundamental phenomena, in addition to
developing skills in problem-solving and analytical thinking. Physics I Accelerated moves at a faster
pace, investigates topics at greater depth, includes additional models, and is more mathematically
rigorous than Physics I. Topics include motion, forces, circular motion, energy, electrostatics, and
waves.
Prerequisite High level of achievement on the placement test and departmental approval (Year)
Chemistry I
Chemistry I students develop a foundation in the basic topics of chemistry that include the study of
matter, its composition, periodicity, energy, and reactions. Laboratory investigations and activities
reinforce these concepts and emphasize the development of problem-solving skills. In addition,
students will develop models to explain the structure, properties, and interactions of matter.
Prerequisite Physics I (Year)
Chemistry I Accelerated
This first-year chemistry course will investigate the topics that are described in the course description
of Chemistry I. The accelerated class is designed for those students who have a strong interest in
science and exploring chemistry at a greater depth. The accelerated class moves at a faster pace
and investigates topics in more depth. It is very highly recommended for any student who is
considering AP sciences in the future.
Table of Contents 42
```

===== PAGE 43 =====

```text
Prerequisites Physics I Accelerated with 87 average or Physics I with 93 average and departmental
approval (Year)
Biology I
This college preparatory course is based on cellular biology and builds upon topics learned in
Chemistry. Biology covers basic ecology, basic human anatomy and physiology, cell biology and
evolution with an emphasis on the molecular underpinnings that drive cellular processes. Laboratory
investigations, and group work are utilized to improve logical thinking, teach scientific method, and
reinforce concepts. The anatomy and physiology of mammals are investigated by means of
dissection.
Prerequisite Chemistry I or Chemistry I Accelerated (Year)
Biology I Accelerated
This course is based on molecular/cellular biology and builds upon topics learned in Chemistry. The
accelerated class differs significantly from the introductory biology course with respect to the range
and depth of topics covered, pace of instruction, and longer-term guided- independent laboratory
work conducted by students. Laboratory investigations are a central component of this course and
promote a practical application of concepts covered in class. The anatomy and physiology of
mammals are investigated by means of dissection.
Prerequisites: Chemistry I Accelerated with 87 average or Chemistry I with 93 average and
departmental approval (Year)
Anatomy and Physiology
Students learn anatomy and physiology of the human body in the classroom and in the laboratory.
Pairs of students will work together on a cat dissection throughout the entire semester. Students
apply and showcase their knowledge by creating portfolios of their dissection work.
Prerequisite: Biology (can be taken concurrently) (Semester) Spring Term
Applied Sports Anatomy
This course is designed to help students become more knowledgeable about athletic injuries.
Students will be instructed on the musculoskeletal anatomy associated with the major joints of the
body as well as the initial and follow-up phases of injury management. Students will be responsible
for learning practical assessment, rehabilitative techniques, and taping techniques. Additionally,
students will be expected to put in 15 hours of service as student athletic trainers for the sports teams
at PDS where they can apply the skills they learn in class.
No Prerequisite (Semester) Fall Term or Spring Term
Astronomy
Students study basic concepts and the overall framework of stars, galaxies, and our solar system, in
addition to the composition, structure, and origins of the universe. Students study, observe, gather
Table of Contents 43
```

===== PAGE 44 =====

```text
information, and hypothesize about features of the celestial sky. Lab activities include the use of
astrolabs and sun spots to reinforce concepts.
Prerequisite: Physics I (Semester) Spring Term
Bioethics/Biotechnology
In this lab and case-study based course, students will explore the intersection of bioethics and
biotechnology, learning techniques that define 21st-century biology. In the laboratory, students will
utilize the basic tools of biotechnology including micropipettes, PCR, DNA isolation, restriction
fragment analysis, and gel electrophoresis. Students will struggle with the ethical implications of
genetically modified foods, transgenic organisms, genome privacy, and cloning. Students will discuss
recent advances that offer the possibility of curing disease, producing organs, or extending human
life.
Prerequisites: Chemistry, Biology (can be taken concurrently with Biology) (Semester) Fall Term (0.5
Global Studies credit)
Environmental Sustainability
This course takes students on a multidisciplinary exploration of the current trends in environmental
sustainability. The course focuses on sustainable development within the areas of urban planning,
energy, water, and agriculture. In addition, the course offers experiential learning through labs
focused on water management, soil management, and horticultural practices with hands-on activities
in Charger Gardens. As a culminating project, students establish a sustainable business model to
grow and market the produce like an actual urban farm/market garden.
Prerequisite: Chemistry (can be taken concurrently) (Semester) Spring Term (0.5 Global Studies
credit)
Forensic Science
In this course, students explore a variety of forensic techniques. From fingerprint analysis and DNA
profiling to bloodstain pattern interpretation, students will learn about and apply various forensic
techniques through a hands-on, inquiry-based approach that includes considerable time spent on
labs, simulations, and case studies. Emphasis is placed on employing correct forensic lab techniques
and using evidence and reasoning to back up claims about “whodunnit.”
Must be a Sophomore, Junior or Senior to enroll (Semester) Fall Term
Microbiology
This course provides students with an introduction to Microbiology. The focus is on the invisible
world, what’s in us, on us, and around us. The course is designed to be hands-on, with the majority of
the learning through experimentation and laboratory guided inquiries. Students will learn about
bacteria and viruses, identify bacteria in the environment, use microscopes to see the invisible, and
through experimentation, see the beneficial side to microbes as well. Students will also engage in
discussions of important global topics including (but not limited to) antibiotic resistance.
Must be a Sophomore, Junior or Senior to enroll (Semester) Fall Term
Table of Contents 44
```

===== PAGE 45 =====

```text
Neuroscience
This course provides students with an introduction to neuroscience from a biological perspective
focusing on the cellular and molecular functioning of the nervous system. The course is designed to
be hands-on with learning through experimentation and laboratory guided inquiry investigation.
Students will record electrical activity from nerves and muscles, record electrical activity in plants, and
investigate how chemicals affect the function of neurons. Knowledge of biological membranes and
transport is very helpful, but not mandatory.
Prerequisite: Chemistry, Biology (can be taken concurrently with Biology) (Semester) Fall Term
STEM Research and Design
This course offers students the opportunity to pursue original scientific research. Students will choose
their own research topic, design and conduct experiments, and present the results at the end of the
semester. This is a unique chance for students to have an authentic, in-depth experience in scientific
research.
Prerequisite: Physics I and Algebra I (Semester) Spring Term
AP Biology
Advanced Placement Biology differs significantly from the introductory biology courses with respect to
the range and depth of topics covered, pace of instruction, the laboratory work done by students, and
the time and effort required of students. Instruction follows The College Board syllabus which is
organized around 4 Big Ideas: evolution, energetics, information storage and transmission, and
systems interactions. The double class periods each day provide time for lecture, demonstration,
problem-solving, and college-level laboratory experiences. All students take the AP Biology exam at
the end of the course.
Prerequisite: Chemistry I Accelerated with 87 average or Chemistry I with a 93 average. Department
approval (Year)
AP Chemistry
AP Chemistry students study, in-depth, some of the important concepts of Chemistry beyond the
scope of the high school curriculum. Such areas include atomic theory, chemical kinetics,
thermodynamics, and equilibrium. The curriculum follows the recommended outline of topics of the
College Board. The double class period each day provides ample time for lecture, demonstration,
problem-solving, and laboratory investigations. All students take the AP examination at the end of the
course.
Prerequisite: 87 average in Chemistry I Accelerated.
Corequisite: Analysis or higher math and Department Approval (Year)
AP Environmental Science
The goal of this course is to provide students with the scientific principles, concepts, and
methodologies required to understand the interrelationships of the natural world, to identify and
analyze environmental problems both natural and human-made, to evaluate the relative risks
associated with these problems, and to examine alternative solutions for resolving and/or preventing
Table of Contents 45
```

===== PAGE 46 =====

```text
them. This is a multidisciplinary course that requires students to synthesize ideas from physics,
chemistry, biology, geology, geography, economics, history, and government courses. This course
includes a strong laboratory and field investigation component. Students who score well on the AP
exam can earn one semester of college credit for this course.
Prerequisites: Chemistry I Accelerated and Biology I Accelerated or AP Biology with 87 averages or
Chemistry I and Biology I with 93 averages and Department Approval. (Year) (1 Global Studies credit)
AP Physics 1
Students in AP Physics 1 will use algebra to study introductory college physics in this laboratory
based course. In this one-period course, students will analyze data and develop models to describe
fundamental physical principles. Instruction aligns with the College Board objectives list, including
topics such as systems, fields, forces, conservation, and waves. All students will take the AP exam at
the end of the course.
Corequisite: Advanced Algebra II/Trigonometry or Prerequisite: Accelerated Algebra II/Trigonometry
or Algebra III/Trigonometry. Department Approval (Year)
AP Physics C
Students develop an understanding of basic concepts in classical mechanics and electricity and
magnetism with emphasis on critical thinking and problem-solving skills. Meeting two periods each
day enables the student to engage in frequent laboratory activities. Using a variety of techniques,
students collect and analyze data and then develop models to describe fundamental principles. All
students take the AP Physics exam at the end of the course.
Prerequisite or corequisite: Calculus and Department Approval (Year)
Table of Contents 46
```

===== PAGE 47 =====

```text
Visual Arts
Student-artists learn how to communicate visually by making effective use of elements and principles
of aesthetic design. Introductory courses emphasize art-making skills, materials, and processes.
Advanced visual arts courses provide opportunities to explore and develop skills and concepts using
various techniques in both conventional and non-traditional media.
Visual arts teachers design assignments that build confidence and encourage students to relate to
their own personal and cultural experiences. To promote creativity, originality, and problem-solving
skills, teachers expect visual arts students to consider all possible solutions to challenging
assignments.
Successful visual arts students explore cultural differences in art and celebrate multiple perspectives.
This in turn enhances valuable self-assessment skills and allows for constructive commentary during
class critiques. Art historical references infused throughout the curriculum teach a life-long
appreciation of the varied meanings and purposes of art and artists.
Foundations of Art and Design
Student-artists learn how to communicate visually by learning and making effective use of elements
and principles of aesthetic design. The course emphasizes art-making skills, media, and processes.
Students learn basic visual arts vocabulary and art appreciation which they put to use in critiques of
their own work and work by peers. Students explore various media, including drawing, painting, and
3D Design. Prerequisite: No prerequisite: Fall Term or Spring Term
Drawing
Drawing acts as an introduction to drawing as a primary means of visual investigation, involving skills
and theory including perspective, proportion, rendering, and expression. Students are exposed to
various techniques and media through a series of exploratory exercises and studio projects.
Prerequisite: Foundations of Art and Design (formerly Art I) Fall Term or Spring Term
Painting
Painting provides students with a strong foundation of painting concepts and techniques, allowing for
experimentation and exploration of materials and painting media, brush techniques, and basic color
theory. Students have the opportunity to explore water-based as well as mixed media, and they apply
their knowledge while working on observational and conceptual assignments that will challenge their
creative boundaries and enable them to develop their artistic voices.
Prerequisite: Foundations of Art and Design (formerly Art I). Fall Term or Spring Term
Studio Art
Studio Art is for highly motivated art students who are ready to work independently. The course
includes practice in the use of various media, the acquisition of techniques, the practice of art
criticism and analysis, and the development of an individual, exploratory approach to art. This course
is recommended, but not required, for students wishing to take AP Art and Design.
Table of Contents 47
```

===== PAGE 48 =====

```text
Prerequisite: Two of the following courses: the former Art III OR the former Art II and one of the
following courses, OR two of the following courses: Digital Media, Drawing, Painting, Photography, or
3D Design, and departmental approval. (Semester) Fall Term and/or Spring Term.
3D Design
This course focuses on the use of three-dimensional (3-D) elements and principles of art and design
in the creation of work that involves space and form. Students will explore a variety of materials,
processes, and ideas in projects that may include figurative or non-figurative sculpture, assemblage,
ceramics, and installation pieces. Each student’s sense of space and spatial relationships will be
enriched.
Prerequisite: Foundations of Art and Design (formerly Art I) Fall Term or Spring Term
AP Art History
Beginning with the study of Paleolithic cave paintings and concluding with contemporary works, this
course makes the serious art student aware of historical styles, movements, and individual artists.
This course requires the student to take the AP exam in May.
Prerequisite: Foundations of Art and Design (formerly Art I) and department approval (Year) (1
Global Studies credit)
AP Art and Design
AP Art and Design is a year-long program consisting of three different courses and Portfolio Exams -
AP 2-D Art and Design, AP 3-D Art and Design, and AP Drawing - corresponding to college and
university foundations courses. Designed for highly motivated students who work independently, the
course focuses on the development of a portfolio through practice in various media, acquisition of
techniques, art criticism and analysis, and the cultivation of an individual, exploratory approach to art.
Students create work that demonstrates inquiry through art and design, documenting their processes
and including written information about their work. The portfolio, which must be submitted for AP
evaluation in May, is assessed based on specific criteria including skillful synthesis of materials,
processes, and ideas, as well as sustained investigation through practice, experimentation, and
revision. Prerequisites include Foundations of Art & Design (FAD), and at least two of the following
courses: Digital Media, Drawing, Painting, Photography, or 3D Design, along with departmental
approval.
Photography
Photography I provides an opportunity to learn both traditional black-and-white film photography as
well as digital manipulation of images on the computer. Students learn basic darkroom processes to
produce prints from black-and-white film negatives, and also learn basic color correction, cropping
and image manipulation using Adobe Photoshop. Students must have access to a 35mm SLR
(single-lens reflex) film camera, and also provide their own photography paper.
Prerequisite: Foundations of Art and Design (formerly Art I) (Semester) Fall Term or Spring Term.
Table of Contents 48
```

===== PAGE 49 =====

```text
Digital Media
Digital Media introduces students to the powerful software tools used to create digital content for
print, video, and the web such as Adobe Photoshop, Indesign, Illustrator, and Premiere pro. Students
will use photography, video, image manipulation and digital drawing tablets in this project- based
class. Imaging is designed for students who are interested in developing art from a digital
perspective, or who are interested in graphic design and video production. Projects may include:
Movie poster design, vector illustration, logo design, advertisements, digital painting, typographic
designs, photo compositing, and video production.
Prerequisite: Foundations of Art and Design (formerly Art I) Fall Term or Spring Term
Understanding Art: A Global View
Through this course, students will examine various forms of fine art—including but not limited to
painting, drawing, printmaking, sculpture, installation, architecture, new media, and mixed media—
across cultures with a focus on the Postmodern and Global Contemporary periods. Emphasis will be
placed on visual literacy, as students will learn how to expertly look at and break down a work of art,
as well as how artists communicate in a contemporary world, including what choices they make to
create meaning and elicit specific viewer responses. Course materials include a variety of readings,
films, and field trips.
Prerequisite: Foundations of Art and Design (formerly Art I) (Semester) Fall Term or Spring Term (0.5
Global Studies credit)
Yearbook
This course is a collaborative course where students use Adobe Photoshop and InDesign to design
and produce the school’s yearbook. Students develop skills in graphic design, photography, page
layout, copywriting, and interview techniques while creating a professional-quality publication.
Prerequisite: Foundations of Art and Design (formerly Art I), department approval, and two teacher
recommendations. (Year).
Table of Contents 49
```

===== PAGE 50 =====

```text
World Language
The goal of The World Language Program at Providence Day School is for students to graduate
biliterate in the language they choose. Most of our students graduate PDS earning the Seal of
Biliteracy. The World Language Department is committed to teaching according to the ACTFL
(American Council on the Teaching of Foreign Languages) Proficiency Scale within the modes of
communication (Interpersonal Speaking, Presentational Speaking, Presentational Writing, Interpretive
Listening, and Interpretive Reading).
Students will learn to engage in conversations, provide and obtain information, express feelings and
emotions, and exchange opinions. They will learn to understand and interpret written and spoken
language on a variety of topics, and they will work to be able to present information, concepts, and
ideas to an audience of listeners or readers on a variety of topics. Culture is integrated on a daily
basis into language study. The teaching of language and culture goes hand in hand and one informs
the other. Students will learn language structures in context and use them to convey meaning. The
courses address language structures in as much as they serve the communicative task and not as
the end goal unto themselves.Two years of the same language in grades 9-12 are required for
graduation. It is strongly recommended that students who are proficient and interested in a language
continue beyond the requirement.
Seal of Biliteracy
The Seal of Biliteracy serves to formally certify attainment of biliteracy for students. It is a statement
of accomplishment that helps to signal a student’s linguistic and cultural readiness not only for career
and college but also for engagement as a global citizen. The Seal of Biliteracy is already awarded by
schools located in all 50 states and the District of Columbia. *Senior students who have completed
Spanish, French, Chinese, or German 6, 7, or AP, as well as those currently enrolled in Latin 4 or
higher, are eligible to apply.
Please Note:*=Proficiency descriptors taken from the American Council on the Teaching of Foreign
Languages (www.ACTFL.org).
Year 1 Courses in French, German, and Spanish:
These courses are for beginning language students working towards the achievement of benchmarks
for the Novice High* proficiency level - i.e. expressing themselves in simple conversations and
presentations on familiar topics using highly practiced, memorized words and phrases. Students are
able to understand speech dealing with areas of practical need such as highly standardized
messages, phrases, and instructions surrounding familiar topics such as “Who am I?,” “Let’s go
shopping!,” “What do you like to do?”, “My family”.
No prerequisite (Year)
Year 2 Courses in French, German, and Spanish:
Students in Year 2 will build upon the foundation set in Year 1 as students work toward the
benchmarks of the Intermediate Low proficiency level. Further practice initiating, sustaining, and
bringing to a close conversation revolving around familiar situations (themselves, family, friends,
school) will be the focus. At this level, students are encouraged to speak as much as possible and to
try adding something more (another fact, thought, or a question) to keep the conversation going.
Table of Contents 50
```

===== PAGE 51 =====

```text
Communicative tasks will require students to create with the language in straightforward social
situations, restricted to the concrete exchanges and predictable topics necessary for survival in the
target-language culture. Themes include: “Going Out,” “Traveling,” “Vacation,” “Activities,” “My
Routine,” and “Health.”
Prerequisite: Successful completion of Year 1, with a “B-” (80) or better. For French and Spanish:
Successful completion of the Lower School World Language Program and fifth-grade world language
teacher approval. (Year)
Year 3 Courses in French, German, and Spanish:
These courses build upon the foundation set in Year 2 as students begin to work towards the
achievement of benchmarks for the Intermediate Mid 1 proficiency level, i.e. being able to handle
successfully a limited number of uncomplicated communicative tasks and creating with the language
using compound sentences. Students will be required to ask questions in order to sustain a
conversation and practice adding new information in order to achieve completion and clarity.
Prerequisite: Successful completion of Year 2, with a “B-” (80) or better. (Year)
Year 4 Courses in French, German, and Spanish:
These courses build upon the foundation set in Year 3 as students work towards the achievement of
benchmarks to move into the Intermediate Mid 2 proficiency level, i.e. proving capable of asking more
specific questions to get more detailed information. Intermediate Mid speakers are able to use
expanded time frames, be more specific when describing things (quality, quantity, size), and can talk
about the steps needed to accomplish what they need.
Prerequisite: Successful completion of Year 3, with a “B-” (80) or better. (Year)
Year 5 Courses in French, German, and Spanish:
These courses build upon the foundation set in Year 4 as students continue consolidating
achievement to reflect the broad range of abilities for the Intermediate Mid 2 proficiency level.
Students will practice telling stories from beginning to end. They will work on describing everything
they see in their familiar surroundings (class, neighborhood, home), use expanded time frames, and
practice having conversations about topics beyond their immediate environment. Year 5 students will
also practice resolving situations with a complication and expressing themselves in well-connected
sentences.
Prerequisite: Successful completion of Year 4, with a “B-” (80) or better. (Year)
Year 6 Courses in French, German, and Spanish (Advanced):
These advanced courses strive to promote and reinforce fluency and accuracy in language. Students
will work toward the achievement of benchmarks for the Intermediate High proficiency level. These
students can keep a conversation going by asking questions, telling stories, describing people,
places, and things, using expanded time frames, and reporting events. They can talk about some
topics beyond themselves and can resolve problems that they might encounter in their daily lives.
Students at this level speak in well-connected sentences and some paragraphs in a way that people
who speak the target language can understand them. The course engages students in an exploration
of culture in both contemporary and historical contexts. It develops students’ awareness and
Table of Contents 51
```

===== PAGE 52 =====

```text
appreciation of various cultural aspects such as current affairs, values, attitudes, and patterns of
social interactions.
Prerequisite: Successful completion of Year 5 with a “B-” (80) or better. (Year)
Option: Sophomores and rising juniors in Year 4 with an “A” (93) or better for semester 2 and
department approval.
Prerequisite: Successful completion of German 5 with a “B-” (80) or better. (Year)
Spanish 7 Advanced: Conversation and Culture
Advanced Spanish Conversation is designed for students to develop strong conversational skills,
improve their ability for self-expression, expand their active vocabulary, gain a deeper understanding
and appreciation of Hispanic language and culture and use their Spanish in a natural context.
Students will learn and practice formal and colloquial language, meet native speakers and students
from Spanish speaking countries both in class and by means of technology. Students will research
topics of interest relevant to their lives in order to be able to discuss and debate them. The proficiency
target for the course is Intermediate High.
Prerequisite: Successful completion of Spanish 6 Adv. with an (80) or better
French 7 Advanced: Francophone Culture through Literature
Do you want to further enhance your speaking ability through discussion and conversation? This
course will improve your language proficiency, historical, geographical, and cultural awareness
through the lens of exciting and rich francophone novels and graphic novels. Our discussions will
center around what it means to be a French speaker in different parts of the world, as well as specific
language, customs, and cultures that are depicted in the material we cover. As Intermediate High
speakers, you will be expected to provide insightful opinions, analyze, predict, and compare and
contrast. Although the emphasis will be placed on Interpersonal Speaking skills, all modes of
communication will feature in this course. Some of the novels we will study are: Oscar et la Dame
Rose (short Novel) and Aya de Yopoungo (Graphic Novel).
Prerequisite: Successful completion of French 6 Advanced or French 7 Advanced: Francophone
Culture through Movies with a “B-” (80) or better. (Year)
French 7 Advanced: Francophone Culture through Movies
Do you want to further enhance your speaking ability through discussion and conversation? This
course will improve your language proficiency, historical, geographical, and cultural awareness
through the lens of exciting and rich francophone movies. Our discussions will center around what it
means to be a French speaker in different parts of the world, as well as specific language, customs,
and cultures that are depicted in the material we cover. As Intermediate High speakers, you will be
expected to provide insightful opinions, analyze, predict, and compare and contrast. Although the
emphasis will be placed on Interpersonal Speaking skills, all modes of communication will feature in
this course. Some of the movies we will study are: Bienvenue Chez les Ch’tis and Mariam.
Table of Contents 52
```

===== PAGE 53 =====

```text
Prerequisite: Successful completion of French 6 Advanced with an 80% or better, semester 2, French
7 Advanced: Francophone Culture through Literature with an 80%. (Year)
*These two French 7 courses will run in alternating years.
AP French Language:
This course is designed for Senior students in their final year of language studies. Students in AP
French prepare to deal successfully with the complex skills required on the AP French Language and
Culture exam such as writing persuasive essays and timed guided conversations. The course
provides them with opportunities for critical thinking, independent work, and cooperative activities.
They develop a global perspective capable of fueling an interest in francophone cultures and respect
for their products, practices, and perspectives. The curriculum covers the following units: Global
Challenges, Science and Technology, Contemporary Life, Personal and Public Identities, Families
and Communities, and Beauty and Aesthetics. All materials used in the course will come from
authentic sources. As students exit the course in May, they should feel confident in their abilities to
comprehend written texts and oral discourse as well as communicating in writing and speaking
(Interpretive, Presentational, and Interpersonal Communication).
Prerequisite: Completion of French 7 Advanced with an 80% or above. Rising seniors - completion of
French 6 with an 87% or above and department approval. Rising juniors may move directly to AP
French with completion of French 6 with an 87% or above and department approval, but they will not
be eligible to enroll in French 7 during their senior year and they will not be eligible to earn the
Seal of Biliteracy.
AP Spanish Language:
This course is designed for Senior students in their final year of language studies.
The goal of AP Spanish Language at Providence Day School is to prepare students for success on
the AP Spanish Language Exam. This course takes a holistic approach to language proficiency and
recognizes the complex interrelatedness of comprehension and comprehensibility, vocabulary usage,
language control, communication strategies, and cultural awareness. This course also strives to
promote fluency and accuracy in language use. The teacher expects the students to solely use
Spanish in the classroom as they engage in daily conversations based around the central themes of
the course. The curriculum covers the following units: Global Challenges, Science and Technology,
Contemporary Life, Personal and Public Identities, Families and Communities, and Beauty and
Aesthetics. All materials used in the course will come from authentic sources. Some of the activities in
which students will engage are: responding to weekly online posts, voice recordings, crafting email
responses, writing persuasive essays, reading short stories and articles, viewing and listening to
Spanish-language film and audio, and participating in daily conversations.
Prerequisite: Completion of Spanish 7 Advanced with an 80% or above. Rising seniors - completion
of Spanish 6 with an 87% or above and department approval. Rising juniors may move directly to AP
Spanish with completion of Spanish 6 with an 87% or above and department approval, but they will
not be eligible to enroll in Spanish 7 during their senior year, and they will not be eligible to
earn the Seal of Biliteracy.
Latin 1:
This course familiarizes students with classical language acquisition through a combined study of
language, its historical context, and its impact on the modern world. Students increase their Latin
Table of Contents 53
```

===== PAGE 54 =====

```text
(and English) vocabulary, develop their reading comprehension skills, learn basic Latin structures,
and explore the many cultural aspects of ancient Rome. Students will comprehend classroom
commands in Latin and will be able to respond to simple questions. Themes include: daily life of a
wealthy Roman family, gods and heroes, murderers and rulers, building a city and entertaining the
masses. No prerequisite (Year)
Latin 2:
In Latin 2, students read Latin stories set in the ancient metropolis of Rome. In addition to
strengthening their Latin vocabulary base, students increase their knowledge of the language through
the intentional study of grammar concepts and through interpreting stories of increasing complexity.
These lively stories invite comparisons with modern diverse cultural practices. Themes include:
feasting with friends, public bathing, piracy, gladiatorial combat, political unrest, resistance, and
propaganda.
Prerequisite: Successful completion of Latin 1, with a “B-” (80) or better. (Year)
Latin 3:
Latin 3 includes a review of previously learned grammar and vocabulary and introduces the clauses
that enhanced ancient writing. Increased reading proficiency is the primary emphasis of this course.
The reading selections and culture studies in this course progress to unadapted Latin through the
prose of Livy and Pliny, and the poetry of Catullus. Themes include: celebrations, volcanic eruptions,
friendship, Roman heroes, kings, and magic.
Prerequisite: Successful completion of Latin 2, with a “B-” (80) or better. (Year)
Latin 4:
Latin 4 is a literature course exploring the poetry of Catullus, Ovid, and Vergil. Students read ancient
texts while considering their modern relevance and influence. This course encourages students to
read Latin aloud to hear the meter of the poetry and to evaluate the effectiveness of literary devices.
Themes include: How to woo and/or repel a love interest, myths of people transformed into trees or
animals, and how to escape the wrath of the gods.
Prerequisite: Successful completion of Latin 3, with a “B-” (80) or better. (Year)
Latin 5: (Advanced)
Latin 5 (Advanced) is a literature course that includes both prose and poetry. The texts chosen for this
course reflect diverse perspectives from a wide variety of time periods. There is a project-based
component of this course in which students analyze comparative texts with common themes. The
selections for Latin 5 and AP Latin will come from the same authors, but students will be held to a
different level of understanding and the length of the selections will vary between the two courses.
Assessments for Latin 5 and AP Latin will be appropriate for each individual Latin level. Familiar
authors will include Vergil, Pliny, Catullus, and Ovid. Students will also encounter texts from authors
outside of the ancient Roman time period, such as Amerigo Vespucci, Giovanni Boccaccio, and
Charles François Lhomond. Themes include: death and the underworld, animosity between humans
and gods, war, and fate.
Table of Contents 54
```

===== PAGE 55 =====

```text
Prerequisite: Successful completion of Latin 4, with a “B-” (80) or better. (Year)
*Latin 5 and AP Latin are taught together with differentiated instruction and assessments to meet the
distinct goals and expectations of each course.
AP Latin:
This course presents students with the material and skills required for success on the AP Latin Exam.
The curriculum covers a wide range of themes and authors that encourage students to consider not
only ancient Roman life, but also its impact on the modern world. Students learn to analyze text,
recognize literary devices, and cite underlying themes. There is a project-based component and an
essay writing component of this course in which students compare and contrast Latin texts with
common themes.The selections for Latin 5 and AP Latin will come from the same authors, but AP
students will be asked to complete their assignments and assessments at a level consistent with an
intermediate college-level Latin course. Familiar authors will include Vergil, Pliny, Catullus, and Ovid.
Students will also encounter texts from authors outside of the ancient Roman time period, such as
Amerigo Vespucci, Giovanni Boccaccio, and Charles François Lhomond. Themes include: death and
the underworld, animosity between humans and gods, war, and fate.
Prerequisite: Successful completion of Advanced Latin 4 or 5, with a “B+” (87) or better and
department approval. (Year)
Latin 5 and AP Latin are taught together with differentiated instruction and assessments to meet the
distinct goals and expectations of each course.
Mandarin Chinese 1:
This course is for beginning language students working towards the achievement of the Novice Mid
proficiency level benchmarks - i.e. using words, phrases, and simple memorized sentences to
practice and improve upon comprehension and communicative skills. Themes include: “Greetings,”
“Family,” “Dates and Time,” “Hobbies,” “Visiting Friends,” and “Weather.”
No prerequisite. (Year)
Mandarin Chinese 2:
Students in Year 2 will build upon the foundation set in Year 1 and work toward the benchmarks of the
Novice High proficiency level. The focus will be placed on keeping a conversation going by asking
follow-up questions on the same topic and working to understand and talk around words that students
may not know. Students are able to understand speech dealing with areas of practical needs in highly
standardized messages, phrases, or instructions on familiar topics such as “Making Appointments,”
“Studying Chinese,” “School Life,” “Shopping,”, and “Transportation.”
Prerequisite: Successful completion of Year 1, with a “B-” (80) or better. Successful completion of the
Lower School Mandarin Chinese and fifth-grade world language teacher approval. (Year)
Table of Contents 55
```

===== PAGE 56 =====

```text
Mandarin Chinese 3:
Students in Year 3 will build upon the foundation set in Year 2 as students work toward the
benchmarks of the Intermediate Low proficiency level. Further practice initiating, sustaining, and
closing conversations revolving around familiar situations (themselves, family, friends, school) will be
the focus. At this level, students are encouraged to speak as much as possible and to try adding
more information (another fact, thought, or a question) to keep the conversation going.
Communicative tasks will require students to create with the language in straightforward social
situations, restricted to concrete exchanges and predictable topics necessary for survival in the
target-language culture. Themes include: “Dining,” “Asking Directions,” “Birthday Party,” “Seeing a
Doctor”, and “Hanging Out”.
Prerequisite: Successful completion of Year 2, with a “B-” (80) or better. (Year)
Mandarin Chinese 4:
This course builds upon the foundation set in Year 3 as students begin to work towards the
achievement of benchmarks for the Intermediate Mid 1 proficiency level, i.e. being able to handle
successfully a limited number of uncomplicated communicative tasks and creating with the language
using compound sentences. Students will be required to ask questions in order to sustain a
conversation and practice adding new information in order to achieve completion and clarity. The
course also guides students in exploring diverse aspects of Chinese culture, fostering their
awareness and appreciation for its rich and unique traditions.Themes include: "Renting an
Apartment," "Sports," "Travel," and "In the Airport."
Prerequisite: Successful completion of Year 3, with a "B-" (80) or better. (Year)
Mandarin Chinese 5:
This course builds upon the foundation set in Year 4 as students work further to consolidate the
achievement of benchmarks for the Intermediate Mid 1 proficiency level.
Students will work toward the ability to successfully handle uncomplicated communicative tasks by
creating with the language using compound sentences.
Students will practice to be able to successfully handle a limited number of uncomplicated
communicative tasks and create with the language using compound sentences. Students will be
required to ask questions in order to sustain a conversation and practice adding new information in
order to achieve completion and clarity. In addition, the course delves into the exploration of Chinese
culture, fostering awareness and appreciation of the richness and uniqueness of cultural traditions.
Themes include: "Back to School " "In the Dormitory," "In the Restaurant," and "More About
Shopping."
Prerequisite: Successful completion of Year 4, with a "B-" (80) or better. (Year)
Mandarin Chinese 6: (Advanced)
This course builds upon the foundation set in Year 5 as students work towards consolidating
achievement to reflect the broad range of abilities for the Intermediate Mid 2 proficiency level.
Students will practice telling stories from beginning to end. They will work on describing everything
they see in their familiar surroundings (class, neighborhood, home) and practice having conversations
Table of Contents 56
```

===== PAGE 57 =====

```text
about topics beyond their immediate environment. Year 6 students will also practice resolving
situations with a complication. They are able to express themselves in well-connected sentences. The
course also engages students in an exploration of contemporary Chinese culture in educational,
social, and technological contexts and develops their awareness and appreciation of the richness and
uniqueness of Chinese culture. The themes include: “Course Selection,” “Boy/Girl Friend,” “Computer
and Internet,” and “Part-time Jobs.”
Prerequisite: Successful completion of Chinese 5 with a "B-" (80) or better. (Year).
Mandarin Chinese 7: (Advanced)
This course builds upon the foundation set in Year 6 as students continue consolidating achievement
to reflect the broad range of abilities for the Intermediate Mid 2 proficiency level. Students will practice
telling stories from beginning to end. They will work on describing everything they see in their familiar
surroundings (class, neighborhood, home) and practice having conversations about topics beyond
their immediate environment. Year 7 students will practice resolving situations with a complication and
expressing themselves in well-connected sentences. The course engages students in an exploration
of culture in both contemporary and historical contexts. It develops students’ awareness and
appreciation of the richness and uniqueness of Chinese culture. Topics include: “ Education,”
“Festivals,” “Environmental Challenges,” and “Healthy Living.”
Prerequisite: Successful completion of Year 6 with a “B-” (80) or better or AP Chinese with a B- (80)
or better (Year)
AP Chinese Language and Culture:
This course is designed for Senior students in their final year of language studies.
Advanced Placement Chinese Language and Culture includes aural/oral skills, reading
comprehension, grammar, and composition. This course provides students with varied opportunities
to further develop their proficiencies across the communicative modes (speaking, listening, reading,
and writing skills) and the five goal areas (communication, cultures, connections, comparisons, and
communities). The curriculum includes the following units: Families and Communities, Personal and
Public Identities, Beauty and Aesthetics, Science and Technology, Contemporary Life, and Global
Challenges. Students explore both contemporary and historical aspects of Chinese culture by reading
Chinese materials. Throughout the course, assessments are frequent, varied, and explicitly linked to
content and skills that comprise the learning goals of each unit of study. Students apply their growing
knowledge of Chinese culture to communicative tasks in real-life contexts and develop abilities to
write and speak in a variety of discourse styles, using both keyboarding and handwriting skills.
Students also gain the necessary knowledge of Chinese vocabulary, idiomatic expressions, and
grammatical structures. The students develop an awareness of China’s role in issues of global
importance in the areas of energy and environment, economics, and politics.
Prerequisite: Completion of Mandarin Chinese 7 Adv. with an 80% or above. For rising seniors only -
completion of Mandarin Chinese 6 with an 87% or above in the 2nd semester and department approval.
Table of Contents 57
```

===== PAGE 58 =====

```text
The Art and Science of Teaching
This course is designed to provide students with the opportunity to explore the profession of teaching.
Topics covered will include child development, the psychology of learning, instructional practices,
classroom management, history of Education, and more. The course is a project-based experience
requiring students to actively engage in projects in between the weekly class meetings. Students will
be required to do interactive read-alouds, independent studies, design lesson plans, work with
students, maintain a blog, and complete a classroom experience.
This course is an elective that will earn you .5 credit. The course meets once a week during Upper
School lunch.
Prerequisites: All rising juniors and seniors interested in participating in this course will need to
complete an interview process with the instructors.
Table of Contents 58
```

===== PAGE 59 =====

```text
Upper School
& S
Tosha Arriola
Upper School Head
B.A., SUNY Cortland
M.Ed., Queens University of Charlotte
M.S.O.D., Queens University of Charlotte
Appointed: 2018
Bruce Bacon
Math
B.S., Davidson College
M.A.T., University of North Carolina at Charlotte
Appointed: 2023
Lisa Baldini
World Language
B.A., Florida State University
M.A., University Arizona
Appointed: 2019
Jay Barron
World Language
B.A., Davidson College
M.Ed., University of North Carolina at Greensboro
Appointed: 2003
Claire Bell
School Counselor
B.A., Southern Methodist University
M.A., University of Memphis
Appointed: 2018
Jonathan Benadiba
Science
B.S, New York University
M.A., New York University
Appointed: 2022
Jordan Benoit
English
B.A., Florida State University
M.A., University of Colorado
Appointed: 2012
Administration
Staff
Table of Contents 59
```

===== PAGE 60 =====

```text
Andrea Bledsoe
Science
B.S., Ohio University
Ph.D., University of Alabama at Birmingham
Appointed: 2022
James Bledsoe
Science
B.S., Washington and Lee University
M.A., University of Alabama at Birmingham
Appointed: 2012
Jennifer Bratyanski
History
B.A., Queens University
M.A., University of Alabama
Ph.D., University of North Carolina at Greensboro
Appointed: 2013
Jennifer Bray
History
Global Online Academy Site Director/Instructor
B.A., Clemson University
M.A., Furman University
Appointed: 2013
Lucie Bridgland
World Language
B.A., Universite Paris Quest
P.G.C.E., Goldsmiths College (UK)
M. Ed., University of Kings College (UK)
Appointed: 2012
Amanda Brooks
Physical Education and Health
B.S. UNC-Pembroke
M.A. UNC-Pembroke
Appointed: 2022
Freddie Brown
Athletics
B.A., Wofford College
Appointed: 2023
Paul Burnam
Physical Education and Health
B.A., Morningside College
Table of Contents 60
```

===== PAGE 61 =====

```text
Appointed: 2004
Gordon Bynum
History
Assistant Head of Upper School/Registrar
B.A., University of North Carolina at Chapel Hill
Appointed: 2000
Joshua Cannon
Science
B.S., University of North Carolina at Charlotte
Appointed: 2007
Tom Caruso
Physical Education and Health
B.S.E., University of Arkansas
Appointed: 2010
Annie Castro
Mathematics
Math Department Chair
B.S., Florida International University
M.S., Nova Southeastern University
Appointed: 2008
Sara Chen
World Language
B.A., Southwest University of Political Science & La
Appointed: 2015
Anna Church
Science
B.A., West Virginia University
M.A., West Virginia University
Appointed: 2024
Laura Clark
Associate Director of College Guidance
B.A., Miami of Ohio University
M.A., University of Pittsburgh
Appointed: 1997
Suzanne Clements
Global Education Assistant
B.S., Boston University
Appointed: 2019
aw
Table of Contents 61
```

===== PAGE 62 =====

```text
Mary Elizabeth Coley
English
B.A., Davidson College
M.Ed., University of Virginia
Appointed: 2000
Damon Coiro
Athletics
B.A., Special Education
Greensboro College
Appointed: 2023
Nicole Collins
Upper School Librarian
Head Librarian
B.S., University of Michigan
M.I.S. University of Michigan
Appointed: 2010
John Compton
History
B.A., Wake Forest University
M. Ed., Wake Forest University
Appointed: 2009
Gisela Cordero-Cinko
World Language
B.A., Universidad de Puerto Rico, Recinto de Río P
M.A., New York University
M.A.T., Rutgers University
Appointed: 2020
Glyn Cowlishaw
Head of School
B. Ed., University of Reading (UK)
M. Ed., University of Leeds (UK)
Ed. S., The Citadel
Ph.D., South Carolina State University
Appointed: 2011
Clint Crumley
English
B.A., University of North Carolina at Chapel Hill
M.A., Florida State University
Ph.D., University of Kansas
Appointed: 1999
Piedras
Table of Contents 62
```

===== PAGE 63 =====

```text
Katherine Currier
English
B.A., Wagner College
Appointed: 2016
Edward Dickson, Jr.
History
History Department Chair
B.A., Princeton University
M.A., University of California at Santa Barbara
Appointed: 1991
Joanna Du
World Language
B.A. Hebei Normal University (China)
M.A. from Sichuan University (China)
Appointed: 2015
Gwladys DuPont
World Language
B.A., Université Francois Rabelais
M.A., Université La Sorbonne Nouvelle
M.A., Greensboro College
Jordan Ellis
Performing Arts
B.A. Musical Theater, Catawba College
Appointed: 2014
John Erb
Athletic Trainer Health
B.S., West Chester University
M.S., Marshall University
Appointed: 1991
William Finneyfrock
Physical Education and Health
B.S., Clemson University
Appointed: 1990
Beatriz Franco
World Language
B.A. Universitat Autònoma de Barcelona UAB
B.A. Northern Kentucky University NKU
M.A. University of South Florida USF
Appointed: 2014
Table of Contents 63
```

===== PAGE 64 =====

```text
Noela Frost
World Language
B.A., St. Catherine’s School, Uruguay
Appointed: 2019
Brooke Fulton
Performing Arts
B.F.A., Auburn University
M.F.A., University of Southern Mississippi
Appointed: 2022
Justin Gammell
Math
B.S., Hofstra University
Appointed: 2024
Roy Garrison
History
B.A., University of North Carolina at Chapel Hill
M.A., University of North Carolina at Charlotte
Appointed: 1983
Evan Gates
Physical Education
Strength and Conditioning Coach
B.A Tusculum University
Appointed: 2022
Adrian Gordon
Performing Arts
B.A., University of Miami
M.S., Florida International University
Appointed: 2022
Andrea Gowin
History
Dean of Students
B.S., James Madison University
M.A., James Madison University
Appointed: 2013
Joe Grabenstetter
History
B.A., University of Notre Dame
Appointed: 2006
Table of Contents 64
```

===== PAGE 65 =====

```text
Jennifer Haney
Science
B.S. Georgia Institute of Technology
M.Ed. Georgia State University
Appointed: 2015
Michael Hough
Performing Arts
Performing Arts Department Chair
B.M.E., Winthrop University
M.M., Winthrop University
D.M.A. University of South Carolina
Appointed: 2011
Gina Hubbard
Associate Director of College Guidance
B.A., Davidson College
Appointed: 2019
Jack Hudson
English
B.A., University of Georgia
M.A., University of Georgia
Appointed: 2010
Courtney Inscoe
Mathematics
B.A., University of North Carolina at Chapel Hill
Appointed: 2013
Tyrone Jean
Director of Equity, Inclusion, & Belonging
B.A. from the University of Virginia
M.A. Ed from Virginia Tech.
Appointed: 2021
Terry Jenkins
Mathematics
B.A., Florida Southern College
M.Ed., Florida Southern College
Appointed: 2018
Todd Johnson
Computing & Innovation
B.S., University of Wisconsin
M.A., University of Phoenix
M.A., Northeastern University
Table of Contents 65
```

===== PAGE 66 =====

```text
Appointed: 2018
Abby Jones
Associate Director of College Guidance
B.S., Davidson College
M. Ed., University of Pennsylvania
Appointed: 2022
Amy Jordan
Science
B.S., Pennsylvania State University
M.S., University of Kentucky
Ph.D., Harvard University
Appointed: 2013
Catherine Jordan
Mathematics
B.A. Queens University
M.A. University of North Carolina at Charlotte
Appointed: 2015
Carlynn Keilty
Mathematics
B.A., Colorado College
M.A., University of California, Santa Barbara
Appointed: 2016
Kelsey Knutson
Global Studies
B.A., University of Minnesota
M.Ed., Arizona State University
Appointed: 2024
Marissa Kohn
School Counselor
B.A., College of the Holy Cross
M.Ed., Fordham University
Appointed: 2018
Ian Kutner
English
B.A., Cornell University
Appointed: 2000
Maria Labbato
History
B.A., University of Central Florida
M.A., University of North Carolina Charlotte
Table of Contents 66
```

===== PAGE 67 =====

```text
Ph.D., Florida International University
Appointed: 2023
Thamar Lebron
History
B.A., Haverford College
M.A. University of Puerto Rico
Appointed: 2021
Georgette LePage
World Language
B.S., Plattsburgh State University
M.S., Syracuse University
Appointed: 1998
Mike Lindquist
History
B.A., University of North Carolina Charlotte
M.A., University of North Carolina Charlotte
Appointed: 2014
Brian Ludwig
Science
B.S., Kent State University
M.S., Nova Southeastern University
Appointed: 2008
Felipe Maldonado
Visual Arts
B.A., Florida Gulf Coast University
M.A., Columbia University
Appointed: 2024
Christine Marshall
English
BA, Bryn Mawr College
MA, University of Missouri
Ph.D., University of Utah
Appointed: 2016
Daniel Mehigan
Mathematics
B.J., University of Missouri
M.Ed., DePaul University
Appointed: 2012
Stephen Melton
World Language
Table of Contents 67
```

===== PAGE 68 =====

```text
B.A., Virginia Tech
M.A., University of Texas
Appointed: 2010
Evan Mitchell
History
Dean of Students
B.A., Davidson
M.Ed., Vanderbilt
Appointed: 2024
Herman Nicholson
Visual Arts
B.F.A., Savannah College of Art & Design
M.F.A., Columbia College Chicago
Appointed: 2021
Kristie Oglesby
Physical Education and Health
Physical Education and Health Department Chair
B.S., Charleston Southern University
M.A., Seattle Pacific University
Appointed: 2006
Sarah Ramsden
Learning Specialist
B.A., Wake Forest University
M.S., Ed.S., Winthrop University
Appointed: 2023
James Reeder
Computing & Innovation
Global Online Academy Instructor
B.S., Oregon State University
B.S., Southern Oregon University
M.A., John Carroll University
Appointed: 2008
Rebecca Roemer
Computing & Innovation
B.S., Oswego State University
M.A., George Mason University
Appointed: 2018
Ben Runkel
History
B.S., University of North Carolina, Chapel Hill
M.A.T, University of North Carolina, Charlotte
Appointed: 2024
Table of Contents 68
```

===== PAGE 69 =====

```text
Sydney Sheaffer
Visual Arts
BA Visual Arts
University of North Carolina at Charlotte
Appointed: 2020
Matt Scully
Director of Digital Integration and Innovation
B.A., University of Arizona
M.A., Columbia University, Teachers College
Appointed: 1998
Melissa Sines
History
B.S., New York University
M.A., American University
Appointed: 2023
Lucy Singletary
Science
Science Department Chair
B.A., Washington University in St. Louis
M.Ed., University of North Carolina at Charlotte
Appointed: 2015
Stephanie Smeltzer
Performing Arts
B.M., University of North Carolina at Greensboro
National Board Certified, 2017
Appointed: 2023
Marcus Smith
English
English Department Chair
B.A. Wesleyan University
M.T.S Harvard Divinity School
Appointed: 2018
Matthew Spence
English
B.A., Hobart College
M.A., University of Richmond
Appointed: 1996
Josh Springer
Physical Education and Health
B.S., University of Wisconsin-Oshkosh
Table of Contents 69
```

===== PAGE 70 =====

```text
M.S., Ohio University
Appointed: 2008
Lisa Sturgis
Data and Systems Manager
B.S. Wingate University
M.B.A. University of North Carolina at Charlotte
Appointed: 2013
Leland Taylor
Mathematics
B.S., University of Virginia
Appointed: 1999
Bailey Teague
Mathematics
B.S. Mathematics Education, Auburn University
Appointed: 2021
Christy Tucker
Mathematics
B.A., Tulane University
M.A., Florida State University
Appointed: 2024
Gwendy Turnbull
English
BA, Rollins College
M.Ed, George Washington University
MFA., GCSU
MA., Middlebury College
Ph.D. Indiana University
Appointed: 2022
Stephanie Vanderford
Mathematics
History
B.S., Davidson College
Ph.D., University of Georgia
Appointed: 2006
Francisca Weirich-Freiberg
English
B.A., Princeton University
Appointed: 2023
Table of Contents 70
```

===== PAGE 71 =====

```text
Ryan Welsh
IDEAS
IDEAS Department Chair
B.A., Duke University
M.A., University of Chicago
Ph. D., University of North Carolina at Charlotte
Appointed: 2008
Andrew Werner
World Language
B.A., Lynchburg College
B.M., James Madison University
M.A., Miami of Ohio University
Appointed: 1998
Jack Whelan
Director of College Guidance
B.A., Amherst College
M.A., Middlebury College
Appointed: 2007
Patricia Whelan
English
B.A., Davidson College
M.A., Florida State University
Appointed: 2010
Travis White
IDEAS
B.A. James Madison University
B.S. James Madison University
Appointed:2023
Russell White
Science
B.S., University of North Carolina at Charlotte
M.S., University of North Carolina at Chapel Hill
M.A.T., Univ. of North Carolina at Chapel Hill
Appointed: 1999
Jessica Williams
History
Global Education
B.A., Dickinson College
M.L.S., Rollins College
Appointed: 2018
Table of Contents 71
```

===== PAGE 72 =====

```text
Lindsay Woog
Visual Arts
Visual Arts Department Chair
B.A, Lynchburg College
Appointed: 2021
Anne Worgan
School Nurse
R.N., Central Piedmont Community College
Appointed: 1999
Emily Young
Learning Specialist
B.A. Appalachian State University
Appointed: 2015
Kinga Zay
World Language
M.A., Eötvös Loránd University
Appointed: 2018
Table of Contents 72
```

