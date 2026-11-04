---
name: ddprofile
title: Refresh Davidson Day from its 2026–27 School Profile — merge the 2021–2025 and 2022–2026 acceptance lists into one 2021–2026 list (278 rows, rescored buckets), Class of 2026 highlights, Class of 2027 GPA and enrollment, 2026–27 AP catalog; re-point every profile citation
status: english-done
phases: 2
created: 2026-11-03
branch: feat/dd-profile-2627
prs: []
---

# Refresh Davidson Day from its 2026–27 School Profile

## Goal

Davidson Day published a **2026–27 School Profile** (created 2026-09-29). It overwrote the
2025–26 edition at the **same Finalsite asset** (`nlxzlvymosnampuadraw/2526CollegeProfile.pdf`).
Both the old version URL the app cites and the new one now serve a **byte-identical**
2026–27 file. So every app citation labelled "School Profile 2025–26" opens a document
that contradicts the figure beside it: a 2021–2025 list, Class of 2026 GPAs, 541/198
enrollment.

This plan moves Davidson Day's College Support cards and Compare cells to the 2026–27
edition. The headline change is the user's request: the new **2022–2026 list (253
institutions) is MERGED into the existing 2021–2025 list (255)**, giving one **2021–2026
list of 278 institutions**: 255 kept and 23 added. Nothing already on the page is
removed (user decision 2026-11-04; see Decisions). That rescores the selectivity buckets
upward only (HBCU 3 → ~5, NU75 49 → ~53, LAC75 28 → ~31, P4 45 → ~47). It also re-points
every profile citation.

It is done when the Davidson Day page and Compare show the new figures in English, each
one traceable to `Davidson Day - College Support - School Profile 2026-2027.md`, and
`npm run build` is green after Phase 2 in all ten locales.

This is the same job as the shipped Cannon refresh. **Read
[`cannonprofile.md`](cannonprofile.md) first**: its acceptance-list machinery section,
decisions and Phase 2 apply here almost unchanged.

## Context

### The source, already on disk (uncommitted)

[`source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md`](../../source-material/college-support/davidson-day/Davidson%20Day%20-%20College%20Support%20-%20School%20Profile%202026-2027.md)
holds the full transcription written during planning: page-by-page facts, the course grid
with its key, the verbatim footnotes, the **253-row list in printed order**, and a
planning-time diff and bucket probe against the current app list. **It is the authority
for every figure below. Read it first.**

The PDF **has** a text layer (`pdftotext -layout` works). The four-column list was split by
bounding box (`pdftotext -f 4 -l 4 -bbox`). Two names wrap in the PDF and are re-joined in
the source file.

New URL, for every citation:

```
https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf
```

### What changed, edition to edition

| Fact | App today (2025–26 edition) | 2026–27 edition |
|---|---|---|
| Acceptance list | **2021–2025**, 255 rows | Profile prints **2022–2026, 253 rows**, no bold markers. Diff: 15 renames, 25 not reprinted, 23 new (full lists in source file). **Merged: 2021–2026, 278 rows** |
| Buckets (probe, merged) | Ivy 3/8 · Ivy+ 8/17 · NU75 49/75 · LAC75 28/75 · P4 45/68 · HBCU 3/107 | Ivy 3/8 · Ivy+ 8/17 · NU75 ~53 · LAC75 ~31 · P4 ~47 · HBCU ~5 (**the gates decide**) |
| Enrollment | total 541 · Upper School 198 · Class of 2026 = 47 | total **565** · Upper School **184** · Class of 2027 = **50** |
| GPA distribution | Class of 2026: 4.60 / 3.96 / 2.49 | **Class of 2027: 4.67 / 3.93 / 2.58**, with a printed footnote saying the figures come from "the 9/1/26 roster export (47 of 50 students with a GPA on file); confirm against final records … before printing" |
| Testing statement | "…testing profiles for the Class of 2026" | "…for the **Class of 2027**" |
| Class highlights | (none on the profile; the counseling page's Class of 2025: 53 grads, 258 acceptances, 35 colleges, 100% four-year, 43% in-state, $7.4M merit, 11 NCAA, 28 NHS) | **Class of 2026: 47 members, more than $7.9 million in merit awards, 8 NCAA student-athletes, 20 NHS members.** The counseling page **still** shows only the Class of 2025 block |
| AP courses (derived) | 21 offered in 2025–26 | **22** offered in 2026–27, same derivation rule. Physics II and Micro now offered; Macro not offered; **AP Business with Personal Finance** new; **AP Studio Art no longer printed**; CS Principles and CS A now marked `***` = **via NC Virtual Public School** |
| Intro to AI | listed, not offered 25-26 | still listed, not offered **26-27** |
| Graduation requirements | 22.5 credits, English 4.5, World Language 3 | **21 credits**, English 4, World Language **2**. The profile adds a note that the Class of 2027's transcripts may show work done under the old rules |
| Fast facts | 7:1 student-faculty, class size 13 | **6:1**, **12** |
| Counseling staff | Tia Hill (Director), Caitlin Barndt (Assoc. Director), Vanessa Noe (Registrar) | unchanged, same emails |
| Memberships, Honor Code, grading scale, weighting, no-rank, AFAR start years | — | unchanged |

### Files that cite or carry the profile

- [`src/data/collegeSupportPrograms/davidson-day.ts`](../../src/data/collegeSupportPrograms/davidson-day.ts),
  the six cards.
  - The header comment (lines 1–25) cites "total 541, Upper School 198, Class of 2026 = 47"
    and the Class of 2026 testing statement.
  - The comment above `colleges` (lines 29–34) and the `colleges` array (lines 35–291).
  - `const PROFILE` (line 293). It is cited in the `transcript`, `counseling`, `outcomes`,
    `edge`, `wholeClass` and `verdict` cards.
  - The `ncAdmissions` card (government data) is **not** touched.
- [`src/data/metricValues.ts`](../../src/data/metricValues.ts), the Davidson Day cells:
  - `ACCEPTANCE_WINDOWS['davidson-day']` `'(2021–2025)'` (line 144).
  - Bucket cells and qual sentences: Ivy 357/377, Ivy+ 407/427, NU75 457/477,
    LAC75 507/527, P4 557/580, HBCU 828/848.
  - `counselor-caseload` `'~23:1'` (line 876) and its qual (896).
  - Line numbers are as of `main` at `04f06930`. Grep `'davidson-day'` to re-find them.
- [`scripts/gen_data_schema.mjs`](../../scripts/gen_data_schema.mjs) line 671 prints
  "Davidson Day 2021–2025" as an example window. Change it to `2021–2026`, add the
  merge-by-default rule there (step 8), then `npm run schema`.
- Generated by ingest. Never hand-edit these:
  - `src/content/college-support/davidson-day.json`
  - `.claude/docs/college-support/davidson-day.md`
  - `src/data/schools.json`
- `src/lib/metrics.ts` line 220 already folds any `… - College Support - School Profile…`
  subtopic onto the `outcomes` card key. **No metrics edit is expected.** Confirm it with
  `npm run check:metrics`.

### The acceptance-list machinery

Read `cannonprofile.md` § "The acceptance-list machinery" and `DATA-SCHEMA.md` §3, around
lines 603–700. In short:

- Entries are `{ name, cats }`.
- Ranks come from `collegeRankings.ts` (`rankLabelFor`) and URLs from `collegeUrls.ts`
  (`urlFor`). Never inline either.
- `nu75`/`lac75` come from the rank master; `p4`/`hbcu` come from `collegeMemberships.ts`;
  `ivy` is the 8; `ivyplus` is editorial.
  - The repo's 17 Ivy Plus institutions are the 8 Ivies plus Duke, Georgetown, WashU,
    Chicago, Stanford, Northwestern, MIT, Johns Hopkins and Caltech.
- Counts are institutions, and they live on four surfaces that must agree: the `buckets`
  row, any stat tile, the `metricValues.ts` cell, and the qual sentence.
- Gates: `check:ranks`, `check:collegeurls`, `check:buckets`, `check:memberships`.

### Why two phases

The plan rewrites research prose in the `college-support` and `metric-values` overlay
topics. So it ships English first, then the nine `PROSE_TRANSLATED` locales: es, bn, ht,
te, fr, fa, it, hi, ar. **No `src/locales/*.json` chrome changes.** College names, figures
and `cats` are not translated.

## Decisions

- **MERGE the new list into the existing one; never replace it.** User decision 2026-11-04,
  and a **standing rule for every school** whenever a later year of acceptance data lands.
  It supersedes this plan's earlier "replace wholesale" draft and the Cannon precedent.
  - The merged list is the **union** of the app's 2021–2025 list (255) and the printed
    2022–2026 list (253). That is 255 kept + 23 new = **278 institutions**.
  - The 25 colleges not reprinted (Georgetown, WashU, Swarthmore, West Point, …) **stay**.
    They are genuine published acceptances; most likely they belong to the Class of 2021.
  - It follows DATA-SCHEMA's existing two-list rule: "each institution appears ONCE, and
    where the lists spell one institution differently the row carries the institution's
    official name". For the 15 renames:
    - **Keep the app's current (official) spelling for 14 of them**, e.g. `Georgia Institute
      of Technology`, `Virginia Polytechnic Institute and State University`, `The University
      of Tennessee, Knoxville`, `University of Wisconsin-Madison`, `Oxford College of Emory
      University`. These already resolve in the masters, so most of the alias work goes away.
    - **The exception is `Virginia Wesleyan University`, which becomes `Batten University`.**
      That is the institution's official name since 2026-07-01.
  - Names with no counterpart (the 23 new) keep their printed spelling, with a master alias
    where needed.
  - `collegesTitle: 'Every acceptance, 2021–2026'`.
  - `ACCEPTANCE_WINDOWS['davidson-day'] = '(2021–2026)'`. `check:buckets` enforces that the two match.
  - Six classes, 2021–2026, are combined, and none can be split off: both source lists are
    undifferentiated blocks. This is the widest window on the site. The `acceptance-years`
    2023 floor is a target, not a requirement, and DATA-SCHEMA already lets Davidson Day
    keep its pre-2023 block.
  - **The bucket counts only rise or stay the same.** No institution leaves the list, so no
    bucket can lose a member. A count that drops in step 2 is a resolution bug: a renamed
    row lost its master match.
- **No `enrolling` (bold) markers. The user considered this and dropped it on 2026-11-03.**
  The school publishes no named matriculation list for any recent class:
  - The profile bolds nothing.
  - The counseling page gives only counts ("35 Different Colleges Selected").
  - The Class of 2025 news post that listed destinations
    (`https://www.davidsonday.org/news-detail?pk=1574088`) returns 404, and the Wayback
    Machine CDX has no capture of it.

  Do not search again for this list.
- **New rows are transcribed exactly as printed** (`University of Hawaii (Manoa)`, `SUNY Buffalo`, `Anderson University (Indiana)`).
  - Where a printed spelling misses a master key, add a variant or alias key to the master. Never re-spell the name.
  - Existing rows keep their current names, including the editorial suffixes ("(NOT Columbia University)", "(UK)", "(art & design)"). The merge keeps the old rows as they are.
- **Ambiguous printed names resolve as follows.**
  - The list also prints `University of Tennessee (Chattanooga)` and `University of Alabama (Birmingham)` as separate rows. So bare `University of Tennessee` is **Knoxville** and bare `University of Alabama` is **Tuscaloosa**.
  - `University of Wisconsin` → Madison. `University of Minnesota` → Twin Cities. `Miami University` → Ohio, because `University of Miami` is a separate row. `Xavier University` → Ohio, the same as today.
  - Each of these gets a master alias if needed. If any one cannot be pinned, it gets `cats: []` and no URL; never guess.
- **`Batten University` is Virginia Wesleyan, renamed 2026-07-01.** It was untagged before and stays untagged. Its URL is the university's own current homepage, confirmed in a browser: memory `http-200-proves-no-homepage`.
- **The Class of 2026 replaces the Class of 2025 wherever the profile supplies the figure. The Class of 2025 stays only where the profile is silent, and is labelled with its year.**
  - The profile gives the Class of 2026 four facts: 47 members, more than $7.9M merit offered, 8 NCAA, 20 NHS.
  - It gives no acceptance count, colleges-selected count, matriculation % or in-state %. The live counseling page still shows only the Class of 2025 for those.
  - So the outcomes `headline` leads with the Class of 2026 and the 100% / 258 tiles stay as labelled Class of 2025 figures cited to `COUNSELING`. Wording is in step 3.
- **The provisional-GPA footnote becomes a `verify` flag; it is not quietly dropped.**
  - The school printed that its Class of 2027 GPA figures come from a September roster export covering 47 of 50 students, "confirm … before printing".
  - A parent reading 4.67 / 3.93 / 2.58 deserves to know the school itself called them provisional.
  - State it neutrally as what the profile says. No speculation about why it was printed.
- **AP count: `22`**, derived by the rule already documented in the 2025–26 research file. Exclude the `**` not-offered entries, Calculus III and "AP w/ WE Service". The `verify` flag carrying the derivation is updated to 2026–27, and it notes that two of the 22 are taught online through NC Virtual Public School.
- **Counselor ratios are recomputed from the new enrollment.**
  - Upper School ratio: 184 ÷ 2 = **~1:92**.
  - Senior ratio: 50 ÷ 2 = **~1:25**, using the Class of 2027 because those are the seniors in the 2026–27 application season.
  - The Compare `counselor-caseload` cell becomes `'~25:1'` and its qual says "about 25 seniors … in a senior class of 50".
- **No new card, tile, row or metric key.**
  - Graduation requirements, the fast facts (6:1, class size 12), the 16 all-state selections and the sports sidebar have **no existing home on the College Support cards**. They stay in source-material only. Check first whether anything in the app already prints 7:1, 13 or 22.5 for Davidson Day; if it does, update it in place.
  - If the transcript `depth` or `trust` copy already discusses graduation requirements, update it in place.
- **AP Studio Art.** `edge.levers[0].items[3]` ("Recruiting and arts tracks", line 635) claims AP Studio Art.
  - If that claim is cited only to the profile, reword it to the 2026–27 catalog: Portfolio, plus Studio I and Studio II, both new. Drop "AP Studio Art".
  - If a live school page still lists AP Studio Art, keep the claim cited to that page.
- **`PROFILE` keeps its constant name and gets the new URL.** Every source label "School Profile 2025–26" becomes "School Profile 2026–27". There is no older-edition constant to keep, because the 2025–26 file is unreachable.
- **Array edits replace in place or append; they never delete from the middle.** Deleting from the middle makes overlay `at` paths go stale (memory `overlay-at-paths-go-stale-on-row-delete`). The `colleges` array is the exception: names are not extracted prose.

## Approvals needed

**None.** Every edit changes data inside existing cards, lists, stat tiles, flags and Compare
cells. No card, section, metric key or component changes. That counts as data enrichment
under the UX-design standard.

## Source material

- **Written during planning (uncommitted):**
  `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md`.
  Its sources are the profile PDF and the live College Counseling page, both fetched
  2026-11-03.
- **To append during `/implement`:** a short "Superseded 2026-11-03" note at the top of
  `Davidson Day - College Support - Acceptances Window 2023-2026.md`. Point it to the new file,
  and record that the window is now the merged 2021–2026 (278 institutions) and still
  cannot be split by class.
- `/implement` runs **`ingest-source-material`** first, in step 1. Expect a new
  `college-support` research section "School Profile 2026-2027" that folds onto `outcomes`.

## Out of scope

- The `ncAdmissions` card. It holds government data, and the Fall 2026 term is a separate
  pull through `nc-admissions-data`.
- Course Offerings (`courseOfferings.ts`, Compare `'~75'` / `'26 AP'`). Its source is the
  school's catalog, not the profile.
- The Sports area: the state champions, 16 all-state selections, 5 runners-up and 3
  records. They are recorded in source-material for a later sports pass.
- Global Exposure / Global Studies Diploma copy outside College Support.
- Re-scoring any other school, or the US News edition.
- Deploying. This plan never runs `npm run deploy`.

## Steps

### Phase 1 — English

1. **Branch and ingest.**
   - From an up-to-date `main`, run `git checkout -b feat/dd-profile-2627`.
   - Append the superseded note (Source material) to the Acceptances Window file.
   - Run the `ingest-source-material` skill for `college-support/davidson-day`.
   - Diff the result. Keep only the Davidson Day college-support changes to
     `.claude/docs/`, `src/data/schools.json` and `src/content/college-support/davidson-day.json`.
     A full ingest can sweep other topics or reorder the manifest; see memory
     `two-topic-ingest-reorders-manifest`.
   - Run `npm run check:metrics`. The new subtopic must map to `outcomes`, with no ⚠️.

2. **Merge into `colleges`** in `davidson-day.ts`.
   - **Keep all 255 existing rows** and their `cats`. Change one in place:
     `Virginia Wesleyan University` → `Batten University`.
   - Add the **23 new institutions** from the source file's "23 new" list. Do not re-add the
     14 renames under their printed spelling: that would list one institution twice.
   - Keep the array alphabetical, with the new rows inserted in order. College names are not
     extracted prose, so inserting rows does not stale any overlay `at` path.
   - Expect **278 rows**. Confirm that every one of the 253 printed names matches exactly one
     row, either directly or as one of the 15 renames, and that no institution appears twice.
   - Tag `cats` on the new rows from the masters, not by eye.
   - For each name with no rank or URL, add **one row** to the master and to its companion
     `.md` under `source-material/college-support/_shared/`, or leave it absent as a
     confirmed null.
     - Expected new spellings include `Batten University`, `SUNY Buffalo`,
       `Anderson University (Indiana)` and `(South Carolina)`, `University of Hawaii (Manoa)`
       and `Emory University`.
     - US News lookups need headed Chrome; see memory `usnews-fetch-needs-headed-chrome`.
   - `ivyplus` stays as today (8/17, including Georgetown and WashU). The 23 new rows add no
     Ivy Plus member.
   - Run `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`
     until clean. Read each violation as a question first.
   - Write a scratch tally of the six institution counts. Steps 3 and 7 use it.
   - Rewrite the comment above the array to describe the merged list: the union of the
     2025–26 profile's 2021–2025 list and the 2026–27 profile's 2022–2026 list, 278
     institutions, six classes, no matriculation markers. Name the one renamed row (Batten).

3. **`outcomes` card.**
   - `headline`: "The Class of 2026 — 47 graduates — was offered more than $7.9M in merit
     aid; the latest full outcome set, the Class of 2025's, shows 258 acceptances and 100%
     enrolling at four-year institutions."
   - `subhead`: change it to "(2021–2026)" and "278 institutions", and say it combines two
     consecutive profile lists. Keep the cumulative acceptance-list framing, which is not a
     matriculation list.
   - `stats`:
     - Keep `100%` and `258`, labels unchanged. Both are explicitly the Class of 2025.
     - The Ivy tile becomes `'<n> of 8'`, "Ivy League on the 2021–26 list — absent …". Use
       the step-2 result; the probe expects 3 of 8, unchanged.
     - The merit tile becomes `'$7.9M+'`, "merit aid offered (not accepted) — Class of 2026".
   - `buckets`: use the step-2 counts.
     - The Ivy+ note is unchanged; the set is still 8/17.
     - The LAC note keeps both service academies (USAFA and West Point). Both stay on the
       merged list.
     - The HBCU note gains Howard and NC A&T.
   - `collegesTitle`: `'Every acceptance, 2021–2026'`.
   - `collegesTotal`: `'278 institutions across six graduating classes'`, or the actual row count.
   - `scholarships`:
     - `'$7.9M+ merit offered · Class of 2026'`
     - `'8 NCAA student-athletes · Class of 2026'`
     - `'20 National Honor Society members · Class of 2026'`
     - Keep the USAFA signing line.
   - `scholarshipsNote`: $7.4M becomes $7.9M. Keep the rest.
   - `sources`: the `PROFILE` label becomes "School Profile 2026–27 (2022–26 acceptance
     list, Class of 2026 highlights)". The `COUNSELING` label stays "Class of 2025 outcomes".
   - **The 2021–2025 half of the merged list needs its own citation.** The school overwrote
     the 2025–26 PDF at the same URL, so that URL no longer shows the older list.
     - Query the Wayback CDX for the old asset URL
       (`resources.finalsite.net/images/v1764962120/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf`
       and the bare `…/nlxzlvymosnampuadraw/2526CollegeProfile.pdf`), following memory
       `not-published-needs-a-cdx-listing`.
     - If a pre-2026-09-29 capture exists, add a second `sources` entry, "School Profile
       2025–26 (2021–25 acceptance list, archived)", pointing at that `web.archive.org` URL.
     - If no capture exists, say so in the card's caveat and point to the committed
       `Acceptances Window 2023-2026.md` research record instead. Never cite the live URL
       for the older list.

4. **`transcript` card.**
   - `stats`:
     - `'22'`, "AP courses offered in 2026–27 (derived count — the school publishes no total)".
     - `'4.67 / 3.93 / 2.58'`, "Class of 2027 GPA — highest, median, lowest".
   - Rewrite the `headline` and `subhead` only where they quote 21 or the Class of 2026 figures.
   - `depth`:
     - **Computer science**: AP CS Principles and AP CS A are now taught through NC Virtual
       Public School. Intro to AI is still not offered in 2026–27.
     - **World language**: unchanged except "this year" (AP Spanish Literature is still not
       offered).
     - **Beyond campus**: unchanged.
   - `trust[1]`: the Class of 2027 figures (4.67 / 3.93 / 2.58), transfers excluded.
     Append: "the profile itself labels them provisional — calculated from a September
     roster export with 47 of 50 students on file".
   - `flags`:
     - Update the derivation `verify` flag to 22 / 2026–27, and name what moved: Physics II
       and Micro in, Macro out, Business with Personal Finance new, AP Studio Art no longer
       printed.
     - **Append** a `verify` flag carrying the provisional-GPA footnote, quoted verbatim.
     - In the National Merit gap, "~47" becomes "~50".
   - `sources`: the `PROFILE` label becomes "School Profile 2026–27 (…)".

5. **`counseling` card.**
   - Change 198 → 184 and 47 → 50 everywhere: `subhead`, stats `~1:99` → `~1:92`, the
     ratio `verify` flag arithmetic ("184 ÷ 2 and 50 ÷ 2"), and the "80+ reps … for a
     184-student Upper School" line.
   - Roster: unchanged. Confirm names and emails against the new page 1.
   - `sources`: change the label to "School Profile 2026–27 (staff, enrollment, memberships)".

6. **`edge`, `wholeClass`, `verdict`.**
   - Replace every "198-student" / "198 Upper Schoolers" with **184**, and every "47-person
     class" with **50**.
   - `edge`:
     - Apply the AP Studio Art decision.
     - Lever 2's "School Profile as an instrument" bullet: Class of 2026 GPA range →
       Class of 2027, and "five-year acceptance list" stays.
     - `sources` label → 2026–27.
   - `wholeClass`:
     - The testing quote becomes "…for the Class of 2027".
     - `gpaHint`: "Class of 2027, transfers excluded".
     - `middle[0]`: the names it cites all stay on the merged list; change "2021–25" to
       "2021–26".
     - `sources` label → 2026–27.
   - `verdict`:
     - The 198 / 47 figures change as above.
     - Rewrite the checklist "Which 35 colleges did the Class of 2025 actually enroll at…"
       in place: "The school names the Class of 2025's 35 colleges nowhere, and the Class
       of 2026's outcome block is not yet on the counseling page. Where did each class
       actually enroll, and which colleges take a Davidson Day student most years?"
     - `sources` label → 2026–27.
   - `PROFILE` constant → the new URL (Context).
   - Rewrite the file header comment: total 565, Upper School 184, Class of 2027 = 50;
     "the 2026–27 School Profile"; the Class of 2027 testing statement.
   - Final sweep: `grep -n "2025–26\|2021\|198\|\b47\b\|4\.60\|3\.96\|2\.49\|7\.4M" src/data/collegeSupportPrograms/davidson-day.ts`.
     Every hit is either updated or deliberately kept, such as a Class of 2025 figure
     labelled with its year. Record the keeps in Implementation notes.

7. **Compare** (`src/data/metricValues.ts`).
   - `ACCEPTANCE_WINDOWS['davidson-day']` → `'(2021–2026)'`.
   - Set the six bucket cells and their qual sentences ("n of the …") to the step-2 counts.
   - `counselor-caseload` → `'~25:1'`, comment "50 seniors (Class of 2027) ÷ 2 counselors",
     and reword its qual to match.

8. **Schema doc, including the standing merge rule.** In `scripts/gen_data_schema.mjs`:
   - Line 671: change "Davidson Day 2021–2025" to "Davidson Day 2021–2026".
   - Directly after the "widest window" paragraph (lines 669–677), add a paragraph that
     makes the user's 2026-11-04 rule the default:
     - **"A later edition's acceptance list is MERGED into the one already shipped, never
       swapped for it."** The window widens to span both lists, each institution appears
       once, and a college that the newer list does not reprint stays on the page.
     - Replacing a list needs the user's explicit say-so for that school.
     - The merge can only add institutions, so bucket counts never fall. A fall is a
       name-resolution bug.
   - Run `npm run schema && npm run check:schema`.
   - `/add-school` and every later profile refresh read this doc first. That is why the rule
     belongs here and not only in this plan.

9. **Verify (Phase 1 checks below), commit with explicit paths, push, open the PR**
   (`--body-file`), and set the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
`college-support` and `metric-values` overlay topics only. **No chrome catalogs.** Follow
`cannonprofile.md` Phase 2 and `.claude/docs/prose-translation-architecture.md` for the
mechanism:

1. **Re-extract** both topics for each locale. Diff the units: changed English invalidates
   their stamps. Extract to a throwaway `--lang` first to see the exact unit diff (memory
   `gastondaycup-shipped`).
2. **Translate only the changed and new units** per locale. Figures are copied
   char-for-char and never re-typed: `$7.9M+`, `4.67 / 3.93 / 2.58`, `~25:1`, `2021–2026`.
   Lakh/crore regrouping is the render layer's job for `hi`/`te`. RTL isolates apply for
   `fa`/`ar` (render layer; see memory `rtl-overlays-store-no-bidi-isolate`). Dates
   translate, their digits do not (`check:dates`).
3. **Rebuild the overlays.** Run the per-locale checks, then set the INDEX row to
   *Implemented* with the PR.

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md` | new (written at planning) |
| `source-material/college-support/davidson-day/Davidson Day - College Support - Acceptances Window 2023-2026.md` | append superseded note |
| `source-material/college-support/_shared/*.md` + `src/data/collegeRankings.ts` / `collegeUrls.ts` | one row per missing name or alias |
| `src/data/collegeSupportPrograms/davidson-day.ts` | list, six cards, `PROFILE`, comments |
| `src/data/metricValues.ts` | window, six buckets + quals, caseload |
| `scripts/gen_data_schema.mjs` + `.claude/docs/DATA-SCHEMA.md` | example window |
| `src/content/…`, `.claude/docs/college-support/davidson-day.md`, `src/data/schools.json` | regenerated by ingest |
| `src/data/overlays/{college-support,metric-values}.<9 locales>.json` + work files | Phase 2 |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships && npm run check:metrics`: clean.
- [ ] `npm run build`: green. It chains `check:schema`, `check:live`, `check:runtime` and
      the rest. `check:live` may report changed English as awaiting translation, which is
      expected in Phase 1.
- [ ] `grep -c "v1764962120" src/data/collegeSupportPrograms/davidson-day.ts` → `0`.
- [ ] Browser check: `npx vite preview`, then `/school/davidson-day`.
  - Open every College Support card.
  - The list heading reads "Every acceptance, 2021–2026" with 278 rows. Spot-check that
    Georgetown, Swarthmore and West Point are still listed, and that Emory, Howard and
    Batten are present.
  - Bucket tallies match the Compare cells.
  - The stat tiles show `22`, `4.67 / 3.93 / 2.58`, `$7.9M+`.
  - The provisional-GPA flag renders.
  - Every source link opens the 2026–27 PDF.
- [ ] Compare page: the Davidson Day bucket cells show `(2021–2026)`, and caseload shows `~25:1`.
- [ ] No bucket count is lower than it is on `main`, because the merge only adds rows.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: every shipped stamp resolves, with no
      untranslated units.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>`, `check_figures.py --topic college-support`.
- [ ] `npm run check:dates`, `npm run check:moneytext`, `npm run check:money`.
- [ ] `npm run build`: green.
- [ ] Browser: the Davidson Day page in `es` and `fa` (`?lang=`), cards open, figures intact
      and in the right direction.

## Risks

| Risk | Mitigation |
|---|---|
| A printed short name (`University of Tennessee`, `University of Wisconsin`) silently resolves to no rank, and the bucket count drops | `check:buckets` gates the counts. Add an alias to the master rather than re-spelling the row |
| Bucket probe numbers get typed instead of derived | The probe is labelled indicative. Only the step-2 tally feeds the four surfaces |
| The ingest sweeps other topics or reorders `schools.json` | Diff and keep only Davidson Day college-support changes (step 1) |
| The school later fixes the provisional GPA figures at the same URL | The `verify` flag quotes the footnote. A future refresh re-reads the file; the SHA-1 in the source file shows which edition was transcribed |

## Open questions

- **Should the outcomes headline lead with the Class of 2026, given that only four Class of 2026 facts exist?** Owner: user, at the Phase 1 review. **Default:** lead with the Class of 2026 as written in step 3, with the Class of 2025 tiles labelled by year.
- **Should the provisional-GPA footnote surface on the page at all?** Owner: user, at the Phase 1 review. **Default:** yes, as a neutral `verify` flag quoting the school.

## Implementation notes

Phase 1 (English) built 2026-11-04 on `feat/dd-profile-2627`. Deviations and findings:

- **Merge as planned.** 255 kept + 23 new = 278 rows. The printed-to-existing match was
  done by script and asserted: 15 planned renames, plus **5 more parenthetical spellings**
  that the planning diff had treated as the same row without listing them (`Indiana
  University (Bloomington)`, `Johnson & Wales University (Charlotte)`, `University of
  Massachusetts (Amherst)`, `University of Tennessee (Chattanooga)`, `University of South
  Carolina (Beaufort)`). Those existing rows keep their names. There were no duplicates.
  The 25 not-reprinted rows match the planning list exactly.
- **Final counts, from the gates, not the probe:** Ivy 3/8 · Ivy+ 8/17 · NU75 53/75 ·
  LAC75 31/75 · P4 47/68 · HBCU 5/107. Each count matches the probe, and none fell.
- **Masters.**
  - `collegeRankings.ts`: one new row, Adelphi University `National Rank #191`, from the
    committed National PDF harvest. Two `RANK_ALIAS` entries: `batten univ` → Virginia
    Wesleyan, and `univ of hawaii manoa`.
  - `collegeUrls.ts`: six homepages (Adelphi, Anderson (Indiana), Batten, Roger Williams,
    SNHU, Hawaii (Manoa)), each confirmed in Chromium by name plus address.
  - Anderson (Indiana), Roger Williams and SNHU are Regional and stay unranked by design.
- **The 2021–2025 half has its own citation.** A Wayback CDX query found a 2026-03-07
  capture of the old asset URL. It was retrieved and confirmed to be the 2025–26 edition
  (list heading "2021 – 2025", SHA-1 `32b9227f…`). It ships as `PROFILE_2526` in the
  outcomes sources. The school's own Issuu copy also exists and is recorded in source-material.
- **AP Studio Art claim kept.** The school's 2026–27 Upper School Course Catalog still lists
  it, so per the Decisions rule the edge claim stays, and it is now cited to `CATALOG`.
  The AP-derivation flag notes that the profile no longer prints it.
- **GPA-exclusion wording updated (not in the plan).** The old profile excluded "any course
  taken online". The new one excludes "online courses not sponsored by the school", which
  matters now that two APs run through NC Virtual Public School. `depth` "Beyond campus"
  and `trust[2]` follow the new wording.
- **The provisional-GPA note is dev-only, by user decision (2026-11-04).** `verify` flags
  render only in dev (`src/lib/toVerify.ts`). The first build also put the note into
  transcript `trust[1]` and the wholeClass `gpaNote`. After review, the user asked for it
  to show in dev but not in production, so both prose mentions were removed and only the
  `verify` flag (quoting the footnote) remains. This replaces step 4's `trust[1]` append
  and resolves the second Open question.
- **A pre-existing false claim, fixed.** The Compare caseload tooltip called Davidson Day
  "the lightest caseload here", but Gaston Day is ~18:1. It now reads "second-lightest …,
  after Gaston Day".
- **Plan step 9 vs `/implement`:** the skill commits Phase 1 and stops without opening the
  PR. Both phases land in one PR, so the PR opens after Phase 2.
- **Deliberate keeps after the final sweep:** ncAdmissions "Fall 2021–2025" (government
  data, out of scope); "Class of 2026 — 47 graduates" (correct); "five-year acceptance
  list" in edge and verdict (describes the profile's own list); and the subhead's
  "2021–2025 and 2022–2026" (names the two source lists).
- **Phase 1 verification:** `tsc -b`, `check:ranks`, `check:collegeurls`,
  `check:buckets`, `check:memberships`, `check:quals`, `check:metrics` (no new findings),
  `check:schema` and the rest of the build chain after `check:live` all pass.
  `npm run build` stops at `check:live` with **40 stale `college-support` stamps per
  locale**: the Phase 2 work, as the plan expected. The browser check (vite preview, all
  `<details>` open) confirmed the heading, 278 rows, Georgetown/Swarthmore/West Point kept,
  Emory/Howard/Batten present with links, the new tiles and buckets, and the source links
  to the new PDF, the Wayback 2025–26 copy and the catalog. Compare shows `(2021–2026)`,
  `~25:1`, `53 / 75` and `5 / 107`.
