#!/usr/bin/env node
/**
 * check:ranks — the "Where Graduates Go" acceptance lists must show their
 * U.S. News rankings.
 *
 * HARD RULE (user-set, 2026-08-16): any college tagged into a ranked bucket —
 * `ivy`, `ivyplus`, `nu75`, or `lac75` — MUST resolve to a rank label ("National
 * Rank #59" / "Liberal Rank #46"), the rank shown on the right of the card.
 * Covenant Day shipped without them once; this check exists so no future school
 * can.
 *
 * SINGLE SOURCE (2026-08-16): labels are no longer stored inline on each college.
 * They resolve from the master `COLLEGE_RANKINGS` table in
 * `src/data/collegeRankings.ts` via `rankLabelFor(name)`, so one institution has
 * exactly one label everywhere and cross-school conflicts are impossible by
 * construction. This check therefore verifies one thing: every ranked-bucket
 * college's name resolves in the master. The human-readable companion (with a
 * source per figure) is source-material/college-support/US News 2026 - Rank
 * Labels.md; add a new college to BOTH (one row each), never re-type a rank.
 *
 * Note: `p4`-only entries are not required to resolve — a Power-Four tag alone
 * does not assert a National/LAC rank. Any p4 college that also holds a rank is
 * in the master and renders its label anyway.
 *
 * COVERAGE (fixed 2026-08-25): the school list is read from the directory, not
 * hardcoded. It used to be a literal array of 9 entries, so the two schools added
 * after it was written — `gaston-day` and `hickory-grove-christian` — were never
 * checked, and the gate reported success over 9 of 11 schools. Nothing said so;
 * a green line read as full coverage. Never reintroduce a hardcoded school list
 * here: adding a school must extend this check automatically.
 *
 * Runs under plain Node (24+ type stripping): the data modules and the master
 * use type-only imports, so they import cleanly here.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = setup error.
 */

const RANKED = new Set(['ivy', 'ivyplus', 'nu75', 'lac75'])

// Every non-locale school file in the directory. Read from disk rather than
// hardcoded: a hardcoded list silently stops covering schools added after it was
// written, which is exactly what happened here — `gaston-day` and
// `hickory-grove-christian` were added later and went unchecked, so this gate
// was quietly verifying 9 of 11 schools. (Found 2026-08-25 while adding
// check:buckets, which reads the directory for this reason.)
const LOCALE_RE = /\.(es|bn|ht|te|fr|fa|it|hi|ar)\.ts$/
const DIR = new URL('../src/data/collegeSupportPrograms/', import.meta.url)

let SCHOOLS
try {
  const { readdirSync } = await import('node:fs')
  SCHOOLS = readdirSync(DIR)
    .filter((f) => f.endsWith('.ts') && !LOCALE_RE.test(f))
    .sort()
    .map((f) => [f.replace(/\.ts$/, ''), () => import(new URL(f, DIR).href)])
} catch (e) {
  console.error(`check:ranks — cannot read collegeSupportPrograms/: ${e.message}`)
  process.exit(2)
}
if (SCHOOLS.length === 0) {
  console.error('check:ranks — no school files found; the data directory moved or is empty')
  process.exit(2)
}

// Labels resolve from the single-source master (src/data/collegeRankings.ts).
// Because one institution has exactly one row there, cross-school label
// conflicts are impossible by construction — the only failure this check can
// surface is a ranked-BUCKET college whose name does not resolve to a label in
// the master (a bucket tag with no backing rank).
let missing = 0
let rankLabelFor
try {
  ;({ rankLabelFor } = await import('../src/data/collegeRankings.ts'))
} catch (e) {
  console.error(`check:ranks — cannot import the master collegeRankings.ts: ${e.message}`)
  process.exit(2)
}

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
    if (cats.some((t) => RANKED.has(t)) && !rankLabelFor(c.name)) {
      console.log(
        `  ✗ ${slug}: "${c.name}" is tagged [${cats.join(', ')}] but the master ` +
          `collegeRankings.ts has no rank for it`,
      )
      missing++
    }
  }
}

// Sync guard: the master TS table and the human-readable .md companion must
// agree, so the sourced doc can never silently drift from what actually renders.
let drift = 0
try {
  const { readFileSync } = await import('node:fs')
  const { COLLEGE_RANKINGS } = await import('../src/data/collegeRankings.ts')
  const mdPath = new URL(
    '../source-material/college-support/_shared/US News 2026 - Rank Labels.md',
    import.meta.url,
  )
  const md = readFileSync(mdPath, 'utf8')
  const mdRows = new Map(
    [...md.matchAll(/^\| (.+?) \| ((?:National|Liberal) Rank #[^|]+?) \|/gm)].map((m) => [
      m[1].trim(),
      m[2].trim(),
    ]),
  )
  const norm = (s) =>
    s
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/\band\b/g, '&')
      .replace(/[–—-]/g, ' ')
      .replace(/[().,]/g, ' ')
      .replace(/\buniversity\b/g, 'univ')
      .replace(/\bcollege\b/g, 'coll')
      .replace(/\bsaint\b/g, 'st')
      .replace(/\bthe\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  const mdByNorm = new Map([...mdRows].map(([n, l]) => [norm(n), l]))
  // Every master entry must appear in the .md with the same label.
  for (const [name, label] of Object.entries(COLLEGE_RANKINGS)) {
    const mdLabel = mdByNorm.get(norm(name))
    if (mdLabel && mdLabel !== label) {
      console.log(`  ✗ master/doc drift for "${name}": master="${label}" vs doc="${mdLabel}"`)
      drift++
    }
  }
} catch (e) {
  console.error(`check:ranks — could not run the master/doc sync check: ${e.message}`)
  process.exit(2)
}

if (missing || drift) {
  if (missing)
    console.log(
      `\ncheck:ranks — ${missing} ranked-bucket college(s) unresolved in the master.` +
        '\nAdd the college to src/data/collegeRankings.ts (and its source to the _shared .md), or fix its name spelling.',
    )
  if (drift)
    console.log(
      `\ncheck:ranks — ${drift} label(s) disagree between the master and the _shared .md.` +
        '\nThey are one source of truth in two forms; reconcile so they match.',
    )
  process.exit(1)
}
console.log(
  `check:ranks — every ranked-bucket college in all ${SCHOOLS.length} schools resolves in ` +
    'the master, and the master agrees with the _shared doc (single source)',
)
