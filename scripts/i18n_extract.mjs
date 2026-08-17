#!/usr/bin/env node
/**
 * Stage 0 of the prose-translation plan: measure and extract the translatable
 * surface of the structured research layer (src/data/**).
 *
 * See .claude/docs/prose-translation-architecture.md. This script does the
 * "extract" third of extract -> translate -> reinject. It exists so that a
 * translation pass never has to read the data files themselves: URLs, figures,
 * proper nouns and layout numbers stay out of model context entirely, and the
 * structure is rebuilt mechanically on the way back in.
 *
 * It is also the measurement tool. The ~45-55k word estimate in the plan was
 * extrapolated from grep frequency counts; `--report` replaces it with a real
 * number, which is what tells you how much native-speaker review time a stage
 * actually costs.
 *
 * Usage:
 *   node scripts/i18n_extract.mjs --report            # word/string counts, no output files
 *   node scripts/i18n_extract.mjs --report --residual # + every field NOT classified
 *   node scripts/i18n_extract.mjs --topic sports      # emit one topic's work file
 *   node scripts/i18n_extract.mjs --topic sports --lang es --out DIR
 *   node scripts/i18n_extract.mjs --topic sports --lang es --force  # re-extract
 *
 * --lang DEFAULTS TO es. Extraction blanks every `t`, and the script refuses to
 * overwrite a work file that already holds translations unless --force is given
 * (see guardExisting) — an unrecognised flag must never silently wipe a locale.
 *
 * The work file carries the English beside each translation so a translator and
 * a reviewer can see the source. It is COMMITTED and is the reviewable artifact.
 * Compile it to the shipped overlay with i18n_build_overlay.mjs, which strips
 * the English — the runtime re-derives the hash from src/data/** instead.
 *
 * Exit codes: 0 = clean, 1 = unclassified fields found, 2 = script error.
 *
 * The dedupe is the point, not an optimisation. `label` alone is ~1,073
 * occurrences across a small recurring vocabulary ("varsity sports / programs"
 * repeats for all six schools), so the work file carries each DISTINCT string
 * once with its occurrence list. Translate once, reinject everywhere.
 */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { stamp } from './i18n_stamp.mjs'
import { PROSE_KEYS, SKIP_KEYS, PATH_OVERRIDES } from './i18n_fields.mjs'

const SLUGS = [
  'providence-day', 'charlotte-latin', 'charlotte-christian',
  'charlotte-country-day', 'cannon', 'covenant-day', 'davidson-day',
  'carmel-christian', 'hickory-grove-christian',
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
  // Summer Programs uses `summer/` rather than `summerPrograms/`: the doubled
  // "Programs" in the folder name read badly beside the module's own name.
  'summer-programs': 'summer',
  'course-offerings': null,   // single module + accessor, see ACCESSORS
  'financial-aid-report': null,
  'metric-values': null,
}

/**
 * Topics whose per-school data lives in ONE module behind an accessor rather
 * than in `<dir>/<slug>.ts`. Course Offerings is a single 5,800-line file with
 * six school constants and a `courseOfferings(slug)` lookup.
 */
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
      // Never swallow this. An accessor that throws silently drops a whole
      // school from BOTH the extraction and the coverage denominator, so the
      // checker reports 100% while the page renders English (see the Stage 1
      // Student Clubs failure).
      console.error(`  ✗ ${topic}/${slug}: ${err.message}`)
      process.exitCode = 2
      return undefined
    }
  }
  try {
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
const has = (f) => args.includes(f)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }

const REPORT = has('--report')
const RESIDUAL = has('--residual')
const LANG = val('--lang', 'es')
const OUT = val('--out', 'src/data/overlays/work')
const ONLY = val('--topic', null)

/**
 * Refuse to overwrite a work file that already carries translations.
 *
 * Extraction emits `t: ''` for every string, so re-running it over a translated
 * work file blanks the whole thing — and because the diff is a clean
 * same-line-count replacement, it does not look like data loss in `git status`.
 * This bit the Bangla rollout: `--help` is not a recognised flag, so `--lang`
 * fell through to its 'es' default and one command wiped all eight committed
 * Spanish files. Recovered via `git checkout`, but only because the tree was
 * clean at the time.
 *
 * --force is the deliberate escape hatch for a genuine re-extract (English
 * source changed and the work file must be rebuilt).
 */
function guardExisting(dest) {
  if (has('--force')) return
  let prior
  try { prior = JSON.parse(readFileSync(dest, 'utf8')) } catch { return }
  const translated = (prior.strings ?? []).filter((s) => s.t).length
  if (!translated) return
  console.error(
    `\n✗ refusing to overwrite ${dest}\n`
    + `  It already holds ${translated} translated string(s); extraction would blank them.\n`
    + `  Did you mean --lang <other>? Pass --force to re-extract anyway.\n`,
  )
  process.exit(2)
}



const words = (s) => s.trim().split(/\s+/).filter(Boolean).length

/**
 * Is this field translatable prose? Full-path overrides win, then the skip
 * list, then the prose list. Anything matching none of the three is
 * UNCLASSIFIED and reported rather than guessed at — a silently-dropped field
 * is an untranslated card with no signal, which is how coverage gaps hide.
 */
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

/** Walk one school's entry, collecting every string leaf with its full path. */
function walk(node, path, hits) {
  if (node == null) return
  if (typeof node === 'string') {
    const leaf = path.split('.').pop().replace(/\[\d+\]$/, '') || '(root)'
    hits.push({ path, leaf: leaf.replace(/\[\]$/, ''), value: node })
    return
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`, hits))
    return
  }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, hits)
  }
}

/** Generic path with array indices collapsed, for classification + reporting. */
const generic = (p) => p.replace(/\[\d+\]/g, '[]')

async function collect(topicSlug) {
  const out = []
  for (const slug of SLUGS) {
    const entry = await entryFor(topicSlug, slug)
    if (entry) {
      const hits = []
      walk(entry, '', hits)
      for (const h of hits) out.push({ ...h, school: slug, generic: generic(h.path) })
    }
    // Extra layers this topic renders alongside its main entry (see EXTRA_LAYERS).
    for (const [prefix, extra] of await extraFor(topicSlug, slug)) {
      const hits = []
      walk(extra, prefix, hits)
      for (const h of hits) out.push({ ...h, school: slug, generic: generic(h.path) })
    }
  }
  return out
}

async function main() {
  const topics = ONLY ? [ONLY] : Object.keys(TOPICS)
  for (const t of topics) {
    if (!(t in TOPICS)) {
      console.error(`unknown topic: ${t}\nknown: ${Object.keys(TOPICS).join(', ')}`)
      process.exit(2)
    }
  }

  const summary = []
  const unclassified = new Map()
  let grandStrings = 0, grandWords = 0, grandUnique = 0, grandUniqueWords = 0

  for (const topic of topics) {
    const hits = await collect(topic)

    const prose = []
    for (const h of hits) {
      const kind = classify(h.generic, h.leaf)
      if (kind === 'unclassified') {
        const k = `${topic}:${h.generic}`
        if (!unclassified.has(k)) unclassified.set(k, { n: 0, ex: h.value })
        unclassified.get(k).n++
        continue
      }
      if (kind === 'prose') prose.push(h)
    }

    // Translation memory: one entry per DISTINCT string, carrying every place
    // it occurs. This is where the token saving comes from.
    const byString = new Map()
    for (const h of prose) {
      const key = h.value
      if (!byString.has(key)) byString.set(key, { text: key, of: stamp(key), at: [] })
      byString.get(key).at.push(`${h.school}:${h.path}`)
    }

    const totalWords = prose.reduce((a, h) => a + words(h.value), 0)
    const uniqueWords = [...byString.keys()].reduce((a, s) => a + words(s), 0)

    summary.push({
      topic,
      strings: prose.length,
      unique: byString.size,
      words: totalWords,
      uniqueWords,
      saved: totalWords ? 1 - uniqueWords / totalWords : 0,
    })
    grandStrings += prose.length; grandWords += totalWords
    grandUnique += byString.size; grandUniqueWords += uniqueWords

    if (!REPORT) {
      mkdirSync(OUT, { recursive: true })
      const payload = {
        topic, lang: LANG,
        generated: 'i18n_extract.mjs',
        note: 'Translate each `text` into `t`. Leave `of` and `at` untouched — '
            + 'they are how the overlay is rebuilt and drift-checked.',
        strings: [...byString.values()].map((e) => ({ ...e, t: '' })),
      }
      const dest = `${OUT}/${topic}.${LANG}.json`
      guardExisting(dest)
      writeFileSync(dest, JSON.stringify(payload, null, 2) + '\n', 'utf8')
      console.log(`wrote ${dest} — ${byString.size} strings, ${uniqueWords} words`)
    }
  }

  if (REPORT) {
    console.log('\nTRANSLATABLE SURFACE — src/data structured cards\n')
    console.log(
      'TOPIC'.padEnd(17), 'STRINGS'.padStart(8), 'UNIQUE'.padStart(7),
      'WORDS'.padStart(8), 'DEDUPED'.padStart(8), 'SAVED'.padStart(7),
    )
    for (const s of summary) {
      console.log(
        s.topic.padEnd(17), String(s.strings).padStart(8), String(s.unique).padStart(7),
        String(s.words).padStart(8), String(s.uniqueWords).padStart(8),
        (Math.round(s.saved * 100) + '%').padStart(7),
      )
    }
    console.log(
      'TOTAL'.padEnd(17), String(grandStrings).padStart(8), String(grandUnique).padStart(7),
      String(grandWords).padStart(8), String(grandUniqueWords).padStart(8),
      (Math.round((1 - grandUniqueWords / grandWords) * 100) + '%').padStart(7),
    )
    console.log(
      `\n${grandUniqueWords.toLocaleString()} words is what a translator actually reads`
      + ` per language,\nafter dedupe (${grandWords.toLocaleString()} before).`,
    )
    console.log(
      '\nNOT included: src/content/** prose (financial-aid ~39k words, the surviving'
      + '\nStudent Clubs groups). Those land in the final stage — see the rollout doc.',
    )
  }

  if (unclassified.size) {
    const rows = [...unclassified.entries()].sort((a, b) => b[1].n - a[1].n)
    console.log(`\n⚠ ${rows.length} UNCLASSIFIED field path(s) — neither prose nor skip.`)
    console.log('  Each is excluded from extraction. Add to PROSE_KEYS or SKIP_KEYS')
    console.log('  in scripts/i18n_fields.mjs after deciding which it is.\n')
    if (RESIDUAL || rows.length <= 12) {
      for (const [k, v] of rows) {
        console.log(`  ${String(v.n).padStart(4)}  ${k}\n        e.g. ${JSON.stringify(v.ex).slice(0, 88)}`)
      }
    } else {
      console.log(`  (re-run with --residual to list them)`)
    }
    process.exit(1)
  }

  if (REPORT) console.log('\n✓ every string field is classified as prose or skip')
}

main().catch((e) => { console.error(e); process.exit(2) })
