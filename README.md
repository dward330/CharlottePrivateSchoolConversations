# Charlotte Private School Conversations

A parent-facing research tool for comparing **Charlotte-area private (K–12)
schools** side by side. It distils bulky source material — school websites,
philanthropy reports, athletic directories, IRS filings, state admissions data —
into structured, citation-backed cards a family can actually read, and presents
the same research in ten languages.

Live at **[charlotteschoolinsights.com](https://charlotteschoolinsights.com)**.
Built with **React 19 + TypeScript + Vite**.

---

## What it does

The app organizes research on eleven Charlotte-area independent schools:

| | | |
|---|---|---|
| Cannon School | Charlotte Country Day School | Davidson Day School |
| Carmel Christian School | Charlotte Latin School | Gaston Day School |
| Charlotte Catholic High School | Covenant Day School | Hickory Grove Christian School |
| Charlotte Christian School | Providence Day School | |

across eight research areas that matter to families, in the order a school page
renders them:

| Research area | What it covers |
|---|---|
| **Course Offerings** | Per-division course catalogs (Lower / Middle / Upper) |
| **Student Clubs** | Affinity groups, service, honor societies, a filterable club catalog |
| **The Arts** | The TK–12 arts ladder, theatre, music honors, visual arts, verdict |
| **Sports** | Teams offered, records, D1/pro pipeline, coaching, facilities, NIL |
| **College Support** | Admit rates at the top NC public universities, the transcript colleges see, the counseling engine, where graduates go |
| **After School** | Coverage map, a per-day cost planner, enrichment |
| **Summer Programs** | Camps and academic sessions by division, cost, and day pattern |
| **Financial Aid & Tuition** | A section-scored deep-dive: tuition bands, the real cost of attendance, the aid engine, published aid figures |

A research area a school has no material for **does not render at all** — an
empty card is worse than an absent one, so omission is expressed as absence of
data rather than as a conditional in a component.

Three views:

- **Home** — the landing page and an overview of what can be explored.
- **Compare** — schools side by side, one research area at a time.
- **School dossier** — every card for a single school, each expandable to a full
  research note with sources cited on every fact. An **Expand all** button opens
  every card at once (useful for printing).

A school page also carries, where the material exists:

- **Latest News** — headlines fetched live from the school's own news board at
  render time, each linking back to the original post.
- **Podcast deep-dive** — links into the *Charlotte Private School
  Conversations* episodes covering that school and research area, on Spotify and
  Apple.
- **A welcome video** and the school's own brand mark.

Light and dark themes are both supported, via the toggle in the header.

---

## Design principles

**Every fact is sourced.** Cards link the underlying URLs, and the
data-provenance standard (see [`CLAUDE.md`](CLAUDE.md)) requires the hard data
behind any figure to be committed as a `.md` file under `source-material/`
before it reaches the app.

**Research enriches data, never the UX.** Ingesting new source material may add,
correct, or extend the data behind existing cards — but adding a new card,
section, or metric needs explicit approval first. This keeps the interface from
silently growing as a side effect of a research pass. (Explicit design work is
exempt; the rule is about ingestion.)

**Figures are never re-typed.** Tuition and dollar amounts are authored once,
US-style (`$28,500`), and re-formatted at render time. The currency always stays
USD, units are never converted, and the amount never changes across languages —
only the presentation is localized. A parent matches the figure against the
school's own published page, so it is copied char-for-char.

**Non-trivial work is planned before it is built.** `/plan` writes a durable
document to `.claude/plans/`; `/implement` executes it in a fresh window, opens
a PR, and records the result. `/add-school` is the front door for a new school
and reports up front how much of each research area could actually be
populated — measured against the thinnest school already shipped.

---

## Internationalization

The app ships in **ten languages** — English, Spanish, French, Haitian Creole,
Farsi, Bengali (Bangladesh), Arabic, Hindi, Telugu (Andhra Pradesh) and Italian
— of which Farsi and Arabic are right-to-left. Every non-English locale has a
signed-off native-speaker review.

Text is split across two deliberately separate layers:

- **UI chrome** (nav, buttons, labels, captions) lives one file per language in
  `src/locales/<lang>.json`, reached through `react-i18next`. To add a language:
  copy `en.json`, translate the values, then register it in `SUPPORTED` and
  `TRANSLATED` in `src/lib/i18n.ts`.
- **Research prose** (`src/data/**`, `src/content/**`) is *not* in the locale
  files. It is regenerated by the ingest pipeline, so it is translated at the
  data layer via content-hashed sidecar overlays (`src/data/overlays/`), with
  English as the fallback. An overlay entry only resolves if its stamp still
  matches the live English at that field path — otherwise the page falls back to
  English **silently**, which the check suite exists to catch.

**One deliberate exception: the Latest News section is never translated.**
Headlines, dates and preview sentences render in the source language on every
locale's page. The articles are fetched live from the school's website, so
tomorrow's headline does not exist today and no translator could ever see the
string — and a headline is a citation surface a parent matches against the
school's own board. The chrome *around* the articles is translated normally. If
a reviewer reports "the headlines are in English on the Spanish page", that is
correct behaviour.

Numbers, currency and bidi handling all route through `src/lib/format.ts` and
`src/lib/figureLocale.ts`. For the full per-locale reasoning — why Farsi and
Bangla are in `FIGURE_SAFE_NUMBERS` for different reasons, why Hindi and Telugu
are not, how RTL figures are LTR-isolated, why percent signs stay unspaced — see
`src/lib/i18n.ts` and the rollout docs in [`.claude/docs/`](.claude/docs/).

---

## Search indexability

The site is a client-rendered SPA, but every indexable page is **pre-rendered to
a real file** at build time, so crawlers and link-preview scrapers get real HTML.
The whole surface is generated from `src/data/schools.json` — adding a school
automatically adds its pre-rendered page, its sitemap entry and its `hreflang`
alternates. None of it is hand-written.

Path URLs are canonical; the legacy `#/school/…` hash router is kept
permanently, because those links are already shared in the wild.

---

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev        # start the dev server (Vite, HMR)
npm run build      # type-check, build, pre-render, then run the check gates
npm run preview    # preview the production build
npm run lint       # oxlint
```

`npm run build` is more than a build: it chains the schema, i18n-resolution,
chrome-key and data-integrity gates, so a drifted overlay or an unregistered
route fails the build rather than shipping silently.

### Data & i18n check suite

```bash
npm run schema               # regenerate .claude/docs/DATA-SCHEMA.md
npm run check:schema         # …and fail if it has drifted (runs in build)
npm run check:seo            # every route pre-rendered; canonical/sitemap agree
npm run check:translations   # overlay entries whose English has since changed
npm run check:hashes         # build-time and runtime content stamps agree
npm run check:runtime        # every shipped overlay stamp recomputes from the work file
npm run check:live           # …and from the LIVE modules — the stronger check
npm run check:chrome         # every chrome key exists in all ten catalogs
npm run check:script         # each locale's overlay is written in its own script
npm run check:currency       # every money render site localizes
npm run check:money          # money-capable sites don't bypass the formatter
npm run check:bidi           # RTL figures isolate; LTR locales byte-identical
npm run check:sepdrift       # no figure re-typed with swapped separators
npm run check:fa             # Farsi: no Eastern-Arabic digit drift, ZWNJ intact
npm run check:hi             # Hindi: Western digits, lakh/crore grouping
npm run check:fr             # French course-code identifiers stay Latin
npm run check:news           # every declared news host is allowed by the Worker
npm run check:ranks          # ranked colleges show their U.S. News rank label
npm run check:buckets        # filter chips agree with the rank labels
npm run check:memberships    # P4 / HBCU tags agree with the master table
npm run check:ncsuper        # NC admissions superlatives sit on the right campus
npm run check:spans          # non-numeric Compare rows rank correctly
npm run coverage:floor       # per-school Compare fill rate — the /add-school bar
```

---

## Deploying

Two **separate** targets, and both are the maintainer's call — merging a PR is
never publishing:

- `npm run deploy` — builds and publishes the site to GitHub Pages.
- `wrangler deploy` in [`workers/news-proxy/`](workers/news-proxy/) — the
  Cloudflare Worker that relays the Latest News fetches (school news boards send
  no CORS header and this site has no backend). It only needs redeploying when
  `worker.js` changes, in practice when a school joins its `ALLOWED_HOSTS`
  list. A school registered in the app but missing there fails with
  `403 Host not allowed`, which looks exactly like a parser bug.

---

## Project layout

```
src/
  components/     research-card bodies (Sports, Arts, Clubs, News, Podcast, …)
  content/        long-form site prose, per research area
  data/           structured research data + per-locale overlays
  lib/            i18n, formatting, routing, manifest, news fetch + parsers
  locales/        one JSON file per UI language
  pages/          Home, Compare, SchoolDetail
source-material/  committed .md source files (the provenance record)
scripts/          generation, pre-render and check scripts
workers/          the Cloudflare news-relay Worker (deployed separately)
.claude/docs/     DATA-SCHEMA.md, rollout docs, reference material
.claude/plans/    one implementation plan per feature, plus INDEX.md
.claude/skills/   add-school, add-school-news, ingest-source-material, …
```

[`.claude/docs/DATA-SCHEMA.md`](.claude/docs/DATA-SCHEMA.md) is the generated
catalog of every level of school data the app presents — read it to answer "what
do we hold on a school, and where does it live?" without spelunking `src/data/`.

Project standards — the git and publishing rules, the UX-design gate, the i18n
architecture, the data-provenance requirement, and the per-language translation
history — are documented in [`CLAUDE.md`](CLAUDE.md).
