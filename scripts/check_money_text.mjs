#!/usr/bin/env node
/**
 * Runs the REAL src/lib/format.ts — not a mirror of it — over every money figure
 * the app renders, and asserts that rendering never mutates what the school wrote
 * beyond the locale's separators and currency placement.
 *
 * WHY THIS EXISTS. Two defects shipped for months in every locale, English
 * included, past every money check in this repo:
 *
 *   1. The comma AFTER a figure vanished. The regex `\$(\d[\d,]*…)` captured the
 *      comma in "$250, non-refundable" as part of the number, and money() rebuilt
 *      the figure without it: "$250 non-refundable". 360 instances.
 *   2. Cents lost their trailing zero. money() substituted number(n), whose Intl
 *      default drops trailing zeros: "$11.50/hr" → "$11.5/hr", "$3.0M" → "$3M".
 *
 * check:bidi and check:currency MIRROR format.ts's logic; check:money audits call
 * sites. None ran the real function over real data, which is the only test that
 * can see either bug. A third mirror would drift the way the first two did.
 *
 * HOW. format.ts imports only ./i18n.ts (which uses Vite's import.meta.glob and
 * cannot load under Node) and ./figureLocale.ts (plain). We copy format.ts and
 * figureLocale.ts into a temp dir beside a stub i18n.ts and import it under plain
 * Node, whose native type stripping runs the .ts directly — no bundler, no new
 * dependency. isRtl() reads `document`, absent here, so this runs LTR; RTL
 * isolates are check:bidi's job.
 *
 * Two invariants, checked for every string in the corpus:
 *
 *   comma  count of /,(?!\d)/ is unchanged by rendering. A rendered figure never
 *          ends in a comma, and every grouping/decimal comma Intl emits is
 *          followed by a digit — so any drop is punctuation the renderer ate.
 *   cents  every "$N.NN" token's fraction digits appear in the output right
 *          after "." or ",".
 *
 * Corpus: every work-file `text` (rendered as en) and `t` (as its own locale),
 * plus every line of every .ts file under src/data holding "$<digit>" (as en) — the latter
 * catches figure fields the prose extractor skips.
 *
 * Usage:
 *   node scripts/check_money_text.mjs
 *   node scripts/check_money_text.mjs --format /tmp/format.ts   # negative test
 *
 * Exit 0 clean · 1 findings · 2 the real module could not be loaded.
 */
import { readFileSync, readdirSync, writeFileSync, copyFileSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const fi = args.indexOf('--format')
const FORMAT = fi === -1 ? join(ROOT, 'src/lib/format.ts') : args[fi + 1]

// TRANSLATED is parsed from source, never hardcoded — it grows.
const i18nSrc = readFileSync(join(ROOT, 'src/lib/i18n.ts'), 'utf8')
const tm = i18nSrc.match(/export const TRANSLATED[^=]*=\s*\[([^\]]*)\]/)
if (!tm) { console.error('✗ could not parse TRANSLATED from src/lib/i18n.ts'); process.exit(2) }
const LOCALES = [...tm[1].matchAll(/'([^']+)'/g)].map((m) => m[1])

const tmp = mkdtempSync(join(tmpdir(), 'check-money-text-'))
let fmt, stub
try {
  copyFileSync(FORMAT, join(tmp, 'format.ts'))
  copyFileSync(join(ROOT, 'src/lib/figureLocale.ts'), join(tmp, 'figureLocale.ts'))
  writeFileSync(join(tmp, 'i18n.ts'),
    "const i18n: { resolvedLanguage: string; language: string } = { resolvedLanguage: 'en', language: 'en' }\nexport default i18n\n")
  stub = (await import(pathToFileURL(join(tmp, 'i18n.ts')).href)).default
  fmt = await import(pathToFileURL(join(tmp, 'format.ts')).href)
} catch (e) {
  console.error(`✗ could not load the real format.ts under Node: ${e.message.split('\n')[0]}`)
  console.error('  (did format.ts gain an import other than ./i18n.ts and ./figureLocale.ts?)')
  rmSync(tmp, { recursive: true, force: true })
  process.exit(2)
}
rmSync(tmp, { recursive: true, force: true })
if (typeof fmt.localizeMoneyText !== 'function') {
  console.error('✗ format.ts no longer exports localizeMoneyText'); process.exit(2)
}

const render = (lang, s) => { stub.resolvedLanguage = lang; stub.language = lang; return fmt.localizeMoneyText(s) }
const COMMA = /,(?!\d)/g
const CENTS = /\$\d+(?:,\d{3})*\.(\d+)/g

function findings(lang, input) {
  if (!/\$\d/.test(input)) return []
  const out = render(lang, input)
  const f = []
  if ((input.match(COMMA) || []).length !== (out.match(COMMA) || []).length) f.push(['comma', input, out])
  for (const m of input.matchAll(CENTS)) {
    if (!out.includes(`.${m[1]}`) && !out.includes(`,${m[1]}`)) { f.push(['cents', input, out]); break }
  }
  return f
}

// Fixed cases, every locale: shapes proven to break, plus shapes that must not change.
const FIXED = [
  'fees $2,175, as the school', 'a fee of $250, non-refundable', '($850, $1,500, $9,000)',
  '$250,000, then', '$1,018–$3,290, or', '$11.50/hr', '$1.00', '$11,647.50', '$3.0M',
  '$3.25M, and', '$220K, then', '≈$378/mo, or', '$36,500', '$3,683,971.',
]

const byLocale = {}
const add = (lang, kind, input, out) => {
  const b = (byLocale[lang] ??= { comma: 0, cents: 0, examples: [] })
  b[kind]++
  if (b.examples.length < 5) b.examples.push(`${kind}: ${JSON.stringify(input.slice(0, 140))}\n        → ${JSON.stringify(out.slice(0, 140))}`)
}
// Each English `text` appears once per locale's work file; render every distinct
// (locale, string) once so the counts are real rather than ×9.
const seen = new Set()
let checked = 0
const run = (lang, s) => {
  if (!/\$\d/.test(s)) return
  const key = `${lang}\u0000${s}`
  if (seen.has(key)) return
  seen.add(key)
  checked++
  for (const [k, i, o] of findings(lang, s)) add(lang, k, i, o)
}

for (const lang of LOCALES) for (const c of FIXED) run(lang, c)

const WORK = join(ROOT, 'src/data/overlays/work')
for (const f of readdirSync(WORK).filter((n) => n.endsWith('.json'))) {
  const lang = f.split('.').slice(-2)[0]
  if (!LOCALES.includes(lang)) continue
  const w = JSON.parse(readFileSync(join(WORK, f), 'utf8'))
  for (const e of w.strings ?? []) {
    if (typeof e.text === 'string') run('en', e.text)
    if (typeof e.t === 'string' && e.t) run(lang, e.t)
  }
}

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n)
  return statSync(p).isDirectory() ? (n === 'overlays' ? [] : walk(p)) : p.endsWith('.ts') ? [p] : []
})
for (const p of walk(join(ROOT, 'src/data'))) {
  for (const line of readFileSync(p, 'utf8').split('\n')) if (/\$\d/.test(line)) run('en', line)
}

const bad = Object.entries(byLocale)
if (!bad.length) {
  console.log(`✓ ${checked} money-bearing strings rendered through the real format.ts in ${LOCALES.length} locales — no punctuation eaten, no cents dropped`)
  process.exit(0)
}
for (const [lang, b] of bad) {
  console.log(`✗ ${lang}: ${b.comma} comma finding(s), ${b.cents} cents finding(s)`)
  for (const ex of b.examples) console.log(`    ${ex}`)
}
console.log(`\n${bad.reduce((n, [, b]) => n + b.comma + b.cents, 0)} finding(s). Fix src/lib/format.ts — never the data: the source figures are what the school published.`)
process.exit(1)
