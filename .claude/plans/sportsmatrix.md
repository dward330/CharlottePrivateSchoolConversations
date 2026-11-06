---
name: sportsmatrix
title: Compare › Sports — a "Sports offered" row per sport (Yes / No / N/A, with V · JV · MS and B / G)
status: english-done
phases: 2
created: 2026-11-06
branch: feat/sportsmatrix
prs: []
---

# Compare › Sports — a "Sports offered" row per sport

## Goal

On the Compare page's **Sports** topic, add a **Sports offered** group with one row per sport,
covering every sport recorded for any comparable (high-school) school. That is **21 rows**
today. Each cell says **Yes**, **No** or **N/A**. A Yes cell lists the same V / JV / MS depth
chips the school pages use, one per line, each followed by `(B, G)`, `(B)`, `(G)` or `(Co-ed)`.
Every cell has a tooltip that spells out what it means, and the V / JV / MS legend sits in the
group's header band. We'll know it worked when a parent can scan one row and see which schools
field a sport and at which levels, without opening seven school pages.

## Context

- **The approved design** is in Claude Design project
  `5da24575-40bf-4787-8934-0fadfc56059f`, file **`Sports Compare Matrix.dc.html`**
  (open: https://claude.ai/design/p/5da24575-40bf-4787-8934-0fadfc56059f?file=Sports+Compare+Matrix.dc.html).
  The user picked **option `1a` "Stacked ladder"** on 2026-11-06. Options `1b` and `1c` in the
  same file were rejected; ignore them. The file renders its tables from an inline `<script>`,
  so read the CSS block and the `A` cell function plus `table()` for layout. Its data is a
  snapshot; take data only from `src/data`. Read it with `mcp__claude-design__read_file` (its
  memory notes say the MCP sometimes 403s; probe with `list_projects` first). Everything
  needed is also restated below, so the build does not depend on the MCP.
- **The data already exists.** Every school's Sports Offered card holds
  `offered.seasons[].sports[] = { name, levels: Level[] }` (`Level = 'V' | 'JV' | 'MS'`),
  in `src/data/sportsPrograms/<slug>.ts`. Types are in `src/data/sportsProgram.ts:47-65`
  (`Level`, `SportEntry`, `Season`). The accessor is `sportsProgram(slug, lang)` in
  `src/data/sportsProgram.ts:525`. **Sport `name`s are free text**, e.g.
  `Soccer (Boys)`, `Cross Country (B & G)`, `Soccer – Boys`, `Rowing (Co-ed)`, `Cheerleading (Winter)`.
  They are **not translated**: no `sports.*.json` overlay carries an `offered…name` path.
  Levels are recorded **per sport-and-gender entry**, so a merged row combines them, e.g.
  Basketball at Charlotte Christian = V (B, G) · JV (B) · MS (B, G).
- **Compare page:** `src/pages/Compare.tsx`. Columns come from `comparableSchools`, aliased
  `allSchools`, in `src/lib/manifest.ts:52`. That is the 11 schools with grades 9–12, so
  `charlotte-prep` and `trinity-episcopal` are excluded. The table renders a "Key stats"
  `<tbody>` from `valueMetricsForTopic()` (line ~493), then a "Research coverage" `<tbody>`
  (line ~640). Group bands use `.group-row > td.group-label > span.group-label-text`
  (`src/index.css:2399-2412`, sticky text, RTL handled at line ~6336, phone rule at ~2678).
  Tooltips use `TopLayerTip` (`src/components/TopLayerTip.tsx`) with `.tip-kind` / `.tip-body`
  children. The row-header tip and the `ncAdmit` cell tip in `Compare.tsx` are the patterns
  to copy.
- **Nearest precedent: the Wells Fargo Cup rows** (plan `cupcompare`). Those are typed into
  `VALUE_METRICS` in `src/data/metricValues.ts` and re-derived by `check:cup`. **This plan
  deliberately does not follow that pattern** (see Decisions): these rows are computed at
  render time from the Sports Offered data, so they cannot drift from the school pages.
- **School-page legend:** `src/components/SportsProgram.tsx:99-124`. `DepthChip` is a local
  function at line 100. The legend's labels **"Varsity" / "Junior varsity" / "Middle School"
  are bare English JSX text (lines 117-123)**, so they render in English in all nine
  non-English locales today, the same bare-JSX defect class CLAUDE.md records for the old
  footer. This plan moves them to keys, because Compare needs the same labels.
- **Chrome keys that already exist, and are translated in all 10 catalogs, to reuse:**
  - `sports.cup.sport_<key>`: `baseball basketball cheerleading crossCountry fieldHockey
    football golf indoorTrack lacrosse soccer softball swimming tennis trackField volleyball
    wrestling` (plus Cup-only ones not used here). `src/locales/en.json:256-275`.
  - `sports.cup.term_fall|term_winter|term_spring`, `sports.cup.gender_boys|gender_girls`.
  - `sports.depthChips` ("Depth chips:"), `compare.na` ("N/A"), `compare.notAvailable`,
    `compare.coverage_one|_other` ("{{count}}/{{total}} schools").
- **Checks in the area:** `check:chrome` (`scripts/check_chrome_keys.mjs`) reports a key that
  is in `en` but missing elsewhere as *awaiting translation* (exit 0), and a key missing
  everywhere as exit 1. That split is what lets Phase 1 ship green. `check:schema` regenerates
  `DATA-SCHEMA.md` (`scripts/gen_data_schema.mjs`). `coverage:floor`
  (`scripts/coverage_floor.mjs`) counts only `VALUE_METRICS` rows. `audit:mobile` opens
  **school pages only** (`scripts/audit_mobile_layout.mjs:189`), so Compare at phone width
  needs its own browser check.
- **Node 24 imports `.ts` directly.** The per-school `src/data/sportsPrograms/*.ts` files and
  `src/data/brands.ts` import under plain Node (verified during planning). The
  `src/data/sportsProgram.ts` *registry* does not, because it uses `import.meta.glob`.
  Scripts must import the per-school files, never the registry.

### The computed matrix at planning time (11 comparable schools)

21 rows: Baseball 11 · Basketball 11 · Cheerleading 11 · Cross Country 11 · Dance 4 ·
Field Hockey 6 · Football 9 · Golf 11 · Hockey 1 · Indoor Track 5 · Lacrosse 8 ·
Mountain Biking 1 · Rowing 1 · Rugby 1 · Soccer 11 · Softball 9 · Swimming 11 · Tennis 10 ·
Track & Field 10 · Volleyball 11 · Wrestling 7. No comparable school lacks a Sports Offered
card, so **N/A renders nowhere today**; the state must still exist and be handled. Use these
counts as the Phase 1 browser assertion.

### The complete alias table (all 50 raw names in the 11 comparable schools)

Gender: `B` boys, `G` girls, `BG` both, `CO` co-ed, `—` not stated by the school.

| Raw name(s) | Key | Gender |
|---|---|---|
| `Baseball` | `baseball` | — |
| `Baseball (Boys)` | `baseball` | B |
| `Basketball` | `basketball` | — |
| `Basketball (Boys)` / `(Girls)` | `basketball` | B / G |
| `Cheerleading`, `Cheerleading (Winter)`, `Cheering` | `cheerleading` | — |
| `Cross Country` | `crossCountry` | — |
| `Cross Country (B & G)` | `crossCountry` | BG |
| `Cross Country (Boys)` / `(Girls)` | `crossCountry` | B / G |
| `Dance`, `Dance Team` | `dance` | — |
| `Field Hockey` | `fieldHockey` | — |
| `Field Hockey (Girls)` | `fieldHockey` | G |
| `Football` | `football` | — |
| `Golf` | `golf` | — |
| `Golf (Boys)` / `(Girls)` | `golf` | B / G |
| `Golf (Co-ed)` | `golf` | CO |
| `Hockey` | `hockey` | — |
| `Indoor Track`, `Indoor Track & Field` | `indoorTrack` | — |
| `Indoor Track (B & G)` | `indoorTrack` | BG |
| `Lacrosse` | `lacrosse` | — |
| `Lacrosse (Boys)` / `(Girls)` | `lacrosse` | B / G |
| `Mountain Biking` | `mountainBiking` | — |
| `Rowing (Co-ed)` | `rowing` | CO |
| `Rugby` | `rugby` | — |
| `Soccer` | `soccer` | — |
| `Soccer (Boys)` / `(Girls)` | `soccer` | B / G |
| `Softball` | `softball` | — |
| `Softball (Girls)` | `softball` | G |
| `Swimming`, `Swimming and Diving` | `swimming` | — |
| `Swimming (B & G)` | `swimming` | BG |
| `Swimming (Boys)` / `(Girls)` | `swimming` | B / G |
| `Tennis` | `tennis` | — |
| `Tennis (Boys)` / `(Girls)` | `tennis` | B / G |
| `Track & Field` | `trackField` | — |
| `Track & Field (B & G)` | `trackField` | BG |
| `Volleyball` | `volleyball` | — |
| `Volleyball (Girls)` | `volleyball` | G |
| `Wrestling` | `wrestling` | — |
| `Wrestling (Boys)` | `wrestling` | B |

Charlotte Prep and Trinity Episcopal use an en-dash form (`Soccer – Boys`, `Cross-Country – Coed`).
They are off Compare, so they need no entries. Do not add them speculatively.

## Decisions

- **Rows are computed at render from `offered`, not typed into `VALUE_METRICS`.** The values
  are a pure function of data the school pages already show. Typing them would create a second
  copy that a check then has to chase, which is the `cupcompare` cost with none of its reason
  (Cup cells come from a different source than the card). Consequences: no overlay entries, no
  stat tiles on school pages, and **no effect on `coverage:floor`**, which reads only
  `VALUE_METRICS`. Say so in the schema doc.
- **Normalization is an explicit raw-name → `{key, gender}` table, not a regex.** A new
  school's new spelling then fails a check loudly instead of silently becoming its own row.
  The table above is the complete starting content.
- **Row set = union over all 11 comparable schools**, independent of which columns are
  selected, so the row list is stable while toggling schools. The row sub-line count is
  "N/11 schools" over all comparable schools, not the selection.
- **Rows sort alphabetically by localized label** (`Intl.Collator(lang)`), not by season,
  because Soccer, Tennis, Golf, Cheerleading and Dance sit in different seasons by gender and
  school. Seasons show under the name instead ("Fall · Spring").
- **B / G appear only where the school's own list states the gender** (user, 2026-11-06). An
  ungendered entry (`Football`, every Charlotte Catholic entry) shows the chip with **no
  marker**. The tooltip adds "The school doesn't list this sport separately for boys and
  girls." Never infer gender by convention (Football → B, Softball → G); the user rejected
  that.
- **Co-ed renders as `(Co-ed)`**, a third marker. It occurs twice: Carmel Christian MS golf,
  Davidson Day rowing. Writing "B, G" would claim two teams where one mixed team exists.
- **Marker composition per level:** collect B, G, CO across all entries at that level. Show
  them in the order B, G, Co-ed. If a level holds only ungendered entries, show no marker. If
  it mixes gendered and ungendered entries (none today), show the known genders, and the check
  reports the cell (exit 0) so a human looks.
- **Swimming and Charlotte Catholic's "Swimming and Diving" share one row, labelled
  "Swimming"** (`sports.cup.sport_swimming`). "Swimming & Diving" would claim diving for every
  school that lists only swimming.
- **Charlotte Catholic's `Hockey` gets row key `hockey`, label "Hockey"**, the school's own
  word. Its research never says "ice hockey", so the label does not add it. It is a separate
  row from Field Hockey.
- **Cell states:** **Yes** = the sport is on the school's list. **No** = not on it. **N/A** =
  the school has no `offered` data at all, which renders `compare.na` as elsewhere on Compare.
  No leader tint on any row.
- **Placement:** the group renders only on the `sports` topic, **after "Key stats" and before
  "Research coverage"**. The legend sits in the group's header band (user's choice), not the
  corner cell and not each row header.
- **The legend is a shared component** used by both the school-page Sports Offered card and
  the Compare band, so "like we do on the school page" holds by construction. Its labels move
  from bare JSX to keys; the school page's English text is unchanged.
- **New sport keys join the existing `sports.cup.sport_*` set** (`dance`, `hockey`,
  `mountainBiking`, `rowing`, `rugby`) rather than a parallel namespace. One sport vocabulary
  means each sport is translated once. JSON takes no comments, so say the set is shared in
  `sportsMatrix.ts`'s header comment and beside `CUP_SPORTS` in `src/data/wellsFargoCup.ts:806`.
- **CSS class prefix `sm-`.** Never `ad-` (EasyList hides it; see memory).
- **Use English sport data for the matrix in every locale.** The aliases key on English raw
  names, and the names have no overlay anyway. Only the chrome around them translates.

## Approvals needed

**None outstanding.** The new Compare group and its rows were requested directly by the user,
and the user approved the Claude Design file `Sports Compare Matrix.dc.html`, option `1a`, on
2026-11-06. That handoff is the UX approval (CLAUDE.md, UX-design standard). Phase 2 still
waits for the user's review of the English build.

## Out of scope

- Translating sport `name`s on the school-page season board. They stay English as today.
- Gender inference of any kind; editing any school's `offered` data.
- Compare rows for PreK–8 schools (excluded from Compare by design).
- Adding the matrix to the school-page stat tiles, the coverage floor, or `/add-school`'s
  Compare-row count.
- Options `1b` / `1c` from the design file.
- Deploying. Merge, then stop (publishing standard).

## Steps

### Phase 1 — English

1. **Branch.** `git checkout main && git pull && git checkout -b feat/sportsmatrix`.

2. **Shared chip + legend component.** Create `src/components/DepthChip.tsx` exporting:
   - `DepthChip({ level }: { level: Level })`, moved verbatim from
     `SportsProgram.tsx:99-102` (same `sports-depth sports-depth-<v|jv|ms>` classes).
   - `DepthLegend({ withGender = false }: { withGender?: boolean })`, which renders the
     legend row: `t('sports.depthChips')`, then `DepthChip` V / JV / MS each followed by
     `t('sports.level_V')`, `t('sports.level_JV')`, `t('sports.level_MS')`. When `withGender`
     is set, append a divider and `<b>{t('compare.sportsMatrix.boysShort')}</b>
     {t('sports.cup.gender_boys')}`, the same for girls, and
     `t('compare.sportsMatrix.legendNoLetter')`. Keep the wrapper class `sports-legend` on the
     school-page use. On Compare pass a `className` so it can sit inline in the band.
   In `SportsProgram.tsx`, delete the local `DepthChip`, import both, and replace lines
   113-124 with `<DepthLegend />`. **The English rendering must be byte-identical** to today.

3. **The matrix module.** Create `src/lib/sportsMatrix.ts`. It must import **only types**
   (`import type { Level, SportsOffered } from '../data/sportsProgram.ts'`) so Node can import
   it. Export:
   - `type SportKey`, the 21 keys in the alias table.
   - `type GenderMark = 'B' | 'G' | 'CO'`;
     `type LevelCell = { marks: GenderMark[]; unstated: boolean }`;
     `type SportCell = Partial<Record<Level, LevelCell>>`.
   - `SPORT_ALIASES: Record<string, { key: SportKey; gender: 'B' | 'G' | 'BG' | 'CO' | null }>`,
     the table above verbatim (50 raw names).
   - `type MatrixRow = { key: SportKey; seasons: ('fall'|'winter'|'spring')[]; count: number;
     cells: Record<string, SportCell | null | 'na'> }`. `null` = No, `'na'` = no `offered`.
   - `buildSportsMatrix(offered: Record<string, SportsOffered | undefined>): { rows: MatrixRow[];
     unmapped: { slug: string; name: string }[]; mixed: { slug: string; key: SportKey; level: Level }[] }`.
     Map each season name to `fall|winter|spring` by lower-casing it. Merge entries per
     (key, level). `BG` adds both B and G; a `null` gender sets `unstated`. Seasons are
     de-duplicated in fall → winter → spring order. Rows are returned in key order; the UI
     sorts by localized label. An unmapped raw name goes in `unmapped` and **is not rendered**.
     The check (step 6) fails the build on any such name.
   Header comment: why computed rather than `VALUE_METRICS`; that sport labels are the shared
   `sports.cup.sport_*` vocabulary; the "B/G only where stated" rule.

4. **The Compare rows component.** Create `src/components/CompareSportsRows.tsx`, rendering one
   `<tbody>` for `cols: { slug: string; name: string }[]`:
   - Build the matrix once at module scope from
     `comparableSchools.map(s => [s.slug, sportsProgram(s.slug)?.offered])` (English).
   - **Band row:** `<tr className="group-row sm-band"><td className="group-label" colSpan={cols.length + 1}>`
     containing the sticky `group-label-text` with `t('compare.sportsMatrix.group')`
     ("Sports offered") and `<DepthLegend withGender />`, wrapped so they flex-wrap together
     inside the sticky span (design `.band-in`: label, then legend, gap 10px 22px; legend gap
     8px 16px, 12px muted text; divider before B / G is a 1px `--border` left rule with 16px
     padding). Band background `color-mix(in srgb, var(--accent) 5%, var(--bg))`.
   - **Rows**, sorted by `t('sports.cup.sport_' + key)` with `Intl.Collator(lang)`:
     `<th scope="row" className="row-metric">` holding `.row-metric-label` (the sport) and
     `.row-metric-cov` = seasons joined with ` · ` (`sports.cup.term_*`), then ` · `, then
     `t('compare.coverage', { count, total: comparableSchools.length })`.
   - **Cells:** `<td className="cell sm-cell" style={{ '--brand': brandOf(slug).color }}>`.
     The whole cell content is the `TopLayerTip` trigger (`idPrefix={`sm-${key}`}`,
     `className="qual sm-tip"`, `ariaLabel` = `t('compare.sportsMatrix.cellAria', { sport, school, state })`):
     - Yes: `<span className="sm-yes">{t('compare.sportsMatrix.yes')}</span>`, then
       `<span className="sm-ladder">`, one `<span className="sm-rung">` per present level in
       V, JV, MS order: `<DepthChip level/>`, plus `<span className="sm-gx">(B, G)</span>` when
       there are marks. Join with ", "; letters come from `boysShort` / `girlsShort` / `coed`
       keys. No marker span when the level has no marks.
     - No: `<span className="sm-no">{t('compare.sportsMatrix.no')}</span>`.
     - N/A: `<span className="mark-na">{t('compare.na')}</span>`, still with a tip.
   - **Tip content** (`.tip-kind` + `.tip-body` lines, all keys):
     - Yes → kind `tipKindYes` ("Offered"). Body: `tipYesLead` ("{{school}} lists {{sport}} at
       these levels:"), then one `.tip-body` line per level: `tipLevel` ("{{level}} — {{who}}")
       where `level` = `sports.level_*` and `who` = `Intl.ListFormat(lang, { type: 'conjunction' })`
       over `sports.cup.gender_boys|girls` lower-cased per locale rules via the
       `tipWho_boys|tipWho_girls|tipWho_coed` keys (never `.toLowerCase()` in code). If the
       level has no marks, use `tipLevelOnly` ("{{level}}"). If any level is `unstated`, add a
       final line `tipUnstated` ("The school doesn't list this sport separately for boys and
       girls.").
     - No → kind `tipKindNo` ("Not offered"), body `tipNo` ("{{sport}} isn't on {{school}}'s
       published list of sports.").
     - N/A → kind `tipKindNa` ("Not available"), body `tipNa` ("We don't have {{school}}'s list
       of sports yet.").

5. **Wire it in and style it.** In `src/pages/Compare.tsx`, between the value-metrics
   `</tbody>` and the coverage `<tbody>`, render
   `{activeTopic === 'sports' && <CompareSportsRows cols={cols} />}`. Add `sm-*` rules to
   `src/index.css` beside the Compare group-row rules (~line 2412), taking values from design
   option `1a`:
   - `.sm-cell` `vertical-align: top; padding: 11px 10px; text-align: center`.
   - The trigger is an inline-flex column, centred, gap 6px, `cursor: help`.
   - `.sm-yes` heading font 600 15px/1, `letter-spacing: .04em`, uppercase, colour
     `var(--brand)` with a 1px dotted underline at 45% brand, `padding-bottom: 2px`.
   - `.sm-no` body font 600 12px, colour as `.mark-na`, dotted underline.
   - `.sm-ladder` a column with gap 4px, `align-items: flex-start` (chips left-aligned inside
     the centred block); `.sm-rung` inline-flex, gap 5px.
   - `.sm-gx` 500 11.5px, muted, `letter-spacing: .02em`.
   For **dark mode**, take the brand-text treatment `.cell.val .mark-val` already uses (the
   `color-mix(in srgb, var(--brand) 60%, #e6e7e8)` convention); copy whatever selector it uses
   rather than inventing one. Phone width: make sure the existing ≤640px Compare rules keep the
   band legend wrapping inside the sticky span and the ladder within the column. Bare
   `1fr`-style growth caused the card-grid blowout; use `minmax(0, …)` if a grid is involved.

6. **Guard the aliases: `check:sportsmatrix`.** Create `scripts/check_sports_matrix.mjs` and
   add `"check:sportsmatrix": "node scripts/check_sports_matrix.mjs"` to `package.json`.
   **Chain it into `build`** right after `check:cup`. It:
   - derives comparable slugs from `src/data/schools.json` minus `BRANDS[slug].hasHighSchool === false`
     (`src/data/brands.ts`);
   - imports each `src/data/sportsPrograms/<slug>.ts` directly (never the registry) and finds
     its exported program's `offered`;
   - imports `buildSportsMatrix` from `src/lib/sportsMatrix.ts`;
   - **exit 1** on any `unmapped` raw name, printing school + name + "add it to SPORT_ALIASES";
   - **exit 1** if any `SportKey` lacks `sports.cup.sport_<key>` in `src/locales/en.json`;
   - **reports (exit 0)** `mixed` cells and alias entries no school uses;
   - prints the row count and per-row counts (expect the 21 listed above).
   Negative test (per the repo rule, corrupt the artifact under test and read which message
   printed): temporarily rename one raw name in a school file, e.g. `Rugby` → `Rugby Union`,
   confirm the *unmapped* message names it, then revert with `git checkout -- <file>`.

7. **English chrome keys.** Add to `src/locales/en.json` only:
   - under `sports`: `level_V` "Varsity", `level_JV` "Junior varsity", `level_MS` "Middle School";
   - under `sports.cup`: `sport_dance` "Dance", `sport_hockey` "Hockey",
     `sport_mountainBiking` "Mountain Biking", `sport_rowing` "Rowing", `sport_rugby` "Rugby";
   - a new `compare.sportsMatrix` object: `group` "Sports offered", `yes` "Yes", `no` "No",
     `boysShort` "B", `girlsShort` "G", `coed` "Co-ed",
     `legendNoLetter` "No letter: the school doesn't list it by gender",
     `tipKindYes` "Offered", `tipKindNo` "Not offered", `tipKindNa` "Not available",
     `tipYesLead`, `tipLevel`, `tipLevelOnly`, `tipWho_boys` "boys", `tipWho_girls` "girls",
     `tipWho_coed` "co-ed", `tipUnstated`, `tipNo`, `tipNa`, and
     `cellAria` "{{sport}} at {{school}}: {{state}}", all with the English text given in step 4.
   Use interpolation for every variable part, never concatenation.

8. **Schema doc.** In `scripts/gen_data_schema.mjs` §4 ("Compare rows", ~line 821), add a
   generated subsection, **"Computed Compare groups"**. It imports the per-school sports files
   and `buildSportsMatrix` the same way the check does, then prints the live row count and the
   sport list, and states that the group is computed from `offered` and is not in
   `VALUE_METRICS`, the stat tiles or the coverage floor. Also add the rule for a new school: a
   new sport spelling must be added to `SPORT_ALIASES`, and a new sport needs a
   `sports.cup.sport_<key>` key in all 10 catalogs. Then `npm run schema`. The doc is generated;
   never hand-edit it.

9. **Verify (Phase 1 list below), commit with explicit paths** (`git status --short` first;
   never `git add -A`), push, check that `git rev-parse HEAD` matches
   `git ls-remote origin feat/sportsmatrix`, and open the PR with `--body-file`. Flip the
   INDEX row to **English shipped** with the PR link.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English
Compare › Sports page.** Nothing below runs until they confirm the wording and look.

### Phase 2 — Every other locale

Scope: **UI chrome only**, in the nine non-English catalogs of `TRANSLATED`
(`src/lib/i18n.ts:108`): `src/locales/es.json`, `bn.json`, `ht.json`, `te.json`, `fr.json`,
`fa.json`, `it.json`, `hi.json`, `ar.json`. **No overlay / `PROSE_TRANSLATED` work.** The
matrix adds no research prose, and sport `name`s stay untranslated.

1. **Translate every key added in Phase 1 step 7** into each of the nine catalogs, with keys
   identical to `en.json`. Use each locale's existing words for consistency:
   `sports.cup.sport_*`, `sports.cup.gender_*`, `compare.na`. The `boysShort` / `girlsShort`
   letters are the translator's call: use the locale's initial for boys / girls if one is
   unambiguous, else keep `B` / `G`, and make the legend line explain it either way. Register
   follows each locale's rollout doc in `.claude/docs/prose-translation-<lang>.md` (Italian has
   none; follow French). Do not let `fa`/`ar` reorder `(B, G)`: the marker is composed in
   code, so check that it renders in a sensible order inside RTL text.
2. **Re-run the Phase 2 checks**, push to the same PR, and flip the INDEX row to
   **Implemented**. Merge with `gh pr merge --squash --delete-branch`, then
   `git checkout main && git pull`. **Do not deploy.** Say "merged — ready to deploy whenever
   you want it" and stop.

## Files touched

| File | Change |
|---|---|
| `src/components/DepthChip.tsx` | new — `DepthChip` (moved) + shared `DepthLegend` |
| `src/components/SportsProgram.tsx` | edit — use shared chip/legend; legend labels now keyed |
| `src/lib/sportsMatrix.ts` | new — alias table, types, `buildSportsMatrix` |
| `src/components/CompareSportsRows.tsx` | new — band + 21 rows + tooltips |
| `src/pages/Compare.tsx` | edit — render the group on `sports`, between the two tbodies |
| `src/index.css` | edit — `sm-*` rules (light, dark, phone) |
| `scripts/check_sports_matrix.mjs` | new — alias / key guard |
| `package.json` | edit — `check:sportsmatrix`, chained into `build` |
| `scripts/gen_data_schema.mjs` | edit — "Computed Compare groups" subsection |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |
| `src/locales/en.json` | edit — Phase 1 keys |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — Phase 2 translations |
| `.claude/plans/INDEX.md`, this plan | status + PR + implementation notes |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b`: clean. Trust `tsc -b`, not `tsc --noEmit` (memory note).
- [ ] `npm run check:sportsmatrix`: exits 0, prints 21 rows with the counts in *Context*.
- [ ] Negative test from step 6: exits 1 naming the renamed sport; file reverted afterwards.
- [ ] `npm run check:chrome`: exits 0. The new keys are listed as *awaiting translation* in
      nine locales, never as missing everywhere.
- [ ] `npm run check:schema`: clean after `npm run schema`.
- [ ] `npm run coverage:floor`: output **unchanged** from `main` (same row total and floor).
- [ ] `npm run build`: succeeds, including the newly chained check.
- [ ] **Browser check** (`npm run build && npx vite preview`, Playwright per the memory note;
      the Chrome extension may be disconnected), at `/compare/?topic=sports` with all 11
      schools selected:
  - the "Sports offered" band sits between Key stats and Research coverage, with the legend
    (V / JV / MS, B, G, no-letter line) inside it, and stays pinned while panning sideways;
  - 21 rows, alphabetical, each sub-line count matching *Context* (e.g. Rugby "1/11 schools");
  - Charlotte Christian Basketball reads V (B, G) / JV (B) / MS (B, G);
  - every Charlotte Catholic Yes cell has chips and **no** marker, and its tooltip carries the
    "doesn't list … boys and girls" line;
  - Davidson Day Rowing reads V (Co-ed); Carmel Christian Golf has an MS (Co-ed) rung;
  - hover and keyboard focus open a tip on a Yes, a No and (temporarily stub one school's
    `offered` to `undefined` in the dev server, then revert) an N/A cell;
  - **dark mode**: Yes text readable in every brand colour, Charlotte Latin's `#12294f`
    especially;
  - **phone width** 320 / 360 / 390 px: no page-level horizontal overflow; band legend wraps;
    ladder not clipped (`audit:mobile` does not cover Compare, so do it by hand);
  - the school-page Sports Offered legend renders identically to `main` in English.
- [ ] The other Compare topics are unchanged (spot-check College Support and Arts).

### Phase 2 — Locales

- [ ] `npm run check:chrome`: no new key awaiting translation in any of the nine locales.
- [ ] `npm run build`: succeeds.
- [ ] Browser: `/compare/?topic=sports&lang=es`, `?lang=fa` (RTL) and `?lang=hi`. The band,
      sport labels, Yes / No, tooltips and the school-page legend are translated. The sticky
      band text pins to the reading-start edge in `fa`. `(B, G)`-style markers and the chips
      render in a sane order in RTL. No English fragment in any tip.
- [ ] Spot-check that a school page's Sports Offered legend is now translated in `es` (it was
      English before; this is an intended fix).

## Risks

| Risk | Mitigation |
|---|---|
| A new school adds a spelling like `Soccer – Boys` and its sport silently vanishes | Explicit alias table + `check:sportsmatrix` in the build fails on any unmapped name |
| Reader takes a missing B/G marker as "boys only" or "unknown" | Legend's no-letter line + per-cell tooltip sentence |
| Rows imply the matrix is research coverage | Separate band titled "Sports offered", placed above "Research coverage" |
| Brand colours unreadable as text in dark mode | Reuse the existing `.cell.val` dark treatment; browser-check Charlotte Latin |
| Tall rows make the 21-row table long on phones | Accepted with option `1a`; verify no overflow at 320 px |
| `DepthLegend` refactor shifts the school-page legend | Byte-identical English requirement + browser comparison with `main` |

## Open questions

- Should the sport rows ever get a leader tint (e.g. most levels fielded)? — **default:** no
  tint; Yes / No is not a ranking.
