---
name: gastondaycommits
title: Gaston Day College Pipeline — new card from a varsity-roster cross-reference (3 / 2 D1 / 1 P4), Compare P4 null → 1, D1 null → 2
status: english-done
phases: 2
created: 2026-11-09
branch: feat/gaston-day-commits-2026
prs: []
---

# Gaston Day College Pipeline — new card, verified 2024–26

## Goal

Give Gaston Day the College Pipeline card (Sports) that every other roster high school has,
and fill its two blank Compare window rows. The `/athlete-commits gaston-day` graduate pass of
2026-11-09 read every Gaston Day varsity roster on MaxPreps (2023-24 → 2026-27) against the
HighSchoolOT per-sport trackers, RealGM, FieldLevel and each college's own roster. It found
**three** documented commitments in the classes of 2024–26:

- **Megan Brown ’24**, volleyball → Wofford (Southern, D1);
- **Anne Bradley Bing ’25**, volleyball → South Carolina (SEC, **Power 4**);
- **Braylen Todd ’26**, boys basketball → Johnson & Wales–Charlotte (USCAA, a non-NCAA level).

It also includes one uncounted Class of 2027 verbal, **Bree Smith**, swimming → Stanford
(ACC, P4).

The funnel reads **3 / 2 D1 / 1 P4**. On Compare, `p4-commits-2426` goes from `null` to
**`'1'`** and `d1-commits-2426` from `null` to **`'2'`**. `seniors-committed` stays `'1'`.

## Context

### The source (read these first)

All three files are in `source-material/sports/gaston-day/`. `/athlete-commits` wrote them;
they are **uningested and uncommitted**.

- `Gaston Day School - Sports - College Commitments 2024-2026.md` (**new**). It holds the
  per-class tables with a *Confirmed by* column, the totals, every source URL, the USCAA level
  note and the Excluded list. It is the authority for every row below.
- `Gaston Day School - Sports - Varsity Roster Cross-Reference 2026.md` (**new**). It holds the
  method, the 85 MaxPreps pages, the nulls (≈70 seniors searched) and the unchecked sports
  (swimming, golf, XC, track, wrestling, field hockey, softball and cheering have no MaxPreps
  roster).
- `Gaston Day - Sports - College Commitments Class of 2027.md`. A 2026-11-09 re-check is
  appended. The value stays `'1'` and is provisional until after the 2026-11-11 signing period.

`src/lib/metrics.ts` already has `/roster cross-reference/i` → `redesign-research` (~line 281)
and `/d1|matriculation|college commitments/i` → `matriculation` (~line 287), so **`metrics.ts`
needs no change.** There is no older pipeline table anywhere in Gaston Day's sports research,
so no superseded note is needed.

### Per-athlete confirmations

| Class | Athlete | Sport | College | Conf | Level | Confirmation |
|---|---|---|---|---|---|---|
| ’26 | Braylen Todd | Boys Basketball | Johnson & Wales (Charlotte) | USCAA | D3 (see Decisions) | https://charlotte.jwuathletics.com/sports/mens-basketball/roster (2026-27: "21 Braylen Todd, Fr., Mount Holly, NC, Gaston Day"); RealGM Gaston Day page (HS Grad 2026); MaxPreps boys basketball 25-26 Sr. |
| ’25 | Anne Bradley Bing | Volleyball | South Carolina | SEC | P4 | https://gamecocksonline.com/sports/wvball/roster/player/anne-bradley-bing/ ("High school Gaston Day School"; "2025 (FRESHMAN)"); HighSchoolOT volleyball tracker (Class of 2025, D1); MaxPreps volleyball 24-25 Sr. |
| ’24 | Megan Brown | Volleyball | Wofford | Southern | D1 | https://woffordterriers.com/news/2023/12/14/volleyball-inks-five-signees.aspx ("Megan Brown DS Charlotte, N.C. / Gaston Day School"); https://woffordterriers.com/sports/womens-volleyball/roster/megan-brown/8731; HighSchoolOT volleyball tracker (Class of 2024, D1); MaxPreps volleyball 23-24 Sr. |
| ’27 verbal | Bree Smith | Swimming | Stanford | ACC | P4 | Charlotte Observer swimming preview 2026-11-03, with AD Lulu Brase quoted: https://sports.yahoo.com/articles/best-high-school-swimmers-charlotte-100000360.html |

**Ruled out:** Makoi Mabor Marier (Gaston Christian, a RealGM mislabel), Rilpuou Makoi (on no
Gaston Day roster) and Alexis Ibsen (Emerson tennis, unverified). They appear in the source
files only and **never on the page**.

### Where the card goes

The Sports card order is fixed by `SPORTS_CARDS` in `src/data/sportsProgram.ts` (~line 430):
`offered`, `cup`, `record`, **`pipeline`**, `honors`, … `SchoolDetail.tsx` (~line 220)
renders `pipeline` whenever `program.pipeline` exists. **Adding the `pipeline` key to the
data file is the whole change; no component edit is needed.** The card lands fourth, after
Sports Offered, the Wells Fargo Cup (second, as always) and Winning Record. For readability,
put the key between `record` (~line 165) and `honors` (~line 257) in
`src/data/sportsPrograms/gaston-day.ts`.

The type is `CollegePipeline` in `src/data/sportsProgram.ts` (~lines 182–247), with
`CommitLevel = 'P4' | 'D1' | 'D2' | 'D3' | 'NAIA'`.

**Structure model: Hickory Grove** (`src/data/sportsPrograms/hickory-grove-christian.ts`,
`pipeline`, ~lines 203–245). Its card was reviewed and shipped in PR #461 and also has small
counts. Use the same fields: `headline`, `subhead`, `funnel`, `funnelNote`, `sportBars`,
`realityCheck`, `roster`, `rosterNote`, `sources`. Leave out `rankedRecruits`, because no
ranked recruit exists.

Two conventions read from the shipped schools:

- **`sportBars` count every commit by sport**, not only D1 (Cannon 23 = 23, Davidson Day 21 =
  21, HGCS 7 = 7), with `p4Width` overlaying the P4 share. Widths are `count / max`.
- **Funnel widths** are `count / committed`: HGCS 4/7 → `0.57`. The P4 stage uses the actual
  ratio, with `0.04` only as the floor for a zero.
- **Verbals** (Cannon's Class of 2027 block, `cannon.ts` ~lines 291–305) sit at the end of
  the roster after a comment
  `// Class of 2027 — public verbal commitments, not yet signed; not in the funnel or Compare`,
  with a real `level`. The roster filter tabs (`SportsProgram.tsx` ~line 832) filter by level
  only, so the **P4 tab will list two rows (Bing and Smith)** while the funnel says 1. Cannon
  has had the same display since #447, explained by `rosterNote`; this is accepted.

### Existing source constants in `gaston-day.ts`

`MAXPREPS` (line 33), `MAXPREPS_VB` (line 34) and `ATHLETICS` (line 46) exist. Add new
constants only where they keep the `sources[]` lines short.

### Compare (`src/data/metricValues.ts`)

- `p4-commits-2426` (`key` at ~line 2292). The `'gaston-day': null` cell is at ~line 2305;
  `quals` start ~line 2310 and have **no** gaston-day entry.
- `d1-commits-2426` (`key` at ~line 2338). The `'gaston-day': null` cell is at ~line 2351;
  `quals` have **no** gaston-day entry.
- `seniors-committed` (`key` at ~line 2394). The `'gaston-day': '1'` cell is at ~line 2403.
  Its comment says "no pipeline card to list her on", which becomes false. Its qual is the
  shared `SENIORS_QUAL` (~line 2418) and is **untouched**.

`npm run coverage:floor` today: Gaston Day **39/45** (6 null), 8/12 areas. Afterwards it should
read **41/45**. The floor is still Davidson Day at **31/45**, so the CLAUDE.md floor paragraph
does not change.

### Overlay units (checked in `src/data/overlays/work/sports.es.json` and `metric-values.es.json`)

**`sports`.**

- Extracted from a pipeline:
  - the five prose fields;
  - the funnel `label`s and `hint`s;
  - roster `sport`.
- **Not** extracted: roster `name` / `college` / `conf` / `level`, the `sportBars[]` labels and
  `sources[].label`. **So `'USCAA'` and `'Johnson & Wales (Charlotte)'` add no unit.** This
  corrects the `/athlete-commits` handoff, which forecast a `USCAA` identifier unit.
- Existing shared units the new paths join:
  - `'Committed to college athletics'`, `'NCAA Division I'`, `'Power 4'`,
    `'(SEC · Big Ten · ACC · Big 12)'`;
  - `'(all divisions, 2024–26)'` (3 paths) and `'(any conference)'` (7 paths);
  - roster sports `'Boys Basketball'` (28 paths), `'Volleyball'` (15) and `'Swimming'` (34).

**`metric-values`.**

- The `'1'` and `'2'` value units already exist (`'1'` has 9 paths and `'2'` has 1), so the
  new cells are **path additions**, not new units.
- The two new quals (`[42].quals.gaston-day.text`, `[43].quals.gaston-day.text`) are **new
  units**.

**Phase 2 forecast per locale:**

- `sports`: **5 added / 0 dropped** (the five prose fields), plus 9 new paths on existing
  units: 3 funnel labels, 3 funnel hints and 4 roster sports, of which Volleyball counts once
  per row.
- `metric-values`: **2 added / 0 dropped** (the two quals), plus two value-path additions.

Anything else means something went wrong; stop and look.

## Decisions

- **UX gate approved.** The user approved the new College Pipeline card for Gaston Day on
  2026-11-09, answering the explicit gate question in the `/athlete-commits` session ("Card +
  Compare rows"). `/implement` must not re-ask.
- **Todd is listed at `level: 'D3'`, `conf: 'USCAA'`.** The user accepted the recommendation
  to follow the junior-college precedent (Covenant Day / HGCS list NJCAA at D3). One
  `rosterNote` sentence explains it, and he counts as a commit but not as D1.
- **College string `'Johnson & Wales (Charlotte)'`.** The existing `'Johnson & Wales'` rows
  are other campuses (GNAC / C2C), and `'Queens (Charlotte)'` is the precedent for the
  parenthetical.
- **Conference `'Southern'`** for Wofford, not `'SoCon'`; it is the majority string (12 uses
  vs 3).
- **Funnel hints:** row 0 is `'(all divisions, 2024–26)'` and row 1 is `'(any conference)'`
  (Southern and SEC). Both are existing units, so neither adds a translation.
- **The volleyball title count is not restated in the new prose.** The app's ledger carries
  2021, 2024 and 2025, while the athletics site's 2026 "Three-Peat!" article
  (https://gastondayathletics.com/Article/166190) implies a 2026 title the ledger lacks. Any
  number written here would disagree with one of them. Updating the record card is out of
  scope.
- **Window check (2026-11-09): no roll due.** The current seniors are the Class of 2027; the
  latest graduated class is 2026, which is the window's end (`2426`).
- **Plan name `gastondaycommits`** was fixed by the `/athlete-commits` handoff.

## Approvals needed

**Already given:** the new `pipeline` card on Gaston Day (UX gate), approved by the user on
2026-11-09. Nothing else needs approval. The two Compare rows already exist; this fills two
null cells.

## Source material

| File | State | Role |
|---|---|---|
| `Gaston Day School - Sports - College Commitments 2024-2026.md` | new | provenance for the card and both window rows |
| `Gaston Day School - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Gaston Day - Sports - College Commitments Class of 2027.md` | re-check appended | `seniors-committed` stays `'1'` |

`/implement` ingests them first (step 2).

## Out of scope

- **The Class of 2027 refresh.** Re-run `/athlete-commits` after the 2026-11-11 signing period.
- **A swimming roster pass** for the 2024–26 graduates, the biggest unchecked gap.
- **The record card's volleyball title count** (a possible 2026 title) and the honors subhead's
  "not machine-readable" research bookkeeping. Both are noticed here, not fixed.
- **Rolling the window** (not due) and the CLAUDE.md floor paragraph (unchanged).
- Any component, any other school, and deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/gaston-day-commits-2026` from a freshly pulled `main`. Run
   `git status --short`. It must show only the three source-material paths above, this plan
   and `INDEX.md`. Anything else belongs to another session, so leave it alone.

2. **Ingest.** Run the `ingest-source-material` skill for `sports` / `gaston-day`, then:
   - Run `git diff --stat src/data/schools.json`. It should show only Gaston Day sports
     entries. If it shows a wholesale reorder, restore `HEAD` order.
   - Revert other schools' notes whose only change is the rebuild date.
   - Run `npm run check:metrics`. The Cross-Reference file must fold onto `redesign-research`
     and both commitments files onto `matriculation`.

3. **Add the `pipeline` card** to `src/data/sportsPrograms/gaston-day.ts`, between `record`
   and `honors`, under a divider comment matching the file's style
   (`/* ------------------------------------------------------- 1d pipeline -- */`). Use curly
   apostrophes (`’`) in prose.

   ```ts
   pipeline: {
     headline:
       'Three documented college commitments across the classes of 2024–26 — two of them Division I volleyball players, one to a Power 4 program.',
     subhead:
       'Built from Gaston Day’s varsity rosters and each college’s own roster; the school publishes no list of its college signees.',
     funnel: [
       { label: 'Committed to college athletics', hint: '(all divisions, 2024–26)', count: '3', width: 1, shade: 'pale' },
       { label: 'NCAA Division I', hint: '(any conference)', count: '2', width: 0.67, shade: 'mid' },
       { label: 'Power 4', hint: '(SEC · Big Ten · ACC · Big 12)', count: '1', width: 0.33, shade: 'full' },
     ],
     funnelNote:
       'Both Division I commits are volleyball players: Megan Brown (’24) at Wofford in the Southern Conference, and Anne Bradley Bing (’25) at South Carolina in the SEC — Gaston Day’s one Power 4 commitment in this window.',
     sportBars: [
       { sport: 'Volleyball', count: 2, width: 1, p4Width: 0.5 },
       { sport: 'Boys Basketball', count: 1, width: 0.5 },
     ],
     realityCheck:
       'Volleyball, Gaston Day’s state-championship program, produced both Division I commits; Braylen Todd (’26) went on to play basketball at Johnson & Wales in Charlotte. The school publishes no signing list or signing-day announcements, so the count is a documented minimum. Bree Smith (’27), the reigning NCISAA sprint champion, has committed to swim at Stanford.',
     roster: [
       { cls: "'26", name: 'Braylen Todd', sport: 'Boys Basketball', college: 'Johnson & Wales (Charlotte)', conf: 'USCAA', level: 'D3' },
       { cls: "'25", name: 'Anne Bradley Bing', sport: 'Volleyball', college: 'South Carolina', conf: 'SEC', level: 'P4' },
       { cls: "'24", name: 'Megan Brown', sport: 'Volleyball', college: 'Wofford', conf: 'Southern', level: 'D1' },
       // Class of 2027 — public verbal commitment, not yet signed; not in the funnel or Compare
       { cls: "'27", name: 'Bree Smith', sport: 'Swimming', college: 'Stanford', conf: 'ACC', level: 'P4' },
     ],
     rosterNote:
       'Each row is the college the athlete went to out of Gaston Day, as listed on that college’s own roster. P4 = SEC · Big Ten · ACC · Big 12. Johnson & Wales in Charlotte competes in the USCAA rather than the NCAA, so Braylen Todd is listed at the D3 tier for want of a USCAA level in this table’s scale. The Class of 2027 row is a public commitment, listed because it is already announced; it is not counted in the funnel, the sport bars or on the Compare page until the athlete signs.',
     sources: [
       { label: 'HighSchoolOT — NC volleyball recruiting tracker (Brown, Bing)', url: 'https://www.highschoolot.com/story/north-carolina-high-school-volleyball-recruiting-tracker/21031942/' },
       { label: 'Wofford — volleyball inks five signees, December 2023 (Megan Brown)', url: 'https://woffordterriers.com/news/2023/12/14/volleyball-inks-five-signees.aspx' },
       { label: 'Wofford — volleyball roster (Megan Brown)', url: 'https://woffordterriers.com/sports/womens-volleyball/roster/megan-brown/8731' },
       { label: 'South Carolina — volleyball roster (Anne Bradley Bing)', url: 'https://gamecocksonline.com/sports/wvball/roster/player/anne-bradley-bing/' },
       { label: 'Johnson & Wales Charlotte — men’s basketball roster 2026–27 (Braylen Todd)', url: 'https://charlotte.jwuathletics.com/sports/mens-basketball/roster' },
       { label: 'Charlotte Observer via Yahoo — 2026–27 Charlotte-area swimming preview (Bree Smith)', url: 'https://sports.yahoo.com/articles/best-high-school-swimmers-charlotte-100000360.html' },
       { label: 'MaxPreps — Gaston Day varsity rosters', url: MAXPREPS },
     ],
   },
   ```

   **Check:**
   - Before writing "reigning NCISAA sprint champion" in `realityCheck`, check that the Class
     of 2027 file and `gaston-day.ts` support it: the Observer calls her a "back-to-back
     NCISAA Division 3 champion … in the 50 and 100 free". If the wording does not match the
     source, use "a back-to-back NCISAA freestyle champion".
   - Counts: 4 rows. Funnel 3 / 2 / 1 excludes the ’27 row. Bars are Volleyball 2 (P4 1) and
     Boys Basketball 1.
   - The prose says what the school publishes, never what was searched.

4. **Compare rows** in `src/data/metricValues.ts`:
   - **`p4-commits-2426`.** Set the cell to
     `'gaston-day': '1', // ’25 Bing (South Carolina volleyball, SEC) — see the Gaston Day College Commitments 2024-2026 source file; ’27 B.Smith (Stanford) is a verbal, not counted`.
     Add to its `quals`:
     ```ts
     'gaston-day': {
       kind: 'minimum',
       text: 'A documented minimum: Anne Bradley Bing (’25) signed with South Carolina volleyball, an SEC program. Gaston Day publishes no signing list, so its commitments are confirmed from college rosters.',
     },
     ```
   - **`d1-commits-2426`.** Set the cell to
     `'gaston-day': '2', // ’24 Brown (Wofford volleyball) · ’25 Bing (South Carolina volleyball); ’26 Todd is USCAA (Johnson & Wales Charlotte), not D1`.
     Add to its `quals`:
     ```ts
     'gaston-day': {
       kind: 'minimum',
       text: 'A documented minimum — both volleyball: Megan Brown (’24) at Wofford and Anne Bradley Bing (’25) at South Carolina. Gaston Day publishes no signing list, so its commitments are confirmed from college rosters.',
     },
     ```
   - **`seniors-committed`.** Keep `'1'` and set the comment to
     `// B.Smith (Stanford swim) — the AD confirmed it to the Observer; listed on the pipeline card as a verbal. Re-checked 2026-11-09; re-run after 2026-11-11`.
   - Put the `quals` entries in the same position relative to the other schools as the
     `values` order. Run `npm run check:quals`, then `npm run coverage:floor`. Gaston Day
     should read **41/45** and the floor should stay Davidson Day **31/45**. If either reads
     otherwise, stop and report.

5. **Schema doc.** Run `npm run schema && npm run check:schema`. A new card on a school
   changes the schools × cards grid, so `DATA-SCHEMA.md` should change. Commit it.

6. **Checks and browser:** see Verification. Then:
   - Commit with explicit paths:
     - the three source-material files;
     - `src/data/sportsPrograms/gaston-day.ts`, `src/data/metricValues.ts`,
       `src/data/schools.json`, `.claude/docs/sports/gaston-day.md`;
     - any other derived file the ingest regenerated for Gaston Day (inspect it first);
     - `.claude/docs/DATA-SCHEMA.md`;
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
`hickorygrovecommits` Phase 2 recipe.

1. **Splice.** Run `node scripts/i18n_splice_work.mjs --lang <code> --topic sports`, then
   `--topic metric-values`, with a dry run on `es` first.
   - Confirm the forecast in *Context*: `sports` 5 added / 0 dropped plus path additions;
     `metric-values` 2 added / 0 dropped plus two value paths.
   - Splice by stamp, never by path.
   - Every `gaston-day:pipeline.roster[*].sport` and `funnel[*]` path must land on an existing
     unit.
   - **`check:live` cannot see a brand-new unit.** To get the exact unit diff, extract to a
     throwaway `--lang` and compare.

2. **Translate by hand, per locale**: the five new `sports` units and the two quals.
   - Start from each locale's shipped rendering of HGCS's and Carmel's pipeline prose, which
     shows its terms for Division I, Power 4, verbal commitment, "documented minimum" and the
     D3-tier note.
   - Copy these figures char-for-char: `2024–26`, `’24`, `’25`, `’26`, `’27`, `D3`, `USCAA`,
     `NCISAA`.
   - Keep college, conference and program names in Latin script as each locale already does:
     `Wofford`, `South Carolina`, `Johnson & Wales`, `Stanford`, `Southern Conference`, `SEC`,
     `SEC · Big Ten · ACC · Big 12`.
   - Spelled-out numbers ("Three", "two", "one") follow each locale's practice in the HGCS
     headline.
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
| `source-material/sports/gaston-day/*.md` (3) | research from `/athlete-commits` |
| `src/data/schools.json`, `.claude/docs/sports/gaston-day.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated (new card) |
| `src/data/sportsPrograms/gaston-day.ts` | new `pipeline` card |
| `src/data/metricValues.ts` | P4 null → 1, D1 null → 2, two new quals, seniors comment |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:metrics`, `check:schema`, `check:quals` and `check:chrome` are clean,
      apart from any pre-existing finding in another school.
- [ ] `npm run coverage:floor` shows Gaston Day at 41/45 and the floor unchanged at 31/45.
- [ ] `npm run check:live` fails only on the new Gaston Day `sports` / qual stamps, which is
      the expected English-shipped state. The rest of the `npm run build` chain exits 0.
- [ ] Browser check (`npm run build && npx vite preview`, real Chrome) on
      `/school/gaston-day?topic=sports`:
      - The College Pipeline card is **fourth**, after Sports Offered, Wells Fargo Cup and
        Winning Record. With the card **closed**, the teaser shows the new headline.
      - Open the card and check:
        - the funnel reads 3 / 2 / 1, with hints "(all divisions, 2024–26)", "(any
          conference)" and "(SEC · Big Ten · ACC · Big 12)";
        - there are two sport bars: Volleyball 2 with a half P4 overlay, and Boys Basketball
          1;
        - there are 4 roster rows, in the order Todd, Bing, Brown, Smith;
        - Todd reads Johnson & Wales (Charlotte) · USCAA · D3;
        - the P4 tab lists Bing and Smith (expected, see Context);
        - the prose renders and the seven source links open.
- [ ] `npm run audit:mobile` (with preview running) shows no overflow on the Gaston Day page
      with the new card open. This is a new card on this page, so check 320 px.
- [ ] Browser check on `/compare?topic=sports&schools=gaston-day,cannon`: Gaston Day reads
      **1** Power 4 and **2** Division I. Both qual tips (hidden divs; need `?schools=`) show
      the new text. Current seniors still reads **1**.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live`: all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` returns 0 for all nine locales, and
      `python3 scripts/check_figures.py --lang <code> --topic sports` is clean for all nine.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi` and
      `check:fr` are clean.
- [ ] `node scripts/check_work_integrity.mjs` has run. It reports false alarms after a splice,
      so verify any flagged unit by stamp against HEAD.
- [ ] `npm run i18n:leaks -- --lang <code>` returns 0 on the Gaston Day pipeline paths for all
      nine locales.
- [ ] `npm run build` exits 0.
- [ ] Browser check on `/school/gaston-day?lang=es&topic=sports` and `?lang=fa`:
      - the prose is translated;
      - `2024–26` is intact and the `fa` range is not reversed (probe with the card
        **closed**, on the teaser);
      - the roster sport chips read the locale's Volleyball, Boys Basketball and Swimming.

      On `/compare?lang=es&topic=sports&schools=gaston-day`, Gaston Day shows 1 / 2.

## Risks

| Risk | Mitigation |
|---|---|
| The new card overflows at phone width | Run `audit:mobile` with the card open; the grid tracks are shared with eleven shipped pipeline cards |
| A funnel or roster path lands on no unit and renders English | Splice by stamp, then run `i18n:leaks` on `gaston-day:pipeline.*` |
| Another session's files get swept into the commit | Stage explicit paths and run `git status --short` before each commit |

## Open questions

- **Prose wording** settles at the Phase 1 review. **Default:** as written in steps 3 and 4.
- **Bree Smith's swimming description** in `realityCheck`. **Default:** match the Observer's
  "back-to-back NCISAA Division 3 champion" wording; drop the clause if it can't be sourced.

## Implementation notes

- **Bree Smith clause (Phase 1).** Neither the Class of 2027 file nor `gaston-day.ts` supports
  "reigning" or "back-to-back NCISAA champion"; the Observer line on file reads only
  "Sr., 50/100 free … Stanford commit". Per the open-question default, the champion clause was
  dropped and the sentence reads "Bree Smith (’27), a 50 and 100 freestyle swimmer, has committed
  to swim at Stanford."
- **Quals placement.** Neither `quals` map follows the `values` order, so the Gaston Day entry
  was appended last in each (after `davidson-day` in P4, after `hickory-grove-christian` in D1).
