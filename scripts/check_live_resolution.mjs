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

/* The per-school module directories, mirroring i18n_extract.mjs's TOPICS. Kept
   as its own list rather than imported because that module runs extraction on
   import; this only needs the map. */
const TOPICS = {
  sports: 'sportsPrograms',
  'the-arts': 'artsPrograms',
  'student-clubs': 'clubsPrograms',
  'college-support': 'collegeSupportPrograms',
  'after-school': 'afterSchoolPrograms',
  'summer-programs': 'summer',
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

const liveStamps = new Set()
const topics = ONLY ? [ONLY] : Object.keys(TOPICS)

for (const topic of topics) {
  const dir = TOPICS[topic]
  if (!dir) continue
  for (const [slug, exp] of Object.entries(EXPORTS)) {
    let entry
    try {
      const mod = await import(
        pathToFileURL(join(ROOT, `src/data/${dir}/${slug}.ts`)).href
      )
      entry = mod[exp]
    } catch {
      continue // a school with no entry for this topic is normal
    }
    if (!entry) continue
    const found = []
    walk(entry, '', found)
    for (const f of found) liveStamps.add(stamp(f.text))
  }
}

let checked = 0
let unresolvable = 0
const files = readdirSync(OVERLAYS)
  .filter((f) => f.endsWith(`.${LANG}.json`))
  .filter((f) => !ONLY || f.startsWith(`${ONLY}.`))

for (const file of files) {
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

if (unresolvable) {
  console.error(
    `\n✗ ${unresolvable} shipped entr${unresolvable === 1 ? 'y' : 'ies'} cannot resolve ` +
      `against live English.\nEach one renders ENGLISH at runtime while coverage reports ` +
      `100%.\nRe-extract the topic and re-translate the affected strings.`,
  )
  process.exit(1)
}

console.log('✓ every shipped entry matches a live English string — they will resolve')
