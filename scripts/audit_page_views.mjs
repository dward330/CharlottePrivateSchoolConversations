#!/usr/bin/env node
/**
 * audit:pageviews — the telemetry guard: count the page-views the REAL
 * Cloudflare beacon would send, in a real browser.
 *
 * The beacon (index.html, `"spa": true`, measured at version 2026.10.1) logs a
 * page-view for every same-document navigation wherever the Navigation API
 * exists — replaceState and hash changes included, not just pushState. The app
 * writes the URL on card and chip clicks (src/lib/cardLink.ts showLinkInUrl),
 * in pushRoute()'s replace half and on a language switch, always through
 * quietReplaceUrl() (src/lib/analytics.ts), which the inline `<head>` guard in
 * index.html hides from the beacon. This audit proves that against the beacon
 * itself rather than our reading of its source.
 *
 * It lets static.cloudflareinsights.com/beacon.min.js LOAD and intercepts only
 * the beacon's POSTs (`/cdn-cgi/rum`), answering each with a 204 so nothing
 * reaches the dashboard. It counts `eventType === 1` (a `Load`, i.e. one
 * page-view). Assertions:
 *
 *   - /school/providence-day/ logs exactly 1 Load; opening 3 cards, closing 1,
 *     clicking 2 area chips and the Welcome Video chip adds 0, while the URL
 *     follows each click;
 *   - the same with ?lang=es;
 *   - an in-app link from /school/providence-day/?lang=es to another school
 *     adds exactly 1 (it added 2 before 2026-11-14);
 *   - one school toggle on Compare (?topic=&schools=) adds exactly 1;
 *   - a language switch through the real language picker adds 0.
 *
 * First it asserts `'navigation' in window`: without the Navigation API the
 * beacon takes its pushState-patching path and this audit proves nothing, so it
 * exits 2. It also exits 2 if the beacon sends no initial Load at all (then
 * there is nothing to count; say so rather than pass).
 *
 * Needs a built site being served (NOT part of `npm run build`):
 *   npm run build && npx vite preview        # serves http://localhost:4173
 *   npm run audit:pageviews
 *   npm run audit:pageviews -- --base http://localhost:4319
 * Pointing --base at the live site is the user's call, after a deploy; every
 * beacon POST is still intercepted.
 *
 * Headed installed Chrome by default (`--headless` to override).
 * Exit 0 clean · 1 any failure · 2 bad usage, unreachable server, or nothing
 * measurable.
 */
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const BASE = val('--base', 'http://localhost:4173').replace(/\/$/, '')
const HEADLESS = args.includes('--headless')
/** How long to wait for the beacon to report after an action. */
const QUIET = 4000

try {
  const r = await fetch(`${BASE}/`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
} catch (e) {
  console.error(`✗ ${BASE} is unreachable (${e.message}). Run \`npm run build && npx vite preview\` first.`)
  process.exit(2)
}

const browser = await chromium.launch(HEADLESS ? { headless: true } : { channel: 'chrome', headless: false })
const failures = []
const lines = []

/** A fresh context whose beacon POSTs are captured and answered locally. */
async function session() {
  const ctx = await browser.newContext({ locale: 'en-US', viewport: { width: 1280, height: 900 } })
  const events = []
  await ctx.route('**/cdn-cgi/rum**', async (route) => {
    const req = route.request()
    let body = null
    try {
      body = JSON.parse(req.postData() ?? 'null')
    } catch {
      /* Not JSON: recorded with no eventType. */
    }
    events.push({ eventType: body?.eventType ?? null, location: body?.location ?? null })
    await route.fulfill({ status: 204, body: '' })
  })
  const page = await ctx.newPage()
  await page.bringToFront()
  const loads = () => events.filter((e) => e.eventType === 1).length
  return { ctx, page, events, loads }
}

/** Wait until the research has rendered, then for the beacon's first Load. */
async function settle(s) {
  await s.page.waitForFunction(() => !document.querySelector('.topic-section .loading'), null, { timeout: 30_000 })
    .catch(() => {})
  const t0 = Date.now()
  while (s.loads() === 0 && Date.now() - t0 < 20_000) await s.page.waitForTimeout(250)
  await s.page.waitForTimeout(QUIET)
}

const hash = (page) => page.evaluate(() => location.hash)

/** Click a card's summary (by id) and return the resulting hash. */
async function clickCard(page, id) {
  await page.locator(`[id="${id}"] > summary`).click()
  await page.waitForTimeout(150)
  return hash(page)
}

/**
 * The card + chip sequence on a settled Providence Day page. Returns the
 * failures, each prefixed with `label`.
 */
async function clicks(s, label) {
  const bad = []
  const { page } = s
  const cards = await page.evaluate(() =>
    [...document.querySelectorAll('details.note-card')]
      .filter((d) => !d.parentElement.closest('.note-card') && d.id.includes('/') && !d.open)
      .map((d) => d.id),
  )
  /* Three cards from three different areas where possible. */
  const picked = []
  for (const id of cards) {
    if (picked.length === 3) break
    if (!picked.some((p) => p.split('/')[0] === id.split('/')[0])) picked.push(id)
  }
  for (const id of cards) if (picked.length < 3 && !picked.includes(id)) picked.push(id)
  if (picked.length < 3) bad.push(`${label}: only ${picked.length} closed cards to open`)
  for (const id of picked) {
    const h = await clickCard(page, id)
    if (h !== `#${id}`) bad.push(`${label}: opening ${id} left the hash "${h}"`)
  }
  const last = picked.at(-1)
  if (last) {
    const h = await clickCard(page, last)
    const area = `#${last.split('/')[0]}`
    if (h !== area) bad.push(`${label}: closing ${last} left the hash "${h}", expected "${area}"`)
  }
  const chipHrefs = await page.evaluate(() =>
    [...document.querySelectorAll('.school-header-topics a.chip')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && h !== '#welcome' && h !== '#news'),
  )
  for (const href of chipHrefs.slice(0, 2)) {
    await page.locator(`.school-header-topics a.chip[href="${href}"]`).click()
    await page.waitForTimeout(150)
    const h = await hash(page)
    if (h !== href) bad.push(`${label}: the ${href} chip left the hash "${h}"`)
  }
  if (chipHrefs.length < 2) bad.push(`${label}: fewer than 2 area chips`)
  const welcome = page.locator('.school-header-topics a.chip[href="#welcome"]')
  if (await welcome.count()) {
    await welcome.click()
    await page.waitForTimeout(150)
    const h = await hash(page)
    if (h !== '') bad.push(`${label}: the Welcome Video chip left the hash "${h}"`)
  } else {
    bad.push(`${label}: no Welcome Video chip`)
  }
  await page.waitForTimeout(QUIET)
  return bad
}

/** Record one assertion. On a miss, `s` adds every beacon POST seen so far. */
function expect(label, got, want, s) {
  const ok = got === want
  lines.push(`${ok ? '✓' : '✗'} ${label}: ${got} Load event(s), expected ${want}`)
  if (!ok) {
    const seen = s ? `\n      beacon POSTs: ${s.events.map((e) => `${e.eventType}@${e.location}`).join(', ')}` : ''
    failures.push(`${label}: ${got} Load event(s), expected ${want}${seen}`)
  }
}

/* 0. The Navigation API must exist, or this measures the wrong beacon path. */
{
  const s = await session()
  await s.page.goto(`${BASE}/school/providence-day/`, { waitUntil: 'domcontentloaded' })
  const nav = await s.page.evaluate(() => 'navigation' in window)
  if (!nav) {
    console.error('✗ this browser has no Navigation API, so the beacon would not use it and this audit proves nothing.')
    await browser.close()
    process.exit(2)
  }
  await settle(s)
  if (s.loads() === 0) {
    console.error(
      `✗ the beacon sent no Load event from ${BASE} (${s.events.length} POSTs seen) — nothing to count.\n` +
        '  If it will not report from localhost, re-run with --base https://charlotteschoolinsights.com\n' +
        '  after a deploy, with the user\'s go-ahead (every POST is still intercepted).',
    )
    await browser.close()
    process.exit(2)
  }
  /* 1. Plain English page, then the click sequence. */
  expect('load /school/providence-day/', s.loads(), 1, s)
  failures.push(...(await clicks(s, 'providence-day')))
  expect('…after 3 card opens, 1 close, 2 area chips, Welcome', s.loads(), 1, s)
  await s.ctx.close()
}

/* 2. The same with ?lang=es, then an in-app link to another school. */
{
  const s = await session()
  await s.page.goto(`${BASE}/school/providence-day/?lang=es`, { waitUntil: 'domcontentloaded' })
  await settle(s)
  expect('load /school/providence-day/?lang=es', s.loads(), 1, s)
  failures.push(...(await clicks(s, 'providence-day ?lang=es')))
  expect('…after the same clicks', s.loads(), 1, s)

  const before = s.loads()
  const link = s.page.locator('a[href^="/school/"]:not([href^="/school/providence-day/"]):not([target="_blank"])').first()
  if (!(await link.count())) {
    failures.push('no in-app link to another school on /school/providence-day/')
  } else {
    const href = await link.getAttribute('href')
    /* The cross-school links sit inside research cards (the Cup table). Open
       the card programmatically, which writes no URL, then click for real. */
    await link.evaluate((a) => {
      for (let d = a.closest('details'); d; d = d.parentElement?.closest('details')) d.open = true
    })
    /* The Welcome chip's re-aiming scroll (scrollToSection) can still be
       moving the page; a click mid-scroll lands on whatever slid under the
       pointer. Bring the link in and let it settle first. */
    await link.scrollIntoViewIfNeeded()
    await s.page.waitForTimeout(1500)
    await link.click()
    await s.page.waitForFunction(
      (h) => location.pathname === new URL(h, location.href).pathname,
      href,
      { timeout: 10_000 },
    ).catch(() => {})
    await s.page.waitForTimeout(QUIET)
    const url = await s.page.evaluate(() => location.pathname + location.search)
    if (!url.startsWith(href)) failures.push(`clicking ${href} did not navigate (now ${url})`)
    if (!url.includes('lang=es')) failures.push(`in-app navigation dropped ?lang=es (now ${url})`)
    expect(`in-app link → ${href} (with ?lang=es)`, s.loads() - before, 1, s)
  }
  await s.ctx.close()
}

/* 3. Compare: one school toggle on a URL with ?topic=&schools=. */
{
  const s = await session()
  await s.page.goto(`${BASE}/compare/?topic=sports&schools=providence-day,charlotte-latin,cannon`, {
    waitUntil: 'domcontentloaded',
  })
  await s.page.waitForSelector('.pill.school', { timeout: 30_000 }).catch(() => {})
  await settle(s)
  expect('load /compare/?topic=sports&schools=…', s.loads(), 1, s)
  const before = s.loads()
  const pill = s.page.locator('.pill.school:not(.on)').first()
  if (!(await pill.count())) {
    failures.push('no unselected school toggle on Compare')
  } else {
    await pill.click()
    await s.page.waitForTimeout(QUIET)
    const search = await s.page.evaluate(() => location.search)
    if (!search.includes('schools=')) failures.push(`the Compare toggle left no ?schools= (now "${search}")`)
    expect('Compare school toggle', s.loads() - before, 1, s)
  }
  await s.ctx.close()
}

/* 4. A language switch through the real picker. */
{
  const s = await session()
  await s.page.goto(`${BASE}/school/providence-day/`, { waitUntil: 'domcontentloaded' })
  await settle(s)
  const before = s.loads()
  await s.page.locator('.lang-trigger').first().click()
  await s.page.locator('.lang-row:has(.lang-row-native[lang="es"])').first().click()
  await s.page.waitForFunction(() => document.documentElement.lang.startsWith('es'), null, { timeout: 15_000 })
    .catch(() => {})
  await s.page.waitForTimeout(QUIET)
  const search = await s.page.evaluate(() => location.search)
  if (!search.includes('lang=es')) failures.push(`the language switch did not write ?lang=es (now "${search}")`)
  expect('language switch to Español', s.loads() - before, 0, s)
  await s.ctx.close()
}

await browser.close()
for (const l of lines) console.log(l)
if (failures.length) {
  console.error(`\naudit:pageviews — ${failures.length} failure(s):`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log('\naudit:pageviews — ok: 1 page-view per load, 0 for card/chip clicks and language switch, 1 per in-app navigation')
