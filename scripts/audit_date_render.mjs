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
 * SCOPED BY DEFAULT (plan `auditscope`). A run visits only what the branch
 * changed since `main` (scripts/audit_scope.mjs): each changed card is loaded
 * through its deep link (`/school/<slug>/#<area>/<card>`) and only that card,
 * or its whole area when the change is not card-level, is opened and scanned.
 * A Compare topic or admissions checklist is visited only when the changed data
 * renders there. Any render-code change (components, src/lib, CSS, locale
 * catalogs…) or unrecognized src/ path switches to the FULL sweep by itself and
 * prints the path that caused it. `--all` forces the full sweep: use it after
 * adding a render site or a locale. `npm run audit:scope` prints the scope
 * without opening a browser.
 *
 * Needs a built site being served (it is not part of `npm run build`):
 *   npm run build && npx vite preview        # serves http://localhost:4173
 *   npm run audit:daterender                  # scoped, every PROSE_TRANSLATED locale
 *   npm run audit:daterender -- --all         # full sweep
 *   npm run audit:daterender -- --since <ref> # scope against another git ref
 *   npm run audit:daterender -- --lang it --base http://localhost:4319
 *   npm run audit:daterender -- --headed      # show the browser window
 * It prints one progress line per page as it goes. Do NOT pipe it into `tail`:
 * that buffers the whole run, and a slow run then looks hung.
 *
 * Real Chrome via Playwright (channel 'chrome'), headless by default so no window
 * opens over the user's own browser (user, 2026-11-23). It is the installed Chrome,
 * and this audit reads text after the page's scripts run, which a window does not
 * change. `--headed` shows the window. domcontentloaded plus a settle wait, never
 * networkidle — school pages never go idle. Every <details>
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

// Copied from check_date_forms.mjs — keep the two in step.
const M =
  '(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)'
const DATE_SRC = `\\b${M}\\.? \\d{1,2}(?:st|nd|rd|th)?\\b|\\b\\d{1,2} ${M}\\b\\.?|\\b${M} \\d{4}\\b`

const slugs = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8')).schools.map((s) => s.slug)

const browser = await chromium.launch({ channel: 'chrome', headless: !args.includes('--headed') })
const page = await browser.newPage()
// Never log page-views from an audit.
await page.route(/cloudflareinsights\.com/, (r) => r.abort())

// Text nodes and read attributes holding an English date outside the three
// exclusions, each with the classes of its nearest four ancestors — the class
// chain is how a finding maps to JSX. `rootSel` limits the scan: 'body' in a
// full sweep, '[data-audit-root]' (the scoped cards and areas) otherwise.
const harvest = (rootSel = 'body') => page.evaluate(([src, rootSel]) => {
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
  for (const root of document.querySelectorAll(rootSel)) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    for (let n; (n = w.nextNode());) {
      const toks = n.nodeValue.match(DATE)
      if (!toks || excluded(n.parentElement)) continue
      const left = toks.filter((t) => !quoted(n.parentElement, t))
      if (left.length) out.push({ cls: chainOf(n.parentElement), text: n.nodeValue.trim().slice(0, 100) })
    }
    for (const el of [root, ...root.querySelectorAll('[title],[aria-label]')]) {
      if (excluded(el)) continue
      for (const a of ['title', 'aria-label']) {
        const v = el.getAttribute(a)
        if (v && new RegExp(src).test(v)) out.push({ cls: `@${a} ${chainOf(el)}`, text: v.slice(0, 100) })
      }
    }
  }
  return out
}, [DATE_SRC, rootSel])

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
  if (!uniq.length) { console.log(`✓ ${lang}: no English-form date on any ${scope.full ? '' : 'scoped '}school, Compare or checklist page`); continue }
  const by = {}
  for (const r of uniq) (by[r.cls.split(' < ')[0]] ??= []).push(r)
  console.log(`✗ ${lang}: ${uniq.length} English date(s) across ${Object.keys(by).length} render site(s)`)
  for (const [, rs] of Object.entries(by).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(rs.length).padStart(4)}  ${rs[0].cls}`)
    console.log(`        ${rs[0].route}  ${JSON.stringify(rs[0].text)}`)
  }
}
await browser.close()
console.log(`\n${scope.full ? 'full sweep' : 'scoped run'}: ${prog.elapsed()}`)
if (total) {
  console.log('\nA skipped field is rendering English. Promote its path in PATH_OVERRIDES (scripts/i18n_fields.mjs), splice with i18n_splice_work.mjs, translate, rebuild — then check:dates guards it.')
  process.exit(1)
}
