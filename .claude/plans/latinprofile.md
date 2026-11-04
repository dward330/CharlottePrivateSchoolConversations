---
name: latinprofile
title: Refresh Charlotte Latin from its 2026–27 Upper School Profile — merged 2023–2026 acceptance list (337 rows, bold = 2024–26 matriculation), 2026 AP results (92% of 833), SAT/ACT means, grading scale + no-rank policy, +0.5 Advanced weighting, 151 seniors; retire the "least transparent profile" thesis
status: english-done
phases: 2
created: 2026-11-03
branch: feat/latin-profile-2627
prs: []
---

# Refresh Charlotte Latin from its 2026–27 Upper School Profile

## Goal

Charlotte Latin published a **2026–27 Upper School Profile** (PDF created 2026-09-03). It
carries a new **College Admission Summary 2024–26** (292 institutions, 132 marked as
matriculated). It also **reverses the school's long-standing non-disclosure**: it now
prints 2026 AP results by subject, SAT and ACT means, junior and sophomore grade
distributions, the full grading scale and a "does not report class rank" statement.

Our College Support area is built around the opposite claim. Its headline says Latin
"publishes almost no class-level analytics", the verdict calls it "the least transparent
profile in this set", and Compare shows Latin's AP pass rate as *not published*. All of
that is now false.

This plan:

- merges the new acceptance list into the existing one to make a 2023–2026 window;
- rewrites every card claim the new edition overturns;
- fills Latin's Compare cells from the new figures.

It is done when, in English, Latin's College Support page and Compare match the new
profile, every new figure traces to
`Charlotte Latin - College Support - School Profile 2026-2027.md`, and no card still says
the school withholds data it now publishes. After Phase 2, `npm run build` must be green
in all ten locales.

## Context

### The source, already on disk (uncommitted)

[`source-material/college-support/charlotte-latin/Charlotte Latin - College Support - School Profile 2026-2027.md`](../../source-material/college-support/charlotte-latin/Charlotte%20Latin%20-%20College%20Support%20-%20School%20Profile%202026-2027.md)
was written during planning. It holds the full transcription:

- fast facts and the counseling masthead;
- the program prose, verbatim;
- the AP/Honors/Advanced course grid;
- the 2026 AP results table;
- both grade-distribution tables;
- the marking system and grading scale;
- the Global Seal of Biliteracy paragraph;
- the ACT and SAT tables;
- all 292 acceptance-list names with their asterisks, in printed order.

Provenance and the arithmetic checks are under its `## Method` heading, which the ingest
drops from the rendered page. **It is the authority for every figure below. Read it first.**

PDF URL, to be used for every new citation:

```
https://resources.finalsite.net/images/v1793645005/charlottelatin/izzo9suck4uojytpwadd/2026_27UpperSchoolProfileforCC1.pdf
```

The PDF **has a text layer**, so `pdftotext -layout` works. The AP and grade-distribution
tables are images. To re-check one, run `pdftoppm -f 3 -l 3 -r 300 -png` and read the
render. The AP table reconciles exactly: 833 exams, 766 scoring 3+ (91.96%), mean 4.10.

**The old edition is still live at its own URL**, unlike Cannon's (a different asset id):
`https://resources.finalsite.net/images/v1760637579/charlottelatin/qzxflgjmybf7ydg71xab/USProfile-2.pdf`
still serves the 2025–26 file. Citations to it are therefore still valid for
**historical** claims.

**The school's live Acceptances page lags.**
`https://www.charlottelatin.org/academics/college-counseling/acceptances` still reads
"Acceptances by the Classes of 2023-25" (checked 2026-11-03).

### What changed, edition to edition

| Fact | App today (2025–26 edition) | 2026–27 edition |
|---|---|---|
| Acceptance list | 2023–25, 300 institutions, 131 asterisks | **2024–26, 292 institutions, 132 asterisks** |
| AP results | "Not published" | **833 exams by 308 students, 92% scored 3+, mean 4.10**; per-subject table; Class of 2027: 357 exams, 95.23% |
| SAT / ACT | none since 2017–18 | **Means**: SAT 1308.5 (Class of 2026, N=123), 1303.0 (2027, N=117); ACT 27.2 (2026, N=58), 28.8 (2027, N=79) |
| Grading scale, weighting | dropped since 2017–18 | **Printed**: A+ 4.33 … F 0.00; +1 for Honors & AP; **+0.5 for Advanced** (not Advanced Functions w/Trig), decided spring 2026, retroactive for the Class of 2027 forward |
| Class-rank policy | not stated | **"does not report class rank"** |
| Grade distributions | none ever | **Junior and sophomore distributions, Class of 2027**, per course |
| AP subjects | 23 | **24** (the grid also names 24 AP courses) |
| Open-enrollment APs | "four" | **seven** (Business w/ Personal Finance, CS Principles, Cybersecurity, Networking Fundamentals, Economics, Environmental Science, Psychology) |
| AP Scholars | 418 (2023–25) | **357 (2024–26)**: 192 Distinction · 49 Honor · 116 Scholars |
| National Merit | 20 SF / 46 Commended (2023–25) | **27 SF / 50 Commended (2024–26)**; still no Finalists |
| Enrollment | 586 Upper School, 145 seniors | **1,555 total · 589 Upper School · 151 seniors** |
| Counseling masthead | Jennings, Smith, Cripps, Segura | unchanged |
| Faculty | — | 100 faculty/admin teaching staff, 60% advanced degrees |
| New programs | — | Global Seal of Biliteracy: 124 seals since 2024–25 (92 Functional, 32 Working) in nine languages |
| Internal editorial note | present ("…still here, yes?") | **gone** |
| Still absent | — | CEEB code, four-year matriculation %, Finalists, integrity/discipline block, named-scholarship history, percentiles, GPA quintiles |

### The file being rewritten

[`src/data/collegeSupportPrograms/charlotte-latin.ts`](../../src/data/collegeSupportPrograms/charlotte-latin.ts)
(830 lines):

- **Header comment (1–27):** describes Latin as "the outlier … for WHAT IT WITHHOLDS". It
  must be rewritten.
- **`colleges` (37–338):** 300 rows with `enrolling` from the 2023–25 asterisks.
- **`PROFILE` (340):** the 2025–26 URL, cited in `transcript`, `counseling`, `outcomes`,
  `edge`, `wholeClass` and `verdict`. `PROFILE_1718` (343) stays.
- **`ncAdmissions` (358–464):** government data. **Untouched.**
- **Cards:** `transcript` (465), `counseling` (538), `outcomes` (639), `edge` (679),
  `wholeClass` (725; `scoreTables: []`, `quintiles: []`), `verdict` (783).

[`src/data/metricValues.ts`](../../src/data/metricValues.ts), Latin cells:

- `ACCEPTANCE_WINDOWS['charlotte-latin']` = `'(2023–2025)'` (142).
- AP courses: `'22 AP subjects'` (223) and its qual (230–233).
- AP 3+: `null` (302), plus the row `note` (296) that names Latin as not publishing. It has
  no `subs` or qual for Latin.
- Buckets:
  - Ivy `5 / 8` (354/375)
  - Ivy+ `12 / 17` (404/425)
  - NU75 `68 / 75` (454/475)
  - LAC75 `42 / 75` (504/525)
  - P4 `61 / 68` (554/575–578). **That qual is already wrong**: it says "the figure shown,
    53".
  - HBCU `7 / 107` (825/846)
- Counselor caseload: `'~36:1'` (873/894).

Line numbers are as of `main` at `04f06930`. Re-locate them by grep.

**Nothing else cites the profile.** A grep for the old URL and for "2025–26 Upper School
Profile" across `src/` hits only `charlotte-latin.ts`. The clubs, arts, course-offerings and
financial-aid files are untouched (the course-offerings Compare qual is the one exception;
see Decisions).

### The acceptance-list machinery (read §3 of `DATA-SCHEMA.md` first)

The rules are in [`DATA-SCHEMA.md`](../docs/DATA-SCHEMA.md) around lines 603–690:

- Entries are `{ name, cats, enrolling? }`. Ranks and URLs resolve from the masters
  (`rankLabelFor`, `urlFor`). Never inline them.
- `cats` are derived from the masters.
- Counts are **institutions** via `canonicalRanked()` / `canonicalMember()`, and live on
  **four surfaces** that must agree: the buckets row, the stat tile, the Compare cell and the
  qual sentence.
- **"The acceptance window is the widest the school's own lists genuinely support … When a
  window combines two published lists, each institution appears ONCE, and where the lists
  spell one institution differently the row carries the institution's official name."**
  Cannon did exactly this (`cannonprofile`, "Revisions after the Phase 1 review").
- Gates, all in `npm run build`: `check:ranks`, `check:collegeurls`, `check:buckets` (which
  also checks `ACCEPTANCE_WINDOWS` against `collegesTitle`) and `check:memberships`.

### The merge, computed during planning

[`.claude/plans/latinprofile-data/merged-colleges.txt`](latinprofile-data/merged-colleges.txt)
holds the probe output: **337 rows** in TS-literal form, each tagged with its derived
`cats`, its `enrolling` flag (from the 2024–26 asterisk only) and a trailing comment
(`both` / `2023–25 only` / `2024–26 only` / `printed: …`). Treat it as a **worklist, not
gospel**: the gates decide. The comments must be stripped before pasting. The planning
probe gives:

- 255 institutions on both lists, 45 on the old list only and 37 on the new list only.
- 132 bold rows.
- Indicative buckets:

  | Bucket | Count |
  |---|---|
  | Ivy | **7 / 8** (absent Columbia; Princeton and Penn are new) |
  | Ivy Plus | **14 / 17** (absent Columbia, Johns Hopkins, Caltech) |
  | Top-75 National | **~73 / 75** |
  | Top-75 Liberal Arts | **~47 / 75** |
  | Power Four | **61 / 68**: 18 ACC · 15 SEC · 16 Big Ten · 12 Big 12 |
  | HBCU | **9 / 107**: Hampton, Howard, Morehouse, Morgan State, NC A&T, NC Central, Spelman, Virginia State, Winston-Salem State |

  The Power Four absences are Minnesota, Nebraska, BYU, UCF, Houston and Kansas State. UT
  Austin is listed only as "University of Texas", which follows the Cannon / Country Day /
  Providence Day precedent of tagging `nu75` only, never `p4`.

**Spelling variants merged to one row each.** Each row uses the name another school's list
already uses, so it resolves in the masters:

| Old (2023–25) | New (2024–26) | Merged row name |
|---|---|---|
| Franklin & Marshall College | Franklin and Marshall College | Franklin & Marshall College |
| Indiana University | Indiana University (Bloomington) | Indiana University (Bloomington) |
| North Carolina A & T State University | North Carolina A&T State University | North Carolina A&T State University |
| Pace University | Pace University (New York City) | Pace University (New York City) |
| Queens University | Queens University of Charlotte | Queens University of Charlotte |
| The University of Alabama | University of Alabama | The University of Alabama |
| The University of Tampa | University of Tampa | The University of Tampa |
| The University of Tennessee | University of Tennessee | The University of Tennessee, Knoxville |
| The University of Tennessee (Chattanooga) | University of Tennessee (Chattanooga) | University of Tennessee at Chattanooga |
| The University of Texas | University of Texas | University of Texas |
| University of Alabama at Birmingham | University of Alabama (Birmingham) | University of Alabama at Birmingham |
| University of Colorado Boulder | University of Colorado (Boulder) | University of Colorado Boulder |
| University of Illinois at Chicago | University of Illinois (Chicago) | University of Illinois Chicago |
| University of Illinois at Urbana-Champaign | University of Illinois (Urbana-Champaign) | University of Illinois Urbana-Champaign |
| University of North Carolina - X | University of North Carolina (X) | University of North Carolina at X (Asheville, Chapel Hill, Charlotte, Greensboro, Wilmington) |
| Oxford College of Emory University | Emory University (Oxford) | Oxford College of Emory University |
| SUNY at New Paltz | SUNY New Paltz | SUNY New Paltz |

`Embry-Riddle Aeronautical University` (old, campus unstated) and `Embry-Riddle
Aeronautical University (Prescott)` (new) **stay separate**: the old row may be Daytona, and
DATA-SCHEMA says look-alikes are not merged on a guess.

**Masters gaps.** Twelve merged names have no homepage URL:

- Anderson University (South Carolina)
- Brunel University London
- City St George's, University of London
- Embry-Riddle (Prescott)
- Kettering University
- Lawrence University
- Marymount Manhattan College
- Queen Mary University of London
- SUNY New Paltz
- University of British Columbia
- University of Dallas
- University of Tennessee at Chattanooga

URLs are **optional** (`check:collegeurls` does not assert coverage), but add a verified row
for each that has a clear homepage. About 78 names have no rank label. Most are
legitimately unranked: Regional, foreign or specialty schools. The ones worth looking up,
because they may hold a National or National Liberal Arts rank, are:

- University of Illinois Chicago (Cannon's master row may already cover the spelling)
- University of Tennessee at Chattanooga
- Lawrence University
- Kettering University
- University of Dallas
- Taylor University

A rank row is needed only where U.S. News gives a **National or National Liberal Arts**
rank; Regional rankings are not shown. **A missing rank is a valid confirmed-null.
Never guess one.** US News lookups need headed Chrome (memories
`usnews-fetch-needs-headed-chrome`, `verify-scraped-profile-is-the-right-school`).

### Score tables with averages

`ScoreTable.noPercentiles` (`src/data/collegeSupport.ts`) exists for exactly this case: a
school that publishes **means**, not percentiles (memory `wholeclass-nopercentiles-rule`).
Follow Covenant Day's shape (`covenant-day.ts` ~600–625): rows labelled per class, values
like `'SAT 1309'`. Do not file a mean under a percentile column.

### Why two phases

This plan rewrites research prose in the `college-support` and `metric-values` overlay
topics, so it ships English first, then the nine `PROSE_TRANSLATED` locales (es, bn, ht,
te, fr, fa, it, hi, ar, per `src/lib/i18n.ts`). **No `src/locales/*.json` chrome
changes.** College names, figures and `cats` are not translated.

## Decisions

- **Full refresh, not just the list.** The new profile overturns the area's central thesis,
  and leaving "publishes no AP score distribution" beside a citation that now prints one
  would ship a false claim. The `cannonprofile` precedent did the same.
- **Merge the two lists into 2023–2026: 337 rows, each institution once**, per
  DATA-SCHEMA's widest-window rule and the Cannon review decision. Settings:
  - `collegesTitle: 'Every acceptance, 2023–2026'`
  - `ACCEPTANCE_WINDOWS['charlotte-latin']: '(2023–2026)'`

  This is also the project's 2023-floor target window. Rows follow alphabetical order of
  the merged name.
- **Bold (`enrolling: true`) = an asterisk on the 2024–26 list only. This is the user's
  instruction (2026-11-03): "use the bold to show matriculation for latest class we
  have".** 132 rows. Old-only asterisks lose their bold, among them Bowling Green, Cal Poly,
  Dickinson, FIU, Occidental, Ringling, Rutgers–New Brunswick and Skidmore. Oxford College
  keeps it via the new list. Settings:
  - `collegesTotal: '337 institutions · bold = at least one student enrolled, 2024–26'`
  - The comment above `colleges` explains that the 2023–25 asterisks were deliberately not
    carried.
- **Official names for variant pairs**, per the table in Context. A name on only one list
  keeps its printed spelling. Never "correct" a printed name otherwise.
- **Keep the 2025–26 URL, renamed `PROFILE_2526`, and add `PROFILE_2627`.** The old edition
  is still live and still the source for the 2023–25 half of the list, the 2023–25 merit
  aggregate and the "what it used to omit" history. Every *current* claim cites
  `PROFILE_2627`. Keep `PROFILE_1718`.
- **`wholeClass.scoreTables` gets one table, `noPercentiles: true`:**
  - `title: 'SAT & ACT class means'`, `hint: '— as of 8/6/26 · testers shown per row'`
  - rows `{ label: 'Class of 2026', values: ['SAT 1308.5 (N=123)', 'ACT 27.2 (N=58)'] }`
    and `{ label: 'Class of 2027', values: ['SAT 1303.0 (N=117)', 'ACT 28.8 (N=79)'] }`.
    The figures are char-for-char as printed: `1308.5` and `1303.0`, never rounded.
  - The note says these are means only, with no percentiles or middle-50% band. The Class
    of 2027 figures are partial, since that class is still testing. The 2026 tester counts
    (123 SAT, 58 ACT) are set against the profile's 151 seniors in the **2026–27** class;
    the Class of 2026's own size is not printed, so do not compute a testing rate.
- **`quintiles` stays empty.** There is still no GPA distribution. Put the grading scale and
  the no-rank statement in `transcript.trust`.
- **The grade distributions go in as one `wholeClass.middle` row, not a new table.**
  Figures:
  - Junior year (Class of 2027): 524 of 833 course grades in the A range (A+/A/A−), **63%**.
  - Sophomore year: 457 of 806, **57%**.

  These are counted from the profile's tables over its own "#" column, are whole-number
  percentages, and are labelled as our count. Adding a grade-distribution table would be a
  new presentation, so it is out of scope.
- **Compare, AP scoring 3+.** Settings:
  - `'charlotte-latin': '92%'`, with comment `// 2026: 766 of 833 exams (91.96%), 308 students, mean 4.10`
  - `subs: '(2026)'`
  - qual (kind `scope`): "92% of 833 AP exams scored 3 or higher in 2026 (308 students;
    mean score 4.10). Latin requires every AP student to sit the exam. A score of 3+ is the
    level most colleges treat as a passing result."
  - The row `note` drops Charlotte Latin from its list of non-publishers.
- **Compare, AP courses.** The cell `'22 AP subjects'` is sourced to the live course page, so
  leave it. Append to its qual: "The 2026–27 Upper School Profile says AP is offered in 24
  subjects." This follows the Cannon precedent of not showing two counts on one page.
  However, the transcript card cites the profile, so its stat becomes `'24'`.
- **Counselor caseload: `'~38:1'`**, from 151 seniors ÷ 4 counselors (37.75). The qual
  reads "About 38 seniors per college counselor at peak application season — 151 seniors
  in the 2026–27 class across 4 counselors (computed; the school publishes no ratio). A
  lower ratio means more counselor time per student." The card tile becomes `'~1:38'`.
  The verify flag becomes 589 ÷ 4 ≈ 147 and 151 ÷ 4 ≈ 38.
- **Fix the stale P4 qual** ("53"). It becomes the house sentence used for the other
  schools: "<n> of the 68 Power Four universities (ACC, Big Ten, Big 12, SEC, plus Notre
  Dame) appear on Charlotte Latin's published 2023–2026 acceptance lists, matched against
  the 2027 U.S. News tables — not a figure the school reports itself."
- **The Acceptances page stays cited, re-labelled** "College Counseling — Acceptances
  (Classes of 2023–25)". It is still a valid source for that half of the window.
- **Merit:** add a `merit` row `{ year: '2024–26', detail: '**27** Semifinalists · **50**
  Commended across the three classes (2026–27 profile aggregate)' }` above the 2023–25 row.
  Re-label the 2023–25 row "(2025–26 profile aggregate)". `meritNote` keeps its Class of
  2026 point. It updates "the current profile reports Semifinalists and Commended only" to
  say that **both** recent editions omit Finalists.
- **Array edits replace in place or append, never delete from the middle.** This avoids
  stale overlay `at` paths (memory `overlay-at-paths-go-stale-on-row-delete`). Every flag
  and checklist item below is rewritten at its existing index.
- **Course depth rows are re-sourced, not assumed.** Each `transcript.depth` row must be
  supported by the new profile **or** by the live course page
  (`https://www.charlottelatin.org/academics/upper-school/course-offerings`, which still
  lists Honors American Studies). Add that page to `transcript.sources` if any row leans on
  it.
- **Untouched:** `ncAdmissions`, the clubs/arts/course-offerings/financial-aid data files,
  and every other school's figures (unless a masters fix moves them; see Risks).

## Approvals needed

**None.** Every edit changes data inside existing cards, lists, stat tiles, score tables
and Compare cells. The `wholeClass` score table is an existing, already-rendered block
(`noPercentiles` is an existing flag) that Latin had left empty. No card, section, metric
key, component or style changes, so this is data enrichment under the UX-design standard.

## Source material

- **Written during planning (uncommitted):**
  `source-material/college-support/charlotte-latin/Charlotte Latin - College Support - School Profile 2026-2027.md`.
- **Planning worklist (uncommitted):** `.claude/plans/latinprofile-data/merged-colleges.txt`.
  Commit it with the plan.
- **To append during `/implement`:** a one-paragraph "Superseded 2026-11-03" note at the top
  of `Charlotte Latin - College Support - Acceptances Window 2023-2026.md`. It says the
  window is now 2023–2026, built by merging the 2025–26 and 2026–27 profile lists, and
  points to the new file. Its "2026 not published" finding is no longer true.
- `/implement` runs the **`ingest-source-material`** skill first. The `college-support`
  rule in `src/lib/metrics.ts` (`{ match: /school profile/i, key: 'outcomes' }`, ~line
  220) already folds a "School Profile" file onto `outcomes`, so no new card should appear.
  Confirm with `npm run check:metrics` / `npm run schema`.

## Out of scope

- Fast facts with no home in the app: total enrollment, faculty count and degrees,
  leadership names, Global Seal of Biliteracy, core values. These stay in source-material
  only. Surfacing them needs UX approval.
- A grade-distribution table or an AP-by-subject table on the card. Both are new
  presentations; this plan carries one summary row and the aggregate figures only.
- Course Offerings data changes. The live course page remains its source.
- Re-scoring other schools, or a new US News edition.
- `ncAdmissions` (government data).
- The Learning Support area, which was abandoned for Latin.
- Deploying. This plan never runs `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch and ingest.** `git checkout main && git pull && git checkout -b feat/latin-profile-2627`.
   Append the superseded note to the Acceptances Window file. Run the
   `ingest-source-material` skill for `college-support/charlotte-latin`. Diff the outputs
   (`.claude/docs/` notes, `src/data/schools.json`, `src/content/college-support/charlotte-latin.json`)
   and keep only Latin college-support changes. Memories
   `ingest-full-rebuild-sweeps-topics` and `two-topic-ingest-reorders-manifest` apply:
   restore the HEAD manifest order if it reshuffles. Grep the built content JSON for
   `source-material/`, backticks and "Claude Code"; it must be clean (memory
   `research-prose-renders-to-parents`).

2. **Rebuild `colleges`** in `charlotte-latin.ts`.
   - Replace the array with the 337 rows from `latinprofile-data/merged-colleges.txt`,
     stripping the `// …` comments.
   - Re-derive `cats` by running the four gates rather than trusting the probe:
     `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`.
     Read every violation as a question first (DATA-SCHEMA: "a membership violation is a
     question, not a verdict").
   - For each merged name that resolves no rank or URL, look it up and add **one row** to
     the master **and** its companion `.md`:
     - `src/data/collegeRankings.ts` + `source-material/college-support/_shared/US News 2027 - Rank Labels.md`
     - `src/data/collegeUrls.ts` + `source-material/college-support/_shared/College Homepages 2026.md`

     Otherwise leave it absent as a confirmed-null.
   - `check:collegeurls` fails on **orphan** rows. If a spelling only the old Latin list
     used (e.g. `University of North Carolina - Chapel Hill`, `Queens University`) is now
     unused by every school, remove its row from both the master and the `.md`, as Cannon
     did.
   - Write a scratch tally of the six institution counts. They feed steps 3 and 8.
   - Rewrite the comment above `colleges` to describe the merge, the 2024–26-only bold rule
     and its user-decision date.

3. **`outcomes` card.**
   - `headline`: "Four graduating classes produced acceptances at 337 institutions; 132
     carry the newest list's matriculation asterisk — at least one Latin student enrolled
     there in 2024–26." Use the real counts from step 2.
   - `subhead`: lead with breadth. "<n> of the 68 Power Four universities appear, the
     absences being …", from the step-2 absent list, plus "seven of the eight Ivies —
     Columbia is the only one missing".
   - `stats`:
     - `'337'` "institutions on the 2023–26 acceptance lists"
     - `'132'` "carry the 2024–26 matriculation asterisk"
     - `'7 of 8'` "Ivy League — absent Columbia"
     - `'<n> of 68'` "Power Four universities represented"
   - `buckets`: the step-2 counts. Notes:
     - Ivy: `'— six with a 2024–26 enrollee (all but Princeton); absent Columbia'`. Check
       the bold flags first.
     - Ivy Plus: `'— absent Columbia, Johns Hopkins and Caltech'`.
     - P4: the conference split.
     - HBCU: the existing note.
   - `collegesTitle`, `collegesTotal`: per Decisions.
   - `scholarships` and `scholarshipsNote`: unchanged. The new profile has no merit figures;
     add "and the 2026–27 profile carries none either" to the note.
   - `sources`:
     - `PROFILE_2627` "2026–27 Upper School Profile (College Admission Summary 2024–26)"
     - `PROFILE_2526` "2025–26 Upper School Profile (College Admission Summary 2023–25)"
     - the Acceptances page re-labelled
     - the US News line

4. **`transcript` card.**
   - `headline`: "Students in AP classes must sit the exam — and in 2026, 92% of the 833
     exams Latin students took scored 3 or higher, with a mean score of 4.10."
   - `subhead`: the candid maths-placement note plus the spring-2026 decision to weight
     Advanced maths and science courses +0.5, retroactively for the Class of 2027.
   - `stats`:
     - `'24'` "AP subjects offered — exams required of AP students"
     - `'92%'` "of 833 AP exams scored 3+ (2026, 308 students)"
     - `'357'` "AP Scholar awards across the Classes of 2024–26"
     - keep `'12 / 18'`
   - `merit`, `meritNote`: per Decisions.
   - `depth` (re-source each; see Decisions):
     - **Mathematics**: the ceiling is still AP Calculus BC (no multivariable or linear
       algebra in the grid). The honors electives are now Honors Intro to Probability &
       Statistics and Honors Graphs, Governance & Games: Applied Mathematics. Drop
       "Honors Data Analytics" unless the live course page still lists it.
     - **Computer science**: Honors Java Data Structures beyond AP CS A, with **AP
       Cybersecurity and AP Networking Fundamentals now listed as two separate APs**.
     - **Engineering**: re-check against the course page. The profile's grade tables show
       Engineering in Motion (H), Intro to Civil Engineering (H), Intro Bioengineering and
       Intro Electrical Engineering.
     - **World language**: unchanged. The grid still has Greek I–IV and both AP Spanish
       courses.
     - **Interdisciplinary**: Honors American Studies is still on the live course page but
       not in the profile grid. Cite the course page for it.
   - `trust`, rewritten in place:
     - `[0]` label `'Weighted — and stated again'`: the full 4-point scale (A+ 4.33 … F 0;
       A 93–97), +1 for Honors & AP, +0.5 for Advanced except Advanced Functions with
       Trigonometry. Restored in 2026–27 after being absent since the 2017–18 edition.
     - `[1]` label `'No rank — stated again'`: the verbatim "does not report class rank",
       and that no quintile or decile table is published.
     - `[2]`: unchanged (maths note). Update the quote to the new wording: "…many fine math
       students are placed in standard and advanced courses."
   - `flags` (in place):
     - `[0]`: the AP Scholar comparison becomes 48 (2018–20) → **192** (2024–26).
     - `[1]` (the editorial-note gap) is rewritten as a `verify`: "The 2025–26 edition
       carried an unremoved internal editorial note; the 2026–27 edition has removed it,
       and adds AP results, test means, grade distributions and the grading scale — a
       substantial reversal of the school's earlier non-disclosure."
   - `sources`: `PROFILE_2627` (AP results, exam policy, AP Scholars, marking system, maths
     note), `PROFILE_1718` re-labelled "(the last edition to print the marking system before
     2026–27)", the National Merit news link, and the course page if used.

5. **`counseling` card.**
   - `stats[0]`: `'~1:38'` "counselors to seniors (derived — no ratio is published)".
   - `roster`:
     - Jennings: `detail` "Listed as Director in the 2017–18, 2019–20, 2020–21, 2025–26
       and 2026–27 profiles — 9+ years documented."
     - Segura: "Newer — appears in the 2025–26 and 2026–27 profiles but not in the
       archived editions."
   - `flags[0]` (verify): "589 Upper Schoolers ÷ 4" and "151 seniors ÷ 4", giving ~1:147 and
     ~1:38.
   - `sources`: `PROFILE_2627 (enrollment, senior class size, staff masthead)`.

6. **`edge` card.**
   - `levers[1].items[0]` ("The School Profile works against itself"), rewritten in place:
     the 2026–27 edition **restores** the grading scale, weighting, no-rank policy and test
     and AP data. It still omits a CEEB code, a four-year matriculation percentage and
     National Merit Finalists.
   - `items[1]` and `[2]` (integrity block and named scholarships deleted): keep them, and
     change "None of that survives into the current profile" to "and the 2026–27 edition
     does not restore it". Same for `[2]`.
   - `items[3]`: unchanged.
   - `levers[1].note`: "The net effect is a profile that now argues with numbers again, but
     still omits the integrity statement and the scholarship history earlier editions
     carried."
   - `levers[0].items[0]` (debate) and `[3]` (Malone): unchanged. The new profile restates
     both.
   - `sources`: `PROFILE_2627` "(Malone Scholars, Fab Academy, NSDA 200 Club, what the profile
     restores and omits)", `PROFILE_2526` "(the editorial note, removed in 2026–27)", and
     `PROFILE_1718`.

7. **`wholeClass` card.**
   - `headline`: "As of 2026–27, Latin publishes its class-level numbers — 2026 AP results,
     SAT and ACT means, and junior and sophomore grade distributions — but still no
     percentiles, GPA distribution or rank."
   - `subhead`: the means-not-distributions point. A reader can now place a test score
     against the class average, but not against the spread.
   - `scoreTables`: per Decisions. Delete the "No score tables and no quintiles" comment
     and replace it with one on `noPercentiles`.
   - `support`: unchanged. It is not profile-sourced.
   - `middle`, rewritten in place:
     - `[0]` label `'Grades are now published'`: the 63% / 57% A-range figures from
       Decisions, with "as counted from the profile's own tables". The tables omit grades
       below C−, which is why a few rows fall one or two short of their totals.
     - `[1]` (regional band): the current text, "Every UNC-system campus on the list
       carries a matriculation asterisk", is **false** on the merged list. On the 2024–26
       list, nine campuses are starred: Chapel Hill, NC State, Charlotte, Greensboro,
       Wilmington, Asheville, UNCSA, ECU and App State. Four are not: Western Carolina,
       NC A&T, Winston-Salem State and NC Central (NC Central is on the 2023–25 list only).
       Reword it to name the starred nine. Do not overclaim.
     - `[2]` (non-traditional): add Naval Academy and The Citadel. Keep Air Force 2025,
       and add the international names (St Andrews, UCL, King's, Imperial, Leiden,
       Amsterdam, Queensland, Toronto, McGill, UBC).
   - `flags`, in place:
     - `[0]` gap: "Means only — no percentiles, middle-50% bands, GPA distribution or rank
       table, and no testing rate."
     - `[1]` verify: "The testing data was absent from every edition between 2019–20 and
       2025–26 and returned in 2026–27."
   - `sources`: `PROFILE_2627` "(test means, AP results, grade distributions)", then
     `PROFILE_1718` and the Support & Wellness link.

8. **`verdict` card.**
   - `headline`: drop "wrapped in the least transparent profile in this set". It becomes
     "… with a stable, unusually well-staffed counseling office — and, from 2026–27, a
     profile that publishes its numbers again."
   - `subhead`: the open questions are now about spread and outcomes, not basic disclosure.
   - `points`, in place:
     - `[1]`: "nine people for 151 seniors".
     - `[4]`: the merged figures, e.g. "337 institutions across four classes, <n> of the 68
       Power Four".
     - `[5]`: "seven APs are deliberately open-enrollment".
   - `checklist`, in place:
     - `[0]`: "Your profile now prints SAT and ACT means. What are the middle-50% ranges,
       and what share of the class submitted scores?"
     - `[1]`: "Advanced math and science courses now carry +0.5, applied retroactively from
       the Class of 2027. How do colleges see that change on a transcript, and are earlier
       classes' GPAs restated?"
     - `[2]`: unchanged.
     - `[3]`: unchanged.
     - `[4]`: "Your Acceptances page still shows the Classes of 2023–25. Where did the Class
       of 2026 enroll, college by college?"
     - `[5]`: "Columbia is the only Ivy absent from both recent acceptance lists. Is that
       accurate, and how do you read it?"
     - `[6]`: unchanged.
   - `sources`: `PROFILE_2627`.

9. **Header comment and constants.**
   - Rewrite lines 1–27: the area is now built on the 2026–27 profile, which ended a
     long non-disclosure.
   - Replace `PROFILE` with `PROFILE_2627` (new URL) and `PROFILE_2526` (old URL).
   - Grep afterwards: `grep -n "PROFILE\b\|least transparent\|Not published\|publishes no SAT\|no AP score" src/data/collegeSupportPrograms/charlotte-latin.ts`
     must return 0 hits. Any remaining "2025–26" must be a deliberate historical citation.

10. **Compare** (`src/data/metricValues.ts`), per Decisions:
    - `ACCEPTANCE_WINDOWS`
    - the AP courses qual
    - the AP 3+ value, `subs`, qual and row note
    - the six bucket cells and their quals, using the step-2 counts and the window
      "2023–2026" where the sentence names it
    - the P4 qual fix
    - the counselor caseload value, comment and qual

11. **Regenerate and check.** Run `npm run schema`, then `npx tsc -b`, then `npm run build`.
    The expected Phase 1 state is that **`check:live` alone fails**, on the edited Latin
    English paths, as in `cannonprofile`.

12. **Schema-doc check.** Does `DATA-SCHEMA.md` need a rule? The candidate rule: when
    merging two windows, bold markers may be drawn from the newer list only, and
    `collegesTotal` must say which window the bold covers. If yes, edit
    `scripts/gen_data_schema.mjs` (§3, near the widest-window rule), then run
    `npm run schema && npm run check:schema`. Say explicitly in the stop message whether it
    was added.

13. **Browser check** (Verification), then commit with **explicit paths only**. Run
    `git status --short` first. Commit:
    - `charlotte-latin.ts`
    - `metricValues.ts`
    - the masters and their `.md`s
    - the source-material files
    - the ingest outputs
    - `DATA-SCHEMA.md` and the generator, if changed
    - this plan, `latinprofile-data/` and `INDEX.md`

    Push, and verify with `git rev-parse HEAD` vs `git ls-remote origin feat/latin-profile-2627`.
    Open the PR with `--body-file`. Flip the plan to `english-done` and the INDEX row to
    *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The stop
message lists every changed user-facing string, the six final bucket counts, the bold
count, any names left unresolved, and whether step 12 added a rule.

### Phase 2 — Every other locale

**Scope:** prose overlays only, for `PROSE_TRANSLATED`: es, bn, ht, te, fr, fa, it, hi, ar.
There are two topics: `college-support` and `metric-values`. **No `src/locales/*.json`
changes.** The mechanism is in
[`prose-translation-architecture.md`](../docs/prose-translation-architecture.md). The
per-locale traps are in the `prose-translation-<lang>.md` docs and
`src/data/overlays/NOTES.md`.

14. **Measure scope from a fresh extract.** For each topic, run
    `node scripts/i18n_extract.mjs --topic <topic> --lang __verify --out <scratch>` and diff
    the stamps against `src/data/overlays/work/<topic>.es.json`. List retired and new
    stamps per topic before translating (memory `gastondaycup`: extract to a throwaway
    `--lang`). College names in `colleges[]` are not extracted. Confirm that, so 337 rows
    do not inflate the count.

15. **Splice by stamp** into all nine work files per topic (memories
    `splice-work-files-by-stamp`, `splice-not-reextract-for-new-school`). Map by path **and
    meaning**, never by index. Reuse each locale's existing wording for: Upper School
    Profile, AP Scholars, National Merit Semifinalists/Commended, Advanced, Honors,
    quality point, and the bucket names. Rules:
    - Figures char-for-char: `92%`, `833`, `308`, `4.10`, `95.23%`, `357`, `1308.5`,
      `1303.0`, `27.2`, `28.8`, `N=123`, `151`, `589`, `~1:38`, `~38:1`, `337`, `132`,
      `24`, `4.33`, `+0.5`, `63%`, `524`, `57%`, `457`, `806`.
    - `hi`/`te` store the English 3-3-3 figure.
    - `fa`/`ar` store **no** bidi isolates. Watch ranges in RTL (`2023–2026`, `93–97`).
    - Dates translate, but their digits do not ("spring 2026", "8/6/26").
    - Keep in Latin script: names, college names, `AP`, `SAT`, `ACT`, `CEEB`, `NSDA`,
      `Upper School`. `fr` also keeps course titles (`check:fr`).

16. **Rebuild overlays:** `npm run i18n:build -- --topic <topic> --lang <code>` for both
    topics × nine locales.

17. **Phase 2 verification** (below). Then commit with explicit paths, push and verify, and
    run `gh pr merge --squash --delete-branch`. Then `git checkout main && git pull`. Flip
    the plan to `implemented` (adding `## Implementation notes` if anything deviated) and the
    INDEX row to *Implemented* with the PR link. **Do not deploy.** End with "merged —
    ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/charlotte-latin/Charlotte Latin - College Support - School Profile 2026-2027.md` | new (written during planning) |
| `source-material/college-support/charlotte-latin/Charlotte Latin - College Support - Acceptances Window 2023-2026.md` | edit: superseded note |
| `src/data/collegeSupportPrograms/charlotte-latin.ts` | edit: merged 337-row list, all cards except `ncAdmissions`, constants, header |
| `src/data/metricValues.ts` | edit: window, AP 3+, AP-courses qual, buckets ×6 + quals, P4 qual fix, caseload |
| `src/data/collegeRankings.ts` + `_shared/US News 2027 - Rank Labels.md` | edit: rows for newly ranked names |
| `src/data/collegeUrls.ts` + `_shared/College Homepages 2026.md` | edit: new rows, orphan removals |
| `src/data/collegeMemberships.ts` + `_shared/*` | edit only if `check:memberships` shows a roster gap |
| `.claude/docs/*`, `src/data/schools.json`, `src/content/college-support/charlotte-latin.json` | regenerated by ingest |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | regenerated; generator edited only if step 12 says so |
| `src/data/overlays/work/{college-support,metric-values}.<lang>.json` + built overlays | Phase 2 |
| `.claude/plans/latinprofile.md`, `latinprofile-data/merged-colleges.txt`, `INDEX.md` | plan + status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean.
- [ ] `check:ranks`, `check:collegeurls`, `check:buckets` and `check:memberships`: all clean.
      The six Latin counts agree across the buckets row, the stat tiles, the Compare cells
      and the quals. `ACCEPTANCE_WINDOWS` matches `collegesTitle`.
- [ ] `npm run build` **exits 1 on `check:live` only**, with findings limited to the Latin
      paths edited above.
- [ ] `npm run check:schema` and `npm run check:metrics` pass, with no new ⚠️ unmatched
      subtopic.
- [ ] Step-9 grep: 0 hits.
- [ ] **Browser check (required).** Run `npx vite build && npm run prerender`, then
      `npx vite preview`. Use Playwright with real Chrome (`channel: 'chrome'`) and
      `domcontentloaded`, **not** `networkidle`. Force **every `<details>` open**.

      On `/school/charlotte-latin/`, College Support:
      - Where Graduates Go reads "Every acceptance, 2023–2026" with 337 rows and 132 bold.
      - The Ivy, P4 and HBCU filter chips list the right colleges, and Princeton and Penn
        appear.
      - Rank labels and links render on the newly added names.
      - The transcript stats read `24 · 92% · 357 · 12 / 18`.
      - Whole Class shows the SAT & ACT means table **with no percentile header row**.
      - The verdict no longer says "least transparent".
      - The AP 3+ stat tile shows `92%` with `(2026)` beneath it.

      On `/compare/`, Latin reads `92%`, the six new buckets with `(2023–2026)` beneath, and
      `~38:1`, with matching quals. Every new source link opens the v1793645005 PDF.
- [ ] `npm run audit:mobile -- --only charlotte-latin`: 0 overflow. The SAT/ACT cells
      (`SAT 1308.5 (N=123)`) are long strings at 320px.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**, with `check:live` green and `check:runtime` resolving all nine.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted tokens. This matters here:
      `1308.5`, `4.10` and `95.23%` are separator-bearing.
- [ ] `check_figures.py --topic college-support` and `--topic metric-values` ×9: clean.
- [ ] `check:money`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script` and
      `check:dates`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a `main` baseline: no new hits.
- [ ] Browser spot-check, with `<details>` open, of `/school/charlotte-latin/?lang=es` and
      `?lang=ar`. The new strings are translated, the figures are intact, and the RTL ranges
      are not reversed.

## Risks

| Risk | Mitigation |
|---|---|
| The merge double-counts or drops an institution through a spelling variant the probe missed | The gates count institutions canonically. Also eyeball every `2024–26 only` row in the worklist against an `old only` row with a similar name before pasting |
| Removing a master row another school still uses | `check:collegeurls` / `check:ranks` report orphans per school. Remove only rows that no school's list uses |
| A rank lookup resolves to the wrong same-name school (Trinity, Xavier, Wheaton, Anderson) | Never guess. Confirm name **and** state in headed Chrome. If it is unresolved, it stays unranked |
| Bucket counts drift across the four surfaces | `check:buckets` / `check:memberships`. Also read the P4 and HBCU quals by eye |
| Prose still asserts non-disclosure somewhere the plan missed | The step-9 grep, plus a read of every Latin College Support string in the browser with all panels open |
| A flag or checklist index shift strands overlays | Every edit here is in place. If one must be deleted, map Phase 2 by path and meaning |

## Open questions

- **Bold for old-only colleges.** The user asked for bold to show "matriculation for latest
  class we have", read here as the 2024–26 asterisks only. That un-bolds about 8 colleges
  starred only on the 2023–25 list. Owner: Derrick. **Default:** 2024–26 asterisks only.
  The alternative is bold for any asterisk on either list, with
  `collegesTotal '… bold = at least one student enrolled, 2023–26'`.
- **Merge vs replace.** This plan follows the DATA-SCHEMA widest-window rule (2023–2026,
  337 rows). Owner: Derrick. **Default:** merge. If the user prefers only the newest list,
  use the 292 new rows, window `(2024–2026)`, and re-run the gates.

## Implementation notes

Phase 1 (English), built 2026-11-04 on `feat/latin-profile-2627`.

- **HBCU is 10 / 107, not the planned 9.** PR #418 (Charlotte Christian, merged after this
  plan was written) added an alias that tags Florida A&M as an HBCU, which lifted Latin's
  pre-merge count from 7 to 8. FAMU is on the 2023–25 list only, so the merged list carries it.
  The other five buckets match the plan: Ivy 7/8, Ivy+ 14/17, NU75 73/75, LAC75 47/75, P4 61/68.
- **Bucket quals say "published 2023–25 and 2024–26 acceptance lists"**, mirroring the
  wording #418 shipped for Charlotte Christian, rather than the plan's "2023–2026 acceptance
  lists". It names the two lists the window is built from.
- **The Power Four subhead names UT Austin** among the seven absences ("the lists write only
  'University of Texas'"), since `powerFourConference` lists it as absent under the
  tag-`nu75`-only precedent.
- **Orphan URL rows re-spelled rather than deleted where a merged name needed them:**
  `SUNY at New Paltz` → `SUNY New Paltz`, and `University of Illinois at Chicago` →
  `University of Illinois Chicago` in both the URL and rank masters. The bare `Queens
  University` row and its override note were retired. Cannon also writes "University of
  Illinois Chicago", so **Cannon's row now shows National Rank #95 and a link** — a correct
  side effect, with no bucket change (#95 is outside the top 75).
- **Nine homepage rows added**, each 200 with a matching title: Anderson (SC), Brunel,
  Embry-Riddle (Prescott), Kettering, Lawrence, Queen Mary, UBC, Dallas, UT Chattanooga.
  Skipped: Marymount Manhattan (already in the doc's confirmed-unlinkable list) and City St
  George's (Cloudflare 403, unverified).
- **US News rank lookups NOT done.** The headed-Chrome DuckDuckGo → profile route was
  refused by the session's permission classifier as bot-check circumvention, so Lawrence,
  Kettering, Dallas, Taylor and UT Chattanooga stay unranked (no label renders). **Lawrence
  matters:** if it holds a top-75 National Liberal Arts rank, LAC75 becomes 48. Needs the user
  to run the lookup or grant the permission.
- **Engineering depth row** now cites the profile's grade tables (Honors Civil Engineering and
  Engineering in Motion, Intro Bioengineering and Intro Electrical Engineering). The live course
  page still lists Honors Data Analytics and Honors American Studies, so both stay and the course
  page was added to the transcript sources.
- **Step 12 added a DATA-SCHEMA rule:** bold in a merged window may come from the newer list
  only, and `collegesTotal` names the years the bold covers.
- The ingest swept in another session's uncommitted Davidson Day profile file; those outputs
  were reverted and the manifest restored to HEAD order plus the one new Latin document.
