---
name: wellsfargocup
title: Add a data-driven Wells Fargo Cup card to Sports, with Providence Day first
status: in-progress
phases: 2
created: 2026-10-31
branch: feat/wellsfargocup
prs: []
---

# Wells Fargo Cup card

## Goal

Add a Wells Fargo Cup card to the Sports research area, first on Providence Day (PD). It explains what the Cup is, then shows six seasons of official results for every covered school in PD's division. Headlines, tiles and comparisons are computed from a ledger, so a later school needs data, not component changes. This plan turns the card on for PD only, and ships a `/wells-fargo-cup` skill that adds each later school. The card must render every figure from the NCISAA's published tables, and `DATA-SCHEMA.md` must document the card and ledger.

## Context

- **Design:** project `5da24575-40bf-4787-8934-0fadfc56059f`, file `Sports Section Redesign.dc.html`, section `Turn 2 — Wells Fargo Cup card` (the file's lines 23–98). This is the visual reference. **Its figures and its "six straight" copy are wrong; see Decisions.** Read layout from it, never data.
- **Cards:** `SPORTS_CARDS` and `SportsProgram` in `src/data/sportsProgram.ts`. `SchoolDetail.tsx` renders a card only when `sports[c.key] != null` (line ~839), through the switch at line ~208. Bodies live in `src/components/SportsProgram.tsx`, sharing `Lead`, `StatStrip`, `Heading`, `ToVerify` and `SourceRow`. `WinningRecordBody` is the nearest pattern, including `.sports-scroll` around `.sports-matrix` for narrow screens.
- **Card titles:** `cards.sports.<key>` in `src/locales/en.json`, read by `cardTitle`.
- **Tokens:** the app renames the Industry tokens. Use `--accent`, `--accent-700`, `--bg`, `--text`, `--muted`, `--border`, `--heading`. The app has no `--color-*` or `--space-*` variables, so copying the design's names renders unstyled. Spacing is plain px, as in `.sports-*` (line ~2910 of `src/index.css`). Tags are `.tag-outline`, `.tag-neutral`, `.tag-accent`.
- **Numbers:** `number()` in `src/lib/format.ts`.
- **TO VERIFY:** `SHOW_TO_VERIFY` shows these tags on the dev server only (#381).
- **Ingest:** research prose in Sports does not render, but an unmatched `##` heading slugifies into an orphan key. The first `sports` rule in `RULES` (`src/lib/metrics.ts:255`) folds headings onto `redesign-research`.
- **i18n fields:** `SKIP_KEYS` in `scripts/i18n_fields.mjs` already skips `sport`; `label` is prose. An unknown leaf key is reported until classified.
- **Schema generator:** `scripts/gen_data_schema.mjs` has `STANDALONE` (line ~261), the `s.topic === 'sports'` rule block (~429), `K8_SPORTS_DROPPED` (~912) and a hardcoded "the four cards" heading (~934).
- **Existing Cup copy agrees with the official tables:** Country Day "most recently 2021–22"; Davidson Day 2019–20 and 2023–24. No edits needed.

## Decisions

**Data (user asked for the usual verification; these override the brief and the design)**

- **The ledger comes from official NCISAA tables, not the Gemini report.** Of 60 school-season cells, only the ten for 2025–26 matched; none of the 50 earlier cells did. The full comparison is under `## Method` in the source file.
- **PD won 5 of 6, not 6 of 6.** Country Day won 4A in 2021–22 (682.5); PD was 3rd (627.5). The headline becomes a current streak of four. PD's own "4th Cup Title in five years" through 2024–25 agrees.
- **PD's corrected tile values:** 5 / 6 Cups; peak 782.5 (2022–23); latest margin +2.5; best 2025–26 season 270 (spring).
- **Lead row:** +25, —, +170, +67.5, +10, +2.5.
- **All six seasons carry fall, winter and spring**, so these fields are stored for every NCISAA row. They stay optional for rows that lack them, such as Charlotte Catholic. The breakdown section still shows the latest year only.
- **No `~` values exist.** `isEstimate` is false everywhere. The `~` and TO VERIFY logic ships and is proven by the check script, as the rule requires. Following #381, that tag shows on dev only.
- **Hickory Grove gets no row on PD's card.** It was 3A in all six years; the design's 4A row came from Gemini. Carmel Christian stayed 4A throughout, so PD's table has no "In 3A" cell. The logic still ships for later schools, such as Davidson Day (2A, then 3A).
- **Point sources use the repo's vetted PD Winning Record, not Gemini:** football titles 2021, 2022, 2023, 2025 and runner-up 2024; girls soccer 2024–26; girls lacrosse 2025–26; girls swimming 2026; boys basketball runner-up 2024, 2026. Track and cross country are dropped because nothing supports "recurring point source". Outlines follow this list.
- **Cheerleading is off the NCISAA grid**, since it is not on NCISAA's sport list.
- **"Came down to the final event" is dropped** as unconfirmed.
- **Headings say "4A schools we cover", never "every Charlotte-area 4A school"**, because Metrolina Christian is Charlotte 4A and not in the roster.

**Build**

- **Card key `cup`, title `Wells Fargo Cup`, placed second: directly after `offered`, before `record`** (user, 2026-10-31). This fixed position holds for every school that has the card. Renumber `num` (`offered` 1a, `cup` 1b, `record` 1c … `national` 1h) and set every `kicker` to `of 08`.
- **Two data locations.** `src/data/wellsFargoCup.ts` holds the shared ledger, because one school's table needs other schools' rows. `cup` in the school's module holds point sources and citations, and its presence is what turns the card on. Only PD gets `cup` now.
- **Non-roster schools need separate rows.** A nearest rival or winner can be outside the roster (Greensboro Day won 3A in 2024–25), so `CUP_DIVISION_LEADERS` holds places 1–2 for 2A, 3A and 4A in all six years.
- **`Local school` means a school with a ledger row.** Short names live in `CUP_SHORT_NAMES`.
- **"Best season" means the best of fall/winter/spring in the latest year**, matching the design caption and the breakdown under it.
- **Card copy is chrome, not prose.** Everything is identical across schools or templated from data, so it goes under `sports.cup.*`. The only overlay prose is `cup.sources[].label`.
- **Lead row:** shown when the selected school finished 1st in at least one year; a year it did not win shows an em dash. If it never won, show a gap-behind-1st row instead.
- **Published places are copied as published**, including the two oddities noted in the source file. `tied: true` renders as `T14th`.
- **Comeback line is derived:** shown only when the selected school won the latest year while trailing the rival after winter.
- **PD only in this plan; later schools go through `/wells-fargo-cup`** (user, 2026-10-31). The skill follows the `learning-support` shape: it verifies, writes source material, then hands off to `/plan`. Writing the skill is a build step, because `/plan` may not edit it.
- **The design's SOURCE tag is not used.** `SourceRow` removed it by decision.

## Approvals needed

**None.** The Claude Design handoff is the UX approval (CLAUDE.md, UX-design standard). The corrected PD headline replaces the design's "six straight", so the user sees that wording at the Phase 1 review.

## Source material

Written during planning, uncommitted and uningested:

- `source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup Standings 2020-2026.md`: 60 school rows, Charlotte Catholic's 2025–26 row, 36 division-leader rows, scoring, sport lists, PD point sources, every URL, and the Gemini comparison under `## Method`.

Every `##` heading contains "Wells Fargo Cup" except `## Method`, which the ingest drops. The Gemini report is deliberately not saved, so its false figures cannot enter the pipeline.

## Out of scope

- A `cup` card for any school other than PD. Their ledger rows ship, their cards do not; the skill in step 11 adds them one at a time.
- Charlotte Catholic's seasons before 2025–26 (unverified), and its repo claim of 8 Cups.
- Compare rows, metric keys, and any deploy.
- Editing the Claude Design file.
- Podcast or Admissions content.

## Steps

### Phase 1 — English

1. **Branch and ingest.** Create `feat/wellsfargocup` from `main`. Add `wells fargo cup` to the alternation in the first `sports` rule in `src/lib/metrics.ts`. Then follow the `ingest-source-material` skill for that one topic with `build_docs.py sports`, and diff `src/data/schools.json` against `HEAD` so no topic was swept in. Run `npm run check:metrics`.

2. **Ledger.** Create `src/data/wellsFargoCup.ts`, with no `import.meta.glob`, so Node can import it:
   ```ts
   export type CupAssociation = 'NCISAA' | 'NCHSAA'
   export type CupRecord = {
     school: string            // app slug
     association: CupAssociation
     classification: string    // '2A' | '3A' | '4A' | '6A' …
     season: string            // '2025–26'
     place: number
     tied?: boolean
     points: number
     isEstimate: boolean
     fall?: number; winter?: number; spring?: number
   }
   export type CupDivisionLeader = Omit<CupRecord, 'school' | 'isEstimate'> & {
     school: string            // display name, as published
     slug?: string             // when the school is on our roster
   }
   export type CupSport = { key: string; gender: 'boys' | 'girls' | 'both' }
   ```
   Export `CUP_SEASONS` (six, oldest first), `CUP_RECORDS` (61 rows), `CUP_DIVISION_LEADERS` (36 rows), `CUP_SHORT_NAMES`, `CUP_POINTS` (`[50,45,40,35,30,25,20,15]`), and `CUP_SPORTS: Record<CupAssociation, Record<'fall'|'winter'|'spring', CupSport[]>>`. Transcribe all rows from the source file. Set `gender` on NCHSAA sports to `both` when the NCHSAA list names no gender. Add a one-line comment naming the source file.

3. **Computed logic.** Create `src/lib/wellsFargoCup.ts` with pure functions over those exports:
   - `divisionRows(slug)`: schools sharing the selected school's association and classification in at least one season, sorted by latest-season place. A school with no same-division season gets no row, and NCHSAA rows can never enter an NCISAA table.
   - `cell(row, season, selected)`: returns a same-division result, `{ otherClass }` for the "In 3A" state, or `null` for an em dash when no record exists.
   - `leadRow(slug)`: selected points minus the best other local school in that division and season, with `null` when the selected school did not finish 1st.
   - `gapBehindFirst(slug)`: from `CUP_DIVISION_LEADERS`.
   - `headlineStats(slug)`: `cupsWon`, `seasonsTotal`, `peak` with season, `latestMargin` (positive lead, or a gap when not 1st), `bestSeason` in the latest year, `currentStreak`, and `bestFinish`.
   - `nearestRival(slug, season)`: 2nd place if the selected school won, otherwise the winner; returns `null` when the selected school or the rival lacks split points, which hides the breakdown.
   - `isCupOutlined(cup, season, gender, sportKey)`.

4. **Types and registry.** In `src/data/sportsProgram.ts`, define:
   ```ts
   export type CupPointSource = { sport: string; gender: 'boys' | 'girls'; season: 'fall'|'winter'|'spring'; titleYears: number[]; runnerUpYears?: number[] }
   export type CupProgram = { pointSources: CupPointSource[]; sources: SportsSource[] }
   ```
   Add `cup?: CupProgram` to `SportsProgram` between `offered` and `record`, add `{ key: 'cup', … title: 'Wells Fargo Cup' }` as the second `SPORTS_CARDS` entry, and renumber `num`/`kicker` per Decisions. Update the 1a–1g list in the file's header comment to match. Change "seven" to "eight" in the header comments of `sportsProgram.ts`, `SportsProgram.tsx`, `metrics.ts` and `SchoolDetail.tsx`. Add `gender` to `SKIP_KEYS` in `scripts/i18n_fields.mjs`, and classify `season` at the `pointSources` path through `pathOverride` so it is skipped there.

5. **PD data.** Add `cup` to `src/data/sportsPrograms/providence-day.ts` with the five point sources from Decisions, in that order. Source `url`s are the NCISAA standings, history and sport pages, plus the WBTV football story. Add one `sources` row for the Charlotte Catholic note (VarsityNC).

6. **Component.** Add `WellsFargoCupBody({ slug, data })` to `src/components/SportsProgram.tsx`, with `case 'cup'` in the `SchoolDetail.tsx` switch. Its sections run top to bottom:
   1. Headline result through `Lead`.
   2. What is the Wells Fargo Cup? beside How points are earned, a four-by-two grid from `CUP_POINTS`.
   3. Sports that count, a three-column season grid built from `CUP_SPORTS[association]`, with outlines from `isCupOutlined`.
   4. Four headline numbers through `StatStrip`.
   5. Six-year table inside `.sports-scroll`.
   6. Latest-year fall/winter/spring bars, hidden when `nearestRival` is `null`, beside Where the points come from. The two sit in one grid, and the points list takes the full width when the bars are hidden.
   7. Notes: the NCHSAA note, shown on NCISAA schools only, then the table footnote.
   8. `SourceRow`.

   Render points with `number()`, prefix `~` from `isEstimate`, and wrap `+2.5` and `~595`-style tokens in `<bdi dir="ltr">`. Render `<ToVerify />` in the source area whenever any displayed row has `isEstimate`. Never-won path: no streak wording, headline the best finish, and show the gap in the margin tile and row.

7. **Styles.** Add a `.cup-*` block after the `.sports-*` rules in `src/index.css`. Use only the app tokens in Context. The selected row uses `background: var(--accent); color: var(--bg)`; other rows stay plain hairlines. Outlined sports use `border: 1px solid var(--accent); color: var(--accent-700)`. Give the table a `min-width` under the existing `.sports-scroll` rule. Collapse the two-column and three-column grids at the existing Sports breakpoint. Do not use a class beginning `ad-`.

8. **English strings.** Add `cards.sports.cup` plus `sports.cup.*` to `src/locales/en.json`, using interpolation and `count` plurals, never concatenation. Use these exact strings as the review copy:

   | Key purpose | English |
   |---|---|
   | Streak headline | `{{count}} straight {{association}} {{classification}} Wells Fargo Cups, and {{won}} of the last {{total}}.` |
   | Single title | `{{association}} {{classification}} Wells Fargo Cup winner, {{season}}.` |
   | Never won | `Best finish: {{place}} in {{association}} {{classification}}, {{season}}.` |
   | Subhead | `The {{season}} title was decided by {{margin}} points: {{points}} to {{rival}}'s {{rivalPoints}}.` |
   | What is it, 1 | `North Carolina's top award for overall athletic excellence. Instead of crowning one team, it scores a school's entire athletic program across a full academic year, so it rewards depth across many sports rather than one standout team.` |
   | What is it, 2 | `It was known as the Wachovia Cup before taking the Wells Fargo name. Two governing bodies award it separately: the NCISAA for independent private schools (1A–4A) and the NCHSAA for public schools. {{school}} competes in {{association}} {{classification}}.` |
   | What is it, 3 | `Points come only from official state championships. Club programs don't count.` |
   | Tie rule | `Schools tied at a finish split those points, so two losing semifinalists each get (40 + 35) ÷ 2 = 37.5.` |
   | Sports hint | `Every sport below can add points. Outlined: {{school}}'s main point sources. Football divisions each score separately.` |
   | Table heading | `{{count}} years · every {{classification}} school we cover` |
   | Table footnote | `Places are {{association}} {{classification}} finishes; gaps are schools we don't cover.` |
   | Other class | `In {{classification}}` |
   | Lead row | `{{school}} lead over next local school` |
   | Gap row | `Points behind 1st` |
   | Comeback | `{{rival}} led after fall and winter. {{school}}'s spring closed the gap and won by {{margin}} points.` |
   | NCHSAA note | `Charlotte Catholic competes in the public-school NCHSAA, where it won the 2025–26 Class 6A Cup (655 points). Its scores aren't comparable to this table.` |

   Build the NCHSAA note's school, year and points from its ledger row. Sport names, gender labels, season names, tile captions, title-year phrases and ordinals are keys too. Use i18next `ordinal: true` for places.

9. **Ledger gate.** Create `scripts/check_cup_ledger.mjs` as `npm run check:cup`, importing the `.ts` modules the way `gen_data_schema.mjs` imports `metricValues.ts`, and chain it into `build`. It fails on:
   - fall + winter + spring not equal to `points` on any row that has splits;
   - a duplicate school-season row;
   - `isEstimate` on a row with no `~` handling path;
   - a `pointSources` entry that is not in `CUP_SPORTS`;
   - a `divisionRows` result mixing associations.

   It also runs inline fixtures for a never-won school, a missing year, an "In 3A" year, an estimate row and hidden splits, and fails if any computed value differs. A negative test must corrupt the artifact under test and confirm which message printed.

10. **Data schema.** In `scripts/gen_data_schema.mjs`:
    - Add `{ file: 'wellsFargoCup.ts', root: 'CupRecord', title: 'Wells Fargo Cup ledger', note: … }` to `STANDALONE`.
    - Add a Cup rule block to the `s.topic === 'sports'` branch stating: the ledger is shared; official association tables only; the `cup` key enables the card; same-division rows; NCHSAA schools never appear in an NCISAA table; a non-roster rival goes in `CUP_DIVISION_LEADERS`; em dash for a missing year; every `~` wears TO VERIFY; and computed headline numbers are never hard-coded.
    - Add `cup` to `K8_SPORTS_DROPPED`, and make the "four cards" heading and prose use the array's length.

    Then in `.claude/skills/add-school/SKILL.md`, change "up to 7" at line 109 to "up to 8" and keep the K-8 figure at 3; update the worked example at line 188 only if it would now be false. Run `npm run schema` and `npm run check:schema`. The `add-school` edit is a count correction, so its `.claude/SKILLS.md` entry does not change.

11. **Skill: `/wells-fargo-cup`.** Create `.claude/skills/wells-fargo-cup/SKILL.md`, with frontmatter and sections shaped like `.claude/skills/learning-support/SKILL.md`. The description must trigger on `/wells-fargo-cup`, "add the Wells Fargo Cup for <school>", and "add the next school to the Cup card". The skill does this:
    - **Constraints:** it writes only `source-material/` and the plan (via `/plan`), never app code. Figures come only from the association's own published tables. An AI research report is a lead to check, never a source. No deploy.
    - **Ask which school**, if not given, and stop on any of these: the school is K-8 (`hasHighSchool: false`, no Cup), it already has `cup`, or it is not in `src/data/schools.json`.
    - **Re-verify the ledger.** Fetch every season's official table with `curl` and a browser user agent, then compare that school's `CUP_RECORDS` rows, plus the leaders of each division it played in. Record these URL and parsing traps: 2023–24 lives at `pastchampions2023-2024/`, 2024–25 at `past-champions-2024-2025/`, older seasons under `past-champions/`, and 2025–26 at `current-champions/`; 2020–21 and 2021–22 tables have no class headings and run 1A, 2A, 3A, 4A in order; blank cells mean 0; places are copied as published even when out of order. Assert fall + winter + spring equals the total. If a newer season has been published, add it to the brief.
    - **Build the point sources.** Start from that school's `record` card and research files, and confirm each title or runner-up year against a citable page. Every entry needs a sport key that exists in `CUP_SPORTS[association]`. Drop anything unconfirmed; never write "recurring point source". A list of zero is valid and omits that panel.
    - **NCHSAA branch (Charlotte Catholic):** its five earlier seasons are not in the ledger. Fetch NCHSAA's final standings per season with classification and place. Seasons that stay unverified are left out and show an em dash, never an estimate. NCHSAA tables usually give no fall/winter/spring splits, so the breakdown hides. Confirm girls' wrestling then, per Open questions, and correct `CUP_SPORTS.NCHSAA`.
    - **Report go / no-go.** Go needs at least one verified season for the school. Print verified seasons, any ledger corrections, the point sources kept and dropped, and the computed headline, four tiles and table rows that the school would show, so the user sees the result before any build. Include the never-won and "In 3A" states where they apply.
    - **Persist on a go** to `source-material/sports/<slug>/<School> - Sports - Wells Fargo Cup Standings 2020-2026.md`, with every `##` heading containing "Wells Fargo Cup" except `## Method`, and all URLs. Copy the shape of PD's file.
    - **Hand off to `/plan`** with the name `<slug>cup` and this scope: ledger corrections, the `cup` block in `src/data/sportsPrograms/<slug>.ts`, new `sports.cup.*` keys only if a sport or string is new, and sports overlays for the source labels. No component changes are expected; a needed one means the shared logic has a gap, so say so. The plan is two-phase because it adds citation labels.

    Then record the skill. In `.claude/SKILLS.md`, add an at-a-glance row, a full entry before Retired skills in the existing format (does, when to use, refuses), set **11 active**, update Last updated, and mention it in the paragraph under "The main road". In `CLAUDE.md`, add a short `### Wells Fargo Cup card — /wells-fargo-cup` section after the Learning Support section, stating the official-tables rule and that the card is second in Sports.

12. **Commit, PR, and review.** Run Phase 1 verification, stage explicit paths only, commit, open a PR with `--body-file`, and set the index row to `English shipped`. Do not merge.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs until they confirm the English version is what they want.

### Phase 2 — Every other locale

Scope is both layers, because the card adds chrome and a few prose citation labels.

1. **Chrome catalogs.** Translate `cards.sports.cup` and `sports.cup.*` into the nine non-English files listed by `TRANSLATED` in `src/lib/i18n.ts`: `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`. Arabic needs its six CLDR plural forms, and its `_two` form carries no `{{count}}`. Follow the memory notes on Arabic plurals.
2. **Prose overlay.** Add `cup.sources[].label` to the `sports.*.json` overlays per `PROSE_TRANSLATED`. Splice by stamp; never re-extract the whole file. The mechanism is in `.claude/docs/prose-translation-architecture.md`.
3. **Locale traps.** Figures are copied char-for-char. `fa` and `ar` use bidi isolates. `hi` and `te` regroup at render. Percent signs stay unspaced. Dates keep their digits. Use `src/data/overlays/NOTES.md` and the per-locale rollout docs.
4. **Finish.** Update the same PR, merge it with `gh pr merge --squash --delete-branch`, check out `main` and pull, set the index row to `Implemented`, and add `## Implementation notes` here if the build deviated. Do not deploy.

## Files touched

| File | Change |
|---|---|
| `src/data/wellsFargoCup.ts` | new: ledger, leaders, sport lists |
| `src/lib/wellsFargoCup.ts` | new: computed rules |
| `src/data/sportsProgram.ts` | edit: types, registry |
| `src/data/sportsPrograms/providence-day.ts` | edit: `cup` |
| `src/components/SportsProgram.tsx` | edit: card body |
| `src/pages/SchoolDetail.tsx` | edit: switch case, comment |
| `src/index.css` | edit: `.cup-*` styles |
| `src/lib/metrics.ts` | edit: fold rule, comment |
| `scripts/i18n_fields.mjs` | edit: field classification |
| `scripts/check_cup_ledger.mjs`, `package.json` | new gate, build chain |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit, regenerated |
| `.claude/skills/add-school/SKILL.md` | edit: card count |
| `.claude/skills/wells-fargo-cup/SKILL.md` | new: add-the-next-school skill |
| `.claude/SKILLS.md`, `CLAUDE.md` | edit: register the skill and the card |
| `src/locales/*.json` | Phase 1 `en`; Phase 2 the other nine |
| `src/data/overlays/sports.*.json` | Phase 2 |
| `src/data/schools.json`, `.claude/docs/*`, `src/content/*` | ingest output, sports only |
| `.claude/plans/wellsfargocup.md`, `.claude/plans/INDEX.md` | status |

## Verification

### Phase 1 — English

- [ ] `npm run check:cup` passes, and a deliberately corrupted row fails with the sum message; restore it afterwards.
- [ ] `npx tsc -b` is clean.
- [ ] `npm run check:metrics` passes with no new ⚠️ subtopic.
- [ ] `npm run check:schema` passes, and `DATA-SCHEMA.md` lists `cup`, the Cup rules and the ledger.
- [ ] `npm run check:chrome` passes, with non-English keys reported as awaiting translation.
- [ ] `npm run build` succeeds.
- [ ] Browser check of `/school/providence-day`, with the Sports `<details>` open: headline reads four straight and five of six; tiles read 5 / 6, 782.5, +2.5, 270; the table shows PD 3rd in 2021–22 and Country Day 1st; the lead row reads +25, —, +170, +67.5, +10, +2.5; Latin 2025–26 splits read 277.5 / 205 / 207.5.
- [ ] The Wells Fargo Cup card is second in Providence Day's Sports area, after Sports Offered and before Winning Record.
- [ ] Light and dark themes: the filled row stays readable.
- [ ] Other schools, including Charlotte Catholic, Trinity and Charlotte Prep, render no `cup` card.
- [ ] Skill dry run for Davidson Day, writing no files: it re-verifies the ledger, and its printed report shows 1 of 6 Cups (2023–24, 2A), a single-title headline, and the "In 2A" / "In 3A" cells. `.claude/SKILLS.md` lists 11 active skills.
- [ ] `npm run build && npx vite preview`, then `npm run audit:mobile` passes at 320, 360 and 390px with every card open.

### Phase 2 — Locales

- [ ] `npm run check:chrome`, `check:runtime`, `check:live`, `check:dates`, `check:bidi` and `check:moneytext` pass.
- [ ] `check:sepdrift` passes for each locale, and `check:fr` passes.
- [ ] `npm run audit:daterender`, `npm run audit:moneyrender`, and `npm run audit:mobile -- --lang <code>` for `ar` and `te`.
- [ ] Real-browser check of the open card in `es`, `fa`, `ar` and `hi`: `+2.5` reads correctly, and no English chrome remains.

## Risks

| Risk | Mitigation |
|---|---|
| Someone restores "six straight" from the design | The source file's Method and Decisions here state why; Phase 1 browser check asserts the figures |
| A future school ships a Gemini figure | The schema rule requires official tables |
| A new school's rival is off-roster | `CUP_DIVISION_LEADERS` holds places 1–2 in every division |
| A later school copies PD's point sources without checking | The skill requires a citable page per year and drops the rest |
| The wide table overflows phones | `.sports-scroll`, and `audit:mobile` with cards open |
| A new subtopic becomes an orphan key | Fold rule in step 1, confirmed by `check:metrics` |

## Open questions

- Should the "best season" tile cover all six years (357.5, spring 2022–23) instead of the latest? — **default:** latest year, as in the design.
- Does the NCHSAA sanction girls' wrestling separately? Its navigation lists only "Wrestling". — **default:** one `both` entry; re-check when a NCHSAA school gets the card.

## Implementation notes

Phase 1 deviations from the plan:

- **No PR yet.** Step 12 says to open the PR at the end of Phase 1. `/implement` says to commit to the branch and hold the PR until Phase 2, so both phases land in one PR. The branch is `feat/wellsfargocup`; Phase 2 opens the PR.
- **Phase 2 step 2 is expected to be a no-op.** `*.sources[].label` is `false` in `PATH_OVERRIDES` and `SourceRow` runs with `localizeLabels={false}`, so citation labels stay English by design and `cup` adds no overlay entries. Phase 2 is chrome catalogs only. The `/wells-fargo-cup` skill says the same: a data-only school is single-phase.
- **Collapsed teaser.** `SchoolDetail.tsx` reads `.headline` for each card's teaser, and `CupProgram` has none, so `wellsFargoCupHeadline(slug, t)` supplies the computed sentence.
- **Five added strings, each for a state the table did not cover:** `headlineMulti` (2+ titles, no current streak), `sportsHintPlain` (zero point sources, so no "Outlined" sentence), `raceResult` (the bars heading when the school did not win), `estimateNote` (the design's `~` footnote) and `pointsHint` (the design's caption).
- **`isComeback` is stricter than the plan.** The line says "led after fall and winter", so it requires the rival ahead after fall as well as after winter, not only after winter.
- **Helpers added to the logic:** `seasonRival` (totals only, for the subhead and margin, where `nearestRival` would hide on missing splits), `pointsToken` and `hasEstimate` (so `check:cup` can test the `~` path), `classLabel`, `recordsFor`, `cupName` and `nchsaaWinner`. Each rule takes the ledger as an optional last argument, so the fixtures never touch shipped data.
- **`seasonsTotal` counts seasons with a record,** not `CUP_SEASONS.length`, so an unverified season never reads as a lost one.
- **`StatStrip` widened** to accept a node value, so `+2.5` can sit in `<bdi dir="ltr">` while still using the shared strip.
- **`add-school` worked example** changed from 5/7 to 5/8 cards, since the old denominator was now false.
- **The six-year table shows all of 4A (user, 2026-10-31).** This overrides "4A schools we cover": 72 rows for 12 non-roster schools joined `CUP_RECORDS` from the same official tables, giving 19 rows, and the heading is now `{{count}} years · every {{association}} {{classification}} school`. `divisionRows` sorts by each school's latest shared season, then place, because Greensboro Day's 2nd in 3A would otherwise rank near the top. `leadRow` is now the margin over 2nd place from the leaders table, labelled `{{school}} lead over 2nd place`, since "local" no longer described the table; PD's values are unchanged. `check:cup` fails if a card's division is incomplete.
- **Two notes removed at the English review (user, 2026-10-31).** The NCHSAA/Charlotte Catholic note and the table footnote ("Places are … finishes; gaps are schools we don't cover") no longer render, so `sports.cup.nchsaaNote`, `sports.cup.footnote`, `nchsaaWinner` and PD's VarsityNC citation are gone. Charlotte Catholic's ledger row stays. `estimateNote` now renders on its own, beside TO VERIFY, when a table holds a `~` row. Do not translate the removed keys in Phase 2.

Phase 2 deviations from the plan:

- **Chrome only, as predicted.** `cup.sources[].label` stays English, so no overlay changed. All nine catalogs gained `cards.sports.cup` and `sports.cup.*`, insert-only (the locale diff has no deleted lines).
- **Five render sites needed `isolateFigures()`.** `t()` chrome skips the `localized()` transform, so a bare season such as `2025–26` would have reversed in `fa`/`ar`. The collapsed teaser, table headers, tile labels and bars heading now isolate it. `Lead` already did. A glyph x-position scan shows every same-line range in order, and stripping an isolate on purpose fails the same scan.
- **`fa`/`ar` spell `1A–4A` as words, and carry `⁦…⁩` around the tie-rule formula.** It is the only isolate stored in a locale catalog. Its spaces are no-break so the formula cannot split across lines.
- **`ht` lists every ordinal category.** ICU has no `ht` data, so `Intl.PluralRules` resolves it to the browser's default locale, and any category left out would render the English ordinal.
- **Two CSS fixes the translations exposed.** `.cup-cell` now wraps, because a long tie label ran into the next column, and the gender column is `minmax(44px, max-content)`, because `FEMMINILE` did not fit 44px. `.cup-sports-gender` and `.cup-panel-h` joined the non-Latin caps-tracking reset.
- **The six-year table scrolls (user, 2026-10-31).** `.cup-scroll` is `max-height: 365px`, which opens at six schools in English, with the header and lead row pinned. Translated rows can run taller, so Arabic shows fewer. In print it drops the limit and shows all 19 rows. The print rule uses doubled selectors because the later screen rules would otherwise win.
