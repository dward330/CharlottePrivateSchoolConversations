---
name: mobileready
title: Make every school-page research card mobile ready — stop opened cards widening the page, unclip Coverage Map prices, wrap long prose-table cells, and give sideways-scroll tables a visible edge
status: in-progress
phases: 2
created: 2026-10-09
branch: fix/mobile-ready-cards
prs: []
---

# Make every research card mobile ready

## Goal

On a phone, **opening any research card on any school page makes the whole page
scroll sideways** — measured at 390px the document grows to 678–2,366px wide.
Inside that, two card types lose or hide figures outright: the After School
*Coverage Map* truncates or clips its prices on all 12 schools, and the College
Support *Where Graduates Go* / *The Transcript Colleges See* cards push their
text past the screen edge on 11 schools. This plan fixes the shared root cause,
the per-card defects, and adds a browser audit so the page stays phone-width
from 320px up. Done means `npm run audit:mobile` reports **zero broken cards and
zero document overflow at 320, 360 and 390px**, in English, French and Arabic.

## Context

### How this was measured (2026-10-09)

A Playwright audit loaded every school page from a `vite preview` build at
320 / 360 / 390px (`isMobile`, touch), scrolled to trigger the lazy sections,
**forced every `<details>` open**, clicked every admissions band tab, then
inspected every element under each `.topic-section`. Labels come from the DOM:
area = the section's `<h2>`, card = the outermost `.note-card`'s
`summary .topic-title`. Finding kinds:

- `page-overflow` / `text-overflow` — content extends past the viewport with no
  clipping ancestor short of the page (the page scrolls sideways). **Broken.**
- `clipped` / `clipped-text` — content is cut off by an `overflow: hidden` box.
  **Broken.**
- `inner-scroll` — a deliberate `overflow-x: auto` wrapper that needs a
  sideways swipe. **Works, but degraded.**
- `doc-overflow` — `documentElement.scrollWidth` exceeds the viewport.

The script, the summarizer and the raw findings are committed beside this plan
in [`mobileready-data/`](mobileready-data/), and
[`mobileready-data/FINDINGS.md`](mobileready-data/FINDINGS.md) holds the full
per-card list. Step 1 promotes the script into `scripts/`.

### Root cause 1 — the card grid cannot shrink (every school, every area)

`src/index.css:2525`, inside `@media (max-width: 900px)`:

```css
.note-cards { grid-template-columns: 1fr; }
```

`1fr` is `minmax(auto, 1fr)`: the track can never be narrower than its widest
child's min-content. When a card opens it claims the full row
(`.note-card[open] { grid-column: 1 / -1 }`, line 1294), and any wide child
inside (a `min-width: 420px` ledger, a `nowrap` table) widens **the track**, and
with it every card in that area, open or closed. Measured on Providence Day at
375px: the track is 345px while all cards are closed, and 604–716px in six
areas once they are opened. The deliberate `overflow-x: auto` wrappers inside
the cards never get to scroll, because their parent was widened to fit them.

With the fix injected (`minmax(0, 1fr)` + `.note-card { min-width: 0 }`), document
overflow drops from +288…+1,976px to +67…+87px at 390px, and **Trinity Episcopal
goes to zero**. Everything left over is per-card and listed below.

The desktop rule at line 1259 (`grid-template-columns: 1fr 1fr`) has the same
latent flaw. It is fixed in the same step so a wide card cannot blow out the
desktop layout either.

### Root cause 2 — `.cs-split` has the same flaw one level down (11 schools)

`src/index.css:4587–4593` collapses `.cs-split` / `.cs-split-wide` to
`grid-template-columns: 1fr !important` at ≤900px. Inside it, the National Merit
ledger and the selectivity-bucket table sit in `.cs-ledger-wrap`
(`overflow-x: auto`, line 4178) with `.cs-ledger { min-width: 420px }`
(line 4598). Because the split's track is `minmax(auto, 1fr)`, it grows to
**exactly 420px** (measured), and the wrapper never scrolls. The text-overflow
findings in those two cards (`.cs-note`, `.cs-row` spans, `.cs-filter` buttons,
`.cs-count`, `.tag-*`) are knock-on effects of the 420px column. Re-measure
after the fix before touching any of them.

### Per-card defect 3 — the Coverage Map hides prices (all 12 schools)

`src/components/AfterSchool.tsx:185–262` draws each division as an absolutely
positioned `.as-tl-band` inside a 38px `.as-tl-track`. Two failures:

- **Flat bars** (`.as-tl-tier.is-flat`, line 205; CSS `src/index.css:5072`) are
  `overflow: hidden; text-overflow: ellipsis`. At phone width labels such as
  `Clubhouse · drop-in · $100/yr flat` are cut by 72–290px, so **the price is the
  part that disappears**. The only fallback is a `title` tooltip, and **touch
  devices never show `title`**.
- **Tiered bars**: `.as-tl-tier { min-width: max-content }` (line 5049) makes the
  tiers wider than the band, and the band is `overflow: hidden`, so the last
  tier is clipped. `span.as-tl-price` is measurably clipped at Covenant Day
  (+49px) and Charlotte Christian (+18px). The CSS comment at line 5038 states
  the rule this breaks: *"A price must never be truncated."*

Also, the Providence Day summer row (`.as-summer`, line 5087) overflows the page
by +63px at 320–360px, because `.as-tl-row` is a `96px 1fr` grid whose children
have no `min-width: 0`.

**Pre-existing i18n defect in the same JSX:** line 246 renders
`<span className="as-tl-until">to {t.until} · </span>`, and line 230 builds the
`title` from `` `to ${t.until}` `` — **hardcoded English** shown on every locale's
desktop page (it is hidden at ≤600px). This plan routes both through a new
chrome key, which is why it has a Phase 2.

### Per-card defect 4 — `nowrap` prose tables (Financial Aid & Tuition)

`src/index.css:1492–1497` gives every `.prose-table` cell `white-space: nowrap`.
That is right for figures (`$28,500`) but wrong for prose cells. Gaston Day's
*Named scholarships* table has a 246-character cell, so the table is **2,306px
wide** inside a 248px card. It is technically inside `.prose-table-wrap`
(`overflow-x: auto`), but a 2,000px swipe to read one sentence is not usable.
These tables are rendered by `src/components/ProseContent.tsx:131–150`, which on
school pages is reached only through the Financial Aid & Tuition generic prose
cards (see memory `prosecontent-unreachable-on-school-pages`).

### Degraded tier — sideways-scroll tables (~110 cards, every school)

Wide data tables already scroll inside their own wrappers. That works, but
nothing on screen tells a reader there is more to the right. The wrappers are
`.table-wrap` (Admissions guide, line 2222), `.as-table-wrap` /
`.as-scroll` (After School and Summer), `.cs-ledger-wrap` (College Support),
`.sports-scroll` (line 2877 / 3460), `.arts-scroll` (line 3619 / 3831),
`.clubs-ledger-wrap` (line 4009), `.prose-table-wrap` (line 1479),
`.catalog-scroll` (line 2061) and `.hsp-destlist` (line 4828).

Three of them miss fitting by only a few pixels, so they should fit outright:
*Club Catalog & Overview* (`.catalog-scroll`, +9–43px at 320px), *A Day Inside +
Enrichment* (`.as-scroll`, +13–66px) and Trinity's *Where They Land*
(`.hsp-destlist`, +37px at 320px).

### What is fine

Course Offerings, the section stat strips, the admissions stat band, Latest News,
the podcast strip and the welcome video produced no findings at any width.
Neither did any card in High School Placement other than the near-miss above.
The Compare page and the admissions checklist page are **not** covered by this
audit (see Out of scope).

## Decisions

- **Fix the grid tracks with `minmax(0, 1fr)` plus `min-width: 0` on the
  items**, not `overflow: hidden` on cards — hiding would turn page overflow
  into silently clipped figures, the worse failure.
- **Keep sideways scrolling for genuine multi-column data tables** (records,
  ledgers, cost matrices, NC admit rates) and add an edge fade to show there is
  more. Reflowing ten table types into phone-specific stacked layouts is a
  redesign, not a fix. It is listed under Open questions rather than built.
  **Two exceptions, added at the user's prompting**, both cards whose
  load-bearing column starts off-screen on a phone:
  - *Admission Rates at the Top NC Public Universities* (step 5b): the admit
    rate and the 5-yr pooled rate.
  - The Arts *Theatre & the Blumeys* awards ledger (step 5c): the Result
    column and its `WIN` chip.

  Both are short (six rows; 2–10 rows) and need no new text.
- **Edge fade via a small hook, not CSS `background-attachment: local`
  shadows.** The tables paint opaque `thead` and row-header backgrounds, which
  cover a background-based shadow. A `mask-image` fade toggled by
  `data-scroll-left` / `data-scroll-right` attributes is robust to that.
- **Coverage Map at ≤600px gets a text legend under each bar**, with every tier's
  `until · price · est.` (or the full flat label) in normal wrapping text. The
  bar stays a pure clock visual and keeps its proportions. Letting the bar
  labels wrap instead was rejected, because the band is absolutely positioned
  in a fixed-height track and wrapping would break the clock geometry the CSS
  comments defend.
- **Prose-table cells wrap by length, decided in the renderer**: a cell longer
  than 40 characters gets class `is-long`, and CSS lets it wrap at a sane
  `min-width`. CSS alone cannot tell a figure from a sentence, and figures must
  stay unbroken.
- **The audit ships as a report-style script, not a build gate**, like
  `audit:daterender` and `audit:moneyrender`, because it needs a served build and
  a browser. It exits 1 on broken findings and reports `inner-scroll` counts with
  exit 0, so a permanent, legitimate scroll count never parks it red (CLAUDE.md:
  *a checker parked at a permanently non-zero count stops being read*).
- **Plan name `mobileready`** — derived from the request, since the branch was
  `main`.

## Approvals needed

None. This is a direct user request to fix layout. The UX gate in CLAUDE.md
governs ingestion work, and this adds no card, section, tile, Compare row or
metric. The Coverage Map legend re-presents existing figures in an existing card
at phone width only. If the user wants the Open-questions redesign of tables,
that is a separate decision.

**Design reference — review before `/implement`.** The phone layouts for steps 4,
5b, 5c and 6 are mocked up at 390px, with real Providence Day and Covenant Day
data, on the Design canvas **Mobile Card Layouts**:
https://claude.ai/artifact/4hcPJ9UoTPfi4eYbHsnfrL. Each change has a
*today* / *proposed* pair:

- NC admit rates, stacked (step 5b).
- Arts awards ledger, stacked (step 5c).
- Coverage Map with legend (step 4).
- Edge fade on a sideways table (step 6).

**Build to the canvas as the user leaves it.** If the user has commented or
edited an artboard, the canvas wins over this document's wording; read it with
the Artifact tool (`action: "read"`, the canvas `url`, path
`project/<Artboard>.dc.html`) before steps 4, 5b, 5c and 6. Map the mock's inline
styles onto the app's tokens (`--border`, `--muted`, `--accent-*`, `--brand`)
rather than copying hex values. The mock settles step 4.4's open choice
and the user **confirmed it on 2026-10-09**: on phones the bar keeps its tier
divisions but carries no text, and the legend carries every price (step 4.4).

## Out of scope

- The **Compare page** and the **admissions checklist page**. Compare already
  got dedicated mobile work (plans `comparesticky`, `compare-cls`). Extending the
  audit to them is a follow-up.
- Reflowing sideways-scroll tables into stacked phone layouts (Open questions).
- Tap-target sizing, font-size minimums and other non-overflow mobile concerns.
  The audit did not measure them.
- Any change to research data or prose.

## Steps

### Phase 1 — English

1. **Promote the audit into the repo.** Copy
   `.claude/plans/mobileready-data/mobile_audit.mjs` to
   `scripts/audit_mobile_layout.mjs`. Rewrite its header comment in the style of
   `scripts/audit_date_render.mjs`: why it exists, what it flags, and that it
   needs `npm run build && npx vite preview`. Make these changes:
   - Resolve `playwright` normally (`import { chromium } from 'playwright'`), and
     replace the absolute paths with `ROOT` derived from `import.meta.url`.
   - Take flags `--base` (default `http://localhost:4173`), repeatable `--lang`
     (default `en`), `--widths` (default `320,360,390`) and `--only <slug,…>`.
   - Delete the `GRIDFIX` style injection. It was a planning probe; the real
     fix lands in step 2.
   - Fold `summarize.mjs`'s grouping into the script's output: one line per
     `<School> - <Area> - <Card>`, a BROKEN block and a SIDEWAYS SCROLL block,
     then the per-school `doc-overflow` line.
   - Exit 1 if any BROKEN finding or any `doc-overflow`; otherwise exit 0. Print
     the inner-scroll count without failing on it. Exit 2 if the server is
     unreachable, as `audit_date_render.mjs` does.
   - **Make it RTL-aware.** In the planning run, Arabic flagged every element
     on 11 schools, section headers included. Once the page overflows, the RTL
     layout shifts, so everything reads as off-screen. Measure `page-overflow`
     against the enclosing `.topic-section`'s left and right edges, not
     `0…innerWidth`, so one page-level overflow does not cascade into every
     element. Trinity, with no page overflow, showed exactly the English
     findings, which confirms the cause.
   - Use `waitUntil: 'domcontentloaded'` plus a settle wait, never
     `networkidle` (memory `browser-check-networkidle-hangs`: school pages never
     go idle).

   Add `"audit:mobile": "node scripts/audit_mobile_layout.mjs"` to `package.json`
   beside `audit:daterender`. Run it **before** any CSS change and save the
   baseline output; it should reproduce
   [`mobileready-data/FINDINGS.md`](mobileready-data/FINDINGS.md)'s "as shipped"
   numbers.

2. **Make the card grid shrinkable** — `src/index.css`:
   - Line 1259: `.note-cards { … grid-template-columns: repeat(2, minmax(0, 1fr)); … }`.
   - Line 2525 (≤900px block): `.note-cards { grid-template-columns: minmax(0, 1fr); }`.
   - Add `min-width: 0;` to the `.note-card` rule at line 1260.

   Keep a short comment explaining `minmax(0, …)`: a bare `1fr` track grows to
   its widest child, so one opened wide card widened every card in its area.

3. **Make `.cs-split` shrinkable** — `src/index.css` ≤900px block at
   lines 4586–4593. Change the `1fr !important` list so `.cs-split` and
   `.cs-split-wide` use `minmax(0, 1fr) !important`, and add
   `.cs-split > * { min-width: 0; }` (base rule, near line 4160). Leave
   `.cs-roster`, `.cs-timeline`, `.cs-quintiles` and `.cs-band-grid` on the same
   `minmax(0, 1fr)` too, for the same reason.

   Then **grep every other phone-width collapse to `1fr`** in `src/index.css`
   (`grid-template-columns: 1fr` inside `@media (max-width: …)` blocks: the
   `.fa-*`, `.as-cost`, `.as-split`, `.as-row`, `.cs-row`, `.catalog-grid`
   rules and any others found). Convert each to `minmax(0, 1fr)`. Do not touch
   rules whose track is a fixed px width.

   **Fix the chip rule too** (`src/index.css:1583–1607`, `.tag-outline,
   .tag-accent, .tag-neutral`). It sets `max-width: 100%` and its comment says
   that "lets that overflow case wrap", but it keeps `white-space: nowrap`, so a
   long chip's **box** is capped while its **text** still paints out of it.
   Measured: `.tag-neutral` +150px in English (Carmel Christian, Country Day,
   Covenant Day *Where Graduates Go*), and `.tag-accent` +92px in French on
   Gaston Day's *In-Depth Report*. Change it to `white-space: normal;
   overflow-wrap: anywhere;`. A `flex: none` chip still sizes to its max-content
   when it fits, so short chips do not wrap. Confirm "NOT PUBLISHED" and "AP"
   stay on one line in the browser.

   Re-run `npm run audit:mobile -- --only cannon,gaston-day,providence-day`. The
   *Where Graduates Go* and *The Transcript Colleges See* findings should be gone.
   Fix only what survives. Most likely that is `.cs-filter` labels needing
   `white-space: normal`.

   Then re-run with `--lang fr --only carmel-christian,gaston-day --widths 360`.
   French turned up one card English does not: Carmel Christian's *The Cost
   Planner* (`.as-cost-matrix` / `.as-cost-side` +83px, because `.as-cost`
   collapses to a plain `1fr` at ≤900px). The `minmax` conversion above should
   cover it.

4. **Coverage Map: fix the summer row and the clipped prices** —
   `src/index.css` and `src/components/AfterSchool.tsx`:
   1. Add `.as-tl-row > * { min-width: 0; }`. In the ≤600px block, make the
      summer row span the full width (the `<span />` spacer at
      `AfterSchool.tsx:256` collapses: e.g.
      `.as-tl-row:has(> .as-summer) { grid-template-columns: minmax(0, 1fr); }`
      and hide the empty spacer).
   2. Add chrome key `afterSchool.tierUntil` = `"to {{time}}"` to
      `src/locales/en.json`. Replace the hardcoded `to {t.until}` at
      `AfterSchool.tsx:246` and the `` `to ${t.until}` `` in the `title` array at
      line ~230 with `tr('afterSchool.tierUntil', { time: t.until })`. This uses
      interpolation, per CLAUDE.md's rule of thumb that word order must be free
      to change per language.
   3. Under each `.as-tl-track`, render a legend that is **visible only at
      ≤600px** (`display: none` above). Make it
      `<ul className="as-tl-legend">`, with one `<li>` per tier:
      `tierUntil · localizeMoneyText(price) · est. tag`. A flat bar gets one
      `<li>` with the full `localizeMoneyText(flatLabel)`. Style it at 12px with
      normal wrapping, and mirror the `.as-tl-tier.is-last` accent on the last
      item. Reuse existing strings only: `cardLabels.est`, the new
      `tierUntil`, and the data's own labels.
   4. **Settled with the user 2026-10-09: on phones (≤600px) the bar carries no
      text. The legend carries every price.** Hide `.as-tl-until`,
      `.as-tl-price`, the in-bar `est.` tag and the `.as-tl-tier.is-flat` label
      inside the bar. At ≤600px, drop `min-width: max-content` from
      `.as-tl-tier`, so each tier gets exactly its clock share
      (`flex: 0 0 <basis>`) and the dashed dividers mark true time.

      Keep the last-tier accent fill on the bar, and draw a matching swatch on
      each legend item, so the eye can pair bar segment and line. The `title`
      tooltip stays for desktop. Above 600px nothing changes: the bar keeps its
      labels and the legend is hidden.

      Rationale (do not re-litigate):
      - **Direct labels are the best practice only while they fit.** Below
        600px they don't: a 9px price in a 30-minute slot is what clipped.
      - **One encoding beats two.** Repeating a price in the bar and the
        legend adds noise, and lets the two copies disagree if one is ever
        truncated.
      - **Touch devices have no hover**, so the tooltip can never be the
        fallback.
      - **Text-free bars let the clock geometry be exact.** Today narrow tiers
        borrow width from their neighbours to fit their labels, which the CSS
        comment at `src/index.css:5038` admits distorts the clock.

      No figure is ever shown truncated, because no figure is in the bar.
   5. Add the legend to the `@media print` rules if needed so the print-out is
      unchanged. Print is wider than 600px, so it should already be hidden.

5. **Let long prose-table cells wrap** — `src/components/ProseContent.tsx:145`
   and `src/index.css`. In the row map, add `className="is-long"` to the
   `<th>` or `<td>` when the cell's plain text exceeds 40 characters. Add:

   ```css
   .prose-table .is-long { white-space: normal; min-width: 16ch; max-width: 40ch; }
   ```

   Figures keep `nowrap`. Verify with Gaston Day → Financial Aid & Tuition →
   *Named scholarships*: the table must fit within ~2–3 swipes, not 2,000px.

5b. **Stack the NC admit-rate table on phones** (College Support → *Admission
   Rates at the Top NC Public Universities*, all 11 high schools). This is the
   one sideways-scroll card that gets a real phone layout instead of an edge
   fade. At ≤900px it is forced to `.cs-nc-ledger { min-width: 660px }`
   (`src/index.css:4601`), so on a 360px phone only ~290px shows. The **Admit
   rate** and **5-yr pooled** columns, the figures the card exists for, start
   off-screen. Measured overflow is +410px at every width, the largest of any
   swipe card.

   At ≤600px, render each `<tr>` as a block, one per university. Use CSS on
   the same DOM, not a second component:
   - A header line: `#rank` + university name (+ `cs-uni-note`).
   - A row for **Admit rate**: value + the existing `.cs-bar-track` bar, given
     full width.
   - A row for **Applied · Accepted**.
   - A row for **5-yr pooled**: value + the `tables.ncFiveYearCounts` line.

   In `src/components/CollegeSupport.tsx:240–300`, add
   `data-label={t('tables.ncApplied')}` (and `ncAccepted`, `ncAdmitRate`,
   `ncFiveYear`) to the matching `<td>`s. In CSS, render them with
   `td::before { content: attr(data-label) }`, drop the `min-width: 660px`, and
   hide the `thead` visually but keep it for screen readers. **No new text:**
   the labels are the existing `tables.nc*` keys, so this adds nothing to
   Phase 2.
   - `display: block` on table parts strips table semantics in some browsers.
     Add `role="table" / "row" / "cell" / "columnheader"` explicitly so a
     screen reader still pairs each figure with its label.
   - Keep the publication-gap rule: a row with no `ratePct` shows `—` and **no
     bar**. A zero-width bar would read as a 0% admit rate.
   - Every figure keeps its denominator visible. CLAUDE.md requires the counts
     beside the rate, so in the stacked layout the counts row may never be
     hidden to save space.
   - Desktop (>600px) is unchanged.

   Verify: Providence Day and Hickory Grove at 360px. The admit rate and
   5-yr rate for all six universities are visible without any sideways swipe,
   and this card's `inner-scroll` finding is gone from `audit:mobile`.

5c. **Stack the Arts awards ledger on phones.** The Arts → *Theatre & the
   Blumeys* card (titled *Theatre, the Blumeys & CITA* at Charlotte Christian
   and *Theatre & External Recognition* at Davidson Day) has this ledger on 10
   schools; Gaston Day and Trinity have none. The awards ledger in
   `src/components/ArtsProgram.tsx:186–200` is a three-column CSS grid of bare
   `<div>`s (`.arts-ledger`, `grid-template-columns: 70px 220px 1fr`,
   `src/index.css:3625`). At ≤900px it is forced to `min-width: 560px`
   (`src/index.css:3832`), so on a 360px phone the **Result** column (the
   award, and the `WIN` chip that says whether it was a win or a finalist)
   starts off-screen. Measured: +312px at every width. Its wrapper
   `.arts-scroll` is also `max-height: 240px; overflow-y: auto`, so on a phone
   it is a **two-axis scroll box nested inside the page scroll**, which traps
   swipes.

   At ≤600px (CSS only, no markup change: the cells are already bare grid
   children):
   - `.arts-ledger { min-width: 0; grid-template-columns: auto minmax(0, 1fr); }`.
     Year sits in column 1 and Show in column 2.
   - `.arts-ledger-result { grid-column: 2; }`, so the result wraps onto its own
     line under the show, at full width. Keep a hairline between row groups,
     not between the show and its result.
   - Hide the third header cell (`.arts-ledger > .arts-th:nth-child(3)`), so the
     header row stays Year | Show. The result reads as the show's sub-line,
     and the `WIN` chip already labels it.
   - Drop the `max-height` / `overflow-y` on `.arts-scroll`. The ledgers hold
     2–10 rows, which is short enough to render in full, and that removes the
     nested scroller.
   - Desktop (>600px) is unchanged.

   No new text. Verify Providence Day and Charlotte Catholic (10 rows each) at
   360px: every row's result and `WIN` chip are visible without any swipe
   inside the box, and the card's `inner-scroll` finding is gone from
   `audit:mobile`.

6. **Edge fade on sideways-scroll wrappers.** Add `src/lib/useScrollEdges.ts`:
   a hook that, given a root ref, finds every element matching
   `.table-wrap, .as-table-wrap, .as-scroll, .cs-ledger-wrap, .sports-scroll,
   .arts-scroll, .clubs-ledger-wrap, .prose-table-wrap, .catalog-scroll,
   .hsp-destlist`. It sets `data-scroll-left` / `data-scroll-right` on each when
   there is hidden content on that side, updating on `scroll` (passive) and on a
   `ResizeObserver`, and re-scans when `<details>` toggle. Call it once from
   `src/pages/SchoolDetail.tsx` on the dossier root.

   CSS: `mask-image: linear-gradient(...)` fades of ~24px on the side(s) that
   have hidden content, with the `-webkit-` prefix. **RTL:** in `fa` / `ar`,
   `scrollLeft` is `0` at the start and goes negative, so compute the
   start/end sides from `dir` and not from raw left/right. Check
   `:root[dir='rtl']` in the browser.

   No text and no chrome key. This is presentation only.

7. **Close the three near-miss scrollers** so they fit at 360px and up without
   scrolling: `.catalog-scroll` (Club Catalog & Overview), the `.as-scroll` in
   *A Day Inside + Enrichment*, and `.hsp-destlist` (Trinity *Where They Land*).
   Use tighter horizontal padding, `minmax(0, …)` columns, or
   `overflow-wrap: anywhere` on their long tokens, whichever the element shows.
   Overflow at 320px may remain as `inner-scroll`.

8. **Re-run the audit and the browser review** (see Verification, Phase 1).
   Record final numbers in `mobileready-data/FINDINGS.md` under an "after"
   heading.

9. **Docs.** In `CLAUDE.md` → "Testing and verification conventions", add one
   bullet: *a phone-width check is a browser check with every `<details>`
   open — the grid blowout shipped because a closed card is 345px and an open
   one is 716px* — and name `npm run audit:mobile`. Update this plan's
   frontmatter and `INDEX.md` per `/implement`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.**
Nothing below runs until the user has looked at the phone layout (in particular
the Coverage Map legend and the edge fades) and confirmed the `"to {{time}}"`
wording.

### Phase 2 — Every other locale

UI chrome only, so the scope is the `src/locales/*.json` catalogs per
`TRANSLATED` in `src/lib/i18n.ts`: `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`,
`hi` and `ar`, nine files. There is no research-prose or overlay work.

1. **Translate `afterSchool.tierUntil`** in all nine catalogs. `{{time}}` is a
   clock value copied char-for-char (`4:30`), never re-typed. Place it where each
   language's word order needs it. For `fa` / `ar`, check the clock figure
   renders LTR inside the RTL string; follow
   [`prose-translation-fa.md`](../docs/prose-translation-fa.md) on isolates if
   it does not. This replaces English that had shipped to all nine locales, so
   it fixes a leak as well.
2. **Run the audit in the long-string and RTL locales**:
   `npm run audit:mobile -- --lang fr --lang ar --lang te`.

## Files touched

| File | Change |
|---|---|
| `scripts/audit_mobile_layout.mjs` | new: phone-width overflow audit (from `mobileready-data/mobile_audit.mjs`) |
| `package.json` | add `audit:mobile` |
| `src/index.css` | `minmax(0, 1fr)` tracks + `min-width: 0` (note-cards, cs-split, other phone collapses); Coverage Map legend and summer row; `.prose-table .is-long`; edge-fade masks; near-miss scrollers |
| `src/components/CollegeSupport.tsx` | `data-label` + ARIA roles on the NC admit-rate table (step 5b) |
| `src/index.css` (Arts) | `.arts-ledger` stacks at ≤600px; `.arts-scroll` height cap dropped (step 5c, CSS only) |
| `src/components/AfterSchool.tsx` | `tierUntil` key replaces hardcoded `to`; phone-only legend list |
| `src/components/ProseContent.tsx` | `is-long` class on long table cells |
| `src/lib/useScrollEdges.ts` | new: edge-fade hook |
| `src/pages/SchoolDetail.tsx` | call `useScrollEdges` once |
| `src/locales/en.json` | `afterSchool.tierUntil` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | `afterSchool.tierUntil` (Phase 2) |
| `CLAUDE.md` | one testing-convention bullet |
| `.claude/plans/mobileready-data/FINDINGS.md` | "after" numbers |

## Verification

### Phase 1 — English

- [ ] `npx tsc -b` — clean (memory `trust-tsc-b-not-tsc-noemit`).
- [ ] `npm run build` — succeeds (it chains `check:chrome`. The new key exists in
      `en` only, which is the expected *awaiting translation* state on its exit-0
      path).
- [ ] `npx vite preview` in the background, then `npm run audit:mobile` — **0
      BROKEN findings and 0 doc-overflow at 320/360/390 for all 12 schools.**
      Compare the inner-scroll count with the baseline from step 1. It should
      fall by the near-miss cards and none should be added.
- [ ] `npm run audit:mobile -- --lang fr --lang ar --widths 360` — 0 BROKEN.
      Prose locales render through the overlay, so this is where longer strings
      show up.
- [ ] **Browser review in real Chrome at 375px**, with all cards open (memory
      `headed-chrome-via-playwright`, `expand-details-before-browser-check`).
      Screenshot these and look at them, not just the numbers:
      - Providence Day → After School → *The Coverage Map*: every price in the
        legend is whole, and the summer row has no sideways scroll.
      - Covenant Day → same card: `$…` tier prices are whole.
      - Cannon → College Support → *Where Graduates Go*: bucket table scrolls
        inside the card, and the page does not.
      - Gaston Day → Financial Aid & Tuition → *Named scholarships*: long cells
        wrap.
      - Providence Day → College Support → *Admission Rates at the Top NC
        Public Universities*: stacked, one block per university, with the admit
        rate, bar, counts and 5-yr rate all visible without a swipe.
      - Providence Day → The Arts → *Theatre & the Blumeys*: every award
        result and `WIN` chip visible, with no scroll box inside the card.
      - Any Sports *Winning Record*: the right-edge fade is visible at scroll
        start, and the left fade appears after swiping.
- [ ] **Desktop regression** at 1280px: Providence Day and Charlotte Latin with
      cards open look unchanged. The two-column grid, the Coverage Map bars (no
      legend) and the College Support splits are all as before, except the
      Coverage Map's `to …` text, now sourced from the key.
- [ ] Print preview of one school with panels forced open (CLAUDE.md print-path
      rule): no legend or fade artifacts, and cards still print expanded.

### Phase 2 — Locales

- [ ] `npm run check:chrome` — `afterSchool.tierUntil` present in all ten
      catalogs and no longer listed as awaiting translation.
- [ ] `npm run build` — succeeds.
- [ ] `npm run audit:mobile -- --lang fr --lang ar --lang te` — 0 BROKEN, 0
      doc-overflow.
- [ ] Browser: Covenant Day *Coverage Map* desktop in `ar` and `hi`: the
      `tierUntil` phrase reads in-language and the clock figure is intact and
      LTR.

## Risks

| Risk | Mitigation |
|---|---|
| `minmax(0, 1fr)` turns page overflow into content overflowing a card visibly (no clip) | That is exactly what the audit's `page-overflow` check still catches. Step 3's re-run is there to surface the residue |
| `mask-image` fade hides the first/last column's text when nothing is scrolled | The hook only sets the attribute when hidden content exists on that side. Verify at scroll start and end |
| RTL scroll coordinates invert the fade sides | Step 6 computes sides from `dir`. The Arabic audit run and the browser check cover it |
| Coverage Map legend duplicates the in-bar price, so readers see it twice | Settled: at ≤600px the bar carries no text, so each price appears once (step 4.4) |
| `is-long` threshold wraps a figure-bearing sentence cell | Wrapping a sentence is the goal. A pure figure is never more than 40 chars |

## Open questions

- **Should the ~110 sideways-scroll tables be redesigned as stacked phone
  layouts** (one record per block, label/value rows) instead of fading-edge
  scrollers? It would be a phone-only redesign of ten table types across nine
  areas. — **default:** no. Ship the fades in this plan and treat a stacked
  redesign as its own `/plan` if the user wants it after seeing the result.
- **Should the audit cover Compare and the admissions checklist?** —
  **default:** no, follow-up. The script's route list makes it a small extension.
