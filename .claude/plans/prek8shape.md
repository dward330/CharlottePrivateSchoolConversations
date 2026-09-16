---
name: prek8shape
title: The PreK–8 school shape — a High School Placement research area, Compare exclusion, and six dropped Sports cards
status: implemented
phases: 2
created: 2026-09-16
branch: feat/prek8-shape
prs: [308]
---

# The PreK–8 school shape

## Goal

Teach the app that a school can end at 8th grade. Three changes: add a **High School
Placement** research area (already designed in Claude Design) that renders only for schools
with no high school; **exclude PreK–8 schools from Compare entirely**, because 14 of the 30
Compare rows structurally require grades 9–12; and drop the six **college-bound Sports
prose cards** for those schools.

This plan ships the *shape* with **no school occupying it**. Charlotte Prep is a separate
plan that follows this one. Success looks like: every existing school page is byte-identical
to today, `npm run build` is green, and the new area is registered and ready to render the
moment a `source-material/high-school-placement/<school>/` folder appears.

## Context

**The design is done and approved.** `High School Placement Section Redesign.dc.html` lives
in the Claude Design project *Charlotte School Compare Website Design*
(`5da24575-40bf-4787-8934-0fadfc56059f`), verified rendering in a real browser. Build from it.
Its brief is [`.claude/docs/prek8-placement-design-brief.md`](../docs/prek8-placement-design-brief.md);
the decisions and verified data are in
[`.claude/docs/prek8-shape-assessment.md`](../docs/prek8-shape-assessment.md).

**Area omission is already automatic and needs no code.** `topicsForSchool()`
([src/lib/manifest.ts:45](../../src/lib/manifest.ts#L45)) filters to `docCount > 0`, and
`SchoolDetail.tsx` maps that filtered list. A school with no `source-material/` folder for a
topic simply has no such section, nav entry or card. This is the standing
absence-not-emptiness rule, and it is why **College Support needs no code to disappear** for
a PreK–8 school — §3.1 of the assessment is already satisfied by doing nothing.

**The nearest sibling to model is College Support** — component
[`src/components/CollegeSupport.tsx`](../../src/components/CollegeSupport.tsx), registry
`COLLEGE_SUPPORT_CARDS` in [`src/data/collegeSupport.ts`](../../src/data/collegeSupport.ts),
styles `src/index.css#L3290-L3665`. Follow its conventions rather than inventing new ones.

**Registering a research area touches three lists**, confirmed by reading them:

- `TOPIC_ORDER` — [src/lib/metrics.ts:257-266](../../src/lib/metrics.ts#L257-L266), eight entries today
- `RULES` — same file; maps research subtopic phrasings onto prose-card metric keys
- `STRUCTURED` — [scripts/gen_data_schema.mjs:221-229](../../scripts/gen_data_schema.mjs#L221-L229),
  seven registries today; this is what makes typed cards appear in the generated schema doc

### Three corrections to the assessment — read these before following its §3.2 table

The assessment was written before anyone read this code. Three of its claims are wrong or
incomplete, and each would cost a fresh window real time:

**1. The six Sports cards to drop are PROSE metric keys, not structured-card keys.** The
assessment says "the Sports card registry should drop those six cards." But `SPORTS_CARDS`
([src/data/sportsProgram.ts:394-400](../../src/data/sportsProgram.ts#L394-L400)) holds seven
cards with entirely different keys (`offered`, `record`, `pipeline`, `honors`, `coaching`,
`facilities`, `national`). The six named — `matriculation`, `power-4`, `pros`, `recruiting`,
`nil`, `national-profile` — are **`RULES` metric keys** at
[src/lib/metrics.ts:182-186](../../src/lib/metrics.ts#L182-L186). They are two different
layers with two different omission mechanisms, and **the prose layer needs no code at all**:
a prose card exists only if a research document maps to its metric key, so simply not writing
that material omits it. **Do not edit `SPORTS_CARDS`.**

**2. `allSchools` is used in SIX places in Compare.tsx, not the two the assessment lists.**
Two of them are **user-visible counts** that would otherwise read "12 schools" while only 11
are selectable:

| Line | Use | Filter? |
|---|---|---|
| [Compare.tsx:212](../../src/pages/Compare.tsx#L212) | `selected` — slug allowlist | **yes** |
| [Compare.tsx:219](../../src/pages/Compare.tsx#L219) | `toggleSchool` next-set | **yes** |
| [Compare.tsx:237](../../src/pages/Compare.tsx#L237) | `cols` — the columns | **yes** |
| [Compare.tsx:245](../../src/pages/Compare.tsx#L245) | `compare.sub` count | **yes** |
| [Compare.tsx:266](../../src/pages/Compare.tsx#L266) | `schoolsLegend` total | **yes** |
| [Compare.tsx:268](../../src/pages/Compare.tsx#L268) | the picker pills | **yes** |

All six read the same import, so **one filtered constant fixes all six** — that is the
step-2 approach below, and it is why this is cheaper than the assessment implied.

**3. `SchoolDetail.tsx:1332` must NOT be filtered.** The assessment's table does not mention
it. It is the **"More schools" navigation row**, not a Compare surface — a PreK–8 school
*should* appear there so readers can reach its dossier. Filtering it would hide Charlotte
Prep from every other school's page. Leave it alone, deliberately.

### One open question answered empirically

The assessment's §6 asks whether a PreK–8 school might fall under `check:seo`'s
`MIN_BYTES = 20_000` floor ([scripts/check_seo.mjs:46](../../scripts/check_seo.mjs#L46)).
**Measured: it cannot.** The thinnest pre-rendered page in `dist/` today is
**hickory-grove-christian at 250,728 bytes — 12.5× the floor**; the largest is providence-day
at 494,678. An 8-area school with no Compare surface would have to be ~92% thinner than the
thinnest school we ship to trip it. Treat this as closed, not as a risk to investigate.

## Decisions

- **Filter at one shared constant, not at six call sites** — `allSchools` feeds all six
  Compare uses from one import; a single `COMPARABLE_SCHOOLS` derived list fixes the columns,
  the pills *and* the two visible counts, and cannot drift out of step later.
- **PreK–8-ness is data, not a hardcoded slug list** — add a `hasHighSchool` (or equivalent)
  flag to the school record rather than testing `slug === 'charlotte-prep'`. A second PreK–8
  school must need zero code.
- **Do not touch `SPORTS_CARDS`** — the six college-bound cards are prose metric keys, omitted
  by not writing the research. See correction 1.
- **Do not filter the "More schools" row** — it is navigation, not Compare. See correction 3.
- **`destinations` is its own card, not folded into `outcomes`** — settled during the design
  pass; the rate and the list answer different questions, and the cross-link needs its own
  surface. The design's section 1 argues this on-canvas.
- **Stat tiles read the topic's own data, never `VALUE_METRICS`** — a PreK–8 school has no
  `metricValues.ts` entries at all. Follow the existing `AdmissionsStatBand` precedent
  ([SchoolDetail.tsx:913](../../src/pages/SchoolDetail.tsx#L913)), which does exactly this.
- **Denominator is a tile field, not a caption** — `{ value, denominator?, caption }`; a
  missing denominator renders a `NO DENOM.` chip, never a blank.
- **Two phases** — the four card titles, the parent questions and the chip labels are all new
  user-facing chrome.

## Approvals needed

**None outstanding.** The UX-design gate for this shape — the new research area, the Compare
exclusion and the six dropped Sports cards — was **granted by the user on 2026-09-15**. The
design handoff was separately pre-approved under the UX-design standard. Nothing here needs
re-asking.

## Out of scope

- **Charlotte Prep itself** — no `source-material/`, no research, no school record. That is
  the follow-on plan. This one ships the shape with zero occupants.
- **Any change to an existing school's rendering.** Every one of the eleven current pages must
  be byte-identical after this plan. That is a verification step, not an aspiration.
- **`SPORTS_CARDS`** — see correction 1.
- **The "More schools" row** — see correction 3.
- **Compare rows for High School Placement.** The area has no Compare surface by design.

## Steps

### Phase 1 — English

1. **Add the PreK–8 flag to the school record.** Extend the `School` type in
   [`src/lib/manifest.ts`](../../src/lib/manifest.ts) with an optional `hasHighSchool?: boolean`
   (absent/`true` = ordinary K–12 behaviour, `false` = PreK–8). Add the matching optional field
   wherever `schools.json` records are typed. No school sets it to `false` in this plan.

2. **Derive one shared comparable-schools list.** In [`src/lib/manifest.ts`](../../src/lib/manifest.ts),
   export `export const comparableSchools = schools.filter((s) => s.hasHighSchool !== false)`.
   Document why it exists in a comment — a PreK–8 school has no 9–12 grades, so 14 of 30
   Compare rows have no referent and `0 / 8` on the Ivy row would actively mislead.

3. **Point Compare at it.** In [`src/pages/Compare.tsx`](../../src/pages/Compare.tsx), change
   the import at line 6 to bring in `comparableSchools as allSchools`. Verify all six uses
   (212, 219, 237, 245, 266, 268) now read the filtered list — including the two visible counts.
   **Also guard the URL path:** a hand-edited `?schools=charlotte-prep` must not produce a
   column. Line 212's `filter` already does this once the source list is filtered; confirm it
   rather than assuming.

4. **Drop the per-topic Compare button for PreK–8 schools.** In
   [`src/pages/SchoolDetail.tsx`](../../src/pages/SchoolDetail.tsx), the `compareSlugs`
   computation at line 500 and the button at ~line 867. When the current school is PreK–8,
   omit the button entirely. Leave line 1332 ("More schools") **untouched** — correction 3.

5. **Create the data layer.** New `src/data/highSchoolPlacement.ts` modelled on
   [`src/data/collegeSupport.ts`](../../src/data/collegeSupport.ts): a
   `HighSchoolPlacementProgram` root type with four optional keys — `outcomes`, `placement`,
   `destinations`, `verdict` — plus a `HIGH_SCHOOL_PLACEMENT_CARDS` registry and a
   `highSchoolPlacementPrograms/` per-school directory. Card titles carry **no kicker line**.
   Types the design requires: stat tiles as `{ value, denominator?, caption }`; destinations as
   `{ name, category, slug? }` where `category` is one of the school's four published groupings.

6. **Build the component.** New `src/components/HighSchoolPlacement.tsx`, following
   `CollegeSupport.tsx`'s structure. Four cards per the design: *Where Graduates Go* (stat
   strip + per-class rows that expand to destinations + the denominator-less 10-year row +
   scholarship band), *The Placement Program* (timeline), *Where They Land* (category filter
   chips + destination index with in-app cross-links), *Verdict & Visit Checklist* (reuse the
   existing `Verdict` treatment unchanged). **No Compare affordance anywhere in this area.**

7. **Resolve destination cross-links at build time.** Where a destination's `slug` matches a
   school in the roster, render a link to that dossier with a 3px brand left border and an ↗.
   **Never string-match a school name at render** — a renamed school would silently become
   plain text. Non-matching destinations render as plain chips.

8. **Register the topic.** Add `high-school-placement` to `TOPIC_ORDER`
   ([src/lib/metrics.ts:257](../../src/lib/metrics.ts#L257)) and add its `RULES` entry mapping
   research subtopic phrasings onto the four card keys. Decide its dossier position
   deliberately — it is the College Support analogue, so the same slot in the reading order is
   the natural choice.

9. **Register it in the schema generator.** Add the `STRUCTURED` entry in
   [scripts/gen_data_schema.mjs](../../scripts/gen_data_schema.mjs) (~line 229):
   `{ topic: 'high-school-placement', file: 'highSchoolPlacement.ts', reg: 'HIGH_SCHOOL_PLACEMENT_CARDS', root: 'HighSchoolPlacementProgram', dir: 'highSchoolPlacementPrograms' }`.
   Then `npm run schema` to regenerate `DATA-SCHEMA.md`.

10. **Teach `check:metrics` about Compare-excluded schools.** In
    [scripts/check_metrics.mjs](../../scripts/check_metrics.mjs), section 2 reports schools
    missing from a `values` map. A PreK–8 school legitimately has **no `metricValues.ts` keys at
    all** — without this it would report 30 false oversights. Skip `hasHighSchool === false`
    schools there, and print a one-line note saying how many were skipped and why (a silent skip
    is how a real gap hides).

11. **Add the English chrome keys.** All new user-facing strings go in `src/locales/en.json` —
    the four card titles, their parent-question subtitles, the category filter-chip labels, the
    `NO DENOM.` chip, the cross-link legend, and the two caveat chips (*not an admit rate*,
    *acceptance ≠ matriculation*). Never hardcode a string in JSX.

12. **Add the SEO route if one is needed.** Only if this area introduces a new route.
    `check:seo` cannot catch a route it was never told about
    ([scripts/seo_routes.mjs](../../scripts/seo_routes.mjs)). If it adds no route, say so in the
    PR rather than leaving it ambiguous.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording is right.

### Phase 2 — Every other locale

Only after that confirmation. Scope is **UI chrome only** — the `src/locales/*.json` catalogs
per `TRANSLATED` in [`src/lib/i18n.ts`](../../src/lib/i18n.ts). There is **no research prose to
translate in this plan**, because no school occupies the area yet; the overlay layer
(`PROSE_TRANSLATED`) comes into play in the Charlotte Prep plan, not this one.

1. **Translate the new keys into every non-`en` catalog.** Read `TRANSLATED` to get the actual
   list rather than hardcoding a count. Every key added in step 11 needs an entry in **all**
   catalogs — `npm run check:chrome` reads all ten and reports a key missing everywhere
   (exit 1) separately from one awaiting translation (exit 0).
2. **Check the RTL locales.** `ar` and `fa` are right-to-left. Any figure or Latin identifier in
   these strings follows the bidi-isolate rules in
   [`prose-translation-fa.md`](../docs/prose-translation-fa.md).
3. **Check the lakh/crore locales.** `hi` and `te` regroup digits at render. No figure is ever
   re-typed in a catalog; see `src/data/overlays/NOTES.md`.

## Files touched

| File | Change |
|---|---|
| `src/lib/manifest.ts` | edit — `hasHighSchool?` on `School`; export `comparableSchools` |
| `src/pages/Compare.tsx` | edit — import the filtered list (fixes all six uses) |
| `src/pages/SchoolDetail.tsx` | edit — omit the per-topic Compare button for PreK–8; **line 1332 untouched** |
| `src/data/highSchoolPlacement.ts` | new — root type + `HIGH_SCHOOL_PLACEMENT_CARDS` |
| `src/data/highSchoolPlacementPrograms/` | new — empty per-school directory |
| `src/components/HighSchoolPlacement.tsx` | new — the four cards |
| `src/index.css` | edit — styles for the new area, modelled on `#L3290-L3665` |
| `src/lib/metrics.ts` | edit — `TOPIC_ORDER` + `RULES` entry |
| `scripts/gen_data_schema.mjs` | edit — `STRUCTURED` entry |
| `scripts/check_metrics.mjs` | edit — skip Compare-excluded schools, with a printed note |
| `src/locales/en.json` | edit — new chrome keys (Phase 1) |
| `src/locales/*.json` (others) | edit — translations (Phase 2) |
| `.claude/docs/DATA-SCHEMA.md` | regenerated — never hand-edited |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean. **Also run `npm run build` and read its exit code**; there is
      a standing lesson in this repo that `--noEmit` has passed on a type error the build caught.
- [ ] `npm run build` — succeeds (chains `check:schema`, `check:live`, `check:runtime`, `check:seo`)
- [ ] `npm run check:schema` — the regenerated doc lists `high-school-placement` and its four cards
- [ ] `npm run check:metrics` — clean, and prints the skip note from step 10
- [ ] `npm run check:chrome` — new `en` keys reported as awaiting translation (exit 0), not missing
- [ ] `npm run check:seo` — every route still pre-renders above the 20 KB floor
- [ ] **No existing school page changes.** Build before and after; diff the eleven
      `dist/school/*/index.html`. Any delta is a bug — no school is PreK–8 yet, so this plan must
      be inert for all of them.
- [ ] **Browser check, not just a build.** With a temporary local fixture school flagged
      `hasHighSchool: false`, confirm in a real browser: the area renders its four cards; there is
      **no** Compare button anywhere on that page; the school is **absent** from the Compare
      picker, columns and both visible counts; `?schools=<fixture>` in the URL produces no column;
      and the school **still appears** in the "More schools" row. Revert the fixture before
      committing. Use `domcontentloaded`, not `networkidle` — Latest News fetches live, so the
      network never idles.

### Phase 2 — Locales

- [ ] `npm run check:chrome` — every new key present in all ten catalogs, exit 0
- [ ] `npx tsc --noEmit` and `npm run build` — still clean
- [ ] Browser spot-check in one RTL locale (`ar` or `fa`) and one lakh/crore locale (`hi` or `te`)

## Risks

| Risk | Mitigation |
|---|---|
| A seventh `allSchools` use appears later and silently re-admits PreK–8 schools to Compare | Filter at the shared `comparableSchools` export, not at call sites; grep for `schools as allSchools` in review |
| Someone "fixes" the unfiltered More-schools row at line 1332 | Correction 3 above, plus an explicit code comment saying it is deliberate |
| `check:metrics` skip hides a real gap | Print the count and the reason on every run; never skip silently |
| The area renders for a K–12 school by accident | Omission is by `docCount > 0` — no conditional in any component. A K–12 school with no such folder cannot render it |
| Six-locale chrome drift | `check:chrome` reads all ten catalogs and splits missing-everywhere from awaiting-translation on separate exit paths |

## Open questions

- **Where does High School Placement sit in `TOPIC_ORDER`?** — **default:** the same slot
  College Support occupies (after Sports, before After School), since it is that area's
  structural analogue and a parent reads it for the same reason.
- **Does the area introduce a new route?** — **default:** no. It renders inside the existing
  school dossier page like every other research area, so `seo_routes.mjs` needs no change. If
  implementation finds otherwise, add the route and say so in the PR.

## What comes next — tell the user this when you finish

This plan ships an **empty shape**. Its first occupant is Charlotte Preparatory School, and
that work is **already planned**: [`charlotteprep.md`](charlotteprep.md).

When this plan is merged, close your report by telling the user, in a new window:

```
/implement charlotteprep
```

That plan is the one that performs the deep research, writes `source-material/`, runs the
ingest pipeline and builds the eight research areas. Do **not** start any of it here — this
plan is deliberately inert for every existing school, and mixing a school's data into it
would destroy that property (its key verification step is that all eleven current pages come
out byte-identical).

## Implementation notes — Phase 1 (English), 2026-09-16

Phase 1 shipped on `feat/prek8-shape`. Five deviations from the plan as written,
each a correction rather than a preference.

**1. The PreK–8 flag lives in `src/data/brands.ts`, NOT on the `School` record.**
Step 1 said to extend the `School` type in `manifest.ts` and "add the matching
optional field wherever `schools.json` records are typed." That would not have
survived: the ingest pipeline **rebuilds every `schools.json` school record as
bare `{slug, name}`** from `source-material/` folder names
(`.claude/skills/ingest-source-material/build_docs.py:187`), so a flag written
there is **silently erased by the next ingest run** — and the school quietly
rejoins the Compare page with no error and no failing check. `brands.ts` is the
existing hand-maintained per-school config, already keyed by slug, already
imported by `manifest.ts`, and explicitly documented as *not* regenerated.
`manifest.ts` exports `hasHighSchool(slug)` and `comparableSchools` on top of it.
**This matters for the Charlotte Prep plan:** its PreK–8 flag goes in `brands.ts`
beside the school's color/city, not in `schools.json`.

**2. There is a SEVENTH `allSchools` use in `Compare.tsx`.** The plan's table
lists six (212, 219, 237, 245, 266, 268). Line 402 — `compare.coverage`'s `total`
— is a per-metric "covered by N of M schools" denominator that would otherwise
have read "3 of 12" on a page showing 11 schools. The single-constant approach
fixed it automatically, which is the strongest argument for that decision: the
plan's own inventory was incomplete and the chosen design absorbed it anyway.

**3. Two `SchoolDetail.tsx` wiring points the plan did not name.** Both are
invisible until a school occupies the area, and both would have shipped broken:
the **prose-substitution disjunction** (~line 1305) must list the new topic or
the ingested prose renders *alongside* the four cards; and the **overlay-warm
destructuring** has a documented "leading holes MUST match the loaders above"
invariant, so adding an eleventh loader without an eleventh hole feeds a `void`
into `Object.fromEntries`. `tsc -b` caught the second, as its comment predicts.

**4. `check:seo` needed no change — the area adds no route.** Answering the plan's
second open question: High School Placement renders inside the existing school
dossier like every other research area, so `seo_routes.mjs` is untouched.

**5. `TOPIC_ORDER` position: immediately after `college-support`.** The default in
the plan's first open question. The two areas are mutually exclusive in practice,
so every dossier shows exactly one area in that slot.

### Verification results

- `npx tsc -b` and `npm run build` — clean (build chains `check:schema`,
  `check:live`, `check:runtime`, `check:seo`).
- `check:schema` / `check:chrome` / `check:seo` — exit 0. The schema doc lists
  `high-school-placement`, its four cards and `0/11` schools.
- `check:metrics` — output **byte-identical to `main`**, verified by diff. With a
  fixture school flagged, it prints
  `note: skipped 1 Compare-excluded school(s) — fixture-prep — no grades 9-12…`
  and still reports all 30 value metrics clean rather than 30 false oversights.
- **All eleven existing school pages byte-identical**, verified by building `main`
  and this branch and diffing the pre-rendered `dist/**/index.html`. The only
  delta on any page is the two content-hashed asset filenames.
- **Browser check, 25 assertions, all passing** against a temporary `fixture-prep`
  school (reverted before commit; no trace remains). Covered: the four cards
  render; `NO DENOM.` chip and denominators; the hatched aggregate row; category
  filters narrow; per-class rows expand; cross-links resolve to `/school/<slug>/`
  while non-app destinations stay plain chips; **no Compare affordance anywhere**
  on the PreK–8 page; absent from the Compare picker and both visible counts;
  `?schools=fixture-prep` yields no column; **still present in "More schools"**;
  and a K–12 school keeps its Compare buttons and does not render the area.

The browser check found **three defects no automated check could see** (commit
`844ae5a`) — a contradictory "No readable notes" line above the cards, an
unpluralized "1 schools", and a legend swatch wearing the cross-link class. This
is the standing lesson holding again: every defect found after the data reads
100% has been render-layer.

## Implementation notes — Phase 2 (locales), 2026-09-16

The 30 English keys are now translated in all nine other catalogs — **322
entries**, chrome only. No prose overlay was touched: no school occupies the
area yet, so `overlays/high-school-placement.*.json` still matches no file and
every locale correctly falls back to English for prose. That stays true until
the Charlotte Prep plan lands.

**Arabic needed 45 keys where the others needed 29.** The four plural keys —
`classDestinations`, `crossLinkLegend`, `categoryCount`, `categoryLinked` —
require all six CLDR forms (`zero`/`one`/`two`/`few`/`many`/`other`) against the
`_one`/`_other` pair every other locale uses. The dual is not cosmetic: Arabic
absorbs the numeral into the noun (`مدرستان`, "two schools"), so that form
deliberately carries **no `{{count}}`**, and a mechanical `_one`/`_other` copy
would have rendered "2 مدرسة". Verified in a browser: count 3 → `few`, 2 →
`two`, 1 → `one`.

**Catalogs were rewritten preserving existing key ORDER, never normalized.** A
key-order normalize is the documented way Arabic plural blocks have been
destroyed before. A post-write diff asserted that every pre-existing key, value
**and its position** is byte-identical to `HEAD` in all nine files; only the new
surface was added.

**`check:chrome` is not the gate for this work.** It audits skip-field promises
(`day`/`days`/`dayFilters`/`basis`), so it passed identically before and after
and would never have noticed 322 missing keys. Coverage was measured with a
purpose-built script that expands `_one` into the correct plural forms per
locale; it went 322 → 0.

### Two test defects worth recording, both false results

Neither was an app bug, and each would have been believed:

- **A case-sensitive `innerText` match reported 47 false failures.** Several
  labels are uppercased by CSS `text-transform`, so `body.innerText` returns
  `CLASS BY CLASS`. Worse than the noise: the check *passed* for `bn`/`te`/`hi`/
  `fa`/`ar` purely because those scripts have no uppercase mapping — a **false
  pass on five locales in the same run as a false failure on five others**.
- **A substring English-leak test flagged `filterAll` in `es` and `it`.** The
  English `All` was matching inside `detalle`, `allí` and `distillati`. The
  pills in fact render `Todos` and `Tutte` correctly. Word-boundary matching on
  a Unicode letter class fixed it.

### Verification results

- Coverage: **0 missing** in all nine catalogs (from 322).
- `npx tsc -b` and `npm run build` — clean, exit 0 (chains `check:schema`,
  `check:live`, `check:runtime`, `check:seo`, `check:chrome`).
- `check:sepdrift` per locale — 12,331 strings each, **0 drifted figure tokens**.
- `check:fr`, `check:hi`, `check:fa`, `check:bidi`, `check:money`,
  `check:currency` — all pass.
- `i18n:leaks` per locale — counts **byte-identical to `main`**
  (es 164 · bn 187 · ht 180 · te 364 · fr 300 · fa 166 · it 346 · hi 247 ·
  ar 174). These are pre-existing prose-overlay findings; this change added none.
- Placeholder/digit audit — every `{{count}}` / `{{year}}` / `{{linked}}`
  survives translation; no stray or locale-native digit introduced.
- **Browser check, 320 assertions across all ten locales, all passing**, against
  a temporary `fixture-prep` school (reverted; `grep` confirms no trace). Covered
  per locale: the four card titles, the topic label and all 15 visible strings
  render in that locale; **no English leak**; no raw `{{ }}`; cross-links resolve
  to `/school/<slug>/` while non-app destinations stay plain; **no Compare
  affordance anywhere** on the PreK–8 page; and the fixture absent from Compare
  even with `?schools=fixture-prep`. RTL confirmed `dir=rtl` for `ar`/`fa` with
  figures wrapped in LRI…PDI isolates (`⁨2026⁩`); `hi`/`te` correctly take no
  isolate and keep Western digits, leaving lakh/crore regrouping to the render
  layer.
