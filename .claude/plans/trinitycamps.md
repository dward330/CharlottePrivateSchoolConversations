---
name: trinitycamps
title: Trinity Episcopal Camp Catalog lists every 2026 camp session (83 rows), and the counts say what they count
status: english-done
phases: 2
created: 2026-11-15
branch: feat/trinitycamps
prs: []
---

# Trinity Episcopal: list every 2026 camp session in the Camp Catalog

## Goal

Trinity Episcopal's Summer Programs **Camp Catalog** card shows a 34-row sample with nothing
saying it is a sample. So the table counter reads "34 of 34 camps" under a headline that says
"75 named camps", and the Cost Planner beside it says "83 priced camps". A parent reads those
as three different answers to one question (user report, 2026-11-15).

After this change the card lists **every 2026 camp session the school published: 83 rows**.
The headline and the planner both say **83 camp sessions**, and the counter reads "83 of 83
camps". Every number on the card then counts the same thing: the rows a parent can see.

## Context

- **Card data:** [`src/data/summer/trinity-episcopal.ts`](../../src/data/summer/trinity-episcopal.ts),
  `catalog.camps` (34 rows today, grouped by week with `/* --- week --- */` comments). The
  `Camp` type is in `src/data/summerPrograms.ts` (`name, desc, category, categoryLabel,
  grades, gradeLabel, days, dayLabel, price, hours, weeks?, estimated?`). Every Trinity row
  uses `days: []` (no day filter) and `dayLabel` `'Mon–Thu'` in the two four-day weeks
  (June 15-18, June 29-Jul 2) and `'Mon–Fri'` otherwise. `weeks` strings look like
  `'June 15-18'`, `'June 29-Jul 2'`, `'July 6-10'`.
- **Why it is a sample:** the file's header comment (lines 12-19) says 85 rows were too many,
  so it sampled. An intro saying so was removed at the user's request on 2026-09-16
  (lines 44-47), and nothing replaced it. The other sampled catalogs (Cannon, Charlotte Country
  Day, Charlotte Latin, Providence Day) still carry such an intro. Trinity is the only one whose
  counter now reads as a complete list. The table already scrolls and has category, grade and
  search filters, so 83 rows need no new UI.
- **Renderer:** [`src/components/SummerPrograms.tsx`](../../src/components/SummerPrograms.tsx).
  The counter is `t('summerPrograms.campCount', { shown, total: data.camps.length })`
  (line ~319), so it follows the array length with no data change. **Rows are keyed
  `${c.name}|${c.price}|${c.hours}`** (line ~341). Two pairs in the full grid collide on that
  key: `Comic Creations - Manga | $425 | 9-4p` (rising 2-5 and rising 6-8) and
  `TES Academy: Middle School Math Launch | $275 | 9-12p` (grades 7 and 8). The comment above
  the key records that a collision once made filtered lists show the wrong camps. So the key
  must change (step 5).
- **What the numbers count** (recounted 2026-11-15 from the school's own grid in
  source-material):
  - **85** = rows in the school's CSV grid.
  - **83** = rows with a dollar price. The other two are Summer LEAP weeks 2 and 3, priced
    "included" because the $785 covers all three weeks.
  - **75** = entries in the school's camp-descriptions document, one per listing. A camp
    offered in two weeks counts twice.
  - **73** = distinct camp names in the grid (71 if the three LEAP weeks count once).
  - The Cost Planner's five bands (21 + 38 + 8 + 13 + 3) sum to the **83**. Recounted, all
    five match.
- **Source data is already in the repo:**
  `source-material/summer-programs/trinity-episcopal/Trinity Episcopal School - Summer Programs - Wildcat Summer Camp Catalog.md`
  - `## The full catalog, as published` holds all 85 grid rows: name, rising grades, time and
    price, week by week. It is authoritative for those four fields. Where the grid and the
    description document disagree, the grid wins (see that file's "Prose-doc vs CSV
    disagreements").
  - `## Camp descriptions — the school's own document, verbatim (2026 season)` (added while
    planning, **uncommitted**) has the school's own description of every camp. This is
    the source for each row's `desc`.
- **i18n layers:** `desc`, `gradeLabel`, `categoryLabel`, `dayLabel` and `weeks` are
  extracted prose (`scripts/i18n_fields.mjs`). `name` is a skipped proper noun, `price` is
  localized at render, and `hours` is a time literal. The topic is `summer-programs`, in the
  overlay layer for the nine `PROSE_TRANSLATED` locales. **No `src/locales/*.json` change.**
  The `summer-programs` `src/content` prose is not in the content extractor's `LIVE` map, so
  the source-material addition creates nothing to translate.
- **Compare:** Trinity is K-8 (`hasHighSchool: false`) and off Compare. `metricValues.ts` has
  `'trinity-episcopal': null, // K-8`. `summerMatrix` excludes it too. So there are no
  Compare deltas.
- **Nearest precedent:** Charlotte Christian's catalog, which lists all its distinct camps
  rather than a sample. Its intro is not copied: the user removed Trinity's on purpose.

## Decisions

- **D1 — One table row per priced grid row: 83 rows.** The user asked for the full list.
  Sections the grid splits (two grade bands, morning and afternoon) stay as separate rows.
  This matches how the 34 existing rows already treat P3 Soccer Lab. Rows that share a camp
  name each keep the grid's own grades, time and price.
- **D2 — Summer LEAP is one row covering its three weeks, not three.** Weeks 2 and 3 are
  continuations priced "included". A row priced `included` would render English in nine
  locales, because `price` is never extracted. Three rows would also show a single
  enrollment as three camps. So the existing row is relabeled:
  `name: 'TES Academy: Summer LEAP (3-week session)'` (the document's own title),
  `weeks: 'June 29-July 17 (3 weeks)'`, `dayLabel: 'Weekdays'` (week 1 is four days, weeks 2-3
  five), and price, hours, grades and desc unchanged. That is why the total is 83, not 85, and
  83 is exactly the planner's priced count.
- **D3 — Keep the 34 existing rows and their descriptions** unless a description is false or
  breaks a standing rule. They are shipped and translated in nine locales. Only four
  change:
  - **Chemistry of Slime** says "One of four unattributed science camps". "Unattributed"
    is research bookkeeping, which is dev-only (CLAUDE.md, presentation conventions). It is
    also no longer exact, since the school's doc names Mad Science for Spy Academy.
    Rewrite it from the school's description, keeping the Candy Chemistry pairing.
  - **Comic Creations - Manga** describes two sections in one row. Now that each has its
    own row, rewrite the rising 2-5 row's desc for that row alone. The new rising 6-8 row
    gets its own.
  - **Spy Academy** (user, 2026-11-15): add that it is run by Mad Science. The school's
    description calls it "the Mad Science Spy Academy". Keep the Secret Agent Lab pairing.
    This and the next item come from the two findings recorded in the source file.
  - **TES Academy: Middle School Math Launch, grade 6** (user, 2026-11-15): add that
    non-Trinity students can join with a current teacher's recommendation, which is the
    school's own condition. The two NEW grade 7 and grade 8 rows say the same. This is the
    opposite of LEAP, Fun with Numbers and Summer Play Days, which are Trinity-only.
  - Sibling-pointing descs that stay true (Roblox Coders, YAMS, Queen City Quest, both P3
    Soccer Lab rows, STEM Champions Academy) are kept. YAMS and Queen City Quest may reuse
    the same desc on both their rows.
  - Hogwarts Express's "the biggest week of the summer, which carries 17 camps" stays. It is
    the school's grid count for July 6-10 (17 rows including LEAP week 2).
- **D4 — New descriptions are one plain-language sentence** paraphrased from the school's
  entry in the source-material section, matching the existing rows' length (about 12-25
  words). Write for an average parent, grade 8-10, and stay under 30 words (the plain-language
  hook enforces this). No research bookkeeping. Figures go char-for-char. Name a vendor only
  where the school's own text names it (CAMMP, Black Rocket via the aid sentence, P3 Soccer /
  Coach Pedro, Mad Science for Spy Academy, Venture Outdoor Leadership, the Thornhill Rites
  of Passage Foundation for Kamp HUROP). For a TES-students-only camp, say so, as the
  existing Fun with Numbers row does.
- **D5 — Names use the grid's spelling** (`Roblox Coders`, `Theater and Improv`,
  `Pixels and Paints (girls only)`), not the document's (`ROBLOX`, `Theatre`). The grid is
  authoritative, and the 34 shipped names already follow it.
- **D6 — Categories come from the worklist below,** using only the six existing
  `categoryFilters` tokens. The classification is ours, and the worklist records it so the
  implementer does not re-decide it.
- **D7 — Counts are worded as "camp sessions".**
  - The catalog headline's "75 named camps" becomes **"83 camp sessions"**.
  - The planner headline's "Trinity's 83 priced camps fell into five clean bands" becomes
    **"Trinity's 83 camp sessions fell into five price bands"**.
  - The band `detail` counts ("21 camps." and so on) are left alone. They sum to the 83 rows
    the table now shows.
  - The shared `summerPrograms.campCount` chrome string ("… camps") is **not** touched. It is
    used by every school.
- **D8 — Grade tokens:** `K only` → `grades: ['k']`, `gradeLabel: 'Rising K'`.
  `TES K` → `['k']`, `'TES K'`. `TES 1-3` and `TES 1-2` keep their existing labels. Ranges
  expand to every grade (`K-5` → `['k','1','2','3','4','5']`). `gradeLabel` is
  `'Rising <range>'` as on the existing rows.
- **D9 — The row-key fix is the minimum:** add `gradeLabel` and `weeks` to the key. That
  makes all 83 keys unique (verified in step 5). There is no visual change.

## Approvals needed

- **A one-line change to `src/components/SummerPrograms.tsx`: the table's React row key**
  (step 5). It is invisible and causes no layout or style change. It is needed because two
  pairs of real Trinity rows would otherwise share a key, and the comment there records that a
  collision once showed the wrong camps under a filter. **APPROVED by the user,
  2026-11-15** (at planning time). Do not re-ask.
- No new card, section, tile, Compare row or metric key. This is data on an existing card.

## Source material

- `source-material/summer-programs/trinity-episcopal/Trinity Episcopal School - Summer Programs - Wildcat Summer Camp Catalog.md`.
  A new section was **appended during planning (uncommitted)**:
  `## Camp descriptions — the school's own document, verbatim (2026 season)`. It holds the
  provenance and the 85/83/75/73 counts. Two older notes in the same file were **corrected
  in place** during planning:
  - The "Mad Science is NOT a vendor" note is now "Mad Science runs Spy Academy", and Mad
    Science has a row in the strand table.
  - The TES Academy strand row now says which three camps are Trinity-only, and that the
    Middle School Math Launch camps take non-Trinity students with a teacher's
    recommendation.

  It is followed by the full verbatim export of
  https://docs.google.com/document/d/1phMvzNdyn2_EYf4TwGnuS2ZzI8virOrQCi3SBBtCn1k/export?format=txt
  (fetched 2026-11-15, HTTP 200). **`/implement` commits it and runs the
  `ingest-source-material` skill on it first (step 1).** It is a new `##` section in an
  existing file, not a new file, so it creates no new subtopic or prose-card key.

## Out of scope

- Other schools' catalogs, including the intro counts in Cannon, CCD, Latin and Providence
  Day. During planning, a rough row count did not always match the "N of M" in their intros.
  That is worth its own check, not this plan.
- The shared `summerPrograms.campCount` string, and any filter or week-filter UI.
- The 2027 season. The live camp page says "Check back in January 2027 for Camp
  Registration!". Refresh when it posts.
- Restoring a catalog intro. The user removed it on 2026-09-16, and a complete list no longer
  needs one.

## Steps

### Phase 1 — English

1. **Branch, commit the source, ingest.** `git checkout -b feat/trinitycamps` from an
   up-to-date `main`. Commit the source-material file by explicit path. Run the
   `ingest-source-material` skill for `summer-programs/trinity-episcopal`. Check with
   `git status --short` that the ingest touched only Trinity summer outputs:
   `.claude/docs/` notes, `src/data/schools.json` and
   `src/content/summer-programs/trinity-episcopal.json`. If `schools.json` shows a whole-file
   reorder, restore the HEAD order (memory: two-topic ingest reorders the manifest).

2. **Add the 49 NEW rows** to `catalog.camps` in `src/data/summer/trinity-episcopal.ts`, in
   worklist order: week by week, and within a week in the grid's order. Keep the existing
   `/* --- week --- */` comment dividers. For each row:
   - `name`, `gradeLabel`/`grades` (D8), `hours` and `price` come from the worklist,
     char-for-char.
   - `category` and the matching `categoryLabel` come from the worklist (D6). The labels are
     `stem` → `'STEM & coding'`, `arts` → `'Arts & making'`, `sports` →
     `'Sports & outdoors'`, `academic` → `'TES Academy'`, `enrichment` →
     `'Games & enrichment'`, `performing` → `'Performing arts'`.
   - `days: []`.
   - `dayLabel` is `'Mon–Thu'` for June 15-18 and June 29-Jul 2, and `'Mon–Fri'` otherwise.
   - `weeks` uses the existing strings: `'June 15-18'`, `'June 22-26'`, `'June 29-Jul 2'`,
     `'July 6-10'`, `'July 13-17'`, `'July 20-24'`.
   - Write `desc` per D4 from that camp's entry in the source-material section.

   **Reorder the existing 34 rows into the same worklist order**, so each week reads in the
   grid's order. Move them; never retype them.

3. **Edit the existing rows that D2/D3 change:**
   - Summer LEAP: relabel per D2.
   - Chemistry of Slime: new desc.
   - Comic Creations - Manga (rising 2-5): new desc.
   - Spy Academy: add Mad Science (D3).
   - TES Academy: Middle School Math Launch (grade 6): add the teacher-recommendation route
     for non-Trinity students (D3).

4. **Reword the counts (D7)** in the same file:
   - `catalog.headline`: `75 named camps` → `83 camp sessions`. The rest of the sentence is
     unchanged.
   - `costPlanner.headline`: `Trinity’s 83 priced camps fell into five clean bands` →
     `Trinity’s 83 camp sessions fell into five price bands`.
   - Rewrite the header comment (lines 12-19): the card now lists every priced grid row (83).
     LEAP's three weeks are one row (D2). The 85/83/75/73 counts are what each source counts.
     Drop "So the catalog below is a SAMPLE" and the Latin precedent line. Also update the
     `// No intro` comment, which mentions "33 of 85 rows".

5. **Fix the row key** in `src/components/SummerPrograms.tsx`: change the key to
   `` `${c.name}|${c.price}|${c.hours}|${c.gradeLabel}|${c.weeks ?? ''}` `` and add one
   sentence to the comment above it: the same camp can run as two grade sections at one price
   and time (Trinity's Comic Creations - Manga). Before moving on, assert uniqueness across
   **every** school's catalog. Import each `src/data/summer/*.ts` under Node (they import
   only a type) and count duplicate keys. It must be 0.

6. **Regenerate and check.** `npm run schema`, then `npm run build`. The build runs
   `check:schema`, `check:live`, `check:runtime`, `check:spelling`, `check:flags` and
   `check:cardlink`. `check:live` and `check:runtime` will report the new and changed English
   as untranslated or stale for the nine locales. That is expected in Phase 1 and is cleared
   in Phase 2. If either *fails* the build rather than reporting, do what the `trinitysite`
   Phase 1 did (read `.claude/plans/trinitysite.md`, Implementation notes) and record what you
   did.

7. **Browser check (English):** `npm run build && npx vite preview`, then open
   `/school/trinity-episcopal/#summer-programs/the-camp-catalog`.
   - The counter reads **"83 of 83 camps"**.
   - The headline says 83 camp sessions.
   - Each category chip and each grade chip filters to a non-empty, correct list.
   - Searching `Manga` shows 2 rows with different grades, and searching `Math Launch` shows 3.
   - Summer LEAP shows once, with `June 29-July 17 (3 weeks)`.
   - The planner headline says 83 camp sessions.
   - No React key warning in the console. Use `npm run dev` for that, since warnings show
     only in dev.

   Then `npm run audit:mobile`, because the card is now much taller.

8. **Commit by explicit path, push, verify the push** (`git rev-parse HEAD` vs
   `git ls-remote origin feat/trinitycamps`). Open the PR with `--body-file`. Set the plan to
   `english-done` and the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English** —
especially the 49 new descriptions and the four rewritten ones. Nothing below runs until they
confirm.

### Phase 2 — Every other locale

Scope: the **overlay layer**, topic `summer-programs`, for the nine `PROSE_TRANSLATED` locales
(`es, bn, ht, te, fr, fa, it, hi, ar`). **Not** `src/locales/*.json`. For the mechanism, see
`.claude/docs/prose-translation-architecture.md`. For per-locale traps, see the
`prose-translation-<lang>.md` docs.

9. **Measure scope from the live module.** Extract `summer-programs` to a throwaway lang
   (`node scripts/i18n_extract.mjs --topic summer-programs --lang __verify --out <tmp>`).
   Diff the stamps against `src/data/overlays/work/summer-programs.es.json`, and record new,
   retired and unchanged counts. Every new or retired stamp must be a Trinity path. Anything
   else means scope leaked, so stop and find it.
   - **The camps array was reordered and grew, so every Trinity `at` path under
     `catalog.camps[...]` shifts** (memories: mid-array insert shifts paths; overlay paths go
     stale on row delete). Splice **by stamp**, never by index.
   - Most `gradeLabel` / `dayLabel` / `weeks` / `categoryLabel` values (`Rising 3-8`,
     `Mon–Fri`, `July 6-10`, `STEM & coding`) and the reused YAMS / Queen City Quest descs
     already have a translation for the same English. Reuse each locale's existing `t` for
     identical English rather than translating it again.

10. **Splice and translate** with `scripts/i18n_splice_work.mjs --lang <code>` (all nine).
    New translations are needed only for the new descs, the four rewritten descs, the LEAP
    `weeks`/`dayLabel`, `Weekdays`, the two headlines, and any new `gradeLabel`/`weeks`
    value. The headline edits change one phrase: carry the rest of each locale's `t` and
    change only that phrase (the plaincollege "revise the predecessor" method). Traps:
    - Figures go char-for-char: `$225`–`$785`, `83`, the grade ranges and the times.
    - Dates translate, but their digits do not (`check:dates`). The `June 29-July 17` range
      in `fa`/`ar` must not be reversed (memory: RTL figure ranges reverse).
    - `hi`/`te` store the English 3-3-3 figure, and `fa`/`ar` store no bidi isolates.
    - Camp names are not extracted. Inside a desc, keep a camp or vendor name as published
      (`Candy Chemistry`, `CAMMP`, `Mad Science`, `TES Academy`).
    - The "2026 season" label must survive in both headlines.

11. **Rebuild the overlays:** `npm run i18n:build -- --topic summer-programs --lang <code>`
    for all nine.

12. **Phase 2 verification** (below). Commit by explicit path, push, verify the push, and
    update the PR. Merge with `gh pr merge --squash --delete-branch` (pre-authorized), then
    `git checkout main && git pull`. Set the plan to `implemented`, adding
    `## Implementation notes` for any deviation, and set the INDEX row to *Implemented* with
    the PR link. **Do not deploy.** End with "merged — ready to deploy whenever you want
    it".

## Worklist — the 83 rows, in order

From `## The full catalog, as published` (grid rows), with Summer LEAP weeks 2-3 folded
into row 30 (D2). **keep** = an existing row (move it into this position, untouched unless
step 3 names it). **NEW** = add it. Price, time and grades are char-for-char from the grid.
Category is our classification (D6).

| # | Week | Camp (CSV spelling) | Rising grades | Time | Price | Category | Row |
|--:|---|---|---|---|--:|---|---|
| 1 | June 15-18 | Wildcat Basketball Academy | 2-6 | 9-12p | $245 | `sports` | keep |
| 2 | June 15-18 | Jumping Beans | K | 9-12p | $235 | `enrichment` | keep |
| 3 | June 15-18 | CAMMP: Mathematics, Robotics and Coding | 1-6 | 9-4p | $395 | `stem` | keep |
| 4 | June 15-18 | Young Coders | 1-2 | 9-12p | $255 | `stem` | NEW |
| 5 | June 15-18 | Young Game Designers | 1-2 | 1-4p | $255 | `stem` | NEW |
| 6 | June 15-18 | Pixels and Paints (girls only) | 3-5 | 9-4p | $390 | `arts` | keep |
| 7 | June 15-18 | Graphic Design | K-2 | 9-12p | $285 | `arts` | NEW |
| 8 | June 15-18 | Pup Tank | K-2 | 1-4p | $245 | `enrichment` | NEW |
| 9 | June 15-18 | Coloring on Canvas | 3-5 | 9-12p | $245 | `arts` | NEW |
| 10 | June 15-18 | Trashion Fashion | 2-5 | 9-12p | $225 | `arts` | keep |
| 11 | June 15-18 | Kaleidoscopic Crafts | 2-5 | 1-4p | $225 | `arts` | NEW |
| 12 | June 15-18 | Wildcat Cycling Adventure | 4-8 | 9-12p | $255 | `sports` | keep |
| 13 | June 15-18 | TES Academy: Camp Read (and Write) A Lot | 1-3 | 9-12p | $235 | `academic` | keep |
| 14 | June 22-26 | Roblox Coders | 3-8 | 9-12p | $265 | `stem` | keep |
| 15 | June 22-26 | Roblox Makers | 3-8 | 1-4p | $265 | `stem` | NEW |
| 16 | June 22-26 | CAMMP: Mathematics, Robotics and Coding | 1-6 | 9-4p | $455 | `stem` | NEW |
| 17 | June 22-26 | STEM Champions Academy | 4-8 | 9-4p | $425 | `stem` | NEW |
| 18 | June 22-26 | Theater and Improv | 2-8 | 9-4p | $400 | `performing` | keep |
| 19 | June 22-26 | Creature Features | K-1 | 9-12p | $245 | `enrichment` | NEW |
| 20 | June 22-26 | Head, Shoulders, Knees, and Toes | K | 1-4p | $245 | `enrichment` | NEW |
| 21 | June 22-26 | Tennis 101 | 3-8 | 9-12p | $315 | `sports` | keep |
| 22 | June 22-26 | P3 Soccer Lab | K only | 9-12p | $295 | `sports` | NEW |
| 23 | June 22-26 | P3 Soccer Lab | 1-6 | 9-4p | $465 | `sports` | keep |
| 24 | June 22-26 | Chemistry of Slime | 1-4 | 9-12p | $245 | `stem` | keep |
| 25 | June 22-26 | Candy Chemistry | 1-4 | 1-4p | $245 | `stem` | NEW |
| 26 | June 22-26 | Cartooning, Anime and Character Design with Procreate | 5-8 | 9-4p | $465 | `arts` | keep |
| 27 | June 29-July 2 | Minecraft Movie Makers | 3-8 | 9-12p | $255 | `stem` | NEW |
| 28 | June 29-July 2 | Pokemon Masters: Designers & 3D Makers Unite! | 3-8 | 1-4p | $255 | `stem` | NEW |
| 29 | June 29-July 2 | Running Club | 3-8 | 9-12p | $245 | `sports` | NEW |
| 30 | June 29-July 2 | Spy Academy | 1-6 | 9-12p | $235 | `enrichment` | keep |
| 31 | June 29-July 2 | Secret Agent Lab | 1-6 | 1-4p | $235 | `stem` | NEW |
| 32 | June 29-July 2 | STEM Champions Academy | 4-8 | 9-4p | $395 | `stem` | keep |
| 33 | June 29-July 2 | Cartooning, Anime and Character Design 4 Kids | 2-4 | 9-4p | $395 | `arts` | NEW |
| 34 | June 29-July 2 | Junior Journalists | K-2 | 9-12p | $275 | `enrichment` | NEW |
| 35 | June 29-July 2 | Digital Photography | K-5 | 1-4p | $275 | `arts` | NEW |
| 36 | June 29-July 2 | Kamp HUROP: Think Higher - The Level Up Leadership Lab (boys only) | 5-8 | 9-12p | $310 | `enrichment` | keep |
| 37 | June 29-July 2 | TES Academy: Middle School Math Launch | 6 | 9-12p | $235 | `academic` | keep |
| 38 | June 29-July 2 | TES Academy: Summer LEAP (1st of 3-week session) | TES 1-3 | 8:30-12p | $785 | `academic` | keep, re-labeled (D2) |
| 39 | July 6-10 | Wide World of Sports | K-6 | 9-12p | $255 | `sports` | NEW |
| 40 | July 6-10 | Wide World of Sports | K-6 | 1-4p | $255 | `sports` | NEW |
| 41 | July 6-10 | Comic Creations - Manga | 2-5 | 9-4p | $425 | `arts` | keep |
| 42 | July 6-10 | Comic Creations - Manga | 6-8 | 9-4p | $425 | `arts` | NEW |
| 43 | July 6-10 | Launch Academy | 2-6 | 9-12p | $255 | `stem` | NEW |
| 44 | July 6-10 | Rise of the Robots | 2-6 | 1-4p | $255 | `stem` | NEW |
| 45 | July 6-10 | Minecraft Designers | 3-8 | 9-12p | $265 | `stem` | NEW |
| 46 | July 6-10 | A.I. Designers & Developers | 3-8 | 1-4p | $265 | `stem` | keep |
| 47 | July 6-10 | Babysitting Bootcamp/ABC's of First Aid | 4-8 | 9-12p M-W, 9-4p Th.,        9-12p Fri. | $355 | `enrichment` | keep |
| 48 | July 6-10 | Hogwarts Express | 3-8 | 9-4p | $445 | `enrichment` | keep |
| 49 | July 6-10 | PlayTime | 3-8 | 9-12p | $275 | `performing` | NEW |
| 50 | July 6-10 | Board Game Bonanza | 3-5 | 9-12p | $245 | `enrichment` | NEW |
| 51 | July 6-10 | Board Game Bonanza | 6-8 | 1-4p | $245 | `enrichment` | NEW |
| 52 | July 6-10 | TES Academy: Math-a-Palooza - The Multi-Sensory Math Experience | 3 | 9-12p | $275 | `academic` | keep |
| 53 | July 6-10 | TES Academy: Middle School Math Launch | 7 | 9-12p | $275 | `academic` | NEW |
| 54 | July 6-10 | TES Academy: Middle School Math Launch | 8 | 9-12p | $275 | `academic` | NEW |
| 55 | July 13-17 | Artists in Action | 2-5 | 9-4p | $425 | `arts` | NEW |
| 56 | July 13-17 | Tinker Tank | 1-5 | 9-12p | $255 | `stem` | NEW |
| 57 | July 13-17 | The Science Lab | 1-5 | 1-4p | $255 | `stem` | NEW |
| 58 | July 13-17 | Drone Adventures | 3-8 | 9-12p | $275 | `stem` | keep |
| 59 | July 13-17 | Virtual Reality: The Future is Now | 3-8 | 1-4p | $275 | `stem` | NEW |
| 60 | July 13-17 | "Make It" Camp | K-5 | 9-12p | $245 | `arts` | NEW |
| 61 | July 13-17 | Guts, Goo & Gross Science | 1-4 | 1-4p | $245 | `stem` | NEW |
| 62 | July 13-17 | Master Chess Camp | K-8 | 9-12p | $255 | `enrichment` | keep |
| 63 | July 13-17 | Farm to Fork | 2-8 | 9-12p | $265 | `enrichment` | keep |
| 64 | July 13-17 | P3 Soccer Lab | K only | 9-12p | $305 | `sports` | NEW |
| 65 | July 13-17 | P3 Soccer Lab | 1-3 | 9-4p | $475 | `sports` | keep |
| 66 | July 13-17 | Musical Theatre with Ms. J-J | 3-5 | 9-12p | $255 | `performing` | keep |
| 67 | July 13-17 | Social Superheroes | K-3 | 9-12p | $285 | `enrichment` | NEW |
| 68 | July 13-17 | TES Academy: Summer Play Days (Rising TES K only) | TES K | 9-12p | $275 | `academic` | NEW |
| 69 | July 20-24 | Beats and Jams: Digital Music Creators | 3-8 | 9-12p | $255 | `stem` | NEW |
| 70 | July 20-24 | Minecraft Modders | 3-8 | 1-4p | $255 | `stem` | NEW |
| 71 | July 20-24 | Intro to Graphic Design with Canva | 4-8 | 9-4p | $465 | `arts` | NEW |
| 72 | July 20-24 | Peace of Mind Basketball Skills Camp | 4-8 | 9-12p | $255 | `sports` | NEW |
| 73 | July 20-24 | Newton's Playground | 2-6 | 9-12p | $245 | `stem` | NEW |
| 74 | July 20-24 | Crazy Chemworks | 1-6 | 1-4p | $245 | `stem` | NEW |
| 75 | July 20-24 | Musical Theatre (in a week)! | K-2 | 9-4p | $455 | `performing` | keep |
| 76 | July 20-24 | Yoga, Art, Music, Stories (YAMS) | 1-5 | 9-12p | $255 | `arts` | keep |
| 77 | July 20-24 | Yoga, Art, Music, Stories (YAMS) | 1-5 | 1-4p | $255 | `arts` | NEW |
| 78 | July 20-24 | Miniature Makers | 2-5 | 9-4p | $455 | `arts` | NEW |
| 79 | July 20-24 | Queen City Quest - Unleashed! | 1-6 | 9-12p | $275 | `enrichment` | keep |
| 80 | July 20-24 | Queen City Quest - Unleashed! | 1-6 | 1-4p | $275 | `enrichment` | NEW |
| 81 | July 20-24 | Camp Independence - The Next Level! | 4-5 | 9-4p M-Tu | $525 | `sports` | keep |
| 82 | July 20-24 | Camp Independence Sr. - The Experience! | 6-8 | 9-4p M-Tu | $595 | `sports` | keep |
| 83 | July 20-24 | TES Academy: Fun with Numbers Camp: Building Blocks of Math and More! | TES 1-2 | 9-12p | $275 | `academic` | keep |

## Files touched

| File | Change |
|---|---|
| `source-material/summer-programs/trinity-episcopal/Trinity Episcopal School - Summer Programs - Wildcat Summer Camp Catalog.md` | edit (during planning): appended the school's camp-descriptions document, with provenance and counts; corrected the Mad Science and TES Academy notes in place |
| `.claude/docs/…`, `src/data/schools.json`, `src/content/summer-programs/trinity-episcopal.json` | regenerated by ingest |
| `src/data/summer/trinity-episcopal.ts` | 49 new rows, 34 reordered, 5 edited, two headlines reworded, header comment rewritten |
| `src/components/SummerPrograms.tsx` | row key adds `gradeLabel` and `weeks` (one line plus comment) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` if it changes |
| `src/data/overlays/work/summer-programs.<lang>.json`, `src/data/overlays/summer-programs.<lang>.json` (9 locales) | Phase 2 splice and rebuild |
| `.claude/plans/trinitycamps.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` clean (trust `tsc -b`, not `tsc --noEmit`).
- [ ] `trinityEpiscopal.catalog!.camps.length === 83`, with categories stem 26, arts 16,
      enrichment 16, sports 13, academic 8, performing 4 (= the worklist).
- [ ] Duplicate row keys across every school's catalog: **0** (step 5).
- [ ] Every new `desc` passes the plain-language hook (≤30 words a sentence, no jargon), and
      `npm run check:spelling` passes.
- [ ] `npm run build` exits 0.
- [ ] Browser check, step 7: "83 of 83 camps", every chip non-empty, Manga 2 rows, Math
      Launch 3 rows, LEAP once, no key warning in dev.
- [ ] `npm run audit:mobile` passes (320/360/390px, every card open).

### Phase 2 — Locales

- [ ] `npm run build` exits **0**, including `check:live` and `check:runtime`.
- [ ] Diff each work file against `main`: exactly the stamps measured in step 9 changed, all
      of them Trinity.
- [ ] `npm run check:sepdrift -- --lang <code>` for all nine: 0. `npm run check:digits`:
      review every finding. `check:dates`, `check:money`, `check:moneytext`,
      `check:currency`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`, `check:script`:
      clean. `python3 scripts/check_figures.py --lang <code> --topic summer-programs` for
      each locale.
- [ ] `npm run check:work` (integrity: prose in the right language).
- [ ] 0 duplicate `at` paths in every rebuilt overlay.
- [ ] Browser: open the card in `es`, `fa` and `hi`. Confirm "83 de 83" or the locale's
      equivalent, that a sample of new descriptions is translated rather than English, that
      LEAP's range reads left to right in `fa`, and that `npm run audit:daterender` reports
      no new English date on this card.

## Risks

| Risk | Mitigation |
|---|---|
| Reordering the 34 rows shifts every `at` path, so translations attach to the wrong row | Splice by stamp only (step 9). `check:live` gate 2 and `check:runtime` catch a stale stamp |
| A new description invents a detail the school did not publish | Paraphrase only from the verbatim section. The user reviews all 49 at the Phase 1 stop |
| Key collision in another school's catalog after the change | Step 5 asserts 0 duplicates across every catalog |
| A category chip ends up empty or wrong | The browser check clicks every chip |

## Open questions

- **Summer LEAP as one row (D2), giving 83 rows rather than the grid's 85.** — **default:**
  one row. The user asked for "all 85". Ask at the Phase 1 stop if it reads wrong. The
  alternative is two extra rows priced as "included", with a translated label for that
  word.
- **Four more shipped descs rewritten at the user's review (2026-11-15).** Each was a
  claim about the whole slate that the full list made false or unclear:
  - Babysitting Bootcamp was called "the only camp with a mixed daily schedule", but both
    Camp Independence rows also mix their days.
  - Theater and Improv and Farm to Fork were each "one of the three widest grade bands",
    but the two Wide World of Sports rows (K-6) are as wide.
  - Hogwarts Express said its week "carries 17 camps", the grid's count with LEAP week 2,
    where the table shows 16 rows. It now says "the busiest week of the summer", which
    is true either way.
  Each new desc is paraphrased from the school's own description. That brings Phase 2's
  stale stamps to 11 per locale.
