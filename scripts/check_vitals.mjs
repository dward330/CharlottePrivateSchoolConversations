#!/usr/bin/env node
/**
 * Measure CLS and LCP on every indexable route, desktop and mobile.
 *
 * WHY THIS EXISTS
 * ---------------
 * `.claude/plans/vitals.md` carries a table of Core Web Vitals numbers — school
 * page CLS 0.32, mobile LCP 4.27s — and NONE of them could be reproduced. The
 * harness that produced them was a set of throwaway probe scripts, deliberately
 * discarded (vitals.md's own closing checklist ends "`git status` clean of probe
 * scripts"). So the plan's remaining work — reworking the `ready` gate to fix
 * desktop CLS — had no way to tell whether a change helped, hurt, or did
 * nothing.
 *
 * Worse, this exact filename was already referenced from a SHIPPED SOURCE
 * COMMENT: src/index.css says "Re-measure with scripts/check_vitals.mjs if the
 * card layouts change." It had never existed. Anyone following that instruction
 * hit a dead end. This file is that instruction made true.
 *
 * IT MEASURES; IT DOES NOT GATE
 * -----------------------------
 * There is deliberately NO threshold-based exit 1, and this script is
 * deliberately NOT chained into `npm run build`. Desktop school-page CLS is 0.32
 * today — three times over the threshold and a known-open problem — so a gate
 * would ship red on its very first run. This repo has two recorded cases of a
 * checker parked at a non-zero number and ceasing to be read (check:sepdrift,
 * and check:live at 4,646 false positives). A vitals gate would be the third,
 * and it would be red for a reason nobody in this plan is fixing.
 *
 * Exit 1 is reserved for the harness FAILING TO MEASURE — a route that never
 * mounts, a browser that will not launch. That distinction matters: "the page is
 * slow" and "we did not find out whether the page is slow" are different
 * results, and only the second is a broken tool.
 *
 * MEASUREMENT TRAP, carried from vitals.md:243-250 because it nearly inverted a
 * conclusion. A probe once reported IDENTICAL CLS across six different
 * `min-height` values, which read as "the injected rule isn't applying." It WAS
 * applying — `getComputedStyle` confirmed it — and the values genuinely did not
 * matter, because CLS weights the FRACTION OF THE VIEWPORT affected, not the
 * distance moved. Reserving space shrinks the distance and leaves the fraction
 * alone. Verify a rule applied before concluding it had no effect, and verify it
 * did NOT apply before concluding it did.
 *
 * TWO LCP NUMBERS: PAINT vs FINAL — read this before quoting a mobile figure
 * ------------------------------------------------------------------------
 * The mobile pass used to report six routes POOR at 12-21s while seven sat at
 * ~2.0-2.4s, and that spread was carried as "a measurement artifact" for three
 * days without being explained. It is an artifact, and the mechanism is now
 * measured rather than guessed (2026-08-25):
 *
 *   The pre-rendered HTML paints at ~1.9-2.4s. The 2.2 MB main bundle finishes
 *   downloading ~16s later on emulated Fast-3G, React hydrates, and the browser
 *   RE-REPORTS a largest element. `PerformanceObserver` hands you the LAST
 *   entry, so a harness that waits long enough records the bundle's arrival
 *   time and calls it the paint.
 *
 * Proven by a controlled experiment, not inferred. On /school/gaston-day/ the
 * bundle's `responseEnd` lands at +19,403ms and the second LCP candidate at
 * +19,628ms — 225ms later, in 3/3 runs, so it is deterministic rather than a
 * race. Blocking `index-*.js` (with the route asserted to have matched a
 * NON-ZERO number of requests — an intervention that silently applies to
 * nothing reads as a null result) removes the second candidate entirely and
 * takes the route from 19,628ms to 1,568ms.
 *
 * Two things the earlier 2026-08-22 write-up got WRONG, corrected here because
 * they are the kind of error that gets copied forward:
 *
 *   - The element does NOT grow. On /school/gaston-day/ both candidates are the
 *     same <P.welcome-caption> with an IDENTICAL 85-character text; `size` moves
 *     only 10608 -> 10745 (1.013x) because the entry is re-reported, not because
 *     anything reflowed.
 *   - It is NOT always the same element, and not usually the podcast line.
 *     /school/carmel-christian/ goes <H1> (23 chars) -> <P.welcome-caption>
 *     (91 chars). Any check keyed on element identity would miss that route,
 *     which is why `supersessionOf()` deliberately does not use the descriptor.
 *
 * So the table prints BOTH: `paint LCP` (the first candidate) with the verdict,
 * and — where a late candidate superseded it — a `↳ superseded at …` line
 * carrying the final spec figure. Neither is dropped. The paint figure is what a
 * visitor sees; the final figure carries the fact that the page was not
 * interactive for that long, which is REAL and is a TTI/INP problem owned by
 * `.claude/plans/bundlesplit.md` (abandoned 2026-08-24 on a mobile-CLS
 * regression, recoverable on `perf/bundle-split`). This script fixes the
 * MEASUREMENT, not the load time, and must never be cited as evidence the site
 * loads fast on a slow connection.
 *
 * The supersession test is in `supersessionOf()` and is computed per run from
 * the candidate list — never a hardcoded route list, which would go stale (the
 * affected set has already grown from two routes to six). It deliberately does
 * NOT flag every late candidate: a lazily-loaded hero image genuinely painting
 * at 8s is a real LCP.
 *
 * FIELD vs LAB, and do not overstate the artifact. Real Chrome finalises LCP at
 * the first user interaction or page hide, NOT after an arbitrary wait — so a
 * visitor who scrolls or taps before the bundle lands finalises at ~2s, and the
 * paint column is the closer analogue of what CrUX records. This harness always
 * waits, so it always sees the late candidate. These are emulated Fast-3G
 * numbers from one machine either way: the site is live, so Search Console holds
 * real CrUX LCP — check it before drawing any conclusion about ranking impact.
 *
 * MEASURING A LIVE ORIGIN (--origin)
 * ----------------------------------
 * By default this serves the local `dist/` over a localhost static server, which
 * is the right target for "did my change help?" — it is deterministic, and the
 * bytes are exactly what was just built.
 *
 * `--origin <url>` points the browser at a deployed site instead and skips the
 * local server entirely. That is NOT a worse version of the local run; it
 * answers a different question. A localhost server has near-zero latency and
 * sends `cache-control: no-store`, so it cannot reproduce a defect whose trigger
 * is VARIABLE REAL-NETWORK TIMING — a race that only opens when a stylesheet,
 * font or overlay chunk arrives late. Live measurement deliberately INCLUDES
 * that variance; that is the point of the flag, not a caveat on it.
 *
 * Two things follow. Live runs measure WHATEVER IS DEPLOYED, which may not be
 * `main` — check the Pages build before quoting the numbers as describing a
 * commit. And live runs are noisy by construction, so a single run proves
 * nothing: use `--runs` with a real sample and read the DISTRIBUTION, not the
 * median. A rare spike is invisible in a median, and a rare spike is usually the
 * thing being hunted.
 *
 * Usage:
 *   npm run check:vitals                 # desktop, every route
 *   npm run check:vitals -- --mobile     # 4x CPU throttle + Fast-3G emulation
 *   npm run check:vitals -- --both       # both passes, one table each
 *   npm run check:vitals -- --route /school/cannon/
 *   npm run check:vitals -- --runs 3     # median of N runs per route
 *   npm run check:vitals -- --json       # machine-readable, for diffing runs
 *   npm run check:vitals -- --origin https://example.com --runs 20
 *                                        # measure the DEPLOYED site, real network
 *
 * Exit codes: 0 = measured, 1 = a route could not be measured, 2 = setup error.
 */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'
import { ROUTES, REPO_ROOT } from './seo_routes.mjs'

const DIST = resolve(REPO_ROOT, 'dist')

const argv = process.argv.slice(2)
const flag = (f) => argv.includes(f)
const val = (f, d) => {
  const i = argv.indexOf(f)
  return i === -1 ? d : argv[i + 1]
}

const JSON_OUT = flag('--json')
const ONLY = val('--route', null)
/* Trailing slashes are stripped so `--origin https://x.com/` and
   `--origin https://x.com` build the same URL — route paths already lead with
   one, and `//school/...` is a different path to some static hosts. */
const ORIGIN = (val('--origin', null) ?? '').replace(/\/+$/, '') || null
const RUNS = Math.max(1, Number(val('--runs', '1')) || 1)
const PASSES = flag('--both')
  ? ['desktop', 'mobile']
  : flag('--mobile')
    ? ['mobile']
    : ['desktop']

/* Google's Core Web Vitals thresholds. Reported as a verdict per row; NOT used
   to decide the exit code — see the header. */
const GOOD = { cls: 0.1, lcp: 2500 }
const POOR = { cls: 0.25, lcp: 4000 }
const verdict = (v, metric) =>
  v == null ? '—' : v <= GOOD[metric] ? 'GOOD' : v <= POOR[metric] ? 'NEEDS-WORK' : 'POOR'

/* Emulation profiles. The mobile numbers in vitals.md came from "CPU throttled
   4x with Fast-3G network emulation" against a real production build, so those
   are reproduced exactly rather than re-chosen — a different throttle would
   produce numbers that cannot be compared to the recorded baseline, which is the
   whole point of having a harness. Fast-3G figures are Chrome DevTools' own
   preset: 1.6 Mbps down, 750 Kbps up, 150ms RTT. */
const PROFILES = {
  desktop: {
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    isMobile: false,
    cpuThrottle: 1,
    network: null,
  },
  mobile: {
    // Matches the CSS breakpoint the mobile reserve is written against
    // (src/index.css `@media (max-width: 720px)`), so the 400px floor is the one
    // actually applying when these numbers are taken.
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    cpuThrottle: 4,
    network: {
      offline: false,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
      latency: 150,
    },
  },
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

/**
 * Static server over dist/, same shape as scripts/prerender.mjs.
 *
 * Serving the PRE-RENDERED dist/ rather than `vite dev` is not incidental: the
 * dev server ships unbundled modules and no minification, so its numbers
 * describe a page no reader ever loads. It also means these measurements include
 * the pre-rendered markup a real visitor gets, which is the thing whose
 * hydration causes the shift being measured.
 */
function serveDist(port) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost')
      let filePath = join(DIST, decodeURIComponent(url.pathname))
      if (url.pathname.endsWith('/')) filePath = join(filePath, 'index.html')
      if (!filePath.startsWith(DIST)) {
        res.writeHead(403).end('forbidden')
        return
      }
      let body
      try {
        body = await readFile(filePath)
      } catch {
        body = await readFile(join(DIST, 'index.html'))
        filePath = 'index.html'
      }
      res.writeHead(200, {
        'content-type': MIME[extname(filePath)] ?? 'application/octet-stream',
        // A warm HTTP cache would make run 2 of --runs 3 measure a different
        // page than run 1. Vitals are a cold-load property here.
        'cache-control': 'no-store',
      })
      res.end(body)
    } catch (err) {
      res.writeHead(500).end(String(err))
    }
  })
  return new Promise((ok, fail) => {
    server.once('error', fail)
    server.listen(port, () => ok(server))
  })
}

/**
 * The in-page collector, installed BEFORE any app script runs.
 *
 * `buffered: true` on both observers is load-bearing: LCP and the early layout
 * shifts fire during parse/mount, long before an observer registered from an
 * evaluated-after-load script would exist. Without it LCP reads as null and CLS
 * reads as ~0 on exactly the pages that are worst — a harness that reports
 * everything is fine because it started watching too late.
 *
 * CLS is the largest SESSION WINDOW (max 5s long, max 1s gap between entries),
 * which is the definition Chrome and CrUX use — not the naive sum of every
 * shift. `hadRecentInput` entries are excluded per spec: a shift the user caused
 * by clicking is not a defect.
 *
 * EVERY LCP CANDIDATE IS KEPT, not just the last one. `lcp` remains the spec
 * figure — the last entry — because that is what LCP *is*, and nothing here
 * quietly redefines it. But the full list is what makes the mobile figures
 * readable: see PAINT LCP vs FINAL LCP in the header. An element descriptor is
 * captured with each candidate, because "the second candidate is a DIFFERENT
 * element" and "the second candidate re-reports the SAME element" are different
 * findings, and the 2026-08-22 write-up got that wrong for want of this field.
 */
const COLLECTOR = `
window.__vitals = { cls: 0, lcp: null, shifts: [], lcpCandidates: [] }
;(() => {
  let cur = 0, curFirst = 0, curLast = 0
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (e.hadRecentInput) continue
      if (cur && e.startTime - curLast < 1000 && e.startTime - curFirst < 5000) {
        cur += e.value; curLast = e.startTime
      } else {
        cur = e.value; curFirst = curLast = e.startTime
      }
      if (cur > window.__vitals.cls) window.__vitals.cls = cur
      window.__vitals.shifts.push({ t: Math.round(e.startTime), v: e.value })
    }
  }).observe({ type: 'layout-shift', buffered: true })
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      const el = e.element
      let desc = '(no element)'
      if (el) {
        desc = el.tagName
        // NOTE the DOUBLED backslash: this string is a template literal in the
        // harness, so a single \\s would reach the browser as a literal
        // whitespace character and terminate the regex mid-expression. That
        // failure is SILENT and total — the whole collector stops parsing, so
        // window.__vitals never exists and every route reports "collector never
        // installed". Cost an hour on 2026-08-25; do not un-double it.
        const cls = typeof el.className === 'string' ? el.className.trim() : ''
        if (cls) desc += '.' + cls.split(/\\s+/).slice(0, 2).join('.')
      }
      window.__vitals.lcpCandidates.push({
        t: Math.round(e.startTime),
        size: e.size,
        el: desc,
        // The character count is the discriminator between a re-report and a
        // genuine new paint: an element whose text is unchanged did not grow.
        chars: el ? (el.textContent || '').trim().length : 0,
      })
      // The spec figure: LCP is the LAST candidate. Kept verbatim so the
      // reported lcp still means what every other tool means by it.
      window.__vitals.lcp = e.startTime
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true })
})()
`

/**
 * Parse the collector ONCE, here, before any browser work.
 *
 * COLLECTOR is a template literal, so every backslash in it is processed by the
 * harness before the browser ever sees the text. A regex written `/\s+/` inside
 * it arrives as a literal whitespace character, which terminates the regex and
 * makes the WHOLE collector unparseable — silently. Nothing throws in Node, the
 * page loads normally, and every route reports "collector never installed",
 * which reads as a browser or timing problem rather than a typo two files away.
 *
 * `new Function` compiles without executing, so this is a pure syntax check and
 * costs nothing. It turns a confusing per-route measurement failure into one
 * unmissable setup error naming the actual cause.
 */
try {
  new Function(COLLECTOR)
} catch (err) {
  console.error(
    'check:vitals: the in-page COLLECTOR does not parse — ' + err.message + '\n' +
      'This is a bug in check_vitals.mjs, not in the site. Most likely an escape\n' +
      'sequence: COLLECTOR is a template literal, so a regex needs a DOUBLED\n' +
      'backslash (\\\\s, not \\s) to survive into the browser.',
  )
  process.exit(2)
}

async function measure(browser, origin, route, profile) {
  const ctx = await browser.newContext({
    viewport: profile.viewport,
    deviceScaleFactor: profile.deviceScaleFactor,
    isMobile: profile.isMobile,
    hasTouch: profile.isMobile,
  })
  const page = await ctx.newPage()
  try {
    const cdp = await ctx.newCDPSession(page)
    if (profile.cpuThrottle > 1) {
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpuThrottle })
    }
    if (profile.network) {
      await cdp.send('Network.enable')
      await cdp.send('Network.emulateNetworkConditions', profile.network)
    }
    await page.addInitScript(COLLECTOR)

    const url = origin + route.path + (route.query ?? '')
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 })

    // Wait for the app to have actually mounted. Measuring a route whose SPA
    // never booted would report a flattering CLS of ~0 for a page that in
    // reality shifts hard — the failure this harness exists to catch.
    await page.waitForFunction(
      () => (document.getElementById('root')?.innerHTML.length ?? 0) > 1000,
      null,
      { timeout: 60_000 },
    )

    /* Then settle. The school-page shift happens at ~+88ms when the eight
       overlay promises resolve and the topic sections swap their placeholders
       for real content, so a measurement taken at mount would miss the ONE shift
       that accounts for 0.3175 of the 0.3195 total. networkidle covers the
       overlay fetches; the extra wait covers the render that follows them. */
    await page
      .waitForLoadState('networkidle', { timeout: 60_000 })
      .catch(() => {}) // a page that never idles is still worth measuring
    await page.waitForTimeout(profile.cpuThrottle > 1 ? 3000 : 1500)

    const v = await page.evaluate(() => window.__vitals)
    // Proof the collector was actually installed and observing. Without this a
    // silently-failed addInitScript reports cls 0 / lcp null as a clean result.
    if (!v) throw new Error('collector never installed')
    return { cls: v.cls, lcp: v.lcp, shifts: v.shifts, lcpCandidates: v.lcpCandidates ?? [] }
  } finally {
    await ctx.close()
  }
}

const median = (xs) => {
  const s = xs.filter((x) => x != null).sort((a, b) => a - b)
  if (!s.length) return null
  const m = s.length >> 1
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

async function main() {
  /* Only the local pass needs a build. With --origin the bytes come from the
     deployed site, so requiring dist/ would fail a run that never reads it. */
  if (!ORIGIN && !existsSync(join(DIST, 'index.html'))) {
    console.error(
      'check:vitals: dist/index.html not found.\n' +
        'These are production numbers by definition — run `npm run build` first.',
    )
    process.exit(2)
  }
  if (ORIGIN && !/^https?:\/\//.test(ORIGIN)) {
    console.error(`check:vitals: --origin must be an http(s) URL, got ${ORIGIN}`)
    process.exit(2)
  }

  let chromium
  try {
    ;({ chromium } = await import('playwright'))
  } catch {
    console.error('check:vitals: playwright not installed (devDependency).')
    process.exit(2)
  }

  const routes = ONLY ? ROUTES.filter((r) => r.path === ONLY) : ROUTES
  if (!routes.length) {
    console.error(
      `check:vitals: no route matches ${ONLY}. Known routes:\n` +
        ROUTES.map((r) => '  ' + r.path).join('\n'),
    )
    process.exit(2)
  }

  /* With --origin there is no local server at all — `server` stays null and the
     finally block below skips closing it. */
  let server = null
  let origin = ORIGIN
  if (!origin) {
    const port = 4383 + (process.pid % 200)
    server = await serveDist(port)
    origin = `http://localhost:${port}`
  }
  const browser = await chromium.launch()
  const failures = []
  const results = {}

  try {
    for (const pass of PASSES) {
      const profile = PROFILES[pass]
      const rows = []
      if (!JSON_OUT) {
        console.log(
          `\n── ${pass} — ${profile.viewport.width}x${profile.viewport.height}` +
            `, CPU ${profile.cpuThrottle}x` +
            `${profile.network ? ', Fast-3G' : ''}` +
            `${RUNS > 1 ? `, median of ${RUNS}` : ''}` +
            ` — ${ORIGIN ? `LIVE ${ORIGIN}` : 'local dist/'} ──`,
        )
      }
      for (const route of routes) {
        const runs = []
        let err = null
        for (let i = 0; i < RUNS; i++) {
          try {
            runs.push(await measure(browser, origin, route, profile))
          } catch (e) {
            err = e
            break
          }
        }
        if (err || !runs.length) {
          failures.push(`${pass} ${route.path} — ${err?.message ?? 'no measurement'}`)
          rows.push({ path: route.path, cls: null, lcp: null })
          continue
        }
        const clsRuns = runs.map((r) => r.cls)
        const lcpRuns = runs.map((r) => r.lcp)
        // The FIRST candidate is the paint; the last is the spec LCP. Computed
        // per run from the candidate list — never a hardcoded route list, which
        // would go stale the moment the affected set changes (and it has
        // already grown from two routes to six).
        const paintRuns = runs.map((r) => r.lcpCandidates?.[0]?.t ?? r.lcp)
        rows.push({
          path: route.path,
          cls: median(clsRuns),
          lcp: median(lcpRuns),
          paint: median(paintRuns),
          // Kept per-run so the DISTRIBUTION survives into the report. A rare
          // spike — the thing worth hunting — is invisible in a median: one
          // 0.3492 among twenty 0.0000s leaves the median at 0.0000.
          clsRuns,
          lcpRuns,
          paintRuns,
          // Full candidate lists, one per run, so --json carries the evidence
          // for the supersession verdict rather than just the verdict.
          candidateRuns: runs.map((r) => r.lcpCandidates ?? []),
          supersession: supersessionOf(runs),
        })
      }
      results[pass] = rows
      if (!JSON_OUT) {
        printTable(rows)
        if (RUNS > 1) printDistribution(rows)
      }
    }
  } finally {
    await browser.close()
    server?.close()
  }

  if (JSON_OUT) {
    console.log(JSON.stringify(results, null, 2))
  } else {
    console.log(
      '\nMeasured, not gated — no threshold here decides the exit code, and this\n' +
        'script is not in `npm run build`. Desktop school-page CLS is a known-open\n' +
        'problem (.claude/plans/vitals.md); a gate would ship permanently red.\n' +
        'Lab numbers on one machine: they find problems, they do not predict the\n' +
        'field score Google actually ranks on.',
    )
  }

  if (failures.length) {
    console.error('\n✗ could not measure:')
    for (const f of failures) console.error('  ' + f)
    console.error(
      '\nThis is a HARNESS failure, not a slow page — the routes above were never\n' +
        'measured at all. Fix the harness before trusting any row above.',
    )
    process.exit(1)
  }
  process.exit(0)
}

/**
 * Classify a route's LCP candidate list: did a late candidate SUPERSEDE an
 * already-painted first candidate, or is the final figure a genuine paint?
 *
 * This is the discriminator the whole two-number report rests on, and it is
 * deliberately NOT "the last candidate is late, therefore ignore it". A lazily
 * loaded hero image that genuinely paints at 8s is a REAL LCP and must keep its
 * figure; dropping it would trade one wrong number for another. What is being
 * detected is narrower: the browser re-nominating a largest element AFTER the
 * page already painted, which is what hydration does when the bundle lands.
 *
 * Two signals, both required, both measured rather than assumed:
 *
 *   1. The first candidate is a plausible paint (there IS an earlier one), and
 *      the late candidate arrives more than SUPERSEDE_GAP_MS after it. The gap
 *      exists so ordinary multi-candidate paints — a page whose real LCP lands
 *      300ms after its first text — are not flagged.
 *   2. The late candidate is not much LARGER than the first. A genuinely new,
 *      genuinely bigger element (the hero image case) grows the size
 *      substantially; a re-report of the same painted content does not. The
 *      2026-08-25 measurements put the re-report at ~1.0-1.1x, so 1.5x is a
 *      wide margin around the observed behaviour rather than a tight fit.
 *
 * Note what is NOT used: the element descriptor. It is captured and printed
 * because it is diagnostic, but it must not gate the verdict. Measured
 * 2026-08-25, the affected routes do not agree on an element — gaston-day
 * re-reports the same <P.welcome-caption>, carmel-christian goes <H1> ->
 * <P.welcome-caption>, and / re-reports the same <P.lede>. A same-element test
 * would miss carmel-christian; an element-changed test would miss the other
 * two. Keying the verdict on identity is exactly the error the 2026-08-22
 * write-up made.
 *
 * Returns null when nothing superseded, otherwise { paint, final, gap, el }.
 */
const SUPERSEDE_GAP_MS = 3000
const SUPERSEDE_GROWTH = 1.5
function supersessionOf(runs) {
  // Judged on the MEDIAN run by final LCP, so one anomalous run neither
  // creates nor erases the flag. A route flagged here was flagged typically,
  // not once.
  const withCands = runs.filter((r) => (r.lcpCandidates?.length ?? 0) > 0)
  if (!withCands.length) return null
  const sorted = [...withCands].sort((a, b) => (a.lcp ?? 0) - (b.lcp ?? 0))
  const cands = sorted[sorted.length >> 1].lcpCandidates
  if (cands.length < 2) return null
  const first = cands[0]
  const last = cands[cands.length - 1]
  const gap = last.t - first.t
  if (gap <= SUPERSEDE_GAP_MS) return null
  if (first.size > 0 && last.size > first.size * SUPERSEDE_GROWTH) return null
  return { paint: first.t, final: last.t, gap, el: last.el, count: cands.length }
}

/**
 * Per-run CLS distribution. Printed only for --runs > 1, because the question it
 * answers — "did ANY run spike?" — is meaningless on a single sample.
 *
 * The three columns are the ones a rare intermittent actually shows up in: max,
 * the count over the 0.1 GOOD threshold, and the raw sorted values. A median
 * column alone would report 0.0000 for a page that threw 0.3492 once in twenty,
 * which is exactly the reading this block exists to prevent.
 */
function printDistribution(rows) {
  const w = Math.max(6, ...rows.map((r) => r.path.length))
  console.log('\n  CLS distribution over ' + RUNS + ' runs')
  console.log(
    '  ' + 'route'.padEnd(w) + '  ' + 'min'.padStart(7) + '  ' + 'med'.padStart(7) +
      '  ' + 'max'.padStart(7) + '  ' + '>0.1'.padStart(5) + '  runs',
  )
  console.log('  ' + '-'.repeat(w + 34))
  for (const r of rows) {
    const xs = (r.clsRuns ?? []).filter((x) => x != null)
    if (!xs.length) {
      console.log('  ' + r.path.padEnd(w) + '  ' + '—'.padStart(7))
      continue
    }
    const sorted = [...xs].sort((a, b) => a - b)
    const over = xs.filter((x) => x > GOOD.cls).length
    console.log(
      '  ' + r.path.padEnd(w) +
        '  ' + sorted[0].toFixed(4).padStart(7) +
        '  ' + (median(xs) ?? 0).toFixed(4).padStart(7) +
        '  ' + sorted[sorted.length - 1].toFixed(4).padStart(7) +
        '  ' + `${over}/${xs.length}`.padStart(5) +
        '  ' + sorted.map((x) => x.toFixed(4)).join(' '),
    )
  }
}

/**
 * The route table. LCP is reported as TWO figures, and this is the point of the
 * whole exercise:
 *
 *   PAINT  the first LCP candidate — when the page actually painted
 *   FINAL  the last candidate — the spec figure, what a tool taking
 *          `entries[entries.length - 1]` reports
 *
 * On most routes they are the same and the row reads as it always did. Where
 * they diverge the row prints BOTH plus a `superseded` note, because each
 * answers a real question and neither may be silently dropped: the paint figure
 * is what a visitor sees, and the final figure carries the fact that the page
 * was still not interactive that many seconds in. Printing only the paint would
 * be a harness that hides a 16s TTI; printing only the final is the status quo
 * that parked six routes at an unexplained red.
 *
 * The verdict column follows PAINT, since that is the user-visible paint. The
 * final figure keeps its own verdict inline so a POOR one is never invisible.
 */
function printTable(rows) {
  const w = Math.max(6, ...rows.map((r) => r.path.length))
  console.log(
    '  ' +
      'route'.padEnd(w) +
      '  ' +
      'CLS'.padStart(7) +
      '  ' +
      'verdict'.padEnd(10) +
      'paint LCP'.padStart(10) +
      '  verdict',
  )
  console.log('  ' + '-'.repeat(w + 42))
  for (const r of rows) {
    const shown = r.paint ?? r.lcp
    console.log(
      '  ' +
        r.path.padEnd(w) +
        '  ' +
        (r.cls == null ? '—' : r.cls.toFixed(4)).padStart(7) +
        '  ' +
        verdict(r.cls, 'cls').padEnd(10) +
        (shown == null ? '—' : Math.round(shown) + 'ms').padStart(10) +
        '  ' +
        verdict(shown, 'lcp'),
    )
    if (r.supersession) {
      const sup = r.supersession
      console.log(
        ' '.repeat(w + 4) +
          `↳ superseded at ${Math.round(r.lcp ?? sup.final)}ms ` +
          `${verdict(r.lcp, 'lcp')} by a post-hydration re-report ` +
          `(+${Math.round(sup.gap / 1000)}s, ${sup.count} candidates, <${sup.el}>)`,
      )
    }
  }
  const superseded = rows.filter((r) => r.supersession)
  if (superseded.length) {
    console.log(
      `\n  ${superseded.length} of ${rows.length} routes report a late LCP candidate that\n` +
        '  supersedes an already-painted element. That late figure is the main bundle\n' +
        '  landing and React hydrating — the paint column is what a visitor sees. The\n' +
        '  gap is real non-interactive time and belongs to `bundlesplit`, not here.',
    )
  }
}

main().catch((err) => {
  console.error('check:vitals: ' + (err?.stack ?? err))
  process.exit(2)
})
