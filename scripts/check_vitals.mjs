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
 * Usage:
 *   npm run check:vitals                 # desktop, every route
 *   npm run check:vitals -- --mobile     # 4x CPU throttle + Fast-3G emulation
 *   npm run check:vitals -- --both       # both passes, one table each
 *   npm run check:vitals -- --route /school/cannon/
 *   npm run check:vitals -- --runs 3     # median of N runs per route
 *   npm run check:vitals -- --json       # machine-readable, for diffing runs
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
 */
const COLLECTOR = `
window.__vitals = { cls: 0, lcp: null, shifts: [] }
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
    const es = list.getEntries()
    const last = es[es.length - 1]
    if (last) window.__vitals.lcp = last.startTime
  }).observe({ type: 'largest-contentful-paint', buffered: true })
})()
`

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
    return { cls: v.cls, lcp: v.lcp, shifts: v.shifts }
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
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error(
      'check:vitals: dist/index.html not found.\n' +
        'These are production numbers by definition — run `npm run build` first.',
    )
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

  const port = 4383 + (process.pid % 200)
  const server = await serveDist(port)
  const origin = `http://localhost:${port}`
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
            `${RUNS > 1 ? `, median of ${RUNS}` : ''} ──`,
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
        const cls = median(runs.map((r) => r.cls))
        const lcp = median(runs.map((r) => r.lcp))
        rows.push({ path: route.path, cls, lcp })
      }
      results[pass] = rows
      if (!JSON_OUT) printTable(rows)
    }
  } finally {
    await browser.close()
    server.close()
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

function printTable(rows) {
  const w = Math.max(6, ...rows.map((r) => r.path.length))
  console.log(
    '  ' +
      'route'.padEnd(w) +
      '  ' +
      'CLS'.padStart(7) +
      '  ' +
      'verdict'.padEnd(10) +
      'LCP'.padStart(9) +
      '  verdict',
  )
  console.log('  ' + '-'.repeat(w + 40))
  for (const r of rows) {
    console.log(
      '  ' +
        r.path.padEnd(w) +
        '  ' +
        (r.cls == null ? '—' : r.cls.toFixed(4)).padStart(7) +
        '  ' +
        verdict(r.cls, 'cls').padEnd(10) +
        (r.lcp == null ? '—' : Math.round(r.lcp) + 'ms').padStart(9) +
        '  ' +
        verdict(r.lcp, 'lcp'),
    )
  }
}

main().catch((err) => {
  console.error('check:vitals: ' + (err?.stack ?? err))
  process.exit(2)
})
