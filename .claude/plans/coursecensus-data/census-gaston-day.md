# Census — gaston-day (plan `coursecensus`, Batch 3)

Every Course Offerings description for gaston-day, checked against the school's own text in `source-material/course-offerings/gaston-day/Gaston Day School - Course Offerings - Curriculum and Requirements 2026.md (plus its Arts and Clubs records)`. Verdicts are the plan's ("Decisions"). The table was drafted by a fresh census subagent; every non-OK row was then re-checked against the source by the implementer, and any change to the subagent's verdict is noted in the row.

## Verdicts

| Verdict | Rows |
|---|--:|
| OK | 15 |
| SITE-WRITTEN-OK | 28 |
| NOT-ABOUT-COURSE | 0 |
| MISSTATES | 1 |
| NARROWS | 1 |
| UNSUPPORTED | 11 |
| **Total** | **56** |

## Rows fixed

| Path | Title | Verdict | Evidence | Before | After |
|---|---|---|---|---|---|
| `divisions[0].departments[1].courses[0]` | LEAD | UNSUPPORTED | Record gives only "LEAD courses required" (MS table) and "digital citizenship taught through advisory and LEAD" (MS notes below the table); no record file mentions life skills. | A required course sequence carrying digital citizenship and life-skills instruction alongside advisory. | A required course sequence carrying digital citizenship instruction alongside advisory. |
| `divisions[0].departments[1].courses[3]` | Chorus | UNSUPPORTED | Arts record (## Performing arts, Music) lists "Middle School: instrumental ensemble — woodwinds, brass, percussion, piano, guitar — plus Middle School Chorus"; no record says the chorus performs alongside the ensemble. | The Middle School Chorus, which performs alongside the instrumental ensemble. | The Middle School Chorus, one of four fine-arts electives Middle School students choose between. |
| `divisions[1].departments[1].courses[4]` | Advanced Functions and Models | UNSUPPORTED — the subagent's fix kept a 'fourth-year' claim the record does not give; the fix states only what the record holds | Record gives only the title "Advanced Functions and Models" (course table, Math) and no prerequisites or audience; nothing says it is for students not continuing to calculus. | A fourth-year mathematics option for students not continuing to calculus. | An Upper School mathematics course; the school publishes no description of it. |
| `divisions[1].departments[1].courses[7]` | Calculus AB | UNSUPPORTED | Record gives only "Calculus AB (AP)" (course table); "first-semester college calculus" is a College Board equivalence no school text states. Exam rule is supported: "required to sit the AP exam" (college-support record). | First-semester college calculus; all AP students must sit the exam. | An AP calculus course; all AP students must sit the exam. |
| `divisions[1].departments[1].courses[8]` | Calculus BC | UNSUPPORTED | Record gives only "Calculus BC (AP)" (course table); no school text names its topics (series, integration techniques) or says it extends AB. | Extends AB through series and further integration techniques. | One of two AP calculus courses, alongside Calculus AB. |
| `divisions[1].departments[2].courses[3]` | Physics | UNSUPPORTED | Record gives only "Physics (H) · Physics II (AP)" (course table, Science) and states no prerequisites anywhere ("Not published: ... prerequisites"). | Honors physics, the prerequisite tier beneath AP Physics II. | Honors physics; Physics II is offered at the AP level. |
| `divisions[1].departments[2].courses[4]` | Physics II | UNSUPPORTED | Record gives only "Physics II (AP)" (course table); "implying a two-year physics sequence" is the site's own guess, and the record publishes no prerequisites or sequence. | The AP physics offering, implying a two-year physics sequence. | The one AP physics course in the Upper School curriculum. |
| `divisions[1].departments[4].courses[0]` | Spanish I, II, III | NARROWS | Requirement: "Completion through Level III of either French or Spanish" (## Graduation requirements); but "World language exception: 'International students for whom English is a second language are not required to take an additional world language.'" (## Academic policy). The row states the requirement as universal. | Completion through Level III is required for graduation; the requirement may also be met in French. | Completion through Level III, in Spanish or French, is required for graduation, except for international students for whom English is a second language. |
| `divisions[1].departments[5].courses[0]` | Band | MISSTATES | Fine Arts table lists five courses: "Band · Concert Choir · Drama · Visual Art I, II, III · Visual Art IV (H)" (course table, Fine Arts \| 2 Years); the app shows five rows, not four. | One of four fine-arts courses counting toward the two-year requirement. | One of the fine-arts courses counting toward the two-year requirement. |
| `divisions[1].departments[5].courses[4]` | Visual Art IV | UNSUPPORTED | Record: "Visual Art IV (H)" is the last Fine Arts entry (course table); the school never says AP Studio Art does not exist, and the record lists "A standalone course-catalog PDF" as not published. Does-not-exist form (must-survive item 7). | The terminal visual-arts course — there is no AP Studio Art. | The final course in the visual-arts sequence; the school's curriculum table lists no AP Studio Art. |
| `divisions[1].departments[7].courses[2]` | Robotics | UNSUPPORTED | Record lists "Robotics (H)" as an elective and, separately, the club: "Gaston Day launched its own VEX Robotics Club and qualified for Technology Student Association VEX Nationals in 2023" (clubs record, VEX Robotics, S4 verbatim). No text links the course to the club, and "qualified for" is not "reached". | Feeds the VEX Robotics team that reached TSA VEX Nationals in 2023. | Honors robotics; the school also runs a VEX Robotics Club, which qualified for Technology Student Association VEX Nationals in 2023. |
| `divisions[1].departments[7].courses[4]` | Creative Writing | UNSUPPORTED | Record lists "Creative Writing (H)" as a general elective and Blutopia separately as the student magazine (arts record, ## Recognition; clubs record, Blutopia); no text says the course feeds Blutopia. | Feeds Blutopia, the student literary and art magazine. | A creative-writing elective offered at the Honors level. |
| `divisions[1].departments[7].courses[5]` | Speech & Debate | UNSUPPORTED | Clubs record, Update 2026-11-10: "Not found on any school source, so removed from the app: ... Science Olympiad, Public Debate Club, Mock Trial and Quiz Bowl". Both clubs come only from third-party lists; no text links them to the course. | Supports the Public Debate Club and Mock Trial. | A general elective in speech and debate. |

## All rows

<details>
<summary>All 56 rows</summary>

| Path | Title | Verdict | Evidence |
|---|---|---|---|
| `divisions[0].departments[0].courses[0]` | English | OK | "English \| Literature, Grammar, and Written Composition" (record, ## Middle School curriculum, grades 5-8) |
| `divisions[0].departments[0].courses[1]` | Science | OK | "Earth and Space Science (5th) · Life Science (6th) · Earth Systems (7th) · Physical Science (8th)" (record, MS table, Science) |
| `divisions[0].departments[0].courses[2]` | Mathematics | OK | "Grade-level math with honors options; Honors Algebra I available in 7th-8th" (record, MS table, Math) |
| `divisions[0].departments[0].courses[3]` | Social Studies | OK | "Human Geography (5th-6th) · U.S. History (7th) · World History I (8th)" (record, MS table, Social Studies) |
| `divisions[0].departments[0].courses[4]` | World Languages | OK | "Language acquisition (5th-6th) · Conversational Spanish and Spanish I (7th-8th)" (record, MS table, World Languages) |
| `divisions[0].departments[1].courses[0]` | LEAD | UNSUPPORTED | Record gives only "LEAD courses required" (MS table) and "digital citizenship taught through advisory and LEAD" (MS notes below the table); no record file mentions life skills. |
| `divisions[0].departments[1].courses[1]` | Art | OK | "Electives / Fine Arts \| Art, drama, chorus, band" (record, MS table); arts record: "students select electives from art, drama, chorus and band" |
| `divisions[0].departments[1].courses[2]` | Drama | SITE-WRITTEN-OK | NOTE: not in the course record; arts record (The Arts - Program Facilities, ## Performing arts) quotes the school: "Drama classes begin as early as the second grade." The row drops "as early as". |
| `divisions[0].departments[1].courses[3]` | Chorus | UNSUPPORTED | Arts record (## Performing arts, Music) lists "Middle School: instrumental ensemble — woodwinds, brass, percussion, piano, guitar — plus Middle School Chorus"; no record says the chorus performs alongside the ensemble. |
| `divisions[0].departments[1].courses[4]` | Band | SITE-WRITTEN-OK | NOTE: instruments match the arts record ("instrumental ensemble — woodwinds, brass, percussion, piano, guitar"); no record states that the band elective "feeds" the ensemble, but both are the one MS instrumental program, so not misleading. |
| `divisions[1].departments[0].courses[0]` | English 9 | SITE-WRITTEN-OK | "English \| 4 Years · English 9 (H) · English 10 (H)" (record, ## Full course table, English) |
| `divisions[1].departments[0].courses[1]` | English 10 | SITE-WRITTEN-OK | "English 10 (H)"; "H = Honors level" (record, course table and marker key) |
| `divisions[1].departments[0].courses[2]` | American Literature | SITE-WRITTEN-OK | NOTE: "American Literature (H)" (course table); "upper-level" follows from English 9 and 10 being the first two of four years; "survey" is a mild inference from the title. |
| `divisions[1].departments[0].courses[3]` | British Literature | SITE-WRITTEN-OK | NOTE: "British Literature (H)" (course table); "upper-level" follows from the four-year structure; "survey" is a mild inference from the title. |
| `divisions[1].departments[0].courses[4]` | English Literature & Composition | SITE-WRITTEN-OK | NOTE: "English Literature & Composition (AP)" (course table); college-support record: "All Gaston Day students enrolled in AP courses are required to sit the AP exam (S1)". "College-level" is general to the AP marker, not a school phrase. |
| `divisions[1].departments[0].courses[5]` | English Language & Composition | SITE-WRITTEN-OK | NOTE: "English Language & Composition (AP)" (course table); exam rule from college-support record ("required to sit the AP exam"). "College-level" is general to the AP marker. |
| `divisions[1].departments[1].courses[0]` | Algebra I | OK | "4 years, including Algebra I, Geometry, Algebra II" (record, ## Graduation requirements); MS "Honors Algebra I available in 7th-8th" |
| `divisions[1].departments[1].courses[1]` | Geometry | SITE-WRITTEN-OK | "including Algebra I, Geometry, Algebra II" (## Graduation requirements); "Geometry (H)" (course table) |
| `divisions[1].departments[1].courses[2]` | Algebra II | SITE-WRITTEN-OK | "including Algebra I, Geometry, Algebra II" (## Graduation requirements); "Algebra II (H)" (course table) |
| `divisions[1].departments[1].courses[3]` | PreCalculus | SITE-WRITTEN-OK | NOTE: record gives only "PreCalculus (H)" and publishes no prerequisites; "bridge into the calculus sequence" is a general-knowledge inference from the table's order (Calculus (H), Calculus AB, Calculus BC follow). |
| `divisions[1].departments[1].courses[4]` | Advanced Functions and Models | UNSUPPORTED | Record gives only the title "Advanced Functions and Models" (course table, Math) and no prerequisites or audience; nothing says it is for students not continuing to calculus. |
| `divisions[1].departments[1].courses[5]` | Calculus | SITE-WRITTEN-OK | "Calculus (H) · Statistics (H) · Calculus AB (AP) · Calculus BC (AP)" (course table, Math) |
| `divisions[1].departments[1].courses[6]` | Statistics | SITE-WRITTEN-OK | "Statistics (H)"; Math "4 years ... and one additional advanced math course" (course table; graduation requirements) |
| `divisions[1].departments[1].courses[7]` | Calculus AB | UNSUPPORTED | Record gives only "Calculus AB (AP)" (course table); "first-semester college calculus" is a College Board equivalence no school text states. Exam rule is supported: "required to sit the AP exam" (college-support record). |
| `divisions[1].departments[1].courses[8]` | Calculus BC | UNSUPPORTED | Record gives only "Calculus BC (AP)" (course table); no school text names its topics (series, integration techniques) or says it extends AB. |
| `divisions[1].departments[2].courses[0]` | Biology | OK | "3 years of lab science, including Biology, Chemistry" (## Graduation requirements); "Biology (H)(AP)" (course table) |
| `divisions[1].departments[2].courses[1]` | Chemistry | OK | "3 years of lab science, including Biology, Chemistry" (## Graduation requirements); "Chemistry (H)(AP)" (course table) |
| `divisions[1].departments[2].courses[2]` | Environmental Science | SITE-WRITTEN-OK | "Biology, Chemistry and one additional advanced science" (## Graduation requirements); "Environmental Science (H)" (course table) |
| `divisions[1].departments[2].courses[3]` | Physics | UNSUPPORTED | Record gives only "Physics (H) · Physics II (AP)" (course table, Science) and states no prerequisites anywhere ("Not published: ... prerequisites"). |
| `divisions[1].departments[2].courses[4]` | Physics II | UNSUPPORTED | Record gives only "Physics II (AP)" (course table); "implying a two-year physics sequence" is the site's own guess, and the record publishes no prerequisites or sequence. |
| `divisions[1].departments[3].courses[0]` | World History | OK | "3 years, including World History, US History, and Government and Economics" (## Graduation requirements); "World History (H)" |
| `divisions[1].departments[3].courses[1]` | US History | OK | "including ... US History" (## Graduation requirements); "US History (H)(AP)" (course table) |
| `divisions[1].departments[3].courses[2]` | Government and Economics | OK | "including ... Government and Economics" (## Graduation requirements); "Government and Economics (H)(AP)" (course table) |
| `divisions[1].departments[4].courses[0]` | Spanish I, II, III | NARROWS | Requirement: "Completion through Level III of either French or Spanish" (## Graduation requirements); but "World language exception: 'International students for whom English is a second language are not required to take an additional world language.'" (## Academic policy). The row states the requirement as universal. |
| `divisions[1].departments[4].courses[1]` | Spanish IV | SITE-WRITTEN-OK | "Spanish I, II, III · Spanish IV (H)"; "World Language \| through Level III" (course table) |
| `divisions[1].departments[5].courses[0]` | Band | MISSTATES | Fine Arts table lists five courses: "Band · Concert Choir · Drama · Visual Art I, II, III · Visual Art IV (H)" (course table, Fine Arts \| 2 Years); the app shows five rows, not four. |
| `divisions[1].departments[5].courses[1]` | Concert Choir | SITE-WRITTEN-OK | "Fine Arts \| 2 Years · Band · Concert Choir" (course table) |
| `divisions[1].departments[5].courses[2]` | Drama | SITE-WRITTEN-OK | NOTE: "Drama" (course table); arts record quotes the school: "Two major shows each year, including Gaston Day School's spring musical." |
| `divisions[1].departments[5].courses[3]` | Visual Art I, II, III | SITE-WRITTEN-OK | NOTE: "Visual Art I, II, III" (course table); topics from arts record: "Upper School instruction covers drawing, painting, ceramics, printmaking, and portfolio development" — stated for US visual art generally, not per level. |
| `divisions[1].departments[5].courses[4]` | Visual Art IV | UNSUPPORTED | Record: "Visual Art IV (H)" is the last Fine Arts entry (course table); the school never says AP Studio Art does not exist, and the record lists "A standalone course-catalog PDF" as not published. Does-not-exist form (must-survive item 7). |
| `divisions[1].departments[6].courses[0]` | Physical Education | OK | "PE/Health \| 1 Year · Physical Education · Health and Wellness" (course table) |
| `divisions[1].departments[6].courses[1]` | Health and Wellness | OK | "PE/Health \| 1 Year · Physical Education · Health and Wellness" (course table) |
| `divisions[1].departments[7].courses[0]` | AP Computer Science | SITE-WRITTEN-OK | NOTE: tenth in the record's own AP count list (## AP course count, item 10); makerspace "with access to 3-D printers, laser cutters, and CNC machines" for STEM options incl. "Computer Science" (## STEM and facilities). "The tenth" reads as an ordering; "one of the 10 AP courses" would be clearer. |
| `divisions[1].departments[7].courses[1]` | Engineering | SITE-WRITTEN-OK | "STEM options include Engineering ... taught in ... a newly renovated makerspace" (## STEM and facilities); "Engineering (H)" |
| `divisions[1].departments[7].courses[2]` | Robotics | UNSUPPORTED | Record lists "Robotics (H)" as an elective and, separately, the club: "Gaston Day launched its own VEX Robotics Club and qualified for Technology Student Association VEX Nationals in 2023" (clubs record, VEX Robotics, S4 verbatim). No text links the course to the club, and "qualified for" is not "reached". |
| `divisions[1].departments[7].courses[3]` | Intro to Business | OK | "Intro to Business (H)(DE) is the one DE-marked course in the table, taught by Gaston Day faculty"; "DE coursework is not calculated into the GPA" (record). NOTE: general DE policy is "available from fall of grade 11"; not stated for this course, so not a dropped rule. |
| `divisions[1].departments[7].courses[4]` | Creative Writing | UNSUPPORTED | Record lists "Creative Writing (H)" as a general elective and Blutopia separately as the student magazine (arts record, ## Recognition; clubs record, Blutopia); no text says the course feeds Blutopia. |
| `divisions[1].departments[7].courses[5]` | Speech & Debate | UNSUPPORTED | Clubs record, Update 2026-11-10: "Not found on any school source, so removed from the app: ... Science Olympiad, Public Debate Club, Mock Trial and Quiz Bowl". Both clubs come only from third-party lists; no text links them to the course. |
| `divisions[1].departments[7].courses[6]` | Psychology | SITE-WRITTEN-OK | "General Electives ... Psychology" (course table) |
| `divisions[1].departments[7].courses[7]` | Human Geography | SITE-WRITTEN-OK | NOTE: "Human Geography" (General Electives); MS "Human Geography (5th-6th)" (MS table). The MS row gives no level; "at grade level" is a harmless inference. |
| `divisions[1].departments[7].courses[8]` | Human Health and Medicine | SITE-WRITTEN-OK | "General Electives ... Human Health and Medicine" (course table) |
| `divisions[1].departments[7].courses[9]` | World Views | SITE-WRITTEN-OK | "General Electives ... World Views" (course table) |
| `divisions[1].departments[7].courses[10]` | Music Appreciation | SITE-WRITTEN-OK | Arts record: "Arts-adjacent general electives: Music Appreciation · Cinema Studies · Creative Writing (H) · Yearbook" |
| `divisions[1].departments[7].courses[11]` | Cinema Studies | SITE-WRITTEN-OK | Arts record: "Arts-adjacent general electives: ... Cinema Studies"; course table "Cinema Studies" |
| `divisions[1].departments[7].courses[12]` | Yearbook | SITE-WRITTEN-OK | "General Electives ... Yearbook" (course table); clubs record: "Yearbook and Speech & Debate as courses" |
| `divisions[1].departments[7].courses[13]` | Strength & Conditioning I, II, III | SITE-WRITTEN-OK | "Strength & Conditioning I, II, III" (course table, General Electives) |

</details>
