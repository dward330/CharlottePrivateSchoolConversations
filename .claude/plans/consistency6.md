---
name: consistency6
title: Fix the findings of the round-6 consistency rescan, and date both Admission Rates superlatives
status: implemented
phases: 2
created: 2026-11-23
branch: fix/consistency6
prs: [523]
closing_loop: consistency-self-scan
---

# Fix the round-6 consistency findings

## Goal

The rescan of `main` at `638a4d3e` after consistency5 (PR #522) found 1 partial row and 13 new
findings, merged into 11 rows: 6 A, 1 B, 6 C, 0 D. This plan fixes all of them as the user ruled
on 2026-11-23, and makes `check:ncsuper` require a dated form for both ranking labels. Done means
a rescan of the merged `main` shows each ID resolved, in all ten languages.

## Context

- **The worklist is the spec:** [`consistency6-data/findings.md`](consistency6-data/findings.md)
  (verified: every quote was found in the page dumps). Each sweep's full evidence, with URLs and
  what each source said on 2026-11-23, is in the four `consistency6-data/rescan6-*.md` files.
  Where they differ, findings.md wins, and this plan wins over both.
- **Round 5 caused 2 of these:** CAN-U7 (a renamed point whose headline kept the old claim), and
  X1 (round 5 dated the low chip at three schools and left eight).
- **Precedent for everything mechanical:** the `## Implementation notes` of
  [`consistency5.md`](consistency5.md). Its Phase 2 section is the method to copy (units spliced
  by stamp, predecessors read from the branch's own work files, one translator agent per locale
  with a brief and a validator, path replay to TOTAL 0, one squashed commit pushed). Its
  scratchpad tools are gone, so rebuild them from that description.
- **Admission Rates labels.** Each high school's `src/data/collegeSupportPrograms/<slug>.ts` has
  six `ncAdmissions` rows with a `note`. Two notes carry a ranking label:
  - low: "the most selective of the six" (8 schools) or "the lowest of the six in Fall 2025"
    (Latin, Carmel, Davidson Day);
  - high: "largest admit rates of the six" (all 11).
  The lines are listed in step 4. `scripts/check_nc_superlatives.mjs` (`check:ncsuper`, in the
  build) ranks on the Fall 2025 `rate`, breaks a tie on the larger `applied`, and accepts
  `LOW_LABELS` (both low forms) and the single `HIGH_LABEL`.
- **Latin's state-title matrix** is `record.rows` in `src/data/sportsPrograms/charlotte-latin.ts`
  (~L126–193): `seasonLabels: ["'23–24", "'24–25", "'25–26"]`, and each row is
  `{ program, cells: [{ result, record?, toVerify? } ×3], note }`, with `result` one of
  `STATE`, `RUNNER-UP`, `SEMIFINAL`, `NONE`. The same file's Cup `pointSources` (~L98–104) holds
  girls soccer `runnerUpYears: [2021, 2022, 2024, 2025]`, girls cross country `[2024]` and boys
  tennis `[2025, 2026]`. A spring year maps to the season ending in it, and a fall year to the
  season starting in it.
- **Beyond Tuition** is the `components` grid of each school's report in
  `src/data/financialAidReports.ts`: Providence Day ~L1725–1750 (`componentsTitle`,
  `componentsAside`, rows, `componentsNote`), Country Day ~L227–246. `check:consistency` R11
  gates counts and percentages against the grid.
- **`dayLabel` is extracted as prose** (`classifyField` returns "prose" for
  `catalog.camps[].dayLabel`), so a reworded label is translated like any other unit.

## Decisions

- **User rulings, 2026-11-23 (do not re-ask):**
  - **PD-V3:** option (a). List every published Extended Day charge in Beyond Tuition at
    Providence Day and Country Day, late and adjustment fees included.
  - **LAT-V5:** attribute both Latin pages, never call Backstage a course, and add the ask "Is
    Backstage in Grade 6 a class or an after-school crew?". Use a code comment, because Arts takes
    no verify flag.
  - **LAT-V3:** add the three runner-up rows. Do not retitle the matrix.
  - **LAT-V1:** the school's own athletics-site figure, "200 NCISAA state titles through spring
    2026", replaces Wikipedia's 165. Drop "21 sports". Never type 201 for fall 2026.
- **LAT-V2:** "twelve state titles", from the same graphic. The record's "11 or 12" question
  closes: 11 is one coach's count, 1987–2016.
- **PREP-V1:** fix the label, `dayLabel: 'Mon–Thu (June) · Mon–Fri (July)'`, not the description.
  It is extracted prose, so Phase 2 translates it.
- **X1, wording:** low → "the lowest of the six in Fall 2025". High → "the highest of the six in
  Fall 2025". Where another campus ties the winner's Fall 2025 rate, add ", tied with <name>"
  (Latin: tied with UNC Greensboro). Each school keeps its "Flagship · …" style prefix.
- **X1, the rule:** `check:ncsuper` accepts only the dated forms. It fails an undated label, and
  it fails a tie the label does not name. The tie-break on `applied` still picks the carrier.
- **X2:** Charlotte Christian gets years ("in 2023, 2024 and 2025"; "three years running,
  2023–25"). Do not add the 2026 Cannon result: the finding asks only that the claim be dated.
  Covenant: "… by Providence Day in 2025–26".
- **Re-open before typing.** findings.md records that the parent re-opened no source this round.
  Re-open each outside value at build (the URLs are in the rescan6 rows). A moved value is held
  and reported, never typed on judgment.
- **settled.md gains nothing from this round.** No finding was ruled "not a conflict".

## Approvals needed

**None.** No row is UX-GATE or CHROME. LAT-V3 adds rows to an existing matrix, which is data, and
no new string goes into `src/locales/`. Claude Design is not needed: no approved UX change.

## Student names, fetching and browsers (hard rules)

- **No non-athlete student name** in data, records, the plan, a worklist, a commit, the PR, an
  agent brief or a reply (CLAUDE.md, Student-name standard, user 2026-11-22). Athletes may be
  named only for athletics. Put the rule verbatim in every agent's brief, and tell agents to print
  counts, never matched text, from any source that may hold names.
- The ingest needs the local, gitignored `source-material/_name_redactions.json`. Never commit or
  print it.
- **Refused hosts, do not request:** blumenthalarts.org, charlottelatinsummer.com, issuu.com,
  k12.ncseaa.edu, on3.com, carmelchristian.org. No other agent string, mirror, archive or cache for
  them. Never `curl -L` blindly: read the Location header first. Never print or copy the API key
  in Charlotte Latin's camp-feed URL.
- **No visible browser windows** (user, 2026-11-23). `audit:daterender` and `audit:moneyrender`
  are headless by default since #521, and `audit:mobile` always was. Run any ad-hoc Playwright
  check with `channel: 'chrome', headless: true`. Do not run `audit:cardlink` or
  `audit:pageviews` without warning the user first: both are headed by design.
- **Withheld Cannon instructor names** (round 5) are not in `main` at `638a4d3e`, but older commits
  hold them. Never take predecessor text from a commit before `638a4d3e`. Never print a diff of a
  regenerated Cannon content chunk: a round-6 sweep printed one that way.

## Source material

Already written by the rescan and **uncommitted**: the folder `.claude/plans/consistency6-data/`,
and `### Re-verification 2026-11-23 (plan consistency6, self-scan)` appends under `## Method` in
nine records (listed in findings.md, "Source-material files touched"). Three of them gained a new
`## Method` at the end. Commit all of it on the branch in step 1. The ingest runs in step 8.

## Out of scope

| item | why |
|---|---|
| The same matrix-vs-Cup check at the other Cup schools | LAT-V3 was checked at Latin only. Next rescan |
| Translator-flagged English and older translation errors (consistency5 notes, "For the next round") | Not value conflicts, except DD-V1, which is in |
| The unrendered "48 committed, 35 D1, 9 P4" in `src/content/sports/charlotte-christian.json` | Renders nowhere. Noted in findings.md |
| Deploy | The user's call, in the moment |

## Steps

### Phase 1 — English

**0. Branch.** `git fetch`, then `git switch -c fix/consistency6 origin/main`. The uncommitted
research comes along. Never stash, and if the switch refuses, stop and report.
`.claude/plans/INDEX.md` also holds another session's uncommitted rows (`allcommits`,
`implreview`). Commit only this plan's row: stage HEAD's copy plus that row (`git show
HEAD:.claude/plans/INDEX.md`, add the row, `git hash-object -w --stdin`, `git update-index
--cacheinfo 100644,<sha>,.claude/plans/INDEX.md`). Never commit `allcommits.md` or
`implreview.md`.

**1. Commit the research** by explicit path: the nine records, `consistency6-data/` and this plan.

**2. Re-open the sources** cited by LAT-V1, LAT-V2, LAT-V3 (the four brackets), X2 (two NCISAA
2026–27 brackets), PD-V1 (the profile PDF), PD-V3 (the PD fee document and CCD's Extended Day
page) and LAT-V5 (Latin's performing-arts and Middle School pages). Record today's values under
`## Method` as `### Re-verification <date> (plan consistency6, implement)`. CAN-V1, DD-V1 and
PREP-V1 rest on committed records, so read those.

**3. The rows.** The wording is each findings.md row's, within these limits:

| id | files | edit |
|---|---|---|
| CAN-U7 | `src/data/artsPrograms/cannon.ts` ~L346 | Verdict headline → "An arts department that sets every arts course at an academic level — 24 courses all at honors or above" (keep the rest of the line as is). |
| LAT-V1 | `src/data/sportsPrograms/charlotte-latin.ts` :33, :38; its Sports Redesign Research record ~L30 | Headline: "… and 200 NCISAA state titles through spring 2026 (the school's athletics site)", no "across 21 sports". Tile: value `200`, label "NCISAA state titles, through 2025–26". The record cites the clshawks.com graphic. |
| LAT-V2 | same file :276; the record ~L178, ~L216 | "despite the program's twelve state titles". Close the record's open question. |
| LAT-V3 | same file, `record.rows` | Add Girls Soccer (`RUNNER-UP` '23–24 and '24–25), Girls Cross Country (`RUNNER-UP` '24–25) and Boys Tennis (`RUNNER-UP` '24–25 and '25–26). Every other cell is whatever the bracket shows (`STATE`, `SEMIFINAL` or `NONE`). A `record` only where the bracket prints the team's record, none for cross country. Write a one-line `note` per row from the bracket. Put the rows after the existing runner-up-only rows. |
| LAT-V5 | `src/data/artsPrograms/charlotte-latin.ts` :68, :147, :354 and the Verdict checklist | Attribute it: "The arts page lists Backstage for Grades 6–12, a year before Theater (7–12). The Middle School course list names no backstage class." Never "course". Add the ask. Add a code comment naming both pages. |
| PD-V1 | `src/data/collegeSupportPrograms/providence-day.ts` :559, :943 | Tile label → "AP courses in the profile’s course table; its May 2026 score table covers 29 exam subjects". The ask names AP German, AP Business with Personal Finance and AP Music Theory. Leave L555 and L806. |
| PD-V3 | `src/data/financialAidReports.ts` PD ~L1725–1750, CCD ~L227–246 | PD: add "Extended Day adjustment rate · $30/hr" and "Enrichment withdrawal · $25", both `priced`. CCD: add "Extended Day late pickup · $10 per 10 minutes after 6:00 p.m.", `priced`. Recount and fix each `componentsTitle`, `componentsAside`, `componentsNote` and "half have no set price"-style sentence. R11 checks the result. Update the `meta` "as of" for the fees re-read. |
| PREP-V1 | `src/data/summer/charlotte-prep.ts` ~L228 | `dayLabel: 'Mon–Thu (June) · Mon–Fri (July)'`. |
| X2 | `src/data/sportsPrograms/charlotte-christian.ts` :120, :194; `src/data/sportsPrograms/covenant-day.ts` :154 | As Decisions says. |
| DD-V1 | `src/data/internationalTravel/davidson-day.ts` :447 | "… in Spain, Portugal and Belize. The Belize work moves to Baking Pot in summer 2027, after 20 seasons at Cahal Pech." |
| CAN-V1 | `src/data/collegeSupportPrograms/cannon.ts` :526; `src/data/metricValues.ts` `ap-performance` note ~L442, Cannon value comment ~L444 and qual ~L475 | Keep 90% and the ask. The tile quotes the profile's label: "“Students with Scores 3+”, as the profile labels it (446 exams, 195 students, May 2026)". The qual says the profile gives both 195 students and 446 exams, so the basis is not certain. The row note stops calling Cannon's figure a share of students as fact. |

**4. X1 and its rule.**

- Notes to change, in `src/data/collegeSupportPrograms/`:
  - low label, at `cannon.ts:429`, `charlotte-catholic.ts:303`, `charlotte-christian.ts:328`,
    `charlotte-country-day.ts:464`, `covenant-day.ts:63`, `hickory-grove-christian.ts:248`,
    `gaston-day.ts:307` and `providence-day.ts:474`;
  - high label, at all 11 (`carmel-christian.ts:342`, `cannon.ts:455`,
    `charlotte-catholic.ts:342`, `charlotte-christian.ts:393`, `charlotte-latin.ts:460`,
    `charlotte-country-day.ts:490`, `covenant-day.ts:89`, `davidson-day.ts:408`,
    `hickory-grove-christian.ts:313`, `gaston-day.ts:346`, `providence-day.ts:526`).
- Before editing, recount each school's six Fall 2025 rates to find ties. The label stays on the
  row `check:ncsuper` picks today.
- `scripts/check_nc_superlatives.mjs`: `LOW_LABELS` becomes the dated form only, and `HIGH_LABEL`
  becomes "the highest of the six in Fall 2025". Where a tie exists, require ", tied with <name>"
  for every other campus at the same rate, and fail on a "tied with" that names a campus not tied.
  Update the header comment with the date and this plan's name.
- Run it on the fixed tree: 0. Negative-test it on a copy: revert one note to the undated form
  (fails for its own message), and remove one "tied with" (fails for its own message). Then diff
  the file back.

**5. Restatement sweep, before any check.** Grep every changed value, and its old form, across
that school's page dump, `metricValues.ts` (value, note, qual), `financialAidReports.ts`, the club
modules and the school's records. That covers 165 / 200, eleven / twelve, "21 sports", "most
selective", "largest admit rates", "students scored 3+", "29 of them", "three years running",
"current site", "weights the arts" and "backstage". Run `npm run dependents`. List each ID with
the places found in the Implementation notes.

**6. `.claude/skills/consistency-self-scan/settled.md`:** no entries. Say so in the notes.

**7. Checks:** `npx tsc -b`, then `npm run build`. It stops at `check:live` until Phase 2, as
expected. Run each later gate on its own, plus `check:consistency`, `check:ncsuper`,
`check:schema`, the plain-language hook on every edited data file, and `npm run coverage:floor`
(the floor should not move).

**8. Ingest** through `ingest-source-material` (`/usr/bin/python3`). Restore HEAD order in
`schools.json` and put back date-only notes, as consistency5 did. Then `npm run schema`.

**9. Browser, headless:** Latin's Sports matrix (8 + 3 rows, sources) and Admission Rates table at
1280 and 360px. Prep's camp row. Two other schools' Admission Rates chips. Charlotte Christian's
Winning Record. Then `npm run audit:mobile -- --all`, logged to a file and never piped through
`tail`.

**10. Adversarial review** (`/implement` 5b, at most two passes). Besides its standard brief, the
reviewer repeats step 5's grep independently, and checks that every Admission Rates label names
the right campus and every tie.

**→ STOP. `/implement` ends its turn here for the user's English review.**

### Phase 2 — Every other locale

1. Merge `origin/main`. Splice by stamp into the nine work files (`es bn ht te fr fa it hi ar`,
   per `PROSE_TRANSLATED` in `src/lib/i18n.ts`), taking predecessors from this branch's work
   files only. Paths move at LAT-V3 (three new rows), PD-V3 (rows added) and the Verdict ask.
   Run `.claude/plans/consistency3-data/path_replay.mjs` against a `git archive main` copy to
   `TOTAL 0` in every locale.
2. Translate the changed units, per `.claude/docs/prose-translation-architecture.md` and each
   locale's rollout doc. Use one agent per locale, each with the brief and validator rebuilt from
   consistency5's notes and the hard rules above. In fa and ar write money ranges in words, and use
   `←` between steps in RTL prose. Re-run the content extractor if `src/content` moved (the LAT-V1
   and LAT-V2 record edits do).
3. No chrome keys: this plan adds none.
4. Open the PR with `--body-file`, as one squashed commit of the final tree on `origin/main`.
   Squash-merge, move the checkout to `main`, and close the plan and its INDEX row.
5. **Rescan:** run `consistency-self-scan` on merged `main` and give the verdict (`/implement`
   10). **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `src/data/sportsPrograms/{charlotte-latin,charlotte-christian,covenant-day}.ts` | LAT-V1–V3, X2 |
| `src/data/artsPrograms/{cannon,charlotte-latin}.ts` | CAN-U7, LAT-V5 |
| `src/data/collegeSupportPrograms/*.ts` (11 schools) | X1, PD-V1, CAN-V1 |
| `src/data/financialAidReports.ts` | PD-V3 |
| `src/data/metricValues.ts` | CAN-V1 |
| `src/data/summer/charlotte-prep.ts`, `src/data/internationalTravel/davidson-day.ts` | PREP-V1, DD-V1 |
| `scripts/check_nc_superlatives.mjs` | the dated-label rule |
| `source-material/**` (nine appended records plus Latin's Sports record), generated notes, `src/content`, `schools.json`, schema | research and ingest |
| `src/data/overlays/**` | Phase 2 |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` clean. `npm run build` passes up to the expected `check:live` stop, and each
      later gate exits 0 on its own.
- [ ] `check:consistency`, `check:ncsuper` (0 on the fixed tree), `check:schema`,
      `coverage:floor` unchanged.
- [ ] Both `check:ncsuper` negative tests fail for their own message, and the file diffs back.
- [ ] Page dumps: each ID's new value shows and the old one is gone, Compare included.
- [ ] Plain-language hook clean on every edited file. Name screen on the diff, the records and
      `dist`: 0.
- [ ] Step 9's headless browser checks, and `audit:mobile -- --all`: 0 broken cards, 0 overflow.

### Phase 2 — Locales

- [ ] `check:live`, `check:runtime`, `check:chrome`, `check:dates`, `check:translations`,
      `check:sepdrift -- --lang <code>` for all nine, `check:digits`, `check_figures.py` per
      locale, `check:fr`, `check:hi`, `check:fa`, `check:bidi`, `i18n:leaks` per locale, and the
      path replay at 0.
- [ ] Full sweeps: `audit:daterender -- --all` (nine locales) and `audit:moneyrender -- --all
      --lang es --lang fr --lang it` (a script changed, so the scope is full anyway).
- [ ] A headless render probe: every changed unit's text on its page in all nine locales (the
      three Latin matrix rows, the PD and CCD component rows, and the 19 chip notes).

## Risks

| Risk | Mitigation |
|---|---|
| A tie at some school the recount misses | The rule fails an unnamed tie, and its negative test proves it |
| A new matrix row gets a record the bracket does not print | Records only from the re-opened bracket, otherwise none |
| A fix misses its restatement again | Step 5, repeated by the reviewer |
| The 200 moves again (fall 2026 titles) | Dated "through spring 2026", never typed as 201 |

## Open questions

- **A bracket shows something the Cup ledger does not** (for example, a final outside its
  `runnerUpYears`). **Default:** hold that cell as `NONE` with `toVerify`, and report it.
- **The CCD late-fee row's exact wording.** **Default:** the Extended Day page's own words, with
  `$10` and "after 6:00 p.m." kept char for char.

## Implementation notes

### Phase 1 (2026-11-23, `fix/consistency6`)

**Re-opened before typing (step 2), all matching the self-scan's read:** Latin's
championships page and its 200-title graphic (23 lines, sum 200, "12 FOOTBALL"), the coach's
Hall of Fame page (11), the NCISAA brackets for girls soccer and boys tennis 2023–26 and for
football and field hockey 2026–27, Mitchell Timing cross country 2023 and 2024, the PD profile
PDF (29 score rows; no German, Business or Music Theory row), the PD fee document and CCD's
Extended Day page, and Latin's performing-arts and Middle School pages. Two redirects were read
before following (clshawks 302 to the Sidearm image CDN; Google Docs 307). No refused host was
requested. Notes are under `### Re-verification 2026-11-23 (plan consistency6, implement)` in
seven records.

**Deviations from the plan's wording.**

- **LAT-V3, girls cross country '25–26:** the NCISAA archive links no fall 2025 results and no
  Mitchell Timing page was found, so the cell is `NONE` with `toVerify` (the plan's default for an
  unconfirmed cell). The '23–24 cell is `NONE`: Latin was 3rd (94 points). Girls soccer '25–26 and
  boys tennis '23–24 were quarterfinal exits, so `NONE`. No runner-up cell carries a record: the
  brackets print only the record going into each round.
- **LAT-V3 notes:** girls soccer "Lost the 2024 and 2025 finals to Providence Day"; cross country
  "Second in 2024, 86 points to Country Day's 79"; boys tennis "Back-to-back finals, lost to Carmel
  Christian in 2025 and Durham Academy in 2026". The record's section 2 table gained the same rows.
- **LAT-V1:** the change is in `offered.subhead` (the plan says headline; the sentence lives in the
  subhead). The record's L30 now cites the clshawks.com page.
- **LAT-V5:** the Theatre paragraph and Verdict point say "lists Backstage from Grade 6, a year
  before Theater"; the ladder item and the ask use the plan's two sentences. The ask leads with
  that context sentence, then the plan's question.
- **LAT-V5, second card found at build:** `check:matrices` failed because Compare's arts matrix
  (`src/data/artsMatrix.ts`) cited the old sentence as evidence for Latin's Middle School
  technical-theatre chip. The chip stays (the arts page lists Backstage for Grades 6–12) and the
  cite now quotes "The arts page lists Backstage for Grades 6–12". Step 5's grep list did not cover
  this file.
- **PD-V3, CCD wording:** "Extended Day late pickup · $10 per 10-minute interval after 6:00 p.m.",
  the same words as CCD's After School card, so the two cards match char for char. The plan's
  "$10 per 10 minutes" would have differed from that card. CCD now reads 13 items, 23% unpriced
  plus 23% in a range, "6 of the 13 have no set price". PD reads 20 items, 10 priced, 50%
  unpriced. Both source lines and `meta` lines carry the 23 Nov re-read.
- **CAN-V1:** the Cannon value comment also says the basis is not stated. The College Support
  subhead ("the 90% scoring 3+ comes from students who chose to take an optional exam") states no
  basis and was left.
- **X1 ties (recounted):** Cannon's UNC Charlotte ties East Carolina University and UNC
  Greensboro; Latin, Carmel, Davidson Day and Gaston Day's East Carolina ties UNC Greensboro
  (Gaston Day 4 of 4 each; the first row keeps the label, as `check:ncsuper` picks); Hickory Grove's
  UNC Greensboro ties East Carolina University. No school has a tie at the lowest rate.
- **X1, schema doc:** `scripts/gen_data_schema.mjs` gained the dated forms and the tie clause, and
  its stale "lowest (resp. highest) pooled rate" became "latest-term rate".

**`check:ncsuper`:** 0 on the fixed tree. Negative tests on a copy, each failing for its own
message, then diffed back identical: an undated low label at Cannon; Latin's tie clause removed;
a false "tied with UNC Charlotte" at Providence Day.

**Step 6:** `settled.md` gains nothing this round.

**Step 7:** `npx tsc -b` clean. `npm run build` stops at `check:live` (stale overlay stamps, Phase
2), and every later gate passes on its own (`check:chrome`, `check:runtime`, `check:moneytext`,
`check:dates`, `check:spans`, `check:news`, `check:photos`, `check:cardlink`). `check:consistency`,
`check:ncsuper`, `check:matrices`, `check:schema`, `check:spelling` and `check:flags` all 0.
`check:metrics` exits 1 on the same podcast subtopic as `main`. The plain-language hook, replayed
against HEAD for all 20 edited data files: 0. `coverage:floor`: unchanged at 33/45.

**Step 8, ingest:** 124 generated files changed; 112 were date-only and were restored, 12 kept
(eight notes and four content chunks). `schools.json` had no record change. Name screen: 0 hits
in every added line, and no generated file gained a hit.

**Step 9, browser (headless Chrome):** Latin's Sports Offered and Winning Record (the three new
rows), Admission Rates at Latin, Cannon, Providence Day and Country Day, Christian's Winning
Record, and Prep's Kidokinetics row (opened): all text present at 1280 and 360px, 0 overflow.
Another session's preview held port 4173, so this branch was served on 4319.
`npm run audit:mobile -- --all` (headless, logged to a file): 0 broken cards, 0 page overflow at
320, 360 and 390px.

#### The restatement sweep (step 5)

Old and new forms grepped across the page dumps, `metricValues.ts`, `financialAidReports.ts`,
the club and course modules, `artsMatrix.ts` and the records. `npm run dependents`: no registered
source changed. "Old form left" in a record is dated research or a Method note.

| ID | new form found in | old form left in |
|---|---|---|
| CAN-U7 | page, artsPrograms | record (the-arts content chunk) |
| LAT-V1 | page, sportsPrograms, record | record Method notes (quoted as the finding) |
| LAT-V2 | page, sportsPrograms, record | record Method note of the scan |
| LAT-V3 | page, sportsPrograms, record | — |
| LAT-V5 | page, artsPrograms, artsMatrix, record | — |
| PD-V1 | page, collegeSupportPrograms, record | — (L555 and L806 kept, as planned) |
| PD-V3 | page, financialAidReports (PD, CCD), records | — |
| PREP-V1 | page, summer | — |
| X2 | page, sportsPrograms (Christian, Covenant), records | — |
| DD-V1 | page, internationalTravel | — |
| CAN-V1 | page, collegeSupportPrograms, metricValues (note, comment, qual) | — |
| X1 | page (all 11), collegeSupportPrograms, gen_data_schema, check_nc_superlatives | 0 undated labels in any dump |

### Adversarial review (2026-11-23, two passes, the cap)

| pass | found | fixed | rejected | open for the user |
|---|---|---|---|---|
| 1 | 9 | 8 | 1 | 0 |
| 2 | 1 | 1 | 0 | 0 |

The fixes that change what this plan says:

- **PD-V3, Country Day:** CCD's Extended Day page also prints a $50 fee for each contract change
  beyond the first (re-read 23 Nov: "additional changes incur a $50 fee"), and the After School
  card already listed it. Under the user's "every published Extended Day charge" ruling it joins
  Beyond Tuition as "Extended Day contract change (beyond the first) · $50". CCD is now 14 items,
  21% unpriced plus 21% in a range, "6 of the 14". The worklist's 13 had missed it.
- **PD-V3, Providence Day:** the withdrawal row keeps the After School card's own label,
  "Enrichment withdrawal, after 1 class · $25".
- **CAN-V1:** the Compare note no longer says Cannon uses another basis. It names Gaston Day and
  Carmel as the other bases and says Cannon's basis "is not certain", which agrees with the qual.
- **LAT-V1, LAT-V3:** Sports Offered cites the clshawks.com championships page; the Winning
  Record cites the 2024 and 2025 girls soccer and 2025 and 2026 boys tennis brackets and the 2024
  cross country official timing.
- **X2, Covenant:** the field hockey matrix row note is dated too ("the 2025–26 state
  quarterfinal"). It was a second card for the same undated claim.
- **LAT-V5:** the Verdict point now attributes both pages, as the ladder and Theatre paragraph do.
- **Records:** the Cup Standings record's open 198-versus-165 question is closed (198 through
  December 2025, plus the 2026 wrestling and boys golf titles, makes the school's 200). The Sports
  record's L30 now says 18 Wells Fargo Cups with the school's Cup page linked, not Wikipedia's 17.
- **Rejected:** the three "All 7 weeks · Mon–Fri" Prep rows (pass 1, #8). The worklist judged
  them under PREP-V1 and proposed no change, since the headline and tier details state the
  four-day week.

**Seen, not this plan's:** Latin's Sports record has field hockey '25–26 at 16–5, while the app
shows 17–5 (the figure its 42–19 bar adds up to). For the next rescan.

After the fixes: the build stops only at `check:live`; `check:chrome`, `check:runtime`,
`check:moneytext`, `check:dates`, `check:spans`, `check:cardlink`, `check:spelling`,
`check:ncsuper`, `check:consistency`, `check:matrices` and `check:schema` all 0; the plain-language
hook clean on every refixed file.

### For Phase 2

- **New and changed units:** the 19 Admission Rates notes; Latin's subhead, tile, reality check,
  three matrix rows (program, notes) and seven source labels; Latin's Arts ladder item, Theatre
  paragraph, Verdict point and new ask; the arts-matrix cite; Cannon's Verdict headline and AP
  tile; PD's tile and ask; the PD and CCD component rows, titles, asides and notes; Prep's
  `dayLabel`; Christian's two sentences; Covenant's two; Davidson Day's travel point; the Compare
  `ap-performance` note and Cannon qual; the two `meta` lines and two source lines.
- **Moved paths:** Latin `record.rows` (three rows appended) and `record.sources`, Latin
  `offered.sources`, Latin's Verdict `ask` (a new item before "Six studios"), the PD components
  (two rows inserted) and the CCD components (two rows inserted).
- `src/content` moved (Latin, Christian and Covenant Sports, Covenant Arts): re-run the content
  extractor.
- No chrome keys. No new money range, so nothing to write in words for fa and ar.

### Phase 2 (2026-11-23, nine locales)

**Method.** `origin/main` had not moved past `638a4d3e`, so there was nothing to merge. A fresh
extract of all 13 topics held **41 changed units per locale**, the same set in all nine. They were
spliced by stamp into the nine work files: per locale 15,697 units kept byte for byte, 41 new, 30
obsolete dropped, 0 blank. 37 of the 41 were paired with the reviewed translation they replace,
read from this branch's work files. Four new rows sit at shifted paths (two PD components, one CCD
component, Latin's new Verdict ask), so they were given related shipped units instead: the After
School card's own late-pickup, withdrawal, adjustment-rate and contract-change lines, and Latin's
other asks. Nine translator agents, one per locale, worked from a brief carrying the student-name
rule, and a validator checked figures, `$` amounts, quoted school wording, `**`, arrows (`←` in
fa/ar), native script, bidi controls and length ratio, to 0 FAIL in every locale. Every job and output
file had a name screen of 0. `src/content` needed no work: `check:live` verified all 45 blocks.

**Deviations.**

- **ar, Enrichment withdrawal:** the validator forced "بعد 1 حصّة". It now reads "بعد حصّة واحدة", the
  After School card's shipped words, so the two cards match. That is the one `check:digits` item.
- **"Theater" in the three Latin arts units:** es, ht, te, fr, fa, it and ar keep it in English (hi
  writes थिएटर), because the new English quotes the arts page's labels ("lists Backstage … a year
  before Theater (7–12)"). The replaced units had translated it as a subject. The reviewed Latin
  units already keep "Theater" as a named label.
- **Arrows restored** in the es and fa Stagecraft units, where the replaced translations had written
  the sequence in words. es also keeps "Advanced Design" as a course name.
- **No gloss after “Students with Scores 3+”** in any locale: a gloss would repeat the figure.
- **The path replay prints TOTAL 1 in every locale,** not 0. The one "moved" path is Latin's new
  `record.rows[7].program` ("Girls Soccer"). That field is a sport name and is never extracted (none
  of Latin's other ten row names are translated), so it follows the convention.

**Verified on the final tree:**

- `npm run build` passes every gate, `check:live` included.
- `check:runtime`, `check:live`, `check:chrome`, `check:dates`, `check:translations`, `check:fr`,
  `check:hi`, `check:fa`, `check:bidi`, `check:money`, `check:currency`, `check:moneytext`: all 0.
- `check:sepdrift` and `check_figures.py` per locale: all 0.
- `check:digits`: 369 units compared, one to review (the ar item above).
- `i18n:leaks`: byte-identical to `main` in all nine locales.
- `check_work_integrity`: only splice-shaped items (row counts, re-stamped and replaced units),
  verified by stamp instead; 0 foreign-script entries. No two locales share a translation.
- Render probe (headless Chrome, every `<details>` open): 423 of 423 placements found, every new
  unit at every school it renders for, in all nine locales, Compare's note and Cannon qual included.
- `audit:moneyrender -- --all` (es, fr, it): 0.
- `audit:daterender -- --all`: 0 English-form dates in all nine locales (57 pages each, 513 visits).

**For the next round (found by the translators, English left as approved).**

- "Extended Day late … fees" in the PD and CCD `meta` lines does not say late pickup. All nine read
  it as late pickup.
- Latin's Verdict point "It produced a 2025 Blumey nomination" leaves "it" unclear (the track or the
  Upper School sequence).
- Latin's cross country note "Second in 2024, 86 points to Country Day's 79" is right only because a
  lower score wins. A parent may not know that.
- es: the stage-manager award is "Regidor" in one shipped Latin arts unit and "Regidora" in another.
