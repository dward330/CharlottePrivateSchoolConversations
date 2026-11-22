---
name: consistency5
title: Fix the findings of the round-5 consistency rescan, and the tooling gaps round 4 exposed
status: implemented
phases: 2
created: 2026-11-22
branch: fix/consistency5
prs: [522]
closing_loop: consistency-self-scan
---

# Fix the round-5 consistency findings

## Goal

The rescan of `main` at `5d26847a` after consistency4 (PR #520) found 7 partial or regressed rows
and 72 new findings (79 rows before two merges): 44 A, 5 B, 18 C, 5 D. This plan fixes all of them
as the user ruled on 2026-11-22, plus the two rows round 4 held (CAN-T17 and CAR-T8, steps 5a and 5b), and closes four tooling gaps found on the way. Done means a
rescan of the merged `main` shows each ID resolved or held on a recorded ruling.

## Context

- **The worklist is the spec:** [`consistency5-data/findings.md`](consistency5-data/findings.md)
  (verified), with each row's quote, file:line, evidence and proposed fix in the linked
  `rescan5-*.md` row. Where they differ, findings.md wins, and this plan wins over both.
- **7 of the 79 were caused by round 4.** Each was a fix that reached one card and missed the text
  restating it, or new text with its own error. So step 8 greps for every changed value.
- **Precedents:** the `## Implementation notes` of `consistency.md`, `consistency2.md` and
  `consistency4.md` (attributing B rows, per-school chrome, the Phase 2 mechanism and its traps).
- **Per-school chrome, the pattern to copy:** `meritCollegeAwards?: boolean`
  (`src/data/collegeSupport.ts` ~L209), read in `src/components/CollegeSupport.tsx` ~L361 to pick
  a `cardLabels.*` key.
- **The camp catalog** renders `t('tables.grade')` as its filter label and `t('tables.grades')` as
  its column header (`src/components/SummerPrograms.tsx` ~L277 and ~L328). Other tables use those
  keys, so do not change their values.
- **The Arts ledger** already renders wherever `theatre.ledger` is non-empty (the component's
  `data.ledger.length > 0` branch). Gaston Day omits it on purpose today, with a header comment.
- **The checklist band list is wrong in two audits.** `scripts/audit_date_render.mjs` (~L83) and
  `scripts/audit_money_render.mjs` (~L66) pass a fixed `BANDS`, which names 6 of the 26 real keys,
  to `planVisits()` in `scripts/audit_scope.mjs` (~L590). The keys are
  `guide.bands[].key` in `src/data/admissionsPrograms/<slug>.ts`, which import under plain Node.
- **The doubled period** comes from `UNIT_SUFFIX` / `localizeUnits()` in `src/lib/format.ts`
  (~L259): es, fr and it map `wk` and `sem` to abbreviations that end in a period.

### Overlap with plan `allcommits` (not built)

`allcommits` was updated on 2026-11-22 at the user's request: it builds **after** this plan, has no
USCAA level, tag or tip, and keeps DD-U6 and Notre Dame as Power 4. Its first version rested on a
false premise: the college's own site names the Coast-To-Coast Athletic Conference and NCAA
Division III, never the USCAA (saved in Gaston Day's 2024-2026 commitments record). This plan
makes the row C2C / D3. `allcommits` also owns making R12 skip its new `Other` rows.

`implreview` (also not built) would change `/implement` step 5b. Follow the skill as it reads when
this plan runs.

## Decisions

- **Order:** A, then the seven Part 1 rows, then B, C and the ruled D rows.
- **Re-open before typing.** Every outside value is re-opened, or read from the committed record
  where the source refuses. A moved value is held and reported, never typed on judgment.
- **B rows pick no winner:** attributed prose, a dev-only verify flag, and an ask where the card
  has one. The wording is each worklist row's.
- **Three "only if it grows the card" rows stay text-only:** LAT-U1, GD-U1, and X4 at Charlotte
  Prep (label the four-day camp in the tier's detail, no tier of its own).
- **X2 is limited to what the saved brackets show** (step 5). Cup cards stay through 2025–26.
  Compare's Cup rows do not move.
- **HG-T1:** both Compare notes name Hickory Grove's summer 2023 basis. The values stay.
- **LAT-T11:** the ask names the open Acapella Club and asks about an auditioned group.
- **Both rule candidates are built** (step 7), each calibrated to zero on the fixed tree before it
  gates. If R12 cannot reach zero without an allowlist of schools, ship it as a report.

## Approvals needed

**None open. All given by the user on 2026-11-22, when asked at planning time.**

- **LAT-U14 (UX + chrome):** Latin's camp catalog reads "Ages" / "Age". Latin only.
- **CC-U6 (chrome):** "Ranked recruits, current cycle" → "Ranked recruits", all schools, ten catalogs.
- **GD-U2 (UX):** Gaston Day shows the Arts card's existing awards-ledger block for the first time.
- **Rulings:** PD-U12, PD-U13, LAT-U15 and DD-U3 as worded in the table. GD-U5: ask, do not merge.
- **Calls:** CAN-U1 (≥21), CAN-U4 ("15 Blumey finalists"), LAT-U9 (145 with its year, no rate).

Claude Design answered `list_projects` on 2026-11-22. `/implement` checks it again.

## Student names and fetching (hard rules)

- **No non-athlete student name** in data, records, the plan, a worklist, a commit, the PR, an
  agent brief or a reply (CLAUDE.md, Student-name standard). Blumey rows carry roles only. Put the
  rule in every agent's brief, and tell agents to print counts, never matched text, from any
  source that may hold names. Round 5's agents printed names into their own output three times.
- The ingest needs the local, gitignored `source-material/_name_redactions.json`. Never commit or
  print it.
- **Refused hosts, do not request:** blumenthalarts.org, charlottelatinsummer.com, issuu.com,
  k12.ncseaa.edu, on3.com, carmelchristian.org (503 on two pages, cause unknown). The two documents behind CAN-T17 and CAR-T8 were read on screen
  in the user's Chrome at the user's request and are saved in the records: do not fetch them again. No other agent string, mirror, archive or cache.
  Never `curl -L` blindly: read the Location header first.
- Never print or copy the API key in Charlotte Latin's camp-feed URL.

## Source material

Already written and uncommitted: **35 records** with `### Re-verification 2026-11-22 (plan
consistency5, …)` appends under `## Method` (the rescan's 30, plus planning's), and the folder
`.claude/plans/consistency5-data/`. Planning saved:

- fall 2026 NCISAA finals for Providence Day, Country Day and Latin (Sports records);
- Latin's Learning Resources pop-up, whole text (College Support record);
- Gaston Day's undated college list (College Support record);
- roles-only Blumey rows for Gaston Day and Latin (Arts records). The other schools' roles are
  in the worklist rows;
- Johnson & Wales Charlotte's conference (Gaston Day 2024-2026 commitments record);
- Providence Day's November 20 football final (Sports record);
- Cannon's 2026–27 Beyond the Bell Session 2 table (After School record) and Carmel's 2026–27
  high school course list (Course Offerings record).

The scratch copies the worklist cites may be gone. The committed records and worklist rows are
enough. Do not re-request a refused host to replace them.

## Out of scope

| id | why |
|---|---|
| S1–S10 | Settled rulings. |
| Deploy | The user's call, in the moment. |
| Old public copies of names, Claude Design archives, podcast audio | Separate decisions the user still holds. |

## Steps

### Phase 1 — English

**0. Branch without losing the staged research.** `git fetch`, then
`git switch -c fix/consistency5 origin/main` (the dirty records come along. Never stash, and if
the switch refuses, stop and report). `.claude/plans/INDEX.md` also holds another session's
uncommitted rows: commit only this plan's row, by staging HEAD's copy plus that row
(`git hash-object -w --stdin`, `git update-index --cacheinfo`). Never commit `allcommits.md` or
`implreview.md`.

**1. Commit the research.** Stage the records, `consistency5-data/` and this plan by explicit path.

**2. Design, then build, the three approved changes.** Check `list_projects` first. If it fails,
stop and ask the user to reconnect (`/design-login`). Project
`5da24575-40bf-4787-8934-0fadfc56059f`.

- **2a. LAT-U14.** Design in `Summer Programs Section.dc.html`. Add `agesNotGrades?: boolean` to
  the catalog type in `src/data/summerPrograms.ts`, set it in `src/data/summer/charlotte-latin.ts`,
  add `tables.age` / `tables.ages` to `src/locales/en.json`, and pick them in
  `src/components/SummerPrograms.tsx` for the filter label and the column header.
- **2b. CC-U6.** Design in `Sports Section Redesign.dc.html`. Change `sports.rankedRecruits` in
  `src/locales/en.json`. It is a sub-heading, so no card-link alias.
- **2c. GD-U2.** Design in `Arts Section Redesign.dc.html`. In
  `src/data/artsPrograms/gaston-day.ts` add the `theatre.ledger` rows for 2024, 2025 and 2026,
  roles only, rewrite the two sentences that say there is no record, and fix the header comment.

**3. The seven Part 1 rows.**

| id | fix |
|---|---|
| CCD-T21 | `src/data/clubClusters.ts`: add World Quest and Euro Challenge as school-reported rows, and fix the verdict if it no longer holds. |
| LAT-T11 | `src/data/artsPrograms/charlotte-latin.ts`: the ask names the open Acapella Club and asks whether an auditioned group exists. |
| COV-T15 | `src/data/metricValues.ts` ~L2208 and ~L2247, and the record: no strength-and-conditioning camp. |
| DD-T2 | `src/data/collegeSupportPrograms/davidson-day.ts` ~L819: the 20 seasons belong to the project. |
| HG-T1 | `src/data/metricValues.ts` ~L2098 and ~L2140 notes: "Hickory Grove’s figure is from summer 2023, the last schedule found." |
| HG-T5 | `src/data/admissionsPrograms/hickory-grove-christian.ts` ~L765 and ~L872: delete the $500 tile, and the action becomes "Pay in full by August 1". Array items move. |
| X4 | `src/data/summer/trinity-episcopal.ts` ~L1216: `daysPerWeek: 4`. `src/data/summer/charlotte-prep.ts` ~L338: "Rhythm & Beats (four days, $125 a day)". |

**4. Build the findings.** Every row below, from its linked worklist row plus the limit here.

| id | cat | school | section | merged | worklist row | limit on the fix |
|---|---|---|---|---|---|---|
| PD-U1 | A | Providence Day | College Support › HBCUs bucket, Compare `bucket-hbcu` |  | rescan5-pd-ccd-cannon.md:155 | Tag both colleges and add both to `HBCUS` (`src/data/collegeMemberships.ts`). 14 → 15 and 19 → 20, on the page and on Compare. Then step 7b. |
| PD-U2 | A | Providence Day | Sports › Winning Record matrix |  | rescan5-pd-ccd-cannon.md:156 |  |
| PD-U3 | A | Providence Day | Sports › Winning Record headline |  | rescan5-pd-ccd-cannon.md:157 |  |
| PD-U4 | A | Providence Day | College Support › acceptance list rank label |  | rescan5-pd-ccd-cannon.md:158 | An alias or name that resolves to the existing "Miami University" rank (`src/data/collegeRankings.ts`). Do not type a rank. Re-run `check:buckets`. |
| PD-U5 | A | Providence Day | After School › Coverage Map vs Summer Programs |  | rescan5-pd-ccd-cannon.md:159 |  |
| PD-U6 | A | Providence Day | Summer › two camp descriptions vs the grade column |  | rescan5-pd-ccd-cannon.md:160 |  |
| PD-U7 | A | Providence Day | Financial Aid › Beyond Tuition vs After School |  | rescan5-pd-ccd-cannon.md:161 |  |
| PD-U8 | A | Providence Day | College Support › Applicant’s Edge |  | rescan5-pd-ccd-cannon.md:162 |  |
| CCD-U1 | A | Country Day | Financial Aid › Beyond Tuition vs After School |  | rescan5-pd-ccd-cannon.md:168 |  |
| CCD-U2 | A | Country Day | Sports › Coaching |  | rescan5-pd-ccd-cannon.md:169 |  |
| CCD-U4 | A | Country Day | The Arts › Verdict |  | rescan5-pd-ccd-cannon.md:171 |  |
| CAN-U1 | A | Cannon | Clubs › Club Catalog, Compare `us-organizations` |  | rescan5-pd-ccd-cannon.md:174 | Approved: Honor Council under Governance, 15 → 16, and Compare ≥20 → ≥21 with its qual and tile. |
| CAN-U2 | A | Cannon | Global Exposure vs Clubs |  | rescan5-pd-ccd-cannon.md:175 |  |
| CAN-U3 | A | Cannon | The Arts › checklist vs College Support |  | rescan5-pd-ccd-cannon.md:176 |  |
| CAN-U4 | A | Cannon | Compare `signature-recognition` |  | rescan5-pd-ccd-cannon.md:177 | Approved: cell "15 Blumey finalists", with the qual from the worklist. Recount the 15 first. |
| CAN-U8 | A | Cannon | Summer › two camp descriptions vs the rows |  | rescan5-pd-ccd-cannon.md:181 |  |
| CAN-U9 | A | Cannon | Sports › Winning Record, Show sources |  | rescan5-pd-ccd-cannon.md:182 |  |
| LAT-U1 | A | Charlotte Latin | Admissions › TK/K and Grades 1–5 bands, cross-band table, checklists, disclaimer; Financial Aid › Beyond Tuition |  | rescan5-latin.md:132 | Text only, with no new tile or cost row. Print no weekday beside the April dates: the brochure's are wrong. |
| LAT-U2 | A | Charlotte Latin | Admissions › header tile, Upper School band, checklists, cross-band table |  | rescan5-latin.md:133 |  |
| LAT-U3 | A | Charlotte Latin | Admissions › TK/K band |  | rescan5-latin.md:134 |  |
| LAT-U4 | A | Charlotte Latin | Financial Aid › Trend & Questions |  | rescan5-latin.md:135 |  |
| LAT-U5 | A | Charlotte Latin | Financial Aid › Beyond Tuition (Hawks' Club box) |  | rescan5-latin.md:136 |  |
| LAT-U6 | A | Charlotte Latin | College Support › Whole Class, non-traditional destinations |  | rescan5-latin.md:137 |  |
| LAT-U7 | A | Charlotte Latin | The Arts › Blumey ledger, Honest context, ask | X1 | rescan5-latin.md:138 | Roles are saved in Latin's Arts record (planning note). No names. Do not call a finalist slot rare. |
| LAT-U8 | A | Charlotte Latin | The Arts › Ladder, Music & the Honors Pipeline |  | rescan5-latin.md:139 |  |
| CC-U1 | A | Charlotte Christian | Sports › Pipeline; tile; Compare `d1-commits-2426` |  | rescan5-cc-cchs-cov-carmel.md:157 | D1 35 → 36 and 73% → 75%, in the funnel, bars, prose, Compare and record. |
| CC-U2 | A | Charlotte Christian | FA › Fees and Additional Costs |  | rescan5-cc-cchs-cov-carmel.md:158 |  |
| CC-U3 | A | Charlotte Christian | Arts › Ladder, Theatre season |  | rescan5-cc-cchs-cov-carmel.md:159 |  |
| CC-U4 | A | Charlotte Christian | Arts › Studio to Gallery, Verdict ask vs College Support (#9) |  | rescan5-cc-cchs-cov-carmel.md:160 | The rewritten ask must not invite a parent to collect student names. |
| CC-U5 | A | Charlotte Christian | Arts › Theatre ledger, context, Verdict | X1 | rescan5-cc-cchs-cov-carmel.md:161 |  |
| CCHS-U1 | A | Charlotte Catholic | FA › Tuition vs Learning Support (#9) |  | rescan5-cc-cchs-cov-carmel.md:163 |  |
| CCHS-U2 | A | Charlotte Catholic | Arts › Theatre, Verdict; Clubs › Honor Societies | X1 | rescan5-cc-cchs-cov-carmel.md:164 |  |
| CCHS-U3 | A | Charlotte Catholic | Summer › tile, headline, filter; Compare `summer-ages` |  | rescan5-cc-cchs-cov-carmel.md:165 |  |
| COV-U1 | A | Covenant Day | FA › What to Ask, Q3 |  | rescan5-cc-cchs-cov-carmel.md:166 |  |
| COV-U2 | A | Covenant Day | Clubs › Service headline |  | rescan5-cc-cchs-cov-carmel.md:167 |  |
| COV-U3 | A | Covenant Day | College Support › Where Graduates Go, Whole Class (#9) |  | rescan5-cc-cchs-cov-carmel.md:168 |  |
| COV-U4 | A | Covenant Day | Arts › context, ask | X1 | rescan5-cc-cchs-cov-carmel.md:169 |  |
| CAR-U1 | A | Carmel Christian | Arts › Theatre ledger, context, Verdict | X1 | rescan5-cc-cchs-cov-carmel.md:170 |  |
| CAR-U2 | A | Carmel Christian | FA › Aid Process and Timeline |  | rescan5-cc-cchs-cov-carmel.md:171 |  |
| CAR-U6 | A | Carmel Christian | Sports › Pipeline |  | rescan5-cc-cchs-cov-carmel.md:175 | Gaston Day row → C2C, level stays D3, and the USCAA sentences go from the note and record. See "Overlap with plan allcommits". |
| DD-U1 | A | Davidson Day | Sports › Winning Record; Honors ledger | X2 | rescan5-dd-gd-hg-k8.md:160 | Fall 2026 facts are saved in the record. The Cup card stays through 2025–26. |
| DD-U2 | A | Davidson Day | Arts › Theatre, ledger and verdict | X1 | rescan5-dd-gd-hg-k8.md:161 |  |
| DD-U5 | A | Davidson Day | College Support › Applicant's Edge, verdict |  | rescan5-dd-gd-hg-k8.md:164 |  |
| DD-U6 | A | Davidson Day | Compare `p4-commits-2426`, `d1-commits-2426` quals |  | rescan5-dd-gd-hg-k8.md:165 |  |
| GD-U1 | A | Gaston Day | Sports › Offered (stat), Winning Record, Honors | X2 | rescan5-dd-gd-hg-k8.md:172 | Text, plus the existing `matrixTitle` field set to "State-title matrix, 2023–25". No new column and no new honors row: extend the existing text. |
| GD-U2 | A | Gaston Day | Arts › "Theatre & the Blumeys" | X1 | rescan5-dd-gd-hg-k8.md:173 | Approved UX: step 2c. Roles are saved in Gaston Day's Arts record (planning note). |
| GD-U3 | A | Gaston Day | After School |  | rescan5-dd-gd-hg-k8.md:174 |  |
| GD-U4 | A | Gaston Day | Student Clubs › verdict hint |  | rescan5-dd-gd-hg-k8.md:175 |  |
| TRI-U1 | A | Trinity Episcopal | Financial Aid › timeline vs Admissions |  | rescan5-dd-gd-hg-k8.md:188 |  |
| PREP-U2 | A | Charlotte Prep | Financial Aid › Section 03 box |  | rescan5-dd-gd-hg-k8.md:195 |  |
| PD-U14 | A | Providence Day | Sports › College Pipeline roster |  | found at Step 5; fix: conference to CAA here and in the Class of 2027 record | Conference "Southern" → "CAA", on the row and in the Class of 2027 commitments record. |
| CCD-U3 | B | Country Day | Sports › Coaching |  | rescan5-pd-ccd-cannon.md:170 |  |
| CAN-U6 | B | Cannon | The Arts › season vs Blumey ledger |  | rescan5-pd-ccd-cannon.md:179 |  |
| CAR-U3 | B | Carmel Christian | Arts › Ladder vs Course Offerings |  | rescan5-cc-cchs-cov-carmel.md:172 |  |
| CAR-U4 | B | Carmel Christian | Arts › Ladder, Studio, Verdict vs Course Offerings |  | rescan5-cc-cchs-cov-carmel.md:173 |  |
| DD-U4 | B | Davidson Day | Course Offerings; Arts; College Support |  | rescan5-dd-gd-hg-k8.md:163 |  |
| PD-U9 | C | Providence Day | Sports › National Stage headline |  | rescan5-pd-ccd-cannon.md:163 |  |
| PD-U10 | C | Providence Day | Sports › ranked recruits vs roster |  | rescan5-pd-ccd-cannon.md:164 |  |
| PD-U11 | C | Providence Day | College Support › National Merit ledger, 2021 |  | rescan5-pd-ccd-cannon.md:165 |  |
| CCD-U5 | C | Country Day | Compare `us-organizations` qual vs Affinity & Identity Groups |  | rescan5-pd-ccd-cannon.md:172 |  |
| CCD-U6 | C | Country Day | College Support › Where Graduates Go vs Admission Rates |  | rescan5-pd-ccd-cannon.md:173 |  |
| CAN-U5 | C | Cannon | Compare `advanced-arts-coursework` |  | rescan5-pd-ccd-cannon.md:178 |  |
| CAN-U7 | C | Cannon | The Arts › Verdict vs College Support |  | rescan5-pd-ccd-cannon.md:180 |  |
| LAT-U9 | C | Charlotte Latin | College Support › Whole Class note and gap |  | rescan5-latin.md:140 | Approved: print 145 with its year. Compute no testing rate. |
| LAT-U10 | C | Charlotte Latin | Student Clubs › Honor Societies |  | rescan5-latin.md:141 |  |
| LAT-U11 | C | Charlotte Latin | Student Clubs › Service teaser and headline |  | rescan5-latin.md:142 |  |
| LAT-U12 | C | Charlotte Latin | Sports › Winning Record |  | rescan5-latin.md:143 | Text in the data, no chrome. Recount the same list at Cannon, Charlotte Christian, Providence Day, Country Day and Davidson Day, and date each the same way. |
| LAT-U13 | C | Charlotte Latin | College Support › Admission Rates tile and subhead |  | rescan5-latin.md:144 | Recount the tile and subhead at all 11 high schools with the card. Fix only those whose sentence is false or undated. |
| LAT-U14 | C | Charlotte Latin | Summer › Camp Catalog |  | rescan5-latin.md:145 | Approved UX: step 2a. |
| CC-U6 | C | Charlotte Christian | Sports › Pipeline (#10) |  | rescan5-cc-cchs-cov-carmel.md:162 | Approved chrome: step 2b. |
| CAR-U5 | C | Carmel Christian | College Support › Verdict |  | rescan5-cc-cchs-cov-carmel.md:174 |  |
| DD-U7 | C | Davidson Day | Sports › Coaching |  | rescan5-dd-gd-hg-k8.md:166 |  |
| HG-U1 | C | Hickory Grove | Admissions › Middle band button |  | rescan5-dd-gd-hg-k8.md:182 |  |
| PREP-U1 | C | Charlotte Prep | High School Placement › Where Graduates Go |  | rescan5-dd-gd-hg-k8.md:194 |  |
| PD-U12 | D | Providence Day | Sports › Coaching, continuity anchor |  | rescan5-pd-ccd-cannon.md:166 | Approved: "20 consecutive boys’ CISAA XC titles for the program, 2000–20 (he took over in 2002)". |
| PD-U13 | D | Providence Day | Sports › Coaching, pedigree hire |  | rescan5-pd-ccd-cannon.md:167 | Approved: "career record, 15 seasons, through 2025". The year is our inference, so add a code comment or verify flag that says so. |
| LAT-U15 | D | Charlotte Latin | College Support › Learning differences; Financial Aid › Beyond Tuition |  | rescan5-latin.md:146 | Approved: say the billing is from the older guidelines and add the ask "What do Learning Resources sessions cost today?" No cost row. The live pop-up names no charge. |
| DD-U3 | D | Davidson Day | Arts › Blumey ledger, 2023 |  | rescan5-dd-gd-hg-k8.md:162 | Approved: "four nominations… and five individual finalists, including Best Actress (as Regina George)". |
| GD-U5 | D | Gaston Day | College Support › Where Graduates Go |  | rescan5-dd-gd-hg-k8.md:176 | Approved: no merge and no bucket change. Add an ask (which years, and accepted or enrolled?) and a verify flag. |

**5. X2, the fall 2026 results.**

- Davidson Day (DD-U1) and Gaston Day (GD-U1): as their rows say.
- **Country Day:** `src/data/sportsPrograms/charlotte-country-day.ts`. Girls tennis "has won four
  straight" becomes "won four straight, 2022–25". Say field hockey won again in fall 2026. Do not
  type "17th" unless the school or the NCISAA prints it. Date "took its 16th" to 2025. Volleyball
  and boys soccer were runners-up: add them only where the card already lists runners-up.
- **Charlotte Latin:** say girls tennis won in fall 2026, and date any sentence that now reads as
  current ("What they didn't win" is LAT-U12).
- **Providence Day:** girls tennis runner-up. **Football champion, November 20, 2026: 34–18 over
  Rabun Gap**, its second straight Division I title and fifth in six seasons (WBTV, November 21,
  and NC Football News, both saved in the Sports record. The NCISAA bracket had no score when
  read: prefer it if it has one by build time, and stop if it disagrees).
  - Update every current-tense football claim: titles since 2021 (2021, 2022, 2023, 2025, 2026),
    "four titles in five years", "five straight finals" (now six, 2021–26), the championship
    ledger and the Winning Record prose.
  - Anything scoped through 2025–26 stays and says so: the four titles of 2025–26, the Cup card
    and its point sources.
  - Date the coach's "8 state titles" and "147–26" through 2025. Do not compute 9 or a new record.
- **Not checked:** cross country and golf pages carried no team results. Re-read them, and make
  no claim if they are still empty. Charlotte Catholic is NCHSAA: check its record only for text
  that now reads stale.

**5a. CAN-T17, Cannon's 2026–27 Beyond the Bell catalog.** The user opened it and had it read in
Chrome on 2026-11-22. The whole table is under `## Method` in Cannon's After School Redesign Research
2026 record. In `src/data/afterSchoolPrograms/cannon.ts`:

- Replace the 22 Session 3 (spring 2026) classes with the **31** Session 2 classes, retitle
  "Beyond the Bell — Session 2, 2026–27", and date it November 30 to February 5. Do not type the
  registration deadline (November 27): it expires within days.
- `dayFilters` gains `Fri`. Let's Get Organized is **one** row with `days: ['Mon', 'Wed']`,
  `day: 'Mon/Wed'`, and "7:30–8:00 a.m., before school" in its desc. `dayLabel()` then needs
  `afterSchool.day_MonWed` in all ten catalogs (en now, nine in Phase 2).
- **Descriptions name organizations and roles, not individual instructors.** Two music teachers
  are students. Never name them, in any file or brief, and do not re-open the brochure to check.
- Every restatement: the headline, intro, header comment, "22 distinct classes", "from robotics
  and ballet to sculpture…", "$18–$30 per class and $160–$300 … of 8 or 10 classes" (now
  $15–$30, $125–$240, 5–15 meetings), the music flag (now K–12) and the source link.
- **Drop "full refunds for canceled classes":** this brochure promises only a make-up where
  possible. The first-week cancellation rule replaces it.
- Remove the catalog's stale flag. The After School Program's own **rates are still 2025–26**:
  that flag, the verdict line and the ask stay.

**5b. CAR-T8, Carmel's 2026–27 high school catalog.** The user supplied the guide and had it read
in Chrome on 2026-11-22. The list is under `## Method` in Carmel's Course Offerings Curriculum
Guide record. The duplicate Honors Biology and Honors Chemistry rows are our error, and the list
is out of date beyond them.

- `src/data/courseOfferings.ts`: rebuild the high school division from that table: **92 entries,
  69 distinct titles, 16 AP, 9 departments** (recount as built). The teaser names the 2026–27
  Course Description Guide. Take descriptions from the guide's titles only, with no invented detail.
- `metricValues.ts` `us-courses` 96 → 92 with its comment. Run `npm run dependents`.
- **The Arts card restates dropped courses** (choir from grade 5 "through High School", the
  ensembles, Media & Journalism, "the Course Offerings guide runs…"). The arts page and the guide
  disagree on high school Choir, Creative Writing, Technical Theater and Journalism: attribute
  both, pick no winner, and ask. This widens CAR-U4 and touches CAR-U3. Re-check Compare's
  Carmel ensembles and arts-coursework cells and quals.
- Dual enrollment now names Grand Canyon and Liberty: fix any "not published" restatement and the
  record's superseded flags.

**6. English wording the round-4 translators flagged** (`consistency4.md`, "For the next round"):
the "had five and one in 2026" line, the "rise in every band" fragment, the after-school "no
financial-aid policy … exists" overclaim, the garbled Butterfly Memorial sentence, "anchors what
the school itself names", "domestic band", "entry groups", the NHS dash and the Cahal Pech count.
Wording only. For `$0–700`-style ranges, add the second dollar sign only where the school's own
figure has it: figures are copied char for char.

**7. Tooling.**

- **7a. R12, one college, one conference,** in `scripts/check_consistency.mjs` (header, gate and
  `--report`): for one college and sport group (football apart), rosters agree on conference and
  level. Planning's trial split 6 of 261 colleges. Three are real (CC-U1, CAR-U6, PD-U14). Handle
  the others by meaning, not by school: Miami of Ohio is not Miami, Johnson & Wales has two
  campuses, Davidson wrestling is SoCon, and "South Atlantic" is SAC. Negative-test it by
  corrupting one roster row, then diff that file back.
- **7b. HBCU list.** Save the 107-school roster into
  `source-material/college-support/_shared/HBCU - Membership and Count 2026.md` from the URL that
  record cites, and make `scripts/check_memberships.mjs` fail when an accepted college is on the
  roster and absent from `HBCUS`. Negative-test it with UDC.
- **7c. Audit bands.** `planVisits()` visits each school's own `guide.bands[].key` plus the
  default, and both audits drop `BANDS`. All 26 keys must appear in the progress log.
- **7d. Doubled period.** `localizeUnits()` swallows one period after a unit whose localized form
  ends in one (not an ellipsis). `scripts/check_money_text.mjs` gains that invariant and a fixed
  case, negative-tested with `--format` on the old file.
- **7e. Records and register.** Add to `.claude/skills/consistency-self-scan/settled.md`, with
  values verbatim: S11 (GD-U5, the undated list is not merged), S12 (PD-U13's inferred year), S13
  (LAT-U15, no cost component while no live charge is published) and S14 (LAT-U9, no rate across
  two editions). Update the rule list in CLAUDE.md's `check:consistency` bullet, the skill's
  "R1–R11" mentions, and the skill's entry in `.claude/SKILLS.md`.

**8. The restatement sweep, before any check.** For every changed value, name and year: grep the
old and the new form across that school's page dump, `src/data/metricValues.ts` (value, sub and
qual), `src/data/financialAidReports.ts`, the club modules and the school's records. Run
`npm run dependents`. List each ID with the places found in the Implementation notes.

**9. Ingest** through `ingest-source-material` (use `/usr/bin/python3`, restore HEAD order in
`schools.json`, put back date-only notes), then `npm run schema`.

**10. Re-capture** the three design files from the built app (`design:capture` → write →
`design:verify`, `.claude/docs/design-sync.md`), keeping their existing extra references, and
record it there.

**11. Adversarial review** (`/implement` 5b, at most two passes). Besides its standard brief, the
reviewer repeats step 8's grep independently for every changed value, on the page and Compare.

**→ STOP. `/implement` ends its turn here for the user's English review.**

### Phase 2 — Every other locale

1. Merge `origin/main`. Re-extract, splice by stamp, and run
   `.claude/plans/consistency3-data/path_replay.mjs` to `TOTAL 0` in every locale. Paths move at
   5a, 5b (both replace whole arrays), HG-T5, every inserted ledger row, CCD-T21, CAN-U1 and any added ask or flag.
2. Translate the changed units in every `PROSE_TRANSLATED` locale (es, bn, ht, te, fr, fa, it, hi,
   ar), per `.claude/docs/prose-translation-architecture.md`. Re-run the content extractor if
   `src/content` moved. In fa and ar write money ranges in words.
3. Chrome, in the nine other catalogs of `TRANSLATED`: `afterSchool.day_MonWed`, `tables.age`, `tables.ages`,
   `sports.rankedRecruits`.
4. Older translation items from `consistency4.md`: translated quotes, te `/week` units, the two
   other Country Day "million" units and the bn "Rising" label family.
5. Open the PR with `--body-file`, squash-merge, pull main, close the plan and its INDEX row.
6. **Rescan:** run `consistency-self-scan` on merged main and give the verdict (`/implement` 10).
   **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/data/{admissions,arts,clubs,collegeSupport,sports}Programs/*.ts`, `src/data/summer/*.ts`, `src/data/afterSchoolPrograms/*.ts` | the findings |
| `src/data/{metricValues,financialAidReports,clubCatalog,clubClusters}.ts` | findings and restatements |
| `src/data/courseOfferings.ts` | Carmel's catalog (5b) |
| `src/data/{collegeMemberships,collegeRankings}.ts` | HBCU members, Miami alias |
| `src/data/summerPrograms.ts`, `src/components/SummerPrograms.tsx` | the Ages flag |
| `src/locales/*.json` | four keys (en in Phase 1, nine in Phase 2) |
| `src/lib/format.ts` | doubled period |
| `scripts/check_consistency.mjs`, `check_memberships.mjs`, `check_money_text.mjs` | 7a, 7b, 7d |
| `scripts/audit_scope.mjs`, `audit_date_render.mjs`, `audit_money_render.mjs` | 7c |
| `source-material/**`, generated notes, `src/content`, `schools.json`, schema | research and ingest |
| `.claude/skills/consistency-self-scan/*`, `.claude/SKILLS.md`, `CLAUDE.md`, `.claude/docs/design-sync.md` | records |
| `src/data/overlays/**` | Phase 2 |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` clean. `npm run build` passes up to the expected English-first stop at
      `check:live`, then each later gate on its own exits 0.
- [ ] `npm run check:consistency` (R12 included), `check:memberships`, `check:buckets`,
      `check:moneytext`, `check:schema`, `npm run coverage:floor`. If the floor moves, update
      CLAUDE.md and `add-school`.
- [ ] Each new check's negative test failed for its own message, and the artifact diffs back clean.
- [ ] Page dumps: every ID's new value shows and its old value is gone, Compare included.
- [ ] The plain-language hook is clean on every edited file.
- [ ] A name screen on the diff, the records and `dist`: 0.
- [ ] In real Chrome: Latin's catalog header and filter at 1280 and 360px, the heading on two
      schools, Gaston Day's ledger at 360px, both planners ($98.75 rounds as the planner does),
      Hickory Grove's International band, Cannon's Fri and Mon filters (Let's Get Organized
      shows under Mon and Wed, "31 of 31" under All) and Carmel's catalog (92, no duplicate).
- [ ] `npm run audit:mobile -- --all` (logged to a file, never piped through tail).

### Phase 2 — Locales

- [ ] `check:live`, `check:runtime`, `check:chrome`, `check:dates`, `check:translations`,
      `check:sepdrift` and `i18n:leaks` per locale, `check:digits`, `check_figures.py` per topic,
      `check:fr`, `check:hi`, `check:fa`, `check:bidi`, and the path replay at 0.
- [ ] `audit:daterender`, `audit:moneyrender` and `audit:mobile`, each with `--all` (format.ts and
      render code changed). Allow about 70 minutes.
- [ ] A render probe of the changed units, and a look at fa/ar and at es, fr and it "/wk" lines.

## Risks

| Risk | Mitigation |
|---|---|
| A fix misses its restatement again | Step 8, repeated by the reviewer |
| Inserted rows render silent English | Path replay to 0 |
| A student name enters through a Blumey row or a fetched page | Roles only, counts-only screens, name screen on the diff |
| `allcommits` lands first | Re-check the Johnson & Wales row and every `metricValues` path before building |
| The format fix eats a real period | The new `check:moneytext` invariant and the full money audit |
| The Claude Design MCP stops working by 2026-12-14 | Build before then, or stop at step 2 and ask |

## Open questions

- **Providence Day's football final:** answered 2026-11-22, won 34–18 (step 5).
- **Carmel's count.** Geometry, Math 1 and Math 4 are counted as Standard plus the bulleted
  level, like the guide's other paired courses. **Default:** 92, flagged at the English review.
- **Cross country and golf team results.** **Default:** no claim.
- **Build order against `allcommits`:** answered 2026-11-22, this plan first.

## Implementation notes

### Phase 1 (2026-11-22, `fix/consistency5`)

**How it was built.** One session, every edit by exact match. Refused hosts were not requested.
**Not every cited source was re-opened before typing,** as "Re-open before typing" asked (an earlier
version of this note said every one was). The re-open script held 52 checks. 42 matched outright and
10 needed a second look: a page read by hand, a second source, or a phrase whose absence is the fix.
Some other cited pages had only the scan's or planning's read of the same day, under those headings.

Nine checks were run afterward, on 2026-11-23, and all nine support what was typed: Charlotte Prep's
tuition page, Latin's admissions and acceptances pages, the Queens golf roster, the 2023-24 lacrosse
bracket, Charlotte Catholic's shows page, the girls' team line of the track results, Johnson & Wales
(conference in the page's markup only) and Hickory Grove's international page (no deposit, as fixed).
The other cited links were not all re-opened. Latin's Learning Resources
pop-up still gives no charge, so its billing stays attributed to the older guidelines (LAT-U15).
The Blumey rows were read from the copies round 4 saved, by category and role, with names masked.

**Both audits were run after 7c (2026-11-23, `--all --lang es`, on the final build).** All 26 band
keys are in each progress log. Money: 0 findings. Dates: 40 findings at 16 render sites, each traced
to English this branch changed (36 by full match, four by the changed source line). Phase 2 must
bring that to 0. The other eight locales were not run.

**One wrong value in the plan's own research.**

- **GD-U2:** the planning table gave Gaston Day's 2025 nomination as Best Ensemble. The saved PDF
  (its sha256 matches the hash in the cited URL) lists it under **Best Direction**, by text order and
  by position on the page. The card and the record say Best Direction, and the record keeps the
  correction. Every other role, show and repeat-performer claim was checked the same way and holds.

**Deviations from the worklist's or the plan's wording.**

- **PD-U3:** the headline says "tied for the most" and does not name Durham Academy, under the
  standing no-cross-school-comparisons rule. Durham's girls track is in the "didn't win" list.
- **LAT-U7, CC-U5:** the 2023 rows make no "no nominations" claim: that year's Best Actor and Actress
  nominees were announced after the saved list. Latin's "one nomination" claim is scoped to 2024–26.
- **CCHS-U2:** "no win" is scoped to 2025 and 2026. No 2024 winners list was read.
- **CCHS-U3:** the Compare value is "rising 2–9". "ages 6–13 · rising 2–9" fails `check:spans`.
- **LAT-U13:** the tile named no term at all 11 schools, so all 11 changed. The subhead was false at
  five (Latin, Davidson Day, Catholic, Carmel, Country Day) and changed there only.
  `check:ncsuper` now reads the new tile shape, and fails on a superlative tile it cannot read.
- **LAT-U12:** the six lists are dated. They are not complete rosters of every champion (some omit a
  sport), and no sport was added beyond PD-U3's.
- **LAT-U2:** the same false premise in "13 days ahead of every other grade" (four places) and in the
  Upper School tile and Compare cell was fixed too.
- **CAR-U1, CAN-U6:** "Earlier (year not published)" and "(listed by Blumenthal as …)" sit in fields
  the extractor skips, so `WORDED_VALUES` promotes those two shapes only.
- **CAN-U7:** the point's label, "weighted like academics", was false by the fix's own text. It now
  reads "The arts carry academic course levels".
- **CCD X2:** "Field Hockey — 4 titles since 2017" is dated to 2017–25 rather than recounted.
- **CAR-U6:** Carmel's row takes the optional "(Charlotte)", which keeps the two campuses apart in R12.
- **Verify flags:** Arts, Admissions and Coaching take no flags, so CAR-U3, CAR-U4, DD-U4, LAT-U1 and
  PD-U13 carry code comments, and CCD-U3 a comment plus `toVerify`.
- **X4 at Trinity:** the planner shows $101, not $99: it divides three weeks plus the $25 registration
  by 12 days. $98.75 is the bare camp price a day.
- **Step 5a:** the verify flag on music lessons names no teacher and no teacher's status. "No paid
  program" before school became "no paid care program", because Let's Get Organized is a paid class
  then. "Executive-function" became "organization skills", from the new catalog's title.
- **Step 5b:** ensembles stays 3 on Compare, with a new qual attributing the choir. Advanced arts
  coursework still holds (1 AP + 3 Honors).
- **Step 6, ranges:** only Cannon's books and Davidson Day's two rows gained a second dollar sign.
  The other ranges are printed without one by the school, or are our own axis labels.
- **Matrix citations:** four Compare Arts cites quote reworded sentences and were re-pointed.
- **Link placement:** the CAIS brochure link sits in the Financial Aid section's source line,
  because box bodies render no links.
- **R12 groups** are football, wrestling and everything else, with spellings folded by meaning. It
  skips no school.
- **HBCU roster:** the cited page prints 114 rows. Seven units fold into their parents, giving 107.
- **Ingest:** `schools.json` had no record change and was left as committed.
- **Re-capture (step 10)** runs after the adversarial review, so the design shows what ships.

**Not claimed, as planned.** Cross country and girls golf had no 2026-27 results when re-read. The
football bracket still had no score, so the final rests on the two saved reports. Charlotte
Catholic's Sports data held nothing that fall 2026 makes stale.

**Traps for Phase 2.**

- Moved paths: Hickory Grove's International band (tile removed), the Arts ledgers and sources at
  Latin, Christian, Catholic, Carmel, Davidson Day and Gaston Day, Catholic's season list, Cannon's
  class list and flags and club catalog, Carmel's high school catalog, Country Day's clusters,
  coaching ledger and components, Sports source lists, Latin's admissions sources, and the new asks.
- New translatable shapes: `theatre.ledger[].year` and `theatre.ledger[].show` (worded values only).
- `src/content` moved: re-run the content extractor.
- Chrome: four keys in nine catalogs (`afterSchool.day_MonWed`, `tables.age`, `tables.ages`,
  `sports.rankedRecruits`). `rankedRecruits` already exists there with the old meaning, and
  `check:chrome` lists only the first.
- New money ranges (`$15–$30`, `$125–$240`, `$300–$500`, `$500–$1,000`): words in fa and ar.

#### The restatement sweep (step 8)

Each ID's new and old forms, searched across the page dump, Compare, the Financial Aid, club and
course modules, the school's data files and the records. "Old form left" in a record is dated research
above `## Method`, superseded by a Method note. Three other hits are false matches: Hickory Grove's
domestic bands keep their $500 deposit, and two patterns also occur in other schools' aid reports.

| ID | school | new form found in | old form left in |
|---|---|---|---|
| CCD-T21 | charlotte-country-day | page, clubCatalog, clubClusters, internationalTravel | — |
| LAT-T11 | charlotte-latin | page, artsPrograms | record|
| COV-T15 | covenant-day | metricValues | — |
| DD-T2 | davidson-day | page, collegeSupportPrograms | — |
| HG-T1 | hickory-grove-christian | metricValues | — |
| HG-T5 | hickory-grove-christian | admissionsPrograms | admissionsPrograms |
| X4 | trinity-episcopal | summer | — |
| X4 | charlotte-prep | page, summer | — |
| PD-U1 | providence-day | page, metricValues, collegeSupportPrograms | — |
| PD-U1 | charlotte-country-day | page, metricValues, collegeSupportPrograms | record|
| PD-U2 | providence-day | page, sportsPrograms | record|
| PD-U3 | providence-day | page, sportsPrograms | record|
| PD-U4 | providence-day | page, collegeSupportPrograms | — |
| PD-U5 | providence-day | page, afterSchoolPrograms | — |
| PD-U6 | providence-day | page, summer | — |
| PD-U7 | providence-day | page, financialAidReports | — |
| PD-U8 | providence-day | page, collegeSupportPrograms | — |
| PD-U9 | providence-day | page, sportsPrograms | — |
| PD-U10 | providence-day | page, sportsPrograms | — |
| PD-U11 | providence-day | page, collegeSupportPrograms | — |
| PD-U12 | providence-day | page, sportsPrograms | — |
| PD-U13 | providence-day | page, sportsPrograms | — |
| PD-U14 | providence-day | page, metricValues, sportsPrograms | — |
| X2 | providence-day | page, sportsPrograms | record|
| CCD-U1 | charlotte-country-day | page, financialAidReports | — |
| CCD-U2 | charlotte-country-day | page, sportsPrograms | — |
| CCD-U3 | charlotte-country-day | page, sportsPrograms | — |
| CCD-U4 | charlotte-country-day | page, artsPrograms | — |
| CCD-U5 | charlotte-country-day | metricValues | — |
| CCD-U6 | charlotte-country-day | page, collegeSupportPrograms | record|
| X2 | charlotte-country-day | page, sportsPrograms | — |
| CAN-U1 | cannon | page, clubCatalog, clubClusters, metricValues | record|
| CAN-U2 | cannon | page, internationalTravel | — |
| CAN-U3 | cannon | page, artsPrograms | — |
| CAN-U4 | cannon | page, metricValues | — |
| CAN-U5 | cannon | metricValues | — |
| CAN-U6 | cannon | page, artsPrograms | — |
| CAN-U7 | cannon | page, artsPrograms | — |
| CAN-U8 | cannon | page, summer | — |
| CAN-U9 | cannon | sportsPrograms | — |
| CAN-T17 | cannon | page, afterSchoolPrograms | record|
| LAT-U1 | charlotte-latin | page, admissionsPrograms, financialAidReports | record|
| LAT-U2 | charlotte-latin | page, admissionsPrograms | — |
| LAT-U3 | charlotte-latin | page, admissionsPrograms | — |
| LAT-U4 | charlotte-latin | page, financialAidReports | — |
| LAT-U5 | charlotte-latin | page, financialAidReports | — |
| LAT-U6 | charlotte-latin | page, collegeSupportPrograms | — |
| LAT-U7 | charlotte-latin | page, artsPrograms, metricValues, sportsPrograms | — |
| LAT-U8 | charlotte-latin | page, artsPrograms | — |
| LAT-U9 | charlotte-latin | page, collegeSupportPrograms | — |
| LAT-U10 | charlotte-latin | page, clubsPrograms | — |
| LAT-U11 | charlotte-latin | page, clubsPrograms | — |
| LAT-U12 | charlotte-latin | page, sportsPrograms | — |
| LAT-U13 | charlotte-latin | page, collegeSupportPrograms | — |
| LAT-U14 | charlotte-latin | summer | — |
| LAT-U15 | charlotte-latin | page, collegeSupportPrograms | — |
| X2 | charlotte-latin | page, sportsPrograms | — |
| CC-U1 | charlotte-christian | page, sportsPrograms | — |
| CC-U2 | charlotte-christian | page, financialAidReports, admissionsPrograms | — |
| CC-U3 | charlotte-christian | page, artsPrograms | — |
| CC-U4 | charlotte-christian | page, artsPrograms | record|
| CC-U5 | charlotte-christian | page, artsPrograms | — |
| CC-U6 | charlotte-christian | page, en.json | — |
| CCHS-U1 | charlotte-catholic | page, financialAidReports, learningSupport | — |
| CCHS-U2 | charlotte-catholic | page, metricValues, artsPrograms | financialAidReports, record|
| CCHS-U3 | charlotte-catholic | page, summer, metricValues | — |
| COV-U1 | covenant-day | page, financialAidReports | — |
| COV-U2 | covenant-day | page, clubsPrograms | — |
| COV-U3 | covenant-day | page, collegeSupportPrograms | — |
| COV-U4 | covenant-day | page, artsPrograms | — |
| CAR-U1 | carmel-christian | page, artsPrograms, metricValues | record|
| CAR-U2 | carmel-christian | page, financialAidReports | financialAidReports |
| CAR-U3 | carmel-christian | page, metricValues, artsPrograms | — |
| CAR-U4 | carmel-christian | page, artsPrograms | — |
| CAR-U5 | carmel-christian | page, collegeSupportPrograms | — |
| CAR-U6 | gaston-day | page, sportsPrograms | — |
| CAR-T8 | carmel-christian | page, courseOfferings, metricValues | — |
| DD-U1 | davidson-day | page, sportsPrograms, financialAidReports | — |
| DD-U2 | davidson-day | page, artsPrograms | — |
| DD-U3 | davidson-day | page, artsPrograms | — |
| DD-U4 | davidson-day | page, courseOfferings, artsPrograms | — |
| DD-U5 | davidson-day | page, collegeSupportPrograms | — |
| DD-U6 | davidson-day | metricValues | — |
| DD-U7 | davidson-day | page, sportsPrograms | — |
| GD-U1 | gaston-day | page, sportsPrograms, metricValues | — |
| GD-U2 | gaston-day | page, artsPrograms, metricValues | — |
| GD-U3 | gaston-day | page, afterSchoolPrograms | record|
| GD-U4 | gaston-day | page, clubCatalog | — |
| GD-U5 | gaston-day | page, collegeSupportPrograms | — |
| HG-U1 | hickory-grove-christian | page, admissionsPrograms | — |
| TRI-U1 | trinity-episcopal | page, financialAidReports | — |
| PREP-U1 | charlotte-prep | page, highSchoolPlacementPrograms | — |
| PREP-U2 | charlotte-prep | page, financialAidReports | — |

### Adversarial review (2026-11-22, two passes, the cap)

| pass | found | fixed | fixed in part | open for the user | rejected |
|---|---|---|---|---|---|
| 1 | 16 | 14 | 1 (#13) | 1 (#4) | 0 |
| 2 | 2 | 2 | 0 | 0 | 0 |

The fixes that change what this plan says:

- **PD-U2:** the cell is runner-up with no record and a dev-only `toVerify`. The plan's "21–9" is
  Providence Day's record going into the final it lost, and no season-ending record is printed. The
  sweep row above predates this.
- **LAT-U13, third site:** at Latin, Carmel and Davidson Day the table's chip reads "the lowest of
  the six in Fall 2025". `check:ncsuper` accepts both forms.
- **GD-U1:** girls tennis is "tied with volleyball", no longer "the most decorated".
- **5b:** Compare's course matrix counts Carmel's Computer Science & AI.
- **CCD-U3:** the kicker reads "since 1987".
- **Spelling:** four "neighbour" forms joined the map.
- **Names:** the private-lesson teachers in Cannon's superseded 2025–26 record are withheld in the
  record, its note and `src/content`, because none had a stated adult role and students teach some
  lessons. One orphaned overlay unit still held one of them and was deleted by stamp from the 18
  after-school overlay and work files. Never restore that unit (`cee50463`) in Phase 2, and never
  repeat the names. `main` and its history still hold them until this merges.

The second pass's two fixes had no reviewer, by the cap. The rescan covers them.

### Settled at the English review (2026-11-23)

The user took the recommendation on all six. That settles these items only: the English as a whole
still needs the user's approval before Phase 2.

1. **Gaston Day, 2025:** Best Direction stays.
2. **Providence Day, 2023–24 girls basketball:** runner-up with no record stays.
3. **Charlotte Catholic, Compare `signature-recognition` and `flagship-result`:** both now read
   "15 Blumey finalists". The flagship tip gains the three years, since the cell no longer dates the
   result, and the clubs record follows.
4. **Charlotte Catholic, Compare `summer-ages`:** "rising 2–9" stays.
5. **Carmel's 92:** stays, with three math courses counted at two levels each.
6. **Cannon's superseded record:** the individual instructors in 16 Provider cells are withheld, in
   the record, its note and the content chunk. The 19 orphaned class-description units that carried
   the old catalog are deleted from the 18 after-school overlay and work files. Never restore them.
   One copy in the translators' `NOTES.md` is withheld too. One of the instructors is also on Cannon's
   published Learning Support staff list and stays named there, as staff. Two current class titles
   of the form "... with Chef <first name>" are the published titles with an adult role, and stay.

### For Phase 2, beside the traps above

- **Cannon's old catalog units:** already dropped (item 6 above). The overlay builder copies any unit
  that has a translation, so never rebuild from an older work file. Confirm by count, printing no value.
- `check:metrics` exits 1 on `main` too, with the same one unmatched podcast subtopic.
- Do not print page-dump diffs: dump text can carry names. Compare by line number, count or boolean.

### Phase 1 handed back

The three design files were re-captured from the final build and verified byte for byte
(`.claude/docs/design-sync.md`). The user approved the English on 2026-11-23.

### Phase 2 (2026-11-23, nine locales)

**Method.** A fresh extract held 382 changed units per locale (9,918 English words). They were
spliced by stamp into the nine work files, with no index used. 268 units were paired with the
reviewed translation they replace, read from this branch's work files, never `main`'s, which still
held withheld names. The other 114 were paired with shipped siblings. Nine translator agents, one per
locale, worked from a brief carrying the student-name rule, and a validator checked figures, markup,
quotes, scripts, ratios and fa/ar ranges to 0 FAIL. Every job and output file had a name screen of 0.
The four chrome keys went into nine catalogs at their `en.json` position. `src/content` needed no
work: 45 blocks, 0 stale, in all nine.

**Proof by stamp,** per locale: every other unit kept byte for byte, 382 new, and only the fixes
below changed. 0 blank, 0 other changes.

**Older items (plan step 4), scoped to the exact units the round-4 translators flagged:**

- "million" in Country Day's two scholarship units: eight locales (French "million" is French).
- Three Latin affinity units whose school quotes were translated: back to English in ht, fa and ar.
- te `/week` and `/day` written in Telugu: 20 units.
- bn "Rising" rendered as "passed": 27 units, now "entering".

**Deviations.**

- **Quotes.** Where a replaced unit's reviewed translation had translated a school quote, all nine
  locales restored the English quote. Most keep the old translation as a short gloss in parentheses.
  Italian first kept six translated quotes and was sent back to fix them. Translated quotes remain in
  older, untouched units (see below).
- **Units.** es, fr and ar keep the predecessors' translated `/clase`, `/cours`, `/mes`, `/mois` in
  two units. The app's `localizeUnits()` does not touch them, so nothing doubles.
- **hi u226:** "Session 2" became सत्र 2, matching the 12 shipped session labels.
- **fa/ar u033 (Hickory Grove's admissions steps):** the five `→` pointed back at the previous step
  in right-to-left text, as the shipped predecessor did. They are now `←`, the convention of 33 fa and
  45 ar shipped units. Seen in Chrome before and after.
- **Money audit ran headless** after the user asked for no windows over their browser. It reads
  text after the page's scripts run, so a window changes nothing. PR #521 made that the default for
  the date and money audits.
- **One squashed commit was pushed** instead of the branch's history: two Phase 1 commits had
  re-added regenerated lines that still carried withheld names `main` held at the time.

**Verified on the final tree** (after merging `origin/main` at #521):

- `npm run build` passes every gate, `check:live` included.
- `check:runtime`, `check:chrome`, `check:dates`, `check:translations`, `check:fr`, `check:hi`,
  `check:fa` and `check:bidi`: all 0.
- `check:sepdrift` per locale: all 0. `check_figures.py` per locale: all 0.
- The path replay: TOTAL 0 in all nine locales.
- `check:digits`: 3,438 units compared, one to review, fr's deliberate "(4th grade)" gloss.
- `i18n:leaks`: within ±4 of `main` in every locale. Every new line is a keep that follows its
  shipped siblings: Carmel course titles and one coaching job title.
- Browser, `--all`:
  - `audit:daterender`: 0 English dates in all nine locales, including every checklist band.
  - `audit:moneyrender` (es, fr, it): 0.
  - `audit:mobile` at 320, 360 and 390px: 0 broken cards, 0 overflow.
- Render probe: every new unit's text was found on its page in all nine locales, all 26 admissions
  bands included. The three units not found are flags that never render: two `verify` flags (dev
  server only) and one Clubs `gap` flag.
- Compare's `20 / 107` and `15 / 107` read the right way round in ar.

**For the next round (found, not fixed here).**

- **English the translators found unclear** (approved English, left as is):
  - Country Day's "didn't win" list names boys lacrosse twice: as runner-up, and again under Durham
    Academy. This is also on `main`.
  - "Two students placed in two of those years" (Catholic's Arts card and its Compare tip) reads two
    ways.
  - Davidson Day's travel point says "before its current site" while College Support says the move
    is in 2027.
  - Latin's cost-planner note says "tuition only", then "they include the deposit".
  - Country Day's clubs tip, "one of them in both lists", is ambiguous.
  - "Up from 23" no longer names its year (Clubs).
  - "Provider or role" (Cannon's catalog intro) and "conference days" are unexplained.
- **Older translations:**
  - Translated school quotes remain in untouched units. A rough scan finds 247–398 quoted spans per
    locale that are not verbatim, most in native-reviewed units.
  - hi renders "median" as मध्यमान ("mean") in 14 shipped units, plus 6 that also say mean or
    average.
  - fa renders one after-school "physical development" as "organized activities".
  - `college-support` fee4d6c1 still translates its "34 Morehead-Cain recipients" quote in five
    locales, and bn keeps a hyphen before the case ending after "million".
