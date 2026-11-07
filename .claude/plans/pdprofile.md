---
name: pdprofile
title: Refresh Providence Day from its 2026–27 profile — May 2026 AP (1,282 exams, 93%/76%), Class of 2026 SAT/ACT with ACT Reading and Science added, Class of 2027 quintiles, 754/179 enrollment and ~36:1 caseload (Compare ~44:1 corrected), Class of 2026 awards ($21M, 9 NMF, 58 National Recognition, 118 NHS, 375 GSD graduates), Huntingdon College added (383 rows) and the acceptance list's bold markers corrected from 107 to the profile's 182; Sports, Clubs and Compare follow-ons; amended 2026-11-07 for the Compare SAT/ACT rows that shipped after planning
status: implemented
phases: 2
created: 2026-11-05
branch: feat/pd-profile-2627
prs: [442]
---

# Refresh Providence Day from its 2026–27 profile

## Goal

Providence Day published its **2026–2027 profile** on 2026-08-18. Its College Guidance page
now links only this edition:

```
https://resources.finalsite.net/images/v1787160331/provday/uoyzvocbz4fm51bh8lqd/Collegeguidancecollegeprofile26-27updated.pdf
```

The app still shows the **2025–26 Academic Profile's** figures. The user asked for "all the up
to date info for Providence Day that we cover and can extract from this pdf". This plan brings
every card that holds a profile figure up to the 2026–27 edition: the six College Support
cards, four Compare cells, one Sports note and two Clubs lines. It also fixes a defect found
while planning: the shipped acceptance list marks the **wrong colleges** as enrolling.

The work is done when:
- the Providence Day page and Compare show the 2026–27 figures in English;
- every new figure traces to
  `source-material/college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md`;
- the acceptance list has 383 rows, and exactly the profile's 182 bold names are marked
  `enrolling`;
- `npm run build` is green after Phase 2 in all ten locales.

## Context

### The source, already on disk (uncommitted)

`source-material/college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md`
was written during planning. It holds:
- a full transcription of all four pages;
- the 383-name acceptance list with bold marked `**…**`, read from the PDF's font data;
- a diff against the shipped list;
- the AP-table arithmetic, including one row that does not add up.

**Read that file first. It is the authority for every figure below.** Its filename subtopic
"School Profile 2026-2027" folds onto the `outcomes` card under the existing
`/school profile/i` rule in `src/lib/metrics.ts` (line ~220), the same as the Catholic, Latin
and Hickory Grove profile files. So ingest creates no new card.

The prior edition (2025–26) is still served at its own URL, and Wayback holds it too. Its
figures are recorded in `Providence Day - College Support - Redesign Research 2026.md`,
which stays as it is.

### The delta, in brief

| Area | Shipped (2025–26 edition) | 2026–27 edition |
|---|---|---|
| AP session | May 2025: 1,213 exams, 461 students (unconfirmed), 94% 3+, 77% 4–5, 31 subjects | **May 2026: 1,282 exams, 497 students, 93% 3+, 76% 4–5, 94% of students 3+, 29 subjects** |
| AP courses offered | "30 vs 31" verify flag | **30 AP courses named** in the course table (adds AP German and AP Business & Personal Finance vs the catalog's 28) |
| AP weighting | +0.5 Advanced, +1.0 AP | unchanged, plus a stated rule: **below a 70 in an AP course, no extra weight** |
| SAT | Class of 2025, 143 testers: 1334 (1220–1460), R&W 674 (630–740), M 659 (590–730) | **Class of 2026, 147 testers: 1288 (1160–1420), R&W 650 (600–720), M 638 (570–710)** |
| ACT | Class of 2025, 159 testers: C 27 (23–31), E 28 (23–34), M 29 (24–34) | **Class of 2026, 171 testers: C 25 (21–30), E 26 (20–32), M 27 (21–33), Reading 25 (20–31), Science 25 (21–32)** |
| Quintiles | Class of 2026: 4.467/1445/31 … 2.930/1053/19 | **Class of 2027 (179 seniors): 4.507/1454/34 · 4.224/1376/30 · 4.017/1281/28 · 3.778/1192/25 · 3.204/1116/21** |
| Enrollment | 730 Upper School, 178 seniors | **2,060 TK–12 · 754 Upper School · 179 seniors** |
| Counselors | 5 on the web page, 4 on the profile | **5 on the profile** (Darren Morgan now listed) |
| National Merit / awards | profile "stale on this metric" | **Class of 2026: 82% honoured, $21 million, 9 NMF, 18 Commended, 58 College Board National Recognition** |
| Other Class of 2026 | — | **118 NHS inductees, 23 GSD, 31 college athletes, 13 at D1** |
| GSD graduates | 344 since 2007 | **375 since 2007** |
| Faculty | — | **81% of Upper School faculty hold advanced degrees** |
| Honor Council | "student-run" | **8 students (two per grade) + 2 elected faculty + 1 appointed by the Head** |
| CEEB | not shown | **340687** |
| Acceptance list | 382 rows, 107 marked enrolling | **383 rows (adds Huntingdon College), 182 bold** |

### Files that carry the profile

**[`src/data/collegeSupportPrograms/providence-day.ts`](../../src/data/collegeSupportPrograms/providence-day.ts)**
(928 lines):
- The header comment is at lines 1–22. It says "chiefly the 2025–26 Academic Profile PDF".
- The `colleges` array and its comment are at lines 26–414. The comment explains the bold key.
- The `PROFILE` const is at 416–417. It is the 2025–26 URL.
- `ncAdmissions` is at 436–542. **Do not touch it**: it is government data.
- `transcript` starts at 543: stats, `merit` (554), `meritNote` (562), `depth`, `trust`,
  flags, sources.
- `counseling` starts at 616: headline, stats, roster, timeline, mechanics, `reach` (697),
  flags, sources.
- `outcomes` starts at 723: stats, buckets, `collegesTotal` (744), scholarships, sources.
- `edge` starts at 762: two levers, sources.
- `wholeClass` starts at 799: `scoreTables` (804), `quintiles` (830), `gpaNote`, `support`,
  `middle`, flags, sources.
- `verdict` starts at 880: points, `checklist` (911), sources.

**[`src/data/metricValues.ts`](../../src/data/metricValues.ts)**, Providence Day cells:
- `ap-performance`: value `'94%'` (line 308), sub `'(2025)'` (321) and qual (334).
- `counselor-caseload`: `'~44:1'` (878) and qual (896). It contradicts the card's ~36:1 today.
- `ACCEPTANCE_WINDOWS` `'(2023–2026)'` (147) stays the same.
- The six bucket cells (362–848) should stay the same; step 4 confirms this.
- The course cells `'149'` / `'28 AP'` / `'11'` stay the same (D15).

**[`src/data/sportsPrograms/providence-day.ts`](../../src/data/sportsPrograms/providence-day.ts)**:
`funnelNote` at line 247 cites "the school's own single-class graphic" for 31 college
athletes.

**[`src/data/clubsPrograms/providence-day.ts`](../../src/data/clubsPrograms/providence-day.ts)**:
- the `service` card starts at 113, with its `footnote` at 145;
- the `honors` card starts at 160, with the National Honor Society row at ~174;
- the constants are at 28–45.

`src/content/**/providence-day.json`, `src/data/schools.json` and `.claude/docs/**` are
regenerated by the ingest pipeline. **Never hand-edit them.**

### The acceptance-list defect

The shipped `colleges` array marks `enrolling: true` on 107 rows: **all 94 "University of …"
rows** plus 13 others. The profile bolds **182**, and the live page
(`https://www.providenceday.org/fs/pages/2728`) bolds **178**. The two sources nearly agree
with each other, and both disagree with the app. So this is a transcription error made when
the list was first built, not a difference between sources. The 2026 research file shows the
cause: bold names were written `Name**\*` and lost their emphasis, and the whole
"Universities of" block was flagged.

Visible effects today:
- "University of Virginia" and 45 other unbolded "University of" rows show as enrolling.
- Bolded colleges such as Georgetown, Johns Hopkins, Northwestern, NC State and Wake Forest
  do not.
- The `wholeClass.middle` text names App State, ECU, High Point and Wingate as "bolded", but
  the shipped data does not bold them.

### The acceptance-list machinery

Read §3 of [`DATA-SCHEMA.md`](../docs/DATA-SCHEMA.md) and the "acceptance-list machinery"
section of [`catholicprofile.md`](catholicprofile.md). In brief:
- entries are `{ name, cats, enrolling? }`;
- ranks resolve via `rankLabelFor()` and URLs via `urlFor()`. **Never inline either;**
- bucket counts are deduplicated institutions. They must agree on four surfaces: the
  `buckets` row, any stat tile, the `metricValues.ts` cell and the qual;
- the gates are `check:ranks`, `check:collegeurls`, `check:buckets` and `check:memberships`.

### Why two phases

The plan rewrites research prose in the `college-support`, `metric-values`, `sports` and
`student-clubs` overlay topics. English ships first. Phase 2 covers the nine
`PROSE_TRANSLATED` locales from `src/lib/i18n.ts`: es, bn, ht, te, fr, fa, it, hi, ar.
**There are no `src/locales/*.json` chrome changes.** College names, figures and `cats` are
never translated.

### Parallel work to expect

`ccdprofile` (Charlotte Country Day, planned 2026-11-07) touches the same `metricValues.ts`
rows and adds the same D19 schema rule; whichever lands second rebases and keeps the rule
once. Other sessions write profile plans in this same tree. **Branch from freshly pulled `main`**,
and stage explicit paths only. Untracked files from other sessions must not be swept in
(CLAUDE.md git standard). Do not `git stash` (memory `never-git-stash-in-shared-tree`).

## Decisions

- **D1 — The 2026–27 profile is the authority** for every figure it prints. The live web
  pages stay the authority only for what the profile does not print: the timeline, the
  mechanics, the ~150 reps and 50+ campus visits, the 249-college record, and the roster
  bios.
- **D2 — Merge, never replace.** This follows the standing rule
  (memory `merge-acceptance-lists-never-replace`). The profile list is a superset of the
  shipped one:
  - add **Huntingdon College**, with `cats: []`, in alphabetical position after Howard
    University (line 145);
  - remove nothing;
  - the window stays **2023–2026** in `collegesTitle`, `ACCEPTANCE_WINDOWS` and the bucket
    quals;
  - the total becomes **383**.
- **D3 — `enrolling` follows the profile's bold, exactly 182 names.**
  - Set `enrolling: true` on exactly the names bolded in the source file. Remove it from every
    other row.
  - Script it: parse the `**…**` lines of the source file, then map names through the same
    spelling convention the array already uses (`X- Y` → `X–Y`, "University of" prefix for the
    grouped block, `St. Joseph’s`). Assert **182** marked rows afterwards.
  - The key text becomes the profile's own: `collegesTotal: '383 institutions · bold =
    enrolling one or more graduates'`.
  - Rewrite the `colleges` comment (lines 26–30) to say that the list is the 2026–27 profile's
    Classes of 2023–2026 list (383), that bold = "enrolling one or more members", and that the
    shipped markers before this change were a transcription error.
  - Add one **`kind: 'verify'`** flag to `outcomes.flags`. These flags are dev-only (CLAUDE.md
    "Research bookkeeping is dev-only"). It records that the live page uses a "more than one"
    key and differs on six names: Berklee, Thomas Jefferson, UCF, UNC Pembroke and William Penn
    are bold only in the profile, and Stevenson is bold only on the page.
- **D4 — Buckets should not move.** Huntingdon is a Regional college with no tags, and
  `enrolling` does not feed the buckets. Expect Ivy 8/8, Ivy+ 17/17, NU75 75/75, LAC75 51/75,
  P4 65/68 and HBCU 14/107 after the merge. If `check:buckets` disagrees, investigate before
  editing any count. The "8 of 8 … every one bolded" claims are still true, because all eight
  Ivies are bold in the profile.
- **D5 — Huntingdon's URL.**
  - Add `huntingdon.edu` to `src/data/collegeUrls.ts` and to its companion,
    `source-material/college-support/_shared/College Homepages 2026.md`. The path is the one
    `scripts/check_college_urls.mjs` names.
  - First confirm in a browser that the page names Huntingdon College in Montgomery, Alabama
    (memory `http-200-proves-no-homepage`).
  - If it cannot be confirmed, skip the URL: an unlinked name is a legitimate null.
  - No rank label is needed, because it carries no top-75 tag.
- **D6 — AP figures (May 2026).**
  - Quote the school's **93% / 76%**. Never recompute them from the cells: the
    Computer Science Principles row is printed as 116 exams but its cells sum to 126 (see the
    source file's ⚠️ note).
  - `transcript.headline`: "Every AP student must sit the exam, so the score distribution
    colleges read is complete — and 93% of 2026's scores were a 3 or higher, with 76% at 4 or
    5."
  - `transcript.stats`:
    - `1,282` / "AP exams sat by 497 students, May 2026";
    - `93%` / "of scores were 3+ · 76% were 4s or 5s";
    - `30` / "AP courses in the profile's course table, 29 of them examined in May 2026";
    - `No rank` (unchanged).
  - The subhead's "all 31 subjects" becomes "all 29 subjects examined".
  - **`ap-top-scores` and `ap-performance`: ALREADY DONE by `ap45`** (user request,
    2026-11-05). PD's two Compare cells are `93%` `(2026)` and `76%` `(2026)` with the quals
    below, translated in all nine locales, and this profile file is committed as their source.
    Do not redo them; the card's own `transcript` figures are still this plan's work.
  - Replace the existing `verify` flag (461 students / 30 vs 31) with one `verify` flag about
    the CSP row and the rule "quote, don't recompute".
  - Verdict point 2 becomes: "1,282 exams at 93% scoring 3+ and 76% at 4–5, and 94% of the
    497 students who sat them earned a 3 or higher…". Keep the mandatory-exam sentence.
  - Compare `ap-performance`:
    - value `'93%'`, comment `// May 2026: 93% of 1,282 exams scored 3+ (497 students); AP
      exams are mandatory`;
    - sub `'(2026)'`;
    - qual: "93% of AP exams scored 3 or higher in May 2026, across 1,282 exams. A score of 3+
      is the level most colleges treat as a passing result."
- **D7 — AP weight rule.** Append to `trust[0].text` ("Weighted, and shown both ways"): "and
  the extra AP point is withheld from a student scoring below 70 in the course." This adds no
  new trust item.
- **D8 — Test scores: Class of 2026.** `wholeClass.scoreTables`, where `values` are
  `[10th, 25th, 50th, 75th, 90th, mean]`:
  - SAT: hint "— Class of 2026 · 147 testers". Rows:
    - SAT total `['—','1160','—','1420','—','1288']`;
    - Reading & Writing `['—','600','—','720','—','650']`;
    - SAT Math `['—','570','—','710','—','638']`.
  - ACT: hint "— Class of 2026 · 171 testers". Rows:
    - ACT composite `['—','21','—','30','—','25']`;
    - ACT English `['—','20','—','32','—','26']`;
    - ACT Math `['—','21','—','33','—','27']`;
    - **add** ACT Reading `['—','20','—','31','—','25']`;
    - **add** ACT Science `['—','21','—','32','—','25']`.
  - These are data rows in an existing table, so no new component or card is involved.
  - The ACT note is rewritten. The profile does not print a Class of 2026 graduate count, and
    the 2025–26 edition counted that class as **178 seniors**. So: "147 SAT and 171 ACT
    testers in a class of about 178 implies near-universal testing — roughly 83% SAT and 96%
    ACT participation. The school publishes no formal test-optional position and no
    submission rate."
  - The SAT note stays unchanged: it explains the mean/middle-50% columns.
- **D9 — Quintiles: Class of 2027.**
  - `gpaHint`: "— the no-rank mechanism · Class of 2027 weighted GPA at the start of senior
    year (179 seniors, August 2026)".
  - Quintiles:
    - `4.507` / "1454 SAT · 34 ACT";
    - `4.224` / "1376 SAT · 30 ACT";
    - `4.017` / "1281 SAT · 28 ACT";
    - `3.778` / "1192 SAT · 25 ACT";
    - `3.204` / "1116 SAT · 21 ACT".
  - `gpaNote` uses the new spread, which is our arithmetic: 4.507 → 3.204 is **1.303** points,
    and 1454 → 1116 is a **338-point** SAT gap.
    - The "3.891 weighted median" sentence becomes "a 4.017 middle fifth".
    - The closing class-year sentence becomes: quintiles = Class of 2027, test scores = Class
      of 2026.
  - `wholeClass.subhead`: "392-point" → "338-point".
  - Verdict checklist item 1: "averaging a 1116 SAT and a 3.204 weighted GPA … Where did those
    ~36 students actually enroll last year?"
- **D10 — Counseling.**
  - Stat `~36:1` stays: 179 ÷ 5 = 35.8.
  - The flag becomes: "computed from the profile's enrollment figures (754 Upper School, 179
    seniors ÷ 5), not published by the school". The all-grades ratio becomes **~151:1**
    (754 ÷ 5).
  - Verdict point 3: "five counselors for 754 Upper Schoolers (~36 seniors each)…".
  - `reach[2]` becomes "SCOIR · the data-rich annual profile · CEEB **340687** · reps are met
    even when no students sign up". The CEEB precedent is Cannon, Christian, CCD and Covenant
    Day.
  - The roster is unchanged: the profile prints the same five names and emails. Add the
    profile to the counseling sources as the contact-block citation.
  - Compare `counselor-caseload`:
    - value `'~36:1'`, with the comment `// COMPUTED — 179 seniors (2026–27 profile) over 5
      counselors (Director + 4 Associate Directors)`;
    - qual: "About 36 seniors per college counselor: 179 seniors shared among five
      counselors. A lower ratio means more counselor time per student."
    - The old "~44–45, quarter-class model" figure dates from a four-counselor contact block.
      It disagrees with both the card and the 2026–27 profile.
- **D11 — Awards and National Merit (Class of 2026).**
  - `merit[0]` (2026): keep what is there, and add "**58** College Board National
    Recognition". The profile also confirms 9 Finalists and 18 Commended. Keep the
    Semifinalist → Finalist wording, adding "per the 2026–27 profile".
  - `meritNote`: drop the "currently-posted 2025–26 Academic Profile is stale" sentence, since
    the 2026–27 profile now reports the Class of 2026. Keep the sentence that says "different
    class years rather than a conflict".
  - `outcomes.stats[3]`: replace the `'$23M / $20M'` conflict tile with `'$21M'` / "scholarship
    offers to the Class of 2026 — 82% of seniors honoured".
  - `scholarships`: keep the list, and change its last item to "Class of 2026: $21M in
    scholarship offers · 82% honoured · 9 National Merit Finalists".
  - The subhead's Class of 2025 facts (249 colleges, 39 states) stay. They come from
    `why-providence-day`, not the profile.
- **D12 — Edge.**
  - Lever 1: GSD "**344 graduates since 2007**" → "**375 graduates since 2007**". Do the same
    in the lever note ("a 375-graduate throughput"). Keep "23 in the Class of 2026", which the
    profile confirms.
  - Lever 2:
    - "a full per-subject AP distribution across 31 subjects" → "29 subjects".
    - The integrity item adds the Honor Council's make-up: "eight students, two per grade,
      plus two elected faculty members and a third appointed by the Head of School".
    - The memberships item adds "and **81%** of Upper School faculty hold advanced degrees".
      This follows the CCD precedent in its edge card.
- **D13 — Verdict checklist.** Three items are resolved by the new edition and are rewritten:
  - Item 4 (team size / missing name) becomes: "Five counselors share 179 seniors — does each
    student keep the same counselor from 9th grade to graduation?"
  - Item 7 (stale profile) becomes: "Your profile names 30 AP courses but 29 subjects were
    examined in May 2026 — is AP German running this year, and when does AP Business &
    Personal Finance begin?"
  - Item 8 ($23M vs $20M) is dropped. It was about the Class of 2025, and the tile it backed is
    replaced in D11.
  - Any wording in items 1–3, 5 and 6 that cites 2025-only figures follows D9.
- **D14 — Wording that depended on the wrong bold set.**
  - `wholeClass.middle[0]`: "~382-institution" → "383-institution". Re-check each named
    "bolded" example against the profile's bold set, keeping only those that are bold. All of
    App State, East Carolina, UNC Charlotte, UNC Greensboro, Western Carolina, High Point,
    Wingate, Gardner-Webb, Belmont Abbey and Central Piedmont are bold in the profile.
  - "multi-enrollee" → "enrolling", here and in verdict point 4, because the profile's key is
    "one or more".
  - `outcomes.subhead`: "~382" → "383".
- **D15 — Course Offerings: no change.** The catalog is built from the 2025–26 Upper School
  Course of Study (149 entries, 28 AP), which has descriptions. The profile only names
  courses. It names two APs the catalog lacks (AP German, AP Business & Personal Finance), and
  it describes neither. This follows the catholicprofile rule that the guide stays the
  catalog. Do **not** add catalog rows or change the Compare `'28 AP'` cell. D6's tile states
  the profile's 30 as the profile's count. A 2026–27 Course of Study is its own plan when the
  school posts one. None was linked from the pages checked on 2026-11-05, but the search was
  not exhaustive.
- **D16 — Citations.**
  - Rename the const `PROFILE` → `PROFILE_2526`, and add `PROFILE_2627` with the S1 URL.
  - Re-point every source label whose facts now come from 2026–27:
    - transcript, counseling, outcomes, edge, wholeClass, verdict;
    - labels read "providenceday.org — 2026–27 profile (…)".
  - Keep `PROFILE_2526` only on `transcript.sources`, labelled "2025–26 Academic Profile
    (2024 and 2025 National Merit history)". That is the one surviving fact sourced only
    there.
  - Update the header comment (line 7–8) to "chiefly the 2026–27 profile PDF".
- **D17 — Sports and Clubs.**
  - Sports `funnelNote`: after "…24 colleges in one senior class", add "; the 2026–27 profile
    puts the Class of 2026 at 31 college athletes, 13 of them at Division I". Then add a
    `PROFILE_2627` const and a source entry on that card. The D1 tally stays unchanged: it is a
    roster count over 2024–26, a different measure.
  - Clubs:
    - The National Honor Society row's `recognizes` becomes "Scholarship, leadership, service
      and character — 3.6 cumulative GPA minimum · 118 seniors inducted, Class of 2026".
    - The service card's `footnote` gains one sentence: "The school has no community service
      requirement."
    - Add a `PROFILE_2627` const and a source entry to each of those two cards.
    - The honors gap flag ("published counts are historical rather than current") gets "except
      the 2026–27 profile's 118 NHS inductees" added. Gap flags do not render on Clubs (memory
      `ddprofile2-shipped`), so this is for accuracy only.
- **D18 — Deliberately unchanged.**
  - Global Exposure already says ~375 GSD recipients and ~20 per class, which is consistent.
  - Admissions: Lisa Knight's title on that card comes from the live admissions page, which is
    the authority. The profile's "Director of Admissions" is shorthand.
  - Enrollment (2,060 / 39% students of color) and the 22.5-unit graduation requirements have
    no card. This follows the ddprofile2 precedent: no card is built.
  - `ncAdmissions` is unchanged.
- **D20 — Compare SAT / ACT rows (added 2026-11-07; `testscores`, PR #439, shipped after this
  plan was written).** `sat-scores` and `act-scores` in `metricValues.ts` now carry a PD cell
  each: `values` `'1334'` / `'27'`, `subs` `'(Class of 2025)'`, `scores`
  `{ median: null, mean: '1334', mid50: '1220–1460' }` / `{ …, mean: '27', mid50: '23–31' }`.
  Move them to the Class of 2026: `scores` `{ median: null, mean: '1288', mid50: '1160–1420' }`
  and `{ median: null, mean: '25', mid50: '21–30' }`; `values` `'1288'` / `'25'` (the first
  non-null of median → mean → mid50, which `check:scores` enforces); `subs` `'(Class of 2026)'`
  on both. No PD qual exists on either row; add none. `check:scores` also requires `1288`,
  `1160`, `1420`, `25`, `21`, `30` and `Class of 2026` verbatim in the PD card file, which D8
  supplies. Also check `ap45` (PR #430) left the PD `ap-performance` / `ap-top-scores` cells at
  `93%` / `76%` `(2026)` — D6 already says not to redo them.
- **D19 — Schema-doc rule.** Add one durable rule to the acceptance-list section of
  `scripts/gen_data_schema.mjs`:
  - **"Read bold markers from the source's formatting — `<strong>`/`<b>` in HTML, the bold
    font face in a PDF (`pdftohtml -xml`) — never from a text-layer or markdown transcription,
    and record the bold count in the source file."**
  - Then run `npm run schema`. This is the same class of rule CLAUDE.md asks for after a
    review bug.

## Approvals needed

None. Every change is data in an existing card, tile, table or Compare cell:
- no new card, section, tile, Compare row or metric key;
- no reorder;
- no component change.

The two added ACT rows are rows of an existing score table. The `$21M` tile replaces the
content of an existing tile.

## Source material

- **Written at planning (uncommitted):**
  `source-material/college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md`.
- **Updated at implement:** `source-material/college-support/_shared/College Homepages 2026.md`
  gets the Huntingdon row, if confirmed (D5).

## Out of scope

- A Course Offerings refresh (D15).
- Any change to the NC admissions card, Global Exposure, Admissions, Arts, After School or
  Summer.
- Deploying. `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

1. **Branch.**
   - `git checkout main && git pull`, then `git checkout -b feat/pd-profile-2627`.
   - Run `git status --short`. Other sessions' untracked files stay unstaged.
2. **Ingest.**
   - Run the `ingest-source-material` skill for `college-support/providence-day`.
   - Then run `npm run check:metrics` and `npm run schema`.
   - If `schools.json` reorders unrelated topics, restore HEAD order (memory
     `two-topic-ingest-reorders-manifest`).
3. **Merge the list and fix the bold** in `collegeSupportPrograms/providence-day.ts`
   (D2, D3).
   - Add Huntingdon College.
   - Rewrite every `enrolling` marker by script from the source file.
   - Assert **383** rows and **182** `enrolling: true`.
   - Diff the names against `git show main:src/data/collegeSupportPrograms/providence-day.ts`.
     Exactly one name should be added and none removed.
   - Update the `colleges` comment, `collegesTotal` and the D3 verify flag.
4. **Huntingdon URL** (D5). Then run
   `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships`
   and confirm the D4 counts.
5. **Rewrite College Support figures and prose** per D6–D14 and D16, card by card:
   - `transcript`: headline, subhead, stats, `merit`, `meritNote`, `trust[0]`, flags, sources.
   - `counseling`: `reach[2]`, flags, sources.
   - `outcomes`: subhead, stats[3], scholarships, flags, sources.
   - `edge`: both levers, note, sources.
   - `wholeClass`: subhead, score tables, quintiles, gpaHint, gpaNote, `middle[0]`, sources.
   - `verdict`: points 2–4, checklist items 1, 4, 7 and 8, sources.
   - Header comment and the `PROFILE_2526` / `PROFILE_2627` consts.
   - Grep the file afterwards for `1,213`, `461`, `77%`, `730`, `178`, `344`, `31 subjects`,
     `1053`, `2.930`, `392`, `multi-enrollee`, `382` and `$20`. Each remaining hit must be
     deliberate, such as the 2025 merit row.
6. **Compare cells** in `src/data/metricValues.ts` (D6, D10, D20): `ap-performance` is
   already done (ap45); `counselor-caseload` value, comment and qual; `sat-scores` and
   `act-scores` PD cells (`values`, `subs`, `scores`). Run `npm run check:scores`.
7. **Sports and Clubs** (D17).
8. **Schema-doc rule** (D19): edit `scripts/gen_data_schema.mjs`, then
   `npm run schema && npm run check:schema`.
9. **Verify Phase 1** (below).
   - Commit the English with explicit paths, including the source-material file, and push.
     Check that the push landed (memory `git-push-silently-noop`).
   - Set the plan status to `english-done` and the INDEX row to **English shipped**.
   - **→ STOP. End the turn and ask the user to review the English.** The pages to review are
     Providence Day's College Support, Sports (the recruiting funnel note) and Clubs (Service,
     Honors), plus Compare.

### Phase 2 — Every other locale

Only after the user confirms the English. The scope is the nine `PROSE_TRANSLATED` locales
(es, bn, ht, te, fr, fa, it, hi, ar) across the overlay topics `college-support`,
`metric-values`, `sports` and `student-clubs`. There are no chrome-catalog keys. Follow
`.claude/docs/prose-translation-architecture.md` and each locale's rollout doc for the
mechanism. The traps:
- figures are copied char-for-char (`1,282`, `$21M`, `4.507`, `600–720`), never re-typed;
- no unit or separator changes (`check:sepdrift`);
- `hi`/`te` regroup only at render;
- `fa`/`ar` store no bidi isolates;
- college names stay Latin, as each locale already does.

1. **Re-extract with carry-over by English text**, using the method in memories
   `christianprofile-shipped` and `ddprofile-shipped`:
   - re-extract each topic to a throwaway `--lang xx`;
   - carry each locale's existing `t` by English text;
   - units that differ only in a figure can be carried by token substitution;
   - translate the rest.
2. **Translate the misses** for each of the nine locales.
3. **Build the overlays** with `i18n_build_overlay.mjs` for every touched topic × locale.
4. **Verify Phase 2** (below).
   - Commit, open the PR with `--body-file`, squash-merge and pull `main`.
   - Flip the INDEX row to **Implemented** with the PR link.
   - **Do not deploy.** End with "merged — ready to deploy whenever you want it."

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md` | new (written at planning) |
| `source-material/college-support/_shared/College Homepages 2026.md`, `src/data/collegeUrls.ts` | Huntingdon row, if confirmed |
| `src/data/collegeSupportPrograms/providence-day.ts` | list row + bold fix; figures, prose and citations on five cards |
| `src/data/metricValues.ts` | `counselor-caseload`, `sat-scores`, `act-scores` (PD cells only; AP cells already moved by ap45) |
| `src/data/sportsPrograms/providence-day.ts` | `funnelNote` + citation |
| `src/data/clubsPrograms/providence-day.ts` | NHS row, service footnote, honors flag, citations |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | D19 rule; doc regenerated |
| `src/data/schools.json`, `src/content/**/providence-day.json`, `.claude/docs/**` | regenerated by ingest/schema |
| `src/data/overlays/**` (Phase 2) | four topics × nine locales |
| `.claude/plans/pdprofile.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (memory: trust `tsc -b`, not `--noEmit`).
- [ ] `npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships && npm run check:scores`:
  clean. The buckets read 8/8 · 17/17 · 75/75 · 51/75 · 65/68 · 14/107 (D4); the SAT/ACT rows
  read `1288` / `25` with `(Class of 2026)` (D20).
- [ ] `colleges` has **383** rows and **182** `enrolling: true`. Against `main`, one name is
  added and none removed. Spot-check five examples:
  - University of Virginia is **not** enrolling;
  - Georgetown, Wake Forest and University of North Carolina–Chapel Hill **are**;
  - Stevenson is **not**.
- [ ] `npm run check:metrics`, `npm run schema && npm run check:schema`: clean.
- [ ] `npm run build`: green. Expect the changed English to show as untranslated in the
  other locales. That is Phase 2's job, and it must not fail the build.
- [ ] **Browser check.** Run `npm run build && npx vite preview`, then open
  `/school/providence-day` with every `<details>` open:
  - **College Support:**
    - the 1,282 / 93% / 30 / No rank tiles;
    - the SAT 1288 and ACT 25 rows, with the new ACT Reading and Science rows rendering in the
      table;
    - the five Class of 2027 quintiles;
    - the `$21M` tile;
    - the 383-row list with bold on the right names;
    - the "bold = enrolling one or more graduates" key;
    - 375 GSD graduates, and CEEB 340687.
  - **Compare:** PD AP shows `93%` `(2026)`, the caseload shows `~36:1`, and the SAT/ACT cells
    stack 1288 / 1160–1420 and 25 / 21–30 over `(Class of 2026)`.
  - **Sports:** the funnel note names 31 / 13 Division I.
  - **Clubs:** NHS shows 118, and the service card says there is no requirement.
  - **Production preview:** no `verify` flag text appears.
- [ ] `npm run audit:mobile`. The score table gained two rows.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: every stamp resolves, and gate 3 is clean.
- [ ] `npm run check:chrome`: clean (no new keys expected).
- [ ] For each touched topic and locale, run
  `python3 scripts/check_figures.py --topic <t> --lang <l>` and
  `npm run check:sepdrift -- --lang <l>`: clean.
- [ ] `npm run check:digits`: review the report for the new units (it compares against
  `main`).
- [ ] `npm run check:fr`, `npm run check:dates`, `npm run check:moneytext`: clean.
- [ ] `node scripts/check_work_integrity.mjs`: no wrong-script prose.
- [ ] `npm run build`: green.
- [ ] Browser spot-check of `/school/providence-day?lang=es` and `?lang=ar` with every panel
  open:
  - figures render char-for-char in prose;
  - the `$21M` tile is localized;
  - no English sentences remain in table cells, chips or source lines.

## Risks

| Risk | Mitigation |
|---|---|
| A bold-mapping slip (name spelling) leaves a bold college unmarked | Assert exactly 182 after the script; print any bold source name that matched no row |
| Recomputing AP % from the cells gives 92% | D6: quote the school's 93% / 76%; the verify flag records why |
| Treating the profile's AP list as catalog rows | D15: no catalog change |
| `schools.json` reorder noise | Restore HEAD order per memory |
| Sweeping another session's files into the commit | Explicit paths; `git status --short` before each commit |

## Open questions

- Huntingdon's homepage. **Default:** add it only if it is browser-confirmed. Otherwise leave
  it unlinked.

## Implementation notes
Phase 1 (English) built 2026-11-07 on `feat/pd-profile-2627`. Deviations from the plan:

- **Step 2 (ingest).** The source file was already committed and its Compare AP cells shipped
  by `ap45` (#430), but the distilled doc `.claude/docs/college-support/providence-day.md` had
  never been regenerated. The full rebuild churned 96 unrelated docs (date stamps) and
  reordered `schools.json`. Only the PD doc, the PD content JSON and the one new manifest
  document entry (HEAD order restored) were kept.
- **D19.** The bold-marker rule was already in `gen_data_schema.mjs`, added by `ccdprofile`
  (#441). It now cites Providence Day as a second example (107 marked vs 182 bold) rather
  than being added twice.
- **D5.** Huntingdon's homepage was confirmed in headless Chromium (Playwright) because the
  Chrome extension was not connected. `huntingdon.edu` redirects to `https://www.huntingdon.edu/`
  and the page names Huntingdon College, Montgomery, Alabama 36106. The stored URL is the
  final host.
- **D9 `gpaNote`.** The old "mid-B-plus unweighted" reading of the median was an inference
  we could not re-derive for 4.017. It now says only that a 4.017 middle fifth is not a
  straight-A unweighted transcript, because part of it is honours and AP weight.
- **D2 (user, 2026-11-07).** The user confirmed that the list stays cumulative. The profile was
  merged into the shipped list: one name added and none removed.
- **Phase 1 build.** `npm run build` stops at `check:live`, because 49 shipped overlay entries
  per locale were stamped against the English this phase rewrote. That is Phase 2's work.
  Every other check in the build chain passes when run on its own.

Phase 2 (all nine prose locales) built 2026-11-07 in a fresh window, on the same branch.

- **Splice.** `i18n_splice_work.mjs` per locale × topic: college-support 1703 kept / 44 added /
  43 dropped, metric-values 893/3/3, sports 1038/1/1, student-clubs 1073/3/3: 51 new units per
  locale. Every kept translation was verified byte-identical to HEAD by stamp, and the rebuilt
  overlays hold 0 duplicate `at` paths.
- **Carry-over.** 18 of the 51 units differed from their predecessor at the same `at` path only
  in figures, and were carried by token substitution (`ddprofile` method). The other 33 were
  translated by editing each locale's shipped wording, so register and term choices stay as
  reviewed. The `~382` → `383` units were hand-edited rather than substituted, because the
  English also dropped the "about".
- **Checks.** `check:runtime`, `check:live`, `check:chrome`, `check:fr`, `check:dates`,
  `check:moneytext`, `check:sepdrift` (×9) and `check_figures.py` (4 topics × 9) are all clean,
  and `npm run build` is green. `check:digits` reports 18 findings, all numbers written as words
  in the locale's reviewed style ("nine", "ninth grade", "~7/~16" → "about 7/16"). They are
  deliberate keeps. `i18n:leaks` flags none of the 51 new paths.
- **Browser.** In a production preview with every `<details>` open, every non-flag new
  translation rendered on `/school/providence-day` in all nine locales. The `$21M` tile renders
  `21 M US$` in es/ar, and the caseload qual sits in the Compare HTML as a tooltip.
