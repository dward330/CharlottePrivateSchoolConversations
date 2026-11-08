---
name: charlottechristiancommits
title: Charlotte Christian — the /athlete-commits graduate refresh adds the missing Class of 2026 (10 commitments, 9 D1, Jamal Rule to Nebraska as the 9th Power 4); College Pipeline card 38 / 26 / 8 → 48 / 35 / 9, Compare P4 9, D1 35; fixes the Football/Other bar split and two false sentences in rankedRecruits
status: implemented
phases: 2
created: 2026-11-08
branch: feat/charlotte-christian-commits-2026
prs: []
---

# Charlotte Christian's College Pipeline: the Class of 2026

## Goal

Charlotte Christian's College Pipeline card (Sports) and its two Compare rows cover only the
classes of 2024 and 2025, because the school's "Knights in College" list stops at 2025. The
`/athlete-commits` graduate refresh of 2026-11-08 cross-referenced every varsity senior and
confirmed **ten Class of 2026 commitments — nine Division I, one Power 4 (Jamal Rule,
Nebraska)** — on college rosters and the school's own announcement. This plan adds those ten
rows, moves the card to **48 / 35 D1 / 9 P4**, rewrites five prose fields and the shared
Compare qual, and moves `p4-commits-2426` 8 → 9 and `d1-commits-2426` 26 → 35. Done when the
Charlotte Christian page and Compare show those figures, every row traces to the committed
source files, and `npm run build` is green in all ten locales.

## Context

### The source (read these first)

All in `source-material/sports/charlotte-christian/`, **written during planning,
uncommitted**:

- `Charlotte Christian - Sports - College Commitments 2024-2026.md` — **rebuilt.** Standard,
  graduate test, every source URL, one table per class with a *Confirmed by* column, totals,
  the by-sport D1 split, the Football/Other correction, and the *Excluded* list.
- `Charlotte Christian - Sports - Varsity Roster Cross-Reference 2026.md` — **new.** MaxPreps
  senior counts per sport and season, sources reached, tiers, nulls, unchecked sports.
  Already folds onto `redesign-research` via the `/roster cross-reference/i` rule at
  `src/lib/metrics.ts:281` — **no `metrics.ts` change.**
- `Charlotte Christian - Sports - Redesign Research 2026.md` — superseded note above §3.
- `Charlotte Christian - Sports - College Commitments Class of 2027.md` — **extended** with
  three leads (Carroll – Maryland, Corum – Pace, the Struble Monmouth/W&L conflict). The
  confirmed count stays **1** (Will Parrish), so `seniors-committed` does not change.

### Verification status per new athlete (planning-time, 2026-11-08)

| Athlete | College · conf · level | Confirmed by |
|---|---|---|
| Jamal Rule | Nebraska · Big Ten · **P4** | Nebraska roster (Salisbury, N.C. / Charlotte Christian); HighSchoolOT out-of-state D1 list; 247 Composite No. 31 NC / No. 835 national (0.8767) |
| Henry Hulbert | Army · American · D1 | School announcement (Feb. signing ceremony); Army 2026 roster |
| Vincent Rosen | Air Force · Mountain West · D1 | School announcement (Air Force's public roster lists no freshmen) |
| Daniel Phillips | Charlotte · American · D1 | Charlotte 2026 roster; HighSchoolOT in-state FBS (MaxPreps prints "Daniel Phillips Jr."; use the college's form) |
| Cohen Kilgannon | Elon · CAA · D1 | Elon 2026 roster (LB); HighSchoolOT in-state FCS |
| Ryder Kilgannon | Elon · CAA · D1 | Elon 2026 roster (DE) — a second athlete, not a duplicate |
| Russ Berger | Columbia · Ivy · D1 | Columbia roster; PBR 2026 preview |
| Jack Beard | Gardner-Webb · Big South · D1 | Gardner-Webb signing release 2025-11-14; PBR preview (brother of Drew Beard '24) |
| Morgan Banks | Queens (Charlotte) · ASUN · D1 | Queens softball roster; HighSchoolOT softball tracker |
| Tate Estep | Barton · SAC · D2 | Barton 2026 roster; HighSchoolOT ("Barton College Bulldogs (Wilson / South Atlantic Conference)") |

Ruled out (in the source file, not on the card): **DJ Layton '24** (Southern Miss signee;
drafted 6th round 2024 by Baltimore, never enrolled, omitted by the school's list — see
Decisions); **L.J. Porter '26** (graduate test: CC as a sophomore and junior, senior year at
Hough, committed to ECU from there); **Landon DeCarlo '25** (not on Berry's roster); **Jack
McGrath '26** (not on Hampden-Sydney's 2027 roster). Leads, not rows: Drew Darling
(Belmont Abbey, PBR only, roster unposted), Barrett Banner (Gordon, LaxNumbers only).

### Where it lands (existing fields only; confirmed by reading the files)

- `src/data/sportsPrograms/charlotte-christian.ts`, the `pipeline` card (lines ~219–316):
  `headline`, `funnel[]`, `funnelNote`, `sportBars[]`, `realityCheck`, `rankedRecruits`,
  `roster[]`, `rosterNote`, `sources[]`. **`subhead` is unchanged** (the 2014–2025 fact still
  holds).
- `src/data/metricValues.ts`: `p4-commits-2426` (`'charlotte-christian': '8'`, ~line 2297)
  and `d1-commits-2426` (`'26'`, ~line 2343) values and comments, and the shared
  `quals['charlotte-christian'].text` on both rows (~lines 2318 and 2364; identical text, one
  `metric-values` unit with two `at` paths). `seniors-committed` (`'1'`, ~line 2401):
  unchanged.
- `src/lib/metrics.ts`, `src/components/SportsProgram.tsx`: **no change.**

### Conventions the new rows follow

- `sportBars` is labelled "D1 commits by sport" (`cardLabels.d1CommitsBySport`) and on this
  card sums to the D1 count. `width = count / max`, `p4Width = P4 count / max`.
- Within a class P4 → D1 → D2 → D3; classes '26, '25, '24, then the '27 verbal last.
- `college` and `conf` are **not extracted** for translation; `sport` is, and `'Football'`,
  `'Baseball'`, `'Softball'` are existing units. Every `conf` string used already exists in
  `src/data/sportsPrograms/*.ts`.
- Funnel hint: use the existing `'(all divisions, 2024–26)'` (Carmel Christian's, an existing
  unit) rather than a new `'24–'26` form.

### Why two phases

Five `sports` prose units change (`headline`, `funnelNote`, `realityCheck`, `rankedRecruits`,
`rosterNote`), plus one `metric-values` unit (the qual). Phase 2 translates them into the
nine `PROSE_TRANSLATED` locales after the user reviews the English.

## Decisions

- **DJ Layton is excluded.** He signed with Southern Miss but was drafted and turned pro; he
  never played a college game, and the school's own list leaves him off. Counting him would
  make the 2024 D1 count 12 and the window 49 / 36 / 9. **This is the one judgment call; the
  user can reverse it at the Phase 1 review** (one row, two counts, one comment).
- **Vincent Rosen counts on the school's own announcement.** The school names him at its
  February athletic signing ceremony; Air Force does not publish freshmen.
- **Fix the existing bar error.** The shipped bars say Football 9 / Other 5. The 2024–25 rows
  give Football 10 (Gilbert, Young, Henley, Zinger, Woody, Major, Vann, Farrell, Hall,
  Hettwer) / Other 4 (tennis, swimming, volleyball, golf).
- **Fix `rankedRecruits`.** It names L.J. Porter, who did not graduate from Charlotte
  Christian, and says no top-100 national recruit is confirmed, while the card's own Bryce
  Young row carries 247 national No. 73. The rewrite names Young and Rule.
- **"Highest D1 share in this comparison" stays.** It is true: 35/48 = 73% against Davidson
  Day's 11/16 = 69%, the next highest. Charlotte Catholic's funnel is on a different scale
  (~1,171).
- **Name `charlottechristiancommits`**, matching `cannoncommits` / `charlottechristiancup`.

## Approvals needed

**None.** Every change fills fields on an existing card and two existing Compare rows. No
window roll is due: current seniors are the Class of 2027 and the last graduated class (2026)
is the window's last year.

## Out of scope

- Re-checking Darling, Banner, Carroll, Corum and Struble once the early signing period
  (opens 2026-11-11) and the colleges' 2027 rosters land — the next current-senior pass.
- `subhead`, any other Sports card, any other school. Cannon's bars sum to all commitments
  rather than D1 despite the shared "D1 commits by sport" label. That is noted here, not fixed.
- Deploying. Merge, then stop.

## Steps

### Phase 1: English

1. **Branch** `feat/charlotte-christian-commits-2026` from a freshly pulled `main`.
   `git status --short` must show only the four source-material paths above.

2. **Ingest.** Run the `ingest-source-material` skill for `sports` / `charlotte-christian`.
   It regenerates `.claude/docs/sports/charlotte-christian.md` and `src/data/schools.json`.
   Then `git diff --stat src/data/schools.json` (only Charlotte Christian sports entries;
   restore `HEAD` order on a wholesale reorder), `npm run check:metrics` (exit 0),
   `npm run schema && npm run check:schema` (commit `DATA-SCHEMA.md` only if it changed).

3. **Two live re-checks before typing:**
   - Read https://247sports.com/player/jamal-rule-46147357/high-school-309039/ (WebFetch)
     and use its current Composite national and state rank in step 4f. Planning-time values:
     national 835, state 31.
   - Confirm Barton football's conference on bartonbulldogs.com. If it is not the South
     Atlantic Conference, use the existing string that matches (`'Conference Carolinas'`)
     and correct the source file's Class of 2026 table.

4. **Edit the pipeline card** in `src/data/sportsPrograms/charlotte-christian.ts`:

   a. `headline` →
      `'48 college commitments across the classes of 2024, 2025 and 2026, 35 of them Division I and 9 Power 4.'`

   b. `funnel[]`: stage 0 `hint: '(all divisions, 2024–26)'`, `count: '48'`, width `1`;
      stage 1 `count: '35'`, width `0.73`; stage 2 `count: '9'`, width `0.19`. Labels,
      other hints and shades unchanged.

   c. `funnelNote` →
      `'The classes of 2024 and 2025 come from the school’s published "Knights in College" roster; the Class of 2026, which that list does not yet include, is confirmed on the colleges’ own rosters and in the school’s announcements. At 73%, the Division I share of commitments is the highest of any school in this comparison.'`

   d. `sportBars` →
      ```ts
      { sport: 'Football', count: 16, width: 1, p4Width: 0.25 },
      { sport: 'Baseball', count: 6, width: 0.38, p4Width: 0.06 },
      { sport: 'Track & Field', count: 5, width: 0.31, p4Width: 0.06 },
      { sport: 'Softball', count: 2, width: 0.13, p4Width: 0.06 },
      { sport: 'Wrestling', count: 1, width: 0.06, p4Width: 0.06 },
      { sport: 'Lacrosse', count: 1, width: 0.06, p4Width: 0.06 },
      { sport: 'Other', count: 4, width: 0.25 },
      ```
      (sums to 35; P4 4 + 1 + 1 + 1 + 1 + 1 = 9.)

   e. `realityCheck` →
      `'Football is the volume engine at sixteen Division I commits — Jamal Rule to Nebraska and two service-academy signees, Henry Hulbert to Army and Vincent Rosen to Air Force, among them — but the Power 4 placements are spread unusually wide: wrestling to NC State, softball to Florida State, lacrosse to Penn State and track to Kentucky each produced a P4 signee from a single athlete. Charlotte Christian converts across many sports rather than concentrating in one.'`

   f. `rankedRecruits` →
      `'Bryce Young (’24, Notre Dame) was the No. 73 national recruit in the 247Sports Composite, and Jamal Rule (’26, Nebraska) the No. 31 prospect in North Carolina. The instructive case is the inverse: Stephen Curry left in 2006 with no major-conference scholarship offer and 31 point guards ranked ahead of him, and Virginia Tech — his father’s alma mater — offered only a walk-on spot.'`
      (Use step 3's live rank for Rule. Young's 73 is the shipped `rank247.national`; if
      its URL now shows a different Composite rank, use that and fix the row too.)

   g. `roster[]`: insert above the first `'25` row, in this order:
      ```ts
      // Class of 2026
      { cls: "'26", name: 'Jamal Rule', sport: 'Football', college: 'Nebraska', conf: 'Big Ten', level: 'P4',
        rank247: { national: 835, state: 31, url: 'https://247sports.com/player/jamal-rule-46147357/high-school-309039/' } },
      { cls: "'26", name: 'Henry Hulbert', sport: 'Football', college: 'Army', conf: 'American', level: 'D1' },
      { cls: "'26", name: 'Vincent Rosen', sport: 'Football', college: 'Air Force', conf: 'Mountain West', level: 'D1' },
      { cls: "'26", name: 'Daniel Phillips', sport: 'Football', college: 'Charlotte', conf: 'American', level: 'D1' },
      { cls: "'26", name: 'Cohen Kilgannon', sport: 'Football', college: 'Elon', conf: 'CAA', level: 'D1' },
      { cls: "'26", name: 'Ryder Kilgannon', sport: 'Football', college: 'Elon', conf: 'CAA', level: 'D1' },
      { cls: "'26", name: 'Russ Berger', sport: 'Baseball', college: 'Columbia', conf: 'Ivy', level: 'D1' },
      { cls: "'26", name: 'Jack Beard', sport: 'Baseball', college: 'Gardner-Webb', conf: 'Big South', level: 'D1' },
      { cls: "'26", name: 'Morgan Banks', sport: 'Softball', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
      { cls: "'26", name: 'Tate Estep', sport: 'Football', college: 'Barton', conf: 'SAC', level: 'D2' },
      ```
      The '25 and '24 blocks and the '27 Parrish row stay verbatim.

   h. `rosterNote` →
      `'The school’s published commitment list runs through the Class of 2025; the Class of 2026 rows are confirmed on the colleges’ own rosters and in the school’s announcements. Level labels and conferences were added by the researcher from each college’s NCAA status. The Class of 2027 rows are public verbal commitments, listed because they are already announced and not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign.'`

   i. `sources[]`: **replace** the `'247Sports — 2026 NC football recruits'` entry (it backed
      the Porter sentence) with
      `{ label: '247Sports Composite — 2026 North Carolina football rankings', url: 'https://247sports.com/season/2026-football/compositerecruitrankings/?InstitutionGroup=HighSchool&State=NC' }`,
      keep the rest, and add:
      ```ts
      { label: 'charlottechristian.com — West Point and Air Force Academy bound, Class of 2026', url: 'https://www.charlottechristian.com/post-details/~board/knights-headlines/post/west-point-and-air-force-academy-bound-graduates-from-the-class-of-2026' },
      { label: 'HighSchoolOT — North Carolina recruiting trackers', url: 'https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/' },
      { label: 'Prep Baseball Report — 2026 HS Preview, Region 6', url: 'https://www.prepbaseball.com/news/NC/2026-hs-preview--region-6' },
      { label: 'Gardner-Webb — baseball adds nine (Jack Beard)', url: 'https://gwusports.com/news/2025/11/14/gardner-webb-baseball-announces-the-addition-of-nine-athletes' },
      { label: 'Nebraska — football roster (Jamal Rule)', url: 'https://huskers.com/sports/football/roster' },
      { label: 'Elon — 2026 football roster (Cohen and Ryder Kilgannon)', url: 'https://elonphoenix.com/sports/football/roster/2026' },
      ```

5. **Compare rows** in `src/data/metricValues.ts`:
   - `p4-commits-2426` → `'charlotte-christian': '9', // ’24: Henley, Wilfong, Woody, Zinger · ’25: E.Boykin, Hinde, Nicholson, Vance · ’26: Rule`
   - `d1-commits-2426` → `'charlotte-christian': '35', // ’24: 11 · ’25: 15 · ’26: 9 (Layton ’24 drafted, never enrolled — excluded)`
   - Both `quals['charlotte-christian'].text` →
     `'A documented minimum: the school’s public commitment list runs through 2025, so its Class of 2026 is confirmed from college rosters and the school’s own announcements.'`
     (identical in both places, `kind: 'minimum'` kept).
   - `seniors-committed`: unchanged.

6. **Checks and browser.** See Verification. Commit with explicit paths (the four
   source-material files, `src/data/sportsPrograms/charlotte-christian.ts`,
   `src/data/metricValues.ts`, `src/data/schools.json`,
   `.claude/docs/sports/charlotte-christian.md`, `DATA-SCHEMA.md` only if changed), push,
   verify the SHA against `git ls-remote`. Set this plan and its INDEX row to *English
   shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review**, including the
Layton call. Nothing below runs until they confirm the English.

### Phase 2: every other locale

Scope: the nine `PROSE_TRANSLATED` locales, two overlay topics: `sports` (5 units) and
`metric-values` (1 unit, the qual). No chrome catalogs. The mechanism is in
`.claude/docs/prose-translation-architecture.md`, and the recipe is `cannoncommits2` /
`providence-daycommits` Phase 2.

Expected new units per locale: **6**, namely `charlotte-christian:pipeline.headline`,
`.funnelNote`, `.realityCheck`, `.rankedRecruits`, `.rosterNote`, and the qual. The funnel
hint attaches to the existing `'(all divisions, 2024–26)'` unit, and the old `'24–'25` unit
loses its only path. New roster rows add `at` paths to the existing `Football` / `Baseball`
/ `Softball` units. Roster indexes shift by 10, so **the splice matches by stamp, never by
path**. A seventh new unit means something went wrong: stop and look.

1. `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` (and `--topic
   metric-values`), dry-run `es` first.
2. Translate the six units by hand per locale, starting from each locale's shipped rendering
   of the old text (the `realityCheck`, `rosterNote` and Curry sentence are largely
   unchanged). Figures char-for-char: `48`, `35`, `9`, `73%`, `2024`, `2025`, `2026`, `No. 73`,
   `No. 31`, `31`, `2006`. Number words (`sixteen`) translate as words. Keep Latin: Notre
   Dame, Nebraska, Army, Air Force, NC State, Florida State, Penn State, Kentucky, Virginia
   Tech, 247Sports Composite, "Knights in College". `fa`/`ar`: no isolates in the work file.
3. `npm run i18n:build -- --topic sports --lang <code>` and `--topic metric-values`, ×9.
4. Phase 2 checks, commit with explicit paths, push, PR with `--body-file`, squash-merge,
   `git checkout main && git pull`, flip plan and INDEX to *Implemented*. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/sports/charlotte-christian/…College Commitments 2024-2026.md` | rebuilt (planning) |
| `source-material/sports/charlotte-christian/…Varsity Roster Cross-Reference 2026.md` | new (planning) |
| `source-material/sports/charlotte-christian/…Redesign Research 2026.md` | superseded note (planning) |
| `source-material/sports/charlotte-christian/…College Commitments Class of 2027.md` | leads added (planning) |
| `src/data/schools.json`, `.claude/docs/sports/charlotte-christian.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/charlotte-christian.ts` | 10 rows, funnel, bars, 5 prose fields, sources |
| `src/data/metricValues.ts` | two values, comments, shared qual |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1: English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals`,
      `npm run check:live` are clean.
- [ ] `npm run build` exits 0.
- [ ] Browser, `/school/charlotte-christian`, Sports → The College Pipeline, card open:
      funnel 48 / 35 / 9; seven bars with Football widest (16); roster 49 rows (48 + Parrish),
      `P4` on 9 counted rows plus Parrish; Rule shows the 247 chip; the P4 tab shows 10 rows
      (9 + the '27 verbal), the D1 tab 36; every source link opens.
- [ ] Browser, `/compare?schools=charlotte-christian,providence-day`, Sports: Charlotte
      Christian reads **9** on Power 4 commits and **35** on Division I commits; the qual
      tip shows the new text; `seniors-committed` still reads 1.

### Phase 2: locales

- [ ] `npm run check:runtime && npm run check:live`: all nine resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 returns 0; run `python3 scripts/check_figures.py
      --lang <code> --topic sports` ×9.
- [ ] `npm run check:digits`, `check:dates`, `check:moneytext`, `check:bidi`, `check:fa`,
      `check:hi`, `check:fr` are clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the six `at` paths returns 0.
- [ ] `npm run build` exits 0.
- [ ] Browser: `/school/charlotte-christian?lang=es` and `?lang=fa`, card open: five
      sentences translated, `48`, `35`, `9`, `73%` intact (and LTR in `fa`); names and colleges
      in Latin script; the Compare qual is translated.

## Risks

| Risk | Mitigation |
|---|---|
| 247 Composite rank moved since planning | Step 3 re-reads it before typing |
| Barton's conference is not SAC | Step 3 checks Barton's own site; both strings exist |
| The user wants Layton counted | Called out at the Phase 1 stop; a one-row change |
| Other sessions' untracked files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Implementation notes

- **Barton is Conference Carolinas, not SAC** (step 3). Barton's own 2026 football schedule
  (https://bartonbulldogs.com/sports/football/schedule) marks Chowan, Ferrum, UNC Pembroke,
  North Greenville, Shorter and Erskine as "CC *" conference games. Tate Estep's row uses the
  existing `'Conference Carolinas'` string, and the source file's Class of 2026 table and
  conference note were corrected. HighSchoolOT's "South Atlantic Conference" is out of date.
- **Rule's rank is unchanged** at Composite No. 835 national / NC 31 (0.8767), re-read
  2026-11-08 on his player page and the 2026 NC Composite list. **Young's No. 73 holds**: the
  2024 NC Composite list prints 0.9646, national 73, state 2. His bare player page shows the
  in-house 247Sports rating (Natl. 24), not the Composite, so it is not used.
- **`check:live` fails in Phase 1 on exactly 7 stamps per locale**: the six rewritten fields
  plus the retired `"(all divisions, '24–'25)"` hint. That is the expected English-first
  state. The rest of the `npm run build` chain was run with only `check:live` removed: exit 0.
- **The ingest also regenerated** `.claude/docs/INDEX.md` and
  `src/content/sports/charlotte-christian.json`, beyond the files the plan listed.
  `DATA-SCHEMA.md` changed (document count 545 → 546) and is committed.
- **Browser (Phase 1)**: funnel 48 / 35 / 9; seven bars, Football 16; 49 of 49 rows; P4 tab 10,
  D1 tab 36; Rule's row shows 835 / 31 linked to his 247 profile; all seven new source links
  render, and the Porter-era 247 link is gone. Compare reads 9 / 35 / 1 against Providence
  Day's 16 / 39 / 10; both qual tips carry the new text.

### Phase 2

- **The splice found 7 new units per locale, not 6** (sports 1033 kept / 5 added / 6 dropped;
  metric-values 902 / 2 / 1). The seventh is the bare figure `35`, the new
  `d1-commits-2426` value: `metric-values` extracts value cells, `'26'` survives as a unit
  through other schools' cells, and `'35'` did not exist before. It is stored as `35`,
  the way every locale stores the other value figures. The plan's "a seventh means something
  went wrong" did not anticipate a value cell; nothing else was unexpected.
- The `realityCheck`, `rankedRecruits` (Curry sentence) and `rosterNote` (level-label and
  Class of 2027 sentences) translations keep each locale's shipped wording for the
  unchanged clauses, cut by marker from the `HEAD` work file, so only the new clauses are
  new text. Rank abbreviations follow each locale's existing form (es `n.º`, fr `no`,
  it `n.`, te `నం.`, hi `नंबर`, bn `N নম্বর`, ar `رقم`, fa `رتبهٔ`), always with digits.
- Checks: `check:runtime` and `check:live` resolve in all 9; `check:sepdrift` 0 drifted ×9;
  `check_figures.py --topic sports` intact ×9; `check:digits` 63 units / 0 to review;
  `check:dates`, `check:moneytext`, `check:bidi`, `check:fa`, `check:hi`, `check:fr`,
  `check:chrome` clean; `i18n:leaks` 0 flags on the new paths ×9; `npx tsc -b` and
  `npm run build` exit 0.
- Browser (real Chrome, `es` and `fa`, every card open): all five sentences and the
  `(all divisions, 2024–26)` hint translated, no English left from the old or new text,
  `48`/`35`/`9`/`73%` intact, the fa headline renders RTL with names in Latin. Compare
  (`?topic=sports`) shows the translated qual on both the P4 and D1 tips in both locales.
