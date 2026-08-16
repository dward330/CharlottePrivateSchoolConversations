---
name: aftercare-cost
title: Compare row — cost of after-school care at each school's priciest published tier
status: implemented
phases: 2
created: 2026-08-15
branch: feat/aftercare-cost
prs: [119]
---

# Compare row — cost of after-school care

## Goal

The `after-school` topic has exactly **one** Compare row today (`latest-pickup`), while
`summer-programs` has four. Yet the after-school research holds fully verified rate cards
for five of six schools, and the spread is nearly 3× — the single most decision-relevant
number for a working parent, currently invisible in the app.

This plan adds one new value metric, `aftercare-cost`, showing what each school's **most
expensive published arrangement** costs (max grade band × latest pickup tier × 5 days per
week), and corrects two stale cells in the existing `latest-pickup` row.

We'll know it worked when Compare's After School section shows two rows, every cell with a
figure carries a provenance tooltip naming the grade band, pickup tier, hours covered and
billing unit, and `npm run check:quals` passes clean.

## Context

**Where the data lives.** `src/data/metricValues.ts` exports `VALUE_METRICS: ValueMetric[]`
— hand-maintained, explicitly NOT produced by the ingest pipeline. The after-school block
starts at [`metricValues.ts:677`](../../src/data/metricValues.ts) and contains only
`latest-pickup`. The summer-programs block immediately below it is the model to follow: four
rows, each with per-cell `quals` notes handling exactly this "the schools count differently"
problem.

**The type.** `ValueMetric` is `{ topic, key, label, note?, values, quals? }` where `values`
maps school slug → display string | `null` (renders as N/A), and `quals` maps slug →
`{ kind: 'minimum' | 'range' | 'official' | 'scope', text }`. Only cells needing a caveat
appear in `quals`; absence of the marker is itself the signal.

**Rendering is already handled — no component work.** [`Compare.tsx:190-198`](../../src/pages/Compare.tsx)
branches on `vm.quals?.[s.slug]` and wraps the value in `<CellQual>`, and **both** branches
already pass the value through `localizeMoneyText()`. A new money row therefore needs no new
render path, which matters because `scripts/check_money_render_paths.mjs` exists precisely
because three separate paths were once found bypassing that call.

**The four `compare.qual.*` kicker keys already exist** in every locale file
([`en.json:135-140`](../../src/locales/en.json)), so the tooltip chrome needs no new keys.
The only new English strings are the row's `label` and `note` and the `quals` prose — all of
which live in `metricValues.ts`, i.e. the **prose/overlay** layer, not the chrome catalog.

**The precedent for a cost row is `top-tuition`** ([`metricValues.ts:311`](../../src/data/metricValues.ts)):
plain `$32,070`-style values, one `quals` entry on the cell whose grade span differs from its
neighbours. Follow that shape.

**Source of every figure.** All rates come from the `Redesign Research 2026.md` files in
`source-material/after-school/<school>/`, which is the July 27 2026 pass that **superseded**
the older `Pricing.md` files in the same folders. This matters — the implementer must read the
Redesign files, not the Pricing files:

- Cannon's `Pricing.md` says "no published pricing"; that was **refuted** — a full rate card
  was recovered from an orphaned backup page.
- Country Day's `Pricing.md` shows a $510/mo top row; the **real maximum is $900/mo** (JK ·
  6:00 pm · 5 days). Using the Pricing.md figure would understate it by 43%.
- Charlotte Christian's `Pricing.md` carries 2024-25 rates; 2026-27 rates are 32–52% higher.
- Charlotte Latin's `Pricing.md` has gaps marked "could NOT be confirmed"; the full 5×5 matrix
  is verified in the Redesign file.

**Every figure was re-verified against the schools' live pages on 2026-08-15** (see *Source
material* for the per-school result). All five headline figures and Davidson Day's `null` were
confirmed unchanged. Three findings from that pass that the implementer must not trip over:

- **Charlotte Christian's packet has a misleading filename.** It is served from
  `.../2025-26ExtendedDayPacket.pdf`, but the document's own cover page reads **"Lower School
  Extended Day 2026-27"** and its rates are the 2026-27 ones ($125 / $175 / $245 / $295 / $325).
  The filename is wrong; the content is current. **Do not "correct" $325 to an older figure on
  the strength of that URL.**
- **Charlotte Christian's PDF has an unreliable text layer.** A text-extraction pass over that
  packet returns plausible-looking but entirely fabricated figures (`$275.87`, `$551.76`,
  `$770.99`) from raw font data. The real rates are only visible when the PDF is **read as
  pages, not as extracted text**. This is the same PDF-text-layer artifact class already known
  in this repo. If a figure from that packet looks odd, re-read the pages.
- **Cannon's rate card still lives only on the orphaned backup page** — the main program page
  publishes no pricing at all. The backup page was confirmed live on 2026-08-15 and still shows
  2025-26 rates. It is unlinked and could disappear without notice, which is exactly why the
  provenance step below matters.

## Decisions

- **Headline = the school's own published figure; annualized estimate goes in the tooltip** —
  the user's call, from three options offered. PD states outright that its number of billing
  months is NOT PUBLISHED, and Country Day and Christian don't publish it either. Annualizing
  monthly rates as the headline would put a number no school publishes into the cell, against
  the repo's char-for-char figure rule. Leading with the published figure keeps every headline
  traceable; the ×10 estimate is one hover away for comparison.
- **"Most expensive" is taken literally** — max grade band × latest tier × 5 days — per the
  user's instruction, with the comparability caveat disclosed per cell rather than adjusted
  for. This mirrors how `summer-camps` handles non-comparable counts.
- **Each tooltip states hours covered** — because "most expensive" partly measures *who
  dismisses earliest*. Latin's $4,650/sem is TK/K from a 1:30 dismissal (4.5 hrs/day); Cannon's
  $3,784/yr is from a 3:00 dismissal (3 hrs/day). Without that line the row silently ranks
  early-dismissing schools as expensive.
- **`kind: 'scope'` for every cell** — these are all scope caveats (which band, which tier,
  what unit), not `minimum`/`range`/`official`. `scope` is already the dominant kind (108 of 125
  existing entries).
- **Row placed after `latest-pickup`**, so the After School group reads pickup-time then cost.
- **Davidson Day is `null`** — a genuine negative finding (its Extended Care page 404s and the
  tuition page confirms only that "Financial Aid does not cover extended care"), not a research
  gap. Matches how Davidson Day is `null` across all four summer rows.

## Approvals needed

**GRANTED — the user approved this row in conversation on 2026-08-15**, including the
most-expensive-arrangement framing and the tooltip explaining it. Recorded because a new
Compare row / metric key is a UX-design-gate change under `CLAUDE.md`, and a fresh window
would otherwise stop at step 1 to ask.

No further approval is needed to build. Note the standing rule that **`npm run deploy` is
still the user's call** and is out of scope here.

## Source material

**No new data needs to be fetched to build this plan** — every figure already exists in
committed files from the July 2026 research passes, and all were re-verified live on
2026-08-15:

| School | File | Figure used | Live re-check 2026-08-15 |
|---|---|---|---|
| Cannon | `source-material/after-school/cannon/Cannon - After School - Redesign Research 2026.md` | $3,784 annual (5 day/wk) | ✅ unchanged, still **2025-26**; backup page still live |
| Charlotte Christian | `.../charlotte-christian/Charlotte Christian - After School - Redesign Research 2026.md` | $325/mo (JK–4, 5 day/wk, 2026-27) | ✅ unchanged (read from PDF pages — see Context) |
| Charlotte Country Day | `.../charlotte-country-day/CCD - After School - Redesign Research 2026.md` | $900/mo (JK · 6:00 pm · 5 day/wk) | ✅ unchanged, 2026-27 |
| Charlotte Latin | `.../charlotte-latin/Charlotte Latin - After School - Redesign Research 2026.md` | $4,650/semester (TK/K · 1:30–6:00 · 5 day/wk) | ✅ unchanged, 2026-27 |
| Providence Day | `.../providence-day/Providence Day - After School - Redesign Research 2026.md` | $750/mo (TK · 1–6 pm · 5 day/wk) | ✅ unchanged, 2026-27 |
| Davidson Day | `.../davidson-day/Davidson Day - After School - Pricing.md` | none published → `null` | ✅ Extended Care page still 404s |

Supporting figures quoted inside tooltips were confirmed in the same pass: Country Day's $80
registration / $19-hr drop-in / $10-per-10-min late fee; PD's $80 registration, $1-per-minute
late fee and $470 Grades 1–5 rate; Christian's $50/day drop-in and $25-per-quarter-hour late
fee; Cannon's $11.50/hr drop-in and 3:00–6:00 / 11:45–4:00 hours.

### If ANY figure has moved by the time `/implement` runs

The verification above has a shelf life — these are live school pages, and Cannon's sits on an
unlinked backup page that may vanish. **If the implementer finds a changed, added, or
disappeared figure, that is new research data and it goes through the full pipeline — it is
never typed straight into `metricValues.ts`.** In that case, before touching any app layer:

1. **Persist it** to `source-material/after-school/<school>/<School> - After School - <Subtopic>.md`
   per the data-provenance standard: a provenance header (who / when / how), the **source URLs**,
   and the record-level detail behind every number — not just the figure that reaches the app.
   Follow the shape of the existing `Redesign Research 2026.md` files, and mark what it
   supersedes rather than deleting the old file.
2. **Run the `ingest-source-material` skill** on the branch. Do not hand-edit the generated
   layers.
3. **Confirm the distilled docs and manifest actually regenerated**, which is the part that
   silently goes stale:
   - `.claude/docs/after-school/<school>.md` — its header line reads
     *"Distilled from N source document(s) … Rebuilt YYYY-MM-DD"*. **Both the document count N
     and the Rebuilt date must update** when a source file is added or changed. Today's counts
     are Cannon 5, Christian 6, Country Day 6, Latin 6, Davidson Day 5, Providence Day 6, all
     rebuilt 2026-07-27 — a new file must increment its school's N.
   - `src/data/schools.json` — its `generated` timestamp and `documents` entries must reflect
     the new file. Currently `generated: 2026-08-11`.
4. **Only then** update `metricValues.ts`, so every figure in the app traces back to a committed
   source file, per the standard.

If nothing has moved — the expected case — no ingest is needed: `metricValues.ts` is
hand-maintained and deliberately outside the pipeline, and this plan adds no source files.
**State explicitly in the PR body which of the two paths was taken**, so the reviewer knows
whether the distilled layer was meant to change.

## Out of scope

- **The other three metrics discussed** (drop-in availability/rate, late-pickup penalty, grade
  span covered). Each is a separate metric key needing its own approval; this plan is row 1 only.
- **Enrichment catalog counts** — deliberately deferred; the units don't align across schools.
- **The `lead` highlight semantics.** `Compare.tsx:170-173` tints `Math.max` as the leader, so
  on a cost row the *most expensive* school gets the highlight. This is pre-existing and
  identical on `top-tuition`; changing it would alter an existing shipped row's behaviour. See
  Risks — flag it, don't fix it here.
- **`npm run deploy`.** Merging is not publishing.
- Any change to components, layout, or styling.

## Steps

### Phase 1 — English

1. **Branch** — `git checkout -b feat/aftercare-cost` off an up-to-date `main`.

2. **Correct the two stale `latest-pickup` cells** in
   [`src/data/metricValues.ts`](../../src/data/metricValues.ts) (the row at ~line 677):
   - Change `cannon: null` to `cannon: '6:00 PM'`. The comment above it currently claims these
     schools publish no public latest-pickup time; that is superseded — Cannon's recovered rate
     card documents ASP hours of 3:00–6:00 pm on regular days. Update that comment so it no
     longer asserts something false, and leave `charlotte-christian` / `providence-day` as they
     are (PD's 1–6 pm is Lower School only and Christian splits, see next).
   - Add a `quals` entry for `cannon` (`kind: 'scope'`): the program runs 3:00–6:00 pm on regular
     days but **11:45 am–4:00 pm on early-dismissal days**, an earlier end than the 6:00 shown.
   - Add a `quals` entry for `charlotte-christian` (`kind: 'scope'`) recording the split: Lower
     School Extended Day runs to 6:00 pm, **Middle School ends at 5:00 pm** — a full hour
     earlier. Christian's *value* stays `null` because the two divisions disagree and no single
     figure is honest; the tooltip is what carries the finding.
   - Note: a `quals` entry on a `null` cell renders nothing (Compare only reaches `quals` inside
     the `v != null` branch). Add Christian's anyway — it is correct data for whenever that cell
     gains a value, and costs nothing. **Do not** set a placeholder value just to surface it.

3. **Add the `aftercare-cost` metric** to `VALUE_METRICS`, immediately after the `latest-pickup`
   object and before the `// === Summer Programs ===` banner. Follow `top-tuition`'s shape.

   ```ts
   {
     topic: 'after-school',
     key: 'aftercare-cost',
     label: 'Cost of after-school care',
     note: '…',   // see step 4
     values: {
       cannon: '$3,784/yr',
       'charlotte-christian': '$325/mo',
       'charlotte-country-day': '$900/mo',
       'charlotte-latin': '$4,650/sem',
       'davidson-day': null,
       'providence-day': '$750/mo',
     },
     quals: { /* all five, see step 5 */ },
   }
   ```

   Keep a trailing `//` comment on each value naming the band, tier and year, exactly as the
   surrounding rows do.

4. **Write the row `note`** — small print under the row label. It must say: this is the *most
   expensive* published arrangement (highest-priced grade band, latest pickup, 5 days/week);
   figures are shown in each school's own billing unit; and units differ, so read the per-cell
   notes. Mention the year (2026-27, except Cannon's 2025-26).

5. **Write all five `quals` entries** (`kind: 'scope'`, at most two sentences each, reader-facing
   prose). Every one must carry: the **grade band + pickup tier**, the **hours covered per day**,
   the **native billing unit**, and the **×10-month annualized estimate** where the school bills
   monthly. Content per school:

   - **Cannon** — JrK–8 After School Program, 3:00–6:00 pm (3 hrs), 5 days/wk. `$3,784` is a true
     **annual** figure as published, so no estimate is needed. Flag that these are **2025-26**
     rates — the only school not on 2026-27 — because the live page is now portal-gated.
   - **Charlotte Latin** — TK/K at the 1:30–6:00 pm tier (**4.5 hrs**, the longest here), 5
     days/wk, billed **per semester**; ≈ **$9,300/yr** across the two semester charges. State that
     TK/K dismiss at 1:30, so this tier buys more hours than the peer figures beside it; Grades
     1–5 at their 2:55–6:00 tier is $3,000/semester.
   - **Charlotte Country Day** — **JK** at the 6:00 pm tier (JK dismisses 1:15 pm, so ~4.75 hrs),
     5 days/wk, **monthly**; ≈ **$9,000/yr** on a 10-month estimate. Note the school does not
     publish how many months it bills, and that Grades 1–4 at the same 6:00 pm tier is $610/mo.
   - **Providence Day** — **TK** at the 1–6 pm tier (5 hrs), 5 days/wk, **monthly**; ≈ **$7,500/yr**
     on a 10-month estimate. PD **explicitly states** its number of billing months is not
     published — say so. Note Grades 1–5 at 3–6 pm is $470/mo, and that there is no drop-in option.
   - **Charlotte Christian** — JK–Grade 4 Extended Day to 6:00 pm, 5 days/wk, **monthly**, 2026-27;
     ≈ **$3,250/yr** on a 10-month estimate. Note rates rose **32–52%** over 2024-25, and that
     Middle School bills differently ($8/hr to 5:00 pm) so it isn't in this figure.

   Word the estimates as estimates (*"about $9,000 a year if billed over 10 months"*), never as
   published figures.

6. **Check the display strings against `looksCoded()`** in
   [`scripts/check_qual_coverage.mjs`](../../scripts/check_qual_coverage.mjs) before running it.
   `$3,784/yr` contains letters and is not a bare `<n> <UNIT>` count, so it flags as
   `phrase (words)` — which is **correct and desired here**, since all five cells carry `quals`
   anyway and the checker skips cells that do. Do **not** tighten the heuristic for this row.

7. **Verify the figures against source** — re-read each of the five `Redesign Research 2026.md`
   files and confirm every headline figure and every number quoted inside a tooltip matches
   char-for-char. Deliberately re-check Country Day's **$900** (the superseded `Pricing.md` says
   $510) and Christian's **$325** (its `Pricing.md` says $240).

8. **Spot-check the live pages, and branch on the result.** Every figure was verified live on
   2026-08-15 (see *Source material*), but re-check the five rate pages before shipping — they
   are live school sites and the rates are seasonal.
   - **Unchanged (expected):** proceed. No source-material or ingest work; say so in the PR body.
   - **Anything moved, added, or vanished:** stop and follow the four-step pipeline in *Source
     material* — persist to `source-material/`, run `ingest-source-material`, confirm the
     distilled doc count **N** and `Rebuilt` date changed plus `schools.json`'s `generated`
     stamp, and only then edit `metricValues.ts`. Commit the regenerated files with the change.

   Read Christian's packet **as PDF pages, not extracted text** (Context explains why), and
   ignore its misleading `2025-26…` filename.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below runs
until they confirm the English wording — especially the row `note` and the five tooltips, which
are the bulk of the new prose.

### Phase 2 — Every other locale

Only after that confirmation.

This row's text is **research prose in `src/data/**`, not UI chrome** — the `label`, `note` and
`quals.text` all live in `metricValues.ts`, which is reached by the **overlay layer**, so this is
the `PROSE_TRANSLATED` list in [`src/lib/i18n.ts`](../../src/lib/i18n.ts), **not** the
`src/locales/*.json` catalogs. No chrome key is added by this plan, so `check:translations` has
nothing new to cover.

1. **Re-extract and rebuild the overlay** for the after-school topic across every locale in
   `PROSE_TRANSLATED`, per the mechanism in
   [`prose-translation-architecture.md`](../docs/prose-translation-architecture.md). Do not
   re-derive the method — follow the doc.
2. **Translate the new strings** into each locale, following the register rules in that locale's
   own rollout doc (`.claude/docs/prose-translation-<code>.md`). Read a prior doc for method, never
   for a register rule to inherit — `fr` §1 inverts `ht` §1.
3. **Leave every figure untouched.** `$3,784`, `$900`, `$4,650`, `32–52%` are copied
   char-for-char; they are never re-typed, re-grouped or re-separated. This row is unusually
   figure-dense, and it is a **lakh/crore hazard**: `hi` and `te` regroup at render, so the stored
   data must keep the English 3-3-3 form or the render layer regroups an already-regrouped number.
4. **Watch the `/yr`, `/mo`, `/sem` suffixes.** These are English abbreviations sitting inside an
   otherwise-numeric display string, which is exactly the "a sentence wearing an identifier's
   clothes" shape `CLAUDE.md` warns about. They **must** be translated (they are prose, not
   identifiers) — and they must not break `localizeMoneyText()`. Verify in a browser, per Risks.
5. **RTL check for `fa` and `ar`** — the money values are bidi-neutral and need LRI…PDI isolate
   treatment; `npm run check:bidi` covers it.

## Files touched

| File | Change |
|---|---|
| `src/data/metricValues.ts` | edit — add the `aftercare-cost` metric; fix `latest-pickup`'s Cannon value + stale comment; add two `quals` entries |
| `src/data/overlays/**` | edit (Phase 2 only) — regenerated overlay entries for the new strings |
| `source-material/after-school/<school>/*.md` | new — **only if** step 8 finds a changed figure |
| `.claude/docs/after-school/<school>.md` | regenerated — **only if** a source file was added/changed (count `N` + `Rebuilt` date) |
| `src/data/schools.json` | regenerated — same condition (`generated` stamp + `documents`) |

No component, style, locale-catalog, or script changes. The last three rows are the
conditional ingest path and are expected to be untouched in the normal case.

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:quals` — passes; no after-school cell reported as missing a tooltip
- [ ] `npm run check:metrics` — passes
- [ ] `npm run check:money` — passes (no new render path should be introduced; if this fails,
      something was added that bypasses `localizeMoneyText()`)
- [ ] `npm run lint` — clean
- [ ] `npm run build` — succeeds
- [ ] **Provenance** — every figure in the row traces to a committed `source-material/**/*.md`.
      If step 8 triggered an ingest: `.claude/docs/after-school/<school>.md` shows an updated
      document count and `Rebuilt` date, `src/data/schools.json` shows a new `generated` stamp,
      and both are committed. If it did not: confirm those files are **unchanged** in
      `git status` — a diff there means something edited a generated layer by hand
- [ ] **Browser check** (`npm run dev`) — open Compare, select the After School topic:
  - two rows render, cost beneath pickup time
  - all five figures show, Davidson Day shows N/A
  - **hover every one of the five tooltips** and confirm the text is complete and readable —
    tooltip prose is the deliverable here, and no script can judge it
  - confirm the figures match the source files

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves against live `src/data/**`
- [ ] `npm run check:live` — passes
- [ ] `npm run check:sepdrift -- --lang <code>` for each locale — **the important one**: catches a
      figure that kept its digits but swapped separators, which the figure sweep normalises away
- [ ] `npm run check:currency` and `npm run check:money` — pass
- [ ] `npm run check:bidi` — passes (`fa`, `ar`)
- [ ] `npm run check:hi` — passes (lakh/crore grouping)
- [ ] `npm run i18n:leaks` — no new English leaks from this row
- [ ] **Browser check in a non-English locale** — load Compare in at least `es`, `hi` (lakh/crore)
      and `fa` (RTL) and confirm: the `/yr`, `/mo`, `/sem` suffixes are translated; money is
      localized in both the cell and the tooltip; no figure has been re-grouped twice

## Risks

| Risk | Mitigation |
|---|---|
| The `lead` highlight tints the **highest** value, so the most expensive school gets the "winner" tint | Pre-existing and identical on `top-tuition`; explicitly out of scope. Note it in the PR body so the user can decide separately whether cost rows should invert it |
| An implementer reads the stale `Pricing.md` instead of `Redesign Research 2026.md` and ships $510 for Country Day or $240 for Christian | Step 7 requires re-verifying both figures specifically; the Context section names the trap |
| A rate changes between planning and implementation, and the new figure is typed straight into `metricValues.ts` — breaking the rule that every app figure traces to a committed source file | Step 8 branches explicitly: any movement routes through persist → `ingest-source-material` → confirm regenerated counts → then the app layer. The Phase 1 provenance checkbox verifies it both ways |
| An ingest runs but the distilled layer silently doesn't regenerate, leaving `.claude/docs` and `schools.json` stale | The checkbox asserts the specific observable signals — the `Distilled from N source document(s)` count, the `Rebuilt` date, and `schools.json`'s `generated` stamp — rather than just "ran the skill" |
| Christian's `2025-26…`-named PDF is mistaken for stale and its $325 "corrected" downward | Context flags the filename/content mismatch; step 8 repeats it |
| Christian's PDF text layer yields fabricated figures (`$275.87`) that look plausible | Context requires reading that packet as pages, not extracted text |
| Cannon's unlinked backup page disappears, stranding its rate card | Already-committed source material preserves it; if it 404s at implementation time, the committed file stands and the tooltip's 2025-26 year note is what carries the caveat |
| The ×10-month annualized estimates get mistaken for published figures by a later editor | Every tooltip words them as estimates and names the assumption; the row `note` says units differ |
| `/yr`/`/mo`/`/sem` suffixes break `localizeMoneyText()` in some locale | Phase 2 browser check in `es`/`hi`/`fa` explicitly covers it; `check:money` guards the render path |
| Cannon's 2025-26 rates read as current beside four 2026-27 figures | Its tooltip states the year and why (the live page is portal-gated) |

## Open questions

- **Should the tooltips also carry the late-pickup penalty?** It's published for four schools and
  is a real cost. **Default:** no — it's one of the three deferred metrics and belongs in its own
  row, not smuggled into this one's tooltips.
- **Is 10 months the right annualizing assumption?** No school publishes its billing-month count;
  10 (Aug–May) matches a typical academic year. **Default:** use 10, state it as an assumption in
  every tooltip that relies on it.

## Implementation notes

Shipped in [#119](https://github.com/dward330/CharlottePrivateSchoolConversations/pull/119),
both phases. Three deviations from the plan, all worth recording.

### 1. The headline decision was REVERSED mid-build, at the user's request

The plan's central decision — *"Headline = the school's own published figure; annualized
estimate goes in the tooltip"* — did not survive the Phase 1 review. Seeing it rendered, the
user asked for **the monthly amount with the annualized figure directly below it**, per school.

That request collides with the char-for-char figure rule for exactly two cells: Cannon
publishes only an annual `$3,784` and Latin only a per-semester `$4,650`, so a monthly
headline for those two must be *derived*. The user was offered both honest readings — lead
with each school's own unit (headline unit varies), or lead with monthly everywhere (two
derived figures) — and **chose monthly-on-top for all five**, so the row scans in one unit.

Resolution: a `≈` marks whichever figure was converted, and it falls on **different lines per
school** — Cannon's and Latin's *monthly* numbers are derived, the other three schools'
*yearly* totals are. Every cell therefore carries one published figure and one conversion, and
the tooltips name the published price outright ("Latin bills per semester, $4,650 twice a
year — the monthly figure above is that $9,300 spread over 10 months, not a rate the school
quotes"). The plan's underlying principle survives; only its presentation changed.

### 2. It needed a component change the plan said it would not

*Files touched* claimed "no component, style, locale-catalog, or script changes", which was
true of the plan's design but not of the two-line format. Cells rendered a single value, so
this added an optional `subs` map to `ValueMetric`, rendered in `Compare.tsx` through
`localizeMoneyText()` on **both** the qualified and unqualified paths, plus a `.mark-sub`
style. `check:money` passes on the new render site — worth confirming given that script exists
because three paths were once found bypassing that call.

Phase 2 then needed a **script** change too: `subs` required the same per-slug prose overrides
in `i18n_fields.mjs` that `values` already carries. Same shape, same reason — a field whose
values look like bare figures but carry a unit word (`/mo`) a reader actually reads.

### 3. Two defects found in Phase 2, neither caught by an existing check

- **Bangla numerals.** Three strings shipped years and percentages in Bengali digits
  (`২০২৬–২৭`, `৩২–৫২%`). `bn` is in `FIGURE_SAFE_NUMBERS` for *digits*, so the data stores
  Western digits and the render layer converts — every other shipped `bn` string already did.
  Caught by `check_figures.py`, which is why the plan was right to require both figure checks.
- **The leading `≈` fell outside the bidi isolate**, so RTL reordered it to the trailing edge:
  `≈$378/mo` rendered `$378/ماه≈` in Farsi, reading as a trailing symbol rather than "about".
  Fixed in `localizeMoneyText()` by capturing an optional `≈` into the isolated run. This is a
  **new instance of the repo's oldest pattern** — a bidi-neutral character that no source-level
  check can see, found only by looking at the rendered page. The plan's Risks table anticipated
  the `/mo` suffix breaking `localizeMoneyText()`; the actual break was the `≈` beside it.

### Confirmed as planned

Step 8 resolved to the **"nothing moved"** branch: all five headline figures and Davidson Day's
`null` were unchanged on re-verification, so no source-material or ingest work was done and the
generated layers are untouched. Christian's packet was read as PDF pages, not extracted text,
and its misleading `2025-26…` filename did not mislead.

### Left undone, deliberately

- **The `lead` tint still highlights the most expensive school** as "winner" — pre-existing,
  identical on `top-tuition`, out of scope per the plan. It now at least compares like with
  like, since every value in the row is monthly.
- **`check:live` does not cover this layer at all.** `metric-values` is absent from its
  `TOPICS` map, so all 324 of its entries count as unresolvable in the unscoped run
  (2,909 → 2,927 across this change; pre-existing on `main`). `check:runtime` is what actually
  validates these overlays and it passes clean. Flagged rather than fixed — widening that map
  is its own change.
