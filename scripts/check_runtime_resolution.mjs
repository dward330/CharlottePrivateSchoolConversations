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
// SECOND JOB: the VALUE gates (added 2026-08-21, .claude/plans/valuegates.md).
// A stamp that recomputes proves the entry RESOLVES; it says nothing about what
// the reader then sees. check:live's gate 3 closed that hole for the 70 content
// blocks; the same valid-hash-wrong-text failure was unguarded across the 11,341
// entries per locale in the other nine overlays. Two cheap rules run here now —
// non-empty, and a length ratio — and they report on their OWN exit path,
// because a bad value is not a stale stamp and the remedies differ (fix the
// translation vs rebuild the overlay).
//
//   node scripts/check_runtime_resolution.mjs --lang fr
//   node scripts/check_runtime_resolution.mjs --lang fr --report-identical

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = new URL('..', import.meta.url).pathname
const OVERLAYS = join(ROOT, 'src/data/overlays')
const WORK = join(OVERLAYS, 'work')

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const LANG = val('--lang', 'fr')
const REPORT_IDENTICAL = args.includes('--report-identical')

const { stamp } = await import(pathToFileURL(join(ROOT, 'scripts/i18n_stamp.mjs')).href)

/* Length-ratio bounds for the value gate. Deliberately the SAME names and values
   as check_live_resolution.mjs:223-225, where they were calibrated against all
   9 locales x 70 content blocks (observed 0.758-1.438) before being enforced.

   They were re-measured against the nine src/data overlays on 2026-08-21 rather
   than assumed to transfer: across 38,691 pairs whose English is >= 80 chars the
   observed range is 0.554-1.753, so these bounds sit outside it on both sides
   with room to spare. Do NOT re-derive them per-overlay — one set of constants
   for both hosts is the point, and a bound tightened to the observed range would
   fire on the first correct translation that ran long. */
const RATIO_MIN_LEN = 80
const RATIO_LO = 0.4
const RATIO_HI = 2.5

let checkedFiles = 0
let entries = 0
let mismatched = 0
let orphaned = 0

/* Value-gate findings, kept SEPARATE from mismatched/orphaned above. See the
   two-exit-path convention (check_chrome_keys.mjs, PR #170, and the gate-2 /
   gate-3 split in PR #171): a value finding means "fix the translation", a stamp
   finding means "rebuild the overlay". Merging them would let a wave of value
   findings mask a resolution failure, which is the more severe of the two. */
let badValues = []
let valuesChecked = 0

/* The identical rule is collected ALWAYS and enforced NEVER. It stands at ~2,200
   per locale (19,754 across all nine, 2,756 distinct topic/hash pairs), and the
   overwhelming majority are legitimate keeps: course codes, figure labels, grade
   bands. Gating on it would park the build at ~2,200 findings, and this repo has
   two recorded cases of a checker sitting at a non-zero number and ceasing to be
   read — check:sepdrift, and check:live itself at 4,646. Making it a third is
   the single worst outcome available here.

   So it ships behind --report-identical and ALWAYS EXITS 0. If you are reading
   this because you want to turn it into a gate: the 344 leak-shaped entries (the
   ones 1-2 locales left English while the rest translated) need triaging first,
   and that is a separate pass. Do not flip this to exit 1 to force the issue. */
const identical = []

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
  /* A SECOND map, deliberately not `byStamp`. `byStamp` skips units whose `t` is
     falsy, which quietly drops the one legitimately-empty entry in the repo
     (financial-aid-report 811c9dc5, English "" and translation "" in all nine
     locales). For the stamp check that skip is harmless. For the empty VALUE
     rule it would sidestep the very exemption the rule needs, so the English is
     collected here unconditionally. */
  const englishByStamp = new Map()
  for (const u of units) {
    const src = u.text ?? ''
    const of = u.of ?? stamp(src)
    englishByStamp.set(of, src)
    /* Skip units with no translation — they were never built into the overlay,
       so a shipped stamp matching one would be genuinely orphaned. The one
       exception is the pair that is empty on BOTH sides (financial-aid-report
       811c9dc5): it is a correct entry, and the build drops it today, but if it
       ever shipped the old `!u.t` skip would have reported it as orphaned. That
       is a false positive on a correct repo, the same class this script's value
       gates exist to avoid. */
    if (!u.t && src.trim()) continue
    byStamp.set(of, src)
  }

  // Two shipped shapes, deliberately different (architecture doc §6b):
  //   src/data overlays  — array of {t, of, at}, keyed by field PATH
  //   src/content overlays — { <hash-of-English>: translation }, keyed by CONTENT
  // The content form is keyed by the stamp itself, so the key IS the `of`.
  const shippedUnits = Array.isArray(shipped.strings)
    ? shipped.strings.map((s) => ({ of: s.of, t: s.t ?? '', at: s.at }))
    : Object.entries(shipped.blocks ?? shipped.sections ?? {}).map(([of, t]) => ({
        of,
        t: typeof t === 'string' ? t : (t?.t ?? ''),
      }))

  for (const unit of shippedUnits) {
    const of = unit.of
    entries++
    if (of === undefined) continue

    // ---- value gates -------------------------------------------------------
    // These run off the shipped translation and the work file's English, so they
    // are independent of whether the stamp below recomputes. An entry can carry
    // a perfectly valid hash and still render an empty or untranslated value —
    // that is exactly the gap these close.
    const en = englishByStamp.get(of)
    if (en !== undefined) {
      valuesChecked++
      const t = unit.t
      if (!t.trim() && en.trim()) {
        // Empty translation where the English is NOT empty. The English test is
        // the rule, not a hardcoded hash: 811c9dc5 is empty on BOTH sides and is
        // correct, and hardcoding it would fail the next legitimately-empty pair.
        badValues.push({ file, of, kind: 'empty', en })
      } else if (en.length >= RATIO_MIN_LEN && t.length) {
        const r = t.length / en.length
        if (r < RATIO_LO || r > RATIO_HI) {
          badValues.push({ file, of, kind: 'ratio', en, t, ratio: r })
        }
      }
      if (REPORT_IDENTICAL && t === en && en.length) {
        identical.push({ file, of, en, at: unit.at })
      }
    }
    // ---- /value gates ------------------------------------------------------

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
  `\n${LANG}: ${entries} shipped entries across ${checkedFiles} overlay file(s)` +
    `, ${valuesChecked} value(s) checked`,
)

if (mismatched || orphaned) {
  console.error(
    `\n✗ ${mismatched} stamp mismatch(es), ${orphaned} orphaned entry(ies).\n` +
      'Every one of these renders ENGLISH at runtime while coverage reports 100%.\n' +
      'Rebuild the overlay from its work file.',
  )
  process.exit(1)
}

// A locale with no overlays at all must NOT report success. This check exists to
// prove the page renders the language rather than silently falling back, and
// "zero entries verified" proves exactly nothing — but it printed the same ✓ as
// a fully-verified locale, so a typo'd --lang or an un-built overlay set read as
// a pass. Same shape as the i18n_audit_skips cap that let a defect through
// because its sample size doubled as its coverage.
if (!entries) {
  console.error(
    `\n✗ no ${LANG} overlay entries found in ${OVERLAYS}.\n` +
      'Nothing was verified, so this is not a pass. Build the overlays first\n' +
      '(node scripts/i18n_build_overlay.mjs --topic <t> --lang ' + LANG + '),\n' +
      'or check the --lang code.',
  )
  process.exit(1)
}

console.log('✓ every shipped stamp recomputes from live English — entries will resolve')

/* ---- the identical REPORT (always exit 0) --------------------------------
   Grouped by how many locales left the same (topic, hash) English, because that
   band is what separates a keep from a leak: a string all nine locales left in
   English is almost always a course code or a figure label, while one that 1-2
   left English and the rest translated is leak-shaped.

   The per-locale run below can only see its OWN locale, so it prints this
   locale's count and defers the cross-locale banding to `npm run i18n:leaks`,
   which is built for it. Displayed examples are CAPPED; collection is NOT — a
   check whose sample size doubles as its coverage is a recorded miss in this
   repo (the `ensembles` hedge, 9th of 55 values, passed an audit capped at 8). */
if (REPORT_IDENTICAL) {
  const byFile = new Map()
  for (const e of identical) byFile.set(e.file, (byFile.get(e.file) ?? 0) + 1)
  console.log(
    `\n── identical-to-English report (${LANG}) — REPORT ONLY, never gates ──\n` +
      `${identical.length} shipped value(s) byte-identical to their English, ` +
      `across ${byFile.size} overlay file(s):`,
  )
  for (const [f, n] of [...byFile].sort((a, b) => b[1] - a[1])) {
    console.log(`   ${String(n).padStart(5)}  ${f}`)
  }
  const SHOW = 15
  console.log(`\n   first ${Math.min(SHOW, identical.length)} of ${identical.length}:`)
  for (const e of identical.slice(0, SHOW)) {
    const where = e.at?.[0] ? ` @ ${e.at[0]}` : ''
    console.log(`   ${e.of}  ${JSON.stringify(e.en.slice(0, 70))}${where}`)
  }
  console.log(
    '\n   Most of these are legitimate keeps (course codes, figure labels, grade\n' +
      '   bands). For the cross-locale banding that separates keeps from leaks,\n' +
      `   run:  npm run i18n:leaks -- --lang ${LANG}`,
  )
}

/* ---- value gates: their OWN exit path ------------------------------------
   Reached only when every stamp recomputed, so a failure here is unambiguous:
   the entry RESOLVES and the reader sees the wrong thing. The remedy is to fix
   the translation in the work file and rebuild — never to relax the rule. */
if (badValues.length) {
  const SHOW = 20
  console.error(
    `\n✗ ${badValues.length} shipped value(s) fail the value gates for ${LANG}.\n` +
      'These entries RESOLVE — their stamps are valid — but the value the reader\n' +
      'sees is empty or implausibly sized. Fix the translation, then rebuild.\n',
  )
  for (const b of badValues.slice(0, SHOW)) {
    if (b.kind === 'empty') {
      console.error(
        `   ${b.file} ${b.of}: EMPTY translation, English is not empty\n` +
          `      en: ${JSON.stringify(b.en.slice(0, 80))}`,
      )
    } else {
      console.error(
        `   ${b.file} ${b.of}: length ratio ${b.ratio.toFixed(3)} outside ` +
          `${RATIO_LO}-${RATIO_HI} (en ${b.en.length} chars, t ${b.t.length})\n` +
          `      en: ${JSON.stringify(b.en.slice(0, 80))}\n` +
          `      t : ${JSON.stringify(b.t.slice(0, 80))}`,
      )
    }
  }
  if (badValues.length > SHOW) {
    console.error(`   ... and ${badValues.length - SHOW} more (display capped, not collection)`)
  }
  process.exit(1)
}

console.log(`✓ ${valuesChecked} shipped value(s) pass the empty and length-ratio gates`)
