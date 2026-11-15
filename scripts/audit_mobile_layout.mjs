#!/usr/bin/env node
/**
 * Phone-width layout census: every research card that pushes the page sideways,
 * clips a figure, or needs a sideways swipe, on every school page.
 *
 * WHY THIS EXISTS. When it was written (2026-10-09, plan `mobileready`) every
 * school page scrolled sideways on a phone once its cards were opened — 678 to
 * 2,366px wide at a 390px viewport. The card grid track was a bare `1fr`, which
 * can never be narrower than its widest child, so one opened wide card widened
 * every card in its area. With every card CLOSED the page was exactly viewport
 * width, which is why no one saw it: a closed card is 345px, an open one 716px.
 * The After School Coverage Map was also clipping its prices behind an ellipsis
 * whose only fallback was a `title` tooltip — which a touch device never shows.
 *
 * WHAT IT FLAGS, per element under each `.topic-section`:
 *   BROKEN (exit 1)
 *     page-overflow  an element extends past its section's edges with no
 *                    clipping ancestor short of the page — the page scrolls
 *     text-overflow  a text run does the same
 *     clipped        an `overflow: hidden` box is cutting its own content off
 *     clipped-text   a text run cut off by an `overflow: hidden` ancestor
 *     doc-overflow   documentElement.scrollWidth exceeds the viewport
 *   SIDEWAYS SCROLL (reported, exit 0)
 *     inner-scroll   a deliberate `overflow-x: auto` wrapper needing a swipe —
 *                    usable, so a legitimate permanent count never parks this red
 *
 * Overflow is measured against the enclosing `.topic-section`'s edges, not
 * 0…innerWidth: in RTL a single page-level overflow shifts the whole layout,
 * and every element would otherwise read as off-screen.
 *
 * Labels come from the DOM: area = the section's <h2>, card = the outermost
 * `.note-card`'s `summary .topic-title`.
 *
 * SCOPED BY DEFAULT (plan `auditscope`). A run visits only the school pages
 * the branch changed since `main` (scripts/audit_scope.mjs), loads each through
 * its card deep link, and opens and measures only the changed cards (or their
 * whole areas). The doc-overflow check stays page-level, which still means
 * something because only the scoped cards are open. Any render-code change
 * (components, src/lib, CSS, locale catalogs…) or unrecognized src/ path
 * switches to the FULL sweep by itself and prints the path that caused it.
 * `--all` forces the full sweep: use it after adding a render site or a locale.
 * `--only` intersects with the scope (with `--all` it means what it always did).
 *
 * Needs a built site being served (it is not part of `npm run build`):
 *   npm run build && npx vite preview        # serves http://localhost:4173
 *   npm run audit:mobile                      # scoped, en at 320/360/390
 *   npm run audit:mobile -- --all             # every school page
 *   npm run audit:mobile -- --since <ref>
 *   npm run audit:mobile -- --lang fr --lang ar --widths 360
 *   npm run audit:mobile -- --all --only cannon,gaston-day --base http://localhost:4319
 * It prints one progress line per page as it goes. Do NOT pipe it into `tail`:
 * that buffers the whole run, and a slow run then looks hung.
 *
 * Playwright Chromium with `isMobile` + touch. domcontentloaded plus a settle
 * wait, never networkidle — school pages never go idle. Every <details> in
 * scope is forced open and every admissions band tab clicked, because a
 * collapsed panel renders nothing a scan can see.
 *
 * Exit 0 clean · 1 broken findings or doc overflow · 2 bad usage or the server
 * is unreachable.
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { hashFor, markRoots, printScope, progress, resolveScope, rootsFor, scopeFlags, settle } from './audit_scope.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const BASE = val('--base', 'http://localhost:4173').replace(/\/$/, '')
const WIDTHS = val('--widths', '320,360,390').split(',').map(Number)
const ONLY = val('--only', '') ? val('--only', '').split(',') : null
const LANGS = args.flatMap((a, i) => (a === '--lang' ? [args[i + 1]] : []))
if (!LANGS.length) LANGS.push('en')
if (WIDTHS.some((w) => !Number.isFinite(w) || w < 200)) {
  console.error(`✗ bad --widths ${val('--widths')}`)
  process.exit(2)
}

const roster = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8')).schools
const schools = roster.filter((s) => !ONLY || ONLY.includes(s.slug))
if (!schools.length) {
  console.error(`✗ --only ${ONLY.join(',')} matched no school slug`)
  process.exit(2)
}

// No Compare or checklist loop here, so the scope's own are ignored.
const scope = await resolveScope({ ...scopeFlags(args), compareTopics: [] })
if (printScope(scope)) process.exit(0)
const pages = scope.full
  ? schools.map((s) => ({ slug: s.slug, whole: true, areas: {} }))
  : scope.pages.filter((p) => schools.some((s) => s.slug === p.slug))
if (!pages.length) {
  console.log(`→ nothing in scope for --only ${ONLY.join(',')}, use --all for a full sweep`)
  process.exit(0)
}
const nameOf = (slug) => roster.find((s) => s.slug === slug)?.name ?? slug

try {
  const r = await fetch(`${BASE}/`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
} catch (e) {
  console.error(`✗ ${BASE} is unreachable (${e.message}). Run \`npm run build && npx vite preview\` first.`)
  process.exit(2)
}

// `vw` is passed in, never read from window.innerWidth: under isMobile emulation
// Chrome widens the layout viewport to fit overflowing content, so innerWidth
// grows with the very defect being measured. `secIds` limits the measured
// sections to the scoped areas (null = every .topic-section).
const scan = (page, vw, secIds = null) => page.evaluate(([vw, secIds]) => {
  const out = []
  const visible = (el) => {
    const s = getComputedStyle(el)
    if (s.display === 'none' || s.visibility === 'hidden') return false
    const r = el.getBoundingClientRect()
    if (!(r.width > 1 && r.height > 1)) return false
    // Visually-hidden content (the .sr-only pattern: clip rect(0 0 0 0) on a
    // 1px box) lays its text out at full width but paints none of it. The NC
    // admit-rate ledger hides its <thead> this way on phones, and its French
    // header text read as +23px clipped-text on 11 schools.
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const as = a === el ? s : getComputedStyle(a)
      if (as.clip !== 'auto' && as.position === 'absolute' && /rect\(0px,? 0px,? 0px,? 0px\)/.test(as.clip)) return false
    }
    return true
  }
  const chain = (el) => {
    const c = []
    for (let e = el; e && c.length < 4 && !e.classList?.contains('topic-section'); e = e.parentElement) {
      if (typeof e.className === 'string' && e.className) c.push(`${e.tagName.toLowerCase()}.${e.className.split(' ')[0]}`)
      else c.push(e.tagName.toLowerCase())
    }
    return c.join(' < ')
  }
  const cardOf = (el) => {
    let outer = el.closest('.note-card')
    if (outer) {
      while (outer.parentElement?.closest('.note-card')) outer = outer.parentElement.closest('.note-card')
      const t = outer.querySelector(':scope > summary .topic-title') || outer.querySelector('.topic-title')
      return (t?.textContent || '(untitled card)').trim()
    }
    for (const [sel, name] of [['.stat-strip', '[section stat strip]'], ['.adm-stat-band', '[admissions stat band]'], ['.podcast', '[podcast strip]'], ['.news', '[Latest News]'], ['.welcome', '[welcome video]'], ['.topic-section-head', '[section header]']]) {
      if (el.closest(sel)) return name
    }
    for (let e = el; e && !e.classList.contains('topic-section'); e = e.parentElement) {
      if (e.parentElement?.classList.contains('topic-section')) return `[${e.className.split(' ')[0] || e.tagName.toLowerCase()}]`
    }
    return '[section]'
  }
  const isPage = (a) => a === document.documentElement || a === document.body
  const clipAnc = (el) => {
    for (let a = el.parentElement; a; a = a.parentElement) {
      const s = getComputedStyle(a)
      if (s.overflowX !== 'visible') return { a, mode: s.overflowX }
      if (isPage(a)) break
    }
    return null
  }
  for (const sec of document.querySelectorAll('.topic-section')) {
    if (secIds && !secIds.includes(sec.id)) continue
    const area = sec.querySelector('h2')?.textContent.trim() || sec.id
    // The section's own box is the frame — never 0…vw. A block-level section
    // keeps the viewport's width even when its content overflows, but in RTL a
    // page-level overflow shifts every section sideways, and measuring against
    // the viewport would report every element on the page.
    const sr = sec.getBoundingClientRect()
    const L = sr.left, R = sr.right
    const past = (r) => r.right > R + 1 || r.left < L - 1
    const by = (r) => Math.round(Math.max(r.right - R, L - r.left))
    for (const el of sec.querySelectorAll('*')) {
      if (!visible(el)) continue
      const s = getComputedStyle(el)
      if (s.overflowX === 'auto' || s.overflowX === 'scroll') {
        if (el.scrollWidth > el.clientWidth + 2) {
          out.push({ area, card: cardOf(el), kind: 'inner-scroll', px: el.scrollWidth - el.clientWidth, where: chain(el) })
        }
      } else if ((s.overflowX === 'hidden' || s.overflowX === 'clip') && el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 4 && (el.textContent || '').trim()) {
        out.push({ area, card: cardOf(el), kind: 'clipped', px: el.scrollWidth - el.clientWidth, where: chain(el), text: el.textContent.trim().slice(0, 60) })
      }
      const r = el.getBoundingClientRect()
      if (past(r)) {
        const ca = clipAnc(el)
        if (!ca || isPage(ca.a)) {
          // only the outermost offender
          if (!past(el.parentElement.getBoundingClientRect())) {
            out.push({ area, card: cardOf(el), kind: 'page-overflow', px: by(r), where: chain(el), text: (el.textContent || '').trim().slice(0, 60) })
          }
        }
      }
    }
    // text runs overrunning their block (long unbreakable tokens)
    const w = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT)
    for (let n; (n = w.nextNode());) {
      if (!n.nodeValue.trim() || !n.parentElement || !visible(n.parentElement)) continue
      const range = document.createRange(); range.selectNodeContents(n)
      const r = range.getBoundingClientRect()
      if (!past(r)) continue
      const ca = clipAnc(n.parentElement)
      if (ca && (ca.mode === 'auto' || ca.mode === 'scroll') && !isPage(ca.a)) continue // counted as inner-scroll
      out.push({ area, card: cardOf(n.parentElement), kind: ca && !isPage(ca.a) ? 'clipped-text' : 'text-overflow', px: by(r), where: chain(n.parentElement), text: n.nodeValue.trim().slice(0, 60) })
    }
  }
  return { out, docOverflow: document.documentElement.scrollWidth - vw }
}, [vw, secIds])

const BROKEN = new Set(['page-overflow', 'text-overflow', 'clipped', 'clipped-text'])
const browser = await chromium.launch({ headless: true })
let broken = 0, docs = 0
const prog = progress(LANGS.length * WIDTHS.length * pages.length)

for (const lang of LANGS) {
  const findings = []
  for (const vw of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
    // Never log page-views from an audit.
    await ctx.route(/cloudflareinsights\.com/, (r) => r.abort())
    const page = await ctx.newPage()
    for (const pg of pages) {
      const t0 = Date.now()
      const name = nameOf(pg.slug)
      const hash = hashFor(pg)
      const roots = pg.whole ? null : rootsFor(pg)
      await page.goto(`${BASE}/school/${pg.slug}/?lang=${lang}${hash ? `#${hash}` : ''}`, { waitUntil: 'domcontentloaded' })
      let sel = 'body', secIds = null, bands = '.adm-band'
      if (roots) {
        await settle(page)
        for (const note of await page.evaluate(markRoots, roots)) console.log(`  note: /school/${pg.slug}/#${hash}: ${note}`)
        sel = '[data-audit-root]'
        secIds = Object.keys(pg.areas).map((t) => `topic-${t}`)
        bands = '#topic-admissions .adm-band'
      } else {
        await page.waitForTimeout(2500)
        for (let y = 0; y < 40; y++) { await page.evaluate(() => window.scrollBy(0, 2500)); await page.waitForTimeout(60) }
        await page.waitForTimeout(800)
      }
      const openAll = () => page.evaluate((sel) => document.querySelectorAll(sel).forEach((r) => {
        if (r.tagName === 'DETAILS') r.open = true
        r.querySelectorAll('details').forEach((d) => { d.open = true })
      }), sel)
      await openAll(); await page.waitForTimeout(400)
      const collect = async () => {
        const { out, docOverflow } = await scan(page, vw, secIds)
        for (const f of out) findings.push({ vw, school: name, ...f })
        if (docOverflow > 0) findings.push({ vw, school: name, kind: 'doc-overflow', px: docOverflow })
      }
      await collect()
      if (!roots || 'admissions' in pg.areas) {
        const n = await page.locator(bands).count()
        for (let i = 1; i < n; i++) {
          await page.locator(bands).nth(i).click().catch(() => {})
          await page.waitForTimeout(250)
          if (roots) await page.evaluate(markRoots, roots)
          await openAll()
          await collect()
        }
      }
      prog.step(`${lang} ${vw}px /school/${pg.slug}/${hash ? `#${hash}` : ''}`, t0)
    }
    await ctx.close()
  }

  // One line per <School> - <Area> - <Card>, each failing element folded to
  // its worst overflow and the widths it fails at.
  const rows = new Map()
  for (const x of findings) {
    if (x.kind === 'doc-overflow') continue
    const k = `${x.school} - ${x.area} - ${x.card}`
    const o = rows.get(k) ?? { broken: new Map(), scroll: new Map() }
    const bucket = BROKEN.has(x.kind) ? o.broken : o.scroll
    const sig = `${x.kind}: ${x.where.split(' < ')[0]}`
    const prev = bucket.get(sig) ?? { px: 0, w: new Set() }
    prev.px = Math.max(prev.px, x.px); prev.w.add(x.vw)
    bucket.set(sig, prev)
    rows.set(k, o)
  }
  const fmt = (m) => [...m].map(([sig, v]) => `${sig} (+${v.px}px @${[...v.w].sort((a, b) => a - b).join('/')})`).join('; ')
  const sorted = [...rows].sort(([a], [b]) => a.localeCompare(b))
  const nBroken = sorted.filter(([, o]) => o.broken.size).length
  const nScroll = sorted.filter(([, o]) => !o.broken.size && o.scroll.size).length
  const dm = new Map()
  for (const d of findings.filter((x) => x.kind === 'doc-overflow')) {
    const k = `${d.school}@${d.vw}`
    dm.set(k, Math.max(dm.get(k) ?? 0, d.px))
  }
  broken += nBroken; docs += dm.size

  console.log(`\n=== ${lang} @ ${WIDTHS.join('/')}px — ${pages.length} school(s)${scope.full ? '' : ', scoped'} ===`)
  console.log(`\nBROKEN (${nBroken} card(s))`)
  for (const [k, o] of sorted) if (o.broken.size) console.log(`  ${k}\n      ${fmt(o.broken)}`)
  console.log(`\nSIDEWAYS SCROLL (${nScroll} card(s) — usable, not a failure)`)
  for (const [k, o] of sorted) if (!o.broken.size && o.scroll.size) console.log(`  ${k}\n      ${fmt(o.scroll)}`)
  console.log(`\nDOC OVERFLOW (${dm.size})`)
  console.log(dm.size ? '  ' + [...dm].map(([k, v]) => `${k}:+${v}`).join('  ') : '  none')
}
await browser.close()
console.log(`\n${scope.full ? 'full sweep' : 'scoped run'}: ${prog.elapsed()}`)

if (broken || docs) {
  console.log(`\n✗ ${broken} broken card finding(s), ${docs} doc-overflow page(s). A grid track that is a bare \`1fr\` grows to its widest child — use minmax(0, 1fr) and min-width: 0.`)
  process.exit(1)
}
console.log('\n✓ no broken card and no page overflow at any width')
