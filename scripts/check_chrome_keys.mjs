#!/usr/bin/env node
/**
 * Verifies that every field SKIPPED "because the chrome renders it" actually has
 * that chrome.
 *
 * WHY THIS EXISTS. `day` was classified in i18n_fields.mjs as
 *
 *     ['day', 'weekday code (Mon) — rendered from a chrome key']
 *
 * and the classification was correct: Mon…Fri is a closed vocabulary, identical
 * for every school, so it does NOT belong in the prose overlay. But the chrome
 * key it referred to was never built, so the raw English code rendered inside
 * otherwise-Spanish cards for the whole of Stage 4.
 *
 * Neither existing check could catch that:
 *
 *   - the residual detector only reports fields nobody classified;
 *   - `i18n_audit_skips.mjs` asks whether a skipped VALUE looks like prose, and
 *     "Mon" does not look like prose. It is right that "Mon" is a code. It has
 *     no way to ask whether anything ever translates that code.
 *
 * So a skip that claims chrome ownership makes a PROMISE about code elsewhere,
 * and nothing verified the promise. This script does: for every such field it
 * collects the real values from src/data/** and asserts each one resolves to a
 * key that exists in src/locales/en.json.
 *
 * Usage:
 *   node scripts/check_chrome_keys.mjs
 *
 * Exit codes: 0 = every promise kept, 1 = an unfulfilled claim, 2 = error.
 */
import { readFileSync } from 'node:fs'
import { SKIP_KEYS, PATH_OVERRIDES } from './i18n_fields.mjs'

const SLUGS = [
  'providence-day', 'charlotte-latin', 'charlotte-christian',
  'charlotte-country-day', 'cannon', 'covenant-day', 'davidson-day',
  'carmel-christian',
]

const TOPICS = {
  sports: 'sportsPrograms',
  'the-arts': 'artsPrograms',
  'student-clubs': 'clubsPrograms',
  'college-support': 'collegeSupportPrograms',
  'after-school': 'afterSchoolPrograms',
}

const EXPORTS = {
  'providence-day': 'providenceDay',
  'charlotte-latin': 'charlotteLatin',
  'charlotte-christian': 'charlotteChristian',
  'charlotte-country-day': 'charlotteCountryDay',
  cannon: 'cannon',
  'covenant-day': 'covenantDay',
  'davidson-day': 'davidsonDay',
  'carmel-christian': 'carmelChristian',
}

/**
 * Where a chrome-claiming field's values are expected to resolve.
 *
 * `prefix` is the locale namespace each value maps into; a value V must exist at
 * `<prefix><V>`. `exempt` lists values that legitimately have no key — sentinels
 * the component compares against rather than displays, and placeholders.
 *
 * Adding a row here is the point: it forces the claim in i18n_fields.mjs to name
 * WHERE the chrome lives, instead of asserting that it exists somewhere.
 */
const CLAIMS = [
  { leaf: 'day', prefix: 'afterSchool.day_', exempt: ['—'] },
  // Summer camps carry `days: ['Mon','Tue',…]` — the same weekday codes as `day`,
  // rendered through the same afterSchool.day_* chrome key by dayLabel().
  { leaf: 'days', prefix: 'afterSchool.day_', exempt: ['—'] },
  { leaf: 'dayFilters', prefix: 'afterSchool.day_', exempt: ['All', '—'] },
  // Grade filters are grade codes (TK, K, 1…8) rendered as-is; only the 'All'
  // sentinel is worded, and it has its own key.
  { leaf: 'gradeFilters', prefix: null, exempt: null },
  { leaf: 'basis', prefix: 'afterSchool.basis', map: (v) => v[0].toUpperCase() + v.slice(1) },
]

const locale = JSON.parse(readFileSync(new URL('../src/locales/en.json', import.meta.url), 'utf8'))

/** Does `a.b.c` exist in the catalogue? */
function hasKey(path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), locale) !== undefined
}

const generic = (p) => p.replace(/\[\d+\]/g, '[]')

function pathOverridden(path) {
  for (const [pattern, isProse] of PATH_OVERRIDES) {
    if (pattern.startsWith('*.')) {
      if (path.endsWith(pattern.slice(1))) return isProse
    } else if (path === pattern || path.endsWith('.' + pattern)) return isProse
  }
  return undefined
}

function walk(node, path, visit) {
  if (node == null) return
  if (typeof node === 'string') { visit(path, node); return }
  if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${path}[${i}]`, visit)); return }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, visit)
  }
}

async function main() {
  // leaf -> set of real values seen across every school and topic
  const seen = new Map()
  for (const [topic, dir] of Object.entries(TOPICS)) {
    for (const slug of SLUGS) {
      let entry
      try {
        entry = (await import(`../src/data/${dir}/${slug}.ts`))[EXPORTS[slug]]
      } catch { continue }
      if (!entry) continue
      walk(entry, '', (path, value) => {
        const g = generic(path)
        const leaf = (g.split('.').pop() || '').replace(/\[\]$/, '')
        if (pathOverridden(g) !== undefined) return
        if (!SKIP_KEYS.has(leaf)) return
        if (!seen.has(leaf)) seen.set(leaf, new Set())
        seen.get(leaf).add(value)
      })
    }
  }

  console.log('\nCHROME-KEY PROMISES — skipped fields that claim the UI translates them\n')

  // Any skip whose description mentions chrome must appear in CLAIMS, or the
  // promise is undocumented and therefore unverifiable.
  const claimed = new Set(CLAIMS.map((c) => c.leaf))
  const undocumented = [...SKIP_KEYS.entries()]
    .filter(([leaf, desc]) => /chrome/i.test(desc) && !claimed.has(leaf))
    .map(([leaf]) => leaf)

  let bad = 0
  for (const { leaf, prefix, exempt, map } of CLAIMS) {
    const values = [...(seen.get(leaf) ?? [])]
    if (!values.length) {
      console.log(`  ${leaf} — not present in any school's data (nothing to check)\n`)
      continue
    }
    if (!prefix) {
      console.log(`  ${leaf} — rendered verbatim by design; no key expected`)
      console.log(`     ${values.slice(0, 8).map((v) => JSON.stringify(v)).join(' · ')}\n`)
      continue
    }
    const missing = values.filter(
      (v) => !(exempt ?? []).includes(v) && !hasKey(prefix + (map ? map(v) : v)),
    )
    const flag = missing.length ? '✗ ' : '✓ '
    console.log(`${flag}${leaf} → ${prefix}*`)
    console.log(`     ${values.map((v) => JSON.stringify(v)).join(' · ')}`)
    if (missing.length) {
      bad++
      console.log(`     ^ NO LOCALE KEY for ${missing.map((v) => JSON.stringify(v)).join(', ')}`)
      console.log('       This field is skipped for translation on the promise that the')
      console.log('       UI renders it from a key. That key does not exist, so the raw')
      console.log('       English value reaches the page.')
    }
    console.log()
  }

  if (undocumented.length) {
    console.log(`⚠ ${undocumented.length} skip(s) mention chrome but are not in CLAIMS:`)
    console.log(`  ${undocumented.join(', ')}`)
    console.log('  Add a CLAIMS row naming where that chrome lives, so the promise is checkable.\n')
    bad++
  }

  if (bad) {
    process.exitCode = 1
  } else {
    console.log('✓ every chrome-claiming skip resolves to a real locale key\n')
  }
}

main().catch((e) => { console.error(e); process.exit(2) })
