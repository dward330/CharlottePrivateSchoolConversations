---
name: ingest-source-material
description: >
  Ingest new research files into the Charlotte private-school project. Use whenever
  reference files (PDFs, .md, .txt) are added, changed, or removed under
  source-material/<topic>/<school>/, or when a new topic or school folder is created.
  Regenerates the distilled notes in .claude/docs/ and the app manifest
  src/data/schools.json so they stay in sync with source-material, then covers the
  hand-maintained app layers the pipeline does not touch (metric rules in
  src/lib/metrics.ts, Compare numbers in src/data/metricValues.ts, structured reports
  in src/data/financialAidReports.ts). Triggers include "ingest", "I dropped new files
  in source-material", "rebuild the docs/notes", "update schools.json", "add a new
  school/topic".
---

# Ingest Source Material

Keeps the project's derived layers in sync with the raw research in `source-material/`.

## Hard constraint — ingestion never changes the UX design

**Ingestion is a data-enrichment operation only. It must not change the web app's UX
design in any way.** This governs both this skill and any workflow that incorporates its
output.

**Out of scope — design work.** This constraint applies when the task at hand is *ingesting
material*. It does **not** apply to Claude Design MCP work (a `design_handoff_*/` import, a
`.dc.html` reference) or to a direct request to add or restyle UI — that work is meant to
change the UX and needs no advance approval. If such a task also ingests supporting research,
the ingestion still follows the provenance rules below; only the approval gate lifts.

Allowed without asking:

- Enrich / correct / extend the data that flows into cards and sections that already exist
  (notes, `src/content/`, `schools.json`, values in `metricValues.ts`, report fields in
  `financialAidReports.ts` for shapes already in use).
- Map a new subtopic phrasing onto an **existing** metric key via a `RULES` entry — that
  prevents a new card from appearing, which is the point.

Requires the user's explicit approval **first** — stop and ask:

- Adding a new card, section, sub-section, stat tile, Compare row, or metric key.
- A new `TOPIC_ORDER` / `SECTION_ORDER` entry, or reordering existing ones.
- A new report block/section shape in `financialAidReports.ts`.
- Any change to components, layout, styling, copy chrome, or card ordering.

When the material genuinely warrants a new card/sub-section, **prompt the user and explain
why** — what the material contains, why it does not fit an existing card, and what the
addition would look like. Then wait. Do not implement it in the same pass "pending
approval". If approval doesn't come, land the data enrichment and report the deferred
suggestion.

Corollary: a new subtopic that falls through `normalizeMetric()` to `slugify()` would
create an unapproved card. Treat that as a blocker to raise, not a silent outcome — see
section 1 of the app-layer checklist.

## Data flow

```
source-material/<topic>/<school>/<files>   (raw, gitignored — PDFs, .md, .txt)
        │  build_docs.py
        ▼
.claude/docs/<topic>/<school>.md           (one consolidated note per school × topic)
src/data/schools.json                      (machine-readable manifest for the React app)
.claude/docs/INDEX.md                      (regenerated index)
        │  scripts/build_site_content.py   (second, dependency-free pass)
        ▼
src/content/<topic>/<school>.json          (per-school-topic text the web app lazy-loads)

        ┈┈ pipeline ends here ┈┈ everything below is HAND-MAINTAINED ┈┈
        src/lib/metrics.ts             (subtopic → metric rules, topic/section order)
        src/data/metricValues.ts       (Compare numbers + school-page stat tiles)
        src/data/financialAidReports.ts (structured deep-dive reports)
                ▲
                └─ scripts/check_metrics.mjs verifies these against the manifest
```

Two passes: `build_docs.py` produces the notes + manifest; then
`scripts/build_site_content.py` slices those notes into the per-school-topic JSON the
React app reads. Always run the second pass after the first, or the website's school
pages go stale relative to `.claude/docs/`.

The build is **discovery-based**: it reads whatever topic and school folders exist under
`source-material/`, so new topics/schools are picked up automatically with no code edits.
Slugs are lowercase-hyphenated (`charlotte-country-day`); display names come from lookup
tables in `build_docs.py` (`TOPIC_NAMES`, `SCHOOL_NAMES`) and fall back to Title Case for
unknown slugs.

## How to run

Ensure the dependency is present, then run the bundled script from the project root:

```bash
pip install pdfplumber --break-system-packages   # once, if not already installed
python .claude/skills/ingest-source-material/build_docs.py           # rebuild everything
python .claude/skills/ingest-source-material/build_docs.py the-arts  # rebuild just one topic
```

Rebuilding a single topic preserves the other topics already in `schools.json` (it merges,
not overwrites). Then refresh the web app's content layer (no extra dependencies):

```bash
python scripts/build_site_content.py   # regenerates src/content/ from .claude/docs/
```

## Steps for the agent

1. Confirm what changed in `source-material/` (new files? new school folder? new topic folder?).
   - New school → create `source-material/<topic>/<new-school-slug>/` and, ideally, add the
     slug→name pair to `SCHOOL_NAMES` in `build_docs.py`.
   - New topic → create `source-material/<new-topic-slug>/<school>/` and add it to `TOPIC_NAMES`.
2. Run `build_docs.py` (whole project, or pass the one topic slug that changed).
3. Run `python scripts/build_site_content.py` to regenerate `src/content/` from the notes.
4. Verify: `python -c "import json;m=json.load(open('src/data/schools.json'));print(len(m['documents']),'docs')"`
   and spot-check the regenerated note(s) under `.claude/docs/<topic>/`.
5. **Run the app-layer check and work anything it reports:**

   ```bash
   node scripts/check_metrics.mjs
   ```

   Section 0 answers "did we pull in everything?" — files on disk the ingest skipped,
   unsupported file types, and topic × school research gaps. Sections 1–3 import the real
   `metrics.ts` / `metricValues.ts` / `financialAidReports.ts` (no re-implemented logic,
   so they cannot drift from the app). Exits non-zero when something needs a look.
   Findings are **advisory** — see the checklist below for how to judge each one. Never
   silence a warning by inventing a value.
5b. **If any research prose changed, check for translation drift:**

   ```bash
   node scripts/check_translations.mjs
   ```

   Only relevant once a locale's prose overlays exist (`src/data/overlays/`); until
   then it reports "nothing to check" and exits 0. Rewriting an English string whose
   translation was built from the old wording marks that entry STALE. **A stale entry
   falls back to English at runtime, so the page stays correct — it is just
   untranslated there.** Advisory like `check_metrics.mjs`: never "fix" it by editing
   an overlay by hand. Re-extract the topic and re-translate those strings, or leave
   it for the next translation pass.

   Note this fires far more often on redesign PRs that rewrite card prose than on
   ingest, since `src/data/**` is hand-authored — see
   `.claude/docs/prose-translation-architecture.md`.

5c. **Regenerate the data-schema catalog:**

   ```bash
   npm run schema
   ```

   `.claude/docs/DATA-SCHEMA.md` is the standing catalog of every level of school data the
   app presents — the school × research-area grid, prose card keys, structured cards and
   Compare rows. It is **generated from the live modules**, so an ingest that adds a school,
   a topic, or new subtopic phrasings changes it. Commit the regenerated file alongside the
   rest; `npm run check:schema` fails the build if it is left behind.

   Its ⚠️ markers are the same unmatched-subtopic finding step 5 reports, shown against the
   card list. A **new** ⚠️ row means the ingest just created a card nobody approved — treat
   it as step 6's UX gate firing, not as a doc to regenerate past.

6. **Check the diff for UX changes before committing.** The result should be data only —
   notes, content JSON, manifest, values, report fields. If the work would add or reorder a
   card/section/tile/Compare row, or touch a component or style, stop: that needs the
   user's approval first (see the hard constraint above). Ask, and commit only the data.
7. Commit the regenerated `.claude/docs/`, `src/data/schools.json`, and `src/content/`,
   plus any app-layer edits from step 5 (raw files in `source-material/` stay gitignored
   and are not committed, except `.md` — see the data-provenance standard).

## App-layer checklist (hand-maintained — the pipeline does NOT do this)

Ingest alone only guarantees that a school's **prose** renders. Three layers of the app
are hand-authored, and new source material is invisible to all three until someone edits
them. `scripts/check_metrics.mjs` (step 5) detects all three; this section explains how
to act on what it reports.

### 0. Did the ingest capture everything? (coverage)

Two kinds of data loss happen *upstream* of the manifest, so no amount of checking the
derived layers will reveal them:

**Files the ingest skipped.** `build_docs.py`'s `extract()` handles `.pdf`, `.md` and
`.txt` only — **every other extension silently returns empty string**, producing a
manifest entry with no text rather than an error. Drop an `.xlsx` or `.docx` in and it
reads as ingested while contributing nothing. Convert to a supported format first.

**Topic × school research gaps.** `topicsForSchool()` filters a school page to topics
that have documents, so an un-researched pair is not rendered as "no data" — the section
simply **does not appear**. A parent sees "5 research areas" with nothing indicating a
sixth exists for other schools. As of Jul 2026 all six schools cover all six topics
(the check in step 5 confirms "every school has documents for every topic"); a future
new topic or school is where a gap would reappear.

A gap is a research to-do, not a bug — the fix is collecting the material under the
data-provenance standard, never fabricating it. But it should be a *known* gap.

### 1. Unmatched subtopics → `src/lib/metrics.ts`

`normalizeMetric()` canonicalizes each raw subtopic to a stable `{ key, label }` per
topic. **A subtopic matching no rule does not error — it becomes its own metric** via
`slugify()`. The failure is silent and looks like: a school sprouting a one-off section
header its peers lack, and false `N/A` gaps in Compare where two schools said the same
thing with different filenames ("Theater" vs "Theatre").

After ingesting, list the topic's distinct subtopics and check each one resolves to an
existing rule key. If a new phrasing should join an existing metric, add a `RULES` entry —
**ordered, first match wins**, so put specific patterns before generic ones. Folding a new
phrasing into an existing metric is the preferred fix and needs no approval; it keeps the
existing card set intact.

An unmatched subtopic that slugifies into its own metric **is a new card** — a UX change.
Do not let it land silently. Either map it onto an existing metric, or stop and ask the
user to approve the new card, explaining what the material is and why no existing card
fits (see the hard constraint at the top).

New *topic* folder → it needs its own `RULES[topicSlug]` array, an entry in `TOPIC_ORDER`,
and optionally `SECTION_ORDER` for within-topic card order. Without a rules array every
subtopic falls through to slugify. A new topic adds a new research-area section to every
school page, so it is a UX change by definition: get the user's approval on the topic and
its card breakdown before wiring `TOPIC_ORDER` / `SECTION_ORDER`.

### 2. Comparison numbers → `src/data/metricValues.ts`

`VALUE_METRICS` powers both the Compare value rows and the stat tiles on a school page.
It is keyed `school slug -> display string | null`, and **a school absent from a `values`
map renders as N/A / is dropped from the stat strip** (`SchoolDetail.tsx` filters on
`!= null`). So ingesting a new school's sports research gives it a page but leaves it
blank in the Power 4 / D1 rows until backfilled.

Backfilling a school into an **existing** `VALUE_METRICS` entry is data enrichment — do it.
Adding a **new** entry creates a new Compare row and stat tile, which is a UX change: ask
first.

When new material moves a number, update the value **and** its trailing per-school
comment — those comments carry the per-athlete/per-figure sourcing. Prefer `null` over a
guess: `null` honestly means "not located", whereas a filled-in estimate silently becomes
a claim. Keep the `note` field current when the definition or time window shifts.

**Per-cell provenance tooltips (`quals`).** A cell whose display value is *coded* — a
fraction (`3 / 8`), a floor/approx (`≥19`, `~45–50`), a ratio (`28:1`), a range
(`JrK–12`), a magnitude (`~10k`), or an achievement phrase (`FLL Worlds top 100`) — means
nothing to a parent without the caveat behind it. Those get a `quals[slug]` entry
(`{ kind, text }`) that renders as a hover/focus tooltip; a plain value (`104`, `$32,070`,
`21 AP`) does not. Nothing decides this automatically — the tooltip appears only because
it was authored. **After adding or backfilling a value, run `npm run check:quals`.** It
flags any coded cell with no tooltip (zero false positives on plain values by design). A
clean run means no coded cell is missing its tooltip; it *cannot* see a tooltip warranted
for a reason invisible in the value (a differently-scoped year, a documented minimum) — so
still add those by hand. New `quals` prose is English-only until the locale rollout; it
extracts into the `metric-values` overlay like `label`/`note` (the enum `kind` is skipped
by a PATH_OVERRIDE in `i18n_fields.mjs`).

### 3. Structured deep-dive reports → `src/data/financialAidReports.ts`

The Financial Aid topic replaces the prose renderer with a hand-transcribed structured
report. The coupling is load-bearing on **two** keys, both of which must line up:

- the subtopic must normalize to metric key **`in-depth-report`**, and
- the school slug must be present in the `REPORTS` map.

`SchoolDetail.tsx` only swaps in `<FinancialAidReportCard>` when
`t.slug === 'financial-aid-tuition' && g.metric.key === 'in-depth-report'`. Miss either
and the card quietly falls back to plain prose — no error. `financialAidReport()`
returning `undefined` is the safe fallback (nothing breaks), but it is **not** the
desired end state.

**Standing rule — always transcribe the structured report.** Whenever a financial-aid
deep-dive is ingested for a school, add that school's entry to the `REPORTS` map in the
**same** pass, transcribed faithfully from its own deep-dive note in
`.claude/docs/financial-aid-tuition/<school>.md`. All six schools currently have entries
(Country Day, Cannon, Charlotte Christian, Davidson Day, Charlotte Latin, Providence Day);
a new financial-aid school is not "done" until it has one too. If the check in step 5
reports "has a deep-dive note but no structured report," that is a to-do to clear now, not
an accepted fallback. Follow the existing entries as the template — the seven-section
shape (tuition table, beyond tuition, aid engine, aid numbers, merit, paying the balance,
trend & questions), the per-section `confidence` taken from the source's own confidence
table where it publishes one, and the `NOT PUBLISHED` boxes that name each disclosure gap.

Every block in a report is optional by design: schools publish different things, and a
school renders only the blocks its own source supports. Transcribe faithfully — **do not
add an empty or carried-over block to make a school look complete, and do not invent a
figure the source does not state. Faithful transcription and completeness are the same
goal, not competing ones.**

#### What the Financial Aid area should RENDER — the card shape (user-set, 2026-08-18)

The structured report is not just *a* card in this area; it is meant to be the **primary**
one. Everything else in the research file is its evidence, not a peer card beside it.

**The target shape is the In-Depth Report, plus at most one or two genuinely additive
cards** — a fee table, a tuition-history card. Five schools already ship the report alone
(Providence Day, Charlotte Latin, Carmel Christian, Charlotte Christian, Hickory Grove) and
that is the clean end state.

**What must NOT become its own card:**

- **`Provenance`, `Source URLs`, `Sources`, `Method`, `Source snapshots`** — maintainer
  scaffolding. A card whose whole body is a ref-table of URLs is not research a parent
  reads; the report's own footer already carries its citations.
- **Warnings and corrections** — "a source that is wrong and is deliberately not ingested",
  "easy to mis-read". These belong inside the report's `boxes`, where they render as a
  tagged aside, not as a standalone card.
- **`Confirmed structural nulls` / gap inventories** — the report's `NOT PUBLISHED` boxes
  are the place for these.
- **Tuition tables that duplicate the report's own `bands`** — the report already draws the
  tuition chart. A second prose copy of the same figures is noise.

**The mechanism is heading level, not a component conditional.** Cards in this area come
from the `##` headings of `source-material/financial-aid-tuition/<school>/*.md`. To keep a
section as evidence rather than a card, write it as `###` under the file's intro. To make a
section a card, give it `##`. **A section that should be a card must also be the LAST `##`
in the file or be followed by another `##`** — trailing `###` subsections are absorbed into
whichever `##` precedes them, so a card can silently swallow content meant for the intro.

Nothing is deleted by this: demoted sections still ship in the committed research record
and still render inside the intro/report card. This is about what gets its own headline on
a parent-facing page.

**`gaston-day` was the worst violator and is now FIXED** (2026-08-18): it rendered **8 raw
prose cards** — including a bare `Source URLs` ref-table — and **no In-Depth Report card at
all**. It now renders the report plus two genuinely additive cards (Bus services, Named
scholarships). **`charlotte-country-day` remains known debt**, leading with `Tuition History
& Sources` before its report; fix it when that school is next touched rather than as a
drive-by.

**Gaston Day's missing report is a DIFFERENT bug, and worth understanding — one blank line
costs a school its whole structured card.** Its `REPORTS` entry is present and complete (7
sections, resolves fine), and its subtopic normalizes to `in-depth-report` correctly. The
break is upstream: its research file opens `# Title` immediately followed by
`## Provenance`, so the H1 section has **no body of its own**. `isInternal()` in
`src/lib/content.ts` drops any section whose entire body is the source's own `# Title`
line — correct on its own terms, since that heading is already the card's title — but
dropping it removes the ONLY group carrying the `in-depth-report` key, and the report card
is attached to that key. No group, no card.

Every other school writes its opening block as bold text (`**Provenance**`) rather than a
heading, so its H1 section keeps a body and survives. **Rule: in a financial-aid research
file, never let the first `##` heading follow the `# Title` with nothing between them.**
Leave the provenance block unheaded (bold text), or put any prose between them. Verified
across all 11 schools: Gaston Day was the only file with a title-only in-depth section, and
the only school missing the card. Fixed by changing its `## Provenance` to `**Provenance**`
— a one-line change that restored the whole structured card.

**One more thing that audit surfaced: a card duplicating another research area.** Gaston
Day's Financial Aid also carried an `After school & enrichment rates` card whose figures
($95/$55 weekly, $30/$15 drop-in, the $25 Extended Day fee, the $35 music lessons and the
rate-conflict discussion) are **all already in its After School area**, which is where a
parent looks for them. Demoted to `###`. When a section restates another area's data, that
is a card the other area already owns.

**⚠️ `check:metrics` CANNOT catch this — do not rely on it here.** Section 1 of that check
iterates the **manifest**, which holds one entry per *file* (its subtopic is the filename
suffix). Cards, however, are generated from the `##` **headings inside** each file. For
`gaston-day` the manifest holds **1** financial-aid subtopic while the page renders **10**
cards; the check reports "every subtopic matched a rule" and is telling the truth about the
layer it can see. Eight of those ten card keys (`source-urls`, `bus-services`,
`institutional-context`, …) exist in no `RULES` array and appear nowhere in
`DATA-SCHEMA.md`'s card table, which lists only the 2 keys the manifest knows about.

**So the heading level in the research file is the only control, and reviewing the rendered
page is the only check.** After ingesting a financial-aid file, open the school page and
count the cards in that area. Anything beyond the report plus a genuinely additive card or
two means a `##` should have been a `###`.

### 4. Translated UI strings → `src/locales/*.json`

The app is internationalized (`react-i18next`; see the i18n standard in CLAUDE.md).
Ingest touches this layer in exactly one way, and getting it wrong silently un-translates
part of the Spanish UI.

**Section headings that are identical for every school live in `src/locales/`, not in the
data files.** Cards like "Why it holds up", "Ask on the tour", "The course path" render
from `data.xTitle ?? t('sections.…')`. The `xTitle` field is intentionally **absent** from
each school's data file so the translated fallback wins.

When transcribing a redesign source that repeats those headings verbatim:

- **Do NOT** re-add `verdictTitle: 'Why it holds up'` (or any of the ~23 lifted keys) to a
  school's data file. Doing so overrides the translation and pins that heading to English.
- **Do** keep an `xTitle` in the data when the heading genuinely differs per school —
  `'Every acceptance, 2023–2025'`, `'The six mechanics the office owns'`. Those are research
  findings, not chrome, and correctly stay in the data layer.

The test is whether the string is the *same for all six schools*: same → locale file;
varies → data file. To check what is currently lifted, grep `sections\.` in
`src/components/`.

New user-facing UI text added to a component must be a locale key, never a hardcoded
literal. Add it to `en.json` **and** `es.json` in the same pass — a key missing from
`es.json` silently falls back to English.

### 5. Search indexability — mostly automatic, but VERIFY

Every indexable page is pre-rendered to a real file at build time (see the
search-indexability standard in `CLAUDE.md`). The whole surface — pre-rendered pages,
`sitemap.xml`, `robots.txt`, `hreflang` alternates — is generated from
`src/data/schools.json` via `scripts/seo_routes.mjs`, so **a newly ingested school flows
through with no manual step.** This was verified by experiment, not assumed.

What you still owe:

- **Run `npm run check:seo`** after an ingest that adds or renames a school. It fails if a
  route has no pre-rendered page — a silent failure otherwise, because the SPA keeps
  working for anyone who clicks in while deep links 404.
- **A renamed slug changes a live URL.** The old `/school/<old-slug>/` will 404 for anyone
  who bookmarked or shared it, and the sitemap will stop listing it. Flag this to the user
  rather than renaming silently.
- **Adding a TOPIC lengthens every meta description at once** — they are composed from
  school and topic names in `src/lib/head.ts` and must stay ≤160 chars. `check:seo`
  enforces it, so a failure there after a topic addition is expected, not mysterious.

Ingestion never adds a route, so the "new route must be registered in `ROUTES`" rule in
`CLAUDE.md` does not normally apply here — but it does if the ingest is paired with a UX
change that adds one, which needs the user's approval first anyway.

## Notes & limitations

- Output is a faithful, lightly-cleaned **extraction** of the source text, not a re-summary.
  If a true condensed abstract is wanted, do that as a separate pass on the generated notes.
- Per-document text is capped at ~45k characters to keep notes readable.
- Subtopic titles are derived from filenames (everything after the last " - "; underscores in
  legacy names are normalized). Keep the `<School> - <Topic> - <Subtopic>` naming for clean titles.
- `build_docs.py` is safe to re-run; it fully regenerates the derived files each time.
- **Data-provenance standard:** any school data fetched from an external source (web /
  recruiting sites / school pages) must be saved as a committed `.md` file in the matching
  `source-material/<topic>/<school>/` folder, with source URLs and record-level detail,
  before (or as part of) surfacing it in the app. `.md` files under `source-material/` are
  committed (PDFs are not). See "Data-provenance standard" in the root `CLAUDE.md`.
