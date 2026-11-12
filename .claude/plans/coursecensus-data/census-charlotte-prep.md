# Census — charlotte-prep (plan `coursecensus`, Batch 3)

Every Course Offerings description for charlotte-prep, checked against the school's own text in `source-material/course-offerings/charlotte-prep/Charlotte Preparatory School - Course Offerings - Curriculum by Division.md`. Verdicts are the plan's ("Decisions"). The table was drafted by a fresh census subagent; every non-OK row was then re-checked against the source by the implementer, and any change to the subagent's verdict is noted in the row.

## Verdicts

| Verdict | Rows |
|---|--:|
| OK | 36 |
| SITE-WRITTEN-OK | 0 |
| NOT-ABOUT-COURSE | 0 |
| MISSTATES | 0 |
| NARROWS | 1 |
| UNSUPPORTED | 0 |
| **Total** | **37** |

## Rows fixed

| Path | Title | Verdict | Evidence | Before | After |
|---|---|---|---|---|---|
| `divisions[1].departments[0].courses[0]` | Reading & Writing | NARROWS | School: "foundational language skills–in the areas of reading, writing, speaking, and listening—are the focus of daily instruction, including decoding knowledge, word attack strategies, fluency, ..." (record, ### Lower School, l.61). The row drops "including" and the four skill areas, so a sample reads as the whole of daily instruction | Daily instruction in "decoding knowledge, word attack strategies, fluency, literal and inferential comprehension skills, and essential skills in the writing process." | Daily instruction in reading, writing, speaking and listening skills, "including decoding knowledge, word attack strategies, fluency, literal and inferential comprehension skills, and essential skills in the writing process." |

## All rows

<details>
<summary>All 37 rows</summary>

| Path | Title | Verdict | Evidence |
|---|---|---|---|
| `divisions[0].departments[0].courses[0]` | Pre-Primary | OK | "Younger children (ages 2-3) "focus on gaining independence, large motor control, and early language..."" (record, ### Montessori Early School, l.27); quote byte-identical |
| `divisions[0].departments[0].courses[1]` | Primary | OK | "Primary students (ages 3-4) "build concentration, coordination, organization, and independence..."" (record, ### Montessori Early School, l.28); quote byte-identical |
| `divisions[0].departments[0].courses[2]` | Transitional K & Montessori K | OK | "Older students (ages 5-6) "begin to make connections between concrete and abstract concepts..."" (record, ### Montessori Early School, l.29); quote byte-identical |
| `divisions[0].departments[1].courses[0]` | First Year | OK | "Beginning phonemic awareness; "Developing the concepts of grading and 1:1 correspondence...0-10"" (record, ### The Montessori Three-Year Cycle table, l.39). NOTE: quote lowercases the initial D and adds a closing period; wording otherwise identical |
| `divisions[0].departments[1].courses[1]` | Second Year | OK | ""Connecting phonetic sounds to their alphabet symbols"; "Connecting the numerals and quantities for numbers 0-20 and beyond"" (record, Three-Year Cycle table, l.40). NOTE: second quote lowercases initial C and adds a period; rest-time/work-cycle items simply left out |
| `divisions[0].departments[1].courses[2]` | Third Year | OK | "Writing with the movable alphabet and pencil; "Beginning to blend sounds to decode (read) words"; "Extending mathematical concepts, such as the decimal system..."" (record, Three-Year Cycle table, l.41). NOTE: initial capitals lowercased; "such as" kept |
| `divisions[0].departments[2].courses[0]` | Music | OK | "All early school students participate in music classes." (record, ### Montessori Early School, l.31, fall 2025 packet); byte-identical |
| `divisions[0].departments[2].courses[1]` | Art | OK | "Montessori Kindergarten students have weekly art, P.E., Spanish, and Tech classes." (record, ### Montessori Early School, l.31); faithful paraphrase |
| `divisions[0].departments[2].courses[2]` | Physical Education | OK | "Montessori Kindergarten students have weekly art, P.E., Spanish, and Tech classes." (record, l.31); faithful paraphrase |
| `divisions[0].departments[2].courses[3]` | Spanish | OK | "Montessori Kindergarten students have weekly art, P.E., Spanish, and Tech classes." (record, l.31); also l.110 "weekly for Montessori Kindergarten" |
| `divisions[0].departments[2].courses[4]` | Technology | OK | "Montessori Kindergarten students have weekly art, P.E., Spanish, and Tech classes." (record, l.31); Tech = technology |
| `divisions[1].departments[0].courses[0]` | Reading & Writing | NARROWS | School: "foundational language skills–in the areas of reading, writing, speaking, and listening—are the focus of daily instruction, including decoding knowledge, word attack strategies, fluency, ..." (record, ### Lower School, l.61). The row drops "including" and the four skill areas, so a sample reads as the whole of daily instruction |
| `divisions[1].departments[0].courses[1]` | Reading & Writing | OK | "students "support cross-discipline learning, develop interpretive and analytic comprehension skills, and establish their voices as writers."" (record, ### Lower School, l.62); byte-identical |
| `divisions[1].departments[0].courses[2]` | Mathematics | OK | "Math: "grounded in a global philosophy. A balanced approach is used to build and apply computational, conceptual..."" (record, ### Lower School, l.63). NOTE: quote capitalizes the initial g |
| `divisions[1].departments[1].courses[0]` | Collaborative Classroom | OK | "a reading curriculum "based on the science of reading", for grades K-3, introduced with 2022-23 Prep Fund support" (record, Named programmes, l.67) |
| `divisions[1].departments[1].courses[1]` | SIPPS | OK | "SIPPS reading intervention, used by learning-support specialists in Lower and Middle School." (record, l.68). NOTE: row omits "and Middle School" but does not say Lower School only |
| `divisions[1].departments[1].courses[2]` | Daily Language Instruction | OK | "Daily Language Instruction, a grammar programme for 3rd and 4th grade." (record, l.69) |
| `divisions[1].departments[1].courses[3]` | IXL | OK | "IXL, an online practice platform for math, used in grades 3-8 since 2023." (record, l.70) |
| `divisions[1].departments[2].courses[0]` | Music | OK | "6-day rotation of specialized classes" ... "Fine Arts: music, drama and art" (record, ### The Six-Day Specials Rotation, l.74-76) |
| `divisions[1].departments[2].courses[1]` | Drama | OK | "6-day rotation of specialized classes" ... "Fine Arts: music, drama and art" (record, l.74-76) |
| `divisions[1].departments[2].courses[2]` | Art | OK | "6-day rotation of specialized classes" ... "Fine Arts: music, drama and art" (record, l.74-76) |
| `divisions[1].departments[2].courses[3]` | Technology & STEM | OK | "The rotation covers: ... Technology and STEM" (record, l.74-77) |
| `divisions[1].departments[2].courses[4]` | Spanish | OK | Rotation covers "Spanish" (l.78); "We offer Spanish as our foreign language for grades K-8." (record, ### Spanish from Kindergarten to Grade 8, l.107) |
| `divisions[1].departments[2].courses[5]` | Physical Education | OK | Rotation covers "Physical Education" (record, ### The Six-Day Specials Rotation, l.79) |
| `divisions[2].departments[0].courses[0]` | Mathematics | OK | "Our standard math curriculum is a full year ahead of learning at most other schools." (record, ### Math: A Year Ahead, l.97, fall 2025 packet); byte-identical school claim, names no school |
| `divisions[2].departments[0].courses[1]` | Algebra or Geometry | OK | grade 8 "CTP-5 Algebra Sub-Test (For students in Geometry or Algebra only)" ... "So some 8th graders are taking Algebra or Geometry." (record, l.99) |
| `divisions[2].departments[0].courses[2]` | Spanish | OK | "Middle School students take Spanish as a core class, developing the confidence and skills they will need to succeed in high school Spanish"; Somos curriculum; "8th graders sit the National Spanish Exam" (record, l.107-113) |
| `divisions[2].departments[0].courses[3]` | Reading & Writing | OK | "Reading and writing are emphasized throughout the curriculum" (record, ### Middle School, l.93, fall 2025 packet); byte-identical |
| `divisions[2].departments[0].courses[4]` | Technology & STEM | OK | "Technology: students "become creative and responsible users of emerging technologies, leveraging tools like coding and robotics."" (record, ### Middle School, l.87); byte-identical |
| `divisions[2].departments[1].courses[0]` | Leadership Class | OK | "students learn about presenting themselves, including interview skills such as shaking hands properly, appropriate dress, eye contact, and asking thoughtful questions" (record, ### Leadership Class and Public Speaking, l.120); "such as" kept |
| `divisions[2].departments[1].courses[1]` | Persuasive Speech Project | OK | "6th grade: a persuasive speech project" (record, ### Leadership Class and Public Speaking, l.123) |
| `divisions[2].departments[1].courses[2]` | Ignite Talks | OK | "8th graders give "Prep 5x30" talks, "five slides displayed for 30 seconds each", on a topic of their choice" (record, l.122). NOTE: closing period added inside the quote |
| `divisions[2].departments[1].courses[3]` | Capstone Project | OK | "8th-grade Capstone Project: policy proposals built around the 8th-grade trip to Washington, D.C." (record, l.124) |
| `divisions[2].departments[2].courses[0]` | Chorus or Band | OK | "Students may choose between Chorus and Band as 5th graders, while they continue to take both Drama and Art." (record, ### Arts and PE in Middle School, l.129). NOTE: tag Gr 5–6 rests on the record's table (l.133); the school's sentence says only "as 5th graders" |
| `divisions[2].departments[2].courses[1]` | Drama and Art | OK | "...while they continue to take both Drama and Art. Once they are in 7th grade they may choose..." (record, l.129; table l.133 "5th–6th ... Both Drama and Art") |
| `divisions[2].departments[2].courses[2]` | Drama or Art | OK | "Once they are in 7th grade they may choose between Drama and Art." (record, l.129); byte-identical |
| `divisions[2].departments[2].courses[3]` | Physical Education | OK | "In addition, students have Physical Education twice a week." (record, l.129); Middle School statement per l.229 |

</details>
