---
name: charlotte-latincommits
title: Charlotte Latin College Pipeline — all nine signing posts (63 / 22 D1 / 8 P4), every sport named, Compare P4 3 → 8 and D1 14 → 22
status: implemented
phases: 2
created: 2026-11-08
branch: feat/charlotte-latin-commits-2026
prs: [456]
---

# Charlotte Latin College Pipeline — verified 2024–26 refresh

## Goal

The `/athlete-commits` graduate refresh of 2026-11-08 found that Charlotte Latin holds
**three** collegiate-commitment events a year (November, February, late April) and posts a
named article for each. The shipped card used **five of the nine** posts in the 2024–26
window. It missed both Class of 2024 bookends and both later April events. It also printed
"Not published" for ten sports that the posts name. With all nine posts the school's own
totals are **16 / 22 / 25 = 63**, against the card's 48 and its 40 listed rows. Five Power 4
commits were missing.

Done when the Latin page shows funnel **63 / 22 / 8**, a 60-row roster with no
"Not published" sport, the recounted sport bars, and the five rewritten prose fields.
Compare must read **Power 4 8** and **Division I 22**, and `npm run build` must be green in
all ten locales.

## Context

### The source (read these first)

All in `source-material/sports/charlotte-latin/`. `/athlete-commits` wrote them and they are
**uncommitted**:

- `Charlotte Latin - Sports - College Commitments 2024-2026.md`: **rebuilt.** It holds the
  nine school posts and the college-roster confirmations, one table per class with a
  *Confirmed by* column, the totals table, D1 by sport, and the *Excluded* list (Massardo,
  McMahon, Peters-at-Wofford). The filename is kept; it folds onto `matriculation` via
  `/d1|matriculation|college commitments/i` in `src/lib/metrics.ts` (~line 287).
- `Charlotte Latin - Sports - Varsity Roster Cross-Reference 2026.md`: **new.** Method,
  tiers per sport, senior counts, reachability, nulls, unchecked rosters and leads ruled
  out. It folds onto `redesign-research` via the existing `/roster cross-reference/i` rule
  (~line 281), so **no `metrics.ts` change**.
- `Charlotte Latin - Sports - College Commitments Class of 2027.md`: **extended** with a
  leads table (Adelaide Rhodes → Claremont-Mudd-Scripps, LaxNumbers-only).
  `seniors-committed` stays `'1'` (Greathouse).
- `Charlotte Latin - Sports - Redesign Research 2026.md`: §3 now opens with a superseded
  note.

### The card today (`src/data/sportsPrograms/charlotte-latin.ts`, `pipeline`, lines ~232–330)

- `headline` (233), `subhead` (235), `funnel[]` (`'48'` / `'14'` width 0.29 / `'3'` 0.07),
  `funnelNote` (254), `sportBars` (256–264: Swimming 4, Golf 3, Lacrosse 2, Football 1,
  Tennis 1, Baseball 1, Wrestling 1, scale /4), `realityCheck` (265), `rankedRecruits`
  (267, **unchanged**), `roster` (269–312: 40 rows + 1 '27 verbal), `rosterNote` (313),
  `sources` (315–330: 5 entries).
- Wrong today: 10 rows `sport: 'Not published'` (the school's posts name every one); the
  two '25 lacrosse rows say `'Lacrosse'`, but they are girls' lacrosse; Hyder's
  `conf: '—'` should be NESCAC (Trinity College, Conn.); the subhead and realityCheck say
  football produced exactly one D1 commit, but it has two (Salvage, Barber).

### Compare (`src/data/metricValues.ts`)

- The block comment at ~2288 says "Charlotte Latin's academic-heavy classes send many to D3
  and its November signing lists are partial".
- `p4-commits-2426` `'charlotte-latin': '3'` (~2299), with `quals['charlotte-latin']` at
  ~2322–2325 (`kind: 'minimum'`, text ending "…and its November signing lists are
  partial.").
- `d1-commits-2426` `'charlotte-latin': '14'`, with an identical quals text at ~2368–2371.
- `seniors-committed` `'charlotte-latin': '1'`, `SENIORS_QUAL`: **unchanged**.

### Overlay units here (from `src/data/overlays/work/sports.es.json`)

Extracted Latin pipeline units: `headline`, `subhead`, `funnelNote`, `realityCheck`,
`rankedRecruits`, `rosterNote`, the funnel labels and hints, and **roster `sport` only**.
Roster `name`, `college`, `conf` and `level` are **not** extracted, and neither are
`sportBars[]` labels, `funnel[].count` or `sources[].label`. Every sport string in the new
roster (`Swimming`, `Golf`, `Wrestling`, `Football`, `Girls Basketball`, `Boys Basketball`,
`Girls Lacrosse`, `Boys Lacrosse`, `Football & Lacrosse`, `Boys Soccer`, `Girls Soccer`,
`Volleyball`, `Baseball`, `Softball`, `Tennis`, `Track / XC`, `Track & Field`) **already
exists as a shared unit**. New and moved rows only attach paths. The `Not published` unit's
13 paths are all Latin, so it will drop. `Lacrosse` loses its two Latin paths and keeps the
other schools' paths.

In `metric-values.es.json`, `'8'` is an existing value unit; **`'22'` is not**, so it is a
new unit (stored as the same digits, per `charlottechristiancommits`). The `'3'` and `'14'`
units lose their Latin path (`'14'` holds only Latin's, so it drops). The shared Latin quals
text is one unit with two paths (`[42]` and `[43]`). The new text is one new unit.

**Phase 2 forecast per locale:** `sports` 5 new / 5 dropped (headline, subhead, funnelNote,
realityCheck, rosterNote) plus the dropped `Not published`; `metric-values` 2 new (the qual,
`'22'`), with `'14'` and the old qual dropped. Anything else means something went wrong;
stop and look.

## Decisions

- **User decisions, 2026-11-08 (do not re-ask):** exclude **Natalie Massardo** (Furman
  entry-year roster does not list her); count **James Peters at Wooster, D3**, not Wofford
  (the signing post and HighSchoolOT agree); exclude **Dempsey McMahon** (South Carolina; she
  fails the graduate test, since she is not on Latin's senior roster and the school's 25
  leaves her out).
- **Dance and cheer (Belton, Kim, Bradley '25) count in the funnel total only**: no roster
  rows, not in D1/P4. This follows the Charlotte Country Day Louisville-cheer precedent
  (`charlottecountrydaycommits`, user decision 2026-11-08). So 60 rows and 63 in the funnel.
- **Sean Rose ('24, Navy) is a row** although no school post names him: the Navy roster
  prints "Charlotte Latin", RealGM gives HS grad 2024, and he is on Latin's 2023-24 MaxPreps
  roster. That passes the graduate test.
- **Funnel 63** equals the school's own 16 + 22 + 25. The Class of 2024 is 16 on both
  counts, but not the same 16 (Rose in, Massardo out). No prose needs to say so.
- **Sport labels** follow the existing units: Khouri, Yu and DiRoma → `'Track / XC'`;
  Simmons (track only) → `'Track & Field'`; Yee (diving) → `'Swimming'`.
- **College strings** follow the file: Henry → `'UC Berkeley'` (as Clontz); Monk →
  `'North Carolina'`; Hyder → `'Trinity (Conn.)'`. They are not extracted, so they add no
  translation cost.
- **One new conf string, `'Midwest'`** (Lawrence). It is not extracted, so it adds no unit.
- **`rankedRecruits` unchanged**: still true.
- **The quals stay `kind: 'minimum'`**, but the text drops the "November lists are partial"
  claim, which is now false.
- **Plan name `charlotte-latincommits`** was fixed by the `/athlete-commits` handoff.

## Approvals needed

**None.** The card and all three Compare rows exist, and every change fills existing
fields. The three judgment calls were decided by the user during the research run.

## Source material

| File | State | Role |
|---|---|---|
| `Charlotte Latin - Sports - College Commitments 2024-2026.md` | rebuilt | provenance for the card and both window rows |
| `Charlotte Latin - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Charlotte Latin - Sports - Redesign Research 2026.md` | §3 note added | points at the two files |
| `Charlotte Latin - Sports - College Commitments Class of 2027.md` | lead added | `seniors-committed` stays `'1'` |

`/implement` ingests them first (step 2).

## Out of scope

- The Class of 2027 (Rhodes is a lead; re-check after Latin's November 2026 post, which
  follows the 2026-11-11 signing day).
- Rolling the 2024–26 window (not due).
- `rankedRecruits`, any other school, any component, the CLAUDE.md floor (Latin is not the
  floor school).
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/charlotte-latin-commits-2026` from a freshly pulled `main`.
   `git status --short` must show only the four source-material paths above (plus this plan
   and `INDEX.md`). Anything else belongs to another session, so leave it alone.

2. **Ingest**: run the `ingest-source-material` skill for `sports` / `charlotte-latin`.
   Then run `git diff --stat src/data/schools.json` (only Latin sports entries; on a
   wholesale reorder restore `HEAD` order, per memory *two-topic ingest reorders the
   manifest*), `npm run check:metrics` (the known pre-existing Charlotte Christian
   "Podcast Episode 33" finding is not ours), and
   `npm run schema && npm run check:schema` (commit `DATA-SCHEMA.md` only if it changed).

3. **Edit the pipeline card** in `src/data/sportsPrograms/charlotte-latin.ts`.

   a. **`headline`** →
      `'63 college commitments across 2024–26, 22 of them Division I and 8 Power 4 — a pipeline led by swimming and girls’ lacrosse.'`

   b. **`subhead`** →
      `'Swimming alone produced eight Division I commits and four Power 4, to North Carolina, Tennessee, Northwestern and Cal. Football produced two Division I commits, Neil Salvage to South Carolina and Matthew Barber to Georgetown.'`

   c. **`funnel[]`**: counts `'63'`, `'22'`, `'8'`; widths `1`, `0.35`, `0.13`. Labels,
      hints and shades unchanged.

   d. **`funnelNote`** →
      `'Thirty-four of the 63 commitments — roughly 54% — are to NCAA Division III programs, concentrated in academically selective conferences (NESCAC, UAA, ODAC, NCAC). Latin celebrates its signees at three events each year and publishes every name; the Class of 2026’s 25 commitments are the most of any Latin class since at least 2008. The count includes three signees to college dance and cheer teams, which sit outside the NCAA divisions shown here.'`

   e. **`sportBars`** (D1 by sport, scale /8) →
      ```ts
      { sport: 'Swimming', count: 8, width: 1, p4Width: 0.5 },
      { sport: 'Lacrosse', count: 4, width: 0.5, p4Width: 0.25 },
      { sport: 'Golf', count: 3, width: 0.375, p4Width: 0.125 },
      { sport: 'Football', count: 2, width: 0.25, p4Width: 0.125 },
      { sport: 'Baseball', count: 1, width: 0.125 },
      { sport: 'Tennis', count: 1, width: 0.125 },
      { sport: 'Wrestling', count: 1, width: 0.125 },
      { sport: 'Track / XC', count: 1, width: 0.125 },
      { sport: 'Basketball', count: 1, width: 0.125 },
      ```
      Counts sum to 22, and P4 widths × 8 sum to 8.

   f. **`realityCheck`** →
      `'Latin’s Division I pipeline runs through the pool and the girls’ lacrosse field: swimming produced eight D1 commits and girls’ lacrosse four, between them six of the eight Power 4 signees. Football, despite the program’s eleven historic state titles, produced two. For most Latin families the realistic outcome is still a Division III place at an academically strong college — Washington & Lee, Emory, Case Western, Denison and Hampden-Sydney recur on the signing lists.'`
      (Check the school counts in that list against the roster before shipping: W&L 4,
      Emory 3, Case Western 3, Denison 3, Hampden-Sydney 3.)

   g. **`roster`**: replace the whole array with these 60 rows plus the verbal, in this
      order:
      ```ts
      { cls: "'26", name: 'Aston Lee', sport: 'Golf', college: 'NC State', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Harrison Short', sport: 'Swimming', college: 'Villanova', conf: 'Big East', level: 'D1' },
      { cls: "'26", name: 'Karlin Smith', sport: 'Swimming', college: 'Bucknell', conf: 'Patriot', level: 'D1' },
      { cls: "'26", name: 'Henry Holland', sport: 'Golf', college: 'James Madison', conf: 'Sun Belt', level: 'D1' },
      { cls: "'26", name: 'Spear Gorelick', sport: 'Wrestling', college: 'Davidson', conf: 'SoCon', level: 'D1' },
      { cls: "'26", name: 'Griffin Cheatwood', sport: 'Golf', college: 'Davidson', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'26", name: 'Matthew Barber', sport: 'Football', college: 'Georgetown', conf: 'Patriot', level: 'D1' },
      { cls: "'26", name: 'Lanie Edwards', sport: 'Girls Basketball', college: 'Rollins', conf: 'SSC', level: 'D2' },
      { cls: "'26", name: 'Liam McConaughy', sport: 'Wrestling', college: 'Case Western Reserve', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Banks Cutter', sport: 'Football & Lacrosse', college: 'Middlebury', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: 'Mollie Snyder', sport: 'Girls Basketball', college: 'Grove City', conf: 'PAC', level: 'D3' },
      { cls: "'26", name: 'Knox Hutcheson', sport: 'Boys Lacrosse', college: 'Sewanee', conf: 'SAA', level: 'D3' },
      { cls: "'26", name: 'Louis Markin', sport: 'Boys Soccer', college: 'Case Western Reserve', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Sunny Jin', sport: 'Girls Soccer', college: 'Case Western Reserve', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Claire Zhang', sport: 'Girls Soccer', college: 'MIT', conf: 'NEWMAC', level: 'D3' },
      { cls: "'26", name: 'Kelsey Sciacca', sport: 'Golf', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Charlotte Tune', sport: 'Girls Basketball', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Emily Cao', sport: 'Volleyball', college: 'Williams', conf: 'NESCAC', level: 'D3' },
      { cls: "'26", name: 'Jaden Hawa', sport: 'Baseball', college: 'William Peace', conf: 'USA South', level: 'D3' },
      { cls: "'26", name: 'Matthew Flynn', sport: 'Football', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Griffin Donnelly', sport: 'Baseball', college: 'Lawrence', conf: 'Midwest', level: 'D3' },
      { cls: "'26", name: 'Avery Simmons', sport: 'Track & Field', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'26", name: 'Ben Spiegler', sport: 'Swimming', college: 'RIT', conf: 'Liberty', level: 'D3' },
      { cls: "'26", name: 'Til Wagner', sport: 'Golf', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'26", name: 'Ethan Worrell', sport: 'Boys Soccer', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'25", name: 'Norvy Clontz', sport: 'Swimming', college: 'UC Berkeley', conf: 'ACC', level: 'P4' },
      { cls: "'25", name: 'Avery Booker', sport: 'Baseball', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
      { cls: "'25", name: 'Lila Connor', sport: 'Swimming', college: 'Georgetown', conf: 'Big East', level: 'D1' },
      { cls: "'25", name: 'Riley Milligan', sport: 'Girls Lacrosse', college: 'St. Bonaventure', conf: 'Atlantic 10', level: 'D1' },
      { cls: "'25", name: 'Reese Morgan', sport: 'Girls Lacrosse', college: 'Temple', conf: 'American', level: 'D1' },
      { cls: "'25", name: 'Brayden Hampton', sport: 'Baseball', college: 'Fairmont State', conf: 'MEC', level: 'D2' },
      { cls: "'25", name: 'Titus Ivory', sport: 'Football', college: 'Wingate', conf: 'SAC', level: 'D2' },
      { cls: "'25", name: 'Talia Hawa', sport: 'Softball', college: 'Roanoke', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Maggie Hyder', sport: 'Girls Soccer', college: 'Trinity (Conn.)', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'Lillian Jarmosevich', sport: 'Girls Soccer', college: 'Swarthmore', conf: 'Centennial', level: 'D3' },
      { cls: "'25", name: 'Ethan Khouri', sport: 'Track / XC', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'25", name: 'Parker Rubinacci', sport: 'Boys Soccer', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'25", name: 'Hudson Shoup', sport: 'Football', college: 'Calvin', conf: 'MIAA', level: 'D3' },
      { cls: "'25", name: 'Ainsley Sullivan', sport: 'Softball', college: 'Macalester', conf: 'MIAC', level: 'D3' },
      { cls: "'25", name: 'Sydney Thune', sport: 'Softball', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'25", name: 'Bridget Yu', sport: 'Track / XC', college: 'Tufts', conf: 'NESCAC', level: 'D3' },
      { cls: "'25", name: 'James Jones', sport: 'Boys Basketball', college: 'DePauw', conf: 'NCAC', level: 'D3' },
      { cls: "'25", name: 'Bryce Spangler', sport: 'Swimming', college: 'Denison', conf: 'NCAC', level: 'D3' },
      { cls: "'25", name: 'Logan Yee', sport: 'Swimming', college: 'MIT', conf: 'NEWMAC', level: 'D3' },
      { cls: "'24", name: 'Neil Salvage', sport: 'Football', college: 'South Carolina', conf: 'SEC', level: 'P4' },
      { cls: "'24", name: 'Ivy Monk', sport: 'Swimming', college: 'North Carolina', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Aidan Hill', sport: 'Swimming', college: 'Tennessee', conf: 'SEC', level: 'P4' },
      { cls: "'24", name: 'Wiley Spinner', sport: 'Swimming', college: 'Northwestern', conf: 'Big Ten', level: 'P4' },
      { cls: "'24", name: 'Ardyn Henry', sport: 'Girls Lacrosse', college: 'UC Berkeley', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Evie McMahan', sport: 'Girls Lacrosse', college: 'Virginia', conf: 'ACC', level: 'P4' },
      { cls: "'24", name: 'Luke Coppage', sport: 'Tennis', college: 'Queens (Charlotte)', conf: 'ASUN', level: 'D1' },
      { cls: "'24", name: 'Charley Floyd', sport: 'Swimming', college: 'Tulane', conf: 'American', level: 'D1' },
      { cls: "'24", name: 'Jackson DiRoma', sport: 'Track / XC', college: 'Bucknell', conf: 'Patriot', level: 'D1' },
      { cls: "'24", name: 'Sean Rose', sport: 'Boys Basketball', college: 'Navy', conf: 'Patriot', level: 'D1' },
      { cls: "'24", name: 'Ellé Collier', sport: 'Girls Lacrosse', college: 'Rollins', conf: 'SSC', level: 'D2' },
      { cls: "'24", name: 'George Glassner', sport: 'Swimming', college: 'Washington & Lee', conf: 'ODAC', level: 'D3' },
      { cls: "'24", name: 'Zachary Spicer', sport: 'Swimming', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'24", name: 'Jordan Pence', sport: 'Football', college: 'Hampden-Sydney', conf: 'ODAC', level: 'D3' },
      { cls: "'24", name: 'James Peters', sport: 'Baseball', college: 'Wooster', conf: 'NCAC', level: 'D3' },
      { cls: "'24", name: 'Nic Levy', sport: 'Boys Basketball', college: 'Johnson & Wales', conf: 'GNAC', level: 'D3' },
      // Class of 2027 — public verbal commitments, not yet signed; not in the funnel or Compare
      { cls: "'27", name: 'Thomas Greathouse', sport: 'Swimming', college: 'George Washington', conf: 'Atlantic 10', level: 'D1' },
      ```
      Count check: '26 25 (P4 1, D1 6, D2 1, D3 17), '25 19 (1, 4, 2, 12), '24 16 (6, 4,
      1, 5). That is 60 rows, D1 incl. P4 22, P4 8. Keep the verbal comment line exactly as
      it is today.

   h. **`rosterNote`** →
      `'P4 = SEC · Big Ten · ACC · Big 12. Three Class of 2025 signees to college dance and cheer teams are counted in the funnel but not listed, because neither is an NCAA-sponsored sport. The Class of 2027 rows are public verbal commitments, listed because they are already announced and not counted in the funnel, the sport bars or the Power 4 and Division I rows until those athletes sign.'`

   i. **`sources[]`**: keep the five, and add the four posts the card lacked, newest first
      after the existing signing-day entries:
      ```ts
      { label: 'clshawks.com — April 2026 signing day (Class of 2026 reaches 25)', url: 'https://clshawks.com/news/2026/4/23/general-six-signees-celebrated-in-april-mark-a-record-year-for-collegiate-commits.aspx' },
      { label: 'clshawks.com — April 2025 signing day (Class of 2025 reaches 22)', url: 'https://clshawks.com/news/2025/4/24/cheerleading-winter-seven-hawks-added-to-an-impressive-class-of-22-collegiate-signees.aspx' },
      { label: 'clshawks.com — April 2024 signing day (Class of 2024 reaches 16)', url: 'https://clshawks.com/news/2024/4/24/diroma-and-levy-celebrated-for-collegiate-commitments.aspx' },
      { label: 'clshawks.com — Nov 2023 signing day', url: 'https://clshawks.com/news/2023/11/8/general-eight-student-athletes-celebrated-for-collegiate-commitments.aspx' },
      { label: 'Navy Athletics — 2024–25 men’s basketball roster (Sean Rose)', url: 'https://navysports.com/sports/mens-basketball/roster/2024-25' },
      ```
      `sources[].label` is not extracted, so this adds no units.

4. **Compare rows** in `src/data/metricValues.ts`:
   - Block comment (~2288): `Charlotte Latin's academic-heavy classes send many to D3 and
     its November signing lists are partial;` → `Charlotte Latin publishes a named post for
     each of its three yearly signing events and sends many to D3;`
   - `p4-commits-2426`:
     `'charlotte-latin': '8', // ’24 Salvage (South Carolina), Monk (North Carolina), Hill (Tennessee), Spinner (Northwestern), Henry (Cal), McMahan (Virginia) · ’25 Clontz (Cal) · ’26 Lee (NC State)`
   - `d1-commits-2426`:
     `'charlotte-latin': '22', // ’24: Salvage, Monk, Hill, Spinner, Henry, McMahan, Coppage, Floyd, DiRoma, Rose (10) · ’25: Clontz, Booker, Connor, Milligan, Morgan (5) · ’26: Lee, Short, K.Smith, Holland, Gorelick, Cheatwood, Barber (7)`
   - Both `quals['charlotte-latin'].text` (~2324, ~2370), identical →
     `'A documented minimum. Charlotte Latin names every signee from its three yearly signing events; its academically heavy classes send many athletes to Division III.'`
     Keep `kind: 'minimum'`.
   - `seniors-committed`: unchanged.

5. **Checks and browser**: see Verification. Commit with explicit paths (the four
   source-material files, `src/data/sportsPrograms/charlotte-latin.ts`,
   `src/data/metricValues.ts`, `src/data/schools.json`,
   `.claude/docs/sports/charlotte-latin.md`, any other derived file the ingest regenerated
   (inspect it first), `DATA-SCHEMA.md` only if changed, this plan, `INDEX.md`). Push and
   verify `git rev-parse HEAD` against `git ls-remote origin <branch>`. Flip this plan and
   the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (read the list from `src/lib/i18n.ts`; today
`es bn ht te fr fa it hi ar`) on **two** overlay topics, `sports` and `metric-values`. No
chrome catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`; recipe:
`charlottecountrydaycommits` / `charlottechristiancommits` Phase 2.

1. `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` and
   `--topic metric-values`, dry-run `es` first. Confirm the forecast in *Context*: sports
   5 added / 6 dropped (5 prose units plus `Not published`), metric-values 2 added
   (qual, `'22'`) / 2 dropped (`'14'`, old qual). Roster indexes shift throughout, so
   **splice by stamp, never by path**. Every roster `sport` path must land on an existing
   shared unit.
2. Translate by hand per locale, starting from each locale's shipped rendering of the old
   field (the rankedRecruits/funnel unit wording shows that locale's terms for Division I,
   Power 4, Division III). Copy figures char-for-char: `63`, `22`, `8`, `34`, `54%`,
   `2024–26`, `2026`, `2008`, `25`; keep `NESCAC`, `UAA`, `ODAC`, `NCAC`, `NCAA`, `SEC ·
   Big Ten · ACC · Big 12`, and school/college names in Latin script as each locale already
   does. Spelled-out numbers ("Thirty-four", "eight", "four", "two", "three") follow each
   locale's existing practice in the old funnelNote. `fa`/`ar`: no isolates in the work
   file. `'22'` is stored as the same digits.
3. `npm run i18n:build -- --topic sports --lang <code>` and
   `--topic metric-values --lang <code>` ×9.
4. Run the Phase 2 checks, commit with explicit paths, push (verify the SHA), open the PR
   with `--body-file`, run `gh pr merge --squash --delete-branch`, then
   `git checkout main && git pull`. Flip the plan and INDEX row to *Implemented* with the
   PR link (in the PR, or a follow-up PR; never on `main`). **Do not deploy.** Say
   "merged — ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/charlotte-latin/*.md` (4) | research, from `/athlete-commits` |
| `src/data/schools.json`, `.claude/docs/sports/charlotte-latin.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/charlotte-latin.ts` | headline, subhead, funnel, funnelNote, sportBars, realityCheck, roster (60 + 1), rosterNote, 5 sources |
| `src/data/metricValues.ts` | P4 3 → 8, D1 14 → 22, both Latin quals, block comment |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals`,
      `npm run check:chrome`. All clean except the known pre-existing metrics finding.
- [ ] `npm run check:live` — fails only on the old Latin stamps (5 sports, 1 metric qual),
      the expected English-shipped state. Run the rest of the `npm run build` chain with
      only `check:live` removed: exit 0.
- [ ] Browser (`npm run build && npx vite preview`, real Chrome),
      `/school/charlotte-latin?topic=sports`, The College Pipeline card open: funnel
      63 / 22 / 8; nine bars summing to 22 with Swimming first (8) and Lacrosse second (4);
      61 roster rows with no `Not published`; filter tabs D1 22 and P4 8; Ivy Monk, Ardyn
      Henry and Sean Rose rows present; the new subhead, funnelNote, realityCheck and
      rosterNote render; the five new source links open. The headline is the card
      **teaser** and is hidden while the card is open, so check it with the card closed.
- [ ] Browser, `/compare?topic=sports&schools=charlotte-latin,providence-day`: Latin reads
      **8** Power 4 and **22** Division I; the leader tint still goes to Providence Day
      (16 / 39). Hover the Latin cell to see the new qual tip.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live` — all nine resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 — 0;
      `python3 scripts/check_figures.py --lang <code> --topic sports` ×9 — clean.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr` — clean. Run `node scripts/check_work_integrity.mjs` too; it can report
      index-shift false alarms after a splice, so verify flagged units by stamp against HEAD.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the Latin pipeline paths — 0.
- [ ] `npm run build` — exit 0.
- [ ] Browser: `/school/charlotte-latin?lang=es&topic=sports` and `?lang=fa`, card open:
      the four prose fields are translated; `63`, `22`, `8`, `54%`, `2024–26` are intact and
      the `fa` range is not reversed; the roster sport chips are translated, with none in
      English. The teaser headline is checked closed. Compare `?lang=es` shows 8 / 22 and the
      translated qual.

## Risks

| Risk | Mitigation |
|---|---|
| A roster sport path lands on no unit after the index shift, rendering English | Splice by stamp; `check:live` + `i18n:leaks` on `charlotte-latin:pipeline.roster[*].sport` |
| The `Not published` unit is still referenced elsewhere | It holds only Latin paths today (13, all Latin); the splice will report it dropped. If not, look before deleting |
| The realityCheck college list miscounts | Recount from the roster in step 3f before writing |
| Another session's files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Open questions

- **Prose wording** settles at the Phase 1 review. **Default:** as written in step 3.
- **Whether the headline should say "girls’ lacrosse" or "lacrosse"**: all four D1
  lacrosse commits are girls'. **Default:** "girls’ lacrosse".

## Implementation notes

- **Phase 2 matched the forecast exactly** in all nine locales: in `sports`, 5 units were added and 6 dropped. In `metric-values`, 2 were added and 2 dropped. The unchanged Class of 2027 sentence in `rosterNote` reuses each locale's shipped wording from HEAD.
- **The Phase 2 browser check expected that no roster sport chip would render in English. That expectation was wrong.** Eight locales deliberately keep bare roster sport names (`Swimming`, `Girls Lacrosse`) as identifiers, per the roster convention recorded in `src/data/overlays/NOTES.md`. Only `ar` translates them. This holds on every school's roster and predates this plan.
- `check_work_integrity.mjs` reported index-shift violations after the splice, as expected. A by-stamp comparison against HEAD found all 17,415 kept units byte-identical.
