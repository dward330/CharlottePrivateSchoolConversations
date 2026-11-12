# Cannon School — Course Offerings — Curriculum Guide Full Descriptions 2026-2027
**Provenance**

- **Compiled by:** Claude Code, plan `coursecensus` Batch 2, at Derrick's request
- **Date fetched:** 2026-11-11
- **Why:** the earlier record (`Cannon - Course Offerings - Curriculum Guide.md`) holds the app's
  own condensed descriptions word for word for 83% of courses, so it cannot catch a description
  that drifted from the catalog. This file holds the school's own text, for the
  description-to-catalog census.
- **Upper School method:** the 2026-2027 Upper School Course Catalog PDF (44 pp.) was
  re-downloaded from S1 with `curl` and its text extracted column by column with `pdfplumber`
  (each two-column page is read left column, then right column). Runs of spaces were collapsed.
  No other change. `pdfplumber` does not reproduce the "ONL Y" / "T opics" spacing that the
  earlier `pypdf` extraction showed.
  - PDF SHA-256: `e0c12815e6d6d8d6a9ae8407dc5de02f78b005823e2e67b4e76e1bb250a21f53`
  - PDF metadata: created and modified 2026-01-13; cover "Upper School Course Catalog 2026-2027".
- **Lower and Middle School method:** each division's live landing page and per-grade pages
  (S3–S15) and the Academic Technology curriculum page (S16) were fetched as HTML and converted
  to text; site navigation, staff lists and footer blocks were removed. The Junior Kindergarten
  and Kindergarten pages (S5, S6) are linked from S4 and were added for the Early Childhood row.
  The per-grade pages have no click-to-open tiles; the Middle and Upper School landing pages'
  tiles are division prose and honor societies (no courses), per the Batch 1 popup scan.
- **Catalog year:** the app was built from this same 2026-27 catalog (record, 2026-07-26).
## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1769529893/cannonschoolorg/ihl0lzuqgs9loqntga7z/CannonAcademicCourseCatalog2026-2027.pdf | Upper School Course Catalog 2026-2027 (44 pp.), every Upper School course entry |
| S2 | https://www.cannonschool.org/academics/upper-school/curriculum | Upper School Curriculum page (graduation requirements; context only) |
| S3 | https://www.cannonschool.org/academics/lower-school | Lower School landing |
| S4 | https://www.cannonschool.org/academics/lower-school/early-childhood-jrkk | Early Childhood: JrK and Kindergarten |
| S5 | https://www.cannonschool.org/academics/lower-school/early-childhood-jrkk/jr-kindergarten | Junior Kindergarten |
| S6 | https://www.cannonschool.org/academics/lower-school/early-childhood-jrkk/kindergarten | Kindergarten |
| S7 | https://www.cannonschool.org/academics/lower-school/first-grade | First Grade |
| S8 | https://www.cannonschool.org/academics/lower-school/second-grade | Second Grade |
| S9 | https://www.cannonschool.org/academics/lower-school/third-grade | Third Grade |
| S10 | https://www.cannonschool.org/academics/lower-school/fourth-grade | Fourth Grade |
| S11 | https://www.cannonschool.org/academics/middle-school | Middle School landing |
| S12 | https://www.cannonschool.org/academics/middle-school/fifth-grade | Fifth Grade |
| S13 | https://www.cannonschool.org/academics/middle-school/sixth-grade | Sixth Grade |
| S14 | https://www.cannonschool.org/academics/middle-school/seventh-grade | Seventh Grade |
| S15 | https://www.cannonschool.org/academics/middle-school/eighth-grade | Eighth Grade |
| S16 | https://www.cannonschool.org/academics/academic-technology/academic-technology-curriculum | Academic Technology Curriculum (all divisions) |

## Index — every app course, in app order

Where each app row's own text sits below. Upper School rows point to the catalog page (PDF page number, as `===== PAGE N =====` below; found by title search, so confirm it). Lower and Middle School rows point to the division section.

| App path | Division | Department | Title | Where |
| --- | --- | --- | --- | --- |
| `divisions[0].departments[0].courses[0]` | Lower School Courses | Core Academics | Language Arts | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[0].courses[1]` | Lower School Courses | Core Academics | Mathematics | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[0].courses[2]` | Lower School Courses | Core Academics | Science | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[0].courses[3]` | Lower School Courses | Core Academics | Social Studies | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[0].courses[4]` | Lower School Courses | Core Academics | Early Childhood Program | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[1].courses[0]` | Lower School Courses | World Language | Spanish | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[2].courses[0]` | Lower School Courses | Arts & PE | Art | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[2].courses[1]` | Lower School Courses | Arts & PE | Music | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[2].courses[2]` | Lower School Courses | Arts & PE | Physical Education | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[3].courses[0]` | Lower School Courses | Technology & Makers | Technology | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[3].courses[1]` | Lower School Courses | Technology & Makers | Makers | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[3].courses[2]` | Lower School Courses | Technology & Makers | Library | Lower School pages (S3–S10, S16) |
| `divisions[0].departments[3].courses[3]` | Lower School Courses | Technology & Makers | School Counseling | Lower School pages (S3–S10, S16) |
| `divisions[1].departments[0].courses[0]` | Middle School Courses | Core Academics | English | Middle School pages (S11–S16) |
| `divisions[1].departments[0].courses[1]` | Middle School Courses | Core Academics | Science | Middle School pages (S11–S16) |
| `divisions[1].departments[0].courses[2]` | Middle School Courses | Core Academics | Social Studies | Middle School pages (S11–S16) |
| `divisions[1].departments[0].courses[3]` | Middle School Courses | Core Academics | Physical Education | Middle School pages (S11–S16) |
| `divisions[1].departments[0].courses[4]` | Middle School Courses | Core Academics | Health Education | Middle School pages (S11–S16) |
| `divisions[1].departments[1].courses[0]` | Middle School Courses | Mathematics | Mathematics | Middle School pages (S11–S16) |
| `divisions[1].departments[1].courses[1]` | Middle School Courses | Mathematics | Pre-Algebra | Middle School pages (S11–S16) |
| `divisions[1].departments[1].courses[2]` | Middle School Courses | Mathematics | Seventh-Grade Algebra I | Middle School pages (S11–S16) |
| `divisions[1].departments[1].courses[3]` | Middle School Courses | Mathematics | Algebra I | Middle School pages (S11–S16) |
| `divisions[1].departments[1].courses[4]` | Middle School Courses | Mathematics | Accelerated Geometry | Middle School pages (S11–S16) |
| `divisions[1].departments[2].courses[0]` | Middle School Courses | World Languages | World Language Rotation | Middle School pages (S11–S16) |
| `divisions[1].departments[2].courses[1]` | Middle School Courses | World Languages | World Language (daily) | Middle School pages (S11–S16) |
| `divisions[1].departments[2].courses[2]` | Middle School Courses | World Languages | Spanish I / French I / Mandarin I | Middle School pages (S11–S16) |
| `divisions[1].departments[3].courses[0]` | Middle School Courses | Arts & Technology | Major Art: Strings, Band, or Chorus | Middle School pages (S11–S16) |
| `divisions[1].departments[3].courses[1]` | Middle School Courses | Arts & Technology | Arts Rotation | Middle School pages (S11–S16) |
| `divisions[1].departments[3].courses[2]` | Middle School Courses | Arts & Technology | Arts Electives (choose two) | Middle School pages (S11–S16) |
| `divisions[1].departments[3].courses[3]` | Middle School Courses | Arts & Technology | Academic Technology | Middle School pages (S11–S16) |
| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | Honors English I | catalog p. 16, 17, 18 |
| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | Honors English II: Reading and Discourse | catalog p. 16 |
| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | Honors English II: Reading and Composition | catalog p. 16 |
| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | Honors English III | catalog p. 16, 17, 18 |
| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | Advanced Topics: English Language and Composition | catalog p. 17 |
| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | Advanced Topics: English Seminar and Inquiry | catalog p. 17 |
| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | Honors English IV | catalog p. 17, 18 |
| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | Advanced Topics: English Literature and Composition | catalog p. 17 |
| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Honors Creative Writing: Fiction, Poetry and Screenwriting | catalog p. 18 |
| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Honors History of Film | catalog p. 18 |
| `divisions[2].departments[1].courses[0]` | Upper School Courses | Mathematics | Honors Algebra I | catalog p. 24, 25, 26, 29 |
| `divisions[2].departments[1].courses[1]` | Upper School Courses | Mathematics | Honors Principles of Geometry and Algebra | catalog p. 24 |
| `divisions[2].departments[1].courses[2]` | Upper School Courses | Mathematics | Honors Accelerated Geometry | catalog p. 24 |
| `divisions[2].departments[1].courses[3]` | Upper School Courses | Mathematics | Honors Algebra II | catalog p. 24, 25, 26, 29 |
| `divisions[2].departments[1].courses[4]` | Upper School Courses | Mathematics | Honors Accelerated Algebra II | catalog p. 24, 25, 26, 29 |
| `divisions[2].departments[1].courses[5]` | Upper School Courses | Mathematics | Honors Precalculus | catalog p. 25, 26 |
| `divisions[2].departments[1].courses[6]` | Upper School Courses | Mathematics | Honors Accelerated Precalculus | catalog p. 25, 26 |
| `divisions[2].departments[1].courses[7]` | Upper School Courses | Mathematics | Advanced Placement Precalculus | catalog p. 25 |
| `divisions[2].departments[1].courses[8]` | Upper School Courses | Mathematics | Honors Calculus | catalog p. 25, 26 |
| `divisions[2].departments[1].courses[9]` | Upper School Courses | Mathematics | Honors Statistics | catalog p. 25 |
| `divisions[2].departments[1].courses[10]` | Upper School Courses | Mathematics | Advanced Placement Statistics | catalog p. 26 |
| `divisions[2].departments[1].courses[11]` | Upper School Courses | Mathematics | Honors Discrete Mathematics and Personal Finance | catalog p. 26 |
| `divisions[2].departments[1].courses[12]` | Upper School Courses | Mathematics | Advanced Placement Calculus AB | catalog p. 26, 29 |
| `divisions[2].departments[1].courses[13]` | Upper School Courses | Mathematics | Advanced Placement Calculus BC | catalog p. 26, 29 |
| `divisions[2].departments[1].courses[14]` | Upper School Courses | Mathematics | Advanced Topics in Mathematics and Calculus | catalog p. 26 |
| `divisions[2].departments[2].courses[0]` | Upper School Courses | Science | Honors Principles of Chemistry and Physics | catalog p. 27, 28 |
| `divisions[2].departments[2].courses[1]` | Upper School Courses | Science | Honors Accelerated Principles of Chemistry and Physics | catalog p. 27, 28 |
| `divisions[2].departments[2].courses[2]` | Upper School Courses | Science | Honors Principles of Life Science | catalog p. 27 |
| `divisions[2].departments[2].courses[3]` | Upper School Courses | Science | Honors Accelerated Principles of Life Science | catalog p. 27 |
| `divisions[2].departments[2].courses[4]` | Upper School Courses | Science | Honors Chemistry | catalog p. 27, 28, 29, 30 |
| `divisions[2].departments[2].courses[5]` | Upper School Courses | Science | Honors Accelerated Chemistry | catalog p. 28, 29, 30 |
| `divisions[2].departments[2].courses[6]` | Upper School Courses | Science | Honors Chemistry and Physics II | catalog p. 28 |
| `divisions[2].departments[2].courses[7]` | Upper School Courses | Science | Honors Biology | catalog p. 28 |
| `divisions[2].departments[2].courses[8]` | Upper School Courses | Science | Honors Accelerated Biology | catalog p. 28, 29 |
| `divisions[2].departments[2].courses[9]` | Upper School Courses | Science | Advanced Topics: Environmental Science | catalog p. 28 |
| `divisions[2].departments[2].courses[10]` | Upper School Courses | Science | Advanced Placement Chemistry | catalog p. 28 |
| `divisions[2].departments[2].courses[11]` | Upper School Courses | Science | Advanced Placement Biology | catalog p. 29 |
| `divisions[2].departments[2].courses[12]` | Upper School Courses | Science | Advanced Placement Physics 1 | catalog p. 29 |
| `divisions[2].departments[2].courses[13]` | Upper School Courses | Science | Advanced Placement Physics C | catalog p. 29 |
| `divisions[2].departments[2].courses[14]` | Upper School Courses | Science | Honors Marine Science | catalog p. 30 |
| `divisions[2].departments[2].courses[15]` | Upper School Courses | Science | Honors Anatomy and Physiology | catalog p. 30 |
| `divisions[2].departments[2].courses[16]` | Upper School Courses | Science | Honors Seminar: Contemporary Issues in Science | catalog p. 30 |
| `divisions[2].departments[3].courses[0]` | Upper School Courses | Social Studies | Honors World History | catalog p. 31 |
| `divisions[2].departments[3].courses[1]` | Upper School Courses | Social Studies | Honors Accelerated World History I | catalog p. 31 |
| `divisions[2].departments[3].courses[2]` | Upper School Courses | Social Studies | Honors Civics: Foundations of Democracy and Citizenship | catalog p. 31 |
| `divisions[2].departments[3].courses[3]` | Upper School Courses | Social Studies | Advanced Topics: World History II | catalog p. 31, 32, 34 |
| `divisions[2].departments[3].courses[4]` | Upper School Courses | Social Studies | Honors United States History | catalog p. 32 |
| `divisions[2].departments[3].courses[5]` | Upper School Courses | Social Studies | Advanced Topics: United States History | catalog p. 32, 34 |
| `divisions[2].departments[3].courses[6]` | Upper School Courses | Social Studies | Honors Practicum: Civil Discourse and the Social Sciences | catalog p. 33 |
| `divisions[2].departments[3].courses[7]` | Upper School Courses | Social Studies | Honors Psychology | catalog p. 33 |
| `divisions[2].departments[3].courses[8]` | Upper School Courses | Social Studies | Advanced Placement Psychology | catalog p. 33 |
| `divisions[2].departments[3].courses[9]` | Upper School Courses | Social Studies | Advanced Topics: United States Government and Politics | catalog p. 34 |
| `divisions[2].departments[3].courses[10]` | Upper School Courses | Social Studies | Advanced Topics: European History | catalog p. 34 |
| `divisions[2].departments[4].courses[0]` | Upper School Courses | World Languages | Honors Spanish I: Novice | catalog p. 35 |
| `divisions[2].departments[4].courses[1]` | Upper School Courses | World Languages | Honors Spanish II: Intermediate Foundations | catalog p. 35 |
| `divisions[2].departments[4].courses[2]` | Upper School Courses | World Languages | Honors Spanish III: Intermediate Mid A | catalog p. 35 |
| `divisions[2].departments[4].courses[3]` | Upper School Courses | World Languages | Honors Spanish IV: Intermediate Mid B | catalog p. 35 |
| `divisions[2].departments[4].courses[4]` | Upper School Courses | World Languages | Honors Spanish V: Language with a Purpose | catalog p. 36 |
| `divisions[2].departments[4].courses[5]` | Upper School Courses | World Languages | AP Spanish Language and Culture: Advanced | not found by title search |
| `divisions[2].departments[4].courses[6]` | Upper School Courses | World Languages | Honors French I: Novice | catalog p. 36 |
| `divisions[2].departments[4].courses[7]` | Upper School Courses | World Languages | Honors French II: Intermediate Foundations | catalog p. 36 |
| `divisions[2].departments[4].courses[8]` | Upper School Courses | World Languages | Honors French III: Intermediate Mid A | catalog p. 37 |
| `divisions[2].departments[4].courses[9]` | Upper School Courses | World Languages | Honors French IV: Intermediate Mid B | catalog p. 37 |
| `divisions[2].departments[4].courses[10]` | Upper School Courses | World Languages | Honors French V: Intermediate High | catalog p. 37 |
| `divisions[2].departments[4].courses[11]` | Upper School Courses | World Languages | Advanced Placement French Language: Advanced | catalog p. 37 |
| `divisions[2].departments[4].courses[12]` | Upper School Courses | World Languages | Honors Chinese I: Novice | catalog p. 37 |
| `divisions[2].departments[4].courses[13]` | Upper School Courses | World Languages | Honors Chinese II: Novice Mid A | catalog p. 38 |
| `divisions[2].departments[4].courses[14]` | Upper School Courses | World Languages | Honors Chinese III: Novice Mid B | catalog p. 38 |
| `divisions[2].departments[4].courses[15]` | Upper School Courses | World Languages | Honors Chinese IV: Intermediate Foundations | catalog p. 38 |
| `divisions[2].departments[4].courses[16]` | Upper School Courses | World Languages | Honors Chinese V: Intermediate Mid A | catalog p. 38 |
| `divisions[2].departments[4].courses[17]` | Upper School Courses | World Languages | Advanced Placement Chinese Language and Culture | catalog p. 39 |
| `divisions[2].departments[5].courses[0]` | Upper School Courses | Arts | Honors Visual Foundations | catalog p. 19 |
| `divisions[2].departments[5].courses[1]` | Upper School Courses | Arts | Honors Studio-2D | catalog p. 19 |
| `divisions[2].departments[5].courses[2]` | Upper School Courses | Arts | Honors Studio-3D | catalog p. 19 |
| `divisions[2].departments[5].courses[3]` | Upper School Courses | Arts | Honors Studio Arts II | catalog p. 19 |
| `divisions[2].departments[5].courses[4]` | Upper School Courses | Arts | Honors Studio Arts III | catalog p. 19 |
| `divisions[2].departments[5].courses[5]` | Upper School Courses | Arts | Advanced Placement Studio Art | catalog p. 19 |
| `divisions[2].departments[5].courses[6]` | Upper School Courses | Arts | Advanced Topics: Art History | catalog p. 20 |
| `divisions[2].departments[5].courses[7]` | Upper School Courses | Arts | Honors Theater I | catalog p. 20 |
| `divisions[2].departments[5].courses[8]` | Upper School Courses | Arts | Honors Theater II | catalog p. 20 |
| `divisions[2].departments[5].courses[9]` | Upper School Courses | Arts | Honors Theater in Performance | catalog p. 20 |
| `divisions[2].departments[5].courses[10]` | Upper School Courses | Arts | Honors Concert Chorus | catalog p. 20 |
| `divisions[2].departments[5].courses[11]` | Upper School Courses | Arts | Honors String Ensemble I–IV | not found by title search |
| `divisions[2].departments[5].courses[12]` | Upper School Courses | Arts | Honors Upper School Band | catalog p. 21 |
| `divisions[2].departments[5].courses[13]` | Upper School Courses | Arts | Honors Cannon School Jazz Combo | catalog p. 21 |
| `divisions[2].departments[5].courses[14]` | Upper School Courses | Arts | Honors Modern Ensemble | catalog p. 21 |
| `divisions[2].departments[5].courses[15]` | Upper School Courses | Arts | Honors Music Technology I | catalog p. 22 |
| `divisions[2].departments[5].courses[16]` | Upper School Courses | Arts | Honors Music Technology II | catalog p. 22 |
| `divisions[2].departments[5].courses[17]` | Upper School Courses | Arts | Honors Music Technology III: Music Production | catalog p. 22 |
| `divisions[2].departments[5].courses[18]` | Upper School Courses | Arts | Honors Creative Design and Engineering I | catalog p. 22, 23 |
| `divisions[2].departments[5].courses[19]` | Upper School Courses | Arts | Honors Creative Design and Engineering II | catalog p. 23 |
| `divisions[2].departments[5].courses[20]` | Upper School Courses | Arts | Honors Creative Design and Engineering Studio | catalog p. 23 |
| `divisions[2].departments[6].courses[0]` | Upper School Courses | Innovation & Enterprise | Advanced Topics: Principles of Computer Science and Coding | catalog p. 40 |
| `divisions[2].departments[6].courses[1]` | Upper School Courses | Innovation & Enterprise | Advanced Placement Computer Science A | catalog p. 40 |
| `divisions[2].departments[6].courses[2]` | Upper School Courses | Innovation & Enterprise | Advanced Topics: Microeconomics: Politics and Policy | catalog p. 41 |
| `divisions[2].departments[6].courses[3]` | Upper School Courses | Innovation & Enterprise | Advanced Topics: Business and Entrepreneurship with Personal Finance | catalog p. 41 |
| `divisions[2].departments[6].courses[4]` | Upper School Courses | Innovation & Enterprise | Honors Business of Esports | catalog p. 41 |
| `divisions[2].departments[6].courses[5]` | Upper School Courses | Innovation & Enterprise | Honors Glocal Perspectives | catalog p. 40 |
| `divisions[2].departments[6].courses[6]` | Upper School Courses | Innovation & Enterprise | Senior Colloquium: Leadership | catalog p. 40 |
| `divisions[2].departments[6].courses[7]` | Upper School Courses | Innovation & Enterprise | Honors Yearbook | catalog p. 41 |
| `divisions[2].departments[7].courses[0]` | Upper School Courses | Physical Education | Wellness and Long-term Athletic Development | catalog p. 42 |

## Lower School — division and grade pages (S3–S10)

### Lower School landing (S3, academics/lower-school)

Lower School

## Welcome to Lower School!

Greetings Lower School Community,

I am ecstatic to serve as the Head of Lower School at Cannon School. To this role, I bring my experience in working with curriculum and teachers from lower and middle school, my enthusiasm in partnering with parents, and my love for educating students.

As you continue to learn more about our school community, we believe you will find that what makes our Lower School a place where your child can grow is summarized in the words of Cannon’s mission statement:

Cannon School nurtures relationships at the heart of learning and engages the learner in a journey of growth.

In fact, I encourage you to test us by looking for how we can bring these hallmarks of the Lower School experience, and Cannon’s mission, to life for your family:

- My child will thrive at this school and be known at this school.

- My child will grow and mature and fulfill potential at this school.

- My child will develop emotionally and socially in a healthy environment at this school.

- My child will cultivate natural and developed talents at this school. Intellectual curiosity and a love of learning will be developed through in-class activities, co-curricular classes like science, music, library, art, Spanish, physical education, technology, and STEM experiences.

I hope there will be many opportunities for us to talk and learn from one another as we move through this year. I am honored and humbled to lead and learn from the Lower School community at Cannon School.

Best,

Regina Nixon

Head of Lower School

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- Junior Kindergarten

- Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

###
Dr. Regina Nixon

View Profile
for Dr. Regina Nixon

Our incredible educators are dedicated to truly knowing and understanding every child,

both as learners and individuals.

### Early Childhood: JrK and Kindergarten (S4, academics/lower-school/early-childhood-jrkk)

Early Childhood: JrK and Kindergarten

## Hallmarks of Early Childhood Education at Cannon School

At Cannon School, a strong early childhood education has been a benchmark of our school's philosophy since our founding in 1969. Junior Kindergarten and Kindergarten are the foundation of a child's development and help set the stage for all future learning. Knowing this, our approach to these early years is purposeful, thoughtful, child-centered, and research-based.

### Nurturing curiosity, cultivating autonomy, inspiring learning, and celebrating each child—

These are the hallmarks of the early childhood experience at Cannon School.

-
Nurturing Curiosity

-
Cultivating Autonomy

-
Inspiring Learning

-
Celebrating Each Child

## Nurturing Curiosity

JrK and K children love to ask the question, "why?" As they observe the world around them, they are working to find meaning and understand everything’s inner-workings. We celebrate this natural part of who they are by encouraging questions, valuing their wonderings, and affirming that their inquisitiveness is a vital part of the learning experience. Cultivating this curiosity early creates children who are invested in the learning experience and who make the most out of every learning opportunity.

Curiosity = Engagement

## Cultivating Autonomy

Autonomy occurs when students feel a level of ownership in their learning and classroom environment. This is honed through self-direction, choice and voice. Our children are given a set of responsibilities that can be as simple as independently completing their morning routines to freely navigating the learning centers. They have choices in how they tackle their work, how they demonstrate their learning, and of course, in how they play. By celebrating the choices they make, JrK and K students feel their voices are heard within the classroom environment. It builds self-assurance, motivation, and an understanding of one's abilities.

Autonomy = Motivation and Responsibility

## Inspiring Learning

There is a joy that comes from learning. It spurs the imagination, engenders excitement, and leaves one thirsty for more. It is our responsibility to nurture this joy in every one of our students, and present them with the gift of learning that they cannot wait to unwrap. Therefore, we create unique learning experiences that are child-centered and meet the needs of different types of learners. Many of our learning activities are hands-on, collaborative, experiential, and multi-sensory.

Our curriculum builds a strong academic foundation in reading, writing, and math. Students are challenged with the proper support which promotes their growth as learners and critical thinkers.

Inspiration = Excitement

## Celebrating Each Child

Each child is unique. Therefore, we do not take a one-size-fits-all approach to teaching and learning. Our teachers are dedicated to knowing and understanding each child, both as a learner and as an individual. We know that children develop at different paces and grasp concepts in a myriad of ways. We celebrate these differences, building children’s confidence so they feel comfortable handling the new things that come their way.

Celebration = Knowing and Understanding

## Requirements for Admission

In addition to the standard readiness and entrance evaluations, the following criteria must be met:

- Junior Kindergarten students need to be 4 years old by the first day of school.

- Kindergarten students need to be 5 years old by the first day of school.

- Children must be able to use the bathroom independently before enrolling in Cannon School.

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- Junior Kindergarten

- Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

## What to look for:

## Explore Cannon's Junior Kindergarten and Kindergarten Programs

Junior Kindergarten

Students work towards becoming self-governing in Junior Kindergarten by progressively becoming more independent when completing workshops.

Learn more.

Kindergarten

In kindergarten, we focus and guide students to become confident communicators while being self-reliant and self-governing.

Learn more.

### Junior Kindergarten (S5, academics/lower-school/early-childhood-jrkk/jr-kindergarten)

Junior Kindergarten

## Welcome to Junior Kindergarten

In Junior Kindergarten, students begin to develop the habits of adaptive expertise. Junior Kindergarten students learn to be strategic and metacognitive about their work when approaching a project and are then reflective about their work upon completion.

Students work towards becoming self-governing in Junior Kindergarten by progressively becoming more independent when completing workshops.

Free play time allows the children to develop their communication skills as they relate to others and learn more about themselves. We foster risk-taking in our students during whole group instruction and workshops by providing an environment where it is safe to take a chance.

## Choose a subject to learn more about Cannon's JrK curriculum:

-
Art

-
Language Arts

-
Library

-
Makers

-
Math

-
Music

-
Physical Education

-
School Counseling

-
Science

-
Social Studies

-
Technology

## Art

In Junior Kindergarten, students work in table centers where they begin to develop their artistic skills and vocabulary, while learning to make choices about the kinds of art they are interested in creating. Elements of art are infused into each center, providing the foundation for future artistic endeavors. Centers include collage, drawing, painting, building, printmaking, and 3-D sculpting.

## Language Arts

The Junior Kindergarten literacy program develops phonological and phonemic awareness skills daily. Students garner an understanding of rhyme, phoneme isolation, blending, segmenting, and phoneme manipulation. Students will also practice early literacy skills including building alphabet knowledge and language awareness. We have a rich language environment that includes read-alouds, nursery rhymes, poetry, and morning messages.

Our beginning handwriting skills start with activities to strengthen the fine motor muscles needed for writing. We teach handwriting through a multisensory, systematic program and students are encouraged to write uppercase letters for learned sounds.

## Library

Junior kindergarteners enjoy an introduction to the library setting. They learn the role of the librarian and learn how to borrow, use, and care for library materials properly. Our ultimate goal is to cultivate a love of books and reading. During their library visits, students enjoy Read-Alouds and retell stories through drama, music, movement, and making projects.

## Makers

In Junior Kindergarten, students tackle design projects and building challenges related to the content being taught in the classroom. We often pick a topic in the classroom curriculum to explore with greater depth. For example, when studying transportation over water, students built sailboats and experimented with making sails of different shapes to see which boats sailed the best. Students primarily use fabrication materials, such as play-dough, popsicle sticks, and modeling clay over tools. The makerspace is also a great place for the development of fine motor skills such as tearing, pouring, cutting, pasting, and stacking.

## Math

Our Jr Kindergarten math program is rooted in Building Blocks: Number Worlds. This developmentally appropriate and research-based curriculum builds a strong foundation in number sense through playful exploration and hands-on learning. Children engage in counting, comparing quantities, recognizing shapes, and sequencing events in time—all through games, stories, songs, and manipulatives.

Through thoughtful conversations and active learning, students begin to notice patterns, make predictions, and solve simple problems using numbers and logic. Emphasis is placed on exploring mathematical thinking in real-world contexts, helping students build confidence, curiosity, and early reasoning skills.

## Music

The Junior Kindergarten music program emphasizes speech and singing along with moving and playing instruments. Basic musical concepts of beat, rhythm, instrument play and movement are introduced using songs and games, ostinato patterns, and activities to enhance musical experiences. The methodology of Carl Orff plays a major role in this program, helping each student relate to music in a natural child-centered way. Students are encouraged to sing in unison as well as individually and to recognize differences in pitch, timbre, tempo, mood, and dynamics. Junior Kindergarten students perform at the Teddy Bear Picnic in the fall.

## Physical Education

The focus for our junior kindergarteners is to provide fun, child-centered activities that focus on locomotor and balance skills. By providing stations for fitness, freeze dance, tag games and gymnastics, junior kindergarteners have the opportunity to hone their gross motor skill set through play. What better way is there to learn, than by having fun! Our goal as a Lower School Physical Education Department is for all students to be equipped with appropriate knowledge of varying sports and to develop a lifelong love for fitness.

## School Counseling

The Lower School years are ones of rapid growth and development. Each new birthday brings tremendous change. Typical challenges and characteristics of children, by age and developmental stage, can be found on the School Counseling webpage along with recommended resources.

## Science

Junior kindergarteners are encouraged to use their natural curiosities to develop into young scientists. The students are engaged by many discovery units covering topics such as space, plants, animals, weather, and healthy bodies.

## Social Studies

Our Junior Kindergarten Social Studies curriculum consists of students gaining insight on areas consisting of personal knowledge, family, getting along with others, making friends, problem solving socially, lending a helping hand, and the importance of taking care of the environment. Geography and mapping skills are implemented to allow for connections between home and the broader community.

## Technology

In Lower School, our learning design involves high engagement, structured so that students are drawn into appropriate levels of challenge. Curiosity and creativity are nurtured, along with consistent encouragement for teamwork and partner work. Students are encouraged to try new things, and to think and talk through problem-solving steps.

During the Junior Kindergarten year, students participate in a variety of hands-on challenges. At

the start, we primarily use “unplugged” resources, as students build confidence and

collaboration. As the year progresses, students use quality learning software appropriate to their

developmental level in the areas of literacy, reading, counting, patterns, and more.

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- Junior Kindergarten

- Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

### Kindergarten (S6, academics/lower-school/early-childhood-jrkk/kindergarten)

Kindergarten

## Welcome to Kindergarten

At Cannon School, we believe in fostering a lifelong love of learning supported through the habits of adaptive expertise. In kindergarten, we focus and guide students to become confident communicators while being self-reliant and self-governing.

We offer a challenging, caring, and motivating environment where students can grow and mature intellectually, socially, emotionally, and physically.

Daily lessons include individual, whole, and small group learning. The goal we have for our students is that they arrive to school each day excited to be fully engaged in the experience of learning at their individual developmental level. Co-curricular classes of music, art, makers, computer, science, technology, library, Spanish, wellness, and physical education complement our curriculum. The kindergarten year is one of tremendous growth, and educating the whole child is our primary focus.

## Choose a subject to learn more about Cannon's Kindergarten curriculum

-
Art

-
Language Arts

-
Library

-
Makers

-
Math

-
Music

-
Physical Education

-
School Counseling

-
Science

-
Social Studies

-
Spanish

-
Technology

## Art

The kindergarten art program continues with centers that offer choice and autonomy for students, allowing them to begin taking ownership over their own learning. Elements and principles of art are reinforced and reviewed from the previous year. Within each of the centers, students are exposed to a variety of different materials and are able to compare and make decisions about which media will be the best fit for their artwork. Students are encouraged to discuss their work with one another and offer suggestions or compliments.

## Language Arts

The kindergarten literacy program builds a solid foundation for all future reading and writing skills. A multisensory approach is used to help children build phonemic awareness and develop letter-sound recognition. Students learn to decode and encode (spell) words using explicit, systematic instruction during whole-group and small-group time. Students will apply these skills during small group time by reading developmentally appropriate texts. Comprehension skills are taught through read-alouds that are authentic, diverse, and rich in vocabulary and themes.

In our kindergarten program, we focus on laying the essential groundwork for your child to become a confident and skilled writer. We begin by immersing them in engaging stories, and encouraging discussions about the elements present in these stories. Your child will be exposed to shared and guided writing activities with the whole class as they begin their writing journey.

Throughout the year, your child will explore various writing genres such as non-fiction, opinion pieces, and poetry. We guide them through different stages of writing, starting with labeling and progressing to forming sentences. By the end of the year, your child will confidently write multiple sentences about specific topics. We foster a supportive and creative environment by meeting each student where they are in the writing process and growing their writing abilities.

Handwriting skills continue to be developed systematically using the Handwriting Without Tears curriculum. Students have a variety of opportunities to write at their developmental level through guided writing experiences.

## Library

Our kindergarteners explore diversity through literature, learn how to compare and contrast different versions of stories, and learn to differentiate between fiction and non-fiction. Kindergarteners learn basic research skills, becoming familiar with the library as a primary source of materials and develop their own literature preferences. The foundation for proper use of resources is reinforced extensively during their kindergarten year.

## Makers

In Kindergarten, students engage in hands-on learning experiences when visiting the maker space. The problems they explore are integrated with the existing curriculum, allowing for a greater depth of exploration and understanding. As students learned about arctic animals, they replicated their fur with fabrication materials such as cotton balls and felt sheets to see how well the fur was insulated under a heating pad. Students primarily use fabrication materials as opposed to tools at this age.

## Math

Kindergarten students use the Reveal Math curriculum to build strong number sense and a joy for mathematical discovery. Through hands-on activities, guided discussions, and purposeful play, students learn to recognize, count, and compare numbers, understand simple addition and subtraction, identify and build shapes, and measure using informal and formal tools.

Teachers use games, manipulatives, and interactive technology to foster an environment where students take risks, talk through their thinking, and explore different ways to solve problems. Concepts are revisited throughout the year, deepening understanding and allowing students to develop flexibility with early math strategies.

## Music

In music, kindergarten students are encouraged to sing in unison as well as individually and to recognize differences in pitch, rhythm, beat, timbre, tempo, mood, and dynamics. Expression of the beat and the playing of simple rhythm patterns using classroom percussion instruments increases the understanding of beat and rhythm. Emphasis is placed on helping each student experience the confidence and enjoyment of producing music vocally and instrumentally as well as moving and listening to many different kinds of music. Basic musical concepts are introduced using songs, speech, games, patterning, and activities designed to begin developing listening, reading and writing skills. The methodology of Carl Orff plays a major role in this program, helping each student relate to music in a natural, child-centered way. Kindergarten students perform at the Mother's Day Tea and at their Moving Up Ceremony.

## Physical Education

In kindergarten, our students fine tune their locomotor skills by increasing the intensity of their play from that of the junior kindergarten level. Students improve hand/eye coordination through throwing and catching skills, jump rope, parachute fun, beach ball, and bean bag games. As we continue to improve coordination and fine motor control, students progress to activities such as rock climbing, gymnastics and tumbling, as well as age appropriate sports drills. While all of this sounds like a lot of fun (and it is!), we nurture the gross motor development of each child through these varying activities. Our goal as a Lower School Physical Education Department is for all students to be equipped with appropriate knowledge of varying sports and to develop a lifelong love for fitness.

## School Counseling

The Lower School years are ones of rapid growth and development. Each new birthday brings tremendous change. Typical challenges and characteristics of children, by age and developmental stage, can be found on the School Counseling webpage along with recommended resources.

## Science

Kindergarteners are naturally curious and inquisitive with all of the science topics we study. A real goal of this year in science is to help them form predictions and then eventually conclusions based on what they observe. This is done through mini units of study covering space, weather, layers of Earth, animals, and seed germinations.

## Social Studies

Kindergarten focuses on "My School and Family" through our social studies curriculum. Students are active participants, experiencing social studies through innovative teaching practices that include role-playing, creative simulations, dynamic group projects, and other interactive activities. Some of the topics include: How do we get along in school? Why is it important to learn from each other? Why do schools have rules? Who works at your school? How are we good helpers at school?

## Spanish

The program is a marriage of the Communicative Language Approach (CLT) and the Foreign Language in the Elementary School (FLES) approach. Both approaches encourage self-expression and communication. Furthermore, the FLES approach emphasizes cross-curricular content and tasks at grade level.

Kindergarten students are introduced to Spanish in a friendly, hands-on, interactive way through songs, chants, choral repetitions, stories, games, and crafty activities. They go from simple units on greetings, colors, shapes, numbers, that are reviewed throughout the year, to more complex units on fruits, foods, toys, and farm animals. They learn to form sentences with basic verbs such as is, want, love, there is/are. They go on imaginary trips to South America, covering three major habitats and six animals.

## Technology

In Lower School, our learning design involves high engagement, structured so that students are drawn into appropriate levels of challenge. Curiosity and creativity are nurtured, along with consistent encouragement for teamwork and partner work. Students are encouraged to try new things, and to think and talk through problem-solving steps.

During the kindergarten year, students are introduced to coding, robotics, and computational thinking through the use of developmentally appropriate resources, both “plugged” and “unplugged.” They participate in a variety of hands-on maker challenges.

Technology is integrated into classroom curriculum units to promote information literacy, creative work, and critical thinking. Students also use quality learning software appropriate to their developmental level in the areas of literacy and reading, and in math and problem solving.

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- Junior Kindergarten

- Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

### First Grade (S7, academics/lower-school/first-grade)

pause slideshowplay slideshow

First Grade

First Grade

<>

## Welcome to First Grade

First grade is an exciting developmental year, which provides students with a foundation for a lifetime of learning. Homerooms have a lead teacher and a full-time assistant. This allows small group and one-on-one interaction on a regular basis to best meet the needs of each child. Along with the focus on academics, we also recognize the importance of learning through play. Learning is presented through actively engaged lessons and activities.

Adaptive expertise is the foundation of all learning where children are encouraged to be curious, creative, and willing to take risks while being reflective about their learning.

Communication of one's thinking and respectful collaboration with others is part of each day’s learning. Through this process, students learn more about themselves and their own abilities, allowing teachers to challenge and enrich by meeting the needs of all students.

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

## Choose a subject to learn more about Cannon's First Grade curriculum

-
Art

-
Language Arts

-
Library

-
Makers

-
Math

-
Music

-
Physical Education

-
School Counseling

-
Science

-
Social Studies

-
Spanish

-
Technology

## Art

In first grade, students begin working in studios around the art room and learn how to care for the art studio. In addition to learning new techniques and media, students focus on where artists get their ideas and begin thinking about their own lives and what matters to them. Experiences, memories, passions, and the imagination all take center stage in the students’ work. Studios include drawing, painting, collage, paper sculpture, clay, and printmaking.

## Language Arts

First grade is a year of great growth and exploration. Our literacy block is a student-centered, structured time where students receive foundational skills instruction, practice reading comprehension strategies, and have rich literacy experiences that foster their growth. Students are exposed to multiple genres of read-aloud texts and are asked to collaborate with their classmates to answer deep, meaningful comprehension questions. Students learn to think, talk, and share ideas about a text all while becoming skilled listeners and valuing the thinking of others.

At the heart of our literacy block is our small group time. This time is where we lay the foundation for students growing independence as readers. During this small group time students receive instruction based on their targeted developmental level. Depending on the student’s unique learning needs, decoding and encoding (spelling) skills, phonemic awareness, high-frequency word recognition, comprehension strategies, and fluency are skills that may be addressed during this time.

First grade students utilize the Handwriting Without Tears program. This easy-to-learn curriculum provides students the opportunity to learn correct letter formation. It emphasizes appropriate letter size, line placement, spacing, and neatness.

As in reading, first grade is a year full of growth for writing. Students begin the year by orally telling their stories and then learning how to transfer their spoken stories to print. Through guided and shared whole-class writing, as well as read-aloud mentor texts, students are provided with scaffolded opportunities to grow their craft as a writer. Students will explore and write various genres including personal narratives, friendly letters, poetry, non-fiction stories, and opinion pieces.

## Library

Students continue to cultivate their reading, listening, discussion, and story retelling skills. They study the components of fiction (character, setting, plot, style, etc.) and of non-fiction (contents, index, etc.). In first grade, students begin learning how to locate resources using the call number system. As a result, they learn how to identify and access materials in every major section of the library. In partnership with the Technology Department, research techniques are also introduced.

## Makers

In first grade, students engage in hands-on learning experiences when visiting the maker space. The problems they explore are integrated with the existing curriculum, allowing for a greater depth of exploration and understanding. When students learned about 3d shapes in math class, they designed 3d shaped robots out of recycled food packaging containers in various 3d shapes. Students primarily use fabrication materials at this age, and they receive safety training on a few tools, such as popsicle stick cutters.

## Math

In first grade, Reveal Math encourages students to develop their number sense and problem-solving skills through a balance of structure and exploration. Students build fluency with addition and subtraction strategies, explore place value concepts, measure with standard units, and learn to collect and interpret simple data. They also investigate patterns, time, money, and two-dimensional and three-dimensional shapes.

Instruction emphasizes conceptual understanding and strategy sharing, allowing students to explain their thinking, try multiple approaches, and build confidence. Teachers incorporate games, tools, group work, and digital resources to create a rich and engaging mathematical experience.

## Music

In first grade music, the development of the singing voice continues. The use of solfege games and the playing of Orff and classroom percussion instruments serve to increase the students' awareness and understanding of simple melodic and rhythmic patterns found in varied songs and listening selections. Emphasis is placed on helping each student experience the confidence and enjoyment of producing music vocally and instrumentally. Timbre, dynamics, and other basic musical concepts are studied in more depth. Movement is used to reinforce the concept of musical form. Over the course of the school year students learn to read, write, and create rhythms using quarter notes, eighth notes, and quarter rests. Students perform at a Spring Concert at Arts Jam, a schoolwide celebration of the arts.

## Physical Education

First grade PE classes experience a vast exposure to sports of all kinds, designed to improve coordination, flexibility and strength with an age appropriate emphasis. In first grade, the primary goal is for students to begin to master basic locomotor and non‐locomotor skills and concepts. Spatial awareness will continue to develop. By the end of first grade, students should be able to demonstrate mature form when performing a variety of basic manipulative skills such as kicking, throwing, striking and dribbling. Students are given the opportunity to participate in activities such as cooperative games, target throwing games, soccer, gymnastics/tumbling, scooters, tee ball, track and field, basketball, running/jogging, tennis, and marshmallow ball throughout the year. Our goal as a Lower School Physical Education Department is for all students to be equipped with appropriate knowledge of varying sports and to develop a lifelong love for fitness.

## School Counseling

The Lower School years are ones of rapid growth and development. Each new birthday brings tremendous change. Typical challenges and characteristics of children, by age and developmental stage, can be found on the School Counseling webpage along with recommended resources.

## Science

First graders begin to develop their scientific skills by sorting, classifying, measuring and developing an understanding of the natural world. Curiosity is fostered by examining Earth and its natural resources, exploring sound and light waves, and observing plants and animals as they grow and develop. First grade is a packed, fun-filled, hands-on year of science exploration!

## Social Studies

First grade focuses on "my community" using the Social Studies Alive! curriculum. Students are active participants, experiencing social studies through innovative teaching practices that include role-playing, creative simulations, dynamic group projects, and writing activities. Some of the topics include: What is a community? What is geography? How do people use the environment? Who provides services in a community? How can I be a good shopper? How can one person make a difference in a community? What does a good citizen do?

## Spanish

The program is a marriage of the Communicative Language Approach (CLT) and the Foreign Language in the Elementary School (FLES) approach. Both approaches encourage self-expression and communication. Furthermore, the FLES approach emphasizes cross-curricular content and tasks at grade level.

First grade students review all basic Kindergarten material. They expand vocabulary for units on foods, animals, and toys. They learn new units on clothes, furniture, and their set of Q&As about personal information, all of which require sentence building. They continue their culture journey in South America learning about five countries, three main habitats, animals, and salient geographical features.

## Technology

During the first grade year, students experience coding, robotics, and computational thinking through the use of developmentally appropriate resources, both “plugged” and “unplugged.” They participate in a variety of hands-on challenges to develop soft skills, critical thinking, and collaboration, all while having fun!

Students become confident in using technology to reinforce, enrich, and enjoy integrated learning. This includes a variety of digital resources and creative work. They also use quality learning software appropriate to their developmental level in the areas of literacy and reading, and in math and problem solving.

### Second Grade (S8, academics/lower-school/second-grade)

Second Grade

## Welcome to Second Grade

In second grade, the student is at the core of all that we do. Homerooms have a lead teacher and a full-time assistant. Students are encouraged to take risks and become independent learners. In addition, students work collaboratively in groups to broaden their understanding of the subject at hand. Art, computer, science, library, music, physical education, and Spanish help to facilitate the development of the whole child.

## Choose a subject to learn more about Cannon's Second Grade curriculum:

-
Art

-
Language Arts

-
Library

-
Makers

-
Math

-
Music

-
Physical Education

-
School Counseling

-
Science

-
Social Studies

-
Spanish

-
Technology

## Art

In second grade, students continue working in various studios, following the TAB methodology (Teaching for Artistic Behavior). The focus is for students to explore a variety of media and art forms through studios which include drawing, painting, pottery, collage, paper sculpture, and printmaking. Students are encouraged to spend time in each studio throughout the year as they work to hone their skills and develop new passions.

## Language Arts

In second grade we focus on fostering growing independence as skilled readers. Reading instruction includes whole-class and small-group instruction to teach the components of reading: phonological awareness, phonics and encoding (spelling), decoding, oral reading fluency, vocabulary development, high-frequency word recognition, and reading comprehension. Reading comprehension strategies are taught directly through read-aloud experiences with fiction and nonfiction texts. Students are taught how to discuss texts with each other and build upon each other's thoughts and opinions.

Small group differentiated instruction is a key component of our reading curriculum. Small group time meets learners where they are and includes a combination of explicit, systematic phonics instruction; decoding; phonemic awareness; guided spelling; high-frequency word recognition; fluency practice; and comprehension strategies.

Through word study, our students are provided with guided spelling instruction that is explicit, systematic, and teacher-guided. Students learn how to recognize patterns in words, spell by sounds and syllables, and add inflectional endings, prefixes, and suffixes to base words. Through word study, students also apply meaning to word parts which increases their vocabulary knowledge.

Second grade is a year full of development and growth as students become more independent. Mentor texts are read aloud often and allow students to hone in on an author’s craft that they may use in their writing pieces. Throughout the school year students are taught the writing process and will work to refine their writing skills through revising and editing self-selected pieces. Students work to create pieces in multiple genres including fiction, non-fiction, opinion, friendly letters, and poetry,

Handwriting skills continue to be developed systematically using the Handwriting Without Tears curriculum. Students will use this year to firm up their print skills in preparation for cursive instruction in third grade.

## Library

Second graders are exposed to many kinds of literature: folktales from around the world, poetry, and biographies. Students continue to hone their research and technology skills diving into topics such as dinosaurs and historical figures. Students intertwine their research skills with their love of literature by reading non-fiction and fiction books.

## Makers

In second grade, students engage in hands-on learning experiences when visiting the maker space. The problems they explore are integrated with the existing curriculum, allowing for a greater depth of exploration and understanding. In a language arts unit on biographies, students researched modern-day problems related to their biographers' work, and they engaged in a problem-based learning experience by designing prototypes of solutions to their research problem. Students primarily use fabrication materials and receive safety training on tools such as hot glue guns when appropriate.

## Math

Second graders deepen their understanding of number operations and expand their place value knowledge through the Reveal Math curriculum. Students learn to solve more complex addition and subtraction problems, are introduced to multiplication and division concepts, and explore measurement, money, time, geometry, and data in greater depth.

Through hands-on tasks, visual models, and structured problem-solving routines, students are encouraged to make connections, communicate their thinking, and apply strategies in real-world contexts. Activities promote both independence and collaboration as students move toward fluency and flexible thinking.

## Music

The use of the Orff Approach continues in second grade music. Singing in harmony is introduced with simple rounds and melodic ostinati. More advanced combinations of rhythmic and melodic patterns are introduced for performance, listening, movement, and notation. Continued progress in the area of "keeping the beat" to music is advanced through the use of circle games and folk dances. Students use classroom percussion instruments and Orff instruments to create and perform music. Examples of classical, folk, contemporary, and world music are used throughout the school year to enhance each student's development in understanding musical concepts. Students are able to audition for our annual Lower School Talent Show and all students perform a Spring Concert at Arts Jam, a schoolwide celebration of the arts.

## Physical Education

In second grade PE, students demonstrate mastery of basic locomotor and nonlocomotor skills while performing to changing conditions and expectations. Students progress towards mature form in complex manipulative skills such as foot dribble and throwing. They are able to sustain physical activity for longer periods of time and have a deeper understanding of the benefits of physical activity. Students work independently and in small groups during our games and activities. Second grade students should also exhibit consideration for and cooperation with classmates and teachers. Students are given the opportunity to participate in activities such as target throwing games, soccer, gymnastics/tumbling, scooters, tee ball, track and field, basketball, running/jogging, tennis, jump rope, dance, recreational games (corn hole, horseshoes, bowling) and marshmallow ball throughout the year. Students in second grade also participate in The Cannon Health and Performance (CHAMP) Test. The assessment includes a variety of health-related physical fitness tests that assess aerobic capacity: muscular strength, muscular endurance, speed, power and flexibility. Scores from these assessments are compared to our overall class averages to determine students’ overall physical fitness and suggest areas for improvement when appropriate. Our goal as a Lower School Physical Education Department is for all students to be equipped with appropriate knowledge of varying sports and to develop a lifelong love for fitness.

## School Counseling

The Lower School years are ones of rapid growth and development. Each new birthday brings tremendous change. Typical challenges and characteristics of children, by age and developmental stage, can be found on the School Counseling webpage along with recommended resources.

## Science

Second graders love to conduct experiments! A major goal of second grade is to do real experiments which can lead them to scientific conclusions. They jump right into the year by taking a look at the cosmos, leading to a study of Earth and its landforms. Second graders love dirt! They study soil and its importance for all types of life. Students study soil properties like absorption and permeability and do fun experiments like filtering water and examining sedimentation. They examine properties of water and rocks. Later in the year the students will learn about seed germination, plant growth, and examine animals in a variety of ecosystems.

## Social Studies

The second grade social studies curriculum builds a solid foundation for understanding our place in the world historically, culturally, and geographically. The students are introduced to a wide variety of topics from historical events such as early immigration to contemporary government and how it runs. Some of the other topics they are exposed to include citizenship, geography, public and private community service, and having a voice in our community.

## Spanish

The program is a marriage of the Communicative Language Approach (CLT) and the Foreign Language in the Elementary School (FLES) approach. Both approaches encourage self-expression and communication. Furthermore, the FLES approach emphasizes cross-curricular content and tasks at grade level.

Students expand on the units learned in first grade by doubling the vocabulary and learning interrogative sentences where they learn you variation for verbs want/love/have. They handle plural descriptive sentences and dive deeper into gender in Spanish nouns and adjectives. They start practicing a restaurant script that enables them to greet, order, and comment on food at a restaurant. They do grade-level math with numbers 0-100 and work through 8 levels of Spanish phonics. Their personal information Q&A’s set is expanded and memorization is encouraged. For the culture segment, they study all the Spanish-speaking countries in South America, learn about more fauna and flora, as well as remarkable landforms and bodies of water.

## Technology

In Lower School, our learning design involves high engagement, structured so that students are drawn into appropriate levels of challenge. Curiosity and creativity are nurtured, along with consistent encouragement for teamwork and partner work. Students are encouraged to try new things, and to think and talk through problem-solving steps. Students follow core values as they use media and technology.

During the second grade year, students experience coding, robotics, and computational thinking through the use of developmentally appropriate resources. Students use digital resources alongside hands-on learning. They participate in a variety of hands-on maker challenges and creative presentations.

Technology is integrated into classroom curriculum units to promote information literacy, creative work, and critical thinking. Students also use quality learning software appropriate to their developmental level in the areas of literacy and reading, and in math and problem solving. In information literacy, we emphasize comprehension, communication, organization, and research skills. This program helps students increase their sophistication levels in currently available technology, but also incorporates "learning to learn" in a way that will transfer to the technology tools of the future.

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

### Third Grade (S9, academics/lower-school/third-grade)

Third Grade

## Welcome to Third Grade

Third grade is a fun-filled year of growth and change for both students and parents. Students begin the process of taking responsibility for their learning and behavior. They make the transition from learning to read to reading to learn.

Individual learning styles are recognized. A variety of lessons, whole and small group instruction, cooperative learning and workshop activities encourage risk taking, creativity, curiosity, and strategic thinking. Students have ample opportunities to be reflective in their daily learning.

Classroom learning is extended through thematic integration of co-curricular classes: music, library, physical education, art, computer, and world language.

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

## Choose a subject to learn more about Cannon's Third Grade curriculum:

-
Art

-
Language Arts

-
Library

-
Makers

-
Math

-
Music

-
Physical Education

-
School Counseling

-
Science

-
Social Studies

-
Spanish

-
Technology

## Art

By third grade students have begun to work and think as artists, taking care of the art studio and materials as their own and developing a wide range of skills. Students research and plan projects before executing and are asked to give thoughtful consideration to the types of materials they want to use. Experimentation and exploration continue to be emphasized. Students work autonomously through the TAB (Teaching for Artistic Behavior) program, using historical works, books, and experiences as important resources. Studios include drawing, painting, collage, sculpture, pottery, printmaking, and fiber arts.

## Language Arts

Reading instruction integrates whole-class and small-group instruction to teach components of reading: phonics and decoding, oral reading fluency, vocabulary development, high-frequency word recognition, and reading comprehension. Comprehension strategies are introduced, practiced, and reviewed on a developmental continuum, beginning with visualizing and progressing to more cognitively challenging strategies, including making inferences, synthesizing information, questioning, using text features, and determining important ideas. These components are woven together throughout the year through literacy and language experiences.

Small group reading instruction is provided at an appropriate developmental level. Teachers form flexible groups of students based on similar reading behaviors including word recognition, use of reading strategies, fluency, and comprehension skills. Our program integrates foundational skills instruction, practice in reading comprehension strategies, and rich literacy experiences with explicit social skills instruction and activities that foster students’ growth as responsible, caring, and collaborative people.

Students are taught to write through focused lessons surrounding generating ideas, organization, sentence fluency, word choice, conventions, and voice. Skills are taught and built upon throughout the school year based on the developmental needs of our students. After immersion in the elements of the writing process, students revise, proofread, publish, and share final drafts with their peers. Students are taught to write in various genres including personal narratives, fictional narratives, friendly letters, “how-to” stories, as well as persuasive pieces.

Handwriting Without Tears is a developmental and engaging, multi-sensory program that is fun and easy to learn. The program is designed to help students naturally transition from print to cursive. Cursive is simplified by eliminating slants, loops, and curlicues.

Word Study is approached using a developmental approach to phonics, word recognition, vocabulary, and spelling instruction. Students read, define, and look for patterns within the words and then sort by identifying patterns within the words. Students build morphological awareness, use context and word part clues, and focus on syntax when applying word study to their independent reading and writing.

## Library

Students learn how to use the digital library catalog to locate materials. In addition, during the library experience, we seek to support and reinforce concepts learned in other classes. In continued partnership with the technology program, students consistently incorporate the use of the research methods along with print and digital resources.

## Makers

In third grade, students primarily engage in problem-solving while visiting the maker space. The problems they explore are integrated with the existing curriculum, allowing for a greater depth of exploration and understanding. Whether it’s building a land bridge for safe animal crossing or a shopping mall to meet the needs of its patrons, we begin by exploring the problem. The problems explored will involve an engineering design thinking approach where students define the problem, ideate from a wide range of solutions, and then narrow those solutions as they build a plan and develop a prototype. Upon successful completion of safety training, a variety of tools and materials are available for this age group.

## Math

In third grade, students take on more advanced mathematical thinking as they build fluency in multiplication and division, deepen their understanding of place value, and begin working with fractions. Reveal Math emphasizes conceptual development through real-world problem solving, collaborative reasoning, and consistent review of key skills.

Students also explore area, perimeter, time, mass, and volume, as well as more complex data and geometry concepts. Rich tasks, discussions, and visual models help students explain their reasoning, develop confidence, and become flexible problem solvers.

## Music

In third-grade music students become more independent musicians with the introduction of the woodwind instrument, the recorder. Students increase their confidence in reading music, understanding dynamics, and playing as a soloist and with an ensemble as they progress through a series of "tests" to earn "belts" through a program called, "Recorder Karate." More advanced rhythmic and melodic patterns are introduced using Orff and classroom percussion instruments as well as the ukulele. Students create, improvise, perform melodic and movement pieces. Students further develop their singing voices and develop harmony using rounds, canons, melodic and rhythmic ostinati. Examples of classical, folk, contemporary, and world music are used throughout the school year to enhance each student's development in understanding musical concepts. Students are able to audition for our annual Lower School Talent Show and all students perform at a Recorder Assembly and a Spring Concert at Arts Jam, a schoolwide celebration of the arts.

## Physical Education

In third grade, students seek to improve their motor skills by applying movement concepts to skills. Students work on body management skills in game‐like settings. Specific sports skills are also emphasized such as in volleyball by hitting to an open space or cutting to an open space in basketball. While we focus on skill acquisition in every grade level, we begin to add more competitive game play starting in third grade. Therefore, students need to apply rules, principles, problem-solving skills, and concepts to traditional and nontraditional movement settings in order to be successful. Students are given the opportunity to participate in activities such as target throwing games, soccer, gymnastics/tumbling, scooters, tee ball, track and field, basketball, running/jogging, tennis, jump rope, dance, recreational games (corn hole, horseshoes, bowling) and marshmallow ball throughout the year. Students in third grade also participate in The Cannon Health and Performance (CHAMP) Test. The assessment includes a variety of health-related physical fitness tests that assess aerobic capacity: muscular strength, muscular endurance, speed, power and flexibility. Scores from these assessments are compared to our overall class averages to determine students’ overall physical fitness and suggest areas for improvement when appropriate. Our goal as a Lower School Physical Education Department is for all students to be equipped with appropriate knowledge of varying sports and to develop a lifelong love for fitness.

## School Counseling

The Lower School years are ones of rapid growth and development. Each new birthday brings tremendous change. Typical challenges and characteristics of children, by age and developmental stage, can be found on the School Counseling webpage along with recommended resources.

## Science

Third grade scientists begin to come up with their own scientific questions which can be tested through experimentation. After taking a close look at the planets in our solar system, students focus on Earth, particularly water and its properties. Third graders spend lots of time in hands-on activities to examine what makes water so important to life on Earth. They spend time learning about simple machines and how they help us do work. They finish by examining the interconnectedness of life on Earth by observing plants grow and exploring food chains and webs.

## Social Studies

In social studies, students explore regions of our country through geography, diversity, population density, agriculture, history, and government. Interactive student notebooks invite students to be active participants in their own learning. Understanding of community and citizenship is expanded through social studies projects, guidance lessons, field trips and outreach events.

Our third grade uses Social Studies Alive! Regions of Our Country, as well as other materials, which truly engage students in learning. Children experience concepts through innovative activities that include dramatic role-playing, creative simulations, dynamic group projects, and writing activities.

As students explore different social studies topics, they learn to think like social scientists.. They take the perspective of the following social science traditions: economics, geography, political science, and history. They wear these different social scientist “hats” as they study social studies themes.

## Spanish

The program is a marriage of the Communicative Language Approach (CLT) and the Foreign Language in the Elementary School (FLES) approach. Both approaches encourage self-expression and communication. Furthermore, the FLES approach emphasizes cross-curricular content and tasks at grade level.

Students build upon level 2, reviewing and adding vocabulary to the core units. Action verbs and the third singular pronoun (He/She) are introduced allowing them to ask and talk about routine activities at home, at school, as well as adventures in an imaginary trip to Costa Rica. They learn seasons and weather, and they can discuss preferences on climate and activities. The main form of language practice in the classroom is rotations and choices, where they alternate playing learning games that build conversation and fluency. At this level, students can read Spanish independently and can use the bilingual mini library. For the cultural segment, third grade focuses on Central America and the Caribbean, zooming in on Costa Rica. As technology is integrated into the homeroom curriculum, students use those skills to create Google slide presentations on a Spanish speaking country of choice.

## Technology

In Lower School, our learning design involves high engagement, structured so that students are drawn into appropriate levels of challenge. Curiosity and creativity are nurtured, along with consistent encouragement for teamwork and partner work. Students are encouraged to try new things, and to think and talk through problem-solving steps. Students follow core values as they use media and technology.

During the third grade year, students work with robotics to create, load and test block-based scripts to control movement, LEDs, drawing, and more. Students also gain experience with coding using a variety of resources, including programming with Scratch 3.0. Our students grow in their adaptive learning through fun problem-solving, creativity, and teamwork!

Technology is integrated into classroom curriculum units to promote information literacy, creative work, and critical thinking. Students also use quality learning software appropriate to their developmental level in the areas of literacy and reading, and in math and problem solving. Tech basics include digital citizenship education, keyboarding/writing, creative mixed media and presentations, and information literacy. Special emphasis is placed on comprehension, communication, organization, and research skills. This program helps students increase their sophistication levels in currently available technology, but also incorporates "learning to learn" in a way that will transfer to the technology tools of the future.

Mrs. Toteno continues to impress me with her ability to captivate and engage our nine-year-old during this year. Despite all the challenges we face, she models and teaches our child to persevere and show strength, not only academically, but emotionally and socially.

### Fourth Grade (S10, academics/lower-school/fourth-grade)

Fourth Grade

## Welcome to Fourth Grade

The fourth-grade year is a busy and challenging year as students take on more responsibility and accountability for themselves and their organizational skills. There are inquiry based projects and various writing assignments to complete in all subject areas. Fourth graders continue to hone their skills in physical education, art, library, computer, music, science lab, and world language.

## In This Section

- Welcome to Lower School

- Early Childhood: JrK and Kindergarten

- First Grade

- Second Grade

- Third Grade

- Fourth Grade

- LS Student Life

## Choose a subject to learn more about Cannon's Fourth Grade curriculum:

-
Art

-
Language Arts

-
Library

-
Makers

-
Math

-
Music

-
Physical Education

-
School Counseling

-
Science

-
Social Studies

-
Spanish

-
Technology

## Art

In fourth grade, students continue working as artists through TAB (Teaching for Artistic Behavior) and are becoming adept at the studio habits that have been taught each year. Materials and techniques are taught at the beginning of class, and students are given ample time to explore and experiment. Students improve upon their skills through practice and are asked to reflect upon their creations through critiques and written observations. Students work autonomously, planning and creating works of art based on personal experiences and interests. The work created is authentic and unique to each student. Students are encouraged to express themselves through their artwork and given resources and guidance to do so. Studios include drawing, painting, collage, sculpture, pottery, printmaking, and fiber arts.

## Language Arts

The fourth-grade reading and language arts program intentionally devotes time to building relationships, blending social development and academic instruction, and making connections between what they know and what they are learning.

Reading instruction is taught in whole and small groups using diverse texts from multiple genres. Students engage with texts, learning and discussing how and why authors organize certain information. Students use a variety of comprehension strategies, such as questioning, visualizing, making inferences, determining importance, summarizing, and synthesizing. These skills are practiced and applied throughout the school year in whole-group and small-group settings. Teachers form flexible small groups based on similar reading behaviors such as reading strategies and comprehension skills. Small group instruction focuses on developing and establishing student-led book clubs. Students read independently daily, practicing skills learned, such as self-monitoring.

Students are taught to write with lessons focused on generating ideas, organizing, word choice, conventions, and voice. Throughout the school year, students go through the writing process; revising, proofreading, publishing, and sharing their final drafts with peers. Students are taught to write in a variety of genres, including personal narratives, fiction, nonfiction, and opinion pieces.

Handwriting Without Tears is a developmental, engaging, multi-sensory program that is fun and easy to learn. The program is designed to help students naturally transition from print to cursive. Cursive is simplified by eliminating slants, loops, and curlicues. Students in fourth grade continue the work established in third-grade cursive writing.

Word study is taught with a focus on morphological awareness. During word study lessons students learn how words are constructed and the meaning of the parts. That knowledge will transfer to new words the students encounter on their own.

## Library

Fourth graders incorporate the use of research methods in a large Biographical Project called Living Museum. During this project they cultivate their reading, listening, discussion and story retelling skills. They also learn to locate resources, use criteria to choose credible sources as well as to paraphrase and summarize information, avoiding plagiarism to create an all encompassing presentation in front of family, friends and students.

## Makers

In fourth grade, students primarily engage in problem-solving while visiting the maker space. The problems they explore are integrated with the existing curriculum, allowing for a greater depth of exploration and understanding. Whether it’s building a haunted house to solve an area and perimeter challenge or an American Revolution fort that can withstand attack, we begin by defining the problem, ideate from a wide range of solutions, and then narrow those solutions as we build a plan and develop a prototype. Upon successful completion of safety training, a variety of tools and materials are available for this age group. Students also have the opportunity to gain additional experience with some of the makerspace technologies, such as laser cutters and CNC machines, during open lab times.

## Math

Fourth grade students expand their understanding of numbers, operations, and geometry through challenging and meaningful math experiences. Using Reveal Math, they develop strategies for working with multi-digit numbers, fractions, and decimals; solve multi-step problems; and explore concepts like angles, symmetry, and measurement conversions.

Instruction emphasizes reasoning, modeling, and clear communication. Students are encouraged to justify their thinking, compare strategies, and engage in collaborative learning. With consistent practice, feedback, and opportunities for application, students develop confidence and ownership of their mathematical growth.

## Music

In fourth grade music, increased awareness of healthy vocal technique is emphasized alongside a basic understanding of music theory. Instrumentally, students reinforce their skills learned on the soprano recorder when they are introduced to the alto recorder. Skills in reading and writing musical notation are reinforced through singing, movement activities and folk dances, and playing Orff and classroom percussion instruments, ukuleles, and recorders. Students read, write, and perform more advanced rhythmic and melodic patterns. Examples of classical, folk, contemporary, and world music are used throughout the school year to enhance each student's development in understanding musical concepts. Students are able to audition for our annual Lower School Talent Show and all students perform at Olympic Day, Spring Concert at Arts Jam, a schoolwide celebration of the arts, and their Moving Up Ceremony.

## Physical Education

In fourth grade PE, students should be able to demonstrate activities that develop muscular strength, muscular endurance, flexibility, and cardiovascular endurance. Students focus on the importance of motor skills and movement concepts to be successful in physical activity and/or sports. Students continue to work successfully in a group, regardless of personal differences while participating in games or activities. Students are given the opportunity to participate in team sports such as: basketball, volleyball, handball, lacrosse, softball, football, soccer and hockey. Students are given the opportunity to participate in individual sports such as: tennis, gymnastics/tumbling, track & field, basketball, jump rope, dance, and recreational games (corn hole, horseshoes, bowling). Students in fourth grade also participate in The Cannon Health and Performance (CHAMP) Test. The assessment includes a variety of health-related physical fitness tests that assess aerobic capacity; muscular strength, muscular endurance, speed, power and flexibility. Scores from these assessments are compared to our overall class averages to determine students’ overall physical fitness and suggest areas for improvement when appropriate. Our goal as a Lower School Physical Education Department is for all students to be equipped with appropriate knowledge of varying sports and to develop a lifelong love for fitness.

## School Counseling

The Lower School years are ones of rapid growth and development. Each new birthday brings tremendous change. Typical challenges and characteristics of children, by age and developmental stage, can be found on the School Counseling webpage along with recommended resources.

## Science

In the beginning of fourth grade, students focus on becoming better scientists by improving their general experimentation skills. After working on their research skills by studying the planets, students do science lab work to learn more about Earth science through the study of how earthquakes and volcanoes shape the planet. Fourth graders spend time experimenting with magnetism and electricity, observing seed germination and plant growth, and investigating animals through research and presentation of their findings.

## Social Studies

The fourth grade social studies program, Social Studies Alive! America’s Past, covers American history from the first migrations into the Americas through the 20th century. Intense interaction with the personalities, places, and events that structured our nation leads students to be both keen observers of and informed participants in U.S. history.

## Spanish

The program is a marriage of the Communicative Language Approach (CLT) and the Foreign Language in the Elementary School (FLES) approach. Both approaches encourage self-expression and communication. Furthermore, the FLES approach emphasizes cross-curricular content and tasks at grade level.

Students build upon level 3, reviewing and adding vocabulary to every core unit. They learn the plural pronouns we, you, and they which increases the number of dialogues, exchanges, and topics for writing. During the action verb unit, they learn about the adventures in an imaginary trip to Spain. They continue with rotations and choices as the main form of material recycling and Spanish acquisition. For the cultural segment, fourth grade focuses on Spain, Guam, Equatorial Guinea, and Mexico. Students continue to use their technology and research skills to create Google slide presentations on a Spanish-speaking country of choice.

## Technology

In Lower School, our learning design involves high engagement, structured so that students are drawn into appropriate levels of challenge. Curiosity and creativity are nurtured, along with consistent encouragement for teamwork and partner work. Students are encouraged to try new things, and to think and talk through problem-solving steps. Students follow core values as they use media and technology.

During the fourth grade year, students work with robotics to create, load and test block-based scripts to control movement, LEDs, drawing, and more. Students also gain experience with coding using a variety of resources, including programming with Scratch 3.0. Our students grow in their adaptive learning through fun problem-solving, creativity, and teamwork!

Technology is integrated into classroom curriculum units to promote information literacy, creative work, and critical thinking. Students create and save files to a cloud-based account and share files to teachers and collaborators. Students also use quality learning software appropriate to their developmental level in the areas of literacy and reading, and in math and problem solving. Tech basics include digital citizenship education, keyboarding/writing, creative mixed media and presentations, and information literacy. Special emphasis is placed on comprehension, communication, organization, and research skills. This program helps students increase their sophistication levels in currently available technology, but also incorporates "learning to learn" in a way that will transfer to the technology tools of the future.

My son has felt welcomed from day one, tells me everyday that he learned, always has a smile, and talks about how Mr. Dally is always challenging him yet always makes it fun and makes him laugh. In a year of uncertainty I am more than certain I made the right choice in choosing Cannon.

## Middle School — division and grade pages (S11–S15) and Academic Technology (S16)

### Middle School landing (S11, academics/middle-school)

## Welcome to Middle School!

Middle School is a remarkable time of growth—a season when students begin to discover who they are, how they learn, and who they are becoming. Our Middle School is energized by curious students, dedicated faculty, and a community that believes every child deserves to be known, challenged, and encouraged. We cultivate full engagement in the classroom, a strong sense of belonging, and the confidence to embrace challenges, take thoughtful risks, and learn from both success and setbacks. Through a strong partnership with families, we guide students as they grow into capable learners, compassionate leaders, talented artists, athletes, and young people of character.

Academics in Middle School

Advisory in Middle School

Beyond the Middle School Classroom

Middle School should be a place where students are inspired to grow, supported when they stumble, and equipped with the confidence, character, and curiosity they need to thrive in Upper School and beyond

- Welcome to Middle School

- Fifth Grade

- Sixth Grade

- Seventh Grade

- Eighth Grade

- MS Student Life(opens in new window/tab)

Joe Trojan | Head of Middle School

###
Joe Trojan

View Profile
for Joe Trojan

### Fifth Grade (S12, academics/middle-school/fifth-grade)

Fifth Grade

Cannon's fifth grade program focuses on the transition from Lower School to Middle School as well as emphasizing skills like organization and time-management.

## Choose a subject to learn more about Cannon's fifth grade curriculum:

-
English

-
Arts

-
Social Studies

-
Math

-
Physical Education

-
Science

-
World Language

## English

The fifth-grade English program continues the foundation formed in Lower School and expands on it. Students will explore various genres, write critically, apply vocabulary to enhance comprehension, and use technology to aid in the learning experience. There is a reinforcement of the basic grammar skills and enlargement to include all parts of speech. Reading instruction includes the strategy of close reading and BHH (book, head, heart). Students choose what literature circle book they will read within a theme that involves applying reading skills and strategies, writing about the reading experience, researching and presenting information about the book, and creating an item based on that reading experience. Writing is an important part of the curriculum, helping the student become effective communicators by learning how to write clearly and concisely. Peer critiquing and group sharing are important parts of the writing process.

## Arts

In fifth grade, students choose Strings, Band, or Chorus as their major art class and stay in that class for two years. On alternating days, students rotate by quarter through Visual Art, Theater, General Music (non-performing), and Small Group Lessons in their major art class. During the small group lesson students are allowed to explore more deeply the concepts taught in the Chorus, Band, and Strings classes. They also are given more autonomy to ask questions, explore individual interests, and build on skills learned in the larger class.

Visit the Arts section of the website for more information.

## Social Studies

Fifth-grade social studies is an thematic approach to studying the development of civilizations throughout the ancient and Medieval periods in Europe, the Middle East, Africa, and Asia. Students experience history through engaging hands-on activities which foster students' love of learning. It brings learning alive and makes history meaningful for a fifth-grade student. The themes covered include geography, social structures, and government and political systems.

## Math

The fifth-grade math program includes the following units: Operations with whole numbers & decimals, operations with integers, operations with fractions, Order of Operations, solving equations & inequalities, graphing linear equations, ratios, proportions, percents, perimeter, area & surface area, volume, and statistics. Abstract thinking and problem-solving are emphasized in every unit of this course. Various manipulatives, interdisciplinary units, multiple technology tools, and mathematics competitions are used for enrichment.

## Physical Education

Health Education

In grades five through eight, age-appropriate texts and resources are used to teach mental, physical, and social skills necessary to maintaining one's health. Units taught include human growth and development, evaluating health-related information, products and services, decision-making, family living, nutrition, safety and basic first aid, and environmental health.

Physical Education

The Middle School physical education program stresses physical fitness and a variety of athletic experiences. The program includes training and testing for the Cannon strength and conditioning program. Also included are units on soccer, flag football, volleyball, tennis, aerobics, cardiovascular fitness and conditioning, basketball, softball, baseball, and lacrosse. Participation is mandatory. However, students develop skills for performance at their individual levels.

## Science

The middle school science curriculum incorporates the different disciplines of science into each course of study beginning in fifth grade. In the fifth grade course, students explore the disciplines of life and environmental science through an in depth study of ecology. They study the interactions of the living and nonliving factors of their environment, learn about diversity and adaptations, and explore the many cycles of the natural world. Through hands-on activities, teacher demonstrations, and student explorations, fifth graders learn about the effects of human interactions and interferences in the delicate balance of the natural world.

## World Language

In fifth grade, world language courses are exploratory, and students rotate through all three World Language courses offered at Cannon School (Spanish, French, and Mandarin). At the end of their fifth-grade year, students choose which language they will study for the remainder of their Middle School Career.

## In This Section

- Welcome to Middle School

- Fifth Grade

- Sixth Grade

- Seventh Grade

- Eighth Grade

- MS Student Life(opens in new window/tab)

### Sixth Grade (S13, academics/middle-school/sixth-grade)

Sixth Grade

Cannon's sixth grade program focuses on identifying students’ academic strengths as well as exploring students’ interests and passions; it also emphasizes personal responsibility.

## Choose a subject to learn more about Cannon's sixth grade curriculum:

-
English

-
Arts

-
Social Studies

-
Math

-
Physical Education

-
Science

-
World Language

## English

Sixth grade English continues to reinforce grammar skills and language mechanics with an emphasis on narrative writing. Vocabulary skills are based on Latin and Greek root words. Challenging but age-appropriate novels are read in class and at home. The literature book covers a wide range of fiction including poetry, drama, and short stories as well as non-fiction essays and autobiographies. Students write in various formats to enhance their learning experience and apply the grammar skills learned.

## Arts

In sixth grade, returning students remain with the major art class chosen in fifth grade (new students select one) - Strings, Band, or Chorus - as their major art class. On alternating days, students rotate by quarter through Visual Art, Theater, General Music (non-performing), and Small Group Lessons in their major art class. During the small group lesson students are allowed to explore more deeply the concepts taught in the Chorus, Band, and Strings classes. They also are given more autonomy to ask questions, explore individual interests, and build on skills learned in the larger class.

Visit the Arts section of the website for more information.

## Social Studies

Sixth-graders explore the development of civilizations throughout the Ancient and Medieval periods in Europe, the Middle East, Africa, Asia, and the Americas thematically. Students experience history through a wide variety of methods including investigations, simulations, and discussions of world history. By employing thought-provoking and interactive activities, students will be able to compare different cultures and make meaningful connections to their own lives. Themes covered include economics, achievements of ancient civilizations, and origins of systems of belief.

## Math

The sixth-grade math program builds upon prior knowledge, exploring each topic in greater depth and with increased application. Units of study include: Operations with whole numbers & decimals, operations with integers, operations with fractions, solving multi-step equations and inequalities, ratio, proportion, percent, perimeter, area, volume, surface area, statistics, and graphing linear equations. Abstract thinking, application, and problem-solving permeate each unit. Various manipulatives, Chromebooks, technology opportunities, and mathematics competitions are used for enrichment. There is a strong emphasis on collaboration among students and teachers.

Sixth-Grade Pre-Algebra

This course enables a select group of sixth-grade students to make connections between concrete experiences and abstract ideas within areas of mathematics. This pre-algebra program builds upon prior knowledge to dive deeper into expressions, equations, inequalities, integers, linear functions, geometry, probability, and statistics as a foundation for Algebra I. A cornerstone of this class is that students learn to be strategic in their thinking through analyzing problems at the conceptual level. Multiple approaches to creative problem-solving are valued and reinforced through communication and collaboration. Integration of the curriculum allows for mathematics to be relevant in the real world. Chromebooks, graphing calculators, and mathematics competitions are used for enrichment.

## Physical Education

Health Education

In grades five through eight, age-appropriate texts and resources are used to teach mental, physical, and social skills necessary to maintaining one's health. Units taught include human growth and development, evaluating health-related information, products and services, decision-making, family living, nutrition, safety and basic first aid, and environmental health.

Physical Education

The Middle School physical education program stresses physical fitness and a variety of athletic experiences. The program includes training and testing for the Cannon strength and conditioning program. Also included are units on soccer, flag football, volleyball, tennis, aerobics, cardiovascular fitness and conditioning, basketball, softball, baseball, and lacrosse. Participation is mandatory. However, students develop skills for performance at their individual levels.

## Science

The middle school science curriculum incorporates the different disciplines of science into each course of study beginning in fifth grade. In sixth grade, the major topics to be covered include the brain and growth mindset, classification of life, cells, properties of water, rocks and minerals, plate tectonics, simple machines and the physics of motion. There is also a strong focus on skills that middle school students need. Some of the skills are specific to science, such as gathering and analyzing data using scientific tools. Other skills are basic technological and research skills as well as general study and organizational skills, such as reading comprehension, taking notes and time management.

## World Language

In sixth grade, world language is an integral part of the curriculum, and students attend daily classes to learn basic grammar and vocabulary to allow them to describe themselves and the world around them in the target language.

## In This Section

- Welcome to Middle School

- Fifth Grade

- Sixth Grade

- Seventh Grade

- Eighth Grade

- MS Student Life(opens in new window/tab)

### Seventh Grade (S14, academics/middle-school/seventh-grade)

Seventh Grade

In our seventh grade program, students are encouraged to take ownership of their learning, and they are granted more opportunities to explore extra-curricular activities in the arts and athletics.

## Choose a subject to learn more about Cannon's seventh grade curriculum:

-
English

-
Arts

-
Social Studies

-
Math

-
Physical Education

-
Science

-
World Language

## English

The seventh-grade English program integrates the study of literature, writing, and grammar to teach students to communicate effectively. Students learn to appreciate a variety of literary genres and writing styles, including short stories, memoir, poetry, and drama. Throughout the course, students develop their skills in writing to become fluent and confident authors with a clear, concise, and vivid writing style. Writing samples in student portfolios include paragraphs, narratives, poetry, short stories, and expository essays. Basic grammar is reviewed and reinforced, while vocabulary skills are enhanced with a program emphasizing Greek and Latin roots. The course also includes creative writing, required outside reading, and oral presentations.

## Arts

Students take two art classes and rotate on alternating days for the entire school year. Grades and comments are given for both classes. Students choose in 7th grade, and they choose again in 8th grade.

Choices for 7th grade include Band, Chorus, Strings, Visual Art, Theater, Photography/Tech Art Fusion, Creative Explorations, and Art Magazine. Visit the Arts section of our website for details.

## Social Studies

In seventh-grade, students bring history alive as they explore the origins of the United States, including its history, geography, culture, government, economics, and politics. Students learn the skills of a historian; sourcing, contextualizing, corroborating, and close reading, to investigate historical questions. They will also explore the creation of and the structure of the American government and learn the importance of citizenship and how citizens participate in the government.

## Math

This course enables students to make connections between concrete experiences and abstract ideas within areas of mathematics. This pre-algebra program builds upon prior knowledge to dive deeper into expressions, equations, inequalities, linear functions, geometry, probability, and statistics as a foundation for Algebra I. Problem-solving is strongly emphasized as students learn to value mathematics in the world around them. Students learn to establish sequences of actions they can recall and apply to understanding concepts. Critical thinking and creative thinking are reinforced. The critical aspect of thinking is the focus in teaching students to analyze problems and to break problems down into specific components. Chromebooks, project-based learning, and mathematics competitions are used for enrichment.

Seventh-Grade Algebra I

This course is an accelerated program that challenges a select group of seventh- grade students to expand on the knowledge gained in Pre-Algebra. Relevant topics include linear equations, inequalities, polynomials, factoring, graphing linear equations, radicals, quadratics, and an introduction to trigonometry. A cornerstone of this class is that students continue to be strategic in their thinking through analyzing problems at the conceptual level. The content continuously applies and connects algebra principles with other areas of mathematics, other disciplines, and real-world applications, giving students a better understanding of how algebra is relevant to their future lives and careers. Multiple approaches to creative problem solving are valued and reinforced through communication and collaboration. Chromebooks, project-based learning, and mathematics competitions are used for enrichment.

## Physical Education

Health Education

In grades five through eight, age-appropriate texts and resources are used to teach mental, physical, and social skills necessary to maintaining one's health. Units taught include human growth and development, evaluating health-related information, products and services, decision-making, family living, nutrition, safety and basic first aid, and environmental health.

Physical Education

The Middle School physical education program stresses physical fitness and a variety of athletic experiences. The program includes training and testing for the Cannon strength and conditioning program. Also included are units on soccer, flag football, volleyball, tennis, aerobics, cardiovascular fitness and conditioning, basketball, softball, baseball, and lacrosse. Participation is mandatory. However, students develop skills for performance at their individual levels.

## Science

Seventh-grade science students will observe the world around them and apply what they see to each chapter and unit that they learn throughout the year. They will be faced with questions about how the elements of the Periodic Chart and chemistry relate to the nature observed in the outdoor classroom. They will experiment with light and the electromagnetic spectrum, making connections between light is and how it impacts life on Earth. They will then take this knowledge to build their learning beyond our planet to the solar system and universe. Finally, students will study the inward workings of the human body and manipulate other animals and their anatomy during a unit on the animal kingdom and dissections. The purpose and take-away from this year in science is to see how science is not just many disciplines that are unique from each other, but a study of how everything works together, builds upon each other, and is only whole with each of these sections the students will experience.

## World Language

Over the course of the seventh and eighth grades, students complete Spanish I, French I, or Mandarin I language courses that continue to meet daily and are conducted primarily in the target language. At the seventh- and eighth-grade levels, students deepen and further develop strong reading, writing, speaking, and listening comprehension skills.

## In This Section

- Welcome to Middle School

- Fifth Grade

- Sixth Grade

- Seventh Grade

- Eighth Grade

- MS Student Life(opens in new window/tab)

### Eighth Grade (S15, academics/middle-school/eighth-grade)

Eighth Grade

Cannon's eighth grade program focuses on leadership development, self-advocacy and risk-taking as students prepare for the transition to the ninth grade and Upper School.

## Choose a subject to learn more about Cannon's eighth grade curriculum:

-
English

-
Arts

-
Social Studies

-
Math

-
Physical Education

-
Science

-
World Language

## English

The eighth-grade English program builds on the reading, writing, listening, and speaking skills developed in earlier grades. The course aims to help students become more effective communicators and emphasizes ways in which writing, grammar, and reading skills work together to enhance communication. Students learn how to generate and organize ideas for a specific audience and purpose in a wide variety of personal and academic topics. They improve their revision and editing skills, applying the conventions of standard spelling and grammar. Grammar instruction emphasizes how to combine phrases and clauses as students develop a more sophisticated writing style. Reading includes fiction, drama, non-fiction, and poetry. In addition to works in the literature book, students read novels with the entire class and on their own for outside reading reports. Vocabulary is taught in the context of reading and includes learning root words, prefixes and suffixes, and the denotation and connotation of words.

## Arts

Students take two art classes and rotate on alternating days for the entire school year. Grades and comments are given for both classes. Students choose in 7th grade, and they choose again in 8th grade.

Choices for 8th grade can include Band, Chorus, Strings, Visual Art, Theater, Photography, Art Magazine, and Creative Explorations. Visit the Arts section of our website for details.

## Social Studies

In eighth-grade, students build on their foundation of United States history as they continue to explore the history, geography, culture, government, economics, and politics. Students strengthen their use of historian skills as they deepen their understanding of more modern United States history, as it becomes a world power. Topics are examined through a combination of primary and secondary sources, as students continue to learn to think like historians through strategies of sourcing, contextualizing, corroborating, and close reading.

## Math

This course is an accelerated program that challenges eighth-grade students to expand on the knowledge gained in Pre-Algebra. Relevant topics include linear equations, inequalities, polynomials, factoring, graphing linear equations, radicals, quadratics, and an introduction to trigonometry. The content continuously applies and connects algebraic principles with other areas of mathematics, other disciplines, and real-world applications, giving students a better understanding of how algebra is relevant to their future lives and careers. Multiple approaches to creative problem-solving are valued and reinforced through communication and collaboration. Chromebooks, graphing calculators, project-based learning, and mathematics competitions are used for enrichment.

Eighth-Grade Geometry

This course is an accelerated program that challenges a select group of eighth- grade students to expand on the knowledge gained in Algebra I. The skills of reasoning and geometric proof are developed. Other relevant topics include parallel and perpendicular lines, congruent triangles, similar polygons, trigonometry, quadrilaterals and circles, and area and volume. The content continuously applies and connects both algebra and geometry principles with other areas of mathematics, other disciplines, and real-world applications, giving students a better understanding of how geometry is relevant to their future lives and careers. Chromebooks, graphing calculators, project-based learning, and mathematics competitions are used for enrichment. There is a strong emphasis on project-based learning, independent thinking, and collaboration among students and teachers.

## Physical Education

Health Education

In grades five through eight, age-appropriate texts and resources are used to teach mental, physical, and social skills necessary to maintaining one's health. Units taught include human growth and development, evaluating health-related information, products and services, decision-making, family living, nutrition, safety and basic first aid, and environmental health.

Physical Education

The Middle School physical education program stresses physical fitness and a variety of athletic experiences. The program includes training and testing for the Cannon strength and conditioning program. Also included are units on soccer, flag football, volleyball, tennis, aerobics, cardiovascular fitness and conditioning, basketball, softball, baseball, and lacrosse. Participation is mandatory. However, students develop skills for performance at their individual levels.

## Science

Our essential question for the year is "What is the impact of the Sun on Earth?" The Sun drives the Earth's weather, provides energy for life, and for electrical power. We focus on these main areas of study through a series of labs, demonstrations, and investigations. As we study the nature of science and science processes, eighth graders become more skilled in working with units of measurement, and students are challenged with projects to integrate various aspects of their learning. They design and construct hot air balloons for flight, and build model homes with working electrical circuits. The students apply science concepts to real world problems, such as analyzing the school's power bill to determine efficiency, or testing the effectiveness of cleansers in fighting microscopic organisms. We are challenged to continuously ask ourselves how we can use our resources in a responsible way.

## World Language

Over the course of the seventh and eighth grades, students complete Spanish I, French I, or Mandarin I language courses that continue to meet daily and are conducted primarily in the target language. At the seventh- and eighth-grade levels, students deepen and further develop strong reading, writing, speaking, and listening comprehension skills.

## In This Section

- Welcome to Middle School

- Fifth Grade

- Sixth Grade

- Seventh Grade

- Eighth Grade

- MS Student Life(opens in new window/tab)

### Academic Technology Curriculum (all divisions) (S16, academics/academic-technology/academic-technology-curriculum)

# Academic Technology Curriculum

## A Comprehensive Approach

Beginning in Junior Kindergarten, academic technology is integrated into the curriculum day. Teachers balance traditional teaching methods with the latest technology, and encourage a mindset of creativity and problem solving. Our students build proficiency and gain confidence as they progress through each grade, incorporating technology to deepen their learning and mastery. From early problem solving in the lower grades, to engineering and production in the upper grades, students are provided with resources and opportunities to excel in our rapidly changing world.

## Academic Technology

- Academic Technology Overview

- Academic Technology Curriculum

- Academic Technology Facilities

## Lower School Academic Technology Curriculum

In Lower School, our learning design involves high engagement, structured so that students are drawn into appropriate levels of challenge. Curiosity and creativity are nurtured, along with consistent encouragement for teamwork and partner work.

Students are encouraged to try new things, and to think and talk through problem-solving steps.Students in grades junior-kindergarten through four focus on coding and simple robotics at developmentally appropriate levels. Older elementary students program Root Robotics. Edison robots, and use Scratch 3.0 for creative animations.

For third and fourth grade students, tech basics include digital education, keyboarding/writing, creative mixed media and presentations, and building research skills.

To learn more, visit the STEM in Cannon's Lower School webpage.

## Middle School Academic Technology Curriculum

The Cannon Middle School technology experience blends cutting edge technology with the skills needed to be successful in tomorrow’s workplace.

Students engage in activities including 3D printing, virtual reality, drones, robotics, CAD design, and computer programing.

These 21st century skills are integrated into a maker mentality which challenges kids to think outside the screen, work with their hands, and focus on group collaboration. Students use a variety of hand and power tools as a daily part of instruction. We take pride in exposing students to “shop class 2.0” which will encourage risk-taking and creativity.

Students often come to our technology space, the ThinkTank, as a part of their normal class schedule and explore activities directly related to their classroom curriculum. They also come to create self-guided projects that allow them to explore personal interests and practice autonomy. Our kids have created skateboard ramps, growling bedroom slippers, hydroponic gardens and more. Students and teachers are constantly learning together in this evolving technology space.

## Upper School Academic Technology Curriculum

The Upper School Technology curriculum puts a focus on students being able to adapt core learning principles to a variety of digital, physical, and process tools. The program is driven by student interest and allows them full ownership of their project and technology choices.Putting students in the driver’s seat of the design process provides them the opportunity to engage in deep learning experiences in topics about which they are passionate and excited, with an end result of a curriculum that exposes students to a wide range of specific skills and maintains an overarching emphasis on process-based learning and adaptability of skills.

Our current programs focus on a number of specific technology skills that are relevant to student interest.

The curriculum this year focuses on the iterative design process, with a focus on empathy and design thinking. Throughout the year, students will explore 3D printing and modeling, interactive virtual storytelling, woodworking, rapid prototyping of aeronautics technologies, electronics and circuitry design, and coding in a number of application-specific languages. Built into the curriculum are opportunities for students to learn - and teach - about subjects of their own choosing, giving them practice in developing their own learning experiences, and sharing them with others. Throughout the year, students will engage in mini “maker projects” - one-day builds with a specific purpose, but limited time and resources in which to complete them. All in all, the broad “how do I learn to do this” skills that students regularly practice are able to be transferred to any piece of technology they encounter in or out of school.

## Upper School Curriculum page (S2)

Upper School Curriculum

## Upper School Curriculum Overview

The Upper School stimulates the academic, ethical, interpersonal, and physical growth of students through its challenging college preparatory curriculum.

Students are encouraged to take intellectual risks, make responsible decisions, and embrace leadership opportunities.

Students meet graduation requirements in history and social studies, English, science, mathematics, world languages, and the arts. The Upper School offers both Advanced Placement and Advanced Topics courses, which are available after the Freshman year. A strong extracurricular program, developed by faculty and students, provides sports teams, clubs, and organizations for the entire student body. A service learning program encourages students to become active and caring members of their communities. College counseling occurs throughout grades 9-12.

## In This Section

- Welcome to Upper School

- Upper School Curriculum

- Academic Resource Center

- Winterm

- Upper School Student Life(opens in new window/tab)

- College Counseling(opens in new window/tab)

## Curriculum Visual Pathways by Department

ARTS

SCIENCE - CLASsES OF '27/'28

SCIENCE - CLASS OF '29 & BEYOND

ENGLISH

SOCIAL STUDIES

MATH

WORLD LANGUAGES

## CURRICULUM AND GRADUATION REQUIREMENTS

The Upper School offers both Advanced Placement and Advanced Topics courses – our most challenging and complex course offering – which are available after the Freshman year.

-
English: 4 years required

-
Mathematics: 3 years required

-
Science: 3 years required

-
Social Studies: 3 years required

-
World Language: 3 years required

-
Art: 2 years required

-
Physical Education: 1 year required (or athletic participation)

-
General Electives

## English: 4 years required

Required:

- Honors English I

- Honors English II

- Honors English III or Advanced Topics: Language and Composition

- Honors English IV or Advanced Topics: English Literature and Composition

Electives (do not fulfill English credits required for graduation):

- Honors The Voice: Poetry and Fiction Writing

- Honors Film Studies

## Mathematics: 3 years required

- Honors Algebra I

- Honors Geometry

- Honors Accelerated Geometry

- Honors Algebra II

- Honors Accelerated Algebra II

- Honors Precalculus

- Honors Accelerated Precalculus

- Honors Calculus

- Honors Discrete, Probability and Finance

- AP Calculus AB

- AP Calculus BC

- AP Statistics

- Advanced Topics: Calculus with Applications

## Science: 3 years required

For graduation, you are required to have a non-life science, a life science, and at least one addition lab science. Please refer to the Course Catalog for detailed information.

- Honors Principles of Chemistry and Physics

- Honors Accelerated Principles of Chemistry and Physics

- Honors Chemistry

- Honors Accelerated Chemistry

- Honors Biology

- Honors Marine Science

- Honors Anatomy and Physiology

- AP Biology

- AP Chemistry

- Advanced Topics: Environmental Science

- AP Physics A

- AP Physics C

## Social Studies: 3 years required

Required:

- Honors World History or Honors Accelerated World History I

- Honors Civics - Foundations of Democracy and Citizenship or Advanced Topics: World History II

- Honors U.S. History or Advanced Topics: U.S. History (required nationwide for graduation)

Electives (do not fulfill Social Studies credits required for graduation):

- Honors Psychology

- AP Psychology

- Honors Economics, Law, and Politics

- Advanced Topics: U.S. Government

## World Language: 3 years required

Students must have three years of World Language. We recommend three consecutive years of the same language.

- Honors Chinese I, II, III, IV, V

- AP Chinese Language and Culture

- Honors French I, II, III, IV, V

- AP French Language and Culture

- Honors Spanish I, II, III, IV, V

- AP Spanish Language

## Art: 2 years required

- Honors Visual Foundations

- Honors Studio - 2D or 3D

- Honors Studio Art II, III

- AP Studio Art

- Honors Media Arts II

- Honors Media Arts Senior Seminar

- Honors Theater I, II

- Honors Theater in Performance

- Honors String Ensemble I-II

- Honors String Ensemble III-IV

- Honors Concert Chorus

- Honors Jazz Combo

- Honors Upper School Band

- Honors Modern Ensemble

- Honors Music Technology I, II

- Honors Music Technology III: Music Production

- Honors Creative Design and Engineering I, II

- Honors Creative Design and Engineering Studio

- Honors Yearbook

## Physical Education: 1 year required (or athletic participation)

- Wellness and Long-Term Athletic Development

## General Electives

- Honors Coding & Computer Science

- Advanced Topics: Coding and Computer Science

- Senior Colloquium: Leadership

- Honors Glocal Perspectives

- The Business of Esports

- Advanced Topics Microeconomics: Politics and Policy

- Advanced Topics: Design Thinking for Entrepreneurship with Honors Design Thinking for Entrepreneurship LAB

## Upper School Course Catalog

Please see our Upper School Course Catalog for the most current course offerings, information on advanced topics and advanced placement courses, and information about graduation requirements.

## Signature Learning Experiences

Student-driven choice and inquiry define Cannon’s signature learning experiences. Students collaborate with one another and their teachers to define a research topic, problem or project. While signature learning experiences unfold differently depending on the course, they all culminate with students publicly demonstrating competencies in their respective fields. Selected examples include:

-
Portfolio Defense

-
Symposium

-
BIOREX

-
Colloquium

-
Independent Study

-
Senior Capstone

## Portfolio Defense

In Advanced Topics: American Language and Literature, students design and present digital portfolios featuring multiple drafts of projects written throughout the junior year.

## Symposium

In Advanced Topics: US History, students choose, trace and develop an original argument about an historical topic, which they defend in the spring of junior year.

## BIOREX

With these Biological Research Experience projects, juniors develop a scientific hypothesis, test it, analyze results with statistical methods and present their findings to a committee of faculty, science professionals, and local business leaders.

## Colloquium

In Advanced Topics: World History II, students research a current event ‘hot spot’ through the lens of the historical thinking skills of contextualization, causation, and comparison, and then draft a policy brief and analyze how its implementation would result in greater continuity and/or change over time which they will present to their peers in a culminating colloquium at the end of the course.

## Independent Study

Seniors who wish to pursue a topic in greater depth can petition to work alongside a faculty member, develop course content and assessment rubrics, and produce an end-of-year artifact that represents and explains their coursework.

## Senior Capstone

Capstone invites seniors to reflect upon their most powerful learning experiences at Cannon and then use those experiences to craft a project that contributes back to our community.

Signature Learning Experiences result in so much more than well-executed presentations or research papers—they set the stage for moments of inspiration, new ideas, and excitement for learning. I’ve seen the moment a new connection is made—the moment the light bulb clicks on—and it’s magic.

Nate Rogers, Upper School Academic Dean

## Upper School — Course Catalog 2026-2027, full text (S1)

Column-ordered extraction, every page. Page numbers are the PDF's.

===== PAGE 1 =====

```text
UPPER S
COURSE
2026-
SCHOOL
CATALOG
-2027
```

===== PAGE 2 =====

```text
This catalog is more than a list of courses—it’s your guide to
exploring and growing as part of the Cannon School community.
Here, each class, every experience, and each relationship is
designed to support you in discovering your strengths, building
knowledge, and shaping a sense of purpose.
Our mission is rooted in nurturing relationships at the heart of
learning. Inspired by this mission, we’re committed to helping you
grow in curiosity, courage, and adaptive expertise. From foundational
courses to advanced electives, our offerings are crafted to
encourage both academic challenge and personal growth, preparing
you to navigate the world with resilience and confidence.
As you explore this catalog, we encourage you to consider not only
your interests and goals for this year but also your full journey at
Cannon School. By planning a course of study that spans your entire
time at Cannon School, you’ll ensure you’re meeting graduation
requirements while fully embracing your personal academic
passions. Cannon School faculty, advisors, and college counselors
are here to support and guide you every step of the way.
```

===== PAGE 3 =====

```text
Table of Contents
Here’s your guide to Cannon’s academic offerings. Each section is linked for easy access to
help you find what you need. Take a look, explore, and feel free to reach out if you have any
questions along the way. We’re here to help you make the most of your experience.
CANNON SCHOOL MISSION, VISION, AND VALUES . . . . . . . . . 2
ACADEMIC GUIDELINES AND POLICIES . . . . . . . . . . . . . . . . . . . . .4
GRADES AND GRADE REPORTS. . . . . . . . . . . . . . . . . . . . . . . . . . . 6
COURSE REGISTRATION AND GUIDELINES . . . . . . . . . . . . . . . . . .7
ADVICE FROM COLLEGE COUNSELING . . . . . . . . . . . . . . . . . . . .13
COURSE OFFERINGS. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .14
ENGLISH . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .14
ENGLISH ELECTIVES. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .16
ARTS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .17
MATHEMATICS. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
SCIENCE . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
SCIENCE ELECTIVES. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
SOCIAL STUDIES. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 29
SOCIAL STUDIES ELECTIVES . . . . . . . . . . . . . . . . . . . . . . . . . . 31
WORLD LANGUAGES . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 33
INNOVATION, ENTERPRISE, AND GENERAL ELECTIVES. . . 38
PHYSICAL EDUCATION . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 40
1
```

===== PAGE 4 =====

```text
Cannon School Mission, Vision, and Values
MISSION STATEMENT ADAPTIVE EXPERTISE
Cannon School nurtures At Cannon School, adaptive expertise is our guiding philosophy—a way of teaching
relationships at the heart and learning that equips students to confidently tackle both the challenges they
of learning and engages
anticipate and the ones they can’t yet imagine. By nurturing skills like metacognition,
the learner in a journey
synthesis, and empathy, we prepare our students not just for what’s next, but for
of growth.
whatever comes after that.
Our mission underscores
•• Risk Taking: The habit of stretching beyond current behaviors.
the importance of
relationships in fostering •• Metacognition: The habit of trying to understand your concept of self as a thinker
a supportive learning and learner.
environment. We are
•• Reflection: The habit of growing as a learner by reflecting on our learning experiences.
committed to engaging
each learner, guiding them •• Purpose: The habit of recognizing the meaning embedded in experiences.
through a journey that
•• Empathy: The habit of understanding, relating, and respecting the perspective and
encourages both personal
experience of others.
and academic growth.
•• Flexibility: The habit of adapting to situations and bouncing back from failures in
order to experience growth.
CORE VALUES •• Communication: Making connections with others in an exchange of ideas where both
understanding occurs and relationships develop.
At Cannon School, we
•• Mastery: The habit of pursuing and engaging a subject deeply in order to understand
uphold the following core
its beauty and complexity.
values that guide our
actions, decisions, and •• Curiosity: The habit of thinking critically and asking thoughtful questions that
interactions: display a desire to know more.
•• Creativity: The habit of generating approaches to problem solving based on
•• Courage:
understanding of self and others.
Willingness to take
risks, be innovative, •• Autonomy: The habit created when one embraces choice in when and how to
and embrace change. do a task.
•• Teamwork: •• Synthesis: The habit of seeing the big picture by combining pieces into a
Cooperating, harmonious whole.
communicating,
and collaborating to
C
achieve a common A
goal. N
N •• Respect:
Appreciating others, O
their diversities, and
their property N
•• Integrity: Knowing and
S doing what’s right.
•• Passion: Enthusiasm C
for excellence. H
•• Kindness: Taking the O
time to care for others. O
L
2
Risk
Tak
i n
g
y
t
i v
i
t ea
r
C
sise
h
t n
y
S
M
R
e C
et
a o
P U R l e c t g n i t
P O S i o n i o n
E
Flexibility HA
O
B
F
ITS
R Y ADAPTIVE
T E EXPERTISE S A
M y
m
o n
o
t
u
A
```

===== PAGE 5 =====

```text
HONOR CODE
Each student is honor-bound to refrain from cheating,
lying/misrepresenting the truth, and stealing.
By enrolling in the school, each Cannon Upper School
community member agrees to this pledge:
1. I understand the seriousness of an infraction of
the Honor Code, which addresses cheating, lying,
misrepresenting the truth, and stealing.
2. I agree to abide by the Cannon School honor system.
CANNON SCHOOL COMMITMENT TO
DIVERSITY, BELONGINGNESS, AND
ENGAGEMENT-UNITY PLEDGE
Cannon School Commitment to Diversity, Belongingness,
and Engagement-Unity Pledge
As a member of a community that upholds the values
of Courage, Respect, Integrity, Teamwork, Passion, and
Kindness and keeps nurturing relationships at the heart of
learning at its core, I commit to the following actions:
I. I will treat community members with respect and
kindness through my words and actions.
II. I will listen and learn from those I disagree with
in our community.
III. I will engage with others to understand their
point of view and life experiences.
IV. I will find ways to work together with those I
disagree with to find common ground.
V. I will celebrate others through words and actions.
VI. I will avoid harmful and hurtful behavior and
not ignore those behaviors when I witness them.
UPPER SCHOOL COURSE SELECTION
VISION AND PHILOSOPHY
Our Upper School is dedicated to helping students build an
academically appropriate and challenging schedule that aligns
with their individual goals and abilities. We strive to offer
rigorous challenges along with appropriate support at every
level, ensuring that each student has the opportunity to grow
and succeed.
At Cannon, we believe in the power of learning, courage,
and kindness. Our mission is simple but profound. Every
class, activity, and program you’ll find here is grounded in
our values of courage, teamwork, respect, integrity, passion,
and kindness. And in the Upper School, our course selection
philosophy is centered around building a schedule that is
both challenging and supportive—crafted just for you.
3
```

===== PAGE 6 =====

```text
Academic Guidelines and Policies
GRADUATION REQUIREMENTS
Each step toward graduation is supported by clear
expectations. This page outlines course and credit
requirements by department. We’re here to support you as
you work toward this important milestone. Twenty total
credits minimum (one course = one credit). Most students
accumulate more credits.
English ...................................... four years
Mathematics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . three years
(including a course that covers trigonometry)
Social Studies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . three years
(including Honors U.S. History or Advanced
Topics in U.S. History)
World Languages.............................three years
(consecutively in same language is recommended)
Science ......................................three years
(including Biology or Principles of Life Science;
Principles of Chemistry and Physics is required of
enrolled 9th graders)
Arts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . two years
Physical Education ............................. one year
(or equivalent athletic participation)
EARNING CREDITS IN UPPER SCHOOL
Credits a student earned while in middle school, even in
Cannon Upper School courses, do not count among the
credits required for graduation from the Upper School.
All students must be enrolled in a core (non-elective) English
course at all times, and it is recommended that all students
take a mathematics course for all four years. Selective colleges
would like to see 4 years of sciences.
PHYSICAL EDUCATION REQUIREMENTS
Students are required to earn one full credit of physical
education over their Upper School career from one of
the following:
4
1. Interscholastic athletics at Cannon School may meet the
physical education requirement when a student begins
a sport at the starting date of practice and completes the
season satisfactorily.
2. Alternative physical education credit permits a student
to meet the requirement by participating in activities
outside of school, such as aerobics or dance or a sport
not offered at the school. A student meeting the P.E.
requirement in this fashion must do so by the end of
the Junior year. If the requirement has not been met
by then, the student will be automatically enrolled in a
physical education course offered by Cannon during the
student’s senior year.
Approval of participation for credit must be secured in
advance from the Assistant Head of US for Academics by
submitting a proposal that describes the activity, the number
of times per week it meets, and how many weeks it lasts.
A minimum of 120 hours must be logged during one
academic year. Hours may not be completed during the
summer months.
3. A physical education course offered by the Upper
School, such as Wellness and Long-term Athletic
Development, also earns the required one credit.
Although a student is encouraged to participate as much as
possible in athletics and physical activity within and outside
the auspices of the school, he or she may not receive more
than one physical education credit in total in the Upper
School.
TRANSFER CREDIT
Students transferring to Cannon Upper School will under
certain circumstances receive credit for passing work done
at previous institutions. Decisions regarding transfer credit
are made by the Assistant Head of US for Academics and
College Counselors. In general, the courses taken at another
school must correspond to courses offered at Cannon.
Students transferring to Cannon should pay careful attention
to the school’s graduation requirements. Official transcripts
must be provided and all placement tests taken before a
student is scheduled into classes. Cannon School prefers that
home-schooled students have high school credits from an
accredited organization.
```

===== PAGE 7 =====

```text
EARLY GRADUATION POLICY
Acknowledging that a Cannon education goes beyond the
required credits to the experiences in advisory, signature
learning experiences, and varied social, artistic, and athletic
moments that make up a student’s unique journey of growth,
consideration for early graduation is a request families
and school administrators must handle with careful and
considerate care.
A Cannon student who is in good academic and behavioral
standing may petition in the spring or summer (June 30th
deadline) before senior year to graduate one semester early
under the following exceptional circumstances:
•• The student must be enrolled at Cannon School for
a minimum of two years immediately prior to early
graduation date.
•• The student must have a unique and compelling reason
for applying to graduate a semester early by providing a
documented request from the specific college/university
demonstrating an invitation to pursue (early) spring
enrollment.
•• Before submitting a formal request, the student and family
must first meet with the Upper School Head to discuss the
reason(s) for the request before June 30th.
•• A formal request must be made in writing to the Upper
School Head before the first day of senior year classes so
that appropriate course scheduling plans can be made.
•• School Leadership team members, including the Upper
School Head, JrK-12 Director of Teaching and Learning,
Assistant Head of US for Academics, Assistant Head of US
for Student Life, Athletic Director, and Director of College
Counseling, (grade level Dean and student’s assigned CC)
will make the final approval decision.
•• Students must complete all requirements for graduation
before a diploma will be granted.
•• Even if an early graduation waiver is granted, the student
is expected to enroll in a full load of six classes during the
Senior year.
•• Tuition refunds are not granted for early graduation.
•• Before final transcripts are sent to the college or university,
the student must be in good standing with the Finance
Office.
•• Qualifying early graduation students will be able to attend
our May Commencement ceremony and senior events such
as prom and Senior Breakfast.
* written using The Bolles School as a model and in
collaboration with Cannon administrator
UNIVERSITY OF NORTH CAROLINA
SYSTEM REQUIREMENTS
For University of North Carolina system schools: Students
and parents should note that students will need Algebra I,
Geometry, Algebra II, and one unit beyond Algebra II (for
which Algebra II is a prerequisite) for admission. All students
must also have one life science and one physical science to be
considered for admission.
NCAA CORE REQUIREMENTS
Students interested in intercollegiate athletics should check
with College Counseling as they plan courses in the junior
and senior years in order to comply with NCAA regulations.
Core course requirements for NCAA eligibility are currently
English (four years), mathematics (three years – Algebra I or
higher), natural/physical science (two years with one year of
lab, if offered), additional English, math or natural/physical
science (one year), social science (two years), additional
courses (any area previously mentioned or world language –
four years). A total of 16 courses is required.
5
```

===== PAGE 8 =====

```text
Grades and Grade Reports
GRADES
Grades communicate information about a student’s
performance in a particular subject at a particular moment.
Cannon Upper School students receive numerous grades in
every subject. Teachers and department chairs collaborate
to determine the type, frequency, timing, and value of
assessments. Assessments and grading practices are equivalent
across different sections of the same course. Students’ current
GRADE AND GPA SCALE
Letter 5-Point
Grade Scale Percentage
A 5.0 - 4.3 100 - 93
A- 4.2 - 4.0 92 - 90
B+ 3.9 - 3.7 89 - 87
B 3.6 - 3.3 86 - 83
B- 3.2 - 3.0 82 - 80
C+ 2.9 - 2.7 79 - 77
C 2.6 - 2.3 76 - 73
C- 2.2 - 2.0 72 - 70
D+ 1.9 - 1.7 69 - 67
D 1.6 - 1.3 66 - 63
D- 1.2 - 1.0 62 - 60
F Below 1.0 Below 60
GRADE POINT AVERAGE AND CLASS RANK
Grade point averages are calculated at year’s end for all
students. For weighted grade point average calculations, one
point is added to the student’s grade in an AT/AP course and
.5 will be added for an accelerated course. For example, if a
student receives a B in an AT/AP course, for GPA calculation
purposes it counts as a 4.0, not a 3.0. In an accelerated course,
it counts as 3.5. Grades below 60 percent in AT/AP and
accelerated courses do not receive an extra grade point.
Only final grades from courses taken at Cannon Upper
School are used in the calculation of the grade point average.
Cannon School does not publish class rank.
6
grades and progress in a course will be shared through Edsby
and Veracross.
Semester and year-end letter grades are available online
via the Veracross Portal. In the calculation of year-end
grades, each semester grade counts 45 percent and the final
examination counts 10 percent. Only year-end grades appear
on the transcript.
GPA Accelerated AT/AP
Points GPA Points
4.00 4.50 5.00
3.67 4.17 4.67
3.33 3.83 4.33
3.00 3.50 4.00
2.67 3.17 3.67
2.33 2.83 3.33
2.00 2.50 3.00
1.67 2.17 2.67
1.33 1.83 2.33
1.00 1.50 2.00
.67 1.17 1.67
0 0 .03
DETERMINING THE YEAR-END GRADE
Period Percentage
First Semester 45%
Second Semester 45%
Final Exam or
Signature Learning 10%
Experience
Final Grade 100%
```

===== PAGE 9 =====

```text
Course Registration and Guidelines
COURSE LOAD
A typical course load at Cannon School consists of six courses
per year. Each student must take the required courses to stay
on track for graduation. If a student completes a course during
summer school, credit is still limited to six courses. In such
cases, the student may either take an additional year-long
course on a Pass-Fail basis or enroll in a study hall. A student
may petition the Upper School Head for an exemption to
this policy or for an exemption from the total course load
requirement. Possible reasons for an exemption include illness
or an extremely time-consuming extracurricular activity in
which the student is performing at a high level of recognition.
The final decision will be made by the Upper School Head in
consultation with the Assistant Head of US for Academics
and the College Counselors.
ENROLLMENT GUIDELINES FOR AP/AT COURSES:
•• Sophomores can enroll in no more than two
AP/AT courses.
•• It is recommended that Juniors enroll in no more than
three AP/AT courses. Juniors may not take more than five
AP/ AT courses.
•• The final decision on course load will be made by the
Upper School Head in consultation with the Assistant
Head of US for Academics and the College Counselors.
•• AP Exam Costs: Families are responsible for the cost of
AP exams, which is approximately $99 per exam. Colleges
and universities may offer college credits based on AP
exam scores.
•• Signature Learning Experience (SLE): All AP/AT
courses culminate in a Signature Learning Experience or
final cumulative teacher created exam, which constitutes
10% of the student’s final grade and is calculated into the
final transcript score.
COURSE RECOMMENDATION PROCESS
COURSE RECOMMENDATION PHILOSOPHY
A commitment to a student-centered approach is at the heart
of our academic philosophy. This means that every decision
regarding course placement is made to support each student’s
journey of growth, academic success, and overall well-being.
We recognize that every student has unique strengths,
challenges, and aspirations, and our course recommendation
and petition process reflects our desire to guide students into
classes where they will thrive.
Teacher recommendations begin the course selection process
and determine which courses students are placed into each
year. The course recommendation process is thorough and
collaborative; it includes conversations between students’
classroom teachers, advisor, college counselor, Assistant Head
of US for Academics, and/or the Learning Specialist. Each
department outlines and shares with students its criteria for
recommendations.
Students who wish to enroll in a course for which they are not
recommended by their classroom teacher must initiate the
course petition process. The Assistant Head of Upper School
for Academics makes the final determination for which course
the student takes. Please see the full petition process below for
more details.
Special Note: 8th to 9th Grade Course
Recommendations & Petitions
Course recommendations for rising 9th graders are made
through a collaborative, team-based process designed to
support each student’s readiness, confidence, and long-
term success in Upper School. This approach ensures that
recommendations reflect a complete and developmentally
appropriate picture of each student’s skills and learning habits.
Therefore, for rising 9th graders, grades are only one piece of
the process and there are no automatic recommendations.
For Accelerated World History, recommendations are
informed by a student’s performance in 8th grade English
and 8th grade social studies. Both teachers work together
to assess students’ reading, writing, analytical, and synthesis
skills when determining appropriate placement. Similarly,
recommendations for accelerated science courses are made
through a shared evaluation by the math and science teachers
as key skills are intentionally developed across both disciplines,
and readiness for acceleration is best understood through
input from both content areas. Although recommendations
for Upper School math courses come primarily from the
Middle School math teacher, the advisor and 8th grade team
might also be consulted with respect to student habits and
performance.
Families are encouraged to review recommendations together.
Students who do not receive a teacher recommendation for
the higher-level course and wish to pursue more challenge
7
```

===== PAGE 10 =====

```text
may do so through the school’s collaborative petition process,
which includes input from the 8th grade team and the Upper
School academic team. To be eligible to petition, students
must meet the required minimum grade.
Ultimately, our goal is always to place students in courses that
provide the right level of challenge, promote confidence and
growth, and set them up for sustained success as they begin
their Upper School journey.
RECOMMENDATION PROCESS
Recommendations are made to help students thrive.
While current academic performance is an important
consideration, our instructors and/or departments consider
the whole student when making recommendations. We
strongly encourage students to engage in this process
with curiosity and courage and to follow the guidance of
the recommending teacher. Provided students have met
prerequisite requirements, students will receive automatic
recommendation based on first trimester and second trimester
midterm grades for the following:
HONORS TO HONORS
•• All placements to the next course are automatic except
at the discretion of the Assistant Head of Upper School
for Academics in consultation with the Head of
Upper School.
HONORS TO ACCELERATED:
•• Automatic Recommendation: A student must have an
A in their Honors course for automatic recommendation
into an Accelerated class.
HONORS TO AP OR AT:
•• Automatic Recommendation: A student must have an
A in their Honors course for automatic recommendation
into an AP or AT class.
ACCELERATED TO ACCELERATED:
•• Automatic Recommendation: A student must have a
B+ or higher in their Accelerated course for automatic
recommendation into another Accelerated class within
the same discipline.
8
ACCELERATED TO AP OR AT:
•• Automatic Recommendation: A student must have an
A- or higher in their Accelerated course for automatic
recommendation into an AP or AT class.
AP/AT TO AP/AT:
•• Automatic Recommendation: A student must have
a B or higher in their AP/AT course for automatic
recommendation into another AP/AT class within the
same discipline.
COURSE PETITION POLICY AND PROCESS
We believe that our recommendation and petition process
should be in the best interest of each student. When
petitioning against a recommendation or moving between
course levels, students can struggle academically. Historical
data suggests that success rates are lower when students move
levels without the proper foundation, so it is crucial to follow
the guidance of teachers, college counselors, and advisors.
PETITION PROCESS
Students who are not recommended for a higher-level
course but have met prerequisite requirements per the course
offerings section of this catalog have the option to petition
for reconsideration if they meet the requirements below.
However, this process is designed to be thoughtful and
structured to ensure the student’s success at the next level.
Students who wish to enroll in a course for which they are not
recommended by their classroom teacher must initiate the
course petition process. The Assistant Head of Upper School
for Academics in consultation with the Head of Upper School
make the final determination for which course the student
takes. Please note that student eligibility to initiate the
petition process will be based on Trimester 1 and
Trimester 2 grades.
```

===== PAGE 11 =====

```text
A. ELIGIBILITY TO PETITION:
Please note: Moving from honors level to an advanced one is
a tremendous step up in requirements regarding maturity,
complexity, organization, and executive functioning skills.
HONORS TO ACCELERATED, AP, OR AT:
•• Petition: A student with an A- in their Honors course
may submit a petition to move to Accelerated, AP, or
AT. However, meeting the grade requirement does not
guarantee approval.
ACCELERATED TO ACCELERATED, AP, OR AT:
•• Petition: A student with a B in their Accelerated course
may petition for placement in Accelerated, AP, or AT.
AP/AT TO AP/AT:
•• Petition: A student with a B- may petition to stay at the
AP/AT level, but they should consider that continuing in a
course against recommendation may result in a lower grade
than they are accustomed to earning.
B. PETITION SUBMISSION REQUIREMENTS:
•• The student will complete a form by the due date in order
for their petition to be considered. Students must have a
conversation with their current teacher before submitting
their petition.
•• Petitions must include:
•• A reflection on their academic performance and
readiness for the course that includes the following:
•• Evidence of their commitment to improving study
habits and academic skills (attendance at office hours,
tutoring, on-time assignment completion, etc.).
•• Demonstration of the ability to work independently
and synthesize information.
C. FACULTY FEEDBACK:
•• The recommending teacher will have the opportunity to
provide additional context via a form explaining why the
student was not recommended for the higher-level course.
•• College Counseling, advisors, learning support, and deans
will have the opportunity to provide additional context via
a form.
D. DECISION PROCESS:
•• The final decision will be communicated to the student and
the teacher.
•• Students should be aware that if approved, moving to
a higher-level course against recommendation is often
challenging and may result in lower performance.
ACCELERATION/OUT-OF-SEQUENCE PROCEDURES
Requests for acceleration are rarely approved. The following
people must agree in writing to any course selections that
are accelerated or out of sequence: the department chair, the
college counselor, the Assistant Head of Upper School for
Academics. While requests and inquiries about acceleration/
out-of-sequence procedures should begin with the student’s
current teacher and/or department chair, all students must
complete a form and agree to all stipulations. In some cases,
summer courses are required for approval.
Under no circumstances can a student accelerate without
the explicit written permission of the Assistant Head of US
for Academics.
No student may accelerate through Precalculus.
COURSE DESIGNATIONS
Honors: Honors courses move at a challenging pace.
Honors Accelerated: Honors Accelerated courses move faster
and offer greater depth and breadth of coverage.
Advanced Placement (AP): AP courses are our most
challenging courses designed by the College Board.
Advanced Topics (AT): AT courses are our most challenging
courses designed by Cannon faculty to be both mission-
aligned and of college-level complexity
In calculating the weighted GPA, Advanced Placement (AP)
and Advanced Topics (AT) courses are awarded an additional
1.0 quality point. Honors Accelerated courses are awarded an
additional .5 quality point as of July 1, 2026.
9
```

===== PAGE 12 =====

```text
ADVANCED TOPICS (AT) & ADVANCED
PLACEMENT (AP) COURSES
The pace is fast and the standards high in all Cannon courses,
but the standards for Advanced Topics (AT) and Advanced
Placement (AP) courses are even higher and the assignments
more demanding. Advanced Topics and Advanced Placement
courses are designed for students who demonstrate strong
academic ability and motivation, offering the opportunity to
pursue college-level studies while still in high school. Due to
the rigorous nature of these courses, students should expect
significant homework, research or lab work, and additional
testing sessions. AT and AP courses have weighted grades,
which means that for grade point average calculations, one
quality point is added to the student’s grade in an AT or AP
course. Participation in AT or AP courses is contingent
upon the recommendation of the teacher and department.
Pre- or co-requisites are necessary for most advanced courses.
Please see pre- and co-requisite requirements listed by course
in the course offerings section.
ENROLLMENT GUIDELINES FOR AP/AT COURSES:
•• Sophomores can enroll in no more than two AP/AT course.
•• It is recommended that Juniors enroll in no more than
three AP/AT courses. Juniors may not take more than five
AP/ AT courses.
•• The final decision on course load will be made by the Upper
School Head in consultation with the Assistant Head of US
for Academics and the College Counselors.
•• AP Exam Costs: Families are responsible for the cost of
AP exams, which is approximately $99 per exam. Colleges
and universities may offer college credits based on AP
exam scores.
•• Signature Learning Experience (SLE): All AP/AT courses
culminate in a Signature Learning Experience or final
cumulative teacher created exam, which constitutes 10%
of the student’s final grade and is calculated into the final
transcript score.
10
INDEPENDENT STUDY PROGRAM (ISP)
The Independent Study Program (ISP) is an exciting
opportunity for Cannon seniors to dive into a subject not
currently offered for credit at Cannon School. Designed
to ignite curiosity, passion, and creativity, the ISP allows
students to collaborate with a Cannon faculty member to
design a unique course of study tailored to their interests.
Each ISP must be developed prior to the end of the current
school year and meet specific requirements, including:
•• A clearly defined course of study with learning goals and
outcomes.
•• Benchmarks and assessments that measure progress and
ensure accountability.
To receive final approval, all ISP proposals must be submitted
to the Assistant Head of the Upper School for Academics.
Courses may be graded or taken on a pass-fail basis,
depending on the program structure.
Types of Independent Studies:
1. Student-Designed Courses: Created in partnership with
a faculty member, these graded courses require students
to meet established learning outcomes and demonstrate
mastery through assessments.
2. Pass-Fail Courses: This option still includes clear outcomes
and benchmarks. This format is often used for students
taking a class after completing a summer session, as only six
courses can be transcripted per calendar year into the GPA.
3. Online Courses: Students may also opt to take an online
course through a Cannon-approved provider. Details on
online course options are provided below.
The ISP is a chance for students to take ownership of their
learning and explore new academic horizons under the
guidance of a supportive Cannon faculty mentor. For those
ready to innovate and pursue their passions, the ISP opens
doors to a one-of-a-kind educational experience.
0
```

===== PAGE 13 =====

```text
ONLINE COURSES
Online courses are increasingly available for high school
students from many providers. Such courses can provide an
opportunity for students to experience courses that are not
currently offered at Cannon. However, any enrollment in
online courses must be discussed thoroughly with a student’s
college counselor as well as with the Assistant Head of US for
Academics. Unless the online course is created, taught, and
assessed by a Cannon School teacher, Cannon School credit
is not given in many cases.
•• Most online courses operate under the Independent
Study Program.
•• Students must choose an online course from a Cannon-
approved vendor.
•• Students enrolled in an online course will be required to
report to a designated location during the assigned block.
•• The student will be required to show their proctor the
progress they make each class period.
•• Students cannot take an online course for a course offered at
Cannon and receive credit for that course.
WINTERM COURSE CREDIT ON TRANSCRIPT
Winterm courses award .25 credit on a student’s transcript for
each year for a total of .75 credit for three years of Winterm
in the Upper School.
Winterm course credit will appear as “Pass” on a transcript
for students who meet the criteria below to receive credit.
In order to receive credit a student must meet the
following criteria:
•• Take two ½ day courses, OR one full day course, OR a
Winterm school-sponsored trip
•• Students must complete all course work to receive credit
•• Students must be in attendance for 80% of the class sessions
to receive credit.
SUMMER TERM
Cannon School offers a variety of courses over the summer
that students can take for credit. These courses will take place
Monday through Friday, starting the second week in June and
running for five weeks, excluding June 19 and July 3. Courses
will run from 9:00 AM-12:00 PM each day. In addition
to passing given assessments, students must be in attendance
for 85% of the class sessions to receive credit. Students will be
responsible for any content they miss while absent.
The cost of each course is $850, plus lab fees.
Students who take non-acceleration courses will receive a
letter grade for that course and be allowed to take a reduced
course load or enroll in a sixth elective course for the
following school year. The sixth elective course that the student
enrolls in will be credited Pass/Fail on their transcript. Students
may not take graduation requirements Pass/Fail. Students who
successfully complete courses for acceleration will receive
Pass/Fail credit and be able to move to the next level in their
course progression.
Students will enroll in Summer courses during the course
registration process.
COURSE CHANGES AND WITHDRAWALS
The first three weeks of the academic year constitute the
Add/Drop period. Students may make changes to their
schedule to enroll in courses that they have previously been
recommended to take.
After the Add/Drop period ends, students have until the
sixth week of the first semester to switch into an Honors
level course in same content area (i.e. Honors Biology from
AP Biology or Honors English III from Advanced Topics
American Language and Composition) without having that
change indicated as a “W” (withdrawn from course) on their
transcript. These students bring the grades they have earned
thus far in the year with them to their new course. After
the sixth week of school, students who choose to withdraw
from a course will have that withdrawal indicated on their
transcript.
COURSE FAILURES AND REMEDIATION
Insufficient student progress in Cannon’s academic
coursework may prevent students from re-enrolling. Students
who fail a course required for graduation or a continuing
course may be required to make up the material. A continuing
course has sequential following courses. Acceptable options
for remediation are available and must be approved by the
Assistant Head of Upper School for Academics. Cannon
families are responsible for the financial costs of remedial
courses.
11
```

===== PAGE 14 =====

```text
COURSE REGISTRATION PROCEDURES
Wednesday, February 4: Upper School students in
rising grades 9-12 are able to view their 2025-2026
Recommendations in their Veracross student portal. Click on
“register for courses” to view recommended courses
Thursday, February 5: Upper School Parent
Education Night
Friday, February 27: Deadline for students to submit course
registration form on their Veracross portal.
12
We have allocated time in February for students and
families to make their selections and to set up any
additional appointments with faculty, college counselors,
or the Assistant Head of Upper School for Academics. We
encourage your student to schedule these appointments as
soon as possible to meet the Friday, February 27 deadline.
2
```

===== PAGE 15 =====

```text
Advice from College Counseling
REGARDING COURSE SELECTION
The annual process of selecting a student’s course load
requires a variety of considerations regardless of a student’s
intended post-Cannon plans. While colleges place emphasis
on academic success for admission, courses should align
with a student’s academic, career, and/or personal goals and
pursuits. This can be tough to balance; however, college
counseling welcomes having conversations with students
about how to pursue interests and passions as well as
academic excellence aligned with admissions requirements.
As students progress through the Upper School, we ask that
they and their families keep the following items in mind:
•• The College Counseling Team recommends taking
Advanced Placement (AP)/Advanced Topics (AT) level
courses where appropriate and in areas in which a student
is recommended and shows promise. Students should
evaluate the demands of their time for each course they are
considering, thinking about their sports/extracurricular
schedule and how each will impact their ability to be
successful in a course. Students must meet the standards of
the teacher recommendation outlined in the policies of the
course catalog/academic area. College Counseling does not
have the authority to override these decisions.
•• Recognize that enrolling in an AP/AT level course is not
synonymous with earning the GPA increase that comes with
said courses. Enrolling in these courses has the potential
to increase or decrease the GPA, which is why thought
and consideration must go into the decision to take these
courses. We have seen the consequences of overloading a
schedule, especially in junior and senior years. Setting the
foundation for these courses through practicing good habits
and mastering content is crucial for success in subsequent
level courses. All Cannon School seniors graduate and
have several college choices if that is the path they choose.
Balance within a student’s schedule is encouraged every
year in the Upper School and College Counseling has seen
the difference it can make in a student’s ability to maintain
strong academic standing.
•• College Counseling hosts Family Meetings with Juniors
and 1-on-1 meetings with Sophomores prior to Course
Registration annually. Additional meetings about course
selection are available upon request.
1
REGARDING COLLEGE ADMISSIONS
The College Admissions Landscape is ever-changing. The
College Counseling Team at Cannon strives to remain
current through regular interactions with institutions
from around the country and world as well as a variety of
Professional Development opportunities each and every
year. We advise families based on the latest news and data
gathered, and regardless of where a student or family aims to
see their student at the conclusion of their time at Cannon,
we believe that all students should remain focused on their
personal journey through Cannon’s Upper School. With this
in mind, we encourage students to focus first and foremost
on choosing courses of interest to them, where they can
be successful and with the highest rigor for which they are
recommended. Below are several key points the College
Counseling Team wishes to remind families of as they
navigate through the college admissions process.
•• Colleges encourage students to take math, science, social
studies, world language, and English through all four years
of high school.
•• Colleges consider a student’s rigor of curriculum and
appropriate challenge across disciplines and within
Cannon’s offerings.
•• Colleges, especially selective colleges, prefer to see mostly
As and some Bs in the most challenging courses that each
student is capable of taking. Colleges always want to see a
student’s grades and rigor of curriculum trending upward
every year. When applying to colleges, students will have an
opportunity to expound on any significant drop in grades.
•• Courses and grades matter starting in 9th grade, just as they
matter when a student is a senior. In fact, a student’s senior
transcript/course selection should reflect a culmination of
the student’s overall learning experience.
•• As a senior, if a student changes courses after a transcript has
been submitted for an application, the student must inform
colleges of that change. It is in the student’s best interest to
choose courses wisely and do so before the Upper School
deadline to ensure that this is not an issue.
•• For many colleges, self-reporting strong AP exam scores
can strengthen a student’s application. College Counseling
recommends that students consider taking the AP exam in
AP/AT courses in which they are enrolled.
13
```

===== PAGE 16 =====

```text
Course Offerings – English
Note: All English courses (excluding electives) feature a required
summer reading which may include a writing assignment.
Students should consult the Back to School page on the school’s
website for specific details.
HONORS ENGLISH I
Prerequisite: None
Honors English I is a foundational course designed to prepare
students for future English courses and to equip them with
the communication skills necessary for success in all their
academic endeavors. A dynamic and engaging journey
through the world of literature and language, Honors English
I is designed to cultivate critical thinking, analytical skills,
and creative expression while exploring a diverse range of
literary works and communication techniques. Students will
experience the art of reading with purpose, furthering the
skill of annotation to uncover layers of meaning within texts
while developing a keen eye for literary devices, themes, and
authorial intent. Throughout the year, students explore works
by diverse authors, from classical to contemporary, across a
variety of genres, including memoirs, plays, novels, poetry and
short stories, fostering an appreciation for literature’s role in
reflecting and shaping society. By the end of the year, students
will have honed their critical reading skills, developed a more
sophisticated writing style, and gained a deeper appreciation
for the power of language and literature.
HONORS ENGLISH II
Prerequisite: Honors English I
Sophomore English students are asked to consider who they
are as readers, writers, thinkers, and speakers, and then select
between one of two courses – Reading and Discourse, and
Reading and Composition – which are described below.
READING AND DISCOURSE
Prerequisite: Honors English I
Honors English II: Reading and Discourse is a sophomore
year seminar style class in which students read and discuss
influential literary and philosophical works from a variety
of historical periods and cultures. Reading and Discourse
is tailored for students who are ready to engage in deep
reading and discussion in written and verbal forms. Frequent
out-of-class reading assignments lead to extended in-class
discussions, assignments, written assessments, and research
projects. Texts may range from ancient to modern, from
14
philosophy to literature, from excerpts and chapters, from
films to whole novels. The shared reading and writing
experience of the Reading and Discourse class is designed
to stimulate and further develop critical thinking, speaking
and writing skills, providing students the opportunity to
explore significant ideas and respond with their own. The
class continues to prepare students for college-level writing by
emphasizing writing as a process.
READING AND COMPOSITION
Prerequisite: Honors English I
Honors English II: Reading and Composition is a
sophomore year, process-driven course in which students
read, write, and think in service of developing their writing
and analytical skills. The course is tailored to students who are
ready to engage in written and verbal forms of idea generation
and critical thinking based on various genres of texts, both
fiction and non-fiction. Through in-class and out-of-class
reading and assignments, students develop their abilities to
generate ideas and engage in the craft of argumentation and
exploratory writing. As students interact with the course’s
core texts, they showcase their knowledge and ideas through
classroom conversations and written expression, including
journaling and collaborative workshops. By exploring
their writerly process and voice, they begin to understand
themselves and their metacognition as students, writers, and
human beings. The class continues to prepare students for
college-level writing by emphasizing writing as a process.
HONORS ENGLISH III
Prerequisite: Honors English II
Honors English III focuses on the study of rhetoric—the
art of persuasive writing and speaking. Students engage in
a deep study of rhetorical analysis, guided by Aristotle’s
classical appeals: ethos (credibility), pathos (emotion), and
logos (logic). Students read longer works of nonfiction,
drama, essays, and journalism to identify and analyze how
writers and speakers employ rhetorical devices and persuasive
language to advance their arguments. Building on this
analytical foundation, students craft their own persuasive
pieces across multiple genres, including definition essays,
précis, opinion pieces, open letters, personal narratives, and
synthesis essays. The course also features structured debates
that challenge students to apply rhetorical principles in
discourse. The course culminates in presentations of
writing portfolios in which students detail their growth as
4
```

===== PAGE 17 =====

```text
writers and defend their work before a panel of English III
teachers, demonstrating both their rhetorical mastery
and self-reflection.
ADVANCED TOPICS:
ENGLISH LANGUAGE AND COMPOSITION
Prerequisite: Honors English II
Advanced Topics: English Language and Composition
prepares students to read, write, and think at a college level.
The course grows students’ understanding of the non-fiction
writing process with a major emphasis on the value of
revision. Following an intensive study of rhetoric, students
compose across a variety of genres, including the thesis-driven
analytical essay, the descriptive narrative, and synthesis-based
writing. The course requires students to read independently
across the school year. Student reading choices, which come
from a college textbook and a variety of curated nonfiction
texts, are the basis of writing, projects, and class discussions.
Most writing assignments include submission of first drafts
which become the basis for substantial, frequent revision and
one-on-one conferences with teachers. The course culminates
with the Portfolio Defense, a signature learning experience
in which students defend their written works before a panel
of faculty and members of the Cannon community. Students
enrolled in the course may–but are not required to–sit for the
AP English Language and Composition exam at the end of
the year.
ADVANCED TOPICS: ENGLISH SEMINAR AND INQUIRY
Prerequisite: Honors English II
Advanced Topics: English Seminar and Inquiry prepares
students to read, write, and think at the college level. The
course grows students’ understanding of the academic writing
process with a major emphasis on the value of inquiry.
Throughout the course, students explore the complexities
of academic and real-world issues, analyze divergent
perspectives, and make connections across curricula through
a multi-disciplinary lens. Using investigative frameworks,
students practice deep reading by analyzing articles and
books, research studies, and foundational, literary, and
philosophical texts; listen to and view speeches, broadcasts,
and personal accounts; and experience artistic works and
performances. During their time in the course, students
develop their academic reading and writing abilities,
including independent research, learning to synthesize
information from multiple sources, arguing their own
evidence-based perspectives in a variety of writing projects,
and designing and delivering oral and visual presentations.
The course culminates in a Signature Learning Experience.
The course may be taken by itself or as the first part of a
1
sequence that culminates with an AT Research elective.
Students enrolled in the course may–but are not required
to–submit portfolios and sit for the AP Seminar exam at the
end of the year.
HONORS ENGLISH IV
Prerequisites: Honors English III, Advanced Topics:
English Language & Composition, or Advanced Topics:
English Seminar and Inquiry
Honors English IV is a twelfth-grade class designed to
prepare college-bound seniors for the kind of work they will
encounter in the years to come, and introduces reading and
writing tasks relevant to their own lives. The course offers
a diverse selection of texts from various genres, curated to
capture student attention and interest. Recent selections
include: Altar’s Irresistible: The Rise of Addictive Technology
and the Business of Keeping Us Hooked; Haddon’s The
Curious Incident of the Dog in the Nighttime; Shakespeare’s
Macbeth; Marquez’s Chronicle of a Death Foretold, and
other canonical and contemporary titles. Students also
choose their own books in an Independent Reading program.
English IV includes instruction in vocabulary, grammar,
composition, public speaking, and researching.
ADVANCED TOPICS:
ENGLISH LITERATURE AND COMPOSITION
Prerequisite: Honors English III, Advanced Topics: Language &
Composition, or Advanced Topics: English Seminar and Inquiry
Advanced Topics Literature and Composition is a
twelfth-grade class designed to expose students to complex,
college-level literary conversations about texts; to supply
tools for critical thinking, analysis, and discussion that allow
readers to develop a fuller understanding of the elements
of fiction and poetry; and to develop a student’s abilities to
write in a creative way about literary texts and what they
reflect about themselves and the world. The course’s writing
trajectory reinforces the iterative process of writing and
thinking developed in previous English courses. Students
write analytically and reflectively in journals, essays, and
in-class timed writings. Class discussion and student choice
define much of the AT Literature experience. The course
culminates with the Lit Defense signature learning experience
in which students, having engaged with two major works of
fiction of their choice via essays and the creation of major
works databases, meet with a panel of faculty members to
discuss their reading. Students enrolled in the course may–
but are not required to–sit for the AP English Literature
exam at the end of the year.
15
```

===== PAGE 18 =====

```text
Course Offerings – English Electives
Note: English electives are open to juniors and seniors only.
These courses do not fulfill English credits required for
graduation. To take English electives, students must also be
enrolled in either Honors English III, Honors English IV,
AT English Language, AT English Seminar, or AT
English Literature.
HONORS CREATIVE WRITING: FICTION,
POETRY AND SCREENWRITING
The goal of this class is for students to develop and cultivate
their individual literary voices through the writing of poetry,
fiction, and screenwriting. Although there is a moderate
reading component to the course, a great deal of the material
students read acts as prompts for what they write. In fact,
many of the students’ writing tasks early in the course are
imitative in nature. By reading and examining the work of
various authors, students are given license to experiment
in their writing with many different types of voice. The
most important component of the class is the writing itself,
and each student is responsible for producing a substantial
portfolio of work. Early in the semester the course operates
in a seminar format and later shifts into a creative writing
workshop. The second half of the year introduces students to
the art and craft of writing for film and television. Through
interactive lessons, students learn story structure, character
development, dialogue, and visual storytelling techniques.
They will read and analyze professional scripts, workshop
their own ideas, and complete at least one polished and
peer-critiqued screenplay. Emphasis is placed on creativity,
collaboration, and developing a personal writing voice. By the
end of the course, students will have a strong foundation in
the screenwriting process.
16
HONORS HISTORY OF FILM
This fast-paced survey course traces cinema from its origins
in 1895 through to the present day. Students will explore
the invention of motion pictures, the rise of the studio
system, the evolution of cinematic techniques, and the
digital revolution that has transformed how films are made,
distributed, and consumed. The movies shown examine
diverse genres and movements, from Hollywood blockbusters
and musicals to protest films and the rise of independent
and international cinema. Along the way, students will learn
the visual language essential for understanding modern
filmmaking. This is an essential course for all who wish to
understand contemporary media culture. Course highlights
include: early cinema and silent comedies, Pre-Code
Hollywood, Classical Hollywood, the arrival of Disney, film
noir and science fiction, the American musical and Western,
1960s protest cinema, 1970s blockbusters, Oscar winners,
the superhero genre, arthouse cinema, international films,
and groundbreaking documentaries. Assignments include:
independent viewing projects, director studies, writing movie
reviews, researching film festivals, exploring university-level
film programs, and graded discussions.
6
```

===== PAGE 19 =====

```text
Course Offerings – Arts
HONORS VISUAL FOUNDATIONS
Prerequisite: None
This one-year introductory course provides students with the
skills, understanding, and knowledge required to be adaptive
experts in the art room. Through exploration and reflective
practice, students will learn the skills and behaviors with a
variety of media that will allow them to become creative and
purposeful communicators. This course is the prerequisite for
all Studio Art and Media Arts courses.
HONORS STUDIO-2D
Prerequisite: Visual Foundations
A deeper exploration of artistic behaviors and practices, this
course is a further examination of how art across various
two-dimensional media can be used to communicate ideas.
Students will develop their artistic voice by pursuing themes
that they develop independently. Through a choice-based
classroom model – students will have the flexibility to
choose to work across a variety of media: drawing, painting,
printmaking, digital production, and other two-dimensional
media. Student work will encourage personal expression
while fostering an appreciation for diverse artistic traditions
and styles in order to improve their critical thinking skills and
artistic vision.
HONORS STUDIO-3D
Prerequisite: Visual Foundations
A deeper exploration of artistic behaviors and practices, this
course is a further examination of how art across various
three-dimensional media can be used to communicate
ideas. This course exposes students to the exciting world of
three-dimensional art while developing their artistic voice
by pursuing themes independently through a choice-based
classroom model. Emphasizes hands-on exploration of
materials such as clay, wire, wood, plaster, found objects, and
more. Students will build upon foundational skills in carving,
modeling, assembling, and construction while exploring the
principles of form, space, balance, and texture. Student work
will challenge creative and critical thinking, transforming
ideas into tangible works of art with an emphasis on problem
solving, craftsmanship, experimentation as students create
sculptures, installations, and functional designs.
1
HONORS STUDIO ARTS II
Prerequisite: Honors Studio 2D or Honors Studio 3D
This course is an introduction to deep studio practice.
Focusing on one or two particular forms of expression – be
it drawing, painting, printmaking, culture, digital – students
will have an introduction to creating a series of work based
around their own artistic voice.
HONORS STUDIO ARTS III
Prerequisite: Studio Arts II
This course is a continuation of the Studio Arts II Honors
class. Students will research and develop independent projects
that focus on one or two forms of expression. Continuing
their work from Studio Arts II, students will create a series of
artworks based around their own artistic voices. As an honors
level course, students will be expected to conduct more
independent research and work on projects outside of class.
ADVANCED PLACEMENT STUDIO ART
Prerequisite: Studio Arts I or Media Arts I. Students may
enroll for a second year to complete a different portfolio.
Studio Art Advanced Placement is designed for students
who are seriously interested in the practical experience of art.
The AP examination for the course is not written; instead,
students submit portfolios for evaluation at the end of the
school year.
The instructional goals of the class are to encourage creative
as well as systematic investigation of formal and conceptual
issues; to emphasize making art as an ongoing process that
involves the student in informed and critical decision-
making; to develop technical skills and familiarize students
with the functions of the visual elements; and to encourage
students to become independent thinkers who will contribute
inventively and critically to their culture through the making
of art. This course is designed as an intensive program
requiring students to meet for a great number of contact
hours. Students need to work beyond the class period, and
trips to museums and galleries are required extensions of the
course. (The college formula for a studio art course is two
hours of outside work for every hour of class time.) Students
may create a 2-D Design Portfolio (prerequisite is Studio
Arts I or Media Arts I), 3-D Design or Drawing Portfolios
(prerequisite Studio Arts II or completion of 2-D AP
portfolio).
17
```

===== PAGE 20 =====

```text
ADVANCED TOPICS: ART HISTORY
Prerequisites: Open to recommended juniors and seniors only.
Step into the story of human creativity! AT Art History is a
journey across continents and centuries, exploring how people
have used art to express power, belief, beauty, and identity.
From prehistoric cave paintings to cutting-edge contemporary
installations, students will uncover how art both shapes and
reflects the world around us. This course isn’t just about
looking at art—it’s about experiencing it. Each unit includes
easy hands-on studio projects where students bring history
to life by experimenting with the same materials, techniques,
and creative challenges faced by artists throughout time.
By combining art-making with analysis, students will build
a deeper understanding of global culture—and discover
their own artistic voice along the way. This rigorous course
prepares students for the AP Art History exam and provides
foundational knowledge for further studies in art, history,
and related fields. It is ideal for curious and motivated learners
who wish to deepen their understanding of the human
experience through the lens of art.
HONORS THEATER I
Prerequisite: None
This class explores the fundamental skills of realistic acting
and the basic principles of directing and designing for the
stage. Students will have opportunities to practice in all of
these areas, but will ultimately be able to choose a particular
focus if desired. In this active, project-based environment,
students will learn how to access and develop their
individual imaginations and instincts in order to interpret
texts in innovative and resonant ways. They will learn how
to collaborate with a team to envision and produce work
that could never have been created alone. As theater is a
collaborative art form, the ability to contribute to a positive,
supportive class culture is critical to success.
18
HONORS THEATER II
Prerequisite: Honors Theater I
Emphasis is placed on further developing skills in acting,
directing, and design through more challenging projects.
Students will also explore new techniques and learn to take
greater ownership over their own artistic growth. As they
gain a more sophisticated understanding of themselves and
each other as collaborative artists, students will participate
more directly in their choice of material and speak more
meaningfully into each other’s work. In this environment, the
instructor becomes a coach and guide, helping students to
identify creative roadblocks and to explore which tools might
prove the most effective for staying in motion.
HONORS THEATER IN PERFORMANCE
Prerequisite: Theater II or three Cannon Theater Company
productions and permission of instructor. This course may be
repeated for credit.
This course is for experienced theater students who are ready
to commit to public acting, directing, or production design
opportunities, including Cannon Theater Company’s Fall
One-Acts and our spring event, Arts Jam. In addition to
preparing for specific performance events, students identify
and work on individual areas of growth, developing skills
that enable them to play a wider range of characters. Some
participation beyond school hours is expected. The ability
to self-direct, reflect, and communicate like a professional
is critical to success in this course as students engage in the
highly interdependent world of creative collaboration.
HONORS CONCERT CHORUS
Prerequisite: None. This course may be repeated for credit.
Students sing a wide variety of literature that has been
composed for mixed choirs. Students learn techniques related
to healthful and appropriate vocal production, body position,
breathing, vowel shape and modification, and singing within
an ensemble. While daily activities focus on preparation
for performances, the class also explores aspects of music
theory, music history, listening to music, ear training, part
recognition and part singing. Members are expected to
perform in several concerts each year as they constitute a large
portion of each singer’s grade. While the course name remains
consistent, the academic record reflects a student’s cumulative
progression through increasingly sophisticated repertoire and
higher expectations for technical mastery each year.
8
```

===== PAGE 21 =====

```text
HONORS STRING ENSEMBLE I
Prerequisite: Prior Strings experience or permission of the director.
This course accommodates the experienced instrumentalist
who wants to explore performing traditional orchestra
music while also being exposed to a wide variety of musical
genres. The class includes various quartets/quintets of
strings, woodwinds, brass, and percussion. Students
practice and perform within these smaller groups based on
instrumentation and skill level and also work collectively
as a Chamber Orchestra to explore music for larger groups.
Performance opportunities for the different chamber
ensembles will be required throughout the school year.
Students with previous string orchestra experience will spend
time outside of class preparing music and performing in small
and large groups.
HONORS STRING ENSEMBLE II
Prerequisite: Honors String I
Students in this course are expected to perform increasingly
sophisticated repertoire while exhibiting higher levels of
technical mastery and leadership than in their previous year.
HONORS STRING ENSEMBLE III
Prerequisite: Honors String II
Students in this course are expected to perform increasingly
sophisticated repertoire while exhibiting higher levels of
technical mastery and leadership than in their previous year.
HONORS STRING ENSEMBLE IV
Prerequisite: Honors String III
Students in this course are expected to perform increasingly
sophisticated repertoire while exhibiting higher levels of
technical mastery and leadership than in their previous year.
1
HONORS UPPER SCHOOL BAND
Prerequisite: Prior band experience or permission
of the director. This course may be repeated for credit.
This class builds on the foundation established in middle
school band. Students will perform in ensemble settings
ranging from Concert Band, to Big Band, to small classical
Chamber Ensembles. Regular individual practice, as well
as the ability to self-govern and extensively collaborate in
rehearsals are essential ingredients for success in this course.
Students who have not had at least two years of middle
school band experience will need to audition for the directors
prior to registration. While the course name remains
consistent, the academic record reflects a student’s cumulative
progression through increasingly sophisticated repertoire and
higher expectations for technical mastery each year.
HONORS CANNON SCHOOL JAZZ COMBO
Prerequisite: Audition or permission of instructor.
This course may be repeated for credit.
This ensemble will explore modern jazz in the small combo
format. We will do numerous performances throughout
the year. Daily classes will focus heavily on jazz theory
and improvisation. Participation in this class is granted by
audition only. Students wishing to participate in this class
must have had at least one year of Jazz 1 prior to registration.
HONORS MODERN ENSEMBLE
Prerequisite: Prior band experience or permission
of the director. This course may be repeated for credit.
This performing group is made up of any combination of
rhythm section, winds, strings, vocalists, or Hip-Hop MC’s.
We will study and perform music from any sub-genre that
falls under the American Pop umbrella of Rock, R&B, and
Rap. The class will focus on ear training and transcribing
techniques from existing recordings, as well as rehearsing
repertoire for future performances. We will lean heavily into
multi-track live and asynchronous recording via Soundtrap
to produce a body of recorded product during the course
of the year. While the course name remains consistent, the
academic record reflects a student’s cumulative progression
through increasingly sophisticated repertoire and higher
expectations for technical mastery each year.
19
```

===== PAGE 22 =====

```text
HONORS MUSIC TECHNOLOGY I
Prerequisite: None
In this course, students will learn the language and mechanics
of music (melody, harmony, rhythm, form) through
composition utilizing some of the latest in music technology.
In collaborative work with their fellow classmates, the
students will learn to compose original music as well as
arrange existing tunes. They will learn about many of the
instruments commonly used in contemporary recording
as well as the basics of multi-track recording. Interwoven
will be excursions in the fundamentals of music theory
and the foundation we stand on through examination of
contemporary music history. The course is designed for the
music novice. Prior experience in music is a benefit,but is in
no way a prerequisite.
HONORS MUSIC TECHNOLOGY II
Prerequisite: Music Technology I
Building upon the foundation set during their time in Music
Technology I, Music Technology II students will deepen their
compositional skills through study of some more industry
standard software such as Ableton Live and the Ableton Push
midi controller hardware. This software will offer the students
a much more broad palette of both midi and audio voices,
as well as a myriad of new ways to manipulate those sounds.
With Ableton, you have a choice of either planning and
pre-recording your work, or actually performing in real time
(making decisions on the fly as you go, like a Jazz musician
would). We will learn to do both. Your music will thereby
have even greater levels of complexity. Upon completion
of introductory benchmarks with this new software and
hardware, the students’ year will largely build upon the
autonomy we honed in Music Tech 1 and focus on self-
directed projects. At the end of the year, they will walk away
with a well stocked audio portfolio of great new music.
20
HONORS MUSIC TECHNOLOGY III:
MUSIC PRODUCTION
Prerequisite: Music Technology I and Music Technology II
Building on the foundational skills developed in Music Tech
1 and 2, this advanced course challenges students to apply
their knowledge in self-driven projects that reflect their
growth as composers and producers. Using industry-standard
DAWs such as Ableton Live and Logic Pro, students will
explore their creative potential, creating original works that
demonstrate both technical expertise and artistic vision.
Ideal for motivated individuals with a proven track record
in Music Tech, the musician in this course thrives in an
environment of independence and autonomy. By the end of
the year, students will have compiled an impressive portfolio
of compositions and productions, ready to showcase their
talents to the world. In Music Production, you chart your
own creative course.
HONORS CREATIVE DESIGN AND ENGINEERING I
Prerequisite: None
The Creative Design and Engineering (CDE) I course
is a project-based, hands-on exploration of the Iterative
Design Engineering process with a focus on aesthetics
and functionality. Students will master entry-level design
and skills in project planning, including idea curation and
development, drawing and plan development, and material
and time budgeting; fabrication and project refinement; and
self- and peer-reflection and assessment. Ultimately, students
will present their journey of growth in a variety of formats,
including live presentation and portfolio websites.
Students are introduced to a variety of fabrication tools in
areas such as woodworking, sewing, and basic electronics, as
well as areas of computer-aided design (CAD) such as 3D
printing, coding, laser cutting, and CNC cutting.
This course serves as a prerequisite for students to move to
advanced programming, design, and art-tech fusion courses.
0
```

===== PAGE 23 =====

```text
HONORS CREATIVE DESIGN AND ENGINEERING II
Prerequisite: Creative Design and Engineering I
The Creative Design and Engineering (CDE) II Course
provides students an opportunity to further develop and
challenge their idea curation; project planning, design,
and fabrication; self- and peer-assessment; and storytelling
skills. Through individual and group projects, students will
use Iterative Design Engineering to respond to increasingly
challenging design prompts, while developing physical and
digital artifacts that demonstrate their full creative potential.
Students will also explore their interests and passions to
create projects of their own choosing. Students will finish the
course with an understanding of the design and fabrication
process and how it can apply to real-world production
scenarios in areas such as woodworking, sewing, and basic
electronics, as well as areas of computer-aided design (CAD)
such as 3D printing, coding, laser cutting, and CNC cutting.
Students will document and share their journey of growth in
a variety of formats, including live presentation and
portfolio websites.
2
HONORS CREATIVE DESIGN AND
ENGINEERING STUDIO
Prerequisite: Permission of instructor
Creative Design and Engineering Studio (CDE-S) course is
a dynamic environment for students to continue to pursue
individual maker projects, honing their design, execution,
and storytelling skills. Emphasizing independence within
a collaborative framework, students will explore projects
of personal interest, while engaging in peer interactions for
feedback and shared learning. The course offers an open
block schedule, fostering flexibility and self-directed learning.
Evaluation is centered around portfolio development and
project check-ins, encouraging a standards-based approach
and active student participation in the assessment process.
Utilizing existing resources, CDE-S combines safety and
expert guidance to empower students as bold, conscientious
problem solvers, capable of making impactful contributions
through innovative projects.
21
```

===== PAGE 24 =====

```text
Course Offerings – Mathematics
HONORS ALGEBRA I
Prerequisite: Pre-algebra, full-year course in middle school
Algebra I introduces students to basic functions, their
graphs, and the rules of solving equations. Topics of the
course include the real number system, functions, domain
and range, linear equations and inequalities, linear functions,
systems of equations, factoring, quadratic functions and
equations, radicals, exponents, and basic sequences. Students
explore algebraic concepts using technology and practical
applications.
HONORS PRINCIPLES OF GEOMETRY AND ALGEBRA
Prerequisite: Honors Algebra I, full-year course in
middle or high school
The goal of this course is to strengthen and apply arithmetic,
algebra, and reasoning to measure the world around us.
Throughout the course, students learn various ways to
measure and describe shapes and develop an understanding
of traditional geometry concepts. Units focus on a variety
of topics including transformations, similarity, congruence,
basic trigonometry, circles, quadrilaterals, polygons, and
three-dimensional solids. Students use their knowledge
to solve a variety of problems. Students are constantly
working to strengthen previous skills and develop new
ones that will be necessary in future course work. Students
use their knowledge to solve a variety of problems and are
continually asked to justify their reasoning. Topics, include
length, symmetry, angle measure, transformations, linear
relationships, trigonoemtry, circles, perimeter, area, surface
area, and volume.
HONORS ACCELERATED GEOMETRY
Prerequisite: Honors Algebra I and Teacher Recommendation
The goal of this accelerated course is to learn the principles
of Euclidean geometry and apply algebra skills to solve
geometric problems. Much of the focus is on traditional
geometry concepts, including symmetry, measurement,
transformations, similarity, congruence, trigonometry,
polygons, circles, and three-dimensional solids. As time
allows, students explore the principles of probability. While
most of the topics are the same as Honors Geometry,
the rigor and depth of the study is greater. Students are
expected to sometimes work independently and other times
collaboratively to solve novel problems to deepen their
understanding. This course has a heavy emphasis on notation,
22
justification, and proof. Students who are successful in this
course enter with a firm command of their Algebra I skills,
particularly solving equations, identifying and applying
patterns, working with linear functions, factoring, solving
systems of equations, and operating comfortably with
numbers in a variety of forms including integers, decimals,
fractions, and radical expressions.
HONORS ALGEBRA II
Prerequisite: Honors Geometry, Principles of Geometry and
Algebra, or Honors Accelerated Geometry
Honors Algebra II uses functions to explore algebraic
concepts to reinforce and extend the skills and concepts
learned in Algebra I. The primary focus is on elementary
functions and their properties. Students learn techniques
for solving equations and simplifying expressions featuring
these functions. Graphing is a major component of this
course and students will utilize technology to enhance their
understanding. Throughout the year students will explore
linear, quadratic, polynomial, and exponential functions.
Students will learn to transform these functions graphically
and algebraically in an aim to understand the effects of those
changes. While this course covers much of the same content
as Accelerated Algebra II, the material is presented at a pace
that is more appropriate for the student who does not intend
to take AP Calculus in high school.
HONORS ACCELERATED ALGEBRA II
Prerequisite: Honors Geometry, Principles of Geometry and
Algebra, or Honors Accelerated Geometry
This course uses functions for an in-depth exploration of
algebraic concepts while making connections to the real
world. Throughout the year, students work to reinforce
concepts and skills from Algebra I and Geometry. Students
explore a variety of basic functions, equations, and their
properties. They explore the effect of transforming those
functions both algebraically and graphically. Students develop
sophisticated problem-solving techniques with the aid of
technology. Topics include linear, quadratic, polynomial,
radical, exponential, and logarithmic functions, mathematical
modeling, solving systems of equations, and a more in-depth
exploration of trigonometry and trigonometric functions.
All students are required to have a graphing calculator. This
course covers more content than Honors Algebra II and
moves at a quicker pace. In the accelerated course, there is
a higher emphasis on problem-solving and justification of
2
```

===== PAGE 25 =====

```text
methods. One of the primary goals of the course is to prepare
students for Accelerated Precalculus and subsequently AP
Calculus and AP Statistics.
HONORS PRECALCULUS
Prerequisite: Honors Algebra II or Honors Accelerated Algebra II
This course provides further development of advanced
algebraic concepts and trigonometry. Students work
toward mastering the techniques and concepts introduced
in previous algebra courses. There is a heavy emphasis
on understanding mathematical functions and their
properties. Students develop a more robust understanding of
trigonometry and explore some principles of mathematical
modeling, probability, and basic statistics. Topics include
properties of functions, polynomials, rational functions
and expressions, exponential and logarithmic relationships,
and trigonometry. Much of the content is similar to that
of Accelerated Precalculus, but the material is presented at
a pace and depth that is more appropriate for students not
planning to take AP Calculus in high school.
HONORS ACCELERATED PRECALCULUS
Prerequisite: Honors Accelerated Algebra II
The goal of this accelerated course is to prepare students for
college-level mathematics. Throughout the course, students
work to develop an in-depth understanding of polynomial,
rational, exponential, logarithmic, and trigonometric
functions and their properties. Successful students learn to
consider problems from multiple viewpoints: algebraically,
verbally, numerically, and graphically. Students learn more
advanced techniques for solving equations and manipulating
expressions. Students are introduced to basic calculus
principles including limits, derivatives, and approximating
area under a curve. As time allows, students may explore
conic sections, sequences and series, parametric equations,
and polar functions. There is a heavy emphasis on problem-
solving, proper notation, proof, and justification. This course
is a prerequisite for AP Calculus.
*Note: This course requires mastery of the material covered
in Honors Accelerated Algebra II. Students who completed
Honors Algebra II and are interested in accelerating must
gain approval from the Assistant Head of Upper School for
Academics to take this course. In order to be considered
for Acceleration, one must complete a form. If approved,
students must complete summer work to cover additional
material and pass a mastery test. Upon successful completion
of these requirements, students may be granted permission to
enroll in Honors Accelerated Pre-Calculus.
2
ADVANCED PLACEMENT PRECALCULUS
Prerequisite: Honors Accelerated Algebra II
AP Precalculus is a research-based exploration of functions
designed to prepare students for college-level calculus and
other advanced math and science courses. Students study
a broad range of function types that model real-world
phenomena across fields such as physics, biology, business,
and data science. Emphasizing conceptual understanding,
the course develops students’ ability to represent, manipulate,
and analyze functions graphically, numerically, analytically,
and verbally. Through modeling and problem-solving,
students learn to interpret relationships between quantities,
recognize limitations of mathematical models, and apply
quantitative reasoning to diverse contexts. The goal of this
class is to prepare for the Advanced Placement exam in May.
This course is best suited for students who are on track for AP
Calculus BC or who intend to take multiple levels of calculus
in college.
HONORS CALCULUS
Prerequisite: Honors Precalculus or
Honor Accelerated Precalculus
This course is designed to introduce students to the topics in
a semester of college calculus but with a less intense pace and
depth compared to the AP courses. The course begins with
a brief review of essential algebra and Precalculus concepts.
Students explore the concept of limits and learn techniques
for evaluating them. The remainder of the year is used to
develop a basic understanding of differential and integral
calculus. Students learn some of the more rudimentary
calculus techniques and apply them to a variety of problems.
Students who take this course should have a reasonable
command of algebra skills such as identifying patterns,
manipulating expressions, solving equations, graphing and
evaluating functions, factoring, operating with exponents,
and working with trigonometric relationships.
HONORS STATISTICS
Prerequisite: Honors Algebra II or Honors Accelerated Algebra
II. Open to juniors and seniors only.
This is a course designed to expose students to statistics.
Students will learn to graph and describe one- and two-
variable data sets, calculate standardized normal probabilities,
perform linear regression, and design experiments. Students
explore these applications of statistics in various fields such as
business, science, and psychology. The course emphasizes the
use of various technology tools. AP exams will not be given to
students in this course.
23
```

===== PAGE 26 =====

```text
ADVANCED PLACEMENT STATISTICS
(JUNIORS AND SENIORS ONLY)
Prerequisite: Accelerated Algebra II or Honors Precalculus;
rising seniors may take AP Statistics after Honors
Algebra II with recommendation.
This challenging class introduces students to the major
concepts and tools for collecting, analyzing, and drawing
conclusions from data. Students are exposed to the broad
conceptual themes of exploring data, observing patterns and
departures from patterns; planning a study, deciding what
and how to measure; anticipating patterns, producing models
using probability and simulation; and statistical inference.
The goal of the class is to prepare students for the Advanced
Placement exam.
HONORS DISCRETE MATHEMATICS AND
PERSONAL FINANCE (SENIORS ONLY)
Prerequisite: Honors Accelerated Algebra II
or Honors Algebra II
This course explores mathematics as it relates to the social
sciences. Students examine different voting methods and how
they can sometimes lead to vastly different, even paradoxical
results. They study fair division of indivisible objects, such
as a house, and use matrices to forecast population growth.
Using graph theory, students resolve scheduling conflicts
and design efficient routes. This course also examines the
mathematics behind money in everyday life. Students learn
to evaluate credit card offers and scrutinize the complexities,
formulas, and history behind various tax returns. They
compare different investment options and how long-term
growth is affected by yields, dollar-cost averaging, and tax
implications. This course is ideal as a terminal high school
math course alternative to statistics or calculus or as a senior
elective for students enrolled concurrently in a calculus and/
or a statistics course.
ADVANCED PLACEMENT CALCULUS AB
Prerequisite: Honors Accelerated Precalculus or
Honors Calculus
This rigorous class covers the topics of a semester of college
calculus. Students begin by analyzing graphs through
an in-depth study of limits, asymptotes, and continuity.
During the remainder of the first half of the year, students
learn the concepts and techniques of differential calculus
to analyze functions and solve real-world application
problems including straight-line motion, related rates,
and optimizations. In the second half of the year, we
explore integral calculus, learning a variety of strategies
and techniques. Students apply these to solving problems
24
involving rates of change, area, volume, and straight-line
motion. The goal of the class is to prepare students for the
Advanced Placement exam in May.
ADVANCED PLACEMENT CALCULUS BC
Prerequisite: Advanced Placement Calculus AB
This intense class covers two semesters of a first-year college
calculus. It is designed for the strongest math students who
have a great interest in the subject, especially those who
intend to pursue mathematics, physics, or engineering in
college. The pace is rigorous, and students are expected to
work rigorously. The course features a swift review of all
topics from Calculus AB plus additional applications, more
advanced integration techniques, parametric equations,
infinite series, vectors, and polar functions. The goal of the
class is to prepare students for the Advanced Placement exam
in May.
ADVANCED TOPICS IN
MATHEMATICS AND CALCULUS
Prerequisite: Advanced Placement Calculus BC
This course allows students who have completed the AP
Calculus sequence to delve deeper into the calculus content
they have learned and venture into areas of mathematics
that are not often explored at the high school level. This is
a student-centered, seminar-style class. The primary format
involves students completing problems independently in
order to present to their classmates and generate discussion.
There is little direct instruction: the teacher’s role is facilitator
and thought partner, not instructor. Much of the content
will be problems selected from the Mathematics 4C and
Mathematics 5 curricula from Phillips Exeter Academy in
Exeter, NH. Students will find these problems to be highly
integrated with concepts they have previously studied but
will often require them to learn new concepts. Students will
also explore more robust mathematical modeling in order to
solve novel problems and may include individual and team
projects. This course emphasizes and requires constant use of
the Adaptive Expertise traits and skills, including creativity,
risk-taking, reflection, and communication as students
collaborate during the problem-solving process. Students will
be evaluated on their contributions to the learning process as
well as their ability to clearly express and communicate the
concepts that are studied. There is no corresponding AP exam
at the end of this course.
4
```

===== PAGE 27 =====

```text
Course Offerings – Science
HONORS PRINCIPLES OF CHEMISTRY AND PHYSICS
Prerequisite: None
Principles of Chemistry and Physics is a hands-on, inquiry-
based course designed for ninth-grade students as an
introduction to the foundational concepts of physical science.
Using a phenomenon-based approach, students will explore
key ideas in chemistry and physics through observation,
experimentation, and collaborative analysis. Each unit
culminates in a project that challenges students to apply their
understanding to real-world scenarios. Topics include the
structure of matter, energy transformations, motion, forces,
and waves. This course emphasizes the development of critical
thinking, problem-solving, and communication skills to
prepare students for advanced science courses.
HONORS ACCELERATED PRINCIPLES OF
CHEMISTRY AND PHYSICS
Prerequisite: Recommendation of 8th grade
Science and Math Teacher
Accelerated Principles of Chemistry and Physics is a
challenging, hands-on course designed for motivated
ninth-grade students seeking an in-depth introduction to
the foundational concepts of physical science. Using an
inquiry-based approach, students will explore a broader range
of topics in chemistry and physics at an accelerated pace.
Emphasis is placed on independent work, critical thinking,
and advanced problem-solving. Through observation,
experimentation, and collaborative analysis, students
investigate key ideas such as the structure of matter, energy
transformations, motion, forces, and waves. This course
prepares students for success in advanced science coursework.
HONORS PRINCIPLES OF LIFE SCIENCE
Prerequisite: Honors Principles of Chemistry and Physics or
Honors Accelerated Principles of Chemistry and Physics
This introductory life science course provides students with
a comprehensive foundation in the fundamental concepts
of biological and environmental principles. Through
exploration of key biological concepts, students will examine
the structures, processes, and interactions that define living
systems. Topics include: cell biology, cellular energy, classical
and molecular genetics, evolution and ecology. Students
will develop scientific literacy and critical thinking skills
while gaining an understanding of how biological principles
connect across scales, from molecules to ecosystems. This
2
course prepares students for exploration of the life sciences
and provides essential knowledge for understanding the
living world.
HONORS ACCELERATED
PRINCIPLES OF LIFE SCIENCE
Prerequisite: Honors Principles of Chemistry and Physics or
Honors Accelerated Principles of Chemistry and Physics
This accelerated introductory life science course provides
students with an in-depth foundation in the fundamental
concepts of biological and environmental principles. Through
rigorous exploration of key biological principles, students will
examine the structures, processes, and interactions that define
living systems. Topics include: Cell Biology, Cellular Energy,
Classical and Molecular Genetics, Evolution and Ecology.
Students will develop advanced scientific literacy and critical
thinking skills while gaining a comprehensive understanding
of how biological principles connect across scales—from
molecules to ecosystems. This course emphasizes application-
based learning and analytical reasoning, challenging students
to apply biological concepts to real-world scenarios, design
investigations, and evaluate complex scientific problems.
Students will be prepared for advanced coursework in the
life sciences.
HONORS CHEMISTRY
Prerequisite: Honors Physics or Honors Accelerated Physics
This guided-inquiry based course is designed to create an
interest in and an understanding of the basic concepts of
chemistry. Class discussion, based on laboratory experiences,
will be used to develop the major ideas that describe the
properties, composition, and structure of matter along with
the role that energy plays to cause changes in matter. Topics
include atomic structure, chemical formulas, chemical
reactions and equations, stoichiometry, and thermo-
chemistry. An emphasis on the development of strong
problem-solving skills is a key focus of the course.
25
```

===== PAGE 28 =====

```text
HONORS ACCELERATED CHEMISTRY
Prerequisite: Honors Physics or Honors Accelerated Physics
This course uses guided inquiry, empirical evidence, and
class discussion to develop the major ideas that describe
the properties, composition and structure of matter and
the transformations of matter resulting from absorption
or emission of energy. The course covers the content of
the Honors Chemistry course at a faster pace along with
some additional content areas such as molecular geometry,
periodicity of elements, and acid-base chemistry. Students
will be required to solve more complex problems that
incorporate ideas from multiple content areas as they relate
to each other. Students will work in small groups leading
to whole class discussion along with activities that require
independent development of some ideas.
HONORS CHEMISTRY AND PHYSICS II
Prerequisite: Honors Chemistry or Honors Principles of
Chemistry and Physics or Honors Accelerated Principles of
Chemistry and Physics
Honors Chemistry and PhysicsII: Experimentation and
inquiry learning will guide students to develop ideas that
describe additional chemistry and physics concepts that were
not included in Honors/Accelerated Physics and Honors/
Accelerated Chemistry. Physics topics may include electricity,
magnetism, waves, sound, and optics while chemistry
topics will be focused around nuclear chemistry, kinetics,
equilibrium, acid-base chemistry and thermodynamics.
HONORS BIOLOGY
Prerequisite: Honors Chemistry or
Honors Accelerated Chemistry
This class is a rich introductory biology course that allows
students to connect key concepts in biology through lab
work, collaborative exploration, and guided research. Topics
include biochemistry, cellular biology, genetics, evolution,
ecology, and human biology. An essential component of the
course is connecting biology to its real-world applications.
To that end, students in biology will use the third trimester
to design, implement, and present a biology-related
research project.
26
HONORS ACCELERATED BIOLOGY
Prerequisite: Honors Chemistry or
Honors Accelerated Chemistry
This course will require that students use strong cognitive
and advanced analytical skills to engage with the major
principles of biology. The content will be presented at a
deeper level and at a faster pace than in an Honors Biology
class. Additional laboratory experiences, advanced analysis
and synthesis, and lab report writing will be incorporated
as students connect biology concepts to their real-world
applications. During the third trimester, the students
will design, implement, and present a biology-related
research project.
ADVANCED TOPICS: ENVIRONMENTAL SCIENCE
Prerequisite or Corequisite: Honors Biology
The goal of this course is to expose students to the scientific
principles, concepts, and methodologies required to
understand the interrelationships of the natural world.
Topics include exploring Earth’s Geologic Systems, Energy
Resources, Human Population Dynamics, Ecosystems,
Biodiversity, Global Change, and Sustainability. Students
will use the scientific process and hands-on experimentation
to analyze and evaluate environmental interactions to
predict models for future environmental dynamics. The
course culminates with a signature learning experience where
students conduct an independent research project on a topic
of their choosing, within the realm of environmental science.
ADVANCED PLACEMENT CHEMISTRY
Prerequisites: Honors Chemistry or
Honors Accelerated Chemistry
The AP Chemistry course is designed to meet the
requirements and curriculum of a year-long, two semester
general chemistry course (including the lab) usually taken
during the freshman year of college. The course begins
with a review of the major ideas developed in a first-year
chemistry course with an emphasis on more complex (AP
level) problems. Students will experience the challenge
of more complex lab work and the need to develop good
technique to ensure meaningful results while maintaining
a lab notebook. The year will focus on the study of 9 major
topics: Atomic Structure & Properties, Molecular and Ionic
Compound Structure & Properties, Intermolecular Forces &
Properties, Chemical Reactions, Kinetics, Thermodynamics,
Equilibrium, Acids and Bases, and Applications of
Thermodynamics. Much of the assessment is based on
students’ ability to be successful with practice AP problems in
preparation for the AP Chemistry exam in the spring.
6
```

===== PAGE 29 =====

```text
ADVANCED PLACEMENT BIOLOGY
Prerequisites: Honors/Honors Accelerated Biology
or Honors/ Honors Accelerated PLS
The AP Biology course is designed as the equivalent of a
college introductory course usually taken by biology majors
during their first year. Students have the option to take
the Biology AP exam at the end of the year, and with an
appropriate score, they may receive college credit. The course
is built around a series of student-directed, inquiry-based
labs and is focused on student research, experimentation, and
analysis. Topics in AP Biology include evolutionary biology,
the essential processes of living things, cellular energetics,
homeostasis, and the interaction of biological systems.
*Note: The science department recommends the completion
of Honors Accelerated Chemistry as preparation for success
in AP Biology. If students opt to take AP Biology as their
first Biology course after completing Honors Chemistry
(not accelerated), they should expect a more challenging
experience that might require additional work or help.
Additionally, there is a significant summer assignment
requirement for AP Biology as a means of preparing students
for the rigor of the course.
ADVANCED PLACEMENT PHYSICS 1
Prerequisites: Honors Physics or Honors Accelerated Physics
and Honors Algebra II or Honors Accelerated Algebra II.
Open to juniors and seniors only.
This course is an algebra-based, introductory college-level
physics course. Students will develop their understanding
of physics through inquiry-based investigations and solve
problems that require the ability to incorporate many
content areas into a single situation. Strong algebra skills are
a necessity as many of the problems rely only on variables
rather than numerical values.
Topics include: kinematics, dynamics, circular motion and
gravitation, energy, momentum, simple harmonic motion,
torque and rotational motion.
2
ADVANCED PLACEMENT PHYSICS C
Prerequisites: Advanced Placement Calculus AB
Co-requisite: Advanced Placement Calculus BC
The AP Physics course is equivalent to an introductory
calculus-based physics course in mechanics that would be
taken by engineering or physical science majors in college.
The mechanics topics from Honors or Honors Accelerated
Physics will be developed using calculus based mathematics
along with more in-depth problem solving. Basic calculus is
introduced in connection with physical principles. Students
take the AP Physics C Mechanics exam in May, and with an
appropriate score, they may receive college credit. Laboratory
work using PASCO computer probes is less guided and
requires more independent evaluation of data to develop
concepts. In addition, students are required to keep lab
journals, write lab abstracts, and deliver presentations
of lab results.
27
```

===== PAGE 30 =====

```text
Course Offerings – Science Electives
Note: Science elective courses do not fulfill
Science credits required for graduation.
HONORS MARINE SCIENCE
Prerequisites: Honors Chemistry or
Honors Accelerated Chemistry
The focus of this class is on learning about the animals that
inhabit the worlds’ oceans through lecture, lab work, and
projects. The principles of biology, chemistry and physics
that govern the worlds’ oceans are included so that students
better understand marine animals. One of the main activities
of this course is the setup and maintenance of saltwater
aquariums which allows students to put into practice the
topics discussed in class.
HONORS ANATOMY AND PHYSIOLOGY
Prerequisites: Honors Chemistry or
Honors Accelerated Chemistry and Biology
This course serves as an introductory course on the
anatomical structures and physiological processes of the
human body. The focus is on learning about several key body
systems such as skeletal, muscular, nervous, respiratory and
cardiovascular. While these body systems serve as the core
material, other anatomical topics and material are discussed
based on the interest of the students. A variety of methods
including direct instruction, labs, projects and discussions are
incorporated as students learn about the human body.
28
s
HONORS SEMINAR:
CONTEMPORARY ISSUES IN SCIENCE
Open to juniors and seniors only.
This course is an asynchronous , fully on-line course that
helps students gain an understanding and appreciation
for scientific phenomena that are relevant to scientifically
literate adults in the modern world. Students will use a robust
structured online class-management system to interact with
material and other students. The course will incorporate
pre-recorded videos, online discussions, and research and
writing assignments. Topics could include health. agriculture,
biotechnology, climate, neuroscience, astrophysics, genetics,
and energy.
8
```

===== PAGE 31 =====

```text
Course Offerings – Social Studies
HONORS WORLD HISTORY
Prerequisite: None
Honors World History begins with prehistory and the
ancient world, giving students an overview of human
development in the context of the Earth’s history and
geology, and taking us through the Neolithic revolution, early
states and empires, and world religions. Then, students will
get an overview of the first global age, from the Mongols to
transoceanic connections, and the revolutions of thought,
economy, politics, and empire in the “long 19th century.”
Finally, students will study the consequential movements of
the 20th century, including the world wars, decolonization,
the Cold War, and globalization. This course will also equip
ninth grade students with the skills needed for successful
study in any Upper School humanities class. Skills taught
include note-taking, historical reasoning, using sources,
outlining, and contextualization, causation, and comparison.
Students will also develop critical reading skills and will
practice argumentation and writing.
HONORS ACCELERATED WORLD HISTORY I
Prerequisite: Course recommendation by 8th grade teachers
Note: This course is intended for students with accomplished
reading comprehension and writing skills, a strong work
ethic, and an above-average interest in history.
This course will study the history of the ancient world from
the paleolithic period through the states and empires of
the classical period and will conclude with the beginning
of the modern world circa 1450 CE. Students will develop
and use the same skills, practices, and methods employed
by historians: analyzing primary and secondary sources;
developing historical arguments; making historical
comparisons; and utilizing reasoning about contextualization,
causation, and continuity and change over time. Assessments
will focus on primary source analysis, stimulus-based critical
thinking, and historical writing.
2
HONORS CIVICS: FOUNDATIONS OF
DEMOCRACY AND CITIZENSHIP
Prerequisite: Honors World History or
Honors Accelerated World History I
This course introduces 10th-grade students to the
fundamental principles of democracy, citizenship, and
economics in both historical and modern contexts.
Students will explore key concepts such as the Constitution,
federalism, the branches of government, civil liberties, and
the role of civic participation in shaping society. In addition,
the course will examine basic economic principles and
the government’s role in the economy. Through engaging
discussions, case studies, and project-based learning, students
will develop a deeper understanding of the connections
between government, economics, and society. The course
also emphasizes critical thinking, civil discourse, and effective
communication, encouraging students to become informed,
responsible citizens who understand both the political and
economic forces shaping their communities.
ADVANCED TOPICS: WORLD HISTORY II
Prerequisite: Honors World History or
Honors Accelerated World History I
In this advanced course, students investigate the content
of world history for significant events, individuals,
developments, and processes circa 1450 CE to the present.
Students will develop and use the same thinking skills and
methods employed by historians: analyzing primary and
secondary sources; developing historical arguments; making
historical comparisons; and utilizing reasoning about
contextualization, causation, and continuity and change
over time. Assessments will focus on primary source analysis,
stimulus-based critical thinking, and historical writing.
Students will also complete a Signature Learning Experience
(SLE), our Colloquium, a research project based on a current
event, culminating in a policy proposal which they will
defend in a presentation.
Students enrolled in this course may—but are not required
to—sit for the Advanced Placement (AP) World History:
Modern exam at the end of the year.
29
```

===== PAGE 32 =====

```text
HONORS UNITED STATES HISTORY
Prerequisite: Honors Civics or Advanced Topics:
World History II
In US History Honors, students will examine the exciting
history and story of the American nation. It is a dynamic
and interactive class where students learn about the people,
places, and events that have shaped America’s distinctive place
in a global society today. This course helps students to learn
to think critically and creatively while assisting students as
they work to improve and hone their writing, research, and
analytical skills.
The class examines the development and evolution of
the concepts of equality, liberty, democracy, rights,
and opportunity in American society. A thematic and
chronological approach weaves together these themes
and ideals in order to provide students with a better
understanding of the United States today. Students devote
considerable time to the study of how these themes and ideals
shaped the nation’s political, economic and social systems
as well as the United States’ interactions with the rest of the
world in war and peace.
Throughout the course students are challenged to examine
their preconceptions and prejudices about the history of the
nation. This course begins with America pre-colonization and
will culminate with modern US History, examining how each
major moment shapes our country today. Throughout the
year, we will constantly weave in current events to our classes
so students can see how history is being made each and every
day. This adventure in history allows students to discover how
the past has shaped the present, leading students ultimately
to analyze America’s place in a global world today. The course
culminates with a series of discussions about modern issues
including the War on Terror, immigration, the economic
collapse and other pressing issues.
30
ADVANCED TOPICS: UNITED STATES HISTORY
Prerequisite: Honors Civics or Accelerated World History II
Advanced Topics: United States History hones students’
analytical skills, helping them understand and evaluate US
History from its most minute measures of experience to its
most complex concepts. Throughout the course, students will
continue to develop the historical thinking, research, and
processing skills necessary to arrive at conclusions based upon
informed judgments and to present reasons and evidence
clearly and persuasively in varied historical writing formats.
We will investigate various themes in US History, including
diversity, culture, demographic change, economic
transformation, the impact of American society on its
environment, globalization, politics, reform, religion, the
legacy of slavery, war and diplomacy, and the evolution of
the American Identity. Various activities, from analyzing
documents and experiencing simulations to leading class
discussions, allow students to demonstrate the skills of an
historian while uncovering the complexity of the enduring
change that is American history.
Students begin their reading assignments over the summer.
Emphasis is placed on critical thinking, historical writing and
research, interpretation of original documents, and analysis
of scholarly writings. Lectures, discussions, and activities – in
addition to the nightly readings from the text and documents
– serve as guides through the major political and social
developments in the United States. Students will complete
nightly assignments in order to be prepared to engage in
the in-depth classroom analyses and activities. The course
will culminate with a Signature Learning Experience,
our Symposium, that invites students to demonstrate
their learning.
Students enrolled in this course may – but are not required
to – sit for the Advanced Placement (AP) United States
History exam at the end of the year.
0
```

===== PAGE 33 =====

```text
Course Offerings – Social Studies El
Note: Social Studies elective courses do not fulfill
Social Studies credits required for graduation.
HONORS PRACTICUM:
CIVIL DISCOURSE AND THE SOCIAL SCIENCES
Open to juniors and seniors only.
In a world of nonstop headlines, infotainment, and
competing narratives, it’s easy to feel overwhelmed—or tune
out altogether. This course helps students cut through the
noise and use the social sciences as tools for understanding
what’s happening right now.
Using current events as the starting point, students explore
economics, psychology, sociology, political science, and
history through curious questions that spark discussion and
debate. Through simulations, case studies, role-plays, media
analysis, and collaborative projects, students examine how
ideas spread, why people disagree, and how global and local
forces intersect.
The course follows a hybrid format: students prepare
asynchronously during some class blocks (research, reading,
analysis) and come together for active, discussion-based
learning. A distinctive practicum component allows students
to design and teach mini-lessons in Lower and Middle School
classes focused on persuasion, civil discourse, and writing,
turning analysis into real-world practice.
Ideal for students interested in the social sciences, this
course builds transferable skills in critical thinking,
communication, and perspective-taking—skills that matter
in college and beyond.
HONORS PSYCHOLOGY
Prerequisite: Open to juniors and seniors only.
How does my brain really work? Can more sleep improve
my memory and well-being? Why is it so hard to put my
phone down or stop binge-watching on Netflix? How
can I better manage stress and tell the difference between
psychological facts and myths? What is the science of
happiness? These questions and many more guide the
learning in Honors Psychology.
This course introduces students to the foundations of
psychological science while diving deeply into topics that
3
lectives
are especially relevant to high school life. Students explore
how biological processes, learning, memory, motivation,
consciousness, and wellness influence behavior and decision-
making. Throughout the course, students apply psychological
concepts to real-world situations and practice essential
science skills such as experimental design, data interpretation,
and critical evaluation of research.
Learning is active and inquiry-driven—students design
and conduct small-scale research, analyze media, engage in
seminars, listen to podcasts, and explore human behavior
through documentaries and hands-on projects. Throughout
the course, students also reflect on their own thinking, habits,
and growth as learners.
The ultimate goal of Honors Psychology is to help students
apply psychological science to understand themselves and
others—so they can think stronger and thrive beyond
the classroom.
ADVANCED PLACEMENT PSYCHOLOGY
Prerequisite: Open to recommended seniors only.
Why do people think, feel, and act the way they do? AP
Psychology introduces students to the scientific study of
human behavior and mental processes. Students explore
major topics in contemporary psychology including
biological bases of behavior, sensation and perception,
learning, cognition, development, motivation, emotion,
personality, social psychology, and mental health.
Throughout the course, students apply psychological
concepts to real-world situations and practice essential
science skills such as experimental design, data interpretation,
and critical evaluation of research. Learning experiences
include interactive investigations, simulations, and projects
that connect psychological principles to students’ own lives,
wellness, and communities.
Designed to mirror an introductory college-level psychology
course, AP Psychology builds both academic confidence and
curiosity. Students strengthen their skills in analytical writing,
research, and scientific reasoning while also learning about
themselves as thinkers and learners through evidence-based
study strategies and metacognitive reflection. This course is
ideal for students interested in understanding human behavior
and preparing for college-level work in any discipline.
31
```

===== PAGE 34 =====

```text
Students enrolled in this course may—but are not required
to—sit for the Advanced Placement (AP) Psychology exam
at the end of the year.
*Note: The College Board curriculum includes topics which
may be sensitive for some students. Specific course content
can be found online for review.
ADVANCED TOPICS:
UNITED STATES GOVERNMENT AND POLITICS
Prerequisite: Honors US History or
Advanced Topics: US History
The Advanced Topics course in US Government and
Politics provides students with an analytical perspective on
government and politics in the United States.
This course includes both the study of general concepts used
to interpret US politics and the analysis of specific examples.
The course begins with a summer assignment which guides
students through some of the foundational principles of
American Government and engages students in analysis of
various current events relevant to our government system.
Throughout the rest of the year, students will become familiar
with topics including: the constitutional underpinnings of
the United States government, political beliefs and behaviors,
political parties, interest groups, and civil rights and liberties.
The course culminates with our signature learning experience,
Oral Arguments, in which students apply their mastery of
course content by participating in a simulation of an ongoing
Supreme Court hearing before a panel of faculty “justices”.
By participating in this course students should leave with the
knowledge and skills necessary to be political rather than
partisan, as they engage and become more involved in our
national political discourse. The course is taught at the college
level, using college textbooks and other primary sources.
Students enrolled in this course may—but are not required
to—sit for the Advanced Placement (AP) U.S. Government
and Politics exam at the end of the year.
32
ADVANCED TOPICS: EUROPEAN HISTORY
Prerequisite: Advanced Topics World History II OR Advanced
Topics United States History. Open to seniors only.
In this hybrid senior course, students investigate the content
of European history for significant events, individuals,
developments, and processes from approximately 1450 to
the present. Students will develop and use the same thinking
skills, practices,and methods employed by historians:
analyzing primary and secondary sources; developing
historical arguments; making historical connections; and
utilizing reasoning about comparison, causation, and
continuity and change over time.
The course also provides seven themes that students explore
throughout the course in order to make connections
among historical developments in different times and
places: interaction of Europe and the world, economic
and commercial development, cultural and intellectual
development, states and other institutions of power, social
organization and development, national and European
identity, and technological and scientific innovations.
Assessments will focus on primary source analysis, stimulus-
based critical thinking, and historical writing.
As this is a hybrid course, students should come into the
class both with an understanding of the writing requirements
for an AP/AT level history course as well as the proven
ability to work autonomously on work outside of the formal
class setting.
Students enrolled in this course may—but are not required
to—sit for the Advanced Placement (AP) European History
exam at the end of the year.
2
```

===== PAGE 35 =====

```text
Course Offerings – World Language
WORLD LANGUAGE COURSE PLACEMENT POLICY
(HERITAGE AND NATIVE SPEAKERS)
Cannon School maintains a World Language Department
policy to ensure equitable, rigorous, and developmentally
appropriate course placement for heritage and native speakers.
This policy outlines identification procedures, enrollment
expectations, and pathways for advanced study to support
meaningful linguistic and cultural growth for all students.
Students and families are expected to review and follow this
policy as outlined in the Cannon School Handbook.
HONORS SPANISH I: NOVICE
Prerequisite: None
In the Novice /Novice A range level of proficiency,
students develop foundational skills in communication,
comprehension, and presentation in oral and written
form on highly familiar topics, using isolated words and
essential phrases in the context of culture, connections,
and comparisons. Assessments are proficiency-based and
aligned with three communication modes: interpretive
(reading and listening), interpersonal (spontaneous listening/
speaking or reading/writing), and presentational (structured
speaking/writing). Cultural insights, cross-disciplinary
connections, and language comparisons are integrated into
these assessments when relevant. Instruction is primarily in
Spanish, with the goal of 90% target language use, though
English is incorporated as needed for clarity.
HONORS SPANISH II: INTERMEDIATE FOUNDATIONS
Prerequisite: Honors Spanish I
In Spanish II, students progress within the Novice-High
to Intermediate-Low proficiency range, building skills to
communicate across a broader range of familiar topics.
Through an intercultural approach, students engage in
interpretive, interpersonal, and presentational tasks that
foster growth in listening, reading, writing, and speaking.
Performance-based assessments allow them to demonstrate
communicative progress, showcasing their language abilities
in real-world contexts. This dynamic course emphasizes daily
interaction, actively immersing students in Spanish through
practical scenarios and meaningful exchanges. Instruction is
conducted primarily in Spanish, with the goal of 90% target
language use in the classroom.
3
es
HONORS SPANISH III: INTERMEDIATE MID A
Prerequisite: Honors Spanish II
In the Intermediate Mid A/Intermediate A range level,
students learn, in oral and written form, to participate
in exchanges, and present on a variety of topics using
familiar vocabulary and learned grammatical structures
in the context of culture, connections, and comparisons.
Assessments are Proficiency-based. Students are assessed on
the Communication standard in three modes: interpretive
(reading, listening), interpersonal (spontaneous listening/
speaking or reading/writing), and presentational (formal
speaking and writing). This course is taught with the goal of
90% target language use in the classroom. This course counts
towards the Global Education certificate.
HONORS SPANISH IV: INTERMEDIATE MID B
Prerequisite: Honors Spanish III
In Spanish IV, students progress within the Intermediate
Mid B to Intermediate B proficiency range, further refining
their language skills and enriching cultural understanding
built in prior courses. This course broadens students’
exposure to diverse accents from Spanish-speaking countries,
enriching their listening skills and cultural awareness.
Students demonstrate mastery in the three communication
modes: interpersonal (spontaneous listening and speaking),
interpretive (reading and listening), and presentational
(structured speaking and writing). They are challenged to
use more sophisticated language across various time frames
with expanded vocabulary. Proficiency-based assessments
require critical thinking and application in real-life scenarios,
including interactions with native speakers in the broader
community. Instruction emphasizes 90% of target language
use. This course fulfills a requirement for the Global
Education certificate.
33
```

===== PAGE 36 =====

```text
HONORS SPANISH V: LANGUAGE WITH A PURPOSE
Prerequisite: Honors Spanish IV
Spanish 5 invites students to use Spanish as a tool for
communication, leadership, and real-world connection.
Through a proficiency-based approach aligned with ACTFL
standards, students engage in authentic interpretive,
interpersonal, and presentational tasks that emphasize what
they can do with the language.
Learning extends beyond the classroom through visits to local
public and private institutions, nonprofit organizations, and
language schools, as well as through in-person and virtual
conversations with native Spanish-speaking professionals
from diverse fields such as education, law, psychology, and
business. Each experience involves purposeful preparation,
meaningful dialogue, and reflective follow-up.
Students explore six thematic unit: Social Media and Youth,
Global Citizenship, Global Issues, Education and Careers,
The Traveling World, and Art and Aesthetics, tailored to their
interests and future goals.
Conducted entirely in Spanish, this course fosters proficiency,
cultural competence, and global awareness, and fulfills a
requirement for the Global Education Certificate..
ADVANCED PLACEMENT SPANISH
LANGUAGE AND CULTURE: ADVANCED
Prerequisite: Honors Spanish IV
AP Spanish Language and Culture is a rigorous,
interdisciplinary course—taught exclusively in Spanish—,
where students build their proficiency in the language
toward the advanced-low level, across the three modes
of communication: Interpretive, Interpersonal and
Presentational. Culture is central to content as we explore
products, practices, and perspectives of various Spanish-
speaking countries. Each unit targets a primary theme
but also connects to additional contexts for those themes,
explored though an inquiry-based approach. The course
focuses on the integration of authentic resources including
online print, audio, and audiovisual resources; as well as
traditional print resources that include literature, essays, and
articles. Students practice various task models that familiarize
them with what will be on the AP exam, while they express
different views on real-world issues, make connections to
other disciplines, and compare aspects of the target culture(s)
to their own. This course counts towards the Global
Education certificate.
34
HONORS FRENCH I: NOVICE
Prerequisite: None
In the Novice/Novice A range level, students in French
I work on acquiring vocabulary and skills to start
communicating in French. They are presented with scenarios
that allow them to perform simple communicative tasks
such as making requests in class, greeting someone, asking
for and giving personal information, describing someone’s
personality, talking about their classes and talking about
their daily activities. Our focus performance-wise is centered
on interpersonal communication –talking to someone one
on one—and on interpretive communication—listening
to someone and responding/reacting according to what
is understood. In addition, this course introduces cultural
aspects of a variety of francophone regions. The course
is conducted mainly in French, but English is used when
clarification is required.
HONORS FRENCH II: INTERMEDIATE FOUNDATIONS
Prerequisite: Honors French I
In the Novice B/Intermediate Low range level, students
in French II work on building upon the language skills
developed in French I. Topics are presented in different
scenarios that allow students to communicate in French while
keeping their focus on advancing their performance at the
interpersonal, interpretive and presentational levels. Students
work on activities such as talking about daily activities and
routines, describing what they did at a specific time in the
past and talking about their plans for the future. Although we
work on all three modes of communication mentioned above,
we focus a lot of our time and attention on the interpersonal
level –speaking to someone one on one and the interpretive
level –listening to someone and answering/reacting based on
what is understood. Students continue to work on building
their confidence to use the language in different situations.
In addition, the course introduces cultures, traditions
and current events of the francophone world. The course
is conducted mainly in French, but English is used when
clarification is required.
4
```

===== PAGE 37 =====

```text
HONORS FRENCH III: INTERMEDIATE MID A
Prerequisite: Honors French II
Students in French III, operating within the Intermediate
Mid A/Intermediate A range level, embark on an immersive
language experience. They participate in oral and written
exchanges, presenting diverse topics using familiar
vocabulary\ and acquired grammatical structures, all
within the enriching context of culture, connections, and
comparisons. The course’s assessments are proficiency-based,
evaluating students on the Communication standard in
interpretive (reading, listening), interpersonal (spontaneous
listening/speaking or reading/writing), and presentational
(formal speaking and writing) modes.
Building upon their foundation from French II, students in
this course concentrate on mastering previously encountered
vocabulary and grammatical structures. Immersed in a
French-language environment, this course adheres to
a 90% target language use in the classroom, ensuring a
comprehensive language experience, and it counts towards
the Global Education certificate.
HONORS FRENCH IV: INTERMEDIATE MID B
Prerequisite: Honors French III
In French IV, operating within the Intermediate Mid
B/Intermediate B range level, students continue to
deepen their understanding of advanced grammar and
vocabulary, all conducted in the immersive French
language environment. Students refine and enhance their
language skills and gain exposure to the accents of speakers
from various French-speaking countries. This exposure
enriches their linguistic experience and broadens cultural
understanding. Demonstrating mastery of concepts occurs
within the framework of interpersonal (spontaneous
listening/speaking), interpretive (reading/listening), and
presentational (speaking/writing) tasks. The challenge lies
in producing more detailed language using various time
frames and a richer vocabulary. Proficiency-based assessments
require learners to think critically in real-life scenarios, mainly
through interactions with different French speakers from
the broader community. The class is taught in French, and it
counts towards the Global Education certificate.
3
HONORS FRENCH V: INTERMEDIATE HIGH
Prerequisite: Honors French IV
This course is an intensive language class that prepares
students for advanced language communication skills. It is
designed for students who wish to develop all four language
skills: listening, speaking, reading, and writing. Equivalent
to a fourth semester college course, it includes aural and
oral skills, reading comprehension, grammar, and written or
visual projects. Emphasis is placed on active communication,
acquisition of vocabulary, development of expository
passages, and ability to express ideas orally and in written
form. Field trips, lectures, magazines, films, and educational
activities are part of the course instruction. This course counts
towards the Global Education certificate.
ADVANCED PLACEMENT
FRENCH LANGUAGE: ADVANCED
Prerequisite: Honors French IV
This course is an intensive language class that prepares
students for the Advanced Placement French language
examination in the spring. It is designed for students who
wish to develop all four language skills: listening, speaking,
reading, and writing. The course is comparable to a 4th
semester college course that focuses on speaking and writing
in the target language at an advanced level. French AP
emphasizes active communication, acquisition of vocabulary,
and the development of expository passages. Field trips,
lectures, magazines, films, and educational activities are part
of the course instruction. This course counts towards the
Global Education certificate.
HONORS CHINESE I : NOVICE
Prerequisite: None
Chinese I is an introductory course in Mandarin Chinese,
a tonal language. The goal of this course is to help students
gain functional communication in speaking, writing, reading,
and listening. The curriculum is designed to assist students
in gaining social and cultural knowledge of the Chinese
language and contemporary China. Chinese I will cover
numerous themes that are related to useful real-life Chinese
language such as: greetings, family, date & time, hobbies,
etc. Students will develop various strategies and study habits
to strengthen speaking and writing skills. Pinyin (Chinese
Romanization) and Chinese characters are taught. Students
learn to communicate about daily life and other topics of
interest.
35
```

===== PAGE 38 =====

```text
HONORS CHINESE II: NOVICE MID A
Prerequisite: Honors Chinese I
Chinese Level II is designed for students who have a
fundamental foundation of the target language. Students will
be taught the skills to discern language patterns and forms. As
time progresses, students are expected to start to understand
the intricacies of the language and to be creative with it.
From this knowledge, students can create complete sentences
or clusters of sentences and carry on short spontaneous
conversations. To improve comprehension skills, the teacher
will speak Chinese as much as possible to students during
class.
HONORS CHINESE III: NOVICE MID B
Prerequisite: Honors Chinese II
In Chinese III, students are expected to learn additional
characters (words and vocabulary), their pronunciations,
meanings, ways of writing them and more importantly, the
compound usages of these words. Students will expand their
ability to write Chinese. In Chinese III the emphasis will
be given to verbal usages of the language and the relevant
topics that students have expressed an interest in, such as
styles of living in China, the weather, seasons, food, color,
clothing, friends and useful communication and dialogue
(making phone calls and directions) that take place in daily
life. Most of the language used by the teacher in presentations
and speaking to students will be in Chinese to improve
comprehension and speaking skills. By the end of Level III,
students are expected to be functionally fluent enough to
handle almost all typical situations in dealing with everyday
tasks and some abstract topics. Level III also focuses on
polishing students’ accuracy and fluency in pronunciation.
In both speech and writing, students are expected to produce
clusters of sentences and even short paragraphs. Level III
students are tasked with the goal of circumlocution such that
when they may not know a particular word, they are expected
to talk around it to allow the listener to achieve a general
understanding of the overall content. This course counts
towards the Global Education certificate.
36
HONORS CHINESE IV:
INTERMEDIATE FOUNDATIONS
Prerequisite: Honors Chinese III
In Chinese IV, students build upon their Chinese foundation
and learn more complex language structures. Students will
become more proficient in discussing current events, short
stories, and cultural differences. Chinese IV emphasizes
the use of linking words and phrases in order to coherently
express a series of campus themes that relate to students’
school or home life in the Chinese language. Assessment
will be based upon student achievement in reading, writing,
speaking, and listening comprehension. The class will be
conducted in the target language where the teacher will
speak almost entirely in Chinese to the students during class.
Level IV is designed to prepare students for the upcoming
AP language class by giving them AP-like tasks and teaching
strategies to succeed with those tasks. Students are expected
to continue to increase their fluency in handling everyday
tasks and in many abstract topics. This course counts towards
the Global Education certificate.
HONORS CHINESE V: INTERMEDIATE MID A
Prerequisite: Honors Chinese IV
In Chinese V, students will become more proficient in
discussing current events, short stories, and cultural
differences. Chinese V provides an opportunity for the
student to acquire better speaking skills in Chinese with the
emphasis on natural, colloquial usage. New vocabulary and
idiomatic phrases will be emphasized so that the student
can hold more detailed conversations in Mandarin during
each class. Level V students will review grammar and key
sentence patterns of Chinese and develop complete sentence
structure, provide practice in the appropriate use of idiomatic
expressions, and further develop skills in reading and writing
Hanzi (Chinese characters) and essay writing. The course
will also build vocabulary, expand reading comprehension,
and encourage extensive conversation in Chinese. It will
cover additional aspects about Chinese culture, history and
geography. This course counts towards the Global
Education certificate.
6
```

===== PAGE 39 =====

```text
ADVANCED PLACEMENT
CHINESE LANGUAGE AND CULTURE
Prerequisite: Honors Chinese IV
The AP Chinese Language and Culture course is designed
to be comparable to fourth semester (or equivalent)
college/university courses in Mandarin Chinese. This
college level course deepens students’ immersion into
the language and culture of the Chinese-speaking world
and typically represents the point at which students
complete approximately 250 hours of college-level
classroom instruction. Coursework provides students with
opportunities to perform Intermediate- to Advanced-level
tasks, and students are expected to achieve proficiencies
throughout, and sometimes beyond, the Intermediate range,
as described in the American Council on the Teaching of
Foreign Languages (ACTFL) Proficiency Guidelines.
The AP course prepares students to demonstrate their level of
Chinese proficiency across the three communicative modes
(Interpersonal, Interpretive, and Presentational) and the
five goal areas (Communication, Cultures, Connections,
Comparisons, and Communities). Its aim is to provide
students with ongoing and varied opportunities to further
develop their proficiencies across the full range of language
skills within a cultural frame of reference reflective of the
richness of Chinese language and culture. AP Chinese
Language and Culture teachers plan and implement a course
that focuses on language proficiency while interweaving level-
and age appropriate cultural content throughout the course
and providing for frequent formative assessment of students’
developing proficiencies within the context of their learning.
Instructional materials and activities are carefully and
strategically adapted from authentic sources to support the
linguistic and cultural goals of the course. This course counts
towards the Global Education certificate.
37
```

===== PAGE 40 =====

```text
Course Offerings – Innovation, Enterp
Note: Electives in this category do not fall under the umbrella
of one department and are therefore not listed under a specific
department. Innovation & Enterprise as well as general
electives may be taught by faculty from a different department
from year to year
ADVANCED TOPICS: PRINCIPLES OF
COMPUTER SCIENCE AND CODING
Open to juniors and seniors only.
Advanced Topics: Principles of Computer Science and
Coding introduces students to the breadth of the field of
computer science and its impact on our daily lives. In this
course, students learn to design and evaluate solutions,
develop algorithms and programs, and apply computer
science to solve real-world problems. They explore how
computing systems and innovations, including the internet
and AI, work, as well as their potential benefits and
consequences. Students will also use data to generate new
knowledge, incorporate abstraction into their programs,
and communicate ideas about technology. Throughout the
course, they’ll collaborate ethically and creatively to harness
the power of technology to address meaningful challenges in
an increasingly digital world.AT Computer Science Principles
introduces students to the breadth of the field of computer
science and its impact on our daily lives. In this course,
students learn to design and evaluate solutions, develop
algorithms and programs, and apply computer science to
solve real-world problems. They explore how computing
systems and innovations, including the internet and AI, work,
as well as their potential benefits and consequences. Students
will also use data to generate new knowledge, incorporate
abstraction into their programs, and communicate ideas
about technology. Throughout the course, they’ll collaborate
ethically and creatively to harness the power of technology
to address meaningful challenges in an increasingly
digital world.
ADVANCED PLACEMENT COMPUTER SCIENCE A:
CODING & COMPUTER SCIENCE
Prerequisite: Open to juniors and seniors only.
AP Computer Science A introduces the fundamentals of
computer science through programming, focusing on object-
oriented design in Java. Students develop essential skills in
problem-solving, algorithm development, data structures,
and program implementation, exploring concepts like classes,
methods, and control structures to build logical solutions to
38
prise and General Electives
complex problems. This course provides a strong foundation
for future studies in computer science and prepares students
for the AP Computer Science A Exam, potentially earning
college credit.
SENIOR COLLOQUIUM: LEADERSHIP
Prerequisite: Open to seniors only.
This course offers students leadership training for school and
beyond. Students who take this course should have a passion
for leadership. Students will read and respond to a range of
leadership literature, navigate their own leadership challenges
with help from the instructor, and collaborate to chart
the curriculum.
HONORS GLOCAL PERSPECTIVES
Prerequisite: Open to seniors only. This course does not fulfill
the World Language requirement. This course is required for
completion of the Global Education Certificate.
The Glocal Perspectives course offers an immersive
exploration of both global and local perspectives. Students
will comprehensively explore global and local perspectives
in practice, investigating key aspects defining the global and
local landscape through a service learning model.
Students will engage in in-depth discussions and critical
analyses of pressing issues and case studies, such as
environmental sustainability, cultural diversity, human
rights, and health, among other related topics. They will
actively engage with communities, organizations, and
individuals who support them to deepen their understanding
through hands-on projects, gaining insights into the
complexities of these challenges. Through this process,
students will sharpen their cultural competence and
communication skills as they explore diverse perspectives
through interactive activities and discussions that will foster
an appreciation for diversity and equip them with the tools to
navigate cross-cultural interactions.
By partnering with different social organizations, students
will have the opportunity to participate in real-world
initiatives that make constructive contributions to Glocal
issues. This hands-on experience solidifies the principles of
global citizenship. Students’ Capstone projects focused on a
chosen glocal issue serve as the signature learning experience
that showcases students’ mastery of the course content.
8
```

===== PAGE 41 =====

```text
HONORS BUSINESS OF ESPORTS
Prerequisite: Recommendation required
The Business of Esports is a uniquely crafted course that
offers students a hands-on experience exploring the Esports
industry and entrepreneurship. Whether you dream of
launching your own business venture or aspire to take the
reins of the Cannon School Esports program, this course
empowers students with practical skills and strategic insights
needed for success.
Students in the course serve as interns for the Collective
Esports Company – a small grassroots consulting company –
to create amazing events, launch esports programs for other
schools/organizations, and manage the Cannon School
Esports program. This course will also cover event planning,
budget management, writing and pitching sponsorship
proposals, broadcast/camera work, marketing, and tech
support. By the end of this course, students will be equipped
with the skills necessary to launch their own small businesses.
ADVANCED TOPICS:
MICROECONOMICS: POLITICS AND POLICY
Prerequisite: Open to juniors and seniors only. Required pre/
co-requisite: Honors/AT United States History. Required
prerequisite: Algebra II and teacher recommendation.
Advanced Topics: Microeconomics: Politics and Policy is a
rigorous, college-level course designed for students who are
ready to engage deeply with the economic principles that
shape the choices of individuals, firms, and policymakers.
Throughout the course, students will explore foundational
microeconomic concepts including supply and demand,
elasticity, consumer choice, production and costs, market
structures, factor markets, income distribution, and market
failure, while also examining how these ideas intersect with
political decision-making and public policy at the local, state,
and national levels.
Students will work extensively with graphs, economic models,
and real-world data to investigate how markets function and
to evaluate the effectiveness of government interventions
intended to promote efficiency, equity, and social welfare.
Through case studies, simulations, and policy analysis, students
will learn how political incentives, institutional constraints,
and competing values influence economic outcomes.
Students will learn to approach decisions and problems using
the reasoning processes economists rely on. This includes
practicing marginal analysis, recognizing trade-offs, identifying
unintended consequences, and interpreting everyday
experiences such as pricing, regulation, labor markets, and
consumer behavior through an economic lens. By the end of
3
the course, students will be prepared to apply microeconomic
reasoning to contemporary policy debates and to make in-
formed judgments about the role of government in the
economy.
Students enrolled in this course may—but are not required
to—sit for the Advanced Placement (AP) Microeconomics
exam at the end of the year.
ADVANCED TOPICS: BUSINESS AND
ENTREPRENEURSHIP WITH PERSONAL FINANCE
Prerequisite: Open to Juniors and Seniors only.
AT Business is a yearlong, project-based learning course where
students take on the challenge of developing and launching
their own business model. Throughout the course, students
gain a comprehensive understanding of key areas of business,
including fundamental concepts, marketing, business finance,
personal finance, and management. Alongside this content,
students apply what they learn directly to their entrepreneurial
projects, building skills in critical thinking, problem-solving,
and collaboration. This course culminates in a Shark Tank style
presentation where students have an opportunity to pitch their
business model to actual investors. By combining theory with
hands-on application, students develop the skills to transform
ideas into viable business ventures. Students may elect to take
the AP Business and Personal Finance exam in May.
HONORS YEARBOOK
Prerequisite: Visual Foundations, or permission of instructor
Students may repeat this course for credit.
The course emphasizes both theoretical and practical matters,
from aesthetic issues of graphic design to meeting publication
deadlines and communicating with business partners. The
class produces Cannon School’s yearbook, The Flashback.
To succeed in this course, students must be self-motivated,
creative, outgoing, and resourceful adaptive experts. All
students participate in a wide range of activities related to
producing the yearbook: designing themes and layouts;
writing copy; learning digital photography skills; selecting,
and editing photographs; and proofreading. Students are also
introduced to the business aspects of publications, including
financing, advertising, and deadline-contingent publication
costs. This course requires some afternoon/evening
commitments to photograph school events such as sporting
contests, performances, etc.
This is a hands-on, collaborative, team-oriented course with
regular writing assignments and design projects which allow
students to apply acquired knowledge.
39
```

===== PAGE 42 =====

```text
Course Offerings – Physical Education
WELLNESS AND LONG-TERM
ATHLETIC DEVELOPMENT
Prerequisite: None. Open to juniors and seniors only.
This course takes a holistic approach to student wellness and
long-term athletic development, which serves the mission
of Cannon School and its Athletics Department. The
curriculum is informed by scientific principles of kinesiology,
exercise physiology and biomechanics. This course teaches
basic strength and power development, speed development,
prehabilitation exercises, flexibility and mobility techniques
along with mental toughness training, performance nutrition,
character and leadership development and emotional
wellness. Students will progress through the program based
on their individual strength and technical levels. If a student
has a physical limitation, an alternative program will be given
to enable the student to participate safely in the class. If a
student is an athlete of an “in season” sport they will have an
in season modification made to their training program, along
with specific “Game Day” modifications. We will go over
program design so when students leave Cannon they have the
knowledge to continue to live a healthy lifestyle for the rest of
their lives.
40
```

===== PAGE 43 =====

```text
41
```

===== PAGE 44 =====

```text
5801 Poplar Tent Road
Concord, NC 28027
704-721-7199
www.cannonschool.org
```

