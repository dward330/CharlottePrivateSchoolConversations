# Charlotte Latin School — Learning Support & Student Services — Official Site Research

**Provenance.** Collected 2026-10-26 by Claude (Claude Code) via `/learning-support` step 2,
fetching Charlotte Latin School's **own** pages directly (`curl` with a browser user agent,
raw HTML stripped to text), the PDFs the school hosts (`pdftotext -layout`), and **Wayback
Machine copies of the school's own pages** where the live page has been removed (`id_`
raw captures from web.archive.org). The three panels on the live Student Support and
Wellness page are Finalsite board-post popups; the page HTML carries only their titles, and
the bodies were read from the popup endpoint the page itself calls
(`/fs/elements/38616?is_popup=true&post_id=<id>&show_post=true`, found by rendering the page
in Chrome via Playwright and reading its network requests). Per the area's rule, **only
official school sources** are used. The user's Claude deep-research dossier (transcribed
alongside this file as `Charlotte Latin - Learning Support - Deep Research.md`) was used as
a **lead sheet only**; every fact below was re-read on the school's own page or PDF. Where
the two disagree, the school's page wins (see "Corrections to the deep-research dossier").

**The dossier's largest gaps are closed, partly.**

- The "Learning Resources", "Counselors" and "Nurses" panels it could not render **do** have
  text (S2a–S2c), current as of 2026-10-26. None names a person.
- The Upper School handbook section it could not extract (printed p. 61) **is** extractable
  from the 2018-19 PDF, and a **newer November 2023 online Family Handbook** (Wayback, S5a–S5d)
  carries the same policy with updates: College Board / ACT accommodation applications
  "submitted separately by the Director of Learning Resources", a 504 Educational Plan in
  **both** Middle and Upper School, and "Families are responsible for any fees associated with
  Learning Resources or Tutoring".
- A dedicated program page, `/academics/learningresources`, existed until at least
  2025-05-23 (Wayback S6) and **404s today**. A "Learning Resources Program Guidelines" page
  (Wayback 2022-07-08, S7) adds the pre-enrollment instruction to share evaluations with the
  Director of Learning Resources.

**What stays unpublished.** No fee amount (only the billing method), no current Director of
Learning Resources or Learning Resources teacher by name, no counselor or nurse names, no
staff emails, no faculty/staff directory on the public site, no speech / OT / PT, no school
psychologist, no crisis lines, no ESL for enrolled students.

No student is named in this file. The 2016 director announcement (S10) names the new
director's children with class years; they are omitted here.

## Source URLs

| # | URL | What it is | Status 2026-10-26 |
|---|---|---|---|
| S1 | https://www.charlottelatin.org/leading-programs/student-support-and-wellness | Student Support and Wellness hub — Michele King, three panels, SEL by division | 200, fetched |
| S2a | (popup of S1) `/fs/elements/38616?is_popup=true&post_id=4916&show_post=true&is_draft=false` | "Learning Resources" panel text | 200, fetched |
| S2b | (popup of S1) `…post_id=4915…` | "Counselors" panel text | 200, fetched |
| S2c | (popup of S1) `…post_id=4914…` | "Nurses" panel text | 200, fetched |
| S3 | https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf | 2018-19 Family Handbook (67 pp., created 2018-08-07) — still hosted, not linked from any current page found | 200, PDF, transcribed — **superseded by S5 where they overlap** |
| S5a | http://web.archive.org/web/20231120125942/https://www.charlottelatin.org/familyhandbook/all-school-policies | Online Family Handbook — All School (Student Services: Counseling, Learning Resources) | Wayback 2023-11-20; live 404 |
| S5b | http://web.archive.org/web/20231120124734/https://www.charlottelatin.org/familyhandbook/lower-schools-policies | Online Family Handbook — Lower School (LR, accommodations, ERB) | Wayback 2023-11-20; live 404 |
| S5c | http://web.archive.org/web/20231120141714/https://www.charlottelatin.org/familyhandbook/middle-school-policies | Online Family Handbook — Middle School (LR, 504 plan, tutoring, fees) | Wayback 2023-11-20; live 404 |
| S5d | http://web.archive.org/web/20231120124247/https://www.charlottelatin.org/familyhandbook/upper-schools-policies | Online Family Handbook — Upper School (LR coaching, 504 plan, College Board/ACT) | Wayback 2023-11-20; live 404 |
| S6 | http://web.archive.org/web/20250523012049/https://www.charlottelatin.org/academics/learningresources | Learning Resources program page (instituted 1985; teaching, screening, consultation) | Wayback 2025-05-23 (captures 2021-10 → 2025-05); live 404 |
| S7 | http://web.archive.org/web/20220708072524/https://www.charlottelatin.org/learning-resources-guidelines | Learning Resources Program Guidelines | Wayback 2022-07-08; live 404 |
| S8 | https://www.charlottelatin.org/support/endowed-gifts | Endowed Gifts — Gorelick and Francis Family endowments for Learning Resources | 200, fetched |
| S9 | https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/spotlight-teresa-edwards-middle-school-coordinator-of-learning-resources | Spotlight: Teresa Edwards (published 2025-05-01) — retiring after 36 years | 200, fetched |
| S10 | https://www.charlottelatin.org/cf_news/view.cfm?newsid=1041 | "Headmaster McIntosh Announces Director of Learning Resources" (posted 07/01/2016) | 200, fetched — **2016; not evidence of the current director** |
| S11 | https://www.charlottelatin.org/about/community-belonging-global-education/academic-transition-and-student-support | Academic Transition and Student Success (ATSS) — Isa Stokes | 200, fetched |
| S12 | https://www.charlottelatin.org/admissions/application-process | Application Process — WPPSI / WISC V / ISEE by grade | 200, fetched |
| S13 | https://www.charlottelatin.org/uploaded/COMPOSER/AdmissionsTab/CAIS2025-26.pdf | CAIS 2025-2026 consortium brochure (school-hosted; covers seven Charlotte schools) | 200, PDF, transcribed |
| S14 | https://www.charlottelatin.org/admissions/tuition-financial-assistance | Tuition & Financial Aid, "These fees are from the 2026-27 school year." | 200, fetched |
| S15 | https://www.charlottelatin.org/academics/lower-school | Lower School — Structured Literacy Statement | 200, fetched |
| S16 | https://www.charlottelatin.org/academics/college-counseling | College Counseling — "standardized testing timelines" only | 200, fetched |
| S17 | https://www.charlottelatin.org/about/school-leadership | School Leadership — administrative team (division heads) | 200, fetched |
| S18 | https://www.charlottelatin.org/about/employment → https://www.paycomonline.net/v4/ats/web.php/portal/3987D9ED5267F2B36368ACF6F966F49A/career-page | The school's own job board (Paycom), rendered in Chrome | 200 — 9 openings, **none in learning support or counseling** |
| S19 | https://www.charlottelatin.org/student-life/safety-and-security | Safety and Security — Crisis Response Team (security, not mental health) | 200, fetched |
| S20 | https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/spotlight-jessica-shoup-middle-school-science-teacher-and-dean-of-student-support | Spotlight: Jessica Shoup, MS Dean of Student Support (published 2025-01-30) | 200, fetched — a discipline / student-life role, **not learning support**; not rendered |
| S21 | https://www.charlottelatin.org/coffeeqa | 2020 counseling Q&A page (dossier's counselor list) | **404**; no Wayback capture |
| S22 | https://www.charlottelatin.org/uploaded/themes/default_25/main.css | Site theme CSS (brand colours) | 200, fetched |

## Verbatim excerpts

### S1 — Student Support and Wellness (live)

> LATIN IS A CARING COMMUNITY. WE DEMONSTRATE OUR COMMITMENT TO CARING BY SUPPORTING STUDENTS AT EACH DEVELOPMENTAL STAGE IN A MANNER THAT HONORS THEIR LEARNING PREFERENCES AND PERSONALITIES.

> Michele King
> Director of Student Support & Wellness

Panels: "Learning Resources", "Counselors", "Nurses". No email for Michele King on the page.

> Lower School uses the practices of Responsive Classroom, which is an evidence-based approach to teaching and discipline for teachers that creates safe, joyful, and engaging classrooms and school communities. Additionally, our Lower School Counselor provides classroom lessons at each grade level that teach students specific skills for managing various types of challenges such as friendship issues, worries, and the management of “big” emotions.

> Middle School students learn about Emotional Intelligence in the curriculum of Physical Education classes alongside a comprehensive advisory program called Flight Time that focuses on key social-emotional competencies and peer relationship development.

Also a "Parent Education" block: sessions on "navigating social media, supporting student mental health, and providing developmentally relevant parenting guidance."

### S2a — "Learning Resources" panel (live)

> The Learning Resources program’s goal is to remediate academic deficits and teach compensatory strategies that help enable students with diagnosed learning disabilities and/or attention issues to reach their potential. Independence, self-awareness, and self-advocacy are important objectives as students gain self-confidence through academic success.

### S2b — "Counselors" panel (live)

> Latin’s Counseling Services supports, educates, and counsels students in areas of problem solving, peer and family relationships, and strategies for emotional well-being. Individual counseling services are short-term; however, consultation and referrals can be provided for students and families who need more intensive, longer-duration services.

### S2c — "Nurses" panel (live)

> Three full-time registered nurses offer health assessments, provide emergency care for illness and injury, administer medications, and identify students with special needs.

### S5a — Online Family Handbook, All School (Wayback 2023-11-20)

> **Counseling** — Charlotte Latin offers a school-wide counseling program with three full-time, on-site professional counselors for all students in Grades TK through 12. Limited counseling services are also available for parents and faculty. Referrals to outside resources are made as needed.

> **Learning Resources** — The Learning Resources Department includes a Director of Learning Resources (K–12), and Learning Resources teachers within each school division. Charges for sessions with a Learning Resource teacher are not included in tuition and are billed per session each month by the Business Office.
>
> The Learning Resources program serves students with diagnosed learning disabilities and/or attention issues that impact academic achievement. The goal is to remediate academic deficits and teach compensatory strategies that help enable students to reach their potential.
>
> Admission to the Learning Resources program is based on parent or teacher request, screening by Learning Resources staff, and a comprehensive psychoeducational evaluation conducted by a licensed psychologist. Students must be diagnosed with a learning disorder(s) and/or attention issues that impact academic achievement in order to be part of the Learning Resources program. After a diagnosis of a learning disorder or attention issue, recommendations by the psychologist are carefully reviewed to determine the level of support needed from Learning Resources. Accommodations within the classroom may include extended time, preferential seating, and/or testing in a separate setting. Evaluations must be current (within three years) in order to receive services within the Learning Resources program.
>
> Learning Resource teachers function as resources for the classroom teacher and share suggestions and techniques to support students within the regular classroom including appropriate accommodations. Independence, self-awareness, and self-advocacy are important objectives as students gain self-confidence through academic success.

The page also links "Other Resources: Family Handbook" and says "Read the full RUP on page 75 of the CLS Family Handbook" — a newer PDF handbook than S3 existed in 2023; it was not found.

### S5b — Lower School (Wayback 2023-11-20)

> **Learning Resources** — Students with diagnosed learning disabilities or ADHD may enroll in the Learning Resources program and receive individualized instruction during the school day for an additional fee. Learning Resources staff work with students individually or in small groups (when appropriate) to teach reading, writing, and math to help students gain basic skills and remediate weaknesses. In addition to remediation of academic weaknesses, Learning Resources teachers also work on organization, study skills, and test-taking strategies as students move into Grades 3–5.

> **Accommodations and Extended Time** — Students with diagnosed learning disabilities and/or Attention Deficit Disorder (ADD) may qualify for accommodations in the classroom and on standardized tests. Eligibility for accommodations is determined by a licensed clinical psychologist during a psychoeducational evaluation. Students must have a current evaluation (within three years) with an appropriate diagnosis and recommended accommodations in order to be considered for accommodations at school.
>
> Typical accommodations offered at Charlotte Latin may include the following: preferential seating in the classroom (near the front of the class or closer to the teacher), extended time (time and one/half or 50% more), testing in a separate setting, use of a computer for writing assignments, and copies of notes from the teacher or a peer.
>
> These accommodations may be informally offered to students in the Lower School who are demonstrating difficulty with assignments or tests, and are consistently available to students who meet the criteria described above. Students in Grades 3–5 are offered extended time on the ERB annual achievement testing if they qualify based on current psy[choeducational testing and parent consent].

> Classroom placement for students is determined by a team of the current grade-level teachers, the Counselor, the Learning Resources Director, the Assistant Head, and the Head of Lower School.

(2018-19 said "Grades 4-5" for both the study-skills shift and ERB extended time; 2023 says **Grades 3–5**. 2023 wins.)

### S5c — Middle School (Wayback 2023-11-20)

> **Learning Resources** — The Middle School Learning Resources program is designed to offer students curriculum support while implementing learning strategies designed around the individual student’s profile. Participation in the Learning Resources program requires a current psychoeducational evaluation (within three years) with an appropriate diagnosis of learning challenges that significantly impact academic achievement. … The program provides individualized and small group classes for students to develop skills in organization, time management, note taking, and test-taking. Sessions may also focus on reading comprehension, written expression, and math computation or problem-solving.

> In Middle School, a 504 Educational Plan is created to document the appropriate accommodations for each school year based on recommendations in the psychoeducational evaluation (current within three years) and the needs of the student. If extra time is included on their current 504 Educational Plan and extra time is used regularly in the classr[oom …] (ERB extended-time rule, as in 2018-19)

> **On-Campus Tutoring During School Hours** — … If a student is struggling with organization, study skills, written expression, or a particular subject area, the student, advisor, parent, or the subject-area teacher may request consideration for additional tutorial assistance for the student. The subject-area teacher and/or advisor will meet with the Director of Learning Resources (or Middle School Learner Resource Teacher) and Head of Middle School to determine if on-campus tutoring is warranted and if an outside evaluation is needed. … Tutors must be on Latin’s approved tutor list and have a recent background check through the Human Resource office. … **Families are responsible for any fees associated with Learning Resources or Tutoring.** No student will be allowed to leave campus during the school day to see an off-campus tutor. All off-campus tutoring must be completed beyond school hours.

> Middle School Contact: Jenny Greathouse, Middle School Nurse (concussion protocol; 2023 — not confirmed current, not rendered)

### S5d — Upper School (Wayback 2023-11-20)

> **Learning Resources** — In the Upper School the Learning Resources program is designed to be a consultative and coaching model. Learning Resources staff work individually with students on executive functioning skills (i.e. organization, time management, study strategies) and support students using classroom assignments. These sessions are not intended to provide tutoring in specific subjects but help students develop strategies to become more efficient and successful. … Participation in the Learning Resources program requires a current psychoeducational evaluation (within three years) with an appropriate diagnosis of learning challenges that significantly impact academic achievement.

> In Upper School, a 504 Educational Plan is created to document appropriate accommodations each school year based on recommendations in the psychoeducational evaluation (current within three years) and the needs of the student. Students who qualify for extended time or testing in a separate setting are expected to request these accommodations from teachers several days prior to a test or quiz.
>
> The College Board and ACT allow accommodations during their standardized tests (PSAT, SAT, PreACT, ACT, and AP) after an application is approved. Both organizations require that the accommodations requested: 1) are consistent with the recommendations on a current psychoeducational evaluation (generally within 3 years); and 2) follow the accommodations used regularly during classes (as stated on a 504 Plan) for a minimum of four months prior to application. …
>
> The approval process for the College Board is different from the ACT and each application must be submitted separately by the Director of Learning Resources. Applications generally take 6-7 weeks for approval. Additional information about this approval process can be obtained by contacting the Director of Learning Resources.

Typical accommodations list in US adds "testing in a separate setting or small group".

### S3 — 2018-19 Family Handbook (PDF, still hosted)

Same policy as S5 in earlier wording; quoted here only where S5 is silent.

- p. 22: "The Learning Resources Department is composed of a Director of Learning Resources (K-12), and LR teachers within each school division. Charges for sessions with a Learning Resource teacher are not included in tuition and are billed per session each month by the School."
- p. 23 / p. 46 / p. 61: "We believe that the great majority of academic problems can be addressed by student-teacher interaction, without recourse to a third party."
- p. 61 (Upper School on-campus tutoring): "The student must be functioning at an average “C-” level or lower before requesting an on-campus tutor." Steps "must be documented and signed by the subject teacher, and sent to the Director of Learning Resources and then approved by the Head of Upper School".
- pp. 17-18 (substance policy): "Charlotte Latin School will make the referral for said assessment; the division’s counselor will act as liaison between the School and the outside assessment resource." (Disciplinary context; not rendered.)
- p. 42: "Jean Asinger, Middle and Upper School Nurse" (2018 — superseded, not rendered).

### S6 — Learning Resources program page (Wayback 2025-05-23; live 404)

> Latin's Learning Resources provides a multi-modal approach in addressing student learning differences. Through coordinating all support systems for students including teachers, counselors, parents, and outside referrals, Learning Resources works to:
> - remediate learning issues and teach students learning strategies.
> - monitor the organizational skills of children with learning differences and/or Attention Deficit Disorder and to act as their advocate.
>
> Learning Resources allows these students to learn effectively and successfully in a regular classroom while meeting the requirements of the curriculum at Charlotte Latin.
>
> The Learning Resources Program also provides:
> - Teaching services for Charlotte Latin students with learning differences.
> - Screening services for students referred by teachers for observation and evaluation.
> - Consultation services for teachers and parents for the purpose of enhancing learning for those students who learn differently.
>
> Instituted in 1985, Learning Resources has helped students keep pace curricularly with the demands of an academically accelerated school. Students who qualify receive services in Lower, Middle and Upper Schools.
>
> Admission to the program is based on a psychoeducational evaluation that demonstrates learning differences with significant weaknesses that impact academic achievement. The evaluation and pre-referral intervention corroborate the necessity for an intensive, specialized individual or small group approach to learning. It is expected that the response to intervention will be positive and the intervention will provide students with strategies to support their learning styles.

No staff names, emails, PDFs or fee on the page.

### S7 — Learning Resources Program Guidelines (Wayback 2022-07-08; live 404)

> After a diagnosis is made by a clinical psychologist, students are able to work with a LR teacher in a one to one setting and/or receive accommodations in the classroom.

> In the Middle and Upper Schools, students who qualify for accommodations within the classroom will have a 504 Educational Plan developed by parents, teachers, and the student (when appropriate). In order to qualify for accommodations, psychoeducational testing must be current within three years and contain recommendations for the accommodations.

> Parents are encouraged to share psychological/neurological evaluations and reports with the Director of Learning Resources in the spring/summer before enrollment in order to allow for discussion and development of a plan to support a new student at the beginning of the school year.

### S8 — Endowed Gifts (live)

> The Gorelick Endowment for Learning Resources supports our Learning Resources program and covers expenses for families receiving financial aid – particularly our faculty and staff.

Also listed: "Francis Family Endowment for Learning Resources" (no description).

### S9 — Spotlight: Teresa Edwards (live, published 2025-05-01)

Title: "Spotlight: Teresa Edwards, Middle School Coordinator of Learning Resources". "So why is she retiring after 36 years at Latin?" "You’ve been at Charlotte Latin since 1989." → **Retired; not rendered as current staff.**

### S10 — 2016 announcement (live, posted 07/01/2016)

"Margaret Sigmon will join Charlotte Latin's staff as Director of Learning Resources in the 2016-17 academic year." "At Salem she received Orton-Gillingham training". **Ten years old; no current page confirms she holds the role. Not rendered.** Her personal training is not a program method.

### S11 — ATSS (live)

> Academic Transition and Student Success (ATSS) at Charlotte Latin School is dedicated to empowering students new to independent school environments — particularly those from historically underrepresented backgrounds — with the tools, strategies, and relationships they need to thrive academically, socially, and emotionally.

> Our office supports students through a comprehensive suite of programs that address key areas of development, from executive functioning and academic coaching to cultural identity, community belonging, and leadership formation.

"Isa Stokes / Director of ATSS". Programs: Latin Launch (summer transition, new MS and US students), ATSS Year-Long Modular Program (e.g. "September – Goal Setting & Time Management: Developing SMART goals and executive functioning strategies"), Peerlink (US peer mentoring), affinity programming. No fee stated, no email.

### S12 — Application Process (live)

> Grade 1 applicants take the WPPSi. … Grades 2-4 applicants take the WISC V. … Grade 5 applicants take the ISEE. … Grades 6-8 applicants take the ISEE. … All Middle School testing needs to be completed and submitted by February 26, 2027. … Grades 9-11 applicants take the ISEE. … All Upper School testing needs to be completed and submitted by February 26, 2027.

TK/K: "Applicants take the WPPSi." MS Visit Day: "will have an interview, take an assessment, observe a class, and connect with Latin students." No learning-difference documentation is asked for.

### S13 — CAIS 2025-2026 brochure (school-hosted PDF)

A consortium document shared by seven schools (Charlotte Christian, Country Day, Latin, Charlotte Prep, Covenant Day, Providence Day, Trinity Episcopal). Registration form: "Previous psychological testing? Yes No", "Name of test", "Date administered/By whom", "List services currently being provided (i.e., speech, occupational therapy, physical therapy, etc)", "Is English the second language (ESL)? Yes No", "For ESL students, an additional Nonverbal Index score will be provided." The psychologist list is for **admission cognitive testing**, not LD evaluation; not rendered as evaluation providers. Registration form: "Please remit registration form and payment to the psychologist of your choice." "Testing Fees: $275 for WPPSI-IV / $275 for WISC-V" (verified) — admission testing only, paid to the psychologist.

### S14 — Tuition (live, "These fees are from the 2026-27 school year.")

> Tuition includes most course and laboratory fees. Textbooks are included in Transitional Kindergarten–5th grade tuition costs, but are an additional expense in 6th–12th grades. …

No Learning Resources charge appears.

### S15 — Lower School (live)

> At Charlotte Latin, we follow a structured literacy approach that is highly systematic, explicit, and evidence-based. … Research shows that structured literacy is essential for an estimated 40% of learners but benefits all readers, making it the best practice for classroom reading instruction. In addition, a structured literacy approach is diagnostic and responsive.

Classroom reading instruction, **not** Learning Resources intervention.

### S19 — Safety and Security (live)

"Latin's Director of Security is Major Dale Greene … he leads the school's Crisis Response Team." A campus-security team, not mental-health crisis resources.

## Fees

| Item | School wording | Amount | Source |
|---|---|---|---|
| Learning Resources sessions | "Charges for sessions with a Learning Resource teacher are not included in tuition and are billed per session each month by the Business Office." | **NOT STATED** | S5a (2023); S3 (2018-19, "by the School") |
| Lower School LR | "receive individualized instruction during the school day for an additional fee" | NOT STATED | S5b |
| LR and on-campus tutoring | "Families are responsible for any fees associated with Learning Resources or Tutoring." | NOT STATED | S5c |
| Financial-aid offset | Gorelick Endowment "covers expenses for families receiving financial aid – particularly our faculty and staff" | NOT STATED | S8 |
| Psychoeducational evaluation | by "a licensed psychologist" — cost not mentioned | NOT STATED | S5a |

Searched: S14, the financial-aid policies page, S3, S5a–d, S6, S7. No amount anywhere.

## Staff

**No public faculty/staff directory exists on charlottelatin.org** (no directory link in the
site navigation or site map; the contact page mentions only "An automated directory … to
identify extension numbers" by phone). No `FS.util.insertEmail` call or `mailto:` for any
support person appears on any page fetched. So **no email is recorded for anyone below.**

| Name | Title as the school publishes it | Source | Current? | Render? |
|---|---|---|---|---|
| Michele King | Director of Student Support & Wellness | S1 | yes (live) | **yes** — no email |
| Isa Stokes | Director of ATSS | S11 | yes (live) | candidate — a related office (transition / EF coaching for new students), not Learning Resources |
| Casey Martin / Louisa Polos / Tracey Vanneste | Head of Lower / Middle / Upper School | S17 | yes (live) | candidate — the handbook gives division heads a role in placement (LS) and tutoring approval (MS, US) |
| (Director of Learning Resources, K–12) | role named in S5a, S5c, S5d, S6, S7 | — | role current; **holder not named on any official page** | role only, never a name |
| Teresa Edwards | Middle School Coordinator of Learning Resources | S9 | **retired** (2025) | no |
| Margaret Sigmon | Director of Learning Resources (incoming 2016-17) | S10 | unconfirmed for 10 years | no |
| Jenny Greathouse | Middle School Nurse | S5c | 2023 only | no |
| Jean Asinger | Middle and Upper School Nurse | S3 | 2018 only | no |
| Jessica Shoup | MS Science Teacher and Dean of Student Support | S20 | 2025 | no — discipline / student-life role |

Counts the school publishes about staff: three full-time registered nurses (S2c, live), three
full-time on-site professional counselors TK–12 (S5a, 2023).

## Excluded content (recorded, not rendered)

- Third-party staff names the dossier found (SAIS 2025 conference attendee list; NAIS
  Career Center listing) — not official sources.
- The Middle School LR teacher posting text seen only on Indeed / ZipRecruiter — the school's
  own job board (S18) carries no such posting today, so there is no official copy.
- CAIS psychologist list (S13) — admission testing, not LD evaluation.
- No ESA+ / Opportunity Scholarship / public-district content appeared on any page fetched.

## Not found on any official page (→ NOT STATED rows)

- Learning Resources fee amount or schedule
- Specially designed instruction / curriculum modification
- Self-contained or separate program (S6 says LR keeps students "in a regular classroom")
- Gifted / advanced-learner program ("Advancing in Courses" is the C– promotion rule, not gifted)
- Speech-language therapy, occupational therapy, physical therapy
- Emotional / behavioral intervention program
- Crisis lines or mental-health crisis protocol for families
- School psychologist
- ESL / English-language support for enrolled students
- How an outside IEP or 504 from a previous school is treated
- A referral list of psychologists for evaluations
- The current Director of Learning Resources and LR teachers by name; any support-staff email
- Whether Learning Resources serves TK (the role is "K–12"; the school is TK–12)

## Corrections to the deep-research dossier

1. **"Its detailed rules are published only in a 2018-19 Family Handbook."** Wrong. A November
   2023 online Family Handbook (S5a–d), a 2022 guidelines page (S7) and a program page live
   until May 2025 (S6) all carry the policy; the live site still states the program's goal (S2a).
2. **"Upper School pp. 61-62 could not be retrieved" / College Board and ACT NOT STATED.**
   Wrong. S3 p. 61 and S5d both state it: applications for PSAT, SAT, PreACT, ACT and AP are
   "submitted separately by the Director of Learning Resources" and "generally take 6-7
   weeks".
3. **"Lower and Upper School equivalents [of the 504 plan]: NOT STATED."** Upper School writes
   one too (S3 p. 61, S5d, S7: "In the Middle and Upper Schools … a 504 Educational Plan
   developed by parents, teachers, and the student (when appropriate)"). Lower School: still
   not stated; accommodations there "may be informally offered".
4. **Grades 4-5** for LS study skills and ERB extended time → **Grades 3–5** in the 2023 handbook.
5. **"The live … panels … contents did not render."** They have text (S2a–c), incl. "Three
   full-time registered nurses" and short-term counseling with referrals.
6. **Counselors "three full-time, on-site personal counselors" (2018).** The 2023 wording is
   "professional counselors". The 2020 counselor list (S21) 404s with no Wayback capture, so
   those three names and emails cannot be verified and are not used.
7. **"Advancing in Courses" listed under gifted.** It is the "C–" grade-to-advance rule.
8. **Reading intervention method.** The dossier was right that none is named; the Lower School
   "structured literacy approach" (S15) is classroom instruction, and the 2016 Orton-Gillingham
   line is one person's training.
9. **No "fee per session each month by the School"** today — 2023 says "by the Business Office";
   still no amount.
10. **Dossier's crisis finding** stands (NOT STATED); the "Crisis Response Team" (S19) is campus
    security, not a crisis-line resource.
11. **Middle School LR teacher posting (Aug 2026)** — not on the school's own job board (S18);
    third-party copies only, so not used.
12. **"Teresa Edwards … retiring"** — confirmed (S9); she is not rendered as current staff.
