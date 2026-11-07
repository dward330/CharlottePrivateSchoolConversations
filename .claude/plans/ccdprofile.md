---
name: ccdprofile
title: Refresh Charlotte Country Day from its 2026–27 School Profile and the final 2023–2026 acceptance list — 43 new rows (Harvard, Caltech, Johns Hopkins, Northwestern, Swarthmore …) merged into the shipped 320 with the bold corrected to the final edition (Yale was never enrolling), May 2026 AP (589 exams, 96% 3+, 87% 4–5, 4.2 average), Class of 2027 GPA medians plus the restored middle-50% SAT 1170–1400 / ACT 26–31, 26 AP + 28 Honors, 26 IB seniors, 4 Class of 2027 Semifinalists, the new counseling office (Tate / Odum / Dickson, 536 Upper Schoolers, 137 seniors, ~27:1), $9.4M aid to 20%, and 13 / 60 college athletes
status: english-done
phases: 2
created: 2026-11-07
branch: feat/ccd-profile-2627
prs: []
---

# Refresh Charlotte Country Day from its 2026–27 School Profile

## Goal

Charlotte Country Day published its **2026–27 School Profile** on 2026-09-23 and announced
it on 2026-10-21 ("A Story in Two Pages"). With it the school re-issued its **2023–2026
College Acceptances** list in a final edition that is 41 institutions longer than the May
edition the app was built from. The user gave the profile's URL and asked for everything we
show today to be brought up to date.

The app's College Support cards still carry the **2025–26 edition's** figures (2025 AP,
Class of 2025 quintiles, Class of 2024 SAT/ACT, Catherine Odum as Director, 548 Upper
Schoolers) and the May list (320 rows). This plan brings the six College Support cards,
nine Compare cells and one Sports note up to the 2026–27 edition, merges the final
acceptance list under the standing merge rule, and fixes a bold marker the shipped list got
wrong.

The work is done when:
- the Charlotte Country Day page and Compare show the 2026–27 figures in English;
- every new figure traces to
  `source-material/college-support/charlotte-country-day/CCD - College Support - School Profile 2026-2027.md`;
- the acceptance list has **363** rows and exactly the final edition's **69** bold names
  carry `enrolling: true`;
- `npm run build` is green after Phase 2 in all ten locales.

## Context

### The source, already on disk (uncommitted)

`source-material/college-support/charlotte-country-day/CCD - College Support - School Profile 2026-2027.md`
was written during planning. It holds:
- a page-by-page transcription of the four-page profile (quick facts, course-load rules,
  grading scale, the rigorous-courses table, the AP table, the quintile table);
- the **final** 2023–2026 acceptance list, 361 names with bold read from the PDF's font
  runs (`**…**`);
- the diff against the shipped array: 43 new rows, 3 not reprinted, 10 spelling variants,
  and a five-row bold comparison across the May edition, the final edition and the app;
- bucket arithmetic computed with the checkers' own helpers;
- the URLs (S1–S6) for every claim.

**Read that file first. It is the authority for every figure below.** Its filename subtopic
"School Profile 2026-2027" folds onto the `outcomes` card under the `/school profile/i` rule
in `src/lib/metrics.ts` (line ~220), as the Providence Day, Catholic, Latin and Hickory Grove
profile files do, so ingest creates no new card.

The prior sources stay where they are: the 2025–26 and 2024–25 profiles are still live at
their versioned URLs, and the May list is still live at
`…/v1779992327/…/CollegeAcceptances2023-2026.pdf`. Their figures are recorded in
`CCD - College Support - Redesign Research 2026.md`, which is not edited.

### The delta, in brief

| Area | Shipped (2025–26 edition / May list) | 2026–27 edition / final list |
|---|---|---|
| AP session | 2025: 530 exams, 238 students, 93% 3+, 74% 4–5 | **2026: 589 exams, 230 students, 96% 3+, 87% 4–5, 4.2 average**, by discipline (Fine Arts the low end at 91%/61%) |
| AP / Honors courses | tile `25 AP + IB`; Compare `23 AP + 18 IB` from the 2025–26 catalogue | **26 AP, 28 Honors**, full IB; AP Physics 1 (replaces Honors Physics), AP Computer Science Principles and AP Art History new |
| Weighting | +0.5 Honors, +1.0 AP/IB | unchanged, plus **+1.0 for the Post-AP Organic Chemistry and Calc III**; non-Honors/AP/IB courses labelled "Regular/Standard" |
| AP-load buckets | 0–2 / 3–5 / 6+ | **0–2 / 3–5 / 6–8 / 9+ = 22 / 22 / 39 / 14** of 97 non-IB Class of 2027 seniors with 7+ semesters |
| Quintiles | Class of 2025 median GPA with median SAT and ACT per fifth | **Class of 2027 median GPA only: 4.516 · 4.259 · 3.961 · 3.655 · 3.012** (137 seniors, 120 represented) |
| SAT / ACT | Class of 2024 ranges; "the 2025–26 profile dropped them" | **middle 50% SAT 1170–1400, ACT 26–31**, printed beneath the Class of 2027 table, class and testers unlabelled |
| IB | "about 20 students a year" | **26 seniors in the Class of 2027**; 88% five-year pass (unchanged) |
| National Merit | Class of 2026: 5 Finalists, 13 Commended | unchanged, plus **Class of 2027: 4 Semifinalists** |
| Counseling office | Director Catherine Odum (profile) / Allison Slater Tate from July 2026 (web); registrar Donna Witman; 548 Upper Schoolers, 141 seniors, ~1:28 | **Tate Director, Odum Senior Associate, High / Tevlin / Woog, registrar Kim Dickson; 536 Upper Schoolers, 137 seniors → ~27:1** |
| Compare caseload | `~34:1` | **`~27:1`** (137 ÷ 5; the shipped cell contradicted the card's ~1:28) |
| Class of 2026 outcomes | 70 institutions, 23 states + DC + Canada, 203 applied-to | **24 states** + DC + Canada (profile); the rest unchanged |
| Acceptance list | 320 rows, 69 bold | **361 rows, 69 bold** → merged **363**; Harvard, Caltech, Johns Hopkins, Northwestern, Swarthmore, Pomona, Bowdoin, Oxford, Cambridge, McGill … |
| Bold | Lafayette, Northeastern, Yale marked | **Lafayette and Northeastern lose bold; Central Piedmont and Wesleyan gain it; Yale was never bold** |
| Buckets | 7/8 · 13/17 · 71/75 · 44/75 · 61/68 · 18/107 | **8/8 · 17/17 · 76 (see D5) · 50/75 · 63/68 · 19/107** |
| Faculty | 82% advanced degrees | unchanged; **83 staff, 100% in annual PD** |
| Financial aid | Compare `aid-awarded` null ("four conflicting undated totals"), `pct-aid` ~20% undated | **20% receiving aid, $9.4M**, from the profile |
| College athletes | "roughly 15 seniors per year" | **13 in the Class of 2026, 60 across the last four classes** |

### Files that carry the profile

**[`src/data/collegeSupportPrograms/charlotte-country-day.ts`](../../src/data/collegeSupportPrograms/charlotte-country-day.ts)**
(870 lines):
- Header comment, lines 1–23: "chiefly the 2025–26 and 2024–25 School Profile PDFs"; the
  69-of-70 bold-recovery note.
- `colleges` and its comment, lines 27–352 (320 rows, 69 `enrolling: true`).
- Consts, lines 354–363: `PROFILE_2526`, `PROFILE_2425`, `ACCEPTANCES` (the May URL),
  `COUNSELING`, `CLASS_2026`, `ERP`.
- `ncAdmissions`, lines 377–483. **Do not touch it**: it is government data.
- `transcript`, 484–552: headline, subhead, stats, `merit` (495), `meritNote`, `depth`,
  `trust`, flags, sources.
- `counseling`, 554–655: headline, subhead, stats, roster, timeline, mechanics, `reach`,
  flags, sources.
- `outcomes`, 657–695: headline, subhead, stats, `buckets`, `collegesTitle`,
  `collegesTotal`, scholarships, flags (empty), sources.
- `edge`, 697–736: two levers, notes, sources.
- `wholeClass`, 738–821: `scoreTables` (743), `gpaHint`, `quintiles` (769), `gpaNote`,
  support, `middle`, flags, sources.
- `verdict`, 823–869: headline, subhead, points, checklist, sources.

**[`src/data/metricValues.ts`](../../src/data/metricValues.ts)**, Charlotte Country Day
cells (line numbers from 2026-11-07):
- `sat-scores`: value `'1155–1385'` (319), sub `'(Class of 2024)'` (332), `scores` (344) and
  qual (352). `act-scores`: `'24–31'` (374), sub (387), `scores` (399), qual (403).
- `ap-performance`: `'93%'` (418), sub `'(2025)'` (433), qual (450). `ap-top-scores`:
  `'74%'` (467), sub (478), qual (486).
- Six bucket cells with quals (505–776); `ACCEPTANCE_WINDOWS` `'(2023–2026)'` (149) stays.
- `counselor-caseload`: `'~34:1'` (1021), qual (1042).
- `pct-aid` CCD `'~20%'` and its qual "the school does not date this figure";
  `aid-awarded` CCD `null` (line 1370) with the row `note` saying Country Day's totals
  conflict.
- The Course Offerings cells (`119`, `23 AP + 18 IB`, `9`) stay (D12).

**[`src/data/sportsPrograms/charlotte-country-day.ts`](../../src/data/sportsPrograms/charlotte-country-day.ts)**:
the `pipeline` card's `subhead` (line 224) says "roughly 15 seniors committing per year".

**Masters:** `src/data/collegeUrls.ts` + `source-material/college-support/_shared/College Homepages 2026.md`
(homepages); `src/data/collegeRankings.ts` (ranks; every added college that has a US News
rank already resolves); `src/data/collegeMemberships.ts` (Claflin and Cincinnati already
resolve).

`src/content/**/charlotte-country-day.json`, `src/data/schools.json` and `.claude/docs/**`
are regenerated by the ingest pipeline. **Never hand-edit them.**

### The acceptance-list machinery

Read §3 of [`DATA-SCHEMA.md`](../docs/DATA-SCHEMA.md) (the merge rule, the campus rule, the
four surfaces a bucket count lives on) and the "acceptance-list machinery" section of
[`catholicprofile.md`](catholicprofile.md). In brief: rows are `{ name, cats, enrolling? }`;
ranks resolve via `rankLabelFor()` and homepages via `urlFor()`, never inline; bucket counts
are deduplicated institutions and must agree on the `buckets` row, the Compare cell and the
qual; the gates are `check:ranks`, `check:collegeurls`, `check:buckets`, `check:memberships`
and, for the SAT/ACT rows, `check:scores` (which requires the sub to read `(Class of YYYY)`
and every figure and the class year to appear verbatim in the card file).

### Why two phases

The plan rewrites research prose in the `college-support`, `metric-values` and `sports`
overlay topics. English ships first. Phase 2 covers the nine `PROSE_TRANSLATED` locales from
`src/lib/i18n.ts`: es, bn, ht, te, fr, fa, it, hi, ar. **There are no `src/locales/*.json`
chrome changes.** College names, figures and `cats` are never translated.

### Parallel work to expect

`pdprofile` (Providence Day, same kind of refresh) is planned and unimplemented. Both plans
touch `src/data/metricValues.ts` and both add the same schema-doc rule (D14). Whichever
lands second rebases and keeps the rule once. Branch from freshly pulled `main`, stage
explicit paths only, never `git stash` (memories `never-git-add-all-blindly`,
`never-git-stash-in-shared-tree`).

## Decisions

- **D1 — The 2026–27 profile is the authority** for every figure it prints. The live web
  pages stay the authority only for what it does not print: the timeline, the mechanics,
  the 150+ reps and the visit window, the 1,107 / 170 / 70 / $14.7M Class of 2026 figures,
  and the roster bios. Where the profile and the May Class of 2026 page disagree (24 vs 23
  states), the profile wins and a dev-only `verify` flag records the other figure.
- **D2 — Merge, never replace** (memory `merge-acceptance-lists-never-replace`).
  - Add the **43 rows** the research file lists, each in alphabetical position with
    `cats` tagged from the masters: `ivy` + `ivyplus` + `nu75` on Harvard; `ivyplus` + `nu75`
    on California Institute of Technology, Johns Hopkins and Northwestern (Northwestern
    also `p4`); `nu75` on Rutgers University (Newark) (Cannon precedent); `lac75` on
    Bowdoin, Claremont McKenna, Harvey Mudd, Pomona, Swarthmore and Vassar; `p4` on
    University of Cincinnati; `hbcu` on Claflin University; `cats: []` on the rest,
    including "Northeastern University (New York City)" (a campus row, as the Arizona State
    rule).
  - Remove nothing: Marymount Manhattan and Virginia Wesleyan stay although the final
    edition does not reprint them.
  - Keep the shipped spelling for the ten variant rows (`Indiana University`, `Pace
    University`, `University of the South (Sewanee)`, `Florida A&M University` …); the two
    names the PDF prints without a closing parenthesis are written in full.
  - The window stays **2023–2026** in `collegesTitle`, `ACCEPTANCE_WINDOWS` and the quals.
  - The total becomes **363**, and `collegesTotal` reads
    `'363 institutions · bold = enrolling a Class of 2026 student'`.
- **D3 — `enrolling` follows the final edition's bold, exactly 69 names.** Script it from
  the `**…**` lines of the research file, mapping the ten spelling variants onto the
  shipped rows, and assert 69 afterwards. The net change is: remove the marker from
  **Lafayette College, Northeastern University and Yale University**; add it to **Central
  Piedmont Community College and Wesleyan University**. Rewrite the `colleges` comment
  (lines 27–30) to say the list is the final 2023–2026 edition (361 printed, 363 merged),
  that bold was read from the PDF's font runs, and that the shipped Yale marker was a
  transcription slip the May edition's font data never supported. Replace the header
  comment's "69 names against the school's own stated count of 70" paragraph: both editions
  carry 69 bold names and the school's "70 institutions" tile is one more, which stays a
  dev-only `verify` flag on `outcomes` rather than a card sentence.
- **D4 — Citations.** Add `PROFILE_2627` (S1) and `ACCEPTANCES_FINAL` (S2); keep
  `ACCEPTANCES` renamed `ACCEPTANCES_MAY` only in the `colleges` comment (no source label
  cites it). Re-point every source label whose facts now come from 2026–27 to
  "charlottecountryday.org — 2026–27 School Profile (…)". Keep `PROFILE_2526` on
  `wholeClass.sources` (the Class of 2025 per-quintile medians quoted in `gpaNote`) and on
  `outcomes.sources` (the Class of 2025 regional split), and `PROFILE_2425` on `wholeClass`
  (the Class of 2024 section scores in the notes). Update the header comment to "chiefly the
  2026–27 School Profile PDF and the final 2023–2026 acceptance list".
- **D5 — Buckets.** Expect **8/8 · 17/17 · 50/75 · 63/68 · 19/107** and let
  `check:buckets` / `check:memberships` confirm. The NU75 count the helpers compute is
  **76**, because the rank master carries Rutgers University (Newark) as its own institution
  at National Rank #73 and ties put more than 75 institutions inside the cut. Ship the
  checker's count on all four surfaces, and write the qual as "76 institutions ranked in the
  top 75 of US News National Universities (ties put more than 75 inside that cut) appear on
  …"; raise it at the English review (open question below). Update the Ivy note to
  "— Harvard appears for the first time on the final 2023–2026 list; none enrolling for the
  Class of 2026" and the Ivy Plus note to "— all 17; Stanford and Duke enrolling". Every
  bucket qual in `metricValues.ts` moves with its count.
- **D6 — New homepages.** Confirm in a browser, then add to `collegeUrls.ts` and the
  companion `.md`: Batten University, Cal Poly, California Institute of the Arts, Claflin
  University (a new correctly spelled row; leave the existing "Clafin University" row),
  Oberlin Conservatory of Music, Ohio Northern University, Rider University, Rutgers
  University (Camden), Rutgers University (Newark), The Cooper Union for the Advancement of
  Science and Art, University of Cambridge, University of Leeds, University of Liverpool.
  Any that cannot be confirmed stays unlinked (`check:collegeurls` does not gate coverage).
- **D7 — Transcript (May 2026 AP, courses, rules).**
  - headline: "589 AP exams in 2026 at 96% scoring 3+ and 87% at 4 or 5 — an average score
    of 4.2 — and the school publishes those results discipline by discipline."
  - subhead: unchanged, except "names the ceiling course" stays true.
  - stats: `589` / "AP exams sat in May 2026 (230 students)"; `96%` / "scored 3+ · 87%
    earned 4s or 5s · 4.2 average"; `26 AP + IB` / "AP courses (28 Honors) plus a full IB
    Diploma Programme, 2026–27"; `Quintiles` unchanged.
  - `merit`: prepend `{ year: '2027', detail: '**4** Semifinalists — Finalists and
    Commended not yet announced' }`. `meritNote`: keep the trough sentence; the "September
    2025 post describes the Class of 2026" clause becomes a general statement that
    Semifinalists are named each autumn, which is why the 2026–27 profile already carries
    the Class of 2027.
  - `depth`: Sciences adds "**AP Physics 1** replaced Honors Physics in 2026–27 and is now
    the prerequisite for AP Physics C"; Computer science becomes "The ceiling is AP
    Computer Science A; **AP Computer Science Principles** joins in 2026–27 as a 10th-grade
    entry point, and there is still **no post-AP CS course**."
  - `trust[0]`: append "— and the 2026–27 edition extends the +1.0 to the post-AP Organic
    Chemistry and Calculus III." `trust[1]` ("No rank → a quintile table"): "… the 2025–26
    edition tied each fifth to a median SAT and ACT; the 2026–27 edition returns to GPA
    medians alone and prints a whole-class SAT/ACT middle 50% beside them." `trust[2]`:
    buckets become "0–2 / 3–5 / 6–8 / 9+ (Class of 2027: 22 / 22 / 39 / 14 of the 97 non-IB
    seniors with seven-plus semesters)". Add a fourth `trust` row, label "Standard means
    college-prep": every non-Honors/AP/IB course is labelled "Regular/Standard" on the
    transcript and STARS forms and the profile calls all courses college-prep in rigour; AP
    is closed to 9th graders, and 10th graders generally take only AP Human Geography and AP
    Computer Science Principles. A row in an existing list, not a new card.
  - The `gap` flag's "the 93%" becomes "the 96%". Add one dev-only `verify` flag: the
    profile's 26 AP is its own count (the rigorous-courses table prints 25 titles, with the
    two Government courses on one line) and the Course Offerings catalogue (2025–26) holds
    23; no 2026–27 catalogue is posted.
  - sources: `PROFILE_2627` first ("AP results by discipline, quintile table, weighting,
    course-load rules"), keep `PROFILE_2425` ("prior grading scale"), keep the IB page.
- **D8 — Counseling.**
  - headline: "Five full-time counselors for 536 Upper Schoolers — roughly 27 seniors each —
    with more than 100 years of combined admissions experience between them." subhead: the
    director change "landed in July 2026" (past tense) and the 2026–27 profile is the first
    edition to print the new office.
  - stats[0]: `~1:27` / "counselors to seniors (derived — 137 ÷ 5; the school publishes no
    ratio)".
  - roster: Tate's detail loses "effective 1 July 2026" in favour of "Director since July
    2026, after a national search"; Odum "now Senior Associate" stands; Tevlin's detail
    becomes "Joined between the 2024–25 and 2025–26 profiles. Plus registrar Kim Dickson
    (Donna Witman in 2025–26)." Emails unchanged; they match the profile.
  - `reach[2]`: unchanged (CEEB 340666, IB 0667 confirmed).
  - The `verify` flag: "Both ratios are derived (536 ÷ 5 and 137 ÷ 5) …" and add that the
    counseling page's intro says "four full-time college counselors" while the page and the
    profile both list five.
  - sources: add `PROFILE_2627` ("office roster, enrollment").
  - Compare `counselor-caseload`: value `'~27:1'`, comment `// COMPUTED — 137 Class of 2027
    seniors (2026–27 profile) over 5 counselors`, qual "About 27 seniors per college
    counselor: 137 seniors shared among five counselors, derived from the 2026–27 profile.
    A lower ratio means more counselor time per student."
- **D9 — Outcomes.**
  - headline: "… across 24 states, DC and Canada …" (profile). subhead: "~320" → "363
    institutions, with Harvard, Caltech, Johns Hopkins and Northwestern among the final
    edition's additions".
  - stats unchanged (70 / 170 / 32 / $14.7M).
  - `buckets` per D5; `collegesTotal` per D2.
  - flags: two dev-only `verify` flags — (a) the bold delta between the May and final
    editions and the Yale slip (D3), with the "70 institutions" tile vs 69 bold; (b) 24
    states (profile) vs 23 (Class of 2026 page, May 2026).
  - sources: `ACCEPTANCES_FINAL` first ("College Acceptances 2023–2026, final edition
    (PDF)"), `PROFILE_2627` ("Class of 2026 outcomes"), keep `CLASS_2026`, `PROFILE_2526`
    (regional split) and US News.
- **D10 — Edge.** Lever 1: "About 20 students a year take the full diploma" → "**26 seniors
  in the Class of 2027** take the full diploma from junior year, at an 88% five-year pass
  rate". Lever 2 item 1 is rewritten for the new edition: it still names the ceiling course
  in every discipline, states the weighting formula and discloses AP results by discipline
  (Fine Arts at 91%/61% the low end); the AP-load buckets grew to four; it dropped the
  per-fifth test medians but restored a whole-class SAT/ACT middle 50%. Item 2 adds "83
  teaching and administrative staff, 100% in professional development each year". Item 4
  adds "(19 HBCUs on the list, Claflin new)". sources: `PROFILE_2627` replaces
  `PROFILE_2526`.
- **D11 — Whole class: Class of 2027 quintiles, restored ranges.**
  - headline: "The quintile table is the honest answer for the middle of the class — the
    fourth fifth sits at a 3.655 median GPA, the fifth at 3.012 — and the whole-class
    middle 50% is a 1170–1400 SAT." subhead: add Harvard beside Princeton and MIT.
  - `scoreTables`: SAT title unchanged, hint "— Class of 2027 · middle 50% printed in the
    2026–27 profile beside the Class of 2027 GPA table"; rows: SAT total
    `['—','1170','—','1400','—','—']` only. Note: "The middle-50% endpoints are the 25th
    and 75th percentiles. Section scores were last published for the Class of 2024 (EBRW
    585–700, Math 590–690); the number of testers never. The 2025–26 edition had dropped
    the whole-class range for per-fifth medians; the 2026–27 edition restores it without
    naming the class." ACT: composite `['—','26','—','31','—','—']` only. Note: "English
    23–32 and Math 22–29 were last published for the Class of 2024, whose composite was
    24–31; the Class of 2015's was 26–31, so the floor is back where it was a decade ago."
  - `gpaHint`: "— the no-rank mechanism · Class of 2027 median weighted GPA (120 of 137
    seniors with seven-plus semesters at the school)".
  - `quintiles`: `4.516`, `4.259`, `3.961`, `3.655`, `3.012` with **no `detail`** (the type
    makes it optional).
  - `gpaNote`: all five are the school's figures; grades at Country Day only, through
    junior year, seven-plus semesters; the 2025–26 edition tied each fifth to a median SAT
    and ACT for the Class of 2025 (4.472/1470/33 down to 2.991/1110/24) and the 2026–27
    edition drops that pairing; keep the ten-year stretch sentence.
  - `middle[2]`: recount from the merged array — about **nineteen** arts and music
    institutions (CalArts, Cooper Union, Ringling, Oberlin Conservatory new) and about
    **twenty-one** international universities (Oxford, Cambridge, Imperial, UCL, McGill,
    Trinity College Dublin new). Count before typing.
  - flags[0] (the "dropped" gap) becomes: the 2026–27 edition restores a whole-class
    middle 50% but labels neither the class nor the number of testers, and drops the
    per-fifth medians.
  - sources: `PROFILE_2627` first; keep `PROFILE_2526` and `PROFILE_2425` as D4 says.
  - Compare `sat-scores` / `act-scores`: `values` `'1170–1400'` / `'26–31'`; `subs`
    `'(Class of 2027)'` both; `scores` `{ median: null, mean: null, mid50: '1170–1400' }` /
    `{ … mid50: '26–31' }`; quals: "Printed in the 2026–27 profile beneath the Class of 2027
    GPA table; the school names neither the class nor the number of testers." `check:scores`
    needs `1170`, `1400`, `26`, `31` and `Class of 2027` verbatim in the card file.
- **D12 — Course Offerings: no change.** The catalogue is the 2025–26 Course Catalogue (119
  lines, 23 AP + 18 IB); the profile names courses but describes none, and no 2026–27
  catalogue is posted. The D7 tile states 26 as the profile's count; the verify flag records
  the gap. A new catalogue is its own plan.
- **D13 — Verdict.**
  - headline: "… more usable context than almost any peer — and the 2026–27 edition restores
    the whole-class SAT and ACT ranges it had dropped." subhead unchanged.
  - points: 1 → Class of 2027 medians 4.516 → 3.012, with the per-fifth test medians gone
    and a 1170–1400 / 26–31 middle 50% beside the table; 2 → "589 exams at 96% scoring 3+
    and 87% at 4–5, up from 530 at 93%/74% a year earlier — published discipline by
    discipline, Fine Arts at 91%/61% rather than hidden"; 3 → 26 full-diploma seniors in
    the Class of 2027; 4 → the July 2026 change has happened: Allison Slater Tate leads,
    Catherine Odum as Senior Associate; 6 → 24 states.
  - checklist: item 1 becomes "Your 2026–27 profile prints a 1170–1400 SAT and 26–31 ACT
    middle 50% beside the Class of 2027 GPA table — which class and how many testers does
    that cover, and why did the per-fifth medians go?"; item 3 becomes "Harvard appears on
    the 2023–2026 list for the first time in the final edition, and still no Class of 2026
    student enrolled at an Ivy. How do you read that, and what does Ivy matriculation look
    like year over year?"; items 2, 4–7 unchanged.
  - sources: `PROFILE_2627`.
- **D14 — Schema-doc rule** (same text as `pdprofile` D19, once): "Read bold markers from
  the source's formatting — `<strong>`/`<b>` in HTML, the bold font face in a PDF
  (`pdftohtml -xml`) — never from a text-layer or markdown transcription, and record the
  bold count in the source file." Add it to the acceptance-list section of
  `scripts/gen_data_schema.mjs`, then `npm run schema`. If `pdprofile` has already landed
  it, skip. The Yale slip is this class of bug.
- **D15 — Financial aid (Compare only).** `aid-awarded` CCD: `'$9.4M'`, comment
  `// $9.4M to 20% of students — 2026–27 School Profile, undated within it`, qual "$9.4M in
  financial aid to about 20% of students, per the 2026–27 School Profile; the profile does
  not say which year the figure covers." Drop the "Country Day’s published totals conflict
  and are omitted" clause from the row `note`. `pct-aid` CCD qual: "Approximately 20% of the
  student body, per the 2026–27 School Profile ($9.4M); the profile does not date the
  figure." The Financial Aid deep-dive report (`financialAidReports.ts`) is left alone: its
  framing line quotes the Class of 2025 $13M as an example and its open question about 20%
  vs 21% still stands.
- **D16 — Sports.** `pipeline.subhead`: "The school reports roughly 15 seniors committing
  per year over the last five years — 13 in the Class of 2026 and 60 across the last four
  classes, per the 2026–27 profile." Add a `PROFILE_2627` const and a source entry on that
  card in the card's existing source shape. The funnel counts (51 / 28 / 9) are a roster
  tally over 2024–26, a different measure, and stay.
- **D17 — Deliberately unchanged.** Arts keeps "70+ performances" from the arts page (the
  profile's 50+ was already recorded as a discrepancy in the research file); Clubs keeps its
  ~45–50 organizations (the profile's "50+" is consistent); Global Exposure already carries
  the 2026–27 China and Rwanda trips; enrollment (1,746 / 16% / 22% / 7:1) and the 21-credit
  graduation requirements have no card (ddprofile2 precedent); `ncAdmissions` untouched.
- **D18 — Research bookkeeping is dev-only.** Every "the May page said", "the shipped marker
  was wrong", "the count the checker computes" note goes in a `kind: 'verify'` flag, never
  in prose (CLAUDE.md, user 2026-11-05).

## Approvals needed

None. Every change is data in an existing card, tile, table, list or Compare cell: no new
card, section, tile, row or metric key; no reorder; no component change. The fourth `trust`
row and the 2027 `merit` row are rows of existing lists.

## Source material

- **Written at planning (uncommitted):**
  `source-material/college-support/charlotte-country-day/CCD - College Support - School Profile 2026-2027.md`.
- **Updated at implement:** `source-material/college-support/_shared/College Homepages 2026.md`
  gets a row per confirmed homepage (D6).

## Out of scope

- A Course Offerings refresh (D12).
- The Financial Aid deep-dive report prose, Arts, Clubs, Admissions, Global Exposure,
  Learning Support, After School, Summer (D17).
- Providence Day: that is `pdprofile`.
- Deploying. `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull`, then `git checkout -b feat/ccd-profile-2627`.
   Run `git status --short`; other sessions' untracked files stay unstaged.
2. **Ingest.** Run the `ingest-source-material` skill for
   `college-support/charlotte-country-day`, then `npm run check:metrics` and
   `npm run schema`. If `schools.json` reorders unrelated topics, restore HEAD order
   (memory `two-topic-ingest-reorders-manifest`).
3. **Merge the list and fix the bold** in `collegeSupportPrograms/charlotte-country-day.ts`
   (D2, D3): add the 43 rows with their `cats`; rewrite every `enrolling` marker by script
   from the research file's `**…**` lines; assert **363** rows and **69** markers; diff the
   names against `git show main:…` — exactly 43 added, none removed. Update the `colleges`
   comment, the header comment, `collegesTotal` and the consts (D4).
4. **Homepages** (D6), then
   `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`
   and confirm the D5 counts; put the checker's counts on the `buckets` row, the six Compare
   cells and their quals.
5. **Rewrite the College Support cards** per D7–D11 and D13, card by card: `transcript`,
   `counseling`, `outcomes`, `edge`, `wholeClass`, `verdict`, each with its sources. Then
   grep the file for `530`, `238`, `93%`, `74%`, `25 AP`, `548`, `141 ÷`, `1:28`, `Witman`,
   `4.472`, `2.991`, `3.513`, `1155`, `1385`, `24–31`, `~320`, `320 institutions`,
   `absent Harvard`, `23 states`, `about 20 students`. Each remaining hit must be
   deliberate (the Class of 2025 medians in `gpaNote`, the Class of 2024 section scores in
   the table notes).
6. **Compare cells** in `src/data/metricValues.ts`: `sat-scores` / `act-scores` (D11),
   `ap-performance` → `'96%'` `(2026)` and `ap-top-scores` → `'87%'` `(2026)` with quals
   rewritten for 589 exams (D7), the six buckets (D5), `counselor-caseload` (D8),
   `aid-awarded` and `pct-aid` (D15). Run `npm run check:scores`.
7. **Sports** (D16).
8. **Schema-doc rule** (D14): `scripts/gen_data_schema.mjs`, then
   `npm run schema && npm run check:schema`.
9. **Verify Phase 1** (below). Commit with explicit paths, including the research file and
   the homepages companion; push and confirm the push landed (memory
   `git-push-silently-noop`). Set the plan status to `english-done` and the INDEX row to
   **English shipped**.
   **→ STOP. End the turn and ask the user to review the English.** Pages to review:
   Charlotte Country Day's College Support (all six cards, every `<details>` open), Sports
   (the recruiting funnel), and Compare › College Support and Financial Aid. Put the NU75
   "76 / 75" question to them in that message.

### Phase 2 — Every other locale

Only after that confirmation. Scope: the `college-support`, `metric-values` and `sports`
overlays for the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar).
Mechanism: [`prose-translation-architecture.md`](../docs/prose-translation-architecture.md);
register rules per locale in the `prose-translation-<lang>.md` docs and
`src/data/overlays/NOTES.md`.

1. **Re-extract with carry-over by English text**, extracting to a throwaway `--lang` first
   to read the exact unit diff (memories `gastondaycup-shipped`,
   `translation-maps-key-by-text`). College names, `cats`, figures and emails are not
   extracted; the new rows add no units.
2. **Translate the misses** for each of the nine locales: figures copied char-for-char
   (`1170–1400`, `4.516`, `$9.4M`, `589`, `96%`), never re-typed; lakh/crore regrouping is a
   render-time concern for `hi`/`te`, not a data edit; RTL isolates for `fa`/`ar` come from
   the render layer (memory `rtl-figure-range-reverses`).
3. **Build the overlays** with `i18n_build_overlay.mjs` for each touched topic × locale.
4. **Verify Phase 2** (below), commit, push, open the PR for both phases, merge with
   `gh pr merge --squash --delete-branch`, pull `main`, and flip the INDEX row to
   **Implemented** with the PR link. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/charlotte-country-day/CCD - College Support - School Profile 2026-2027.md` | new (written at planning) |
| `source-material/college-support/_shared/College Homepages 2026.md`, `src/data/collegeUrls.ts` | up to 13 confirmed homepages (D6) |
| `src/data/collegeSupportPrograms/charlotte-country-day.ts` | 43 rows, bold fix, figures, prose and citations on six cards |
| `src/data/metricValues.ts` | CCD cells: SAT, ACT, AP 3+, AP 4–5, six buckets, caseload, aid-awarded, pct-aid; `aid-awarded` row note |
| `src/data/sportsPrograms/charlotte-country-day.ts` | `pipeline.subhead` + citation |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | D14 rule; doc regenerated |
| `src/data/schools.json`, `src/content/**/charlotte-country-day.json`, `.claude/docs/**` | regenerated by ingest/schema |
| `src/data/overlays/**` (Phase 2) | three topics × nine locales |
| `.claude/plans/ccdprofile.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory: trust `tsc -b`).
- [ ] `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships && npm run check:scores`:
  clean. Buckets read 8/8 · 17/17 · 76 (or whatever the checker computes) · 50/75 · 63/68 ·
  19/107 on all four surfaces.
- [ ] `colleges` has **363** rows and **69** `enrolling: true`; against `main`, 43 names added
  and none removed. Spot-check: Yale, Lafayette and Northeastern are **not** enrolling;
  Central Piedmont and Wesleyan **are**; Harvard is present and not enrolling.
- [ ] `npm run check:metrics`, `npm run schema && npm run check:schema`: clean.
- [ ] `npm run build`: green; changed English shows as untranslated elsewhere, which is
  Phase 2's job and must not fail the build.
- [ ] **Browser check.** `npm run build && npx vite preview`, then `/school/charlotte-country-day`
  with every `<details>` open:
  - College Support: the 589 / 96% / 26 AP + IB / Quintiles tiles; the 2027 merit row; the
    fourth trust row; the SAT 1170–1400 and ACT 26–31 rows with their notes; five Class of
    2027 quintiles with no detail column; the 363-row list with Harvard, Caltech, Oxford and
    Cambridge rendering with their rank labels and links; bold on Central Piedmont and
    Wesleyan and not on Yale; the ~1:27 tile and Kim Dickson; the Tate/Odum roster.
  - Sports: the funnel subhead names 13 and 60.
  - Compare: SAT/ACT cells with `(Class of 2027)`, AP `96%` `(2026)` and `87%` `(2026)`,
    caseload `~27:1`, Ivy `8 / 8`, aid awarded `$9.4M`.
  - Production preview: no `verify` flag text appears.
- [ ] `npm run audit:mobile` (the list grew by 43 rows; the score tables shrank).

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: every stamp resolves; gate 3 clean.
- [ ] `npm run check:chrome`: clean (no new keys expected).
- [ ] Per touched topic and locale: `python3 scripts/check_figures.py --topic <t> --lang <l>`
  and `npm run check:sepdrift -- --lang <l>`: clean.
- [ ] `npm run check:digits` (compares against `main`): review the report for the new units.
- [ ] `npm run check:fr`, `npm run check:dates`, `npm run check:moneytext`: clean (`$9.4M`
  is a new money string in the metric-values overlay).
- [ ] `node scripts/check_work_integrity.mjs`: no wrong-script prose (memory: it always
  flags after a splice; verify by stamp).
- [ ] `npm run build`: green.
- [ ] Browser spot-check of `/school/charlotte-country-day?lang=es` and `?lang=fa` with every
  panel open: figures char-for-char, `1170–1400` and `26–31` reading left-to-right in
  Farsi, no English sentences in table cells, chips or source lines.

## Risks

| Risk | Mitigation |
|---|---|
| A bold-mapping slip leaves one of the 69 unmarked or marks a 70th | Script from the research file; assert 69; print any bold name that matched no row |
| Tagging the Northeastern (NYC) or Rutgers (Camden) rows into a bucket by eye | Tag from the masters; `check:buckets` and `check:memberships` gate both tags and counts |
| "76 / 75" reads as an error to a parent | D5 qual explains ties; raised at the English review; the user may choose to canonicalize Newark onto Rutgers instead |
| Mis-labelling the restored SAT/ACT range's class | D11 hint and qual say the profile names neither class nor testers; open question below |
| Re-typing the Class of 2024 section scores into the new tables | D11: the new tables carry one row each; the old sections live in the notes |
| Sweeping another session's files into the commit | Explicit paths; `git status --short` before each commit; no `git stash` |

## Open questions

- **Which class do the 1170–1400 / 26–31 ranges describe?** The profile does not say; they
  sit beneath the Class of 2027 heading. **Default:** label them Class of 2027 (hint, sub,
  qual all say the profile leaves the class unlabelled) and ask the user at the English
  review.
- **Print NU75 as "76 / 75"?** **Default:** ship the checker's count with the ties qual and
  ask at the English review. If the user prefers Newark folded into Rutgers, that is a
  `collegeMemberships.ts` alias change affecting Cannon too, and is its own follow-up.
- **Homepages that cannot be browser-confirmed.** **Default:** leave unlinked.

## Implementation notes

### Phase 1 (English) — 2026-11-07, branch `feat/ccd-profile-2627`

Deviations from the plan, each checked against the source rather than taken on trust:

- **Northeastern keeps its bold (D3 was wrong).** The research file's final-list
  transcription marks Northeastern University bold, while its comparison table and D3 said
  it lost bold. The final PDF's font run settles it: `ITCFranklinGothicStd-DmCd` (bold), as
  in the May edition. The plan's net change could not add up either (69 − 3 + 2 = 68, not
  69). So only **Lafayette and Yale** lose the marker and Central Piedmont and Wesleyan gain
  it. The `enrolling` set was checked name by name against all 69 bold runs in
  `pdftohtml -xml` and matched exactly. The research file's table row is corrected in
  place, and the D14 schema rule cites this case.
- **NU75 is 75 / 75, not 76.** `check:buckets` clamps a saturated count at the denominator
  by design (`Math.min(…, CUTOFF)`: ties put more than 75 inside the cut, and the repo prints
  `75 / 75`, never `77 / 75`, the way Cannon and Providence Day already do). That settles the
  open question, so it is not put to the user. The qual reads "75 of the top 75".
- **Homepages: 10 added, not 13.** Batten, Rutgers (Camden) and Rutgers (Newark) were
  already in the master. The ten new rows (Cal Poly, CalArts, Claflin, Oberlin
  Conservatory, Ohio Northern, Rider, Cooper Union, Cambridge, Leeds, Liverpool) were each
  confirmed by name in real Chrome through Playwright, because the Chrome extension was not
  connected. Oberlin Conservatory links to its section of oberlin.edu, since it has no
  separate domain. Marymount Manhattan and the Northeastern NYC campus stay unlinked, as
  before.
- **`middle[2]` counts: about eighteen** arts and music institutions (the fourteen
  previously named plus CalArts, Cooper Union, Ringling and Oberlin Conservatory), not the
  plan's "about nineteen"; **twenty-one** international universities, as planned.
- **Edge sources:** `PROFILE_2627` was added for IB, the faculty markers and AP by
  discipline, and `PROFILE_2526` was kept as "(memberships)". The 2026–27 profile does not
  print the ACCIS/NACAC/SACAC memberships, so replacing that citation outright would have
  mis-cited them.
- **Counseling verify flag:** the juniors-plus-seniors estimate moves 1:56 → 1:54 (2 × 27).
- **Trust row:** the 2026–27 table is titled "Notably Rigorous Courses by Discipline", so the
  quoted title was updated.
- **`check:spans` EXPECTED** was updated. Country Day now ties the Ivy (8/8), Ivy+ (17/17)
  and NU75 (75/75) leads; the checker reported this as a notice and asked for the update.
- **Ingest:** `build_docs.py college-support` also ingested Providence Day's School Profile
  2026-2027.md, which is on `main` but left for `pdprofile`. All non-CCD output was
  reverted, and only CCD's document was spliced into HEAD's `schools.json` (11-line diff,
  order kept).

Verification: `tsc -b` clean; `check:ranks`, `check:collegeurls`, `check:buckets`,
`check:memberships`, `check:scores`, `check:quals`, `check:schema`, `check:spans`,
`check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:news`,
`check:photos` clean; `check:metrics` shows only pre-existing advisories. `npm run build`
stops at `check:live` with **75 stale stamps per locale**, all in the rewritten English
(the catholicprofile/hgprofile precedent; Phase 2 clears them). Every step after it was run
by hand and passed. Real Chrome on the production preview: all six cards with every
`<details>` open show the new figures, 363 rows with 69 bold (bold on Northeastern,
Central Piedmont and Wesleyan, none on Yale or Lafayette), links and rank labels on
Harvard, Caltech, Oxford and Cambridge, five quintiles with no detail, and no verify-flag
text. Compare shows `1170–1400` / `26–31` over `(Class of 2027)`, 96% / 87%, `~27:1`, Ivy
`8 / 8`, and `$9.4M`. `audit:mobile` for Country Day: no broken card, no page overflow.
