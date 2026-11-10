---
name: latinnotify
title: Charlotte Latin admissions freshness — publish the two notification days and the sibling deadline, relabel the research note to entry-year cycles
status: implemented
phases: 2
created: 2026-11-10
branch: feat/latinnotify
prs: [470]
---

# Charlotte Latin admissions — notification days

## Goal

Charlotte Latin's Application Process page now publishes **notification days**: February 26
for TK/K and April 9 for Grades 1–11. Financial-aid award decisions come the same day. The
Latin admissions guide says the opposite: that no decision date is published for any band.
It tells parents to "Confirm the decision and contract dates with admissions".

This plan gives Latin the same decision tile, final step and cross-band row as Country Day,
Providence Day and Charlotte Christian. It adds one sentence about the earlier sibling
deadline, and relabels the research note's cycle names to the entry-year convention. It is
done when a parent on any Latin band sees their notification day, sees that no contract
date is published, and the guide no longer says decisions are unpublished.

## Context

- **The card:** `src/data/admissionsPrograms/charlotte-latin.ts` (export `charlotteLatin`).
  It has four bands: `tkk` (TK / Kindergarten), `ls` (Grades 1–5), `ms` (Grades 6–8) and
  `us` (Grades 9–12). Its header comment calls the absence of decision and contract dates
  "THE DEFINING STRUCTURAL FACT". Consequence 1 says: "Do not add a decision or contract
  step, tile or comparison cell to any band here." The data now overturns that rule, and
  the user retired it on 2026-11-10 (see Decisions).
- **Where the absence is stated today.** Every one of these must change:
  - each band's `checklistCallout.text` ends "No decision date and no enrollment contract
    date are published for any band. Confirm both with the admissions office." The `us`
    band ends "…Confirm both with the office.";
  - each band's **last** `checklistRows` entry is `{ action: 'Confirm the decision and
    contract dates with admissions', detail: 'Neither is published for any band. Ask when
    you should expect to hear.', due: 'Confirm' }`;
  - `comparison.rows[6]` (`label: 'Decision and contract'`) has one `all` cell stating
    the absence;
  - `checklist.disclaimer`: "Those items include every decision and enrollment contract
    date.";
  - header comments: the DEFINING STRUCTURAL FACT block, "THREE DEADLINE TILES IN THE TWO
    LOWER BANDS", the `ls` "TWO tiles, and deliberately not three" comment, the ROLLING
    ADMISSIONS block ("no fixed common notification date is published for this cycle"),
    THE NEST block (sibling), the watchOuts block ("the absent decision and contract
    dates"), and the NOT-PUBLISHED register list.
- **The model to mirror** is the decision step at the end of the other CAIS schools'
  bands:
  - Providence Day (`providence-day.ts`): a tile `{ value: 'Feb 26, 2027', label:
    'decisions release, 4:00 p.m.' }`, a final step `title: 'Decision → contract + deposit'`
    with `tag: 'Feb 26 → Mar 5'`, a checklist row `{ action: 'Watch for the decision',
    detail: …, due: 'Feb 26, 2027' }`, and a comparison row `label: 'Decision & contract'`
    with per-band cells;
  - Country Day: tiles `'decisions released'` and steps `'Decision → contract + deposit'`;
  - Charlotte Christian: tiles `'decision posted — 4 p.m.'` and steps `'Decision → contract'`.

  Latin publishes **no time** and **no contract date**, so its step is titled
  `'Decision'`, not "Decision → contract".
- **The current tiles are not chronological** (`tkk`: Jan 2, Oct 10, Jan 15). `ls` has 2
  tiles, and `ms`/`us` have 4. The strip is `repeat(auto-fit, minmax(150px, 1fr))`, so 3, 4
  or 5 tiles all lay out.
- **Each band's last step today is "Apply for financial aid, if you need it".**
  Appending the decision step *after* it keeps every existing step index unchanged, which
  matters for Phase 2 (see Risks).
- **i18n:** `guide.bands[].deadlines[].value` is promoted to prose in
  `scripts/i18n_fields.mjs:615`, so tile dates are extracted and translated like the other
  schools'. Admissions research content (`src/content/admissions/*.json`) is **not**
  translated. Only `financial-aid-tuition` has a content overlay. Re-ingesting therefore
  touches no locale file.
- **Ingest safety:** `src/lib/metrics.ts` `RULES.admissions` is a single catch-all
  (`/.*/` → `redesign-research`). A new admissions research file cannot slugify into an
  orphan card.
- **Cycle convention** (user decision 2026-11-10, memory `cycle-label-is-entry-year`): a
  cycle is labeled by the school year the child **enters**. These dates are the
  **2027–28 entry cycle** (fall 2027), and the card already says so after #469. The
  research note still uses apply-year labels.

## Decisions

- **Mirror the other CAIS schools** (user, 2026-11-10). In every band, add a decision
  deadline tile and a final `Decision` step. Replace the last checklist row with
  "Watch for your notification day", and give `comparison.rows[6]` per-band cells. The
  header's "do not add a decision step" rule is retired and rewritten. Its reason (no
  published date) no longer holds.
- **Mention the sibling deadline on the card** (user, 2026-11-10). Add one sentence to
  each band's existing "Complete the application" step. Add no new step, tile or row.
- **Show the year as 2027** (`Feb 26, 2027`, `Apr 9, 2027`), even though the
  "Important Admissions and Financial Aid Dates" block states no year. The same block's
  "January 2: TK and K applications due" is the page's "January 2, 2027 - Application due",
  every other date on the page is 2027, and both days match the other CAIS schools' 2027
  notification dates. Record the inference in the header comment and the research file,
  and never in parent-facing prose.
- **Grade 12 is not covered.** The school says "Grades 1-11 notification day". The `us`
  band (9–12) shows Apr 9 for Grades 9–11, and says nothing is published for Grade 12. This
  matches how the band already handles the Grade 12 assessment.
- **No contract or deposit date is published.** Say so in the new step, and keep a "confirm
  with admissions" for it. The $2,500 deposit stays in `aid`, as now.
- **Financial-aid award decisions come on the same notification day.** Add this to each
  band's existing aid step, to `aid.text` and to `checklist.aidPanel.items[2]`.
- **The past sibling date is shown as past:** "K-12 sibling applications were due October
  15, 2026". For `tkk`, the school's listing says "K-12", so do not claim it covers TK.
- **`stats` (the three page-top tiles) unchanged.** They are deadlines, not decisions.
- **Append, never insert mid-array.** New tiles go at the end of `deadlines`, new steps at
  the end of `steps`, and the checklist row is replaced in place (same index). This keeps
  every existing overlay path valid (memory `metric-values-midarray-insert-shifts-paths`).

## Approvals needed

**Given 2026-11-10.** The user chose "Mirror the others": new decision tiles and steps in
existing cards, and a reshaped comparison row. They also chose "Mention it on the card" for
the sibling deadline. No new card, section, topic or Compare row is involved.

## Source material

- `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Live Dates Check 2026-11-10.md`:
  **written during planning, uncommitted, not ingested.** It holds verbatim quotes from
  https://www.charlottelatin.org/admissions/application-process and
  https://www.charlottelatin.org/admissions, fetched as raw HTML on 2026-11-10: the
  notification-days block, the Oct 15 sibling calendar entry, and the landing page's
  "Applications for the 2026–27 school year" wording.
- `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Grade-by-Grade Application Plans.md`:
  existing; **edited by this plan** (Step 2).

## Out of scope

- Other schools' admissions data, and re-verifying Latin's other dates (they matched on
  2026-11-10).
- Latin tuition, aid amounts and other research areas.
- The landing page's "2026–27 school year" wording, which is the school's apply-year label.
  The card already uses entry-year labels.
- Any component, layout or styling change.
- Deploying.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout -b feat/latinnotify` from an up-to-date `main`. Commit the
   staged live-check file first, staging that path only.
2. **Update the research note.** Edit
   `Charlotte Latin - Admissions - Grade-by-Grade Application Plans.md`:
   - **Relabel cycles to entry year** where they name the admissions cycle:
     - line 11 "**Cycle:** 2026–27 entry" → "**Cycle:** 2027–28 entry (fall 2027; the
       school's own pages call it 2026–27, the apply year)";
     - line 16 "carries 2026–27-cycle content" → "carries 2027–28-entry-cycle content";
     - line 23 "dates for 2026–27 entry" → "dates for 2027–28 entry";
     - line 26 → "**Next cycle (fall 2028 entry, 2028–29): no dates published yet**
       (re-checked 2026-11-10).";
     - line 48 "confirmed 2026–27 policy" → "confirmed 2027–28-entry policy";
     - line 191 "**For 2026–27 entry**" → "**For 2027–28 entry**";
     - line 295 "the current (2026–27) cycle" → "the current (2027–28 entry) cycle".

     Leave "Tuition (2026–27)" at line 248 alone: that is the school year.
   - **Supersede the "defining structural fact" section** (line ~31). Add an "Update
     2026-11-10" paragraph saying notification days are now published, quoting the two
     lines, and that no contract date is published still. Point to the live-check file.
     Update lines ~212–214 (the fixed notification date "NOT PUBLISHED") and ~296 (the
     not-published list) to match. Do not delete the original 2026-08-31 text; mark it
     superseded.
3. **Ingest.** Run the `ingest-source-material` skill for `admissions/charlotte-latin`.
   Expect `src/content/admissions/charlotte-latin.json` and the `.claude/docs/` note to
   regenerate. If `schools.json` reorders, restore `HEAD` order (memory
   `two-topic-ingest-reorders-manifest`). `npm run check:metrics` should add no new
   ⚠️ entries.
4. **Card: header comments** in `charlotte-latin.ts`:
   - Rewrite the DEFINING STRUCTURAL FACT block as "NOTIFICATION DAYS PUBLISHED; NO
     CONTRACT DATE". Quote the two lines and record the year inference and the Grade 12
     gap. Record that the 2026-08-31 "no decision step" rule was retired 2026-11-10 by
     user decision. Keep consequence 2 (the deposit stays in `aid`).
   - Update the tile-count comments: `tkk` 3 → 4, `ls` 2 → 3, `ms`/`us` 4 → 5.
   - ROLLING ADMISSIONS: replace "no fixed common notification date is published for
     this cycle" with "a fixed notification day is now published". The prior-cycle
     rolling blog still does not ship.
   - THE NEST: add that the calendar lists a separate K-12 sibling application deadline
     (Oct 15, 2026), and that no sibling *preference* is published.
   - The watchOuts block and the NOT-PUBLISHED register: drop "decision" and keep
     "contract".
5. **Card: tiles.** Append to `deadlines`:
   - `tkk`: `{ value: 'Feb 26, 2027', label: 'notification day' }`;
   - `ls`, `ms`, `us`: `{ value: 'Apr 9, 2027', label: 'notification day' }`;
   - `us` only: `label: 'notification day — Grades 9–11'`.
6. **Card: decision step.** Append to each band's `steps`:
   - `tkk`: `{ title: 'Decision', tag: 'Feb 26', tagKind: 'accent', detail: … }`.
     - Detail (plain language, grade ≤10): **February 26, 2027** is the school's
       notification day for TK and Kindergarten, and financial-aid award decisions are
       communicated the same day.
     - **No enrollment contract date is published**, so confirm it with the admissions
       office.
     - Mention the $2,500 non-refundable deposit, required at enrollment (wording as in
       `aid.text`).
   - `ls`, `ms`: the same with `tag: 'Apr 9'` and **April 9, 2027**, "Grades 1-11
     notification day".
   - `us`: the same as `ms`, plus: "The school's notification day covers Grades 9–11. No
     notification date is published for Grade 12, so a Grade 12 family should ask the
     admissions office."
   - Quote the school's phrase where useful ("TK and K notification day"), and keep
     `**bold**` on the date.
7. **Card: sibling sentence.** Append one sentence to each band's "Complete the
   application" step:
   - `ls`/`ms`/`us`: "Siblings of current students had an earlier deadline: the school's
     calendar listed **K-12 sibling applications due October 15, 2026**. If you are a
     sibling family applying now, ask the admissions office."
   - `tkk`: the same, plus "The listing says K-12, so it does not say whether it covers
     TK."
8. **Card: aid steps.** In each band's "Apply for financial aid, if you need it" step,
   add "Award decisions are communicated on your notification day (February 26 / April
   9)", with each band's own date.
   - In `aid.text`: one sentence giving both days: "February 26 for TK and Kindergarten,
     April 9 for Grades 1–11".
   - In `checklist.aidPanel.items[2]`: add the same.
9. **Card: checklist rows.** Replace each band's last row **in place**:
   - `{ action: 'Watch for your notification day', detail: 'Admission and financial-aid
     decisions are communicated that day. No contract date is published; confirm it with
     admissions.', due: 'Feb 26, 2027' }` (`tkk`) or `'Apr 9, 2027'`;
   - `us` detail adds "Grades 9–11; nothing is published for Grade 12."
10. **Card: callouts.** In each band's `checklistCallout.text`, replace the final "No
    decision date … Confirm both …" sentences with "Decisions come on notification day,
    <date>. No enrollment contract date is published, so confirm it with the admissions
    office." For `us`, add the Grade 12 gap.
11. **Card: comparison row 6.** Keep `label: 'Decision and contract'`, and replace the
    `all` cell with per-band cells:
    - `tkk: 'Feb 26, 2027 · no contract date published'`;
    - `ls` and `ms: 'Apr 9, 2027 · no contract date published'`;
    - `us: 'Apr 9, 2027 (Gr 9–11) · nothing published for Gr 12 · no contract date published'`.
12. **Card: spine, disclaimer, sources.**
    - `spineNote`: "the same four steps" → five, adding "→ hear on notification day"
      after "meet the deadlines". Keep the "First:/Then:" chain style if it splits (plan
      `plainadmissions` precedent).
    - `checklist.disclaimer`: "Those items include every decision and enrollment
      contract date." → "Those items include the enrollment contract date.", and
      "(retrieved Aug 2026)" → "(retrieved Aug 2026; dates rechecked Nov 2026)".
    - `sources[0].label`: add "the notification days and the K-12 sibling deadline".
13. **Plain language.** The hook runs on each edit. Every changed unit must pass (≤30-word
    sentences, grade ≤10, American spelling). Then
    `node scripts/check_plain_language.mjs --file src/data/admissionsPrograms/charlotte-latin.ts`
    must report `clean`.
14. **Verify** (Phase 1 below). Commit the English with explicit paths: the TS file, the
    two research files, the regenerated `src/content/…` and `.claude/docs/…`, and this
    plan. Set `status: english-done` and the INDEX row to *English shipped*. Push, then
    check `git rev-parse HEAD` against `git ls-remote origin feat/latinnotify`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
`admissions` overlay topic only. No chrome catalogs: no new UI keys. The mechanism is in
`.claude/docs/prose-translation-architecture.md`. Repeat the method from the
`plainadmissions` Phase 2 notes, which worked cleanly.

1. **Snapshot** `git show main:src/data/overlays/work/admissions.<lang>.json` per locale
   into the scratchpad.
2. **Splice:** `node scripts/i18n_splice_work.mjs --lang <code> --topic admissions` ×9.
   Record kept / added / dropped. Expect **added > dropped**, since the new tiles, steps and
   comparison cells have no predecessor.
3. **Pair and translate.**
   - **Revised units:** an added unit with a dropped predecessor at the same `at`. Revise
     the reviewed `t`, keeping its terms and date forms.
   - **New units:** no predecessor. Translate fresh, reusing each locale's existing
     rendering of the same phrase from the other CAIS schools: their "Watch for the
     decision" rows and "Decision → contract" steps, and "notification day" if present.
     grep the work file first.
   - Use nine parallel `general-purpose` subagents, each with its own scratch folder,
     task file and output file (memory `parallel-locale-agents-collide`).
   - Apply through a gate that checks: the digit-token multiset, the `**` count, no bidi
     controls, Western digits, `t` ≠ English, the 0.4–2.5 length ratio, and no English
     month or weekday outside a quote the English quotes.
4. **Rebuild:** `node scripts/i18n_build_overlay.mjs --topic admissions --lang <code>` ×9.
5. **Verify by stamp:** every kept stamp's `text` and `t` are byte-identical to the
   snapshot, every new stamp is non-blank, ×9. `check_work_integrity` false-positives
   after a splice (memory `comparerows-shipped`).
6. **Checks** (Phase 2 below). Then:
   - write Implementation notes;
   - set `status: implemented`, `prs: [<n>]` and the INDEX row;
   - open the PR (`--body-file`) and squash-merge;
   - `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/admissionsPrograms/charlotte-latin.ts` | edit: header comments, 4 tiles, 4 steps, sibling + aid sentences, 4 checklist rows, 4 callouts, comparison row 6, spineNote, disclaimer, sources[0] |
| `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Live Dates Check 2026-11-10.md` | new (written while planning) |
| `source-material/admissions/charlotte-latin/Charlotte Latin - Admissions - Grade-by-Grade Application Plans.md` | edit: entry-year relabel; superseded not-published notes |
| `src/content/admissions/charlotte-latin.json`, `.claude/docs/…` admissions note | regenerated by ingest |
| `src/data/overlays/work/admissions.<9>.json`, `src/data/overlays/admissions.<9>.json` | Phase 2: spliced, translated, rebuilt |
| `.claude/plans/latinnotify.md`, `.claude/plans/INDEX.md` | status, notes |

No component, locale catalog, `metrics.ts` or `metricValues.ts` change. Admissions is not
on Compare.

## Verification

### Phase 1 — English

- [ ] `node scripts/check_plain_language.mjs --file src/data/admissionsPrograms/charlotte-latin.ts`: `clean`.
- [ ] `grep -n "No decision date\|Confirm the decision\|every decision and" src/data/admissionsPrograms/charlotte-latin.ts`
      returns nothing in data. It may still match in a comment that records the history.
- [ ] Every date matches its source char-for-char: `Feb 26, 2027`, `Apr 9, 2027`,
      `October 15, 2026`. No new date appears beyond these three.
- [ ] `npx tsc -b`, then `npm run build`. The build is green **except** `check:live`,
      which is expected to report stale `admissions` stamps for the changed Latin units
      only. Record the count; it is Phase 2's input. Confirm that no other topic appears.
- [ ] `npm run check:metrics`: no new ⚠️ entries.
- [ ] `npm run schema && npm run check:schema`: no drift expected. Commit the doc if it
      drifts.
- [ ] `node scripts/gen_admissions_report.mjs --school charlotte-latin` exits 0. It
      renders the podcast report from the card, and its no-`**` assertion must hold.
- [ ] **Browser** (headed Chrome via Playwright; `npm run build && npx vite preview`;
      probe with `textContent`, not `innerText`; no `networkidle`):
  - On `/school/charlotte-latin/?topic=admissions`, click each of the 4 bands. Confirm
    the new tile, the final `Decision` step, the sibling sentence, and the per-band
    comparison cells.
  - Confirm no literal `**` on the page.
  - Open `/school/charlotte-latin/admissions-checklist/?band=tkk|ls|ms|us`. Confirm the
    last row reads "Watch for your notification day" with the right date, and the
    callout no longer says decisions are unpublished.
  - Check 390px width with each band open: no page overflow (5 tiles in `ms`/`us`).

### Phase 2 — Locales

- [ ] `npm run check:live && npm run check:runtime`: clean.
- [ ] `npm run check:digits`: 0 to review on new units.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>` and
      `python3 scripts/check_figures.py --topic admissions --lang <code>`.
- [ ] `npm run check:dates`, `check:moneytext`, `check:fr`, `check:hi`, `check:fa` and
      `check:bidi` pass.
- [ ] Per locale: `npm run i18n:leaks -- --lang <code>`. It prints `at` **paths**, not
      stamps, so match its flags against the changed Latin paths. Expect 0 there.
- [ ] By-stamp integrity against the snapshot ×9 (Phase 2 step 5).
- [ ] `npm run build`: green end to end.
- [ ] Browser in `es`, `fa`, `hi` (`?lang=`): every changed Latin unit renders
      translated, with no English leftover. Probe the admissions section only; a school
      page renders every topic.

## Risks

| Risk | Mitigation |
|---|---|
| Inserting a tile or step mid-array shifts overlay paths for every later item | Append only; replace the checklist row in place (Decisions) |
| The 2027 year is inferred, not stated by the school | It is the only reading consistent with the page. It is recorded in the header and the research file, and never shown as uncertain to parents |
| A reviewer later "restores" the retired no-decision-step rule from history | The header records the retirement with date and reason |
| 5 tiles in `ms`/`us` crowd at phone width | Auto-fit grid; checked at 390px in Phase 1 |

## Open questions

- Should the decision tile mention that financial-aid awards come the same day? —
  **default:** no. Keep the tile label short ("notification day") and say it in the step
  and the aid step.

## Implementation notes

### Phase 1 (2026-11-10)

- **Research note relabeled** to entry-year cycles. Its "Next cycle" line now reads
  "fall 2028 entry, 2028–29", re-checked 2026-11-10. The 2026-08-31 no-decision section is
  marked SUPERSEDED, with a dated update quoting the two notification lines. The timeline
  gains the Feb 26 / Apr 9 / Oct 15 sibling entries. "Tuition (2026–27)" is unchanged.
- **Ingest:** `build_docs.py admissions` + `build_site_content.py`.
  - The seven other admissions notes changed only their "Rebuilt" date, so they were
    restored.
  - `schools.json` came back reordered (the known ingest quirk). It was rebuilt in `HEAD`
    order with just the one new document and Latin's `doc_count` 1 → 2.
  - `check:metrics` reports no new Latin finding. Its existing findings (the uningested
    `_shared` glossary, and 5 schools with no admissions research) predate this plan.
  - `check:schema` drifted on the document count only (558 → 559), so `npm run schema`
    was run.
- **Card edits:**
  - every band: an appended notification-day tile, a final `Decision` step, the sibling
    sentence, the aid-step award sentence, and a "Watch for your notification day" row
    (replaced in place);
  - every callout's last sentences;
  - comparison row 6, now per-band cells;
  - `aid.text`, `aidPanel.items[2]`, `spineNote` (five steps, "First: … Then: …"),
    `disclaimer` and `sources[0]`.

  Tile counts are now tkk 4 / ls 3 / ms 5 / us 5.
- **Deviation:** the disclaimer said 'Items marked "confirm" are…'. No checklist row is
  marked "Confirm" anymore, so the sentence now reads "Some items, such as the
  enrollment contract date, are shown only inside the application portal or are not
  published at all."
- **Checks:**
  - plain-language hook: `clean`;
  - `npx tsc -b` and `npx vite build` pass;
  - `check:schema`, `spelling`, `chrome`, `runtime`, `moneytext`, `dates`, `spans` and
    `schoolurls` are green;
  - `gen_admissions_report.mjs --school charlotte-latin` exits 0;
  - `check:live` reports **19 stale stamps per locale, all `admissions`**. That is Phase
    2's revise set. The new tiles, steps and cells add further units with no predecessor.
- **Browser** (headed Chrome, `vite preview`, all 4 bands, every `<details>` open, all 4
  checklist pages):
  - all the new text renders;
  - no stale "No decision date" or "Confirm the decision" text remains;
  - no literal `**`;
  - 390px `scrollWidth` is 375 in every band, including the 5-tile ones.

### Phase 2 (2026-11-10)

- **Approval:** "The English page is approved."
- **Splice:** 1103 kept / 30 added / 19 dropped per locale.
  - 19 added units were paired 1:1 by `at` with their predecessor. Each predecessor's
    reviewed `t` was revised.
  - 11 units are new, with no predecessor: 2 tiles, the decision steps' titles, tags and
    details, and 3 comparison cells. They were translated fresh, with each locale's
    reviewed decision and contract wording from the other CAIS schools given as
    references.
  - The `ms` decision step and cell share stamps with `ls`, so they need no new units.
- **Translation:** nine parallel agents, gated before apply (digit tokens, `**`, bidi,
  digit script, `t` ≠ English, ratio, English month/weekday). All nine had 0 problems.
  - Each locale used one consistent "notification day" term: es «día de notificación»,
    fr « jour de notification », it «giorno degli esiti», ht «jou anons», hi सूचना दिवस,
    bn সিদ্ধান্ত জানানোর দিন, te ఫలితాల ప్రకటన రోజు, fa روز اعلام نتایج,
    ar يوم إعلان القرارات.
  - Each locale's existing guillemets were used for the school quotes.
- **Worth a native speaker's look:** the sibling-family sentence (new wording in every
  locale, no reviewed predecessor). Also the first-person "we rechecked" that ht and te
  used in the disclaimer, where the English is passive.
- **Checks:**
  - by-stamp integrity: 1103 kept byte-identical / 30 new / 0 blank, ×9;
  - `check:live` ✓ and `check:runtime` ✓;
  - `check:digits`: 270 units compared · 0 to review;
  - `check:sepdrift`: 0 drifted ×9, and `check_figures` intact ×9;
  - `check:dates`, `moneytext`, `fr`, `hi`, `fa` and `bidi` pass;
  - `i18n:leaks`: 0 flags on the 44 changed paths ×9;
  - `npm run build`: green.
- **Browser** (es, fa, hi; every band, every `<details>` open, all 4 checklist pages):
  every changed unit renders translated (25/25, 25/25 and 24/24; units that are figures
  only were not probed), with 0 English leftovers and no literal `**`.
