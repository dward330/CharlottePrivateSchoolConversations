/**
 * News board CORS relay for charlotteschoolinsights.com.
 *
 * WHY THIS EXISTS. School news boards send no `Access-Control-Allow-Origin`
 * header, so a browser fetch from the site is blocked by the same-origin policy
 * — for every school, for every visitor. The app is a static site on GitHub
 * Pages with no backend, so a relay is the only runtime path.
 *
 * This replaces the public relay `corsproxy.io`, which was measured on
 * 2026-08-27 to gate on USER-AGENT (non-browser clients get HTTP 403
 * "Server-side requests are not allowed on your plan") and which can change its
 * rules without notice. A visitor hit that failure the day the section shipped.
 *
 * Deliberately minimal: it forwards one GET to an allow-listed school domain and
 * returns the body with a CORS header. It is not a general-purpose open proxy —
 * see ALLOWED_HOSTS.
 */

/**
 * Origins allowed to USE this relay. Anything else is refused.
 *
 * Localhost is included so `npm run dev` can exercise the real relay — without
 * it the section renders its ERROR STATE locally while production is perfectly
 * healthy, which reads as a broken feature and costs an afternoon to chase.
 * A dev origin cannot reach anything the public site cannot; ALLOWED_HOSTS is
 * what actually bounds this Worker.
 */
const ALLOWED_ORIGINS = [
  'https://charlotteschoolinsights.com',
  'https://www.charlotteschoolinsights.com',
  'https://dward330.github.io',
]

/** Vite dev server, any port. */
function isDevOrigin(origin) {
  return /^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
}

/**
 * Hosts this relay is willing to FETCH. Without this the Worker would be an open
 * proxy that anyone could point at any URL — including internal addresses — on
 * your account's quota and reputation. Add a host here when adding a school.
 */
const ALLOWED_HOSTS = [
  'www.providenceday.org',
  'providenceday.org',
  'www.cannonschool.org',
  'cannonschool.org',
  'www.carmelchristian.org',
  'carmelchristian.org',
  // Apex 302s to www (verified 2026-08-28); both forms are listed because a
  // redirect between them is invisible until it 403s.
  'www.charlottecatholic.org',
  'charlottecatholic.org',
  // Apex 302s to www (verified 2026-08-28); both forms are listed because a
  // redirect between them is invisible until it 403s.
  'www.charlottechristian.com',
  'charlottechristian.com',
  // Apex 301s to www (verified 2026-08-28); both forms are listed because a
  // redirect between them is invisible until it 403s.
  //
  // NOTE: two of this board's posts link OFF-SITE to instagram.com. That host
  // is deliberately NOT listed — this allow-list is what keeps the relay from
  // being an open proxy, and it is scoped to school domains. The parser's
  // `preview` fails closed on any non-school page, so nothing asks the relay to
  // fetch Instagram. See TRAP 3 in parsers/charlotte-country-day.ts.
  'www.charlottecountryday.org',
  'charlottecountryday.org',
]

const TIMEOUT_MS = 12_000
/** Cache at Cloudflare's edge so repeat visitors never reach the school's site. */
const EDGE_TTL_S = 900

function cors(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin) || isDevOrigin(origin)
  const allow = ok ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function deny(status, message, origin) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  })
}

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') ?? ''

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) })
    }
    if (request.method !== 'GET') {
      return deny(405, 'Method not allowed', origin)
    }
    // A browser sends Origin on cross-origin fetches. Allow a missing Origin so
    // curl-style health checks still work — the ALLOWED_HOSTS check below is
    // what actually keeps this from being an open proxy.
    if (origin && !ALLOWED_ORIGINS.includes(origin) && !isDevOrigin(origin)) {
      return deny(403, 'Origin not allowed', origin)
    }

    const target = new URL(request.url).searchParams.get('url')
    if (!target) return deny(400, 'Missing ?url=', origin)

    let dest
    try {
      dest = new URL(target)
    } catch {
      return deny(400, 'Malformed url parameter', origin)
    }
    if (dest.protocol !== 'https:') return deny(400, 'Only https is supported', origin)
    if (!ALLOWED_HOSTS.includes(dest.hostname)) {
      return deny(403, `Host not allowed: ${dest.hostname}`, origin)
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
      const upstream = await fetch(dest.toString(), {
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          // Some CMSes serve a stripped page to unknown agents.
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/126 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        cf: { cacheTtl: EDGE_TTL_S, cacheEverything: true },
      })

      if (!upstream.ok) {
        return deny(upstream.status, `Upstream returned ${upstream.status}`, origin)
      }

      return new Response(upstream.body, {
        status: 200,
        headers: {
          'Content-Type': upstream.headers.get('Content-Type') ?? 'text/html; charset=utf-8',
          'Cache-Control': `public, max-age=${EDGE_TTL_S}`,
          ...cors(origin),
        },
      })
    } catch (err) {
      const timedOut = err && err.name === 'AbortError'
      return deny(timedOut ? 504 : 502, timedOut ? 'Upstream timed out' : 'Upstream fetch failed', origin)
    } finally {
      clearTimeout(timer)
    }
  },
}
