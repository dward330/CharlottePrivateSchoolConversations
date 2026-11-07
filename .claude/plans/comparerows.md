---
name: comparerows
title: Compare page — tuition by division and cumulative runs, continents reached, and "offered" matrices for The Arts, Course Offerings, Student Clubs and Summer Programs
status: english-done
phases: 2
created: 2026-11-07
branch: feat/comparerows
prs: []
---

# Compare page: six tuition rows, a continents row, and four "offered" matrices

## Goal

Six user asks on the Compare page, landed in one branch and one PR, built as six independent
parts so each can be reviewed on its own:

- **A. Financial Aid & Tuition** — replace the single *Top tuition* row with **Lower / Middle /
  Upper School tuition** rows, then add three **cumulative run** rows: first pre-K year
  through grade 12, Middle School through grade 12, and grades 9–12. Every cell shows the
  school year in parentheses beneath the figure.
- **B. Global Exposure** — a **Continents reached by trips** row.
- **C. The Arts** — an **Arts offered** group modelled on the Sports matrix: one row per art
  form, grouped into Visual arts / Music / Theatre & dance bands, with **LS · MS · US**
  division chips (the arts analogue of V · JV · MS) where the school's own pages name it.
- **D. Course Offerings** — **Subjects by division** (one row per subject area, LS · MS · US
  chips) and **World languages** (one row per language, same chips).
- **E. Student Clubs** — **Club categories** (one row per category, no club names).
- **F. Summer Programs** — **Camp categories** (one row per category, no camp names).

**After School is deliberately not built** (see *Out of scope*): only three of the eleven
comparable schools publish an enrichment-class catalog, so a category matrix would be eight
columns of N/A.

We'll know it worked when a parent on Compare can read what a full run at each school costs
at today's rates, which continents its trips reach, and which art forms, subjects, languages,
club categories and camp categories each school names, all in ten locales.

## Context

### The Compare page and its two kinds of rows

- `src/pages/Compare.tsx` renders a "Key stats" `<tbody>` from `valueMetricsForTopic()`
  (the hand-typed `VALUE_METRICS` in `src/data/metricValues.ts`), then the computed
  **Sports offered** group (`<CompareSportsRows>` at line ~705, only on `sports`), then
  "Research coverage". Columns are `comparableSchools` (`src/lib/manifest.ts:52`): the 11
  schools with grades 9–12. Group bands are `tr.group-row > td.group-label >
  span.group-label-text`.
- **`VALUE_METRICS` rows** (`ValueMetric` type, `metricValues.ts:33-136`) have `values`,
  `subs` (quiet second line), `quals` (per-cell tooltip, rendered by `CellQual`), `noLead`,
  `compareOnly` (keeps the row off the school-page stat-tile strip,
  `SchoolDetail.tsx:831`), `rowTip`. Values and subs pass through `localizeMoneyText()`.
  **Overlay paths carry the array index**, so inserting a row mid-array strands every later
  row's translations until each locale's work file is re-spliced (memory note
  `metric-values-midarray-insert-shifts-paths`; testscores #439 did this). Parts A and B
  both insert mid-array, so **Phase 2 re-splices all nine locales once**.
- **Computed groups** are the Sports matrix (plan `sportsmatrix`, #435): `src/lib/sportsMatrix.ts`
  (explicit raw-name → key alias table, builder returning rows/cells/`unmapped`),
  `src/components/CompareSportsRows.tsx` (band with legend, Yes / No / N/A cells with
  `DepthChip` rungs and `TopLayerTip` tooltips), `scripts/check_sports_matrix.mjs`
  (`check:sportsmatrix`, chained into `build`; fails on an unmapped name or a missing chrome
  key), a "Computed Compare groups" subsection in `scripts/gen_data_schema.mjs:877-905`,
  and the `sm-*` CSS at `src/index.css:2451-2515`. Computed rows have no overlay entries,
  no tiles, and no effect on `coverage:floor`. Parts C–F follow this pattern; their cells
  read the **localized** accessor data at render while aliasing on the English raw strings.
- **Chips.** `src/components/DepthChip.tsx` exports `DepthChip` (`.sports-depth
  .sports-depth-v|jv|ms`, hues `--depth-v-bg/fg`, `--depth-jv-*`, `--depth-ms-*` in
  `src/index.css:84-139`, three equal-weight hues since #436) and `DepthLegend`. Keys:
  `sports.depthChips`, `sports.level_V|JV|MS`.
- **Chrome keys** live in `src/locales/<lang>.json` for `TRANSLATED` = `en es bn ht te fr fa
  it hi ar`. `check:chrome` reports a key present in `en` but missing elsewhere as *awaiting
  translation* (exit 0), which is what lets Phase 1 ship green. Existing keys to reuse:
  `compare.na`, `compare.notAvailable`, `compare.coverage_one|_other`, `compare.keyStats`,
  `compare.sportsMatrix.*` (the tip-kind and aria patterns), `sports.level_MS`.
- **Node imports.** Verified during planning: `src/data/clubCatalog.ts`,
  `src/data/courseOfferings.ts`, `src/data/financialAidReports.ts` and the per-school files
  `src/data/artsPrograms/*.ts`, `src/data/summer/*.ts`, `src/data/internationalTravel/*.ts`
  all import under plain Node. The registries `artsProgram.ts`, `summerPrograms.ts`,
  `internationalTravel.ts` do **not** (`import.meta.glob`); scripts import per-school files,
  as `check_sports_matrix.mjs` does.
- **Checks in the area:** `check:travelrows` (`scripts/check_travel_compare_rows.mjs`)
  re-derives the five `travel-*` rows from the trip ledgers, requires them contiguous and
  followed only by `TAIL_KEYS` (the three cup rows), and classifies every destination piece
  in `KNOWN` / `DOMESTIC` / `UK`. `check:scores` is the model for a hand-typed-row checker
  with a traceability test. `check:quals` flags coded-looking `values` without a `quals`
  entry. `coverage:floor` reads only `VALUE_METRICS`.

### Part A — the tuition data (all verified in `src/data/financialAidReports.ts` during planning)

Every comparable school's report has a *Tuition Table* section with `bands: TuitionBand[]`
(`{ label, amount, prior?, delta? }`) and a `meta` line naming the year. Five reports already
carry a **"full run" stat** in their *Trend, Reach & the Questions to Ask* section, and the
new rows must reproduce those figures exactly (they are the precedent for the arithmetic):
Country Day `$438,840` (line ~351), Cannon `$395,830` (~597), Charlotte Christian `$342,300`
(~852), Charlotte Latin `$469,800` (~1617, "14 years"), Providence Day `$472,595` (~1921).
The rule they all use: **one pre-K year + K + grades 1–12 = 14 years, each year at the band
that prices that grade, current rates, tuition only, no projection.**

| School (year) | Bands (label → amount) | MS starts | Lower row (band) | Middle row (band) | Upper row | Pre-K–12 run | MS–12 run | 9–12 run |
|---|---|---|---|---|---|---|---|---|
| Cannon (2026–27) | Junior K 21,450 · Kindergarten 22,300 · Grades 1–4 26,080 · Grades 5–8 29,870 · Grades 9–12 32,070 | 5 | $26,080 (1–4) | $29,870 (5–8) | $32,070 | **$395,830** (JrK–12) | $247,760 (5–12) | $128,280 |
| Country Day (2026–27) | Junior K 24,515 · Kindergarten 25,725 · Grades 1–4 30,375 · Grades 5–8 32,700 · Grades 9–12 34,075 | 5 | $30,375 (1–4) | $32,700 (5–8) | $34,075 | **$438,840** (JK–12) | $267,100 (5–12) | $136,300 |
| Charlotte Christian (2026–27) | Early Ed (JK–K) 21,300 · Lower (1–4) 23,295 · Middle (5–8) 24,575 · Upper (9–12) 27,055 | 5 | $23,295 (1–4) | $24,575 (5–8) | $27,055 | **$342,300** (JK–12) | $206,520 (5–12) | $108,220 |
| Covenant Day (2026–27) | JK & K 15,490 · Grades 1–5 17,790 · Grades 6–8 20,490 · Grades 9–12 22,790 | 6 | $17,790 (1–5) | $20,490 (6–8) | $22,790 | $272,560 (JK–12) | $152,630 (6–12) | $91,160 |
| Davidson Day (2026–27) | Early Childhood 22,590 (one row "Two year olds – Junior Kindergarten") · Lower (K–4) 25,010 · Middle (5–8) 26,320 · Upper (9–12) 26,910 | 5 | $25,010 (K–4) | $26,320 (5–8) | $26,910 | $360,560 (JK–12) | $212,920 (5–12) | $107,640 |
| Charlotte Latin (2026–27) | TK & Kindergarten 27,600 · Grades 1–5 32,600 · Grades 6–8 35,200 · Grades 9–12 36,500 | 5 (grade 5 priced in 1–5) | $32,600 (1–5) | $35,200 (6–8) | $36,500 | **$469,800** (TK–12) | $284,200 (5–12) | $146,000 |
| Providence Day (2026–27) | Transitional Kindergarten 25,510 · Kindergarten 28,010 · Grades 1–5 32,960 · Grades 6–12 36,325 | 5 (grade 5 priced in 1–5) | $32,960 (1–5) | $36,325 (6–12) | $36,325 | **$472,595** (TK–12) | $287,235 (5–12) | $145,300 |
| Carmel Christian (2026–27) | Kindergarten 12,500 · Grades 1–5 14,400 · Grades 6–8 17,100 · Grades 9–12 18,750 | 6 | $14,400 (1–5) | $17,100 (6–8) | $18,750 | $210,800 (**K–12, 13 years**) | $126,300 (6–12) | $75,000 |
| Hickory Grove (2025–26 per `meta`) | TK–5 (Elementary) 11,500 · Grades 6–8 (Middle) 12,500 · Grades 9–12 (High) 13,750 | 6 | $11,500 (TK–5) | $12,500 (6–8) | $13,750 | $161,500 (TK–12) | $92,500 (6–12) | $55,000 |
| Gaston Day (2025–26) | Preschool/Pre-K half-day 8,775 · Preschool/Pre-K full day 10,890 · Kindergarten–4th 19,500 · 5th–8th 21,425 · 9th–12th 22,390 | 5 | $19,500 (K–4) | $21,425 (5–8) | $22,390 | $283,650 (PK–12, full-day PK year) | $175,260 (5–12) | $89,560 |
| Charlotte Catholic (2026–27) | Participating Catholic 15,041 · Community 21,562 · High International 23,562 (grades 9–12 only) | — | null | null | $23,562 | null | null | $94,248 (International) |

Arithmetic, written out so the checker and the implementer agree: pre-K–12 run =
preK + K + Σ grades 1–12 at the band pricing each grade; MS–12 run = Σ grades (msStart..12);
9–12 run = 4 × the 9–12 band. Gaston Day's band figures are the school's own all-in totals
(tuition + fees), as its existing `top-tuition` cell already says. Charlotte Christian's
Middle School is grades 5–8 (admissions source and tuition band agree; the arts ladder's
"JK–6 / 7–8" framing is the arts module's own and is not used).

Existing `top-tuition` references outside the row itself: `.claude/docs/DATA-SCHEMA.md`
(generated) and the content JSON for three schools (`src/content/financial-aid-tuition/*.json`,
research prose that mentions "the app's `top-tuition` row"; leave those as they are, they are
provenance notes). No script keys on `top-tuition`.

### Part B — continents

`travel-countries` (`metricValues.ts:2347-2409`) already lists each school's countries in its
`quals` and its window in `subs`. Continent membership, seven-continent model, Central America
and the Caribbean under North America, the UK folded as the checker already does:

| School | Continents | Count |
|---|---|---|
| Cannon | Asia (China), North America (Costa Rica, Dominican Republic), Europe (Germany) | **3** |
| Charlotte Christian | Europe, North America (Canada, Costa Rica, Cuba, DR, Mexico, Panama), South America (Brazil, Ecuador) | **3** |
| Country Day | Africa (Morocco, Rwanda), Asia (China, Japan, Oman, UAE), Europe, North America (Canada, Costa Rica), Oceania (New Zealand), South America (Argentina, Peru) | **6** (matches the school's own "six continents") |
| Charlotte Latin | Africa (South Africa), Europe, North America (Canada), South America (Argentina) | **4** |
| Davidson Day | Europe (Portugal, Spain), North America (Belize) | **2** |
| Providence Day | Africa (Kenya, South Africa), Asia (Japan, South Korea, Thailand, UAE), Europe, South America (Colombia, Ecuador) | **4** |

The other five comparable schools have no travel program → null, as in every `travel-*` row.
Charlotte Latin's domestic New Mexico trip is excluded, as `DOMESTIC` already excludes it.

### Parts C–F — what the data actually holds

- **Arts** (`src/data/artsPrograms/<slug>.ts`): `ladder.divisions[].items` (prose lines per
  division, with each school's own grade span), `music.tracks[].ensembles[]` (names, mostly
  Upper School), `visual.media[].name` (a curated studio grid, mostly Upper School; Carmel
  and Hickory Grove name only "Visual Arts"), `visual.path[]`, `theatre.season[].kind`.
  **Not structured enough to compute**: a "No" from the media grid would say Hickory Grove
  teaches no painting, which its "Art I–IV" plainly does. So the arts matrix is a **typed
  table with a verbatim cite per claim** and a traceability check (the `check:scores`
  pattern), and its negative state reads **"Not listed"**, never "No".
- **Course Offerings** (`src/data/courseOfferings.ts`): `divisions[].departments[].name` and
  `courses[].title` for Lower / Middle / Upper. Upper and most Middle School departments are
  real subject names; Lower School departments are bundles (`Core Academics`, `Specials`,
  `Special Area Classes`, per-grade names at Covenant Day). Many divisions carry
  `notPublished` (the school publishes subject areas, not a catalog). Department names and
  language words in titles are aliasable; 1,100+ course titles are not rows.
- **Student Clubs** (`src/data/clubCatalog.ts`): each school's `categories[] = {key, short,
  full}` is its **own taxonomy** (Charlotte Christian files 14 of 23 clubs under "Student
  club"; Catholic uses Education / Service / Community / Culture / Sports / General
  interest). `full` labels are aliasable to canonical rows; one label may map to several.
- **Summer Programs** (`src/data/summer/<slug>.ts`): `catalog.categoryFilters[] = {token,
  label}` is each school's published taxonomy and `camps[].category` the per-camp token.
  Three catalogs are **samples** (Cannon 60 of 251, Providence Day 60 of 170, Country Day 60
  of 132), Hickory Grove's is the **Summer 2023** archive, Catholic lists four community
  sports camps, and **Country Day organizes by time of day** (Full day / Morning / Afternoon /
  Farm / Swim / Premium academic), so its activity categories must come from a typed
  override citing camp names. The `intro` field already carries each catalog's caveat in
  translated prose.
- **After School** (`src/data/afterSchoolPrograms/<slug>.ts`): class catalogs exist for
  Cannon (21), Charlotte Latin (27) and Providence Day (15) only. Country Day names
  categories in prose behind a portal, Covenant Day has "five category names and a login
  wall", Carmel and Gaston Day are "coming soon", Charlotte Christian, Davidson Day and
  Hickory Grove have none, Charlotte Catholic has no after-school data.

## Decisions

**Shared**

- **One plan, one branch, one PR, six independent parts.** Each part is its own commit so the
  user can review the English of each in isolation. Phase 2 runs once for everything.
- **Parts C–F are computed groups, not `VALUE_METRICS`** (the sportsmatrix decision): no
  overlay entries, no tiles, no effect on `coverage:floor`. Parts A and B are `VALUE_METRICS`
  rows (they are figures with provenance, like every tuition and travel row).
- **The negative cell in Parts C–F reads "Not listed", never "No"** (chrome
  `compare.matrix.notListed`), because every one of these sources is a curated list or a
  school-specific taxonomy, not a complete roster. The tooltip says what the school does
  list. Sports keeps "No": a sports list is a roster.
- **One shared renderer, `src/components/CompareMatrixRows.tsx`**, takes
  `{ groups: [{ labelKey, rows }], legend?: 'division' }` where each row is
  `{ key, labelKey, cells: Record<slug, MatrixCell> }` and a cell is
  `{ state: 'yes' | 'notListed' | 'na'; divs?: Division[]; unknownDivs?: Division[]; sub?: string; tip: string[] }`.
  Four builders in `src/lib/` produce that shape. `CompareSportsRows` stays as it is.
- **Division chips LS · MS · US** are a new `DivisionChip` in `DepthChip.tsx`, same base
  class `.sports-depth`, modifiers `.division-ls|ms|us`, reusing the three hues: US takes
  `--depth-v-*`, LS takes `--depth-jv-*`, MS takes `--depth-ms-*` (the same hue as the sports
  MS chip, since it means the same thing). A `DivisionLegend` ("Divisions: LS Lower School ·
  MS Middle School · US Upper School") sits in the **first band only** of a multi-band group.
  Chrome keys `compare.matrix.div_LS|MS|US` (short) and `compare.matrix.divName_LS|MS|US`.
- **A chip appears only where the school's own text names the item for that division**,
  the same "only where stated" rule as B / G in Sports. No chip is never inferred from grade
  span. Divisions follow the school's own spans as the tuition and course data define them
  (Charlotte Christian MS = 5–8; Charlotte Catholic is US only).
- **Row labels are chrome keys**, one vocabulary per part (`compare.arts.row_<key>`,
  `compare.courses.row_<key>`, `compare.clubs.row_<key>`, `compare.summer.row_<key>`), sorted
  within a band by localized label (`Intl.Collator(lang)`) like sports. The sub-line
  "N/M schools" counts the **selected** columns (the #437 rule).
- **One checker for all four matrices, `scripts/check_compare_matrices.mjs`
  (`npm run check:matrices`), chained into `build`** after `check:sportsmatrix`. Exit 1 on:
  an unmapped raw string in a part whose alias table is a gate (department names, club
  category labels, summer filter labels), a typed arts cite that is not a verbatim substring
  of that school's arts module, a row key with no `en.json` label, a language title matching
  two languages. Exit 0 with a report on: Lower School bundle titles no `TITLE_ALIASES`
  entry covers, alias entries no school uses, every derived language match (so a human can
  read the list).
- **CSS prefix `cm-`** for the shared renderer. Never `ad-` (EasyList; memory note).

**Part A**

- **Row keys and order** inside `financial-aid-tuition`: `tuition-lower`, `tuition-middle`,
  `tuition-upper`, `run-prek12`, `run-ms12`, `run-912`, then the untouched `pct-aid`,
  `aid-awarded`, `avg-award`. `top-tuition` is **removed**; `tuition-upper` carries its
  values, its three quals and its tile. Its label becomes *Upper School tuition*.
- **Per-level rows show the band that prices the division's last grade**, with the band's
  grades in the sub-line (`(2026–27 · grades 1–4)`), and a `scope` qual wherever the band and
  the division differ: Latin and Providence Day (grade 5 priced in the 1–5 band), Providence
  Day (6–12 band, kept from `top-tuition`), Hickory Grove (TK–5 band), every school whose
  Lower School has cheaper younger bands (the qual lists them: "JrK $21,450, K $22,300").
  Stacking every band in the cell was considered and rejected: the Financial Aid card
  already shows the full table, and one figure per cell keeps the row rankable and readable.
- **Cumulative rows at current rates, tuition only, no projection**, matching the five
  existing "full run" stats to the dollar. The sub-line names the year and the span:
  `(2026–27 rates · JrK–12, 14 years)`, `(2026–27 rates · grades 5–12)`, `(2026–27 rates ·
  grades 9–12)`. Carmel Christian's first row reads `(2026–27 rates · K–12, 13 years)` with
  a qual (no pre-K program). Gaston Day's uses the full-day PK band and says so in a qual.
  Davidson Day's uses the single "Early Childhood" row for its JK year, qual explains.
  Charlotte Catholic is null on four rows and `$94,248` on `run-912` at the International
  rate, qual giving `$86,248` community and `$60,164` participating Catholic.
- **Every cell carries the year** in its sub-line, read from the report's `meta`
  (`2026–27`; Hickory Grove and Gaston Day `2025–26`). Hickory Grove's existing qual sentence
  ("the exact school year is not stated") stays on its cells.
- **`noLead: true` on all six** (cost rows). `compareOnly: true` on `tuition-lower`,
  `tuition-middle` and the three runs (the Financial Aid card shows the bands; a run tile is
  a new tile and would need its own approval). `tuition-upper` keeps the tile `top-tuition`
  had.
- **The Middle School note is the row's `note`** (Compare has no per-topic intro): *"Middle
  School starts in grade 5 at seven of these schools (Cannon, Charlotte Christian, Country
  Day, Davidson Day, Gaston Day, Latin, Providence Day) and in grade 6 at Covenant Day,
  Carmel Christian and Hickory Grove, so a Middle-School-to-graduation run is eight years at
  the first group and seven at the second — the line beneath each figure says which."* The
  same sentence, shortened, goes on `tuition-middle`.
- **A new checker `scripts/check_tuition_rows.mjs` (`check:tuition`), chained into `build`,**
  re-derives all six rows from `financialAidReports.ts` bands through a per-school
  `GRADE_BANDS` map (grade token → band label, e.g. cannon `{ PK: 'Junior K', K:
  'Kindergarten', '1-4': 'Grades 1–4', '5-8': 'Grades 5–8', '9-12': 'Grades 9–12' }`,
  `msStart: 5`), asserts the five existing report stats still equal the pre-K–12 cells,
  asserts each sub-line's year equals the report `meta` year, asserts the key order above and
  that `top-tuition` is gone.
- **These five new rows count toward the coverage floor** (any school with published bands
  can fill them). Expected: 45 rows, Davidson Day **28/45** and still the thinnest. Update
  the floor sentence in `CLAUDE.md` from the script's output, not from this estimate.

**Part B**

- **Key `travel-continents`, label "Continents reached by trips"**, inserted directly after
  `travel-countries` (before the cup rows; the cup rows' index shifts by one, re-spliced in
  Phase 2). `compareOnly: true`, no `noLead` (more continents is more reach, like countries).
  `subs` = the same window line as `travel-countries`; `quals` list the continents with
  their countries, as the table above. Note: *"Our count over the same trip record as the
  countries row, on the seven-continent model, with Central America and the Caribbean under
  North America."*
- **`check:travelrows` gains the row**: six keys, a `CONTINENT` map that must classify every
  `KNOWN` country (an unclassified one fails), the count re-derived per school, same window
  and null rules as `travel-countries`.

**Part C — Arts**

- **Rows (29) in three bands.** Visual arts: `visualArt` (Visual art classes), `drawingPainting`,
  `ceramics`, `sculpture`, `printmaking`, `photography`, `darkroom` (Darkroom / film
  photography), `graphicDesign` (Graphic design & digital illustration), `filmVideo` (Film,
  video & broadcast), `fiberFashion` (Fiber, fashion & textiles), `designFabrication` (Design &
  fabrication). Music: `generalMusic` (General music classes), `band`, `orchestra` (Orchestra
  & strings), `choir`, `jazz`, `aCappella`, `percussion`, `marchingBand`, `guitar`, `piano`,
  `worshipBand`, `contemporaryEnsemble`, `musicTechnology`, `musicTheory`. Theatre & dance:
  `plays`, `musicals`, `technicalTheatre`, `dance`. `visualArt` and `generalMusic` exist so a
  Lower School line like "Every K–4 student takes both music and art classes" has a row to
  land on without over-claiming a medium.
- **The matrix is typed in `src/data/artsMatrix.ts`**: `ARTS_MATRIX: Record<slug,
  Partial<Record<ArtKey, Partial<Record<Division, string>>>>>`, where the value under a
  division is a **verbatim fragment of that school's `artsPrograms/<slug>.ts`** proving the
  claim for that division; plus `ARTS_UNKNOWN_DIVISIONS: Record<slug, Partial<Record<Division,
  string>>>` for a division the school publishes nothing for (Davidson Day MS: "No Middle
  School arts course list is published"). The check asserts every cite is a substring of the
  file. AP Studio Art is not a row (the `advanced-arts-coursework` row covers it).
- **The draft table below is the starting content.** `/implement` verifies each cite exists,
  adjusts a division only when the school's text says otherwise, and may add a claim it finds
  in the same files. It never adds a claim from outside `src/data/artsPrograms/`.

**Part D — Courses**

- **Two bands.** *Subjects by division* (13 rows): `english`, `mathematics`, `science`,
  `socialStudies` (History & social studies), `worldLanguages`, `computerScience` (Computer
  science & technology), `innovationDesign` (Engineering, design & innovation), `visualArts`,
  `performingArts`, `physicalEducation` (PE & health), `bible` (Bible, religion & theology),
  `journalismMedia` (Journalism & student media). *World languages* (7 rows): `spanish`,
  `french`, `latin`, `mandarin` (Mandarin / Chinese), `german`, `greek`, `asl` (American Sign
  Language).
- **Subject chips come from `DEPARTMENT_ALIASES`** (department name → row keys | null), the
  full table below. A bundle department (`Core Academics`, `Specials`, …) maps to null and
  its **course titles** are then matched against `TITLE_ALIASES` (title → row keys), an
  explicit table `/implement` fills from the check's report (e.g. `Art`, `Music`, `Physical
  Education`, `Library`, `Spanish`, `Science`); a descriptive title stays unmatched and is
  reported, never guessed.
- **Language chips come from course titles inside `worldLanguages`-mapped departments and
  bundle departments only**, by an explicit per-language pattern
  (`^(AP |Honors |IB |Advanced |Intro(?:duction)? to )?(Spanish|French|Latin|Mandarin|Chinese|German|Greek|American Sign Language|ASL)\b`),
  so "Latin American History" in a History department can never match. The check prints
  every match and fails on a title matching two languages.
- **A division is "unknown"** (no chips, tooltip "{{school}} publishes no course list for
  its {{division}}") when every department maps to null and no title matched. A division
  with `notPublished` adds the line "{{school}} publishes subject areas rather than a full
  catalog for its {{division}}" to every cell tooltip for that school, so an absent chip reads
  as "not named", not "not taught".

**Part E — Clubs**

- **Rows (12):** `service`, `academicCompetition` (Academic & competition), `leadership`
  (Leadership & governance), `publicationsMedia`, `affinity` (Affinity & identity),
  `cultureLanguage`, `artsPerformance`, `faith` (Faith & spiritual life), `honorSocieties`,
  `specialInterest` (Special interest & social), `recreationSports` (Recreation & sport),
  `stem`.
- **Cells come from `CLUB_CATEGORY_ALIASES`** (each school's `categories[].full` English label
  → row keys; one label may map to several rows). A Yes cell's sub-line is the school's **own
  label(s)**, read localized from `clubCatalog(slug, lang)` by category index. **No club
  counts**: a label that maps to two rows cannot attribute its clubs, and the
  `us-organizations` row already carries totals. The tooltip on a Not-listed cell lists the
  school's categories ("{{school}} groups its clubs as: …").

**Part F — Summer**

- **Rows (10):** `dayCamp` (Traditional day camp), `sports`, `stem` (STEM & robotics),
  `visualArts` (Visual arts & crafts), `performingArts` (Theatre, dance & music), `culinary`,
  `academic` (Academic & tutoring), `nature` (Nature, farm & outdoors), `games` (Games &
  hobbies), `faith`.
- **Cells come from `SUMMER_CATEGORY_ALIASES`** (each school's `categoryFilters[].label`
  English → row keys | null; `All` is skipped; generic buckets `General enrichment`,
  `Enrichment`, `Premium`, `Premium specialty`, `Full day`, `Morning`, `Afternoon` map to
  null) **plus `SUMMER_OVERRIDES`** for Country Day: row key → a camp `name` that exists in
  its catalog (the check asserts the name exists). A Yes cell's sub-line is the school's own
  filter label(s), localized. Every cell tooltip ends with the catalog's `intro` sentence
  (already translated prose), which is where "60 of 251", "Summer 2023 catalog" and "every
  camp is a half-day athletic camp" live. No grade spans: three catalogs are samples.

## Approvals needed

**None outstanding.** The new rows and groups are the user's direct request (2026-11-07),
which is the UX approval, and the user **approved all four points below on 2026-11-07**
("approved", same session). `/implement` does not re-ask them:

1. The four matrices say **"Not listed"** instead of "No" (see Decisions). If the user wants
   "No", change the chrome string only.
2. The per-level tuition rows show **one figure per cell** (the division's top band) rather
   than every band stacked.
3. Removing `top-tuition` also removes its school-page **stat tile**; `tuition-upper` takes
   the tile over with the label *Upper School tuition*. No other new tiles.
4. **After School is not built.** Course Offerings is built at subject and language level,
   not course-title level.

Phase 2 waits for the user's review of the English build, as always.

## Out of scope

- **After School category matrix.** 3 of 11 comparable schools publish a class list
  (Cannon, Charlotte Latin, Providence Day); the rest publish none, "coming soon", or names
  behind a portal. A matrix would be 8 columns of N/A, which is the empty-shell shape this
  project refuses. If the user wants the three-school version later, it is the Summer
  mechanism applied to `classes[].name` (63 names).
- A per-course or per-club row. Per-club category classification (310 clubs) was considered
  and rejected for this plan.
- Editing any school's arts, course, club or summer data; touching Charlotte Prep or Trinity
  Episcopal (off Compare).
- Tuition projections, fees beyond what a school's own band already includes, financial-aid
  arithmetic.
- The school-page cards and the `/add-school` skill text (the floor figure in `CLAUDE.md` is
  updated; the skill reads the script).

## Steps

### Phase 1 — English

Branch `feat/comparerows` from `main`. One commit per part (A–F) plus one for the shared
pieces; `git status --short` before every commit; stage explicit paths.

**Shared (commit first, with Part C)**

1. **Division chips and legend** — `src/components/DepthChip.tsx`: add
   `export type Division = 'LS' | 'MS' | 'US'`, `DivisionChip({ div })` rendering
   `<span className={`sports-depth division-${div.toLowerCase()}`}>{t(`compare.matrix.div_${div}`)}</span>`,
   and `DivisionLegend({ className })` listing the three with `compare.matrix.divName_*`,
   headed by `compare.matrix.divisions`. CSS in `src/index.css` beside `.sports-depth-*`:
   `.division-us { background: var(--depth-v-bg); color: var(--depth-v-fg) }`, `.division-ls`
   → `--depth-jv-*`, `.division-ms` → `--depth-ms-*`.
2. **Shared renderer** — new `src/components/CompareMatrixRows.tsx` (`cm-*` classes): props
   `{ cols, groups, legend?: 'division', idPrefix }`; renders one `tr.group-row.cm-band` per
   group (legend in the first band only when `legend` is set), then one `tr.value-row.cm-row`
   per row with `th.row-metric` (label + `row-metric-cov` sub-line "N/M schools" over
   selected columns), and `td.cell.cm-cell` per school wrapped in `TopLayerTip` exactly as
   `CompareSportsRows` does: `yes` → `span.cm-yes` + chips (`cm-chips`) + optional
   `span.cm-sub` (localized text, through `isolateFigures`); `notListed` → `span.cm-no`;
   `na` → `mark-na`. Tip = `tip-kind` from `compare.matrix.tipKindYes|NotListed|Na` plus one
   `tip-body` per string in `cell.tip`. Copy `.sm-*` CSS to `.cm-*` (light, dark, phone rules
   at `src/index.css:2451-2515` and the phone rule near 2678) rather than sharing selectors,
   so the sports group is byte-identical.
3. **Chrome keys in `src/locales/en.json`** under `compare.matrix`: `yes` "Yes", `notListed`
   "Not listed", `tipKindYes` "Named by the school", `tipKindNotListed` "Not on the school's
   list", `tipKindNa` "Not available", `divisions` "Divisions:", `div_LS` "LS", `div_MS` "MS",
   `div_US` "US", `divName_LS` "Lower School", `divName_MS` "Middle School", `divName_US`
   "Upper School", `tipYesDivs` "{{school}} names {{item}} in: {{divisions}}.", `tipYes`
   "{{school}} names {{item}}.", `tipNotListed` "{{item}} isn't named on {{school}}'s
   published pages for this topic.", `tipNa` "We don't have {{school}}'s {{topic}} data yet.",
   `tipUnknownDiv` "{{school}} publishes no list for its {{division}}.", `cellAria`
   "{{item}} at {{school}}: {{state}}", `legendNote` "A chip means the school names it for
   that division. No chip means it isn't named, not that it isn't taught."

**Part A — tuition rows**

4. **`src/data/metricValues.ts`** — replace the `top-tuition` object with the six rows in the
   order and with the values, subs, quals and flags in *Context* and *Decisions*. Keep the
   existing header comment and the three `top-tuition` quals on `tuition-upper`. Every
   figure is typed as a US-style string (`'$395,830'`); never compute at render.
5. **`scripts/check_tuition_rows.mjs`** (new; `"check:tuition"` in `package.json`, chained
   into `build` right after `check:scores`): import `VALUE_METRICS` and
   `financialAidReports.ts`'s `FINANCIAL_AID_REPORTS` (or whatever the exported map at
   `financialAidReports.ts:3162` is named; read it), find each report's section with
   `bands`, and re-derive all six cells per school from `GRADE_BANDS` + `msStart` as the table
   specifies. Assert: key order; `top-tuition` absent; `noLead` on all six; `compareOnly` on
   five; each sub-line contains the report `meta` year; the five report "full run" `stats`
   values equal the `run-prek12` cells; Catholic null on four rows. Negative test: change one
   band amount in a scratch copy (point the script at it with an env var, as
   `check:travelrows` does with `TRAVEL_DIR`), confirm exit 1 names the cell, revert.
6. **Floor and docs** — run `npm run coverage:floor`; update the floor sentence in
   `CLAUDE.md` (the "As of 2026-11-07 that is Davidson Day — 23/39" line and the "≥23 of 39"
   gate) to the script's new numbers, and the `39` in `.claude/skills/add-school/SKILL.md` if
   it is quoted there (grep for `/39`). `npm run schema`.

**Part B — continents**

7. **`src/data/metricValues.ts`** — insert `travel-continents` after `travel-countries` with
   the values, subs and quals from the table in *Context*.
8. **`scripts/check_travel_compare_rows.mjs`** — add the key to `KEYS` (six, in order), add
   `CONTINENT: Record<country, continent>` covering every `KNOWN` entry (fail on any `KNOWN`
   country it lacks), derive the distinct-continent count per school over trips abroad, and
   assert it equals the cell, with the same null/window/quals rules as `travel-countries`.
   Update the header comment ("five" → "six"). Negative test with `TRAVEL_DIR`.

**Part C — Arts**

9. **`src/lib/artsMatrix.ts`** — `ART_GROUPS` (three bands → `ArtKey[]`), `ART_KEYS`, and
   `buildArtsMatrix(slugs, programs: Record<slug, ArtsProgram | undefined>, table)` returning
   the shared row shape: `na` when a school has no arts program, `yes` with `divs` from the
   typed claim, `notListed` otherwise; `unknownDivs` from `ARTS_UNKNOWN_DIVISIONS`. Types only
   from `../data/artsProgram.ts`, so it loads under Node.
10. **`src/data/artsMatrix.ts`** — the typed table. Starting content (division: cite; every
    cite is a fragment the planner saw in the file; verify each):
    - **providence-day**: drawingPainting US "Drawing & painting"; sculpture US "Sculpture";
      darkroom US "Film photography"; photography US "Film photography"; fiberFashion US
      "Print & textile"; band MS "Band · chorus · orchestra", US "'Band'"; orchestra MS same,
      US "'Orchestra'"; choir MS same, US "'Chorus'"; jazz US "Jazz Ensemble"; aCappella US
      "A Cappella"; musicTheory US "AP Music Theory"; generalMusic LS "Active-listening music
      curriculum"; visualArt LS "Visual Arts strands"; plays US "Play / One-Act"; musicals LS
      "A Lower School musical each year", MS "A Middle School musical", US "Musical";
      technicalTheatre MS "technical theatre — tech starts this early", US "technical
      theater classes". Ceramics stays not listed (the media grid says "not published").
    - **charlotte-latin**: visualArt LS "Visual art begins in transitional kindergarten", MS
      "Visual arts electives by choice"; drawingPainting MS "may sculpt, paint, draw", US
      "Drawing & painting"; sculpture MS "may sculpt, paint, draw"; photography MS "or
      photograph any subject", US "Photography"; graphicDesign MS "draw, design or
      photograph"; fiberFashion US "Fashion & fiber"; generalMusic LS "Experiential music";
      band LS "Band and stringed instruments introduced in Grade 5", MS "Band, orchestra,
      choir and theater are the foundation", US "Band (6–12)"; orchestra LS same, MS same,
      US "Orchestra (6–12)"; choir MS same, US "Concert Choir (5–12)"; musicTheory US "AP
      Music Theory"; plays MS "The Odyssey (MS play, May)", US "Upper School Play"; musicals
      LS "Madagascar Kids", MS "Into the Woods Jr. (MS, Nov)", US "Upper School Musical";
      technicalTheatre MS "the backstage/technical course starts in Grade 6", US "Stagecraft
      I–II"; filmVideo US "capstone film project".
    - **charlotte-country-day**: visualArt LS "Two child-scaled art studios", MS "Three
      dedicated visual arts rooms"; drawingPainting US "Drawing & painting"; ceramics LS
      "Lower School ceramics studio", US "Ceramics & 3-D"; sculpture US "'Sculpture'";
      printmaking US "printmaking, mixed media"; darkroom US "Film photography"; photography
      US "Digital photography"; graphicDesign US "Computer graphics"; filmVideo US "animation
      and filmmaking"; generalMusic LS "Music instruction begins in junior kindergarten", MS
      "General Music"; band MS "Band, Orchestra and General Music", US "Symphonic Band";
      orchestra MS same, US "'Orchestra'"; choir MS "Mixed Choir in grades 7–8", US "Concert
      Choir"; percussion US "Percussion Ensemble"; piano LS "Individual piano instruction",
      US "Piano class"; musicTheory US "AP Music Theory"; plays LS "Drama from JK onward", MS
      "7th graders stage Shakespeare", US "One-Act Play"; musicals MS "Aladdin, Jr.", US "The
      Blumey entry"; technicalTheatre US "technical-theatre track in set, lighting, sound and
      stage management".
    - **cannon**: drawingPainting LS "drawing, painting, collage, paper sculpture", MS
      "drawing, painting, printmaking, ceramics, sculpture", US "2-D studio"; ceramics LS
      "clay, fibre art", MS "ceramics", US "3-D studio"; sculpture LS "paper sculpture", MS
      "sculpture", US "3-D studio"; printmaking MS "printmaking", US "2-D studio";
      fiberFashion LS "fibre art", US "CDE fabrication"; photography MS "Photography & Tech
      Art Fusion"; graphicDesign US "Media Arts"; filmVideo US "Media Arts";
      designFabrication US "CDE fabrication"; generalMusic LS "Music built on the Orff
      approach"; band MS "Varsity Band spans grades 6–12", US "Honors Upper School Band";
      orchestra MS "Varsity Orchestra is competitive", US "Honors String Ensemble I"; choir
      US "Honors Concert Chorus"; jazz US "Honors Jazz Combo"; contemporaryEnsemble US "Honors
      Modern Ensemble"; musicTechnology US "Honors Music Technology I"; plays US "One-Acts
      (NCTC)"; musicals LS "A separate Lower/Middle School musical for grades 3–6", MS same,
      US "Musical (Blumey)".
    - **charlotte-christian**: visualArt LS "Visual art begins"; drawingPainting US "2-D:
      drawing & painting"; sculpture US "3-D: Art & Design"; photography US "Digital
      photography"; filmVideo US "Film & video"; musicTechnology US "Audio production";
      graphicDesign MS "Digital Arts and Theatre electives both open at Grade 6", US "Graphic
      design & illustration"; band MS "Instrumental music starts in Grade 5", US "Honors Wind
      Ensemble"; orchestra MS "Grade 7 Orchestra", US "Honors Orchestra"; choir MS "Grade 7/8
      Advanced Choir", US "Honors Choir"; jazz US "Honors Jazz Band"; worshipBand US "uKnight
      Worship"; plays MS "ACT 2 — the audition-only middle school competition drama team", US
      "Seven theatre electives"; musicals LS "Mainstage musicals cast from Grade 4", US
      "Mainstage musicals"; technicalTheatre US "technical directing and stage management".
      (Grade 5–6 items sit under the ladder's "Lower School" column but Charlotte Christian's
      Middle School is 5–8, so they are MS chips.)
    - **covenant-day**: visualArt LS "art integrated in JK–K and sequential from grade 1";
      drawingPainting US "Drawing & painting"; sculpture US "2D / 3D design"; ceramics US
      "'Ceramics'"; photography US "Digital photography"; graphicDesign US "Graphic design";
      generalMusic LS "General Music JK–4"; band LS "Introduction to Choir and Band in grade
      5", MS "MS Band", US "Symphonic Band"; choir LS "CDS Children’s Choir, grades 3–5", MS
      "MS Choir", US "HS Choir"; aCappella US "HS A Cappella"; worshipBand MS "MS Worship
      Band", US "HS Worship Band"; plays MS "Drama for grades 6–8", US "Theater I–II";
      musicals MS "October MS Musical"; technicalTheatre US "Theatre Tech".
    - **davidson-day**: visualArt LS "Visual arts begin in Early Childhood classrooms";
      drawingPainting LS "ceramics, painting, multimedia", US "'Paint'"; ceramics LS same, US
      "'Ceramics'"; graphicDesign US "Digital illustration"; photography US "Digital
      photography"; contemporaryEnsemble US "Contemporary Ensemble"; filmVideo US "Film
      Studies & Production"; plays US "Theatre Performance Ensemble"; musicals US "Upper
      School Musical". `ARTS_UNKNOWN_DIVISIONS['davidson-day'].MS = "No Middle School arts
      course list is published"`.
    - **carmel-christian**: visualArt LS "Every K–4 student takes both music and art
      classes", MS "Band · Choir · Ignite (MS Praise Band) · Art · Theatre", US "Visual Arts";
      photography US "Digital Photography"; generalMusic LS "music and art classes"; choir LS
      "may join choir / creative arts", MS "Band · Choir", US "Choir (HS · 5th · MS)"; band
      MS "Band · Choir", US "Symphonic Band (HS)"; worshipBand MS "Ignite (MS Praise Band)",
      US "Ignite Band (HS Praise Band)"; musicals LS "A 5th-grade musical", MS "A Middle
      School musical", US "Musical (Upper School)"; plays MS "Spring Play Competition (NCTC)",
      US "Theatre plus Technical Theater"; technicalTheatre US "Technical Theater and
      Design"; dance MS "Musical Theatre Dance".
    - **hickory-grove-christian**: visualArt LS "Visual art at every level", MS "Visual arts:
      original artwork", US "Visual Arts (Art I–IV)"; generalMusic LS "General music aligned
      to the National Standards"; band MS "Band (6th-grade beginners", US "Concert Band";
      choir MS "Choir (open to all)", US "'Choir'"; jazz US "Jazz Band"; plays MS "Theatre and
      Musical Theatre", US "Three productions"; musicals MS "Theatre and Musical Theatre", US
      "Large-scale spring musical"; technicalTheatre US "Technical Theatre".
    - **gaston-day**: visualArt LS "Music, art and drama coordinated with classroom units", MS
      "Electives chosen from art, drama, chorus and band"; drawingPainting US "'Drawing'";
      ceramics US "'Ceramics'"; printmaking US "'Printmaking'"; generalMusic LS "Music, art
      and drama coordinated"; band MS "MS Instrumental Ensemble — woodwinds", US "Band,
      Concert Choir and Drama"; choir MS "Middle School Chorus", US "Concert Choir"; piano MS
      "MS Instrumental Ensemble — piano"; guitar MS "MS Instrumental Ensemble — guitar";
      plays LS "Drama classes begin as early as second grade", MS "Electives chosen from art,
      drama", US "Actors’ Conservatory Theatre"; musicals US "The spring musical is the named
      anchor".
    - **charlotte-catholic** (US only): drawingPainting "Drawing & painting"; ceramics
      "'Ceramics'"; darkroom "Film photography"; photography "Digital photography";
      graphicDesign "Graphic design"; filmVideo "Broadcast & film"; sculpture "Sculpture &
      design"; band "Concert Band"; choir "Honors Concert Choir"; jazz "Jazz Band";
      percussion "Honors Percussion"; marchingBand "Marching Band"; guitar "Introduction to
      Guitar"; plays "Acting → Honors Acting"; technicalTheatre "Theatre: Design and Tech";
      dance "Dance I → Dance II → Honors Dance III".
11. **Keys** — `compare.arts.group_visual` "Visual arts", `group_music` "Music",
    `group_theatre` "Theatre & dance", `topic` "arts", and `compare.arts.row_<key>` for all 29
    with the labels in *Decisions*.
12. **Wire** — in `Compare.tsx`, next to the sports line, `{activeTopic === 'the-arts' &&
    <CompareArtsRows cols={cols} />}`, a thin component in `CompareMatrixRows.tsx` (or its own
    file) that builds the matrix once from `comparableSchools` × `artsProgram(slug)` and the
    typed table, maps labels through `t`, and renders `<CompareMatrixRows legend="division">`.
    The band condition for "Research coverage" (`valueMetrics.length > 0 || activeTopic ===
    'sports'`) becomes a `hasComputedGroup(activeTopic)` helper covering all five topics.

**Part D — Courses**

13. **`src/lib/courseMatrix.ts`** — `SUBJECT_KEYS`, `LANGUAGE_KEYS`, `DEPARTMENT_ALIASES`
    (the complete table: every department name in `courseOfferings.ts` for the 11 comparable
    schools, listed in *Context* of this plan's research: Core bundles → the four core rows;
    `English`/`Language Arts` → english; `English & Social Studies` → english + socialStudies;
    `Mathematics`/`Math` → mathematics; `Science`/`Sciences` → science; `Science &
    Engineering` → science + innovationDesign; `History`/`Social Studies`/`History & Social
    Studies`/`History & Social Sciences`/`Humanities & Social Sciences` → socialStudies;
    `World Language`/`World Languages`/`Modern Languages`/`Modern & Classical
    Languages`/`Foreign Language`/`Spanish` → worldLanguages; `Computing & Innovation` and
    `Technology & Innovation` → computerScience + innovationDesign; `Technology & Computer
    Science`/`Technology`/`STEM/Tech` → computerScience; `Innovation & Design`/`Innovation &
    Enterprise`/`Design & Entrepreneurship`/`IDEAS@PDS`/`Technology & Makers` →
    innovationDesign; `Visual Arts`/`Art` → visualArts; `Performing Arts` → performingArts;
    `Fine Arts`/`Arts`/`Arts Electives`/`Participation in the Arts`/`Visual and Performing
    Arts` → both arts rows; `Arts & PE`/`Arts, PE & Library`/`Arts, PE & Design`/`Fine Arts &
    PE` → both arts + physicalEducation; `Arts & Technology` → both arts + computerScience;
    `PE, Health & Advisory`/`PE & Health`/`Physical Education`/`PE / Health`/`Health &
    Fitness`/`PE & Life Skills`/`Physical Activity Electives` → physicalEducation;
    `Bible`/`Biblical Studies`/`Theology`/`Faith & Leadership` → bible; `Journalism &
    Media`/`Student Media` → journalismMedia; **null**: `Electives`, `Electives & LEAD`,
    `Electives & Distinctions`, `Core Content Electives`, `Other`, `Enrichment`, `Specials`,
    `Special Area Classes`, `Special Areas (All Grades)`, `What is published`, `Other
    published detail`, `Non-Departmental`, `Teaching`, `Personal Development`, `Life
    Skills`, `Philosophy`, `Interdisciplinary Studies`, `Options Program / Pathways Program`,
    `Dual Enrollment`, `Restoration & Sustainability`, `Communications & Global Leadership`,
    and the per-grade names `6th Grade`…`8th Grade`, `Junior Kindergarten`, `Kindergarten`,
    `First Grade`…`Fifth Grade` → the four core rows), `TITLE_ALIASES` (filled from the
    check's report), `LANGUAGE_PATTERNS`, and `buildCourseMatrix(slugs, offerings)` which maps
    each division's `title` to LS / MS / US by its position and grade text (`Lower`, `Middle`,
    `Upper`/`High`) and returns both groups in the shared shape, with `unknownDivs` and a
    per-school `notPublished` flag per division for the tooltip line.
14. **Keys** — `compare.courses.group_subjects` "Subjects by division", `group_languages`
    "World languages", `topic` "course", and `row_<key>` for the 13 + 7 rows.
15. **Wire** on `course-offerings`, legend `division`.

**Part E — Clubs**

16. **`src/lib/clubsMatrix.ts`** — `CLUB_ROW_KEYS`, `CLUB_CATEGORY_ALIASES` keyed by the
    English `full` label: Latin `Service`→service, `Competitive & academic`→academicCompetition,
    `Leadership & governance`→leadership, `Special interest & publications`→specialInterest +
    publicationsMedia, `Affinity & mentorship`→affinity, `Culture & language`→cultureLanguage;
    Providence Day `Activity & interest`→specialInterest, `Team-oriented /
    competitive`→academicCompetition, `Affinity / alliance`→affinity, `Recreational sport &
    outdoor`→recreationSports, `Application / election-based`→leadership, `Publications /
    media`→publicationsMedia; Country Day `Governance / leadership`→leadership, `Academic /
    competition`→academicCompetition, `Service`, `Affinity / special interest`→affinity +
    specialInterest; Cannon `Competitive program`→academicCompetition, `Academic competition
    team`→academicCompetition, `Student leadership`→leadership, `Service`, `Affinity /
    belonging`→affinity, `Student publication`→publicationsMedia, `Interest /
    social`→specialInterest; Charlotte Christian `Student club`→specialInterest, `Honor
    society`→honorSocieties, `Leadership / media`→leadership + publicationsMedia, `Global
    awareness`→cultureLanguage; Covenant Day `Academic / competition`, `Honor societies`,
    `Spirit / leadership`→leadership; Davidson Day `Academic / competition`,
    `Interest`→specialInterest, `Service / environmental`→service; Carmel `Honor society`,
    `Student government`→leadership, `Service / discipleship`→service + faith; Hickory Grove
    `Honor society`, `Interest / academic club`→specialInterest + academicCompetition, `Faith
    / service / leadership`→faith + service + leadership, `Arts / music club`→artsPerformance;
    Gaston Day `STEM / competitive`→stem + academicCompetition, `Publications & media`,
    `Leadership / service`→leadership + service, `Culture & language`, `Arts &
    performance`→artsPerformance, `Special interest`, `Honor society`; Catholic
    `Education`→academicCompetition, `Service`, `Community`→specialInterest,
    `Culture`→cultureLanguage, `Sports`→recreationSports, `General interest`→specialInterest.
    `buildClubsMatrix(slugs, catalogs)` returns the shared shape with `sub` = the school's
    label(s) at the matched category indexes (joined with ` · `), to be read localized at
    render.
17. **Keys** — `compare.clubs.group` "Club categories", `topic` "clubs",
    `tipGroupsAs` "{{school}} groups its clubs as: {{labels}}.", `row_<key>` × 12.
18. **Wire** on `student-clubs`, no legend.

**Part F — Summer**

19. **`src/lib/summerMatrix.ts`** — `SUMMER_ROW_KEYS`, `SUMMER_CATEGORY_ALIASES` keyed by the
    English filter `label` (the table in *Decisions*, Part F, plus: Cannon `STEM &
    Academics`→stem + academic, `Visual Arts`, `Performance Arts`→performingArts, `Culinary`,
    `Sports & Games`→sports + games; Carmel `Athletics`→sports, `Arts & Crafts`→visualArts,
    `STEM & Engineering`→stem, `Cooking`→culinary, `Faith`; Catholic `Sports`; Charlotte
    Christian `Sports`, `STEM`, `Arts & crafts`→visualArts, `Themed`→dayCamp, `Academic`,
    `Culinary`, `Nature`, `Games`, `Premium`→null; Country Day `Farm campus`→nature,
    `Swim`→sports, `Premium academic`→academic, the three time-of-day labels → null; Latin
    `Camp Victor (day camp)`→dayCamp, `Sports`, `STEM`, `STEM premium`→stem, `Arts &
    crafts`→visualArts, `Dance & theatre`→performingArts, `Academic`, `Culinary`; Covenant `Day
    Camps`→dayCamp, `Sports`, `Arts & Theater`→visualArts + performingArts, `STEM &
    Academics`→stem + academic; Gaston Day `Day camp`, `Enrichment`→null, `Sports`, `Arts &
    theatre`→visualArts + performingArts, `Dance`→performingArts, `Tutoring`→academic; Hickory
    Grove `STEM`, `Reading & Fluency`/`Math`/`Spanish Immersion`/`College Prep`→academic,
    `Faith`, `Arts`→(see Open questions), `Athletics`→sports; Providence Day `Traditional day
    camp`→dayCamp, `STEM`, `The Arts`→visualArts, `Music & theater`→performingArts, `Sports`,
    `Games & hobbies`→games, `Academic enrichment`→academic, `Premium specialty`→null),
    `SUMMER_OVERRIDES['charlotte-country-day']` = { dayCamp: 'Camp Buccaneer', sports: 'Bucs
    Basketball Camp', stem: 'CAMMP: Robotics & Coding', visualArts: 'Kids Adventure Art',
    performingArts: 'Musical Theatre', culinary: 'Cooking Around the World', academic: 'Fun
    with Phonics', games: 'Fun with Chess', nature: 'Farm Camp' }, and
    `buildSummerMatrix(slugs, programs)`; a school with no summer program (none today among
    the 11, but handle it) is `na`. Cell `tip` ends with the catalog `intro` when present.
20. **Keys** — `compare.summer.group` "Camp categories", `topic` "summer camp",
    `tipLabelsAs` "{{school}} files its camps under: {{labels}}.", `tipOverride` "Named camps
    in this category: {{camps}}.", `row_<key>` × 10.
21. **Wire** on `summer-programs`, no legend.

**Checks, schema, docs**

22. **`scripts/check_compare_matrices.mjs`** (`"check:matrices"`, chained into `build` after
    `check:sportsmatrix`): loads the per-school arts / summer modules, `clubCatalog.ts` and
    `courseOfferings.ts` under Node, runs the four builders, and enforces the exit-1 / exit-0
    rules in *Decisions*. Print each matrix as a table (rows × schools, Y / – / ?) so the
    browser check has numbers to compare against. Negative tests: rename one club category
    label in a scratch copy → exit 1; break one arts cite → exit 1 naming slug and key.
23. **`scripts/gen_data_schema.mjs`** — extend "Computed Compare groups" with the four
    groups (row counts, the typed-table rule for Arts, the alias rule for the other three)
    and the five tuition rows / continents row land in the Compare-row table automatically.
    `npm run schema`, `npm run check:schema`.
24. **Negative-test hygiene**: every scratch copy lives in the scratchpad, never in the tree;
    diff the artifact back afterwards (testing convention).
25. **Browser check** per *Verification*, then commit and push. Open the PR with
    `--body-file`, listing the six parts and the four approval points. **Stop.**

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope, two layers:

- **UI chrome**: every new `compare.matrix.*`, `compare.arts.*`, `compare.courses.*`,
  `compare.clubs.*`, `compare.summer.*` key in the nine non-English catalogs
  `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` (about 100 keys). Division labels follow
  the Sports precedent: `Middle School` and its siblings were kept in English by the #435
  Phase 2; mirror that choice per locale (read `sports.level_MS` in each catalog and match
  it). Language names use each locale's own word for the language (es `Mandarín`, fr
  `Latin`, …).
- **Research prose (metric-values overlay)**: the six tuition rows' labels, notes, subs
  and quals, the continents row's label, note, subs and quals, and the figure-only `values`
  cells, for the nine `PROSE_TRANSLATED` locales. Follow
  `.claude/docs/prose-translation-architecture.md`; plan `testscores` (#439) § Phase 2 is the
  worked example, including the mid-array re-splice.

1. **Extract** `metric-values` with `scripts/i18n_extract.mjs` to a throwaway `--lang
   __verify` first and confirm the unit diff is exactly the Part A and Part B units (six
   labels + six notes + ~40 subs + ~25 qual texts + 11 figure cells, and the continents row's).
   Then extract per real locale.
2. **Re-splice all nine locales**: `node scripts/i18n_splice_work.mjs --lang <l> --topic
   metric-values` for each, because the tuition rows insert five rows mid-array and the
   continents row shifts the three cup rows (memory note). Confirm by stamp, never by
   position, that every pre-existing unit still resolves.
3. **Translate** the new units in each work file. Money figures char-for-char
   (`$395,830`, never regrouped: `hi`/`te` regroup at render); year spans keep their digits
   and EN DASH (`2026–27`); grade spans like `JrK–12` stay Latin. Continent names translate
   (es `Oceanía`, fa with isolates handled at render).
4. **Build overlays** (`scripts/i18n_build_overlay.mjs`) and add the chrome keys to the nine
   catalogs.
5. **Commit Phase 2** to the same branch and PR, merge (`gh pr merge --squash
   --delete-branch`), pull `main`, flip the INDEX row to **Implemented** with the PR link, add
   `## Implementation notes` if the build deviated. **Do not deploy.** Say "merged — ready to
   deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | edit: six tuition rows replace `top-tuition`; `travel-continents` after `travel-countries` |
| `scripts/check_tuition_rows.mjs` | new: `check:tuition` |
| `scripts/check_travel_compare_rows.mjs` | edit: sixth key, `CONTINENT` map, header |
| `src/components/DepthChip.tsx` | edit: `Division`, `DivisionChip`, `DivisionLegend` |
| `src/components/CompareMatrixRows.tsx` | new: shared renderer + the four thin topic components |
| `src/lib/artsMatrix.ts`, `src/lib/courseMatrix.ts`, `src/lib/clubsMatrix.ts`, `src/lib/summerMatrix.ts` | new: keys, alias tables, builders |
| `src/data/artsMatrix.ts` | new: typed arts claims with cites |
| `src/pages/Compare.tsx` | edit: four `activeTopic ===` wirings; `hasComputedGroup` |
| `src/index.css` | edit: `.division-*`, `cm-*` rules (light, dark, phone) |
| `scripts/check_compare_matrices.mjs` | new: `check:matrices` |
| `package.json` | edit: `check:tuition`, `check:matrices`, both chained into `build` |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit + regenerate |
| `CLAUDE.md` (and `.claude/skills/add-school/SKILL.md` if it quotes `/39`) | edit: floor figures from `coverage:floor` |
| `src/locales/en.json` | edit: Phase 1 keys |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: Phase 2 |
| `src/data/overlays/work/metric-values.<lang>.json`, `src/data/overlays/metric-values.<lang>.json` | Phase 2: extract, re-splice, translate, build |
| `.claude/plans/INDEX.md`, this plan | status + PR |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` clean (trust `tsc -b`, not `--noEmit`).
- [ ] `npm run check:tuition` exits 0; its printout shows the five report "full run" stats
      matching `run-prek12`; the negative test exits 1 naming the cell and is reverted.
- [ ] `npm run check:travelrows` exits 0 with six rows; Country Day reads 6 continents.
- [ ] `npm run check:matrices` exits 0; the printed tables show, at minimum: Arts — Charlotte
      Catholic Dance = US only, Davidson Day MS column `?` on every arts row, Cannon
      Drawing & painting LS·MS·US; Courses — Providence Day Mandarin LS·MS·US, Charlotte
      Latin Greek US only, Hickory Grove ASL MS·US, Davidson Day Lower School unknown;
      Clubs — Covenant Day Service "–", Catholic Recreation & sport "Y"; Summer — Country
      Day Nature "Y" via override, Catholic only Sports "Y", Hickory Grove Faith "Y". Both
      negative tests exit 1 and are reverted.
- [ ] `npm run check:quals` no new flags; `npm run check:chrome` lists the new keys as
      *awaiting translation*, none missing everywhere.
- [ ] `npm run coverage:floor`: 45 rows, Davidson Day the floor at 28/45; `CLAUDE.md`
      updated to those numbers.
- [ ] `npm run schema && npm run check:schema` clean; `npm run build` succeeds with both new
      checks in the chain.
- [ ] **Browser check** (`npm run build && npx vite preview`, Playwright per the memory note),
      all 11 schools selected:
  - `/compare/?topic=financial-aid-tuition`: six rows in order, every cell has a `(year …)`
    sub-line, Cannon `run-prek12` = `$395,830`, Charlotte Catholic N/A on four rows and
    `$94,248` on 9–12 with its tooltip, the Middle School note names the 5th-grade schools,
    no leader tint on any of the six; the Financial Aid header tile on a school page reads
    *Upper School tuition* with the same figure *Top tuition* showed on `main`.
  - `/compare/?topic=international-travel`: continents row after countries, Country Day 6,
    Davidson Day 2, five N/A, tooltips list continents.
  - `/compare/?topic=the-arts`: three bands, legend with LS · MS · US in the first band only,
    "Not listed" cells, chips readable in dark mode (Charlotte Latin `#12294f` column),
    hover and keyboard focus open tips on a Yes, a Not-listed and (stub one school's arts
    program to `undefined` on the dev server, then revert) an N/A cell.
  - `/compare/?topic=course-offerings`, `student-clubs`, `summer-programs`: bands render, the
    sports and research-coverage groups are unchanged on `sports`.
  - **Phone width** 320 / 360 / 390 px on each of the five topics: no page-level horizontal
    overflow, chips and sub-lines wrap (`audit:mobile` does not open Compare).

### Phase 2 — Locales

- [ ] `npm run check:runtime` and `npm run check:live` clean, which proves the re-splice.
- [ ] `check_figures.py` for `metric-values` per language, `npm run check:sepdrift -- --lang
      <code>` and `npm run check:digits`: every tuition figure char-for-char.
- [ ] `npm run check:dates`, `npm run check:fr`, `npm run check:bidi`, `check:fa`, `check:hi`
      clean; `npm run i18n:leaks -- --lang <code>` shows no new leak.
- [ ] `npm run check:chrome`: no key awaiting translation.
- [ ] Browser: `?lang=es`, `?lang=fa` (RTL: chips and `(2026–27 · grades 5–12)` sub-lines in
      a sane order), `?lang=hi` (`$3,95,830` on a tile vs `$395,830` in prose is the recorded
      Telugu/Hindi interaction, both correct) on the five topics.
- [ ] `npm run build` succeeds.

## Risks

| Risk | Mitigation |
|---|---|
| A "Not listed" cell is read as "not taught" | Chrome wording, legend note, per-cell tooltip naming what the school does list; `notPublished` line in Courses |
| Tuition cells drift from the Financial Aid card after a rate update | `check:tuition` re-derives every cell from the card's bands on each build |
| Mid-array inserts strand nine locales' translations | Phase 2 step 2 re-splices every locale; `check:live` is the proof |
| An arts cite stops matching after an arts-prose edit | `check:matrices` fails naming slug and key; fix the cite, never loosen to a regex |
| A school's taxonomy label changes and its clubs/summer column silently thins | Unmapped label fails the build |
| A language pattern matches a non-language title | Patterns run only inside language and bundle departments; two-language match fails; every match is printed |
| Compare grows to ~70 rows on The Arts and ~20 on Courses | Accepted; same shape the user chose for Sports (option 1a) |

## Open questions

- Hickory Grove's summer filter `Arts` is generic. — **default:** map to `visualArts` unless
  the single camp's name says otherwise (the check prints it); then map to what the name
  says.
- Should `tuition-lower` / `tuition-middle` also get school-page tiles? — **default:** no
  (`compareOnly`); the Financial Aid card already shows every band. Ask the user at review.
- Hickory Grove's year: the report `meta` says 2025–26 while its `top-tuition` qual says the
  year is not stated. — **default:** sub-line `(2025–26 …)` from `meta`, keep the qual
  sentence on every Hickory Grove tuition cell.

## Implementation notes

Phase 1 (English) built 2026-11-07 on `feat/comparerows`, one commit per part. Deviations
from the plan as written, each deliberate:

- **Hickory Grove's pre-K–12 run is `$173,000`, not the `$161,500` in the Context table.**
  The TK–5 Elementary band prices seven years (TK, K, 1–5); the table had counted six. The
  rule in *Decisions* (one pre-K year + K + grades 1–12) is what `check:tuition` derives, and
  the typed cell follows the derivation.
- **Davidson Day's report carries its own run stat, `$337,970`, as a K–12 (13-year) run.**
  The row keeps the plan's `$360,560` (Early Childhood year + K–12); its qual names the
  school's K–12 figure, and `check:tuition` asserts the K–12 sum equals the report stat
  alongside the five pre-K–12 stats.
- **The coverage floor is 28/44, not 28/45.** `coverage:floor` excludes the whole
  `international-travel` topic, so `travel-continents` joins the excluded set rather than
  the denominator. `CLAUDE.md` and the add-school skill read 28/44 (63%).
- **Bundle departments always map to null and match titles** (the plan said both "Core
  bundles → the four core rows" and "a bundle maps to null"). Matching titles is strictly
  richer: Covenant Day's per-grade departments then yield Bible and Latin chips the four-row
  shortcut would have dropped. `Arts, PE & Design` also maps `innovationDesign` (Design Lab),
  and Hickory Grove's Middle School `Art` department maps both arts rows (it holds band,
  choir, drama and dance).
- **Two language patterns, not one.** Inside a language department a language matches as
  a whole word anywhere, because titles list several (`Spanish I / French I / Mandarin I`,
  `French, Spanish & Mandarin Exposure`); inside a bundle the title must start with the
  language and the name must be followed by a level or the end, so `Honors Latin American
  Influence` (Catholic, Interdisciplinary Studies) does not match. The two-language failure
  applies to bundle titles only; a language-department title naming three languages is
  correct and is printed by the check.
- **Davidson Day has no summer module**, so its Camp categories column is N/A (the plan
  expected none). It is what exercised the renderer's N/A branch in the browser check,
  instead of stubbing a school's arts program.
- **The thin topic components live in their own files** (`CompareArtsRows.tsx`,
  `CompareCourseRows.tsx`, `CompareClubsRows.tsx`, `CompareSummerRows.tsx`) rather than
  inside `CompareMatrixRows.tsx`, so each part is its own reviewable commit.
- **Phase 1 dropped the nine locales' overlay entries for the removed `top-tuition` label
  and note** (both the built overlay and the work file), because `check:live` fails the
  build on a stamp whose English no longer exists. Phase 2 re-extracts and re-splices
  `metric-values` as planned; the shifted `[N]` paths after index 20 render English in the
  other locales until then.
- **The `tuition-upper` stat tile now shows a sub-line** (`(2026–27 · grades 9–12)`),
  because every cell carries its year; `top-tuition` had none. Flagged for the review.
- **Browser check: the page-level overflow at 320/360/390 px is pre-existing.** Every
  Compare topic, including Sports and the two row-only topics, measures 1240 px wide on
  the live site too; it comes from `comparewide` (#438), not this branch. Recorded in
  memory and reported, not fixed here.
- **The division legend repeats on every band, not the first only** (user, 2026-11-07, at
  the English review): a reader deep in the Music band should not scroll back to Visual
  arts to decode LS · MS · US.
- **Arts claims may cite an exact course title from the school's own catalog** (user
  request at the English review, 2026-11-07: a second pass over Not-listed cells). The
  arts modules are prose and never mention Charlotte Christian's Upper School *Dance*
  elective, Hickory Grove's Middle School *Dance*, *Praise Team* and *Sewing*, Providence
  Day's Lower School *Band, Orchestra & Chorus* or its *Introduction to Printmaking*, all of
  which sit in `courseOfferings.ts`. A claim can now be `{ course: '…' }`, verified by
  `check:matrices` as an exact title in that division; 17 such claims landed (243 cites
  total). A web sweep of the nine schools' own sites for dance found nothing beyond
  athletics dance teams, after-school enrichment and a studio, except Davidson Day's
  "music, dance, and movement" line for Early Childhood, which is web-only and was not
  added (it would need source-material and an arts-module edit first).
