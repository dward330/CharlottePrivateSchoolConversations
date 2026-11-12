# Charlotte Latin School — Course Offerings — Curriculum Guide Full Descriptions (current listing, fetched 2026-11-11)

**Provenance**

- **Compiled by:** Claude Code, plan `coursecensus` Batch 1, at Derrick's request
- **Date fetched:** 2026-11-11
- **Why:** the earlier record (`Charlotte Latin - Course Offerings - Curriculum Guide.md`)
  holds the app's own descriptions word for word for 91% of courses, so it cannot catch a
  description that drifted from the school's text. This file holds the school's own text, for
  the description-to-catalog census.
- **Finding: Charlotte Latin DOES publish per-course Upper School descriptions.** Every course
  title on the Upper School course-offerings page (S1) is a Finalsite click-to-open post whose
  body is not in the page HTML. The earlier record read the page with a plain fetch, saw titles
  only, and recorded "titles only, no per-course descriptions" — a retrieval gap, not a
  publication gap (the same trap recorded for Covenant Day). Each post was fetched here from the
  site's own popup endpoint:
  `https://www.charlottelatin.org/fs/elements/31330?is_popup=true&post_id=<id>&show_post=true`
  (element `fsEl_31330`, 136 posts: 122 courses plus department-introduction posts).
- **Method:** HTML fetched with curl, converted to text (scripts, styles and site navigation
  dropped; text otherwise unchanged). Lower and Middle School pages (S2, S3) also hold
  click-to-open posts (elements 43779 and 39840); those 8 posts were fetched the same way and are
  included under their division.
- **Undated.** None of these pages carries a year. They are the school's live text on the fetch
  date.
## Source URLs

| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.charlottelatin.org/academics/upper-school/course-offerings | Upper School course list (13 department headings) with a click-to-open description post per course |
| S1-post | https://www.charlottelatin.org/fs/elements/31330?is_popup=true&post_id=<id>&show_post=true | Each Upper School course's own description (post id per course in the index below) |
| S2 | https://www.charlottelatin.org/academics/middle-school | Middle School page: named courses with descriptions, plus 3 posts (element 39840) |
| S3 | https://www.charlottelatin.org/academics/lower-school | Lower School page: grade-level highlights and special-area classes, plus 5 statement posts (element 43779) |
| S4 | https://www.charlottelatin.org/academics/upper-school | Upper School overview (department framing) |

## Index — every app course, in app order

Upper School rows name the S1 post holding that course's own description (matched by exact
title; a row marked "no post with this title" has none). Lower and Middle School rows point to
the division section.

| App path | Division | Department | Title | Where |
| --- | --- | --- | --- | --- |
| `divisions[0].departments[0].courses[0]` | Lower School Courses | Core Academics | Structured Literacy | Lower School page (S3) |
| `divisions[0].departments[0].courses[1]` | Lower School Courses | Core Academics | Mathematics | Lower School page (S3) |
| `divisions[0].departments[0].courses[2]` | Lower School Courses | Core Academics | Science | Lower School page (S3) |
| `divisions[0].departments[0].courses[3]` | Lower School Courses | Core Academics | History / Social Studies | Lower School page (S3) |
| `divisions[0].departments[0].courses[4]` | Lower School Courses | Core Academics | STEAM | Lower School page (S3) |
| `divisions[0].departments[1].courses[0]` | Lower School Courses | World Language | Spanish | Lower School page (S3) |
| `divisions[0].departments[2].courses[0]` | Lower School Courses | Arts, PE & Library | Music | Lower School page (S3) |
| `divisions[0].departments[2].courses[1]` | Lower School Courses | Arts, PE & Library | Art | Lower School page (S3) |
| `divisions[0].departments[2].courses[2]` | Lower School Courses | Arts, PE & Library | Band / Strings / Choir | Lower School page (S3) |
| `divisions[0].departments[2].courses[3]` | Lower School Courses | Arts, PE & Library | Physical Education | Lower School page (S3) |
| `divisions[0].departments[2].courses[4]` | Lower School Courses | Arts, PE & Library | Library | Lower School page (S3) |
| `divisions[1].departments[0].courses[0]` | Middle School Courses | English | English 6 | Middle School page (S2) |
| `divisions[1].departments[0].courses[1]` | Middle School Courses | English | English 7 | Middle School page (S2) |
| `divisions[1].departments[0].courses[2]` | Middle School Courses | English | English 8 | Middle School page (S2) |
| `divisions[1].departments[1].courses[0]` | Middle School Courses | History | History 6: Ancient World History & Culture | Middle School page (S2) |
| `divisions[1].departments[1].courses[1]` | Middle School Courses | History | History 7: A More Perfect Union | Middle School page (S2) |
| `divisions[1].departments[1].courses[2]` | Middle School Courses | History | History 8 | Middle School page (S2) |
| `divisions[1].departments[2].courses[0]` | Middle School Courses | Mathematics | Math 6 | Middle School page (S2) |
| `divisions[1].departments[2].courses[1]` | Middle School Courses | Mathematics | Pre-Algebra | Middle School page (S2) |
| `divisions[1].departments[2].courses[2]` | Middle School Courses | Mathematics | Advanced Pre-Algebra | Middle School page (S2) |
| `divisions[1].departments[2].courses[3]` | Middle School Courses | Mathematics | Algebra IA | Middle School page (S2) |
| `divisions[1].departments[2].courses[4]` | Middle School Courses | Mathematics | Algebra I | Middle School page (S2) |
| `divisions[1].departments[2].courses[5]` | Middle School Courses | Mathematics | Advanced Algebra | Middle School page (S2) |
| `divisions[1].departments[3].courses[0]` | Middle School Courses | Science | Science 6 | Middle School page (S2) |
| `divisions[1].departments[3].courses[1]` | Middle School Courses | Science | Science 7 | Middle School page (S2) |
| `divisions[1].departments[3].courses[2]` | Middle School Courses | Science | Science 8 | Middle School page (S2) |
| `divisions[1].departments[4].courses[0]` | Middle School Courses | World Languages | Latin 7 | Middle School page (S2) |
| `divisions[1].departments[4].courses[1]` | Middle School Courses | World Languages | Latin I | Middle School page (S2) |
| `divisions[1].departments[4].courses[2]` | Middle School Courses | World Languages | French 6 | Middle School page (S2) |
| `divisions[1].departments[4].courses[3]` | Middle School Courses | World Languages | French 7 | Middle School page (S2) |
| `divisions[1].departments[4].courses[4]` | Middle School Courses | World Languages | French I (MS) | Middle School page (S2) |
| `divisions[1].departments[4].courses[5]` | Middle School Courses | World Languages | Spanish 6 | Middle School page (S2) |
| `divisions[1].departments[4].courses[6]` | Middle School Courses | World Languages | Spanish 7 | Middle School page (S2) |
| `divisions[1].departments[4].courses[7]` | Middle School Courses | World Languages | Spanish I (MS) | Middle School page (S2) |
| `divisions[1].departments[5].courses[0]` | Middle School Courses | Electives | Art / Band / Concert Choir / Strings | Middle School page (S2) |
| `divisions[1].departments[5].courses[1]` | Middle School Courses | Electives | Engineering | Middle School page (S2) |
| `divisions[1].departments[5].courses[2]` | Middle School Courses | Electives | Computer Programming | Middle School page (S2) |
| `divisions[1].departments[5].courses[3]` | Middle School Courses | Electives | Drama | Middle School page (S2) |
| `divisions[1].departments[5].courses[4]` | Middle School Courses | Electives | Leadership Lab | Middle School page (S2) |
| `divisions[1].departments[5].courses[5]` | Middle School Courses | Electives | Speech and Debate | Middle School page (S2) |
| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | World Literature | S1 post 202 |
| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | Composition | S1 post 203 |
| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | American Literature | S1 post 204 |
| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | American Literature (Honors) | S1 post 205 |
| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | English 12 AP: Literature and Composition | S1 post 207 |
| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | Literature of War — Stories, Secrets, and Survival | S1 post 4738 |
| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | Horror & The Other in Western Literature | S1 post 3713 |
| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | From Book To Box Office | S1 post 4735 |
| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Shakespeare and the Human Condition | S1 post 213 |
| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Exploring Imaginary Worlds in Fantasy Literature | S1 post 4736 |
| `divisions[2].departments[0].courses[10]` | Upper School Courses | English | Early British Literature — Heroes, Myths, & Monsters | S1 post 4737 |
| `divisions[2].departments[0].courses[11]` | Upper School Courses | English | Visions of the Future | S1 post 3715 |
| `divisions[2].departments[1].courses[0]` | Upper School Courses | History | World History I | S1 post 216 |
| `divisions[2].departments[1].courses[1]` | Upper School Courses | History | World History II | S1 post 217 |
| `divisions[2].departments[1].courses[2]` | Upper School Courses | History | United States History | S1 post 218 |
| `divisions[2].departments[1].courses[3]` | Upper School Courses | History | United States History (AP) | S1 post 220 |
| `divisions[2].departments[1].courses[4]` | Upper School Courses | History | European History (AP) | S1 post 221 |
| `divisions[2].departments[1].courses[5]` | Upper School Courses | History | United States Government and Politics (AP) | S1 post 222 |
| `divisions[2].departments[1].courses[6]` | Upper School Courses | History | Comparative Government and Politics (AP) | S1 post 223 |
| `divisions[2].departments[1].courses[7]` | Upper School Courses | History | Honors American Studies | S1 post 219 |
| `divisions[2].departments[1].courses[8]` | Upper School Courses | History | History of Music Seminar | S1 post 2288 |
| `divisions[2].departments[1].courses[9]` | Upper School Courses | History | Strangers in a Common Land: Global Immigration and Migration | S1 post 2287 |
| `divisions[2].departments[2].courses[0]` | Upper School Courses | Humanities & Social Sciences | Economics (AP) | S1 post 227 |
| `divisions[2].departments[2].courses[1]` | Upper School Courses | Humanities & Social Sciences | Psychology (AP) | S1 post 228 |
| `divisions[2].departments[2].courses[2]` | Upper School Courses | Humanities & Social Sciences | Philosophy: The Love of Wisdom | S1 post 2285 |
| `divisions[2].departments[2].courses[3]` | Upper School Courses | Humanities & Social Sciences | Defining Moments: The Civil Rights Movement | S1 post 4739 |
| `divisions[2].departments[3].courses[0]` | Upper School Courses | Mathematics | Algebra I | S1 post 230 |
| `divisions[2].departments[3].courses[1]` | Upper School Courses | Mathematics | Algebra IB | S1 post 231 |
| `divisions[2].departments[3].courses[2]` | Upper School Courses | Mathematics | Geometry | S1 post 232 |
| `divisions[2].departments[3].courses[3]` | Upper School Courses | Mathematics | Geometry (Honors) | S1 post 233 |
| `divisions[2].departments[3].courses[4]` | Upper School Courses | Mathematics | Algebra II/Trigonometry | S1 post 234 |
| `divisions[2].departments[3].courses[5]` | Upper School Courses | Mathematics | Algebra II/Trigonometry (Honors) | S1 post 235 |
| `divisions[2].departments[3].courses[6]` | Upper School Courses | Mathematics | Advanced Functions and Trigonometry | S1 post 236 |
| `divisions[2].departments[3].courses[7]` | Upper School Courses | Mathematics | Pre-Calculus | S1 post 237 |
| `divisions[2].departments[3].courses[8]` | Upper School Courses | Mathematics | Pre-Calculus (Honors) | S1 post 238 |
| `divisions[2].departments[3].courses[9]` | Upper School Courses | Mathematics | Calculus | S1 post 239 |
| `divisions[2].departments[3].courses[10]` | Upper School Courses | Mathematics | Mathematics of Social Choice and Management Science | S1 post 240 |
| `divisions[2].departments[3].courses[11]` | Upper School Courses | Mathematics | Introduction to Probability and Statistics | S1 post 241 |
| `divisions[2].departments[3].courses[12]` | Upper School Courses | Mathematics | Data Analytics: How Do They Know? | S1 post 3716 |
| `divisions[2].departments[3].courses[13]` | Upper School Courses | Mathematics | Statistics (AP) | S1 post 242 |
| `divisions[2].departments[3].courses[14]` | Upper School Courses | Mathematics | Calculus (AP-AB) | S1 post 243 |
| `divisions[2].departments[3].courses[15]` | Upper School Courses | Mathematics | Calculus (AP-BC) | S1 post 244 |
| `divisions[2].departments[4].courses[0]` | Upper School Courses | Science | Conceptual Physics | S1 post 246 |
| `divisions[2].departments[4].courses[1]` | Upper School Courses | Science | Advanced Conceptual Physics | S1 post 247 |
| `divisions[2].departments[4].courses[2]` | Upper School Courses | Science | Chemistry | S1 post 248 |
| `divisions[2].departments[4].courses[3]` | Upper School Courses | Science | Chemistry (Honors) | S1 post 249 |
| `divisions[2].departments[4].courses[4]` | Upper School Courses | Science | Chemistry II (AP) | S1 post 250 |
| `divisions[2].departments[4].courses[5]` | Upper School Courses | Science | Biology | S1 post 251 |
| `divisions[2].departments[4].courses[6]` | Upper School Courses | Science | Biology (Honors) | S1 post 252 |
| `divisions[2].departments[4].courses[7]` | Upper School Courses | Science | Biology (AP) | S1 post 253 |
| `divisions[2].departments[4].courses[8]` | Upper School Courses | Science | Environmental Science (AP) | S1 post 254 |
| `divisions[2].departments[4].courses[9]` | Upper School Courses | Science | Physics (Honors) | S1 post 255 |
| `divisions[2].departments[4].courses[10]` | Upper School Courses | Science | Physics C (Mechanics) (AP) | S1 post 256 |
| `divisions[2].departments[4].courses[11]` | Upper School Courses | Science | Physics C (Mechanics and E&M) (AP) | S1 post 1304 |
| `divisions[2].departments[4].courses[12]` | Upper School Courses | Science | Astronomy | S1 post 4740 |
| `divisions[2].departments[4].courses[13]` | Upper School Courses | Science | Genetics | S1 post 259 |
| `divisions[2].departments[4].courses[14]` | Upper School Courses | Science | Human Anatomy and Physiology | S1 post 260 |
| `divisions[2].departments[4].courses[15]` | Upper School Courses | Science | Science of Medicine | S1 post 1877 |
| `divisions[2].departments[5].courses[0]` | Upper School Courses | World Languages | French I–V | S1 post 175, 176, 177, 179, 4741 |
| `divisions[2].departments[5].courses[1]` | Upper School Courses | World Languages | French III/IV Honors | S1 post 178, 180 |
| `divisions[2].departments[5].courses[2]` | Upper School Courses | World Languages | French Language & Culture (AP) | S1 post 182 |
| `divisions[2].departments[5].courses[3]` | Upper School Courses | World Languages | Spanish I, 1B, II, III, IV, V | S1 post 191, 1303, 192, 193, 195, 197, 198 |
| `divisions[2].departments[5].courses[4]` | Upper School Courses | World Languages | Spanish III/IV Honors | S1 post 194, 196 |
| `divisions[2].departments[5].courses[5]` | Upper School Courses | World Languages | Spanish Language and Culture (AP) | S1 post 199 |
| `divisions[2].departments[5].courses[6]` | Upper School Courses | World Languages | Spanish Literature and Culture (AP) | S1 post 200 |
| `divisions[2].departments[5].courses[7]` | Upper School Courses | World Languages | Latin I–V | S1 post 185, 186, 187 |
| `divisions[2].departments[5].courses[8]` | Upper School Courses | World Languages | Latin III Honors / Latin IV (Honors) | S1 post 188, 189 |
| `divisions[2].departments[5].courses[9]` | Upper School Courses | World Languages | Latin V (AP) | S1 post 190 |
| `divisions[2].departments[5].courses[10]` | Upper School Courses | World Languages | Greek III (Honors) | S1 post 4746 |
| `divisions[2].departments[5].courses[11]` | Upper School Courses | World Languages | Greek IV (Honors) | S1 post 1875 |
| `divisions[2].departments[6].courses[0]` | Upper School Courses | Innovation & Design | Engineering I | S1 post 262 |
| `divisions[2].departments[6].courses[1]` | Upper School Courses | Innovation & Design | Engineering II | S1 post 263 |
| `divisions[2].departments[6].courses[2]` | Upper School Courses | Innovation & Design | Introduction to Civil Engineering | S1 post 3717 |
| `divisions[2].departments[6].courses[3]` | Upper School Courses | Innovation & Design | Engineering in Motion: How to Make Things Move | S1 post 4747 |
| `divisions[2].departments[6].courses[4]` | Upper School Courses | Innovation & Design | Advanced Topics in Engineering | S1 post 266 |
| `divisions[2].departments[6].courses[5]` | Upper School Courses | Innovation & Design | Entrepreneurship and Global Marketplace Leadership | S1 post 267 |
| `divisions[2].departments[6].courses[6]` | Upper School Courses | Innovation & Design | Digital Design and Web Development | S1 post 268 |
| `divisions[2].departments[6].courses[7]` | Upper School Courses | Innovation & Design | Cybersecurity 1: Networking Fundamentals (AP) | S1 post 4742 |
| `divisions[2].departments[6].courses[8]` | Upper School Courses | Innovation & Design | Computer Science Principles (AP) | S1 post 1305 |
| `divisions[2].departments[6].courses[9]` | Upper School Courses | Innovation & Design | Computer Science A (AP) | S1 post 270 |
| `divisions[2].departments[6].courses[10]` | Upper School Courses | Innovation & Design | App Design/Game Design | S1 post 1307 |
| `divisions[2].departments[6].courses[11]` | Upper School Courses | Innovation & Design | Java Data Structures | S1 post 1308 |
| `divisions[2].departments[7].courses[0]` | Upper School Courses | Communications & Global Leadership | Introduction to Speech and Debate | S1 post 272 |
| `divisions[2].departments[7].courses[1]` | Upper School Courses | Communications & Global Leadership | Advanced Debate | S1 post 273 |
| `divisions[2].departments[7].courses[2]` | Upper School Courses | Communications & Global Leadership | Advanced Speech | S1 post 274 |
| `divisions[2].departments[7].courses[3]` | Upper School Courses | Communications & Global Leadership | Communications and Twenty-First Century Journalism | S1 post 276 |
| `divisions[2].departments[7].courses[4]` | Upper School Courses | Communications & Global Leadership | Leadership and Social Responsibility | S1 post 4389 |
| `divisions[2].departments[7].courses[5]` | Upper School Courses | Communications & Global Leadership | Leadership for the Twenty-First Century | S1 post 275 |
| `divisions[2].departments[7].courses[6]` | Upper School Courses | Communications & Global Leadership | Yearbook | S1 post 277 |
| `divisions[2].departments[7].courses[7]` | Upper School Courses | Communications & Global Leadership | Student Internship Program | S1 post 278 |
| `divisions[2].departments[8].courses[0]` | Upper School Courses | Performing Arts | Acting | S1 post 2290 |
| `divisions[2].departments[8].courses[1]` | Upper School Courses | Performing Arts | Film Acting | S1 post 3719 |
| `divisions[2].departments[8].courses[2]` | Upper School Courses | Performing Arts | Stagecraft I | S1 post 2292 |
| `divisions[2].departments[8].courses[3]` | Upper School Courses | Performing Arts | Stagecraft II | S1 post 2292 |
| `divisions[2].departments[8].courses[4]` | Upper School Courses | Performing Arts | Advanced Design | S1 post 2294 |
| `divisions[2].departments[8].courses[5]` | Upper School Courses | Performing Arts | After-School Theater and Stagecraft | S1 post 653 |
| `divisions[2].departments[8].courses[6]` | Upper School Courses | Performing Arts | Band | S1 post 286 |
| `divisions[2].departments[8].courses[7]` | Upper School Courses | Performing Arts | Concert Choir | S1 post 287 |
| `divisions[2].departments[8].courses[8]` | Upper School Courses | Performing Arts | Orchestra | S1 post 288 |
| `divisions[2].departments[8].courses[9]` | Upper School Courses | Performing Arts | Music Theory I | S1 post 289 |
| `divisions[2].departments[8].courses[10]` | Upper School Courses | Performing Arts | Music Theory AP | S1 post 654 |
| `divisions[2].departments[9].courses[0]` | Upper School Courses | Visual Arts | Art Studio I–IV | S1 post 291, 292, 293, 294 |
| `divisions[2].departments[9].courses[1]` | Upper School Courses | Visual Arts | Photography | S1 post 4395 |
| `divisions[2].departments[10].courses[0]` | Upper School Courses | Physical Education | Physical Education/Health | S1 post 297 |
| `divisions[2].departments[10].courses[1]` | Upper School Courses | Physical Education | Introduction to Sports Medicine | S1 post 298 |

## Upper School — course posts (S1), in the page's own order

### World Languages

- Post id: 173 · tags: World Languages

Students benefit from learning a second language in a number of practical and individual ways. In studying another language, whether modern or classical, a student develops knowledge of another culture, which provides a point of reference for expanding knowledge of one’s own culture. The advantages of language study also include enhanced communication skills, increased competence in English, increased capacity for empathy, and a marketable skill in a variety of professions. From the very beginning levels of study, students are fully immersed and engaged in communicating and understanding the target language within cultural contexts. To attain the goal of reasonable proficiency, it is essential to have a long sequence of language study.

Charlotte Latin students are required to complete successfully the study of a classical or modern language through the third year level, with at least three years to be completed in the Upper School. To ensure the proficiency level demanded by most colleges and universities and to be viable candidates for competitive admissions, students are strongly advised to study at least one language through twelfth grade. All language courses are sequential, so courses are open to qualified students per departmental guidelines and placement. Recognizing the value of immersion in the culture and language being studied, the CLS World Languages Department also strongly recommends participation in our exchange programs.

### French I

- Post id: 175 · tags: World Languages

This course begins the development of proficiency in the three modes of communication (interpretive, interpersonal, and presentational) with an emphasis on speaking and listening. Students communicate both with each other and their teacher on select familiar topics using language they have practiced and acquired. Additionally, students explore the French language and Francophone cultures through engagement with authentic resources.

### French II

- Post id: 176 · tags: World Languages

This course continues to build on the work begun in French I in order to develop proficiency further in the three modes of communication (interpretive, interpersonal, and presentational) through increased emphasis on reading, writing, and speaking. Students expand their vocabulary and increase their command of basic grammar structures. A focus on aspects of Francophone cultures permits the further acquisition and reinforcement of vocabulary and grammar concepts.

### French III

- Post id: 177 · tags: World Languages

This intermediate course prepares students for greater self-expression through the three modes of communication (interpretive, interpersonal, and presentational). Students will be challenged by extensive practice with past tenses and the development of a greater range of vocabulary. Francophone culture is presented in context with thematic vocabulary topics and is accompanied by authentic resources in the form of podcasts, conversations, and written texts. Class is conducted in French.

### French III (Honors)

- Post id: 178 · tags: World Languages

French III Honors is an in-depth, fast-paced course for the motivated language student. This course demands a willingness to participate fully in class discussions and frequent interpersonal activities. Students must possess an excellent foundation of key grammatical structures and a willingness to participate regularly and fully in class discussions and oral presentations in the target language. The course challenges students to raise their level of communication through extensive speaking and writing in French. Increased emphasis is placed on exposure to authentic Francophone podcasts and conversations. Class is conducted extensively in French.

### French V

- Post id: 4741 · tags: World Languages

The emphasis in this course for fifth year students is on self-expression through the lens of French film, music, art, literature and more. The course focuses on contemporary culture and regions of the francophone world. The development of conversation and composition skills is a primary goal of the course. Prerequisite: French IV or French IV (H). Minimum enrollment is required.

### French IV

- Post id: 179 · tags: World Languages

This course provides enhancement of the language skills learned in previous levels of French. Throughout the process of refining the ability to communicate in French as well as conveying understanding of the peoples, products and practices of Francophone countries, the student continues to apply and expand grammatical concepts and vocabulary. A major goal of the course is to increase cultural awareness and practical proficiency in the language within the three modes of communication (interpersonal, interpretive, and presentational). The reading of Francophone texts and the study of conversational topics are additional tools for increased comprehension and communication. Class is conducted in French.

### Greek III (Honors)

- Post id: 4746 · tags: World Languages

This course continues to refine students’ knowledge of Greek grammar and syntax, and so is a continuation of Greek I and II. The focus, however, shifts to the reading and study of fifth century BC Attic writers such as Xenophon and Plato. Greek cannot fulfill the classical/modern language graduation requirement but is taken instead as a second language course. This course meets before traditional school hours and requires great dedication. Additionally this course will not be counted as one of the six courses required in a school day; it is purely additive to a full schedule. Greek II (Honors) is a prerequisite, and the permission of the instructor is required, as is minimum enrollment.

### French IV (Honors)

- Post id: 180 · tags: World Languages

In this advanced language course, students engage thoroughly in all modes of communication (interpersonal, interpretive, and presentational). As they move toward more creative manipulation of the language and the ability to understand the peoples, products, and perspectives of Francophone countries, students put into practice advanced grammar concepts and develop a more complex working vocabulary through dialogues, listening activities, essays, oral presentations, and the analysis of authentic source materials. Students are introduced to several thematic units that will be covered in-depth in the AP French Language and Culture course. Class is conducted exclusively in French.

### French Language & Culture (AP)

- Post id: 182 · tags: World Languages

This course is designed for the dedicated, well-motivated language student who can understand spoken and written French at an advanced level. Students must be able to write French accurately and proficiently. Students must be willing and able to speak in French at all times, showing a high degree of sophistication in oral expression. In preparation for the required AP Language and Culture Examination, students develop proficiencies across the full range of communication modes (interpersonal, presentational, and interpretive). The course introduces the application of stylistic devices to enhance a high caliber of writing. Authentic materials (newspaper articles, podcasts, films, advertisements, music, etc.) from France and other Francophone countries provide important literary and cultural insights. Students must take the Advanced Placement examination for course credit. Minimum enrollment is required.

### Greek IV (Honors)

- Post id: 1875 · tags: World Languages

Emphasis in this course is placed upon accurate translation, appreciation for style and figures of rhetoric, and command of grammar, syntax, and vocabulary. English to Greek composition is a regular feature of the course. This course meets before traditional school hours and requires great dedication of students. Additionally, this course will not be counted as one of the six courses required in a school day; it is purely additive to a full schedule. The permission of the instructor is required, as is minimum enrollment.

### Latin I

- Post id: 185 · tags: World Languages

This course introduces students to elementary Latin vocabulary and grammar and begins to build their ability to read simple Latin stories. Because Latin is the origin of more than 60% of English words, students gain valuable insight into their own language, and through integrated readings and presentations, discover how Greco-Roman art, history, culture, and mythology have influenced the modern world. Membership in the Junior Classical League offers optional opportunities for students at all levels of Latin to engage in academic, creative, and visual arts activities and competitions at the state and national levels.

### Latin II

- Post id: 186 · tags: World Languages

This course reviews and builds upon the material introduced in Level I and completes the basics of Latin grammar and vocabulary. Complex sentence structures, including indirect discourse and the subjunctive mood, are introduced to help students prepare to read Latin literature. Mythology, art, culture, and history continue to receive attention, as do the connections between Latin and English.

### Latin III

- Post id: 187 · tags: World Languages

Students receive extensive practice and review of grammar and vocabulary while reading adapted mythological stories in preparation for the transition to authentic Latin texts. Selections from Cicero and Catullus are introduced gradually as students gain proficiency in reading, translation, and analysis of works composed during one of the most turbulent periods in Roman history.

### Latin III (Honors)

- Post id: 188 · tags: World Languages

This course is designed for students whose demonstrated mastery of fundamentals indicates a readiness for authentic literature. An overview of the history and culture of the late Roman Republic accompanies an in-depth examination of selected letters and orations of Cicero and the poems of Catullus. The emphasis in this transitional year balances analysis of forms and vocabulary with focus on literary styles, figures of speech, and rhetorical devices.

### Latin IV (Honors)

- Post id: 189 · tags: World Languages

The cultural milieu of the Roman Empire is the backdrop for readings throughout the year. Students explore prose authors such as Pliny and Tacitus before beginning a study of two prominent poets of the Augustan Age, Ovid and Horace. There is an emphasis on the rhetorical, metrical, and cultural conventions of epic and lyric poetry. Throughout the course, vocabulary, grammar, syntax, and reading speed are cultivated and enhanced by weekly prose compositions and readings at sight.

### Latin V (AP)

- Post id: 190 · tags: World Languages

This course prepares students for the Advanced Placement Latin Examination. The course follows the outline of the College Entrance Examination Board, with students reading for pleasure and understanding the selections from Caesar’s De Bello Gallico and Vergil’s Aeneid found on the AP syllabus. Students examine the relevant issues in prosody and criticism, and are expected to translate accurately and write critically about the literature under study. Students must take the Advanced Placement examination for course credit.

### Spanish I

- Post id: 191 · tags: World Languages

This course begins the development of proficiency in the three modes of communication (interpersonal, interpretive, and presentational) with an emphasis on speaking and listening. Students communicate both with each other and their teacher on select familiar topics using language they have practiced and acquired. Additionally, students explore the Spanish language and Spanish-speaking cultures through engagement with authentic resources.

### Spanish 1B

- Post id: 1303 · tags: World Languages

This course focuses on providing students with rich opportunities to interact with authentic material while reinforcing foundational grammatical structures and concepts, using an interactive and student-centered approach to acquiring the target language. Students develop stronger confidence and abilities in interpretive, interpersonal, and presentational communication as they develop the grammatical precision and understanding necessary for meaningful communication. Participants will grow in comprehension, proficiency, and cultural fluency so they are fully prepared to continue to Spanish II.

### Spanish II

- Post id: 192 · tags: World Languages

This course continues to build on the work begun in Spanish I in order to further develop proficiency in the three modes of communication (interpretive, interpersonal, and presentational) through increased emphasis on reading, listening, speaking, and writing in the target language. Students expand their ability to communicate both with each other and their teacher on a variety of familiar topics, and move from formulaic to creative and original language production. Additionally, students explore the Spanish language and Spanish-speaking cultures through engagement with authentic resources.

### Spanish III

- Post id: 193 · tags: World Languages

This is an intermediate language course for students who have successfully completed Spanish II. Students continue to work within the three modes of communication — presentational, interpersonal, and interpretive. This course further develops students’ oral and written expression within culturally relevant topics. Previous language skills are reviewed and expanded upon through the use of authentic materials (short films, commercials, music, etc.). Class is conducted in Spanish.

### Spanish III (Honors)

- Post id: 194 · tags: World Languages

Spanish III Honors is an in-depth, fast-paced course for the seriously-motivated language student. This course demands a willingness to participate fully in class discussions and frequent interpersonal activities. Students entering into this course must possess an excellent foundation in the language and a curiosity about the Spanish-speaking world. Students enrolled in this course should be willing to work with both their teacher and their peers exclusively in the target language. The course challenges students to raise their level of communication through extensive speaking and writing as well as through greater exposure to a variety of authentic texts, videos, and audio recordings. Class is conducted extensively in Spanish.

### Spanish IV

- Post id: 195 · tags: World Languages

This a communication-based course that addresses a variety of topics related to the Spanish-speaking cultures of the world. The goal of the course is to increase cultural awareness and practical proficiency in the language within the three modes of communication — interpersonal, presentational, and interpretive. Students discuss topics that are of interest and relevance to their own life experiences. Class is conducted in Spanish.

### Spanish IV (Honors)

- Post id: 196 · tags: World Languages

In this advanced language course, students engage thoroughly in all modes of communication — interpersonal, interpretive, and presentational — in both speaking and writing. Students enrolled in this course should be entirely willing and able to work with both their teacher and their peers exclusively in the target language. Students move toward more creative and original manipulation of the language, while working within culturally relevant contexts. Advanced level grammar and vocabulary acquisition are derived from thematic and contextual frameworks. Throughout the course, students are introduced to increasingly challenging authentic resources such as news reports and articles, podcasts, interviews, literature (poetry and prose), as well as music. The themes and contexts studied in this course prepare students for the in-depth study necessary at the AP level.

### Spanish V: Contemporary Issues of the Hispanic World

- Post id: 197 · tags: World Languages

[Fall semester only.]

This course highlights contemporary issues and challenges pertaining to the Spanish-speaking world through the analysis of current events and media. Students increase their vocabulary, range of expression, and understanding of grammatical structures while exploring a variety of topics related to politics, economics, social welfare, and the environment. Authentic podcasts, short stories, radio programs, films, newspapers, and magazine articles are used to develop students’ interpersonal skills and to deepen their understanding of the issues affecting Hispanic populations in both the United States and abroad. Attention is given to the development of various forms of written and verbal communication: interpretive, persuasive, interpersonal, and presentational. Prerequisite: Spanish IV or IV (H).

### Spanish V: Composition and Conversation

- Post id: 198 · tags: World Languages

[Spring semester only.]

This course develops students’ ability to communicate in Spanish both orally and in written form through interpersonal discussions and debates, oral presentations, written analysis, and creative writing. Authentic resources such as podcasts, short stories, radio programs, films, newspapers, and magazine articles are used to develop students’ cultural knowledge of the Spanish-speaking world and to hone their interpersonal communication skills. The focus of this course is on developing a strong vocabulary base through a variety of interpretive activities that will enable students to understand the language that they may read and hear when traveling in a Spanish-speaking country.

Prerequisite: Spanish IV or IV (H).

### Spanish Language and Culture (AP)

- Post id: 199 · tags: World Languages

This course is designed for the dedicated, well-motivated language student who can understand spoken and written Spanish at an advanced level. The student must be able to speak and write Spanish accurately and proficiently. The student must be willing and able to speak in Spanish at all times, showing a high degree of sophistication in oral expression. In preparation for the required AP Language Examination, this course offers new challenges in vocabulary acquisition, communicative proficiency, listening and reading comprehension, as well as cultural proficiency. Students develop proficiencies across the full range of communication modes (interpersonal, presentational, and interpretive) and use stylistic devices to enhance a high caliber of writing. Authentic materials (newspaper articles, podcasts, films, advertisements, music, etc.) from Spain and Latin America provide important literary and cultural insights. Students must take the Advanced Placement examination for course credit.

### Spanish Literature and Culture (AP)

- Post id: 200 · tags: World Languages

The AP Spanish Literature and Culture course uses a thematic approach to introduce students to representative texts (short stories, novels, poetry, and essays) from Peninsular Spanish, Latin American, and United States Hispanic literature. Students develop proficiencies across the full range of communication modes (interpersonal, presentational, and interpretive), thereby honing their critical reading and analytical writing skills. Literature is examined within the context of its time and place, as students reflect on the many voices and cultures present in the required readings. The course also includes exploration of various media (e.g., art, film, articles, literary criticism). AP Spanish Literature and Culture is designed for students who have successfully completed the AP Spanish Language and Culture course. In the case of native or heritage speakers, there may be a different course of study leading to this course. This course is conducted exclusively in Spanish. Students must take the Advanced Placement examination for course credit. Minimum enrollment is required.

### English

- Post id: 201 · tags: English

The English Department strives to develop in each student strong reading, writing, and critical thinking skills and to provide an intellectual framework that encourages students to consider a wide range of ideas and human experiences. Literature courses introduce students to masterworks of the American, British, and world literary canons in the cultural contexts that make literature accessible, meaningful, and relevant. Composition skills support literary analysis at all levels, in conjunction with original, non-literary writing that considers themes and issues relevant to the literature or drawn from students’ responses and personal experiences.

### English World Literature

- Post id: 202 · tags: English

[Required of all freshmen.]

This yearlong course introduces students to literature as an expression of cultural tradition and identity by exploring works from the world canon. While reading literature from numerous continents and time periods, students strengthen and expand their skills in reading comprehension, as well as in analytical and expository writing. Assigned readings span basic genres, including novels, short fiction, poetry, and drama. In addition, students work on formal essays of literary analysis and practice in-class writing assignments. The curriculum also includes grammar practice and an online vocabulary program.

### English Composition

- Post id: 203 · tags: English

[Required of all sophomores.]

Students in Composition deepen their foundational skills in English, including annotation and reading comprehension, literary analysis, and discussion. This course also exposes students to a variety of genres including novels, short stories, poetry, plays, speeches, and nonfiction texts by authors from a wide range of backgrounds and time periods. In their study of nonfiction texts, students learn how to analyze rhetorical strategies and evaluate the strength of arguments, ultimately composing argumentative essays investigating original research questions. The course concludes with a final portfolio assignment that asks students to reflect metacognitively on their writing from the year and appreciate their growth. The curriculum also includes grammar practice and an online vocabulary program.

### English American Literature

- Post id: 204 · tags: English

[Open to juniors per departmental guidelines and placement.]

This survey course presents students with a chronological survey of representative texts from each literary eras in the American tradition. Students will explore the political, religious, and philosophical concerns at the heart of the American identity through a study of major works such as The Great Gatsby and a rich diversity of American literary voices. The literature studied comprises all genres including poetry, drama, speech, non-fiction essays, short stories, and novels. To expand students’ composition and critical thinking skills, our study of this literature will serve as the basis for daily classroom discussion and for a series of writing assignments including short literary analysis essays, a literary research paper engaging with literary criticism on a major work, and a variety of creative and critical writing assignments inspired by award-winning Scholastic writing about great American literature.

### English American Literature (Honors)

- Post id: 205 · tags: English

[Open to juniors per departmental guidelines and placement.]

Honors American Literature is a chronological survey course that reflects the diversity of styles, subjects, and authors that have emerged over the course of American history. It is designed for students genuinely interested in undertaking a rigorous study of challenging literature involving intensive practice in critical reading, literary analysis, and research. Readings will focus heavily on nineteenth-century literature, and the daily reading assignments will be significant. This class will ask students to write frequently and in multiple formats, and there will be a heightened emphasis on student independence in the writing and thinking processes. Because this is an Honors class, students will be expected to prepare carefully for class and to engage in class discussions.

### English 12 AP: Literature and Composition

- Post id: 207 · tags: English

[Open to seniors per departmental guidelines and placement.]

AP Literature and Composition focuses on in-depth literary analysis of both canonical and contemporary works of Western culture. Students must demonstrate college-level mastery in both class discussions and written work, preparing them for success on the required AP examination in the spring. The reading list comprises drama, fiction, and poetry from ancient Greece to Renaissance England to 20th century America.

Honors - level work in junior year English is not a requirement for English 12 AP. As an Advanced Placement Course, English 12 AP requires discipline and maturity from its students. Because an AP class is equivalent to a semester of college English, the reading load in this course is much heavier than in other English classes, and the works studied are demanding. Writing assignments assume strong analytical skills, sound mechanics, and competent style. Students who earn placement in the course should carefully consider their commitment to the course of study and their interest in English as a discipline before enrolling. Students enrolled in this course are required to take the Advanced Placement examination.

### Literature of War—Stories, Secrets, and Survival

- Post id: 4738 · tags: English

Dive into the gripping stories of war told through novels, poetry, and film. This class explores the literary response to 20th-century conflicts, from the soldier poetry of World War I to the Cold War intrigue to Ian Fleming’s James Bond novels to Joseph Conrad’s Heart of Darkness alongside its modern adaptation, Apocalypse Now. Explore human rights themes in Irish literature and study wartime journalism from Afghanistan and Ukraine. Along the way, you’ll learn about spycraft cryptology, psychological wellness, and Carl Jung’s theories, connecting literature to real-life military lessons and life skills. This course is perfect for students interested in history, storytelling, and the resilience of the human spirit.

### Horror & The Other in Western Literature

- Post id: 3713 · tags: English

[Semester course open primarily to seniors.]

Since the birth of storytelling, humanity has been transfixed by what frightens and disgusts us, and the horror genre has offered space to explore the darkest places of the human heart. Understandably, much of this genre has centered on our preoccupation with the Other– those who society perceives as not belonging – and our instinctive fear that those who are different might also be dangerous. In this survey course of western literature, students will explore the horror canon’s evolution from ancient monsters in the oral tradition to Romantic and Gothic horror. In our final unit, we will examine contemporary horror’s fixation on race, gender, and other identity markers as elements of the Other. In doing so, we hope to recognize the shadows inside of each of us, and come to terms with their place in our lives and our world

### From Book To Box Office

- Post id: 4735 · tags: English

Explore how stories transform from page to screen! You’ll dive into short stories and novels, and their film adaptations, analyzing how filmmakers bring literary elements like theme, character, and setting to life visually. We’ll discuss the challenges of adaptation, directors' creative decisions, and how different mediums shape meaning. Through readings, screenings, and discussions, you’ll compare the strengths of both forms and see how adaptations can reinterpret classic works. Using a workshop model, you’ll write, revise, and share your ideas in a supportive space, building your critical analysis and storytelling skills. By the end, you’ll have a new appreciation for the art of adaptation and the journey stories take across mediums.

### Shakespeare and the Human Condition

- Post id: 213 · tags: English

[Semester course open primarily to seniors.]

What does it mean to be human? Why do we love? Why do we hate? To what do we aspire? What motivates our individual thirsts? What do we regret and grieve? Shakespeare’s timeless plays tackle life’s biggest questions, offering a lens into the complexities of the human condition. Reading some of Shakespeare’s most memorable comedies and tragedies, students in this semester course explore the ways in which his plays touch on the abiding themes of the human condition. Through engaging discussions and modern film adaptations, students will uncover how Shakespeare’s stories reflect the struggles, triumphs, and emotions of our own time.

### Exploring Imaginary Worlds in Fantasy Literature

- Post id: 4736 · tags: English

Step into fantasy literature, where magic, power, and identity collide in captivating stories that reflect our own world. This course takes you on a journey through the evolution of fantasy, from its roots to modern masterpieces, exploring how these imaginative tales mirror real-world social structures and personal growth. You’ll dive into the differences between primary and secondary world fantasy, analyze texts using literary theory, and sharpen your research and writing skills. From epic quests to magical systems, this class invites you to think critically about how fantasy challenges and expands our perceptions of reality.

### Early British Literature—Heroes, Myths, & Monsters

- Post id: 4737 · tags: English

The earliest “great works” in British Literature are all tales of heroes, villains, and monsters. You will study three early masterpieces, starting with the Old English story of Beowulf, the first superhero in British Literature. Next will be the Medieval era and Arthurian Legend, represented by the classic story of Sir Gawain and the Green Knight. The course will end with a study of Chaucer’s The Canterbury Tales, a wild mix of different kinds of stories with surprisingly modern themes for a work published in 1400. As context for this period in British Literature, you will study a bit of Old English, try your hand at illuminating manuscripts, and check out the collections of the British Museum as sources of Britain’s rich poetic and bookish heritage.

### Visions of the Future

- Post id: 3715 · tags: English

[Semester course open primarily to seniors.]

What if the future isn’t as bright as we hope? This class dives into the gripping worlds of dystopian fiction, from classics like 1984 and Brave New World to modern hits like Station Eleven. Discover how authors use twisted societies to warn us about the dangers of technology, class divides, and power. Students will explore how these stories connect to real-world issues, analyze how rulers manipulate control and even uncover modern parallels to these chilling visions. Get ready to question society, dive into thought-provoking discussions, and imagine the future through the eyes of some of literature’s greatest minds.

### History

- Post id: 215 · tags: History

The History Department seeks to give students a broad understanding of the sweeping changes marking the human experience. The study of history serves as “citizenship training” for students in a democratic society, linking the struggles, triumphs, and tragedies of the past with the issues of the present. The department offers a balanced curriculum containing lessons in political models, economic systems, social movements, and human values in a complex world. The curriculum emphasizes a broad survey of world history in grades nine and ten, while moving toward more specific examinations of United States, European, and global history in grades 11 and 12.

The study of history develops and refines reading, writing, and thinking skills. Each course emphasizes the following college preparatory tasks: critical thinking; reading for understanding; effective discussion; scholarly research; and writing with depth, precision, and clarity.

Graduation Requirements

- All students must complete the World History curriculum.

- All students must complete a year-length course in United States history.

- Students are required to complete a minimum equivalent of three full years of history credit in the Charlotte Latin Upper School.

### World History I

- Post id: 216 · tags: History

[Required of all freshmen.]

While Europe provided the basis for American democracy, the rapid globalization of the world’s economy and its resources necessitates a multi-national historical perspective. World History I, a broad survey course, provides students in grade 9 with exposure to both a thematic and chronological approach to history from ancient civilizations to the early nineteenth century. World History I assists students in the development of college preparatory skills, including note taking, critical reading and writing, and research.

### World History II

- Post id: 217 · tags: History

[Required of all sophomores.]

The World History II course is the completion of the World History curriculum for freshmen and sophomores. The course focuses on the nineteenth and twentieth centuries.

The communication, technological, and transportation innovations of the last century have created an ever-shrinking world. As members of a world community, students must understand the history, culture, and faith traditions of their neighbors. The World History II course emphasizes the transformation from a pre-industrial society to “modernity” and change resulting from the interactions between world civilizations. The Industrial Revolution of the nineteenth century created a ripple effect that permeated the Americas, Africa, and Asia. The result has been an interaction between world societies, social revolutions, cultural developments, the emergence of nation-states, and international conflict.

### United States History

- Post id: 218 · tags: History

[This course, Honors American Studies, or US History AP is required after completion of the World History curriculum.]

This course examines key issues in American political, social, and economic history. United States History emphasizes advanced college preparatory skills such as essay writing, research, critical thinking, and discussion Topics covered during the first semester include: the American Revolution and the shaping of the Constitution, the Early Republic, the Sectional Conflict, the Civil War, and Reconstruction. Topics covered during the second semester include: Industrialization, Progressivism, the emergence of the U.S. as a world power, the World Wars and the Great Depression, the Cold War, postwar American society, and foreign relations in the post-Cold War world.

### Advanced Placement History Courses

- Post id: 4733 · tags: History

The History Department strives to place each student in a history course that is most appropriate for that student, where the student will be both successful and challenged.

### Honors American Studies

- Post id: 219 · tags: History

[Open to juniors through application. This course, US History, or US History AP is required after completion of the World History curriculum.]

The Honors American Studies course centers on the study of the history, culture, and society of The United States of America, from the early colonial periods to the present. The United States is a pluralistic society marked by continual transformation. Change in American history has been driven by geographic factors, global issues, demographic shifts, economic developments, political struggles, and cultural forces. American art, music, and literature reflect these changes. This course integrates the study of American history alongside an examination of American literature and other art forms contemporary to historical issues. Honors American Studies is intentionally designed to replicate the structure of a college-level history seminar, in which students are directly responsible for participation in daily discussions. Students enrolled in the course should expect to share responsibilities for promoting an ongoing dialogue rooted in scholarly texts, primary sources, and forms of artistic expression relevant to the American experience. Those wishing to apply for the course should strongly consider their recommendation from their sophomore year history teacher, and understand the expectations for class participation. A recommendation for AP US History or Honors American Studies is a reasonable predictor of success in the course. Students applying for Honors American Studies must complete a written response to a prompt during the registration process. Students will be admitted on the basis of a positive evaluation of their application, including their written response.

Honors American Studies is offered solely through the History Department, occupying a single class period and serving as a graduation credit in history. The course utilizes traditional primary and secondary source material in history, while also incorporating art, music, and literature into the curriculum, including two reading and writing assignments centered on works of literature.

### United States History (AP)

- Post id: 220 · tags: History

[Open to students per departmental guidelines and placement. This course, US History, or Honors American Studies is required after completion of the World History curriculum.]

AP United States History is designed to develop students’ analytical skills and factual understanding of American history. The course provides preparation for intermediate and advanced college courses. In order to understand and interpret historical change, students examine a wealth of primary documents, maps, statistics, and pictorial evidence of America’s past. Students learn to provide sophisticated written analysis of the central themes and relevant documents of United States history. Classroom activities include lecture/discussions, along with group work and debates. The following historical themes are emphasized in the course: the formation of an American identity; economic systems, labor, and technology; the peopling of the nation; power struggles and the evolution of American politics; the United States and the world; American geography and environment; and the development of American ideals, beliefs, and culture. All students enrolled in this course are required to take the Advanced Placement United States History Examination.

### European History (AP)

- Post id: 221 · tags: History

[Open to seniors per departmental guidelines and placement.]

The Advanced Placement course in European History traces the basic narrative of events and movements in European history from 1300 to 2000. This involves a study of the unfolding events, including an analytical understanding of the “change over time” principles involved. This course focuses on four broad themes: the political evolution of nations and diplomacy, the intellectual and cultural developments as they influenced and reflected the changing European society, economic forces that shaped the maturation and progression of European nations, and the changing social structure and traditions of the European community. In keeping with the college preparatory philosophy of AP courses, students are responsible for their own learning and are expected to work both cooperatively and independently. To this end, student-led discussions, supported by lecture, are an integral and regular element of this class. Additionally, this course includes an intensive reading and writing component with particular emphasis on primary source analysis and historical interpretation. All students enrolled in this course are required to take the Advanced Placement European History Examination.

### United States Government and Politics (AP)

- Post id: 222 · tags: History

[Open to juniors and seniors per departmental guidelines and placement, with priority given to seniors.]

This yearlong course is equivalent to a college introductory course in American government and politics. It is designed to give students a critical perspective on the United States political system. Students examine the historical background and fundamental principles of the United States Constitution. Other segments of the course include detailed studies of the three branches of government, political institutions and special interests, the role of political parties, public opinion, voter behavior, and civil rights issues. Students enrolled in the course are required to take the Advanced Placement United States Government and Politics Examination.

### Comparative Government and Politics (AP)

- Post id: 223 · tags: History

[Open to juniors and seniors per departmental guidelines and placement, with priority given to seniors.]

AP Comparative Government and Politics introduces students to the rich diversity of political life outside the United States. The yearlong course uses a comparative approach to examine the political structures, policies, and the political, economic, and social challenges among six selected countries: Great Britain, Mexico, Russia, Iran, China, and Nigeria. Additionally, students examine how different governments solve similar problems by comparing the effectiveness of approaches to many global issues. The AP Comparative Government and Politics Exam requires students to explain and apply key and supporting concepts. The exam measures students’ knowledge of the six core countries and their ability to compare and contrast political regimes; electoral systems; federal structures; civil rights; and state responses to economic, social, and religious challenges over time. Students enrolled in this course are required to take the Advanced Placement Comparative Government and Politics Examination.

### History Seminars (Semester)

- Post id: 4734 · tags: History

History Seminars promote a student-centered learning environment to foster the exchange of ideas, critical thinking, and the evaluation of primary sources. These seminars are open to seniors and juniors, and also to sophomores who are placed in and take the course at the honors level. All seminars have an honors option that requires substantial additional work on the culminating capstone assignment; selection of the honors option at registration requires departmental placement. Students who register for honors but fail to complete their work at the honors level will be moved to a standard designation for the course.

### History of Music Seminar

- Post id: 2288 · tags: History

[Semester seminar open to seniors and juniors, and also to sophomores who are placed in and take the course at the honors level, per departmental guidelines and placement.]

Art reflects the spirit of the age in which it was created, and perhaps no art form has had a more powerful effect on history than music. This class, taught jointly by faculty from the History and Music Departments, explores the various ways that music has influenced and even helped chart the course of history. Rather than a strictly chronological progression, this course is structured around several of the major means by which music has been an active influencer of historical events. Possible topics include:

- Music as a means of communication

- Music and its relationship to the state

- Music and its relationship to the divine

- Music as a driver of social and political change

- Music and its relationship to elite and popular culture

We will investigate and explore written and performed music from the traditional Western canon and from various world cultures; listening examples in a variety of styles/genres will be chosen anywhere from the medieval era up to present-day tunes. Students taking the course at the honors level will produce an 8-10 page capstone paper. This analytical research paper will be followed by an oral defense of their findings. Students who register for honors but fail to complete their work at the honors level will be moved to a standard designation for the course.

### Strangers in a Common Land: Global Immigration and Migration

- Post id: 2287 · tags: History

[Semester seminar open to seniors and juniors, and also to sophomores who are placed in and take the course at the honors level, per departmental guidelines and placement.]

This semester seminar links the human experiences of immigration and migration to current political and cultural systems, looking at many sides of the issue of immigration and migration. The course examines the historical context of immigration and migration, starting with the settling of the Americas, and the results of large numbers of people entering and leaving countries across the world. It focuses largely on defined and pursued opportunities, the role of ethnic, racial, and religious identity, and the effects of diversity on nation-states. Other topics include various refugee crises, political and social persecution, the effects of globalization, and success stories of certain individuals. In the end, the course challenges assumptions and myths we hold about the Other and perceptions we have about Self. Students will approach the material through various formats including discussion, readings, research projects, and guest speakers. Class activities will involve active application of methods, including researching popular culture information sources, literature, video, and film for indications of how migration defines/redefines cultural and social identities. Students taking the course at the honors level will produce an 8-10 page capstone paper. This analytical research paper will be followed by an oral defense of their findings. Students who register for honors but fail to complete their work at the honors level will be moved to a standard designation for the course.

### Humanities/Social Sciences

- Post id: 2284 · tags: Humanities/Social Sciences

These interdisciplinary courses at the honors and AP levels are available to juniors and seniors as indicated in each course description. The humanities and social sciences both involve the study of human society and social relationships, but the two are distinct in their focus. The humanities address through dialectic and reflection the fundamental question of what makes us human. The social sciences use a more scientific approach, applying similar methodology as the natural sciences to the study of human beings in society. All the courses offered in this area cross some of our typical departmental boundaries, often calling upon students to integrate their skills in reading and writing, critical thinking, mathematics, and science in order to engage the course material fully.

The following academic electives do not satisfy departmental graduation requirements.

### Economics (AP)

- Post id: 227 · tags: Humanities/Social Sciences

[Open to juniors and seniors.]

This is a yearlong course covering both microeconomics and macroeconomics. As such, students take both AP exams at the end of the school year. The year begins with a thorough study of the basic principles of economics that apply to individual producers and consumers, such as markets, supply and demand, and efficiency and equity in the economy. As the year goes on we widen our conversation to the economic system as a whole, looking at national income, distribution of income, and helping students understand various economic performance measures, banks and the financial sector, economic growth, government involvement, and international economies. Students are required to take both the microeconomics and macroeconomics Advanced Placement exams for course credit. This course entails a significant amount of graphing and interpreting graphs. Prerequisite: B- or above in Algebra II/Trigonometry as well as a B- or above for the year to date in English and History courses. Interested students who do not meet these criteria should schedule an appeal meeting with the Academic Dean.

### Philosophy: The Love of Wisdom (Honors)

- Post id: 2285 · tags: Humanities/Social Sciences

[Open to juniors and seniors.]

What is the meaning of life? Why do we exist as humans? Why do we believe in what we believe? These are questions that humans have contemplated since our species’ first thought. Philosophy is literally translated from Greek as Philos (Love) and Sophia (Wisdom), or Love of Wisdom. With a firm foundation in the Western canon from ancient Greece to the modern era, this yearlong honors Humanities course is a survey of human thought through time. Students will study traditions ranging from Stoicism and the Scholastics to indigenous animism and the Tao, and will learn about and engage with some of the major questions and issues of ethics, metaphysics, and political philosophy. The course is team-taught and consists of readings, class discussion and practical exercises in applied philosophy, culminating in a capstone project.

### Defining Moments: The Civil Rights Movement

- Post id: 4739 · tags: History

[Semester seminar open to seniors and juniors, and also to sophomores who are placed in and take the course at the honors level, per departmental guidelines and placement.]

This semester seminar is dedicated to an understanding of the modern Civil Rights Movement. The course lays the foundation with an understanding of the Civil War and Reconstruction, analyzing race-based slavery, the thirteenth, fourteenth, and fifteenth amendments, and their consequences for the late nineteenth and early twentieth centuries. Following that introductory material, the course focuses on the modern Civil Rights Movement of the 1950s and 1960s. Students study the landmark laws and Supreme Court decisions that helped shape, and continue to shape, the civil rights landscape in the United States. The course employs both lecture and class discussion to clarify and enhance student understanding of course readings from both required and supplemental texts. In addition, through class discussions, students connect course material to contemporary events as they relate to civil rights in the twenty-first century. Students taking the course at the honors level will produce an 8-10 page capstone paper. This analytical research paper will be followed by an oral defense of their findings. Students who register for honors but fail to complete their work at the honors level will be moved to a standard designation for the course.

### Psychology (AP)

- Post id: 228 · tags: Humanities/Social Sciences

[Open to juniors and seniors.]

This yearlong course is designed to introduce students to the systematic and scientific study of the behavior and mental processes of human beings and other animals. Students are exposed to the psychological facts, principles, and phenomena associated with each of the major subfields within psychology (How does memory work? Does intelligence or our personality change over time? What causes psychological disorders? How does the brain cause us to feel emotion or think morally?). Students also learn about the ethics and methods psychologists use in their science and practice. This course requires students to make connections and integrate material from different content areas as well as to analyze and evaluate psychological concepts and theoretical perspectives. It is the equivalent of an introductory college course in psychology; enrolled students are required to take the Advanced Placement Examination in Psychology to receive course credit.

### Mathematics

- Post id: 229 · tags: Mathematics

The goal of the Mathematics Department is to develop our students’ mathematical understanding so that they may succeed in college and later on in their professions. The curriculum is based on a broad understanding of principles and applications in traditional math fields. A wide range of courses and electives is offered to meet the individual needs of students. Four years of Upper School mathematics are required for graduation.

Course Sequencing

When more than one course is shown as a possibility, the student’s placement will be based upon placement guidelines and teacher recommendation.

*Honors-level semester courses are available that do not appear in the sequence chart. These courses may be taken concurrently with another math course, or two may be taken together in the same year to count as the student’s math class. Please see course descriptions.

Notes on Course Sequence in Mathematics:

- An exception to the sequence: students who take Geometry (H) in the eighth grade, and who continue the honors path, will be placed in AP Statistics in the tenth grade (between Algebra II/Trig (H) and Pre-Cal (H)).

- When staffing, enrollment, and other circumstances allow, four-week summer courses, for which there is a fee, are offered in Algebra IB for rising freshmen and in Geometry for rising sophomores.

- On occasion, students may take Algebra II/Trig and Geometry simultaneously, but only with teacher permission.

- Some other math courses may be taken concurrently in the sophomore through senior years. Any student considering taking two math courses concurrently should read the current placement guidelines and speak to the current math teacher and the Math Department chair.

- Students who do very well in Pre-Calculus may qualify for AP Calculus AB upon successful completion of summer work. Please see the course description for AP Calculus AB for additional information.

- Credit-bearing work undertaken at other institutions will not count toward graduation requirements or allow a student to accelerate through the Charlotte Latin School curriculum.

The prerequisite stated in the course description earns automatic placement in the course. Per Departmental Placement Guidelines, students who are close to automatic qualification may be considered for placement based on other factors. Parents are encouraged to discuss any issues or concerns regarding their child’s math placement with the current math teacher or with the chair of the Upper School Math Department early in the registration process.

### Algebra I

- Post id: 230 · tags: Mathematics

Algebra I is a review of pre-algebra skills and includes the study of various topics in algebra in the context of investigations and problem solving. The topics include linear equations and inequalities, solutions of systems of equations, graphing, data analysis, variation equations, and modeling real world problems.

### Algebra IB

- Post id: 231 · tags: Mathematics

Algebra IB includes the second half of the traditional Algebra I course with additional time for review topics and investigations. The topics include manipulating algebraic expressions; exponent rules; factoring; solving quadratic equations; graphing quadratic, exponential, and rational functions; problem solving; introductory probability, combinatorics, and statistics.

### Geometry

- Post id: 232 · tags: Mathematics

Geometry provides a thorough introduction to classical Euclidean geometry and emphasizes the deductive reasoning process. The course includes a study of lines, angles, triangles, circles, polygons, solid figures, and how they are related. It uses the concepts of coordinate geometry, proofs, congruence, similarity, area, volume, and transformations to analyze the different topics.

Placement prerequisite: A grade of at least C- in Algebra I or Algebra IB.

### Geometry (Honors)

- Post id: 233 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

Honors Geometry covers the topics of geometry in greater depth with more rigor, and includes additional topics from logic, symbolic logic, and transformational geometry.

### Algebra II/Trigonometry

- Post id: 234 · tags: Mathematics

Algebra II/Trig is a continuation and extension of the skills and concepts developed in Algebra I. It includes a study of real and complex numbers, linear equations and inequalities, factoring and its applications, systems of equations, functions, graphing, rational and irrational expressions, quadratic equations, exponential and logarithmic functions, conic sections, elementary probability, sequences and series, and applications of the above to problem solving. It also includes an introduction to trigonometry.

Placement prerequisite: A grade of at least C- in Geometry or Geometry (H).

### Algebra II/Trigonometry (Honors)

- Post id: 235 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

Algebra II/Trig Honors includes many of the same topics as Algebra II/Trig but at a deeper level and quicker pace and contains additional proof work and applications of the topics. Placement prerequisite: A grade of at least A in Geometry or a grade of at least B in Geometry (H).

### Advanced Functions and Trigonometry

- Post id: 236 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

This course is designed for students who have completed Algebra II/Trigonometry. The course provides further study of advanced algebraic concepts and topics including equations and inequalities, function analysis, trigonometry, graphs, exponents, and logarithms as well as an in- depth look at selected topics from probability, statistics, and data analysis. Students will also explore topics on financial literacy and real world situations. Placement prerequisite: A grade of at least C- in Algebra II/Trigonometry or Algebra II/Trigonometry (H).

### Pre-Calculus

- Post id: 237 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

This course is designed for students who have completed Advanced Functions and Trigonometry or Algebra II/Trig (Honors), or who meet placement guidelines to enter after completing Algebra II/Trig. It is an applications and calculator lab-based course. Topics include applications of trigonometry, advanced algebra, analytic geometry, exponential and logarithmic functions, vectors, matrices, linear transformations, systems of equations, and problem solving.

Placement prerequisite: A grade of at least A- in Algebra II/Trigonometry or a grade of at least C- in Algebra II/Trigonometry (H) or a grade of at least C- in Advanced Functions and Trigonometry.

### Pre-Calculus (Honors)

- Post id: 238 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

Pre-Calculus Honors, designed for students with very strong mathematical ability, is a thorough preparation for college level mathematics courses, including calculus. It focuses on trigonometry, advanced algebra, and analytic geometry. It includes a study of algebraic and circular functions, trigonometry and its applications, sequences, series, limits, exponents, logarithms, vectors, matrices, graphical transformations, systems of equations, and conic sections. It also includes the first two units of AP Calculus. Placement prerequisite: A grade of at least B+ in Algebra II/Trigonometry (H) or AP Statistics.

### Calculus

- Post id: 239 · tags: Mathematics

[Open to seniors.]

This course is sequential to the Pre-Calculus course. Course content includes review of the more challenging and essential topics from Pre-Calculus as well as an introductory study of calculus topics. Those topics include techniques and applications of differentiation and integration. Students in this course will not take the AP Calculus exam.

Placement prerequisite: A grade of at least C- in Pre-Calculus.

### Mathematics of Social Choice and Management Science (Honors)

- Post id: 240 · tags: Mathematics

[Honors semester course open to qualified students. Course availability depends upon enrollment and staffing considerations.]This course covers topics from the Voting and Graph Theory branches of mathematics. Students who have excelled in mathematics will enjoy the exposure to new branches of mathematics, while students who may not always have enjoyed topics in prior math courses will enjoy seeing mathematics applied in more concrete ways. Voting Theory is the study of voting methods and their mathematical fairness, the division of power in a business model, and the division of wealth and goods. These topics have applications in fields including business and finance, political science, and professional sports. Graph Theory is the study of structures that represent relationships between people or objects, including the mathematics behind developing efficient networks and scheduling multi-step projects. Students explore some classic problems of mathematics, such as the apportionment of the U.S. House of Representatives, the Bridges of Konigsberg Problem, the Four-Color Theorem, the Traveling Salesman Problem, and Prisoner’s Dilemma. The course may be taken as a semester elective, or it may be taken during the same year as Introduction to Probability and Statistics (H) to count as a full year of mathematics credit. Prerequisite/Corequisite: The course is open to honors-level students in Algebra II/Trig or higher, and to standard-level students in Pre-Calculus or higher.

### Introduction to Probability and Statistics (Honors)

- Post id: 241 · tags: Mathematics

[Honors fall semester course open to qualified students. Course availability depends upon enrollment and staffing considerations.]

This course covers introductory topics of probability and statistics. Topics from probability include probability modeling with various models (Binomial, Geometric, Normal, Poisson). Topics from statistics include collection of data, graphical and numerical analysis of data, and statistical inference. These topics may be useful to students considering a wide variety of fields, not just those in the areas of STEM. This course may be taken in a year prior to AP Statistics, but not in conjunction with or following AP Statistics. The course may be taken as a semester elective, or it may be taken during the same year as Mathematics of Social Choice and Management Science (H) to count as a full year of mathematics credit. Prerequisite/Corequisite: The course is open to honors-level students in Algebra II/Trig or higher, and to standard-level students in Pre-Calculus or higher.

### Data Analytics: How Do They Know? (Honors)

- Post id: 3716 · tags: Mathematics

[Honors spring semester course open to seniors, juniors, and sophomores who meet prerequisite requirements. Course availability depends upon enrollment and staffing considerations.]

This spring semester academic elective, designed for students who have completed at least one semester of a statistics course in Upper School (e.g. AP Statistics or Intro to Probability and Statistics Honors), is a cross-curricular collaboration of the Innovation & Design and Mathematics departments. Students become educated consumers of information as they use both statistics and computer science to explore the mathematical and programming aspects of data analytics. Data-driven decision-making through the ability to acquire, manage, and analyze large, quantitative data sets is a powerful tool in a growing number of fields. Whether students are prospective business majors or simply want to understand how companies use data to shape consumer purchasing decisions, this project-based course assesses skill development through traditional tests, a digital portfolio, and regular work outside of class time. The course is designed as an academic elective that supplements other coursework in mathematics or innovation/design; any student seeking to use the course to fulfill the final semester of the mathematics requirement must have the recommendation of the department chair and the permission of the Upper School Academic Dean, and there may be additional course requirements in such cases. Prerequisite: one completed semester of statistics in grades 9-12.

### Statistics (AP)

- Post id: 242 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

This course introduces students to the major concepts and tools for collecting, analyzing, and drawing conclusions from data. Students examine five broad conceptual themes: exploring data (observing patterns and departures from patterns); planning a study (deciding what and how to measure); anticipating patterns (producing models using probability and simulation); describing patterns; and statistical inference (confirming models and making predictions). Students must take the AP exam.

Placement prerequisite: a grade of at least B+ in Pre-Calculus or a grade of at least C- in Pre-Calculus (H). Rising sophomores who complete Algebra II/Trigonometry (H) in the ninth grade with a grade of at least B+ will take AP Statistics in tenth grade. Rising juniors who complete Algebra II/Trigonometry (H) with at least a B+ in grade 10 may take AP Statistics in grade 11 only if they take it concurrently with Pre-Calculus (H).

### Calculus (AP-AB)

- Post id: 243 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

AP Calculus (AB) is equivalent to most first year college calculus courses and prepares the student for the AP Calculus-AB exam, which is required for any student taking this course. Topics include functions, limits, differentiation of several classes of functions, integration methods, application, analytic geometry, fundamental theorems of calculus, and various special topics.

Placement prerequisite: A grade of at least C+ in Pre-Calculus (H) or a grade of at least A in Pre-Calculus in conjunction with a conversation with the Mathematics Department Chair and successful completion of a required on-campus summer course, for which there is a fee.

### Calculus (AP-BC)

- Post id: 244 · tags: Mathematics

[Open to students per departmental guidelines and placement.]

AP Calculus (BC) contains all of the topics of AB Calculus and also includes sequences, series, parametric equations, and vector analysis. The course prepares students for the required AP Calculus BC exam.

Placement prerequisite: A grade of at least A- in Pre-Calculus (H).

### Science

- Post id: 245 · tags: Science

Charlotte Latin School’s science program is designed to expose students to a range of scientific disciplines that will enable them to be responsible, informed citizens, and to allow them to pursue further studies in those areas of science in which they are most interested. In fulfilling the requirement of three years of science courses, students become active, confident questioners, problem-solvers, and experimenters. Three years of Upper School science are required for graduation; a fourth year of science is strongly encouraged. Options for the fourth year include yearlong AP and Honors courses as well as standard-level semester courses; most semester courses are also open to juniors who are enrolled in a Biology course.

All science courses include laboratory activities that are closely associated with classroom work. Classes meet five single periods each week, unless otherwise noted in the course description.

The Science Department is committed to placing students in the most challenging courses in which they can be successful. Readiness for success can vary for students from year to year in the Science Department, depending on the kinds of demands particular coursework may place on students.

Course Sequencing

Science semester courses may not be taken to fulfill the Physics, Chemistry, or Biology graduation requirements.

### Conceptual Physics

- Post id: 246 · tags: Science

[Open to freshmen and students who do not have a physics credit.]

This course covers the basic principles and theories of physics from a qualitative and quantitative perspective. Content is grouped into units and each unit follows a modeling cycle where students interactively develop and then use mathematical, graphical, and verbal representations of physical phenomena including: constant velocity motion, constant acceleration motion, balanced forces, unbalanced forces, projectile motion, electrostatics, and energy. Proper scientific methods, problem solving, critical thinking skills, clear communication, and graphical and data analysis are stressed through facilitated discussions, group work, use of shared student white boards, group presentations, laboratory challenges, and individual practice. No prerequisites.

### Advanced Conceptual Physics

- Post id: 247 · tags: Science

[Open to freshmen and new students, according to placement requirements.]

This course covers the fundamental principles and theories of physics from a qualitative and quantitative perspective at a more accelerated pace. Content is grouped into units and each unit follows a modeling cycle where students interactively develop and then use mathematical, graphical, and verbal representations of physical phenomena including: constant velocity motion, constant acceleration motion, balanced forces, unbalanced forces, projectile motion, electrostatics, energy, waves as well as other advanced topics. Proper scientific methods, problem solving, critical thinking skills, clear communication, and graphical and data analysis are stressed through facilitated discussions, group work, use of shared student white boards, group presentations, laboratory challenges, and individual practice. Advanced Conceptual Physics requires a stronger mathematical background, as noted in the prerequisites. Prerequisites: Rising CLS ninth grade students who are placed in Geometry (H) or higher are automatically qualified for placement in this course. Any other students wishing to enroll, including those new to CLS, must have completed Algebra I and must successfully complete the Science Department’s placement assessment.

### Chemistry

- Post id: 248 · tags: Science

[Open to sophomores.]

The Chemistry course is designed to be an interactive experiential treatment of basic chemical principles and concepts. As such, students are expected to take an active part in classroom and lab discussions and regularly contribute to the course. Over the course of the year, students build their knowledge of the fundamental models of matter through experimentation, discussion, and application. Students investigate the fundamental principles and concepts of chemistry: structure of matter; energy and kinetic molecular theory; properties of gases, liquids, solids and solutions; nomenclature; stoichiometry; atomic structure; elementary quantum theory; chemical bonding; molecular structure; and chemical equilibrium. Laboratory work emphasizes quantitative measurement and qualitative observation and develops both investigative techniques and the ability to interpret results. No prerequisites.

### Chemistry (Honors)

- Post id: 249 · tags: Science

[Open to sophomores per departmental guidelines and placement.]

Honors Chemistry is designed to be an interactive experiential treatment of basic chemical principles and concepts. Additionally, this course is intended to prepare highly-motivated students for their future course work in advanced level science classes. As such, emphasis is placed on higher level thinking skills, laboratory investigations, and student enrichment activities. Students are expected to take an active part in classroom and lab discussions. In comparison to the Chemistry student, the Honors Chemistry student is expected to demonstrate his or her learning through the application and evaluation of the fundamental principles of chemistry; therefore, Honors Chemistry students need to master basic facts independently and use them in class to synthesize major concepts. The Honors Chemistry course is fast-paced and rigorous, requiring more time outside the classroom for preparation, study, and the completion of assignments than the Chemistry course.

### Chemistry II (AP)

- Post id: 250 · tags: Science

[Open to seniors per departmental guidelines and placement.]

This course is designed to be the equivalent of the general chemistry course taken during the first year of college. Students in this course attain a depth of understanding of fundamentals in such areas as thermodynamics, equilibrium, kinetics, and electrochemistry. This course contributes to the development of the ability to think clearly and to express ideas, orally and in writing, with clarity and logic. Students develop competency in the normal laboratory skills of a college course, including use of instrumentation such as the pH meter and the spectrophotometer. Extended periods (an extra 10 to 20 minutes of class time) are included on days the schedule allows, approximately every other day. Students must take the Advanced Placement Chemistry Exam for course credit.

Prerequisite: Chemistry or Chemistry (H).

### Biology

- Post id: 251 · tags: Science

[Open to juniors.]

This course covers the full spectrum of life science, ranging from the molecular to the organismal level (biochemistry, cell biology, genetics, evolution, physiology, taxonomy, and ecology). The goal is to cultivate students’ awareness of how they fit into the natural world and how their lives can be enriched through an understanding of life science and scientific principles. In addition, an emphasis is placed on developing higher level thinking skills, abstract reasoning, and the synthesis and application of concepts to help prepare students for success in future college level science courses.

Prerequisite: Chemistry.

### Biology (Honors)

- Post id: 252 · tags: Science

[Open to juniors per departmental guidelines and placement.]

Honors Biology is designed to be an interactive experiential treatment of basic biological principles and concepts. Additionally, this course is intended to prepare highly-motivated students for their future course work in advanced level science classes. As such, emphasis is placed on higher level thinking skills, laboratory investigations, and student enrichment activities. Students are expected to take an active part in classroom and lab discussions. In comparison to the Biology student, the Honors Biology student is expected to demonstrate his or her learning through the application and evaluation of the fundamental principles of biology; therefore, Honors Biology students need to master basic facts independently and use them in class to synthesize major concepts. The Honors Biology course is fast-paced and rigorous, requiring more time outside the classroom for preparation, study, and the completion of assignments than the Biology course.

Prerequisite: Chemistry.

### Biology (AP)

- Post id: 253 · tags: Science

[Open to juniors per departmental guidelines and placement.]

This course has the same objectives as a general biology course at the college level. It covers three broad areas: (1) molecules and cells, (2) individual organisms, and (3) ecosystems. Extended periods (an extra 10 to 20 minutes of class time) are included on days the schedule allows, approximately every other day. Students must take the Advanced Placement Examination for course credit.

Prerequisite: Chemistry.

### Environmental Science (AP)

- Post id: 254 · tags: Science

[Open to juniors and seniors.]

AP Environmental Science examines interactions among human systems and those found in nature, helping us understand the consequences of our interactions with our planet and make better decisions about our actions. This yearlong lab science course is designed to be the equivalent of an introductory college course. It stresses scientific principles while also providing opportunities to explore relevant social, political, economic, and ethical issues concerning the environment. Prior completion of a biology course is

strongly encouraged, though not required. Juniors may register for AP Environmental Science only as their sole science credit for the year; seniors may register for it along with another non-AP science course if desired. All enrolled students must take the Advanced Placement Environmental Science exam for course credit. Prerequisite: Chemistry.

### Physics (Honors)

- Post id: 255 · tags: Science

[Open to seniors per departmental guidelines and placement.]

In this yearlong course, students will explore new topics in physics, not introduced in earlier courses, to further develop their scientific reasoning skills. Students will learn to make careful observations of physical phenomena, ask probing questions about their observations, design and conduct experiments to answer those questions, develop scientific models of the phenomena and use those models to make predictions. While mathematics is used frequently, this course puts an emphasis on having a deep conceptual understanding of the topics covered. Students must be proficient in algebra and geometry to be successful in this course. Topics in this course include: circuits, electrostatics, magnetism, waves, light, optics, fluids and modern physics.

### Physics C (Mechanics) (AP)

- Post id: 256 · tags: Science

[Open to seniors per departmental guidelines and placement.]

This yearlong course prepares students for the C level Advanced Placement Examination in Mechanics. Its aim is

to develop the student’s ability to interpret physical information, analyze phenomena and problems, use basic mathematical reasoning, and perform experiments. Major topics covered include motion in one and two dimensions; Newton’s Laws; work, power, and energy; systems of particles and linear momentum; circular motion; rotation; oscillations; and gravitation. Extended periods (an extra 10 to 20 minutes of class time) are included on days the schedule allows, approximately every other day. Students must take the Advanced Placement Physics C: Mechanics Examination for course credit. Corequisite: Calculus.

### Astronomy

- Post id: 4740 · tags: Science

[Semester course open to juniors and seniors. Course availability depends upon enrollment and staffing considerations.]

This semester course will provide an in-depth introduction to our current scientific view of the universe. Students will examine how knowledge about the mechanics of space has evolved throughout history, with an emphasis on the instruments, observations, and basic mathematical principles that underlie our astronomical models. The course will also use these models to answer big picture questions, such as: When will our sun run out of fuel? How do we measure the size of the universe? The universe is only 4% atoms, so what’s the rest? Topics include historical development of major cosmological theories, the life cycle of stars, and the structure and evolution of the universe. Special emphasis will be given to the development and structure of our solar system. Journey through time and space from the Big Bang to present, and beyond! Prerequisite: A course in Physics and in Chemistry.

### Physics C (Mechanics and E&M) (AP)

- Post id: 1304 · tags: Science

[Open to seniors per departmental guidelines and placement.]

This fast-paced yearlong course prepares students for the C level Advanced Placement Examinations in Mechanics as well as in Electricity and Magnetism. The course develops students’ skills in interpreting physical information, analyzing phenomena and problems, applying basic mathematical reasoning, and performing experiments. Major topics covered in the Mechanics curriculum include motion in one and two dimensions; Newton’s Laws; work, power, and energy; systems of particles and linear momentum; circular motion; rotation; oscillations; and gravitation. The Electricity and Magnetism curriculum will cover electrostatics and electric fields; conductors, capacitors, and dielectrics; electric circuits; and magnetic fields and electromagnetism. Extended periods (an extra 10 to 20 minutes of class time) are included on days the schedule allows, approximately every other day. Students must take the Advanced Placement Physics C: Mechanics and Physics C: Electricity and Magnetism Examinations for course credit.

Corequisite: AP Calculus BC.

### Genetics

- Post id: 259 · tags: Science

[Spring semester course open to juniors and seniors. Course availability depends upon enrollment and staffing considerations.]

This semester course provides an overview of molecular genetics, mechanisms of heredity, and gene expression. Students have the opportunity to explore in greater depth the molecular basis and cause of genetic diseases. In addition, students use the tools of bioinformatics to explore the wealth of genetic information made possible by the human genome project. Other areas of exploration include the use and ethics of DNA technology for such purposes as gene therapy and genetically-modified food. Laboratory activities include long-term genetics experiments and gel electrophoresis.

Prerequisite/ Corequisite: Biology

### Human Anatomy and Physiology

- Post id: 260 · tags: Science

[Fall semester course open to juniors and seniors. Course availability depends upon enrollment and staffing considerations.]

This semester course covers human anatomy and the physiology of the major organ systems, with particular focus on the cardiovascular, musculoskeletal, and integumentary systems. The central physiological theme running throughout the course is how all of these organ systems interact to maintain homeostasis in our body. Students investigate these organ systems through laboratory work, case studies, and clinical applications. Prerequisite/ Corequisite: Biology.

### Science of Medicine

- Post id: 1877 · tags: Science

[Semester course open to seniors. Course availability depends upon enrollment and staffing considerations.]

This semester course explores the basics of anatomy (what we’ve got), physiology (how things work), and pathology (what goes wrong). It provides students with the tools to understand the biology behind different diseases, and discusses the medical approach to treatment. It aims to give students the knowledge and language to ask relevant questions when dealing with their own health and when helping family and friends. The class will provide exposure to medical history/medical ethics and different careers in the medical realm. Prerequisite: Biology.

### Innovation & Design

- Post id: 261 · tags: Innovation & Design

Innovation and Design courses focus on principles of computational and design thinking within the fields of engineering and computer science, while focusing on developing students’ practical skills through project-based work. Students use problem-solving strategies to create innovative solutions that cross disciplines and span the gap between school and the world at large.

This department integrates engineering, computer science, and other creative and technological applications. The curriculum is based on the principle that students learn best when they are intrinsically motivated, passionate about the topic, and feel their work serves a greater purpose. The classes are inquiry-based, requiring the use of higher level thinking skills to complete team projects.

Students learn the importance of digital communication in documenting and sharing their work. They cooperate and collaborate in class as well as on a larger scale, working with partners in the Charlotte area and ultimately the global community. Engineering students will use the resources available in our computer labs and in our Fab Lab (Makerspace), including rapid prototyping equipment, microcontrollers, and the computer resources to bring it all together.

### Engineering I

- Post id: 262 · tags: Innovation & Design

[Semester elective open to all Upper School students, with priority for non-seniors.]

This semester course is a first course in engineering. Students build several projects using the engineering method. They use the rapid prototyping equipment in our Fab Lab and develop basic Computer-Aided Design skills. While basic skills are the primary emphasis, students have the opportunity to work on projects that they find of particular interest. No prerequisites.

### Engineering II

- Post id: 263 · tags: Innovation & Design

[Semester elective open to all Upper School students.]

Students continue to learn about the engineering method as the class focuses on electronics and microcontrollers, including some programming. They learn both the theory and skills to collectively solve uniquely challenging projects.

Prerequisite: Engineering I or similar coursework/experience and permission of the instructor.

### Introduction to Civil Engineering

- Post id: 3717 · tags: Innovation & Design

[Fall elective open to sophomores, juniors, and seniors.]

Students learn the fundamentals of civil engineering in an engaging and rigorous lab setting by designing, making, and testing a variety of structures. This will be an opportunity for students to work on larger projects and develop advanced Computer Numerical Control (CNC) skills. Students build on this knowledge through projects that are self-tailored to a topic of interest. Juniors and seniors who commit to and successfully complete substantial additional work throughout the semester will be considered for an honors designation for the course. Students may select this option near the beginning of the semester, but the transcript will not reflect the honors designation until the final course grade is submitted. Prerequisite/Corequisite: Engineering II or permission of the instructor

### Engineering in Motion: How to Make Things Move

- Post id: 4747 · tags: Innovation & Design

[Spring elective open to sophomores, juniors, and seniors.]

Students learn the fundamentals of making things move, exploring different forms of motion in engineering with a focus on mechanical, aeronautics and aerospace engineering. In an engaging and rigorous lab setting, students build a combination of machines, vehicles and airplanes. They then build on this knowledge through projects that are self-tailored to a topic of interest. Juniors and seniors who commit to and successfully complete substantial additional work throughout the semester will be considered for an honors designation for the course. Students may select this option near the beginning of the semester, but the transcript will not reflect the honors designation until the final course grade is submitted. Prerequisite/Corequisite: Engineering II or permission of the instructor.

### Advanced Topics in Engineering

- Post id: 266 · tags: Innovation & Design

[Open to seniors.]

This yearlong course, taught in an engaging and rigorous lab setting, introduces students to the software, methods, and hardware frequently used in college engineering programs. Students design and work on projects that are self-tailored to a topic of interest. Those who also commit to and successfully complete substantial additional work throughout the year will be considered for an Honors designation for the course. Students may select this option near the beginning of the year; the transcript will not reflect the Honors designation until the first semester grade is submitted, and that designation will be removed in the second semester if the student fails to successfully complete the Honors-level work.

Prerequisite/Corequisite: Engineering II.

### Entrepreneurship and Global Marketplace Leadership

- Post id: 267 · tags: Innovation & Design

[Fall elective open to seniors.]

This semester course provides a multi-disciplinary approach to creative problem solving. Students apply skills from a variety of areas such as art, drama, engineering, computer programming, economics and finance, as well as English, public speaking, and research to develop a business plan. Students are required to develop a capstone project, progressing from the initial stages of assessing a product’s potential viability all the way through to marketing their product or service to a potential investor. The project-based learning methodology combined with the opportunity to network with alumni and local business leaders makes this entrepreneurial experience engaging and applicable to students with a variety of career aspirations. The course grade is not included in the academic GPA.

### Digital Design and Web Development: Integrating Art, Programming, and User Experience

- Post id: 268 · tags: Innovation & Design

[Semester elective open to all Upper School students.]

In the Digital Design and Web Development course, students explore digital art creation using technology, gaining skills in graphics that effectively communicate and visualize data. They learn foundational Graphic Design and Programming principles, focusing on User Experience (UX) and User Interface (UI) Design. The course emphasizes hands-on website creation with HTML, CSS, and JavaScript. By the end of the semester, students acquire skills in digital art, basic programming, web development, and user-centered design that assist them in preparing for advanced studies and careers in digital technology.

### Cybersecurity 1: Networking Fundamentals (AP)

- Post id: 4742 · tags: Innovation & Design

[Open to juniors and seniors]

The AP Networking Fundamentals course introduces key concepts of networking including principles, hardware, software, and security. Students learn about network setups, protocols, and data transmission while configuring devices like switches, routers, and firewalls. Hands-on labs and real-world scenarios build skills in troubleshooting, optimizing performance, and implementing security. The course covers basic network design and prepares students for certifications like Cisco Certified Networking Associate and for careers in IT. Additional training from CLS networking staff provides real-world insights and helps students excel on the Cisco Certified Networking Administrator exam. Networking Fundamentals (AP) is a College Board pilot Career Kickstart course for 2025-2026, but will include a full AP exam in May; students will be required to complete the AP exam for course credit.

### Computer Science Principles (AP)

- Post id: 1305 · tags: Innovation & Design

[Open to sophomores, juniors, and seniors. Limited enrollment, with priority given to seniors, juniors, and sophomores in that order.]

This yearlong course offers a comprehensive introduction to the fundamental concepts of computer science. It delves into the impact of computing and technology on our world, emphasizing creative problem-solving, data analysis, internet functionalities, cybersecurity, and programming. The curriculum, designed for students with little to no prior experience in computer science, focuses on real-world applications and developing practical solutions. This academically rigorous course is ideal for those seeking an in-depth understanding of various computer science topics beyond programming. This course demands a workload comparable to other AP classes, preparing students for challenges and opportunities in the field of computer science. Students are required to complete the AP Computer Science Principles exam, which is offered digitally and includes both in-course performance tasks and a standard written exam, to receive course credit.

### Computer Science A (AP)

- Post id: 270 · tags: Innovation & Design

[Open to sophomores, juniors, and seniors.]

This yearlong course introduces students to computer science through programming in Java. The course focuses on object-oriented design. Students learn to design algorithms to solve problems, to use data structures to organize and process data sets, and to analyze and consider efficiency, ethics, and social implications in their programming. Completing the AP Computer Science A exam is required for course credit. Prerequisite: AP Computer Science Principles.

### App Design/Game Design

- Post id: 1307 · tags: Innovation & Design

[Semester course open to juniors and seniors, or younger students by placement.]

This project-based semester course will introduce students to designing apps and games with emphasis on graphics and interactivity. Students will be able to select their own projects and work within the language/IDE/environment of their choice. Juniors and seniors who commit to and successfully complete substantial additional work throughout the semester will be considered for an honors designation for the course. Students may select this option near the beginning of the semester, but the transcript will not reflect the honors designation until the final course grade is submitted.

Prerequisite: AP Computer Science Principles or AP Computer Science A.

### Java Data Structures (Honors)

- Post id: 1308 · tags: Innovation & Design

[Semester course open to juniors and seniors, or younger students by placement.]

This semester course will be equivalent to a college level data structures course using Java to explore linked lists, stacks, queues, trees, sets, and priority queues. Students will also learn about verification of algorithms and order of magnitude of algorithms.

Prerequisite: AP Computer Science A

### Introduction to Speech and Debate

- Post id: 272 · tags: Communications & Global Leadership

[Open to all Upper School students.]

Students who are in their first year of speech and debate competition may enroll in this yearlong elective course. The curriculum provides basic skills for each of the various speech and debate events including Policy; Lincoln-Douglas; Public Forum; and Congressional Debate as well as Extemporaneous Speaking; Original Oratory; Informative Speaking and Humorous, Dramatic, Duo, and Program Oral Interpretation. Students enhance their abilities in researching and arguing public policy issues, improve as persuasive speakers, and develop their writing and performance skills. In addition to completing in-class assignments in all events, students choose at least one event to make their focus for tournament competition. Enrollment in the course requires participation in two tournaments over the course of the year. Travel fees apply for tournament participation, although some fees can be waived in exchange for a parent volunteering to serve as a judge. No prerequisites.

### Advanced Debate

- Post id: 273 · tags: Communications & Global Leadership

[Open to sophomores, juniors, and seniors.]

This course may be taken yearlong or for one semester. The course provides intensive tournament preparation for students continuing their participation in Policy, Lincoln-Douglas, Public Forum, or Congressional Debate as members of the Speech and Debate Team. Enrolled students must attend six tournaments over the course of the year or three tournaments over the course of a semester. Students must also attend the NSDA National Qualifying tournament (and if qualified, NSDA Nationals) each spring. During the class period, students receive individual and group coaching in preparation for upcoming tournaments. Travel fees apply for tournament participation, although some fees can be waived in exchange for a parent volunteering to serve as a judge.

Prerequisite: Introduction to Speech and Debate, middle school coursework, or tournament experience with instructor permission.

### Advanced Speech

- Post id: 274 · tags: Communications & Global Leadership

[Open to sophomores, juniors, and seniors.]

This course may be taken yearlong or for one semester. The course provides intensive tournament preparation for students continuing their participation in Extemporaneous Speaking, Original Oratory, Informative Speaking or Dramatic, Humorous, Duo, and Program Oral Interpretation as members of the Speech and Debate Team. Enrolled students must attend six tournaments over the course of the year or three tournaments over the course of a semester. Students must also attend the NSDA National Qualifying tournament (and if qualified, NSDA Nationals) each spring. During the class period, students receive individual and group coaching in preparation for upcoming tournaments. Travel fees apply for tournament participation, although some fees can be waived in exchange for a parent volunteering to serve as a judge.

Prerequisite: Introduction to Speech and Debate, middle school coursework, or tournament experience with instructor permission.

### Communications and Twenty-First Century Journalism

- Post id: 276 · tags: Communications & Global Leadership

[Open to all Upper School students.]

Offered to all Upper School students, this non-academic yearlong elective class offers instruction and practice in many elements of twenty-first century journalism, including interview and reporting skills, writing, editing, proofreading, photography, storyboarding, graphic design, website design, personal portfolio creation, and video production and editing. Students focus their work on print and multimedia (The Hawk Eye online newspaper and one or more hard-copy editions per year), and all students have the opportunity to contribute to the publication of additional projects. In years three and four of a student’s enrollment in the course, the transcript will read Advanced Communications and Journalism in consideration of the greater leadership responsibilities associated with this level of experience. There are no prerequisites.

### Leadership and Social Responsibility

- Post id: 4389 · tags: Communications & Global Leadership

[Fall elective open to sophomores.]

This course examines leadership through the lens of social responsibility, with a focus on meeting the needs of local communities. Students will explore ethical frameworks and leadership strategies for enacting positive change in society. The course analyzes case studies of civic-minded leaders creating grassroots movements, nonprofits, and community-based organizations to address social issues. Students will evaluate approaches for leading communities through collaboration, consensus-building, and ethical decision-making models. The course provides opportunities for students to practice leadership skills through projects focused on developing solutions to real-world problems facing their own city and localities. Students will reflect on their personal leadership philosophy and commitment to public service values. The goal is to empower students with leadership abilities to drive social change through community organizing, advocacy, volunteerism, and ethical, socially-conscious leadership. The course grade is included in the academic grade point average. Enrollment is limited.

### Leadership for the Twenty-First Century

- Post id: 275 · tags: Communications & Global Leadership

[Spring elective open to seniors.]

This course explores the complexities and challenges of leadership. The course is interactive and features guest speakers, films, case studies and dilemmas, experiential leadership projects, and draws from textbook readings, articles, simulations, and student presentations. The study includes a profile of several prominent world leaders of the twentieth century, examining how they differed in style and philosophy, and the components of leadership they shared. The course is designed to be both practical and theoretical, with an emphasis on helping students identify and practice their own leadership potential and skills. The course grade is included in the academic grade point average. Enrollment is limited.

### Yearbook

- Post id: 277 · tags: Communications & Global Leadership

[Open to all Upper School students.]

In this yearlong non-academic course, students develop a variety of publication-related skills in the areas of graphic design, page layout/design, desktop publishing, photography and digital imaging, interviewing, and copy writing/editing. Students use these skills to produce the school annual, the Eyry. The course is offered to students in grades 9–12. In years three and four of a student’s enrollment in the course, the transcript will read Advanced Yearbook in consideration of the greater leadership responsibilities associated with this level of experience. There are no prerequisites.

### Student Internship Program

- Post id: 278 · tags: Communications & Global Leadership

[Semester or yearlong program open to seniors.]

The student internship program is designed to provide an on-campus opportunity for self-disciplined and motivated students to explore independently and engage in educational areas outside the scope of the standard curriculum. Each student-designed internship must combine the academic rigor required across multiple academic disciplines with a focused project that will have a positive impact on the Charlotte Latin School community, and must be supervised by a faculty member. The internship is intended to replace the sixth course in a student’s schedule, not to supplement a full schedule. Pass/fail credit for internships is awarded based on hours completed and evidence that proposed objectives have been met, but internships meet no graduation requirements. Each internship requires a detailed proposal, with an initial request form to be submitted for division head approval before the end of course registration and a mandatory outline/timeline within 30 days thereafter, with all details to be approved by May.

The Student Internship Request Form is available on the Course Registration Portal, and questions about the program should be directed to Abigail Cudabac, Upper School Academic Dean.

Student Internship Request Form

### Performing Arts: Drama

- Post id: 279 · tags: Performing Arts: Drama

In addition to the formal academic courses listed below, opportunities for involvement in drama and musical productions exist throughout the school year for all interested Upper School students.

### Acting

- Post id: 2290 · tags: Performing Arts: Drama

[Fall semester elective open to all Upper School students.]

Students in this semester course will rehearse a short play for performance at the North Carolina Theater High School Play Festival. During the course of rehearsals and performance students will develop skills in character analysis, vocal production and physical expressivity as well as creative imagination and ensemble collaboration. Open to both beginning and advanced students. The course may be repeated multiple times for credit.

### Film Acting

- Post id: 3719 · tags: Performing Arts: Drama

[Spring semester elective open to all Upper School students.]

Acting for the camera requires a different skill set than live theater. In this semester course, students will learn the basics of acting for the camera, from hitting your mark to accessing emotion easily and consistently. The focus of the course will be practical scene study, supported by exercises from the great film acting teachers and supplemented by classroom visits from industry professionals.

### Stagecraft I and II

- Post id: 2292 · tags: Performing Arts: Drama

[Semester elective open to all Upper School students.]

This semester course is an introductory, hands-on exploration of all elements of behind-the-scenes stagecraft. The course is divided into units that span all areas of work, including: stage directions, theaters, and staffing; scenic elements, tools, and construction; lighting design and special effects; sound design; and the creation of stage props. Following this course, students are prepared to hold a leadership position in any area of a student production and assist in any event in the theater. Students may enroll in Stagecraft I or II as schedule allows. The courses cover independent topics and are not required in sequence.

### Advanced Design

- Post id: 2294 · tags: Performing Arts: Drama

[One semester elective open to all Upper School students.]

In this advanced design course, students explore all elements of scenic, lighting and audio design for both the theater and entertainment industries. Students will practice drafting, computer aided design and rendering, and scenic model building. Projects will include light plots and design, and programming a lighting console. Students also explore music, sound effects, and scores and work with video design to enhance effects. Advanced Design may be taken concurrently with another theater course. Successful students will have participated in a production stage crew in middle or high school and/or demonstrate a willingness to do so.

### After-School Theater and Stagecraft

- Post id: 653 · tags: Performing Arts: Drama

[Open to all Upper School students.]

The Performing Arts Department offers an after-school drama and stagecraft course each semester. On the successful completion of 60 hours, a student will be able to earn one semester credit in theater. Students may accrue credits for one or more years of theater credit, and the course may be taken repeatedly over the period of several years. The course is team-taught by the members of the Charlotte Latin Performing Arts Department and is intended for the motivated, serious student who wishes to develop the breadth and scope of his or her body of work. The class schedule will be determined each semester based on student and teacher schedules. Course components may include audition videos, production notes, reflection pieces, conferences with the director, self-evaluations, and projects specific to the students’ interests. Due to the difficulties involved in making up for an absence, students must commit to attending each class session in its entirety. Taking this course does not entitle the student to an additional free period during the day; it is purely additive to an already full schedule. Class size is limited and permission of the instructor is required.

### Performing Arts: Music

- Post id: 285 · tags: Performing Arts: Music

The Music Program provides students the opportunity to pursue a range of performance and non-performance musical activities. Involvement in performing ensembles is a full-year commitment, and students are permitted to enroll in each course in subsequent years for credit. Participation in all designated performances on and off campus is required. Major trips for large ensembles may be planned as circumstances warrant; participation on such trips is typically required..

An extensive program of private study on musical instruments, piano, and voice is available at an additional charge to CLS students during and after school and in the evening. Experts in each area are brought to the school, and students can sign up for lessons at times mutually agreeable to student and teacher. These students are involved in recitals and other appropriate presentations throughout the year. No credit is granted for lessons.

### Band

- Post id: 286 · tags: Performing Arts: Music

[Open to all Upper School students.]

Band is a yearlong course open to all students with previous sequential study on a band instrument who are seriously interested in pursuing the study of material written for wind and percussion instruments. The students should be able to perform at their grade level of ability as assessed by the conductor. Students are given the opportunity to develop their technical ability and musical understanding through the study and performance of music literature in a wide range of styles. Original band works and transcriptions of major works are studied. Private lessons are strongly encouraged, but not required. The ensemble performs two major concerts and, in addition, presents at appropriate school and community concerts. As instrumentation allows, a percussion ensemble and/or jazz band composed of students in the class will be formed. Outstanding individuals are encouraged to audition for participation in a wide variety of community, regional, All-District, and All-State events.

### Concert Choir

- Post id: 287 · tags: Performing Arts: Music

[Open to all Upper School students.]

Concert Choir is a yearlong course open to students seriously interested in pursuing the study of choral music. Enrollment is limited with an eye to distribution of new singers over the four vocal parts, with priority given to students with previous vocal experience, especially those previously enrolled in chorus in grades 7/8 or new to Charlotte Latin. Students without such experience may apply for the course by requesting an audition. The class explores four-to eight-part literature in a variety of musical styles. Music theory is incorporated, with a concentration in sight-reading and ear training, as well as notation. The choir performs at a number of school and community functions including two annual concerts, often dividing into Men’s and Women’s Ensembles; a Chamber Choir is selected from Concert Choir members by audition. The entire ensemble participates in choral festivals and/or competitions. Students have the option to audition for NC Honors Chorus and for individual solo opportunities.

### Orchestra

- Post id: 288 · tags: Performing Arts: Music

[Open to all Upper School students.]

Participation in Orchestra is open to all students with previous sequential study on violin, viola, cello, or bass who are seriously interested in pursuing the study of material written for string instruments. The students should be able to perform at their grade level of ability as assessed by the conductor. Music of all periods is studied in this yearlong course. Students may at times combine with advanced wind players to perform full orchestra literature. Private lessons are strongly encouraged, but not required. Students perform in appropriate settings in the school, including two concerts each year, and are given the opportunity to play solos with the Ensemble when appropriate. Students also have the opportunity to play chamber music in quartets and trios. Outstanding individuals are encouraged to audition for participation in a wide variety of community, regional, and All-State Honors events.

### Music Theory I

- Post id: 289 · tags: Performing Arts: Music

[Open to sophomores, juniors, and seniors.]

This yearlong course is for anyone who would like to know more about music. Music reading ability is not required. Students will learn how to read, write, and understand how music works. Topics covered include: note reading; rhythmic values; sight singing; rhythmic, melodic, and harmonic dictation; key signatures, scales, and modes; meter; chords and inversions; four-part writing; non-chord tones; Roman numeral analysis; jazz and figured bass notation; cadences, phrase structure; and simple forms. The course grade is included in the academic GPA.

### Music Theory AP

- Post id: 654 · tags: Performing Arts: Music

[Open to sophomores, juniors, and seniors.]

This yearlong course prepares serious students of music for college theory. Music reading ability is assumed. The course explores the technique of written composition, counterpoint, ear training, form, advanced harmonic analysis, part-writing, sight-singing, and harmonic and melodic dictation. The course grade is included in the academic GPA and the Advanced Placement exam in Music Theory is required. The permission of the Department Chair, in consultation with the current ensemble director; a placement test; and minimum enrollment are required.

### Visual Arts

- Post id: 290 · tags: Visual Arts

The Visual Arts Program includes studio practice and art appreciation. Within the visual arts courses, conceptual, visual, and material investigations are developed into a broader perception. Visual literacy is intentionally grown to promote a personal sense of voice, with an evolving and expanding vision. Making connections through the visual world helps students make creative choices, enhancing the learning experience.

Students create works of art to promote understanding of the fundamental components of design using both the elements and principles of design. They learn to consider composition two dimensionally and in the round (3D), using a variety of materials. The primary focus of this program is an individualized studio art experience.

Art Studio I-IV are full-year courses.

### Art Studio I

- Post id: 291 · tags: Visual Arts

[Open to all Upper School students.]

This course teaches the basic principles and elements of art and how to use various media effectively. Instruction gives students experience in developing unique images through drawing, painting, mixed media, construction, design, printmaking, and sculpture. Each student works individually with the teacher.

No prerequisite.

### Art Studio II

- Post id: 292 · tags: Visual Arts

[Open to sophomores, juniors, and seniors.]

An advanced course, Art II covers all the same areas of instruction as Art I. Creative use of imagery and media is encouraged with more emphasis on refining skills. Prerequisite: Art Studio I.

Prerequisite: Art Studio I.

### Art Studio III

- Post id: 293 · tags: Visual Arts

[Open to juniors and seniors.]

This is an individualized art course that allows the student to begin specializing in areas of particular interest. Expectations are high, and students develop portfolios of their work.

Prerequisite: Art Studio II.

### Art Studio IV

- Post id: 294 · tags: Visual Arts

[Open to seniors.]

Art IV is a highly individualized art course in which self-motivation and independence are encouraged. Expectations for well-developed, finished artworks are very high. Uniqueness of image, student involvement in finding and developing subject matter, and work ethic are stressed. Presentation skills (matting and mounting) and portfolio development are also key elements of Art IV.

Prerequisite: Art Studio III.

### Photography

- Post id: 4395 · tags: Visual Arts

[Fall elective open to all Upper School students with priority given to seniors, juniors, and sophomores in that order.]

In this fall semester non-academic elective, students will be introduced to a wide variety of photographic genres including street photography, sports photography, landscape, and architectural photography through the study of masters in photography. Students will explore their own artistic voices through lens choice, camera angles, lighting, and function settings on the camera. The course is very hands-on through on-location photo shoots and exposes students to the basics of digital darkroom editing using Adobe Lightroom. Students will also gain skills in image editing as they complete a final course portfolio. The course is limited to 8 students so that all students will have equipment to use. No prerequisites.

### Physical Education

- Post id: 296 · tags: Physical Education

All Upper School students at Charlotte Latin are required to earn one year of Physical Education credit or its equivalent. This requirement may be achieved by taking Physical Education every day all year in ninth grade for a full credit, by taking it every day for a semester in ninth grade for a half credit, or by taking it every other day all year in ninth grade for a half credit. If students choose to take P.E. in ninth grade for a half credit, they can receive the remaining half credit by taking another P.E. class in grades 10–12 or they may have the remaining half credit waived by participating on or managing a CLS athletic team during any one season in Upper School, or by completing a dance role in an approved Upper School musical.

### Physical Education/Health

- Post id: 297 · tags: Physical Education

[Required for freshmen.]

The goal of the ninth grade Physical Education class is to promote lifelong health and fitness through exposure to fitness activities, lifetime sports, health education, and cooperative activities. Students rotate through a variety of units including Hawks Quest (experiential education), Courage To Speak (drug and alcohol education), Emotional Intelligence (emotions and relationships), recreational and team sports, fitness, and yoga. P.E. is a yearlong course that may be taken either every other day for a half credit, every day during one semester for a half credit, or every day for a full credit.

### Introduction to Sports Medicine

- Post id: 298 · tags: Physical Education

[Fall and spring elective open to seniors, juniors, and sophomores, with priority given in that order.]

This course, for which students earn one-half P.E. credit, is an introduction to sports medicine with an emphasis in the field of athletic training. This course allows individuals to learn in both the classroom and laboratory settings (athletic training room). Students become familiar with topics such as acute and chronic injuries and management, the skeletal system, sports nutrition, and more. The course grade is included in the academic GPA. Section size is limited.

### Online Course Offerings

- Post id: 299 · tags: Online Courses

Charlotte Latin School places its highest priority on the value of in-person education whenever possible, promoting the use of non-presence modalities (e.g., online courses) as enhancements to curricular offerings but not as replacements to the rigorous and comprehensive set of on-campus courses. When necessary, Charlotte Latin can leverage partnerships with online course providers to meet student needs. For example, the North Carolina Association of Independent Schools gives us access to MSAISnet and our status as a Malone Scholars School makes it possible for us to access an affiliated online network (MSON). Any approval for online coursework will be primarily in cases in which students are out of sequence by grade level due to a transfer, illness, or discontinuity in curriculum in moving from school to school; if credit recovery is a goal; or in rare cases in which a need cannot be met by on-campus coursework. All online courses through our partner organizations are rigorous, and while they offer some flexibility in terms of when students work, they also require that a student exercise self-discipline and manage time effectively. While these courses are facilitated using an online medium, there is a certified course instructor who creates assignments and evaluates student work. In addition, each student has an on-site mentor at Charlotte Latin School who serves as a liaison between the student and the online instructor. Students may take only one online course per year. There are typically additional charges for courses and additional materials (books, lab kits, software). Grades earned in online courses will be noted on the transcript, but they will not be accepted as substitutions for CLS graduation credits nor be counted in calculating a student’s GPA. If you have general questions, please contact Abigail Cudabac, Upper School Academic Dean (abigail.cudabac@charlottelatin.org). If you believe you have a need that can best be met through online coursework, work with your advisor, academic mentor, and/or college counselor to prepare a proposal for Mrs. Cudabac to review prior to the end of the registration period.

## Upper School — overview page (S4)

# Upper School

## A LAUNCHPAD FOR AMBITION,

A COMMUNITY THAT INSPIRES EXCELLENCE

Latin’s Upper School is where students puzzle, problem-solve, and find passions. Through ingenious Fab Lab prototypes, deep dives into classic novels, art portfolio development, community engagement, and ongoing championships, our students undergo a multifaceted, vibrant academic experience every single day, preparing them for a shared future full of purpose and impact.

#### Connection and Community

Phone-Free Campus

Structured Advisory Program

New Schedule - Common Lunch

Here at Charlotte Latin, we believe that education is a transformative journey that prepares students not only for college and careers, but for a life of purpose, integrity, and contribution. This belief is rooted in the conviction that academic excellence can and should coexist with a deep commitment to athletics, the arts, wellness and character development.

Tracey Vanneste

Head of Upper School

## Program Highlights

In Upper School, we emphasize the joy of challenge, a strong educational foundation for college, and preparation for adulthood. Take a look at some of our signature programs.

Academics and Advanced Courses

By engaging with college-level material in a supportive environment, students gain the confidence to take academic risks, the discipline to manage demanding workloads, and the insight to connect learning across disciplines. Whether a student is driven by data, drawn to abstract thought, or inspired by real-world impact, our advanced offerings help them go further — and think deeper.

Speech and Debate

Whether delivering arguments in a competitive setting or navigating complex global issues in a simulated diplomatic forum, our students learn to think on their feet, engage respectfully with diverse perspectives, and express themselves with purpose. These experiences, both in the classroom and in competition, empower students to find their voice — and use it meaningfully in the world.

Learn More

College Counseling

Urban or pastoral, in state or out of state, Division I or Division III — what matters most are the dreams students carry, and the colleges that will help them achieve these dreams. Our College Counselors help students determine which colleges best meet their interests, goals and aspirations.

Learn More

Innovation and Design

Latin’s fully equipped, state-of-the-art Fab Lab is where student agency and creativity come alive. Concepts of all kinds are explored across subject areas, including the arts, engineering, and environmental sustainability. Upper School students have all the space and resources to make mistakes, problem-solve, and develop ideas into prototypes that have real-world impact.

Learn More

Global Studies

Whether deepening their world language skills, expanding cultural awareness, or competing athletically abroad, all Upper School students cultivate international competencies through Latin’s Global Studies opportunities.

Learn More

Leadership Electives

We believe leadership starts with self-understanding. In our three leadership electives, students explore what it truly means to lead — examining their own values, decision-making styles, and the responsibilities that come with influence. Through discussion, reflection, and real-world application, students develop the tools to lead with adaptability in a rapidly changing world.

Learn More

###### PERSONALIZED GUIDANCE, PURPOSEFUL PLANNING

Urban or pastoral, in state or out of state, Division I or Division III — what matters most are the dreams students carry, and the colleges that will help them achieve these dreams. Our college counseling program is proactive and student-centered, helping each student identify schools that align with their goals and passions.

College Counseling

###### Commitment to Excellence

A traditional, college-preparatory curriculum is offered on a semester system. Six courses are required each year, of which four must be academic.

Course Offerings

###### The Arts

The arts at Latin invite every Upper School student to discover and develop their creative side. With dynamic courses in music, theater, visual arts, and more, students refine their craft, explore new forms of expression, and grow into confident, skilled artists. Here, the stage, the studio, and the gallery are for everyone — because every student has a voice and a story worth sharing and celebrating.

The Arts

###### Physical Education And Athletics

Upper School students build strength, sharpen skills, and discover activities they enjoy — from team sports to outdoor challenges and strength training. We focus on health education, lifelong fitness habits, and honorable teamwork, all while helping students gain the confidence and discipline to stay active for life.

Athletics

## Middle School — page text (S2)

# Middle School

## A time to reach, A place to belong

Charlotte Latin’s Middle School is where students in grades six, seven, and eight practice agency, explore new passions, and build important academic skills. They thrive in a challenging, nurturing environment where student-teacher interactions are grounded in mutual trust. The development of executive functioning, as well as social, emotional, and intellectual skills, is at the center of each class experience as students grow into curious learners and confident leaders.

Grades six, seven and eight are transformational. Students arrive eager to learn and enjoy a new sense of independence as they embrace new opportunities, take risks and ultimately, decide what they believe and who they want to be. There will be good days and challenging days, and we are here to guide them along the way. Louisa Polos

Head of Middle School

### Motivating and Caring

Middle School student-faculty relationships are key to children’s growth. Teachers recognize their students’ strengths and provide support and motivation where needed. Because of the expertise and talent of our teachers, students leave 8th grade feeling prepared and excited for Upper School.

## Program Highlights

Alongside challenging, project-based classes, time management and collaboration are emphasized throughout the Middle School curriculum. Learn more about our unique MS programs below.

STEAM

Our interwoven, multidisciplinary lessons and projects encourage Middle School students to make connections across subjects, blending critical thinking with creative making. They gain hands-on experience using cutting-edge tools in Latin’s Fab Lab, and find all the ways to collaborate and bring bright ideas to fruition, creating impact not later — but now.

ADVISORY

Through thoughtful lessons and open conversations, our Middle School advisory program helps students build self-awareness, strengthen relationships, and make confident, compassionate choices — all grounded in the trusted Collaborative for Academic, Social, and Emotional Learning (CASEL) framework.

Clubs

Fridays are for fun, exploration, and connection. Middle School clubs let students discover new interests, develop skills, and build friendships in a relaxed setting facilitated by teachers. Robotics to scrapbooking, ping-pong to painting — there’s a club for every student.

Class Trips

Middle School grade-level class trips are designed to foster meaningful connections among students and faculty while providing hands-on learning experiences beyond the classroom. Beginning in sixth grade, trips to Atlanta, Quebec and Washington, D.C., open students to new perspectives and prepare them to engage with the broader world.

Middle School

Mock Trial

In Middle School, mock trials teach Middle school students the fundamentals of jurisprudence as they develop communication, research, and critical thinking skills.

Lamm Hawks Quest

Latin Leaders practice creative problem solving and take initiative with the challenging, team-building, hands-on activities of Hawks Quest, Latin’s signature experiential education program for Middle School students.

Middle School

#### Middle School Curriculum

-
Overview

-
English

-
History

-
Math

-
Science

-
World Languages

-
Electives

## Overview

Our Middle School curriculum is designed to provide a rigorous, student-centered education that aligns with our mission of fostering intellectual curiosity, character development, and a lifelong love of learning. Across Grades 6-8, we cultivate an environment of high challenge and high support, ensuring that every student is encouraged to reach their full potential while receiving the guidance they need to succeed.

## English

Grade 6

English 6 students practice skills that help them develop as public speakers and confident readers and writers. From whole class novels to self-selected independent reading, students annotate and analyze a variety of visual and written texts. Additionally, by exploring fiction and nonfiction, students develop an understanding of writing not only as readers, but also as authors themselves. Through instruction in organization, grammar rules, and vocabulary expansion, students enhance production of effective expository, analytical, persuasive, and creative writing pieces. IXL, an online program supporting Language Arts, allows students to learn, practice, and apply skills in grammar, reading comprehension, and vocabulary as they strive for mastery. Thematic concepts span both English 6 and History 6.

Grade 7

English 7 is designed to inspire a love of reading and help students develop into lifelong learners. In order to expose students to as many different genres as possible, students will read and analyze set works in addition to self-selected texts for independent reading and book clubs. To expand and strengthen vocabulary, students will study select vocabulary words in their class texts. Additionally, the course exposes students to a variety of written formats where they will develop a purpose for writing and discover their own voice and style. Selected written formats include a point-of-view essay, original poetry, multi-genre writing, literary analysis, and small research presentations. Through the writing process and the use of IXL, students apply their knowledge of grammar skills and usage.

Grade 8

In English 8, students develop as mature readers and confident writers. Through whole class classics, such as Animal Farm and Romeo and Juliet, self-selected independent reading, books clubs, short stories, essays, and poems, students will read and analyze multiple genres. Whole-class discussions, Socratic seminars, and small group activities help students continue to grow as thoughtful communicators. To expand and strengthen vocabulary, students will study select vocabulary words in their class texts. Additionally, students complete a variety of creative writing tasks as well as analytical and persuasive writing assignments. Students continue their grammar study through direct instruction and the use of the online program IXL.

## History

Grade 6

Ancient World History & Culture: Patterns of Continuity and Change

History 6 examines ancient civilizations found in the Middle East, Africa, China, India, and Europe, and makes connections to current events. In this course, students will examine the emergence and development of civilizations as well as the factors that drive both continuity and change.

Students will read and analyze a variety of nonfiction texts. Additionally, students will learn a variety of writing processes to develop their ideas to write research presentations, analytical essays, persuasive writing, and other genres. Targeted grammatical concepts are taught in English 6 and are reinforced through writing in History 6. Thematic concepts span both English 6 and History 6.

Grade 7

Foundations of American History: “A More Perfect Union”

Starting with English migrations and the transatlantic slave trade (1600s), and concluding with Reconstruction (1870), students will examine the experiences and efforts of individuals and groups who worked to create a “more perfect union.” Through the lens of a historian, students will consider different points of view while developing and reflecting on their own. Consistently relying on primary source material, students will determine the relationship between the people, events, and narratives that have shaped American culture and society. And in doing so, they will critically examine what the promise of these founding ideals meant to the people of any given historical era and will evaluate the extent to which the country has lived up to these ideals.

Grade 8

The Pursuit of American Ideals: At Home and Abroad

Beginning with the post-Civil War era (1870) and continuing through the modern day, students will examine eras in American history through the lens of five core ideals: equality, rights, liberty, opportunity, and democracy. Utilizing primary sources, students will engage in the study of history through a comprehensive and interactive approach as they examine the significant events, crucial documents, transformative movements, and dynamic individuals that have shaped modern America. By making connections between the past and present, students will develop a deeper understanding of how historical events continue to influence contemporary society. Through discussion, inquiry-based learning, and critical analysis, they will cultivate the skills necessary to become informed, engaged citizens prepared to navigate and contribute to an ever-evolving world.

## Math

Math 6

This course enhances students’ core math skills while strengthening their ability to think critically and solve problems with confidence. Through exploration, discussion, and practice, students will build a deep understanding of number sense, number theory, algebraic reasoning, and problem-solving strategies. Key topics include operations with fractions and decimals, relationships between fractions, decimals, and percentages, and introductory pre-algebra concepts like integers, coordinates, and equations. A structured approach ensures clear, logical problem-solving, with lessons building progressively. Students will apply their knowledge to real-world scenarios through multi-step word problems, verbal models, and fundamental statistical and geometric concepts, preparing them for future math success.

Pre-Algebra

This course builds a strong foundation for success in algebra by deepening students' understanding of key mathematical concepts, strengthening problem-solving skills, and building confidence. Through exploration, discussion, and hands-on activities, students will learn to justify their reasoning using multiple methods and clearly communicate their mathematical thinking. Students will study fundamental pre-algebra topics, including integers and exponents, variables and expressions, equations and inequalities, and graphing. They will also explore prime factorization, rational numbers, ratios, unit rates, proportions, percents, and fractions, making meaningful connections to real-world applications.

Advanced Pre-Algebra

This course serves as a bridge between concrete and abstract mathematical thinking, guiding students toward deeper problem-solving and analytical skills. Through real-world applications, students will refine their computational fluency with fractions, decimals, and percentages while strengthening their ability to reason logically and make informed decisions. Key topics include integers, equations and inequalities, number theory, ratio and proportion, geometry concepts, and coordinate graphing. Students will be introduced to algebraic and geometric principles that lay the foundation for future coursework. Emphasis will be placed on developing critical thinking through both routine and non-routine problem-solving experiences. Additionally, students will enhance their communication skills by expanding their mathematical vocabulary, improving comprehension, and engaging in discussions.

Algebra IA

Algebra IA is the first year of a two-year sequence designed to provide students with a strong foundation in Algebra I while ensuring mastery of prerequisite skills necessary for success. This course places a strong emphasis on problem-solving, mathematical reasoning, and effective communication of algebraic thinking. Students will explore the properties of real numbers, solve and graph linear equations and inequalities, and apply algebraic principles to real-world problem-solving scenarios. Key topics include graphing and writing linear equations, solving systems of linear equations and inequalities, and analyzing data and probability. Through a structured approach that reinforces fundamental concepts, this course aims to build students' confidence and proficiency in algebra, preparing them for the second year of the sequence and future mathematical success.

Algebra I

This is a full-year Algebra 1 course designed to develop both foundational skills and deep conceptual understanding. Throughout the year, students will engage in problem-solving and application-based learning, focusing on building algebraic skills. Emphasis will be placed on interpreting and analyzing data using linear models, as well as modeling and solving problems with linear functions, inequalities, and systems of equations. Students will also explore quadratic functions through graphing, factoring, and evaluation, and use exponential functions and algebraic expressions to model real-world situations. Strong communication skills will be built through vocabulary development and mathematical discussions. By engaging in the learning process, students will build a solid foundation for future mathematical success.

Advanced Algebra

This course is designed for students seeking an advanced and challenging mathematical experience. Advanced Algebra emphasizes both skill development and deep conceptual understanding, requiring students to think critically and apply abstract reasoning to complex problems. Problem-solving and word problems will be a central focus, with students expected to analyze data, interpret linear models, and use algebraic expressions to represent real-world situations. Key topics include linear functions and inequalities, systems of equations, quadratic functions, and exponential models. Students will engage in meaningful discussions, strengthen mathematical communication skills through vocabulary study, and collaborate with peers to explore multiple problem-solving strategies. Success in this course requires perseverance, curiosity, and a strong commitment to learning, preparing students for higher-level mathematics.

## Science

Grade 6

Sixth-grade science explores how the world is organized. This year-long course is divided into two main modules: The Living World and The Non-Living World. Students will investigate a variety of topics, including weather patterns, properties of matter, biological classification, and the diversity of organisms, fostering a deeper understanding of the natural world. The course incorporates labs, readings, and numerous hands-on experiments to enhance learning and bring scientific concepts to life.

Grade 7

Seventh grade science takes an integrated approach, focusing on lab skills, introductory chemistry, and human biology. In this course, students will immerse themselves in live labs and activities on a daily basis. Students will also use current events in the scientific community on a weekly basis to connect our learning to today’s world. The course is infused with student choice whenever possible and is focused on synthesis of information and supporting scientific arguments. Assessments include labs, quizzes, unit assessments, projects, and debates.

Grade 8

Eighth grade science uses the geologic timeline to explore space, geology, natural selection and evolution, and environmental science. We will use current events in the scientific community on a weekly basis to connect our learning to today. The course is infused with student choice whenever possible and is focused on synthesis of information and supporting scientific arguments. Assessments range from traditional quizzes and tests to labs, projects, and debates.

## World Languages

Latin 7

Are you ready to travel back in time? This course will introduce students to a "dead" language and provide a glimpse into the history, mythology, and daily life of the people who spoke it. In the process, students will discover much about their own language and the many ways our modern world has been influenced and shaped by the ancient Greeks and Romans. This course, which is not a prerequisite for Latin I, meets every other day for the year. Topics include pronunciation in Latin; greetings and conversation; etymology; Roman numerals; simple vocabulary such as numbers, colors and animals; grammar such as subjects, direct objects and prepositions; short Latin narratives and skits; and Roman culture such as daily life, history, and myths.

Latin I

This course introduces students to elementary Latin vocabulary and grammar and begins to build their ability to read simple Latin stories. Because Latin is the origin of over 60% of English words, students will gain valuable insight into their own language, and through integrated readings and presentations, will discover how Greco-Roman art, history, culture, and mythology have influenced the modern world. Membership in the Junior Classical League offers optional opportunities for students to engage in academic, creative, and visual arts activities and competitions at the state and national level. This course assumes no prior knowledge of Latin.

French 6

French 6 seeks to awaken in students a curiosity about the language and cultures of the French-speaking world. In this course that meets every other day, students become familiar with the language and build novice-level proficiency in the interpretive, interpersonal, and presentational modes of communication. Assessment tasks target the Novice Mid level of proficiency as students learn to listen, read, speak and write about personal identity, family and friends, school, music of the French-speaking world, food, and local community. Students also discover examples of the products, practices and perspectives of the French-speaking world as they relate to these themes.

French 7

In this course that meets every other day, students reinforce and expand upon skills learned in French 6, and build proficiency in the interpretive, interpersonal, and presentational modes of communication. Assessment tasks target the Novice Mid level of proficiency as students learn to listen, read, speak and write about personal interests, daily routine, local community, music of the French-speaking world, clothing, food, and travel. Students also discover examples of the products, practices and perspectives of the French-speaking world as they relate to these themes.

French I (MS)

French I is designed to provide the student with the language structures essential for effective communication in the three modes — interpretive, interpersonal and presentational — while performing tasks targeting the Novice High level of proficiency. These elements are integrated with multiple opportunities for exposure to the products, practices and perspectives of the cultures of the French-speaking world. Themes include personal identity, home and family, daily routine, music of the French-speaking world, local community, and ordering in restaurants.

Spanish 6

In a course that meets every other day, Spanish 6 expands upon skills acquired in Lower School classes while exploring new vocabulary, verb usage, and basic sentence structure in contextualized lessons and activities. Students improve their ability to communicate in the three modes of communication — interpretive, interpersonal, and presentational — while performing tasks targeting the Novice Mid level of proficiency. Students also investigate the products, practices and perspectives of the Spanish-speaking world. Themes include personal identity, life at school, friends and family, and the home.

Spanish 7

In a course that meets every other day, Spanish 7 expands upon skills acquired in Lower School classes while exploring new vocabulary, verb usage, and basic sentence structure in contextualized lessons and activities. Students improve their ability to communicate in the three modes of communication — interpretive, interpersonal, and presentational — while performing tasks targeting the Novice Mid level of proficiency. Students also investigate the products, practices, and perspectives of the Spanish-speaking world. Themes include pastimes, responsibilities in the home, activities around town, personal clothing style, and travel.

Spanish I (MS)

Spanish I (MS) is designed to provide the student with a solid foundation in real-world vocabulary themes and context, as well as the language structures essential for effective communication. Students improve their abilities to communicate in the three modes of communication — interpretive, interpersonal, and presentational — while performing tasks targeting the Novice High level of proficiency. Students also investigate the products, practices, and perspectives of the Spanish-speaking world. Themes include personal identity, personal choices, daily routine, visiting the doctor, cooking, and careers.

## Electives

Grade 6

- Art

- Band

- Concert Choir

- Engineering

- Strings

Grade 7

- Art

- Band

- Computer Programming

- Concert Choir

- Drama

- Engineering

- Leadership Lab

- Speech and Debate

- Strings

Grade 8

- Art

- Band

- Computer Programming

- Concert Choir

- Drama

- Engineering

- Leadership Lab

- Speech and Debate

- Strings

The Arts

Athletics

MS Physical Education and Health

### Middle School posts (element 39840)

#### The Arts (post 4971)

The Arts

Middle School students take their creativity to the next level through visual and performing arts classes and opportunities that emphasize collaboration, discipline, and celebration. Whether singing the solo or displaying a collage in the gallery of Horne Performing Arts Center, each young artist cultivates a lifelong appreciation for artistic expression.

LEARN MORE

#### Athletics (post 4970)

Athletics

Our school code is “Honor above all.” We believe that athletics provides the opportunity for many “teachable moments” of life’s lessons, especially those involving honor. In athletics, honoring yourself, your team, your opponent, and the game you play are all qualities we encourage in our students every day. One of the primary components of Middle School Athletics is to provide the students with healthy social interactions in a positive peer group. Winning and losing are not goals of our program. However, winning and losing are components of any competitive endeavor and cannot be ignored. We hope that winning is a byproduct of hard work, skill development, and appropriate competition. We want our students to learn to win with class as well as lose with dignity.

#### MS Physical Education and Health (post 4969)

MS Physical Education and Health

WEEKLY SCHEDULE

In Middle School Physical Education classes, students are divided into six base groups of approximately 20–25 students, and they rotate through a variety of activities for a two-week period. Activities may include soccer, football, field hockey, badminton, basketball, speedball, tumbling, volleyball, pickleball, baseball, softball, lacrosse, swimming (for sixth and seventh graders), tennis, and fitness. These PE classes consist of skill work, drills, explanations of rules and strategies, and competition.

INTRAMURALS

On Intramural Days, students have an opportunity to play nontraditional games in Advisory Groups. Examples of games are “Towel Volleyball,” “Bolf,” “Turtles,” and other original games created by Intramural Directors.

ELECTIVES

Elective days may be our students’ favorite days in PE because they get to choose from a variety of activities offered by the PE teachers. Opportunities change weekly, with popular activities such as Indoor Soccer, Bamball, and Four Square being repeated often.

HAWKS QUEST

Hawks Quest is Latin’s experiential education program and curriculum. As part of sixth grade PE, students move through a series of guided challenges and work with their peer groups to overcome both real and perceived risks, followed by a reflection on their common experience. In eighth grade, students experience the first high challenge element in Middle School, where they are clipped in and climbing with a partner. Students will be asked to consider leadership through the lens of challenge. How do they assist their peers and how do they ask for assistance?

EMOTIONAL INTELLIGENCE & HEALTH

Each grade will have one unit of Emotional Intelligence classes. These classes help students develop skills necessary to manage emotions effectively, navigate difficult situations, make healthy decisions, and cope with stress. High EI has been shown to be a strong predictor of success in school and in the workplace. Other Health topics may be addressed by our Nurses or Counselors.

## Lower School — page text (S3)

# Lower School

## Building Skills, Confidence, and a Love of Learning

#### Where Young Learners Discover, Grow, and Thrive

At Charlotte Latin, Lower School students build the skills to become joyful, capable learners. Throughout the day, students learn through a balance of movement, play, exploration, and purposeful instruction. Talented, caring teachers guide each child as they build strong academic foundations, developing literacy and mathematical skills while growing into confident, enthusiastic learners. Our youngest learners develop the intellectual and social-emotional skills to approach each lesson and collaboration with true excitement for discovery, and in time, live empathetic, purposeful lives.

Every content area is thoughtfully aligned to ignite curiosity, deepen understanding, and nurture well-rounded growth. Our foundational structured literacy, writing, and math programs are supported by both whole-group and differentiated learning.

As our young scientists explore inquiry-based investigations and our historians discover the story of our country and world from varied perspectives, they don't just build knowledge, they build confidence, flexible thinking, and a lifelong love of learning. Across all classrooms, our instructional approach provides the ideal balance between foundational skills and joyful discovery.

Learner’s Journey Statement

Math Statement

Structured Literacy Statement

TK Statement

3-5 Novel Statement

<
>

It is an honor to join this extraordinary community and partner with you during one of the most magical and formative seasons of your child's life. The lower school years are the foundation for a lifetime of learning, where curiosity is nurtured, passions are ignited, skills are honed, and children grow into thoughtful observers, critical thinkers, confident learners, compassionate collaborators, and future leaders.

Our passion for these developmental years shapes everything we do. Together with families, we foster a joyful community where every child is known, challenged, and encouraged to take risks, embrace discovery, and develop the confidence, character, and skills to flourish—not only in school, but in the world they will one day help shape.

Casey Martin

Head of Lower School

#### Grade Level Highlights

-
TK

-
KG

-
Grade 1

-
Grade 2

-
Grade 3

-
Grade 4

-
Grade 5

-
Special Area Classes

-
Extended Day/Enrichment

## TK

On Campus Learning Experience:

- Holiday Performance

- Grandparent’s Day

Field Trips:

- Discovery Place

- Anne Springs Close Greenway

- Strawberry Picking

- Children’s Theater

- Main Street Children’s Museum

## KG

On Campus Learning Experience:

- Fairytale Exploration

- 100th Day Celebrations

- Holidays Around The World

- Grandparent’s Day

Field Trips:

- Farmer’s Market Field Trip

- A Day at The Farm

- Children’s Theater at Imaginon

Community Partnership:

- Baby Bundles

## Grade 1

On Campus Learning Experience:

100th Day Celebrations

1 week swim unit

Wall Card Day

Grandparent’s Day

Field Trips:

- Around Our Town Field Trips

- Children’s Theater at Imaginon

Community Partnership:

- Special Olympics

## Grade 2

On Campus Learning Experience:

- Idiom Parade

- Dinosaur Discovery

- 1 week swim unit

- Grandparent’s Day

Field Trips:

- Schiele Museum

- Nutcracker Ballet and Tea Party

- Children’s Theater at Imaginon

Community Partnership:

- Club Sandwich and Blessings in a Backpack

## Grade 3

On Campus Learning Experience:

- Culture Museum

- Immigration Interviews

- Market Day

- Poetry Celebration

- 1 week swim unit

- Grandparent’s Day

Field Trips:

- The Pearl Innovation and Problem-Solving Lab to explore product development in preparation of Market Day

- Children’s Theater at Imaginon

- Knights Baseball Game

Community Partnership:

- Special Olympics

## Grade 4

On Campus Learning Experience:

- Quarterly Book Tastings

- State Fair

- LS Musical

Field Trips:

- Old Salem

- Children’s Theater at Imaginon

Community Partnership:

- Baby Bundles

## Grade 5

On Campus Learning Experience:

- Wild Robot Day

- Volleyball Tournament

- Musical Instrument selection

- Pi Day

- You Choose EdTalks

- Leads with Honor Sustainability Initiative and Garden

- LS Musical

Field Trips:

- The Charlotte Museum of History: American Revolution Exhibition

Community Partnership:

- The Bulb mobile farmer’s market

## Special Area Classes

###### physical education

Each Lower School physical education class promotes lifelong wellness through exposure to team and individual sports, health education, and collaborative challenges. It’s not only about getting stronger — it’s about honing skills, bonding with teammates, and enjoying movement.

###### The Arts

Every student participates in music and art courses beginning in TK. Our youngest learners explore painting, singing, rhythm, and papier mâché. They are introduced to the elements of color, harmony, shape, music composition, and principles of design, all rooted in history, culture, and cutting-edge technology. Our Grade 5 students are able to choose and instrument and participate in Band or Strings. They also participate in Choir.

###### spAnish

All students in TK through fifth grade participate in the Lower School Spanish program. In our program, students build their interpretive, interpersonal, and presentational communication skills. Through the use of comprehensible stories, songs, games, movement, and other meaningful activities, teachers enhance understanding, provide cultural insight, and engage students in active communication. The use of authentic resources also fosters a better understanding of cultural products, practices, and perspectives of the Spanish-speaking world. At the novice level, students are expected to be able to recognize, identify, copy, and speak in simple words and memorized phrases, and much focus is placed on the importance of putting forth their best effort versus seeking grammatical perfection.

###### STEAM

Our TK–2 STEAM program gives young learners the chance to explore Science, Technology, Engineering, Art, and Math through hands-on, creative projects. Students practice curiosity and problem-solving while following the Engineering Design Process—ask, imagine, plan, create, and improve. In this program, children learn to think like scientists, engineers, and artists as they work together to explore ideas, test solutions, and share their discoveries in fun and engaging ways.

###### Library

Our Lower School Library program brings stories to life with interactive read-alouds, a calendar full of themed events, thoughtful instruction, creative projects, and vibrant displays that spark a lifelong love of reading. The Library is more than books - it’s a hub for imagination, discovery, and joyful learning!

Beyond our 16,000-volume print collection, students have access to age-appropriate digital resources that allow them to explore their curiosity. We highlight voices from around the world, connect stories to classroom learning, engage in early research, and create opportunities for students to share their own ideas. Students discover that the library isn’t just about books - it is about building a lifelong love of learning!

## Extended Day/Enrichment

###### extended day and enrichment programs

Hawks’ Club gives us the space to transition from school to home each day. With plenty of activity and enrichment class options, we learn new skills, compete in sports, make friends, study, and play.

### Lower School posts (element 43779)

#### Learner’s Journey Statement (post 5097)

Learner’s Journey Statement

At Charlotte Latin, we acknowledge that learning and growth do not typically happen in a straight line. Instead, a child’s educational journey often looks more like a winding path—filled with unique twists, personal breakthroughs, and different ways of processing the world around them. By broadening our teaching methods, we are creating more pathways and better access points for all kinds of thinkers.

We communicate children’s progress using a competency-based report card. Our report card reflects the learning and growth of our students’ academic year - it shows what a child can do. It is our goal, as educators, for our students to be able to independently and consistently demonstrate grade-level-specific competencies and foundational skills through work that incorporates play, wonder, critical thinking, collaboration, clear communication, and voice.

At Charlotte Latin, we know that play isn’t just fun, it’s how young minds do their best work! Play is a vital part of every child's learning journey, giving them a hands-on way to explore big ideas, ask questions, and solve real problems. Through structured and creative play, children practice social skills such as sharing and empathy, develop crucial self-regulation skills, and build the physical motor skills they need for everyday tasks. By honoring play as a powerful learning tool, we make sure school is a place where academic curiosity and childhood joy go hand in hand. Many times we refer to play as inquiry. We believe learning starts with a question. We use thinking routines like “What do you notice? What do you wonder? What if…?” Students learn best when they build their own understandings through play, mistake-making, wonder and exploration.

We develop students’ sense of belonging by using a Responsive Classroom approach, which includes practical strategies for teachers to use to build caring classroom and school communities. Some strategies include a daily morning meeting, interactive modeling, problem-solving conversation, classroom consensus building, and agreements. A responsive classroom enables students to take risks, learn from mistakes, and embrace a goal-setting growth mindset.

#### Math Statement (post 5099)

Math Statement

Our math instruction builds mathematical understanding through a concrete-pictorial-abstract approach to learning. This means students begin by representing numbers and their thinking with concrete, tactile objects referred to as manipulatives like counting bears, tangrams, and unifix cubes. Students move from depending on the concrete to being able to illustrate their thinking with simple math drawings and later with equations. Students are encouraged to explore multiple pathways for solving a math problem and explain their thinking. This method of learning creates problem-solvers who make connections to the world around them.

#### Structured Literacy Statement (post 5098)

Structured Literacy Statement

At Charlotte Latin, we follow a structured literacy approach that is highly systematic, explicit, and evidence-based. In this approach, the teacher directly explains to students, based on their developmental age and stage, the six essential components of language: phonology, sound-symbol association, syllable instruction, morphology, syntax, and semantics. Research shows that structured literacy is essential for an estimated 40% of learners but benefits all readers, making it the best practice for classroom reading instruction. In addition, a structured literacy approach is diagnostic and responsive.

Phonology: Hearing the sounds.

Sound symbol association: Connecting sounds to letters.

Syllable instruction: Learning how to break big words down into parts.

Morphology: Learning the meaning of word parts to expand vocabulary and spelling accuracy.

Syntax: Learning how sentences work to make meaning.

Semantics: Understanding the meaning of what is written; the ultimate destination of the reading journey.

#### TK Statement (post 5100)

TK Statement

Starting school is a big milestone, and every child reaches it in their own time! At Charlotte Latin, our Transitional Kindergarten (TK) program is a special "gift of time" for bright young learners who are ready for school, and are still growing in other big ways. In TK, we give children the room and encouragement they need to flourish—helping them build confidence, learn to share and make friends, practice self-control, and strengthen their gross and fine motor skills - from running on the playground to holding a pencil! It’s a gentle, joyful bridge that helps to prepare your child to step into Kindergarten with a sense of readiness, resilience, and an eagerness to learn.

#### 3-5 Novel Statement (post 5101)

3-5 Novel Statement

Teaching through novel study builds key literacy skills while fostering critical thinking, cultural awareness, and a love for reading. Novels offer a structured way for students to engage with a text, explore the world, and understand a character’s growth and feelings. Novels, when taught with the intent to foster thoughtful reflection and response, help students experience life from a character’s perspective. In some instances, students will see themselves in the character, and at other times the character serves as a window into other worlds. Novels tell the story of the kid experience.

