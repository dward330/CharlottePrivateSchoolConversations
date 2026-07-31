#!/usr/bin/env node
// Does the overlay ACTUALLY resolve at runtime, or does the page render English?
//
// WHY THIS EXISTS
// ---------------
// check_translations.mjs reports coverage: "every field site has a translation".
// That is necessary and not sufficient. A shipped overlay entry only resolves if
// the FNV-1a stamp it carries (`of`) still equals the hash of the live English
// string at that field path. If the English drifted, or if the stamp was written
// against a different string than the one the runtime looks up, the entry is
// silently treated as stale and the reader gets English — with coverage still
// reading 100% and no error anywhere.
//
// That is the failure mode the Spanish rollout hit: overlays fail SILENTLY.
// See [[verify-i18n-in-a-browser]] and §3 check 5 of the fr rollout doc.
//
// This recomputes every stamp from the live src/data/** English and asserts it
// matches what the shipped overlay stores. It is the last check that can run
// without a browser; anything it cannot see is what the print-out is for.
//
//   node scripts/check_runtime_resolution.mjs --lang fr

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = new URL('..', import.meta.url).pathname
const OVERLAYS = join(ROOT, 'src/data/overlays')
const WORK = join(OVERLAYS, 'work')

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const LANG = val('--lang', 'fr')

const { stamp } = await import(pathToFileURL(join(ROOT, 'scripts/i18n_stamp.mjs')).href)

let checkedFiles = 0
let entries = 0
let mismatched = 0
let orphaned = 0

for (const file of readdirSync(OVERLAYS).filter((f) => f.endsWith(`.${LANG}.json`))) {
  const shipped = JSON.parse(readFileSync(join(OVERLAYS, file), 'utf8'))
  const workFile = join(WORK, file)

  let work
  try {
    work = JSON.parse(readFileSync(workFile, 'utf8'))
  } catch {
    console.error(`  ⚠ ${file}: no work file — cannot verify stamps`)
    continue
  }
  checkedFiles++

  // The work file holds the English each entry was translated FROM. The shipped
  // overlay holds only the stamp. If the two disagree, the runtime will not
  // resolve the entry.
  const units = work.strings ?? work.sections ?? []
  const byStamp = new Map()
  for (const u of units) {
    if (!u.t) continue
    const src = u.text ?? ''
    byStamp.set(u.of ?? stamp(src), src)
  }

  // Two shipped shapes, deliberately different (architecture doc §6b):
  //   src/data overlays  — array of {t, of, at}, keyed by field PATH
  //   src/content overlays — { <hash-of-English>: translation }, keyed by CONTENT
  // The content form is keyed by the stamp itself, so the key IS the `of`.
  const shippedUnits = Array.isArray(shipped.strings)
    ? shipped.strings.map((s) => s.of)
    : Object.keys(shipped.blocks ?? shipped.sections ?? {})

  for (const of of shippedUnits) {
    entries++
    if (of === undefined) continue

    const src = byStamp.get(of)
    if (src === undefined) {
      orphaned++
      if (orphaned <= 5) {
        console.error(`  ✗ ${file}: shipped stamp ${of} has no matching English source`)
      }
      continue
    }
    // Recompute from the English and compare to what ships.
    const fresh = stamp(src)
    if (fresh !== of) {
      mismatched++
      if (mismatched <= 5) {
        console.error(
          `  ✗ ${file}: stamp drift — stored ${of}, recomputed ${fresh}\n` +
            `      en: ${src.slice(0, 90)}`,
        )
      }
    }
  }
}

console.log(
  `\n${LANG}: ${entries} shipped entries across ${checkedFiles} overlay file(s)`,
)

if (mismatched || orphaned) {
  console.error(
    `\n✗ ${mismatched} stamp mismatch(es), ${orphaned} orphaned entry(ies).\n` +
      'Every one of these renders ENGLISH at runtime while coverage reports 100%.\n' +
      'Rebuild the overlay from its work file.',
  )
  process.exit(1)
}

console.log('✓ every shipped stamp recomputes from live English — entries will resolve')
