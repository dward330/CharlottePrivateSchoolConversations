---
name: admissions
title: Admissions research area — new first topic, grade-band application guide, printable checklist export
status: english-done
phases: 2
created: 2026-08-30
branch: feat/admissions
prs: []
---

# Admissions research area — new first topic

## Goal

Add **Admissions** as a new research area, first in `TOPIC_ORDER`, so it leads every
school page ahead of Course Offerings. Its one deep-dive card — *Grade-by-Grade
Application Guide* — lets a parent pick their child's entry band and personalizes the
whole guide to it: the ordered steps, the current-cycle deadlines, the assessment for that
band, and two band-specific watch-outs. A second, printable route exports that same band
as a one-page paper checklist.

The topic **infrastructure is built for all schools**; the **data ships for Providence Day
only**. Ten schools have no admissions research, and a school with no
`admissionsPrograms/<slug>.ts` renders no Admissions section at all — the project's
standing "omission is absence of data" rule, not a conditional in a component.

We know it worked when: Providence Day's page opens with an Admissions section whose band
selector switches all three bands' content; `/school/providence-day/admissions-checklist/?band=tkk`
prints as one clean US-letter sheet with no browser chrome; the ten other schools' pages
are visually unchanged; and `npm run build` (which chains `check:schema`, `check:seo`,
`check:live`, `check:runtime`) is green.

## Context

### The design source

Two files in the Claude Design project `5da24575-40bf-4787-8934-0fadfc56059f`, read via the
`DesignSync` MCP tool during planning:

- **`Providence Day School.dc.html`**, section `#admissions` — the section markup. It sits
  between `#news` and `#courses` in the design, matching the `TOPIC_ORDER` placement.
- **`Admissions Checklist.dc.html`** — the printable export, a complete standalone page.
- **`admissions-handoff-instructions.md`** — the written brief, which matches the user's
  `/plan` argument verbatim. No drift between the two; either can be re-read.

**Re-read them rather than trusting this plan's excerpts for pixel detail.** This document
carries every *string* and every structural decision, but the design files carry the exact
markup. To reach them from a fresh window:

```
DesignSync  method: get_file
            projectId: 5da24575-40bf-4787-8934-0fadfc56059f
            path: "Providence Day School.dc.html"        # 264 KB — see note below
            path: "Admissions Checklist.dc.html"         # 15 KB, read whole
            path: "admissions-handoff-instructions.md"   # the brief
            path: "_ds/industry-ff3418ab-b7c3-4c24-aa94-1755d044fdea/styles.css"
```

`Providence Day School.dc.html` is **264 KB and will overflow context if read whole** — the
tool saves it to a file instead. The `#admissions` section is bytes **56,656–99,735**; slice
it out (`node -e` on the saved JSON's `.content`) rather than reading the file.

**If `DesignSync` returns HTTP 403**, the session lacks Claude Design scope — the user runs
`/design-consent` (that is what fixed it during planning; the MCP server had failed to
connect at session start). The plan's Appendices A and B carry every string, so a build can
proceed without the MCP if needed.

**Ignore the `.dc.html` template runtime.** `sc-if`, `{{ admBandKey }}`, `onClick="{{ admPick }}"`
and the trailing `class Component extends DCLogic` script are the design tool's own binding
layer, not part of the spec. Their React equivalents are `useState` plus conditional
rendering. The one thing worth lifting from that script is the band fallback:

```js
const b = new URLSearchParams(window.location.search).get('band');
return (b === 'g15' || b === 'g612') ? b : 'tkk';
```

— an unknown band falls back to the first, which the checklist page must reproduce.

### Design fidelity — follow the design exactly, but through the APP's tokens

**The reference markup is the specification for structure, copy and visual detail; it is not
code to paste.** The design files are standalone HTML using the Industry design system's own
stylesheet and a `<x-dc>` template runtime (`sc-if`, `{{ }}` bindings, a `DCLogic` class).
The app is React using `src/index.css`. Every other research area was built by *recreating*
the design with the app's own tokens — `summerPrograms.ts` says so explicitly:

> Recreates the design's Summer Programs section using the app's own tokens
> (src/index.css) rather than porting its markup, exactly as the After School module does.

Do the same here. Match the design **exactly** on: section order, every string, the three
framing rules, band keys and labels, the stepper order and its tags, which facts are flagged
unpublished, the table's rows and its `colspan` last row, the contacts grid, and the
checklist's layout. Recreate — do not copy — the inline `style="…"` attributes.

**The Industry tokens the section markup leans on**, read from
`_ds/industry-…/styles.css` during planning, so the app-side equivalents can be matched:

| Token | Value | Used for |
|---|---|---|
| `--color-accent` | `#5980a6` | the steel accent inside the card |
| `--color-accent-700` | `#416180` | kickers, step numerals, `tag-outline` text |
| `--color-accent-900` | `#1d2d3d` | **the selected band button's fill** |
| `--space-3/4/5/6` | `10.2 / 13.6 / — / 20.4px` | section rhythm |
| `.tag-accent` | bg `--color-accent-100` `#eef6ff`, text `--color-accent-800` `#2c455d` | hard deadlines |
| `.tag-outline` | `1px solid var(--color-accent)`, text `--color-accent` | soft deadlines |

Note `--space-5` is **not defined** in the Industry stylesheet even though the admissions
markup references `var(--space-5)` — it falls back to nothing there. Use the app's own
spacing scale rather than reproducing that gap.

Square corners are a system-wide rule (`.card, .btn, .input, .tag, .seg, .dialog {
border-radius: 0 }`), and the blueprint frame draws corner registration marks *outside* the
box. The app already implements both; use the existing classes.

**Per the CLAUDE.md UX standard, this design work needs no further approval** — a design
handoff is itself the approval, and the gate exists to stop *ingestion* from silently growing
the UI.

### The nearest analogous feature — Summer Programs

`admissions` follows the **Summer Programs** architecture almost exactly, and should not
invent a new one. The parallel is close: a structured typed layer that fully substitutes
for ingested prose within its topic, with an optional per-school entry.

- `src/data/summerPrograms.ts` — the registry: types, a `PROGRAMS` record keyed by school
  slug, the locale-overlay glob, and the accessor.
- `src/data/summer/<slug>.ts` — one file per school.
- `src/components/SummerPrograms.tsx` — the card-body component plus the card list.
- `src/pages/SchoolDetail.tsx` ~lines 690–1040 — the gate that swaps the structured cards
  in for the topic's prose.

Two details from that module are load-bearing and must be copied, not re-derived:

**The overlay glob must stand alone.** From `summerPrograms.ts:336-342`:

```ts
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/summer-programs.*.json', {
  import: 'default',
})
```

`import.meta.glob` is a Vite **compile-time** transform. A runtime guard around it survives
into the bundle, where `import.meta.glob` is undefined, and silently resolves every overlay
to nothing — every locale falls back to English with no error. Never guard it.

**The accessor returns English BY REFERENCE when there is no overlay** (`summerPrograms.ts:366-370`):

```ts
export function summerProgram(slug: string, lang = 'en'): SummerProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('summer-programs', lang), slug)
}
```

The identity requirement is documented in `src/lib/localizeData.ts`. Mirror it exactly.

**The empty-entry guard.** `SchoolDetail.tsx:690-696` shows the pattern: an entry that
exists but has no renderable cards is still truthy, and would suppress the prose while
rendering nothing. The code filters the card list first and only treats the entry as
present when that list is non-empty. Admissions has one card, so the equivalent guard is
"the entry has at least one band".

### Routing — the handoff's route shape is wrong, and this plan corrects it

The handoff says `/schools/:slug/admissions-checklist?band=<band>`. The app's actual
convention, from `src/lib/router.ts:16-46`, is **singular `/school/`** with a trailing
slash:

```ts
export type Route =
  | { name: 'home' }
  | { name: 'school'; slug: string }
  | { name: 'compare'; topic: string | null; schools: string[] }
```

`toSchool()` emits `${BASE_URL}school/${slug}/`. So the checklist route is
**`/school/<slug>/admissions-checklist/?band=<band>`**, and `Route` gains a fourth member:

```ts
| { name: 'admissions-checklist'; slug: string; band: string | null }
```

`parsePath()` must match `segs[0] === 'school' && segs[1] && segs[2] === 'admissions-checklist'`
**before** the existing `segs[0] === 'school' && segs[1]` branch, or the school branch
swallows it.

The **hash branch is a permanent compatibility layer** (`router.ts:8-12`) — parsing is
shared between the pathname and hash forms by one `parsePath()` body, so the new route gets
hash support for free. Do not add a separate hash case, and do not remove the fallback.

### The pre-rendered `/compare/` default topic will shift

`scripts/seo_routes.mjs:24` imports `orderTopicSlugs` from `src/lib/metrics.ts` deliberately,
so the pre-rendered compare page shows the same default selection a reader sees. Putting
`admissions` first in `TOPIC_ORDER` therefore **changes the canonical `/compare/` URL's
`?topic=`** from `course-offerings` to `admissions`. `check:seo` compares a changed canonical
against a changed sitemap — both regenerate together, so it passes; do not "fix" the diff by
pinning the old topic.

**With Compare deferred, verify what that default page actually shows.** Confirmed during
planning: `Compare.tsx:208-209` derives two independent row sets —

```tsx
const metrics = activeTopic ? metricsForTopic(activeTopic) : []
const valueMetrics = activeTopic ? valueMetricsForTopic(activeTopic, lang) : []
```

`valueMetrics` will be empty (no `VALUE_METRICS` rows), but `metrics` is **not**: the `RULES`
catch-all added in step 3 yields one research-coverage row, so `/compare/?topic=admissions`
renders a genuine ✓ / N/A coverage row for all eleven schools. The default compare page is
therefore sparse but **not blank or broken**.

**If that sparseness reads badly, the fix is the user's call, not the implementer's** — the
options are to leave it, or to keep `course-offerings` as the compare default while still
putting `admissions` first in `TOPIC_ORDER`. Do not silently choose the second; raise it.

### The stat band and the Compare rows are the same array — and Compare is DEFERRED

Verified in `SchoolDetail.tsx:604` and `:766-783`:

```tsx
const stats = valueMetricsForTopic(t.slug, lang).filter((vm) => vm.values[slug] != null)
```

`stats` is rendered as `.stat-strip` / `.stat-tile` directly above the cards. **The topic
header's stat band and the Compare table's Key Stats rows are the same `VALUE_METRICS`
array** — one edit, two surfaces. Only `key`, `label` and `values` are read here; `note`,
`quals`, `subs`, `noLead` and `compareAs` are Compare-only.

**This coupling is why the Compare deferral changes the build.** The user decided
2026-08-30 to hold off on Compare for this research area. Because the two surfaces read one
array, "no Compare rows" also means "no stat band from `VALUE_METRICS`" — there is no
per-surface filter beyond "is this school's value null".

So this plan adds **nothing** to `metricValues.ts`, and renders the design's 4-tile band
from the topic's own data (`AdmissionsProgram.stats`) using the same `.stat-strip` /
`.stat-tile` classes, so it looks identical to every other topic's band. Step 15 has the
detail and the trade-off.

Note `stats` on the school page runs `localizeMoneyText()` on every value
(`SchoolDetail.tsx:779`); a plain date passes through unchanged, so `Jan 15, 2027` is safe
and `$2,500` gets correctly localized. The Admissions band must do the same.

### The manifest is generated, not hand-written

`src/data/schools.json` has top-level `schools`, `topics`, `matrix`, `documents` — derived
by the ingest pipeline from `source-material/` folder names. A `documents` record looks
like:

```json
{
  "school_slug": "providence-day",
  "topic_slug": "summer-programs",
  "subtopic": "Camp Catalog",
  "source_file": "source-material/summer-programs/providence-day/...md",
  "note_file": ".claude/docs/summer-programs/providence-day.md",
  "type": "md"
}
```

So **`admissions` enters the manifest automatically** when `ingest-source-material` runs
over the already-staged `source-material/admissions/providence-day/` folder. Never
hand-edit `schools.json`.

### Five mechanical traps in `SchoolDetail.tsx`, all verified

A new structured topic touches this file in **six** places, and three of them fail silently
if missed.

1. **The overlay-loader destructure holes** (`:381-419`). The loaders run in one
   `Promise.all`, and the result is destructured with **leading commas that must equal the
   number of loaders**:

   ```tsx
   ]).then(([, , , , , , , , , ...entries]) => {
   ```

   Nine loaders today ⇒ nine holes. Adding `loadAdmissionsOverlay(lang)` makes it **ten
   loaders and ten holes**. Miss the hole and the loader's `void` result feeds into
   `Object.fromEntries` as if it were a `[slug, groups]` pair. `tsc -b` catches this — which
   is another reason to trust `tsc -b` over `--noEmit`.

2. **The three-line entry/cardList/guard idiom** (`:711-717`) — described above in the Summer
   Programs section. Mandatory.

3. **The `cardCount` ternary** (`:718-732`) — a nested chain, one rung per structured topic.
   Add an `admissions ? 1 :` rung (Admissions has exactly one card).

4. **The substitution disjunction** (`:1022-1031`) — this is the line that empties the prose
   loop so the structured card replaces it:

   ```tsx
   {(
     (t.slug === 'course-offerings' && offerings) ||
     ...
     (t.slug === 'summer-programs' && summer)
       ? []
       : groups
   ).map((g) => { … })}
   ```

   Add `(t.slug === 'admissions' && admissions) ||`. **Miss this and the topic renders the
   structured card AND the raw ingested prose, duplicated.**

5. **Mechanism A vs B — use A.** Admissions fully substitutes (one card, no surviving prose
   cards), so its card renders in **its own `.note-cards` grid** like Summer Programs, and
   step 4 empties `groups`. Mechanism B (one shared grid) is only for Student Clubs, which
   *merges* structured and prose cards. Because `groups` becomes `[]`, the shared grid
   renders empty and harmless. Do **not** apply the one-grid rule here — it exists for the
   merge case.

**The `headline` contract.** `SchoolDetail.tsx:970` renders the collapsed teaser as
`summer[card.key]!.headline` — so **every structured card's root type must carry a
`headline: string`**. It is a hard contract the type system does not express. Admissions'
card needs one; use the design's teaser text (Appendix A).

**The card `<details>` anatomy is fixed** across every structured topic:
`<details className="note-card note-card-report note-card-adm">` → `<summary>` →
`<span className="note-card-head">` with `.topic-title` (via `cardTitle(tr, 'admissions',
key, title)`) + `.topic-teaser` → `<span className="plusmark"><PlusIcon /></span>` →
`<div className="note-card-body">`. Follow it exactly.

**Put the dispatcher in the component file**, not in `SchoolDetail`. Summer Programs and
After School export theirs from the component (the newer, better placement); Sports, Arts,
Clubs and College Support define theirs inside `SchoolDetail.tsx`. Follow Summer.

### `RULES` — use the single catch-all, and put it FIRST

`RULES` is `Record<string, Rule[]>`, **ordered, first match wins**, and not exported. For a
fully-substituted topic the entry is one catch-all, exactly as `summer-programs` does
(`metrics.ts:76-91`):

```ts
admissions: [
  { match: /.*/, key: 'redesign-research', label: 'Admissions Research Dossier (2026)' },
],
```

`match: /.*/` folds every sliced heading of the one long research document onto a single
key so none of them slugify into orphan prose cards. `normalizeMetric` falls through
**silently** to `slugify(subtopic)` when no rule matches — which is why a missing entry
produces stray cards rather than an error. `SECTION_ORDER` needs **no** entry: one key means
nothing to order.

### The card registry parse-not-import rule

`scripts/gen_data_schema.mjs` **parses** the card registries out of source rather than
importing them, because each calls `import.meta.glob` at module scope and throws under plain
Node. It is **not** a filename glob — there is an explicit table at `gen_data_schema.mjs:221`:

```js
const STRUCTURED = [
  { topic: 'sports', file: 'sportsProgram.ts', reg: 'SPORTS_CARDS', root: 'SportsProgram', dir: 'sportsPrograms' },
  …
  { topic: 'summer-programs', file: 'summerPrograms.ts', reg: 'SUMMER_CARDS', root: 'SummerProgram', dir: 'summer' },
]
```

**Add a row:** `{ topic: 'admissions', file: 'admissionsPrograms.ts', reg: 'ADMISSIONS_CARDS',
root: 'AdmissionsProgram', dir: 'admissionsPrograms' }`. Note the naming is *not* uniform
across existing rows (`summer-programs` uses `dir: 'summer'`), so the table is the source of
truth, not a convention.

`parseCardRegistry` is a **scoped text parse**, which constrains the registry's shape:

- spelled exactly `export const ADMISSIONS_CARDS = [`, `[` on the same line;
- card objects **flat** — the matcher is `/\{([^{}]*)\}/g` and cannot see nested braces;
- every field a **quoted string literal** — no numbers, no computed values, no templates;
- each object needs a `key` field or it is silently dropped.

Failure is fatal (`process.exit(2)`, "has the registry shape changed?"). Use the same
`as const satisfies readonly {...}[]` idiom the other registries use — that is what makes the
card-key type a literal union while still type-checking the shape.

Per-school coverage is discovered by `readdirSync` on `dir`, so **the data file's name must
equal the school slug** — `providence-day.ts`.

`npm run check:schema` is chained into `npm run build`, so a new card cannot ship with
`DATA-SCHEMA.md` left behind.

### Podcast episodes need no code change

`src/data/podcastEpisodes.ts` maps episodes to areas by a plain topic slug. If any episode
belongs to Admissions, set `researchArea: 'admissions'` on that row — no other change.
`npm run check:podcast` validates every slug against `schools.json`, which matters because a
bad slug renders nothing, identical to "no episode". Likely a no-op here; check and say so.

## Decisions

- **Registry file is `src/data/admissionsPrograms.ts`, per-school data in
  `src/data/admissionsPrograms/<slug>.ts`** — the handoff names the per-school directory;
  the registry sits beside it mirroring `summerPrograms.ts` / `summer/`. Note the two
  differ in the sibling directory's name (`summer/` vs `admissionsPrograms/`); follow the
  handoff for the directory and keep the registry's `*Programs.ts` shape.
- **PDF export uses `window.print()` and `@media print` CSS — no new npm dependency.** The
  user raised adding a PDF library; the reference design deliberately does not use one
  (`Admissions Checklist.dc.html` calls `window.print()` and hides chrome with
  `@media print`). The browser's own "Save as PDF" produces selectable text at printer DPI,
  where a canvas-based library (jsPDF/html2canvas) would rasterize the hairlines and
  checkbox squares the Industry system is built on, and add bundle weight to a repo that
  already reverted a route-split over CLS (`bundlesplit`). **If the browser check in
  Verification finds a print defect `@media print` cannot fix, raise it with the user
  rather than adding a library unilaterally** — a new dependency is its own approval.
- **Checkboxes are inert empty squares, never interactive** — the handoff is explicit that
  they are checked by hand on paper. No state, no `<input>`.
- **Band keys are `tkk` / `g15` / `g612`** — the design's own keys, so the checklist URL
  matches the reference file's `?band=` values exactly.
- **Selection state lives in the component** via `useState`, like `activeSlug` elsewhere;
  the section's band is not in the URL. Only the *checklist route* carries `?band=`.
- **Providence Day only for data.** Confirmed with the user 2026-08-30. Infrastructure is
  school-agnostic; ten schools render no section.
- **The band model supports a school with one uniform process** — a single-band entry
  renders the guide with the selector collapsed (handoff requirement). Build the type so
  this is `bands.length === 1`, not a separate shape.
- **Compare is DEFERRED — the user's call, 2026-08-30.** No `topic: 'admissions'` rows go
  into `metricValues.ts`. Because the school-page stat band reads that same array, the
  design's 4-tile band is rendered from `AdmissionsProgram.stats` instead. A later plan can
  promote those four figures into `VALUE_METRICS` to light up both surfaces at once.
- **The checklist page is English-only in Phase 1 and translated in Phase 2** like any
  other chrome + prose surface — it is not a Latest News-style exception.

## Approvals needed

**Granted 2026-08-30 by the user** — recorded here so `/implement` does not stall at step 1.
The UX-design gate covers a new topic, card, stat band and route; the user approved *as
specified in the design handoff*, then **deferred the Compare rows** in a follow-up
instruction the same day:

- New `admissions` topic, **first** in `TOPIC_ORDER`.
- Clipboard-check glyph in `TopicGlyph.tsx`.
- The *Grade-by-Grade Application Guide* deep-dive card with its band selector.
- The 4-tile stat band.
- The `/school/<slug>/admissions-checklist/` print route.
**Explicitly NOT approved / deferred:** the four Compare rows the handoff asks for
(application deadline, decision date, enrollment deposit, application fee). The user said
"hold off on that". Do not add them, and do not treat the handoff's Compare section as
still in scope.

**Still needs the user, later:** a new npm dependency (see Decisions — only if the print
path fails), and `npm run deploy`, which is never authorized in advance.

## Source material

Already written during planning — **uncommitted and uningested**:

- `source-material/admissions/providence-day/Providence Day - Admissions - Grade-by-Grade Application Plans.md`
  (312 lines). Transcribed from the user-supplied deep-research PDF, with a provenance
  header, the source URLs, both cycles' deadlines labeled by cycle, all three bands' ordered
  steps, the financial-aid timeline, tuition, policies, the full contacts roster and the
  cross-band comparison.

Source URLs it carries:

- `https://www.providenceday.org/admissions` — process, grade-level detail, live calendar,
  contacts
- `https://www.providenceday.org/admissions/tuition-and-financial-assistance` — Clarity, $65
  fee, $2,500 deposit, 21% aid figure
- `https://providenceday.myschoolapp.com` — Charger Commons portal

**Step 1 of implementation is running the `ingest-source-material` skill over it.** That
regenerates `.claude/docs/admissions/providence-day.md` and adds `admissions` to
`schools.json`.

**The cycle rule is load-bearing.** The file carries BOTH the 2025–26 and 2026–27 dates,
each labeled. **The app ships ONLY 2026–27**, the current cycle, and every date is labeled
with it. Where 2026–27 publishes no date (Grades 1–5 and 6–12 decision release), render the
known constant — `4:00 p.m.` — plus "see live calendar". **Never carry a 2025–26 date
forward as if it were current, and never guess.**

## Out of scope

- **The ten other schools' admissions data.** Infrastructure supports them; nobody
  researches them here.
- **Any change to the other seven research areas.**
- **Compare rows for Admissions** — deferred by the user 2026-08-30. `metricValues.ts` is
  untouched by this plan.
- **A new npm dependency** (see Decisions).
- **Interactive check-off state** on the checklist.
- **Deploying.** Merge and stop.

## Steps

### Phase 1 — English

Build, commit to the branch, and **STOP for the user's review of the English wording**
before touching any other locale.

1. **Branch** `feat/admissions` off an up-to-date `main`.

2. **Ingest the staged research.** Run the `ingest-source-material` skill. Confirm
   `admissions` appears in `schools.json`'s `topics`, that a `documents` row exists for
   `providence-day` / `admissions`, and that `.claude/docs/admissions/providence-day.md`
   was generated. Stage these explicitly — **never `git add -A`**; the working tree may hold
   files the user generated in parallel.

3. **Map the subtopic to a metric key** in `src/lib/metrics.ts` `RULES`. The subtopic is
   *"Grade-by-Grade Application Plans"*. Without a rule it slugifies into an accidental card
   key and `npm run check:metrics` / `DATA-SCHEMA.md` flag it ⚠️. Follow how
   `RULES['summer-programs']` folds one long research document onto a single key.

4. **`TOPIC_ORDER`** (`src/lib/metrics.ts:241`) — add `'admissions'` as the **first**
   entry, ahead of `'course-offerings'`. Add a `SECTION_ORDER` entry only if the topic ends
   up with more than one card key (it should not).

5. **`TopicGlyph.tsx`** — add an `admissions` entry to `PATHS`. The design's glyph
   (clipboard-check), transcribed from the reference file:

   ```tsx
   admissions: (
     <>
       <rect x="8" y="2" width="8" height="4" />
       <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
       <path d="m9 14 2 2 4-4" />
     </>
   ),
   ```

   The component already supplies `viewBox`, `fill="none"`, `stroke="currentColor"`,
   `strokeWidth="1.5"` and round caps — the paths alone go in `PATHS`.

6. **`src/data/admissionsPrograms.ts`** — the registry. Mirror `summerPrograms.ts`'s
   structure and its two load-bearing details (standalone `import.meta.glob`;
   English-by-reference accessor). Types to define:

   ```ts
   export type AdSource = { label: string; url?: string }

   /** One milestone tile in the band's 4-tile deadline strip. */
   export type AdDeadline = {
     /** Display value — a dated deadline ("Feb 1, 2027") OR, where the current
      *  cycle publishes none, the known constant ("4:00 p.m."). Never a guess,
      *  never a prior cycle's date. */
     value: string
     /** Caption under the value, e.g. "all materials & assessments due". */
     label: string
     /** True when `value` is a constant rather than a published date — the UI
      *  appends the "see live calendar" pointer. */
     unpublished?: boolean
   }

   export type AdStep = {
     title: string
     /** Deadline chip. `accent` renders `tag-accent` (the hard deadlines),
      *  `outline` renders `tag-outline`. */
     tag: string
     tagKind: 'accent' | 'outline'
     detail: string
   }

   /** A band-specific "watch-out" card in the right column — exactly 2 per band. */
   export type AdWatchOut = { kicker: string; text: string }

   export type AdBand = {
     /** URL/DOM key — 'tkk' | 'g15' | 'g612' for Providence Day. */
     key: string
     /** Selector label, e.g. "TK / Kindergarten". */
     label: string
     /** One-line sublabel naming what distinguishes the band. */
     sublabel: string
     /** Full title for the checklist page header. */
     title: string
     deadlines: AdDeadline[]   // 4
     steps: AdStep[]           // ordered
     watchOuts: AdWatchOut[]   // 2
     /** Band-specific callout at the top of the printable checklist. */
     checklistCallout: { lead: string; text: string }
   }

   export type AdComparisonRow = {
     label: string
     /** Per-band cells keyed by AdBand.key, OR a single `all` string for a row
      *  identical in every band (renders colspan). */
     cells: Record<string, string> | { all: string }
   }

   export type AdContact = { name: string; detail: string }

   /**
    * The one card's body. Admissions has a SINGLE card, key `guide`, so
    * `AdmissionsProgram.guide` is what `ADMISSIONS_CARDS` points at.
    *
    * `headline` is REQUIRED and load-bearing: SchoolDetail renders
    * `entry[card.key]!.headline` as the collapsed `.topic-teaser` for every
    * structured card — a hard contract the type system does not express.
    * Use the design's teaser text (Appendix A).
    */
   export type AdmissionsGuide = {
     headline: string
     /** e.g. "2026–27 entry cycle" — labels every date on the page. */
     cycle: string
     /** 4 stat-band tiles: { value, label }. */
     stats: { value: string; label: string }[]
     /** The three framing rules above the selector. */
     rules: { title: string; text: string }[]
     /** Line under the selector about the shared spine + selection factors. */
     spineNote: string
     bands: AdBand[]
     /** The financial-aid parallel strip. */
     aid: { title: string; text: string }
     comparison: { kicker: string; title: string; rows: AdComparisonRow[] }
     contacts: { kicker: string; title: string; address: string; people: AdContact[] }
     /** Checklist-page footer panels + disclaimer. */
     checklist: {
       portalNote: string
       aidPanel: { kicker: string; items: string[] }
       contactPanel: { kicker: string; lines: string[] }
       disclaimer: string
     }
     sources: AdSource[]
   }

   /**
    * The topic root. One optional card today; the shape leaves room for a
    * second without changing the accessor, exactly as SummerProgram does.
    * A school with no `guide` has no entry at all and renders no section.
    */
   export type AdmissionsProgram = {
     guide?: AdmissionsGuide
   }
   ```

   Then the card registry — **flat quoted string literals only**, per the
   `gen_data_schema.mjs` parse rule in Context:

   ```ts
   export const ADMISSIONS_CARDS = [
     {
       key: 'guide',
       title: 'Grade-by-Grade Application Guide',
       kicker: 'Which steps, which deadlines, and which test for my child?',
     },
   ] as const satisfies readonly {
     key: 'guide'
     title: string
     kicker: string
   }[]

   export type AdmissionsCardKey = (typeof ADMISSIONS_CARDS)[number]['key']
   ```

   Plus `const PROGRAMS: Record<string, AdmissionsProgram>` with **explicit named imports**
   (one per school, not a glob — `summerPrograms.ts` does this so an absent school is a
   visible absence), `loadAdmissionsOverlay(lang)`, and `admissionsProgram(slug, lang = 'en')`.

   Today `PROGRAMS` has exactly one entry, `'providence-day': providenceDay`. **Do not add
   stub entries for the other ten** — an empty entry is truthy and would render an empty
   section, which is the failure the guard in Context exists to prevent.

7. **`src/data/admissionsPrograms/providence-day.ts`** — the data, transcribed from the
   ingested source file. **Every figure char-for-char**: `$2,500`, `$65`, `Jan 2, 2027`,
   `Feb 1, 2027`, `Feb 26, 2027`, `Mar 5, 2027`, `Jan 15, 2027`, `4:00 p.m.`, the phone
   numbers, `5800 Sardis Road, Charlotte, NC 28270`. The full English strings are in
   **Appendix A** below.

8. **`src/components/AdmissionsProgram.tsx`** — the card body. Export the body component
   and the card list, mirroring `SummerPrograms.tsx`. Structure, in order:

   - Three framing rules in a 3-column grid with `--color-accent` icons.
   - Band selector: `Applying for entry at` label + one `<button>` per band, each with a
     `.bandsub` sublabel; selected via `useState`. Selected state fills
     `var(--color-accent-900)` with `var(--color-bg)` text. **Collapse the selector when
     `bands.length === 1`.**
   - `Export checklist` primary button (`btn btn-primary`) linking to the checklist route
     for the *currently selected* band.
   - `spineNote` paragraph.
   - Selected band only: the 4-tile deadline strip; then a `1.5fr 1fr` grid with the
     numbered stepper (26px square index, hairline connector, last step has no connector)
     on the left and the 2 watch-out cards on the right.
   - Financial-aid parallel strip with a `btn btn-secondary` deep-link to the school's
     Financial Aid & Tuition section (`#finaid` in the design; use the app's real anchor
     for that topic).
   - Cross-band comparison `<table className="table">`; a row whose `cells` is `{ all }`
     renders one `colspan={bands.length}` cell.
   - Contacts grid, `repeat(auto-fill, minmax(250px, 1fr))`.
   - The standard `srcrow` SOURCE footer.

9. **`src/pages/SchoolDetail.tsx`** — **six** touchpoints, all detailed in Context under
   "Five mechanical traps". Work through them as a checklist; three fail silently:

   1. **Imports** (~`:96`) — `admissionsProgram`, `loadAdmissionsOverlay`, `ADMISSIONS_CARDS`
      from the registry, and the card body from the component.
   2. **Overlay loader + destructure hole** (`:381-419`) — add `loadAdmissionsOverlay(lang)`
      to the `Promise.all`, and add a **tenth leading comma** to
      `]).then(([, , , , , , , , , ...entries]) => {`. Nine today, ten after.
   3. **The three-line guard** (~`:711`) — `adEntry` → `adCardList` (filter
      `ADMISSIONS_CARDS` on presence) → `admissions` (`undefined` when the list is empty).
   4. **`cardCount` rung** (`:718-732`) — add `admissions ? 1 :` to the nested ternary.
   5. **The substitution disjunction** (`:1022-1031`) — add
      `(t.slug === 'admissions' && admissions) ||`. **Missing this renders the card AND the
      raw prose, duplicated.**
   6. **The card JSX block** (near `:957-985`) — mirror the Summer Programs block:
      Mechanism A, its **own** `.note-cards` grid, `note-card note-card-report note-card-adm`,
      `cardTitle(tr, 'admissions', card.key, card.title)` for the title and the card's
      `headline` for the teaser.

   The stat band (step 15) renders between the topic header and this card block.

10. **`src/pages/AdmissionsChecklist.tsx`** — the printable page. Reads `slug` and `band`
    from the route, derives everything from `admissionsProgram(slug, lang)` — **no duplicated
    copy**. Layout per `Admissions Checklist.dc.html`:

    - Screen chrome (hidden with `@media print`): back link to the school's `#admissions`
      section, band tabs linking to the same route with a different `?band=`, and a
      `Print / Save as PDF` button calling `window.print()`.
    - Header: school name + band title, cycle label, portal note.
    - The band's `checklistCallout`.
    - Checkbox rows: an inert 13px empty square, bold action, one-line detail, right-aligned
      deadline. Derived from the band's `steps`.
    - Two footer panels — financial-aid clock and admissions contacts — then the disclaimer.
    - An unknown or missing `?band=` falls back to the **first** band (the reference file
      does exactly this).

11. **Route** — add the `admissions-checklist` member to `Route` in `src/lib/router.ts`,
    match it in `parsePath()` **before** the plain school branch, add a
    `toAdmissionsChecklist(slug, band)` helper emitting
    `${BASE_URL}school/${slug}/admissions-checklist/?band=${band}`, and render the page in
    `src/App.tsx` (or wherever the route switch lives — confirm) alongside the existing
    three.

12. **`scripts/seo_routes.mjs`** — decide and record whether the checklist routes are
    indexable. **Recommendation: do NOT add them to `ROUTES`.** They are a print utility
    keyed by a query parameter, they duplicate content already on the school page, and each
    school × band would multiply the sitemap. `check:seo` cannot fail on a route it was
    never told about, so this is a deliberate omission — write a one-line comment in
    `seo_routes.mjs` saying so, or the next reader reads it as a bug.

13. **`src/index.css`** — styles for the band selector (`[data-band-opt]`, `.bandsub`,
    the selected fill), the stepper, the checklist page, and the `@media print` block.
    From the design's own CSS:

    ```css
    .bandsub { display: block; font-family: var(--font-body); font-weight: 400;
      font-size: 11.5px; margin-top: 2px;
      color: color-mix(in srgb, currentColor 62%, transparent); }
    ```

    Selected: `background: var(--color-accent-900); border-color: var(--color-accent-900);
    color: var(--color-bg);`. Square corners everywhere, including the checkbox squares.
    Print CSS must hide the site nav, the checklist's own screen chrome, and use
    `@page { margin: 0 }`-safe rules so the sheet exports without browser headers. **Note
    the existing standing print rules** — `@media print` already forces
    `.note-card > .note-card-body` open and hides `.dossier-nav` (PR #71); do not regress them.

14. **`src/locales/en.json`** — every UI chrome string as a key under an `admissions.*`
    namespace: the section title, "Compare on Admissions", the selector label, "Export
    checklist", "Print / Save as PDF", "Back to Admissions research", the stat-band and
    deadline captions that are uniform across schools, and the panel kickers. **Per-school
    research prose stays in the data files** — that is the prose layer, not chrome.
    `npm run check:chrome` reads all ten catalogs and reports a key present in `en` but
    awaiting translation on a **separate exit path (exit 0)**, so Phase 1 ships green.

    Get the split right: a heading identical for every school is chrome
    (`sections.*` / `admissions.*`); a heading that varies per school is a research finding
    and stays in the data.

15. **The stat band — and NOT Compare.** The user decided 2026-08-30 to **hold off on
    Compare** for this research area. That is a deliberate deferral, not an omission.

    This is not a free cut, because of the coupling verified in Context: the school-page stat
    band and the Compare rows are **the same `VALUE_METRICS` array** filtered by topic
    (`SchoolDetail.tsx:604`). Adding rows there would put Admissions into Compare
    automatically. So:

    **Add NOTHING to `src/data/metricValues.ts` in this plan.** No `topic: 'admissions'`
    rows, no `quals`. With no rows, `valueMetricsForTopic('admissions')` returns `[]`,
    `stats.length > 0` is false, and the `.stat-strip` does not render — Admissions gets no
    Compare rows *and* no stat band from that path.

    **Render the design's 4-tile stat band from the topic's own data instead.**
    `AdmissionsProgram.stats` (already in the step-6 type: `{ value, label }[]`) carries the
    four tiles, and the component renders them with the same `.stat-strip` / `.stat-tile`
    classes so they are visually identical to every other topic's band. Providence Day's
    four, from the design:

    | value | label |
    |---|---|
    | `3` | grade bands, each with its own process |
    | `Jan 2, 2027` | TK/K application deadline — earlier than everyone else |
    | `Jan 15, 2027` | Grades 1–12 application deadline |
    | `$2,500` | enrollment deposit, credited toward tuition |

    Run each value through `localizeMoneyText()` at render, exactly as `SchoolDetail.tsx:779`
    does — a date passes through unchanged, and `$2,500` must localize like every other
    figure on the page. Skipping it is the defect class the French print-out caught.

    **Where the band renders matters.** `SchoolDetail`'s own `.stat-strip` sits between the
    topic header and the cards (`:766-783`). Render the Admissions band in the same position
    — either from `SchoolDetail` beside the existing strip, or as the first element of the
    section's structured block. Do not nest it inside the `<details>` card; the design has it
    outside, above the card.

    **Trade-off, recorded so it is a decision and not a surprise:** the four figures live
    only in `admissionsPrograms/providence-day.ts` rather than in the shared metric layer, so
    a later "add Admissions to Compare" plan will need to move or duplicate them into
    `VALUE_METRICS`. That is a small, well-understood follow-up; the alternative — adding the
    rows now — would ship the Compare surface the user just deferred.

16. **Regenerate the schema doc**: `npm run schema`, then `npm run check:schema`. Never
    hand-edit `DATA-SCHEMA.md`.

17. **Commit, push, open the PR** — `--body-file`, never a heredoc. Verify the push landed
    (`git rev-parse HEAD` vs `git ls-remote origin feat/admissions`); `git push` has
    silently no-op'd in this repo.

18. **STOP.** Report to the user that English is shipped and wait for their review of the
    wording before Phase 2. Set the plan's `status: english-done`.

### Phase 2 — the other nine locales

Only after the user confirms the English wording.

19. **UI chrome** — add every `admissions.*` key to the other nine `src/locales/*.json`
    catalogs. Read `TRANSLATED` in `src/lib/i18n.ts` for the live list rather than assuming
    a count.

20. **Research prose** — the overlay layer, per `PROSE_TRANSLATED`. Register `admissions` in
    `scripts/i18n_topics.mjs`, which is the **single source of truth** for `TOPICS` /
    `ACCESSORS` / `EXTRA_LAYERS` / `EXPORTS` / `SLUGS` — imported by the extractor and all
    three checkers. **Never re-declare any of them locally.**

    `TOPICS` maps topic slug → per-school data directory (verified
    `i18n_topics.mjs:41-53`), so the entry is:

    ```js
    admissions: 'admissionsPrograms',
    ```

    Note the existing comment there explaining why Summer uses `'summer'` rather than
    `'summerPrograms'` — the doubled word read badly. `admissionsPrograms` has no such
    doubling, so it stays as-is and matches the handoff's directory name.

    **Never add `admissions` to `FOREIGN_TOPICS`** in `check_live_resolution.mjs` (today it
    holds exactly one entry, `'financial-aid-tuition.content'`). Every shipped overlay topic
    must be accounted for by **exactly one** of `TOPICS` or `FOREIGN_TOPICS` — being in both
    is a contradiction and fails the build. If `check:live` goes red on Admissions, the fix
    is the overlay or the wiring, never an allowlist entry.

    Follow the rollout mechanism in `.claude/docs/prose-translation-architecture.md`;
    `prose-translation-bn.md` (non-Latin) and `prose-translation-ht.md` (Latin) are the
    worked examples. Do not copy Italian's process — it shipped without a rollout doc.

21. **The locale traps the rollout docs already record** — do not re-derive them:
    - **Figures are copied char-for-char and NEVER re-typed** — `$2,500`, `Jan 15, 2027`,
      `4:00 p.m.`, `704-887-6002`. Units are never converted.
    - `hi` / `te` regroup lakh/crore **at render**, so the data must store the English
      3-3-3 figure.
    - `fa` / `ar` are RTL: bidi-neutral figures get LRI…PDI isolates at render; overlays
      store **no** isolate characters.
    - Percent signs stay unspaced in every locale.
    - **Identifiers that look like prose**: `WPPSI-IV`, `ISEE`, `TOEFL`, `Charger Commons`,
      `Clarity`, `TBI-New Oasis`, `I-20` are searchable identifiers and stay in English —
      this is exactly the French `check:fr` leak shape, in a topic full of them.
    - **A sentence wearing an identifier's clothes** is the recurring leak: watch the
      comparison-table cells, the deadline-strip captions and the contact `detail` lines,
      where a short label passes for a code. `Required — instrument not published` and
      `4:00 p.m. release — see live calendar` are **prose** and must translate.

22. Build the overlays, then run the full check suite (below), then commit into the **same
    PR** and merge.

## Verification

### Phase 1

```bash
npx tsc -b                 # NOT --noEmit; trust the build's exit code
npm run build              # chains check:schema, check:seo, check:live, check:runtime
npm run check:metrics      # no unmatched admissions subtopic (⚠️ in DATA-SCHEMA.md)
npm run check:schema
npm run check:seo          # canonical/sitemap agree after the TOPIC_ORDER change
npm run check:chrome       # admissions.* present in en; other nine reported, exit 0
npm run check:podcast      # only if any episode was re-pointed to 'admissions'
```

`check:quals` is **not** needed — this plan adds no `quals`, because it adds no
`VALUE_METRICS` rows.

**Browser check — required, not a formality.** Every defect in this repo found after the
data read 100% has been render-layer, and this change is almost entirely render layer.
Use Playwright (there is no chromium-cli here):

1. `/school/providence-day/` — Admissions is the **first** section, above Course Offerings.
   The rail, the header chips and the Home topic grid all show the clipboard-check glyph.
2. Click all three band options — the deadline strip, stepper and both watch-out cards
   swap; the selected button fills accent-900.
3. Open a school with no admissions data (e.g. `davidson-day`) — **no Admissions section at
   all**, and nothing else on the page shifted.
4. `Export checklist` opens `/school/providence-day/admissions-checklist/?band=tkk`; the
   band tabs switch bands; a bogus `?band=zzz` falls back to the first band.
5. **Print the checklist to PDF from a real browser** for all three bands. Confirm: one
   US-letter page, no browser header/footer, no screen chrome, empty square checkboxes,
   right-aligned deadlines, both footer panels and the disclaimer present. This is the step
   that decides whether the no-library decision holds.
6. **Print `/school/providence-day/` itself** with panels expanded, and confirm the
   Admissions deep-dive prints **open** rather than as a collapsed teaser — the print-path
   defect class from PR #71.
7. `/compare/` — confirm Admissions is **absent** from the topic list's data rows, and that
   the page still renders correctly with `admissions` as the pre-rendered default `?topic=`
   (see the risk table). If an empty Admissions column looks broken to a reader, say so in
   the PR rather than fixing it by adding rows the user deferred.
8. The topic header still shows **"Compare on Admissions"** and the link works — that button
   is part of the shared section shell and is not affected by the deferral.

### Phase 2

```bash
npm run check:runtime
npm run check:live
npm run check:chrome                       # now green in all ten catalogs
npm run check:sepdrift -- --lang es        # and each other locale
python3 scripts/check_figures.py --topic admissions
npm run check:fr
npm run build
```

Then a **browser print-out of two schools** — the standing rule is Charlotte Latin plus
Providence Day, but only Providence Day has admissions data, so print Providence Day in
**`fa` (RTL)** and one Latin-script locale, with panels expanded, and confirm the figures
and the checklist sheet render correctly in both directions.

## Risks

| Risk | Why it matters | Mitigation |
|---|---|---|
| `TOPIC_ORDER` change ripples further than expected | It drives the rail, chips, Home grid, section order, **and** the pre-rendered `/compare/` default topic via `seo_routes.mjs` | Step 12 + `check:seo`; browser-check the Home grid and `/compare/` explicitly |
| The new route breaks `/school/<slug>/` | `parsePath()` matches `segs[0] === 'school' && segs[1]` — an unordered branch swallows the checklist URL | Match the 3-segment case first; browser-check both URLs |
| Print output carries browser chrome | The whole export feature depends on it | Step 5 of the browser check, on a real browser, all three bands |
| A 2025–26 date ships as current | The source file carries both cycles | Only 2026–27 in the data; `unpublished: true` + the known constant where the current cycle publishes none |
| Overlay silently falls back to English | A guarded `import.meta.glob`, or a stamp mismatch | Copy `summerPrograms.ts` verbatim; `check:live` + `check:runtime`; verify in a browser, never from source alone |

## Appendix A — Providence Day English strings

Transcribed from the design file and the ingested research. Figures are char-for-char.

**Stat band:** `3` / "grade bands, each with its own process" · `Jan 2, 2027` / "TK/K
application deadline — earlier than everyone else" · `Jan 15, 2027` / "Grades 1–12
application deadline" · `$2,500` / "enrollment deposit, credited toward tuition"

**Card title:** "Grade-by-Grade Application Guide — TK/K · 1–5 · 6–12"

**Teaser:** "Pick your child's entry point and the guide personalizes: the steps in order,
the 2026–27 deadlines, and the testing for that band — plus a printable checklist to take
with you. The financial-aid clock runs in parallel."

**Framing rules:**
- *One portal.* "Everything runs through Charger Commons: the inquiry triggers your account
  invitation, and the portal generates a personalized checklist that tracks every step."
- *Dates are cycle-specific.* "Every date below is the 2026–27 entry cycle from the live
  admissions calendar. Cycle dates shift year to year — verify before acting."
- *Not published ≠ deficient.* "The application-fee amount and some band checklists aren't
  on the website. Those gaps are flagged below — confirm them with the admissions office."

**Spine note:** "Same spine in every band — inquire → apply → materials → decision →
contract. What changes is the testing and the calendar. Selection weighs \"academic
performance, school records, teacher recommendations, extracurricular activities, and
social-emotional maturity.\""

**Bands (selector label / sublabel):**
- `tkk` — "TK / Kindergarten" / "Readiness model · earlier calendar"
- `g15` — "Grades 1–5" / "School-administered assessment"
- `g612` — "Grades 6–12" / "Standardized testing (ISEE)"

### Band `tkk` — deadlines
`Jan 2, 2027` "application form due" · `Feb 1, 2027` "all materials & assessments due" ·
`Feb 26, 2027` "decisions release, 4:00 p.m." · `Mar 5, 2027` "contracts due at noon"

### Band `tkk` — steps
1. **Inquire & tour** · `Fall 2026` (outline) — "The Inquiry form books your campus tour and
   triggers the invitation to create your Charger Commons account."
2. **Submit the TK/K application + fee** · `by Jan 2` (accent) — "Apply early — the Readiness
   Screening can't be scheduled until the application is in, and the earliest applicants get
   the earliest slots. Fee amount isn't published; confirm with admissions."
3. **Preschool Teacher Recommendation Form** · `by Feb 1` (outline) — "Sent to your child's
   current teacher through the portal checklist."
4. **WPPSI-IV assessment** · `by Feb 1` (outline) — "The Wechsler preschool scale. Your child
   \"must be at least 4 years old at the time of assessment administration.\""
5. **School Readiness Screening** · `by Feb 1` (outline) — "\"Application MUST be submitted
   prior to scheduling the Readiness Screening\" — the sequencing quirk that makes step 2
   urgent."
6. **TK/K Classroom Visit** · `by Feb 1` (outline) — "A required visit — the school observes
   readiness in a real classroom setting."
7. **Decision → contract + deposit** · `Feb 26 → Mar 5` (accent) — "Decisions release 4:00
   p.m. Feb 26; the signed contract and $2,500 deposit (credited toward tuition) are due at
   noon Mar 5. Later applications go to rolling review for remaining seats."

### Band `tkk` — watch-outs
- *Why TK/K is different* — "The youngest band runs on an **earlier calendar** than everyone
  else and uses a **readiness model** — WPPSI-IV, Readiness Screening, and Classroom Visit —
  instead of standardized testing. Three assessment pieces means three appointments to
  schedule: another reason the early application matters."
- *Age eligibility* — "The school publishes one rule: applicants must be **at least 4 at the
  time of assessment**. A specific \"turn 4/5 by September 1\" cutoff isn't published —
  confirm your child's eligibility with admissions before applying."

### Band `g15` — deadlines
`Jan 15, 2027` "application form due" · `Feb 26, 2027` "all materials & assessments due" ·
`4:00 p.m.` "decision release time — date on the live calendar" *(unpublished)* · `$2,500`
"deposit with the contract, credited to tuition"

### Band `g15` — steps
1. **Inquire & tour** · `Fall 2026` (outline) — as `tkk` step 1.
2. **Submit the Grades 1–5 application + fee** · `by Jan 15` (accent) — "First-round
   consideration closes Jan 15; later applications roll for remaining seats. Fee amount isn't
   published; confirm with admissions."
3. **Records & teacher recommendation** · `by Feb 26` (outline) — "School records/transcript
   and the recommendation form, both handled through the portal checklist — the exact items
   for this band aren't published, so treat the portal as definitive."
4. **Required assessment** · `by Feb 26` (outline) — "An assessment step exists for Grades
   1–5, but the specific instrument isn't published — ask admissions which assessment your
   child will take and how to schedule it."
5. **Decision → contract + deposit** · `Spring 2027` (accent) — "First-round decisions release
   at 4:00 p.m. on the published date — watch the live calendar. Then the signed contract and
   $2,500 deposit secure the seat."

### Band `g15` — watch-outs
- *The least-published band* — "Grades 1–5 shares the Grades 1–12 calendar, but its
  **material list, recommendation form, and assessment instrument aren't published**. Your
  Charger Commons checklist is the authoritative list — and if you need a definitive answer
  before applying, request it from admissions in writing."
- *No student-visit step published* — "Unlike TK/K's required Classroom Visit, no comparable
  shadow day or visit is published for this band. That doesn't mean there isn't one — it
  simply wasn't retrievable. Ask on your tour."

### Band `g612` — deadlines
`Jan 15, 2027` "application form due" · `Feb 26, 2027` "all materials & testing due" ·
`4:00 p.m.` "decision release time — date on the live calendar" *(unpublished)* · `$2,500`
"deposit with the contract, credited to tuition"

### Band `g612` — steps
1. **Inquire & tour** · `Fall 2026` (outline) — as `tkk` step 1.
2. **Submit the Grades 6–12 application + fee** · `by Jan 15` (accent) — "First-round
   consideration closes Jan 15; later applications roll for remaining seats. Fee amount isn't
   published; confirm with admissions."
3. **Transcript & recommendations** · `by Feb 26` (outline) — "Submitted through the portal
   checklist. The specific recommendation forms for this band aren't published — the portal
   shows exactly which ones your child needs."
4. **Standardized testing** · `by Feb 26` (outline) — "The ISEE is the test the school
   references. Register early enough to sit the test — and receive scores — before the
   materials deadline."
5. **Decision → contract + deposit** · `Spring 2027` (accent) — as `g15` step 5.

### Band `g612` — watch-outs
- *Which test, exactly?* — "Standardized testing is required, and the ISEE is the only test
  the school names — but the exact domestic requirement (ISEE vs. SSAT, which level)
  **isn't published**. Confirm with admissions before booking a test date."
- *International applicants* — "Applicants outside China follow the grades 9–12 procedures
  and submit **ISEE scores plus TOEFL** (if English isn't the primary language). Applying
  from China and needing an I-20? The process begins with the school's partners at
  **TBI-New Oasis**."

### Financial-aid strip
"Running in parallel: the financial-aid clock" — "Clarity application ($65) due **Jan 22**
for prospective families — complete both processes on time and the aid decision arrives
inside the Enrollment Agreement. Applying for aid never influences admission; separate
committees decide." Button: "Financial Aid & Tuition".

### Cross-band comparison — `CROSS-BAND` / "Exactly what changes between bands"

| | TK / Kindergarten | Grades 1–5 | Grades 6–12 |
|---|---|---|---|
| Application due | Jan 2, 2027 | Jan 15, 2027 | Jan 15, 2027 |
| Materials due | Feb 1, 2027 | Feb 26, 2027 | Feb 26, 2027 |
| Assessment | WPPSI-IV + Readiness Screening + Classroom Visit | Required — instrument not published | Standardized testing — ISEE referenced |
| Recommendation | Preschool Teacher Recommendation Form | Via portal checklist — form not published | Via portal checklist — forms not published |
| Decision & contract | Feb 26 → contracts Mar 5, noon | 4:00 p.m. release — see live calendar | 4:00 p.m. release — see live calendar |
| After first round | *(colspan 3)* Rolling review for remaining seats at each grade level — identical in every band |

### Contacts — `CONTACTS` / "The admissions office"
Address line: "5800 Sardis Road, Charlotte, NC 28270 · main 704-887-6000"

| Name | Detail |
|---|---|
| Lisa Knight | Asst. Head of School, Admissions & Enrollment · 704-887-6002 |
| Jennifer Newcombe | Associate Director of Admissions · 704-887-7015 |
| James Garland | Associate Director of Admissions · 704-887-6029 |
| Carissa Goddard | Asst. Director of Enrollment Management · 704-887-7057 |
| Ron Johnson | Admissions Officer · 704-887-7511 |
| Ellen Teyssier | Admissions Officer · 704-887-7097 |
| Blair Roberts | Admissions Services Manager · 704-887-7040 |
| En español: Claudia Trower | Dir. of Student Billing, Financial Aid & Accounting · 704-887-7023 |

### SOURCE row
"Source: providenceday.org admissions pages and the live 2026–27 admissions calendar,
retrieved Aug 2026. Waitlist, sibling/legacy, transfer, and mid-year policies aren't
published on the pages reviewed — confirm directly with admissions."

## Appendix B — the printable checklist

**Header kicker:** "Charlotte School Compare · Admissions checklist"
**Title:** "Providence Day School — <band title>", where band titles are "Transitional
Kindergarten & Kindergarten" / "Grades 1–5" / "Grades 6–12".
**Right rail:** "2026–27 entry cycle" · "Portal: Charger Commons · providenceday.org"

**Band callouts:**
- `tkk` — **Apply early.** "The Readiness Screening cannot be scheduled until the application
  is submitted — the earliest applicants get the earliest assessment slots, and review turns
  rolling after the first round."
- `g15` — **Portal is definitive.** "The exact material list and assessment for Grades 1–5 are
  not published on the website — your Charger Commons checklist is the authoritative list.
  Confirm specifics with the admissions office."
- `g612` — **Testing note.** "Standardized testing is required; the ISEE is the test the school
  references. The exact domestic requirement is not published — confirm with admissions.
  International applicants: ISEE + TOEFL (if English is not primary); from China with an
  I-20, begin via TBI-New Oasis."

**Checkbox rows** derive from the band's steps. The reference sheet's TK/K rows carry
right-aligned deadlines `Fall 2026`, `Fall 2026`, `Jan 2, 2027`, `Feb 1, 2027`, `Feb 1,
2027`, `Feb 1, 2027`, `Feb 1, 2027`, `Feb 26, 2027`, `Mar 5, 2027` — note the checklist
splits "Inquire" and "Create your Charger Commons account" into two rows where the section's
stepper merges them, so the checklist step list is its own ordered array derived from the
same band, not a blind copy of `steps`.

**Footer panel 1** — "In parallel — the financial aid clock":
- "Complete the **Clarity** financial-aid application ($65 fee) by **Jan 22** — both
  custodial and non-custodial parents submit documentation."
- "Complete both processes on time and any aid decision arrives **inside the Enrollment
  Agreement**. Applying for aid does not influence admission."

**Footer panel 2** — "Questions — admissions office":
"Lisa Knight, Asst. Head of School for Admissions — 704-887-6002" / "Admissions main —
704-887-6000 · 5800 Sardis Road, Charlotte, NC 28270" / "En español: Claudia Trower —
704-887-7023"

**Disclaimer:** "Dates are the 2026–27 entry cycle as published on the providenceday.org
admissions calendar (retrieved Aug 2026); cycle dates shift year to year — verify against the
live calendar before acting. Items marked \"confirm\" are not published on the website.
Compiled by Charlotte School Compare; not affiliated with Providence Day School."
