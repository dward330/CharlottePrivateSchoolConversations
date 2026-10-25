---
name: cannonlearning
title: Add Cannon School to Learning Support & Student Services — six cards from Cannon's own pages (Learning Support Program + 2025 policy PDF; 25 service rows, 17 published; 12 staff); fix the stale Hurtado line in College Support
status: english-done
phases: 2
created: 2026-10-24
branch: feat/cannonlearning
prs: []
---

# Cannon School — Learning Support & Student Services

## Goal

Give Cannon School (`cannon`) the Learning Support & Student Services section that Hickory
Grove Christian already has. It uses the same six cards and is built only from Cannon's own
pages and PDFs. A parent should be able to see who the Learning Support Program serves,
what it requires (a recent psychoeducational evaluation, current-student status), what is
offered in-house or by referral, and what the school does not publish (fees, OT/PT, a
psychologist, ESL, the reading method). Each of those gaps shows as a NOT STATED chip.

Done means the section renders on `/school/cannon/` in English and then in all nine prose
locales. Cannon's College Support card no longer names a specialist who is on no current
page.

## Context

- **The area exists** (PR #357, plan [`learningsupport`](learningsupport.md); refined by
  [`hgcsconsistency`](hgcsconsistency.md), PR #358). Hickory Grove is the only school.
  - Types and card registry: `src/data/learningSupport.ts` (`LearningSupportProgram`,
    `LearningCode`, `LEARNING_NEEDS`, `LEARNING_SUPPORT_CARDS`, the `PROGRAMS` record).
  - The standard to mirror: `src/data/learningSupport/hickory-grove-christian.ts`, for its
    shape, its `Source` constants with labels `'<domain> — <page>'`, its group names and
    row order.
  - Data rules: `src/data/learningSupport/README.md`.
  - Renderer: `src/components/LearningSupport.tsx`; wired in `src/pages/SchoolDetail.tsx`
    (≈L995 `learningSupportProgram(slug, lang)`, ≈L1135, ≈L1478).
  - All chrome exists already: `cards.learning-support.*`, `learning.*`, `topics`,
    `metrics` in all ten catalogs. **This plan adds no chrome key.**
- **Two gates make it render** (README): a `source-material/learning-support/cannon/*.md`
  folder, which ingest turns into a `schools.json` topic entry, and a data file registered
  in `PROGRAMS`.
- **The College Support link turns on by itself.** `SchoolDetail.tsx` ≈L1265 passes
  `hasLearningSupport={covered.some((c) => c.slug === 'learning-support')}` to
  `WholeClassBody` (`src/components/CollegeSupport.tsx` ≈L820). Once Cannon is covered,
  its Whole Class card shows "See Learning Support & Student Services →".
- **A stale claim sits right above that link.** `src/data/collegeSupportPrograms/cannon.ts`:
  - `wholeClass.support[0]` (≈L690–692) says "Three named Upper School specialists —
    **Michelle Donah**, **Tere Hurtado** and **Jennifer Ridenhour**".
  - `verdict.points[4]` (≈L761–762) says "three named Upper School learning specialists".

  Tere (Teresita) Hurtado appears on **no current Cannon page**. The Learning Support page,
  the ARC page and the directory's Learning Support filter list Donah and Ridenhour for the
  Upper School. Only the 404 legacy page named Hurtado. This is the same kind of defect
  `hgcsconsistency` item 1 fixed for Hickory Grove. Her name also lives in the nine
  `college-support.<lang>.json` overlays and `work/college-support.it.json`, so it leaves
  those through the Phase 2 splice and rebuild, not by hand.
- **Meta description:** Cannon's is 147 chars today (9 areas, a 3-topic sample). Learning
  Support sorts after `international-travel` in `TOPIC_ORDER`, so it is not in the sample,
  and "10 areas" adds 1 char. `check:seo` enforces the 160-char limit anyway.
- **i18n wiring** already covers the topic: `scripts/i18n_topics.mjs` maps
  `'learning-support': 'learningSupport'` (L69, with the comment "Hickory Grove only"), and
  `scripts/gen_data_schema.mjs` L237 registers the cards. Work files exist:
  `src/data/overlays/work/learning-support.<lang>.json` × 9. Adding Cannon means **splicing**
  its strings in with `scripts/i18n_splice_work.mjs`, never re-extracting (memory
  `splice-not-reextract-for-new-school`; `i18n_extract` has no carry-over).
- **No conflict with Course Offerings:** Cannon's block (`courseOfferings.ts` ≈L3170)
  names no reading-intervention method. The `SIPPS` line at ≈L8855 belongs to another
  school.

## Decisions

The approval record is the user's AskUserQuestion answers in the `/learning-support`
session on **2026-10-24**:

- **Proceed: GO** — "Proceed to /plan (Recommended)".
  - The bar was computed from Hickory Grove's data file: 14 published of 23 rendered rows
    (+1 EXCLUDED), 3/3 eligibility cells, 9 staff.
  - Cannon passes all four tests: an official program page (S1); 3/3 eligibility cells;
    **17 published of 25 rendered** rows (8 NS; minimum 7); 12 named staff.
- **Colours** — "Maroon #87212e + gold #e39e25 (Recommended)":
  `colors: { brand: '#87212e', gold: '#e39e25' }`. Both come from cannonschool.org's theme
  CSS (`/uploaded/themes/default_20/main.css`): `#87212e` is its most-used colour (194
  uses) and `#e39e25` its accent.
- **Staff card** — "Learning support + ARC + counselors (12) (Recommended)". The two
  nurses appear only in the School nurse services row.

Planning decisions:
- **No new card.** The six existing cards are used, so no UX approval is needed (the
  Hickory Grove handoff approved them).
- **One row is added to the Hickory Grove row set.** "Early identification (JK–2)" goes in
  the Assessment group: Cannon genuinely offers it and no existing row names it. It is
  data, not a card.
- **Curriculum modification is coded `NS`, not `EXCLUDED`.**
  - The policy says acceptance "does not imply that the school will assume the
    responsibility for all of the special learning needs of the child, especially when such
    needs may require a modification/alteration of the school's curriculum".
  - That is a hedge, not "we do not provide". `EXCLUDED` is reserved for an explicit
    refusal. The scope cell quotes the hedge in full.
  - **Flag this coding in the Phase 1 stop message** so the user can overrule it.
- **Emotional & behavioral intervention is `RF`**, unlike Hickory Grove's `EXCLUDED`.
  Cannon's counselors provide short-term counseling and "community resource referrals
  (including longer-term therapy services)".
- **No 504/IEP glossary markers** in Cannon's eligibility cells. Cannon never names
  either, and that absence is the finding. The Ask card asks the question in plain words.
- **No fee is rendered as a figure.** None is published. The only "free" statement is the
  Middle School handbook's teacher-help line ("No fee is charged"), quoted for that service
  only.
- **Stat tiles carry no unit words in `value`**, because `value` is an unextracted figure
  field (CLAUDE.md, the "PARTLY-OPEN DEFECT" table: `2 years` ships English). Hence the
  tiles `JK–12`, `4`, `~240`, `5`. The "3 years" evaluation limit goes in prose.
- **Ridenhour's title is the directory's**, "Upper School Dean of Academic Support" (S3,
  S10). The news story's "Upper School Student Academic Support Coordinator" is recorded
  in research only.
- **College Support fix**, kept to the two stale strings: Donah + Ridenhour, two named
  Upper School learning-support staff, with exact text in Phase 1 step 4. The rest of that
  row, including the existing editorial "among the best-documented learning support in
  this set", is untouched. It is outside this area's rules and not part of this change.

## Approvals needed

None. The six cards were approved by the Hickory Grove design handoff, and the user
approved GO, colours and staff scope on 2026-10-24. The College Support edit is a factual
correction to existing strings: no new card, row or key.

## Source material

Both files were written during `/learning-support` step 2 and are **uncommitted**.
`/implement` commits them on its branch and ingests them first.

- `source-material/learning-support/cannon/Cannon School - Learning Support - Official Site Research.md`
  — the record:
  - source table S1–S20;
  - verbatim excerpts;
  - a **full transcription of the 2025 Learning Support Program Policy and Enrollment
    Form** (S2);
  - the directory staff table;
  - excluded content;
  - the "Not found" list;
  - "Corrections to the deep-research dossier".

  **Every fact and quote below comes from this file. Quote char-for-char from it.**
- `source-material/learning-support/cannon/Cannon School - Learning Support - Deep Research.md`
  — an AI lead sheet, explicitly **not a source**.

Source URLs for the `Source` constants (labels in the Hickory Grove style):

| Const | Label | URL |
|---|---|---|
| `LSP` | `cannonschool.org — Learning Support Program` | https://www.cannonschool.org/academics/learning-support-program |
| `POLICY` | `cannonschool.org — Learning Support Program Policy and Enrollment Form (PDF)` | https://www.cannonschool.org/fs/resource-manager/view/7218833c-b7e7-48e5-b312-98b4016ccbae |
| `ARC` | `cannonschool.org — Academic Resource Center` | https://www.cannonschool.org/academics/upper-school/academic-resource-center |
| `ACADEMICS` | `cannonschool.org — Academics` | https://www.cannonschool.org/academics |
| `COUNSELING` | `cannonschool.org — School Counseling` | https://www.cannonschool.org/cannon-life/school-counseling |
| `CRISIS` | `cannonschool.org — Mental Health and Crisis Resources` | https://www.cannonschool.org/crisis-resources |
| `APPLY` | `cannonschool.org — Apply to Cannon` | https://www.cannonschool.org/admission/application-procedures |
| `MS_HANDBOOK` | `cannonschool.org — Middle School Student-Parent Handbook 2025-2026 (PDF)` | https://resources.finalsite.net/images/v1754505716/cannonschoolorg/hy4jngrrp0al9xilkfgh/Middle_School_Student-Parent_Handbook_2025-2026.pdf |
| `DIRECTORY` | `cannonschool.org — Faculty & Staff Directory` | https://www.cannonschool.org/about/faculty-staff-directory |
| `DOVI` | `cannonschool.org — The Dovi Academic Resource Center` | https://www.cannonschool.org/news-and-stories/in-the-news-details/~board/cannon-news-cougar-news-internal-sources/post/strengthening-confidence-through-support-the-doviacademic-resource-center |
| `HUDSON` | `cannonschool.org — Hudson Academic Resource Center opening` | https://www.cannonschool.org/cannon-school-news/details/~board/cannon-news-cougar-news-internal-sources/post/hudson-family-academic-resource-center-celebrates-new-chapter-in-upper-school |
| `INTL` | `cannonschool.org — International Student Program` | https://www.cannonschool.org/international-student-program |
| `CATALOG` | `cannonschool.org — Upper School Course Catalog 2026-2027 (PDF)` | https://resources.finalsite.net/images/v1769529893/cannonschoolorg/ihl0lzuqgs9loqntga7z/CannonAcademicCourseCatalog2026-2027.pdf |

`POLICY` uses the school's own resource-manager link (it 302s to the Finalsite PDF), the
same pattern Hickory Grove's `FEES` uses.

## Out of scope

- Compare. The area stays in `COMPARE_DEFERRED_TOPICS`.
- Any other school, and any change to Hickory Grove's file.
- Any component, CSS or chrome change. If the browser check finds a render defect, record
  it and raise it before fixing (the UX standard).
- Rewording other Cannon areas beyond the two College Support strings in step 4.
- Deploying. `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

1. **Branch and stage the research.** From an up-to-date `main`, run
   `git checkout -b feat/cannonlearning`. Run `git status --short`: the two
   `source-material/learning-support/cannon/*.md` files should be the only untracked paths
   you own.

2. **Ingest.** Run the `ingest-source-material` skill for the new
   `source-material/learning-support/cannon/` folder. Expect these to be created or
   changed: `src/content/learning-support/cannon.json`, `.claude/docs/learning-support/…`
   for Cannon, `.claude/docs/INDEX.md`, and the `cannon` entry in `src/data/schools.json`
   (gaining the `learning-support` topic). Inspect the diff. **Nothing outside
   learning-support should change** (memory `ingest-full-rebuild-sweeps-topics`: a full
   rebuild once nearly shipped news to ten schools).

3. **Write `src/data/learningSupport/cannon.ts`**, exporting `cannon: LearningSupportProgram`.
   Mirror `hickory-grove-christian.ts`: its header comment style (fetched 2026-10-24,
   official pages only, research file path), the `Source` constants from the table above,
   and its card field order.
   - Typographic quotes `“ ”` and apostrophes `’` as in Hickory Grove.
   - Every quoted fragment is verbatim from the research file.
   - Figures US-style.

   **`colors`:** `{ brand: '#87212e', gold: '#e39e25' }`, with the comment "Cougars —
   maroon and gold, from cannonschool.org's theme CSS".

   **`lead`:**
   - strong: `'Cannon’s Learning Support Program “helps students with diagnosed learning differences become successful learners and confident self-advocates,” with a learning specialist in each division from Junior Kindergarten through 12th grade.'`
   - muted: `'The school publishes no fee for learning support.'`

   **`stats`** (no unit words in `value`; see Decisions):
   - `{ value: 'JK–12', label: 'served by the program', note: 'Junior Kindergarten through 12th grade, across the Lower, Middle and Upper Schools' }`
   - `{ value: '4', label: 'learning specialists and deans', note: 'one in the Lower School, one in the Middle School, two in the Upper School' }`
   - `{ value: '~240', label: 'Upper School students used the ARC', note: '“last year,” per the school’s story on the Hudson ARC’s Aug. 31 opening' }`
   - `{ value: '5', label: 'school counselors', note: 'Junior Kindergarten through 12th grade, on the Student Support Team' }`

   **`eligibility`** — sources `[LSP, POLICY, MS_HANDBOOK, APPLY]`:
   - headline: `'Learning support is for enrolled Cannon students with a diagnosed learning difference, documented by a recent psychoeducational evaluation. The school does not promise to meet every need.'`
   - intro: `{ strong: 'Eligibility is set out in a written policy.', muted: 'It decides most families’ answer, so it comes first.' }`
   - eligible: `'The policy requires that the student “must be a current student enrolled at Cannon School,” that parents “complete a request for Learning Support Services,” a “history of academic difficulty,” and a learning difference “diagnosed and documented by a certified professional in a recent (last 3 years) formal psycho-educational evaluation” done “by a licensed clinical psychologist.”'`
   - plan: `'The school’s pages do not mention 504 plans or IEPs. Accommodations need documentation: “No accommodation will be provided unless a disclosure with appropriate documentation has been made to the school,” and “No official Learning Plan will be constructed without a complete psychological-educational evaluation.” The request form asks what accommodations the student has had in the past.'`
   - scope: `'“Acceptance of a student into Cannon School does not imply that the school will assume the responsibility for all of the special learning needs of the child, especially when such needs may require a modification/alteration of the school’s curriculum or when the child’s needs are beyond Cannon’s present resources.”'`
   - note: `'No admissions page asks for testing results, a 504 or an IEP; the policy makes the request for learning support after enrollment. For a hearing, speech/language or vision impairment without a full evaluation, accommodations “will be considered on a case-by-case basis.”'`

   **`services`** — headline:
   `'Every service the school’s pages describe, grouped and coded by who delivers it. Cannon publishes no fee for any of them. Pick your child’s need to see what applies.'`

   **`verdicts`:**
   - `read`:
     - head: `'A Lower School reading interventionist and specialist-built learning plans. No reading method is named.'`
     - body: `'The Reading Interventionist “may provide small-group instruction designed to close specific skill gaps.” Ask which reading approach is used, and what reading support looks like after 4th grade.'`
   - `attn`:
     - head: `'One-on-one executive-function coaching in the Middle and Upper Schools.'`
     - body: `'Upper School Academic Coaches work “in a relational 1:1 environment” on “planning, organization, task initiation, flexibility, attention, self-control, metacognition, and more.”'`
   - `math`:
     - head: `'Peer-led Math Lab in the Upper School. No math-specific intervention is named.'`
     - body: `'In the Math Lab, “Tutors and teachers partner with learners to break down challenging concepts.” The school does not describe math intervention below the Upper School.'`
   - `speech`:
     - head: `'By referral. Plan on an outside provider.'`
     - body: `'The Lower School Learning Specialist gives “guidance for families to secure external resources, such as speech therapists or tutors.”'`
   - `motor`:
     - head: `'Not published. Plan on an outside provider.'`
     - body: `'Neither occupational nor physical therapy appears on the school’s site.'`
   - `social`:
     - head: `'Five counselors offer short-term counseling and refer out for longer-term therapy.'`
     - body: `'Lower School counselors provide “short-term individual counseling sessions” and “community resource referrals (including longer-term therapy services).”'`
   - `gifted`:
     - head: `'Reading enrichment in the Lower School and an advanced course track in the Upper School.'`
     - body: `'The Reading Interventionist “may offer targeted academic enrichment”; the Upper School offers Honors Accelerated, AP and AT courses and an Independent Study Program. No formal gifted program is described.'`

   **`groups`.** Names match Hickory Grove's exactly; codes and needs as listed. Each
   `detail` is one or two sentences built from the research file's verbatim text.
   Suggested wording follows. Keep every quote exact.

   *Learning & academic support*
   | service | code | needs | detail |
   |---|---|---|---|
   | Specialized teachers | IH | read, attn, math | `'“A dedicated learning specialist for each of division, Lower School, Middle School, and Upper School.” Four are named, plus a Lower School Reading Interventionist.'` |
   | Reading intervention | IH | read | `'Lower School small groups with the Reading Interventionist “designed to close specific skill gaps.” No method (e.g., Orton-Gillingham, structured literacy) is named.'` |
   | Math intervention | NS | math | `'No math-specific intervention described; the Upper School Math Lab is peer tutoring.'` |
   | 1:1 / small-group instruction | IH | read, attn, math | `'Small-group reading in the Lower School; one-on-one coaching with the Middle and Upper School learning specialists.'` |
   | Academic Labs (9–12) | IH | read, math | `'“Faculty-facilitated, peer-led tutoring in writing, math, and science,” plus a World Languages Lab, “available at consistent times and locations during the school day.” In the Middle School, help from teachers: “No fee is charged.”'` |
   | Executive-function coaching | IH | attn | `'One-on-one academic coaching in the Middle School and, in the Upper School, Academic Coaches who build “executive functioning (EF) skills.”'` |
   | Learning-support class | NS | read, attn, math | `'No learning-support course appears in the 2026-2027 Upper School Course Catalog.'` |
   | Accommodations & learning plan | IH | read, attn, math, speech, motor | `'The Learning Specialist writes a Learning Plan listing classroom and testing accommodations, such as “preferential seating, note-taking assistance, extended time for tests, alternate assessment location.”'` |
   | Specially designed instruction | NS | read, attn, math | `'Not described. The policy says acceptance does not imply responsibility for needs that “may require a modification/alteration of the school’s curriculum.”'` |
   | Self-contained / separate program | NS | — | `'No separate program described; the Middle School ARC brings “neurodiverse and non-neurodiverse learners” together “side by side.”'` |
   | Gifted / advanced | IH | gifted | `'Lower School reading enrichment; Upper School Honors Accelerated, AP and AT courses and an Independent Study Program. No formal gifted program.'` |
   | Eligibility documentation | REQUIRED | read, attn, math, speech, motor, social | `'A complete psychoeducational evaluation from the last 3 years, with “test results with subtest scores (standard or scaled scores)” and recommended accommodations.'` |

   *Therapy & related services*
   - `Speech-language therapy`, RF [speech]: `'The Lower School Learning Specialist helps families “secure external resources, such as speech therapists.”'`
   - `Occupational therapy`, NS [motor]: `'Not listed by the school.'`
   - `Physical therapy`, NS [motor]: `'Not listed by the school.'`

   *Assessment*
   - `Early identification (JK–2)`, IH [read, attn, math, speech]: `'Learning support in JK–2 “focuses on early identification and classroom-based interventions”; the Learning Specialist works with teachers “to assess student needs.”'`
   - `Testing accommodations`, IH [read, attn, math]: `'Testing accommodations are part of each Learning Plan. Once a plan has been in place “for at least four months,” the Learning Specialist may help families request College Board and ACT accommodations.'`
   - `Entrance testing`, IH []: `'The admissions checklist “may include” an Entrance Evaluation and a Readiness Evaluation.'`
   - `Psychoeducational evaluation`, REQUIRED [read, attn, math, speech, motor]: `'Families supply it, from “a licensed clinical psychologist.” The school does not say it tests in-house or name providers.'`

   *Wellness & health*
   - `Counseling & emotional support`, IH [social]: `'Five school counselors offer wellness lessons, check-ins, “short-term individual counseling sessions” and small groups, working “in collaboration with Learning Specialists.”'`
   - `Emotional & behavioral intervention`, RF [social]: `'Longer-term help is by referral: counselors provide “community resource referrals (including longer-term therapy services).”'`
   - `Crisis resources`, RF [social]: `'A Mental Health and Crisis Resources page lists the Suicide and Crisis Lifeline (“call 988 or text HOME to 741741”) and the NC Peer Warmline; Middle School counselors provide “support to students in crisis.”'`
   - `School psychologist`, NS [social]: `'None named.'`
   - `School nurse`, IH []: `'A Lead School Nurse and a School Nurse are listed in the staff directory.'`

   *Language*
   - `ESL / English-language support`, NS []: `'International students enroll through an approved placement agency; no English-language support is described.'`

   Expected totals: **25 rows, 17 published, 8 NS, 0 EXCLUDED**. Count them after writing.

   `services.sources`: `[LSP, POLICY, ARC, ACADEMICS, MS_HANDBOOK, COUNSELING, CRISIS, APPLY, DIRECTORY, DOVI, INTL, CATALOG]`.

   **`therapy`** — sources `[LSP, COUNSELING, DIRECTORY]`:
   - headline: `'Speech therapy is by referral. The school’s site lists no occupational or physical therapy.'`
   - items: `{ name: 'Speech-language', code: 'RF', detail: 'The Learning Specialist helps families find an outside speech therapist.' }`, `{ name: 'Occupational', code: 'NS' }`, `{ name: 'Physical', code: 'NS' }`
   - note: `'No therapist appears in the school’s staff directory. Ask whether an outside therapist can see your child on campus during the school day.'`

   **`testing`** — sources `[POLICY, LSP, APPLY]`. Entries:
   1. `REQUIRED`, title `'A recent psychoeducational evaluation'`:
      - text: `'The evaluation must be from “a recent (last 3 years)” period and done “by a licensed clinical psychologist,” with “comprehensive cognitive and academic assessment.”'`
      - muted: `'The school does not test in-house or name providers.'`
   2. `IH`, title `'Classroom identification, JK–2'`: text `'The Learning Specialist “collaborates closely with teachers to assess student needs, differentiate instruction, and implement targeted strategies within the classroom.”'`
   3. `IH`, title `'Entrance evaluations'`: text `'Admission decisions draw on “entrance testing results,” among other things; the checklist may include an Entrance Evaluation and a Readiness Evaluation.'`
   4. `IH`, title `'College Board and ACT accommodations'`: text `'For juniors and seniors, “additional guidance is offered to help navigate the process of requesting testing accommodations from the College Board and ACT,” once a Learning Plan has been in place for at least four months.'`
   - headline: `'Cannon doesn’t run diagnostic testing itself. Families bring a recent psychologist’s evaluation, and the school identifies early needs in the classroom.'`

   **`staff`** — sources `[LSP, ARC, COUNSELING, DIRECTORY]`; titles exactly as S10, S3 and S5 list them:
   - headline: `'Twelve named staff: four learning specialists and deans, a reading interventionist, two ARC faculty and five school counselors.'`
   - people, in this order:
     1. Rhiannon Bresalier — Lower School Learning Specialist
     2. Sabrina Amann — Lower School Reading Interventionist
     3. Tracy Wade — Middle School Dean of Academic Support
     4. Michelle Donah — Upper School Learning Specialist
     5. Jennifer Ridenhour — Upper School Dean of Academic Support
     6. Sarah Miller — Upper School Faculty, Academic Resource Center
     7. Sophie Vreeburg — Upper School Faculty, Academic Resource Center
     8. Emily Lewis — Lower School Counselor, Grades JrK - 2
     9. Thomas Underwood — Lower & Middle School Counselor, Grades 3 - 5
     10. Kimberly Stiffel — Middle School Counselor, Grades 6 - 8
     11. Anna Allred-McGee — Upper School Counselor
     12. Whitney Rice — Upper School Counselor
   - note: `{ strong: 'No single head of learning support is named.', muted: 'Tracy Wade leads the Middle School’s Dovi Academic Resource Center; Jennifer Ridenhour leads the Upper School’s.' }`
   - **Do not** list Alice Yow: she is in the Health Office filter but titled Director of
     Alumni and Family Engagement.

   **`ask`:**
   - headline: `'Eight questions to take on the tour, covering what the school’s site leaves unanswered: fees, prior plans, methods, therapy, staff and timing.'`
   - questions:
     1. `'Is there a fee for Learning Support, Upper School academic coaching or Middle School coaching, and does financial aid cover it?'`
     2. `'How is a 504 plan, IEP or prior school’s accommodations plan treated before the Learning Plan is written?'`
     3. `'Which reading method does the Lower School Reading Interventionist use (e.g., Orton-Gillingham, Wilson, structured literacy), and how large are the groups?'`
     4. `'Is there math intervention below the Upper School?'`
     5. `'Can an outside speech, occupational or physical therapist see my child on campus during the school day?'`
     6. `'Is there a school psychologist, and do you keep a list of evaluators?'`
     7. `'The policy covers current students only. Can a family share an evaluation, or plan for support, before enrollment?'`
     8. `'Is any English-language (ESL) support offered?'`
   - asOf: `'October 24, 2026'`

4. **College Support correction** in `src/data/collegeSupportPrograms/cannon.ts`. These
   are in-place text swaps at the same indices, so no paths shift.
   - `wholeClass.support[0]`:
     - `label: 'Two named Upper School learning-support staff'`
     - `text: '**Michelle Donah**, Upper School Learning Specialist, and **Jennifer Ridenhour**, Upper School Dean of Academic Support — substantial staffing for 423 Upper School students, and among the best-documented learning support in this set.'`
   - `verdict.points[4].text`: replace "three named Upper School learning specialists" with
     "two named Upper School learning-support staff". The rest of that string stays
     byte-identical.
   - Grep afterwards: `grep -n -i "hurtado\|three named" src/data/collegeSupportPrograms/cannon.ts`
     should give 0 hits.

5. **Register and update the "only school" wording.**
   - `src/data/learningSupport.ts`:
     - `import { cannon } from './learningSupport/cannon.ts'`;
     - `PROGRAMS` gains `cannon` (keep alphabetical: `cannon`, then
       `'hickory-grove-christian'`);
     - the comment above the import ("Hickory Grove Christian is the only school
       researched…") becomes "Hickory Grove Christian and Cannon are researched…".
   - `src/data/learningSupport/README.md`: "Hickory Grove Christian is the first and, so
     far, only school." becomes "Hickory Grove Christian was the first school; Cannon
     followed (2026-10-24)."
   - `scripts/i18n_topics.mjs` L68 comment: "Hickory Grove only (2026-10-20)" becomes
     "Hickory Grove (2026-10-20), Cannon (2026-10-24)".

6. **Regenerate and compile.** Run `npm run schema`; the learning-support school count
   should change in `DATA-SCHEMA.md`, with no new card or key. Then `npx tsc -b`, then
   `npm run build` (see Verification: `check:live` is expected red in Phase 1).

7. **Browser check** (Verification), then commit with **explicit paths** after
   `git status --short`. Push and verify the push (`git rev-parse HEAD` vs
   `git ls-remote origin feat/cannonlearning`). Flip this plan to `english-done` and the
   INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The stop
message should include:
- the row tally (25 / 17 / 8);
- the NS-not-EXCLUDED coding of curriculum modification, for the user to overrule;
- the Hurtado removal in College Support;
- the one added Assessment row.

### Phase 2 — Every other locale

Prose only. There are **no chrome changes**, since every key already exists in all ten
catalogs. Scope is `PROSE_TRANSLATED`: `es, bn, ht, te, fr, fa, it, hi, ar`, for topics
`learning-support` and `college-support`. The mechanism is in
`.claude/docs/prose-translation-architecture.md`. For method, use Telugu's or Bangla's
rollout docs, never Italian's.

8. **Measure scope from a fresh extract.** For each of the two topics, run
   `node scripts/i18n_extract.mjs --topic <topic> --lang __verify --out <scratch>` and diff
   its stamps against `src/data/overlays/work/<topic>.es.json`. Expected:
   - `learning-support`: about 100+ **added** (all of Cannon's strings, minus any shared
     verbatim with Hickory Grove, such as `'Not listed by the school.'`, `'None named.'`,
     `'Speech-language'`, `'Occupational'`, `'Physical'`, which only gain `at` paths) and
     **0 dropped**.
   - `college-support`: 2 or 3 retired + 2 or 3 new (`support[0].label` if extracted,
     `support[0].text`, `verdict.points[4].text`).

   Investigate any other drop before writing.

9. **Splice** with `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`
   (`--dry-run` first) × 9 locales × 2 topics. Then translate the added entries as
   stamp→translation maps keyed by stamp, applied by stamp, **never by index** (memories
   `splice-work-files-by-stamp`, `parallel-locale-agents-collide`: agents write maps, main
   applies). Rules:
   - Quotes are translated quotations inside quote marks, consistent with how each locale
     already renders the same phrasing in Hickory Grove's file.
   - Figures char-for-char: `JK–12`, `JK–2`, `~240`, `423`, `3 - 5`, `6 - 8`, `JrK - 2`,
     `9–12`, `2026-2027`, `988`, `741741`. For `hi`/`te`, store the English 3-3-3 form.
   - `fa`/`ar`: store no bidi isolates, and **watch figure ranges reversing in RTL**. The
     `learningsupport` build reworded `1–2` as "1 to 2"
     (`src/data/overlays/NOTES.md`); apply the same to `JK–2`, `9–12` and the counselor
     grade ranges if they reverse in the browser.
   - Dates translate (`October 24, 2026`; `Aug. 31`).
   - Names stay Latin, and so do `College Board`, `ACT`, `AP`, `AT`, `Honors Accelerated`,
     `Orton-Gillingham`, `Wilson`, `ARC`, `Dovi`, `Hudson`.
   - Staff `role` strings are prose and translate. Reuse each locale's wording for "Upper
     School", "Lower School" and "Middle School" from Cannon's other overlays.
   - French: run `check:fr` for identifiers.

10. **Rebuild overlays** with `npm run i18n:build -- --topic <topic> --lang <code>`, for
    both topics × 9 locales.

11. **Phase 2 verification** (below). Then commit with explicit paths, push and verify,
    open the PR (`--body-file`), and run `gh pr merge --squash --delete-branch`. Then
    `git checkout main && git pull`. Flip the plan to `implemented` and the INDEX row to
    *Implemented* with the PR link, add `## Implementation notes` for any deviation, and
    write the memory note. **Do not deploy.** End with "merged — ready to deploy whenever
    you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/learning-support/cannon/*.md` (2) | new: research record + lead sheet (already written) |
| `src/content/learning-support/cannon.json`, `.claude/docs/learning-support/…`, `.claude/docs/INDEX.md`, `src/data/schools.json` | generated by ingest |
| `src/data/learningSupport/cannon.ts` | new: Cannon's six cards |
| `src/data/learningSupport.ts` | import + `PROGRAMS` + comment |
| `src/data/learningSupport/README.md` | "only school" wording |
| `scripts/i18n_topics.mjs` | comment only |
| `src/data/collegeSupportPrograms/cannon.ts` | two stale strings (Hurtado) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/{learning-support,college-support}.<lang>.json` × 9 | Phase 2 splice |
| `src/data/overlays/{learning-support,college-support}.<lang>.json` × 9 | Phase 2 rebuild |
| `src/data/overlays/NOTES.md` | only if an RTL range is reworded |
| `.claude/plans/cannonlearning.md`, `.claude/plans/INDEX.md` | status |

No skill or command changes, so `.claude/SKILLS.md` is untouched.

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run build`: **exits 1 on `check:live` only**, with findings limited to Cannon's
      new learning-support strings and the College Support swaps. Every other chained
      check passes, including `check:seo` (Cannon's description ≤160) and
      `check:schema`. If `check:live` blocks the browser build, use
      `npx vite build && npm run prerender`.
- [ ] Grep: 0 hits for `hurtado` in `src/data/collegeSupportPrograms/cannon.ts`.
- [ ] Row count: a node one-liner over `cannon.ts`'s `services` block prints
      `{ IH: 12, NS: 8, RF: 3, REQUIRED: 2 }`, 25 total. That is 17 published, matching
      the GO verdict.
- [ ] **Browser check (required).** Run `npx vite preview` and drive it with Playwright in
      real Chrome (`channel: 'chrome'`), using `domcontentloaded` (**not** `networkidle`)
      and **every `<details>` forced open** (memory `expand-details-before-browser-check`).
      On `/school/cannon/`:
      - Learning Support renders after Global Exposure, with six cards in order, no
        kickers, no Compare button, maroon/gold section colours, and readable dark-theme
        ink.
      - Four stat tiles.
      - **10 NOT STATED chips**: 8 in Services at a Glance, 2 in the therapy strip. No
        blank code cells.
      - The "Speech & language" need filter shows the referral verdict and dims the
        unrelated rows.
      - Twelve staff in the listed order; Ask the School shows 8 questions and "October
        24, 2026" (check `ask.headline` with the card **closed**: it is the summary line,
        hidden once open).
      - "Show sources" lists the policy PDF on Eligibility.
      - College Support → Whole Class: the support row reads Donah + Ridenhour, and "See
        Learning Support & Student Services →" is present. Clicking it scrolls to
        `#topic-learning-support` without leaving the page.
      - `/school/hickory-grove-christian/` is unchanged.
      - Overflow 0 at 1280 light, 1280 dark and 390 light.
      - `npm run audit:mobile -- --only cannon`: 0 overflow, 0 broken cards.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**: `check:live` green, `check:runtime` resolves all nine.
- [ ] Splice reports **0 dropped** for learning-support. The college-support drops equal
      the step 8 count.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted.
- [ ] `check_figures.py --topic learning-support` and `--topic college-support` ×9: no new
      findings (the college-support es/fa findings already recorded in `hgcsconsistency`
      are pre-existing).
- [ ] `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`, `check:dates`,
      `check:money`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: findings limited to
      the splice growth and the in-place College Support swaps. It compares by position
      and cannot validate a splice (memory `ccdglobal-shipped`).
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a `main` baseline: no new
      hits.
- [ ] **Browser:** `es`, `hi` and `fa` at 1280 (`?lang=<code>`), every card open, on
      `/school/cannon/`. Check that:
      - Learning Support and the College Support row are translated, with 0 English
        sentences;
      - figures match the English;
      - `fa` has no reversed ranges (`JK–2`, `9–12`, counselor grades).

      Then run `npm run audit:mobile -- --only cannon --lang <code>` at 320px for every
      locale.

## Risks

| Risk | Mitigation |
|---|---|
| The ingest rebuild sweeps other topics into the diff | Step 2 inspects the diff; only learning-support paths may change |
| A quote drifts from the live page | Copy from the research file, which is verbatim; the README requires char-for-char |
| A stat `value` with a unit word ships English | No unit words in `value` (Decisions) |
| RTL range reversal in fa/ar | Browser check; reword as in `learningsupport` |
| Translating staff roles inconsistently with Cannon's other overlays | Reuse existing division names from Cannon's overlays |
| The "NS vs EXCLUDED" coding of curriculum modification is contested | Flagged at the Phase 1 stop for the user's call |

## Open questions

- **Should curriculum modification be `EXCLUDED`?** **Default:** `NS`, with the hedge
  quoted in the scope cell and the row detail. The user can overrule at the Phase 1
  review.
- **Should the two nurses be named in the School nurse row?** **Default:** no. The row
  says a Lead School Nurse and a School Nurse are listed, per the user's staff-card
  decision. Name them only if the user asks.

## Implementation notes

### Phase 1 (English) — 2026-10-24

- **Two source-list additions beyond the plan.** The plan's `HUDSON` constant appeared on
  no card's `sources`, which left the `~240` ARC figure uncited and the constant unused.
  `HUDSON` was added to `services.sources` (it describes the ARC's coaching and labs, and
  the figure). `DOVI` was added to `staff.sources`, because the staff note's "Tracy Wade
  leads the Middle School's Dovi Academic Resource Center" comes from it.
- **NOT STATED count is 11 in the DOM, not 10.** That is 8 rows plus 2 therapy chips (as
  planned) plus the legend's NS sample chip, which every school renders.
- **Ingest also re-stamped Hickory Grove's note date.** That one-line change was reverted
  to keep the diff to Cannon.
- **Pre-existing, not fixed (out of scope):** on `/school/cannon/` the first click on
  College Support's "See Learning Support & Student Services →" lands 383px short. Content
  above the section (Course Offerings / Global Exposure) grows while the scroll is running;
  page height goes from 15,601 to 15,984. A second click lands correctly at 80px. Hickory
  Grove has no Global Exposure section and lands correctly first time. This is the link's
  existing behaviour on any school with lazy content above Learning Support, so it is
  raised rather than fixed here.
- `npm run build` exits 1 on `check:live` only: 3 retired college-support stamps × 9
  locales (`b0f2f818`, `cb0ae2f4`, `f0de862a`), exactly the two swapped strings plus the
  label. Every other chained check was run and passes.
- **Review edit (2026-10-24): Cannon's eligibility intro was removed at the user's
  request.** The removed text was "Eligibility is set out in a written policy. It decides
  most families' answer, so it comes first." To allow this, `EligibilityCard.intro` is now
  optional (`intro?:`) and `LearningSupport.tsx` renders it only when present. Hickory
  Grove keeps its intro. The two intro strings are no longer in Cannon's English, so
  Phase 2 has nothing to translate for them.
- **Review edit (2026-10-24): dropped the eligibility note's first sentence at the user's
  request.** The removed sentence was "No admissions page asks for testing results, a 504
  or an IEP; the policy makes the request for learning support after enrollment." The note
  now carries only the case-by-case accommodations sentence. The research record keeps
  the finding.
- **Review edit (2026-10-24): dropped "The school does not promise to meet every need."
  from the eligibility headline at the user's request.** The policy's own disclaimer
  still sits in the Outside scope cell, quoted in full.
- **Review edit (2026-10-24): Testing & Evaluation gains a code legend, for every school
  (user request).** The Services legend markup is now a shared `CodeLegend` component in
  `LearningSupport.tsx`. Services still passes its fixed four codes. Testing shows only
  the codes its entries use, in the order IH, IH_FEE, RF, REQUIRED, NS: Hickory Grove
  renders IH / RF / REQUIRED and Cannon renders IH / REQUIRED. This adds **one chrome
  key**, `learning.legend.REQUIRED` = "the family supplies it", in `en.json` only.
  **Phase 2 must now also add that key to the nine other catalogs in `TRANSLATED`**
  (`es bn ht te fr fa it hi ar`). `check:chrome` reports it as awaiting translation
  (exit 0) until then. Verified in Chrome at 1280 light/dark, plus `audit:mobile` for both
  schools.
- **Review edit (2026-10-24): the Ask the School as-of line lost its NOT STATED
  disclaimer, for every school (user request).** `learning.asOf` now ends after the date
  in **all ten catalogs**. That was a pure deletion of the second sentence, so it needs no
  Phase 2 work. The Services legend's NS line ("not found on the school's site — not the
  same as not offered") still carries the same meaning.
- **Review edit (2026-10-24): staff emails on Who You'll Work With, for every school with
  the card (user request).** `StaffCard.people[]` gains an optional `email`, shown as a
  mailto link with subject "<School name> Inquiry" (`schoolInquiryMailto` in
  `src/lib/contact.ts`), in English in every locale like `CONTACT_SUBJECT`.
  - **Sources.** Addresses come only from each school's own Finalsite directory: the
    `FS.util.insertEmail` call with its reversed strings, which is the address the page
    displays. None is built from a name pattern. **Cannon 7 of 12**: Amann, Ridenhour,
    Vreeburg, E. Lewis and Rice publish none, and the Wade address matches the MS
    handbook. **Hickory Grove 9 of 9.** Provenance tables are appended to both schools'
    Official Site Research files and re-ingested. Hickory Grove's staff `sources` gains
    `hgchristian.org — Our Staff`. The rule is in `learningSupport/README.md`.
  - **Translation.** `email` is in `SKIP_KEYS` (`scripts/i18n_fields.mjs`), so no
    address is extracted: 0 in a fresh learning-support extract. That means **no
    Phase 2 work**, and Hickory Grove's overlays are unaffected.
  - **Layout.** When any person in the card has an email, rows switch to a three-column
    grid (`.ls-staff[data-email]`), so a row with no email keeps its role aligned. It
    stacks below 640px. Verified in Chrome: 1280 light/dark, `fa` (mirrored) and 320,
    plus `audit:mobile` for both schools.

## Follow-up — after this PR merges (decided 2026-10-24)

The user approved splitting the `/learning-support` "standard" into two roles. **Do this
after Phase 2 merges, as its own branch and PR. It is not part of this plan's diff.**

1. **Cannon is the depth reference.** The skill's "shape, tone and depth are the model"
   line points at `src/data/learningSupport/cannon.ts`. Cannon is ahead on rows shown (25
   vs 23), published rows (17 vs 14), stats (4 vs 3), testing entries (4 vs 3), staff (12
   vs 9) and questions (8 vs 7), and it has a written eligibility policy.
2. **The GO/NO-GO bar is computed from the thinnest shipped Learning Support school**, at
   run time, across every file in `PROGRAMS`. It is not pinned to one named school. Today
   that is still Hickory Grove (14 published), so rule 3 stays at "at least half,
   rounded up" = 7. This mirrors `/add-school`, whose floor is the thinnest shipped
   school.
3. **Hickory Grove stays the reference for two patterns Cannon lacks:** IH_FEE rows from
   a published fee schedule, and `[[504|…]]` / `[[iep|…]]` glossary markers. The skill
   names both schools and says what each is the model for.

Files: `.claude/skills/learning-support/SKILL.md`, its row and `updated` date in
`.claude/SKILLS.md` (same PR), and the Learning Support paragraph in `CLAUDE.md` ("with
Hickory Grove Christian as its first school and its standard").
