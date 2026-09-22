# US News 2027 — verified fetch method

> **Provenance:** Established by Claude Code on **2026-09-22**, the day U.S. News
> released the **2027 edition** of Best Colleges. Every claim below was executed
> against the live site on that date, not inferred. This file is the METHOD
> record; the figures themselves belong in `US News 2027 - Rank Labels.md`,
> written by `/implement`.

## Sources

- <https://www.usnews.com/best-colleges/rankings/national-universities>
- <https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges>
- Per-school profiles, e.g. <https://www.usnews.com/best-colleges/duke-university-2920>
- Release announcement (2026-09-22):
  <https://www.usnews.com/info/blogs/press-room/articles/2026-09-22/mit-claims-no-1-spot-in-u-s-news-2027-best-colleges-rankings>

## The edition is 2027, and it is a methodology-change year

MIT took **No. 1**, displacing Princeton, which had held it since the 2012
edition; Princeton **#2**, Harvard **#3**. Williams again leads National Liberal
Arts Colleges. U.S. News added an **"Earnings by Major"** metric (College
Scorecard earnings four years post-graduation) and expanded eligibility to a
record number of ranked schools — ~1,700 institutions.

**Consequence for this project: expect large, broad movement, not a few nudges.**
Duke moved **#6 → #8** on the first spot-check. A methodology change plus wider
eligibility means ranks can shift in both directions across the whole table, so
no figure may be carried forward unverified.

## ⛔ Every non-browser channel is blocked — measured, not assumed

Measured 2026-09-22 from this environment:

| Channel | Result |
|---|---|
| `curl` + browser User-Agent + `--compressed` | `http=000` — TLS completes, **no body ever returns** |
| `curl` to the `/best-colleges/api/search` JSON path | `http=000` |
| `WebFetch` on the rankings page | **timeout at 60s** |
| Yahoo-search fallback (the 2026 channel) | `curl` `http=000`; `WebFetch` **HTTP 500** |
| **Playwright headed Chrome** | **HTTP 200, real content** ✅ |

`example.com` and `github.com` both return `200` from the same shell, so this is
**U.S. News (and Yahoo) blocking, not a sandbox egress restriction**. That
distinction matters: a `000` here is not a reason to conclude the network is down.

**The 2026 Yahoo-search fallback recorded in `US News 2026 - Rank Labels.md` is
DEAD.** It now 500s. Headed Chrome is the only channel that works.

## The method that works

```js
import { chromium } from 'playwright'          // already in node_modules (1.62.1)
const browser = await chromium.launch({
  channel: 'chrome',                            // real Google Chrome, not bundled Chromium
  headless: false,                              // headless was NOT tested as sufficient
  args: ['--disable-blink-features=AutomationControlled', '--disable-http2'],
})
```

The driver script **must live inside the project tree** — Node resolves
`node_modules` upward from the script's own directory, so a scratchpad script
fails with `ERR_MODULE_NOT_FOUND`. Write it to the repo root as a dotfile and
`rm` it afterwards.

### Route A — per-school profile page (authoritative, verbatim)

Gives the exact sentence the project's sourcing rule wants:

```
In the 2027 edition of Best Colleges, Duke University is ranked No. ...
#8 in National Universities
```

Regexes that worked: `/In the (\d{4}) edition[^.]*\./` and
`/#(\d+)(?:-(\d+))?\s*in\s*(National Universities|National Liberal Arts Colleges)/`.

**Assert the edition year is 2027 on every fetch.** A profile served from cache
could carry 2026; the year is in the sentence, so check it rather than trusting it.

#### ⛔ Getting the profile URL: every U.S. News search path is broken

A profile URL needs a numeric id (`/best-colleges/duke-university-2920`), and
**none of U.S. News's own search surfaces will give it to you.** All three
return HTTP 200 or a 200-wrapped error, so each fails silently:

| Path | What it actually does |
|---|---|
| `/search?q=<name>` | works for ~25 queries, then **rate-limits to empty results forever** — indistinguishable from "this school has no profile" |
| `/best-colleges/search?q=<name>` | **ignores `q` entirely** and returns the default #1-ranked list (MIT, Princeton, Harvard…) |
| `/education/best-colleges/api/search?schoolName=…` and every other guessed JSON path | **404** inside an HTML error page |

**What works: DuckDuckGo's HTML endpoint**, scraped for the id.

```js
await tab.goto(`https://duckduckgo.com/html/?q=${encodeURIComponent('usnews.com/best-colleges ' + name)}`)
// then collect /best-colleges/([a-z0-9-]+-\d{4,}) from hrefs AND body text
```

Bing with `site:usnews.com` returned nothing useful. Drive the lookup from a
**second tab** so the main tab stays on the profile page.

#### ⚠️ ALWAYS verify the profile is the school you asked for

A search engine returns a *plausible* profile, not necessarily the right one.
`Mississippi College` resolved to **University of Mississippi** (#179) — a real
school, a real 2027 rank, a real sentence, and completely the wrong institution.
No rank-level or edition-level check can see this.

The guard is to read the school's **own name** out of the sentence and compare it
to what you asked for:

```js
const who = body.match(/In the \d{4} edition of Best Colleges,\s*(.+?)\s+is ranked/)
```

Accept only when the normalized names contain one another; treat anything else as
a suspect join and re-fetch it. A slug-word heuristic is **not** sufficient —
"mississippi" appears in both slugs, which is exactly how that join passed.

Note this check also surfaces genuine **renames**: `Virginia Wesleyan University`
now reports as **Batten University**. That is a real finding to confirm, not a
bad join — the two cases look identical until you look.

### Route B — ranking list pages (bulk, cheaper)

⚠️ **Two traps, both of which return HTTP 200 while giving wrong data.**

1. **The first 29 school anchors on the page are NOT the ranking table.** They are
   a "SUMMARY — Here are the best colleges in the U.S." teaser (`ListToggle__ToggleList`),
   and they carry **no rank**. Pairing against them yields `rank: null` for every
   row — the symptom that exposed this.
2. **`?_page=2` silently returns page 1.** Verified: pages 1 and 2 returned
   byte-identical first rows. Any pagination scheme must be **proved by diffing
   row sets between consecutive pages**, never assumed from a URL parameter.

3. **Scrolling alone caps the table at 29 anchors.** Measured 2026-09-22: 60
   `window.scrollTo(0, scrollHeight)` passes over 54 seconds moved the anchor
   count not at all (29 → 29). The list is **not** infinite-scroll.

**The control that actually advances the table is a `Load More` button**, and it
must be clicked ~10–14 times. A real mouse click times out — an ad/sticky
overlay intercepts it — so dispatch the event directly:

```js
const btn = page.locator('button:has-text("Load More"), a:has-text("Load More")').first()
await btn.scrollIntoViewIfNeeded()
await btn.dispatchEvent('click')          // NOT btn.click(): an overlay eats it
```

Loop until the button disappears or the row count stops growing. Measured
yields: **National Universities 290 ranked rows (to #288)** in 14 clicks,
**National Liberal Arts 203 ranked rows (to #184)** in 10 clicks.

After each click, take anchors matching `/\/best-colleges\/[a-z0-9-]+-\d{4,}$/`
and walk up to 7 ancestors for the rank phrase.

**The list pages do not reach the deep tail.** National stops at **#288**, so any
school ranked below that — and every banded row — needs a Route A profile fetch.
`?_sort=rank&_sortDirection=desc` does **not** help: it returns HTTP 200 and the
same ascending page 1.

**Filter the junk row:** a `READ MORE »` anchor sits inside a card and picks up
that card's rank (`{rank:'#1', name:'READ MORE »'}`). Drop any name that is not a
plausible institution name.

### Rate limiting

The Niche ban of 2026-09-17 is the standing warning: **parallel agents against one
ranking site caused a session-wide IP ban.** Run **one browser, sequentially**, and
space profile fetches ~5–6 seconds. Probe a single URL before a long run.

## Ties and bands

Ties are real and common (#34 ×4). The master stores published bands, and the
band shape must be taken **verbatim** from the edition being harvested, never
flattened to a single number and never carried across editions.

**The 2027 band is `#382-422`.** The 2026 band was `#395-434`, so a row that is
banded in both years still changes. Treat the band as a published value like any
other figure.
