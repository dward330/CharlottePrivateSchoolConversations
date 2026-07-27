#!/usr/bin/env node
/**
 * Compiles a translated work file into the overlay the app actually ships.
 *
 * The work file (`i18n-work/<topic>.<lang>.json`, written by i18n_extract.mjs)
 * carries the English `text` beside each translation so a translator — and a
 * reviewer — can see what they are working from. The runtime does not need it:
 * `localized()` re-derives the hash from the live English in src/data/**, which
 * is the whole point of the staleness mechanism. Shipping `text` would send the
 * entire English corpus to the browser a second time.
 *
 * So this strips it, and drops any entry left untranslated (an empty `t` renders
 * English anyway — carrying it would be bytes for nothing).
 *
 * Usage:
 *   node scripts/i18n_build_overlay.mjs --topic student-clubs --lang es
 *   node scripts/i18n_build_overlay.mjs --topic student-clubs --lang es --in DIR
 *
 * Exit codes: 0 = written, 2 = missing/unreadable input.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }

const topic = val('--topic')
const lang = val('--lang', 'es')
const inDir = val('--in', 'src/data/overlays/work')
const outDir = val('--out', 'src/data/overlays')

if (!topic) {
  console.error('usage: node scripts/i18n_build_overlay.mjs --topic <slug> --lang <code>')
  process.exit(2)
}

const src = `${inDir}/${topic}.${lang}.json`
let work
try {
  work = JSON.parse(readFileSync(src, 'utf8'))
} catch (e) {
  console.error(`cannot read ${src}: ${e.message}`)
  process.exit(2)
}

const kept = []
let dropped = 0
for (const e of work.strings ?? []) {
  if (!e.t) { dropped++; continue }
  kept.push({ t: e.t, of: e.of, at: e.at })
}

mkdirSync(outDir, { recursive: true })
const dest = `${outDir}/${topic}.${lang}.json`
writeFileSync(
  dest,
  JSON.stringify({ topic, lang, strings: kept }, null, 2) + '\n',
  'utf8',
)

const before = readFileSync(src, 'utf8').length
const after = readFileSync(dest, 'utf8').length
console.log(
  `wrote ${dest}\n  ${kept.length} entries`
  + (dropped ? `, ${dropped} untranslated dropped` : '')
  + `\n  ${before.toLocaleString()} → ${after.toLocaleString()} bytes`
  + ` (${Math.round((1 - after / before) * 100)}% smaller shipped)`,
)
