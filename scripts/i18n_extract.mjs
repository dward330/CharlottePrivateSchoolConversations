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
import { writeFileSync, mkdirSync } from 'node:fs'
import { stamp } from './i18n_stamp.mjs'
import { PROSE_KEYS, SKIP_KEYS, PATH_OVERRIDES } from './i18n_fields.mjs'

const SLUGS = [
  'providence-day', 'charlotte-latin', 'charlotte-christian',
  'charlotte-country-day', 'cannon', 'davidson-day',
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
}

/** Slug -> the export name each per-school module uses. */
const EXPORTS = {
  'providence-day': 'providenceDay',
  'charlotte-latin': 'charlotteLatin',
  'charlotte-christian': 'charlotteChristian',
  'charlotte-country-day': 'charlotteCountryDay',
  cannon: 'cannon',
  'davidson-day': 'davidsonDay',
}

/** One school's entry for a topic, or undefined if that school has none. */
async function entryFor(topic, slug) {
  try {
    const m = await import(`../src/data/${TOPICS[topic]}/${slug}.ts`)
    return m[EXPORTS[slug]]
  } catch {
    return undefined
  }
}

const args = process.argv.slice(2)
const has = (f) => args.includes(f)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }

const REPORT = has('--report')
const RESIDUAL = has('--residual')
const LANG = val('--lang', 'es')
const OUT = val('--out', 'src/data/overlays/work')
const ONLY = val('--topic', null)



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
    if (!entry) continue
    const hits = []
    walk(entry, '', hits)
    for (const h of hits) out.push({ ...h, school: slug, generic: generic(h.path) })
  }
  return out
}

async function main() {
  const topics = ONLY ? [ONLY] : Object.keys(TOPICS)
  for (const t of topics) {
    if (!TOPICS[t]) {
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
