#!/usr/bin/env node
/**
 * Rendered-page census: every English-form date that reaches a translated page.
 *
 * WHY THIS EXISTS. check:dates (check_date_forms.mjs) reads the work files, so it
 * sees only strings the prose extractor extracted. A field the extractor SKIPS
 * never reaches a work file, renders its English verbatim in every locale, and is
 * invisible to it. When this audit was written (2026-10-05) it found 54 such
 * dates per locale: 53 in the admissions deadline strip and stat tiles
 * (`guide.bands[].deadlines[].value`, `guide.stats[].value` — "Nov 2, 2026" beside
 * fully translated Italian prose) and 1 in a Student Clubs service tile
 * (`service.programs[].value`, Charlotte Catholic "March 1"). All three were
 * skipped as `value` figures; PATH_OVERRIDES in i18n_fields.mjs now promotes them.
 * The next skipped field is meant to be found here, by a scan, not by a reader.
 *
 * THE DETECTOR is check_date_forms.mjs's DATE regex, copied (that file runs at
 * module scope and cannot be imported). An English month name is detectable in
 * every script, so all of PROSE_TRANSLATED is scannable.
 *
 * EXCLUSIONS are structural only — never a hash or string allowlist, so the
 * audit can read 0:
 *   1. anything under an element whose class starts with `news-` — the Latest
 *      News section is never translated (CLAUDE.md's one exception);
 *   2. anything under `.prose-table` — src/content markdown table rows are
 *      verbatim citations (isVerbatimLine() in i18n_extract_content.mjs);
 *   3. a date inside a quoted span of the surrounding text (“…”, "…", «…», „…“)
 *      — the verbatim-quote KEEP in src/data/overlays/NOTES.md.
 *
 * Needs a built site being served (it is not part of `npm run build`):
 *   npm run build && npx vite preview        # serves http://localhost:4173
 *   npm run audit:daterender                  # every PROSE_TRANSLATED locale
 *   npm run audit:daterender -- --lang it --base http://localhost:4319
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

const i18nSrc = readFileSync(join(ROOT, 'src/lib/i18n.ts'), 'utf8')
const pm = i18nSrc.match(/export const PROSE_TRANSLATED[^=]*=\s*\[([^\]]*)\]/)
if (!pm) {
  console.error('✗ could not parse PROSE_TRANSLATED from src/lib/i18n.ts')
  process.exit(2)
}
const PROSE = [...pm[1].matchAll(/'([^']+)'/g)].map((x) => x[1])
const LANGS = args.flatMap((a, i) => (a === '--lang' ? [args[i + 1]] : []))
if (!LANGS.length) LANGS.push(...PROSE)
const bad = LANGS.filter((l) => !PROSE.includes(l))
if (bad.length) {
  console.error(`✗ ${bad.join(', ')} not in PROSE_TRANSLATED (${PROSE.join(', ')}) — an untranslated locale is all English dates.`)
  process.exit(2)
}

try {
  const r = await fetch(`${BASE}/`)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
} catch (e) {
  console.error(`✗ ${BASE} is unreachable (${e.message}). Run \`npm run build && npx vite preview\` first.`)
  process.exit(2)
}

// Copied from check_date_forms.mjs — keep the two in step.
const M =
  '(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)'
const DATE_SRC = `\\b${M}\\.? \\d{1,2}(?:st|nd|rd|th)?\\b|\\b\\d{1,2} ${M}\\b\\.?|\\b${M} \\d{4}\\b`

const slugs = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8')).schools.map((s) => s.slug)
const COMPARE_TOPICS = ['financial-aid-tuition', 'admissions', 'after-school', 'summer-programs', 'college-support']
const BANDS = ['', 'tkk5', 'es', 'ms', 'hs', 'intl', 'lower', 'middle', 'upper']

const browser = await chromium.launch({ channel: 'chrome', headless: false })
const page = await browser.newPage()

// Text nodes and read attributes holding an English date outside the three
// exclusions, each with the classes of its nearest four ancestors — the class
// chain is how a finding maps to JSX.
const harvest = () => page.evaluate((src) => {
  const DATE = new RegExp(src, 'g')
  const QUOTES = /"[^"]*"|“[^”]*”|«[^»]*»|„[^“”]*[“”]/g
  const chainOf = (el) => {
    const chain = []
    while (el && chain.length < 4) {
      if (typeof el.className === 'string' && el.className) chain.push(el.className.split(' ')[0])
      el = el.parentElement
    }
    return chain.join(' < ')
  }
  const excluded = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const c = typeof e.className === 'string' ? e.className : ''
      if (c.split(/\s+/).some((k) => k.startsWith('news-') || k === 'prose-table')) return true
    }
    return false
  }
  // A quote can span several text nodes (<strong> inside it), so test the token
  // against the quoted spans of the nearest few ancestors' full text.
  const quoted = (el, tok) => {
    for (let e = el, i = 0; e && i < 4; e = e.parentElement, i++) {
      if ((e.textContent.match(QUOTES) || []).some((q) => q.includes(tok))) return true
    }
    return false
  }
  const out = []
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  for (let n; (n = w.nextNode());) {
    const toks = n.nodeValue.match(DATE)
    if (!toks || excluded(n.parentElement)) continue
    const left = toks.filter((t) => !quoted(n.parentElement, t))
    if (left.length) out.push({ cls: chainOf(n.parentElement), text: n.nodeValue.trim().slice(0, 100) })
  }
  for (const el of document.body.querySelectorAll('[title],[aria-label]')) {
    if (excluded(el)) continue
    for (const a of ['title', 'aria-label']) {
      const v = el.getAttribute(a)
      if (v && new RegExp(src).test(v)) out.push({ cls: `@${a} ${chainOf(el)}`, text: v.slice(0, 100) })
    }
  }
  return out
}, DATE_SRC)

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
  if (!uniq.length) { console.log(`✓ ${lang}: no English-form date on any school, Compare or checklist page`); continue }
  const by = {}
  for (const r of uniq) (by[r.cls.split(' < ')[0]] ??= []).push(r)
  console.log(`✗ ${lang}: ${uniq.length} English date(s) across ${Object.keys(by).length} render site(s)`)
  for (const [, rs] of Object.entries(by).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(rs.length).padStart(4)}  ${rs[0].cls}`)
    console.log(`        ${rs[0].route}  ${JSON.stringify(rs[0].text)}`)
  }
}
await browser.close()
if (total) {
  console.log('\nA skipped field is rendering English. Promote its path in PATH_OVERRIDES (scripts/i18n_fields.mjs), splice with i18n_splice_work.mjs, translate, rebuild — then check:dates guards it.')
  process.exit(1)
}
