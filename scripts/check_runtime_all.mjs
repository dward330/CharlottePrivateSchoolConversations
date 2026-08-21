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
 *
 * Flags are forwarded verbatim to the per-locale script, so the identical
 * REPORT runs across every locale in one go:
 *   npm run check:runtime -- --report-identical
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

/* Everything after the locale list is forwarded to the per-locale script. When a
   report flag is present the child's stdout is passed straight through, because
   the one-line-per-locale summary below would otherwise swallow the report it
   was asked to print. */
const EXTRA = process.argv.slice(2)
const VERBOSE = EXTRA.some((a) => a.startsWith('--report-'))

let failed = []
for (const lang of LANGS) {
  process.stdout.write(`── ${lang} `)
  try {
    const out = execFileSync(
      'node',
      [
        new URL('check_runtime_resolution.mjs', import.meta.url).pathname,
        '--lang',
        lang,
        ...EXTRA,
      ],
      { encoding: 'utf8' },
    )
    if (VERBOSE) {
      console.log('')
      console.log(out.trimEnd())
    } else {
      /* The FIRST non-empty line is the counts summary ("<lang>: N shipped
         entries across M overlay file(s), N value(s) checked"). It used to be
         picked positionally from the end, which silently re-pointed at the new
         value-gate line the moment one was added. */
      const line = out.trim().split('\n').filter(Boolean)[0] ?? ''
      console.log(`✓ ${line.trim()}`)
    }
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
