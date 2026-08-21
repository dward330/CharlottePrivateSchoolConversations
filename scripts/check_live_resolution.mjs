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
//   node scripts/check_live_resolution.mjs --lang fr --verbose
//
// Exit 1 on any shipped entry whose stamp no longer occurs in live English:
// those are precisely the entries that will fall back without saying so.

import { readFileSync, readdirSync, rmSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
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
 * src/content/**, not src/data/**. Comparing it against src/data English would
 * report every entry unresolvable — exactly the false positive this check's
 * rewrite existed to remove.
 *
 * CORRECTION. An earlier version of this docstring said the file "holds 0
 * strings today, so it contributes nothing either way." That is FALSE, and was
 * false when written: it holds 70 fully translated blocks in each of the nine
 * locales. The "0 strings" reading came from asking for `.strings`, which this
 * overlay does not have — it carries a `blocks` OBJECT keyed by hash, written by
 * a different builder than i18n_build_overlay.mjs (which emits `{topic, lang,
 * strings: []}`). That shape divergence is a SECOND, independent reason the file
 * is skipped: the `Array.isArray(shipped.strings)` test below would skip it even
 * with this allowlist emptied. Two belts on the same trousers — deliberate, and
 * noted here so neither is removed as redundant.
 *
 * ENTRIES ARE NOW VERIFIED, NOT TRUSTED. This list used to be a silencing switch
 * nothing checked: the guard below tells a maintainer facing a red build to add
 * the offending topic here, and nothing asked whether that edit was honest.
 * Adding `sports` would have turned a build-blocking gate green while silently
 * dropping 995 shipped French entries from the check — a documented bypass in a
 * build gate. `verifyForeignTopic()` now proves each entry against the content
 * extractor itself: the topic must be one the extractor will accept, and every
 * shipped block hash must reproduce from a fresh extract of src/content/**.
 *
 * What that does NOT buy — stated plainly rather than papered over: gate 1
 * delegates "is this a real foreign topic" to the LIVE map in
 * i18n_extract_content.mjs, so a maintainer determined to silence a red build
 * could edit that map too. The bypass is no longer one word in one list; it is
 * two files, self-contradicting, and gate 2 still fails it because the extractor
 * finds no src/content/<topic>/ to extract from. Whether a genuinely new
 * extractor warrants a new entry here remains a human judgment no check makes.
 */
const FOREIGN_TOPICS = new Set(['financial-aid-tuition.content'])

/**
 * The topics `i18n_extract_content.mjs` will accept, parsed from its LIVE map.
 *
 * PARSED, NOT IMPORTED. That module calls `main()` at module scope, so
 * `await import()` of it runs the CLI and exits THIS process with code 2 —
 * verified. It is the same hazard that forced i18n_topics.mjs to be split out of
 * i18n_extract.mjs rather than imported from it, recurring one module over.
 * Re-parsing the authority is also the technique check_live_all.mjs uses for
 * PROSE_TRANSLATED and check_seo.mjs for TRANSLATED.
 */
function contentExtractorTopics() {
  const src = readFileSync(join(ROOT, 'scripts/i18n_extract_content.mjs'), 'utf8')
  const m = src.match(/const LIVE = \{([\s\S]*?)\n\}/)
  if (!m) {
    console.error('  ✗ could not parse LIVE from scripts/i18n_extract_content.mjs')
    process.exit(2)
  }
  return new Set([...m[1].matchAll(/^\s*'([^']+)'\s*:/gm)].map((x) => x[1]))
}

/** Hashes an overlay claims to ship, across BOTH overlay shapes. */
function shippedHashes(overlay) {
  const fromBlocks = Object.keys(overlay.blocks ?? overlay.sections ?? {})
  const fromStrings = (overlay.strings ?? []).map((x) => x.of)
  return new Set([...fromBlocks, ...fromStrings])
}

/* One extract per base topic per invocation. check_live_all.mjs runs this script
   once per locale, and the extraction is locale-independent for hash purposes. */
const extractCache = new Map()

/**
 * Every block hash a fresh extract of `base` produces, or null if the extractor
 * refuses the topic.
 *
 * Driven as a SUBPROCESS for the exit-2-on-import reason above. `--lang` is a
 * throwaway code in no locale list, because the extractor's carry-over branch
 * would otherwise merge into — and rewrite — a real work file, the one genuinely
 * destructive move available here. Removed in a `finally` so a mid-run failure
 * cannot leave src/data/overlays/work/ dirty.
 */
function freshExtract(base) {
  if (extractCache.has(base)) return extractCache.get(base)
  const PROBE = '__verify'
  const work = join(ROOT, 'src/data/overlays/work', `${base}.content.${PROBE}.json`)
  let result = null
  try {
    execFileSync(
      'node',
      [join(ROOT, 'scripts/i18n_extract_content.mjs'), '--topic', base, '--lang', PROBE],
      { encoding: 'utf8', stdio: 'pipe' },
    )
    /* A topic with nothing translatable (student-clubs: every section is
       card-replaced) returns before writing anything. That is a clean exit 0 and
       a legitimately empty extract, not a failure. */
    result = existsSync(work)
      ? new Set((JSON.parse(readFileSync(work, 'utf8')).sections ?? []).map((e) => e.of))
      : new Set()
  } catch {
    result = null // extractor refused the topic (exit 2) or failed outright
  } finally {
    if (existsSync(work)) rmSync(work)
  }
  extractCache.set(base, result)
  return result
}

/**
 * Positively verify one FOREIGN_TOPICS entry. Returns a findings array.
 *
 * The point of the whole exercise: not "no src/data source was found" — an
 * absence, which a typo also produces — but "this source was found in
 * src/content, and it is the one these blocks were made from."
 */
function verifyForeignTopic(topic, filesByTopic, extractorTopics, verbose) {
  const out = []

  /* The filename parse fuses topic and extractor discriminator into one string:
     `financial-aid-tuition.content`. The extractor takes only the base as
     --topic, so the suffix must come back off before gate 1 — hardcoding the
     fused string fails gate 1 against this check's own legitimate entry. */
  const dot = topic.lastIndexOf('.')
  const base = dot === -1 ? topic : topic.slice(0, dot)

  // A stale or misspelled entry reads as protection while protecting nothing.
  if (!filesByTopic.has(topic)) {
    out.push(
      `FOREIGN_TOPICS entry '${topic}' matches no overlay file for --lang ${LANG}.
` +
        `      A stale or misspelled entry silences nothing and reads as protection. ` +
        `Remove it, or fix the spelling.`,
    )
    return out
  }

  // GATE 1 — the extractor's own LIVE map. This alone refuses every src/data
  // topic, on the extractor's authority rather than a list mirrored in here.
  if (!extractorTopics.has(base)) {
    out.push(
      `FOREIGN_TOPICS entry '${topic}' is not something i18n_extract_content.mjs ` +
        `can produce.
      Its LIVE map holds: ${[...extractorTopics].join(', ')}. ` +
        `A src/data topic allowlisted here would
      silently drop every one of its ` +
        `shipped entries from this check.`,
    )
    return out
  }

  const shipped = shippedHashes(
    JSON.parse(readFileSync(join(OVERLAYS, filesByTopic.get(topic)), 'utf8')),
  )

  // GATE 2 — the shipped hashes must reproduce from a fresh extract.
  const fresh = freshExtract(base)
  if (fresh === null) {
    out.push(
      `FOREIGN_TOPICS entry '${topic}': the content extractor refused or failed on ` +
        `--topic ${base}.`,
    )
    return out
  }

  if (!shipped.size) {
    /* A legitimately empty foreign overlay is a real state — student-clubs
       extracts to 0 blocks. Gate 1 plus a clean extractor exit IS the assertion
       here; asserting the file is non-empty would fail a correct repo. */
    if (verbose) console.log(`  · ${topic}: verified — extractor accepts '${base}', 0 shipped blocks`)
    return out
  }

  /* Superset, one direction: shipped ⊆ extracted. NOT equality — the extractor
     legitimately yields blocks nobody has translated yet, and i18n_build_overlay
     drops those from the shipped overlay by design. Demanding equality would
     fail on normal partial translation. */
  const orphans = [...shipped].filter((h) => !fresh.has(h))
  if (orphans.length) {
    out.push(
      `FOREIGN_TOPICS entry '${topic}': ${orphans.length} of ${shipped.size} shipped ` +
        `block hash(es) do NOT reproduce
      from a fresh extract of src/content/${base}/ ` +
        `— e.g. ${orphans.slice(0, 3).join(', ')}.
      Either the English moved, or this ` +
        `overlay was not made by that extractor.`,
    )
    return out
  }

  if (verbose) {
    console.log(
      `  · ${topic}: verified — ${shipped.size}/${shipped.size} shipped block hashes ` +
        `reproduced from src/content/${base}/`,
    )
  }
  return out
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

/* ── COMPLETENESS + ALLOWLIST VERIFICATION ───────────────────────────────────
   Once per invocation, before the per-file loop: the finding is about the TOPIC
   SET, so running it inside the loop would print it once per overlay file.

   Two invariants, previously stated nowhere:

     1. Every shipped overlay topic is accounted for by EXACTLY ONE of TOPICS
        (a real src/data source) or FOREIGN_TOPICS (another extractor's output).
        The unsourced guard below already catches an unaccounted-for topic, but
        only by accident — `byTopic.get()` happens to return undefined. Stating
        the invariant means it holds because it is asserted, not because a lookup
        misses.
     2. Every FOREIGN_TOPICS entry is verifiable against the content extractor.
        See that constant's docstring for why an unverified allowlist is a
        documented bypass in a build gate. */
const VERBOSE = args.includes('--verbose')
let badTopics = 0

const filesByTopic = new Map(
  files.map((f) => [f.slice(0, f.length - `.${LANG}.json`.length), f]),
)

const extractorTopics = contentExtractorTopics()

for (const topic of filesByTopic.keys()) {
  /* `topic in TOPICS`, never `TOPICS[topic]` truthiness: accessor topics are
     TOPICS keys with a null value, so a truthiness test would report every one
     of them unaccounted for. */
  const inTopics = topic in TOPICS
  const inForeign = FOREIGN_TOPICS.has(topic)
  if (inTopics && inForeign) {
    console.error(
      `  ✗ topic '${topic}' is in BOTH TOPICS and FOREIGN_TOPICS.\n` +
        `      Contradictory: the allowlist would suppress a topic that has a real ` +
        `English source in\n      src/data. Remove it from whichever list is wrong.`,
    )
    badTopics++
  } else if (!inTopics && !inForeign) {
    console.error(
      `  ✗ overlay topic '${topic}' is accounted for by neither TOPICS nor ` +
        `FOREIGN_TOPICS.\n      Wire it into scripts/i18n_topics.mjs (TOPICS / ACCESSORS ` +
        `/ EXTRA_LAYERS) — or, if the\n      topic comes from another extractor, add it ` +
        `to FOREIGN_TOPICS, where it will be verified.`,
    )
    badTopics++
  }
}

for (const topic of FOREIGN_TOPICS) {
  for (const finding of verifyForeignTopic(topic, filesByTopic, extractorTopics, VERBOSE)) {
    console.error(`  ✗ ${finding}`)
    badTopics++
  }
}

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

if (badTopics) {
  /* Its own message and its own summary, deliberately. The value of the unsourced
     guard is that it names its own cause; "an allowlist entry could not be
     verified" must never be confusable with "a stale translation". */
  console.error(
    `\n✗ ${badTopics} overlay-topic accounting problem(s). Every shipped overlay topic ` +
      `must be\n  accounted for by exactly one of TOPICS (scripts/i18n_topics.mjs) or ` +
      `FOREIGN_TOPICS\n  (this file), and every FOREIGN_TOPICS entry must verify against ` +
      `the content extractor.\n  An unverified allowlist is a documented bypass in a ` +
      `build gate.`,
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
