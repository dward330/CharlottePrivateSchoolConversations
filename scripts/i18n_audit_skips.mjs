#!/usr/bin/env node
/**
 * Prints the ACTUAL VALUES behind every skipped field, so a classification can be
 * judged against the data rather than guessed from the field's name.
 *
 * WHY THIS EXISTS. Six fields were misclassified across Stages 1-3, always the
 * same way: the leaf name suggested a code or a numeral, and the values turned
 * out to be phrases.
 *
 *   since   "numeral / short date"     ->  "since 2002", "long-tenured", "15+ years"
 *   tag     "short badge code"         ->  "Statewide, 1 per sport", "2 OF 3 YRS"
 *   meta    "layout hint"              ->  "built 2012–13", "renamed 2025"
 *   date    "short date literal"       ->  "May 2023", "July 1, 2025"
 *   season  "chrome-owned"             ->  Fall / Winter / Spring (needed a key)
 *   value   "numeric stat figure"      ->  mixed: "27" AND "24 yrs", "HOF"
 *
 * Every one shipped English inside an otherwise-Spanish card, and every one was
 * caught by a human reading the rendered page rather than by any check here.
 * The residual detector only catches fields nobody classified — it is silent
 * about fields classified WRONGLY, which is the more common mistake.
 *
 * Run this BEFORE translating a topic. A skipped field whose values contain
 * words is a bug; a skipped field whose values are all figures, codes or proper
 * nouns is correct.
 *
 * Usage:
 *   node scripts/i18n_audit_skips.mjs                  # all topics
 *   node scripts/i18n_audit_skips.mjs --topic sports
 *   node scripts/i18n_audit_skips.mjs --suspect        # only fields with words
 *
 * Exit codes: 0 = reviewed, 1 = suspect fields found (advisory), 2 = error.
 */
import { SKIP_KEYS, PATH_OVERRIDES, REVIEWED_SKIPS, REVIEWED_SKIP_VALUES } from './i18n_fields.mjs'

/* The topic/accessor/export layout is defined ONCE in i18n_topics.mjs. This
   file used to carry a five-topic copy against the extractor's nine, so it was
   silently auditing a subset of the app — the same drift that left check:live
   at 4,646 phantom findings. Never re-declare these locally. */
import {
  SLUGS, TOPICS, ACCESSORS, EXPORTS, EXTRA_LAYERS,
} from './i18n_topics.mjs'

const args = process.argv.slice(2)
const val = (f) => { const i = args.indexOf(f); return i === -1 ? null : args[i + 1] }
const ONLY = val('--topic')
const SUSPECT_ONLY = args.includes('--suspect')

/**
 * Does this value look like prose rather than a code?
 *
 * Two or more letters in sequence somewhere, and not obviously a bare figure,
 * a level code (V/JV/MS/P4/D1), a proper-noun-looking Title Case run, or a URL.
 * Deliberately over-inclusive: a false positive costs one glance, a false
 * negative ships English to a reader.
 */
function looksLikeProse(s) {
  if (!/[a-z]{2}/i.test(s)) return false                 // no real letters
  if (/^https?:/.test(s)) return false                    // URL
  if (/^[A-Z0-9][A-Z0-9\s&.'’/+-]*$/.test(s) && s.length <= 4) return false // short code
  // A lowercase word anywhere is the strongest prose signal — proper nouns and
  // codes are Title Case or ALL CAPS.
  return /\b[a-z]{3,}\b/.test(s)
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
      console.error(`  ✗ ${topic}/${slug}: ${err.message}`)
      process.exitCode = 2
      return undefined
    }
  }
  try {
    const m = await import(`../src/data/${TOPICS[topic]}/${slug}.ts`)
    return m[EXPORTS[slug]]
  } catch (err) {
    if (ACCESSORS[topic]) {
      console.error(`  ✗ ${topic}: ${err.message}`)
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

const generic = (p) => p.replace(/\[\d+\]/g, '[]')

function pathOverridden(path) {
  for (const [pattern, isProse] of PATH_OVERRIDES) {
    if (pattern.startsWith('*.')) {
      if (path.endsWith(pattern.slice(1))) return isProse
    } else if (path === pattern || path.endsWith('.' + pattern)) return isProse
  }
  return undefined
}

async function main() {
  const topics = ONLY ? [ONLY] : Object.keys(TOPICS)
  const byLeaf = new Map()   // leaf -> { paths:Set, values:Set }

  for (const topic of topics) {
    for (const slug of SLUGS) {
      const entry = await entryFor(topic, slug)
      const layers = [
        ...(entry ? [['', entry]] : []),
        ...(await extraFor(topic, slug)),
      ]
      if (!layers.length) continue
      for (const [prefix, layer] of layers)
      walk(layer, prefix, (path, value) => {
        const g = generic(path)
        const leaf = (g.split('.').pop() || '').replace(/\[\]$/, '')
        // Path overrides win; only report what SKIP_KEYS actually excludes.
        if (pathOverridden(g) !== undefined) return
        if (!SKIP_KEYS.has(leaf)) return
        if (!byLeaf.has(leaf)) byLeaf.set(leaf, { paths: new Set(), values: new Set() })
        const rec = byLeaf.get(leaf)
        rec.paths.add(`${topic}:${g}`)
        // Collect EVERY value. This used to stop at 8 (`if (rec.values.size <
        // 8)`), which capped the check and not just the printout: the sentence
        // "No jazz, a cappella, chamber or tiered band is published" sat in
        // `ensembles` — a field classified "proper noun — ensemble name" — and
        // was the 9th value, so looksLikeProse() never saw it. The audit
        // reported "no skipped field has prose-looking values" and exited 0
        // while shipping that sentence as raw English to all four non-English
        // locales for four rollouts. Display is still capped below; detection
        // must not be.
        rec.values.add(value)
      })
    }
  }

  let suspect = 0
  const rows = [...byLeaf.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  console.log('\nSKIPPED FIELDS — actual values behind each classification\n')

  for (const [leaf, rec] of rows) {
    const vals = [...rec.values]
    // Already judged against its values and confirmed a code/proper noun.
    const prosey = REVIEWED_SKIPS.has(leaf)
      ? []
      : vals.filter((v) => looksLikeProse(v) && !REVIEWED_SKIP_VALUES.has(v))
    const flag = prosey.length ? '⚠ ' : '  '
    if (prosey.length) suspect++
    if (SUSPECT_ONLY && !prosey.length) continue
    console.log(`${flag}${leaf}  —  ${SKIP_KEYS.get(leaf)}`)
    // Every prose-looking value is shown, plus a sample of the rest — the
    // flagged ones are the point, and truncating them away is what hid the
    // `ensembles` sentence. The "+N more" suffix keeps it honest about the cap.
    const shown = [...new Set([...prosey, ...vals])].slice(0, 8)
    const rest = vals.length - shown.length
    console.log(`     ${shown.map((v) => JSON.stringify(v.slice(0, 40))).join(' · ')}`
      + (rest > 0 ? ` · +${rest} more` : ''))
    if (prosey.length) {
      console.log(`     ^ ${prosey.length} of ${vals.length} values contain words —`
        + ` verify this is a code, not a phrase`)
    }
    console.log()
  }

  if (suspect) {
    console.log(`⚠ ${suspect} skipped field(s) have values that read as prose.`)
    console.log('  Each may still be correct — proper nouns contain words too. But a')
    console.log('  phrase like "since 2002" or "built 2012–13" is a misclassification,')
    console.log('  and it ships English inside a translated card.\n')
    process.exitCode = 1
  } else {
    console.log('✓ no skipped field has prose-looking values\n')
  }
}

function walk(node, path, visit) {
  if (node == null) return
  if (typeof node === 'string') { visit(path, node); return }
  if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${path}[${i}]`, visit)); return }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, visit)
  }
}

main().catch((e) => { console.error(e); process.exit(2) })
