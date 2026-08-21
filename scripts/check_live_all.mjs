#!/usr/bin/env node
/**
 * Run check_live_resolution.mjs across EVERY locale in PROSE_TRANSLATED.
 *
 * Why this exists: exactly the reason check_runtime_all.mjs exists. The
 * underlying script defaults to `--lang fr`, so wiring the bare command into
 * the build would gate on one locale out of nine and let the other eight ship
 * unverified — a partial-coverage gate, which is the same class of bug that
 * left check:live itself sourcing six of nine topics.
 *
 * The live English set is identical for every locale, so a difference between
 * locales here is always a difference in what was SHIPPED, never in what was
 * read. Before the topic-coverage fix all nine reported the same 4,646; that
 * uniformity is what identified the count as structural rather than a real
 * batch of stale translations.
 *
 * Single-locale runs still work:
 *   node scripts/check_live_resolution.mjs --lang bn
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

const failed = []
for (const lang of LANGS) {
  process.stdout.write(`── ${lang} `)
  try {
    const out = execFileSync(
      'node',
      [new URL('check_live_resolution.mjs', import.meta.url).pathname, '--lang', lang],
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
  console.error(
    `\n✗ live resolution failed for: ${failed.join(', ')}\n` +
      `Each failing entry renders ENGLISH at runtime while coverage reports 100%.`,
  )
  process.exit(1)
}
console.log(`\n✓ all ${LANGS.length} prose locales resolve against live English`)
