---
name: cannonprofile
title: Refresh Cannon School from its 2026–27 School Profile — new 2024–26 acceptance list (rescored buckets), Class of 2026 GPA/test bands, May 2026 AP stats, 0/1/5/6 load ceiling, Honors Accelerated +0.5, new counseling coordinator, NHS chapter; re-point every profile citation
status: english-done
phases: 2
created: 2026-10-25
branch: feat/cannon-profile-2627
prs: []
---

# Refresh Cannon School from its 2026–27 School Profile

## Goal

Cannon published a **2026–27 School Profile** on 2026-09-11. It overwrote the 2025–26
edition at the **same Finalsite asset** (`i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf`). Both
the old and the new version URLs now serve a byte-identical file, and that file is the
2026–27 edition. As a result, every app citation labelled "2025–26 School Profile" opens a
document that contradicts the claim beside it. The College Support card says, for example,
"zero turnover" next to a roster that has changed.

This plan updates Cannon's College Support, Student Clubs and Compare figures to the
2026–27 edition. The largest change is that the profile **restores an acceptance list**
(2024–2026, 218 rows), which replaces the stale 2022–24 rollup. That rescores all six
selectivity buckets: Ivy League goes from **3 / 8 to 7 / 8**. The plan also re-points every
profile citation to the new edition.

It is done when the Cannon page and Compare show the new figures in English, every one of
them traceable to `Cannon School - College Support - School Profile 2026-2027.md`, and
`npm run build` is green after Phase 2 in all ten locales.

## Context

### The source, already on disk (uncommitted)

[`source-material/college-support/cannon/Cannon School - College Support - School Profile 2026-2027.md`](../../source-material/college-support/cannon/Cannon%20School%20-%20College%20Support%20-%20School%20Profile%202026-2027.md)
holds the full four-page transcription, written during planning. It contains the
verbatim Fast Facts, the GPA/test/AP tables, the course grid with its key, the full
218-row acceptance list in printed order, and a planning-time probe of that list against
the masters. **It is the authority for every figure below. Read it first.**

**The PDF has no text layer.** `pdftotext` returns nothing, and the figures were read from
the rendered pages. To re-check one, run
`curl -sL -o p.pdf <URL> && pdftoppm -r 150 -png p.pdf pg` in the scratchpad and read the
PNGs.

New URL, to be used for every citation:

```
https://resources.finalsite.net/images/v1791909516/cannonschoolorg/i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf
```

### What changed, edition to edition (the full delta)

| Fact | App today (2025–26 edition) | 2026–27 edition |
|---|---|---|
| Acceptance list | none; app shows 2024–25 profile's **2022–24** list, 283 rows, bold = Class of 2023 matriculation | **2024–2026, 218 rows**, no bold markers |
| Ivy / Ivy+ / NU75 / LAC75 / P4 / HBCU | 3/8 · 10/17 · 66/75 · 30/75 · 52/68 · 5/107 | probe: **7/8** · ? · ~61 · ~28 · ~55 · ≥8 (gates decide) |
| Graduating seniors | 111 (Class of 2025) | **105** (Class of 2026) |
| Four-year / two-year | 98% / 2% (Class of 2025) | 98% / 2% (Class of 2026) |
| AP exams | 197 students, 425 exams, 92.39% (Class of 2025) | **195 students, 446 exams, 90.16% "Students with Scores 3+"** (May 2026) |
| Advanced courses | 21 = 13 AP + 8 AT | **27 = 15 AP + 12 AT** (catalog: 14 AP + 13 AT, same 27) |
| Max AP/AT by grade | 0 / 1 / 4 / 6 → cap of eleven | **0 / 1 / 5 / 6** → cap of **twelve** |
| Weighting | AT/AP +1.0; Honors **and Honors Accelerated** unweighted | AT/AP +1.0; **Honors Accelerated +0.5**; Honors unweighted |
| GPA bands | W top 4.22–4.28, W mid 3.67–4.11, UW top 3.96–4.00, UW mid 3.57–3.94 (Class of 2025) | **W top 4.08-4.28, W mid 3.93-4.11, UW top 3.85-4.0, UW mid 3.76-3.94** (Class of 2026) |
| SAT | mid 1220–1380, top 1470–1590 | **mid 1290-1410, top 1510-1560** |
| ACT | mid 25–31, top 33–36 | unchanged |
| Counseling roster | Coordinator **Clay Morrell** | Coordinator **Brittany Pasut**; four directors unchanged |
| Memberships | NACAC, SACAC, ACCIS; Cum Laude chapter 2005; Independent Curriculum Group | **SAIS-accredited; National Honor Society chapter 2025**; ACCIS, CSEE, NAIS, NCAIS, NACAC, SACAC; **no Cum Laude, no ICG** |
| Upper School enrollment | 423 | **421** (JrK–12: 1,057) |
| Aid | $3,000,000 to 24% (labelled 2025–26) | same figure, **no year printed** |
| New programs | — | **Zero Hour** (Varsity Chorus/Orchestra, pass/fail, M/W/F before school); **Summer Term** (Geometry Acceleration pass/fail; Honors Biology & Chemistry for a grade; marked on transcript) |

Facts with **no existing home** in the app (left in source-material only, see Out of
scope): students of color 35.5%, 46 zip codes, 59 full-time US faculty / 83% advanced
degrees, the head of school / head of US / enrollment director names, and the six-course load.

### Files that cite or carry the profile

- [`src/data/collegeSupportPrograms/cannon.ts`](../../src/data/collegeSupportPrograms/cannon.ts):
  the six cards. `PROFILE_2526` (line ~322) is cited in `transcript`, `counseling`,
  `outcomes`, `edge`, `wholeClass` and `verdict`. The `colleges` array is lines ~35–319.
  The header comment (lines 1–28) describes the old list and must be rewritten.
- [`src/data/clubsPrograms/cannon.ts`](../../src/data/clubsPrograms/cannon.ts): `PROFILE_2526`
  (line 45). The Senior Capstone tile reads `value: '111'` (line ~99). The hours gap flag
  (line ~125) and sources (line ~130). In the honors card, the Cum Laude entry carries
  "chapter awarded in 2005" (line ~145), the **NHS gap flag** (line ~216) says
  "Cannon has no National Honor Society chapter", now **false**, and the sources are at
  lines ~220–221.
- [`src/data/metricValues.ts`](../../src/data/metricValues.ts): Cannon cells.
  `'14 AP + 13 AT'` (188) and its qual (206–209); AP pass `'92%'` (267) and qual (285);
  buckets `3 / 8` (306/328), `10 / 17` (355/377), `66 / 75` (404/426), `30 / 75` (453/475),
  `52 / 68` (502/524; the qual already wrongly says "43 of the 68"), `5 / 107` (772/794);
  counselor ratio `'28:1'` (820/842); clubs `'≥19'` (1259/1277–1280).
- Do not touch: `src/data/courseOfferings.ts` (catalog-sourced, already 14 AP + 13 AT,
  already has the Zero Hour chorus), `src/data/artsPrograms/cannon.ts` (already covers Zero
  Hour ensembles, Jazz Combo, Music Technology), `src/data/financialAidReports.ts`
  (the figure is unchanged), `src/data/learningSupport/cannon.ts`, and the NC admissions card.

### The acceptance-list machinery (read §3 of `DATA-SCHEMA.md` before editing)

The rules are in [`DATA-SCHEMA.md`](../docs/DATA-SCHEMA.md) around lines 528–590.

- Each entry is `{ name, cats }`, plus `enrolling: true` only for matriculated rows. Ranks
  resolve from `src/data/collegeRankings.ts` (`rankLabelFor`) and homepages from
  `src/data/collegeUrls.ts` (`urlFor`). **Never inline either.**
- `cats` are **derived from masters, never judged by eye**:
  - `nu75` / `lac75`: rank ≤75 from `ranked75Bucket()`.
  - `p4` / `hbcu`: from `collegeMemberships.ts`.
  - `ivy`: the 8.
  - `ivyplus`: editorial. Reuse the tags the same college already carries on the old
    Cannon list or another school's list.
- Counts are **institutions**, deduplicated via `canonicalRanked()` / `canonicalMember()`
  (ASU twice is one institution). They are **clamped** at the denominator. They live on
  **four surfaces**, and all four must agree: the `buckets` row, any stat tile, the
  `metricValues.ts` cell, and the qual sentence that spells the number out.
- Gates: `check:ranks`, `check:collegeurls`, `check:buckets`, `check:memberships` (all
  in `npm run build`).
- New names missing from the masters (the planning probe found 58 without a rank label and
  20 without a URL) are added as **one row each** to the master **and** to its companion
  `.md`:
  - `source-material/college-support/_shared/US News 2027 - Rank Labels.md`
  - `source-material/college-support/_shared/College Homepages 2026.md`

  Most of the 58 are legitimately unranked (regional, community, foreign, specialty).
  **A missing rank or URL is a valid confirmed-null. Never guess one.** US News
  lookups need headed Chrome; see memories `usnews-fetch-needs-headed-chrome`,
  `usnews-every-search-path-is-broken` and `verify-scraped-profile-is-the-right-school`.
- Ambiguous names, to be resolved against the masters and never guessed:
  - `Wheaton College`: IL or MA.
  - `Trinity College`.
  - `Western University`.
  - `University of Texas`.
  - `Cal Poly`.

  If a name cannot be resolved, it carries `cats: []` and renders as plain text.

### Why two phases

This plan rewrites research prose in `college-support`, `student-clubs` and `metric-values`,
all of which are overlay topics. So it ships English first, then the nine
`PROSE_TRANSLATED` locales: es, bn, ht, te, fr, fa, it, hi, ar. **No `src/locales/*.json`
chrome changes.** College names, figures and `cats` are not translated.

## Decisions

- **Drop all `enrolling` (bold) markers.** The user decided this on 2026-10-25. The new list
  shows no markers, and the Class of 2023 matriculation list sits outside the 2024–26
  window. The **"58 institutions where a Class of 2023 graduate enrolled"** stat and headline stay as
  a separate, still-true fact. The matriculation-page citation stays too.
- **Replace the list wholesale. Do not merge it with the 2022–24 list.** The
  `acceptance-years` plan made "newest window only" the rule.
  `collegesTitle: 'Every acceptance, 2024–2026'`.
- **Transcribe names exactly as printed**, including `Cal Poly`, `The Citadel` and
  `William & Mary`. The list is a citation surface (see `collegeUrls.ts` header). Where a
  printed spelling differs from an existing master key, add a variant key. Never "correct"
  the name.
- **AP/AT split.** Leave the Compare cell at the catalog's `'14 AP + 13 AT'`, which matches
  the Course Offerings teaser on the same page; both sum to 27. Re-word its qual to state
  that the 2026–27 profile gives the same total of 27 but splits it 15 AP + 12 AT, because
  it labels the business course AP and omits AT: English Seminar and Inquiry. The College
  Support transcript card cites the profile, so it shows **27** without a split. This keeps
  the page from showing two different splits.
- **AP pass rate becomes `'90%'`** (90.16%, a whole number per the presentation rule). Carry
  the profile's own label, "students with scores 3+". Note in the existing `verify` flag
  that the label says *students* while the figure is 446 exams / 195 students, so the
  denominator is unclear.
- **Counselor ratio.** Keep the school's **marketed 28:1** as the transcript-card stat,
  because it is a school claim. Update the `verify` flag's arithmetic: 105 ÷ 4 ≈ 26 for the
  Class of 2026, and about 105:1 across 421 Upper School students. Set the Compare cell to
  **`'~26:1'`** (105 ÷ 4, computed the way every other school's cell is). Re-word its qual.
  If the live counseling page no longer markets 28:1, drop that stat and say so in
  Implementation notes. During planning, the claim could not be confirmed in the page HTML;
  it may be inside an image.
- **NHS is the twelfth honor society.** Add it to the clubs honors card, cited to the
  2026–27 profile, which is an official school source. Its `recognizes` reads
  `'The national high-school honor society · chapter awarded in 2025'`. Do **not** import
  NHS's national pillars; see the Cum Laude "20%" REFUTED precedent in the clubs header.
  The headline becomes "Twelve honor societies". The Compare clubs floor `≥19` becomes
  **`≥20`**. Replace the false "no National Honor Society chapter" gap flag (wording in
  Phase 1 step 7).
- **Unsupported claims are re-sourced or removed, never left citing a link that no longer
  supports them.** Two are affected:
  - The Cum Laude "chapter awarded in 2005" date appears in clubs `recognizes`, in the
    outcomes `scholarships` list, and in the `edge` memberships bullet.
  - Independent Curriculum Group membership appears in `edge`.

  Both were cited only to the 2025–26 edition, which is now unreachable. The Cum Laude
  **society** stays, cited to the live Upper School page, which lists it. The **2005 date**
  and **ICG** are removed. See Open questions to override this.
- **Financial aid is unchanged.** The 2026–27 profile restates $3,000,000 / 24% with no
  year. Leave the values and quals alone, but update the code comments on lines 897 and 938
  to note the restatement. Do not infer that aid was "flat".
- **Use the new URL constant `PROFILE_2627` and delete `PROFILE_2526`** in both TS files.
  Every source label reads "2026–27 School Profile (…)" (College Support) or
  "2026–27 Student Profile (…)" (clubs, matching that file's existing wording).
  `PROFILE_2425` stays, for the grading scale and the year scores were withheld.
- **Course Offerings, Arts and Financial Aid are untouched.** Their sources are the catalog
  and the aid pages, and they already carry the relevant facts.
- **Checklist and array edits replace in place or append.** They never delete from the
  middle. That avoids the stale-`at`-path trap (memory
  `overlay-at-paths-go-stale-on-row-delete`). The one deletion, the `wholeClass` GPA
  `verify` flag at `flags[0]`, shifts `flags[1]` down, so Phase 2 must map it by
  path and meaning.

## Approvals needed

**None.** Every edit changes data inside existing cards, lists, stat tiles and Compare cells.
The one added row, NHS, goes into an existing honor-society list. No card, section,
metric key or component changes. That is "data enrichment" under the UX-design standard.

## Source material

- **Written during planning (uncommitted):**
  `source-material/college-support/cannon/Cannon School - College Support - School Profile 2026-2027.md`.
  Its source is the profile PDF (URL above), supplemented by the live College Counseling and
  Upper School pages, both fetched 2026-10-25.
- **To append during `/implement`:** a one-paragraph "Superseded 2026-10-25" note at the top of
  `Cannon School - College Support - Acceptances Window 2023-2026.md`, pointing to the new
  file.
- `/implement` runs the **`ingest-source-material`** skill on a branch first (step 1).
  Expect a new `college-support` research section named "School Profile 2026-2027", the
  same pattern as Charlotte Catholic's "School Profile 2025-2026" and Hickory Grove's
  "School Profile". Re-run `npm run check:metrics` and `npm run schema` afterwards. If the
  new subtopic shows as an ⚠️ unmatched key, map it to an existing card key in
  `src/lib/metrics.ts` the way those schools' profile files are mapped. **Do not add a card.**

## Out of scope

- Fast-facts figures with no existing home: students of color, zip codes, faculty count
  and degrees, leadership names, course load. They are recorded in source-material only.
  Surfacing them would need a new tile or row, which needs UX approval.
- Course Offerings changes. The catalog remains its source. Summer Term courses are not
  added there.
- Re-scoring any other school, or the US News edition.
- The NC admissions card, which is government data and unaffected.
- Deploying. This plan never runs `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch and ingest.** Create `git checkout -b feat/cannon-profile-2627` from an
   up-to-date `main`. Append the superseded note to the Acceptances Window file. Run the
   `ingest-source-material` skill for `college-support/cannon` and confirm what it
   regenerated: `.claude/docs/` notes, `src/data/schools.json`, and
   `src/content/college-support/cannon.json`. Memory `ingest-full-rebuild-sweeps-topics`
   warns that a full ingest can sweep other topics. Diff, and keep only the Cannon
   college-support changes.

2. **Rebuild `colleges`** in `src/data/collegeSupportPrograms/cannon.ts`.
   - Replace the whole array with the 218 names from the source file, in the profile's
     printed order, which is already alphabetical. The current array has three stray rows
     appended after `Xavier University`; do not carry that pattern over.
   - No `enrolling` keys.
   - Tag `cats` from the masters (Context). For each name with no rank or URL, look it up
     and add **one row** to the master and its companion `.md`, or leave it absent as a
     confirmed-null.
   - Run `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`
     until they are clean. Read every violation as a question first (DATA-SCHEMA: "a
     membership violation is a question, not a verdict").
   - Write a scratch tally of the six institution counts. Those counts feed steps 3 and 8.

3. **`outcomes` card** (same file).
   - `headline`: keep the matriculation framing (58 institutions, Class of 2023, Stanford,
     Duke, Penn, UCLA, Air Force Academy).
   - `subhead`: rewrite. The acceptance list beside it is now current: the 2026–27 profile
     restores a full **2024–2026** list, including the Ivy count from step 2 (e.g. "seven of
     the eight Ivies").
   - `stats`: `98%` "of the Class of 2026 to four-year colleges · 2% to two-year"; keep
     `58`; `105` "graduating seniors, Class of 2026" (drop "second largest class in school
     history", since the source does not say that of 2026); the Ivy tile becomes
     `'<n> of 8'` "Ivy League on the 2024–26 acceptance list".
   - `buckets`: the six counts from step 2.
     - The Ivy `note` lists who is present and who is absent: for 7/8,
       "— Brown, Columbia, Cornell, Dartmouth, Penn, Princeton, Yale; absent Harvard".
     - HBCU keeps its existing note.
   - `collegesTitle`: `'Every acceptance, 2024–2026'`.
   - `collegesTotal`: `'218 institutions'`, or the actual row count. Drop the
     "bold = …" clause.
   - `scholarships`:
     - Replace `'Cum Laude Society chapter since 2005'` with
       `'National Honor Society chapter awarded in 2025'`.
     - Optionally append `'U.S. Naval Academy and Coast Guard Academy acceptances (2024–26)'`.
     - Keep the other three lines.
   - `scholarshipsNote`: "on either profile" becomes "on any of the three published profiles".
   - `sources`:
     - `PROFILE_2627` "(the 2024–26 acceptance list, Class of 2026 outcomes)".
     - Keep the matriculation link and the US News line.
     - Drop the `PROFILE_2425` acceptance-list line.

4. **`transcript` card.**
   - `headline`: "eleven advanced courses" becomes "**twelve**".
   - `stats`:
     - `'27'` "advanced courses — AP plus school-designed Advanced Topics, the school's own count".
     - `'90%'` "of students scored 3+ (446 exams, 195 students, May 2026)".
     - `'0 / 1 / 5 / 6'`.
     - Keep `No rank`.
   - `subhead`: "the 92% scoring 3+" becomes "the 90% scoring 3+".
   - `depth`:
     - **Mathematics**: rewrite. The ceiling is now **AT: Mathematics & Calculus**, which
       the 2026–27 catalog describes as a seminar for students who have completed AP
       Calculus BC. AP Precalculus also appears. No multivariable or linear algebra course
       is published by name.
     - **Computer science**: **AP Computer Science plus AT: Principles of Computer Science &
       Coding**, still with no data-structures or post-AP course.
     - **Advanced Topics**: remove the word "Eight". Keep the rest.
     - **Append** a fifth item, labelled `'Before and after the school year'`: **Zero Hour**
       (Varsity Chorus and Varsity Orchestra, pass/fail, Monday/Wednesday/Friday before
       school) and **Summer Term** (Geometry Acceleration pass/fail; Honors Biology and
       Honors Chemistry for a grade; designated as Summer Term on the transcript; BIOREX not
       offered in the summer section).
   - `trust[0]`: rewrite as three tiers. AT/AP **1.0**; **Honors Accelerated 0.5** (new for
     2026–27); Honors **0**. Weighted and unweighted GPAs use Cannon coursework only.
   - `trust[1]`: "eleven-course cap" becomes "twelve-course cap"; keep "tops out around 4.28".
   - `flags[0]`: update to 90.16%, 446 exams and 195 students. Note that the profile labels
     the figure "Students with Scores 3+" while giving both counts, so whether the rate is
     per student or per exam is undefined. Keep the optional-exam point.
   - `flags[1]`: "on either profile" becomes "on any profile".
   - `sources`: `PROFILE_2627` "(advanced-course counts, AP stats, load ceiling, weighting,
     no-rank policy)". Keep the `PROFILE_2425` grading-scale line, re-labelled "the grading
     scale the newer editions dropped".

5. **`counseling` card.**
   - `subhead`: replace "zero turnover across two published profiles" with "the same four
     directors across three published profiles".
   - `roster`:
     - Coordinator becomes `'Brittany Pasut'`, with
       `detail: 'Named on the 2026–27 profile, succeeding Clay Morrell.'`
     - Waibel's `detail` becomes "The four directors are unchanged across the 2024–25,
       2025–26 and 2026–27 profiles."
   - `flags[0]` (28:1): new arithmetic per Decisions.
   - `flags[2]`: "cut from the 2025–26 edition" becomes "cut from later editions".
   - `reach[2]`: unchanged.
   - `sources`: `PROFILE_2627 (staffing, enrollment)`.

6. **`edge`, `wholeClass`, `verdict`.**
   - `edge.levers[1].items[2]` (memberships): rewrite as "**SAIS** accreditation; NAIS,
     NCAIS, CSEE, **ACCIS**, NACAC and SACAC; and a **National Honor Society** chapter
     awarded in 2025". Drop Cum Laude 2005 and ICG, and drop the clause "which is what
     makes the school-designed AT tier … coherent".
   - `edge` sources: `PROFILE_2627`.
   - `wholeClass.subhead`: 3.57–3.94 becomes **3.76–3.94**, and "high-B-plus to A-minus"
     becomes "A-minus range".
   - SAT row: `['—', '1290', '—', '1410', '1510', '—']`.
   - SAT note: "(1510–1590)" becomes "(1510–1560)".
   - Both hints read "Class of 2026".
   - ACT values are unchanged. In the ACT note, "111 seniors" becomes "105 seniors".
   - `gpaHint`: "Class of 2026, cumulative through grade 11 · transfers excluded".
   - `quintiles`, figures char-for-char from the source:
     - `4.08–4.28` "a modest ceiling, by design"
     - `3.93–4.11`
     - `3.85–4.0` "A-range"
     - `3.76–3.94` "A− range before weighting"

     The source prints hyphens. Keep the en-dash form the file already uses for every
     range; that is presentation, and the digits are unchanged.
   - `gpaNote`: "eleven-course" becomes "twelve-course". Append one sentence: as printed,
     the weighted top-10% band (from 4.08) begins below the top of the middle 50% (4.11),
     and the profile does not explain the overlap.
   - `support[0]`: "423 Upper School students" becomes "421".
   - `middle`: rewrite all three from the **new** list.
     - **Honest list**: from Caltech, Stanford, Princeton and Yale down through
       Davidson-Davie Community College, Charleston Southern, Coastal Carolina, Lenoir-Rhyne,
       Queens, Western Carolina, UNC Pembroke and USC Beaufort, plus the 2% two-year figure.
     - **Arts**: SCAD, the School of the Art Institute of Chicago and Emerson. Rewrite it
       rather than claim depth: the new list is thinner on design schools than 2022–24.
       Pratt, Parsons, Ringling, FIT, FIDM and UNCSA are gone.
     - **Non-traditional**:
       - International: Edinburgh, Manchester, King's College London, Trinity College
         Dublin, University College Dublin, The American University of Paris, Toronto,
         Montreal and Western.
       - Service academies: US Naval Academy, US Coast Guard Academy and The Citadel.
       - Technical: Caltech, Colorado School of Mines, RPI, WPI, Illinois Tech, RIT and
         Embry-Riddle.
       - HBCUs: those confirmed in step 2.
   - `wholeClass.flags`: **delete** the GPA-identical `verify` flag (resolved). Keep the
     gap-year flag, updated to the Class of 2026.
   - `wholeClass` sources: `PROFILE_2627 (testing distribution, GPA bands)`.
   - `verdict.points[0].text`: "zero turnover across two published profiles" becomes "the
     same four directors across three published profiles (only the coordinator changed)".
   - `points[1]`: "0/1/4/6" becomes "0/1/5/6", and "eleven" becomes "twelve".
   - `points[3]`: append "— and the 2026–27 profile restores a full 2024–26 acceptance list
     beside it."
   - `points[5]`: "Honors courses carry no weight, Honors Accelerated adds half a point and
     only AT/AP add a full point, so the weighted top decile tops out at 4.28."
   - `checklist`, replacing **in place**:
     - `[0]`: "The newest acceptance list covers 2024–26, but the newest matriculation list
       is the Class of 2023. Where did the Classes of 2024–2026 actually enroll?"
     - `[3]`: also asks whether 90.16% counts students or exams.
     - `[6]`: "As printed, the Class of 2026 weighted top-10% band (4.08–4.28) overlaps the
       middle 50% (3.93–4.11). How is the top 10% defined?"
   - `verdict.sources`: `PROFILE_2627`.
   - Rewrite the file's **header comment** (lines 1–28) and the comment above `colleges`
     to describe the 2024–26 list. Remove the "dropped the acceptance list" and
     matriculation-bold notes.

7. **Clubs** (`src/data/clubsPrograms/cannon.ts`).
   - `PROFILE_2526` becomes `PROFILE_2627`.
   - Senior Capstone `value: '105'`.
   - Hours gap flag: "the 2025-26 profile drops the statistic altogether" becomes "the
     2025–26 and 2026–27 profiles drop the statistic altogether".
   - Sources label: `'2026–27 Student Profile'`.
   - `honors.headline`: "Eleven" becomes "**Twelve**".
   - Append the NHS society, after Cum Laude **at the end of the array**, so no existing
     index shifts.
   - Cum Laude `recognizes`: `'Overall academic excellence'` (date removed).
   - Replace the NHS gap flag text with: "The National Honor Society chapter, awarded in
     2025, appears on the 2026–27 profile but not yet on the Upper School page's
     honor-society roster. No National Junior Honor Society or Science National Honor
     Society chapter is published."
   - Sources:
     - Re-label the first to "Upper School (eleven of the twelve societies, incl. Cum Laude)".
     - The second becomes `'2026–27 Student Profile (National Honor Society chapter, 2025)'`.
   - Header comment line 32: "eleven" becomes "twelve".

8. **Compare** (`src/data/metricValues.ts`).
   - AP courses qual (206–209): per Decisions; the value stays.
   - AP pass: `'90%'`, comment `// 90.16% "Students with Scores 3+", May 2026 (446 exams, 195 students)`.
     Qual: "About 90% scored 3 or higher in May 2026 (the school reports 90.16% of
     students with scores 3+; 195 students, 446 exams). A score of 3+ is the level most
     colleges treat as a passing result."
   - Six bucket cells and their quals: the step-2 counts.
     - Fix the P4 qual so its number equals the cell; it currently says 43 against 52.
     - Every qual keeps "matched against the 2027 U.S. News tables".
   - Counselor ratio: `'~26:1'`, comment `// 105 seniors (Class of 2026) ÷ 4 counselors`.
     Qual: "About 26 seniors per dedicated college counselor at peak application season — 105
     seniors across 4 counselors. The school markets 28:1. A lower ratio means more counselor
     time per student."
   - Clubs: `'≥20'`, comment `// 8 named US orgs + 12 US honor societies (NHS chapter 2025)`.
     Qual: "11 Upper School honor societies" becomes "12".
   - Aid comments (897, 938): append "· restated, undated, in the 2026–27 profile". These
     are comments only.

9. **Regenerate and check.** Run `npm run schema`, `npx tsc -b`, then `npm run build`. The
   expected state is that `check:live` alone fails, on the edited English paths (see
   Verification). Then
   `grep -n "PROFILE_2526\|v1757349467\|Clay Morrell\|0/1/4/6\|eleven-course" src/data` must
   return 0 hits, outside the Implementation-notes mention if any.

10. **Schema-doc check.** Ask whether `DATA-SCHEMA.md` needs a rule: "a school profile can
    overwrite its predecessor at the same asset URL, so re-check every citation to it when
    a new edition lands". If yes, add it in `scripts/gen_data_schema.mjs` (§3 near the
    acceptance-list rules), then run `npm run schema && npm run check:schema`. Say
    explicitly in the stop message whether it was added.

11. **Browser check** (Verification), then commit with **explicit paths only**: the two TS
    data files, `metricValues.ts`, the masters and their companion `.md`s, the source-material
    files, the ingest outputs and `DATA-SCHEMA.md`. Run `git status --short` first. Push,
    verify with `git rev-parse HEAD` vs `git ls-remote`, and open the PR with `--body-file`.
    Flip the plan to `english-done` and the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording. The stop message lists every changed
user-facing string, the six new bucket counts, any names left unresolved, and the
decisions taken on the open questions.

### Phase 2 — Every other locale

**Scope:** prose overlays only, for `PROSE_TRANSLATED`, which is es, bn, ht, te, fr, fa,
it, hi and ar. There are three topics: `college-support`, `student-clubs` and
`metric-values`. If ingest added a `src/content/college-support/cannon.json` section, the
content overlay (`financial-aid-tuition.content`-style blocks; see `check:live` gates 2 and 3
in CLAUDE.md) is a fourth. **No `src/locales/*.json` changes.** The mechanism is in
[`prose-translation-architecture.md`](../docs/prose-translation-architecture.md); the
per-locale traps are in the `prose-translation-<lang>.md` docs and
`src/data/overlays/NOTES.md`.

12. **Measure scope from a fresh extract.** For each topic, run
    `node scripts/i18n_extract.mjs --topic <topic> --lang __verify --out <scratch>` and diff
    the stamps against `src/data/overlays/work/<topic>.es.json`. List retired and new stamps
    per topic **before** translating. If a count looks wrong, explain it first. The
    `wholeClass.flags` deletion shifts `flags[1]` down to `flags[0]`.

13. **Splice by stamp** into all nine work files per topic (memories
    `splice-work-files-by-stamp`, `splice-not-reextract-for-new-school`). Map by path **and
    meaning**, never by index. Reuse each locale's existing wording for: Advanced Topics,
    Honors Accelerated, Zero Hour, Summer Term, National Honor Society, Cum Laude, School
    Profile and the bucket names. Rules:
    - Figures char-for-char: `90.16%`, `446`, `195`, `105`, `421`, `0 / 1 / 5 / 6`,
      `4.08–4.28`, `3.85–4.0`, `1290`, `1510–1560`, `~26:1`, `28:1`.
    - `hi`/`te` store the English 3-3-3 figure.
    - `fa`/`ar` store **no** bidi isolates. Watch ranges in RTL; see NOTES.md and the
      `learningsupport` plan's "1 to 2" precedent.
    - Dates translate, but their digits do not ("May 2026", "2025").
    - Keep Latin: names (Brittany Pasut, Clay Morrell), college names, `AP`, `AT`, `SAT`,
      `ACT`, `SAIS`, `NAIS`, `NCAIS`, `CSEE`, `ACCIS`, `NACAC`, `SACAC`, `CEEB`, `BIOREX`.
      `fr` also keeps course codes (`check:fr`).

14. **Rebuild overlays:** `npm run i18n:build -- --topic <topic> --lang <code>` for each
    topic × nine locales.

15. **Phase 2 verification** (below). Then commit with explicit paths, push and verify,
    and merge with `gh pr merge --squash --delete-branch`. Run
    `git checkout main && git pull`. Flip the plan to `implemented` with an
    `## Implementation notes` section if anything deviated, and flip the INDEX row to
    *Implemented* with the PR link. **Do not deploy.** End with "merged — ready to deploy
    whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/cannon/Cannon School - College Support - School Profile 2026-2027.md` | new (written during planning) |
| `source-material/college-support/cannon/Cannon School - College Support - Acceptances Window 2023-2026.md` | edit: superseded note |
| `src/data/collegeSupportPrograms/cannon.ts` | edit: 2024–26 list, all six cards, `PROFILE_2627`, header |
| `src/data/clubsPrograms/cannon.ts` | edit: 105, NHS, Cum Laude date, citations |
| `src/data/metricValues.ts` | edit: AP %, buckets ×6, ratio, clubs floor, quals, comments |
| `src/data/collegeRankings.ts` + `source-material/college-support/_shared/US News 2027 - Rank Labels.md` | edit: rows for newly ranked names |
| `src/data/collegeUrls.ts` + `source-material/college-support/_shared/College Homepages 2026.md` | edit: rows for newly resolvable names |
| `src/data/collegeMemberships.ts` + `source-material/college-support/_shared/*` | edit only if `check:memberships` shows a roster gap |
| `.claude/docs/*`, `src/data/schools.json`, `src/content/college-support/cannon.json` | regenerated by ingest |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit only if step 10 says so |
| `src/data/overlays/work/{college-support,student-clubs,metric-values}.<lang>.json` + built overlays | Phase 2 |
| `.claude/plans/cannonprofile.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean.
- [ ] `check:ranks`, `check:collegeurls`, `check:buckets`, `check:memberships`: all clean.
      The six Cannon counts agree across the buckets row, the Ivy stat tile, the Compare
      cells and the quals.
- [ ] `npm run build`: **exits 1 on `check:live` only**, with findings limited to the Cannon
      paths edited above. This is the expected Phase 1 state, as in `hgcsconsistency` and
      `covenantadmissions`.
- [ ] `npm run check:schema` and `npm run check:metrics`: pass. There are no new ⚠️ unmatched
      subtopics unless they are explained.
- [ ] Grep from step 9: 0 hits.
- [ ] **Browser check (required).** Run `npx vite build && npm run prerender`, then
      `npx vite preview`. Use Playwright with real Chrome (`channel: 'chrome'`) and
      `domcontentloaded`, **not** `networkidle`. Force **every `<details>` open**.

      On `/school/cannon/`, College Support:
      - Where Graduates Go shows "Every acceptance, 2024–2026" and no bold rows.
      - The HBCU, Ivy and P4 filter chips list the right colleges.
      - Rank labels and homepage links render on the newly added names.
      - The transcript stats read `27 · 90% · 0 / 1 / 5 / 6`.
      - The roster shows Brittany Pasut.
      - Whole Class shows the Class of 2026 bands.
      - The verdict checklist shows the three rewritten questions.

      Student Clubs: twelve honor societies including NHS, and the Senior Capstone shows 105.

      On `/compare/`, the Cannon cells read `14 AP + 13 AT`, `90%`, the six new buckets,
      `~26:1` and `≥20`, with matching quals.

      Every "Show sources" link opens the v1791909516 PDF.
- [ ] `npm run audit:mobile -- --only cannon`: 0 overflow. The college list grew more
      varied in name length.

### Phase 2 — Locales

- [ ] `npm run build` exits **0**: `check:live` green and `check:runtime` resolving all nine.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9: 0 drifted tokens.
- [ ] `check_figures.py --topic college-support`, `--topic student-clubs` and
      `--topic metric-values` ×9: clean.
- [ ] `npm run check:money`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script`
      and `check:dates`: clean.
- [ ] `node scripts/check_work_integrity.mjs --base <Phase 1 commit>`: clean.
- [ ] 0 duplicate `at` paths in each rebuilt overlay.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, diffed against a baseline taken on `main`:
      no new hits.
- [ ] Browser spot-check, with `<details>` open, of `/school/cannon/?lang=es` and `?lang=ar`.
      The new strings are translated, the figures are intact, and the RTL ranges are not
      reversed.

## Risks

| Risk | Mitigation |
|---|---|
| A transcription slip in the 218 names (the PDF has no text layer) | Re-read page 4 from a `pdftoppm` render before step 2, and diff it against the source file's numbered list |
| An ambiguous name (Wheaton, Trinity, Western) gets the wrong rank or URL | Never guess. Leave it unresolved with `cats: []`, and list it in the stop message |
| Bucket counts drift across the four surfaces | The `check:buckets` / `check:memberships` gates; check the P4 qual by eye |
| A full ingest sweeps other topics | Diff the ingest output; commit only Cannon college-support changes |
| A `flags`/`checklist` index shift strands overlays | Replace in place or append; the one deletion is mapped by meaning in step 13 |

## Open questions

- **Cum Laude "2005" and Independent Curriculum Group.** Both are true per earlier research.
  Their only citation, the 2025–26 profile, is no longer reachable, and the new edition omits
  them. Owner: Derrick. **Default:** remove the 2005 date and ICG, and keep the Cum Laude
  society, cited to the live Upper School page.
- **Whether Cannon still markets "28:1".** Owner: `/implement` (check the live College
  Counseling page, including image alt text). **Default:** keep the stat if found. If not
  found, replace it with the `'~26:1'` computed figure, labelled as computed.

## Implementation notes

Phase 1 (English), 2026-10-25:

- **Counts shipped:** Ivy 7/8 · Ivy Plus 14/17 · Top-75 National 62/75 · Top-75 LAC
  28/75 · Power Four 55/68 · HBCU 10/107. The planning probe's NU75 ~61 moved to 62
  because **Rutgers University (Newark) is National #73** (from the 2027 National PDF
  harvest), and HBCU moved from 8 to 10 once **Southern University and A&M College** and
  **West Virginia State University** were added to the `HBCUS` roster (both on the DoE
  roster; neither had appeared on any list before).
- **"28:1" is no longer marketed.** The live College Counseling page (rendered in real
  Chrome, plus image alts) and four other cannonschool.org pages carry no ratio. Per the
  Open-question default, the transcript-card stat became `~26:1`, labelled as computed
  (105 ÷ 4), the verify flag says the claim is gone, checklist[1] no longer quotes it, and
  the Compare qual drops "The school markets 28:1."
- **Masters:** 11 rank rows (Illinois Tech, La Salle, Luther, Rutgers–Newark, Southern
  University and A&M, UAB / Hawaii Manoa / UIC Cannon spellings, Idaho, Pacific,
  Ursinus); Ursinus, Luther and Southern were fetched by Route A in headed Chrome, with
  names verified. 20 homepage rows, curl-verified. All 218 names now link. 47 have no
  rank label (Regional, foreign, specialty or community: confirmed nulls).
  `Wheaton College` and `Trinity College` resolve through existing master rows (#81 and
  #31); `University of Texas` resolves to Austin (#34).
- **23 orphaned homepage rows removed** from `collegeUrls.ts` and its companion `.md`.
  These are names only the old 2022–24 Cannon list used; `check:collegeurls` fails on
  orphans. `check:ranks` reports one orphan (Washington & Jefferson) as a notice only, and
  it was left.
- **Resolver gap FIXED (added at the user's request after the Phase 1 review).**
  `canonicalRanked()` did not apply `collegeRankings.ts`'s alias map (now exported as
  `RANK_ALIAS`). So `Rensselaer Polytechnic Institute`, `University of the South` and
  `Washington & Lee` rendered a top-75 label and carried the tag, yet were left out of
  the printed count. Fixing it moved 11 bucket figures across 7 schools by +1 each:
  - Cannon 63/75 · 29/75
  - Charlotte Christian 40 · 10
  - Country Day 71 · 44
  - Latin 68
  - Davidson Day 49
  - Gaston Day 59
  - Hickory Grove 21 · 9

  Each figure moved on its buckets row, Compare cell and explanation line. Each +1 was
  checked as a distinct new institution, not a double count. A side effect: Hickory
  Grove's stat tile already read 9 Top-75 LAC while its row said 8, and the two now agree.
  The other schools' explanation lines are rewritten English, so Phase 2 translates them
  too: `check:live` sits at 88 unresolvable per locale, up from 72. A DATA-SCHEMA note
  records the rule.
- **Gaston Day verdict prose fixed (user's request).** "23 top-75 liberal arts
  colleges" now reads **24**, matching its `24 / 75` LAC row. The mismatch predated this
  plan. This adds one more English edit for Phase 2 (`check:live` goes to 89 per locale).
- The plan's step-9 grep still hits `Clay Morrell` once. That is intentional: the
  coordinator `detail` the plan specified ("succeeding Clay Morrell").
- Senior Capstone tile `105`: its source link stays the Upper School curriculum page (as
  planned). The count comes from the 2026–27 profile.
- Schema-doc rule **added** (step 10): §3 now says that a profile can overwrite its
  predecessor at the same URL.
- Verdict checklist[5] still asks why the 2025–26 profile published Class of 2025 scores.
  That edition is no longer retrievable. The plan left the question alone, and it remains
  a fair question for the school.

### Revisions after the Phase 1 review (user decisions, 2026-10-25)

- **Window is now 2022–2026, not 2024–2026.** This reverses two Decisions above: "replace
  the list wholesale" and "drop all `enrolling` markers". The reason: Davidson Day
  (2021–2025) and Gaston Day (2019–2025) already show pre-2023 blocks that cannot be split
  by class, so Cannon may too. The 2022–24 list (2024–25 profile) and the 2024–26 list
  (2026–27 profile) are merged, each institution once: **352 rows**.
  - The **58 Class of 2023 matriculation bold markers return**, since that class sits
    inside the window: `collegesTotal` reads "352 institutions · bold = a Class of 2023
    student enrolled". The 2024–25 profile is cited again as the source of the 2022–24
    list.
  - **Where the two lists spell one institution differently, the row uses the
    institution's official name** (29 groups, e.g. "University of North Carolina at
    Charlotte", "Penn State University Park", "University of Wisconsin–Madison", "William
    & Mary"). The bold marker carries to that row.
  - The bare "Wheaton College" row was dropped, because both Wheaton IL and Wheaton MA
    are on the 2022–24 list. "University of Charleston" (WV) is a different institution
    from the College of Charleston, and both stay.
  - New counts:
    - Ivy 7/8
    - Ivy Plus 16/17
    - Top-75 National 75/75 (clamped)
    - Top-75 Liberal Arts 45/75
    - Power Four 61/68
    - HBCU 11/107
  - The arts example restores its original wording (Pratt, Parsons, …). The honest-list
    and non-traditional examples draw on both lists.
  - Masters:
    - The 23 homepage rows removed earlier were restored, except the ASU and UNH "(Main
      Campus)" spellings, which the merge maps to official names.
    - "Cal Poly" and "University of Hawaii (Manoa)" URL rows were removed, and the UIC
      and Hawaii parenthetical rank rows too, because no list uses those spellings now.
    - Penn State University Park got a rank alias, a membership alias and a homepage row.
- **Second latent count bug fixed.** `CAMPUS_TAGS` held `'college park'`, which can never
  match: `normName` turns "College" into "coll". So "University of Maryland-College Park"
  was never counted as Power Four. Charlotte Christian gained `p4` on it and moved
  **40 → 41 / 68**.
- **Six stale Power Four / HBCU explanation lines fixed**; the cells were right and the
  sentences had drifted:
  - Country Day 53→61
  - Davidson Day 42→45
  - Hickory Grove 24→25
  - Gaston Day 36→43
  - Providence Day 57→65
  - Latin HBCU 6→7

  `check:memberships` now also gates the "n of the 68 / 107" explanation lines; a
  negative test confirmed it.
- **Compare shows the window under every bucket fraction** (user request). Each of the
  six bucket rows carries `subs: ACCEPTANCE_WINDOWS`, e.g. `(2022–2026)`;
  Carmel Christian shows `(years not published)`. `check:buckets` fails if a label
  disagrees with that school's `collegesTitle` years (negative-tested). The **AP scoring
  3+** row shows the exam session each figure covers: `(2026)`, `(2024–25)`, and so on.
  These figures are by exam year, not graduating class, because that is how every school
  reports them. Phase 2 must translate the new `subs` strings, chiefly
  `(years not published)`.
- `check:live` now sits at 95 unresolvable entries per locale, all cleared by Phase 2.
- **School-page College Support stat tiles show the same second line** (user request).
  `SchoolDetail.tsx` renders `vm.subs[slug]` as `.stat-tile-sub` under the value. It is
  **scoped to `college-support`**, so the After School aftercare-cost tile, the one other
  tile row carrying `subs`, does not gain its annualized line unasked. Browser-checked on
  Cannon (1400px and 360px, no overflow) and on Carmel Christian, which shows
  `(years not published)`. Phase 2 has no new chrome keys: the strings are the
  same `subs` data Compare uses.
- **Counseling card flags removed** (user request): the 28:1 verify flag and both
  publication-gap flags (counselor tenure/rep visits; student-facing curriculum). The card
  now has `flags: []`. The `~26:1` stat label still says it is computed. Phase 2 should
  expect those three stamps to retire. All three went, so no remaining flag index shifts.
- **Counselor emails on the "Who's in the room" roster** (user request). `Counselor` gained
  an optional `email`, rendered as a mailto link with the "<School> Inquiry" subject (the
  Learning Support staff-card treatment), and `CounselingBody` now takes `schoolName`.
  Cannon's directory publishes addresses for only **Heidi Waibel**
  (hwaibel@cannonschool.org) and **Brittany Pasut** (bpasut@cannonschool.org), decoded from
  each profile's `FS.util.insertEmail` call. Brayboy, LeFevre and Stavrakas profiles carry
  bios but no email, so none is shown. Provenance is in the School Profile 2026-2027
  source file. The card gained a Faculty & Staff Directory source line, which Phase 2
  translates. `email` is already globally skipped by the extractor. Charlotte Catholic's
  roster still carries its addresses as plain `detail` text. That was not changed here; it
  could move to `email` in a later pass.
- **Counselor emails extended to every school** (user request). Each address was found
  on the school's own site and checked to sit beside the named person, never built from a
  name pattern:
  - Carmel Christian 4/4, Charlotte Christian 3/3, Country Day 5/5, Covenant Day 4/4,
    Gaston Day 2/2 and Providence Day 5/5, from their counseling pages' `mailto:` links.
  - Charlotte Latin 4/4, from each counselor's Finalsite pop-up. The essay-specialists
    row is a combined row and gets no address.
  - Davidson Day 3/3. The registrar's address came from the directory search.
  - Hickory Grove 2/2, from the Our Staff directory via `insertEmail`.
  - Charlotte Catholic 7/7. Its addresses moved from plain `detail` text to `email`, so
    they are now clickable.

  Hickory Grove's two notes no longer repeat the address in parentheses. Davidson Day and
  Hickory Grove each gained a directory source line. Provenance is a "Counselor email
  addresses" section appended to an existing research file per school, so no new research
  section or card appears. `check:live` sits at 99 per locale, all in the College Support
  overlay.
