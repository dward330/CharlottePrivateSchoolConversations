---
name: catholicprofile
title: Refresh Charlotte Catholic from its 2026–27 School Profile — merge the 2024–26 matriculation list into the shipped 2023–25 list (200 institutions, 2023–2026, rescored buckets), Class of 2027 SAT/ACT ranges and decile/quintile GPA, 2026 AP results, Class of 2026 outcomes/scholarships/National Merit, 2026–27 counseling roster (~56:1), and add the four guide courses the catalog missed (199 courses, 26 AP); re-point profile citations in Sports, Arts and Clubs, 74 → 79 championships
status: english-done
phases: 2
created: 2026-11-04
branch: feat/catholic-profile-2627
prs: []
---

# Refresh Charlotte Catholic from its 2026–27 School Profile

## Goal

Charlotte Catholic High School (CCHS) published its **2026-2027 School Profile** on
2026-08-27. The school-profile page now links only this edition:

```
https://resources.finalsite.net/images/v1787830297/charlottecatholicorg/ihsker6gva69wmhq5agy/2026-2027CCHSSchoolProfile.pdf
```

The app still shows the 2025-26 edition's figures. This plan brings Charlotte Catholic's College
Support cards, its Compare cells, its Course Offerings catalog and the profile-sourced lines in
Sports, Arts and Clubs up to the 2026–27 edition. The user asked for four things, and each one
is covered:
- the **college list** (the user called it "acceptances"; the profile prints a *matriculation*
  list);
- the **course offerings**;
- the **updated testing data**;
- the **GPA percentiles** (the decile chart).

The work is done when:
- the Charlotte Catholic page and Compare show the 2026–27 figures in English;
- every figure traces to
  `source-material/college-support/charlotte-catholic/Charlotte Catholic - College Support - School Profile 2026-2027.md`;
- `npm run build` is green after Phase 2 in all ten locales.

## Context

### The source, already on disk (uncommitted)

[`Charlotte Catholic - College Support - School Profile 2026-2027.md`](../../source-material/college-support/charlotte-catholic/Charlotte%20Catholic%20-%20College%20Support%20-%20School%20Profile%202026-2027.md)
was written during planning. It holds:
- the full transcription;
- the 168-name list in printed order;
- the **merge probe** (spelling map, the 31 new names with resolver output, merged bucket
  counts);
- the profile's course list;
- the **four catalog entries the app missed**, found by re-extracting the guide.

**It is the authority for every figure below. Read it first.** The PDF has a clean text layer.
To re-check a figure, download it into a scratchpad directory and run `pdftotext -layout`.

**Unlike the Charlotte Christian and Davidson Day refreshes, the old PDF was NOT overwritten.**
The 2025-26 URL (`…/v1756128027/…/CCHSSchoolProfile25-26FinalforOnline.pdf`) still served 200
on 2026-11-04. Old-edition citations are therefore still accurate *for the old figures*. A
citation moves to the new PDF only where its figure moves, or where the new edition restates
the same fact (Decision D9).

### The delta, in brief

| Fact | App today (2025-26 edition) | 2026–27 edition |
|---|---|---|
| College list | Classes 2023–2025, 169 matriculations | Classes **2024–2026**, 168 → **merged 2023–2026, 200** |
| Buckets | 6/8 · 9/17 · 36/75 · 17/75 · 39/68 · 2/107 | **7/8 · 11/17 · 43/75 · 21/75 · 43/68 · 3/107** (probe; the gates decide) |
| Testing | Class of 2026: SAT 226 takers 1080–1360, ACT 144 takers 19–28 | Class of 2027: **SAT 290 takers 1070–1320, ACT 322 takers 20–27** |
| Deciles | Class of 2026, 4.38–4.63 … 2.25–3.14 | Class of 2027, **4.38–4.59 … 2.22–3.15** (full table in the source file) |
| AP | 2024-25: 345 students, 1,064 exams, 23 subjects, 94% 3+, 72% 4–5 | 2026: **393 students, 1,184 exams, 22 subjects, 94% 3+, 76% 4–5**; new: **69% of the Class of 2026 scored 3+ on at least one exam** |
| Outcomes | Class of 2025: 95% / 81% public / 19% private / 38% NC / 2% 2-yr | Class of 2026: **98% / 76% / 24% / 32% / 2%** |
| Scholarships | $17,242,184 (Class of 2025) | **$25,186,236** (Class of 2026) |
| National Merit | 2025: 2 Finalists, 11 Commended | 2026: **2 Winners, 7 Finalists, 11 Commended** |
| Service academies | 3 USNA appointments + Army ROTC at Cornell (2025) | **1 USNA + 1 USMA** (2026) |
| Counselors | Sovchen + Parks, Clementi, **Needham**, Fisher, Nobary; 324 seniors → ~54:1 | Sovchen + Clementi, Fisher, **McHugh**, Nobary, Parks; **336 seniors (Class of 2027) → ~56:1** |
| Quality points | +1 for AP and Honors | +1 for AP, Honors **and Dual Enrollment** |
| Dual enrollment | not on the profile | **CPCC, senior year, one DE course per semester, asynchronous** |
| 9th-grade advanced cap | "max 3 advanced classes" | **no longer printed** |
| Leadership | Telford = Head of School | **Michael M. Seeley, President; W. Kurt Telford, Principal** |
| Athletics | 74 titles / 65 runner-ups since 2000; "eight" Cups | **79 / 68; "nine" Cups** (the app keeps the NCHSAA's 10) |
| Clubs line | "over 50 club opportunities" | not reprinted |

### Files that carry the profile

**[`src/data/collegeSupportPrograms/charlotte-catholic.ts`](../../src/data/collegeSupportPrograms/charlotte-catholic.ts)**
(673 lines):
- Header comment: lines 1–34. Point 1 names "CLASSES OF 2023-2025".
- `PROFILE` const: line 38. `colleges` array and its comment: lines 49–222.
- `ncAdmissions`: lines 225–335. **Do not touch** it; it is government data.
- `transcript`: from line 336 (stats, `merit`, `depth`, `trust`, flags).
- `counseling`: lines 402–499.
- `outcomes`: lines 501–549.
- `edge`: lines 551–588.
- `wholeClass`: lines 590–646.
- `verdict`: lines 648–673.

**[`src/data/metricValues.ts`](../../src/data/metricValues.ts)**, Charlotte Catholic cells:
- `ACCEPTANCE_WINDOWS` `'(2023–2025)'` (line 139).
- Course rows:
  - course count `'195'` (166) and its qual (~177–181);
  - `'24 AP'` (221) and its qual (~232–236);
  - departments `'11'` (271) and its qual (~282–286), which says Dual Enrollment is "two CPCC
    courses taken off-campus".
- `ap-performance` `'94%'` (300), its sub `'(2024–25)'` (315) and its qual (~324).
- Bucket cells and their quals:
  - Ivy (354/365);
  - Ivy+ (404/415);
  - NU75 (454/465);
  - LAC75 (504/515);
  - P4 (554/565);
  - HBCU (822/833).
- `counselor-caseload` `'~54:1'` (870) and its qual (881).

**[`src/data/courseOfferings.ts`](../../src/data/courseOfferings.ts)**, `CHARLOTTE_CATHOLIC`:
- Starts at line 7198. Its comment (~7185–7197) says "195".
- The teaser is at 7205.
- The `title`s `'Advanced Placement Spanish V:'` / `'Advanced Placement Spanish VI:'` are at
  ~8323 / 8329.
- The three `Advanced Placement English 11/12` entries are in the English department.

**Other areas citing the old profile through a local `PROFILE` const:**
- [`sportsPrograms/charlotte-catholic.ts`](../../src/data/sportsPrograms/charlotte-catholic.ts):
  - the const at 36–37, cited at 106, 212, 324, 367, 392 and 421;
  - the stat `'74'` at 59;
  - the headline at 151;
  - "74-title" at ~194 and ~208.
- [`artsPrograms/charlotte-catholic.ts`](../../src/data/artsPrograms/charlotte-catholic.ts):
  the const at 33–34, cited at 116.
- [`clubsPrograms/charlotte-catholic.ts`](../../src/data/clubsPrograms/charlotte-catholic.ts):
  - the const at 28–29, cited at 90, 121 and 184;
  - the "over 50" comment at 11 and the note at ~81.
- `src/content/{college-support,sports,the-arts,student-clubs}/charlotte-catholic.json`
  also contain the old URL. **They are generated by the ingest pipeline, never hand-edit
  them.**

### The acceptance-list machinery

Read §3 of [`DATA-SCHEMA.md`](../docs/DATA-SCHEMA.md) and the "acceptance-list machinery"
section of [`christianprofile.md`](christianprofile.md). In brief:
- Entries are `{ name, cats }`. This list has **no `enrolling`/bold**, because every row is a
  matriculation.
- Ranks resolve via `rankLabelFor()` and URLs via `urlFor()`. **Never inline either.**
- Tag sources:
  - `nu75`/`lac75` come from `ranked75Bucket()`;
  - `p4`/`hbcu` come from `collegeMemberships.ts`;
  - `ivy` is the eight;
  - `ivyplus` follows tags already shipped elsewhere: Gaston Day tags Johns Hopkins.
- Counts are deduplicated institutions and must agree on **four surfaces**: the `buckets` row,
  any stat tile, the `metricValues.ts` cell, and the qual sentence.
- The gates are `check:ranks`, `check:collegeurls`, `check:buckets` and `check:memberships`.
  `check:buckets` also requires `ACCEPTANCE_WINDOWS` to agree with `collegesTitle`.
- Hard rule (memory `acceptance-list-rank-labels-hard-rule`): every college tagged
  `ivy`/`ivyplus`/`nu75`/`lac75` must carry a rank label. All 15 new top-75 tags already
  resolve.

### Why two phases

The plan rewrites research prose in the `college-support`, `metric-values`, `course-offerings`,
`sports`, `the-arts` and `student-clubs` overlay topics. Course `title` fields **are extracted**:
`course-offerings.es.json` holds `"Advanced Placement Spanish V:"`. So English ships first, and
Phase 2 covers the nine `PROSE_TRANSLATED` locales: es, bn, ht, te, fr, fa, it, hi, ar.
**There are no `src/locales/*.json` chrome changes.** College names, figures and `cats` are never
translated.

### Parallel work to expect

Other sessions are writing profile plans in this same tree. `hgprofile` (Not implemented)
also edits `ACCEPTANCE_WINDOWS`, bucket cells and the `college-support`/`metric-values`
overlays. **Branch from freshly pulled `main`.** If `hgprofile` merges first, rebase. Its
changes are in other schools' cells, so conflicts should be textual only. **Stage explicit
paths only.** The tree holds other sessions' untracked plan and source files (for example
`hgprofile.md`, Hickory Grove profile research), and they must not be swept in.

## Decisions

- **D1 — Merge, never replace** (standing user rule, 2026-11-04, memory
  `merge-acceptance-lists-never-replace`).
  - The list becomes the 2023–2025 list ∪ the 2024–2026 list = **200 institutions**.
  - **Every existing row stays**, including the 32 that the newer list does not reprint.
    Princeton, Dartmouth, Carnegie Mellon, William & Mary, Davidson, Hampton and Benedict are
    among them.
  - Set `collegesTitle: 'Every matriculation, 2023–2026'` and
    `ACCEPTANCE_WINDOWS['charlotte-catholic'] = '(2023–2026)'`.
  - `collegesTotal` becomes
    `'200 institutions · the profile publishes no enrollment counts per institution'`, or
    the count the gates confirm.
- **D2 — Existing spellings win for shared institutions.** The source file has a 12-row
  spelling map, for example `The Citadel` → keep `Citadel Military College of South Carolina`,
  and `Arizona State University` → keep `Arizona State University (Tempe)`. New rows use the
  2026-27 printing **verbatim**, e.g. `University of Wisconsin - La Crosse` and
  `Concordia University (Montreal)`.
  - Keep the array alphabetical as the current one is.
  - `Holy Cross College` is a different institution from `College of the Holy Cross`;
    `West Virginia State University` is different from `West Virginia University`. Both pairs
    keep two rows.
- **D3 — Expected buckets: Ivy 7/8 (Brown absent), Ivy+ 11/17, NU75 43/75, LAC75 21/75,
  P4 43/68 (44 tagged rows), HBCU 3/107.**
  - The gates decide. If a gate disagrees, investigate the master before changing a tag
    (DATA-SCHEMA: "a membership violation is a question, not a verdict").
  - Note texts:
    - Ivy: "absent Brown".
    - Ivy+: "the seven Ivies plus Duke, Georgetown, Johns Hopkins and Northwestern".
    - LAC75: keep the service-academy note.
    - P4: keep the Arizona State note, with 44 rows.
    - HBCU: "Hampton University, Benedict College and West Virginia State University".
- **D4 — Rank labels for unranked new names: confirm or leave null, never guess.**
  - Florida Atlantic, Sacred Heart, St. John Fisher and UMass Lowell are plausibly ranked
    National Universities (all >75, so no bucket moves).
  - Use the sourcing channels in
    `source-material/college-support/_shared/US News 2027 - Rank Labels.md`.
  - The auto-mode classifier has blocked headed-Chrome US News harvests (memory
    `latinprofile-shipped`), so the fallback is to **ask the user for screenshots**.
  - Add any confirmed rank to `collegeRankings.ts` **and** the Rank Labels doc. Anything
    unconfirmed stays unlabelled.
  - Likewise add homepages for the seven with no `urlFor()` match **only** when verified
    (memory `http-200-proves-no-homepage`: confirm name **and** city in a browser). A missing
    URL is a valid confirmed-null.
- **D5 — Testing: Class of 2027.**
  - SAT row `['—', '1070', '—', '1320', '—', '—']`; ACT row `['—', '20', '—', '27', '—', '—']`.
  - Hint: `'Class of 2027 · 290 SAT takers · 322 ACT takers'`.
  - **Keep `noPercentiles` unset**: the 25th/75th columns are genuine, as header-comment
    point 2 explains.
  - Add one sentence to the note: 290 + 322 takers against 336 seniors means most of the class
    sat both.
  - **Do not narrate the move from 1080–1360 as a decline.** The classes are different
    cohorts.
- **D6 — GPA: Class of 2027 deciles; quintiles by pairing**, as the card already does:
  - Top fifth 4.23–4.59;
  - Q2 3.98–4.22;
  - Q3 3.70–3.97;
  - Q4 3.35–3.69;
  - Bottom fifth 2.22–3.34.
  - The `gpaHint` becomes Class of 2027.
  - The `gpaNote` lists all ten new deciles, and its last sentence becomes "one quality point
    added for AP, Honors and Dual Enrollment".
  - Rewrite the `middle` items to the new 5th/6th deciles (3.83–3.97, 3.70–3.82) and the
    10th (2.22–3.15).
- **D7 — AP: the 2026 session.**
  - Transcript stats: `'1,184'` "AP exams taken in 2026 (393 students, grades 11–12)", `'22'`
    "AP subjects examined", `'94%'`, and `'76%'` "of AP scores were 4 or 5".
  - Add the new **69% of the Class of 2026 scored 3+ on at least one AP exam** in prose, in
    the transcript subhead or a verdict point. **Do not add a stat tile**: that would be a
    fifth tile, and the UX gate applies.
  - Rewrite the `verify` flag about year mismatch: AP is 2026, testing and deciles are Class
    of 2027, outcomes are Class of 2026.
  - Compare `ap-performance`: value `'94%'`, sub `'(2026)'`, comment
    `// 2026: 94% of 1,184 exams, 22 subjects, 393 students — AP exams are MANDATORY…`.
  - Compare qual: "94% of 1,184 AP exams scored 3 or above in 2026 (22 subjects, 393
    students); 76% scored 4 or 5. AP exams are mandatory in every AP course at CCHS, so this
    is a whole-cohort rate…"
- **D8 — Counseling.**
  - The roster becomes the 2026–27 profile's: Sovchen (Director), Clementi, Fisher, McHugh
    (`kmchugh@charlottecatholic.org`), Nobary, Parks, plus Registrar Cramer. Needham is
    removed: a roster is current state, not a list to merge.
  - Caseload: **336 ÷ 6 = 56 → `'~56:1'`**. Update the stat, the headline ("about 56 seniors
    each"), the `verify` flag arithmetic, the Compare cell, the comment and the qual (Class of
    2027).
  - The `~195` all-grades stat rests on the ~1,171 enrollment from the earlier research pass.
    That figure is unchanged by this profile (which prints no enrollment) and 1,171 ÷ 6 is
    still ~195, so leave that stat as is.
  - The verdict checklist item "about 54 seniors" becomes "about 56".
- **D9 — Citations.**
  - In `collegeSupportPrograms/charlotte-catholic.ts`:
    - rename the const to `PROFILE_2526`, add `PROFILE_2627` with the new URL, and keep
      `PROFILE_PAGE`;
    - every card whose figures now come from 2026–27 cites
      `'charlottecatholic.org — School Profile 2026-2027 (PDF)'`;
    - `outcomes` cites **both** editions, since the merged list's older half comes from
      2025-26.
  - In Sports, Arts and Clubs (user decision, 2026-11-04: "also refresh profile citations"):
    - add `PROFILE_2627`;
    - re-point every citation whose fact the new edition restates. That covers the Sports
      championship and parochial lines, the Arts Fine Arts Center/Dublin line, and the
      honor-society list in Clubs (line 184);
    - **keep `PROFILE_2526` only where the fact is no longer printed**: the Clubs "over 50
      club opportunities" quote (lines 11, ~81, 90, 121) stays cited to the 2025-26 edition,
      with "2025-26 profile" said in its text.
- **D10 — Athletics figures.**
  - The Sports stat at line 59 becomes `'79'`, "state championships since 2000".
  - The headline (151) becomes **"79 state championships since 2000 — and four more in 2026
    alone."** only if the card's own data still supports "four in 2026". **Check the
    `titleYears` rows first.** If it doesn't, write the 79 sentence without the second
    clause.
  - "74-title" at ~194/~208 becomes "79-title".
  - College Support `edge.subhead`, edge lever 2 and the verdict "Athletics" point become 79.
  - **The Cup count stays 10** (the NCHSAA all-time list, per the `wells-fargo-cup` skill); do
    not adopt the profile's "nine".
  - Do not add the 68 runner-ups anywhere new. No current home prints the runner-up count.
- **D11 — Outcomes / scholarships / recognition (Class of 2026).**
  - Outcome stats:
    - `'200'` "institutions matriculated to, Classes of 2023–2026";
    - `'98%'` "of the Class of 2026 went straight to post-secondary study";
    - `'$25,186,236'` "scholarships earned by the Class of 2026";
    - `'32%'` "of the Class of 2026 stayed in North Carolina".
  - Headline: "Where 200 colleges took CCHS graduates over four classes — and $25,186,236 in
    scholarships for one class."
  - `scholarships`: prepend the Class of 2026 lines:
    - "$25,186,236 — Class of 2026 total";
    - "2 National Merit Scholarship winners (2026)";
    - "7 National Merit Finalists (2026)";
    - "11 National Merit Commended Students (2026)";
    - "1 US Naval Academy and 1 US Military Academy appointment (2026)".
  - Keep the Class of 2025 lines as dated facts. **Never frame $25.2M vs $17.2M as growth**;
    two classes are not a trend the school states.
  - `transcript.merit`:
    - add the 2026 rows (2 Winners · 7 Finalists · 11 Commended; 1 USNA · 1 USMA);
    - keep the 2025 rows;
    - fix `meritNote`, since there are now two years and Winners are published, but there is
      still no Semifinalist line.
  - `counseling.reach` and `wholeClass.middle`: use the Class of 2026 figures (98%, 76% public,
    24% private, 32% NC).
  - The edge lever "three Naval Academy appointments in one class" becomes "Naval Academy
    appointments in consecutive classes — three in 2025, one in 2026 alongside a West Point
    appointment".
- **D12 — Policy lines.**
  - Trust "Weighted only" and the gpaNote: +1 for AP, Honors **and Dual Enrollment**.
  - Trust "Honors is rationed early" and the timeline grade-9 item: **drop "at most 3
    advanced classes"**, which is no longer printed. First check whether the 2026-27
    Curriculum Guide states it, and keep it only if the guide does (citing the guide).
  - Add the dual-enrollment fact (CPCC, senior year, one course per semester, asynchronous) as
    a grade-12 timeline item, or into `depth`. **Do not add a new card or row.**
  - SASP is now past tense ("began in 2025-26").
- **D13 — Course Offerings: the guide stays the catalog** (user decision, 2026-11-04).
  - The 2026-27 Curriculum Guide remains the catalog and the Compare basis. The profile's
    "Class of 2027" list is a four-year view of one class, not a catalog.
  - **Add the four guide entries the original extraction missed** (all in the guide, with
    descriptions; see the source file):
    - Academic Skills 9-10, 11-12 (508, 509), Interdisciplinary Studies;
    - Advanced Placement Computer Science Principles (146), Interdisciplinary Studies, `AP`;
    - Advanced Placement Microeconomics & Macroeconomics (953/954), Social Studies, `AP`;
    - Dual Enrollment: Art Appreciation (CPCC ART 111), Dual Enrollment.
  - **New totals: 199 courses, 26 AP, 43 Honors, 18 Advanced = 87 advanced entries.**
    Interdisciplinary 18 → 20, Social Studies 16 → 17, Dual Enrollment 2 → 3. Count each
    header as one entry, and say so.
  - **Complete the truncated titles from the guide's own second line.** This is a
    transcription fix, not adopting the profile's names:
    - 233 `Advanced Placement English 11: English Language and Composition`;
    - 243 `Advanced Placement English 12: English Literature and Composition`;
    - 244 `Advanced Placement English 12: English Language and Composition`;
    - 444 `Advanced Placement Spanish V: Language and Culture`;
    - 446 `Advanced Placement Spanish VI: Literature and Culture`.
    - Before writing them, check the PDF for the exact punctuation.
  - The **profile-only** courses (Ancient World History, Toning and Sculpting, Intro to
    Programming, Digital Photography, Symphonic Band, Honors Symphonic Band, Honors Concert
    Band) are **not added**. They stay in research only. The catalog has no flag mechanism, so
    no dev flag is added there.
  - Fix the departments qual: Dual Enrollment is **three** CPCC courses. Drop "taken
    off-campus": the guide says students "will meet at Charlotte Catholic" and the profile says
    "asynchronously". Write "taken through Central Piedmont Community College for college
    credit".
  - Update the AP-courses qual (26 AP; 87 advanced entries) and the course-count qual. The
    count is now by **header**, which changes the method sentence; keep the 243/244 note.
- **D14 — Leadership.** Telford is not named in `src/data` today (grep found nothing), so no
  app edit is needed. The President/Principal change is recorded in research only.

**Added 2026-11-04 after the user asked to "use any other data you think is updated relevant
data for what we show of the school today or our data schema has a scope of".** The whole
profile was swept against every Charlotte Catholic card and Compare row in `DATA-SCHEMA.md`.
D15–D17 are the further facts that land in an existing home; D18 records what was checked and
deliberately left alone, so `/implement` does not re-sweep it.

- **D15 — Arts: add `Symphonic Band` to the Ensembles card's "Band & percussion" track**
  (`artsPrograms/charlotte-catholic.ts` ~line 176). Two sources name it:
  - the 2026–27 profile lists it under Visual and Performing Arts;
  - the 2026-27 guide's own Percussion (372) description says percussionists "perform as
    members of the Symphonic Band in all concerts".

  It has no course code in the guide, so it joins Marching Band and Jazz Band as an ensemble
  that "operates alongside" the coded ones. Change `boardNote` to "Twelve ensembles carry
  course codes; Marching Band, Symphonic Band and Jazz Band operate alongside them, …" and add
  the profile to that card's `sources`.

  **The `'12'` stat and the Compare `ensembles` cell `'12 ensembles'` stay**, since both count
  coded ensembles, as their comments say. Do **not** add the profile's `Honors Symphonic Band`
  or `Honors Concert Band`: neither appears in the guide, and the profile alone cannot tell a
  current course from one the Class of 2027 took earlier. The Arts card has no `flags` field,
  so they stay in research only.
- **D16 — College Support `wholeClass.support`: add Academic Skills.** The list names Guided
  Academic Support, Options, Pathway and Study Hall, but not the course that comes before
  Guided Academic Support. Add, first in the list:
  `{ label: 'Academic Skills', text: 'A one-semester course (508 for grades 9–10, 509 for 11–12) in executive function and self-advocacy for Academic Achievement students — the step before Guided Academic Support.' }`.
  This matches the shipped Learning Support card's wording, and the guide is the citation.
- **D17 — SASP is in its second year.** The profile now writes "began in the 2025-2026 school
  year", and the guide already carries 10th-grade SASP courses (SASP English 10: Quest
  Seminar, SASP Theology 10). Change `transcript.depth` "Classical pathway" and any edge-lever
  mention from "new with a 9th-grade cohort in 2025-26" to "begun with a 9th-grade cohort in
  2025-26 and now running 10th-grade courses". Do not claim a count of students.
- **D18 — Checked, no change (do not re-sweep):**
  - **Learning Support:** it already covers Academic Skills, Guided Academic Support and
    Options from the guide and the school's own pages. It is official-site sourced, and the
    profile adds nothing new to it.
  - **Financial Aid & Tuition:** the profile prints no tuition or aid.
  - **Admissions, Global Exposure:** Charlotte Catholic has neither area. The Dublin parade
    stays in Arts, where it is unchanged.
  - **Clubs:**
    - `us-organizations` `'76'` is the directory count and stays;
    - the honor societies are the same ten;
    - only the "over 50" wording changes (D9).
  - **Sports:**
    - the conference ("Division 6A Southern Carolina Split 6/7A") and "Over 1,000" college
      athletes are unchanged, so only the citation moves;
    - the 68 runner-ups have no home (no new tile);
    - the per-sport `runnerUpYears` come from the association, not the profile.
  - **Graduation requirements and the grading scale:** unchanged from 2025-26. Only the DE
    quality point moves (D12).
  - **The `ncAdmissions` card and its six Compare rows:** a separate government source.
  - **Unused optional College Support fields** (`bucketsNote`, `caveat`, `supportNote`, a
    second score table): the profile has no data for them. AP Scholar tiers are still
    unpublished.

## Approvals needed

**None.** Every edit changes data inside existing cards, lists, stat tiles, flags, catalog
entries and Compare cells. That is data enrichment under the UX-design standard; the four
added courses are rows in an existing catalog. Two things **would** need approval, which is why
the plan puts them in prose instead:
- the 69% "at least one AP exam" figure as a new stat tile;
- the 68 runner-ups as a new tile.

## Source material

- **Written during planning (uncommitted):**
  `source-material/college-support/charlotte-catholic/Charlotte Catholic - College Support - School Profile 2026-2027.md`.
- **To append during `/implement`:**
  - A dated "Correction 2026-11-04" note at the top of
    `source-material/course-offerings/charlotte-catholic/Charlotte Catholic - Course Offerings - Curriculum Guide 2026-2027.md`.
    It lists the four missed entries with codes, says the true count is **199 / 26 AP / 87
    advanced**, and adds them to the department, AP and headline sections. It also fixes the
    Dual Enrollment section ("2 courses", "taken off-campus").
  - A one-line note in
    `source-material/sports/charlotte-catholic/Charlotte Catholic - Sports - Program Championships and College Commitments.md`:
    the 2026–27 profile gives **79** titles and **68** runner-ups since 2000, and "nine" Cups
    (the association's 10 stands).
  - **Do not edit** the 2025-26 College Support record. It is the older half's citation.
- `/implement` runs the **`ingest-source-material`** skill on the branch first.
  - The new file folds onto `outcomes` through the existing `/school profile/i` rule in
    `src/lib/metrics.ts` (~line 220), the same way the 2025-26 file does.
  - Afterwards run `npm run check:metrics` and `npm run schema`.
  - If an ⚠️ unmatched key appears, map it; **do not add a card**.
  - Watch for an ingest that reorders `schools.json` (memory
    `two-topic-ingest-reorders-manifest`). Keep only Charlotte Catholic's changes.

## Out of scope

- The `ncAdmissions` card: government data, refreshed by its own skill.
- Adding the profile-only courses to the catalog (D13).
- A new stat tile or Compare row for anything (69% one-exam rate, runner-ups, DE).
- Whole-school enrollment; the Accreditation/Memberships logos; the President/Principal titles.
- The Cup ledger and the Cup card.
- **Deploying. This plan never runs `npm run deploy`.**

## Steps

### Phase 1 — English

1. **Branch.**
   - `git checkout main && git pull`, then `git checkout -b feat/catholic-profile-2627`.
   - Confirm `git status --short` shows only other sessions' untracked files. Leave them
     unstaged.
2. **Ingest.**
   - Run the `ingest-source-material` skill for `college-support/charlotte-catholic`.
   - Then run `npm run check:metrics` and `npm run schema`.
   - Restore any unrelated `schools.json` reordering.
3. **Source-material follow-ups.** Append the course-offerings correction and the sports note
   (see *Source material*).
4. **Merge the college list** in `collegeSupportPrograms/charlotte-catholic.ts`.
   - Add the 31 new rows (the source file's table), alphabetically, with tags exactly as that
     table gives:
     - Columbia `['ivy','ivyplus','nu75']`;
     - Johns Hopkins `['ivyplus','nu75']`;
     - Stony Brook / UMass Amherst `['nu75']`;
     - Syracuse / Maryland / USC `['nu75','p4']`;
     - Iowa `['p4']`;
     - Kenyon / Rhodes / Swarthmore / Richmond `['lac75']`;
     - West Virginia State `['hbcu']`;
     - every other new row `[]`.
   - Remove nothing.
   - Rewrite the `colleges` comment: 200 institutions, the 2023–2025 and 2024–2026 lists merged
     per the standing rule, the spelling-map rule (D2), the Holy Cross and WV State pairs, and
     Arizona State being 44 P4 rows for 43 institutions.
   - Update header-comment point 1 to "CLASSES OF 2023-2025 and 2024-2026, merged".
5. **Ranks and URLs (D4).**
   - Try to confirm ranks for FAU, Sacred Heart, St. John Fisher and UMass Lowell, and Regional
     status for the rest. Ask the user for US News screenshots if a fetch is blocked.
   - Add confirmed rows to `src/data/collegeRankings.ts` + the Rank Labels doc, and verified
     homepages to `src/data/collegeUrls.ts` + `_shared/College Homepages 2026.md`.
   - Skip anything unconfirmed. Do not hold the PR for it.
6. **Rewrite the College Support prose and figures** per D5–D12, card by card:
   - `transcript`: stats, subhead, `merit`, `meritNote`, `depth`, `trust`, flags, sources;
     `depth` adds AP Computer Science Principles to the CS line and AP Micro & Macro to social
     studies.
   - `counseling`: headline, stats, roster, timeline, `reach`, flags, sources.
   - `outcomes`: headline, subhead, stats, buckets, `collegesTitle`, `collegesTotal`,
     scholarships, sources.
   - `edge`: subhead, levers; 79 titles, the academies line, 94% of 1,184.
   - `wholeClass`: score table, hint, note, GPA hint, quintiles, gpaNote, `middle`, sources.
   - `verdict`: points (AP 1,184; 200 matriculations; 79 titles), checklist ~56, sources.
   - Introduce `PROFILE_2627` and rename the old const to `PROFILE_2526` (D9).
   - Leave `ncAdmissions` untouched.
7. **Compare cells** in `src/data/metricValues.ts`:
   - `ACCEPTANCE_WINDOWS` → `'(2023–2026)'`.
   - The six bucket values, comments and quals (D3). For example, the Ivy qual becomes "7 of
     the 8 … for the Classes of 2023-2026 … Brown is absent".
   - `ap-performance` value/sub/comment/qual (D7).
   - `counselor-caseload` `'~56:1'` + comment + qual (D8).
   - Course count `'199'`, AP `'26 AP'`, the departments qual, and their comments/quals (D13).
8. **Course catalog** in `src/data/courseOfferings.ts` `CHARLOTTE_CATHOLIC`:
   - Insert the four entries in guide order within their departments, with `tag: 'AP'` on the
     two AP courses and the first-sentence descriptions from the guide. Read them from the PDF
     and fix the run-together words that `pdftotext` produces.
   - Complete the five truncated titles.
   - Update the comment (~7189) and the teaser: "199 courses across 11 departments plus dual
     enrollment — 26 AP, 43 Honors and 18 Advanced, with Visual & Performing Arts the largest
     department at 39."
9. **Sports, Arts, Clubs citations and figures** (D9, D10).
   - Add `PROFILE_2627` to each file and re-point the restated-fact citations.
   - Sports: 74 → 79 in the stat, the headline (after checking the `titleYears` rows) and both
     "74-title" lines.
   - Clubs: say "2025-26 profile" where the "over 50" figure is quoted, and keep its old
     citation.
   - Arts: add `Symphonic Band` to the band track and to `boardNote`, and add the profile to
     that card's sources (D15).
   - College Support: add Academic Skills to `wholeClass.support` (D16), and apply the SASP
     second-year wording (D17). These can go with step 6 if that is easier.
10. **Schema-doc rule check.** Earlier refreshes wrote the merge rule into
    `scripts/gen_data_schema.mjs` (ddprofile step 8). Confirm it is there.
    - If the catalog-extraction miss suggests a durable rule, add one to the generator:
      "re-census a guide by header, not by a single-code regex; multi-code headers and
      squeezed text layers are missed".
    - Then run `npm run schema`. If no doc change is warranted, say so in the PR.
11. **Verify Phase 1** (below), commit the English with explicit paths, and push.
    - Set the plan status to `english-done` and the INDEX row to **English shipped**.
    - **→ STOP. End the turn and ask the user to review the English** (Charlotte Catholic
      page: College Support, Course Offerings, Sports, Arts, Clubs; plus Compare).

### Phase 2 — Every other locale

Only after the user confirms the English. The scope is the nine `PROSE_TRANSLATED` locales
(es, bn, ht, te, fr, fa, it, hi, ar) across the overlay topics `college-support`,
`metric-values`, `course-offerings`, `sports`, `the-arts` and `student-clubs`. There are no
chrome-catalog keys. Follow `prose-translation-architecture.md` and each locale's rollout doc in
`.claude/docs/` for the mechanism. The traps are recorded there and in memory:
- figures are copied char-for-char (`$25,186,236`, `1,184`, `4.23–4.59`), never re-typed;
- no unit or separator changes (`check:sepdrift`);
- `hi`/`te` regroup only at render;
- `fa`/`ar` store no bidi isolates;
- college and course names that are identifiers stay Latin, per each locale's existing
  practice. Course titles like `Advanced Placement Spanish V: Language and Culture` are kept
  English in the shipped `es` overlay; follow the existing per-locale choice.

1. **Re-extract with carry-over by English text.** `i18n_extract.mjs` has no carry-over, so
   follow the christianprofile method (memory `christianprofile-shipped`):
   - re-extract each topic to a throwaway `--lang xx --out <scratch>`;
   - carry every locale's existing `t` by matching English text;
   - translate only the misses.
2. **Translate the misses** for each of the nine locales: the new and changed prose, quals,
   titles, the four new course descriptions, and the sports, arts and clubs lines.
3. **Build the overlays** with `i18n_build_overlay.mjs` for every touched topic × locale.
4. **Verify Phase 2** (below), commit, open the PR with `--body-file`, squash-merge, pull
   `main`, and flip the INDEX row to **Implemented** with the PR link. **Do not deploy.** End
   with "merged — ready to deploy whenever you want it."

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/charlotte-catholic/Charlotte Catholic - College Support - School Profile 2026-2027.md` | new (written at planning) |
| `source-material/course-offerings/charlotte-catholic/Charlotte Catholic - Course Offerings - Curriculum Guide 2026-2027.md` | correction note + four entries |
| `source-material/sports/charlotte-catholic/Charlotte Catholic - Sports - Program Championships and College Commitments.md` | one-line 2026–27 note |
| `src/data/collegeSupportPrograms/charlotte-catholic.ts` | merged list, every card's figures/prose, citations |
| `src/data/metricValues.ts` | window, six buckets, AP, caseload, three course cells + quals |
| `src/data/courseOfferings.ts` | four entries, five titles, teaser, comment |
| `src/data/sportsPrograms/charlotte-catholic.ts` | 74 → 79, citations |
| `src/data/artsPrograms/charlotte-catholic.ts` | citation; Symphonic Band in the ensembles board (D15) |
| `src/data/clubsPrograms/charlotte-catholic.ts` | citations, "2025-26 profile" wording |
| `src/data/collegeRankings.ts`, `src/data/collegeUrls.ts` + their `_shared/*.md` companions | only confirmed rows (D4) |
| `src/data/schools.json`, `src/content/**/charlotte-catholic.json`, `.claude/docs/**` | regenerated by ingest/schema, never hand-edited |
| `scripts/gen_data_schema.mjs` | only if step 10 warrants it |
| `src/data/overlays/**` (Phase 2) | six topics × nine locales |
| `.claude/plans/catholicprofile.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory: trust `tsc -b`, not `--noEmit`).
- [ ] `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`: clean.
  - Bucket counts are 7/8 · 11/17 · 43/75 · 21/75 · 43/68 · 3/107, or a gate-explained
    difference.
  - The window `(2023–2026)` matches `collegesTitle`.
- [ ] Count the merged `colleges` rows: **200** (169 existing + 31 new).
  - Every 2025-26 name is still present: diff against `git show main:src/data/collegeSupportPrograms/charlotte-catholic.ts`.
- [ ] Count `CHARLOTTE_CATHOLIC` course entries: **199**. AP tags: **26**.
- [ ] `npm run check:metrics`, `npm run schema && npm run check:schema`: clean.
- [ ] `npm run build`: green. Expect `check:live`/`check:runtime` to report the changed English
  as untranslated **in other locales only**; that is Phase 2's job and must not fail the build.
- [ ] **Browser check** (`npm run build && npx vite preview`, then `/school/charlotte-catholic`
  with every `<details>` open):
  - College Support shows the 1,184 / 22 / 94% / 76% tiles, the Class of 2027 SAT 1070–1320
    and ACT 20–27 row, the five new quintiles, ~56:1 and the new roster with McHugh, and the
    200-row list. Filtering Ivy shows 7 and HBCU shows 3.
  - Course Offerings shows 199 / 26 AP and the four new entries.
  - Sports shows 79.
  - Arts lists Symphonic Band under Band & percussion while the stat still reads 12.
  - College Support's academic-support list opens with Academic Skills.
  - Compare: the Charlotte Catholic cells for the six buckets show `(2023–2026)`, AP 94%
    `(2026)`, ~56:1, 199 and 26 AP.
- [ ] `npm run audit:mobile` at 320 px, since the list grew by 31 rows.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: every stamp resolves and gate 3 is clean.
- [ ] `npm run check:chrome`: clean (no new keys expected).
- [ ] Per touched topic and locale, `python3 scripts/check_figures.py --topic <t> --lang <l>`
  and `npm run check:sepdrift -- --lang <l>`: clean.
- [ ] `npm run check:fr`, `npm run check:dates`, `npm run check:moneytext`: clean.
- [ ] `node scripts/check_work_integrity.mjs`: only the foreign-script result matters after a
  re-extract.
- [ ] `npm run build`: green.
- [ ] Browser spot-check of `/school/charlotte-catholic?lang=es` and `?lang=fa` with panels open.
  `$25,186,236` should render localized in tiles and verbatim in prose, and no English
  sentences should remain in table cells or chips.

## Risks

| Risk | Mitigation |
|---|---|
| A spelling variant is added as a second row, inflating counts | Use the 12-row spelling map; gates count institutions; spot-check that `200` matches the source file's probe |
| Treating the profile's course list as a catalog silently drops SASP/Options courses | D13: guide stays the catalog; only the four guide-verified entries are added |
| `pdftotext` run-together words leak into descriptions | Read the four descriptions against the PDF render, not the text layer |
| Conflict with `hgprofile` in `metricValues.ts` / overlays | Branch from fresh `main`; rebase; cells are per-school |
| Sweeping another session's untracked files into the commit | Explicit paths only; `git status --short` before each commit |
| "Four more in 2026" no longer matches 79 | D10: check `titleYears` before keeping the clause |

## Open questions

- Ranks for FAU, Sacred Heart, St. John Fisher and UMass Lowell. **Owner:** implementer → user
  screenshots. **Default:** leave unlabelled and ship.
- Whether "max 3 advanced classes in 9th grade" is still policy. **Default:** keep it only if
  the 2026-27 guide states it, otherwise drop it.

## Implementation notes

### Phase 1 (English), 2026-11-05

Built as planned on `feat/catholic-profile-2627`. Results: 200 rows (169 + 31, none dropped);
tags Ivy 7, Ivy+ 11, NU75 43, LAC75 21, P4 44 rows / 43 institutions, HBCU 3, all agreeing
with the four gates. The catalog has 199 entries: 26 AP, 43 Honors, 18 Advanced, 3 DE.

Deviations and additions:
- **D4: no rank or URL rows were added.** I applied the open-question default: the four
  plausibly ranked names (FAU, Sacred Heart, St. John Fisher, UMass Lowell) and the seven with no
  homepage stay unlabelled/unlinked until they are confirmed. `check:collegeurls` counts them as
  plain text.
- **D12: the 9th-grade "at most 3 advanced classes" line was dropped.** The 2026-27 guide does
  not state it either (searched with and without whitespace). The DE fact went in as a fifth
  grade-12 timeline item.
- **Counseling headline corrected** from "Six counselors and a director" to "A director and
  five counselors". The roster always had six people in total, and the ÷6 already counted the
  director.
- **Outcomes got a `verify` flag recording the merge** (169 + 168 → 200, 137 shared), so the
  bookkeeping stays dev-only rather than going into the subhead.
- **Clubs: the 100% community-service tile moved to the 2026-27 citation.** The plan grouped
  it with the "over 50" lines, but the new edition restates it. Only the "over 50" flag, its
  card's source list and the file comment still name 2025-26.
- **Arts and the Compare arts qual: "195 courses" → "199"** in four Arts prose/comment spots and
  in the `arts-advanced` qual. The browser sweep found these, and the plan had not listed them.
- **Compare `ensembles` comment and qual now name Symphonic Band** alongside Marching and Jazz
  Band. The value `12 ensembles` is unchanged.
- **Schema doc:** added the census-by-header rule to the Course offerings section of
  `gen_data_schema.mjs`. The merge rule was already there.

Verification: `tsc -b` clean; ranks/collegeurls/buckets/memberships/metrics/schema clean.
`npm run build` stops at `check:live` alone, with 82 stale stamps per locale, all in the six
topics this plan edits (college-support 51, metric-values 21, course-offerings 5, sports 3,
the-arts 1, student-clubs 1). That is Phase 2's work. The rest of the chain (chrome, runtime,
moneytext, dates, spans, news, photos) passes when run separately. Checked in headed Chrome with
every `<details>` open: the page and Compare (`?schools=charlotte-catholic`) show every new
figure, and no stale one remains. `audit:mobile --only charlotte-catholic`: no overflow at
320/360/390 px.

Found during the build and deliberately left out of the diff:
- the catalog's **AP European History** description is a theology course's text ("begins with
  a brief orientation to philosophy and logic…");
- `financialAidReports.ts` still cites the Class of 2025's $17,242,184 as a dated aside.
