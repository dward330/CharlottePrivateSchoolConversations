var e=`charlotte-latin`,t=`course-offerings`,n=11,r=[{subtopic:`Curriculum Guide Full Descriptions 2026`,source_file:`Charlotte Latin - Course Offerings - Curriculum Guide Full Descriptions 2026.md`,preview:"# Charlotte Latin School — Course Offerings — Curriculum Guide Full Descriptions (current listing, fetched 2026-11-11) - Date fetched: 2026-11-11 - Why: the earlier record (`Charlotte Latin - Course Offerings - Curriculum Guide.md`) holds the app's own descriptions word for word for 91% of courses, so it cannot catch…",text:`# Charlotte Latin School — Course Offerings — Curriculum Guide Full Descriptions (current listing, fetched 2026-11-11)

- **Date fetched:** 2026-11-11
- **Why:** the earlier record (\`Charlotte Latin - Course Offerings - Curriculum Guide.md\`)
 holds the app's own descriptions word for word for 91% of courses, so it cannot catch a
 description that drifted from the school's text. This file holds the school's own text, for
 the description-to-catalog census.
- **Finding: Charlotte Latin DOES publish per-course Upper School descriptions.** Every course
 title on the Upper School course-offerings page (S1) is a Finalsite click-to-open post whose
 body is not in the page HTML. The earlier record read the page with a plain fetch, saw titles
 only, and recorded "titles only, no per-course descriptions" — a retrieval gap, not a
 publication gap (the same trap recorded for Covenant Day). Each post was fetched here from the
 site's own popup endpoint:
 \`https://www.charlottelatin.org/fs/elements/31330?is_popup=true&post_id=<id>&show_post=true\`
 (element \`fsEl_31330\`, 136 posts: 122 courses plus department-introduction posts).
- **Undated.** None of these pages carries a year. They are the school's live text on the fetch
 date.`},{subtopic:`Source URLs`,source_file:null,preview:`| Ref | URL | What it covers | | --- | --- | --- | | S1 | https://www.charlottelatin.org/academics/upper-school/course-offerings | Upper School course list (13 department headings) with a click-to-open description post per course | | S1-post |…`,text:`| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.charlottelatin.org/academics/upper-school/course-offerings | Upper School course list (13 department headings) with a click-to-open description post per course |
| S1-post | https://www.charlottelatin.org/fs/elements/31330?is_popup=true&post_id=<id>&show_post=true | Each Upper School course's own description (post id per course in the index below) |
| S2 | https://www.charlottelatin.org/academics/middle-school | Middle School page: named courses with descriptions, plus 3 posts (element 39840) |
| S3 | https://www.charlottelatin.org/academics/lower-school | Lower School page: grade-level highlights and special-area classes, plus 5 statement posts (element 43779) |
| S4 | https://www.charlottelatin.org/academics/upper-school | Upper School overview (department framing) |`},{subtopic:`Index — every app course, in app order`,source_file:null,preview:`Upper School rows name the S1 post holding that course's own description (matched by exact title; a row marked "no post with this title" has none). Lower and Middle School rows point to the division section. | App path | Division | Department | Title | Where | | --- | --- | --- | --- | --- | |…`,text:'Upper School rows name the S1 post holding that course\'s own description (matched by exact\ntitle; a row marked "no post with this title" has none). Lower and Middle School rows point to\nthe division section.\n\n| App path | Division | Department | Title | Where |\n| --- | --- | --- | --- | --- |\n| `divisions[0].departments[0].courses[0]` | Lower School Courses | Core Academics | Structured Literacy | Lower School page (S3) |\n| `divisions[0].departments[0].courses[1]` | Lower School Courses | Core Academics | Mathematics | Lower School page (S3) |\n| `divisions[0].departments[0].courses[2]` | Lower School Courses | Core Academics | Science | Lower School page (S3) |\n| `divisions[0].departments[0].courses[3]` | Lower School Courses | Core Academics | History / Social Studies | Lower School page (S3) |\n| `divisions[0].departments[0].courses[4]` | Lower School Courses | Core Academics | STEAM | Lower School page (S3) |\n| `divisions[0].departments[1].courses[0]` | Lower School Courses | World Language | Spanish | Lower School page (S3) |\n| `divisions[0].departments[2].courses[0]` | Lower School Courses | Arts, PE & Library | Music | Lower School page (S3) |\n| `divisions[0].departments[2].courses[1]` | Lower School Courses | Arts, PE & Library | Art | Lower School page (S3) |\n| `divisions[0].departments[2].courses[2]` | Lower School Courses | Arts, PE & Library | Band / Strings / Choir | Lower School page (S3) |\n| `divisions[0].departments[2].courses[3]` | Lower School Courses | Arts, PE & Library | Physical Education | Lower School page (S3) |\n| `divisions[0].departments[2].courses[4]` | Lower School Courses | Arts, PE & Library | Library | Lower School page (S3) |\n| `divisions[1].departments[0].courses[0]` | Middle School Courses | English | English 6 | Middle School page (S2) |\n| `divisions[1].departments[0].courses[1]` | Middle School Courses | English | English 7 | Middle School page (S2) |\n| `divisions[1].departments[0].courses[2]` | Middle School Courses | English | English 8 | Middle School page (S2) |\n| `divisions[1].departments[1].courses[0]` | Middle School Courses | History | History 6: Ancient World History & Culture | Middle School page (S2) |\n| `divisions[1].departments[1].courses[1]` | Middle School Courses | History | History 7: A More Perfect Union | Middle School page (S2) |\n| `divisions[1].departments[1].courses[2]` | Middle School Courses | History | History 8 | Middle School page (S2) |\n| `divisions[1].departments[2].courses[0]` | Middle School Courses | Mathematics | Math 6 | Middle School page (S2) |\n| `divisions[1].departments[2].courses[1]` | Middle School Courses | Mathematics | Pre-Algebra | Middle School page (S2) |\n| `divisions[1].departments[2].courses[2]` | Middle School Courses | Mathematics | Advanced Pre-Algebra | Middle School page (S2) |\n| `divisions[1].departments[2].courses[3]` | Middle School Courses | Mathematics | Algebra IA | Middle School page (S2) |\n| `divisions[1].departments[2].courses[4]` | Middle School Courses | Mathematics | Algebra I | Middle School page (S2) |\n| `divisions[1].departments[2].courses[5]` | Middle School Courses | Mathematics | Advanced Algebra | Middle School page (S2) |\n| `divisions[1].departments[3].courses[0]` | Middle School Courses | Science | Science 6 | Middle School page (S2) |\n| `divisions[1].departments[3].courses[1]` | Middle School Courses | Science | Science 7 | Middle School page (S2) |\n| `divisions[1].departments[3].courses[2]` | Middle School Courses | Science | Science 8 | Middle School page (S2) |\n| `divisions[1].departments[4].courses[0]` | Middle School Courses | World Languages | Latin 7 | Middle School page (S2) |\n| `divisions[1].departments[4].courses[1]` | Middle School Courses | World Languages | Latin I | Middle School page (S2) |\n| `divisions[1].departments[4].courses[2]` | Middle School Courses | World Languages | French 6 | Middle School page (S2) |\n| `divisions[1].departments[4].courses[3]` | Middle School Courses | World Languages | French 7 | Middle School page (S2) |\n| `divisions[1].departments[4].courses[4]` | Middle School Courses | World Languages | French I (MS) | Middle School page (S2) |\n| `divisions[1].departments[4].courses[5]` | Middle School Courses | World Languages | Spanish 6 | Middle School page (S2) |\n| `divisions[1].departments[4].courses[6]` | Middle School Courses | World Languages | Spanish 7 | Middle School page (S2) |\n| `divisions[1].departments[4].courses[7]` | Middle School Courses | World Languages | Spanish I (MS) | Middle School page (S2) |\n| `divisions[1].departments[5].courses[0]` | Middle School Courses | Electives | Art / Band / Concert Choir / Strings | Middle School page (S2) |\n| `divisions[1].departments[5].courses[1]` | Middle School Courses | Electives | Engineering | Middle School page (S2) |\n| `divisions[1].departments[5].courses[2]` | Middle School Courses | Electives | Computer Programming | Middle School page (S2) |\n| `divisions[1].departments[5].courses[3]` | Middle School Courses | Electives | Drama | Middle School page (S2) |\n| `divisions[1].departments[5].courses[4]` | Middle School Courses | Electives | Leadership Lab | Middle School page (S2) |\n| `divisions[1].departments[5].courses[5]` | Middle School Courses | Electives | Speech and Debate | Middle School page (S2) |\n| `divisions[2].departments[0].courses[0]` | Upper School Courses | English | World Literature | S1 post 202 |\n| `divisions[2].departments[0].courses[1]` | Upper School Courses | English | Composition | S1 post 203 |\n| `divisions[2].departments[0].courses[2]` | Upper School Courses | English | American Literature | S1 post 204 |\n| `divisions[2].departments[0].courses[3]` | Upper School Courses | English | American Literature (Honors) | S1 post 205 |\n| `divisions[2].departments[0].courses[4]` | Upper School Courses | English | English 12 AP: Literature and Composition | S1 post 207 |\n| `divisions[2].departments[0].courses[5]` | Upper School Courses | English | Literature of War — Stories, Secrets, and Survival | S1 post 4738 |\n| `divisions[2].departments[0].courses[6]` | Upper School Courses | English | Horror & The Other in Western Literature | S1 post 3713 |\n| `divisions[2].departments[0].courses[7]` | Upper School Courses | English | From Book To Box Office | S1 post 4735 |\n| `divisions[2].departments[0].courses[8]` | Upper School Courses | English | Shakespeare and the Human Condition | S1 post 213 |\n| `divisions[2].departments[0].courses[9]` | Upper School Courses | English | Exploring Imaginary Worlds in Fantasy Literature | S1 post 4736 |\n| `divisions[2].departments[0].courses[10]` | Upper School Courses | English | Early British Literature — Heroes, Myths, & Monsters | S1 post 4737 |\n| `divisions[2].departments[0].courses[11]` | Upper School Courses | English | Visions of the Future | S1 post 3715 |\n| `divisions[2].departments[1].courses[0]` | Upper School Courses | History | World History I | S1 post 216 |\n| `divisions[2].departments[1].courses[1]` | Upper School Courses | History | World History II | S1 post 217 |\n| `divisions[2].departments[1].courses[2]` | Upper School Courses | History | United States History | S1 post 218 |\n| `divisions[2].departments[1].courses[3]` | Upper School Courses | History | United States History (AP) | S1 post 220 |\n| `divisions[2].departments[1].courses[4]` | Upper School Courses | History | European History (AP) | S1 post 221 |\n| `divisions[2].departments[1].courses[5]` | Upper School Courses | History | United States Government and Politics (AP) | S1 post 222 |\n| `divisions[2].departments[1].courses[6]` | Upper School Courses | History | Comparative Government and Politics (AP) | S1 post 223 |\n| `divisions[2].departments[1].courses[7]` | Upper School Courses | History | Honors American Studies | S1 post 219 |\n| `divisions[2].departments[1].courses[8]` | Upper School Courses | History | History of Music Seminar | S1 post 2288 |\n| `divisions[2].departments[1].courses[9]` | Upper School Courses | History | Strangers in a Common Land: Global Immigration and Migration | S1 post 2287 |\n| `divisions[2].departments[2].courses[0]` | Upper School Courses | Humanities & Social Sciences | Economics (AP) | S1 post 227 |\n| `divisions[2].departments[2].courses[1]` | Upper School Courses | Humanities & Social Sciences | Psychology (AP) | S1 post 228 |\n| `divisions[2].departments[2].courses[2]` | Upper School Courses | Humanities & Social Sciences | Philosophy: The Love of Wisdom | S1 post 2285 |\n| `divisions[2].departments[2].courses[3]` | Upper School Courses | Humanities & Social Sciences | Defining Moments: The Civil Rights Movement | S1 post 4739 |\n| `divisions[2].departments[3].courses[0]` | Upper School Courses | Mathematics | Algebra I | S1 post 230 |\n| `divisions[2].departments[3].courses[1]` | Upper School Courses | Mathematics | Algebra IB | S1 post 231 |\n| `divisions[2].departments[3].courses[2]` | Upper School Courses | Mathematics | Geometry | S1 post 232 |\n| `divisions[2].departments[3].courses[3]` | Upper School Courses | Mathematics | Geometry (Honors) | S1 post 233 |\n| `divisions[2].departments[3].courses[4]` | Upper School Courses | Mathematics | Algebra II/Trigonometry | S1 post 234 |\n| `divisions[2].departments[3].courses[5]` | Upper School Courses | Mathematics | Algebra II/Trigonometry (Honors) | S1 post 235 |\n| `divisions[2].departments[3].courses[6]` | Upper School Courses | Mathematics | Advanced Functions and Trigonometry | S1 post 236 |\n| `divisions[2].departments[3].courses[7]` | Upper School Courses | Mathematics | Pre-Calculus | S1 post 237 |\n| `divisions[2].departments[3].courses[8]` | Upper School Courses | Mathematics | Pre-Calculus (Honors) | S1 post 238 |\n| `divisions[2].departments[3].courses[9]` | Upper School Courses | Mathematics | Calculus | S1 post 239 |\n| `divisions[2].departments[3].courses[10]` | Upper School Courses | Mathematics | Mathematics of Social Choice and Management Science | S1 post 240 |\n| `divisions[2].departments[3].courses[11]` | Upper School Courses | Mathematics | Introduction to Probability and Statistics | S1 post 241 |\n| `divisions[2].departments[3].courses[12]` | Upper School Courses | Mathematics | Data Analytics: How Do They Know? | S1 post 3716 |\n| `divisions[2].departments[3].courses[13]` | Upper School Courses | Mathematics | Statistics (AP) | S1 post 242 |\n| `divisions[2].departments[3].courses[14]` | Upper School Courses | Mathematics | Calculus (AP-AB) | S1 post 243 |\n| `divisions[2].departments[3].courses[15]` | Upper School Courses | Mathematics | Calculus (AP-BC) | S1 post 244 |\n| `divisions[2].departments[4].courses[0]` | Upper School Courses | Science | Conceptual Physics | S1 post 246 |\n| `divisions[2].departments[4].courses[1]` | Upper School Courses | Science | Advanced Conceptual Physics | S1 post 247 |\n| `divisions[2].departments[4].courses[2]` | Upper School Courses | Science | Chemistry | S1 post 248 |\n| `divisions[2].departments[4].courses[3]` | Upper School Courses | Science | Chemistry (Honors) | S1 post 249 |\n| `divisions[2].departments[4].courses[4]` | Upper School Courses | Science | Chemistry II (AP) | S1 post 250 |\n| `divisions[2].departments[4].courses[5]` | Upper School Courses | Science | Biology | S1 post 251 |\n| `divisions[2].departments[4].courses[6]` | Upper School Courses | Science | Biology (Honors) | S1 post 252 |\n| `divisions[2].departments[4].courses[7]` | Upper School Courses | Science | Biology (AP) | S1 post 253 |\n| `divisions[2].departments[4].courses[8]` | Upper School Courses | Science | Environmental Science (AP) | S1 post 254 |\n| `divisions[2].departments[4].courses[9]` | Upper School Courses | Science | Physics (Honors) | S1 post 255 |\n| `divisions[2].departments[4].courses[10]` | Upper School Courses | Science | Physics C (Mechanics) (AP) | S1 post 256 |\n| `divisions[2].departments[4].courses[11]` | Upper School Courses | Science | Physics C (Mechanics and E&M) (AP) | S1 post 1304 |\n| `divisions[2].departments[4].courses[12]` | Upper School Courses | Science | Astronomy | S1 post 4740 |\n| `divisions[2].departments[4].courses[13]` | Upper School Courses | Science | Genetics | S1 post 259 |\n| `divisions[2].departments[4].courses[14]` | Upper School Courses | Science | Human Anatomy and Physiology | S1 post 260 |\n| `divisions[2].departments[4].courses[15]` | Upper School Courses | Science | Science of Medicine | S1 post 1877 |\n| `divisions[2].departments[5].courses[0]` | Upper School Courses | World Languages | French I–V | S1 post 175, 176, 177, 179, 4741 |\n| `divisions[2].departments[5].courses[1]` | Upper School Courses | World Languages | French III/IV Honors | S1 post 178, 180 |\n| `divisions[2].departments[5].courses[2]` | Upper School Courses | World Languages | French Language & Culture (AP) | S1 post 182 |\n| `divisions[2].departments[5].courses[3]` | Upper School Courses | World Languages | Spanish I, 1B, II, III, IV, V | S1 post 191, 1303, 192, 193, 195, 197, 198 |\n| `divisions[2].departments[5].courses[4]` | Upper School Courses | World Languages | Spanish III/IV Honors | S1 post 194, 196 |\n| `divisions[2].departments[5].courses[5]` | Upper School Courses | World Languages | Spanish Language and Culture (AP) | S1 post 199 |\n| `divisions[2].departments[5].courses[6]` | Upper School Courses | World Languages | Spanish Literature and Culture (AP) | S1 post 200 |\n| `divisions[2].departments[5].courses[7]` | Upper School Courses | World Languages | Latin I–V | S1 post 185, 186, 187 |\n| `divisions[2].departments[5].courses[8]` | Upper School Courses | World Languages | Latin III Honors / Latin IV (Honors) | S1 post 188, 189 |\n| `divisions[2].departments[5].courses[9]` | Upper School Courses | World Languages | Latin V (AP) | S1 post 190 |\n| `divisions[2].departments[5].courses[10]` | Upper School Courses | World Languages | Greek III (Honors) | S1 post 4746 |\n| `divisions[2].departments[5].courses[11]` | Upper School Courses | World Languages | Greek IV (Honors) | S1 post 1875 |\n| `divisions[2].departments[6].courses[0]` | Upper School Courses | Innovation & Design | Engineering I | S1 post 262 |\n| `divisions[2].departments[6].courses[1]` | Upper School Courses | Innovation & Design | Engineering II | S1 post 263 |\n| `divisions[2].departments[6].courses[2]` | Upper School Courses | Innovation & Design | Introduction to Civil Engineering | S1 post 3717 |\n| `divisions[2].departments[6].courses[3]` | Upper School Courses | Innovation & Design | Engineering in Motion: How to Make Things Move | S1 post 4747 |\n| `divisions[2].departments[6].courses[4]` | Upper School Courses | Innovation & Design | Advanced Topics in Engineering | S1 post 266 |\n| `divisions[2].departments[6].courses[5]` | Upper School Courses | Innovation & Design | Entrepreneurship and Global Marketplace Leadership | S1 post 267 |\n| `divisions[2].departments[6].courses[6]` | Upper School Courses | Innovation & Design | Digital Design and Web Development | S1 post 268 |\n| `divisions[2].departments[6].courses[7]` | Upper School Courses | Innovation & Design | Cybersecurity 1: Networking Fundamentals (AP) | S1 post 4742 |\n| `divisions[2].departments[6].courses[8]` | Upper School Courses | Innovation & Design | Computer Science Principles (AP) | S1 post 1305 |\n| `divisions[2].departments[6].courses[9]` | Upper School Courses | Innovation & Design | Computer Science A (AP) | S1 post 270 |\n| `divisions[2].departments[6].courses[10]` | Upper School Courses | Innovation & Design | App Design/Game Design | S1 post 1307 |\n| `divisions[2].departments[6].courses[11]` | Upper School Courses | Innovation & Design | Java Data Structures | S1 post 1308 |\n| `divisions[2].departments[7].courses[0]` | Upper School Courses | Communications & Global Leadership | Introduction to Speech and Debate | S1 post 272 |\n| `divisions[2].departments[7].courses[1]` | Upper School Courses | Communications & Global Leadership | Advanced Debate | S1 post 273 |\n| `divisions[2].departments[7].courses[2]` | Upper School Courses | Communications & Global Leadership | Advanced Speech | S1 post 274 |\n| `divisions[2].departments[7].courses[3]` | Upper School Courses | Communications & Global Leadership | Communications and Twenty-First Century Journalism | S1 post 276 |\n| `divisions[2].departments[7].courses[4]` | Upper School Courses | Communications & Global Leadership | Leadership and Social Responsibility | S1 post 4389 |\n| `divisions[2].departments[7].courses[5]` | Upper School Courses | Communications & Global Leadership | Leadership for the Twenty-First Century | S1 post 275 |\n| `divisions[2].departments[7].courses[6]` | Upper School Courses | Communications & Global Leadership | Yearbook | S1 post 277 |\n| `divisions[2].departments[7].courses[7]` | Upper School Courses | Communications & Global Leadership | Student Internship Program | S1 post 278 |\n| `divisions[2].departments[8].courses[0]` | Upper School Courses | Performing Arts | Acting | S1 post 2290 |\n| `divisions[2].departments[8].courses[1]` | Upper School Courses | Performing Arts | Film Acting | S1 post 3719 |\n| `divisions[2].departments[8].courses[2]` | Upper School Courses | Performing Arts | Stagecraft I | S1 post 2292 |\n| `divisions[2].departments[8].courses[3]` | Upper School Courses | Performing Arts | Stagecraft II | S1 post 2292 |\n| `divisions[2].departments[8].courses[4]` | Upper School Courses | Performing Arts | Advanced Design | S1 post 2294 |\n| `divisions[2].departments[8].courses[5]` | Upper School Courses | Performing Arts | After-School Theater and Stagecraft | S1 post 653 |\n| `divisions[2].departments[8].courses[6]` | Upper School Courses | Performing Arts | Band | S1 post 286 |\n| `divisions[2].departments[8].courses[7]` | Upper School Courses | Performing Arts | Concert Choir | S1 post 287 |\n| `divisions[2].departments[8].courses[8]` | Upper School Courses | Performing Arts | Orchestra | S1 post 288 |\n| `divisions[2].departments[8].courses[9]` | Upper School Courses | Performing Arts | Music Theory I | S1 post 289 |\n| `divisions[2].departments[8].courses[10]` | Upper School Courses | Performing Arts | Music Theory AP | S1 post 654 |\n| `divisions[2].departments[9].courses[0]` | Upper School Courses | Visual Arts | Art Studio I–IV | S1 post 291, 292, 293, 294 |\n| `divisions[2].departments[9].courses[1]` | Upper School Courses | Visual Arts | Photography | S1 post 4395 |\n| `divisions[2].departments[10].courses[0]` | Upper School Courses | Physical Education | Physical Education/Health | S1 post 297 |\n| `divisions[2].departments[10].courses[1]` | Upper School Courses | Physical Education | Introduction to Sports Medicine | S1 post 298 |'},{subtopic:`Upper School — course posts (S1), in the page's own order`,source_file:null,preview:`### World Languages - Post id: 173 · tags: World Languages Students benefit from learning a second language in a number of practical and individual ways. In studying another language, whether modern or classical, a student develops knowledge of another culture, which provides a point of reference for expanding…`,text:`### World Languages

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

Honors American Literature is a chronological survey course that reflects the diversity of styles, subjects, and authors that have emerged over the course of American history. It is designed for students genuinely interested in undertaking a rigorous study of challenging literature involving intensive practice in critical reading, litera

…[truncated]

---`},{subtopic:`Curriculum Guide`,source_file:`Charlotte Latin - Course Offerings - Curriculum Guide.md`,preview:`# Charlotte Latin School — Course Offerings - Divisions: Lower School TK–5 · Middle School 6–8 · Upper School 9–12`,text:`# Charlotte Latin School — Course Offerings

- **Divisions:** Lower School TK–5 · Middle School 6–8 · Upper School 9–12`},{subtopic:`Source URLs`,source_file:null,preview:`| Ref | URL | What it covers | | --- | --- | --- | | S1 | https://www.charlottelatin.org/academics/upper-school/course-offerings | PRIMARY Upper School source — the full course list under 13 department headings. Titles only, no per-course descriptions. Undated. | | S2 |…`,text:`| Ref | URL | What it covers |
| --- | --- | --- |
| S1 | https://www.charlottelatin.org/academics/upper-school/course-offerings | **PRIMARY Upper School source** — the full course list under 13 department headings. Titles only, no per-course descriptions. Undated. |
| S2 | https://www.charlottelatin.org/academics/middle-school | **PRIMARY Middle School source** — named courses **with** real description text |
| S3 | https://www.charlottelatin.org/academics/lower-school | Lower School subject areas (no named courses) |
| S4 | https://www.charlottelatin.org/academics | TK–12 range, 1,500+ enrollment, 3 divisions, 50-minute "waterfall" schedule |
| S5 | https://www.charlottelatin.org/academics/upper-school | Semester system; six courses per year, four academic |
| S6 | https://www.charlottelatin.org/uploaded/COMPOSER/AcademicsTab/Upper_School_Profile_for_Admissions_(1).pdf | **2023-24 Upper School Profile** — most recent profile located. "22 subjects" AP figure plus AP/Honors-by-department lists |
| S7 | https://www.charlottelatin.org/uploaded/COMPOSER/AcademicsTab/USprofile2021.pdf | 2020-21 profile — 21-credit graduation requirements verbatim, math sequence |
| S8 | https://www.charlottelatin.org/uploaded/COMPOSER/AdmissionsTab/USProfile1920.pdf | 2019-20 profile — corroborates "22 subjects"; 1,433 students TK–12 |
| S9 | https://www.charlottelatin.org/leading-programs/innovation-design | Fab Lab, MIT Fab Academy network. No course names |
| S10 | https://issuu.com/charlottelatinschool | Publisher index, 121 publications — **no course catalog present** |

**Publication year:** the live course-offerings page (S1) is undated and is the school's current
published list. The most recent Upper School profile is **2023-24** (S6); all AP and enrollment
metrics carry that vintage.

### Source-integrity warning (important)

Web search repeatedly returns \`bbk12e1-cdn.myschoolcdn.com/ftpimages/90/misc/\` PDFs titled
"UPPER SCHOOL Course Catalog" for 2024-25, 2025-26, and 2026-27 as Charlotte Latin results.
All three were downloaded and text-extracted during this research: **each one is The Hockaday
School (Dallas, TX)** — 75–83 "Hockaday" mentions, zero "Charlotte Latin." **All three were
discarded.** Any research citing \`misc_234193.pdf\`, \`misc_240710.pdf\`, or \`misc_227178.pdf\` as
Charlotte Latin's catalog is wrong.

Also note \`/academics/lower-school/curriculum\` returns HTTP 200 but is an unpublished "New Page"
placeholder — not citable.`},{subtopic:`Metrics`,source_file:null,preview:`| Metric | Value | Source | | --- | --- | --- | | Grade range | TK–12 | S4, S8 | | Enrollment | 1,500+ (1,433 in 2019-20) | S4, S8 | | Student:faculty ratio | 9:1 | charlottelatin.org homepage | | Upper School departments | 13 | S1 | | Upper School courses catalogued | 129 | S1 | | AP-titled course entries | 23 | S1…`,text:`| Metric | Value | Source |
| --- | --- | --- |
| Grade range | TK–12 | S4, S8 |
| Enrollment | 1,500+ (1,433 in 2019-20) | S4, S8 |
| Student:faculty ratio | 9:1 | charlottelatin.org homepage |
| Upper School departments | 13 | S1 |
| Upper School courses catalogued | 129 | S1 |
| AP-titled course entries | 23 | S1 (counted) |
| AP subjects (school's own claim) | 22 | S6, S7, S8 |
| Credits required to graduate | 21 | S7 |
| Middle School courses with descriptions | 22 | S2 |

AP-count note: 23 AP-titled entries appear on the course page versus the school's stated "22
subjects." These reconcile — AP Economics counts as one subject but covers Macro and Micro, and
Physics C appears as two course entries. Report **22 subjects** as the school's own figure.`},{subtopic:`Upper School (Grades 9–12) — source S1`,source_file:null,preview:`Graduation requires 21 credits (S7). Students take six courses per year, four of them academic (S5). Important: S1 publishes course titles only. Descriptions below are derived from the school's own department-level framing on S1/S5/S6, not from per-course catalog prose (which Charlotte Latin does not publish for the…`,text:`Graduation requires 21 credits (S7). Students take six courses per year, four of them academic (S5).

**Important:** S1 publishes course titles only. Descriptions below are derived from the school's own
department-level framing on S1/S5/S6, **not** from per-course catalog prose (which Charlotte Latin
does not publish for the Upper School). See Gaps.

### English (4 credits required)

- **World Literature** — *Gr 9* — The ninth-grade entry point to the Upper School English sequence, surveying world literature.
- **Composition** — *Gr 10* — Sophomore-year focus on composition and the mechanics of academic writing.
- **American Literature** — *Gr 11* — Junior-year survey of American literature.
- **American Literature (Honors)** — *Honors* — The American Literature sequence at honors pace and depth.
- **English 12 AP: Literature and Composition** — *AP* — College-level literary analysis and composition for seniors.
- **Literature of War — Stories, Secrets, and Survival** — *Semester · Gr 12* — A senior semester elective on the literature of war.
- **Horror & The Other in Western Literature** — *Semester · Gr 12* — A senior semester elective on horror and otherness in the Western canon.
- **From Book To Box Office** — *Semester · Gr 12* — A senior semester elective comparing literary works with their film adaptations.
- **Shakespeare and the Human Condition** — *Semester · Gr 12* — A senior semester elective on Shakespeare's treatment of the human condition.
- **Exploring Imaginary Worlds in Fantasy Literature** — *Semester · Gr 12* — A senior semester elective on world-building in fantasy literature.
- **Early British Literature — Heroes, Myths, & Monsters** — *Semester · Gr 12* — A senior semester elective on early British literature.
- **Visions of the Future** — *Semester · Gr 12* — A senior semester elective on speculative and futurist literature.

### History (3 credits required)

- **World History I** — *Gr 9* — The ninth-grade world history survey.
- **World History II** — *Gr 10* — The sophomore continuation of the world history sequence.
- **United States History** — *Gr 11* — The junior-year United States history survey.
- **United States History (AP)** — *AP* — College-level U.S. history.
- **European History (AP)** — *AP* — College-level European history.
- **United States Government and Politics (AP)** — *AP* — College-level American government and politics.
- **Comparative Government and Politics (AP)** — *AP* — College-level comparative government and politics.
- **Honors American Studies** — *Honors* — An honors course the school's profile describes as equivalent in rigor to AP U.S. History.
- **History of Music Seminar** — *Honors* — An honors seminar on the history of music.
- **Strangers in a Common Land: Global Immigration and Migration** — *Honors* — An honors course on global immigration and migration.

### Humanities / Social Sciences

- **Economics (AP)** — *AP* — College-level economics covering both macroeconomics and microeconomics.
- **Psychology (AP)** — *AP* — College-level psychology.
- **Philosophy: The Love of Wisdom** — *Honors* — An honors introduction to philosophical inquiry.
- **Defining Moments: The Civil Rights Movement** — *Semester* — A semester elective on the Civil Rights Movement.

### Mathematics (4 credits required)

- **Algebra I** — *Year* — The first-year algebra course.
- **Algebra IB** — *Year* — A second entry point in the algebra sequence.
- **Geometry** — *Year* — The standard geometry course.
- **Geometry (Honors)** — *Honors* — Geometry at honors pace and depth.
- **Algebra II/Trigonometry** — *Year* — Second-year algebra combined with trigonometry.
- **Algebra II/Trigonometry (Honors)** — *Honors* — The Algebra II/Trigonometry sequence at honors level.
- **Advanced Functions and Trigonometry** — *Year* — Advanced work in functions and trigonometry.
- **Pre-Calculus** — *Year* — The standard pre-calculus course.
- **Pre-Calculus (Honors)** — *Honors* — Pre-calculus at honors pace and depth.
- **Calculus** — *Year* — A non-AP calculus course.
- **Mathematics of Social Choice and Management Science** — *Honors* — An honors course applying mathematics to social choice and management science.
- **Introduction to Probability and Statistics** — *Honors* — An honors introduction to probability and statistics.
- **Data Analytics: How Do They Know?** — *Honors* — An honors course in data analytics.
- **Statistics (AP)** — *AP* — College-level statistics.
- **Calculus (AP-AB)** — *AP* — College-level differential and integral calculus, AB syllabus.
- **Calculus (AP-BC)** — *AP* — College-level calculus, BC syllabus.

### Science (3 credits required, all lab-based per S7)

- **Conceptual Physics** — *Gr 9* — The ninth-grade physics-first entry to the science sequence.
- **Advanced Conceptual Physics** — *Advanced* — Conceptual Physics at accelerated pace and depth.
- **Chemistry** — *Gr 10* — The sophomore-year chemistry course.
- **Chemistry (Honors)** — *Honors* — Chemistry at honors pace and depth.
- **Chemistry II (AP)** — *AP* — College-level second-year chemistry.
- **Biology** — *Gr 11* — The junior-year biology course.
- **Biology (Honors)** — *Honors* — Biology at honors pace and depth.
- **Biology (AP)** — *AP* — College-level biology.
- **Environmental Science (AP)** — *AP* — College-level environmental science.
- **Physics (Honors)** — *Honors* — Honors-level physics beyond the ninth-grade course.
- **Physics C (Mechanics) (AP)** — *AP* — Calculus-based college physics in mechanics.
- **Physics C (Mechanics and E&M) (AP)** — *AP* — Calculus-based college physics in mechanics and electricity and magnetism.
- **Astronomy** — *Elective* — An elective course in astronomy.
- **Genetics** — *Elective* — An elective course in genetics.
- **Human Anatomy and Physiology** — *Elective* — An elective course in human anatomy and physiology.
- **Science of Medicine** — *Elective* — An elective course on the science underpinning medicine.

### World Languages (3 credits in the same language required)

- **French I–V** — *Year* — A five-level French sequence.
- **French III/IV Honors** — *Honors* — Honors-level French at the third and fourth years.
- **French Language & Culture (AP)** — *AP* — College-level French language and culture.
- **Spanish I, 1B, II, III, IV, V** — *Year* — The Spanish sequence, with V split into Contemporary Issues of the Hispanic World and Composition and Conversation.
- **Spanish III/IV Honors** — *Honors* — Honors-level Spanish at the third and fourth years.
- **Spanish Language and Culture (AP)** — *AP* — College-level Spanish language and culture.
- **Spanish Literature and Culture (AP)** — *AP* — College-level Spanish literature and culture.
- **Latin I–V** — *Year* — A five-level Latin sequence.
- **Latin III Honors / Latin IV (Honors)** — *Honors* — Honors-level Latin.
- **Latin V (AP)** — *AP* — College-level Latin.
- **Greek III (Honors)** — *Honors* — Honors Greek; per S6 Greek may only be taken as a second world language.
- **Greek IV (Honors)** — *Honors* — The fourth-year honors Greek course.

### Innovation & Design

Taught "like a professional software engineering firm" using Git and GitHub, in a Fab Lab with 3D
printers, laser engravers, electronics benches, and CAD (S9). Charlotte Latin is part of the MIT
Fab Academy network.

- **Engineering I** — *Year* — The introductory engineering course.
- **Engineering II** — *Year* — The second-year engineering course.
- **Introduction to Civil Engineering** — *Elective* — An introduction to civil engineering.
- **Engineering in Motion: How to Make Things Move** — *Elective* — An engineering elective on mechanisms and motion.
- **Advanced Topics in Engineering** — *Advanced* — Advanced engineering topics.
- **Entrepreneurship and Global Marketplace Leadership** — *Elective* — Entrepreneurship and leadership in the global marketplace.
- **Digital Design and Web Development** — *Elective* — Digital design and web development.
- **Cybersecurity 1: Networking Fundamentals (AP)** — *AP* — Networking fundamentals and cybersecurity.
- **Computer Science Principles (AP)** — *AP* — College-level foundational computer science.
- **Computer Science A (AP)** — *AP* — College-level object-oriented programming.
- **App Design/Game Design** — *Elective* — Application and game design.
- **Java Data Structures** — *Honors* — Honors-level data structures in Java.

### Communications & Global Leadership

- **Introduction to Speech and Debate** — *Elective* — The entry course into Charlotte Latin's speech and debate program.
- **Advanced Debate** — *Advanced* — Advanced competitive debate.
- **Advanced Speech** — *Advanced* — Advanced competitive speech.
- **Communications and Twenty-First Century Journalism** — *Elective* — Communications and contemporary journalism.
- **Leadership and Social Responsibility** — *Elective* — Leadership paired with social responsibility.
- **Leadership for the Twenty-First Century** — *Elective* — Contemporary leadership studies.
- **Yearbook** — *Year* — Production of the school yearbook.
- **Student Internship Program** — *Elective* — A credit-bearing student internship placement.

### Performing Arts — Drama

- **Acting** — *Elective* — The foundational acting course.
- **Film Acting** — *Elective* — Acting technique for the camera.
- **Stagecraft I** — *Elective* — The introductory technical theatre course.
- **Stagecraft II** — *Elective* — The second-level technical theatre course.
- **Advanced Design** — *Advanced* — Advanced theatrical design.
- **After-School Theater and Stagecraft** — *Elective* — After-school theatre production and stagecraft.

### Performing Arts — Music

- **Band** — *Year* — The Upper School band ensemble.
- **Concert Choir** — *Year* — The Upper School choral ensemble.
- **Orchestra** — *Year* — The Upper School orchestral ensemble.
- **Music Theory I** — *Elective* — The introductory music theory course.
- **Music Theory AP** — *AP* — College-level music theory.

### Visual Arts

- **Art Studio I–IV** — *Elective* — A four-level studio art sequence.
- **Photography** — *Elective* — The photography course.

### Physical Education (1 credit required; half waivable via athletics)

- **Physical Education/Health** — *Required* — The Upper School physical education and health requirement.
- **Introduction to Sports Medicine** — *Elective* — An introduction to sports medicine.

### Online Courses

Listed as a department heading on S1 with **no published course titles** — see Gaps.`},{subtopic:`Middle School (Grades 6–8) — source S2`,source_file:null,preview:`Descriptions in this section are verbatim or near-verbatim from the school's own Middle School page, which — unlike the Upper School list — does publish real per-course prose. ### English - English 6 — Gr 6 — Students practice skills that help them develop as public speakers and confident readers and writers. -…`,text:`Descriptions in this section are **verbatim or near-verbatim from the school's own Middle School
page**, which — unlike the Upper School list — does publish real per-course prose.

### English

- **English 6** — *Gr 6* — Students practice skills that help them develop as public speakers and confident readers and writers.
- **English 7** — *Gr 7* — Designed to inspire a love of reading and help students develop into lifelong learners.
- **English 8** — *Gr 8* — Students develop as mature readers and confident writers.

### History

- **History 6: Ancient World History & Culture** — *Gr 6* — Examines ancient civilizations found in the Middle East, Africa, China, India, and Europe, and makes connections to current events.
- **History 7: A More Perfect Union** — *Gr 7* — Covers English migrations and the transatlantic slave trade through Reconstruction.
- **History 8** — *Gr 8* — Post-Civil War to modern day through the lens of five core ideals: equality, rights, liberty, opportunity, and democracy.

### Mathematics

- **Math 6** — *Gr 6* — Enhances students' core math skills while strengthening their ability to think critically.
- **Pre-Algebra** — *Gr 6-7* — Builds a strong foundation for success in algebra.
- **Advanced Pre-Algebra** — *Advanced* — A bridge between concrete and abstract mathematical thinking.
- **Algebra IA** — *Gr 8* — The first year of a two-year sequence.
- **Algebra I** — *Gr 8* — A full-year course covering foundational skills and deep conceptual understanding.
- **Advanced Algebra** — *Advanced* — For students seeking an advanced and challenging mathematical experience.

### Science

- **Science 6** — *Gr 6* — Explores how the world is organized, across the living and non-living world.
- **Science 7** — *Gr 7* — An integrated approach focusing on lab skills, introductory chemistry, and human biology.
- **Science 8** — *Gr 8* — Uses the geologic timeline to explore space, geology, natural selection and evolution, and environmental science.

### World Languages

- **Latin 7** — *Gr 7* — "Are you ready to travel back in time?" — the Middle School introduction to Latin.
- **Latin I** — *Gr 8* — The Upper School Latin I credit taken in Middle School.
- **French 6** — *Gr 6* — The sixth-grade French course.
- **French 7** — *Gr 7* — The seventh-grade French course.
- **French I (MS)** — *Gr 8* — The Upper School French I credit taken in Middle School.
- **Spanish 6** — *Gr 6* — The sixth-grade Spanish course.
- **Spanish 7** — *Gr 7* — The seventh-grade Spanish course.
- **Spanish I (MS)** — *Gr 8* — The Upper School Spanish I credit taken in Middle School.

High-school classes taken in Middle School appear on the transcript but are excluded from GPA (S7).

### Electives (titles only — no descriptions published)

- Grade 6: Art, Band, Concert Choir, Engineering, Strings.
- Grades 7–8: adds Computer Programming, Drama, Leadership Lab, Speech and Debate.

### Programs

STEAM with the Fab Lab; Advisory; Mock Trial; Lamm Hawks Quest experiential education;
Emotional Intelligence curriculum.`},{subtopic:`Lower School (TK–5) — source S3`,source_file:null,preview:`Charlotte Latin does not publish named Lower School courses. It publishes subject areas with descriptive language — the correct grain for this division. - Structured Literacy — TK-5 — Built on six components: phonology, sound-symbol association, syllable, morphology, syntax, and semantics. - Mathematics — TK-5 —…`,text:`**Charlotte Latin does not publish named Lower School courses.** It publishes subject areas with
descriptive language — the correct grain for this division.

- **Structured Literacy** — *TK-5* — Built on six components: phonology, sound-symbol association, syllable, morphology, syntax, and semantics.
- **Mathematics** — *TK-5* — Taught through a concrete-pictorial-abstract progression.
- **Science** — *TK-5* — Inquiry-based investigations.
- **History / Social Studies** — *TK-5* — Students discover the story of our country and world from varied perspectives.
- **Spanish** — *TK-5* — Interpretive, interpersonal, and presentational modes developed via stories, songs, games, and movement.
- **Music** — *TK-5* — Music instruction from TK onward.
- **Art** — *TK-5* — Art instruction from TK onward.
- **Band / Strings / Choir** — *Gr 5* — In Grade 5 students choose an instrument for Band or Strings, with Choir also available.
- **STEAM** — *TK-2* — Integrated STEAM instruction in the earliest grades.
- **Physical Education** — *TK-5* — Lifelong wellness through team and individual sports and health education.
- **Library** — *TK-5* — Library instruction anchored by a 16,000-volume print collection.

Lower School uses competency-based report cards.`},{subtopic:`Gaps — what Charlotte Latin does not publish`,source_file:null,preview:`1. No current Upper School course catalog or curriculum guide PDF is publicly available. The only Charlotte Latin catalog that exists publicly is the 2020-21 edition on Issuu, whose interior text is not machine-extractable. The live course-offerings page (S1) is undated. 2. No Upper School course descriptions are…`,text:`1. **No current Upper School course catalog or curriculum guide PDF is publicly available.** The only
 Charlotte Latin catalog that exists publicly is the **2020-21** edition on Issuu, whose interior
 text is not machine-extractable. The live course-offerings page (S1) is undated.
2. **No Upper School course descriptions are published anywhere.** S1 gives titles only. The Upper
 School descriptions in this file are derived from department-level language, **not** per-course
 catalog prose — unlike Middle School, which has genuine per-course text. This is the single
 biggest data-quality difference between Charlotte Latin and its peers in this project.
3. **No named Lower School courses** — subject areas only. \`/academics/lower-school/curriculum\` is
 an unpublished placeholder.
4. **No Middle School curriculum guide PDF**; Middle School elective descriptions are absent; no
 Middle School math-placement or elective-count statement is published.
5. **Most recent school profile is 2023-24**; no 2025-26 or 2026-27 profile found. All AP and
 enrollment metrics carry that vintage.
6. **The "Online Courses" department has no published titles.**
7. **AP count ambiguity** — 23 AP-titled course entries versus the school's stated "22 subjects."
8. **Courses in older profiles are absent from the current list** and should be treated as
 discontinued, not current: Aquatic Ecology, Field Ecology, Neurobiology, Postcolonial
 Literature, Cold War, Introduction to Bioengineering.
9. **Search-result contamination** — see the source-integrity warning above. Three PDFs that search
 engines attribute to Charlotte Latin are actually The Hockaday School's catalogs.

---`}],i={school_slug:e,topic_slug:t,section_count:11,sections:r};export{i as default,e as school_slug,n as section_count,r as sections,t as topic_slug};