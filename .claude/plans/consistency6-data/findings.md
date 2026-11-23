# consistency6: rescan of consistency5

- **Date:** 2026-11-23
- **Mode:** RESCAN of round 5 (plan `consistency5`, PR #522)
- **SCANNED_SHA:** `638a4d3e` (main)
- **Previous scan base:** `5d26847a`
- **Groups:** `pd-ccd-cannon`, `latin`, `cc-cchs-cov-carmel`, `dd-gd-hg-k8` (all 13 schools)
- **Files:** each sweep as returned (`rescan6-*.md`), `r8.txt`, and this file. Where they differ, this file is the verified version.
- **Verdict:** NOT CLEAN, but far smaller than any earlier round. 1 Part 1 row is partial and 13 new findings stand (11 rows after two cross-school merges). Nothing is NOT RESOLVED or regressed.
- **Caused by round 5:** 2. CAN-U7 is partial (its fix renamed one point and missed the headline), and round 5's LAT-U13 dated the low chip at three schools only, which left the mixed labels in X1.

## How this was verified

- Every Part 2 quote was tested against the page dumps by script: all 14 hold, with the counts the sweeps gave. PREP-V1's `dayLabel: 'Mon–Fri'` beside "$400 in the four-day week" was read in `src/data/summer/charlotte-prep.ts`.
- The chip labels in X1 were counted on all 11 high-school pages (see X1).
- The parent re-opened no source. The evidence for each row is the sweep's own fetch, saved copy or recount. **Re-open each before typing a value.**
- No refused host was requested. Two redirects were read before being followed: a Google Docs 307 to docs.googleusercontent.com, and a clshawks.com 302 to an image CDN.
- **Names:** every sweep file and every appended line was screened against the local name list (0) and against the Cannon instructor values withheld in round 5 (0). One sweep's own `git diff` of a regenerated content chunk printed a withheld name in its command output. It was copied nowhere: the screens above found 0 in every file it wrote. The only copies left in `src` are the six Learning Support staff-list mentions that stay named as staff. No Latest News content was scanned.

## Part 1: regression check

| group | rows | RESOLVED | NOT RESOLVED | PARTIAL / REGRESSED | UNCHANGED BY DECISION | n/a |
|---|---|---|---|---|---|---|
| pd-ccd-cannon | 168 | 160 | 0 | 1 | 7 | 0 |
| latin | 85 | 78 | 0 | 0 | 1 | 6 |
| cc-cchs-cov-carmel | 141 | 137 | 0 | 0 | 3 | 1 |
| dd-gd-hg-k8 | 122 | 118 | 0 | 0 | 4 | 0 |
| **all** | 516 | 493 | 0 | 1 | 15 | 7 |

The cc-cchs-cov-carmel sweep marked X2 (fall 2026 results) PARTIAL for Charlotte Christian and Covenant. Round 5's step 5 limited X2 to Providence Day, Country Day and Latin (and Catholic's stale-text check), so those two are counted n/a here, and their stale lines are new findings in X2 below, caused by the season moving rather than by round 5.

| row | what is left | caused by round 5? | fix |
|---|---|---|---|
| CAN-U7 | The Verdict point was renamed "The arts carry academic course levels", but the Verdict headline still says "An arts department that weights the arts like academics — 24 courses all at honors or above" (Cannon L833–834, `artsPrograms/cannon.ts` ~L346) | yes | C: "An arts department that sets every arts course at an academic level — …" |

## Part 2: new findings (after merges)

| id | cat | school | section | value A | value B | proposed change |
|---|---|---|---|---|---|---|
| LAT-V1 | A | Charlotte Latin | Sports › Sports Offered headline and tile | "165 state championships across 21 sports since the NCISAA formed in 1973" (L1015) and tile "165 / state titles since 1973" (`sportsPrograms/charlotte-latin.ts` :33, :38), from Wikipedia | The school's athletics site (clshawks.com team-championships page, graphic dated 2026-06-08): "200 NCISAA STATE TITLES", 23 sport lines summing to 200. The Cup record already noted the school's own 198 through Dec 2025 | "200 NCISAA state titles through spring 2026 (the school's athletics site)". Drop "21 sports". Do not type 201. Fix the record |
| LAT-V2 | A | Charlotte Latin | Sports › College Pipeline reality check | "the program's eleven historic state titles" (L1348, :276) | The same graphic: "12 FOOTBALL". 11 is one coach's count, 1987–2016 (clshawks.com hall of fame) | "twelve state titles", or "eleven under one coach, 1987–2016". Close the record's open "11 or 12" |
| PD-V1 | A | Providence Day | College Support › Transcript tile and ask | "30 · AP courses in the profile’s course table, 29 of them examined in May 2026" (L2371–2372) | The 29 are exam subjects: Art and Design and Physics C print two rows each, so 27 of the 30 courses have an exam row. The ask names only AP German and AP Business; AP Music Theory (counted on Arts and Compare) has no row either | Tile label: "…; its May 2026 score table covers 29 exam subjects". The ask names all three courses |
| PD-V3 | A | Providence Day, Country Day | Financial Aid › Beyond Tuition vs After School | PD lists the $1/min late fee (L3330) but not the $30/hr adjustment rate or the $25 enrichment withdrawal fee on its After School card. CCD lists no late fee | CCD After School: "Late pickup: $10 per 10-minute interval after 6:00 p.m." (L2352) | **User decision:** (a) list every Extended Day charge (PD 20 items, 50% unpriced; CCD 13 items), or (b) exclude late and adjustment fees and say so (PD 17 items, 59% unpriced) |
| PREP-V1 | A | Charlotte Prep | Summer › Camp Catalog | Kidokinetics row `dayLabel: 'Mon–Fri'` over June 15–18 and July 13–17 | The row's own "$400 in the four-day week", the headline "June 15–18 was the one four-day week", and Rhythm & Beats in the same week reading "Mon–Thu" | `dayLabel: 'Mon–Thu (June) · Mon–Fri (July)'`, or one sentence in the description. A sibling of round 5's X4 |
| X2 | A + C | Charlotte Christian, Covenant Day | Sports › Winning Record | CC: "Providence Day has ended the Knights’ season in each of the last three years" (L1296–1297) and "three years running" (L1349). COV: "field hockey (eliminated in overtime by Providence Day)", undated (L972) | NCISAA 2026–27 brackets: Cannon beat Charlotte Christian 51–14 in the quarterfinal (so 2024–26 is false); Covenant lost to Cary Christian 3–0 in fall 2026 | CC (A): "…in 2023, 2024 and 2025" and "three years running, 2023–25". COV (C): "…by Providence Day in 2025–26". The LAT-U12 shape |
| LAT-V5 | B | Charlotte Latin | The Arts › Ladder, Theatre, Verdict vs Course Offerings › Middle School | "the backstage/technical course starts in Grade 6" (L887, L911, L996) | The performing-arts tab says "Backstage (Grades 6-12)"; the Middle School Grade 6 electives list Art, Band, Concert Choir, Engineering and Strings, and no backstage course | Attribute both pages, do not call it a course, and ask: a class or an after-school crew? Code comment (Arts takes no verify flag) |
| X1 | C | 11 high schools | College Support › Admission Rates table | "NC State University … the most selective of the six" or the same on UNC-Chapel Hill, undated, at 8 schools (PD L2231, CCD L2097, Cannon L1701; also Covenant, Gaston Day, Catholic, Christian, Hickory Grove). Latin, Carmel and Davidson Day read "the lowest of the six in Fall 2025" | "largest admit rates of the six" is undated at all 11. At Latin (ECU 5-yr 90.7%, 39 of 43, vs UNC Greensboro 94.7%, 18 of 19; Fall 2025 a 100% tie) and Cannon (UNC Charlotte 96% vs UNC Greensboro 100%) it names a campus that does not hold the highest rate on every basis | Low chip: "the lowest of the six in Fall 2025" at the other 8. High chip: a dated form ("the highest of the six in Fall 2025", "tied with …" where tied) at all 11. Data only, plus the rule candidate below |
| DD-V1 | C | Davidson Day | Global Exposure › Verdict vs its ledger and College Support | "The Belize work spent 20 seasons at Cahal Pech before its current site." (`internationalTravel/davidson-day.ts` :447, L367) | "It moves to Baking Pot in 2027." (L1916, L1931); the ledger's Summer 2027 row | "…The Belize work moves to Baking Pot in summer 2027, after 20 seasons at Cahal Pech." Was on round 5's "For the next round" list |
| LAT-V3 | C | Charlotte Latin | Sports › Winning Record matrix vs the Cup point sources | "State-title matrix, last 3 seasons" (L1262) has runner-up-only volleyball and field hockey rows, but no row for girls soccer, boys tennis or girls cross country | The Cup card on the same page: girls soccer runner-up 2024 and 2025, girls cross country runner-up 2024, boys tennis runner-up 2025 and 2026 (L1254–1258), five finals inside the window | Add three rows with RUNNER-UP cells (overlay paths move), or retitle "Titles, plus selected finals" |
| CAN-V1 | C | Cannon | College Support tile, Compare `ap-performance` note and qual vs the ask | "90% · of students scored 3+" (L1801–1802); the Compare note and qual also call it a share of students | The ask: "does the 90.16% count students or exams?" (L1888), and a dev-only flag saying the basis is not stated | Keep 90% and the ask. Tile and quals quote the profile's own label, "Students with Scores 3+", without stating the basis as settled |

### Tally

| | A | B | C | D | rows |
|---|---|---|---|---|---|
| new findings | 6 (LAT-V1, LAT-V2, PD-V1, PD-V3, PREP-V1, CC-V1) | 1 (LAT-V5) | 6 (COV-V1, X1 as PD-V2 + LAT-V4, DD-V1, LAT-V3, CAN-V1) | 0 | 11 after merging |

By school: Charlotte Latin 5 (LAT-V1–V5, with LAT-V4 in X1), Providence Day 3 (PD-V1, PD-V3, and PD-V2 in X1), Cannon 1 (CAN-V1) plus CAN-U7 and X1, Country Day in PD-V3 and X1, Charlotte Christian and Covenant in X2, Davidson Day 1, Charlotte Prep 1. The five other high schools appear only in X1. Trinity, Hickory Grove (except X1), Gaston Day (except X1), Catholic (except X1) and Carmel (except X1): none.

## Approvals the plan will need

None. No row is UX-GATE or CHROME. LAT-V3's first option adds rows to an existing matrix, which is data (overlay paths move in Phase 2).

## Decisions only the user can make

- **PD-V3:** which basis Beyond Tuition uses for late and adjustment fees, (a) or (b).
- **LAT-V5:** the ask wording (a class or an after-school crew).
- **LAT-V3:** add the three runner-up rows, or retitle the matrix.
- **LAT-V1:** the school's own 200 replaces Wikipedia's 165, as the sweep proposes. The 200 counts through spring 2026, while the page also reports a fall 2026 title. Default: print 200 with its date, and never type 201.

## Rule candidates

- **Dated superlatives on the Admission Rates table** (X1, 11 schools). `check:ncsuper` already fails a low label it cannot read and accepts the dated low form. Extend it to require the dated form for both labels (`LOW_LABEL` and `HIGH_LABEL`), and to check that the dated high label names the campus with the highest Fall 2025 rate (or every campus tied at it). It would have caught all of X1. Calibrate to zero on the fixed tree before it gates.
- Not proposed (one school each): a Winning Record matrix vs Cup point-source rule (LAT-V3), and a camp row's `dayLabel` vs its dated weeks (PREP-V1). The second is close to the turned-down short-week rule.

## Settled, skipped and reopened

Skipped as settled: S1, S2, S3, S4, S7, S8, S9, S10, S11, S12 (page shows the recorded "through 2025"), S13, S14, S5 and S6, plus every R8 group (all match the settled table; CCD's "seniors" group lost its 32 when CCD-U6 reworded the tile). Reopened: none.

## Settled candidates (R8)

None new. No R8 group is new since round 5.

## Source-material files touched (uncommitted)

Each gained `### Re-verification 2026-11-23 (plan consistency6, self-scan)` under `## Method`. Three had no `## Method` and gained one at the end.

- `source-material/sports/charlotte-latin/Charlotte Latin - Sports - Redesign Research 2026.md`
- `source-material/the-arts/charlotte-latin/Charlotte Latin - The Arts - Arts Redesign Deep Research.md`
- `source-material/sports/charlotte-christian/Charlotte Christian - Sports - Redesign Research 2026.md` (new `## Method`)
- `source-material/sports/covenant-day/Covenant Day School - Sports - Championships.md` (new `## Method`)
- `source-material/summer-programs/charlotte-catholic/Charlotte Catholic - Summer Programs - 2026 Camp Catalog.md`
- `source-material/the-arts/covenant-day/Covenant Day School - The Arts - Music.md` (new `## Method`)
- `source-material/college-support/providence-day/Providence Day - College Support - School Profile 2026-2027.md`
- `source-material/after-school/charlotte-country-day/CCD - After School - Redesign Research 2026.md`
- `source-material/after-school/providence-day/Providence Day - After School - Redesign Research 2026.md`

## Also noted, not value conflicts

- `src/content/sports/charlotte-christian.json` still holds "48 committed, 35 D1, 9 P4" in a section no page renders. The next ingest carries it unless its record is edited.
- Round 5's translators flagged English lines as unclear (listed in `consistency5.md`, "For the next round"). DD-V1 is the one that is also a value conflict.
