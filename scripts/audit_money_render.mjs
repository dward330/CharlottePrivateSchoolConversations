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
 * Needs a built site being served (it is not part of `npm run build`):
 *   npm run build && npx vite preview        # serves http://localhost:4173
 *   npm run audit:moneyrender                 # es + fr
 *   npm run audit:moneyrender -- --lang it --base http://localhost:4319
 *
 * Real Chrome via Playwright (channel 'chrome', headed). domcontentloaded plus a
 * settle wait, never networkidle — school pages never go idle. Every <details>
 * is forced open and every admissions band tab clicked, because a collapsed
 * panel renders nothing a scan can see.
 *
 * Exit 0 clean · 1 findings · 2 bad usage or the server is unreachable.
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

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

try {
  const r = await fetch(`${BASE}/`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
} catch (e) {
  console.error(`✗ ${BASE} is unreachable (${e.message}). Run \`npm run build && npx vite preview\` first.`)
  process.exit(2)
}

const slugs = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8')).schools.map((s) => s.slug)
const COMPARE_TOPICS = ['financial-aid-tuition', 'admissions', 'after-school', 'summer-programs', 'college-support']
const BANDS = ['', 'tkk5', 'es', 'ms', 'hs', 'intl', 'lower', 'middle', 'upper']

const browser = await chromium.launch({ channel: 'chrome', headless: false })
const page = await browser.newPage()

// Text nodes and read attributes holding "$<digit>", each with the classes of
// its nearest four ancestors — the class chain is how a finding maps to JSX.
const harvest = () => page.evaluate(() => {
  const chainOf = (el) => {
    const chain = []
    while (el && chain.length < 4) {
      if (typeof el.className === 'string' && el.className) chain.push(el.className.split(' ')[0])
      el = el.parentElement
    }
    return chain.join(' < ')
  }
  const out = []
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  for (let n; (n = w.nextNode());) {
    if (/\$\d/.test(n.nodeValue)) out.push({ cls: chainOf(n.parentElement), text: n.nodeValue.trim().slice(0, 100) })
  }
  for (const el of document.body.querySelectorAll('[title],[aria-label]')) {
    for (const a of ['title', 'aria-label']) {
      const v = el.getAttribute(a)
      if (v && /\$\d/.test(v)) out.push({ cls: `@${a} ${chainOf(el)}`, text: v.slice(0, 100) })
    }
  }
  return out
})

const openAll = () => page.evaluate(() => document.querySelectorAll('details').forEach((d) => { d.open = true }))

async function visit(url, route, rows) {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2500)
  for (let y = 0; y < 30; y++) { await page.mouse.wheel(0, 3000); await page.waitForTimeout(60) }
  await openAll()
  await page.waitForTimeout(300)
  const seen = new Set()
  const take = async () => {
    for (const r of await harvest()) {
      const k = `${r.cls}|${r.text}`
      if (!seen.has(k)) { seen.add(k); rows.push({ route, ...r }) }
    }
  }
  await take()
  const n = await page.locator('.adm-band').count()
  for (let i = 0; i < n; i++) {
    await page.locator('.adm-band').nth(i).click()
    await page.waitForTimeout(250)
    await openAll()
    await take()
  }
}

let total = 0
for (const lang of LANGS) {
  const rows = []
  for (const s of slugs) await visit(`${BASE}/school/${s}/?lang=${lang}`, `/school/${s}/`, rows)
  for (const topic of COMPARE_TOPICS) {
    const q = new URLSearchParams({ topic, schools: slugs.join(','), lang })
    await visit(`${BASE}/compare/?${q}`, `/compare/ ${topic}`, rows)
  }
  for (const s of slugs) {
    for (const band of BANDS) {
      const q = new URLSearchParams(band ? { band, lang } : { lang })
      await page.goto(`${BASE}/school/${s}/admissions-checklist/?${q}`, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(1200)
      for (const r of await harvest()) rows.push({ route: `/school/${s}/admissions-checklist/ ${band || '(default)'}`, ...r })
    }
  }
  // The checklist is visited once per band, and a band the school lacks falls
  // back to its default, so identical findings repeat; count each once.
  const uniq = [...new Map(rows.map((r) => [`${r.route.split(' ')[0]}|${r.cls}|${r.text}`, r])).values()]
  total += uniq.length
  if (!uniq.length) { console.log(`✓ ${lang}: no unlocalized "$" figure on any school, Compare or checklist page`); continue }
  const by = {}
  for (const r of uniq) (by[r.cls.split(' < ')[0]] ??= []).push(r)
  console.log(`✗ ${lang}: ${uniq.length} unlocalized figure(s) across ${Object.keys(by).length} render site(s)`)
  for (const [cls, rs] of Object.entries(by).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(rs.length).padStart(4)}  ${rs[0].cls}`)
    console.log(`        ${rs[0].route}  ${JSON.stringify(rs[0].text)}`)
  }
}
await browser.close()
if (total) {
  console.log('\nWrap the field at its render site in localizeMoneyText() (src/lib/format.ts) — once, at the leaf that renders the text.')
  process.exit(1)
}
