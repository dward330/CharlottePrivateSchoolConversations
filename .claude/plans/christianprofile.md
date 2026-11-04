---
name: christianprofile
title: Refresh Charlotte Christian from its 2026–27 Academic & Student Profile — new 2024–26 acceptance list (bold = Class of 2026 enrolled, rescored buckets), Class of 2026 test/GPA bands and quintiles, 2026 AP dashboard, matriculation split, conservatory/biliteracy shares, dual enrollment and disciplinary policy now published; re-label every profile citation
status: english-done
phases: 2
created: 2026-11-03
branch: feat/christian-profile-2627
prs: []
---

# Refresh Charlotte Christian from its 2026–27 Academic & Student Profile

## Goal

Charlotte Christian published its **2026–27 Academic & Student Profile** (PDF created
2026-10-27). It **overwrote the 2024–25 edition at the same Finalsite asset**, so the URL
still reads `2024_USprofile_admiss.pdf`:

```
https://resources.finalsite.net/images/v1725038322/charlotte/b12msqpqbmeqjqgszan1/2024_USprofile_admiss.pdf
```

Every app citation labelled "2024-25 Academic & Student Profile" now opens a document that
contradicts the figures beside it. This is the same situation as Cannon (plan `cannonprofile`,
PR #363), and this plan follows that one closely. Read it for precedent.

The plan updates Charlotte Christian's College Support, Student Clubs and Compare figures to the
2026–27 edition. The largest change is that the acceptance list moves from **2023–2025 (186
institutions, brochure)** to **2024–2026 (211 institutions, the profile itself)**. Its asterisks
mark Class of 2026 enrollment, so the bold markers move to the Class of 2026. All six selectivity
buckets are rescored.

It is done when:
- the Charlotte Christian page and Compare show the new figures in English;
- every figure traces to `Charlotte Christian - College Support - School Profile 2026-2027.md`;
- `npm run build` is green after Phase 2 in all ten locales.

## Context

### The source, already on disk (uncommitted)

[`source-material/college-support/charlotte-christian/Charlotte Christian - College Support - School Profile 2026-2027.md`](../../source-material/college-support/charlotte-christian/Charlotte%20Christian%20-%20College%20Support%20-%20School%20Profile%202026-2027.md)
was written during planning. It holds:
- a full transcription of all four pages;
- the 213-row acceptance list in printed order, with asterisks;
- the planning-time bucket probe;
- a **full delta table against the app**.

**It is the authority for every figure below. Read it first.** The PDF has a text layer. To
re-check a figure, download it into a scratchpad directory, then run `pdftotext -layout` and
`pdftoppm -r 110 -png`. The donut-chart labels must be read from the PNG, because `pdftotext`
scrambles them. **Public is 74% and Private is 26%.**

### The delta, in brief (full table in the source file)

| Fact | App today | 2026–27 profile |
|---|---|---|
| Acceptance list | 2023–2025, 186, bold = Class of 2025 enrolled | **2024–2026, 211 distinct** (213 printed), \* = Class of 2026 enrolled (50) |
| Buckets (probe) | 2/8 · 4/17 · 40/75 · 10/75 · 41/68 · 10/107 | **3/8 · 5/17 · 39/75 · 19/75 · 50 (or 51)/68 · 10/107**. The gates decide |
| Class size / US enrollment | 94 / 435 | **110 / 442** |
| AP | 2024: 298 exams, 151 students, 89%, 59 Scholars | **2026: 435 exams, 208 students, 94%, 90 AP Scholars** |
| SAT / ACT middle 50 | 1110–1340 (79) / 23–29 (33), Class of 2025 | **1120–1320 (83) / 21–29 (90)**, Class of 2026 |
| GPA middle 50 | — | **3.604–4.199** |
| Quintiles | 4.277–4.578 … 1.941–3.058 (Class of 2025) | **4.240–4.533 / 4.081–4.220 / 3.804–4.053 / 3.542–3.803 / 2.269–3.524** |
| National Merit, 15-yr | 14 F · 48 C | **12 F · 46 C** |
| Scholarships | $6.4M Class of 2025 (Celebrating Seniors) | **"Over $3 million … based on outstanding academic achievement"**, Class of 2026 |
| Matriculation | 64% out of state · 35% private | Classes 2024–26: **64% out of state · 26% private · 82% Southeast** |
| Conservatory / Seal of Biliteracy | 14% / 4%, Class of 2024 | **20% / 7%, Class of 2026** |
| Dual enrollment | "does not maintain a formal dual-enrolment programme" | **Personal Finance and Biblical Stewardship with Cedarville**. Page 1 says DE earns **+0.5**; page 3 says this course earns **+.75** |
| Disciplinary policy | "does not publish a disciplinary-disclosure policy" | **Published**: complies with NACAC SPGP, the school reports no infractions, students are advised to self-disclose out-of-school suspensions from grades 9–12 |
| Class of 2019 weighting change | stated, cited to the profile | **no longer printed** |
| Physics C, AP Spanish Literature | cited to the profile | **absent from the profile**. Physics C is also absent from the 2026–27 Curriculum Guide already in `courseOfferings.ts`; Spanish Lit is still in the guide |
| Computer science | "Thin … no dedicated Upper School CS courses" | **AP Computer Science** on the profile; the guide (already in the app) has CS I, CS II Honors and AP CS |
| Scholastic Art & Writing | — | **54 awards over the last 5 years** |

### Files that cite or carry the profile

- [`src/data/collegeSupportPrograms/charlotte-christian.ts`](../../src/data/collegeSupportPrograms/charlotte-christian.ts),
  700 lines:
  - Header comment: lines 1–23.
  - `colleges` array, with its comment: lines 26–218.
  - `PROFILE_2425`: line 220. **It already points at the college-counseling page, not the
    PDF.** Keep that link as the page's citation and add a new `PROFILE_2627` constant for the
    PDF URL.
  - `ncAdmissions`: lines 225–342. **Do not touch** it; it is government data.
  - `transcript` starts at line 343.
  - `counseling` starts at line 413.
  - `outcomes`: lines 500–535.
  - `edge`: lines 537–574.
  - `wholeClass`: lines 576–649.
  - `verdict`: lines 651–699.
- [`src/data/clubsPrograms/charlotte-christian.ts`](../../src/data/clubsPrograms/charlotte-christian.ts):
  - `SCHOOL_PROFILE` (lines 43–44) is the same URL.
  - The honors card's `adjacent` holds Conservatory "14% of the Class of 2024" (line ~200)
    and Seal of Biliteracy "4% of the Class of 2024" (line ~204).
  - The source label at line 219 reads "2024-25 Academic & Student Profile (arts chapters,
    conservatory)".
- [`src/data/metricValues.ts`](../../src/data/metricValues.ts), Charlotte Christian cells:
  - `ACCEPTANCE_WINDOWS` `'(2023–2025)'` (line 140). `check:buckets` requires it to equal
    `collegesTitle`.
  - `ap-performance`: `'89%'` (299), the sub `'(2024)'` (314) and the qual (330).
  - Buckets: Ivy `2 / 8` (351/373), Ivy+ `4 / 17` (401/423), NU75 `40 / 75` (451/473),
    LAC75 `10 / 75` (501/523), P4 `41 / 68` (551/573), HBCU `10 / 107` (822/844).
  - `counselor-caseload` `'~47:1'` (870) and its qual (892).
- **Do not touch:**
  - `src/data/courseOfferings.ts`: it is sourced from the catalog, guideYear 2026-27. The
    Compare `'21 AP'` (line 220) stays.
  - `src/data/artsPrograms/charlotte-christian.ts`.
  - The `ncAdmissions` card.

### The acceptance-list machinery

Read §3 of [`DATA-SCHEMA.md`](../docs/DATA-SCHEMA.md) and the "acceptance-list machinery"
section of [`cannonprofile.md`](cannonprofile.md) before editing. In brief:
- Entries are `{ name, cats, enrolling? }`.
- Ranks resolve via `rankLabelFor()` and URLs via `urlFor()`. **Never inline either.**
- `nu75` and `lac75` come from `ranked75Bucket()`; `p4` and `hbcu` come from
  `collegeMemberships.ts`. `ivy` is the eight; `ivyplus` is editorial, so reuse the tags other
  lists already carry.
- Counts are deduplicated institutions and must agree on **four surfaces**: `buckets`, any
  stat tile, the `metricValues.ts` cell, and the spelled-out qual.
- The gates are `check:ranks`, `check:collegeurls`, `check:buckets` and `check:memberships`.
- A missing rank or URL is a valid confirmed-null. **Never guess one.**
- New master rows go into the TS master **and** its companion `.md` under
  `source-material/college-support/_shared/`.
- Hard rule (memory `acceptance-list-rank-labels-hard-rule`): every college tagged
  `ivy`/`ivyplus`/`nu75`/`lac75` must carry a rank label.

Resolve these ambiguous names against the masters and the old Charlotte Christian list.
Never guess:
- `University of California`: no campus is printed. The old list had UC Irvine, UC San Diego
  and UC Santa Cruz.
- `University of Texas`: resolves to a rank, but not to Power Four.
- `University of Colorado`: the resolver picks Boulder.
- `University of Nebraska` and `University of Nevada`.
- `Wheaton College`: the old list's enrolling Wheaton was Wheaton, IL.

If a name cannot be resolved, it gets `cats: []` and renders as plain text.

### Why two phases

The plan rewrites research prose in the `college-support`, `student-clubs` and `metric-values`
overlay topics, so English ships first. Phase 2 then covers the nine `PROSE_TRANSLATED` locales:
es, bn, ht, te, fr, fa, it, hi, ar. **There are no `src/locales/*.json` chrome changes.**
College names, figures and `cats` are never translated.

## Decisions

- **Bold = Class of 2026 matriculation.** User decision, 2026-11-03: "use the bold to show
  matriculation for latest class we have". The 50 asterisked rows get `enrolling: true`; no
  other row does. This keeps the current list's convention and moves it from the Class of 2025
  to the Class of 2026. `collegesTotal` becomes
  `'211 institutions · bold = a Class of 2026 graduate enrolled'`, or the actual distinct count.
  The `colleges` comment says the asterisk key is the profile's own.
- **Replace the list wholesale** with the 2024–26 list, following the newest-window-only rule
  from `acceptance-years`. Set `collegesTitle: 'Every acceptance, 2024–2026'` and
  `ACCEPTANCE_WINDOWS['charlotte-christian'] = '(2024–2026)'`.
- **Transcribe names exactly as printed**, e.g. `Penn State University`,
  `The University of Edinburgh`, `William & Mary`. Where a printed spelling differs from a
  master key, add an alias or variant key; never "correct" the name. Join the
  `University of North Carolina / at X` line-wraps (the source file has them joined).
- **Printed duplicates are collapsed to one row.**
  - `Emory University` appears twice; keep one.
  - `University of South Carolina` appears twice; keep one, with `enrolling: true`, since one
    copy is asterisked.
  - Record both in the `colleges` comment. Counts are by institution anyway.
- **Scholarships.**
  - The stat becomes `'$3M+'`: "in academic-merit scholarships offered, Class of 2026".
  - In the `scholarships` list, `'$6.4M scholarships · Class of 2025'` and
    `'$13,875,968 across the Classes of 2023–25'` stay as **dated, still-true** facts from
    Celebrating Seniors and the brochure.
  - Prepend `'Over $3M in academic scholarships offered · Class of 2026'`.
  - **Never compare $3M with $6.4M as a decline.** The 2026 figure is scoped to academic
    achievement, and the 2025 figure is not.
- **The AP dashboard becomes one year deep.** Stats: `'435'` "AP exams taken in 2026 (208
  students)", `'94%'` "of exams scored 3+ in 2026", `'90'` "AP Scholars in 2026".
  - Drop the "up from 78% in 2021" and "203 across 2023–25" claims from the stats. The 2021
    figure can stay **once**, in the verdict, as a dated trend ("89% in 2024, 78% in 2021"),
    cited to the Redesign Research file, which records both earlier editions.
  - **"The fullest AP dashboard in this set … two years deep" is no longer true** of the
    current profile, since it has no pass counts and no Scholar breakdown. Reword every
    occurrence (transcript subhead, edge lever 2, verdict point 2) so the claim is about
    mandatory exams plus a published exam/student/Scholar count. Do not claim "fullest".
  - Compare `ap-performance` becomes `'94%'` with sub `'(2026)'`. The qual: "94% of AP exams
    scored 3 or higher in 2026 (435 exams, 208 students; the profile gives no pass count)."
    Comment: `// 2026: 94% of 435 exams (2026–27 profile; no pass count printed)`.
- **The counselor caseload is still derived, never published.** Use 110 seniors ÷ 2 college
  counselors = **`~55:1`**, and 442 ÷ 2 = **~221:1** across four grades. Update the counseling
  stat, its `verify` flag arithmetic, the headline ("roughly 55 seniors apiece"), the Compare
  cell and the qual. The lower-is-better ordering is automatic.
- **Test bands.** SAT row `['—', '1120', '—', '1320', '—', '—']`; ACT row
  `['—', '21', '—', '29', '—', '—']`.
  - Hints: "Class of 2026 · 83 testers of 110 graduates (~75%)" and "· 90 testers of 110
    graduates (~82%)".
  - Rewrite the ACT note: 83 SAT plus 90 ACT testers against 110 graduates means heavy
    overlap, and ACT testing jumped from 33 to 90 in one year. **State that as a fact only;
    the profile gives no reason.**
  - The `mechanicsNote` "84% sat the SAT and 35% the ACT" becomes "about 75% … SAT and 82% …
    ACT".
- **GPA middle 50 (3.604–4.199) is new.** Put it into the `wholeClass.subhead`. Do not add a
  stat tile or a Compare row (that would need UX approval). The profile does not say whether
  it is weighted, so say "on the profile's GPA scale" and add it to the `verify` flag rather
  than assert either.
- **Quintiles** are copied char-for-char, using the en-dash range form the file already uses.
  Change the labels and details only where they become false.
  - `gpaHint`: "— the no-rank mechanism · Class of 2026 weighted GPA through the sixth semester".
    The table sits in the Class of 2026 column; the profile names no year, so add that to the
    flag.
  - The headline and `gpaNote` currently argue "three-year grade inflation … the bottom floor
    fell". Rewrite both from the 2025→2026 comparison, using the old figures from this file's
    current values:
    - First-quintile floor: 4.277 → 4.240.
    - Third: 3.686 → 3.804.
    - Fourth: 3.124 → 3.542.
    - Fifth: 1.941 → 2.269.

    So the table **compressed**: the top floor eased and the bottom rose sharply. Do not call it
    inflation. Keep the Class of 2022 comparison only if it is still stated accurately.
  - Note that the printed quintiles leave gaps between bands (e.g. 4.220 → 4.240). The profile's
    asterisk on "GPA DISTRIBUTION" has **no footnote**. Put that in a `verify` flag.
  - The `subhead` median line becomes "roughly 3.80–4.05 weighted"; the top-quintile floor is
    4.240.
  - `middle[0]`: "at 3.12 or below" becomes "at 3.54 or below".
- **Dual enrollment.** Replace `depth` "Beyond campus" "does **not maintain a formal
  dual-enrolment programme**" with: one dual-enrollment course, Personal Finance and Biblical
  Stewardship with Cedarville University.
  - Update `trust[0]`: Honors and dual enrollment are +0.5 and AP is +1.0.
  - Add a `verify` flag: page 1 gives DE +0.5, but page 3 says this course earns +.75.
  - Add a checklist question: "Your profile gives dual enrollment +0.5 on page 1 and +.75 on
    page 3. Which applies?"
  - **Drop** the "halved its weighting with the Class of 2019" sentence from `trust[0]`. Move
    it, dated, to a `verify` flag ("stated on the 2021–22 and 2024–25 profiles; the 2026–27
    edition no longer prints it"), because GPA comparability across eras is still useful to a
    parent.
- **Disciplinary policy is now published.** Replace the `edge.levers[1].note` gap with the
  policy (paraphrased, with the quote) and add a one-line `reach` item if it fits. The checklist
  needs no question about it.
- **Physics, CS and languages** (`transcript.depth`):
  - **Physics**: rewrite. The 2026–27 profile and Curriculum Guide list AP Physics 1 as the top
    physics course, and **AP Physics C no longer appears**. Calculus III stays (it is on both).
  - **Computer science**: rewrite as "AP Computer Science on the profile; the Curriculum Guide
    adds Computer Science I and Computer Science II Honors; no post-AP course." Cite the guide
    URL already used in `courseOfferings.ts` (line ~4313,
    `https://www.charlottechristian.com/fs/resource-manager/view/e07cd151-2d20-44e0-a7db-f0b6d50ba314`).
  - **World language**: AP Spanish Literature is not on the profile but is in the guide. Keep
    it, cited to the guide.
- **National Merit.** Add `{ year: '15-yr (2026–27 profile)', detail: '**12** Finalists · **46** Commended Scholars' }`
  at the **top** of `merit`. Keep the two older rows.
  - `meritNote`: the window has now fallen 16 → 14 → 12 Finalists and 45 → 48 → 46 Commended.
    Rolling windows still explain it, and still no per-class ledger is published.
  - Update checklist `[4]` to "12 … down from 16 six years earlier".
- **New, small facts** go into existing slots only. There is no new card, tile, row or key.
  - Scholastic Art & Writing (54 over 5 years) becomes one `edge` lever-1 item or a
    `scholarships` line.
  - The matriculation split is added as the outcomes stat
    `'64%'` "attend out of state · 26% private · 82% Southeast (Classes of 2024–26)". **The
    "14% Christian college" figure is not on the profile.** Keep it with its existing brochure
    source, or drop it from the stat label if it no longer fits. Keep it in the subhead.
  - Conservatory and Seal shares are updated in **both** the edge items (College Support) and
    the clubs `adjacent` entries.
- **Outcomes headline.** "409 acceptances for 94 graduates" comes from the brochure's 2023–25
  aggregate, and the profile gives no acceptance count.
  - New headline: "211 colleges admitted the Classes of 2024–26, and 99% of graduates go on to
    a four-year college." Use the actual distinct count.
  - Replace the `'409'` stat with `'110'` "graduates in the Class of 2026 · 50 colleges enrolled
    at least one".
  - The `99%` stat stays.
- **The bucket notes** list who is present and who is absent.
  - Ivy, probe 3/8: "— Columbia, Dartmouth, Harvard; Cornell appears only on the older list".
    Write it from the final tally.
  - HBCU keeps its existing note.
- **Citations.**
  - Add `const PROFILE_2627 = '<the PDF URL>'` in the College Support file.
  - Re-point every source that the profile backs: transcript, outcomes, wholeClass, counseling
    staffing, edge memberships and policy, verdict. Label them "2026–27 Academic & Student
    Profile (…)".
  - Keep `COUNSELING` for the page itself. Rename the misnamed `PROFILE_2425` constant, which
    points at the counseling page, to avoid confusion: fold its uses into `COUNSELING`.
  - In clubs, `SCHOOL_PROFILE` keeps its URL. Its label becomes "2026–27 Academic & Student
    Profile (arts chapters, conservatory)". Check that the "arts chapters" claim is still on the
    profile; it is not, so cite the honor-society chapters to the Upper School page, which
    already backs them, and narrow the label to "(conservatory, Seal of Biliteracy)".
- **Checklist edits replace in place.** Never delete from the middle (see the stale-`at`-path
  trap, memory `overlay-at-paths-go-stale-on-row-delete`).
  - `[2]` stays.
  - `[4]` is updated as above.
  - `[7]` ("What are the Class of 2026 figures … None are published yet.") is **false** now.
    Replace it in place with the dual-enrollment +0.5/+.75 question.
  - `[6]` (99%) stays, re-worded to the Class of 2026 (110 graduates) if the roster point
    still holds. Otherwise ask how 99% is computed without the roster claim.
  - **Append** "Where did the Classes of 2024 and 2025 enroll? Only the Class of 2026 is marked
    on the 2024–26 list."
- **Celebrating Seniors 2026 is out of scope.** `/academics/seniorclass` now shows the Class
  of 2026, but the user asked for this PDF. Class of 2025 facts that come from Celebrating
  Seniors (21 signees, named awards, the Semifinalist discrepancy) stay as dated facts. Mention
  the page as a possible follow-up in the PR body.

## Approvals needed

**None.** Every edit changes data inside existing cards, lists, stat tiles, flags and Compare
cells. That is data enrichment under the UX-design standard. Adding the GPA middle 50 as a tile
or a Compare row **would** need approval, which is why the plan puts it in prose instead.

## Source material

- **Written during planning (uncommitted):**
  `source-material/college-support/charlotte-christian/Charlotte Christian - College Support - School Profile 2026-2027.md`.
- **To append during `/implement`:** a one-paragraph "Superseded 2026-11-03" note at the top
  of `Charlotte Christian - College Support - Acceptances Window 2023-2026.md`. It points to the
  new file and corrects that file's finding that "No Class of 2026 acceptance list exists".
- `/implement` runs the **`ingest-source-material`** skill on the branch first.
  - Expect a new `college-support` research section, "School Profile 2026-2027", the same
    pattern as Cannon's.
  - Afterwards run `npm run check:metrics` and `npm run schema`.
  - If the new subtopic appears as an ⚠️ unmatched key, map it in `src/lib/metrics.ts` the way
    Cannon's `School Profile 2026-2027` is mapped. **Do not add a card.**
  - Watch for an ingest that reorders `schools.json` (memory
    `two-topic-ingest-reorders-manifest`), and keep only the Charlotte Christian
    college-support changes.

## Out of scope

- The Celebrating Seniors 2026 page, and Class of 2026 scholarship and signee detail beyond the
  profile.
- Course Offerings and Arts, which are catalog-sourced. The NC admissions card.
- Facts with no existing home: JK–12 enrollment by division, head of school and principal names,
  graduation-requirement changes for the Classes of 2027/2028, the Honors course list.
  They are recorded in source-material only.
- Deploying. **This plan never runs `npm run deploy`.**

## Steps

### Phase 1 — English

1. **Branch and ingest.**
   - `git checkout main && git pull && git checkout -b feat/christian-profile-2627`.
   - Append the superseded note to the Acceptances Window file.
   - Run `ingest-source-material` for `college-support/charlotte-christian`.
   - Diff, and keep only this school's college-support changes. Stage explicit paths only.

2. **Rebuild `colleges`** in `src/data/collegeSupportPrograms/charlotte-christian.ts`.
   - Replace the array with the 211 distinct names from the source file, in printed order.
   - Set `enrolling: true` on exactly the asterisked rows. There should be 50; verify the
     count by grep.
   - Tag `cats` from the masters. Resolve the ambiguous names (Context).
   - Add a master row (TS + `.md`) only for a name a ranked bucket or a URL needs, and only with
     a citable source. Otherwise leave it as a confirmed-null.
   - Run `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`
     until clean. Read every violation as a question first.
   - Scratch-tally the six institution counts, which feed steps 3 and 7.
   - Rewrite the comment above the array and the file header (lines 1–23). The header names
     the 2026–27 profile as the chief source and drops "The Class of 2026 figures are absent".

3. **`outcomes`.**
   - Headline, stats and scholarships per Decisions.
   - `buckets` from step 2, with notes.
   - `collegesTitle` `'Every acceptance, 2024–2026'`; `collegesTotal` per Decisions.
   - `sources`:
     - `PROFILE_2627` "(the 2024–26 acceptance list, Class of 2026 enrollment, matriculation
       split, scholarships)";
     - keep the brochure line, relabelled "(Classes of 2023–25 scholarship total, Christian-college share)";
     - keep US News.

4. **`transcript`.**
   - Headline: "Students in AP classes are required to sit the exam, and 94% of 2026's 435
     exams scored 3 or higher — a rate earned on a mandated rather than self-selected pool."
   - Subhead: no "fullest … two years deep".
   - Stats, `merit` and `meritNote` per Decisions.
   - `depth` rows Physics, Computer science, World language and Beyond campus per Decisions.
   - `trust[0]` per Decisions. `trust[1]`: "both profiles" becomes "every published profile".
   - `trust[2]`: the graduation requirements are unchanged (27 credits, 4 Biblical Studies,
     Winterim, a .5 Junior Seminar). Optionally add the .5 Speech requirement.
   - Flags:
     - keep the National Merit `verify` flag;
     - keep the 4/5-share `gap` flag;
     - add the dual-enrollment `verify` flag and the dropped Class of 2019 weighting note.
   - Sources: `PROFILE_2627` plus the Curriculum Guide.

5. **`counseling`.**
   - Headline, stat and `verify` flag per Decisions.
   - `roster[0].detail`: "Director of College Counseling in the 2021–22, 2024–25 and 2026–27
     profiles — at least six years in the role. Students K–Z." **Check the K–Z / A–J split on
     the live counseling page.** The profile does not give it, so keep it only if the page
     still does.
   - `mechanicsNote` per Decisions.
   - Add a `PROFILE_2627` source "(staffing, enrollment)".

6. **`edge` and `verdict`.**
   - In edge lever 1, update the Conservatory item with 20% of the Class of 2026 and its six
     named areas.
   - Seal of Biliteracy: "fell from 11% of the Class of 2021 to 4% of the Class of 2024" becomes
     "… to 4% of the Class of 2024, then rose to 7% of the Class of 2026".
   - Add Scholastic Art & Writing.
   - In lever 2, reword the "School Profile as an instrument" item without "full AP dashboard
     with AP Scholar breakdowns" or the weighting change; add the GPA middle 50.
   - Lever 2 note: the disciplinary policy.
   - Verdict points 0–2 per Decisions, using 94%/2026 and no "fullest".
   - Checklist per Decisions.
   - Sources: `PROFILE_2627`.

7. **`wholeClass`.**
   - Headline, subhead, `scoreTables`, `gpaHint`, `quintiles`, `gpaNote` and `middle[0]` per
     Decisions.
   - `middle[2]` "No federal service academy appears on either published list" is **now false**:
     the Air Force Academy and West Point are both on the list, both asterisked. Rewrite it to
     name them, and keep Central Piedmont. Universal Technical Institute is gone from the new
     list, so remove it.
   - `middle[0]`: rebuild the honest-range sentence from the new list. Duke, Harvard and
     Columbia at the top; Central Piedmont, Barton, Catawba, Spartanburg Methodist, Belmont
     Abbey, Wingate and Winthrop at the other end. Brevard, Montreat, Limestone and Methodist
     are gone.
   - `middle[1]`: re-verify every Christian-college name against the **asterisked** rows.
     Wheaton, Liberty, Samford, Gordon and Lipscomb are asterisked; Cedarville, Grove City and
     Charleston Southern are listed but **not** asterisked. Write it as Class of 2026 enrollment.
   - Flags:
     - first gap: "the 2024–25 edition is the only one carrying SAT and ACT bands" becomes
       "the 2024–25 and 2026–27 editions carry bands";
     - add a `verify` flag covering the missing quintile footnote, the unnamed table year and
       whether the GPA middle 50 is weighted.
   - Sources: `PROFILE_2627`.

8. **Compare** (`src/data/metricValues.ts`).
   - `ACCEPTANCE_WINDOWS` `'(2024–2026)'`.
   - `ap-performance` value, sub, qual and comment.
   - All six bucket cells and their spelled-out quals, from step 2.
   - `counselor-caseload` `'~55:1'` with qual and comment.

9. **Clubs** (`src/data/clubsPrograms/charlotte-christian.ts`).
   - Conservatory: "20% of the Class of 2026 earned at least one."
   - Seal: "7% of the Class of 2026 earned it."
   - Source label per Decisions.

10. **Docs and schema.** Run `npm run schema`. If any review-time bug surfaces a rule, update
    `scripts/gen_data_schema.mjs` per CLAUDE.md. Otherwise say explicitly that no schema-doc
    change was needed.

11. **Commit Phase 1 and stop.**
    - Run Verification Phase 1.
    - Commit and push. Open the PR as draft, or wait to open it per `/implement`'s convention.
    - Set the INDEX row to `English shipped`.
    - Ask the user to review the rendered English: the College Support page, Compare, and the
      clubs honors card.

### Phase 2 — the nine prose locales (after the user approves the English)

12. **Re-extract and translate** the `college-support`, `student-clubs` and `metric-values`
    overlays for es, bn, ht, te, fr, fa, it, hi, ar.
    - Follow `prose-translation-architecture.md` and the per-locale rollout docs.
    - Copy figures char-for-char and never re-type them. Ranges such as `4.240–4.533` and
      `1120–1320` stay as written. `hi`/`te` lakh/crore grouping happens at render, not in data.
      RTL isolates for `fa`/`ar` are applied at render.
    - The `colleges` names are not extracted; confirm that by diffing a throwaway `--lang`
      extract (memory: extract to a throwaway `--lang` for the exact unit diff).
    - Checklist entries were edited in place, so their `at` paths are stable. The one appended
      checklist item is new in every locale.
    - The deleted/moved flags (`trust[0]` sentence → flag) must be mapped by **meaning**, never
      by index.

13. **Finish.**
    - Run Verification Phase 2, then mark the PR ready and merge it
      (`gh pr merge --squash --delete-branch`).
    - `git checkout main && git pull`.
    - Flip the INDEX row to Implemented with the PR link.
    - Say "merged — ready to deploy whenever you want it", and **do not deploy**.

## Verification

### Phase 1

- `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`
- `npm run check:metrics && npm run check:schema`
- `npx tsc -b`, then `npm run build`. The full build is expected to pass in English; locales
  fall back silently until Phase 2.
- `grep -c "enrolling: true" src/data/collegeSupportPrograms/charlotte-christian.ts` should give
  50, or 49 if a duplicate collapsed onto one entry. Explain any difference.
- `grep -n "2024-25\|2024–25\|89%\|~47:1\|409\|186 institutions\|fullest" src/data/collegeSupportPrograms/charlotte-christian.ts src/data/clubsPrograms/charlotte-christian.ts`.
  Every remaining hit must be a deliberately dated historical fact.
- **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright, every
  `<details>` open):
  - The Charlotte Christian College Support section: 50 bold names; the bucket chips filter
    to the tallied counts; the GPA/SAT/ACT tables render.
  - Compare's College Support rows: the window line reads (2024–2026), and the AP cell shows
    94% (2026).
  - The clubs honors card.

### Phase 2

- `npm run build`, which chains `check:live`, `check:runtime`, `check:chrome`, `check:moneytext`
  and `check:dates`.
- Per locale: `npm run check:sepdrift -- --lang <code>`, the per-topic `check_figures.py`
  sweep, and `npm run check:work`. Also `npm run check:fr` for French.
- Browser spot-check of the College Support section in `es`, `fa` and `hi`. Check the figure
  ranges in particular: for `fa`/`ar`, confirm a range does not reverse (memory
  `rtl-figure-range-reverses`).

## Implementation notes

- **Acceptance list merged, not replaced (user request, 2026-11-04, after Phase 1 review).**
  The plan swapped the brochure's Classes of 2023–25 list for the profile's 2024–26 list. The
  user wanted the two merged, so the list is now the **2023–2026** union: 211 + 38
  brochure-only = **249** institutions, 77 bold (a Class of 2025 *or* 2026 graduate enrolled).
  20 colleges spelled differently on the two lists are counted once under the profile's
  spelling. Buckets moved to Ivy 4/8, Ivy+ 7/17, Top-75 National 49/75, Top-75 Liberal Arts
  20/75, Power Four 54/68 (HBCU unchanged at 10/107), and the Compare window is
  `(2023–2026)`, which matches Country Day, Covenant Day and Providence Day. Shenandoah and
  Universal Technical Institute were restored to the URL master and its companion. The full
  record, including the spelling pairs and the 38 brochure-only names, is in the School
  Profile 2026-2027 source file. Phase 2 translates the English as merged.
- **FAMU counted as an HBCU (user correction, 2026-11-04).** `isHbcu()` missed the spelling
  `Florida Agricultural & Mechanical University` because the alias key lacked the `univ` that
  `normName` appends. One alias line in `src/data/collegeMemberships.ts` fixes it everywhere:
  Charlotte Christian's HBCU count moves 10 → **11**, and Charlotte Latin's 7 → **8** (its
  `Florida Agricultural and Mechanical University` row had the same miss). **Phase 2 must
  therefore also re-translate Charlotte Latin's HBCU qual sentence in the metric-values overlay**,
  which is outside Charlotte Christian's pages.
