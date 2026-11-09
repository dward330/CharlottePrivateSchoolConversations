---
name: carmelchristiancommits
title: Carmel Christian College Pipeline — varsity-roster cross-reference (20 / 6 D1 / 1 P4), Buzzard removed, Compare P4 0 → 1, D1 5 → 6
status: english-done
phases: 2
created: 2026-11-09
branch: feat/carmel-christian-commits-2026
prs: []
---

# Carmel Christian College Pipeline — verified 2024–26 refresh

## Goal

Rebuild Carmel Christian's College Pipeline card (Sports) and its two window Compare rows from
the `/athlete-commits` graduate refresh of 2026-11-09. The card used 11 names from the school's
"Next Steps" signee list as "a representative sample". The refresh reads the whole list against
MaxPreps, the HighSchoolOT trackers, RealGM and each college's own roster.

The refresh finds:

- **Nine athletes the card lacks.** One of them is Carmel's **first Power 4 in the window:
  Gabe Avram '24, tennis → South Carolina (SEC)**. Another is a D1: Mark Agafonov '25, tennis →
  Queens (ASUN).
- **One D1 row to remove.** Jordan Buzzard (Coastal Carolina, '26) finished high school at East
  Mecklenburg.
- **Three corrections:**
  - Jazmyne Slay is Class of '24, not '25.
  - UNCG's conference is the Southern Conference, not the Big South.
  - Johnson & Wales (Charlotte) plays in the C2C, not the GNAC.

The funnel goes from 12+ / 5 / 0 to **20 / 6 D1 / 1 P4**. On Compare, `p4-commits-2426` goes
from 0 to **1** and `d1-commits-2426` from 5 to **6**.

## Context

### The source (read these first)

All four files are in `source-material/sports/carmel-christian/`. `/athlete-commits` wrote them
and they are **uningested and uncommitted**.

- `Carmel Christian - Sports - College Commitments 2024-2026.md` (**new**). It holds the
  per-class tables with a *Confirmed by* column, the totals, the tally by sport and level, and
  the Excluded list. It is the authority for every row below.
- `Carmel Christian - Sports - Varsity Roster Cross-Reference 2026.md` (**new**). It records
  the method, the 56 MaxPreps roster pages, the nulls and the unchecked sports.
- `Carmel Christian - Sports - Redesign Research 2026.md`. A superseded note now sits above
  "Card 3 — College Pipeline".
- `Carmel Christian - Sports - College Commitments Class of 2027.md`. The 2026-11-09 sweep is
  appended. It is still **0**, and provisional because it was taken before the 2026-11-11 early
  signing period.

`src/lib/metrics.ts` already has `/roster cross-reference/i` → `redesign-research` (~line 281)
and `/d1|matriculation|college commitments/i` → `matriculation` (~line 287), so **`metrics.ts`
needs no change.**

### Per-athlete changes (full evidence in the commitments file)

| Class | Athlete | Change | Key confirmation |
|---|---|---|---|
| '24 | Gabe Avram | **new, P4** — Tennis · South Carolina · SEC | Next Steps 2023-24; HighSchoolOT tennis tracker (D1, '24); https://gamecocksonline.com/sports/mten/roster/ (Junior, Carmel Christian) |
| '24 | Owen Akers | new — Tennis · Johns Hopkins · Centennial · D3 | JHU 2024-25 roster (Carmel Christian School) |
| '24 | Cole Bryant | new — Golf · Randolph-Macon · ODAC · D3 | R-MC 2024-25 roster |
| '24 | Jazmyne Slay | **class '25 → '24** | Next Steps lists her under 2023-24; MaxPreps Sr. 2023-24 |
| '25 | Mark Agafonov | **new, D1** — Tennis · Queens · ASUN | Next Steps; MaxPreps Sr. 24-25; Queens roster (spelled "Agafanov"; the school's spelling is kept) |
| '25 | Braylen Bowman | **conf Big South → Southern** | UNCG is SoCon |
| '25 | David Rodriguez | new — Baseball · Bluefield State · CIAA · D2 | Bluefield State 2026 roster |
| '25 | Sienna Jauch | new — Golf · North Greenville · Conference Carolinas · D2 | Next Steps; MaxPreps girls golf |
| '25 | Noah Daniels | new — Tennis · Anderson (SC) · SAC · D2 | Next Steps; HighSchoolOT tennis tracker |
| '25 | Christopher Grace | new — Tennis · Anderson (SC) · SAC · D2 | Next Steps; MaxPreps Sr. 24-25 |
| '25 | Ben Price | new — Tennis · Hampden-Sydney · ODAC · D3 | H-SC roster |
| '25 | Miles Leaks | **conf GNAC → C2C** | the Charlotte campus plays in the Coast-to-Coast Athletic Conference |
| '26 | James Wood | new — Basketball · WVU Tech · NAIA · NAIA | https://www.carmelchristian.org/apps/news/show_news.jsp?REC_ID=1030111&id=0; WVU Tech roster (FR, Carmel Christian High School) |
| '26 | **Jordan Buzzard** | **removed** | Coastal's roster: Last School East Mecklenburg, "four-year letterman"; MaxPreps East Meck Sr. 25-26; absent from Carmel's 25-26 roster |

Not counted: **Audrey Bucey** (Next Steps: "University of South Carolina — Dance"). Dance is a
spirit program, and counting it would have made it a Power 4 row. It is recorded in the
commitments file and mentioned once in `realityCheck`.

Ruled-out RealGM leads (Freeman, Howard, Green, Marcus, Mustaf, Peck) and HighSchoolOT's
"Boyd → FIU" are recorded in the source files. **None of them appears on the page.**

### The card today (`src/data/sportsPrograms/carmel-christian.ts`, `pipeline`, lines ~195–255)

- **Funnel:** `'12+'` / `'5'` / `'0'`, widths 1 / 0.42 / 0.04. The row 1 hint is
  `'(all basketball)'`, a Carmel-only unit.
- **`sportBars`:** `[{ sport: 'Basketball', count: 5, width: 1 }]`.
- **Roster:** 11 rows, ordered by level first (D1 '26 → '24, then D2, then D3). The
  `/athlete-commits` convention is **class first, newest first, then P4 → D1 → D2 → D3 → NAIA**
  within a class, which is what the new roster uses.
- **`rankedRecruits`:** Tyson, Mustaf and Peck. It is correct, so leave it alone.
- **`sources[]`** (~lines 241–252):
  - `NEXT_STEPS`, which stays;
  - the signing-day post, whose label reads `(Buzzard, Johnson)`;
  - `goccusports.com — Jordan Buzzard signs with Coastal Carolina`, which is to be removed.

Buzzard appears nowhere else in the file. The Coastal hits on lines 149 and 162 are Coastal
*Christian*, a soccer opponent; leave them alone.

The `CommitLevel` type (`src/data/sportsProgram.ts:182`) is `'P4' | 'D1' | 'D2' | 'D3' | 'NAIA'`,
so `'NAIA'` is valid. The college strings `'Queens (Charlotte)'` and `'Anderson (SC)'` and the
conf strings `'Southern'`, `'C2C'`, `'Conference Carolinas'`, `'SAC'`, `'CIAA'`, `'Centennial'`,
`'ODAC'`, `'Peach Belt'`, `'NAIA'` and `'SEC'` all already exist in other sportsPrograms files.

### Compare (`src/data/metricValues.ts`)

- `p4-commits-2426` (~line 2302): `'carmel-christian': '0'` → **`'1'`**.
- `d1-commits-2426` (~line 2348): `'5'` → **`'6'`**.
- `seniors-committed` (~line 2407): `'0'`, **unchanged**. Update the comment only.
- Carmel has **no `quals` entry** on either window row, so there is no qual text to rewrite.
  Do not add one; adding a qual would create a new unit for nine locales.

### Overlay units (checked in `src/data/overlays/work/sports.es.json` and `metric-values.es.json`)

**`sports`.** The extracted Carmel pipeline units are:
- the five prose fields, `rankedRecruits`, and the funnel labels and hints;
- roster `sport` only.

Roster `name`, `college`, `conf` and `level` are **not** extracted, and neither are the
`sportBars[]` labels or `sources[].label`.

Every roster sport label used here is an existing shared unit: `Basketball` (es unit 420),
`Baseball` (45), `Volleyball` (44), `Golf` (41) and `Tennis` (194, six schools).

**`metric-values`.** Both new values are existing units:
- `'1'`: the Carmel path `[42].values.carmel-christian` moves there from the `'0'` unit.
- `'6'`: `[43].values.carmel-christian` moves there from the `'5'` unit.

**Phase 2 forecast per locale:**
- `sports`: **6 added / 6 dropped**. The six are headline, subhead, funnelNote, realityCheck,
  rosterNote, and `funnel[1].hint` (`'(all basketball)'` → `'(basketball and tennis)'`, whose
  old unit has only the Carmel path).
- `metric-values`: **0 added / 0 dropped**, with two path moves.

Anything else means something went wrong; stop and look.

## Decisions

- **Window check (2026-11-09): no roll due.** The current seniors are the Class of 2027 and the
  latest graduated class is 2026, which is the window's end (`2426`).
- **Next Steps is the school's own announcement, so it confirms a row** on its own. The
  graduate test is satisfied by MaxPreps senior-season rosters or the college's "High School"
  line. Three rows rest on the school's list without a college roster: Slay (not on WSSU's
  2024/2025 rosters), Jauch and Grace (their college sites were unreachable). They are kept,
  as Next Steps is the school speaking.
- **Buzzard is removed, not footnoted.** He signed at Carmel's November 2025 ceremony but
  finished at East Mecklenburg; the card counts graduates. No sentence about him goes on the
  page. The removal is recorded in the source file.
- **Dance is not counted**, and the funnel says 20 with no "+". Every Next Steps name in
  2023-24 and 2024-25 is accounted for. The Class of 2026 is the school's published list so
  far, which `rosterNote` says.
- **Landon Boyd stays at USC Aiken.** The school and Perfect Game agree. He is not on USC Aiken's
  2025 or 2026 roster, but the card shows the college committed to out of the school.
- **Mark Agafonov keeps the school's spelling.** Queens prints "Agafanov"; the school's own
  spelling is used, per the skill's name-form rule.
- **Sport label `'Tennis'`, not `'Boys Tennis'`.** It is an existing unit used by six schools,
  and the card's other labels are ungendered (`'Basketball'`).
- **`toVerify`:** Carmel's funnel has none today. Do not add one.
- **`rankedRecruits` is unchanged.**
- **Plan name `carmelchristiancommits`** was fixed by the `/athlete-commits` handoff.

## Approvals needed

**None.** The card and all three Compare rows already exist, and every change fills an existing
field. The Tennis sport bar is a data row in the existing `sportBars[]` array.

## Source material

| File | State | Role |
|---|---|---|
| `Carmel Christian - Sports - College Commitments 2024-2026.md` | new | provenance for the card and both window rows |
| `Carmel Christian - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Carmel Christian - Sports - Redesign Research 2026.md` | superseded note added | points at the two files |
| `Carmel Christian - Sports - College Commitments Class of 2027.md` | sweep record added | `seniors-committed` stays `'0'` |

`/implement` ingests them first (step 2).

## Out of scope

- **The Class of 2027.** Re-run `/athlete-commits` after the 2026-11-11 signing period.
- **The `honors` card and `rankedRecruits`.**
- **Rolling the window** (not due).
- **The CLAUDE.md coverage-floor paragraph.** Carmel's Compare cells were already non-null, so
  confirm with `npm run coverage:floor` that nothing moved.
- Any component, any other school, and deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/carmel-christian-commits-2026` from a freshly pulled `main`. Run
   `git status --short`. It must show only the four source-material paths above, this plan and
   `INDEX.md`. Anything else belongs to another session, so leave it alone.

2. **Ingest.** Run the `ingest-source-material` skill for `sports` / `carmel-christian`, then:
   - Run `git diff --stat src/data/schools.json`. It should show only Carmel sports entries.
     If it shows a wholesale reorder, restore `HEAD` order.
   - Other schools' notes whose only change is the rebuild date get reverted.
   - Run `npm run check:metrics`. Both new files must fold: the Cross-Reference file onto
     `redesign-research` and the commitments file onto `matriculation`. A pre-existing
     finding in another school is not ours.
   - Run `npm run schema && npm run check:schema`. Commit `DATA-SCHEMA.md` only if it changed.

3. **Edit the pipeline card** in `src/data/sportsPrograms/carmel-christian.ts`.

   a. `headline` →
   `'20 documented college commitments across the classes of 2024–26 — six Division I and one Power 4, a South Carolina tennis signee.'`

   b. `subhead` →
   `'Built from the school’s own "Next Steps" list of college signees and its signing-day posts; division and conference labels were added by the researcher from each college’s NCAA or NAIA status.'`

   c. `funnel`:
   - row 0: count `'20'`, hint unchanged (`'(all divisions, 2024–26)'`), width 1;
   - row 1: count `'6'`, hint `'(basketball and tennis)'`, width `0.3`;
   - row 2: count `'1'`, width `0.05`.

   Keep the labels and shades.

   d. `funnelNote` →
   `'Four of the six Division I commits are basketball players who signed with mid-major programs in the Big South, Sun Belt and Southern conferences; the other two are tennis players, one of them Carmel’s Power 4 signee, Gabe Avram (’24), at South Carolina in the SEC. Kam Taylor reached the ACC (Florida State) only later, through the transfer portal, not as a Carmel commit.'`

   e. `sportBars` →
   ```ts
   { sport: 'Basketball', count: 4, width: 1 },
   { sport: 'Tennis', count: 2, width: 0.5, p4Width: 0.25 },
   ```
   Before typing `p4Width`, check its meaning in `src/data/sportsProgram.ts` and its use in
   `covenant-day.ts` (Field Hockey). If it marks the P4 share of the bar, `0.25` (one of the two
   tennis D1 bars) is right. If the field is not what that suggests, omit it.

   f. `realityCheck` →
   `'Most Carmel signees land in NCAA Division II and III: baseball to Lander, USC Aiken, Bluefield State and Ferrum; basketball to Fayetteville State and Johnson & Wales, and to WVU Tech in the NAIA; golf to North Greenville and Randolph-Macon; volleyball to Winston-Salem State. Tennis is the program’s second pipeline — six signees in the classes of 2024 and 2025, from the SEC to Johns Hopkins. The school’s list also includes a dance-team signee, who is not counted here as an athletic commitment.'`

   g. `roster` → replace the 11 rows with these 20:
   ```ts
   { cls: "'26", name: 'Logan Johnson', sport: 'Basketball', college: 'UNC Asheville', conf: 'Big South', level: 'D1' },
   { cls: "'26", name: 'Caden Tarr', sport: 'Baseball', college: 'Lander', conf: 'Peach Belt', level: 'D2' },
   { cls: "'26", name: 'James Wood', sport: 'Basketball', college: 'WVU Tech', conf: 'NAIA', level: 'NAIA' },
   { cls: "'25", name: 'Bryce Slay', sport: 'Basketball', college: 'Marshall', conf: 'Sun Belt', level: 'D1' },
   { cls: "'25", name: 'Braylen Bowman', sport: 'Basketball', college: 'UNC Greensboro', conf: 'Southern', level: 'D1' },
   { cls: "'25", name: 'Mark Agafonov', sport: 'Tennis', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
   { cls: "'25", name: 'Landon Boyd', sport: 'Baseball', college: 'USC Aiken', conf: 'Peach Belt', level: 'D2' },
   { cls: "'25", name: 'Chandler Kennedy', sport: 'Basketball', college: 'Fayetteville State', conf: 'CIAA', level: 'D2' },
   { cls: "'25", name: 'David Rodriguez', sport: 'Baseball', college: 'Bluefield State', conf: 'CIAA', level: 'D2' },
   { cls: "'25", name: 'Sienna Jauch', sport: 'Golf', college: 'North Greenville', conf: 'Conference Carolinas', level: 'D2' },
   { cls: "'25", name: 'Noah Daniels', sport: 'Tennis', college: 'Anderson (SC)', conf: 'SAC', level: 'D2' },
   { cls: "'25", name: 'Christopher Grace', sport: 'Tennis', college: 'Anderson (SC)', conf: 'SAC', level: 'D2' },
   { cls: "'25", name: 'Anderson Rider', sport: 'Baseball', college: 'Ferrum', conf: 'ODAC', level: 'D3' },
   { cls: "'25", name: 'Miles Leaks', sport: 'Basketball', college: 'Johnson & Wales', conf: 'C2C', level: 'D3' },
   { cls: "'25", name: 'Ben Price', sport: 'Tennis', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
   { cls: "'24", name: 'Gabe Avram', sport: 'Tennis', college: 'South Carolina', conf: 'SEC', level: 'P4' },
   { cls: "'24", name: 'Kam Taylor', sport: 'Basketball', college: 'UNC Asheville', conf: 'Big South', level: 'D1' },
   { cls: "'24", name: 'Jazmyne Slay', sport: 'Volleyball', college: 'Winston-Salem State', conf: 'CIAA', level: 'D2' },
   { cls: "'24", name: 'Owen Akers', sport: 'Tennis', college: 'Johns Hopkins', conf: 'Centennial', level: 'D3' },
   { cls: "'24", name: 'Cole Bryant', sport: 'Golf', college: 'Randolph-Macon', conf: 'ODAC', level: 'D3' },
   ```
   Check the counts: 3 + 12 + 5 = 20; D1-or-above = 6; P4 = 1.

   h. `rosterNote` →
   `'Every row is from the school’s own "Next Steps" signee list or its signing-day and news posts; level labels (P4 / D1 / D2 / D3 / NAIA) and conferences were added by the researcher from each college’s status. P4 = SEC · Big Ten · ACC · Big 12. The Class of 2026 rows are the signees the school has announced so far; its list for that class is not yet published.'`

   i. `sources[]`:
   - Relabel the signing-day entry to `'carmelchristianathletics.org — National Signing Day (Johnson, Tarr)'`.
   - **Delete** the `goccusports.com — Jordan Buzzard…` entry.
   - Append:
   ```ts
   { label: 'carmelchristian.org — James Wood commits to WVU Tech', url: 'https://www.carmelchristian.org/apps/news/show_news.jsp?REC_ID=1030111&id=0' },
   { label: 'South Carolina — men’s tennis roster (Gabe Avram)', url: 'https://gamecocksonline.com/sports/mten/roster/' },
   { label: 'HighSchoolOT — NC boys tennis recruiting tracker', url: 'https://www.highschoolot.com/story/north-carolina-high-school-boys-tennis-recruiting-tracker/21296827/' },
   ```

   The rewritten prose fields say what the school publishes, never what was searched.

4. **Compare rows** in `src/data/metricValues.ts`:
   - **`p4-commits-2426`.** Set
     `'carmel-christian': '1', // ’24 Avram (South Carolina tennis, SEC) — see the Carmel College Commitments 2024-2026 source file`
   - **`d1-commits-2426`.** Set
     `'carmel-christian': '6', // ’24: K.Taylor (UNCA), Avram (South Carolina tennis) · ’25: B.Slay (Marshall), Bowman (UNCG), Agafonov (Queens tennis) · ’26: Johnson (UNCA). Buzzard removed: graduated from East Mecklenburg`
   - **`seniors-committed`.** The value stays `'0'`. Set the comment to
     `// none found (re-checked 2026-11-09 against all 2026-27 rosters); no fall signing post yet — re-run after 2026-11-11`.
   - Add no quals.
   - Run `npm run coverage:floor` and confirm Carmel's Compare fill is unchanged and the floor is
     still 31/45. If either moved, stop and report.

5. **Checks and browser:** see Verification. Then:
   - Commit with explicit paths:
     - the four source-material files;
     - `src/data/sportsPrograms/carmel-christian.ts`, `src/data/metricValues.ts`,
       `src/data/schools.json`, `.claude/docs/sports/carmel-christian.md`;
     - any other derived file the ingest regenerated for Carmel (inspect it first);
     - `DATA-SCHEMA.md`, only if it changed;
     - this plan and `INDEX.md`.
   - Push, then check that `git rev-parse HEAD` matches `git ls-remote origin <branch>`.
   - Flip this plan and the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs
until they confirm the English version is what they want.

### Phase 2 — Every other locale

**Scope:** the nine `PROSE_TRANSLATED` locales on the `sports` and `metric-values` overlay
topics. Read the list from `src/lib/i18n.ts`; today it is `es bn ht te fr fa it hi ar`. No
chrome catalogs change.

The mechanism is in `.claude/docs/prose-translation-architecture.md`. Follow the
`covenantdaycommits` / `ddcommits` Phase 2 recipe.

1. **Splice.** Run `node scripts/i18n_splice_work.mjs --lang <code> --topic sports`, then
   `--topic metric-values`, with a dry run on `es` first.
   - Confirm the forecast in *Context*: `sports` 6 added / 6 dropped; `metric-values` 0 / 0 with
     two path moves.
   - Roster indexes change completely (11 → 20 rows, reordered), so **splice by stamp, never by
     path**.
   - Every roster `sport` path must land on an existing unit: `Basketball`, `Baseball`,
     `Volleyball`, `Golf` or `Tennis`.

2. **Translate by hand, per locale**: the six new `sports` units.
   - Start from each locale's shipped rendering of the old fields, which shows its terms for
     Division I, Power 4, mid-major, NAIA, transfer portal and "Next Steps".
   - Copy these figures char-for-char: `20`, `2024–26`, `’24`, `2024`, `2025`, and
     `P4 / D1 / D2 / D3 / NAIA`.
   - Keep college, conference and program names in Latin script as each locale already does:
     `SEC`, `ACC`, `Big South`, `Sun Belt`, `South Carolina`, `Johns Hopkins`, `WVU Tech`,
     `Florida State`, `Next Steps`.
   - Spelled-out numbers ("six", "four", "two") follow each locale's practice in the old
     headline and funnelNote.
   - `fa` / `ar`: no isolates in the work file.

3. **Build.** Run `npm run i18n:build -- --topic sports --lang <code>` (and `metric-values`)
   for all nine locales.

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
| `source-material/sports/carmel-christian/*.md` (4) | research from `/athlete-commits` |
| `src/data/schools.json`, `.claude/docs/sports/carmel-christian.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/carmel-christian.ts` | five prose fields, funnel (counts, widths, row-1 hint), sportBars (+Tennis), roster 11 → 20, sources (−1, +3, 1 relabel) |
| `src/data/metricValues.ts` | P4 0 → 1, D1 5 → 6, three comments |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals` and
      `npm run check:chrome` are clean, apart from any pre-existing finding in another school.
- [ ] `npm run coverage:floor` shows the floor unchanged.
- [ ] `npm run check:live` fails only on the six old Carmel `sports` stamps, which is the
      expected English-shipped state. The rest of the `npm run build` chain, with only
      `check:live` removed, exits 0.
- [ ] Browser check (`npm run build && npx vite preview`, real Chrome) on
      `/school/carmel-christian?topic=sports`, with The College Pipeline card open:
      - the funnel reads 20 / 6 / 1 with the hint "(basketball and tennis)";
      - there are two sport bars, Basketball 4 and Tennis 2;
      - there are 20 roster rows in the order above, with Avram showing P4 and Wood showing
        NAIA;
      - Bowman reads Southern and Leaks reads C2C;
      - Buzzard is absent;
      - the filter tabs show D1 6 and P4 1;
      - the new funnelNote, realityCheck and rosterNote render, and the three new source links
        open.

      The headline is the card **teaser** and is hidden while the card is open, so check it
      with the card closed.
- [ ] Browser check on `/compare?topic=sports&schools=carmel-christian,cannon`: Carmel reads
      **1** Power 4 and **6** Division I.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` returns 0 for all nine locales, and
      `python3 scripts/check_figures.py --lang <code> --topic sports` is clean for all nine.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi` and
      `check:fr` are clean.
- [ ] `node scripts/check_work_integrity.mjs` has run. It reports index-shift false alarms
      after a splice, so verify any flagged unit by stamp against HEAD.
- [ ] `npm run i18n:leaks -- --lang <code>` returns 0 on the Carmel pipeline paths for all
      nine locales.
- [ ] `npm run build` exits 0.
- [ ] Browser check on `/school/carmel-christian?lang=es&topic=sports` and `?lang=fa`, card
      open:
      - the prose and the row-1 hint are translated;
      - `2024–26` is intact and the `fa` range is not reversed (probe a card-unique figure);
      - the teaser headline is translated (check with the card closed).

      On `/compare?lang=es`, Carmel shows 1 / 6.

## Risks

| Risk | Mitigation |
|---|---|
| A roster sport path lands on no unit after the 20-row reorder and renders English | Splice by stamp, then run `check:live` and `i18n:leaks` on `carmel-christian:pipeline.roster[*].sport` |
| The `'1'` / `'6'` value paths create new units instead of joining existing ones | Both exist (es: `'1'` is a unit, `'6'` is at `[38]`); if the splice reports a new metric-values unit, stop and look |
| Another session's files get swept into the commit | Stage explicit paths and run `git status --short` before each commit |

## Open questions

- **Prose wording** settles at the Phase 1 review. **Default:** as written in step 3.
- **Dance-team mention in `realityCheck`.** Keeping it explains why the school's list is longer
  than 20. **Default:** keep it; drop the sentence if the user prefers.
