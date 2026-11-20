# Providence Day Course Offerings: 2025-26 → 2026-27 census (plan `consistency`, 2026-11-20)

This is the worklist for re-sourcing Providence Day's Middle and Upper School Course Offerings from the 2026-27
Course of Study. The user asked for it on 2026-11-20 and folded it into this plan. The source record is
`source-material/course-offerings/providence-day/Providence Day - Course Offerings - Curriculum Guide Full Descriptions 2026-2027.md`.
It holds the full text of both PDFs page by page, their SHA-256 hashes, and an index of every app row. "p.N" below means its
`===== PAGE N =====` pages: S1 is Upper School, S2 is Middle School. App paths are into `PROVIDENCE_DAY` in
`src/data/courseOfferings.ts`, as `[division].d[department].c[course]`.

## How the census was done

1. Headings were taken from both 2026-27 PDFs by font: US entries at 16pt bold, MS at 14pt bold, departments at 34pt.
2. The 2025-26 PDFs were downloaded again. Their SHA-256 hashes match the 2025-26 record (`41e608…`, `5141cb…`).
3. Each edition was split into one text block per heading, and the two editions were diffed word by word.
4. A row whose catalog text is word-identical across editions keeps its `coursecensus` (#486) verdict, which is OK.
5. Only rows whose text changed were censused again, under the `coursecensus` rules: true-but-shorter is OK.

**In scope:** 197 app rows (53 MS + 144 US). **175 OK**, 22 non-OK, plus 11 rows to add. The Lower School (16 rows)
publishes no Course of Study and is out of scope.

## 1. Counts in 2026-27

| Measure | 2026-27 | Rule / note |
|---|---|---|
| **US AP courses** | **30** | One per AP heading. 2025-26 had 28; the two added are AP Business with Personal Finance and AP German. |
| **US departments** | **11** | Computing & Innovation, Design & Entrepreneurship, English, History, Mathematics, Performing Arts, PE & Health, Science, Visual Arts, World Language, The Art and Science of Teaching. Unchanged. |
| **US course entries** | **172** | One per level. French/German/Spanish Year 1–6 count once per language (6 headings → 18 courses), which matches the school's own "World Language 38 courses" tally (S3 page). |
| US headings, unsplit | 161 listed / 160 distinct | STEM Research and Design is catalogued twice (p.22, p.50). |
| **US rows rendered** | **153** | 144 + 10 ADD − 1 REMOVE. Equivalently 172 minus bundling (F/G/S I–V 15→1, F/G/S 6 3→1, Mandarin 1–5 5→1) plus 1 for STEM shown twice. |
| **MS course entries** | **72** | One per distinct grid entry, each level separate, Study Hall excluded (73 with it). 2025-26 gives the same 72, so the old "~75" was approximate. |
| MS departments | 7 as the app groups them | The catalog has 8 subject headings; the app merges Fine Arts and PE. |
| **MS rows rendered** | **53** | Unchanged: one swap (History in Action → Psychology) plus renames. |

**US AP list (30):**
- **Computing & Innovation:** AP Computer Science A, AP Computer Science Principles.
- **Design & Entrepreneurship:** AP Business with Personal Finance.
- **English:** AP African American Studies, AP English Language and Composition, AP English Literature and Composition.
- **History:** AP World History: Modern, AP U.S. History, AP European History, AP U.S. Government and Politics, AP Human Geography, AP Microeconomics, AP Macroeconomics, AP Psychology.
- **Mathematics:** AP Calculus AB, AP Calculus BC, AP Statistics.
- **Science:** AP Biology, AP Chemistry, AP Environmental Science, AP Physics 1, AP Physics C.
- **Performing Arts:** AP Music Theory.
- **Visual Arts:** AP Art History, AP Art and Design.
- **World Language:** AP French Language, AP German, AP Spanish Language, AP Latin, AP Chinese Language and Culture.

The S3 page's department tallies also sum to 30 APs, but they split them differently: 4 under Math and no Design &
Entrepreneurship. Its per-department course counts don't match the catalog either, so **count from the catalog**.

## 2. ADD rows (insert in catalog order)

| # | Dept | Title (as printed) | Tag | Description | Page | Insert after |
|---|---|---|---|---|---|---|
| 1 | Computing & Innovation | Architecture II: Sustainable Design & LEED Fundamentals | Semester | A project-based course on green, high-performance building that prepares students to pursue the LEED Green Associate certification, ending in a Green Building Design Project; requires Architecture Design. | S1 p.17 | Architecture Design (after its MOVE) |
| 2 | Computing & Innovation | Robotics & Engineering 2 | Semester | Building on Robotics & Engineering 1, students take on 2 or 3 real-world challenges, working with community partners to research and engineer a solution. | S1 p.19 | Robotics & Engineering 1 |
| 3 | Design & Entrepreneurship | Advanced Entrepreneurship: Incubator to Accelerator | Gr 12 | The senior capstone of the Diploma in Entrepreneurial Studies, where students test a market need, build a first working version of a product and give a formal business presentation. | S1 p.22 (also p.14) | Design & Entrepreneurship |
| 4 | Design & Entrepreneurship | AP Business with Personal Finance | AP | A year-long course for juniors and seniors covering entrepreneurship, marketing, finance, accounting, and management plus personal finance, with a chance to earn college credit and an employer-endorsed credential. | S1 pp.22–23 (also p.14) | Advanced Entrepreneurship |
| 5 | Design & Entrepreneurship | AI Literacy: Understanding and Navigating Artificial Intelligence | Semester | Students learn how machine learning works, how to judge and use AI in school and work, and how AI affects society; no prior experience is needed. | S1 p.23 | AP Business with Personal Finance |
| 6 | English | Creative Writing (Advanced) | Advanced | Builds on Creative Writing with more challenging reading, more complex poetry and prose, and stricter standards for writing and peer critique. | S1 p.24 | Creative Writing |
| 7 | Mathematics | Sports Analytics and Data Science | Semester | A math and IDEAS course that uses sports data to teach data collection, Excel, data visualization, and statistics, building up to predictive modeling and regression; requires Algebra II. | S1 p.37 (also p.15) | Statistics |
| 8 | Performing Arts | Music Technology and Production | Semester | Students use music production software and recording equipment to learn multitrack recording, audio editing, and audio design; prior music experience is preferred. | S1 p.42 (also pp.7, 15) | Orchestra |
| 9 | Performing Arts | Musical Theatre | Semester | Students build the singing, acting, and dancing skills of a musical theatre performer and study the genre's history, ending in a final performance. | S1 p.42 | Theatre II |
| 10 | World Language | AP German | AP | Prepares students for the AP German Language Exam, with class held only in German and all materials from authentic sources; requires German 6 Advanced with an 87%. | S1 p.58 | AP French Language |
| 11 | MS History | "How does my brain work?": A Middle School Introduction to Psychology | Gr 7–8 | A student-driven look at how the brain shapes emotion, learning, and behavior, where small groups lead units they choose and each student ends with a research project. | S2 p.18 (grids pp.5, 8) | replaces History in Action (same slot) |

Two catalog quirks affect these rows:
- **Sports Analytics prerequisite.** The line is garbled: "Prerequisite: (Semester) Fall/Spring Term (0.5 DES credit) Algebra II". It is read as requiring Algebra II.
- **Sports Analytics title.** The p.15 DES list calls it "Sports Analytics"; use the heading.

## 3. REMOVE rows

| App path | Title | Evidence |
|---|---|---|
| `divisions[2].departments[8].courses[6]` | Theatrical Performing Arts Lab | No heading and no mention anywhere in S1 2026-27. It was on p.37 in 2025-26. |
| `divisions[1].departments[3].courses[3]` | History in Action: Collaborative Research | No mention anywhere in S2. Its grid slots (pp.5, 8) and its p.18 entry are now the Psychology course (ADD 11). |

## 4. RENAME / MOVE rows

| App path | Old title | New title | Evidence |
|---|---|---|---|
| `divisions[2].departments[4].courses[6]` | Robotics & Engineering | Robotics & Engineering 1 | S1 p.19; text unchanged, so the description is OK |
| `divisions[2].departments[0].courses[7]` | Global Literature Topics | Global Literature: Women’s Voices | S1 p.25; text rewritten (§5) |
| `divisions[2].departments[0].courses[11]` | War Literature | War Literature (Advanced) | S1 p.26; text rewritten (§5) |
| `divisions[2].departments[1].courses[17]` | Global Studies: Europe and Latin America | Global Studies: Latin America | S1 p.33, "a multi-disciplinary exploration of Latin America". Description OK; optional fuller version: "A study of Latin America’s regional trends and cultures across several subjects, ending in research-based policy recommendations." |
| `divisions[2].departments[7].courses[7]` | Understanding Art: A Global View | Understanding Art: A Contemporary Global View | S1 p.54; text otherwise identical, so the description is OK |
| `divisions[2].departments[6].courses[10]` | Latin 4 | Latin 4 (Advanced) | S1 p.59 (§5) |
| `divisions[1].departments[6].courses[8]` | Theatre Arts 6 | Theatre 6 | S2 p.3 grid, p.12 heading; text identical, description OK |
| `divisions[1].departments[6].courses[9]` | Acting 1, 2 & 3 | Acting 1, Acting 2 & One Act Production Studio | S2 p.5 grid, p.24 headings. The p.8 grid says "Acting 3: One Act Production Studio"; follow the p.24 headings. New description: "Three semester courses for Grades 7 and 8 — Intro to Acting & Improv, Training for Stage & Screen, and One Act Production Studio, which requires a theatre course or a past PDS production." |
| `divisions[2].departments[5].courses[2]` | Architecture Design | (unchanged) **MOVE to Computing & Innovation** | S1 p.17 lists it under Computing & Innovation; 2025-26 had it under Design & Entrepreneurship |

**Catalog inconsistency:** the GSD lists on pp.9–10 still use the old names ("Europe and Latin America", "Understanding Art:
A Global View", "Robotics & Engineering"). Follow the course-description heading in each case.

## 5. Changed descriptions (all MISSTATES against 2026-27)

| App path | Current says | 2026-27 says | Replacement |
|---|---|---|---|
| `[2].d[0].c[7]` Global Lit | "…around a rotating common topic such as gender or justice." | "think critically about writing by and about women" (p.25) | Students read short stories, poetry, novels, and non-fiction by and about women from Asia, the Caribbean, Africa, and Latin America, asking what issues affect women worldwide. |
| `[2].d[0].c[11]` War Lit | "read poetry, songs, plays, novels, and non-fiction…" | "how veteran authors portray the reality and humanity of war" (p.26); the genre list is gone | Students study how veteran authors portray war, from the Thirty Years’ War through Afghanistan and Iraq, then write a project on a work of war literature they choose. |
| `[2].d[1].c[1]` World History | "…events from 1000 CE to the Age of Globalization." | "events from 600 CE to the Age of Globalization" (p.28) | Fosters appreciation for cultural diversity through the geographical and thematic development of events from 600 CE to the Age of Globalization. |
| `[2].d[3].c[7]` Applied Sports Anatomy | "…completing 15 hours as student athletic trainers for PDS teams." | the 15-hour service is gone; "foot & ankle, knee, hip, shoulder, and elbow/wrist/hand" (p.48) | Students learn the anatomy of key body regions, from the foot and ankle to the shoulder and hand, plus common sports injuries, recovery, and basic treatment methods. |
| `[2].d[3].c[8]` Astronomy | "…using astrolabs and sun spots." | "use of astrolabs and sun spotters" (p.48) | The same sentence, with "sun spots" changed to "sun spotters". |
| `[2].d[3].c[9]` Bioethics/Biotech | "…while debating GMOs, transgenics, and cloning." | "transgenic organisms, genome privacy, and cloning" (p.49) | A lab and case-study course using micropipettes, PCR, DNA isolation, and gel electrophoresis while weighing the ethics of transgenic organisms, genome privacy, and cloning. |
| `[2].d[3].c[13]` Neuroscience | "…recording electrical activity from nerves, muscles, and plants." | recording labs deleted; "including two brief dissections" (p.50) | A hands-on introduction to how the nervous system works at the cellular and molecular level, with lab investigations that include two brief dissections. |
| `[2].d[3].c[18]` AP Physics 1 | "…models for systems, fields, forces, conservation, and waves." | "kinematics, dynamics, energy, momentum, rotation, oscillations, and fluids" (p.51) | Students use algebra to study introductory college physics in labs, analyzing data and building models of motion, forces, energy, momentum, rotation, oscillations, and fluids. |
| `[2].d[6].c[5]` AP French | "…persuasive essays and timed guided conversations…" | "writing argumentative essays and" (p.58); guided conversations deleted; the catalog sentence is cut off | Prepares seniors for the AP French Language and Culture exam through argumentative essays and units built on authentic sources, from Global Challenges to Beauty and Aesthetics. |
| `[2].d[6].c[9]` Latin 3 | "…prose of Livy and Pliny and the poetry of Catullus." | "prose of Caesar, Pliny, Livy, and Eutropius" (p.59) | Reviews grammar and introduces clauses, progressing to original, unadapted Latin through the prose of Caesar, Pliny, Livy, and Eutropius. |
| `[2].d[6].c[10]` Latin 4 | "…reading Latin aloud to hear meter and evaluate literary devices." | read-aloud deleted; "literary devices, meter, tone, and author purpose" (p.59) | A literature course on the poetry and mythology of Catullus, Ovid, and Vergil, weighing how well each poet uses literary devices, meter, tone, and purpose. |
| `[2].d[6].c[11]` Latin 5 (Advanced) | "…Vergil, Pliny, Catullus, Ovid, Vespucci, and Boccaccio." | Vespucci and Boccaccio deleted; "authors outside of the ancient Roman time period" (p.60) | A prose and poetry literature course with a project comparing texts on shared themes, reading Vergil, Pliny, Catullus, and Ovid alongside authors from outside the ancient Roman period. |
| `[1].d[2].c[1]` MS Science 7 | "…catastrophic events — weather, earthquakes, volcanoes — and light and optics." | "weather and climate, and the nature of light and optics" (S2 p.17) | The second part of the integrated sequence, with major units on weather and climate and on light and optics. |

**Borderline, left OK.** STEM Research and Design (`[2].d[3].c[14]`): p.50 now says "a controlled experiment" where the
app says "experiments". The p.22 copy still says "experiments". This would be an optional tweak only.

## 6. Tag changes

| App path | Title | Tag now → new | Evidence |
|---|---|---|---|
| `[2].d[5].c[1]` | Introduction to Financial Analytics | Gr 10–12 → **Semester** | "but limited to grades 10-12 only" deleted (p.21) |
| `[2].d[3].c[7]` | Applied Sports Anatomy | Semester → **Gr 10–12** | "Must be a Sophomore, Junior or Senior to enroll" (p.48) |
| `[2].d[3].c[9]` | Bioethics/Biotechnology | Semester → **Gr 10–12** | same line (p.49) |
| `[2].d[0].c[11]` | War Literature (Advanced) | Semester → **Advanced** | heading now "(Advanced)" (p.26) |
| `[2].d[6].c[10]` | Latin 4 (Advanced) | Year → **Advanced** | heading "(Advanced)", matching Latin 5 (Advanced) (p.59) |

**Changes with no tag change:**
- **AP African American Studies** is now "Senior Year" only (p.27). Its tag stays AP; the description may add "for seniors" (the Batch 3 grade-rule precedent).
- **SPARK** is now "2nd Semester" (S2 p.14); its tag "Gr 6–8" stays.
- **Year 6 F/G/S** reads "(Semester 2)" on p.56. That looks attached to the Option clause, and S2 still says "6 (Adv) Year", so leave it.
- **MS Psychology and Contemporary Global Issues** swap Fall and Spring between grid and heading; their tags are grade-based, so no change.

## 7. New teasers and source fields

**Teasers:**
- **US:** "172 catalogued courses across 11 departments — foundations through 30 AP courses and post-AP mathematics (shown here as 153 entries, with the French, German, Spanish and Mandarin level sequences grouped)."
- **MS:** "72 courses across 7 departments — where math placement paths and the five-language world-language sequence begin (shown here as 53 entries, with ensembles, art, acting, PE/Health and language levels grouped)."

**Source fields:**
- **US** (`courseOfferings.ts` ~L534–536): `source: "PDS Upper School Course of Study '26–27"`, `sourceUrl: 'https://resources.finalsite.net/images/v1788362356/provday/lefyqhx5ttu0r4ajnpha/2026-2027UpperSchoolCourseofStudy.pdf'`.
- **MS** (~L201–203): `source: "PDS Middle School Course of Study '26–27"`, `sourceUrl: 'https://resources.finalsite.net/images/v1788362944/provday/qzrb4ef3hjjfokpysrzd/2026-2027MiddleSchoolCourseofStudy.pdf'`.
- Both `/fs/resource-manager/view/…` links return a 302 to these URLs, and both return 200.

**Elsewhere that cites the 2025-26 editions:**
- **`src/data/metricValues.ts`:**
  - **Comment ~L167:** "Providence Day and Country Day publish 2025-26" → Providence Day now publishes 2026-27.
  - **`us-courses` ~L186:** `'149'` → `'172'`. Rewrite the qual (~L206–209) to: "Counted from the 2026–27 Course of Study, one entry per course level; French, German and Spanish levels count once per language, matching the school's own World Language tally of 38."
  - **`advanced-courses` ~L241:** `'28 AP'` → `'30 AP'`. Rewrite the comment and the qual (~L267) to: "30 AP courses are described in the 2026–27 catalog." The 2026-27 edition deleted the prose list of AP subjects, so the old "27 subject areas" clause has no source now.
  - **`us-departments` ~L290:** `'11'` unchanged.
- **`src/data/collegeSupportPrograms/providence-day.ts`:**
  - **~L559:** the "30" AP stat is unchanged, and now agrees with the Course of Study.
  - **~L934:** the parent ask "is AP German running this year, and when does AP Business & Personal Finance begin?" Both now appear in the 2026-27 Course of Study (p.58, p.22). Reword it to ask whether each runs this year, without "when does it begin".
- **`src/content/course-offerings/providence-day.json`:** regenerated by the ingest.
- `Providence Day - Course Offerings - Curriculum Guide.md` (the older condensation record) keeps its 2025-26 content. Its
  re-verification section already notes that edition is superseded.

## Order and overlay effects

The ADD rows go in catalog order. One REMOVE and one MOVE shift array indices inside Providence Day's Upper School
departments 4, 5, 6 and 8, and MS department 3. Every overlay unit after an insert or removal in those departments changes
its `at` path.

Phase 2 re-splices those units by stamp:
- unchanged English keeps its `t`;
- a figure-only change goes through `i18n_restamp.mjs`;
- new or rewritten text is translated in all nine locales.

The memories behind this are `metric-values-midarray-insert-shifts-paths` and `overlay-at-paths-go-stale-on-row-delete`.
