---
name: cchslearning
title: Add Charlotte Catholic High School to Learning Support & Student Services
status: english-done
phases: 2
created: 2026-10-26
branch: feat/cchslearning
prs: []
---

# Add Charlotte Catholic High School to Learning Support & Student Services

## Goal

Give Charlotte Catholic High School (slug `charlotte-catholic`) the six-card Learning
Support & Student Services section that Hickory Grove, Cannon, Davidson Day and Charlotte
Country Day already have. It is built only from the school's own pages and the PDFs they
link:
- the Academic Achievement Program pages (formerly the Learning Support Program);
- the Options/Pathways Program pages;
- the 2026-27 Student Handbook and Curriculum Guide;
- the counseling and health pages;
- the MACS 2026-2027 Tuition & Fee Schedule hosted on the school's own Finalsite store.

The section has 24 rendered service rows (15 published, 9 NOT STATED), 5 Testing entries,
21 named staff with published emails, and 13 questions. Three stale lines in the school's
College Support area are corrected so the two areas agree. Success means the section
renders on `/school/charlotte-catholic/` in all ten locales, and the four existing
schools are unchanged.

## Context

- **Area contract:** `src/data/learningSupport.ts` holds the types, `LearningCode`,
  `LEARNING_NEEDS`, `LEARNING_SUPPORT_CARDS` and `PROGRAMS` (today `cannon`,
  `'charlotte-country-day'`, `'davidson-day'`, `'hickory-grove-christian'`). Its rules are
  in `src/data/learningSupport/README.md`, which includes:
  - every named person gets their published email;
  - Testing & Evaluation is identification only;
  - long staff lists (>20) scroll.
- **Nearest precedents:**
  - `.claude/plans/ccdlearning.md` (PR #368) is the step and verification template, and
    `src/data/learningSupport/charlotte-country-day.ts` is the **depth and fee-row
    reference**.
  - `.claude/plans/ddlearning.md` (PR #365) is the template for the **College Support
    correction**: in-place swaps, `check:live` red in Phase 1 on the retired stamps only,
    and both topics spliced in Phase 2.
  - Read both plans' *Implementation notes* before starting.
- **Renderer:** `src/components/LearningSupport.tsx`.
  - `StaffBody` turns scrollable above `STAFF_SCROLL_MIN = 20` people. With 21, this
    school's list scrolls, captioned "21 people. Scroll the list to see everyone." The
    `learning.staffScroll` chrome key already exists in all ten catalogs, so this plan adds
    **no chrome keys**.
  - The mailto subject is `"<schoolName> Inquiry"` via `schoolInquiryMailto()` in
    `src/lib/contact.ts`. The `schools.json` name is "Charlotte Catholic High School".
- **The College Support link turns on by itself.** `WholeClassBody`
  (`src/components/CollegeSupport.tsx` ≈L836) renders "See Learning Support & Student
  Services →" under the `support` rows when `hasLearningSupport` is true. Three College
  Support strings in `src/data/collegeSupportPrograms/charlotte-catholic.ts` become stale
  once this section exists:
  - `wholeClass.flags[1]` (≈L638–641), a `gap` flag: "No learning-difference or
    accommodations disclosure exists beyond the course names in the curriculum guide."
  - `verdict.checklist[4]` (≈L666): "How does the counseling office split 324 seniors six
    ways — is a counselor assigned by alphabet, by grade, or followed through four years?"
    The Parent Information Guide answers it: "Counselors are assigned by student's last
    names and will remain the same for your student throughout their academic career".
  - `verdict.checklist[5]` (≈L667): "What does the Options Program actually provide day to
    day, and who staffs the support behind those courses?" The Options/Pathways page and
    its staff page now answer most of it.
- **i18n:**
  - `staff.people[].role` and `therapy.people[].role` are promoted in `PATH_OVERRIDES`
    (`scripts/i18n_fields.mjs` L798–802); names and emails are not extracted.
  - `PROSE_TRANSLATED` in `src/lib/i18n.ts` is
    `es, bn, ht, te, fr, fa, it, hi, ar`.
  - `scripts/i18n_topics.mjs` L68 carries a comment listing the researched learning-support
    schools.
- **Ingest:** Charlotte Catholic already has other topics under `source-material/`, so
  ingest adds `src/content/learning-support/charlotte-catholic.json` and
  `learning-support` to its `schools.json` entry. That lengthens its meta description,
  which `check:seo` keeps ≤160 characters.
- **RTL ranges** are isolated at render site-wide (PR #367). This section's ranges are
  `9–10`, `11–12`, `10–12`, `9–12`, `2026-27` and `855-733-7762`. Verify them by glyph-x
  scan in fa/ar.

## Decisions

**User decisions** (2026-10-26, AskUserQuestion in the `/learning-support` session). This
is the approval record:

- **Proceed on the GO.** The bar is computed from the thinnest shipped school, Hickory
  Grove (14 published rows), so test 3 needs ≥7. Charlotte Catholic passes all four
  tests:
  1. an official program page exists;
  2. 2 of 3 eligibility cells are verified (who is eligible, and scope);
  3. 15 published rows;
  4. 21 named staff with emails, and a published fee.
- **Colours "Blue + red":** `{ brand: '#3a759e', gold: '#d7102a' }`.
  - `#3a759e` is the app's existing CCHS blue in `src/data/brands.ts`, deepened from the
    site's `#75b2dd` for contrast.
  - `#d7102a` is the school's red, used on rules and badges only.
- **Options fee "IH_FEE, show both rates":** the "Self-contained / separate program" row
  is `IH_FEE`. It gives the 2026-27 "Options – CCHS" tuition, $24,077 Community and
  $18,345 Participating Catholic, beside the standard 9th–12th $21,562 / $15,041, worded
  as tuition **in place of** the standard rate, never a surcharge.
- **No new card.** The six cards were approved by the Hickory Grove handoff.

**Planning decisions:**

- **Two programs, kept distinct.** The Academic Achievement Program (AAP) serves students
  with a diagnosis. Options/Pathways serves "students with developmental disabilities".
  Every row describing Options says "Options Program", so no reader takes an Options
  service for an AAP one.
- **2026-27 sources win over older ones.** The dossier mixed three years of Curriculum
  Guides. The section uses only:
  - the 2026-27 web guide and PDF: "Academic Skills" 508/509 (A = 4); Guided Academic
    Support 511, grades 10–12, not GPA-weighted, "GPA 2.9 or below";
  - the `Handbook2026-27-rev1.pdf`;
  - the live pages.

  Never use 537/538, a "physician diagnosis", or Orton-Gillingham / iReady / iXL. They
  are 2025-26 or 2024-25 wording and appear in no current document.
- **Dr. Alicia Reid leads.** The 2026-27 Handbook lists her for "Academic Achievement,
  Options, & Pathways". **Never name Dr. Maria Leahy**: her pages are 404, and the only
  live mention is the dated February 2025 letter. That letter (S22) is not used at all;
  every fact it carries is either dated or available from a current source.
- **Kunert's email is `afkunert@charlottecatholic.org`.** It is the page's own mailto. A
  one-letter stray link beside it points to Hall's address and is ignored.
- **Staff scope is 21:** 5 AAP, 5 Options/Pathways, Dr. Reid, 6 counselors, the Mental
  Health Intervention Counselor and 3 health staff. The registrar and the administrative
  assistant are excluded, as not student-services roles. The list scrolls (>20), as
  designed.
- **Roles are written from the school's headings, never invented.** AnnMarie Monroe's
  heading has no title, so her role is the program her bio names: "Options/Pathways
  Program". The five counselors are "School Counselor"; their last-name ranges go in the
  staff note rather than the role, which keeps letter ranges out of RTL role strings.
- **The 12 outside evaluators are counted and disclaimed, never listed.** They are third
  parties.
- **"formally the Learning Support Program"** is the school's typo. Write "formerly the
  Learning Support Program" without quotation marks.
- **"Screening & identification"** replaces CCD's "Early identification (JK–2)" row,
  because CCHS is grades 9–12. It is NS: the program has the goal "To assist the school
  community in identifying students needing additional educational support" but describes
  no process.
- **No glossary markers.** The `scope`/`plan` cells say "504 plans or IEPs" in plain
  words, as CCD does, because the school's pages never use those terms. Hickory Grove's
  `[[504|…]]` markers are for a school that names the plans.
- **College Support:** remove `wholeClass.flags[1]` and reword `checklist[4]` and
  `checklist[5]` (step 4).
  - `flags[1]` is the **last** element, so removing it shifts no sibling `at` path.
  - The counseling **roster** (which still lists Sandy Needham, not Kate McHugh) is
    **deliberately not touched**; see Out of scope.

## Approvals needed

**None outstanding.**
- GO, colours and the Options fee coding were approved 2026-10-26.
- The six cards were approved by the Hickory Grove handoff.
- The scrolling staff list already exists (PR #368).
- Adding a school needs no UX approval.
- Deploying is out of scope.

## Source material

Written during `/learning-support` on 2026-10-26. They are **uncommitted**, and step 1
commits them:

- `source-material/learning-support/charlotte-catholic/Charlotte Catholic - Learning Support - Official Site Research.md`
  holds:
  - provenance and the Source URL table S1–S24;
  - verbatim excerpts per page;
  - the fee-schedule transcription and the staff table with every mailto;
  - excluded content and the "Not found" list;
  - **14 corrections to the dossier**;
  - the proposed 24-row mapping.

  **Every quote below comes from this file.**
- `source-material/learning-support/charlotte-catholic/Charlotte Catholic - Learning Support - Deep Research.md`
  is the AI lead sheet. It is **not a source**.

The untracked `source-material/learning-support/providence-day/` folder is the user's
parallel work. **Never stage, ingest-commit or touch it.**

## Out of scope

- Compare (the area stays in `COMPARE_DEFERRED_TOPICS`).
- Any change to the other four schools' learning-support files.
- **College Support's counseling roster and caseload.** The roster lists Sandy Needham
  where the 2026-27 page has Kate McHugh. This is deliberate: the College Support research
  file uses the 2025-26 profile roster so that it matches the "324 seniors" denominator.
  The two areas will show different counselor rosters, and that is by design.
- Student Clubs' "Mr. Needham" advisor notes.
- Other MACS schools' Options rates, the diocesan pages, tuition aid (ESA+, Opportunity
  Scholarship, Family Individualized Tuition).
- Deploying.

## Steps

### Phase 1 — English

1. **Branch and stage the research.** From an up-to-date `main`:
   - Run `git checkout -b feat/cchslearning`.
   - Run `git status --short`. The two
     `source-material/learning-support/charlotte-catholic/*.md` files are yours;
     `providence-day/` is **not**.
   - Never use `git add -A`.

2. **Ingest.** Run the `ingest-source-material` skill for the new folder. Expect:
   - `src/content/learning-support/charlotte-catholic.json` (new);
   - the CCHS learning-support note under `.claude/docs/` and `.claude/docs/INDEX.md`;
   - `learning-support` added to the `charlotte-catholic` entry in `src/data/schools.json`.

   **Revert anything outside CCHS learning-support.** Earlier ingests re-stamped other
   schools' note dates (ccdlearning/ddlearning notes). **If the ingest picks up
   `providence-day/`, revert every Providence Day output too.** It is not this plan's
   school.

3. **Write `src/data/learningSupport/charlotte-catholic.ts`**, exporting
   `charlotteCatholic: LearningSupportProgram`. Follow `charlotte-country-day.ts` for
   layout and style.

   **Header comment:**
   - fetched 2026-10-26, official pages only, and the research file path;
   - the two programs, AAP and Options/Pathways;
   - IH_FEE basis: the school-hosted MACS 2026-2027 Tuition & Fee Schedule linked from
     the Admissions page (an Options tuition rate in place of the standard rate; AAP has
     no published fee);
   - only 2026-27 documents are used, and the 2025-26 / 2024-25 wording and the February
     2025 letter are deliberately unused;
   - no 504/IEP terms appear on the school's pages, hence no glossary markers;
   - Kunert's email, and why Leahy is not named.

   Use typographic `“ ” ’` in authored prose. Every `“…”` fragment is char-for-char from
   the research file.

   **Sources** — `Source` constants labelled `'charlottecatholic.org — <page>'`:

   | const | label suffix | url |
   |---|---|---|
   | `AA` | `Academic Achievement` | https://www.charlottecatholic.org/departments/academic-achievement |
   | `FORMS` | `Academic Achievement Forms` | https://www.charlottecatholic.org/departments/academic-achievement/forms |
   | `ASSESS` | `Academic Achievement Assessments` | https://www.charlottecatholic.org/departments/academic-achievement/assessments |
   | `AASTAFF` | `Meet the Academic Achievement Team` | https://www.charlottecatholic.org/departments/academic-achievement/meet-the-staff |
   | `SPECIAL` | `Guide to Special Testing` | https://www.charlottecatholic.org/departments/academic-achievement/guide-to-special-testing |
   | `TESTACC` | `Special Testing Accommodations` | https://www.charlottecatholic.org/departments/academic-achievement/guide-to-special-testing/accommodations |
   | `CONSENT` | `Consent to End Support Services (PDF)` | https://www.charlottecatholic.org/fs/resource-manager/view/3cc147fb-3120-422f-8d78-161870a70d25 |
   | `OPTIONS` | `Options/Pathways Program` | https://www.charlottecatholic.org/departments/options-pathways-program |
   | `OPTSTAFF` | `Meet the Options/Pathways Program Team` | https://www.charlottecatholic.org/departments/options-pathways-program/meet-the-staff |
   | `PIG` | `Parent Information Guide: Academic Support` | https://www.charlottecatholic.org/community/parents/parent-information-guide/academic-support |
   | `GUIDE` | `Curriculum Guide by Department` | https://www.charlottecatholic.org/departments/counseling/curriculum-guide-by-department |
   | `GUIDEPDF` | `2026-2027 Curriculum Guide (PDF)` | https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf |
   | `COURSESEL` | `Course Selection` | https://www.charlottecatholic.org/departments/counseling/course-selection |
   | `HANDBOOK` | `Student Handbook 2026-27 (PDF)` | https://resources.finalsite.net/images/v1792434010/charlottecatholicorg/dyhoar9lun1tsumzcefl/Handbook2026-27-rev1.pdf |
   | `COUNSEL` | `Meet our Counselors` | https://www.charlottecatholic.org/departments/counseling/meet-our-counselors |
   | `CRISIS` | `Mental Health Crisis Resources` | https://www.charlottecatholic.org/departments/counseling/mental-health-crisis-resources |
   | `HEALTH` | `Meet the Health Staff` | https://www.charlottecatholic.org/community/health/meet-the-health-staff |
   | `ADMIN` | `Administration` | https://www.charlottecatholic.org/about-us/administrators |
   | `TUITION` | `2026-2027 Tuition & Fee Schedule (PDF)` | https://resources.finalsite.net/images/v1783870190/charlottecatholicorg/noikdbslslpxnkvxqrcc/2026-2027TuitionandFeeScheduleUPDATED.pdf |

   **`colors`:** `{ brand: '#3a759e', gold: '#d7102a' }`, with the comment "Cougars —
   the app's CCHS blue (brands.ts, deepened from the site's #75b2dd) and the school's red".

   **`lead`:**
   - strong: `'Charlotte Catholic runs two programs: the Academic Achievement Program, formerly the Learning Support Program, for students with a psychologist’s DSM diagnosis, and the Options/Pathways Program, “tailored specifically for students with developmental disabilities.”'`
   - muted: `'Academic Achievement has no published fee. The Options Program has its own 2026-27 tuition rate.'`

   **`stats`** (4):
   - `{ value: '$24,077', label: 'Options Program tuition, 2026-27', note: 'Community rate; $18,345 for Participating Catholic families, in place of the standard $21,562 and $15,041' }`
   - `{ value: '5', label: 'Academic Achievement staff', note: 'three program teachers by grade, a test coordinator and a testing proctor' }`
   - `{ value: '6', label: 'school counselors', note: 'plus a Mental Health Intervention Counselor' }`
   - `{ value: '3', label: 'years: the oldest testing reviewed for eligibility', note: 'a Psychoeducational or Neurological Assessment' }`

   **`eligibility`** — sources `[AA, FORMS, PIG, OPTIONS, HANDBOOK, CONSENT, TESTACC]`. No
   `intro`.
   - headline: `'The Academic Achievement Program serves students with a diagnosis and recent testing; the Options/Pathways Program serves students with developmental disabilities.'`
   - eligible: `'Students are eligible for Academic Achievement “if they have completed Psychoeducational Assessment and have received a DSM diagnosis from a psychologist,” with testing dated “within the last 3 years.” The Options/Pathways Program is “tailored specifically for students with developmental disabilities.”'`
   - plan: `'The school’s pages do not mention 504 plans or IEPs. Eligibility rests on a Psychoeducational or Neurological Assessment; with another type of assessment, “more documentation may be requested and required.” Approved accommodations are recorded in a “Student Accommodation Plan.”'`
   - scope: `'“Students who are disabled in any way will be accepted if the school program and educational facilities are able to effectively meet the needs of the student.” The program’s last goal is “To provide parents with information regarding other educational opportunities should we be unable to meet the needs of a student.”'`
   - note: `'College Board and ACT accommodations are “an external process”: “Decisions on these accommodations ARE NOT made by Charlotte Catholic High School staff.”'`

   **`services`** — headline:
   `'Every service the school’s pages describe, grouped and coded by who delivers it. Academic Achievement support is included in tuition; the Options Program has its own tuition rate. Pick your child’s need to see what applies.'`

   **`verdicts`:**
   - `read`:
     - head: `'Accommodations and small-group support, but no named reading method.'`
     - body: `'Program teachers provide “individual, small group, and/or push-in support.” No reading-intervention method is named for Academic Achievement students; Options Program students take “Specialized English and Mathematics courses.”'`
   - `attn`:
     - head: `'A one-semester Academic Skills course in executive function, then Guided Academic Support.'`
     - body: `'Academic Skills (508, 509) teaches “executive function strategies and self-advocacy.” Guided Academic Support (511) follows in grades 10–12 for Academic Achievement students “with a GPA 2.9 or below.”'`
   - `math`:
     - head: `'No math intervention for Academic Achievement students; life-skills math in the Options Program.'`
     - body: `'Options Program students take Math Life 1 and 2 as part of a “Life Skills Curriculum.” Academic Achievement students get accommodations and support across subjects.'`
   - `speech`:
     - head: `'No speech-language therapy is listed.'`
     - body: `'Speech therapy is not mentioned on the school’s pages. Ask whether an outside therapist can work with your child on campus.'`
   - `motor`:
     - head: `'No occupational or physical therapy is listed.'`
     - body: `'The Academic Achievement page defines occupational and physical therapy in its glossary but does not say either is offered.'`
   - `social`:
     - head: `'Six school counselors, a Mental Health Intervention Counselor and a crisis-resources page.'`
     - body: `'The Mental Health Interventionist “works with students referred by the School Counselors to assess and provide in-depth short-term counseling.” The crisis page lists the 988 Suicide & Crisis Lifeline and the North Carolina Peer Warmline.'`
   - `gifted`:
     - head: `'No gifted program, but an honors pathway.'`
     - body: `'The St. Augustine Scholars Program is a “four-year honors pathway.” No gifted identification or services are described.'`

   **`groups`** — group names exactly as CCD's. Shared strings are reused verbatim so they
   share stamps.

   *Learning & academic support*
   | service | code | needs | detail |
   |---|---|---|---|
   | Specialized teachers | IH | read, attn, math | `'Three Academic Achievement Program teachers, one each for 9th grade, 10th grade, and 11th and 12th grade, plus a test coordinator and a testing proctor. The Options/Pathways Program has its own co-directors and staff.'` |
   | Reading intervention | NS | read | `'No reading-intervention method is named for Academic Achievement students.'` |
   | Math intervention | NS | math | `'No math intervention is described for Academic Achievement students. Options Program students take life-skills math courses.'` |
   | 1:1 / small-group instruction | IH | read, attn, math | `'Program teachers provide “individual, small group, and/or push-in support” for students who need the most help.'` |
   | Executive-function coaching | IH | attn | `'The Academic Skills course teaches “executive function strategies and self-advocacy alongside lessons that develop independent work habits and effective time management and organizational skills.”'` |
   | Learning-support class | IH | read, attn, math | `'Academic Skills (508 for grades 9–10, 509 for grades 11–12) is a one-semester elective, weighted A = 4. Guided Academic Support (511) follows in grades 10–12 and is not weighted into the GPA.'` |
   | Accommodations & learning plan | IH | read, attn, math | `'The program will “Identify, provide, and assess accommodations and interventions,” and approved accommodations are recorded in a “Student Accommodation Plan.”'` |
   | Specially designed instruction | IH | read, math, social | `'Options Program only: a “Life Skills Curriculum” of “Specialized English and Mathematics courses,” alongside classes with peers.'` |
   | Self-contained / separate program | IH_FEE | social | `'Options Program only, for students with developmental disabilities. 2026-27 tuition is $24,077 at the Community rate and $18,345 at the Participating Catholic rate, in place of the standard $21,562 and $15,041. Graduates receive a Certificate of Achievement, and the Pathways Program extends support two years beyond high school.'` |
   | Gifted / advanced | NS | gifted | `'No gifted program is described. The St. Augustine Scholars Program is a “four-year honors pathway.”'` |
   | Eligibility documentation | REQUIRED | read, attn, math | `'A Psychoeducational or Neurological Assessment dated within the last three years, and a DSM diagnosis from a psychologist, submitted with the program application.'` |

   *Therapy & related services*
   - `Speech-language therapy`, NS [speech]: `'Not listed by the school.'`
   - `Occupational therapy`, NS [motor]: `'Not listed by the school.'`
   - `Physical therapy`, NS [motor]: `'Not listed by the school.'`

   *Assessment*
   - `Screening & identification`, NS [read, attn, math]: `'No screening process is described.'`
   - `Testing accommodations`, IH [read, attn]: `'SAT and ACT Special Testing is “directly administered through Academic Achievement.” The school is a national test center for the SAT but not the ACT.'`
   - `Entrance testing`, IH []: `'Course placement for 9th graders uses High School Placement Test results, with middle school grades and records.'`
   - `Psychoeducational evaluation`, RF [read, attn, math]: `'Done outside the school. The school lists 12 evaluators for families but does not endorse them.'`

   *Wellness & health*
   - `Counseling & emotional support`, IH [social]: `'Six school counselors, assigned by last name and kept for all four years, help with “personal, emotional, or social concerns.”'`
   - `Emotional & behavioral intervention`, IH [social]: `'A Mental Health Interventionist provides “in-depth short-term counseling” to students referred by their counselors.'`
   - `Crisis resources`, RF [social]: `'The school’s crisis page lists the 988 Suicide & Crisis Lifeline and the North Carolina Peer Warmline (855-733-7762).'`
   - `School psychologist`, NS [social]: `'None named.'`
   - `School nurse`, IH []: `'A lead nurse, who directs student health services for the MACS schools, and two health staff.'`

   *Language*
   - `ESL / English-language support`, NS []: `'Not described on the school’s pages.'`

   **Expected totals: 24 rows.**
   - IH **11**: Specialized teachers, 1:1, EF coaching, Learning-support class,
     Accommodations, SDI, Testing accommodations, Entrance testing, Counseling, Emotional &
     behavioral, School nurse.
   - IH_FEE **1**: Self-contained / separate program.
   - RF **2**: Psychoeducational evaluation, Crisis resources.
   - REQUIRED **1**: Eligibility documentation.
   - NS **9**: Reading, Math, Gifted, Speech, OT, PT, Screening, School psychologist, ESL.

   **15 published, 9 NS, 0 EXCLUDED.** Count with a node one-liner after writing; any
   other total is a mapping error.

   `services.sources`: `[AA, AASTAFF, PIG, HANDBOOK, GUIDE, GUIDEPDF, OPTIONS, TUITION, SPECIAL, COURSESEL, ASSESS, COUNSEL, CRISIS, HEALTH, CONSENT]`.

   **`therapy`** — sources `[AA, HANDBOOK]`:
   - headline: `'The school’s pages list no speech-language, occupational or physical therapy. Occupational and physical therapy appear only as terms in the Academic Achievement glossary.'`
   - items: `{ name: 'Speech-language', code: 'NS' }`, `{ name: 'Occupational', code: 'NS' }`, `{ name: 'Physical', code: 'NS' }`.
   - **No `people`**: the school names no therapist.
   - note: `'When needed, school counselors “refer students to other professionals for assistance in meeting their personal and academic needs.”'`

   **`testing`** — sources `[FORMS, AA, GUIDE, ASSESS, HANDBOOK, CONSENT, SPECIAL, TESTACC]`.
   - headline: `'A family applies with recent outside testing, and the Academic Achievement team reviews it for eligibility. The school publishes no screening process of its own.'`
   - Entries (identification only; the placement test stays in the Services row):
     1. `IH`, `'Application and eligibility review'`: `'Families start with the Academic Achievement Program Application. A Psychoeducational or Neurological Assessment “will be reviewed for eligibility” if it is dated within the last three years.'` muted: `'Who makes the final decision is not stated. The Academic Skills course needs a “Recommendation from an Academic Achievement teacher and grade evaluation.”'`
     2. `RF`, `'Psychoeducational evaluation'`: `'Done by outside providers. The Assessments page lists 12 psychoeducational evaluators, and the school states: “WE DO NOT ENDORSE, RECOMMEND, OR GUARANTEE” them.'` muted: `'The Handbook refers families to a parent support policy for testing and evaluations; that policy is not published.'`
        **Check:** the quoted fragment ends before "ANY…" on the page, so it is an exact substring. Keep "them" outside the quotes.
     3. `IH`, `'Student Accommodation Plan'`: `'Approved accommodations are recorded in a “Student Accommodation Plan.” Ending support needs a signed consent form, and “reinstatement of special needs support services is not automatic.”'`
     4. `IH`, `'SAT and ACT Special Testing'`: `'For students whose College Board or ACT accommodations require Special Testing, the test “will be directly administered through Academic Achievement.” A school coordinator submits SAT requests, and ACT needs the school’s consent form on file.'` muted: `'Accommodation decisions “ARE NOT made by Charlotte Catholic High School staff.” Special Testing dates for this year are listed as TBA.'`
     5. `NS`, `'Screening'`: `'No screening process is described. One program goal is “To assist the school community in identifying students needing additional educational support.”'`

   **`staff`** — sources `[AASTAFF, OPTSTAFF, ADMIN, HANDBOOK, COUNSEL, HEALTH]`.
   - headline: `'Twenty-one named staff: the Academic Achievement team, the Options/Pathways team, the assistant principal over both, six school counselors, the Mental Health Intervention Counselor and three health staff.'`
   - people, in this order. All domains are `@charlottecatholic.org`, and each address is
     copied from the research file's staff table, never by pattern:
     1. Dr. Alicia Reid — Assistant Principal; Academic Achievement, Options & Pathways — ahreid@
     2. Carolina Figueiras — Academic Achievement, 11th and 12th Grade — cafigueiras@
     3. Stephanie Hall — Academic Achievement Program Teacher, 9th Grade — slhall@
     4. Allie Kunert — Academic Achievement Program Teacher, 10th Grade — afkunert@
     5. Kelsey Black — Academic Achievement Test Coordinator — kemarchioni@ *(the school's own mailto; it does not match her name, and it stands)*
     6. Anne Kalbaugh — Testing Proctor, Academic Achievement — aekalbaugh@
     7. Shelley Floriani — Co-Director/Options Teacher — lbfloriani@
     8. Katherine Reynolds — Co-Director/Options Teacher — kjreynolds@
     9. Deborah Buchan — Options Teacher Assistant — dsbuchan@
     10. Megan Patterson — Options/Pathways Instructional Job Coach — mapatterson@
     11. AnnMarie Monroe — Options/Pathways Program — ammonroe@
     12. Sarah Sovchen — Director of Counseling — sesovchen@
     13. Heather Nobary — School Counselor — hrnobary@
     14. Christine Parks — School Counselor — clparks@
     15. Kara Fisher — School Counselor — krfisher@
     16. Kate McHugh — School Counselor — kmchugh@
     17. Melody Clementi — School Counselor — MEClementi@ *(published case kept)*
     18. William Keese — Mental Health Intervention Counselor — wskeese@
     19. Sarah Smith — Director of Student Health Services (MACS) and Lead Nurse — scsmith@
     20. Lorraine Maslanka — Health Staff — LHMaslanka@
     21. Marin O'Brien — Health Staff — MAOBrien@ *(write the name with a typographic ’: `Marin O’Brien`)*
   - note: `{ strong: 'To begin, contact an Academic Achievement Specialist or complete the program application.', muted: 'Counselors are assigned by last name (A–De, Di–Ho, Hu–Mi, Mo–She, Shi–Z) and stay the same for all four years; the Director of Counseling counsels students new to the school in grades 10–12.' }`

   **`ask`:**
   - headline: `'Thirteen questions to take on the tour, covering what the school’s site leaves unanswered: fees, prior plans, who decides, therapy, intervention methods and testing dates.'`
   - questions:
     1. `'Is there a fee for the Academic Achievement Program, or is it included in tuition?'`
     2. `'Options Program tuition does not include the $1,995 family capital fee or enrollment fees. Are there other Options costs?'`
     3. `'How do you treat a 504 plan or IEP from a previous school? Is new testing always needed?'`
     4. `'Is there a deadline for the Academic Achievement application, and should we apply before or after admission?'`
     5. `'Who decides whether a student is eligible, and what support they receive?'`
     6. `'Is any structured reading or math intervention available to Academic Achievement students?'`
     7. `'Can speech-language, occupational or physical therapy take place on campus during the school day?'`
     8. `'Is there a school psychologist?'`
     9. `'Is there a screening process for a student who is struggling but has no diagnosis?'`
     10. `'What is the parent support policy for testing and evaluations that the Handbook mentions?'`
     11. `'When are this year’s SAT and ACT Special Testing dates? Both are listed as TBA.'`
     12. `'Is any English-language (ESL) support offered?'`
     13. `'Beyond Honors, AP and the St. Augustine Scholars Program, is there support for gifted learners?'`
   - asOf: `'October 26, 2026'`

   **Confirm `$1,995`** against the research file's S21 table (Capital Fee "$1,995 per
   family"). It is the school-hosted figure; the dossier's $1,795 is diocesan and unused.

4. **College Support correction** in `src/data/collegeSupportPrograms/charlotte-catholic.ts`.
   - **Remove `wholeClass.flags[1]`**, the `gap` flag "No learning-difference or
     accommodations disclosure exists beyond the course names in the curriculum guide."
     `flags[0]` stays. It is the last element, so no sibling path shifts. The "See
     Learning Support & Student Services →" link now appears under the support rows.
   - **`verdict.checklist[4]`**, replaced whole:
     `'Counselors are assigned by last name and stay with a student all four years. How does each one balance about 54 seniors through application season?'`
   - **`verdict.checklist[5]`**, replaced whole:
     `'What does a typical Options Program student’s day look like, and how much of it is spent in classes alongside peers?'`
   - Grep afterwards:
     `grep -n "No learning-difference\|split 324 seniors\|who staffs the support" src/data/collegeSupportPrograms/charlotte-catholic.ts`
     should give 0 hits.
   - **Leave the counseling roster untouched** (Out of scope).

5. **Register and update the "researched schools" wording.**
   - `src/data/learningSupport.ts`:
     - add `import { charlotteCatholic } from './learningSupport/charlotte-catholic.ts'`;
     - `PROGRAMS` becomes `cannon`, `'charlotte-catholic': charlotteCatholic`,
       `'charlotte-country-day'`, `'davidson-day'`, `'hickory-grove-christian'`
       (alphabetical);
     - the comment above it names all five schools.
   - `src/data/learningSupport/README.md` L4–5: "…and Charlotte Country Day (2026-10-25),
     then Charlotte Catholic (2026-10-26)."
   - `scripts/i18n_topics.mjs` L68 comment: add "Charlotte Catholic (2026-10-26)".

6. **Regenerate and compile.**
   - Run `npm run schema`. Only the learning-support coverage line for CCHS should change
     in `.claude/docs/DATA-SCHEMA.md`.
   - Then run `npx tsc -b`, then `npm run build`. `check:live` is **expected red** in
     Phase 1 on the retired college-support stamps only (see Verification). If it blocks
     the browser build, use `npx vite build && npm run prerender`.

7. **Browser check** (see Verification). Then:
   - commit with **explicit paths** after `git status --short`;
   - push, and verify the push (`git rev-parse HEAD` vs
     `git ls-remote origin feat/cchslearning`);
   - flip this plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The stop
message should include:
- the row tally (24 / 15 / 9), and that it ties Davidson Day for published rows;
- the two programs and how the Options rows are labelled;
- the IH_FEE Options row with both rates;
- the 21-person staff list (it scrolls), Kunert's email, and Leahy not named;
- the College Support removal and the two rewordings;
- that the College Support roster deliberately still shows the 2025-26 counselors.

### Phase 2 — Every other locale

Prose only. There are **no chrome changes**: every key, including
`learning.staffScroll`, already exists in all ten catalogs.

The scope is `PROSE_TRANSLATED` (`es, bn, ht, te, fr, fa, it, hi, ar`; confirm in
`src/lib/i18n.ts`), for topics `learning-support` and `college-support`. The mechanism is
in `.claude/docs/prose-translation-architecture.md`. Follow Telugu's or Bangla's rollout
docs for method, never Italian's. The nearest precedents are the Phase 2 notes in
ccdlearning and ddlearning.

8. **Measure scope from a fresh extract.** For each topic, run
   `node scripts/i18n_extract.mjs --topic <topic> --lang __verify --out <scratch>` and diff
   its stamps against `src/data/overlays/work/<topic>.es.json`. Expected:
   - `learning-support`: roughly 90–110 **added** and **0 dropped**. Shared strings only
     gain `at` paths, for example:
     - `'Not listed by the school.'`, `'None named.'`;
     - `'Speech-language'`, `'Occupational'`, `'Physical'`;
     - the group and shared service names;
     - roles that already exist, such as `'School Counselor'` if present.
   - `college-support`: 3 retired (the removed flag and the two old questions) and 2 new.

   - **Plus the quote-review edits (user request, 2026-10-26, after Phase 1):** 8
     learning-support strings in Cannon, Hickory Grove and Charlotte Country Day were
     reworded in English, so expect **8 retired** learning-support stamps (`135a601a`,
     `282fc3de`, `4854f226`, `53c3c840`, `757034b7`, `cc7a5ba5`, `d947979e`, `e5f4ba3b`)
     and their 8 replacements among the added strings. Translate each replacement from its
     new English, reusing the retired entry's translation of the unchanged quote; see
     Implementation notes, "Quote review across all schools".

   Investigate any other drop before writing.

9. **Splice** with `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`
   (`--dry-run` first), × 9 locales × 2 topics. Translate the added entries as
   stamp→translation maps, applied by stamp, **never by index**. See memories
   `splice-not-reextract-for-new-school`, `splice-work-files-by-stamp` and
   `parallel-locale-agents-collide` (agents write maps; main applies them). Rules:
   - **Quotes** become translated quotations inside quote marks, consistent with each
     locale's practice in the existing four schools' entries.
   - **Figures are copied char-for-char:**
     - money: `$24,077`, `$18,345`, `$21,562`, `$15,041`, `$1,995` (localized at render,
       never re-typed);
     - course numbers `508`, `509`, `511`; `A = 4`; `2.9`; `12`; `988`;
       `855-733-7762`; `21`; `54`;
     - grade bands `9–10`, `11–12`, `10–12`;
     - `2026-27`.

     For `hi`/`te`, store the English form.
   - **Dates translate:** `October 26, 2026`.
   - **`fa`/`ar`:** store no bidi isolates (memory `rtl-overlays-store-no-bidi-isolate`).
     PR #367 isolates numeric ranges at render; verify by glyph-x scan. **The staff
     note's letter ranges (`A–De` … `Shi–Z`) are not numeric**, so check whether they draw
     correctly in fa/ar. If not, reword in words ("last names A to De") and record it in
     `src/data/overlays/NOTES.md`.
   - **These stay Latin:**
     - personal names;
     - `DSM`, `SAT`, `ACT`, `College Board`, `TBA`, `MACS`, `GPA`;
     - the course names `Academic Skills`, `Guided Academic Support`, `Math Life 1`,
       `Math Life 2`;
     - `St. Augustine Scholars Program`, `988 Suicide & Crisis Lifeline`,
       `North Carolina Peer Warmline`;
     - the program names `Academic Achievement Program` and `Options/Pathways Program`
       (as Cannon's `Learning Support Program` and CCD's `Educational Resource Program`
       stayed Latin), and `Student Accommodation Plan` (as CCD's
       `Confidential Academic Plan`).

     Generic nouns around them translate.
   - **Staff `role` strings translate.** Never infer gender from a name (memory
     `cannonlearning`): use role-referent forms, `/a`, `(rice)` or `/ة` as the earlier
     schools did.
   - **French:** run `check:fr` for identifiers.

9b. **Home-page chrome key (added 2026-10-26, after Phase 1).** `home.schoolCardAreas`
   (`_one`/`_other` in en) is new. In each of the 9 other catalogs, add it with **that
   locale's own `school.subAreas_*` plural forms copied verbatim** (same meaning,
   "{{count}} research areas", already reviewed), keeping every CLDR form the locale has
   (ar six, es/fr/it `_many`). No new translation is needed. Insert after
   `schoolsHeading` without reordering. The `home.stats.*` capitalisation change is English-only; leave the
   other locales' stat labels as they are.

10. **Rebuild overlays:** `npm run i18n:build -- --topic <topic> --lang <code>` × 9 × 2.

11. **Phase 2 verification** (below). Then:
    - commit with explicit paths, push and verify;
    - open the PR with `--body-file`. The body records the user decisions (GO, colours,
      Options IH_FEE) and the 14 dossier corrections in summary;
    - `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`;
    - flip the plan to `implemented` and the INDEX row to *Implemented* with the PR link;
    - add `## Implementation notes` for any deviation, and write the memory note.

    **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/learning-support/charlotte-catholic/*.md` (2) | commit (written in planning) |
| `src/content/learning-support/charlotte-catholic.json` | new (ingest) |
| `.claude/docs/…` CCHS learning-support note, `.claude/docs/INDEX.md` | ingest output |
| `src/data/schools.json` | CCHS gains `learning-support` (ingest) |
| `src/data/learningSupport/charlotte-catholic.ts` | **new**: the data file |
| `src/data/learningSupport.ts` | import + `PROGRAMS` entry + comment |
| `src/data/learningSupport/README.md` | school list |
| `scripts/i18n_topics.mjs` | comment only |
| `src/data/collegeSupportPrograms/charlotte-catholic.ts` | remove `wholeClass.flags[1]`; reword `checklist[4]`, `[5]` |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/{learning-support,college-support}.<lang>.json` ×9 | splice (Phase 2) |
| `src/data/overlays/{learning-support,college-support}.<lang>.json` ×9 | rebuilt (Phase 2) |
| `src/data/overlays/NOTES.md` | only if an RTL rewording is needed |
| `.claude/plans/cchslearning.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run build`: **exits 1 on `check:live` only**, with findings limited to the 3
      retired college-support stamps × 9 locales. Run every check chained after it
      separately; each must pass: `check:chrome`, `check:runtime`, `check:moneytext`,
      `check:dates`, `check:spans`, `check:news`, `check:photos`. Also run `check:seo`
      (CCHS meta description ≤160) and `check:schema`.
- [ ] **Row count:** a node one-liner over the `services` block prints
      `{ IH: 11, IH_FEE: 1, RF: 2, REQUIRED: 1, NS: 9 }`, i.e. 24 rows, 15 published.
- [ ] **Quote check:** extract every `“…”` fragment from the new data file and confirm
      each appears **case-sensitively** in the research file. First normalize the research
      text: strip the `> ` blockquote prefixes and `**` bold markers, then collapse runs of
      whitespace (NBSPs and line breaks included). Ignore a single trailing `,` or `.` just
      inside the closing quote (American punctuation; e.g. "…from a psychologist,” stands
      for the page's "psychologist."). 0 misses.
- [ ] **Email check:** all 21 `email` values appear verbatim in the research file (staff
      table or S4/S9/S16/S18/S19 excerpts).
- [ ] **Negative greps on the new file:** 0 hits for `Leahy`, `Orton`, `iReady`, `iXL`,
      `537`, `physician`, `1,795`.
- [ ] **Browser check (required).** Run `npx vite preview` and drive real Chrome with
      Playwright (`channel: 'chrome'`, `domcontentloaded`, **not** `networkidle`), with
      **every `<details>` forced open**, on `/school/charlotte-catholic/`. Confirm:
  - Learning Support renders six cards in order, with no kickers and no Compare button.
  - Blue/red section colours, with red only on rules and badges. Dark-theme ink is
    readable.
  - Four tiles: `$24,077`, `5`, `6`, `3`.
  - **NOT STATED chips:** 9 in Services, 3 in the therapy strip and 1 in Testing, so 13
    data chips (count legend samples separately). No blank code cells.
  - The IH_FEE row shows all four rates.
  - The Speech and Motor filters show their NS verdicts.
  - Testing has 5 entries, and none is the placement test.
  - **Staff:**
    - the caption reads "21 people. Scroll the list to see everyone.", and the region
      scrolls;
    - 21 mailto links with the subject "Charlotte Catholic High School Inquiry";
    - Kunert's link is `afkunert@`.
  - **Print media emulation:** all 21 rows are visible.
  - Ask the School has 13 questions and "October 26, 2026". Check `ask.headline` with the
    card **closed**.
  - **College Support → Whole Class:**
    - only one flag remains;
    - the "See Learning Support & Student Services →" link is present and scrolls to the
      section;
    - the two reworded questions render;
    - the counseling roster is unchanged.
  - The other four schools' learning-support pages are unchanged: rows 23 / 25 / 27 / 24
    for HG / Cannon / DD / CCD.
  - Overflow is 0 at 1280 light, 1280 dark and 390 light.
  - `npm run audit:mobile -- --only charlotte-catholic`: 0 overflow, 0 broken cards.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**: `check:live` green, `check:runtime` resolves all nine.
- [ ] The splice reports exactly the **8 quote-review retirements** for learning-support (no other drop), and exactly the 3 expected
      retirements for college-support.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted.
- [ ] `check_figures.py --topic learning-support` and `--topic college-support` ×9: no new
      findings versus `main`.
- [ ] `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`, `check:dates`,
      `check:money`, `check:moneytext`, `check:currency`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: findings limited to
      the splice growth and the College Support swaps.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a `main` baseline: no new
      hits. Triage every role label and row name.
- [ ] **Browser:** `es`, `hi`, `fa` and `ar` at 1280 (`?lang=<code>`), every card open, on
      `/school/charlotte-catholic/`. Check:
  - 0 English sentences in Learning Support or in the edited College Support rows;
  - figures match the English, with money localized (`24.077 US$` in es);
  - in `fa`/`ar`, **no range draws reversed** (glyph-x scan of `9–10`, `11–12`, `10–12`,
    `2026-27`, and the staff note's letter ranges).
- [ ] `npm run audit:mobile -- --only charlotte-catholic --lang <code>` at 320px ×9.
- [ ] `npm run audit:moneyrender` (needs build + preview): no raw `$<digit>` in es/fr
      outside the Latest News section.

## Risks

| Risk | Mitigation |
|---|---|
| Older-year wording leaks in (537, physician, Orton-Gillingham, Leahy) | Use only 2026-27 sources; negative greps in Phase 1 verification |
| An Options service is read as an AAP service | Every Options row and verdict says "Options Program" |
| The Options rate is read as a surcharge | The row and tile say "in place of the standard" rate; both rates are shown |
| A quote drifts in case or spacing | Copy from the research file; case-sensitive quote check with whitespace and `**` normalized |
| Ingest sweeps up the untracked `providence-day/` folder | Step 2 inspects the diff and reverts everything outside CCHS learning-support |
| The letter ranges in the staff note reverse in RTL | Glyph-x scan in Phase 2; reword in words if needed |
| Gendered role translations | Role-referent forms; never inferred from names |

## Open questions

- **Staff order:** Dr. Reid first, then AAP, Options/Pathways, counseling and health.
  **Default:** as listed in step 3; the user can reorder at review.
- **The fourth tile ("3 years")** could instead be "12 outside evaluators listed".
  **Default:** 3 years. Raise it at the Phase 1 stop.

## Implementation notes

### Phase 1 (English) — 2026-10-26

- **Built as planned; no data deviations.** 24 service rows
  `{ IH: 11, IH_FEE: 1, RF: 2, REQUIRED: 1, NS: 9 }`, 15 published. All 36 `“…”`
  fragments match the research file case-sensitively (blockquote prefixes and `**`
  stripped, whitespace collapsed), 0 misses. All 21 emails appear verbatim in the research
  file. `$1,995` confirmed against the S21 table.
- **Header comment reworded so the negative grep is strictly 0.** The plan asked the
  header to name the unused 2025-26 wording and to say why Leahy is not named, but also
  asked for 0 hits on `Leahy|Orton|iReady|iXL|537|physician|1,795` in the file. The
  comment now describes them ("older course numbers, a looser diagnosis rule and named
  intervention products"; "the former program director named in older pages") and points
  to the research file's corrections, so both hold.
- **No comment above `PROGRAMS` exists to update**; the plan assumed one. Only the import
  and the entry were added.
- **Ingest swept in `providence-day/`** (the user's untracked parallel work): its note,
  its content JSON, its manifest rows and its INDEX line were all removed, and the ingest's
  re-stamps of the other four schools' note dates were reverted. Only CCHS outputs remain.
- **Deviation: `src/lib/head.ts` — the meta description now composes to fit.** With
  `learning-support` added, "student support" entered CCHS's three-topic sample and its
  description reached **162 characters**, failing `check:seo` (the plan expected ≤160).
  `metaForRoute` now drops the sample to two topics only when the three-topic form would
  pass `DESC_MAX`, which the file's own comment already describes as the intent ("we
  compose to fit instead of chopping"). Only CCHS changes: "…across 8 areas — course
  offerings, student support and more. …" (147 characters). Every other school's
  description is byte-identical.
- `npm run build` exits 1 on `check:live` only: the 3 retired college-support stamps
  (`223e484f`, `a10ec34e`, `5ccfd764`) × 9 locales, no other finding. Run separately and
  passing: `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`,
  `check:spans` (the earlier `bucket-nu75` notice only), `check:news`, `check:photos`,
  `check:seo`, `check:schema`. `npx tsc -b` clean. The schema diff is the CCHS
  learning-support cells and the document count only.
- **Browser check (real Chrome, Playwright, every `<details>` open):**
  - 6 cards, no kickers, no Compare button; tiles `$24,077 / 5 / 6 / 3`; `--brand`
    `#3a759e`, red on the rules and badges;
  - 24 rows, 0 blank code cells; NOT STATED data chips 9 Services + 3 therapy + 1
    Testing = 13, plus 2 legend samples;
  - the IH_FEE row shows all four rates; the Speech and Motor filters show their NS
    verdicts; 5 Testing entries, none the placement test;
  - staff caption "21 people. Scroll the list to see everyone.", `aria-labelledby`
    resolves to it, region clips 510 of 1028px; 21 mailto links, all with subject
    "Charlotte Catholic High School Inquiry"; Kunert's is `afkunert@`; no "Leahy" anywhere
    in the section;
  - print media: `max-height: none`, `overflow: visible`, 21 of 21 rows inside the box;
  - 13 questions and "October 26, 2026"; every card's headline shows on the closed card;
  - College Support Whole Class: one flag left, the link present and landing the section
    at 80px (same as Davidson Day), both rewordings render, the roster (with Needham)
    unchanged;
  - other schools' rows unchanged: HG 23, Cannon 25, DD 27, CCD 24;
  - overflow 0 at 1280 light, 1280 dark and 390; dark verdict ink (red mixed toward grey,
    the shared design) is ~4.3:1 against the ground.
  - `audit:mobile --only charlotte-catholic`: 0 broken cards, 0 page overflow.
- **Quote review (user request, 2026-10-26).** All 36 `“…”` fragments re-read in context;
  each is a deliberate, verbatim quote. Three framings changed, quotes untouched:
  - Accommodations row: "The program will “Identify…”" → "The program’s goals include
    “Identify…”", so the quoted list item's capital no longer sits mid-sentence.
  - Testing entry 1 muted: "needs a “Recommendation from…”" → "lists its prerequisite as
    “Recommendation from…”", for the same reason (it is the course's prerequisite field).
  - Therapy note: "When needed" → "When necessary", so the lead-in matches the Handbook
    sentence the quote comes from rather than the counseling page's wording.
- **Quote review across all schools (user request, 2026-10-26: "fix all").** All 167
  quotes in the other four schools' learning-support files were checked against their
  research files: verbatim match, plus a new check that no quote cuts a word at its edge.
  Nine fixes in 8 strings; every quoted word is still verbatim:
  - **Cannon** Academic Labs row: the quotes had changed two capitals ("Faculty",
    "available"). Now "The Upper School’s Academic Labs offer “faculty-facilitated, …” …
    open at “consistent times and locations during the school day.”"
  - **Cannon** Specialized teachers row: the quote cut a sentence mid-way and presented it
    as complete, including the school's typo "each of division". Now paraphrased without
    quotes: "A dedicated learning specialist for each division: Lower, Middle and Upper
    School."
  - **Cannon** math verdict: "tutors and teachers “partner with learners…”" (no mid-sentence
    capital).
  - **Hickory Grove** Ask question: the quote had dropped the plural. Now quotes
    “identified learning differences”.
  - **Charlotte Country Day**, eligibility `eligible` (two fixes in one string), the
    executive-function row, the school-psychologist row and Testing's last entry: capital
    letters mid-sentence removed by reframing. The psychologist line is now a paraphrase
    ("described by the school as a licensed clinical psychologist"), because the quote also
    cut a longer sentence short.
  - Left as is, on purpose: Hickory Grove's `$2,227 “/year.”` (quotes the fee schedule's
    own printing), Davidson Day's straight apostrophe in “student's passions” (the
    school's form), Hickory Grove's glossary markers inside a verbatim sentence.
  - `check:live` now also lists these 8 retired learning-support stamps × 9 locales; the
    edited strings show in English on translated pages until Phase 2 translates the
    replacements. `check:runtime` still resolves all 9 locales. `tsc -b` clean.
- **Testing & Evaluation moved to the first card, for every school (user request,
  2026-10-26).** `LEARNING_SUPPORT_CARDS` order is now testing → eligibility → services →
  therapy → staff → ask. `testing` also joined `WIDE_LEARNING_CARDS`: left two-up, it would
  sit alone at the top beside an empty half-row, and full-width it leaves Therapy and Staff
  paired, which also closes the half-row gap the old order had beside Staff. The direct
  request is the UX approval. No strings changed, so nothing to translate; the episode
  generator's order is deliberately independent of card order and is unchanged. Comments in
  `learningSupport.ts` and `SchoolDetail.tsx` updated, `DATA-SCHEMA.md` regenerated. In
  Chrome at 1280 and 390, closed and open, all five schools show Testing first, full-width,
  with 0 overflow.
- **Home page wording (user request, 2026-10-26).** The school cards said "9 topics"
  through `school.topics`, a key that on the school page counts the cards inside one area.
  Home now uses a new key `home.schoolCardAreas`, "{{count}} Research areas", so the home
  page and `school.topics`' dev-only card count no longer share a key. The three hero stat
  labels went to Title Case, then on review to **sentence case with a capital first
  word**, matching the site's headings: "Schools researched", "Research areas", "Source
  documents distilled" (singulars too). The school-card key is "N Research areas" (user
  choice: capital first word only). The dev-only `home.schoolCardMeta` says "Research
  areas" in en. Chrome on the built home page (Title Case pass): all 13 cards "N Research Areas", 0 overflow.
  The other 9 catalogs get the new key in Phase 2 (step 9b); until then they fall back to
  English on the home cards.
- **Testing & Evaluation moved again, to second (user decision on review, 2026-10-26).**
  Order: eligibility → testing → services → therapy → staff → ask. "Can They Serve My
  Child?" is the gate a parent asks first; how a need is identified comes next, which is
  also the order the Learning Support episodes follow. Testing stays in
  `WIDE_LEARNING_CARDS`, so the grid still has no gaps. Supersedes the "first card" note
  above.
