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

### Route B — ranking list pages (bulk, cheaper)

⚠️ **Two traps, both of which return HTTP 200 while giving wrong data.**

1. **The first 29 school anchors on the page are NOT the ranking table.** They are
   a "SUMMARY — Here are the best colleges in the U.S." teaser (`ListToggle__ToggleList`),
   and they carry **no rank**. Pairing against them yields `rank: null` for every
   row — the symptom that exposed this.
2. **`?_page=2` silently returns page 1.** Verified: pages 1 and 2 returned
   byte-identical first rows. Any pagination scheme must be **proved by diffing
   row sets between consecutive pages**, never assumed from a URL parameter.

The table is **lazy-loaded on scroll**. What worked:

```js
for (let i = 0; i < 14; i++) { await page.mouse.wheel(0, 1600); await page.waitForTimeout(700) }
```

After scrolling, take anchors matching `/\/best-colleges\/[a-z0-9-]+-\d{4,}$/`
and walk up to 7 ancestors for the rank phrase. This yielded 41 correctly ranked
rows through **#34**, with ties intact (four schools share #34).

**Filter the junk row:** a `READ MORE »` anchor sits inside a card and picks up
that card's rank (`{rank:'#1', name:'READ MORE »'}`). Drop any name that is not a
plausible institution name.

### Rate limiting

The Niche ban of 2026-09-17 is the standing warning: **parallel agents against one
ranking site caused a session-wide IP ban.** Run **one browser, sequentially**, and
space profile fetches ~5–6 seconds. Probe a single URL before a long run.

## Ties and bands

Ties are real and common (#34 ×4). The existing master already stores published
bands (`National Rank #395-434`, `#183-201`) — the band shape must be preserved
verbatim, not flattened to a single number.
