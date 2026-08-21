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
 * key that exists in EVERY src/locales/*.json catalog named by TRANSLATED.
 *
 * All ten, not just English — until this read them all, a key added to `en` and
 * forgotten in the other nine passed every check in the repo while rendering
 * English to every non-English reader. No other script under scripts/ reads
 * src/locales/** except i18n_fields.mjs, so nothing else could have caught it.
 *
 * The two states are reported and exited on separately, because they are not the
 * same failure:
 *
 *   - NO KEY AT ALL (not even `en`) — the promise is broken; the raw value
 *     reaches the page in every language. Exit 1.
 *   - present in `en`, missing elsewhere — PENDING TRANSLATION. Named in full,
 *     but exit 0: this is the normal state between the two phases of this
 *     repo's English-first workflow.
 *
 * Usage:
 *   node scripts/check_chrome_keys.mjs      (npm run check:chrome)
 *
 * Exit codes: 0 = every promise kept in English, 1 = an unfulfilled claim,
 * 2 = error.
 */
import { readFileSync } from 'node:fs'
import { SKIP_KEYS, PATH_OVERRIDES } from './i18n_fields.mjs'

/* The topic/accessor/export layout is defined ONCE in i18n_topics.mjs. This
   file used to carry a five-topic copy against the extractor's nine, so it was
   silently auditing a subset of the app — the same drift that left check:live
   at 4,646 phantom findings. Never re-declare these locally. */
import {
  SLUGS, TOPICS, ACCESSORS, EXPORTS, EXTRA_LAYERS,
} from './i18n_topics.mjs'

/**
 * The value -> key slug used by BOTH copies of `dayLabel()`
 * (src/components/SummerPrograms.tsx and src/components/AfterSchool.tsx).
 *
 * Must stay identical to those, or this check computes a different key from the
 * one the component looks up and reports a green promise the page does not keep.
 * It exists because the day vocabulary is closed but no longer weekdays-only:
 * `'Half day'` interpolated raw yields `afterSchool.day_Half day`, a key nobody
 * would ever write, so `defaultValue` returned the English silently.
 */
const daySlug = (v) => v.replace(/[^A-Za-z0-9]/g, '')

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
  { leaf: 'day', prefix: 'afterSchool.day_', exempt: ['—'], map: daySlug },
  // Summer camps carry `days: ['Mon','Tue',…]` — the same day vocabulary as
  // `day`, rendered through the same afterSchool.day_* chrome key by dayLabel().
  { leaf: 'days', prefix: 'afterSchool.day_', exempt: ['—'], map: daySlug },
  { leaf: 'dayFilters', prefix: 'afterSchool.day_', exempt: ['All', '—'], map: daySlug },
  // Grade filters are grade codes (TK, K, 1…8) rendered as-is; only the 'All'
  // sentinel is worded, and it has its own key.
  { leaf: 'gradeFilters', prefix: null, exempt: null },
  { leaf: 'basis', prefix: 'afterSchool.basis', map: (v) => v[0].toUpperCase() + v.slice(1) },
]

/**
 * Every locale this app ships, parsed out of TRANSLATED in src/lib/i18n.ts.
 *
 * Re-parsed rather than hardcoded, the same drift-resistance rule check_seo.mjs
 * applies to its LOCALES mirror: a hand-kept copy of a list stays honest only
 * while someone remembers it exists.
 */
function translatedLocales() {
  const src = readFileSync(new URL('../src/lib/i18n.ts', import.meta.url), 'utf8')
  const m = src.match(/export const TRANSLATED[^=]*=\s*\[([^\]]*)\]/)
  if (!m) {
    console.error('✗ could not parse TRANSLATED from src/lib/i18n.ts')
    process.exit(2)
  }
  return [...m[1].matchAll(/'([a-z-]+)'/g)].map((x) => x[1])
}

/**
 * All ten catalogs, not just English.
 *
 * WHY: until this read them all, `hasKey()` consulted src/locales/en.json alone,
 * and no other script under scripts/ reads src/locales/** except i18n_fields.mjs.
 * So a chrome key added to `en` and forgotten in the other nine passed every
 * check in the repo while rendering English to every non-English reader — the
 * same silent-fallback class this whole script exists to close, one layer up.
 */
const LOCALES = translatedLocales()
const catalogs = new Map(
  LOCALES.map((l) => [
    l,
    JSON.parse(readFileSync(new URL(`../src/locales/${l}.json`, import.meta.url), 'utf8')),
  ]),
)

/** Does `a.b.c` exist in the named catalogue? */
function hasKeyIn(lang, path) {
  const root = catalogs.get(lang)
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), root) !== undefined
}

/** Does `a.b.c` exist in English — the promise itself, before translation? */
const hasKey = (path) => hasKeyIn('en', path)

/** Which shipped locales are missing `a.b.c`? English excluded — that is `hasKey`. */
const missingLocales = (path) =>
  LOCALES.filter((l) => l !== 'en' && !hasKeyIn(l, path))

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

/** One school's entry for a topic, or undefined if that school has none. */
async function entryFor(topic, slug) {
  const accessor = ACCESSORS[topic]
  if (accessor) {
    const [mod, fn] = accessor
    try {
      const got = (await import(mod))[fn]
      // A plain export (not an accessor function) is shared across schools, so
      // attribute it to the first slug only and let the rest report empty.
      if (typeof got !== 'function') return slug === SLUGS[0] ? got : undefined
      return got(slug)
    } catch (err) {
      // Never swallow this: a dropped accessor removes a whole topic from the
      // audit, which reads as "nothing to report" rather than "not looked at".
      console.error(`  \u2717 ${topic}/${slug}: ${err.message}`)
      process.exitCode = 2
      return undefined
    }
  }
  try {
    const m = await import(`../src/data/${TOPICS[topic]}/${slug}.ts`)
    return m[EXPORTS[slug]]
  } catch (err) {
    if (ACCESSORS[topic]) {
      console.error(`  \u2717 ${topic}: ${err.message}`)
      process.exitCode = 2
    }
    return undefined   // a school with no module for this topic is normal
  }
}

/** The extra layers for one school, as [prefix, entry] pairs. Accessors take a slug. */
async function extraFor(topic, slug) {
  const out = []
  for (const [prefix, mod, fn] of EXTRA_LAYERS[topic] ?? []) {
    try {
      const m = await import(mod)
      const entry = m[fn]?.(slug)
      if (entry) out.push([prefix, entry])
    } catch (e) {
      console.error(`  ! ${topic}/${prefix} failed to load: ${e.message}`)
      process.exitCode = 2
    }
  }
  return out
}

async function main() {
  // leaf -> set of real values seen across every school and topic
  const seen = new Map()
  for (const topic of Object.keys(TOPICS)) {
    for (const slug of SLUGS) {
      const entry = await entryFor(topic, slug)
      const layers = [
        ...(entry ? [['', entry]] : []),
        ...(await extraFor(topic, slug)),
      ]
      for (const [prefix, layer] of layers)
      walk(layer, prefix, (path, value) => {
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
  // Keys that exist in `en` but not in every other shipped catalog. Counted
  // separately from `bad`: a broken promise and a pending translation are
  // different states and must not be reported as one. See PENDING below.
  let pending = 0
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
    const checkable = values.filter((v) => !(exempt ?? []).includes(v))
    const keyFor = (v) => prefix + (map ? map(v) : v)
    const missing = checkable.filter((v) => !hasKey(keyFor(v)))
    // Only ask about the other nine where English itself is present: a value with
    // no `en` key is the broken promise below, not a translation gap.
    const untranslated = checkable
      .filter((v) => hasKey(keyFor(v)))
      .map((v) => [v, missingLocales(keyFor(v))])
      .filter(([, langs]) => langs.length)
    const flag = missing.length ? '✗ ' : untranslated.length ? '· ' : '✓ '
    console.log(`${flag}${leaf} → ${prefix}*`)
    console.log(`     ${values.map((v) => JSON.stringify(v)).join(' · ')}`)
    if (missing.length) {
      bad++
      console.log(`     ^ NO LOCALE KEY for ${missing.map((v) => JSON.stringify(v)).join(', ')}`)
      console.log('       This field is skipped for translation on the promise that the')
      console.log('       UI renders it from a key. That key does not exist, so the raw')
      console.log('       English value reaches the page.')
      console.log('       A new member of a chrome vocabulary needs BOTH:')
      console.log(`         1. a key in all ${LOCALES.length} src/locales/*.json catalogs`)
      console.log(`            (${missing.map((v) => JSON.stringify(keyFor(v))).join(', ')})`)
      console.log('         2. a CLAIMS/map review in scripts/check_chrome_keys.mjs, so the')
      console.log('            key this check computes is the key the component looks up.')
    }
    for (const [v, langs] of untranslated) {
      pending++
      console.log(`     · PENDING TRANSLATION for ${JSON.stringify(v)} → ${keyFor(v)}`)
      console.log(`       present in en, missing from: ${langs.join(', ')}`)
      console.log('       Those readers see the English. Not a broken promise — the key')
      console.log('       exists; it just has not been translated yet.')
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
  } else if (pending) {
    /* Exit 0, deliberately. A key present in `en` and awaiting translation is the
       normal mid-flight state of this repo's two-phase English-first workflow, so
       gating the build on it would make Phase 1 unmergeable by construction. The
       finding is still printed, loudly and by name. A MISSING key — the promise
       this script exists to verify — is a different thing and still exits 1. */
    console.log(
      `· ${pending} chrome key(s) exist in en but await translation — see PENDING above.\n` +
        '  Every promise is kept in English; those locales render English until translated.\n',
    )
  } else {
    console.log(
      `✓ every chrome-claiming skip resolves to a real locale key, in all ${LOCALES.length} catalogs\n`,
    )
  }
}

main().catch((e) => { console.error(e); process.exit(2) })
