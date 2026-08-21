#!/usr/bin/env node
// Does the shipped overlay resolve against the LIVE src/data English?
//
// WHY THIS EXISTS, ALONGSIDE check_runtime_resolution.mjs
// ------------------------------------------------------
// check_runtime_resolution.mjs recomputes each shipped stamp from the WORK
// FILE's `text`. That catches a corrupted build step, but it cannot catch the
// case the stamping mechanism actually exists for: **English prose edited in
// src/data after the work file was extracted.** Both files then agree with each
// other and disagree with the app, so the check passes while every affected
// entry silently renders English.
//
// This walks the live per-school modules instead — the same objects the runtime
// hands to `localized()` — recomputes the stamp at every translatable field
// path, and asserts that each shipped overlay entry matches a stamp that
// actually occurs in the live data.
//
//   node scripts/check_live_resolution.mjs --lang fr
//   node scripts/check_live_resolution.mjs --lang fr --topic summer-programs
//
// Exit 1 on any shipped entry whose stamp no longer occurs in live English:
// those are precisely the entries that will fall back without saying so.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = new URL('..', import.meta.url).pathname
const OVERLAYS = join(ROOT, 'src/data/overlays')

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const LANG = val('--lang', 'fr')
const ONLY = val('--topic')

const { stamp } = await import(pathToFileURL(join(ROOT, 'scripts/i18n_stamp.mjs')).href)

/* The topic/accessor/export layout comes from i18n_topics.mjs — the same
   module the extractor reads. This file used to carry its own six-entry copy
   against the extractor's nine, so four of the ten shipped overlay files were
   compared against English that was never loaded and every one of their entries
   reported "unresolvable": 4,646 false positives, which is why this check was
   never read. Never re-declare these locally. */
import {
  SLUGS, TOPICS, ACCESSORS, EXPORTS, EXTRA_LAYERS,
} from './i18n_topics.mjs'

/**
 * Overlay files with no entry in TOPICS because they come from a DIFFERENT
 * extractor, and so must not be sourced here.
 *
 * `financial-aid-tuition.content` is produced by i18n_extract_content.mjs over
 * src/content/**, not src/data/**. It holds 0 strings today, so it contributes
 * nothing either way — but the moment it is populated it would report every
 * entry unresolvable, which is exactly the false positive this rewrite exists
 * to remove. Skipped by name rather than by "0 strings is fine", so a topic
 * that silently empties still fails.
 */
const FOREIGN_TOPICS = new Set(['financial-aid-tuition.content'])

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
      // Never swallow this. An accessor that throws drops a whole school's
      // English from the live set, so every shipped entry for it reports
      // unresolvable — a wiring bug wearing a stale-translation costume.
      console.error(`  ✗ ${topic}/${slug}: ${err.message}`)
      process.exitCode = 2
      return undefined
    }
  }
  try {
    const m = await import(`../src/data/${TOPICS[topic]}/${slug}.ts`)
    return m[EXPORTS[slug]]
  } catch (err) {
    // A school with no module for a directory topic is normal and stays silent.
    // An ACCESSOR topic reaching here at all is a real error.
    if (ACCESSORS[topic]) {
      console.error(`  ✗ ${topic}: ${err.message}`)
      process.exitCode = 2
    }
    return undefined
  }
}

/**
 * The extra layers for one school, as [prefix, entry] pairs.
 *
 * Both exports are accessor functions taking a slug — call them. Walking the
 * bare function object yields no strings and reads as "this layer is empty",
 * which is how the Student Clubs `catalog.*` and `clusters.*` paths (706 of the
 * 4,646) went unsourced.
 */
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

/**
 * EVERY string reachable in a live entry — deliberately not filtered by the
 * prose/skip classification.
 *
 * This check asks only "does the English this translation was made from still
 * exist in the app?", so a superset is exactly right: re-implementing the
 * classifier here would let the two copies drift, which is the failure mode
 * i18n_fields.mjs's own docstring warns about. A shipped entry whose stamp is
 * absent from the superset cannot resolve under any classification.
 */
function walk(node, path, out) {
  if (typeof node === 'string') {
    if (node.trim()) out.push({ path, text: node })
    return
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`, out))
    return
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, out)
  }
}

/* Live stamps per topic, so the guard below can ask "did this topic contribute
   any English at all?" — the question that distinguishes a stale translation
   from an unsourced topic. */
const byTopic = new Map()
const liveStamps = new Set()
const topics = ONLY ? [ONLY] : Object.keys(TOPICS)

for (const topic of topics) {
  const set = new Set()
  byTopic.set(topic, set)
  for (const slug of SLUGS) {
    const entry = await entryFor(topic, slug)
    if (entry) {
      const found = []
      walk(entry, '', found)
      for (const f of found) set.add(stamp(f.text))
    }
    for (const [, extra] of await extraFor(topic, slug)) {
      const found = []
      walk(extra, '', found)
      for (const f of found) set.add(stamp(f.text))
    }
  }
  for (const st of set) liveStamps.add(st)
}

let checked = 0
let unresolvable = 0
const files = readdirSync(OVERLAYS)
  .filter((f) => f.endsWith(`.${LANG}.json`))
  .filter((f) => !ONLY || f.startsWith(`${ONLY}.`))

let unsourced = 0

for (const file of files) {
  const topic = file.slice(0, file.length - `.${LANG}.json`.length)
  if (FOREIGN_TOPICS.has(topic)) continue

  /* THE GUARD. If a topic contributed zero live English strings, every one of
     its shipped entries would report unresolvable — thousands of findings whose
     real cause is one missing line of wiring. Say that once, and emit no
     per-entry noise for the file. */
  const source = byTopic.get(topic)
  if (!source || source.size === 0) {
    console.error(
      `  ✗ no English source loaded for topic '${topic}' — every entry in ` +
        `${file} would report unresolvable;\n      this is a wiring bug in ` +
        `scripts/i18n_topics.mjs, not a stale translation.`,
    )
    unsourced++
    continue
  }

  const shipped = JSON.parse(readFileSync(join(OVERLAYS, file), 'utf8'))
  if (!Array.isArray(shipped.strings)) continue
  for (const s of shipped.strings) {
    checked++
    if (!liveStamps.has(s.of)) {
      unresolvable++
      if (unresolvable <= 8) {
        console.error(
          `  ✗ ${file}: stamp ${s.of} occurs nowhere in live src/data English` +
            `\n      t: ${String(s.t).slice(0, 80)}`,
        )
      }
    }
  }
}

console.log(
  `\n${LANG}: ${checked} shipped entr${checked === 1 ? 'y' : 'ies'} checked against ` +
    `${liveStamps.size} live English string(s)` +
    (ONLY ? ` — topic ${ONLY}` : ''),
)

if (!checked) {
  console.error(
    `\n✗ nothing checked. Build the overlays first, or check --lang / --topic.`,
  )
  process.exit(1)
}

if (unsourced) {
  console.error(
    `\n✗ ${unsourced} overlay topic(s) had no English source. Wire them into ` +
      `scripts/i18n_topics.mjs\n  (TOPICS / ACCESSORS / EXTRA_LAYERS) — or, if the ` +
      `topic comes from another extractor, add it to FOREIGN_TOPICS by name.`,
  )
  process.exit(1)
}

if (unresolvable) {
  console.error(
    `\n✗ ${unresolvable} shipped entr${unresolvable === 1 ? 'y' : 'ies'} cannot resolve ` +
      `against live English.\nEach one renders ENGLISH at runtime while coverage reports ` +
      `100%.\nRe-extract the topic and re-translate the affected strings.`,
  )
  process.exit(1)
}

console.log('✓ every shipped entry matches a live English string — they will resolve')
