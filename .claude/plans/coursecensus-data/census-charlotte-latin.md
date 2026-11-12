# Census — charlotte-latin (plan `coursecensus`, Batch 1)

Every Course Offerings description for charlotte-latin, checked against the school's own text in `source-material/course-offerings/charlotte-latin/Charlotte Latin - Course Offerings - Curriculum Guide Full Descriptions 2026.md`. Verdicts are the plan's ("Decisions"). The table was drafted by a fresh census subagent; every non-OK row was then re-checked against the source by the implementer, and any change to the subagent's verdict is noted in the row.

## Verdicts

| Verdict | Rows |
|---|--:|
| OK | 121 |
| SITE-WRITTEN-OK | 4 |
| NOT-ABOUT-COURSE | 0 |
| MISSTATES | 6 |
| NARROWS | 4 |
| UNSUPPORTED | 10 |
| **Total** | **145** |

## Rows fixed

| Path | Title | Verdict | Evidence | Before | After |
|---|---|---|---|---|---|
| `divisions[0].departments[2].courses[2]` | Band / Strings / Choir | MISSTATES | "Our Grade 5 students are able to choose and instrument and participate in Band or Strings. They also participate in Choir." (Lower School page, Special Area Classes ## The Arts) — the school says Grade 5 students also take part in Choir; "also available" makes it sound optional | In Grade 5 students choose an instrument for Band or Strings, with Choir also available. | In Grade 5 students choose an instrument for Band or Strings, and they also take part in Choir. |
| `divisions[1].departments[5].courses[1]` | Engineering | UNSUPPORTED | The page lists Engineering as a title only, under Grade 6, Grade 7 and Grade 8 (Middle School page, ## Electives); the only Fab Lab line is the general STEAM highlight: "They gain hands-on experience using cutting-edge tools in Latin’s Fab Lab" (Middle School page, Program Highlights, STEAM) — nothing ties the Engineering elective to the Fab Lab | A Grade 6 elective anchored by the school’s Fab Lab. | An elective in Grades 6, 7 and 8; the school publishes the title without a description. |
| `divisions[1].departments[5].courses[5]` | Speech and Debate | UNSUPPORTED | Title only under Grades 7 and 8 (Middle School page, ## Electives); no text in the source calls the program "nationally ranked" (Upper School page: "Whether delivering arguments in a competitive setting ..."). The on-ramp is supported: Advanced Debate prerequisite "Introduction to Speech and Debate, middle school coursework, or tournament experience" (post 273) | The Middle School on-ramp to Charlotte Latin’s nationally ranked Speech and Debate program. | The Middle School on-ramp to Charlotte Latin’s Speech and Debate program. |
| `divisions[2].departments[0].courses[3]` | American Literature (Honors) | UNSUPPORTED | "Honors American Literature is a chronological survey course ... a rigorous study of challenging literature involving intensive practice in critical reading, literary analysis, and research" (post 205) — the post gives no pace, and it is one course, not a sequence | The American Literature sequence at honors pace and depth. | A chronological survey of American literature at the honors level. |
| `divisions[2].departments[0].courses[5]` | Literature of War — Stories, Secrets, and Survival | UNSUPPORTED | Post 4738 has no grade or semester line (its siblings 3713, 213, 3715 carry "[Semester course open primarily to seniors.]"): "This class explores the literary response to 20th-century conflicts" (post 4738) | A senior semester elective on the literature of war. | An English elective on the literature of war. |
| `divisions[2].departments[0].courses[6]` | Horror & The Other in Western Literature | NARROWS | "[Semester course open primarily to seniors.]" (post 3713) — "senior" drops "primarily"; content matches: "the horror canon’s evolution ... our preoccupation with the Other" | A senior semester elective on horror and otherness in the Western canon. | A semester elective, open mainly to seniors, on horror and otherness in the Western canon. |
| `divisions[2].departments[0].courses[7]` | From Book To Box Office | UNSUPPORTED | Post 4735 has no grade or semester line: "You’ll dive into short stories and novels, and their film adaptations" (post 4735) | A senior semester elective comparing literary works with their film adaptations. | An English elective comparing literary works with their film adaptations. |
| `divisions[2].departments[0].courses[8]` | Shakespeare and the Human Condition | NARROWS | "[Semester course open primarily to seniors.]" (post 213) — "senior" drops "primarily"; content matches: "his plays touch on the abiding themes of the human condition" | A senior semester elective on Shakespeare’s treatment of the human condition. | A semester elective, open mainly to seniors, on Shakespeare’s treatment of the human condition. |
| `divisions[2].departments[0].courses[9]` | Exploring Imaginary Worlds in Fantasy Literature | UNSUPPORTED | Post 4736 has no grade or semester line: "the differences between primary and secondary world fantasy" (post 4736) | A senior semester elective on world-building in fantasy literature. | An English elective on world-building in fantasy literature. |
| `divisions[2].departments[0].courses[10]` | Early British Literature — Heroes, Myths, & Monsters | UNSUPPORTED | Post 4737 has no grade or semester line: "You will study three early masterpieces, starting with the Old English story of Beowulf" (post 4737) | A senior semester elective on early British literature. | An English elective on early British literature. |
| `divisions[2].departments[0].courses[11]` | Visions of the Future | NARROWS | "[Semester course open primarily to seniors.]" (post 3715) — "senior" drops "primarily"; NOTE content is dystopian fiction: "the gripping worlds of dystopian fiction, from classics like 1984 and Brave New World" | A senior semester elective on speculative and futurist literature. | A semester elective, open mainly to seniors, on speculative and futurist literature. |
| `divisions[2].departments[1].courses[8]` | History of Music Seminar | MISSTATES | "[Semester seminar open to seniors and juniors, and also to sophomores who are placed in and take the course at the honors level ...]" (post 2288); "All seminars have an honors option ... Students who register for honors but fail ... will be moved to a standard designation" (post 4734); "explores the various ways that music has influenced and even helped chart the course of history" (post 2288) — a seminar with an honors option, not an honors course | An honors seminar on the history of music. | A semester seminar, with an honors option, on how music has influenced the course of history. |
| `divisions[2].departments[1].courses[9]` | Strangers in a Common Land: Global Immigration and Migration | MISSTATES | "This semester seminar links the human experiences of immigration and migration to current political and cultural systems" (post 2287); "All seminars have an honors option" (post 4734); "Students taking the course at the honors level will produce an 8-10 page capstone paper" (post 2287) — a seminar with an honors option, not an honors course | An honors course on global immigration and migration. | A semester seminar, with an honors option, on global immigration and migration. |
| `divisions[2].departments[3].courses[3]` | Geometry (Honors) | UNSUPPORTED | "Honors Geometry covers the topics of geometry in greater depth with more rigor, and includes additional topics from logic, symbolic logic, and transformational geometry." (post 233) — depth and rigor, no pace | Geometry at honors pace and depth. | Geometry at honors depth, with added topics from logic, symbolic logic and transformational geometry. |
| `divisions[2].departments[3].courses[8]` | Pre-Calculus (Honors) | UNSUPPORTED | "Pre-Calculus Honors, designed for students with very strong mathematical ability, is a thorough preparation for college level mathematics courses" (post 238) — no pace is given | Pre-calculus at honors pace and depth. | Pre-calculus at honors depth, for students with very strong math ability. |
| `divisions[2].departments[4].courses[4]` | Chemistry II (AP) | MISSTATES — upgraded from OK by the implementer | "This course is designed to be the equivalent of the general chemistry course taken during the first year of college." (post 250). "College-level second-year chemistry" reads as second-year college chemistry; it is second-year high-school chemistry at first-year college level. | College-level second-year chemistry. | Second-year chemistry at the level of a first-year college general chemistry course. |
| `divisions[2].departments[6].courses[1]` | Engineering II | MISSTATES | "[Semester elective open to all Upper School students.] Students continue to learn about the engineering method as the class focuses on electronics and microcontrollers ... Prerequisite: Engineering I or similar coursework/experience" (post 263) — a semester course after Engineering I, not a second-year course | The second-year engineering course. | The second engineering course, focused on electronics and microcontrollers. |
| `divisions[2].departments[6].courses[11]` | Java Data Structures | UNSUPPORTED | "This semester course will be equivalent to a college level data structures course using Java to explore linked lists, stacks, queues, trees, sets, and priority queues." (post 1308) — no mention of Git or GitHub; the older record took that from a department page, not this course | Honors-level data structures in Java, taught using Git and GitHub. | Honors-level data structures in Java. |
| `divisions[2].departments[8].courses[3]` | Stagecraft II | MISSTATES | "Students may enroll in Stagecraft I or II as schedule allows. The courses cover independent topics and are not required in sequence." (post 2292) — not a second level | The second-level technical theatre course. | A technical theatre course covering different topics from Stagecraft I; the two need not be taken in order. |
| `divisions[2].departments[10].courses[0]` | Physical Education/Health | NARROWS | "they may have the remaining half credit waived by participating on or managing a CLS athletic team during any one season in Upper School, or by completing a dance role in an approved Upper School musical" (post 296) — drops the dance-role route | The Upper School physical education and health requirement; half is waivable via athletics. | The Upper School physical education and health requirement; half can be waived by playing on or managing a school team, or by a dance role in an approved musical. |

## All rows

<details>
<summary>All 145 rows</summary>

| Path | Title | Verdict | Evidence |
|---|---|---|---|
| `divisions[0].departments[0].courses[0]` | Structured Literacy | OK | "the six essential components of language: phonology, sound-symbol association, syllable instruction, morphology, syntax, and semantics" (Lower School post 5098, Structured Literacy Statement) |
| `divisions[0].departments[0].courses[1]` | Mathematics | OK | "builds mathematical understanding through a concrete-pictorial-abstract approach" (Lower School post 5099, Math Statement) |
| `divisions[0].departments[0].courses[2]` | Science | OK | "our young scientists explore inquiry-based investigations" (Lower School page, intro) |
| `divisions[0].departments[0].courses[3]` | History / Social Studies | OK | "our historians discover the story of our country and world from varied perspectives" (Lower School page, intro) |
| `divisions[0].departments[0].courses[4]` | STEAM | OK | "Our TK–2 STEAM program gives young learners the chance to explore Science, Technology, Engineering, Art, and Math" (Lower School page, Special Area Classes ## STEAM) |
| `divisions[0].departments[1].courses[0]` | Spanish | OK | "build their interpretive, interpersonal, and presentational communication skills ... comprehensible stories, songs, games, movement" (Lower School page, Special Area Classes ## Spanish) |
| `divisions[0].departments[2].courses[0]` | Music | OK | "Every student participates in music and art courses beginning in TK." (Lower School page, Special Area Classes ## The Arts) |
| `divisions[0].departments[2].courses[1]` | Art | OK | "Every student participates in music and art courses beginning in TK." (Lower School page, Special Area Classes ## The Arts) |
| `divisions[0].departments[2].courses[2]` | Band / Strings / Choir | MISSTATES | "Our Grade 5 students are able to choose and instrument and participate in Band or Strings. They also participate in Choir." (Lower School page, Special Area Classes ## The Arts) — the school says Grade 5 students also take part in Choir; "also available" makes it sound optional |
| `divisions[0].departments[2].courses[3]` | Physical Education | OK | "promotes lifelong wellness through exposure to team and individual sports, health education, and collaborative challenges" (Lower School page, ## physical education) |
| `divisions[0].departments[2].courses[4]` | Library | OK | "Beyond our 16,000-volume print collection, students have access to age-appropriate digital resources" (Lower School page, ## Library) |
| `divisions[1].departments[0].courses[0]` | English 6 | OK | "English 6 students practice skills that help them develop as public speakers and confident readers and writers." (Middle School page, ## English, Grade 6) |
| `divisions[1].departments[0].courses[1]` | English 7 | OK | "English 7 is designed to inspire a love of reading and help students develop into lifelong learners." (Middle School page, ## English, Grade 7) |
| `divisions[1].departments[0].courses[2]` | English 8 | OK | "In English 8, students develop as mature readers and confident writers." (Middle School page, ## English, Grade 8) |
| `divisions[1].departments[1].courses[0]` | History 6: Ancient World History & Culture | OK | "History 6 examines ancient civilizations found in the Middle East, Africa, China, India, and Europe, and makes connections to current events." (Middle School page, ## History, Grade 6) |
| `divisions[1].departments[1].courses[1]` | History 7: A More Perfect Union | OK | "Starting with English migrations and the transatlantic slave trade (1600s), and concluding with Reconstruction (1870)" (Middle School page, ## History, Grade 7) |
| `divisions[1].departments[1].courses[2]` | History 8 | OK | "post-Civil War era (1870) ... through the lens of five core ideals: equality, rights, liberty, opportunity, and democracy" (Middle School page, ## History, Grade 8) |
| `divisions[1].departments[2].courses[0]` | Math 6 | OK | "enhances students’ core math skills while strengthening their ability to think critically" (Middle School page, ## Math, Math 6) |
| `divisions[1].departments[2].courses[1]` | Pre-Algebra | OK | "This course builds a strong foundation for success in algebra" (Middle School page, ## Math, Pre-Algebra) |
| `divisions[1].departments[2].courses[2]` | Advanced Pre-Algebra | OK | "This course serves as a bridge between concrete and abstract mathematical thinking" (Middle School page, ## Math, Advanced Pre-Algebra) |
| `divisions[1].departments[2].courses[3]` | Algebra IA | OK | "Algebra IA is the first year of a two-year sequence" (Middle School page, ## Math, Algebra IA) |
| `divisions[1].departments[2].courses[4]` | Algebra I | OK | "a full-year Algebra 1 course designed to develop both foundational skills and deep conceptual understanding" (Middle School page, ## Math, Algebra I) |
| `divisions[1].departments[2].courses[5]` | Advanced Algebra | OK | "designed for students seeking an advanced and challenging mathematical experience" (Middle School page, ## Math, Advanced Algebra) |
| `divisions[1].departments[3].courses[0]` | Science 6 | OK | "Sixth-grade science explores how the world is organized ... The Living World and The Non-Living World" (Middle School page, ## Science, Grade 6) |
| `divisions[1].departments[3].courses[1]` | Science 7 | OK | "takes an integrated approach, focusing on lab skills, introductory chemistry, and human biology" (Middle School page, ## Science, Grade 7) |
| `divisions[1].departments[3].courses[2]` | Science 8 | OK | "uses the geologic timeline to explore space, geology, natural selection and evolution, and environmental science" (Middle School page, ## Science, Grade 8) |
| `divisions[1].departments[4].courses[0]` | Latin 7 | OK | "Are you ready to travel back in time? This course will introduce students to a \"dead\" language" (Middle School page, ## World Languages, Latin 7) |
| `divisions[1].departments[4].courses[1]` | Latin I | OK | NOTE: the Middle School page does not itself say this is the Upper School credit (the record cites the school profile); its text matches the Upper School Latin I post 185 almost word for word: "introduces students to elementary Latin vocabulary and grammar" (Middle School page, ## World Languages, Latin I) |
| `divisions[1].departments[4].courses[2]` | French 6 | OK | "French 6 seeks to awaken in students a curiosity about the language and cultures of the French-speaking world" (Middle School page, ## World Languages, French 6) |
| `divisions[1].departments[4].courses[3]` | French 7 | OK | "students reinforce and expand upon skills learned in French 6" (Middle School page, ## World Languages, French 7) |
| `divisions[1].departments[4].courses[4]` | French I (MS) | OK | NOTE: Upper School credit status is from the record, not this page. "French I is designed to provide the student with the language structures essential" (Middle School page, ## World Languages, French I (MS)) |
| `divisions[1].departments[4].courses[5]` | Spanish 6 | OK | "Spanish 6 expands upon skills acquired in Lower School classes" (Middle School page, ## World Languages, Spanish 6) |
| `divisions[1].departments[4].courses[6]` | Spanish 7 | OK | "Spanish 7 expands upon skills acquired in Lower School classes" (Middle School page, ## World Languages, Spanish 7) |
| `divisions[1].departments[4].courses[7]` | Spanish I (MS) | OK | NOTE: Upper School credit status is from the record, not this page. "Spanish I (MS) is designed to provide the student with a solid foundation" (Middle School page, ## World Languages, Spanish I (MS)) |
| `divisions[1].departments[5].courses[0]` | Art / Band / Concert Choir / Strings | SITE-WRITTEN-OK | NOTE: the Grade 6 list also holds Engineering (its own row). "Grade 6 - Art - Band - Concert Choir - Engineering - Strings" — titles only, no descriptions (Middle School page, ## Electives) |
| `divisions[1].departments[5].courses[1]` | Engineering | UNSUPPORTED | The page lists Engineering as a title only, under Grade 6, Grade 7 and Grade 8 (Middle School page, ## Electives); the only Fab Lab line is the general STEAM highlight: "They gain hands-on experience using cutting-edge tools in Latin’s Fab Lab" (Middle School page, Program Highlights, STEAM) — nothing ties the Engineering elective to the Fab Lab |
| `divisions[1].departments[5].courses[2]` | Computer Programming | SITE-WRITTEN-OK | "Grade 7 ... Computer Programming" and "Grade 8 ... Computer Programming", absent from Grade 6 — title only (Middle School page, ## Electives) |
| `divisions[1].departments[5].courses[3]` | Drama | SITE-WRITTEN-OK | "Grade 7 ... Drama" and "Grade 8 ... Drama", absent from Grade 6 — title only (Middle School page, ## Electives) |
| `divisions[1].departments[5].courses[4]` | Leadership Lab | SITE-WRITTEN-OK | "Grade 7 ... Leadership Lab" and "Grade 8 ... Leadership Lab", absent from Grade 6 — title only (Middle School page, ## Electives) |
| `divisions[1].departments[5].courses[5]` | Speech and Debate | UNSUPPORTED | Title only under Grades 7 and 8 (Middle School page, ## Electives); no text in the source calls the program "nationally ranked" (Upper School page: "Whether delivering arguments in a competitive setting ..."). The on-ramp is supported: Advanced Debate prerequisite "Introduction to Speech and Debate, middle school coursework, or tournament experience" (post 273) |
| `divisions[2].departments[0].courses[0]` | World Literature | OK | "[Required of all freshmen.] ... introduces students to literature as an expression of cultural tradition and identity by exploring works from the world canon" (post 202) |
| `divisions[2].departments[0].courses[1]` | Composition | OK | NOTE: the course also covers reading, literary and rhetorical analysis. "[Required of all sophomores.] ... composing argumentative essays ... grammar practice" (post 203) |
| `divisions[2].departments[0].courses[2]` | American Literature | OK | "[Open to juniors per departmental guidelines and placement.] This survey course presents students with a chronological survey" (post 204) |
| `divisions[2].departments[0].courses[3]` | American Literature (Honors) | UNSUPPORTED | "Honors American Literature is a chronological survey course ... a rigorous study of challenging literature involving intensive practice in critical reading, literary analysis, and research" (post 205) — the post gives no pace, and it is one course, not a sequence |
| `divisions[2].departments[0].courses[4]` | English 12 AP: Literature and Composition | OK | "[Open to seniors per departmental guidelines and placement.] ... Students must demonstrate college-level mastery" (post 207) |
| `divisions[2].departments[0].courses[5]` | Literature of War — Stories, Secrets, and Survival | UNSUPPORTED | Post 4738 has no grade or semester line (its siblings 3713, 213, 3715 carry "[Semester course open primarily to seniors.]"): "This class explores the literary response to 20th-century conflicts" (post 4738) |
| `divisions[2].departments[0].courses[6]` | Horror & The Other in Western Literature | NARROWS | "[Semester course open primarily to seniors.]" (post 3713) — "senior" drops "primarily"; content matches: "the horror canon’s evolution ... our preoccupation with the Other" |
| `divisions[2].departments[0].courses[7]` | From Book To Box Office | UNSUPPORTED | Post 4735 has no grade or semester line: "You’ll dive into short stories and novels, and their film adaptations" (post 4735) |
| `divisions[2].departments[0].courses[8]` | Shakespeare and the Human Condition | NARROWS | "[Semester course open primarily to seniors.]" (post 213) — "senior" drops "primarily"; content matches: "his plays touch on the abiding themes of the human condition" |
| `divisions[2].departments[0].courses[9]` | Exploring Imaginary Worlds in Fantasy Literature | UNSUPPORTED | Post 4736 has no grade or semester line: "the differences between primary and secondary world fantasy" (post 4736) |
| `divisions[2].departments[0].courses[10]` | Early British Literature — Heroes, Myths, & Monsters | UNSUPPORTED | Post 4737 has no grade or semester line: "You will study three early masterpieces, starting with the Old English story of Beowulf" (post 4737) |
| `divisions[2].departments[0].courses[11]` | Visions of the Future | NARROWS | "[Semester course open primarily to seniors.]" (post 3715) — "senior" drops "primarily"; NOTE content is dystopian fiction: "the gripping worlds of dystopian fiction, from classics like 1984 and Brave New World" |
| `divisions[2].departments[1].courses[0]` | World History I | OK | "[Required of all freshmen.] ... World History I, a broad survey course, provides students in grade 9" (post 216) |
| `divisions[2].departments[1].courses[1]` | World History II | OK | "[Required of all sophomores.] The World History II course is the completion of the World History curriculum" (post 217) |
| `divisions[2].departments[1].courses[2]` | United States History | OK | NOTE: post says required after World History (grades 9–10), not "junior" outright. "This course, Honors American Studies, or US History AP is required after completion of the World History curriculum." (post 218) |
| `divisions[2].departments[1].courses[3]` | United States History (AP) | OK | "The course provides preparation for intermediate and advanced college courses." (post 220) |
| `divisions[2].departments[1].courses[4]` | European History (AP) | OK | "The Advanced Placement course in European History traces ... European history from 1300 to 2000" (post 221) |
| `divisions[2].departments[1].courses[5]` | United States Government and Politics (AP) | OK | "This yearlong course is equivalent to a college introductory course in American government and politics." (post 222) |
| `divisions[2].departments[1].courses[6]` | Comparative Government and Politics (AP) | OK | "AP Comparative Government and Politics introduces students to the rich diversity of political life outside the United States." (post 223) |
| `divisions[2].departments[1].courses[7]` | Honors American Studies | OK | NOTE: the profile claim is not in this file, and the post does not contradict it. "intentionally designed to replicate the structure of a college-level history seminar" (post 219) |
| `divisions[2].departments[1].courses[8]` | History of Music Seminar | MISSTATES | "[Semester seminar open to seniors and juniors, and also to sophomores who are placed in and take the course at the honors level ...]" (post 2288); "All seminars have an honors option ... Students who register for honors but fail ... will be moved to a standard designation" (post 4734); "explores the various ways that music has influenced and even helped chart the course of history" (post 2288) — a seminar with an honors option, not an honors course |
| `divisions[2].departments[1].courses[9]` | Strangers in a Common Land: Global Immigration and Migration | MISSTATES | "This semester seminar links the human experiences of immigration and migration to current political and cultural systems" (post 2287); "All seminars have an honors option" (post 4734); "Students taking the course at the honors level will produce an 8-10 page capstone paper" (post 2287) — a seminar with an honors option, not an honors course |
| `divisions[2].departments[2].courses[0]` | Economics (AP) | OK | "This is a yearlong course covering both microeconomics and macroeconomics." (post 227) |
| `divisions[2].departments[2].courses[1]` | Psychology (AP) | OK | "It is the equivalent of an introductory college course in psychology" (post 228) |
| `divisions[2].departments[2].courses[2]` | Philosophy: The Love of Wisdom | OK | "this yearlong honors Humanities course is a survey of human thought through time" (post 2285) |
| `divisions[2].departments[2].courses[3]` | Defining Moments: The Civil Rights Movement | OK | "This semester seminar is dedicated to an understanding of the modern Civil Rights Movement." (post 4739) |
| `divisions[2].departments[3].courses[0]` | Algebra I | OK | "Algebra I is a review of pre-algebra skills and includes the study of various topics in algebra" (post 230) |
| `divisions[2].departments[3].courses[1]` | Algebra IB | OK | NOTE: the post says what it is — "Algebra IB includes the second half of the traditional Algebra I course with additional time for review topics" (post 231) |
| `divisions[2].departments[3].courses[2]` | Geometry | OK | "Geometry provides a thorough introduction to classical Euclidean geometry" (post 232) |
| `divisions[2].departments[3].courses[3]` | Geometry (Honors) | UNSUPPORTED | "Honors Geometry covers the topics of geometry in greater depth with more rigor, and includes additional topics from logic, symbolic logic, and transformational geometry." (post 233) — depth and rigor, no pace |
| `divisions[2].departments[3].courses[4]` | Algebra II/Trigonometry | OK | "Algebra II/Trig is a continuation and extension of the skills and concepts developed in Algebra I ... an introduction to trigonometry" (post 234) |
| `divisions[2].departments[3].courses[5]` | Algebra II/Trigonometry (Honors) | OK | "includes many of the same topics as Algebra II/Trig but at a deeper level and quicker pace" (post 235) |
| `divisions[2].departments[3].courses[6]` | Advanced Functions and Trigonometry | OK | "further study of advanced algebraic concepts and topics including equations and inequalities, function analysis, trigonometry" (post 236) |
| `divisions[2].departments[3].courses[7]` | Pre-Calculus | OK | "This course is designed for students who have completed Advanced Functions and Trigonometry or Algebra II/Trig (Honors)" (post 237) |
| `divisions[2].departments[3].courses[8]` | Pre-Calculus (Honors) | UNSUPPORTED | "Pre-Calculus Honors, designed for students with very strong mathematical ability, is a thorough preparation for college level mathematics courses" (post 238) — no pace is given |
| `divisions[2].departments[3].courses[9]` | Calculus | OK | "Students in this course will not take the AP Calculus exam." (post 239) |
| `divisions[2].departments[3].courses[10]` | Mathematics of Social Choice and Management Science | OK | "[Honors semester course open to qualified students.] This course covers topics from the Voting and Graph Theory branches of mathematics." (post 240) |
| `divisions[2].departments[3].courses[11]` | Introduction to Probability and Statistics | OK | "[Honors fall semester course ...] This course covers introductory topics of probability and statistics." (post 241) |
| `divisions[2].departments[3].courses[12]` | Data Analytics: How Do They Know? | OK | "[Honors spring semester course ...] ... use both statistics and computer science to explore the mathematical and programming aspects of data analytics" (post 3716) |
| `divisions[2].departments[3].courses[13]` | Statistics (AP) | OK | "introduces students to the major concepts and tools for collecting, analyzing, and drawing conclusions from data ... Students must take the AP exam" (post 242) |
| `divisions[2].departments[3].courses[14]` | Calculus (AP-AB) | OK | "AP Calculus (AB) is equivalent to most first year college calculus courses" (post 243) |
| `divisions[2].departments[3].courses[15]` | Calculus (AP-BC) | OK | "AP Calculus (BC) contains all of the topics of AB Calculus and also includes sequences, series" (post 244) |
| `divisions[2].departments[4].courses[0]` | Conceptual Physics | OK | "[Open to freshmen and students who do not have a physics credit.] This course covers the basic principles and theories of physics" (post 246) |
| `divisions[2].departments[4].courses[1]` | Advanced Conceptual Physics | OK | "the fundamental principles and theories of physics ... at a more accelerated pace" (post 247) |
| `divisions[2].departments[4].courses[2]` | Chemistry | OK | "[Open to sophomores.] ... an interactive experiential treatment of basic chemical principles" (post 248) |
| `divisions[2].departments[4].courses[3]` | Chemistry (Honors) | OK | "The Honors Chemistry course is fast-paced and rigorous" (post 249) |
| `divisions[2].departments[4].courses[4]` | Chemistry II (AP) | MISSTATES | "This course is designed to be the equivalent of the general chemistry course taken during the first year of college." (post 250). "College-level second-year chemistry" reads as second-year college chemistry; it is second-year high-school chemistry at first-year college level. |
| `divisions[2].departments[4].courses[5]` | Biology | OK | "[Open to juniors.] This course covers the full spectrum of life science" (post 251) |
| `divisions[2].departments[4].courses[6]` | Biology (Honors) | OK | "The Honors Biology course is fast-paced and rigorous" (post 252) |
| `divisions[2].departments[4].courses[7]` | Biology (AP) | OK | "This course has the same objectives as a general biology course at the college level." (post 253) |
| `divisions[2].departments[4].courses[8]` | Environmental Science (AP) | OK | "This yearlong lab science course is designed to be the equivalent of an introductory college course." (post 254) |
| `divisions[2].departments[4].courses[9]` | Physics (Honors) | OK | "[Open to seniors ...] students will explore new topics in physics, not introduced in earlier courses" (post 255) |
| `divisions[2].departments[4].courses[10]` | Physics C (Mechanics) (AP) | OK | "prepares students for the C level Advanced Placement Examination in Mechanics ... Corequisite: Calculus." (post 256) |
| `divisions[2].departments[4].courses[11]` | Physics C (Mechanics and E&M) (AP) | OK | "the C level Advanced Placement Examinations in Mechanics as well as in Electricity and Magnetism ... Corequisite: AP Calculus BC." (post 1304) |
| `divisions[2].departments[4].courses[12]` | Astronomy | OK | "This semester course will provide an in-depth introduction to our current scientific view of the universe." (post 4740) |
| `divisions[2].departments[4].courses[13]` | Genetics | OK | "This semester course provides an overview of molecular genetics, mechanisms of heredity, and gene expression." (post 259) |
| `divisions[2].departments[4].courses[14]` | Human Anatomy and Physiology | OK | "This semester course covers human anatomy and the physiology of the major organ systems" (post 260) |
| `divisions[2].departments[4].courses[15]` | Science of Medicine | OK | "explores the basics of anatomy ... physiology ... and pathology ... the biology behind different diseases" (post 1877) |
| `divisions[2].departments[5].courses[0]` | French I–V | OK | Posts exist for French I (175), II (176), III (177), IV (179) and V (4741): "The emphasis in this course for fifth year students" (post 4741) |
| `divisions[2].departments[5].courses[1]` | French III/IV Honors | OK | "French III Honors is an in-depth, fast-paced course" (post 178); "In this advanced language course" (French IV (Honors), post 180) |
| `divisions[2].departments[5].courses[2]` | French Language & Culture (AP) | OK | "In preparation for the required AP Language and Culture Examination" (post 182) |
| `divisions[2].departments[5].courses[3]` | Spanish I, 1B, II, III, IV, V | OK | "Spanish V: Contemporary Issues of the Hispanic World" [Fall semester only.] (post 197) and "Spanish V: Composition and Conversation" [Spring semester only.] (post 198); Spanish I, 1B, II, III, IV posts 191, 1303, 192, 193, 195 |
| `divisions[2].departments[5].courses[4]` | Spanish III/IV Honors | OK | "Spanish III Honors is an in-depth, fast-paced course" (post 194); "In this advanced language course" (Spanish IV (Honors), post 196) |
| `divisions[2].departments[5].courses[5]` | Spanish Language and Culture (AP) | OK | "In preparation for the required AP Language Examination" (post 199) |
| `divisions[2].departments[5].courses[6]` | Spanish Literature and Culture (AP) | OK | "The AP Spanish Literature and Culture course uses a thematic approach to introduce students to representative texts" (post 200) |
| `divisions[2].departments[5].courses[7]` | Latin I–V | OK | NOTE: levels IV and V exist only as Latin IV (Honors) (post 189) and Latin V (AP) (post 190); posts 185, 186, 187 cover Latin I–III. Still five levels. |
| `divisions[2].departments[5].courses[8]` | Latin III Honors / Latin IV (Honors) | OK | "This course is designed for students whose demonstrated mastery of fundamentals indicates a readiness for authentic literature" (post 188); Latin IV (Honors) (post 189) |
| `divisions[2].departments[5].courses[9]` | Latin V (AP) | OK | "This course prepares students for the Advanced Placement Latin Examination." (post 190) |
| `divisions[2].departments[5].courses[10]` | Greek III (Honors) | OK | "Greek cannot fulfill the classical/modern language graduation requirement but is taken instead as a second language course." (post 4746) |
| `divisions[2].departments[5].courses[11]` | Greek IV (Honors) | OK | "Emphasis in this course is placed upon accurate translation ... English to Greek composition" (Greek IV (Honors), post 1875) |
| `divisions[2].departments[6].courses[0]` | Engineering I | OK | NOTE: tag "Year" is wrong (see notes). "[Semester elective ...] This semester course is a first course in engineering." (post 262) |
| `divisions[2].departments[6].courses[1]` | Engineering II | MISSTATES | "[Semester elective open to all Upper School students.] Students continue to learn about the engineering method as the class focuses on electronics and microcontrollers ... Prerequisite: Engineering I or similar coursework/experience" (post 263) — a semester course after Engineering I, not a second-year course |
| `divisions[2].departments[6].courses[2]` | Introduction to Civil Engineering | OK | "Students learn the fundamentals of civil engineering in an engaging and rigorous lab setting" (post 3717) |
| `divisions[2].departments[6].courses[3]` | Engineering in Motion: How to Make Things Move | OK | "Students learn the fundamentals of making things move, exploring different forms of motion in engineering" (post 4747) |
| `divisions[2].departments[6].courses[4]` | Advanced Topics in Engineering | OK | "[Open to seniors.] This yearlong course ... introduces students to the software, methods, and hardware frequently used in college engineering programs" (post 266) |
| `divisions[2].departments[6].courses[5]` | Entrepreneurship and Global Marketplace Leadership | OK | "This semester course provides a multi-disciplinary approach to creative problem solving ... to develop a business plan" (post 267) |
| `divisions[2].departments[6].courses[6]` | Digital Design and Web Development | OK | "students explore digital art creation ... hands-on website creation with HTML, CSS, and JavaScript" (post 268) |
| `divisions[2].departments[6].courses[7]` | Cybersecurity 1: Networking Fundamentals (AP) | OK | "The AP Networking Fundamentals course introduces key concepts of networking including principles, hardware, software, and security." (post 4742) |
| `divisions[2].departments[6].courses[8]` | Computer Science Principles (AP) | OK | "This yearlong course offers a comprehensive introduction to the fundamental concepts of computer science." (post 1305) |
| `divisions[2].departments[6].courses[9]` | Computer Science A (AP) | OK | "introduces students to computer science through programming in Java. The course focuses on object-oriented design." (post 270) |
| `divisions[2].departments[6].courses[10]` | App Design/Game Design | OK | "This project-based semester course will introduce students to designing apps and games" (post 1307) |
| `divisions[2].departments[6].courses[11]` | Java Data Structures | UNSUPPORTED | "This semester course will be equivalent to a college level data structures course using Java to explore linked lists, stacks, queues, trees, sets, and priority queues." (post 1308) — no mention of Git or GitHub; the older record took that from a department page, not this course |
| `divisions[2].departments[7].courses[0]` | Introduction to Speech and Debate | OK | "Students who are in their first year of speech and debate competition may enroll in this yearlong elective course." (post 272) |
| `divisions[2].departments[7].courses[1]` | Advanced Debate | OK | "The course provides intensive tournament preparation for students continuing their participation in Policy, Lincoln-Douglas, Public Forum, or Congressional Debate" (post 273) |
| `divisions[2].departments[7].courses[2]` | Advanced Speech | OK | "The course provides intensive tournament preparation for students continuing their participation in Extemporaneous Speaking, Original Oratory" (post 274) |
| `divisions[2].departments[7].courses[3]` | Communications and Twenty-First Century Journalism | OK | "instruction and practice in many elements of twenty-first century journalism" (post 276) |
| `divisions[2].departments[7].courses[4]` | Leadership and Social Responsibility | OK | "This course examines leadership through the lens of social responsibility" (post 4389) |
| `divisions[2].departments[7].courses[5]` | Leadership for the Twenty-First Century | OK | "This course explores the complexities and challenges of leadership." (post 275) |
| `divisions[2].departments[7].courses[6]` | Yearbook | OK | "Students use these skills to produce the school annual, the Eyry." (post 277) |
| `divisions[2].departments[7].courses[7]` | Student Internship Program | OK | NOTE: the internship is on campus and student-designed. "Pass/fail credit for internships is awarded based on hours completed" (post 278) |
| `divisions[2].departments[8].courses[0]` | Acting | OK | NOTE: the post says it is "Open to both beginning and advanced students" and can be repeated. "Students in this semester course will rehearse a short play" (post 2290) |
| `divisions[2].departments[8].courses[1]` | Film Acting | OK | "In this semester course, students will learn the basics of acting for the camera" (post 3719) |
| `divisions[2].departments[8].courses[2]` | Stagecraft I | OK | NOTE: one post covers Stagecraft I and II. "This semester course is an introductory, hands-on exploration of all elements of behind-the-scenes stagecraft." (post 2292) |
| `divisions[2].departments[8].courses[3]` | Stagecraft II | MISSTATES | "Students may enroll in Stagecraft I or II as schedule allows. The courses cover independent topics and are not required in sequence." (post 2292) — not a second level |
| `divisions[2].departments[8].courses[4]` | Advanced Design | OK | "In this advanced design course, students explore all elements of scenic, lighting and audio design" (post 2294) |
| `divisions[2].departments[8].courses[5]` | After-School Theater and Stagecraft | OK | "The Performing Arts Department offers an after-school drama and stagecraft course each semester." (post 653) |
| `divisions[2].departments[8].courses[6]` | Band | OK | "Band is a yearlong course open to all students with previous sequential study on a band instrument" (post 286) |
| `divisions[2].departments[8].courses[7]` | Concert Choir | OK | "Concert Choir is a yearlong course open to students seriously interested in pursuing the study of choral music." (post 287) |
| `divisions[2].departments[8].courses[8]` | Orchestra | OK | "Participation in Orchestra is open to all students with previous sequential study on violin, viola, cello, or bass" (post 288) |
| `divisions[2].departments[8].courses[9]` | Music Theory I | OK | "This yearlong course is for anyone who would like to know more about music. Music reading ability is not required." (post 289) |
| `divisions[2].departments[8].courses[10]` | Music Theory AP | OK | NOTE: post words it as preparation for college theory. "This yearlong course prepares serious students of music for college theory ... the Advanced Placement exam in Music Theory is required" (post 654) |
| `divisions[2].departments[9].courses[0]` | Art Studio I–IV | OK | "Art Studio I-IV are full-year courses." (post 290); posts 291, 292, 293, 294 |
| `divisions[2].departments[9].courses[1]` | Photography | OK | "students will be introduced to a wide variety of photographic genres" (post 4395) |
| `divisions[2].departments[10].courses[0]` | Physical Education/Health | NARROWS | "they may have the remaining half credit waived by participating on or managing a CLS athletic team during any one season in Upper School, or by completing a dance role in an approved Upper School musical" (post 296) — drops the dance-role route |
| `divisions[2].departments[10].courses[1]` | Introduction to Sports Medicine | OK | "This course, for which students earn one-half P.E. credit, is an introduction to sports medicine" (post 298) |

</details>

## Census subagent notes (reported at review; nothing here was changed)

The subagent's own notes, kept verbatim for the record. Teaser, `notPublished` and tag items are out of this plan's fix scope and are raised at the batch review.

### Census notes — Charlotte Latin School (`charlotte-latin`)

Source judged: `source-material/course-offerings/charlotte-latin/Charlotte Latin - Course Offerings - Curriculum Guide Full Descriptions 2026.md`
(fetched 2026-11-11). Upper School rows were each judged against their own S1 post. Middle School rows were judged against the Middle School page (S2), and Lower School rows against the Lower School page and its five statement posts (S3). All 145 rows read; no pre-filter list was used.

#### (a) Counts per verdict

| Verdict | Rows |
| --- | --- |
| OK | 122 |
| SITE-WRITTEN-OK | 4 |
| UNSUPPORTED | 10 |
| MISSTATES | 5 |
| NARROWS | 4 |
| NOT-ABOUT-COURSE | 0 |
| **Total** | **145** |

The 4 SITE-WRITTEN-OK rows are the Middle School elective rows whose titles the school lists without any description: the Grade 6 slate, Computer Programming, Drama and Leadership Lab.

Non-OK rows, grouped:

- **"Senior semester elective" on English electives (7 rows).**
  - Three posts say "[Semester course open primarily to seniors.]": Horror (3713), Shakespeare (213) and Visions of the Future (3715). The descriptions drop "primarily", so they are **NARROWS**.
  - Four posts carry no grade or semester line at all: Literature of War (4738), From Book To Box Office (4735), Fantasy (4736) and Early British (4737). For these, "senior semester" is **UNSUPPORTED**.
  - A human may want to check the live S1 page for a group heading the text conversion dropped.
- **"At honors pace and depth" with no pace in the post (3 rows, UNSUPPORTED).**
  - American Literature (Honors): post 205 says "rigorous", and it is one course, not a "sequence".
  - Geometry (Honors): post 233 says "greater depth with more rigor".
  - Pre-Calculus (Honors): post 238 says "very strong mathematical ability".
  - The other "pace" rows are supported and stay OK: Chemistry (H) and Biology (H) say "fast-paced and rigorous", Algebra II/Trig (H) says "quicker pace", and Advanced Conceptual Physics says "more accelerated pace".
- **History seminars called "honors" courses (2 rows, MISSTATES).**
  - History of Music Seminar and Strangers in a Common Land are semester seminars with an *honors option*.
  - Post 4734 says "All seminars have an honors option … Students who register for honors but fail … will be moved to a standard designation."
- **Stagecraft II, "second-level" (MISSTATES).** Post 2292 says "The courses cover independent topics and are not required in sequence."
- **Engineering II, "second-year" (MISSTATES).** Post 263 calls it a semester elective that follows Engineering I.
- **Java Data Structures, "taught using Git and GitHub" (UNSUPPORTED).**
  - Post 1308 does not mention Git or GitHub.
  - The phrase came from a department-level page in the older record (S9), so the description presents department framing as per-course copy (must-survive item 6).
- **Physical Education/Health, "half is waivable via athletics" (NARROWS).** Post 296 also allows "a dance role in an approved Upper School musical".
- **Lower School Band / Strings / Choir, "Choir also available" (MISSTATES).** The school says Grade 5 students "also participate in Choir", so it is not presented as optional.
- **Middle School Engineering, "anchored by the school's Fab Lab" (UNSUPPORTED).**
  - The elective is a bare title.
  - The only Fab Lab line is the general Middle School STEAM highlight.
- **Middle School Speech and Debate, "nationally ranked" (UNSUPPORTED).** Nothing in the source supports it.

#### (b) Teaser and `notPublished` notes the school's text now shows false or out of date (report only)

1. **Upper School `notPublished` is now false.**
   - It reads: "Charlotte Latin publishes Upper School course titles without per-course descriptions. The course titles are the school’s own; each description comes from how the school describes that department."
   - Every Upper School course has its own description post (element 31330, 136 posts: 122 course posts plus 14 department or intro posts).
   - The older record's "titles only" finding was a retrieval gap: the posts are click-to-open and are not in the page HTML.
   - The second sentence is also no longer a fair account of the source. The descriptions can now be checked against per-course text, and this census did that.
2. **Upper School teaser: "129 courses across 13 departments — 22 AP subjects, Greek as a second language, and an MIT-network Fab Lab."**
   - **129 courses:** not reproduced by the posts. There are **122 course posts**, and Stagecraft I and II share one post, so about 123 courses. The 129 came from the older record's count of S1 titles. Recount from the live S1 list before keeping it.
   - **13 departments:** consistent. The post tags give World Languages, English, History, Humanities/Social Sciences, Mathematics, Science, Innovation & Design, Communications & Global Leadership, Performing Arts: Drama, Performing Arts: Music, Visual Arts, Physical Education and Online Courses. Online Courses has a policy post (299) but no course titles.
   - **22 AP subjects:** this is the 2023-24 profile's own figure, and the posts do not restate it. The posts hold **23 AP-designated course posts**, not counting the "Advanced Placement History Courses" intro post 4733. Cybersecurity 1: Networking Fundamentals (AP), post 4742, is described as "a College Board pilot Career Kickstart course for 2025-2026", which postdates the profile. Economics (AP) leads to two AP exams. Treat 22 as a dated school claim; a freshness question, not a contradiction.
   - **Greek as a second language:** confirmed by post 4746: "Greek cannot fulfill the classical/modern language graduation requirement but is taken instead as a second language course."
   - **MIT-network Fab Lab:** not in this source, and not contradicted. It comes from the older record's S9.
3. **Middle School teaser: "22 courses with published descriptions across 5 departments".** The Middle School page now gives prose for **23** courses:
   - English 3
   - History 3
   - Math 6
   - Science 3
   - World Languages 8
   - The 23 app rows in those five departments all have text. Recount.
4. **Lower School `notPublished`.** "Charlotte Latin publishes Lower School subject areas, not named courses" is still true: the page gives grade highlights, special-area classes and five statement posts. The claim that `/academics/lower-school/curriculum` is an unpublished placeholder was not re-checked in this census.
5. **Greek III (Honors) description** credits the rule to "the school’s profile". The current course post (4746) now states the rule directly. This is not a finding; the attribution could later move to the post.

#### (c) Titles, tags or departments that look wrong (not changed in the TSV)

- **Engineering I and Engineering II, tag "Year":** both posts say "[Semester elective …]" (262, 263).
- **History of Music Seminar and Strangers in a Common Land, tag "Honors":** these are semester seminars with an honors option (post 4734). "Semester" fits better.
- **Four English electives with tag "Semester":** Literature of War, From Book To Box Office, Fantasy and Early British. Their posts state no semester (see (a)). The older record also tagged all seven English electives "Gr 12".
- **Defining Moments: The Civil Rights Movement:** the app lists it under Humanities & Social Sciences, but post 4739 is tagged **History** and is a History seminar (same bracket line as the other seminars).
- **Digital Design and Web Development:** the post title is longer, "Digital Design and Web Development: Integrating Art, Programming, and User Experience" (post 268). Check which form the S1 list uses.
- **Java Data Structures:** the post title is "Java Data Structures (Honors)" (post 1308). The app title has no level marker, and the tag carries it.
- **Latin I–V:** there are no standard Latin IV or V courses, only Latin IV (Honors) (189) and Latin V (AP) (190). The grouped title could imply standard IV and V levels. The description ("five-level") is still true.
- **Middle School electives:**
  - "Art / Band / Concert Choir / Strings" (tag Gr 6) and "Engineering" (tag Gr 6) are listed under Grades 6, 7 and 8 on the page.
  - The tag marks where they first appear, which matches the sibling rows' "Added to the elective slate in Grades 7 and 8" framing. Acceptable, but worth knowing.
- **Middle School math grade tags:** Pre-Algebra Gr 6–7 and Algebra IA / Algebra I Gr 8 are not stated on the Middle School page. They are not contradicted, just unverifiable from this source.
- **Upper School Algebra I, Algebra IB and others tagged "Year":** consistent with the posts. Spanish V is two semester courses (197 fall, 198 spring) inside a "Year"-tagged group row, which is fine for the group.

#### (d) Source reading issues

- The whole source file was read (1,989 lines). No part was unreadable.
- Post 240 (Mathematics of Social Choice) has its bracket line run into the body text with no line break. This is a conversion artifact only.
- Post 254 (AP Environmental Science) has a line break in the middle of a sentence ("Prior completion of a biology course is / strongly encouraged"). This is a conversion artifact only.
- The four English electives without a bracket line (4738, 4735, 4736, 4737) may have lost it in conversion, or the school may never have published one. A look at the live popup posts would settle the UNSUPPORTED verdicts on those four rows.
- The school profile (2023-24) that two descriptions cite (Honors American Studies, Greek III) is not in this file, so those attributions were judged only for consistency with the posts. Neither is contradicted.
- **Freshness:** post 4742 names the 2025-2026 school year. No other page carries a year.
