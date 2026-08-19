---
name: add-nc-admissions-data
title: College Support — new first card "Admissions Rate for Top NC Public Universities"
status: english-done
phases: 2
created: 2026-08-19
branch: feat/add-nc-admissions-data
prs: []
---

# College Support — new first card: Admissions Rate for Top NC Public Universities

## Goal

Add a seventh card to the **College Support** research area — *Admissions Rate for Top NC
Public Universities* — and make it the **first** card, ahead of *The Transcript Colleges
See*. It shows, per school, how that school's own applicants fared at the six top NC
public universities: applied / accepted / admit rate for the most recent class, plus a
pooled five-year rate.

The data is **government-published** (the UNC system's Insight dashboard), not the
school's own marketing figure, which is what makes the card worth building. Success looks
like: every school with dashboard data renders the card first in its College Support
section, every figure traces to a committed `source-material/` file, and
`.claude/docs/DATA-SCHEMA.md` records both the card and the fact that
`nc-admissions-data` is what populates it.

## Context

### The card registry drives everything

`COLLEGE_SUPPORT_CARDS` in [`src/data/collegeSupport.ts:380`](../../src/data/collegeSupport.ts)
is a `satisfies readonly { key, title, kicker }[]` array of six entries. It is the single
source of card **order**: [`src/pages/SchoolDetail.tsx:635`](../../src/pages/SchoolDetail.tsx)
does

```ts
const csCardList = csEntry
  ? COLLEGE_SUPPORT_CARDS.filter((c) => csEntry[c.key] != null)
  : []
```

so a card renders only when the school's program object has that key, and cards render in
array order. **Putting the new entry first in that array is the whole of "make it the
first card"** — no component or CSS ordering work is involved.

Note the guard immediately after: `const collegeSupport = csCardList.length > 0 ? csEntry
: undefined`. An entry that is present but empty is still truthy and would suppress the
school's ingested prose, leaving the section blank. Adding a seventh optional key does not
change that logic, but do not weaken it.

### The card bodies and their primitives

[`src/components/CollegeSupport.tsx`](../../src/components/CollegeSupport.tsx) (758 lines)
exports one `*Body` component per card and a `CollegeSupportCardBody` dispatcher at the
foot of the file. `SchoolDetail` owns the `<details>` shell and `<BlueprintCorners />`, so
a body renders content only.

The primitives the new card needs **already exist in that file** and must be reused rather
than re-implemented:

| Primitive | What it gives you |
|---|---|
| `Lead` | bold headline + muted subhead — the card's takeaway sentence |
| `Stats` | the hairline stat strip; grid columns are `repeat(min(n,4), 1fr)`, so a 4-cell strip is exactly what it is built for |
| `Heading` | section heading with optional muted hint |
| `Note` | the trailing muted note — the method note |
| `Flags` | `TO VERIFY` / `DISCREPANCY` / `PUBLICATION GAP` chips |
| `SourceRow` | the SOURCE footer, linkifying any citation with a `url` |
| `RichText` | `**bold**` spans + `localizeMoneyText()` on every segment |

The ledger table pattern is `TranscriptBody`'s National Merit table: `.cs-ledger-wrap` >
`table.cs-ledger` > `thead`/`th.cs-th` + `tbody`/`td.cs-td`. CSS lives at
[`src/index.css:3699`](../../src/index.css) onward, including `.cs-th-count`
(right-aligned, 80px) and `.cs-ledger { min-width: 420px }` under the mobile breakpoint at
line 3987.

### The proportional bar already exists too

The design's rate bars have a working precedent in
[`src/components/SportsProgram.tsx:249`](../../src/components/SportsProgram.tsx):

```tsx
<span className="sports-bar-track">
  <span className="sports-bar-fill" style={{ width: `${Math.round(bar.pct * 100)}%` }} />
</span>
```

with `.sports-bar-track` / `.sports-bar-fill` / `.sports-bar-track-sm` / `-xs` at
[`src/index.css:2733`](../../src/index.css). **Add `.cs-bar-*` classes modelled on these
rather than reaching across into the `sports-*` namespace** — the College Support CSS
block is self-contained and should stay that way.

### Where the data comes from

The [`nc-admissions-data`](../skills/nc-admissions-data/SKILL.md) skill. Its
[`reference/METHOD.md`](../skills/nc-admissions-data/reference/METHOD.md) is **required
reading before touching the dashboard** — every cheap path is blocked server-side and
returns HTTP 200 while serving the wrong sheet.

The standing target set is fixed and must **not** be re-derived (settled 2026-08-19), as
exact dashboard strings:

```
UNC-Chapel Hill            NC State University        UNC Charlotte
East Carolina University   UNC Wilmington             UNC Greensboro
```

Hyphenation is inconsistent in the dashboard's own house style, and it is **East** Carolina,
not "Eastern". An exact-match filter fails **silently** on either slip.

### Current state of the source material

`source-material/college-support/<school>/` exists for all 11 schools; **none currently
holds NC admissions data.** All 11 schools have a file in
[`src/data/collegeSupportPrograms/`](../../src/data/collegeSupportPrograms/):

```
cannon  carmel-christian  charlotte-catholic  charlotte-christian
charlotte-country-day  charlotte-latin  covenant-day  davidson-day
gaston-day  hickory-grove-christian  providence-day
```

### The schema doc is generated

[`scripts/gen_data_schema.mjs:225`](../../scripts/gen_data_schema.mjs) already registers
`college-support` in its `STRUCTURED` list, reading `COLLEGE_SUPPORT_CARDS` out of source.
**The new card key therefore appears in `DATA-SCHEMA.md` automatically** once `npm run
schema` runs. What is *not* automatic is the standing-rule prose: line 408's `if (s.topic
=== 'college-support')` block is where the "populated by `nc-admissions-data`" note must be
added by hand.

`npm run check:schema` is chained into `npm run build`, so a stale doc fails the build.

### The design file — READ DURING PLANNING, transcribed below

`College Support Section Redesign.dc.html` **was read during planning** via the
`DesignSync` MCP tool (`get_file`), project
`5da24575-40bf-4787-8934-0fadfc56059f`. `/implement` does not need to re-fetch it — the
markup that matters is transcribed here — but it can, the same way:

```
DesignSync { method: 'get_file',
             projectId: '5da24575-40bf-4787-8934-0fadfc56059f',
             path: 'College Support Section Redesign.dc.html' }
```

The file also holds `nc-publics-card-handoff-instructions.md`, which is byte-identical to
the brief the user pasted — no extra requirements hide in it.

**Section 2a's real markup, and where it differs from what you would guess:**

- **The ledger is a CSS GRID, not a `<table>`.** One outer `div` with
  `grid-template-columns: 54px 1fr 92px 92px 200px 110px`, six header cells, then one
  `div { display: contents }` per university wrapping its six cells. This is a real
  divergence from the app's existing `.cs-ledger` `<table>` pattern — see the Decisions
  entry on which one wins.
- **Six columns**: Rank · University · Applied · Accepted · Admit rate from this school ·
  5-yr avg.
- **The header row is filled** — `background: var(--color-neutral-100)`, 10.5px, uppercase,
  `letter-spacing: 0.1em`, `text-muted`. Applied / Accepted / 5-yr avg are right-aligned;
  Rank / University / Admit rate are not.
- **The rank numeral is brand-colored** — `color: var(--brand)`, `var(--font-heading)`,
  600, 15px, rendered `#{{ r.rank }}`.
- **The university cell is two lines** — `<strong>` name (heading font, 15px, `display:
  block`) over an 11.5px `text-muted` note.
- **The rate cell is a flex row**: the percentage (`min-width: 38px`, heading font, 600,
  15px) then the bar, which is `flex: 1; height: 8px; background: var(--color-neutral-100);
  border: 1px solid var(--color-divider)` with an absolutely-positioned inner span at
  `width: {{ r.rate }}%; background: var(--brand)`.
- **The 5-yr cell is two lines, right-aligned** — the percentage over an 11px `text-muted`
  pooled-counts line (`341 applied · 133 in`).
- **Card frame**: `.blueprint` with the four `<i class="corner tl|tr|bl|br">` registration
  marks — which the app already supplies via `<BlueprintCorners />` in the `<details>`
  shell, so the body must **not** re-add them.
- **The header block** is `h3` (22px) + a 13px `text-muted` parent question + the takeaway
  paragraph (14.5px), separated from the stats by
  `border-bottom: 1px solid var(--color-divider)`.
- **The `2a` chip and the "— the in-state ledger" suffix are review scaffolding**, exactly
  like the `1a…1f` labels. They do **not** ship. The card title is
  `Admissions Rate for Top NC Public Universities` alone.

**The design's mock row shape** — this is the field list the data type mirrors:

```js
{ rank: 1, name: 'UNC-Chapel Hill', note: 'Flagship · most-applied campus',
  applied: 74, accepted: 29, rate: 39, avg5: 39, avgNote: '341 applied · 133 in' }
```

Note the design stores `rate`/`avg5` as bare **numbers** and appends `%` in the template,
and reuses `rate` for the bar width. See the Decisions entry — the app stores display
strings instead.

## Decisions

- **Card key is `ncAdmissions`** — reads clearly beside `transcript` / `counseling` /
  `outcomes`, and is source-neutral in the same way the skill's name is (the skill is named
  for the state, not the UNC system, deliberately).
- **UNC Insight dashboard is the sole data source** — user's call. All six target
  universities are UNC-system campuses, so the dashboard covers every cell of the ledger. No
  SCOIR/Naviance chasing. A school's own published profile is consulted only if it
  contradicts the dashboard, and then both figures ship with a `DISCREPANCY` flag.
- **The scrape runs during `/implement`, not planning** — user's call. It is ~30–60s per
  filter combination and would consume the planning window. No `source-material/` was
  staged by `/plan`.
- **The "most recent class" is whatever the dashboard's latest term is at research time,
  per school** — not hardcoded to Fall 2025. The dashboard currently covers Fall 2016–2025.
  The card's data carries the term label as a field so the rendered year is always the
  latest available rather than a stale constant. This is the user's explicit requirement.
- **The five-year window is the five most recent terms available**, pooled — sum the
  applied and sum the accepted across those terms, then divide. **Never average the five
  annual rates**: that weights a 6-applicant year equally with a 60-applicant one.
- **Rank order is the current US News National Universities list for NC publics** — the
  same qualifier the standing Top 6 was chosen under. Appalachian State is ranked *Regional
  Universities South*, a different list, which is why "top 6 in NC" is not self-defining.
  Re-verify the ordering at research time but keep the set at exactly these six.
- **Universities are stored with a stable `key`, and their display names are skipped from
  translation** — `name` is already in `SKIP_KEYS` as a proper noun. See the i18n trap in
  Risks.
- **A school with no dashboard data at all omits the card** — its program object simply has
  no `ncAdmissions` key, matching how every other optional card behaves. No empty shell.
- **The ledger ships as a `<table>`, not the design's CSS grid.** The design uses
  `display: contents` rows inside one grid; the app's `.cs-ledger` pattern is a real table
  with `<th scope="col">`. Take the table: it is tabular data, `display: contents` on a row
  wrapper is a known screen-reader hazard, the app already has the CSS and the
  `.cs-ledger-wrap` horizontal-scroll behaviour the mobile breakpoint depends on, and the
  visual result is identical. **Match the design's visual spec exactly** — column widths,
  the filled `--color-neutral-100` header, alignment, the brand rank numeral, the two-line
  cells — via `<col>`/CSS on the table. This is a deliberate structural divergence; note it
  in the PR body.
- **Rates are stored as display strings (`'39%'`), with a separate `ratePct` number for the
  bar.** The design stores a bare number and appends `%` in the template. Strings are right
  here for two reasons: the repo's standing rule is that a published figure is copied
  char-for-char and never re-typed or recomputed at render, and a percentage that is
  suppressed for a small base needs to be absent rather than zero. `ratePct` (0–1) is
  render-only geometry and never displayed.

## Approvals needed

**Granted 2026-08-19.** The user approved the new card under the UX-design gate: a seventh
`COLLEGE_SUPPORT_CARDS` key, a new `NcAdmissions` type, a new component body, new locale
keys, and the card rendering **first** in the College Support area for every school that
has data. `/implement` does not need to re-ask.

No new Compare row and no new metric key are in scope — see *Out of scope*.

## Source material

**Nothing staged by `/plan`** — the scrape is Step 1 of Phase 1 by the user's decision.

`/implement` writes, per school:

```
source-material/college-support/<school>/<School> - College Support - UNC System Admissions.md
```

Each file must carry, per the data-provenance standard and the skill's §5:

- A provenance header — who/when/how, citing `nc-admissions-data` as the method.
- The dashboard URL.
- The **exact filter values used**: institution string, school string, term range, and the
  Recent-High-School-Graduate setting.
- **Full per-term counts** — Applied, Admitted, Enrolled for every term, not just the
  derived rate. A rate without its denominator is not reconstructable.
- Anything the dashboard suppressed or did not publish, marked as *not found / not
  published* — never silently zeroed.

Then run the `ingest-source-material` skill on the branch.

## Out of scope

- **No new Compare row and no new metric key.** Both are separate UX-gate items; this plan
  adds a card only. If the pooled rate looks like a good Compare row, propose it afterward.
- **Non-UNC destinations.** The dashboard covers the 16 public UNC campuses and nothing
  else. This card is explicitly not a matriculation list and must not be described as one.
- **Re-deriving the Top 6.** Settled; use the six exact strings above.
- **Changing the existing six cards.** Their content, order relative to each other, and
  data are untouched.
- **Deploying.** `npm run deploy` is the user's call, every time.

## Steps

Two phases — the card adds user-facing text at **both** layers: chrome keys in
`src/locales/*.json` for the column headers and fixed labels, and research prose in the
overlay layer for each school's headline, takeaway, and notes.

### Phase 1 — English

1. **Read the method.** Open
   [`.claude/skills/nc-admissions-data/reference/METHOD.md`](../skills/nc-admissions-data/reference/METHOD.md)
   in full — §1 (what does not work), §2 (the working method), §3 (exact filter strings),
   §4 (reference tables for the smoke test). Do not improvise an approach.

2. **Scrape all 11 schools × the standing Top 6.** Follow §2: headful Chrome + CDP, real
   mouse events, clear-then-check-one selection, screenshot to read values. Pull enough
   terms to cover the five most recent, plus the latest term for the "most recent class"
   figures.

   Three traps, all of which produce plausible-but-wrong tables that render without any
   error:
   - **Clicking a school directly UNCHECKS it**, giving *statewide-minus-that-school*.
     Clear via `(All)` until the checked count is 0, then check the one school — and drive
     that loop on the **measured** count, because `(All)` cycles.
   - **Fuzzy name matching.** The list truncates at ~30 chars and holds decoys (`Covenant
     School` vs `Covenant Day School`). Our **Carmel Christian School is listed as `Carmel
     Christian`**. Match exact strings from §3.2.
   - **Institution-string slips** fail silently — see the hyphenation and East/Eastern
     notes above.

   Smoke-test against §4's reference tables before trusting the run: if Cannon School
   reproduces, the wiring is right.

3. **Sanity-check, then persist and ingest.** Per the skill's §4: `Admitted ≤ Applied` and
   `Enrolled ≤ Admitted` every term; `Admit Rate ≈ Admitted / Applied` to within rounding;
   a term that jumps implausibly usually means a filter did not apply — re-verify the panel
   text reads the school you intended. Then write the `source-material/` files described
   above and run `ingest-source-material` on the branch.

4. **Add the `NcAdmissions` types** to
   [`src/data/collegeSupport.ts`](../../src/data/collegeSupport.ts), in the file's existing
   comment style, in a new `/* ---- 1g nc admissions ---- */` block placed **before** the
   transcript block so source order matches render order:

   ```ts
   /**
    * One university's row in the six-university ledger. Mirrors the design's
    * mock row — { rank, name, note, applied, accepted, rate, avg5, avgNote } —
    * with the figures as display strings rather than bare numbers.
    */
   export type NcUniversity = {
     /** Stable key — 'unc-chapel-hill', 'nc-state', … Never displayed. */
     key: string
     /** Display name, EXACTLY as the dashboard spells it. Not translated. */
     name: string
     /** US News National Universities rank position within NC publics, 1–6. */
     rank: number
     /** Short descriptive note beside the name ("Hometown campus") — prose. */
     note?: string
     /** Most recent class: applications from this school. */
     applied: string
     /** Most recent class: acceptances. */
     accepted: string
     /**
      * Admit rate for the most recent class, e.g. '39%'. Omitted where the
      * denominator is missing — never estimated. See `flags` for the gap.
      */
     rate?: string
     /** 0–1, drives the proportional bar width. Omitted with `rate`. */
     ratePct?: number
     /** Five-year pooled rate, e.g. '39%' (the design's `avg5`). */
     fiveYearRate?: string
     /** Pooled denominator line, e.g. '341 applied · 133 in' (`avgNote`). */
     fiveYearCounts?: string
   }

   export type NcAdmissions = {
     headline: string
     subhead?: string
     /** The 4-cell stat strip. */
     stats: CsStat[]
     /** Heading over the ledger. */
     ledgerTitle?: string
     /**
      * The six universities, in US News rank order. Ships exactly six where the
      * dashboard has data for all six; a campus with no data is still listed
      * with counts and a gap flag rather than dropped.
      */
     universities: NcUniversity[]
     /** The method note beneath the ledger. */
     methodNote?: string
     flags: CsFlag[]
     sources: CsSource[]
   }
   ```

   Add `ncAdmissions?: NcAdmissions` as the **first** field of `CollegeSupportProgram`, and
   prepend the registry entry — this is what makes it the first card:

   ```ts
   {
     key: 'ncAdmissions',
     title: 'Admissions Rate for Top NC Public Universities',
     kicker: "If we're aiming in-state, what are our odds from here?",
   },
   ```

5. **Build `NcAdmissionsBody`** in
   [`src/components/CollegeSupport.tsx`](../../src/components/CollegeSupport.tsx), placed
   before `TranscriptBody`, and register it in the `CollegeSupportCardBody` dispatcher at
   the foot of the file. Structure:

   - `<Lead headline subhead />` — the takeaway sentence. In the design this is bold text
     plus a muted continuation, which is exactly what `Lead` renders. Do **not** re-add the
     `h3` or the parent question: `SchoolDetail`'s `<summary>` already renders the card
     title and teaser, and `<BlueprintCorners />` already draws the four registration
     marks. The body starts at the takeaway.
   - `<Stats stats={data.stats} />` — four cells, matching the design's captions in shape:
     applications to the six universities from the most recent class; that class's
     acceptance rate with raw counts ("163 of 230"); the five-year pooled rate with its
     pooled counts and the class range; the most-applied university.
   - `<Heading>{data.ledgerTitle ?? t('sections.ncLedger')}</Heading>` then
     `.cs-ledger-wrap > table.cs-ledger.cs-nc-ledger`. Six columns, matching the design's
     `54px 1fr 92px 92px 200px 110px` track and its alignment:

     | Col | Header | Width | Align | Content |
     |---|---|---|---|---|
     | 1 | Rank | 54px | left | `#1`–`#6`, `var(--brand)`, heading font 600 15px |
     | 2 | University | `1fr` | left | `<strong>` name (15px, block) over 11.5px muted note |
     | 3 | Applied | 92px | right | heading font 600 15px |
     | 4 | Accepted | 92px | right | heading font 600 15px |
     | 5 | Admit rate from this school | 200px | left | percentage + proportional bar |
     | 6 | 5-yr avg | 110px | right | percentage over 11px muted pooled counts |

     Use `th.cs-th` / `td.cs-td` with `scope="col"` on every header, as `TranscriptBody`
     does. The header row is **filled** — `var(--color-neutral-100)`, 10.5px, uppercase,
     `letter-spacing: 0.1em` — which is a new variant, so add `.cs-th-filled` rather than
     changing `.cs-th` and disturbing the other cards' ledgers.
   - The rate cell is a flex row: the percentage span (`min-width: 38px`) then
     `.cs-bar-track > .cs-bar-fill` with
     `style={{ width: `${Math.round(u.ratePct * 100)}%` }}`. **Guard it** — a row with no
     `ratePct` (the PUBLICATION GAP case) renders its counts and no bar at all, not a
     zero-width bar, which would read as a 0% admit rate.
   - `{data.methodNote && <Note text={data.methodNote} />}`
   - `<Flags flags={data.flags} />` then `<SourceRow sources={data.sources} />`. The design
     shows a `TO VERIFY` chip about the US News rank order needing re-scoring — carry that
     as a real `CsFlag`, since it is true of every school.

   Every string a school varies comes from the data; every fixed label goes through
   `useTranslation()` (Step 7).

6. **Add the ledger CSS** to the College Support block in
   [`src/index.css`](../../src/index.css), beside the existing ledger rules around line
   3699:

   - `.cs-bar-track` / `.cs-bar-fill` — model on `.sports-bar-track` / `.sports-bar-fill`
     (line 2733) but keep them in the `cs-` namespace; the design's bar is `height: 8px`,
     track `var(--color-neutral-100)` with a `var(--color-divider)` border, fill
     `var(--brand)`.
   - `.cs-th-filled` — the filled header variant (`var(--color-neutral-100)`, 10.5px,
     uppercase, `letter-spacing: 0.1em`). A **new class**, not a change to `.cs-th`, so the
     other cards' ledgers are untouched.
   - `.cs-rank` — brand-colored heading numeral; `.cs-td-uni` — the two-line name cell;
     `.cs-td-5yr` — right-aligned two-line pooled cell.
   - Column widths via `<col>` or `nth-child` matching the design's track.

   Extend the mobile breakpoint at line 3987 so the new table gets a sensible `min-width`
   inside `.cs-ledger-wrap` and the bar column does not collapse. Note the app's brand
   accent is per-school (`src/data/brands.ts`) whereas the design hardcodes `#be123c` —
   use the app's token, not the design's literal.

7. **Add the English chrome keys** to
   [`src/locales/en.json`](../../src/locales/en.json). Column headers and fixed labels are
   identical for every school, so they are **chrome**, not prose — the same test that puts
   `collegeSupport.flag_*` in the locale files. Add under `sections.*` and/or `tables.*`
   following the existing naming: the ledger heading, and the six column headers (rank,
   university, applied, accepted, admit rate, 5-yr rate).

   The card **title** needs no key here — `cardTitle()` in
   [`src/lib/labels.ts:90`](../../src/lib/labels.ts) falls back to the registry `title`
   when `cards.college-support.ncAdmissions` is absent, and that key is added in Phase 2.

8. **Write the 11 per-school data entries** in
   [`src/data/collegeSupportPrograms/<slug>.ts`](../../src/data/collegeSupportPrograms/),
   each transcribed from that school's committed `source-material/` file. Per school:

   - The takeaway `headline` states the pooled five-year combined rate and the
     UNC-Chapel Hill rate, per the spec.
   - Every rate **carries its denominator.** Never publish a bare percentage from a
     single-digit base — a rate over 8 applicants is not comparable to one over 300.
   - Label the figure as what it is: *the rate at which that university admitted that high
     school's applicants* — a joint property of the pair, not either institution's admit
     rate. The `methodNote` says this.
   - A university where the dashboard publishes acceptances but no application count gets
     counts and a `PUBLICATION GAP` flag, with `rate`/`ratePct` omitted — **never
     estimated.**
   - `sources` cites `insight.northcarolina.edu` with the dashboard URL so `SourceRow`
     linkifies it.
   - A school with no dashboard data at all gets **no `ncAdmissions` key** — the card is
     absent, not empty.

9. **Update the schema generator** —
   [`scripts/gen_data_schema.mjs`](../../scripts/gen_data_schema.mjs), inside the existing
   `if (s.topic === 'college-support')` block at line 408. Add a standing-rule paragraph
   recording that `ncAdmissions` is the area's **first** card, that it is populated by the
   [`nc-admissions-data`](../skills/nc-admissions-data/SKILL.md) skill from the UNC Insight
   dashboard, that the target set is the standing Top 6 as exact dashboard strings, that
   every rate carries its denominator, and that the rendered term is the latest available
   rather than a fixed year. This is the doc `/add-school` reads first, so a rule that lives
   only in a plan protects no future school. Then run `npm run schema`.

10. **Add the CLAUDE.md pointer** — a short paragraph in the College Support / data-schema
    area noting that this card exists and is populated by `nc-admissions-data`, so the
    project's standing instructions carry it. Keep it to a few lines; the detail lives in
    the schema doc and the skill.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English card is what they want — wording, column headers, the
takeaway sentence, and the rendered term.

### Phase 2 — Every other locale

Only after that confirmation. **Two different layers, two different mechanisms** — see
[`prose-translation-architecture.md`](../docs/prose-translation-architecture.md) for the
mechanism rather than re-deriving it.

1. **Classify the new fields in
   [`scripts/i18n_fields.mjs`](../../scripts/i18n_fields.mjs) BEFORE extracting.** This is
   the step that determines what ships translated, and getting it wrong is the repo's most
   repeated defect class.

   - `note` and `methodNote` are already in `PROSE_KEYS` — correct, they are prose.
   - `headline` / `subhead` are already prose — correct.
   - `name` is already in `SKIP_KEYS` as *"proper noun — people, schools, colleges,
     sports, venues"*. **This is correct for the university names and must stay** — the
     dashboard's spelling is what a reader matches against the source.
   - `key` must **not** be translated. It is a lookup identifier. Add it to `SKIP_KEYS` if
     absent, or pin `ncAdmissions.universities[].key` false in `PATH_OVERRIDES` — the same
     failure `flags[].kind` caused (58 blank chips across six schools, at 100% coverage).
   - `applied`, `accepted`, `rate`, `fiveYearRate`, `fiveYearCounts` are **figures** and
     must be copied char-for-char, never re-typed. Note `fiveYearCounts` carries the word
     *"applied"* and a separator (`341 applied · 133 in`) — decide deliberately whether that
     word translates, and if it does, pin the path prose and confirm `check:sepdrift`
     still passes on the numerals.

2. **Translate the chrome keys** — every `src/locales/*.json` file per `TRANSLATED` in
   [`src/lib/i18n.ts`](../../src/lib/i18n.ts). Read the list from the file; do not hardcode
   a count. Add `cards.college-support.ncAdmissions` (the card title) in each, alongside
   the `sections.*` / `tables.*` keys from Phase 1 Step 7.

3. **Extract, translate and stamp the prose overlay** for `college-support` per
   `PROSE_TRANSLATED`, following the rollout docs. Per-school headlines, subheads, notes,
   flag text and university `note` fields move; figures do not.

4. **Locale-specific traps** — do not re-derive these, they are recorded:
   - **`hi` / `te`** regroup lakh/crore at render, so the data must store the English 3-3-3
     figure. A work file containing a pre-regrouped figure hardcodes a regrouping the render
     layer then applies a second time.
   - **`fa` / `ar`** are RTL: bidi-neutral figures and the `·` separator in
     `fiveYearCounts` need LRI…PDI isolates so they read left-to-right inside an RTL
     paragraph. The `≈`-outside-the-isolate bug is a known instance of exactly this.
   - **`fr`** groups with a narrow no-break space; percent signs stay **unspaced in every
     locale**, French included — these percentages are citations a parent matches against
     the source.

## Files touched

| File | Change |
|---|---|
| `source-material/college-support/<school>/<School> - College Support - UNC System Admissions.md` | new — 11 files, scraped data + provenance |
| `src/data/collegeSupport.ts` | edit — `NcUniversity` / `NcAdmissions` types, `ncAdmissions` on the program type, registry entry prepended |
| `src/data/collegeSupportPrograms/*.ts` | edit — 11 files, one `ncAdmissions` entry each (or deliberately none) |
| `src/components/CollegeSupport.tsx` | edit — `NcAdmissionsBody` + dispatcher case |
| `src/index.css` | edit — `.cs-bar-*`, `.cs-rank`, `.cs-td-uni`, mobile breakpoint |
| `src/locales/en.json` | edit — Phase 1 chrome keys |
| `src/locales/*.json` | edit — Phase 2, all other locales per `TRANSLATED` |
| `scripts/i18n_fields.mjs` | edit — Phase 2, classify the new leaf names |
| `src/data/overlays/college-support.*.json` | edit — Phase 2, regenerated prose overlay |
| `scripts/gen_data_schema.mjs` | edit — standing-rule paragraph in the college-support block |
| `.claude/docs/DATA-SCHEMA.md` | regenerated — `npm run schema` |
| `CLAUDE.md` | edit — short pointer to the card and its skill |
| `src/data/schools.json` | regenerated — `ingest-source-material` |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:schema` — passes (run `npm run schema` first)
- [ ] `npm run check:metrics` — no new unmatched subtopic from the ingest
- [ ] `npm run check:seo` — routes and `<head>` still agree
- [ ] `npm run build` — succeeds (chains `check:schema`, `check:ranks`, `check:seo`)
- [ ] **Arithmetic spot-check, by hand, on two schools** — recompute each ledger row's
      `rate` from its own `applied`/`accepted`, and recompute the pooled five-year rate as
      `sum(accepted) / sum(applied)`, not the mean of the annual rates. A rate that is the
      average of five rates is the specific error this check exists to catch.
- [ ] **Every figure traces to a committed `source-material/` file.** Pick five figures at
      random across schools and find each one in its file.
- [ ] **Browser check** — open two schools (Providence Day and Charlotte Latin, per the
      standing rule that Latin exercises flag-chip and hedge paths Providence Day never
      touches). Confirm: the card renders **first** in College Support; the four stat cells
      read correctly; the six ledger rows are in rank order; the proportional bars scale
      sensibly and a gap row renders without a bar; the SOURCE row links to the dashboard.
- [ ] **Confirm the rendered term is the latest available**, not a stale year — check the
      card against the dashboard's most recent term.
- [ ] **Compare against section 2a** — column order and alignment, the filled header row,
      the brand rank numerals, the two-line university and 5-yr cells, and the bar scaling.
      The `2a` chip and the "— the in-state ledger" title suffix must **not** appear; the
      card body must not double the blueprint corners the `<details>` shell already draws.
- [ ] Check a school **without** dashboard data (if any): the card is absent entirely, and
      the school's other six cards are unaffected.
- [ ] Mobile viewport — the ledger scrolls inside `.cs-ledger-wrap` and the page body does
      not scroll horizontally.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves against live `src/data/**`
- [ ] `npm run check:translations` and `npm run check:chrome` — no unclassified new field
- [ ] `python3 scripts/check_figures.py --topic college-support` — figures intact
- [ ] `npm run check:sepdrift -- --lang <each>` — no separator re-typing. **Matters more
      for `hi`/`te`**, not less.
- [ ] `npm run check:money` and `npm run check:currency` — no render path bypasses
      `localizeMoneyText()`
- [ ] `npm run check:rtl` — `fa`/`ar` isolates around the figures and the `·` separator
- [ ] `npm run check:live` — live-resolution sweep
- [ ] **Browser print-out on two schools with every `<details>` forced open**, per the
      standing rule. A print-out of collapsed teasers reads as clean while showing none of
      the part that breaks. Confirm the six university names are **untranslated** and the
      figures are byte-identical to the English card.
- [ ] Grep the *rendered* non-English page for English sentences in **table cells and
      source lines** — the recurring "sentence wearing an identifier's clothes" leak lives
      exactly there, and this card is a table.

## Risks

| Risk | Mitigation |
|---|---|
| The scrape silently returns the wrong sheet or a *statewide-minus-school* table | Smoke-test against METHOD.md §4's reference tables before trusting any run; re-verify the panel text reads the intended school; assert `Admitted ≤ Applied` every term |
| An institution-string slip (`Eastern` Carolina, wrong hyphenation) fails the filter **silently** | Copy the six strings verbatim from the skill's table; assert six non-empty result sets per school before writing the file |
| A university `name` gets translated, breaking the match against the dashboard | `name` is already in `SKIP_KEYS`; verify in the Phase 2 print-out that all six read in English |
| `universities[].key` gets translated, so a lookup misses | Pin it false in `PATH_OVERRIDES` before extracting — the `flags[].kind` failure, which shipped to Spanish at 100% coverage |
| A pooled rate computed as the mean of five annual rates | Explicit hand recomputation in the Phase 1 verification; pooled = `sum(accepted)/sum(applied)` |
| A bare percentage published off a single-digit base | Every rate carries its denominator in the caption or the pooled-counts line; the skill's standing interpretation rule |
| The table-instead-of-grid divergence drifts visually from section 2a | The design's visual spec is transcribed cell-by-cell in Step 5's column table; the browser check compares against it, and the divergence is structural only |
| `--brand` is per-school in the app but hardcoded `#be123c` in the design | Use the app's `--brand` token (set inline per element from `src/data/brands.ts`), never the design's literal — each school's card carries its own accent |
| `DATA-SCHEMA.md` drifts | `npm run check:schema` is chained into `npm run build` |

## Open questions

- **Does the dashboard's latest term differ per school?** A school with no Fall 2025 row
  would render an older "most recent class" than its neighbors. — **default:** use each
  school's own latest available term, label it explicitly on the card, and note the
  variation in the method note if it occurs.
- **Does `fiveYearCounts`' word "applied" translate?** It sits in a figure-shaped string.
  — **default:** treat the string as prose so the word moves, pin the numerals via
  `check:sepdrift`, and verify in the print-out.
- **Do any of the 11 schools have no dashboard data at all?** — **default:** omit the card
  for that school and report it explicitly in the PR body; do not ship an empty shell.
