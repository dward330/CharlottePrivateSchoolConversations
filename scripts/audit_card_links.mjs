#!/usr/bin/env node
/**
 * audit:cardlink — every card deep link on every school page, in a real browser.
 *
 * A card link is `/school/<slug>/#<area name>/<card name>` (src/lib/cardLink.ts,
 * a HARD naming rule set by the user 2026-11-13). This loads each school page
 * and asserts, for EVERY top-level research card:
 *
 *   - it has an id, the id is unique on the page, and the id equals
 *     linkName(<the area's visible h2>) + "/" + linkName(<the card's visible
 *     title>) on the English page — so the id is the visible name, nothing else;
 *   - loading `#<id>` in a fresh page opens that card, lands its top 0–200px
 *     from the viewport top, keeps the hash in the address bar, makes ZERO
 *     history.pushState calls and no History write that drops or changes the
 *     hash, and closing then reopening the card makes no History write of any
 *     kind (each History write can log a Cloudflare page-view: the beacon runs
 *     with "spa": true). The app's own startup rewrite of `?lang=`
 *     (src/main.tsx) is a replaceState that keeps the hash, so it is not
 *     counted. A last area that cannot scroll up to the header counts as landed
 *     when the page is scrolled to its bottom.
 *
 * Every probe also asserts that the table of contents highlights the area the
 * link landed in (one `.chip.is-active`, named like the area's h2), not the
 * seeded Welcome Video entry.
 *
 * Per school it also checks: `#<area>` alone for every area; the permanent
 * legacy `#topic-<slug>` form for every area (the user has shared
 * /school/providence-day/#topic-sports); an unknown card (`#<area>/does-not-exist`
 * lands on the area); every former name in src/lib/cardLinkAliases.ts that
 * applies to a card this school has; and that a plain load does not scroll.
 * Once, it checks `/school/providence-day/?lang=es#sports/the-college-pipeline`.
 *
 * Needs a built site being served (it is NOT part of `npm run build`):
 *   npm run build && npx vite preview        # serves http://localhost:4173
 *   npm run audit:cardlink
 *   npm run audit:cardlink -- --only providence-day,cannon --base http://localhost:4319
 *   npm run audit:cardlink -- --list         # print every card link, no checks
 *
 * Runs the installed Google Chrome, HEADED, by default (`--headless` to
 * override) — this repo's render checks are real-browser checks.
 *
 * The legacy `#topic-<slug>` links are checked exactly like the others and fail
 * the audit when they miss. Until 2026-11-13 they were left to the browser's own
 * fragment scroll, which fires before the research renders: the first area
 * drifted 340–640px as Latest News loaded above it, some areas never scrolled,
 * and headless or background windows skipped it entirely, so the audit could
 * only warn. openFromHash now re-aims them through scrollToSection (user's call).
 *
 * domcontentloaded plus a settle wait, never networkidle — school pages never go
 * idle. Exit 0 clean · 1 any failure · 2 bad usage or the server is unreachable.
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const { linkName } = await import('../src/lib/cardLink.ts')
const { AREA_ALIASES, CARD_ALIASES } = await import('../src/lib/cardLinkAliases.ts')

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const BASE = val('--base', 'http://localhost:4173').replace(/\/$/, '')
const ONLY = val('--only', '') ? val('--only', '').split(',') : null
const LIST = args.includes('--list')
const WORKERS = Number(val('--workers', '4'))
const HEADLESS = args.includes('--headless')
const SETTLE = 3000
const LIVE = 'https://charlotteschoolinsights.com'

try {
  const r = await fetch(`${BASE}/`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
} catch (e) {
  console.error(`✗ ${BASE} is unreachable (${e.message}). Run \`npm run build && npx vite preview\` first.`)
  process.exit(2)
}

const schools = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8')).schools
  .filter((s) => !ONLY || ONLY.includes(s.slug))
if (!schools.length) {
  console.error(`✗ --only ${ONLY.join(',')} matched no school slug`)
  process.exit(2)
}

const browser = await chromium.launch(HEADLESS ? { headless: true } : { channel: 'chrome', headless: false })
/* One context (one window, headed) per worker, each page brought to the
   front, so no probe runs in a background tab. */
async function newCtx() {
  const c = await browser.newContext({ locale: 'en-US', viewport: { width: 1280, height: 900 } })
  /* Count History API writes from the very first script on the page. */
  await c.addInitScript(() => {
    window.__hist = []
    for (const m of ['pushState', 'replaceState']) {
      const orig = history[m].bind(history)
      history[m] = (...a) => {
        window.__hist.push({ m, hash: new URL(String(a[2] ?? location.href), location.href).hash })
        return orig(...a)
      }
    }
  })
  /* Never log page-views from an audit. */
  await c.route(/cloudflareinsights\.com/, (r) => r.abort())
  return c
}
const ctx = await newCtx()

/** Wait until the research has rendered (no "Loading research…" placeholder). */
async function settle(page) {
  await page.waitForFunction(() => !document.querySelector('.topic-section .loading'), null, { timeout: 30_000 })
    .catch(() => {})
  await page.waitForTimeout(SETTLE)
}

/* History writes that matter: every pushState (a page-view), and any write that
   drops or changes the hash. The app's own startup rewrite of `?lang=`
   (src/main.tsx) is a replaceState that keeps the hash, so it is not counted;
   toggling a card is checked separately, against ANY History write. */
const HIST = `window.__hist.filter((x) => x.m === 'pushState' || x.hash !== location.hash).length`

/** Every top-level card: its id, data-card, and the visible area + card names. */
async function collect(slug) {
  const page = await ctx.newPage()
  try {
    await page.goto(`${BASE}/school/${slug}/?lang=en`, { waitUntil: 'domcontentloaded' })
    await settle(page)
    return await page.evaluate(() => {
      const cards = [...document.querySelectorAll('details.note-card')]
        .filter((d) => !d.parentElement.closest('.note-card'))
        .map((d) => {
          const section = d.closest('.topic-section')
          return {
            id: d.id || null,
            dataCard: d.dataset.card ?? null,
            topic: section?.id.replace(/^topic-/, '') ?? null,
            area: section?.querySelector('.topic-section-head h2')?.textContent.trim() ?? '',
            title: d.querySelector(':scope > summary .topic-title')?.textContent.trim() ?? '',
          }
        })
      const areas = [...document.querySelectorAll('section.topic-section')].map((s) => ({
        topic: s.id.replace(/^topic-/, ''),
        area: s.querySelector('.topic-section-head h2')?.textContent.trim() ?? '',
      }))
      return { cards, areas, scrollY: window.scrollY }
    }).then(async (r) => ({ ...r, hist: await page.evaluate(HIST) }))
  } finally {
    await page.close()
  }
}

/** Load `path`, then measure `targetId` (open state + top) and the History count. */
async function probe(c, path, targetId, toggle = false) {
  const page = await c.newPage()
  try {
    await page.bringToFront()
    await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' })
    await settle(page)
    const r = await page.evaluate((id) => {
      const el = document.getElementById(id)
      return {
        found: !!el,
        open: el instanceof HTMLDetailsElement ? el.open : null,
        top: el ? Math.round(el.getBoundingClientRect().top) : null,
        /* The last area on a short page cannot scroll up to the header. */
        atBottom: window.scrollY + innerHeight >= document.documentElement.scrollHeight - 2,
        /* The table of contents must select the area the link landed in. */
        area: (el?.closest('.topic-section') ?? el)?.querySelector('.topic-section-head h2')?.textContent.trim() ?? null,
        chip: [...document.querySelectorAll('.chip.is-active')].map((c) => c.textContent.trim()).join(' | '),
        href: location.href,
      }
    }, targetId).then(async (r) => ({ ...r, hist: await page.evaluate(HIST) }))
    if (toggle && r.found) {
      /* Close and reopen the card by its summary: no History write of any kind. */
      const n0 = await page.evaluate(() => window.__hist.length)
      const summary = page.locator(`[id="${targetId}"] > summary`)
      await summary.click()
      await page.waitForTimeout(150)
      await summary.click()
      await page.waitForTimeout(150)
      r.toggleHist = (await page.evaluate(() => window.__hist.length)) - n0
    }
    return r
  } finally {
    await page.close()
  }
}

const failures = []
const fail = (slug, msg) => failures.push(`${slug}: ${msg}`)
const inView = (top) => top != null && top >= 0 && top <= 200

/* Phase 1: collect every school's cards (and print them for --list). */
const bySchool = []
for (const s of schools) {
  const r = await collect(s.slug)
  bySchool.push({ slug: s.slug, ...r })
}

if (LIST) {
  for (const s of bySchool) {
    console.log(`\n## ${s.slug}`)
    for (const a of s.areas) {
      console.log(`\n  ${a.area}   ${LIVE}/school/${s.slug}/#${linkName(a.area)}`)
      for (const c of s.cards.filter((c) => c.topic === a.topic)) {
        console.log(`    ${c.title}\n      ${LIVE}/school/${s.slug}/#${c.id}`)
      }
    }
  }
  await browser.close()
  process.exit(0)
}

/* Phase 2: static assertions, then the probe list. */
const probes = []
for (const s of bySchool) {
  if (s.scrollY !== 0) fail(s.slug, `a plain load scrolled to y=${s.scrollY}`)
  if (s.hist !== 0) fail(s.slug, `a plain load made ${s.hist} History call(s)`)
  if (!s.cards.length) fail(s.slug, 'no cards found')
  const seen = new Map()
  for (const c of s.cards) {
    if (!c.id) { fail(s.slug, `card "${c.title}" in ${c.area} has no id`); continue }
    if (seen.has(c.id)) fail(s.slug, `duplicate id "${c.id}"`)
    seen.set(c.id, c)
    const want = `${linkName(c.area)}/${linkName(c.title)}`
    if (c.id !== want) fail(s.slug, `id "${c.id}" is not the visible name "${want}"`)
    if (!c.dataCard?.startsWith(`${c.topic}:`)) fail(s.slug, `card "${c.id}" has data-card "${c.dataCard}"`)
    probes.push({ slug: s.slug, kind: 'card', path: `/school/${s.slug}/#${c.id}`, target: c.id, card: true, hash: `#${c.id}` })
  }
  for (const a of s.areas) {
    const link = linkName(a.area)
    probes.push({ slug: s.slug, kind: 'area', path: `/school/${s.slug}/#${link}`, target: `topic-${a.topic}` })
    probes.push({ slug: s.slug, kind: 'legacy', path: `/school/${s.slug}/#topic-${a.topic}`, target: `topic-${a.topic}`, hash: `#topic-${a.topic}` })
  }
  if (s.areas[0]) {
    const a = s.areas[0]
    probes.push({ slug: s.slug, kind: 'unknown', path: `/school/${s.slug}/#${linkName(a.area)}/does-not-exist`, target: `topic-${a.topic}` })
  }
  /* Former names: the old link must open today's card. */
  for (const al of CARD_ALIASES) {
    for (const c of s.cards) {
      if (c.dataCard !== `${al.topic ?? c.topic}:${al.key}`) continue
      probes.push({ slug: s.slug, kind: 'alias', path: `/school/${s.slug}/#${linkName(c.area)}/${al.from}`, target: c.id, card: true })
    }
  }
  for (const al of AREA_ALIASES) {
    const a = s.areas.find((x) => x.topic === al.topic)
    if (a) probes.push({ slug: s.slug, kind: 'area-alias', path: `/school/${s.slug}/#${al.from}`, target: `topic-${a.topic}` })
  }
}
if (bySchool.some((s) => s.slug === 'providence-day')) {
  probes.push({ slug: 'providence-day', kind: 'locale', path: '/school/providence-day/?lang=es#sports/the-college-pipeline', target: 'sports/the-college-pipeline', card: true, hash: '#sports/the-college-pipeline' })
  if (!probes.some((p) => p.path === '/school/providence-day/#topic-sports')) {
    fail('providence-day', 'the shared link /school/providence-day/#topic-sports was not probed')
  }
}

/* Phase 3: run the probes, a few windows at a time. */
const counts = new Map()
async function runAll(list, workers) {
  let next = 0
  await Promise.all(Array.from({ length: workers }, async () => {
    const wctx = await newCtx()
    while (next < list.length) await check(wctx, list[next++])
    await wctx.close()
  }))
}
async function check(wctx, p) {
  {
    const r = await probe(wctx, p.path, p.target, p.kind === 'card')
    const c = counts.get(p.slug) ?? { ok: 0, bad: 0 }
    const bad = []
    if (!r.found) bad.push('target not found')
    if (p.card && r.open !== true) bad.push('card not open')
    if (!inView(r.top) && !(r.atBottom && r.top > 0)) bad.push(`top ${r.top}px`)
    if (r.found && r.chip !== r.area) bad.push(`highlighted chip "${r.chip}", expected "${r.area}"`)
    if (r.hist !== 0) bad.push(`${r.hist} History call(s)`)
    if (r.toggleHist) bad.push(`closing/reopening the card made ${r.toggleHist} History call(s)`)
    if (p.hash && !r.href.endsWith(p.hash)) bad.push(`address bar now ${r.href}`)
    if (bad.length) { c.bad++; fail(p.slug, `${p.kind} ${p.path} → ${bad.join(', ')}`) } else c.ok++
    counts.set(p.slug, c)
  }
}
await runAll(probes, WORKERS)
await browser.close()

for (const s of bySchool) {
  const c = counts.get(s.slug) ?? { ok: 0, bad: 0 }
  console.log(`${c.bad ? '✗' : '✓'} ${s.slug.padEnd(26)} ${String(s.cards.length).padStart(3)} cards · ${c.ok}/${c.ok + c.bad} links ok`)
}
if (failures.length) {
  console.error(`\naudit:cardlink — ${failures.length} failure(s):`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`\naudit:cardlink — ok: ${probes.length} links on ${bySchool.length} schools, 0 History calls`)
