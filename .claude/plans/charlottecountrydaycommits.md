---
name: charlottecountrydaycommits
title: Charlotte Country Day College Pipeline — verified 2024–26 refresh (48 / 28 D1 / 9 P4), Parker sport fix, Compare D1 25 → 28
status: english-done
phases: 2
created: 2026-11-08
branch: feat/charlotte-country-day-commits-2026
prs: []
---

# Charlotte Country Day College Pipeline — verified 2024–26 refresh

## Goal

The `/athlete-commits` graduate refresh of 2026-11-08 cross-referenced every Charlotte
Country Day varsity roster (MaxPreps, 19 sport slugs, 2023-24 → 2026-27) against the 17
HighSchoolOT trackers, RealGM, LaxNumbers, Team 91 Charlotte, the NC Football News trackers
and college pages. It found **no athlete the school's own lists lack**: Country Day
publishes a named list per class with a total (17 / 18 / 13 = **48**), and every source
agreed with it. It did find five errors in what ships. This plan corrects them. Done when
the Country Day page shows funnel 48 / 28 / 9, Carlin Parker under Boys Basketball, the
recounted sport bars and the corrected Ivy count, Compare reads Division I **28**, and
`npm run build` is green in all ten locales.

## Context

### The source (read these first)

All in `source-material/sports/charlotte-country-day/`, written by `/athlete-commits`,
**uncommitted**:

- `CCD - Sports - College Commitments 2024-2026.md` — **rebuilt.** One table per class with
  a *Confirmed by* column, the school's per-class post URLs, the Kendall Blount decision,
  the totals table, the *Changes from the shipped card* list (items 1–5) and the Excluded
  list. The filename is kept: it folds onto `matriculation` via
  `/d1|matriculation|college commitments/i` in `src/lib/metrics.ts` (~line 287).
- `Charlotte Country Day - Sports - Varsity Roster Cross-Reference 2026.md` — **new.**
  Method, tiers per sport, seniors per sport and class (counts only), leads ruled out,
  unchecked rosters, window check. Folds onto `redesign-research` via the existing
  `/roster cross-reference/i` rule (~line 281) — **no `metrics.ts` change.**
- `Charlotte Country Day - Sports - College Commitments Class of 2027.md` — **extended**:
  0 confirmed, 2 leads (Katy Blythe → Furman, Harris Hatcher → Saint Joseph's; both
  LaxNumbers-only). `seniors-committed` stays `'0'`.
- `Charlotte Country Day - Sports - Redesign Research 2026.md` — §3 now opens with a
  superseded note.

### The card today (`src/data/sportsPrograms/charlotte-country-day.ts`, `pipeline`, lines ~221–324)

- `headline` (line ~224): `'51 college commitments across 2024–26, 28 of them Division I and 9 Power 4 — with swimming as the clear engine.'`
- `funnel[]`: `'51'` (width 1) / `'28'` (0.55) / `'9'` (0.18).
- `funnelNote` (~245): `'Swimming supplies five of the nine Power 4 commits — including all three from the class of 2026, to Stanford, Florida and Purdue. Six commitments went to Ivy League programs, a share matched by no other school in this comparison and consistent with Country Day’s academic profile.'`
- `sportBars` (~246–255): Swimming 8 (p4 0.63), Track / XC 8 (p4 0.25), Tennis 2 (0.25 / p4
  0.13), Soccer 2, Basketball 1, Equestrian 1 (p4 0.13), Field Hockey 1, Other 5 — /8 scale.
- `realityCheck`, `rankedRecruits`, `subhead`, `rosterNote` — all still true; **unchanged**.
- `roster[]`: **47 rows**, '26 13 (indexes 0–12), '25 18 (13–30), '24 16 (31–46); no '27
  verbal rows. Carlin Parker is **index 29**:
  `{ cls: "'25", name: 'Carlin Parker', sport: 'Girls Basketball', college: 'Tampa', conf: 'SSC', level: 'D2' }`.
- Counted from the rows: 47 · **D1 28** · **P4 9**; D1 by sport Track / XC 9 (2 P4),
  Swimming 7 (5 P4), Tennis 2 (1), Soccer 2, Basketball 1, Equestrian 1 (1), Field Hockey 1,
  Other 5 (Crane baseball, Wright football, McCurdy girls lacrosse, McCall volleyball,
  O'Shea golf). Ivy: **5**.

### Compare (`src/data/metricValues.ts`)

- `p4-commits-2426` `'charlotte-country-day': '9'` (~line 2299) — unchanged.
- `d1-commits-2426` `'charlotte-country-day': '25'` (~2345) — **stale**; the '26 D1 rows
  Youakim (Bucknell), Daniell (Tulane) and Crane (Queens) never reached it. → `'28'`.
- `seniors-committed` `'charlotte-country-day': '0'` (~2404) — value unchanged, comment update.
- Country Day has **no `quals` entry** on the first two rows (only `SENIORS_QUAL` on the
  third).

### Overlay units here

From `src/data/overlays/work/sports.<lang>.json` (units keyed by English text, each with an
`at` list of paths): `charlotte-country-day:pipeline.headline`, `.funnelNote`,
`.realityCheck` are single-path units; roster `sport` values are **shared** units —
`'Girls Basketball'` and `'Boys Basketball'` each already carry many paths across schools.
`funnel[].count`, `sportBars[]`, roster names/colleges/levels and `sources[].label` are not
extracted. So the Parker fix **moves path `charlotte-country-day:pipeline.roster[29].sport`
from the Girls Basketball unit to the Boys Basketball unit** — no new text. Phase 2 is
**2 prose units** (headline, funnelNote).

## Decisions

- **Kendall Blount ('24, Louisville cheer) is counted in the funnel total only** — user
  decision 2026-11-08. Not a roster row, not in D1/P4: cheer is not an NCAA-sponsored
  sport, and labelling an ACC school's cheer squad P4 would be false. One funnelNote
  sentence names it (without her name) so 48 vs 47 rows is explained.
- **Funnel total 48**, the school's own published count (17 + 18 + 13), not the 47 roster
  rows — the card's figure then matches the school's page exactly.
- **Sport bars reordered Track / XC first** — bars sort by D1 count on every card; track
  (9) now leads swimming (7). Scale /9.
- **Ivy count six → five**; "matched by no other school" stays — still true (Catholic 4,
  Providence Day 4).
- **Headline drops "swimming as the clear engine"** — swimming leads Power 4 (5 of 9) but
  track leads Division I (9 of 28), so "the clear engine" overstates it.
- **`realityCheck` unchanged** — "Swimming is unambiguously the Power 4 engine — five of
  nine P4 commits, and every 2026 P4 signee" stays true, and nothing in it depends on the
  8 / 8 split.
- **No `quals` added** for Country Day — every row is on the school's own list, so neither
  "documented minimum" nor a new "verified" qual earns nine new units.
- **`sources[]` gains the Class of 2024 and Class of 2026 school posts and the Tampa
  release** — the pages behind the total and the one sport change.
- **No new athlete, no `'27` verbal rows** — both leads are single-source.
- **Plan name `charlottecountrydaycommits`** — fixed by the `/athlete-commits` handoff.

## Approvals needed

**None.** The card and all three Compare rows exist; every change fills existing fields.
The one judgment call (Blount) was decided by the user during the research run.

## Source material

| File | State | Role |
|---|---|---|
| `CCD - Sports - College Commitments 2024-2026.md` | rebuilt | provenance for the card and both window rows |
| `Charlotte Country Day - Sports - Varsity Roster Cross-Reference 2026.md` | new | method, nulls, unchecked |
| `Charlotte Country Day - Sports - Redesign Research 2026.md` | §3 note added | points at the two files |
| `Charlotte Country Day - Sports - College Commitments Class of 2027.md` | 2 leads | `seniors-committed` stays `'0'` |

`/implement` ingests them first (step 2).

## Out of scope

- Any new athlete (there is none); Blythe and Hatcher belong to the next current-senior pass
  after the early signing period (opens 2026-11-11).
- Rolling the 2024–26 window (not due — the most recently graduated class is 2026).
- `rankedRecruits`, `subhead`, `rosterNote`, `realityCheck`; any other school; any component.
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/charlotte-country-day-commits-2026` from a freshly pulled `main`.
   `git status --short` must show only the four source-material paths above (plus this plan
   and `INDEX.md` if not yet committed); anything else belongs to another session — leave it.

2. **Ingest** — run the `ingest-source-material` skill for `sports` / `charlotte-country-day`.
   It regenerates `.claude/docs/sports/charlotte-country-day.md` and `src/data/schools.json`.
   Then: `git diff --stat src/data/schools.json` (only Country Day sports entries; on a
   wholesale reorder restore `HEAD` order — see memory *two-topic ingest reorders the
   manifest*), `npm run check:metrics` (exit 0), `npm run schema && npm run check:schema`
   (commit `DATA-SCHEMA.md` only if it changed).

3. **Edit the pipeline card** in `src/data/sportsPrograms/charlotte-country-day.ts`.

   a. **Roster** — index 29 only: `sport: 'Girls Basketball'` → `sport: 'Boys Basketball'`
      on the Carlin Parker row. Nothing else in `roster[]` moves.

   b. **`headline`** →
      `'48 college commitments across 2024–26, 28 of them Division I and 9 Power 4 — with track and cross country supplying the most Division I commits and swimming the most Power 4.'`

   c. **`funnel[]`** — counts `'48'`, `'28'`, `'9'`; widths `1`, `0.58`, `0.19`. Labels,
      hints, shades unchanged.

   d. **`funnelNote`** →
      `'Swimming supplies five of the nine Power 4 commits — including all three from the class of 2026, to Stanford, Florida and Purdue — while track and cross country supply the most Division I commits, nine. Five commitments went to Ivy League programs, a share matched by no other school in this comparison and consistent with Country Day’s academic profile. The school’s count of 48 includes one signee in college cheer, which sits outside the NCAA divisions shown here.'`
      Typographic apostrophes as the file uses.

   e. **`sportBars`** →
      ```ts
      { sport: 'Track / XC', count: 9, width: 1, p4Width: 0.22 },
      { sport: 'Swimming', count: 7, width: 0.78, p4Width: 0.56 },
      { sport: 'Tennis', count: 2, width: 0.22, p4Width: 0.11 },
      { sport: 'Soccer', count: 2, width: 0.22 },
      { sport: 'Basketball', count: 1, width: 0.11 },
      { sport: 'Equestrian', count: 1, width: 0.11, p4Width: 0.11 },
      { sport: 'Field Hockey', count: 1, width: 0.11 },
      { sport: 'Other', count: 5, width: 0.56 },
      ```
      Sums to 28; P4 widths sum to 9/9. Same sport labels as today.

   f. **`sources[]`** — append:
      ```ts
      {
        label: 'charlottecountryday.org — Class of 2024 college athletes (17)',
        url: 'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/class-of-2024-celebrates-impressive-college-admissions-success-and-scholarship-awards',
      },
      {
        label: 'charlottecountryday.org — Class of 2026 college athletes (13)',
        url: 'https://www.charlottecountryday.org/bucsnet/post-details/~board/school-news/post/class-of-2026-college-admissions-outcomes',
      },
      {
        label: 'University of Tampa — 2025–26 men’s basketball incoming class (Carlin Parker)',
        url: 'https://tampaspartans.com/sports/mbkb/2025-26/releases/20250826kc8vro',
      },
      ```

4. **Compare rows** in `src/data/metricValues.ts`:
   - `d1-commits-2426`: `'charlotte-country-day': '28', // ’24: 10 · ’25: 12 · ’26: 6 — every row on the school’s own per-class list (17 / 18 / 13), cross-referenced 2026-11-08`
   - `p4-commits-2426`: value `'9'` unchanged; append ` — on the school’s own lists, cross-referenced 2026-11-08` to the comment.
   - `seniors-committed`: value `'0'` unchanged; comment →
     `// none confirmed; leads: Blythe (Furman lacrosse), Hatcher (Saint Joseph’s lacrosse), both LaxNumbers-only; re-check after the 2026-11-11 signing period`

5. **Checks and browser** — see Verification. Commit with explicit paths (the four
   source-material files, `src/data/sportsPrograms/charlotte-country-day.ts`,
   `src/data/metricValues.ts`, `src/data/schools.json`,
   `.claude/docs/sports/charlotte-country-day.md`, `DATA-SCHEMA.md` only if changed, this
   plan, `INDEX.md`), push, verify `git rev-parse HEAD` against `git ls-remote origin
   <branch>`. Flip this plan and the INDEX row to *English shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (read the list from `src/lib/i18n.ts`; today
`es bn ht te fr fa it hi ar`) on **one** overlay topic, `sports`. No `metric-values` unit,
no chrome catalogs. Mechanism: `.claude/docs/prose-translation-architecture.md`; recipe:
`providence-daycommits` / `cannoncommits2` Phase 2.

Expected new units per locale: **2** — `charlotte-country-day:pipeline.headline` and
`.funnelNote`. The Parker fix re-homes one path between two existing shared units
(`Girls Basketball` → `Boys Basketball`) with no new text. A third new unit means something
went wrong — stop and look.

1. `node scripts/i18n_splice_work.mjs --lang <code> --topic sports`, dry-run `es` first;
   confirm the diff is two new units plus the path move. Splice by stamp, never by path.
2. Translate by hand per locale, starting from each locale's shipped rendering of the old
   headline and funnelNote (the funnelNote keeps its first and Ivy sentences nearly intact:
   old `t` edited for "five" and the track clause, plus one new sentence). Figures
   char-for-char: `48`, `28`, `9`, `2024–26`, `2026`, `nine`/`five` as each locale already
   renders them. Keep Latin: Stanford, Florida, Purdue, Country Day, NCAA, Ivy League (as
   each locale's shipped text does). `fa`/`ar`: no isolates in the work file.
3. `npm run i18n:build -- --topic sports --lang <code>` ×9.
4. Phase 2 checks, commit with explicit paths, push (verify SHA), PR with `--body-file`,
   `gh pr merge --squash --delete-branch`, `git checkout main && git pull`, flip plan and
   INDEX to *Implemented* with the PR link (in the PR, or a follow-up PR — never on `main`).
   **Do not deploy.** Say "merged — ready to deploy whenever you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/charlotte-country-day/*.md` (4) | research, from `/athlete-commits` |
| `src/data/schools.json`, `.claude/docs/sports/charlotte-country-day.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/charlotte-country-day.ts` | Parker sport, headline, funnel, funnelNote, sportBars, 3 sources |
| `src/data/metricValues.ts` | D1 value 25 → 28; three comments |
| `src/data/overlays/work/sports.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean.
- [ ] `npm run check:metrics`, `npm run check:schema`, `npm run check:quals`,
      `npm run check:live`, `npm run check:chrome` — clean (check:live / check:chrome report
      the two changed units as awaiting translation, exit 0).
- [ ] `npm run build` — exit 0.
- [ ] Browser, `/school/charlotte-country-day`, Sports → The College Pipeline, card open:
      funnel 48 / 28 / 9; eight bars summing to 28 with Track / XC first (9) and Swimming
      second (7); roster 47 rows with Carlin Parker reading Boys Basketball · Tampa · SSC ·
      D2; the D1 and P4 filter tabs count 28 and 9; the new headline and funnelNote render;
      the three new source links open.
- [ ] Browser, `/compare?schools=charlotte-country-day,providence-day` (Sports): Country Day
      reads **28** on Division I commits and **9** on Power 4; the leader tint is unchanged
      (Providence Day leads both).

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live` — all nine resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 — 0;
      `python3 scripts/check_figures.py --lang <code> --topic sports` ×9 — clean.
- [ ] `npm run check:digits`, `check:dates`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr` — clean; `node scripts/check_work_integrity.mjs` (it can fail after any
      splice — verify flagged units by stamp, per memory *comparerows shipped*).
- [ ] `npm run i18n:leaks -- --lang <code>` ×9 on the two `at` paths and
      `roster[29].sport` — 0.
- [ ] `npm run build` — exit 0.
- [ ] Browser: `/school/charlotte-country-day?lang=es` and `?lang=fa`, card open: headline
      and funnelNote translated, `48`, `28`, `9`, `2024–26` intact and the `fa` range not
      reversed; Parker's sport chip reads the locale's Boys Basketball.

## Risks

| Risk | Mitigation |
|---|---|
| The path move leaves `roster[29].sport` on the old Girls Basketball unit in some locale | Splice by stamp; `check:live` + `i18n:leaks` on that path |
| An i18n checker treats the headline's figure-only change as identical text and carries the old translation | Old headline said 51 — `check:digits` / `check_figures.py` catch a stale `51` |
| Another session's untracked files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Open questions

- **Funnel total 48 (with the cheer signee) vs 47 roster rows** — decided by the user
  (48, total only). **Default:** as written.
- **Headline wording** — the Phase 1 review is where it settles. **Default:** as in step 3b.

## Implementation notes

### Phase 1 (2026-11-08)

- **`check:live` fails in Phase 1 on exactly 2 stamps per locale** (the old headline
  `c6d9e223` and funnelNote `28bf8a23`), the expected English-shipped state. The rest of the
  `npm run build` chain was run with only `check:live` removed: exit 0 (same as
  `charlottechristiancommits`).
- **`check:metrics` exits 1 on a pre-existing finding** — the unmatched subtopic
  `sports :: "Podcast Episode 33 Saleh Athletic Center"` (charlotte-christian, since #274).
  Nothing this plan touches.
- **The ingest also regenerated `.claude/docs/sports/charlotte-christian.md` and
  `src/content/sports/charlotte-christian.json`**: PR #454 edited that school's source file
  (Barton → Conference Carolinas) after its notes were built. Committed here as derived
  catch-up; no app data changed. `DATA-SCHEMA.md` changed (doc count 546 → 547) and is
  committed.
- **Browser** (`vite preview`, real Chrome): funnel 48 / 28 / 9; eight bars Track / XC 9,
  Swimming 7 … Other 5; 47 of 47 rows; tabs Division I 28, Power 4 9; Parker row
  `'25 · Boys Basketball · Tampa · SSC · D2`; new headline and funnelNote render; the three
  new source links render behind the Sources toggle and return HTTP 200. Compare
  (`?topic=sports&schools=charlotte-country-day,providence-day`): Country Day 9 / 28 / 0
  against Providence Day 16 / 39 / 10.
- **Phase 2 watch:** the Compare D1 value changed to `28`. Per `charlottechristiancommits`,
  a Compare value no school held before is its own `metric-values` unit — check whether `28`
  already exists there before assuming 2 units.
