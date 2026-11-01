# news-proxy — CORS relay for the Latest News section

School news boards send no `Access-Control-Allow-Origin` header, so a browser
`fetch()` from `charlotteschoolinsights.com` is blocked by the same-origin
policy. The site is static (GitHub Pages, no backend), so a relay is the only
runtime path. This Worker is that relay.

It replaces the public `corsproxy.io`, which **gates on User-Agent** — measured
2026-08-27, deterministic 6/6: non-browser clients get
`403 "Server-side requests are not allowed on your plan"`. A visitor hit its
failure state the day the news section shipped.

## Deploy

```bash
npx wrangler login                    # one-time, opens a browser
cd workers/news-proxy
npx wrangler deploy
```

The relay lives at `https://news.charlotteschoolinsights.com`, set in `routes` in
`wrangler.toml`. `PROXY` in `src/lib/news/fetchNews.ts` points there — **that one
constant is the only app change**, since all parsing is isolated behind
`fetchNews()`. The `workers.dev` address still answers, without caching.

## Cost

Workers free tier: **100,000 requests/day**, no credit card. The section costs
~11 requests per scrolling visitor (1 board + 10 article previews), and the
app's 30-minute `sessionStorage` cache makes a repeat visit free — roughly
**9,000 visitors/day** before the cap. Over-cap requests on the free plan are
**rejected, never billed**; overage requires an explicit upgrade.

The Worker stores each page in the Cache API for 3 hours, so a visitor within
that window is served without touching the school's site at all. Only 2xx
responses are stored, so an upstream failure is never cached. A new post can
therefore take up to 3 hours to appear. Stored pages are per Cloudflare data
center and can be evicted early, so a visitor can still get a cold load. Every
response carries `X-News-Cache: HIT` or `MISS`.

**The TTL has to be enforced here, not on the fetch.** Finalsite sites sit behind
Cloudflare and send `s-maxage=300`, and a site controls its own caching, so
`cf.cacheTtl` is capped at five minutes. **The Cache API does nothing on
`workers.dev`**, which is why the relay has a custom domain.

To test a TTL, re-fetch past the limit you are testing. A fast answer after a few
seconds proves nothing about hours.

## This is NOT an open proxy

Two allow-lists, and both matter:

- `ALLOWED_ORIGINS` — who may use the relay.
- `ALLOWED_HOSTS` — **what it will fetch.** Without this, anyone could point it
  at any URL on your account's quota and reputation.

**Adding a school means adding its hostname to `ALLOWED_HOSTS` and redeploying.**
A school registered in `src/lib/news/sources.ts` but missing here will fail with
`403 Host not allowed` — which surfaces as the section's error state.

## Health check

```bash
curl -s -o /dev/null -w '%{http_code}\n' \
  "https://news.charlotteschoolinsights.com/?url=https%3A%2F%2Fwww.providenceday.org%2Fabout%2Fpd-communications%2Fnews-media"
```

Expect `200`. Unlike `corsproxy.io`, this relay does **not** gate on User-Agent,
so a plain `curl` is a valid health check here.
