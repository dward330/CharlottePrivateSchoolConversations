---
name: ddcommits
title: Davidson Day College Pipeline — varsity-roster cross-reference (21 / 13 D1 / 5 P4), Mason Smith → Furman, Compare D1 11 → 13
status: english-done
phases: 2
created: 2026-11-08
branch: feat/davidson-day-commits-2026
prs: []
---

# Davidson Day College Pipeline — verified 2024–26 refresh

## Goal

Bring Davidson Day's College Pipeline card (Sports) and its Division I Compare row up to the
result of the `/athlete-commits` graduate refresh of 2026-11-08: five athletes added (three in
the Class of 2024, for which the school never published a signing list, and two in the Class
of 2025), and one row corrected (Mason Smith signed with **Furman**, not Mercer). The funnel
goes 16 / 11 / 5 → **21 / 13 D1 / 5 P4**; Compare `d1-commits-2426` goes 11 → 13. A parent
sees every row confirmed on the college's own roster.

## Context

### The source (read these first)

All in `source-material/sports/davidson-day/`, written by `/athlete-commits` and **uningested**:

- `Davidson Day - Sports - College Commitments 2024-2026.md` — **rebuilt.** The per-class
  tables with a *Confirmed by* column, the totals, the Excluded list. This is the authority
  for every row below.
- `Davidson Day - Sports - Varsity Roster Cross-Reference 2026.md` — **new.** Method,
  rosters pulled, nulls and unchecked sports. Folds onto the research dossier via the
  existing `/roster cross-reference/i` rule in `src/lib/metrics.ts` (~line 281), so **no
  metrics.ts change is needed.**
- `Davidson Day - Sports - Redesign Research 2026.md` — second superseded note added above §3.
- `Davidson Day - Sports - College Commitments Class of 2027.md` — sweep record appended;
  still **0 confirmed** (provisional, taken before the 2026-11-11 early signing period).

### Per-athlete verification

Every row passed the graduate test: on a Davidson Day MaxPreps roster as a senior, and listed
by the college with Davidson Day as high school.

| Class | Athlete | Sport label | College | Conf. | Level | Confirmation |
|---|---|---|---|---|---|---|
| '24 | Mason Smith (**changed**) | Boys Basketball | Furman (was Mercer) | Southern | D1 | https://furmanpaladins.com/sports/mens-basketball/roster/2024-25 (Fr., Davidson Day School); Mercer 2024-25 has no Mason Smith |
| '24 | Hank Neace (new) | Boys Basketball | Wofford | Southern | D1 | https://athletics.wofford.edu/sports/mens-basketball/roster/2024-25 (No. 15, Fr., Davidson Day); RealGM |
| '24 | Jasper Zulman (new) | Boys Soccer | Villanova | Big East | D1 | https://villanova.com/sports/mens-soccer/roster (No. 12, Jr.); HighSchoolOT boys soccer tracker |
| '24 | Chase Perry (new) | Boys Soccer | Chicago | UAA | D3 | https://athletics.uchicago.edu/sports/mens-soccer/roster (No. 10, Jr.); HighSchoolOT |
| '25 | Levon Jacobs (new) | Boys Basketball | Charleston (WV) | Mountain East | D2 | https://ucgoldeneagles.com/sports/mens-basketball/stats/2025-26 (13 games); RealGM. Not on the 2026-27 roster |
| '25 | Parker Laatsch (new) | Boys Soccer | Roanoke | ODAC | D3 | https://roanokemaroons.com/sports/mens-soccer/roster (No. 6, So.); HighSchoolOT |

All other '25 and '26 rows were re-confirmed and are unchanged. The Charlotte Observer's
November 2024 roundup lists Matthew Doty at the Naval Academy; Air Force's roster disproves it,
so his row stays Air Force.

### The card today (`src/data/sportsPrograms/davidson-day.ts`, `pipeline`, lines ~277–363)

16 roster rows ('26 × 8, '25 × 7, '24 × 1). Funnel 16 / 11 / 5 with widths 1 / 0.69 / 0.31.
Seven sport bars (Basketball 5 … Equestrian 1), max 5. The five prose fields are written
against 16 / 11 / 5. `rankedRecruits` is unaffected. `rosterNote` says the Class of 2024 is
under-represented and carries the Flagler conference sentence.

### Compare (`src/data/metricValues.ts`)

- `p4-commits-2426` (~2292): `'davidson-day': '5'`, which is **unchanged**.
- `d1-commits-2426` (~2338): `'davidson-day': '11'` → **`'13'`**.
- `seniors-committed` (~2394): `'0'`, which is **unchanged**.
- Both window rows carry an identical `quals['davidson-day']`, `kind: 'minimum'`, text
  `'A documented minimum: the Class of 2024 is under-documented for Davidson Day. The Classes of 2025 and 2026 come from the school’s own published lists.'`

### Overlay units here (from `src/data/overlays/work/*.es.json`)

- **`sports`.** Extracted Davidson Day pipeline units are the five prose fields plus
  `rankedRecruits`, the funnel labels/hints, and **roster `sport` only**. Each prose unit
  holds a single path. Roster `name`, `college`, `conf` and `level` are not extracted, and
  neither are `sportBars[]` labels or `sources[].label`. So the new strings `'Charleston
  (WV)'`, `'Mountain East'`, `'Furman'` and `'Chicago'` cost no translation. Every roster
  sport used (`Boys Basketball`, `Boys Soccer`) is an **existing shared unit**.
- **`metric-values`.** `'13'` already exists as a value unit (Latin's path), so the new DD
  D1 path attaches to it. `'11'` keeps its other paths. The DD qual is one unit with two
  paths (`[42]` and `[43]`). The new text is one new unit.

**Phase 2 forecast per locale:** `sports` 5 added / 5 dropped (headline, subhead, funnelNote,
realityCheck, rosterNote); `metric-values` 1 added / 1 dropped (the qual). Anything else
means something went wrong; stop and look.

## Decisions

- **Window check (2026-11-08): no roll due.** The current seniors are the Class of 2027 and
  the latest graduated class is 2026, which is the window's end (`2426`). The roll is its own
  plan, after 1 June 2027.
- **Levon Jacobs is a row although he is not on Charleston's 2026-27 roster.** The card shows
  the college committed to out of the school. His 2025-26 season is on the college's own stats
  page. College label `'Charleston (WV)'`, by the parenthetical convention of
  `'Trinity (Conn.)'`; that avoids confusion with College of Charleston, already on Charlotte
  Christian's card.
- **Chase Perry's college label is `'Chicago'`**, matching the existing `'Chicago'` string.
- **`'Mountain East'` is a new conf string.** It is not extracted, so it adds no unit.
- **Hank Neace is counted.** Wofford lists him on the playing roster with a number in both
  2024-25 and 2026-27. A same-name student-manager listing on the 2026-27 page does not change
  that.
- **Mason Smith → Furman is stated plainly**, with no "corrected from Mercer" language on
  the page. The correction lives in the source file.
- **The Class of 2024 stays described as having no school-published list.** It is now counted
  from college rosters. The quals stay `kind: 'minimum'`.
- **Sport bars keep the card's combined labels** (`Basketball`, `Soccer`, `Lacrosse`).
- **Plan name `ddcommits`** was fixed by the `/athlete-commits` handoff.

## Approvals needed

**None.** The card and all three Compare rows exist, and every change fills existing fields.
No judgment call needed the user during research.

## Source material

| File | State | Role |
|---|---|---|
| `Davidson Day - Sports - College Commitments 2024-2026.md` | rebuilt | provenance for the card and both window rows |
| `Davidson Day - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Davidson Day - Sports - Redesign Research 2026.md` | §3 note added | points at the two files |
| `Davidson Day - Sports - College Commitments Class of 2027.md` | sweep record added | `seniors-committed` stays `'0'` |

`/implement` ingests them first (step 2).

## Out of scope

- The Class of 2027: re-check after the 2026-11-11 signing period and the February/April
  waves.
- Rolling the 2024–26 window (not due).
- The CLAUDE.md coverage-floor paragraph. Davidson Day is the floor school, but this changes
  no Compare row's null/non-null state (the D1 row was already filled), so 31/45 is unchanged.
  Confirm with `npm run coverage:floor`.
- `rankedRecruits`, `honors`, any other school, any component, the Mercer entry in
  `collegeSupportPrograms/davidson-day.ts` (that is the academic acceptance list, unrelated).
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/davidson-day-commits-2026` from a freshly pulled `main`. Running
   `git status --short` must show only the four source-material paths above, this plan and
   `INDEX.md`. Anything else belongs to another session, so leave it alone.

2. **Ingest.** Run the `ingest-source-material` skill for `sports` / `davidson-day`, then:
   - `git diff --stat src/data/schools.json` should show only Davidson Day sports entries.
     On a wholesale reorder, restore `HEAD` order (memory *two-topic ingest reorders the
     manifest*).
   - `npm run check:metrics`: the new Cross-Reference file must fold onto
     `redesign-research`. The known pre-existing Charlotte Christian "Podcast Episode 33"
     finding is not ours.
   - `npm run schema && npm run check:schema`. Commit `DATA-SCHEMA.md` only if it changed.

3. **Edit the pipeline card** in `src/data/sportsPrograms/davidson-day.ts`.

   a. `headline` →
   `'Twenty-one documented commitments across 2024–26, thirteen of them Division I and five Power 4 — a high conversion rate for a 565-student school.'`

   b. `subhead` →
   `'Basketball leads with seven commits — signees to North Carolina, Clemson, Dayton, Furman and Wofford and a preferred walk-on at Duke — and soccer has six, from NC State and Villanova to three Division III programs. The Class of 2026 also sent two lacrosse players to Division II and two track athletes to Division III.'`

   c. `funnel` → counts `'21'`, `'13'`, `'5'`, widths `1`, `0.62`, `0.24`. Keep the labels,
   hints, shades and `toVerify: true` on row 0.

   d. `funnelNote` →
   `'These are documented floors, not a census. The school published a seven-athlete signing list for the Class of 2025, and its 2025–26 Athletics Recap names all eight collegiate athletes in the Class of 2026; every other row here is confirmed on the college’s own roster. The school published no list for the Class of 2024, so that class may still be understated. Collegiate athlete is the school’s term, not scholarship athlete: Nick Arnold joined Duke as a preferred walk-on, and Division III programs such as Chicago, Roanoke, Sewanee, Emory and Berry award no athletic scholarships. The school states that more than 100 Davidson Day athletes have gone on to compete at 80 different colleges.'`

   e. `sportBars` →
   ```ts
   { sport: 'Basketball', count: 7, width: 1, p4Width: 0.43 },
   { sport: 'Soccer', count: 6, width: 0.86, p4Width: 0.14 },
   { sport: 'Volleyball', count: 2, width: 0.29 },
   { sport: 'Lacrosse', count: 2, width: 0.29 },
   { sport: 'Track & Field', count: 2, width: 0.29 },
   { sport: 'Swimming', count: 1, width: 0.14 },
   { sport: 'Equestrian', count: 1, width: 0.14, p4Width: 0.14 },
   ```
   (Sum 21. P4: basketball 3 (Denis, Stevens, Arnold), soccer 1 (Kipenzi Perry), equestrian 1.)

   f. `realityCheck` →
   `'The unusual thing here is still the ratio: thirteen of twenty-one documented commitments are Division I, where larger peer schools convert closer to a third. Basketball remains the engine, with seven college signees in three classes, but soccer is close behind with six, including a Big East defender at Villanova and an ACC signee at NC State. The Class of 2026 added two lacrosse players bound for Division II and two track athletes bound for Division III, so the experience for an athlete outside basketball now has examples of its own.'`

   g. `roster`: replace the '25 and '24 blocks (the '26 block is unchanged):
   ```ts
   { cls: "'25", name: 'Isaiah Denis', … unchanged incl. rank247 },
   { cls: "'25", name: 'Abbie Gordon', … unchanged },
   { cls: "'25", name: 'Matthew Doty', … unchanged },
   { cls: "'25", name: 'Jordin Glass', … unchanged },
   { cls: "'25", name: 'Kaydee Smith', … unchanged },
   { cls: "'25", name: 'Isabel Seifert', … unchanged },
   { cls: "'25", name: 'Levon Jacobs', sport: 'Boys Basketball', college: 'Charleston (WV)', conf: 'Mountain East', level: 'D2' },
   { cls: "'25", name: 'Domenic Desmond', … unchanged },
   { cls: "'25", name: 'Parker Laatsch', sport: 'Boys Soccer', college: 'Roanoke', conf: 'ODAC', level: 'D3' },
   { cls: "'24", name: 'Mason Smith', sport: 'Boys Basketball', college: 'Furman', conf: 'Southern', level: 'D1' },
   { cls: "'24", name: 'Hank Neace', sport: 'Boys Basketball', college: 'Wofford', conf: 'Southern', level: 'D1' },
   { cls: "'24", name: 'Jasper Zulman', sport: 'Boys Soccer', college: 'Villanova', conf: 'Big East', level: 'D1' },
   { cls: "'24", name: 'Chase Perry', sport: 'Boys Soccer', college: 'Chicago', conf: 'UAA', level: 'D3' },
   ```
   That makes 21 rows. No `rank247` on any new row.

   h. `rosterNote` →
   `'The Class of 2024 is listed from college rosters, because the school published no signing list for that year. The Class of 2026 is complete: the school’s 2025–26 Athletics Recap names all eight. Each college is the one the athlete signed with out of Davidson Day; Levon Jacobs played his freshman season at the University of Charleston in West Virginia. Level labels and conferences were added by the researcher from each college’s NCAA status; Flagler competes in the Peach Belt Conference through 2026–27 and joins the Sunshine State Conference in 2027–28.'`

   i. `sources[]`: append
   ```ts
   { label: 'Furman — 2024–25 men’s basketball roster', url: 'https://furmanpaladins.com/sports/mens-basketball/roster/2024-25' },
   { label: 'Wofford — 2024–25 men’s basketball roster', url: 'https://athletics.wofford.edu/sports/mens-basketball/roster/2024-25' },
   { label: 'Villanova — men’s soccer roster', url: 'https://villanova.com/sports/mens-soccer/roster' },
   { label: 'UChicago — men’s soccer roster', url: 'https://athletics.uchicago.edu/sports/mens-soccer/roster' },
   { label: 'Roanoke — men’s soccer roster', url: 'https://roanokemaroons.com/sports/mens-soccer/roster' },
   { label: 'University of Charleston — 2025–26 men’s basketball statistics', url: 'https://ucgoldeneagles.com/sports/mens-basketball/stats/2025-26' },
   { label: 'RealGM — Davidson Day School basketball players', url: 'https://basketball.realgm.com/highschool/teams/6173/Davidson-Day-School' },
   { label: 'HighSchoolOT — NC boys soccer recruiting tracker', url: 'https://www.highschoolot.com/story/north-carolina-high-school-boys-soccer-recruiting-tracker/21024526/' },
   ```

   `headline`, `subhead`, `funnelNote`, `realityCheck` and `rosterNote` state what the school
   publishes, never what was searched.

4. **Compare rows** in `src/data/metricValues.ts`:
   - `p4-commits-2426`: value stays `'5'`. Comment unchanged.
   - `d1-commits-2426`:
     `'davidson-day': '13', // ’24: M.Smith (Furman), Neace (Wofford), Zulman (Villanova) · ’25: Denis, Doty, Glass, Gordon, Seifert, K.Smith · ’26: Stevens, Peck, Arnold, Perry (2024 from college rosters — no school list; 2025/2026 per the school’s lists)`
   - Both `quals['davidson-day'].text`, kept identical so they stay one unit →
     `'A documented minimum. Davidson Day published no signing list for the Class of 2024, which is counted from college rosters; the Classes of 2025 and 2026 come from the school’s own published lists.'`
     Keep `kind: 'minimum'`.
   - `seniors-committed`: unchanged `'0'`.
   - Run `npm run coverage:floor` and confirm Davidson Day is still 31/45. If it moved,
     stop and report: the CLAUDE.md floor paragraph would need editing.

5. **Checks and browser**: see Verification. Commit with explicit paths: the four
   source-material files, `src/data/sportsPrograms/davidson-day.ts`,
   `src/data/metricValues.ts`, `src/data/schools.json`,
   `.claude/docs/sports/davidson-day.md`, any other derived file the ingest regenerated
   (inspect it first), `DATA-SCHEMA.md` only if changed, this plan and `INDEX.md`. Push, then
   verify `git rev-parse HEAD` against `git ls-remote origin <branch>`. Flip this plan and
   the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales on **two** overlay topics, `sports` and
`metric-values`. Read the list from `src/lib/i18n.ts`; today it is `es bn ht te fr fa it hi ar`.
No chrome catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`. Recipe:
`charlotte-latincommits` / `charlottecountrydaycommits` Phase 2.

1. Run `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` and
   `--topic metric-values`, dry-run on `es` first. Confirm the forecast in *Context*:
   `sports` 5 added / 5 dropped, `metric-values` 1 added / 1 dropped. Roster indexes shift,
   so **splice by stamp, never by path**. The new roster `sport` paths must land on the
   existing `Boys Basketball` / `Boys Soccer` units, and the new D1 path on the existing
   `'13'` unit.
2. Translate by hand per locale, starting from each locale's shipped rendering of the old
   field (it shows that locale's terms for Division I, Power 4 and Division III). Copy these
   figures char-for-char: `2024–26`, `2025–26`, `2026–27`, `2027–28`, `565`, `100`, `80`.
   Keep college, conference and program names (`Big East`, `ACC`, `Peach Belt`,
   `Sunshine State`) in Latin script as each locale already does. Spelled-out numbers
   ("Twenty-one", "thirteen", "five", "seven", "six") follow each locale's practice in the
   old headline and realityCheck. `fa`/`ar`: no isolates in the work file.
3. Run `npm run i18n:build -- --topic sports --lang <code>` and
   `--topic metric-values --lang <code>`, ×9.
4. Run the Phase 2 checks, commit with explicit paths, push (verify the SHA), open the PR
   with `--body-file`, run `gh pr merge --squash --delete-branch`, then
   `git checkout main && git pull`. Flip the plan and INDEX row to *Implemented* with the
   PR link, in the PR or a follow-up PR, never on `main`. **Do not deploy.** Say
   "merged — ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/davidson-day/*.md` (4) | research, from `/athlete-commits` |
| `src/data/schools.json`, `.claude/docs/sports/davidson-day.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/davidson-day.ts` | headline, subhead, funnel, funnelNote, sportBars, realityCheck, roster (16 → 21), rosterNote, 8 sources |
| `src/data/metricValues.ts` | D1 11 → 13 + comment, both DD quals |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals`,
      `npm run check:chrome`: all clean except the known pre-existing metrics finding.
- [ ] `npm run coverage:floor`: Davidson Day still 31/45.
- [ ] `npm run check:live` fails only on the old DD stamps (5 sports, 1 metric qual), which
      is the expected English-shipped state. Run the rest of the `npm run build` chain with
      only `check:live` removed: exit 0.
- [ ] Browser check (`npm run build && npx vite preview`, real Chrome) on
      `/school/davidson-day?topic=sports` with The College Pipeline card open:
      - funnel 21 / 13 / 5
      - seven bars summing to 21, Basketball 7 first, then Soccer 6
      - 21 roster rows; Mason Smith reads Furman; the Jacobs row reads `Charleston (WV)` · `Mountain East` · D2
      - filter tabs show D1 13 and P4 5
      - the new subhead, funnelNote, realityCheck and rosterNote render, and the eight new source links open
      - the headline is the card **teaser** and is hidden while the card is open, so check it with the card closed.
- [ ] Browser, `/compare?topic=sports&schools=davidson-day,providence-day`: Davidson Day
      reads **5** Power 4 and **13** Division I. Hover the cell to see the new qual tip.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 returns 0;
      `python3 scripts/check_figures.py --lang <code> --topic sports` ×9 is clean.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr`: clean. Also run `node scripts/check_work_integrity.mjs`. It reports
      index-shift false alarms after a splice, so verify any flagged units by stamp against HEAD.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the DD pipeline paths returns 0.
- [ ] `npm run build`: exit 0.
- [ ] Browser: `/school/davidson-day?lang=es&topic=sports` and `?lang=fa`, card open. The
      prose fields are translated, the `2024–26` and `2026–27` ranges are intact, and the
      `fa` ranges are not reversed. Bare roster sport names stay identifiers in eight
      locales by convention (only `ar` translates them). Check the teaser headline with the
      card closed. Compare `?lang=es` shows 5 / 13 and the translated qual.

## Risks

| Risk | Mitigation |
|---|---|
| A roster sport path lands on no unit after the index shift and renders English | Splice by stamp; `check:live` + `i18n:leaks` on `davidson-day:pipeline.roster[*].sport` |
| The coverage floor moves and CLAUDE.md goes stale | `npm run coverage:floor` in step 4; stop and report if DD ≠ 31/45 |
| Another session's files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Open questions

- **Prose wording** settles at the Phase 1 review. **Default:** as written in step 3.
- **Whether `rosterNote` should mention Jacobs at all** (he left Charleston after one
  season). **Default:** keep the one sentence, which mirrors the transfer-sentence practice
  on other cards.
