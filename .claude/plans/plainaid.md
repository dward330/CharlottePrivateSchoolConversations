---
name: plainaid
title: Plain-language rewrite of the Financial Aid report's English prose (13 schools, 85 sites / 85 distinct texts in src/data/financialAidReports.ts), English in four reviewed batches, then all nine prose locales; the financial-aid-tuition content blocks are left for a later plan
status: in-progress
phases: 2
batches: 4                     # Phase 1 is built in four batches, each with its own review stop
created: 2026-11-10
branch: feat/plainaid
prs: []
---

# Plain-language rewrite — Financial Aid

## Goal

Rewrite the existing English prose in the Financial Aid report so it meets the
plain-language standard in `CLAUDE.md`. The reader is an average parent, the target is
grade 8–10, and no sentence runs past 30 words. This is the third per-area follow-up,
after College Support ([`plaincollege.md`](plaincollege.md), PR #467) and Admissions
([`plainadmissions.md`](plainadmissions.md), PR #469).

**plainadmissions is the model**, and plaincollege is the model behind it. This plan keeps
their bar, their review file and guards (`scripts/plain_review.mjs`), their independent
subagent review per batch and their two-phase process. It restates what a fresh window
needs, and it adds what is specific to Financial Aid.

Financial Aid differs from both earlier areas in two ways:

- **Parents compare costs and decide whether to apply from this text.** Nearly every unit
  holds a dollar amount, a percentage, a school year, a deadline or an eligibility rule.
  It also holds distinctions a plainer sentence can blur: need-based vs merit vs discount,
  covered vs not covered, average vs typical, the school's own figure vs a third-party or
  estimated one. A shorter sentence that loses one of these is worse than the long one.
- **All 13 schools live in one file**, `src/data/financialAidReports.ts`, behind the
  `financialAidReport(slug)` accessor. The review generator walks one `.ts` file per
  school today, so Step 1 teaches it to walk an accessor file school by school.

It worked when:

- `node scripts/check_plain_language.mjs --file src/data/financialAidReports.ts` reports
  **0 issues** (86 today).
- Every ≥30-word unit is at grade ≤10, or appears in "Residual units above grade 10" with
  its reason.
- No amount, percentage, school year, date, EIN, tax-form name, quote, URL, email or proper
  noun changed. No need-based/merit/discount, covered/not-covered, required/optional,
  published/not-published, average/median/typical or school/third-party/estimate marker
  was lost or added. The extended review generator (Step 1) proves the mechanical part.
  The independent reviewer and the user check the rest.
- Every stat tile, band label, timeline date and other figure field still agrees with
  the rewritten prose beside it. They are not edited, so this holds because the prose
  figures survive char-for-char.
- The user has approved the English of all four batches, and an independent subagent has
  checked every before/after pair.
- All nine prose locales carry fresh translations of the rewritten units, and every
  overlay check is green.

**Two-phase.** It changes research prose a parent reads, so Phase 1 is English only and
stops for review. Phase 2 translates. Phase 1 is further split into **four batches with a
review stop after each**, sized for a ~15–20-minute review (see "Batch plan").

## Context

### The worklist (measured 2026-11-10 at `792fbd6a`)

The worklist was measured with a scratch script. It called the real checker's exported
`proseUnits` / `analyze` / `filterAllowed` / `locateLine` on `financialAidReport(slug)` for
every slug in `SLUGS`, per path. The totals match `npm run check:plain` exactly: the
`financial-aid-report` area shows 976 units (distinct texts), 58 flagged and 78 at grade
>10. **Worklist** = hook-flagged units plus the ≥30-word units at grade 10–12 the hook does
not flag yet (the same definition `plain_review.mjs --worklist` uses).

| School | Prose sites | ≥30 words | Hook-flagged | Grade 10–12 only | **Worklist** | Before-words |
|---|--:|--:|--:|--:|--:|--:|
| providence-day | 135 | 21 | 12 | 2 | **14** | 774 |
| charlotte-latin | 133 | 22 | 10 | 4 | **14** | 821 |
| charlotte-christian | 113 | 14 | 4 | 5 | **9** | 466 |
| charlotte-catholic | 85 | 7 | 2 | 2 | **4** | 177 |
| charlotte-country-day | 110 | 6 | 1 | 1 | **2** | 73 |
| cannon | 111 | 11 | 3 | 2 | **5** | 219 |
| covenant-day | 93 | 7 | 3 | 1 | **4** | 181 |
| davidson-day | 103 | 17 | 8 | 3 | **11** | 498 |
| carmel-christian | 86 | 7 | 3 | 1 | **4** | 224 |
| hickory-grove-christian | 73 | 8 | 4 | 2 | **6** | 290 |
| gaston-day | 102 | 11 | 5 | 2 | **7** | 329 |
| trinity-episcopal (K–8) | 81 | 10 | 2 | 1 | **3** | 161 |
| charlotte-prep (K–8) | 53 | 5 | 1 | 1 | **2** | 77 |
| **Total** | **1,278** | **146** | **58** | **27** | **85** | **4,290** |

The hook reports **86 issues** on those 58 units: 42 long sentences, 42 grade, and **2
jargon** (both `need-blind`; see "Unit notes").

**Worklist sites by field** (85): `sections[].boxes[].body` 62, `sections[].figureNote` 8,
`sections[].componentsNote` 6, `sections[].ladder[].detail` 3, `sections[].figureNote2` 2,
`sections[].plans[].detail` 2, `sections[].boxes[].title` 1, `framing[].body` 1.

**85 paths are 85 distinct texts.** No worklist text appears at a second path anywhere in
the file, so there are **no exact repeat groups** to rewrite. The shared texts that do
repeat across schools are all off the worklist (next section).

### Shared text across schools

**The shared framing text is off the worklist and stays byte-identical.** It is short and
passes the hook:

- `framing[0].title` "Unpublished ≠ deficient." (10 schools);
- `framing[0].body` "\"Not published\" flags a transparency gap — never a judgment…" (9 schools);
- `framing[1].title` "Published ≠ current." (8) and `framing[2].title` "K–12 aid only." (11);
- `framing[2].body` "Tuition assistance while enrolled — not college aid. Not financial advice." (5);
- `framing[1].body` "Every dollar figure carries the school year it applies to. Undated school
  figures are flagged, not guessed." (CCD, Cannon).

The only `framing[]` unit on the worklist is charlotte-catholic `framing[1].body`, which is
specific to that school. Guards (j) and (k) prove that nothing shared moved.

**Near-repeats on the worklist stay parallel.** These share a sentence or a list item with
another unit. Rewrite the shared part the same way at every site, and change only what
differs:

| Shared part | Sites | Batches |
|---|---|---|
| "No appeals or reconsideration process · no mid-year change-of-circumstance policy · …" (the first two `·` items) | providence-day `sections[2].boxes[3].body`, cannon `sections[2].boxes[2].body`, davidson-day `sections[2].boxes[2].body` | 1, 3 |
| "The **number of monthly installments** and any FACTS plan fee are not stated on the public pages — they live inside the family's FACTS portal." | carmel-christian `sections[5].boxes[0].body`, hickory-grove-christian `sections[4].boxes[0].body` | 4 |
| "…is **not required to file Form 990** … Every other school in this project … is a 990 filer whose aid totals can be checked against its return; here there is **no filing to check**, so the gap is structural rather than a page waiting to be found." | covenant-day `sections[3].boxes[0].body`, carmel-christian `sections[3].boxes[0].body`, hickory-grove-christian `sections[2].boxes[0].body` | 4 |
| "No sibling discount before the third child, no military or clergy discount, and no employee-remission policy is published." | covenant-day `sections[4].boxes[0].body` (worklist) and carmel-christian `sections[4].boxes[0].body` (**off** the worklist) | 4 |
| "Nothing is published for families above the … aid threshold but below comfortable full pay…" | charlotte-country-day `sections[5].boxes[1].body`, charlotte-latin `sections[6].boxes[2].body` | 1, 2 |

Two rules follow from the table:

- The first batch to rewrite a shared part sets its wording. A later batch copies that
  wording, and the reviewer checks it against the earlier batch's review file.
- Where the other site is **off** the worklist (Carmel's sibling-discount sentence), the
  shared sentence is kept **byte-identical** in the worklist unit, and only the rest of
  that unit is rewritten. That sentence is 19 words and passes on its own.

The three Form 990 units keep their differing clauses ("(bar Covenant Day)", "(bar Covenant
Day and Carmel Christian)") exactly as they are.

### How each field renders (what a rewrite may contain)

Confirmed in `src/components/FinancialAidReport.tsx`. `RichText` splits on
`/\*\*(.+?)\*\*/g`, renders the odd parts as `<strong>`, and passes every part through
`localizeMoneyText()`. It knows **only** `**bold**`; a single `*italic*` ships as literal
asterisks.

| Field | Renders via | `**bold**`? |
|---|---|---|
| `sections[].boxes[].body`, `figureNote`, `figureNote2`, `componentsNote`, `componentsAside`, `ladder[].detail`, `timeline[].detail`, `plans[].detail`, `questionsNote`, `framing[].body` | `RichText` | **yes** |
| `sections[].boxes[].title`, `boxes[].tag`, `sections[].note`, `sections[].tag`, `bullets[]` | raw `{text}` | **no** |
| `figureCaption`, `componentsTitle`, `questions[]`, `stats[].value/label`, `plans[].figure`, `ladder[].gift`, `bands[].delta` | `localizeMoneyText()` | **no** |

So the `--md-paths` regex for this area is
`(boxes\[\d+\]\.body|figureNote2?|componentsNote|componentsAside|ladder\[\d+\]\.detail|timeline\[\d+\]\.detail|plans\[\d+\]\.detail|questionsNote|framing\[\d+\]\.body)$`.
The one worklist unit outside it is charlotte-latin `sections[2].boxes[2].title`. **Never
add `**` to it.**

The report sits inside the collapsed "In-depth report" card
(`<details class="note-card note-card-report">`) in the `financial-aid-tuition` topic of
`/school/<slug>/`. `SchoolDetail.tsx` swaps the prose body for `FinancialAidReportCard`
when the card's metric key is `in-depth-report`.

### What the rewritten text must survive (checks and readers of this prose)

- **The hook** runs after every Edit/Write on `src/data/financialAidReports.ts`. It labels
  units `slug:path` and line, so it works on this accessor file today (checked:
  `--file` reports 86 issues). It blocks only at grade 12, and it enforces American
  spelling. The grade-10 target is measured by Step 1's generator.
- **`check:spelling`** (in the build) fails on any British form.
- **`check:moneytext`** (in the build) runs the real `src/lib/format.ts` over every line of
  every `.ts` under `src/data` that holds `$<digit>`, and over the work files. It asserts
  rendering never eats the punctuation after a figure or the trailing zeros of cents. This
  file is mostly figures, so a rewrite that moves `$2,500` to the end of a sentence, or puts
  a comma or `—` right after `$3.25M`, is exactly what it tests.
- **`check:tuition`** (in the build, `scripts/check_tuition_rows.mjs`) imports this file
  and re-derives the six Compare tuition rows from each school's `bands`, `meta` and
  full-run stat. None of those fields is on the worklist. Guards (f) and (k) prove they did
  not move, and `check:tuition` must stay green.
- **Stat tiles and figure fields are NOT on the worklist**: `stats[].value/label`,
  `bands[]`, `ranges[]`, `timeline[].when`, `ladder[].gift`, `plans[].figure/label`,
  `components[].label`, `meta`, `title`, `navTitle`, `tag`. Many repeat a figure the prose
  states. Examples: Latin's `$3.25M`, `6%`, `$17,900` and `14%` tiles beside
  `sections[3].boxes[0–1].body`; Prep's `$476,679` / `49` FY2025 tiles beside its FY series;
  and Catholic's band amounts `15041` / `21562` beside `sections[0].figureNote`. Because
  they are not edited, **every figure in a
  rewritten unit must survive char-for-char**, or the tile and the sentence beside it
  disagree. Guards (b) and (m) enforce this.
- **`check:dates`** reads only the work files, so it has no effect in Phase 1. In Phase 2
  it fails a translation that keeps an English month name next to a day or year outside a
  verbatim quote.
- **`check:digits`** (Phase 2) compares the numeric tokens in each new `t` with its
  English. It compares only stamps that are new since `main`, which is exactly this set.
- **`audit:moneyrender`** (browser, Phase 2) is the most important render audit for this
  area: the whole card is money, and `RichText` is the render site.

### Financial-aid content that must survive every rewrite

This is the list Step 3 applies and the reviewer checks against.

1. **Amounts, char-for-char and in the same form.** `$3.25M` never becomes `$3.25 million`.
   `$13M`, `≈$6,437`, `~4.5%`, `$0`, `$65`, ranges such as `$25,510–$36,325` and
   `$11,500–$13,750`, and the leading `~` / `≈` all stay exactly as written. What is
   attached to an amount stays attached: "per student", "per household", "non-refundable",
   "credited toward tuition", "applied to the tuition balance", "charged by the platform",
   "paid by the family". So does what an amount is: an average, a total, a cap, a share of
   the operating budget, a share of students, a reach figure.
2. **Percentages**, unspaced, with their base: "6% of operational budget", "14% of
   students receiving some funding", "a share of **students**, not of applicants", "73%
   unpriced against a one-third threshold", "will not exceed 50% of tuition", "covering
   **100% of tuition**", "up to 100% of demonstrated need".
3. **School years and fiscal years, in the form written.** `2026–27` (en dash) and
   `2026-27` (hyphen) both occur, and each keeps its own form. So do `2026-2027`, `FY2025`,
   `FY ending June 2024`, `year ending 31 July`, "Class of 2030", and "as of 30 June 2018".
   A figure keeps its year, and a year keeps its figure.
4. **Dates and deadlines, in the form written.** This file writes days first: `1 May`,
   `30 April`, `2 February`, `15 January 2027`, `14 Sep 2026`, `Jun 2018`. They never
   become `May 1` or `January 15, 2027`. Relative timing stays too: "before 1 May", "no
   refund after 30 April", "more than sixty days past due", "only after a student is
   accepted", "before enrolling", "at the time of admission", "every year".
5. **Eligibility conditions, exactly.** Grade ranges ("grades 8–11", "K–8th", "Pre-Primary,
   Primary or TK … until Kindergarten"), thresholds ("90th percentile or higher", "GPA of
   3.5 or higher", "and/or"), who qualifies ("children of current faculty and staff who
   demonstrate need", "highest-need families", "Middle and Upper School awards",
   "nominated students"), and who must file ("**both custodial and non-custodial
   parents**", "Each parent", "the only stated exception is a divorce agreement…").
6. **Need-based vs merit vs discount vs state money.** "need-based", "merit", "discount",
   "remission", "grant … not a loan", "state-voucher money paid to families, not
   institutional need-based aid", "parish-status-based", "externally funded". A sentence
   never merges two of these, and a "no merit scholarship" statement never softens.
7. **Covered vs not covered.** "Tuition includes …" lists keep every item in order.
   "an additional expense", "beyond tuition", "costs above and beyond tuition", "exclude
   the deposit, trips, …", "not part of", "on top of an award" keep their direction.
8. **Required vs optional, and who does it.** Keep `must`, "required", "had to", "optional
   Tuition Refund Plan", "by invitation", "reviewed automatically", "may ask the Business
   Office", "the school's option", and who charges, decides or assesses ("charged by the
   platform", "decided by a committee of …").
9. **Published vs not published.** Keep "not published", "is not stated", "the school
   does not say", "no … appears on the public record", "confirm with the school". Keep the
   difference between "not published" and "does not exist" ("which is not the same as
   confirming no such costs exist"; "most likely because none is offered rather than a
   price being withheld"). A rewrite never turns "not published" into silence, and never
   turns a published figure into a hedge.
10. **The school's own figure vs a third-party, archived, computed or estimated one.** Keep
    "the school's own", "third-party", "aggregator", "secondary sources", "archived
    copies", "retired aid pages", "computed", "our arithmetic", "derived", "roughly",
    "≈", "~", "at least", "up to". Keep **average vs median vs typical** apart: "an
    **average grant** … never treated here as a typical award", "no median is published",
    "emphatically not a typical award".
11. **Names exactly as printed.** Named funds and scholarships (the Paula C. Freeman
    Financial Aid Endowment, the **Gilmer L. Murdock, Jr. Endowment**, Malone, Sunny,
    Thrive, Wall and Kearney, The W. Duke Kimbrell Scholarship, Acclaim Scholars, Wolter),
    platforms (`Clarity`, `Clarity Tuition`, `FACTS`, `FACTS Grant & Aid`, `TADS`),
    programs (NC Opportunity Scholarship, Tuition Protection Program, Tuition Refund Plan,
    FIT), agencies (IRS, NCES, ProPublica, Private School Review, PrivateSchoolReview),
    documents (Report on Philanthropy, Student Profile, Academic Profile, Enrollment Tuition
    Contract, Cost of Attendance), tax forms (`1040`, `W-2`, `1099`, `Form 990`) and EINs.
12. **Quoted spans stay byte-identical**, including bold inside a quote. For example,
    Trinity's `"an **additional option** for you to explore beyond financial support."`
    and Latin's `"**a need-blind decision**"`. Rewrite around them.
13. **Section cross-references** ("Section 2", "Section 02", "Section 5") stay. They point
    at the card's numbered sections.

### Phase 1 builds fail at `check:live`, by design

Every rewritten unit gets a new FNV-1a stamp. The nine shipped `financial-aid-report`
overlays still hold the old stamps, so `npm run build` stops at `check:live` with stale
entries. `check:live` walks this topic through `ACCESSORS` (checked: on `main` it passes
every locale). The steps below run `tsc -b && vite build` and the build's later checks by
hand. Phase 2 makes the full build green.

### Phase 2 machinery (existing, unchanged)

- Work files: `src/data/overlays/work/financial-aid-report.<lang>.json`. Their `strings[]`
  hold `{ text, of, at: ["<slug>:<path>", …], t }` (es has 976). The `at` format is the
  same `slug:path` the review generator emits.
- `node scripts/i18n_splice_work.mjs --lang <code> --topic financial-aid-report` joins a
  fresh extract to the work file by stamp and reports *kept / added / dropped*. It already
  handles this topic (#312 and #356 used it to add schools).
- `node scripts/i18n_build_overlay.mjs --topic financial-aid-report --lang <code>` rebuilds
  `src/data/overlays/financial-aid-report.<lang>.json`.
- `python3 scripts/check_figures.py --topic financial-aid-report --lang <code>` works
  (checked: es shows 975 translated strings, figures intact).
- Locales: `PROSE_TRANSLATED` in `src/lib/i18n.ts` = es, bn, ht, te, fr, fa, it, hi, ar.
  For the mechanism, see `.claude/docs/prose-translation-architecture.md`. The worked
  precedent is plainadmissions' "Phase 2" implementation notes, which this plan repeats.

### The financial-aid-tuition content blocks (researched, recommended for later)

The `financial-aid-tuition` live blocks are the prose cards beside the report, such as
Tuition History and Named scholarships. They are generated from
`source-material/financial-aid-tuition/<school>/*.md` by the ingest pipeline into
`src/content/financial-aid-tuition/<school>.json`. Measured with the real `analyze` over
the 45 blocks in `financial-aid-tuition.content.es.json`, **6 are flagged or above grade
10**:

| Block | Grade | Hook | Renders to parents? |
|---|--:|---|---|
| cannon "Tuition by band and school year" (a Wayback verbatim-quote list) | 19.2 | long, grade | **No.** It follows a "Per-column sourcing" lead-in, which `stripProvenanceRaw` in `src/lib/prose.ts` drops. |
| davidson-day "Tuition by division…" (a Wayback verbatim-quote list) | 17.9 | long, grade | **No**, for the same reason |
| cannon "Related detail captured in the same snapshots" | 11.0 | — | **No.** `PROVENANCE_CAPTURED_HEADING` drops it. |
| covenant-day "Tuition History" ("**The app uses 2026-27** … for `top-tuition`") | 10.9 | — | **No.** It sits under "The year-pinning decision", which `PROVENANCE_YEAR_PINNING` drops. |
| charlotte-prep "Tuition History" | 10.4 | — | likely yes |
| davidson-day "Year-over-year increases…" | 10.1 | — | likely yes |

The render column comes from reading the provenance filters in `src/lib/prose.ts`. It was
not checked in a browser.

**Recommendation: leave them for a later plan** (suggested name `plaintuition`). The
reasons:

- **Little to gain.** Both hook-flagged blocks are verbatim Wayback quotes, which cannot be
  reworded and do not render. At most 2 rendered blocks sit just above grade 10 (10.1 and
  10.4), and neither is hook-flagged.
- **A different and heavier pipeline.** The fix is to edit the research record in
  `source-material/financial-aid-tuition/<school>/*.md`. Then re-run `build_docs.py` and
  `build_site_content.py`, which also rewrite every school's "Rebuilt" date and reorder
  `schools.json` (memory `two-topic-ingest-reorders-manifest`). The blocks are translated
  by a different mechanism: the content overlay, keyed by block hash and written by
  `i18n_extract_content.mjs`, with `check:live` gates 2 and 3. That would double Phase 2's
  mechanics for two marginal blocks.
- **Scope rule.** `CLAUDE.md` puts `source-material/` research records outside the
  plain-language scope. Editing them to change rendered text means deciding, per sentence,
  whether it is research record or parent prose. That decision deserves its own plan.

This plan therefore does not touch `source-material/`, `src/content/` or the
`financial-aid-tuition.content.*` overlays. The recommendation is recorded under
"Candidates".

## Decisions

- **Scope is `src/data/financialAidReports.ts` only** (85 sites). The content blocks are
  deferred, for the reasons in Context. The user asked for a recommendation, and this is
  the default; they can overrule it at review, before Batch 1.
- **Four batches, each with a review stop** (see "Batch plan"). Sizing uses before-words:
  a careful before/after read of figure-dense text runs at about 1,200–1,500 before-words
  in 20 minutes. The four batches are 872–1,287 words, about 15–20 minutes each. Batch 1
  is the calibration batch and also lands the tooling.
- **One branch, one PR, opened only after Phase 2.** Each batch is its own commit on
  `feat/plainaid`.
- **plainadmissions' Decisions carry over unless this section overrides them.** That
  covers:
  - keep-and-explain over `plain-ok`;
  - quoted spans untouchable;
  - `**` emphasis kept on the same words;
  - splitting as the main tool;
  - one string per path, with no structural change;
  - no fixing other standards in passing;
  - words outside the jargon list fixed only inside worklist units;
  - American spelling;
  - a fresh `general-purpose` reviewer per batch;
  - research bookkeeping rewritten for plainness, never moved.
- **`·` lists are lists** (the `·` split in `sentences()` shipped in #469). The existing
  `·` boxes (PD `sections[2].boxes[3]`, Latin `sections[2].boxes[3]`, Cannon/DD
  `sections[2].boxes[2]`, DD `sections[4].boxes[0]`) keep their `·` design and item order.
  An item is shortened only where it is the part over 30 words or pushing the grade. An
  item holding two facts may be split into two items in place (Admissions Batch 3
  precedent).
- **A long run of parallel items may become a `·` run inside the same string.** This
  applies to 4+ items of the same kind: a figure series, a criteria list, an inclusion
  list. Every item stays, in order, char-for-char for figures, after a short lead ending in
  a colon. Examples: Prep's eight-year FY series in `sections[3].figureNote`, Latin's Malone
  Foundation selection criteria in `sections[4].boxes[0].body`, and PD's tuition-inclusion
  list in `sections[0].figureNote`. The card already uses `·` runs in its boxes, so this is
  the card's own form, not a new one. Prefer plain sentences where there are three items
  or fewer.
- **Day-first dates stay day-first.** The file writes `1 Dec 2026` and `15 January 2027`,
  and the American-spelling rule is about spelling, not date order. Changing the order
  would be re-typing a published date. Guard (g) is extended to read the leading day.
- **Gloss rules for this area.**
  - **A general term may be glossed from general knowledge**: Form 990 (the yearly tax
    return a nonprofit files), EIN (federal tax ID number), aggregator → "school-listing
    website", indexed tuition (a price set by family income).
  - **A school's or program's own acronym or term is glossed only from the source**, never
    invented. FIT, PCA, TED and MACS stay as written. MACS is spelled out in Catholic's
    `framing[0].body`, so a Catholic unit may reuse that wording.
  - **A gloss must not add a marker word of a class the unit does not already hold**,
    because guard (h) reads it as a new claim. For example, gloss remission as "(reduced
    tuition for employees)", not "(an employee discount)". If no gloss avoids one, record
    it in Implementation notes.
- **`need-blind` (the area's only jargon, 2 units)**: keep and explain, per precedent.
  - Latin `sections[2].boxes[2].title` becomes "Need-blind (admission decided without
    looking at ability to pay)". That uses `plain_language.json`'s own plain phrase. The
    field renders raw, so no `**`. Its body (off the worklist) keeps the school's quote.
  - DD `sections[2].boxes[2].body` glosses both terms in its `·` item: need-blind
    (admission decided without looking at ability to pay), need-aware (ability to pay can
    count).
  - PD `sections[2].boxes[2].body` quotes both terms, and the checker exempts quotes, so it
    needs no gloss.
- **The stray single-asterisk italic is removed.** charlotte-christian
  `sections[5].boxes[1].body` contains `*received into*`. `RichText` knows only `**`, so a
  parent sees two literal asterisks. Because the unit is being rewritten anyway, drop the
  two `*` and keep the words. Never add `**` to compensate. Guard (l) counts only `**`, so
  this passes. cannon `sections[3].boxes[1].body` has the same defect off the worklist; it
  is left alone and listed under Candidates.
- **Vocabulary for this area**, applied only inside worklist units:
  - "this series", "this project", "this roster", "the schools examined here" → "among
    the schools on this site" / "on this site" (plaincollege precedent);
  - "aggregator" → "school-listing website";
  - "denominator" → "what the share is out of";
  - "the all-in estimate aborts" → "no all-in estimate is shown";
  - "net of nothing" → "before any aid";
  - "conditioning X on Y" → "requiring Y before X";
  - "char-for-char" → "exactly";
  - "traceability" → "reference";
  - "quantitative anchor" → "the one number published";
  - "a definitional one" → "a difference in what is counted";
  - "constitutes default" → "counts as a default (a missed payment)";
  - "full-pay" → "paying full tuition";
  - "structural rather than a page waiting to be found" → the plain point (there is no
    filing to find), with the same meaning.

  Keep the school's own terms: "demonstrated need", "custodial and non-custodial",
  "ancillaries" (with a gloss), "sliding scale", "tuition remission".
- **"Hazard:" leads stay leads.** `**Hazard:**` in Cannon and DD `sections[2].boxes[2]`
  keeps its bold and its position, because a parent scans for it. So do Latin's two bold
  leads in `sections[6].boxes[3]`. Latin `sections[5].boxes[2]`'s closing warning,
  `**This is the single most consequential unpublished item in this report;**`, keeps its
  bold on the same words and stays the last point in the unit.
- **The review generator gains an accessor mode and money-strength guards, and they stay
  generic** (Step 1). They are calibrated on the approved College Support and Admissions
  rewrites, so all three areas pass them.

## Batch plan (Phase 1)

| Batch | Schools | Paths | Before-words | Why this grouping |
|---|---|--:|--:|---|
| **1 — calibration** | providence-day (14), charlotte-country-day (2), trinity-episcopal (3), charlotte-prep (2) | **21** | 1,085 | PD is the model school and holds the hardest units (grade 13–17): average vs typical, the $13,026 two-figure discrepancy, third-party listings, need-based endowments, the deposit. CCD, Trinity and Prep are light, and they add both K–8 schools, a `ladder` unit, a quoted-bold span and the `·` figure-series decision. Rulings settle here. Batch 1 also lands the tooling. |
| **2** | charlotte-latin (14), charlotte-christian (9) | **23** | 1,287 | Latin holds the `need-blind` title, the Malone criteria list, the Form 990 context box, the refund-plan warning and the cost-run caveat. Christian has the 50% cap, the two mismatched document lists, the refund dates and the stray `*`. |
| **3** | davidson-day (11), cannon (5), gaston-day (7) | **23** | 1,046 | DD and Cannon share the `·` "no appeals" lists with PD (Batch 1 sets them). Gaston has the merit ladder (`by invitation`, percentile and GPA thresholds) and the 26%-vs-45% third-party figure. |
| **4** | charlotte-catholic (4), covenant-day (4), carmel-christian (4), hickory-grove-christian (6) | **18** | 872 | The three church-school Form 990 boxes and the shared FACTS sentence all land together, so they are built from one string each. Catholic's parish-rate figure note and HG's voucher-money box close it out. |

21 + 23 + 23 + 18 = **85** paths. Phase 2 runs **once**, after Batch 4 is approved.

**Batch arguments** (Steps 2 and 4), with `--topic financial-aid-report`:
- Batch 1: `--slugs providence-day,charlotte-country-day,trinity-episcopal,charlotte-prep`
- Batch 2: `--slugs charlotte-latin,charlotte-christian`
- Batch 3: `--slugs davidson-day,cannon,gaston-day`
- Batch 4: `--slugs charlotte-catholic,covenant-day,carmel-christian,hickory-grove-christian`

No `--paths` split is needed: every school sits wholly inside one batch.

**Progress tracking across windows.** Each batch is built in its own window. After each
batch, `/implement` fills that batch's row in "Batch progress". The front matter stays
`status: in-progress` through Batches 1–3. It becomes `english-done` (INDEX: *English
shipped*) only after Batch 4.

### Batch progress

| Batch | Commit | Review file | Reviewer findings (fixed) | User verdict |
|---|---|---|---|---|
| 1 | `8d9fd17f` | [review-batch1.md](plainaid-data/review-batch1.md) | 8 (all fixed: 3 meaning/claim changes incl. Prep "most expensive", 1 not-published → does-not-exist, 1 recipient → family unit change, 2 restored terms, 1 cross-school claim) | approved 2026-11-10, no rulings |
| 2 | `0b6a0ed6` | [review-batch2.md](plainaid-data/review-batch2.md) | 7 units, 10 changes (all fixed: 1 not-published → none-exists, 1 vague base + fuzzy year, 2 referents, 1 overclaim, 1 tense that made terms sound lapsed, 1 narrowed scope) | |
| 3 | | | | |
| 4 | | | | |

### Unit notes (things the drafter must not get wrong)

Seeded at planning time from reading all 85 units. These are not rulings, only traps.

- **PD `sections[3].boxes[1]`**: every published award figure is an **average grant**. It
  is never a typical award, and no median is published. Keep all three ideas.
- **PD `sections[3].boxes[3]`**: two school figures, **$3,105,191** and **$3,092,165**, and
  their **$13,026** difference. Keep "the likeliest explanation is …, but the school does
  not say so and inferring it would be a guess". That is a hedge, not a finding.
- **PD `sections[6].boxes[1]`**: every third-party figure is inside quotes. Leave the
  quotes alone. "**None** matches the school's published 2026–27 bands of
  $25,510–$36,325" keeps its bold and range.
- **PD `sections[4].boxes[2]`**: "a need-based endowed award, not a blanket
  tuition-remission benefit". Both halves stay.
- **PD `sections[1].componentsNote`**: "73% unpriced against a one-third threshold". The
  threshold is the report's own rule for when an all-in estimate is shown. Say so plainly
  and keep both figures.
- **Trinity `sections[1].componentsNote`**: keep every quoted column label ("Options in
  chart below", "Based on income in chart below", "Cost of Attendance", "included")
  byte-identical. Keep the distinction between words and dashes, and keep "no book charge
  is listed".
- **Trinity `sections[4].ladder[0].detail`**: the quote holds `**…**` inside it. Do not
  touch it.
- **Prep `sections[3].figureNote`**: eight FY pairs, each "$X to N". Keep every pair, in
  order, with its bold on the first and last.
- **Latin `sections[3].boxes[1]`**: "14% of students receiving some funding" is a share of
  **students**, not applicants. Its year is **not** published, and "adjacency is not a
  year tag". Keep all three points.
- **Latin `sections[3].boxes[4]`**: IRS figures are institutional accounting, "not a school
  statement about its aid program". Keep "Context only; it does not close the gaps
  above."
- **Latin `sections[6].boxes[1]`**: keep the four `years at $price` pairs exactly, and every
  item in "exclude the deposit, trips, …".
- **Christian `sections[2].boxes[1]`**: two tax-year document lists that disagree. Keep
  both exactly, and keep "We decline to choose a reading; confirm with the school".
- **Christian `sections[2].boxes[0]`**: a requirement that **no longer applies**. Keep
  the past tense ("had to"), "(retrieved 14 Sep 2026)" and "concludes after 2025–26".
- **Christian `sections[5].boxes[1]`**: "money received is not money awarded" must
  survive. Drop the single `*` (Decisions).
- **Cannon `sections[3].boxes[0]`**: "a grant is not a loan — it is not owed back".
- **DD `sections[1].boxes[1]`**: `$2,400 per student for 2022–23`, then "the current amount
  is not published" and "Refundability is not published either". The figure is old, and
  it stays tied to its year.
- **Gaston `sections[4].ladder[0]`**: "Awarded by invitation" (OPTIONAL marker). Ladder
  `[1]`: "nationally normed test scores at the **90th percentile or higher** and/or an
  unweighted **GPA of 3.5 or higher**". The "and/or" stays.
- **Gaston `sections[3].figureNote`**: 26% is the school's own figure and 45% is the
  third-party one. Keep "probably a definitional one rather than an error" as a hedge.
- **Catholic `sections[0].figureNote`**: the price depends on **parish participation, not
  on grade level or financial need**. Keep `$15,041`, `$21,562`, `$6,521` and "roughly
  30%".
- **HG `sections[2].boxes[1]`**: `224 recipients / $1,441,873 / ≈$6,437 average` stays
  exactly, slashes included. It is state-voucher money, **not** institutional need-based
  aid.
- **HG `sections[0].figureNote`**: the figures were confirmed by two third-party mirrors
  and match the school's published range. Keep both halves of that claim.

### Style rulings

**Carried over from plaincollege and plainadmissions (precedent; the user approved every
batch of both):**

- Keep-and-explain with a parenthetical for a named term a parent must recognize. No
  `plain-ok` was needed in 259 + 131 units there, and the target here is the same.
- "rather than modelled" → "rather than estimated"; "in this set" → "among the schools on
  this site"; "legible" → "clear"; "granular" → "detailed"; "interpolated" → "estimated".
- **A published maximum or limit is never glossed as a typical figure**, and a published
  rule is never turned into a guess. Here that covers Christian's 50% cap, Latin's "up to
  100% of demonstrated need", and every average award.
- A long chain or list is split at a boundary as "First: … Then: …" or a `·` run, keeping
  every item in order.
- A time or abbreviation ending in a period (`a.m.`, `p.m.`, `Jr.`, initials such as
  `JK/K.`) is moved off the sentence end, because the checker does not split there.
- A school's document or program name is never paraphrased ("custody agreements",
  "Enrollment Tuition Contract", "Report on Philanthropy").
- A school's own description that a split detaches is re-attributed ("The school says
  …"), never left as our claim.
- A requirement word is never softened ("must" stays "must", "needs" never becomes
  "includes").
- **The reviewer's recurring findings there are the checklist here**: strengthened claims,
  wrong referents after a split ("it", "this", "That"), dropped narrowing words, a gloss
  that changed a term's meaning, and a school statement turned into our own claim.

*Rulings from this plan's Batch 1 onward are added here by `/implement`.* If a resume
command arrives with the `<, with these rulings: …>` placeholder unfilled, read it as
"approved, no rulings", as both earlier plans did, and record that batch's choices here
as precedent.

- **Batch 1 (approved 2026-11-10): no rulings.** The resume command arrived with the
  `<, with these rulings: …>` placeholder unfilled, read as "approved, no rulings". The
  Batch 1 question about the 8 report notes with no render site was not answered, so it
  stays out of scope (Candidates). Batch 1's choices stand as precedent:
  - a long parallel list becomes a `·` run after a colon lead;
  - "this series" → "among the schools on this site";
  - a not-published claim keeps a not-published verb ("No sliding scale is published"),
    never "there is no…";
  - a gloss sits where it cannot break the not-published phrase ("The school publishes no
    median (the middle award)…");
  - "typical recipient" stays "recipient", never "family";
  - a confidentiality policy is never called a privacy policy.

### plain-ok register

*Every `// plain-ok` marker added, with path, term and reason. Target: empty.*

## Approvals needed

**None up front.** No card, section, Compare row, metric key, topic or layout changes.
This is a data-text rewrite under the standard the user set. The gates are the user's
wording reviews: one per batch, then Phase 1 → 2.

One recommendation needs a yes or no **before Batch 1**, and it has a default: the
financial-aid-tuition content blocks are **left for a later plan** (Context). If the user
wants them in, write that as a separate plan rather than widening this one.

## Out of scope

- Other research areas, `src/locales/en.json` (including the `finAid.*` chrome),
  `src/data/metricValues.ts` (the Compare tuition rows) and every chrome catalog.
- The `financial-aid-tuition` live content blocks, `source-material/financial-aid-tuition/**`
  and the `financial-aid-tuition.content.*` overlays (deferred; see Context).
- Every off-worklist field and unit, including the shared framing text, `stats[]`,
  `bands[]`, `ranges[]`, `timeline[].when`, `ladder[].gift`, `plans[].figure/label`,
  `components[]`, `meta`, `title`, `navTitle`, `sections[].tag/note`, `figureCaption`,
  `questions[]`, `bullets[]` and `sources`. The worklist is the contract.
- Any structural, card, ordering, component or styling change. No new fields, no split
  arrays, no new `verify` flags, no unit moved between fields.
- Editing `scripts/plain_language.json`, lowering `maxGrade`, or changing
  `scripts/check_plain_language.mjs`. This plan needs no checker change.
- Re-verifying figures against live school pages. This is a wording pass, not a freshness
  pass.
- Deploying. Merging is pre-authorized; `npm run deploy` is the user's call, every time.

## Steps

### Phase 1 — English

**Batch 1 runs Steps 1–8. Batches 2–4 each run Steps 2–8 for their own scope.** Before
starting Batch 2 or later, run `git checkout feat/plainaid`, then
`git fetch && git rebase origin/main`. Do not stash (memory
`never-git-stash-in-shared-tree`). If a rebase conflicts in `src/data/financialAidReports.ts`,
re-run Step 2 after resolving it, since `main` may have changed a worklist unit.

Every `plain_review.mjs` call in this plan passes `--topic financial-aid-report`.

1. **Extend `scripts/plain_review.mjs`** (Batch 1 only). Keep every existing option and
   guard, and keep the default `--dir` behavior byte-for-byte for the two earlier areas.
   Update the header comment (modes, options, GUARDS).

   **(a) Accessor mode: `--topic <topic>`.**
   - **Resolving the topic.** Resolve the topic with `ACCESSORS` from
     `scripts/i18n_topics.mjs` (`'financial-aid-report'` →
     `['../src/data/financialAidReports.ts', 'financialAidReport']`, relative to `scripts/`).
     Refuse a topic whose accessor export is not a function (`metric-values`) with a clear
     message, exit 2. `--topic` and `--dir` are mutually exclusive.
   - **School list.** `relPath` is the one file (`src/data/financialAidReports.ts`).
     `allSlugs` is every slug in `SLUGS` for which the accessor returns an entry, in the
     working tree (13 today).
   - **Loading an entry.** `entryOf()` calls `m[fn](slug)` in accessor mode instead of
     reading `m[EXPORTS[slug]]`. The base side loads the same file from the snapshot.
   - **Unit paths.** Unit paths stay un-prefixed internally, as in the per-school mode.
     `at` is `${slug}:${path}`, which matches the work files. `hookIssues()` passes
     `unitPath: \`${slug}:${path}\``, because that is the label `check_plain_language.mjs`
     uses for accessor units, so `allow` entries resolve the same way.
   - **Which guards see the whole file.** In accessor mode, the whole-file guards **(a),
     (f), (j) and (k)** run over **every** slug in the file, not only `--slugs`. A stray
     edit in another school's report must fail. Rows, the worklist and the per-unit guards
     (b), (c), (d), (g), (h), (l) and (m) run only for `--slugs` (and `--paths`).
   - **Cross-school repeats.** Guard **(j)** groups base prose units by exact text
     **across all slugs** in accessor mode, keyed `${slug}:${path}`. That is what proves the
     shared framing text did not diverge.
   - **The snapshot.** Change the archive to `git archive <base> src/data src/lib scripts`.
     Checked at planning: `financialAidReports.ts` imports `../lib/localizeData.ts`, and
     without `src/lib` the base import fails with "Cannot find module …/src/lib/localizeData.ts".
     With it, the import loads. `localizeData.ts` has no imports of its own.

   **(b) New guard (m): money, percent and year tokens, char-for-char.** Guard (b) compares
   bare digit runs, so `$3.25M` → `$3.25 million`, `75%` → `75 percent`, `~4.5%` → `4.5%`
   and `2026-27` → `2026–27` all pass it today. Add a multiset comparison of these
   whitespace-normalized tokens:
   - money: `[~≈+−-]?\$\d[\d,]*(?:\.\d+)?(?:\s?(?:[KMB]\b|million\b|billion\b|thousand\b))?`;
   - percent: `[~≈]?\d+(?:\.\d+)?%`;
   - year spans and fiscal years: `\b\d{4}\s*[–-]\s*\d{2,4}\b` and `\bFY\s?\d{4}\b`.

   Fail with `(m) <at>: money/percent/year tokens differ <diff>`.

   **(c) Extend (g) to read a leading day.** Prefix the month alternative with an optional
   `(?:\b\d{1,2}(?:st|nd|rd|th)?\s+)?`, so `1 Dec 2026` is one token and `1 Dec` →
   `Dec 1` fails as a date change, not only as a digit reorder.

   **(d) Extend (h) with financial-aid marker classes.** Case-insensitive, presence/absence
   per unit as today:
   - NEED: `need-based|based on (?:financial )?need|demonstrated need|financial need|highest-need`;
   - MERIT: `\bmerit\b`;
   - DISCOUNT: `\bdiscounts?\b`;
   - REMISSION: `\bremissions?\b`;
   - LOAN: `\bloans?\b`;
   - NOTCOVERED: `not (?:cover|include)(?:d|s)?|does(?: not|n[’']t) (?:cover|include)|exclud(?:e|es|ed|ing)|additional (?:expense|cost)s?|beyond tuition|above and beyond|on top of|separate(?:ly)? (?:billed|charged)`. It is masked before COVERED, the same way OPTIONAL is masked before REQUIRED;
   - COVERED: `\b(?:includes?|included|including|covers?|covered|covering)\b`;
   - ESTIMATE: `~|≈|\broughly\b|\bapproximately\b|\bestimat\w*|\bprobabl[ey]\b|\blikel(?:y|iest)\b`;
   - BOUND: `\bup to\b|\bat least\b|\bat most\b|\bno more than\b|\bexceed\b|\bceiling\b|\bcap\b|\bor higher\b|\bor more\b`;
   - DERIVED: `\bcomput\w*|\bderiv\w*|\bcalculat\w*|\barithmetic\b`;
   - THIRDPARTY: `third[- ]party|secondary sources?|aggregators?|mirrors?|archived|Wayback|retired`;
   - AVERAGE: `\baverage\b|\bmean\b`; MEDIAN: `\bmedian\b`; TYPICAL: `\btypical(?:ly)?\b`.

   Keep AVERAGE, MEDIAN and TYPICAL as separate classes, so "average" → "typical" fails
   twice. A synonym inside one class is free. Leaving a class, or entering one, fails.

   **(e) Negative tests, one per new or changed guard**, each isolated (memory
   `negative-test-must-isolate-the-assertion`):
   - copy `src/data/financialAidReports.ts` byte-for-byte to the scratchpad;
   - plant exactly one fault in one Batch 1 unit and run `--check`;
   - confirm it exits 1 with **that guard's letter and that `slug:path`**, and nothing
     else where possible;
   - restore from the copy and confirm `cmp` is clean.

   The faults:
   - (m) PD `$2,500` → `$2,500.00`, and separately a `2026–27` → `2026-27`;
   - (g) Trinity `framing[0].body` `1 Dec 2026` → `Dec 1 2026`;
   - (h) PD `sections[3].boxes[1].body`: "average grant" → "typical grant" (expect AVERAGE
     lost **and** TYPICAL added);
   - (h) PD `sections[4].boxes[0].body`: delete "need-based";
   - (j) edit one site of the shared `framing[0].body` (Latin's) — expect (j) **and** (k),
     because that path is on no worklist;
   - (k) edit one `stats[].value` in Prep (non-prose → (f) and (k)), and separately one
     off-worklist prose unit in Cannon (in a school **outside** `--slugs`, to prove the
     whole-file reach) — expect (k) only;
   - (l) add `**` to Latin `sections[2].boxes[2].title` (run with `--slugs charlotte-latin`).

   **(f) Calibrate on approved work, and record the result** in Implementation notes:
   - College Support: `node scripts/plain_review.mjs --dir src/data/collegeSupportPrograms --base c761a159 --check`
     (the commit before #467). plainadmissions recorded 3 known (h) hits there (Batch 1
     notes). Any new hit from the new classes is either a real past slip, which you list
     under Candidates, or a class that is too tight. Loosen a class only with a recorded
     reason.
   - Admissions: in a scratch worktree, run
     `git worktree add <scratchpad>/wt-adm b181a8d8` (the #469 merge commit), then from
     inside it
     `node scripts/plain_review.mjs --dir src/data/admissionsPrograms --base 9c0e0720 --check`
     (the commit before #469). Run it in a worktree, not on `main`, because #470 later
     **added** units to Charlotte Latin, which guard (a) would report as a structural
     change. Then `git worktree remove <scratchpad>/wt-adm`. Read every (m), (g) and (h)
     hit the same way.
   - The default `--dir` mode must give the same pass/fail result as before the change
     on both runs, apart from hits from the new guards and classes.
2. **Generate this batch's worklist.**
   `node scripts/plain_review.mjs --topic financial-aid-report --slugs <batch slugs> --worklist .claude/plans/plainaid-data/worklist-batch<N>.json`.
   Compare its counts with the Batch plan table. If they differ, `main` moved. Use the
   regenerated list and note the difference in Implementation notes.
3. **Draft, measure, then apply** (plainadmissions' method):
   - Write the drafts to a scratch JSON keyed by `at`.
   - Run a scratch script over every draft. It calls the real `analyze`, plus the Step 1
     guard functions, against the original.
   - Only then apply with an exact-match script that refuses any old literal it cannot
     find, or finds more than once. Build each near-repeat from one shared string in the
     draft file.
   - A scripted write bypasses the hook. Afterwards run
     `node scripts/check_plain_language.mjs --file src/data/financialAidReports.ts`, and
     fix any remaining **batch** unit with Edit, so the hook sees it.

   Apply the Decisions, the Style rulings, the Unit notes and **every item of
   "Financial-aid content that must survive"**. For every unit:
   - Same meaning, same hedges and conditions, same direction of every comparison
     ("larger-looking", "a year behind", "well outside the pattern").
   - Sentences ≤30 words, aiming for 15–20. Units of 30+ words at grade ≤10.
   - Keep each string's quote delimiter valid TS. An apostrophe in a single-quoted string
     stays `’` or is escaped. Check the delimiter of every string you edit; this file mixes
     them.
4. **Measure.**
   - `node scripts/check_plain_language.mjs --file src/data/financialAidReports.ts`. After
     Batches 1–3, confirm that **every remaining issue is on a later batch's school**.
     After Batch 4: **0 issues**.
   - `node scripts/plain_review.mjs --topic financial-aid-report --slugs <batch slugs> --allow <worklists 1..N> --md-paths '(boxes\[\d+\]\.body|figureNote2?|componentsNote|componentsAside|ladder\[\d+\]\.detail|timeline\[\d+\]\.detail|plans\[\d+\]\.detail|questionsNote|framing\[\d+\]\.body)$' --aid-markers --out .claude/plans/plainaid-data/review-batch<N>.md --check`:
     exit 0, with every row reading `hook: pass`. Batch N passes every worklist from
     1..N, because the base is `main` and earlier batches' changes are still in the diff.
   - Put every row with an after-grade above 10 into "Residual units above grade 10", with
     a one-line reason. Expected candidates are a run of fund names (Latin's Malone,
     Sunny, Thrive, Wall and Kearney; PD's named endowments), the Form 990 / EIN units, and
     Prep's FY series.
   - Confirm that every near-repeat in this batch reads identically at all its sites, and
     matches the earlier batch's wording where one set it. Grep one shared sentence per
     group.
5. **Independent review.** Spawn one `general-purpose` subagent with the Agent tool. Give
   it:
   - the path to `review-batch<N>.md`;
   - this plan's sections "Financial-aid content that must survive", "Unit notes",
     Decisions and Style rulings;
   - `src/data/financialAidReports.ts`;
   - for Batches 3–4, the earlier review file that set each shared wording.

   It never sees the drafting conversation. Tell it to check **every** row for:
   - meaning drift, or a strengthened or weakened claim;
   - a dropped hedge or condition ("probably", "likeliest", "at least", "up to", "only
     after", "where");
   - need-based / merit / discount / remission / state money merged or relabeled;
   - covered vs not covered, or what a fee is attached to, changed;
   - average, median or typical swapped, or a cap read as a typical award;
   - the school's own figure vs a third-party, archived or computed one blurred;
   - required/optional, or who charges or decides, changed;
   - published/not-published changed, or "not published" turned into "does not exist";
   - an amount, percentage, school year, date, eligibility threshold or name changed;
   - a referent made ambiguous by a split;
   - a sentence that is now plainer but wrong.

   It fixes each finding in the source file (the hook still applies), then re-runs Step 4's
   commands. It returns a findings list: path, problem, fix. Regenerate the table, then
   append the findings under `## Independent review` at the end of `review-batch<N>.md`
   (the generator keeps that tail). Record the count in "Batch progress".
6. **Checks.**
   - Run `npx tsc -b`, then `npx vite build`.
   - Then run, by hand:
     `npm run check:schema && npm run check:spelling && npm run check:tuition && npm run check:schoolurls && npm run check:chrome && npm run check:runtime && npm run check:moneytext && npm run check:dates && npm run check:spans`.
   - `npm run check:live` **is expected** to report stale `financial-aid-report` stamps,
     for exactly the rewritten texts so far. Record the count, which is Phase 2's input.
     Confirm that no other topic appears.
   - If `check:schema` drifts, run `npm run schema` and commit the doc. No drift is
     expected, because the generator reads this file's card keys, not its prose.
7. **Browser check.** Run `npx vite preview` after the build. Use headed Chrome via
   Playwright (memory `headed-chrome-via-playwright`). Do not wait on `networkidle`
   (memory `browser-check-networkidle-hangs`). Probe with `textContent`, not `innerText`
   (memory `innertext-case-false-pass`). For each batch school:
   - Open `/school/<slug>/?topic=financial-aid-tuition`, and open the In-depth report card
     (`details.note-card-report`) inside `#topic-financial-aid-tuition`. Scope every probe
     to that section, because a school page renders every topic.
   - Confirm that every rewritten unit renders (match the live module's text with `**`
     stripped), that every `**…**` span renders inside a `<strong>`, and that **no literal
     `*` or `**`** appears in the card. After Batch 2, that includes Christian's former
     `*received into*`.
   - Confirm that the rewritten figures render through `localizeMoneyText` unchanged in
     English (`$3.25M` stays `$3.25M`).
   - Take one look at 390px width on one batch school with the report card open, and check
     for no page overflow.
8. **Commit and stop.** Stage explicit paths only. Run `git status --short` first, and never
   `git add -A`. Stage:
   - `src/data/financialAidReports.ts`;
   - `.claude/plans/plainaid-data/worklist-batch<N>.json` and `review-batch<N>.md`;
   - Batch 1 only: `scripts/plain_review.mjs`;
   - this plan, with "Batch progress" filled in.

   Commit with the message `plainaid: batch <N> English — <schools>`. Push, then check that
   `git rev-parse HEAD` equals `git ls-remote origin feat/plainaid` (memory
   `git-push-silently-noop`). Do **not** open the PR. Report to the user:
   - the review file path;
   - the before/after counts;
   - the residual units;
   - the reviewer's findings;
   - the URLs from Step 7.

   Give the paste-in command for the next window:
   - after Batches 1–3:
     `/implement plainaid — Batch <N+1>. Batch <N> English is approved<, with these rulings: …>.`
   - after Batch 4: set `status: english-done` and the INDEX row to *English shipped*.
     Then give `/implement plainaid — Phase 2. All four English batches are approved. Run only Phase 2.`

   **→ STOP after each batch.** On resume, put the user's rulings into "Style rulings" and
   their verdict into "Batch progress" *before* the next batch's Step 2. If the user asked
   for changes to a batch already built, make them, re-run Steps 4–6 for that batch, and
   amend its review file.

**→ STOP. After Batch 4, `/implement` ends its turn and waits.** Nothing below runs until
the user confirms all four batches.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar), on the
**`financial-aid-report` overlay topic only**. No chrome catalogs and no content overlay.
For the mechanism, see `.claude/docs/prose-translation-architecture.md`. The precedent is
plainadmissions' Phase 2 notes, which this repeats. The locale traps in those docs apply
unchanged:

- figures char-for-char, with `%` unspaced;
- lakh/crore regrouping and RTL isolates are render-layer, never typed into `t`;
- searchable identifiers stay Latin (`Clarity`, `FACTS`, `TADS`, `IRS`, `NCES`, `EIN`,
  `Form 990`, `1040`, `W-2`, `1099`, `FY2025`);
- `fr` identifiers (`check:fr`).

Three traps are specific to this area:

- **Money is localized at render, never in `t`.** `RichText` sends every segment through
  `localizeMoneyText()`, so `t` keeps `$3.25M`, `$2,500` and `≈$6,437` exactly as the
  English has them. A `t` holding `3,25 M US$` would be localized twice. The gate's
  digit-token check and `check:sepdrift` catch most of this. `audit:moneyrender` catches
  the rest on the page.
- **Day-first dates translate; their digits do not** (`check:dates`). `1 Dec 2026` → es
  `1 de diciembre de 2026`. Follow the reviewed predecessor's form for each date. First of
  the month is fr `1er`, it `1º`, ht `1ye`.
- **Fund, scholarship and program names** follow the reviewed predecessor. Where it kept
  a name in English (the Paula C. Freeman Financial Aid Endowment, Malone, Acclaim
  Scholars), keep it. Where it translated a descriptive name, keep that translation.

Steps:

1. **Snapshot the base work files** before splicing. Run
   `git show main:src/data/overlays/work/financial-aid-report.<lang>.json` for each locale,
   into the session scratchpad. They hold the native-reviewed translations of the *old*
   English.
2. **Splice.** Run `node scripts/i18n_splice_work.mjs --lang <code> --topic financial-aid-report`
   for each locale. Expect *added* ≈ *dropped* ≈ the Batch 4 `check:live` stale count
   (≈85). A rewrite that happens to equal an existing string merges into it and lowers
   *added*. If the counts are lopsided, stop and investigate.
3. **Translate each *added* unit as a revision of its reviewed predecessor.** Pair it with
   the dropped unit at the same `at` path. Give the translator the old English, the old
   `t` and the new English. The instruction is to **revise the reviewed translation to say
   what the new English says**. Keep its terminology, register, date forms and reviewed
   choices wherever the meaning is unchanged. Split sentences where the English now splits,
   and turn a run into a `·` run where the English now does. The final `t` is keyed to the
   **new stamp**, never to an index.

   Run nine parallel `general-purpose` subagents, one per locale. Each gets its own scratch
   subdirectory, reads only its task file and writes only its own output file (memory
   `parallel-locale-agents-collide`).

   A scratch apply script gates every output before it writes it to the work file. The
   gate checks:
   - the numeric-token multiset against the new English;
   - the money/percent/year token multiset (guard (m)'s regexes);
   - the `**` count;
   - no bidi controls and no non-Western digits;
   - `t` ≠ English;
   - the 0.4–2.5 length ratio;
   - no English month or weekday name outside a quote the English also quotes.
4. **Rebuild** each overlay with
   `node scripts/i18n_build_overlay.mjs --topic financial-aid-report --lang <code>`.
5. **Verify by stamp, not by `check_work_integrity`**, which reports false "violations"
   after a splice (memory `comparerows-shipped`). Run it anyway. Then prove integrity
   against the snapshot: every kept stamp has `text` and `t` byte-identical, every new
   stamp is non-blank, and every locale passes.
6. **Run the Phase 2 checks** (Verification below). Then:
   - fill in Implementation notes;
   - set the plan's `status: implemented` and `prs: [<n>]`, and the INDEX row to
     *Implemented* with the PR link;
   - open the PR with `--body-file`. The body has the per-school counts, links to the four
     review files, a summary of the reviewer findings, the guard calibration result, and
     the content-blocks recommendation;
   - squash-merge (pre-authorized), then `git checkout main && git pull`.

   **Do not deploy.** Report "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `src/data/financialAidReports.ts` | edit: rewrite the 85 worklist prose sites; no key, path, figure, date, name or non-prose change |
| `scripts/plain_review.mjs` | edit: `--topic` accessor mode (whole-file guards over every slug; cross-school (j)); snapshot includes `src/lib`; guard (m) money/percent/year tokens; (g) reads a leading day; financial-aid marker classes in (h); header comment |
| `.claude/plans/plainaid-data/worklist-batch{1..4}.json` | new: per-batch worklists |
| `.claude/plans/plainaid-data/review-batch{1..4}.md` | new: before/after review tables + independent-review findings |
| `src/data/overlays/work/financial-aid-report.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): spliced and translated |
| `src/data/overlays/financial-aid-report.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2): rebuilt |
| `.claude/plans/plainaid.md`, `.claude/plans/INDEX.md` | edit: progress, rulings, notes, status |
| `.claude/docs/DATA-SCHEMA.md` | only if `check:schema` drifts (not expected) |

`package.json` needs no edit, because `plain:review` already exists. No skill or slash
command changes, so `.claude/SKILLS.md` is not touched.

## Verification

### Phase 1 — English (per batch)

- [ ] `node scripts/check_plain_language.mjs --file src/data/financialAidReports.ts`:
      every remaining issue is on a later batch's school. After Batch 4, 0 issues.
- [ ] `node scripts/plain_review.mjs --topic financial-aid-report --slugs … --allow … --md-paths … --aid-markers --check`:
      exit 0. Every row is `hook: pass`.
- [ ] Batch 1: each new guard's negative test failed on its planted fault with the right
      letter and `slug:path`, and the file was restored to `cmp`-clean. The College
      Support and Admissions calibration runs are recorded. The worktree is removed.
- [ ] The `·` boxes keep ` · ` between items, in the same order. Every new `·` run holds
      every item of the sentence it replaced.
- [ ] Every after-grade >10 row is listed in "Residual units above grade 10".
- [ ] The near-repeats read identically at every site, across batches.
- [ ] The independent subagent review is done, and its findings are fixed and recorded.
- [ ] `npx tsc -b` is clean. `npx vite build` succeeds. The Step 6 list is green,
      including `check:tuition` and `check:moneytext`. The `check:live` stale count is
      recorded, and it covers only `financial-aid-report`.
- [ ] Browser: the In-depth report card is open on each batch school. Bold renders as
      `<strong>`, with no literal `*` or `**`. One 390px look.
- [ ] After Batch 4: `npm run check:plain` shows **financial-aid-report Flagged 0**
      (baseline 58). Grade >10 equals the residual count (baseline 78). Every other area
      is unchanged, `financial-aid-tuition` included.

### Phase 2 — Locales

- [ ] `npm run check:live && npm run check:runtime`: clean.
- [ ] `npm run check:digits`: no finding on a rewritten unit.
- [ ] Per locale: `npm run check:sepdrift -- --lang <code>` and
      `python3 scripts/check_figures.py --topic financial-aid-report --lang <code>`.
- [ ] `npm run check:dates`, `check:moneytext`, `check:currency`, `check:fr`, `check:hi`,
      `check:fa`, `check:bidi`; `node scripts/check_work_integrity.mjs`, followed by the
      by-stamp proof (Phase 2 Step 5).
- [ ] `npm run i18n:leaks -- --lang <code>`: no flag on a rewritten path. It prints `at`
      paths, not stamps, so match its flags against the worklist paths (memory
      `plainadmissions-shipped`).
- [ ] `npm run build`: green end to end.
- [ ] `npm run build && npx vite preview`, then
      `npm run audit:moneyrender -- --lang es --lang fr` and
      `npm run audit:daterender -- --lang es --lang fa --lang hi`: no new finding on a school
      page's financial-aid section compared with `main`. Known noise is the Latest News
      feed, which is never translated. `audit:daterender` takes 9+ minutes.
- [ ] Browser: one Batch 1 school (providence-day) and one Batch 4 school
      (hickory-grove-christian) in `es`, `fa` and `hi` (`?lang=`), with the report card
      open. Check that every rewritten unit is in the locale, that figures and
      day-first dates are intact, and that ranges read correctly in RTL. Strip bidi
      isolates before probing text (memory `ccdprofile-shipped`).

## Risks

| Risk | Mitigation |
|---|---|
| A split moves or re-forms an amount, percentage or school year (`$3.25M` → `$3.25 million`, `2026-27` → `2026–27`) | New guard (m), plus (b) digits; stat tiles untouched and proven by (f)/(k); `check:moneytext` and `check:tuition` in Step 6 |
| Need-based / merit / discount, covered / not covered, or average / typical blurred | New (h) classes; Unit notes; the reviewer's checklist; the user per batch |
| A third-party or computed figure reads as the school's own | THIRDPARTY / DERIVED / ESTIMATE classes; "must survive" item 10 |
| A shared framing sentence or near-repeat diverges across schools | Cross-school (j) in accessor mode; near-repeat table; later batches copy the earlier wording |
| A stray edit lands in a school outside the batch (one file holds all 13) | (a), (f), (j), (k) run over every slug in accessor mode; negative test proves it |
| `**` added to a raw field (`boxes[].title`) ships literal asterisks | Guard (l) with this area's `--md-paths`; browser check for literal `*` |
| New guards false-positive and block legitimate rewrites | Calibrated on the approved College Support and Admissions rewrites in Step 1; loosen only with a recorded reason |
| A Phase 2 `t` localizes money itself, so it renders twice-localized | Gate token checks; `check:sepdrift`; `audit:moneyrender` |

## Open questions

- **Content blocks.** **Default:** leave the 6 flagged `financial-aid-tuition` blocks for
  a later plan (Context). The user may overrule this before Batch 1.
- **Words outside the jargon list** ("aggregator", "denominator", "remission", "indexed
  tuition", "aborts"). **Default:** fix them only inside worklist units (Decisions
  vocabulary), and list them in Implementation notes as candidates for
  `plain_language.json`. Do not edit that file.

## Residual units above grade 10

*Filled in by `/implement`: path, after-grade, reason.*

| Path | After-grade | Reason |
|---|--:|---|

## Implementation notes

### Batch 1 (2026-11-10)

**Step 1 — `scripts/plain_review.mjs`.**
- `--topic <accessor-topic>` mode, as planned: entries come from `financialAidReport(slug)` (13 schools), units are labeled `slug:path` for the hook, (a)/(f)/(j)/(k) run over every school, and (j) groups repeats across schools. A non-function accessor (`metric-values`) exits 2. The snapshot now archives `src/lib` too.
- Guard (m) (money, percent, year tokens) and the leading-day form of (g) added as planned. **One fix found by calibration:** the money pattern first read digits as `[\d,]*`, so a comma after a figure (`$275,`) became part of the token and moving the figure tripped (m). Digits are now grouped strictly (`\d+(?:,\d{3})*`).
- **Deviation: the financial-aid marker classes are opt-in (`--aid-markers`).** The plan wanted them always on. Calibrated on the approved College Support rewrites (`--base c761a159`), they produced 36 hits, all equivalent rewordings in a non-cost sense ("it covers" describing a table, "leaves out", "worked out", "mean" → "average"). Tuning them to zero there would gut them for the one area they exist for. So every batch command in this plan passes `--aid-markers`; the default mode is unchanged.
- **Class refinements, each from a read calibration hit** (recorded in the MARKERS comments): THIRDPARTY gains "outside group/source/seal…"; DERIVED gains "work(ed) out"; MEDIAN gains "middle student/value/award"; ESTIMATE gains "interpolated"/"modelled" (approved plaincollege rulings map them to "estimated"); NOTCOVERED gains "leaves out"/"not counted" and takes "on top of" only before a cost word; BOUND takes "ceiling" only as a money/aid limit; AVERAGE drops bare "mean" (almost always the verb) and keeps "mean SAT/award/…"; COVERED stays broad (every include/cover form is one class, so "including X" ↔ "It also includes X" is free).

**Calibration result (recorded).**

| Run | Default mode | With `--aid-markers` |
|---|---|---|
| College Support, `--base c761a159` | 3 failures: the 3 known (h) hits from plainadmissions (Latin REQUIRED, DD UNPUBLISHED, DD REQUIRED). **(m) and the new (g): 0 hits.** | 34 (3 known + 31 aid-class rewordings, all read, none a slip) |
| Admissions, worktree at `b181a8d8`, `--base 9c0e0720` | 16 failures, **all the approved cycle relabel** (PD and Latin `2026–27` → `2027–28`, 4 units each, as (b) and (m)). (m) adds nothing else once the comma fix landed. | 24 (16 relabel + 8 COVERED: splits that turned "including X" into "It also includes X") |

The worktree was removed afterwards.

**Negative tests** (file copied, one fault planted, `--check` run, file restored, `cmp` clean each time):

| Guard | Fault planted | Result |
|---|---|---|
| (m) | PD `$2,500` → `$2,500.00` | exit 1: (b) and (m) on `providence-day:sections[1].boxes[0].body` |
| (m) | PD `(2026–27)` → `(2026-27)` | exit 1: (m) only |
| (g) | Trinity `**1 Dec 2026**` → `**Dec 1 2026**` | exit 1: (g) `-1 Dec 2026 +Dec 1 2026`, plus (k) (off-worklist path) |
| (h) | PD "need-based" deleted | exit 1: NEED lost only |
| (h) | PD "average grant" and "an average" → "typical" | exit 1: AVERAGE lost (2→0). The plan expected TYPICAL added too, but that unit already says "typical", so TYPICAL is a count note. A first plant that changed only one of the two "average"s correctly did not fail. |
| (j) | Latin's copy of the shared `framing[0].body` | exit 1: (j) across the 9 schools, plus (k) |
| (f)/(k) | Prep `stats[1].value` | exit 1: (f) and (k) |
| (k) | Cannon `framing[2].body` (a school **outside** `--slugs`) | exit 1: (k) only, proving the whole-file reach |
| (l) | `**` added to Latin `sections[2].boxes[2].title` | exit 1: (l) only |

**Build.** The worklist matched the plan: 21 units. All 21 drafts were measured with the real `analyze` before applying. Four needed a second pass (PD documents box 11.4, PD Brockmeier 10.9, Trinity componentsNote's 33-word sentence, Trinity aid box 10.4). Applied by exact literal; the file's existing `\'` escaping was kept. Guard (h) then caught one real slip: the gloss in "No median (the middle award) is published" broke the not-published phrasing. It now reads "The school publishes no median (the middle award) …", fixed with Edit.
- The `·` decision was used twice: PD's tuition-inclusion list and Prep's eight FY pairs (every pair kept, in order, bold on first and last).
- The shared "no appeals" items, which Batch 3 copies for Cannon and DD, now read: "No process to appeal or ask for a second look · no policy for a mid-year change in a family's situation".
- The shared CCD "Nothing is published for families above the typical aid threshold…" wording, which Batch 2 mirrors for Latin `sections[6].boxes[2]`, is in review-batch1.md row 16.

**Measure.** The review generator, every guard on (`--allow` worklist 1, `--md-paths`, `--aid-markers`), exits 0: 21/21 `hook: pass`, after-grade >10: 0. Batch 1 adds no residual rows. `check_plain_language.mjs --file` reports 61 issues (86 before), none on a Batch 1 school.

**Independent review: 8 findings, all fixed** (see the review file): a documents sentence that contradicted the automatic I.R.S. transfer; "no sliding scale" turned from not-published into does-not-exist; Prep's "most expensive stretch" lost "relative to aid" and became false against Prep's own bands; Trinity "works alongside" assumed the two aids combine; "typical family" changed the unit from recipient; "published terms" implied the contract is public; "privacy policy" restored to "confidentiality policy"; a cross-school claim pinned to one report.

**Step 6 checks.** `npx tsc -b`, `npx vite build`, `check:schema`, `check:spelling`, `check:tuition` (62 cells match), `check:schoolurls`, `check:chrome`, `check:runtime`, `check:moneytext`, `check:dates` and `check:spans` are green. `check:live` reports **21 stale stamps per locale, all `financial-aid-report`**: exactly the 21 rewritten texts. (It lists 20 and then "… and 1 more (display capped)".) Running total for Phase 2: **21**. `check:plain` now shows financial-aid-report Flagged **42** (58), Grade >10 **59** (78).

**Step 7 browser check** (headed Chrome via Playwright, `vite preview`, In-depth report card opened inside `#topic-financial-aid-tuition`). All 20 rendered units render, every bold span is inside a `<strong>`, and there is no markdown-shaped asterisk in any card. (Trinity's `$22,605*` footnote marks are content in an off-worklist unit.) At 390px, PD with the card open has `scrollWidth` 390, so there is no overflow.

**Found while checking: report notes with no render site.** Prep `sections[3].figureNote` did not appear on the page. In `FinancialAidReport.tsx`, `figureNote`/`figureCaption` render only inside a chart (bands, ranges or ladder) and `figureNote2` only with bands or a ladder. A section with stat tiles and no chart drops them. **8 fields never render** today: covenant-day `sections[3].figureNote`, carmel-christian `sections[3].figureNote`, hickory-grove-christian `sections[2].figureNote`, gaston-day `sections[3].figureNote`, trinity-episcopal `sections[3].figureNote` and `figureNote2`, charlotte-prep `sections[3].figureNote` and `figureNote2`. Three are on this plan's worklist (Prep, Gaston, HG). This is pre-existing and a component change, so it is out of scope (see Candidates). The three are still rewritten, since they are extracted and translated.

### Batch 2 (2026-11-10)

**Resume.** Batch 1 was approved with no rulings (placeholder unfilled; recorded under "Style rulings"). `main` had not moved, so the rebase was a no-op.

**Worklist** matched the plan: 23 units (charlotte-latin 14, charlotte-christian 9).

**One guard widening, with its reason.** UNPUBLISHED now also counts "publishes nothing" (`(?:publishes|states|names) (?:no|nothing)`). Latin `sections[6].boxes[2]`'s before-text says "It publishes nothing about families…" and held no UNPUBLISHED marker, so any plain not-published wording would have read as a marker *added*. After the change the College Support calibration still shows exactly its 3 known hits, and Batch 1 still passes.

**Drafts were measured first.** Three needed a second pass: Latin `sections[3].boxes[3]` (11.1), a 33-word sentence in Latin `sections[4].boxes[2]`, and Christian `sections[3].boxes[2]` (11.4, then 10.3). Every guard passed on the first `--check` after applying.
- Latin `sections[2].boxes[2].title` → "Need-blind (admission decided without looking at ability to pay)", with no `**`.
- Latin `sections[6].boxes[2]` mirrors Batch 1's CCD wording ("…above the aid threshold who would still find full tuition hard to pay"). It keeps Latin's "the aid threshold", not CCD's "typical".
- Latin `sections[0].figureNote` and `sections[3].boxes[1]` end a sentence in a quote. The checker's quote-strip quirk (Candidates) merges it with the next sentence, so the next sentence is kept short.
- Christian's stray `*received into*` lost its single asterisks; the words are kept.
- `·` runs: Latin's four tuition-page figures, the three IRS-filing figures, and the six Malone criteria.

**Measure.** The review generator, every guard on (`--allow` worklists 1–2, `--aid-markers`), exits 0: 23/23 `hook: pass`, after-grade >10: 0. Batch 2 adds no residual rows. `check_plain_language.mjs --file` reports 42 issues (61 after Batch 1), none on a Batch 1 or 2 school.

**Independent review: 7 units, 10 changes, all fixed** (see the review file):
- Latin's middle-income box had become "there is no published…", which can read as "none exists". It now reads "It publishes no…".
- "Its base is clear and right" and "Its year is not clear" were vague. They now read "it is clear what the share is out of" and "It carries no year".
- Two referents after a split: Malone "endowed this", and Christian "It no longer applies" after a new "It is a state program" sentence.
- "fills exactly the gap" overclaimed "addresses precisely".
- The past tense made Christian's unconfirmed 2023–24 terms sound lapsed.
- "They do not list them" narrowed "not documented" to the fundraising materials.

The reviewer also flagged the 62% figure (Candidates).

**Step 6 checks.** `npx tsc -b`, `npx vite build` and the nine later checks are green. `check:live` reports **44 stale stamps per locale, all `financial-aid-report`** (21 + 23). Running total for Phase 2: **44**. `check:plain` now shows financial-aid-report Flagged **28**.

**Step 7 browser check.** Every rewritten unit on both schools renders, every bold span is inside a `<strong>`, and no markdown-shaped asterisk appears (Christian's former `*received into*` included). At 390px, Latin with the card open has `scrollWidth` 390.

### Candidates noticed, not acted on

*Seeded at planning time. `/implement` adds to this list.*

- **charlotte-christian `sections[5].boxes[1].body`: "Section 4 is the weak point, at 62%".** No section in CHARLOTTE_CHRISTIAN has confidence 62: `sections[3]` "Discounts & Ceiling" is 80, and the source notes never say 62%. The figure predates this plan and was kept char-for-char. It needs a data check against the source report.

- **8 report notes never render** (Batch 1 notes): `figureNote`/`figureNote2` in a stats-only section have no render site in `FinancialAidReport.tsx`. Those include Gaston's 26%-vs-45% explanation and Prep's FY series. Fixing it is a component change (render the notes under a stats-only strip), so it needs the user's call.
- **Checker quirk:** a sentence ending in a closing quote before the period (`…in chart below". It`) is not split. The strip step turns the quote into `Q`, and the initials rule reads `Q.` as an initial. Harmless once reworded (Trinity componentsNote), but a unit ending that way measures as one long sentence. The plan does not change the checker.

- **The financial-aid-tuition content blocks** (6 flagged; Context). Recommended as a
  later plan, `plaintuition`. A browser check should first confirm which of the six
  render. Four look hidden by the provenance filters in `src/lib/prose.ts`.
- **cannon `sections[3].boxes[1].body`** contains a single-asterisk italic off the
  worklist. `RichText` renders it as literal asterisks. It is a one-unit render fix that
  needs its own translation pass.
- **`bullets[]` render raw**, without `localizeMoneyText()` (`FinancialAidReport.tsx`
  `Boxes`). No bullet holds a `$<digit>` today (checked), so nothing renders wrong. A
  future bullet with money would show the English form in every locale.
- **The shared framing titles** "Unpublished ≠ deficient." and "Published ≠ current." use
  the `≠` sign, which an average parent may not read as "is not". They are off the
  worklist (short, hook-clean, shared by 8–10 schools), and are left unchanged.
- **Research bookkeeping in parent-facing prose**, which may belong in `verify` flags
  (dev-only rule). It is rewritten for plainness with the same content, and not moved:
  - charlotte-latin `sections[4].boxes[1].body`: "(Document summary only — the body could
    not be opened.)";
  - charlotte-christian `sections[2].boxes[1].body`: "We decline to choose a reading";
  - charlotte-christian `sections[4].boxes[0].body`: "we could not confirm they are still
    current";
  - hickory-grove-christian `sections[2].boxes[1].body`: "recorded here only for
    traceability";
  - providence-day `sections[4].boxes[0].body`: "the most recent edition located";
  - gaston-day `sections[3].boxes[2].body`: "used throughout this project".
