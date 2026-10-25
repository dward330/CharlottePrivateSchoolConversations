---
name: ccdlearning
title: Add Charlotte Country Day School to Learning Support & Student Services (plus a scrollable staff list)
status: implemented
phases: 2
created: 2026-10-25
branch: feat/ccdlearning
prs: [368]
---

# Add Charlotte Country Day School to Learning Support & Student Services

## Goal

Give Charlotte Country Day School (slug `charlotte-country-day`) the six-card Learning
Support & Student Services section that Hickory Grove, Cannon and Davidson Day already have.
It is built only from the school's own pages: the public Educational Resource Program (ERP)
page, four BucsNet parent pages, and the policy PDFs, forms and directory they link. With
24 rendered rows (18 published, 6 NOT STATED), 6 Testing entries and 40 named staff, it is
the richest school in the area. Because 40 rows is too long to read in place, the shared
**Who You'll Work With** list becomes a **scrollable region when it is long**, at the
user's request. Success means the section renders on `/school/charlotte-country-day/` in
all ten locales, the other three schools are unchanged, and the long list scrolls on screen
but prints in full.

## Context

- **Area contract:** `src/data/learningSupport.ts` defines the types, `LearningCode`,
  `LEARNING_NEEDS` and `LEARNING_SUPPORT_CARDS`, plus `PROGRAMS` (currently `cannon`,
  `'davidson-day'`, `'hickory-grove-christian'`). The rules are in
  `src/data/learningSupport/README.md`.
- **Nearest precedent:** `.claude/plans/ddlearning.md`, which shipped as PR #365. Its
  Steps, Verification and Implementation notes are the template here: ingest, data file,
  register, schema, browser check, STOP, then splice by stamp. Its Phase 1 notes record two
  lessons:
  - quotes are checked case-sensitively against the research file;
  - ingest re-stamps other schools' note dates, which must be reverted.
- **Depth reference:** `src/data/learningSupport/cannon.ts`, whose group names and row
  names are copied exactly. **Fee-row reference:** Hickory Grove.
- **Renderer:** `src/components/LearningSupport.tsx`.
  - `PeopleList` (L312–329) renders name / role / mailto rows. It is shared by `StaffBody`
    (L331) and `TherapyBody` (L271, `.ls-staff-therapy`).
  - The mailto subject comes from `schoolInquiryMailto()` in `src/lib/contact.ts`:
    `"<schoolName> Inquiry"`. For this school that is "Charlotte Country Day School
    Inquiry" (the `name` in `schools.json`).
- **Staff CSS:** `src/index.css` L7423–7435 (`.ls-staff`, `.ls-person`, and the
  three-column grid under `[data-email]`, which stacks below 640px). The section's colours
  come from the inline `--brand` / `--ls-gold` (L7244+). The card has no background of its
  own; the page ground is `var(--bg)`.
- **The existing scroll-edge hook will not work here.** `src/lib/useScrollEdges.ts` is
  horizontal-only and RTL-aware. Its CSS masks are at L7225–7241, with a print reset. The
  vertical list uses CSS scroll shadows instead (Decisions).
- **i18n:**
  - `staff.people[].role` is already promoted in `PATH_OVERRIDES` (`scripts/i18n_fields.mjs`
    L798–799), so roles extract and translate. Names and emails do not.
  - Plural chrome keys use `_one` / `_other` (e.g. `sessionsSelected_one`). `ar` carries all
    six CLDR forms, and its `_two` carries **no** `{{count}}` (memories
    `arabic-dual-absorbs-numeral`, `arabic-plurals-die-on-keyorder-normalize`).
- **Ingest:** CCD already has other topics under `source-material/`. Ingest adds
  `src/content/learning-support/charlotte-country-day.json` and `learning-support` to the
  school's `schools.json` entry, which also lengthens its meta description, so `check:seo`
  must stay ≤160.
- **RTL figure ranges** are isolated site-wide at render by PR #367 (memory
  `rtl-figure-range-reverses`). Still verify them by a glyph-x scan in fa/ar.

## Decisions

Decisions made by the user (2026-10-25, AskUserQuestion in the `/learning-support`
session). This is the approval record:

- **Proceed on the GO.** The computed bar is the thinnest shipped school, Hickory Grove
  (14 published rows), so test 3 needs ≥7.
  - CCD passes all four tests: an official ERP page; 3 of 3 eligibility cells; 18
    published rows; named staff and published fees.
- **Colours:** `{ brand: '#00664A', gold: '#FFC757' }`, Country Day green and gold, from
  `charlottecountryday.org/uploaded/themes/default_22/main.css`. They are the two most-used
  theme colours (186× and 55×).
- **Staff: list everyone (40), as a scrollable list.** The user's words were "go with your
  recommendation of everyone but make it a scrollable list". This is a direct request to
  change the shared card, which is its UX approval under CLAUDE.md.
- **"Learning-support class" row = `IH_FEE`**, using the school's exact wording. There is
  no class, but sessions are "a permanent part of student schedules" and "treated as class
  periods". Cannon codes its equivalent NS; this was the user's call.

Planning decisions:

- **The list scrolls only when it is long: when `staff.people.length > 20`** (constant
  `STAFF_SCROLL_MIN = 20`).
  - Hickory Grove (9), Cannon (12) and Davidson Day (17) are unchanged. Only CCD (40)
    scrolls.
  - The threshold is a count rather than a pixel height. A row is ~38px on desktop and
    ~80px stacked on a phone, so a pixel cap would scroll Davidson Day on phones only,
    which looks arbitrary.
  - **The Therapy card's `PeopleList` never scrolls.**
- **The scroll affordance is pure CSS scroll shadows plus a count caption, not
  `useScrollEdges`.**
  - Scroll shadows are the `background-attachment: local` gradient technique. They need no
    JS, work identically in RTL (they are vertical), and need no resize listener.
  - The caption ("40 people. Scroll the list to see everyone.") also names the region for
    screen readers via `aria-labelledby`, so **one** plural chrome key covers both jobs.
- **Print shows the whole list.** Under `@media print`: no `max-height`, `overflow:
  visible`, no shadows, and the caption hidden. This is the PR #71 collapsed-print lesson:
  a print-out must never silently drop content.
- **The outside therapy providers are named by company in the Therapy items, and no
  individual goes in `therapy.people`.**
  - The companies are TerrificTalkers (speech) and Southern Piedmont Pediatric Therapy (OT).
  - Their staff (Jeanmarie Tommasulo; Kimberly Binford Mannion) are not school employees
    and publish no email, and the school's letters lead with the company.
  - The README rule ("a person named on the Therapy card goes in `therapy.people`") is
    therefore satisfied by naming no person.
- **The Preferred Providers list is described, never listed.** Its date, its seven
  entries, the "Insurance Accepted" marker and financial aid can be stated, but the
  practices are third parties, not school services.
- **No glossary markers.** No CCD page or PDF uses "504" or "IEP"; that absence is a
  finding, raised in Ask the School.
- **Stale documents are never rendered.** The 2015-16 policy, the August 2016
  accommodations list, the 2016–17 referral list and the 2015-2016 school profile are
  still hosted but no longer linked (sources S21–S24). The current linked versions
  (S6–S8) replace them.
- **Two published-email defects; use the directory's address in both cases.**
  - Janani Buford: the Health page's mailto is misspelled `@charlotteountryday.org`; the
    directory (id 3576) gives `janani.buford@charlottecountryday.org`.
  - Lauren Folger-Sweeting: the US ERP page text says `lauren.folger-sweeting@…`; the
    directory (id 19869) gives `lauren.sweeting@charlottecountryday.org`.
  - The README rule is that the email comes from the school's own directory.
- **Collapse double spaces in quotes.** The research file's verbatim text has doubled
  spaces around bold spans (`billed at  $82 per 45-minute session .`), an artifact of HTML
  stripping. Quote them with single spaces and no space before the period, as the page
  renders them. Every other character stays exact.

## Approvals needed

**None outstanding.**
- The six existing cards were approved by the Hickory Grove handoff.
- The scrollable staff list was requested directly by the user on 2026-10-25 (see
  Decisions).
- Adding a school needs no UX approval.
- Deploying is out of scope.

## Source material

Written during `/learning-support`, **uncommitted**, and committed by step 1:

- `source-material/learning-support/charlotte-country-day/Charlotte Country Day - Learning Support - Official Site Research.md`
  holds:
  - provenance and the Source URL table S1–S24;
  - the published fee table and the 40-person staff table, with emails and directory ids;
  - verbatim excerpts of S1–S12 and S13–S20;
  - excluded content and the "Not found" list;
  - **20 corrections to the dossier**;
  - the proposed 24-row mapping.

  **Every quote below comes from this file.**
- `source-material/learning-support/charlotte-country-day/Charlotte Country Day - Learning Support - Deep Research.md`
  is the AI lead sheet. It is **not a source**.

## Out of scope

- Compare (the area stays in `COMPARE_DEFERRED_TOPICS`).
- Any change to Cannon's, Hickory Grove's or Davidson Day's data files.
- Changing the `/learning-support` skill's depth reference **in this PR**. The user
  decided on 2026-10-25, after Phase 1, that CCD replaces Cannon as the reference. That
  change ships as a **separate docs-only PR after this one merges** (step 13). The GO bar
  is computed from the thinnest school, so it is unaffected.
- Re-checking CCD's other research areas against these findings. If a contradiction
  surfaces (e.g. College Support citing the stale ERP wording), note it at the Phase 1
  stop and do not fix it here.
- Deploying.

## Steps

### Phase 1 — English

1. **Branch and stage the research.** From an up-to-date `main`, run
   `git checkout -b feat/ccdlearning`. Run `git status --short`; the two
   `source-material/learning-support/charlotte-country-day/*.md` files should be the only
   untracked paths you own. Never use `git add -A`.

2. **Ingest.** Run the `ingest-source-material` skill for the new folder. Expect:
   - `src/content/learning-support/charlotte-country-day.json` (new);
   - `.claude/docs/learning-support/…` for CCD, and `.claude/docs/INDEX.md`;
   - the `charlotte-country-day` entry in `src/data/schools.json`, gaining
     `learning-support`.

   **Revert anything outside CCD learning-support**, such as other schools' re-stamped
   note dates (ddlearning notes; memory `ingest-full-rebuild-sweeps-topics`).

3. **Write `src/data/learningSupport/charlotte-country-day.ts`**, exporting
   `charlotteCountryDay: LearningSupportProgram`.

   **Header comment** in Davidson Day's style:
   - fetched 2026-10-25, official pages only, and the research file path;
   - the BucsNet pages carry the rates and policy (the dossier could not open them);
   - IH_FEE basis: the per-session rates on S2–S4;
   - speech and OT are independent providers, hence RF;
   - no 504/IEP terms, hence no glossary markers;
   - the stale 2015–2017 PDFs are deliberately unused;
   - the two email decisions.

   Use typographic `“ ” ’` in authored prose. Quotes are exact (with the double-space
   rule in Decisions).

   **Sources**: `Source` constants, labelled `'charlottecountryday.org — <page>'`:

   | const | label suffix | url |
   |---|---|---|
   | `ERP` | `Educational Resource Program` | https://www.charlottecountryday.org/cd-education/educational-resource-program |
   | `LS` | `Lower School ERP (BucsNet)` | https://www.charlottecountryday.org/bucsnet/lower-school/erp |
   | `MS` | `Middle School ERP (BucsNet)` | https://www.charlottecountryday.org/bucsnet/middle-school/erp |
   | `US` | `Upper School Academic Coaching (BucsNet)` | https://www.charlottecountryday.org/bucsnet/upper-school/erp |
   | `ACCOM` | `Academic Accommodations and Learning Support (BucsNet)` | https://www.charlottecountryday.org/bucsnet/upper-school/erp/learning-evaluations |
   | `POLICY` | `Policy on Psychoeducational Evaluations (PDF)` | https://www.charlottecountryday.org/fs/resource-manager/view/340fc0e3-7789-4165-9402-c327f27e5fc4 |
   | `PROVIDERS` | `Preferred Providers for Psychoeducational Testing, January 2026 (PDF)` | https://www.charlottecountryday.org/fs/resource-manager/view/3db8c6f3-71f9-4843-b5c4-e3164f16d243 |
   | `APPROVED` | `Approved Accommodations (PDF)` | https://www.charlottecountryday.org/fs/resource-manager/view/832f59a5-22a3-4f65-9c21-905ee33ddbd7 |
   | `CONSENT` | `ERP Consent for Assessment (PDF)` | https://www.charlottecountryday.org/fs/resource-manager/view/9f5f4219-2c76-4ff5-bd84-8c93beb702a9 |
   | `OT` | `Occupational Therapy screening letter (PDF)` | https://www.charlottecountryday.org/fs/resource-manager/view/0cd223bc-1e47-49af-874c-88b3b66e009d |
   | `SPEECH` | `Speech and Language screening form (PDF)` | https://www.charlottecountryday.org/fs/resource-manager/view/5857f581-8ca5-4b33-9461-f1fb052ab883 |
   | `HEALTH` | `Health Services (BucsNet)` | https://www.charlottecountryday.org/bucsnet/health |
   | `CRISIS` | `Crisis Service Lines` | https://www.charlottecountryday.org/fs/resource-manager/view/e5f0a9ae-520d-4426-9a41-f91f68115594 |
   | `LSCURR` | `Lower School Curriculum` | https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum |
   | `WELLNESS` | `Director of Health and Wellness announcement` | https://www.charlottecountryday.org/bucsnet/post-details/~board/school-news/post/announcing-our-new-director-of-health-and-wellness |
   | `DIRECTORY` | `Faculty/Staff Directory` | https://www.charlottecountryday.org/meet-our-faculty/facultystaff-directory |
   | `ADMISSIONS` | `Admissions Process` | https://www.charlottecountryday.org/admissions/admissions-process |
   | `INTL` | `International Studies` | https://www.charlottecountryday.org/cd-education/international-studies |

   **`colors`:** `{ brand: '#00664A', gold: '#FFC757' }`, with the comment "Bucs —
   Country Day green and gold, from charlottecountryday.org's theme CSS".

   **`lead`:**
   - strong: `'Country Day’s Educational Resource Program “assists students in grades junior kindergarten through grade 12,” with one-on-one learning support in the Lower and Middle Schools, academic coaching in the Upper School, and accommodations for students with a documented disability.'`
   - muted: `'Sessions are billed to the student’s account: $82 for 45 minutes in the Lower School, $85 a session in the Middle and Upper Schools.'`

   **`stats`** (4):
   - `{ value: '$82', label: 'a 45-minute Lower School session', note: 'grades JK–4, billed through the student’s account by the Business Office' }`
   - `{ value: '$85', label: 'a Middle or Upper School session', note: 'Middle School learning support and Upper School academic coaching; the session length is not stated' }`
   - `{ value: '26', label: 'Educational Resource Program staff', note: 'three division directors, 19 learning specialists and four academic coaches' }`
   - `{ value: '6', label: 'school counselors', note: 'two in each division, alongside a Director of Health and Wellness' }`

   **`eligibility`** — sources `[ACCOM, LS, MS, POLICY, APPROVED]`. No `intro`.
   - headline: `'Country Day gives school-based accommodations to students with a documented disability, from its own approved list. Learning-support sessions need no testing.'`
   - eligible: `'Accommodations are for “students with documented disabilities,” and “A licensed service provider must document disabilities through a full psychoeducational evaluation.” Learning-support sessions are different: in the Lower School “A psychoeducational evaluation is not required for services,” and Middle School support is open to students “both with and without formal testing.”'`
   - plan: `'The school’s pages do not mention 504 plans or IEPs. A full psychoeducational evaluation is the only evaluation accepted for formal accommodations: “A simple doctor’s note or medical diagnosis (e.g., ADHD or anxiety) does not provide enough information to justify accommodations.” Supports an outside provider suggests “are considered recommendations and are not mandated.”'`
   - scope: `'“Students are eligible only for Country Day-approved accommodations; accommodations outside this list are not granted.” The approved list covers classroom accommodations, Country Day tests and standardized-test requests.'`
   - note: `'A speech-language, occupational therapy or auditory processing evaluation “may receive school approved accommodations for one year.”'`

   **`services`** — headline:
   `'Every service the school’s pages describe, grouped and coded by who delivers it. Learning-support sessions and coaching are billed per session; speech and occupational therapy come from independent providers on campus. Pick your child’s need to see what applies.'`

   **`verdicts`:**
   - `read`:
     - head: `'One-on-one Orton-Gillingham-based support in the Lower School, and small reading groups in K–1.'`
     - body: `'Lower School specialists “bring advanced training, including Orton-Gillingham,” and the Hochman Method (The Writing Revolution). “For K–1 students, the Reading Specialist provides small-group literacy instruction.”'`
   - `attn`:
     - head: `'Academic coaching in the Upper School, and executive-skills support in the Middle School.'`
     - body: `'Each coaching session “uses a student’s current coursework as the practice ground.” Upper School coaching is scheduled “on a first-come, first-served basis” and “begins after the first day of school as staffing allows.”'`
   - `math`:
     - head: `'One-on-one multi-sensory math in the Lower School, and math support in the Middle School.'`
     - body: `'Lower School math is taught with “hands-on manipulatives, explicit language and multi-sensory engagement.” Middle School specialists help students strengthen “writing, math, and reading comprehension within the context of their coursework.”'`
   - `speech`:
     - head: `'Screening and therapy on campus, through an independent provider the family pays directly.'`
     - body: `'TerrificTalkers’ speech-language pathologists screen on campus for $25.00 and “operate independently of this school and are not employees of the school.” Therapy is arranged and paid for with the provider.'`
   - `motor`:
     - head: `'Occupational therapy on campus through an independent provider. No physical therapy is listed.'`
     - body: `'Southern Piedmont Pediatric Therapy screens for $25, and “OT’s are on campus 1-2 days per week.” If you schedule therapy, “all financial arrangements will be between you and Southern Piedmont Pediatric Therapy.”'`
   - `social`:
     - head: `'Six school counselors, two in each division, and published crisis lines.'`
     - body: `'Lower School counselors provide “short-term individual and/or family counseling if needed, and referral to outside experts when appropriate.” The Health Services page links 988, the Crisis Text Line and the NC Peer Warmline.'`
   - `gifted`:
     - head: `'No gifted or advanced-learner program is described.'`
     - body: `'The school’s learning-support pages describe no gifted program. Ask what is available for advanced learners.'`

   **`groups`** — group names exactly as Cannon's. Keep every quote exact.

   *Learning & academic support*
   | service | code | needs | detail |
   |---|---|---|---|
   | Specialized teachers | IH | read, attn, math | `'Nineteen learning specialists and four Upper School academic coaches, led by a director in each division, plus a Lower School Reading Specialist and Literacy Coach. Lower School specialists “bring advanced training, including Orton-Gillingham.”'` |
   | Reading intervention | IH_FEE | read | `'Lower School specialists give one-on-one support in reading and writing, “typically twice per week,” drawing on Orton-Gillingham and the Hochman Method. K–1 students may also get “small-group literacy instruction” from the Reading Specialist; the school does not say whether those groups are billed.'` |
   | Math intervention | IH_FEE | math | `'One-on-one “Multi-Sensory Math” in the Lower School, and math within Middle School learning support.'` |
   | 1:1 / small-group instruction | IH_FEE | read, attn, math | `'One-on-one in every division: Lower School sessions are “$82 per 45-minute session,” Middle School sessions “$85 per session.” Small groups are for K–1 literacy only.'` |
   | Executive-function coaching | IH_FEE | attn | `'Upper School academic coaching is “billed at $85 per session”: one coach across core classes in 9th grade, then Humanities or STEM coaching in grades 10–12. Middle School support covers “Executive skills (organization, planning, study routines).”'` |
   | Learning-support class | IH_FEE | read, attn, math | `'No learning-support class is offered, but sessions “are a permanent part of student schedules” and are “treated as class periods,” held during study halls, special-area classes or lunch.'` |
   | Accommodations & learning plan | IH | read, attn, math, speech, motor | `'Accommodations come only from the school’s approved list and are recorded in a “Confidential Academic Plan (CAP)” that every teacher can see. Middle and Upper School students with “a documented mental health diagnosis may receive temporary accommodations” while awaiting an evaluation.'` |
   | Specially designed instruction | NS | read, attn, math | `'Not described. The school says accommodations change “how a student accesses learning—not what they are expected to learn.”'` |
   | Self-contained / separate program | NS | — | `'No separate program described.'` |
   | Gifted / advanced | NS | gifted | `'No gifted or advanced-learner program is described.'` |
   | Eligibility documentation | REQUIRED | read, attn, math, speech, motor, social | `'Formal accommodations need a full psychoeducational evaluation, reviewed every three years in Lower and Middle School and every four in Upper School, and submitted through the ERP’s secure online form. Learning-support sessions need none.'` |

   *Therapy & related services*
   - `Speech-language therapy`, RF [speech]: `'TerrificTalkers screens on campus for $25.00 and can provide therapy at school; the family pays the provider directly. The school calls them “contracted” therapists “who provide additional services during the school day.”'`
   - `Occupational therapy`, RF [motor]: `'Southern Piedmont Pediatric Therapy screens for $25 and is “on campus 1-2 days per week”; therapy is arranged and paid for with the provider.'`
   - `Physical therapy`, NS [motor]: `'Not listed by the school.'` (the string Cannon and Davidson Day share).

   *Assessment*
   - `Early identification (JK–2)`, IH [read, attn, math, speech]: `'Lower School students are identified through “benchmark assessments given at the beginning, middle, and end of the school year,” and the school offers speech-language and occupational therapy screenings.'`
   - `Testing accommodations`, IH [read, attn, math]: `'Approved accommodations include “Extended time (50% more)” on Country Day tests. The ERP submits College Board, ACT and IB requests, but “Country Day accommodations do not automatically transfer.”'`
   - `Entrance testing`, IH []: `'A psychologist’s standardized screening for younger applicants, the ISEE for grades 5–12, and the TOEFL for international applicants.'`
   - `Psychoeducational evaluation`, RF [read, attn, math, speech, motor]: `'Done by outside providers at the family’s cost. The school publishes a list of preferred providers, updated January 2026, some accepting insurance, and “financial aid options are available for qualifying families.”'`

   *Wellness & health*
   - `Counseling & emotional support`, IH [social]: `'Six school counselors, two in each division; three hold the title Director of Counseling. Lower School counselors provide “short-term individual and/or family counseling if needed, and referral to outside experts when appropriate.”'`
   - `Emotional & behavioral intervention`, NS [social]: `'No program is described beyond short-term counseling and referral.'`
   - `Crisis resources`, RF [social]: `'The Health Services page links Crisis Service Lines: the 988 Suicide & Crisis Lifeline, the Crisis Text Line (text HOME to 741741) and the NC Peer Warmline (1-855-733-7762).'`
   - `School psychologist`, NS [social]: `'None named. The Director of Health and Wellness, who started July 1, 2026, is “A licensed clinical psychologist.”'`
   - `School nurse`, IH []: `'“Two full-time nurses on each campus.”'`

   *Language*
   - `ESL / English-language support`, IH []: `'The school has “a full-time English as a Second Language program,” and the directory lists an English and ESL Teacher in the Upper School.'`

   **Expected totals: 24 rows.**
   - IH **8**: Specialized teachers, Accommodations, Early identification, Testing
     accommodations, Entrance testing, Counseling, School nurse, ESL.
   - IH_FEE **5**: Reading, Math, 1:1, EF coaching, Learning-support class.
   - RF **4**: Speech, OT, Psychoeducational evaluation, Crisis.
   - REQUIRED **1**: Eligibility documentation.
   - NS **6**: SDI, Self-contained, Gifted, PT, Emotional, School psychologist.

   **18 published, 6 NS, 0 EXCLUDED.** Count with a node one-liner after writing; any
   other total is a mapping error.

   `services.sources`: `[ERP, LS, MS, US, ACCOM, APPROVED, POLICY, PROVIDERS, OT, SPEECH, HEALTH, CRISIS, LSCURR, WELLNESS, ADMISSIONS, INTL, DIRECTORY]`.

   **`therapy`** — sources `[LS, OT, SPEECH]`:
   - headline: `'Speech and occupational therapy are available on campus during the school day from independent providers, arranged and paid for directly by the family. Physical therapy is not listed.'`
   - items:
     - `{ name: 'Speech-language', code: 'RF', detail: 'TerrificTalkers, on campus. Screening $25.00; therapy fees are set by the provider.' }`
     - `{ name: 'Occupational', code: 'RF', detail: 'Southern Piedmont Pediatric Therapy, on campus 1–2 days a week. Screening $25; therapy fees are set by the provider.' }`
     - `{ name: 'Physical', code: 'NS' }`
   - **no `people`** (Decisions).
   - note: `'Both providers “operate independently” of the school. Screening forms go home through the Lower School; the school does not say whether screening is offered in the Middle or Upper School.'`

   **`testing`** — sources `[LS, CONSENT, OT, SPEECH, ACCOM, POLICY, PROVIDERS, APPROVED]`.
   headline:
   `'Lower School students are screened three times a year, and the Educational Resource Program tiers support from the results. Formal accommodations need a full psychoeducational evaluation from an outside provider.'`
   Entries (identification only; admission tests stay in the Services row):
   1. `IH`, `'Benchmark screening (K–4)'`: `'“Students are identified for support based on benchmark assessments given at the beginning, middle, and end of the school year.”'` muted: `'Data analysis meetings with the Literacy Leadership Team decide which of three tiers of support fits: classroom strategies, K–1 small groups, or one-on-one sessions.'`
   2. `IH`, `'Educational screening'`: `'With a parent’s signed consent, the school does “an educational screening” to “identify individual educational needs in order to aid in individualizing instruction.”'`
   3. `RF`, `'Speech-language and occupational therapy screening'`: `'Independent providers screen on campus for $25. OT screenings are “brief 15-20 minute clinical observations to determine if an OT evaluation is needed”; the speech screening “does not serve as a comprehensive speech/language evaluation.”'`
   4. `RF`, `'Psychoeducational evaluation'`: `'“A licensed service provider must document disabilities through a full psychoeducational evaluation,” at the family’s cost. The school publishes a preferred-provider list, updated January 2026.'` muted: `'The accommodations page says evaluations are reviewed every three years in Lower and Middle School and every four in Upper School; the linked policy says three years through grade 5 and four from grade 6.'`
   5. `IH`, `'Confidential Academic Plan'`: `'“Teachers and Learning Support staff review each student’s psychoeducational profile and recommended accommodations,” and approved accommodations go into the student’s Confidential Academic Plan (CAP).'` muted: `'Middle and Upper School students with a documented mental health diagnosis may get temporary accommodations through the school counselor while awaiting an evaluation.'`
   6. `IH`, `'Testing accommodations'`: `'Approved accommodations apply to “Daily coursework and quizzes” and to “Country Day-administered exams, including midterms and finals.” Standardized-test accommodations “must be approved separately by the College Board or ACT.”'` muted: `'In grades 6–12, testing must reach the school at least seven business days before reading day to be used on exams.'`

   **`staff`** — sources `[LS, MS, US, HEALTH, WELLNESS, LSCURR, DIRECTORY]`.
   - headline: `'Forty named staff: the 26-person Educational Resource Program, the Lower School Reading Specialist, the Director of Health and Wellness, seven counselors, four nurses and an ESL teacher.'`
   - people, in this order, with emails exactly as the research file's staff table.
     **Mary Whisnant has no `email`.** Roles as below. Division is appended so the 40-row
     list reads unambiguously; the role strings translate via `PATH_OVERRIDES`.
     1. Sherry Harris — Director of Lower School ERP — sherry.harris@charlottecountryday.org
     2. Leigh Bowles — Learning Specialist, Lower School — leigh.bowles@…
     3. Stuart Deets — Learning Specialist, Lower School — stuart.deets@…
     4. Mattie Gibson — Learning Specialist, Lower School — mattie.gibson@…
     5. Ann Grajales — Learning Specialist, Lower School — ann.grajales@…
     6. Karen Muller — Learning Specialist, Lower School — karen.muller@…
     7. Jennifer Ott — Learning Specialist, Lower School — jennifer.ott@…
     8. Catherine Upchurch — Learning Specialist, Lower School — catherine.upchurch@…
     9. Courtney Wawak — Learning Specialist, Lower School — courtney.wawak@…
     10. Mary Whisnant — Learning Specialist, Lower School — *(none)*
     11. Jennie Roberts Creason — Reading Specialist/Literacy Coach, Lower School — jennie.roberts@…
     12. Laura Hayes — Director of Middle School ERP — laura.hayes@…
     13. Kim Bender — Learning Specialist, Middle School — kim.bender@…
     14. Terri Bennett — Learning Specialist, Middle School — terri.bennett@…
     15. Jacquelyn Coble — Learning Specialist, Middle School — jacquelyn.coble@…
     16. Krista Groncki — Learning Specialist, Middle School — krista.groncki@…
     17. Lisa Miller — Learning Specialist, Middle School — lisa.miller@…
     18. Hasson Perkins — Learning Specialist, Middle School — hasson.perkins@…
     19. Kevin Quesenberry — Learning Specialist, Middle School — kevin.quesenberry@…
     20. Krista Roth — Learning Specialist, Middle School — krista.roth@…
     21. Ashley Swistak — Learning Specialist, Middle School — ashley.swistak@…
     22. Bailey Turner — Learning Specialist, Middle School — bailey.turner@…
     23. Lauren Folger-Sweeting — Director of Upper School ERP — lauren.sweeting@charlottecountryday.org
     24. Jennifer Achilles — Academic Coach, Upper School — jennifer.achilles@…
     25. Chad Groncki — Academic Coach, Upper School — chad.groncki@…
     26. Kristen Rinehart — Academic Coach, Upper School — kristen.rinehart@…
     27. Danielle Riviere — Academic Coach, Upper School — danielle.riviere@…
     28. Dr. Danielle Dixon Scott — Director of Health and Wellness — danielle.scott@…
     29. J.G. Bailey — Director of Lower School Counseling — jg.bailey@…
     30. Aleya Willis — Lower School Counselor — aleya.willis@…
     31. Janani Buford — Director of Middle School Counseling — janani.buford@charlottecountryday.org
     32. Jo Malveaux — Middle School Counselor — jo.malveaux@… *(the directory misspells the title "Counsleor"; the Health page has "Middle School Counselor"; use that)*
     33. Samantha Bosco — Director of Upper School Counseling — samantha.bosco@…
     34. Mallika Rajan — Upper School Counselor — mallika.rajan@…
     35. ChaChi Sullivan — Assistant Director of Athletics, Student Health — chachi.sullivan@…
     36. Gwen Nix — School Nurse, Cannon Campus — gwen.nix@…
     37. Sharon Ferris — School Nurse, Cannon Campus — Sharon.Ferris@… *(published case kept)*
     38. Wendy Barber — School Nurse, Bissell Campus — Wendy.Barber@…
     39. Meredith Schulz — School Nurse, Bissell Campus — Meredith.Schulz@…
     40. Hannah Wagner — English and ESL Teacher, Upper School — hannah.wagner@…

     All domains are `@charlottecountryday.org`. Copy each address from the research
     table, never by pattern.
   - note: `{ strong: 'Each division’s ERP director is the first contact for learning support and accommodations.', muted: 'The school also lists a shared nurses’ inbox, nurses@charlottecountryday.org.' }`

   **`ask`:**
   - headline: `'Thirteen questions to take on the tour, covering what the school’s site leaves unanswered or says two ways: prior plans, evaluation timing, fees, therapy, methods and staffing.'`
   - questions:
     1. `'How is a 504 plan, IEP or another school’s accommodations plan treated when a student enrolls? Is a new psychoeducational evaluation always required?'`
     2. `'Your accommodations page says evaluations are reviewed every three years in Lower and Middle School, but the evaluation policy says three years through grade 5 and four from grade 6. Which applies to grades 5–8?'`
     3. `'How long is a Middle School or Upper School session at $85?'`
     4. `'Are the K–1 small reading groups with the Reading Specialist billed, or included in tuition?'`
     5. `'Does financial aid cover Educational Resource Program sessions or academic coaching?'`
     6. `'What do TerrificTalkers and Southern Piedmont Pediatric Therapy charge for therapy, and do they accept insurance?'`
     7. `'Are speech-language and occupational therapy screenings available in the Middle and Upper Schools?'`
     8. `'Can physical therapy take place on campus during the school day?'`
     9. `'Do you ever modify the curriculum, or is support always accommodations and one-on-one sessions?'`
     10. `'What do you offer advanced or gifted learners?'`
     11. `'Is there a school psychologist, and how does the Director of Health and Wellness work with the Educational Resource Program?'`
     12. `'Upper School coaching is first-come, first-served and depends on staffing, and two academic coach positions are posted. How likely is a new student to get a coaching slot?'`
     13. `'Is English-language (ESL) support offered below the Upper School, and is there a fee?'`
   - asOf: `'October 25, 2026'`

4. **Register it.**
   - In `src/data/learningSupport.ts`:
     - add `import { charlotteCountryDay } from './learningSupport/charlotte-country-day.ts'`;
     - `PROGRAMS` becomes `cannon`, `'charlotte-country-day': charlotteCountryDay`,
       `'davidson-day'`, `'hickory-grove-christian'` (alphabetical);
     - the "researched" comment names all four schools.
   - `src/data/learningSupport/README.md` L4–5: "…then Davidson Day (2026-10-25) and
     Charlotte Country Day (2026-10-25)."
   - `scripts/i18n_topics.mjs` L68 comment: add "Charlotte Country Day (2026-10-25)".

5. **Make the long staff list scrollable** (user request, 2026-10-25).
   - **`src/components/LearningSupport.tsx`:**
     - Add `const STAFF_SCROLL_MIN = 20`, with a one-line comment: lists longer than this
       scroll; HG 9, Cannon 12 and DD 17 stay inline.
     - Give `PeopleList` an optional `scrollable?: boolean`.
     - When `scrollable`, render a caption above the list:
       `<p className="text-muted ls-staff-count" id={captionId}>{t('learning.staffScroll', { count: people.length })}</p>`.
       Take `captionId` from React `useId()`. `PeopleList` needs `useTranslation`; check
       how sibling bodies get `t`.
     - When `scrollable`, the list `<div>` also gets `ls-staff-scroll` in its className,
       plus `role="region"`, `tabIndex={0}` and `aria-labelledby={captionId}`.
       Non-scrollable lists render exactly as today: no extra attributes or wrapper, and
       the DOM unchanged for HG, Cannon, DD and every Therapy list.
     - `StaffBody` passes `scrollable={data.people.length > STAFF_SCROLL_MIN}`.
       `TherapyBody` passes nothing.
   - **`src/index.css`**, after L7435 in the staff block:
     ```css
     /* A long staff list (more than STAFF_SCROLL_MIN people) scrolls in place.
        Scroll shadows (background-attachment: local) show more rows above/below:
        pure CSS, so identical in RTL. Printing shows every row. */
     .ls-staff-count { margin: 0 0 6px; font-size: 12px; }
     .ls-staff-scroll {
       max-height: min(32rem, 70vh);
       overflow-y: auto;
       overscroll-behavior: contain;
       border-block: 1px solid var(--border);
       background:
         linear-gradient(var(--bg) 30%, transparent) top / 100% 32px no-repeat local,
         linear-gradient(transparent, var(--bg) 70%) bottom / 100% 32px no-repeat local,
         radial-gradient(farthest-side at 50% 0, color-mix(in srgb, var(--text) 18%, transparent), transparent) top / 100% 10px no-repeat scroll,
         radial-gradient(farthest-side at 50% 100%, color-mix(in srgb, var(--text) 18%, transparent), transparent) bottom / 100% 10px no-repeat scroll;
     }
     .ls-staff-scroll:focus-visible { outline: 2px solid var(--ls-ink); outline-offset: 2px; }
     @media print {
       .ls-staff-scroll { max-height: none; overflow: visible; border-block: 0; background: none; }
       .ls-staff-count { display: none; }
     }
     ```
     Confirm the text-colour token is really `--text` (grep `:root`) and substitute the
     real one. Confirm the section ground is `var(--bg)` in both themes, so the cover
     gradients match. If the learning section paints its own background, use that token
     instead.
   - **`src/locales/en.json`**, under `learning`:
     - `"staffScroll_one": "{{count}} person. Scroll the list to see everyone."`
     - `"staffScroll_other": "{{count}} people. Scroll the list to see everyone."`

     `_one` never renders at a threshold of 20, but i18next needs the pair. Phase 1 adds
     **en only**; `check:chrome` reports the other nine as "awaiting translation" and
     exits 0.
   - **README rule:** add to `src/data/learningSupport/README.md` Rules: "**Long staff
     lists scroll.** Above 20 people the Who You'll Work With list becomes a keyboard-
     focusable scroll region with a count caption; it prints in full. The Therapy card's
     people never scroll."

6. **Regenerate and compile.**
   - Run `npm run schema`. Only learning-support coverage for CCD should change in
     `.claude/docs/DATA-SCHEMA.md`.
   - Then run `npx tsc -b`, then `npm run build`. Expect green: a new school only **adds**
     prose, so `check:live` has no retired stamps. If it is red, read why before working
     around it.

7. **Browser check** (see Verification). Then commit with **explicit paths** after
   `git status --short`. Push, and verify the push (`git rev-parse HEAD` vs
   `git ls-remote origin feat/ccdlearning`). Flip this plan to `english-done` and the
   INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The stop
message should include:
- the row tally (24 / 18 / 6) and that CCD is now the richest school in the area;
- the scrollable staff list: threshold 20, which schools it affects (CCD only), and a
  screenshot description of the caption and shadows;
- the two email decisions;
- that no individual therapist is named, and why;
- that 504/IEP are absent, and so are glossary markers;
- the grade 5–8 evaluation-validity conflict, shown in Testing and Ask.

### Phase 2 — Every other locale

Two layers, two mechanisms:

- **Research prose** goes to the overlay layer for topic `learning-support`, scoped by
  `PROSE_TRANSLATED` in `src/lib/i18n.ts`: today `es, bn, ht, te, fr, fa, it, hi, ar`
  (confirm there). The mechanism is in `.claude/docs/prose-translation-architecture.md`.
  For method, follow Telugu's or Bangla's rollout docs, never Italian's. The nearest
  precedent is ddlearning's Phase 2 notes.
- **UI chrome** is one new plural key, `learning.staffScroll`, in each non-English catalog
  listed in `TRANSLATED` in `src/lib/i18n.ts` (read the list; nine files besides
  `en.json`).

8. **Measure scope from a fresh extract.** Run
   `node scripts/i18n_extract.mjs --topic learning-support --lang __verify --out <scratch>`
   and diff its stamps against `src/data/overlays/work/learning-support.es.json`.
   - Expect roughly 130–160 **added** strings (40 roles, many of them repeats that
     collapse; 24 rows; 6 entries; 13 questions; and so on) and **0 dropped**.
   - Shared strings only gain `at` paths: `'Not listed by the school.'`, `'No separate
     program described.'`, `'Speech-language'`, `'Occupational'`, `'Physical'`, the group
     and service names, and the dates.

   Investigate any drop before writing.

9. **Splice** with `node scripts/i18n_splice_work.mjs --lang <code> --topic learning-support`
   (`--dry-run` first), × 9 locales. Translate the added entries as stamp→translation maps,
   applied by stamp, **never by index** (memories `splice-not-reextract-for-new-school`,
   `splice-work-files-by-stamp`, `parallel-locale-agents-collide`: agents write maps, main
   applies). Rules:
   - **Quotes** become translated quotations inside quote marks, consistent with how each
     locale renders similar phrasings in Cannon's and Davidson Day's entries.
   - **Figures char-for-char**:
     - money: `$82`, `$85`, `$25`, `$25.00` (localized at render; never re-typed);
     - `45`, `50%`, `1-2`, `15-20`, `26`, `19`, `6`, `988`, `741741`, `1-855-733-7762`;
     - grade bands `JK–4`, `K–1`, `K–4`, `JK–2`, `5–12`, `5–8`, `6–12`, `10–12`.

     For `hi`/`te`, store the English form.
   - **Dates translate:** `July 1, 2026`, `January 2026`, `October 25, 2026`.
   - **`fa`/`ar`:** store no bidi isolates (memory `rtl-overlays-store-no-bidi-isolate`).
     PR #367 isolates ranges at render, so verify by glyph-x scan rather than pre-wording.
     Reword in words only where a range still draws reversed, and record that in
     `src/data/overlays/NOTES.md`.
   - **These stay Latin:** personal names, `TerrificTalkers`, `Southern Piedmont Pediatric
     Therapy`, `Orton-Gillingham`, `Hochman Method`, `The Writing Revolution`, `ISEE`,
     `TOEFL`, `College Board`, `ACT`, `IB`, `CAP`, `ERP`, `ESL`, `Literacy Leadership Team`,
     `Cannon Campus`, `Bissell Campus`. Use `Upper School` / `Lower School` /
     `Middle School` per each locale's existing practice in this area's overlays.
   - **Staff `role` strings translate.** Never infer gender from a name (Cannon note): use
     role-referent forms, `/a`, `(ne)` or `/ة`. Directory titles such as "Director of Lower
     School ERP" keep `ERP` Latin.
   - **French:** run `check:fr` for identifiers.

10. **Rebuild overlays:** `npm run i18n:build -- --topic learning-support --lang <code>` × 9.

11. **Chrome key.** Add `learning.staffScroll` with the plural forms each language needs
    to every non-English catalog in `TRANSLATED`.
    - Determine the forms with `Intl.PluralRules(<lang>).resolvedOptions().pluralCategories`
      and resolve them through i18next (memory `arabic-dual-and-zero-in-legend-plurals`).
    - `ar` has six forms, and `_two` carries **no** `{{count}}`.
    - Insert keys without reordering the file (memory `arabic-plurals-die-on-keyorder-normalize`).
    - `check:chrome` must then report no awaiting key for `learning.staffScroll`.

12. **Phase 2 verification** (below). Then:
    - commit with explicit paths, push and verify;
    - open the PR with `--body-file`; the body records the user decisions (colours, 40
      staff + scroll, IH_FEE class row) and the 20 dossier corrections in summary;
    - `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`;
    - flip the plan to `implemented` and the INDEX row to *Implemented* with the PR link;
    - add `## Implementation notes` for any deviation, and write the memory note.

    **Do not deploy.** End with "merged — ready to deploy whenever you want it".

13. **Then switch the area's reference school: a separate, docs-only PR** (user decision,
    2026-10-25, given after Phase 1). Branch `docs/ccdreference` from the freshly pulled
    `main`. The new split:
    - **Charlotte Country Day** is the **depth reference**. It is also the **fee-row
      reference**, because its per-session rates ($82 for 45 minutes, $85 a session) are
      published.
    - **Hickory Grove** stays the reference **only for 504/IEP glossary markers**. CCD uses
      neither term.
    - Cannon is no longer a reference.
    - **The GO/NO-GO bar is unchanged**: it is computed from the thinnest shipped school.
    - Add a caveat everywhere the reference is named: CCD's 40 staff and 6 Testing entries
      reflect how much that school publishes. The rule is "fill every field the school
      publishes", never "match CCD's counts".

    Update every place the reference is named:
    - the "Learning Support research area" section of `CLAUDE.md`;
    - `.claude/skills/learning-support/SKILL.md`;
    - `.claude/SKILLS.md` (bump its `updated` date);
    - `src/data/learningSupport/README.md`, if it names a reference;
    - the memory note `learning-support-standard-split`.

    `grep -rn "depth reference\|Cannon" ` over those files first. Then open the PR with
    `--body-file`, squash-merge it, and pull `main`. No app code changes, nothing is
    translated, and nothing is deployed.

## Files touched

| File | Change |
|---|---|
| `source-material/learning-support/charlotte-country-day/*.md` (2) | commit (written in planning) |
| `src/content/learning-support/charlotte-country-day.json` | new (ingest) |
| `.claude/docs/learning-support/…`, `.claude/docs/INDEX.md` | ingest output |
| `src/data/schools.json` | CCD gains `learning-support` (ingest) |
| `src/data/learningSupport/charlotte-country-day.ts` | **new**: the data file |
| `src/data/learningSupport.ts` | import + `PROGRAMS` entry + comment |
| `src/data/learningSupport/README.md` | school list; scrolling-list rule |
| `scripts/i18n_topics.mjs` | comment only |
| `src/components/LearningSupport.tsx` | `PeopleList` `scrollable`, caption, region attrs; `STAFF_SCROLL_MIN` |
| `src/index.css` | `.ls-staff-count`, `.ls-staff-scroll`, print reset |
| `src/locales/en.json` | `learning.staffScroll_one/_other` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` (per `TRANSLATED`) | `learning.staffScroll_*` (Phase 2) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/learning-support.<lang>.json` ×9 | splice (Phase 2) |
| `src/data/overlays/learning-support.<lang>.json` ×9 | rebuilt (Phase 2) |
| `src/data/overlays/NOTES.md` | only if an RTL rewording is needed |
| `.claude/plans/ccdlearning.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run build`: exits 0. This includes:
  - `check:seo` (CCD's meta description ≤160 with the added area);
  - `check:schema`;
  - `check:live`;
  - `check:chrome` (exit 0; `learning.staffScroll` listed as awaiting translation in nine
    catalogs);
  - `check:moneytext` (`$82`, `$85`, `$25.00` render without eating punctuation).
- [ ] **Row count:** a node one-liner over the `services` block prints
  `{ IH: 8, IH_FEE: 5, RF: 4, REQUIRED: 1, NS: 6 }`, which is 24 total and 18 published.
- [ ] **Quote check:** extract every `“…”` fragment from the new data file and confirm each
  appears **case-sensitively** in the research file, after collapsing runs of spaces and
  removing a space before `.` or `,` in the research text. 0 misses (ddlearning caught two
  this way).
- [ ] **Email check:** every `email` in `staff.people` appears verbatim in the research
  file's staff table. 39 emails; none for Whisnant.
- [ ] **Browser check (required).** Run `npx vite preview` and drive it with Playwright in
  real Chrome (`channel: 'chrome'`), using `domcontentloaded` (**not** `networkidle`) and
  **every `<details>` forced open**. On `/school/charlotte-country-day/`, confirm:
  - Learning Support renders six cards in order, with no kickers and no Compare button.
  - Green/gold section colours, with gold only on rules and badges. Dark-theme ink is
    readable.
  - Four tiles: `$82`, `$85`, `26`, `6`.
  - **NOT STATED chips:** 6 in Services and 1 in the therapy strip, so 7 data chips
    (count legend samples separately). No blank code cells.
  - The Speech filter shows the TerrificTalkers verdict; the Motor filter shows the OT
    verdict.
  - Testing shows 6 entries; none is an admission test.
  - **Staff list:**
    - the caption reads "40 people. Scroll the list to see everyone.";
    - the list is clipped to ≤ min(32rem, 70vh) and scrolls;
    - the bottom shadow is visible at the top position, and the top shadow appears after
      scrolling;
    - Tab reaches the region, and arrow / PageDown scroll it;
    - `aria-labelledby` resolves to the caption;
    - 39 mailto links with subject "Charlotte Country Day School Inquiry"; Whisnant's row
      is aligned with no link.
  - **Print:** emulate print media (`page.emulateMedia({ media: 'print' })`). The region
    has no max-height, all 40 names are visible in a full-page screenshot or by
    `getBoundingClientRect` of the last row, and the caption is hidden.
  - Ask the School shows 13 questions and "October 25, 2026". Check `ask.headline` with
    the card **closed**.
  - `/school/davidson-day/`, `/school/cannon/` and `/school/hickory-grove-christian/`:
    the staff lists are **not** scrollable (no `.ls-staff-scroll`, no caption), and the
    row counts are unchanged (27/25/23).
  - Overflow 0 at 1280 light, 1280 dark and 390 light.
  - `npm run audit:mobile -- --only charlotte-country-day`: 0 overflow, 0 broken cards at
    320/360/390.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**: `check:live` green, `check:runtime` resolves all nine,
  and `check:chrome` shows no awaiting `learning.staffScroll`.
- [ ] The splice reports **0 dropped** for learning-support.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted.
- [ ] `check_figures.py --topic learning-support` ×9: no new findings versus `main`.
- [ ] `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`, `check:dates`,
  `check:money`, `check:moneytext`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: findings limited to
  the splice growth.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a `main` baseline: no new
  hits. Triage every role label and row name.
- [ ] Plural check: for each locale, `Intl.PluralRules` categories for counts 0, 1, 2, 3,
  11 and 40 all resolve through i18next to a non-English `learning.staffScroll` string.
  `ar` `_two` has no digit.
- [ ] **Browser:** `es`, `hi`, `fa` and `ar` at 1280 (`?lang=<code>`), every card open,
  on `/school/charlotte-country-day/`. Check:
  - 0 English sentences in Learning Support;
  - figures match the English, with money localized (`82 US$` in es/fr);
  - the scroll caption is translated;
  - in `fa`/`ar`, the scroll shadows sit top and bottom, the list scrolls, and **no range
    draws reversed** (glyph-x scan of `$82–$85` if present, `K–4`, `5–12`, `1-2`,
    `15-20`).

  Then run `npm run audit:mobile -- --only charlotte-country-day --lang <code>` at 320px
  for every locale, and `npm run audit:moneyrender` (needs build + preview) for no raw
  `$<digit>` on es/fr. A CCD Latest News headline finding is by design.

## Risks

| Risk | Mitigation |
|---|---|
| A quote drifts from the live page, especially fragments that start with a capital or contain emphasis spans | Copy from the research file; quote check with collapsed spaces; move capitals outside quotes |
| Scroll shadows mismatch the ground in dark mode | Use the section's real background token; check 1280 dark |
| The scrollable region traps touch scrolling on phones | `overscroll-behavior: contain` plus `70vh` cap; test at 390 |
| Print drops rows (the PR #71 class) | Print-media emulation step counts all 40 |
| A role label leaks English in a locale | `role` is promoted in `PATH_OVERRIDES`; `i18n:leaks` triage |
| Gendered role translations | Role-referent forms; never inferred from names |
| Ingest sweeps other topics or schools | Step 2 inspects the diff and reverts outside CCD learning-support |
| Copying a stale 2015–2017 PDF fact | Only S1–S20 are evidence; S21–S24 are recorded as superseded |

## Open questions

- **Scroll threshold 20.** If the user wants Davidson Day's 17 to scroll too, lower
  `STAFF_SCROLL_MIN` to 15. **Default:** 20, so only CCD scrolls. Raise it at the Phase 1
  stop.
- **Staff order.** Grouped by division and role (ERP, then wellness, nurses, ESL).
  **Default:** as listed in step 3; the user can reorder at review.

## Implementation notes

### Phase 1 (English) — 2026-10-25

- **Built as planned; no data deviations.** 24 service rows (IH 8 / IH_FEE 5 / RF 4 /
  REQUIRED 1 / NS 6). All 55 `“…”` fragments matched the research file case-sensitively, with
  0 misses. To match, whitespace in the research text was normalized, NBSPs included: the
  S11 counseling sentence uses NBSPs, and the PDF transcriptions wrap lines mid-quote. All
  39 emails appear verbatim in the staff table; Whisnant has none.
- **Ingest re-stamped Cannon's and Hickory Grove's note dates**, as it did on ddlearning.
  Both changes were reverted.
- **`check:chrome` does not list `learning.staffScroll` as awaiting translation.** The plan
  expected it to, but the script audits skip-field promises, not new keys (memory
  `chrome-check-is-not-a-new-key-gate`). Phase 2 must check the key in all nine catalogs
  directly.
- `npm run build` exits 0. The `bucket-nu75` leader notice in `check:spans` is from an
  earlier PR. CCD's meta description is 127 characters.
- **Browser check in Chrome** at 1280 light and dark and at 390, with every card open:
  - 6 cards, tiles `$82 / $85 / 26 / 6`;
  - 7 NOT STATED data chips plus 1 legend sample, and 0 blank code cells;
  - the Speech and Motor filters show the TerrificTalkers and OT verdicts;
  - 6 Testing entries, 13 questions and "October 25, 2026";
  - `ask.headline` shows on the closed card.
  - **Staff:** the caption reads "40 people. Scroll the list to see everyone." and
    `aria-labelledby` resolves to it. The region has `role=region` and `tabIndex=0`.
    Clipped at 512px out of 1848px, and PageDown and the arrow keys scroll it once it has
    focus. There are 39 mailto links with the subject "Charlotte Country Day School
    Inquiry", and Whisnant's row stays on the 3-column grid with no link.
  - **Print media:** `max-height: none`, `overflow: visible`, no background and the caption
    hidden, and all 40 rows are inside the box.
  - Davidson Day, Cannon and Hickory Grove have no scroll region and no caption, and their
    row counts are unchanged (27 / 25 / 23).
  - Overflow is 0 at every width. `audit:mobile --only charlotte-country-day`: 0 broken
    cards and 0 page overflow.

### Phase 2 (locales) — 2026-10-25

- **Splice counts:** 102 new learning-support strings per locale, 0 dropped. That is below
  step 8's estimate of 130–160, because repeated role titles collapse to one stamp and some
  CCD roles (e.g. "Lower School Counselor") already existed from Davidson Day or Cannon. The
  102 × 9 translations were written as stamp→text maps in the scratchpad and applied by stamp.
  The apply step refused unknown stamps and never overwrote an existing `t`.
- **Ranges were not pre-worded in fa/ar.** PR #367 isolates ranges at render, so `1-2`,
  `15-20`, `K–4`, `5–12` and the rest keep their figures. A glyph-x scan in Chrome found
  0 of 9 ranges reversed in either locale, so `src/data/overlays/NOTES.md` is unchanged.
- **Kept Latin on purpose:** `Educational Resource Program` (like Cannon's `Learning
  Support Program`), `Confidential Academic Plan (CAP)`, `Reading Specialist`, `Literacy
  Coach`, `Business Office`, `Health Services`, and the crisis-line names. The
  `Confidential Academic Plan` entry title is therefore byte-identical in all nine
  locales. That is the only new string identical to its English.
- **Gendered roles:** es `/a`, fr `(rice)`/`(ère)`, it `Responsabile` plus `/a`, ar `/ة`;
  hi/bn/te/fa/ht are neutral. A draft slip, "la Reading Specialist" in es, was corrected
  to "el/la" before applying.
- **Chrome key:** `learning.staffScroll` was added to all nine catalogs with each locale's
  CLDR forms (es/fr/it `_many`; ar six forms, with `_two` = "شخصان" and no digit). Each key
  was inserted after the `"learning": {` line without reordering. Counts 0/1/2/3/11/40
  resolve through i18next to translated text in every locale.
- **Verification:**
  - `npm run build` exits 0. `check:live` and `check:runtime` resolve all 9 locales.
  - sepdrift: 0 drift ×9. `check_figures`: intact ×9.
  - Clean: `check:fr`, `bidi`, `fa`, `hi`, `script`, `dates`, `money`, `currency`.
  - `i18n:leaks`: identical to the Phase 1 baseline ×9. A direct scan of the new strings
    found no stray Latin in the non-Latin locales.
  - `check_work_integrity --base 4711e6b5`: exactly 1 finding per locale, the splice
    growth (289 → 391).
  - Chrome (es/hi/fa/ar at 1280): 6 cards and 40 staff rows. The caption is translated
    and resolves through `aria-labelledby`. The region clips at 510px of ~1850px, scrolls,
    and shows its shadow gradient. There is no English prose, money is localized, and the
    page has 0 overflow.
  - `audit:mobile --only charlotte-country-day` at 320px ×9: 0 broken cards and 0 page
    overflow.
  - `audit:moneyrender`: only the CCD Latest News headline and preview (es/fr), never
    translated by design.
