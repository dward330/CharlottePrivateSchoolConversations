# Charlotte Country Day School — Learning Support & Student Services — Official Site Research

**Provenance.** Collected 2026-10-25 by Claude (Claude Code) via `/learning-support` step 2,
fetching Charlotte Country Day School's **own** pages directly (`curl` with a browser user
agent, raw HTML stripped to text) and the Finalsite resource-manager PDFs those pages link
(`pdftotext -layout`; the one-page Approved Accommodations PDF was also rendered with
`pdftoppm` and read as an image, and the text matches it). Per the area's rule, **only
official school sources** are used: charlottecountryday.org, its BucsNet parent pages, the
PDFs and image those pages link, and its faculty/staff directory. The user's Claude
deep-research dossier (transcribed alongside this file as
`Charlotte Country Day - Learning Support - Deep Research.md`) was used as a **lead
sheet only**. Every fact below was re-read on the live page. Where the two disagree, the
live site wins (see "Corrections to the deep-research dossier" at the end).

**The dossier's largest gap is closed.** It reported that the four BucsNet pages
(`/bucsnet/lower-school/erp`, `/middle-school/erp`, `/upper-school/erp`, `/bucsnet/health`)
"could not be fetched". All four returned **HTTP 200** on 2026-10-25, unauthenticated.
They carry the published per-session rates, the reading method, the identification tiers,
the current accommodations policy and its PDFs, the full ERP staff roster with emails, the
counselor roster and the crisis lines.

No student is named in this file. One school news post names an alumna (a parent
relationship in a staff announcement); that name is redacted below.

## Source URLs

| # | URL | What it is | Status 2026-10-25 |
|---|---|---|---|
| S1 | https://www.charlottecountryday.org/cd-education/educational-resource-program | Educational Resource Program (public page) — LS / MS / US tabs | 200, fetched (legacy `/a-country-day-education/educational-resource-program` redirects here) |
| S2 | https://www.charlottecountryday.org/bucsnet/lower-school/erp | BucsNet: "Learning Support for Grades JK–4" — Orton-Gillingham, tiers, $82 / 45-min, 10 staff | 200, fetched |
| S3 | https://www.charlottecountryday.org/bucsnet/middle-school/erp | BucsNet: "Learning Support for Grades 5–8" — scheduling, $85 / session, 11 staff | 200, fetched |
| S4 | https://www.charlottecountryday.org/bucsnet/upper-school/erp | BucsNet: "Academic Coaching Grades 9–12" — coaching model, $85 / session, 5 staff | 200, fetched |
| S5 | https://www.charlottecountryday.org/bucsnet/upper-school/erp/learning-evaluations (also reached as `/fs/pages/2907`, the "Academic Accommodations & Support" button on S2–S4) | "Academic Accommodations and Learning Support (JK–12)" — eligibility, CAP, evaluation currency | 200, fetched |
| S6 | https://www.charlottecountryday.org/fs/resource-manager/view/340fc0e3-7789-4165-9402-c327f27e5fc4 | Policy on Psychoeducational Evaluations (current, 4 pp., undated) | 200, PDF, transcribed |
| S7 | https://www.charlottecountryday.org/fs/resource-manager/view/3db8c6f3-71f9-4843-b5c4-e3164f16d243 | Preferred Providers for Psychoeducational Testing, "Update January 2026" (2 pp.) | 200, PDF, transcribed |
| S8 | https://www.charlottecountryday.org/fs/resource-manager/view/832f59a5-22a3-4f65-9c21-905ee33ddbd7 | Approved Accommodations (current, 1 p.) | 200, PDF, transcribed + rendered |
| S9a | https://www.charlottecountryday.org/fs/resource-manager/view/9f5f4219-2c76-4ff5-bd84-8c93beb702a9 | ERP Consent for Assessment (educational screening) | 200, PDF |
| S9b | https://www.charlottecountryday.org/fs/resource-manager/view/0cd223bc-1e47-49af-874c-88b3b66e009d | OT Therapy Screening letter (Southern Piedmont Pediatric Therapy, $25) | 200, PDF |
| S9c | https://www.charlottecountryday.org/fs/resource-manager/view/5857f581-8ca5-4b33-9461-f1fb052ab883 | Speech and Language Screening Form (TerrificTalkers, $25; footer "2025") | 200, PDF |
| S9d | https://www.charlottecountryday.org/fs/resource-manager/view/ee3a4a90-dd51-4462-9c96-55a8486e5e06 | Speech and Language Teacher Referral checklist | 200, PDF |
| S10 | https://www.charlottecountryday.org/bucsnet/health | BucsNet: Health Services — nurses, counselors, crisis lines | 200, fetched |
| S10a | https://www.charlottecountryday.org/fs/resource-manager/view/e5f0a9ae-520d-4426-9a41-f91f68115594 | "Crisis Service Lines" image (988, Crisis Text Line, NC Peer Warmline) | 200, JPEG, read visually |
| S11 | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum | Lower School Curriculum — counseling, ERP, Literacy Coach/Reading Specialist | 200, fetched |
| S12 | https://www.charlottecountryday.org/bucsnet/post-details/~board/school-news/post/announcing-our-new-director-of-health-and-wellness | New Director of Health and Wellness (post dated 6/24/26) | 200, fetched |
| S13 | https://www.charlottecountryday.org/meet-our-faculty/facultystaff-directory (keyword searches `?const_search_keyword=<name>`) | Faculty/Staff Directory — titles, ids and `FS.util.insertEmail` addresses | 200, fetched |
| S14 | https://www.charlottecountryday.org/admissions/admissions-process | Admissions Process — documents, entrance testing, dates | 200, fetched |
| S15 | https://www.charlottecountryday.org/bucsnet/quick-reference | Parent Quick Reference Guide — ERP summary; tutoring as an incidental charge | 200, fetched |
| S16 | https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/erb-testing-what-parents-need-to-know | Understanding ERB Testing — ERB not used for accommodations | 200, fetched |
| S17 | https://www.charlottecountryday.org/cd-education/international-studies | International Studies — "full-time English as a Second Language program" | 200, fetched |
| S18 | https://www.charlottecountryday.org/employment | Employment — three open ERP postings | 200, fetched |
| S19 | https://www.charlottecountryday.org/about/history/news-details-page-history/~board/general-timeline-board/post/double-our-counseling-staff | History timeline — 2023 counseling expansion | 200, fetched |
| S20 | https://www.charlottecountryday.org/admissions/tuition-financial-aid | Tuition & Financial Aid — "tutoring" as an optional service, no price | 200, fetched |
| S21 | https://www.charlottecountryday.org/uploaded/country_day_education/college_guidance/CCDSCollegeProfileFINAL.pdf | School Profile — **dated 2015-2016** (names a former head of school) | 200, PDF — **stale, not rendered** |
| S22 | https://www.charlottecountryday.org/uploaded/BucsNet/ERP/Psychoeducational_Evaluation_Report_Policy_2015-16_website.pdf | 2015-16 evaluation policy (the dossier's source) | 200, PDF — **superseded by S6, not rendered** |
| S23 | https://www.charlottecountryday.org/uploaded/BucsNet/ERP/Approved_Accommodations_revised_for_BucsNet.pdf | Approved Accommodations, revised August 2016 (the dossier's source) | 200, PDF — **superseded by S8, not rendered** |
| S24 | https://www.charlottecountryday.org/uploaded/BucsNet/ERP/Psychologist_referral_list_2016-17.pdf | 2016–2017 referral list (the dossier's source) | 200, PDF — **superseded by S7, not rendered** |

S22–S24 are still hosted at their old `/uploaded/` paths but are **no longer linked** from
the ERP pages, which link S6–S8 instead. They are recorded so the dossier's citations can be
traced, and nothing from them reaches the app.

## Fees (published — the dossier said NOT STATED)

| Item | School wording | Amount | Unit | Source |
|---|---|---|---|---|
| Lower School ERP session (JK–4) | "Sessions are billed at  $82 per 45-minute session . Parents are billed through the student’s account by the Business Office." | $82 | per 45-minute session | S2 |
| Middle School ERP session (5–8) | "Sessions are billed at  $85 per session . Parents are billed through the student’s account by the Business Office." | $85 | per session (length not stated) | S3 |
| Upper School academic coaching (9–12) | "Coaching is billed at  $85 per session . Parents are billed through the student’s account by the Business Office." | $85 | per session (length not stated) | S4 |
| Missed session | "Any session missed or cancelled without a 24-hour notice will be billed to the parent." | session rate | — | S2–S4 |
| OT screening | "There will be a fee of $25 for each screening." Paid to Southern Piedmont Pediatric Therapy. | $25 | per screening | S9b |
| Speech-language screening | "The cost for this screening is $25.00 per child" Paid to TerrificTalkers. | $25.00 | per child | S9c |
| OT / speech therapy | "all financial arrangements will be between you and Southern Piedmont Pediatric Therapy" / "between you and Kimberly Binford Mannion, owner" | NOT STATED | — | S9b, S9c |
| Psychoeducational evaluation | "Families are responsible for the cost of psychoeducational evaluations. The school offers a range of provider options, some accepting insurance and available at varying price points, and financial aid options are available for qualifying families." | NOT STATED | — | S6 |

No school year is printed beside the rates. The pages were fetched 2026-10-25, so treat them
as the rates published for 2026–27. MS and US sessions do not state a length.

## Staff (names and titles as the school publishes them; emails from the directory's `FS.util.insertEmail` or the page's own `mailto:`)

| Name | Title (directory) | Division | Email | Directory id / where |
|---|---|---|---|---|
| Sherry Harris | Director of Lower School ERP | LS | sherry.harris@charlottecountryday.org | 3675; also S2 contact block |
| Leigh Bowles | Learning Specialist | LS | leigh.bowles@charlottecountryday.org | S2 insertEmail 23409 |
| Stuart Deets | Learning Specialist | LS | stuart.deets@charlottecountryday.org | S2 insertEmail 47762 |
| Mattie Gibson | Learning Specialist | LS | mattie.gibson@charlottecountryday.org | S2 insertEmail 51373 |
| Ann Grajales | Learning Specialist | LS | ann.grajales@charlottecountryday.org | S2 insertEmail 51371 |
| Karen Muller | Learning Specialist | LS | karen.muller@charlottecountryday.org | S2 insertEmail 33999 |
| Jennifer Ott | Learning Specialist | LS | jennifer.ott@charlottecountryday.org | S2 insertEmail 50291 |
| Catherine Upchurch | Learning Specialist | LS | catherine.upchurch@charlottecountryday.org | S2 insertEmail 8974 |
| Courtney Wawak | Learning Specialist | LS | courtney.wawak@charlottecountryday.org | S2 insertEmail 37868 |
| Mary Whisnant | Learning Specialist | LS | NOT PUBLISHED (no insertEmail on S2) | S2 |
| Jennie Roberts Creason | Reading Specialist/Literacy Coach | LS | jennie.roberts@charlottecountryday.org | 39746 |
| Laura Hayes | Director of Middle School ERP | MS | laura.hayes@charlottecountryday.org | 3677; also S3 contact block |
| Kim Bender | Learning Specialist | MS | kim.bender@charlottecountryday.org | 8986 |
| Terri Bennett | Learning Specialist | MS | terri.bennett@charlottecountryday.org | S3 insertEmail 18022 |
| Jacquelyn Coble | Learning Specialist | MS | jacquelyn.coble@charlottecountryday.org | S3 insertEmail 50140 |
| Krista Groncki | Learning Specialist | MS | krista.groncki@charlottecountryday.org | S3 insertEmail 7110 |
| Lisa Miller | Learning Specialist | MS | lisa.miller@charlottecountryday.org | S3 insertEmail 49992 |
| Hasson Perkins | Learning Specialist | MS | hasson.perkins@charlottecountryday.org | S3 insertEmail 33844 |
| Kevin Quesenberry | Learning Specialist | MS | kevin.quesenberry@charlottecountryday.org | S3 insertEmail 49575 |
| Krista Roth | Learning Specialist | MS | krista.roth@charlottecountryday.org | S3 insertEmail 37442 |
| Ashley Swistak | Learning Specialist | MS | ashley.swistak@charlottecountryday.org | S3 insertEmail 30905 |
| Bailey Turner | Learning Specialist | MS | bailey.turner@charlottecountryday.org | 48757 |
| Lauren Folger-Sweeting | Director of Upper School ERP | US | lauren.sweeting@charlottecountryday.org | 19869 (directory). **The S4 contact block prints `lauren.folger-sweeting@charlottecountryday.org`** — two published spellings; use the directory's per the README rule and ask the school |
| Jennifer Achilles | Academic Coach | US | jennifer.achilles@charlottecountryday.org | S4 insertEmail 48325 |
| Chad Groncki | Academic Coach | US | chad.groncki@charlottecountryday.org | S4 insertEmail 50281 |
| Kristen Rinehart | Academic Coach | US | kristen.rinehart@charlottecountryday.org | 30587 |
| Danielle Riviere | Academic Coach | US | danielle.riviere@charlottecountryday.org | S4 insertEmail 33994 |
| Dr. Danielle Dixon Scott | Director of Health & Wellness | Staff | danielle.scott@charlottecountryday.org | 39526 |
| J.G. Bailey | Director of Lower School Counseling | LS | jg.bailey@charlottecountryday.org | 3549; S10 mailto |
| Aleya Willis | Lower School Counselor | LS | aleya.willis@charlottecountryday.org | 39745; S10 mailto |
| Janani Buford | Director of Middle School Counseling | MS | janani.buford@charlottecountryday.org | 3576. **S10's mailto is misspelled** (`@charlotteountryday.org`); the directory's is correct |
| Jo Malveaux | Middle School Counselor (directory spells it "Counsleor") | MS | jo.malveaux@charlottecountryday.org | 39262; S10 mailto |
| Samantha Bosco | Director of Upper School Counseling | US | samantha.bosco@charlottecountryday.org | 3568; S10 mailto |
| Mallika Rajan | Upper School Counselor | US | mallika.rajan@charlottecountryday.org | 39726; S10 mailto |
| ChaChi Sullivan | Assistant Director of Athletics, Student Health | Staff | chachi.sullivan@charlottecountryday.org | 40004; S10 mailto |
| Gwen Nix | RN, BSN — Cannon Campus nurse | LS | gwen.nix@charlottecountryday.org | S10 mailto |
| Sharon Ferris | RN, BSN, BA — Cannon Campus nurse | LS | Sharon.Ferris@charlottecountryday.org | S10 mailto |
| Wendy Barber | RN, BSN, BA — Bissell Campus nurse | MS/US | Wendy.Barber@charlottecountryday.org | S10 mailto |
| Meredith Schulz | RN, BSN — Bissell Campus nurse | MS/US | Meredith.Schulz@charlottecountryday.org | S10 mailto |
| Hannah Wagner | English and ESL Teacher | US | hannah.wagner@charlottecountryday.org | 48271 |

Shared inboxes published on S10: `nurses@charlottecountryday.org`, `health@charlottecountryday.org`.

**Outside providers (named on school-linked PDFs; not school employees).**
- Occupational therapy: "Jeanmarie Tommasulo and her associates", Southern Piedmont Pediatric
  Therapy. "Jeanmarie and her associates operate independently of Charlotte Country Day and
  are not employees of the school." "OT’s are on campus 1-2 days per week." (S9b). No email
  published.
- Speech-language: "Kimberly Binford Mannion, M.A.-SLP-CCC", TerrificTalkers, whose
  pathologists "operate independently of this school and are not employees of the school."
  (S9c). No email published (a Zelle phone number only).

**Open ERP postings (S18):** "Educational Resource Program, Lower School Learning Specialist";
"Educational Resource Program, Upper School Academic Coach (9th Grade)"; "Educational
Resource Program, Upper School Academic Coach (10th Grade)".

**Roster counts.** ERP: 3 directors + 9 LS learning specialists + 10 MS learning specialists
+ 4 US academic coaches = **26**, plus the LS Reading Specialist/Literacy Coach = **27
learning staff**. Counseling: **6 divisional counselors** (3 titled Director), plus ChaChi
Sullivan in Athletics. Nurses: **4** ("Two full-time nurses on each campus"). Director of
Health & Wellness: 1. ESL teacher: 1.

## S1 — Educational Resource Program (verbatim)

```
The Educational Resource Program (ERP) assists students in grades junior kindergarten through grade 12 by providing individualized support and comprehensive academic resources, and extensive guidance for students, parents, and faculty to build life-long habits and individual achievements. The focus is on helping students successfully navigate Country Day's curricular expectations and maximize academic potential.
Program Overview
Current research provides an ever-developing understanding of how the brain affects learning. Country Day's Educational Resource Program (ERP) integrates research-informed practices to support students in all grades and divisions by developing foundational, academic, and executive function skills through differentiated learning practices. The ERP also serves as a primary resource for parents and teachers to support the diverse learning styles of our students.
Celebrating diverse learning styles and empowering students to become confident, independent learners.
The Educational Resource Program is a secure, judgment-free, positive learning environment where we foster a child’s intellectual ability to meet their educational needs. We achieve this by constantly thinking outside the box to help students meet their learning targets and celebrate their successes.
Our Program
Lower School
Middle School
Upper School
Lower School
In Lower School, our Educational Resource learning specialists apply their specialized training in learning differences to support students during their early learning. Our team consists of knowledgeable professionals with degrees, specialized training, and experience to help students with learning challenges. In addition, our tutors have current knowledge about our curriculum and grade level expectations which enhances their ability to support our students. The ERP team work together to determine students’ academic abilities and limitations. If it is determined that a student needs additional support, the ERP Director and tutor develop an appropriate course of action to address the areas of weakness.
The Lower School ERP offers:
Individualized, one-to-one tutoring and small group multisensory instruction focused on literacy and math skills development. This framework is valuable in addressing potential gaps in understanding and mastery of basic learning skills in the early grades.
Speech-language and occupational screenings and therapy. Speech-language and occupational therapists play an important role in literacy development. Services from outside professionals may be recommended to assist in providing a more comprehensive educational plan for students.
We employ hourly tutors who provide individual tutoring sessions before, during, or after the school day, and parents are billed through their child's student account by the Business Office. All of our tutors are experienced and knowledgeable about content, skills, and curricular expectations.
Middle School
As students continue to grow as learners in the Middle School, our ERP team collaborates with teachers, advisors, and parents to support students who are experiencing general academic difficulties related to challenges with work organization, time management, reading /writing efficiency, problem-solving strategies, attention issues, and/or learning differences.
Our dedicated learning specialist work one-on-one with students to help them recognize and utilize their strengths as they learn and apply strategies to become more independent learners. Tutors use their expertise and curricular knowledge as they incorporate individualized learning skills and strategies into subject-specific instruction and reinforcement. Tutor-student relationships are designed to help bolster self-advocacy, self-esteem, and confidence as students are encouraged to be engaged and active partners in the learning process.
We employ hourly tutors who provide individual tutoring sessions before, during, or after the school day, and parents are billed through their child's student account by the Business Office. All of our tutors are experienced and knowledgeable about content, skills, and curricular expectations.
Upper School
In the Upper School, our academic coaches assist students who need additional support and review in content areas and executive functioning skills. Students are supported in their academic journey to become independent learners and self-advocates. The ERP assists in requesting accommodations with the College Board, ACT, and IB.
We employ hourly tutors who provide individual tutoring sessions before, during, or after the school day, and parents are billed through their child's student account by the Business Office. All of our tutors are experienced and knowledgeable about content, skills, and curricular expectations.
```

## S2 — BucsNet: Lower School ERP (verbatim)

```
Learning Support for Grades JK–4
Building strong foundations for lifelong learning
Through individualized, science-based instruction, our Lower School Learning Specialists help students develop confidence, skills, and a love of learning in reading, writing, and math.
Enroll in Learning Support Services
View Session Notes
Academic Accommodations & Support
What We Do
The Lower School Learning Support program supports students in grades K–4 through individualized, science-based instruction in reading, writing, and math. Our team includes Learning Specialists, a full-time Reading Specialist and Literacy Coach for early literacy, and contracted Occupational and Speech Therapists who provide additional services during the school day.
All specialists bring advanced training, including Orton-Gillingham, and a deep understanding of the Lower School curriculum and grade-level expectations. Working in close partnership with teachers and families, we provide targeted instruction that builds academic skills, nurtures confidence, and helps each child develop a deeper understanding of themselves as a learner.
Areas of Focus for Grades JK–4
Reading
Writing
Math
How It Works
Identification
Students are identified for support based on benchmark assessments given at the beginning, middle, and end of the school year. Data analysis meetings with the Literacy Leadership Team determine which tier of support is most appropriate.
Tier 1 Support
Classroom teachers provide differentiated strategies with consultation from the ERP Director and Student Support Team.
Tier 2 Support
For K–1 students, the Reading Specialist provides small-group literacy instruction.
Tier 3 Support
For K–4 students, Learning Specialists provide one-on-one support in reading, writing, and math, typically twice per week. Support can be adjusted or discontinued as students show growth on benchmarks and in the classroom. A psychoeducational evaluation is not required for services.
Why It Works
Our vision is to create a learning community where every student feels seen, supported, and empowered to succeed. By combining research-based methods, compassionate relationships, and consistent collaboration with classroom teachers, the Lower School Learning Support program helps students build confidence and resilience as learners.
Specialists individualize instruction to each student’s profile, fostering not only academic growth but also social-emotional development and independence.
Backed by Research
Our program is grounded in well-established research:
Orton-Gillingham Approach
Explicit, systematic, and multi-sensory instruction builds strong foundations in reading, writing, and comprehension.
Supported by the National Reading Panel’s findings on phonemic awareness, phonics, fluency, and comprehension.
Hochman Method (The Writing Revolution)
Explicit instruction in sentence construction improves reading fluency and comprehension.
Teaching planning, revising, and editing has consistent positive effects on writing across grade levels.
Based on cognitive science and working memory research, ensuring strategies are effective and lasting.
Multi-Sensory Math
Uses hands-on manipulatives, explicit language and multi-sensory engagement to connect math concepts to multiple sensory experiences.
Moves from tangible objects to symbolic representations, allowing for deeper conceptual understanding.
Strengthens memory pathways and builds mathematical reasoning before emphasizing procedural fluency.
Together, these approaches provide a structured, evidence-based foundation for literacy, math, and lifelong learning.
Academic Accommodations and Learning Support
Country Day offers school-based accommodations for students with documented disabilities. Our process ensures equitable access to both classroom learning and assessment while maintaining our academic expectations and standards.
Learn more   in greater detail about  academic accommodations, psychoeducational evaluations, and how students receive accommodations .
Helpful Links
Approved Classroom Accommodations
Consent for Assessment
OT Therapy Screening
Speech and Language Teacher Referral
Speech and Language Screening Form
Psychoeducational Evaluation Report Policy
Psychoeducational Provider Referral List
Program Policies
Scheduling & Availability
Cancellations
Cost
Learning Specialists' Notes
Scheduling & Availability
Sessions are a permanent part of student schedules and are scheduled during language-based special area classes or core classroom time.
Cancellations
The ERP has a 24-hour cancellation and rescheduling policy. Any session missed or cancelled without a 24-hour notice will be billed to the parent. If a student is sick or absent from school and the parent cannot provide a 24-hour notice, there is no charge if the student notifies the coach at the start of the school day (8 am).
Cost
Sessions are billed at  $82 per 45-minute session . Parents are billed through the student’s account by the Business Office.
Learning Specialists' Notes
Notes from each tutoring session are accessible from the  Parent Portal  and are typically posted within 48 hours of a student's session. Read  instructions on how and where to access your tutoring notes .
Connect with Us
We are here to help. If you have questions about learning support, accommodations, or how the ERP can support your student, please reach out:
Sherry Harris
Lower School ERP Director
(704) 943-4550
sherry.harris  @charlottecountryday.org
Leigh Bowles
Learning Specialist
Lower School
School:
704-943-4966
Stuart Deets
Learning Specialist
Lower School
School:
704-943-4968
Mattie Gibson
Learning Specialist
Lower School
Ann Grajales
Learning Specialist
Lower School
Sherry Harris
Director of Lower School ERP
Lower School
School:
704-943-4550
Karen Muller
Learning Specialist
Lower School
School:
704-943-4911
Jennifer Ott
Learning Specialist
Lower School
School:
704-943-4909
Catherine Upchurch
Learning Specialist
Lower School
School:
704-943-4969
Courtney Wawak
Learning Specialist
Lower School
School:
704-943-4585
Mary Whisnant
Learning Specialist
Lower School
School:
704-943-4910
```

## S3 — BucsNet: Middle School ERP (verbatim)

```
Learning Support for Grades 5–8
Helping Students Grow as Learners
Through one-on-one support, our Learning Specialists guide students in building skills, confidence, and independence while staying connected to the demands of the middle school curriculum.
Enroll in Learning Support Services
View Session Notes
Academic Accommodations & Support
What We Do
The Middle School Learning Support program provides one-on-one support to students in grades 5–8, both with and without formal testing. Specialists blend content instruction with executive skills, helping students strengthen core skills like writing, math, and reading comprehension within the context of their coursework. Of equal importance, they simultaneously help students build awareness of themselves as learners—fostering confidence, independence, and resilience.
Areas of Focus
Reading comprehension
Writing
Math
Executive skills (organization, planning, study routines)
General academic support
Spanish/French (as available)
How It Works
Students typically meet with a Learning Specialist  two or three times per cycle  (on average once or twice per week).
Sessions are scheduled during study halls, DEAR or drama (5th/6th only), and/or lunch/recess.
Learning Support is a permanent part of the student’s schedule and can only be dropped or added through a formal schedule change.
Students work with the same Learning Specialist on consistent cycle days, building routine, rapport, and continuity.
Why It Works
Learning Specialists become true partners in a student’s growth. Many students work with the same specialist for several years, developing strong rapport and trust.
Specialists work closely with classroom teachers and track assignments in Google Classroom to ensure support aligns fully with curriculum and expectations.
Sessions are individualized to meet each student’s learning and developmental needs.
Specialists provide regular feedback to both parents and teachers, creating a connected, transparent support system.
Backed by Research
Our approach is grounded in research on:
Executive functioning
Metacognition and reflection
Reading, writing, and math skill development
The benefits of individualized, one-on-one support
This research shows that targeted, consistent practice helps students build independence, confidence, and transferable learning skills.
Learning Specialists' Notes
Notes from each tutoring session are accessible from the  Parent Portal  and are typically posted within 48 hours of a student's session. Read  instructions on how and where to access your tutoring notes .
Program Policies
Scheduling & Availability
Cancellations
Cost
Scheduling & Availability
Sessions are scheduled by the Director based on student and Learning Specialist availability.
Sessions are a permanent part of student schedules and begin on the first day of school.
Sessions are treated as class periods.
Cancellations
The ERP has a 24-hour cancellation and rescheduling policy. Any session missed or cancelled without a 24-hour notice will be billed to the parent. If a student is sick or absent from school and the parent cannot provide a 24-hour notice, there is no charge if the Learning Specialist is notified by the start of the school day (8 am).
Cost
Sessions are billed at  $85 per session . Parents are billed through the student’s account by the Business Office.
Connect with Us
We are here to help. If you have questions about learning support, accommodations, or how the ERP can support your student, please reach out:
Laura Hayes
Middle School ERP Director
(704) 943-4835
laura.hayes  @charlottecountryday.org
Kim Bender
Learning Specialist
Middle School
School:
704-943-4983
Terri Bennett
Learning Specialist
Middle School
School:
704-943-4981
Jacquelyn Coble
Learning Specialist
Middle School
Krista Groncki
Learning Specialist
Middle School
School:
704-943-4987
Laura Hayes
Director of Middle School ERP
Middle School
School:
704-943-4835
Lisa Miller
Learning Specialist
Middle School
School:
704-943-4984
Hasson Perkins
Learning Specialist
Middle School
School:
704-943-4985
Kevin Quesenberry
Learning Specialist
Middle School
School:
704-943-4982
Krista Roth
Learning Specialist
Middle School
Ashley Swistak
Learning Specialist
Middle School
School:
704-943-4986
Bailey Turner
Learning Specialist
Middle School
```

## S4 — BucsNet: Upper School ERP / Academic Coaching (verbatim)

```
Educational Resources Program (ERP)
Academic Coaching Grades 9–12
Academic coaching blends executive skills with course support so students build strategies, confidence, and independence, learning how to manage their work and take ownership of their success.
Enroll in Academic Coaching
Viewing Academic Coaching Notes
Academic Accommodations & Support
Our Coaching Approach
Academic coaching at Country Day is a one-on-one partnership. Coaches help students build executive skills (planning, organization, time management, study strategies, and self-monitoring) while applying those skills directly in coursework.
Our approach was created at Country Day and is continually refined by our ERP team through ongoing professional development in the latest research on learning, reading, and writing. Inspired by respected coaching models, it remains tailored and updated to meet the needs of our students.
Not every subject is coached, and availability for advanced courses depends on staffing.
Areas of Focus for Academic Coaching for Grades 9–12
Grade 9 (Across Core Classes)
In 9th grade, each student is paired with one academic coach who supports them in all core subjects: English, History, Math, and Science. This model helps students start high school with consistent habits and a foundation for independence.
Grades 10–12 (By Subject/Focus Area)
For students in grades 10–12, ERP coaching is organized by focus area so that students can receive coaching within the academic contexts where they most need support:
Humanities Coaching  supports students as they manage the executive functioning demands of English, history, writing-heavy courses, reading comprehension, long-term assignments, essay planning, studying for content-based assessments, and discussion- or text-based classes.
STEM Coaching  supports students as they manage the executive functioning demands of math, science, test preparation, study routines, multi-step problem solving, concept review, and organizing work that requires accuracy, sequencing, and follow-through.
Coaching availability varies by term and depends on staff scheduling.
Academic Coaching vs. Tutoring
Parents often ask how coaching is different from tutoring. While both offer support, the focus and outcomes are not the same.
Tutoring  usually centers on re-teaching material or helping a student “get through” specific assignments. A  tutor  may review homework, explain a concept again, or practice problems until the student can complete them.  Tutoring can be valuable in the short term, but it often stays limited to content support only.
Academic Coaching is designed to go further. A coach:
Uses the student’s current coursework as the practice ground.
Explicitly teaches executive functioning skills (planning, organization, time management, study routines, self-monitoring).
Coaches the process, not just the product—guiding students in how to approach challenges, break down tasks, and reflect on what worked.
Builds independence and confidence, so students can carry strategies into every subject.
Provides consistent feedback and notes through the Parent Portal.
Program Policies
Scheduling & Availability
Cancellations
Session Expectations
Start & Schedule Changes
Cost
Scheduling & Availability
Coaching is scheduled on a first-come, first-served basis and begins after the first day of school as staffing allows. While we value established relationships, scheduling limitations may make it difficult to honor specific requests.
Cancellations
The ERP has a 24-hour cancellation and rescheduling policy. Any session missed or cancelled without a 24-hour notice will be billed to the parent. If a student is sick or absent from school and the parent cannot provide a 24-hour notice, there is no charge if the student notifies the coach at the start of the school day (8 am).
Session Expectations
Students should treat coaching sessions as a regular class period. Meetings with teachers, test taking, or extra help should be arranged outside of the coaching session.
Start & Schedule Changes
Upper School coaching does not begin on the first day of school. Enrollment is finalized by the first day, and after the first day, no schedule changes can be made until after the first progress report.
Cost
Coaching is billed at  $85 per session . Parents are billed through the student’s account by the Business Office.
How Coaching Works
Coaching Partnership
Academic coaching is a collaborative process. Coaches don’t just provide answers: they ask questions, model strategies, and guide students to make choices that build independence.
Grounded in Coursework
Each session uses a student’s current coursework as the practice ground, teaching executive skills in context, so strategies stick and transfer.
The Coaching Cycle
Set Goals Together:  Student and coach identify priorities for the session.
Coach Through the Work:  Students apply strategies directly in coursework with the coach’s guidance.
Reflect & Plan Ahead : Students leave with a clear action plan, captured in coaching notes.
Consistent Feedback:  Parents can view session notes in the Parent Portal, summarizing strategies practiced and next steps.
Why Academic Coaching Works
Coaching gives students a structured, supportive space to learn how to learn. In one-on-one sessions, classwork becomes the practice space for building habits great learners use every day:
Planning and prioritizing  — mapping out what matters, when it’s due, and how to tackle it.
Follow-through and organization  — keeping materials straight, tracking deadlines, and finishing what you start.
Effective study and test prep  — using proven strategies to actually remember what you learn.
Problem-solving mindset  — breaking big tasks into steps, adjusting when something isn’t working.
Self-advocacy  — communicating with teachers, clarifying expectations, and using accommodations appropriately.
Ownership and independence  — reflecting on what worked and setting next steps.
Because students can practice these skills in a safe environment, they’re more willing to take risks, ask questions, and grow.  The goal is stronger performance now, less stress, and lifelong habits that transfer to college, careers, and beyond.
Research-Informed, Student-Focused
Our coaching approach is informed by the latest research in:
Executive functioning  – planning, organization, time management, and self-monitoring.
Learning science  – evidence-based strategies such as retrieval practice, spaced practice, and interleaving.
Reading and writing research for high schoolers  – best practices for comprehension, analysis, structured writing, and the development of academic language.
Metacognition  – helping students reflect on how they learn and adjust their strategies.
One-on-one coaching  – consistent support builds independence and accountability over time.
This research foundation ensures that students are not only learning course content but also developing the lifelong skills that allow them to thrive in high school, college, and beyond.
Connect with Us
We are here to help. If you have questions about academic coaching, accommodations, or how the ERP can support your student, please reach out:
Lauren Folger-Sweeting
Upper School ERP Director
(704) 943-4773
lauren.folger-sweeting@charlottecountryday.org
Jennifer Achilles
Academic Coach
Upper School
Lauren Folger-Sweeting
Director of Upper School ERP
Upper School
School:
704-943-4773
Chad Groncki
Academic Coach
Upper School
Kristen Rinehart
Academic Coach
Upper School
Danielle Riviere
Academic Coach
Upper School
```

## S5 — BucsNet: Academic Accommodations and Learning Support (JK–12) (verbatim)

```
Educational Resources Program (ERP)
Academic Accommodations and Learning Support (JK–12)
Country Day offers school-based accommodations for students with documented disabilities through our Educational Resource Program (ERP). Our process ensures equitable access to both classroom learning and assessment while maintaining our academic expectations and standards.
To receive accommodations:
A licensed service provider must  document disabilities through a full psychoeducational evaluation .
Students are eligible only for  Country Day-approved accommodations; accommodations outside this list are not granted .
Approved accommodations are documented in the student’s Confidential Academic Plan (CAP).
Policies are consistent across Lower, Middle, and Upper School.
Psychoeducational evaluations must be current
Reviewed every  three years in Lower and Middle School
Reviewed every  four years in Upper School
All full psychoeducational reports must be submitted through ERP’s secure online submission form. We are unable to accept reports via email, fax, or through families. Uploaded reports should not be password-protected.
Policy on Psychoeducational Evaluations
Provider Referral List
County Day Approved Accommodations
View Your Student's Confidential Academic Plan (CAP)
Understanding Academic Accommodations
What is a Psychoeducational Evaluation?
What are Accommodations?
How Do Students Receive Accommodations?
What Does This Look Like in College?
What is a Psychoeducational Evaluation?
A psychoeducational evaluation is a comprehensive assessment by a licensed psychologist that shows how a student learns. It examines:
Thinking skills  – memory, processing speed, problem-solving
Academic skills  – reading, writing, math
Other areas  – executive functioning or emotional factors, as needed
We require a full psychoeducational evaluation because it:
Identifies learning strengths and challenges
Determines whether a learning disability, ADHD, or other condition is present
Provides data to design effective, research-based instruction and supports
Is the only evaluation accepted for formal accommodations
A simple doctor’s note or medical diagnosis (e.g., ADHD or anxiety) does not provide enough information to justify accommodations.
What are Accommodations?
Accommodations change  how  a student accesses learning—not  what  they are expected to learn. They help remove barriers so students can show what they know and work to their full potential.
Key Points About Accommodations:
Do  not  lower academic expectations.
Provide access, not advantage—they level the playing field without changing the rigor.
Must be supported by data from a psychoeducational evaluation.
Only accommodations from Country Day’s  approved list  are provided to ensure:
Fairness and consistency across the school
Alignment with research and legal guidelines
Smooth transition to standardized testing and college systems
How Do Students Receive Accommodations?
Teachers and Learning Support staff review each student’s psychoeducational profile and recommended accommodations. Teachers implement accommodations in the classroom, and all faculty have access to the student’s Confidential Academic Plan (CAP) via the secure faculty portal. The full evaluation is available in the ERP Director’s office for any staff member working with the student.
Lower School (JK–4):
Teachers implement accommodations in the classroom.
Focus is on structure, routine, and foundational skills.
Ongoing communication between teachers, families, and ERP ensures consistency.
Middle School (5–8):
Teachers continue to provide accommodations.
Students begin learning what strategies help them.
ERP supports teachers and coaches students in early self-advocacy.
Upper School (9–12):
Students are expected to communicate with teachers to receive accommodations.
ERP coaches help students develop self-advocacy and reach out as needed.
For AP or IB classes and exams, accommodations must also be approved by College Board or IB; approval is not automatic.
Note: Accommodations must be documented in a current CAP following a full psychoeducational evaluation with a diagnosis.
Our Ultimate Goal:
To help students identify the accommodations that truly support their learning and develop the self-advocacy skills they will need for college and beyond.
What Does This Look Like in College?
Accommodations are still available in college, but the process becomes  student-driven . Students register with the college’s Accessibility or Disability Services Office, submit current psychoeducational testing, and explain how their learning profile affects them. Once approved, colleges may provide support such as:
Extended time on tests
Reduced-distraction testing centers
Note-taking technology
Priority registration
Housing accommodations
Some students use accommodations consistently, especially for testing, while others use them only as needed. What colleges value most is that students understand themselves as learners and can advocate for their needs. Students who communicate clearly, use resources wisely, and take ownership of their learning are often seen as confident, mature, and well-prepared.
This is why Country Day gradually builds independence and self-advocacy skills—so students leave ready to navigate college successfully and fully take advantage of available support.
Classroom and Testing Accommodations
Students with an approved evaluation may use accommodations during:
Daily coursework and quizzes
Country Day-administered exams, including midterms and finals
These accommodations provide  access to learning  but do  not  change academic expectations.
Standardized Testing (PSAT, AP, SAT, ACT)
Accommodations for standardized tests must be approved separately by the College Board or ACT; Country Day accommodations do  not  automatically transfer.
Helpful Links
Upper School families can find details on how to apply for testing accommodations through the resources linked below:
Standardized Testing
College Board: How to Apply
ACT: How to Apply
```

## S6 — Policy on Psychoeducational Evaluations (current PDF, 4 pp., full transcription)

```
ERP
Policy on Psychoeducational Evaluations

What is a Psychoeducational Evaluation?
A psychoeducational evaluation is a comprehensive assessment conducted by a
licensed psychologist or qualified professional to understand a student's cognitive,
academic, and psychological functioning. It typically includes standardized testing to
assess intellectual abilities, academic achievement, memory, processing speed, executive
functioning, and emotional or behavioral functioning. Common assessments may include
the Wechsler Intelligence Scale for Children (WISC), the Wechsler Individual Achievement
Test (WIAT), and the Behavior Assessment System for Children (BASC). This evaluation
identifies learning strengths and challenges, including specific learning disorders (SLD),
ADHD, and other neurodevelopmental conditions.

Difference Between a Psychoeducational Evaluation and Medical Diagnoses:

•   Psychoeducational Evaluation: Focuses on how a student learns and functions
academically and cognitively within an educational setting. It informs instructional
strategies, academic supports, and accommodations in school.

•   Medical or Psychological Diagnoses (Carolina attention?): Provided by medical
doctors or clinical psychologists, these diagnoses focus on clinical treatment and
medical management, such as guiding medication use. However, they do not
provide the comprehensive cognitive and academic data necessary for designing
effective, research-based educational interventions and legally appropriate
accommodations. A full psychoeducational evaluation is essential for
understanding how a student learns and for developing tailored instructional
strategies and supports.

Policy on Evaluation Validity:

•   Lower School (Grades K-5): Valid for 3 Years

o   Young students experience rapid cognitive, emotional, and academic
development. Frequent reassessment ensures that interventions and
accommodations evolve alongside the child’s growth and changing needs.

o   Early identification and adjustment of support strategies are crucial to
building foundational skills and preventing academic gaps.

o   Testing may be initiated by families or recommended by the school based on
observed needs. Initial testing typically follows a structured problem-solving
              process where classroom strategies have been tried, and additional support
is needed.

o   As a student's evaluation nears expiration, the division director will do their
best to notify families; however, it is the family's responsibility to ensure
evaluations are updated in a timely manner. Without updated testing,
students will no longer be eligible for accommodations.

o   Students who have a Speech and Language Evaluation, Occupational
Therapy Evaluation, or Auditory Processing Evaluation may receive school
approved accommodations for one year.

•   Middle and Upper School (Grades 6-12): Valid for 4 Years

o   Cognitive and academic growth is more gradual in adolescence, making a 4-
year interval appropriate.

o   As students mature, they develop more stable learning profiles, and
interventions tend to focus on refining executive functioning, self-advocacy,
and subject-specific strategies.

o   A 4-year window accommodates transitions between school divisions (e.g.,
middle to upper school) and prepares students for post-secondary planning
with updated documentation.

o   All testing must be submitted to the school at least 7 business days prior to
reading day to be eligible to use the accommodations on exams.

Rationale for Retesting:

•   Academic and Skills-Based Insight: Updated evaluations provide critical data on a
student's current cognitive and academic functioning, allowing for tailored
instructional support.

•   Informed Accommodations: Retesting ensures accommodations remain relevant
and effective, supporting the student's evolving learning profile.

•   Progress Monitoring: Evaluations highlight growth areas and persistent challenges,
guiding targeted interventions.

Roles and Responsibilities

Teachers and Learning Support
   •   Expected to review and understand each student's psychoeducational profile and
recommended accommodations.

•   Responsible for implementing appropriate accommodation

•   Teachers and Learning Support team members have access to each student's
Confidential Academic Plan (CAP) through the secure faculty portal. The
full psychoeducational evaluation report is available for review in the Director's
office for any faculty member working with the student.

Parents:

•   Parents have access to their child's Confidential Academic Plan (CAP) through the
parent portal for ongoing review of accommodations and support strategies (in US)

•   Division directors notify families as evaluation expiration approaches to prompt
scheduling of updated testing.

•   Families are responsible for the cost of psychoeducational evaluations. The school
offers a range of provider options, some accepting insurance and available at
varying price points, and financial aid options are available for qualifying families.

•   By enrolling at CCDS, families acknowledge their responsibility to maintain
current psychoeducational evaluations to ensure the continuation of
accommodations.

Students:

•   As they progress through divisions, students will be encouraged and supported in
understanding their learning profiles.

•   Emphasis on developing self-advocacy skills to independently manage
accommodations and learning strategies, preparing them for lifelong learning and
post-secondary success.

•   Students must have a current psychoeducational evaluation and an active
Confidential Academic Plan (CAP) in place to be eligible for standardized testing
accommodations (e.g., SAT, ACT) as a student at CCDS.

Temporary Accommodations:

•   In Middle and Upper School, students with a documented mental health diagnosis
may receive temporary accommodations through collaboration with the school
counselor while awaiting a full psychoeducational evaluation. Families should work
directly with the school counselor to initiate this process.
```

## S7 — Preferred Providers for Psychoeducational Testing, "Update January 2026" (full transcription)

```
Preferred Providers for Psychoeducational Testing
Update January 2026

Jennifer McConnell
Ballantyne Well+Being
13950 Ballantyne Corporate Place, Suite 155
Charlotte, NC 28277
jennifer@bewellcharlotte.com
contact@bewellcharlotte.com
(704) 216-4680

Dr. Lisa Pennington and Dr. Kensleigh Hogan
Carolina Minds
6729 Fairview Rd.; Suite E Charlotte, NC 28210
info.carolinaminds@gmail.com
(704) 362-3123

Dr. Josefine Eriksson
Alderwood Psychological Services
10724 Carmel Commons Blvd., Suite 510
Charlotte, NC 28226
drjosefine@alderwoodpsych.com
(704) 750-1602

Dr. Hannah Harrison
7300 Carmel Executive Park Drive, Suite 110
Charlotte, NC 28226
hannah.harrison@gmail.com
(980) 297-3542
Insurance Accepted
Dr. Karen Crane
5970 Fairview Road, Suite 412
Charlotte, NC 28210
karen@drkarencrance.com
(704) 458-8188

Dr. Amy Johnson
5970 Fairview Road, Suite 412
Charlotte, NC 28210
dramyfjohnson@gmail.com
(704) 222-1150

Dr. Gretchen Hunter
Child and Family Development
4012 Park Road, Suite 200
Charlotte, NC 28209
(704) 332-4834
```

## S8 — Approved Accommodations (current PDF, 1 p.; text checked against a rendered image)

```
Approved Accommodations
The accommodations listed below are the only ones formally provided by the school. While outside providers
may suggest additional supports, these are considered recommendations and are not mandated. To qualify for
accommodations, documentation must meet the school’s psychoeducational evaluation policy, including current,
comprehensive testing by a qualified professional that clearly supports each requested accommodation.

Classroom Accommodations
o Provide class notes
o Break lengthy assignments into smaller components with intermediate
deadlines
o Audio books
o Utilize a reader
o Utilize a scribe
o Preferential Seating

CCDS Assessment Accommodations:
(Quizzes, Tests, Any Graded summative assessment)

o Use technology for note-taking, assignments, and tests (typing/assistive
technology)
o Use a 4-function calculator
o Extended time (50% more)

Standardized Test Accommodations
(CCDS submits both requested school-based accommodations and standardized testing
requests to ERB, ACT, and SAT. Final decisions are made independently by each testing board.)

o Allow frequent breaks or stop the clock breaks
o Record answers in test booklet
o Testing over multiple days
o Provide small group setting for testing
```

## S9 — Consent for Assessment / OT Therapy Screening / Speech and Language Screening Form (full transcriptions)

### consent

```
EDUCATIONAL RESOURCE PROGRAM

Consent for Assessment

I give permission for Charlotte Country Day School to do an educational screening for
my child, _____________________________, to identify individual educational needs in
order to aid in individualizing instruction.

Parent Signature: ___________________________

Date: _________________________________
```

### ot_screening

```
Dear Parents,

We are pleased to share that Occupational Therapy screenings are provided at Charlotte Country Day
School by Southern Piedmont Pediatric Therapy. Jeanmarie Tommasulo and her associates provide the
screenings and subsequent services if needed. The primary emphasis is helping children develop better
fine motor, visual motor and sensory motor and handwriting skills. Jeanmarie and her associates
operate independently of Charlotte Country Day and are not employees of the school.

Screenings are brief 15-20 minute clinical observations to determine if an OT evaluation is needed.
There will be a fee of $25 for each screening. After the screening, you will be provided a screening form,
which will outline the screening results and any follow up recommendations. Parents will need to follow
up with OT for scheduling and discussion of the screening results. If you choose to schedule OT services
for your child on our campus, all financial arrangements will be between you and Southern Piedmont
Pediatric Therapy. **OT’s are on campus 1-2 days per week. Please anticipate 2-3 weeks for completion
of the screening.

Thank you,

Warren Sepkowitz                          Sherry Harris
Head of Lower School                      Lower School Director of Educational Resource Program

Name of Student________________________________ Child’s Date of Birth _______________

Today’s Date_________________ Teacher/Grade_____________________________________

Check Area(s) of Concern Below:

__Inappropriate Pencil Grasp                               __ Visual Perceptual Difficulties
__Difficulty with Handwriting                              __ Difficulty with copying
__ Lack of Hand Dominance                                  __Postural Problems
__Fine Motor Manipulation Problems                         __Difficulty Dressing
__Sensory Concerns                                         __ Difficulty using scissors

__ Yes, I give permission for my child to participate in the screening for the above skills.

Parent Signature: _________________________________ Telephone: ____________________

Email Address: ________________________________________________________

Please return this form to your child’s teacher tomorrow along with a $25 check made out to Southern
Piedmont Pediatric Therapy.
```

### speech_screening

```
Dear Parents:

North Carolina Licensed Speech-Language Pathologists from TerrificTalkers will be conducting
Speech-Language screenings at Charlotte Country Day School. They operate independently of this
school and are not employees of the school. This screening will briefly screen articulation and
language skills and does not serve as a comprehensive speech/language evaluation.

If you choose to have TerrificTalkers accommodate your child’s speech-language needs here at
CCDS, all financial arrangements will be between you and Kimberly Binford Mannion, owner. The
cost for this screening is $25.00 per child and you will receive a letter reporting the screening
results and any recommendations from TerrificTalkers after the screening. Please include
payment to TerrificTalkers with this permission slip or you can pay via ZELLE® to 7046513001 and
write child’s name on memo section of check or ZELLE®.

Please indicate below if you want your child to participate.

Thank you,

Kimberly Binford Mannion, M.A.-SLP-CCC
TerrificTalkers

___YES, I give permission for my child, _________________ to be screened for his/her speech-
language skills. Please send this form to the classroom teacher.

____________________                                           ___________________
Parent Signature                                               Date

____________________
Child’s date of birth                         CLASSROOM TEACHER/GRADE: ________________

Parent’s Phone number and Email address:

______________________________________________________________________________

2025
```

The "Speech and Language Teacher Referral" PDF (S9d) is a teacher checklist of observed characteristics (articulation, receptive/expressive language, fluency, voice); not transcribed in full.

## S10 — BucsNet: Health Services (verbatim, learning/wellness-relevant parts)

```
Health Services
Student safety is always our top priority, and effective health policies, practices, and education are essential to our community. Our Health Services team provides physical and emotional care to Country Day students, faculty, and staff.
Two full-time nurses on each campus provide first aid, verify proper health forms, administer medications, and support students with special health needs such as allergies, asthma, and diabetes. They collaborate with teachers, athletic trainers, and the PE department as appropriate. Our counselors partner with students, teachers, and parents to support emotional well-being.
Health Policy
To help protect the health of our community, please be mindful of the following policies:
Students with  vomiting, diarrhea, or a fever of 100.4°F or higher may not attend school .
Students must be  symptom-free (no fever, vomiting, or diarrhea) for at least 24 hours before returning to school .
Families are asked to use good judgment in keeping sick children at home, where proper care can be provided.
A student who becomes ill at school or is unable to participate in the day’s activities will be removed from the classroom, and parents (or an emergency contact) will be notified.
Students should report to the health room prior to being released from school due to illness.
Students must be  picked up   within one hour  of the School’s request.
Teachers will be notified of a student’s dismissal for illness.
Before returning to school, symptoms should be improving without the aid of medications to reduce the risk of spreading infection.
If your child shows signs of illness, please keep them home and consider evaluation for the flu, COVID-19, or other contagious illnesses. If your child tests positive for a contagious illness, please notify the school nurses so we can monitor and manage cases appropriately:  nurses@charlottecountryday.org .
Protect Yourself and Your Family
The CDC strongly recommends an annual flu vaccine  as the most effective way to prevent flu-related illness. In addition, everyday preventative actions can significantly reduce the spread of germs:
Avoid close contact with individuals who are sick
Stay home when sick and avoid contact with others until at least 24 hours after a fever subsides (except for medical care)
Cover your nose and mouth when coughing or sneezing
Wash hands frequently with soap and water, or use alcohol-based hand sanitizer when soap is unavailable
Avoid touching your eyes, nose, and mouth
Clean and disinfect frequently touched surfaces and objects
Questions or Concerns?
If you have questions or concerns about your child’s physical or emotional well-being, our school nurses and counselors are here to help—please don't hesitate to reach out.
Nurses
Email:   nurses@charlottecountryday.org
Cannon Campus  (7:30 am–4:30 pm)
(704) 943-4569 or (704) 943-4568
Gwen Nix , RN, BSN
Sharon Ferris , RN, BSN, BA
Bissell Campus  (7:30 am–3:30 pm)
(704) 943-4830 or (704) 943-4826
Wendy Barber , RN, BSN, BA
Meredith Schulz , RN, BSN
Counselors
Crisis Services
Crisis Service Lines
Lower School
J.G. Bailey , Director of Lower School Counseling
Aleya Willis , Lower School Counselor
Middle School
Janani Buford , Director of Middle School Counseling
Jo Malveaux , Middle School Counselor
Upper School
Samantha Bosco , Director of Upper School Counseling
Mallika Rajan , Upper School Counselor
Athletics
ChaChi Sullivan , Assistant Director of Athletics, Student Health
Health Forms
```

S10a — **Crisis Service Lines** image linked from S10 (read visually): "Healthy Striving — Is knowing when to seek support." 988 Suicide & Crisis Lifeline (call or text 988; chat at 988lifeline.org; free, confidential, 24/7) · Crisis Text Line (text HOME to 741741; free, confidential, 24/7) · NC Peer Warmline (1-855-Peers NC, 1-855-733-7762; free, private, 24/7; ncdhhs.gov/peer-warmline) · "School Counseling — Support starts with a conversation. Reach out to your division counselor or a trusted adult."

## S11 — Lower School Curriculum (verbatim excerpts)

```
Our two Lower School counselors provide group instruction, classroom support, short-term individual and/or family counseling if needed, and referral to outside experts when appropriate. Our counselors work with teachers to reinforce our social-emotional learning strands, such as self-awareness, self-management, social awareness, relationship skills, and personal decision making.
The Educational Resource Program (ERP) is designed to help address students’ individual learning needs, primarily related to literacy and math skills. The ERP staff assists through a variety of methods, including one-on-one tutoring and screenings for speech-language needs, occupational therapy needs, and learning differences.  Learn more about our ERP .
The Literacy Coach/Reading Specialist provides instructional coaching for K–1 teachers and JK–4 literacy professional development as needed.
The Literacy Coach/Reading Specialist also provides small group literacy intervention for K–1 students. These groups provide an additional tier of support in meeting curriculum benchmarks and are designed to be short-term and flexible.
```

## S12 — Announcing our New Director of Health and Wellness (verbatim)

```
6  /  24  /  26
Charlotte Country Day School is pleased to announce the appointment of  Dr. Danielle Dixon Scott  as the School's inaugural Director of Health and Wellness, effective July 1, 2026.
A licensed clinical psychologist with more than 20 years of experience, Dr. Scott brings expertise spanning clinical practice, school-based services, academic medicine, and community engagement. Throughout her career, she has developed evidence-based wellness programs that promote resilience, mental health, and overall well-being while building strong partnerships among faculty, staff, families, and the communities they serve.
Most recently, Dr. Scott served as Assistant Clinical Professor and Behavioral Health Faculty Lead at the Moses Cone Family Medicine Residency Program at UNC–Chapel Hill. There, she designed and led Mindful Medicine, a longitudinal curriculum focused on physician well-being, resilience, stress management, and professional identity formation.
"Dr. Scott is an exceptional leader whose experience and vision align perfectly with our commitment to educating and supporting the whole child," said Head of School Dr. Tara Christie Kinsey. "She understands that student well-being is foundational to learning and growth, and she brings both the expertise and collaborative spirit needed to strengthen and expand our culture of wellness across every division of our School."
Dr. Scott also brings valuable insight into independent school communities, having served as a trustee and strategic planning committee member at Collegiate School in Richmond, Virginia. She is also a familiar face at Country Day as the parent of [an alumna — student name not recorded].
In her new role, Dr. Scott will partner with the School's counselors, nurses, health and physical education faculty, and other school leaders to establish Country Day's inaugural Health and Wellness Team. Together, they will build upon the School's existing strengths to create a coordinated, comprehensive, and schoolwide approach to student wellness.
Dr. Danielle Scott Director of Health and Wellness
```

## S13–S20 — other pages (verbatim excerpts)

- S14 Admissions: "Provide teacher recommendations and academic records (based on your
  child's grade level). Your personalized checklist on the Admissions Portal will outline
  exactly what's needed." · "In the Charlotte region, a number of qualified psychologists
  offer standardized screening assessments for younger applicants. These tests need to be
  scheduled directly with the psychologist." · "Older applicants are asked to take the
  Independent School Entrance Examination (ISEE)" · "International applicants are asked to
  take the TOEFL test" · "February 6, 2027 : Grades 5–12 Admissions  ISEE Testing  Day".
- S15 Quick Reference: "🏫 Educational Resources Program (ERP) — Academic support for JK–12
  students, including tutoring, accommodations, assessments, psychoeducational evaluations,
  and referrals in  Lower School ,  Middle School , and  Upper School ." · "Incidental charges
  such as dining hall, Campus Store, Extended Day, tutoring, PE uniforms (Middle School), and
  bus transportation fees are billed on a monthly basis".
- S16 ERB: "In the Lower School, ERB scores are  not used for class placement or
  accommodations . In Middle School, they may be one factor considered when determining math
  placement."
- S17 International Studies: "Independent school in NC with a full-time English as a Second
  Language program."
- S19 History: "in 2023 we doubled our counseling staff, adding a second experienced
  counselor in each division. In addition, we hired our first Student Health Services
  Counselor to aid student-athletes and coaches with athletic performance, academic
  performance, and character and leadership development."
- S20 Tuition: families "can also opt for services like before and after-school
  transportation, extended day programs, enrichment programs, and tutoring" (no price).

## Excluded content (recorded, not rendered)

- The S5 "What Does This Look Like in College?" section (college disability-services
  process) is general guidance, not a Country Day service. Not rendered.
- The S7 provider list's addresses, phone numbers and emails belong to outside practices.
  The card may say the school publishes a provider list (with its date and that some accept
  insurance), but **does not list the providers**: they are third parties, not school
  services.
- No ESA+ / Opportunity Scholarship or public-district content was found on these pages.
- S21–S24 (2015–2017 documents) are superseded and not rendered.
- The S14 admissions dates and $100 fee belong to the Admissions area, not this one.

## Not found on any official page (→ NOT STATED rows / Ask the School)

- **504 plans and IEPs.** No page or PDF uses either term. The policy speaks only of
  "documented disabilities" and a full psychoeducational evaluation. **No glossary marker**
  applies.
- Specially designed instruction / curriculum modification. S5 says accommodations change
  "how a student accesses learning—not what they are expected to learn", but no page says
  whether the curriculum is ever modified.
- A self-contained or separate program.
- Gifted / advanced-learner support (the Honors/AP qualification rule is only in the
  2015-16 profile, S21).
- Physical therapy.
- A school psychologist role. The Director of Health & Wellness is "A licensed clinical
  psychologist", but she is not described as doing evaluations or student therapy.
- An emotional / behavioral intervention program, beyond LS "short-term individual and/or
  family counseling" and referral (S11) and the MS/US counselor route to temporary
  accommodations (S6).
- The length of a Middle or Upper School session (only LS states 45 minutes).
- Whether the K–1 Tier 2 small groups with the Reading Specialist are billed.
- Whether financial aid applies to ERP session fees (S6 mentions aid only for evaluations).
- OT and speech therapy rates (screenings only: $25 each).
- Speech/OT screening above Lower School (the forms sit only on the LS page).
- ESL below the Upper School, and any ESL fee.

## Corrections to the deep-research dossier

1. **The four BucsNet pages load.** The dossier said `/bucsnet/{lower,middle,upper}-school/erp`
   and `/bucsnet/health` "could not be fetched". All four returned 200 on 2026-10-25.
2. **Fees are published.** Dossier: "No rate or fee schedule is published (NOT STATED)."
   Live: LS "$82 per 45-minute session"; MS "$85 per session"; US coaching "$85 per session";
   OT and speech screenings $25 each (S2–S4, S9b, S9c).
3. **Eligibility is published.** Dossier: "NOT STATED as formal criteria." Live (S5):
   accommodations are for "students with documented disabilities"; disabilities must be
   documented "through a full psychoeducational evaluation" by a licensed provider; "Students
   are eligible only for Country Day-approved accommodations; accommodations outside this
   list are not granted"; the accommodations go into a "Confidential Academic Plan (CAP)".
   Learning-support *services* need no testing: LS "A psychoeducational evaluation is not
   required for services"; MS support is offered "both with and without formal testing".
4. **An explicit scope limit exists.** Dossier: "No explicit 'we do not provide…' statement
   was found." Live: "accommodations outside this list are not granted" (S5); "The
   accommodations listed below are the only ones formally provided by the school. While
   outside providers may suggest additional supports, these are considered recommendations
   and are not mandated." (S8).
5. **Evaluation currency is not "every four years".** That was the 2015-16 PDF (S22), no
   longer linked. Live S5: "Reviewed every three years in Lower and Middle School", "every
   four years in Upper School". Live S6 (the linked policy PDF) instead says "Lower School
   (Grades K-5): Valid for 3 Years" and "Middle and Upper School (Grades 6-12): Valid for 4
   Years". **These two current sources disagree** for grades 5–8. Ask the school.
6. **The dossier's documentation-in-lieu rule is superseded.** It quoted 2015-16 wording
   letting "an appropriate professional (e.g. neurologist…)" substitute. Live S5: "A simple
   doctor’s note or medical diagnosis (e.g., ADHD or anxiety) does not provide enough
   information to justify accommodations." and a full evaluation "Is the only evaluation
   accepted for formal accommodations". Live S6 adds: a speech-language, OT or auditory
   processing evaluation "may receive school approved accommodations for one year", and
   MS/US students "with a documented mental health diagnosis may receive temporary
   accommodations through collaboration with the school counselor".
7. **The referral list is current, not nine years old.** S7 is "Preferred Providers for
   Psychoeducational Testing — Update January 2026" (seven entries; one marked "Insurance
   Accepted"). The dossier's 2016–2017 list (S24) is no longer linked.
8. **The approved accommodations list changed.** The current S8 list has no spell-check
   device rule and no "small classes are considered small group settings" line (both from
   the August 2016 PDF, S23). "Provide small group setting for testing" now sits under
   *Standardized Test Accommodations*; "Extended time (50% more)" under *CCDS Assessment
   Accommodations*.
9. **A reading method is named.** Dossier: "Method NOT STATED". Live S2: "All specialists
   bring advanced training, including Orton-Gillingham", with the "Hochman Method (The
   Writing Revolution)" and "Multi-Sensory Math".
10. **Identification is published.** Dossier: no request procedure. Live S2: "Students are
    identified for support based on benchmark assessments given at the beginning, middle, and
    end of the school year. Data analysis meetings with the Literacy Leadership Team determine
    which tier of support is most appropriate." Tiers 1–3 are described. Families also enrol
    through an "Enroll in Learning Support Services" form (S2, S3) / "Enroll in Academic
    Coaching" (S4).
11. **Speech and OT are not ambiguous.** Live S2: "contracted Occupational and Speech
    Therapists who provide additional services during the school day." S9b/S9c: Southern
    Piedmont Pediatric Therapy (OT) and TerrificTalkers (speech) screen on campus for $25 and
    "operate independently" of the school; therapy is arranged and paid directly with them.
12. **Crisis resources are published.** Dossier: "NOT STATED". Live S10/S10a: a "Crisis
    Service Lines" graphic (988, Crisis Text Line, NC Peer Warmline) under "Counselors".
13. **The Upper School ERP Director is confirmed.** Lauren Folger-Sweeting is "Director of
    Upper School ERP" on S4 and in the directory (id 19869).
14. **The ERP roster is 26, not 3.** All are named on S2–S4 with published emails (one LS
    specialist has none). The LS Reading Specialist/Literacy Coach is Jennie Roberts Creason.
15. **Counselor titles have moved on from the 2023 article.** J.G. Bailey is "Director of
    Lower School Counseling", Samantha Bosco "Director of Upper School Counseling", ChaChi
    Sullivan "Assistant Director of Athletics, Student Health" (S10, S13). Counselor emails are
    published (dossier: NOT STATED).
16. **Nurses.** "Two full-time nurses on each campus". Cannon Campus: Gwen Nix, Sharon Ferris.
    Bissell Campus: Wendy Barber, Meredith Schulz. All four have published emails (S10).
17. **The school profile is dated, not undated.** S21 is headed "2015-2016". Its ESL course
    detail (Intermediate/Advanced ESL, ESL histories, TOEFL Prep) and its Honors/AP
    qualification rule are therefore not rendered. Current ESL evidence is S17 plus the
    directory's "English and ESL Teacher" (Hannah Wagner).
18. **Session scheduling is published.** LS: "scheduled during language-based special area
    classes or core classroom time". MS: "during study halls, DEAR or drama (5th/6th only),
    and/or lunch/recess", "treated as class periods". US: "first-come, first-served basis and
    begins after the first day of school as staffing allows".
19. **Accommodations for AP/IB/SAT/ACT are not automatic.** S5: "Country Day accommodations
    do  not  automatically transfer." S8: "CCDS submits both requested school-based
    accommodations and standardized testing requests to ERB, ACT, and SAT. Final decisions are
    made independently by each testing board." S6: students need "a current
    psychoeducational evaluation and an active Confidential Academic Plan (CAP)" to be
    eligible for standardized-testing accommodations.
20. **Two published-email defects found** (not in the dossier): S10's mailto for Janani Buford
    is misspelled; Lauren Folger-Sweeting has two published spellings (S4 text vs directory).

## Proposed Services-at-a-Glance mapping (for /plan)

Cannon's row set minus its Cannon-specific "Academic Labs (9–12)": 24 rows.

| Group | Row | Code | Basis |
|---|---|---|---|
| Learning | Specialized teachers | IH | 26 ERP staff; LS specialists trained in Orton-Gillingham; Reading Specialist (S2–S4, S11) |
| Learning | Reading intervention | IH_FEE | Tier 3 1:1 Orton-Gillingham-based ($82/45 min); Tier 2 K–1 small groups with the Reading Specialist (S2, S11) |
| Learning | Math intervention | IH_FEE | "Multi-Sensory Math", Tier 3 1:1 (S2) |
| Learning | 1:1 / small-group instruction | IH_FEE | 1:1 in all three divisions; K–1 small groups (S2–S4) |
| Learning | Executive-function coaching | IH_FEE | US academic coaching, $85; MS "Executive skills" (S3, S4) |
| Learning | Learning-support class | IH_FEE | No class, but sessions are "a permanent part of student schedules" and "treated as class periods" (S2, S3). *Judgment call: Cannon codes its equivalent NS; flag for the plan* |
| Learning | Accommodations & learning plan | IH | Approved list + Confidential Academic Plan (S5, S8) |
| Learning | Specially designed instruction | NS | Not stated (S5 frames accommodations as "not what") |
| Learning | Self-contained / separate program | NS | — |
| Learning | Gifted / advanced | NS | Only in the 2015-16 profile |
| Learning | Eligibility documentation | REQUIRED | Full psychoeducational evaluation for accommodations; none for services (S2, S5) |
| Therapy | Speech-language therapy | RF | TerrificTalkers, on campus, independent, paid directly (S2, S9c) |
| Therapy | Occupational therapy | RF | Southern Piedmont Pediatric Therapy, "on campus 1-2 days per week", paid directly (S2, S9b) |
| Therapy | Physical therapy | NS | — |
| Assessment | Early identification (JK–2) | IH | Benchmark assessments 3×/yr; speech/OT screenings; Consent for Assessment (S2, S9) |
| Assessment | Testing accommodations | IH | Extended time (50% more) etc.; ERP submits College Board/ACT/IB requests (S1, S5, S8) |
| Assessment | Entrance testing | IH | Psychologist screening JK–4, ISEE 5–12, TOEFL (S14) |
| Assessment | Psychoeducational evaluation | RF | Family-funded; preferred-provider list, Jan 2026 (S6, S7) |
| Wellness | Counseling & emotional support | IH | Six divisional counselors (S10, S11) |
| Wellness | Emotional & behavioral intervention | NS | Short-term counseling and referral only (S11) |
| Wellness | Crisis resources | RF | Crisis Service Lines graphic (S10a) |
| Wellness | School psychologist | NS | Director of Health & Wellness is a clinical psychologist, not described as a school psychologist (S12) |
| Wellness | School nurse | IH | Two full-time RNs per campus (S10) |
| Language | ESL / English-language support | IH | "full-time English as a Second Language program"; English and ESL Teacher (S17, S13) |

**Published 18 of 24 rendered (6 NS, 0 EXCLUDED).** The scope limit ("accommodations outside
this list are not granted") goes in the eligibility `scope` cell, not as a row.
