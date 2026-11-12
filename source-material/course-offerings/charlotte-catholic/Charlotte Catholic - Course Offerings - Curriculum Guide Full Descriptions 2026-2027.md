# Charlotte Catholic High School — Course Offerings (Full Course Descriptions, Curriculum Guide 2026-2027)

**Provenance**

- **Compiled by:** Claude Code, `/plan plaincourses` (plain-language rewrite of Course Offerings).
- **Date compiled:** 2026-11-11
- **Method:** `curl` download of the official Curriculum Guide 2026-2027 (S1, 96 pages,
  846,845 bytes, SHA-256 `6db5f41830a28040a399e0e20fd9b0df3d942085e2f9b3e9712f3545d225a3a5`),
  converted with `pdftotext -layout`. The text layer carries zero-width spaces (U+200B) between
  words and splits a lone `i`, `l` or `j` off the word it starts (`i ncludes`, `l anguage`). Both are
  removed here: U+200B is deleted, runs of spaces collapse to one, and every lowercase `i`/`l`/`j`
  standing alone before a word is joined to it. **Nothing else is changed**: the spelling,
  punctuation and wording below are the guide's own, including its errors (a missing period in
  Dance III, "Honors Spanish IV" in the Honors French III entry, and "the Spanish-speaking world" in
  the Honors German III entry, 436, where the course is German; recorded 2026-11-11, plan
  `coursecensus`, and not carried into the app, whose German III text never held that sentence).
- **Why this file exists.** `src/data/courseOfferings.ts` holds, for Charlotte Catholic, the first
  ~35 words of each catalog description, and 24 of them stop mid-sentence with "…". The plain-
  language rewrite (plan `plaincourses`) condenses each description into one short sentence, which
  needs the whole entry. The other existing record,
  `Charlotte Catholic - Course Offerings - Curriculum Guide 2026-2027.md`, lists titles and codes only.
- **Scope.** Every Charlotte Catholic course on the plaincourses worklist, every description that
  ends in "…", and every course whose app description belongs to a different guide entry (census
  below). It is not a full transcription of the guide.

## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf | Curriculum Guide 2026-2027 (96pp): every course, code, grade eligibility, prerequisites, quality points and full description |
| S2 | https://www.charlottecatholic.org/departments/counseling/course-selection/2026-2027-curriculum-guide | Landing page hosting the guide |

## Census: descriptions attached to the wrong course (measured 2026-11-11 at `df4dd5c9`)

Each of the 199 app courses was looked up by title among the guide's 201 course headers, and its
app description was searched for in that entry. **182 match their own entry. 17 carry text from a
different entry:**

| App path (`divisions[0].…`) | App course | The app text actually belongs to | The course's own guide entry |
| --- | --- | --- | --- |
| `departments[3].courses[0].description` | Options English 9 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[1].description` | Options English 10 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[2].description` | Options English 11 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[3].description` | Options English 12 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[4].description` | Options Year 1 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[5].description` | Options Year 2 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[6].description` | Options Year 3 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[7].description` | Options Year 4 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[8].description` | Options PE | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[9].description` | Math Life 1 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[10].description` | Math Life 2 | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[11].description` | Options Personal Finance | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[12].description` | Options Financial Management | Introduction to Philosophy: Human Person 504 | no description: a header, grade and prerequisite only (section B) |
| `departments[3].courses[13].description` | Pathway Program | Introduction to Philosophy: Human Person 504 | Pathway Program 507 (section C) |
| `departments[6].courses[13].description` | Advanced Placement Physics 1: Algebra-Based | Advanced Placement Physics C: Mechanics 847 | Advanced Placement Physics 1: Algebra-Based 848 (section C) |
| `departments[7].courses[16].description` | Advanced Placement European History | Faith and Revelation: Knowing 013 | Advanced Placement European History 955 (section C) |
| `departments[9].courses[8].description` | Introduction to Photography | Photography II 328 | Introduction to Photography 316 (section C) |

The 14 Options Program / Pathways Program rows all carry the description of **Introduction to
Philosophy: Human Person (504)**, the next described entry after that section. The guide gives the
13 Options courses no description at all. AP Physics 1 carries AP Physics C: Mechanics; AP European
History carries the theology course Faith and Revelation: Knowing (013), which follows it in the
guide; Introduction to Photography carries Photography II (328).

## B. Options Program entries (no course description in the guide)

The guide prints only a header, a grade and a prerequisite for each, under this section introduction
(verbatim, S1):

> This program is designed using a dual approach to foster student growth and independence: Life Skills Curriculum: Specialized English and Mathematics courses focus on developing essential life skills, providing students with practical knowledge and competencies for daily living and future independence. Inclusive Learning Opportunities: Students participate in classes alongside their peers, promoting social integration, academic growth, and a sense of belonging within the broader school family. Through this balanced approach, the Options Program ensures that each student receives the personalized support they need while fully participating in our vibrant Catholic community.

| Course | Code | Grade | Prerequisite |
| --- | --- | --- | --- |
| Options English 9 | 291 | 9th | Enrollment in the Options Program |
| Options English 10 | 292 | 10th | Enrollment in the Options Program |
| Options English 11 | 293 | 11th | Enrollment in the Options Program |
| Options English 12 | 294 | 12th | Enrollment in the Options Program |
| Options Year 1 | 586 | 9th | Enrollment in the Options Program |
| Options Year 2 | 587 | 10th | Enrollment in the Options Program |
| Options Year 3 | 588 | 11th | Enrollment in the Options Program |
| Options Year 4 | 589 | 12th | Enrollment in the Options Program |
| Options PE | 502 | 9-12 | Enrollment in the Options Program |
| Math Life 1 | 691 | 9th | Enrollment in the Options Program |
| Math Life 2 | 692 | 10th | Enrollment in the Options Program |
| Options Personal Finance | 693 | 11th | Enrollment in the Options Program |
| Options Financial Management | 694 | 12th | Enrollment in the Options Program |

## C. Full descriptions

One entry per course, in app order. **Eligibility** is the guide's own header block (grade,
required/elective, prerequisites, quality points); **Description** is the guide's full text.

### English 10 — 222

- **App path:** `departments[0].courses[4].description`
- **Eligibility:** Grade: 10th Required Prerequisites: English 9 Quality Points: A = 4
- **Description:** This course includes the study of World Literature through novels, short stories, drama, and poetry; grammar fundamentals and the reinforcement of these essential grammar skills within the context of writing assignments; introduction to evaluative and analytical essays including the use of secondary sources; continuation of vocabulary development, reading comprehension, and literary terms. This course meets for a full year.

### Advanced English 10 — 221

- **App path:** `departments[0].courses[5].description`
- **Eligibility:** Grade: 10th Required Prerequisites: Advanced English 9 with a minimum B average or English 9 with a minimum A- average. Quality Points: A = 4
- **Description:** This course includes the study of World Literature through novels, short stories drama, and poetry; grammar fundamentals and the reinforcement of these essential grammar skills within the context of writing assignments; introduction to evaluative and analytical essays including the use of secondary sources; continuation of vocabulary development, reading comprehension, and literary terms. This course meets for a full year.

### English 11 — 232

- **App path:** `departments[0].courses[8].description`
- **Eligibility:** Grade: 11th Required Prerequisites: English 10 Quality Points: A = 4
- **Description:** This course includes writing skills techniques (e.g., prewriting, organization, drafting, revisions, etc.); documented essays using primary and, in some cases, secondary sources; concentrated practice in literary analysis; reading comprehension; continued vocabulary development; and general survey of the literary periods and genres of American Literature, with attention to historical and social contexts. This course meets for a full year.

### Honors English 11 — 231

- **App path:** `departments[0].courses[9].description`
- **Eligibility:** Grade: 11th Required Prerequisites: Honors English 10 with a minimum C average or Advanced English 10 with a minimum B average or English 10 with a minimum A average. Quality Points: A = 5
- **Description:** This course includes writing skills techniques (e.g., prewriting, organization, drafting, revision, etc.,); documented essays using primary and secondary resources; concentrated practice in writing analytical essays; reading comprehension; continued vocabulary development; and general survey of the literary periods and genres of American Literature. Students will be required to read additional texts and write frequent short papers. This course meets for a full year.

### English 12 — 242

- **App path:** `departments[0].courses[11].description`
- **Eligibility:** Grade: 12th Required Prerequisites: English 11 Quality Points: A = 4
- **Description:** This course includes a survey of British Literature; review and practice of paragraph and essay structure; reinforcement of essential grammar skills within the context of writing assignments; reading comprehension, summary and analysis; composition resulting in documented essays using both primary and, in some cases, secondary sources; and vocabulary development. This course meets for a full year.

### Assistants — 573

- **App path:** `departments[1].courses[2].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: None Quality Points: None: Grade not weighted into the GPA
- **Description:** Assistants will be assigned tasks for the office, counselors, alumni and campus ministry. Evaluation is based on their willingness to learn, initiative and performance of assigned tasks, and demonstrated competencies within the area assigned. Supervising staff members will make evaluations on student performance. This course may only be taken one time. This course meets for a semester.

### Options Scholars — 536

- **App path:** `departments[1].courses[4].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Application required. Students must be interviewed and have the approval of the Dean of Students and the Options teachers. Students must participate in the Options Scholar training. Quality Points: A = 4
- **Description:** Students will serve as academic peer mentors for those enrolled in the Options Program. In this role, Options Scholars will develop meaningful peer relationships while learning about various intellectual and developmental disabilities. Scholars are responsible for supporting Options students in achieving their academic goals through tutoring and modeling positive work and social habits. Options Scholars will attend general education and Options classes with the students. This course is appropriate for students interested in exploring careers in special education, child development, or related fields. This course meets for a semester.

### Honors Latin American Influence — 535

- **App path:** `departments[1].courses[8].description`
- **Eligibility:** in the United States Grade: 11th, 12th Elective Prerequisites: None Quality Points: A = 5
- **Description:** This interdisciplinary course is designed for the students to explore the Latino influence in the United States in the last century. This course will provide an in-depth understanding of the Latino experience. This class is discussion and project based implementing a Socratic-style seminar approach. Students will be expected to actively engage based on the readings. This course meets for a semester.

### Personal Finance — 134

- **App path:** `departments[1].courses[9].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course is designed to provide students with personal skills needed daily. Topics of study include establishing a bank account and maintaining a checkbook and debit card, computing personal income tax and analyzing employment taxes. Students will understand how consumer credit works and the pitfalls of credit cards, constructing a personal budget, analyzing investments and retirement funds, and more. This course meets for a semester.

### Honors Civil and Construction Engineering — 578

- **App path:** `departments[1].courses[18].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Introduction to Engineering with a minimum A- average or instructor approval. Quality Points: A = 5
- **Description:** This course is designed to prepare students for college level courses in these fields. Students will explore design concepts including building systems, building materials, structures and loads, transportation, and environmental concepts related to the field of civil engineering. Students will learn about various types of bridges and the basics of structural analysis. Students will also design city infrastructure and practice city planning. Throughout the course, teams of students will follow the engineering design process to complete hands-on activities and projects to develop and demonstrate learning. This course meets for a semester.

### Algebra I — 612

- **App path:** `departments[2].courses[0].description`
- **Eligibility:** Grade: 9th Required Prerequisites: Pre-Algebra, eighth grade math performance, local percentile on the High School Placement Test or other standardized test scores and input provided by the student’s eighth grade math teacher. Quality Points: A = 4
- **Description:** This course includes a review of operations with integers, fractions, and decimals; solving equations and inequalities in one variable; introduction to functions; linear functions; systems of linear equations and systems of linear inequalities; operations with polynomials; factoring polynomials; quadratic functions; and displays of categorical and quantitative data and numerical summaries of quantitative data. This course meets for a full year.

### Advanced Algebra I — 613

- **App path:** `departments[2].courses[1].description`
- **Eligibility:** Grade: 9th Required Prerequisites: Pre-Algebra, eighth grade math performance, local percentile on the High School Placement Test or other standardized test scores and input provided by the student’s eighth grade math teacher. Quality Points: A = 4
- **Description:** This course includes a brief review of operations with integers, fractions, and decimals; solving equations and inequalities in one variable; introduction to functions; linear functions; systems of linear equations and systems of linear inequalities; operations with polynomials; factoring polynomials; quadratic functions; and displays of categorical and quantitative data and numerical summaries of quantitative data. This course meets for a full year.

### Honors Geometry — 623

- **App path:** `departments[2].courses[4].description`
- **Eligibility:** Grade: 9th, 10th Required Prerequisites: Middle school Algebra with a minimum A- test average. Local percentile scores on the High School Placement Test are considered and utilized. Advanced Algebra at CCHS with a minimum A test average. Quality Points: A = 5
- **Description:** This rigorous course is designed for students who possess a strong work ethic and ability to think critically and includes the in depth study of basic terms and symbols; congruence and similarity of polygons and circles; parallel and perpendicular lines; transformations and proofs. This course meets for a full year.

### Honors Algebra II — 633

- **App path:** `departments[2].courses[7].description`
- **Eligibility:** Grade: 10th, 11th Required Prerequisites: Advanced or Honors Geometry. Placement is determined using a 9-point system that considers three factors: the Semester 1 Geometry grade, the Semester 1 midterm exam score, and the PSAT Math score. Students must earn a minimum of 5 and students who score a 4 will have the opportunity to take an Algebra I skills assessment. A minimum score of 85% on this assessment is required. Quality Points: A = 5
- **Description:** This rigorous course is designed for students who possess a strong work ethic and ability to think critically and includes the in depth study of linear, quadratic, exponential, logarithmic, radical, rational and trigonometric functions; complex numbers; correlation and regression; normal models; and confidence intervals for proportions and means. This course meets for a full year.

### Honors Pre-Calculus — 643

- **App path:** `departments[2].courses[12].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Advanced or Honors Algebra 2. Placement is determined using a 9-point system that considers three factors: the Semester 1 Algebra 2 grade, the Semester 1 midterm exam score, and the PSAT Math score. Students must earn a minimum of 5 points. Quality Points: A = 5
- **Description:** This rigorous course is designed for students who possess a strong work ethic and ability to think critically and includes the further development and analysis of functions including polynomial, rational, exponential, and logarithmic and trigonometric functions. Also included are probability, counting, sequences and series, conic sections, the complex number system, and hypothesis testing for means and proportions. This course meets for a full year.

### Advanced Placement Calculus BC — 651

- **App path:** `departments[2].courses[16].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: Honors Pre-Calculus. AP course placement is determined through an application process that considers academic credentials, including PSAT Math scores. Quality Points: A = 5
- **Description:** Advanced Placement Calculus BC is roughly equivalent to both first and second semester college calculus courses and includes the content learned in Calculus AB while extending it to different types of equations and introduces the topic of sequences and series. The AP course covers topics in differential and integral calculus, including concepts and skills of limits, derivatives, definite integrals, the Fundamental Theorem of Calculus, and series. The course teaches students to approach calculus concepts and problems when they are represented graphically, numerically, analytically, and verbally, and to make connections amongst these representations. Students learn how to use technology to help solve problems, experiment, interpret results, and support conclusions. All students are required to take the College Board AP Calculus BC exam in May. This course meets for a full year. This program is designed using a dual approach to foster student growth and independence: Life Skills Curriculum: Specialized English and Mathematics courses focus on developing essential life skills, providing students with practical knowledge and competencies for daily living and future independence. Inclusive Learning Opportunities: Students participate in classes alongside their peers, promoting social integration, academic growth, and a sense of belonging within the broader school family. Through this balanced approach, the Options Program ensures that each student receives the personalized support they need while fully participating in our vibrant Catholic community.

### Pathway Program — 507

- **App path:** `departments[3].courses[13].description`
- **Eligibility:** (no grade or prerequisite line)
- **Description:** This extension of the Options Program is designed to support students in continuing their academic, vocational, and independent living growth beyond the traditional high school experience. Over the course of two years, students participate in structured, individualized instruction that strengthens essential life skills, workplace readiness, social communication, community navigation, and college readiness. The program blends classroom learning with real-world practice, offering opportunities such as job training, internships, guided community experiences, and continued academic development based on each student’s needs.

### Logic — 517

- **App path:** `departments[4].courses[2].description`
- **Eligibility:** Grade: 10th Elective Required for members of St. Augustine Scholars Program Prerequisites: Introduction to Philosophy Quality Points: A = 4
- **Description:** Logic is the art of habitually reasoning from true premises to true conclusions. The purpose of this course is to cultivate a student’s ability to think critically and apply logical reasoning across a variety of subject matters. Through familiarity with the various kinds of logic and argumentation, students will be able to identify proper logical forms, expose fallacies, and train their mind to acquire those intellectual virtues, the final end of which is truth. This course meets for a semester.

### Health — 512

- **App path:** `departments[5].courses[0].description`
- **Eligibility:** Grade: 9th Required Prerequisites: None Quality Points: A = 4
- **Description:** The Health course aims to foster a holistic understanding of health, emphasizing the connection between physical, mental, emotional, and spiritual well-being. Students will explore essential topics related to personal health, healthy lifestyles, and decision-making while developing the skills necessary to make informed decisions about their health and well-being. The course aligns with our mission statement and the Catholic values of stewardship over one’s body as a gift from God. This course meets for a semester.

### Men’s Weightlifting — 522

- **App path:** `departments[5].courses[3].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course is designed to educate students on the proper techniques of weightlifting, how to target specific muscle groups and the design and implementation of using a lifting schedule specifically to the needs of the male population. Students may choose this course as an elective more than once. Each student is required to dress in appropriate gym attire. This course meets for a semester.

### Women’s Weightlifting — 530

- **App path:** `departments[5].courses[4].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course is designed to educate students on the proper techniques of weightlifting, how to target specific muscle groups and the design and implementation of using a lifting schedule specifically to the needs of the female population. Students may choose this course as an elective more than once. Each student is required to dress in appropriate gym attire. This course meets for a semester.

### Biology — 822

- **App path:** `departments[6].courses[0].description`
- **Eligibility:** Grade: 9th Required Prerequisites: Eighth grade science performance, local percentile on the High School Placement Test or other standardized test scores and input provided by the student’s 8th grade science teacher. Quality Points: A = 4
- **Description:** The primary objective of this course is to introduce the student to a broad, general understanding of the fundamental principles of biology through a study of humans and their interaction with other organisms and their mutually shared environment. This course includes the study of cell structure and function, function and structure of plants and animals (systems study), reproduction, genetics, evolution and ecology. Laboratory exercises, dissection, and lab reports are significant factors in the course evaluation. This course meets for a full year.

### Advanced Chemistry — 829

- **App path:** `departments[6].courses[3].description`
- **Eligibility:** Grade: 10th, 11th, 12th Required Prerequisites: Advanced Biology with a minimum C+ average or Biology with a minimum B- average. Advanced Algebra I with a minimum B- average, Honors Geometry with a minimum C average, or Advanced Geometry with a minimum C+ average. Quality Points: A = 4
- **Description:** This course covers the fundamentals of chemistry. Topics will include, but are not limited to, atomic structure, writing chemical names and formulas, balancing chemical equations, solving stoichiometric problems, behavior of gases, properties of solutions, and acid-base chemistry. Students will participate in lab activities and will be evaluated on their performance and lab reports. Information in this course is progressive by nature and requires recall of information accumulated throughout the year. This course meets for a full year.

### Honors Chemistry — 832

- **App path:** `departments[6].courses[4].description`
- **Eligibility:** Grade: 10th, 11th, 12th Required Prerequisites: Advanced Biology with a minimum B+ average or Biology with a minimum A average. Advanced Algebra I with a minimum A- average, Honors Geometry with a minimum B average, or Advanced Geometry with a minimum B+ average. Quality Points: A = 5
- **Description:** This rigorous course is designed for students who possess a strong work ethic and the ability to think critically. This class covers the structure, properties, and changes of matter. The content includes atomic structure, bonding, chemical names and formulas, periodic properties, chemical equations and types of reactions, stoichiometric calculations, acid base theories, and topics in redox and equilibrium. Laboratory activities and their written results are relevant to course evaluation. This course meets for a full year.

### Honors Anatomy and Physiology — 844

- **App path:** `departments[6].courses[8].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Honors Chemistry with a minimum B average or Advanced Chemistry with a minimum A average Quality Points: A = 5
- **Description:** This rigorous course is designed for students who possess a strong work ethic and the ability to think critically. It is a yearlong, elective course designed for those students who may want to enter the medical or biological fields. The course is an in-depth study of the systems of the human body. Emphasis is placed on the structure and function of the digestive, circulatory, respiratory, locomotive (skeletal and muscular), and excretory systems. Students will be required to learn the parts of each system, understand the functions of each part, and the interdependence of the systems. Dissection and a research paper are required. Strong memorization skills are required for success. This course meets for a full year.

### Advanced Placement Physics 1: Algebra-Based — 848

- **App path:** `departments[6].courses[13].description`
- **Description:** Advanced Placement Physics 1 is an algebra-based, introductory college-level physics course. Students cultivate their understanding of physics by developing models of physical phenomena through inquiry-based investigations. Students build their understanding of physical models as they explore and solve problems in these content areas: Kinematics, Forces and Translational Dynamics, Work, Energy, and Power, Linear Momentum, Torque and Rotational Dynamics, Energy and Momentum of Rotating Systems, Oscillations, and Fluids AP Physics 1 is equivalent to the first course in an introductory college course sequence in algebra-based physics. This course should be taken before AP physics C: Mechanics which is the college equivalent to a college first semester calculus based physics course for engineers and physical science majors. All students are required to take the College Board AP Physics 1: Algebra-Based exam in May. This course meets for a full year.

### Advanced Placement Physics C: Mechanics — 847

- **App path:** `departments[6].courses[14].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: Honors Physics with a minimum A- average. AP Calculus must be taken concurrently. AP course placement is determined through an application process that considers academic credentials, including PSAT Evidence-Based Reading and Writing and Math scores. Quality Points: A = 5
- **Description:** This course is a full year in-depth study of Newtonian mechanics. The content includes kinematics, Newton’s laws of motion, work, energy and power, systems of particles and linear momentum, circular motion and rotation, and oscillations and gravitation. The course is heavily lab based. Students will be required to keep a lab notebook. Students will be involved in problem solving that will include the use of calculus. All students are required to take the College Board AP Physics C: Mechanics exam in May. This course meets for a full year.

### Advanced World History — 922

- **App path:** `departments[7].courses[1].description`
- **Eligibility:** Grade: 10th Required Prerequisites: Advanced English 9 with a minimum B average or English 9 with a minimum A- average. Quality Points: A = 4
- **Description:** Students will explore this broad scope by reading actively and creatively, evaluating historical evidence using primary and secondary sources, analyzing visual materials, interpreting data, and recognizing point of view and bias. As this is an Advanced level course, students will also engage in historical writing and will continue to refine the historical thinking and analytical skills that students are expected to have developed before coming into this class. This covers the same time period as college prep World History, but students will be required to write at a higher level and higher frequency. Students in Advanced World History should expect less direct teaching of facts and more time spent on higher level analytical questions of historical events. Though they will still be responsible for knowing and understanding historical events, more of this knowledge must come from their reading of required textbook materials. This course meets for a full year.

### Honors World History — 924

- **App path:** `departments[7].courses[2].description`
- **Eligibility:** Grade: 10th Required Prerequisites: Advanced English 9 with a minimum B+ average or English 9 with a minimum A average. Selection process that considers academic credentials, including minimum 500 PSAT Evidence-Based Reading and Writing scores. Quality Points: A = 5
- **Description:** Honors World History is the highest-level World History class at Charlotte Catholic. Deadlines for assignments are often given days and even weeks in advance, so students must plan their work and manage their time to be successful in this class. The purpose of this course is to not only teach students about the general themes in World History, but also to prepare students for their U.S. History classes that they will take junior year. The course begins with Ancient World history, focusing on religions, empires, and introductory skills. From there, the course moves to early China and concludes with the Cold War. The course places a strong emphasis on thinking and writing skills, making assigned reading imperative. This is not a Eurocentric class. While students will learn European history, they will also learn a great deal about Africa, Asia, and Latin America.This course meets for a full year.

### Honors U.S. History — 932

- **App path:** `departments[7].courses[5].description`
- **Eligibility:** Grade: 11th Required Prerequisites: Honors World History with a minimum B average, Advanced World History with a minimum B+ average, or World History with a minimum A average. Quality Points: A = 5
- **Description:** This course examines the major topics of United States history in greater depth and with more rigor than college prep U.S. History. While students study the same general historical periods, the course places increased emphasis on independent reading, analysis of primary and secondary sources, and historical writing. Students analyze visual and quantitative sources, interpret data, and recognize historical perspective, point of view, and bias. As an Honors level course, students are expected to engage regularly in analytical writing and to further refine the historical thinking skills developed in their World History class. Instruction places less emphasis on direct teaching of factual content and more on higher level analysis, with students responsible for acquiring much of their content knowledge through assigned readings. This course meets for a full year.

### Honors Politics — 940

- **App path:** `departments[7].courses[10].description`
- **Eligibility:** Grade: 12th Required Prerequisites: AP U.S. History with a minimum B average, Honors U.S. History with a minimum B+ average, or U.S. History with a minimum A average. Quality Points: A = 5
- **Description:** This course covers the same foundational topics as the college prep level U.S. Government course, but with greater depth, pace, and academic rigor. Students engage in more extensive reading and writing assignments and are expected to analyze primary source documents, legal texts, and current political issues at a higher level. The course enables students to develop a deeper understanding of the principles and philosophies that shape the American political system, including constitutional foundations, federalism, civil liberties, and the structure and function of national and state governments. Emphasis is placed on critical thinking, analytical writing, and informed discussion, with students expected to synthesize information from multiple sources and articulate well-supported arguments. This course is designed for students who demonstrate strong reading and writing skills. This course meets for a semester.

### Honors Economics — 950

- **App path:** `departments[7].courses[13].description`
- **Eligibility:** Grade: 12th Required Prerequisites: Course placement is determined through a process that considers academic credentials, including minimum 1050 total PSAT score. Quality Points: A = 5
- **Description:** This class provides students with a thorough understanding of the principles of economics that apply to the behavior of individual decision makers, including consumers and producers, within the larger economic system. The course places primary emphasis on the nature and functions of product markets and includes the study of market factors, incentives, and the role of government in promoting efficiency and equity in the economy. Students examine how scarcity and unlimited wants require individuals and societies to make choices and evaluate trade-offs. As an Honors level course, students engage more deeply with economic models, data analysis, and quantitative reasoning and are expected to apply economic concepts to more complex real world scenarios. Successful students in this course have demonstrated an above average aptitude in math. This course meets for a semester.

### Advanced Placement European History — 955

- **App path:** `departments[7].courses[16].description`
- **Description:** In this course, students study key events, figures, and developments from 1450 to the present. They practice historian skills such as analyzing sources, forming arguments, and understanding historical connections like comparison, causation, and change. The course also covers seven themes to link historical developments across time and place: Europe’s global interaction, economic growth, cultural and intellectual shifts, power structures, social change, identity, and technological innovation. All students are required to take the College Board AP European History exam in May. This course meets for a full year.

### The Mystery of Redemption and Christian — 023

- **App path:** `departments[8].courses[3].description`
- **Eligibility:** Discipleship Grade: 10th Required: 1st Semester Prerequisites: None Quality Points: A = 4
- **Description:** This course examines the meaning of redemption; Original Sin; and how the salvific promise made to our first parents is fulfilled in the life, Death, Resurrection, and Ascension of Jesus Christ. Next, it explains how the Church continues the redemptive mission of Jesus Christ in the world today and how his redemption is applied in our own lives. The course also looks at how we are called to be formed in the image of Christ, who is the exemplar of the Christian life, and to cooperate with God’s grace in every instance of our lives. This course meets for a semester.

### The Church: Sacrament of Salvation — 024

- **App path:** `departments[8].courses[4].description`
- **Eligibility:** Grade: 10th Required: 2nd Semester Prerequisites: None Quality Points: A = 4
- **Description:** The Church, which is established by Jesus Christ and guided by the Holy Spirit, continues the salvific ministry of Christ in the world today; thus, the Church is both the Sacrament of Communion and the Sacrament of Salvation. This course presents the mission of the Church; her infallible teaching authority; the Sacraments as the primary means of transmitting God’s grace; the role of the Blessed Virgin Mary, the Mother of the Church; the Universal Call to Holiness; and the four marks of the Church. This course meets for a semester.

### SASP Theology 10: Wisdom of the Fathers — 075

- **App path:** `departments[8].courses[5].description`
- **Eligibility:** Grade: 10th Required For members of St. Augustine Scholars Program Prerequisites: All SASP courses with a minimum B+ average and Department Chair approval. Quality Points: A = 4
- **Description:** This course will immerse students in the works of the major Fathers of the Church and discuss their influence on the theological development of the Church and its understanding of Divine Revelation (Sacred Tradition and Sacred Scripture). Students will be expected to understand the Patristic (Fathers of the Church) Tradition of the Church. How does Patristic understanding of Revelation and historical proximity to the Apostles inform Catholic theology? Students should be able to answer this question. Through close reading of primary texts from the Church Fathers and participation in Socratic seminars, students will develop advanced skills in critical reasoning, textual interpretation, and theological analysis. This course meets for a full year.

### Vocations and the Universal Call to Holiness — 051

- **App path:** `departments[8].courses[9].description`
- **Eligibility:** Grade: 12th Required: 1st Semester (051 or 046) Prerequisites: None Quality Points: A = 4
- **Description:** This course explores the vocations of life that spring from our Baptism and how God calls each of us to holiness on earth and to eternal life with him in heaven. This course examines the universal call to holiness and its importance in the Christian life. It also analyzes the unique plan that God has for each individual in the vocations to Marriage, Holy Orders, the consecrated life, and the committed single life. Finally, it explains how each person can prayerfully discern the will of God in his or her own life. This course meets for a semester.

### The Social Doctrine of the Catholic Church — 045

- **App path:** `departments[8].courses[10].description`
- **Eligibility:** Grade: 12th Required: 2nd Semester (045 or 043) Prerequisite: None Quality Points: A = 4
- **Description:** This course introduces students to the social teachings of the Catholic Church, a rich body of thought covering love and family, law and justice, war and peace, wealth and poverty, rights and duties, and freedom and obligation. This course shows how through the ages the Magisterium of the Church responds to social developments by interpreting Divine Revelation and teaching the demands of the Gospel with authority. The student will learn how Christ’s divine love for others, especially the poor and most vulnerable, is present today in the Church’s social doctrine and mission. This course meets for a semester.

### Introduction to Photography — 316

- **App path:** `departments[9].courses[8].description`
- **Description:** Introduction to Photography is a visual arts course that introduces the foundations of photography. Students looking into photography as an interest, a hobby, or a potential career are welcome to join this course. Students will learn the basic elements of photographic composition while learning how to use a digital SLR camera. In this introductory course students will primarily focus on available light photography and will learn how to use the DSLR camera controls to control and creatively employ available light in their photographs. Students will utilize either Canon or Nikon DSLR cameras and lenses furnished in the classroom, or they may choose to use their own DSLR cameras, if they have one, upon approval of the teacher. They will utilize the Adobe Creative Suite of applications on their MacBooks for cataloging and editing their images via the school’s license.This course meets for a semester.

### Digital Art, Graphics, and Anime — 380

- **App path:** `departments[9].courses[12].description`
- **Eligibility:** Grade: 9th Elective Prerequisites: None Quality Points: A = 4
- **Description:** How digital art and graphics including anime took over the world. Students in this course will take a visual romp through the evolution of comics and advertising graphics, including the current anime craze, over the past century. From the beginnings of comic strips to sell newspapers in the late nineteenth century and the emerging use of graphics to create brand identities and advertising campaigns in the early twentieth century, to the evolution of art styles in strip comics, the emergence of graphic arts to tell extended stories (comic books), and the current craze for anime and related digital artistic styles, this course will review the phenomenal emergence of graphic designs, and more recently, digital graphic designs, in media. Through a series of visual case studies students will discover the evolution in artistic styles in comics and advertising. We will explore how these artistic styles became a dominant force in the culture. We will discover the origin of Japanese anime and how it came to be a vibrant force in Western comics and storytelling. Students will research individual strips, comic characters, and graphic advertising campaigns to discover novel artistic styles and investigate how they came to be so successful. This course meets for a semester.

### Honors Theatre: Design and Tech — 369

- **App path:** `departments[9].courses[24].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Department Approval and demonstration of skill set Quality Points: A = 5
- **Description:** Perfect the craft, create and apply the vision. This advanced element of the course not only allows students to create the sets but gives them the tools to work in a professional setting, where all the concepts of design and aesthetics come to fruition. Students now have the ability to create art through advanced woodworking. Students in this course are in charge of all lighting and sound requirements for our school and facilities. They take additional time to set up and break down for school Masses and events. These students also take leadership positions in all theatrical productions as well. Students will exemplify the principles of backstage work by achieving effects within a budget and placing craftsmanship as their top priority. They will apply the use of lighting, sound, and scenery to support the director’s vision, develop an understanding of what works and what does not, and efficiently lead a technical crew. This course meets for a semester.

### Dance I — 314

- **App path:** `departments[9].courses[30].description`
- **Eligibility:** Grade: 9th Elective Prerequisites: None Quality Points: A = 4
- **Description:** Dance I is an introductory course for incoming freshmen with little or no formal dance instruction, but offered to those interested in learning and possibly furthering their dance knowledge and technique. All areas of dance are studied including basic choreography skills and the study of dance history. This class enables the student to be prepared for perfor-mance level dance sophomore-senior year, if applicable. This course meets for a semester.

### Dance II — 323

- **App path:** `departments[9].courses[31].description`
- **Eligibility:** Grade: 10th, 11th and 12th Elective Prerequisites: Selection by audition or completed Dance I Quality Points: A = 4
- **Description:** Dance II is an intermediate to advanced level dance class in which students with previous dance experience either outside of school or through Dance I freshman year can continue to improve their dance techniques and performance skills. The students explore various dance styles and focus on the memorization of planned choreography for 1 required staged performance per semester. The course meets for a semester.

### Honors Dance III — 354

- **App path:** `departments[9].courses[32].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Selection by audition or completed Dance II Quality Points: A = 5
- **Description:** Dance III is an honors level performance course which highlights the advanced technique skills of students through the application of choreography The class meets the full year and two staged recitals are required including the use of student choreographed pieces. The purchase of appropriate dance shoes is required. This course meets for a full year.

### Concert Band — 326

- **App path:** `departments[9].courses[33].description`
- **Eligibility:** Grade: 9th, 10th, 11th, 12th Elective Prerequisites: Middle school band experience, private lessons, or audition Quality Points: A = 4
- **Description:** Students with playing experience are eligible for this class through an audition. Students accepted into this ensemble are expected to be proficient on their instrument, have a basic knowledge of music theory, and be fluent in reading music. various styles of band literature and method books are used to develop individual and group performance skills. Emphasis is placed on tone quality, intonation, and advanced/ extended techniques. Students will be expected to attend after school rehearsals and performances. Members of the ensemble are expected to be in the marching band in the fall. Students who play wind instruments should sign up for this course. At home practice is a required aspect of class enrollment. Performance events related to class participation are mandatory. This course meets for a full year.

### Percussion — 372

- **App path:** `departments[9].courses[35].description`
- **Eligibility:** Grade: 9th, 10th, 11th, 12th Elective Prerequisites: Middle school percussion experience, private lessons, or audition Quality Points: A = 4
- **Description:** This class is for members of the symphonic band who play percussion instruments. The class will cover the fundamentals of playing percussion instruments and application of musicianship skills to the genre. Members will perform as members of the Symphonic Band in all concerts. In addition, members will perform percussion ensemble literature throughout the year. Students will be expected to attend after school rehearsals and performances. Members of the ensemble are expected to be in the marching band in the fall. Students who play percussion instruments should sign up for this course. This course meets for a full year.

### Guitar II — 327

- **App path:** `departments[9].courses[38].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Guitar I or audition (Nylon-string acoustic guitar is required.) Quality Points: A = 4
- **Description:** This course is designed for the intermediate-advanced guitar student. The course will be a continuation of the material covered in Guitar I with more emphasis on improving the fundamentals with sight reading, scales, chord spellings, modes and finger picking. Students will be asked to perform in groups as well as solo. This course meets for a semester.

### Advanced French III — 432

- **App path:** `departments[10].courses[3].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Advanced French II with a minimum B- average or French II with a minimum B+ average Quality Points: A = 4
- **Description:** This course is an advanced course designed to develop in the students a greater understanding and comprehension of the French language, by continuing the development and application of the language on reading, writing, listening and speaking, with a strong emphasis on grammatical concepts and oral communication. By speaking in the target language, the students are expected to express the vocabulary and the grammar concepts that they have been taught. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the French-speaking world. This course meets for a full year.

### Honors French III — 431

- **App path:** `departments[10].courses[4].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Advanced French II with a minimum A- average Quality Points: A = 5
- **Description:** This course is designed to prepare the student for Honors Spanish IV or AP French Language and Culture, developing in the student a greater comprehension and understanding of more complex reading, writing, listening and speaking. Students work at a rapid pace, and are expected to speak and present in the target language. Vocabulary and advanced grammar and idioms practice is incorporated in speaking and writing assignments. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the French-speaking world. This course meets for a full year.

### Advanced Placement French V — 445

- **App path:** `departments[10].courses[6].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: Honors French IV with a minimum B average or Honors French III with a minimum A average. AP course placement is determined through an application process that considers academic credentials. Quality Points: A = 5
- **Description:** The Advanced Placement French Language and Culture course is equivalent to an introductory college-level course and is designed to advance students’ communicative proficiency in French within a culturally rich and content-based framework. The course develops students’ abilities to understand spoken French in a variety of contexts; to read and interpret authentic materials such as newspapers, literary texts, and other media with increasing independence; and to express ideas clearly and accurately in both written and spoken French. All class discussion and oral practice are conducted exclusively in French. Students develop proficiency across all communication modes- interpersonal, interpretive, and presentational- through content-based instruction and meaningful practice. On a cultural level, students deepen their understanding of the geographical, historical, artistic, religious, and everyday life and societal practices of the French-speaking world. All students are required to take the College Board AP French Language and Culture exam in May. This course meets for a full year.

### Honors German III — 436

- **App path:** `departments[10].courses[9].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: German II with a minimum B- average Quality Points: A = 5
- **Description:** This course is designed to prepare the student for Honors German IV or AP German Language and Culture, developing in the student a greater comprehension and understanding of more complex reading, writing, listening and speaking. Students work at a rapid pace, and are expected to speak and present in the target language. Vocabulary and advanced grammar and idioms practice is incorporated in speaking and writing assignments. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the Spanish-speaking world. This course meets for a full year.

### Advanced Placement German V — 451

- **App path:** `departments[10].courses[11].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: Honors German III with a minimum A average or Honors German IV with a minimum B average. AP course placement is determined through an application process that considers academic credentials. Quality Points: A = 5
- **Description:** The Advanced Placement German Language and Culture course is equivalent to an introductory college-level course and is designed to advance students’ communicative proficiency in German within a culturally rich and content-based framework. The course develops students’ abilities to understand spoken German in a variety of contexts; to read and interpret authentic materials such as newspapers, literary texts, and other media with increasing independence; and to express ideas clearly and accurately in both written and spoken German. All class discussion and oral practice are conducted exclusively in German. Students develop proficiency across all communication modes- interpersonal, interpretive, and presentational- through content-based instruction and meaningful practice. On a cultural level, students deepen their understanding of the geographical, historical, artistic, religious and everyday life and societal practices of the German-speaking world. All students are required to take the College Board AP German Language and Culture exam in May. This course meets for a full year.

### Latin II — 423

- **App path:** `departments[10].courses[13].description`
- **Eligibility:** Grade: 9th,10th, 11th, 12th Elective Prerequisites: Latin I Quality Points: A = 4
- **Description:** This course is designed to continue the foundation learned in Latin I and build a greater understanding of complex sentence structures, increase vocabulary and help students prepare to read from well known authors from the ancient world. On the cultural level, students will continue to learn about geographical, historical, artistic, mythological, religious, and societal concepts of ancient Rome and her empire. This course meets for a full year.

### Advanced Latin II — 427

- **App path:** `departments[10].courses[14].description`
- **Eligibility:** Grade: 9th,10th, 11th, 12th Elective Prerequisites: Latin I with a minimum B+ average Quality Points: A = 4
- **Description:** This course is designed to continue the foundation learned in Latin I and build a greater understanding of complex sentence structures, increase vocabulary and help students prepare to read from well known authors from the ancient world. In the Advanced level, the linguistic level of instruction and communication will be more complex, the curriculum will move at a faster pace, and students will be held to more rigorous expectations. On the cultural level, students will continue to learn about geographical, historical, artistic, mythological, religious, and societal concepts of ancient Rome and her empire. This course meets for a full year.

### Advanced Latin III — 409

- **App path:** `departments[10].courses[15].description`
- **Eligibility:** Grades: 10th, 11th, 12th Elective Prerequisites: Advanced Latin II with a minimum B- average or Latin II with a minimum B+ average Quality Points: A = 4
- **Description:** Advanced Latin III will further review and apply Latin vocabulary and grammar. Students will explore readings in adapted and authentic Latin literature, while learning to read and interpret prose and poetry. Increased reading proficiency is the primary emphasis of this course. Students will read passages from Caesar, Catullus, and Vergil, and will explore the figures of speech and rhetoric within. Students will also expand their knowledge of mythology and Roman culture as they learn about the daily life, religion, and society of the ancient Roman. This course meets for a full year.

### Advanced Spanish III — 465

- **App path:** `departments[10].courses[22].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Advanced Spanish II with a minimum B average or Spanish II with a minimum B+ average Quality Points: A = 4
- **Description:** This course is an advanced course designed to develop in the students a greater understanding and comprehension of the Spanish language, by continuing the development and application of the language on reading, writing, listening and speaking, with a strong emphasis on grammatical concepts and oral communication. By speaking in the target language, the students are expected to express the vocabulary and the grammar concepts that they have been taught. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the Spanish-speaking world. This course meets for a full year.

### Honors Spanish III — 434

- **App path:** `departments[10].courses[24].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Advanced Spanish II with a minimum A- average Quality Points: A = 5
- **Description:** This course is designed to prepare the student for Honors Spanish IV or AP Spanish Language and Culture, developing in the student a greater comprehension and understanding of more complex reading, writing, listening and speaking. Students work at a rapid pace, and are expected to speak and present in the target language. Vocabulary and advanced grammar and idioms practice is incorporated in speaking and writing assignments. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the Spanish-speaking world. This course meets for a full year.

### Advanced Placement Spanish V: Language and Culture — 444

- **App path:** `departments[10].courses[26].description`
- **Eligibility:** Language and Culture Grade: 11th, 12th Elective Prerequisites: Honors Spanish IV with a minimum B average or Honors Spanish III with a minimum A average. Rising seniors in Advanced Spanish III with a minimum A- average. AP course placement is determined through an application process that considers academic credentials. Quality Points: A = 5
- **Description:** The Advanced Placement Spanish Language and Culture course is equivalent to an introductory college-level course and is designed to advance students’ communicative proficiency in Spanish within a culturally rich and content-based framework. The course develops students’ abilities to understand spoken Spanish in a variety of contexts; to read and interpret authentic materials such as newspapers, literary texts, and other media with increasing independence; and to express ideas clearly and accurately in both written and spoken Spanish. All class discussion and oral practice are conducted exclusively in Spanish. Students develop proficiency across all communication modes- interpersonal, interpretive, and presentational- through content-based instruction and meaningful practice. On a cultural level, students deepen their understanding of the geographical, historical, artistic, religious and everyday life and societal practices of the Spanish-speaking world. All students are required to take the College Board AP Spanish Language and Culture exam in May. This course meets for a full year.

## D. Added 2026-11-11 (plan `plaincourses`, Batch 4 amendment)

Seven more entries from the same guide (S1, re-downloaded 2026-11-11, SHA-256 unchanged:
`6db5f418…a3a5`), for the courses whose app text kept the catalog's first- or second-person
voice. Same cleanup as above (U+200B read as a space, runs of spaces collapsed, split `i`/`l`/`j`
rejoined); wording otherwise the guide's own.

### Introduction to STEM — 579

- **App path:** `departments[1].courses[15].description`
- **Eligibility:** Grade: 9th, 10th Elective Prerequisites: None Quality Points: A = 4
- **Description:** Do you like building things? Do you tend to be curious how things work? Are you interested in how technology is used to advance our society? Come visit the world of STEM to learn more about fulfilling careers in science, technology, engineering, and math. This course is designed to help students discern career interests in the world of STEM. Students will rotate through various STEM fields while completing hands-on activities and gaining understanding in a variety of fields of study. Students will research and present on various topics related to STEM, including career pathways available based on their interests. This course meets for a semester.

### The Sacraments: Source of Our Life in Christ — 034

- **App path:** `departments[8].courses[6].description`
- **Eligibility:** Grade: 11th Required: 1st Semester Prerequisites: None Quality Points: A = 4
- **Description:** This course recognizes how Jesus Christ, through his great love for us, instituted the Sacraments as the ordinary means of receiving salvation and entrusted them to the Church. It examines each Sacrament as a primary source of grace and an intimate encounter with Jesus Christ. Each of the Seven Sacraments is presented in its own chapter. It includes an investigation of major symbols associated with each sacrament and how each sacrament enables us more fully to be holy as Christ is holy. This course meets for a semester.

### Honors Costume Design and Production — 367

- **App path:** `departments[9].courses[22].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Department Approval and demonstration of skill set Quality Points: A = 5
- **Description:** The clothes look great, but why do they look great? Learn about color theory and aesthetics to perfect your skills that can launch your career in the industry. Take what you’ve learned to the next level by assembling your portfolio, showcasing what you do in class for a broader audience. This class will support the needs of school performances but will also leave room for students to design and make clothes that they might actually wear. We will focus on particular styles and choices that can reaffirm a theatrical vision and tell a designer’s particular story. Students will design, develop, and create costume pieces for all shows while collaborating with directors, designers, and actors to fulfill the intended artistic vision. They will also create a professional portfolio and presentation showcasing their work. This course meets for a semester.

### Theatre: Design and Tech — 368

- **App path:** `departments[9].courses[23].description`
- **Eligibility:** Grade: 10th Elective Prerequisites: None Quality Points: A = 4
- **Description:** Interested in the craft of technical theatre? This program allows students the chance to design, build, rig, and engineer all the technical elements of our theatre performances. From sound design to lighting, from pencil-to-page design to actually measuring, cutting, and assembling our award-winning sets, students will quickly learn about design and construction through hands-on training. Students will study the basic principles of backstage work and techniques for achieving effects within a budget. They will analyze plays for cues that inform staging, explore the use of lighting, sound, and scenery to support the director’s vision, learn the principles of design, and develop the skills to work appropriately and efficiently as a technical crew. This course meets for a semester.

### On The Stage: Acting, Directing, Movie Making — 308

- **App path:** `departments[9].courses[25].description`
- **Eligibility:** Grades: 9th Elective: Prerequisite: None Quality Points: A = 4
- **Description:** Begin your journey to stardom as a student of the craft of acting, directing, and movie making. Students will learn what it takes to command an audience through performance. Why move here? Why was that line said just like that? Why am I now crying, laughing, confused? It’s because someone applied the techniques you’ll learn in this course. Students will also create their own digital shorts that can be submitted for contests all across the country. They will have the opportunity to participate in an annual theatre play festival. Students will learn what it takes to perform in front of an audience, whether on stage or on camera, and how to collaborate with actors to tell a compelling story. They will also develop the skills needed to effectively work on film projects, including filming, lighting, sound, editing, and marketing. This course meets for a semester.

### Behind the Scenes: Set Design, Construction, Lighting, Sound and Costuming — 309

- **App path:** `departments[9].courses[26].description`
- **Eligibility:** Grades: 9th Elective Prerequisite: None Quality Points: A = 4
- **Description:** Come see how we make it look easy. The world of stage craft is vast and can lend itself to numerous other career paths. Students will learn about the ins and outs of the stage, what it takes to engineer working structures, and how the elements of design are actually put to use. Students will be responsible for learning about all the audio/visual needs of a production and will apply that knowledge in a hands-on approach. Students will be able to design sets from the script to the stage and select costumes that enhance the story. They will assist in building school productions and events, use lighting, sound, and overall production elements to tell a story through their design, and support productions through backstage setup. This course meets for a semester.

### Costume Design and Production — 366

- **App path:** `departments[9].courses[21].description`
- **Eligibility:** Grade: 10th Elective Prerequisites: None Quality Points: A = 4
- **Description:** Join this award-winning class that will lay the groundwork for hands-on experience in the world of clothing design and application. Interested in fashion? Want to learn to make clothes that can be worn? No sewing experience is required. This class will support the needs of school performances but will also leave room for students to design and make clothes that they might actually wear. We will focus on particular styles and choices that can reaffirm a theatrical vision and tell a designer’s particular story. Students will learn to use sewing machines, design clothes, and work with other technicians to achieve the final look. Students will learn how to sew effectively and efficiently while designing costumes that enhance the vision of the design team. They will collaborate with other designers, directors, and actors to achieve a final product that is completed on budget and on time. This course meets for a semester.

## E. Added 2026-11-11 (plan `coursecensus`, Batch 4)

Seventy more entries from the same guide (S1, re-downloaded 2026-11-11, SHA-256 unchanged:
`6db5f418…a3a5`), for the courses whose app text opened with catalog boilerplate ("This course
is designed to…", "Students will…") or ran to more than one sentence. Same cleanup as above
(U+200B read as a space, runs of spaces collapsed, split `i`/`l`/`j` rejoined); wording otherwise
the guide's own, including its errors ("in some cases. secondary sources" in Honors English 12,
"Honors English 11 Honors" in AP English 11). A title the guide wraps onto a second line is given
in full; a description the guide prints in two paragraphs is joined into one. The three Dual
Enrollment entries carry the guide's Central Piedmont course code beside the school's.

### English 9 — 212

- **App path:** `departments[0].courses[0].description`
- **Eligibility:** Grade: 9th Required Prerequisites: Eighth grade English performance, local percentile on the High School Placement Test or other standardized test scores and input provided by the student’s 8th grade English teacher. Quality Points: A = 4
- **Description:** The course includes a review of grammar fundamentals and basic conventions of essay writing. Students will be provided activities for enhancing reading comprehension skills and for expanding vocabulary. Students will read literature appropriate for college-prep 9th graders and develop literature-based essays using literary criticism and electronic databases. Composition skills and MLA research documentation will be emphasized. The course includes an introduction to various literary genres and devices through the study of mythology, short stories, novels, poetry, and drama. This course meets for a full year.

### Advanced English 9 — 211

- **App path:** `departments[0].courses[1].description`
- **Eligibility:** Grade: 9th Required Prerequisites: Eighth grade English performance, local percentile on the High School Placement Test or other standardized test scores and input provided by the student’s 8th grade English teacher. Quality Points: A = 4
- **Description:** The course includes an overview and fast-paced review of grammar fundamentals and basic conventions of essay writing. Students will be provided advanced activities for enhancing reading comprehension skills and for expanding vocabulary. Students will read literature appropriate for accelerated 9th graders and develop literature-based essays using literary criticism and electronic databases. Advanced composition skills and MLA research documentation will be emphasized. The course includes an introduction to various literary genres and devices through the study of mythology, short stories, novels, poetry, and drama. Students at the advanced level will read supplemental texts and write additional essays. This course meets for a full year.

### Honors English 10 — 223

- **App path:** `departments[0].courses[6].description`
- **Eligibility:** Grade: 10th Required Prerequisites: Advanced English 9 with a minimum B+ average or English 9 with a minimum A average and Department Chair approval. Quality Points: A = 5
- **Description:** This course includes many of the same topics taught in Advanced English 10, but involves a more comprehensive focus on World Literature and additional outside reading. Additional f ocus will be on rhetoric and its application to writing. Student essays, including in-class prompts, will require a high level of critical thinking. This course meets for a full year.

### Advanced Placement English 11: English Language and Composition — 233

- **App path:** `departments[0].courses[10].description`
- **Eligibility:** Grade: 11th Required Prerequisites: Honors English 10 with a minimum B- average or Advanced English 10 with a minimum B+ average . AP course placement is determined through an application process that considers academic credentials, including PSAT Evidence-Based Reading and Writing scores. Quality Points: A = 5
- **Description:** This course comprises much of the material covered in Honors English 11 Honors as well as the principles of rhetoric and argument. This course will be offered to students who show the aptitude, desire, and work ethic for a college level course. All students are required to take the College Board AP English Language exam in May. This course meets for a full year.

### Honors English 12 — 241

- **App path:** `departments[0].courses[12].description`
- **Eligibility:** Grade: 12th Required Prerequisites: Honors English 11 with a minimum B- average or English 11 with a minimum A- average . Quality Points: A = 5
- **Description:** This course includes an in-depth study of British Literature through close reading and discussion; advanced composition resulting in several documented literary analyses using primary and, in some cases. secondary sources; and vocabulary development. This course meets for a full year.

### Advanced Placement English 12: English Literature and Composition — 243

- **App path:** `departments[0].courses[13].description`
- **Eligibility:** Grade: 12th Required Prerequisites: AP English Language and Composition with a minimum C average or Honors English 11 with a minimum A average . AP course placement is determined through an application process that considers academic credentials, including PSAT Evidence-Based Reading and Writing scores. Quality Points: A = 5
- **Description:** This course includes all the essentials of Honors English 12 with the addition of several sophisticated texts. This course will be offered to students who show the aptitude, desire, and work ethic for a college level course. All students are required to take the College Board AP English Literature exam in May. This course meets for a full year.

### Advanced Placement English 12: English Language and Composition — 244

- **App path:** `departments[0].courses[14].description`
- **Eligibility:** Grade: 12th Required Prerequisites: Honors English 11 with a minimum B- average or English 11 with a minimum A average . AP course placement is determined through an application process that considers academic credentials, including PSAT Evidence-Based Reading and Writing scores. Quality Points: A = 5
- **Description:** This course comprises much of the material covered in Honors English 12 as well as the principles of rhetoric and argument. This course will be offered to students who show the aptitude, desire, and work ethic for a college level course. All students are required to take the College Board AP English Language exam in May. This course meets for a full year.

### Journalism — 234

- **App path:** `departments[0].courses[15].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Students must maintain a B average in English and receive a recommendation from their current English teacher. Quality Points: A = 4
- **Description:** This class is designed to give practical experience in interviewing and writing techniques ( news, features, editorials, sports coverage, and reviews of cultural events ), photography, and layout. Students must be competent writers who demonstrate a command of language. Students are responsible for producing and publishing the school newspaper in digital format on the school's website. This publication is continuously updated with articles, photographs, and videos. Students in this class will also develop and publish the school's literary magazine. In addition, students will have the opportunity to produce a podcast featuring interviews with guests from within and outside of the school community. This course meets for a full year.

### Guided Academic Support — 511

- **App path:** `departments[1].courses[1].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Academic Skills course and recommendation from Academic Achievement teacher. Quality Points: None: Grade not weighted into GPA.
- **Description:** This course is tailored for 10th, 11th, and 12th grade Academic Achievement students with a GPA 2.9 or below. This course provides targeted academic support across various subjects, alongside lessons that develop independent work habits, effective time management, organizational and study skills, and test-taking strategies as needed. Academic Achievement Program teacher recommendation is required. This course meets for a semester.

### Study Hall — 100

- **App path:** `departments[1].courses[3].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Counselor Approval Quality Points: None: Grade not weighted into GPA.
- **Description:** Students will spend their time working independently on their coursework in a supervised environment. This course may only be taken one time per semester. This course meets for a semester.

### SAT Prep — 531

- **App path:** `departments[1].courses[5].description`
- **Eligibility:** Grade: 10th, 11th Elective Prerequisites: Must have completed Geometry. Quality Points: A = 4
- **Description:** This course is designed to help students prepare effectively for the SAT. Instruction is divided into two main components: Evidence-Based Reading & Writing and Mathematics. Students rotate between these areas, spending one quarter focused on verbal skills and one quarter focused on math skills. In the verbal section, students learn strategies for critical reading, vocabulary in context, grammar and usage, and essay organization. They practice analyzing passages, identifying errors, and responding to writing prompts. In the math section, students review essential skills in arithmetic, algebra, and geometry, as well as test-taking strategies specific to the SAT math sections. Throughout the course, students complete multiple SAT practice tests to build familiarity, confidence, and pacing. They also research colleges of interest to better understand admissions requirements and related criteria. Students complete a sample SAT registration and are strongly encouraged to take the SAT soon after finishing the course. This course meets for a semester.

### Sports Ethics — 526

- **App path:** `departments[1].courses[6].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** Students will explore the deeper meaning of sport through an ethical and philosophical lens. Moving beyond wins and losses, the course engages students in examining fundamental questions about the purpose and value of sport. Using a variety of approaches in sport ethics, students consider questions such as: What role should sport play in society? How should success be defined? Why does sport matter? What should sport teach us? What does it mean to compete with integrity? What is true sportsmanship? What values can and should sport foster in participants and spectators? Does participation in sport build character? Through these explorations, students develop greater self-awareness and a clearer understanding of their own values. As their ethical reasoning skills grow, students become more thoughtful athletes, leaders, and observers of sport. They will also be better equipped to engage in ethical conversations, navigate dilemmas, and lead lives rooted in integrity and service. This course meets for a semester.

### Introduction to Accounting — 135

- **App path:** `departments[1].courses[11].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This class is designed to provide an understanding of the basic principles of the Accounting Cycle as it applies to business entities. Major areas of study include the “Accounting Cycle” from analyzing and recording business transactions to the preparation and interpretation of financial statements. This course meets for a semester.

### Honors Electrical and Computing Engineering — 577

- **App path:** `departments[1].courses[17].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Introduction to Engineering with a minimum A- average or instructor approval. Quality Points: A = 5
- **Description:** This course is designed to prepare students for advanced courses in electrical and computing engineering fields. Electrical engineering topics cover introductions to electricity and wiring, electronics circuits and components, and digital signals including sound waves. Electrical and Computing engineering topics cover the components of computing and utilize microcontrollers through Raspberry Pi and Arduino. Students will utilize basic programming to control electronic components such as sensors, motors, and LEDs to create robotic devices. Throughout the course, teams of students will complete hands-on activities and projects to develop and demonstrate learning. This course meets for a semester.

### Geometry — 622

- **App path:** `departments[2].courses[2].description`
- **Eligibility:** Grade: 10th Required Prerequisites: Algebra I Quality Points: A = 4
- **Description:** This course includes basic terms and symbols; congruence and similarity of polygons and circles; area and volume; parallel and perpendicular lines; transformations; and an introduction to proof. This course meets for a full year.

### Advanced Geometry — 624

- **App path:** `departments[2].courses[3].description`
- **Eligibility:** Grade: 9th, 10th Required Prerequisites: Middle school Algebra with a grade of C or higher or Advanced Algebra I. Local percentile on the High School Placement Test or other standardized test scores and input provided by the student’s eighth grade math teacher. Quality Points: A = 4
- **Description:** This course includes the study of basic terms and symbols; congruence and similarity of polygons and circles; area and volume; parallel and perpendicular lines; transformations and proofs. This course meets for a full year.

### Algebra II — 632

- **App path:** `departments[2].courses[5].description`
- **Eligibility:** Grade: 11th Required Prerequisites: Geometry Quality Points: A = 4
- **Description:** This course includes the study of linear, quadratic, exponential, logarithmic, radical, rational and trigonometric functions; complex numbers; correlation and regression. This course meets for a full year.

### Advanced Algebra II — 630

- **App path:** `departments[2].courses[6].description`
- **Eligibility:** Grade: 10th, 11th Required Prerequisites: Advanced Geometry Quality Points: A = 4
- **Description:** This course includes the study of linear, quadratic, exponential, logarithmic, radical, rational and trigonometric functions; complex numbers; correlation and regression; normal models; and confidence intervals for proportions and means. This course meets for a full year.

### Advanced Algebra 3/Statistics — 638

- **App path:** `departments[2].courses[8].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Advanced Algebra 2, Functions and Modeling with a minimum A average , or Algebra 2 with a minimum A average . Quality Points: A = 4
- **Description:** This course is intended to prepare students for an Algebra, Statistics, or Pre-Calculus course at the university level. Topics of study include linear, quadratic, polynomial, and rational functions, exploring one variable data, data collection, probability, and an introduction to statistical inference. This course satisfies the UNC System admission requirements of a 4th year math course beyond Algebra 2. This course meets for a full year.

### Advanced Algebra 4/Trigonometry — 639

- **App path:** `departments[2].courses[9].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Advanced Algebra 3/Statistics or Functions and Modeling. Quality Points: A = 4
- **Description:** This course is intended to prepare students for an Algebra, Statistics, Pre-Calculus, or Calculus course at the university level. Topics of study include exponential and logarithmic functions, sequences and series, trigonometry, conics, and a brief introduction to calculus. This course meets for a full year.

### Functions and Modeling — 637

- **App path:** `departments[2].courses[10].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: Algebra II Quality Points: A = 4
- **Description:** This course provides students the opportunity to further study linear, quadratic, exponential, logarithmic and trigonometric functions. Much of the emphasis is on real-world applications. This course satisfies the UNC System admission requirements of a 4th year math course beyond Algebra II, but does not meet the requirements for Calculus. This course meets for a full year.

### Advanced Pre-Calculus — 635

- **App path:** `departments[2].courses[11].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Advanced Algebra II with a minimum B average or Functions and Modeling with a minimum A average . Quality Points: A = 4
- **Description:** This course includes the further development and analysis of functions including polynomial, rational, exponential, and logarithmic and trigonometric functions. Also included are probability, counting, sequences and series, conic sections, the complex number system, hypothesis testing for means and proportions. This class does not meet the requirements for AP Calculus. This course meets for a full year.

### Introduction to Philosophy: Human Person — 504

- **App path:** `departments[4].courses[0].description`
- **Eligibility:** Grade 9th Required Prerequisites: None Quality Points: A = 4
- **Description:** This course studies what it means to say that human beings are persons (i.e., beings endowed with freedom and an inner life capable of knowing and loving). Students will study some of the greatest thinkers from Socrates to Aquinas. From this study, students will come to appreciate the profound dignity of every human person. This course meets for a semester.

### Ethics — 505

- **App path:** `departments[4].courses[1].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Introduction to Philosophy Quality Points: A = 4
- **Description:** This course introduces students to classical philosophy’s approach to ethics through a Catholic lens. The students will have exposure to non-Catholic ethical systems. The curriculum spans from the ancient Greeks to the modern era, examining key ethical ideas and their impact on the development of society. This course will explore questions of virtue, justice, and the nature of the good life, as understood by influential thinkers. The course is designed to guide students in the formation of their own moral frameworks within the Catholic tradition, encouraging them to consider how ethics inform personal choices and the pursuit of a life of virtue. This course meets for a semester.

### Aerobics — 521

- **App path:** `departments[5].courses[2].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course will focus on simple endurance and aerobic movements in order to increase physical abilities. Areas covered: free weight training, cardio aerobics and the ability to understand physical fitness as part of a healthy lifestyle. Each student is required to dress in appropriate gym attire and keep a journal log on his/her nutrition and physical activity. This course meets for a semester.

### Jazzercise — 524

- **App path:** `departments[5].courses[5].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course will focus on the elements of dance with cardio movement exercises. Pilates and stretching will also be implemented. Each student is required to dress in appropriate gym attire. This course meets for a semester.

### Team Sports: Upperclassmen PE — 514

- **App path:** `departments[5].courses[6].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** Students will participate in various team activities with emphasis on group and individual choice and carry-over activities. Students apply advanced movement-specific information so that they develop the ability to learn, self-assess, and improve movement skills independently. Periodically, fitness levels will be assessed in the following areas: cardiovascular endurance, flexibility, muscular strength, and muscular endurance. Students are graded on the following criteria: effort, participation, enthusiasm, leadership, sportsmanship, movement, skill development, understanding/knowledge of rules, strategies, and fitness. Students may choose this course as an elective more than once. Each student is required to dress in appropriate gym attire. This course meets for a semester.

### Advanced Biology — 821

- **App path:** `departments[6].courses[1].description`
- **Eligibility:** Grade: 9th Required Prerequisites: Eighth grade science performance, local percentile on the High School Placement Test or other standardized test scores and input provided by the student’s 8th grade science teacher. Quality Points: A = 4
- **Description:** The purpose of this course is to introduce the student to an in-depth study of the basic principles of biological processes. The units will include biochemistry, cell functioning, photosynthesis, respiration, DNA, genetics, biotechnology, evolution, surveys of the six kingdoms, human systems, and ecology. Emphasis will be placed on analysis and critical thinking skills. Considerable writing of essays on tests, homework, and lab reports will be required. Dissection will be required. This course meets for a full year.

### Honors Nutritional Science — 849

- **App path:** `departments[6].courses[9].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Honors Chemistry, or Advanced Chemistry with a minimum B average. Quality Points: A = 5
- **Description:** This course is designed to provide an introduction to human nutrition, health, and its impacts on society. The role of nutrition in health promotion and disease prevention is introduced from biological, social, and structural perspectives. Students will have the opportunity to explore these subdisciplines and develop critical thinking skills, nutrition evaluation and recommendation skills, and a foundation in the interpretation of scientific literature. This course meets for a full year.

### Advanced Placement Chemistry — 842

- **App path:** `departments[6].courses[11].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Honors Chemistry with a minimum B+ average . Honors Algebra 2 with a minimum B+ average or Advanced Algebra with a minimum A average . AP course placement is determined through an application process that considers academic credentials, including PSAT Evidence-Based Reading and Writing and Math scores. Quality Points: A = 5
- **Description:** Advanced Placement Chemistry is designed as a second-year chemistry course. This is a highly intensive elective science covering the topics usually included in a first-year college level chemistry course. The course content includes an in-depth study of intermolecular forces, solutions, acids, and bases, equilibrium, kinetics, and thermodynamics. Laboratory activities follow curriculum content. All students are required to take the College Board AP Chemistry exam in May. This course meets for a full year.

### Advanced Placement Environmental Science — 843

- **App path:** `departments[6].courses[12].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Honors Science with a minimum B+ average . AP course placement is determined through an application process that considers academic credentials, including PSAT Evidence-Based Reading and Writing score. Quality Points: A = 5
- **Description:** This course covers topics usually included in a first year college course in environmental science. Advanced Placement Environmental Science provides the student with the opportunity to understand interrelationships of the natural world, to investigate natural and man-made environmental problems and to explore ideas to prevent or solve these problems. Topics covered include renewable and nonrenewable resources, earth dynamics, cycling of matter, ecosystems, atmospheric dynamics, environmental quality, and energy production and development along with their local and global consequences. Students are involved in laboratory work, problem solving, research and fieldwork related to environmental issues. Four environmental community service hours are required each quarter, in addition to any service hours for religion. All students are required to take the College Board AP Environmental Science exam in May. This course meets for a full year.

### Biotechnology — 826

- **App path:** `departments[6].courses[17].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective: Prerequisites: None Quality Points: A = 4
- **Description:** This course will provide students with a comprehensive introduction to the scientific concepts and laboratory research techniques currently used in the field of biotechnology. Students will explore career opportunities through extensive readings, experiments, class discussions, and research projects. This course meets for a semester.

### SASP World History: Icon of Christian Art — 076

- **App path:** `departments[7].courses[3].description`
- **Eligibility:** Grade: 10th Required For members of St. Augustine Scholars Program Prerequisites: All SASP courses with a minimum B+ average and Department Chair approval. Quality Points: A = 5
- **Description:** This course examines the development of Western and Near Eastern civilizations through the historical and artistic influence of Christianity. Major works of Christian art and architecture are studied as primary sources through which students explore the interaction of religion, culture, politics, and intellectual life. Emphasis is placed on how artistic expression shaped and reflected broader civilizational developments across regions and periods. This course meets for a full year.

### Psychology — 941

- **App path:** `departments[7].courses[7].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course introduces students to the scientific study of human behavior and mental processes. Students explore major topics in psychology, including research methods, biological influences on behavior, learning, cognition, development, personality, and psychological disorders. Emphasis is placed on understanding how psychological principles apply to everyday life and real-world situations. Through readings, class discussion, and analysis of case studies and data, students develop critical thinking skills and a foundational understanding of psychology that prepares them for future college-level study and informed decision-making. This course meets for a semester.

### Advanced Placement Psychology — 962

- **App path:** `departments[7].courses[8].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: AP course placement is determined through an application process that considers academic credentials, including a minimum 550 PSAT Evidence-Based Reading and Writing score. Quality Points: A = 5
- **Description:** This course is a college-level course that introduces students to the systematic and scientific study of human behavior and mental processes. Students examine the major theories, concepts, and research that have shaped the field of psychology, including biological bases of behavior, cognition, learning, development, social psychology, personality, and mental and physical health. Throughout the course, students apply psychological concepts, research methods, and data analysis to evaluate evidence, assess claims, and effectively communicate ideas. As a college-level course, students must be self-motivated learners who are prepared to read complex texts, analyze research studies, interpret data, and write clearly and analytically at a college standard. The course is equivalent to an introductory undergraduate psychology course. All students are required to take the College Board AP Psychology exam in May. This course meets for a full year.

### Politics — 942

- **App path:** `departments[7].courses[9].description`
- **Eligibility:** Grade: 12th Required Prerequisites: U. S. History Quality Points: A = 4
- **Description:** This course is a college prep level U.S. Government class that introduces students to the foundations, structures, and processes of the American political system. Students examine the principles of the U.S. Constitution, the roles and powers of the three branches of government, political participation, elections, and the rights and responsibilities of citizens. The course also explores how public policy is formed and the role of the media and interest groups in shaping political outcomes. Through the analysis of foundational documents, current events, and real-world examples, students develop the civic knowledge, critical thinking, and analytical skills necessary for informed citizenship and future college-level study. This course meets for a semester.

### Advanced Placement United States Government — 944

- **App path:** `departments[7].courses[11].description`
- **Eligibility:** Grade: 12th Required Prerequisites: AP course placement is determined through an application process that considers academic credentials, including minimum 550 PSAT Evidence-Based Reading and Writing scores. Quality Points: A = 5
- **Description:** This course provides a college-level introduction to key political concepts, ideas, institutions, policies, interactions, roles, and behaviors that characterize the constitutional system and political culture of the United States. Students study U.S. foundational documents, Supreme Court decisions, and other texts and visuals to gain an understanding of the relationships and interactions among political institutions, processes, and behaviors. They also engage in disciplinary practices that require them to read and interpret data, make comparisons and applications, and develop evidence-based arguments. As a college-level course, AP U.S. Government and Politics requires students to be self-motivated learners who are prepared to read complex texts, analyze primary and secondary sources, and write clear, well-supported arguments at a college standard. The course emphasizes independent reading, analytical writing, and critical thinking skills consistent with expectations in an introductory undergraduate political science course. All students are required to take the College Board AP U.S. Government exam in May. This course meets for a semester.

### Economics — 943

- **App path:** `departments[7].courses[12].description`
- **Eligibility:** Grade: 12th Required Prerequisites: U.S. History Quality Points: A = 4
- **Description:** This course is a college prep level economics course that introduces students to the fundamental principles of economics with a primary focus on the American economic system. Students examine how individuals, businesses, and governments make economic decisions and how markets function through supply and demand. Topics include resource allocation, incentives, market structures, competition, and the role of prices in economic decision-making. Through the analysis of real-world examples and economic data, students develop economic reasoning and analytical skills essential for informed citizenship and future college-level study. This course meets for a semester.

### Advanced Placement Microeconomics — 948

- **App path:** `departments[7].courses[14].description`
- **Eligibility:** Grade: 12th Required Prerequisites: AP course placement is determined through an application process that considers academic credentials, including minimum 1100 total PSAT score. Quality Points: A = 5
- **Description:** This class is a college-level course that introduces students to the principles of economics that apply to the behavior of individual consumers, firms, and resource owners. The course focuses on product and factor markets, income distribution, market failure, and the role of government in promoting efficiency and equity in the economy. Students use economic models, graphs, charts, and data analysis to examine economic behavior, market outcomes, and policy decisions. The course is equivalent to a one-semester introductory college Microeconomics course. All students are required to take the College Board AP Microeconomics exam in May. This course meets for a semester.

### Advanced Placement Microeconomics & Macroeconomics — 953/954

- **App path:** `departments[7].courses[15].description`
- **Eligibility:** Grade: 12th Required Prerequisites: AP course placement is determined through an application process that considers academic credentials, including minimum 1100 total PSAT score. Quality Points: A = 5
- **Description:** This class includes topics in both macroeconomics and microeconomics. This course is equivalent to two semester long courses in macroeconomic theory and microeconomic theory. The microeconomics portion of the course will give students a thorough understanding of the principles of economics that apply to the functions of individual decision makers, both consumers and producers, within the economic system. It places primary emphasis on the nature and functions of product markets and includes the study of factor markets and of the role of government in promoting greater efficiency and equity in the economy. The macroeconomics portion of the course introduces students to the principles that apply to an economic system as a whole. The course places particular emphasis on the study of national income and price-level determination. It also develops students’ familiarity with economic performance measures, the financial sector, stabilization policies, economic growth, and international economics. Students learn to use graphs, charts, and data to analyze, describe, and explain economic concepts. All students are required to take the College Board AP Microeconomics and AP Macroeconomics exam in May. This course meets for a year.

### Faith and Revelation: Knowing God through Sacred Scripture — 013

- **App path:** `departments[8].courses[0].description`
- **Eligibility:** Grade: 9th Required: 1st Semester Prerequisites: None Quality Points: A = 4
- **Description:** This course begins with a brief orientation to philosophy and logic. The remainder of the course examines how God reveals himself to people. It examines Divine Revelation, that is, the inspired Word of God unveiled gradually throughout the history of salvation handed down as Sacred Tradition and written down as Sacred Scripture. It examines how the Magisterium of the Church transmits the Deposit of Faith infallibly and how our understanding of God’s Revelation leads us to a more intimate relationship with the three Persons of the Blessed Trinity in this life and to eternal life in Heaven. It also explains how to read the Bible, emphasizing how the New Testament in Christ fulfills the covenants and promises that God made with his people in the Old Testament. This course meets for a semester.

### The Blessed Trinity and Our Christian Vocation — 014

- **App path:** `departments[8].courses[1].description`
- **Eligibility:** Grade: 9th Required: 2nd Semester Prerequisites: None Quality Points: A = 4
- **Description:** This course presents the Blessed Trinity – one God in three divine Persons: Father, Son, and Holy Spirit – which is the central mystery of the Christian Faith. We are called to know and love God and to share in his divine life. Following the Nicene Creed and based on Sacred Scripture, the role of each Person of the Blessed Trinity in the plan of salvation and the Christian life is examined. It also looks at the role of the Blessed Virgin Mary as the Mother of God, Mediatrix, and Intercessor for all people. This course meets for a semester.

### Catholic Apologetics — 046

- **App path:** `departments[8].courses[8].description`
- **Eligibility:** Grade: 12th Required: 1st Semester (046 or 051) Prerequisite: None Quality Points: A = 4
- **Description:** This course prepares students for active dialogue with non-Catholics in the public sphere. It teaches the practical art of promoting the truth with charity in conversation with those not familiar with the Catholic faith. It builds on a basis of logical reasoning, and gives thoughtful explanation in response to atheism, non-Christian religions, and non-Catholic Christians. Major topics include the existence of God, miracles, Christ’s Resurrection, and the authority of the Church. This course meets for a semester.

### History of the Church — 043

- **App path:** `departments[8].courses[11].description`
- **Eligibility:** Grade: 12th Required: 2nd Semester (043 or 045) Prerequisites: None Quality Points: A = 4
- **Description:** This course begins with the story of God’s definitive intervention into human history in the Person of his Son and continues through his Church to the present day. In his plan of salvation, God sent the Holy Spirit to act through members of the Church to further his salvific mission to the whole world. It examines the lives of the saints and how they – by cooperating with God’s grace in response to their divine vocations – helped to shape the life of the Church as well as Christian society and culture. This course will also provide an overview of sacred literature, art, and music as an integral part of the liturgical life in each historical period. This course meets for a semester.

### Honors Gospel and Film — 033

- **App path:** `departments[8].courses[12].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: None Quality Points: A = 5
- **Description:** This course will enable students to develop a standard for analyzing what they see portrayed in the cinema. This course will teach students to evaluate the impact of movies on their beliefs, values, and behaviors. The student will be encouraged to move from being a passive viewer to an active critical thinker. Current films will be viewed. This course meets for one semester.

### Honors Ecumenical and Interreligious Studies — 044

- **App path:** `departments[8].courses[13].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: None Quality Points: A = 5
- **Description:** This course presents an overview of world religions including Judaism, Christianity, Islam, Hinduism and Buddhism. Through the study of religious dimensions such as ritual, doctrine and ethics, students will learn how to recognize important religious truths present in other religious traditions. While building an attitude of tolerance and understanding, this course encourages students to appreciate more deeply the fullness of revelation present in the Catholic Church. This course meets for one semester.

### Art I — 311

- **App path:** `departments[9].courses[0].description`
- **Eligibility:** Grade: 9th, 10th Elective Prerequisites: None Quality Points: A = 4
- **Description:** Art I is an introductory course focusing on fundamental art skills. Various media and tools are explored including painting, drawing, and sculpture. An emphasis is placed on understanding the Elements of Art and developing technique through the art-making process. Key components of this class are color theory, one-point perspective, value gradation, and drawing from observation. This course meets for a semester.

### Freshman Men’s Chorus — 301

- **App path:** `departments[9].courses[13].description`
- **Eligibility:** Grade: 9th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course offers incoming freshmen men an opportunity to develop their singing voices through choral singing, correct breathing, sight singing, and vocal production techniques. The students will explore music from a variety of styles and genres. They will also experience vocal audition techniques, music reading, intervals, and learn musical listening techniques. This course meets for a semester and performs at two required curricular concerts.

### Freshman Women’s Chorus — 302

- **App path:** `departments[9].courses[14].description`
- **Eligibility:** Grade: 9th Elective Prerequisites: None Quality Points: A = 4
- **Description:** This course offers incoming freshmen women an opportunity to develop their singing voices through choral singing, correct breathing, sight singing, and vocal production techniques. The students will explore music from a variety of styles and genres. They will also experience vocal audition techniques, music reading, intervals, and learn musical listening techniques. This course meets for a semester and performs at two required curricular concerts.

### Women’s Chamber Ensemble — 304

- **App path:** `departments[9].courses[16].description`
- **Eligibility:** Grade: 10th Elective Prerequisites: Freshman Women’s Chorus or audition Quality Points: A = 4
- **Description:** This course is an auditioned proficient level choir for women with previous singing experience. This class meets during Honors Women’s Chamber Ensemble. Attention is focused on the development of vocal performance, embouchure, diction, balance, rhythm, and intonation. Musical, aural, choral and critical thinking skills are continually integrated into the rehearsal process throughout the year. A wide range of periods, styles and culture of music will both be researched and studied. There are numerous school and community concerts each year which furthers the leadership and performance opportunities for students. This course meets for a full year.

### Honors Women’s Chamber Ensemble — 392

- **App path:** `departments[9].courses[17].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Women’s Chamber Ensemble or Choral Ensemble Quality Points: A = 5
- **Description:** This course is an auditioned proficient and advanced level choir for women with previous singing experience. Attention is focused on the development of vocal performance, embouchure, diction, balance, rhythm, and intonation. Musical, aural, and critical thinking skills are continually integrated into the rehearsal process throughout the year. A wide range of periods, styles and culture of music will both be researched and studied. There are numerous school and community concerts each year which furthers the leadership and performance opportunities for students. This course meets for a full year.

### Men’s Chamber Ensemble — 303

- **App path:** `departments[9].courses[18].description`
- **Eligibility:** Grade: 10th Elective Prerequisites: Freshman Men’s Chorus or audition Quality Points: A = 4
- **Description:** This course is an auditioned proficient level choir for men with previous singing experience. This class meets during Honors Men’s Chamber Ensemble. Attention is focused on the development of vocal performance, embouchure, diction, balance, rhythm, and intonation. Musical, aural, and critical thinking skills are continually integrated into the rehearsal process throughout the year. A wide range of periods, styles and culture of music will both be researched and studied. There are numerous school and community concerts each year which furthers the leadership and performance opportunities for students. This course meets for a full year.

### Honors Men’s Chamber Ensemble — 357

- **App path:** `departments[9].courses[19].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Men’s Chamber Ensemble or Choral Ensemble Quality Points: A = 5
- **Description:** This course is an auditioned proficient and advanced level choir for men with previous singing experience. Attention is focused on the development of vocal performance, embouchure, diction, balance, rhythm, and intonation. Musical, aural, and critical thinking skills are continually integrated into the rehearsal process throughout the year. A wide range of periods, styles and culture of music will both be researched and studied. There are numerous school and community concerts each year which furthers the leadership and performance opportunities for students. This course meets for a full year.

### Honors Concert Choir — 361

- **App path:** `departments[9].courses[20].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Choral Ensemble, Honors or Men’s Chamber Ensemble, Honors or Women’s Chamber Ensemble Quality Points: A = 5
- **Description:** This course is an auditioned, advanced level mixed choir for men and women with significant previous singing experience. Attention is focused on the development and mastery of vocal performance, embouchure, diction, balance, rhythm, and intonation. Musical, aural, and critical thinking skills are continually integrated into the rehearsal process throughout the year. A wide range of periods, styles and culture of music will both be researched and studied. There are numerous school and community concerts each year which furthers the leadership and performance opportunities for students. This course meets for a full year.

### Acting — 330

- **App path:** `departments[9].courses[27].description`
- **Eligibility:** Grades: 10th, 11th, 12th Elective: Prerequisite: On the Stage or Department Approval Quality Points: A = 4
- **Description:** This course is offered to students who desire to seriously pursue all acting techniques for the stage as well as screen. This course will include at least one production each semester. Students will participate in Theater competitions and be able to explore acting for the camera and stage, as well as directing, playwriting, cinematography and video editing. The student will learn and perform acting techniques, styles, and the processes of producing full length and one act plays. Students will work on multiple plays throughout the school year and participate in annual theatre competitions. They will be responsible for memorizing and applying acting techniques to present authentic characters and will learn to collaborate effectively within an ensemble acting troupe. This course meets for a full year.

### Honors TV, Film, and Production — 376

- **App path:** `departments[9].courses[29].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Department Approval and demonstration of skill set Quality Points: A = 5
- **Description:** This course furthers the knowledge of the principles, procedures, and techniques of television/web series production. Special attention is paid to include video control, special effects, operation of cameras, editing equipment, composition, lighting, staging, directing, and on-camera announcing and interviewing. School announcements and event coverage will also be assembled during class period for the following day. Students will establish theatrical storytelling through media, take responsibility for appropriate on-camera coverage of events, and provide assistance to events and projects that require basic video editing. This course meets for a semester.

### Honors Wind Ensemble — 394

- **App path:** `departments[9].courses[34].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Minimum one year of concert band or audition Quality Points: A = 5
- **Description:** This class is for juniors and seniors who have completed one year of Concert Band and who wish to receive honors credit for their participation in band. In order to receive this credit, students must complete additional requirements that can be obtained from the band director. At home practice is a required aspect of class enrollment. Performance events related to class participation are mandatory. Students are expected to attend after-school rehearsals and performances. This course meets for a full year.

### Honors Percussion — 373

- **App path:** `departments[9].courses[36].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: One year of percussion class or audition Quality Points: A = 5
- **Description:** This class is for members of the percussion group who wish to receive honors credit for their participation in band. In order to receive this credit, students must complete additional requirements that can be obtained from the band director. Meets during Percussion Class. This course meets for a full year.

### Introduction to Guitar — 325

- **App path:** `departments[9].courses[37].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Must have a nylon-string acoustic guitar Quality Points: A = 4
- **Description:** This course is designed as a performance based class to give an understanding of the fundamentals of acoustic guitar playing. This includes learning to read and write musical notation, count rhythms, chord shapes, left and right hand technique and tablature. Students will be asked to perform in groups as well as solo. The students will also be asked to create their own music and perform arrangements of popular tunes. This course meets for a semester.

### French II — 421

- **App path:** `departments[10].courses[1].description`
- **Eligibility:** Grade: 9th, 10th, 11th, 12th Elective Prerequisites: French I Quality Points: A = 4
- **Description:** This course is designed to continue the foundation learned in French I and build a greater understanding and comprehension of reading, writing, listening, and speaking. This course will emphasize vocabulary, grammatical concepts, and oral communication. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the French-speaking world. By the end of the year, students are expected to accurately apply multiple verb tenses to the four skills of a World Language. This course meets for a full year.

### Advanced French II — 426

- **App path:** `departments[10].courses[2].description`
- **Eligibility:** Grade: 9th, 10th, 11th, 12th Elective Prerequisites: French I with a minimum B+ average Quality Points: A = 4
- **Description:** This course is designed to continue the foundation learned in French I and build a greater understanding and comprehension of reading, writing, listening, and speaking. This course will emphasize vocabulary, grammatical concepts, and oral communication. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the French-speaking world. In the Advanced level, the linguistic level of instruction and communication will be more complex, the curriculum will move at a faster pace, and students will be held to more rigorous expectations. By the end of the year, students are expected to accurately apply multiple verb tenses to the four skills of a world language. This course meets for a full year.

### German II — 422

- **App path:** `departments[10].courses[8].description`
- **Eligibility:** Grade: 9th, 10th, 11th, 12th Elective Prerequisites: German I Quality Points: A = 4
- **Description:** This course is designed to continue the foundation learned in German I and build a greater understanding and comprehension of reading, writing, listening, and speaking. This course will emphasize vocabulary, grammatical concepts, and oral communication. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the German-speaking world. By the end of the year, students are expected to accurately apply multiple verb tenses to the four skills of a World Language. This course meets for a full year.

### Honors Latin III — 433

- **App path:** `departments[10].courses[16].description`
- **Eligibility:** Grades: 10th, 11th, 12th Elective Prerequisites: Advanced Latin II with a minimum A- average Quality Points: A = 5
- **Description:** This course is designed for students whose demonstrated mastery of Latin fundamentals indicates readiness for authentic literary texts. As a transitional year, the course balances continued analysis of vocabulary, grammar, and syntax with an increased emphasis on literary style, figures of speech, and rhetorical devices. Students read adapted and authentic Latin selections representing a range of genres. On a cultural level, students continue to study the geographical, historical, artistic, religious, and social life of ancient Rome, as well as the Middle Ages and the Renaissance. This course prepares students for Honors Latin IV or AP Latin and proceeds at an accelerated pace. This course meets for a full year.

### Honors Latin lV — 442

- **App path:** `departments[10].courses[17].description`
- **Eligibility:** Grade: 11th, 12th Elective Prerequisites: Honors Latin III with a minimum B- average or Advanced Latin III with a minimum A- average Quality Points: A = 5
- **Description:** This course emphasizes the rhetorical, metrical, and cultural conventions of epic and lyric poetry. Students refine vocabulary, grammar, syntax, and reading fluency through sustained engagement with authentic texts and regular sight translation. Students read selections from Vergil’s Aeneid and analyze the historical and mythological foundations of the epic tradition. On a cultural level, students deepen their study of the geographical, historical, artistic, religious, and daily life of ancient Rome. This course proceeds at an accelerated pace and is designed for advanced students of Latin. This course meets for a full year.

### Spanish II — 424

- **App path:** `departments[10].courses[20].description`
- **Eligibility:** Grade: 9th, 10th, 11th, 12th Elective: Prerequisites: Spanish I Quality Points: A = 4
- **Description:** This course is designed to continue the foundation learned in Spanish 1 and build a greater understanding and comprehension of reading, writing, listening, and speaking. This course will emphasize vocabulary, grammatical concepts, and oral communication. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the Spanish-speaking world. By the end of the year, students are expected to accurately apply multiple verb tenses to the four skills of a world language. This course meets for a full year.

### Advanced Spanish II — 462

- **App path:** `departments[10].courses[21].description`
- **Eligibility:** Grade: 9th, 10th, 11th, 12th Elective Prerequisites: Spanish I with a minimum B+ average Quality Points: A = 4
- **Description:** This course is designed to continue the foundation learned in Spanish 1 and build a greater understanding and comprehension of reading, writing, listening, and speaking. This course will emphasize vocabulary, grammatical concepts, and oral communication. On the cultural level, students will continue to learn about geographical, historical, artistic, religious, and societal concepts of the Spanish-speaking world. In the Advanced level, the linguistic level of instruction and communication will be more complex, the curriculum will move at a faster pace, and students will be held to more rigorous expectations. By the end of the year, students are expected to accurately apply multiple verb tenses to the four skills of a world language. This course meets for a full year.

### Advanced Spanish III - Native Speaker — 438

- **App path:** `departments[10].courses[23].description`
- **Eligibility:** Grade: 10th, 11th, 12th Elective Prerequisites: Department Assessment Quality Points: A = 4
- **Description:** This course is an advanced course designed for students who already speak Spanish at home or in their communities. The course focuses on strengthening academic language skills through the development of advanced reading, writing, speaking, and listening skills. Students engage in sustained interpersonal, interpretive, and presentational communication. Instruction focuses on refining grammar and syntax, expanding academic and professional vocabulary. Through the analysis of literary and informational texts from the Spanish-speaking world, students build interpretive reading skills and cultural understanding. Writing instruction emphasizes coherent, organized paragraphs and essays using appropriate conventions and varied sentence structures. Speaking activities include structured discussions, presentations, and debates that require supporting opinions and narrating in multiple time frames. By the end of the course, students will demonstrate increased proficiency in academic Spanish. This course meets for a full year.

### Dual Enrollment: Public Speaking (CPCC: COM 231) — 975

- **App path:** `departments[11].courses[0].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: ACA 122 (recommended), 2.8 unweighted GPA or assessment scores and prior approval required. Quality Points: A = 5
- **Description:** This course provides instruction and experience in preparation and delivery of speeches within a public setting and group discussion. Emphasis is placed on research, preparation, delivery, and evaluation of informative, persuasive, and special occasion public speaking. Upon completion, students should be able to prepare and deliver well-organized speeches and participate in group discussion with appropriate audiovisual support. This course will be taken asynchronously through Central Piedmont Community College Dual Enrollment College Transfer Pathway. Students are required to follow the CPCC calendar, but will meet at Charlotte Catholic for one semester.

### Dual Enrollment: Introduction to Sociology (CPCC: SOC 210) — 976

- **App path:** `departments[11].courses[1].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: ACA 122 (recommended), 2.8 unweighted GPA or assessment scores and prior approval required. Quality Points: A = 5
- **Description:** This course introduces the scientific study of human society, culture, and social interactions. Topics include socialization, research methods, diversity and inequality, cooperation and conflict, social change, social institutions, and organizations. Upon completion, students should be able to demonstrate knowledge of sociological concepts as they apply to the interplay among individuals, groups, and societies. This course will be taken asynchronously through Central Piedmont Community College Dual Enrollment College Transfer Pathway. Students are required to follow the CPCC calendar, but will meet at Charlotte Catholic for one semester.

### Dual Enrollment: Art Appreciation (CPCC ART 111) — 977

- **App path:** `departments[11].courses[2].description`
- **Eligibility:** Grade: 12th Elective Prerequisites: ACA 122 (recommended), 2.8 unweighted GPA or assessment scores and prior approval required. Quality Points: A = 5
- **Description:** This course introduces the origins and historical development of art. Emphasis is placed on the relationship of design principles to various art forms including but not limited to sculpture, painting, and architecture. Upon completion, students should be able to identify and analyze a variety of artistic styles, periods, and media. Concepts related to media and technique will be introduced. This course will be taken asynchronously through Central Piedmont Community College Dual Enrollment College Transfer Pathway. Students are required to follow the CPCC calendar, but will meet at Charlotte Catholic for one semester.
