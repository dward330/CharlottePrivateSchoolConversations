#!/usr/bin/env node
/**
 * check:dates — no translated string may leave an English-form date behind.
 *
 * The convention (src/data/overlays/NOTES.md, "Dates and session labels"): the
 * month name and the counter word translate; the numbers do not. `June 1-5`
 * becomes es `1-5 de junio`, ar `1-5 يونيو`. Before this gate, 776 translations
 * across all nine prose locales kept the English date inside otherwise
 * translated prose (ar `الأسبوع 1 — June 1-5`, te `March 1 లోపు`), and nothing
 * looked: check:sepdrift sees only separator-bearing figures, and i18n:leaks
 * only whole strings left identical to English.
 *
 * Rule 1, English date. Flags any `t` holding an English month name next to a
 * day or year (month-day, day-month, month-year; full or abbreviated). The ONE
 * exception is a verbatim quote: every flagged token must sit inside a quoted
 * span of the English `text` ("…" or “…”) AND `t` must carry that same span
 * verbatim. A quote the locale translated gets its dates translated too. The
 * exemption is decided from the English text, never from a hash allowlist, so
 * editing the English cannot leave a stale exemption behind.
 *
 * Rule 2, first of month. Italian writes `1º` (ordinal indicator, U+00BA), not
 * `1°` (degree sign, U+00B0); Kreyòl writes `1ye <month>`, not `1 <month>`.
 * Both are the majority form each locale already used.
 *
 * Reads every work file (src/data/overlays/work) for each locale in
 * PROSE_TRANSLATED, parsed from src/lib/i18n.ts rather than hardcoded.
 *
 * Usage:
 *   node scripts/check_date_forms.mjs              # exit 1 on any finding
 *   node scripts/check_date_forms.mjs --dir D      # read work files from D
 *   node scripts/check_date_forms.mjs --json OUT   # also write every finding to OUT
 */
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const val = (k, d) => {
  const i = args.indexOf(k)
  return i >= 0 ? args[i + 1] : d
}
const dir = val('--dir', 'src/data/overlays/work')
const jsonOut = val('--json')

const i18nSrc = fs.readFileSync('src/lib/i18n.ts', 'utf8')
const m = i18nSrc.match(/export const PROSE_TRANSLATED[^=]*=\s*\[([^\]]*)\]/)
if (!m) {
  console.error('check:dates — could not parse PROSE_TRANSLATED from src/lib/i18n.ts')
  process.exit(2)
}
const LOCALES = [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1])

const M =
  '(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)'
const DATE = new RegExp(`\\b${M}\\.? \\d{1,2}(?:st|nd|rd|th)?\\b|\\b\\d{1,2} ${M}\\b\\.?|\\b${M} \\d{4}\\b`, 'g')
// US style puts a trailing comma or period inside the quote mark (“coming August 2026,”);
// that punctuation is not part of the quote a translation must carry.
const quoteSpans = (s) => [...s.matchAll(/["“]([^"”]+)["”]/g)].map((x) => x[1].replace(/[,.;:]+$/, ''))

const IT_FIRST = /1°\s?(?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre|genn?\.?|febb?r?\.?|mar\.?|apr\.?|magg?\.?|giu\.?|lug\.?|ago\.?|sett?\.?|ott\.?|nov\.?|dic\.?)(?![\p{L}])/giu
const HT_FIRST = /(?<![\p{L}\p{N}])1 (?:janvye|fevriye|mas|avril|me|jen|jiyè|out|septanm|oktòb|novanm|desanm)(?![\p{L}])/giu

/** English-date tokens in t that the verbatim-quote rule does NOT cover. */
function englishDates(text, t) {
  const toks = t.match(DATE)
  if (!toks) return []
  const kept = quoteSpans(text).filter((q) => t.includes(q))
  return toks.filter((tok) => !kept.some((q) => q.includes(tok)))
}

function firstOfMonth(lang, t) {
  const re = lang === 'it' ? IT_FIRST : lang === 'ht' ? HT_FIRST : null
  return re ? t.match(re) || [] : []
}

const findings = []
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
for (const f of files) {
  const mm = f.match(/^(.+)\.([a-z]{2})\.json$/)
  if (!mm || !LOCALES.includes(mm[2])) continue
  const [, topic, lang] = mm
  const w = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
  const units = [...(w.strings || []), ...(w.sections || [])]
  for (const u of units) {
    if (typeof u.t !== 'string' || !u.t) continue
    const r1 = englishDates(u.text || '', u.t)
    if (r1.length) findings.push({ rule: 1, topic, lang, of: u.of, at: u.at?.[0], text: u.text, t: u.t, tokens: r1 })
    const r2 = firstOfMonth(lang, u.t)
    if (r2.length) findings.push({ rule: 2, topic, lang, of: u.of, at: u.at?.[0], text: u.text, t: u.t, tokens: r2 })
  }
}

if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(findings, null, 2) + '\n')

if (!findings.length) {
  console.log(`check:dates — 0 English-form dates, 0 first-of-month drifts across ${LOCALES.length} locales ✓`)
  process.exit(0)
}

for (const rule of [1, 2]) {
  const rows = findings.filter((x) => x.rule === rule)
  if (!rows.length) continue
  const label = rule === 1 ? 'Rule 1 — English-form date in a translation' : 'Rule 2 — first-of-month form (it 1º, ht 1ye)'
  console.log(`\n${label}: ${rows.length} row(s)`)
  const count = (key) => {
    const c = {}
    for (const r of rows) c[r[key]] = (c[r[key]] || 0) + 1
    return Object.entries(c).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(', ')
  }
  console.log(`  by locale: ${count('lang')}`)
  console.log(`  by topic:  ${count('topic')}`)
  for (const r of rows.slice(0, 5)) {
    console.log(`  - [${r.lang}] ${r.topic} ${r.of} ${r.at}`)
    console.log(`      en: ${r.text}`)
    console.log(`      t:  ${r.t}`)
    console.log(`      tokens: ${r.tokens.join(' | ')}`)
  }
}
console.log('\nFix: translate the date to the locale form (NOTES.md "Dates and session labels"); never allowlist.')
process.exit(1)
