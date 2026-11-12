# Census — providence-day (plan `coursecensus`, Batch 1)

Every Course Offerings description for providence-day, checked against the school's own text in `source-material/course-offerings/providence-day/Providence Day - Course Offerings - Curriculum Guide Full Descriptions 2025-2026.md`. Verdicts are the plan's ("Decisions"). The table was drafted by a fresh census subagent; every non-OK row was then re-checked against the source by the implementer, and any change to the subagent's verdict is noted in the row.

## Verdicts

| Verdict | Rows |
|---|--:|
| OK | 193 |
| SITE-WRITTEN-OK | 9 |
| NOT-ABOUT-COURSE | 0 |
| MISSTATES | 0 |
| NARROWS | 9 |
| UNSUPPORTED | 2 |
| **Total** | **213** |

## Rows fixed

| Path | Title | Verdict | Evidence | Before | After |
|---|---|---|---|---|---|
| `divisions[0].departments[2].courses[8]` | Learning Loft | UNSUPPORTED | The school publishes only the title "Learning Loft" in its Special Area Classes list (S3, ### Special Area Classes; provenance: each tile "holds only its title"). Nothing in the school's text says it supports individualized learning. | A Lower School special area class supporting individualized learning. | A Lower School special area class; the school publishes only its name. |
| `divisions[1].departments[5].courses[2]` | Latin 2 | NARROWS | "Latin 2 (Grades 8-12 only) Year Requires successful completion of Latin I" (S2 p. 10); "Prerequisite: Successful completion of Latin 1, with a “B-” (80) or better." (S2 p. 19). "Open from Grade 8", beside Latin 1's "open from Grade 7", reads as a grade gate only. | The Upper School Latin II course, open from Grade 8. | The Upper School Latin II course, open from Grade 8 after Latin 1 with a “B-” (80) or better. |
| `divisions[1].departments[5].courses[6]` | German 1–3 | NARROWS | "German 1 Year / German 2, 3 Year Requires Prerequisite Approval" (S2 p. 10). The three sibling rows (Spanish, French, Mandarin) each state "levels 2+ require prerequisite approval"; dropping it here implies German has no such condition. | A three-level Middle School German sequence. | A three-level Middle School German sequence; levels 2+ require prerequisite approval. |
| `divisions[1].departments[6].courses[9]` | Acting 1, 2 & 3 | UNSUPPORTED | "Acting 1 ... builds on the basics introduced in Theater 6" (S2 p. 23); "Acting 2 - Acting Through the Ages ... Semester" (S2 p. 24); "Acting 3 - Production Practices [One Act Play] ... (Prerequisite: Prior Theatre Experience Required)" (S2 p. 24); Acting 2 is Spring, Acting 3 Fall (S2 p. 5). The school does not present them as a three-level sequence. | A three-level Middle School acting sequence. | Three semester acting courses for Grades 7 and 8; Acting 3 requires prior theatre experience. |
| `divisions[2].departments[0].courses[9]` | Modern Dramatic Literature | NARROWS | "The syllabus includes translated works, from Ibsen to Ionesco, that explore the loss of individualism, empathy, and meaningful communication." (S1 p. 21). Dropping "the loss of" turns the plays' theme into its opposite. | A survey of modern drama from Ibsen to Ionesco exploring individualism, empathy, and meaningful communication through reader’s theater. | A survey of modern drama from Ibsen to Ionesco exploring the loss of individualism, empathy, and meaningful communication through reader’s theater. |
| `divisions[2].departments[0].courses[10]` | Shakespeare | NARROWS | "a broad sampling of Shakespeare’s work, including The Merchant of Venice, Othello, The Tempest, Measure for Measure, and Richard III" (S1 p. 21). The description presents the five sample plays as the reading list. | Students study The Merchant of Venice, Othello, The Tempest, Measure for Measure, and Richard III, reading plays aloud and analyzing film versions. | Students study a broad sampling of plays, including The Merchant of Venice, Othello, The Tempest, Measure for Measure, and Richard III, reading them aloud and analyzing film versions. |
| `divisions[2].departments[0].courses[15]` | AP English Literature and Composition | NARROWS | "Regularly taught novels include Melville's Moby-Dick, Ellison’s Invisible Man, and Woolf’s Mrs. Dalloway. Other emphasized writers include Dickinson, Frost, and Shakespeare." (S1 p. 23). The school's "include" sample is shown as the course's texts. | Refines literary analysis via Moby-Dick, Invisible Man, and Mrs. Dalloway, plus Dickinson, Frost, and Shakespeare, with an outside-reading list. | Refines literary analysis through regularly taught novels such as Moby-Dick, Invisible Man, and Mrs. Dalloway, plus Dickinson, Frost, and Shakespeare, with an outside-reading list. |
| `divisions[2].departments[1].courses[18]` | Global Studies: Comparative Religions | NARROWS | "philosophies and religions such as Christianity, Judaism, Islam, Hinduism and Buddhism" (S1 p. 29). The school's "such as" sample is shown as the full list. | Enhances understanding of Christianity, Judaism, Islam, Hinduism, and Buddhism through primary and secondary readings and philosophical discussion. | Enhances understanding of religions such as Christianity, Judaism, Islam, Hinduism, and Buddhism through primary and secondary readings and philosophical discussion. |
| `divisions[2].departments[1].courses[19]` | Global Studies: Africa | NARROWS | "in-depth examinations of several countries including South Africa, the Democratic Republic of Congo, Rwanda, and Nigeria" (S1 p. 29). The school's "including" sample is shown as the full set. | A multi-disciplinary exploration of Sub-Saharan Africa with in-depth study of South Africa, the DRC, Rwanda, and Nigeria. | A multi-disciplinary exploration of Sub-Saharan Africa with in-depth study of several countries, including South Africa, the DRC, Rwanda, and Nigeria. |
| `divisions[2].departments[1].courses[20]` | Global Studies: Asia | NARROWS | "in-depth examinations of several countries including China and the Koreas" (S1 p. 30). The school's "including" sample is shown as the full set. | A multi-disciplinary exploration of Asia with in-depth examinations of China and the Koreas. | A multi-disciplinary exploration of Asia with in-depth examinations of several countries, including China and the Koreas. |
| `divisions[2].departments[6].courses[11]` | Latin 5 (Advanced) | NARROWS | "Familiar authors will include Vergil, Pliny, Catullus, and Ovid. Students will also encounter texts from authors ... such as Amerigo Vespucci, Giovanni Boccaccio, and Charles François Lhomond." (S1 p. 54). The sample authors are shown as the full span. | A prose and poetry literature course with a project-based comparative-texts component spanning Vergil, Pliny, Catullus, Ovid, Vespucci, and Boccaccio. | A prose and poetry literature course with a project-based comparative-texts component, reading authors such as Vergil, Pliny, Catullus, Ovid, Vespucci, and Boccaccio. |

## All rows

<details>
<summary>All 213 rows</summary>

| Path | Title | Verdict | Evidence |
|---|---|---|---|
| `divisions[0].departments[0].courses[0]` | Math | OK | "uses the concepts of Singapore Math ... emphasis on bar modeling in second through fifth grades" (S3, ### Math). NOTE: the school says Singapore Math runs "kindergarten through fifth grade"; the tag says TK–Gr 5 (see notes.md). |
| `divisions[0].departments[0].courses[1]` | Language Arts | OK | "begins in Transitional Kindergarten and is built on structured literacy principles ... phonological awareness, phonics, fluency, vocabulary, and comprehension" (S3, ### Language Arts) |
| `divisions[0].departments[0].courses[2]` | Science | OK | "inquiry-based methodology ... rely on their own reasoning, rather than seeking answers from teachers ... open-ended challenges" (S3, ### Science) |
| `divisions[0].departments[0].courses[3]` | Social Studies | OK | "Providence Day family, the Charlotte community, and the world ... TK Goes Global unit ... Each grade level has its own focus" (S3, ### Social Studies). NOTE: in the school's text TK Goes Global is the TK world-cultures unit, not the starting point "outward to Charlotte"; loose but not misleading. |
| `divisions[0].departments[1].courses[0]` | French, Spanish & Mandarin Exposure | OK | "Students at Providence Day are exposed to French, Spanish, and Mandarin Chinese beginning in TK." (S4 post 4491) |
| `divisions[0].departments[1].courses[1]` | Selected Language of Study | OK | "By second grade, students select one language of study for the remaining four years of Lower School." (S4 post 4491). NOTE: the "11-year journey toward language proficiency" quote comes from the academics page (S9) as recorded in the older record; it is not in the new file. |
| `divisions[0].departments[2].courses[0]` | Art | SITE-WRITTEN-OK | Special Area Classes list: "Art" (S3, ### Special Area Classes; tiles hold only titles) |
| `divisions[0].departments[2].courses[1]` | Music | SITE-WRITTEN-OK | Special Area Classes list: "Music" (S3, ### Special Area Classes) |
| `divisions[0].departments[2].courses[2]` | Band, Orchestra & Chorus | SITE-WRITTEN-OK | Special Area Classes list: "Band, Orchestra, Chorus" (S3, ### Special Area Classes) |
| `divisions[0].departments[2].courses[3]` | Theatre | SITE-WRITTEN-OK | Special Area Classes list: "Theatre" (S3, ### Special Area Classes) |
| `divisions[0].departments[2].courses[4]` | Physical Education | SITE-WRITTEN-OK | Special Area Classes list: "Physical Education" (S3, ### Special Area Classes) |
| `divisions[0].departments[2].courses[5]` | Science Lab | SITE-WRITTEN-OK | Special Area Classes list: "Science Lab" (S3, ### Special Area Classes) |
| `divisions[0].departments[2].courses[6]` | Tech Tank | SITE-WRITTEN-OK | Special Area Classes list: "Tech Tank" (S3, ### Special Area Classes) |
| `divisions[0].departments[2].courses[7]` | IDEAS | SITE-WRITTEN-OK | Special Area Classes list: "IDEAS" (S3); "IDEAS@PDS is a TK-12 initiative" (S2 p. 21) |
| `divisions[0].departments[2].courses[8]` | Learning Loft | UNSUPPORTED | The school publishes only the title "Learning Loft" in its Special Area Classes list (S3, ### Special Area Classes; provenance: each tile "holds only its title"). Nothing in the school's text says it supports individualized learning. |
| `divisions[0].departments[2].courses[9]` | Library | SITE-WRITTEN-OK | Special Area Classes list: "Library" (S3, ### Special Area Classes) |
| `divisions[1].departments[0].courses[0]` | English 6 | OK | "novels, poetry, short stories, and nonfiction ... vocabulary in context ... function and makeup of a paragraph" (S2 p. 10–11) |
| `divisions[1].departments[0].courses[1]` | English 7 | OK | "both written and verbal expression ... introduced to writing a thesis statement ... crafting a formal research paper" (S2 p. 15) |
| `divisions[1].departments[0].courses[2]` | English 8 | OK | "synthesize the skills ... introduced in English 6 and 7 ... write analytical essays on several genres" (S2 p. 15) |
| `divisions[1].departments[0].courses[3]` | Creative Writing 6 | OK | "write a personal narrative, a short story, and a variety of poems ... a community of writers" (S2 p. 12) |
| `divisions[1].departments[0].courses[4]` | World Myths and Legends | OK | "myths and legends from six different continents ... characters like King Arthur ... Loki, Mulan, Beowulf" (S2 p. 12–13) |
| `divisions[1].departments[0].courses[5]` | Lights, Camera, Action: Literature through Movies | OK | "a writing focused course which uses a variety of films ... tone, imagery, or symbolism" (S2 p. 16) |
| `divisions[1].departments[1].courses[0]` | Mathematics 6 | OK | "the seven elements ... number skills, measurement, geometry, patterns and functions, statistics and probability, logic and algebra" (S2 p. 11) |
| `divisions[1].departments[1].courses[1]` | Math 7 | OK | "continuous and recurring practice ... whole numbers, fractions, and decimals ... percent, ratios and proportions, powers and roots" (S2 p. 16) |
| `divisions[1].departments[1].courses[2]` | Pre-Algebra 7 – Accelerated | OK | "reinforces the basic mathematical concepts and serves as an introduction to Algebra ... number system, percents, linear equations and inequalities" (S2 p. 16). NOTE: "Department Recommendation Required for 7th Graders" is not mentioned; the description does not imply open entry. |
| `divisions[1].departments[1].courses[3]` | Advanced Pre-Algebra | OK | "extends the traditional Pre-Algebra curriculum ... rational number computation, solving equations and inequalities, linear functions, polynomials, and factoring" (S2 p. 16). NOTE: "Department Recommendation Required" not mentioned. |
| `divisions[1].departments[1].courses[4]` | Pre-Algebra 8 | OK | "Pre-Algebra, a traditional eighth grade course ... number system, percents, linear equations and inequalities" (S2 p. 16) |
| `divisions[1].departments[1].courses[5]` | Algebra I-8 Accelerated | OK | "a foundation for the entire sequence of Upper School mathematics courses ... linear and quadratic equations, systems of equations ... radicals" (S2 p. 16) |
| `divisions[1].departments[1].courses[6]` | Advanced Algebra I | OK | "similar to Algebra I Accelerated but puts more emphasis on proofs, applications ... strong emphasis on word problems" (S2 p. 17) |
| `divisions[1].departments[2].courses[0]` | Science 6 | OK | "first part of an integrated, inquiry-based approach ... properties of matter (basic chemistry) and organisms" (S2 p. 11) |
| `divisions[1].departments[2].courses[1]` | Science 7 | OK | "second part of an integrated, inquiry-based approach ... catastrophic events (weather, earthquakes, and volcanoes), and ... light and optics" (S2 p. 17) |
| `divisions[1].departments[2].courses[2]` | Science 8 | OK | "final part of an integrated, inquiry-based approach ... human body systems ... and electricity (energy and alternative resources.)" (S2 p. 17) |
| `divisions[1].departments[2].courses[3]` | The Amazing Human Body | OK | "main human body systems ... lab specimens, models, and microscopes, and general first aid, CPR" (S2 p. 13) |
| `divisions[1].departments[3].courses[0]` | History 6 | OK | "selected cultures of the ancient and medieval world ... note taking ... research ... map reading and cooperative learning" (S2 p. 11) |
| `divisions[1].departments[3].courses[1]` | U.S. History 7 | OK | "in-depth study ... formation and development of the United States ... from the Constitution to civil rights ... current events" (S2 p. 17) |
| `divisions[1].departments[3].courses[2]` | Global Perspectives 8 | OK | "examines countries, landforms, resources, climates, peoples, cultures, religions, and governmental systems ... global awareness" (S2 p. 18) |
| `divisions[1].departments[3].courses[3]` | History in Action: Collaborative Research | OK | "in-depth historical inquiry on a topic of their choosing ... website, documentary, exhibit, performance, or research paper" (S2 p. 18) |
| `divisions[1].departments[3].courses[4]` | Contemporary Global Issues | OK | "students investigate selected current events and issues from around the world in depth ... historical context" (S2 p. 18) |
| `divisions[1].departments[4].courses[0]` | Computer Applications | OK | "digital and media literacy skills ... the “SIFT” framework ... keyboarding skills ... basic websites with Google Sites" (S2 p. 14) |
| `divisions[1].departments[4].courses[1]` | Computer Programming | OK | "interactive programming using Scratch ... developed at The Massachusetts Institute of Technology ... animations ... narratives ... simple games" (S2 p. 14) |
| `divisions[1].departments[4].courses[2]` | Robotics | OK | "robot development and design using Lego Spike Prime robotic kits and a ... block-based programming language" (S2 p. 14) |
| `divisions[1].departments[4].courses[3]` | Web Design | OK | "create several HTML projects using a variety of publishing tools ... Prerequisite: Computer Applications" (S2 p. 14) |
| `divisions[1].departments[4].courses[4]` | Introduction to Engineering 6 | OK | "appeals to the budding scientist ... hands-on science experience ... the world of STEM" (S2 p. 14) |
| `divisions[1].departments[4].courses[5]` | SPARK: Environmental Problem Solving by Design | OK | "design thinking and engineering design processes ... environmental issues. Using the UN Sustainable Goals as a framework" (S2 p. 14). NOTE: the school writes "UN Sustainable Goals"; the app's "UN Sustainable Development Goals" is the full name of the same framework. |
| `divisions[1].departments[4].courses[6]` | Broadcast Media | OK | "experience with television production ... pre-production ... production stage ... post-production" (S2 p. 22) |
| `divisions[1].departments[4].courses[7]` | Social Entrepreneurship: Incubation & Acceleration | OK | "a series of interdisciplinary innovation and entrepreneurial sprints over the course of a semester" (S2 p. 22) |
| `divisions[1].departments[4].courses[8]` | Engineering the Future | OK | "labs and hands-on activities that promote the concepts of STEM ... benefits to the local and global community" (S2 p. 23) |
| `divisions[1].departments[4].courses[9]` | Introduction to Personal Finance | OK | "taxes, creating checking/savings accounts ... types of credit ... basic investing skills, insurance ... budgeting" (S2 p. 23) |
| `divisions[1].departments[5].courses[0]` | Exploring Latin through Mythology | OK | "This semester course is a whirlwind introduction to the language and mythology of ancient Rome" (S2 p. 13, 18) |
| `divisions[1].departments[5].courses[1]` | Latin 1 | OK | "Latin 1 (Grades 7-12 only) Year" (S2 p. 10); "Latin 1 ... No prerequisite (Year)" (S2 p. 19) |
| `divisions[1].departments[5].courses[2]` | Latin 2 | NARROWS | "Latin 2 (Grades 8-12 only) Year Requires successful completion of Latin I" (S2 p. 10); "Prerequisite: Successful completion of Latin 1, with a “B-” (80) or better." (S2 p. 19). "Open from Grade 8", beside Latin 1's "open from Grade 7", reads as a grade gate only. |
| `divisions[1].departments[5].courses[3]` | Spanish 1–4 | OK | "Spanish 1 Year / Spanish 2, 3, 4 Year Requires Prerequisite Approval" (S2 p. 10) |
| `divisions[1].departments[5].courses[4]` | French 1–4 | OK | "French 1 Year / French 2, 3, 4 Year Requires Prerequisite Approval" (S2 p. 10) |
| `divisions[1].departments[5].courses[5]` | Mandarin Chinese 1–4 | OK | "Mandarin Chinese 1 Year / Mandarin Chinese 2, 3, 4 Year Requires Prerequisite Approval" (S2 p. 10) |
| `divisions[1].departments[5].courses[6]` | German 1–3 | NARROWS | "German 1 Year / German 2, 3 Year Requires Prerequisite Approval" (S2 p. 10). The three sibling rows (Spanish, French, Mandarin) each state "levels 2+ require prerequisite approval"; dropping it here implies German has no such condition. |
| `divisions[1].departments[6].courses[0]` | Band 6 / Band 7–8 | OK | "Band 6 (Grade 6) – Year" (S2 p. 11); "Band (Grades 7/8) – Year" (S2 p. 23) |
| `divisions[1].departments[6].courses[1]` | Chorus 6 / Chorus 7–8 | OK | "Chorus 6 (Grade 6) – Year or Semester" (S2 p. 12); "Chorus (Grades 7/8) – Year or Semester" (S2 p. 23). NOTE: tag "Year" vs the school's "Year or Semester" (notes.md). |
| `divisions[1].departments[6].courses[2]` | Orchestra 6 / Orchestra 7–8 | OK | "Orchestra 6 (Grade 6) – Year" (S2 p. 12); "Orchestra (Grades 7/8) – Year" (S2 p. 23) |
| `divisions[1].departments[6].courses[3]` | Art 6 & Art Foundations | OK | "Art 6 – (Grade 6) Semester, may be taken for either a semester or full year" (S2 p. 12); "Art Foundations (Grades 7 & 8) - Semester" (S2 p. 24) |
| `divisions[1].departments[6].courses[4]` | Introduction to Art and Design | OK | "Major units of study include drawing, painting, clay hand building, and printmaking" (S2 p. 25). NOTE: "elements and principles of art and design" is not in this entry (it is US Visual Arts department wording); the prerequisite "Art Foundations" is not mentioned. |
| `divisions[1].departments[6].courses[5]` | Introduction to Painting | OK | "Introduction to Painting (Grades 7 & 8) (Prerequisite – Art Foundations) – Semester" (S2 p. 25) |
| `divisions[1].departments[6].courses[6]` | Introduction to Printmaking | OK | "Introduction to Printmaking (Grades 7 & 8) (Prerequisite – Art Foundations) – Semester" (S2 p. 25) |
| `divisions[1].departments[6].courses[7]` | Introduction to 3D Design | OK | "Introduction to 3D Design (Grades 7 & 8) ... Student-artists explore various three-dimensional art media" (S2 p. 25) |
| `divisions[1].departments[6].courses[8]` | Theatre Arts 6 | OK | "Theatre Arts (Grade 6) ... introduces students to the tools and skills needed for successful theatrical performances" (S2 p. 12) |
| `divisions[1].departments[6].courses[9]` | Acting 1, 2 & 3 | UNSUPPORTED | "Acting 1 ... builds on the basics introduced in Theater 6" (S2 p. 23); "Acting 2 - Acting Through the Ages ... Semester" (S2 p. 24); "Acting 3 - Production Practices [One Act Play] ... (Prerequisite: Prior Theatre Experience Required)" (S2 p. 24); Acting 2 is Spring, Acting 3 Fall (S2 p. 5). The school does not present them as a three-level sequence. |
| `divisions[1].departments[6].courses[10]` | Middle School Stagecraft | OK | "Stagecraft (Grades 7 & 8) – Semester ... stagecraft production for mainstage PDS shows" (S2 p. 24) |
| `divisions[1].departments[6].courses[11]` | Communication Arts | OK | "effective, confident communicators in a variety of situations, including public speaking" (S2 p. 12) |
| `divisions[1].departments[6].courses[12]` | Physical Education/Health 6, 7 & 8 | OK | "weekly fitness-based exercise ... a multitude of sports ... nutrition, and human development and sexuality" (S2 p. 11, 20–21) |
| `divisions[1].departments[6].courses[13]` | Movement & Yoga | OK | "introduction and exposure to dance, yoga, and mindfulness" (S2 p. 21); "Does not replace the 8th grade PE requirement." (S2 p. 9) |
| `divisions[2].departments[0].courses[0]` | English I | OK | "novels, short stories, and plays— including Macbeth and The House on Mango Street ... a research-based podcast project" (S1 p. 19) |
| `divisions[2].departments[0].courses[1]` | English II | OK | "intensive focus on writing skills ... American literature—including such works as The Great Gatsby and Their Eyes Were Watching God" (S1 p. 19) |
| `divisions[2].departments[0].courses[2]` | Writing Seminar | OK | "In this course for juniors, student writing constitutes the text ... more emphasis on style and voice" (S1 p. 19) |
| `divisions[2].departments[0].courses[3]` | Creative Writing | OK | "write original prose fiction and poetry in a workshop setting ... invent characters and plots" (S1 p. 20) |
| `divisions[2].departments[0].courses[4]` | New Media Storytelling | OK | "Media—from news articles to Instagram reels—is storytelling ... apply narrative methods to a variety of communication formats" (S1 p. 20) |
| `divisions[2].departments[0].courses[5]` | English Studies in Film: Philosophy in Film | OK | "excerpts from classical philosophical texts ... good and evil ... the self, existence, and reality" (S1 p. 20) |
| `divisions[2].departments[0].courses[6]` | Detective and Crime Fiction | OK | "detective and crime fiction ... from its early beginnings in the 1800s until present day ... short stories, dramatic works, novels ... film and TV" (S1 p. 20) |
| `divisions[2].departments[0].courses[7]` | Global Literature Topics | OK | "from Asia to the Caribbean, from Africa to Latin America ... a general common topic ... such as gender, magical realism, or justice" (S1 p. 21) |
| `divisions[2].departments[0].courses[8]` | Graphic Novels | OK | "Graphic novels--long-form comics ... design a multimedia work of literary analysis ... mimic elements of an actual comic-con" (S1 p. 21) |
| `divisions[2].departments[0].courses[9]` | Modern Dramatic Literature | NARROWS | "The syllabus includes translated works, from Ibsen to Ionesco, that explore the loss of individualism, empathy, and meaningful communication." (S1 p. 21). Dropping "the loss of" turns the plays' theme into its opposite. |
| `divisions[2].departments[0].courses[10]` | Shakespeare | NARROWS | "a broad sampling of Shakespeare’s work, including The Merchant of Venice, Othello, The Tempest, Measure for Measure, and Richard III" (S1 p. 21). The description presents the five sample plays as the reading list. |
| `divisions[2].departments[0].courses[11]` | War Literature | OK | "poetry, songs, plays, novels, as well as excerpts from non-fiction works spanning from the Thirty-Years War ... wars in Afghanistan and Iraq" (S1 p. 22) |
| `divisions[2].departments[0].courses[12]` | Latino American Literature | OK | "Latino American literature and cultures in the United States from 1960 to the present ... diaspora, border identities" (S1 p. 22) |
| `divisions[2].departments[0].courses[13]` | AP African American Studies | OK | "interdisciplinary course ... literature, the arts and humanities, political science, geography, and science ... experiences of African Americans" (S1 p. 22) |
| `divisions[2].departments[0].courses[14]` | AP English Language and Composition | OK | "college-level writing assignments in expository, analytical, and argumentative modes ... non-fiction genres ... rhetorical technique ... and logic" (S1 p. 22) |
| `divisions[2].departments[0].courses[15]` | AP English Literature and Composition | NARROWS | "Regularly taught novels include Melville's Moby-Dick, Ellison’s Invisible Man, and Woolf’s Mrs. Dalloway. Other emphasized writers include Dickinson, Frost, and Shakespeare." (S1 p. 23). The school's "include" sample is shown as the course's texts. |
| `divisions[2].departments[1].courses[0]` | Global Civics: Government Structures and Economic Systems | OK | "roles and responsibilities of citizens from local, state, national, and global perspectives ... how those American systems compare" (S1 p. 24) |
| `divisions[2].departments[1].courses[1]` | World History | OK | "fosters a greater appreciation for cultural diversity ... geographical & thematic development of events from 1000 CE to the Age of Globalization" (S1 p. 24) |
| `divisions[2].departments[1].courses[2]` | AP World History: Modern | OK | "Afro-Eurasian and American societies from 1200 CE to the present ... governance, innovation, culture ... interactions between humans and the environment" (S1 p. 24). NOTE: names four of the school's "six overall themes" without claiming all. |
| `divisions[2].departments[1].courses[3]` | United States History | OK | "general survey ... from the European encounter of the Americas to the present day ... role-playing simulations ... primary and secondary source" (S1 p. 25) |
| `divisions[2].departments[1].courses[4]` | AP United States History | OK | "a college-level course ... stressing the development of historical thinking skills ... causation, comparison, and continuity and change" (S1 p. 25) |
| `divisions[2].departments[1].courses[5]` | AP European History | OK | "major events and ideas of European history from the Renaissance to the present ... history as an interpretive discipline" (S1 p. 25) |
| `divisions[2].departments[1].courses[6]` | AP U.S. Government and Politics | OK | "critical perspective on government and politics ... Constitutional underpinnings ... political parties ... civil liberties ... civic engagement projects" (S1 p. 25–26) |
| `divisions[2].departments[1].courses[7]` | AP Human Geography | OK | "promote global literacy ... population, the political organization of space, agricultural and rural land use ... cities and urban land use" (S1 p. 26) |
| `divisions[2].departments[1].courses[8]` | AP Microeconomics | OK | "thorough understanding of the economic principles that relate to consumers and producers ... supply and demand models ... factor markets" (S1 p. 26) |
| `divisions[2].departments[1].courses[9]` | AP Macroeconomics | OK | "an economic system as a whole ... GDP, unemployment, and inflation ... aggregate demand and aggregate supply ... fiscal and monetary policy" (S1 p. 26) |
| `divisions[2].departments[1].courses[10]` | AP Psychology | OK | "research methods, neuroscience, development, sensation and perception, learning, memory, cognitive processes, personality, social psychology, and mental health" (S1 p. 27) |
| `divisions[2].departments[1].courses[11]` | Introduction to Psychology | OK | "a broad overview ... apply to their everyday lives ... psychological perspectives, research methods, personal identity ... positive psychology" (S1 p. 27) |
| `divisions[2].departments[1].courses[12]` | Comparative Government and Politics | OK | "governmental systems of the United Kingdom, Nigeria, China, Russia, Iran, and Mexico ... as case studies" (S1 p. 27) |
| `divisions[2].departments[1].courses[13]` | Herstory: Women in Global History | OK | "progression of gender roles through history ... history of women and gender around the world over the last 1500 years ... primary and secondary source" (S1 p. 27–28) |
| `divisions[2].departments[1].courses[14]` | Legal Issues | OK | "What does it mean to think like a lawyer? ... real court cases ... roles of both lawyer and judge" (S1 p. 28) |
| `divisions[2].departments[1].courses[15]` | Economics of Development | OK | "international trade, foreign exchange markets, foreign direct investment, and economic growth ... particularly in Latin American countries" (S1 p. 28) |
| `divisions[2].departments[1].courses[16]` | Global Studies: Genocide | OK | "foundations of the Universal Declaration of Human Rights ... past genocides and human rights violations ... through case studies" (S1 p. 28) |
| `divisions[2].departments[1].courses[17]` | Global Studies: Europe and Latin America | OK | "regional trends and cultures through a multi-disciplinary exploration of Europe and Latin America ... research-driven conclusions and policy recommendations" (S1 p. 29) |
| `divisions[2].departments[1].courses[18]` | Global Studies: Comparative Religions | NARROWS | "philosophies and religions such as Christianity, Judaism, Islam, Hinduism and Buddhism" (S1 p. 29). The school's "such as" sample is shown as the full list. |
| `divisions[2].departments[1].courses[19]` | Global Studies: Africa | NARROWS | "in-depth examinations of several countries including South Africa, the Democratic Republic of Congo, Rwanda, and Nigeria" (S1 p. 29). The school's "including" sample is shown as the full set. |
| `divisions[2].departments[1].courses[20]` | Global Studies: Asia | NARROWS | "in-depth examinations of several countries including China and the Koreas" (S1 p. 30). The school's "including" sample is shown as the full set. |
| `divisions[2].departments[1].courses[21]` | Global Studies: Middle East and North Africa | OK | "regional trends and cultures through a multi-disciplinary exploration of the Middle East and North Africa ... through a historical lens" (S1 p. 30) |
| `divisions[2].departments[1].courses[22]` | Global Leadership | OK | "more effective collaborators and leaders ... research project, collaborative projects, and an exit interview process ... Required for seniors in the Global Studies Diploma" (S1 p. 30) |
| `divisions[2].departments[2].courses[0]` | Algebra I | OK | "first-year course in Algebra ... integrate concepts studied in both algebra and physics ... data collection ... symbolic rules" (S1 p. 31) |
| `divisions[2].departments[2].courses[1]` | Geometry | OK | "points, lines, planes, triangles, polygons, circles, and geometric solids ... congruence, and similarity ... Geometry content required for ACT and SAT" (S1 p. 31–32) |
| `divisions[2].departments[2].courses[2]` | Geometry (Accelerated) | OK | "how mathematics can develop from a postulate system using deductive reasoning ... mathematical proof ... constructions ... coordinate geometry" (S1 p. 31) |
| `divisions[2].departments[2].courses[3]` | Geometry (Advanced) | OK | "rigorous treatment of topics and an in-depth development of direct and indirect proofs ... congruence ... similarity, circles ... triangle trigonometry" (S1 p. 31) |
| `divisions[2].departments[2].courses[4]` | Algebra II | OK | "thorough review of Algebra I ... polynomials, solving linear and quadratic equations, real and complex numbers, logarithms, graphing ... inequalities, and functions" (S1 p. 32) |
| `divisions[2].departments[2].courses[5]` | Algebra II/Trigonometry (Accelerated) | OK | "functions, graphing, rational exponents/expressions, polynomial expressions, systems of equations, sequences, series, logarithms, conic sections, trigonometry" (S1 p. 32) |
| `divisions[2].departments[2].courses[6]` | Algebra II/Trigonometry (Advanced) | OK | "linear, quadratic ... and trigonometric ... logic, set theory, and proof ... algebraic, graphical, numerical, and verbal" (S1 p. 32) |
| `divisions[2].departments[2].courses[7]` | Precalculus | OK | "will satisfy the four-year mathematics requirement ... introduction to trigonometry ... through the lens of personal finance ... a detailed personal budget" (S1 p. 32) |
| `divisions[2].departments[2].courses[8]` | Precalculus (Advanced) | OK | "trigonometry ... logarithmic and exponential functions, mathematical induction, conic sections, complex numbers, polar coordinates ... limits ... prepare students for a college-level calculus class" (S1 p. 33) |
| `divisions[2].departments[2].courses[9]` | Analysis (Advanced) | OK | "thorough analysis of polynomial, rational, exponential, and logarithmic functions ... vectors ... introduction into the theory of limits, first derivatives" (S1 p. 33) |
| `divisions[2].departments[2].courses[10]` | Statistics | OK | "data collection, experimental design, descriptive and inferential statistics, and probability ... statistical applets and Microsoft Excel" (S1 p. 33) |
| `divisions[2].departments[2].courses[11]` | Calculus (Advanced) | OK | "introduction to the concepts of differential calculus and the applications ... evaluate a limit ... differentiate and integrate" (S1 p. 33–34) |
| `divisions[2].departments[2].courses[12]` | AP Calculus AB | OK | "evaluate limits, to differentiate and to integrate various elementary functions ... graphing calculator as an integral part of the course" (S1 p. 34) |
| `divisions[2].departments[2].courses[13]` | AP Calculus BC | OK | "cover vector, polar and parametric equations and the calculus of infinite series" (S1 p. 34) |
| `divisions[2].departments[2].courses[14]` | AP Statistics | OK | "simulate probability distributions ... analyze the relationship between two or more variables through ... correlation and regression" (S1 p. 34) |
| `divisions[2].departments[2].courses[15]` | Calculus III (Advanced) | OK | "follows BC Calculus ... multivariable functions, vector-valued functions ... curvature, double and triple integrals, vector analysis" (S1 p. 34) |
| `divisions[2].departments[2].courses[16]` | Linear Algebra (Advanced) | OK | "three-dimensional space and n-dimensional space! Topics may include matrices ... determinants, simultaneous linear equations ... vector spaces ... rank and inverses, inner products" (S1 p. 35) |
| `divisions[2].departments[2].courses[17]` | Differential Equations (Advanced) | OK | "differential equations and their solutions, Laplace Transforms, linear and nonlinear systems, series methods, Fourier Series" (S1 p. 35) |
| `divisions[2].departments[3].courses[0]` | Physics I | OK | "a modeling-based physics course ... use algebra to express quantitative relationships ... motion, forces, energy, and electrostatics" (S1 p. 42) |
| `divisions[2].departments[3].courses[1]` | Physics I Accelerated | OK | "moves at a faster pace ... more mathematically rigorous than Physics I ... circular motion ... and waves" (S1 p. 42) |
| `divisions[2].departments[3].courses[2]` | Chemistry I | OK | "study of matter, its composition, periodicity, energy, and reactions ... develop models to explain the structure" (S1 p. 42) |
| `divisions[2].departments[3].courses[3]` | Chemistry I Accelerated | OK | "faster pace and investigates topics in more depth ... very highly recommended for any student who is considering AP sciences" (S1 p. 42) |
| `divisions[2].departments[3].courses[4]` | Biology I | OK | "This college preparatory course ... basic ecology, basic human anatomy and physiology, cell biology and evolution ... dissection" (S1 p. 43) |
| `divisions[2].departments[3].courses[5]` | Biology I Accelerated | OK | "differs significantly ... range and depth of topics covered, pace of instruction, and longer-term guided- independent laboratory work ... dissection" (S1 p. 43) |
| `divisions[2].departments[3].courses[6]` | Anatomy and Physiology | OK | "anatomy and physiology of the human body ... Pairs ... cat dissection throughout the entire semester ... portfolios" (S1 p. 43) |
| `divisions[2].departments[3].courses[7]` | Applied Sports Anatomy | OK | "musculoskeletal anatomy ... injury management ... 15 hours of service as student athletic trainers for the sports teams at PDS" (S1 p. 43) |
| `divisions[2].departments[3].courses[8]` | Astronomy | OK | "stars, galaxies, and our solar system ... composition, structure, and origins of the universe ... astrolabs and sun spots" (S1 p. 43–44) |
| `divisions[2].departments[3].courses[9]` | Bioethics/Biotechnology | OK | "lab and case-study based course ... micropipettes, PCR, DNA isolation ... gel electrophoresis ... genetically modified foods, transgenic organisms ... cloning" (S1 p. 44) |
| `divisions[2].departments[3].courses[10]` | Environmental Sustainability | OK | "multidisciplinary exploration ... urban planning, energy, water, and agriculture ... hands-on activities in Charger Gardens" (S1 p. 44) |
| `divisions[2].departments[3].courses[11]` | Forensic Science | OK | "fingerprint analysis and DNA profiling to bloodstain pattern interpretation ... labs, simulations, and case studies" (S1 p. 44) |
| `divisions[2].departments[3].courses[12]` | Microbiology | OK | "bacteria and viruses, identify bacteria in the environment ... global topics including (but not limited to) antibiotic resistance" (S1 p. 44) |
| `divisions[2].departments[3].courses[13]` | Neuroscience | OK | "cellular and molecular functioning of the nervous system ... record electrical activity from nerves and muscles ... in plants" (S1 p. 45) |
| `divisions[2].departments[3].courses[14]` | STEM Research and Design | OK | "pursue original scientific research ... choose their own research topic, design and conduct experiments, and present the results" (S1 p. 45) |
| `divisions[2].departments[3].courses[15]` | AP Biology | OK | "The College Board syllabus ... 4 Big Ideas: evolution, energetics, information storage and transmission, and systems interactions ... double class periods" (S1 p. 45) |
| `divisions[2].departments[3].courses[16]` | AP Chemistry | OK | "atomic theory, chemical kinetics, thermodynamics, and equilibrium ... double class period each day ... laboratory investigations" (S1 p. 45) |
| `divisions[2].departments[3].courses[17]` | AP Environmental Science | OK | "scientific principles ... analyze environmental problems both natural and human-made ... synthesize ideas from physics, chemistry, biology, geology" (S1 p. 45–46) |
| `divisions[2].departments[3].courses[18]` | AP Physics 1 | OK | "use algebra to study introductory college physics ... analyze data and develop models ... systems, fields, forces, conservation, and waves" (S1 p. 46). NOTE: the school frames the topics as "such as". |
| `divisions[2].departments[3].courses[19]` | AP Physics C | OK | "classical mechanics and electricity and magnetism ... Meeting two periods each day ... frequent laboratory activities" (S1 p. 46) |
| `divisions[2].departments[4].courses[0]` | Computer-Aided Design with 3D Printing | OK | "traditional mechanical drawing using a computer-aided design (CAD) software ... 3D printing ... isometric drawings and full three-dimensional modeling" (S1 p. 14) |
| `divisions[2].departments[4].courses[1]` | Computer Programming with Python | OK | "using the Python programming language ... variables, data types, iteration, flow of control ... graphical user interfaces, and event-driven programming" (S1 p. 14) |
| `divisions[2].departments[4].courses[2]` | Advanced Data Structures in Java | OK | "for students who have successfully completed APCS A ... data abstraction and encapsulation including stacks, queues, linked lists, binary trees ... hash maps" (S1 p. 14–15) |
| `divisions[2].departments[4].courses[3]` | Game Development with Unity and C# | OK | "the "Create with Code" curriculum ... video games using the C# programming language and the Unity game engine ... from scratch" (S1 p. 15) |
| `divisions[2].departments[4].courses[4]` | iOS Programming with Swift | OK | "Xcode and iOS SDK ... Swift programming language ... Cocoa Touch frameworks ... testing their apps on their own personal mobile devices" (S1 p. 15) |
| `divisions[2].departments[4].courses[5]` | Physical Computing | OK | "Arduinos and Raspberry Pis ... buttons, switches, low-cost sensors, displays, LEDs, motors, and wireless communication modules" (S1 p. 15) |
| `divisions[2].departments[4].courses[6]` | Robotics & Engineering | OK | "foundations of Robotics & Engineering, Global issues surrounding the field ... hands-on learning ... ethical uses of technologies" (S1 p. 15) |
| `divisions[2].departments[4].courses[7]` | AP Computer Science A | OK | "follows the College Board’s ... syllabus, learning to program in the Java language ... Java syntax and class structure ... object-oriented ... algorithms, and data structures" (S1 p. 16) |
| `divisions[2].departments[4].courses[8]` | AP Computer Science Principles | OK | "creative aspects of the computer science field ... computational tools ... large data sets to analyze, visualize, and draw conclusions from trends" (S1 p. 16) |
| `divisions[2].departments[5].courses[0]` | Broadcast Journalism | OK | "Adobe Premiere Pro ... feature stories, interviews, sports, podcasts, and film challenges" (S1 p. 17) |
| `divisions[2].departments[5].courses[1]` | Introduction to Financial Analytics | OK | "ranging from daily personal finance skills to ... the difference between fundamental and technical analysis techniques" (S1 p. 17) |
| `divisions[2].departments[5].courses[2]` | Architecture Design | OK | "principles and concepts of architectural design, and the use of Building Information Modeling (BIM) ... 3D CAD ... REVIT ... floor plans ... wall sections, and elevation" (S1 p. 17) |
| `divisions[2].departments[5].courses[3]` | Social Entrepreneurship | OK | "launch businesses that create social value ... rapidly develop and test ideas by gathering ... customer and marketplace feedback" (S1 p. 18) |
| `divisions[2].departments[5].courses[4]` | STEM Research and Design | OK | "pursue original scientific research ... present the results ... This course also will count as a Science credit." (S1 p. 18) |
| `divisions[2].departments[5].courses[5]` | Design & Entrepreneurship | OK | "cultivating the skills and practices of a design thinker ... a studio of designers ... an enterprise of entrepreneurs ... pressing issues" (S1 p. 18) |
| `divisions[2].departments[6].courses[0]` | French / German / Spanish I–V | OK | "Year 1 ... Novice High ... “My family”" (S1 p. 50); Year 4–5 "Intermediate Mid 2 ... telling stories"; Year 2 themes include "Health" (S1 p. 51) |
| `divisions[2].departments[6].courses[1]` | French / German / Spanish 6 | OK | "These advanced courses strive to promote and reinforce fluency and accuracy ... Intermediate High ... culture in both contemporary and historical contexts" (S1 p. 51) |
| `divisions[2].departments[6].courses[2]` | Spanish 7 Advanced: Conversation and Culture | OK | "strong conversational skills ... appreciation of Hispanic language and culture ... formal and colloquial language, meet native speakers" (S1 p. 52) |
| `divisions[2].departments[6].courses[3]` | French 7 Advanced: Francophone Culture through Literature | OK | "francophone novels and graphic novels ... Some of the novels we will study are: Oscar et la Dame Rose ... and Aya de Yopoungo" (S1 p. 52). NOTE: the app spells "Aya de Yopoungon"; the school prints "Yopoungo" (see notes.md). |
| `divisions[2].departments[6].courses[4]` | French 7 Advanced: Francophone Culture through Movies | OK | "francophone movies ... Some of the movies we will study are: Bienvenue Chez les Ch’tis and Mariam." (S1 p. 52) |
| `divisions[2].departments[6].courses[5]` | AP French Language | OK | "designed for Senior students ... AP French Language and Culture exam such as writing persuasive essays and timed guided conversations ... authentic sources" (S1 p. 53) |
| `divisions[2].departments[6].courses[6]` | AP Spanish Language | OK | "designed for Senior students ... prepare students for success on the AP Spanish Language Exam ... solely use Spanish in the classroom" (S1 p. 53) |
| `divisions[2].departments[6].courses[7]` | Latin 1 | OK | "familiarizes students with classical language acquisition ... historical context ... impact on the modern world ... daily life ... gods and heroes" (S1 p. 53–54) |
| `divisions[2].departments[6].courses[8]` | Latin 2 | OK | "read Latin stories set in the ancient metropolis of Rome ... grammar concepts ... feasting ... public bathing, piracy, gladiatorial combat, political unrest" (S1 p. 54) |
| `divisions[2].departments[6].courses[9]` | Latin 3 | OK | "review of previously learned grammar ... introduces the clauses ... unadapted Latin through the prose of Livy and Pliny, and the poetry of Catullus" (S1 p. 54) |
| `divisions[2].departments[6].courses[10]` | Latin 4 | OK | "a literature course exploring the poetry of Catullus, Ovid, and Vergil ... read Latin aloud to hear the meter ... literary devices" (S1 p. 54) |
| `divisions[2].departments[6].courses[11]` | Latin 5 (Advanced) | NARROWS | "Familiar authors will include Vergil, Pliny, Catullus, and Ovid. Students will also encounter texts from authors ... such as Amerigo Vespucci, Giovanni Boccaccio, and Charles François Lhomond." (S1 p. 54). The sample authors are shown as the full span. |
| `divisions[2].departments[6].courses[12]` | AP Latin | OK | "the material and skills required for success on the AP Latin Exam ... analyze text, recognize literary devices, and cite underlying themes" (S1 p. 55) |
| `divisions[2].departments[6].courses[13]` | Mandarin Chinese 1–5 | OK | "Mandarin Chinese 1 ... Novice Mid ... “Greetings,”" (S1 p. 55); "Mandarin Chinese 5 ... Intermediate Mid 1 ... "In the Restaurant,"" (S1 p. 56) |
| `divisions[2].departments[6].courses[14]` | Mandarin Chinese 6 (Advanced) | OK | "consolidating achievement ... Intermediate Mid 2 ... contemporary Chinese culture in educational, social, and technological contexts" (S1 p. 56–57) |
| `divisions[2].departments[6].courses[15]` | Mandarin Chinese 7 (Advanced) | OK | "Intermediate Mid 2 ... Topics include: “ Education,” “Festivals,” “Environmental Challenges,” and “Healthy Living.”" (S1 p. 57) |
| `divisions[2].departments[6].courses[16]` | AP Chinese Language and Culture | OK | "aural/oral skills, reading comprehension, grammar, and composition ... the five goal areas ... China’s role in issues of global importance" (S1 p. 57) |
| `divisions[2].departments[7].courses[0]` | Foundations of Art and Design | OK | "communicate visually by learning and making effective use of elements and principles of aesthetic design ... drawing, painting, and 3D Design" (S1 p. 47) |
| `divisions[2].departments[7].courses[1]` | Drawing | OK | "introduction to drawing as a primary means of visual investigation ... perspective, proportion, rendering, and expression ... various techniques and media" (S1 p. 47) |
| `divisions[2].departments[7].courses[2]` | Painting | OK | "strong foundation of painting concepts and techniques ... brush techniques, and basic color theory ... water-based as well as mixed media" (S1 p. 47) |
| `divisions[2].departments[7].courses[3]` | 3D Design | OK | "three-dimensional (3-D) elements and principles ... figurative or non-figurative sculpture, assemblage, ceramics, and installation pieces" (S1 p. 48) |
| `divisions[2].departments[7].courses[4]` | Photography | OK | "darkroom processes to produce prints from black-and-white film negatives ... color correction ... image manipulation using Adobe Photoshop" (S1 p. 48) |
| `divisions[2].departments[7].courses[5]` | Digital Media | OK | "print, video, and the web such as Adobe Photoshop, Indesign, Illustrator, and Premiere pro ... logo design ... photo compositing" (S1 p. 49) |
| `divisions[2].departments[7].courses[6]` | Studio Art | OK | "for highly motivated art students who are ready to work independently ... various media ... art criticism ... individual, exploratory approach" (S1 p. 47) |
| `divisions[2].departments[7].courses[7]` | Understanding Art: A Global View | OK | "various forms of fine art ... across cultures with a focus on the Postmodern and Global Contemporary periods ... visual literacy" (S1 p. 49) |
| `divisions[2].departments[7].courses[8]` | Yearbook | OK | "use Adobe Photoshop and InDesign to design and produce the school’s yearbook ... graphic design ... interview techniques" (S1 p. 49) |
| `divisions[2].departments[7].courses[9]` | AP Art History | OK | "Beginning with the study of Paleolithic cave paintings and concluding with contemporary works ... the serious art student ... historical styles, movements" (S1 p. 48) |
| `divisions[2].departments[7].courses[10]` | AP Art and Design | OK | "a year-long program consisting of three different courses ... AP 2-D Art and Design, AP 3-D Art and Design, and AP Drawing ... sustained investigation" (S1 p. 48) |
| `divisions[2].departments[8].courses[0]` | Band | OK | "explore, rehearse, and perform varying styles of repertoire written for a wind band ... perform at athletic events as part of the pep band" (S1 p. 36) |
| `divisions[2].departments[8].courses[1]` | Chorus | OK | "sing music representing a variety of genres within an ensemble ... unified tone quality and intonation ... two contest events, two formal concerts" (S1 p. 36) |
| `divisions[2].departments[8].courses[2]` | Jazz Ensemble | OK | "instruction in the basics of performing in various jazz styles ... jazz improvisation ... harmony, chord/scale relationships ... Audition is required" (S1 p. 36) |
| `divisions[2].departments[8].courses[3]` | Orchestra | OK | "instruction and performances of orchestral stringed instruments ... master tone, intonation, technique, and interpretation" (S1 p. 36) |
| `divisions[2].departments[8].courses[4]` | Theatre I: Introduction to Performance | OK | "theatrical performance from the perspective of the actor ... pantomime, improvisation, scene work, and contentless scenes" (S1 p. 37) |
| `divisions[2].departments[8].courses[5]` | Theatre II: Advanced Acting | OK | "advanced acting techniques including Meisner and Stanislavski, musical theatre ... text/character analysis, and principles of good audition technique" (S1 p. 37) |
| `divisions[2].departments[8].courses[6]` | Theatrical Performing Arts Lab | OK | "select, cast, design, rehearse, and produce a one-act play ... Students more interested in tech theatre will serve as designers" (S1 p. 37) |
| `divisions[2].departments[8].courses[7]` | Theatre Around the World | OK | "cultures such as Noh from Japan, Kathakali from India, Pantomime from the United Kingdom, Opera from Italy, and Theatre of the Oppressed from Brazil" (S1 p. 37) |
| `divisions[2].departments[8].courses[8]` | Theatrical Production and Design | OK | "theatrical costumes, stage makeup, props, as well as stage management ... hand and machine sewing ... special effect makeup ... hand props" (S1 p. 38) |
| `divisions[2].departments[8].courses[9]` | RE(ACT): Theatre and Social Change | OK | "dramatic performance can be used as an expression of social change ... Augusto Boal ... Theatre of the Oppressed ... modern plays" (S1 p. 38) |
| `divisions[2].departments[8].courses[10]` | Technical Theatre | OK | "design and build scenery, paint backdrops, focus-lighting instruments, create sound effects, and invent special effects" (S1 p. 38) |
| `divisions[2].departments[8].courses[11]` | Honors Band | OK | "for seniors who have successfully completed three years in the Upper School Band, meet audition requirements ... additional course requirements" (S1 p. 38) |
| `divisions[2].departments[8].courses[12]` | Honors Chorus | OK | "for seniors who have successfully completed three years in the Upper School Chorus, meet audition requirements" (S1 p. 38) |
| `divisions[2].departments[8].courses[13]` | Honors Jazz Ensemble | OK | "for seniors who have successfully completed three years in the Upper School Band or Jazz Ensemble, meet audition requirements" (S1 p. 38) |
| `divisions[2].departments[8].courses[14]` | Honors Orchestra | OK | "for seniors who have successfully completed three years in the Upper School Orchestra, meet audition requirements" (S1 p. 39) |
| `divisions[2].departments[8].courses[15]` | AP Music Theory | OK | "melody, harmony, texture, rhythm, form, and to some extent, history and style ... enter this class with a knowledge of basic theory" (S1 p. 39) |
| `divisions[2].departments[9].courses[0]` | Ninth Grade Health | OK | "research and acquire knowledge ... analyze ... set goals ... six aspects of their health; Spiritual, Mental, Physical, Intellectual, Environmental, & Social" (S1 p. 40) |
| `divisions[2].departments[9].courses[1]` | P.E. — Lifetime Wellness | OK | "concepts and principles of fitness, health, and wellness ... heart rate monitors ... fitness lab testing ... develop and implement a personal fitness program" (S1 p. 40) |
| `divisions[2].departments[9].courses[2]` | P.E. — Athletic Development | OK | "Personal strength and movement enhancement ... Olympic lifts ... metabolic conditioning, plyometrics, agility ... core stability" (S1 p. 40) |
| `divisions[2].departments[9].courses[3]` | P.E. — Dancercise | OK | "techniques from Jazz to Hip Hop ... improve their level of fitness. This course may only be taken once for a half unit of credit." (S1 p. 41) |
| `divisions[2].departments[9].courses[4]` | P.E. — Dancercise II | OK | "advanced instruction ... dance and hatha yoga ... advanced movements in jazz and ballet ... mindfulness exercises" (S1 p. 41) |
| `divisions[2].departments[9].courses[5]` | P.E. — Yoga and Mindfulness | OK | "history and philosophy of yoga ... daily practice ... yoga poses and vinyasas ... mental and physical benefits" (S1 p. 41) |
| `divisions[2].departments[9].courses[6]` | P.E. — International Games | OK | "core fitness/sports components with the history and participation of games ... such as Sepak Takraw ... Floorball ... and Gaelic Football" (S1 p. 41) |
| `divisions[2].departments[10].courses[0]` | The Art and Science of Teaching | OK | "explore the profession of teaching ... child development, the psychology of learning, instructional practices, classroom management" (S1 p. 58) |

</details>

## Census subagent notes (reported at review; nothing here was changed)

The subagent's own notes, kept verbatim for the record. Teaser, `notPublished` and tag items are out of this plan's fix scope and are raised at the batch review.

### Providence Day census notes

Reviewed all 213 rows of `descriptions-providence-day.tsv` against
`source-material/course-offerings/providence-day/Providence Day - Course Offerings - Curriculum Guide Full Descriptions 2025-2026.md`
(S1 Upper School PDF pages, S2 Middle School PDF pages, S3/S4 Lower School pages). The older
record was used only for context. The 14 grouped rows were matched by hand: MS world
languages (S2 p. 10 and 18–20, sequencing p. 26–28), MS ensembles (S2 p. 11–12, 23), Art 6 /
Art Foundations (S2 p. 12, 24), Theatre Arts 6 (S2 p. 12), Acting 1–3 (S2 p. 23–24), MS PE/Health
(S2 p. 11, 20–21), and US French/German/Spanish I–V and 6 (S1 p. 50–52), Mandarin 1–5 (S1 p. 55–56).

#### (a) Counts per verdict

| Verdict | Rows |
| --- | --- |
| OK | 193 |
| SITE-WRITTEN-OK | 9 |
| NARROWS | 9 |
| UNSUPPORTED | 2 |
| MISSTATES | 0 |
| NOT-ABOUT-COURSE | 0 |
| **Total** | **213** |

Non-OK rows:

- `divisions[0].departments[2].courses[8]` Learning Loft — UNSUPPORTED: "supporting individualized
  learning" is not in the school's text; only the title is published.
- `divisions[1].departments[5].courses[2]` Latin 2 — NARROWS: "open from Grade 8" drops the Latin 1
  "B-" (80) prerequisite and reads as a grade gate only.
- `divisions[1].departments[5].courses[6]` German 1–3 — NARROWS: drops "levels 2+ require prerequisite
  approval", which its three sibling rows state, so it implies German has none.
- `divisions[1].departments[6].courses[9]` Acting 1, 2 & 3 — UNSUPPORTED: the school does not present a
  "three-level sequence"; Acting 2 is Spring, Acting 3 is Fall and needs only prior theatre experience.
- `divisions[2].departments[0].courses[9]` Modern Dramatic Literature — NARROWS: drops "the loss of"
  (plays "explore the loss of individualism, empathy, and meaningful communication").
- `divisions[2].departments[0].courses[10]` Shakespeare — NARROWS: the school's "broad sampling …
  including" five plays is shown as the reading list.
- `divisions[2].departments[0].courses[15]` AP English Literature and Composition — NARROWS: "Regularly
  taught novels include" sample shown as the texts.
- `divisions[2].departments[1].courses[18]` Global Studies: Comparative Religions — NARROWS: "such as"
  sample shown as the full list.
- `divisions[2].departments[1].courses[19]` Global Studies: Africa — NARROWS: "several countries
  including" shown as the full set.
- `divisions[2].departments[1].courses[20]` Global Studies: Asia — NARROWS: same pattern.
- `divisions[2].departments[6].courses[11]` Latin 5 (Advanced) — NARROWS: "authors will include … such
  as" shown as the full span (Lhomond also dropped).

Judgment calls kept as OK with a `NOTE:` (re-check only if you disagree): Math and Social Studies
(LS), Selected Language of Study (the "11-year journey" quote is in the older record's S9 academics
page, not in the new file), Pre-Algebra 7 – Accelerated and Advanced Pre-Algebra (department
recommendation not mentioned), SPARK ("UN Sustainable Development Goals" vs the school's "UN
Sustainable Goals"), Chorus 6 / 7–8, Introduction to Art and Design, AP World History (four of six
themes), AP Physics 1 (topics "such as"), French 7 Literature (spelling, below). Topic lists the
school gives in full and the app trims (AP Environmental Science, AP Psychology, Bioethics) were
judged OK under the "minor topic from a long list" rule. The four sample-as-full-list flags above
were limited to named works, countries, religions and authors.

#### (b) Teaser / notPublished notes the school's text shows to be false or out of date

- **Lower School teaser**: "Singapore Math and structured literacy from TK." The school says
  structured literacy "begins in Transitional Kindergarten", but Singapore Math is used "for
  kindergarten through fifth grade" (S3, ### Math). So "from TK" is true of literacy, not of
  Singapore Math.
- **Lower School notPublished**: "There is no Lower School course-of-study guide." This is a
  does-not-exist claim. Per must-survive item 7 it should read as a not-published claim
  (for example, "Providence Day publishes no Lower School course-of-study guide"). The school's
  pages support "publishes no", not "there is no".
- **Lower School teaser "11 Special Area Classes"**: matches the school's list of 11 (which
  includes World Language; the app shows World Language as its own department and 10 tiles under
  Special Area Classes). Not wrong; noted only so the count is not "fixed" to 10.
- **Upper School teaser "28 AP courses"**: the app has 28 AP entries. The school's prose list on
  S1 p. 5 names 27 AP programs (it counts Computer Science and Physics once each, names "Studio
  Art" for AP Art and Design, and includes AP German, which has no catalog entry). Not a finding;
  noted in case the figure is challenged.
- Middle and Upper School source lines match the PDFs used (same URLs, 2025-26).

#### (c) Titles or tags that look wrong

- **Math (LS), tag `TK–Gr 5`**: the school says Singapore Math runs "kindergarten through fifth
  grade" (S3). The curriculum area may still span TK, but the school's text gives K–5.
- **Chorus 6 / Chorus 7–8, tag `Year`**: the school lists both as "Year or Semester" (S2 p. 2, 5,
  12, 23).
- **Art 6 & Art Foundations, tag `Semester`**: Art 6 "may be taken for either a semester or full
  year" (S2 p. 12). Minor.
- **P.E. — Lifetime Wellness, tag `Gateway`**: not a school term. It is the prerequisite for the
  other PE electives (S1 p. 40–41), so the tag is accurate in spirit, but the school never uses
  the word.
- **Acting 1, 2 & 3**: the school's full titles are "Acting 2 - Acting Through the Ages" and
  "Acting 3 - Production Practices [One Act Play]" (S2 p. 24). Grouped title is fine; flagged
  only because the description implied a sequence.
- **French 7 Advanced: Francophone Culture through Literature**: the description spells the
  graphic novel "Aya de Yopoungon". The school prints "Aya de Yopoungo" (S1 p. 52), and the
  published title is "Aya de Yopougon". Neither the app nor the school's text has the published
  spelling. Left as OK because a name fix needs a decision on which spelling to copy.

#### (d) Source reading problems

- The PDF text is extracted page by page, so the Middle School course-sequence tables (S2 p. 3–9)
  are split into columns. Prerequisite cells are often detached from their course rows (for
  example "Requires Prerequisite Approval" printed on a separate line). I matched them using the
  clean page-10 table and the page-26–28 sequencing tables.
- Lower School Special Area Classes tiles hold only titles (provenance note). No other text was
  available for those 11 classes, which is why 9 rows are SITE-WRITTEN-OK and Learning Loft is
  UNSUPPORTED.
- The S9 academics page cited by the older record (the "11-year journey" wording) is not in the
  new file. I could not confirm that quote against the school's own text here.
- Nothing else was unreadable.
