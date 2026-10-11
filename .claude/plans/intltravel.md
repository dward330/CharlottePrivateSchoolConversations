---
name: intltravel
title: Add an International Travel research area (after Course Offerings) — seven structured cards, Providence Day populated
status: english-done
phases: 2
created: 2026-10-11
branch: feat/intltravel
prs: []
---

# International Travel research area

## Goal

Add **International Travel** as a new research area on school dossiers. It sits **directly
after Course Offerings** in the section order, header chip row and side rail. Its
section holds a lead line, a 4-cell stat strip and **seven structured cards** in a fixed
parent-priority order:

1. Where They Go
2. When Your Child Can Start
3. Exchanges & Homestays
4. the school's credential
5. the school's network
6. Signing Up
7. Verdict & Ask the School

Only Providence Day is populated, from the user's deep-research PDF, with a source URL for
every fact. It works when Providence Day's dossier renders the section matching the design
reference, reflows cleanly at 390px with every card open, and is absent from Compare and
from every other school's page.

## Context

**Design reference (the approval, and the spec).** This area was requested by the user
through a Claude Design handoff. Per CLAUDE.md's UX standard the handoff *is* the
approval. It comes from project `5da24575-40bf-4787-8934-0fadfc56059f`, *Charlotte School
Compare Website Design*.

**The Claude Design source of truth.**
- **Project:** https://claude.ai/design/p/5da24575-40bf-4787-8934-0fadfc56059f
- **MCP:** `claude-design` (https://api.anthropic.com/v1/design/mcp; if it returns 403,
  re-auth with `/design-login`).
- **Tools:** `mcp__claude-design__list_files` / `read_file` with
  `project_id: "5da24575-40bf-4787-8934-0fadfc56059f"`. They are deferred, so load them via
  `ToolSearch "select:mcp__claude-design__list_files,mcp__claude-design__read_file"`.

| Design file | etag when copied (2026-10-11) | Local copy |
|---|---|---|
| `International Travel Section Redesign.dc.html` | `1791758016363725` | `intltravel-data/International Travel Section Redesign.dc.html` |
| `Providence Day School.dc.html` (the `#travel` section, lines 751–1081; script `tvTrips()`/`tvVals()` ~3820–3866) | `1791758016363725` | `intltravel-data/Providence Day School.dc.html`, `pd-travel-section.html`, `pd-travel-script.js` |
| `international-travel-handoff-instructions.md` | `1791758016363725` | `intltravel-data/handoff-instructions.md` |
| `_ds/industry-ff3418ab-b7c3-4c24-aa94-1755d044fdea/styles.css` | `1784804302102356` | `intltravel-data/industry-ds-excerpt.css` (excerpt) |

**When `/implement` must consult Claude Design** (otherwise the local copies suffice):
1. **At step 1, check for designer edits since planning.** Call `list_files` (depth 1) and
   compare the three `etag`s above. If any changed, `read_file` that file, diff it against
   the local copy, and treat the **live design** as the spec. The user may have revised it
   after this plan was written. Refresh the local copy in `intltravel-data/` and note what
   changed in Implementation notes. If the MCP is unreachable, proceed on the local copies
   and say so in the PR body.
2. **When a visual detail is ambiguous** in the local copies (spacing, tag variant, the
   order of a sub-block), re-read the live file rather than guessing.
3. **Before the Phase 1 stop:** optionally render the design for a side-by-side check
   against the built section. `mcp__claude-design__render_preview` on
   `Providence Day School.dc.html`, scrolled to `#travel`.

**Never write to the Claude Design project from `/implement`.** It is the user's design
space, and this plan only reads it.

**Where the design and this plan disagree, this plan wins.** These are deliberate
decisions, each recorded under Decisions:
- the placement after Course Offerings;
- no Compare button;
- no `1a ·` kickers;
- real photos and URLs instead of placeholders;
- the URL-verification corrections to the PD copy.

Local copies of everything needed:

| File | What it is |
|---|---|
| `.claude/plans/intltravel-data/pd-travel-section.html` | **The finished Providence Day `#travel` section** from `Providence Day School.dc.html` (lines 751–1081 of that file). This is the per-element spec: every card, every sub-block, the exact PD copy. |
| `.claude/plans/intltravel-data/pd-travel-script.js` | The design's `tvTrips()` / `tvVals()` — the trip-ledger data and the division-filter logic. |
| `.claude/plans/intltravel-data/International Travel Section Redesign.dc.html` | The section-level redesign canvas (structure reference). |
| `.claude/plans/intltravel-data/handoff-instructions.md` | The designer's handoff note (structure, card order, data rules, design). |
| `.claude/plans/intltravel-data/Providence Day School.dc.html` | The whole PD dossier design (4,028 lines), for context around the travel section: the chip at line 143, the rail item at 192, the section at 751, the CSS at 58-59. |
| `.claude/plans/intltravel-data/industry-ds-excerpt.css` | The Industry design-system rules this markup uses that `src/index.css` lacks (`.tag` base, `.text-muted`, `.blueprint`, `.duotone`). Reference for mapping, not for pasting. |

**Not copied, deliberately:**
- `_ds_bundle.js`, `support.js`, `image-slot.js` and `site-i18n.js` are the design
  canvas's runtime (the `<x-dc>` / `sc-for` / `image-slot` engine and its mock i18n),
  not app code.
- `public/logo.png` and `public/logos/providence-day.png` already ship in this repo.

Two CSS rules from the design file's `<style>` matter as well:
`#travel details.topic[open] { grid-column: 1 / -1; }` (an open card spans the full grid)
and `#travel .depttab { min-height: 40px; }` (tap-size filter tabs).

**How a research area is wired today.** All paths were verified at `7ef70c01`.

- **The manifest is generated.** `src/data/schools.json` is built by
  `.claude/skills/ingest-source-material/build_docs.py` from `source-material/<topic>/<school>/`.
  Display names come from `TOPIC_NAMES` (build_docs.py:28-36).
- **Section order** comes only from `TOPIC_ORDER` in `src/lib/metrics.ts:328-345`, applied
  by `orderTopicSlugs()`. There is no per-page section list.
- **The chip row** (`src/pages/SchoolDetail.tsx:593-627`) and **side rail**
  (`aside.dossier-nav`, :678-736) both map `covered = topicsForSchool(slug)` (:379). A
  topic present in the manifest therefore gets its chip and rail item automatically.
- **Sections render** as `<section id={`topic-${slug}`} className="topic-section">`
  (:962). The anchor is `#topic-international-travel`, **not** the design's `#travel`.
- **A school with no `source-material/international-travel/<slug>/` folder gets no
  chip, rail item or section.** `topicsForSchool()` (`src/lib/manifest.ts:86-88`) filters
  on `docCount > 0`. This is the repo's "absence of data, never a conditional" rule.
- **The nearest analogue** is a full-substitution structured area: Summer Programs
  (`src/data/summerPrograms.ts` + `src/data/summer/<slug>.ts` +
  `src/components/SummerPrograms.tsx`) and Admissions (`src/data/admissionsPrograms.ts`
  + `admissionsPrograms/<slug>.ts`).
- **Admissions is the closer match** on three counts:
  - it renders its **own stat band from topic data** rather than `VALUE_METRICS`
    (`AdmissionsStatBand`, SchoolDetail.tsx:1041-1043), which is exactly what keeps it
    off Compare;
  - it has **per-school card titles** (`TITLE_OVERRIDES` + `admissionsCardTitleFor` +
    `titleOverrideSlug`, admissionsPrograms.ts:245-309, resolved through
    `cardTitle(tr, topic, key, fallback, overrideSlug)` in `src/lib/labels.ts:120`, which
    reads `cards.<topic>.<key>@<slug>`);
  - it was explicitly kept off Compare.
- **SchoolDetail touch points for a structured area:**
  - imports (:117-132);
  - the overlay loader in the `Promise.all` (:485-499), whose destructure **holes**
    (:517) must equal the loader count;
  - the entry/cardList/guard idiom (:916-940);
  - the `cardCount` ternary (:942-960);
  - the render block (summer :1263-1291, admissions :1299-1325);
  - **the substitution disjunction (:1364-1374)**. Leave it out and the ingested prose
    renders below the cards a second time.
- **Compare is NOT automatically excluded.** `comparableTopics` (manifest.ts:108-110) keeps
  any topic held by a high-school school, and Providence Day is one. Without a change, the
  topic would surface in three places:
  - as a Compare pill (`src/pages/Compare.tsx:294-298, 326-328`);
  - as a cell on the home "What you can compare" grid (`src/pages/Home.tsx:32-36`);
  - as a "Compare on International Travel" button in the section head (SchoolDetail.tsx:992-1000,
    gated only by `comparable`).

  `.claude/plans/compare-no-hsp.md` is the template for a Compare exclusion.
- **Compare meta description** (`src/lib/head.ts:184-186`) lists `topicList(3)` over the
  global `topics`. With travel at position 3 it would read *"admissions, course offerings,
  international travel"* on a page that does not show travel.
- **The school meta description** (head.ts:127-132) for Providence Day becomes "…admissions,
  course offerings, international travel and more…". That is 156 chars, under
  `DESC_MAX=160`, and `check:seo` enforces it. Other schools are unchanged.
- **The Industry design system as the app already carries it.**
  - The `.dc.html` uses `details.topic.blueprint`, `.duotone`, `.rich`, a bare `.tag`,
    `.btn-secondary` and `.text-muted`. **None of these exist in `src/index.css`**, and
    comments there say `.blueprint`/`.duotone` were deliberately not ported.
  - Every earlier Industry handoff was translated onto the app's own equivalents, which
    is what "keep the Industry design-system markup" means in this repo. The equivalents
    are:
    - `details.note-card.note-card-report` / `.note-card-head` / `.topic-title` /
      `.topic-teaser` / `.plusmark` / `.note-card-body`
    - `.depttab[data-active]` (index.css:2681, mobile :2828)
    - `.tag-neutral` / `.tag-outline` / `.tag-accent` (:1592-1630)
    - `SourceRow` (`src/components/SourceRow.tsx:104`, `Source = {label, url?}`), which
      renders `.srcrow`
    - `.stat-strip` / `.stat-tile`
    - `--brand`
- **Photos.** The design's two `<image-slot>` placeholders hold **no real photo**. There is
  no PD travel photo in the repo. If one is added later, the pattern is `public/<dir>/*.jpg`
  + `assetUrl()` + `PhotoZoomButton` + `<PhotoViewer>` (see `SummerPhotoBand`,
  SummerPrograms.tsx:182-210). The `check:photos` build gate fails on any bare `<img>`.
- **i18n.**
  - `scripts/i18n_topics.mjs` is the single source of truth for topic → data dir
    (`TOPICS` :42-66; `EXPORTS` already maps `providence-day` → `providenceDay`).
  - Leaf keys must be classified in `scripts/i18n_fields.mjs` (`PROSE_KEYS` :27,
    `SKIP_KEYS` :189, `PATH_OVERRIDES` :307), or `--residual` reports them unclassified.
  - Overlays live at `src/data/overlays/<topic>.<lang>.json`.
  - `PROSE_TRANSLATED` (src/lib/i18n.ts:182) has 9 locales: ar bn es fa fr hi ht it te.
  - `TRANSLATED` (:108) has those 9 plus `en`.
- **Generated docs.** `scripts/gen_data_schema.mjs` `STRUCTURED` (:221-233) parses each
  `*_CARDS` registry from source; it does not import it. `npm run schema` /
  `check:schema` (the latter is in the build).

**Prior plans that are the checklist:**
- `.claude/plans/summer-programs.md` ("Files touched" + implementation notes)
- `.claude/plans/admissions.md` (Compare deferral; "five mechanical traps")
- `.claude/plans/prek8shape.md` (index.css + schema STRUCTURED entry)
- `.claude/plans/compare-no-hsp.md` (Compare exclusion + its `dist/compare` grep check)

Read the summer and admissions ones before step 1.

## Decisions

- **Placement: immediately after `course-offerings` in `TOPIC_ORDER`.** The user said so
  explicitly. The designer's handoff note says "after Summer Programs / before Financial
  Aid, or wherever research areas are ordered"; the user's instruction wins.
- **"Every school dossier" means the area exists app-wide, but only Providence Day renders
  it.** The user said to populate only Providence Day and never to render empty or
  placeholder cards. Under the repo's absence-of-data rule, the other 11 schools have no
  folder and therefore no chip, no rail item and no section. Each gains the area the day
  its research lands. No "not yet researched" shell is added.
- **Slug `international-travel`; data dir `src/data/internationalTravel/`; registry
  `INTERNATIONAL_TRAVEL_CARDS` in `src/data/internationalTravel.ts`; component
  `src/components/InternationalTravel.tsx`.** This follows the summer/admissions naming.
- **Card keys, in order:** `trips`, `start`, `exchanges`, `credential`, `network`,
  `signup`, `verdict`. The order is fixed by the registry. Each key is optional on a
  school's data. A missing key drops that card, and with it any stat-strip cell built
  from it. Order never changes.
- **Card titles.**
  - Five are constant chrome:
    - `cards.international-travel.trips` = "Where They Go"
    - `.start` = "When Your Child Can Start"
    - `.exchanges` = "Exchanges & Homestays"
    - `.signup` = "Signing Up"
    - `.verdict` = "Verdict & Ask the School"
  - `credential` and `network` are retitled **per school**, using Admissions'
    `TITLE_OVERRIDES` mechanism. The registry fallback titles are "Credential" and
    "Network". Providence Day overrides them to "The Global Studies Diploma" and
    "Round Square & the Wider Network", with catalog keys
    `cards.international-travel.credential@providence-day` and `…network@providence-day`.
    The repo's memory records that `TITLE_OVERRIDES` needs catalog keys. A school with no
    credential or network simply omits the key, and the card is dropped.
- **No card kickers.** The design shows `1a · Where They Go`, but CLAUDE.md forbids card
  kickers. Titles only.
- **The section head has no Compare button**, gated by the new Compare exclusion
  (below). The design's "Compare on International Travel" button is dropped because the
  user deferred Compare.
- **Compare exclusion: a named set, not a slug check scattered across files.**
  - Add `export const COMPARE_DEFERRED_TOPICS = new Set(['international-travel'])` in
    `src/lib/manifest.ts`, ANDed into `comparableTopics`.
  - Gate the section-head Compare button on
    `comparable && !COMPARE_DEFERRED_TOPICS.has(t.slug)`.
  - Point the Compare meta description at `comparableTopics` instead of `topics`.
  - When Compare is wanted later, delete the entry.
- **Stat strip from topic data, never `VALUE_METRICS`.** This follows the admissions
  precedent: adding `metricValues.ts` rows would feed the Compare Key Stats rows the user
  deferred. It renders with the same `.stat-strip`/`.stat-tile` classes. Each cell is
  `{ value, label, note? }`. The PD cells are copied from the design:
  - ~19 countries & territories (our count)
  - 8 exchange partner schools
  - 1st Global Studies Diploma (the school's claim)
  - 280+ Round Square schools
- **The PDF is a lead sheet, not evidence.** The user confirmed (2026-10-11) that the
  deep-research PDF was **generated by Claude**. It is therefore treated as an
  AI-generated summary. Its claims, including the design file's PD copy (which was built
  from it), reach the app **only after being confirmed on a live page**, normally
  providenceday.org, the school's GSD Google site, or roundsquare.org for Round Square's
  own facts. That page's URL is the citation. Any quoted wording ("Inward. Outward.
  Forward.", "first in the nation", "250", "325") must match the live page exactly,
  because an AI summary can paraphrase inside quote marks. If the live page differs, the
  live page wins and the difference is noted in Implementation notes. This follows the
  standing "school's own site is the authority" rule.
- **A source URL for every fact, recorded at two levels.**
  1. Each card ends with a `SourceRow` listing **every URL that supports a fact in that
     card**. The design's generic `https://www.providenceday.org` placeholder links are
     **replaced** by the real per-page URLs.
  2. The committed fact→URL map lives in
     `source-material/international-travel/providence-day/Providence Day - International Travel - Source URLs.md`.

  A fact with no URL found is **not rendered**. It is either dropped, or turned into an
  "Ask on the tour" question if a parent would care. This is the hard rule; see the
  checklist in step 5.
- **Gaps go only to the Verdict card's "Ask on the tour" checklist.** No "Not stated",
  "not published" or "Not stated by PD" text appears in cards 1–6. Trip rows simply omit
  timing and homestay tags when the source doesn't state them. Example: the Dubai row's
  timing comes from Round Square's own write-up, so it is cited to roundsquare.org rather
  than labelled "not stated by PD". This matches the design.
- **Where sources conflict, show the range and say so:**
  - "250–325+ graduates — school pages give different totals"
  - GSD first graduates "2005 or 2007"
  - Round Square membership: one page says "only school member in North Carolina", the
    other "one of only two Round Square schools in North Carolina". Rendered as "one of
    the only Round Square schools in North Carolina — school pages differ (one or two)",
    or dropped.

  Our own tallies are labelled ours: "our count from the school's Global Map".
- **Photos: Providence Day has a real photo for both slots.** Both come from the school's
  own admissions page (https://www.providenceday.org/admissions/why-providence-day). The
  CDN URLs are in the Source URLs file.
  - **Trips slot:** the Seville summer-2023 group photo. Download it to
    `public/travel/providence-day-seville-2023.jpg`. Caption title "Seville, summer 2023";
    body text about the homestay plus daily language classes. Its alt text names only a
    teacher, so it is safe. The app's alt text stays generic: "Providence Day students on
    the 2023 summer trip to Spain".
  - **Exchange slot:** the Colombia exchange photo (March 2023). Download it to
    `public/travel/providence-day-colombia-exchange-2023.jpg`, **renamed**, because the CDN
    filename carries a student's name. The school's alt text names two minors, so the app
    caption and alt text must name **nobody**: "A Providence Day exchange student with
    their host student in Colombia".
  - The design's placeholder captions ("On the Global Map", "Hosting at home") are
    replaced by captions that describe the real photos. Their sentences move into the card
    body: "The school logs every trip by school year on its Global Map…" and "Exchange
    visitors give presentations to Lower School and Spanish classes."
  - The type keeps `photo?` optional, so a school with no photo simply omits it, the figure
    disappears, and the adjacent column fills the width. That is the user's rule.
  - The renderer **must** use `PhotoZoomButton` + `PhotoViewer` (`check:photos`) and
    resolve `src` through `assetUrl()`.
  - Each photo carries `credit: 'Photo: Providence Day School'`, and the card's
    `SourceRow` includes the admissions page URL.
- **Corrections the URL verification forced on the design's PD copy** (the live page wins;
  the full evidence is in the Source URLs file):
  - **Dropped (not found):** the "Speakers at home" cell (Ambassador Yovanovitch,
    Dec 2023). Nothing ties her to PD. **Replace it** with the verified Masood Khan talk
    from the Upper School page, worded only as far as that page supports. Failing that,
    drop the cell; the grid reflows.
  - **Dropped (snippet only):** the PD-hosted gender-equality Postcard figures (120 / 23 /
    9, Feb 2022), and Dubai's "958 students and 294 adults…" and "Sept 19–25". The Postcards
    cell instead uses the Global Map's verified figures ("Food is Love": 19 schools, 10
    countries; "What's Trending": 19 schools, 9 countries). Check whether the map supports
    "100+ students" before keeping that phrase. The Dubai trip row keeps its year group
    ("2025–26, dated by Round Square", from the RS article posted 1 Oct 2025) but **no
    timing tag**. The network ledger's 2025 row is just: Dubai, the 57th Round Square
    International Conference.
  - **Re-worded to the live page:**
    - Round Square: "one of only two Round Square schools in North Carolina", with no
      conflict range, because the older "only school member" wording is superseded.
    - "Institute for Global Learning" (the live page dropped "and Global Connections").
    - "TK Goes Global" countries: India, China, Germany, Peru and Kenya.
    - Greece timing: "Summer 2024" ("June" unconfirmed).
  - **Signing Up uses the real calendar dates** (https://www.providenceday.org/calendars):
    - Global Trip Registration Opens: Oct 16, 2026
    - Global Trips Virtual Information Session: Oct 22, 2026, 6:30–7:00 PM
    - GSD Donuts and Discussions: Sep 29, 2026, 1:15 PM
    - Final Required GSD New Student Orientation: Oct 2, 2026, 1–2 PM

    The design's "All day" / "Recurring" placeholders are replaced, and the intro says
    registration opens October 16.
  - **GSD graduates range:** 250+ (admissions) / 300+ (alumni) / 325+ (FAQ) gives
    **"250–325+ graduates — school pages give different totals"**. First, check the "375"
    graphic on https://www.providenceday.org/global-studies-diploma. If it is plainly a
    graduate count, the range becomes 250–375+. Show the GSD start year as "2005 or 2007"
    wherever a start year appears.
- **"Ask on the tour" checkboxes are uncontrolled and not persisted.** They match the
  design and the existing `CollegeSupport.tsx:868` / `ArtsProgram.tsx:388` checkbox
  precedent. No localStorage is used.
- **Division filter tabs (All / Middle School / Upper School) only render when a school's
  trips span two or more divisions.** For a school with one division the tabs would filter
  nothing. Tab state is local `useState`. The "N trips shown" count and the per-year
  "N trip(s)" count use i18next `count` plurals, never a hand-rolled `s`.
- **The Jordan trip, domestic trips and historical art-history trips stay in "Also on the
  record", not in the ledger.** This is as designed: the ledger is dated international
  trips only. Puerto Rico is a U.S. territory and goes under domestic.
- **The ingested prose is fully substituted by the cards**, so the topic joins the
  SchoolDetail disjunction. `RULES['international-travel']` is a single catch-all key,
  as admissions and summer do.
- **No podcast row.** No episode exists, and `PodcastDeepDive` already renders nothing
  without one.

## Approvals needed

**None outstanding.** The new research area, its seven cards and its stat strip arrive
through a Claude Design handoff the user explicitly asked to implement. Under CLAUDE.md's
UX standard, that request is the approval. Recorded here so `/implement` does not stop to
re-ask.

`npm run deploy` is **not** part of this plan. Merging is not publishing.

## Source material

Written during planning, **uncommitted**, and ingested by `/implement` in step 2:

- `source-material/international-travel/providence-day/Providence Day - International Travel - Deep Research.md`
  is a full transcription of the user's 16-page PDF *"Providence Day School (Charlotte,
  NC): Global Travel & Global Education Programs — Research Dossier (as of October 2026)"*.
  The PDF cites only with chips, not URLs.
- `source-material/international-travel/providence-day/Providence Day - International Travel - Source URLs.md`
  is the per-fact URL map assembled during planning, and **the citation record**.
  - Each row is marked fetched / live-tile / Wayback / snippet-only.
  - It lists what was not found, the official-page conflicts, and the two photo URLs with
    a minor-name check.
  - The school redesigned these pages in 2026, so a few claims cite a 2026-04-21 Wayback
    snapshot.

The PDF itself is not on disk; it was attached to the planning conversation. The `.md`
transcription is the committed record.

## Out of scope

- **Compare.** No Compare row, pill, `VALUE_METRICS` entry or home-grid cell. The user
  deferred it ("We don't need to add international travel as a compare topic yet").
- Research for any school other than Providence Day.
- The other schools in the PDF's comparison table (Country Day, Latin). That is context
  only; do not populate them.
- A podcast episode, or a `podcastEpisodes.ts` entry.
- Persisting the "Ask on the tour" ticks.
- Sourcing photos beyond the two identified on the admissions page.
- `npm run deploy`, and the news Worker.

## Steps

### Phase 1 — English

1. **Branch, and check Claude Design for edits.**
   `git checkout main && git pull && git checkout -b feat/intltravel`. Then run the etag
   check in Context → "When `/implement` must consult Claude Design" (item 1). It uses
   project `5da24575-40bf-4787-8934-0fadfc56059f` via the `claude-design` MCP. If the
   design changed since 2026-10-11, the live version is the spec; refresh the local copies
   first.

2. **Ingest the source material.** Follow the `ingest-source-material` skill. Its
   app-layer checklist §1 covers a new topic.
   - Add `"international-travel": "International Travel"` to `TOPIC_NAMES` in
     `.claude/skills/ingest-source-material/build_docs.py`.
   - Add `'international-travel'` to `TOPIC_ORDER` in `src/lib/metrics.ts`, **immediately
     after `'course-offerings'`**. Add a one-line comment saying it was placed there at
     the user's request (2026-10-11).
   - Add a catch-all `RULES['international-travel']`:
     `[{ match: /.*/, key: 'redesign-research', label: 'International Travel Research Dossier (2026)' }]`.
     Mirror the admissions/summer catch-alls (metrics.ts:45-51, :98-112).
   - Run, in order:
     - `python .claude/skills/ingest-source-material/build_docs.py international-travel`
     - `python scripts/build_site_content.py`
     - `node scripts/check_metrics.mjs`

     These produce `.claude/docs/international-travel/providence-day.md`,
     `src/content/international-travel/providence-day.json` and an updated
     `src/data/schools.json`.
   - Also add a row for the new topic to `source-material/INDEX.md`'s topic table.

3. **Topic chrome.** In `src/locales/en.json`, add these keys:
   - `topics."international-travel": "International Travel"`, beside the other `topics.*`
     at :40-51.
   - The five constant card titles plus the two PD title overrides, under `cards`:
     - `"international-travel.trips"`
     - `"international-travel.start"`
     - `"international-travel.exchanges"`
     - `"international-travel.credential"`: "Credential"
     - `"international-travel.network"`: "Network"
     - `"international-travel.signup"`
     - `"international-travel.verdict"`
     - `"international-travel.credential@providence-day"`: "The Global Studies Diploma"
     - `"international-travel.network@providence-day"`: "Round Square & the Wider Network"
   - A new `travel` block for in-card chrome:
     - filter tabs: `allDivisions`, `middleSchool`, `upperSchool`
     - `tripsShown_one` / `tripsShown_other` = "{{count}} trip(s) shown"
     - `tripCount_one` / `_other`
     - `homestay` = "Homestay · {{place}}"
     - `alsoOnRecord` = "Also on the record"
     - `languagePath` (sub-head)
     - `out` = "Out:" and `in` = "In:"
     - `livingWithFamily` = "Living with a family"
     - `requiredCoursework`, `beyondClassroom`
     - `standsOut` = "Where it stands out"
     - `askOnTour` = "Ask on the tour"
     - `askOnTourNote` = "not published on the school's site"
     - `confirmCalendar` = "Confirm exact dates and times on the live school calendar."

     Any sub-head that varies per school is data, not chrome. Examples: "Round Square
     conferences PD has attended", "Global Trips · Fall 2026 · every family", the language
     path title. These go in the PD data file instead.
   - Add an icon for `'international-travel'` to `PATHS` in
     `src/components/TopicGlyph.tsx` (:5-50). Use the plane path from the design:
     `M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z`.
     Match the stroke conventions of its neighbours.

4. **Data module — `src/data/internationalTravel.ts`.** Model it on
   `src/data/summerPrograms.ts` (registry, `PROGRAMS`, overlay glob, loader, accessor) and
   copy `TITLE_OVERRIDES` / `…CardTitleFor` / `titleOverrideSlug` from
   `admissionsPrograms.ts:245-309`.
   - **Registry.** `INTERNATIONAL_TRAVEL_CARDS = [{key:'trips',title:'Where They Go'}, …]`
     with seven entries in the order above,
     `as const satisfies readonly { key: string; title: string }[]`. Keep the literal shape
     `gen_data_schema.mjs`'s `parseCardRegistry` reads; check it against
     `SUMMER_CARDS` (:246-261). If SUMMER_CARDS carries a `kicker` field the parser needs,
     include it but never render it.
   - **Types.** Every card object carries `headline: string` (the teaser) and
     `sources: Source[]` (from `SourceRow.tsx`). Intro lines are `{ strong: string; muted?: string }`.
     ```ts
     type TravelStat = { value: string; label: string; note?: string }
     type TravelPhoto = { src: string; alt: string; caption?: { title: string; text: string } }
     type Trip = { dest: string; place?: string; div: 'LS' | 'MS' | 'US'; group?: string;
                   theme: string; timing?: string; homestay?: string }
     type InternationalTravelProgram = {
       lead: { strong: string; muted?: string }
       stats: TravelStat[]                         // ≤4; the strip omits itself if empty
       trips?:      { headline; intro; years: { year: string; note?: string; trips: Trip[] }[];
                      photo?: TravelPhoto; alsoOnRecord: { lead: string; text: string }[]; sources }
       start?:      { headline; intro; framework?: { name: string; text: string }[];
                      divisions: { name: string; grades: string; theme?: string; items: string[] }[];
                      languages?: { title: string; steps: { when: string; text: string }[] }; sources }
       exchanges?:  { headline; intro; partners: { country: string; years: string; school: string;
                      out?: string; in?: string }[]; photo?: TravelPhoto;
                      homestays: { place: string; text: string }[]; sources }
       credential?: { headline; intro; stats: TravelStat[]; required: string[]; beyond: string[];
                      quote?: { text: string; attribution: string };
                      award?: { name: string; text: string }; sources }
       network?:    { headline; intro; ledgerTitle?: string; conferences: { year: string; text: string }[];
                      cells: { name: string; text: string }[]; rows: { label: string; text: string }[]; sources }
       signup?:     { headline; intro; groups: { title: string; note?: string;
                      events: { when: string; name: string; detail?: string }[] }[]; footnote?: boolean; sources }
       verdict:     { headline; standsOut: { summary: string; points: string[] };
                      ask: { topic: string; question: string }[]; sources }
     }
     ```
     Adjust names freely, but keep two properties: **every optional block is
     omit-to-hide**, and **no field exists for "not stated"**.
   - **Overlay.** `import.meta.glob<OverlayFile>('./overlays/international-travel.*.json', { import: 'default' })`
     **standing alone at module scope.** See the comment block in summerPrograms.ts:342
     for why; it is the `gen_data_schema` / Vite constraint. Add
     `loadInternationalTravelOverlay(lang)` and `internationalTravelProgram(slug, lang)`,
     cloned from :347-372.
   - **README.** Add `src/data/internationalTravel/README.md`, modelled on
     `highSchoolPlacementPrograms/README.md`. It covers:
     - the two gates (the data file AND the source-material folder);
     - the per-school retitle/drop rule for `credential`/`network`;
     - the gaps-only-in-`verdict.ask` rule;
     - the photo rule;
     - the source-URL rule.

5. **Providence Day data — `src/data/internationalTravel/providence-day.ts`.**
   - Export `providenceDay: InternationalTravelProgram`.
   - Transcribe the copy from `.claude/plans/intltravel-data/pd-travel-section.html` and
     the trip ledger from `pd-travel-script.js`. Those are the user-reviewed wording.
   - Then **verify every fact against a live page** and attach that URL. The
     deep-research `.md` is an AI-generated lead sheet: use it to find what to check,
     never as the proof. Start from the Source URLs file. Facts it marks as verified need
     only a spot-check. For facts it marks unverified, or doesn't cover, fetch the page
     yourself (WebFetch; Wayback `web.archive.org/web/2026*/<url>` if blocked). Quoted
     strings must match the page char-for-char.

   Checklist, all mandatory:
   - Every card's `sources` lists the specific page URLs behind its facts. No bare
     `https://www.providenceday.org` placeholder survives. Grep for it.
   - A fact in the design that has **no URL in the Source URLs file** is dropped from the
     card. If a parent would want it answered, it moves into `verdict.ask`. Note each such
     drop in the plan's Implementation notes.
   - No "Not stated" / "not published" strings in `trips`…`signup`. Grep `-i 'not stated\|not published'`.
   - Conflicts carry their range: `250–325+` with "school pages give different totals";
     GSD start "2005 or 2007" if shown.
   - The "~19 countries" tile says "our count from the school's Global Map". The design
     already does.
   - Photos: download the two Finalsite images listed in the Source URLs file to
     `public/travel/` under the renamed filenames in Decisions, then set `trips.photo` and
     `exchanges.photo`. **No student name** may appear in `alt`, `caption` or the
     filename. Apply every bullet of Decisions → "Corrections the URL verification
     forced": Yovanovitch replaced, snippet-only figures dropped, live-page wording, real
     calendar dates, GSD range.
   - `verdict.ask` holds the design's 11 questions, which are the PDF's §11 list.
   - Figures are authored US-style and never pre-localized (`250–325+`, `3.75`, `B−`).
   - No minor student names. The Class of 2025 quote is already anonymised; keep it that
     way.
   - Then register it in `src/data/internationalTravel.ts` with an import and a
     `PROGRAMS['providence-day']` entry.

6. **Component — `src/components/InternationalTravel.tsx`.**
   - Export `InternationalTravelStatBand({ program })`, modelled on `AdmissionsStatBand`.
     It renders `.stat-strip` / `.stat-tile` with the note line, and money passes through
     `localizeMoneyText`.
   - Export `InternationalTravelLead({ program })`: one `<p>` with `<strong>` + muted span.
   - Export `InternationalTravelCardBody({ program, cardKey })`, an explicit `switch`
     dispatcher modelled on `SummerProgramsCardBody` (SummerPrograms.tsx:663). It has one
     body per key, and each ends in
     `<SourceRow sources={data.sources} className="it-src" />`. The bodies:
     - **TripsBody.**
       - Lead line.
       - The `.depttab` filter row, only when trips span ≥2 divisions, with
         `data-active` and `useState<'all'|'MS'|'US'>`.
       - The year-grouped ledger: year header with note and count; each row shows
         `dest`/`place`, `theme`, and tags. The tags are `tag-neutral` (division ·
         group), `tag-outline` (timing, only if present) and `tag-accent`
         (`travel.homestay`, only if present). The division label comes from
         `travel.middleSchool` / `upperSchool`.
       - The side column holds the optional photo plus "Also on the record". With no
         photo, only the list renders.
     - **StartBody.** Framework cells; a division ladder (name · grades, theme line, item
       list); a language-path grid.
     - **ExchangesBody.** Partner grid (country · years label, school name, Out / In
       lines, each optional); optional photo; "Living with a family" rows.
     - **CredentialBody.** A 3-cell stat strip; two lists (`travel.requiredCoursework`,
       `travel.beyondClassroom`); an optional `<blockquote>`; an optional award row.
     - **NetworkBody.** Intro; conference ledger (title from data); a cells grid; label/text
       rows.
     - **SignupBody.** Two agenda columns from `groups` (head + note, dated rows); the
       `travel.confirmCalendar` footnote when `footnote` is true.
     - **VerdictBody.** Left: `travel.standsOut`, the summary, and checkmark rows. Right:
       `travel.askOnTour` + `askOnTourNote`, then a `<label>` per question containing an
       uncontrolled `<input type="checkbox">`, the bold `topic.` and the question.
   - Use `RichText` (as `SummerPrograms.tsx` does) wherever prose may carry `**bold**` or
     URLs. Put no hardcoded English in JSX; every label is `t('travel.…')`.
   - Prefix every new class `it-` (e.g. `it-ledger`, `it-trip`, `it-partners`,
     `it-agenda`, `it-ask`). **Never `ad-` or similar.** An EasyList ad-blocker rule once
     blanked the Admissions card for exactly that reason.

7. **SchoolDetail wiring — `src/pages/SchoolDetail.tsx`.** Mirror summer and admissions
   at each touch point:
   - **Imports.** Add `INTERNATIONAL_TRAVEL_CARDS`, `internationalTravelProgram`,
     `loadInternationalTravelOverlay`, `internationalTravelCardTitleFor` and
     `titleOverrideSlug as travelOverrideSlug`, plus the component's three exports.
   - **Overlay loader.** Add `loadInternationalTravelOverlay(lang)` to the `Promise.all`
     (:485-499) **and add the matching destructure hole (:517)**. `tsc -b` catches a
     missing hole; `tsc --noEmit` does not.
   - **Entry/cardList/guard.** Compute `travel` with the :916-940 idiom: cards are the
     registry entries whose key is present on the program. `travel` is undefined if none.
   - **Card count.** Add `travel`'s card count to the `cardCount` ternary (:942-960).
   - **Head render.** After the PodcastDeepDive and stat strip in the topic head, add
     `{ready && t.slug === 'international-travel' && travel && (<><InternationalTravelLead/><InternationalTravelStatBand/></>)}`.
     Order: lead line, then stat strip, as in the design.
   - **Card grid.** Render inside the existing `.note-cards` grid as
     `details.note-card.note-card-report.note-card-it` (summary → `.note-card-head` with
     `cardTitle(tr,'international-travel',card.key, internationalTravelCardTitleFor(slug,card), travelOverrideSlug(slug,card.key))`
     and the `headline` teaser → `.plusmark` → `.note-card-body` with
     `InternationalTravelCardBody`).
   - **Full-width cards.** `trips` and `verdict` span full width even when closed, as in
     the design. Add `note-card-wide` (or a key-based class) mapped to
     `grid-column: 1 / -1`. Open cards already span the full row via `.note-card[open]`
     (index.css:1300). The others sit two-up when closed and one-up on phones.
   - **Disjunction.** Add `(t.slug === 'international-travel' && travel)` to the
     substitution disjunction (:1364-1374).
   - **"No readable notes" guard.** Check it (:1053) doesn't fire for this
     full-substitution area; mirror how summer/admissions are exempted.

8. **Keep it off Compare.**
   - **`src/lib/manifest.ts`.** Add `COMPARE_DEFERRED_TOPICS` and filter
     `comparableTopics` by it. Extend the docblock at :95-107 to say why: the user
     deferred Compare on 2026-10-11, so this is an editorial deferral, not a data
     absence. That is distinct from the derived PreK-8 exclusion.
   - **`src/pages/SchoolDetail.tsx`.** Gate the section-head Compare button (:992-1000) on
     `comparable && !COMPARE_DEFERRED_TOPICS.has(t.slug)`.
   - **`src/lib/head.ts`.** Change the Compare description (:184-186) from `topics` to
     `comparableTopics`, through whatever `topicList` takes. Read `topicList`'s signature
     first; if it hardcodes `topics`, add a parameter.
   - **`scripts/gen_data_schema.mjs`.** Update the §7 / `comparableTopics` text
     (:798/:816) so the doc says International Travel is deferred from Compare.
   - Confirm `scripts/audit_date_render.mjs:80` and `scripts/audit_money_render.mjs:58`
     hardcoded `COMPARE_TOPICS` lists do not need it. They should not.

9. **CSS — `src/index.css`.** Add a `/* International Travel */` block beside the Summer
   (`.su-*`) block, using only existing tokens (`--brand`, `--color-divider`,
   `--color-accent-*`, `--space-*`, `--font-heading`). Requirements:
   - Every grid uses `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` or wrapping flex.
     Use the design's N values: stat strip 130, framework 200, ladder 180, languages 130,
     partners 210, credential stats 170, network cells 180.
   - Flex children carry `min-width: 0`. The "Also on the record" side column uses
     `flex: 1 1 260px` with **no fixed `max-width` once there is no photo**, so it fills.
   - `.note-card-it .depttab { min-height: 40px }`.
   - Divider-gap grids: `gap: 1px; background: var(--color-divider); border: 1px solid var(--color-divider)`
     with `background: var(--color-bg)` cells.
   - Use logical properties (`margin-inline-start`, `border-inline-start`, `text-align: start`)
     so the `fa`/`ar` RTL locales mirror correctly in Phase 2.
   - Long tokens wrap: `overflow-wrap: anywhere` on trip `place` and partner school names.
     "Lycée Notre Dame de la Merci, Montpellier" must not widen the page at 320px.

10. **i18n plumbing (English side).**
    - **`scripts/i18n_topics.mjs`.** Add `'international-travel': 'internationalTravel'`
      to `TOPICS`. `EXPORTS` already has `providence-day`. Do **not** add it to
      `FOREIGN_TOPICS` in `check_live_resolution.mjs`.
    - **`scripts/i18n_fields.mjs`.** Classify every new leaf key.
      - Prose: `strong`, `muted`, `headline`, `text`, `theme`, `place`, `summary`,
        `question`, `topic`, `title`, `note`, `label`, `items[]`, `required[]`, `beyond[]`,
        `points[]`, `caption.*`, `alt`, `detail`.
      - Skip as identifier / figure: `value`, `div`, `src`, `url`, `group` (a count),
        `year`.
      - Judgement calls:
        - `dest`, `school`, `country` are proper nouns. Check how sports and summer
          classify place and school names, and follow that.
        - `when` holds a date ("October 2, 2026", "6:30–7:00 PM"). It must be extracted
          so dates translate (see the `figuredates` precedent and `check:dates`).
        - `timing` holds prose with dates ("Summer (June 2024)"). Treat it as prose.
      - Run `node scripts/i18n_fields.mjs --residual` (or the equivalent flag the file
        documents) until **zero** unclassified.
    - **`scripts/gen_data_schema.mjs`.** Add a `STRUCTURED` entry:
      `{ topic: 'international-travel', file: 'internationalTravel.ts', reg: 'INTERNATIONAL_TRAVEL_CARDS', root: 'InternationalTravelProgram', dir: 'internationalTravel' }`.
      Then run `npm run schema`.

11. **Commit Phase 1 and open the PR.** Before committing:
    - run `git status --short`;
    - stage explicit paths only, **never `git add -A`**;
    - include the two `source-material/international-travel/providence-day/*.md` files
      and `.claude/plans/intltravel-data/*`.

    Push, verify with `git rev-parse HEAD` vs `git ls-remote origin feat/intltravel`, then
    open a PR (`--body-file`) marked "Phase 1 — English; translation pending review". Flip
    the INDEX row to **English shipped** with the PR link.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Show the
user Providence Day's section at desktop width and at 390px with every card open, and ask
them to confirm the wording. Nothing below runs until they confirm.

### Phase 2 — Every other locale

Two layers, two mechanisms. Do not cross them.

1. **UI chrome → `src/locales/*.json`.** The new `topics.international-travel` key, the
   seven `cards.international-travel.*` titles (incl. the two `@providence-day`
   overrides) and the `travel.*` block go into every non-`en` catalog in `TRANSLATED`
   (`src/lib/i18n.ts:108`): `es bn ht te fr fa it hi ar`. Re-read the list before
   starting; it can grow.
   - `tripsShown` / `tripCount` need every CLDR plural form per locale. Arabic has six,
     and `_two` absorbs the numeral (no `{{count}}`). Assert through `Intl.PluralRules`
     and resolve through i18next, per the memory notes.
   - Do not run a key-order normalizer over `ar.json`; it has killed Arabic plurals
     before.

2. **Research prose → overlay layer.** Produce
   `src/data/overlays/international-travel.<lang>.json` for each locale in
   `PROSE_TRANSLATED` (`src/lib/i18n.ts:182`).
   - Follow `.claude/docs/prose-translation-architecture.md` for the mechanism
     (`i18n_extract.mjs` → work files → `i18n_build_overlay.mjs`).
   - Follow each locale's rollout doc (`prose-translation-<lang>.md`) for register.
   - Key translation maps by English text, never by index.
   - Splice by stamp; do not re-extract other topics' work files.
   - Parallel locale agents share a scratchpad and have collided before. Give each its
     own directory.

   Standing rules that apply:
   - Figures are copied char-for-char (`250–325+`, `3.75`, `B−`, `280+`, `~19`).
   - Units are never converted.
   - `%` stays unspaced.
   - `hi`/`te` regroup only at render.
   - `fa`/`ar` store no bidi isolate in the overlay.
   - Dates translate and their digits do not (`October 2, 2026`, `June 2024`,
     `Sept 19–25, 2025`).
   - Keep searchable identifiers in Latin script: Round Square, Global Studies Diploma,
     GSD, Model UN, the partner school names, `Upper School` / `Middle School` as
     division names.
   - In `fr`, check `check:fr` for course codes such as "AP World History".
   - Quoted school wording ("Inward. Outward. Forward.", "Wonder + Awareness") is a
     citation. Follow how each locale's rollout doc handles verbatim quotes.

3. **Update `src/data/overlays/NOTES.md`** with any locale soft-spots this area
   introduced.

4. Commit, push, and update the same PR. Flip INDEX to **Implemented**. Merge with
   `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
   **Do not deploy.** End with "merged — ready to deploy whenever you want it".

## Files touched

| File | Change |
|---|---|
| `source-material/international-travel/providence-day/*.md` (2) | new — PDF transcription + per-fact URL map (written while planning) |
| `source-material/INDEX.md` | edit — topic row |
| `.claude/skills/ingest-source-material/build_docs.py` | edit — `TOPIC_NAMES` entry |
| `src/data/schools.json`, `src/content/international-travel/providence-day.json`, `.claude/docs/international-travel/providence-day.md` | generated by ingest |
| `src/lib/metrics.ts` | edit — `TOPIC_ORDER` after course-offerings; catch-all `RULES` |
| `src/lib/manifest.ts` | edit — `COMPARE_DEFERRED_TOPICS`; `comparableTopics` filter |
| `src/lib/head.ts` | edit — Compare description reads `comparableTopics` |
| `src/data/internationalTravel.ts` | new — registry, types, `TITLE_OVERRIDES`, overlay loader, accessor |
| `src/data/internationalTravel/providence-day.ts` | new — PD data with per-card source URLs |
| `src/data/internationalTravel/README.md` | new — data rules |
| `src/components/InternationalTravel.tsx` | new — lead, stat band, 7 card bodies, dispatcher |
| `src/components/TopicGlyph.tsx` | edit — plane glyph |
| `src/pages/SchoolDetail.tsx` | edit — imports, loader + hole, idiom, cardCount, head render, card render, disjunction, Compare-button gate |
| `src/index.css` | edit — `it-*` block |
| `public/travel/providence-day-seville-2023.jpg`, `public/travel/providence-day-colombia-exchange-2023.jpg` | new — two official PD photos, renamed (no student names) |
| `src/locales/en.json` | edit — `topics`, `cards`, `travel.*` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — same keys (Phase 2) |
| `src/data/overlays/international-travel.{9 locales}.json` | new (Phase 2) |
| `scripts/i18n_topics.mjs`, `scripts/i18n_fields.mjs` | edit — topic + field classification |
| `scripts/gen_data_schema.mjs`, `.claude/docs/DATA-SCHEMA.md` | edit + regenerate |
| `.claude/plans/INDEX.md`, `.claude/plans/intltravel.md` | status + implementation notes |

## Verification

### Phase 1 — English

- [ ] Claude Design etags checked at step 1. The result (unchanged, or what changed) is
      noted in the PR body.
- [ ] Side-by-side against the design: the built PD section matches
      `Providence Day School.dc.html` `#travel` card for card, except the deliberate
      deviations listed in Context.
- [ ] `node scripts/check_metrics.mjs` — no unmatched subtopic for `international-travel`
- [ ] `npx tsc -b` — clean. **Not** `--noEmit`; only `-b` catches the destructure hole.
- [ ] `npm run schema && npm run check:schema` — DATA-SCHEMA.md lists the new area and its
      7 card keys
- [ ] `npm run build` — succeeds. It chains `check:seo` (PD meta description ≤160 chars),
      `check:live`, `check:chrome`, `check:runtime`, `check:dates`, `check:photos`, etc.
      `check:chrome` may report the new keys as *pending translation* in the other nine
      catalogs (exit 0). That is expected in Phase 1.
- [ ] `node scripts/i18n_fields.mjs --residual` (per its documented flag) — zero
      unclassified leaf keys
- [ ] `grep -rn "providenceday.org\"" src/data/internationalTravel/providence-day.ts` — no
      bare-homepage placeholder URLs. Every `sources` entry is a specific page.
- [ ] `grep -in "not stated\|not published" src/data/internationalTravel/providence-day.ts`
      — hits only inside `verdict`
- [ ] Compare exclusion, after `npm run build`:
  - `grep -c 'international-travel\|International Travel' dist/compare/index.html` → `0`
  - the home page "What you can compare" grid has no International Travel cell
  - `dist/school/providence-day/index.html` contains "International Travel"
- [ ] **Browser check** (`npm run build && npx vite preview`, real Chrome via Playwright):
  - On `/school/providence-day/`, the chip and rail item "International Travel" sit
    immediately after Course Offerings, and clicking either scrolls to
    `#topic-international-travel`.
  - The section shows the plane glyph, title, **no Compare button**, the lead line and 4
    stat tiles, then seven cards in order:
    1. Where They Go
    2. When Your Child Can Start
    3. Exchanges & Homestays
    4. The Global Studies Diploma
    5. Round Square & the Wider Network
    6. Signing Up
    7. Verdict & Ask the School
  - No `1a ·` kickers anywhere.
  - Where They Go: All / Middle School / Upper School filter. MS shows 3 trips (England,
    Ecuador, Greece). The counts update. Homestay tags appear on Colombia, Spain and
    France only.
  - Both photos (Seville in Where They Go, the Colombia exchange in Exchanges & Homestays)
    render, open in the photo viewer on click, and name no student. There is no empty
    `<figure>` or placeholder box anywhere.
  - Every card ends in a SOURCE row whose links open real providenceday.org /
    roundsquare.org pages. Spot-check five.
  - The Ask on the tour checkboxes toggle.
  - Another school, e.g. `/school/cannon/`, has **no** International Travel chip, rail
    item or section.
- [ ] `npm run audit:mobile` — passes at 320/360/390px with every `<details>` open. No
      page overflow, no clipped content. Then eyeball 390px with every card open: grids
      collapse to one column, filter tabs are ≥40px tall, and long school names wrap.
- [ ] Dark mode — toggle the theme. Tags, divider-gap grids and the brand-coloured stat
      values stay legible.

### Phase 2 — Locales

- [ ] `npm run check:chrome` — no key pending in any catalog
- [ ] `npm run check:runtime && npm run check:live` — every international-travel overlay
      stamp resolves against live English, and gate 3 passes
- [ ] `python3 scripts/check_figures.py --topic international-travel --lang <code>`, for
      each of the 9 locales
- [ ] `npm run check:sepdrift -- --lang <code>`, for each locale
- [ ] `npm run check:dates`
- [ ] `npm run check:fr`, `npm run check:bidi`, `npm run check:fa`, `npm run check:hi`
- [ ] `npm run i18n:leaks -- --lang <code>` (it needs `--lang`)
- [ ] `npm run audit:daterender` and `npm run audit:moneyrender` (build + preview) — no new
      English dates or raw `$` in the travel section
- [ ] `npm run audit:mobile` in translated locales at **320px** (the `mobileready` lesson:
      translated strings run longer)
- [ ] Browser check: Providence Day in `es`, `fa` (RTL: ledger, tags and agenda rows
      mirror; figures read LTR) and `hi`, with every card expanded. Check the plural
      counts in `ar`.

## Risks

| Risk | Mitigation |
|---|---|
| A design fact has no findable URL, so the user's "source URL for every fact" rule would be broken silently | Step 5 checklist: no URL means drop the fact (or move it to Ask on the tour), and record the drop in Implementation notes |
| Ingested prose renders under the cards a second time | Step 7 disjunction entry; the browser check looks for duplicate prose |
| Topic leaks into Compare through `comparableTopics`, the home grid or the meta description | Step 8 named set + the `dist/compare` grep |
| New card classes overflow at 320px once open (the `mobileready` defect class) | `minmax(min(100%,N),1fr)` everywhere, `min-width:0`, `overflow-wrap:anywhere`, and `audit:mobile` |
| Overlay glob placed inside a function or guarded, so overlays silently never load | Copy summer's module-scope glob verbatim; `check:live` will report the topic |
| Per-school credential/network titles pinned to English | Use `TITLE_OVERRIDES` + `@providence-day` catalog keys, never a `title` field rendered raw |

## Open questions

- **Is "every school dossier" meant to show an empty International Travel section for the
  11 unresearched schools?** **Default:** no. The area appears on a school only when its
  research lands, which is the repo's absence-of-data rule and the user's own "never
  render empty or placeholder cards". If the user wants otherwise, that is a new UX
  surface and needs its own decision.

## Implementation notes

**Phase 1 (English) built 2026-10-11 on `feat/intltravel`.** Claude Design etags were
unchanged at step 1 (all three still `1791758016363725`), so the local copies were the spec.

**Deviations from the plan, and why:**

- **No PR opened at the Phase 1 stop.** Step 11 says to open one; the `/implement`
  skill's standing rule is to commit Phase 1 to the branch and open the single PR only
  after Phase 2, so both phases land in one PR. The branch is pushed.
- **CSS tokens.** The plan names `--color-divider` / `--color-bg` / `--color-accent-*`;
  `src/index.css` actually uses `--border`, `--bg`, `--text`, `--muted`, `--ink`,
  `--accent-*`, `--heading`. The `it-*` block uses the real ones.
- **Photo blend dropped.** `.it-photo img` keeps the Summer band's grayscale filter but not
  its `mix-blend-mode: multiply`, which crushed the photo to near-black over a dark-mode
  card.
- **Seville photo captioned "Spain, summer 2023", not "Seville, summer 2023".** The photo
  is the Court of the Lions in the Alhambra (Granada); the school's alt text says only
  "2023 summer trip to Spain".
- **Chrome keys.** `travel.lowerSchool` was added (the `Trip.div` union includes `LS`).
  `travel.languagePath` was not: the language-path heading is per-school data
  (`start.languages.title`), as the plan itself says sub-heads that vary are.
- **i18n classification is path-scoped** (a `/* international travel */` block in
  `PATH_OVERRIDES`), not new leaf keys. Two overrides beat leaf defaults that would have
  leaked English: `verdict.ask[].topic` (`topic` is skipped repo-wide as a routing slug)
  and `network.cells[].name` (`name` is skipped as a proper noun; "Speakers at home" is
  prose). `div`, `exchanges.partners[].school` and `.years` are skipped. Residual: 0.
- **`gen_data_schema.mjs` §7** now says "up to N−1 of N" research areas for both K-12 and
  K-8, since a single-school area makes "N−1" a ceiling rather than a count. The
  `coverage:floor` area denominator is now 11; Davidson Day still sets the floor at 7.

**Fact corrections forced by the implement-time URL verification.** The full record is
in the Source URLs file under "Implement-time verification". The ones that change what a
reader sees:

- GSD graduates **250–375** (the GSD page's "375 students have received the GSD to date"
  graphic is a cumulative recipient count), not 250–325+.
- Round Square Global Member "**for over a decade**". "Since 2016" is on no page.
- Credential intro states the start year as "2005 or 2007".
- Rewordings to match the live pages:
  - Galápagos ("evolution, biodiversity, environmental sustainability");
  - Thailand ("human/wildlife coexistence");
  - Bermuda ("two separate weeks in March");
  - South Africa ("a permanent kindergarten building");
  - Collingwood ("connected virtually");
  - Upper School exchanges ("two to four weeks");
  - the GSD course list (General Information page wording, no "senior capstone");
  - the alumna quote (attributed to Global Education, not the GSD);
  - the award wording.
- **Dropped**, because no live page supports them:
  - "third graders" (Worldwide Show and Tell);
  - "fly … passports";
  - the Upper School languages step;
  - "100+ students" (Postcards);
  - the Oxford "delegates" group tag;
  - the exchange-visitor presentations sentence;
  - the "Recognition — July 2026" tour question (its premise is unverified), which
    leaves **10 tour questions, not 11**;
  - "points system" from the GSD question.
- **London moved from the ledger to "Also on the record"**: its row needed a "year not
  stated" note, which breaks the gaps-only-in-verdict rule. The ledger is now 15 dated
  trips; MS still shows 3 (England, Ecuador, Greece).
- **Yovanovitch replaced** by the GSD page's Masood Khan Ambassador Series luncheon.
- **Calendar titles and times** now come from the event details: "…Promote Diplomacy!",
  1:15–2:15 PM; "…Orientation #3", 1:00–2:00 PM.
- **"Earlier years"** is now cited to the 2014 news post that was found, framed as one
  teacher's trips.

**Phase 1 verification (all passing):**
- `tsc -b`;
- `npm run build`, with every chained check;
- `i18n_extract --report --residual`: 0 unclassified;
- `check_metrics`: no unmatched travel subtopic;
- `schema` / `check:schema`;
- the two `providence-day.ts` greps;
- Compare exclusion: `dist/compare` has 0 mentions, the home page 0, PD's page has it;
- PD meta description: 152 chars;
- `audit:mobile` (PD + Cannon): 0 doc overflow at 320/360/390.

The real-Chrome check (Playwright, `channel: 'chrome'`) at 1280 and 390 confirmed:
- chip/rail order: Course Offerings → International Travel;
- no Compare button and no kickers;
- 4 tiles and the 7 card titles in order;
- the filter: 15 → MS 3, counts pluralised;
- homestay tags on Colombia, Spain and France only;
- filter tabs 40px tall;
- both photos load and open in the viewer;
- the checkboxes toggle;
- Cannon has no section.

The dark-mode screenshot is legible.

**Phase 2 remains:**
- chrome keys in 9 catalogs;
- `international-travel.<lang>.json` overlays for the 9 `PROSE_TRANSLATED` locales;
- the Phase 2 checks;
- open the PR, flip INDEX to Implemented, merge.

**Post-review change (2026-10-11, user-approved before Phase 2): the Where They Go ledger
scrolls inside a capped frame on desktop.**
- At ≥701px `.it-ledger-frame` caps at 640px, so the ledger ends level with the photo
  and "Also on the record" column. That column is ~713px, and the tabs + frame come to
  ~700px. Before this, ~1,200px of ledger trailed beside an empty column.
- The division tabs and the "N trips shown" count sit outside the frame and stay put.
- Changing the filter resets the frame to the top.
- `useVerticalFade` (in the component) sets `data-fade-top` / `data-fade-bottom` for
  mask fades. It is the vertical counterpart of `useScrollEdges`, which is sideways-only.
- **Below 701px and in print the cap is removed**: a nested scroll box traps a thumb on
  a scrolling page, and a capped frame would cut a print-out.
- The frame is focusable (`role="region"`) and labelled by a new chrome key,
  `travel.ledgerLabel` = "Trips by school year". Phase 2 must translate it with the rest
  of `travel.*`.
- Verified in Chrome: 640px cap, fades toggling top/bottom with scroll, MS filter →
  307px with no fade and scrollTop 0; at 390px no cap and no overflow; print media
  uncapped; `audit:mobile` clean.
