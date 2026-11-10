---
name: plaincollege
title: Plain-language rewrite of the College Support area's English prose (11 schools, 259 units), English in three reviewed batches, then all nine prose locales
status: in-progress
phases: 2
batches: 3                     # Phase 1 is built in three batches, each with its own review stop
created: 2026-11-09
branch: feat/plaincollege
prs: []
---

# Plain-language rewrite — College Support

## Goal

Rewrite the existing English prose in the College Support area so it meets the
plain-language standard in `CLAUDE.md`. That standard says the reader is an average parent,
the target is grade 8–10, and no sentence runs past 30 words. This is the first of the
per-area follow-ups that `.claude/plans/plainlanguage.md` ("Follow-up audit plan") set up.
College Support goes first because it has the most findings: 224 hook-flagged units and 83
jargon hits.

It worked when:

- `node scripts/check_plain_language.mjs --file <path>` reports **0 issues** for all 11
  files in `src/data/collegeSupportPrograms/`.
- Every ≥30-word unit is at grade ≤10, or appears in the residual table below with its
  reason.
- No figure, quote, URL, proper noun or field path changed. The review generator in Step 1
  proves this mechanically.
- The user has approved the English of all three batches. An independent subagent has
  checked every before/after pair.
- All nine prose locales carry fresh translations of the rewritten units, and every
  overlay check is green.

**Two-phase.** It changes research prose a parent reads, so Phase 1 is English only and
stops for review. Phase 2 translates. Phase 1 is further split into **three batches with a
review stop after each**, recommended below.

## Context

### The worklist (measured 2026-11-09 at `c761a159`)

Measured by a scratch script that calls the real checker's exported `loadUnits`,
`analyze` and `filterAllowed` (`scripts/check_plain_language.mjs`). The "hook-flagged"
column matches `--file` output and the `check:plain` baseline in `plainlanguage.md`
(college-support: 224 flagged, 83 jargon, 138 grade >12). **Worklist** = hook-flagged units
plus the ≥30-word units at grade 10–12 that the hook does not flag yet.

| School (`src/data/collegeSupportPrograms/<slug>.ts`) | Prose units | ≥30 words | Hook-flagged units | Issues | Jargon | Sentence >30 | Grade >12 | Grade >10 | Grade 10–12 only | **Worklist** |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| providence-day | 202 | 21 | 18 | 28 | 5 | 10 | 13 | 16 | 3 | **21** |
| charlotte-latin | 190 | 26 | 24 | 36 | 10 | 12 | 14 | 19 | 1 | **25** |
| charlotte-christian | 189 | 24 | 17 | 23 | 5 | 7 | 11 | 18 | 6 | **23** |
| charlotte-catholic | 223 | 7 | 15 | 16 | 12 | 2 | 2 | 3 | 1 | **16** |
| charlotte-country-day | 195 | 40 | 27 | 43 | 8 | 16 | 19 | 31 | 10 | **37** |
| cannon | 170 | 24 | 23 | 33 | 7 | 11 | 15 | 18 | 2 | **25** |
| covenant-day | 167 | 4 | 12 | 16 | 10 | 2 | 4 | 4 | 0 | **12** |
| davidson-day | 181 | 38 | 29 | 44 | 5 | 17 | 22 | 30 | 6 | **35** |
| carmel-christian | 161 | 14 | 17 | 26 | 7 | 10 | 9 | 12 | 2 | **19** |
| hickory-grove-christian | 143 | 18 | 18 | 27 | 7 | 10 | 10 | 14 | 3 | **21** |
| gaston-day | 221 | 25 | 24 | 40 | 7 | 14 | 19 | 20 | 1 | **25** |
| **Total** | **2,042** | **241** | **224** | **332** | **83** | **111** | **138** | **185** | **35** | **259** |

Counts are units, not issues. One unit can carry jargon, a long sentence and a grade flag
at once. A unit is a distinct string per file, de-duplicated by text the way the checker
does it.

**Jargon hits by term:** matriculation 36, rigor 17, leverage 15, cohort 8, executive
function 4, experiential learning 1, interdisciplinary 1, synchronous / asynchronous 1.

**Worklist units by card:** `edge` 78, `wholeClass` 55, `transcript` 41, `verdict` 33,
`outcomes` 26, `counseling` 15, `ncAdmissions` 11.

### Three templated strings repeat across schools

They make up 21 of the 259 worklist entries. Each must be rewritten **once, identically,
everywhere it appears.** Otherwise one card reads differently from school to school, and
Phase 2 has to translate several variants of one sentence.

| Text (start) | Field | Schools |
|---|---|--:|
| "Read each row as a joint figure: the rate at which that university admitted this school’s applicants — not the…" | `ncAdmissions.methodNote` | all 11 |
| "Lever 2 — The school’s leverage" | `edge.levers[1].title` | 8 (all except carmel-christian, hickory-grove-christian, covenant-day) |
| "Lever 2 — The office’s leverage" | `edge.levers[1].title` | carmel-christian, hickory-grove-christian |

The paired title `Lever 1 — Build the spike` / `Build the record` is not flagged, so it is
not on the worklist. Keep Lever 2's new title parallel in form ("Lever 2 — <short phrase>").

### What the rewritten text must survive (checks that read this prose)

- **`check:ncsuper`** (`scripts/check_nc_superlatives.mjs`, in the build) reads each
  school's `ncAdmissions` block up to the `methodNote:` key. It matches the subhead with
  `/subhead:\s*\n\s*'([^']*)'/` and requires the subhead to **name the lowest-rate campus
  first**. So: keep `methodNote` as a key. Keep an `ncAdmissions.subhead` string single-quoted
  on its own line after `subhead:`. Keep the hard campus named first. Do not touch the
  `note` strings `'the most selective of the six'` / `'largest admit rates of the six'`
  (constants `LOW_LABEL`/`HIGH_LABEL`).
- **`check:buckets`** (`scripts/check_selectivity_buckets.mjs:154`) reads the year span out
  of `outcomes.collegesTitle` with `/\d{4}(?:\s*[–+-]\s*\d{4})*/`. Charlotte Catholic's
  `"Every matriculation, 2023–2026"` is on the worklist. Its `2023–2026` must survive
  exactly.
- **`collegesTitle` renders as `data.collegesTitle ?? tr('cardLabels.everyAcceptance')`**
  (`src/components/CollegeSupport.tsx:568`). Catholic's title is a per-school research
  heading and stays in the data. Never delete it to fall back to chrome: the fallback says
  "acceptance", and Catholic's list is an **enrollment** list.
- **`check:moneytext` / `check_money_render_paths.mjs`** list `data.collegesTotal` as a
  money render path. Figures inside it stay char-for-char.
- **The hook itself** runs after every Edit/Write on these files and blocks a rewrite that
  still fails. It checks only changed units, and only at grade 12. It does **not** enforce
  the grade-10 target, so Step 1's generator measures that.

### Phase 1 builds fail at `check:live`, by design

Every rewritten unit gets a new FNV-1a stamp. The nine shipped `college-support` overlays
still hold the old stamps, so `npm run build` stops at `check:live` with stale entries.
`hgprofile` and `ddprofile` hit the same thing in Phase 1. The steps below run
`tsc -b && vite build` and the post-`check:live` checks by hand. Phase 2 makes the full
build green.

### Phase 2 machinery (existing, unchanged)

- Work files: `src/data/overlays/work/college-support.<lang>.json`. Their `strings[]` hold
  `{ text, of, at: ["<slug>:<path>", …], t }`. The `at` format is the same `slug:path` the
  review generator emits.
- `node scripts/i18n_splice_work.mjs --lang <code> --topic college-support` joins a fresh
  extract to the work file **by stamp**. It reports *kept / added / dropped*. A rewritten
  unit shows as one *added* plus one *dropped*.
- `node scripts/i18n_build_overlay.mjs --topic college-support --lang <code>` rebuilds
  `src/data/overlays/college-support.<lang>.json`.
- Locales: `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi, ar.
  Mechanism: `.claude/docs/prose-translation-architecture.md`. Worked Phase 2 runs:
  `hgprofile.md` and `ddprofile.md` ("Phase 2" sections and implementation notes).

## Decisions

- **Batches: three, each with a review stop** (recommended; see "Batch plan"). Batch 1 is
  a calibration batch. The user's wording rulings from it are written into this plan's
  "Style rulings" section before Batch 2 starts. That way later batches inherit the rulings
  instead of repeating the same corrections 100 more times. One review of 259 pairs at
  once would bury systematic problems under volume. Eleven per-school stops would be too
  many round trips for 12–37 units each.
- **One branch, one PR, opened only after Phase 2.** `CLAUDE.md` says both phases land in
  one PR. Each batch is its own commit on `feat/plaincollege`.
- **Shared templates go in Batch 1, across all 11 files**, so they are reviewed once,
  first.
- **Vocabulary for the replacements** (from `scripts/plain_language.json`, applied for this
  area):
  - *matriculation / matriculated* → "enrolled", "where graduates enrolled", "enrollment
    list". **Keep the enrollment-versus-acceptance distinction exact.** Never write
    "admitted", "accepted" or "got into" for a matriculation. That distinction is the point
    of every such sentence (e.g. Catholic's "where graduates actually enrolled, not
    everywhere they were admitted"). "Matriculation markings" → "markings showing where
    students enrolled".
  - *rigor / rigorous* → say what is hard ("the hardest courses", "how demanding the course
    load is", "course difficulty").
  - *leverage* → "what the school/office brings" or "what the school can do". It is the
    Lever 2 title and nothing else.
  - *cohort* → "class", "group" or "grade".
  - *executive function* → "planning, organizing and focus skills". This is the usual case.
  - *asynchronously* → "on the student's own schedule".
  - *experiential credential* → a plain description of what it is.
- **Keep-and-explain is the default when a term is the right word.** A parenthetical right
  after the term passes the hook automatically (the checker's `explained()` rule), so
  **`// plain-ok` should be needed rarely or never.** Use it only when the term is a named
  program, a form's own wording or the profile's own heading, *and* a parenthetical would
  not fit (a 1–3-word label). Record every one in "plain-ok register" below.
  Pre-identified candidates:
  - davidson-day `transcript.flags[4].text`: "the Common App's curriculum-rigor question"
    is the Common App counselor form's own wording. Keep it and explain it in parentheses.
  - charlotte-latin `transcript.depth[4].label` `"Interdisciplinary"`: if it is the
    profile's own course-category heading, keep it. Otherwise use plain wording ("Across
    subjects").
- **Quoted spans are untouchable.** `“most rigorous”` (cannon `transcript.subhead`),
  `“Most rigorous course load”` (davidson-day), `“Regular/Standard”` (charlotte-country-day)
  and every other span in “…” or "…" stay byte-identical. The hook already ignores them.
  Rewrite around them.
- **Markdown emphasis survives.** Keep `**bold**` and `*italic*` on the same words. When a
  sentence is split, the bold stays with its phrase. Emphasis is a reading aid the cards
  rely on.
- **Splitting is the main tool, and list-like sentences become one sentence per group.**
  For example, cannon `wholeClass.middle[2].text` is 89 words of four college groups joined
  by semicolons. It becomes "International universities: … . Service academies and the
  military: … ." **No structural change:** a unit stays one string at the same path. It is
  never split into array items, new fields or new bullets. The no-UX-change rule and the
  overlay paths both depend on this.
- **Spelling convention is left alone.** Some files use British forms ("programme",
  "analyse", "maths"). A spelling pass would grow the diff and the re-translation for no
  gain in plainness. Within a rewritten unit, keep the spelling the file already uses.
  "rigour" goes away only because it is jargon.
- **Do not fix other standards in passing.** Some notes carry research bookkeeping
  (e.g. catholic `wholeClass.scoreTables[0].note`: "shown as em-dashes rather than
  modelled"). That may belong in a `verify` flag under the dev-only rule. Moving it is a
  content change and out of scope. Rewrite such a unit for plainness with the same
  content, and list it under "Candidates noticed, not acted on" in Implementation notes.
- **Words not on the jargon list are fixed only where a worklist unit is rewritten
  anyway.** Examples: "spike", "legible", "denominator", "disclosure". No unit is added to
  the worklist for them, and `plain_language.json` is not edited (see Open questions).
- **The review generator is committed as a reusable script, `scripts/plain_review.mjs`,**
  because every later per-area plan needs the same before/after file and the same
  mechanical guards. Its output goes in `.claude/plans/plaincollege-data/` (the repo's
  `<plan>-data/` convention, e.g. `unitrevert-data/`).
- **The independent reviewer is a fresh `general-purpose` subagent per batch.** It gets
  only the batch's review file, the rules in this plan and the source files. It never sees
  the drafting conversation. It fixes what it finds directly in `src/data`, then the
  generator is re-run. Its findings are recorded in the review file and in Implementation
  notes.

## Batch plan (Phase 1)

| Batch | Schools | Worklist rows | Why this grouping |
|---|---|--:|---|
| **1 — calibration** | the 3 shared templates in all 11 files (16 rows outside the three schools) + cannon (25) + charlotte-catholic (16) + covenant-day (12) | **69** | Covers every kind of rewrite early. Catholic and Covenant are jargon-heavy (12 and 10 hits, mostly matriculation and rigor). Cannon is long-sentence and grade-heavy, with a proper-noun list. Wording rulings settle here. |
| **2** | providence-day (19), charlotte-latin (23), charlotte-christian (21), hickory-grove-christian (19) | **82** | Mid-sized schools (counts exclude their shared rows, done in Batch 1). |
| **3** | charlotte-country-day (35), davidson-day (33), carmel-christian (17), gaston-day (23) | **108** | The two grade-heaviest files (CCD 31, DD 30 units above grade 10), done last with the rulings settled. |

69 + 82 + 108 = 259. Phase 2 runs **once**, after Batch 3 is approved.

**Progress tracking across windows.** Each batch is built in its own window. After each
batch, `/implement` fills that batch's row in "Batch progress" below (commit SHA, review
file, reviewer findings count, user verdict). The front matter stays `status: in-progress`
through Batches 1–2 and becomes `english-done` (INDEX: *English shipped*) only after Batch
3. The status alone tells a fresh window where to resume.

### Batch progress

| Batch | Commit | Review file | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 | `plaincollege: batch 1 English — shared templates, cannon, charlotte-catholic, covenant-day` (see `git log feat/plaincollege`) | [`review-batch1.md`](plaincollege-data/review-batch1.md) | 6 (6 fixed) + 3 borderline applied | **Approved 2026-11-09**, no wording rulings given |
| 2 | `plaincollege: batch 2 English — providence-day, charlotte-latin, charlotte-christian, hickory-grove-christian` (see `git log feat/plaincollege`) | [`review-batch2.md`](plaincollege-data/review-batch2.md) | 9 (9 fixed) | pending |
| 3 | — | — | — | — |

### Style rulings

*Filled in by `/implement` from the user's Batch 1 and Batch 2 reviews. Every later batch
applies them. Empty at planning time.*

**From Batch 1 (approved 2026-11-09).** The user approved Batch 1 without wording changes.
Their `/implement` command carried the template placeholder `<, with these rulings: …>`
unfilled, so no explicit rulings were given. Batch 1's choices therefore stand as precedent
for Batches 2 and 3:

- *matriculation* → "enrollment" / "enrolled" ("Every enrollment, 2023–2026", "enrollment
  asterisk", "enrollment markings"). Never "admitted" or "accepted".
- *cohort* → "every AP student" when the figure counts AP exam-takers, otherwise "class" or
  "group".
- Keep-and-explain with a parenthetical for a named term a parent must recognize: "HBCUs
  (historically Black colleges…)", "quintile table (a split of the class into fifths)".
- "rather than modelled" → "rather than estimated" in score-table notes.
- "in this set" (meaning the schools on the site) → "among the schools on this site".

### plain-ok register

*Every `// plain-ok` marker added, with file, path, term and reason. Target: empty.*

None after Batch 1.

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic or layout changes.
This is a data-text rewrite under the plain-language standard the user set. The gates
that *are* in the plan are the user's wording reviews: one per batch, then Phase 1 → 2.

## Out of scope

- Other research areas. Each gets its own plan later.
- `src/locales/en.json`, including `metrics.matriculation` and
  `metrics.institutional-leverage`. Also `src/data/metricValues.ts` (Compare quals and
  captions) and every chrome catalog.
- Any structural, card, ordering, component or styling change. No new fields, no split
  arrays, no new `verify` flags, no unit moved between fields.
- Units not on the worklist, even ones that would benefit. The worklist is the contract.
- Editing `scripts/plain_language.json` (no new terms, no `allow` entries) or lowering
  `maxGrade`. That waits until every area is done.
- Spelling normalization (British → US), and moving research bookkeeping into `verify`
  flags.
- Deploying. Merging is pre-authorized; `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1–8. Batches 2 and 3 each run Steps 2–8 for their own schools**
(Step 1 exists by then). Before starting Batch 2 or 3, `git checkout feat/plaincollege`,
then `git fetch && git rebase origin/main`. Do not stash (memory
`never-git-stash-in-shared-tree`). If a rebase conflicts in
`src/data/collegeSupportPrograms/`, re-run Step 2 after resolving it, since `main` may have
changed a worklist unit.

1. **Write `scripts/plain_review.mjs`** (Batch 1 only). A standalone Node ESM script:
   - **Inputs:** `--base <ref>` (default `main`), `--dir src/data/collegeSupportPrograms`,
     `--slugs a,b,c` (default: every `.ts` in the dir), `--out <file.md>`,
     `--worklist <file.json>` (write mode, see Step 2), `--check` (exit 1 on any guard
     failure).
   - **Base snapshot:** `git archive <base> src/data scripts | tar -x -C <mkdtemp dir>`,
     then import modules from there, so relative imports resolve with no rewriting.
     Working-tree modules are imported normally.
   - **Units:** use the exported `proseUnits(entry, '', classifyField)` from
     `scripts/check_plain_language.mjs`, with `classifyField` from `scripts/i18n_fields.mjs`
     and the export name from `EXPORTS[slug]` in `scripts/i18n_topics.mjs`.
     **Do not de-duplicate.** The review is per path, and `loadUnits` de-duplicates by text,
     which would hide a shared template's other sites. Emit paths as `<slug>:<path>`, the
     work files' `at` format.
   - **Per changed unit (same path, different text), output a markdown row:**
     `| # | school | path | before | after | words b→a | grade b→a | hook | notes |`.
     Escape `|` as `\|` and newlines as `<br>`. `hook` = the issues still reported by
     `analyze` + `filterAllowed` on the after-text (should be "pass"). Put a header with
     counts per school.
   - **Guards. `--check` fails on any of these:**
     - (a) the set of prose paths differs between base and working tree (a structural
       change);
     - (b) the multiset of digit tokens differs — reuse
       `/\d+(?:[.,:/]\d+)*/g`, the `TOKEN` in `scripts/check_digit_tokens.mjs`;
     - (c) the set of URLs differs;
     - (d) the list of quoted spans (“…”, "…") differs;
     - (e) a `collegesTitle` year span differs.
   - **Reported in `notes`, not failing:** capitalized words in *before* missing from
     *after* (proper-noun drift), a change in `**` count, and an after-grade still >10.
   - Add `"plain:review": "node scripts/plain_review.mjs"` to `package.json` scripts.
     **Not chained into the build.**
   - Negative test, which must isolate the assertion (memory
     `negative-test-must-isolate-the-assertion`): change one digit inside one rewritten
     unit, confirm `--check` exits 1 naming guard (b) for that path, then revert and
     `git diff` the file back to clean.
2. **Regenerate the worklist for this batch's schools.**
   `node scripts/plain_review.mjs --worklist .claude/plans/plaincollege-data/worklist-batch<N>.json --slugs <batch slugs>`.
   It lists every unit that is hook-flagged, or ≥30 words at grade >10, with its path,
   text, grade and rules. Batch 1 also includes the three shared templates in the other
   eight files. If the counts differ from the Batch plan table, `main` moved. Use the
   regenerated list and note the difference.
3. **Rewrite the worklist units** in `src/data/collegeSupportPrograms/<slug>.ts`, one
   school at a time, with Edit. The hook checks each edit. Apply Decisions + Style rulings.
   For every unit:
   - Same meaning, same hedges ("as printed", "genuinely", "not published", "may"), same
     caveats, same direction of every comparison.
   - Every figure char-for-char: `94%`, `1,184`, `2025-26` (keep its hyphen), `4.507 →
     3.204`, `sum(accepted)/sum(applied)`, `~215`. Every proper noun, college, program,
     course code (`AT: U.S. History`, `508`/`509`) and quoted span unchanged.
   - Sentences ≤30 words. Aim for 15–20. Units ≥30 words at grade ≤10.
   - Keep the string's quote style valid TS. An apostrophe in a single-quoted string must
     stay `’` (the files use the curly form) or be escaped.
4. **Measure.**
   - `node scripts/check_plain_language.mjs --file src/data/collegeSupportPrograms/<slug>.ts`
     for each batch file: **0 issues**.
   - `node scripts/plain_review.mjs --slugs <batch slugs> --out .claude/plans/plaincollege-data/review-batch<N>.md --check`:
     exit 0. Every row reads `hook: pass`.
   - Any row with after-grade >10 goes into "Residual units above grade 10" below with a
     one-line reason. Expected reasons: a list of proper nouns (cannon
     `wholeClass.middle[2].text`); a formula (`methodNote`'s `sum(accepted)/sum(applied)`);
     a named program title that cannot be shortened.
   - **Batch 1 only:** also confirm the three shared templates are now byte-identical across
     every file that held them:
     `grep -c "<new methodNote opening>" src/data/collegeSupportPrograms/*.ts` → 11 × 1.
5. **Independent review.** Spawn one `general-purpose` subagent (Agent tool). Its prompt
   gives the paths to `review-batch<N>.md`, this plan (sections Decisions, Style rulings,
   "What the rewritten text must survive") and the batch's source files. Tell it to check
   **every** row for:
   - meaning drift;
   - a dropped or weakened hedge or caveat, or a strengthened claim;
   - a changed figure, proper noun or quote;
   - a comparison whose direction flipped;
   - enrollment/acceptance wording swapped;
   - a sentence that is now plainer but wrong.

   It fixes each finding in the source file (the hook still applies), then re-runs Step 4's
   commands. It returns a findings list: path, problem, fix.

   Append that list to the end of `review-batch<N>.md` under `## Independent review`,
   regenerating the table first so it shows the fixed text. Record the count in "Batch
   progress".
6. **Checks.** `npx tsc -b`, then `npx vite build`, then
   `npm run check:schema && npm run check:ranks && npm run check:collegeurls && npm run check:buckets && npm run check:memberships && npm run check:ncsuper && npm run check:ncrows && npm run check:scores && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans`.
   If `check:schema` reports drift, run `npm run schema` and commit
   `.claude/docs/DATA-SCHEMA.md`. None is expected, since the schema lists keys and counts,
   not prose. `npm run check:live` **is expected** to report stale `college-support` stamps
   for exactly the rewritten units. Record its count; that is Phase 2's input.
7. **Browser check.** `npx vite preview` after the build. In headed Chrome via Playwright
   (memory `headed-chrome-via-playwright`; do not wait on `networkidle`, memory
   `browser-check-networkidle-hangs`), open `/school/<slug>?topic=college-support` for each
   batch school. Open every College Support card. Confirm that:
   - the rewritten text renders;
   - `**bold**` still renders as bold, not as literal asterisks;
   - no card layout broke;
   - Catholic's list heading still reads with `2023–2026`.

   Take one phone-width (390px) look at one school with every card open.
8. **Commit and stop.** Stage explicit paths only (`git status --short` first; never
   `git add -A`):
   - the batch's `src/data/collegeSupportPrograms/*.ts`;
   - `.claude/plans/plaincollege-data/worklist-batch<N>.json` and `review-batch<N>.md`;
   - Batch 1 only: `scripts/plain_review.mjs` and `package.json`;
   - this plan, with "Batch progress" filled in.

   Use the commit message `plaincollege: batch <N> English — <schools>`. Push, and verify
   `git rev-parse HEAD` = `git ls-remote origin feat/plaincollege` (memory
   `git-push-silently-noop`). Do **not** open the PR. Then report to the user:
   - the review file path;
   - the per-school before/after counts;
   - the residual units;
   - the reviewer's findings;
   - the pages to look at (the URLs from Step 7).

   Give the paste-in command for the next window:
   - after Batch 1 or 2:
     `/implement plaincollege — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
   - after Batch 3: set `status: english-done` and the INDEX row to *English shipped*, then
     give the Phase 2 command:
     `/implement plaincollege — Phase 2. All three English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, the user's rulings go into "Style rulings" and
   their verdict into "Batch progress" *before* the next batch's Step 2. If they asked for
   changes to a batch already built, make them, re-run Steps 4–6 for that batch, and amend
   the review file.

**→ STOP. After Batch 3, `/implement` ends its turn and waits.** Nothing below runs until
the user confirms all three batches.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
**`college-support` overlay topic only**. No chrome catalogs. Mechanism:
`.claude/docs/prose-translation-architecture.md`; worked precedent: `hgprofile.md` Phase 2
notes. The locale traps in those docs apply unchanged:

- figures char-for-char, including `%` unspaced;
- lakh/crore regrouping and RTL isolates are render-layer — never typed into `t`;
- dates translate, their digits do not;
- searchable identifiers stay Latin (`AP`, `GPA`, `Upper School`, course codes);
- `fr` course-code identifiers (`check:fr`).

1. **Snapshot the base work files** before splicing:
   `git show main:src/data/overlays/work/college-support.<lang>.json` for each locale, into
   the session scratchpad. They hold the native-reviewed translations of the *old* English.
2. **Splice.** `node scripts/i18n_splice_work.mjs --lang <code> --topic college-support`
   for each locale. Expect *added* ≈ *dropped* ≈ the distinct rewritten texts, which is
   fewer than 259 because each shared template is one string. If the counts are lopsided,
   stop and investigate before translating, since that usually means a misconfigured
   extract.
3. **Translate each *added* unit as a revision of its reviewed predecessor.** Pair each
   added unit with the dropped unit at the same `at` path from the Step 1 snapshot. Give
   the translator three things: old English, old `t`, new English.
   - The instruction is to **revise the reviewed translation to say what the new English
     says**, keeping its terminology, register and reviewed choices wherever the meaning is
     unchanged, and splitting sentences where the English now splits.
   - This keeps the native-speaker-reviewed register (every locale is signed off) instead
     of re-rolling it. It is not a carry-over: the final `t` is keyed to the **new stamp**,
     never to an index (rule: key translation maps by text).
   - If the work runs as parallel per-locale subagents, give each its own scratch
     subdirectory, and let it write only its own locale's work file (memory
     `parallel-locale-agents-collide`). Then run `node scripts/check_work_integrity.mjs`
     (memory `check-work-integrity-script`; the danda trap applies to bn).
4. **Rebuild** each overlay:
   `node scripts/i18n_build_overlay.mjs --topic college-support --lang <code>`.
5. **Run the Phase 2 checks** (Verification below). Then fill in Implementation notes,
   set the plan `status: implemented`, `prs: [<n>]`, and the INDEX row to *Implemented*
   with the PR link. Open the PR with `--body-file`. The body has the per-school counts,
   links to the three review files, and the reviewer findings summary. Squash-merge
   (pre-authorized), `git checkout main && git pull`. **Do not deploy.** Report "merged —
   ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupportPrograms/*.ts` (all 11) | edit — rewrite 259 worklist prose units; no key, path or figure changes |
| `scripts/plain_review.mjs` | new — before/after review generator with mechanical guards |
| `package.json` | edit — add `plain:review` script (not in build) |
| `.claude/plans/plaincollege-data/worklist-batch{1,2,3}.json` | new — per-batch worklists |
| `.claude/plans/plaincollege-data/review-batch{1,2,3}.md` | new — before/after review tables + independent-review findings |
| `src/data/overlays/work/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2) — spliced and translated |
| `src/data/overlays/college-support.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2) — rebuilt |
| `.claude/plans/plaincollege.md`, `.claude/plans/INDEX.md` | edit — progress, rulings, notes, status |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts (not expected) |

## Verification

### Phase 1 — English (per batch)

- [ ] `node scripts/check_plain_language.mjs --file <each batch file>`: 0 issues.
- [ ] `node scripts/plain_review.mjs --slugs <batch> --out … --check`: exit 0 (no path,
      digit, URL, quote or year-span change). Every row `hook: pass`.
- [ ] Negative test of `--check` (Batch 1): failed on the planted digit, file diffed back
      clean.
- [ ] Every after-grade >10 row is listed in "Residual units above grade 10".
- [ ] Batch 1: the three shared templates are identical in every file that holds them.
- [ ] Independent subagent review done; findings fixed and recorded.
- [ ] `npx tsc -b` clean; `npx vite build` succeeds; the Step 6 check list is green;
      `check:live` stale count is recorded and covers only `college-support`.
- [ ] Browser: every College Support card open on each batch school; bold renders;
      Catholic heading keeps `2023–2026`; one 390px look.
- [ ] After Batch 3: `npm run check:plain` shows **college-support Flagged 0** (baseline
      224). Grade >10 equals the residual count (baseline 185).

### Phase 2 — Locales

- [ ] `npm run check:live && npm run check:runtime`: clean.
- [ ] `npm run check:digits`: no finding on a rewritten unit. It compares only stamps new
      since `main`, which is exactly this set.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>` and
      `python3 scripts/check_figures.py --topic college-support --lang <code>`.
- [ ] `node scripts/check_work_integrity.mjs`; `npm run check:fr`, `check:hi`, `check:fa`,
      `check:bidi`, `check:dates`, `check:moneytext`.
- [ ] `npm run build`: green end to end.
- [ ] Browser: one batch-1 school (cannon) and one batch-3 school (davidson-day) in `es`,
      `fa` and `hi` (`?lang=`), every card open. Rewritten text is in the locale, figures
      intact, ranges read correctly in RTL (strip bidi isolates before probing text; memory
      `ccdprofile-shipped`).

## Risks

| Risk | Mitigation |
|---|---|
| A plainer sentence quietly changes meaning (drops "as printed", turns "may" into "is", swaps enrolled/admitted) | Decisions vocabulary; the independent subagent per batch; the user's review per batch |
| A figure re-typed while splitting a sentence | Guard (b) in `plain_review.mjs --check`; `check:digits` in Phase 2 |
| `check:ncsuper` / `check:buckets` break on reworded subhead or title | Constraints in Context; both run in Step 6 |
| Shared template diverges between schools | Rewritten once in Batch 1; grep count in Step 4 |
| Branch sits open across three reviews while `main` moves | Rebase before each batch; Step 2 regenerates the worklist from the rebased tree |
| Phase 2 re-rolls reviewed register in nine locales | Step 3 revises each reviewed predecessor rather than translating fresh |
| Grade-10 target unreachable for proper-noun lists | Listed as residual with reason, as the brief allows |

## Open questions

- **Words outside the jargon list** ("spike", "legible", "denominator") — should they be
  added to `scripts/plain_language.json`? **Default:** no. Fix them only inside units
  already being rewritten, and list them in Implementation notes as candidates for a
  separate change.
- **Is Charlotte Latin's "Interdisciplinary" the profile's own heading?** **Default:**
  check the cited profile. If it is the profile's heading, keep it with a parenthetical
  (or `plain-ok` if the label cannot hold one). If not, use "Across subjects".
- **Batching.** **Default:** three batches as tabled. If the user says "do it in one",
  run Steps 2–8 once over all 11 schools with a single review file.

## Residual units above grade 10

*Filled in by `/implement`: file, path, after-grade, reason.*

| File | Path | After-grade | Reason |
|---|---|--:|---|
| `cannon.ts` | `wholeClass.middle[2].text` | 11.5 (was 39.3) | A list of about 45 college names in four groups. Every sentence is now ≤30 words. The names set the grade. |
| `providence-day.ts` | `wholeClass.middle[0].text` | 10.3 (was 15.2) | Fifteen college names in two lists. The names set the grade. |
| `providence-day.ts` | `wholeClass.middle[2].text` | 10.1 (was 20.3) | Conservatory and international university names in three groups. |
| `charlotte-latin.ts` | `edge.levers[0].note` | 11.2 (was 20.8) | Two lists of program types the school does not publish (capstone, independent study, conservatory-prep track, …). |
| `charlotte-latin.ts` | `wholeClass.middle[1].text` | 11.2 (was 18.4) | Nine UNC campus names. |
| `charlotte-latin.ts` | `wholeClass.middle[2].text` | 10.9 (was 21.7) | Service-academy and ten international university names. |
| `charlotte-christian.ts` | `transcript.depth[0].text` | 11.2 (was 14.1) | Calculus III topic list (multivariable and vector-valued functions, …), the course's own content. |
| `hickory-grove-christian.ts` | `outcomes.headline` | 10.1 (was 15.0) | College names plus the HBCU explanation. |

## Implementation notes

*Filled in by `/implement`.*

### Batch 1 (2026-11-09)

- **Worklist matched the plan exactly:** 69 units (cannon 25, catholic 16, covenant-day 12, plus 16 shared-template rows in the other 8 files). After the build: 69/69 rows `hook: pass`, all guards pass, and 1 residual above grade 10. `check:live` reports **51 stale `college-support` entries per locale**, which is exactly the distinct rewritten texts (each shared template counts once). That is Phase 2's input.
- **Shared templates:** `methodNote` is now "Read each row as a joint figure. It is the rate at which…" (11 × 1). The Lever 2 titles are now "Lever 2 — What the school brings" (8) and "Lever 2 — What the office brings" (carmel-christian, hickory-grove-christian). They were applied with one exact-string replacement across all files, so they are byte-identical.
- **`plain_review.mjs` goes slightly beyond the spec, in three ways.** (1) Guard **(f)**: every *non-prose* string leaf must be unchanged, so a stray edit to a figure, name or URL field fails `--check`. (2) `--match <regex>` pulls the shared templates from the files outside `--slugs` into a worklist. (3) The proper-noun "caps gone" note ignores sentence-initial words. Without that, every split sentence produced a false note.
- **Negative test:** a planted `168 → 169` in catholic `counseling.reach[1]` made `--check` exit 1 with `(b) charlotte-catholic:counseling.reach[1]: digit tokens differ -168 +169`. The file was restored from a byte copy (`cmp` clean), and `--check` then exited 0.
- **Notable wording choices for the user's Batch 1 review:**
  - Catholic `collegesTitle` is "Every enrollment, 2023–2026". It parallels the chrome fallback "Every acceptance", and `check:buckets` passes.
  - "parochial (church-run)" and "Dual Enrollment (college courses taken while in high school)" are keep-and-explain.
  - "HBCUs (historically Black colleges and universities)" adds an explanation.
  - "cohort" became "every AP student" after the reviewer's fix, not "whole class", because the figure counts exams taken by AP students.
- **Browser check** (headed Chrome, `vite preview`): every probe string renders on cannon, catholic, covenant-day, carmel-christian and providence-day, and bold renders in College Support. The first pass showed some misses, but those were `innerText` uppercasing the card titles (the `innertext-case-false-pass` trap). They resolved with `textContent`. At 390px, catholic has no page overflow and its heading reads "EVERY ENROLLMENT, 2023–2026".

### Batch 2 (2026-11-09)

- **Worklist matched the plan exactly:** 82 units (providence-day 19, charlotte-latin 23, charlotte-christian 21, hickory-grove-christian 19). `main` had not moved since Batch 1, so the rebase was a no-op. The review file has 90 rows, because it also shows the 8 shared-template rows Batch 1 already changed in these files. After the build: 90/90 rows `hook: pass`, all guards pass, and 7 residuals above grade 10, all lists of names or topics.
- **Rewrites were applied by an exact-match script**, keyed by worklist path, which refuses any old literal it cannot find. The hook does not see a scripted write, so `check_plain_language.mjs --file` was run on all four files afterwards. It caught 3 units, which were then fixed with Edit so the hook checked them.
- **Charlotte Latin "Interdisciplinary" → "Across subjects".** The label appears only in our own research notes (`Charlotte Latin - College Support - Redesign Research 2026.md`), not as a profile heading, so the plan's default applied. No `plain-ok` was needed.
- **Independent review: 9 findings, all fixed** (see `review-batch2.md`). Two were strengthened claims (PD "what makes them demanding", Christian "it is not an error"). One was a wrong gloss: PD "AP-load norms" are published *maximums* (2/3/4 by grade, `transcript.trust`), not typical loads. The others: a restored "explicitly remedial", a narrowing "Otherwise,", a grammar slip from a sentence split, an ambiguous modifier, and "NC public schools" read as K–12.
- **`check:live`: 133 stale `college-support` entries per locale**, all nine locales, no other topic. That is 51 from Batch 1 plus 82 from Batch 2. Every other Step 6 check passes.
- **Browser check** (headed Chrome, `vite preview`, every `<details>` open): 90/90 probe strings render across the four schools. No literal `**` appears on any of the four pages. At 390px, charlotte-latin has no page overflow (scrollWidth 375).

### Candidates noticed, not acted on

- **Literal `**` on Charlotte Catholic's page, in The Arts area, not College Support.** 7 lines in `artsPrograms/charlotte-catholic.ts` render their asterisks raw (e.g. "— **39 of 199 courses** —"). This predates the branch, which does not touch that file. It is a separate render or data fix.
- catholic `edge.levers[1].items[3]`: "all three service academies". The US has five federal service academies, and the original had the same wording. A content question, not a plainness one.
- catholic `wholeClass.scoreTables[0].note`: "shown as em-dashes rather than estimated" is research bookkeeping that may belong in a `verify` flag (dev-only rule). It was rewritten for plainness with the same content.
- providence-day `wholeClass.scoreTables[0].note` and charlotte-latin `wholeClass.middle[0].text` ("as counted from the profile’s own tables") carry the same research-bookkeeping shape as Catholic's note. They were rewritten for plainness with the same content.
- cannon `wholeClass.support[0].text`: "of the schools on this site" replaced "in this set". The reviewer flagged it as right only if "this set" meant the whole roster.
- Words outside the jargon list that were fixed inside rewritten units: "denominator" → "count", "rollup", "legible", "aggregates", "quartile" → "quarter". Batch 2 adds: "spike" → "standout strength", "legible" → "clear", "granular" → "detailed", "disclosive", "interpolated" → "estimated". Per the Open-questions default, `plain_language.json` was not edited.
