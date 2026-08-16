#!/usr/bin/env node
/**
 * check:ranks — the "Where Graduates Go" acceptance lists must show their
 * U.S. News rankings.
 *
 * HARD RULE (user-set, 2026-08-16): on every school's `outcomes.colleges`
 * list, any college tagged into a ranked bucket — `ivy`, `ivyplus`, `nu75`,
 * or `lac75` — MUST carry a `rankLabel` ("National Rank #59" /
 * "Liberal Rank #46"), the rank shown on the right-hand side of the card.
 * Covenant Day shipped without them once; this check exists so no future
 * school can.
 *
 * Also enforced: the SAME institution must carry the SAME label everywhere it
 * appears — the labels all come from one table
 * (source-material/college-support/_shared/US News 2026 - Rank Labels.md),
 * so a conflict means someone re-typed a rank instead of copying it. When a
 * college is missing from that table, deep-research its rank against the same
 * 2026 U.S. News edition and add it to the table with a source — do not guess.
 *
 * Deliberately EXEMPT: `p4`-only entries (no other ranked cat). Sixteen
 * Power-4 tail universities (LSU, SMU, WVU, …) ship unlabeled across all
 * seven schools because their ranks were never part of the project's table;
 * they are consistently absent rather than half-fixed. Tightening that is a
 * future enhancement — see the shared table's header.
 *
 * Runs under plain Node (24+ type stripping): the per-school files are data
 * modules with type-only imports, so they import cleanly here.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = setup error.
 */

const RANKED = new Set(['ivy', 'ivyplus', 'nu75', 'lac75'])

const SCHOOLS = [
  ['cannon', () => import('../src/data/collegeSupportPrograms/cannon.ts')],
  ['charlotte-christian', () => import('../src/data/collegeSupportPrograms/charlotte-christian.ts')],
  ['charlotte-country-day', () => import('../src/data/collegeSupportPrograms/charlotte-country-day.ts')],
  ['charlotte-latin', () => import('../src/data/collegeSupportPrograms/charlotte-latin.ts')],
  ['covenant-day', () => import('../src/data/collegeSupportPrograms/covenant-day.ts')],
  ['davidson-day', () => import('../src/data/collegeSupportPrograms/davidson-day.ts')],
  ['providence-day', () => import('../src/data/collegeSupportPrograms/providence-day.ts')],
]

let missing = 0
let conflicts = 0
const labelsByName = new Map() // name -> Map(label -> [slugs])

for (const [slug, load] of SCHOOLS) {
  let mod
  try {
    mod = await load()
  } catch (e) {
    console.error(`check:ranks — cannot import ${slug}: ${e.message}`)
    process.exit(2)
  }
  const program = Object.values(mod)[0]
  const colleges = program?.outcomes?.colleges ?? []
  for (const c of colleges) {
    const cats = c.cats ?? []
    if (!c.rankLabel && cats.some((t) => RANKED.has(t))) {
      console.log(`  ✗ ${slug}: "${c.name}" is tagged [${cats.join(', ')}] but has no rankLabel`)
      missing++
    }
    if (c.rankLabel) {
      const seen = labelsByName.get(c.name) ?? new Map()
      const arr = seen.get(c.rankLabel) ?? []
      arr.push(slug)
      seen.set(c.rankLabel, arr)
      labelsByName.set(c.name, seen)
    }
  }
}

for (const [name, seen] of labelsByName) {
  if (seen.size > 1) {
    console.log(
      `  ✗ conflicting rank labels for "${name}": ` +
        [...seen.entries()].map(([l, s]) => `"${l}" (${s.join(', ')})`).join(' vs '),
    )
    conflicts++
  }
}

if (missing || conflicts) {
  console.log(
    `\ncheck:ranks — ${missing} ranked-bucket college(s) missing a rankLabel, ${conflicts} label conflict(s).` +
      '\nTake labels from source-material/college-support/_shared/US News 2026 - Rank Labels.md;' +
      '\nif a college is not in that table, research its 2026 U.S. News rank and add it there first.',
  )
  process.exit(1)
}
console.log('check:ranks — every ranked-bucket college on all 7 acceptance lists carries its rank label, with no conflicts')
