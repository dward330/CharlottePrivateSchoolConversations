# Davidson Day School — Course Offerings — Curriculum Guide Full Descriptions 2026-2027
**Provenance**

- **Compiled by:** Claude Code, plan `coursecensus` Batch 2, at Derrick's request
- **Date fetched:** 2026-11-11
- **Why:** the earlier record (`Davidson Day - Course Offerings - Curriculum Guide.md`) holds the
  app's own condensed descriptions word for word for 60% of courses, so it cannot catch a
  description that drifted from the catalog. This file holds the school's own text, for the
  description-to-catalog census.
- **Upper School method (the earlier record's path):** Issuu serves no text, so all 71 page images
  of the 2026-2027 Upper School Course Catalog were downloaded from
  `https://image.isu.pub/260402123341-cdbc20014618b50dcafae1b78b43224f/jpg/page_N.jpg`
  (N = 1–71, 2312 × 2992 px; page 72 returns HTTP 403) and OCR'd with the macOS Vision framework
  (`VNRecognizeTextRequest`, accurate level, language correction on). Two-column pages are read
  left column, then right column; text fragments on one baseline are joined left to right.
  - SHA-256 over the 71 page-image hashes, in page order: `da2da90950e650867e36dd412b8debe2ebd5d575fb672b045c98e0438dca3939`
  - Page 1 image SHA-256: `94fd3e34ba2dd1f1807dbb3433e68ff61fbb1e1fb42a61a74f8d38d77d5ae2ed`
- **OCR limits.** Prose pages read cleanly; the course descriptions were spot-checked against the
  page images. Known OCR slips: Roman numeral "II" often reads "Il" or "11" ("Algebra Il",
  "Honors Algebra 11"), and "5th" can read "Sth". Read them as the catalog's own "II" and "5th".
  **Table and chart pages do not OCR usefully** (p. 8 graduation requirements, p. 28 math
  progression chart, p. 70 offerings by year): p. 11 was checked against its image and matches;
  p. 28 is given below as a hand transcription read from the image; for pp. 8 and 70 the OCR is
  kept as-is and the image is the authority.
- **Middle School, Lower School and Early Childhood:** the live division pages (S5–S7), the
  Academics overview (S8) and the Diploma Distinctions and Global Studies pages (S9, S10) were
  fetched as HTML and converted to text; navigation and footer removed.
- **Catalog year:** the app was built from this same 2026-2027 catalog (record, 2026-07-26).
## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog | 2026-2027 Upper School Course Catalog (71 pp.), every Upper School course entry; p. 28 math progression from 5th grade |
| S1i | https://image.isu.pub/260402123341-cdbc20014618b50dcafae1b78b43224f/jpg/page_N.jpg | The catalog's page images (N = 1–71), the text source for S1 |
| S4 | https://www.davidsonday.org/academics/upper-school | Upper School page |
| S5 | https://www.davidsonday.org/academics/middle-school | Middle School page |
| S6 | https://www.davidsonday.org/academics/lower-school | Lower School page |
| S7 | https://www.davidsonday.org/academics/early-childhood | Early Childhood page |
| S8 | https://www.davidsonday.org/academics/academics-at-davidson-day | Academics overview |
| S9 | https://www.davidsonday.org/academics/diploma-distinctions | Diploma Distinctions hub |
| S10 | https://www.davidsonday.org/academics/diploma-distinctions/global-studies | Global Studies Diploma page |

## Index — every app course, in app order

Where each app row's own text sits below. Upper School rows point to the catalog page (`===== PAGE N =====` below; found by title search on the OCR text, so confirm it). Middle and Lower School rows point to the sections that hold their text.

| App path | Division | Department | Title | Where |
| --- | --- | --- | --- | --- |
| `divisions[0].departments[0].courses[0]` | Lower School Courses | What is published | Early Childhood Program | Lower School page (S6) / Early Childhood page (S7) |
| `divisions[0].departments[0].courses[1]` | Lower School Courses | What is published | Specials | Lower School page (S6) / Early Childhood page (S7) |
| `divisions[1].departments[0].courses[0]` | Middle School Courses | Mathematics | 5th Grade Math | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[1]` | Middle School Courses | Mathematics | Accelerated Math 1 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[2]` | Middle School Courses | Mathematics | Math 1 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[3]` | Middle School Courses | Mathematics | Accelerated Math 2 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[4]` | Middle School Courses | Mathematics | Accelerated Math 2/3 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[5]` | Middle School Courses | Mathematics | Math 2 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[6]` | Middle School Courses | Mathematics | Accelerated Math 3 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[7]` | Middle School Courses | Mathematics | Math 3 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[8]` | Middle School Courses | Mathematics | Honors Algebra 1 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[0].courses[9]` | Middle School Courses | Mathematics | Honors Geometry | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[1].courses[0]` | Middle School Courses | Other published detail | Study Skills | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[1].courses[1]` | Middle School Courses | Other published detail | Upper School course access | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[1].departments[1].courses[2]` | Middle School Courses | Other published detail | AFAR International Research | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |
| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | English I | catalog p. 21, 22, 23, 24 |
| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | English I Honors | catalog p. 21, 22 |
| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | English II | catalog p. 22, 23, 24 |
| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | English II Honors | catalog p. 22 |
| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | English III Honors | catalog p. 23, 24 |
| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | English IV Honors | catalog p. 23 |
| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | AP English Language and Composition | catalog p. 24 |
| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | AP English Literature and Composition | catalog p. 24 |
| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Creative Writing Honors | catalog p. 23, 70 |
| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Introduction to Yearbook | catalog p. 25 |
| `divisions[2].departments[0].courses[10]` | Upper School Courses | English | Yearbook Honors | catalog p. 25, 70 |
| `divisions[2].departments[1].courses[0]` | Upper School Courses | Mathematics | Algebra I | catalog p. 27, 29, 30, 41 |
| `divisions[2].departments[1].courses[1]` | Upper School Courses | Mathematics | Algebra I Honors | not found by title search |
| `divisions[2].departments[1].courses[2]` | Upper School Courses | Mathematics | Geometry | catalog p. 12, 28, 29, 30 |
| `divisions[2].departments[1].courses[3]` | Upper School Courses | Mathematics | Geometry Honors | catalog p. 28, 29, 70 |
| `divisions[2].departments[1].courses[4]` | Upper School Courses | Mathematics | Algebra II | catalog p. 29, 70 |
| `divisions[2].departments[1].courses[5]` | Upper School Courses | Mathematics | Algebra II/Trigonometry Honors | catalog p. 29 |
| `divisions[2].departments[1].courses[6]` | Upper School Courses | Mathematics | Precalculus | catalog p. 28, 30, 31, 70 |
| `divisions[2].departments[1].courses[7]` | Upper School Courses | Mathematics | AP Precalculus | catalog p. 28, 30, 31, 70 |
| `divisions[2].departments[1].courses[8]` | Upper School Courses | Mathematics | Honors Calculus | catalog p. 28, 30 |
| `divisions[2].departments[1].courses[9]` | Upper School Courses | Mathematics | AP Calculus AB | catalog p. 17, 31, 70 |
| `divisions[2].departments[1].courses[10]` | Upper School Courses | Mathematics | AP Calculus BC | catalog p. 31, 70 |
| `divisions[2].departments[1].courses[11]` | Upper School Courses | Mathematics | Calculus III Honors: Multivariable Calculus and Linear Algebra | not found by title search |
| `divisions[2].departments[1].courses[12]` | Upper School Courses | Mathematics | AP Statistics | catalog p. 17, 19, 29, 70 |
| `divisions[2].departments[2].courses[0]` | Upper School Courses | History & Social Sciences | Civics and Deliberative Democracy | catalog p. 33, 34 |
| `divisions[2].departments[2].courses[1]` | Upper School Courses | History & Social Sciences | Civics Honors | catalog p. 34, 35 |
| `divisions[2].departments[2].courses[2]` | Upper School Courses | History & Social Sciences | World History Honors | catalog p. 70 |
| `divisions[2].departments[2].courses[3]` | Upper School Courses | History & Social Sciences | AP World History (Modern) | catalog p. 15, 34, 35 |
| `divisions[2].departments[2].courses[4]` | Upper School Courses | History & Social Sciences | U.S. History Honors | catalog p. 35, 70 |
| `divisions[2].departments[2].courses[5]` | Upper School Courses | History & Social Sciences | AP U.S. History | catalog p. 36, 70 |
| `divisions[2].departments[2].courses[6]` | Upper School Courses | History & Social Sciences | AP European History | catalog p. 15, 37, 70 |
| `divisions[2].departments[2].courses[7]` | Upper School Courses | History & Social Sciences | AP Microeconomics | catalog p. 19, 36, 70 |
| `divisions[2].departments[2].courses[8]` | Upper School Courses | History & Social Sciences | AP Macroeconomics | catalog p. 15, 19 |
| `divisions[2].departments[2].courses[9]` | Upper School Courses | History & Social Sciences | AP Psychology | catalog p. 15, 17, 37, 70 |
| `divisions[2].departments[2].courses[10]` | Upper School Courses | History & Social Sciences | AP U.S. Government and Politics | not found by title search |
| `divisions[2].departments[2].courses[11]` | Upper School Courses | History & Social Sciences | Anthropology Honors | catalog p. 34, 70 |
| `divisions[2].departments[3].courses[0]` | Upper School Courses | Science | Conceptual Physics | catalog p. 39, 70 |
| `divisions[2].departments[3].courses[1]` | Upper School Courses | Science | Physics Honors | catalog p. 39, 40, 42, 70 |
| `divisions[2].departments[3].courses[2]` | Upper School Courses | Science | AP Physics 1 | catalog p. 40 |
| `divisions[2].departments[3].courses[3]` | Upper School Courses | Science | AP Physics 2 | catalog p. 40 |
| `divisions[2].departments[3].courses[4]` | Upper School Courses | Science | Chemistry | catalog p. 17, 39, 41, 42 |
| `divisions[2].departments[3].courses[5]` | Upper School Courses | Science | Chemistry Honors | catalog p. 41, 70 |
| `divisions[2].departments[3].courses[6]` | Upper School Courses | Science | AP Chemistry | catalog p. 17, 41, 70 |
| `divisions[2].departments[3].courses[7]` | Upper School Courses | Science | Biology | catalog p. 17, 39, 42, 43 |
| `divisions[2].departments[3].courses[8]` | Upper School Courses | Science | Biology Honors | catalog p. 42, 43, 70 |
| `divisions[2].departments[3].courses[9]` | Upper School Courses | Science | AP Biology | catalog p. 17, 42, 70 |
| `divisions[2].departments[3].courses[10]` | Upper School Courses | Science | AP Environmental Science | catalog p. 15, 42, 70 |
| `divisions[2].departments[3].courses[11]` | Upper School Courses | Science | Human Anatomy and Physiology Honors | catalog p. 43 |
| `divisions[2].departments[4].courses[0]` | Upper School Courses | World Languages | French I | catalog p. 45, 46, 70 |
| `divisions[2].departments[4].courses[1]` | Upper School Courses | World Languages | French II | catalog p. 45 |
| `divisions[2].departments[4].courses[2]` | Upper School Courses | World Languages | French III Honors | catalog p. 45 |
| `divisions[2].departments[4].courses[3]` | Upper School Courses | World Languages | French IV Honors | catalog p. 46 |
| `divisions[2].departments[4].courses[4]` | Upper School Courses | World Languages | French V Honors | catalog p. 46 |
| `divisions[2].departments[4].courses[5]` | Upper School Courses | World Languages | AP French Language and Culture | catalog p. 15, 46 |
| `divisions[2].departments[4].courses[6]` | Upper School Courses | World Languages | Spanish I | catalog p. 47, 48, 49, 70 |
| `divisions[2].departments[4].courses[7]` | Upper School Courses | World Languages | Spanish II | catalog p. 47, 48 |
| `divisions[2].departments[4].courses[8]` | Upper School Courses | World Languages | Spanish III Honors | catalog p. 48 |
| `divisions[2].departments[4].courses[9]` | Upper School Courses | World Languages | Spanish IV Honors | catalog p. 48, 49 |
| `divisions[2].departments[4].courses[10]` | Upper School Courses | World Languages | Spanish V Honors: Cultural Topics | not found by title search |
| `divisions[2].departments[4].courses[11]` | Upper School Courses | World Languages | AP Spanish Language and Culture | catalog p. 15, 49 |
| `divisions[2].departments[4].courses[12]` | Upper School Courses | World Languages | AP Spanish Literature and Culture | not found by title search |
| `divisions[2].departments[5].courses[0]` | Upper School Courses | Participation in the Arts | Photography I | catalog p. 52, 53, 70 |
| `divisions[2].departments[5].courses[1]` | Upper School Courses | Participation in the Arts | Photography II | catalog p. 53 |
| `divisions[2].departments[5].courses[2]` | Upper School Courses | Participation in the Arts | Photography III | catalog p. 53 |
| `divisions[2].departments[5].courses[3]` | Upper School Courses | Participation in the Arts | Studio I | catalog p. 54 |
| `divisions[2].departments[5].courses[4]` | Upper School Courses | Participation in the Arts | Studio II Honors | not found by title search |
| `divisions[2].departments[5].courses[5]` | Upper School Courses | Participation in the Arts | Portfolio | catalog p. 23, 52, 53, 54 |
| `divisions[2].departments[5].courses[6]` | Upper School Courses | Participation in the Arts | AP Studio Art | catalog p. 54, 70 |
| `divisions[2].departments[5].courses[7]` | Upper School Courses | Participation in the Arts | Performance Ensemble | catalog p. 56, 70 |
| `divisions[2].departments[5].courses[8]` | Upper School Courses | Participation in the Arts | Contemporary Ensemble | catalog p. 56, 70 |
| `divisions[2].departments[5].courses[9]` | Upper School Courses | Participation in the Arts | Modern Music | catalog p. 57, 70 |
| `divisions[2].departments[5].courses[10]` | Upper School Courses | Participation in the Arts | Film Studies & Production | catalog p. 57, 70 |
| `divisions[2].departments[6].courses[0]` | Upper School Courses | Technology & Computer Science | Introduction to Computer Coding | catalog p. 60 |
| `divisions[2].departments[6].courses[1]` | Upper School Courses | Technology & Computer Science | AP Computer Science Principles | catalog p. 60 |
| `divisions[2].departments[6].courses[2]` | Upper School Courses | Technology & Computer Science | AP Computer Science A | catalog p. 17, 60 |
| `divisions[2].departments[7].courses[0]` | Upper School Courses | Physical Education | Weight Training | catalog p. 62, 70 |
| `divisions[2].departments[7].courses[1]` | Upper School Courses | Physical Education | Intro to Sports Medicine | catalog p. 62, 70 |
| `divisions[2].departments[8].courses[0]` | Upper School Courses | Electives & Distinctions | Financial Literacy Honors | catalog p. 63 |
| `divisions[2].departments[8].courses[1]` | Upper School Courses | Electives & Distinctions | AP Business w/ Personal Finance | catalog p. 63 |
| `divisions[2].departments[8].courses[2]` | Upper School Courses | Electives & Distinctions | Honors Social Entrepreneurship | catalog p. 63 |
| `divisions[2].departments[8].courses[3]` | Upper School Courses | Electives & Distinctions | AP with WE Service | catalog p. 15, 19, 63, 64 |
| `divisions[2].departments[8].courses[4]` | Upper School Courses | Electives & Distinctions | Middle School TA | catalog p. 64 |
| `divisions[2].departments[8].courses[5]` | Upper School Courses | Electives & Distinctions | Research Methods Honors | catalog p. 15, 17, 19 |
| `divisions[2].departments[8].courses[6]` | Upper School Courses | Electives & Distinctions | Capstone Research Honors | catalog p. 15, 17, 19 |
| `divisions[2].departments[8].courses[7]` | Upper School Courses | Electives & Distinctions | Forensics & Zoology Honors | catalog p. 17 |
| `divisions[2].departments[8].courses[8]` | Upper School Courses | Electives & Distinctions | Independent Study | catalog p. 60, 65, 69 |

## Middle School page (S5)

# Middle School

## Content Knowledge and Character Development

At Davidson Day, we understand that Middle School is among the most formative years of a student’s life. That’s why our program is designed to support both academic growth and personal development, helping students become confident learners and compassionate individuals.

Character matters just as much as what you know.

Service-Learning Program

In Davidson Day's Middle School, we know that character matters just as much as what you know. Every Middle School student takes part in our hands-on service-learning program, partnering with local organizations and making a real impact in the community. They don’t just learn about service—they live it.

Access to High School Courses

Davidson Day Middle School students are not limited to just traditional Middle School courses. Students ready to learn at the next level have the ability to learn and challenge themselves alongside Upper School students by taking world language and mathematics classes in our Upper School.

Study Skills Classes

At Davidson Day, every Middle School student takes a study skills course each year—four years of building the tools for success. These classes go beyond organization; they help students understand how they learn, take ownership of their growth and develop the independence and confidence needed to thrive in Upper School and beyond.

House System

At the beginning of their Middle School tenure, each Davidson Day Middle School student is sorted into a “house.” Throughout the year, houses compete for the coveted House Cup, earning points through acts of character and friendly competitions. Our house system is a proud Davidson Day Middle School tradition and encourages team building, school spirit, unity and fun.

## Head of Middle & Upper School

###
Andrew Griffith

## Assistant Head of Middle School

###
Jeff Haddock

<>

The Arts

The arts take Davidson Day students beyond the bounds of a screenplay, a canvas, a screen, or the stage, and we immerse all students in our arts curriculum.

Patriot Athletics

Patriot student-athletes see every practice, game, class, and exam as an opportunity to push beyond boundaries.

## Lower School page (S6)

# Lower School

## Cultivating and Inspiring Potential

Lower School students are constantly discovering and acquiring new skills and knowledge.

At the same time, they’re beginning to express their independence and share their strengths with their community.

Lower School is a time of hands-on exploration—of academics, of social relationships, of new experiences, and of personal character.

At Davidson Day, Lower School provides enriching experiences and student support services that ensure all students exceed their potential.

Patriots work in their classrooms, in their school, and beyond our campus, learning how to advocate for themselves and others, how to collaborate as a leader or part of a team, and how to express their natural creativity, whether in art, music, academic projects, or student clubs.

With our 8:1 student-to-faculty ratio, our teachers provide individualized attention, foster strengths, and ensure students are both challenged and supported as they prepare for academics beyond Lower School.

## Head of Early Childhood & Lower School

###
Liz McAlister

<>

## Early Childhood page (S7)

# Early Childhood

## Beyond Kindergarten Readiness

Davidson Day’s Early Childhood program—the only independent school in Lake Norman to offer a developmentally-appropriate, integrated curriculum for children as young as two years old—teaches skills and content in context to help young learners understand the world around them and their role in it.

Our teachers possess decades of experience in fostering meaningful connections with young students, cultivating curiosity through immersive play and safe exploration, manipulation, and discovery.

In addition to academic work, our Early Childhood program focuses on all aspects of child development: cognitive skills, language development, fine motor skills, gross motor skills, executive functioning, and social-emotional wellness.

Because children thrive in this secure, supportive environment, our Early Preschool (2s and 3s), Preschool (3s and 4s), and Junior Kindergarten (4s and 5s) students prepare for Kindergarten—and beyond.

## Head of Early Childhood & Lower School

###
Liz McAlister

<>

## Academics overview (S8)

# Academics at Davidson Day

## Why Davidson Day?

## With an 8:1 student-to-faculty ratio, Davidson Day ensures that every student is well-positioned for long-term academic success.

<>

Our faculty provides the individualized attention each student deserves, getting to know each child and how they prefer to learn.

In the classroom, students work individually and collaboratively while receiving tailored academic support so they’re challenged but not overwhelmed.

Beyond the classroom, faculty help students explore their interests and discover new passions. Our faculty are advisors, coaches, and mentors who shape and inspire the lives of our students every single day.

Our integrated Early Childhood through 12th Grade curriculum results in strong relationships and meaningful connections between students and with faculty and is designed to empower students to embrace challenge, live with character, and lead with purpose.

## Explore Our Divisions!

Early Childhood (opens in new window/tab)

Lower School (opens in new window/tab)

Middle School (opens in new window/tab)

Upper School (opens in new window/tab)

## Upper School page (S4)

# Upper School

## Prepared for College and the Real World

Our academic curriculum is designed to prepare students for the academic rigor and individual responsibility expected throughout a collegiate education—while also equipping students with real-world-ready skills so they’ll be prepared to lead on the global stage.

Upper School begins in 9th Grade at Davidson Day, as does our college counseling program for students and their families. One-on-one personalized assistance with every aspect of the college application and enrollment process ensures that every Patriot is knowledgeable, prepared, and excited to identify institutions of higher learning that are the best fit for their strengths, interests, and potential.

The most important skill we cultivate is responsible self-advocacy.

We expect every student to engage in every class every day. And, in each class, whether AP Psychology, Conceptual Physics, or Big History, knowing how to ask the right question at the right time is just as critical as knowing the right answer.

With our 8:1 student-to-faculty ratio, each classroom is arranged for student collaboration and discussion. We structure our classes such that the majority of discussion is student-generated and student-led. This ensures that students, regardless of academic discipline, deconstruct complex academic material, then reconstruct that material cogently in written work or in classroom discussion, adding to their theoretical and practical understanding.

## Head of Middle & Upper School

###
Andrew Griffith

## Assistant Head of Upper School

###
Luke Diamond

Click here to view the brochure.

Diploma Distinctions

Through immersive practicums, original research, and sustained ethical inquiry, students graduate with something no transcript can fully capture: the habits of mind, real-world experience, and intellectual confidence.

The Arts

The arts take Davidson Day students beyond the bounds of a screenplay, a canvas, a screen, or the stage, and we immerse all students in our arts curriculum.

Patriot Athletics

Patriot student-athletes see every practice, game, class, and exam as an opportunity to push beyond boundaries.

<>

## Diploma Distinctions hub (S9)

# Diploma Distinctions

Not more classes. More purpose.

At Davidson Day, our mission is to empower students to embrace challenge, live with character, and lead with purpose — and the Diploma Distinctions are designed to build exactly that foundation. Through immersive practicums, original research, and sustained ethical inquiry, students graduate with something no transcript can fully capture: the habits of mind, real-world experience, and intellectual confidence that carry them not just into college, but through it and beyond, emerging as world and work-ready leaders.

Parents and students will value the program because it:

- Signals sustained intellectual commitment to colleges

- Builds independence and executive functioning

- Connects learning to real-world application

- Develops confidence through professional experiences

- Encourages clarity about future academic and career goals

Students don’t simply take advanced classes—they apply their learning in authentic settings and produce original scholarship before graduation.

## Choose Your Pathway

Click here to view the brochure.

#### Click the images below to learn more:

## How The Program Works

Students apply at the end of sophomore year and, upon acceptance, enter a structured and mentored pathway beginning junior year, guided by experienced faculty whose expertise is directly aligned to their field of study.

#### Each Diploma Distinction includes:

-
Focused Advanced Coursework

-
Immersive Practicum (Minimum 100 Hours)

-
Ethics Labs

-
Scholars Research Program (The Culminating Experience)

## Focused Advanced Coursework

AP and Honors classes aligned to a specific academic track, building the intellectual foundation for original inquiry.

## Immersive Practicum (Minimum 100 Hours)

Internships, international travel, laboratory research, medical shadowing, civic engagement, engineering placements, nonprofit leadership, or pre-collegiate programs. The practicum is not a standalone requirement — it becomes the lived experience that anchors and drives the student’s original research.

## Ethics Labs

Ethics Labs are structured, discussion-centered experiences in which students analyze complex real-world dilemmas through the lenses of philosophy, civic responsibility, and public leadership. Drawing on seminar-style inquiry models such as those used at Davidson College, students examine contemporary issues in bioethics, political philosophy and public policy, international ethics, and business ethics.

## Scholars Research Program (The Culminating Experience)

Junior Year – Research Methods Honors

Students learn collegiate-level research skills, conduct academic database searches, synthesize scholarship, and develop a research question grounded directly in their practicum experience.
Senior Year – Capstone Research Honors

Under close faculty mentorship, students design and execute an original research project — collecting and analyzing data, constructing sustained academic arguments, and presenting their findings at the Davidson Day Scholars Research Conference. Many also present at collegiate conferences.

Here, Davidson Day's CORE Values become a lived experience.

Courage: Embracing challenge and pursuing ambitious questions

Ownership: Taking responsibility for intellectual growth and scholarly integrity

Resilience: Persisting through challenge, complexity, and critique

Empathy: Recognizing the human impact of ideas and decisions

What I love about the Diploma Distinctions is that they give students a structured way to go deeper — and that kind of real-world experience and original research doesn’t just strengthen a college application, it gives students a genuine edge in a competitive process.

Tia Hill, Director of College Counseling

Questions About Diploma Distinctions? Click Here.

750 Jetton Street

Davidson

NC

28036

(704) 237-5200

Davidson Day School is an independent school for students two years old through 12th grade in the beautiful Lake Norman region of North Carolina.

- Instagram(opens in new window/tab)

- Facebook(opens in new window/tab)

- Flickr(opens in new window/tab)

- SiteMap

- Accessibility

- About(opens in new window/tab)

- Admissions(opens in new window/tab)

- Academics(opens in new window/tab)

- Student Life(opens in new window/tab)

- Athletics(opens in new window/tab)

- Get Involved

Non-Discriminatory Policy: Davidson Day School does not discriminate on the basis of race, color, religion, sex, sexual orientation, gender identity or expression, age, disability, marital status, citizenship, national origin, or any other category or characteristic protected by law, in administration of its educational policies, admissions policies, financial aid policies, employment practices, and athletic and other school-administered programs.

Powered by Finalsite

## Global Studies Diploma page (S10)

# Global Studies Diploma

For students drawn to international relations, environmental policy, cultural research, global public policy, or any field that requires crossing borders — geographic, cultural, or intellectual. Students develop cultural fluency and the ability to navigate complex global systems with discernment.

The Global Studies Diploma Distinction prepares students to understand an increasingly interconnected world through rigorous academic study, language immersion, and transformative international experiences, helping them develop the perspective and fluency needed to engage thoughtfully with the wider world.

This Diploma Distinction has existed at Davidson Day School since 2021, with most students taking advantage of the AFAR research trips to Spain, Portugal, and Belize to ground their research in collegiate-level archaeological research and international travel experience. As the Global Studies pathway matures, students will have additional opportunities to participate in international service trips, language immersion programs, or find their own international opportunities to ground their research and explore their interests.

Practicum experiences—often including international travel, research initiatives, language immersion, or cross-cultural service—become the foundation for sustained academic inquiry. Through their Capstone research, students investigate questions that emerge from lived global experience, whether in areas such as international development, environmental sustainability, archaeology, cultural identity, or global public health.

STEMM Diploma Distinction

Business & Civic Engagement Diploma Distinction

Return to Diploma Distinctions Homepage

Click Here To View The Program Brochure

## Global Studies Diploma Requirements

-
Core Course

-
Elective Courses

-
Language Competency Requirement

-
Practicum

-
Scholars Research Program

-
Culminating Diploma Experience

## Core Course

Honors Anthropology

## Elective Courses

Choose Four:

AP World History or AP European History
AP Environmental Science

AP Psychology
AP Macroeconomics

AP with WE Service Recognition
AP Spanish Language & Culture or AP French Language & Culture

## Language Competency Requirement

Completion of Level IV or 3 levels of the same language in Upper School.

## Practicum

- At least 100 hours of an approved internship, volunteer opportunity, or pre-collegiate program

- Quarterly Ethics Labs

## Scholars Research Program

- Research Methods Honors Course (11th Grade)

- Capstone Research Honors Mentorship (12th Grade)

## Culminating Diploma Experience

Seniors present their capstone research project at the Davidson Day Scholars Research Conference.

## Catalog p. 28 — Upper School Mathematics Course Progression (hand transcription)

Hand transcription of the progression chart (read from the page image; the OCR of this page
is unusable). Each line is one box and the box(es) its arrow leads to.

Left chart (starts at 5th Grade Math):
- 5th grade: 5th Grade Math → 6th grade Math 1, or 6th grade Accelerated Math 1
- Math 1 (6th) → Math 2 (7th) → Math 3 (8th) → Algebra 1 (9th)
- Accelerated Math 1 (6th) → Accelerated Math 2 (7th) → Accelerated Math 3 (8th) → Algebra 1 or Honors Algebra 1 (9th)
- Algebra 1 (9th) → Geometry (10th) → Algebra 2 (11th) → Precalculus (12th)
- Honors Algebra 1 (9th) → Honors Geometry (10th), or Honors Geometry & Honors Algebra 2 (10th)
- Honors Geometry (10th) → Honors Algebra 2 (11th) → Precalculus or AP Precalculus (12th)
- Honors Geometry & Honors Algebra 2 (10th) → AP Precalculus (11th) → Honors Calculus, AB Calculus or BC Calculus (12th)

Right chart (starts at Accelerated Math 1 in 5th grade):
- Accelerated Math 1 (5th) → Accelerated Math 2 (6th), or Accelerated Math 2/3 (6th)
- Accelerated Math 2 (6th) → Accelerated Math 3 (7th) → Honors Algebra 1 (8th)
- Accelerated Math 2/3 (6th) → Honors Algebra 1 (7th) → Honors Geometry (8th)
- Honors Algebra 1 (8th) → Honors Geometry (9th), or Honors Geometry & Honors Algebra 2 (9th)
- Honors Geometry (8th) → Honors Algebra 2 (9th)
- Honors Geometry (9th) → Honors Algebra 2 (10th) → AP Precalculus (11th)
- Honors Geometry & Honors Algebra 2 (9th) and Honors Algebra 2 (9th) → AP Precalculus (10th)
- AP Precalculus (10th) → AB Calculus or BC Calculus (11th) → AP Statistics, BC Calculus or Calculus 3 (12th)

## Upper School — 2026-2027 Course Catalog, full OCR text (S1)

Page numbers are the Issuu page numbers.

===== PAGE 1 =====

```text
U PERSCHOOL
COURSE CATALOG
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
DAVIDSON DAY SCI POL
RESIDSON DAY
SCHOOL
```

===== PAGE 2 =====

```text
GATSON DAL
SCHOOL
Davidson Day School's Mission:
Together, we empower students to embrace challenge, live with character, and
lead with purpose.
DAVIDSON DAY
PIONSHIPS
YAU VOLLEY BALL
LACROSSE 23
```

===== PAGE 3 =====

```text
PATIBSON DAL
SCHOOL
Davidson Day's values:
• COURAGE. We face challenges with integrity, speak up for what is right,
and step boldly into new experiences.
• OWNERSHIP: We take responsibility for our learning, our actions, and
the impact we have on our community.
• RESILIENCE: We persevere through adversity with resourcefulness,
learning from setbacks to grow stronger.
• EMPATHY: We seek to understand others with compassion and commit
ourselves to acts of kindness and service.
Davidson Day graduates are:
• Critical thinkers who are enthusiastic problem solvers
• Engaged students who take intellectual risks
• Independent thinkers who articulate their ideas with confidence
• Lifelong learners who chart their own paths in college and in life
• Respectful, ethical citizens who are adept at addressing global challenges
• Advocates for themselves and others.
```

===== PAGE 4 =====

```text
CONTENTS
7-12 COURSE SELECTION
Course Registration Information - 7
Minimum Graduation Requirements - 8
Course Selection - 9
Honors: Challenge & Motivation - 10
Advanced Placement: College-Level Work - 11
Clarification on Credits - 12
Eighth Grade Credits - 12
NEW DIPLOMA TRACKS
13-19
Global Studies - 14-15
STEMM-16-17
Business and Civic Engagement-18-19
ENGLISH
20-25
English I/English I Honors - 21
English Il/English ll Honors - 22
English Ill Honors/English IV Honors- 23
Creative Writing - 23
AP English Language and Composition - 24
AP English Literature and Composition - 24
Introduction to Yearbook -25
Yearbook Honors-25
MATHEMATICS
26-31 Upper School Mathematics: Course Progression - 28
Algebra l - 29
Geometry/Geometry Honors - 29
Algebra I|/Algebra I| & Trigonometry (Honors) - 29
AP Statistics - 29
Pre-Calculus - 30
AP Pre-Calculus - 30
Honors Calc-30
AP Calculus AB - 31
AP Calculus BC - 31
Calculus Ill (Post-AP) Honors - 31
HISTORY & SOCIAL SCIENCES
32-37
Civics/ Civics Honors - 33-34
Anthropology Honors - 34
AP World History (Modern) - 35
U.S. History Honors - 35
AP U.S. History - 36
AP Microeconomics/AP Macroeconomics - 36
AP European History - 37
AP Psychology - 37
AP United States Government & Politics - 37
```

===== PAGE 5 =====

```text
CONTENTS
38-43 SCIENCE
Conceptual Physics/Physics Honors - 39
AP Physics 1 - 40
AP Physics 2 - 40
Chemistry/Chemistry Honors - 41
AP Chemistry - 41
Biology/Biology Honors - 42
AP Biology - 42
AP Environmental Science - 42
Human Anatomy and Physiology Honors - 43
44-49 WORLD LANGUAGES
French 1 - 45
French 1l -45
French Ill Honors - 45
French IV Honors - 45
French V Honors - 46
AP French Language and Culture - 46
Spanish I - 47
Spanish I| - 47
Spanish Ill/Spanish Ill Honors - 48
Spanish IV /Spanish IV Honors - 48
Spanish V Honors: Cultural Topics- 49
Spanish V Honors (Pre-AP)/AP Spanish Language and
Culture - 49
AP Spanish Literature and Culture - 49
50-57 PARTICIPATION IN THE ARTS
Visual Arts - 52
Photography 1 - 52
Photography Il - 53
Photography Ill - 54
Portfolio - 54
Studio 1-54
Studio 2-54
AP Studio Art - 54
Music and Performing Arts - 55
Performance Ensemble - 56
Contemporary Ensemble - 56
Modern Music - 57
Film and Production - 57
```

===== PAGE 6 =====

```text
CONTENTS
58-60 TECHNOLOGY AND COMPUTER SCIENCE
Introduction to Computer Coding - 60
AP Computer Science Principles - 60
AP Computer Science A - 60
61-62 PHYSICAL EDUCATION
Weight Training - 62
intro to Sports Medicine-62
ELECTIVES
63-64 Honors Financial Literacy-63
AP Business w Personal Finance-63
Honors Social Entrepreneurism-63
AP W/ WE Service-64
Middle School TA-64
65 ONLINE AND INDEPENDENT STUDY
Online Courses - 65
Other Courses - 65
Independent Study - 65
INTERNATIONAL RESEARCH PROJECTS:
66
AFAR
Belize - 67
Spain - 67
Portugal - 67
68 COLLEGE COUNSELING
69 GPA CALCULATOR & DAILY SCHEDULE
70 UPPER SCHOOL COURSE OFFERINGS BY
YEAR
```

===== PAGE 7 =====

```text
COURSE REGISTRATION INFORMATION
AME IMPALA
AN PALA
LA
LA
LA
TAME ALA
ALA
adidas - IMPAI
TO THE STUDENT:
This booklet provides information about course selection and registration. Please
acquaint yourself with the graduation requirements and review the descriptions of
courses available to you based on your grade level and your completion of the
necessary prerequisites.
Give your course selection careful thought and seek the advice of your teachers,
advisor, and parents as you design your schedule. The Davidson Day Upper School
student experience encompasses more than academics; please carefully consider
your other priorities and commitments (i.e., participation in athletics, performing
arts, community service, etc.) as you decide on an overall course load that will
challenge you yet not overwhelm you.
This course guide is intended to give a total picture of the curricular offerings
available at Davidson Day School. Not every course will be offered in every academic
year. Refer to the course registration sheets distributed to students each spring for a
full list of the courses that will be offered in the upcoming academic year.
```

===== PAGE 8 =====

```text
MINIMUM GRADUATION REQUIREMENTS
COURSES CREDITS NOTES
Students must be enrolled in a core English
ENGLISH 4
class (English 1/11/III/IV, AP English Language, or
AP English Literature) each year of Upper School.
At minimum: Algebra I, Geometry,
MATHEMATICS 4 Algebra Il, and one class beyond Algebra lI
(typically Pre-Calculus).
Three years of laboratory science are required:
SCIENCE 3
Physics, Chemistry, and Biology.
Three years of History are required. Students
must take Civics (or Big History if enrolled in the
Upper School before 2024-2025), World History
HISTORY 3
(or Anthropology if enrolled in the Upper
School before 2024-2025), and U.S. History.
Students must earn at least 2 credits in the
WORLD LANGUAGE 2 same language; at least 2 of those credits must
be earned in Upper School.
Students must take at least one course in the
FINE ARTS 1
Visual Arts or Performing Arts.
A student may request a Physical Education
PHYSICAL EDUCATION 1 credit for participating in varsity athletics, theater,
or another approved extracurricular activity.
Any course taken beyond the requirements
ELECTIVES 3
listed above will be counted as an elective.
```

===== PAGE 9 =====

```text
COURSE SELECTION
FRESHMEN are required to take English I (or Honors), Civics (or Honors) (or Big
History if enrolled in the Upper School before 2024-2025), and either Conceptual
Physics or Physics Honors. Students should consult their 8th-grade teachers and the
curriculum guide to choose the math, world language, and elective courses that
best fit their needs. In total, freshmen should be enrolled in eight courses, including
five academic classes and no more than one study hall.
SOPHOMORES are required to take English II (or Honors), World History (or Honors
or AP) (or Anthropology if enrolled in the Upper School before 2024-2025), and
Chemistry. Students should consult their freshman-year teachers, college
counselors, and the curriculum guide to choose the math, world language, and
elective courses that best fit their needs. In total, sophomores should be enrolled in
eight courses, including five academic classes and no more than one study hall.
JUNIORS are required to take English III (or Honors), U.S. History (or Honors or AP),
and Biology (or Honors). AP Language and Composition may be substituted for
English Ill. Students should consult their sophomore-year teachers, college
counselors, and the curriculum guide to choose the math, world language, and
elective courses that best fit their needs. In total, juniors should be enrolled in eight
courses, including five academic classes and no more than one study hall. However,
students enrolled in two or more AP-level courses may choose to take a second
study hall.
SENIORS are required to take English IV (or Honors); AP Language and Composition
or AP Literature and Composition may be substituted for English IV. Students
should consult their junior-year teachers, college counselors, and the curriculum
guide to choose the math, science, history/social science, world language, and
elective courses that best fit their needs; rising seniors must take particular care to
ensure that they have met the minimum requirements for graduation. In total,
seniors should be enrolled in eight courses, with five academic classes and no more
than one study hall. However, students enrolled in two or more AP-level courses
may choose to take a second study hall.
Students' course registration will be processed once they have officially enrolled for
the next academic year. Please note that some courses fill up quickly due to high
demand. See chart on page 70 for a full list of courses available to students at each
grade level.
```

===== PAGE 10 =====

```text
HONORS:
CHALLENGE & MOTIVATION
Challenging Honors courses are offered to students who have demonstrated the
aptitude, work ethic, and previous academic performance to be successful. In order
to enroll in an Honors course, a student must satisfy its academic requirements and
be recommended by the appropriate department. Interested students should
consult with their current teachers about appropriate course placement.
Students who wish to enroll in an Honors course must have finished the non-
Honors prerequisite with a minimum final grade of A- In order for students to
remain in an Honors course of study from year to year, they must maintain at least a
B- (final grade). Honors courses receive a .50 weighting when GPA is calculated.
nard
i'll sep
ne day
GARBLINA
```

===== PAGE 11 =====

```text
ADVANCED PLACEMENT:
COLLEGE-LEVEL WORK
Students who choose to enroll in Advanced Placement (AP) courses are often
motivated by a passion for and intellectual interest in the subject matter of the
course. Student success in AP courses is usually driven by a strong aptitude for the
subject matter, combined with excellent preparation and a willingness to do all of
the work associated with the course. AP courses require a significant commitment
in terms of workload, maturity, and classroom presence, so students should
consider carefully whether they can manage these responsibilities alongside their
other commitments in and out of school. Please note that some AP courses also
require summer work prior to the start of the school year.
Advanced Placement courses follow College Board-approved curriculum and
prepare students for the College Board Advanced Placement exams in May. AP
courses are the equivalent of college-level courses and the scholastic demands
they place on students are similar to those they are likely to encounter in an
introductory college course. All students taking an AP course are expected to take
the corresponding exam in May; this takes the place of a final exam in the course.
AP courses receive a 1.0 weighting when GPA is calculated.
Students who wish to enroll in an AP course must have finished the Honors
prerequisite with a minimum final grade of A- and must have departmental
approval. They must also complete an AP Contract for each Advanced Placement
course they request (see pages 61-62). Departmental approval is contingent on a
review of prior achievement in prerequisite courses, teacher recommendations, AP
Contract, and/or placement testing. The relevant department head has the final
say in approving students for AP courses and will consider the abilities, goals, and
best interests of each student in giving or withholding approval.
AP English Language and Composition AP U.S. History
AP English Literature and Composition AP European History
AP Pre Calculus AP Macroeconomics* 2027-2028
AP Calculus AB AP Microeconomics* 2026-2027
AP Calculus BC AP Psychology
AP Statistics AP US Government and Politics
AP Biology AP Spanish Language and Culture
AP Environmental Science AP Spanish Literature and Culture
AP Physics 1 AP French Language and Culture
AP Physics 2 AP Studio Art
AP Chemistry AP Computer Science Principles
AP World History (Modern) AP Computer Science A
AP With WE Service *Offered in alternate years AP Business w/ Personal Finance
```

===== PAGE 12 =====

```text
CLARIFICATION ON CREDITS
A year-end grade lower than C- in an academic course may necessitate summer
school or another form of remediation. Failure to follow the School's
recommendations may require repetition of the entire course in the following
school year.
If a student repeats an academic course for which credit has been granted, the
grade will be reflected on the transcript and calculated in the GPA, but the course
will not be counted twice toward the credits required for graduation.
Credits from courses taken at other accredited schools are transferable and
applicable to Davidson Day School graduation requirements if approved by the
appropriate department chair and by the Head of Upper School. Courses taken at
other schools (including accredited online programs) will be listed separately and
attached to the Davidson Day School transcript. At no time will a grade point
average from another school be calculated into the Davidson Day GPA.
EIGHTH GRADE CREDITS
Students who earn a Math (Algebra | and/or Geometry) or World Language credit
prior to ninth grade, either at Davidson Day School or at another accredited school,
may apply those credits toward course completion and graduation requirements.
However, if placement testing or subsequent performance indicates that a student
does not have the requisite preparation to succeed in the next-level math or
language course, that student may be asked to repeat the course. Eligible courses
taken in middle school are not calculated into the cumulative upper school CPA,
but are listed on the transcript.
```

===== PAGE 13 =====

```text
DIPLOMA DISTINCTIONS
Intellectual Depth. Real-World Reach.
Many schools offer advanced coursework. Fewer offer meaningful transformation.
At Davidson Day, the Diploma Distinctions are defined not by the number of AP courses
completed, but by the habits of mind and character cultivated along the way. Through
immersive practicum experiences, sustained scholarly inquiry, and structured ethical dialogue,
students are challenged to confront complexity rather than avoid it. They move beyond
certainty into disciplined investigation and discover that leadership requires more than
expertise; it requires judgment.
Here, Davidson Day's C.O.R.E. values become lived experience:
Courage - embracing challenge and pursuing ambitious questions.
Ownership - taking responsibility for intellectual growth and scholarly integrity.
Resilience - persisting through challenge, complexity, and critique.
Empathy - recognizing the human impact of ideas and decisions.
By integrating rigorous academics with real-world immersion and ethical inquiry, the Diploma
Distinctions prepare students to lead with clarity, humility, and purpose-ready to contribute
thoughtfully in complex and evolving environments.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
```

===== PAGE 14 =====

```text
DIPLOMA TRACK #1: GLOBAL STUDIES
The Clobal Studies Diploma Distinction prepares students to navigate an
increasingly interconnected world with intellectual sophistication and cultural
fluency. This Diploma Distinction has existed at Davidson Day School since 2021,
with most students taking advantage of the AFAR research trips to Spain, Portugal,
and Belize to ground their research in collegiate-level archaeological research and
international travel experience. As the Global Studies pathway matures, students
will have additional opportunities to participate in international service trips,
language immersion programs, or find their own international opportunities to
ground their research and explore their interests.
Through advanced coursework in history, economics, environmental studies,
psychology, and world languages, students examine the systems, cultures, and
forces that shape global relationships. Language competency and international
experiences are central to the program, not supplemental. Students are challenged
to move beyond surface-level awareness toward genuine cultural understanding-
developing the ability to interpret context, appreciate complexity, and engage
across difference with humility and curiosity.
Practicum experiences-often including international travel, research initiatives,
language immersion, or cross-cultural service-become the foundation for
sustained academic inquiry. Through their Capstone research, students investigate
questions that emerge from lived global experience, whether in areas such as
international development, environmental sustainability, archaeology, cultural
identity, or global public health.
Graduates of the Global Studies Distinction leave not only informed about the
world, but equipped to participate in it thoughtfully-bringing cultural competency,
intellectual rigor, and principled judgment to international and intercultural
contexts.
```

===== PAGE 15 =====

```text
DIPLOMA TRACK #1: GLOBAL STUDIES
Pre-requisite:
• Honors Anthropology
Choose 3 of the following electives:
• AP World History or AP European History, AP Environmental Science, AP Psychology, AP
Macroeconomics, AP with WE Service Recognition,AP Spanish Language and Culture, or AP
French Language and Culture
Language Competency:
• Completion of level IV or 3 levels in the same language in Upper School
Practicum
• Approved international travel program (at least two weeks)
• Quarterly Ethics Labs
• Scholars Research Program
• Research Methods Honors (junior year)
• Capstone Research Honors (senior year)
• Senior Capstone Research Project
2026-2027 school year. The class of 2027 remains eligible for the Global Studies Diploma only,
they are not eligible to add another Diploma Distinction.
Research Methods Honors
Research Methods Honors is a foundational component of the Diploma Distinctions program and
is automatically scheduled for students who are accepted into the program. Listed on the
transcript as an honors-level course, Research Methods is designed to equip students with the
skills necessary to conduct sustained, formal academic research in preparation for the senior
Capstone project. Through biweekly seminars, students learn how to read and analyze scholarly
articles, evaluate sources, develop research questions, and engage with academic discourse across
disciplines. Students apply these skills independently during a designated study hall period, where
they begin conducting guided research.
In the second semester, students narrow their focus toward a prospective Capstone topic,
complete a literature overview within their chosen field, and prepare intentionally for their
practicum experience, which is typically undertaken during the summer before senior year,
though it may occur during the academic year. The culminating project for Research Methods
Honors is the development of a formal Capstone abstract, demonstrating clarity of purpose,
familiarity with existing scholarship, and a well-defined plan for sustained independent inquiry.
This course serves as the intellectual bridge between academic coursework and the senior
Diploma Distinction Capstone experience.
Prerequisites: Application for Diploma Distinctions (Grade 71)
```

===== PAGE 16 =====

```text
DIPLOMA TRACK #2: STEMM
The STEMM (STEM and Medicine) Diploma Distinction challenges students to
pursue scientific and mathematical inquiry with depth, discipline, and imagination.
Grounded in advanced laboratory sciences and rigorous mathematics, the program
cultivates strong analytical reasoning and problem-solving skills. Yet the focus
extends beyond technical mastery. Students are encouraged to explore the
broader implications of scientific discovery-considering how innovation shapes
society, advances human health, and addresses global challenges.
Practicum experiences may include medical shadowing, laboratory internships,
engineering placements, computational research, or applied scientific investigation.
These immersive opportunities expose students to the realities of scientific and
medical work-where precision, collaboration, and perseverance matter.
Through their Capstone research, students pursue original questions emerging
from these experiences. Whether investigating biomedical advancements,
environmental systems, technological innovation, psychological science, or data-
driven problem solving, students learn to design research, analyze findings, and
communicate conclusions at a collegiate level.
Graduates of the STEMM Distinction leave with more than technical expertise. They
develop intellectual resilience, ethical awareness, and the capacity to apply
scientific knowledge in ways that meaningfully improve lives.
```

===== PAGE 17 =====

```text
DIPLOMA TRACK #2: STEMM
Core: Choose 1 of the following
• Anatomy & Physiology Honors
• Forensics & Zoology Honors
• AP Physics I
• AP Statistics
Choose three of the following electives:
AP PreCalc, AP Calculus (AB or BC), AP Biology, AP Chemistry, AP Physics I, AP Physics |I
AP Psychology, AP Computer Science A
Competencies:
• 4 lab science courses taken at the Honors or AP Level
• 4 courses in mathematics taken at the Honors or AP level
Practicum
• Approved internship (at least 100 hours) or approved collegiate program
• Quarterly ethics labs
• Scholars Research Program
• Research Methods Honors (junior year)
• Capstone Research Honors (senior year)
• Senior Capstone Research Project
Research Methods Honors
Research Methods Honors is a foundational component of the Diploma Distinctions program
and is automatically scheduled for students who are accepted into the program. Listed on
the transcript as an honors-level course, Research Methods is designed to equip students
with the skills necessary to conduct sustained, formal academic research in preparation for
the senior Capstone project. Through biweekly seminars, students learn how to read and
analyze scholarly articles, evaluate sources, develop research questions, and engage with
academic discourse across disciplines. Students apply these skills independently during a
designated study hall period, where they begin conducting guided research.
In the second semester, students narrow their focus toward a prospective Capstone topic,
complete a literature overview within their chosen field, and prepare intentionally for their
practicum experience, which is typically undertaken during the summer before senior year,
though it may occur during the academic year. The culminating project for Research
Methods Honors is the development of a formal Capstone abstract, demonstrating clarity of
purpose, familiarity with existing scholarship, and a well-defined plan for sustained
independent inquiry. This course serves as the intellectual bridge between academic
coursework and the senior Diploma Distinction Capstone experience.
Prerequisites: Application for Diploma Distinctions (Grade 11)
```

===== PAGE 18 =====

```text
DIPLOMA TRACK #3: BUSINESS & CIVIC
ENGAGEMENT
The Business and Civic Engagement Diploma Distinction prepares students to
understand how markets, institutions, and communities function-and how they
can be strengthened through principled leadership and entrepreneurial initiative.
Through coursework in economics, government, history, statistics, business,
financial literacy, and social entrepreneurship, students gain a foundation in both
the mechanics of economic systems and the responsibilities of civic participation.
They examine public policy, market behavior, institutional design, and the ethical
dimensions of decision-making.
Equally central to this pathway is the cultivation of an entrepreneurial mindset.
Students are encouraged to identify problems worth solving, recognize opportunity
in complexity, and design innovative solutions that create value-whether in private
enterprise, nonprofit organizations, or public institutions. They learn to think
creatively, assess risk, iterate, and adapt.
Practicum experiences may include internships with business leaders, engagement
with startup ventures, participation in nonprofit initiatives, or sustained civic
involvement tied to a research project. The Capstone research, rooted in these real-
world experiences, ultimately defines the student's distinction-exploring topics
such as economic innovation, public policy reform, nonprofit impact, sustainable
enterprise, or civic leadership.
Graduates of this pathway emerge with both analytical skill and initiative: prepared
not only to participate in existing systems, but to improve and reimagine them.
```

===== PAGE 19 =====

```text
DIPLOMA TRACK #3: BUSINESS & CIVIC
ENGAGEMENT
Core:
• Financial Literacy OR Social Entrepreneurship
Choose four of the following electives:
AP US History, AP Microeconomics, AP Macroeconomics, AP US Government and Politics,
AP with WE Service, AP Business, AP Statistics, Davidson DCI Programming (at least 2
semesters of participation)
Practicum
• Approved internship (at least 100 hours), approved volunteer opportunity (at least 100
hours), or approved collegiate program
• Quarterly ethics labs
• Scholars Research Program
• Research Methods Honors (junior year)
• Capstone Research Honors (senior year)
• Senior Capstone Research Project
Research Methods Honors
Research Methods Honors is a foundational component of the Diploma Distinctions program
and is automatically scheduled for students who are accepted into the program. Listed on
the transcript as an honors-level course, Research Methods is designed to equip students
with the skills necessary to conduct sustained, formal academic research in preparation for
the senior Capstone project. Through biweekly seminars, students learn how to read and
analyze scholarly articles, evaluate sources, develop research questions, and engage with
academic discourse across disciplines. Students apply these skills independently during a
designated study hall period, where they begin conducting guided research.
In the second semester, students narrow their focus toward a prospective Capstone topic,
complete a literature overview within their chosen field, and prepare intentionally for their
practicum experience, which is typically undertaken during the summer before senior year,
though it may occur during the academic year. The culminating project for Research
Methods Honors is the development of a formal Capstone abstract, demonstrating clarity of
purpose, familiarity with existing scholarship, and a well-defined plan for sustained
independent inquiry. This course serves as the intellectual bridge between academic
coursework and the senior Diploma Distinction Capstone experience.
Prerequisites: Application for Diploma Distinctions (Grade 11)
```

===== PAGE 20 =====

```text
CALA
монУ
ENGLISH
```

===== PAGE 21 =====

```text
allusi
N
The English curriculum introduces
students to a wide range of ideas and
human experiences while developing
strong reading, writing, and critical
thinking skills. English classes are
seminar-style, discussion-based, and
writing-intensive.
Literary analysis, argumentative writing,
and personal narrative are taught at all
levels and students learn to deconstruct
increasingly sophisticated texts and to
construct increasingly sophisticated
arguments as they progress. All core
English courses assign summer reading
which must be completed prior to the
start of the school year.
Enrollment in Honors and Advanced
Placement courses requires departmental
approval; these courses are academically
intensive, proceed at a faster pace, and
cover material in more depth than
traditional (college prep) level courses.
To fulfill graduation requirements,
students must earn four credits of
English; must pass Composition; and
must be enrolled in a core English class
each year of upper school.
ENGLISH I
ENGLISH I HONORS
In English I, students will gain exposure to
a wide range of literary genres and
formats, such as novels, short stories, and
plays. The primary texts that students will
read and analyze are Arthur Miller's The
Crucible, Shakespeare's Romeo and Juliet,
and John Steinbeck's Of Mice and Men,
while supplementary texts will pull from
from various time periods and cultures,
including Greek and Native American
mythology, Washington Irving's The
Legend of Sleepy Hollow, and Jack
London's To Build a fire.
In addition to these readings, students will
gain plenty of experience with academic
writing through a series of smaller writing
assignments and academic papers. These
written submissions will be supplemented
by in-class writing workshops and a unit
focused on grammar and writing skills.
Students will be recommended for
English 1 or English 1 Honors after
consultation with their eighth-grade
teachers.
```

===== PAGE 22 =====

```text
ENGLISH II
Similar to English I, this course aims to
give students an opportunity to engage
with a wide array of texts. The primary
texts that students will engage with
include the epic poem Beowulf,
Shakespeare's Othello, and George
Orwell's Animal Farm. Between these
major works will be smaller works for
units on short stories and poetry,
including Shakespearean sonnets and
modern poetry. To hone their analytical
skills, emphasis will be placed on the
deeper meaning and implications behind
the text being read.
Alongside the typical exams and
academic papers, class assignments will
encompass journal entries, reading
questions, and creative writing. Students
will also be expected to think critically
about the texts, meet the appropriate
writing standards, and participate
regularly in class discussions.
Open to sophomores.
ENGLISH II HONORS
In English Il Honors, students read fiction
and nonfiction that may include A Long
Way Gone, Much Ado About Nothing,
Predictably Irrational, and a choice read
They will also be introduced to selected
poetry and will continue to receive
instruction and practice in vocabulary-
building and standard English grammar.
Students will learn to properly annotate
fiction and nonfiction texts while building
their overall writing skills through
scaffolded ACE responses.
Students in English Il Honors learn and
extend the skill sets of English Il as they
complete additional reading and writing
assignments, including both personal
writing and analyses of complex aesthetic
texts. Students who succeed in English lI
Honors may consider taking AP Language
and Composition in their junior year.
Prerequisites: Successful completion of
English 1 or English I Honors and an
instructor recommendation.
```

===== PAGE 23 =====

```text
ENGLISH III HONORS
English Ill Honors is a literature-based
course focusing on short fiction, novels,
drama, creative nonfiction and poetry.
Students will read novels such as 1984, The
Stranger, The Great Catsby, The Old Man
and the Sea, and Frankenstein; plays such
Fences; and short stories by Ernest
Hemingway, F. Scott Fitzgerald, and James
Baldwin.
Students develop as writers and thinkers
by focusing on the skill sets of literary
analysis and argument construction. While
a grammar review is a component of the
course, these skills are for the mostly
taught in context. The course's literary
analysis, prepares students interested in
taking an Advanced Placement English
class in their senior year.
Prerequisites: Successful completion of
English I1 or English || Honors.
ENGLISH IV HONORS
The course's first semester explores the
southern United States' literary voice, and
will include authors, such as by William
Faulkner, Alice Walker, Carson McCullers,
Thomas Wolfe, and Ferrol Sams. This
course will also include contemporary
voices from the modern American South,
such as Jesmyn Ward, Ron Rash, and Tayari
Jones. Students will practice close reading
skills and analytical writing, as well as
extensive research into a southern author
of their choice.
This course's second semester will explore
many of Shakespeare's comedies,
including As You Like It, Much Ado About
Nothing, Twelfth Night, and more. This is
not a course for spectators; the seminar
format will encourage students to take an
active role in the close reading and
interpretation of the work.
Prerequisites: Successful completion of
honors English 3 and teaching
recommendation.
Parte to
C.O.R.E.
No!
-00→0
CREATIVE WRITING HONORS
In this Honors English elective, students
will learn about and practice the genres of
poetry, life writing, and fiction.
The aim of this course is to create
supportive workshop environment in
students work with their instructor, with
each other, and independently to produce
quality writing through multiple revisions.
Students will be encouraged to work
toward publishing or otherwise sharing
their work with a larger audience. They will
be evaluated based on their participation
in workshop and structured writing
activities, on portfolios of finished work in
several genres, and on the quality and
scope of a final, self-designed project.
This is an elective and does to count
towards the English requirement.
Open to all grades.
```

===== PAGE 24 =====

```text
AP ENGLISH LANGUAGE AND
COMPOSITION
AP English Language and Composition is a
writing- and reading-intensive course that
makes demands equivalent to those of a
full-year introductory college course. The
course focus is the study of rhetoric, which
means that students will learn the various
ways in which an effective argument can
be presented.
Students will gain the ability to discern
what an argument's strengths and
weaknesses are without dipping into the
realm of mere opinion. They will also learn
to use rhetorical strategies themselves in
their own writing.
All writing and instruction in this course,
then, has the purpose of making and
defending an argument, or of explaining
how the authors read go about making
and defending their arguments. The
primary course text iS
www.americanrhetoric.com, which is
supplemented by various additional
political, social, and personal writings.
Prerequisites: English Il Honors, English III
Honors, and/or AP English Literature and
Composition. Open to juniors or seniors
with departmental approval.
AP ENGLISH LITERATURE AND
COMPOSITION
AP English Literature and Composition
provides students with a course in
composition and literary analysis that
makes demands equivalent to those of a
full-year introductory college course.
Through the close study of literary works of
multiple genres, as well as selected critical
and scholarly essays, students will sharpen
their awareness of language and their
understanding of the writer's craft while
developing critical standards for
appreciating and evaluating literature
They will also explore the cultural, social,
and historical aspects of individual works.
The course examines representative British
and American novels and plays from the
16th century to contemporary times, such
as The Scarlet Letter, The Importance of
Being Earnest, Their Eyes Were Watching
God, Hamlet and Oryx & Crake. Poetry
and short fiction will be chosen to
supplement our study of the longer works.
In addition to critical reading and
discussion of the assigned works,
instruction and practice in writing is a
major component of the course: students
will write several in-class timed writings
which mirror the expectations outlined on
the May exam.
Prerequisites: English Il Honors, English I|l
Honors, and/or AP English Language and
Composition. Open to seniors with
departmental approval.
ENGLISH
```

===== PAGE 25 =====

```text
INTRODUCTION TO YEARBOOK
Students in this class produce the
Davidson Day yearbook, Revolution. In the
process, they are introduced to the
vocabulary, sentence structure, tone, and
tense of traditional journalistic writing and
develop the skills necessary to create
captions and short articles based on
school activities and events.
The class is structured like a business, with
an Editor in Chief, Editors, and a Financial
Manager. Staff members practice skills like
journalistic photography, journalistic
writing, interviewing, selling business ads,
organizing fundraisers, and working under
deadlines. Students taking this class will
be expected to complete some photo
sessions and layout assignments outside of
class.
Prerequisite: recommendation from an
English teacher. This course is an elective
and does not fulfill the English class
requirement. This class may be used as
an Arts elective.
YEARBOOK HONORS
Students in this class produce the
Davidson Day yearbook, Revolution.
In Advanced Yearbook, students further
the skills developed in Introduction to
Yearbook and assume leadership roles in
the areas of staff training, management,
organization, and design.
Advanced Yearbook students choose the
annual theme of the yearbook; develop its
content and layout; determine the
organization of photos, fonts, text, and
advertising; direct the training of new staff;
edit spreads; and advise staff members on
content and spread development. They
coordinate business and senior ad
campaigns, the school-wide distribution of
the yearbooks, and the Family Photos
fundraiser.
Prerequisites: Journalism: Introduction to
Yearbook and instructor approval. This
course is an elective and does not fulfill
the English class requirement. This class
may be used as an Arts elective. Editor
positions are assigned by the adviser.
```

===== PAGE 26 =====

```text
MATHEMATICS
ERSITVAS
```

===== PAGE 27 =====

```text
Traditional, Honors, and Advanced
Placement courses in Mathematics meet
the learning needs, interests, and aptitude
of each student. Enrollment in Honors and
Advanced Placement courses requires MATHEMATICS
departmental approval; these courses are
more academically intensive, proceed at a
faster pace, and cover material in more
depth than traditional level courses.
To fulfill graduation requirements,
students must earn four credits of Math
and must complete at least one course
beyond Algebra Il. Students should be
enrolled in a Math class each year of
upper school.
AXOy
ESSENTIAL
```

===== PAGE 28 =====

```text
UPPER SCHOOL MATHEMATICS
COURSE PROGRESSION
5th Grade Sth Grade Math
6th Grade Mach 1 Accelerated Math 1
7th Grade Math 2 Accelerated Math 2
8th Grade Mach 3 Accelerated Math 3
9th Grade Algebra 1 Honors Algebra 1
10th Grade Geometry Honors Geometry Honors Geometry &
Honors Algebra 2
11th Grade Algebra 2 Honors Algebra 2
Precalculus AP Precalculus Honors Calculus
Accelerated Math 1
Accelerated Math 2 Accelerated Math 2/13
Accelerated Math 3 Honors Algebra 1
Honors Algebra 1 Honors Geometry
Honors Geometry Honors Geometry & Honors Algebra 2
Honors Algebra 2
Honors Algebra 2 AP Precalculus
AP Precalculus BC Calculus
AP Staustie Calculus 3
```

===== PAGE 29 =====

```text
ALGEBRA I
ALGEBRA 1 HONORS
Algebra I introduces students to the
fundamental concepts of algebra and their
multiple representations. Topics include
linear equations and inequalities, quadratic
equations, polynomial expressions, and the
elementary properties of functions.
Critical thinking and problem-solving skills,
modeling and solving real-world problems,
and the use of a graphing calculator are
integral parts of the course.
Algebra 1 Prerequisite: Math 3 or
Prealgebra
Algebra 1 Honors Prerequisite: Accelerated
Math 3 or Honors Prealgebra
GEOMETRY
GEOMETRY HONORS
Geometry introduces students to classical
Euclidean geometry, lines, angles, circles.
polygons and areas, and their associated
relationships. Topics include congruence,
similarity, solid geometry (surface area and
volume), analytic geometry, and right
triangle trigonometry.
Both courses emphasize inductive and
deductive reasoning and proofs. Geometry
Honors is more academically intensive,
proceeds at a faster pace, and covers
material in more depth
Prerequisite: Algebra /
Honors Prerequisite: Honors Algebra I and
Departmental Approval
ALGEBRA II
ALGEBRA II/ TRIGONOMETRY (HONORS)
Both courses begin with a short review of
the fundamental algebraic concepts and
go on to cover polynomial functions in
depth and to introduce rational, square
root functions, and complex numbers.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
Transcendental functions like logarithms
and exponential models are covered at
both levels, with trigonometric functions
discussed at the Honors level. Graphs and
transformations of graphs, solving
equations, modeling with functions, and
the use of a graphing calculator are
integral parts of the course.
Prerequisite: Geometry
Prerequisites: Geometry Honors and
Additional Summer Work
AP STATISTICS
This course introduces students to the
major concepts and tools for collecting,
analyzing, and drawing conclusions from
data. There are four themes evident in the
content, skills, and assessment in the AP
Statistics course: collecting and exploring
one- and two-variable data; sampling and
experimentation; probability and
simulation; and statistical inference.
Students use technology, investigations,
problem solving, and writing skills as they
build conceptual understanding.
students should have the intellectual
maturity needed to work independently
and use higher-level thinking skills to
work out complex problems.
Prerequisites: Algebra Il/Trigonometry
Honors and Departmental Approval.
MATHEMATICS
```

===== PAGE 30 =====

```text
PRECALCULUS
Precalculus combines the concepts of
trigonometry, geometry, and algebra that
are necessary to prepare students for the
study of calculus. The course strengthens
students' conceptual understanding of
algebraic and transcendental functions by
discussing them in greater depth. The
main functions included are polynomial
functions; rational and radical functions;
exponential and logarithmic functions;
and trigonometric functions. Solving
complex equations, manipulating
trigonometric and algebraic expressions,
modeling, and the use of a graphing
calculator are integral parts of the course.
Prerequisites: Algebra Il
AP PRECALCULUS
AP Precalculus is a college-level course
aligned with College Board standards that
prepares students for success in calculus
and other advanced mathematics courses.
Students explore a deep understanding of
functions, including polynomial, rational,
exponential, logarithmic, and
trigonometric functions, with an emphasis
on modeling, representation, and
transformation.
The course focuses on mathematical
reasoning, problem solving, and the
application of concepts to real-world
situations. Students are prepared to take
the AP Exam for the opportunity to earn
college credit and/or placement.
Prerequisites: Honors Algebra 11 with
Trigonometry
HONORS CALCULUS
Honors Calculus is an advanced
mathematics course designed for students
with a solid foundation in algebra,
geometry, and precalculus. Topics include
Limits and Continuity, Derivatives, the
Fundamental Theorems of Calculus, and
Techniques of Integration. This course
emphasizes the application of calculus
techniques and problem-solving strategies
necessary for success in higher-level STEM
courses.
Prerequisite: Precalculus
```

===== PAGE 31 =====

```text
AP CALCULUS AB
AP Calculus AB is a college-level course
aligned with College Board standards that
introduces students to the fundamental
concepts of differential and integral
calculus. Students explore limits,
derivatives, and definite integrals, and
apply these concepts to analyze change,
motion, and accumulation in real-world
contexts. The course emphasizes multiple
representations of functions (graphical,
numerical, analytical, and verbal), along
with strong reasoning, modeling, and
communication skills. Successful
completion prepares students for the AP
Exam and the possibility of earning
college credit and/or placement.
Prerequisites: AP Precalculus with
departmental approval and additional
summer work.
AP CALCULUS BC
AP Calculus BC is a college-level course
aligned with College Board standards that
extends the content of AP Calculus AB. In
addition to limits, derivatives, and
integrals, students study advanced topics
such as parametric, polar, and vector
functions, as well as sequences and series.
The course emphasizes conceptual
understanding, multiple representations,
and the application of calculus to real-
world problems. Students develop strong
analytical and problem-solving skills and
are prepared to take the AP Exam for the
opportunity to earn college credit and/or
advanced placement.
Prerequisites: AP Calculus AB, or AP
Precalculus with departmental approval,
and additional summer work.
MATHEMATICS
CALCULUS (POST-AP)
MULTIVARIABLE CALCULUS AND
LINEAR ALGEBRA
These semester courses include calculus
concepts into higher dimensions.
Students learn about functions in these
new higher dimensional spaces.
Differential and integral calculus are
discussed from this new multivariable
approach.Students learn how to find
tangent lines and planes, gradients,
Lagrange multipliers, and length of three
dimensional curves as well as volumes
underneath surfaces. Linear Algebra topics
include the study of vectors and vector
spaces as well as matrix applications and
transformations. Students are also
exposed to proofs and logic to give them a
solid foundation for college-level
mathematics. Because this "post-AP"
courses makes demands similar to those
of an AP course, it receives a 1.0 weighting
when GPA is calculated.
Prerequisites: AP Calculus BC
```

===== PAGE 32 =====

```text
CTER
WISE WERE
4.10.58 SOMEO
HISTORY & SOCIAL SCIENCES
R SOADS
ORTUGAL
```

===== PAGE 33 =====

```text
sef! Justice Wehunt
Students in History courses learn to
interpret primary and secondary sources,
to think critically, and to write analytically
through assignments based on research,
analysis, synthesis, inquiry, and critical
thinking in order to develop a deeper
understanding of the past and its
connections to the present.
All core History/Social Sciences courses
assign summer reading which must be
completed prior to the start of the school
year. Enrollment in Honors and Advanced
Placement courses requires departmental
approval; these courses are more
academically intensive, proceed at a faster
pace, and cover material in more depth
than traditional courses.
Three years of History are required.
Students must take Civics (or Big History if
enrolled in the Upper School before 2024-
2025), World History for Anthropology if
enrolled in the Upper School before 2024-
2025), and U.S. History.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
CIVICS
Civics and Deliberative Democracy serves as
a foundational humanities course that
prepares students for advanced study in
history, government, and English. Rooted in
constitutional principles and key moments
in American history, the course emphasizes
close reading and critical analysis of primary
texts alongside the development of clear,
persuasive academic writing.
Through research, position papers,
structured debates, and collaborative
projects, students engage with complex and
often politically divisive issues. The course is
intentionally designed to help students
understand diverse perspectives, articulate
their own views thoughtfully, and engage in
civil, evidence-based discussion. By
modeling the practices of civic discourse
and deliberative democracy, students
develop the habits of mind and
communication skills essential for informed
participation in a democratic society.
```

===== PAGE 34 =====

```text
CIVICS HONORS
Civics and Deliberative Democracy Honors
builds upon the foundational goals of the
standard course while introducing a higher
level of analytical rigor and academic
expectation. Rooted in constitutional
principles and historical inquiry, the course
emphasizes close reading and interpretation
of primary source documents, with
particular attention to sourcing, context, and
argumentation. Students develop advanced
persuasive writing skills through frequent,
structured analytical essays.
In addition to research projects, position
papers, and structured debates, students
regularly practice AP-style writing prompts
to strengthen their ability to synthesize
multiple sources into coherent, evidence-
based arguments. Students engage
thoughtfully with politically divisive issues,
examining diverse perspectives while
articulating their own views with clarity and
civility. By modeling deliberative democracy
in both discussion and writing, the course
prepares students for the demands of AP
World History and other upper-level
humanities courses.
Honors Prerequisites: Departmental
Permission (grade 9)
ANTHROPOLOGY HONORS
Anthropology is the science of mankind in
its entirety. These courses provide
students with a systematic overview of the
field of Anthropology through an analysis
of its four subfields: cultural anthropology,
physical anthropology, archaeology, and
linguistics.
Students will visit different parts of the
world through readings, lectures, and film,
allowing them to observe a variety of
worldviews, norms, and values. They will
develop an effective knowledge of basic
concepts in anthropology, important
findings in the field, research methods, as
well as an overview of the cultures of the
world. Because of the broad spectrum of
the subject matter in the field of
anthropology, almost every subject that
man has dealings with is a possible choice
for discussion.
Students will engage with one of
anthropology's central questions: what it
means to be human. This exploration will
examine humanity from both a biological
perspective, considering our evolution,
anatomy, and variation, and a cultural
perspective, focusing on the beliefs,
practices, and social systems that uniquely
shape human life. Through comparative
analysis across different societies and
historical periods, students will identify
both the shared traits that unit us as a
species and the diverse expressions that
distinguish human groups across time
and space. This dual approach encourages
critical thinking about human diversity
while fostering a deeper understanding of
our common humanity.
Prerequisites: Civics or Civics Honors, and
instructor approval.
```

===== PAGE 35 =====

```text
AP WORLD HISTORY (MODERN)
AP World History (Modern) is a college-level
survey of world history from approximately
1200 CE to the modern era. Topics covered
include the causes and processes of global
cultural and economic integration;
industrialization and its consequences; the
spread and collapse of Western
colonialism; and the great worldwide
ideological conflicts of the twentieth
century. This course will push students to
think, write, and work like historians. They
will learn the practice of history by
explicitly developing historical thinking
skills as they learn about the past.
The reading load for this course is
significant; the course textbook will be
supplemented by a wide variety of both
primary and secondary source documents.
In-class activities include discussions,
lectures, group projects, and debates.
Prerequisites: Civics Honors and
departmental approval.
U.S. HISTORY HONORS
This course surveys United States history
from the peopling of North America to the
present. In order to appreciate the
complexity of the United States and its
people, students will consider this history
from diverse points of view and trace
social, political, economic, environmental,
and cultural continuities and changes over
time. The course begins with the arrival of
humans in North America and progresses
through the pre-Columbian period;
European colonization; the Revolution; the
creation of a new republic; territorial and
democratic expansion; sectionalism and
the Civil War; industrialization and the
Progressive Era; America's emergence on
the world stage; Depression and the New
Deal; the World Wars; the Cold War and
American international hegemony; and
societal changes from the 1950s to the
present day.
Students will be required to demonstrate
mastery of basic historical thinking and
analytical skills. Class activities include
discussions, lectures, group projects, and
historiographical debates about some of
the big questions of American history.
Students will become skilled at using
primary source material to develop and
support historical arguments.
Prerequisite: A teacher recommendation
is required for Honors.
HISTORY &
SOCIAL SCIENCES
```

===== PAGE 36 =====

```text
AP US HISTORY
AP U.S. History is a college-level survey of
United States history. This course will push
students to think, write, and work like
historians. They will learn the practice of
history by explicitly developing historical
thinking skills as they learn about the past.
Reading requirements in this course are
significantly greater than in the other U.S.
History courses; assigned readings include
primary-source documents, textbook
readings, political cartoons, maps, data
sets, and pictures. Class time is spent in
discussions, lectures, activities, and
debates.
Prerequisites: open to juniors with
departmental approval.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
AP MICROECONOMICS
Economics examines the processes that
determine the production and
consumption of goods and services. It is
the study of how humans cope with
scarcity: the combination of potentially
unlimited wants and limited resources
with which to meet them.
Microeconomics focuses on the principles
of economics as applied to individual
decision makers, both producers and
consumers, within an economic system.
Macroeconomics focuses on the principles
of economics as applied to the economic
system as a whole.
Students considering either course should
be able to work independently as they
read, practice, and study for mastery of the
economic concepts presented.
Offered in alternate years to juniors and
seniors with departmental approval.
Macroeconomics will be offered during
the 2027-28 school year.
```

===== PAGE 37 =====

```text
AP PSYCHOLOGY
Psychology is the systematic and scientific
study of human behavior and thought
processes to understand the internal and
external aspects of human experience.
AP Psychology covers psychological
concepts such as learning, motivation,
memory, neuroanatomy, and the function
of the nervous system.
In preparing students for the AP exam,
this course will go beyond a lecture style
of learning to foster critical thinking skills
through projects, models, group work, and
guided discussion.
Students will engage in active learning by
analyzing, interpreting, and designing
experiments to provide a deeper
understanding of problem solving,
language acquisition, creativity, attention,
intelligence, testing, and social dynamics
They will compare and contrast
experiments, correlational studies,
naturalistic observations, and case studies
as means to gather data. Students taking
this course must be prepared to read and
work on sophisticated projects both in
and out of the classroom.
This course is open to juniors and seniors
with departmental approval.
AP GOVERNMENT AND POLITICS
Students cultivate their understanding of
U.S. government and politics through
analysis of data and text-based sources as
they explore topics like constitutionalism,
liberty and order, civic participation in
representative democracy, competing
policy-making interests, and methods of
political analysis.
This course is open to juniors and seniors
with departmental approval.
AP EUROPEAN HISTORY
AP European History, students investigate
significant events, individuals,
developments, and processes from
approximately 1450 to the present. This
includes but is not limited to the
Renaissance, Reformation, Absolutism,
Napoleonic Era, Industrialization,
Imperialism, and 20th-century global
conflicts. Throughout the course, students
will analyze primary and secondary
sources; developing historical arguments;
making historical connections; and
utilizing reasoning about comparison,
causation, and continuity and change over
time. The course will utilize a variety of
learning methods including but not
limited to note-taking, presentations,
geographical development, essay writing,
and debates to assist students in their
analytical development.
This course is open to juniors and seniors
with departmental approval.
D All B
O Perrsona
CO ON DOS Bookemar_
der dir people no and le future
up inad a healther and les
self actually vocis to
Ton t works to help
ten a clear share the bill and
Nil nuke any ily, we hope it
```

===== PAGE 38 =====

```text
SCIENCE
```

===== PAGE 39 =====

```text
In science courses, students learn the
fundamental principles of science and the
processes by which scientists acquire
knowledge: observation, classification,
experimentation, analysis, and application.
All science courses include laboratory
activities that support classroom work.
Enrollment in Honors and Advanced
Placement courses requires departmental
approval; these courses are more
academically intensive, proceed at a faster
pace, and cover material in more depth
than traditional-level courses.
To fulfill graduation requirements,
students must complete at least one
credit each of Physics, Chemistry, and
Biology.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
CONCEPTUAL PHYSICS
PHYSICS HONORS
Both Physics courses begin the year with
an exploration of waves, sound, and light;
then cover the fundamental concepts of
mechanics: forces, linear motion, projectile
motion, energy and momentum; and
finally close the year with an introduction
to electric circuits.
Physics provides students with the
opportunity to take their learning of
science to the next level, not just recalling
facts, but truly understanding concepts
and connecting their understanding of
various models of the physical world
developed in the course. Models are
representations of physical phenomena
that take the form of l) graphical
relationships between variables; 2)
mathematical equations derived from
analysis of the graphs; 3) diagrammatic
representations of physical phenomena; or
4) narrative descriptions of physical
phenomena. These models have broad
application and predictive power.
As students continue to deepen their
conceptual understanding of each model,
they are able to translate fluently between
different forms of the model and use the
models they develop to solve complex
problems. In Conceptual Physics, the
mathematical models are limited to
concepts covered in Algebra 1; Honors
Physics adds concepts covered in
Geometry.
Students will be recommended for
Conceptual Physics or Physics Honors
after consultation with their eighth-grade
teachers. Co-requisite for Physics Honors:
enrollment in Geometry or higher.
```

===== PAGE 40 =====

```text
AP PHYSICS 1
AP Physics 1 is an algebra-based,
introductory college-level physics course.
Students cultivate their understanding of
physics through hands-on laboratory work
and inquiry-based investigations as they
explore kinematics; dynamics; circular
motion; energy; momentum; torque and
rotational motion, gravitation; simple
harmonic motion; and fluids.
AP Physics 1 is the equivalent of a first-
semester introductory college course in
algebra-based physics.
Laboratory exercises in this course focus on
experimental design and provide students
with opportunities to demonstrate the
foundational physics principles and apply
science practices.
Prerequisites: departmental approval;
Physics Honors is strongly recommended.
Co-requisite: enrollment in Pre-Calculus
Honors or higher.
AP PHYSICS 2
AP Physics 2 is an algebra-based,
introductory college-level physics course.
Students cultivate their understanding of
physics through hands-on laboratory work
and inquiry-based investigations as they
explore fluids; thermodynamics; electrical
force, field, and potential; electric circuits;
magnetism and electromagnetism;
geometric and physical optics; and topics
in modern physics.
AP Physics 2 is the equivalent of a second-
semester introductory college course in
algebra-based physics.
Laboratory exercises in this course focus on
experimental design and provide students
with opportunities to demonstrate
advanced physics principles and apply
science practices, including data analysis,
modeling, and evidence-based reasoning.
Prerequisites: Successful completion of AP
Physics 1 or departmental approval.
Co-requisite: Enrollment in Pre-Calculus
Honors or higher.
```

===== PAGE 41 =====

```text
CHEMISTRY
CHEMISTRY HONORS
This course presents the fundamental
principles and concepts of chemistry:
properties of matter; nomenclature;
atomic structure; chemical reactions;
stoichiometry; gases; thermochemistry;
chemical bonding; solids, liquids, and
solutions; acids and bases; and kinetics
and equilibrium.
Laboratory work emphasizes quantitative
measurement and develops students'
investigative techniques and their ability
to interpret results. At the Honors level,
strong emphasis is placed on critical
thinking, independent laboratory
investigations, and writing.
Students are expected to master basic
concepts independently; to draw general
conclusions from particular cases; and to
demonstrate their understanding not only
conceptually, but also mathematically.
The Honors course is designed to prepare
students for future advanced science
coursework, such as AP Chemistry, and is
faster paced, more rigorous, and requires
more outside time for preparation and
completion of assignments than the
traditional Chemistry course.
An instructor recommendation is
required for Honors.
SCIENCE
AP CHEMISTRY
The AP Chemistry course provides
students with a college-level foundation
to support future advanced coursework
in chemistry.
Following a curriculum outlined by the
College Board, students cultivate their
understanding of chemistry through
classroom demonstrations, lectures, and
inquiry-based investigations.
Students develop competency in the
typical laboratory skills of a college
course. Course content includes atomic
structure, intermolecular forces and
bonding, chemical reactions, kinetics,
thermodynamics, and equilibrium.
Prerequisites: Chemistry Honors, Algebra
Il/Trigonometry Honors, and
departmental approval.
```

===== PAGE 42 =====

```text
BIOLOGY
BIOLOGY HONORS
These courses provide an introduction to
the major principles of modern biology:
the organization of life; the interaction of
organisms with other organisms and
with their environments; and the
change in organisms over time.
Major topics include cell structure and
function; cell division; DNA replication;
protein synthesis; genetics; evolution;
phylogeny; the anatomy and physiology
of plants and animals; ecology; and
biological diversity.
Students use research, classroom
discussion, and laboratory activities to
acquire an understanding of the
dynamic world of living organisms and
their place in that world.
In addition to exploring with greater
depth and rigor the content covered in
traditional Biology, students in Biology
Honors will also be exposed to learning
through inquiry, using relevant and
current research data and through
independent experiment design.
The focus in this course is on integrating
complex concepts and applying creative
thought to problem-solving for issues
like population growth, genetic
modification of organisms, and
epidemiology.
An instructor recommendation is
required for Honors.
AP BIOLOGY
The AP Biology course provides students
with a college-level foundation to
support future advanced coursework in
biology.
Following a curriculum outlined by the
College Board, the topics in this course are
organized into three broad areas:
molecules and cells; individual organisms;
and populations.
Students cultivate their understanding of
biology through inquiry-based
investigations as they explore topics like
evolution, energetics, information storage
and transfer, and system interactions.
AP Biology is more in-depth and is taught
at a much faster pace than Biology or
Biology Honors. Students will be asked to
integrate complex concepts and to use
logic and creative thought to work
through problems; a significant amount of
independent work is required.
Prerequisites: Departmental approval;
Biology Honors strongly recommended.
AP ENVIRONMENTAL SCIENCE
In AP Environmental Science, students
cultivate an understanding of the
interrelationships of the natural world
through inquiry-based laboratory
investigations and collaborative research.
The course topics are organized around
four big ideas: energy transfer; interactions
between earth systems; interactions
between different species and the
environment; and sustainability.
The use of models and exploration of
current global research enhances students'
appreciation of how these big ideas
converge in the field of Environmental
Science.
Prerequisites: Physics Honors, Biology
Honors, Chemistry, and departmental
approval.
```

===== PAGE 43 =====

```text
HUMAN ANATOMY AND PHYSIOLOGY
HONORS
Students in Human Anatomy and
Physiology Honors learn through inquiry
using medical case studies and laboratory
exercises. The course provides a
comprehensive study of the structure and
function of the human body.
Topics include anatomical terminology,
homeostasis, cytology, and histology, as
well as the integumentary, skeletal,
muscular, nervous. cardiovascular,
respiratory, renal, digestive, immune, and
reproductive systems.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
HT
Ваїни
La Có Pr Nở
Ac Th Pa U
THE PIE SCH,
GOLF TOURNA
Students will develop an integrated
understanding of biological concepts and
will apply that understanding to solve
problems. Microscopy and dissection are
major components of the laboratory work
in this course.
Prerequisites: Biology or Biology Honors;
this course is open to juniors and seniors
with an instructor recommendation. This
course is offered in alternating years.
```

===== PAGE 44 =====

```text
WORLD LANGUAGES
```

===== PAGE 45 =====

```text
The World Languages Department helps
students achieve increasing levels of
proficiency in the four language skill areas:
listening, speaking, reading, and writing.
Upon matriculation in the upper school,
students are placed in the appropriate
World Languages course(s) based on past
performance and/or proficiency testing.
TO fulfill graduation requirements,
students must successfully complete
three credits in the same language; the
completion of four years of language
study in Upper School is encouraged.
FRENCH I
French I is designed for beginning students
of French. The course guides students to
use the four language skill areas —
listening, speaking, reading, and writing -
within culturally appropriate contexts.
Students learn to describe themselves,
their families and homes, and their
preferences in terms of school and
pastimes. Students look outward to
communicate about their communities,
their relationships, and travel in the
French-speaking world. There is an
emphasis on interpretive skills (listening
and reading) before students are expected
to articulate their own thoughts in French.
FRENCH II
French Il exposes students to French
vocabulary through topics based on friends
and family relations, education, food and
shopping, travel, and typical daily routines.
These topics allow students to
communicate about their present-day lives
and to express their experiences of the
past and expectations for the future.
The course has an emphasis on acquiring
vocabulary outside of a textbook through
conversations in the classroom and uses
authentic resources to provide this input.
Prerequisite: Successful completion of
French |/ proficiency exams may be used
to determine appropriate level for
incoming students.
FRENCH III HONORS
In French Ill Honors, students work on
applying their interpersonal,
presentational and interpretive skills in
the areas of reading, writing and speaking
through a variety of authentic resources
such as texts, songs and videos. Students
begin to also look at experiences of those
in the French speaking community and
compare and contrast the French
community with the students own
culture in the target language. Students
are also expected to participate in the
target language on a daily basis.
Throughout the course, students are
expected to communicate using
previously taught concepts and apply
those to the new concepts that are
introduced throughout the year. Making a
personal connection to the language and
culture, rather than rely on
predetermined vocabulary, is an essential
part of French Ill honors.
New vocabulary and grammar will be
taught in a concrete fashion and will
allow students to communicate on
matters related to their future plans,
healthcare, travel, fairy tales and culinary
life in France.
Prerequisite: Successful completion of
French II.
```

===== PAGE 46 =====

```text
FRENCH IV HONORS
French IV Honors students continue to
work on applying their interpersonal,
presentational and interpretive skills in the
areas of reading, writing and speaking
through almost exclusively authentic
resources.
Students continue to improve the skill of
comparing the culture of the French
speaking community to their own culture
in the target language. The expectation of
communicating in French is still present,
and students work towards
communicating exclusively in French, with
as little English as possible.
French IV honors students are also
expected to communicate with all the
concepts taught in their previous French
course and apply those to the new
concepts to help them express their own
ideas. Along with more advanced
grammatical structures, students will
delve into the world of the French
speaking community outside of Europe,
exploring the African Francophone world.
Prerequisites: Successful completion of
French I|I Honors.
FRENCH V HONORS
French V Honors is typically taken as
preparation for AP French Language and
Culture in the following year. The two
courses are taught in a two-year rotation,
with similar content covered in French V
honors and AP French but with
assignment structure differing by level.
Prerequisities: French IV Honors
WORLD
LANGUAGES
AP FRENCH LANGUAGE AND CULTURE
The AP French Language and Culture
course is a culmination of French studies
that emphasizes communication via
interpersonal, interpretive, and
presentational skills rather than grammar
and targeted vocabulary.
The course is based around six themes:
Families and Communities; Personal and
Public Identities; Beauty and Aesthetics;
Science and Technology; Contemporary
Life; and Global Challenges. These themes
are explored through contemporary and
historical contexts with a focus on French
as a worldwide language.
The course is taught almost exclusively in
French and relies upon various texts, films,
articles, music, podcasts, and television
episodes.
AP French Language and Culture is an
intensive course, requiring greater
linguistic control, and deeper analysis of
the relationships between cultural
products, practices and perspectives.
Prerequisites: French IV Honors.
PITA
EST.
```

===== PAGE 47 =====

```text
SPANISH I
Students beginning Spanish study for the
first time or those who need to reinforce
their basic language skills start with this
introductory course. The class
encompasses thematic units including
introductory dialogues, common
questions, and organization by
grammatical theme and word families
before shifting to more culturally centered
topics from around the Spanish-speaking
world. Students will learn to read, write,
listen, and produce Spanish, achieving a
novice level of memorized and produced
speech during the course of this class.
Exposure to authentic materials include
popular songs, short stories, videos, and
games. Grammatical structures covered in
the course include articles, nouns,
adjectives, and verb conjugations in the
present tense. The class will be taught in
English and Spanish, transitioning to
being taught increasingly in Spanish by
the end of the academic year.
SPANISH II
The Spanish Il course is designed to further
expose students to Spanish vocabulary
through thematic units centered around
education, friends and family relations,
daily life, technology, clothes, travel, and
traditions. These topics allow students to
communicate about their present-day lives
as well as to express their experiences of
the past and expectations of the future.
Students will also explore cultural norms
and traditions from twelve Spanish-
speaking countries. The course has a
communicative focus that aims to develop
students' ability to narrate about familiar
topics in both speech and writing.
Students are expected to use Spanish to
communicate during class time. The
instructor uses Spanish a majority of the
time when interacting with students, but
may use English when introducing new
grammar points.
Prerequisite: Successful completion of
Spanish |/ proficiency exams may be used
to determine appropriate level for
incoming students.
```

===== PAGE 48 =====

```text
SPANISH III HONORS
Students taking Spanish Ill Honors will
expand upon their previous knowledge
and understanding of the Spanish
language to sharpen their listening,
speaking, reading, and writing skills.
Students will study thematic units that
cover pastimes, travel and leisure,
relationships, concepts of beauty and
fashion, and health and medicine while
learning advanced grammar, idiomatic
expressions, and topical vocabulary
contextualized historically and culturally.
Daily work emphasizes speaking, reading,
and writing exercises as students are
encouraged to communicate more in the
target language. Spanish Ill Honors covers
academically intensive topics, explores
analysis through cross-cultural
comparisons, has a robust pacing and
covers a variety of materials.
Prerequisites: Successful completion of
Spanish Il.
SPANISH IV HONORS
Spanish IV begins more in-depth cultural
study in Spanish using authentic resources
and the building of academic vocabulary.
Students explore products, practices and
perspectives from Spanish-speaking
countries in relation to the visual arts,
human geography, extreme weather
conditions, nutrition, food safety and the
economy, and the impact of access to
education on career goals and
opportunities. Conversational skills are
emphasized, and written compositions are
assigned to develop the ability to express
complex ideas and compare cultural
differences.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
Honors requires more in-depth exploration
of these topics through amplified
vocabulary study, analysis and cross-cultural
comparisons and proceeds at a faster pace
in terms of what students are expected to
be able to produce in the language in
speaking and writing.
Prerequisites: Spanish Ill Honors.
SPANISH V HONORS
Spanish V Honors explores in-depth cultural
themes through materials created for
language learners, as well as authentic pop-
culture and academic sources and prepares
students to further develop an intermediate
level of proficiency. Through exposure to
authentic fiction and non-fiction readings,
films, and documentaries students gain
practical knowledge and advanced oral
practice to improve their navigation of the
Spanish-speaking World. This course is
taught almost exclusively in Spanish and
students are expected to use the language
at all times to converse with their peers as
well as with their teacher. Students will
cover thematic units that reflect personal
and religious beliefs, identity, global
citizenship, different ways of life, social
consciousness, and discoveries and
inventions encountered in Latin America.
Prerequisites: Spanish IV Honors and an
instructor recommendation.
```

===== PAGE 49 =====

```text
AP SPANISH LANGUAGE AND CULTURE
The AP Spanish Language & Culture course
strives not to overemphasize grammatical
accuracy at the expense of communication.
To best facilitate the study of language and
culture, the course is taught almost
exclusively in Spanish. The AP Spanish
Language & Culture course engages
students in an exploration of culture in both
contemporary and historical contexts. The
course further develops students' awareness
and appreciation of cultural products (e.g.,
tools, books, music, laws, conventions,
institutions); practices (patterns of social
interactions within a culture); and
perspectives (values, attitudes, and
assumptions).
AP Spanish Language and Culture is an
academically intensive course, requiring
greater linguistic control, and deeper
analysis of the relationships between
cultural products, practices and
perspectives.
AP Prerequisite: Completion of Spanish IV
Honors.
WORLD
LANGUAGES
```

===== PAGE 50 =====

```text
PARTICIPATION
IN THE ARTS
```

===== PAGE 51 =====

```text
Participation in the arts is central to
Davidson Day School's core mission of
fostering creativity and
appreciation, and to the project of PARTICIPATION
cultivating well-rounded students.
IN THE ARTS
To graduate, students must complete at
least one full credit in the arts.
Students at Davidson Day routinely
graduate with four or more credits in the
Visual and/or Performing Arts.
```

===== PAGE 52 =====

```text
VISUAL ARTS
Beginning art courses emphasize skills,
making the student aware of past works
and the importance of accurate
observation.
For the more advanced student artist,
choice of subject, imagery, and medium
provide opportunities for individual
creativity and artistic growth.
PHOTOGRAPHY I
Photography I introduces students to the
fundamentals of photography and the
camera. It covers visual basics including
composition, layering, light, and the
decisive moment. Camera basics include
how to use a digital camera (off of auto-
mode) and how to use the exposure
triangle to achieve the best exposure.
Adobe Lightroom is the professional
software used for image management
and post-production.
Students in this course also learn about
content, story, and what makes a great
photograph. They are encouraged to
develop their own point of view, their own
vision, and to recognize what it is that
makes them and their way of seeing
unique. Numerous photography projects
are balanced with written assignments
and presentations. At the end of the year,
students create a final portfolio of their
best images.
QUEENS
```

===== PAGE 53 =====

```text
PHOTOGRAPHY II PHOTOGRAPHY III
Photography Il introduces students to the Photography Ill is for serious student
fundamentals of photography and the photographers who want to challenge
camera. It covers visual basics including themselves as they further their ability to
composition, layering, light, and the tell stories with images. They master the
decisive moment. Camera basics include intricacies of the digital SLR, take their
how to use a digital camera (off of auto- editing skills to the next level, and
mode) and how to use the exposure continue to craft their own photographic
triangle to achieve the best exposure.
style.
Adobe Lightroom is the professional
software used for image management
Students must be able to work
and post-production.
independently, create and execute their
Students in this course also learn about own project proposals, and make good
use of their class time to explore different
content, story, and what makes a great
photograph. They are encouraged to disciplines of photography and choose an
develop their own point of view, their own area of concentration. Students produce
vision, and to recognize what it is that and maintain their own websites to
makes them and their way of seeing showcase their work and finish the year
unique. Numerous photography projects with a final portfolio.
are balanced with written assignments
and presentations. At the end of the year, Prerequisites: Photography I and Il.
students create a final portfolio of their
best images.
Prerequisite: Completion of Photo 7 VISUAL ARTS
```

===== PAGE 54 =====

```text
PORTFOLIO STUDIO II
Portfolio provides an opportunity for Studio || Honors builds on the skills
upperclassmen to do more in-depth work introduced in Studio I and is designed for
with a medium or subject of their choice. students ready to pursue more advanced
In place of group lessons, students develop work.
an individualized project plan in understanding of both two and three-
conversation with the instructor and work dimensional processes while refining
throughout the year to complete it. technical skills, conceptual thinking, and
Past projects have ranged from purposeful design, experimentation, and
impressionist landscape painting to revision, encouraging students to move
abstract expressionist collage: the focus beyond
can be as flexible as the imagination of the intentional artistic decision-making.
student artist.
Working across traditional and digital
This class is commonly used as a stepping- media, students engage in longer-term
stone to AP Studio Art, but it may also projects that require planning, sustained
serve as a standalone class for students focus, and self-reflection. Regular critique
who want to develop a portfolio of original and written artist reflections support
works. students in analyzing their work and
articulating artistic intent. Studio Il Honors
STUDIO I serves as a key preparatory course for AP
Studio Art, while also offering a rigorous,
Studio I introduces students to the stand-alone experience for students
foundational concepts, skills, and seeking advanced studio practice.
processes across multiple disciplines
within the visual arts. Through hands-on
projects, students explore both two- and
three-dimensional artmaking, developing
their ability to translate ideas from initial
sketches into finished works. Emphasis is AP STUDIO ART
placed on observational drawing,
composition, line, value, form, color Students work under the direction of the
theory, and spatial thinking. instructor to develop a portfolio for
submission to the College Board
Students work with a wide range of Advanced Placement judges.
traditional and digital media, including
graphite, charcoal, paint, clay, and digital
illustration tools. Projects include hand- the course of the year, a series of artworks
built ceramic forms, two-dimensional representing a sustained investigation
drawings and paintings, and digitally into a common visual theme. Students
constructed illustrations that combine
image and text. Across all units, students document their own artistic growth while
are encouraged to experiment, refine working within a consistent visual thesis.
technique, and develop visual problem-
solving skills, providing a strong While work in this course is largely self-
foundation for more advanced study in directed, class time will include both
the visual arts. individual guidance and group critiques.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
Students deepen their
personal visual voice. Projects emphasize
skill acquisition toward
Prerequisites: Studio Art 1, Photo 1,
Ceramics, Drawing and Painting, or
Digital Illustration (grades 10-12)
Each student proposes, and develops over
are required to create works that
Prerequisite: departmental approval.
```

===== PAGE 55 =====

```text
MUSIC & PERFORMING ARTS
Music and performing arts courses marry
technique and continued development of
fundamental skills with an intense
exploration of creative expression as it
relates to the human experience.
Many music and performing arts courses
have a required performance component,
and rehearsals and performances for
those courses may be scheduled beyond
the academic day.
```

===== PAGE 56 =====

```text
PERFORMANCE ENSEMBLE
As members of a select company of actors,
students in Theatre Performance
Ensemble research, rehearse, and perform
thought-provoking, challenging theatre
while honing fundamental skills and
collaborating with other ensemble
members.
The course explores the ways in which
theatre inspires, educates, increases
awareness, and instigates social change.
Students encounter innovative playwrights
and theatre companies whose work has
impacted broader social, cultural, and
global collective consciousness.
The majority of class time will be spent in
rehearsal or working on specific pieces for
performance, with occasional after-school
rehearsal leading up to performance.
As advanced actors, Performance
Ensemble students will also participate in
Davidson Day Theatre productions, the
Improv Comedy show, the Musical Review,
and/or collaborations with local theatre
companies.
New students (not previously enrolled)
interested in being considered for
Performance Ensemble must audition.
CONTEMPORARY ENSEMBLE
Contemporary Ensemble is Davidson Day
School's very own "School of Rock"! These
ensembles allow students to learn and
perform contemporary music, primarily in
the pop and rock style, with a dash of jazz,
blues, and funk.
Contemporary Ensemble is open to
students at any level, from those with a
great deal of experience and musical
background to those who are just
beginning. Repertoire and individual parts
are adjusted to the level of each student,
with an emphasis on providing a challenge
that is still within reach.
All instruments and vocalists are welcome;
no audition required. Students are allowed
and encouraged to explore instruments
other than their primary instrument.
They are required to perform publicly with
the ensemble at least once per quarter
during scheduled performances.
Required: Guitars, electric bass,
keyboards, and drums are available in the
classroom, but students are required to
have an instrument at home on which to
practice.
```

===== PAGE 57 =====

```text
MODERN MUSIC
A blend of history, musicology, popular
culture, and the arts, Modern Music
focuses on the musical artists, songs, and
styles of the last hundred years in genres
including but not limited to rock, pop.
R&B, jazz, country, blues, funk, soul,
folk/bluegrass, and classical.
Students can expect listening exams as
well as presentations and projects. Making
use of digital technology, they will create
music using loops, samples, and
computer-generated sounds. Projects
include creating an original song using the
recording software GarageBand
Students will also create a new soundtrack
of sequence music and audio effects for a
chase sequence from a popular movie.
There is no performance requirement for
this course.
FILM STUDIES & PRODUCTION
This course teaches students how to
appreciate the art form of motion pictures.
Course topics include the history of film;
film genres; the elements of a film; film's
power as a communication medium, its
potential cultural and historical impact;
and how to critically view and understand
a film.
Students will watch a number of films,
from The Godfather to Memento, and they
can expect to write essays on several of
them. In addition to learning how to "read"
a film, students will begin to learn the
process of digital film creation and editing.
Students also learn about the concepts of
digital video editing and gain an
understanding of entry-level digital editing
software.
There is no performance requirement for
this course.
```

===== PAGE 58 =====

```text
vineyard viges
41.
TECHNOLOGY &
COMPUTER SCIENCE
```

===== PAGE 59 =====

```text
Technology and computer
science classes teach design,
logical reasoning, and
computational problem
solving skills.
Beyond computer literacy,
these courses introduce
students to the possibility of
creating and adapting new
technologies, helping
students learn to become
technology innovators.
TECHNOLOGY
&
COMPUTER
SCIENCE
THE
```

===== PAGE 60 =====

```text
INTRODUCTION TO
COMPUTER CODING
Introduction to Computer Coding provides
students with a foundational introduction
to computer programming using the
Python language. Designed for students
with little or no prior coding experience,
the course introduces core programming
concepts such as variables, conditionals,
loops, functions, and basic data structures,
while developing computational thinking
and problem-solving skills.
This course is offered as an independent
study, with students working through
structured lessons and coding exercises at
an individualized pace. A faculty mentor
monitors progress, provides feedback, and
supports students as they apply
programming concepts to increasingly
complex tasks.
AP COMPUTER SCIENCE PRINCIPLES
AP Computer Science Principles
introduces students to the foundational
ideas of computer science with an
emphasis on creativity, problem-solving,
and the real-world impact of computing.
Students explore key topics including
computational thinking, algorithms, data
and information, the internet, and the
ethical and societal implications of
technology. Programming is used as a tool
for exploring and expressing these
concepts through structured coding tasks
and projects.
This course is offered as an independent
study, with students progressing through
College Board-aligned units at an
individualized pace. A faculty mentor
monitors progress, provides feedback, and
supports students in preparing for AP
assessments, including performance tasks
and the end-of-course exam.
AP Computer Science Principles is
designed for students with varying levels of
prior experience and serves as a strong
foundation for further study in computer
science, including AP Computer Science A
and advanced STEM coursework.
Departmental Permission and
completion of Algebra / (grades 9-12)
AP COMPUTER SCIENCE A
AP Computer Science A is a college-level
course focused on object-oriented
programming and algorithmic problem-
solving using the Java programming
language. Students study core computer
science concepts including classes and
objects, control structures, methods, arrays
and array lists, recursion, and program
design. Emphasis is placed on writing
clear, efficient code and developing logical
strategies to solve complex problems.
This course is offered as an independent
study, with students progressing through
College Board-aligned content at an
individualized pace. A faculty mentor
monitors progress, provides feedback, and
supports students in preparing for AP-style
programming questions and the end-of-
course exam. AP Computer Science A is
designed for students with prior coding
experience and builds upon foundational
coursework such as Introduction to
Computer Coding or AP Computer
Science Principles, preparing students for
advanced study in computer science and
related STEM fields.
Prerequisites: Departmental permission.
Experience with computer science or co-
enrollment with at least Honors Algebra /I
recommended.
```

===== PAGE 61 =====

```text
PHYSICAL EDUCATION
With the overall goal of student wellness,
all students at Davidson Day are required
to participate in interscholastic sports
and/or physical education while in Upper
School.
One credit of physical education is
required to graduate. A student may
request physical education credit for
participating in varsity athletics, theatre, or
another approved outside activity.
```

===== PAGE 62 =====

```text
WEIGHT TRAINING
Students in Weight Training acquire the
practical knowledge needed to improve
strength and overall fitness by engaging
in supervised muscular, cardiovascular,
agility, and endurance exercises. They
learn the importance of setting goals for
personal improvement and of
maintaining a lifestyle of physical fitness
that will enhance overall health. Safety is
always the first priority: all students are
provided with the necessary training on
each exercise so that their growth can be
safe and productive.
INTRO TO SPORTS MEDICINE
In this course, students will learn the
fundamentals of sports medicine as well
as exploring the various careers that are
associated with sports medicine. The class
will be divided into two separate
semesters, the first focusing on the
anatomy, physiology, and injuries
common in the upper body, with the
second semester focusing on the same
topics of the lower body. The coursework
will also cover injury evaluations, taping,
and musculoskeletal injuries related to
the focused body areas. The end goal of
this course is for students to be able to
evaluate an injury, treat it, and determine
what the long term outcome and
prognosis will be. The first semester of
the course will cover lower body while the
second semester will cover upper body.
This course relies heavily on hands-on
learning, and assessments include both
practical and traditional written tests.
Students enrolled in this course also have
the opportunity to work athletic events as
student athletic trainers.
rat
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
```

===== PAGE 63 =====

```text
ELECTIVES
FINANCIAL LITERACY HONORS
Financial Literacy introduces students to
the foundational concepts and skills they
will build upon in the AP Business with
Personal Finance course. Students explore
how businesses operate and compete
within markets, with particular attention
to financial markets such as stocks,
mutual funds, and a broader
understanding of equities markets.
Additionally, students will participate in
Wharton's Global High School Investment
Competition. The course also provides an
overview of marketing principles,
management structures, and strategic
decision-making within organizations.
In addition, students develop practical
personal finance skills, including
budgeting, saving, and understanding
basic financial statements and
accounting concepts. Through
discussions, case studies, and applied
activities, students strengthen their ability
to analyze financial choices, evaluate risk
and opportunity, and make informed
economic decisions in both personal and
business contexts.
AP BUSINESS W/ PERSONAL FINANCE
AP Business provides students with a
comprehensive introduction to business
orinciples and personal finance while
emphasizing analytical thinking, problem-
solving, and real-world application. The
course explores key topics including
market structures and competition,
financial markets such as stocks, bonds,
and equity markets, marketing, business
finance and accounting, management
strategies, and personal financial
planning.
Students develop advanced skills through
case studies, research projects, and
applied simulations, learning to analyze
business decisions, evaluate risk, and
propose evidence-based solutions. In
addition, students practice AP-style
writing and problem-solving, preparing
them for the expectations of College
Board assessments and for continued
study in economics, finance, and business
at the upper school level.
Prerequisites: Departmental Permission,
completion of Algebra Il, Financial
Literacy, or Social Entrepreneurship
encouraged (grades 11-12)
HONORS SOCIAL ENTREPRENEURSHIP
Social Entrepreneurship explores how
business principles can be applied to
address social, environmental, and
community challenges. Students study
the foundations of entrepreneurship with
particular emphasis on nonprofit
organizations, social enterprises, and
mission-driven business models. Core
topics include identifying community
needs, designing sustainable solutions,
fundraising and resource development,
marketing for impact, and measuring
social outcomes.
Through project-based learning and
guided community engagement,
students connect classroom study with
real-world service experiences. Students
collaborate with local organizations,
develop and implement service initiatives,
and reflect on the ethical responsibilities
of socially conscious leaders. While not a
prerequisite, Social Entrepreneurship is
designed to complement and support the
skills and experiences emphasized in AP
with WE Service, preparing students to
engage thoughtfully and effectively in
service-oriented leadership.
```

===== PAGE 64 =====

```text
AP WITH WE SERVICE
AP with WE Service combines college-
level academic study with sustained,
field-based service learning in partnership
with local nonprofit organizations.
Students engage deeply with issues
affecting their community, applying
research, analysis, and problem-solving
skills to real-world challenges. The course
integrates rigorous academic content
with hands-on service experiences,
emphasizing leadership, collaboration,
and measurable impact.
The course focuses on ongoing field work
with local nonprofits. Students work
directly with community partners to
assess needs, develop and implement
service initiatives, and evaluate outcomes.
Structured reflection, research, and
written analysis connect these
experiences to broader social, economic,
and civic themes. Students develop the
knowledge, empathy, and practical skills
necessary for thoughtful civic
engagement and socially responsible
leadership.
Prerequisites: Departmental Permission,
co-enrollment in at least one Advanced
Placement course (grades 71-12)
Drop D
8.15-9:10 A
1:13-10:03 B
10:06 - 10:56 C
10:59 - 11:49 E
11: Sa - 12:15 Mtg| Adv| Clubs
12: 16-12:40 Lunch
12:44-1:34 F
1:37-2:27 G
2:30 - 3:20 H
1- Nicholas
IBL
MIDDLE SCHOOL TA (Teacher's
Assistant)
The Middle School TA (Teacher's Assistant)
program provides upper school students
with the opportunity to serve as
instructional partners in middle school
classrooms. Students are paired with a
middle school teacher in a subject area of
interest and assist with daily classroom
activities, such as facilitating small group
instruction, supporting individual
students, and helping prepare materials
and learning tasks.
In addition to classroom support, students
participate in monthly "lunch and learn"
seminars focused on pedagogy-the study
of how teaching and learning occur-
where they explore instructional
strategies, classroom management, lesson
design, and student development.
Throughout the year, Teaching Assistants
design and lead brief mini-lessons under
faculty supervision, gaining firsthand
experience in planning and delivering
instruction. This course is particularly well
suited for students interested in
education, leadership, or working with
young people. Participants must
demonstrate maturity, self-control, and a
consistent ability to model the school's
core values, serving as positive role
models within the middle school
community.
Prerequisites: Application (Grades 70-12)
ELECTIVES
```

===== PAGE 65 =====

```text
ONLINE AND INDEPENDENT STUDY
ONLINE COURSES
In rare cases, a student may supplement Davidson Day's curricular offerings with an
online class. Davidson Day School, as a member of the North Carolina Association of
Independent Schools, partners with Fuel Education (www.fueleducation.com) to
provide accredited online options when alternative or additional coursework is
deemed necessary.
Online coursework is treated as a transfer credit and is not factored into the
student's Davidson Day School GPA. There may be an additional fee for enrolling in
an online course.
OTHER COURSES
Other courses offered by NCAIS-accredited schools must be reviewed and approved
by the appropriate department head to ensure that they align with the Davidson
Day School curriculum before credit is awarded.
In addition, a minimum final grade of 80 percent must be earned to receive credit.
The School reserves the right to administer an additional proficiency exam before
credit is awarded.
INDEPENDENT STUDY
Davidson Day School offers a wide variety of curricular options, including electives in
each academic department. At times, however, a student may have a sincere
passion for a subject not offered by the school, or may wish to explore in more
depth some facet of a subject first encountered in a regular class.
Students in good academic standing may apply for an Independent Study in the
spring of the preceding year. In order to have an Independent Study approved, a
student must choose a faculty supervisor and design a course of study.
The student must then submit an abstract and full syllabus for the proposed study,
including a list of materials and possible assessments, to the Director of
Independent Studies and the Curriculum Committee for approval.
Students in Independent Study courses check in regularly with their faculty
supervisors while working independently through the course material. The final
grade, awarded on a Pass/Fail basis, reflects the student's satisfactory or
unsatisfactory completion of the course of study described in the Independent
Study proposal.
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
```

===== PAGE 66 =====

```text
INTERNATIONAL RESEARCH:
A FAR
```

===== PAGE 67 =====

```text
BELIZE ~ SPAIN ~ PORTUGAL
The AFAR Program at Davidson Day, offers students the opportunity to participate in accredited,
expert-led archaeological fieldwork projects abroad. Through immersive, hands-on research
experiences, students develop critical skills in analysis, problem-solving, collaboration, and cross-
cultural communication. While rooted in archaeology, the program provides broad academic
and personal value, making it highly beneficial for students interested in fields such as history,
science, international studies, and beyond.
At the Maya site of Cahal Pech in Belize, students participate in active excavations, part of a
project that has been ongoing for over twenty years-that contribute to continuing research into
ancient Maya political and cultural life.
In Spain, students work at the medieval castle of Zorita de los Canes, uncovering remains tied to
the Order of Calatrava and the dynamics of medieval warfare and religion. The experience
integrates excavation with historical analysis, helping students reconstruct how the fortress
functioned within its broader sociopolitical landscape.
At the Roman site of Tróia in Portugal, students investigate the remains of a major fish-
processing complex that once supported extensive trade across the Roman Empire. This project
emphasizes industrial archaeology and economic systems, offering insight into everyday life and
large-scale production in the ancient world.
```

===== PAGE 68 =====

```text
COLLEGE COUNSELING
The growth and development of each Davidson Day School student culminates in the college
search process. The goal of the College Counseling Office is to guide and empower students so
they are prepared to identify colleges that are the best fit for their interests, strengths, and goals,
and to move confidently into the next phase of their educational journey.
College counselors assist students and families in all aspects of the college planning process,
including researching colleges, building a balanced college list, planning for standardized testing,
developing application essays, navigating the financial aid process, exploring interests, and
evaluating final college choices. In addition to extensive one-on-one counseling, the office
provides a structured program throughout high school that helps students better understand
themselves and the college admission process. Programs include College Nights for each grade
level, campus visit opportunities for sophomores and juniors, College Counseling seminars for all
grade levels, a Summer Application Boot Camp and Fall Application Workshop for seniors, and
the annual Case Studies program, where students and families observe a mock admission
committee to better understand how colleges build a class.
Our college counselors maintain strong professional relationships with admission counselors
throughout the country. They present at national conferences, are active in professional
admissions organizations, and regularly visit college campuses to stay informed about
institutional culture, curriculum, and admission policies. Each fall, Davidson Day hosts a wide
range of admissions representatives on campus to meet directly with students, and the College
Counseling Office leads an Admissions Experts Advisory Board composed of current college
admission professionals who provide ongoing insight into evolving admission practices and
trends. These relationships help ensure that our students receive accurate, current, and
thoughtful guidance throughout the college search process.
Freshman Sophomore Junior Senior
Year Year Year Year
• Focus on transition to • Maximize curriculum by taking • Map out a personal • Attend summer and fall
Upper School and earn good classes that challenge, but do standardized testing plan that application workshops.
grades. not aaruhelm includes: the PSAT/NMSQT in • Complete Senior Meetings in
• Begin to develop • Focus on earning good grades. October and the ACT in October the fall.
personal relationships with Upper • Take the PSAT in October. during the school day. • Attend Senior College Night in
School faculty. • Visit two colleges on class trips. • Attend college representative September.
• Meet with College • Take on responsibility and visits for all colleges that are on • Attend Financial Aid Night in
Counseling Office in group leadership roles in your radar. the fall.
settings during advisory. extracurricular activities. • Visit 4-5 colleges on class trips. • Take the ACT in October during
• Take the PSAT in • Attend college representative • Attend Junior College Night in the school day.
October. visits. the second quarter. • Attend college representative
• Maximize * Attend the Charlotte National • Complete at least two individual visits for all colleges on your list.
extracurricular opportunities by College Fair in the spring Junior Meetings and one Family • Focus on standardized testing
trying new clubs, sports, and • Plan an enrirching summer Meeting with your college in the fall.
autivities experience Colincol • Attend weekly College
• Attend college • Attend College Night in the • Attend weekly College Counseling seminars in the fall
representative visits that coincide spring. Counseling seminars in the focused on successfully
with a study hall. spring focused on all aspects of completing the application
• Attend College Night the college search. process.
in the spring. • Prepare and write college • Submit admission and
essays in Composition. scholarship applications.
• Plan an enriching summer
experience.
```

===== PAGE 69 =====

```text
GPA CALCULATOR
Grading Scale: Grade Range Numeric Value
A 93-100 4.00
A- 90-92 3.67
B+ 87-89 3.33
B 83-86 3.00
B- 80-82 2.67
77-79 2.33
C+
C 73-76 2.00
C- 70-72 1.67
D+ 67-69 1.33
D 63-60 1.00
D- 60-62 0.67
Below 60 0.00
Honors courses are weighted 0.5 quality point and AP courses are
weighted 1.0 quality point. Independent Study classes are not
factored into the GPA; they are graded as either Pass (P) or Fail (F).
DAILY SCHEDULE
Upper School
1 2 3 4 5 6 7 8 Assembly Schedule
8:00-8:15 8:00-8:15
8:15-9:10 C D A B A D 8:15-9:03
9:13-10:03 E B B D A 9:06-9:53
10:06-10:56 D E A D C B 9:56-10:43
10:59-11:49 D E D A B 10:46-11:33
11:52-12:15 Meeting/Advisory 11:36-12:21
12:16-12:40 Lunch 12:24-12:49
12:44-1:34 F H G F H G F E 12:52-1:40
1:37-2:27 G F G F H E F 1:43-2:30
2:30-3:20 H G F H G E H G 2:33-3:20
DROP
D E F G H
Upper school students drop one class per day.
```

===== PAGE 70 =====

```text
UPPER SCHOOL COURSE OFFERINGS
BY YEAR
Upper School Course Offerings 2026-2027
10*h 12"
English Il A Enget language
English English Il Honors
Algebra! Geomet Algebra lI precaus
Alerometros eometry Hono Algebra Il/Trig. Hon
Algebra II Precalculus Iculus Hono
Geometry Honors Algebra Il/Trig. Hon Calculus Honors AP Calculus AB
Math Algebra Il/Trig. Honors
AP Precalculus AP Precalculus AP Calculus BC
AP Calculus AB AP Statistics
AP Calculus BC Calculus III (Post-AP)*
AP Statistics
**Student achievement, not grade level, determines progress through the math curriculum
Conceptual Physics Chemistry Biology AP Biology
Physics Honors Chemistry Honors Biology Honors AP Chemistry
AP Physics I
Science AP Physics II
AP Environmental Science
Anatomy & physiology
Honors
These diesses may diso be taken as academie
**Student achievement, not grade level, determines progress through the science curriculum
Civics World History Honors U.S. History Honors AP European History
CivicsHonors AP World Hist: Mod AP U.S. History AP Psychology
AP Microeconomics
History AP World Hist: Modern
AP US Government & Politics
Anthropology Honors
These desses may diso be taken as academic
electives prior to senior yeur.
World French I, II, III(H), IV(H), V(H), AP French
Language Spanish I, II, II(H), IV(H), V(H), AP Spanish
Studio Art I,II
Digital Photography I, II, III
Modern Music
Perf/Visual Film Studies & Production
Contemporary Ensemble
Arts Performance Ensemble
Portfolio
AP Studio Art
Creative Writing Honors
Intro to yearbook
Yearbook Honors
AP with WE Service
Academic AP Business
Electives Financial Literacy Hon
Social Entrepreneurship
Intro to Comp Science
AP Comp Sci Principles
AP Comp Sci A
PE Weight Training, Intro to Sports Medicine
```

===== PAGE 71 =====

```text
SCHOOL
```

