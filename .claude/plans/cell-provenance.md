---
name: cell-provenance
title: Add a "Student organizations" Compare row, and surface per-cell provenance tooltips across every Compare topic
status: implemented
phases: 2
created: 2026-08-04
branch: feat/cell-provenance
prs: []
---

# Add a "Student organizations" Compare row, and surface per-cell provenance tooltips across every Compare topic

## Goal

Two changes to the Compare table, shipped together because the second is what makes the
first defensible.

1. **A new first row under Student Clubs** giving each school's Upper School student-
   organization count.
2. **A per-cell provenance tooltip, across all seven Compare topics** — hover or focus any
   qualified figure and get at most two sentences saying what that number actually is and
   where it came from.

The connection is the point. A club-count row was **already proposed once and deliberately
rejected** (see Context) because the six schools' counts are not the same kind of number —
exact vs. range vs. documented minimum. A per-cell tooltip is precisely the mechanism that
makes such a row honest, so it is built as general table infrastructure rather than as a
one-row special case.

We will know it worked when a parent can hover `77` under Providence Day and read that it
came from the school's official 2025–26 Upper School club list with five arts clubs
excluded — and when the same affordance explains why Charlotte Latin's Power 4 commit count
is a documented floor rather than a total.

## Context

### The Compare table today

`src/pages/Compare.tsx` renders two stacked `<tbody>` sections:

- **Key stats** ([Compare.tsx:160-200](../../src/pages/Compare.tsx#L160-L200)) — value
  metrics from `VALUE_METRICS` in `src/data/metricValues.ts`. Each cell is either
  `<span className="mark-val">` with a figure or `<span className="mark-na">` with N/A.
- **Research coverage** ([Compare.tsx:201-227](../../src/pages/Compare.tsx#L201-L227)) —
  ✓ / N/A from `schoolHasMetric()`. **Out of scope for this plan.**

`VALUE_METRICS` holds **24 metrics × 6 schools = 144 cells** across 7 topics
(`course-offerings`, `college-support`, `financial-aid-tuition`, `the-arts`,
`student-clubs`, `after-school`, `sports`).

### The finding that should shape the work

**134 of those 144 cells already carry a hand-written provenance note** — as a trailing
`//` comment, visible only in source. Examples, verbatim from
`src/data/metricValues.ts`:

```ts
cannon: '104',   // counted from the 11 course-offering sections of the 2026-27 catalog
'charlotte-latin': '3',   // ’24 Salvage (South Carolina) · ’25 Clontz (Cal) · ’26 Lee (NC State)
'davidson-day': '~75',    // 74 described + AP Spanish Literature listed without a description; 66 on the 2026-27 offerings grid
```

Coverage by metric (measured, not estimated):

| Coverage | Metrics |
|---|---|
| 6 of 6 cells commented | 21 of 24 metrics |
| 5 of 6 | `advanced-arts-coursework` |
| 3 of 6 | `latest-pickup` |
| 0 of 6 | `program-span` |

So the research is **already done**; it is simply not rendered. This plan's bulk is
therefore *editorial* — rewriting maintainer shorthand into reader-facing prose — not
engineering. Note that some comments are not usable as-is: the sports commit cells are
athlete-name lists (`’24: Henley, Wilfong, Woody, Zinger · ’25: …`), which are provenance
for a maintainer but not a sentence for a parent.

### The one hard technical constraint

`.table-wrap { overflow: auto }` at [index.css:1702](../../src/index.css#L1702), combined
with sticky headers (`table.compare thead th`, `z-index: 3`) and a sticky first column
(`.corner, .row-metric`, `z-index: 2`).

**A tooltip positioned by ordinary CSS inside that wrapper is clipped at the scroll
container's edge** — and it is clipped on exactly the right-hand school columns a reader
has to scroll to reach. This was demonstrated in a design mock during planning; the naive
absolute-positioned version visibly fails.

The fix is the **native `popover` attribute**, which renders in the browser's *top layer* —
outside the clipping context entirely. React 19 (`package.json`) passes `popover` /
`popovertarget` through to the DOM natively, and Vite has no `browserslist` constraint.

### Why not `title=`

The table already uses native `title=` for the N/A and ✓ marks
([Compare.tsx:191](../../src/pages/Compare.tsx#L191), [:218](../../src/pages/Compare.tsx#L218)).
Do **not** extend that pattern here. `title` never fires on touch, is unstyleable, cannot
carry the kicker line, and is announced inconsistently by screen readers. Those existing
two uses are left alone — they are single-word affordances, not prose.

### i18n shape

`metric-values` is its own overlay topic. `src/data/overlays/work/metric-values.<lang>.json`
currently holds **157 strings** per language, across 9 non-English locales. Adding ~134
tooltip bodies plus ~4 kicker strings takes it to roughly **291 per language**.

Overlay entries key by **content hash of the English text** (`of` field), resolved at
runtime by `localized()` / `overlayIndex()` in `src/lib/localizeData.ts`. A stale stamp
falls back to English **silently**.

### The rejected-tile comment

[metricValues.ts:311-315](../../src/data/metricValues.ts#L311-L315) currently reads:

```
// From each school's Student Clubs note (verified July 2026). Two proposed tiles
// (total-club count, competitive-club count) were dropped: club counts are defined
// inconsistently across schools (exact vs range vs minimum) and a competitive count
// was published by only one school — neither compares cleanly.
```

**This comment must be updated, not silently contradicted.** Step 1.2 rewrites it to record
that the total-club tile is now shipping *because* per-cell tooltips resolve the objection,
and that the competitive-club tile remains dropped.

### Where the club numbers come from — and where they do NOT

`src/data/clubCatalog.ts` holds an enumerated roster per school, but **its array lengths are
not the published totals** and must not be counted to derive this row:

| School | `clubs[]` length | Published figure to use |
|---|---|---|
| Providence Day | 77 | **77** — official 25–26 US list, 5 arts clubs excluded |
| Charlotte Latin | 25 | **25** — exact, in-scope US |
| Charlotte Country Day | 7 | **~45–50** — school publishes a range; only 7 confirmed by name |
| Charlotte Christian | 23 | **23** — US orgs (school also reports 35 across JK–12) |
| Cannon | 15 | **≥23** — see below |
| Davidson Day | 9 | **≥9** — confirmed clubs only; no roster published |

Country Day is the clearest trap: 7 enumerated, ~45–50 published.

**Cannon needs a decision the implementer cannot make from `clubCatalog.ts` alone.** Its
catalog holds 15 named orgs, but that file is a *consolidated merge* of four dossiers and
its own header says the roster is "representative, NOT exhaustive." The `≥23` figure in the
design mock was illustrative and is **not sourced**. See Open questions.

Verbatim from the catalog verdict lines, which are the sourcing for the tooltip copy:

- Country Day: *"The Upper School page cites 'nearly 50 clubs' and the 2025–26 School
  Profile lists '45 different clubs and activities.'"*
- Christian: *"23 named Upper School organizations across four categories, part of 35
  across JK–12."*
- Cannon: *"the school publishes no chartered directory, so this is representative, not
  exhaustive."*

## Decisions

- **Tooltip = native `popover`, not a CSS-positioned div** — the only approach that escapes
  `.table-wrap`'s `overflow: auto`. Verified as the failure mode in a design mock.
- **Trigger is a real `<button>`, not `title=`** — touch support, stylability, and a
  predictable accessible name.
- **Each tooltip carries a short uppercase kicker plus at most two sentences** — the kicker
  ("Documented minimum", "Published range", "Official list", "Scope note") gives a
  learnable vocabulary without spending a permanent visual layer on every cell.
- **Only cells that need a caveat get the affordance.** A plain exact count (Charlotte
  Latin's `25`) renders exactly as it does today. The *presence* of the marker is itself
  the signal; putting one on all 144 cells would destroy that.
- **Country Day renders the verbatim range `~45–50`, not an invented `~48` midpoint** — the
  repo's standing rule is that published figures are never re-typed. Cost: that cell cannot
  join the row's numeric `lead` highlight, which is acceptable.
- **Cannon and Davidson Day use a `≥` prefix** — a floor is visibly a floor without needing
  the hover, so a non-hovering reader is not misled.
- **The row counts Upper School only**, for all six schools — the one band where all six
  have comparable data. Christian's 35 JK–12 figure is disclosed in its tooltip rather than
  used as the value.
- **Row label: "Upper School student organizations"** — "organizations" rather than "clubs"
  because the counts include honor societies and leadership/media groups; the scope word is
  in the label so it is not hover-dependent.
- **New row is first in the Student Clubs group** — per the request. Order in
  `VALUE_METRICS` determines render order.
- **Tooltip text lives in `metricValues.ts` as a new optional per-cell field**, not in
  `src/locales/*.json` — it is research prose that varies per school, so by the repo's
  standing test it belongs in the data layer reached by the overlay. The *kicker* strings
  are chrome and DO go in `src/locales/*.json`.
- **`program-span` (0 of 6 commented) gets no tooltips in this plan** — there is no existing
  research to surface and inventing it is out of scope.
- **Coverage-section ✓/N/A cells are untouched.**

## Approvals needed

Both of these are **UX-design-gate items under `CLAUDE.md`, and the user gave explicit
approval during planning** (2026-08-04):

1. **A new Compare row + new metric key** (`student-clubs` / `us-organizations`) — approved.
   The user requested it directly, and additionally chose the `≥`-prefix and Upper-School-
   scope treatments from a presented set of options.
2. **A new interaction affordance on Compare cells** (the popover) — approved. The user
   asked for the tooltip, then asked to expand it across all topics, then selected
   "A + C's kicker" from a rendered design exploration.

The design exploration shown and approved during planning:
https://claude.ai/code/artifact/25e86101-252a-4c8c-85b5-1af3fb73d2ee

**No further approval is needed before `/implement` runs.** One substantive question remains
open (Cannon's figure) but it is a data question, not a gate — see Open questions.

## Out of scope

- The **Research coverage** ✓ / N/A section of the table.
- The two existing `title=` attributes on `.mark-na` / `.mark-check`.
- Tooltips on the school-detail pages, stat tiles, or anywhere outside `Compare.tsx`.
- `program-span` tooltips (no underlying research exists).
- The **competitive-club count** tile, which stays dropped — only one school publishes one.
- Re-deriving any published figure; nothing is recounted from `clubCatalog.ts`.
- Deployment. `npm run deploy` is user-only and must not be run.

## Steps

### Phase 1 — English

#### Data layer

1. **Add the `qual` field to the `ValueMetric` type** — in
   `src/data/metricValues.ts`, extend the exported type:

   ```ts
   export type CellQual = {
     /** Short uppercase kicker key — one of the `compare.qual.*` locale keys. */
     kind: 'minimum' | 'range' | 'official' | 'scope'
     /** At most two sentences. Reader-facing prose, not maintainer shorthand. */
     text: string
   }

   export type ValueMetric = {
     topic: string
     key: string
     label: string
     note?: string
     values: Record<string, string | null>
     /** Optional per-school provenance. Only cells needing a caveat appear here. */
     quals?: Record<string, CellQual>
   }
   ```

   Keep `quals` **optional and sparse** — a school slug absent from the map renders with no
   affordance, which is the design.

2. **Add the new `us-organizations` metric as the FIRST entry in the Student Clubs
   block** — in `src/data/metricValues.ts`, immediately before the existing
   `flagship-result` entry at [:316](../../src/data/metricValues.ts#L316). Also **rewrite
   the block comment at [:311-315](../../src/data/metricValues.ts#L311-L315)** so it records
   why the total-club tile is now shipping (per-cell tooltips resolve the
   exact/range/minimum objection) while the competitive-club tile stays dropped.

   ```ts
   {
     topic: 'student-clubs',
     key: 'us-organizations',
     label: 'Upper School student organizations',
     note: 'Clubs, honor societies, and student-led organizations in the Upper School. Each school counts differently — hover a figure for what it includes.',
     values: {
       cannon: '≥23',            // SEE OPEN QUESTIONS — confirm before shipping
       'charlotte-christian': '23',
       'charlotte-country-day': '~45–50',
       'charlotte-latin': '25',
       'davidson-day': '≥9',
       'providence-day': '77',
     },
     quals: {
       cannon: { kind: 'minimum', text: '…' },
       'charlotte-christian': { kind: 'scope', text: '…' },
       'charlotte-country-day': { kind: 'range', text: '…' },
       'davidson-day': { kind: 'minimum', text: '…' },
       'providence-day': { kind: 'official', text: '…' },
       // charlotte-latin deliberately absent — exact in-scope count, no caveat
     },
   }
   ```

   Source every `text` from the school's verdict line in `src/data/clubCatalog.ts` (quoted
   in Context above) and from `src/content/student-clubs/<school>.json`. **Invent nothing.**

3. **Backfill `quals` across the other six topics** — still in `src/data/metricValues.ts`,
   working topic by topic, converting the existing trailing `//` comments into reader-facing
   prose. Roughly 134 candidate cells; the real count will be lower because cells whose
   comment is purely mechanical need no tooltip.

   Apply this test per cell — **add a tooltip only when the comment tells a reader something
   the figure alone does not**:

   - **Yes** — the number is a floor, a range, a differing scope, a school's own claim
     vs. a counted figure, or carries a vintage caveat.
     (`'~75'` → *"74 courses are described in the 2026-27 catalog and one more is listed
     without a description; the school's own offerings grid shows 66."*)
   - **No** — the comment merely restates the figure or lists raw inputs with no reader
     consequence.

   For the two `sports` commit metrics, do **not** dump athlete-name lists into a tooltip.
   Write the *consequence*: that these are documented minimums, and that coverage is uneven
   per school — the block comment at
   [:368-380](../../src/data/metricValues.ts#L368-L380) already explains exactly how, per
   school, and is the source for that copy.

   Keep every original `//` comment in place. The tooltip is an addition, not a migration —
   the comments are still the maintainer's audit trail.

   Leave `program-span` with no `quals`.

#### Component layer

4. **Build the `CellQual` popover component** — new file
   `src/components/CellQual.tsx`. It wraps the figure and owns the affordance.

   - Render a `<button type="button" className="qual" popovertarget={id}>` containing the
     existing `<span className="mark-val">` and a small `<span className="qual-dot">`.
   - Render a sibling `<div id={id} popover="auto" className="tip">` holding the kicker
     (`<span className="tip-kind">{t(\`compare.qual.${kind}\`)}</span>`) and the sentences.
   - Generate the id with React 19's `useId()`, namespaced per metric+school so it is stable
     across re-renders and unique when the same school appears in several rows.
   - Set `aria-label` on the button so the accessible name says what the marker does, e.g.
     `t('compare.qualAria', { value, school })` — not just the bare number.
   - Positioning: use CSS Anchor Positioning (`anchor-name` / `position-anchor`) where
     supported, with a centered-above fallback. The popover is in the top layer either way,
     so the clipping bug cannot recur.

5. **Wire it into the value-metric cell** — in `src/pages/Compare.tsx` at
   [:188-192](../../src/pages/Compare.tsx#L188-L192), branch on whether a qual exists:

   ```tsx
   {v != null ? (
     vm.quals?.[s.slug]
       ? <CellQual value={localizeMoneyText(v)} qual={vm.quals[s.slug]} school={s.name} metricKey={vm.key} />
       : <span className="mark-val">{localizeMoneyText(v)}</span>
   ) : (
     <span className="mark-na" title={t('compare.notAvailable')}>{t('compare.na')}</span>
   )}
   ```

   Keep `localizeMoneyText(v)` on both branches — several qualified cells are tuition
   figures, and dropping it would regress the currency-localization bug class that
   `npm run check:money` exists to catch.

6. **Style the popover** — in `src/index.css`, near the existing `.mark-val` rules at
   [:1778](../../src/index.css#L1778). Reuse app tokens only (`--surface`, `--border`,
   `--muted`, `--accent`, `--heading`, `--body`); no new color literals. Cover:

   - `.qual` — resets button chrome; `cursor: help`; `:focus-visible` ring using `--accent`.
   - `.qual .mark-val` — dotted underline in the school's `--brand`, going solid on
     hover/focus.
   - `.tip` — `--surface` background, 1px `--border`, soft shadow, ~248px wide, left-aligned
     body text at ~12.5px, and the four blueprint corner marks matching the app's card
     language.
   - `.tip-kind` — 9.5px, `letter-spacing: .12em`, uppercase, `--muted`, bold.
   - `:popover-open` — the visible state.
   - **Dark mode**: verify against `:root[data-theme='dark']`; the tokens carry it, but the
     shadow needs checking on the dark surface.

7. **Hide the affordance in print** — extend the `@media print` block at
   [index.css:1863](../../src/index.css#L1863). Add `.qual-dot` to the existing
   screen-only `display: none` list, and neutralize `.qual`'s button styling so a printed
   figure looks identical to an unqualified one. Popovers do not print when closed, so no
   `.tip` rule is needed — but confirm this on the real print-out in verification.

#### Chrome strings

8. **Add the English chrome keys** — in `src/locales/en.json`, under `compare`:

   ```json
   "qual": {
     "minimum": "Documented minimum",
     "range": "Published range",
     "official": "Official list",
     "scope": "Scope note"
   },
   "qualAria": "{{value}} — what this figure counts for {{school}}"
   ```

   English only in this phase. Do not touch the other nine catalogs yet.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording and the interaction are what they want. This
gate matters more than usual here: the tooltip bodies are ~135 newly-authored sentences, and
revising them after translation would multiply every edit by nine.

### Phase 2 — Every other locale

Only after that confirmation. **Two different layers, and they are not interchangeable:**

9. **UI chrome → `src/locales/*.json`** — add the `compare.qual.*` and `compare.qualAria`
   keys to each non-English catalog listed in `TRANSLATED` in `src/lib/i18n.ts` (read the
   list; do not hardcode a count). Five short strings each.

10. **Tooltip prose → the overlay layer** — the `quals[].text` strings live in
    `src/data/metricValues.ts`, so they extract into
    `src/data/overlays/work/metric-values.<lang>.json` for every locale in
    `PROSE_TRANSLATED`. This grows that file from **157 to roughly 291 strings** per
    language, across 9 locales.

    Confirm `scripts/i18n_fields.mjs` path rules reach `quals.*.text` — the new field is
    nested one level deeper than `label` / `note`, and **if the extractor does not know
    about it, extraction silently yields nothing and every tooltip ships in English**. Widen
    the rules if needed. Do **not** extract `quals.*.kind`; it is an enum resolved through
    the locale catalogs.

    Follow `.claude/docs/prose-translation-architecture.md` for the mechanism. Do not
    re-derive it, and do not inherit a register rule from any single rollout doc — read the
    one for the language in hand.

11. **Watch the locale-specific traps** these strings will hit. The tooltip bodies are
    unusually figure-dense, which is exactly the risky shape:

    - **Figures are copied char-for-char**, never re-typed. `~45–50`, `77`, `2026-27`,
      `35` must appear verbatim in every locale's `t` field.
    - **`hi` / `te` regroup at render**, so the data must still store the English 3-3-3
      form. A work file containing a pre-regrouped figure hardcodes a transformation the
      render layer then applies a second time.
    - **`fa` / `ar` are RTL** — bidi-neutral figures need LRI…PDI isolates; strong-L Latin
      identifiers do not.
    - **`%` stays unspaced in every locale**, French included.

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | edit — add `CellQual` type + `quals` field; add `us-organizations` metric; rewrite the dropped-tile comment; backfill ~135 `quals` entries |
| `src/components/CellQual.tsx` | **new** — popover trigger + top-layer tooltip surface |
| `src/pages/Compare.tsx` | edit — branch the value cell on `vm.quals?.[slug]` |
| `src/index.css` | edit — `.qual`, `.qual-dot`, `.tip`, `.tip-kind`, `:popover-open`, dark mode, print |
| `src/locales/en.json` | edit — `compare.qual.*`, `compare.qualAria` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — same keys (Phase 2) |
| `src/data/overlays/work/metric-values.<lang>.json` | edit — ~134 new strings × 9 locales (Phase 2) |
| `scripts/i18n_fields.mjs` | edit *if needed* — reach `quals.*.text` |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run check:money` and `npm run check:currency` — clean. Non-negotiable: qualified
      cells include tuition figures, and step 5 deliberately keeps `localizeMoneyText()` on
      both branches.
- [ ] **Browser check, English, on the Compare page** — a real browser, not headless. This
      repo's standing lesson is that every post-100% defect has been render-layer:
  - [ ] Student Clubs shows **Upper School student organizations as the first Key-stats row**.
  - [ ] **Scroll the table fully right, then open a tooltip on the last column.** This is
        the clipping regression test — the whole reason for `popover`. It must render
        complete and unclipped, overflowing the `.table-wrap` boundary.
  - [ ] Open a tooltip in a row near the sticky header; confirm it is not painted under it.
  - [ ] Charlotte Latin's `25` has **no** marker; the other five do.
  - [ ] Country Day reads `~45–50` verbatim; Cannon and Davidson show the `≥` prefix.
  - [ ] Keyboard only: Tab reaches each trigger, Enter/Space opens, Esc closes, focus ring
        visible.
  - [ ] Touch or responsive-mode tap opens and dismisses the popover.
  - [ ] **Dark mode** — tooltip surface, border, and shadow all legible.
  - [ ] Spot-check one tooltip in each of the other six topics.
- [ ] **Print preview one Compare page** — figures print unchanged; no dots, no button
      chrome, no stray popover.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves. Note this validates against
      the work file, so also confirm the live page actually renders the language.
- [ ] `npm run check:figures` — per topic, including `metric-values`
- [ ] `npm run check:sepdrift -- --lang <code>` — for every locale. **Weighted heavily
      here**: the tooltip bodies are the most figure-dense prose in the repo, and the figure
      sweep normalises separators so it cannot see a swap on its own.
- [ ] `npm run check:money`, `npm run check:currency` — clean
- [ ] `npm run check:fr` — French identifier guard
- [ ] `npm run check:bn` — numeral/grouping guard
- [ ] **Browser check in at least one RTL locale (`fa` or `ar`)** — open a tooltip and
      confirm figures inside a right-to-left sentence read left-to-right, and that the
      popover anchors on the correct side.
- [ ] **Browser check in `hi` or `te`** — confirm a 7-digit figure inside a tooltip is not
      double-regrouped against the tile beside it.

## Risks

| Risk | Mitigation |
|---|---|
| A CSS-positioned tooltip is clipped by `.table-wrap { overflow: auto }` | Native `popover` (top layer). The scroll-right check in verification is the specific regression test. |
| `i18n_fields.mjs` does not reach `quals.*.text`, so extraction silently yields nothing and all tooltips ship English | Step 10 checks the path rules explicitly *before* extracting; `check:runtime` plus a rendered browser check confirm. |
| ~135 newly-authored sentences are revised after translation, multiplying edits by nine | The Phase-1 stop exists for exactly this. Do not begin Phase 2 without explicit confirmation. |
| Maintainer shorthand gets pasted in as reader copy (athlete lists, raw counts) | Step 3 states the test and calls out `sports` by name. |
| Popover overlays the sticky header or first column | Top layer sits above all page z-index; verified in the browser check. |
| 144 potential triggers hurt table interaction or performance | Only qualified cells get a button; `popover="auto"` is browser-managed with no JS listeners. |
| Country Day's `~45–50` breaks the numeric `lead` highlight | Accepted and intended — `numericOf()` returns null and the cell simply never leads. Confirm it does not throw. |
| Adding a row shifts the Student Clubs table and could regress the grid-border fix from PR #98 | Included in the browser check. |

## Open questions

- **What is Cannon's actual Upper School organization figure?** The `≥23` in step 2 came
  from a planning-time design mock and is **not sourced**. `clubCatalog.ts` enumerates 15
  named orgs but is an explicitly non-exhaustive consolidated merge across four dossiers and
  all three divisions — so 15 is not an Upper-School figure either.
  **Default:** derive a defensible Upper-School floor by counting only Upper-School-banded
  entries in `src/content/student-clubs/cannon.json`, render it with the `≥` prefix, and
  write the tooltip to say plainly that Cannon publishes no chartered directory. If no
  defensible Upper-School floor can be established, **render the cell `null` (N/A)** rather
  than shipping an unsourced number — losing a cell is much cheaper than inventing one, and
  the sibling `participation` metric already nulls two schools for exactly this reason.
  Report which route was taken.

- **Does the trailing-comment backfill in step 3 want every eligible cell, or a first
  tranche?** ~135 tooltips is a large single review.
  **Default:** do all of them in one pass — they are one editorial motion and splitting
  costs a second full review cycle — but if the diff becomes unreviewable, land the new
  Student Clubs row plus `college-support` and `financial-aid-tuition` first (the topics
  where figures are most caveat-laden), and note the remainder for a follow-up.

- **Should `program-span` get researched tooltips later?** It is the only metric with zero
  existing provenance comments.
  **Default:** leave it alone; out of scope.

## Implementation notes

**Phase 1 (English) shipped.** Deviations / decisions taken from the plan's defaults:

- **Cannon's figure resolved to `≥19`, not the mock's unsourced `≥23`.** Per the plan's
  default I derived a defensible Upper-School floor from
  `src/content/student-clubs/cannon.json`: **8 named Upper School organizations** (Affinity
  Groups, Habitat Club, Star Wars Club, Yearbook/The Flashback, DECA, Model UN, Cannon
  School Gaming, Upper School Student Council) **+ 11 confirmed Upper School honor
  societies** (the "1c" redesign note is authoritative — "11 CONFIRMED, all Upper School,"
  read from the page's list element, superseding the older 9-in-scope PDF). Rendered with
  the `≥` prefix and a `minimum` tooltip stating plainly that Cannon publishes no chartered
  directory. No number was invented.

- **Backfill was done in one pass (the plan's first default), not split.** The first pass
  applied the "tells a reader something the figure alone doesn't" test strictly (~31
  tooltips). **After review the user asked to explain *every* terse cell** in The Arts,
  College Support, and After School — the topics whose values are the most coded
  (`NCTC festival`, `31+ Blumey noms`, `3 pillars`, `8 / 17`, `~44:1`, `6:00 PM`). So those
  three topics are now **fully covered**: every non-N/A value cell carries a tooltip
  (~90 total across the file). This reverses the earlier decision to leave `program-span`,
  `latest-pickup`, `ap-performance`, and the uniform selectivity buckets uncovered — the
  request was explicit that the marker's presence mattered less than every cell being
  explained. Course-offerings, financial-aid, student-clubs, and sports keep the selective
  treatment. College-support bucket tooltips restate each fraction in words per school and
  copy the numerator char-for-char; verified 46 college-support + 3 after-school figures
  appear verbatim in their tooltip text (Arts count-words like "three pillars" are prose,
  not citations).

- **`CellQual.tsx` uses one `@ts-expect-error`, not two.** React 19 already types
  `popover="auto"` on the DOM but not `popovertarget`, so only the button attribute needs
  the suppression; the plan's sketch implied both.

- Verification: `tsc`, `build`, `check:money`, `check:currency`, `check:runtime` all clean;
  full Playwright browser sweep (light + dark, keyboard, print media, right-scroll clipping
  regression, all 7 topics) all PASS. `check:metrics` failures are pre-existing/advisory and
  unrelated to this change.

- **Tooltip interaction reworked after review (still Phase 1, no new strings):** it now
  opens on **hover / keyboard focus** rather than click, is **wider (340px, escaping the
  cell width)**, and **scrolls vertically** (`.tip-scroll`, `max-height` ~200px) for any
  body taller than the cap. `popover="manual"` + JS `showPopover()`/`hidePopover()` on
  pointer-enter/leave and focus/blur drive it, with a 160ms close grace so the pointer can
  travel onto the tip to scroll. Widening reintroduced a right-edge viewport overflow on the
  last column, so positioning moved from CSS anchor-positioning (unreliable across the
  fallback chain here) to `position: fixed` coordinates computed in `place()` from the
  trigger rect and **clamped into the viewport** — the top layer still defeats
  `.table-wrap`'s clipping. Note: Playwright's `.hover()` fires a synthetic `pointerleave`
  immediately after enter, so headless hover-persistence isn't testable with it; verified
  via the event trace (`enter → toggle:open → leave → toggle:closed`) that a real stationary
  cursor keeps it open, plus screenshots of the open state on both an edge column (dark) and
  an interior column (light).

### Phase 2 — locales (shipped)

All 9 non-English locales translated and live. Layers handled per the standard:

- **Chrome** (`compare.qual.minimum/range/official/scope` + `compare.qualAria`) added to all
  9 `src/locales/*.json` catalogs.
- **Tooltip prose** — 108 new strings per locale extracted into
  `src/data/overlays/work/metric-values.<lang>.json` (157 existing translations preserved by
  a text-keyed merge, so only genuinely-new strings were translated), built + stamped into
  `src/data/overlays/metric-values.<lang>.json` (265 entries each).

**The extractor trap the plan warned about was real and fixed.** `quals[].kind` is an enum
resolved via the locale catalogs, but the global `PROSE_KEYS` set marks the leaf `kind` as
prose (for artsPrograms season slots), so the walker extracted the four kind enums. Added
six `['quals.<slug>.kind', false]` PATH_OVERRIDES in `scripts/i18n_fields.mjs` (the matcher
does suffix, not mid-path wildcard, so one per school). `quals.<slug>.text` needed no rule —
leaf `text` is already prose.

**Clock-time convention.** The French agent localized `6:00 p.m.` → `18h00`; corrected to
12-hour per the fr rollout doc (`18 h 00` was a documented past defect). Every other locale
kept the 12-hour form. Grade ordinals (`grades 7–12` → `7e à 12e`) were left localized —
descriptive, not citations.

Verification (all clean): `tsc`, `build`, `check:runtime` (all 9 locales resolve),
`check:sepdrift` (metric-values 0 drift in every locale — the 178 es tokens are the
pre-existing main-branch defect, not in this layer), `check:fr`, `check:hi`, `check:fa`,
`check:bidi`, `check:money`, `check:currency`, `check:translations` (metric-values 100% ·
285/285 · no drift), `check:hashes`. Browser-verified tooltips in fa + ar (RTL, figures
read LTR inside RTL prose via the isolates), and te + hi (7-digit figure stays 3-3-3 in the
tooltip prose while the tile beside it regroups to lakh/crore — the documented interaction).
