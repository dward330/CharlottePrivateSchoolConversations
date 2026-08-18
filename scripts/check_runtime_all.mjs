#!/usr/bin/env node
/**
 * Run check_runtime_resolution.mjs across EVERY locale in PROSE_TRANSLATED.
 *
 * Why this exists: `npm run check:runtime` was pinned to `--lang fr`, so the
 * repo's authoritative resolution guard only ever checked French. A locale
 * whose overlays fail their stamp falls back to English SILENTLY — coverage
 * still reads 100% and nothing errors — which is exactly the failure this
 * check is meant to catch. Checking one locale out of nine let the other eight
 * ship unverified.
 *
 * Single-locale runs still work:
 *   node scripts/check_runtime_resolution.mjs --lang bn
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const src = readFileSync(new URL('../src/lib/i18n.ts', import.meta.url), 'utf8')
const m = src.match(/export const PROSE_TRANSLATED[^=]*=\s*\[([^\]]*)\]/)
if (!m) {
  console.error('✗ could not parse PROSE_TRANSLATED from src/lib/i18n.ts')
  process.exit(2)
}
const LANGS = [...m[1].matchAll(/'([a-z-]+)'/g)].map((x) => x[1])

let failed = []
for (const lang of LANGS) {
  process.stdout.write(`── ${lang} `)
  try {
    const out = execFileSync(
      'node',
      [new URL('check_runtime_resolution.mjs', import.meta.url).pathname, '--lang', lang],
      { encoding: 'utf8' },
    )
    const line = out.trim().split('\n').filter(Boolean).slice(-2)[0] ?? ''
    console.log(`✓ ${line.trim()}`)
  } catch (e) {
    failed.push(lang)
    console.log('✗')
    console.log((e.stdout ?? '') + (e.stderr ?? ''))
  }
}

if (failed.length) {
  console.error(`\n✗ runtime resolution failed for: ${failed.join(', ')}`)
  process.exit(1)
}
console.log(`\n✓ all ${LANGS.length} prose locales resolve`)
