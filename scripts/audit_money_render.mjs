#!/usr/bin/env node
/**
 * Rendered-page census: every "$<digit>" that reaches the screen unlocalized.
 *
 * WHY THIS EXISTS. Research data writes money US-style ("$11.50") and
 * localizeMoneyText() re-renders it per locale ("11,50 US$"). That works only if
 * every path to the screen calls it. check:money greps JSX for identifiers that
 * SOUND like money (value, price, fee…) — but 363 figures across 25 render sites
 * reached Spanish pages raw through fields named label, text, detail, action,
 * teaser and title, which no identifier grep can see. Trinity's Financial Aid
 * row "Comida (FLIK) — por menú · $11.50" sat two lines from "11,50 US$".
 *
 * THE DETECTOR. In es/fr/it a localized figure TRAILS its currency ("250 US$",
 * "250 $US", "250 USD"), so any "$" followed by a digit in their rendered text
 * skipped localization. Locales whose localized figure keeps a leading "$"
 * (en, ht, hi, te) or is isolated (bn, fa, ar) cannot be scanned this way.
 *
 * SCOPED BY DEFAULT (plan `auditscope`). A run visits only what the branch
 * changed since `main` (scripts/audit_scope.mjs): each changed card is loaded
 * through its deep link (`/school/<slug>/#<area>/<card>`) and only that card,
 * or its whole area when the change is not card-level, is opened and scanned.
 * A Compare topic or admissions checklist is visited only when the changed data
 * renders there. Any render-code change (components, src/lib — format.ts is
 * there — CSS, locale catalogs…) or unrecognized src/ path switches to the FULL
 * sweep by itself and prints the path that caused it. `--all` forces the full
 * sweep: use it after adding a render site or a locale. `npm run audit:scope`
 * prints the scope without opening a browser.
 *
 * Needs a built site being served (it is not part of `npm run build`):
 *   npm run build && npx vite preview        # serves http://localhost:4173
 *   npm run audit:moneyrender                 # scoped, es + fr
 *   npm run audit:moneyrender -- --all        # full sweep
 *   npm run audit:moneyrender -- --since <ref>
 *   npm run audit:moneyrender -- --lang it --base http://localhost:4319
 * It prints one progress line per page as it goes. Do NOT pipe it into `tail`:
 * that buffers the whole run, and a slow run then looks hung.
 *
 * Real Chrome via Playwright (channel 'chrome', headed). domcontentloaded plus a
 * settle wait, never networkidle — school pages never go idle. Every <details>
 * in scope is forced open and every admissions band tab clicked, because a
 * collapsed panel renders nothing a scan can see.
 *
 * Exit 0 clean · 1 findings · 2 bad usage or the server is unreachable.
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { markRoots, planVisits, printScope, progress, resolveScope, scopeFlags, settle } from './audit_scope.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const BASE = val('--base', 'http://localhost:4173').replace(/\/$/, '')
const LANGS = args.flatMap((a, i) => (a === '--lang' ? [args[i + 1]] : []))
if (!LANGS.length) LANGS.push('es', 'fr')

const SCANNABLE = ['es', 'fr', 'it']
const bad = LANGS.filter((l) => !SCANNABLE.includes(l))
if (bad.length) {
  console.error(`✗ cannot scan ${bad.join(', ')}: a localized figure there keeps a leading "$" (en/ht/hi/te) or sits in a bidi isolate (bn/fa/ar), so raw and localized look alike. Use ${SCANNABLE.join('/')}.`)
  process.exit(2)
}

const COMPARE_TOPICS = ['financial-aid-tuition', 'admissions', 'after-school', 'summer-programs', 'college-support']
const BANDS = ['', 'tkk5', 'es', 'ms', 'hs', 'intl', 'lower', 'middle', 'upper']
const scope = await resolveScope({ ...scopeFlags(args), compareTopics: COMPARE_TOPICS })
if (printScope(scope)) process.exit(0)

try {
  const r = await fetch(`${BASE}/`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
} catch (e) {
  console.error(`✗ ${BASE} is unreachable (${e.message}). Run \`npm run build && npx vite preview\` first.`)
  process.exit(2)
}

const slugs = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8')).schools.map((s) => s.slug)

const browser = await chromium.launch({ channel: 'chrome', headless: false })
const page = await browser.newPage()
// Never log page-views from an audit.
await page.route(/cloudflareinsights\.com/, (r) => r.abort())

// Text nodes and read attributes holding "$<digit>", each with the classes of
// its nearest four ancestors — the class chain is how a finding maps to JSX.
// `rootSel` limits the scan: 'body' in a full sweep, '[data-audit-root]' (the
// scoped cards and areas) otherwise.
const harvest = (rootSel = 'body') => page.evaluate((rootSel) => {
  const chainOf = (el) => {
    const chain = []
    while (el && chain.length < 4) {
      if (typeof el.className === 'string' && el.className) chain.push(el.className.split(' ')[0])
      el = el.parentElement
    }
    return chain.join(' < ')
  }
  const out = []
  for (const root of document.querySelectorAll(rootSel)) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    for (let n; (n = w.nextNode());) {
      if (/\$\d/.test(n.nodeValue)) out.push({ cls: chainOf(n.parentElement), text: n.nodeValue.trim().slice(0, 100) })
    }
    for (const el of [root, ...root.querySelectorAll('[title],[aria-label]')]) {
      for (const a of ['title', 'aria-label']) {
        const v = el.getAttribute(a)
        if (v && /\$\d/.test(v)) out.push({ cls: `@${a} ${chainOf(el)}`, text: v.slice(0, 100) })
      }
    }
  }
  return out
}, rootSel)

const openAll = (rootSel = 'body') => page.evaluate((sel) => document.querySelectorAll(sel).forEach((r) => {
  if (r.tagName === 'DETAILS') r.open = true
  r.querySelectorAll('details').forEach((d) => { d.open = true })
}), rootSel)

async function visit(v, rows) {
  await page.goto(v.url, { waitUntil: 'domcontentloaded' })
  let sel = 'body', bands = '.adm-band'
  if (v.roots) {
    // Scoped: wait for the research to render, tag the scoped cards/areas, and
    // scan only inside them. A card that did not render widens to its area.
    await settle(page)
    for (const note of await page.evaluate(markRoots, v.roots)) console.log(`  note: ${v.label}: ${note}`)
    sel = '[data-audit-root]'
    bands = '#topic-admissions .adm-band'
  } else {
    await page.waitForTimeout(2500)
    for (let y = 0; y < 30; y++) { await page.mouse.wheel(0, 3000); await page.waitForTimeout(60) }
  }
  await openAll(sel)
  await page.waitForTimeout(300)
  const seen = new Set()
  const take = async () => {
    for (const r of await harvest(sel)) {
      const k = `${r.cls}|${r.text}`
      if (!seen.has(k)) { seen.add(k); rows.push({ route: v.route, ...r }) }
    }
  }
  await take()
  if (!v.admissions) return
  const n = await page.locator(bands).count()
  for (let i = 0; i < n; i++) {
    await page.locator(bands).nth(i).click()
    await page.waitForTimeout(250)
    if (v.roots) await page.evaluate(markRoots, v.roots)
    await openAll(sel)
    await take()
  }
}

const plans = LANGS.map((lang) => [lang, planVisits(scope, { base: BASE, lang, slugs, compareTopics: COMPARE_TOPICS, bands: BANDS })])
const prog = progress(plans.reduce((n, [, p]) => n + p.length, 0))
let total = 0
for (const [lang, visits] of plans) {
  const rows = []
  for (const v of visits) {
    const t0 = Date.now()
    if (v.kind === 'checklist') {
      await page.goto(v.url, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(1200)
      for (const r of await harvest()) rows.push({ route: v.route, ...r })
    } else {
      await visit(v, rows)
    }
    prog.step(`${lang} ${v.label}`, t0)
  }
  // The checklist is visited once per band, and a band the school lacks falls
  // back to its default, so identical findings repeat; count each once.
  const uniq = [...new Map(rows.map((r) => [`${r.route.split(' ')[0]}|${r.cls}|${r.text}`, r])).values()]
  total += uniq.length
  if (!uniq.length) { console.log(`✓ ${lang}: no unlocalized "$" figure on any ${scope.full ? '' : 'scoped '}school, Compare or checklist page`); continue }
  const by = {}
  for (const r of uniq) (by[r.cls.split(' < ')[0]] ??= []).push(r)
  console.log(`✗ ${lang}: ${uniq.length} unlocalized figure(s) across ${Object.keys(by).length} render site(s)`)
  for (const [cls, rs] of Object.entries(by).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(rs.length).padStart(4)}  ${rs[0].cls}`)
    console.log(`        ${rs[0].route}  ${JSON.stringify(rs[0].text)}`)
  }
}
await browser.close()
console.log(`\n${scope.full ? 'full sweep' : 'scoped run'}: ${prog.elapsed()}`)
if (total) {
  console.log('\nWrap the field at its render site in localizeMoneyText() (src/lib/format.ts) — once, at the leaf that renders the text.')
  process.exit(1)
}
