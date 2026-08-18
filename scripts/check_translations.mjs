#!/usr/bin/env node
/**
 * Reports translation drift: overlay entries whose English source has changed
 * since they were translated.
 *
 * See .claude/docs/prose-translation-architecture.md. Every overlay field
 * carries `of`, a hash of the English string it was translated from. When the
 * English is rewritten the hash stops matching, and this script says so.
 *
 * WHY THIS EXISTS: an overlay that keeps serving a translation of a paragraph
 * whose English has since been rewritten is worse than no translation — it
 * presents outdated tuition and admissions facts with full authority, and the
 * reader cannot detect it because they do not read English. At runtime a stale
 * entry falls back to English rather than rendering, so drift degrades to an
 * untranslated paragraph, never a wrong one. This script is how you find out it
 * happened.
 *
 * ADVISORY, NOT CI-BLOCKING — same posture as check_metrics.mjs. This layer
 * drifts by design every time research prose is corrected; a blocking check
 * would be routinely bypassed, at which point it protects nothing. It exits
 * non-zero so a human notices, and the ingest checklist points at it.
 *
 * Usage:
 *   node scripts/check_translations.mjs                # all locales, all topics
 *   node scripts/check_translations.mjs --lang es
 *   node scripts/check_translations.mjs --quiet        # only problems
 *
 * Exit codes: 0 = clean (or nothing translated yet), 1 = drift/coverage
 * findings, 2 = script error.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { PROSE_KEYS, SKIP_KEYS, PATH_OVERRIDES } from './i18n_fields.mjs'

const SLUGS = [
  'providence-day', 'charlotte-latin', 'charlotte-christian',
  'charlotte-country-day', 'cannon', 'covenant-day', 'davidson-day',
  'carmel-christian', 'hickory-grove-christian',
  'gaston-day',
]

/**
 * Topic slug -> the per-school module directory and its export name.
 *
 * Deliberately the SCHOOL modules, not the topic loader (sportsProgram.ts etc).
 * Those loaders now carry `import.meta.glob` for their locale overlays, which is
 * a Vite-only transform that plain Node cannot evaluate. The per-school files
 * are plain TypeScript, and they are the actual source of the prose anyway.
 */
const TOPICS = {
  sports: 'sportsPrograms',
  'the-arts': 'artsPrograms',
  'student-clubs': 'clubsPrograms',
  'college-support': 'collegeSupportPrograms',
  'after-school': 'afterSchoolPrograms',
  // Summer Programs lives in `summer/`, not `summerPrograms/`. NOTE this list is
  // a hand-kept mirror of the one in i18n_extract.mjs: a topic missing here is
  // not reported as untranslated, it is not reported AT ALL — the locale simply
  // shows one fewer row and reads as complete. Summer Programs was invisible
  // here until it was added, at 0% coverage.
  'summer-programs': 'summer',
  'course-offerings': null,   // single module + accessor, see ACCESSORS
  'financial-aid-report': null,
  'metric-values': null,
}

/** Topics whose data lives in one module behind an accessor. Mirrors i18n_extract.mjs. */
const ACCESSORS = {
  'course-offerings': ['../src/data/courseOfferings.ts', 'courseOfferings'],
  'financial-aid-report': ['../src/data/financialAidReports.ts', 'financialAidReport'],
  // Not per-school: one flat array of stat-tile captions keyed by TOPIC. The
  // accessor ignores the slug and returns the whole set once, under the first
  // school, so each caption is extracted exactly once.
  'metric-values': ['../src/data/metricValues.ts', 'VALUE_METRICS'],
}

/** Slug -> the export name each per-school module uses. */
const EXPORTS = {
  'providence-day': 'providenceDay',
  'charlotte-latin': 'charlotteLatin',
  'charlotte-christian': 'charlotteChristian',
  'charlotte-country-day': 'charlotteCountryDay',
  cannon: 'cannon',
  'covenant-day': 'covenantDay',
  'davidson-day': 'davidsonDay',
  'carmel-christian': 'carmelChristian',
  'hickory-grove-christian': 'hickoryGroveChristian',
  'gaston-day': 'gastonDay',
}

/** One school's entry for a topic, or undefined if that school has none. */
async function entryFor(topic, slug) {
  try {
    const accessor = ACCESSORS[topic]
    if (accessor) {
      const [mod, fn] = accessor
      const got = (await import(mod))[fn]
      // A plain export (not an accessor function) is shared across schools, so
      // attribute it to the first slug only and let the rest report empty.
      if (typeof got !== 'function') return slug === SLUGS[0] ? got : undefined
      return got(slug)
    }
    const m = await import(`../src/data/${TOPICS[topic]}/${slug}.ts`)
    return m[EXPORTS[slug]]
  } catch (err) {
    // An ACCESSOR topic that fails to import is a REAL error, not a school that
    // simply has no entry: it drops every school from both the extraction and
    // the coverage denominator, so this reports 0/0 while the page is fine.
    // (Exactly how `import.meta.glob` in courseOfferings.ts hid this topic.)
    if (ACCESSORS[topic]) {
      console.error(`  ✗ ${topic}: ${err.message}`)
      process.exitCode = 2
    }
    return undefined
  }
}
/**
 * Extra per-school layers a topic renders alongside its `*Programs/<slug>.ts`
 * entry. Student Clubs renders FIVE cards: three from clubsPrograms, plus
 * Academic & Competitive Clubs (clubClusters.ts) and Club Catalog & Overview
 * (clubCatalog.ts), which are separate hand-maintained modules.
 *
 * They were invisible to the first extraction pass, which only walked the
 * `*Programs` entries — so two of the five cards shipped English. Paths are
 * prefixed (`clusters.*`, `catalog.*`) so overlay keys stay unambiguous.
 */
const EXTRA_LAYERS = {
  'student-clubs': [
    ['clusters', '../src/data/clubClusters.ts', 'clubClusters'],
    ['catalog', '../src/data/clubCatalog.ts', 'clubCatalog'],
  ],
}

/** The extra layers for one school, as [prefix, entry] pairs. */
async function extraFor(topic, slug) {
  const out = []
  for (const [prefix, mod, fn] of EXTRA_LAYERS[topic] ?? []) {
    try {
      const m = await import(mod)
      const entry = m[fn]?.(slug)
      if (entry) out.push([prefix, entry])
    } catch (e) {
      // Never swallow this. A layer that fails to import silently drops its
      // prose from BOTH the extraction and the coverage count, which reads as
      // "fully translated" while those cards render English — exactly the bug
      // this comment replaced.
      console.error(`  ! ${topic}/${prefix} failed to load: ${e.message}`)
      process.exitCode = 2
    }
  }
  return out
}


const args = process.argv.slice(2)
const QUIET = args.includes('--quiet')
const i = args.indexOf('--lang')
const ONLY_LANG = i === -1 ? null : args[i + 1]

import { stamp } from './i18n_stamp.mjs'
const generic = (p) => p.replace(/\[\d+\]/g, '[]')

function classify(path, leaf) {
  for (const [pattern, isProse] of PATH_OVERRIDES) {
    if (pattern.startsWith('*.')) {
      if (path.endsWith(pattern.slice(1))) return isProse ? 'prose' : 'skip'
    } else if (path === pattern || path.endsWith('.' + pattern)) {
      return isProse ? 'prose' : 'skip'
    }
  }
  if (SKIP_KEYS.has(leaf)) return 'skip'
  if (PROSE_KEYS.has(leaf)) return 'prose'
  return 'unclassified'
}

function walk(node, path, hits) {
  if (node == null) return
  if (typeof node === 'string') {
    const leaf = (path.split('.').pop() || '').replace(/\[\d+\]$/, '').replace(/\[\]$/, '')
    hits.push({ path, leaf, value: node })
    return
  }
  if (Array.isArray(node)) { node.forEach((v, n) => walk(v, `${path}[${n}]`, hits)); return }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, hits)
  }
}

/** Current English prose, keyed `school:path` -> { value, of }. */
async function englishProse(topic) {
  const out = new Map()
  for (const slug of SLUGS) {
    const hits = []
    const entry = await entryFor(topic, slug)
    if (entry) walk(entry, '', hits)
    for (const [prefix, extra] of await extraFor(topic, slug)) walk(extra, prefix, hits)
    for (const h of hits) {
      if (classify(generic(h.path), h.leaf) !== 'prose') continue
      out.set(`${slug}:${h.path}`, { value: h.value, of: stamp(h.value) })
    }
  }
  return out
}

/**
 * Overlays are discovered from disk rather than declared, so a locale that has
 * not started shows as absent instead of as an error.
 */
function overlayLocales(dir = 'src/data/overlays') {
  if (!existsSync(dir)) return []
  const langs = new Set()
  for (const f of readdirSync(dir)) {
    const m = /^([a-z-]+)\.([a-z]{2})\.json$/.exec(f)
    if (m) langs.add(m[2])
  }
  return [...langs].sort()
}

function loadOverlay(topic, lang, dir = 'src/data/overlays') {
  const p = `${dir}/${topic}.${lang}.json`
  if (!existsSync(p)) return null
  return JSON.parse(readFileSync(p, 'utf8'))
}

async function main() {
  const langs = (ONLY_LANG ? [ONLY_LANG] : overlayLocales()).filter(Boolean)

  if (!langs.length) {
    if (!QUIET) {
      console.log('No prose overlays on disk yet — nothing to check.')
      console.log('This is the expected state until the first content stage lands.')
      console.log('See .claude/docs/prose-translation-es.md for the stage order.')
    }
    return
  }

  let problems = 0

  for (const lang of langs) {
    if (!QUIET) console.log(`\n── ${lang} ──`)
    for (const topic of Object.keys(TOPICS)) {
      const overlay = loadOverlay(topic, lang)
      if (!overlay) {
        if (!QUIET) console.log(`  ${topic.padEnd(17)} not started`)
        continue
      }

      const en = await englishProse(topic)
      let stale = 0, orphan = 0, untranslated = 0
      const staleEx = []
      // Coverage is counted in FIELD SITES, not overlay entries: one deduped
      // entry can translate the same string at many sites, so comparing entry
      // count against field count would report phantom gaps.
      const covered = new Set()

      for (const entry of overlay.strings ?? []) {
        const live = (entry.at ?? []).filter((a) => en.has(a))
        if (!live.length) { orphan++; continue }
        const drifted = live.filter((a) => en.get(a).of !== entry.of)
        if (drifted.length) {
          stale++
          // Shipped overlay entries carry only { t, of, at } — the English
          // `text` lives in the WORK file, not here. Report the live English
          // (from `en`) beside the now-stale translation instead.
          if (staleEx.length < 3) {
            staleEx.push({ at: drifted[0], now: en.get(drifted[0])?.value, t: entry.t })
          }
          // Drifted sites stay uncovered — they render English until re-translated.
          for (const a of live) if (!drifted.includes(a) && entry.t) covered.add(a)
          continue
        }
        if (entry.t) { for (const a of live) covered.add(a) } else untranslated++
      }

      const translated = covered.size
      const missing = en.size - translated
      const pct = en.size ? Math.round((translated / en.size) * 100) : 0
      // Drift and orphans are defects. Uncovered fields are ordinary partial
      // coverage — reported, but not a finding, since partial is a supported
      // state end-to-end.
      const flag = stale || orphan ? '⚠' : '✓'
      if (!QUIET || flag === '⚠') {
        console.log(
          `  ${flag} ${topic.padEnd(15)} ${String(pct).padStart(3)}% translated`
          + ` · ${translated}/${en.size} field sites`
          + (stale ? ` · ${stale} STALE` : '')
          + (missing > 0 ? ` · ${missing} untranslated` : '')
          + (orphan ? ` · ${orphan} orphaned` : ''),
        )
      }
      for (const e of staleEx) {
        console.log(`      stale: ${e.at}`)
        console.log(`             English now: ${JSON.stringify(e.now ?? null).slice(0, 76)}`)
        console.log(`             stale t:     ${JSON.stringify(e.t ?? null).slice(0, 76)}`)
      }
      problems += stale + orphan
    }
  }

  if (problems) {
    console.log(
      `\n${problems} finding(s). STALE entries fall back to English at runtime —`
      + `\nthe page is correct, just untranslated there. Re-extract the affected`
      + `\ntopic and re-translate those strings. Advisory: exit 1 is a signal, not a gate.`,
    )
    process.exit(1)
  }
  if (!QUIET) console.log('\n✓ no drift')
}

main().catch((e) => { console.error(e); process.exit(2) })
