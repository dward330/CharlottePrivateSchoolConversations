---
name: latestnews
title: Latest News section — live school news on every school page, one custom parser per school
status: not-implemented
phases: 1
created: 2026-08-27
branch: feat/latest-news
prs: []
---

# Latest News section

## Goal

Add a **Latest News** section to school dossier pages, showing the 7–10 most recent
articles from the school's own news board — a featured lead card plus list rows, live-parsed
at section load with a designed loading experience.

Scope for the first implementation pass is **Providence Day only**. The section, the shared
UI, the fetch/parse plumbing and the per-school parser registry are all built to carry the
remaining ten schools, but only one parser ships. Adding school #2 is then a
[repeatable, documented procedure](#adding-the-next-school-the-repeatable-part) — see also
the companion skill `.claude/skills/add-school-news/SKILL.md`.

Design reference: `Providence Day School.dc.html` (section `id="news"`) in the Claude Design
project *Charlotte School Compare Website Design*
(`5da24575-40bf-4787-8934-0fadfc56059f`), plus its handoff doc
`latest-news-handoff-instructions.md`.

## This plan is SINGLE-PHASE — the news section is deliberately NOT translated

**The Latest News section stays in English in every locale. This is a deliberate decision,
not an oversight, and not deferred work.**

This is the one place the project's standing English-first/translate-second rule is
switched off, so it needs stating plainly or a future i18n pass will "fix" it:

- **The content is untranslatable in principle.** Article headlines, dates and preview
  sentences are fetched live from the school's website at render time. There is no
  extraction step, no work file, no overlay, and no point at which a translator could see
  the strings — tomorrow's headline does not exist today.
- **It is a citation surface.** A parent matches a headline against the school's own news
  board, exactly as they match a tuition figure against the school's published page. The
  same reasoning that keeps figures copied char-for-char keeps headlines in the source
  language.
- **Machine-translating headlines at render time is explicitly rejected.** It would put
  unreviewed text on the page in nine locales with no native-speaker review possible —
  the one failure mode this project has spent nine rollouts closing.

### What that means concretely

| Layer | Translated? |
|---|---|
| Article headline, date, preview sentence, photo alt | ❌ **No** — English/source, as published |
| Section chrome (heading "Latest News", "Read the story", "All news & media", status lines, error text) | ✅ **Yes** — normal `src/locales/*.json` chrome keys |

The **chrome is chrome** and follows the normal rule: every new UI string is a locale key
in all ten catalogs, or `npm run check:chrome` fails the build. Only the *fetched article
content* stays English.

Because no research prose is added, there is **no `PROSE_TRANSLATED` work**, no overlay, no
extraction, and no Phase 2. Phase 1 ships the whole feature.

**Do not add the news section to `i18n_topics.mjs`, the prose extractor, or any overlay.**
It is not a research area and holds no `src/data` prose.

## Context

### The blocking constraint: CORS, and why the fetch path is what it is

The app is a **static site on GitHub Pages** (`npm run deploy` → `gh-pages -d dist`). There
is no backend and no serverless function.

Providence Day's board URL — **user-confirmed 2026-08-27**, and the only URL needed for
that school (it serves as both the parse target and the "All news & media" destination) —
is `https://www.providenceday.org/about/pd-communications/news-media`. Measured that day, it
returns HTTP 200 to `curl` but sends **no `Access-Control-Allow-Origin` header**. A direct
browser `fetch()` from `charlotteschoolinsights.com` is therefore blocked by the
same-origin policy — for every school, for every visitor. This is a property of the
schools' servers; no parser change affects it.

**The user chose a CORS proxy** (over build-time prefetch and over a Cloudflare Worker),
having been shown the trade-off. So the runtime path is:

```
browser → CORS proxy → school news board → parse in browser → render
```

**Known and accepted risk:** a public CORS relay is rate-limited and can fail without
notice. When it does, visitors get the designed error state instead of news. This is why
the error state below is a required deliverable, not a nicety. Should the flakiness prove
unacceptable in practice, the migration path is a Cloudflare Worker: it changes **one
constant** (the proxy URL) and no parser code, because all parsing is already isolated
behind `fetchNews()`.

### What the Providence Day board actually yields (verified 2026-08-27)

Full detail and the raw capture:
`source-material/news/providence-day/Providence Day - News - News Board Structure.md`.

Platform is **Finalsite**. The board is server-rendered — all 10 articles are in the raw
HTML, no JS execution needed.

| Field | On board page? | Selector |
|---|---|---|
| Article URL | ✅ | `a.fsPostLink[href]` |
| Title | ✅ | `div.fsTitle > a` |
| Date | ✅ | `time[datetime]` — ISO-8601 |
| Photo | ✅ | `img[data-image-sizes]` — entity-encoded JSON |
| Summary | ❌ **absent** | — |

**Two traps, both of which silently produce wrong output:**

1. **Photos are not in `src`.** The `<img>` has no `src` attribute; URLs live in
   `data-image-sizes` as HTML-entity-encoded JSON. A naive `src="…jpg"` scrape finds
   **zero** images and would wrongly render every row photo-less — looking like a correct
   application of the "some articles have no photo" rule while actually being a parser bug.
2. **`og:description` is the literal string `"News Post"`** on every article page. It is
   boilerplate, not a summary — worse than absent, because it passes a non-empty check.
   Real preview text is the first substantive `<p>` of the article body.

### Consequence: previews cost a second fetch

The brief requires a non-empty preview on every item. Since the board carries no summary
and `og:description` is boilerplate, previews come from **per-article fetches** (10 extra
requests through the proxy).

**Decision: fetch article bodies concurrently, but degrade gracefully.** Render the list as
soon as the board parse resolves; previews fill in as they arrive. An article whose body
fetch fails renders with its headline and date and **no preview line** — never an empty
element, never a spinner that outlives the section. This keeps the section useful when the
proxy is throttling, which is exactly when 11 sequential requests would otherwise hang.

This is a deliberate softening of "never leave the preview empty": that rule is honored
whenever the fetch succeeds, and the failure mode is a missing line rather than a stalled
section.

## Design spec (from the reference file — match exactly)

### Placement — mirror Welcome Video precisely

Welcome Video is the existing precedent for "on the page but not a research area", and the
news section copies its three insertion points in `src/pages/SchoolDetail.tsx`:

| # | What | Where today |
|---|---|---|
| 1 | Header TOC chip, `class="chip chip-accent"` | `SchoolDetail.tsx:452` — news chip goes immediately after |
| 2 | Left-rail item, above the "Research areas" group label | `SchoolDetail.tsx:504` — news item after `dossier-nav-welcome`, still above `dossier-nav-label` |
| 3 | The section itself, before Course Offerings | `SchoolDetail.tsx:554` — `<LatestNews>` after `<WelcomeVideo>` |

Each is guarded by whether the school has a news source, exactly as Welcome Video is guarded
by `brand.welcomeVideoUrl`. **A school with no parser renders no chip, no rail item and no
section** — the same absence-of-data principle the project already applies to omitted cards.

Section id is `news`, `scroll-margin-top: 80px`. Both TOC entries use the **newspaper icon**
(Lucide, stroke 1.5) and the brand-tinted chip treatment:

```
color: var(--brand);
border: 1px solid color-mix(in srgb, var(--brand) 45%, transparent);
background: color-mix(in srgb, var(--brand) 8%, transparent);
```

### Section header

Newspaper glyph in `var(--brand)` · `<h2>Latest News</h2>` at 30px · muted note reading
`{n} most recent · from {domain}`.

### Featured card (newest article)

`display: grid; grid-template-columns: 360px 1fr` inside `.blueprint`:

- **Left:** `.duotone` photo, `min-height: 220px`, right divider.
- **Right:** kicker `Newest · {date}` (11px, `0.12em`, uppercase, `var(--brand)`) ·
  headline (heading font, 600, 26px, `line-height: 1.15`) · preview (muted, 14px) ·
  `Read the story` + arrow, pushed down with `margin-top: auto`.
- **No photo →** collapse to a single full-width text column. **Never an empty image box.**

### List rows

`grid-template-columns: 64px 1fr auto`, `gap: var(--space-4)`, `padding: 13px var(--space-4)`,
`border-top: 1px solid var(--color-divider)`, hover
`background: color-mix(in srgb, var(--brand) 4%, transparent)`:

- **Date column:** `Aug 10` — 12px, `0.05em`, uppercase, heading font, muted.
- **Middle:** headline (heading font, 600, 17px) + preview (muted, 13px, `margin-top: 3px`).
- **Right:** `.duotone` thumbnail `92×58` with a divider border, then the external-link
  arrow at 15px. **No photo → omit the thumbnail entirely, keep the arrow**; the `auto`
  column absorbs it.

Whole row is one `<a target="_blank" rel="noopener">`.

### Footer bar

`Pulled from the school's News & Media board` (muted, 12.5px) on the left; `All news & media`
+ arrow linking to the school's news index on the right.

### Loading experience

Keyframes copied from the reference (`newsPulse`, `newsSpin`, `newsBar`, `newsFadeIn`):

```css
@keyframes newsPulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
@keyframes newsSpin  { to { transform: rotate(360deg); } }
@keyframes newsBar   { 0% { left: -30%; } 100% { left: 100%; } }
@keyframes newsFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
```

Structure: `aria-busy="true" aria-live="polite"` wrapper → spinning crosshair + uppercase
status line + domain on the right → 2px sweeping hairline → skeleton featured card →
**5** pulsing skeleton rows. Reveal wraps in `animation: newsFadeIn 0.4s ease`.

**The status line is tied to real parse phases, not a timer.** The design's 2.4s
`setTimeout` is a mock and must not ship:

| Phase | Status text | Fires when |
|---|---|---|
| 1 | `Contacting {domain}…` | request dispatched |
| 2 | `Parsing the news board…` | board HTML received, parse begins |
| 3 | `Extracting headlines and photos…` | items extracted, previews in flight |

**Respect `prefers-reduced-motion`** — suppress spin/sweep/pulse and show a static status
line. (Not in the reference; required for the app's accessibility baseline.)

### Error state

Short message + `All news & media` link to the school's news index. Never a skeleton that
spins forever. Applies to: proxy failure, non-2xx, network error, timeout, and a
**successful fetch that yields zero items** (a site redesign — the parser is stale).

Add an explicit **timeout** (~12s) so a hanging proxy lands in the error state rather than
spinning indefinitely.

## Build steps

### 1 — Types and the shared shape

`src/lib/news/types.ts`:

```ts
export type NewsItem = {
  title: string        // required
  url: string          // required, absolute
  date: string | null  // ISO-8601 when parseable
  photo?: string       // absent is normal and expected
  summary?: string     // filled by the preview pass; may stay absent
}

export type NewsSource = {
  boardUrl: string     // page the parser fetches
  indexUrl: string     // "All news & media" destination; MAY equal boardUrl
                       // (Providence Day: same URL for both, per the user)
  domain: string       // shown in the header + status line
  parse: (html: string, boardUrl: string) => NewsItem[]
  /** Optional: pull a preview from one article page. */
  preview?: (html: string) => string | undefined
}
```

Normalize in one place: absolutize URLs against `boardUrl`, drop items missing a title or
URL, de-duplicate by URL, **sort newest-first**, **cap at 10**.

### 2 — Fetch layer

`src/lib/news/fetchNews.ts` — the only module that knows about the network:

- `PROXY` as a single exported constant, with a comment naming the Cloudflare Worker
  migration path.
- Phase callbacks so the UI can drive its status line from real events.
- `AbortController` timeout (~12s).
- **`sessionStorage` cache keyed by school slug, ~30 min TTL** — the brief's "sensible
  caching if the stack allows". Stops a re-visit from re-hitting the proxy and blunts rate
  limiting. Cache read/write must be `try/catch`-wrapped (private-window and blocked-storage
  contexts throw).
- Parse HTML with `new DOMParser().parseFromString(html, 'text/html')` — **never** inject
  fetched markup into the live DOM.

### 3 — Providence Day parser

`src/lib/news/parsers/providence-day.ts`, from the verified structure:

- Items: `article[data-post-id]`
- URL: `a.fsPostLink[href]`
- Title: `div.fsTitle > a` → `textContent.trim()`
- Date: `time[datetime]`
- Photo: read `data-image-sizes`, **unescape entities**, `JSON.parse`, choose a mid-range
  width (~640px); wrap in `try/catch` and treat failure as "no photo".
- Preview: first `<p>` in the article body over ~60 chars, truncated to ~160 chars on a word
  boundary. **Never use `og:description`** — it is `"News Post"`.

Registry `src/lib/news/sources.ts` maps slug → `NewsSource`; **absent slug = no section.**

### 4 — Component

`src/components/LatestNews.tsx` exporting `LatestNews` and `NewspaperIcon` — mirroring
`WelcomeVideo.tsx`, which exports `WelcomeVideo` and `PlayIcon` for the same three
placements.

Fetch in `useEffect`; cancel on unmount. States: `loading → ready | error`.

**Lazy-trigger the fetch with an `IntersectionObserver`** so a visitor who never scrolls to
the section never hits the proxy — it sits below the fold, and this materially reduces
request volume against a rate-limited relay. Falls back to fetch-on-mount where the
observer is unavailable.

### 5 — Wire into `SchoolDetail.tsx`

Three insertion points from the placement table, each guarded by
`NEWS_SOURCES[school.slug]`.

### 6 — Chrome strings — all ten catalogs

Add under a `news.*` namespace: section title, `{n} most recent · from {domain}`, kicker
`Newest`, `Read the story`, footer note, `All news & media`, the three status lines, the
error message, and the TOC label.

Translate the **chrome** into all nine non-English locales (it is UI chrome, and
`check:chrome` enforces presence in all ten). The **fetched article content stays English**
— see the no-translation section above.

### 7 — Styles

Section CSS + the four keyframes, alongside the existing `.welcome-*` rules. Use existing
`.blueprint` / `.duotone` / `.text-muted` primitives rather than new ones.

## Verification

```bash
npm run build          # tsc + all chained checkers, incl. check:chrome and check:seo
npm run check:chrome   # news.* present in all ten catalogs
npm run lint
```

Then, in a **real browser** (the project's standing rule — every defect found after data
read 100% has been render-layer):

1. Providence Day page: section between Welcome Video and Course Offerings; chip after
   Welcome Video; rail item above "Research areas".
2. Loading → reveal, with status lines advancing on **real** phases.
3. **Throttle to offline / block the proxy** → error state with a working link, no infinite
   spinner.
4. A school with no parser (e.g. Cannon) → **no chip, no rail item, no section.**
5. Non-English locale → chrome translated, headlines English. This is **correct**; record it
   so review does not read it as a bug.
6. `prefers-reduced-motion: reduce` → no spin/sweep/pulse.
7. Featured article without a photo → text-only full width, no empty box. (Force by
   temporarily stubbing the photo field; PD's current lead has one.)

## Adding the next school — the repeatable part

Steps 1, 2, 4, 5, 6 and 7 are **school-independent and already done** after this plan ships.
Adding school #2 is only:

1. **Get the news board URL from the user, and WAIT for it.** Never derive it — not from a
   design file's links, not from a nav/footer link on the school's own site, not from a
   plausible CMS path, not from a search result. Inferring from a design file is still
   inferring. A plausible-but-wrong URL returns HTTP 200, parses to zero items, and renders
   as an empty section that reads as a code bug rather than a wrong input. Also ask whether
   the board and "All news & media" URLs differ — often they are the same page.
2. `curl` it with a desktop UA. Confirm the articles are in the server-rendered HTML; if
   they are not, the site is JS-hydrated and needs a different approach — stop and report.
3. Identify the CMS and write `src/lib/news/parsers/<slug>.ts`.
4. Save the structure to `source-material/news/<slug>/` with source URLs (provenance
   standard).
5. Register in `sources.ts`.
6. Verify in a browser.

Chrome strings, styles and wiring are untouched — so is translation, because there is none.

The companion skill **`.claude/skills/add-school-news/SKILL.md`** carries this procedure
plus the CMS-specific traps (Finalsite's entity-encoded `data-image-sizes`, boilerplate
`og:description`) so a fresh window does not rediscover them.

## Open decisions for the implementing window

- **Which CORS proxy.** Not pinned here deliberately — pick a current one at build time and
  put it behind the single `PROXY` constant. Re-raise the Worker option if the chosen relay
  proves unreliable in step-3 testing.

## UX approval

Granted by the design handoff itself — a `.dc.html` reference plus
`latest-news-handoff-instructions.md`. Per the UX-design standard, design-MCP-driven work
"is *expected* to change the UX and needs **no** advance approval". The ingestion-time
approval gate does not apply.
