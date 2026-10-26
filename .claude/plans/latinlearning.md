---
name: latinlearning
title: Add Charlotte Latin School to Learning Support & Student Services
status: in-progress
phases: 2
created: 2026-10-26
branch: feat/latinlearning
prs: []
---

# Add Charlotte Latin School to Learning Support & Student Services

## Goal

Give Charlotte Latin School (`charlotte-latin`) the six-card **Learning Support & Student
Services** section that Hickory Grove, Cannon, Davidson Day, Charlotte Country Day and
Charlotte Catholic already have. It covers Latin's fee-based **Learning Resources** program,
its 504 Educational Plan, its counselors and nurses, and every gap, shown as a NOT STATED
chip. Every fact comes from the school's own pages: live pages, PDFs it hosts, and Wayback
copies of its own removed pages. Done means the section renders on `/school/charlotte-latin/`
in English (Phase 1, then the user's review) and then in all nine prose locales (Phase 2),
with every build gate green.

## Context

- **The area.** Types and the fixed card order are in `src/data/learningSupport.ts`:
  eligibility → testing → services → therapy → staff → ask. The data rules are in
  `src/data/learningSupport/README.md`. The component is `src/components/LearningSupport.tsx`.
  The section renders only when **both** gates exist:
  `source-material/learning-support/<slug>/*.md` (which gives the school `learning-support`
  in `src/data/schools.json` through ingest) **and** an entry in `PROGRAMS` in
  `src/data/learningSupport.ts`.
- **References.** Charlotte Country Day
  (`src/data/learningSupport/charlotte-country-day.ts`) is the depth reference: its shape,
  tone, the service-row set and the `Source` constants pattern. Hickory Grove
  (`hickory-grove-christian.ts`) is the reference for the `[[504|…]]` glossary marker, which
  Latin needs. The most recent build to copy step by step is
  `.claude/plans/cchslearning.md` (PR #372), especially its Phase 2 notes.
- **Latin's public footprint is unusual.** The live site keeps only the Student Support and
  Wellness hub. It has three popup panels: "Learning Resources", "Counselors" and "Nurses".
  Each holds one paragraph and no names. The detailed policy lives in Latin's **November
  2023 online Family Handbook**, removed from the site and read from Wayback. The Learning
  Resources program page (live until at least 2025-05-23, now 404) and a 2022 guidelines
  page add to it. The 2018-19 handbook PDF is still hosted but is superseded; use it only
  where 2023 is silent. **No fee amount, no current Learning Resources staff names, no staff
  emails, and no public directory** exist anywhere.
- **Latin's College Support already discusses Learning Resources.** See
  `src/data/collegeSupportPrograms/charlotte-latin.ts`: the header comment at L23–26,
  `wholeClass.support` at ≈L733–750, and `verdict.checklist[3]` and `[4]` at ≈L817–818.
  `CollegeSupport.tsx` (≈L836) automatically adds a "See Learning Support & Student
  Services →" link under `support` once the school has the topic. Two statements there go
  stale with this research (step 5).
- **Shipped row counts** (published = any code except NS, EXCLUDED not rendered). HG has 14
  published of 23 rendered (the thinnest), Cannon 17/25, Davidson Day 15/27, CCD 18/24 and
  CCHS 15/24. Latin will have **15 of 25**.

## Decisions

- **GO** (2026-10-26, `/learning-support` step 2). The bar is the thinnest school, Hickory
  Grove at 14 published rows, so 7. The four tests: (1) the live "Learning Resources" panel
  names the program; (2) eligibility is 3/3; (3) 15 ≥ 7; (4) Michele King is named.
  User: **"Proceed (Recommended)"**.
- **Staff card** (user, 2026-10-26: **"King + division heads (Recommended)"**). List
  Michele King (Director of Student Support & Wellness), Casey Martin (Head of Lower
  School), Louisa Polos (Head of Middle School) and Tracey Vanneste (Head of Upper School),
  all **without email**. Add a `staff.note` saying the program is led by a Director of
  Learning Resources (K–12) whom the school's public pages do not name. The division heads
  are justified because the handbook gives them a role: LS classroom placement, and MS/US
  approval of on-campus tutoring.
  - **Never render:** Teresa Edwards (retired 2025), Margaret Sigmon (2016 announcement),
    Isa Stokes, Jessica Shoup, any 2018/2020/2023 counselor or nurse name, or any
    third-party name (SAIS, NAIS, Indeed, ZipRecruiter).
- **Colours** (user, 2026-10-26: **"#003764 / #F5A92A (Recommended)"**):
  `colors: { brand: '#003764', gold: '#F5A92A' }`. Both come from
  charlottelatin.org's theme CSS (`/uploaded/themes/default_25/main.css`): the most-used
  navy and the gold accent.
- **Currency is stated, not hidden.** The lead's muted line and the Ask card say the
  detailed policy is from the November 2023 handbook. The live site carries only the goal
  statement.
- **Wayback sources are labelled as such**, for example
  `'charlottelatin.org — Family Handbook, Upper School (Wayback, November 2023)'`, with the
  Wayback URL as `url`.
- **2023 wins over 2018-19** wherever both speak. For example, grades **3–5** (not 4–5) for
  LS study skills and ERB extended time, and "billed … by the Business Office".
- **Row labels re-use existing ones.** "Subject tutoring" and "Screening & identification"
  each exist on one shipped school. No new row label is invented.
- **No EXCLUDED rows.** Latin never says "we do not provide". The `scope` cell states only
  its stated limits.
- **College Support gets one correction** (step 5). It is a data correction, allowed under
  the ingestion rule and the precedent of the CCHS plan step 4. No UX change.
- **No fee tile.** There is no amount to show.

## Approvals needed

None outstanding. The six cards were approved with the Hickory Grove design handoff
(2026-10-20), and adding a school to an existing area needs no UX approval. The GO, staff
and colour decisions above are the user's approval record.

## Source material

Written during `/learning-support` step 2 and **uncommitted**. `/implement` stages and
ingests them in step 1–2.

- `source-material/learning-support/charlotte-latin/Charlotte Latin - Learning Support - Official Site Research.md`
  is **the** source for every fact and quote. It has 21 sources (S1–S3, S5a–S22), verbatim
  excerpts, the fee table, the staff table, the NOT FOUND list and 12 corrections to the
  dossier.
- `source-material/learning-support/charlotte-latin/Charlotte Latin - Learning Support - Deep Research.md`
  is the AI dossier, condensed into a lead sheet. **Not a source.**

Key URLs (full table in the research file):

| Id | URL |
|---|---|
| S1 | https://www.charlottelatin.org/leading-programs/student-support-and-wellness |
| S2a–c | panel bodies via `https://www.charlottelatin.org/fs/elements/38616?is_popup=true&post_id=4916` (LR) / `4915` (Counselors) / `4914` (Nurses) `&show_post=true&is_draft=false`. **Cite S1 as the source** (the popup URL is an internal endpoint) |
| S3 | https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf |
| S5a | http://web.archive.org/web/20231120125942/https://www.charlottelatin.org/familyhandbook/all-school-policies |
| S5b | http://web.archive.org/web/20231120124734/https://www.charlottelatin.org/familyhandbook/lower-schools-policies |
| S5c | http://web.archive.org/web/20231120141714/https://www.charlottelatin.org/familyhandbook/middle-school-policies |
| S5d | http://web.archive.org/web/20231120124247/https://www.charlottelatin.org/familyhandbook/upper-schools-policies |
| S6 | http://web.archive.org/web/20250523012049/https://www.charlottelatin.org/academics/learningresources |
| S7 | http://web.archive.org/web/20220708072524/https://www.charlottelatin.org/learning-resources-guidelines |
| S8 | https://www.charlottelatin.org/support/endowed-gifts |
| S12 | https://www.charlottelatin.org/admissions/application-process |
| S13 | https://www.charlottelatin.org/uploaded/COMPOSER/AdmissionsTab/CAIS2025-26.pdf |
| S17 | https://www.charlottelatin.org/about/school-leadership |

## Out of scope

- Compare. Learning Support stays in `COMPARE_DEFERRED_TOPICS`.
- Any new card, row label, chrome key or component change.
- Re-fetching the research. If a page has changed, record it in Implementation notes;
  don't silently re-research.
- `source-material/learning-support/providence-day/`, which is untracked in the same tree
  and belongs to another piece of work. **Never stage, ingest or revert-into it.**
- Deploying.

## Steps

### Phase 1 — English

1. **Branch and stage the research.** From an up-to-date `main`:
   - Run `git checkout -b feat/latinlearning`.
   - Run `git status --short`. The two `source-material/learning-support/charlotte-latin/*.md`
     files are yours; `providence-day/` is **not**.
   - Stage explicit paths only; never `git add -A`.

2. **Ingest.** Run the `ingest-source-material` skill for the new folder. Expect:
   - `src/content/learning-support/charlotte-latin.json` (new);
   - Latin's learning-support note under `.claude/docs/` and its `.claude/docs/INDEX.md`
     line;
   - `learning-support` added to the `charlotte-latin` entry in `src/data/schools.json`.

   **Revert everything else the ingest touches:** other schools' re-stamped note dates
   (seen in ccdlearning, ddlearning and cchslearning), and **every Providence Day output** if
   it picks up `providence-day/`. Confirm with `git status --short` and `git diff --stat`.

3. **Write `src/data/learningSupport/charlotte-latin.ts`**, exporting
   `charlotteLatin: LearningSupportProgram`. Follow CCD's file layout: a header comment
   (sources, the 2023-handbook currency, no fee, no named LR staff, the corrections), then
   `Source` constants, then the object.

   **Every “quoted” fragment is copied char-for-char from the research file**, including
   curly apostrophes (`Latin’s`). Non-quoted prose is written plainly, in the house tone of
   CCD and CCHS.

   **Sources.** Use these constants, each label in the form
   `'charlottelatin.org — <page>'`:
   - `HUB` (S1, Student Support and Wellness);
   - `HB_ALL`, `HB_LS`, `HB_MS`, `HB_US` (S5a–d, each "(Wayback, November 2023)");
   - `LRPAGE` (S6, "Learning Resources (Wayback, May 2025)");
   - `GUIDE` (S7, "Learning Resources Program Guidelines (Wayback, July 2022)");
   - `HB1819` (S3, "2018-19 Family Handbook (PDF)"), used **only** for the Upper School
     tutoring rule;
   - `ENDOW` (S8);
   - `ADMIT` (S12);
   - `CAIS` (S13, "CAIS 2025-2026 testing brochure (PDF)");
   - `LEADERS` (S17, School Leadership).

   - **`colors`:** `{ brand: '#003764', gold: '#F5A92A' }`.

   - **`lead`:**
     - `strong`: Latin’s Learning Resources program serves “students with diagnosed learning
       disabilities and/or attention issues,” with remediation in the Lower School,
       small-group classes in the Middle School and executive-function coaching in the
       Upper School.
     - `muted`: sessions are billed per session, outside tuition, and no rate is published.
       The detailed policy here is from Latin’s November 2023 online Family Handbook,
       which is no longer on its website.

     The quoted phrase is from S2a, the live panel. Its wording there is "…enable students
     with diagnosed learning disabilities and/or attention issues to reach…", so the
     fragment matches.

   - **`stats`** (4 tiles):
     - `1985`: "the year Learning Resources began", from S6 ("Instituted in 1985");
     - `3 years`: "how recent an evaluation must be", from S5a;
     - `50%`: "extra time, the typical extended-time accommodation", from S5b–d
       ("extended time (time and one/half or 50% more)");
     - `3`: "full-time registered nurses", from S2c (live).

     No fee tile.

   - **`eligibility`** (sources `HUB`, `HB_ALL`, `HB_MS`, `HB_US`, `GUIDE`):
     - **headline:** Latin serves students with a diagnosed learning disability or
       attention issue, confirmed by a psychologist's evaluation less than three years
       old.
     - **`eligible`:**
       - S5a: “The Learning Resources program serves students with diagnosed learning
         disabilities and/or attention issues that impact academic achievement.”
       - Admission is “based on parent or teacher request, screening by Learning Resources
         staff, and a comprehensive psychoeducational evaluation conducted by a licensed
         psychologist,” and “Evaluations must be current (within three years).”
     - **`plan`:**
       - Latin writes its own plan. In the Middle and Upper Schools a
         `[[504|504 Educational Plan]]` is “developed by parents, teachers, and the student
         (when appropriate)” (S7) and renewed each year (S5c/d).
       - Families are “encouraged to share psychological/neurological evaluations and
         reports with the Director of Learning Resources in the spring/summer before
         enrollment” (S7).
       - The pages do not say how a 504 plan or IEP from another school is treated.
     - **`scope`:**
       - Stated limits only. Upper School sessions “are not intended to provide tutoring in
         specific subjects” (S5d).
       - “No student will be allowed to leave campus during the school day to see an
         off-campus tutor” (S5c).
       - No service is described as not offered.
     - **`note`:** Lower School accommodations “may be informally offered to students in
       the Lower School who are demonstrating difficulty with assignments or tests” (S5b).
     - **Quote check with the marker.** When a quote contains a `[[504|…]]` marker, check
       it against the research file with the marker reduced to its display text.

   - **`services`** (25 rows; sources `HB_ALL`, `HB_LS`, `HB_MS`, `HB_US`, `LRPAGE`, `GUIDE`,
     `HB1819`, `ENDOW`, `ADMIT`, `CAIS`, `HUB`). The headline should say that sessions are
     billed per session with no published rate, and that most detail comes from the 2023
     handbook.

     **Groups and rows.** The detail lines are drafts; quotes inside them are verbatim from
     the research file.

     *Learning & academic support*

     | # | service | code | detail | needs |
     |---|---|---|---|---|
     | 1 | Specialized teachers | IH | A Director of Learning Resources (K–12) and “Learning Resources teachers within each school division” (S5a); program “Instituted in 1985” (S6) | read, attn, math |
     | 2 | Reading intervention | IH_FEE | LS students “receive individualized instruction during the school day for an additional fee”; staff “teach reading, writing, and math” (S5b). No intervention method is named | read |
     | 3 | Math intervention | IH_FEE | LS reading, writing and math; MS sessions “may also focus on … math computation or problem-solving” (S5c). Use the ellipsis only if the quote check accepts it; otherwise quote two separate fragments | math |
     | 4 | 1:1 / small-group instruction | IH_FEE | “individually or in small groups (when appropriate)” (S5b); MS “individualized and small group classes” (S5c); “billed per session each month by the Business Office” (S5a) | read, attn, math |
     | 5 | Executive-function coaching | IH_FEE | US “consultative and coaching model” on “executive functioning skills (i.e. organization, time management, study strategies)” (S5d); MS organization, time management, note taking, test-taking (S5c); LS study skills from Grades 3–5 (S5b) | attn |
     | 6 | Learning-support class | IH_FEE | Sessions run “during the school day” (S5b); MS “individualized and small group classes” (S5c). The pages do not say which period they replace | read, attn, math |
     | 7 | Accommodations & learning plan | IH | Typical accommodations: preferential seating, “extended time (time and one/half or 50% more)”, a separate setting, a computer for writing, copies of notes (S5b–d). Recorded in a `[[504|504 Educational Plan]]` each year in MS and US | read, attn, math, speech, motor |
     | 8 | Specially designed instruction | NS | Not described | read, attn, math |
     | 9 | Self-contained / separate program | NS | None described; S6 says the program lets students “learn effectively and successfully in a regular classroom” | [] |
     | 10 | Gifted / advanced | NS | No gifted or advanced-learner program described | gifted |
     | 11 | Eligibility documentation | REQUIRED | A “comprehensive psychoeducational evaluation conducted by a licensed psychologist,” current within three years (S5a) | read, attn, math, speech, motor, social |
     | 12 | Subject tutoring | RF | On-campus tutoring by tutors “on Latin’s approved tutor list” with a background check, approved by the division (S5c; US C– rule in S3); “Families are responsible for any fees associated with Learning Resources or Tutoring” (S5c) | read, math |

     *Therapy & related services*

     | # | service | code | detail | needs |
     |---|---|---|---|---|
     | 13 | Speech-language therapy | NS | `'Not listed by the school.'` (re-use the shared string) | speech |
     | 14 | Occupational therapy | NS | same | motor |
     | 15 | Physical therapy | NS | same | motor |

     *Assessment*

     | # | service | code | detail | needs |
     |---|---|---|---|---|
     | 16 | Screening & identification | IH | “screening by Learning Resources staff” (S5a); “Screening services for students referred by teachers for observation and evaluation” (S6) | read, attn, math |
     | 17 | Testing accommodations | IH | ERB extended time (LS Grades 3–5; MS through the 504 plan); College Board and ACT applications (PSAT, SAT, PreACT, ACT, AP) “submitted separately by the Director of Learning Resources”, which “generally take 6-7 weeks” (S5d) | read, attn, math |
     | 18 | Entrance testing | REQUIRED | WPPSI for TK/K and Grade 1, WISC V for Grades 2–4, ISEE for Grades 5–11 (S12). CAIS testing: “$275 for WPPSI-IV” / “$275 for WISC-V”, paid to the psychologist (S13) | [] |
     | 19 | Psychoeducational evaluation | REQUIRED | By an outside “licensed psychologist”; no referral list and no cost published | read, attn, math |

     *Wellness & health*

     | # | service | code | detail | needs |
     |---|---|---|---|---|
     | 20 | Counseling & emotional support | IH | “Individual counseling services are short-term; however, consultation and referrals can be provided for students and families who need more intensive, longer-duration services” (S2b, live); three full-time on-site counselors TK–12 (S5a) | social |
     | 21 | Emotional & behavioral intervention | NS | Not described | social |
     | 22 | Crisis resources | NS | No crisis lines published. Do not cite the security Crisis Response Team | social |
     | 23 | School psychologist | NS | None listed | social |
     | 24 | School nurse | IH | “Three full-time registered nurses offer health assessments, provide emergency care for illness and injury, administer medications, and identify students with special needs” (S2c, live) | [] |

     *Language*

     | # | service | code | detail | needs |
     |---|---|---|---|---|
     | 25 | ESL / English-language support | NS | Not described for enrolled students | [] |

     Tally: `{ IH: 6, IH_FEE: 5, REQUIRED: 3, RF: 1, NS: 10 }`, which is 25 rows with 15
     published.

     **`verdicts`** (one per need; each body quotes the research file):
     - **read:** one-to-one or small-group remediation in the Lower School, billed per
       session. The method is not named.
     - **attn:** executive-function coaching in the Upper School and organization work in
       the Middle School.
     - **math:** remediation in the Lower School and math in Middle School sessions.
     - **speech** (NS): no speech-language therapy is described.
     - **motor** (NS): no occupational or physical therapy is described.
     - **social:** short-term counseling with referrals, and three nurses.
     - **gifted** (NS): no gifted or advanced-learner program is described. Ask what is
       available for advanced learners.

   - **`therapy`** (sources `HUB`, `HB_ALL`):
     - headline: the school's pages describe no speech, occupational or physical therapy.
     - items: Speech-language, Occupational and Physical, all `NS`.
     - `note`: counseling is the only related service described, and families who need
       “more intensive, longer-duration services” are referred out (S2b).
     - No `people`.

   - **`testing`** (identification only; never WPPSI, WISC or ISEE). Six entries:

     | code | title | content |
     |---|---|---|
     | IH | Screening by Learning Resources staff | S5a; S6 “for students referred by teachers for observation and evaluation” |
     | REQUIRED | Psychoeducational evaluation | by “a licensed psychologist”, current within three years; the family arranges it |
     | REQUIRED | Evaluations shared before enrollment | S7 quote |
     | IH | Deciding the level of support | “recommendations by the psychologist are carefully reviewed to determine the level of support needed from Learning Resources” (S5a); `muted`: who reviews is not stated |
     | IH | 504 Educational Plan | MS and US, each year, with `[[504|…]]` |
     | IH | Testing accommodations | ERB rules, and College Board/ACT applications filed by the Director of Learning Resources (S5d) |

     Sources: `HB_ALL`, `HB_LS`, `HB_MS`, `HB_US`, `LRPAGE`, `GUIDE`.

   - **`staff`** (sources `HUB`, `LEADERS`):
     - headline: four named leaders. The program's own director is not named publicly.
     - people, in this order, with no `email` field:
       - `{ name: 'Michele King', role: 'Director of Student Support & Wellness' }`
       - `{ name: 'Casey Martin', role: 'Head of Lower School' }`
       - `{ name: 'Louisa Polos', role: 'Head of Middle School' }`
       - `{ name: 'Tracey Vanneste', role: 'Head of Upper School' }`
     - `note`:
       - `strong`: the Learning Resources program is led by a Director of Learning
         Resources (K–12), whom the school’s public pages do not name.
       - `muted`: the division heads appear because the handbook gives them a part in
         Lower School class placement and in approving on-campus tutoring. The school
         publishes no staff emails.

   - **`ask`** (`asOf: 'October 26, 2026'`): one question per gap. Draft:
     1. What does a Learning Resources session cost in 2026-27, and is there a written rate?
     2. Is the November 2023 Family Handbook's Learning Resources policy still current? Can
        we see the current handbook sections?
     3. Who is the Director of Learning Resources, and who are the Learning Resources
        teachers in each division?
     4. Does Learning Resources serve Transitional Kindergarten?
     5. What reading-intervention method do Learning Resources teachers use?
     6. If my child arrives with a 504 plan or IEP from another school, will you use it, or
        do we need a new evaluation?
     7. Do you keep a list of psychologists who do psychoeducational evaluations?
     8. Who reviews the psychologist's recommendations and decides the level of support?
     9. Is a 504 Educational Plan written in the Lower School as well?
     10. Do accommodations alone, without Learning Resources sessions, carry a fee?
     11. Can outside speech, occupational or physical therapists work with my child on
         campus during the school day?
     12. Is there a school psychologist, and what crisis resources do you give families?
     13. How does a family qualify for the Gorelick Endowment for Learning Resources?
     14. What is available for advanced learners and for students still learning English?

     Keep `headline` in the shared form the other schools use (check CCHS's `ask.headline`).

4. **Register and update the "researched schools" wording.**
   - `src/data/learningSupport.ts`:
     - add `import { charlotteLatin } from './learningSupport/charlotte-latin.ts'`;
     - `PROGRAMS` becomes `cannon`, `'charlotte-catholic'`, `'charlotte-country-day'`,
       `'charlotte-latin': charlotteLatin`, `'davidson-day'`, `'hickory-grove-christian'`
       (alphabetical);
     - update the comment above (≈L182–186) that names the researched schools.
   - `src/data/learningSupport/README.md` L4–7: append "…then Charlotte Catholic
     (2026-10-26) and Charlotte Latin (2026-10-26)."
   - `scripts/i18n_topics.mjs` L68 comment: add "Charlotte Latin (2026-10-26)".

5. **College Support correction** in `src/data/collegeSupportPrograms/charlotte-latin.ts`.
   The new research contradicts two statements.
   - **Header comment, L23–26.** It says "every descriptive page 404s and the live tile is
     an href="#" anchor with no body copy". Change it to: the program pages were removed
     (the last Wayback copy is 2025-05), and the live tile opens a one-paragraph goal
     statement. The detail now lives in the Learning Support section. Comment only; no
     translation impact.
   - **`verdict.checklist[4]`** (≈L818). It reads "Every Learning Resources page on your
     website 404s and the tile links nowhere. …", and the second half is now false.
     Reword to: "Your Learning Resources pages were removed from the website in 2025, and
     the Student Support & Wellness tile now holds a one-paragraph summary. Where should a
     family with a diagnosed learning difference find the program's current policy, staff
     and rates?" This **retires one college-support stamp** for Phase 2.
   - **Leave as is:** `wholeClass.support` (all four rows stay accurate) and
     `checklist[3]` (the director and the cost are still unpublished). The "See Learning
     Support & Student Services →" link appears automatically.

6. **Regenerate and compile.**
   - Run `npm run schema`. Only the learning-support coverage line for Latin should change
     in `.claude/docs/DATA-SCHEMA.md`.
   - Run `npx tsc -b`, then `npm run build`. In Phase 1, `check:live` is **expected red**,
     but only on the one retired college-support stamp × 9 locales (see Verification). If
     it blocks the browser build, use `npx vite build && npm run prerender`.
   - Run `npm run check:seo`. Adding a topic can lengthen Latin's meta description, and
     `src/lib/head.ts` already drops to a two-topic sample when needed (CCHS deviation).
     Confirm it is ≤160 characters.

7. **Browser check** (see Verification). Then:
   - commit with **explicit paths**, after `git status --short`;
   - push, and verify the push (`git rev-parse HEAD` vs
     `git ls-remote origin feat/latinlearning`);
   - flip this plan to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The stop
message should include:
- the row tally (25 / 15 / 10), and that it is one above Hickory Grove;
- that the policy is quoted from the 2023 handbook via Wayback, and how the section says so;
- the four-person staff card with no emails, and the director note;
- the four stat tiles;
- the College Support reword;
- the open questions below.

### Phase 2 — Every other locale

The scope is `PROSE_TRANSLATED`: `es, bn, ht, te, fr, fa, it, hi, ar` (confirm in
`src/lib/i18n.ts`). It covers topics `learning-support` (Latin's new strings) and
`college-support` (1 retired, 1 new). **No chrome keys change.** The mechanism is in
`.claude/docs/prose-translation-architecture.md`. Follow Telugu's or Bangla's rollout docs
for method, never Italian's. The nearest precedent is the Phase 2 section and
Implementation notes of `.claude/plans/cchslearning.md`.

8. **Measure scope from a fresh extract.** For each topic, run
   `node scripts/i18n_extract.mjs --topic <topic> --lang __verify --out <scratch>` and diff
   its stamps against `src/data/overlays/work/<topic>.es.json`. Expected:
   - `learning-support`: roughly 80–110 **added**, **0 dropped**. Shared strings (for
     example `'Not listed by the school.'`, the therapy names, the group names and the
     shared service names) only gain `at` paths.
   - `college-support`: exactly **1 retired** (old `checklist[4]`) and 1 added.

   Investigate any other drop before writing anything.

9. **Splice** with `node scripts/i18n_splice_work.mjs --lang <code> --topic <topic>`
   (`--dry-run` first), × 9 locales × 2 topics. Translate the added entries as
   stamp→translation maps, applied by stamp, **never by index**. See the memories
   `splice-not-reextract-for-new-school`, `splice-work-files-by-stamp` and
   `parallel-locale-agents-collide` (agents write maps; main applies them). Rules:
   - **Quotes** become translated quotations inside quote marks, consistent with each
     locale's practice in the existing schools' entries.
   - **The glossary marker `[[504|…]]`** keeps its `504` key; only the display text
     translates, as in the Hickory Grove entries.
   - **Figures are copied char-for-char:** `1985`, `3`, `50%`, `$275`, `6-7`, `TK–12` and
     `K–12`, `3–5`, `5–11`, `2–4`, `2026-27`, `C–`. For `hi`/`te`, store the English form.
   - **Dates translate:** `October 26, 2026`, "November 2023", "2025".
   - **`fa`/`ar`:** store no bidi isolates (memory `rtl-overlays-store-no-bidi-isolate`).
     PR #367 isolates numeric ranges at render; verify ranges by glyph-x scan.
   - **These stay Latin:**
     - personal names;
     - `WPPSI`, `WPPSI-IV`, `WISC V`, `WISC-V`, `ISEE`, `ERB`, `PSAT`, `SAT`, `PreACT`,
       `ACT`, `AP`, `College Board`, `CAIS`;
     - the program name `Learning Resources` (as CCD's `Educational Resource Program`
       stayed Latin);
     - `504 Educational Plan` inside the marker display, following Hickory Grove's
       treatment of its plan names in each locale;
     - `Gorelick Endowment for Learning Resources`.

     Generic nouns around them translate.
   - **Staff `role` strings translate.** Never infer gender from a name (memory
     `cannonlearning`): use role-referent forms, `/a`, `(rice)` or `/ة` as the earlier
     schools did.
   - **French:** run `check:fr` for identifiers.

10. **Rebuild overlays:** `npm run i18n:build -- --topic <topic> --lang <code>` × 9 × 2.

11. **Phase 2 verification** (below). Then:
    - commit with explicit paths, push and verify the push;
    - open the PR with `--body-file`. The body records the user decisions (GO, staff
      card, colours) and the 12 dossier corrections in summary;
    - `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`;
    - flip the plan to `implemented` and the INDEX row to *Implemented* with the PR link;
    - add `## Implementation notes` for any deviation, and write the memory note
      (`latinlearning-shipped`) plus its MEMORY.md line.

    **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/learning-support/charlotte-latin/*.md` (2) | commit (written in planning) |
| `src/content/learning-support/charlotte-latin.json` | new (ingest) |
| `.claude/docs/…` Latin learning-support note, `.claude/docs/INDEX.md` | ingest output |
| `src/data/schools.json` | Latin gains `learning-support` (ingest) |
| `src/data/learningSupport/charlotte-latin.ts` | **new**: the data file |
| `src/data/learningSupport.ts` | import + `PROGRAMS` entry + comment |
| `src/data/learningSupport/README.md` | school list |
| `scripts/i18n_topics.mjs` | comment only |
| `src/data/collegeSupportPrograms/charlotte-latin.ts` | header comment; reword `verdict.checklist[4]` |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/overlays/work/{learning-support,college-support}.<lang>.json` ×9 | splice (Phase 2) |
| `src/data/overlays/{learning-support,college-support}.<lang>.json` ×9 | rebuilt (Phase 2) |
| `.claude/plans/latinlearning.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run build`: **exits 1 on `check:live` only**, limited to the 1 retired
      college-support stamp × 9 locales. Each check chained after it must pass when run
      separately: `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`,
      `check:spans`, `check:news`, `check:photos`. Also run `check:seo` and `check:schema`.
- [ ] **Row count:** a node one-liner over the `services` block prints
      `{ IH: 6, IH_FEE: 5, REQUIRED: 3, RF: 1, NS: 10 }`.
- [ ] **Quote check:** extract every `“…”` fragment from the new data file and confirm each
      appears **case-sensitively** in the research file. Before comparing:
  - in the research file, strip `> ` blockquote prefixes and `**`, and collapse whitespace;
  - in the fragment, reduce `[[504|X]]` to `X`;
  - ignore a single trailing `,` or `.` just inside the closing quote.

  Pass is 0 misses.
- [ ] **Negative greps on the new file:** 0 hits for `Edwards`, `Sigmon`, `Stokes`, `Shoup`,
      `Jacobs`, `Greathouse`, `Asinger`, `Vergakis`, `Kilby`, `Claytor`, `Orton`, `mailto`,
      `@`.
- [ ] **No `email` field** anywhere in `charlotte-latin.ts`.
- [ ] **Browser check (required).** Run `npx vite preview` and drive real Chrome with
      Playwright (`channel: 'chrome'`, `domcontentloaded`, **not** `networkidle`), with
      **every `<details>` forced open**, on `/school/charlotte-latin/`. Confirm:
  - Learning Support renders six cards in order, with no kickers and no Compare button.
  - Navy and gold section colours, with gold only on rules and badges. Dark-theme ink is
    readable.
  - Four tiles: `1985`, `3 years`, `50%`, `3`.
  - **NOT STATED chips:** 10 in Services and 3 in the therapy strip, so 13 data chips
    (count legend samples separately). No blank code cells.
  - The `504` term renders as an `<abbr>` with its glossary definition.
  - The Speech, Motor and Gifted filters show their NS verdicts.
  - Testing has 6 entries, and none is WPPSI, WISC or ISEE.
  - Staff shows 4 rows, no mailto links and no scroll region, plus the director note.
  - Ask the School has 14 questions and "October 26, 2026". Check `ask.headline` with the
    card **closed**.
  - **College Support → Whole Class:**
    - the "See Learning Support & Student Services →" link is present and scrolls to the
      section;
    - the reworded checklist question renders.
  - The other five schools' learning-support pages are unchanged: rendered rows 23 / 25 /
    27 / 24 / 24 for HG / Cannon / DD / CCD / CCHS.
  - Overflow is 0 at 1280 light, 1280 dark and 390 light.
  - `npm run audit:mobile -- --only charlotte-latin`: 0 overflow, 0 broken cards.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**: `check:live` green, `check:runtime` resolves all nine.
- [ ] The splice reports **0 learning-support drops** and exactly **1 college-support
      retirement**.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted.
- [ ] `check_figures.py --topic learning-support` and `--topic college-support` ×9: no new
      findings versus `main`.
- [ ] `check:fr`, `check:bidi`, `check:fa`, `check:hi`, `check:script`, `check:dates`,
      `check:money`, `check:moneytext`, `check:currency`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: findings limited to
      the splice growth and the one College Support swap.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a `main` baseline: no new
      hits. Triage every role label and row name.
- [ ] **Browser:** `es`, `hi`, `fa` and `ar` at 1280 (`?lang=<code>`), every card open, on
      `/school/charlotte-latin/`. Check:
  - 0 English sentences in Learning Support or in the edited College Support question;
  - `$275` localized at render (`275 US$` in es);
  - the `504` abbr works;
  - in `fa`/`ar`, **no range draws reversed** (glyph-x scan of `3–5`, `2–4`, `5–11`,
    `6-7`, `K–12`, `TK–12`).
- [ ] `npm run audit:mobile -- --only charlotte-latin --lang <code>` at 320px ×9.
- [ ] `npm run audit:moneyrender` (needs build + preview): no raw `$<digit>` in es/fr
      outside the Latest News section.

## Risks

| Risk | Mitigation |
|---|---|
| The 2023 handbook is read as current policy | The lead muted line and Ask Q2 say it is the November 2023 handbook; the Wayback labels say so too |
| 2018-19 wording leaks in (Grades 4-5, "by the School", "personal counselors") | 2023 wins wherever both speak; HB1819 cited only for the US tutoring C– rule |
| A third-party or stale name leaks in | The negative-grep list in Phase 1 verification |
| Division heads read as learning-support staff | The staff note says why they appear and that the LR director is not named |
| Ingest sweeps up the untracked `providence-day/` | Step 2 inspects the diff and reverts everything outside Latin learning-support |
| A quote drifts in case, apostrophe or spacing | Copy from the research file; case-sensitive quote check |
| Gendered role translations | Role-referent forms; never inferred from names |

## Open questions

- **The fourth tile.** `3` nurses (live) could instead be `3` counselors (2023).
  **Default:** nurses, because the figure is live. Raise it at the Phase 1 stop.
- **Ask-card length.** 14 questions is one more than CCD's 13. **Default:** keep all 14;
  the user can trim at review.
- **Division heads' order.** **Default:** King, then Lower, Middle and Upper. The user can
  reorder at review.
