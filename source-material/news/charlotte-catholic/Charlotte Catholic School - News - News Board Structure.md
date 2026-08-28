# Charlotte Catholic School — News Board Structure

## Provenance

- **Captured:** 2026-08-28 by Claude (add-school-news skill), from the live board.
- **Method:** `curl` with a desktop User-Agent for the board and all 18 linked article
  pages, then the parse behaviour verified by running the **shipping parser itself** in a
  real Chromium via Playwright. That was the decisive test, not a formality — see the
  "Verification log" below, where the browser run corrected two conclusions a `curl` +
  regex inspection had reached.
- **Source URL — USER-SUPPLIED 2026-08-28** (not derived, per the skill's step 1):
  `https://www.charlottecatholic.org/community/news`

## URLs

| Role | URL |
|---|---|
| `boardUrl` (parsed) | `https://www.charlottecatholic.org/community/news` |
| `indexUrl` ("All news & media") | `https://www.charlottecatholic.org/community/news` |

The user supplied **one URL**. It is a human-readable HTML board, so it serves as both the
parse target and the reader destination — the same arrangement as Providence Day and
Cannon, and unlike Carmel Christian (whose board is machine-readable XML).

**Apex redirects to `www`:** `https://charlottecatholic.org/...` 302s to
`https://www.charlottecatholic.org/...` (verified 2026-08-28). Both forms are therefore
registered in the Worker's `ALLOWED_HOSTS` — a redirect between them is invisible until it
403s.

## CMS

**Finalsite** (`fsElement`, `fsBoard-6`, `data-post-id`, `fsPostLink`). Asset host is
`resources.finalsite.net`.

This is the **second Finalsite board** in the app, after Providence Day. The parser is
deliberately NOT shared with that school's — and this site is the case that justifies the
rule, because the same CMS ships a materially different board here:

| | Providence Day | **Charlotte Catholic** |
|---|---|---|
| Article photos | yes, per post | **none at all** |
| `data-image-sizes` encoding | HTML entities (`&quot;`) | **percent (`%22`)** |
| Board summary | absent | absent |
| Body container | `.fsPageBody` | **`div.fsBody`** (exactly one per page) |
| Prose element | `<p>` | `<p>` **and bare `<div>` on video posts** |

## Field map

Board listing — `article[data-post-id]`, **20 posts** present and server-rendered.

| Field | Selector | Notes |
|---|---|---|
| Items | `article[data-post-id]` | 20 in the DOM |
| Title | `div.fsTitle a` | `textContent.trim()` |
| URL | `div.fsTitle a[href]`, fallback `a.fsPostLink[href]` | already absolute |
| Date | `time[datetime]` | ISO-8601, e.g. `2026-08-28T07:50:00-04:00` |
| Photo | — | **absent** — see TRAP 1 |
| Summary | — | **absent** — needs a per-article fetch (TRAP 3) |
| Preview | first leaf block >60 chars in `div.fsBody`, captions skipped | **not** `og:description` (TRAP 2) |

The board emits **two `<time>` elements per post** (`.fsDate` and `.fsTime`) sharing one
`datetime` value, so the first match is correct and the pair needs no special handling.

## CORS

```
$ curl -sSI -L "https://www.charlottecatholic.org/community/news" | grep -i access-control-allow-origin
(no output)
```

**No `Access-Control-Allow-Origin` header** — expected, and the reason the news-proxy
Worker is load-bearing for this school. Served behind Cloudflare (`server: cloudflare`).

## Traps specific to this site

### TRAP 1 — this board publishes NO article photos, and that is a REAL finding ⚠️

The board listing carries **no `<img>` at all** (0 of 20 posts). The article pages carry
exactly **six images each, and they are identical on every page**: the CCHS `LogoCrest`
plus the Diocese of Charlotte, Catholic Schools, MACS and Lumen accreditation crests in
the footer. There is no hero image and no thumbnail anywhere.

This was established by **inspection**, not concluded from a scrape that came back empty,
because the two available mistakes are symmetrical and **both ship silently**:

- **Missing real photos** — the classic Finalsite trap, where URLs hide in
  `data-image-sizes` and never in `src` — renders every row photo-less, which looks
  exactly like a correct application of the "some articles have no photo" rule.
- **Scraping `data-image-sizes` naively** finds those six footer crests on every article
  and would stamp an *accreditation logo* on all ten rows as if it were the story's photo.

The uniform per-page count (6 on every article, 8 on one) was the tell that prompted
opening the URLs rather than trusting the number.

**If CCHS later adds article images, note the encoding differs from Providence Day's:**
this site **percent-encodes** the JSON (`[{%22url%22:%22https://…%22,%22width%22:256}]`),
where Providence Day HTML-entity-encodes it. A port of that parser would decode nothing,
find zero photos, and appear to be working correctly.

### TRAP 2 — `og:description` is boilerplate

Every article page returns the literal string:

```
News Details - Charlotte Catholic High School
```

Verified **identical across all 18 fetched articles**. It is non-empty, so it passes a
naive check and would ship the same sentence as the preview on every row.

It is in one way **worse than Providence Day's** equivalent (`"News Post"`): this string is
long and sentence-shaped, so on a rendered page it reads as a plausible preview rather
than as obvious filler.

### TRAP 3 — the board carries no summary, so previews need a per-article fetch

A board post is a title, a link and a timestamp — nothing else. Unlike Carmel Christian's
RSS feed, there is no `<description>` to use, so this school needs the `preview` second
pass (like both other Finalsite schools).

### TRAP 4 — a short lede paragraph must be SKIPPED, not shipped

Two posts open with a paragraph under 60 chars — `History made.` and
`For Immediate Release: January 31, 2026`. The `>60` rule steps past both to the real
opening sentence. This is desired behaviour rather than an accident: `History made.` alone
tells a parent nothing about the story.

### TRAP 5 — a VIDEO post keeps its prose in a `<div>`, not a `<p>` ⚠️

Two posts (the president announcement, the bishop's letter) embed a Vimeo iframe and then
write their body copy in bare `<div>`s. Their **only `<p>` is an empty `&nbsp;` spacer**, so
a `<p>`-only rule returns no preview for either — safe, but it silently drops the preview
from a top-of-board story.

**The naive fix is worse than the defect.** Widening the search to `<div>` makes the first
long `<div>` on those same pages the **site nav flattened into one run**:

```
DirectoryCalendarMake a GiftLunch MenuContact UsCorporate Partners
```

That is over 60 chars and reads as garbage. The parser therefore considers **leaf blocks
only** — elements containing no nested block of their own — which selects the prose `<div>`
and rejects every wrapper that swallows chrome. Verified in the browser: the president post
recovered real prose, while the nav `<div>` was still rejected on the other.

## Verification log (2026-08-28)

Board fetched HTTP 200, ~82KB. All 18 linked article pages fetched HTTP 200.

**The Playwright run corrected two conclusions from the `curl` + regex pass** — recorded
because both would otherwise have been written into this file as fact:

1. **Item count is 20, not 18.** A regex over the raw HTML matched only 18 `<article>`
   blocks; the real DOM has 20. The DOM is authoritative, and two posts
   (`AP exam payment reminder`, `2026-2027 Textbook & Course Materials Information`) were
   missing from the regex pass. Article-page checks below therefore cover 18 of 20.
2. **Two posts genuinely have no `<p>` preview.** The regex pass returned a masthead
   epigraph (`"The Soul of Education is the Education of the Soul" - Pope Pius XI`) for
   them; that text lives **outside** `div.fsBody` and was page chrome. Correct scoping
   exposed the real problem, which was TRAP 5.

Final parser results, run in Chromium against the live captures:

- `parse()` → **20 items**, every one with a title, an absolute URL and an ISO date.
- `preview()` → **17 of 18** article pages return real body prose.
  The one `undefined` is a **video-only post** (the bishop's letter) that has no body text
  at all; it sits outside the top-10 cap and renders with no preview line, which is the
  designed behaviour rather than a failure.
