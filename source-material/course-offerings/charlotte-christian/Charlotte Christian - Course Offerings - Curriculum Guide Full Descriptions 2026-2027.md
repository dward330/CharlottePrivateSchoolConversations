# Charlotte Christian School — Course Offerings — Curriculum Guide Full Descriptions 2026-2027
**Provenance**

- **Compiled by:** Claude Code, plan `coursecensus` Batch 2, at Derrick's request
- **Date fetched:** 2026-11-11
- **Why:** the earlier record (`Charlotte Christian - Course Offerings - Curriculum Guide.md`)
  holds the app's own condensed descriptions word for word for 57% of courses, so it cannot
  catch a description that drifted from the catalog. This file holds the school's own text, for
  the description-to-catalog census.
- **Method:** the three PDFs were re-downloaded from the URLs in the earlier record and their
  text extracted with `pdftotext -layout` (the Upper School guide is one column).
  U+200B was read as a space. In the Upper School guide, runs of spaces were collapsed; in the two
  brochures they were **kept**, because their grade-by-grade tables only read correctly with the
  original column spacing. No other change.
  - S1 Upper School guide SHA-256: `f8aa4fc5e521ab4d4689190bf1a9ec2d72d0551875973d3f7b93db330120fd10` (49 pp.; PDF title
    "2026-27 US Course Curriculum Guide.docx")
  - S2 Middle School brochure SHA-256: `315848c755915352f60ae31ec7c30195980f5c9d16993e0ddef37a5f4ccde8ba` (4 pp.; created 2026-02-25,
    footer "2/25/26")
  - S3 Lower School brochure SHA-256: `55269b6a4ebef806754d8c1725ed9da5e41e902760cefea087fb4d8810d036ca` (4 pp.; created 2024-09-19,
    modified 2025-08-01)
- **Curriculum hub page (S4)** was fetched as HTML and converted to text. It repeats the two
  brochures' division text and adds short descriptions of the Lower School enrichment classes
  and the Middle School elective areas, then repeats the Upper School course descriptions by
  department. Site navigation and footer were removed.
- **Catalog year:** the app was built from these same documents (record, 2026-07-26).
## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1769627723/charlotte/charlotte/charlotte/charlotte/charlotte/charlotte/zfkrvos5nbatuumajvz4/2026-27USCourseCurriculumGuidedocx.pdf | 2026-27 US Course Curriculum Guide (49 pp.), every Upper School course entry |
| S2 | https://resources.finalsite.net/images/v1740582395/charlotte/avxqip1tnakoukzjqeew/MiddleSchoolCourseCurriculumoverview.pdf | Middle School Curriculum brochure (4 pp.) |
| S3 | https://resources.finalsite.net/images/v1773163759/charlotte/vo0qupxeeyux545r0nqs/LSCurriculumBrochure.pdf | Lower School Curriculum brochure (4 pp.) |
| S4 | https://www.charlottechristian.com/academics/curriculum | Curriculum hub page (all three divisions) |
| S5 | https://www.charlottechristian.com/academics/middle-school | Middle School page |
| S6 | https://www.charlottechristian.com/academics/lower-school | Lower School page |

## Index — every app course, in app order

Where each app row's own text sits below. Upper School rows point to the guide page (PDF page number, as `===== PAGE N =====` below; found by title search, so confirm it). Lower and Middle School rows point to the division sections.

| App path | Division | Department | Title | Where |
| --- | --- | --- | --- | --- |
| `divisions[0].departments[0].courses[0]` | Lower School Courses | Bible | Bible | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[0].courses[1]` | Lower School Courses | Bible | Acts and the Early Church + Case for Christ | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[1].courses[0]` | Lower School Courses | Core Academics | Literacy | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[1].courses[1]` | Lower School Courses | Core Academics | Writing | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[1].courses[2]` | Lower School Courses | Core Academics | Math | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[1].courses[3]` | Lower School Courses | Core Academics | Science | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[1].courses[4]` | Lower School Courses | Core Academics | Social Studies | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[2].courses[0]` | Lower School Courses | Enrichment | Art | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[2].courses[1]` | Lower School Courses | Enrichment | Music | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[2].courses[2]` | Lower School Courses | Enrichment | Media Center | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[2].courses[3]` | Lower School Courses | Enrichment | Physical Education | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[2].courses[4]` | Lower School Courses | Enrichment | Spanish | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[0].departments[2].courses[5]` | Lower School Courses | Enrichment | Technology | Lower School brochure (S3) and curriculum hub (S4), Lower School |
| `divisions[1].departments[0].courses[0]` | Middle School Courses | Bible | The Prophecy of Christ (Genesis) | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[0].courses[1]` | Middle School Courses | Bible | The Preparation for Christ (Exodus–Malachi) | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[0].courses[2]` | Middle School Courses | Bible | The Plan of Christ (New Testament) | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[0].courses[3]` | Middle School Courses | Bible | The Person of Christ (The Gospel of John) | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[1].courses[0]` | Middle School Courses | Mathematics | Math 5 | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[1].courses[1]` | Middle School Courses | Mathematics | Math 6 / Advanced Math 6 | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[1].courses[2]` | Middle School Courses | Mathematics | Math 7 / Pre-Algebra / Algebra 1 | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[1].courses[3]` | Middle School Courses | Mathematics | Pre-Algebra / Algebra 1 / Geometry | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[2].courses[0]` | Middle School Courses | Science | Exploratory Science | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[2].courses[1]` | Middle School Courses | Science | Physical Science | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[2].courses[2]` | Middle School Courses | Science | Life Science | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[2].courses[3]` | Middle School Courses | Science | Earth Science | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[3].courses[0]` | Middle School Courses | Social Studies | Early Explorers to Westward Expansion in U.S. History | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[3].courses[1]` | Middle School Courses | Social Studies | Ancient Civilizations | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[3].courses[2]` | Middle School Courses | Social Studies | Modern World Civilizations | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[3].courses[3]` | Middle School Courses | Social Studies | American Civilizations | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[4].courses[0]` | Middle School Courses | World Languages | Exploratory Wheel | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[4].courses[1]` | Middle School Courses | World Languages | Introduction (French, Latin, or Spanish) | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[4].courses[2]` | Middle School Courses | World Languages | Level 1A | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[4].courses[3]` | Middle School Courses | World Languages | Level 1B | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[5].courses[0]` | Middle School Courses | Electives | Fine Arts electives | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[5].courses[1]` | Middle School Courses | Electives | Innovation electives | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[5].courses[2]` | Middle School Courses | Electives | Personal Skills electives | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[1].departments[5].courses[3]` | Middle School Courses | Electives | Language Arts & Life Fitness | Middle School brochure (S2) and curriculum hub (S4), Middle School |
| `divisions[2].departments[0].courses[0]` | Upper School Courses | Biblical Studies | Old Testament Survey | US guide p. 34 |
| `divisions[2].departments[0].courses[1]` | Upper School Courses | Biblical Studies | New Testament Survey | US guide p. 34 |
| `divisions[2].departments[0].courses[2]` | Upper School Courses | Biblical Studies | Christian Theology | US guide p. 34 |
| `divisions[2].departments[0].courses[3]` | Upper School Courses | Biblical Studies | World Religions | US guide p. 24, 35 |
| `divisions[2].departments[0].courses[4]` | Upper School Courses | Biblical Studies | Apologetics and Cultural Engagement | US guide p. 35 |
| `divisions[2].departments[1].courses[0]` | Upper School Courses | English | English 9 | US guide p. 10 |
| `divisions[2].departments[1].courses[1]` | Upper School Courses | English | English 9 Honors | US guide p. 10 |
| `divisions[2].departments[1].courses[2]` | Upper School Courses | English | English 10 | US guide p. 10, 11 |
| `divisions[2].departments[1].courses[3]` | Upper School Courses | English | English 10 Honors | US guide p. 10, 11 |
| `divisions[2].departments[1].courses[4]` | Upper School Courses | English | English 11 | US guide p. 10, 11 |
| `divisions[2].departments[1].courses[5]` | Upper School Courses | English | English 11 Honors | US guide p. 10, 11 |
| `divisions[2].departments[1].courses[6]` | Upper School Courses | English | English 12 | US guide p. 11 |
| `divisions[2].departments[1].courses[7]` | Upper School Courses | English | English 12 Honors | US guide p. 11 |
| `divisions[2].departments[1].courses[8]` | Upper School Courses | English | Advanced Placement English Language and Composition | US guide p. 11 |
| `divisions[2].departments[1].courses[9]` | Upper School Courses | English | Advanced Placement English Literature and Composition | US guide p. 11 |
| `divisions[2].departments[1].courses[10]` | Upper School Courses | English | Introduction to Public Speaking | US guide p. 12, 45 |
| `divisions[2].departments[1].courses[11]` | Upper School Courses | English | Children's Literature and Film Study | US guide p. 12 |
| `divisions[2].departments[1].courses[12]` | Upper School Courses | English | Creative Writing | US guide p. 12, 49 |
| `divisions[2].departments[1].courses[13]` | Upper School Courses | English | Sci-Fi and Fantasy: Literature and Film through a Biblical Lens | US guide p. 12 |
| `divisions[2].departments[1].courses[14]` | Upper School Courses | English | Dystopian Literature and Film through a Biblical Lens | US guide p. 13 |
| `divisions[2].departments[1].courses[15]` | Upper School Courses | English | Poetry Workshop, Honors | US guide p. 13 |
| `divisions[2].departments[2].courses[0]` | Upper School Courses | Mathematics | Algebra I | US guide p. 7, 14, 15, 16 |
| `divisions[2].departments[2].courses[1]` | Upper School Courses | Mathematics | Geometry | US guide p. 7, 15, 16, 19 |
| `divisions[2].departments[2].courses[2]` | Upper School Courses | Mathematics | Geometry Honors | US guide p. 15 |
| `divisions[2].departments[2].courses[3]` | Upper School Courses | Mathematics | Algebra II | US guide p. 7, 15, 16, 19 |
| `divisions[2].departments[2].courses[4]` | Upper School Courses | Mathematics | Algebra II & Trigonometry | US guide p. 15 |
| `divisions[2].departments[2].courses[5]` | Upper School Courses | Mathematics | Algebra II & Trigonometry Honors | US guide p. 15 |
| `divisions[2].departments[2].courses[6]` | Upper School Courses | Mathematics | Pre-Calculus | US guide p. 6, 16, 17, 22 |
| `divisions[2].departments[2].courses[7]` | Upper School Courses | Mathematics | Pre-Calculus Honors | US guide p. 16, 17, 36 |
| `divisions[2].departments[2].courses[8]` | Upper School Courses | Mathematics | Advanced Placement Pre-Calculus | US guide p. 16 |
| `divisions[2].departments[2].courses[9]` | Upper School Courses | Mathematics | Advanced Placement Calculus AB | US guide p. 16 |
| `divisions[2].departments[2].courses[10]` | Upper School Courses | Mathematics | Advanced Placement Calculus BC | US guide p. 16 |
| `divisions[2].departments[2].courses[11]` | Upper School Courses | Mathematics | Probability, Statistics and Finite Mathematics | US guide p. 16, 17 |
| `divisions[2].departments[2].courses[12]` | Upper School Courses | Mathematics | Probability, Statistics and Finite Mathematics Honors | US guide p. 17 |
| `divisions[2].departments[2].courses[13]` | Upper School Courses | Mathematics | Advanced Placement Statistics | US guide p. 17 |
| `divisions[2].departments[2].courses[14]` | Upper School Courses | Mathematics | Calculus III | US guide p. 17 |
| `divisions[2].departments[3].courses[0]` | Upper School Courses | Science | Biology | US guide p. 6, 7, 18, 19 |
| `divisions[2].departments[3].courses[1]` | Upper School Courses | Science | Biology Honors | US guide p. 19, 21 |
| `divisions[2].departments[3].courses[2]` | Upper School Courses | Science | Chemistry | US guide p. 6, 7, 18, 19 |
| `divisions[2].departments[3].courses[3]` | Upper School Courses | Science | Chemistry Honors | US guide p. 19, 20, 21, 22 |
| `divisions[2].departments[3].courses[4]` | Upper School Courses | Science | Physics | US guide p. 6, 7, 18, 19 |
| `divisions[2].departments[3].courses[5]` | Upper School Courses | Science | Physics Honors | US guide p. 19, 20 |
| `divisions[2].departments[3].courses[6]` | Upper School Courses | Science | Advanced Placement Physics I | US guide p. 20 |
| `divisions[2].departments[3].courses[7]` | Upper School Courses | Science | Advanced Placement Biology | US guide p. 21 |
| `divisions[2].departments[3].courses[8]` | Upper School Courses | Science | Advanced Placement Chemistry | US guide p. 22 |
| `divisions[2].departments[3].courses[9]` | Upper School Courses | Science | Advanced Placement Environmental Science | US guide p. 22 |
| `divisions[2].departments[3].courses[10]` | Upper School Courses | Science | Environmental Science Honors | US guide p. 22 |
| `divisions[2].departments[3].courses[11]` | Upper School Courses | Science | Astronomy | US guide p. 21 |
| `divisions[2].departments[3].courses[12]` | Upper School Courses | Science | Anatomy/Physiology | US guide p. 21 |
| `divisions[2].departments[3].courses[13]` | Upper School Courses | Science | Forensic Science I | US guide p. 21 |
| `divisions[2].departments[3].courses[14]` | Upper School Courses | Science | Forensic Science II Honors | US guide p. 21 |
| `divisions[2].departments[4].courses[0]` | Upper School Courses | Social Studies | World History I: Ancient Civilizations | US guide p. 24 |
| `divisions[2].departments[4].courses[1]` | Upper School Courses | Social Studies | World History I Honors: Ancient Civilizations | US guide p. 24 |
| `divisions[2].departments[4].courses[2]` | Upper School Courses | Social Studies | World History II: The World and the West | US guide p. 24, 25 |
| `divisions[2].departments[4].courses[3]` | Upper School Courses | Social Studies | World History II Honors: The World and the West | US guide p. 24, 25 |
| `divisions[2].departments[4].courses[4]` | Upper School Courses | Social Studies | Advanced Placement World History: Modern | US guide p. 7, 24 |
| `divisions[2].departments[4].courses[5]` | Upper School Courses | Social Studies | United States History | US guide p. 25 |
| `divisions[2].departments[4].courses[6]` | Upper School Courses | Social Studies | United States History Honors | US guide p. 25 |
| `divisions[2].departments[4].courses[7]` | Upper School Courses | Social Studies | Advanced Placement United States History | US guide p. 25 |
| `divisions[2].departments[4].courses[8]` | Upper School Courses | Social Studies | American Government | US guide p. 7, 25, 26 |
| `divisions[2].departments[4].courses[9]` | Upper School Courses | Social Studies | American Government Honors | US guide p. 26 |
| `divisions[2].departments[4].courses[10]` | Upper School Courses | Social Studies | Economics | US guide p. 7, 25, 26, 45 |
| `divisions[2].departments[4].courses[11]` | Upper School Courses | Social Studies | Economics Honors | US guide p. 26 |
| `divisions[2].departments[4].courses[12]` | Upper School Courses | Social Studies | Advanced Placement United States Government & Politics | US guide p. 26 |
| `divisions[2].departments[4].courses[13]` | Upper School Courses | Social Studies | Psychology | US guide p. 6, 27 |
| `divisions[2].departments[4].courses[14]` | Upper School Courses | Social Studies | Advanced Placement Psychology | US guide p. 27 |
| `divisions[2].departments[4].courses[15]` | Upper School Courses | Social Studies | Sociology | US guide p. 27 |
| `divisions[2].departments[4].courses[16]` | Upper School Courses | Social Studies | Sports Psychology | US guide p. 27 |
| `divisions[2].departments[5].courses[0]` | Upper School Courses | World Languages | French I – IV Honors | not found by title search |
| `divisions[2].departments[5].courses[1]` | Upper School Courses | World Languages | Advanced Placement French Language and Culture | US guide p. 30 |
| `divisions[2].departments[5].courses[2]` | Upper School Courses | World Languages | Latin I | US guide p. 30, 31 |
| `divisions[2].departments[5].courses[3]` | Upper School Courses | World Languages | Latin II – III Honors | not found by title search |
| `divisions[2].departments[5].courses[4]` | Upper School Courses | World Languages | Latin IV Honors | US guide p. 31 |
| `divisions[2].departments[5].courses[5]` | Upper School Courses | World Languages | Advanced Placement Latin | US guide p. 31 |
| `divisions[2].departments[5].courses[6]` | Upper School Courses | World Languages | Spanish I – IV Honors | not found by title search |
| `divisions[2].departments[5].courses[7]` | Upper School Courses | World Languages | Advanced Placement Spanish Language and Culture | US guide p. 32, 33 |
| `divisions[2].departments[5].courses[8]` | Upper School Courses | World Languages | Advanced Placement Spanish Literature | US guide p. 33 |
| `divisions[2].departments[6].courses[0]` | Upper School Courses | Technology & Innovation | Computer Science I | US guide p. 36 |
| `divisions[2].departments[6].courses[1]` | Upper School Courses | Technology & Innovation | Computer Science II Honors | US guide p. 36 |
| `divisions[2].departments[6].courses[2]` | Upper School Courses | Technology & Innovation | Advanced Placement Computer Science | US guide p. 36 |
| `divisions[2].departments[6].courses[3]` | Upper School Courses | Technology & Innovation | Architectural Design | US guide p. 36 |
| `divisions[2].departments[6].courses[4]` | Upper School Courses | Technology & Innovation | Data Analysis | US guide p. 36 |
| `divisions[2].departments[6].courses[5]` | Upper School Courses | Technology & Innovation | Digital Design & Animation I | US guide p. 36, 37, 38 |
| `divisions[2].departments[6].courses[6]` | Upper School Courses | Technology & Innovation | Digital Design & Animation II Honors | US guide p. 37, 38 |
| `divisions[2].departments[6].courses[7]` | Upper School Courses | Technology & Innovation | Engineering I | US guide p. 36, 37 |
| `divisions[2].departments[6].courses[8]` | Upper School Courses | Technology & Innovation | Engineering II Honors | US guide p. 37 |
| `divisions[2].departments[6].courses[9]` | Upper School Courses | Technology & Innovation | iKNIGHTS | US guide p. 37 |
| `divisions[2].departments[6].courses[10]` | Upper School Courses | Technology & Innovation | Robotics | US guide p. 37 |
| `divisions[2].departments[7].courses[0]` | Upper School Courses | Fine Arts | Art I | US guide p. 43, 44 |
| `divisions[2].departments[7].courses[1]` | Upper School Courses | Fine Arts | Art II | US guide p. 43 |
| `divisions[2].departments[7].courses[2]` | Upper School Courses | Fine Arts | Art III Honors | US guide p. 43 |
| `divisions[2].departments[7].courses[3]` | Upper School Courses | Fine Arts | Advanced Placement Art and Design | US guide p. 43 |
| `divisions[2].departments[7].courses[4]` | Upper School Courses | Fine Arts | Advanced Placement Art History | US guide p. 43 |
| `divisions[2].departments[7].courses[5]` | Upper School Courses | Fine Arts | 3D Art and Design | US guide p. 43, 44 |
| `divisions[2].departments[7].courses[6]` | Upper School Courses | Fine Arts | Oil Painting | US guide p. 44 |
| `divisions[2].departments[7].courses[7]` | Upper School Courses | Fine Arts | Advanced Placement Music Theory | not found by title search |
| `divisions[2].departments[7].courses[8]` | Upper School Courses | Fine Arts | Orchestra Honors | US guide p. 40 |
| `divisions[2].departments[7].courses[9]` | Upper School Courses | Fine Arts | Wind Ensemble Honors | US guide p. 41 |
| `divisions[2].departments[7].courses[10]` | Upper School Courses | Fine Arts | Chamber Ensemble Honors | US guide p. 40 |
| `divisions[2].departments[7].courses[11]` | Upper School Courses | Fine Arts | Jazz Band Honors | US guide p. 40 |
| `divisions[2].departments[7].courses[12]` | Upper School Courses | Fine Arts | Choir Honors | US guide p. 40 |
| `divisions[2].departments[7].courses[13]` | Upper School Courses | Fine Arts | Choir | US guide p. 40, 41 |
| `divisions[2].departments[7].courses[14]` | Upper School Courses | Fine Arts | Introduction to Guitar | US guide p. 41 |
| `divisions[2].departments[7].courses[15]` | Upper School Courses | Fine Arts | Vocal Workshop | US guide p. 8, 41 |
| `divisions[2].departments[7].courses[16]` | Upper School Courses | Fine Arts | UKnight Worship Honors | US guide p. 41 |
| `divisions[2].departments[7].courses[17]` | Upper School Courses | Fine Arts | Acting Studio (ACT I) Honors | not found by title search |
| `divisions[2].departments[7].courses[18]` | Upper School Courses | Fine Arts | Technical Theatre | US guide p. 42 |
| `divisions[2].departments[7].courses[19]` | Upper School Courses | Fine Arts | Dance | US guide p. 6, 8, 42, 44 |
| `divisions[2].departments[7].courses[20]` | Upper School Courses | Fine Arts | Digital Sound Design | US guide p. 38 |
| `divisions[2].departments[7].courses[21]` | Upper School Courses | Fine Arts | Digital Music I | US guide p. 38 |
| `divisions[2].departments[7].courses[22]` | Upper School Courses | Fine Arts | Digital Music II Honors | US guide p. 38 |
| `divisions[2].departments[7].courses[23]` | Upper School Courses | Fine Arts | Digital Photography | US guide p. 39 |
| `divisions[2].departments[7].courses[24]` | Upper School Courses | Fine Arts | Introduction to Film Production | US guide p. 39 |
| `divisions[2].departments[7].courses[25]` | Upper School Courses | Fine Arts | Film Studies | US guide p. 39, 49 |
| `divisions[2].departments[7].courses[26]` | Upper School Courses | Fine Arts | Broadcasting Honors (Knights Knews) | US guide p. 39, 49 |
| `divisions[2].departments[8].courses[0]` | Upper School Courses | Personal Development | Business I | US guide p. 45 |
| `divisions[2].departments[8].courses[1]` | Upper School Courses | Personal Development | Business II | US guide p. 45 |
| `divisions[2].departments[8].courses[2]` | Upper School Courses | Personal Development | Cross Cultural Communication | US guide p. 45 |
| `divisions[2].departments[8].courses[3]` | Upper School Courses | Personal Development | Sports Sponsorship and NIL | US guide p. 45 |
| `divisions[2].departments[8].courses[4]` | Upper School Courses | Personal Development | Junior Seminar | US guide p. 7, 8, 46 |
| `divisions[2].departments[8].courses[5]` | Upper School Courses | Personal Development | Logic and Debate | US guide p. 8, 46 |
| `divisions[2].departments[8].courses[6]` | Upper School Courses | Personal Development | Personal Finance and Biblical Stewardship | US guide p. 46 |
| `divisions[2].departments[8].courses[7]` | Upper School Courses | Personal Development | Winterim | US guide p. 7, 8, 46 |
| `divisions[2].departments[9].courses[0]` | Upper School Courses | PE & Life Skills | Lifetime Fitness | US guide p. 8, 47 |
| `divisions[2].departments[9].courses[1]` | Upper School Courses | PE & Life Skills | Athletic Conditioning | US guide p. 8, 47 |
| `divisions[2].departments[9].courses[2]` | Upper School Courses | PE & Life Skills | Refereeing: Basketball I — Male | US guide p. 47 |
| `divisions[2].departments[9].courses[3]` | Upper School Courses | PE & Life Skills | Refereeing: Basketball I — Female | US guide p. 47 |
| `divisions[2].departments[9].courses[4]` | Upper School Courses | PE & Life Skills | Refereeing: Basketball II | US guide p. 48 |
| `divisions[2].departments[10].courses[0]` | Upper School Courses | Journalism & Media | Yearbook / Yearbook Honors | US guide p. 49 |

## Lower School — Curriculum brochure, full text (S3)

===== PAGE 1 =====

```text
Lower School


curriculum
```

===== PAGE 2 =====

```text
Lower School

    curriculum
Bible & Spiritual Development
BIBLE CURRICULUM - Students are immersed in the Bible from the beginning of their time at Charlotte Christian. Along with
reading God’s word, our curriculum establishes a base of biblical knowledge as it works through both the Old and New
Testament. To bring the Bible to life, teachers lead class discussions, take time to pray with students and daily model walking
with Christ. As the capstone of biblical learning in lower school, fourth grade students take an introductory course to Christian
apologetics as they work through the young reader’s versions of Case for Christ.

SPIRITUAL DEVELOPMENT - Through ongoing discipleship, innovative learning opportunities, weekly chapels and our Spiritual
Life and Meaning Week, our students further deepen their understanding of the unique calling that God has placed in each
of their lives. During their time in lower school, students have the opportunity to learn about and celebrate other cultures,
explore global heritages and expand their understanding of God’s world through literature, guest speakers and project-
based activities. They actively participate in discussions that help strengthen their multicultural awareness as well as build
empathy and understanding for the experience of others.

        Junior
                             Kindergarten             Grade 1            Grade 2            Grade 3                Grade 4
     Kindergarten

  Heroes of the Faith,                                                                                          Acts and the
                                                 Creation through the
 God’s Love for All, the   Survey of the Bible                          The Gospels           Israel            Early Church,
                                                   Promised Land
 Truth of God’s Word                                                                                         Case for Christ study



Literacy
READING - In our early grades, great attention is given to the foundational concepts of phonemic awareness and phonics
through our structured literacy approach. Through whole group lessons as well as small group differentiated practice, students
quickly become comfortable identifying and manipulating letters and sounds which reinforces their decoding skills. As their
accuracy and fluency increase, students are well-equipped to handle more complex text as they make the transition from
“learning to read” into “reading to learn” in the upper grades. Word work instruction also continues in the upper grades, but
its focus shifts to the understanding of morphology including prefixes, suffixes, and word meaning. During Language Arts,
students are exposed to various genres of text as they practice the active comprehension skills of inferring, summarizing,
analyzing and more.

WRITING - Students learn to communicate and organize ideas in the form of small moments and seed stories focused on their
lives. As their capacity develops, students learn the elements of research, organization and story-telling. Before departing
for middle school, students receive extensive practice in narrative, informative and persuasive writing styles. The workshop
model allows students to flourish as writers via mini-lessons which equip them with tools to write. This system is paired with
individualized instruction as the teacher conferences one-on-one with their students.
```

===== PAGE 3 =====

```text
Experience life

    in the lower school
    • Weekly chapels led by spiritual               • Leadership opportunities for                • Semester after school clubs
      life director                                   students in classrooms, chapel and            provide enrichment opportunities
                                                      lower school office                           in academics, fine arts and sports
    • Robotics club for fourth grade
      students                                      • Athletic intramural programs in             • Extended Day care available for
                                                      basketball and cheerleading                   beyond the regular school day




math
Our approach to learning ensures students are well-versed in the “why” of math rather than rote memorization of the “how.”
The foundation of the program is building number sense and flexibility. Activities in the classroom help students become
comfortable composing and decomposing and manipulating numbers. Skilled instruction moves students from concrete
manipulatives, to pictorial representation and lastly, algorithmic understanding. Ultimately the program is designed to provide
deep mathematical understanding alongside an academically rigorous course of study.

SOCIAL STUDIES
As students transition from grade to grade, the curriculum slowly expands their scope of the world. Beginning with families
and neighborhoods and ending with global geography, students learn about human society and the important role they play
in a globally connected world. Collaboration plays a central role in our Social Studies curriculum. Students often engage in
research and explore and create alongside one another in small groups.

        Junior
                             Kindergarten              Grade 1                 Grade 2                Grade 3               Grade 4
     Kindergarten

  Friends and family,                                                                                                  Geography, history
                                                      Communities                                  Continents and
 beginning maps, great   Looking at our town,                             Exploring change in                          and culture of North
                                                 (neighborhood, school,                          oceans, community
 Americans, community     country and world                                local communities                           Carolina, economics,
                                                      town, county)                                 development
        helpers                                                                                                            government




Science
All investigations begin with the scientific method as students question,
form a hypothesis, test the hypothesis, record data and come to a
conclusion. Students also learn and utilize the engineering design
process (ask, imagine, plan, create and improve) to become scientists,
technicians, engineers and mathematicians and to gain the knowledge
they need for the future. Hands-on learning is prioritized through a
curriculum that blends classroom and STEM Lab experiences together.

        Junior
                             Kindergarten              Grade 1                 Grade 2                Grade 3               Grade 4
     Kindergarten

                                                                          Pebbles, Sand and
    My Five Senses,       Trees and Weather,       Air and Weather,                              Water and Climate,         Soils, Rocks
                                                                            Silt, Solids and
 Animals, Weather and    Materials and Motion,     Sound and Light,                              Motion and Matter,      and Landforms,
                                                                          Liquids, Insects and
      Sky, Plants         Animals Two by Two      Plants and Animals                              Structures of Life   Environments, Energy
                                                                                  Plants
```

===== PAGE 4 =====

```text
Lower School


art
    enrichment classes                                                      Physical education
The visual arts program encourages students to express                      The program emphasizes continued motor and movement
creativity and build confidence while working on their                      skill development and the development of an appreciation
technical skills and conceptualization.                                     for participation in physical activity while fostering habits
                                                                            of lifetime wellness and inclusive social skills.
music
                                                                            Spanish
                                                                            Spanish instruction emphasis is on the communication skills
                                                                            of listening, speaking, reading and writing according to
                                                                            grade level.


                                                                            technology

The music curriculum is designed to build sequentially
each year and explores music in a creative and caring
environment through movement, listening, singing,
performing, interacting and serving the community.


media center
The lower school media specialist works closely with                        The technology curriculum is a collection of cross-curricular
classroom teachers to support instruction as well as ways                   projects that integrates current and emerging technologies
to incorporate research and literature into their work in all               and equips students to become moral and ethical digital
subject areas. Students are able to select and check out                    citizens. Additionally, keyboarding skills are taught starting
books of personal interest and resources to encourage the                   in kindergarten through fourth grade.
love of reading and its importance as a lifelong pursuit.




                     Mission Statement: Charlotte Christian School is a Christ-centered, college preparatory school,
                     equipping and developing students to effectively integrate Biblical truth and learning into their
                     daily lives and to impact the culture for Christ.

                     7301 Sardis Road • Charlotte, NC 28270 • (704) 366-5657 • www.charlottechristian.com                      9/16/24
```

## Middle School — Curriculum brochure, full text (S2)

===== PAGE 1 =====

```text
Middle School


curriculum
```

===== PAGE 2 =====

```text
Middle School

    curriculum
Bible & Spiritual Development
BIBLE CURRICULUM - Charlotte Christian School seeks to impact each student’s heart and mind by demonstrating that the
Christian faith is true. Our goal is to nurture students’ spiritual growth and foster their relationship with Jesus. We empower
them to become salt and light in their spheres of influence by instilling our core values: Love God, Show Kindness, Walk
Humbly, Pursue Excellence and Seek Truth.

We are dedicated to training and equipping our students to effectively define, defend, demonstrate, and declare their
Christian faith with gentleness, truth, and respect to people of all backgrounds and cultures. Through Bible classes, daily
scripture reading (Daily Dose of the Word), ongoing student discipleship opportunities and service learning, creative weekly
chapels, and our annual spiritual life retreat, our students deepen their understanding of the unique calling that God has
placed on each of their lives.

           Grade 5                         Grade 6                        Grade 7                         Grade 8
    The Prophecy of Christ        The Preparation for Christ          The Plan of Christ            The Person of Christ
           (Genesis)                   (Exodus-Malachi)                (New Testament)               (The Gospel of John)



LANGUAGE ARTS
The language arts curriculum challenges students to understand God and His gifts of thought and communication. The
curriculum equips students to think critically and communicate effectively as they learn and share God’s truth through reading,
writing, speaking, and listening.


math
The math curriculum emphasizes how the orderliness of mathematical principles reflects an unchanging, reliable, and faithful
God. The goal is for students to reach their highest potential as mathematical problem-solvers, willing to take risks in their
learning. The math curriculum balances computational and reasoning skills with problem-solving application and conceptual
understanding.

           Grade 5                         Grade 6                        Grade 7                         Grade 8
                                                                          Math 7                        Pre-Algebra
                                          Math 6
            Math 5                                                      Pre-Algebra                      Algebra 1
                                      Advanced Math 6
                                                                         Algebra 1                       Geometry
```

===== PAGE 3 =====

```text
Experience life                    in the middle school
      • Daily KnightTime period customized to meet students’        • Culminating grade level experiences for students that
        academic, developmental and social needs, enhance             build relationships, class unity and lifelong memories
        spiritual formation and foster student engagement
                                                                    • Semester after school clubs which provide enrichment
      • Robust elective offerings that provide opportunity for        opportunities
        students to explore new areas
                                                                    • Extended Day care that provides care and fellowship
      • Unique Kingdom system that fosters belonging and              beyond the normal school day
        fellowship among advisory teams



SCIENCE
The science curriculum equips students to recognize the authority of scripture and the attributes of the Creator through
scientific inquiry and investigation of the natural world. Students are challenged to exercise their biblically mandated role as
good stewards of God’s creation. Curricular emphasis is placed on scientific literacy, innovation, and real-world application.
.            Grade 5                       Grade 6                         Grade 7                          Grade 8

        Exploratory Science             Physical Science                  Life Science                   Earth Science



SOCIAL STUDIES
The social studies curriculum develops students’ framework of thinking that applies biblical truth to the past, present, and
future and helps them better understand the world and their relation to it. Ultimately the goal of growing these historical
and social thinking skills is to give students the tools and knowledge to impact local, national, and global cultures for Christ.

             Grade 5                       Grade 6                         Grade 7                          Grade 8

    Early Explorers to Westward
                                      Ancient Civilizations       Modern World Civilizations         American Civilizations
      Expansion in U.S. History



WORLD LANGUAGES
The study of modern and classical languages equips students to impact the global culture for Christ. The curriculum supports
students’ linguistic proficiency and cultural/intercultural competence through participation in real-world communicative tasks.

             Grade 5                       Grade 6                         Grade 7                          Grade 8
                                          Introduction                      Level 1A                        Level 1B
        Exploratory Wheel              (choice of French,           (continuation of French,        (continuation of French,
                                       Latin, or Spanish)              Latin, or Spanish)              Latin, or Spanish)


LIFE FITNESS
The life fitness curriculum uses the physical environment of fitness and sport as a platform to promote lifelong habits and
skills in a safe community. Students will have opportunities to grow in their confidence of who God has created them to be by
introducing them to various forms of physical, mental, emotional, social, and spiritual activities.
```

===== PAGE 4 =====

```text
Middle School

    Elective Courses
Electives in middle school are a place for students to explore new interests, discover new passions and talents, and step
outside of their comfort zone. Courses include a wide variety of offerings across the disciplines of innovation, fine arts, and
personal skills. Students in grade 5 explore predetermined electives by rotating through elective wheels and leave ready to
choose electives in grade 6 that provide a fundamental introduction in the given content areas. As students progress through
grades 7 and 8, they are ready to narrow their scope of exploration and dig deeper in courses where the focus shifts from
introductory level work to specialization and mastery.

Fine Arts
           Grade 5                            Grade 6                                                Grade 7/8

                                                ACT 2                                 ACT 2                      Exploratory Art
             Music                               Art                                    Art                           Guitar
         (Band, Choir                           Band                                   Band                      MidKnight Knews
         or Orchestra)                          Choir                                 Choir                         Orchestra
           Visual Art                         Orchestra                           Creative Media                    Stagecraft
                                               Theatre                             Digital Music                      Ukulele



Innovation
           Grade 5                            Grade 6                                                Grade 7/8
                                             Coding
                                                                               3D Solid Modeling                      Innovation
                                          Creative Media
         Knights Skills                                                             Coding                           RoboKnights
                                            Design Lab
                                                                                  Design Lab
                                           RoboKnights


Personal Skills
           Grade 5                            Grade 6                                                Grade 7/8
        Global Knights                                                          Game Changers                     Speech & Debate
                                          Public Speaking                       Kingdom Council                      Study Hall
         Leadership
                                            Study Skills                       Multicultural Studies              The 24/7 Project
         Study Skills



                 Mission Statement: Charlotte Christian School is a Christ-centered, college preparatory school, equipping and developing
                 students to effectively integrate Biblical truth and learning into their daily lives and to impact the culture for Christ.

                 7301 Sardis Road • Charlotte, NC 28270 • (704) 366-5657 • www.charlottechristian.com                                 2/25/26
```

## Curriculum hub page (S4)

# Curriculum

The goal of Charlotte Christian School is to equip students academically, spiritually, and experientially – to maximize their God-given talents. Charlotte Christian differentiates itself as a college preparatory school committed to the oneness of Christ and scholarly excellence. The Christian identity of the school provides a strong foundation for and lends distinctiveness to its academics, athletics, arts, and extracurricular activities.

-
Lower School

-
Middle School

-
Upper School

-
Academic Conservatory

## Lower School

-
Bible

-
Literacy

-
Math

-
Social Studies

-
STEM

-
Enrichment

## Bible

###### Bible

Students are immersed in the Bible from the beginning of their time at Charlotte Christian. Along with reading God’s word, our curriculum establishes a base of biblical knowledge as it works through both the Old and New Testament. To bring the Bible to life, teachers lead class discussions, take time to pray with students and daily model walking with Christ. As the capstone of biblical learning in lower school, fourth grade students take an introductory course to Christian apologetics as they work through the young reader’s versions of Case for Christ.

###### Spiritual Development

Through ongoing discipleship, innovative learning opportunities, weekly chapels, and our Spiritual Life and Meaning Week, our students further deepen their understanding of the unique calling that God has placed in each of their lives. During their time in lower school, students have the opportunity to learn about and celebrate other cultures, explore global heritages, and expand their understanding of God’s world through literature, guest speakers, and project-based activities. They actively participate in discussions that help strengthen their multicultural awareness as well as build empathy and understanding for the experience of others.

Junior Kindergarten
Kindergarten
Grade 1
Grade 2
Grade 3
Grade 4

Heroes of the Faith,

God's Love for All,

the Truth of God's Word

Survey of the Bible
Creation through

the Promised Land
The Gospels
Israel
Acts and the Early Church

## Literacy

###### Reading

In our early grades, great attention is given to the foundational concepts of phonemic awareness and phonics through our structured literacy approach. Through whole group lessons as well as small group differentiated practice, students quickly become comfortable identifying and manipulating letters and sounds which reinforces their decoding skills. As their accuracy and fluency increase, students are well-equipped to handle more complex text as they make the transition from “learning to read” into “reading to learn” in the upper grades. Word work instruction also continues in the upper grades, but its focus shifts to the understanding of morphology including prefixes, suffixes, and word meaning. During Language Arts, students are exposed to various genres of text as they practice the active comprehension skills of inferring, summarizing, analyzing and more.

###### Writing

Students learn to communicate and organize ideas in the form of small moments and seed stories focused on their lives. As their capacity develops, students learn the elements of research, organization, and story-telling. Before departing for middle school, students receive extensive practice in narrative, informative, and persuasive writing styles. The workshop model allows students to flourish as writers via mini-lessons which equip them with tools to write. This system is paired with individualized instruction as the teacher conferences one-on-one with their students.

## Math

###### Math

Our approach to learning ensures students are well-versed in the “why” of math rather than rote memorization of the “how.” The foundation of the program is building number sense and flexibility. Activities in the classroom help students become comfortable composing, decomposing, and manipulating numbers. Skilled instruction moves students from concrete manipulatives, to pictorial representation, and lastly, to algorithmic understanding. Ultimately the program is designed to provide deep mathematical understanding alongside an academically rigorous course of study.

## Social Studies

###### Social Studies

As students transition from grade to grade, the curriculum slowly expands their scope of the world. Beginning with families and neighborhoods and ending with global geography, students learn about human society and the important role they play in a globally connected world. Collaboration plays a central role in our Social Studies curriculum. Students often engage in research and explore and create alongside one another in small groups.

Junior Kindergarten
Kindergarten
Grade 1
Grade 2
Grade 3
Grade 4

Friends and Family, Beginning Maps, Great Americans, and Holidays
Neighborhoods Near and Far, Exploring Globes and Maps, Looking at Our Country and World
Communities, Maps and Globes, the United States, Citizenship and Government
Exploring Local Communities, the United States, and the World
Themes of government, geography, and culture
North Carolina: Geography, History, and Government

## STEM

###### STEM

All investigations begin with the scientific method as students question, form a hypothesis, test the hypothesis, record data, and come to a conclusion. Students also learn and utilize the engineering design process (ask, imagine, plan, create, and improve) to become scientists, technicians, engineers, and mathematicians and to gain the knowledge they need for the future. Hands-on learning is prioritized through a curriculum that blends classroom and STEM Lab experiences together.

Junior Kindergarten
Kindergarten
Grade 1
Grade 2
Grade 3
Grade 4

My Five Senses, Animals, Weather and Sky, Plants
Trees and Weather, Materials and Motion,

Animals Two by Two
Air and Weather, Sound and Light, Plants and Animals
Pebbles, Sand and Silt, Solids and Liquids, Insects and Plants
Water and Climate, Motion and Matter, Structures of Life
Soils, Rocks and Landforms, Environments, Energy

## Enrichment

###### Art

The visual arts program encourages students to express creativity and build confidence while working on their technical skills and conceptualization.

###### Music

The music curriculum is designed to build sequentially each year and explores music in a creative and caring environment through movement, listening, singing, performing, interacting, and serving the community.

###### Media Center

The lower school media specialist works closely with classroom teachers to support instruction as well as ways to incorporate research and literature into their work in all subject areas. Students are able to select and check out books of personal interest and resources to encourage the love of reading and its importance as a lifelong pursuit.

###### Physical Education

The program emphasizes continued motor and movement skill development and the development of an appreciation for participation in physical activity while fostering habits of lifetime wellness and inclusive social skills.

###### Spanish

Spanish instruction emphasis is on the communication skills of listening, speaking, reading, and writing according to grade level. Students enhance their multicultural awareness through the celebration of the annual Multicultural Festival.

###### Technology

The technology curriculum is a collection of cross-curricular projects that integrates current and emerging technologies and equips students to become moral and ethical digital citizens. Additionally, keyboarding skills are taught starting in kindergarten through fourth grade.

## Middle School

-
Bible

-
Language Arts

-
Math

-
Science

-
Social Studies

-
World Languages

-
Life Fitness

-
Fine Arts

-
Innovation

-
Personal Skills

## Bible

###### Bible

Charlotte Christian School seeks to impact each student’s heart and mind by demonstrating that the Christian faith is true. The goal is to invite students into a relationship with Jesus to disciple them in a way that engages them to become salt and light in their spheres of influence by instilling our core values of Love God, Show Kindness, Walk Humbly, Pursue Excellence, and Seek Truth.

###### Spiritual Development

To meet this end, we are dedicated to training and equipping our students to effectively define, defend, demonstrate, and declare their Christian faith with gentleness, truth, and respect to people of all backgrounds and cultures. Through Bible classes, daily scripture reading (Daily Dose of the Word), ongoing student discipleship opportunities and service learning, creative weekly chapels, and our annual spiritual life retreat, our students deepen their understanding of the unique calling that God has placed on each of their lives.

Grade 5
Grade 6
Grade 7
Grade 8

The Prophecy of Christ

(Genesis)
The Preparation for Christ

(Exodus-Malachi)
The Plan of Christ

(New Testament)
The Person of Christ

(The Gospel of John)

## Language Arts

###### Language arts

The language arts curriculum challenges students to understand God and His gifts of thought and communication. The curriculum equips students to think critically and communicate effectively as they learn and share God’s truth through reading, writing, speaking, and listening.

## Math

###### Math

The math curriculum emphasizes how the orderliness of mathematical principles reflects an unchanging, reliable, and faithful God. The goal is for students to reach their highest potential as mathematical problem-solvers, willing to take risks in their learning. The math curriculum balances computational and reasoning skills with problem-solving application and conceptual understanding.

Grade 5
Grade 6
Grade 7
Grade 8

Math 5

Math 6

Advanced Math

Math 7

Pre-Algebra

Algebra 1
Pre-Algebra

Algebra 1

Geometry

## Science

###### Science

The science curriculum equips students to recognize the authority of scripture and the attributes of the Creator through scientific inquiry and investigation of the natural world. Students are challenged to exercise their biblically mandated role as good stewards of God’s creation. Curricular emphasis is placed on scientific literacy, innovation, and real-world application.

Grade 5
Grade 6
Grade 7
Grade 8

Exploratory Science

Physical Science

Life Science
Earth Science

## Social Studies

###### Social Studies

The social studies curriculum develops students’ framework of thinking that applies biblical truth to the past, present, and future and for them to better understand the world and their relation to it. Ultimately the goal of growing these historical and social thinking skills is to give students the tools and knowledge to impact local, national, and global cultures for Christ.

Grade 5
Grade 6
Grade 7
Grade 8

Early Explorers to Westward

Expansion in U.S. History
Ancient Civilizations
Modern World Civilizations
American Civilizations

## World Languages

###### WORLD LANGUAGES

The study of modern and classical languages equips students to impact the global culture for Christ. The curriculum supports students’ linguistic proficiency and cultural/intercultural competence through participation in real-world communicative tasks.

Grade 5
Grade 6
Grade 7
Grade 8

Language Survey

Introduction

(choice of French, Latin, or Spanish)
Level 1A

(continuation of French, Latin, or Spanish)
Level 1B

(continuation of French, Latin, or Spanish)

## Life Fitness

###### Life Fitness

The life fitness curriculum uses the physical environment of fitness and sport as a platform to promote lifelong habits and skills in a safe community. Students will have opportunities to grow in their confidence of who God has created them to be by introducing them to various forms of physical, mental, emotional, social, and spiritual activities.

## Fine Arts

###### Fine Arts

Electives in middle school are a place for students to explore new interests, discover new passions and talents, and step outside of their comfort zone. Courses include a wide variety of offerings across the disciplines of innovation, fine arts, and personal skills. Students in grade 5 explore predetermined electives by rotating through elective wheels and leave ready to choose electives in grade 6 that provide a fundamental introduction in the given content areas. As students progress through grades 7 and 8, they are ready to narrow their scope of exploration and dig deeper in courses where the focus shifts from introductory level work to specialization and mastery.

Grade 5
Grade 6
Grade 7/8
Grade 7/8

Music (Band,

choir

or Orchestra)

Visual Art
ACT 2

Art

Band

Choir

Orchestra

Theatre

ACT 2

Art

Band

Choir

Creative Media

Digital Music

Exploratory Art

Guitar

MidKnight Knews

Orchestra

Stagecraft

Ukulele

## Innovation

###### INNOVATION

Electives in middle school are a place for students to explore new interests, discover new passions and talents, and step outside of their comfort zone. Courses include a wide variety of offerings across the disciplines of innovation, fine arts, and personal skills. Students in grade 5 explore predetermined electives by rotating through elective wheels and leave ready to choose electives in grade 6 that provide a fundamental introduction in the given content areas. As students progress through grades 7 and 8, they are ready to narrow their scope of exploration and dig deeper in courses where the focus shifts from introductory level work to specialization and mastery.

Grade 5
Grade 6
Grade 7/8
Grade 7/8

Knights Skills
Coding

Creative Media

Design Lab

RoboKnights

3D Solid Modeling

Coding

Design Lab

Innovation

RoboKnights

## Personal Skills

###### Personal Skills

Electives in middle school are a place for students to explore new interests, discover new passions and talents, and step outside of their comfort zone. Courses include a wide variety of offerings across the disciplines of innovation, fine arts, and personal skills. Students in grade 5 explore predetermined electives by rotating through elective wheels and leave ready to choose electives in grade 6 that provide a fundamental introduction in the given content areas. As students progress through grades 7 and 8, they are ready to narrow their scope of exploration and dig deeper in courses where the focus shifts from introductory level work to specialization and mastery.

Grade 5
Grade 6
Grade 7/8
Grade 7/8

Global Knights

Study Skills
Public Speaking

Study Skills

Game Changers

Kingdom Council

Multicultural Studies

Speech & Debate

Study Hall

The 24/7 Project

## Upper School

Upper School Graduation Requirements

Biblical Studies - 4

English - 4

Mathematics- 4

Social Studies - 4

Science - 3

Fine Arts - 1

Physical Education - 1

Winterim - 1

Junior Seminar - 0.5

Speech - 0.5

World Languages - 2

Electives - 1

Total Unit Requirements - 26

## Explore by Subject

-
English

-
Math

-
Science

-
Social Studies

-
World Languages

-
Biblical Studies

-
Technology & Innovation

-
Fine Arts

-
Personal Development

-
P.E. and Health

-
Journalism and Media Studies

## English

#### Placement Criteria

Other placement criteria may include ERB, PSAT scores; demonstrated work ethic; critical thinking and writing skills improvements via writing folders; possible writing sample; and department recommendation.

## Course Descriptions

-
English 9

-
English 9 Honors

-
English 10

-
English 10 Honors

-
English 11

-
English 11 Honors

-
AP Language & Composition

-
English 12

-
English 12 Honors

-
AP Literature & Composition

## English 9

Prerequisite: English 8 and departmental approval • 1 credit

English 9 introduces students to high school level critical thinking, reading comprehension, research and writing skills. This Survey of Genres course focuses on two essential questions: what are the characteristics of each of the genres studied and why are they important? Students explore World Mythology, Gothic Literature, Science Fiction and Fantasy (including Magical Realism), the Short Story, Historical and Realistic Fiction, Nonfiction (including Diary, Autobiography, Biography, Speech), Humor, Satire, and the Graphic novel, Poetry and Drama.

## English 9 Honors

Prerequisite: 93% in English 8 and departmental approval • 1 credit

English 9 Honors differs from English 9 in the intensity, pace and depth of study. Students should expect to read more, work more independently in class, collaborate more with other students, begin and continue more assignments as homework, complete more complex writing assignments and demonstrate mastery of abstract concepts.

## English 10

Prerequisite: English 9 or English 9 Honors • 1 credit

English 10 builds on foundations of literary analysis, critical thinking, writing and research skills. This Survey of American Literature focuses on two essential questions: what does it mean to be an American and what does “freedom” mean? Students will develop their own voice as they explore diverse narratives in a chronological approach: Early Formation, A Growing Nation, Early Literary movements and Broadening Horizons. Students will study prose, poetry, historical documents and drama from a Biblical perspective and appreciate the richness of voices that contribute to America’s story.

## English 10 Honors

Prerequisite: 93% in English 9 or 83% in English 9 Honors and departmental approval • 1 credit

English 10 Honors differs from English 10 in the intensity, pace and depth of study. Students should expect to read more, work more independently in class, collaborate more with other students, begin and continue more assignments as homework, complete more complex writing assignments and demonstrate mastery of abstract concepts.

## English 11

Prerequisite: English 10 or English 10 Honors • 1 credit

This course will emphasize specific techniques to improve critical thinking, reading, writing, research and presentation skills relevant to preparation for college and beyond. In this Survey of World Literature, students consider the essential question “What does it mean to be an engaged global citizen?” as they study classic and modern literature from Central and South America, Africa, Southwest Asia, India, China, Japan and Korea. Students explore how religions, geography, politics and history influence global literatures and vice versa. Excerpts from major world literature will help students compare worldviews to a Christian worldview and recognize that all people are created in the image of God and are part of HIS story.

## English 11 Honors

Prerequisite: 93% in English 10 or 83% in English 10 Honors and departmental approval • 1 credit

English 11 Honors differs from English 11 in its pace and depth of study as well as a more focused intensity on fine-tuning already strong writing skills. Students should expect to read more, work more independently in class, collaborate more with other students, begin and continue more assignments as homework, complete more complex writing assignments and demonstrate mastery of abstract concepts.

## AP Language & Composition

Prerequisite: Prerequisite: 93% in English 10 Honors or 93% in English 11 Honors or 83% in AP Literature and Composition with departmental approval • 1 credit

AP English Language and Composition is an intensive “how to” course. Students learn how to read purposefully for complexity and nuance, how to write persuasively for a variety of audiences and contexts, and how to craft their message and arguments intentionally. While students read global fiction and nonfiction to learn how a writer’s own techniques and choices affect reader reaction, they also learn how to control their own diction, details, imagery, syntax and tone as they write. Students develop reading and writing skills applicable to other disciplines, college and beyond.

## English 12

Prerequisite: English 11 or English 11 Honors or AP Language and Composition • 1 credit

This course will continue to emphasize techniques to improve critical thinking, reading, writing, research and presentation skills relevant to transition to college and beyond. In this Survey of European Literature and Legacy, students consider two essential questions “What does being an adult mean?” and "What does making good choices and decisions look like?” In a chronological literary exploration of Greek and Roman Classics, Medieval Europe, Restoration and 18th Century, Romantics, Victorian Period, Modern Europe and Colonial Legacy, students examine choices, decisions and consequences; they also discuss how to discern God’s plans from human desire and actions.

## English 12 Honors

Prerequisite: 93% in English 11 or 83% in English 11 Honors and departmental approval • 1 credit

English 12 Honors differs from English 12 in its pace and depth of study as well as a more focused intensity on fine-tuning already strong writing skills. Students should expect to read more, work more independently in class, collaborate more with other students, begin and continue more assignments as homework, complete more complex writing assignments and demonstrate mastery of abstract concepts.

## AP Literature & Composition

Prerequisite: 93% in English 10 Honors or 93% in English 11 Honors or 83% in AP Language and Composition with departmental approval • 1 credit

The AP English Literature and Composition course focuses on reading, analyzing and writing about imaginative literature (fiction, poetry, drama) from various periods. Students engage in close reading and critical analysis of imaginative literature to deepen their understanding of the ways writers use language to provide both meaning and pleasure. As they read, students consider a work’s structure, style and themes, as well as its use of figurative language, imagery and symbolism. Writing assignments include expository, analytical and argumentative essays that require students to analyze and interpret literary works.

## Elective Options

-
Children's Literature & Film Study

-
Creative Writing

-
Introduction to Public Speaking

-
Sci-Fi and Fantasy: Literature and Film through a Biblical Lens

-
Dystopian Literature and Film through a Biblical Lens

-
Poetry Workshop, Honors

## Children's Literature & Film Study

Prerequisite: Prerequisite: None; open to grades 9-12 • .5 credit

This course is a general survey of children’s literature, beginning with early childhood books and ending with young adult novels. The class will take a broad look at the developmental stages in regard to reading and learning as well as skim the surface of some genres, such as fairy tales, historical fiction, realistic fiction and informational texts. The second half of the course will involve reading original texts, watching the film versions and writing analytical responses as assessments.

## Creative Writing

Prerequisite: None; open to grades 9-12 • .5 credit

Creative Writing is a semester-long course designed for both beginners and established writers. Focusing on genres such as poetry, short story, humor and satire, personal essays and memoirs, and creative nonfiction, students will discover and develop the habits and skills writers use from the origination of ideas to the publication of their work. In a workshop setting, students will write, revise, and review their own work and collaborate to review the work of their classmates. Additionally, when opportunities arise, students will participate in local writing and literary conferences, festivals, and competitions. Whether a student desires to pursue professional goals or simply improve their own skills, they will have the opportunity to discover their writing voice and become confident and competent writers. Through all of this, students will gain a greater understanding of themselves and their place as creative beings in God’s universe.

## Introduction to Public Speaking

Prerequisite: None; open to grades 9-12 • .5 credit

Introduction to Public Speaking equips students in grades 9-12 with practical techniques to control the fear and anxiety of speaking in public by focusing on body language and voice elements. Students will learn how to design purpose-specific speeches, how to make strong visual presentations and how to engage different types of audiences. They'll use laptops to record and self-evaluate presentations (audio-only, visual-only, script-only), complemented by teacher and peer feedback. This class increases self-confidence and control, creates situational awareness and audience-focused presentations. This course will fulfill the speech requirement for graduation.

## Sci-Fi and Fantasy: Literature and Film through a Biblical Lens

Prerequisite: None; open to grades 10-12 • .5 credit

This course will explore classic science fiction and fantasy through literature and films, examining the rich themes, symbolism and allegories from a Christian worldview. Students will delve into C.S. Lewis’s The Chronicles of Narnia, J.R.R. Tolkien’s The Hobbit and The Lord of the Rings, J.K. Rowling’s Harry Potter series (the first 3 books) and various short works.

Students will analyze how these works embed biblical principles, messages and narratives into their stories. Students will discuss concepts such as a fictional world’s fall, heroic sacrifices, good vs. evil, redemption, restoration and hope for humanity. This class will challenge students to think critically about the literature/movies they consume and to find deeper meta-narrative connections within the stories they love— as well as how to share the Gospel with fans of these works.

## Dystopian Literature and Film through a Biblical Lens

Prerequisite: None; open to grades 10-12 • .5 credit

This course will explore the powerful warnings of dystopian literature and films. By examining George Orwell's Animal Farm and 1984, Aldous Huxley’s Brave New World, Suzanne Collins's The Hunger Games and various short works through a Christian lens, students will analyze what happens when societies reject God and try to create a "perfect" world through human effort alone. By understanding the flawed meta-narratives that drive these stories, students will examine the consequences of human pride and the allure of false utopias. This class will discuss challenging but essential questions: If a society promises perfect peace and happiness, what is it asking you to give up in return? How does this contrast with the peace offered by Christ? This course will equip students to think critically about these themes and understand how a biblical worldview provides the ultimate hope and answers that dystopian narratives often lack.

## Poetry Workshop, Honors

Prerequisite: 90% in current college prep English class or 80% in current English Honors or AP English class, open to grades 10-12 • .5 credit

This is a rigorous, semester-long course designed for committed students seeking advanced study in both the creation and critical analysis of poetry. Concentrating on both compositional practice and critical reading of poetry and its diverse forms, students will explore the fundamentals of rhythm, imagery, metaphor and structure, simultaneously applying these elements in their own work and dissecting their use in published poems. Students will discover and develop the habits and skills poets use from the development of complex ideas to the publication of their work. Within a workshop setting, students will write, revise and engage in an in-depth review of their own poetry, collaborating to provide feedback to their classmates. When opportunities arise, students will be encouraged to participate in local writing and literary conferences, festivals and poetry competitions. Ultimately, students will discover how poetry–both writing and reading it–can reveal God’s own attention to the beauty and power of words.

## Math

#### Placement Criteria

For placement of a grade eight student into an honors math class, the student must have a year-end grade of 93% or above in the designated prerequisite class and departmental approval.

* Students may start the math sequence in middle school, such as Algebra I, but four math credits are still required to be earned in the upper school. Grades, effort, maturity, responsibility, consistency, critical thinking and study skills are considered as well as relevant standardized test scores.

## Course Descriptions

-
Algebra I

-
Geometry

-
Geometry Honors

-
Algebra II

-
Algebra II & Trigonometry

-
Algebra II & Trigonometry Honors

-
Pre-Calculus

-
Pre-Calculus Honors

-
Advanced Placement Pre-Calculus

-
AP Calculus AB

-
AP Calculus BC

-
AP Statistics

-
Probability, Statistics & Finite Mathematics

-
Probability, Statistics & Finite Mathematics Honors

-
Calculus III

## Algebra I

Prerequisite: Pre-Algebra • 1 credit

Algebra I reviews pre-algebra skills and introduces the following algebraic topics: operations with integers, functions and their graphs, solving equations and inequalities, graphing and writing linear equations, solving systems of equations and inequalities, quadratic equations and functions, exponents and exponential functions, right triangles, radical and rational expressions, and polynomials. Problem-solving strategies are incorporated throughout the course.

## Geometry

Prerequisite: Algebra I • 1 credit

Geometry provides a thorough introduction to classical Euclidean geometry and emphasizes the deductive reasoning process. The course includes a study of lines, angles, triangles, circles, polygons, solid figures and how they are related. It uses the concepts of coordinate geometry, congruence, similarity, area, volume and transformations to analyze the different topics in a more hands-on approach to geometry.

## Geometry Honors

Prerequisite: 93% in Algebra I • 1 credit

Geometry Honors provides a thorough introduction to classical Euclidean geometry and emphasizes the deductive reasoning process. The course includes a study of lines, angles, triangles, circles, polygons, solid figures and how they are related. It uses the concepts of coordinate geometry, congruence, similarity, area, volume and transformations to analyze the topics in a more formal, proof-centered approach to geometry. The Honors level results in a more rigorous and faster pace of material being taught. There is also a greater emphasis on solving geometric problems involving quadratic equations.

## Algebra II

Prerequisite: Geometry • 1 credit

Algebra II is the study of the real number system with an emphasis on functions and their properties. The following topics are covered: models, functions, permutations, linear systems and relationships, matrices, quadratic relations and functions, polynomial functions, exponential and logarithmic functions, rational functions, periodic functions and introductory trigonometric concepts. Problem-solving strategies and appropriate technology are incorporated throughout the course.

## Algebra II & Trigonometry

Prerequisite: 90% Algebra I and 90% Geometry • 1 credit

Algebra II & Trigonometry is the study of the real number system with an emphasis on functions and their properties. The following topics are covered: models, functions, permutations, linear systems and relationships, matrices, quadratic relations and functions, polynomial functions, exponential and logarithmic functions, rational functions, periodic functions, probability and deeper understanding of trigonometric concepts. Problem-solving strategies and appropriate technology are incorporated throughout the course.

## Algebra II & Trigonometry Honors

Prerequisite: 93% Algebra I and 83% Geometry Honors • 1 credit

Algebra II & Trigonometry Honors is a fast-paced course that takes a deep look at the study of the real number system with an emphasis on functions and their properties. The following topics are covered in detail: models, functions, permutations, linear systems and relationships, matrices, quadratic relations and functions, polynomial functions, exponential and logarithmic functions, rational functions, periodic functions, probability, and deeper understanding of trigonometric concepts. Problem-solving strategies and appropriate technology are incorporated throughout the course.

## Pre-Calculus

Prerequisite: Algebra II • 1 credit

Pre-Calculus is for students who have completed Algebra II or Algebra II Trig. This course provides further development of modeling and applying functions. The following functions are included: linear, polynomial, exponential, trigonometric, power, logarithmic, along with sequences and series. Appropriate technology is included in the course.

## Pre-Calculus Honors

Prerequisite: 93% in Algebra II or 83% in Algebra II/Trig • 1 credit

Pre-Calculus Honors is for the student who likes the study of mathematics without the depth or stress offered by an AP course. The following topics are included: graphing families of functions, polynomial, power, rational, exponential, logistic, logarithmic and trigonometric functions, analytic trigonometry, vectors, parametric and polar equations, analytic geometry and an introduction to limits. Appropriate technology is included in this course.

## Advanced Placement Pre-Calculus

Prerequisite: 83% in Algebra II/Trig Honors, or 93% in Alg II/Trig and pass readiness test for AP • 1 credit

AP Pre-Calculus covers the topics of a freshman year college algebra course. Students receive an in-depth study of functions including polynomial, power, rational, exponential, logistic, logarithmic and trigonometric functions. Also included is a study of analytic trigonometry, vectors, parametric and polar equations, analytic geometry and discrete mathematics. Students taking this course are required to take the AP exam in May.

## AP Calculus AB

Prerequisite: 83% in AP Pre-Calculus or 93% in Pre-Calculus Honors and pass readiness test for AP • 1 credit

Advanced Placement Calculus AB is a college-level course for students planning to pursue a college major requiring extended use of mathematics. AB Calculus follows the curriculum of a first semester college Calculus class. It is expected that those enrolled in this class will seek to earn college credit. This course emphasizes a multi-representation approach with problems being expressed graphically, numerically, analytically and verbally. The connections between these representations are very important in both attacking a problem and answering one. Broad concepts and widely applicable methods are emphasized. Topics covered are limits, derivatives and integrals. This AP Calculus course is single-blocked.

## AP Calculus BC

Prerequisite: 93% in AP Pre-Calculus • 2 credits

Advanced Placement Calculus BC is a college-level course for students planning to pursue a college major requiring extended use of mathematics. BC Calculus follows the curriculum of a first and second semester college Calculus class. It is expected that those enrolled in this class will seek to earn college credit. This course emphasizes a multi-representation approach with problems being expressed graphically, numerically, analytically and verbally. The connections between these representations are very important in both attacking a problem and answering one. Broad concepts and widely applicable methods are emphasized. Topics covered are everything in the AB curriculum in addition sequences, improper integrals, infinite series, parametric, vector and polar functions. This AP Calculus course is double-blocked.

## AP Statistics

Prerequisite: 83% in AP Pre-Calculus or 93% in Pre-Calculus Honors • 1 credit

Advanced Placement Statistics examines and simulates probability distributions in order to predict and estimate future events. Students investigate ways to analyze the relationship between two or more variables through the concepts of correlation and regression. Using a graphing calculator, students discover and understand concepts algebraically, graphically and numerically, as the AP exam requires.

## Probability, Statistics & Finite Mathematics

Prerequisite: 93 Pre-Calculus or 83 in Pre-Calculus Honors • 1 credit

This course provides development of Statistics which is the study of how to collect, organize, analyze, and interpret numerical information from data. The course also goes into elementary introduction to probability with applications. Topics include: basic probability models; random variables; discrete and continuous probability distributions; statistical estimation and testing; confidence intervals; and an introduction to linear regression. All concepts learned throughout the class will also be reinforced with real life projects that will help the students understand the material better.

## Probability, Statistics & Finite Mathematics Honors

Prerequisite: 93% Advanced Functions and Modeling or 87% in Pre-Calculus • 1 credit

This course is a fast-paced course that provides development of Statistics which is the study of how to collect, organize, analyze, and interpret numerical information from data. The course also goes into elementary introduction to probability with applications. Topics include: basic probability models; random variables; discrete and continuous probability distributions; statistical estimation and testing; confidence intervals; and an introduction to linear regression. All concepts learned throughout the class will also be reinforced with real life projects that will help the students understand the material better.

## Calculus III

Prerequisite: 93% in AP Calculus AB or completion of AP Calculus BC • 1 credit

Calculus III follows Advanced Placement Calculus and includes the study of multivariable functions, vector-valued functions in plane and space, curvature, double and triple integrals, vector analysis, differential equations and other advanced math topics. This course will receive AP weighting in a student’s GPA.

## Science

- Please note the progression of science classes is linked to math placement and may vary.

- Upper school requires three science credits for graduation: biology, chemistry and physics. The fourth year is optional but strongly encouraged.

- Grades, effort, maturity, responsibility, consistency, reading comprehension, critical thinking and study skills are considered as well as relevant standardized test scores.

## Course Descriptions

-
Biology

-
Biology Honors

-
Chemistry

-
Chemistry Honors

-
Physics

-
Physics Honors

-
AP Physics I

-
Astronomy

-
Anatomy/Physiology

-
Forensic Science I

-
Forensic Science II Honors

-
AP Biology

-
AP Chemistry

-
Environmental Science Honors

-
AP Environmental Science

## Biology

Prerequisite: Grade 8 Earth Science and/or departmental approval • 1 credit

Biology integrates regular class work with laboratory experience to offer a broad understanding of many biological topics. Students begin the year by learning general characteristics of living organisms. They study life at the molecular/chemical level and then learn the function and structure of cells, the metabolic processes that keep organisms alive and the genetic and reproductive properties that maintain all species. During the second semester, students begin to classify organisms according to specific kingdom and species characteristics. Several weeks of the course are involved in examining theories about the origin of life. During this time, students are encouraged to research, question and discover fallacies and evidence surrounding these theories. Throughout the year, students learn the importance of biology in everyday life. They are encouraged to find the perfect design God planned in the living world He created.

## Biology Honors

Prerequisite: 93% in Earth Science and current placement in Geometry or higher • 1 credit

Biology Honors is for students who exhibit exceptional skills in math and science. Topics are similar to those covered in Biology but are covered with increased breadth and depth.

## Chemistry

Prerequisite: Biology • 1 credit

Chemistry explores the composition, structure, properties and transformation of matter. Its problem-solving approach coordinates theoretical elements of the science with laboratory experimentation. Students receive an introduction to the major divisions of chemistry and develop a greater understanding of and appreciation for the order and design of God’s creation. Major concepts of the course include atomic theory, stoichiometry, chemical reactions and reactivity, chemical bonding and the properties of substances, chemical kinetics and chemical equilibrium.

## Chemistry Honors

Prerequisite: 83% in Biology Honors or 93% in Biology and concurrent enrollment in Algebra II/Trig or higher math course and/or departmental approval • 1 credit

Chemistry Honors is for students who exhibit exceptional aptitude in math and science. Topics are covered with increased breadth and depth and require more time (e.g. labs).

## Physics

Prerequisite: Completion of Biology and Chemistry • 1 credit

This course provides students a general overview of physics. Students learn the basic principles of Newtonian Mechanics including motion, acceleration, forces, momentum and energy as well as the fundamental principles of electricity, magnetism, light and sound. The course is highly experiential, with an emphasis on hands-on laboratory work. The course stresses God’s preeminence over His creation and demonstrates the order of His work.

## Physics Honors

Prerequisite: Student must have completed Algebra II/Trig Honors or Algebra II/Trig; and a grade of 83% in Chemistry Honors or grade of 93% in Chemistry; and departmental approval • 1 credit

Physics Honors introduces students to a science that seeks to explain the fundamentals of all phenomena of nature. Physics investigates all matter, from subatomic particles to galaxies, and all energy, from transmission to nuclear fusion. Students broaden their understanding of the physical world and receive an excellent foundation for future study in science and engineering. The course trains students to analyze and solve problems scientifically as they study classical mechanics (the study of motion), electricity and magnetism, with a brief introduction to wave phenomena, optics and sound.

## AP Physics I

Prerequisite: If completed Physics Honors with 83% or higher, must also have 83% in Chemistry Honors. If no prior Physics class has been taken, must have 93% in Chemistry Honors. • 1 credit

Advanced Placement Physics I covers topics in mechanics and fluids using an algebra-based approach. It is equivalent to the first semester of an introductory college physics course for non-science majors and gives students the opportunity to earn college credit.

## Astronomy

Prerequisite: Completion of Biology and Chemistry • Open to grades 11-12 • .5 credit

Astronomy is a semester-long science elective that targets students who have a fascination with the complexity, order and grand design of the universe. The course explores the continually developing cosmos that surrounds us as far as telescopes allow us to see. Topics include recognizing constellations, our solar system, the nature of radiation and matter, black holes, galaxies, dark matter and energy, and the large-scale structure and development of the cosmos.

## Anatomy/Physiology

Prerequisite: Biology; Chemistry • 1 credit

This course involves a survey of the structure, function, and interactive dynamics of the human body. Students will understand functional anatomy with application to life experience through case studies. This course requires a keen interest in human anatomy and physiology. The first semester covers the fundamentals of anatomy and physiology while the second semester explores each body system in detail. Dissections are required.

## Forensic Science I

Prerequisite: 83% in Biology and Chemistry | Open to grades 11-12 • .5 credit

Forensic Science is an application of basic biological, chemical, and physical science principles in the investigation of crime scenes. This course is designed to make students aware of the services of a crime laboratory and the proper utilization of these services. Forensic Science I will concentrate on the types of evidence crime scene investigators look for and what forensics science really looks like from the crime scene to the courtroom, dispelling myths created by the CSI effect and uncovering the realities of work in the field of forensics.

## Forensic Science II Honors

Prerequisite: 83% in Forensic Science I Open to grades 11-12 • .5 credit

Forensic Science II Honors encourages students to apply advanced biological, chemical and physical science principles to the study of crime scenes, highlighting forensic science as an interdisciplinary field. This course is designed to expand upon the knowledge gained in Forensic Science I, focusing on the use of laws and evaluation of evidence to build a strong and credible case. Students will learn through extensive hands-on laboratory experience and analytical problem solving exercises in order to gain a deeper knowledge of evidence identification, collection and analysis processes. The curriculum fosters critical thinking, independent investigation and application of forensic techniques to hypothetical situations which will be demonstrated in a final culminating project.

## AP Biology

Next offered in 27-28

Prerequisite: 93% in Biology Honors and 83% in Chemistry Honors and/or departmental approval • 1 credit

Advanced Placement Biology is a course that will focus on college-level biological principles and methodology. This course will develop students’ laboratory skills and provide foundational knowledge for future science courses. Students will investigate topics that were introduced in Biology such as cell structure and function, cell cycle, genetics, and ecology. These topics are explored in-depth and at a quick pace. This course will alternate with AP Chemistry and be offered every other year.

## AP Chemistry

Next offered in 26-27

Prerequisite: 93% in Chemistry Honors; concurrent enrollment in Pre-Calculus or higher and departmental approval • 1 credit

Advanced Placement Chemistry is the equivalent of a general college chemistry course and gives students the opportunity to earn college credit. The course continues to develop students’ ability to think critically and to express ideas orally and in writing with clarity and logic. Topics are investigated in-depth and at a brisk pace. This course will alternate with AP Biology and be offered every other year.

## Environmental Science Honors

Next offered in 27-28

Prerequisite: 83% in Biology, Chemistry, and departmental approval • 1 credit

Environmental Science Honors is a hands-on interdisciplinary science elective course that provides students with the scientific principles, concepts and methodologies necessary for understanding the interrelationships of the natural world, identifying and analyzing environmental problems (natural and man-made), evaluating the relative risks associated with these problems and examining alternate solutions for resolving and/or preventing them. The course is an excellent choice for students who have completed two years of an upper school laboratory science and show an interest in environmental issues.

Topics include: basic ecology, energy flow and matter cycling in ecosystems, human population impact, resource use and depletion, fossil fuels and renewable energy sources, food/soil resources, water resources, biodiversity loss and air/water pollution. Major issues addressed include eutrophication, acid rain, ozone depletion and climate change.

This course will alternate with AP Chemistry and be offered every other year.

## AP Environmental Science

Prerequisite: 90% in Biology, Chemistry or completion of Chemistry H • 1 credit

Advanced Placement Environmental Science is an interdisciplinary college-level course that provides students with the scientific principles, concepts and methodologies necessary for understanding the interrelationships of the natural world, identifying and analyzing environmental problems (natural and man-made), evaluating the relative risks associated with these problems and examining alternate solutions for resolving and/or preventing them. The course is an excellent choice for students who have completed two years of an upper school laboratory science and show a keen interest in environmental issues. Topics include: energy flow and matter cycling in ecosystems, basic ecology, human population dynamics, resource use, energy issues, food/soil resources, water resources, biodiversity loss, air/water pollution detection and management, eutrophication, acid rain, ozone depletion and climate change.

## Social Studies

## Social Studies

## Course Descriptions

-
World History I

-
World History I Honors: Ancient Civilizations

-
World History II: The World and the West

-
World History II Honors: The World and the West

-
AP World History: Modern

-
U.S. History

-
U.S. History Honors

-
AP U.S. History

-
American Government

-
Economics

-
American Government Honors

-
Economics Honors

-
AP U.S. Government & Politics

## World History I

Prerequisite: None • 1 credit

This full-year course involves the study of geography, world religions, and other major developments that have been crucial to the course of human history. This course begins with early civilizations and traces the history of those civilizations through to the mid 1300-1400s. Students will develop historical thinking skills as they identify key figures, pivotal events and major movements that have shaped the world into what it is today.

## World History I Honors: Ancient Civilizations

Prerequisite: 93% in Grade 8 Social Studies • 1 credit

World History Honors differs from World History in the intensity and depth of study. Students will analyze primary sources, evaluate document-based questions through historical research, and complete more writing assignments, demonstrating mastery of both historical facts and writing skills. A major goal of Honors World History is preparing students for AP World History in their sophomore year.

## World History II: The World and the West

Prerequisite: World History I • 1 credit

World History II Honors contains the content and themes of World History II, but adds additional select topics appropriate to honors-level rigor and includes depth and writing skills that will prepare students for future AP social studies courses (AP U.S. History, and/or AP U.S. Government and Politics) should they so choose. This will come through the analysis of various primary and secondary sources, responding to various document-based questions through historical research and projects and socratic seminars.

## World History II Honors: The World and the West

Prerequisite: 93% in World History I - Ancient Civilizations or 83% in World History I Honors - Ancient Civilizations or departmental approval • 1 credit

World History II Honors contains the content and themes of World History II, but adds additional select topics appropriate to honors-level rigor, and includes depth and writing skills that will prepare students for future AP social studies courses (AP U.S. History, and/or AP U.S. Government & Politics) should they so choose. This will come through the analysis of various primary and secondary sources, responding to various document-based questions through historical research, projects, and socratic seminars.

## AP World History: Modern

Prerequisite: 93% in World History I Honors • 1 credit

Advanced Placement World History: Modern meets the Western Civilization requirement. This college-level course surveys the major civilizations, era-defining events and people, religions and ideologies that have shaped the modern world from c. 1200 through the end of the 20th century; everything from the Mongols, to the European Enlightenment, the American, French, and Haitian Revolutions, to Hitler, Stalin and Mao. Students will think about these developments at a high level by analyzing texts, visual sources and other historical evidence. They will express their knowledge in a variety of ways, such as: advanced historical argumentation through writing, group projects, and socratic seminars. The course will prepare students for the year-end AP exam, and is an excellent foundation for future AP social studies courses.

## U.S. History

Prerequisite: None • 1 credit

United States History surveys American history, beginning from the historical settlements of Native Americans in North America to the end of the 20th century. It provides a strong background in historical facts while incorporating the sweeping themes of history that continue to influence our world. Taught against the backdrop of world history events and current events, the course shows the interdependence of our nation and the rest of the world.

## U.S. History Honors

Prerequisite: 93% in World History II: The World and the West or 83% in World History II Honors: The World and the West and departmental approval • 1 credit

United States History Honors differs from United States History in the intensity and depth of study. Students are expected to analyze important historical events with an emphasis on the examination of primary sources. Students will examine the interdependence of our nation to the world through writing assignments, demonstrating mastery of both world history historical facts and writing skills.

## AP U.S. History

Prerequisite: 93% in World History II Honors: The World and the West or 83% in Advanced Placement Modern World History and departmental approval • 1 credit

Advanced Placement United States History studies the cultural, economic, political, and social developments that have shaped the United States from c. 1491 to the present. You’ll analyze texts, visual sources, and other historical evidence and write essays expressing historical arguments. This course is a college-level offering, and demands of the students both an additional level of academic discipline and development of related analytical skills.

## American Government

Prerequisite: None • .5 credit

This course of study will give the students a broad-based understanding of both the institutions and purposes of the American government and a genuine understanding of the inner workings of this constitutional democracy. This will focus both an understanding and analysis of foundational principles, the American political landscape - most notably ideological differences on the many issues of our day, the political process - as related primarily to voter behavior and the election process, the separation of powers between the three branches of government, and an in-depth look at both civil liberties and civil rights. All of this will be used for a healthy discussion of current political events - as related to key course components.

## Economics

Prerequisite: None • .5 credit

This course of study will give to the students a broad-based understanding of our free-market economic system. This involves both an understanding of significant economic policy decisions and the related ideological perspective on such. This course further involves elements of macroeconomics - which studies the behavior and performance of an economy as a whole, and elements of microeconomics - which deals with single economic factors and the effects of individual decisions. All of this will be used for a healthy discussion of economic current events - as related to key course components.

## American Government Honors

Prerequisite: 93% in U.S. History or 83% in U.S. History Honors or 83% or above in Advanced Placement U.S. History • .5 credit

This course of study will give the students a broad-based understanding of both the institutions and purposes of the American government and a genuine understanding of the inner workings of this constitutional democracy. This will focus on a more in-depth understanding and analysis of foundational principles, the American political landscape - most notably ideological differences on the many issues of our day, the political process - as related primarily to voter behavior and the election process, the separation of powers between the three branches of government and an in-depth look at both civil liberties and civil rights. This course also requires the students to gain a deeper understanding and analysis on the inner workings of government as demonstrated in a semester research paper. All of this will be used for a healthy discussion of current political events - as related to key course components.

## Economics Honors

Prerequisite: 93% in U.S. History or 83% in U.S. History Honors or 83% in AP U.S. History • .5 credit

This course of study will give to the students a broad-based understanding of our free-market economic system. This involves a more in-depth understanding of significant economic policy decisions and the related ideological perspective on such. This course further involves elements of macroeconomics - which studies the behavior and performance of an economy as a whole and elements of microeconomics - which deals with single economic factors and the effects of individual decisions. All of this will be used for a healthy discussion of economic current events - as related to key course components. This course also requires the students to gain a deeper understanding and analysis of economic theory, as demonstrated in a semester research paper.

## AP U.S. Government & Politics

Prerequisite: 93% in U.S. History Honors or 83% in Advanced Placement U.S. History and departmental approval • 1 credit

Advanced Placement United States Government and Politics gives students a critical perspective on economics, politics and government, involving both the study and general concepts used to interpret United States politics and the analysis of specific case studies. It requires students to analyze the institutions, groups, beliefs and ideas that make up the American political reality.

## Elective Options

-
Psychology

-
AP Psychology

-
Sociology

-
Sports Psychology

## Psychology

Prerequisite: None; open to grades 9-12 • .5 credit

Psychology will give students an understanding and appreciation of the science of psychology. The class will analyze ‘Your Self” (with emphasis on theories of personality), “Your Body” (with emphasis on body rhythms and mental states), “Your Mind” (with emphasis given on thinking and intelligence), “Your Environment” (with emphasis on learning and behavior), “Your Mental Health” (with emphasis on psychological disorders) and “Your Life” (with emphasis on emotions, stress and health). A Christian perspective and current events will be integrated throughout the course.

## AP Psychology

Prerequisite: 87% in 11th grade College Prep English & College Prep Social Studies or 83% in 11th grade Honors English & Honors Social Studies or 80% in 11th grade AP English & AP Social Studies; open to grade 12 • 1 credit

Students will study the historical development and contemporary discipline of psychology including its roots in philosophy and biology. This course examines biology (neuroscience, genetics, human development, sensation and perception), cognition (learning, memory, thinking, language and intelligence), psychological functioning (motivation, personality theory, psychological disorders and therapy), and social functioning (stress, health and social psychology). This course prepares students to analyze, critique and respond to the aforementioned from a Biblical worldview.

## Sociology

Prerequisite: None; Open to grades 9-12 • .5 credit

Sociology is a semester elective course designed to familiarize students with various cultures and the problems resulting from people living in groups. This course covers such topics as culture, subcultures, social institutions, collective behavior, social change, social deviation, the family, religion, racial and ethnic minorities, poverty and crime. The latter portion of this course deals specifically with the pressing problems of our society, their causes and possible solutions. The Christian perspective and current events will be integrated throughout the course.

## Sports Psychology

Prerequisite: None; Open to grades 9-12 • .5 credit

Sports Psychology will give students an overview of the psychological theories and research that relates to sport/exercise participation and behavior at both the individual level and group level. The class will analyze character development through sport/exercise (with an emphasis on leadership theories and team dynamics/cohesion), psychological factors in sport/exercise (with an emphasis on motivation, stress and anxiety, unhealthy behaviors of athletes and self-confidence), physical factors in sport/exercise (with an emphasis on injuries, burnout and overtraining) = and mental skills training in sport/exercise (with an emphasis on arousal regulation, imagery, self-confidence, goal setting, attention and concentration). Overall, the course will focus on uncovering the psychological factors involved in sport/exercise along with studying the mental skills needed for individuals to overcome the various physical and psychological challenges that are connected with sports, competition and exercise.

## World Languages

## World Languages

-

World Languages Requirement (For class of 2028 and after)

Students must complete two consecutive units of the same language while in upper school.

It is strongly recommended that students that are able take the fourth and Advanced Placement levels of the world language.

World Languages Requirement (For class of 2027 and prior)

Students may meet the world language requirement in one of three ways:

1. Complete three units of the same language while in upper school.

2. Complete two units of the same language and one unit of another language while in the upper school.

3. Complete up to the third unit of a language in Upper School after placement based on the recommendation of the middle school world language teacher.

## Course Descriptions

-
French I

-
French II

-
French II Honors

-
French III

-
French III Honors

-
French IV Honors

-
AP French Language & Culture

-
Latin I

-
Latin II

-
Latin II Honors

-
Latin III

-
Latin III Honors

-
Latin IV Honors

-
AP Latin

-
Spanish I

-
Spanish II

-
Spanish II Honors

-
Spanish III

-
Spanish III Honors

-
Spanish IV Honors

-
AP Spanish Language & Culture

-
AP Spanish Literature

## French I

Prerequisite: None • 1 credit

French I emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. French I introduces the French language and its culture and covers most basic functions of the language. Emphasis is on listening, speaking, reading, and writing skills within a given context and extending outside the classroom setting when possible. An overview of the culture – its products (literature, laws, foods, games), perspectives (attitudes, values, beliefs), and practices (patterns of social interaction) – is integrated throughout the course. Students acquire insight into how languages and cultures work by comparing the French language and culture to their own. Topics of study include the calendar, weather, family and home, time, school, sports, Psalms and Bible verses related to themes. The class is conducted in French and English.

## French II

Prerequisite: French I and department placement test • 1 credit

French II emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. French II continues developing the skills of listening, speaking, reading, and writing as students participate in simple conversational situations by combining learned elements of the language orally and in writing. Students compose sentences that narrate, describe, compare and summarize familiar topics from French culture. They also use the language to communicate basic survival needs and interact on everyday issues inside and outside the classroom setting. Students expand their understanding of similarities and differences between their own culture and language and those of France. Students completing this course are able to recite and learn specific assigned Bible verses. The class is conducted predominantly in French.

## French II Honors

Prerequisite: 90% in French I and departmental approval • 1 credit

French II Honors continues developing the skills of listening, speaking, reading and writing as students participate in simple conversational situations by combining learned elements of the language orally and in writing. Students compose sentences that narrate, describe, compare and summarize familiar topics from French culture. They also use the language to communicate basic survival needs and interact on everyday issues inside and outside the classroom setting. Students expand their understanding of similarities and differences between their own culture and language and those of France. Students completing this course are able to recite and learn specific assigned Bible verses. The class is conducted predominantly in French.

## French III

Prerequisite: French II • 1 credit

French III emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities- from a biblical perspective. French III builds upon the foundation of listening, speaking, reading and writing skills begun in levels I and II. Students respond to and maintain face-to-face communication in French. They identify main ideas and significant details in discussion, presentations and written texts and interpret authentic materials. Students take the AAPPL test to demonstrate communicative proficiency. At the conclusion of the course they are able to present a simple plan of salvation in writing. The class is conducted predominantly in French.

## French III Honors

Prerequisite: 90% in French II or 83% in French I Honors and departmental approval • 1 credit

French III Honors emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. French III Honors offers additional opportunities for expanding the skills of language learning: listening, speaking, reading, and writing. Students initiate and maintain face-to-face communication in French. They identify main ideas and significant details in discussion, presentations, and written texts and interpret authentic materials. Students are introduced to brief literary works. The class is conducted predominantly in French.

## French IV Honors

Prerequisite: 90% in French III or 83% year end grade in French III Honors and departmental approval • 1 credit•

1 credit

French IV Honors emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities- from a biblical perspective. French IV Honors focuses on enabling students to communicate in writing and in extended conversations on a variety of topics. Students use more complex grammatical structures as they narrate, discuss and support ideas and concepts with concrete facts. Upon course completion, students have a good understanding of what is socially acceptable in French culture. At the conclusion of the course, students are required to give their testimony in writing in French using biblical references. The class is conducted in French.

## AP French Language & Culture

Prerequisite: French IV Honors and/or departmental approval • 1 credit

Advanced Placement French Language and Culture emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. This class emphasizes conversation, grammar and composition. The class enables students to attain high levels of ability in listening, speaking, reading and writing. They are exposed to a variety of genres to help them expand their knowledge of formal language in oral and written forms, thereby increasing levels of coherency, resourcefulness, fluency and accuracy. Students are graded using the AP scale.

## Latin I

Prerequisite: None • 1 credit

Latin I introduces students to the language of the ancient Romans. While the main goal is to read Latin texts at the novice level of proficiency, students will also develop reading, writing, listening and speaking skills. Students will interact with a variety of introductory texts focused on daily life, family, mythology and travel and have opportunities to compare the ancient world with the modern. Discussions of vocabulary and grammar will strengthen students’ understanding of English and modern Romance languages.

## Latin II

Prerequisite: Latin I • 1 credit

Latin II provides students continued opportunities to develop their reading, writing, listening and speaking skills with a goal of moving from novice toward intermediate proficiency. Students will read texts concerning heroes, city life, the games and commerce and have opportunities to respond creatively to these topics throughout the year. New vocabulary and grammar concepts will build upon the foundation laid in Latin I.

## Latin II Honors

Prerequisite: 90% in Latin I and departmental approval • 1 credit

Latin II Honors provides students continued opportunities to develop their reading, writing, listening and speaking skills with a goal of moving from novice toward intermediate proficiency. Students will read texts concerning heroes, city life, the games and commerce and have opportunities to respond creatively to these topics throughout the year. New vocabulary and grammar concepts will build upon the foundation laid in Latin I. This course is taught at a faster pace with deeper exploration of content.

## Latin III

Prerequisite: Latin II • 1 credit

Latin III pushes students to achieve an intermediate proficiency level in reading with continued interest in writing, listening and speaking skills. Students will interact with texts focused on empire, geography, time and cultural practices. Several projects will stretch students in the areas of composition and presentation in the target language. More specific vocabulary and grammar concepts will build upon those covered in Latin II.

## Latin III Honors

Prerequisite: 90% in Latin II; or 83% in Latin II Honors and departmental approval • 1 credit

Latin III Honors pushes students to achieve an intermediate proficiency level in reading with continued interest in writing, listening and speaking skills. Students will interact with texts focused on empire, geography, time and cultural practices. Several projects will stretch students in the areas of composition and presentation in the target language. More specific vocabulary and grammar concepts will build upon those covered in Latin II. This course is taught at a faster pace with deeper exploration of content.

## Latin IV Honors

Prerequisite: 90% in Latin III or 83% in Latin III Honors • 1 credit

Latin IV Honors is a survey course designed to assist students as they transition to reading unadapted texts either as the culmination of their study of the language or in preparation for AP Latin. Students will read selections from the Vulgate and medieval authors, Pliny the Younger, Catullus, Ovid and Caesar. Increased emphasis is placed on honing translation skills, analyzing texts and making connections across disciplines.

## AP Latin

Prerequisite: 83% in Latin IV Honors and departmental approval • 1 credit

The Advanced Placement Latin course focuses on continued Latin language acquisition, with the inclusion of textual analysis and contextualization skills. Students will read selections from Vergil’s Aeneid, Pliny the Younger’s Letters and other classical, medieval and Renaissance works. Throughout the course, students will consider the main ideas, effects or purposes and points of view expressed in these works to gain a deeper understanding of them and the culture in which they were created.

## Spanish I

Prerequisite: None • 1 credit

Spanish I emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities- from a biblical perspective. Spanish I introduces the Spanish language and its culture as students learn and perform the most basic functions of the language. Emphasis is on development of listening, speaking, reading and writing within a given context, extending outside the classroom setting when possible. A general introduction to the culture - its products (literature, laws, foods, games), perspectives (attitudes, values, beliefs), and practices (patterns of social interaction) – is integrated throughout the course. Students acquire insight into how languages and cultures work by comparing the second language and culture to their own.

## Spanish II

Prerequisite: Spanish I and sufficient score on year-end department placement test • 1 credit

Spanish II emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. Spanish II continues developing the skills of listening, speaking, reading and writing as students participate in simple conversational situations by combining learned elements of the language orally and in writing. Students are provided additional time to strengthen skills and understanding of concepts first learned in Spanish I and are exposed to new skills and concepts as sequentially appropriate. They compose simple sentences to narrate, describe, compare and summarize familiar topics from Spanish culture. They also use the language to communicate basic survival needs and interact on everyday issues inside and outside the classroom setting. Students expand their understanding of the similarities and differences between their own culture and language and those of Spanish-speaking countries. The class is conducted in Spanish and in English.

## Spanish II Honors

Prerequisite: 90% in Spanish I and departmental approval • 1 credit

Spanish II Honors emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. Spanish II Honors continues developing the skills of listening, speaking, reading and writing as students participate in simple conversational situations by combining learned elements of the language orally and in writing. They compose sentences that narrate, describe, compare and summarize familiar topics from Spanish culture. They also use the language to communicate basic survival needs and interact on everyday issues inside and outside the classroom setting. Students expand their understanding of the similarities and differences between their own culture and language and those of Spanish-speaking countries. The class is conducted predominantly in Spanish and will explore content at a deeper level.

## Spanish III

Prerequisite: Spanish II • 1 credit

Spanish III emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. Spanish III builds upon the foundation of listening, speaking, reading and writing skills begun in levels I and II. Students respond to and maintain face-to-face communication in Spanish. They identify main ideas and significant details in discussion, presentations and written texts and interpret authentic materials. At the conclusion of the course they are able to present a simple plan of salvation in writing. The class is conducted predominantly in Spanish.

## Spanish III Honors

Prerequisite: 90% in Spanish II or 83% in Spanish II Honors and departmental approval • 1 credit

Spanish III Honors emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. Students respond to and maintain face-to-face communication in Spanish and are assessed at the intermediate level. They identify main ideas and significant details in discussion, presentations and written texts. The class is conducted in Spanish. Student progress is monitored using ACTFL National Proficiency guidelines for intermediate learners.

## Spanish IV Honors

Prerequisite: 90% in Spanish III or 83% in Spanish III Honors and departmental approval • 1 credit

Spanish IV Honors emphasizes the integration of the five National World Language Standards - Communication, Cultures, Connections, Comparisons, and Communities - from a biblical perspective. Spanish IV Honors focuses on enabling students to communicate in writing and in extended conversations on a variety of topics. Students use complex grammatical structures as they narrate, discuss and support ideas and concepts with concrete facts. At the conclusion of the course, students are required to give their testimony in writing in Spanish using Biblical references. Students may take the SAT II written component and will participate in the National Spanish Exam. The class is conducted in Spanish.

## AP Spanish Language & Culture

Prerequisite: 83% in Spanish IV Honors and departmental approval • 1 credit

Advanced Placement Spanish Language and Culture explores the six AP curriculum themes: Families and Communities, Science and Technology, Beauty and Aesthetics, Global Challenges, Contemporary Life and Personal and Public Identities. Through analysis and communication of these themes, students attain advanced levels of ability in listening, speaking, reading, writing and cultural competence. Students are graded according to the AP scale, in conjunction with the ACTFL performance standards for intermediate high/advanced low learners. The class is conducted exclusively in Spanish.

## AP Spanish Literature

Prerequisite: 83% in Spanish IV Honors, 83% in Advanced Placement Spanish Language and Culture departmental approval • 1 credit

Advanced Placement Spanish Literature is a survey course of Peninsular and Latin American literature. The course focuses on critical reading and writing in Spanish. Students will become familiar with major literary movements and the philosophies behind them, as well as the major authors who exemplify each. They will study how language is connected to and shaped by the history, cultural practices and values of those who speak it, as reflected in the literature of Hispanic peoples. As a part of the course, students are expected to acquire the terminology of literary analysis in Spanish, discuss and criticize literature in writing, and refine general skills in speaking and writing Spanish. The class is conducted as an independent study course.

## Biblical Studies

## Course Descriptions

-
Old Testament Survey

-
New Testament Survey

-
Christian Theology

-
World Religions

-
Apologetics and Cultural Engagement

## Old Testament Survey

Freshman requirement • 1 credit

Old Testament Survey covers the historical flow of the Old Testament. The aim is to acquaint each student with the background, content, message throughout the Old Testament, and also to study the unity of all the books in the progress of revelation and redemption. At the completion of this course, students will be able to list the basic facts regarding the historical background, theme and content, understand creation theories, describe Israel’s geography and the location of important historical sites and apply the Old Testament’s message to our modern cultural context.

## New Testament Survey

Sophomore requirement • 1 credit

New Testament Survey is an overview of the books of the New Testament. Students will learn about the validity of the Scriptures, the geography of Bible lands, the life of Messiah Jesus, the actions of Jesus’ first disciples and lessons found in the letters. Some questions discussed include: Who is God? What does it mean to be a disciple of Jesus? What is real love? What is eternal life? What is the best way to live? What does it mean to have a biblical worldview?

## Christian Theology

Junior requirement • .5 credit

Christian Theology seeks to answer the question, “What is a Christian?” Students will learn to answer this question as we survey the essential doctrines of the Christian faith. They will acquire the ability to properly articulate biblical doctrines including the doctrines of God, Scripture, Angels, Humanity, Sin, Atonement, the Trinity, Incarnation, Salvation, End Times and the Afterlife. The course uses both systematic and historical theology. Students will learn about church history from the NT period through the Reformation. Throughout the course, special attention is given to train students to define, defend, apply and share the historic Christian faith.

## World Religions

Junior requirement • .5 credit

This course trains and equips students to analyze and evaluate the truth claims of other faith systems using both Scripture and reason. They will learn the origin, historical development and basic doctrines of other religions as well as how to interact with people from these faiths and to share Christ with them intelligently, lovingly and with respect. The course is a critical examination of ancient religions, Eastern Religions (including Hinduism and Buddhism), Judaism and Islam. Students will also learn to identify a cult as we survey Mormonism and Jehovah’s Witnesses.

## Apologetics and Cultural Engagement

Senior requirement • 1 credit

This course is designed to equip students to articulate and live out their Christian faith effectively in the modern world. The first semester focuses on apologetics, exploring the biblical foundations and reasons behind Christian beliefs, to strengthen the faith of the Christian and to equip them to articulate their faith to others. The second semester transitions to exploring biblical and theological foundations for cultural engagement, examining how Christians are called to be a faithful witness and impact the surrounding culture. The overall goal is to equip Christians to live their faith authentically, embodying a faithful witness by rooting their actions in the love and truth of Christ in a world that needs the gospel.

## Technology & Innovation

In addition to our science and math courses, we have the following science, technology
and engineering elective courses that make up our Technology and Innovation program.

## Course Descriptions

-
Computer Science I

-
Computer Science II Honors

-
AP Computer Science

-
Architectural Design

-
Data Analysis

-
Digital Design & Animation I

-
Digital Design & Animation II Honors

-
Engineering I

-
Engineering II Honors

-
iKnights

-
Robotics

## Computer Science I

Next offered in 26-27

Prerequisite: None; open to grades 9-12 • .5 credit

The course introduces students to the foundational concepts of computer science and challenges them to explore how computing and technology can impact the world. Students will gain knowledge in digital representations of data and programming and app design using Swift. This course will alternate with Digital Design and Animation II and be offered every other year.

## Computer Science II Honors

Prerequisite: Computer Science I and/or department chair approval; open to grades 9-12 • .5 credit

Computer Science II Honors is designed to teach high school and higher education students how to be an app developer, capable of turning their own ideas into useful and exciting apps. The course starts by introducing students to iOS development tools, basic programming concepts and industry best practices. Building on this foundation, students will follow a step-by-step curriculum, working through practical exercises, creating apps from scratch and building the mindset of an app developer. Throughout the course students will have the chance to design, prototype and test an app all of their own. They’ll connect and apply the coding skills they’re learning to bring their app idea to life. Students must have a teacher recommendation to take this course.

## AP Computer Science

Prerequisite: Completion of or concurrent enrollment in Pre-Calculus Honors and/or departmental approval • 1 credit

Advanced Placement Computer Science introduces students to computer science through programming. Fundamental topics in this course include the design of solutions to problems, the use of data structures to organize large sets of data, the development and implementation of algorithms to process data and discover new information and the analysis of potential solutions. The course emphasizes object-oriented programming and design using the Java programming language.

## Architectural Design

Next offered in 27-28

Prerequisite: None; open to grades 9-12 • .5 credit

This one-semester course introduces students to the fundamentals of Google Sketchup and AutoCAD software commonly used in the architectural or engineering industries. Students will become familiar with these programs, drawing techniques and design. This course focuses on residential architecture. This course will alternate with Engineering II and be offered every other year.

## Data Analysis

Prerequisite: None; open to grades 9-12 • .5 credit

Students will use Google Sheets, Microsoft Excel, and Numbers to solve real-world problems including those arising in fields such as finance, business, science, engineering, and politics. Meanwhile, they will learn about the underlying mathematical concepts of statistics, combinatorics, binary logic, and graph theory. This course requires no background in programming.

## Digital Design & Animation I

Prerequisite: None; open to grades 9-12 • .5 credit

In this course, students will dive into the creative worlds of Adobe Photoshop and Animate to learn basic to intermediate graphic media and animation principles. This hands-on course will provide students with a project-based experience that encourages creativity and critical thinking skills. This course will count towards the fine arts requirement for graduation.

## Digital Design & Animation II Honors

Next offered in 27-28

Prerequisite: Digital Design & Animation I • .5 credit

In this course, students will build on prior knowledge from Digital Design and Animation I to develop new skills in Adobe Photoshop and Animate. Students will use this knowledge to write, illustrate and animate a children's book in a final project to share with lower school class as students share their design work to inspire future learners. This course will alternate with Computer Science Honors and be offered every other year.

## Engineering I

Prerequisite: None; open to grades 9-12 • .5 credit

Engineering I is a hands-on, project-based course where students apply the engineering design process to solve problems. Students will apply math, science and engineering standards to bring their designs through the stages of product development. They will use 3D modeling software, a digital engineering notebook, and 3D printers, to work on both individual and collaborative projects.

## Engineering II Honors

Next offered in 26-27

Prerequisite: Engineering I • .5 credit

Engineering II Honors delves deeply into the engineering design process, pushing students beyond traditional problem-solving to tackle complex, real-world challenges. Building upon foundational STEM principles, students will engage in rigorous, inquiry-based learning, collaborating closely to innovate and create cutting-edge solutions. Topics of engineering include mechanisms, strength of materials and structures, automation and kinematics. This course will alternate with Architecture and be offered every other year.

## iKnights

Prerequisite: Departmental Approval • .5 credit

The iKnights Tech Force is a student-run help desk support program. The goal of iKnights Tech Force is to expand our school’s technology integration and proficiency. Students will take a leadership role in developing the technology support structures and resources for both students and teachers. This will be accomplished through basic tech troubleshooting, assisting teachers and students with tech integration, creating support for foundational apps, and providing tech news and updates.

## Robotics

Prerequisite: None; open to grades 9-12 • .5 credit

In the first semester of robotics, students will develop familiarity with important fundamentals of robotics: circuit and signal design, microcontroller programming, sensors, output devices, and autonomous operation. Throughout the semester, students will complete hands-on projects with the Boe-Bot and with VEX v5 equipment, culminating in a fully autonomous robot that is able to navigate based on color, objects, and shapes.

## Fine Arts

## Digital Arts

-
Digital Sound Design

-
Digital Design & Animation I

-
Digital Design & Animation II Honors

-
Digital Music I

-
Digital Music II Honors

-
Digital Photography

-
Introduction to Film Production

-
Film Studies

-
Broadcasting (Knights Knews) Honors

## Digital Sound Design

Prerequisite: None; open to grades 9-12 • .5 credit

Digital Sound Design provides students interested in the production side of the Fine Arts the opportunity to learn about recording and editing audio and video. Digital Sound Design uses project-based learning to explore and master live event equipment needs, recording and mixing audio with Logic Pro X software and creating videos using Premiere Pro software. This course can satisfy the fine arts requirement for graduation.

## Digital Design & Animation I

Prerequisite: None; open to grades 9-12 • .5 credit

In this course, students will dive into the creative worlds of Adobe Photoshop and Animate to learn basic to intermediate graphic media and animation principles. This hands-on course will provide students with a project-based experience that encourages creativity and critical thinking skills. This course will count towards the fine arts requirement for graduation.

## Digital Design & Animation II Honors

Next offered in 27-28

Prerequisite: Digital Design & Animation I • .5 credit

In this course, students will apply concepts of web design and augmented reality using Adobe Dreamweaver and Aero. Students will use prior knowledge from Digital Media I to create a themed website, immersive augmented reality scenes, and a digital portfolio of work. This course will alternate with Computer Science and be offered every other year.

## Digital Music I

Prerequisite: None; open to grades 9-12 • .5 credit

This technology-focused arts course is a place where students can imagine, rehearse and bring their own beats and music to life in a variety of styles in GarageBand® for Mac. Using loops, MIDI keyboards and music theory, students explore and develop skills used in recording, editing and mixing. Students will also develop an understanding of technology’s role in today’s music industry and how this technology can be used to further enhance each student’s musical interests and skills. This course can satisfy the fine arts requirement for graduation.

## Digital Music II Honors

Prerequisite: Digital Music 1 and departmental approval • .5 credit

Digital Music II Honors builds on the fundamentals of song recording, mixing, arranging and composition learned in Digital Music I. Using Logic Pro X software, students will build skills in app navigation, virtual instruments, MIDI, workflow and editing. Fundamentals of music theory will be introduced to add depth to composition and arranging skills. This class will help bring students’ musical ideas to life as they continue to create their own music beyond the classroom.

## Digital Photography

Prerequisite: None; open to grades 9-12 • .5 credits

Digital Photography introduces students to the fundamentals of digital photography including camera operation, exposure techniques and concepts of effective visual composition. Projects will emphasize the development of an awareness of our visual environment. Various subjects will be photographed in creative and innovative ways to help students go beyond the “point and shoot” level of digital photography. Students must supply their own digital SLR camera, standard lens, SD card, and camera case. This course can satisfy the fine arts requirement for graduation.

## Introduction to Film Production

Prerequisite: None; open to grades 9-12 • .5 credit

In this semester course, students will learn the basics of how to write, plan, shoot, and edit various video content. This hands-on course will explain how to shoot news anchors, interviews, music videos and short films. Students will become proficient in basic camera handling, scriptwriting using Celtx® software and editing on Final Cut®. This course can satisfy the fine arts requirement for graduation.

## Film Studies

Prerequisite: None; open to grades 9-12 • .5 credit

The purpose of this course is to educate students on the making, history and language of films. In addition to learning about roles in filmmaking, students will learn to look beyond the story and see how film uses its images appropriately to create desired effects within audiences. Throughout the semester, students will watch and write about several films that have importance in the history of movies. Students will also see how films are used to communicate a director and writer’s worldview. This course can satisfy the fine arts requirement for graduation.

## Broadcasting (Knights Knews) Honors

Prerequisite: Successful completion of Intro to Film Production and departmental approval. • 1 credit

Broadcasting educates students on the power and potential of various mass communication strategies. The Knights Knews team creates a magazine that airs weekly to all upper school students and is posted on YouTube on the Knights Knews channel. In addition to the news magazine, students will also learn how to create a broadcasting personality, which they will utilize throughout the school year. Students will be required to learn editing on Adobe Premiere® and create news stories in words and pictures on Celtx®. An application and video submission are required as part of the audition to be on the Knights Knews team. This course can satisfy the fine arts requirement for graduation.

## Music

-
Chamber Ensemble Honors

-
Jazz Band Honors

-
Orchestra Honors

-
Choir Honors (Zero Hour)

-
Choir

-
Introduction to Guitar

-
Vocal Workshop

-
Wind Ensemble Honors

-
UKnight Worship Honors (Zero Hour)

## Chamber Ensemble Honors

Prerequisite: Departmental approval • .5 credit

Chamber Ensemble Honors is a year-long performance-based class for string, woodwind and brass players that enables students to develop their instrumental performance technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level appropriate chamber music repertoire from all eras of music history. Daily coursework focuses on developing fundamentals of classical performance technique with a focus on independent musicianship, musical leadership and musicality. This course is a zero hour full year class that meets twice a week at 7 a.m. Performance and rehearsals outside of school hours will be required. Students must be in good standing in the Wind Ensemble or Orchestra to participate in Chamber Ensemble. This course can satisfy the fine arts requirement for graduation. (Zero Hour)

## Jazz Band Honors

Prerequisite: Audition Required • .5 credit

Jazz Band Honors is a year-long performance-based class that enables students to develop their instrumental performance technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level appropriate jazz repertoire including swing, Latin, rock and funk and daily coursework focuses on developing fundamentals of jazz performance technique with a focus on rhythm, style and improvisation. This course is a zero hour full year class that meets twice a week at 7 a.m. Performance and rehearsals outside of school hours will be required. Students must be in good standing in the Wind Ensemble or Orchestra to audition for and enroll in Jazz Band with the exception of those who play a rhythm section instrument (keyboard, bass, guitar or drumset). This course can satisfy the fine arts requirement for graduation.

## Orchestra Honors

Prerequisite: Departmental approval/instrument proficiency • 1 credit

Orchestra Honors is a performance-based class that enables students to develop their instrumental performance technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level appropriate repertoire for concerts, chapels and special events both at school and in the community. Daily coursework focuses on developing the fundamentals of performance technique and ensemble playing such as tone, intonation, balance, rhythm and musicality. Elements of music theory and music history are also taught in this class as they relate to the literature being performed. Students wishing to enroll in Honors Orchestra must demonstrate grade-appropriate mastery of fundamental techniques on their instrument as well as grade-appropriate music reading skills. Performances and rehearsals outside of the regular class time are occasionally required. This course can satisfy the fine arts requirement for graduation.

## Choir Honors (Zero Hour)

Prerequisite: Audition required • .5 credit

Choir Honors is a performance-based class for experienced singers that enables students to develop their vocal performance technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level appropriate repertoire for concerts, chapels and special events both at school and in the community. Daily coursework focuses on developing the fundamentals of performance technique and ensemble singing such as tone, intonation, balance, rhythm and musicality. Students wishing to enroll in Honors Choir must demonstrate grade-appropriate mastery of fundamental vocal technique and music literacy skills. This course is a zero hour full year class that meets twice a week at 7 a.m. Performances and rehearsals outside of the regular class time are occasionally required. This course can satisfy the fine arts requirement for graduation.

## Choir

Prerequisite: None; open to grades 9-12 • .5 credit

Choir is a performance-based class open to any student who desires to develop their vocal performance technique and musicianship as a service to the school and as a ministry for God’s glory. Daily coursework focuses on developing the fundamentals of music literacy, vocal performance technique and ensemble singing. Performances and rehearsals outside of the regular class time are occasionally required. This course can satisfy the fine arts requirement for graduation.

## Introduction to Guitar

Prerequisite: None; open to grades 9-12 • .5 credit

This class is designed for beginners on the guitar or players who would like to fill in the gaps in their basic overall knowledge of the instrument. This course will cover simple chords, strumming, basics of finger-style technique, standard music notation and concepts in music theory that can be used to read and write music. Music played in this class will be drawn from classical, contemporary Christian, American popular and folk styles. Students are responsible for providing a quality acoustic guitar (with cae), an electronic tuner and guitar picks. Note: Electric only guitars are not conducive to this class. This course can satisfy the fine arts requirement for graduation.

## Vocal Workshop

Prerequisite: None; open to grades 9-12 • .5 credit

Vocal Workshop is the place where students discover more about their singing voice by exploring a variety of singing styles such as pop, jazz, folk, musical theatre and art song. Emphasis is placed on healthy singing technique and vocal pedagogy. Students receive training in private voice lessons, group master classes, and class performance. This course can satisfy either the fine arts or the speech requirement for graduation.

## Wind Ensemble Honors

Prerequisite: Departmental approval/instrument proficiency • 1 credit

Wind Ensemble Honors is a performance-based class that enables students to develop their instrumental performance technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level appropriate repertoire for concerts, chapels, and special events both at school and in the community. Daily coursework focuses on developing the fundamentals of performance technique and ensemble playing such as tone, intonation, balance, rhythm and musicality. Elements of music theory and music history are also taught in this class as they relate to the literature being performed. Students wishing to enroll in Honors Wind Ensemble must demonstrate grade-appropriate mastery of fundamental technique on their instrument as well as grade-appropriate music reading skills. Performances and rehearsals outside of the regular class time are occasionally required. This course can satisfy the fine arts requirement for graduation.

## UKnight Worship Honors (Zero Hour)

Prerequisite: Audition and/or departmental approval • .5 credit

UKnight Worship serves the school community by leading worship in chapels and for special events. Participation in this course develops musicianship, expands student knowledge of worship songs and develops an understanding of how to minister and lead through music in a worship setting. UKnight Worship has a musician track and a production track. Vocalists and instrumentalists (acoustic/electric guitar, electric bass, keyboard, drumset) need to have experience reading lead sheets and chord charts. Production students must display some working knowledge of audio, video and lighting technology. An application and audition (musicians) or interview (production track) are required as part of the audition to enroll in this course. This course can satisfy the fine arts requirement for graduation.

## Theatre

-
Acting Studio (ACT I) Honors

-
Dance

-
Technical Theatre

## Acting Studio (ACT I) Honors

Prerequisite: Audition Required • 1 credit

ACT I is an honors-level acting team comprised of students who have a passion for acting and a strong work ethic. Entrance into the class is through an audition in the spring. The ideal candidate is someone who has successfully completed ACT 2 or who has substantial theatrical experience prior to the audition process. ACT 1 has an acting track and a production track. Students in the acting track will be cast in the first semester one act competition piece. Students in the production track will support scenic, lighting, and audio design and stage manage the first semester one act competition piece. During the year, students have the opportunity to perform in a variety of venues and competitions. When not preparing for performances or competitions, the students work on advanced technique. This course can satisfy either the fine arts or speech requirement for graduation.

## Dance

Prerequisite: None, Open to grades 9-12 • .5 credit

Dance is a semester elective course designed to allow students to learn about a variety of dance genres from around the world and will provide opportunities for students to practice various dance skills and techniques. This class can satisfy a Physical Education credit or a Fine Arts Credit and is open to all students and abilities. Students may take this class multiple times, but only a total of one credit (two semesters) may be applied toward graduation requirements. This class will be evaluated with a pass/fail grade only.

## Technical Theatre

Prerequisite: None; open to grades 9-12 • .5 credit

This course is designed to give the student a working knowledge of the technical aspects of theatre. Units of study include scenic design, set construction, set dressing, property design and construction, lighting design, audio engineering, costume and make-up design, stage management and dramaturgy. Although the course is primarily hands on, research and written assignments are also folded into the course.

## Visual Arts

-
Art I

-
Art II

-
Art III Honors

-
AP Art & Design

-
AP Art History

-
3D Art & Design

-
Oil Painting

## Art I

Prerequisite: None; open to grades 9-12 • .5 credit

Art I is a basic introduction to visual art concepts and art-making techniques. Students will use various art mediums and methods to create drawings, paintings, graphic designs and ceramic pieces. Projects will be based on an understanding and use of the basic “Elements of Art” and “Principles of Design.” Developing the ability to see artistically and to solve visual problems creatively will also be emphasized. This course can satisfy the fine arts requirement for graduation.

## Art II

Prerequisite: Art I and/or departmental approval • 1 credit

Art II is for students who have had some art experience and who wish to further develop their art making practice. This year-long class focuses on the creative development of students’ artistic skills as well as understanding of process and contextual art history. Projects explore a range of techniques, materials, and subject matters and include two and three-dimensional creations. This course can satisfy the fine arts requirement for graduation.

## Art III Honors

Prerequisite: Art II and departmental approval • 1 credit

Art III Honors is a year-long advanced-level studio art class that is a precursor to AP Studio Art. Students will further develop their artistic skills and knowledge through drawing, painting, collage, 3D, printmaking and digital artwork integration. They will further refine traditional skills while exploring experimental mediums and developing a portfolio of quality artwork. There is a higher caliber and complexity of work required in Honors Studio Art as artists begin to discover their personal artistic style and voice. This course can satisfy the fine arts requirement for graduation.

## AP Art & Design

Prerequisite: Studio Art Honors and/or departmental approval • 1 credit

The Advanced Placement Art & Design program is for eligible juniors and seniors who are highly motivated and committed to creating college-level work in one of three areas of focus: 2D Art & Design, 3D Art & Design or Drawing. This course requires students to create and submit a portfolio of 2D art, 3D art or drawings according to specific AP guidelines along with sophisticated written documentation of the inquiry-based exploration process. Classwork and homework are almost entirely student-driven as students work independently on a theme of their choice with regular faculty coaching as well as self, peer and teacher assessments. Work for this course begins in the summer so that students have time to create and submit a completed portfolio to the College Board for an AP evaluation and score. This course can satisfy the fine arts requirement for graduation.

## AP Art History

Prerequisite: none; open to grades 10-12 • 1 credit

Advanced Placement Art History explores the history of art across the globe from prehistory to the present, examining the relationship of art to various cultures and time periods. Students utilize technology to travel through time and analyze works of art through observation, discussion, reading and research. Nightly readings, classroom dialogue and regular assessments prepare students for success on the AP Art History exam while enriching their lives to be cultured global citizens with informed, robust, Christ-centered perspectives. This course can satisfy the fine arts requirement for graduation.

## 3D Art & Design

Prerequisite: MS Art 8, US Art I or departmental approval; open to grades 9-12 • .5 credit

3D Art & Design is a project-based class that introduces students to 3-dimensional design principles. Students will work hands-on to create 3-dimensional forms using a variety of techniques and materials including but not limited to clay, plaster, wire, metal, wood, cardboard, textiles, architectural models, fashion design and found objects. In addition to developing technique, style, and point of view, students will explore historical, aesthetic and cultural aspects of 3-dimensional artwork. This course can satisfy the fine arts requirement for graduation.

## Oil Painting

Prerequisite: MS Art 8, US Art I or departmental approval; open to grades 10-12 • .5 credit

Students in Oil Painting will work collaboratively to produce large, complex works of art for real-life patrons. Modeled after the apprentice process, students will work under the guidance of visual art faculty to design and create master works that meet the needs of their clients and gain valuable insight into the ministry, business, and entrepreneurial applications of art in the real world. A strong command of design principles, work ethic, foundational painting skills, and spiritual and emotional maturity are recommended for students in this class. Teacher recommendation by a visual art faculty member is required. This course can satisfy the fine arts requirement for graduation.

## Personal Development

## Course Descriptions

-
Business I

-
Business II

-
Cross Cultural Communication

-
Introduction to Public Speaking

-
Sports Sponsorship and NIL

-
Junior Seminar

-
Logic & Debate

-
Personal Finance and Biblical Stewardship

-
Senior Study Hall

-
Study Hall

-
Winterim

## Business I

Prerequisite: Algebra I; scheduling priority given to students in grades 10-12 • .5 credit

Introduction to Business provides a foundation for business education by exploring issues and principles of finance, marketing, entrepreneurship, communications, management, economics, leadership and human resources. Students also study profiles of business leaders, challenges in the business world and real-life business scenarios.

## Business II

Prerequisite: Complete Intro to Business; open to grades 11-12 • .5 credit

This course is a second level class that goes deeper into the business fundamentals of finance, accounting, marketing, management and human resources. Additionally, students will learn about the basics of personal finance, that will help prepare them for college and beyond.

## Cross Cultural Communication

Prerequisite: None; open to grades 9-12 • .5 credit

The Cross-Cultural Communication course provides students with a general overview of the communication process and strategies to become a more aware and effective communicator. This course also helps students grasp a working knowledge of culture and will cover topics that include the key distinguishing features of culture, individualistic and collectivistic cultures, identifying one’s own culture, relating to other cultures, and the roles of language and non-verbal communication, and asking helpful questions. With a general understanding of communication and culture in place, students will then be able to examine the impact of effective communication on our global community with the goal of meaningful engagement with others and a path toward increased relational wisdom in service to His kingdom.

## Introduction to Public Speaking

Prerequisite: None; open to grades 9-12 • .5 credit

Introduction to Public Speaking equips students in grades 9-12 with practical techniques to control the fear and anxiety of speaking in public by focusing on body language and voice elements. Students will learn how to design purpose-specific speeches, how to make strong visual presentations and how to engage different types of audiences. They'll use laptops to record and self-evaluate presentations (audio-only, visual-only, script-only), complemented by teacher and peer feedback. This class increases self-confidence and control; creates situational awareness and audience-focused presentations. This course will fulfill the speech requirement for graduation.

## Sports Sponsorship and NIL

Prerequisite: None; open to grades 10-12 • .5 credit

In this course, students will explore sponsorship in sport, including formulating creative solutions to achieve brand objectives at the team, venue, event and amateur athlete levels. Students will gain a historical perspective of important developments in athletics sponsorship, including an introduction to the rules and laws surrounding name, image and likeness (NIL). We will also explore current trends in sponsorship and NIL, the monetization of brands and the impact that these sponsorships have on athletic departments, partner brands and individual athletes.

## Junior Seminar

Prerequisite: Required for all juniors • .5 credit

Junior Seminar is a fundamental aspect of our college prep program. In this discussion-based class, students consider the importance of finding a college that will be a good fit and the skills necessary to succeed at that college. These skills include wise money management and budgeting, effective time management and healthy friendship and dating relationships. Special attention is paid to teaching students to navigate the college years while continuing to grow spiritually. Students finish this class with instruction in the basics of college admission and complete an application essay and activities resume in preparation for submitting admission applications in their senior year. This class is required for all juniors.

## Logic & Debate

Prerequisite: None, Open to grades 10-12 • .5 credit

The course trains students how to organize their thoughts correctly and articulate their ideas intelligently. Students will learn the science of forming an argument and the art of communicating it with precision and respect. This course will cover the basics of truth, logic and argumentation which will equip students to recognize the philosophical assumptions and underpinnings of an argument in order to judge its validity. Students will learn to identify formal and informal logical fallacies and how to construct sound syllogisms. There will be ample class time dedicated to in-class debates. All students will have the opportunity to express their skills through debate topics of their choice. This course will fulfill the speech requirement for graduation.

## Personal Finance and Biblical Stewardship

Prerequisite: None, Open to grades 9-12 • .5 credit

Personal Finance is a semester elective course designed to help students develop strategies for effectively managing their money as they prepare for life. The focus of this course will be on biblical principles of stewardship that will make a lasting difference in the lives of our students. Students will learn about the impact of individual choices on occupational goals and real-world financial issues. Students will also learn to apply decision-making skills to evaluate career opportunities and set personal goals. The course content is designed to help the learner make wise spending, saving, credit and debt decisions and to make effective use of income to achieve personal financial success.

## Senior Study Hall

Prerequisite: Available to grade 12 • No credit awarded

This study hall is scheduled during the first or fourth period, allowing seniors the privilege to be off-campus during this time. There is no instruction during this time; therefore, no grade is awarded nor do they receive credit.

## Study Hall

Prerequisite: None • No credit awarded

This is a period in the school day when students are not scheduled for an academic class. Study hall is a quiet structured work environment monitored by a teacher. There is no instruction during this time; therefore, no grade is awarded. Students do not receive credit for study hall.

## Winterim

Prerequisite: Required for all students • .25 credit

Winterim occurs for one week in the second semester and makes it possible to offer nontraditional enrichment courses as well as a variety of educational and mission/service trips. Courses include: three and/or six-hour enrichment classes, mission/service/spiritual life trips, and career shadowing (juniors and seniors only.) The purpose of Winterim is to allow students to explore interests not normally covered in the classroom and to develop relationships with teachers in a different setting.

## P.E. and Health

## Course Descriptions

-
Lifetime Fitness 9

-
Athletic Conditioning

-
Dance

-
Refereeing: Basketball I - Male

-
Refereeing: Basketball I - Female

-
Refereeing: Basketball II

## Lifetime Fitness 9

Freshman requirement • .5 credit

This course will focus on educating students as to the importance of lifetime physical wellness through aerobic exercise, movement training, nutrition, mental health and strength training. Emphasis will be placed on the assessment and maintenance of physical fitness to improve health and performance. Additional emphasis will be placed upon the application of psychological and sociological concepts, including self-responsibility, positive social interaction and group dynamics in the learning and performance of physical activity. Units of activity will include physical fitness as well as traditional aerobic sports and games.

## Athletic Conditioning

Prerequisite: Completion of Lifetime Fitness • .5 credit

Athletic Conditioning involves basic exercise for major muscle groups and routines appropriate for developing muscular strength and endurance. The class is open to males and females. Students may take this class multiple times, but only a total of one credit (two semesters) may be applied toward graduation requirements. This class will be evaluated with a pass/fail grade only.

## Dance

Prerequisite: None, Open to grades 9-12 • .5 credit

Dance is a semester elective course designed to allow students to learn about a variety of dance genres from around the world and will provide opportunities for students to practice various dance skills and techniques. This class can count toward a Physical Education credit or a Fine Arts Credit and is open to all students and abilities. Students may take this class multiple times, but only a total of one credit (two semesters) may be applied toward graduation requirements. This class will be evaluated with a pass/fail grade only.

## Refereeing: Basketball I - Male

Prerequisite: None, Open to grades 9-12 • .5 credit

This fall semester course introduces students to the basics of basketball officiating through both classroom and on-court instruction. Students will develop introductory knowledge of NFHS basketball rules, game management skills, conflict navigation and officiating mechanics for 2-person crews. This class prepares students to pursue certification upon completion. This class may be applied towards graduation requirements.

## Refereeing: Basketball I - Female

Prerequisite: None, Open to grades 9-12 • .5 credit

This fall semester course introduces students to the basics of basketball officiating through both classroom and on-court instruction. Students will develop introductory knowledge of NFHS basketball rules, game management skills, conflict navigation and officiating mechanics for 2-person crews. This class prepares students to pursue certification upon completion. This class may be applied towards graduation requirements.

## Refereeing: Basketball II

Next offered in 27-28

Prerequisite: Refereeing: Basketball I and instructor approval, Open to grades 9-12 • .5 credit

This spring semester course introduces students to the basics of basketball officiating through both classroom and on-court instruction. Students will develop thorough knowledge of NFHS basketball rules, game management skills, conflict navigation and officiating mechanics for 3-person crews. This class prepares students to pursue certification upon completion. This class may be applied towards graduation requirements. This course will be offered every other year.

## Journalism and Media Studies

## Course Descriptions

-
Broadcasting (Knights Knews) Honors

-
Yearbook/Yearbook Honors

-
Creative Writing

## Broadcasting (Knights Knews) Honors

Prerequisite: Successful completion of Intro to Film Production or Film Studies and departmental approval. • 1 credit

Broadcasting educates students on the power and potential of various mass communication strategies. The Knights Knews team creates a magazine that airs weekly to all upper school students and is posted on YouTube on the Knights Knews channel. In addition to the news magazine, students will also learn how to create a broadcasting personality, which they will utilize throughout the school year. Students will be required to learn editing on Final Cut® and create news stories in words and pictures on Celtx®. An application and video submission is a required part of the audition to be on the Knights Knews team.

## Yearbook/Yearbook Honors

Prerequisite: Open to 10-12 grade; application required • 1 credit

Yearbook teaches the art of producing a JK-12 yearbook. The ability to write well and some experience in photography, design and layout are useful for this class. Because of the many deadline pressures involved, students must be organized and responsible. Seniors who have at least one year of experience with serving on the yearbook team may earn an honors credit for their senior year. This course can satisfy the fine arts requirement for graduation.

## Creative Writing

Prerequisite: None, open to grades 9-12 • .5 credit

Creative Writing is a semester-long course designed for both beginners and established writers. Focusing on genres such as poetry, short story, humor and satire, personal essays and memoirs, and creative nonfiction, students will discover and develop the habits and skills writers use from the origination of ideas to the publication of their work. In a workshop setting, students will write, revise, and review their own work and collaborate to review the work of their classmates. Additionally, when opportunities arise, students will participate in local writing and literary conferences, festivals, and competitions. Whether a student desires to pursue professional goals or simply improve their own skills, they will have the opportunity to discover their writing voice and become confident and competent writers. Through all of this, students will gain a greater understanding of themselves and their place as creative beings in God’s universe.

## Academic Conservatory

Charlotte Christian School recognizes that students are gifted in a variety of areas, including academics, athletics, fine arts, or spiritual life. Just as interscholastic athletics offer special opportunities for athletically gifted students to be challenged, the Academic Conservatory Program provides a special opportunity for students in academics, fine arts, or ministry. Students may graduate with distinction in Bible, Religion and Philosophy, English, Fine Arts, Math, Science, Social Studies, Classical World Languages, and Modern World Languages.

This distinction will be recognized on students’ diplomas and transcripts and they will be recognized at graduation. More importantly, students will be encouraged and stretched to take the area that they are passionate about beyond the four walls of the classroom. Application, admission, and additional graduation requirements for this program are determined by individual departments.

If you are interested in this distinction, please read the information below and contact Mrs. Amanda Poole, upper school assistant principal. Seniors must submit a checklist from their area of conservatory interest by Oct. 1 and submit all supporting documentation before Jan. 31 of their senior year to be recognized at commencement. If students desire to have conservatory distinction listed on their transcripts during the college application process, they must submit all required documents before Oct. 1.

Academic Conservatory Guide

## Footer Holder

## Footer Top

## Location

Charlotte Christian School

## Middle School page (S5)

# Middle School

The middle school at Charlotte Christian offers young adolescents an academically rigorous, developmentally appropriate curriculum in a safe, nurturing, Christ-centered community. The middle school encourages students to grow academically, spiritually, emotionally and socially. Growth is fostered at every level as our faculty and program actively seek to develop habits and attitudes that make our students future-ready. As students grow in their understanding and experiences, our goal is for them to develop lifelong learning skills and interpersonal relationship skills from a biblical worldview with an emphasis on their individual approach to learning.

## Grades 5-8

The middle school years are a period of development for independence, self-concept, maturity and self-confidence. These years are filled with energy and excitement balanced by teacher-led advisory groups and chapels addressing issues important to adolescents to help them develop values, attitudes, habits of learning, peer and family relationships, and Christ-like character.

Our middle school model includes two intentionally crafted grade-level cohorts grouping grades 5 and 6 and grades 7 and 8 together to offer similar yet specialized programming tailored to the needs of our early adolescent learners. We offer scaffolded course selections and experiences to ensure a developmentally appropriate educational journey as students advance through middle school.

### Danielle Record

Middle School Principal

danielle.record@charchrist.com

### Ann Culberson

Middle School Assistant Principal

ann.culberson@charchrist.com

<>

-
Distinctives

-
Community

-
Cohort Model

## Distinctives

## Athletic Team

The following middle school sports accept maximum participation and do not require tryouts:

Coed Cross Country (Grades 7 - 8)

Boys Football (Grades 7 - 8)

Boys and Girls’ Swimming (Grades 7 - 8)

Coed Track (Grades 7 - 8)

Boys Wrestling (Grades 7 - 8)

The following middle school sports allow students to try out with a limited number of team members accepted:

Boys Baseball (Grades 7 - 8)

Boys and Girls’ Basketball (Grades 7 - 8)

Girls Cheerleading (Grades 6 - 8)

Boys and Girls’ Golf (Grades 7 - 8)

Boys and Girls’ Lacrosse (Grade 7 - 8)

Boys and Girls' Soccer (Grades 7 - 8)

Girls Softball (Grades 7 - 8)

Boys and Girls’ Tennis (Grades 7 - 8)

Girls Volleyball (Grades 7 - 8)

## INNOVATION

Middle school is an important time for students to explore their strengths and interests. To do that effectively, students need exposure to many different concepts and activities, especially those that intersect with real-world issues. Our innovation courses develop students who are problem solvers, innovators, inventors and logical thinkers. The curriculum helps students connect what they learn in different classes and explore engineering, technology, and design. Innovation courses that have been offered include coding, engineering, architecture, 3D solid modeling, genius hour, design lab, robotics, midKnight innovation, digital music and creative media.

## FINE ARTS

Experiences in fine arts provide a unique setting for students to discover and develop confidence in their God given gifts and abilities in the realm of creativity. Curricular fine arts offerings fall into one of four disciplines: digital arts, music, theatre and visual arts. With nearly twenty electives to choose from, middle school students can engage in the arts by exploring and trying a wide variety of arts electives or specializing in one or two disciplines. Course offerings include band, choir, orchestra, guitar, ukulele, digital music, broadcasting, visual art, acting, and an audition only competitive drama team, among others. Middle school students also have the opportunity to perform a co-curricular mainstage musical each fall. Previous shows include The Best Christmas Pageant Ever Musical, Elf the Musical JR, and The Sound of Music.

## Community

## Middle School Kingdoms

undefined

Six kingdoms, one king. Middle school at Charlotte Christian has a unique identity. Our kingdom system assigns students into one of six groups that meet routinely throughout the year. Through various activities, games, and team building, students find their belonging, voice, and leadership potential within their kingdom and the entire middle school community. It is well documented that play and pro-social opportunities are an important part of the development of the middle school student, and our kingdom system gives both students and teachers an opportunity for fun and relationship building. Our goal is for every student to leave us having a deeper understanding of their identity in Christ and a sense of belonging within our community.

## Activities and clubs

A variety of after school clubs are available to middle school students.

- mountain biking

- wrestling

- chess

- baseball

- cheer

- esports

## Cohort Model

Charlotte Christian School provides two personal counselors in the middle school to nurture relationships with students, support social/emotional learning and foster spiritual growth. Through individual sessions, small groups and classroom lessons, counselors partner with students to navigate challenges, develop healthy coping skills and integrate biblical truth into their daily lives. Students today are faced with many opportunities and challenges as they enter a fast-changing world and we want to do everything we can to encourage and empower the health of the whole child. For middle school, our school counselors have designed a biblically integrated curriculum that emphasizes our core values and seeks to meet social-emotional learning (SEL) standards. Our grade level lessons are designed to meet students at their specific developmental stages, foster a sense of belonging and engagement and deepen their biblical worldview.

## assistant principals

With two assistant principals dedicated to each cohort's developmental needs and readiness, each middle school student and family receive tailored support as they navigate their middle school journey. Mr. Eric Tornfelt focuses her support on our younger middle school cohort, grades 5 and 6. She is passionate about nurturing their transition into middle school and addressing their unique developmental needs during these foundational years. Mrs. Ann Culberson concentrates her efforts on students in grades 7 and 8, guiding them through the academic and social-emotional growth crucial for their continued success.

## Footer Holder

## Footer Top

## Location

Charlotte Christian School

## Lower School page (S6)

# Lower School

The lower school student at Charlotte Christian learns in an environment that provides a rich blend of strong academics combined with opportunities for individual and social growth, all from a Christian perspective. Students gain knowledge and an understanding of how all things fit together in God's plan as revealed in his Word. Teachers are equipped with the skills to teach, the compassion to nurture, and the creativity to make the academic challenge a road to discovery.

## Grades JK-4

The Early Education program at Charlotte Christian works to prepare the next generation by offering a comprehensive education to its youngest students. This becomes a reality for students in junior kindergarten and kindergarten as our Charlotte Christian faculty partners with families to engage and develop young learners through innovative practices and multi-sensory instructional strategies. Click here to learn more about junior kindergarten and kindergarten.

The lower school nurtures children in mind, body and spirit. Students are engaged in learning through a rich array of educational experiences. A carefully aligned academic curriculum, developmentally appropriate enrichment activities, and an experienced, caring faculty and staff create an environment where children thrive in spirit as they grow in knowledge. Lower school students develop higher-level thinking skills through a balanced academic curriculum and co-curricular activities.

### Brandon Henderson

Lower School Principal

brandon.henderson@charchrist.com

### Julia Walker

Lower School Assistant Principal

julia.walker@charchrist.com

### Jenna Peede

Lower School Assistant Principal

jenna.peede@charchrist.com

<>

## Lower School Extended Day

The Charlotte Christian School Extended Day program provides care beyond the regular school day for students in JK - grade 8. Through organized activities and supervised free time, the Extended Day program is designed to enrich the intellectual, spiritual, social, and physical development of students. Classroom space, games, and outdoor play facilities are available to children for homework, play, and various other extracurricular activities. Rates listed are for the current year. Click here to read more about extended day and to register.

## Lower School After School Clubs

The extracurricular after-school program offers classes to lower school students as an opportunity to broaden experiences and sharpen skills and talents. Emphasis is placed on Christian character development, integrity, responsibility and concern for others. Different classes may be offered depending on interest and availability. It is our purpose that each student use these many and varied experiences to discover, develop, refine and excel with the wonderful talents God has given them so that Jesus Christ may be glorified in all things. These classes are available during an eight-week stretch of both semesters for an additional fee.

## Lower School Theatre

Each spring, grade 3 and 4 students form the cast of an amazing musical that includes as many as 100 cast members. Previous shows include Disney’s Sleeping Beauty Kids, Finding Nemo, Alice in Wonderland, Stuart Little, Willy Wonka Kids and Disney’s Lion King Experience.

## Lower School Athletic Programs

Intramural Athletic Programs are offered for lower school students to get involved in sports. For girls, intramural cheerleading is available in the winter and intramural basketball is available to both boys and girls in the winter season. There are various athletic opportunities available (i.e. flag football, running, soccer, lacrosse) after school through the after school clubs program depending on the semester.

## At A glance

## Footer Holder

## Footer Top

## Location

Charlotte Christian School

## Upper School — 2026-27 US Course Curriculum Guide, full text (S1)

Page numbers are the PDF's.

===== PAGE 1 =====

```text
US Course Curriculum Guide
2026-27




MISSION STATEMENT
Charlotte Christian School is a Christ-centered, college preparatory school, equipping and developing students to effectively
integrate Biblical truth and learning into their daily lives and to impact the culture for Christ.
```

===== PAGE 2 =====

```text
Table of Contents
_______________________________________________________________________________




Grading Scale 2
Upper School Course Requirements 3
Important Registration Considerations 4
Graduation Requirements 6
English 8 
Math 13
Science 17
Social Studies 22
World Languages 27
Biblical Studies 33
Technology and Innovation Electives 35
Fine Arts: Digital Art 37
 Music 39
 Theatre 41
 Visual Art 42
Personal Development 44
Physical Education and Life Skills 46
Journalism and Media Studies 48




 1
```

===== PAGE 3 =====

```text
Upper School Grading Scale
 ______________________________________________________________________________




 A+ 97-100 (4.0)
 A 93-96 (4.0)
 A- 90-92 (3.67)
 B+ 87-89 (3.33)
 B 83-86 (3.0)
 B- 80-82 (2.67)
 C+ 77-79 (2.33)
 C 73-76 (2.0)
 C- 70-72 (1.67)
 D+ 67-69 (1.33)
 D 63-66 (1.0)
 D- 60-62 (0.67)
 F 0-59 (0)


Quality Points
Weighted GPA: One-half extra GPA quality point is awarded for honors courses for grades of at least
70%. One extra GPA quality point is awarded for AP level courses for grades of at least 70%.




 2
```

===== PAGE 4 =====

```text
Standard Course Requirement by Grade
 _____________________________________________________________________________


In alignment with our school’s mission statement, the upper school curriculum provides a college preparatory education of
the highest caliber and desires to equip students to be extraordinary thinkers and Christ-honoring decision makers. A
diverse array of academics, athletics, fine art and co-curricular activities encourage students to maximize their God-given
talents.

Grade 9 Grade 11
 ● Old Testament Survey ● Christian Theology & World Religions
 ● English 9* ● English 11** US History**
 ● World History I* ● Algebra II* or upper level math
 ● Biology* ● Physics**
 ● Algebra I* , Geometry* or Algebra II* ● World Languages III* or World Languages IV*
 ● World Languages I or World Languages II* ● Junior Seminar
 ● Lifetime Fitness ● Winterim
 ● Winterim ● Elective(s)
 ● Elective(s)

 Grade 12
Grade 10 ● Apologetics and Cultural Engagement
 ● New Testament Survey ● English 12**
 ● English 10* ● American Government & Economics**
 ● World History II ** ● Upper level or Advanced Placement Math Class
 ● Chemistry* ● Winterim
 ● Geometry*, Algebra II* or Pre-Calculus** ● Elective(s)
 ● World Languages II* or World Languages III*
 ● Winterim
 ● Elective(s)




* Honors Available
** Honors and Advanced Placement available




 3
```

===== PAGE 5 =====

```text
Important Registration Consideration
 ____________________________________________________________________



Academic Course Selection
As a college preparatory school, our students are expected to take a rigorous class load. We are confident of their
desires to take full advantage of the wide array of curricular and co-curricular offerings available at school. An important
question that needs to be asked, however, is “How much of a course load is too much?” In asking this question it is
recognized that a student’s course load will be affected by a variety of factors including: graduation requirements, grade
level, personal interests and aptitudes, co-curricular involvements, future goals and aspirations, as well as commitments
outside of school.

While colleges do show preference to students who challenge themselves academically by taking extra or advanced
courses when they are qualified, experience shows that overextending can clearly have adverse consequences, be they
academic, emotional, spiritual or social. This is an area where the biblical principle of learning to count the cost (Luke
14:28-32) truly applies.

If a student qualifies for an honors course, that does not mean that it is always in their best interest to enroll in that course.
We encourage consideration of all the aforementioned factors before making a decision as to a specific course load.

It should also be noted that as a school we are not always able to accommodate requested schedule changes from
students who, against school recommendation, find themselves overwhelmed, and grades earned in these instances remain
on the academic transcript.

We are thankful for the variety of academic and co-curricular offerings that we are able to provide at Charlotte
Christian. Please use this guide, along with our teachers and counselors, as a resource to map your academic course of
study.

It should be noted that final determination as to whether a course is actually offered during any academic year will be
made by the administration based upon: degree of interest, staffing and space availability.

Students who have fallen below prerequisite requirements for course placement will transition to the appropriate class.

Supplemental Coursework
Grades 9-12
All requests for supplemental coursework must be preapproved by the academic committee. If a course is offered at
Charlotte Christian, students are expected to take it at Charlotte Christian rather than through another school. Under
extenuating circumstances, requests for supplemental coursework will follow these guidelines:

• If this coursework fulfills a graduation requirement, it will appear on the Charlotte Christian transcript and will be
included in the student’s GPA.

• If the requested coursework does not fulfill a graduation requirement, it will be reflected as “see attached transcript”
and not included in the student’s GPA. The transcript from the alternate educational institution will be sent along to colleges
with the student’s Charlotte Christian transcript. It is the student’s responsibility to provide an official transcript to the
Charlotte Christian registrar.




 4
```

===== PAGE 6 =====

```text
Placement Tests
Placement tests are used in English, Math and World Language as part of the process of assessing incoming students for
appropriate placement.

Honors and AP Students
Charlotte Christian School is committed to providing all students with a robust and rigorous academic experience. Honors
and Advanced Placement (AP) classes are designed to provide a challenge for students with exceptional academic skills.
We strongly recommend that students take an appropriate course load and seek balance between their academic and
co-curricular obligations as well as outside of school commitments. We want all students to have a schedule that fits them
well academically and will allow them to thrive and flourish during their upper school years at Charlotte Christian. It is also
important to consider that the academic requirements for an honors course will require more work and be more in-depth.
AP courses are college-level courses taught in high school. These courses provide students an opportunity to earn college
credit. Since honors and AP courses require more effort, time and academic capacity, students and parents should expect
outside work that would mirror the workload of a college course. Our upper school counselors are here to serve and give
insight to help create the best schedule possible for your child. Parents and students are encouraged to speak with our
upper school counselors for further guidance.

Advanced Placement classes offered:
Computer Science and Technology Science
AP Computer Science AP Biology**
 AP Chemistry**
Fine Arts AP Environmental Science
AP Art History* AP Physics I
AP Music Theory
AP Art & Design Social Studies
 AP U.S. Government & Politics
English AP U.S. History
AP Language & Composition AP Psychology
AP Literature & Composition AP World History: Modern

Mathematics World Languages
AP Pre-Calculus AP French Language
AP Calculus AB/BC AP Latin
AP Statistics AP Spanish Language

 
 * Open Enrollment
 ** Offered in alternate years


Schedule Availability
July: Class schedules are provided to students prior to the beginning of the school year.

Schedule Changes
August/January: Students may request schedule changes to academic core classes and AP classes until the end of the first
two weeks of the academic school year (10 school days). Schedule change requests for elective classes must be made
before the end of the first week of school of each semester (five days). Following this drop/add period students may make
formal requests to the academic committee in the event of extenuating circumstances only. The academic committee will
evaluate situations that involve new and unanticipated factors on a case-by-case basis, and there is no guarantee a
schedule change will be made as courses may be full. Any course dropped after the end of the drop/add period will carry
a grade of WP (withdrawn pass), or WF (withdrawn fail). This grade will be posted on the permanent transcript of grades.



 5
```

===== PAGE 7 =====

```text
Upper School Graduation Requirements
 _____________________________________________________________________________



Course
Biblical Studies 4
English 4
Mathematics 4
Social Studies 4
Science 3
World Languages 2
Fine Arts 1
Physical Education 1
Winterim 1
Junior Seminar 0.5
Speech 0.5
Electives 1
Total Unit Requirements 26

Explanation of Graduation Requirements
These requirements and explanations are designed for students who attend upper school at Charlotte Christian all four
years. Students are required to complete a full academic load each year they are enrolled at Charlotte Christian School.
Students transferring into Charlotte Christian School after the ninth grade may have their graduation requirements
modified per administrative approval.

Bible
Students must complete a Bible class each year they are enrolled at Charlotte Christian School. If a student is admitted as
a senior, they will be required to complete both junior and senior Bible classes.

English
Students must complete one credit each of grades 9, 10, 11 and 12 English.

Mathematics
Students must complete at least four credits which must minimally include Algebra I, Algebra II, Geometry and
one course beyond Algebra II.

Social Studies
Students must complete World History I, World History II or Advanced Placement World History: Modern, U.S. History,
and American Government & Economics.

Science
Students must complete at least three credits which must minimally include Biology, Chemistry and Physics. It is
strongly recommended that students take a fourth year of science.

World Languages (For class of 2028 and after)
Students must complete two consecutive units of the same language while in upper school.
It is strongly recommended that students that are able take the fourth and Advanced Placement levels of the world
language.


 6
```

===== PAGE 8 =====

```text
World Languages (For class of 2027 and prior)
Students may meet the world language requirement in one of three ways:
1. Complete three units of the same language while in upper school.
2. Complete two units of the same language and one unit of another language while in the upper school.
3. Complete up to the third unit of a language in Upper School after advanced placement based on the
 recommendation of the middle school world language teacher.

It is strongly recommended that students that are able take the fourth and Advanced Placement levels of the world
languages.

Fine Arts
Students must complete one credit of fine arts. This can be met through any combination of courses that meet the fine arts
requirement.

Physical Education
All students must take Lifetime Fitness 9 and an additional .5 credit of elective physical education (i.e. athletic conditioning,
refereeing-basketball or dance). Participation in two seasons of any interscholastic sport or participation in two or three
musicals prior to the start of senior year, where the choreography rehearsal hours add up to 64 hours, also fulfills the
additional .5 credit.

Winterim
Each upper school student is required to earn a .25 Winterim credit per year as a graduation requirement. All morning
and afternoon courses receive an eighth of a semester credit (.125) per year, while full-day courses and trips receive a
quarter of a semester credit (.25). Charlotte Christian students are required to carry their minimum regular credit load for
both first and second semesters in addition to their Winterim credits.

Junior Seminar
This .5 credit required course is taken junior year and is designed to support students as they prepare for the transition to
successful academic, social and spiritual experiences in college.

Speech
This .5 credit requirement may be met by taking any of the following courses: Intro to Acting, Intermediate Acting, Vocal
Workshop, Intro to Public Speaking, Logic and Debate or Honors Acting Studio.




 7
```

===== PAGE 9 =====

```text
English
 _____________________________________________________________________________




Placement Criteria - English
Other placement criteria may include ERB or PSAT scores, demonstrated work ethic, critical thinking and
writing skills improvements via writing folders, possible writing sample and department recommendation.




 8
```

===== PAGE 10 =====

```text
English 9
Prerequisite: English 8 and departmental approval • 1 credit
English 9 introduces students to high school level critical thinking, reading comprehension, research and writing skills. This
Survey of Genres course focuses on two essential questions: what are the characteristics of each of the genres studied and
why are they important? Students explore World Mythology, Gothic Literature, Science Fiction and Fantasy (including
Magical Realism), the Short Story, Historical and Realistic Fiction, Nonfiction (including Diary, Autobiography, Biography,
Speech), Humor, Satire, and the Graphic novel, Poetry and Drama.

English 9 Honors
Prerequisite: 93% in English 8 and departmental approval • 1 credit
English 9 Honors differs from English 9 in the intensity, pace and depth of study. Students should expect to read more, work
more independently in class, collaborate more with other students, begin and continue more assignments as homework,
complete more complex writing assignments and demonstrate mastery of abstract concepts.

English 10
Prerequisite: English 9 or English 9 Honors • 1 credit
English 10 builds on foundations of literary analysis, critical thinking, writing and research skills. This Survey of American
Literature focuses on two essential questions: what does it mean to be an American and what does “freedom” mean?
Students will develop their own voice as they explore diverse narratives in a chronological approach: Early Formation, A
Growing Nation, Early Literary movements and Broadening Horizons. Students will study prose, poetry, historical documents
and drama from a Biblical perspective and appreciate the richness of voices that contribute to America’s story.

English 10 Honors
Prerequisite: 93% in English 9 or 83% in English 9 Honors and departmental approval • 1 credit
English 10 Honors differs from English 10 in the intensity, pace and depth of study. Students should expect to read more,
work more independently in class, collaborate more with other students, begin and continue more assignments as homework,
complete more complex writing assignments and demonstrate mastery of abstract concepts.

English 11
Prerequisite: English 10 or English 10 Honors • 1 credit
This course will emphasize specific techniques to improve critical thinking, reading, writing, research and presentation skills
relevant to preparation for college and beyond. In this Survey of World Literature, students consider the essential question
“What does it mean to be an engaged global citizen?” as they study classic and modern literature from Central and South
America, Africa, Southwest Asia, India, China, Japan and Korea. Students explore how religions, geography, politics and
history influence global literatures and vice versa. Excerpts from major world literature will help students compare
worldviews to a Christian worldview and recognize that all people are created in the image of God and are part of HIS
story.

English 11 Honors
Prerequisite: 93% in English 10 or 83% in English 10 Honors and departmental approval • 1 credit
English 11 Honors differs from English 11 in its pace and depth of study as well as a more focused intensity on fine-tuning
already strong writing skills. Students should expect to read more, work more independently in class, collaborate more with
other students, begin and continue more assignments as homework, complete more complex writing assignments and
demonstrate mastery of abstract concepts.




 9
```

===== PAGE 11 =====

```text
English 12
Prerequisite: English 11 or English 11 Honors or AP Language and Composition • 1 credit
This course will continue to emphasize techniques to improve critical thinking, reading, writing, research and presentation
skills relevant to transition to college and beyond. In this Survey of European Literature and Legacy, students consider two
essential questions “What does being an adult mean?” and "What does making good choices and decisions look like?” In a
chronological literary exploration of Greek and Roman Classics, Medieval Europe, Restoration and 18th Century, Romantics,
Victorian Period, Modern Europe and Colonial Legacy, students examine choices, decisions and consequences; they also
discuss how to discern God’s plans from human desire and actions.

English 12 Honors
Prerequisite: 93% in English 11or 83% in English 11 Honors and departmental approval • 1 credit
English 12 Honors differs from English 12 in its pace and depth of study as well as a more focused intensity on fine-tuning
already strong writing skills. Students should expect to read more, work more independently in class, collaborate more with
other students, begin and continue more assignments as homework, complete more complex writing assignments and
demonstrate mastery of abstract concepts.

Advanced Placement English Language and Composition
Prerequisite: 93% in English 10 Honors or 93% in English 11 Honors or 83% in AP Literature and Composition with
departmental approval • 1 credit
AP English Language and Composition is an intensive “how to” course. Students learn how to read purposefully for
complexity and nuance, how to write persuasively for a variety of audiences and contexts, and how to craft their message
and arguments intentionally. While students read global fiction and nonfiction to learn how a writer’s own techniques and
choices affect reader reaction, they also learn how to control their own diction, details, imagery, syntax and tone as they
write. Students develop reading and writing skills applicable to other disciplines, college and beyond.

Advanced Placement English Literature and Composition
Prerequisite: 93% in English 10 Honors or 93% in English 11 Honors or 83% in AP Language and Composition with
departmental approval • 1 credit
The AP English Literature and Composition course focuses on reading, analyzing and writing about imaginative literature
(fiction, poetry, drama) from various periods. Students engage in close reading and critical analysis of imaginative
literature to deepen their understanding of the ways writers use language to provide both meaning and pleasure. As they
read, students consider a work’s structure, style and themes, as well as its use of figurative language, imagery and
symbolism. Writing assignments include expository, analytical and argumentative essays that require students to analyze
and interpret literary works.




 10
```

===== PAGE 12 =====

```text
English - Elective Options
 __________________________________________________________________________



Introduction to Public Speaking
Prerequisite: None; open to grades 9-12 • .5 credit
Introduction to Public Speaking equips students in grades 9-12 with practical techniques to control the fear and
anxiety of speaking in public by focusing on body language and voice elements. Students will learn how to
design purpose-specific speeches, how to make strong visual presentations and how to engage different types of
audiences. They'll use laptops to record and self-evaluate presentations (audio-only, visual-only, script-only),
complemented by teacher and peer feedback. This class increases self-confidence and control, creates situational
awareness and audience-focused presentations. This course will fulfill the speech requirement for graduation.

Children’s Literature and Film Study
Prerequisite: None; open to grades 9-12 • .5 credit
This course is a general survey of children’s literature, beginning with early childhood books and ending with young adult
novels. The class will take a broad look at the developmental stages in regard to reading and learning as well as skim the
surface of some genres, such as fairy tales, historical fiction, realistic fiction and informational texts. The second half of the
course will involve reading original texts, watching the film versions and writing analytical responses as assessments.

Creative Writing
Prerequisite: None; open to grades 9-12 • .5 credit
Creative Writing is a semester-long course designed for both beginners and established writers. Focusing on genres such as
poetry, short story, humor and satire, personal essays and memoirs, and creative nonfiction, students will discover and
develop the habits and skills writers use from the origination of ideas to the publication of their work. In a workshop setting,
students will write, revise and review their own work and collaborate to review the work of their classmates. Additionally,
when opportunities arise, students will participate in local writing and literary conferences, festivals and competitions.
Whether a student desires to pursue professional goals or simply improve their own skills, they will have the opportunity to
discover their writing voice and become confident and competent writers. Through all of this, students will gain a greater
understanding of themselves and their place as creative beings in God’s universe.

Sci-Fi and Fantasy: Literature and Film through a Biblical Lens
Prerequisite: None; open to grades 10-12 • .5 credit
This course will explore classic science fiction and fantasy through literature and films, examining the rich themes, symbolism
and allegories from a Christian worldview. Students will delve into C.S. Lewis’s The Chronicles of Narnia, J.R.R. Tolkien’s The
Hobbit and The Lord of the Rings, J.K. Rowling’s Harry Potter series (the first 3 books) and various short works.

Students will analyze how these works embed biblical principles, messages and narratives into their stories. Students will
discuss concepts such as a fictional world’s fall, heroic sacrifices, good vs. evil, redemption, restoration and hope for
humanity. This class will challenge students to think critically about the literature/movies they consume and to find deeper
meta-narrative connections within the stories they love— as well as how to share the Gospel with fans of these works.




 11
```

===== PAGE 13 =====

```text
Dystopian Literature and Film through a Biblical Lens
Prerequisite: None; open to grades 10-12 • .5 credit
This course will explore the powerful warnings of dystopian literature and films. By examining George Orwell's Animal Farm
and 1984, Aldous Huxley’s Brave New World, Suzanne Collins's The Hunger Games and various short works through a
Christian lens, students will analyze what happens when societies reject God and try to create a "perfect" world through
human effort alone. By understanding the flawed meta-narratives that drive these stories, students will examine the
consequences of human pride and the allure of false utopias. This class will discuss challenging but essential questions: If a
society promises perfect peace and happiness, what is it asking you to give up in return? How does this contrast with the
peace offered by Christ? This course will equip students to think critically about these themes and understand how a biblical
worldview provides the ultimate hope and answers that dystopian narratives often lack.

Poetry Workshop, Honors
Prerequisite: 90% in current college prep English class or 80% in current English Honors or AP English class, open to grades
10-12 • .5 credit
This is a rigorous, semester-long course designed for committed students seeking advanced study in both the creation and
critical analysis of poetry. Concentrating on both compositional practice and critical reading of poetry and its diverse
forms, students will explore the fundamentals of rhythm, imagery, metaphor and structure, simultaneously applying these
elements in their own work and dissecting their use in published poems. Students will discover and develop the habits and
skills poets use from the development of complex ideas to the publication of their work. Within a workshop setting, students
will write, revise and engage in an in-depth review of their own poetry, collaborating to provide feedback to their
classmates. When opportunities arise, students will be encouraged to participate in local writing and literary conferences,
festivals and poetry competitions. Ultimately, students will discover how poetry–both writing and reading it–can reveal
God’s own attention to the beauty and power of words.




 12
```

===== PAGE 14 =====

```text
Math
 __________________________________________________________________________




Placement Criteria - Math
For placement of a grade eight student into an honors math class, the student must have a year-end
grade of 93% or above in the designated prerequisite class and departmental approval.




* Students may start the math sequence in middle school, such as Algebra I, but four math credits are still
required to be earned in the upper school. Grades, effort, maturity, responsibility, consistency, critical
thinking and study skills are considered as well as relevant standardized test scores.




 13
```

===== PAGE 15 =====

```text
Algebra I
Prerequisite: Pre-Algebra • 1 credit
Algebra I reviews pre-algebra skills and introduces the following algebraic topics: operations with integers, functions and
their graphs, solving equations and inequalities, graphing and writing linear equations, solving systems of equations and
inequalities, quadratic equations and functions, exponents and exponential functions, right triangles, radical and rational
expressions, and polynomials. Problem-solving strategies are incorporated throughout the course.

Geometry
Prerequisite: Algebra I • 1 credit
Geometry provides a thorough introduction to classical Euclidean geometry and emphasizes the deductive reasoning
process. The course includes a study of lines, angles, triangles, circles, polygons, solid figures and how they are related. It
uses the concepts of coordinate geometry, congruence, similarity, area, volume and transformations to analyze the different
topics in a more hands-on approach to geometry. 

Geometry Honors
Prerequisite: 93% in Algebra I • 1 credit
Geometry Honors provides a thorough introduction to classical Euclidean geometry and emphasizes the deductive reasoning
process. The course includes a study of lines, angles, triangles, circles, polygons, solid figures and how they are related. It
uses the concepts of coordinate geometry, congruence, similarity, area, volume and transformations to analyze the topics in
a more formal, proof-centered approach to geometry. The Honors level results in a more rigorous and faster pace of
material being taught. There is also a greater emphasis on solving geometric problems involving quadratic equations.

Algebra II
Prerequisite: Geometry • 1 credit
Algebra II is the study of the real number system with an emphasis on functions and their properties. The following topics
are covered: models, functions, permutations, linear systems and relationships, matrices, quadratic relations and functions,
polynomial functions, exponential and logarithmic functions, rational functions, periodic functions and introductory
trigonometric concepts. Problem-solving strategies and appropriate technology are incorporated throughout the course.

Algebra II & Trigonometry
Prerequisite: 90% in Algebra I and 90% in Geometry • 1 credit
Algebra II & Trigonometry is the study of the real number system with an emphasis on functions and their properties. The
following topics are covered: models, functions, permutations, linear systems and relationships, matrices, quadratic relations
and functions, polynomial functions, exponential and logarithmic functions, rational functions, periodic functions, probability
and deeper understanding of trigonometric concepts. Problem-solving strategies and appropriate technology are
incorporated throughout the course.

Algebra II & Trigonometry Honors
Prerequisite: 93% in Algebra I and 83% in Geometry Honors • 1 credit
Algebra II & Trigonometry Honors is a fast-paced course that takes a deep look at the study of the real number system with
an emphasis on functions and their properties. The following topics are covered in detail: models, functions, permutations,
linear systems and relationships, matrices, quadratic relations and functions, polynomial functions, exponential and
logarithmic functions, rational functions, periodic functions, probability and deeper understanding of trigonometric concepts.
Problem-solving strategies and appropriate technology are incorporated throughout the course.




 14
```

===== PAGE 16 =====

```text
Pre-Calculus
Prerequisite: Algebra II • 1 credit
Pre-Calculus is for students who have completed Algebra II or Algebra II Trig. This course provides further development of
modeling and applying functions. The following functions are included: linear, polynomial, exponential, trigonometric, power,
logarithmic, along with sequences and series. Appropriate technology is included in the course.

Pre-Calculus Honors
Prerequisite: 93% in in Algebra II or 83 in Algebra II/Trig • 1 credit
Pre-Calculus Honors is for the student who likes the study of mathematics without the depth or stress offered by an AP
course. The following topics are included: graphing families of functions, polynomial, power, rational, exponential, logistic,
logarithmic and trigonometric functions, analytic trigonometry, vectors, parametric and polar equations, analytic geometry
and an introduction to limits. Appropriate technology is included in this course.

Advanced Placement Pre-Calculus
Prerequisite: 83% in Algebra II/Trig Honors, or 93% in Alg II/Trig and pass readiness test for AP • 1 credit
AP Pre-Calculus covers the topics of a freshman year college algebra course. Students receive an in-depth study of
functions including polynomial, power, rational, exponential, logistic, logarithmic and trigonometric functions. Also included is
a study of analytic trigonometry, vectors, parametric and polar equations, analytic geometry and discrete mathematics.
Students taking this course are required to take the AP exam in May.

Advanced Placement Calculus AB
Prerequisite: 83% in AP Pre-Calculus or 93% in Pre-Calculus Honors and pass readiness test for AP • 1 credit
Advanced Placement Calculus AB is a college-level course for students planning to pursue a college major requiring
extended use of mathematics. AB Calculus follows the curriculum of a first semester college calculus class. It is expected that
those enrolled in this class will seek to earn college credit. This course emphasizes a multi-representation approach with
problems being expressed graphically, numerically, analytically and verbally. The connections between these
representations are very important in both attacking a problem and answering one. Broad concepts and widely applicable
methods are emphasized. Topics covered are limits, derivatives and integrals. This AP Calculus course is single-blocked.

Advanced Placement Calculus BC
Prerequisite: 93% in AP Pre-Calculus • 2 credits
Advanced Placement Calculus BC is a college-level course for students planning to pursue a college major requiring
extended use of mathematics. BC Calculus follows the curriculum of a first and second semester college Calculus class. It is
expected that those enrolled in this class will seek to earn college credit. This course emphasizes a multi-representation
approach with problems being expressed graphically, numerically, analytically and verbally. The connections between
these representations are very important in both attacking a problem and answering one. Broad concepts and widely
applicable methods are emphasized. Topics covered are everything in the AB curriculum in addition sequences, improper
integrals, infinite series, parametric, vector and polar functions. This AP Calculus course is double-blocked.

Probability, Statistics and Finite Mathematics
Prerequisite: Pre-Calculus • 1 credit
This course provides development of statistics which is the study of how to collect, organize, analyze and interpret numerical
information from data. The course also goes into elementary introduction to probability with applications. Topics include:
basic probability models, random variables, discrete and continuous probability distributions, statistical estimation and
testing, confidence intervals, and an introduction to linear regression. All concepts learned throughout the class will also be
reinforced with real life projects that will help the students understand the material better.



 15
```

===== PAGE 17 =====

```text
Probability, Statistics and Finite Mathematics Honors
Prerequisite: 93% in Pre-Calculus or 83% in Pre-Calculus Honors • 1 credit
This course is a fast-paced course that provides development of statistics which is the study of how to collect, organize,
analyze, and interpret numerical information from data. The course also goes into elementary introduction to probability
with applications. Topics include: basic probability models, random variables, discrete and continuous probability
distributions, statistical estimation and testing, confidence intervals, and an introduction to linear regression. All concepts
learned throughout the class will also be reinforced with real life projects that will help the students understand the material
better.

Advanced Placement Statistics
Prerequisite: 83% in AP Pre-Calculus or 93% in Pre-Calculus Honors • 1 credit
Advanced Placement Statistics examines and simulates probability distributions in order to predict and estimate future
events. Students investigate ways to analyze the relationship between two or more variables through the concepts of
correlation and regression. Using a graphing calculator, students discover and understand concepts algebraically,
graphically and numerically, as the AP exam requires.

Calculus III
Prerequisite: 93% in AP Calculus AB or completion of AP Calculus BC • 1 credit
Calculus III follows Advanced Placement Calculus and includes the study of multivariable functions, vector-valued functions in
plane and space, curvature, double and triple integrals, vector analysis, differential equations and other advanced math
topics. This course will receive AP weighting in a student’s GPA.




 16
```

===== PAGE 18 =====

```text
Science
 __________________________________________________________________________




Placement Criteria - Science




● Please note the progression of science classes is linked to math placement and may vary.

● Upper school requires three science credits for graduation: biology, chemistry and physics. The fourth
 year is optional but strongly encouraged.

● Grades, effort, maturity, responsibility, consistency, reading comprehension, critical thinking and study
 skills are considered as well as relevant standardized test scores.




 17
```

===== PAGE 19 =====

```text
Biology
Prerequisite: Grade 8 Earth Science and/or departmental approval • 1 credit
Biology integrates regular class work with laboratory experience to offer a broad understanding of many biological topics.
Students begin the year by learning general characteristics of living organisms. They study life at the molecular/chemical
level and then learn the function and structure of cells, the metabolic processes that keep organisms alive and the genetic
and reproductive properties that maintain all species. During the second semester, students begin to classify organisms
according to specific kingdom and species characteristics. Several weeks of the course are involved in examining theories
about the origin of life. During this time, students are encouraged to research, question and discover fallacies and evidence
surrounding these theories. Throughout the year, students learn the importance of biology in everyday life. They are
encouraged to find the perfect design God planned in the living world He created.

Biology Honors
Prerequisite: 93% in Earth Science and current placement in Geometry or higher • 1 credit
Biology Honors is for students who exhibit exceptional skills in math and science. Topics are similar to those covered in
Biology but are covered with increased breadth and depth.

Chemistry
Prerequisite: Biology • 1 credit
Chemistry explores the composition, structure, properties and transformation of matter. Its problem-solving approach
coordinates theoretical elements of the science with laboratory experimentation. Students receive an introduction to the
major divisions of chemistry and develop a greater understanding of and appreciation for the order and design of God’s
creation. Major concepts of the course include atomic theory, stoichiometry, chemical reactions and reactivity, chemical
bonding and the properties of substances, chemical kinetics and chemical equilibrium.

Chemistry Honors
Prerequisite: 83% in Biology Honors or 93% in Biology and concurrent enrollment in Algebra II/Trig or higher math course
and/or departmental approval • 1 credit
Chemistry Honors is for students who exhibit exceptional aptitude in math and science. Topics are covered with increased
breadth and depth and require more time (e.g. labs).

Physics
Prerequisite: Completion of Biology and Chemistry • 1 credit
This course provides students a general overview of physics. Students learn the basic principles of Newtonian Mechanics
including motion, acceleration, forces, momentum and energy as well as the fundamental principles of electricity, magnetism,
light and sound. The course is highly experiential, with an emphasis on hands-on laboratory work. The course stresses God’s
preeminence over His creation and demonstrates the order of His work.

Physics Honors
Prerequisite: Student must have completed Algebra II/Trig Honors or Algebra II/Trig; and a grade of 83% in Chemistry
Honors or grade of 93% in Chemistry; and departmental approval • 1 credit
Physics Honors introduces students to a science that seeks to explain the fundamentals of all phenomena of nature. Physics
investigates all matter, from subatomic particles to galaxies, and all energy, from transmission to nuclear fusion. Students
broaden their understanding of the physical world and receive an excellent foundation for future study in science and
engineering. The course trains students to analyze and solve problems scientifically as they study classical mechanics (the
study of motion), electricity and magnetism, with a brief introduction to wave phenomena, optics and sound.




 18
```

===== PAGE 20 =====

```text
Advanced Placement Physics I
Prerequisite: If completed Physics Honors with 83% or higher, must also have 83% in Chemistry Honors. If no prior Physics
class has been taken, must have 93% in Chemistry Honors. • 1 credit
Advanced Placement Physics I covers topics in mechanics and fluids using an algebra-based approach. It is equivalent to the
first semester of an introductory college physics course for non-science majors and gives students the opportunity to earn
college credit.




 19
```

===== PAGE 21 =====

```text
Science - Elective Options
 __________________________________________________________________________



Astronomy
Prerequisite: Completion of Biology and Chemistry • Open to grades 11-12 • .5 credit
Astronomy is a semester-long science elective that targets students who have a fascination with the complexity, order and
grand design of the universe. The course explores the continually developing cosmos that surrounds us as far as telescopes
allow us to see. Topics include recognizing constellations, our solar system, the nature of radiation and matter, black holes,
galaxies, dark matter and energy, and the large-scale structure and development of the cosmos.

Anatomy/Physiology
Prerequisite: Biology; Chemistry • 1 credit
This course involves a survey of the structure, function and interactive dynamics of the human body. Students will understand
functional anatomy with application to life experience through case studies. This course requires a keen interest in human
anatomy and physiology. The first semester covers the fundamentals of anatomy and physiology while the second semester
explores each body system in detail. Dissections are required.

Forensic Science I
Prerequisite: 83% in Biology and Chemistry • Open to grades 11-12 • .5 credit
Forensic Science is an application of basic biological, chemical and physical science principles in the investigation of crime
scenes. This course is designed to make students aware of the services of a crime laboratory and the proper utilization of
these services. Forensic Science I will concentrate on the types of evidence crime scene investigators look for and what
forensics science really looks like from the crime scene to the courtroom, dispelling myths created by the CSI effect and
uncovering the realities of work in the field of forensics.

Forensic Science II Honors
Prerequisite: 83% in Forensic Science I • Open to grades 11-12 • .5 credit
Forensic Science II Honors encourages students to apply advanced biological, chemical and physical science principles to the
study of crime scenes, highlighting forensic science as an interdisciplinary field. This course is designed to expand upon the
knowledge gained in Forensic Science I, focusing on the use of laws and evaluation of evidence to build a strong and
credible case. Students will learn through extensive hands-on laboratory experience and analytical problem solving
exercises in order to gain a deeper knowledge of evidence identification, collection and analysis processes. The curriculum
fosters critical thinking, independent investigation and application of forensic techniques to hypothetical situations which will
be demonstrated in a final culminating project.

Advanced Placement Biology - (Next offered in 2027-28)
Prerequisite: 93% in Biology Honors and 83% in Chemistry Honors and/or departmental approval • 1 credit
Advanced Placement Biology is a course that will focus on college-level biological principles and methodology. This course
will develop students’ laboratory skills and provide foundational knowledge for future science courses. Students will
investigate topics that were introduced in Biology such as cell structure and function, cell cycle, genetics and ecology. These
topics are explored in-depth and at a quick pace. This course will alternate with AP Chemistry and be offered every other
year.


 20
```

===== PAGE 22 =====

```text
Advanced Placement Chemistry - (Next offered in 2026-27)
Prerequisite: 93% in Chemistry Honors; concurrent enrollment in Pre-Calculus or higher and departmental approval • 1
credit
Advanced Placement Chemistry is the equivalent of a general college chemistry course and gives students the opportunity
to earn college credit. The course continues to develop students’ ability to think critically and to express ideas orally and in
writing with clarity and logic. Topics are investigated in-depth and at a brisk pace. This course will alternate with AP
Biology and be offered every other year.

Environmental Science Honors - (Next offered in 2027-28)
Prerequisite: 83% in Biology, Chemistry and departmental approval • 1 credit
Environmental Science Honors is a hands-on interdisciplinary science elective course that provides students with the scientific
principles, concepts and methodologies necessary for understanding the interrelationships of the natural world, identifying
and analyzing environmental problems (natural and man-made), evaluating the relative risks associated with these
problems and examining alternate solutions for resolving and/or preventing them. The course is an excellent choice for
students who have completed two years of an upper school laboratory science and show an interest in environmental issues.

Topics include: basic ecology, energy flow and matter cycling in ecosystems, human population impact, resource use and
depletion, fossil fuels and renewable energy sources, food/soil resources, water resources, biodiversity loss and air/water
pollution. Major issues addressed include eutrophication, acid rain, ozone depletion and climate change.

This course will alternate with AP Chemistry and be offered every other year.

Advanced Placement Environmental Science
Prerequisite: 90% in Biology, Chemistry or completion of Chemistry Honors • 1 credit
Advanced Placement Environmental Science is an interdisciplinary college-level course that provides students with the
scientific principles, concepts and methodologies necessary for understanding the interrelationships of the natural world,
identifying and analyzing environmental problems (natural and man-made), evaluating the relative risks associated with
these problems and examining alternate solutions for resolving and/or preventing them. The course is an excellent choice
for students who have completed two years of an upper school laboratory science and show a keen interest in
environmental issues. Topics include: energy flow and matter cycling in ecosystems, basic ecology, human population
dynamics, resource use, energy issues, food/soil resources, water resources, biodiversity loss, air/water pollution detection
and management, eutrophication, acid rain, ozone depletion and climate change.




 21
```

===== PAGE 23 =====

```text
Social Studies
 __________________________________________________________________________




Placement Criteria - Social Studies




 22
```

===== PAGE 24 =====

```text
World History I: Ancient Civilizations
Prerequisite: None • 1 credit
This full-year course involves the study of geography, world religions and other major developments that have been crucial
to the course of human history. This course begins with early civilizations and traces the history of those civilizations through
to the mid 1300-1400s. Students will develop historical thinking skills as they identify key figures, pivotal events and major
movements that have shaped the world into what it is today.
 
World History I Honors: Ancient Civilizations
Prerequisite: 93% in Grade 8 Social Studies • 1 credit
World History Honors differs from World History in the intensity and depth of study. Students will analyze primary sources,
evaluate document-based questions through historical research and complete more writing assignments, demonstrating
mastery of both historical facts and writing skills. A major goal of Honors World History is preparing students for AP World
History in their sophomore year.

World History II: The World and the West
Prerequisite: World History I • 1 credit
World History II - The World and the West surveys the period from c. 1200, and explores the political, religious, social and
ideological forces that have shaped the modern world through the 20th century. A major focus of the course is answering
the question of how western Europe (the West) and its norms, culture, values, etc., became so influential and shaped the
modern world in such profound ways over the last five centuries. Through this lens, the course will study a wide variety of
world cultures and civilizations as they interacted with and resisted western European powers, and sought to exert influence
in their respective regions. Students will read and analyze a wide variety of primary and secondary sources, complete
various creative projects, participate in socratic seminars and learn the fundamentals of writing by using historical
arguments.

World History II Honors: The World and the West
Prerequisite: 93% in World History I - Ancient Civilizations or 83% in World History I Honors - Ancient Civilizations or
departmental approval • 1 credit
World History II Honors contains the content and themes of World History II, but adds additional select topics appropriate
to honors-level rigor and includes depth and writing skills that will prepare students for future AP social studies courses (AP
U.S. History, and/or AP U.S. Government and Politics) should they so choose. This will come through the analysis of various
primary and secondary sources, responding to various document-based questions through historical research and projects
and socratic seminars.

Advanced Placement World History: Modern
Prerequisite: 93% in World History I Honors • 1 credit
Advanced Placement World History: Modern meets the World History II graduation requirement. This college-level course
surveys the major civilizations, era-defining events and people, religions and ideologies that have shaped the modern
world from c. 1200 through the end of the 20th century: everything from the Mongols, to the European Enlightenment, the
American, French, and Haitian Revolutions, to Hitler, Stalin and Mao. Students will think about these developments at a high
level by analyzing texts, visual sources and other historical evidence. They will express their knowledge in a variety of
ways, such as: advanced historical argumentation through writing, group projects and socratic seminars. The course will
prepare students for the year-end AP exam, and is an excellent foundation for future AP social studies courses.




 23
```

===== PAGE 25 =====

```text
United States History
Prerequisite: None • 1 credit
United States History surveys American history, beginning from the historical settlements of Native Americans in North
America to the end of the 20th century. It provides a strong background in historical facts while incorporating the sweeping
themes of history that continue to influence our world. Taught against the backdrop of world history events and current
events, the course shows the interdependence of our nation and the rest of the world.

United States History Honors
Prerequisite: 93% in World History II: The World and the West or 83% in World History II Honors: The World and the
West and departmental approval • 1 credit
United States History Honors differs from United States History in the intensity and depth of study. Students are expected to
analyze important historical events with an emphasis on the examination of primary sources. Students will examine the
interdependence of our nation to the world through writing assignments, demonstrating mastery of both world history
historical facts and writing skills.

Advanced Placement United States History
Prerequisite: 93% in World History II Honors: The World and the West or 83% in Advanced Placement Modern World
History and departmental approval • 1 credit
Advanced Placement United States History studies the cultural, economic, political and social developments that have
shaped the United States from c. 1491 to the present. Students will analyze texts, visual sources and other historical
evidence and write essays expressing historical arguments. This course is a college-level offering, and demands of the
students both an additional level of academic discipline and development of related analytical skills.

American Government
Prerequisite: None • .5 credit
This course of study will give the students a broad-based understanding of both the institutions and purposes of the
American government and a genuine understanding of the inner workings of this constitutional democracy. This will focus on
both an understanding and analysis of foundational principles, the American political landscape (most notably ideological
differences on the many issues of our day), the political process (as related primarily to voter behavior) and the election
process, the separation of powers between the three branches of government and an in-depth look at both civil liberties
and civil rights. All of this will be used for a healthy discussion of current political events as related to key course
components.

Economics
Prerequisite: None • .5 credit
This course of study will give students a broad-based understanding of our free-market economic system. This involves both
an understanding of significant economic policy decisions and the related ideological perspective on such. This course
further involves elements of macroeconomics, which studies the behavior and performance of an economy as a whole, and
elements of microeconomics, which deals with single economic factors and the effects of individual decisions. All of this will
be used for a healthy discussion of economic current events as related to key course components.




 24
```

===== PAGE 26 =====

```text
American Government Honors
Prerequisite: 93% in U.S. History or 83% in U.S. History Honors or 83% or above in Advanced Placement U.S. History • .5
credit
This course of study will give students a broad-based understanding of both the institutions and purposes of the American
government and a genuine understanding of the inner workings of this constitutional democracy. This will focus on a more
in-depth understanding and analysis of foundational principles, the American political landscape (most notably ideological
differences on the many issues of our day), the political process (as related primarily to voter behavior and the election
process), the separation of powers between the three branches of government and an in-depth look at both civil liberties
and civil rights. This course also requires the students to gain a deeper understanding and analysis on the inner workings of
government as demonstrated in a semester research paper. All of this will be used for a healthy discussion of current
political events as related to key course components.

Economics Honors
Prerequisite: 93% in U.S. History or 83% in U.S. History Honors or 83% in AP U.S. History • .5 credit
This course of study will give students a broad-based understanding of our free-market economic system. This involves a
more in-depth understanding of significant economic policy decisions and the related ideological perspective on such. This
course further involves elements of macroeconomics, which studies the behavior and performance of an economy as a
whole, and elements of microeconomics, which deals with single economic factors and the effects of individual decisions. All
of this will be used for a healthy discussion of economic current events as related to key course components. This course also
requires the students to gain a deeper understanding and analysis of economic theory, as demonstrated in a semester
research paper.

Advanced Placement United States Government & Politics
Prerequisite: 93% in U.S. History Honors or 83% in Advanced Placement U.S. History and departmental approval • 1
credit
Advanced Placement United States Government and Politics gives students a critical perspective on economics, politics and
government, involving both the study of general concepts used to interpret United States politics and the analysis of specific
case studies. It requires students to analyze the institutions, groups, beliefs and ideas that make up the American political
reality.




 25
```

===== PAGE 27 =====

```text
Social Studies - Elective Options
 __________________________________________________________________________



Psychology
Prerequisite: None; open to grades 9-12 • .5 credit
Psychology will give students an understanding and appreciation of the science of psychology. The class will analyze ‘Your
Self” (with emphasis on theories of personality), “Your Body” (with emphasis on body rhythms and mental states), “Your
Mind” (with emphasis given on thinking and intelligence), “Your Environment” (with emphasis on learning and behavior),
“Your Mental Health” (with emphasis on psychological disorders) and “Your Life” (with emphasis on emotions, stress and
health). A Christian perspective and current events will be integrated throughout the course.

Advanced Placement Psychology
Prerequisite: 93% in 11th grade College Prep English & Social Studies or 87% in 11th grade Honors English & Honors
Social Studies or 83% in 11th grade AP English & AP Social Studies; open to grade 12 • 1 credit
Students will study the historical development and contemporary discipline of psychology including its roots in philosophy
and biology. This course examines biology (neuroscience, genetics, human development, sensation and perception), cognition
(learning, memory, thinking, language and intelligence), psychological functioning (motivation, personality theory,
psychological disorders and therapy), and social functioning (stress, health and social psychology). This course prepares
students to analyze, critique and respond to the aforementioned from a Biblical worldview.

Sociology
Prerequisite: None; Open to grades 9-12 • .5 credit
Sociology is a semester elective course designed to familiarize students with various cultures and the problems resulting
from people living in groups. This course covers such topics as culture, subcultures, social institutions, collective behavior,
social change, social deviation, the family, religion, racial and ethnic minorities, poverty and crime. The latter portion of this
course deals specifically with the pressing problems of our society, their causes and possible solutions. A Christian
perspective and current events will be integrated throughout the course.

Sports Psychology
Prerequisite: None; Open to grades 9-12 • .5 credit
Sports Psychology will give students an overview of the psychological theories and research that relates to sport/exercise
participation and behavior at both the individual level and group level. The class will analyze character development
through sport/exercise (with an emphasis on leadership theories and team dynamics/cohesion), psychological factors in
sport/exercise (with an emphasis on motivation, stress and anxiety, unhealthy behaviors of athletes and self-confidence),
physical factors in sport/exercise (with an emphasis on injuries, burnout and overtraining) = and mental skills training in
sport/exercise (with an emphasis on arousal regulation, imagery, self-confidence, goal setting, attention and concentration).
Overall, the course will focus on uncovering the psychological factors involved in sport/exercise along with studying the
mental skills needed for individuals to overcome the various physical and psychological challenges that are connected with
sports, competition and exercise.




 26
```

===== PAGE 28 =====

```text
World Languages
 __________________________________________________________________________



Placement Criteria - World Languages




 27
```

===== PAGE 29 =====

```text
French I
Prerequisite: None • 1 credit
French I emphasizes the integration of the five National World Language Standards — communication, cultures, connections,
comparisons and communities — from a biblical perspective. French I introduces the French language and its culture and
covers most basic functions of the language. Emphasis is on listening, speaking, reading and writing skills within a given
context and extending outside the classroom setting when possible. An overview of the culture — its products (literature,
laws, foods, games), perspectives (attitudes, values, beliefs) and practices (patterns of social interaction) — is integrated
throughout the course. Students acquire insight into how languages and cultures work by comparing the French language
and culture to their own. Topics of study include the calendar, weather, family and home, time, school, sports, Psalms and
Bible verses related to themes. The class is conducted in French and English.

French II
Prerequisite: French I and department placement test • 1 credit
French II emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. French II continues developing the skills of
listening, speaking, reading, and writing as students participate in simple conversational situations by combining learned
elements of the language orally and in writing. Students compose sentences that narrate, describe, compare and summarize
familiar topics from French culture. They also use the language to communicate basic survival needs and interact on
everyday issues inside and outside the classroom setting. Students expand their understanding of similarities and
differences between their own culture and language and those of France. Students completing this course are able to recite
and learn specific assigned Bible verses. The class is conducted predominantly in French.

French II Honors
Prerequisite: 90% in French I and departmental approval • 1 credit
French II Honors continues developing the skills of listening, speaking, reading and writing as students participate in simple
conversational situations by combining learned elements of the language orally and in writing. Students compose sentences
that narrate, describe, compare and summarize familiar topics from French culture. They also use the language to
communicate basic survival needs and interact on everyday issues inside and outside the classroom setting. Students expand
their understanding of similarities and differences between their own culture and language and those of France. Students
completing this course are able to recite and learn specific assigned Bible verses. The class is conducted predominantly in
French.

French III
Prerequisite: French II • 1 credit
French III emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. French III builds upon the foundation of listening,
speaking, reading and writing skills begun in levels I and II. Students respond to and maintain face-to-face communication
in French. They identify main ideas and significant details in discussion, presentations and written texts and interpret
authentic materials. Students take the AAPPL test to demonstrate communicative proficiency. At the conclusion of the course
they are able to present a simple plan of salvation in writing. The class is conducted predominantly in French.

French III Honors
Prerequisite: 90% in French II or 83% in French II Honors and departmental approval • 1 credit
French III Honors emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. French III Honors offers additional opportunities
for expanding the skills of language learning: listening, speaking, reading and writing. Students initiate and maintain
face-to-face communication in French. They identify main ideas and significant details in discussion, presentations, and
written texts and interpret authentic materials. Students are introduced to brief literary works. The class is conducted
predominantly in French.
 28
```

===== PAGE 30 =====

```text
French IV Honors
Prerequisite: 90% in French III or 83% year end grade in French III Honors and departmental approval • 1 credit
French IV Honors emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. French IV Honors focuses on enabling students to
communicate in writing and in extended conversations on a variety of topics. Students use more complex grammatical
structures as they narrate, discuss and support ideas and concepts with concrete facts. Upon course completion, students
have a good understanding of what is socially acceptable in French culture. At the conclusion of the course, students are
required to give their testimony in writing in French using biblical references. The class is conducted in French.

AP French Language and Culture
Prerequisite: French IV Honors and/or departmental approval • 1 credit
Advanced Placement French Language and Culture emphasizes the integration of the five National World Language
Standards — communication, cultures, connections, comparisons and communities — from a biblical perspective. This class
emphasizes conversation, grammar and composition. The class enables students to attain high levels of ability in listening,
speaking, reading and writing. They are exposed to a variety of genres to help them expand their knowledge of formal
language in oral and written forms, thereby increasing levels of coherency, resourcefulness, fluency and accuracy. Students
are graded using the AP scale.

Latin I
Prerequisite: None • 1 credit
Latin I introduces students to the language of the ancient Romans. While the main goal is to read Latin texts at the novice
level of proficiency, students will also develop reading, writing, listening and speaking skills. Students will interact with a
variety of introductory texts focused on daily life, family, mythology and travel and have opportunities to compare the
ancient world with the modern. Discussions of vocabulary and grammar will strengthen students’ understanding of English
and modern Romance languages.

Latin II
Prerequisite: Latin I • 1 credit
Latin II provides students continued opportunities to develop their reading, writing, listening and speaking skills with a goal
of moving from novice toward intermediate proficiency. Students will read texts concerning heroes, city life, the games and
commerce and have opportunities to respond creatively to these topics throughout the year. New vocabulary and grammar
concepts will build upon the foundation laid in Latin I.

Latin II Honors
Prerequisite: 90% in Latin I and departmental approval • 1 credit
Latin II Honors provides students continued opportunities to develop their reading, writing, listening and speaking skills with
a goal of moving from novice toward intermediate proficiency. Students will read texts concerning heroes, city life, the
games and commerce and have opportunities to respond creatively to these topics throughout the year. New vocabulary
and grammar concepts will build upon the foundation laid in Latin I. This course is taught at a faster pace with deeper
exploration of content.

Latin III
Prerequisite: Latin II • 1 credit
Latin III pushes students to achieve an intermediate proficiency level in reading with continued interest in writing, listening
and speaking skills. Students will interact with texts focused on empire, geography, time and cultural practices. Several
projects will stretch students in the areas of composition and presentation in the target language. More specific vocabulary
and grammar concepts will build upon those covered in Latin II.


 29
```

===== PAGE 31 =====

```text
Latin III Honors
Prerequisite: 90% in Latin II; or 83% in Latin II Honors and departmental approval • 1 credit
Latin III Honors pushes students to achieve an intermediate proficiency level in reading with continued interest in writing,
listening and speaking skills. Students will interact with texts focused on empire, geography, time and cultural practices.
Several projects will stretch students in the areas of composition and presentation in the target language. More specific
vocabulary and grammar concepts will build upon those covered in Latin II. This course is taught at a faster pace with
deeper exploration of content.

Latin IV Honors
Prerequisite: 90% in Latin III or 83% in Latin III Honors • 1 credit
Latin IV Honors is a survey course designed to assist students as they transition to reading unadapted texts either as the
culmination of their study of the language or in preparation for AP Latin. Students will read selections from the Vulgate and
medieval authors, Martial, Eutropius, Catullus, Ovid and Caesar. Increased emphasis is placed on honing translation skills,
analyzing texts and making connections across disciplines.

Advanced Placement Latin
Prerequisite: 83% in Latin IV Honors and departmental approval • 1 credit
The Advanced Placement Latin course focuses on continued Latin language acquisition, with the inclusion of textual analysis
and contextualization skills. Students will read selections from Vergil’s Aeneid, Pliny the Younger’s Letters and other classical,
medieval and Renaissance works. Throughout the course, students will consider the main ideas, effects or purposes and
points of view expressed in these works to gain a deeper understanding of them and the culture in which they were
created.

Spanish I
Prerequisite: None • 1 credit
Spanish I emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. Spanish I introduces the Spanish language and its
culture as students learn and perform the most basic functions of the language. Emphasis is on development of listening,
speaking, reading and writing within a given context, extending outside the classroom setting when possible. A general
introduction to the culture — its products (literature, laws, foods, games), perspectives (attitudes, values, beliefs) and
practices (patterns of social interaction) — is integrated throughout the course. Students acquire insight into how languages
and cultures work by comparing the second language and culture to their own. 

Spanish II
Prerequisite: Spanish I and sufficient score on year-end department placement test • 1 credit
Spanish II emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. Spanish II continues developing the skills of
listening, speaking, reading and writing as students participate in simple conversational situations by combining learned
elements of the language orally and in writing. Students are provided additional time to strengthen skills and
understanding of concepts first learned in Spanish I and are exposed to new skills and concepts as sequentially
appropriate. They compose simple sentences to narrate, describe, compare and summarize familiar topics from Spanish
culture. They also use the language to communicate basic survival needs and interact on everyday issues inside and outside
the classroom setting. Students expand their understanding of the similarities and differences between their own culture and
language and those of Spanish-speaking countries. The class is conducted in Spanish and in English.




 30
```

===== PAGE 32 =====

```text
Spanish II Honors
Prerequisite: 90% in Spanish I and departmental approval • 1 credit
Spanish II Honors emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. Spanish II Honors continues developing the skills of
listening, speaking, reading and writing as students participate in simple conversational situations by combining learned
elements of the language orally and in writing. They compose sentences that narrate, describe, compare and summarize
familiar topics from Spanish culture. They also use the language to communicate basic survival needs and interact on
everyday issues inside and outside the classroom setting. Students expand their understanding of the similarities and
differences between their own culture and language and those of Spanish-speaking countries. The class is conducted
predominantly in Spanish and will explore content at a deeper level.

Spanish III
Prerequisite: Spanish II • 1 credit
Spanish III emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. Spanish III builds upon the foundation of listening,
speaking, reading and writing skills begun in levels I and II. Students respond to and maintain face-to-face communication
in Spanish. They identify main ideas and significant details in discussion, presentations and written texts and interpret
authentic materials. At the conclusion of the course they are able to present a simple plan of salvation in writing. The class is
conducted predominantly in Spanish.

Spanish III Honors
Prerequisite: 90% in Spanish II or 83% in Spanish II Honors and departmental approval • 1 credit
Spanish III Honors emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. Students respond to and maintain face-to-face
communication in Spanish and are assessed at the intermediate level. They identify main ideas and significant details in
discussion, presentations and written texts. The class is conducted in Spanish. Student progress is monitored using ACTFL
National Proficiency guidelines for intermediate learners.

Spanish IV Honors
Prerequisite: 90% in Spanish III or 83% in Spanish III Honors and departmental approval • 1 credit
Spanish IV Honors emphasizes the integration of the five National World Language Standards — communication, cultures,
connections, comparisons and communities — from a biblical perspective. Spanish IV Honors focuses on enabling students to
communicate in writing and in extended conversations on a variety of topics. Students use complex grammatical structures
as they narrate, discuss and support ideas and concepts with concrete facts. At the conclusion of the course, students are
required to give their testimony in writing in Spanish using biblical references. Students may take the SAT II written
component and will participate in the National Spanish Exam. The class is conducted in Spanish.

Advanced Placement Spanish Language and Culture
Prerequisite: 83% in Spanish IV Honors and departmental approval • 1 credit
Advanced Placement Spanish Language and Culture explores the six AP curriculum themes: families and communities,
science and technology, beauty and aesthetics, global challenges, contemporary life and personal and public Identities.
Through analysis and communication of these themes, students attain advanced levels of ability in listening, speaking,
reading, writing and cultural competence. Students are graded according to the AP scale, in conjunction with the ACTFL
performance standards for intermediate high/advanced low learners. The class is conducted exclusively in Spanish.




 31
```

===== PAGE 33 =====

```text
Advanced Placement Spanish Literature
Prerequisite: 83% in Spanish IV Honors, 83% in Advanced Placement Spanish Language and Culture departmental
approval • 1 credit
Advanced Placement Spanish Literature is a survey course of Peninsular and Latin American literature. The course focuses on
critical reading and writing in Spanish. Students will become familiar with major literary movements and the philosophies
behind them, as well as the major authors who exemplify each. They will study how language is connected to and shaped
by the history, cultural practices and values of those who speak it, as reflected in the literature of Hispanic peoples. As a
part of the course, students are expected to acquire the terminology of literary analysis in Spanish, discuss and criticize
literature in writing, and refine general skills in speaking and writing Spanish. The class is conducted as an independent
study course.




 32
```

===== PAGE 34 =====

```text
Biblical Studies
 __________________________________________________________________________




Old Testament Survey
Freshman requirement • 1 credit
Old Testament Survey covers the historical flow of the Old Testament. The aim is to acquaint each student with the
background, content and message throughout the Old Testament, and also to study the unity of all the books in the progress
of revelation and redemption. At the completion of this course, students will be able to list basic facts regarding the
historical background, theme and content, understand creation theories, describe Israel’s geography and the location of
important historical sites and apply the Old Testament’s message to our modern cultural context.

New Testament Survey
Sophomore requirement • 1 credit
New Testament Survey is an overview of the books of the New Testament. Students will learn about the validity of the
Scriptures, the geography of Bible lands, the life of Messiah Jesus, the actions of Jesus’ first disciples and lessons found in
the letters. Some questions discussed include: Who is God? What does it mean to be a disciple of Jesus? What is real love?
What is eternal life? What is the best way to live? What does it mean to have a biblical worldview?

Christian Theology
Junior requirement • .5 credit
Christian Theology seeks to answer the question, “What is a Christian?” Students will learn to answer this question as we
survey the essential doctrines of the Christian faith. They will acquire the ability to properly articulate biblical doctrines
including the doctrines of God, scripture, angels, humanity, sin, atonement, the Trinity, incarnation, salvation, end times and
the afterlife. The course uses both systematic and historical theology. Students will learn about church history from the New
Testament period through the Reformation. Throughout the course, special attention is given to train students to define,
defend, apply and share the historic Christian faith.



 33
```

===== PAGE 35 =====

```text
World Religions
Junior requirement • .5 credit
This course trains and equips students to analyze and evaluate the truth claims of other faith systems using both Scripture
and reason. They will learn the origin, historical development and basic doctrines of other religions as well as how to
interact with people from these faiths and to share Christ with them intelligently, lovingly and with respect. The course is a
critical examination of ancient religions, Eastern Religions (including Hinduism and Buddhism), Judaism and Islam. Students
will also learn to identify a cult as we survey Mormonism and Jehovah’s Witnesses.

Apologetics and Cultural Engagement
Senior requirement • 1 credit
This course is designed to equip students to articulate and live out their Christian faith effectively in the modern world. The
first semester focuses on apologetics, exploring the biblical foundations and reasons behind Christian beliefs, to strengthen
the faith of the Christian and to equip them to articulate their faith to others. The second semester transitions to exploring
biblical and theological foundations for cultural engagement, examining how Christians are called to be a faithful witness
and impact the surrounding culture. The overall goal is to equip Christians to live their faith authentically, embodying a
faithful witness by rooting their actions in the love and truth of Christ in a world that needs the gospel.




 34
```

===== PAGE 36 =====

```text
Technology and Innovation Electives
 __________________________________________________________________________


 In addition to our science and math courses, we have the following science, technology
 and engineering elective courses that make up our Technology and Innovation program.

Computer Science I - (Next offered in 2026-27)
Prerequisite: None; open to grades 9-12 • .5 credit
The course introduces students to the foundational concepts of computer science and challenges them to explore how
computing and technology can impact the world. Students will gain knowledge in digital representations of data and
programming and app design using Swift. This course will alternate with Digital Design and Animation II and be offered
every other year.

Computer Science II Honors
Prerequisite: Computer Science I and/or department chair approval; open to grades 9-12 • .5 credit
Computer Science II Honors is designed to teach high school and higher education students how to be an app developer,
capable of turning their own ideas into useful and exciting apps. The course starts by introducing students to iOS
development tools, basic programming concepts and industry best practices. Building on this foundation, students will follow
a step-by-step curriculum, working through practical exercises, creating apps from scratch and building the mindset of an
app developer. Throughout the course students will have the chance to design, prototype and test an app all of their own.
They’ll connect and apply the coding skills they’re learning to bring their app idea to life. Students must have a teacher
recommendation to take this course.

Advanced Placement Computer Science
Prerequisite: Completion of or concurrent enrollment in Pre-Calculus Honors and/or departmental approval • 1 credit
Advanced Placement Computer Science introduces students to computer science through programming. Fundamental topics
in this course include the design of solutions to problems, the use of data structures to organize large sets of data, the
development and implementation of algorithms to process data and discover new information and the analysis of potential
solutions. The course emphasizes object-oriented programming and design using the Java programming language.

Architectural Design - (Next offered in 2027-28)
Prerequisite: None; open to grades 9-12 • .5 credit
This one-semester course introduces students to the fundamentals of Google Sketchup and AutoCAD software commonly
used in the architectural or engineering industries. Students will become familiar with these programs, drawing techniques
and design. This course focuses on residential architecture. This course will alternate with Engineering II and be offered
every other year.

Data Analysis
Prerequisite: None; open to grades 9-12 • .5 credit
Students will use Google Sheets, Microsoft Excel and Numbers to solve real-world problems including those arising in fields
such as finance, business, science, engineering and politics. Meanwhile, they will learn about the underlying mathematical
concepts of statistics, combinatorics, binary logic and graph theory. This course requires no background in programming.




 35
```

===== PAGE 37 =====

```text
Digital Design & Animation I
Prerequisite: None; open to grades 9-12 • .5 credit
In this course, students will dive into the creative worlds of Adobe Photoshop and Animate to learn basic to intermediate
graphic media and animation principles. This hands-on course will provide students with a project-based experience that
encourages creativity and critical thinking skills. This course will count towards the fine arts requirement for graduation.

Digital Design & Animation II Honors - (Next offered in 2027-28)
Prerequisite: 90% in Digital Design & Animation I • .5 credit
In this course, students will build on prior knowledge from Digital Design and Animation I to develop new skills in Adobe
Photoshop and Animate. Students will use this knowledge to write, illustrate and animate a children's book in a final project
to share with lower school class as students share their design work to inspire future learners. This course will alternate with
Computer Science Honors and be offered every other year.

Engineering I
Prerequisite: None; open to grades 9-12 • .5 credit
Engineering I is a hands-on, project-based course where students apply the engineering design process to solve problems.
Students will apply math, science and engineering standards to bring their designs through the stages of product
development. They will use 3D modeling software, a digital engineering notebook and 3D printers to work on both
individual and collaborative projects.

Engineering II Honors - (Next offered in 2026-27)
Prerequisite: Engineering I and/or departmental approval • .5 credit
Engineering II Honors delves deeply into the engineering design process, pushing students beyond traditional
problem-solving to tackle complex, real-world challenges. Building upon foundational STEM principles, students will
engage in rigorous, inquiry-based learning, collaborating closely to innovate and create cutting-edge solutions. Topics of
engineering include mechanisms, strength of materials and structures, automation and kinematics. This course will alternate
with Architecture and be offered every other year.

iKNIGHTS
Prerequisite: Departmental Approval • .5 credit
The iKnights Tech Force is a student-run help desk support program. The goal of iKnights Tech Force is to expand our
school’s technology integration and proficiency. Students will take a leadership role in developing the technology support
structures and resources for both students and teachers. This will be accomplished through basic tech troubleshooting,
assisting teachers and students with tech integration, creating support for foundational apps, and providing tech news and
updates.

Robotics
Prerequisite: None; open to grades 9-12 • .5 credit
In the first semester of robotics, students will develop familiarity with important fundamentals of robotics: circuit and signal
design, microcontroller programming, sensors, output devices and autonomous operation. Throughout the semester, students
will complete hands-on projects with the Boe-Bot and with VEX v5 equipment, culminating in a fully autonomous robot that
is able to navigate based on color, objects and shapes.




 36
```

===== PAGE 38 =====

```text
Fine Arts - Digital Art
 _____________________________________________________________________________



Digital Sound Design
Prerequisite: None; open to grades 9-12 • .5 credit
Digital Sound Design provides students interested in the production side of the Fine Arts the opportunity to learn about
recording and editing audio and video. Digital Sound Design uses project-based learning to explore and master live event
equipment needs, recording and mixing audio with Logic Pro X software and creating videos using Premiere Pro software.
This course can satisfy the fine arts requirement for graduation.

Digital Design & Animation I
Prerequisite: None; open to grades 9-12 • .5 credit
In this course, students will dive into the creative worlds of Adobe Photoshop and Animate to learn basic to intermediate
graphic media and animation principles. This hands-on course will provide students with a project-based experience that
encourages creativity and critical thinking skills. This course can satisfy the fine arts requirement for graduation.

Digital Design & Animation II Honors - (Next offered in 2027-28)
Prerequisite: Digital Design & Animation I • .5 credit
In this course, students will apply concepts of web design and augmented reality using Adobe Dreamweaver and Aero.
Students will use prior knowledge from Digital Design & Animation I to create a themed website, immersive augmented
reality scenes and a digital portfolio of work. This course can satisfy the fine arts requirement for graduation. This course
will alternate with Computer Science and be offered every other year.

Digital Music I
Prerequisite: None; open to grades 9-12 • .5 credit
This technology-focused arts course is a place where students can imagine, rehearse and bring their own beats and music to
life in a variety of styles using GarageBand. Students will use loops, MIDI keyboards and music theory concepts to develop
recording, editing and mixing skills. Students will also develop an understanding of technology’s role in today’s music
industry and how it can be used to further enhance each student’s musical interests and skills. This course can satisfy the fine
arts requirement for graduation.

Digital Music II Honors
Prerequisite: Digital Music 1 and departmental approval • .5 credit
Digital Music II Honors builds on the fundamentals of song recording, mixing, arranging and composition learned in Digital
Music I. Using Logic Pro X software, students will build skills in app navigation, virtual instruments, MIDI, workflow and
editing. Fundamentals of music theory will be introduced to add depth to composition and arranging skills. This class will
help bring students’ musical ideas to life as they continue to create their own music beyond the classroom.




 37
```

===== PAGE 39 =====

```text
Digital Photography
Prerequisite: none; open to grades 9-12 • .5 credits
Digital Photography introduces students to the fundamentals of digital photography including camera operation, exposure
techniques and concepts of effective visual composition. Projects will emphasize the development of an awareness of our
visual environment. Various subjects will be photographed in creative and innovative ways to help students go beyond the
“point and shoot” level of digital photography. Students must supply their own digital SLR camera, standard lens, SD card
and camera case. This course can satisfy the fine arts requirement for graduation.

Introduction to Film Production
Prerequisite: None; open to grades 9-12 • .5 credit
In this semester course, students will learn the basics of how to write, plan, shoot and edit various video content. This
hands-on course will explain how to shoot news anchors, interviews, music videos and short films. Students will become
proficient in basic camera handling, scriptwriting using Celtx® software and editing on Adobe Premiere®. This course can
satisfy the fine arts requirement for graduation.

Film Studies
Prerequisite: None; open to grades 9-12 • .5 credit
The purpose of this course is to educate students on the making, history and language of films. In addition to learning about
roles in filmmaking, students will learn to look beyond the story and see how film uses its images appropriately to create
desired effects within audiences. Throughout the semester, students will watch and write about several films that have
importance in the history of movies. Students will also see how films are used to communicate a director and writer’s
worldview. This course can satisfy the fine arts requirement for graduation.

Broadcasting Honors (Knights Knews)
Prerequisite: Successful completion of Intro to Film Production and departmental approval • 1 credit
Broadcasting educates students on the power and potential of various mass communication strategies. The Knights Knews
team creates a magazine that airs weekly to all upper school students and is posted on YouTube on the Knights Knews
channel. In addition to the news magazine, students will also learn how to create a broadcasting personality, which they will
utilize throughout the school year. Students will be required to learn editing on Adobe Premiere® and create news stories in
words and pictures on Celtx®. An application and video submission are required as part of the audition to be on the
Knights Knews team. This course can satisfy the fine arts requirement for graduation.




 38
```

===== PAGE 40 =====

```text
Fine Arts - Music
 __________________________________________________________________________



Chamber Ensemble Honors (Zero Hour)
Prerequisite: Departmental approval • .5 credit
Chamber Ensemble Honors is a year-long performance-based class for string, woodwind and brass players that enables
students to develop their instrumental performance technique and musicianship as a service to the school and as a ministry
for God’s glory. This ensemble performs grade-level appropriate chamber music repertoire from all eras of music history.
Daily coursework focuses on developing fundamentals of classical performance technique with a focus on independent
musicianship, musical leadership and musicality. This course is a zero hour full year class that meets twice a week at 7 a.m.
Performance and rehearsals outside of school hours will be required. Students must be in good standing in the Wind
Ensemble or Orchestra to participate in Chamber Ensemble. This course can satisfy the fine arts requirement for graduation.

Jazz Band Honors (Zero Hour)
Prerequisite: Audition required • .5 credit
Jazz Band Honors is a year-long performance-based class that enables students to develop their instrumental performance
technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level
appropriate jazz repertoire including swing, Latin, rock and funk and daily coursework focuses on developing fundamentals
of jazz performance technique with a focus on rhythm, style and improvisation. This course is a zero hour full year class that
meets twice a week at 7 a.m. Performance and rehearsals outside of school hours will be required. Students must be in
good standing in the Wind Ensemble or Orchestra to audition for and enroll in Jazz Band with the exception of those who
play a rhythm section instrument (keyboard, bass, guitar or drumset). This course can satisfy the fine arts requirement for
graduation.

Orchestra Honors
Prerequisite: Departmental approval/instrument proficiency • 1 credit
Orchestra Honors is a performance-based class that enables students to develop their instrumental performance technique
and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level
appropriate repertoire for concerts, chapels and special events both at school and in the community. Daily coursework
focuses on developing the fundamentals of performance technique and ensemble playing such as tone, intonation, balance,
rhythm and musicality. Elements of music theory and music history are also taught in this class as they relate to the literature
being performed. Students wishing to enroll in Honors Orchestra must demonstrate grade-appropriate mastery of
fundamental techniques on their instrument as well as grade-appropriate music reading skills. Performances and rehearsals
outside of the regular class time are occasionally required. This course can satisfy the fine arts requirement for graduation.

Choir Honors (Zero Hour)
Prerequisite: Audition required • .5 credit
Choir Honors is a performance-based class for experienced singers that enables students to develop their vocal
performance technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble
performs grade-level appropriate repertoire for concerts, chapels and special events both at school and in the community.
Daily coursework focuses on developing the fundamentals of performance technique and ensemble singing such as tone,
intonation, balance, rhythm and musicality. Students wishing to enroll in Honors Choir must demonstrate grade-appropriate
mastery of fundamental vocal technique and music literacy skills. This course is a zero hour full year class that meets twice a
week at 7 a.m. Performances and rehearsals outside of the regular class time are occasionally required. This course can
satisfy the fine arts requirement for graduation.
 39
```

===== PAGE 41 =====

```text
Choir
Prerequisite: None; open to grades 9-12 • .5 credit
Choir is a performance-based class open to any student who desires to develop their vocal performance technique and
musicianship as a service to the school and as a ministry for God’s glory. Daily coursework focuses on developing the
fundamentals of music literacy, vocal performance technique and ensemble singing. Performances and rehearsals outside of
the regular class time are occasionally required. This course can satisfy the fine arts requirement for graduation.

Introduction to Guitar
Prerequisite: None; open to grades 9-12 • .5 credit
This class is designed for beginners on the guitar or players who would like to fill in the gaps in their basic overall
knowledge of the instrument. This course will cover simple chords, strumming, basics of finger-style technique, standard music
notation and concepts in music theory that can be used to read and write music. Music played in this class will be drawn
from classical, contemporary Christian, American popular and folk styles. Students are responsible for providing a quality
acoustic guitar (with cae), an electronic tuner and guitar picks. Note: Electric only guitars are not conducive to this class. This
course can satisfy the fine arts requirement for graduation.

Vocal Workshop
Prerequisite: None; open to grades 9-12 • .5 credit
Vocal Workshop is the place where students discover more about their singing voice by exploring a variety of singing
styles such as pop, jazz, folk, musical theatre and art song. Emphasis is placed on healthy singing technique and vocal
pedagogy. Students receive training in private voice lessons, group master classes and class performance. This course can
satisfy either the fine arts or the speech requirement for graduation.

Wind Ensemble Honors
Prerequisite: Departmental approval/instrument proficiency • 1 credit
Wind Ensemble Honors is a performance-based class that enables students to develop their instrumental performance
technique and musicianship as a service to the school and as a ministry for God’s glory. This ensemble performs grade-level
appropriate repertoire for concerts, chapels and special events both at school and in the community. Daily coursework
focuses on developing the fundamentals of performance technique and ensemble playing such as tone, intonation, balance,
rhythm and musicality. Elements of music theory and music history are also taught in this class as they relate to the literature
being performed. Students wishing to enroll in Honors Wind Ensemble must demonstrate grade-appropriate mastery of
fundamental technique on their instrument as well as grade-appropriate music reading skills. Performances and rehearsals
outside of the regular class time are occasionally required. This course can satisfy the fine arts requirement for graduation.

UKnight Worship Honors (Zero Hour)
Prerequisite: Audition required • .5 credit
UKnight Worship serves the school community by leading worship in chapels and for special events. Participation in this
course develops musicianship, expands student knowledge of worship songs and develops an understanding of how to
minister and lead through music in a worship setting. UKnight Worship has a musician track and a production track. Vocalists
and instrumentalists (acoustic/electric guitar, electric bass, keyboard, drumset) need to have experience reading lead sheets
and chord charts. Production students must display some working knowledge of audio, video and lighting technology. An
application and audition (musicians) or interview (production track) are required as part of the audition to enroll in this
course. This course can satisfy the fine arts requirement for graduation.




 40
```

===== PAGE 42 =====

```text
Fine Arts - Theatre
 __________________________________________________________________________



Acting Studio (ACT I) Honors
Prerequisite: Audition Required • 1 credit
ACT I is an honors-level acting team comprised of students who have a passion for acting and a strong work ethic. Entrance
into the class is through an audition in the spring. The ideal candidate is someone who has successfully completed ACT 2 or
who has substantial theatrical experience prior to the audition process. ACT 1 has an acting track and a production track.
Students in the acting track will be cast in the first semester one act competition piece. Students in the production track will
support scenic, lighting, and audio design and stage manage the first semester one act competition piece. During the year,
students have the opportunity to perform in a variety of venues and competitions. When not preparing for performances or
competitions, the students work on advanced technique. This course can satisfy either the fine arts or speech requirement for
graduation.

Technical Theatre
Prerequisite: None; open to grades 9-12 • .5 credit
This course is designed to give the student a working knowledge of the technical aspects of theatre. Units of study include
scenic design, set construction, set dressing, property design and construction, lighting design, audio engineering, costume
and make-up design, stage management and dramaturgy. Although the course is primarily hands on, research and written
assignments are also folded into the course.

Dance
Prerequisite: None, Open to grades 9-12 • .5 credit
Dance is a semester elective course designed to allow students to learn about a variety of dance genres from around the
world and will provide opportunities for students to practice various dance skills and techniques. This class can satisfy a
Physical Education credit or a Fine Arts Credit and is open to all students and abilities. Students may take this class multiple
times, but only a total of one credit (two semesters) may be applied toward graduation requirements. This class will be
evaluated with a pass/fail grade only.




 41
```

===== PAGE 43 =====

```text
Fine Arts - Visual Art
 __________________________________________________________________________


Art I
Prerequisite: None; open to grades 9-12 • .5 credit
Art I is a basic introduction to visual art concepts and art-making techniques. Students will use various art mediums and
methods to create drawings, paintings, graphic designs and ceramic pieces. Projects will be based on an understanding and
use of the basic “elements of art” and “principles of design.” Developing the ability to see artistically and to solve visual
problems creatively will also be emphasized. This course can satisfy the fine arts requirement for graduation.

Art II
Prerequisite: Art I and/or departmental approval • 1 credit
Art II is for students who have had some art experience and who wish to further develop their art making practice. This
year-long class focuses on the creative development of students’ artistic skills as well as understanding of process and
contextual art history. Projects explore a range of techniques, materials and subject matters and include two and
three-dimensional creations. This course can satisfy the fine arts requirement for graduation.

Art III Honors
Prerequisite: Art II and/or departmental approval • 1 credit
Art III Honors is a year-long advanced-level studio art class that is a precursor to AP Studio Art. Students will further
develop their artistic skills and knowledge through drawing, painting, collage, 3D, printmaking and digital artwork
integration. They will further refine traditional skills while exploring experimental mediums and developing a portfolio of
quality artwork. There is a higher caliber and complexity of work required in Honors Studio Art as artists begin to discover
their personal artistic style and voice. This course can satisfy the fine arts requirement for graduation.

Advanced Placement Art and Design
Prerequisite: Art III Honors and/or departmental approval • 1 credit
The Advanced Placement Art and Design program is for eligible juniors and seniors who are highly motivated and
committed to creating college-level work in one of three areas of focus: 2D art and design, 3D art & design or drawing.
This course requires students to create and submit a portfolio of 2D art, 3D art or drawings according to specific AP
guidelines along with sophisticated written documentation of the inquiry-based exploration process. Classwork and
homework are almost entirely student-driven as students work independently on a theme of their choice with regular faculty
coaching as well as self, peer and teacher assessments. Work for this course begins in the summer so that students have time
to create and submit a completed portfolio to the College Board for an AP evaluation and score. This course can satisfy the
fine arts requirement for graduation.

Advanced Placement Art History
Prerequisite: none; open to grades 10-12 • 1 credit
Advanced Placement Art History explores the history of art across the globe from prehistory to the present, examining the
relationship of art to various cultures and time periods. Students utilize technology to travel through time and analyze works
of art through observation, discussion, reading and research. Nightly readings, classroom dialogue and regular assessments
prepare students for success on the AP Art History exam while enriching their lives to be cultured global citizens with
informed, robust, Christ-centered perspectives. This course can satisfy the fine arts requirement for graduation.



 42
```

===== PAGE 44 =====

```text
3D Art and Design
Prerequisite: MS Art 8, US Art I or departmental approval; open to grades 9-12 • .5 credit
3D Art and Design is a project-based class that introduces students to 3-dimensional design principles. Students will work
hands-on to create 3-dimensional forms using a variety of techniques and materials including but not limited to clay, plaster,
wire, metal, wood, cardboard, textiles, architectural models, fashion design and found objects. In addition to developing
technique, style, and point of view, students will explore historical, aesthetic and cultural aspects of 3-dimensional artwork.
This course can satisfy the fine arts requirement for graduation.

Oil Painting
Prerequisite: MS Art 8, US Art I or departmental approval; open to grades 10-12 • .5 credit
Students in Oil Painting will work collaboratively to produce large, complex works of art for real-life patrons. Modeled
after the apprentice process, students will work under the guidance of visual art faculty to design and create master works
that meet the needs of their clients and gain valuable insight into the ministry, business and entrepreneurial applications of
art in the real world. A strong command of design principles, work ethic, foundational painting skills and spiritual and
emotional maturity are recommended for students in this class. Teacher recommendation by a visual art faculty member is
required. This course can satisfy the fine arts requirement for graduation.




 43
```

===== PAGE 45 =====

```text
Personal Development
 __________________________________________________________________________



Business I
Prerequisite: Algebra I; scheduling priority given to students in grades 10-12 • .5 credit
Introduction to Business provides a foundation for business education by exploring issues and principles of finance,
marketing, entrepreneurship, communications, management, economics, leadership and human resources. Students also study
profiles of business leaders, challenges in the business world and real-life business scenarios.

Business II
Prerequisite: Complete Intro to Business; open to grades 11-12 • .5 credit
This course is a second level class that goes deeper into the business fundamentals of finance, accounting, marketing,
management and human resources. Additionally, students will learn about the basics of personal finance that will help
prepare them for college and beyond.

Cross Cultural Communication
Prerequisite: None; open to grades 9-12 • .5 credit
The Cross-Cultural Communication course provides students with a general overview of the communication process and
strategies to become a more aware and effective communicator. This course also helps students grasp a working knowledge
of culture and will cover topics that include the key distinguishing features of culture, individualistic and collectivistic cultures,
identifying one’s own culture, relating to other cultures, the roles of language and non-verbal communication and asking
helpful questions. With a general understanding of communication and culture in place, students will then be able to
examine the impact of effective communication on our global community with the goal of meaningful engagement with
others and a path toward increased relational wisdom in service to His kingdom.

Introduction to Public Speaking
Prerequisite: None; open to grades 9-12 • .5 credit
Introduction to Public Speaking equips students in grades 9-12 with practical techniques to control the fear and
anxiety of speaking in public by focusing on body language and voice elements. Students will learn how to
design purpose-specific speeches, how to make strong visual presentations and how to engage different types of
audiences. They'll use laptops to record and self-evaluate presentations (audio-only, visual-only, script-only),
complemented by teacher and peer feedback. This class increases self-confidence and control; creates situational
awareness and audience-focused presentations. This course will fulfill the speech requirement for graduation.

Sports Sponsorship and NIL
Prerequisite: None; open to grades 10-12 • .5 credit
In this course, students will explore sponsorship in sport, including formulating creative solutions to achieve brand objectives
at the team, venue, event and amateur athlete levels. Students will gain a historical perspective of important developments
in athletics sponsorship, including an introduction to the rules and laws surrounding name, image and likeness (NIL). We will
also explore current trends in sponsorship and NIL, the monetization of brands and the impact that these sponsorships have
on athletic departments, partner brands and individual athletes.




 44
```

===== PAGE 46 =====

```text
Junior Seminar
Graduation Requirement - Required for all juniors • .5 credit
Junior Seminar is a fundamental aspect of our college prep program. In this discussion-based class, students consider the
importance of finding a college that will be a good fit and the skills necessary to succeed at that college. These skills
include wise money management and budgeting, effective time management and healthy friendship and dating
relationships. Special attention is paid to teaching students to navigate the college years while continuing to grow
spiritually. Students finish this class with instruction in the basics of college admission and complete an application essay and
activities resume in preparation for submitting admission applications in their senior year. This class is required for all
juniors.

Logic and Debate
Prerequisite: None, Open to grades 10-12 • .5 credit
The course trains students how to organize their thoughts correctly and articulate their ideas intelligently. Students will learn
the science of forming an argument and the art of communicating it with precision and respect. This course will cover the
basics of truth, logic and argumentation which will equip students to recognize the philosophical assumptions and
underpinnings of an argument in order to judge its validity. Students will learn to identify formal and informal logical
fallacies and how to construct sound syllogisms. There will be ample class time dedicated to in-class debates. All students
will have the opportunity to express their skills through debate topics of their choice. This course will fulfill the speech
requirement for graduation.

Personal Finance and Biblical Stewardship
Prerequisite: None, Open to grades 9-12 • .5 credit 
Personal Finance and Biblical Stewardship is a semester elective course designed to help students develop strategies for
effectively managing their money as they prepare for life. The focus of this course will be on biblical principles of
stewardship that will make a lasting difference in the lives of our students. Students will learn about the impact of individual
choices on occupational goals and real-world financial issues. Students will also learn to apply decision-making skills to
evaluate career opportunities and set personal goals. The course content is designed to help the learner make wise
spending, saving, credit and debt decisions and to make effective use of income to achieve personal financial success.

Senior Study Hall
Prerequisite: Available to grade 12 • No credit awarded
This study hall is scheduled during the first or fourth period, allowing seniors the privilege to be off-campus during this time.
There is no instruction during this time; therefore, no grade is awarded nor do they receive credit.

Study Hall
Prerequisite: None • No credit awarded
This is a period in the school day when students are not scheduled for an academic class. Study hall is a quiet structured
work environment monitored by a teacher. There is no instruction during this time; therefore, no grade is awarded. Students
do not receive credit for study hall.

Winterim
Prerequisite: Required for all students • .25 credit
Winterim occurs for one week in the second semester and makes it possible to offer nontraditional enrichment courses as
well as a variety of educational and mission/service trips. Courses include: three and/or six-hour enrichment classes,
mission/service/spiritual life trips and career shadowing (juniors and seniors only.) The purpose of Winterim is to allow
students to explore interests not normally covered in the classroom and to develop relationships with teachers in a different
setting.


 45
```

===== PAGE 47 =====

```text
Physical Education and Health
 __________________________________________________________________________



Lifetime Fitness
Graduation requirement, must complete in grade 9 • .5 credit
This course will focus on educating students as to the importance of lifetime physical wellness through aerobic exercise,
movement training, nutrition, mental health and strength training. Emphasis will be placed on the assessment and
maintenance of physical fitness to improve health and performance. Additional emphasis will be placed upon the
application of psychological and sociological concepts, including self-responsibility, positive social interaction and group
dynamics in the learning and performance of physical activity. Units of activity will include physical fitness as well as
traditional aerobic sports and games.

Athletic Conditioning
Prerequisite: Completion of Lifetime Fitness • .5 credit
Athletic Conditioning involves basic exercise for major muscle groups and routines appropriate for developing muscular
strength and endurance. The class is open to males and females. Students may take this class multiple times, but only a total
of one credit (two semesters) may be applied toward graduation requirements. This class will be evaluated with a pass/fail
grade only.
 
Dance
Prerequisite: None, Open to grades 9-12 • .5 credit
Dance is a semester elective course designed to allow students to learn about a variety of dance genres from around the
world and will provide opportunities for students to practice various dance skills and techniques. This class can count toward
a physical education credit or a fine arts credit and is open to all students and abilities. Students may take this class
multiple times, but only a total of one credit (two semesters) may be applied toward graduation requirements. This class will
be evaluated with a pass/fail grade only.

Refereeing: Basketball I - Male
Prerequisite: None, Open to grades 9-12 • .5 credit
This fall semester course introduces students to the basics of basketball officiating through both classroom and on-court
instruction. Students will develop introductory knowledge of NFHS basketball rules, game management skills, conflict
navigation and officiating mechanics for 2-person crews. This class prepares students to pursue certification upon
completion. This class may be applied towards graduation requirements.

Refereeing: Basketball I - Female
Prerequisite: None, Open to grades 9-12 • .5 credit
This fall semester course introduces students to the basics of basketball officiating through both classroom and on-court
instruction. Students will develop introductory knowledge of NFHS basketball rules, game management skills, conflict
navigation and officiating mechanics for 2-person crews. This class prepares students to pursue certification upon
completion. This class may be applied towards graduation requirements.




 46
```

===== PAGE 48 =====

```text
Refereeing: Basketball II - (Next offered in 2027-28)
Prerequisite: Refereeing: Basketball I and instructor approval, Open to grades 9-12 • .5 credit
This spring semester course introduces students to the basics of basketball officiating through both classroom and on-court
instruction. Students will develop thorough knowledge of NFHS basketball rules, game management skills, conflict navigation
and officiating mechanics for 3-person crews. This class prepares students to pursue certification upon completion. This class
may be applied towards graduation requirements. This course will be offered every other year.




 47
```

===== PAGE 49 =====

```text
Journalism and Media Studies
 __________________________________________________________________________



Broadcasting Honors (Knights Knews)
Prerequisite: Successful completion of Intro to Film Production or Film Studies and departmental approval. •
1 credit
Broadcasting educates students on the power and potential of various mass communication strategies. The Knights Knews
team creates a magazine that airs weekly to all upper school students and is posted on YouTube on the Knights Knews
channel. In addition to the news magazine, students will also learn how to create a broadcasting personality, which they will
utilize throughout the school year. Students will be required to learn editing on Final Cut® and create news stories in words
and pictures on Celtx®. An application and video submission is a required part of the audition to be on the Knights Knews
team.

Yearbook/Yearbook Honors
Prerequisite: Open to 10-12 grade; application required • 1 credit
Yearbook teaches the art of producing a JK-12 yearbook. The ability to write well and some experience in photography,
design and layout are useful for this class. Because of the many deadline pressures involved, students must be organized
and responsible. Juniors and seniors who have at least one year of experience with serving on the yearbook team may
earn an honors credit their second and/or third year in the class. This course can satisfy the fine arts requirement for
graduation.

Creative Writing
Prerequisite: None; open to grades 9-12 • .5 credit
Creative Writing is a semester-long course designed for both beginners and established writers. Focusing on genres such as
poetry, short story, humor and satire, personal essays and memoirs and creative nonfiction, students will discover and
develop the habits and skills writers use from the origination of ideas to the publication of their work. In a workshop setting,
students will write, revise and review their own work and collaborate to review the work of their classmates. Additionally,
when opportunities arise, students will participate in local writing and literary conferences, festivals and competitions.
Whether a student desires to pursue professional goals or simply improve their own skills, they will have the opportunity to
discover their writing voice and become confident and competent writers. Through all of this, students will gain a greater
understanding of themselves and their place as creative beings in God’s universe.




 48
```

