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
6. Commit the regenerated `.claude/docs/`, `src/data/schools.json`, and `src/content/`,
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
**ordered, first match wins**, so put specific patterns before generic ones.

New *topic* folder → it needs its own `RULES[topicSlug]` array, an entry in `TOPIC_ORDER`,
and optionally `SECTION_ORDER` for within-topic card order. Without a rules array every
subtopic falls through to slugify.

### 2. Comparison numbers → `src/data/metricValues.ts`

`VALUE_METRICS` powers both the Compare value rows and the stat tiles on a school page.
It is keyed `school slug -> display string | null`, and **a school absent from a `values`
map renders as N/A / is dropped from the stat strip** (`SchoolDetail.tsx` filters on
`!= null`). So ingesting a new school's sports research gives it a page but leaves it
blank in the Power 4 / D1 rows until backfilled.

When new material moves a number, update the value **and** its trailing per-school
comment — those comments carry the per-athlete/per-figure sourcing. Prefer `null` over a
guess: `null` honestly means "not located", whereas a filled-in estimate silently becomes
a claim. Keep the `note` field current when the definition or time window shifts.

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
