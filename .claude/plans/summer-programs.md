---
name: summer-programs
title: Add a Summer Programs research area to every school page, with a filterable Camp Catalog and an interactive Summer Cost Planner
status: english-done
phases: 2
created: 2026-08-11
branch: feat/summer-programs
prs: []
---

# Summer Programs research area (all schools)

## Goal

Add a seventh research area, **Summer Programs**, to every school page — positioned
between After School and Financial Aid & Tuition — built from the design handoff
(`summer-programs-handoff-instructions.md`) and the Industry design system, and wired
exactly like the existing research areas: a header chip, a left-rail entry (with doc
count), a "Compare on Summer Programs" button, and the section's podcast deep-dive banner
where an episode covers that school's camps. Each section carries a **stat strip**, an
optional **photo band**, a filterable **Camp Catalog** card (category tabs +
day-of-week + grade-band chips + search), and an interactive **Summer Cost Planner** card
(selectable camp table + weeks picker + add-on toggles + whole-summer estimate panel).
We know it worked when each school's real summer slate renders, every card cites a source
URL, and a parent can filter camps and total a summer.

## Context

The **After School** area is the exact structural template for this build — same pattern
end to end. Read these before starting:

- `src/data/afterSchool.ts` — the per-topic data module: typed card contract
  (`AFTER_SCHOOL_CARDS`), shared `AsSource`/`AsFlag` (`verify | estimate | gap | stale`)
  types, per-school files under `afterSchoolPrograms/<slug>.ts`, and the overlay
  loader (`loadAfterSchoolOverlay` / `afterSchoolProgram`) built on `lib/localizeData.ts`.
- `src/components/AfterSchool.tsx` — the card body renderers. It **already contains every
  interactive mechanism Summer Programs needs**: `SourceRow` (linkified citations),
  `Flags`, `RichText` (`**bold**` + `localizeMoneyText`), the filter-chip + search +
  `highlight()` catalog (`EnrichmentCatalog`), the selectable pricing matrix with a live
  estimate panel (`CostBody`), and per-column verified/estimated handling. Summer's Camp
  Catalog and Cost Planner are variations on `EnrichmentCatalog` and `CostBody`.
- `src/pages/SchoolDetail.tsx` (lines ~638–873) — the After School substitution block:
  how a full-substitution topic loads its structured entry, filters `*_CARDS` to the ones
  a school has, and renders each as a `note-card note-card-report` `<details>` with a
  `TopicGlyph`, `Compare` button, stat strip, and section podcast strip. Summer Programs
  adds a parallel block.

How a topic becomes a research area (all confirmed in code):

- **`src/data/schools.json` is fully generated** by the ingest pipeline from
  `source-material/` (`scripts/build_docs.py` → `build_site_content.py`). Its `topics`
  array, `matrix` (topic×school `doc_count`), and `documents` all flow through with **no
  code edits**. `manifest.ts` `topicsForSchool()` renders a section only where
  `docCount > 0`, so a school with no summer source files simply shows no Summer section —
  which is exactly the "drop the school if no summer program" behavior the handoff wants,
  for free.
- **`src/lib/metrics.ts`** — needs a new `RULES['summer-programs']` array whose FIRST rule
  folds every ingested subtopic heading onto ONE key (copy the After School leading rule
  at lines 52–56), so the long summer research doc's headings ("Card — The Camp Catalog",
  "Sources & Where to Verify", …) don't slugify into orphan prose cards. Add
  `'summer-programs'` to `TOPIC_ORDER` (line 191) immediately after `'after-school'`.
  (Financial Aid is not in `TOPIC_ORDER`, so it already falls to the end after summer —
  no change needed there.) Optionally add a `SECTION_ORDER['summer-programs']`.
- **`src/lib/labels.ts`** `topicLabel()` reads a slug→locale-key map; add a
  `summer-programs` entry (Phase-1 English key + Phase-2 locales).
- **`src/data/metricValues.ts`** `VALUE_METRICS` powers the stat strip. The 4 headline
  cells (season length, # of camps, grade/age span, wrap-around hours) are added as new
  `topic: 'summer-programs'` entries. `SchoolDetail` filters tiles on `values[slug] != null`,
  so a school missing a figure drops that tile automatically. Coded values (`~60+`,
  `PK–12`) need a `quals` entry — run `check:quals`.
- **`src/data/podcastEpisodes.ts`** — episodes **10 and 11** are Summer Camp episodes
  currently `researchArea: null` (surfacing via the page-level "More episodes" popover
  through `unmappedEpisodesFor`). Flip both to `researchArea: 'summer-programs'`. That
  single change moves them out of the popover and into the section strip via
  `episodesFor(school, 'summer-programs')` — matching the handoff's "move it out, as the
  reference did for Providence Day." Ep 10 = Cannon, Providence Day, Country Day; Ep 11 =
  Charlotte Latin, Charlotte Christian, Davidson Day → together all six schools. Run
  `npm run check:podcast` (validates slugs against `schools.json`).

i18n mechanics (see `CLAUDE.md` i18n standard + `.claude/docs/prose-translation-*.md`):

- **10 locales total.** `TRANSLATED = ['en','es','bn','ht','te','fr','fa','it','hi','ar']`
  (UI chrome → `src/locales/*.json`). `PROSE_TRANSLATED = ['es','bn','ht','te','fr','fa','it','hi','ar']`
  (research prose → overlay layer, `src/data/overlays/summer-programs.<lang>.json`).
- UI chrome (filter labels, "per week", estimate-panel captions, flag words) → new keys in
  `src/locales/*.json` under a `summerPrograms.*` block, mirroring `afterSchool.*`.
- Section headings identical across schools stay OUT of the data (`xTitle` absent) and
  render `data.xTitle ?? t('sections.…')`. Do NOT lift a repeated heading into a school's
  data file (pins it to English). Card TITLES that vary per school stay in the data.
- Money: authored US-style (`'$450/week'`, `'$3,600'`) and localized at render via
  `localizeMoneyText()` / `money()`. Never hand-convert a figure. Figures are copied
  **char-for-char** from the English source in every overlay (the `check:sepdrift` rule).
- The `day` weekday codes (Mon–Fri) are chrome — reuse the `afterSchool.day_*` keys or add
  `summerPrograms.day_*`; don't let raw codes render inside a translated card.

**Reference-file caveat (important).** The reference `Providence Day School.dc.html`
(project `5da24575-40bf-4787-8934-0fadfc56059f`, readable via the `DesignSync` MCP —
`canEdit: true`, so `get_file` works) is **truncated at the source**: its stored content
ends inside the College Support section, and the `#summer` section's **DOM body is not
present**. What IS present and authored is the summer section's full **CSS grammar** (in
the file's single `<style>` block) — the interactive attribute vocabulary:

```
#campwrap[data-cday="All|Mon|Tue|Wed|Thu|Fri"]  [data-cday-opt="…"]     ← day-of-week filter
#campwrap[data-cgrade="All|tkk|g12|g35|g68|g912"] [data-cgrade-opt="…"]  ← grade-band filter
#sumwrap[data-weeks="1..10"] [data-wk-opt="…"]                          ← weeks-of-summer picker
#sumwrap [data-addon][data-on="true"]                                   ← add-on toggles
#sumwrap[data-camp="halfday|trad|sports|stem|premium"] tr[data-camp-row="…"]  ← selectable camp tiers
```

This does not block the build: the app **re-implements** the design in React using its own
tokens (`src/index.css`) rather than porting the raw HTML — the After School module's own
docstring says exactly this ("Recreates the design's redesign using the app's own tokens").
The handoff instructions fully specify the section's structure, and After School is a
proven, shipped template for every interaction. Match the Industry markup *patterns*
(blueprint frames, `details.topic` cards, duotone photos, Barlow Condensed / steel accent,
filter chips, estimate panel) as realized in the app's existing components, not by copying
missing DOM. If a newer, complete copy of the `.dc.html` becomes available, read its
`#summer` DOM for exact class/order details before finalizing markup — but do not block on it.

## Decisions

- **New topic slug: `summer-programs`; source-material topic folder `summer-programs/`.** —
  matches the handoff's `data-topic="summer"` intent while staying consistent with the
  hyphenated topic-slug convention (`after-school`, `college-support`).
- **Data module `src/data/summerPrograms.ts` + `src/components/SummerPrograms.tsx`, with
  per-school files under `src/data/summerProgramsPrograms/<slug>.ts`.** — Hmm, that folder
  name doubles "Programs"; use `src/data/summer/<slug>.ts` for the per-school files to keep
  it clean, imported by `summerPrograms.ts`. (After School used `afterSchoolPrograms/`; the
  cleaner name is a deliberate small improvement, not a divergence in mechanism.)
- **Full deep research for all six schools in one pass** (user-chosen). Schools with no
  published summer program get no source files → no section. Camps-but-no-pricing keep the
  Camp Catalog and drop the Cost Planner, noting the pricing gap in the catalog source row.
- **Photo band drops when no real photo is found** (user-chosen). Try to source real photos
  of that school's summer facilities/activities; caption accurately; never ship placeholder
  frames. Where a school already has committed facility images they may be reused if they
  genuinely depict summer use.
- **Card contract mirrors After School:** `SUMMER_CARDS` with keys `catalog` (Camp Catalog)
  and `costPlanner` (Summer Cost Planner), each optional per school. Stat strip + photo band
  are section-level (rendered in `SchoolDetail`), not cards.
- **Reuse `AsSource` / `AsFlag` / `RichText` / `SourceRow` / `highlight()` patterns**
  rather than reinventing them — copy the shapes into the summer module so each area stays
  independently reviewable (After School defines its own copies too; that is the house
  style here, not shared imports).
- **Adaptive structures per handoff:** session-based billing relabels the weeks picker to
  "sessions"; no add-ons → drop the toggles; single-tier → collapse the camp table. Encode
  these as optional fields on the data types, exactly as After School encodes `flatRate`,
  `estimated`, empty `dayFilters`, etc.

## Approvals needed

- **New research area (topic) = a UX change.** Under `CLAUDE.md`'s UX-design standard and
  the ingest skill's app-layer checklist, a new topic/section normally needs the user's
  explicit approval first. **That approval is already given here:** this plan is driven by
  an explicit Claude Design MCP handoff and a direct request to build the section — "the
  handoff itself is the approval." No further sign-off required to start. Recorded so
  `/implement` does not stop at step 1 to re-ask.
- The new stat-strip tiles and Compare rows (`VALUE_METRICS` entries) are part of the same
  approved section; no separate gate.

## Source material

New research data — **fetched by `/implement`, not staged during planning** (the user chose
full deep research at implement time). Per school (`<slug>` ∈ cannon, charlotte-christian,
charlotte-country-day, charlotte-latin, davidson-day, providence-day), save under
`source-material/summer-programs/<school>/` as `<School> - Summer Programs - <Subtopic>.md`
with a provenance header, **source URLs**, and the camp-level detail behind every figure
(name, category, grades, weekly rate, days/hours, weeks offered, add-ons, registration
timing). Suggested subtopics: `Camp Catalog`, `Rates & Add-ons`, `Registration & Policy`,
`Season & Facilities`, `Sources & Where to Verify`.

Starting points (each school's summer site — confirm exact URLs during research):
`summer.providenceday.org`, and each school's equivalent summer-programs / summer-camps
page, published camp PDFs, rate sheets, and registration policy pages; local press for
sell-out / capacity patterns. Keep MOCK / TO VERIFY tags on anything unconfirmed; remove
them once real rates land. Then run the `ingest-source-material` skill (it regenerates
`.claude/docs/summer-programs/*.md` and `schools.json`).

## Out of scope

- Any change to the six existing research areas or their data.
- Adding Summer Programs to the **Home** page topic list beyond what `schools.json` +
  `TOPIC_ORDER` produce automatically (verify it renders; no bespoke home work planned).
- Backfilling summer data into Compare **coverage** metrics beyond the four new stat/value
  entries.
- Native-speaker translation review (tracked separately, as with other locales).
- Re-porting the raw design HTML/CSS verbatim — the app re-implements in React (see caveat).

## Steps

Two-phase: this adds substantial user-facing text (card chrome, prose, stat labels), so
English ships first and stops for review before any translation.

### Phase 1 — English

1. **Deep-research + persist source material (all 6).** For each school, research the
   summer slate and save `source-material/summer-programs/<school>/*.md` per the
   data-provenance standard (provenance header, source URLs, camp-level detail). Schools
   with no published summer program get **no** files. Ingest full catalogs where feasible;
   if sampling, sample across all categories and state "N of the M+ camps sampled below" in
   the catalog lead (as the reference does). Keep MOCK / TO VERIFY tags on unconfirmed data.

2. **Run the ingest pipeline.** Invoke the `ingest-source-material` skill so it regenerates
   `.claude/docs/summer-programs/<school>.md` and updates `src/data/schools.json` (new
   `summer-programs` topic, matrix rows, documents). Confirm the new topic + per-school
   `doc_count`s appear.

3. **Register the topic in `src/lib/metrics.ts`.** Add `RULES['summer-programs']` — FIRST
   rule folds all ingested subtopic headings onto one key (copy After School's leading rule,
   lines 52–56, adapting the heading regex to the summer doc's headings). Add
   `'summer-programs'` to `TOPIC_ORDER` right after `'after-school'`. Optionally add
   `SECTION_ORDER['summer-programs'] = ['catalog','cost-planner', …]`.

4. **Add the topic label** in `src/lib/labels.ts` `topicLabel()` slug map → English
   "Summer Programs" (locale key `topics.summerPrograms` or the existing pattern in that
   file; follow how `after-school` is keyed).

5. **Create the data module `src/data/summerPrograms.ts`.** Mirror `afterSchool.ts`:
   `SuSource`/`SuFlag` types, `CampCatalog` type (lead line, category tabs, day filters,
   grade-band filters, search; each `Camp`: name, category, grades[]+gradeLabel, price/unit,
   desc, meta line = days·hours·weeks, optional `estimated`), `CostPlanner` type (selectable
   camp tiers with weekly rates, `weeks` season length driving the picker, `addons[]` with
   labels+prices, one-time `fees[]`, `sessionBased?` to relabel weeks→sessions,
   registration side-note), `SummerProgram` (both cards optional), `SUMMER_CARDS` contract,
   `summerProgramsCardTitle()`, per-school imports from `./summer/<slug>.ts`, and the
   overlay loader/`summerProgram()` built on `lib/localizeData.ts` and
   `import.meta.glob('./overlays/summer-programs.*.json')` (keep the glob unwrapped — see the
   After School docstring warning).

6. **Author per-school data `src/data/summer/<slug>.ts`** from the ingested notes — one file
   per school that has a summer program. Every card ends with a `sources` array carrying the
   real URLs; unconfirmed figures carry a flag; `null`/omitted where the school publishes
   nothing (drop the Cost Planner where there's no pricing).

7. **Build the component `src/components/SummerPrograms.tsx`.** Export `CampCatalogBody`
   (adapt `EnrichmentCatalog`: category tabs + day chips + grade-band chips + search with
   `highlight()`, row = name/category tag/grade tag/price/desc/meta, count line + empty
   state) and `CostPlannerBody` (adapt `CostBody`: selectable camp table, weeks/sessions
   picker sized to the school's real season, add-on toggles, estimate panel totalling
   per-week / camp×weeks / add-ons×weeks / one-time fees / whole summer / ≈per-camp-day,
   plus the registration side-note card). Reuse `SourceRow`, `Flags`, `RichText`,
   `localizeMoneyText`/`money`. Add a `SummerProgramsCardBody` dispatcher keyed by card.

8. **Add the section-level photo band + stat strip helper** (or inline in `SchoolDetail`):
   a `PhotoBand` that renders 3 duotone blueprint frames with captions when the school's
   data provides real photos, and renders **nothing** when it doesn't. Photos go under
   `public/` (e.g. `public/summer/<slug>-*.jpg`) referenced from the school's data.

9. **Wire `src/pages/SchoolDetail.tsx`.** Add a `summer-programs` branch parallel to the
   After School block (~lines 638–873): import `summerProgram`, `loadSummerOverlay`,
   `SUMMER_CARDS`, the bodies; add `loadSummerOverlay(lang)` to the `Promise.all`; compute
   `summerCards`; add the substitution `<details>` loop; add its photo band above the cards
   and confirm the stat strip + section `<PodcastDeepDive area="summer-programs">` render
   (both already generic). Add `summer-programs` to the excluded-from-prose-loop ternary at
   lines ~911–918 so the prose loop doesn't double-render.

10. **Add stat-strip / Compare values** in `src/data/metricValues.ts`: four
    `topic: 'summer-programs'` `VALUE_METRICS` entries (season length, # camps, grade/age
    span, wrap-around care hours) with per-school `values` + `quals` on any coded cell. Run
    `npm run check:quals`.

11. **Flip podcast episodes 10 & 11** in `src/data/podcastEpisodes.ts` from
    `researchArea: null` to `'summer-programs'` (update the two docstring comments that say
    they map to no research area, and the header comment listing 10/11/32 as unmapped — 32
    stays unmapped). Run `npm run check:podcast`.

12. **English chrome keys** in `src/locales/en.json`: a `summerPrograms.*` block (filter
    labels, "per week"/"per session", estimate-panel captions, add-on/fees labels, flag
    words, search placeholder/aria, count line, `day_*` if not reusing `afterSchool.day_*`)
    plus `topics.summerPrograms` and any `sections.*` heading keys the cards render via
    `xTitle ?? t()`. **Add the same keys to `es.json`** as a placeholder-English pass only if
    the repo's convention requires en+es together for chrome (per ingest checklist §4) —
    otherwise leave es for Phase 2. Confirm no hardcoded JSX strings.

13. **SEO route list** — verify `scripts/seo_routes.mjs` picks up the new topic
    automatically (it imports `orderTopicSlugs(manifest.topics)`); no route edit expected
    since summer is a school-page section, not a new route. Run `npm run check:seo`.

**→ STOP. `/implement` ends its turn here and waits for the user's review of the English
Summer Programs section rendered in the browser (both a data-rich school like Providence
Day and a sparser one). Nothing below runs until the wording is confirmed.**

### Phase 2 — Every other locale

Only after the English wording is confirmed. Two layers, handled separately (see
`.claude/docs/prose-translation-architecture.md` for the mechanism, and the most recent
worked example, `prose-translation-ar.md` / `prose-translation-hi.md`, for the method — read
for method, not for a register rule to inherit):

1. **UI chrome →** translate the `summerPrograms.*` + `topics.summerPrograms` + new
   `sections.*` keys into each of the 9 non-English `src/locales/*.json`
   (`es, bn, ht, te, fr, fa, it, hi, ar`). Keys identical; values translated. Money/percent
   stay unspaced-per-locale via the format layer; no figures in chrome.

2. **Research prose →** generate `src/data/overlays/summer-programs.<lang>.json` for each of
   the 9 `PROSE_TRANSLATED` locales via the overlay build pipeline
   (`scripts/i18n_extract_content.mjs` / `i18n_build_overlay.mjs` — follow the rollout doc).
   Figures copied **char-for-char** from English (`check:sepdrift`); lakh/crore locales
   (`hi`,`te`) store the English 3-3-3 figure and regroup at render; RTL locales
   (`fa`,`ar`) wrap bidi-neutral figures in LRI…PDI isolates. Weekday codes come from chrome,
   not prose.

## Files touched

| File | Change |
|---|---|
| `source-material/summer-programs/<school>/*.md` | new — researched camp catalogs, rates, policies, sources (per school, uncommitted until branch) |
| `.claude/docs/summer-programs/<school>.md` | new — ingest-generated distilled notes |
| `src/data/schools.json` | edit (generated) — new topic, matrix rows, documents |
| `src/lib/metrics.ts` | edit — `RULES['summer-programs']`, `TOPIC_ORDER`, optional `SECTION_ORDER` |
| `src/lib/labels.ts` | edit — `topicLabel` slug→key for `summer-programs` |
| `src/data/summerPrograms.ts` | new — data module + card contract + overlay loader |
| `src/data/summer/<slug>.ts` | new — per-school summer data (one per school with a program) |
| `src/components/SummerPrograms.tsx` | new — Camp Catalog + Cost Planner + dispatcher bodies |
| `src/pages/SchoolDetail.tsx` | edit — summer-programs substitution block, overlay load, photo band, prose-loop exclusion |
| `src/data/metricValues.ts` | edit — 4 new `summer-programs` value metrics (+quals) |
| `src/data/podcastEpisodes.ts` | edit — episodes 10 & 11 → `researchArea: 'summer-programs'` + comment fixes |
| `public/summer/<slug>-*.jpg` | new — real summer photos where sourced (else band dropped) |
| `src/locales/en.json` | edit — `summerPrograms.*`, `topics.summerPrograms`, `sections.*` keys |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit (Phase 2) — same chrome keys translated |
| `src/data/overlays/summer-programs.<lang>.json` | new (Phase 2) — prose overlays, 9 locales |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds (chains `check:seo`, prerender, sitemap)
- [ ] `npm run check:metrics` — every summer subtopic resolves to a rule key (no orphan
      slugified cards); every school with summer files shows the topic
- [ ] `npm run check:quals` — no coded stat-tile value missing a tooltip
- [ ] `npm run check:podcast` — episodes 10/11 resolve to `summer-programs` on the right schools
- [ ] `npm run check:sources` — every card's citations carry URLs where required
- [ ] **Browser check (dev server), two schools** — a data-rich school (Providence Day) and
      a sparser one: Summer Programs section renders between After School and Financial Aid;
      chip + rail entry (with count) + Compare button present; podcast strip shows for
      schools on ep 10/11 and the episode is **gone** from the page-level "More episodes"
      popover; stat strip populated; photo band shows only where real photos exist; Camp
      Catalog category/day/grade filters + search + highlight all work; Cost Planner row
      select + weeks picker + add-on toggles update the estimate panel and whole-summer
      total. Confirm a school with camps-but-no-pricing shows the catalog and **no** Cost
      Planner, and a school with no summer program shows **no** section at all.
- [ ] **Expand-all print-out** on Providence Day with panels forced open — the Camp Catalog
      and Cost Planner figures actually appear (guard against the collapsed-panel print defect).

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every summer overlay stamp resolves against live `src/data`
- [ ] `npm run check:translations` — no missing chrome keys across the 10 locales
- [ ] `npm run check:sepdrift -- --lang <code>` (each of the 9) — no separator/re-typed figure drift
- [ ] `npm run check:money` / `check:currency` — money renders via the format layer, USD kept
- [ ] `npm run check:hi` / `check:fr` / `check:fa` — locale-specific identifier/figure guards
- [ ] **Browser print-out** on two schools in at least one RTL locale (`fa` or `ar`) and one
      lakh/crore locale (`hi` or `te`), panels forced open — figures read correctly, no
      English leaks in table cells / chips / source lines (the "sentence wearing an
      identifier's clothes" leak shape).

## Risks

| Risk | Mitigation |
|---|---|
| Summer data is huge (40–100+ camps/school) and slow to research | Ingest full slate where feasible; otherwise sample across all categories and SAY SO in the catalog lead ("N of M+ sampled"), never silently truncate. |
| A summer subtopic slugifies into an orphan card | The FIRST `RULES['summer-programs']` rule folds all headings onto one key; verify with `check:metrics` before wiring the UI. |
| Reference `#summer` DOM is absent from the stored `.dc.html` | Build from the handoff + After School template + the summer CSS grammar (captured in Context); if a complete `.dc.html` appears, read its DOM before finalizing markup, but don't block. |
| Real, licensable summer photos unavailable | Drop the photo band for that school (never ship placeholders) — the render already treats the band as optional. |
| MOCK figures leak to production untagged | Keep MOCK / TO VERIFY flags on every unconfirmed value; the flag IS parent-facing content, as in After School. |
| New topic doesn't render on Home | Home reads the same manifest + `TOPIC_ORDER`; verify in the browser check, no bespoke Home code expected. |

## Open questions

- **Exact category tabs / grade bands per school** — the reference uses
  `tkk / g12 / g35 / g68 / g912` and `halfday / trad / sports / stem / premium`. **Default:**
  adapt each school's tabs/bands to its actual slate (handoff says "adapt to the school's
  actual slate / grade span"); don't force the reference's buckets where they don't fit.
- **Whether chrome keys go to `es.json` in Phase 1** (ingest checklist §4 pairs en+es).
  **Default:** add the keys to `en.json` only in Phase 1 and translate all 9 in Phase 2, to
  keep the English gate clean — matching how the prose/overlay split already defers non-English.
