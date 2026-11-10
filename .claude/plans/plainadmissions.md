---
name: plainadmissions
title: Plain-language rewrite of the Admissions area's English prose (8 schools, 131 unit sites / 123 distinct texts once the checker reads `·` lists as lists), English in five reviewed batches, then all nine prose locales
status: in-progress
phases: 2
batches: 5                     # Phase 1 is built in five batches, each with its own review stop
created: 2026-11-09
branch: feat/plainadmissions
prs: []
---

# Plain-language rewrite — Admissions

## Goal

Rewrite the existing English prose in the Admissions area so it meets the plain-language
standard in `CLAUDE.md`. That standard says the reader is an average parent, the target is
grade 8–10, and no sentence runs past 30 words. This is the second per-area follow-up,
after College Support ([`plaincollege.md`](plaincollege.md), PR #467). **That plan is the
model.** It sets the same bar, the same review file and guards (`scripts/plain_review.mjs`),
the same independent subagent review per batch and the same two-phase process. This plan
restates only what a fresh window needs, and it adds what is specific to Admissions.

Admissions differs from College Support in one important way: **parents act on this
text.** It tells them what to submit, by when, for how much, and in what order. A plainer
sentence that moves a deadline, drops "required", or turns "not published" into a silence
is worse than the long sentence it replaced. Most of what this plan adds over the model is
there to prevent that.

It worked when:

- `node scripts/check_plain_language.mjs --file <path>` reports **0 issues** for all 8
  files in `src/data/admissionsPrograms/`.
- Every ≥30-word unit is at grade ≤10, or appears in "Residual units above grade 10" with
  its reason.
- No date, time, fee, figure, email, URL, quote, test name, proper noun or field path
  changed. No required/optional or published/not-published marker was lost, and no step
  sequence was reordered. The extended review generator (Step 1) proves the mechanical part
  of this. The independent reviewer and the user check the rest.
- `sentences()` in `scripts/check_plain_language.mjs` splits on ` · `, with `node:test`
  cases, and the new `check:plain` baseline for every area is recorded.
- The user has approved the English of all five batches. An independent subagent has checked
  every before/after pair.
- All nine prose locales carry fresh translations of the rewritten units, and every overlay
  check is green.

**Two-phase.** It changes research prose a parent reads, so Phase 1 is English only and
stops for review. Phase 2 translates. Phase 1 is further split into **five batches with a
review stop after each**, sized for a ~20–28-minute review (see "Batch plan").

## Context

### The worklist (measured 2026-11-09 at `9c0e0720`)

The worklist was measured two ways. A scratch script called the real checker's exported
`analyze` / `filterAllowed` / `proseUnits` (de-duplicated by text per file, as the checker
does). Then `node scripts/plain_review.mjs --dir src/data/admissionsPrograms --worklist …`
produced the per-path list. The "hook-flagged" column matches `npm run check:plain` exactly
(admissions: 1,341 units, 95 flagged, 0 jargon, 0 British spelling, 73 with a sentence over
30 words, 123 at grade >10, 73 at grade >12). **Worklist** = hook-flagged units plus
the ≥30-word units at grade 10–12 that the hook does not flag yet.

| School (`src/data/admissionsPrograms/<slug>.ts`) | Prose units | ≥30 words | Hook-flagged | Issues | Sentence >30 | Grade >12 | Grade >10 | Grade 10–12 only | **Worklist (distinct)** | **Worklist (paths)** |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| providence-day | 151 | 12 | 4 | 4 | 2 | 2 | 5 | 1 | **5** | **5** |
| charlotte-country-day | 162 | 17 | 5 | 5 | 2 | 3 | 7 | 2 | **7** | **8** |
| charlotte-prep (K–8) | 118 | 11 | 5 | 7 | 4 | 3 | 7 | 2 | **7** | **7** |
| trinity-episcopal (K–8) | 134 | 21 | 2 | 3 | 2 | 1 | 7 | 6 | **8** | **8** |
| charlotte-latin | 159 | 27 | 19 | 26 | 12 | 13 | 22 | 5 | **24** | **25** |
| charlotte-christian | 197 | 25 | 13 | 23 | 11 | 12 | 14 | 2 | **15** | **15** |
| covenant-day | 171 | 25 | 15 | 23 | 11 | 11 | 21 | 6 | **21** | **21** |
| hickory-grove-christian | 249 | 42 | 32 | 64 | 29 | 28 | 40 | 8 | **40** | **46** |
| **Total** | **1,341** | **180** | **95** | **155** | **73** | **73** | **123** | **32** | **127** | **135** |

Counts are units, not issues. One unit can fail both the long-sentence rule and the grade
rule. **Distinct** de-duplicates identical text within a file. **Paths** counts every site.
The review file and the work files use paths.

**There is no jargon in this area.** All 155 issues are long sentences (`long`) or grade
(`grade`). That makes this mainly a job of splitting sentences, not swapping words.

### After the `·` checker change (user decision, 2026-11-09)

Batch 1 Step 1 teaches `sentences()` to split on `\s+·\s+`, so a middle-dot list is
measured one item at a time. This was measured at planning time in a **scratch copy** of
the checker, with the one-line split change and nothing else:

- **Admissions:** 95 → **89** flagged; 73 → 68 with a sentence over 30 words; 123 → 118 at
  grade >10; 73 → 66 at grade >12.
- **Worklist:** 135 → **131 paths** (127 → **123 distinct**). Four sites drop off, because
  they now pass both the hook and the grade-10 target:
  - charlotte-latin `comparison.rows[7].cells.all` and `contacts.address`;
  - charlotte-prep `comparison.rows[7].cells.all`;
  - trinity-episcopal `comparison.rows[8].cells.all`.
- **Per school (paths):** providence-day 5, charlotte-country-day 8, charlotte-prep **6**,
  trinity-episcopal **7**, charlotte-latin **23**, charlotte-christian 15, covenant-day 21,
  hickory-grove-christian 46.
- **Other areas** (flagged count only falls; nothing new is flagged):

  | Area | Flagged | Sentence >30 | Grade >10 | Grade >12 |
  |---|---|---|---|---|
  | sports | 86 → 79 | 77 → 70 | 93 → 85 | 53 → 46 |
  | student-clubs | 104 → 103 | 68 → 67 | 124 → 123 | 90 → 89 |
  | international-travel | 23 → 22 | 17 → 16 | 26 → 26 | 19 → 18 |
  | financial-aid-report | 68 → 58 | 46 → 41 | 88 → 78 | 54 → 42 |

  Every other area is unchanged. Site-wide: **686 → 661** flagged.

These are projections. Step 1 re-measures them with the real change and records the
before/after table in Implementation notes.

**Correction to the field count above.** Of the 7 `comparison.rows[].cells.all` worklist
sites, **6 are `·` lists**. The seventh, charlotte-latin `rows[6]`, is a plain sentence
("Not published in any band — …"). After the split, 3 of the 6 `·` cells drop off (above).
Three stay on the worklist, all still ≥30 words above grade 10:
- charlotte-christian `rows[10]` (grade 11.7);
- covenant-day `rows[9]` (11.8);
- hickory-grove-christian `rows[8]` (12.0, grade-flagged).

hickory-grove-christian `contacts.address` stays on the worklist for its long sentence.

**Worklist sites by field** (135 paths): `bands[].steps[].detail` 75,
`bands[].checklistCallout.text` 15, `spineNote` 7, `comparison.rows[].cells.all` 7,
`checklist.aidPanel.items[]` 6, `aid.text` 6, `rules[].text` 5, `headline` 4,
`checklist.disclaimer` 4, `bands[].watchOuts[].text` 3, `contacts.address` 2,
`bands[].checklistRows[].detail` 1. Every path is under `guide.`.

### Repeated texts inside one school

Five texts repeat at more than one path in the same file (8 extra sites in all). Each must
be rewritten **once, identically, at every site**, or one band reads differently from the
next and Phase 2 has to translate several variants of one sentence:

| School | Text (start) | Sites |
|---|---|---|
| hickory-grove-christian | "The family interview is scheduled once the earlier steps are complete…" | `bands[0].steps[5]`, `bands[1].steps[4]`, `bands[2].steps[4]`, `bands[3].steps[5]` `.detail` |
| hickory-grove-christian | "The final decision is **communicated in writing**…" | `bands[0].steps[6]`, `bands[1].steps[5]`, `bands[2].steps[5]` `.detail` |
| hickory-grove-christian | "Apply through the **FACTS portal**, and send your child's **birth certificate** and **Immu…" | `bands[2].steps[1]`, `bands[3].steps[1]` `.detail` |
| charlotte-latin | "Optional, and on its own clock: the application opens through **Clarity**…" | `bands[2].steps[5]`, `bands[3].steps[5]` `.detail` |
| charlotte-country-day | "Decisions release Apr 9 and your response is due Apr 16…" | `bands[1].steps[7]`, `bands[2].steps[7]` `.detail` |

**Near-repeats stay parallel.** Several texts share an opening and differ in one clause:
- Latin's three "Optional, and on its own clock:" variants (bands 0, 1, 2/3).
- CCD `bands[0].steps[7]` vs `bands[1/2].steps[7]` (Feb 26/Mar 5 vs Apr 9/Apr 16).
- HG's "The first two steps are linked from the admissions page…" (bands 0–3).
- HG `bands[1].steps[1]` vs `bands[2/3].steps[1]` ("Registry Record" vs "Registry record").
- Covenant's interview text "The admissions office sends a link…" (bands 0, 1, 2).
- The "Required at this band" recommendation texts (Covenant bands 0–2).
- HG's testing texts "Testing is arranged through the **Student Services office**…" (bands 1–3).

Rewrite the shared part the same way in each, and change only the clause that differs. Do
**not** "fix" a small difference between variants, such as HG's "Record" / "record". That
difference is in the source and is out of scope.

**The headline's shared opening sentence stays byte-identical.** All 8 headlines open
"Pick your child's entry point and the guide personalizes: …" (Covenant and HG vary it
slightly). That sentence is ≤30 words, and 4 of the 8 headlines are not on the worklist.
Only the school-specific sentences after it are rewritten, so all 8 still match.

### How each field renders (what a rewrite may contain)

Confirmed in `src/components/AdmissionsProgram.tsx` and `src/pages/AdmissionsChecklist.tsx`:

| Field | Renders via | `**bold**`? | Surface |
|---|---|---|---|
| `bands[].steps[].detail` | `<Emphasized>` | **yes** | school page, step body |
| `bands[].watchOuts[].text` | `<Emphasized>` | **yes** | school page, right column |
| `aid.text` | `<Emphasized>` | **yes** | school page, aid strip |
| `headline`, `spineNote`, `rules[].text` (after a `<strong>` title), `comparison.rows[].cells.all`, `contacts.address` | `localizeMoneyText()` or raw | **no** | school page |
| `bands[].checklistCallout.text` (after a `<strong>` lead), `bands[].checklistRows[].detail`, `checklist.aidPanel.items[]`, `checklist.disclaimer` | `localizeMoneyText()` | **no** | `/school/<slug>/admissions-checklist/?band=<key>`, the printable sheet a parent works from offline |

Each data file's "NOTE FOR EDITORS" block says the same thing about `rules[].text`. **Never
add `**` to a field without markdown support**, because it ships as literal asterisks. No such
field contains `**` today (checked). `aidPanel.items[]` strings are also React keys
(`key={it}`), so items in one panel must stay distinct.

`scripts/gen_admissions_report.mjs` (the `/admissions-episode` podcast PDF) reads the same
fields. It converts `**` only in the same three fields, and it **asserts that no `**`
reaches its HTML**. It picks glossary entries by matching `WPPSI`, `WISC`, `ISEE`, `SSAT`,
`ERB`, `CTP`, `CAIS`, `TOEFL`, … and `Charger Commons` / `myCCS` in the prose. Test and
portal names therefore stay spelled exactly as they are. Its episode prompt tells the hosts
to keep "not published" / "confirm with" hedges, so those phrases must survive in the data.

### What the rewritten text must survive (checks and readers of this prose)

- **The hook** runs after every Edit/Write on these files. It blocks a rewrite that still
  fails, but it checks only the changed units and only at grade 12. **It now also enforces
  American spelling** (`usspelling`, #468), so write American forms. Quotes keep their own
  spelling. The grade-10 target is measured by Step 1's generator, not by the hook. Once
  Step 1(a) lands, the hook measures each ` · ` item as its own sentence, so a `·` cell
  passes when every item does.
- **`check:spelling`** (in the build) fails on any British form.
- **`check:moneytext`** (in the build) runs the real `src/lib/format.ts` over every
  money-bearing string in `src/data` and the work files. It asserts that rendering never eats
  the punctuation after a figure or the trailing zeros of cents. A rewrite that moves a fee
  to the end of a sentence (`$100.`) or before a comma is exactly what it tests. It must stay
  green in Phase 1.
- **The deadline strip, stat tiles, step tags and checklist `due` cells are NOT on the
  worklist**: `bands[].deadlines[].value/label`, `stats[].value/label`, `steps[].title/tag`,
  `checklistRows[].action/due`. They hold the same dates and fees that the rewritten
  `detail` prose repeats. They are not edited, so **every date in a rewritten detail must
  still agree with its tag and the strip.** That holds as long as the date survives
  char-for-char (guard g below).
- **`check:dates`** (in the build) reads only the **work files**. It has no effect in
  Phase 1. In Phase 2, it fails any translation that keeps an English month name next to a
  day or year, unless the date sits inside a verbatim quote. So every rewritten unit with a
  date needs its date translated in all nine locales.
- **`audit:daterender`** and **`audit:moneyrender`** (browser, not in the build) visit every
  school page with every admissions band clicked, plus every
  `/admissions-checklist/?band=` page. They report English-form dates and raw `$<digit>` on
  the screen in a translated locale. Phase 2 runs them.
- **`check:digits`** (Phase 2) compares the numeric tokens in each new `t` with its
  English. It catches `4 p.m.` written `16 h`, a re-typed `Feb 26`, and so on. It compares
  only stamps that are new since `main`, which is exactly this set.

### Admissions-specific content that must survive every rewrite

This is the list Step 3 applies and the reviewer checks against:

1. **Dates and times, char-for-char and in the same form.** `Jan 2` stays `Jan 2`. It never
   becomes `January 2`, and `January 15, 2027` never becomes `Jan 15`. This applies to
   weekday names (`Friday, April 9, 2027`), `4:00 p.m.` vs `4 p.m.`, `noon`, and
   `Mon–Fri 7:30 a.m.–3:30 p.m.`. It also applies to month-only and season forms
   (`September`, `Fall 2026`), and to relative timing that carries a deadline ("six weeks
   ahead of", "thirteen days ahead of", "two weeks after").
2. **Fees and amounts**, including what is attached to them: `$100 non-refundable`, `$300
   … through May 31, 2027 ($550 from June 1, 2027)`, "credited toward tuition" vs "not
   applied toward tuition" vs "deducted from the second tuition payment", "per
   application", "per student", "reduced deposit that is refundable if …". `non-refundable`
   vs `nonrefundable` keeps the source's spelling.
3. **Test and instrument names exactly as printed**, including the school's own
   misspellings (Covenant's `Weschler` and `WPPSi`, `WISC V`; Latin's `WPPSI` without `-IV`).
   The same goes for which grade takes which test.
4. **Required vs optional.** Keep "Required." and "Optional, not required." leads where they
   open a step (Latin's whole pattern). Keep `must`, `mandatory` and "by invitation". Keep
   who schedules it ("the admissions office schedules" vs "you book … directly"). Keep
   conditions ("only after", "once … complete", "unless space remains after April 9").
5. **Published vs not published.** Keep "not published", "isn't published", "confirm with
   admissions", "no … is named", "the school publishes one rule". Keep what the school
   publishes and what we observed it does not. A rewrite never turns "not published" into
   silence, and never turns a published figure into a hedge.
6. **Order of steps.** Every `→` chain (`spineNote`) keeps every step, in order, with
   its parenthetical. "First … then …" in a `detail` keeps its order. The grade boundaries
   `Kindergarten→1` and `1→2` are left as written.
7. **Contact details**: street addresses, phone numbers, emails and office hours, exactly.
   Staff names and titles too.
8. **Quoted spans** (“…” and "…") stay byte-identical. Rewrite around them. This includes
   the bracketed `"need[s] to be scheduled in advance."` and quoted all-caps such as
   `"Application MUST be submitted…"`.

### Phase 1 builds fail at `check:live`, by design

Every rewritten unit gets a new FNV-1a stamp. The nine shipped `admissions` overlays still
hold the old stamps, so `npm run build` stops at `check:live` with stale entries. That is the
same as plaincollege Phase 1. The steps below run `tsc -b && vite build` and the build's
later checks by hand. Phase 2 makes the full build green.

### Phase 2 machinery (existing, unchanged)

- Work files: `src/data/overlays/work/admissions.<lang>.json`. Their `strings[]` hold
  `{ text, of, at: ["<slug>:<path>", …], t }` (es has 1,123 today). The `at` format is the
  same `slug:path` the review generator emits.
- `node scripts/i18n_splice_work.mjs --lang <code> --topic admissions` joins a fresh
  extract to the work file **by stamp**. It reports *kept / added / dropped*.
- `node scripts/i18n_build_overlay.mjs --topic admissions --lang <code>` rebuilds
  `src/data/overlays/admissions.<lang>.json`.
- Locales: `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi, ar.
  For the mechanism, see `.claude/docs/prose-translation-architecture.md`. The worked
  precedent is plaincollege's "Phase 2" implementation notes, which this plan repeats step
  for step.

## Decisions

- **Five batches, each with a review stop** (see "Batch plan"; user decision 2026-11-09 to
  merge charlotte-christian into the Latin batch). Sizing uses the before-text word count. A
  careful before/after read of parent-actionable text runs at about 1,200–1,500
  before-words in 20 minutes, so the merged Batch 2 is a ~27-minute review by choice.
  Batch 1 is a calibration batch. The user's wording rulings from it go into "Style
  rulings" before Batch 2 starts.
- **One branch, one PR, opened only after Phase 2.** Each batch is its own commit on
  `feat/plainadmissions`.
- **plaincollege's Decisions carry over unless this section overrides them.** That covers
  keep-and-explain over `plain-ok`, quoted spans untouchable, markdown emphasis kept on the
  same words, splitting as the main tool, one string per path with no structural change, no
  fixing other standards in passing, words outside the jargon list fixed only inside
  worklist units, and a fresh `general-purpose` reviewer per batch.
- **Override: spelling.** plaincollege left British spelling alone. Since #468 the hook and
  `check:spelling` enforce American spelling, so every rewritten unit is American. Quotes
  and official names stay as printed.
- **`→` chains in `spineNote` stay chains.** A chain is a list of steps, and the standard
  wants a run of more than three items shown as a list. Where a chain pushes its sentence
  past 30 words, split it at a step boundary into two or three sentences, keeping every step
  and its order. For example: "Every band follows the same eight steps. First: inquire and
  join myCCS → apply with the $100 fee → upload the birth certificate → send
  recommendations and records. Then: …". The word "spine" is the area's own metaphor and is
  not plain. Replace it with "the same steps" or "the same main steps".
- **Middle-dot (`·`) lists are lists, and the checker learns that** (user decision,
  2026-11-09). The checker read a whole `A · B · C` run as one sentence. Batch 1 Step 1
  changes `sentences()` in `scripts/check_plain_language.mjs` to also split on `\s+·\s+`,
  with `node:test` cases. That way each item is held to the 30-word limit and the grade is
  measured over items. This is the one deliberate tooling change outside
  `src/data/admissionsPrograms/`. It affects every area's counts (lower only; see Context),
  so the new `check:plain` baseline for every area is recorded in Implementation notes.
- **The `·` cells keep their `·` design**, so they match the other rows in their tables.
  The 3 `·` cells still on the worklist are rewritten **only as much as the per-item limits
  need**:
  - the items stay in the same order, joined by ` · `;
  - an item is shortened or split only where it is the part that is over 30 words or
    pushing the grade;
  - an item may be split into two `·` items where it holds two facts.

  A `·` cell is never turned into sentences. The 3 `·` cells that drop off the worklist
  after the change are not touched.
- **`contacts.address`: keep the contact run byte-identical** (`7200 E. WT Harris Blvd.,
  Charlotte, NC 28215 · main office 704-531-4008 · …`). It is contact data, and after the
  `·` split each item is short. Rewrite only the prose sentences after it. (charlotte-latin's
  address drops off the worklist after the split.)
- **A step's lead marker stays its lead.** "Required.", "Optional, not required.",
  "Optional, and on its own clock:" and "**This step exists only at this band.**" keep their
  position at the start of the unit, because a parent scans for them.
- **Vocabulary for this area** (no list terms appear, so these are plain-word choices,
  applied only inside worklist units):
  - "spine" → "the same steps";
  - "instrument" (meaning a test) → "test" (keep "screening" where the school says it);
  - "sits the ISEE" → "takes the ISEE";
  - "back-plan … from it" → "plan backward from that date";
  - "in play" → "in progress" or "submitted";
  - "gated rather than scheduled up front" → "comes only after …";
  - "capacity-dependent" → "depends on open seats";
  - "precondition" → "a step you must complete first".
  Never soften an obligation while doing it ("must" stays "must").
- **Research bookkeeping is not moved.** Several units carry our own observations: "there is
  not a single dollar figure on the admission process page", "the school's own spelling",
  "Errors in the school's own copy are reproduced rather than corrected", "retrieved Aug
  2026". Moving them to `verify` flags would be a content change and is out of scope.
  Rewrite them for plainness with the same content, and list them under "Candidates
  noticed".
- **The review generator gains admissions-strength guards, and they stay generic** (Step 1).
  They fail on any area, so College Support would pass them too.

## Batch plan (Phase 1)

Path counts are **after** the Step 1 `·` change (see Context), which is what Step 2's
regenerated worklists will show.

| Batch | Schools | Paths (distinct) | Before-words | Why this grouping |
|---|---|--:|--:|---|
| **1 — calibration** | providence-day (5), charlotte-country-day (8), charlotte-prep (6), trinity-episcopal (7) | **26** (25) | ~1,190 | Four lighter files that between them hit every field type: `steps.detail`, `watchOuts`, `aid.text`, `rules`, `spineNote` chains, `checklistCallout`, `aidPanel`, `disclaimer`. They include both K–8 schools and the area's model school (PD). The rulings for chains and lead markers settle here. Batch 1 also lands the `sentences()` change and the guard extensions. |
| **2** | charlotte-latin (23), charlotte-christian (15) | **38** (37) | ~1,930 | Latin has the required/optional lead-marker pattern in its purest form, plus the "on its own clock" variants. Christian has the two-track decision dates (sibling exception) and the CAIS/ISEE booking routes. Merged by the user's choice; a ~27-minute review. First `·` cell rewrite (Christian `rows[10]`). |
| **3** | covenant-day (21) | **21** (21) | ~1,430 | The longest single units outside HG (up to 119 words). Faith requirement, school-spelled test names, priority vs rolling. `·` cell `rows[9]`. |
| **4** | hickory-grove-christian — domestic bands `bands[0–3]` (steps, callouts) | **30** (24) | ~1,850 | Three of the five repeat groups live here, so the 30 sites read as 24 texts. ~25 minutes. |
| **5** | hickory-grove-christian — international band `bands[4]` + page-level (`headline`, `spineNote`, `aid.text`, `comparison.rows[8]`, `contacts.address`, `aidPanel.items[2]`) | **16** (16) | ~1,220 | The F-1 process and the page-level summaries, done last with every ruling settled. `·` cell `rows[8]`. |

26 + 38 + 21 + 30 + 16 = **131** paths. Phase 2 runs **once**, after Batch 5 is
approved.

**Batch slug arguments** (`--slugs` and `--paths` for Steps 2 and 4):
- Batch 1: `--slugs providence-day,charlotte-country-day,charlotte-prep,trinity-episcopal`
- Batch 2: `--slugs charlotte-latin,charlotte-christian`
- Batch 3: `--slugs covenant-day`
- Batch 4: `--slugs hickory-grove-christian --paths '^guide\.bands\[[0-3]\]'`
- Batch 5: `--slugs hickory-grove-christian --paths '^guide\.(?!bands\[[0-3]\])'`

Batches 4 and 5 share one file, so `--slugs` alone cannot split them. Step 1's new
`--paths <regex>` option splits them by path.

**Progress tracking across windows.** Each batch is built in its own window. After each
batch, `/implement` fills that batch's row in "Batch progress". The front matter stays
`status: in-progress` through Batches 1–4 and becomes `english-done` (INDEX: *English
shipped*) only after Batch 5.

### Batch progress

| Batch | Commit | Review file | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 | `9d63eba0` | [review-batch1.md](plainadmissions-data/review-batch1.md) | 2 (both fixed: Trinity referents) | approved 2026-11-09, no rulings |
| 2 | `b76a2497` | [review-batch2.md](plainadmissions-data/review-batch2.md) | 6 (all fixed: 2 strengthened "firm deadline", 3 referents, 1 renamed document) | approved 2026-11-09, no rulings |
| 3 | `7e11ffbc` | [review-batch3.md](plainadmissions-data/review-batch3.md) | 2 (both fixed: "developmental readiness" restored, band 0 release sentence aligned) | approved 2026-11-09, no rulings |
| 4 | (this commit) | [review-batch4.md](plainadmissions-data/review-batch4.md) | 5 (all fixed: 2 school statements turned into our claims, incl. the 4-site interview group; 1 referent; 1 weakened requirement; 1 who-arranges) | awaiting review |
| 5 | | | | |

### Style rulings

**Carried over from plaincollege (precedent; the user approved all three batches there):**

- Keep-and-explain with a parenthetical for a named term a parent must recognize: "HBCUs
  (historically Black colleges and universities)", "quintile table (a split of the class
  into fifths)". Here that means, for example, "ISEE (Independent School Entrance Exam)"
  where the unit does not already spell it out, and "CAIS (Charlotte Area Independent
  Schools)" on first use in a unit that needs it. No `plain-ok` was needed in 259 units
  there, and the target here is the same.
- "rather than modelled" → "rather than estimated"; "in this set" → "among the schools on
  this site"; "legible" → "clear"; "granular" → "detailed"; "interpolated" → "estimated".
- **A published maximum or limit is never glossed as a typical figure**, and a published
  rule is never turned into a guess. In admissions this covers age cutoffs, priority dates
  and fee schedules.
- **The reviewer's recurring findings there are the checklist here.** They were
  strengthened claims ("cannot tell" → "does not"), wrong referents after a split ("it",
  "this", "They"), dropped narrowing words ("Otherwise,", "explicitly"), and a gloss that
  changed a term's meaning.

*Rulings from this plan's Batch 1 onward are added here by `/implement`.*

- **Batch 1 (approved 2026-11-09): no rulings.** The resume command arrived with the
  `<, with these rulings: …>` placeholder unfilled, which this plan reads as "approved, no
  rulings". Batch 1's choices therefore stand as precedent: `→` chains split at a step
  boundary as "First: … Then: …"; a time ending in `a.m.`/`p.m.` moved off the sentence end;
  "sits" → "takes"; "release" → "come out"; "verify against" → "check".
- **Batch 2 (approved 2026-11-09): no rulings.** The placeholder arrived unfilled again.
  Batch 2's choices stand as precedent: a long chain split "First: … Next: … Last: …"; a
  school's document name ("custody agreements") is never paraphrased; "binding
  constraint" is said as "your testing plan hinges on …", never "the deadline for this band".
- **Batch 3 (approved 2026-11-09): no rulings.** Placeholder unfilled again. Batch 3's choices
  stand: a school's assessment term ("developmental readiness") is kept, not paraphrased; a
  `·` item holding two facts may be split into two items in place.

### plain-ok register

*Every `// plain-ok` marker added, with file, path, term and reason. Target: empty. None
are expected, since there is no jargon in this area.*

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic or layout changes.
This is a data-text rewrite under the plain-language standard the user set. The gates in the
plan are the user's wording reviews: one per batch, then Phase 1 → 2.

## Out of scope

- Other research areas, `src/locales/en.json` (including the `admissions.*` chrome),
  `src/data/metricValues.ts` (Compare admissions rows), and every chrome catalog.
- The non-prose and off-worklist admissions fields: `deadlines[]`, `stats[]`,
  `steps[].title/tag/tagKind`, `checklistRows[].action/due`, `bands[].label/sublabel/title`,
  `watchOuts[].kicker`, `rules[].title`, `checklistCallout.lead`, `contacts.people[]`,
  `sources`, `cycle`.
- Any structural, card, ordering, component or styling change. No new fields, no split
  arrays, no new `verify` flags, no unit moved between fields.
- Units not on the worklist, even ones that would benefit. The worklist is the contract.
- Editing `scripts/plain_language.json`, lowering `maxGrade`, or changing
  `scripts/check_plain_language.mjs` beyond the one `·` split in `sentences()` (Step 1).
- Rewriting units in other areas that the `·` change moves, in either direction. Their
  counts are recorded, and the units are not touched.
- Fixing inconsistencies the source carries (HG "Record"/"record", Covenant's `Weschler`),
  and re-verifying dates against live school pages. This is a wording pass, not a freshness
  pass. `/admissions-episode` owns freshness.
- Deploying. Merging is pre-authorized; `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1–8. Batches 2–5 each run Steps 2–8 for their own scope.** Before
starting Batch 2 or later, `git checkout feat/plainadmissions`, then
`git fetch && git rebase origin/main`. Do not stash (memory
`never-git-stash-in-shared-tree`). If a rebase conflicts in `src/data/admissionsPrograms/`,
re-run Step 2 after resolving it, since `main` may have changed a worklist unit.

Every `plain_review.mjs` call in this plan passes `--dir src/data/admissionsPrograms`.
The default is still `src/data/collegeSupportPrograms`.

1. **Teach the checker that `·` separates list items, then extend
   `scripts/plain_review.mjs`** (Batch 1 only). Do part (a) first, because the hook,
   `check:plain` and `plain_review.mjs` all measure through it, and Step 2's worklist
   depends on it.

   **(a) The `·` split** (user decision 2026-11-09):
   - **Record the "before" baseline.** On the branch, before any edit, run
     `npm run check:plain > <scratchpad>/plain-before.txt` and keep its "Per area" table.
   - **The change.** In `scripts/check_plain_language.mjs`, `sentences()` currently splits
     with `.split(/(?<=[.!?]["”’)\]]*)\s+/)`. Change it to
     `.split(/(?<=[.!?]["”’)\]]*)\s+|\s+·\s+/)`, and update its doc comment ("Semicolons never
     split; a ` · ` separates list items and always does"). Nothing else in the checker
     changes. The `filter((s) => wordsOf(s).length)` that follows already drops empty
     pieces, such as the one after `fee. · The`.
   - **`node:test` cases** in `scripts/check_plain_language.test.mjs`, next to the existing
     `sentences()` asserts near line 116:
     - `sentences('A $100 fee · the myCCS portal · a birth certificate')` has length 3;
     - a `·` with no spaces (`'Mon·Fri'`) does not split;
     - `'Ends here. · Next item'` gives 2 pieces, not 3;
     - `checkText` on a `·` list of three 15-word items (45 words) reports **no** `long`
       issue, where the same items joined by commas do;
     - one `·` item of 31+ words is still reported `long`;
     - `fleschKincaid` of a `·` list is lower than for the same text joined by commas, which
       shows the grade is measured per item.

     Run `npm run test:plain`. Every case must pass, old and new.
   - **Record the "after" baseline.** Run `npm run check:plain` again and write a
     before → after table for **every area** (Prose units, Flagged, Sentence >30, Grade >10,
     Grade >12) into Implementation notes, with the site-wide total. Compare it with the
     planning-time projection in Context (admissions 95 → 89, site-wide 686 → 661). Explain
     any difference. Every area's flagged count must stay the same or fall; a rise means
     the regex is wrong.
   - **Check that the build still passes the gate**: `npm run check:spelling`. The spelling
     rule does not use `sentences()`, but it is the one checker in the build that shares
     this file.

   **(b) Extend `scripts/plain_review.mjs`.** Keep every existing guard and option. Update
   the header comment's GUARDS list. Add:
   - **`--paths <regex>`**: limit the worklist, review rows and per-unit guards to prose
     paths matching the regex. Batches 4/5 need it. Guard (a) and (f) still run over the
     whole file, so a stray edit outside the batch still fails.
   - **`--allow <a.json,b.json,…>`**: fail **(k)** when a changed path (vs `--base`) is in
     none of the listed worklists. That catches an off-worklist edit, such as a `tag` or a
     strip date. Batch N passes every worklist from 1..N, because the base is `main` and
     earlier batches' changes are still in the diff.
   - **(g) dates and times**: fail when the multiset of date/time tokens differs. The regex
     is case-sensitive:
     - month names, full or 3–4-letter abbreviated with an optional `.`, each with an
       optional day (`\d{1,2}` with an optional ordinal suffix) and an optional
       `,? \d{4}`;
     - `May` counts only when a digit follows, so the verb "may" is never a month;
     - weekday names, full or abbreviated;
     - `a.m.`, `p.m.`, `noon`, `midnight`;
     - a season followed by a year (`Fall 2026`).

     Compare whitespace-normalized matches, so `Jan 2` → `January 2` fails.
   - **(h) obligation and publication markers**: per unit, fail when a class is present in
     *before* and absent in *after*, or the reverse. Report count changes in `notes`. The
     classes, case-insensitive:
     - REQUIRED: `required|requires?|requirement|mandatory|must`;
     - OPTIONAL: `optional|not required|by invitation`;
     - UNPUBLISHED: `not published|isn[’']t published|unpublished|not stated|does(?: not|n[’']t) (?:publish|name|state)|publishes no|confirm(?: [\w’']+){0,3} with`;
     - NONREFUNDABLE: `non-?refundable`;
     - REFUNDABLE: `(?<!non-?)refundable`.

     Synonyms inside a class are free ("must" ↔ "required"). Leaving the class is not.
   - **Extend (c)** to emails: `[\w.+-]+@[\w-]+(?:\.[\w-]+)+`, as a multiset.
   - **(j) repeats**: for the visited slugs, group the *base* prose units by exact text.
     Fail when the units in a group now hold different texts.
   - **(l) markdown**: `--md-paths <regex>` (for this area
     `(steps\[\d+\]\.detail|watchOuts\[\d+\]\.text|aid\.text)$`). Fail when a changed unit
     whose path does not match has more `**` after than before. Outside matching paths, a
     `**` count change becomes a failure, not a note.
   - **Notes (non-failing)**: `→ b→a` when the arrow count changes, so the reviewer looks at
     the chain's order.
   - Negative tests, **one per new guard**, each isolated (memory
     `negative-test-must-isolate-the-assertion`). Copy a batch file byte-for-byte to the
     scratchpad. Plant exactly one fault in one rewritten unit, then run `--check` and
     confirm it exits 1 with **that guard's letter and that path**. Restore from the copy
     and confirm `cmp` is clean. The faults:
     - (g) `Feb 26` → `February 26`;
     - (h) delete "Required." from a Latin lead (do this in Batch 2, or plant it in a PD unit
       that has `required`);
     - (c) change one email character in an address;
     - (j) change one site of a repeat group;
     - (k) edit one `steps[].tag`;
     - (l) add `**` to a `spineNote`.

     **Calibrate on approved work.** Run
     `node scripts/plain_review.mjs --dir src/data/collegeSupportPrograms --base c761a159 --check`.
     `c761a159` is the commit before #467, so this checks the new guards against the 259
     College Support rewrites the user already approved. Omit `--allow` and `--md-paths`,
     which are admissions-specific. Record the result. Any (g)/(h)/(j) hit is either a real
     past slip, which you list under Candidates, or a guard that is too tight. Loosen a
     guard only with a recorded reason.
2. **Generate this batch's worklist.**
   `node scripts/plain_review.mjs --dir src/data/admissionsPrograms --slugs <batch slugs> [--paths <re>] --worklist .claude/plans/plainadmissions-data/worklist-batch<N>.json`.
   Compare its counts with the Batch plan table. If they differ, `main` moved. Use the
   regenerated list and note the difference in Implementation notes.
3. **Draft, measure, then apply.** Use plaincollege's Batch 3 method, which was cleanest:
   - Write the drafts to a scratch JSON keyed by `at`.
   - Run a scratch script over every draft. It calls the real `analyze`, plus the Step 1
     guard functions, against the original.
   - Only then apply them with an exact-match script that refuses any old literal it cannot
     find. Repeat groups are applied as one replacement across their sites.
   - A scripted write bypasses the hook, so afterwards run
     `node scripts/check_plain_language.mjs --file` on every batch file. Fix any remaining
     unit with Edit, so the hook sees it.

   Apply the Decisions, the Style rulings and **every item of "Admissions-specific content
   that must survive"**. For every unit:
   - Same meaning, same hedges and conditions, same direction of every comparison
     ("earlier", "six weeks ahead", "more than at any younger grade").
   - Sentences ≤30 words; aim for 15–20. Units of 30+ words at grade ≤10.
   - Keep the string's quote style valid TS. An apostrophe in a single-quoted string must
     stay `’` (or be escaped). Several admissions strings are double-quoted because they
     contain a straight `'`, so keep each string's delimiter.
4. **Measure.**
   - `node scripts/check_plain_language.mjs --file src/data/admissionsPrograms/<slug>.ts`
     for each batch file: **0 issues**. For Batches 4/5, the file has 0 issues only after
     Batch 5. For Batch 4, confirm that every remaining issue is on a Batch 5 path.
   - `node scripts/plain_review.mjs --dir src/data/admissionsPrograms --slugs <batch slugs> [--paths <re>] --allow <worklists 1..N> --md-paths '(steps\[\d+\]\.detail|watchOuts\[\d+\]\.text|aid\.text)$' --out .claude/plans/plainadmissions-data/review-batch<N>.md --check`:
     exit 0. Every row reads `hook: pass`.
   - Put every row with an after-grade above 10 into "Residual units above grade 10", with
     a one-line reason. Expected reasons: HG's four staff names and titles in
     `contacts.address`, a run of test names, a named program title.
   - Confirm that every repeat group is byte-identical at all its sites. Guard (j) does this;
     also grep one new opening per group.
5. **Independent review.** Spawn one `general-purpose` subagent with the Agent tool. Its
   prompt gives it:
   - the path to `review-batch<N>.md`;
   - this plan (sections "Admissions-specific content that must survive", Decisions and
     Style rulings);
   - the batch's source files.

   It never sees the drafting conversation. Tell it to check **every** row for:
   - meaning drift, or a strengthened or weakened claim;
   - a dropped hedge or condition ("only after", "unless", "where space permits", "at
     least");
   - required/optional, or who-schedules-it, changed;
   - published/not-published changed;
   - a date, time, fee, fee condition, test-to-grade mapping or contact detail changed;
   - a step chain reordered, merged or missing a step;
   - a referent made ambiguous by a split;
   - a sentence that is now plainer but wrong.

   It fixes each finding in the source file (the hook still applies), then re-runs Step 4's
   commands. It returns a findings list: path, problem, fix.

   Regenerate the table, then append the findings to the end of `review-batch<N>.md` under
   `## Independent review`. The generator keeps that tail. Record the count in "Batch
   progress".
6. **Checks.**
   - Run `npx tsc -b`, then `npx vite build`.
   - Run the build's later checks by hand:
     `npm run check:schema && npm run check:spelling && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans`.
   - `npm run check:live` **is expected** to report stale `admissions` stamps, for exactly
     the distinct rewritten texts so far. Record the count, which is Phase 2's input.
     Confirm that no other topic appears.
   - If `check:schema` drifts, run `npm run schema` and commit the doc. No drift is
     expected.
7. **Browser check.** Run `npx vite preview` after the build. Use headed Chrome via
   Playwright (memory `headed-chrome-via-playwright`). Do not wait on `networkidle` (memory
   `browser-check-networkidle-hangs`). Probe with `textContent`, not `innerText`, which
   uppercases titles (memory `innertext-case-false-pass`). For each batch school:
   - Open `/school/<slug>/?topic=admissions` and click **every band**. Open every step's
     `<details>` and the "Exactly what changes between bands" panel. Confirm that the
     rewritten text renders, that `**bold**` renders as `<strong>` in the three markdown
     fields, and that no literal `**` appears anywhere on the page.
   - Open `/school/<slug>/admissions-checklist/?band=<key>` for every band key. Confirm that
     the callout, the aid panel and the disclaimer render rewritten, with no literal `**`.
   - Take one look at 390px width on one batch school with every band panel open. Check for
     no page overflow.
   - Batch 1 also runs `node scripts/gen_admissions_report.mjs --school providence-day`
     (its output goes to the gitignored `reports/admissions/`). It must exit 0, which shows
     the podcast generator still accepts the rewritten data and its no-`**` assertion holds.
8. **Commit and stop.** Stage explicit paths only. Run `git status --short` first, and
   never `git add -A`. Stage:
   - the batch's `src/data/admissionsPrograms/*.ts`;
   - `.claude/plans/plainadmissions-data/worklist-batch<N>.json` and
     `review-batch<N>.md`;
   - Batch 1 only: `scripts/check_plain_language.mjs`,
     `scripts/check_plain_language.test.mjs` and `scripts/plain_review.mjs`;
   - this plan, with "Batch progress" filled in.

   Commit with the message `plainadmissions: batch <N> English — <scope>`. Push, then check
   that `git rev-parse HEAD` equals `git ls-remote origin feat/plainadmissions` (memory
   `git-push-silently-noop`). Do **not** open the PR. Report to the user:
   - the review file path;
   - the before/after counts;
   - the residual units;
   - the reviewer's findings;
   - the URLs from Step 7.

   Give the paste-in command for the next window:
   - after Batches 1–4:
     `/implement plainadmissions — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
   - after Batch 5: set `status: english-done` and the INDEX row to *English shipped*. Then
     give `/implement plainadmissions — Phase 2. All five English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, put the user's rulings into "Style rulings" and
   their verdict into "Batch progress" *before* the next batch's Step 2. (plaincollege's
   resume commands twice arrived with the `<, with these rulings: …>` placeholder unfilled.
   Read that as "approved, no rulings", and say so in the notes.) If the user asked for
   changes to a batch already built, make them, re-run Steps 4–6 for that batch, and amend
   its review file.

**→ STOP. After Batch 5, `/implement` ends its turn and waits.** Nothing below runs until the
user confirms all five batches.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
**`admissions` overlay topic only**. No chrome catalogs. For the mechanism, see
`.claude/docs/prose-translation-architecture.md`. The precedent is plaincollege's Phase 2
notes, which this repeats. The locale traps in those docs apply unchanged:

- figures char-for-char, with `%` unspaced;
- lakh/crore regrouping and RTL isolates are render-layer, never typed into `t`;
- searchable identifiers stay Latin (`ISEE`, `WPPSI-IV`, `FACTS`, `Clarity`, `myCCS`,
  `Charger Commons`, `CAIS`, `ERB`, `TOEFL`, `I-20`, `F-1`);
- `fr` identifiers (`check:fr`).

Two traps are specific to this area:

- **Dates translate; their digits do not** (`check:dates`). Rewritten admissions prose is
  dense with dates: `Feb 26` → es `26 de febrero`, fr `26 févr.`/`26 février` per the
  locale's reviewed predecessor. First of the month is fr `1er`, it `1º`, ht `1ye`.
- **Times follow the reviewed predecessor's convention**, because `check:digits` compares
  the tokens: `4:00 p.m.` must keep `4:00` as a token. A predecessor that wrote `16 h`
  would have been flagged, so copy what the predecessor actually did for the time, and
  stop on a mismatch rather than invent a format.

Steps:

1. **Snapshot the base work files** before splicing. Run
   `git show main:src/data/overlays/work/admissions.<lang>.json` for each locale, into the
   session scratchpad. They hold the native-reviewed translations of the *old* English.
2. **Splice.** Run `node scripts/i18n_splice_work.mjs --lang <code> --topic admissions` for
   each locale. Expect *added* ≈ *dropped* ≈ the Batch 5 `check:live` stale count (≈123,
   since each repeat group is one string). If the counts are lopsided, stop and investigate.
3. **Translate each *added* unit as a revision of its reviewed predecessor.** Pair it with
   the dropped unit at the same `at` path. Give the translator three things: the old
   English, the old `t` and the new English. The instruction is to **revise the reviewed
   translation to say what the new English says**. Keep its terminology, register, date and
   time forms and reviewed choices wherever the meaning is unchanged. Split sentences where
   the English now splits. The final `t` is keyed to the **new stamp**, never to an index.

   Run nine parallel `general-purpose` subagents, one per locale. Each gets its own scratch
   subdirectory, reads only its task file and writes only its own output file (memory
   `parallel-locale-agents-collide`).

   A scratch apply script gates every output before it writes it to the work file. The gate
   checks:
   - the numeric-token multiset against the new English;
   - the `**` count;
   - no bidi controls and no non-Western digits;
   - `t` ≠ English;
   - the 0.4–2.5 length ratio;
   - **no English month or weekday name outside a quote the English also quotes**
     (`check:dates`' rule, applied before write).
4. **Rebuild** each overlay with
   `node scripts/i18n_build_overlay.mjs --topic admissions --lang <code>`.
5. **Verify by stamp, not by `check_work_integrity`.** That script reports thousands of
   false "violations" after a splice (memory `comparerows-shipped`). Run it anyway, then
   prove integrity against the snapshot: every kept stamp has `text` and `t` byte-identical,
   every new stamp is non-blank, and every locale passes.
6. **Run the Phase 2 checks** (Verification below). Then:
   - fill in Implementation notes;
   - set the plan's `status: implemented` and `prs: [<n>]`, and the INDEX row to
     *Implemented* with the PR link;
   - open the PR with `--body-file`. The body has the per-school counts, links to the five
     review files, a summary of the reviewer findings, and the per-area `check:plain`
     before → after table from the `·` change;
   - squash-merge (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/admissionsPrograms/*.ts` (all 8) | edit: rewrite the 131 worklist prose sites (123 distinct texts, counted after the `·` change); no key, path, date, fee or name changes |
| `scripts/check_plain_language.mjs` | edit: `sentences()` also splits on `\s+·\s+` (one regex + its doc comment) |
| `scripts/check_plain_language.test.mjs` | edit: `node:test` cases for the `·` split |
| `scripts/plain_review.mjs` | edit: `--paths`, `--allow`, `--md-paths`; guards (g) dates, (h) obligation/publication markers, (j) repeats, (k) off-worklist, (l) markdown; emails added to (c) |
| `.claude/plans/plainadmissions-data/worklist-batch{1..5}.json` | new: per-batch worklists |
| `.claude/plans/plainadmissions-data/review-batch{1..5}.md` | new: before/after review tables + independent-review findings |
| `src/data/overlays/work/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): spliced and translated |
| `src/data/overlays/admissions.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): rebuilt |
| `.claude/plans/plainadmissions.md`, `.claude/plans/INDEX.md` | edit: progress, rulings, notes, status |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts (not expected) |

`package.json` needs no edit, because `plain:review` already exists.

## Verification

### Phase 1 — English (per batch)

- [ ] `node scripts/check_plain_language.mjs --file <each batch file>`: 0 issues (for HG,
      after Batch 5; after Batch 4, every remaining issue is on a Batch 5 path).
- [ ] `node scripts/plain_review.mjs --dir src/data/admissionsPrograms … --allow … --md-paths … --check`:
      exit 0. Every row is `hook: pass`.
- [ ] Batch 1: `npm run test:plain` passes with the new `·` cases. The per-area
      `check:plain` before → after table is in Implementation notes, and no area's flagged
      count rose.
- [ ] The 3 `·` cells on the worklist still use ` · ` between items, in the same order, and
      the 3 that dropped off are byte-identical to `main`.
- [ ] Batch 1: each new guard's negative test failed on its planted fault with the right
      letter and path, and each file was restored to `cmp`-clean. The college-support re-run
      against `c761a159` is recorded.
- [ ] Every after-grade >10 row is listed in "Residual units above grade 10".
- [ ] Repeat groups are byte-identical at every site (guard j).
- [ ] The independent subagent review is done, and its findings are fixed and recorded.
- [ ] `npx tsc -b` is clean. `npx vite build` succeeds. The Step 6 list is green. The
      `check:live` stale count is recorded, and it covers only `admissions`.
- [ ] Browser: every band clicked and every step opened on each batch school, plus every
      `/admissions-checklist/?band=` page. Bold renders only in the three markdown fields,
      with no literal `**` anywhere. One 390px look.
- [ ] Batch 1: `node scripts/gen_admissions_report.mjs --school providence-day` exits 0.
- [ ] After Batch 5: `npm run check:plain` shows **admissions Flagged 0** (baseline 89
      after the `·` change, 95 before). Grade >10 equals the residual count (baseline 118
      after the change, 123 before).

### Phase 2 — Locales

- [ ] `npm run check:live && npm run check:runtime`: clean.
- [ ] `npm run check:digits`: no finding on a rewritten unit.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>` and
      `python3 scripts/check_figures.py --topic admissions --lang <code>`.
- [ ] `npm run check:dates`, `check:moneytext`, `check:fr`, `check:hi`, `check:fa`,
      `check:bidi`; `node scripts/check_work_integrity.mjs`, followed by the by-stamp proof
      (Phase 2 Step 5).
- [ ] `npm run i18n:leaks -- --lang <code>`: no flag on a rewritten unit (memory
      `i18n-leaks-needs-lang-flag`).
- [ ] `npm run build`: green end to end.
- [ ] `npm run build && npx vite preview`, then
      `npm run audit:daterender -- --lang es --lang fa --lang hi` and
      `npm run audit:moneyrender -- --lang es --lang fr`: no new finding on an admissions
      page or `/admissions-checklist/` page compared with `main`. Run the same audits on
      `main` first if a baseline is needed. `audit:daterender` takes 9+ minutes.
- [ ] Browser: one Batch 1 school (charlotte-prep, K–8) and Hickory Grove (Batches 4–5) in
      `es`, `fa` and `hi` (`?lang=`), with every band clicked and every step opened. Check
      that the rewritten text is in the locale, the figures and dates are intact, and the
      ranges read correctly in RTL. Strip bidi isolates before probing text (memory
      `ccdprofile-shipped`).

## Risks

| Risk | Mitigation |
|---|---|
| A split sentence moves or re-forms a deadline, time or fee | Guards (b) digits and (g) dates; the reviewer's checklist; strip/tag fields are untouched, and (k) proves it |
| "Required" / "optional" / "not published" quietly dropped or softened | Guard (h) class presence; lead markers kept in position; the reviewer and the user per batch |
| A `→` chain loses or reorders a step | Arrow-count note; the reviewer checks chain order explicitly |
| `**` added to a raw field ships literal asterisks, and breaks the podcast generator's assertion | Guard (l); the browser check for literal `**`; `gen_admissions_report.mjs` run in Batch 1 |
| Repeat-group sites diverge | Applied as one replacement; guard (j) |
| A Phase 2 translation leaves an English date | Gate in Phase 2 Step 3; `check:dates` in the build; `audit:daterender` |
| The branch stays open across five reviews while `main` moves | Rebase before each batch; Step 2 regenerates the worklist |
| New guards false-positive and block legitimate rewrites | Calibrated on the 259 approved College Support rewrites in Step 1; loosen a guard only with a recorded reason |

## Open questions

Both questions raised at planning time were **resolved by the user on 2026-11-09**:

- ~~**`·` lists: rewrite the 7 cells, or teach the checker that ` · ` separates list
  items?**~~ **Resolved: the checker change.** Batch 1 Step 1 changes `sentences()` to also
  split on `\s+·\s+`, with `node:test` cases. The `·` cells on the worklist are rewritten
  only as much as the per-item limits need, and they keep the `·` design to match the other
  rows in their tables. The new `check:plain` baseline for every area goes in Implementation
  notes. (At planning time, only 6 of those 7 sites turned out to be `·` lists. After the
  change, 3 stay on the worklist; see Context.)
- ~~**Batch 3 is short (~12 min).**~~ **Resolved: merged.** charlotte-christian joins
  charlotte-latin in Batch 2, giving five batches in total, renumbered throughout.

Still open, with a default:

- **Words outside the jargon list** ("spine", "instrument", "back-plan", "gated").
  **Default:** fix them only inside worklist units (Decisions vocabulary). List them in
  Implementation notes as candidates for `plain_language.json`. Do not edit that file.

## Residual units above grade 10

*Filled in by `/implement`: file, path, after-grade, reason.*

| File | Path | After-grade | Reason |
|---|---|--:|---|

## Implementation notes

### Batch 1 (2026-11-09)

**Step 1(a) — the `·` split.** `sentences()` now splits on `(?<=[.!?]["”’)\]]*)\s+|\s+·\s+`,
with a new `node:test` case (`8b`) covering all six asserts the plan listed. `npm run test:plain`
passes 26/26. `check:spelling` passes. The real change matched the planning-time projection
**exactly** (admissions 95 → 89, site-wide 686 → 661). No area's flagged count rose. The
"after" column was measured right after the regex change, before any rewrite:

| Area | Prose units | Flagged | Sentence >30 | Grade >10 | Grade >12 |
|---|--:|--:|--:|--:|--:|
| admissions | 1341 | 95 → 89 | 73 → 68 | 123 → 118 | 73 → 66 |
| sports | 1307 | 86 → 79 | 77 → 70 | 93 → 85 | 53 → 46 |
| the-arts | 1279 | 107 | 88 | 122 | 78 |
| student-clubs | 1135 | 104 → 103 | 68 → 67 | 124 → 123 | 90 → 89 |
| college-support | 2042 | 0 | 0 | 8 | 0 |
| after-school | 1097 | 29 | 21 | 33 | 19 |
| high-school-placement | 131 | 2 | 2 | 3 | 1 |
| summer-programs | 1590 | 13 | 12 | 17 | 8 |
| international-travel | 1296 | 23 → 22 | 17 → 16 | 26 | 19 → 18 |
| learning-support | 630 | 8 | 3 | 8 | 5 |
| course-offerings | 3173 | 95 | 46 | 68 | 58 |
| financial-aid-report | 976 | 68 → 58 | 46 → 41 | 88 → 78 | 54 → 42 |
| metric-values | 908 | 49 | 35 | 56 | 25 |
| chrome | 803 | 5 | 0 | 1 | 0 |
| financial-aid-tuition | 45 | 2 | 2 | 6 | 2 |
| **Total** | 17753 | 686 → 661 | 490 → 471 | 776 → 752 | 485 → 457 |

**Step 1(b) — `plain_review.mjs`.** Added `--paths`, `--allow`, `--md-paths` and guards (g)
dates/times, (h) marker classes, (j) repeats, (k) off-worklist edits, (l) markdown fields,
plus emails in (c) and a `→` count note. (j) and (k) run over the whole file, as do (a) and (f).

**Guard (h) was widened, with reasons.** The plan's class lists, run against the approved
College Support rewrites (`--base c761a159`), produced **17** (h) hits and nothing else: no
(g), (j), (c) or (b) hit. Almost all were synonyms the lists did not hold. The changes:
- UNPUBLISHED gains "no … (is/are) published/stated" (up to 12 words between), "no
  published", "publishes/states/names no", "no <noun> publishes", "nothing … is published",
  "never (been) published/stated", "not disclosed/public", "undisclosed", "does not say/
  disclose", "never says", and "none of … names/states/publishes/claimed".
- OPTIONAL gains "not a (…) requirement", which is masked before REQUIRED is counted, the
  same as "not required".
- REQUIRED gains "prerequisite(s)" and "precondition(s)" (the plan's own vocabulary maps
  "precondition" → "a step you must complete first").

That left **3** calibration hits, all in the "marker added" direction and all read:
- `davidson-day:transcript.headline` (UNPUBLISHED added). The before was elliptical:
  "publishes … but no AP exam results". Equivalent, so not a slip.
- `davidson-day:edge.levers[0].items[1]` (REQUIRED added). The before listed the diploma's
  components; the after says "It also requires …". Equivalent, so not a slip.
- `charlotte-latin:wholeClass.support[2].text` (REQUIRED added). "with testing current
  within three years" became "Their testing must be no more than three years old". This is a
  mild strengthening; it is listed under Candidates.

The guard was not loosened further, so these 3 still fail a College Support re-run. That is
the intended sensitivity.

**Negative tests** (each planted in one unit, `--check` run, file restored, `cmp` clean):

| Guard | Fault planted | Result |
|---|---|---|
| (g) | CCD `bands[0].steps[7]` `Feb 26` → `February 26` | exit 1, `(g) charlotte-country-day:guide.bands[0].steps[7].detail` only |
| (h) | PD `bands[2].watchOuts[0]` "the required test" → "the test" | exit 1, `(h) … REQUIRED marker lost` only |
| (c) | Trinity `bands[1].steps[0]` `admissions@` → `admission@` (run without `--allow`) | exit 1, `(c) … URLs/emails differ` only |
| (j) | second site of the CCD `Apr 9`/`Apr 16` repeat, "response" → "reply" | exit 1, `(j) … repeat group now holds 2 texts` only |
| (k) | CCD `bands[0].steps[2].tag` `Oct 14` → `Oct 15` | exit 1 with (k), plus (b), (g) and (j) |
| (k) | Trinity `bands[1].steps[0]` "or contact" → "or email" (off-worklist prose) | exit 1, `(k)` only |
| (l) | `**` added to the Prep `spineNote` | exit 1, `(l) charlotte-prep:guide.spineNote` only |

Note on the tag test: `steps[].tag` is classified as **prose** by `classifyField`, not
non-prose, so a tag edit is caught by (k), (b), (g) and (j) rather than (f). The second (k)
test isolates (k) alone.

**Batch 1 build.** The worklist matched the plan: 26 paths / 25 distinct. Drafts were
measured first, then applied by exact `'…'` literal (the CCD `Apr 9` pair as one
replacement). The hook checker reports `clean` on all four files. The review generator,
with every guard on, exits 0: 26/26 rows `hook: pass`, and no after-grade above 10, so
Batch 1 adds no residual rows. Two chains were split at a step boundary into "First: … Then:
…" (CCD 5 → 4 arrows, Prep 6 → 5). Trinity's chain stays one 22-word sentence. Two Prep
units had a sentence ending in `a.m.`/`p.m.`. The checker does not split there, so the time
was moved ahead of the date ("at 9:30 a.m. on **Wednesday, October 21**").

**Independent review:** 2 findings, both fixed, both ambiguous referents in Trinity
(`bands[1].steps[1]` "during the current year" → "during that school year"; the
disclaimer's split-off "It is flagged" → "This error is flagged"). See the review file.

**Step 6 checks.** `npx tsc -b` and `npx vite build` are clean. `check:schema`, `check:spelling`,
`check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates` and
`check:spans` are all green. `check:live` reports, as expected, **25 distinct stale stamps
per locale, all `admissions`**, which is exactly the 25 distinct rewritten texts. No other
topic appears. Running total for Phase 2: **25**.

**Step 7 browser check** (headed Chrome via Playwright, `vite preview`). Each of the 4 schools
was checked with every band clicked and every `<details>` opened, plus every
`/admissions-checklist/?band=` page (10 pages). All 26 rewritten units render on their
surface. Every `**…**` span in the three markdown fields renders as `<strong>`, and there is
no literal `**` on any page. At 390px, charlotte-prep with both bands open has a max
`scrollWidth` of 375, so there is no overflow. `gen_admissions_report.mjs --school
providence-day` exits 0. Its "jargon with no glossary entry: IS, PD" note comes from units
outside the batch: none of the 5 rewritten PD texts holds either token.

### Batch 2 (2026-11-09)

**Resume.** Batch 1 was approved with no rulings (the resume command's `<, with these
rulings: …>` placeholder was unfilled; recorded under "Style rulings"). `main` had not moved
since Batch 1, so `git rebase origin/main` was a no-op.

**Worklist** matched the plan exactly: 38 paths / 37 distinct (charlotte-latin 23,
charlotte-christian 15). The one repeat group, Latin's "on its own clock" text at
`bands[2]`/`bands[3]` `.steps[5]`, was applied as one replacement across both sites.

**Drafts were measured first**, with the real `analyze`, and then applied by exact literal,
keeping each string's delimiter. The two `"…"` headlines stayed double-quoted. Two drafts
needed a second pass before applying:
- Christian `bands[1].steps[7]`: the checker's initial rule (`\b[A-Z]\.(?=\s)`) reads
  `JK/K.` as an initial, so it did not split there. The sentence was reordered so that it
  ends in "track.".
- Latin `spineNote` measured 10.1, so it was trimmed.

After applying, the review generator's guard (b) caught one added digit: "So Grade 1
gets". It was fixed with Edit.

**Shared wording, kept parallel.**
- Latin's four "Optional, and on its own clock:" units share the same wording: "the aid
  application opens … It is due … to be considered in the priority round. <differing
  clause> One application covers every child in the family."
- Latin `bands[0].steps[0]` keeps the opening it shares with `bands[1–3].steps[0]`, which
  are short and not on the worklist. Only its trailing clause was split off.
- Latin's two "Both the ISEE and every remaining file item are due that day" callouts open
  identically.

**Chains.** Christian's eight-step `spineNote` was split into three sentences, "First: …
Next: … Last: …", with every step kept in order (7 → 5 arrows). Batch 1 used two sentences;
this chain is 8 steps and needed three to keep each under 30 words. Latin's 4-step chain
stays one sentence (3 arrows). Bold spans that ended in `a.m.`/`p.m.` were moved to the
middle of their sentence (Latin `bands[0].steps[1]`, Christian `bands[0].steps[7]`,
`bands[1].steps[1]`). No word inside a bold span changed, except two the vocabulary covers:
"**the instrument changes…**" → "**the test changes…**" and "**back-plan your registration
from it**" → "**plan your registration backward from it**".

**Negative test (h)**, as the plan suggested for this batch: deleting "Required." from Latin
`bands[0].steps[4]` gave exit 1 with `(h) charlotte-latin:guide.bands[0].steps[4].detail:
REQUIRED marker lost (1→0)` and nothing else. The file was restored and `cmp` was clean.

**Measure.** The hook checker reports `clean` on both files. The review generator, with every
guard on (`--allow` worklists 1–2), exits 0: 38/38 `hook: pass`, after-grade >10: 0. Batch 2
adds no residual rows. The `·` cell (Christian `rows[10]`) keeps its five items in order;
only items 3–5 were reworded (11.7 → 8.8).

**Independent review: 6 findings, all fixed.** Two were the same strengthened claim. "binding
constraint" → "firm deadline for this band" read as the band's deadline, when the
application is due Jan 15. It now says "Your testing plan in this band hinges on …". Three
were referents (Latin `spineNote` "It", Latin disclaimer "That", Christian
`bands[1].steps[6]` "these applicants"). One was a renamed document: "custody agreements" had
become "custody papers" in the `·` cell, and it was restored. See the review file.

**Step 6 checks.** `npx tsc -b` and `npx vite build` are clean. `check:schema`,
`check:spelling`, `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`,
`check:dates` and `check:spans` are all green. `check:live` reports **62 distinct stale stamps
per locale, all `admissions`**: Batch 1's 25 plus Batch 2's 37. No other topic appears.
Running total for Phase 2: **62**. `check:plain` now shows admissions Flagged **46** (89 after
the `·` change).

**Step 7 browser check** (headed Chrome via Playwright, `vite preview`). On both schools every
band was clicked and every `<details>` opened, and all 8 `/admissions-checklist/?band=` pages
were loaded. All 38 rewritten units render. Each was matched against the live module's text
with `**` stripped, and every bold span was found inside a `<strong>`. No page shows a literal
`**`. At 390px, charlotte-christian with each of its 4 bands open has a max `scrollWidth` of
375, so there is no overflow.

### Batch 3 (2026-11-09)

**Resume.** Batch 2 was approved with no rulings (the placeholder was unfilled again;
recorded under "Style rulings"). `main` had not moved, so the rebase was a no-op.

**Worklist** matched the plan: 21 paths / 21 distinct, all covenant-day. There are no exact
repeats in this file. The near-repeats were built from one shared string each in the draft
file, so they read identically:
- the interview opening (`bands[0..2].steps[4]`);
- the pastor sentence and the records-release sentence (`bands[0..2].steps[3]`);
- the ISEE "offers … on campus" sentence (`bands[1].steps[2]`, `bands[2].steps[2]`).

**Drafts were measured first.** Five were above grade 10 on the first pass:
- the three recommendation units, weighed down by the records-release list, which keeps
  every item. The sentences around it were simplified instead;
- `aid.text`, which had one 36-word sentence;
- the `·` cell.

All were trimmed before applying. Every guard passed on the first `--check`.

**One deviation from the plan.** The headline's shared opening sentence is no longer intact
here. Covenant's version adds "six published" and runs **31 words**, so the hook flags it
(the plan's "≤30 words" holds only for the other schools' shorter variant). It was split
before "plus a printable checklist": "… and the screening for that band. You also get a
printable checklist to take with you." The other seven headlines keep the one-sentence form.

**The `·` cell** (`comparison.rows[9]`) went from 6 items to 8. Two items each held two facts
and were split in place, which the Decisions allow:
- "a parent interview with the Admissions Director" · "at least one parent must be a
  Christ-follower who is active in a local Christian church";
- "rolling admissions after the priority dates" · "no on-campus testing, shadow visit or
  parent interview for a late applicant unless space remains after April 9".

The order is unchanged (11.8 → 9.8).

**Independent review: 2 findings, both fixed.** "developmental readiness" was restored (the
school's term). Band 0's records-release sentence was aligned to bands 1–2 ("you give
permission for a broad release"), because "note that the release is broad" did not say
that entering the email grants it. See the review file.

**Step 6 checks.** `npx tsc -b`, `npx vite build` and the eight later checks are green.
`check:live` reports **83 distinct stale stamps per locale, all `admissions`** (62 + 21).
Running total for Phase 2: **83**. `check:plain` now shows admissions Flagged **32**.

**Step 7 browser check.** Every band was clicked and every `<details>` opened, and all 3
`/admissions-checklist/?band=` pages were loaded. All 21 rewritten units render, every bold
span is inside a `<strong>`, and no page shows a literal `**`. At 390px, with each of the 3
bands open, the max `scrollWidth` is 375.

### Batch 4 (2026-11-09)

**Resume.** Batch 3 was approved with no rulings (placeholder unfilled again; recorded under
"Style rulings"). `main` had not moved, so the rebase was a no-op.

**Worklist** matched the plan: 30 paths / 24 distinct (`--paths '^guide\.bands\[[0-3]\]'`).
The three repeat groups in this batch were each applied as one replacement, and the apply
script confirmed the literal count equalled the site count, so no Batch 5 site holds the
same text:
- the family-interview text (×4);
- the decision text (×3);
- the apply text with "Registry record" (×2).

The near-repeats were built from shared strings in the draft file, so their common parts
read identically:
- the open-house opening of every `steps[0]`;
- the testing sentence;
- the fee sentences;
- the four-recommendations sentence;
- the callouts' "Applications open …" and denial sentences.

The Record/record difference stays as in the source.

**Drafts were measured first.** Six were above target on the first pass and were trimmed
before applying:
- the decision repeat group (×3) and its high-school variant, weighed down by the list of
  what the decision weighs, which was split;
- the four-recommendations sentence in bands 2 and 3, at 32 words.

Every guard passed on the first `--check`.

**Measure.** The review generator, with every guard on (`--allow` worklists 1–4), exits 0:
30/30 `hook: pass`, after-grade >10: 0. Batch 4 adds no residual rows. As the plan expects,
`check_plain_language.mjs --file` on HG still reports issues, and **every remaining issue is
on a Batch 5 path**: `bands[4]` and the page-level fields. None is on a `bands[0–3]` path.

**Independent review: 5 findings, all fixed.**
- Two school statements had turned into our own claims after a split. One was the TK
  "bridge" description. The other was the interview's "assess whether Hickory Grove is the
  right fit", fixed with "The school says…" at all 4 sites.
- One ambiguous "it" (the TK/K5 assessment).
- One weakened requirement ("includes" → "needs" for the Grades 4–5 Student Questionnaire).
- One who-arranges change. The family *requests* the shadow day by form; it does not
  arrange it.

See the review file.

**Step 6 checks.** `npx tsc -b`, `npx vite build` and the eight later checks are green.
`check:live` reports **107 distinct stale stamps per locale, all `admissions`** (83 + 24).
Running total for Phase 2: **107**. `check:plain` now shows admissions Flagged **14**.

**Step 7 browser check.** All 5 HG bands were clicked and every `<details>` opened, and all 5
`/admissions-checklist/?band=` pages were loaded. All 30 rewritten units render, every bold
span is inside a `<strong>`, and no page shows a literal `**`. At 390px, with each band
open, the max `scrollWidth` is 375.

### Candidates noticed, not acted on

*Seeded at planning time. `/implement` adds to this list.*

- Research bookkeeping in parent-facing prose, which may belong in `verify` flags (dev-only
  rule):
  - trinity-episcopal `bands[0].steps[1].detail`: "there is not a single dollar figure on
    the admission process page";
  - trinity-episcopal `checklist.disclaimer`: "Errors in the school’s own copy are
    reproduced rather than corrected";
  - covenant-day `bands[0].steps[2].detail`: "the school's own spelling";
  - every `checklist.disclaimer`: "retrieved Aug 2026" / "verified against the live site".

  Each is rewritten for plainness with the same content.
- charlotte-christian `checklist.disclaimer`: "the older financial-aid PDF is a prior, closed
  cycle and is deliberately not used here" is research bookkeeping (dev-only rule). It was
  rewritten for plainness with the same content.
- Words outside the jargon list, fixed only inside worklist units, as candidates for
  `scripts/plain_language.json`: "binding constraint", "back-plan", "gated (behind)",
  "qualitatively", "mobile-friendly".
- Checker quirk: `sentences()` treats any single capital before a period (`JK/K.`) as an
  initial and does not split there. It is harmless here because the sentence was
  reordered, but a K-band unit ending "…JK/K." will measure as one long sentence. This is out
  of scope (the plan allows only the `·` change to the checker).
- hickory-grove-christian `bands[1].steps[1].detail` "Immunization Registry Record" vs
  `bands[2/3].steps[1].detail` "Immunization Registry record". This is a source
  inconsistency, and it is kept as is.
