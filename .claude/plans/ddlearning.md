---
name: ddlearning
title: Add Davidson Day School to Learning Support & Student Services — six cards from the school's own pages (Learning Enrichment Center, its 2026-27 request form, the 2026 Summer LEC rate letter, the directory); 27 service rows, 15 published; 17 staff; navy/red; GO/NO-GO test 2 overridden by the user; correct two College Support presumptions about LEC accommodations
status: english-done
phases: 2
created: 2026-10-25
branch: feat/ddlearning
prs: []
---

# Davidson Day School — Learning Support & Student Services

## Goal

Give Davidson Day School (`davidson-day`) the Learning Support & Student Services section
that Hickory Grove Christian and Cannon already have. It uses the same six cards and is built
only from the school's own pages. A parent should see:

- what the **Learning Enrichment Center (LEC)** offers: one-on-one tutoring, academic
  coaching, OT-led social skills groups, and on-campus speech and occupational therapy;
- that LEC services are billed, with only summer rates published;
- who the school names: 17 staff;
- everything the school does not publish, each shown as a NOT STATED chip. That covers
  eligibility rules, 504/IEP handling, accommodations, evaluation, PT, a psychologist,
  crisis resources and ESL.

Done means the section renders on `/school/davidson-day/` in English and then in all nine
prose locales. Davidson Day's College Support card no longer presumes the LEC manages
accommodations.

## Context

- **The area exists** (PR #357, plan [`learningsupport`](learningsupport.md)). Shipped
  schools: Hickory Grove (#357, refined #358) and Cannon (#361, plan
  [`cannonlearning`](cannonlearning.md)). **Follow `cannonlearning.md` as the procedural
  model**, including its Implementation notes. Its Phase 1 review added:
  - an optional `EligibilityCard.intro`;
  - the shared `CodeLegend` on Testing;
  - staff `email` (mailto with subject "<School name> Inquiry", `schoolInquiryMailto` in
    `src/lib/contact.ts`; `email` is in `SKIP_KEYS`, so it is never extracted).

  All three already exist in code. This plan adds **no chrome key and no component change**.
- Types and registry: `src/data/learningSupport.ts` (`LearningSupportProgram`,
  `LearningCode`, `LEARNING_NEEDS`, `PROGRAMS` at ≈L175). The comment at ≈L158–163 says
  "Hickory Grove Christian and Cannon are researched".
- **Depth and structure reference:** `src/data/learningSupport/cannon.ts`. Copy its header
  comment style, `Source` constants (`'<domain> — <page>'`), group names and row order.
- **Fee-row reference:** `src/data/learningSupport/hickory-grove-christian.ts`, for how
  `IH_FEE` rows state a figure in `detail`.
- Data rules: `src/data/learningSupport/README.md` (line 5 names the shipped schools).
- Renderer: `src/components/LearningSupport.tsx`.
  - The Services legend is fixed at `['IH', 'IH_FEE', 'RF', 'NS']` (≈L196), so it shows
    RF even though Davidson Day has no RF row. That is expected.
  - The Testing legend shows only the codes its entries use (≈L277).
- **Two render gates** (README):
  - the `source-material/learning-support/davidson-day/` folder, which ingest turns into
    a `schools.json` topic;
  - the data file registered in `PROGRAMS`.
- **The College Support link turns on by itself.** `SchoolDetail.tsx` ≈L1276 passes
  `hasLearningSupport` to `WholeClassBody` (`CollegeSupport.tsx` ≈L836). Davidson Day's
  Whole Class card will gain "See Learning Support & Student Services →" directly under
  its LEC rows.
- **Two presumptions sit right above that link.** In
  `src/data/collegeSupportPrograms/davidson-day.ts`:
  - `wholeClass.support[1].text` (≈L686) says tutors work "to clarify learning weaknesses
    and strengthen executive functioning". "clarify learning weaknesses" is on no current
    page.
  - `wholeClass.support[2].text` (≈L690) begins "How the LEC documents approved
    accommodations…".
  - `checklist[7]` (≈L759) begins "If my child has accommodations through the Learning
    Enrichment Center…".

  Both of the last two presume the LEC handles accommodations. No current school page says
  so, and the new section shows "Accommodations & learning plan" as NOT STATED. Left
  alone, the two areas would contradict each other on the same page.
- **Already consistent, no edit needed:** `src/data/afterSchoolPrograms/davidson-day.ts`
  ≈L149 describes the LEC as "tutoring, occupational therapy and speech", quoted correctly,
  as not after-school care.
- **i18n wiring:**
  - `scripts/i18n_topics.mjs` L68 comment reads "Hickory Grove (2026-10-20), Cannon
    (2026-10-24)".
  - Work files `src/data/overlays/work/learning-support.<lang>.json` × 9 exist.
  - Davidson Day is **spliced** in with `scripts/i18n_splice_work.mjs`, never re-extracted
    (memory `splice-not-reextract-for-new-school`).
- **Meta description:** Davidson Day's is 154 chars at 8 areas ("independent research
  across 8 areas — course offerings, global exposure, student clubs and more…"). "9 areas"
  is the same length. `check:seo` enforces ≤160 regardless.

## Decisions

The approval record is the user's AskUserQuestion answers in the `/learning-support`
session on **2026-10-25**:

- **GO/NO-GO: test 2 OVERRIDDEN by the user.** The user chose "Override, proceed".
  - The bar was computed at run time from the thinnest shipped school, **Hickory Grove**:
    14 published of 23 rendered rows (+1 EXCLUDED). Cannon is 17 of 25. Test 3 needs
    ⌈14/2⌉ = 7.
  - Test 1 **passes**: the LEC page (S1).
  - Test 2 **fails**: only 1 of the 3 eligibility cells is verified. *Eligible* is
    verified: all grades, by request, no documentation asked. 504/IEP handling and scope
    are stated nowhere. A deep pass found no handbook or policy. It covered:
    - Wayback back-to-school snapshots of 2026-05-15 and 2026-06-07;
    - all 18 Wayback-held `/fs/resource-manager/` files;
    - the LEC request form;
    - the directory;
    - the Parent Education Hub.
  - Test 3 **passes**: 15 published of 27 rendered rows, 12 NS.
  - Test 4 **passes**: 17 named staff and 5 published summer fees.
  - **Consequence:** the eligibility card ships with `plan` and `scope` as explicit
    not-stated findings. **Record this override in the PR body.**
- **Colours:** the user chose "Navy #062042 + red #C41A3B", giving
  `colors: { brand: '#062042', gold: '#C41A3B' }`. They come from the `<style>` variables
  on davidsonday.org pages (`--secondary-color: #062042`, `--primary-color: #C41A3B`). Red
  is the accent: rules and badges only.

Planning decisions:
- **No new card.** The six existing cards are used, so no UX approval is needed.
- **Two rows are added to Cannon's row set.** Both are services Davidson Day genuinely
  offers and no shipped file names. They are data, not cards.
  - "Social skills groups" goes in Wellness & health.
  - "Summer tutoring & therapy" goes in Learning & academic support.
- **Cannon's "Academic Labs (9–12)" row becomes "Subject tutoring".** It sits in the same
  position and is Davidson Day's equivalent.
- **LEC services are `IH_FEE`, with no school-year figure.** Three things support this:
  - the school's own request form says "we will share important LEC information,
    including our 2026-27 rates";
  - OT is "an additional service";
  - the summer letter bills to the Patriot Account.

  The only figures rendered are the **summer 2026** rates, each labelled as summer. The
  services headline says school-year rates are not published. Never imply a school-year
  figure.
- **No `EXCLUDED` rows and no `RF` rows.** The school states no exclusion and no referral.
- **No glossary markers.** The school never names 504s or IEPs, so the plan cell says so
  in plain words, as Cannon's does.
- **Stat tiles carry no unit words in `value`.** `value` is an unextracted figure field
  (CLAUDE.md "PARTLY-OPEN DEFECT" table), hence the tiles `5`, `13`, `$47` and `2`.
  `$47` goes through `localizeMoneyText()`.
- **Staff card = 17**: the 13 LEC staff in the LEC page's order, then Lynne McClellan,
  Laura Shea, Jessica Thompson and Angela Spraberry from the directory. This is broader
  than Cannon's (which left its nurses out) because the counselor and nurse rows exist only
  in the directory, and naming them is the evidence. College counselors Tia Hill and
  Caitlin Barndt are excluded: they belong to College Support. **Flag at the Phase 1
  stop**: the user may prefer Cannon's narrower scope.
- **Emails only as published.** 15 of 17 have one; Anne McGraw and Nicole Yudin publish
  none. The research file records each address with its directory id.
- **LaRusso's two titles.** He is "Director of Learning Services" on the LEC page, the
  leadership page and in the directory, so the staff row uses that. The staff note quotes
  "Director of Curriculum" from the summer letter, and an Ask question raises it.
- **The request form's apostrophe is straight** in "student's passions and curiosities".
  Keep it as `'` (escaped in the TS string): quotes are char-for-char.
- **College Support fix** is kept to three in-place string swaps (Phase 1 step 4). The
  editorial "A genuinely staffed support structure rather than an accommodations desk"
  (`support[0]`) and the subhead stay untouched.

## Approvals needed

None outstanding. The six cards were approved by the Hickory Grove design handoff. The user
approved the test-2 override and the colours on 2026-10-25. The College Support edit is a
factual correction to existing strings: no new card, row or key.

## Source material

Both files were written during `/learning-support` step 2 and are **uncommitted**.
`/implement` commits them on its branch and ingests them first.

- `source-material/learning-support/davidson-day/Davidson Day School - Learning Support - Official Site Research.md`
  — the record:
  - source table S1–S14;
  - verbatim LEC page, FAQ and request-form text;
  - the **full transcription of `2026SummerLEC.pdf`** (rendered and checked);
  - the 17-person staff table with published emails and directory ids;
  - the "Not found" list;
  - nine "Corrections to the deep-research dossier".

  **Every quote below comes from this file. Copy char-for-char from it.**
- `source-material/learning-support/davidson-day/Davidson Day School - Learning Support - Deep Research.md`
  — an AI lead sheet, explicitly **not a source**.

`Source` constants:

| Const | Label | URL |
|---|---|---|
| `LEC` | `davidsonday.org — Learning Enrichment Center` | https://www.davidsonday.org/academics/learning-enrichment-center |
| `FORM` | `davidsonday.org — Learning Enrichment Center request form, 2026-2027` | https://docs.google.com/forms/d/e/1FAIpQLSc6dwQOOWqVJ2hcJei7et2WNZd9a20OzwaDG-viumjj_BYR1w/viewform |
| `SUMMER` | `davidsonday.org — 2026 Summer Learning Enrichment Center letter (PDF)` | https://www.davidsonday.org/fs/resource-manager/view/5dbaf607-d45e-4c8c-b469-9e3c4c9e0123 |
| `ADMISSION` | `davidsonday.org — Admission Process` | https://www.davidsonday.org/admission/admission-process |
| `TUITION` | `davidsonday.org — Tuition and Affordability` | https://www.davidsonday.org/admission/tuition-and-affordability |
| `MIDDLE` | `davidsonday.org — Middle School` | https://www.davidsonday.org/academics/middle-school |
| `CULTURE` | `davidsonday.org — Community and Culture` | https://www.davidsonday.org/student-life/community-and-culture |
| `DIRECTORY` | `davidsonday.org — Faculty & Staff Directory` | https://www.davidsonday.org/directory |
| `LEADERSHIP` | `davidsonday.org — Our Leadership` | https://www.davidsonday.org/about/leadership |

Notes on the constants:
- `FORM` is labelled as the school's own because it is linked from S1 as "Request Learning
  Enrichment Center Support | 2026-2027 School Year".
- The back-to-school page that linked `SUMMER` is now 404 and is **not cited**. `SUMMER`
  itself is live (200).

## Out of scope

- Compare. The area stays in `COMPARE_DEFERRED_TOPICS`.
- Any other school. No change to Hickory Grove's or Cannon's file.
- Any component, CSS or chrome change. If the browser check finds a render defect, record
  it and raise it before fixing (UX standard).
- Davidson Day areas other than the three College Support strings in step 4.
- Deploying. `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

1. **Branch and stage the research.** From an up-to-date `main`, run
   `git checkout -b feat/ddlearning`. Run `git status --short`: the two
   `source-material/learning-support/davidson-day/*.md` files should be the only untracked
   paths you own.

2. **Ingest.** Run the `ingest-source-material` skill for the new
   `source-material/learning-support/davidson-day/` folder. Expect these to be created or
   changed:
   - `src/content/learning-support/davidson-day.json`;
   - `.claude/docs/learning-support/…` for Davidson Day;
   - `.claude/docs/INDEX.md`;
   - the `davidson-day` entry in `src/data/schools.json`, gaining `learning-support`.

   **Nothing outside learning-support for Davidson Day should change** (memory
   `ingest-full-rebuild-sweeps-topics`). Cannon's ingest also re-stamped another school's
   note date; revert any such incidental line.

3. **Write `src/data/learningSupport/davidson-day.ts`**, exporting
   `davidsonDay: LearningSupportProgram`.
   - Header comment in Cannon's style:
     - fetched 2026-10-25, official pages only, the research file path;
     - the IH_FEE basis (request form + summer letter; summer figures only);
     - no 504/IEP terms on the school's pages, so no glossary markers;
     - **the test-2 override**, one line with the date.
   - Typographic `“ ” ’` in authored prose. Quotes are exact.

   **`colors`:** `{ brand: '#062042', gold: '#C41A3B' }`, with the comment "Patriots —
   navy and red, from davidsonday.org's theme variables".

   **`lead`:**
   - strong: `'Davidson Day’s Learning Enrichment Center “provides personalized, one-on-one instruction that supports students ages two through grade 12,” with tutoring, academic coaching, social skills groups, and speech and occupational therapy on campus.'`
   - muted: `'Services are billed. The school publishes its summer rates, not its school-year rates.'`

   **`stats`:**
   - `{ value: '5', label: 'LEC services', note: 'tutoring, academic coaching, social skills groups, speech-language therapy and occupational therapy' }`
   - `{ value: '13', label: 'Learning Enrichment Center staff', note: 'nine learning specialists, a director, a coordinator, a speech-language pathologist and a literacy coach' }`
   - `{ value: '$47', label: 'a 30-minute summer tutoring session', note: 'summer 2026, billed to the family’s Patriot Account; school-year rates are not published' }`
   - `{ value: '2', label: 'school counselors', note: 'a Lower School Counselor and a Middle and Upper School Counselor, per the staff directory' }`

   **`eligibility`** — sources `[LEC, FORM, ADMISSION]`. No `intro`.
   - headline: `'The Learning Enrichment Center is open to students at every grade, by request. The school publishes no eligibility criteria and does not mention 504 plans or IEPs.'`
   - eligible: `'Each LEC service is “available to students at all grade levels,” and the center supports “students ages two through grade 12.” Families “submit our request form,” and the Director of Learning Services “will then call you to discuss the kind of academic support your child needs.” The 2026-2027 request form asks for no diagnosis, evaluation or other documentation.'`
   - plan: `'The school’s pages do not mention 504 plans, IEPs or accommodations, and the LEC request form does not ask about them.'`
   - scope: `'The school’s pages do not say what the LEC does not provide. The one stated limit is on coaching: “Academic Coaching is more than ‘homework help’,” and “Students will likely have homework remaining after sessions.”'`
   - note: `'Admission asks for “current transcripts and teacher recommendations,” and the school says it “does not discriminate on the basis of” disability, among other categories.'`

   **`services`** — headline:
   `'Every service the school’s pages describe, grouped and coded by who delivers it. LEC services are billed; the school publishes its summer 2026 rates but not its school-year rates. Pick your child’s need to see what applies.'`

   **`verdicts`:**
   - `read`:
     - head: `'One-on-one tutoring for reading, plus a Lower School literacy coach and reading specialist. No reading method is named.'`
     - body: `'LEC tutoring can “address specific academic difficulties (reading fluency and comprehension or math skills).” Ask which reading approach the specialists use.'`
   - `attn`:
     - head: `'One-on-one academic coaching for executive function, at every grade.'`
     - body: `'Coaching helps students “develop organizational and time management skills, learning techniques, and self-advocacy,” and every Middle School student takes a study skills course each year.'`
   - `math`:
     - head: `'One-on-one math tutoring, by request.'`
     - body: `'LEC instructors give “review or remedial instruction” in subjects including Math, and tutoring “is often done during the school day, often during a study hall period.”'`
   - `speech`:
     - head: `'On campus during the school day, through a contracted provider.'`
     - body: `'“Davidson Day School has a contract with Speech Techniques to provide speech-language services on campus during the school day,” with sessions “typically lasting 30-minutes.”'`
   - `motor`:
     - head: `'Occupational therapy on campus through a contracted provider. No physical therapy is listed.'`
     - body: `'Integrative Wellness provides OT “on campus during the school day as an additional service,” for “handwriting, visual-motor integration, sensory processing, social skills, and other fine motor skills.”'`
   - `social`:
     - head: `'Social skills groups led by an occupational therapist, and two school counselors.'`
     - body: `'Groups of “3-4 students, grouped by age and goal areas” meet weekly for 30 minutes. The directory lists a Lower School Counselor and a Middle and Upper School Counselor.'`
   - `gifted`:
     - head: `'Upper School courses for ready Middle Schoolers, and an enrichment option in the LEC. No formal gifted program.'`
     - body: `'Middle Schoolers “ready to learn at the next level” can take world language and mathematics in the Upper School, and the LEC request form offers “Personalized Exploration (Enrichment) focused on student\'s passions and curiosities.”'`

   **`groups`.** Names match Cannon's exactly. Codes, needs and suggested details follow.
   Keep every quote exact.

   *Learning & academic support*
   | service | code | needs | detail |
   |---|---|---|---|
   | Specialized teachers | IH | read, attn, math | `'Nine Learning Specialists, a Lower School Literacy Coach and a Director of Learning Services staff the LEC; the directory also lists a Lower School Reading Specialist.'` |
   | Reading intervention | IH_FEE | read | `'One-on-one tutoring can “address specific academic difficulties (reading fluency and comprehension or math skills).” No method (e.g., Orton-Gillingham, structured literacy) is named.'` |
   | Math intervention | IH_FEE | math | `'One-on-one tutoring in “math skills,” as part of LEC tutoring.'` |
   | 1:1 / small-group instruction | IH_FEE | read, attn, math | `'LEC instructors “meet with students in a one-on-one setting for one or more sessions per week.” The only small groups are the social skills groups, of “3-4 students.”'` |
   | Subject tutoring | IH_FEE | read, math | `'“Review or remedial instruction in a specific subject area (Language Arts, Math, Science, Social Studies, and/or Foreign Language),” often “during a study hall period.”'` |
   | Executive-function coaching | IH_FEE | attn | `'Academic coaching builds “organizational and time management skills, learning techniques, and self-advocacy.” It “is more than ‘homework help’.”'` |
   | Learning-support class | IH | attn | `'No learning-support class is described, but “every Middle School student takes a study skills course each year.”'` |
   | Accommodations & learning plan | NS | read, attn, math, speech, motor | `'Not described. The LEC’s learning specialists “will have direct contact with the classroom teacher,” and families get a weekly email.'` |
   | Specially designed instruction | NS | read, attn, math | `'Not described. LEC lesson plans are individualized tutoring, not a modified curriculum.'` |
   | Self-contained / separate program | NS | — | `'No separate program described.'` |
   | Gifted / advanced | IH | gifted | `'Middle Schoolers can take Upper School world language and math; the LEC request form offers “Personalized Exploration (Enrichment).” No formal gifted program.'` |
   | Eligibility documentation | NS | read, attn, math, speech, motor, social | `'None asked. The LEC request form asks for grade, services, goals and frequency; admission asks for “current transcripts and teacher recommendations.”'` |
   | Summer tutoring & therapy | IH_FEE | read, attn, math, speech, motor | `'June 1 to July 30, 2026: tutoring $47 for 30 minutes, $63 for 40 and $78 for 50; occupational therapy $160 for a 60-minute session; speech therapy $80 for a 30-minute session, all “billed directly to your Patriot Account.”'` |

   *Therapy & related services*
   - `Speech-language therapy`, IH_FEE [speech]: `'Through a contract with Speech Techniques, “on campus during the school day,” one-on-one, with sessions “typically lasting 30-minutes.”'`
   - `Occupational therapy`, IH_FEE [motor]: `'Through a contract with Integrative Wellness, “on campus during the school day as an additional service,” one-on-one.'`
   - `Physical therapy`, NS [motor]: `'Not listed by the school.'`

   *Assessment*
   - `Early identification (JK–2)`, NS [read, attn, math, speech]: `'No screening is described. The Gesell Readiness Assessment is an admission test.'`
   - `Testing accommodations`, NS [read, attn, math]: `'Not described, for the ISEE or school exams.'`
   - `Entrance testing`, IH []: `'The Gesell Readiness Assessment (Junior Kindergarten–1st Grade), a reading assessment plus the at-home ISEE (2nd–4th Grade), and the ISEE (5th–12th Grade).'`
   - `Psychoeducational evaluation`, NS [read, attn, math, speech, motor]: `'Not described: neither in-house testing nor a referral list.'`

   *Wellness & health*
   - `Counseling & emotional support`, IH [social]: `'The directory lists a Lower School Counselor and a Middle and Upper School Counselor; “Social-emotional learning is a cornerstone of the Davidson Day Lower School experience.”'`
   - `Social skills groups`, IH_FEE [social]: `'“Led and directed by an occupational therapist,” for “3-4 students, grouped by age and goal areas,” meeting weekly for 30 minutes.'` Note that the page's capital is "Social Skills Groups are led and directed…". Quote the fragment "led and directed by an occupational therapist" in lower case, so the quote stays exact.
   - `Emotional & behavioral intervention`, NS [social]: `'Not described beyond the social skills groups.'`
   - `Crisis resources`, NS [social]: `'No crisis resources are published.'`
   - `School psychologist`, NS [social]: `'None named.'`
   - `School nurse`, IH []: `'A School Nurse is listed in the staff directory.'`

   *Language*
   - `ESL / English-language support`, NS []: `'Not described.'`

   Expected totals: **27 rows: IH 6** (Specialized teachers, Learning-support class,
   Gifted, Entrance testing, Counseling, School nurse) **+ IH_FEE 9** (Reading, Math, 1:1,
   Subject tutoring, EF coaching, Summer, Speech, OT, Social skills groups) **= 15
   published, and 12 NS**. There are 0 RF, 0 REQUIRED and 0 EXCLUDED. Count with a node
   one-liner after writing; any other total is a mapping error.

   `services.sources`: `[LEC, FORM, SUMMER, ADMISSION, MIDDLE, CULTURE, DIRECTORY]`.

   **`therapy`** — sources `[LEC, SUMMER, DIRECTORY]`:
   - headline: `'Speech and occupational therapy are on campus during the school day through contracted providers, as billed LEC services. Physical therapy is not listed.'`
   - items:
     - `{ name: 'Speech-language', code: 'IH_FEE', detail: 'Speech Techniques, on campus; sessions typically 30 minutes. Summer 2026: $80 a session.' }`
     - `{ name: 'Occupational', code: 'IH_FEE', detail: 'Integrative Wellness, on campus, “an additional service.” Summer 2026: $160 for a 60-minute session.' }`
     - `{ name: 'Physical', code: 'NS' }`
   - note: `'Rebecca Miller, Speech/Language Pathologist, is on the LEC staff list. School-year therapy rates are shared with families before school starts and are not published.'`

   **`testing`** — sources `[ADMISSION]`. headline:
   `'Davidson Day publishes its admission assessments by grade. It does not say whether it evaluates learning differences, or who does.'`
   Entries:
   1. `IH`, `'Early Preschool and Preschool'`: `'Children join a classroom, “with teachers observing to assess fine and gross motor skills, collaboration, and areas of individual interest.”'`
   2. `IH`, `'Junior Kindergarten–1st Grade'`: `'Students “will take the Gesell Readiness Assessment during their shadow visit.”'`
   3. `IH`, `'2nd–4th Grade'`: `'A reading assessment during the shadow visit, and the Independent School Entrance Exam (ISEE) “at home.”'`
   4. `IH`, `'5th–12th Grade'`: `'Students “will take the Independent School Entrance Exam (ISEE).”'`
   5. `NS`, `'Psychoeducational evaluation'`: `'The school does not say whether it tests for learning differences, asks for an outside evaluation, or names evaluators.'`

   **`staff`** — sources `[LEC, DIRECTORY, LEADERSHIP]`:
   - headline: `'Seventeen named staff: the 13-person Learning Enrichment Center, a Lower School reading specialist, two school counselors and the school nurse.'`
   - people, in this order, with `email` exactly as the research file's table (none for
     McGraw or Yudin):
     1. Jennifer Breen — Learning Specialist — jbreen@davidsonday.org
     2. Kortney Chinn — Learning Specialist — kchinn@davidsonday.org
     3. Lauren Denny — Learning Specialist — ldenny@davidsonday.org
     4. Daniel Fatjo — Learning Specialist — dfatjo@davidsonday.org
     5. Chuck LaRusso — Director of Learning Services — clarusso@davidsonday.org
     6. Anne McGraw — Learning Enrichment Center Coordinator — (none)
     7. Rebecca Miller — Speech/Language Pathologist — rmiller@davidsonday.org
     8. Kelly Sapp — Learning Specialist — ksapp@davidsonday.org
     9. Susan Schock — Learning Specialist — sschock@davidsonday.org
     10. Caryn Shelton — Lower School Literacy Coach — cshelton@davidsonday.org
     11. Michael Sutton — Learning Specialist — msutton@davidsonday.org
     12. Laura Wansley — Upper School Science Teacher & Learning Specialist — lwansley@davidsonday.org
     13. Nicole Yudin — Learning Specialist — (none)
     14. Lynne McClellan — Lower School Reading Specialist — lmcclellan@davidsonday.org
     15. Laura Shea — Lower School Counselor — lshea@davidsonday.org
     16. Jessica Thompson — Middle and Upper School Counselor — jthompson@davidsonday.org
     17. Angela Spraberry — School Nurse — aspraberry@davidsonday.org
   - note: `{ strong: 'Requests go to Dr. Chuck LaRusso, Director of Learning Services.', muted: 'The school’s 2026 summer letter signs him “Director of Curriculum.”' }`

   **`ask`:**
   - headline: `'Eleven questions to take on the tour, covering what the school’s site leaves unanswered: rates, prior plans, accommodations, methods, evaluation, therapy and staff.'`
   - questions:
     1. `'What are the 2026-27 rates for tutoring, academic coaching, social skills groups, speech and occupational therapy, and does financial aid cover any of them?'`
     2. `'How is a 504 plan, IEP or prior school’s accommodations plan handled when a student enrolls?'`
     3. `'Which classroom and testing accommodations do you provide, and do they apply to the ISEE and to school exams?'`
     4. `'Which reading method do the Literacy Coach, Reading Specialist and Learning Specialists use (e.g., Orton-Gillingham, Wilson, structured literacy)?'`
     5. `'Do you ever modify the curriculum, or is LEC support always tutoring alongside it?'`
     6. `'Is there any screening for reading, math or attention, and who carries out psychoeducational evaluations? Do you keep a list of evaluators?'`
     7. `'Is there a school psychologist, and what is the crisis protocol?'`
     8. `'Is physical therapy available on campus?'`
     9. `'Is any English-language (ESL) support offered?'`
     10. `'Do Speech Techniques and Integrative Wellness bill families through the Patriot Account or directly, and can therapy be billed to insurance?'`
     11. `'Is Dr. LaRusso the Director of Learning Services or the Director of Curriculum, and who oversees the LEC?'`
   - asOf: `'October 25, 2026'`

4. **College Support correction** in `src/data/collegeSupportPrograms/davidson-day.ts`.
   These are in-place text swaps at the same indices, so no paths shift.
   - `wholeClass.support[1].text`: keep the first sentence byte-identical. Replace the
     second with:
     `'Tutors work in partnership with families and classroom teachers, and one-on-one academic coaching builds executive-function skills.'`
   - `wholeClass.support[2].text`, replaced whole:
     `'The school’s pages never say whether the LEC writes or manages accommodations, let alone how they would carry over to College Board / ACT testing and to college disability services. The services are well documented; any hand-off into the application process is not.'`
     The label "Where it stops" is unchanged.
   - `checklist[7]`, replaced whole:
     `'Does the Learning Enrichment Center write or manage accommodations? If so, who gets them approved for College Board and ACT testing, and documented for college disability services?'`
   - Grep afterwards: `grep -n "clarify learning weaknesses\|documents approved accommodations\|has accommodations through" src/data/collegeSupportPrograms/davidson-day.ts`
     should give 0 hits.

5. **Register and update the "researched schools" wording.**
   - `src/data/learningSupport.ts`:
     - add `import { davidsonDay } from './learningSupport/davidson-day.ts'`;
     - `PROGRAMS` gains `'davidson-day': davidsonDay`, alphabetical: `cannon`,
       `'davidson-day'`, `'hickory-grove-christian'`;
     - the comment becomes "Hickory Grove Christian, Cannon and Davidson Day are
       researched…".
   - `src/data/learningSupport/README.md` line 4–5: "…Cannon followed (2026-10-24), then
     Davidson Day (2026-10-25)."
   - `scripts/i18n_topics.mjs` L68 comment: "Hickory Grove (2026-10-20), Cannon
     (2026-10-24), Davidson Day (2026-10-25)."

6. **Regenerate and compile.** Run `npm run schema`; only the learning-support school
   coverage should change in `.claude/docs/DATA-SCHEMA.md`, with no new card or key. Then
   `npx tsc -b`, then `npm run build` (`check:live` is expected red in Phase 1; see
   Verification).

7. **Browser check** (Verification), then commit with **explicit paths** after
   `git status --short`. Push and verify the push (`git rev-parse HEAD` vs
   `git ls-remote origin feat/ddlearning`). Flip this plan to `english-done` and the INDEX
   row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The stop
message should include:
- the row tally (27 / 15 / 12);
- **the test-2 override** and how the eligibility card now reads;
- the IH_FEE coding with summer-only figures;
- the 17-person staff scope (nurse and counselors included, unlike Cannon);
- the two added rows;
- the three College Support swaps.

### Phase 2 — Every other locale

Prose only. There are **no chrome changes**: every key exists in all ten catalogs. Scope is
`PROSE_TRANSLATED` (`es, bn, ht, te, fr, fa, it, hi, ar`; confirm in `src/lib/i18n.ts`),
for topics `learning-support` and `college-support`. The mechanism is in
`.claude/docs/prose-translation-architecture.md`. For method, follow Telugu's or Bangla's
rollout docs, never Italian's. Cannon's Phase 2 notes in `cannonlearning.md` are the
nearest precedent.

8. **Measure scope from a fresh extract.** For each topic, run
   `node scripts/i18n_extract.mjs --topic <topic> --lang __verify --out <scratch>` and diff
   its stamps against `src/data/overlays/work/<topic>.es.json`. Expected:
   - `learning-support`: about 100+ **added** and **0 dropped**. Strings shared verbatim
     with Cannon or Hickory Grove only gain `at` paths: `'None named.'`,
     `'Not listed by the school.'`, `'Speech-language'`, `'Occupational'`, `'Physical'`,
     the group names and shared service names.
   - `college-support`: 3 retired + 3 new (the three swapped strings).

   Investigate any other drop before writing.

9. **Splice** with `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`
   (`--dry-run` first) × 9 locales × 2 topics. Translate the added entries as
   stamp→translation maps, applied by stamp, **never by index** (memories
   `splice-work-files-by-stamp`, `parallel-locale-agents-collide`: agents write maps, main
   applies). Rules:
   - **Quotes** are translated quotations inside quote marks, consistent with how each
     locale renders the same phrasings in Cannon's and Hickory Grove's files.
   - **Figures char-for-char**:
     - `$47`, `$63`, `$78`, `$160`, `$80` (money is localized at render; never re-type);
     - `30`, `40`, `50`, `60`, `3-4`, `13`, `17`, `2026-2027`, `2026-27`;
     - the grade bands `JK–2`, `2nd–4th`, `5th–12th`.

     For `hi`/`te`, store the English form.
   - **Dates translate**: `June 1 to July 30, 2026`, `October 25, 2026`.
   - **`fa`/`ar`**: store no bidi isolates, and **watch ranges reversing in RTL** (memory
     `rtl-figure-range-reverses`). Write `3-4 students`, `2nd–4th`, `5th–12th` and the
     summer date range in words ("3 to 4") where they reverse in the browser, as Cannon's
     counselor grades were. Record any rewording in `src/data/overlays/NOTES.md`.
   - **Names stay Latin**, and so do `Speech Techniques`, `Integrative Wellness`, `Gesell
     Readiness Assessment`, `ISEE`, `Patriot Account`, `College Board`, `ACT`,
     `Orton-Gillingham`, `Wilson`, `LEC`. Expand `LEC` per locale as the area's overlays
     already do for acronyms, if they do.
   - **Staff `role` strings are prose** and translate. Reuse each locale's existing wording
     for "Lower School", "Middle School" and "Upper School" from Davidson Day's other
     overlays. **Never infer gender from a name** (Cannon note): use the role-referent
     form, `/a`, `(ne)` or `/ة`.
   - **French:** run `check:fr` for identifiers.

10. **Rebuild overlays** with `npm run i18n:build -- --topic <topic> --lang <code>`, for
    both topics × 9 locales.

11. **Phase 2 verification** (below). Then commit with explicit paths, push and verify,
    open the PR with `--body-file`; the body records the test-2 override and the colour
    decision. Run `gh pr merge --squash --delete-branch`, then
    `git checkout main && git pull`. Flip the plan to `implemented` and the INDEX row to
    *Implemented* with the PR link, add `## Implementation notes` for any deviation, and
    write the memory note. **Do not deploy.** End with "merged — ready to deploy whenever
    you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/learning-support/davidson-day/*.md` (2) | new: research record + lead sheet (already written) |
| `src/content/learning-support/davidson-day.json`, `.claude/docs/learning-support/…`, `.claude/docs/INDEX.md`, `src/data/schools.json` | generated by ingest |
| `src/data/learningSupport/davidson-day.ts` | new: Davidson Day's six cards |
| `src/data/learningSupport.ts` | import + `PROGRAMS` + comment |
| `src/data/learningSupport/README.md` | researched-schools wording |
| `scripts/i18n_topics.mjs` | comment only |
| `src/data/collegeSupportPrograms/davidson-day.ts` | three strings (LEC accommodations presumption) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/{learning-support,college-support}.<lang>.json` × 9 | Phase 2 splice |
| `src/data/overlays/{learning-support,college-support}.<lang>.json` × 9 | Phase 2 rebuild |
| `src/data/overlays/NOTES.md` | only if an RTL range is reworded |
| `.claude/plans/ddlearning.md`, `.claude/plans/INDEX.md` | status |

No skill or command changes, so `.claude/SKILLS.md` is untouched.

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run build`: **exits 1 on `check:live` only**, with findings limited to the 3
      retired college-support stamps × 9 locales. Every other chained check passes,
      including:
      - `check:seo` (Davidson Day's description ≤160);
      - `check:schema`;
      - `check:moneytext` (the summer `$` figures render without eating punctuation).

      If `check:live` blocks the browser build, use `npx vite build && npm run prerender`.
- [ ] Grep from step 4: 0 hits.
- [ ] Row count: a node one-liner over the `services` block prints
      `{ IH: 6, IH_FEE: 9, NS: 12 }`, 27 total, which is 15 published.
- [ ] **Browser check (required).** Run `npx vite preview` and drive it with Playwright in
      real Chrome (`channel: 'chrome'`), using `domcontentloaded` (**not** `networkidle`)
      and **every `<details>` forced open**. On `/school/davidson-day/`, confirm:
      - Learning Support renders with six cards in order, no kickers, no Compare button,
        navy/red section colours, and readable dark-theme ink. Red is on rules and badges
        only, never body text on the light ground.
      - Four stat tiles; `$47` renders as `$47`.
      - **NOT STATED chips**: 12 in Services, 1 in the therapy strip and 1 on the Testing
        psychoeducational entry, so 14 data chips. Count the legend sample chips separately:
        Services' fixed legend plus Testing's, which shows IH and NS. No blank code cells.
      - The "Physical / motor" need filter shows the OT verdict.
      - Seventeen staff in order. 15 mailto links, subject "Davidson Day School Inquiry"
        (verify the exact school name the helper uses). McGraw and Yudin are aligned with
        no link.
      - Ask the School shows 11 questions and "October 25, 2026". Check `ask.headline`
        with the card **closed**.
      - "Show sources" on Services lists the summer PDF and the request form.
      - College Support → Whole Class: the three swapped strings render, and "See Learning
        Support & Student Services →" is present and scrolls to `#topic-learning-support`
        (a known first-click shortfall exists on schools with lazy content above; see
        `cannonlearning` notes, not in scope).
      - `/school/cannon/` and `/school/hickory-grove-christian/` are unchanged.
      - Overflow 0 at 1280 light, 1280 dark and 390 light.
      - `npm run audit:mobile -- --only davidson-day`: 0 overflow, 0 broken cards.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**: `check:live` green, `check:runtime` resolves all nine.
- [ ] Splice reports **0 dropped** for learning-support, and 3 for college-support.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted.
- [ ] `check_figures.py --topic learning-support` and `--topic college-support` ×9: no new
      findings versus `main`.
- [ ] `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`, `check:dates`,
      `check:money`, `check:moneytext`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: findings limited to
      the splice growth and the 3 College Support swaps.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a `main` baseline: no new
      hits. Cannon's pass found 9 real leaks in role labels and row names, so triage every
      one.
- [ ] **Browser:** `es`, `hi` and `fa` at 1280 (`?lang=<code>`), every card open, on
      `/school/davidson-day/`. Check that:
      - Learning Support and the College Support rows are translated, with 0 English
        sentences;
      - figures match the English, with summer money localized (`47 US$` in es/fr);
      - `fa` has no reversed ranges (`3-4`, grade bands, summer dates).

      Then run `npm run audit:mobile -- --only davidson-day --lang <code>` at 320px for
      every locale, and `npm run audit:moneyrender` (needs build + preview) to confirm no
      raw `$<digit>` on es/fr.

## Risks

| Risk | Mitigation |
|---|---|
| The ingest rebuild sweeps other topics into the diff | Step 2 inspects the diff; revert anything outside Davidson Day learning-support |
| A quote drifts from the live page | Copy from the research file; char-for-char (README) |
| A summer figure reads as a school-year price | Every figure is labelled "summer 2026"; the headline and stat note say school-year rates are unpublished |
| Eligibility card reads as hollow (the override) | It states the request process and two explicit not-stated findings; raised at the Phase 1 stop |
| RTL range reversal in fa/ar | Browser check; reword in words, as Cannon did |
| Gendered role translations | Role-referent forms, never inferred from names |

## Open questions

- **Staff scope: 17 (with nurse and counselors) or Cannon's narrower set?** **Default:**
  17. The user can trim at the Phase 1 review.
- **Should the summer row be split into tutoring and therapy rows?** **Default:** one
  row. All of its figures come from one letter on one billing basis.

## Implementation notes

### Phase 1 (English) — 2026-10-25

- **Two quotes reworded to keep them exact.** Both fragments are lower case on the page,
  and a case-sensitive check of every `“…”` against the research file caught them:
  - Subject tutoring now reads "Sessions provide “review or remedial instruction in a
    specific subject area (…)”". The plan had a capital "Review".
  - Social skills groups now reads "Groups are “led and directed by an occupational
    therapist,” …". The plan's note asked for the lower-case quote, but its suggested
    detail opened with a capital "Led".
- **`TUITION` added to `services.sources`.** The plan defined the constant but put it on
  no card, so it would have been unused. The tuition page carries no LEC line, which is
  the evidence for "school-year rates are not published".
- **NOT STATED in the DOM: 14 data chips plus 2 legend samples.** The data chips are 12 in
  Services, 1 in therapy and 1 in Testing, as planned. The Services legend shows
  IH | IH · FEE | RF | NOT STATED; the Testing legend shows IH | NOT STATED.
- **Ingest re-stamped Cannon's and Hickory Grove's note dates.** Both one-line changes
  were reverted.
- `npm run build` exits 1 on `check:live` only. The failures are 3 retired
  college-support stamps × 9 locales (`68da65a1`, `56c68e67`, `660d65b7`), exactly the
  three swaps. Every check chained after it was run separately and passes: `check:chrome`,
  `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`, `check:news` and
  `check:photos`.
  - `check:spans` prints a notice about a changed `bucket-nu75` Compare leader. That row
    is not touched here; it is from an earlier PR.
- The meta description is now 153 characters ("9 areas … student support and more").
- **Browser check in Chrome:** 1280 light and dark, plus 390. It confirmed:
  - 6 cards with no kickers, 4 tiles, `$47` rendering as `$47`, 27 rows and 0 blank code
    cells;
  - the Motor/OT filter shows the OT verdict;
  - 17 staff in order, with 15 mailto links using the subject "Davidson Day School
    Inquiry";
  - 11 questions;
  - the summer PDF and the request form listed under the Services sources;
  - all three College Support swaps rendering, and the link landing at 80px on the first
    click;
  - overflow 0 at every width;
  - Cannon (25 rows, 12 staff) and Hickory Grove (23, 9) unchanged.

  `audit:mobile --only davidson-day`: 0 broken cards and 0 page overflow.
- **For the review:** the need-filter verdict panel is tinted with the accent (22% red
  over the page ground), and its text is navy. That is the same mechanism that gives
  Cannon a gold-tinted panel, so it shows a pink panel here.
- **Review edit (2026-10-25): people on the Therapy card get the staff card's email row,
  for every school (user request, a standing rule).**
  - `TherapyCard` gains an optional `people?: StaffPerson[]`. `StaffPerson` is now a
    named type shared with `StaffCard`.
  - `LearningSupport.tsx` pulls the staff rows out into a shared `PeopleList`, rendered
    under the therapy grid (`.ls-staff-therapy`, 12px top margin). `TherapyBody` now
    receives `schoolName`, which the mailto subject needs.
  - Davidson Day's therapy card lists Rebecca Miller, Speech/Language Pathologist, with
    `rmiller@davidsonday.org`. Her name came out of `therapy.note`, which now reads "The
    speech-language pathologist is on the LEC staff list. …".
  - **i18n:** `role` is a skip key, so `therapy.people[].name` (false) and
    `therapy.people[].role` (true) were added to `PATH_OVERRIDES`. Without them the role
    would have shipped English in every locale. A fresh extract confirms the role now
    carries both `at` paths, with no name or email extracted.
  - The rule is recorded in `learningSupport/README.md`, the skill's step 2 and
    `SKILLS.md`. Cannon and Hickory Grove name no therapist, so neither changes.
- **Review edit (2026-10-25): Testing & Evaluation is about identifying a need, not
  admission (user correction, a standing rule).**
  - Davidson Day's four admission-assessment entries were removed. Its entrance tests
    remain in the Services "Entrance testing" row.
  - The card now holds three entries:
    - IH: "Request and intake call", quoting the LEC FAQ, with the form's
      no-documentation finding as the muted line;
    - NS: "Screening for reading, math or attention";
    - NS: "Psychoeducational evaluation".
  - Its sources are `[LEC, FORM]`, and the headline was rewritten.
  - The rule is in the README, the skill's scoring table and `SKILLS.md`.
  - **Applied to every shipped school (user request, 2026-10-25).** This goes beyond the
    plan's "no change to Hickory Grove's or Cannon's file".
    - **Cannon:** removed "Entrance evaluations" (`entries[2]`) and dropped `APPLY` from
      `testing.sources`. College Board / ACT accommodations stays, because it serves
      students who have a Learning Plan.
    - **Hickory Grove:** removed "Entrance testing" (`entries[2]`, its last entry).
      "Results at admission" stays, because it asks for an existing IEP, 504 or
      evaluation.
    - Both schools' Services "Entrance testing" rows already hold the same facts.
  - **Overlay surgery, no new translation.** In all nine
    `work/learning-support.<lang>.json` files:
    - the four removed `at` paths were dropped, removing three entries; Hickory Grove's
      "Entrance testing" title survives because its Services row shares it;
    - Cannon's `testing.entries[3].*` was re-pathed to `[2]` (memory
      `overlay-at-paths-go-stale-on-row-delete`);
    - the files were confirmed to round-trip byte-identically first, and 0 duplicate
      `at` paths remain.

    The overlays were rebuilt with `i18n:build`. `check:live` shows no learning-support
    finding, and `check:runtime` and `check:sepdrift` (es/fa/hi) are clean. In Chrome,
    Cannon and Hickory Grove in en/es/fa/hi render the remaining entries translated, in
    order.
