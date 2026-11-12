var e=`davidson-day`,t=`course-offerings`,n=34,r=[{subtopic:`Curriculum Guide Full Descriptions 2026-2027`,source_file:`Davidson Day - Course Offerings - Curriculum Guide Full Descriptions 2026-2027.md`,preview:"# Davidson Day School — Course Offerings — Curriculum Guide Full Descriptions 2026-2027 - Date fetched: 2026-11-11 - Why: the earlier record (`Davidson Day - Course Offerings - Curriculum Guide.md`) holds the app's own condensed descriptions word for word for 60% of courses, so it cannot catch a description that…",text:`# Davidson Day School — Course Offerings — Curriculum Guide Full Descriptions 2026-2027

- **Date fetched:** 2026-11-11
- **Why:** the earlier record (\`Davidson Day - Course Offerings - Curriculum Guide.md\`) holds the
 app's own condensed descriptions word for word for 60% of courses, so it cannot catch a
 description that drifted from the catalog. This file holds the school's own text, for the
 description-to-catalog census.
- **Upper School method (the earlier record's path):** Issuu serves no text, so all 71 page images
 of the 2026-2027 Upper School Course Catalog were downloaded from
 \`https://image.isu.pub/260402123341-cdbc20014618b50dcafae1b78b43224f/jpg/page_N.jpg\`
 (N = 1–71, 2312 × 2992 px; page 72 returns HTTP 403) and OCR'd with the macOS Vision framework
 (\`VNRecognizeTextRequest\`, accurate level, language correction on). Two-column pages are read
 left column, then right column; text fragments on one baseline are joined left to right.
 - SHA-256 over the 71 page-image hashes, in page order: \`da2da90950e650867e36dd412b8debe2ebd5d575fb672b045c98e0438dca3939\`
 - Page 1 image SHA-256: \`94fd3e34ba2dd1f1807dbb3433e68ff61fbb1e1fb42a61a74f8d38d77d5ae2ed\`
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
- **Catalog year:** the app was built from this same 2026-2027 catalog (record, 2026-07-26).`},{subtopic:`Source URLs`,source_file:null,preview:`| Ref | URL | What it covers | | --- | --- | --- | | S1 | https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog | 2026-2027 Upper School Course Catalog (71 pp.), every Upper School course entry; p. 28 math progression from 5th grade | | S1i |…`,text:`| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog | 2026-2027 Upper School Course Catalog (71 pp.), every Upper School course entry; p. 28 math progression from 5th grade |
| S1i | https://image.isu.pub/260402123341-cdbc20014618b50dcafae1b78b43224f/jpg/page_N.jpg | The catalog's page images (N = 1–71), the text source for S1 |
| S4 | https://www.davidsonday.org/academics/upper-school | Upper School page |
| S5 | https://www.davidsonday.org/academics/middle-school | Middle School page |
| S6 | https://www.davidsonday.org/academics/lower-school | Lower School page |
| S7 | https://www.davidsonday.org/academics/early-childhood | Early Childhood page |
| S8 | https://www.davidsonday.org/academics/academics-at-davidson-day | Academics overview |
| S9 | https://www.davidsonday.org/academics/diploma-distinctions | Diploma Distinctions hub |
| S10 | https://www.davidsonday.org/academics/diploma-distinctions/global-studies | Global Studies Diploma page |`},{subtopic:`Index — every app course, in app order`,source_file:null,preview:"Where each app row's own text sits below. Upper School rows point to the catalog page (`===== PAGE N =====` below; found by title search on the OCR text, so confirm it). Middle and Lower School rows point to the sections that hold their text. | App path | Division | Department | Title | Where | | --- | --- | --- | ---…",text:"Where each app row's own text sits below. Upper School rows point to the catalog page (`===== PAGE N =====` below; found by title search on the OCR text, so confirm it). Middle and Lower School rows point to the sections that hold their text.\n\n| App path | Division | Department | Title | Where |\n| --- | --- | --- | --- | --- |\n| `divisions[0].departments[0].courses[0]` | Lower School Courses | What is published | Early Childhood Program | Lower School page (S6) / Early Childhood page (S7) |\n| `divisions[0].departments[0].courses[1]` | Lower School Courses | What is published | Specials | Lower School page (S6) / Early Childhood page (S7) |\n| `divisions[1].departments[0].courses[0]` | Middle School Courses | Mathematics | 5th Grade Math | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[1]` | Middle School Courses | Mathematics | Accelerated Math 1 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[2]` | Middle School Courses | Mathematics | Math 1 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[3]` | Middle School Courses | Mathematics | Accelerated Math 2 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[4]` | Middle School Courses | Mathematics | Accelerated Math 2/3 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[5]` | Middle School Courses | Mathematics | Math 2 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[6]` | Middle School Courses | Mathematics | Accelerated Math 3 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[7]` | Middle School Courses | Mathematics | Math 3 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[8]` | Middle School Courses | Mathematics | Honors Algebra 1 | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[0].courses[9]` | Middle School Courses | Mathematics | Honors Geometry | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[1].courses[0]` | Middle School Courses | Other published detail | Study Skills | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[1].courses[1]` | Middle School Courses | Other published detail | Upper School course access | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[1].departments[1].courses[2]` | Middle School Courses | Other published detail | AFAR International Research | catalog p. 28 (chart, hand transcription) / Middle School page (S5) |\n| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | English I | catalog p. 21, 22, 23, 24 |\n| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | English I Honors | catalog p. 21, 22 |\n| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | English II | catalog p. 22, 23, 24 |\n| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | English II Honors | catalog p. 22 |\n| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | English III Honors | catalog p. 23, 24 |\n| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | English IV Honors | catalog p. 23 |\n| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | AP English Language and Composition | catalog p. 24 |\n| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | AP English Literature and Composition | catalog p. 24 |\n| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Creative Writing Honors | catalog p. 23, 70 |\n| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Introduction to Yearbook | catalog p. 25 |\n| `divisions[2].departments[0].courses[10]` | Upper School Courses | English | Yearbook Honors | catalog p. 25, 70 |\n| `divisions[2].departments[1].courses[0]` | Upper School Courses | Mathematics | Algebra I | catalog p. 27, 29, 30, 41 |\n| `divisions[2].departments[1].courses[1]` | Upper School Courses | Mathematics | Algebra I Honors | not found by title search |\n| `divisions[2].departments[1].courses[2]` | Upper School Courses | Mathematics | Geometry | catalog p. 12, 28, 29, 30 |\n| `divisions[2].departments[1].courses[3]` | Upper School Courses | Mathematics | Geometry Honors | catalog p. 28, 29, 70 |\n| `divisions[2].departments[1].courses[4]` | Upper School Courses | Mathematics | Algebra II | catalog p. 29, 70 |\n| `divisions[2].departments[1].courses[5]` | Upper School Courses | Mathematics | Algebra II/Trigonometry Honors | catalog p. 29 |\n| `divisions[2].departments[1].courses[6]` | Upper School Courses | Mathematics | Precalculus | catalog p. 28, 30, 31, 70 |\n| `divisions[2].departments[1].courses[7]` | Upper School Courses | Mathematics | AP Precalculus | catalog p. 28, 30, 31, 70 |\n| `divisions[2].departments[1].courses[8]` | Upper School Courses | Mathematics | Honors Calculus | catalog p. 28, 30 |\n| `divisions[2].departments[1].courses[9]` | Upper School Courses | Mathematics | AP Calculus AB | catalog p. 17, 31, 70 |\n| `divisions[2].departments[1].courses[10]` | Upper School Courses | Mathematics | AP Calculus BC | catalog p. 31, 70 |\n| `divisions[2].departments[1].courses[11]` | Upper School Courses | Mathematics | Calculus III Honors: Multivariable Calculus and Linear Algebra | not found by title search |\n| `divisions[2].departments[1].courses[12]` | Upper School Courses | Mathematics | AP Statistics | catalog p. 17, 19, 29, 70 |\n| `divisions[2].departments[2].courses[0]` | Upper School Courses | History & Social Sciences | Civics and Deliberative Democracy | catalog p. 33, 34 |\n| `divisions[2].departments[2].courses[1]` | Upper School Courses | History & Social Sciences | Civics Honors | catalog p. 34, 35 |\n| `divisions[2].departments[2].courses[2]` | Upper School Courses | History & Social Sciences | World History Honors | catalog p. 70 |\n| `divisions[2].departments[2].courses[3]` | Upper School Courses | History & Social Sciences | AP World History (Modern) | catalog p. 15, 34, 35 |\n| `divisions[2].departments[2].courses[4]` | Upper School Courses | History & Social Sciences | U.S. History Honors | catalog p. 35, 70 |\n| `divisions[2].departments[2].courses[5]` | Upper School Courses | History & Social Sciences | AP U.S. History | catalog p. 36, 70 |\n| `divisions[2].departments[2].courses[6]` | Upper School Courses | History & Social Sciences | AP European History | catalog p. 15, 37, 70 |\n| `divisions[2].departments[2].courses[7]` | Upper School Courses | History & Social Sciences | AP Microeconomics | catalog p. 19, 36, 70 |\n| `divisions[2].departments[2].courses[8]` | Upper School Courses | History & Social Sciences | AP Macroeconomics | catalog p. 15, 19 |\n| `divisions[2].departments[2].courses[9]` | Upper School Courses | History & Social Sciences | AP Psychology | catalog p. 15, 17, 37, 70 |\n| `divisions[2].departments[2].courses[10]` | Upper School Courses | History & Social Sciences | AP U.S. Government and Politics | not found by title search |\n| `divisions[2].departments[2].courses[11]` | Upper School Courses | History & Social Sciences | Anthropology Honors | catalog p. 34, 70 |\n| `divisions[2].departments[3].courses[0]` | Upper School Courses | Science | Conceptual Physics | catalog p. 39, 70 |\n| `divisions[2].departments[3].courses[1]` | Upper School Courses | Science | Physics Honors | catalog p. 39, 40, 42, 70 |\n| `divisions[2].departments[3].courses[2]` | Upper School Courses | Science | AP Physics 1 | catalog p. 40 |\n| `divisions[2].departments[3].courses[3]` | Upper School Courses | Science | AP Physics 2 | catalog p. 40 |\n| `divisions[2].departments[3].courses[4]` | Upper School Courses | Science | Chemistry | catalog p. 17, 39, 41, 42 |\n| `divisions[2].departments[3].courses[5]` | Upper School Courses | Science | Chemistry Honors | catalog p. 41, 70 |\n| `divisions[2].departments[3].courses[6]` | Upper School Courses | Science | AP Chemistry | catalog p. 17, 41, 70 |\n| `divisions[2].departments[3].courses[7]` | Upper School Courses | Science | Biology | catalog p. 17, 39, 42, 43 |\n| `divisions[2].departments[3].courses[8]` | Upper School Courses | Science | Biology Honors | catalog p. 42, 43, 70 |\n| `divisions[2].departments[3].courses[9]` | Upper School Courses | Science | AP Biology | catalog p. 17, 42, 70 |\n| `divisions[2].departments[3].courses[10]` | Upper School Courses | Science | AP Environmental Science | catalog p. 15, 42, 70 |\n| `divisions[2].departments[3].courses[11]` | Upper School Courses | Science | Human Anatomy and Physiology Honors | catalog p. 43 |\n| `divisions[2].departments[4].courses[0]` | Upper School Courses | World Languages | French I | catalog p. 45, 46, 70 |\n| `divisions[2].departments[4].courses[1]` | Upper School Courses | World Languages | French II | catalog p. 45 |\n| `divisions[2].departments[4].courses[2]` | Upper School Courses | World Languages | French III Honors | catalog p. 45 |\n| `divisions[2].departments[4].courses[3]` | Upper School Courses | World Languages | French IV Honors | catalog p. 46 |\n| `divisions[2].departments[4].courses[4]` | Upper School Courses | World Languages | French V Honors | catalog p. 46 |\n| `divisions[2].departments[4].courses[5]` | Upper School Courses | World Languages | AP French Language and Culture | catalog p. 15, 46 |\n| `divisions[2].departments[4].courses[6]` | Upper School Courses | World Languages | Spanish I | catalog p. 47, 48, 49, 70 |\n| `divisions[2].departments[4].courses[7]` | Upper School Courses | World Languages | Spanish II | catalog p. 47, 48 |\n| `divisions[2].departments[4].courses[8]` | Upper School Courses | World Languages | Spanish III Honors | catalog p. 48 |\n| `divisions[2].departments[4].courses[9]` | Upper School Courses | World Languages | Spanish IV Honors | catalog p. 48, 49 |\n| `divisions[2].departments[4].courses[10]` | Upper School Courses | World Languages | Spanish V Honors: Cultural Topics | not found by title search |\n| `divisions[2].departments[4].courses[11]` | Upper School Courses | World Languages | AP Spanish Language and Culture | catalog p. 15, 49 |\n| `divisions[2].departments[4].courses[12]` | Upper School Courses | World Languages | AP Spanish Literature and Culture | not found by title search |\n| `divisions[2].departments[5].courses[0]` | Upper School Courses | Participation in the Arts | Photography I | catalog p. 52, 53, 70 |\n| `divisions[2].departments[5].courses[1]` | Upper School Courses | Participation in the Arts | Photography II | catalog p. 53 |\n| `divisions[2].departments[5].courses[2]` | Upper School Courses | Participation in the Arts | Photography III | catalog p. 53 |\n| `divisions[2].departments[5].courses[3]` | Upper School Courses | Participation in the Arts | Studio I | catalog p. 54 |\n| `divisions[2].departments[5].courses[4]` | Upper School Courses | Participation in the Arts | Studio II Honors | not found by title search |\n| `divisions[2].departments[5].courses[5]` | Upper School Courses | Participation in the Arts | Portfolio | catalog p. 23, 52, 53, 54 |\n| `divisions[2].departments[5].courses[6]` | Upper School Courses | Participation in the Arts | AP Studio Art | catalog p. 54, 70 |\n| `divisions[2].departments[5].courses[7]` | Upper School Courses | Participation in the Arts | Performance Ensemble | catalog p. 56, 70 |\n| `divisions[2].departments[5].courses[8]` | Upper School Courses | Participation in the Arts | Contemporary Ensemble | catalog p. 56, 70 |\n| `divisions[2].departments[5].courses[9]` | Upper School Courses | Participation in the Arts | Modern Music | catalog p. 57, 70 |\n| `divisions[2].departments[5].courses[10]` | Upper School Courses | Participation in the Arts | Film Studies & Production | catalog p. 57, 70 |\n| `divisions[2].departments[6].courses[0]` | Upper School Courses | Technology & Computer Science | Introduction to Computer Coding | catalog p. 60 |\n| `divisions[2].departments[6].courses[1]` | Upper School Courses | Technology & Computer Science | AP Computer Science Principles | catalog p. 60 |\n| `divisions[2].departments[6].courses[2]` | Upper School Courses | Technology & Computer Science | AP Computer Science A | catalog p. 17, 60 |\n| `divisions[2].departments[7].courses[0]` | Upper School Courses | Physical Education | Weight Training | catalog p. 62, 70 |\n| `divisions[2].departments[7].courses[1]` | Upper School Courses | Physical Education | Intro to Sports Medicine | catalog p. 62, 70 |\n| `divisions[2].departments[8].courses[0]` | Upper School Courses | Electives & Distinctions | Financial Literacy Honors | catalog p. 63 |\n| `divisions[2].departments[8].courses[1]` | Upper School Courses | Electives & Distinctions | AP Business w/ Personal Finance | catalog p. 63 |\n| `divisions[2].departments[8].courses[2]` | Upper School Courses | Electives & Distinctions | Honors Social Entrepreneurship | catalog p. 63 |\n| `divisions[2].departments[8].courses[3]` | Upper School Courses | Electives & Distinctions | AP with WE Service | catalog p. 15, 19, 63, 64 |\n| `divisions[2].departments[8].courses[4]` | Upper School Courses | Electives & Distinctions | Middle School TA | catalog p. 64 |\n| `divisions[2].departments[8].courses[5]` | Upper School Courses | Electives & Distinctions | Research Methods Honors | catalog p. 15, 17, 19 |\n| `divisions[2].departments[8].courses[6]` | Upper School Courses | Electives & Distinctions | Capstone Research Honors | catalog p. 15, 17, 19 |\n| `divisions[2].departments[8].courses[7]` | Upper School Courses | Electives & Distinctions | Forensics & Zoology Honors | catalog p. 17 |\n| `divisions[2].departments[8].courses[8]` | Upper School Courses | Electives & Distinctions | Independent Study | catalog p. 60, 65, 69 |"},{subtopic:`Content Knowledge and Character Development`,source_file:null,preview:`At Davidson Day, we understand that Middle School is among the most formative years of a student’s life. That’s why our program is designed to support both academic growth and personal development, helping students become confident learners and compassionate individuals. Character matters just as much as what you…`,text:`At Davidson Day, we understand that Middle School is among the most formative years of a student’s life. That’s why our program is designed to support both academic growth and personal development, helping students become confident learners and compassionate individuals.

Character matters just as much as what you know.

Service-Learning Program

In Davidson Day's Middle School, we know that character matters just as much as what you know. Every Middle School student takes part in our hands-on service-learning program, partnering with local organizations and making a real impact in the community. They don’t just learn about service—they live it.

Access to High School Courses

Davidson Day Middle School students are not limited to just traditional Middle School courses. Students ready to learn at the next level have the ability to learn and challenge themselves alongside Upper School students by taking world language and mathematics classes in our Upper School.

Study Skills Classes

At Davidson Day, every Middle School student takes a study skills course each year—four years of building the tools for success. These classes go beyond organization; they help students understand how they learn, take ownership of their growth and develop the independence and confidence needed to thrive in Upper School and beyond.

House System

At the beginning of their Middle School tenure, each Davidson Day Middle School student is sorted into a “house.” Throughout the year, houses compete for the coveted House Cup, earning points through acts of character and friendly competitions. Our house system is a proud Davidson Day Middle School tradition and encourages team building, school spirit, unity and fun.`},{subtopic:`Assistant Head of Middle School`,source_file:null,preview:`### Jeff Haddock <> The Arts The arts take Davidson Day students beyond the bounds of a screenplay, a canvas, a screen, or the stage, and we immerse all students in our arts curriculum. Patriot Athletics Patriot student-athletes see every practice, game, class, and exam as an opportunity to push beyond boundaries.`,text:`###
Jeff Haddock

<>

The Arts

The arts take Davidson Day students beyond the bounds of a screenplay, a canvas, a screen, or the stage, and we immerse all students in our arts curriculum.

Patriot Athletics

Patriot student-athletes see every practice, game, class, and exam as an opportunity to push beyond boundaries.`},{subtopic:`Cultivating and Inspiring Potential`,source_file:null,preview:`Lower School students are constantly discovering and acquiring new skills and knowledge. At the same time, they’re beginning to express their independence and share their strengths with their community. Lower School is a time of hands-on exploration—of academics, of social relationships, of new experiences, and of…`,text:`Lower School students are constantly discovering and acquiring new skills and knowledge.

At the same time, they’re beginning to express their independence and share their strengths with their community.

Lower School is a time of hands-on exploration—of academics, of social relationships, of new experiences, and of personal character.

At Davidson Day, Lower School provides enriching experiences and student support services that ensure all students exceed their potential.

Patriots work in their classrooms, in their school, and beyond our campus, learning how to advocate for themselves and others, how to collaborate as a leader or part of a team, and how to express their natural creativity, whether in art, music, academic projects, or student clubs.

With our 8:1 student-to-faculty ratio, our teachers provide individualized attention, foster strengths, and ensure students are both challenged and supported as they prepare for academics beyond Lower School.`},{subtopic:`Beyond Kindergarten Readiness`,source_file:null,preview:`Davidson Day’s Early Childhood program—the only independent school in Lake Norman to offer a developmentally-appropriate, integrated curriculum for children as young as two years old—teaches skills and content in context to help young learners understand the world around them and their role in it. Our teachers possess…`,text:`Davidson Day’s Early Childhood program—the only independent school in Lake Norman to offer a developmentally-appropriate, integrated curriculum for children as young as two years old—teaches skills and content in context to help young learners understand the world around them and their role in it.

Our teachers possess decades of experience in fostering meaningful connections with young students, cultivating curiosity through immersive play and safe exploration, manipulation, and discovery.

In addition to academic work, our Early Childhood program focuses on all aspects of child development: cognitive skills, language development, fine motor skills, gross motor skills, executive functioning, and social-emotional wellness.

Because children thrive in this secure, supportive environment, our Early Preschool (2s and 3s), Preschool (3s and 4s), and Junior Kindergarten (4s and 5s) students prepare for Kindergarten—and beyond.`},{subtopic:`With an 8:1 student-to-faculty ratio, Davidson Day ensures that every student is well-positioned for long-term academic success.`,source_file:null,preview:`<> Our faculty provides the individualized attention each student deserves, getting to know each child and how they prefer to learn. In the classroom, students work individually and collaboratively while receiving tailored academic support so they’re challenged but not overwhelmed. Beyond the classroom, faculty help…`,text:`<>

Our faculty provides the individualized attention each student deserves, getting to know each child and how they prefer to learn.

In the classroom, students work individually and collaboratively while receiving tailored academic support so they’re challenged but not overwhelmed.

Beyond the classroom, faculty help students explore their interests and discover new passions. Our faculty are advisors, coaches, and mentors who shape and inspire the lives of our students every single day.

Our integrated Early Childhood through 12th Grade curriculum results in strong relationships and meaningful connections between students and with faculty and is designed to empower students to embrace challenge, live with character, and lead with purpose.`},{subtopic:`Explore Our Divisions!`,source_file:null,preview:`Early Childhood (opens in new window/tab) Lower School (opens in new window/tab) Middle School (opens in new window/tab) Upper School (opens in new window/tab)`,text:`Early Childhood (opens in new window/tab)

Lower School (opens in new window/tab)

Middle School (opens in new window/tab)

Upper School (opens in new window/tab)`},{subtopic:`Prepared for College and the Real World`,source_file:null,preview:`Our academic curriculum is designed to prepare students for the academic rigor and individual responsibility expected throughout a collegiate education—while also equipping students with real-world-ready skills so they’ll be prepared to lead on the global stage. Upper School begins in 9th Grade at Davidson Day, as…`,text:`Our academic curriculum is designed to prepare students for the academic rigor and individual responsibility expected throughout a collegiate education—while also equipping students with real-world-ready skills so they’ll be prepared to lead on the global stage.

Upper School begins in 9th Grade at Davidson Day, as does our college counseling program for students and their families. One-on-one personalized assistance with every aspect of the college application and enrollment process ensures that every Patriot is knowledgeable, prepared, and excited to identify institutions of higher learning that are the best fit for their strengths, interests, and potential.

The most important skill we cultivate is responsible self-advocacy.

We expect every student to engage in every class every day. And, in each class, whether AP Psychology, Conceptual Physics, or Big History, knowing how to ask the right question at the right time is just as critical as knowing the right answer.

With our 8:1 student-to-faculty ratio, each classroom is arranged for student collaboration and discussion. We structure our classes such that the majority of discussion is student-generated and student-led. This ensures that students, regardless of academic discipline, deconstruct complex academic material, then reconstruct that material cogently in written work or in classroom discussion, adding to their theoretical and practical understanding.`},{subtopic:`Assistant Head of Upper School`,source_file:null,preview:`### Luke Diamond Click here to view the brochure. Diploma Distinctions Through immersive practicums, original research, and sustained ethical inquiry, students graduate with something no transcript can fully capture: the habits of mind, real-world experience, and intellectual confidence. The Arts The arts take…`,text:`###
Luke Diamond

Click here to view the brochure.

Diploma Distinctions

Through immersive practicums, original research, and sustained ethical inquiry, students graduate with something no transcript can fully capture: the habits of mind, real-world experience, and intellectual confidence.

The Arts

The arts take Davidson Day students beyond the bounds of a screenplay, a canvas, a screen, or the stage, and we immerse all students in our arts curriculum.

Patriot Athletics

Patriot student-athletes see every practice, game, class, and exam as an opportunity to push beyond boundaries.

<>`},{subtopic:`Diploma Distinctions hub (S9)`,source_file:null,preview:`# Diploma Distinctions Not more classes. More purpose. At Davidson Day, our mission is to empower students to embrace challenge, live with character, and lead with purpose — and the Diploma Distinctions are designed to build exactly that foundation. Through immersive practicums, original research, and sustained…`,text:`# Diploma Distinctions

Not more classes. More purpose.

At Davidson Day, our mission is to empower students to embrace challenge, live with character, and lead with purpose — and the Diploma Distinctions are designed to build exactly that foundation. Through immersive practicums, original research, and sustained ethical inquiry, students graduate with something no transcript can fully capture: the habits of mind, real-world experience, and intellectual confidence that carry them not just into college, but through it and beyond, emerging as world and work-ready leaders.

Parents and students will value the program because it:

- Signals sustained intellectual commitment to colleges

- Builds independence and executive functioning

- Connects learning to real-world application

- Develops confidence through professional experiences

- Encourages clarity about future academic and career goals

Students don’t simply take advanced classes—they apply their learning in authentic settings and produce original scholarship before graduation.`},{subtopic:`Choose Your Pathway`,source_file:null,preview:`Click here to view the brochure. #### Click the images below to learn more:`,text:`Click here to view the brochure.

#### Click the images below to learn more:`},{subtopic:`How The Program Works`,source_file:null,preview:`Students apply at the end of sophomore year and, upon acceptance, enter a structured and mentored pathway beginning junior year, guided by experienced faculty whose expertise is directly aligned to their field of study. #### Each Diploma Distinction includes: - Focused Advanced Coursework - Immersive Practicum…`,text:`Students apply at the end of sophomore year and, upon acceptance, enter a structured and mentored pathway beginning junior year, guided by experienced faculty whose expertise is directly aligned to their field of study.

#### Each Diploma Distinction includes:

-
Focused Advanced Coursework

-
Immersive Practicum (Minimum 100 Hours)

-
Ethics Labs

-
Scholars Research Program (The Culminating Experience)`},{subtopic:`Focused Advanced Coursework`,source_file:null,preview:`AP and Honors classes aligned to a specific academic track, building the intellectual foundation for original inquiry.`,text:`AP and Honors classes aligned to a specific academic track, building the intellectual foundation for original inquiry.`},{subtopic:`Immersive Practicum (Minimum 100 Hours)`,source_file:null,preview:`Internships, international travel, laboratory research, medical shadowing, civic engagement, engineering placements, nonprofit leadership, or pre-collegiate programs. The practicum is not a standalone requirement — it becomes the lived experience that anchors and drives the student’s original research.`,text:`Internships, international travel, laboratory research, medical shadowing, civic engagement, engineering placements, nonprofit leadership, or pre-collegiate programs. The practicum is not a standalone requirement — it becomes the lived experience that anchors and drives the student’s original research.`},{subtopic:`Ethics Labs`,source_file:null,preview:`Ethics Labs are structured, discussion-centered experiences in which students analyze complex real-world dilemmas through the lenses of philosophy, civic responsibility, and public leadership. Drawing on seminar-style inquiry models such as those used at Davidson College, students examine contemporary issues in…`,text:`Ethics Labs are structured, discussion-centered experiences in which students analyze complex real-world dilemmas through the lenses of philosophy, civic responsibility, and public leadership. Drawing on seminar-style inquiry models such as those used at Davidson College, students examine contemporary issues in bioethics, political philosophy and public policy, international ethics, and business ethics.`},{subtopic:`Scholars Research Program (The Culminating Experience)`,source_file:null,preview:`Junior Year – Research Methods Honors Students learn collegiate-level research skills, conduct academic database searches, synthesize scholarship, and develop a research question grounded directly in their practicum experience. Senior Year – Capstone Research Honors Under close faculty mentorship, students design and…`,text:`Junior Year – Research Methods Honors

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

Powered by Finalsite`},{subtopic:`Global Studies Diploma page (S10)`,source_file:null,preview:`# Global Studies Diploma For students drawn to international relations, environmental policy, cultural research, global public policy, or any field that requires crossing borders — geographic, cultural, or intellectual. Students develop cultural fluency and the ability to navigate complex global systems with…`,text:`# Global Studies Diploma

For students drawn to international relations, environmental policy, cultural research, global public policy, or any field that requires crossing borders — geographic, cultural, or intellectual. Students develop cultural fluency and the ability to navigate complex global systems with discernment.

The Global Studies Diploma Distinction prepares students to understand an increasingly interconnected world through rigorous academic study, language immersion, and transformative international experiences, helping them develop the perspective and fluency needed to engage thoughtfully with the wider world.

This Diploma Distinction has existed at Davidson Day School since 2021, with most students taking advantage of the AFAR research trips to Spain, Portugal, and Belize to ground their research in collegiate-level archaeological research and international travel experience. As the Global Studies pathway matures, students will have additional opportunities to participate in international service trips, language immersion programs, or find their own international opportunities to ground their research and explore their interests.

Practicum experiences—often including international travel, research initiatives, language immersion, or cross-cultural service—become the foundation for sustained academic inquiry. Through their Capstone research, students investigate questions that emerge from lived global experience, whether in areas such as international development, environmental sustainability, archaeology, cultural identity, or global public health.

STEMM Diploma Distinction

Business & Civic Engagement Diploma Distinction

Return to Diploma Distinctions Homepage

Click Here To View The Program Brochure`},{subtopic:`Global Studies Diploma Requirements`,source_file:null,preview:`- Core Course - Elective Courses - Language Competency Requirement - Practicum - Scholars Research Program - Culminating Diploma Experience`,text:`-
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
Culminating Diploma Experience`},{subtopic:`Elective Courses`,source_file:null,preview:`Choose Four: AP World History or AP European History AP Environmental Science AP Psychology AP Macroeconomics AP with WE Service Recognition AP Spanish Language & Culture or AP French Language & Culture`,text:`Choose Four:

AP World History or AP European History
AP Environmental Science

AP Psychology
AP Macroeconomics

AP with WE Service Recognition
AP Spanish Language & Culture or AP French Language & Culture`},{subtopic:`Language Competency Requirement`,source_file:null,preview:`Completion of Level IV or 3 levels of the same language in Upper School.`,text:`Completion of Level IV or 3 levels of the same language in Upper School.`},{subtopic:`Practicum`,source_file:null,preview:`- At least 100 hours of an approved internship, volunteer opportunity, or pre-collegiate program - Quarterly Ethics Labs`,text:`- At least 100 hours of an approved internship, volunteer opportunity, or pre-collegiate program

- Quarterly Ethics Labs`},{subtopic:`Scholars Research Program`,source_file:null,preview:`- Research Methods Honors Course (11th Grade) - Capstone Research Honors Mentorship (12th Grade)`,text:`- Research Methods Honors Course (11th Grade)

- Capstone Research Honors Mentorship (12th Grade)`},{subtopic:`Culminating Diploma Experience`,source_file:null,preview:`Seniors present their capstone research project at the Davidson Day Scholars Research Conference.`,text:`Seniors present their capstone research project at the Davidson Day Scholars Research Conference.`},{subtopic:`Catalog p. 28 — Upper School Mathematics Course Progression (hand transcription)`,source_file:null,preview:`Hand transcription of the progression chart (read from the page image; the OCR of this page is unusable). Each line is one box and the box(es) its arrow leads to. Left chart (starts at 5th Grade Math): - 5th grade: 5th Grade Math → 6th grade Math 1, or 6th grade Accelerated Math 1 - Math 1 (6th) → Math 2 (7th) → Math…`,text:`Hand transcription of the progression chart (read from the page image; the OCR of this page
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
- AP Precalculus (10th) → AB Calculus or BC Calculus (11th) → AP Statistics, BC Calculus or Calculus 3 (12th)`},{subtopic:`Upper School — 2026-2027 Course Catalog, full OCR text (S1)`,source_file:null,preview:"Page numbers are the Issuu page numbers. ===== PAGE 1 ===== ```text U PERSCHOOL COURSE CATALOG COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY DAVIDSON DAY SCI POL RESIDSON DAY SCHOOL ``` ===== PAGE 2 ===== ```text GATSON DAL SCHOOL Davidson Day School's Mission: Together, we empower students to embrace challenge, live…",text:`Page numbers are the Issuu page numbers.

===== PAGE 1 =====

\`\`\`text
U PERSCHOOL
COURSE CATALOG
COURAGE ~ OWNERSHIP ~ RESILIENCE ~ EMPATHY
DAVIDSON DAY SCI POL
RESIDSON DAY
SCHOOL
\`\`\`

===== PAGE 2 =====

\`\`\`text
GATSON DAL
SCHOOL
Davidson Day School's Mission:
Together, we empower students to embrace challenge, live with character, and
lead with purpose.
DAVIDSON DAY
PIONSHIPS
YAU VOLLEY BALL
LACROSSE 23
\`\`\`

===== PAGE 3 =====

\`\`\`text
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
\`\`\`

===== PAGE 4 =====

\`\`\`text
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
\`\`\`

===== PAGE 5 =====

\`\`\`text
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
\`\`\`

===== PAGE 6 =====

\`\`\`text
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
\`\`\`

===== PAGE 7 =====

\`\`\`text
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
\`\`\`

===== PAGE 8 =====

\`\`\`text
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
\`\`\`

===== PAGE 9 =====

\`\`\`text
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
\`\`\`

===== PAGE 10 =====

\`\`\`text
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
\`\`\`

===== PAGE 11 =====

\`\`\`text
ADVANCED PLACEMENT:
COLLEGE-LEVEL WORK
Students who choose to enroll in Advanced Placement (AP) courses are often
motivated by a passion for and intellectual interest in the subject matter of the
course. Student success in AP courses is usually driven by a strong aptitude for the
subject matter, combined with excellent preparation and a willingness to do all of
the work associated with the co

…[truncated]

---`},{subtopic:`Curriculum Guide`,source_file:`Davidson Day - Course Offerings - Curriculum Guide.md`,preview:`# Davidson Day School — Course Offerings - Divisions: Early Childhood (age 2 – JK) · Lower School K–4 · Middle School 5–8 · Upper School 9–12 - Extraction note: Issuu's text APIs return HTTP 403. The catalog was extracted by pulling all 71 page images from…`,text:`# Davidson Day School — Course Offerings

- **Divisions:** Early Childhood (age 2 – JK) · Lower School K–4 · Middle School 5–8 ·
 Upper School 9–12
- **Extraction note:** Issuu's text APIs return HTTP 403. The catalog was extracted by pulling all
 71 page images from \`image.isu.pub/260402123341-cdbc20014618b50dcafae1b78b43224f/jpg/page_N.jpg\`
 and OCR'ing them via the macOS Vision framework, then hand-verifying the key tables (pp. 8, 11,
 28, 70) by direct image read. Re-verification should use that path.

**Headline finding:** Davidson Day publishes a substantial Upper School catalog with full
paragraph-length descriptions for ~75 courses across **9 departments** and **26 AP courses**. In
sharp contrast it publishes **no course lists whatsoever** for Lower School, Middle School, or Early
Childhood — those pages are marketing prose only. **IB status is refuted** (see Gaps).`},{subtopic:`Source URLs`,source_file:null,preview:`| Ref | URL | What it covers | | --- | --- | --- | | S1 | https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog | PRIMARY SOURCE — 2026-2027 Upper School Course Catalog, 71 pp., published 2026-04-02. Full course descriptions, graduation requirements, AP list, math progression,…`,text:`| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://issuu.com/davidsondayschool/docs/2026-2027_upper_school_course_catalog | **PRIMARY SOURCE — 2026-2027 Upper School Course Catalog**, 71 pp., published 2026-04-02. Full course descriptions, graduation requirements, AP list, math progression, offerings-by-year grid |
| S2 | https://issuu.com/davidsondayschool/docs/25-26_davidson_day_school_profile | 2025-2026 School Profile (college/counselor profile), pub. 2025-09-12. Enrollment, faculty counts, independent department-by-level course grid, graduation credits |
| S3 | https://issuu.com/davidsondayschool | Publisher index — 80 publications since 2012. Used to prove only *Upper School* catalogs exist |
| S4 | https://www.davidsonday.org/academics/upper-school | Upper School division page. 8:1 ratio, Upper School begins Grade 9 |
| S5 | https://www.davidsonday.org/academics/middle-school | Middle School page. Study-skills course, MS→US acceleration. **No course list** |
| S6 | https://www.davidsonday.org/academics/lower-school | Lower School page. 8:1 ratio. **No course list** |
| S7 | https://www.davidsonday.org/academics/early-childhood | Early Childhood — Early Preschool (2s/3s), Preschool (3s/4s), Junior Kindergarten (4s/5s) |
| S8 | https://www.davidsonday.org/academics/academics-at-davidson-day | Academics overview — four divisions, EC–12 |
| S9 | https://www.davidsonday.org/academics/diploma-distinctions | Diploma Distinctions hub (plus \`/global-studies\`, \`/stemm\`, \`/business-civic-engagement\`) |

Older catalogs available for trend comparison:
[2025-2026](https://issuu.com/davidsondayschool/docs/2025-2026_upper_school_course_catalogue_) ·
[2024-2025](https://issuu.com/davidsondayschool/docs/2024-2025_upper_school_course_catalogue) ·
[2023](https://issuu.com/davidsondayschool/docs/2023_upper_school_course_catalogue)

**Publication year:** the Upper School catalog is the **2026-2027** edition (published 2026-04-02).`},{subtopic:`Metrics`,source_file:null,preview:`| Metric | Value | Source | | --- | --- | --- | | Grade range (school) | Age 2 through Grade 12 | S2 p.1, S8 | | Upper School grade range | 9–12 | S1 p.9, S4 | | Upper School academic departments | 9 (English; Mathematics; History & Social Sciences; Science; World Languages; Participation in the Arts; Technology &…`,text:`| Metric | Value | Source |
| --- | --- | --- |
| Grade range (school) | Age 2 through Grade 12 | S2 p.1, S8 |
| Upper School grade range | 9–12 | S1 p.9, S4 |
| Upper School academic departments | 9 (English; Mathematics; History & Social Sciences; Science; World Languages; Participation in the Arts; Technology & Computer Science; Physical Education; Electives) | S1 pp.4-6 |
| Total distinct Upper School courses catalogued | ~75 (74 with descriptions + AP Spanish Literature listed without one) | S1 pp.20-64 |
| **AP courses offered** | **26** | S1 p.11 (explicit AP list) |
| Post-AP courses | 1 — Calculus III / Multivariable Calculus & Linear Algebra | S1 pp.31, 70 |
| Courses on the 2026-27 offerings grid | 66 | S1 p.70 |
| Minimum graduation credits | 22.5 | S2 p.2 |
| Graduation requirements (catalog) | English 4, Math 4, Science 3, History 3, World Language 2, Fine Arts 1, PE 1, Electives 3 | S1 p.8 |
| Total enrollment | 541 | S2 p.2 |
| Upper School enrollment | 198 | S2 p.2 |
| Upper School teaching faculty | 30 | S2 p.2 |
| Student-to-faculty ratio | 8:1 | S4, S6 |
| Class of 2026 size | 47 | S2 p.2 |
| Diploma Distinction tracks | 3 | S1 pp.13-19, S9 |
| GPA weighting | Honors +0.5, AP +1.0 (Calculus III also +1.0) | S1 pp.10, 11, 69; S2 p.2 |
| IB Diploma Programme | **NOT offered — refuted, see Gaps** | S1, S2 |

**Discrepancy to flag:** the catalog (S1 p.8) states **2** World Language credits required; the School
Profile (S2 p.2) states **3** in the same language, and the World Languages department page (S1 p.45)
also says three credits. The catalog's own requirements table contradicts its department page. S2
also lists English as **4.5 credits incl. 0.5 Composition** versus 4 in S1. Prefer S1 p.8 as the
current catalog table, but note the conflict.`},{subtopic:`Upper School (Grades 9–12) — source S1`,source_file:null,preview:`### English — S1 pp.20-25 - English I — Gr 9 — A survey of literary genres built on The Crucible, Romeo and Juliet, and Of Mice and Men, with supplementary mythology and short fiction plus sustained academic-writing practice. - English I Honors — Honors · Gr 9 — The English I sequence at an accelerated, more intensive…`,text:`### English — S1 pp.20-25

- **English I** — *Gr 9* — A survey of literary genres built on *The Crucible*, *Romeo and Juliet*, and *Of Mice and Men*, with supplementary mythology and short fiction plus sustained academic-writing practice.
- **English I Honors** — *Honors · Gr 9* — The English I sequence at an accelerated, more intensive pace, entered by recommendation of eighth-grade teachers.
- **English II** — *Gr 10* — Study of *Beowulf*, *Othello*, and *Animal Farm* alongside short-story and poetry units, emphasizing deeper meaning and implication in texts.
- **English II Honors** — *Honors · Gr 10* — Reads fiction and nonfiction such as *A Long Way Gone*, *Much Ado About Nothing*, and *Predictably Irrational*, extending English II skills through scaffolded responses and added writing.
- **English III Honors** — *Honors · Gr 11* — A literature-based course on short fiction, novels, drama, creative nonfiction, and poetry — *1984*, *The Stranger*, *The Great Gatsby*, *Frankenstein* — building literary analysis and argument construction.
- **English IV Honors** — *Honors · Gr 12* — First semester explores the literary voice of the American South (Faulkner, Walker, Ward, Rash); second semester is a seminar on Shakespeare's comedies.
- **AP English Language and Composition** — *AP* — A writing- and reading-intensive study of rhetoric in which students learn to analyze and construct effective arguments at introductory-college level.
- **AP English Literature and Composition** — *AP* — Composition and literary analysis across genres, examining representative British and American novels and plays from the sixteenth century to the present.
- **Creative Writing Honors** — *Honors · Elective* — An honors elective workshop in poetry, life writing, and fiction, culminating in portfolios and a self-designed final project; does not count toward the English requirement.
- **Introduction to Yearbook** — *Elective* — Students produce the *Revolution* yearbook while learning journalistic writing, photography, interviewing, and ad sales in a business-structured class.
- **Yearbook Honors** — *Honors · Elective* — Advanced yearbook students take leadership roles in theme, layout, staff training, and business campaigns.

### Mathematics — S1 pp.26-31

- **Algebra I** — *Gr 9-12* — Introduces the fundamental concepts of algebra and their multiple representations, including linear and quadratic equations, polynomials, and elementary properties of functions.
- **Algebra I Honors** — *Honors* — The Algebra I curriculum at an accelerated pace, entered from Accelerated Math 3 or Honors Prealgebra.
- **Geometry** — *Gr 9-12* — Classical Euclidean geometry — congruence, similarity, solid and analytic geometry, and right-triangle trigonometry — with emphasis on inductive and deductive reasoning and proof.
- **Geometry Honors** — *Honors* — Geometry covered at a faster pace and greater depth, requiring Honors Algebra I and departmental approval.
- **Algebra II** — *Gr 10-12* — Polynomial functions in depth plus rational, square-root, logarithmic, and exponential models, with graphing-calculator work integral to the course.
- **Algebra II/Trigonometry Honors** — *Honors* — The Algebra II curriculum with trigonometric functions added, requiring Geometry Honors and summer work.
- **Precalculus** — *Gr 11-12* — Combines trigonometry, geometry, and algebra concepts needed for calculus, strengthening understanding of algebraic and transcendental functions.
- **AP Precalculus** — *AP* — College Board–aligned study of polynomial, rational, exponential, logarithmic, and trigonometric functions emphasizing modeling and transformation.
- **Honors Calculus** — *Honors* — An advanced course covering limits, continuity, derivatives, the Fundamental Theorems, and integration techniques for students headed to higher-level STEM work.
- **AP Calculus AB** — *AP* — A college-level introduction to differential and integral calculus — limits, derivatives, definite integrals — applied to change, motion, and accumulation.
- **AP Calculus BC** — *AP* — Extends Calculus AB with parametric, polar, and vector functions plus sequences and series.
- **Calculus III (Post-AP) Honors: Multivariable Calculus and Linear Algebra** — *Post-AP* — Semester courses extending calculus into higher dimensions (gradients, Lagrange multipliers, volumes) plus linear algebra topics; weighted 1.0 like an AP.
- **AP Statistics** — *AP* — Major concepts and tools for collecting, analyzing, and drawing conclusions from data, spanning sampling, experimentation, probability, and statistical inference.

### History & Social Sciences — S1 pp.32-37

- **Civics (Civics and Deliberative Democracy)** — *Gr 9* — A foundational humanities course rooted in constitutional principles, using research, position papers, and structured debate to build civil, evidence-based discussion.
- **Civics Honors** — *Honors · Gr 9* — The Civics course with added analytical rigor, primary-source interpretation, and AP-style writing prompts to prepare for AP World History.
- **World History Honors** — *Honors · Gr 10* — The required sophomore world-history survey.
- **AP World History (Modern)** — *AP* — A college-level survey of world history from roughly 1200 CE forward, covering global integration, industrialization, colonialism, and twentieth-century ideological conflict.
- **U.S. History Honors** — *Honors · Gr 11* — Surveys United States history from the peopling of North America to the present through diverse viewpoints and primary-source argumentation.
- **AP U.S. History** — *AP* — A college-level U.S. history survey with substantially greater reading — primary documents, cartoons, maps, data sets — pushing students to work like historians.
- **AP European History** — *AP* — Investigates significant European events and processes from about 1450 to the present, from the Renaissance and Reformation to twentieth-century global conflicts.
- **AP Microeconomics** — *AP · Alternate years* — Principles of economics applied to individual producers and consumers within an economic system; offered 2026-2027.
- **AP Macroeconomics** — *AP · Alternate years* — Principles of economics applied to the economic system as a whole; offered 2027-2028.
- **AP Psychology** — *AP* — The systematic, scientific study of human behavior and thought — learning, motivation, memory, neuroanatomy — with active experimental design work.
- **AP U.S. Government and Politics** — *AP* — Cultivates understanding of U.S. government through data and text analysis of constitutionalism, liberty and order, and civic participation.
- **Anthropology Honors** — *Honors* — A systematic overview of anthropology's four subfields — cultural, physical, archaeology, and linguistics — engaging the question of what it means to be human.

### Science — S1 pp.38-43

- **Conceptual Physics** — *Gr 9* — Waves, sound, and light, then mechanics (forces, motion, energy, momentum) and electric circuits, with mathematical models limited to Algebra I concepts.
- **Physics Honors** — *Honors · Gr 9* — The same physics sequence adding Geometry-level mathematical modeling; co-requisite Geometry or higher.
- **AP Physics 1** — *AP* — Algebra-based introductory college physics covering kinematics, dynamics, circular motion, energy, momentum, torque, gravitation, simple harmonic motion, and fluids.
- **AP Physics 2** — *AP* — Algebra-based second-semester college physics covering fluids, thermodynamics, electricity and magnetism, optics, and modern physics.
- **Chemistry** — *Gr 10* — Fundamental principles of chemistry — matter, atomic structure, reactions, stoichiometry, bonding, acids and bases, kinetics and equilibrium — with quantitative lab work.
- **Chemistry Honors** — *Honors · Gr 10* — Chemistry with strong emphasis on critical thinking, independent lab investigation, and writing, designed to prepare students for AP Chemistry.
- **AP Chemistry** — *AP* — A college-level chemistry foundation covering atomic structure, intermolecular forces, reactions, kinetics, thermodynamics, and equilibrium.
- **Biology** — *Gr 11* — Major principles of modern biology — organization of life, cell structure and division, DNA, genetics, evolution, ecology, and biological diversity.
- **Biology Honors** — *Honors · Gr 11* — Biology with greater depth and rigor, adding inquiry learning with current research data and independent experiment design.
- **AP Biology** — *AP* — College-level biology organized around molecules and cells, individual organisms, and populations, with significant independent work.
- **AP Environmental Science** — *AP* — Inquiry-based study of the natural world organized around energy transfer, earth-system interactions, species interactions, and sustainability.
- **Human Anatomy and Physiology Honors** — *Honors · Alternate years* — A comprehensive study of human body structure and function via medical case studies, microscopy, and dissection.

### World Languages — S1 pp.44-49

- **French I** — *Gr 9-12* — Beginning French developing the four skill areas in culturally appropriate contexts, with emphasis on interpretive skills before production.
- **French II** — *Year* — Builds French vocabulary around family, education, food, travel, and daily routines using authentic resources and classroom conversation.
- **French III Honors** — *Honors* — Applies interpersonal, presentational, and interpretive skills through authentic texts, songs, and videos while comparing French and students' own cultures.
- **French IV Honors** — *Honors* — Works almost exclusively from authentic resources toward full communication in French, extending into the African Francophone world.
- **French V Honors** — *Honors* — Typically taken as preparation for AP French Language and Culture, taught on a two-year rotation with the AP course.
- **AP French Language and Culture** — *AP* — The culminating French course organized around six themes and taught almost exclusively in French using contemporary texts, films, and media.
- **Spanish I** — *Gr 9-12* — Introductory Spanish covering thematic and grammatical units, moving toward novice-level production with authentic songs, stories, and video.
- **Spanish II** — *Year* — Expands vocabulary through units on education, family, daily life, travel, and traditions across twelve Spanish-speaking countries.
- **Spanish III Honors** — *Honors* — Sharpens all four skills through units on travel, relationships, beauty, and health while adding advanced grammar and cross-cultural analysis.
- **Spanish IV Honors** — *Honors* — In-depth cultural study using authentic resources and academic vocabulary, emphasizing conversation and complex written expression.
- **Spanish V Honors: Cultural Topics** — *Honors* — Explores in-depth cultural themes through authentic fiction, film, and documentaries, taught almost exclusively in Spanish.
- **AP Spanish Language and Culture** — *AP* — Explores culture in contemporary and historical contexts, developing awareness of cultural products, practices, and perspectives; taught almost entirely in Spanish.
- **AP Spanish Literature and Culture** — *AP* — Listed in the catalog contents and AP roster; **no course description is published** (see Gaps).

### Participation in the Arts — S1 pp.50-57

- **Photography I** — *Year* — Fundamentals of photography and the camera — composition, light, the exposure triangle, and Adobe Lightroom — culminating in a portfolio.
- **Photography II** — *Year* — Continues photographic technique and post-production while developing individual point of view; requires Photography I.
- **Photography III** — *Year* — For serious student photographers mastering the digital SLR, advanced editing, and personal style, producing their own websites and a final portfolio.
- **Studio I** — *Year* — Introduces foundational concepts and skills across two- and three-dimensional artmaking, including observational drawing, ceramics, painting, and digital illustration.
- **Studio II Honors** — *Honors* — Builds on Studio I with longer-term projects, regular critique, and written artist reflections, serving as key preparation for AP Studio Art.
- **Portfolio** — *Gr 11-12* — Upperclassmen develop an individualized year-long project plan with the instructor in a medium or subject of their choice.
- **AP Studio Art** — *AP* — Students develop a portfolio of works representing a sustained investigation into a common visual theme for submission to College Board judges.
- **Performance Ensemble** — *Audition* — A select company of actors researching, rehearsing, and performing challenging theatre, also appearing in school productions and improv shows.
- **Contemporary Ensemble** — *No audition* — Davidson Day's "School of Rock" — students learn and perform contemporary pop and rock music with parts adjusted to each player's level.
- **Modern Music** — *Year* — A blend of history, musicology, and popular culture covering the artists and styles of the last hundred years, with original composition in GarageBand.
- **Film Studies & Production** — *Year* — Teaches film appreciation — history, genre, elements, cultural impact — alongside entry-level digital video editing and production.

### Technology & Computer Science — S1 pp.58-60

- **Introduction to Computer Coding** — *Independent study* — Foundational Python programming covering variables, conditionals, loops, functions, and basic data structures at an individualized pace with a faculty mentor.
- **AP Computer Science Principles** — *AP* — Foundational computer-science ideas — computational thinking, algorithms, data, the internet, and the ethics of technology — offered as a mentored independent study.
- **AP Computer Science A** — *AP* — College-level object-oriented programming in Java covering classes, control structures, methods, arrays, and recursion, offered as a mentored independent study.

### Physical Education — S1 pp.61-62

- **Weight Training** — *Year* — Supervised muscular, cardiovascular, agility, and endurance training with emphasis on safe technique and lifelong fitness habits.
- **Intro to Sports Medicine** — *Semester-split* — Fundamentals of sports medicine and its careers, covering anatomy, injuries, evaluation, and taping for upper and lower body across two semesters.

### Electives — S1 pp.63-64

- **Financial Literacy Honors** — *Honors* — Introduces how businesses operate and compete, financial and equities markets, and practical personal finance, including Wharton's Global High School Investment Competition.
- **AP Business w/ Personal Finance** — *AP* — A comprehensive introduction to business principles and personal finance through case studies, research projects, and applied simulations.
- **Honors Social Entrepreneurship** — *Honors* — Applies business principles to social, environmental, and community challenges through project-based learning with local organizations.
- **AP with WE Service** — *AP* — Combines college-level academic study with sustained field-based service learning alongside local nonprofit partners.
- **Middle School TA (Teacher's Assistant)** — *Gr 10-12 · Application* — Upper School students serve as instructional partners in middle-school classrooms and lead mini-lessons, with monthly pedagogy seminars.

### Cross-departmental / program courses

- **Research Methods Honors** — *Honors · Gr 11* — A foundational Diploma Distinctions course teaching scholarly research through biweekly seminars, culminating in a formal Capstone abstract.
- **Capstone Research Honors** — *Honors · Gr 12* — The senior-year component of the Diploma Distinctions program supporting the Senior Capstone Research Project.
- **Forensics & Zoology Honors** — *Honors* — Listed as a STEMM Distinction core option (S1 p.17) and in the profile course grid; **no course description published**.
- **Independent Study** — *Pass/Fail* — A student-designed course of study with a faculty supervisor, requiring an approved abstract and syllabus; excluded from GPA.
- **Online Courses** — *Transfer credit* — Accredited online options via Fuel Education when alternative coursework is needed; treated as transfer credit, not in GPA.

### Diploma Distinctions (3 tracks) — S1 pp.13-19, S9

- **Global Studies** — prerequisite Honors Anthropology; 3 AP electives; language through level IV; a ≥2-week international travel practicum; Ethics Labs; Research Methods plus Capstone. Exists since 2021.
- **STEMM** — core of Anatomy & Physiology Honors, Forensics & Zoology Honors, AP Physics 1, or AP Statistics; 3 AP electives; 4 Honors/AP lab sciences plus 4 Honors/AP maths; ≥100-hour internship.
- **Business & Civic Engagement** — core of Financial Literacy or Social Entrepreneurship; 4 electives; ≥100-hour internship or volunteer placement.

### AFAR International Research — S1 pp.66-67

Accredited archaeological fieldwork for Grades 7-12: **Belize** (the Maya site of Cahal Pech),
**Spain** (the medieval castle of Zorita de los Canes), and **Portugal** (a Roman fish-processing
complex at Tróia).`},{subtopic:`Middle School (Grades 5–8)`,source_file:null,preview:`No Middle School course catalog or curriculum guide is published. The only citable course-level data is the math progression chart in the Upper School catalog (S1 p.28), which names actual Middle School courses: - 5th Grade Math — Gr 5 — The entry point of the standard middle-school math sequence. - Accelerated Math 1…`,text:`**No Middle School course catalog or curriculum guide is published.** The only citable course-level
data is the math progression chart in the Upper School catalog (**S1 p.28**), which names actual
Middle School courses:

- **5th Grade Math** — *Gr 5* — The entry point of the standard middle-school math sequence.
- **Accelerated Math 1** — *Gr 5-6* — The accelerated entry track, taken in Grade 5 or 6.
- **Math 1** — *Gr 6* — The standard sixth-grade course following 5th Grade Math.
- **Accelerated Math 2** — *Gr 6-7* — The accelerated course following Accelerated Math 1.
- **Accelerated Math 2/3** — *Gr 6* — A compressed combined course on the fastest track.
- **Math 2** — *Gr 7* — The standard seventh-grade course following Math 1.
- **Accelerated Math 3** — *Gr 7-8* — The accelerated course preceding Honors Algebra 1.
- **Math 3** — *Gr 8* — The standard eighth-grade course leading to Algebra 1.
- **Honors Algebra 1** — *Honors · Gr 7-8* — Upper-School-credit algebra taken as early as Grade 7 on the fastest track.
- **Honors Geometry** — *Honors · Gr 8* — Upper-School-credit geometry available in Grade 8.

Additionally published (S5, S1 p.12, S2 p.2):

- **Study Skills** — every Middle School student takes a study-skills course each year ("four years of building the tools for success," implying Grades 5-8).
- Middle School students may take **Upper School world language and mathematics** courses; those credits count toward graduation requirements but are excluded from Upper School GPA.
- Service-learning program; House system; arts curriculum; AFAR research from Grade 7; school sports begin Grade 5.`},{subtopic:`Lower School (K–4) and Early Childhood (age 2 – JK)`,source_file:null,preview:`No course lists, subject lists, or named curriculum programs are published. Divisions per S7 and S8: Early Childhood = Early Preschool (2s/3s), Preschool (3s/4s), Junior Kindergarten (4s/5s); Lower School follows, through the start of Middle School at Grade 5. Only citable curricular content: - Specials (from…`,text:`**No course lists, subject lists, or named curriculum programs are published.** Divisions per S7 and
S8: Early Childhood = Early Preschool (2s/3s), Preschool (3s/4s), Junior Kindergarten (4s/5s); Lower
School follows, through the start of Middle School at Grade 5.

Only citable curricular content:

- **Specials** (from search-indexed Lower School copy): art, world language, library, physical education, music; Lower School science and technology labs for hands-on experimentation.
- Early Childhood targets cognitive skills, language development, fine and gross motor skills, executive functioning, and social-emotional wellness (S7).
- 8:1 student-to-faculty ratio (S6).

**Evidence caveat:** the current live Lower School page (S6) contains **no** subject list at all; the
specials list above came from Google's indexed snippet of that page and could not be re-verified in
the live HTML — treat it as weaker than S1-grade evidence.`},{subtopic:`Gaps — what Davidson Day does not publish`,source_file:null,preview:`1. No Lower School or Middle School curriculum guide exists. Verified three ways: (a) the Issuu publisher index of all 80 publications since 2012 contains only Upper School catalogs (S3); (b) the live Lower/Middle/Early Childhood pages contain zero course names — their full visible text is entirely marketing prose…`,text:`1. **No Lower School or Middle School curriculum guide exists.** Verified three ways: (a) the Issuu
 publisher index of all 80 publications since 2012 contains *only* Upper School catalogs (S3);
 (b) the live Lower/Middle/Early Childhood pages contain zero course names — their full visible
 text is entirely marketing prose (S5, S6, S7); (c) the October 2025 Wayback captures of those same
 pages are byte-for-byte the same prose. Middle School course data is therefore limited to the ten
 math courses on S1 p.28 plus "Study Skills."
2. **IB status: refuted.** Davidson Day is **not** an IB World School and offers **no IB courses**.
 Evidence: zero occurrences of "International Baccalaureate" or "IB" across all 71 catalog pages
 *and* the 2025-26 School Profile; the profile's memberships list names SACS, SAIS, NAIS, NCAIS,
 and **College Board** but no IBO; the academic program is described exclusively in AP terms.
 **Caution:** searches for "Davidson" + IB surface *Davidson IB Middle School*, an unrelated
 Charlotte-Mecklenburg **public** school, and *Charlotte Country Day School*, which genuinely does
 offer IB — neither is Davidson Day. Do not conflate these.
3. **Two courses listed without descriptions:** *AP Spanish Literature and Culture* (in Contents p.49
 and the AP roster p.11, but no description on the World Languages pages) and *Forensics & Zoology
 Honors* (a STEMM core option on p.17 and in the profile grid, but absent from the Science
 department pages).
4. **World language and English credit requirements conflict** between S1 p.8 (2 WL, 4 English) and
 S1 p.45 + S2 p.2 (3 WL; 4.5 English incl. 0.5 Composition). Unresolved in the school's own
 documents.
5. **"Composition"** is required for graduation per S1 p.21 ("must pass Composition") and S2, and
 seniors write college essays "in Composition" (S1 p.68), but **no Composition course description
 appears** in the English department pages.
6. **Not every catalogued course runs every year.** S1 p.7 states explicitly: "Not every course will
 be offered in every academic year." The 2025-26 profile (S2) marks courses *not* offered in 25-26
 — including Big History, Topics in Math, Intro to AI, 3D Animation, Film II/III, AP Physics II,
 AP Microeconomics, and AP Spanish Literature. So the ~75-course catalogue is a superset of any
 single year's actual offerings; the 66-course p.70 grid is the better "actually offered in
 2026-27" figure.
7. **Courses in the 2025-26 profile that vanished from the 2026-27 catalog** (the curriculum was
 restructured — Big History and Anthropology were replaced by Civics and World History as
 requirements effective 2024-25): Big History, Topics in Math, Modern Song Lyrics, Band, Theatre
 Arts, Ceramic Sculpture, Drawing/Painting, Illustration, Photoshop, Computer Aided Design (CAD),
 Intro to AI, 3D Animation, Health. For a maximal historical course list, S2 is worth mining
 separately — but it describes 2025-26, not current.
8. **No per-course credit values, class sizes, or enrollment-by-course data** are published anywhere.
9. **Dead URLs.** The Google-indexed \`davidsonday.org/upper-school-curriculum?DepartmentId=...\` and
 \`/page/upper-school-course-requirements\` paths are **404** after a site redesign and were never
 archived — do not cite them as live links.

---`}],i={school_slug:e,topic_slug:t,section_count:34,sections:r};export{i as default,e as school_slug,n as section_count,r as sections,t as topic_slug};