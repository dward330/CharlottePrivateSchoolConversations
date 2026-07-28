#!/usr/bin/env node
/**
 * Compiles a translated `src/content` work file into the overlay the app ships.
 *
 * The `src/data` counterpart (i18n_build_overlay.mjs) keys entries by field
 * path. This one keys by content hash, because ingest regenerates
 * `src/content` and positional keys renumber when a sub-section is inserted —
 * see section 6 of .claude/docs/prose-translation-architecture.md.
 *
 * Like that script it strips the English `text`: the runtime re-derives the
 * hash from the live English, so shipping the source would send the corpus to
 * the browser twice. Untranslated entries are dropped — an absent key already
 * falls back to English.
 *
 * Usage:
 *   node scripts/i18n_build_content_overlay.mjs --topic financial-aid-tuition --lang es
 *
 * Exit codes: 0 = written, 2 = missing/unreadable input.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const args = process.argv.slice(2)
const val = (f, d) => {
  const i = args.indexOf(f)
  return i === -1 ? d : args[i + 1]
}

const topic = val('--topic')
const lang = val('--lang', 'es')
const inDir = val('--in', 'src/data/overlays/work')
const outDir = val('--out', 'src/data/overlays')

if (!topic) {
  console.error('usage: node scripts/i18n_build_content_overlay.mjs --topic <slug> --lang <code>')
  process.exit(2)
}

const src = `${inDir}/${topic}.content.${lang}.json`
let work
try {
  work = JSON.parse(readFileSync(src, 'utf8'))
} catch (e) {
  console.error(`cannot read ${src}: ${e.message}`)
  process.exit(2)
}

/** `{ <content-hash>: <translation> }` — the flattest shape the resolver can use. */
const blocks = {}
let dropped = 0
for (const entry of work.sections ?? []) {
  if (!entry.t) {
    dropped++
    continue
  }
  blocks[entry.of] = entry.t
}

mkdirSync(outDir, { recursive: true })
const out = `${outDir}/${topic}.content.${lang}.json`
writeFileSync(out, JSON.stringify({ topic, lang, blocks }, null, 2) + '\n')

const before = Buffer.byteLength(readFileSync(src))
const after = Buffer.byteLength(readFileSync(out))
console.log(`wrote ${out}`)
console.log(`  ${Object.keys(blocks).length} blocks, ${dropped} untranslated dropped`)
console.log(
  `  ${before.toLocaleString()} → ${after.toLocaleString()} bytes ` +
    `(${Math.round((1 - after / before) * 100)}% smaller shipped)`,
)
