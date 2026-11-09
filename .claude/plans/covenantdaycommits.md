---
name: covenantdaycommits
title: Covenant Day College Pipeline — varsity-roster cross-reference (35 / 10 D1 / 1 P4), Gardner → App State, Rivens → Charlotte football, Compare D1 9 → 10
status: english-done
phases: 2
created: 2026-11-09
branch: feat/covenant-day-commits-2026
prs: []
---

# Covenant Day College Pipeline — verified 2024–26 refresh

## Goal

Update Covenant Day's College Pipeline card (Sports) and its Division I Compare row to match the
`/athlete-commits` graduate refresh of 2026-11-09. The refresh found:

- **Two athletes the card lacks:** Elijah Green ’24 (William Peace, D3) and Jakota Hase ’25
  (Wisconsin Lutheran, D3).
- **Two rows that need the college the athlete actually enrolled at:**
  - Grant Gardner ’25 signed with Davidson and enrolled at **Appalachian State**.
  - Chris Rivens ’25 signed with Guilford for basketball and enrolled at **UNC Charlotte**,
    where he plays football. That makes him Division I.
- **One false caveat to remove.** The Class of 2024 is *complete* as the school published it;
  it is not "partially recoverable".

The funnel goes from 33 / 9 / 1 to **35 / 10 D1 / 1 P4**, and Compare `d1-commits-2426` goes
from 9 to **10**.

## Context

### The source (read these first)

All four files are in `source-material/sports/covenant-day/`. `/athlete-commits` wrote them
and they are **uningested and uncommitted**.

- `Covenant Day School - Sports - College Commitments 2024-2026.md` (**rebuilt**). It holds
  the per-class tables with a *Confirmed by* column, the totals, the sport-bar tally and the
  Excluded list. It is the authority for every row below.
- `Covenant Day School - Sports - Varsity Roster Cross-Reference 2026.md` (**new**). It records
  the method, the 88 MaxPreps rosters, the school's "Lions Beyond CDS" alumni lists, the nulls
  and the unchecked sports. The existing `/roster cross-reference/i` rule in
  `src/lib/metrics.ts` (line ~281) folds it onto the research dossier, so **`metrics.ts` needs
  no change.**
- `Covenant Day School - Sports - Redesign Research 2026.md`. A superseded note now sits above
  "Counting rules used by the app".
- `Covenant Day - Sports - College Commitments Class of 2027.md`. The 2026-11-09 sweep record
  is appended. It is still **0 confirmed**, and provisional because it was taken before the
  2026-11-11 early signing period.

### Per-athlete verification

| Class | Athlete | Sport label | College | Conf. | Level | Confirmation |
|---|---|---|---|---|---|---|
| '24 | Elijah Green (new) | Basketball | William Peace | USA South | D3 | https://gopeacepacers.com/sports/mens-basketball/roster/elijah-green/4142 (Fr. 2024-25, Covenant Day School). RealGM lists HS grad 2024, William Peace. He was a senior on Covenant's 2023-24 MaxPreps basketball roster |
| '25 | Jakota Hase (new) | Football | Wisconsin Lutheran | NACC | D3 | https://wlcsports.com/sports/football/roster/2025 (Fr. WR, Charlotte / Covenant Day). Also on the school's football "Lions Beyond CDS" list |
| '25 | Grant Gardner (**changed**) | Baseball | Appalachian State (was Davidson) | Sun Belt (was Atlantic 10) | D1 | https://appstatesports.com/sports/baseball/roster/2026 (Fr., Covenant Day; a So. on the current roster). The school's baseball alumni list says "Appalachian State University". He signed with Davidson in November 2024 |
| '25 | Chris Rivens (**changed**) | Football (was Basketball) | UNC Charlotte (was Guilford) | American (was ODAC) | **D1** (was D3) | https://charlotte49ers.com/sports/football/roster/2025 (Fr. WR, Covenant Day). The school's football alumni list says "UNC Charlotte". He is not on Guilford's 2025-26 roster. He signed with Guilford for basketball in April 2025 |

All other D1 rows were re-confirmed on the college's own page: Eaton, Marcus, Huitt, Dirks,
Stanley, Neil, Welsh and Houseton. **Michael Marcus Jr. transferred** from App State to George
Mason for 2026-27 (https://gomason.com/news/2026/5/6/mens-basketball-george-mason-adds-forward-michael-marcus-jr-to-roster.aspx).

**Ruled out:**
- **Molly Carlson** (HighSchoolOT: Covenant Day → Virginia). Virginia lists her as from
  Charlottesville, Liberty University Online Academy.
- **Chloe Hylton** (HighSchoolOT: "B. Hylton" → NC State). She is not on NC State's 2025 or
  2026 roster.

Neither appears on the page.

**The 2024 correction.** The spring 2024 article says four athletes signed that spring "for a
total of 6"; the other two are Eaton and Marcus, from the fall 2023 D1 article. The class is
therefore complete, and the caveat in `funnelNote` and both Compare quals is wrong.

### The card today (`src/data/sportsPrograms/covenant-day.ts`, `pipeline`, lines ~190–285)

- **Roster:** 33 rows ('24 × 6, '25 × 15, '26 × 12), ordered '24 → '26, and within a class
  P4 → D1 → D2 → D3/NAIA/NJCAA.
- **Funnel:** 33 / 9 / 1, widths 1 / 0.27 / 0.03, with `toVerify: true` on row 0.
- **Sport bars:** seven (Soccer 9 … Field Hockey 1); Football is not among them.
- **`rosterNote`:** says "the **two** junior-college signees". There are **three** (Snapp,
  Boyd, Dorsey), a pre-existing slip that this plan fixes.
- **`rankedRecruits`:** names Marcus choosing App State. That is still true, so leave it alone.
- **`subhead`:** about Eaton, unchanged.
- **Conference strings:** Welsh and Houseton use `conf: 'AAC'`. The shared vocabulary is
  `'American'` (10 uses against 3 for `'AAC'`).

### Compare (`src/data/metricValues.ts`)

- `p4-commits-2426` (~line 2292): `'covenant-day': '1'`, **unchanged**. Rewrite the qual.
- `d1-commits-2426` (~line 2338): `'covenant-day': '9'` → **`'10'`**. Rewrite the qual.
- `seniors-committed` (~line 2394): `'0'`, **unchanged**. Update the comment only.
- The two Covenant quals are **different texts** (two units), and both say the Class of 2024
  is "only partially recoverable".

### Overlay units (checked in `src/data/overlays/work/*.es.json`)

- **`sports`.** The extracted Covenant pipeline units are:
  - the five prose fields, `rankedRecruits` and the funnel labels and hints, each prose unit
    holding a single path;
  - **roster `sport` only**: `Basketball` (unit 420), `Football` (36), `Soccer` (419),
    `Baseball` (45) and so on, all shared units.

  Roster `name`, `college`, `conf` and `level` are **not** extracted, and neither are
  `sportBars[]` labels or `sources[].label`. So `'NACC'`, `'USA South'`, `'William Peace'`,
  `'Wisconsin Lutheran'` and the `'AAC'` → `'American'` change cost no translation.
- **`metric-values`.**
  - The value `'10'` already exists as a unit (unit 777), so the new Covenant D1 path attaches
    to it. `'9'` (unit 42) keeps its other paths.
  - The two Covenant quals are units 764 (P4, path `[42].quals.covenant-day.text`) and 773
    (D1, `[43]…`).

**Phase 2 forecast per locale:**
- `sports`: **4 added / 4 dropped** (headline, funnelNote, realityCheck, rosterNote; the
  subhead is unchanged).
- `metric-values`: **2 added / 2 dropped** (the two quals).

Anything else means something went wrong; stop and look.

## Decisions

- **Window check (2026-11-09): no roll due.** The current seniors are the Class of 2027 and the
  latest graduated class is 2026, which is the window's end (`2426`).
- **Show the college enrolled at**, following the Providence Day Makemson precedent. Gardner
  and Rivens signed elsewhere but enrolled at App State and Charlotte straight out of Covenant
  Day. `rosterNote` gives one sentence each. The page uses no "corrected" language; the
  correction lives in the source file.
- **Rivens counts as Division I.** Charlotte's 2025 roster lists him, and nothing in the record
  says whether he walked on. Walk-ons count on this card, and "scholarship" is never claimed.
- **College label `'UNC Charlotte'`** for Rivens, matching the existing Houseton row.
  `'Appalachian State'` for Gardner matches Marcus.
- **`'AAC'` → `'American'` for Welsh and Houseton.** The field is not extracted, so this is
  free, and it brings the card onto the shared vocabulary.
- **`'NACC'` (Wisconsin Lutheran) is a new conf string.** It is not extracted and adds no unit.
- **The two quals stay two distinct texts.** The P4 qual is about Eaton; the D1 qual lists the
  names. This matches the current structure.
- **`toVerify: true` stays on funnel row 0.** Every school's funnel keeps it as the dev-only
  "documented minimum" marker (as `ddcommits` did). It never renders in production.
- **`subhead` and `rankedRecruits` are unchanged.**
- **Fix "two junior-college signees" to "three"** inside the `rosterNote` rewrite. That unit is
  being replaced anyway.
- **Plan name `covenantdaycommits`** was fixed by the `/athlete-commits` handoff.

## Approvals needed

**None.** The card and all three Compare rows already exist, and every change fills an
existing field. A new sport bar (Football) is a data row in the existing `sportBars[]` array,
not a new element.

## Source material

| File | State | Role |
|---|---|---|
| `Covenant Day School - Sports - College Commitments 2024-2026.md` | rebuilt | provenance for the card and both window rows |
| `Covenant Day School - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Covenant Day School - Sports - Redesign Research 2026.md` | superseded note added | points at the two files |
| `Covenant Day - Sports - College Commitments Class of 2027.md` | sweep record added | `seniors-committed` stays `'0'` |

`/implement` ingests them first (step 2).

## Out of scope

- **The Class of 2027.** Re-run `/athlete-commits` after the 2026-11-11 signing period; the
  school's fall signing post is not up yet.
- **The `honors` card.** Its Eaton/Marcus `path` lines are about the athletes' paths and are
  not touched here.
- **Rolling the window** (not due).
- **The CLAUDE.md coverage-floor paragraph.** Covenant's Compare cells were already filled, so
  no row changes from null to non-null. Confirm with `npm run coverage:floor`.
- Any component, any other school, and deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/covenant-day-commits-2026` from a freshly pulled `main`. Run
   `git status --short`. It must show only the four source-material paths above, this plan
   and `INDEX.md`. Anything else belongs to another session, so leave it alone.

2. **Ingest.** Run the `ingest-source-material` skill for `sports` / `covenant-day`, then:
   - Run `git diff --stat src/data/schools.json`. It should show only Covenant Day sports
     entries. If it shows a wholesale reorder, restore `HEAD` order (memory *two-topic ingest
     reorders the manifest*).
   - Run `npm run check:metrics`. The new Cross-Reference file must fold onto
     `redesign-research`. The known pre-existing Charlotte Christian "Podcast Episode 33"
     finding is not ours.
   - Run `npm run schema && npm run check:schema`. Commit `DATA-SCHEMA.md` only if it changed.

3. **Edit the pipeline card** in `src/data/sportsPrograms/covenant-day.ts`.

   a. `headline` →
   `'35 documented college commitments across the classes of 2024–26 — ten Division I, one to a Power 4 program.'`

   b. `funnel`: set the counts to `'35'`, `'10'`, `'1'` and the widths to `1`, `0.29`, `0.03`.
   Keep the labels, hints, shades and `toVerify: true` on row 0.

   c. `funnelNote` →
   `'Documented minimums from the school’s own signing posts, which name every signee in the classes of 2024–26, and from the Lions Beyond CDS lists of alumni playing in college that each team page publishes. Elijah Green ’24 is listed from William Peace’s roster. The school’s cumulative claim is 175+ collegiate athletes since 2006.'`

   d. `sportBars` →
   ```ts
   { sport: 'Soccer', count: 9, width: 1 },
   { sport: 'Baseball', count: 7, width: 0.78 },
   { sport: 'Basketball', count: 5, width: 0.56 },
   { sport: 'XC / Track', count: 4, width: 0.44 },
   { sport: 'Football', count: 3, width: 0.33 },
   { sport: 'Softball', count: 2, width: 0.22 },
   { sport: 'Volleyball', count: 2, width: 0.22 },
   { sport: 'Field Hockey', count: 1, width: 0.11, p4Width: 0.11 },
   ```
   This adds up to 33. Tennis 1 and Lacrosse 1 stay off the bars, as they do today.
   - Basketball: Marcus, Green, White, Smith, Thompson.
   - Football: Dennison, Hase, Rivens.
   - XC / Track: C. Welsh, R. Johnson, Dirks, E. Welsh.

   e. `realityCheck` →
   `'The pipeline is broad rather than tall: commitments span eleven sports, but the ceiling outside field hockey is Division I mid-major — Louisiana Tech, East Carolina, UNC Charlotte in softball and football, Appalachian State in basketball and baseball, Queens, Gardner-Webb and Wofford. That also explains the absence of NIL activity and top-100 recruiting rankings, which track Power 4 football and basketball pipelines.'`
   The eleven sports are the roster's sport labels: Field Hockey, Basketball, Track & Field,
   XC / Track, Soccer, Tennis, Baseball, Lacrosse, Football, Volleyball and Softball.

   f. `roster`: edit in place. The '26 block is unchanged except one conf string.
   - **'24:** insert after Colden Welsh, before Will Goodling:
     `{ cls: "'24", name: 'Elijah Green', sport: 'Basketball', college: 'William Peace', conf: 'USA South', level: 'D3' },`
   - **'25:**
     - Gardner → `{ cls: "'25", name: 'Grant Gardner', sport: 'Baseball', college: 'Appalachian State', conf: 'Sun Belt', level: 'D1' },`
     - Delete the Rivens row from the D3 block and insert after Shea Stanley:
       `{ cls: "'25", name: 'Chris Rivens', sport: 'Football', college: 'UNC Charlotte', conf: 'American', level: 'D1' },`
     - Insert after Tyler Dennison:
       `{ cls: "'25", name: 'Jakota Hase', sport: 'Football', college: 'Wisconsin Lutheran', conf: 'NACC', level: 'D3' },`
   - **'26:** change Ethan Welsh's and Avery Houseton's `conf: 'AAC'` to `conf: 'American'`.

   That gives 35 rows ('24 × 7, '25 × 16, '26 × 12).

   g. `rosterNote` →
   `'Compiled from the school’s own Lions News signing articles (September 2024 through April 2026) and its Lions Beyond CDS alumni lists. Each row shows the college the athlete went to out of Covenant Day: Grant Gardner signed with Davidson and enrolled at Appalachian State, and Chris Rivens signed with Guilford for basketball and joined UNC Charlotte’s football roster. Levels and conferences were verified per college by the researcher; the three junior-college signees are listed at the D3 tier for want of an NJCAA level in this table’s scale. Since enrolling, Emily Eaton has transferred from Louisville to Virginia — also ACC — and Michael Marcus Jr from Appalachian State to George Mason.'`

   h. `sources[]`: append
   ```ts
   { label: 'covenantday.org — Football: Lions Beyond CDS', url: 'https://www.covenantday.org/athletics/teams/fall-sports/varsityfootball' },
   { label: 'covenantday.org — Baseball: Lions Beyond CDS', url: 'https://www.covenantday.org/athletics/teams/spring-sports/varsitybaseball' },
   { label: 'covenantday.org — 4 spring 2024 signees, 6 in the class', url: 'https://www.covenantday.org/athletics/lionsnews/lions-news-details/~board/news/post/6-cds-student-athletes-sign-national-letters-of-intent-1724265198114' },
   { label: 'William Peace — Elijah Green, men’s basketball', url: 'https://gopeacepacers.com/sports/mens-basketball/roster/elijah-green/4142' },
   { label: 'Wisconsin Lutheran — 2025 football roster (Jakota Hase)', url: 'https://wlcsports.com/sports/football/roster/2025' },
   { label: 'Appalachian State — 2026 baseball roster (Grant Gardner)', url: 'https://appstatesports.com/sports/baseball/roster/2026' },
   { label: 'Charlotte — 2025 football roster (Chris Rivens)', url: 'https://charlotte49ers.com/sports/football/roster/2025' },
   { label: 'George Mason — adds Michael Marcus Jr. (May 2026)', url: 'https://gomason.com/news/2026/5/6/mens-basketball-george-mason-adds-forward-michael-marcus-jr-to-roster.aspx' },
   ```

   The rewritten prose fields say what the school publishes, never what was searched.

4. **Compare rows** in `src/data/metricValues.ts`:
   - **`p4-commits-2426`.** The value stays `'1'`. Set
     `quals['covenant-day'].text` →
     `'A documented minimum: Emily Eaton (’24) signed with Louisville field hockey, an ACC program, and started every game as a freshman. She is the one Power Four commitment among the 35 that the school’s signing posts and alumni lists document for 2024–2026.'`
   - **`d1-commits-2426`.** Change the value line to
     `'covenant-day': '10', // ’24: Eaton, Marcus (2) · ’25: Huitt, Dirks, Gardner (App State), Stanley, Rivens (Charlotte football) (5) · ’26: Neil, Welsh, Houseton (3)`
     and set `quals['covenant-day'].text` →
     `'A documented minimum from the school’s own signing posts and alumni lists: Eaton and Marcus (’24); Huitt, Dirks, Gardner, Stanley and Rivens (’25), Gardner at Appalachian State and Rivens in football at UNC Charlotte; Neil, Welsh and Houseton (’26).'`
   - Keep `kind: 'minimum'` on both quals.
   - **`seniors-committed`.** The value stays `'0'`. Set the comment to
     `// none found (re-checked 2026-11-09 against all 2026-27 rosters); fall Lions News signing post not yet published — re-run after 2026-11-11`.
   - Run `npm run coverage:floor` and confirm Covenant Day's Compare fill is unchanged and the
     floor is still 31/45. If either moved, stop and report.

5. **Checks and browser:** see Verification. Then:
   - Commit with explicit paths:
     - the four source-material files;
     - `src/data/sportsPrograms/covenant-day.ts`, `src/data/metricValues.ts`,
       `src/data/schools.json`, `.claude/docs/sports/covenant-day.md`;
     - any other derived file the ingest regenerated (inspect it first);
     - `DATA-SCHEMA.md`, only if it changed;
     - this plan and `INDEX.md`.
   - Push, then check that `git rev-parse HEAD` matches `git ls-remote origin <branch>`.
   - Flip this plan and the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

**Scope:** the nine `PROSE_TRANSLATED` locales on **two** overlay topics, `sports` and
`metric-values`. Read the list from `src/lib/i18n.ts`; today it is `es bn ht te fr fa it hi ar`.
No chrome catalogs change.

The mechanism is in `.claude/docs/prose-translation-architecture.md`. Follow the recipe of the
`ddcommits` and `catholiccommits` Phase 2.

1. **Splice.** Run `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` and then
   `--topic metric-values`, with a dry run on `es` first.
   - Confirm the forecast in *Context*: `sports` 4 added / 4 dropped, `metric-values` 2 added
     / 2 dropped.
   - Roster indexes shift (by 1 from '24 and by 2 from Hase), so **splice by stamp, never by
     path**.
   - The new and moved roster `sport` paths must land on the existing `Basketball` and
     `Football` units.
   - The Covenant D1 value path must land on the existing `'10'` unit.

2. **Translate by hand, per locale.** Start from each locale's shipped rendering of the old
   field, which shows that locale's terms for Division I, Power 4, mid-major, NJCAA and
   Lions Beyond CDS.
   - Copy these figures char-for-char: `35`, `2024–26`, `2024–2026`, `175+`, `2006`, and the
     class marks `’24` / `’25` / `’26`.
   - Keep college, conference and program names in Latin script as each locale already does:
     `ACC`, `NJCAA`, `Lions Beyond CDS`, `UNC Charlotte`, `Appalachian State`,
     `George Mason`.
   - Spelled-out numbers ("ten", "eleven", "three") follow each locale's practice in the old
     headline, realityCheck and rosterNote.
   - `fa` / `ar`: no isolates in the work file.

3. **Build.** Run `npm run i18n:build -- --topic sports --lang <code>` and
   `--topic metric-values --lang <code>` for all nine locales.

4. **Ship.**
   - Run the Phase 2 checks and commit with explicit paths.
   - Push and verify the SHA.
   - Open the PR with `--body-file`, run `gh pr merge --squash --delete-branch`, then
     `git checkout main && git pull`.
   - Flip the plan and INDEX row to *Implemented* with the PR link, in the PR or a follow-up
     PR, never on `main`.
   - **Do not deploy.** Say "merged — ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/covenant-day/*.md` (4) | research from `/athlete-commits` |
| `src/data/schools.json`, `.claude/docs/sports/covenant-day.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/covenant-day.ts` | headline, funnel, funnelNote, sportBars (+Football), realityCheck, roster (33 → 35, Gardner/Rivens changed, AAC → American), rosterNote, 8 sources |
| `src/data/metricValues.ts` | D1 9 → 10 plus comment, both Covenant quals, seniors comment |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals` and
      `npm run check:chrome` are all clean, apart from the known pre-existing metrics finding.
- [ ] `npm run coverage:floor` shows the floor unchanged.
- [ ] `npm run check:live` fails only on the old Covenant stamps (4 sports units, 2 metric
      quals), which is the expected English-shipped state. The rest of the `npm run build`
      chain, with only `check:live` removed, exits 0.
- [ ] Browser check (`npm run build && npx vite preview`, real Chrome) on
      `/school/covenant-day?topic=sports`, with The College Pipeline card open:
      - the funnel reads 35 / 10 / 1;
      - eight bars sum to 33, with Football 3 fifth;
      - there are 35 roster rows;
      - Gardner reads Appalachian State · Sun Belt · D1;
      - Rivens reads Football · UNC Charlotte · American · D1;
      - the Green and Hase rows render, and Welsh/Houseton read `American`;
      - the filter tabs show D1 10 and P4 1;
      - the new funnelNote, realityCheck and rosterNote render, and the eight new source
        links open.

      The headline is the card **teaser** and is hidden while the card is open, so check it
      with the card closed.
- [ ] Browser check on `/compare?topic=sports&schools=covenant-day,providence-day`: Covenant
      Day reads **1** Power 4 and **10** Division I, and hovering each cell shows the new qual
      tip.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` returns 0 for all nine locales, and
      `python3 scripts/check_figures.py --lang <code> --topic sports` is clean for all nine.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi` and
      `check:fr` are clean.
- [ ] `node scripts/check_work_integrity.mjs` has run. It reports index-shift false alarms
      after a splice, so verify any flagged unit by stamp against HEAD.
- [ ] `npm run i18n:leaks -- --lang <code>` returns 0 on the Covenant pipeline paths for all
      nine locales.
- [ ] `npm run build` exits 0.
- [ ] Browser check on `/school/covenant-day?lang=es&topic=sports` and `?lang=fa`, card open:
      - the prose fields are translated;
      - `2024–26` is intact and the `fa` range is not reversed (probe a card-unique figure);
      - bare roster sport names stay identifiers in eight locales by convention (only `ar`
        translates them).

      Check the teaser headline with the card closed. On `/compare?lang=es`, Covenant shows
      1 / 10 and the translated quals.

## Risks

| Risk | Mitigation |
|---|---|
| A roster sport path lands on no unit after the index shift and renders English | Splice by stamp, then run `check:live` and `i18n:leaks` on `covenant-day:pipeline.roster[*].sport` |
| Another session's files get swept into the commit | Stage explicit paths and run `git status --short` before each commit |
| The `'10'` value unit is not found and a new unit appears | It exists (es unit 777); if the splice reports a new `'10'` unit, stop and look |

## Open questions

- **Prose wording** settles at the Phase 1 review. **Default:** as written in step 3.
- **Rivens on the card.** He is not on Charlotte's *current* (2026) football roster, only the
  2025 one. **Default:** list him at Charlotte, because the card shows the college the athlete
  went to out of the school, as the `ddcommits` Levon Jacobs row did.

## Implementation notes

_(filled in by `/implement`)_
