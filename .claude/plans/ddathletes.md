---
name: ddathletes
title: Davidson Day — the eight Class of 2026 collegiate athletes from the school's 2025–26 Athletics Recap, on the College Pipeline card and the two Compare commit rows
status: english-done
phases: 2
created: 2026-11-08
branch: feat/dd-athletes-2026
prs: []
---

# Davidson Day's Class of 2026 collegiate athletes

## Goal

Davidson Day's own *2025-2026 Athletics Recap* (Issuu, 2026-06-01) names all **eight**
Class of 2026 athletes going on to college sports. The app's College Pipeline card names two
of them and says the school "published no named list" for 2026. This plan adds the six
missing athletes to the roster, moves the funnel from 10 / 9 D1 / 3 P4 to **16 / 11 D1 /
5 P4**, rewrites the four prose fields that describe the floor, and moves the two Compare
rows (`p4-commits-2426` 3 → 5, `d1-commits-2426` 9 → 11). Done when the Davidson Day page
shows 16 roster rows with the right level tags, the Compare rows read 5 and 11, every figure
traces to the committed source files, and `npm run build` is green in all ten locales.

**On the user's wording ("athletic scholarship").** The school's list is headed *Collegiate
Athletes*; it never says scholarship. Two of the eight go to Division III programs (Emory,
Berry), which award no athletic scholarships, and Nick Arnold joins Duke as a **preferred
walk-on**. The app's card already counts *documented commitments to college athletics*,
which is the only claim the sources support, so no "scholarship" figure is added. The plan
says so on the page in one sentence (step 4e) rather than leaving a parent to assume.

## Context

### The source (read these first)

- `source-material/sports/davidson-day/Davidson Day - Sports - Athletics Recap 2025-2026.md`
  — **new, uncommitted.** Full transcription of the publication's four athletics pages, a
  summary of the four booster pages, and a per-athlete verification table with URLs. Issuu
  blocks text export, so the pages were read as images; the file records that.
- `source-material/sports/davidson-day/Davidson Day - Sports - College Commitments 2024-2026.md`
  — **updated, uncommitted.** The designated provenance file for the two Compare rows. Its
  Class of 2026 table now has eight rows and its totals read 16 / 11 / 5.
- `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md`
  — **one superseded-note added, uncommitted**, under "## 3. College Pipeline".
- Publication: https://issuu.com/davidsondayschool/docs/25-26_athletics_in_review

### Verification status per athlete (planning-time, 2026-11-08)

| Athlete | College · conf · level | Confirmed by | Note |
|---|---|---|---|
| Nick Arnold | Duke · ACC · P4 | Duke 2026–27 roster (No. 55, G, Fr., Davidson Day); N&O 2026-05-15 | **preferred walk-on**; no 247 rating → no `rank247` |
| Kipenzi Perry | NC State · ACC · P4 | NC State 2026–27 roster (No. 20, D, Fr.); TopDrawerSoccer 2024-09-09 | — |
| Molly Brown | Flagler · Peach Belt · D2 | HighSchoolOT 2026 all-state ("Flagler (D2) recruit"); ULTIMATE Lacrosse commits | Flagler 2027 roster not out yet |
| Izzy Pierce | Wingate · South Atlantic · D2 | Wingate 2027 roster (Fr., Davidson Day HS); HighSchoolOT | — |
| Alex Haponik | Emory · UAA · D3 | Emory 2026 men's XC roster (Fr.); MileSplit signing as "Edward Haponik" | school prints Alex; use Alex |
| Sean Hayes | Berry · SAA · D3 | **school publication only**; Berry's 2026–27 roster not out | kept: the school's own list is the authority |

### Where it lands (all existing fields; confirmed by reading the files)

- `src/data/sportsPrograms/davidson-day.ts` — the `pipeline` card (lines ~274–345 today):
  `headline`, `subhead`, `funnel[]` counts and widths, `funnelNote`, `sportBars[]`,
  `realityCheck`, `roster[]`, `rosterNote`, `sources[]`; plus the file-header comment and a
  new URL constant beside `PROFILE` (line ~42).
- `src/data/metricValues.ts` — `p4-commits-2426` (line ~2288) and `d1-commits-2426`
  (line ~2334): the `'davidson-day'` value, its trailing comment, and the
  `quals['davidson-day'].text` on each (the two texts are identical today and share one
  translation unit; keep them identical).
- `src/lib/metrics.ts` — the `sports` rules (line ~273): the new source filename must fold
  onto `redesign-research` or `check:metrics` reports an orphan subtopic. Precedent: the
  `/school profile/i` rule added by `ddprofile2`.
- `src/data/sportsProgram.ts` — `CommitLevel` already allows `'D2'`; `Commit` rows carry
  `cls`, `name`, `sport`, `college`, `conf`, `level`, optional `rank247`. **No type change.**
- `src/components/SportsProgram.tsx` — renders every level with `LEVEL_TAG` (D2 and D3 are
  `tag-neutral`) and filters All / D1 / P4. **No component change.**

### Conventions the new rows follow

- Class string `"'26"`, as the existing Davidson Day rows.
- Sport labels reuse strings already in the roster vocabulary so no new translation unit is
  created: `'Boys Basketball'`, `'Girls Soccer'` (both used on this roster), `'Girls
  Lacrosse'` (Providence Day) and `'Track & Field'` (16 rows elsewhere). Do not write
  "Lacrosse" or "Track and Field".
- Conference strings reuse existing ones: `'ACC'`, `'Peach Belt'` (Carmel Christian),
  `'South Atlantic'` (Charlotte Catholic), `'UAA'`, `'SAA'` (this roster's Sewanee row).
- Within a class, rows run P4 → D1 → D2 → D3, as the existing '26 pair (Stevens, Peck) does.
- `sportBars[].width` is `count / max count`; `p4Width` is `P4 count / max count` on the
  same scale (today basketball 4 → width 1, 2 P4 → 0.5).
- Research bookkeeping stays dev-only: nothing on the page says "we could not confirm Sean
  Hayes". The `funnel[0].toVerify: true` marker stays (the 2024 class is still a floor).

### Why two phases

Five prose fields on the card and one shared Compare qual change in English. They are
research prose in the `sports` and `metric-values` overlay topics, so Phase 2 translates them
into the nine `PROSE_TRANSLATED` locales after the user has seen the English rendered. The
six new roster rows add no prose: `name`, `college`, `conf`, `level`, `cls` are skipped
identifier fields, and the four `sport` values attach to existing identifier units.

## Decisions

- **Add all eight as commitments, walk-on included** — the card measures documented
  commitments to college athletics; the school lists Arnold as a collegiate athlete and Duke's
  roster carries him. One page sentence says he is a preferred walk-on (step 4e).
- **No "scholarship" count anywhere** — no source gives one, and D3 rows would make it wrong.
- **Sean Hayes goes on the roster on the school's word alone** — the school's own
  publication is the authority in this project; the gap is recorded in source-material only.
- **"Alex Haponik", not "Edward"** — the school prints Alex on every list; Emory's roster
  prints Alex. MileSplit's "Edward" is noted in source-material.
- **Flagler's conference is `Peach Belt`** — her first season (spring 2027) is Flagler's
  last in that league; the 2027–28 move to the Sunshine State Conference is one clause in
  `rosterNote`, not a different label.
- **No `rank247` for Arnold** — 247Sports shows no rating; the field is omitted, never a
  placeholder (schema rule).
- **Sport labels** — `'Track & Field'` for Haponik and Hayes (the school's own label; Emory
  lists Haponik under cross country, but the roster label follows the school).
- **Honors card untouched** — the Recap's all-state, MVP and records lists have no home
  beyond what `ddprofile2` already carried (16 all-state, 200 m title, 5 runners-up).
- **Middle-school names are not transcribed** anywhere (memory rule "No minor student
  names"); the source file says so.
- **Plan name `ddathletes`** — derived from the task because the branch was `main`.

## Approvals needed

**None.** Every change fills fields on cards and Compare rows that already exist. No new
card, tile, row, metric key or component.

## Source material

Written during planning, **uncommitted**, all in `source-material/sports/davidson-day/`:

| File | State | Role |
|---|---|---|
| `Davidson Day - Sports - Athletics Recap 2025-2026.md` | new | transcription + per-athlete verification; needs the metrics.ts rule (step 2) |
| `Davidson Day - Sports - College Commitments 2024-2026.md` | updated | provenance for both Compare rows and the funnel |
| `Davidson Day - Sports - Redesign Research 2026.md` | one note added | points its stale §3 at the two files above |

`/implement` ingests them first (step 3). No raw PDF exists: Issuu serves page images only,
and an image-only PDF would ingest as an empty document, so none was saved. The image URLs are
in the Recap file.

## Out of scope

- Any Honors, Coaching or Facilities change from the Recap (the video board at Wolter Field
  stays a lead in source-material; Davidson Day's Facilities card is omitted by design).
- Naming the 200 m champion (decided in `ddprofile2`).
- Re-checking Sean Hayes against Berry's roster once it is published — a later pass.
- Other schools' 2026 classes.
- Deploying. Merge, then stop.

## Steps

### Phase 1 — English

1. **Branch** `feat/dd-athletes-2026` from a freshly pulled `main`. `git status --short`
   must show only the three source-material paths above.

2. **Fold the new source file onto the research dossier** — `src/lib/metrics.ts`, `sports`
   rules, directly after the `/school profile/i` line (~273):
   ```ts
   // "… - Sports - Athletics Recap <years>" transcribes the school's own season-review
   // publication (collegiate athletes, all-state list, milestones). Provenance for the
   // pipeline card, not a card of its own.
   { match: /athletics recap/i, key: 'redesign-research', label: 'Sports Research Dossier (2026)' },
   ```

3. **Ingest** — run the `ingest-source-material` skill for `sports` / `davidson-day`. It
   regenerates `.claude/docs/sports/davidson-day.md` and `src/data/schools.json`. Then:
   - `git diff --stat src/data/schools.json` — only Davidson Day sports entries should move;
     if the manifest reorders wholesale, restore `HEAD`'s order (memory
     `two-topic-ingest-reorders-manifest`).
   - `npm run check:metrics` — exit 0, no "unmatched subtopic" for `athletics-recap-2025-2026`.
   - `npm run schema && npm run check:schema` — commit `DATA-SCHEMA.md` only if it changed.

4. **Edit the pipeline card** in `src/data/sportsPrograms/davidson-day.ts`:

   a. Add a constant beside `PROFILE` (~line 42):
      `const RECAP = 'https://issuu.com/davidsondayschool/docs/25-26_athletics_in_review'`
      and add the Recap file to the header comment's provenance list (lines 3–4).

   b. `headline` →
      `'Sixteen documented commitments across 2024–26, eleven of them Division I and five Power 4 — a high conversion rate for a 565-student school.'`

   c. `subhead` →
      `'Basketball still leads with five D1 commits — signees to North Carolina, Clemson and Dayton and a preferred walk-on at Duke — but the Class of 2026 also sent athletes to NC State soccer, two Division II lacrosse programs and two Division III track programs.'`

   d. `funnel[]`: counts `'16'`, `'11'`, `'5'`; widths `1`, `0.69`, `0.31`. Keep labels,
      hints, shades and `toVerify: true` on the first stage.

   e. `funnelNote` →
      `'These are documented floors, not a census. The school published a full seven-athlete list for the Class of 2025, and its 2025–26 Athletics Recap names all eight collegiate athletes in the Class of 2026 — but no equivalent list exists for the Class of 2024, so that class is almost certainly understated. Collegiate athlete is the school’s term, not scholarship athlete: Nick Arnold joined Duke as a preferred walk-on, and Division III programs such as Emory and Berry award no athletic scholarships. The school states that more than 100 Davidson Day athletes have gone on to compete at 80 different colleges.'`

   f. `sportBars` →
      ```ts
      { sport: 'Basketball', count: 5, width: 1, p4Width: 0.6 },
      { sport: 'Soccer', count: 3, width: 0.6, p4Width: 0.2 },
      { sport: 'Volleyball', count: 2, width: 0.4 },
      { sport: 'Lacrosse', count: 2, width: 0.4 },
      { sport: 'Track & Field', count: 2, width: 0.4 },
      { sport: 'Swimming', count: 1, width: 0.2 },
      { sport: 'Equestrian', count: 1, width: 0.2, p4Width: 0.2 },
      ```

   g. `realityCheck` →
      `'The unusual thing here is still the ratio: eleven of sixteen documented commitments are Division I, where larger peer schools convert closer to a third. Through 2025 the story was almost entirely one nationally visible basketball program; the Class of 2026 broadened it, with a soccer signee at NC State, two lacrosse players bound for Division II programs and two track athletes bound for Division III schools — so the experience for an athlete outside basketball now has examples of its own.'`

   h. `roster[]` — replace the two '26 rows with these eight, in this order, keeping the
      existing Stevens and Peck rows (with their `rank247`) verbatim; the '25 and '24 rows
      follow unchanged:
      ```ts
      { cls: "'26", name: 'Will Stevens', … existing row … },
      { cls: "'26", name: 'Nick Arnold', sport: 'Boys Basketball', college: 'Duke', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Kipenzi Perry', sport: 'Girls Soccer', college: 'NC State', conf: 'ACC', level: 'P4' },
      { cls: "'26", name: 'Cody Peck', … existing row … },
      { cls: "'26", name: 'Molly Brown', sport: 'Girls Lacrosse', college: 'Flagler', conf: 'Peach Belt', level: 'D2' },
      { cls: "'26", name: 'Izzy Pierce', sport: 'Girls Lacrosse', college: 'Wingate', conf: 'South Atlantic', level: 'D2' },
      { cls: "'26", name: 'Alex Haponik', sport: 'Track & Field', college: 'Emory', conf: 'UAA', level: 'D3' },
      { cls: "'26", name: 'Sean Hayes', sport: 'Track & Field', college: 'Berry', conf: 'SAA', level: 'D3' },
      ```
      Names, colleges and class years are copied from the Recap file char-for-char.

   i. `rosterNote` →
      `'The Class of 2024 is under-represented because the school published no signing list for that year. The Class of 2026 is complete: the school’s 2025–26 Athletics Recap names all eight. Level labels and conferences were added by the researcher from each college’s NCAA status; Flagler competes in the Peach Belt Conference through 2026–27 and joins the Sunshine State Conference in 2027–28.'`

   j. `sources[]` — keep the existing six and add, after the School Profile entry:
      ```ts
      { label: 'Davidson Day — 2025–26 Athletics Recap (Collegiate Athletes, p.3)', url: RECAP },
      { label: 'Duke — 2026–27 men’s basketball roster', url: 'https://goduke.com/sports/mens-basketball/roster' },
      { label: 'News & Observer via Yahoo — Nick Arnold joins Duke as a preferred walk-on', url: 'https://sports.yahoo.com/articles/did-duke-basketball-just-next-101500311.html' },
      { label: 'TopDrawerSoccer — recruiting roundup, Sept. 2024 (Perry to NC State)', url: 'https://www.topdrawersoccer.com/club-soccer-articles/recruiting-roundup:-september-9-15_aid53778' },
      { label: 'HighSchoolOT — 2026 all-state girls lacrosse (Brown, Pierce)', url: 'https://www.highschoolot.com/story/the-2026-highschoolot-all-state-girls-lacrosse-team/22375831/' },
      { label: 'Wingate — Izzy Pierce, 2027 roster', url: 'https://wingatebulldogs.com/sports/womens-lacrosse/roster/izzy-pierce/14800' },
      { label: 'Emory — 2026 men’s cross country roster', url: 'https://emoryathletics.com/sports/mens-cross-country/roster' },
      ```
      (`sources[].label` is not extracted for translation — confirmed against the `es`
      work file — so these add no Phase 2 units.)

5. **Compare rows** in `src/data/metricValues.ts`:
   - `p4-commits-2426` → `'davidson-day': '5', // ’25 Denis (UNC), Gordon (Georgia) · ’26 Stevens (Clemson), Arnold (Duke, walk-on), Perry (NC State)`
   - `d1-commits-2426` → `'davidson-day': '11', // ’24: M.Smith · ’25: Denis, Doty, Glass, Gordon, Seifert, K.Smith · ’26: Stevens, Peck, Arnold, Perry (2024 under-documented — floor; 2026 complete per the school’s Athletics Recap)`
   - Both `quals['davidson-day'].text` (identical, one shared unit) →
     `'A documented minimum: the Class of 2024 is under-documented for Davidson Day. The Classes of 2025 and 2026 come from the school’s own published lists.'`

6. **Checks and browser** — see Verification, Phase 1. Then commit with explicit paths
   (`git add` the three source-material files, `src/lib/metrics.ts`,
   `src/data/sportsPrograms/davidson-day.ts`, `src/data/metricValues.ts`,
   `src/data/schools.json`, `.claude/docs/sports/davidson-day.md`, and `DATA-SCHEMA.md` only
   if changed), push, verify `git rev-parse HEAD` against `git ls-remote origin
   feat/dd-athletes-2026`, open the PR with `--body-file`. Flip the INDEX row to *English
   shipped*.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope: the nine `PROSE_TRANSLATED` locales (es, bn, ht, te, fr, fa, it, hi, ar) on two
overlay topics: `sports` and `metric-values`. **No chrome catalogs.** Mechanism:
`.claude/docs/prose-translation-architecture.md`; proven recipe: `ddprofile2`'s Phase 2 and
memory `ddprofile-shipped` / `ddprofile2-shipped`.

Expected units per locale: **6** — sports 5 (`davidson-day:pipeline.headline`, `.subhead`,
`.funnelNote`, `.realityCheck`, `.rosterNote`) and metric-values 1 (the shared qual at
`[42].quals.davidson-day.text` + `[43].…`; the indices may differ, match by text). The six new
roster rows should add `at` paths to the existing `Boys Basketball`, `Girls Soccer`, `Girls
Lacrosse` and `Track & Field` units, not new units. If the splice reports a seventh new unit,
stop and find out why before writing.

1. **Splice by stamp:** `node scripts/i18n_splice_work.mjs --lang <code> --topic sports` and
   `--topic metric-values`, dry-run `es` first and explain the added/dropped counts.
2. **Translate the six units by hand per locale**, reusing each locale's existing terms for
   "documented floors", "Division I", "Power 4", "preferred walk-on" (es already renders the
   Charlotte Christian walk-on sentence — reuse it), "Peach Belt Conference", "Sunshine State
   Conference" (proper nouns, Latin script).
   - Figures copied char-for-char: `16`, `11`, `5`, `2024–26`, `565`, `2025–26`, `100`, `80`,
     `2026–27`, `2027–28`, `2024`, `2025`, `2026`. The number words "Sixteen / eleven / five"
     are words in English and translate as words.
   - Keep Latin: Duke, NC State, Emory, Berry, Flagler, Wingate, North Carolina, Clemson,
     Dayton, NCAA, D1 / Division I, Power 4.
   - `fa`/`ar`: ranges like `2024–26` and `2026–27` are bidi-neutral and are isolated at
     render (`check:bidi` passes them); never add isolates to the work file.
   - `hi`/`te`: no lakh/crore figure here (nothing ≥ 1,000).
3. **Rebuild:** `npm run i18n:build -- --topic sports --lang <code>` and the same for
   `metric-values`, every locale.
4. Run the Phase 2 checks, commit with explicit paths, push and verify the SHA, update the
   PR body, squash-merge, `git checkout main && git pull`, flip the plan and INDEX row to
   *Implemented* with the PR link. **Do not deploy.**

## Files touched

| File | Change |
|---|---|
| `source-material/sports/davidson-day/Davidson Day - Sports - Athletics Recap 2025-2026.md` | new (written in planning) |
| `source-material/sports/davidson-day/Davidson Day - Sports - College Commitments 2024-2026.md` | updated (planning) |
| `source-material/sports/davidson-day/Davidson Day - Sports - Redesign Research 2026.md` | superseded note (planning) |
| `src/lib/metrics.ts` | one `sports` rule: `/athletics recap/i` → `redesign-research` |
| `src/data/schools.json`, `.claude/docs/sports/davidson-day.md` | regenerated by ingest |
| `.claude/docs/DATA-SCHEMA.md` | regenerated; commit only if changed |
| `src/data/sportsPrograms/davidson-day.ts` | pipeline card: 6 roster rows, funnel, bars, 5 prose fields, 7 sources, constant, header |
| `src/data/metricValues.ts` | two values, two comments, one shared qual text |
| `src/data/overlays/work/{sports,metric-values}.<9>.json` + built overlays | Phase 2 |
| `.claude/plans/INDEX.md`, this file | status flips |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (memory: trust `tsc -b`, not `--noEmit`).
- [ ] `npm run check:metrics` — exit 0; no orphan `athletics-recap-2025-2026` subtopic.
- [ ] `npm run check:schema` — clean (regenerate with `npm run schema` if it fails and commit
      the doc).
- [ ] `npm run check:quals` and `npm run check:live` — clean (`check:live` cannot see a unit
      that is brand new; it will pass by construction here, so do not read it as proof).
- [ ] `npm run build` — exit 0.
- [ ] Browser, `npm run dev`, `/school/davidson-day`, Sports → The College Pipeline, card
      open: funnel reads 16 / 11 / 5; seven sport bars with Basketball widest and its P4
      overlay at 60%; roster shows 16 rows, eight tagged '26, with `P4` on Arnold and Perry,
      `D2` on Brown and Pierce, `D3` on Haponik and Hayes; the D1 tab shows 11 rows, the P4
      tab 5; the 247 columns still render for Stevens, Peck and Denis only; the seven new
      source links open.
- [ ] Browser, `/compare`, Sports section: Davidson Day reads **5** on Power 4 commits and
      **11** on Division I commits, each with its qual tooltip; the leader tint on both rows
      is unchanged (Providence Day 17 / 39 still leads).
- [ ] `npm run audit:mobile` is not required (no layout change), but the roster at 320px
      should still scroll inside the card, not the page — eyeball once with every card open.

### Phase 2 — Locales

- [ ] `npm run check:runtime && npm run check:live` — all nine locales resolve.
- [ ] `npm run check:sepdrift -- --lang <code>` ×9 — 0 drifted;
      `python3 scripts/check_figures.py --lang <code> --topic sports` and `--topic
      metric-values` ×9.
- [ ] `npm run check:digits` — scoped to this branch's new stamps; 0 findings expected
      (number words are not digits, so "dieciséis" is fine).
- [ ] `npm run check:dates`, `check:moneytext`, `check:bidi`, `check:fa`, `check:hi`,
      `check:fr` — clean.
- [ ] `npm run i18n:leaks -- --lang <code>` ×9, filtered to the six `at` paths — 0.
- [ ] `npm run build` — exit 0.
- [ ] Browser: `/school/davidson-day?lang=es` and `?lang=fa`, pipeline card open: the five
      sentences render translated; `16`, `11`, `5`, `2024–26`, `2027–28` intact and reading
      left-to-right in `fa`; the roster's names, colleges and conferences stay Latin.
      `/compare?lang=es` Sports rows: the Davidson Day qual tooltip renders in Spanish.

## Risks

| Risk | Mitigation |
|---|---|
| Sean Hayes never appears on Berry's roster | Recorded as school-published-only in both source files; a later pass re-checks when the 2026–27 roster is published. The page states the school's list, which is the standard this project applies |
| A reader takes "collegiate athlete" to mean scholarship athlete | `funnelNote` says in one sentence that the term is the school's, that Arnold is a walk-on and that D3 awards no athletic scholarships |
| The new source filename slugifies into an orphan prose card | Step 2's rule; `check:metrics` gates it |
| A new `sport` string creates a per-locale identifier unit by accident | Labels are chosen from existing units (Context); the Phase 2 splice dry-run must report 6 units, not 7 |
| Ingest reorders `schools.json` wholesale | Restore `HEAD` order before committing (memory) |
| Another session's untracked files swept into the commit | Stage explicit paths; `git status --short` before each commit |

## Open questions

- **Should the Duke walk-on fact appear on the page at all?** Owner: user, at the Phase 1
  review. **Default:** yes, once, in `funnelNote` (step 4e) and once in `subhead`; it is the
  honest answer to "which of these are scholarship athletes".
- **Should the roster carry a visible "walk-on" marker per row?** That would be a new field
  on `Commit` and a chip in `SportsProgram.tsx`, i.e. a UX change needing approval.
  **Default:** no; prose only.
