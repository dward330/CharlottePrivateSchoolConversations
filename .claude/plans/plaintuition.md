---
name: plaintuition
title: Plain-language rewrite of the visible financial-aid-tuition content paragraphs (Prep's Tuition History note, and the "derived arithmetic" research-bookkeeping sentence in Cannon, Country Day and Davidson Day), via source-material and re-ingest, then all nine locales through the content overlay
status: implemented
phases: 2
created: 2026-11-10
branch: feat/plaintuition
prs: [473]
---

# Plain-language rewrite — Financial Aid content blocks

## Goal

Finish the Financial Aid area's plain-language pass. [`plainaid`](plainaid.md) (#471,
#472) rewrote the structured report in `src/data/financialAidReports.ts`. It left the
**live `src/content` prose cards** beside the report, such as Tuition History, for a
separate plan. Its "Candidates" record why: the fix goes through a different pipeline.

This plan fixes the paragraphs from those cards that a parent actually sees and that
fall short of the standard in `CLAUDE.md`:

- **charlotte-prep "Tuition History"**: one paragraph at grade 10.4.
- **The year-over-year paragraph in three schools.** Each opens with the same sentence:
  "These percentages are derived arithmetic from the sourced dollar figures and are
  clearly labeled as such; the dollar figures themselves are all directly sourced."
  That is research bookkeeping about our own method, shown to parents (the dev-only
  rule, CLAUDE.md "Research bookkeeping is dev-only"). Davidson Day's copy also sits at
  grade 10.1.

It worked when:

- the four paragraphs are rewritten in their `source-material/` files;
- after re-ingest, the rendered blocks are at grade ≤10 with no sentence over 30 words;
- every figure, percentage and school year is unchanged, and the shared opening
  sentence reads identically in all three schools;
- the user approved the English;
- all nine prose locales carry translations through the content overlay, and
  `npm run build` is green.

**Two-phase.** The plan changes prose a parent reads, so Phase 1 is English only and
stops for review. Phase 2 translates.

## Context

### The blocks (measured 2026-11-10, after #472)

Run over the 45 blocks in `src/data/overlays/work/financial-aid-tuition.content.es.json`,
the real `analyze` flags 6 blocks. A browser check after #471 (headed Chrome, every
`<details>` open, `?lang=en`) found that **4 never render**. The provenance filters in
`src/lib/prose.ts` drop them: `PROVENANCE_LEADIN`, `PROVENANCE_CAPTURED_HEADING` and
`PROVENANCE_YEAR_PINNING`. Those 4 are Cannon's and Davidson Day's Wayback quote lists,
Cannon's "Related detail…" and Covenant's year-pinning note. They are **out of scope**:
nobody reads them.

The two blocks that render:

| School | Subtopic (heading) | Grade | Text |
|---|---|--:|---|
| charlotte-prep | Tuition History, under "### Montessori Early School, morning and school-day programs" | 10.4 | "Until 2024–25 the Early School also sold year-round and school-year extended-day versions at a single all-in price. For 2026–27 the school instead sells the school-year program plus a separate Extended Day add-on, and no year-round option is listed." |
| davidson-day | "Year-over-year increases (computed from the published figures above, for reference only)" | 10.1 | "These percentages are derived arithmetic from the sourced dollar figures and are clearly labeled as such; the dollar figures themselves are all directly sourced. Davidson Day has held very close to a flat ~4.5% annual increase since 2023–24." |

**The same bookkeeping sentence appears in two more schools**, in the same "Year-over-year
increases…" section. Those blocks are under grade 10, so they were not flagged. They are
in scope anyway: the defect is the content, and the opening sentence must read the same
in all three.
- **cannon**: "These percentages are derived arithmetic … directly sourced. Note the
  unusually large 2022–23 → 2023–24 jump in the upper three bands."
- **charlotte-country-day**: "These percentages are derived arithmetic … directly
  sourced." (the shared sentence alone)

**Step 1 must browser-confirm that the Cannon and Country Day paragraphs render.** Only
Davidson Day's was checked. Expected: yes, because the same section shape renders for
Davidson Day.

### Where the text lives

Each paragraph is written in a research note and copied into the app by ingest:

| School | Source file |
|---|---|
| charlotte-prep | `source-material/financial-aid-tuition/charlotte-prep/Charlotte Preparatory School - Financial Aid and Tuition - Tuition History.md` (line ~50) |
| davidson-day | `source-material/financial-aid-tuition/davidson-day/Davidson Day - Financial Aid and Tuition - Tuition History.md` ("## Year-over-year increases…", line ~134) |
| cannon | `source-material/financial-aid-tuition/cannon/Cannon - Financial Aid and Tuition - Tuition History.md` (line ~81) |
| charlotte-country-day | `source-material/financial-aid-tuition/charlotte-country-day/Charlotte Country Day - Financial Aid and Tuition - Tuition History.md` (line ~80) |

The pipeline is: `.claude/skills/ingest-source-material/build_docs.py`, which writes the
`.claude/docs/` notes and `src/data/schools.json`, then `scripts/build_site_content.py`,
which writes `src/content/financial-aid-tuition/<slug>.json`. The paragraphs are
hard-wrapped in the `.md` files (Cannon, CCD and DD wrap at ~90 columns). Ingest joins
the lines, so a rewrite can be wrapped or not.

**Known ingest noise** (memories `two-topic-ingest-reorders-manifest` and
`latinnotify-shipped`; recorded in plainadmissions and latinnotify):
- `build_docs.py` rewrites the "Rebuilt <date>" line in every school's
  `.claude/docs/<topic>/<slug>.md` it touches. Restore the files whose only change is
  that date.
- It can reorder `src/data/schools.json`. Rebuild the file in `HEAD` order, so the diff
  holds only real changes.
- Run it for **this topic only**: `python3 .claude/skills/ingest-source-material/build_docs.py financial-aid-tuition`.

### The renderer drops research-voice sentences — the rewrite must not trip it

`src/lib/prose.ts` strips, sentence by sentence, any sentence matching `SELF_REF`:
`th(is|e) (\w+ ){0,2}(pass|dossier|series|file|report|research)`. A rewrite that says
"this report" or "the research" **disappears from the page** with no error. Say "this
site", or name the school. The heading filters (`PROVENANCE_*`) match headings only, and
the headings are not changed (Out of scope).

### How these blocks are translated (different from `src/data`)

The architecture is described in `.claude/docs/prose-translation-architecture.md` §6,
"Stage 8 — translating `src/content`":
- **Work files:** `src/data/overlays/work/financial-aid-tuition.content.<lang>.json`, with
  `{ topic, lang, sections: [{ of, subtopic, kind?, at: ["<slug>:<subtopic>"], text, t }] }`.
  **Keyed by a hash of the block's English** (`of`), not by path. The unit is a
  blank-line-separated block of a section's markdown.
- **Extractor:** `node scripts/i18n_extract_content.mjs --topic financial-aid-tuition --lang <code>`.
  It **carries over** every existing `t` whose hash still exists, and writes `t: ''` for
  a changed block. The old block's entry is **gone** from the work file afterwards, so
  snapshot first: its `t` is the reviewed predecessor.
- **Builder:** `node scripts/i18n_build_content_overlay.mjs --topic financial-aid-tuition --lang <code>`
  writes `src/data/overlays/financial-aid-tuition.content.<lang>.json` (`{ topic, lang,
  blocks: { <hash>: <t> } }`, 45 blocks today).
- **`check:live` verifies this overlay through `FOREIGN_TOPICS`:**
  - gate 2 needs every shipped hash to reproduce from a fresh extract of
    `src/content/**`, so it **fails in Phase 1 by design** once the English changes;
  - gate 3 needs each `t` to be non-empty, different from its English, and within
    0.4–2.5× its length for English of 80+ characters.

  Phase 2 makes both green.
- **No `at`-path splice script exists for this layer.** Pairing is by `at`
  (`<slug>:<subtopic>`) plus "the block whose hash disappeared". Each changed block is
  the only changed block in its subtopic, so the pairing is unambiguous. Phase 2 Step 2
  asserts that.

### Checks that read this prose

- `check:plain` reports the content blocks as area `financial-aid-tuition`, reading the
  **es work file**. Today it shows 45 units, 2 flagged, 6 at grade >10. After Phase 1's
  re-extract of `es`, the rewritten blocks show there.
- `check:spelling` does **not** walk `src/content` (by design), and the PostToolUse hook
  does not cover `source-material/`. So the rewrites are measured by Step 3's scratch
  call to the real `analyze`.
- `check:moneytext` (the work files), `check:dates`, `check:digits` and
  `check_figures.py --topic financial-aid-tuition` all cover the translations.

## Decisions

- **Scope is four paragraphs**, Prep's plus the three year-over-year paragraphs. The
  hidden 4 blocks, every heading and every table stay as they are.
- **The shared opening sentence is rewritten once, identically.** Suggested wording,
  which keeps the meaning (the percentages are ours, worked out from figures the school
  publishes) without the method talk: "**The school does not publish these percentages.
  They are worked out from the tuition figures above, which the school does publish.**"
  Each school's own trailing sentence (Cannon's jump note, DD's ~4.5% note) is kept, with
  its figures char-for-char, and simplified only if a grade needs it.
- **Prep's paragraph**, suggested: "Until 2024–25, the Early School also offered
  year-round and school-year extended-day versions, each at one all-in price. For
  2026–27, the school instead offers the school-year program plus a separate Extended Day
  add-on. No year-round option is listed." The year forms (`2024–25`, `2026–27`, en dash)
  stay as written.
- **Editing `source-material/` is deliberate.** CLAUDE.md puts research records outside
  the plain-language scope, but these paragraphs are the parent-facing text the ingest
  copies verbatim. Only the four paragraphs change. Provenance headers, source lists,
  tables and `## Method` sections are untouched.
- **Translation follows plainaid's Phase 2 method:** revise the reviewed predecessor, run
  one agent per locale, and gate every output before applying. With 4 blocks there may be
  3 distinct new texts (CCD's block is the shared sentence alone). One `general-purpose`
  agent handling all nine locales is acceptable at this size. If used, it writes one
  output file per locale.

## Approvals needed

None up front. This is a wording fix to existing cards, with no card, layout or
component change. The gate is the user's English review between the phases.

## Out of scope

- The 4 hidden blocks; the section headings, including "(computed from the published
  figures above, for reference only)" and Prep's "(our calculation)". Headings map to
  card keys in `src/lib/metrics.ts` and are matched by the provenance filters, so
  renaming one can move or hide a card.
- Tables, provenance sections, source lists and other schools' research files.
- `src/data/financialAidReports.ts` (done in plainaid).
- Deploying.

## Steps

### Phase 1 — English

1. **Branch and baseline.** `git checkout -b feat/plaintuition` from an up-to-date
   `main`. Snapshot the nine content work files from `main` to the scratchpad
   (`git show main:src/data/overlays/work/financial-aid-tuition.content.<lang>.json`).
   Phase 2 pairs against these. In headed Chrome (`npm run build && npx vite preview`,
   `?lang=en` set explicitly, because the locale persists in `csc.lang`), open
   `/school/<slug>/?topic=financial-aid-tuition&lang=en` for cannon,
   charlotte-country-day, davidson-day and charlotte-prep, with every `<details>` open.
   **Confirm that all four target paragraphs render**, and record it. If Cannon's or
   CCD's does not render, drop it from scope and say so.
2. **Draft and measure.** Write the four new paragraphs to a scratch file. Measure each
   one as it will render, after the line joins, with the real
   `analyze`/`loadConfig` from `scripts/check_plain_language.mjs`. Each must be at grade
   ≤10 if it is ≥30 words, with no sentence over 30 words. Check them against:
   - **digits and figures**: the same multiset of `\d+(?:[.,:/]\d+)*` tokens, plus `~4.5%`,
     `2022–23 → 2023–24` (arrow and en dashes) and `2023–24`;
   - **no `SELF_REF` match**: test each sentence against the regex copied from
     `src/lib/prose.ts`;
   - **the shared opening sentence**, byte-identical across the three year-over-year
     paragraphs.
3. **Apply to `source-material/`.** Use exact replacement of each old paragraph, which
   is hard-wrapped, so match the lines as they appear. Refuse if the old text is not
   found exactly once.
4. **Re-ingest this topic.** `python3 .claude/skills/ingest-source-material/build_docs.py financial-aid-tuition`,
   then `python3 scripts/build_site_content.py`. Then:
   - `git status --short`; restore every file whose only change is the "Rebuilt" date;
   - if `src/data/schools.json` was reordered, rebuild it in `HEAD` order;
   - the remaining diff must be exactly the four paragraphs, in
     `src/content/financial-aid-tuition/{charlotte-prep,davidson-day,cannon,charlotte-country-day}.json`
     and their `.claude/docs/financial-aid-tuition/*.md` notes;
   - run `npm run schema` only if `check:schema` drifts (not expected: no file is added).
5. **Re-extract `es` only**, so `check:plain` measures the new text. Run
   `node scripts/i18n_extract_content.mjs --topic financial-aid-tuition --lang es`. It
   must report the carried-over count as 45 minus the changed blocks (≈41–42). Then run
   `npm run check:plain` and record the `financial-aid-tuition` row (baseline: 2 flagged,
   6 grade >10). The remaining counts must be only the 4 hidden blocks. The `es` work
   file now has blank `t` for the new blocks, and Phase 2 fills them. The other eight
   locales are re-extracted in Phase 2.
6. **Checks.** `npx tsc -b`, `npx vite build`, then
   `npm run check:schema && npm run check:spelling && npm run check:runtime && npm run check:moneytext && npm run check:dates`.
   **`check:live` is expected to fail gate 2** for exactly the changed blocks, in every
   locale. Record the count. It must name only `financial-aid-tuition.content`.
7. **Browser check (English).** Use the same four pages as Step 1, with `?lang=en`. Each
   new paragraph renders in full: compare the rendered text with the new English, to
   catch a `SELF_REF` strip. No literal `**`, and no overflow at 390px on one page.
8. **Commit and stop.** Stage explicit paths only: the four source `.md` files, the four
   `src/content` JSONs, their `.claude/docs` notes, `src/data/overlays/work/financial-aid-tuition.content.es.json`,
   this plan and `INDEX.md`. Never run `git add -A`. Push, and verify with `git rev-parse`
   against `git ls-remote`. Set `status: english-done`, and the INDEX row to
   *English shipped*. Report to the user the before/after for each paragraph, the URLs,
   and the measurements. Give the Phase 2 command.

**→ STOP. Phase 1 ends here and waits for the user's review.**

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
**`financial-aid-tuition` content overlay only**. The locale traps in the rollout docs
apply unchanged: figures char-for-char with `%` unspaced, Western digits, no bidi
controls (render-layer isolates for fa/ar), no pre-applied lakh/crore for hi/te, and
dates translated with their digits kept.

1. **Re-extract the other eight locales** with
   `node scripts/i18n_extract_content.mjs --topic financial-aid-tuition --lang <code>`.
   Each must carry over the same count as `es` did in Phase 1 Step 5.
2. **Pair each new block with its predecessor.** Use the Phase 1 snapshots. For each
   locale, the new blocks are the hashes absent from the snapshot, and the old blocks are
   the snapshot hashes absent now. Pair by `at`. **Assert that each `at` has exactly one
   old and one new block.** If one has two, stop and pair by hand. Build a task per
   locale with `{ of, at, oldEnglish, oldT, newEnglish }`.
3. **Translate as a revision of the reviewed predecessor.** Keep its terms and date forms.
   Gate every output before writing it, the same gate as plainaid Phase 2:
   - the numeric-token multiset, and money/percent/year tokens char-for-char;
   - the `**` count;
   - no bidi controls and no non-Western digits;
   - `t` ≠ English and the 0.4–2.5 ratio;
   - no English month outside a quote.

   The shared opening sentence should be translated identically across the three
   schools within each locale.
4. **Write and build.** Write `t` into each work file, then run
   `node scripts/i18n_build_content_overlay.mjs --topic financial-aid-tuition --lang <code>`
   for each locale.
5. **Integrity by hash, against the snapshots.** Every carried-over block has `text` and
   `t` byte-identical, every new block is non-blank, and the overlay block count matches
   `main` (45), or differs only by a merge the pairing explains.
6. **Checks, PR, merge.** Run the Phase 2 Verification. Fill in Implementation notes, and
   set `status: implemented` and `prs`, with the INDEX row set to *Implemented*. Open the
   PR with `--body-file`, squash-merge, then `git checkout main && git pull`.
   **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/financial-aid-tuition/{charlotte-prep,davidson-day,cannon,charlotte-country-day}/* - Tuition History.md` | edit: the four paragraphs only |
| `src/content/financial-aid-tuition/{charlotte-prep,davidson-day,cannon,charlotte-country-day}.json` | regenerated by ingest |
| `.claude/docs/financial-aid-tuition/{…same four}.md` | regenerated by ingest |
| `src/data/overlays/work/financial-aid-tuition.content.{9 locales}.json` | re-extracted (es in Phase 1, the rest in Phase 2) and translated |
| `src/data/overlays/financial-aid-tuition.content.{9 locales}.json` | rebuilt (Phase 2) |
| `.claude/plans/plaintuition.md`, `.claude/plans/INDEX.md` | status and notes |

## Verification

### Phase 1 — English
- [ ] Step 1 browser confirmation recorded (which of the 4 paragraphs render).
- [ ] Each new paragraph: no sentence over 30 words; grade ≤10 if ≥30 words; figures and
      year tokens identical; no `SELF_REF` match; the shared sentence identical ×3.
- [ ] The ingest diff is only the four paragraphs, with noise restored and
      `schools.json` in `HEAD` order.
- [ ] `npm run check:plain`: `financial-aid-tuition` counts drop to the 4 hidden blocks
      only.
- [ ] `npx tsc -b`, `npx vite build` and the Step 6 checks are green. `check:live`
      fails only on gate 2 for `financial-aid-tuition.content`, with the count recorded.
- [ ] The browser shows every new paragraph in full in English.

### Phase 2 — Locales
- [ ] `npm run check:live` (gates 2 and 3) and `npm run check:runtime` are clean.
- [ ] `npm run check:digits`, `check:dates`, `check:moneytext`, `check:fr`, `check:hi`,
      `check:fa` and `check:bidi` pass.
- [ ] Per locale: `python3 scripts/check_figures.py --topic financial-aid-tuition --lang <code>`
      and `npm run check:sepdrift -- --lang <code>`.
- [ ] `npm run build` is green end to end.
- [ ] Browser: `es`, `fa` and `hi` (`?lang=`), on the four pages, show the translated
      paragraph and no English. Strip bidi isolates before probing fa.

## Implementation notes

### Phase 1 (2026-11-10)

- **Step 1, browser** (headed Chrome, `?lang=en`, every `<details>` open): **all four target paragraphs render**, in Cannon, Country Day, Davidson Day and Prep. Scope unchanged.
- **Deviation from the suggested shared wording.** The plan suggested "The school does not publish these percentages. …". Country Day has a section headed "Note on the published 5.0% increase", so the school does publish a percentage, and that sentence could mislead there. The shared sentence is now **"These percentages are worked out from the tuition figures above, which the school publishes."** It is true at all three schools, and it drops the method talk ("derived arithmetic", "clearly labeled as such", "directly sourced"). Cannon's and Davidson Day's trailing sentences are unchanged.
- **The four paragraphs, before → after:**

  | School | Before | After |
  |---|---|---|
  | cannon (34w, 9.8) | "These percentages are derived arithmetic from the sourced dollar figures and are clearly labeled as such; the dollar figures themselves are all directly sourced. Note the unusually large 2022–23 → 2023–24 jump in the upper three bands." | "These percentages are worked out from the tuition figures above, which the school publishes. Note the unusually large 2022–23 → 2023–24 jump in the upper three bands." (24w) |
  | charlotte-country-day (24w) | "These percentages are derived arithmetic … directly sourced." | "These percentages are worked out from the tuition figures above, which the school publishes." (14w) |
  | davidson-day (36w, 10.1) | "These percentages are derived arithmetic … directly sourced. Davidson Day has held very close to a flat ~4.5% annual increase since 2023–24." | "These percentages are worked out from the tuition figures above, which the school publishes. Davidson Day has held very close to a flat ~4.5% annual increase since 2023–24." (26w) |
  | charlotte-prep (36w, 10.4) | "Until 2024–25 the Early School also sold year-round and school-year extended-day versions at a single all-in price. For 2026–27 the school instead sells the school-year program plus a separate Extended Day add-on, and no year-round option is listed." | "Until 2024–25, the Early School also offered year-round and school-year extended-day versions, each at one all-in price. For 2026–27, the school instead offers the school-year program plus a separate Extended Day add-on. No year-round option is listed." (35w, 8.5) |

  Measured with the real `analyze`: no sentence over 30 words, the numeric and arrow tokens identical, and 0 `SELF_REF` matches.
- **Apply and ingest.** The paragraphs were matched whole, with line joins, so each was found exactly once. Then `build_docs.py financial-aid-tuition` and `build_site_content.py` ran. Afterwards:
  - the 9 untouched schools' `.claude/docs` notes (Rebuilt-date-only changes) were restored;
  - `src/data/schools.json` was only reordered (0 field changes, verified per document), so it was restored from `HEAD`.

  The remaining diff is the 4 source notes, their 4 `.claude/docs` notes and the 4 `src/content` JSONs.
- **Step 5.** The `es` re-extract carried over **41** of 45 (4 new blocks blank). `check:plain` financial-aid-tuition: Flagged 2, Grade >10 **4** (was 6). Those are exactly the 4 hidden provenance blocks.
- **Step 6.** `tsc -b`, `vite build`, `check:schema`, `check:spelling`, `check:moneytext` and `check:dates` are green.
  - `check:live` fails, as designed: gate 2, "4 of 45 shipped block hash(es) do NOT reproduce", ×9, all `financial-aid-tuition.content`.
  - **Deviation: `check:runtime` also fails**, which the plan's Step 6 list did not expect. It reports 4 orphaned entries in `financial-aid-tuition.content.es.json` only. The Step 5 `es` re-extract removed the old 4 blocks from the work file, so the shipped `es` overlay holds 4 stamps with no English source. It is the same Phase-1-by-design class as `check:live` gate 2, and Phase 2's rebuild clears it.
- **Step 7, browser** (English): all four new paragraphs render in full, the old text is gone, and there is no literal `**`. At 390px, Prep has `scrollWidth` 390.

### Phase 2 (2026-11-10)

- **Approval.** The user approved the English ("The English page is approved. Run only Phase 2"). Phase 2 ran in the same window, on `feat/plaintuition`.
- **Re-extract.** The other eight locales each carried over **41** of 45, matching `es`.
- **Pairing.** In every locale, each of the 4 changed `at`s (cannon, charlotte-country-day and davidson-day "Year-over-year increases…"; charlotte-prep "Tuition History") has exactly one old and one new block (asserted), with the reviewed predecessor taken from the `main` snapshots.
- **Translation, written directly.** At 4 blocks × 9 locales the plan's single-agent option was unnecessary, so the translations were written directly:
  - **The shared sentence** has one rendering per locale, used identically at all three schools.
  - **Cannon's and Davidson Day's trailing sentences** are unchanged in English, so they keep their reviewed translation verbatim. They were taken from the old `t` after the old shared sentence (whitespace normalized). fr, it and fa keep their reviewed "environ / circa il / حدود 4.5%" for `~4.5%`, as the predecessors did.
  - **Prep's paragraph** is a minimal revision of the reviewed `t`: "sold" → "offered", "each at one all-in price", and the third sentence split off.
- **Gate** (digits, `**`, bidi, non-Western digits, `t` ≠ English, ratio, English months): **0 problems**, ×9.
- **One slip, caught by the checks.** The first overlay rebuild loop was piped into `head`, which stopped it after the first locales. fr, fa, it, hi and ar still shipped the old hashes, and `check:live` and `check:runtime` failed for exactly those five. Re-running the loop fixed it, and every overlay now holds 45 blocks, including the 4 new hashes.
- **Integrity, by hash against the snapshots:** in every locale, 41 carried blocks have `text` and `t` byte-identical, 4 are new, and 0 are blank.
- **Checks:**
  - `check:live` ✓ (gates 2 and 3) and `check:runtime` ✓;
  - `check:dates`, `check:moneytext`, `check:fr`, `check:hi`, `check:fa`, `check:bidi`: ✓;
  - `check:sepdrift`: 0 ×9, and `check_figures.py --topic financial-aid-tuition`: intact ×9;
  - `check:digits` compares only `src/data` units, so it reported 0 here; the gate covered digits;
  - `npm run build`: green end to end.
- **Browser** (headed Chrome, `?lang=es|fa|hi`, all `<details>` open): **4/4** blocks render translated in each locale, and none shows its English.
