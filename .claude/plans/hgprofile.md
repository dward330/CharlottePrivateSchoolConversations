---
name: hgprofile
title: Refresh Hickory Grove Christian from its 2026–27 High School Profile — merge the Class of 2026 list into the 2023 + 2025 list (158 rows), the new 65/25/10 attendance split, May 2026 AP, Class of 2026 ACT/SAT means, 2020–26 recognition and AP Scholars, 287 students, plus Sports (15 varsity teams, verified relay/event titles); Tuskegee added to the HBCU master
status: english-done
phases: 2
created: 2026-11-04
branch: feat/hg-profile-2627
prs: []
---

# Refresh Hickory Grove Christian from its 2026–27 High School Profile

## Goal

Hickory Grove Christian published a **2026–2027 High School Profile** (the user supplied the
URL on 2026-11-04). It carries the **Class of 2026 acceptance list (76 institutions)**, May
2026 AP results, final Class of 2026 ACT/SAT means, a 2020–2026 recognition window and the
new enrollment (287).

This plan moves Hickory Grove's College Support cards, Compare cells **and Sports cards** to
that edition. The user asked (2026-11-04) for **every** update the profile carries: the
latest testing data, stats, sports updates, AP Scholar updates and college attendance rates.
The headline change: the Class of 2026 list is **merged** into the shipped 2023 + 2025 list (132),
giving **158 institutions** (132 kept + 26 new). Nothing is removed. The buckets can only go
up: probe NU75 21 → 27, P4 25 → 28, HBCU 20 → 23.

It is done when the Hickory Grove page and Compare show the new figures in English, each one
traceable to `Hickory Grove Christian - College Support - School Profile 2026-2027.md`, and
`npm run build` is green after Phase 2 in all ten locales.

This is the same job as [`ddprofile.md`](ddprofile.md) and [`christianprofile.md`](christianprofile.md).
**Read `ddprofile.md` first** (Context § "The acceptance-list machinery", Decisions, Phase 2,
and its Implementation notes). Most of its method carries over unchanged.

## Prerequisite

**`ddprofile` must be merged to `main` first.** At planning time it sat at *English shipped*
on `feat/dd-profile-2627`, with Phase 2 edits to the `college-support` and `metric-values`
overlay work files uncommitted in the shared tree. This plan regenerates those same files, so
running both at once guarantees a conflict. Check `.claude/plans/INDEX.md`. If `ddprofile` is
not *Implemented*, stop and tell the user. Never `git stash` someone else's work to get
around it (memory `never-git-stash-in-shared-tree`).

## Context

### The source, already on disk (uncommitted)

[`source-material/college-support/hickory-grove-christian/Hickory Grove Christian - College Support - School Profile 2026-2027.md`](../../source-material/college-support/hickory-grove-christian/Hickory%20Grove%20Christian%20-%20College%20Support%20-%20School%20Profile%202026-2027.md)
was written during planning. It holds the verbatim transcription, the **76-row list in
printed order**, the planning-time diff and the bucket probe. **It is the authority for every
figure below. Read it first.** The older edition's facts are in the sibling
`Hickory Grove Christian - College Support - School Profile.md`.

New URL, for every citation of the new edition:

```
https://resources.finalsite.net/images/v1790771210/hgchristianorg/l6paia83bjrvwh9kpm20/2026-2027SchoolProfile.pdf
```

**The old editions were not overwritten.** The Fall 2025 (`PROFILE_25`) and Fall 2023
(`PROFILE_23`) PDFs are separate assets and still serve their own files (checked
2026-11-04). This is unlike Davidson Day, so no Wayback citation is needed. Keep both
constants, and cite each list to its own edition.

### What changed, edition to edition

| Fact | App today | 2026–27 edition |
|---|---|---|
| Acceptance list | 2023 + 2025, **132** rows | Class of 2026, 76 rows, no markers. 47 exact matches, 3 respellings, **26 new**. **Merged: 158** |
| Enrollment | 275 HS students (2025–26), 11 international | **287**, 60% students of color, **3** international |
| College attendance | Class of 2025: 64% (43) 4-yr · 22% (15) 2-yr · 11% (7) none · 3% (2) gap | "Typical": **65%** 4-yr · **25%** 2-yr · **10%** workforce, military or gap year. **No class year, no counts** |
| AP results | May 2025: 82 students / 176 exams; 29 / 59 / 53 earned a 5 / 4 / 3 | **May 2026: 85 / 176; 14 / 38 / 50** |
| AP courses printed | 14 titles | **13**: Calculus BC and Psychology gone, Human Geography back |
| ACT, Class of 2026 | mean 20.5 (n=85) | mean **20.5 (n=79)**, E 21.1 · M 18.7 · R 21.7 · S 21, range 12–31 |
| SAT, Class of 2026 | **median** 1090 (n=20) | **mean 1066 (n=45)**, ERW 551 · M 515, range 760–1400 |
| National recognition | 2019–2025: NMF 1 · Commended 7 · NAARA 8 · NHRA 6 | **2020–2026**: 1 · **8** · 8 · 6 |
| AP Scholars | "2024–2025": 22 · Honors 5 · Distinction 10 · Capstone 4 · Sem & Res 1 | **same label "2024-2025"**: **18 · 6 · 10 · 3 · 1** |
| Dual enrollment | Judson College + NC CCP | same, plus "(Only courses taught by HGCS teachers are offered as dual credit.)" |
| Counseling staff, grading scales, weighting, no-rank, CEEB, 27 units | — | unchanged |
| Sports: varsity teams | "~30 teams across V · JV · MS" | **"Total Varsity Teams: 15"** (new figure) |
| Sports: titles | 12 team titles (softball 7, baseball 3, girls basketball 1, boys track 1) | Every team title on the profile matches the app. **New:** event titles, 2024 men's 4x400, 2023 men's 4x100, 2021 men's 400 m (plus the 2025 relays the app already alludes to) |

The sports block is transcribed, with an app comparison, in
`source-material/sports/hickory-grove-christian/Hickory Grove Christian - Sports - School Profile 2026-2027.md`
(written at planning, uncommitted).

### Files that cite or carry the profile

- [`src/data/collegeSupportPrograms/hickory-grove-christian.ts`](../../src/data/collegeSupportPrograms/hickory-grove-christian.ts) (605 lines):
  - The header comment (1–30) and the comment above `colleges` (42–46).
  - The `colleges` array (47–180), 132 rows in two literal styles (`{"name":…}` and `{ name: … }`).
  - `PROFILE_25` / `PROFILE_23` (34–37). Add `PROFILE_26` beside them.
  - `transcript` (302–362), `counseling` (365–420), `outcomes` (423–462), `edge` (466–499),
    `wholeClass` (502–560), `verdict` (563–602).
  - **`ncAdmissions` (government data) is not touched.**
- [`src/data/metricValues.ts`](../../src/data/metricValues.ts):
  - `ACCEPTANCE_WINDOWS['hickory-grove-christian']` `'(2023 + 2025)'` (line 146).
  - Bucket cells and quals: Ivy 360/385, Ivy+ 410/435, NU75 460/485, LAC75 510/535,
    P4 560/585, HBCU 828/853.
  - Caseload stays `null` (876), and the AP 3+ cell stays `null` (306). Comments only, if at all.
  - Line numbers are as of `main` at planning time. Grep `'hickory-grove-christian'` to re-find them.
- [`scripts/check_selectivity_buckets.mjs`](../../scripts/check_selectivity_buckets.mjs)
  line 154 reads the window out of `collegesTitle` with
  `/\d{4}(?:\s*[–+-]\s*\d{4})?/`. That matches **one** separator only, so a three-part title
  reads as `2023 + 2025`. It needs a one-character widening (step 2).
- [`src/data/collegeMemberships.ts`](../../src/data/collegeMemberships.ts) `HBCUS` (line
  133), and its record `source-material/college-support/_shared/HBCU - Membership and Count 2026.md`.
  Both lack **Tuskegee University** (step 3).
- [`src/data/collegeUrls.ts`](../../src/data/collegeUrls.ts) and
  `_shared/College Homepages 2026.md`: no URL yet for Tuskegee, Penn State Harrisburg,
  Southeastern Baptist Theological Seminary or Wheeling University.
- Generated by ingest (never hand-edit): `src/content/college-support/hickory-grove-christian.json`,
  `.claude/docs/college-support/hickory-grove-christian.md`, `src/data/schools.json`.
  `src/lib/metrics.ts` already folds any `… - College Support - School Profile…` subtopic onto
  `outcomes`, so **no metrics edit is expected**. Confirm with `npm run check:metrics`.
- **Out of reach:** `src/content/course-offerings/hickory-grove-christian.json` also cites the
  Fall 2025 profile. It is generated from Course Offerings source material and belongs to
  that area. Leave it.

### Why two phases

The plan rewrites research prose in the `college-support` and `metric-values` overlay topics.
So it ships English first, then the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa,
it, hi, ar). **No `src/locales/*.json` chrome changes.** College names, figures and `cats`
are not translated.

## Decisions

- **MERGE, never replace.** This is the user's standing rule (2026-11-04, memory
  `merge-acceptance-lists-never-replace`, and DATA-SCHEMA once `ddprofile` lands).
  - Union of the 132 shipped rows and the 76 printed: **132 + 26 = 158**.
  - The 3 respellings keep the app's existing row and add nothing: `Anderson University` →
    `Anderson University (SC)`, `University of Tennessee, Knoxville` → `The University of
    Tennessee, Knoxville`, `University of Illinois, Urbana-Champaign` → `University of
    Illinois at Urbana-Champaign`.
  - The 26 new rows keep their printed spelling. Add a master alias where needed; never
    re-spell a name.
  - Bucket counts only rise or hold. A drop is a resolution bug.
- **The window is `2023 + 2025–2026`.**
  - `collegesTitle: 'Every named acceptance (2023 + 2025–2026)'`.
  - `ACCEPTANCE_WINDOWS['hickory-grove-christian'] = '(2023 + 2025–2026)'`.
  - The `+` keeps the missing 2024 visible. **No Class of 2024 list exists in the record:**
    no Fall 2024 profile was found, and the Wayback guidance-page captures link none. Do not
    search again.
  - Unlike Davidson Day, the three lists are each class-tagged, but the app's list has no
    per-class marker and gets none (no new UX).
- **`Xavier University` is the Ohio university, a separate row from `Xavier University of
  Louisiana`.** It is printed bare, which is the official name of the Cincinnati school.
  That matches Davidson Day's resolution. Untagged (it resolves to National #208). The
  existing outcomes `verify` flag about Xavier is updated to say both rows exist and why.
- **Tuskegee University joins the HBCU master.** It is a federally designated HBCU, missing
  only because no school's list named it before. Add it to `HBCUS` and to the roster table
  in `HBCU - Membership and Count 2026.md`, with a dated provenance line. The denominator
  stays 107. This adds no Tuskegee row to any other school.
- **No `enrolling` (bold) markers.** None of the three editions marks matriculation.
- **College attendance: the 2026–27 split replaces the Class of 2025 one.** User decision
  2026-11-04 ("use the latest … college attendance rates").
  - The tile becomes `'65%'`, labelled "of graduates typically attend a 4-year college (25%
    2-year; 10% work, military or gap year)", cited to `PROFILE_26`.
  - The label must say **"typically"** and must not name a class. The profile prints no class
    year and no counts ("Typical post-high school plans are as follows").
  - `wholeClass.middle[1]` leads with the 65 / 25 / 10 split. The Class of 2025 figures
    (22% 2-year, 11% none) may stay as a labelled earlier year, because they carry counts.
  - The new block yields **no senior count**. The ≈34:1 caseload stays computed from the
    Class of 2025's 67 graduates, the latest published count. Say so in the flag.
- **Sports is in scope (user, 2026-11-04).** It is data inside existing Sports cards, with no
  new card or row.
  - `offered`: add the profile's **15 varsity teams**. Put it in the `subhead`, or relabel a
    stat tile, in place. Keep `~30` (all levels), which agrees with it.
  - **Event titles are not team titles.** The 2024 4x400, the 2023 4x100 and the 2021 400 m go
    into the existing Boys Track & Field `record.rows` text (and the 2025 text names its three
    relays) **only after each is confirmed in the NCISAA results archive**
    (`${ARCHIVE}22&years=…`, memory `ncisaa-results-archive`). An unconfirmed one is left
    off, and recorded as such in the sports source file. The team-title count stays **12**.
  - **Wells Fargo Cup:** an event title adds no Cup points of its own, so `check:cup` and the
    Cup ledger are untouched. Confirm `npm run check:cup` stays clean.
  - Name no student. The 2025 text's existing named athlete stays as shipped.
- **Every other area was swept for figures this profile updates** (user, 2026-11-04: "any
  other data … relevant to what we show or our data schema has a scope of"). The result:
  - **Admissions: in scope.** The profile states a high-school admission bar the app does
    not: applicants "must score at or above their grade level and be in good standing with
    their current school to be admitted". It goes into the existing grades 9–12 band text
    (step 9c).
  - **Course Offerings research record: in scope, no app change.** The Curriculum Guide
    research file still describes the 2025–26 profile's 14 AP titles. It gets a dated
    2026–27 note. `courseOfferings.ts` and Compare (`'112'`, `'17 AP'`) come from the
    2026–27 catalog and do not move.
  - **Checked, no change:**
    - Compare has no Hickory Grove testing, recognition or enrollment rows, and the AP 3+
      cell stays `null`.
    - Learning Support's "Entrance testing" row is about scheduling. The schema rule keeps
      admission bars out of Learning Support.
    - The Athletic Director (Jim Rhodes) matches Sports.
    - The Head of School and Principal appear on no card.
    - The 3 international students (Myanmar, South Korea, Vietnam) and the 60% figure have
      no field anywhere. They stay in source-material, because adding a field would be new UX.
- **The AP Scholar conflict is a dev-only `verify` flag.** Ship the 2026–27 counts (18 / 6 /
  10 / 3) under the label as printed, "2024–2025". Add a `verify` flag recording that the
  2025–26 edition printed 22 / 5 / 10 / 4 under the same label. Do not speculate on page
  about why. Per memory `verify-flags-are-dev-only`, this is a maintainer note and stays out
  of rendered prose.
- **SAT is now a mean.** The table row becomes `SAT Composite (mean)` `1066`. The note records
  that the 2025–26 edition printed a median (1090, n=20) for the same class mid-year. The
  Class of 2026 is now a graduated class, so the "ENTERING class" framing in `wholeClass` goes:
  the test scores, the AP session and the new list all describe the Class of 2026. The
  attendance figures are still the Class of 2025's.
- **AP count stays "17 + Capstone".** That is the school's catalog figure (Compare `'17 AP'`
  comes from the 2026–27 Course Selection Catalog). Only the "profile names N" reconciliation
  changes, from 14 to 13.
- **Recognition window becomes 2020–2026.** `meritTitle` drops its wrong "10-year" wording
  (2019–2025 is seven years): `'National recognition — the profile’s 2020–2026 window'`.
  "Up from the prior window" comparisons are made against the **Fall 2023 edition**
  (2019–2023: 1 Finalist / 5 Commended, 8 College Board awards). The windows overlap, so say
  "up from", not "added".
- **No new card, tile, row or metric key.**
- **Array edits replace in place or append.** Never delete from the middle of a prose array
  (memory `overlay-at-paths-go-stale-on-row-delete`). `colleges` is the exception: names are
  not extracted prose, so insert new rows alphabetically.

## Approvals needed

**None.** Every edit is data inside existing cards, lists, tiles, flags and Compare cells.
The `check_selectivity_buckets.mjs` regex widening is a checker fix, not UX.

## Source material

- **Written during planning (uncommitted):**
  `source-material/college-support/hickory-grove-christian/Hickory Grove Christian - College Support - School Profile 2026-2027.md`.
- **To append during `/implement`:** a one-paragraph "Superseded in part, 2026-11-04" note at
  the top of `Hickory Grove Christian - College Support - School Profile.md`. It points to the
  new file, says the app's list is now the merged 2023 + 2025–2026 list of 158, and says this
  file stays the record for the Class of 2023 and 2025 lists and the Class of 2025 attendance
  buckets.
- **Also written during planning (uncommitted):**
  `source-material/sports/hickory-grove-christian/Hickory Grove Christian - Sports - School Profile 2026-2027.md`.
- **Also written during planning (uncommitted):**
  `source-material/admissions/hickory-grove-christian/Hickory Grove Christian - Admissions - School Profile 2026-2027.md`.
- **To append during `/implement`:** a dated "2026–27 profile (2026-11-04)" note in
  `source-material/course-offerings/hickory-grove-christian/Hickory Grove Christian - Course Offerings - Curriculum Guide.md`,
  under its "AP courses (verbatim from the Profile PDFs)" section. It records the profile's
  13 named titles (Calculus BC and Psychology no longer printed; Human Geography back), the
  new "(Only courses taught by HGCS teachers are offered as dual credit.)" line, and the new
  URL. The 17-course catalog figure stands.
- `/implement` runs **`ingest-source-material`** in step 1, for `college-support`, `sports`,
  `admissions` and `course-offerings` under `hickory-grove-christian`. Keep only the
  Hickory Grove changes. A four-topic ingest is the case most likely to reorder
  `schools.json` (memory `two-topic-ingest-reorders-manifest`), so restore HEAD order if it
  does. A Sports
  "School Profile 2026-2027" subtopic must fold onto an existing card key, and
  `check:metrics` must show no new ⚠️. If it slugifies into a new card, add a `RULES`
  mapping in `src/lib/metrics.ts` rather than shipping a new card.

## Out of scope

- The `ncAdmissions` card. A Fall 2026 term is a separate `nc-admissions-data` pull.
- Course Offerings (`'112'`, `'17 AP'`) and its content file.
- The Wells Fargo Cup ledger and card.
- Re-scoring any other school, or the US News edition.
- Deploying. This plan never runs `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch and ingest.**
   - Confirm the Prerequisite. Then from an up-to-date `main`: `git checkout -b feat/hg-profile-2627`.
   - Append the superseded note (Source material).
   - Run the `ingest-source-material` skill for `college-support/hickory-grove-christian`.
   - Keep only the Hickory Grove college-support changes to `.claude/docs/`,
     `src/data/schools.json` and `src/content/college-support/hickory-grove-christian.json`.
     A full ingest can reorder the manifest (memory `two-topic-ingest-reorders-manifest`).
   - `npm run check:metrics`: the new subtopic maps to `outcomes`, with no new ⚠️.

2. **Widen the window regex** in `scripts/check_selectivity_buckets.mjs` line 154:
   `?` → `*`, so `/\d{4}(?:\s*[–+-]\s*\d{4})*/`. Every other school's title has one
   separator and reads the same. Run `npm run check:buckets` on the untouched data first and
   confirm it is still clean.

3. **Masters.**
   - `HBCUS` in `collegeMemberships.ts`: add `'Tuskegee University'`. Add its row to the
     roster table in `_shared/HBCU - Membership and Count 2026.md`, with location (Tuskegee,
     AL), a source URL and "added 2026-11-04 (hgprofile)".
   - `collegeUrls.ts` + `_shared/College Homepages 2026.md`: homepages for Tuskegee
     University, Penn State University, Harrisburg, Southeastern Baptist Theological
     Seminary and Wheeling University. Confirm each **in a browser, by name and city**
     (memory `http-200-proves-no-homepage`).
   - Ranks: probe each new name with `rankLabelFor`. A Regional-only school stays unranked by
     design. Tuskegee: look it up. If US News lookups are blocked, ask the user for a
     screenshot (memory `latinprofile-shipped`), or leave it unranked as a recorded null.
     Rank does not affect any bucket here, since no candidate sits near 75.

4. **Merge into `colleges`.**
   - Keep all 132 rows and their `cats`, unchanged.
   - Insert the 26 new names alphabetically, `cats` from the masters (script it; do not tag
     by eye). Expected tags: `nu75` Boston, UC Davis, UC Santa Barbara; `nu75`+`p4` Purdue,
     Georgia, Virginia Tech; `hbcu` Benedict, Morgan State, Tuskegee; the rest `[]`.
   - **Assert by script:** 158 rows; each of the 76 printed names matches exactly one row,
     directly or via the 3 respellings; no institution appears twice.
   - Run `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`.
     Read every violation as a question first.
   - Write a scratch tally of the six counts; steps 5–8 use it. Probe: Ivy 0 · Ivy+ 0 ·
     NU75 27 · LAC75 9 · P4 28 · HBCU 23.
   - Rewrite the comment above the array: the union of the Class of 2023 (81), 2025 (86)
     and 2026 (76) lists, 158 institutions, three respellings folded, the Ohio Xavier kept
     separate, no matriculation markers.

5. **`outcomes` card.**
   - `headline`: "158 distinct institutions appear across the school's three published
     acceptance lists (Classes of 2023, 2025 and 2026) — from Bowdoin, Pomona, Georgia Tech
     and Boston University through a deep bench of NC publics, Christian colleges and HBCUs."
   - `subhead`: keep the no-matriculation framing. Add that no Class of 2024 list was published.
   - `stats`: `'158'`, "institutions across the 2023, 2025 and 2026 acceptance lists". The
     `64%` tile becomes `'65%'` per the attendance Decision. LAC tile: use the tally (expect `9`). HBCU tile: use the tally
     (expect `23`).
   - `buckets`: use the tally. HBCU note: "— incl. Howard, Hampton, Morehouse, Tuskegee, NC
     A&T, Florida A&M". LAC note unchanged unless the tally moves.
   - `collegesTitle`: `'Every named acceptance (2023 + 2025–2026)'`.
   - `collegesTotal`: `'158 institutions across three published class lists · no matriculation markings'`.
   - `scholarships[2]`: "HBCU strength: 23 HBCUs across the three lists".
   - `scholarshipsNote`: unchanged ("The profiles publish…").
   - `flags[0]` (verify): replace the Xavier sentence with: the list holds both `Xavier
     University of Louisiana` (2023 list, HBCU) and `Xavier University` (2026 list, printed
     bare, read as the Ohio university by its official name, untagged).
   - `sources`: add `PROFILE_26` first, "hgchristian.org — 2026–27 High School Profile (Class
     of 2026 list, attendance split)". Keep `PROFILE_25` (relabel "(Class of 2025 list)") and
     `PROFILE_23`.

6. **`transcript` card.**
   - `headline`: "85 students sat 176 AP exams in May 2026 across a 17-course AP program with
     AP Capstone — and 14 of them earned a 5 on at least one exam."
   - `stats[1]`: `'85 / 176'`, "AP students / exams, May 2026 (14 earned a 5 on ≥1 exam)".
   - `meritTitle` per Decisions. `merit`:
     - `'2020–2026'`: "National Merit — 1 Finalist and 8 Commended Students across the
       seven-year profile window."
     - `'2020–2026'`: College Board line, 8 + 6 unchanged.
     - `'2024–2025'`: "AP Scholars — 18 AP Scholars, 6 with Honors, 10 with Distinction, plus
       3 AP Capstone Diplomas."
   - `meritNote`: keep the cumulative-window sentence, and compare with the Fall 2023 edition
     (1 Finalist / 5 Commended; 11 AP Scholars).
   - `depth[0]`: "The 2026–27 profile names 13 by title (Calculus BC and Psychology are no
     longer printed; Human Geography is back); the 2023 profile named 17." Recompute the
     distinct-title count across the three editions by script, and print it only if it is
     still worth stating.
   - `depth[1]`: 14 / 38 / 50, May 2026.
   - `depth[2]`: "(2026–27 profile; prior years …)", plus the new rule that only courses
     taught by HGCS teachers carry dual credit.
   - `trust[1]`: "Transcripts of the Classes of 2025 through 2027 span both scales."
   - `flags[0]` (gap): "(14)" → "(13)". **Append** a `verify` flag with the AP Scholar
     conflict (Decisions).
   - `sources`: `PROFILE_26` first, "(CEEB, AP list, grading scale, May 2026 AP results,
     recognition)". Keep `PROFILE_23` as the prior window. Drop `PROFILE_25` here only if no
     transcript figure still rests on it.

7. **`counseling` card.**
   - `subhead`: "…against the Class of 2025 senior count, the latest the school has published,
     it computes to roughly 34:1 across the two staff, or about 144:1 measured over all 287
     high-school students."
   - `stats[2]`: `'287'`, "high-school students (2026–27)".
   - `roster[0].detail`: "Listed as "Guidance Counselor" on the Fall 2023 profile and
     "Director of Counseling" since Fall 2025 — the lead college-counseling contact."
   - `flags[0]`: 287 and ≈144:1. Add that the 2026–27 profile prints attendance shares without
     counts, so no newer senior count exists.
   - `sources[0]`: `PROFILE_26`, "(counselor roster, enrollment)".

8. **`edge`, `wholeClass`, `verdict`, header.**
   - `edge.levers[0].items[0]`: "3 AP Capstone Diplomas in the profile's 2024–25 window, and
     85 students sat 176 exams in May 2026".
   - `edge.levers[0].items[1]`: "1 National Merit Finalist and 8 Commended over 2020–2026, up
     from 1/5 in the 2019–2023 window, plus 14 College Board …".
   - `edge.levers[1].items[2]`: "23 HBCUs and the full NC public system appear across the
     three acceptance lists".
   - `edge.sources[0]` → `PROFILE_26`.
   - `wholeClass`:
     - `headline`: "(SAT n=45)".
     - `subhead`: test scores are the Class of 2026's, the same class as the newest list. The
       attendance split is the Class of 2025's. All tables are means.
     - Score table: `hint` "— both are means; Class of 2026". Rows: `ACT Composite (mean)`
       `20.5`; `SAT Composite (mean)` `1066`. `note`: "Class of 2026: ACT mean 20.5 (n=79,
       range 12–31); SAT mean 1066 (n=45, range 760–1400). The 2025–26 profile printed a
       SAT median for the same class mid-year (1090, n=20). Class of 2024: ACT mean 19.7
       (n=63); SAT median 1110 (n=12)."
     - AP table: `title` "AP recognition — count tiers (2024–25 window)", values 18 / 10 /
       6 / 3.
     - `middle[0]`: "The three acceptance lists run from Bowdoin, Pomona, Georgia Tech and
       Boston University through …". Keep the rest if every name in it is still on the list
       (all are).
     - `middle[1]`: lead with the 2026–27 profile's typical split (65% 4-year, 25% 2-year,
       10% work, military or gap year). The Class of 2025 shares may follow as the earlier,
       counted year.
     - `sources`: `PROFILE_26` first; keep `PROFILE_23` for the prior-year means. Keep
       `PROFILE_25` for the mid-year SAT median.
   - `verdict`:
     - `points[0]`: "176 exams sat in May 2026, 14 students earning a 5 on at least one, and 3
       AP Capstone Diplomas".
     - `points[1]`: "(1 Finalist / 8 Commended) and 14 College Board National recognitions over
       2020–2026, both up from the 2019–2023 window".
     - `points[3]`: label "Outcomes show breadth over three classes". Text: "158 institutions
       across the 2023, 2025 and 2026 lists — Bowdoin and Pomona at the top, 23 HBCUs, …".
     - `points[4]`: "(SAT n=45)".
     - `checklist[1]`: "Which of the 17 AP courses actually run in 2026–27 — the profile names
       13, the catalog lists 17?"
     - `checklist[2]`: "…where did the Classes of 2024, 2025 and 2026 actually matriculate…"
     - `checklist[4]`: "Only 45 students took the SAT and 79 the ACT — …".
   - Header comment (1–30): three profile editions; outcomes are Class of 2025 attendance
     and the 2023 / 2025 / 2026 lists; test scores and AP are the Class of 2026 and May 2026.
     Drop the "ENTERING Class of 2026" wording.
   - Final sweep: `grep -n "2025–26\|2019\|May 2025\|275\|132\|n=20\|n=85\|\b29\b\|\b22\b\|ENTERING\|PROFILE_25" src/data/collegeSupportPrograms/hickory-grove-christian.ts`.
     Each hit is updated or a deliberate keep (a figure labelled with its year, or a citation
     of the 2025 list). Record the keeps in Implementation notes.

9. **Compare** (`src/data/metricValues.ts`).
   - `ACCEPTANCE_WINDOWS['hickory-grove-christian']` → `'(2023 + 2025–2026)'`.
   - The six bucket cells → tally counts. Update their comments ("2023+2025 lists" → "2023 +
     2025–2026 lists").
   - The six quals: "published 2023 + 2025 acceptance lists" → "published 2023, 2025 and 2026
     acceptance lists", with the new count. HBCU qual names: Howard, Hampton, Morehouse,
     Tuskegee, NC A&T, Florida A&M.
   - The caseload (`null`) and AP 3+ (`null`) cells stay. Comments only, if anything.
   - `npm run check:buckets && npm run check:quals`.

9b. **Sports** (`src/data/sportsPrograms/hickory-grove-christian.ts`).
   - Verify the 2024 4x400, 2023 4x100 and 2021 400 m titles, and the event names behind
     2025's "three relay wins", in the NCISAA archive (`ARCHIVE` + `22&years=2023-2024`,
     `2022-2023`, `2020-2021`; 2025 is `TRACK_25`). Record each result, confirmed or not
     found, with its URL in the sports source file.
   - `offered`: add the 15 varsity teams in place (subhead or a relabelled tile), with
     `PROFILE_26`-equivalent source "hgchristian.org — 2026–27 High School Profile (15 varsity
     teams)" added to `offered.sources`. Define a `PROFILE_26` constant in this file too.
   - `record.rows` Boys Track & Field: append the confirmed event titles to the existing
     text, for example "…backed by wins in the 4x200, 4x800 and 4x400 relays; the 4x400 also
     won in 2024, the 4x100 in 2023 and the 400 m in 2021." Name no athlete. Add the archive
     brackets used to `record.sources`.
   - **Leave** `record.headline`, the 12-title count and the `bars`: event titles are not
     team titles.
   - `npm run check:cup && npm run check:metrics`.

9c. **Admissions** (`src/data/admissionsPrograms/hickory-grove-christian.ts`, the grades 9–12
   band).
   - First re-read the school's live admissions page (the URLs in
     `… - Admissions - Live-Site Refresh 2026-10-04.md`). If it now states a different bar,
     stop and report the conflict instead of writing either one.
   - In the high-school band's `checklistCallout.text` (around line 662), extend the
     entrance-test sentence: "…a mandatory entrance test that determines grade placement —
     and, per the school's 2026–27 High School Profile, applicants must score at or above
     their grade level and be in good standing with their current school to be admitted."
     Edit in place; delete no array item.
   - Add the profile to that band's or the file's sources list, in the file's existing
     citation style, labelled "hgchristian.org — 2026–27 High School Profile (grades 9–12
     admission requirement)".
   - Update the file's header comment where it describes the HS entrance test.
   - Run `npm run check:metrics`, and grep the file for any other sentence that now
     understates the bar.

10. **Schema check.** Read the acceptance-list section of `DATA-SCHEMA.md` (the generator is
    `scripts/gen_data_schema.mjs`). If it lists windows by example or describes the bucket
    window regex, update the generator for the three-part form, then `npm run schema &&
    npm run check:schema`. If nothing needs changing, say so explicitly in Implementation
    notes.

11. **Verify (Phase 1 checks below), commit with explicit paths, and set the INDEX row to
    *English shipped*.** Run `git status --short` before staging, because the tree is shared.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
`college-support`, `metric-values`, `sports` and `admissions` overlay topics only. Also run
the content-overlay check (`check:live` gate 2) if the course-offerings ingest changed any
`src/content` block that ships a translation. **No chrome catalogs.** Mechanism:
`ddprofile.md` Phase 2 and `.claude/docs/prose-translation-architecture.md`.

1. **Re-extract** to a throwaway `--lang xx --out <scratch>` first, to get the exact unit diff.
   `i18n_extract.mjs` has **no carry-over**, so carry each locale's existing `t` across by
   **English text**, never by index (memory `christianprofile-shipped`).
2. **Translate only the changed and new units.** Figures are copied char-for-char:
   `158`, `85 / 176`, `20.5`, `1066`, `n=45`, `≈144:1`, `2023 + 2025–2026`, `2020–2026`. A
   Compare qual whose wording matches another school's shipped template can be generated from
   that school's translations by swapping the name and count (memory `latinprofile-shipped`),
   asserting exactly one count token. Lakh/crore regrouping is render-layer (`hi`/`te`).
   RTL isolates are render-layer (`fa`/`ar`). Dates translate, their digits do not.
3. **Rebuild the overlays** with `i18n_build_overlay.mjs`. Run the Phase 2 checks, open the
   PR (`--body-file`), merge, and set the INDEX row to *Implemented* with the PR link.

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/hickory-grove-christian/…School Profile 2026-2027.md` | new (written at planning) |
| `source-material/college-support/hickory-grove-christian/…School Profile.md` | superseded-in-part note |
| `source-material/college-support/_shared/HBCU - Membership and Count 2026.md`, `College Homepages 2026.md` | Tuskegee; four homepages |
| `src/data/collegeMemberships.ts`, `collegeUrls.ts` (maybe `collegeRankings.ts`) | Tuskegee HBCU; homepages; any rank alias |
| `src/data/collegeSupportPrograms/hickory-grove-christian.ts` | list (158), six cards, `PROFILE_26`, comments |
| `src/data/metricValues.ts` | window, six buckets + quals |
| `source-material/sports/hickory-grove-christian/…School Profile 2026-2027.md` | new (written at planning); verification results appended |
| `src/data/sportsPrograms/hickory-grove-christian.ts` | 15 varsity teams; verified event titles in the track row |
| `source-material/admissions/hickory-grove-christian/…School Profile 2026-2027.md` | new (written at planning) |
| `src/data/admissionsPrograms/hickory-grove-christian.ts` | HS admission bar, one sentence + source |
| `source-material/course-offerings/hickory-grove-christian/…Curriculum Guide.md` | dated 2026–27 profile note |
| `scripts/check_selectivity_buckets.mjs` | window regex `?` → `*` |
| `scripts/gen_data_schema.mjs` + `DATA-SCHEMA.md` | only if step 10 finds something |
| `src/content/…`, `.claude/docs/college-support/hickory-grove-christian.md`, `src/data/schools.json` | regenerated by ingest |
| `src/data/overlays/{college-support,metric-values}.<9>.json` + work files | Phase 2 |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships && npm run check:quals && npm run check:metrics`: clean.
- [ ] Negative test for the regex: temporarily set the HG window cell to `'(2023 + 2025)'`
      and confirm `check:buckets` prints STALE WINDOW LABEL for it. Revert, and diff
      `metricValues.ts` back to clean (memory `negative-test-must-isolate-the-assertion`).
- [ ] `npm run build`: green through the chain, except `check:live` reporting stale
      `college-support` / `metric-values` stamps. That is expected Phase 2 work.
- [ ] No bucket count is lower than on `main`.
- [ ] Browser check: `npm run build && npx vite preview`, then `/school/hickory-grove-christian`.
      Open every College Support card.
  - The list heading reads "Every named acceptance (2023 + 2025–2026)", with 158 rows.
  - Bowdoin, Pomona and Washington & Lee are still listed. Boston University, Purdue,
    Tuskegee and both Xaviers are present; Tuskegee carries the HBCU tag.
  - Bucket tallies match the Compare cells.
  - The tiles show `158`, `65%`, `85 / 176`, `287`, `23`.
  - Admissions: pick the grades 9–12 band; the callout states the at-or-above-grade-level
    bar and the good-standing condition.
  - Sports: Sports Offered shows 15 varsity teams, the record headline still says twelve
    titles, and the track row lists only confirmed event titles.
  - Every source link opens the right edition.
- [ ] Compare: the Hickory Grove bucket cells show `(2023 + 2025–2026)`.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: clean.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>` and `check_figures.py --topic college-support`.
- [ ] `npm run check:dates`, `npm run check:moneytext`, `node scripts/check_work_integrity.mjs`
      (only its foreign-script check matters after a re-extract).
- [ ] `npm run build`: green.
- [ ] Browser: the Hickory Grove page in `es` and `fa` (`?lang=`), cards open, figures intact,
      `2023 + 2025–2026` reading the right way in RTL.

## Risks

| Risk | Mitigation |
|---|---|
| A respelled name is added as a second row, double-counting a bucket | The step 4 script asserts one row per printed name and no duplicates |
| The three-part window silently misparses in some other reader of `collegesTitle` | Grep `collegesTitle` across `scripts/` and `src/` in step 2; widen any other single-separator regex the same way |
| The probe numbers get typed instead of derived | Only the step 4 tally feeds the four surfaces; `check:buckets` gates them |
| The HG Tuskegee addition changes another school's count | No other list names Tuskegee (grep confirmed at planning); `check:buckets` across all schools catches it if wrong |

## Open questions

- **Is bare `Xavier University` the Ohio school?** Owner: user. **Default:** yes, by official
  name, as a separate untagged row. If the user knows it is Xavier of Louisiana, drop the new
  row (the existing HBCU row already covers it), and the count becomes 157.

## Implementation notes

### Phase 1 (English), 2026-11-04

- **Merge:** asserted by script (`.tmp-hg/merge.mts`, not committed): 47 exact + 3 respellings
  + 26 new = 158 rows, no duplicates. Tally Ivy 0 · Ivy+ 0 · NU75 21 → 27 · LAC75 9 · P4 25 →
  28 · HBCU 20 → 23, exactly the planning probe. No bucket fell.
- **NCISAA verification (step 9b):** the 2025 4x200, 4x800 and 4x400 relays and the 2021
  400 m are confirmed in NCISAA's own meet PDFs and are on the page. **The 2024 4x400 and
  2023 4x100 are left off:** the 2022–23 and 2023–24 archive pages link no results (only a
  meet program and an apparel store, nwd.ink, now 404), and no Wayback capture holds them.
  Recorded in the sports source file.
- **Sports `School Profile` subtopic slugified into a new card**, as the plan warned. Added a
  `RULES` entry in `src/lib/metrics.ts` folding `/school profile/` onto `redesign-research`.
  No other sports subtopic contains the phrase.
- **Tuskegee rank:** left unranked as a recorded null (in `HBCU - US News National Ranks
  2026.md`). The 2027 harvest is partial past #299, so its absence there proves nothing.
- **Homepages:** all four confirmed by name and city in real Chrome (Playwright; Claude in
  Chrome was not connected). Wheeling is stored as `https://wheeling.edu`, where `www`
  redirects.
- **AP titles, deviation:** the shipped `depth[0]` said "18 distinct titles". The real count
  is 17 across all three editions (2025's 14 and 2026's 13 are both subsets of 2023's 17),
  so it was already wrong. The new text drops the number in favour of "the 2023 profile named
  17, which cover every title any edition has printed".
- **Admissions, deviation:** the plan put the bar only in `checklistCallout`. That text
  renders only on the printable checklist route (`/school/…/admissions-checklist/?band=hs`),
  not on the school page, so the 9–12 band's "Sit the entrance testing" step detail
  (the sentence that understated the bar) got the same clause. The callout's next sentence
  became "Neither the shadow day nor the test applies…", because "Neither" was ambiguous
  after the inserted clause.
- **Admissions live-site check:** the two admissions URLs now serve a rewritten Admissions Home
  page. It states no bar, so there was no conflict. **It does print a $300 / $550 application
  fee where the app ships $250 / $500.** That is out of scope here; it is recorded in the
  admissions source file and left for a separate refresh.
- **Small extra edits, in place:** verdict subhead "two-year" → "three-class" acceptance
  record; counseling `mechanicsNote` "either profile" → "any of the profiles"; the counseling
  and wholeClass sources keep `PROFILE_25` lines for the figures still resting on it (the
  ≈34:1 counts, the mid-year SAT median, the earlier AP Scholar counts).
- **Final-sweep keeps:** `PROFILE_25` (the constant and its three citations), "2025–26" in the
  AP Scholar `verify` flag and the SAT note, "2019–2023" as the comparison window,
  "n=20" / "1090" in the SAT note, "22%" for the Class of 2025, and "means/medians" in the
  header and the gap flag (the Class of 2024 SAT is still a median).
- **Schema check (step 10):** `DATA-SCHEMA.md` had no rule for a window with a missing year.
  The generator gained a paragraph on the `2023 + 2025–2026` form and the regex fix.
- **Verification:** `tsc -b` clean; ranks, collegeurls, buckets, memberships, quals and cup
  clean. The regex negative test printed STALE WINDOW LABEL for HG only, and
  `metricValues.ts` was restored byte-identical. `npm run build` stops at `check:live`
  (60 stale stamps per locale in college-support / admissions / sports / metric-values,
  which is the expected Phase 2 work). Every check after it in the chain passes when run by
  hand. `check:metrics` exits 1 on `main` too: the Charlotte Christian podcast subtopic and
  the not-ingested branding files predate this plan. Browser (real Chrome, every
  `<details>` open, every source toggle open): 158 rows, both Xaviers, Tuskegee present
  (its HBCU tag is counted in 23 / 107), all tiles, Compare shows `(2023 + 2025–2026)` ×6,
  the record headline still says twelve, and every profile source links to its own edition.
