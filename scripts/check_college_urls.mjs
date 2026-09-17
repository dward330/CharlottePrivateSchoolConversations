#!/usr/bin/env node
/**
 * check:collegeurls — the master college-homepage table must stay well-formed,
 * unambiguous, free of dead rows, and in lockstep with its sourced companion.
 *
 * SINGLE SOURCE (2026-09-16): every college name rendered on a school's "Where
 * Graduates Go" acceptance list resolves its homepage link from the master
 * `COLLEGE_URLS` table in `src/data/collegeUrls.ts` via `urlFor(name)`, so one
 * institution has exactly one URL everywhere and cross-school conflicts are
 * impossible by construction. The per-school lists store no urls. The
 * human-readable companion (with a verification per URL) is
 * source-material/college-support/_shared/College Homepages 2026.md; add a new
 * college to BOTH (one row each), never re-type a URL.
 *
 * DELIBERATELY NOT ASSERTED: coverage. A college with no resolvable homepage —
 * defunct, ambiguous, non-degree — is a legitimate confirmed-null and is simply
 * absent from the master, rendering as plain text. Failing the build on those
 * would park this gate permanently red, which is the failure mode CLAUDE.md
 * records three times over (check:sepdrift, check:live-at-4,646, the
 * identical-strings report); a checker nobody can ever get to zero stops being
 * read. The linked/unlinked counts print as an informational line instead.
 *
 * COVERAGE: the school list is read from the directory, not hardcoded — the
 * same lesson check:ranks learned the hard way, where a literal 9-entry array
 * silently stopped covering the two schools added after it was written. Never
 * reintroduce a hardcoded school list here.
 *
 * Runs under plain Node (24+ type stripping): the data modules and the master
 * use type-only imports, so they import cleanly here.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = setup error.
 */

import { readdirSync, readFileSync } from 'node:fs'

const LOCALE_RE = /\.(es|bn|ht|te|fr|fa|it|hi|ar)\.ts$/
const DIR = new URL('../src/data/collegeSupportPrograms/', import.meta.url)

// ---------------------------------------------------------------- load ------

let COLLEGE_URLS, normName
try {
  ;({ COLLEGE_URLS } = await import('../src/data/collegeUrls.ts'))
  ;({ normName } = await import('../src/data/collegeRankings.ts'))
} catch (e) {
  console.error(`check:collegeurls — cannot import the master collegeUrls.ts: ${e.message}`)
  process.exit(2)
}

let SCHOOLS
try {
  SCHOOLS = readdirSync(DIR)
    .filter((f) => f.endsWith('.ts') && !LOCALE_RE.test(f))
    .sort()
    .map((f) => [f.replace(/\.ts$/, ''), () => import(new URL(f, DIR).href)])
} catch (e) {
  console.error(`check:collegeurls — cannot read collegeSupportPrograms/: ${e.message}`)
  process.exit(2)
}
if (SCHOOLS.length === 0) {
  console.error(
    'check:collegeurls — no school files found; the data directory moved or is empty',
  )
  process.exit(2)
}

// Every distinct institution name any school actually renders, across BOTH
// surfaces that resolve a link from this master:
//   1. outcomes.colleges[]        — the "Where Graduates Go" acceptance list
//   2. ncAdmissions.universities[] — the Top-6 NC publics card
// Both must be collected, because "in use" drives the orphan assertion below.
// The two surfaces use DIFFERENT vocabularies for the same institution — the
// acceptance lists spell it out ("University of North Carolina at Chapel Hill")
// while the NC card carries the UNC dashboard's own short form
// ("UNC-Chapel Hill") — so a name reached only by the card is legitimately in
// use and must not read as an orphan.
const rendered = new Set()
for (const [slug, load] of SCHOOLS) {
  let mod
  try {
    mod = await load()
  } catch (e) {
    console.error(`check:collegeurls — cannot import ${slug}: ${e.message}`)
    process.exit(2)
  }
  const program = Object.values(mod)[0]
  for (const c of program?.outcomes?.colleges ?? []) rendered.add(c.name)
  for (const u of program?.ncAdmissions?.universities ?? []) rendered.add(u.name)
}

let bad = 0

// -------------------------------------------------------------- 1 · shape ---
// A malformed URL is worse than a missing one: it renders a live link that
// takes a parent nowhere, or to the wrong scheme.
for (const [name, url] of Object.entries(COLLEGE_URLS)) {
  const problems = []
  if (!url.startsWith('https://')) problems.push('not https://')
  if (url.endsWith('/')) problems.push('trailing slash')
  try {
    const u = new URL(url)
    if (!u.hostname.includes('.')) problems.push('hostname has no dot')
  } catch {
    problems.push('does not parse as a URL')
  }
  if (problems.length) {
    console.log(`  ✗ shape — "${name}": ${url} (${problems.join(', ')})`)
    bad++
  }
}

// ------------------------------------------------- 2 · norm collisions ------
// This file's keys come straight from the school lists, so two spellings of the
// same institution can both be keys — and if they normalize identically, one
// silently shadows the other in the BY_NORM map. Harmless when both point at the
// same URL; a wrong-institution link when they do not.
const byNorm = new Map()
for (const [name, url] of Object.entries(COLLEGE_URLS)) {
  const k = normName(name)
  const prior = byNorm.get(k)
  if (prior && prior.url !== url) {
    console.log(
      `  ✗ collision — "${prior.name}" and "${name}" both normalize to "${k}" ` +
        `but hold different URLs (${prior.url} vs ${url}); one shadows the other`,
    )
    bad++
  } else if (!prior) {
    byNorm.set(k, { name, url })
  }
}

// ------------------------------------------------------- 3 · orphan rows ----
// A row for a college no school lists any more is dead weight that outlives a
// rename, and it is invisible: nothing renders it, so nothing reveals it is stale.
const renderedNorms = new Set([...rendered].map(normName))
for (const name of Object.keys(COLLEGE_URLS)) {
  if (!renderedNorms.has(normName(name))) {
    console.log(
      `  ✗ orphan — "${name}" is in the master but no school's acceptance list names it`,
    )
    bad++
  }
}

// ------------------------------------------------------- 4 · doc sync -------
// The master TS table and the human-readable .md companion must agree, so the
// sourced doc can never silently drift from what actually renders.
let drift = 0
try {
  const mdPath = new URL(
    '../source-material/college-support/_shared/College Homepages 2026.md',
    import.meta.url,
  )
  const md = readFileSync(mdPath, 'utf8')
  // Rows are `| <name> | <url or —> | <verification> |`.
  const mdByNorm = new Map(
    [...md.matchAll(/^\| (.+?) \| (https:\/\/[^\s|]+) \|/gm)].map((m) => [
      normName(m[1].trim()),
      m[2].trim(),
    ]),
  )
  for (const [name, url] of Object.entries(COLLEGE_URLS)) {
    const mdUrl = mdByNorm.get(normName(name))
    if (!mdUrl) {
      console.log(`  ✗ doc — "${name}" is in the master but has no row in the _shared .md`)
      drift++
    } else if (mdUrl !== url) {
      console.log(`  ✗ doc drift — "${name}": master="${url}" vs doc="${mdUrl}"`)
      drift++
    }
  }
} catch (e) {
  console.error(`check:collegeurls — could not run the master/doc sync check: ${e.message}`)
  process.exit(2)
}

// --------------------------------------------------------------- report -----

if (bad || drift) {
  if (bad)
    console.log(
      `\ncheck:collegeurls — ${bad} problem(s) in the master src/data/collegeUrls.ts.`,
    )
  if (drift)
    console.log(
      `\ncheck:collegeurls — ${drift} row(s) disagree between the master and the _shared .md.` +
        '\nThey are one source of truth in two forms; reconcile so they match.',
    )
  process.exit(1)
}

// Informational only — see the DELIBERATELY NOT ASSERTED note at the top.
const linked = [...rendered].filter((n) => byNorm.has(normName(n))).length
console.log(
  `check:collegeurls — ${Object.keys(COLLEGE_URLS).length} master rows, all well-formed, ` +
    `collision-free, in use and matching the _shared doc across all ${SCHOOLS.length} schools`,
)
console.log(
  `  — ${linked} of ${rendered.size} distinct college names link; ` +
    `${rendered.size - linked} render as plain text (confirmed unlinkable)`,
)
