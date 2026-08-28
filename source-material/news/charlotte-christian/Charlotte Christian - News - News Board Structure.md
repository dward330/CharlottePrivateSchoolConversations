# Charlotte Christian School — News Board Structure

## Provenance

- **Captured by:** Claude (Claude Code), 2026-08-28, via `/add-school-news`.
- **Method:** `curl` with a desktop User-Agent against the live board and all 9
  article pages, plus feed/API probes. No headless rendering was needed — every
  post is server-rendered in the raw HTML.
- **School slug:** `charlotte-christian`
- **Board URL (USER-SUPPLIED, 2026-08-28):**
  <https://www.charlottechristian.com/about/knights-headlines>
- **Index URL ("All news & media"):** same page. The user supplied one URL; it is
  the school's permanent "Knights Headlines" board and is used for both.

## CMS

**Finalsite** — the third Finalsite board in the app, after Providence Day and
Charlotte Catholic. Markers: `fsElement` (122), `fsPostElement`, `fsBoard-164`,
`data-board-id="164"`, `article[data-post-id]`.

**It differs from BOTH siblings**, which is why the one-parser-per-school rule is
load-bearing here rather than merely tidy:

| | Providence Day | Charlotte Catholic | **Charlotte Christian** |
|---|---|---|---|
| Date on board | `<time datetime>` | `<time datetime>` | **none at all** |
| Date on article page | yes | yes | **none at all** |
| Photos | yes | **none** | **yes, all 9** |
| Image JSON encoding | HTML entity | percent | **entity on board, percent on article pages** |
| Board summary | none | none | none |

A parser ported from either sibling produces a plausible, wrong result: from
Providence Day, an empty date selector; from Charlotte Catholic, photo-less rows.

## Selector table (verified 2026-08-28)

| Field | Selector | Notes |
|---|---|---|
| Items | `article[data-post-id]` | **9 posts.** The page holds 13 `<article>`; 4 are layout furniture with no post id and must be excluded by the attribute, not the tag. |
| URL | `div.fsTitle a[href]`, fallback `a.fsPostLink[href]` | Already absolute (`/post-details/~board/knights-headlines/post/<slug>`) |
| Title | `div.fsTitle > a` | `textContent.trim()` |
| Date | — | **ABSENT — see Trap 1** |
| Photo | `img[data-image-sizes]` | JSON array of `{url,width}` — **see Trap 2**. Present on all 9. |
| Summary | — | absent; needs a per-article fetch |
| Preview | first `<p>` >60 chars inside `div.fsBody`, captions and boilerplate skipped | **not** `og:description` — see Traps 3 & 4 |
| Tags | `ul.fsTags li.fsTag` | e.g. ACADEMICS, FINE ARTS — **not currently rendered** |

## Fields present vs absent

- **Present:** title, URL, photo (9/9), body prose for previews (9/9), tag list.
- **Absent:** publish date (anywhere on the site), board summary/excerpt.

## Traps

### Trap 1 — the school publishes NO DATE ANYWHERE (verified, not inferred)

The board listing has **zero** `<time>`, `datetime=`, `.fsDate`, `.fsPostDate`.
The **article pages have none either** — no `<time>`, no
`article:published_time`, no schema.org `datePublished`, and no date-shaped text
anywhere in the rendered prose (checked with `Month D, YYYY`, `D/M/YYYY` and
ISO patterns).

There is **no feed to fall back on**. All of these 404:

```
/about/knights-headlines?format=rss
/rss
/feed
/apps/news/news_rss.jsp?id=0     (the Finalsite path Carmel Christian uses)
/api/v1/news?board_ids=164       (/api/v1/news itself 200s but 404s per-board)
```

This distinguishes the school from **Cannon**, which is also dateless *on its
board* but keeps the date on the article page and therefore supplies a
`publishedAt` hook. Charlotte Christian has nothing for such a hook to fetch, so
it supplies none and every item carries `date: null`.

**Consequences, both deliberate:**

1. `normalizeItems` sorts undated items last but **stably**, so the board's own
   DOM order — the school's chosen newest-first ordering — is preserved rather
   than scrambled.
2. The rendered rows have no date cell at all. `.news-row.no-date` drops the
   64px grid track rather than rendering an empty column; see the app-layer note
   below.

### Trap 2 — photos are in `data-image-sizes`, in TWO different encodings

Finalsite never puts the real image URL in `src` (on the article pages `src=""`
literally). It hides a JSON array of `{url,width}` in `data-image-sizes`.

On this one site the encoding is **not consistent**: the BOARD entity-encodes it
(`&quot;url&quot;`, 99 occurrences) while ARTICLE pages percent-encode it
(`%22url%22`). A decoder handling only one finds zero photos on the other and
renders photo-less rows — which looks exactly like a correct "this school
publishes no photos" result. The parser handles both.

All 9 posts carry a photo, so a photo-less result means the parser broke.

### Trap 3 — `og:description` is boilerplate

Every article page returns the literal string
`"Charlotte Christian School - Charlotte Christian School"` as **both** its
`og:description` and its `<meta name="description">`. Non-empty, so it passes a
naive check, and it would ship the school's name twice as the preview on every
row.

### Trap 4 — a 442-char legal notice sits on every article page

Every post ends with the school's non-discrimination notice:

> "Charlotte Christian School admits students of any race, color, national and
> ethnic origin to all the rights, privileges, programs, and activities
> generally accorded or made available to students at the school…"

It is long, grammatical and prose-shaped, so a "first `<p>` over 60 chars" rule
applied to the whole page ships it as a preview whenever the real lede is
shorter. The margin is thin: the baseball post's entire body is one 88-char
paragraph.

**Excluded structurally, not by wording:** the notice lives **outside**
`div.fsBody`, in page furniture below the post. Scoping the preview search to
that container drops it on all 9 posts without a text rule that a reworded
notice would defeat. A wording guard is kept only as a cheap backstop.

### Trap 5 — captions

No post currently leads with a captioned `<figure>`, but the structural caption
guard (`figure`/`figcaption`/`.fsImageCaptioned`/`.fsCaption` + a `Pictured:`
text backstop) is kept, because that defect was invisible to a `curl` pass on
Providence Day and only appeared in a browser check.

## Verification

All 9 posts resolve a real, on-topic preview under these rules:

| Post | Preview resolves |
|---|---|
| From Script to Stage: ACT 1 Performance Labs | ✅ |
| Varsity Baseball Team wins State Championship | ✅ (88-char body — the thin-margin case) |
| Knights Accolades: Middle and Upper School Musicians | ✅ |
| West Point and Air Force Academy Bound Graduates | ✅ |
| Making Their Move: Middle School Chess Team | ✅ |
| Upper School Students Earn Awards from NCSDA | ✅ |
| Faculty Spotlight: Stephanie Switzer | ✅ |
| ACT 2 Hosts Shepherd Shakespeare | ✅ |
| Knights Nations Club | ✅ |

> **A note on method.** An earlier pass of this check reported "no preview" for 3
> of the 9 posts. That was a **bug in the throwaway test harness**, not a finding
> about the site: a non-greedy `<div ...>(.*?)</div>` regex truncated the body at
> the first nested `</div>`. It is recorded here because it is exactly the
> failure mode this skill warns about — a plausible-but-wrong result that reads
> as a real editorial finding ("some articles have no body text") and would have
> been written into this file as fact.

## CORS

```
curl -sSI -L https://www.charlottechristian.com/about/knights-headlines | grep -i access-control-allow-origin
→ (no header)
```

No `Access-Control-Allow-Origin` — as expected, and why the Cloudflare Worker
relay exists. The apex `charlottechristian.com` **302s to `www.`**, so both forms
are listed in the Worker's `ALLOWED_HOSTS`.

Verified through the relay 2026-08-28 after redeploy:

```
board   → 200
article → 200
```

## App-layer note (beyond the parser)

This is the **first school in the app with no date at all**, which exposed a
rendering gap in the shared component: `.news-row` is a fixed
`64px 1fr auto` grid and the date `<span>` was unconditional, so a null date
rendered an empty 64px column plus its 16px gap — indenting all 9 rows with
nothing to explain the space.

Fixed by omitting the cell and collapsing the track (`.news-row.no-date`),
exactly as a photo-less row omits its thumbnail rather than rendering an empty
box. This changes no other school: every existing school publishes dates, so the
`no-date` class is never applied to them.
