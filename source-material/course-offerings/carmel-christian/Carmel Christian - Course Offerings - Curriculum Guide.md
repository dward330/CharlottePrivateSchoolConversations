# Carmel Christian School — Course Offerings

**Provenance**

- **Compiled by:** Claude Code deep research pass, at Derrick's request (as part of
  `/implement add-carmel-christian`).
- **Date compiled:** 2026-08-16
- **Method:** Web search + direct fetch of Carmel Christian's own published HS curriculum
  pages, the 2026-2027 Graduation Requirements PDF, and the 2025-26 High School Profile
  PDF. The 2026-27 HS Curriculum Guide is a 24-page Calaméo flipbook whose full course
  *descriptions* are JS/token-gated and NOT machine-readable; the course *catalog* (titles
  by department) was recovered char-for-char from the three corroborating sources below.
- **Divisions:** High School (grades 9–12) AND Middle School (grades 6–8), both published
  as named course lists. **Lower School (K–5) is NOT** a named course list — the elementary
  academics pages describe subject *areas* only (Bible, Math, Language Arts, Science, Social
  Studies, Art, Spanish, Computer/STEM, Music, PE; the one grade-specific named item is
  "Chorus (Fifth Grade)"). An ES Calaméo guide exists but its interior did not render;
  public-facing content is subject-level, so there is nothing to transcribe as named LS
  courses.
- **MS correction (2026-08-16):** the first pass reported "HS only, LS/MS not published."
  A focused re-check found the **Middle School DOES publish named courses** (a linked
  2024-2025 MS Curriculum Guide + the on-page list below), fetched verbatim from the MS
  curriculum page. The MS division was added to `courseOfferings.ts` after this correction.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.carmelchristian.org/apps/pages/index.jsp?uREC_ID=587939&type=d&pREC_ID=1133088 | HS Curriculum landing — department list, "offers 16 Advanced Placement courses", document links |
| S2 | https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487133&type=d&pREC_ID=935891 | HS **Course Descriptions** — full course catalog by department, level tags (PW/S/H) |
| S3 | https://www.carmelchristian.org/ourpages/auto/2024/8/28/37308823/HS_Graduation_Requirements_26_27.pdf | 2026-27 Graduation Requirements + 4-year Course Offerings grid |
| S4 | https://drive.google.com/file/d/1WWkiHYPy9PVPCAMgzsNr1yV6TdsovRNE/view | 2025 HS Profile — GPA scale, weighting, AP course list, CEEB code |
| S5 | https://www.calameo.com/read/003203619b939a7cb178b | 2026-27 HS Curriculum Guide flipbook — descriptions NOT extractable (metadata only: 24 pp, published 2026-02-10) |

## Metrics

| Metric | Value | Source |
| --- | --- | --- |
| Grade range | K–12 (this area = High School 9–12) | S4 |
| Divisions with named course lists | 1 (High School only) | — |
| Upper School departments | 9 named: Bible, English, Mathematics, Science, Social Studies, World Languages, Health & Fitness, Arts, Electives (Business & Engineering as elective sub-areas; 11 if counted separately per S1) | S1, S2 |
| Upper School courses catalogued | ~78 distinct titles across all levels | S2, S3, S4 |
| AP courses | 16 ("offers 16 Advanced Placement courses", S1) — **discrepancy:** 2025-26 Profile says "15 AP courses available"; the 26-27 grid adds AP World History → 16. Use 16, flagged. | S1 vs S4 |
| Graduation credits | 27 (Class of 2027+); 26 prior | S3 |
| GPA scale | 4.0; Honors +0.5 quality point, AP +1.0 | S4 |
| Class rank | School does not rank students | S4 |
| CEEB code | 342527 | S4 |
| AP Honor Roll | Platinum distinction; May 2025 145 students took AP exams, 94% scored ≥3 | S1, S4 |

## Course catalog by department (verbatim from S2/S3/S4)

Level tags: PW = Pathways, S = Standard, H = Honors.

**Bible / Biblical Studies (4 credits):** Old Testament · New Testament · Understanding
the Faith & Culture · Understanding the Times.
*(S3's 4-year grid names these differently — Biblical Foundations · Apologetics ·
Introduction to Worldviews · Understanding the Culture — S2 and S3 disagree on Bible
titles; **TO VERIFY** which the 26-27 guide uses.)*

**English (4 credits):** Genres and Themes (PW, S, H) · American Literature (PW, S, H) ·
British Literature (PW, S, H) · World Literature (PW, S, H) · AP English Language &
Composition · AP English Literature & Composition.

**Mathematics (4 credits):** Math 1 (PW) · Math 2 (PW) · Geometry (H) · Algebra II (PW, S,
H) · Math 4 (Algebra III & Trigonometry) (PW) · Honors Precalculus · AP Precalculus ·
Probability & Statistics (S, H) · AP Calculus AB · AP Statistics.

**Science (3 or 4 credits):** Biology (S, H) · Honors Biology · Chemistry (S, H) · Honors
Chemistry · Human Anatomy & Physiology (S, H) · Conceptual Physics · Honors Physics ·
Forensics · Intro to Engineering & Robotics · Honors Engineering II · AP Biology · AP
Environmental Science.

**Social Studies (3 or 4 credits):** World History (S, H) · US Government & Economics (S,
H) · US History (S, H) · Cultural Geography · Psychology/Sociology · Personal Finance · AP
US Government & Politics · AP US History · AP Human Geography · AP Psychology · AP World
History.

**World Languages (2 credits, same language):** Spanish I · Spanish II (S, H) · Spanish III
(S, H) · Honors Spanish IV · AP Spanish (Language & Culture) · World Language (Online).

**Health & Fitness / PE (1 credit):** Health · Physical Education · Ladies Athletic
Conditioning · Team Sports · Weight Training.

**Arts / Fine Arts (1 credit):** Art I / Studio Art I · Art II / Studio Art II · Honors Art
III / Studio Art III · Honors Art IV / Studio Art IV · AP 2-D Art & Design · Symphonic Band
· IGNITE Praise Band · Choir · Theatrical Studies · Honors Acting Studio · Digital
Photography I · Digital Photography II · Media & Journalism I · Media & Journalism II ·
Yearbook.

**Business Electives:** Entrepreneurship and Marketing · Finance and Business Ethics.

**General Electives / Personal Development (3–4 credits):** Christian Leadership Practicum ·
Educational Internship · Public Speaking and Debate · Science and Faith · Personal Finance.

**AP Capstone:** AP Seminar · AP Research.

## AP courses (the 16, verbatim from S4 list + S3 grid)

AP Biology · AP Calculus AB · AP English Language & Composition · AP English Literature &
Composition · AP Environmental Science · AP Human Geography · AP Precalculus · AP
Psychology · AP Research · AP Seminar · AP Spanish Language & Culture · AP Statistics · AP
Studio Art 2-D · AP United States History · AP World History · AP US Government & Politics.
*(S4 lists 15; S1 says 16; AP US Gov appears in S2's list — **TO VERIFY** the exact 16.)*

## Graduation requirements (S3/S4, verbatim)

Total **27 credits** (Class of 2027+): Biblical Studies 4 · English 4 · Mathematics 4 ·
Science 3 or 4 · Social Studies 3 or 4 · World Language 2 (same language) · Electives 4 ·
Arts 1 · Health & PE 1 (must take a 4th credit of either Science or Social Studies). Plus:
Mission Trip and Impact Week each year, 20 service hours/year, NC state competency score.

## Weighting (S4, verbatim)

GPA on a 4.0 scale. Standard = 4/3/2/1/0; Honors (weighted) = 4.5/3.5/2.5/1/0; AP
(weighted) = 5/4/3/1/0. Grading scale A 90–100 / B 80–89 / C 70–79 / D 60–69 / F ≤59.

## Middle School catalog (grades 6–8, verbatim)

Source: **MS Curriculum page** `https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487132&type=d&pREC_ID=935888`
(linked "2024-2025 MS Curriculum Guide" Calaméo at `https://www.calameo.com/read/00320361962a97fb5020d`).
Spelling preserved exactly as published — note "Spanish 1-A" (Arabic 1) but "Spanish I-B"
(Roman I).

**Bible:** Sixth Grade · Seventh Grade · Eighth Grade (grade-level Bible; no distinct titles).

**Language Arts:** Sixth / Seventh / Eighth Grade · Honors Level Courses (6-8) · Advanced
Seminar Courses through CCS Pathways (6-8).

**Math:** Math 6 · Math 6 Honors · Math 7 · Pre-Algebra · Pre-Algebra Honors · Algebra I
Honors · Advanced Seminar Courses through CCS Pathways (6-8).

**Spanish:** Foundational Spanish (6th) · Spanish 1-A (7th) · Spanish I-B (8th).

**Science:** Earth Science (6th) · Life Science (7th) · Physical Science (8th).

**Social Studies:** World Studies I: Development of Civilizations (6th) · World Studies II:
Modern Era (7th) · North Carolina and American History (8th).

**Physical Activity Electives:** Physical Education (6-8) · Pilates (7-8).

**Arts Electives — Visual:** Art Foundations (6th) · Middle School Art (7-8) · Digital
Photography (6-8). **Music:** Carmel Christian Choir (6-8) · Middle School Band (6-8) ·
Ignite Praise Band (7-8). **Theatre:** Beginning Theatre (6th) · Theatre Arts (7-8) · Dance
Foundations (6-8) · Studio Theatre (7-8).

**Core Content Semester-Long Electives:** Life Skills (6th) · News and Media Production
(6th) · Sports Science (6th) · Problem Solvers (6-8) · Study Hall (6-8) · STEM (7-8) · Food
Traveler (7-8) · Creative Writing (7-8) · Christian Leadership (7-8) · Exploring Design
Technology (7-8).

## De-duplication rule

Where a subject appears at Standard + Honors + AP (Biology → Honors Biology → AP Biology;
Precalculus → Honors Precalculus → AP Precalculus; Spanish II → Honors Spanish II),
transcribe as **three distinct titles** — that is how the school lists them (separate named
courses at separate levels), and how a rich school like Providence Day is catalogued. Do
not collapse. The level tag is the differentiator.

## Dual enrollment

"Dual-enrollment elective offerings across various content areas." The **partner college
is NOT PUBLISHED** as a named institution (do not cite CPCC — it appears only as a faculty
credential; TO VERIFY).

## Flags

- **NOT PUBLISHED:** dual-enrollment partner college; LS/MS named course lists.
- **NOT EXTRACTABLE:** the Calaméo guide's full course *descriptions* (JS/token-gated);
  catalog titles recovered from S2/S3/S4 instead.
- **TO VERIFY:** AP count 15 vs 16; Bible course titles (S2 vs S3 disagree); whether AP US
  Government & Politics is currently offered.
