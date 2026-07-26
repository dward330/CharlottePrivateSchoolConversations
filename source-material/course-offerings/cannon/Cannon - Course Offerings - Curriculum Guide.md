# Cannon School — Course Offerings

**Provenance**

- **Compiled by:** Claude Code deep research pass, at Derrick's request
- **Date compiled:** 2026-07-26
- **Method:** Web search plus direct download and local text extraction (pypdf) of Cannon's own
  2026-27 Upper School Course Catalog and 2025-26 school profile, plus the live per-grade
  division pages. All course titles are verbatim from the catalog; all descriptions are condensed
  from the school's own catalog prose.
- **Divisions:** Lower School JrK–4 · Middle School 5–8 · Upper School 9–12
- **Extraction note:** both PDFs failed WebFetch parsing (returned as binary/compressed streams).
  They were downloaded with `curl` and extracted locally with `pypdf`. Re-verification should use
  that path, not WebFetch. pypdf inserts spurious spaces into some capitalized words ("ONL Y",
  "T opics", "W orld"); these were corrected against the catalog's own usage.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1769529893/cannonschoolorg/ihl0lzuqgs9loqntga7z/CannonAcademicCourseCatalog2026-2027.pdf | **PRIMARY SOURCE — "Upper School Course Catalog 2026-2027"** (44 pp.). Every Upper School course with full catalog descriptions, graduation requirements, GPA scale, AP/AT policy |
| S2 | https://resources.finalsite.net/images/v1757349467/cannonschoolorg/i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf | **"2025-2026 Profile"** (school/college-counseling profile). Source of the official 21 Advanced / 13 AP / 8 AT counts, enrollment, AP exam stats, and a one-page department course grid |
| S3 | https://www.cannonschool.org/academics/upper-school/curriculum | Upper School Curriculum page — graduation requirements by department, AP/AT framing (**stale relative to S1** — see Gaps) |
| S4 | https://www.cannonschool.org/academics/upper-school | Upper School landing page (honor societies: Rho Kappa, Mu Alpha Theta) |
| S5 | https://www.cannonschool.org/Academics/Upper-School/Winterm | Winterm one-week experiential term; example offerings |
| S6 | https://www.cannonschool.org/academics/lower-school | Lower School (JrK–4) landing page; specials list; per-grade page links |
| S7 | https://www.cannonschool.org/academics/lower-school/early-childhood-jrkk | JrK & Kindergarten page |
| S8 | https://www.cannonschool.org/academics/lower-school/first-grade | Grade 1 — 12 curriculum areas plus named programs |
| S9 | https://www.cannonschool.org/academics/lower-school/second-grade | Grade 2 — 12 curriculum areas plus Orff, Reveal Math |
| S10 | https://www.cannonschool.org/academics/lower-school/third-grade | Grade 3 — 12 areas plus TAB art, Recorder Karate, CHAMP test, Scratch 3.0 |
| S11 | https://www.cannonschool.org/academics/lower-school/fourth-grade | Grade 4 — 12 areas plus named programs |
| S12 | https://www.cannonschool.org/academics/middle-school | Middle School (5–8) landing page |
| S13 | https://www.cannonschool.org/academics/middle-school/fifth-grade | Grade 5 — subjects, three-language rotation, arts rotation |
| S14 | https://www.cannonschool.org/academics/middle-school/sixth-grade | Grade 6 — subjects incl. Pre-Algebra advanced option |
| S15 | https://www.cannonschool.org/academics/middle-school/seventh-grade | Grade 7 — subjects, Algebra I accelerated, arts choices |
| S16 | https://www.cannonschool.org/academics/middle-school/eighth-grade | Grade 8 — subjects, Accelerated Geometry track, arts |
| S17 | https://www.cannonschool.org/academics/academic-technology/academic-technology-curriculum | Academic Technology / CS curriculum by division |

`/academics/lower-school/curriculum` and `/academics/middle-school/curriculum` **return HTTP 404** —
Lower and Middle School curriculum lives on the per-grade pages above.

**Publication year:** the Upper School catalog is the **2026-27** edition; the profile is **2025-26**.

## Metrics

| Metric | Value | Source |
| --- | --- | --- |
| Grade range | JrK–Grade 12 | S2, S6, S12 |
| Upper School courses catalogued | 104 (counted from the 2026-27 catalog's 11 course-offering sections) | S1 |
| Upper School academic departments | 8 (English, Arts, Mathematics, Science, Social Studies, World Languages, Innovation/Enterprise & General Electives, Physical Education) | S1 table of contents |
| AP-titled courses, 2026-27 catalog | 14 | S1 |
| Advanced Topics (AT) courses, 2026-27 catalog | 13 | S1 |
| Combined AP + AT, 2026-27 | 27 | S1 |
| Official counts as published (2025-26 profile) | "21 Advanced courses, 13 AP courses, and 8 Advanced Topics (AT) courses" | S2 |
| Graduation credits required | 20 minimum (1 course = 1 credit) | S1 |
| Typical course load | 6 courses/year; all classes full-year | S1, S2 |
| Calendar | Trimester (ends November, February, May) | S2 |
| Max AP/AT by grade (Class of 2026) | 9th: 0 · 10th: 1 · 11th: 4 · 12th: 6 | S2 |
| AP exam results (Class of 2025) | 197 students, 425 exams, ~92% scoring 3+ | S2 |
| Enrollment | 1,055 JrK–12; 423 in grades 9–12 | S2 |
| Upper School faculty | 60 full-time; 85% hold advanced degrees | S2 |
| World languages offered | 3 — Spanish, French, Mandarin Chinese | S1, S13 |

**Discrepancy to flag:** the 2025-26 profile (S2) states 13 AP / 8 AT, but a direct count of the newer
2026-27 catalog (S1) yields 14 AP-titled and 13 AT-titled courses. The AT program visibly expanded
in 2026-27 (new AT English Seminar & Inquiry, AT Art History, AT European History, AT
Microeconomics, AT Principles of Computer Science). Use **S1 counts for 2026-27**; cite S2 only for
the 2025-26 figures.

**Course designations** (S1): *Honors* = challenging pace · *Honors Accelerated* = faster pace and
greater depth (+0.5 quality point as of July 1, 2026) · *AP* = College Board-designed · *AT
(Advanced Topics)* = Cannon-faculty-designed, college-level (+1.0 quality point).

**Graduation requirements** (S1, S3): English 4 yrs · Mathematics 3 yrs (incl. trigonometry) ·
Social Studies 3 yrs (incl. Honors or AT U.S. History) · World Languages 3 yrs · Science 3 yrs
(incl. Biology or Principles of Life Science) · Arts 2 yrs · PE 1 yr (or athletic participation).

## Upper School (Grades 9–12) — source S1

### English

- **Honors English I** — *Gr 9* — A foundational course cultivating critical thinking, analytical skills, and creative expression across memoirs, plays, novels, poetry, and short stories.
- **Honors English II: Reading and Discourse** — *Gr 10* — A sophomore seminar-style class reading and discussing influential literary and philosophical works from a variety of historical periods and cultures.
- **Honors English II: Reading and Composition** — *Gr 10* — A process-driven sophomore course in which students read, write, and think in service of developing writing and analytical skills.
- **Honors English III** — *Gr 11* — The study of rhetoric guided by Aristotle's appeals of ethos, pathos, and logos, culminating in a writing-portfolio presentation.
- **Advanced Topics: English Language and Composition** — *AT* — College-level nonfiction writing with major emphasis on revision, culminating in the Portfolio Defense signature learning experience.
- **Advanced Topics: English Seminar and Inquiry** — *AT* — College-level reading and writing emphasizing inquiry, independent research, and multi-disciplinary analysis; optional AP Seminar exam.
- **Honors English IV** — *Gr 12* — A senior course preparing college-bound students through diverse contemporary and canonical texts plus an Independent Reading program.
- **Advanced Topics: English Literature and Composition** — *AT* — College-level literary conversation about fiction and poetry, culminating in the Lit Defense signature learning experience.
- **Honors Creative Writing: Fiction, Poetry and Screenwriting** — *Honors · Elective* — Students develop individual literary voices through poetry, fiction, and screenwriting, completing a polished peer-critiqued screenplay.
- **Honors History of Film** — *Honors · Elective* — A fast-paced survey tracing cinema from its 1895 origins through the digital revolution across genres and movements.

The two electives are open to juniors and seniors only and do not fulfill the English requirement.

### Mathematics

- **Honors Algebra I** — *Honors* — Introduces basic functions, their graphs, and the rules of solving equations.
- **Honors Principles of Geometry and Algebra** — *Honors* — Strengthens and applies arithmetic, algebra, and reasoning to measure the world through traditional geometry concepts.
- **Honors Accelerated Geometry** — *Accelerated* — Euclidean geometry with heavy emphasis on notation, justification, and proof at greater rigor and depth than Honors Geometry.
- **Honors Algebra II** — *Honors* — Uses functions to reinforce and extend Algebra I skills, focusing on elementary functions and their properties.
- **Honors Accelerated Algebra II** — *Accelerated* — An in-depth exploration of algebraic concepts, preparing students for Accelerated Precalculus and subsequently AP Calculus and AP Statistics.
- **Honors Precalculus** — *Honors* — Further development of advanced algebraic concepts and trigonometry with heavy emphasis on functions and their properties.
- **Honors Accelerated Precalculus** — *Accelerated* — Prepares students for college-level mathematics and serves as the prerequisite for AP Calculus.
- **Advanced Placement Precalculus** — *AP* — A research-based exploration of function types modeling real-world phenomena, best suited to students on track for AP Calculus BC.
- **Honors Calculus** — *Honors* — Introduces the topics of a semester of college calculus at a less intense pace and depth than the AP courses.
- **Honors Statistics** — *Honors* — Exposes juniors and seniors to statistics through graphing data, normal probabilities, linear regression, and experimental design; no AP exam.
- **Advanced Placement Statistics** — *AP* — Major concepts and tools for collecting, analyzing, and drawing conclusions from data.
- **Honors Discrete Mathematics and Personal Finance** — *Gr 12* — Explores mathematics as it relates to the social sciences plus the mathematics behind money in everyday life.
- **Advanced Placement Calculus AB** — *AP* — A rigorous course covering a semester of college calculus through limits, differential calculus, and integral calculus.
- **Advanced Placement Calculus BC** — *AP* — An intense course covering two semesters of first-year college calculus including parametric equations, infinite series, vectors, and polar functions.
- **Advanced Topics in Mathematics and Calculus** — *Post-AP* — A student-centered seminar for students who have completed AP Calculus BC, using Phillips Exeter Academy's Mathematics 4C and 5 curricula.

### Science

- **Honors Principles of Chemistry and Physics** — *Gr 9* — A hands-on, inquiry-based introduction to physical science covering matter, energy transformations, motion, forces, and waves.
- **Honors Accelerated Principles of Chemistry and Physics** — *Accelerated* — A challenging ninth-grade physical science course covering a broader range of chemistry and physics topics at an accelerated pace.
- **Honors Principles of Life Science** — *Honors* — A comprehensive foundation in biological and environmental principles including cell biology, genetics, evolution, and ecology.
- **Honors Accelerated Principles of Life Science** — *Accelerated* — In-depth life science emphasizing application-based learning and analytical reasoning from molecules to ecosystems.
- **Honors Chemistry** — *Honors* — A guided-inquiry course developing the properties, composition, and structure of matter plus energy's role in changing matter.
- **Honors Accelerated Chemistry** — *Accelerated* — Covers Honors Chemistry at a faster pace plus molecular geometry, periodicity, and acid-base chemistry.
- **Honors Chemistry and Physics II** — *Honors* — An experimentation-driven course covering chemistry and physics concepts not included in the Honors and Accelerated Physics and Chemistry courses.
- **Honors Biology** — *Honors* — Introductory biology connecting key concepts through lab work and guided research, culminating in a third-trimester research project.
- **Honors Accelerated Biology** — *Accelerated* — Major principles of biology at deeper level and faster pace, with additional lab experiences and a third-trimester research project.
- **Advanced Topics: Environmental Science** — *AT* — The scientific principles behind the interrelationships of the natural world, culminating in an independent research project.
- **Advanced Placement Chemistry** — *AP* — A year-long general chemistry equivalent covering nine major topics from atomic structure to thermodynamics.
- **Advanced Placement Biology** — *AP* — The equivalent of a college introductory course for biology majors, built around student-directed, inquiry-based labs.
- **Advanced Placement Physics 1** — *AP* — Algebra-based introductory college-level physics covering kinematics, dynamics, energy, momentum, torque, and rotational motion.
- **Advanced Placement Physics C** — *AP* — A calculus-based mechanics course equivalent to introductory college physics for engineering or physical science majors.
- **Honors Marine Science** — *Honors · Elective* — Studies the animals inhabiting the world's oceans, including setup and maintenance of saltwater aquariums.
- **Honors Anatomy and Physiology** — *Honors · Elective* — An introductory study of the anatomical structures and physiological processes of key human body systems.
- **Honors Seminar: Contemporary Issues in Science** — *Online · Elective* — An asynchronous fully online course building appreciation for scientific phenomena relevant to scientifically literate adults.

The three electives do not fulfill the Science requirement.

### Social Studies

- **Honors World History** — *Gr 9* — Surveys prehistory through the twentieth century while equipping ninth graders with core humanities skills.
- **Honors Accelerated World History I** — *Accelerated* — The ancient world through circa 1450 CE using the skills, practices, and methods employed by historians.
- **Honors Civics: Foundations of Democracy and Citizenship** — *Gr 10* — Introduces the fundamental principles of democracy, citizenship, and economics in historical and modern contexts.
- **Advanced Topics: World History II** — *AT* — Investigates world history from circa 1450 CE to the present, culminating in the Colloquium research project and policy proposal.
- **Honors United States History** — *Honors* — Examines the development of equality, liberty, democracy, rights, and opportunity in American society.
- **Advanced Topics: United States History** — *AT* — Hones analytical skills across themes in U.S. History, culminating in the Symposium signature learning experience.
- **Honors Practicum: Civil Discourse and the Social Sciences** — *Honors · Elective* — Uses current events to explore economics, psychology, sociology, political science, and history; students teach mini-lessons in Lower and Middle School.
- **Honors Psychology** — *Honors · Elective* — Introduces psychological science while diving into topics especially relevant to high school life.
- **Advanced Placement Psychology** — *AP · Elective* — The scientific study of human behavior and mental processes mirroring an introductory college psychology course.
- **Advanced Topics: United States Government and Politics** — *AT · Elective* — An analytical perspective on U.S. government and politics, culminating in an Oral Arguments Supreme Court simulation.
- **Advanced Topics: European History** — *AT · Elective* — A hybrid senior course investigating European history from approximately 1450 to the present across seven themes.

The five electives do not fulfill the Social Studies requirement.

### World Languages

Spanish, French, and Chinese each run Levels I–V plus an AP capstone. Levels III and above count
toward the **Global Education Certificate**. All are taught with a goal of 90% target-language use.

- **Honors Spanish I: Novice** — *Level I* — Foundational communication, comprehension, and presentation skills on highly familiar topics.
- **Honors Spanish II: Intermediate Foundations** — *Level II* — Progresses to Novice-High and Intermediate-Low proficiency across a broader range of familiar topics.
- **Honors Spanish III: Intermediate Mid A** — *Level III* — Students participate in exchanges and present on a variety of topics using familiar vocabulary and learned grammar.
- **Honors Spanish IV: Intermediate Mid B** — *Level IV* — Refines skills and broadens exposure to diverse accents from Spanish-speaking countries.
- **Honors Spanish V: Language with a Purpose** — *Level V* — Uses Spanish for communication and leadership through institution visits and conversations with native-speaking professionals.
- **AP Spanish Language and Culture: Advanced** — *AP* — A rigorous interdisciplinary course taught exclusively in Spanish, building proficiency toward advanced-low.
- **Honors French I: Novice** — *Level I* — Acquires vocabulary and skills to start communicating in French across simple communicative tasks.
- **Honors French II: Intermediate Foundations** — *Level II* — Builds on French I with daily routines, past events, and future plans plus francophone cultures and current events.
- **Honors French III: Intermediate Mid A** — *Level III* — Immersive oral and written exchanges within the context of culture, connections, and comparisons.
- **Honors French IV: Intermediate Mid B** — *Level IV* — Deepens advanced grammar and vocabulary with exposure to accents from various French-speaking countries.
- **Honors French V: Intermediate High** — *Level V* — An intensive class equivalent to a fourth-semester college course developing all four language skills.
- **Advanced Placement French Language: Advanced** — *AP* — An intensive class preparing students for the AP French language examination in the spring.
- **Honors Chinese I: Novice** — *Level I* — Introductory Mandarin covering functional communication plus Pinyin and Chinese characters.
- **Honors Chinese II: Novice Mid A** — *Level II* — Students discern language patterns and forms to create complete sentences and short spontaneous conversations.
- **Honors Chinese III: Novice Mid B** — *Level III* — Expands characters and compound usages with emphasis on verbal usage and circumlocution.
- **Honors Chinese IV: Intermediate Foundations** — *Level IV* — More complex structures and current events, designed to prepare students for the AP language class.
- **Honors Chinese V: Intermediate Mid A** — *Level V* — Emphasizes natural colloquial usage, idiomatic phrases, Hanzi writing, and essay writing.
- **Advanced Placement Chinese Language and Culture** — *AP* — Comparable to fourth-semester college Mandarin, deepening immersion in the Chinese-speaking world.

### Arts (2 years required)

Partially overlaps the existing in-repo `Cannon - The Arts - Course Offerings.pdf`.

- **Honors Visual Foundations** — *Prerequisite* — A one-year introductory course and the prerequisite for all Studio Art and Media Arts courses.
- **Honors Studio-2D** — *Honors* — Examines how art across two-dimensional media communicates ideas through a choice-based classroom model.
- **Honors Studio-3D** — *Honors* — Hands-on exploration of clay, wire, wood, plaster, and found objects to create sculptures, installations, and functional designs.
- **Honors Studio Arts II** — *Honors* — An introduction to deep studio practice, creating a series of work based on the student's own artistic voice.
- **Honors Studio Arts III** — *Honors* — A continuation of Studio Arts II with more independent research and out-of-class project work.
- **Advanced Placement Studio Art** — *AP* — An intensive portfolio course for students seriously interested in the practical experience of art; portfolios replace a written exam.
- **Advanced Topics: Art History** — *AT* — A journey across continents and centuries pairing art analysis with hands-on studio projects; prepares for the AP Art History exam.
- **Honors Theater I** — *Honors* — Explores fundamental skills of realistic acting plus basic principles of directing and designing for the stage.
- **Honors Theater II** — *Honors* — Further develops acting, directing, and design through more challenging projects and greater artistic ownership.
- **Honors Theater in Performance** — *Repeatable* — For experienced students committing to public acting, directing, or production design including Fall One-Acts and Arts Jam.
- **Honors Concert Chorus** — *Repeatable* — Students sing a wide variety of literature composed for mixed choirs while learning healthful vocal production.
- **Honors String Ensemble I** — *Level I* — Accommodates experienced instrumentalists performing traditional orchestra music and chamber repertoire.
- **Honors String Ensemble II** — *Level II* — Performs increasingly sophisticated repertoire with higher technical mastery and leadership than the prior year.
- **Honors String Ensemble III** — *Level III* — Performs increasingly sophisticated repertoire with higher technical mastery and leadership than the prior year.
- **Honors String Ensemble IV** — *Level IV* — Performs increasingly sophisticated repertoire with higher technical mastery and leadership than the prior year.
- **Honors Upper School Band** — *Repeatable* — Builds on middle school band across Concert Band, Big Band, and small classical Chamber Ensembles.
- **Honors Cannon School Jazz Combo** — *Audition* — Explores modern jazz in the small combo format with daily focus on jazz theory and improvisation.
- **Honors Modern Ensemble** — *Repeatable* — Performs American Pop, Rock, R&B, and Rap with heavy use of multi-track recording via Soundtrap.
- **Honors Music Technology I** — *Honors* — Learns the language and mechanics of music through composition using the latest music technology; designed for the music novice.
- **Honors Music Technology II** — *Honors* — Deepens compositional skills through Ableton Live and the Ableton Push MIDI controller.
- **Honors Music Technology III: Music Production** — *Honors* — Advanced self-driven projects using industry-standard DAWs such as Ableton Live and Logic Pro.
- **Honors Creative Design and Engineering I** — *Honors* — Project-based exploration of the Iterative Design Engineering process across woodworking, sewing, electronics, and CAD.
- **Honors Creative Design and Engineering II** — *Honors* — Further develops idea curation, project planning, design, and fabrication through increasingly challenging design prompts.
- **Honors Creative Design and Engineering Studio** — *Permission* — An open-block studio for independent maker projects, evaluated through portfolio development and project check-ins.

### Innovation, Enterprise and General Electives

Per S1 these "do not fall under the umbrella of one department" and may be taught by faculty from
different departments year to year. This is where **Computer Science** lives — Cannon has no
standalone CS department.

- **Advanced Topics: Principles of Computer Science and Coding** — *AT* — Introduces the breadth of computer science, covering algorithms, programs, the internet, and AI and their consequences.
- **Advanced Placement Computer Science A: Coding & Computer Science** — *AP* — Fundamentals of computer science through object-oriented design in Java, including data structures and algorithms.
- **Advanced Topics: Microeconomics: Politics and Policy** — *AT* — College-level microeconomics examining supply and demand, market structures, and market failure alongside public policy.
- **Advanced Topics: Business and Entrepreneurship with Personal Finance** — *AT* — A year-long project-based course where students develop and launch a business model, culminating in a Shark Tank-style pitch to investors.
- **Honors Business of Esports** — *Honors* — A hands-on exploration of the esports industry and entrepreneurship; students intern for the Collective Esports Company.
- **Honors Glocal Perspectives** — *Gr 12* — An immersive service-learning exploration of global and local perspectives; required for the Global Education Certificate.
- **Senior Colloquium: Leadership** — *Gr 12* — Leadership training in which students read leadership literature and collaborate to chart the curriculum.
- **Honors Yearbook** — *Repeatable* — Produces Cannon's yearbook, *The Flashback*, covering graphic design, copywriting, photography, and publication business.

### Physical Education (1 credit required)

- **Wellness and Long-term Athletic Development** — *Gr 11-12* — A holistic wellness and athletic development course informed by kinesiology, exercise physiology, and biomechanics.

### Upper School programs beyond the course list (S1, S2, S5)

- **Winterm** — a one-week experiential term after winter break; 0.25 credit/yr (max 0.75), transcripted "Pass." Past offerings include Indoor Rock Climbing 101, Spanish Immersion in Costa Rica, Mindfulness and Meditation, CrossFit and Other Fitness, Farm-to-Table Experience, Super Basic Coding, Sea Island Habitat for Humanity Service Trip, and Food and Photos.
- **Independent Study Program (ISP)** — seniors design a course with a faculty mentor; graded or pass-fail; also covers approved online courses.
- **Summer Term** — 5 weeks, 9 AM–12 PM, $850/course plus lab fees; Geometry Acceleration (P/F), Honors Biology, Honors Chemistry.
- **Zero Hour** — Monday/Wednesday/Friday before school: Varsity Chorus, Varsity Orchestra (both Pass/Fail).
- **Signature Learning Experiences** — Portfolio Defense, Symposium, BIOREX, Colloquium, Oral Arguments, Lit Defense, Senior Capstones. All AP and AT courses culminate in an SLE worth 10% of the final grade.
- **Global Education Certificate** — requires Level III+ language plus Honors Glocal Perspectives.

## Middle School (Grades 5–8) — sources S12–S16

Cannon publishes Middle School curriculum as **per-grade subject descriptions, not a named-course
catalog.** Core subjects are consistent across grades; the real course-level variation is in math
tracking, world language, and arts.

### Core academics

- **English** — *Gr 5-8* — Grade 5 explores genres and writing critically; Grade 6 reinforces grammar and mechanics with emphasis on narrative writing; Grade 7 integrates literature, writing, and grammar; Grade 8 builds reading, writing, listening, and speaking skills.
- **Mathematics** — *Gr 5-8* — Grades 5–6 cover operations, equations and inequalities, ratio, proportion and percent, area and volume, statistics, and graphing linear equations.
- **Science** — *Gr 5-8* — Grade 5 studies ecology; Grade 6 covers classification, cells, rocks and minerals, plate tectonics, and physics of motion; Grade 7 covers chemistry, the electromagnetic spectrum, astronomy, and anatomy; Grade 8 investigates the Sun's impact on Earth.
- **Social Studies** — *Gr 5-8* — Grades 5–6 study ancient and Medieval civilizations thematically; Grade 7 covers the origins of the United States; Grade 8 emphasizes modern U.S. history as it becomes a world power.
- **Physical Education** — *Gr 5-8* — Soccer, flag football, volleyball, tennis, aerobics, cardiovascular fitness and conditioning, basketball, softball, baseball, and lacrosse.
- **Health Education** — *Gr 5-8* — Human growth and development, evaluating health information, decision-making, family living, nutrition, safety and first aid, and environmental health.

### Mathematics tracking (the real course-level differentiator)

- **Pre-Algebra** — *Gr 6 advanced / Gr 7* — Builds on prior knowledge to dive deeper into expressions, equations, inequalities, integers, linear functions, geometry, probability, and statistics.
- **Seventh-Grade Algebra I** — *Gr 7 · Accelerated* — An accelerated option allowing seventh graders to take Algebra I.
- **Algebra I** — *Gr 8* — Linear equations, inequalities, polynomials, factoring, graphing, radicals, quadratics, and an introduction to trigonometry.
- **Accelerated Geometry** — *Gr 8 · Accelerated* — Parallel and perpendicular lines, congruent triangles, similar polygons, trigonometry, quadrilaterals and circles, area and volume.

Note (S1): credits earned in middle school — even in Cannon Upper School courses — **do not** count
toward Upper School graduation credits.

### World Languages

- **World Language Rotation** — *Gr 5* — Students rotate through all three world languages offered at Cannon (Spanish, French, and Mandarin) before choosing one to pursue.
- **World Language (daily)** — *Gr 6* — Daily classes learning basic grammar and vocabulary to describe themselves and the world in the target language.
- **Spanish I / French I / Mandarin I** — *Gr 7-8* — Students complete one of Spanish I, French I, or Mandarin I, conducted primarily in the target language.

### Arts

- **Major Art: Strings, Band, or Chorus** — *Gr 5-6* — Students select one major performing art class.
- **Arts Rotation** — *Gr 5-6* — A rotation through Visual Art, Theater, General Music, and Small Group Lessons in the major art.
- **Arts Electives (choose two)** — *Gr 7-8* — Band, Chorus, Strings, Visual Art, Theater, Photography/Tech Art Fusion, Creative Explorations, and Art Magazine.

### Academic Technology (S17)

Grades 5–8 blend 3D printing, virtual reality, drones, robotics, CAD design, and computer
programming, emphasizing a maker mentality with hand and power tools; students use the **ThinkTank**
makerspace.

## Lower School (JrK–Grade 4) — sources S6–S11

Cannon publishes **12 named curriculum areas** consistently for Grades 1–4, plus named commercial
programs. There is no course catalog — this is the correct grain of published data.

- **Language Arts** — *Gr 1-4* — A literacy block integrating whole-class and small-group differentiated instruction across phonics, fluency, vocabulary, and comprehension.
- **Mathematics** — *Gr 1-4* — Uses **Reveal Math** to develop number sense and problem solving; Grade 4 works with multi-digit numbers, fractions, and decimals.
- **Science** — *Gr 1-4* — Inquiry-driven; by Grade 3 students generate their own scientific questions to test through experimentation.
- **Social Studies** — *Gr 1-4* — Uses the **Social Studies Alive!** curriculum — *Regions of Our Country* in Grade 3, *America's Past* in Grade 4.
- **Spanish** — *Gr 1-4* — Combines the Communicative Language Approach with the Foreign Language in the Elementary School (FLES) approach.
- **Art** — *Gr 1-4* — Grade 3 onward uses the **TAB (Teaching for Artistic Behavior)** model so students work and think as artists.
- **Music** — *Gr 1-4* — Uses the **Orff Approach**; Grade 3 introduces the recorder including **Recorder Karate**.
- **Physical Education** — *Gr 1-4* — Motor-skill development including the **Cannon Health and Performance (CHAMP) Test**.
- **Technology** — *Gr 1-4* — Robotics and coding with **Scratch 3.0** and block-based scripting.
- **Makers** — *Gr 1-4* — Problem solving through an engineering design thinking approach.
- **Library** — *Gr 1-4* — Research skills including use of the digital library catalog to locate materials.
- **School Counseling** — *Gr 1-4* — Addresses typical challenges and characteristics of children by age and developmental stage.
- **Early Childhood Program** — *JrK-K* — Curriculum builds a strong academic foundation in reading, writing, and math through hands-on, collaborative, experiential, and multi-sensory learning.

**Named programs:** *Handwriting Without Tears* — "a developmental, engaging, multi-sensory program"
(S8, S11).

**Division-wide specials (S6):** science, music, library, art, Spanish, physical education,
technology, and STEM experiences.

**Academic Technology (S17):** coding and simple robotics at developmentally appropriate levels
using **Root Robotics**, **Edison robots**, and **Scratch 3.0**; grades 3–4 add digital education,
keyboarding, creative mixed media, presentations, and research skills.

## Gaps — what Cannon does not publish

1. **No Middle School course catalog.** Grades 5–8 are published as prose subject descriptions per
   grade (S13–S16), not as a titled course list with descriptions. There is **no Middle School
   equivalent of the 44-page Upper School catalog.**
2. **No Lower School course catalog.** JrK–4 is published as 12 named curriculum areas per grade
   (S8–S11). Individual "courses" do not exist at this level by design.
3. **`/academics/lower-school/curriculum` and `/academics/middle-school/curriculum` return HTTP 404.**
   Any citation must point to the division landing page or a specific grade page.
4. **JrK/Kindergarten is the thinnest page on the site (S7).** It names no subject areas and no
   reading, phonics, or math program — only a one-sentence statement about reading, writing, and math.
5. **No credit values, semester/year designations, or class-size data per Upper School course.** The
   catalog states all classes are full-year and one course equals one credit, but does not itemize
   credits per course.
6. **AP/AT counts conflict between sources** — 13 AP / 8 AT in the 2025-26 profile (S2) versus 14
   AP-titled / 13 AT-titled in the 2026-27 catalog (S1). Cannon has not published a reconciled
   2026-27 count. The "21 Advanced courses" figure in S2 is also undefined — it does not map cleanly
   to the catalog's "Honors Accelerated" designation.
7. **Courses in the 2025-26 profile that are gone from the 2026-27 catalog as standalone entries:**
   *Honors Media Arts I, II* survive **only as prerequisites** for AP Studio Art. Also dropped or
   renamed: *Honors Economics, Law, and Politics*; *Honors Design Thinking & Entrepreneurship Lab* /
   *AT Design Thinking for Entrepreneurship* (superseded by AT Business and Entrepreneurship with
   Personal Finance); *Honors The Voice: Poetry and Fiction Writing* and *Honors Film Studies*
   (renamed to Honors Creative Writing and Honors History of Film).
8. **The Upper School curriculum page (S3) is stale relative to S1** — it still advertises the retired
   names "AT Design Thinking for Entrepreneurship" and "AT Language and Composition."
9. **No standalone Computer Science department.** CS is two courses inside "Innovation, Enterprise and
   General Electives." Reporting a "Computer Science department" for Cannon would be inaccurate.
10. **Winterm course list is illustrative, not current.** S5 gives past examples; no 2026-27 Winterm
    catalog is published.
