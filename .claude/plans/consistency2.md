---
name: consistency2
title: Fix the residue of plan `consistency` — 13 partial fixes, 30 new findings, R8 bug, three new rules
status: implemented
phases: 2
created: 2026-11-20
branch: fix/consistency2
prs: [509]
---

# Fix the residue of plan `consistency`

## Goal

Plan [`consistency`](consistency.md) (PR #507, deployed) fixed most of the 101 findings it set
out to fix. A re-scan of the deployed pages on 2026-11-20 found the rest:

- **13 partial or regressed fixes.** The fix landed in one place and missed a second place that
  restates the same fact.
- **30 new value conflicts** across 11 of the 13 schools.
- **A regex bug in the R8 report**, which hid one of the partial fixes.

This plan fixes all of them and adds three `check:consistency` rules for the shapes no rule
covers today. It also widens the data-dependents registry, so the biggest new group — a card
saying "not published" about something the same page now publishes — gets flagged the next
time a source changes. It worked when a fresh `pages2/` dump shows every row below in its
fixed form and the gate passes.

## Context

- **Worklists, durable copies:** [`consistency2-data/`](consistency2-data/) holds the four
  re-scan files:
  - `rescan-latin.md`
  - `rescan-pd-ccd-cannon.md`
  - `rescan-cc-cchs-cov-carmel.md`
  - `rescan-dd-gd-hg-k8.md`

  Each has a Part 1 table (prior rows, with status) and a Part 2 table (new rows, with file and
  line, the live evidence, and the proposed change). The folder also holds the two researcher
  briefs, `brief.md` and `brief2.md`. **Those tables are the authority for every item below.**
  This plan restates the change in one line. Line numbers are approximate: re-locate each one
  by its quoted text.
- **Scan basis:** `main` at `0e8882f6`. `dist/school/charlotte-latin/index.html` and
  `dist/school/providence-day/index.html` were byte-identical to the live pages
  (557,158 / 654,100 bytes). Page text was dumped with
  `python3 -I .claude/plans/consistency-data/dump_pages.py dist/school <out>`. One gap: text
  under a closed "Show sources" toggle is not in the dump, so check source lines in the data
  files.
- **The checker:** `scripts/check_consistency.mjs`. R1–R7 gate the build and are clean on
  `main`. `--report` adds R8, which groups "<number> <noun>" pairs per school and always exits
  0. The header docstring documents every rule. Read it first.
- **R8 bug, confirmed:** `PAIR` (~L367) is
  `/(?<![\d.,$])(~?\d[\d,]*\+?)\s+([A-Za-z][\w -]{0,40})/g`. `\w` matches digits, so in
  "9 varsity sports across roughly 28 teams" one match swallows "28 teams" and the pair is
  never seen.
- **The dependents registry:** `scripts/data_dependents.json`, printed by
  `scripts/notify_dependents.mjs` (PostToolUse hook, and `npm run dependents`). Its tests are
  in `scripts/notify_dependents.test.mjs` (`npm run test:dependents`). Only `course-offerings`
  is registered.
- **Phase 2 mechanics** are the ones `consistency` used. See its `## Implementation notes`
  → "Phase 2":
  - `scripts/i18n_splice_work.mjs` per locale;
  - token substitution for figure-only edits, asserting the replacement count;
  - minimal edits of the reviewed `t` for changed sentences;
  - central validation.

  The language-independent mechanism is in `.claude/docs/prose-translation-architecture.md`.

## Decisions

- **One PR, two phases** — the same shape as `consistency`.
- **CC-R4 follows the X7 ruling.** A monthly-billed school that publishes no month count is
  annualised over **9** months. An annual price is spread over **10** months to show a
  monthly figure. That is the existing practice for Cannon, Latin and Hickory Grove. The
  `aftercare-cost` row note states both conventions, which also fixes the X7 row-note residue.
- **PD-R7: keep "~19 (Global Map, 2021–25)" and drop the 16 + 4 arithmetic.** The breakdown
  mixes two year windows. Replace it with: "The trips listed on this card (2022–23 to
  2026–27) reach 16 countries, the figure on Compare."
- **B items follow the established pattern:** both values shown and attributed, a dev-only
  `kind: 'verify'` flag, and an ask-the-school line where the card has a checklist. Where the
  area has no flag field (Global Exposure, Sports Offered), use a code comment, as CCD-27 did.
- **PD-R2 adds the ceramics value only if the course text names ceramics.** The `artsMatrix`
  ceramics claim ← `3D Design` goes in only if the 2026–27 3D Design description literally
  names ceramics (record: `source-material/course-offerings/providence-day/…2026-2027.md`).
  `check:matrices` requires the exact course title. Otherwise leave it out.
- **New rules gate only if at zero after the fixes.** Otherwise they ship as report lines with
  the reason, the `consistency` rule (a checker parked non-zero stops being read).
- **CC-9's "roughly 96" Compare qual is not a value conflict.** It has the same number. Leave
  it.

## Approvals needed

1. **Build gates R9–R11** (step 3) join `npm run build` through `check:consistency`. This is
   the same kind of approval `consistency` asked for its R1–R7.
2. **Three data defaults**, which apply unless the user rules otherwise:
   - **CC-R3 Knights Nations Club:** not counted. A visible scope line says it is named only
     in an undated school article. If the user confirms the club is current: Upper School 24,
     JK–12 39, Compare `us-organizations` 24.
   - **CAR-R2 Carmel `aftercare-cost`:** the cell stays $245/mo (≈$2,205/yr). Only the qual
     changes. The alternative, a kindergarten $475/mo cell, needs the kindergarten dismissal
     time, which is not recorded.
   - **CCD-R8 endowment ladder "$39,600/yr":** D, no change. The source page 404s at four
     URLs. It is revisited only if the user supplies the URL.

No item adds a card, section, tile, Compare row or metric key. Every change is data or label
text inside existing ones, so the UX gate does not apply.

## Source material

Fourteen `source-material/**/*.md` files carry a
`### Re-verification 2026-11-20 (plan \`consistency\`, re-scan)` section, appended during the
re-scan and **uncommitted** in the shared tree. Each holds the fetched URLs and verbatim
values. Every one sits under the file's single `## Method` heading, so the ingest drops it from
parent-facing content. Seven were first written as top-level `##` sections and were moved
under `## Method` during planning.

- admissions/charlotte-latin/…Live Dates Check 2026-11-10.md
- after-school/charlotte-christian/…Redesign Research 2026.md
- after-school/charlotte-country-day/CCD - After School - Redesign Research 2026.md
- college-support/providence-day/…School Profile 2026-2027.md
- course-offerings/charlotte-country-day/…Curriculum Guide.md
- course-offerings/providence-day/…Curriculum Guide Full Descriptions 2026-2027.md
- sports/charlotte-latin/…Redesign Research 2026.md
- sports/davidson-day/…Redesign Research 2026.md
- student-clubs/cannon/Cannon - Clubs - Honor Societies Web Check 2026.md
- student-clubs/charlotte-christian/…Clubs Redesign Deep Research.md
- student-clubs/charlotte-country-day/CCD - Student Clubs - Clubs Redesign Deep Research.md
- summer-programs/charlotte-country-day/CCD - Summer Programs - Camp Catalog.md
- the-arts/charlotte-christian/…Arts Redesign Deep Research.md
- the-arts/trinity-episcopal/…Program Overview and Ensembles.md

## Out of scope

- The user's standing D rulings: LAT-D1 (Latin camps), GD-24 (Gaston Day summer care) and
  CAN-3. Also LAT-13, which needs a component change, and CCD-R8 unless a URL arrives.
- R8 groups that are different facts sharing a noun. The worklists triage each.
- Any new card, tile or Compare row.
- Deploying. `npm run deploy` is the user's call, separately.

## Steps

### Phase 1 — English

0. **Branch and commit the evidence.**
   - `git checkout main && git pull --ff-only && git checkout -b fix/consistency2`.
   - Run `git status --short` and confirm the 14 source-material files above are modified.
     Another session may share the tree: stage **only** these paths, plus
     `.claude/plans/consistency2.md`, `.claude/plans/consistency2-data/` and the
     `.claude/plans/INDEX.md` row. Never `git add -A`; never `git stash`.
   - Commit: "consistency2: re-scan evidence and plan".
1. **Ingest.** Run the `ingest-source-material` skill. Every append is under `## Method`, so
   `src/content/**` should not change. Diff it and confirm. If `src/data/schools.json` comes
   back reordered (a known trap with multi-topic ingests), restore the HEAD order.
2. **Fix the R8 regex, then add R9–R11 in report mode** (`scripts/check_consistency.mjs`).
   Prove each rule on the **unfixed** data first, and save the output as
   `.claude/plans/consistency2-data/baseline.txt`.
   - **R8:** change the noun capture to `([A-Za-z][A-Za-z -]{0,40})`. The baseline must now
     show Carmel "teams: 28 vs 29" and Latin "camps: 232 vs 169". The camps pair is LAT-D1,
     left by ruling, and R8 is a report.
   - **R9, Sports Offered "N sports":** a stat value or headline "N sports" equals the number
     of distinct sport names across `offered.seasons[].sports[].name`. Strip
     "(Boys)/(Girls)/(B & G)" and the like before comparing. It passes when the card's
     `footnote` also states the list's count (an attributed split, like R4b's qual escape).
     The baseline must catch LAT-R2 (17 vs 16).
   - **R10, summer camp weeks:** a camp row `desc` saying "offered in N (of the M) weeks",
     with N in digits or a word (one–twelve), equals the number of `;`-separated entries in
     that row's `weeks`. The baseline must catch CCD-R3: Tumble "six" vs 7, and Outdoor
     Adventure and Camp Buccaneer "four" vs 3.
   - **R11, Financial Aid components:** in each `financialAidReport` section with
     `components`, check three things:
     - the leading count in `componentsTitle` and `componentsNote` ("Fifteen …", digits or
       words) equals `components.length`;
     - "N unpriced" equals the number of `status: 'unpriced'`;
     - a percentage in `componentsAside` or `componentsNote` equals
       `Math.round(unpriced / length × 100)`.

     The baseline must catch X6-PD (Fifteen vs 16; 60% vs 56%).
   - Update the header docstring for R8's fix and R9–R11.
3. **The 13 partial and regressed fixes.** Sources and lines are in the Part 1 tables.

   | ID | File(s) | Change |
   |---|---|---|
   | LAT-3 | `afterSchoolPrograms/charlotte-latin.ts` ~L31 footnote, ~L327 and ~L333 verdict | Footnote: "…evenly with each day on three of the five rows; the two 4:30 rows break the pattern (see The Cost Planner)". Both verdict lines: "mostly linear pricing". |
   | HG-16 / HG-R1 | `financialAidReports.ts` ~L2341 (HG Q3) | "Are there other 'student services fees' beyond the after-school childcare rate, and where can we see them before enrolling?" |
   | CCHS-17 | `learningSupport/charlotte-catholic.ts` ~L125 tile, ~L379 headline, ~L167 `verdicts.social.head` | "a Director of Counseling and five school counselors". The 21-staff total stays. |
   | COV-27 | `sportsPrograms/covenant-day.ts` ~L51, ~L65, ~L75 season notes, ~L87 footnote | "8 sports / 4 sports / 6 sports"; "The 18-sport figure…" |
   | CAR-26 | `sportsPrograms/carmel-christian.ts` ~L27 headline | "…across roughly 28 teams" → "…across 29 teams" |
   | X6-PD | `financialAidReports.ts` ~L1704 title, ~L1705 aside, ~L1725 note | Sixteen components, 9 unpriced, 56%. Keep the >33% no-estimate rule. |
   | X6-CCD | `financialAidReports.ts` CCD Beyond Tuition enrichment item and Q3 (~L372 area) | Price enrichment as After School does: $260 full / $225 mini (program-directors page, CCD After School record). Recount: 4/10 unpriced, still over the threshold. Reword or drop Q3. |
   | X7 row note | `metricValues.ts` ~L1976 `aftercare-cost` `note` | Replace "assuming a 10-month school year" with both conventions: yearly totals from a monthly rate assume 9 billing months where none is published; an annual or semester price is spread over 10 months to show a monthly figure. |
   | PD-19 | `clubCatalog.ts` ~L251 PD catalog source line | "40 interest + 15 competitive" → "39 interest + 16 competitive". |
   | PD-26 → PD-R7 | `internationalTravel/providence-day.ts` ~L74-76 stat `note` | Per Decisions: keep ~19 (Global Map, 2021–25) and drop the 16 + 4 arithmetic. |
   | PD-27 | `artsPrograms/providence-day.ts` ~L39 tile, ~L329 verdict | "Studio Art" → "AP Art and Design". |
   | CCD-7 | `clubsPrograms/charlotte-country-day.ts` ~L124 externship tile | Show both values, attributed: "175+" and the school's "100+ employers", as College Support already does. |
   | CCD-9 | `artsPrograms/charlotte-country-day.ts` ~L321 Studio to Gallery | Name the National Art Honor Society chapter, citing Fast Facts (https://www.charlottecountryday.org/about/fast-facts). Drop the "could not be found" text. |

4. **New A fixes (18).** The Part 2 tables give the exact wording and evidence.

   | ID | File(s) | Change |
   |---|---|---|
   | LAT-R1 | `financialAidReports.ts` ~L1458, ~L1481 | Award timing: decisions are sent on notification day (26 Feb 2027 TK/K; 9 Apr 2027 Grades 1–11). No contract date is published. Drop the timing clause from the NOT PUBLISHED box. Cite https://www.charlottelatin.org/admissions/application-process. |
   | CC-R1 | `artsPrograms/charlotte-christian.ts` ~L53 headline, ~L60 tile | "honor societies for Music, Theatre and Visual Art"; tile label "(none for Digital Arts)". |
   | CC-R2 | `metricValues.ts` ~L1532 `signature-recognition` cell, its comment and its ~L1559 qual | "Blumey Best Musical (2013)". The source is the Blumenthal 2013 winners page. |
   | CC-R4 | `metricValues.ts` ~L1997 cell, ~L2020 qual | "≈$2,925/yr" ($325 × 9); the qual says "assumes 9 billing months, which the school does not publish". |
   | CCHS-R1 | `sportsPrograms/charlotte-catholic.ts` ~L380 | "…spans four decades, three sports and four leagues." |
   | COV-R1 | `collegeSupportPrograms/covenant-day.ts` ~L197, ~L680 | "at the school since 2003" in both places. |
   | CAR-R1 | `clubsPrograms/carmel-christian.ts` ~L82 | "…three of them with published GPA thresholds and induction windows." |
   | PD-R1 | `collegeSupportPrograms/providence-day.ts` ~L792, ~L933 | State the published Entrepreneurial Studies Diploma requirements: 5.5 credits, one external internship, a panel defense (2026–27 Course of Study pp. 12–14). The ask becomes how many students are enrolled or have finished. |
   | PD-R2 | `artsPrograms/providence-day.ts` ~L128, ~L278, ~L286, ~L325, ~L349 | Name the published theatre courses and the Foundations → AP Art and Design path. Ceramics: "taught within 3D Design; no kiln mentioned". Plus the conditional `artsMatrix` ceramics claim (Decisions). |
   | PD-R5 | `sportsPrograms/providence-day.ts` ~L262 | "overwhelmingly" → "most of their commits … 19 of 31 in 2024–26". Recount from the roster. |
   | PD-R6 | `internationalTravel/providence-day.ts` ~L638 | "five world languages, three of them from TK". |
   | CCD-R1 | `artsPrograms/charlotte-country-day.ts` Music and Studio to Gallery (pages2 ~L1147-1171) | Cite the course guide's three "by audition" groups. Move Percussion Ensemble to open enrollment. Name the AP Studio and IB Art titles. |
   | CCD-R2 | `clubClusters.ts` ~L249 (CCD Model UN) | "Delegations of 10–20 to UNC (MUNCH) and Virginia (VAMUN), 2024–26". Drop Duke, which is Cannon's trip. |
   | CCD-R3 | `summer/charlotte-country-day.ts` ~L799 Tumble desc; the Outdoor Adventure (~L66) and Camp Buccaneer rows' `weeks` | Tumble "seven". Add "June 29-July 2" to the two rows' `weeks` per the 2026 priced listing. Their "four" then holds. |
   | CCD-R4 | `metricValues.ts` ~L2146 `summer-camps` qual and the CCD summer intro | "roughly 85" → "roughly 75" distinct camp titles, at both places. |
   | CCD-R5 | `financialAidReports.ts` ~L359 (CCD) and the Cannon Q8 (~L626) | CCD: "Four years of documented rates" with the 4.7–4.8%, 5.1–5.3% and 5.0% steps. Cannon: drop Q8, or reword it to ask for rates before the six years shown. |
   | CAN-R1 | `artsPrograms/cannon.ts` ~L268, ~L375 | Credit the Tri-M chapter (Upper School page) and drop it from the ask. |
   | PD-R4… | *(B, see step 5)* | |

5. **B items (4)**, each attributed with a dev verify flag or code comment.
   - **LAT-R2:** `sportsPrograms/charlotte-latin.ts` ~L82 footnote: "The school states
     17 sports, but its own directory lists 16 (24 boys' and girls' programs); it does not say
     what the 17th is." The tile stays 17, and R9 passes on the footnote escape.
   - **DD-R2:** `collegeSupportPrograms/davidson-day.ts` ~L680 attributes both views: the
     2026–27 profile names Greece (since 2017); the Global Studies page and the 2027 schedule
     list Spain, Portugal and Belize. Add the Global Exposure ask "Does AFAR still dig in
     Greece?" Global Exposure keeps its "3", labelled as the current schedule.
   - **PD-R3:** College Support transcript card (~L583). The 2026–27 profile lists French 8
     (post-AP) and Latin 5–6; the 2026–27 Course of Study has neither. Show both, with a verify
     flag and an ask.
   - **PD-R4:** College Support (~L738). "100% … four-year colleges" (profile) vs Central
     Piedmont Community College bolded as enrolling (Class of 2023–26 key). Show both, with a
     verify flag and the ask "which class does the 100% describe?"
6. **C labels (7)**, with no value change.
   - **DD-R1:** `sportsPrograms/davidson-day.ts` ~L57 tile label "teams, as the school counts
     them", plus one footnote sentence on the split MS teams (35 vs 33 chips).
   - **TRI-R1:** `artsPrograms/trinity-episcopal.ts` ~L98-99 rungs: "Lower School general
     music · K–4" and "The ensemble choice · 5 (still Lower School)".
   - **CC-R3:** a visible line on the club catalog's Count & scope row. Knights Nations Club is
     named in an undated school article, is not on the Upper School list, and is not counted.
     This is the default from Approvals 2.
   - **CAR-R2:** `metricValues.ts` ~L2036 qual: "for grades 1–8 after the 3:00 dismissal; a
     kindergartner in Young Cougars Club adds $230/month ($475 to 6:00)".
   - **CCD-R6:** the CCD After School summer band (pages2 ~L2333): attribute "150+ camps, from
     June 8" to the marketing page and "132 priced camps from June 1" to the listing.
   - **CCD-R7:** the CCD Arts tile, or the Compare `ensembles` qual: the school's 8 uses a
     narrower definition than the 12 groups and classes on the board.
   - **CAN-R2:** `artsPrograms/cannon.ts` ~L325: "2025-26 catalog" → "2026–27 catalog".
7. **Widen the dependents registry** (`scripts/data_dependents.json`).
   - In the `course-offerings` entry, extend the `why` of the `artsPrograms`,
     `collegeSupportPrograms` and `internationalTravel` review rows: also any "not published",
     "could not be found" or "undocumented" claim the new catalog now answers. These are
     PD-R1, PD-R2, CCD-R1 and PD-R6.
   - Add an `honor-societies` entry:
     - trigger: `src/data/clubsPrograms/**`, `source-material/student-clubs/**`;
     - review: `src/data/artsPrograms/<slug>.ts`, the Music and Studio rungs and the
       checklist asks;
     - why: Tri-M, NAHS and ITS chapters are restated on the Arts card (CCD-9, CAN-R1).
   - Add a case to `scripts/notify_dependents.test.mjs` for the new entry, and update the
     "Only `course-offerings` is filled so far" sentence in `CLAUDE.md`
     (Testing and verification conventions).
8. **Gate.** Run `node scripts/check_consistency.mjs` and `--report`.
   - R9–R11 that read zero join the gated list (~L420) and the "R1–R7" wording in the
     docstring, the summary lines, and the `CLAUDE.md` bullet "A headline must agree with the
     list beneath it".
   - Any that cannot reach zero stay report-only, with the reason in the docstring.
   - Re-triage R8 with the fixed regex and record each group's verdict in the PR body.
9. **Verify** (see Verification below). Then open a **draft** PR with the body via
   `--body-file`, update the INDEX row to *In progress*, and set the plan status to
   `in-progress`.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English.**

### Phase 2 — Every other locale

Research prose only, via the overlay layer for every locale in `PROSE_TRANSLATED`
(`src/lib/i18n.ts`). No `src/locales/*.json` key is expected to change. If one does, it goes
in all ten catalogs in `TRANSLATED`.

1. **Extract and splice.** Run `scripts/i18n_extract.mjs` for each locale, then
   `scripts/i18n_splice_work.mjs`. Join by stamp; never pop on apply (stamps can recur across
   topics). Report kept / added / dropped / refreshed counts.
2. **Carry over figure-only edits** (e.g. X6-PD's counts, CCD-R4's 85 → 75, CC-R4's $) by
   token substitution, asserting the replacement count per locale.
3. **Translate the changed sentences** as minimal edits of the reviewed `t`. Run one agent per
   locale in a private directory (parallel agents collide in a shared scratchpad), then
   validate centrally: digits, markdown, script, length ratio.
4. **Build the overlays,** then run the locale checks under Verification.
5. Mark the PR ready, merge with `gh pr merge --squash --delete-branch`, pull `main`, flip the
   INDEX row to *Implemented* with the PR link, and set the plan status to `implemented` with
   `## Implementation notes`. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `scripts/check_consistency.mjs` | R8 regex; new R9–R11; docstring; gated list |
| `scripts/data_dependents.json`, `scripts/notify_dependents.test.mjs` | widened `course-offerings` whys; new `honor-societies` entry |
| `src/data/afterSchoolPrograms/charlotte-latin.ts` | LAT-3 |
| `src/data/financialAidReports.ts` | HG-16, X6-PD, X6-CCD, LAT-R1, CCD-R5 (CCD + Cannon) |
| `src/data/metricValues.ts` | X7 note, CC-R2, CC-R4, CCD-R4, CAR-R2 (and CCD-R7 if the qual is used) |
| `src/data/learningSupport/charlotte-catholic.ts` | CCHS-17 |
| `src/data/sportsPrograms/{covenant-day,carmel-christian,charlotte-catholic,providence-day,charlotte-latin,davidson-day}.ts` | COV-27, CAR-26, CCHS-R1, PD-R5, LAT-R2, DD-R1 |
| `src/data/clubCatalog.ts`, `src/data/clubClusters.ts` | PD-19, CC-R3, CCD-R2 |
| `src/data/clubsPrograms/{charlotte-country-day,carmel-christian}.ts` | CCD-7, CAR-R1 |
| `src/data/artsPrograms/{providence-day,charlotte-country-day,charlotte-christian,cannon,trinity-episcopal}.ts` | PD-27, PD-R2, CCD-9, CCD-R1, CCD-R7, CC-R1, CAN-R1, CAN-R2, TRI-R1 |
| `src/data/artsMatrix.ts` | PD-R2 ceramics claim (conditional) |
| `src/data/internationalTravel/providence-day.ts` | PD-R7, PD-R6 |
| `src/data/collegeSupportPrograms/{providence-day,covenant-day,davidson-day}.ts` | PD-R1, PD-R3, PD-R4, COV-R1, DD-R2 |
| `src/data/internationalTravel/davidson-day.ts` | DD-R2 ask and label |
| `src/data/summer/charlotte-country-day.ts` | CCD-R3, CCD-R4 |
| `src/data/afterSchoolPrograms/charlotte-country-day.ts` | CCD-R6 |
| `src/data/overlays/*.json` | Phase 2 |
| `CLAUDE.md` | check:consistency rule list; dependents sentence |
| `.claude/docs/DATA-SCHEMA.md` | regenerate (`npm run schema`) only if a change moves it |

## Verification

### Phase 1 — English

- [ ] `.claude/plans/consistency2-data/baseline.txt` shows R9, R10 and R11 catching LAT-R2,
      CCD-R3 and X6-PD on the unfixed data, and R8 showing Carmel 28 vs 29.
- [ ] `node scripts/check_consistency.mjs` exits 0 after the fixes; `--report` R8 triaged.
- [ ] `npm run test:dependents` passes; `npm run dependents` lists both entries on this branch.
- [ ] `npx tsc -b` is clean, and `npm run build` succeeds (every chained gate:
      `check:matrices`, `check:tuition`, `check:cardlink`, `check:spelling`, `check:flags` …).
- [ ] The plain-language hook: data edits made by script bypass it, so run
      `node scripts/check_plain_language.mjs --hook` over each changed file before each commit.
- [ ] Re-dump with `python3 -I .claude/plans/consistency-data/dump_pages.py dist/school <out>`
      and tick each of the 43 IDs against the new dump. Check the "Show sources" lines in the
      data files.
- [ ] `npx vite preview`, then `npm run audit:mobile`, `npm run audit:moneyrender` and
      `npm run audit:daterender` (default branch scope).
- [ ] Browser checks:
  - PD Global Exposure tile;
  - Latin and Covenant Sports Offered;
  - CCD Summer (Tumble, Outdoor Adventure);
  - Compare › After School (CC ≈$2,925/yr, row note);
  - Compare › The Arts (the PD ceramics cell, if added).

### Phase 2 — Locales

- [ ] `npm run check:live`, `npm run check:runtime`, `npm run check:chrome` — clean
- [ ] `npm run check:digits`, `npm run check:sepdrift -- --lang <code>` for each locale,
      `npm run check:dates`, `npm run check:moneytext` — no new findings
- [ ] `python3 scripts/check_figures.py --topic <topic> --lang <code>` for each touched topic
- [ ] Browser spot check in `fa` (RTL ranges such as "10–20", "4.7–4.8%") and `hi`/`te`
      (grouping on $2,925)

## Risks

| Risk | Mitigation |
|---|---|
| Inserting `weeks` entries or ask lines shifts overlay `at` paths | Phase 2 re-splices by stamp; append rather than insert where order is free |
| R9/R10 over-match other schools ("sports" in prose, "weeks" in non-camp text) | Restrict to the named fields; calibrate in report mode; gate only at zero |
| The shared tree has another session's uncommitted files | Stage explicit paths only; `git status --short` before every commit |
| A "not published" claim is reworded without the source | Every PD-R1/PD-R2/CCD-R1 rewording cites the 2026–27 or current course guide record |

## Open questions

- **CC-R3:** is Knights Nations Club current? — **default:** not counted; scope line added.
- **CAR-R2:** should the Carmel cell become the kindergarten $475/mo? — **default:** no; qual
  only.
- **CCD-R8:** the endowment page URL. — **default:** no change.

## Implementation notes

### Phase 1 (English), 2026-11-20

Built on `fix/consistency2`. The user approved the R9–R11 gate (gate at zero) and all three
data defaults before the build.

- **Ingest.** The plan expected no `src/content` change. Twelve content files did change:
  each appended `## Method` section displaced a trailing `---` rule, and four files caught up
  with source-material edits already on `main` from plan `consistency` (Davidson Day 86
  courses and win percentages, Providence Day 38 students, Charlotte Christian Lower School
  JK–4). `schools.json` came back reordered and was restored to its HEAD order (byte-identical).
- **R9 calibration.** Schools count sports on different bases, so R9 also passes when the
  figure equals the row count (one row per boys' or girls' program: Covenant Day, Gaston Day),
  when one footnote sentence names the figure and says what it counts "separately" (Charlotte
  Christian, Charlotte Country Day, Providence Day), and it skips a range ("12–14 sports",
  Hickory Grove). Only tiles whose caption *is* the sport count are read, so "42 state titles
  in 7 sports" is not.
- **R9 found two items the plan did not list:** Cannon and Davidson Day each say "13 sports"
  (the school's figure) above a list naming 14. The user chose to attribute both like LAT-R2:
  a footnote sentence at each, and Davidson Day's tile caption "sports, as the school counts
  them". R9 then reads zero and joins the gate.
- **R10** reads Cannon's and Charlotte Christian's "Weeks 1, 2, 3" / "Weeks 1-6" form as well
  as `;`-separated dated sessions. **R11** accepts either counting basis for "unpriced"
  (`unpriced`, or `unpriced` + `range` as Latin counts it), but the title, note and
  percentage must agree with each other.
- **Deviation, CCD-R3.** Outdoor Adventure and Camp Buccaneer already have their own
  "four-day week" rows for June 29–July 2, so adding that week to the main rows would list it
  twice. Their descs now say "offered in three weeks here, plus the shortened July 3 week
  (listed separately)". Tumble reads "seven".
- **Deviation, TRI-R1.** The K–4 rung also holds visual art and performances, so it is named
  "Lower School, before the ensemble choice" rather than "Lower School general music". The
  grade-5 rung is "The ensemble choice (still Lower School)".
- **CCD-R5:** Cannon's Q8 was dropped rather than reworded. **CCD-R7** went in the ensemble
  board caveat (the worklist's proposal), not the tile or Compare qual. **PD-R2:** the
  2026–27 3D Design description names ceramics, so `artsMatrix` gains
  `ceramics: { US: { course: '3D Design' } }`; `check:matrices` passes and DATA-SCHEMA moves
  9/11 → 10/11.
- **CCD-R1** also renamed the "Chamber / Honors Choir" chip to the course guide's "Honors
  Chamber Choir" and reworded the audition ask, whose "the pages never state audition
  requirements" was no longer true. **CAN-R1** relabelled the rung "External honors — mostly
  not documented" and added the Upper School page to the card's sources.
- New verify flags (PD-R3, PD-R4, DD-R2) were **appended** to their `flags` arrays so no
  existing overlay path shifts. The DD Greece ask was appended too ("thirteen" → "fourteen").
- `scripts/notify_dependents.mjs` learned to read the school from a per-school module path
  (`src/data/<dir>/<slug>.ts`), so the new `honor-societies` entry names that school's Arts
  card. Two tests added (8/8 pass).
- **Plan step 9 said to open a draft PR in Phase 1.** `/implement` keeps Phase 1 on the
  branch without a PR until the English is reviewed, so the PR opens in Phase 2.
- **`npm run build` stops at `check:live` in Phase 1**, with 40 stale stamps per locale (the
  English this plan changed). That is the expected English-first state; Phase 2 clears it.
  Every gate before it passed, and each gate after it was run on its own and passed:
  `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates`, `check:spans`,
  `check:news`, `check:photos`, `check:cardlink`.
- **Browser audits** (default branch scope, 13 pages). `audit:moneyrender` passes.
  `audit:mobile` first caught one card of this plan's own making: the CCD-9 sentence carried
  the bare Fast Facts URL, an unbreakable token 1px too wide at 320px. The URL moved to the
  card's sources list, and the re-run passes at 320/360/390. `audit:daterender` reports the
  same 5 English dates in each of the nine locales, all in strings this phase changed (Latin
  `26 Feb · 9 Apr` and its award-date detail, CCD's two camp descs and the summer band). All
  are extracted fields (`when` is prose globally), so Phase 2 clears them.
- Browser checks: PD Global Exposure tile, Latin and Covenant Sports Offered, CCD Summer
  (Tumble, Outdoor Adventure), Compare › After School (CC ≈$2,925/yr, the row note; Carmel's
  qual is a hover tip), and Compare › The Arts, where PD's Ceramics cell now reads YES · US.
  A fresh page dump ticks every ID (51 checks, 0 failures).

### Phase 2 (nine prose locales), 2026-11-20

Same branch, run in a fresh window after the user approved the English.

- **Splice.** `i18n_splice_work.mjs` per locale: 15,552 kept, 85 added, 76 dropped. Ten topics
  moved (admissions, high-school-placement and course-offerings did not). A by-stamp audit
  against HEAD found 0 of 139,977 kept translations changed. No `src/locales/*.json` key
  changed, and the twelve Phase 1 `src/content` edits needed no content-overlay work
  (`check:live` gate 2 passes).
- **Carry-over.** 7 units differed from their predecessor only in a figure (CCD 5 → 4 unpriced,
  50% → 40%, PD 60% → 56%, CC ≈$3,250 → ≈$2,925, CCD 85 → 75 camp titles twice, Cannon
  catalog 2025-26 → 2026–27). They kept their `t`, with each token substituted and the
  replacement count asserted at 1 per locale.
- **Translation.** 78 units per locale, 67 as minimal edits of a reviewed `t`. One agent per
  locale worked in a private directory, and each locale was validated centrally for digits,
  markdown, native digits and isolates, script share and length ratio before writing.
- **Kept deliberately.** "Blumey Best Musical (2013)" stays English in bn, ht, te, fr, it and
  hi, as their reviewed "Blumey Best Show" did. ar and fa keep the reviewed "ninth grade" word
  in the CCD audition question; the ar agent had changed it to a digit, and that change was
  reverted to the reviewed form. `check:digits` reports these 2 plus the "5th/6th" → "5/6"
  grade labels in ar and hi (4 to review, all deliberate).
- **Checks.** `check:live`, `check:runtime` (15,682 entries per locale), `check:chrome`,
  `check:dates`, `check:moneytext`, `check:money`, `check:currency`, `check:bidi`,
  `check:fa`, `check:hi` and `check:fr` all pass. `check:sepdrift` finds 0 drifted figures in
  every locale. `check_figures.py` passes for all 10 topics × 9 locales, and `npm run build`
  passes. `i18n:leaks` flags no new unit except the kept Blumey name and fr "8 sports", which
  is correct French. `check_work_integrity.mjs` reports the usual post-splice 147 per locale
  (the by-stamp audit above is the real check). `audit:daterender` (branch scope) is clean in
  all nine locales, which clears the 5 dates Phase 1 left English.
- **Browser (real Chrome).** In fa and ar, "4.7–4.8%", "5.1–5.3%" and ar "10–20" read
  left-to-right; fa writes "10 تا 20", which reads right to left as Persian prose should.
  hi and te show `$260 / $225` and `4.7–4.8%` with Western digits, and on Compare › After
  School `≈$2,925/वर्ष` and `≈$2,925/సం`.
