---
name: globalcompare
title: Put Global Exposure on Compare — five Key-stats rows with per-cell tooltips, and the "Compare on Global Exposure" button on school pages
status: english-done
phases: 2
created: 2026-10-26
branch: feat/globalcompare
prs: []
---

# Global Exposure on the Compare tool

## Goal

Take Global Exposure (slug `international-travel`) off the Compare deferral list so it gets a
Compare topic pill, a home-page "What you can compare" cell, and a **Compare on Global
Exposure** button on each researched school's page. Under that pill, add **five Key-stats
rows**, each cell carrying a **provenance tooltip** where it adds something a parent can't
read off the figure:

1. **Trips abroad, 2026–27**: the count, split by division on the second line.
2. **Youngest division that travels abroad**: Middle School or Upper School, with grades
   on the second line where the school states them.
3. **Trips with a host-family stay**: `homestays / trips on record`.
4. **Global diploma or certificate**: the credential's name, with its start year where
   published.
5. **Countries reached by trips**: our count of distinct countries, with the years the
   record covers on the second line.

It worked when `/compare/?topic=international-travel` shows the five rows for the six
researched schools (n/a for the other five high schools). Every filled cell opens a
tooltip, a school page's Global Exposure stat strip is unchanged, the button appears on the
six school pages, and `npm run coverage:floor` still reports **Davidson Day 23/36**.

## Context

**The deferral.** `COMPARE_DEFERRED_TOPICS` in `src/lib/manifest.ts:101-104` holds
`'international-travel'` and `'learning-support'`. It filters `comparableTopics`
(manifest.ts:124-128), which drives:
- the Compare pills, default topic, and `?topic=` validation (`src/pages/Compare.tsx:294-298, 326-329`);
- the home grid (`src/pages/Home.tsx:32-36`);
- the Compare meta description (`src/lib/head.ts:200-205`, `topicList(3, comparableTopics)`).

It also gates the school-page button directly (`src/pages/SchoolDetail.tsx:1079`:
`comparable && !COMPARE_DEFERRED_TOPICS.has(t.slug)`). **Deleting the one set entry turns
all of these on.** No component change is needed. `learning-support` stays deferred.

**Chrome already exists in all ten catalogs.** The topic label, `school.compareOn`, and the
Research-coverage row label `metrics.international-travel.redesign-research` ("Global
Exposure Research Dossier (2026)", present in every `src/locales/*.json`) are all in place.
The tooltip kicker reuses `compare.qual.scope` ("Scope note"). **This plan adds no chrome
keys.**

**Compare rows are `VALUE_METRICS` in `src/data/metricValues.ts`** (hand-maintained, 36
rows today, array closes at line 1972). `ValueMetric` (lines 33-117) carries `values`,
`subs` (second line), `quals` (per-cell tooltip, `CellQual = { kind, text }`), `noLead`,
`compareAs`, and `compareOnly`. Compare renders them at `Compare.tsx:495-608`; a cell with
`quals[slug]` renders through `CellQual` with the `compare.qual.<kind>` kicker.

**The same array feeds school-page stat tiles** (`SchoolDetail.tsx:780`, filtered by
`!vm.compareOnly`). The Global Exposure strip is the program's own `stats`, never
`VALUE_METRICS` (README in `src/data/internationalTravel/`), so **every new row is
`compareOnly: true`**. Without that, five tiles would appear above each section.

**The overlay is keyed by array index** (`valueMetricsForTopic`, `metricValues.ts:2014-2028`:
paths read `providence-day:[N].label`). The NC admit-rate plan (`ncadmitcompare.md`) inserted
rows mid-array and had to re-splice every shifted path. **Appending the five rows at the end
of the array (indices 36-40) shifts nothing.** The splice then only adds new units.

**The data** lives in `src/data/internationalTravel/<slug>.ts` for six schools: `cannon`,
`charlotte-christian`, `charlotte-country-day`, `charlotte-latin`, `davidson-day`,
`providence-day`. Each exports one `InternationalTravelProgram`. The trip ledger is
`trips.years[]` (`year`, `trips[]` with `dest`, `div: 'LS'|'MS'|'US'`, `group?`, `homestay?`).
The credential is `credential?`. These files import only types and **import cleanly under
plain Node 24** (verified while planning).

**Tooltips are expected on coded cells.** `npm run check:quals`
(`scripts/check_qual_coverage.mjs`) flags any non-null cell whose value looks coded (a
fraction, a phrase with words, …) and has no `quals` entry. It passes clean today, and every
existing phrase cell carries a tooltip. Rows 2, 3 and 4 are coded by that test. The user also
asked for tooltips "when it would be useful… we have done this before for other compare
cells" (2026-10-26). So **every non-null cell in all five rows gets a `quals` entry** (texts
below), and the rows' `note` explains the row as a whole.

**The `/add-school` floor parses `VALUE_METRICS`.** `scripts/coverage_floor.mjs`
(`readMetricRows`, lines 47-64) brace-matches `key:` / `values:` blocks and counts every row.
Counted, the five rows would make **Hickory Grove 27/41** the new floor: Davidson Day fills
all five and rises to 28/41, while Hickory Grove has no Global Exposure research. That
tightens the bar by four rows for any candidate without Global Exposure research. **The user
chose to leave these rows out of the floor** (2026-10-26).

## Decisions

- **Rows are appended at the very end of `VALUE_METRICS`**, in the order 1-5 above. This
  causes no overlay path shift. Compare filters by topic, so array position across topics
  does not matter.
- **Keys:** `travel-trips`, `travel-youngest-division`, `travel-homestays`,
  `travel-credential`, `travel-countries`. They contain no year, so a rollover changes the
  label, never the key.
- **Every row is `compareOnly: true`.** The school page already shows these facts in its
  cards, and its stat strip is the program's own `stats`.
- **Row 1 is strictly 2026–27.** Cannon publishes no 2026–27 trips (its latest ledger year
  is 2025–26), so its cell is `null` (n/a). A Cannon question already asks about this.
  Showing its 2025–26 count in a 2026–27 row would mix years. The year sits in the label;
  `check:travelrows` (Step 6) pins it to a `TRAVEL_YEAR = '2026–27'` constant.
- **Row 1 counts every ledger entry for the year, including sister-school exchanges.**
  That is how each school's own ledger presents them (Country Day's milestone: "Ten trips
  and exchanges", 2027).
- **Row 2 is a division, not a grade.** The grade sits on the second line only where the
  school states it. Davidson Day's AFAR Spain dig is open to 8th-12th graders *per AFAR*,
  but the school lists every dig under the Upper School. Its cell is therefore
  `Upper School`, and the tooltip carries the AFAR band, credited "per AFAR"
  (README third-party rule, 2026-10-18).
- **Row 3 is a fraction over the whole ledger.** `compareAs: 'fraction'` follows the
  `bucket-*` precedent. It is the consistent measure the user approved over sister-school
  counts, which mean different things per school: Country Day's "11 partnerships" counts
  Rotary and AFS. Partner-school counts stay on the school pages.
- **Rows 2 and 4 are `noLead: true`.** Neither is better-is-higher. Rows 1, 3 and 5 use the
  default max tint (row 3 tints by quotient).
- **Row 4 for Country Day, Latin and Charlotte Christian is `null`.** None of them publishes
  a global credential. Country Day's IB Diploma is not a global-studies credential, and
  Charlotte Christian's required Winterim credit is not one either. Each school's own
  questions already ask "is a credential planned?".
- **Row 5 is our count, not the school's.** The user chose "our count, with years"
  (2026-10-26). Counting rules, applied identically in the gate:
  - split `dest` on `,` and `&`;
  - England, Scotland and United Kingdom count as **one** country, the United Kingdom;
  - **domestic destinations are excluded** (today only Latin's 2025–26 `New Mexico`).
    This exclusion applies to rows 2, 3 and 5. New Mexico is not in 2026–27, so row 1 is
    unaffected.

  The window sub-line is `<n> school years, <first>–<last>`, e.g. `5 school years,
  2022–27`. Country Day's record (2022–23, 2023–24, 2026–27) honestly reads
  `3 school years, 2022–27`.
- **Charlotte Christian's ledger lists trips offered, not trips confirmed to run** (its
  Winterim packets). Its row 1, 3 and 5 tooltips say "offered".
- **No new source-material file.** Every figure is a count over the committed ledger, and
  every ledger trip is already cited in
  `source-material/international-travel/<slug>/<School> - International Travel - Source URLs.md`.
  Traceability is a header comment in `metricValues.ts` plus the `check:travelrows` gate,
  which re-derives each cell from the ledger. No ingest is needed.
- **Tooltips use the existing `quals` mechanism with `kind: 'scope'`.** That is the
  data-layer path, translated through the `metric-values` overlay. It is not a new
  `rowTip`, which composes from chrome keys and was built for the NC rows' live-term
  interpolation. These texts are static.
- **The coverage floor skips `international-travel` rows** through a named constant in
  `coverage_floor.mjs`. The output, and every document quoting 23/36, stays unchanged.

## Approvals needed

- **UX gate — GRANTED (2026-10-26).** The user approved, in so many words:
  - taking Global Exposure off `COMPARE_DEFERRED_TOPICS`;
  - adding rows 1-5 as Compare rows / metric keys;
  - showing the Compare button for Global Exposure on the school page;
  - per-cell tooltips "when it would be useful".

  The home "What you can compare" cell and the Compare meta-description change follow
  automatically from the same set. Both are part of the approved change, not separate
  additions.
- **Coverage-floor treatment — DECIDED (2026-10-26):** leave these rows out of the floor.
- **Deploy: not part of this plan.** Merge, then stop.

## Out of scope

- Learning Support on Compare. It stays in `COMPARE_DEFERRED_TOPICS`.
- The "what the trips are mainly for" row and the program start-year row (discussed and not
  chosen), and partner-school counts and community figures as rows.
- Any change to the Global Exposure cards or their data. Research for the five schools with
  no Global Exposure data. A row-header `rowTip`.

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/globalcompare`.

2. **Un-defer the topic.** In `src/lib/manifest.ts`, delete `'international-travel',` from
   `COMPARE_DEFERRED_TOPICS`. Rewrite the doc comment above it (lines 90-100) so it names
   only Learning Support, and add one line: International Travel was deferred 2026-10-11
   and moved onto Compare 2026-10-26 (plan `globalcompare`). No other code change: the
   button, pills, home cell and meta description all derive from this set.

3. **Append the five rows** at the end of `VALUE_METRICS` (before the closing `]` at
   `metricValues.ts:1972`). Start with a section comment:
   - Global Exposure rows, user-approved 2026-10-26 (plan `globalcompare`);
   - every cell is **derived from `src/data/internationalTravel/<slug>.ts`** and
     re-derived by `check:travelrows`, so a ledger change fails the build until these
     cells follow;
   - each trip is cited in that school's `Source URLs.md`;
   - `compareOnly` because the section's strip is its own `stats`;
   - the counting rules (UK as one, domestic excluded).

   **Every row:** `topic: 'international-travel'`, `compareOnly: true`. List **all 11
   comparable schools** in `values`, in the school-key order the neighbouring rows use, with
   `null` for `carmel-christian`, `charlotte-catholic`, `covenant-day`, `gaston-day` and
   `hickory-grove-christian` (and any cell marked n/a below). Never omit a key:
   `check:metrics` treats a missing key as an oversight.

   The English drafts below are reviewed at the Phase 1 stop.

   **Row 1: `travel-trips`.** Label `Trips abroad, 2026–27`.
   Note: *Each school's trips and exchanges abroad listed for the 2026–27 school year.
   Beneath, how many are Upper School and how many Middle School.*

   | School | value | sub | quals.text |
   |---|---|---|---|
   | providence-day | `4` | `3 Upper School · 1 Middle School` | Japan, Iceland and France (a Montpellier exchange week) for grades 9–11, and Switzerland for grades 6–8, all planned for summer 2027. |
   | charlotte-country-day | `10` | `4 Upper School · 6 Middle School` | Middle School: Québec City, Arequipa (Peru), Southampton, Monteverde (Costa Rica), France and Italy. Upper School: Rwanda, Greece, China and Argentina. |
   | charlotte-latin | `8` | `6 Upper School · 2 Middle School` | Upper School: Argentina, France, Italy, Spain and two South Africa programs. Middle School: Southern England and Montreal + Québec City. All in summer 2027. |
   | charlotte-christian | `7` | `7 Upper School` | Trips offered in the Winterim 2027 packet: Brazil, Canada, Dominican Republic, Iceland, Italy, Mexico and Portugal. The school sets final trips by registration. |
   | davidson-day | `3` | `3 Upper School` | AFAR archaeology digs in Spain, Portugal and Belize, summer 2027. |
   | cannon | `null` | — | — |

   **Row 2: `travel-youngest-division`.** Label `Youngest division that travels abroad`.
   `noLead: true`. Note: *The youngest school division with a trip abroad on the school's
   trip record. Beneath, the grades where the school states them.*

   | School | value | sub | quals.text |
   |---|---|---|---|
   | providence-day | `Middle School` | `grades 6–8` | A Middle School trip to Switzerland for grades 6–8 is planned for summer 2027. Middle School students also went to Greece in 2023–24 and to England and Ecuador in 2024–25. |
   | charlotte-country-day | `Middle School` | `from 6th grade` | Six Middle School experiences in 2026–27, starting with a 6th-grade sister-school exchange to Québec City. |
   | charlotte-latin | `Middle School` | `rising 7th–9th graders` | Two Middle School programs in summer 2027: Southern England and Montreal + Québec City. |
   | cannon | `Middle School` | — | A Middle School trip to Costa Rica in summer 2026. |
   | charlotte-christian | `Upper School` | `from 9th grade` | Every Winterim trip abroad is Upper School. Some are open from 9th grade. |
   | davidson-day | `Upper School` | — | Every trip on record is an AFAR archaeology dig listed under the Upper School. AFAR opens its Spain dig to 8th–12th graders, per AFAR. |

   **Row 3: `travel-homestays`.** Label `Trips with a host-family stay`.
   `compareAs: 'fraction'`. Note: *Of the trips abroad on each school's trip record, how many
   include living with a host family, usually on a sister-school exchange. Our count;
   beneath, the years each record covers.*

   | School | value | sub | quals.text |
   |---|---|---|---|
   | providence-day | `4 / 19` | `5 school years, 2022–27` | Host families in Montpellier (2022–23 and 2026–27), Seville (2022–23) and Bogotá (2024–25). |
   | charlotte-country-day | `5 / 20` | `3 school years, 2022–27` | Host families in Québec City, Arequipa, Southampton and Monteverde (2026–27), and Seville (2023–24). |
   | charlotte-latin | `7 / 21` | `4 school years, 2022–27` | Host families in Buenos Aires (2022–23 and 2026–27), Bordeaux (2024–25 and 2026–27), and Guastalla, Pietermaritzburg and Cádiz (2026–27). |
   | cannon | `0 / 5` | `2 school years, 2024–26` | None of the trips on record includes a host-family stay. |
   | charlotte-christian | `0 / 35` | `5 school years, 2022–27` | None of the Winterim trips offered on record includes a host-family stay. |
   | davidson-day | `0 / 9` | `3 school years, 2023–27` | None of the trips on record includes a host-family stay. |

   **Row 4: `travel-credential`.** Label `Global diploma or certificate`. `noLead: true`.
   Note: *A global-studies credential a student can earn by graduation, as the school names
   it.*

   | School | value | sub | quals.text |
   |---|---|---|---|
   | providence-day | `Global Studies Diploma` | `since 2007` | An optional second diploma, grades 9–12: global coursework, four years of one language, travel or hosting, and a Global Leadership course. About 20 students earn it in a typical class. |
   | cannon | `Global Studies Certificate` | — | Awarded at Senior Night: a required senior course with a capstone, four Mastery Credit strands, and global experiences beyond the classroom. |
   | davidson-day | `Global Studies Diploma Distinction` | `since 2021` | An Upper School distinction: Honors Anthropology, four global APs, a language, a 100-hour practicum and two years of original research. |
   | charlotte-country-day, charlotte-latin, charlotte-christian | `null` | — | — |

   Before typing them, re-read each credential's wording against that school's
   `credential.headline` / `stats` / `required`. The texts above are paraphrased from those
   fields and must not claim anything the card doesn't. PD's 2007 is
   `milestones.events` "The Global Studies Diploma". PD's "about 20" is the credential stat
   `~20`. DD's 2021 is its credential stat.

   **Row 5: `travel-countries`.** Label `Countries reached by trips`. Note: *Our count of
   the different countries on each school's trip record, with England and Scotland counted
   as the United Kingdom. The records cover different years at different schools (beneath),
   so a longer record can reach more countries.*

   | School | value | sub | quals.text |
   |---|---|---|---|
   | providence-day | `16` | `5 school years, 2022–27` | Colombia, Denmark, Ecuador, France, Greece, Iceland, Japan, Kenya, South Africa, South Korea, Spain, Sweden, Switzerland, Thailand, the United Arab Emirates and the United Kingdom. |
   | charlotte-country-day | `21` | `3 school years, 2022–27` | Argentina, Canada, China, Costa Rica, Denmark, France, Germany, Greece, Iceland, Italy, Japan, Morocco, New Zealand, Oman, Peru, Poland, Rwanda, Spain, Sweden, the United Arab Emirates and the United Kingdom. The school's own count is 27 countries since 2015. |
   | charlotte-latin | `10` | `4 school years, 2022–27` | Argentina, Belgium, Canada, France, Germany, Italy, the Netherlands, South Africa, Spain and the United Kingdom. |
   | cannon | `4` | `2 school years, 2024–26` | China, Costa Rica, the Dominican Republic and Germany. |
   | charlotte-christian | `17` | `5 school years, 2022–27` | From Winterim trips offered: Austria, Brazil, Canada, Costa Rica, Cuba, the Dominican Republic, Ecuador, France, Germany, Greece, Iceland, Ireland, Italy, Mexico, Panama, Portugal and the United Kingdom. |
   | davidson-day | `3` | `3 school years, 2023–27` | Belize, Portugal and Spain. |

   Every `quals` entry is `{ kind: 'scope', text: '…' }`. Keep the texts free of internal
   apparatus ("ledger", "our tally file", plan names). They render to parents.
   **No trip prices and no exact travel dates** (README privacy rule): season + year only,
   as written above.

4. **Check the trip-count sentences against the data** before moving on. Each row-1 tooltip
   lists exactly that school's 2026–27 `dest` values. Each row-3 tooltip names exactly the
   `homestay` places. Each row-5 tooltip lists exactly the derived country set. Step 6's gate
   checks the figures, not the prose. For the prose, dump the ledger as this plan's research
   did (one `node -e` import per file) and compare by eye.

5. **Leave the school page alone, and confirm it.** `SchoolDetail.tsx:780` already filters
   `compareOnly`. No edit is needed there. Its comment at lines 1076-1078 stays accurate for
   Learning Support.

6. **Add a build gate: `scripts/check_travel_compare_rows.mjs` → `npm run check:travelrows`.**
   Model the header comment on `scripts/check_nc_compare_rows.mjs` (same structure: why it
   exists, what it asserts, how to run it). It imports `src/data/metricValues.ts` and every
   `src/data/internationalTravel/*.ts` under plain Node (each exports one object; take
   `Object.values(mod)[0]`). The counting helpers live **only here**. Declare
   `TRAVEL_YEAR = '2026–27'`, `DOMESTIC = new Set(['New Mexico'])`, and
   `UK = new Set(['England', 'Scotland', 'United Kingdom'])`. Assert:
   - exactly five `international-travel` rows, keys in the order above, **contiguous and last
     in the array** (an insert elsewhere would shift overlay paths), all `compareOnly: true`;
   - row 1's label contains `TRAVEL_YEAR`. For each program: if a ledger year equals
     `TRAVEL_YEAR`, value = trip count and sub = `"<u> Upper School · <m> Middle School"`
     (omit a zero side; Lower School is added the same way if an `LS` trip ever appears);
     otherwise the value is `null` and there is no sub;
   - row 2: value = youngest of `LS`→`Lower School`, `MS`→`Middle School`,
     `US`→`Upper School` over non-domestic trips. Subs are not derived (hand-written grades);
   - row 3: value = `"<homestays> / <trips>"` over non-domestic trips, and sub = the window
     string;
   - row 4: non-null **iff** the program has `credential`;
   - row 5: value = the distinct-country count (split `dest` on `/,\s*|\s*&\s*/`, fold UK,
     drop DOMESTIC), and sub = the window string;
   - window string = `` `${n} school year${n === 1 ? '' : 's'}, ${first}–${last}` ``, where
     `first` is the start year of the oldest ledger year (`2022`) and `last` is the two-digit
     end of the newest (`27`);
   - every school **without** a program is `null` in all five rows, and **every non-null cell
     has a `quals` entry**;
   - **guard against a silent new destination:** any `dest` piece that is neither in a
     `KNOWN` set nor `DOMESTIC` fails with "classify `<x>` as a country or domestic". Seed
     `KNOWN` from today's data. This is the check that would have caught `New Mexico`.

   Exit 1 with a per-cell message on any mismatch. Add
   `"check:travelrows": "node scripts/check_travel_compare_rows.mjs"` to `package.json` and
   chain `&& npm run check:travelrows` into `build` right after `check:ncrows`.
   **Negative tests** (standing rule: corrupt the artifact under test, read *which* message
   printed, then restore to `git diff`-clean):
   - (a) change Latin row 5 `10` → `11`;
   - (b) delete one `quals` entry;
   - (c) temporarily add a fake trip with a new `dest` to a **copy** of the ledger. Simplest:
     point the script at a scratch directory via an env var, *or* skip (c) and record why in
     the implementation notes.

   Each must fail for the right reason.

7. **Keep the floor at 23/36.** In `scripts/coverage_floor.mjs`:
   - make `readMetricRows()` capture each row's `topic` as well as its `key` (each row writes
     `topic: '…'` immediately before `key: '…'`);
   - add `const FLOOR_EXCLUDED_TOPICS = new Set(['international-travel'])`, with a comment:
     the user decided 2026-10-26 that Global Exposure rows do not count toward the
     `/add-school` bar, since the area is built by its own `/global-exposure` skill and
     counting it would make Hickory Grove 27/41 the floor;
   - filter rows by that set before counting. **The printed row total stays 36.** Optionally
     print one line naming the excluded rows and how many there are. `npm run coverage:floor`
     must print **Davidson Day 23/36 (63%)**, byte-identical to `main` apart from that line.

   Then add one sentence to `CLAUDE.md`'s "Adding a school — `/add-school`" section, where the
   row total is explained: *The five Global Exposure Compare rows (2026-10-26) are excluded
   from the floor by `FLOOR_EXCLUDED_TOPICS` in `coverage_floor.mjs`. A candidate is never
   gated on Global Exposure research.* Add the same sentence to the floor discussion in
   `.claude/skills/add-school/SKILL.md`.

8. **Update the documents that say Global Exposure is off Compare:**
   - `src/data/internationalTravel.ts` header (lines 7-10): it is on Compare since
     2026-10-26 through five `compareOnly` rows in `metricValues.ts`. The stat strip is
     still the program's own `stats`.
   - `src/data/internationalTravel/README.md`: replace the "deliberately off Compare"
     sentence. Add a rule under "The rules every school file follows": **a ledger change
     moves the Compare rows.** Adding or removing a trip, homestay or credential changes the
     `travel-*` cells, and `check:travelrows` fails the build until `metricValues.ts`
     follows (value, sub and the tooltip text).
   - `.claude/skills/global-exposure/SKILL.md` § B5: add to the `/plan` brief that a new
     school's plan **must fill its five `travel-*` Compare cells, with tooltips**, and that
     `check:travelrows` derives them. The plan may also touch `metric-values` overlays in
     its Phase 2. **This is a material change to a skill, so update its entry in
     `.claude/SKILLS.md` in this same PR** (one line under the `global-exposure` block; bump
     "updated" to 2026-10-26).
   - `scripts/gen_data_schema.mjs`: the comment at lines 233-234, and the two prose lines at
     ~900 and ~918, still say International Travel is deferred. Change them to say
     `COMPARE_DEFERRED_TOPICS` holds only Learning Support. Then `npm run schema`.
     `DATA-SCHEMA.md` §4 lists five Global Exposure rows (flag `C`), the total reads 41, and
     §7's text no longer names International Travel as deferred.

9. **Splice the new strings into the nine work files** (they stay English until Phase 2).
   For each lang in `PROSE_TRANSLATED` (`es bn ht te fr fa it hi ar`, `src/lib/i18n.ts:182`):
   `node scripts/i18n_splice_work.mjs --lang <lang> --topic metric-values`. Expect **0
   dropped**. The added units should be only the new labels, notes, subs, quals texts and any
   value strings not already present. Numbers like `10` may already exist and be **kept**,
   which is fine. Then rebuild the overlay with `node scripts/i18n_build_overlay.mjs` for
   `metric-values` per lang (check its usage line for flags). Then run the zero-duplicate-`at`
   assertion from `ncadmitcompare.md` Phase 1 step 6. Spot-check that an existing row's
   Spanish label is still at its old index, for example `[35]`, the last pre-existing row.

10. **Verify (Phase 1 checklist), commit, push, and open the PR.** Stage explicit paths only,
    after `git status --short`. The untracked
    `source-material/learning-support/providence-day/` belongs to other work: **do not stage
    it.** Set this plan's status to `english-done` and the INDEX row to `English shipped`.

**→ STOP. `/implement` ends its turn here and waits for the user's review** of the rendered
English: the five labels, the notes, the sub-lines and every tooltip text. Nothing below
runs until they confirm.

### Phase 2 — Every other locale

Research-prose layer only: the `metric-values` overlay, per `PROSE_TRANSLATED`
(`es bn ht te fr fa it hi ar`). **No `src/locales/*.json` change.** Every chrome string
already exists. For the mechanism, read `.claude/docs/prose-translation-architecture.md`;
for register and traps, read the matching `.claude/docs/prose-translation-<lang>.md`.
Italian has no rollout doc, so follow Telugu's or Bangla's method.

1. **Translate the new units** in each `src/data/overlays/work/metric-values.<lang>.json`,
   only those with `t: ''`, identified by `of` stamp and never by position:
   - labels, notes, subs, quals texts;
   - **figures copied char-for-char**: `4 / 19`, `10`, `2026–27`, `2022–27`, the `/`
     spacing, no separator swap, no native digits typed in. `bn`/`fa` digits and `hi`/`te`
     grouping happen at render;
   - **school-year spans** follow the "Dates and session labels" rule in
     `src/data/overlays/NOTES.md`. `summer 2027` translates; its digits do not;
   - **proper names stay as the school writes them**: `Global Studies Diploma`,
     `Global Studies Certificate`, `Global Studies Diploma Distinction`, `AFAR`,
     `Winterim`, `Mastery Credit`, `Global Leadership`, `Honors Anthropology`, school names
     such as Externat Saint-Coeur de Marie;
   - **place names** take each locale's normal exonym (es `Inglaterra`, fr `Angleterre`)
     the way the Global Exposure overlays already render them. Reuse those translations for
     consistency (grep `international-travel.<lang>.json` for the country name);
   - `Upper School` / `Middle School` follow each locale's existing rendering in the Global
     Exposure overlay. The CLAUDE.md Hindi note keeps `Upper School` Latin in `hi`. Match
     whatever each locale already does; never invent a new one.
2. **Build the overlays** (`i18n_build_overlay.mjs`, `metric-values`, per lang), then re-run
   the zero-duplicate-`at` assertion.
3. **Run Phase 2 verification**, commit, push, merge
   (`gh pr merge --squash --delete-branch`), then `git checkout main && git pull`. Flip the
   INDEX row to `Implemented` with the PR link, and add `## Implementation notes` here if
   anything deviated. **Do not deploy.** Say "merged — ready to deploy whenever you want it"
   and stop.

## Files touched

| File | Change |
|---|---|
| `src/lib/manifest.ts` | edit: drop `international-travel` from `COMPARE_DEFERRED_TOPICS`; comment |
| `src/data/metricValues.ts` | edit: five `travel-*` rows appended, with `subs` + `quals` |
| `scripts/check_travel_compare_rows.mjs` | new: `check:travelrows` gate |
| `package.json` | edit: script + chained into `build` |
| `scripts/coverage_floor.mjs` | edit: capture `topic`; `FLOOR_EXCLUDED_TOPICS` |
| `scripts/gen_data_schema.mjs` | edit: deferral comments/prose |
| `.claude/docs/DATA-SCHEMA.md` | regenerated |
| `src/data/internationalTravel.ts`, `src/data/internationalTravel/README.md` | edit: on Compare; ledger-change rule |
| `.claude/skills/global-exposure/SKILL.md`, `.claude/SKILLS.md` | edit: new schools fill the five cells |
| `CLAUDE.md`, `.claude/skills/add-school/SKILL.md` | edit: one sentence on the floor exclusion |
| `src/data/overlays/work/metric-values.<lang>.json` ×9, `src/data/overlays/metric-values.<lang>.json` ×9 | Phase 1 splice (English placeholders); Phase 2 translations |
| `.claude/plans/INDEX.md`, this plan | status, PR, notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean (trust `tsc -b`, not `tsc --noEmit`)
- [ ] `npm run check:travelrows`: passes, and every negative test failed with the right message
- [ ] `npm run check:quals`: still prints "✓ every coded Compare cell carries a provenance tooltip"
- [ ] `npm run check:metrics`: no new findings
- [ ] `npm run coverage:floor`: **Davidson Day 23/36 (63%)**, as on `main`
- [ ] `npm run check:seo`: passes (the Compare meta description stays ≤160 chars)
- [ ] `npm run check:schema`, `npm run check:live`, `npm run check:chrome`: pass
- [ ] Zero-duplicate-`at` assertion passes for all nine locales
- [ ] `npm run build`: succeeds
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright; don't wait on `networkidle`):
  - `/compare/?topic=international-travel` with all 11 schools: a Global Exposure pill; five Key-stats rows in order; n/a for the five unresearched schools and for Cannon row 1 and CCD/Latin/CCHS row 4. Leader tint on CCD (row 1: 10), Latin (row 3: 7 / 21) and CCD (row 5: 21), and none on rows 2 and 4. **Open every tooltip** (hover/focus each `.qual-dot` cell) and confirm the text and the "Scope note" kicker.
  - Home page: "What you can compare" now includes Global Exposure, and its link opens that pill.
  - A school page with the area (Providence Day): the Global Exposure header shows **Compare on Global Exposure →**, it opens the right pill, and the stat strip shows the **same tiles as `main`** (no `travel-*` tiles). A school without the area (Gaston Day) shows no Global Exposure section. Learning Support still has **no** Compare button.
  - Phone width: `npm run audit:mobile` passes, or at minimum the Compare table scrolls inside its frame at 360px with the longest tooltip open.
  - `?lang=es` on the Compare view: the new rows show English (expected until Phase 2), and every **other** topic's rows are still Spanish.

### Phase 2 — Locales

- [ ] `npm run check:runtime`, `npm run check:live`: pass
- [ ] `npm run check:sepdrift -- --lang <code>` for each of the nine: no new findings in `metric-values`
- [ ] `npm run check:dates`, `npm run check:fr`, and the RTL/script checks the rollout docs name for `fa`/`ar`/`hi`: pass
- [ ] `npm run build`: succeeds
- [ ] **Browser check in every prose locale** on `/compare/?topic=international-travel`: labels, notes, subs and every tooltip translated; credential names Latin; figures correct. In `fa`/`ar`, `4 / 19` still reads homestays-over-trips and `2022–27` does not reverse (memory "RTL figure ranges reverse"). Non-Latin assertions are not case-sensitive substring checks (memory "innerText case false-pass").

## Risks

| Risk | Mitigation |
|---|---|
| A future trip added to a ledger leaves the Compare cells stale | `check:travelrows` re-derives every figure on every build; the README and global-exposure skill say so |
| The 2027–28 rollover: row 1 silently keeps showing 2026–27 | The year is a named constant pinned to the label; bump both together (README note) |
| A new domestic destination counted as a country | The `KNOWN`/`DOMESTIC` guard fails on any unclassified `dest` piece |
| Rows inserted mid-array shift overlay paths | Appended last; the gate asserts contiguous-and-last |
| Five `travel-*` tiles leak onto school pages | `compareOnly` + the school-page browser check |
| Tooltip prose drifts from the ledger (the gate checks numbers, not words) | Step 4 eyeball pass; the README rule names the tooltip text as part of a ledger change |
| Floor docs go stale | The floor is unchanged by design (`FLOOR_EXCLUDED_TOPICS`); the coverage:floor output is checked against `main` |

## Open questions

- Should the row explanations be **row-header tooltips** (as the NC rows ended up with)
  rather than visible notes? **Default:** keep visible `note`s. The user can ask for the
  switch at the Phase 1 review. It would need a new `rowTip` kind plus chrome keys, which
  makes Phase 2 a chrome job too.
- Cannon row 1 is n/a until Cannon publishes 2026–27 trips. **Default:** leave it `null`.
  Do not substitute 2025–26.

## Implementation notes

- **`check:spans` needed an `EXPECTED` entry the plan did not list.** Every
  `compareAs` row must record its confirmed leader in `scripts/check_span_metrics.mjs`,
  so the first build failed on `travel-homestays`. Added
  `{ slugs: ['charlotte-latin'], min: 7 / 21 }` (Latin 7/21 over CCD 5/20 and PD 4/19,
  the same tint the plan's browser check expects).
- **Negative test (c) was run, not skipped:** `check:travelrows` takes
  `TRAVEL_DIR=<dir>`, and a scratch copy of the ledgers with a fake `Hawaii` trip failed
  with "classify "Hawaii" as a country (KNOWN) or domestic (DOMESTIC)" plus the four
  derived-figure mismatches it causes.
- **Row 3 shows the homestay count only, no denominator** (user decision at the Phase 1
  review, 2026-10-26). `7 / 21` read as "7 of this year's trips" beside row 1's
  2026–27 count. Cells are now `7`, `5`, `4`, `0`; the years sub-line stays so a longer
  record's advantage is visible; `compareAs: 'fraction'` and its `check:spans` entry are
  gone, and the default max tint still picks Latin. The plan's step-3 row-3 table above
  shows the original fractions.
- The splice added **63** units per locale, 0 dropped. `Middle School` / `Upper School`
  were new to `metric-values` (they live in the `international-travel` overlay today), so
  Phase 2 should reuse those renderings.
