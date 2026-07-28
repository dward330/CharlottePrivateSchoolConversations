/**
 * Extract translatable sections out of `src/content/<topic>/<school>.json`
 * into a work file, the `src/content` counterpart of i18n_extract.mjs.
 *
 * Two things differ from the src/data extractor, both forced by the fact that
 * ingest regenerates this layer on every pass (see section 6 of
 * .claude/docs/prose-translation-architecture.md):
 *
 * 1. KEYED BY CONTENT HASH, NOT PATH. `sections[4].text` renumbers whenever a
 *    sub-section is inserted upstream, and a stamp cannot tell a renumber from
 *    an edit. Hashing the English body means the key travels with the text.
 *
 * 2. THE UNIT IS THE SECTION, NOT THE FIELD. These are multi-paragraph markdown
 *    bodies; splitting them per-field would break the tables and headings
 *    inside them.
 *
 * Only sections a parent can actually reach are extracted — most of
 * src/content is dead weight the redesign replaced with structured cards.
 *
 * Usage:
 *   node scripts/i18n_extract_content.mjs --topic financial-aid-tuition --lang es
 *   node scripts/i18n_extract_content.mjs --topic student-clubs --lang es --report
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stamp } from './i18n_stamp.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT = join(ROOT, 'src/content')
const WORK = join(ROOT, 'src/data/overlays/work')

/**
 * Topics whose prose loop still reaches a parent, and which metric groups
 * survive within them. `SchoolDetail.tsx` replaces the loop entirely for
 * sports / the-arts / college-support / after-school / course-offerings, so
 * translating those files would be work no reader can see.
 *
 * Student Clubs is a partial merge: the redesign kept only Academic &
 * Competitive Clubs and the Club Catalog.
 */
const LIVE = {
  'financial-aid-tuition': null, // null = every section is live
  'student-clubs': /academic|competitive|catalog|overview/i,
}

/**
 * Metric groups whose prose body a structured card replaces, per topic.
 *
 * The Deep Dive Report is the big one: all six schools have an entry in
 * financialAidReports.ts, so `FinancialAidReportCard` renders instead of the
 * prose and 36,419 of the topic's 38,589 words never reach a parent. Stage 7
 * already translated that content in its structured form; translating the
 * prose too would duplicate the work and create a second copy to keep in sync.
 *
 * Matched on the subtopic because that is what `liveSections` sees; the render
 * path keys off the normalized metric key (`in-depth-report`).
 */
const CARD_REPLACED = {
  'financial-aid-tuition': [
    { subtopic: /deep.?dive/i, module: 'financialAidReports.ts' },
  ],
  'student-clubs': [
    { subtopic: /academic|competitive/i, module: 'clubClusters.ts' },
    { subtopic: /catalog|overview/i, module: 'clubCatalog.ts' },
  ],
}

/**
 * Whether a school has a structured entry standing in for this section.
 *
 * Checked PER SCHOOL, not per topic: Cannon has no clubClusters and no
 * clubCatalog entry, so its two Student Clubs cards still render prose while
 * the other five schools render structured bodies. A topic-level rule would
 * wrongly drop Cannon's prose and leave those cards English forever.
 */
const moduleSlugs = new Map()

/**
 * Slugs keyed in a module's lookup map.
 *
 * Read from the map literal rather than by grepping the file: object keys are
 * written both quoted (`'charlotte-latin':`) and bare (`cannon:`), and a
 * substring search for `'cannon'` misses the bare form — which silently let
 * Cannon's 7,164-word Deep Dive body through as translatable when the card
 * already replaces it.
 */
function slugsIn(module) {
  if (moduleSlugs.has(module)) return moduleSlugs.get(module)
  const src = readFileSync(join(ROOT, 'src/data', module), 'utf8')
  const found = new Set()
  for (const m of src.matchAll(/^\s{2}'?([a-z][a-z-]+)'?\s*:\s*[A-Z_]/gm)) found.add(m[1])
  moduleSlugs.set(module, found)
  return found
}

function cardReplaces(topic, slug, subtopic) {
  for (const rule of CARD_REPLACED[topic] ?? []) {
    if (rule.subtopic.test(subtopic) && slugsIn(rule.module).has(slug)) return true
  }
  return false
}

/** Retrieval bookkeeping and duplicated `# Title` lines — see src/lib/content.ts. */
const PROVENANCE = /^provenance$/i
const isTitleOnly = (t) => {
  const s = (t ?? '').trim()
  return s.startsWith('# ') && !s.includes('\n')
}

/**
 * Lines that must survive untranslated inside an otherwise translatable body:
 * markdown table rows (tuition grids, Wayback timestamps) and verbatim quotes
 * a family matches against the school's own archived page. Translating a
 * citation destroys its function as a citation.
 */
export const isVerbatimLine = (line) =>
  line.trim().startsWith('|') || /Verbatim:|Wayback `/.test(line)

/**
 * Split a section body into blocks on blank lines.
 *
 * The section is the wrong translation unit on its own: the five Deep Dive
 * Report bodies run 5,500–7,200 words each, too large to translate accurately
 * or for a reviewer to check in isolation. Blocks are paragraphs, headings and
 * whole tables — never a partial table, because the blank-line boundary keeps
 * contiguous `|` rows together.
 *
 * A block that is entirely verbatim (a rate table, a quoted snapshot) is
 * dropped rather than offered for translation, and reassembly puts the English
 * back in place.
 */
export function blocksOf(text) {
  return text
    .split(/\n\s*\n/)
    .map((b) => b.replace(/\s+$/, ''))
    .filter((b) => b.trim())
}

export const isVerbatimBlock = (block) =>
  block.split('\n').filter((l) => l.trim()).every(isVerbatimLine)

function liveSections(topic, data) {
  const keep = LIVE[topic]
  const out = []
  for (const s of data.sections ?? []) {
    if (PROVENANCE.test((s.subtopic ?? '').trim())) continue
    if (isTitleOnly(s.text)) continue
    if (keep && !keep.test(s.subtopic ?? '')) continue
    if (!(s.text ?? '').trim()) continue
    out.push(s)
  }
  return out
}

const words = (s) => (s ?? '').split(/\s+/).filter(Boolean).length

function main() {
  const argv = process.argv.slice(2)
  const arg = (f) => {
    const i = argv.indexOf(f)
    return i === -1 ? undefined : argv[i + 1]
  }
  const topic = arg('--topic')
  const lang = arg('--lang') ?? 'es'
  const report = argv.includes('--report')

  if (!topic || !(topic in LIVE)) {
    console.error(`--topic must be one of: ${Object.keys(LIVE).join(', ')}`)
    console.error('Other topics render structured cards; their prose is unreachable.')
    process.exit(2)
  }

  const dir = join(CONTENT, topic)
  /**
   * Keyed by content hash so two schools sharing identical boilerplate collapse
   * to ONE entry translated once, and so upstream reordering cannot break it.
   */
  const byHash = new Map()

  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const slug = file.replace(/\.json$/, '')
    const data = JSON.parse(readFileSync(join(dir, file), 'utf8'))
    for (const section of liveSections(topic, data)) {
      if (cardReplaces(topic, slug, section.subtopic ?? '')) continue
      for (const block of blocksOf(section.text)) {
        if (isVerbatimBlock(block)) continue
        const key = stamp(block)
        let entry = byHash.get(key)
        if (!entry) {
          entry = { of: key, subtopic: section.subtopic ?? '', at: [], text: block, t: '' }
          byHash.set(key, entry)
        }
        entry.at.push(`${slug}:${section.subtopic ?? ''}`)
      }
    }
  }

  const sections = [...byHash.values()]
  const total = sections.reduce((n, e) => n + words(e.text), 0)
  const sizes = sections.map((e) => words(e.text)).sort((a, b) => b - a)

  if (report) {
    console.log(`${topic} · ${lang}`)
    console.log(`  distinct blocks   : ${sections.length}`)
    console.log(`  render sites      : ${sections.reduce((n, e) => n + e.at.length, 0)}`)
    console.log(`  translatable words: ${total.toLocaleString()}`)
    if (sizes.length) {
      console.log(`  largest block     : ${sizes[0].toLocaleString()} words`)
      console.log(`  median block      : ${sizes[Math.floor(sizes.length / 2)].toLocaleString()} words`)
    } else {
      console.log('  (nothing translatable — every section is card-replaced)')
    }
    return
  }

  mkdirSync(WORK, { recursive: true })
  const out = join(WORK, `${topic}.content.${lang}.json`)

  // Preserve any translation already done: re-extraction must never wipe work.
  if (existsSync(out)) {
    const prev = JSON.parse(readFileSync(out, 'utf8'))
    const done = new Map((prev.sections ?? []).map((e) => [e.of, e.t]))
    let kept = 0
    for (const e of sections) {
      const t = done.get(e.of)
      if (t) {
        e.t = t
        kept++
      }
    }
    console.log(`carried over ${kept} existing translation(s)`)
  }

  writeFileSync(out, JSON.stringify({ topic, lang, sections }, null, 2) + '\n')
  console.log(`wrote ${out}`)
  console.log(`  ${sections.length} sections · ${total.toLocaleString()} words`)
}

main()
