---
name: catholiccommits
title: Charlotte Catholic College Pipeline — varsity-roster cross-reference (54 / 39 D1 / 15 P4), Compare P4 10 → 15, D1 25 → 39
status: implemented
phases: 2
created: 2026-11-08
branch: feat/charlotte-catholic-commits-2026
prs: [458]
---

# Charlotte Catholic College Pipeline — verified 2024–26 refresh

## Goal

Bring Charlotte Catholic's College Pipeline card (Sports) and its two window Compare rows up
to the result of the `/athlete-commits` graduate refresh of 2026-11-08. The refresh adds 19
athletes the card's three signing articles never reached, because those articles covered the
November and February ceremonies only. The missing group is six football signees (December
signing), seven baseball signees and six others. Every new row is confirmed on the college's
own roster or signing release. The funnel goes 35 / 25 / 10 → **54 / 39 D1 / 15 P4**.
Compare `p4-commits-2426` goes 10 → **15** and `d1-commits-2426` goes 25 → **39**.

## Context

### The source (read these first)

All in `source-material/sports/charlotte-catholic/`, written by `/athlete-commits` and
**uningested**:

- `Charlotte Catholic - Sports - College Commitments 2024-2026.md` (**new**) holds the 54-row
  per-class tables with a *Confirmed by* column, every roster URL, the totals and the
  Excluded list. It is the authority for every row below.
- `Charlotte Catholic - Sports - Varsity Roster Cross-Reference 2026.md` (**new**) records the
  method, the rosters pulled, the nulls (computed) and the unchecked sports. It folds onto
  `redesign-research` via the existing `/roster cross-reference/i` rule in
  `src/lib/metrics.ts` (~line 281).
- `Charlotte Catholic - Sports - Program Championships and College Commitments.md` now has a
  **SUPERSEDED note** above its "College commitments, Classes of 2024–2026" section. The
  August table is kept as the earlier record.
- `Charlotte Catholic - Sports - College Commitments Class of 2027.md` gained two LaxNumbers
  leads (Jason Leonard → Air Force, James Pawlowski → Denison). It still has **5 confirmed**.

**Fold-onto trap:** `Program Championships and College Commitments` and the new window file
both match `/d1|matriculation|college commitments/i` (metrics.ts ~line 287) and fold onto
`matriculation`. Check the ingest output (`.claude/docs/sports/charlotte-catholic.md`, the
`schools.json` entry) for a duplicated or merged matriculation card. If the old dossier now
produces a duplicate, the fix belongs in the data or the rule, not a component. Report it.

### The 19 new rows (all confirmed; URLs in the window file)

| Class | Athlete | Sport label | College (card style) | Conf. | Level | Confirmation |
|---|---|---|---|---|---|---|
| 2024 | Jack Larsen | Football | University of Notre Dame | ACC | P4 | ND roster (Jr., "Charlotte Catholic"); Observer 20 Dec 2023; 247 Composite NC 15 / national 481 |
| 2024 | Logan Hill | Cross country / track | University of South Carolina | SEC | P4 | Gamecocks profile; HighSchoolOT XC/track tracker |
| 2024 | Logan Leckner | Swim & dive | West Virginia University | Big 12 | P4 | WVU profile; HighSchoolOT girls swimming tracker; Observer 2023-24 swimming preview |
| 2024 | Nick Segarra | Football | Ohio University | MAC | D1 | Ohio rosters 2024, 2025; Observer 20 Dec 2023; 247 Composite NC 52 |
| 2024 | Brody Roderick | Baseball | Southern Wesleyan University | Conference Carolinas | D2 | SWU 2025 roster; HighSchoolOT baseball |
| 2025 | Roman Hyland | Football | U.S. Naval Academy | American | D1 | Navy roster; HighSchoolOT out-of-state 2025 |
| 2025 | Charlie Smith | Football | Harvard University | Ivy | D1 | Harvard roster; Observer 4 Dec 2024; 247 Composite NC 66 |
| 2025 | Jack Baade | Football | Harvard University | Ivy | D1 | Harvard roster; Observer 4 Dec 2024 |
| 2025 | Nick Bierman | Football | Lafayette College | Patriot | D1 | Lafayette roster; Observer 4 Dec 2024 |
| 2025 | Luciano Salas | Swim & dive | Queens University of Charlotte | **confirm** (step 3) | D1 | Queens roster (So. 2026-27, last school Charlotte Catholic) |
| 2025 | Jon Fijalkowski | Baseball | Clarion University | PSAC | D2 | Clarion roster profile; PBR |
| 2025 | Will O'Rourke | Baseball | Lenoir-Rhyne University | South Atlantic | D2 | LR roster; The Baseball Cube |
| 2025 | Maggie Kernodle | Basketball | Hamilton College | NESCAC | D3 | Hamilton roster; HighSchoolOT girls basketball |
| 2026 | Quinn O'Rourke | Baseball | University of Arizona | Big 12 | P4 | Arizona's 2026 signing-class release (12 Nov 2025) |
| 2026 | Cooper Gornet | Baseball | NC State University | ACC | P4 | NC State roster (Fr.); PBR |
| 2026 | Brady Marconi | Baseball | College of Charleston | CAA | D1 | CofC roster (Fr.); PBR |
| 2026 | Ben Bordeaux | Baseball | Queens University of Charlotte | ASUN | D1 | Queens roster (Fr.); PBR |
| 2026 | Mary Martin Spinner | Soccer | College of Charleston | CAA | D1 | CofC roster profile (Fr.) |
| 2026 | Jack Siegel | Basketball | Mars Hill University | South Atlantic | D2 | Mars Hill 2026-27 roster (Fr.); RealGM |

**Excluded** (recorded in the window file): Farley (Wofford, still never on a roster), Pardue
(Georgetown, absent from the 2025-26 roster she was due to join), Clendenin (Ithaca,
Observer-only, on no Ithaca roster), Greeley (Sewanee, PBR-only), and Conor Walsh (Harvard,
Class of 2023).

### The card today (`src/data/sportsPrograms/charlotte-catholic.ts`, `pipeline`, lines ~221–301)

- **Roster:** 35 window rows in article order, then 5 Class of 2027 verbal rows under a
  comment.
- **Funnel:** student body ~1,171 (1.0), alumni 1000+ (0.62), 35 (0.3), 25 (0.21), 10 (0.09).
- **Sport bars:** 11 bars, max Lacrosse 11.
- **Prose fields:** `headline`, `subhead`, `funnelNote`, `realityCheck`, `rankedRecruits`,
  `rosterNote`.
- **`rank247`:** only Basrawala has one (`{ state: 82, url }`).
- **College style:** full names (`'University of Louisville'`, `'West Point'`,
  `'Air Force Academy'`).
- **`sources[]`:** 13 entries, with constants such as `SIGN24` / `SIGN25` / `SIGN26` defined
  above the card.

### Compare (`src/data/metricValues.ts`)

- `p4-commits-2426` (~2292): `'charlotte-catholic': '10'`, with a name comment.
  `quals['charlotte-catholic']` is `kind: 'minimum'`, text "Ten Power Four commitments … the
  Class of 2026 is a documented minimum: only the February signing ceremony is published …".
- `d1-commits-2426` (~2338): `'25'`, with a comment. Its qual text is "Twenty-five Division I
  commitments among 35 documented athletes … See p4-commits-2426 on why the 2026 class is
  understated."
- `seniors-committed` (~2394): `'5'`, `SENIORS_QUAL`. **Unchanged.**
- The two quals are **different texts**, so they are two units.

### Overlay units (measured from `src/data/overlays/work/*.es.json`)

- **`sports`:** the CCHS pipeline units are the six prose fields, the five funnel
  label/hint pairs and roster `sport` only. Roster `name`, `college`, `conf`, `level`,
  `sportBars[]` labels and `sources[].label` are **not extracted**, so new college names,
  `'PSAC'` and any Queens swimming conference **cost no unit**. Every roster sport the new
  rows use (`Football`, `Baseball`, `Basketball`, `Soccer`, `Swim & dive`,
  `Cross country / track`) is an existing CCHS unit.
- **`metric-values`:** `'39'` already exists as a value unit (1 path), so CCHS attaches to
  it. **`'15'` does not exist** and becomes a new value unit. `'10'` and `'25'` keep their
  other paths.

**Phase 2 forecast per locale:** `sports` 6 added / 6 dropped (the five prose fields plus
`rankedRecruits`). `metric-values` 3 added (two quals, value `'15'`) / 2 dropped (the two old
quals). Anything else means something went wrong; stop and look.

## Decisions

- **Window check (2026-11-08): no roll due.** The current seniors are the Class of 2027 and
  the latest graduated class is 2026, which is the window's end.
- **No UX gate.** The card and all three Compare rows exist, and every change fills existing
  fields.
- **Notre Dame is `ACC` / `P4`**, per the skill rule (Notre Dame counts as ACC on this card).
  One existing row elsewhere uses the same pairing.
- **College strings use this file's full-name style.** Use `'U.S. Naval Academy'`, which fits
  the file's `'Air Force Academy'` / `'West Point'`, and `'NC State University'`. Keep
  `'North Carolina'` for UNC, as the file has it.
- **Mars Hill and Lenoir-Rhyne conf is `'South Atlantic'`**, consistent with this file
  (Teeter). The repo also has `'SAC'`. Neither string is extracted.
- **Queens swimming conference:** confirm it on queensathletics.com in step 3. Use `'ASUN'`
  only if Queens swims in the ASUN; otherwise use the conference Queens names. Being
  unextracted, it adds no unit either way.
- **Hill's sport label is `'Cross country / track'`** and Leckner's and Salas's is
  `'Swim & dive'`, reusing the existing CCHS units.
- **Larsen, Segarra and Smith get `rank247`** from the repo's own
  `Charlotte Catholic - Sports - 247Sports Recruiting Rankings.md`, where they sit in the
  reverse sweep: Larsen `{ national: 481, state: 15 }`, Segarra `{ state: 52 }`, Smith
  `{ state: 66 }`. Composite is the app's standard (user decision 2026-10-26). In the same
  ingest, move those three from that file's "NOT on our roster" section to the matched
  table, with a one-line note.
- **`rankedRecruits` is rewritten**, because its "return 403/404" clause is research
  bookkeeping on a parent page (CLAUDE.md dev-only rule).
- **The roster is re-sorted** into the card convention: 2026 → 2025 → 2024, then the 2027
  verbals last; P4 → D1 → D2 → D3 within a class. The order inside a level is free; keep
  article order where it existed.
- **Plan name `catholiccommits`** was fixed by the `/athlete-commits` handoff.

## Approvals needed

**None.**

## Source material

| File | State | Role |
|---|---|---|
| `Charlotte Catholic - Sports - College Commitments 2024-2026.md` | new | provenance for the card and both window rows |
| `Charlotte Catholic - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Charlotte Catholic - Sports - Program Championships and College Commitments.md` | superseded note added | earlier record |
| `Charlotte Catholic - Sports - College Commitments Class of 2027.md` | two leads added | `seniors-committed` stays `'5'` |

`/implement` ingests them first (step 2).

## Out of scope

- The Class of 2027 / `seniors-committed`. Re-check it after the 2026-11-11 signing period.
- Rolling the window (not due) and the CLAUDE.md floor paragraph. Charlotte Catholic is not
  the floor school, and no row changes null state. Confirm with `npm run coverage:floor`.
- `honors`, any other school, any component.
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/charlotte-catholic-commits-2026` from a freshly pulled `main`. Run
   `git status --short` and confirm it shows only the four source-material paths above, this
   plan and `INDEX.md`. Leave anything else alone.

2. **Ingest.** Run the `ingest-source-material` skill for `sports` / `charlotte-catholic`.
   - `git diff --stat src/data/schools.json` should show only Charlotte Catholic sports
     entries. If the manifest reorders wholesale, restore `HEAD` order.
   - `npm run check:metrics`: the Cross-Reference file must fold onto `redesign-research`.
     Inspect the matriculation fold-on (see the *Context* trap). The pre-existing Charlotte
     Christian "Podcast Episode 33" finding is not ours.
   - In the same step, edit `Charlotte Catholic - Sports - 247Sports Recruiting Rankings.md`:
     move Larsen, Segarra and Smith into the matched table, with Composite figures as already
     recorded there.
   - Run `npm run schema && npm run check:schema`.

3. **Confirm the Queens swimming conference** on queensathletics.com (the men's swimming page
   or the conference affiliation page). Record the result in the window file's Salas row.

4. **Edit the pipeline card** in `src/data/sportsPrograms/charlotte-catholic.ts`. The prose
   states what the school and colleges publish, never what was searched.

   a. `headline` →
   `'54 documented college athletes across three graduating classes — 39 of them Division I and 15 Power Four.'`

   b. `subhead` →
   `'Every athlete below is named in a signing-day article, a newspaper signing list or the college’s own roster.'`

   c. `funnel` → counts `'54'` (0.46), `'39'` (0.33), `'15'` (0.13). Rows 0–1 and all labels,
   hints and shades are unchanged.

   d. `funnelNote` →
   `'The 1000+ figure is the school’s own all-time count and is not restricted to these three classes, so it sits on a different time base from the rows beneath it. The three classes below are a documented minimum: CCHS holds separate fall, winter and spring signing days and publishes no consolidated list, so athletes appear here once a signing article, a newspaper signing list or the college’s own roster names them.'`

   e. `sportBars` (sum 54) →
   ```ts
   { sport: 'Baseball', count: 13, width: 1.0 },
   { sport: 'Football', count: 11, width: 0.85 },
   { sport: 'Lacrosse', count: 11, width: 0.85 },
   { sport: 'Basketball', count: 5, width: 0.38 },
   { sport: 'Swim & dive', count: 4, width: 0.31 },
   { sport: 'Soccer', count: 3, width: 0.23 },
   { sport: 'Golf', count: 2, width: 0.15 },
   { sport: 'Cross country / track', count: 2, width: 0.15 },
   { sport: 'Softball', count: 1, width: 0.08 },
   { sport: 'Tennis', count: 1, width: 0.08 },
   { sport: 'Field hockey', count: 1, width: 0.08 },
   ```
   If other cards carry `p4Width` on a bar and this one does not today, leave it off; don't
   add a field the card never had.

   f. `realityCheck` →
   `'Baseball is now the deepest pipeline here — 13 of 54 documented athletes, including Power Four signees at Duke, North Carolina, Virginia Tech, Arizona and NC State in three classes. Football and lacrosse follow with 11 each, and both lacrosse programs won state titles in 2026.'`
   (Baseball P4 check against the window file: Hedrick (Duke), MacIntyre (Indiana), McKnight
   (UNC), Hoffman (Virginia Tech), Q. O'Rourke (Arizona), Gornet (NC State). The sentence
   names five of the six. Add Indiana if the reviewer wants the full set.)

   g. `rankedRecruits` →
   `'Three football signees carry 247Sports Composite ranks — Jack Larsen (Notre Dame) was No. 15 in North Carolina in the Class of 2024 — and no CCHS athlete in these classes was a national top-100 recruit.'`

   h. `roster`: write the 54 window rows in the order 2026 → 2025 → 2024 (P4 → D1 → D2 → D3
   within each class), using the 19 new rows from the *Context* table plus the 35 existing
   rows unchanged (incl. Basrawala's `rank247`). Then keep the `// Class of 2027 …` comment and
   the 5 verbal rows exactly as they are. New `rank247`:
   ```ts
   rank247: { national: 481, state: 15, url: 'https://247sports.com/player/jack-larsen-46117223/' }   // Larsen
   rank247: { state: 52, url: 'https://247sports.com/player/nick-segarra-46135129/' }                 // Segarra
   rank247: { state: 66, url: 'https://247sports.com/player/charlie-smith-46147891/' }                // C. Smith
   ```
   Count check: 2026 = 15, 2025 = 19, 2024 = 20.

   i. `rosterNote` →
   `'Cannon Ridinger graduated from CCHS after earlier attending Charlotte Country Day (also in this app) and Hotchkiss; he is attributed here by graduating school and must not be double-counted. Evan MacIntyre is counted P4 at commitment time and has since transferred to Belmont Abbey via JUCO. Three athletes named on signing lists or by recruiting sites — Mary Catherine Farley (Wofford), Audrey Pardue (Georgetown) and Conor Clendenin (Ithaca) — have not appeared on those colleges’ rosters and are excluded from every count. The Class of 2027 rows are public verbal commitments, listed because they are already announced and not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign.'`

   j. `sources[]`: append
   ```ts
   { label: 'Charlotte Observer via Yahoo — early football signing list (Dec 2023, Class of 2024)', url: 'https://ca.news.yahoo.com/national-signing-day-where-observer-104500782.html' },
   { label: 'Charlotte Observer via Yahoo — early football signing list (Dec 2024, Class of 2025)', url: 'https://sports.yahoo.com/articles/where-charlotte-area-football-players-113000707.html' },
   { label: 'arizonawildcats.com — Arizona baseball 2026 signing class (Quinn O’Rourke)', url: 'https://arizonawildcats.com/news/2025/11/12/arizona-baseball-unveils-15-man-2026-signing-class.aspx' },
   { label: 'fightingirish.com — Notre Dame football roster (Larsen)', url: 'https://fightingirish.com/sports/football/roster/' },
   { label: 'gamecocksonline.com — Logan Hill, South Carolina track & field', url: 'https://gamecocksonline.com/sports/track/roster/player/logan-hill/' },
   { label: 'wvusports.com — Logan Leckner, West Virginia swimming & diving', url: 'https://wvusports.com/sports/mswim/roster/logan-leckner/18229' },
   { label: 'gopack.com — NC State baseball roster (Gornet)', url: 'https://gopack.com/sports/baseball/roster' },
   { label: 'HighSchoolOT — NC recruiting trackers, by sport', url: 'https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/' },
   { label: 'RealGM — Charlotte Catholic High School basketball players', url: 'https://basketball.realgm.com/highschool/teams/2034/Charlotte-Catholic-High-School-NC' },
   ```
   The remaining roster URLs live in the window file. Do not paste all 19.

5. **Compare rows** in `src/data/metricValues.ts`:
   - `p4-commits-2426`: `'charlotte-catholic': '15'`. Replace the comment with the 15 names
     and colleges from the window file's "Power 4 by name" line.
   - `p4` qual text →
     `'Fifteen Power Four commitments across the Classes of 2024-2026, from the school’s signing articles, newspaper signing lists and the colleges’ own rosters. A documented minimum: CCHS publishes no consolidated signing list.'`
   - `d1-commits-2426`: `'39'`, with a comment `// of 54 documented athletes; P4 is a subset. See the CCHS College Commitments 2024-2026 source file`.
   - `d1` qual text →
     `'Thirty-nine Division I commitments among 54 documented athletes; Power Four is a subset. Athletes named on a signing list but never found on a college roster are excluded.'`
   - Keep `kind: 'minimum'` on both. `seniors-committed` stays unchanged.
   - Run `npm run coverage:floor` and confirm the floor is unchanged (31/45, Davidson Day).

6. **Checks and browser**: see Verification. Commit with explicit paths: the five
   source-material files (four, plus the 247Sports file), `charlotte-catholic.ts`,
   `metricValues.ts`, `schools.json`, `.claude/docs/sports/charlotte-catholic.md`, any other
   ingest output (inspect it first), `DATA-SCHEMA.md` only if changed, this plan and
   `INDEX.md`. Push, then verify `git rev-parse HEAD` against `git ls-remote`. Flip the plan
   and the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (read them from `src/lib/i18n.ts`; today
`es bn ht te fr fa it hi ar`) on **two** overlay topics, `sports` and `metric-values`. There
are no chrome catalogs. The mechanism is in `.claude/docs/prose-translation-architecture.md`;
the recipe is the `ddcommits` / `charlotte-latincommits` Phase 2.

1. Run `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` and
   `--topic metric-values`, dry-run on `es` first. Confirm the forecast (`sports` 6/6;
   `metric-values` 3 added / 2 dropped). Roster indexes shift for **all** CCHS rows, so
   **splice by stamp, never by path**. Every roster `sport` path must land on an existing CCHS
   unit, and the new D1 path on the existing `'39'` unit.
2. Translate by hand per locale, starting from each locale's shipped rendering of the old
   field. Copy these figures char-for-char: `54`, `39`, `15`, `13`, `11`, `1000+`, `2024-2026`
   (hyphen in the quals), `2026`, `No. 15`. Keep college and conference names (Notre Dame,
   Duke, Arizona, NC State, Wofford, Georgetown, Ithaca, Belmont Abbey, Hotchkiss, 247Sports)
   in Latin script, as each locale already does. The spelled-out "Fifteen" and "Thirty-nine"
   in the quals follow each locale's practice in the old quals ("Ten", "Twenty-five"). For
   `fa`/`ar`, put no isolates in the work file.
3. Run `npm run i18n:build -- --topic sports --lang <code>` and `--topic metric-values`, ×9.
4. Run the checks, commit with explicit paths, push (verify the SHA), open the PR with
   `--body-file`, run `gh pr merge --squash --delete-branch`, then
   `git checkout main && git pull`. Flip the plan and INDEX row to *Implemented* with the PR
   link (in the PR, or in a follow-up PR, never on `main`). **Do not deploy.** Say "merged —
   ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/charlotte-catholic/*.md` (5) | research from `/athlete-commits`, plus the 247Sports file move in step 2 |
| `src/data/schools.json`, `.claude/docs/sports/charlotte-catholic.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/charlotte-catholic.ts` | six prose fields, funnel, sportBars, roster 40 → 59 (54 window + 5 verbal), 3 `rank247`, 9 sources |
| `src/data/metricValues.ts` | P4 10 → 15, D1 25 → 39, two quals, comments |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:metrics`, `check:schema`, `check:quals` and `check:chrome` are clean,
      apart from the known pre-existing metrics finding.
- [ ] `npm run coverage:floor`: the floor is unchanged.
- [ ] A one-off node count over `pipeline.roster` gives 54 non-2027 rows, D1+P4 = 39 and
      P4 = 15, matching the funnel and Compare.
- [ ] `npm run check:live` fails only on the old CCHS stamps (6 sports, 2 metric quals plus
      the value), which is the expected English-shipped state. Run the rest of the
      `npm run build` chain with only `check:live` removed: exit 0.
- [ ] Browser check (`npm run build && npx vite preview`, real Chrome) on
      `/school/charlotte-catholic?topic=sports` with the College Pipeline card open:
      - the funnel reads 54 / 39 / 15
      - eleven bars sum to 54, Baseball 13 first
      - 59 roster rows with 2026 first and the verbals last
      - the Larsen, Segarra and Smith rank cells link to 247
      - the D1 and P4 filter tabs read 39 and 15
      - the new prose renders and the new source links open
      - the headline is the card **teaser**, hidden while the card is open, so check it with the card closed.
- [ ] Browser check on `/compare?topic=sports&schools=charlotte-catholic,providence-day`:
      Charlotte Catholic reads **15** and **39**, and the hover tips show the new quals.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 returns 0, and
      `python3 scripts/check_figures.py --lang <code> --topic sports` ×9 is clean.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi` and
      `check:fr` are clean. Also run `node scripts/check_work_integrity.mjs`. It reports
      post-splice index-shift false alarms, so verify anything it flags by stamp against HEAD.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the CCHS pipeline paths returns 0.
- [ ] `npm run build` exits 0.
- [ ] Browser check on `/school/charlotte-catholic?lang=es&topic=sports` and `?lang=fa`, card
      open: the prose is translated and the figures are intact. In `fa`, probe a range unique
      to this card, not a shared one. Roster sport names follow the existing per-locale
      convention. Check the teaser headline with the card closed. Compare with `?lang=es`
      shows 15 / 39 and the translated quals.

## Risks

| Risk | Mitigation |
|---|---|
| All 40 CCHS roster indexes shift, so a sport path lands on no unit and renders English | Splice by stamp; run `check:live` and `i18n:leaks` on `charlotte-catholic:pipeline.roster[*].sport` |
| The old dossier and the new window file both fold onto `matriculation`, giving a duplicate card | Inspect the ingest output in step 2 and report rather than patch a component |
| Another session's files get swept into the commit | Stage explicit paths and run `git status --short` before each commit |

## Open questions

- **Prose wording** settles at the Phase 1 review. Default: as written in step 4.
- **Whether `realityCheck` should list all six baseball P4 colleges.** Default: five, as
  written.

## Implementation notes

Phase 1 (English) built 2026-11-08 on `feat/charlotte-catholic-commits-2026`.

- **Fold-on trap did not fire.** The old dossier normalizes to `championships`; the new window
  file and the Class of 2027 file share `matriculation`, the same pairing Charlotte Latin and
  Davidson Day ship. No duplicate card.
- **Queens swimming is ASUN**, confirmed on Queens' own 2026 ASUN championship release (URL in
  the window file's Salas row).
- **247Sports file:** the three moved rows carry their Composite figures. Their position and
  247 in-house columns read `not recorded`, because the reverse sweep never captured them.
- **Filter-tab counts include the 2027 verbals**, as on every school's card: Division I reads
  44 of 59 (39 + 5) and Power 4 reads 18 of 59 (15 + 3). The plan's "39 and 15" referred to
  the window counts, which the funnel and Compare show.
- `check:live` fails on exactly 8 stamps per locale (6 sports + 2 quals), as forecast. The
  build chain without it exits 0.

Phase 2 (all nine prose locales) built 2026-11-09 in the same window, after the user approved
the English.

- The splice matched the forecast in every locale: `sports` 6 added / 6 dropped,
  `metric-values` 3 added / 2 dropped. 17,406 kept translations are identical to HEAD by stamp.
- `check:digits` caught one re-typed figure: Hindi `11-11` (each) doubled the `11`. It was
  rewritten as `प्रत्येक में 11` and re-checked to 0.
- `check_work_integrity.mjs` reports 29 index-shift alarms per locale (string count
  905 → 906, roster rows whose index moved). The stamp comparison above is the real check.
- The `i18n:leaks` flags on Charlotte Catholic paths are all roster sport chips already shipped,
  which are ledgered keeps. None of the 9 new units is flagged.
