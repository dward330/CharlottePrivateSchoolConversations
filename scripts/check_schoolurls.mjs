#!/usr/bin/env node
/**
 * check:schoolurls — each school's own homepage URL, behind the dossier header's
 * name and crest, must stay well-formed, unambiguous and attached to a real school.
 *
 * WHERE IT LIVES (2026-09-17): `homepageUrl` on each entry of `BRANDS` in
 * `src/data/brands.ts`, rendered by src/pages/SchoolDetail.tsx as the link on the
 * <h1> school name and on the mascot crest. It is in brands.ts and NOT in
 * schools.json because the ingest pipeline rebuilds every schools.json school
 * record as a bare `{slug, name}` from the source-material folder names, which
 * would erase a URL written there with no error and no failing check.
 *
 * ROOT URLS, WITH a trailing slash — the opposite convention from
 * check_college_urls.mjs, deliberately. These are homepage roots a parent lands on
 * ("https://www.providenceday.org/"), never deep links: an admissions or athletics
 * sub-page rots far faster than a front door does. So a path beyond "/" is a
 * finding here, where in the college master a trailing slash is the finding.
 *
 * DELIBERATELY NOT FETCHED. Liveness is NOT asserted, because a build gate that
 * makes twelve network calls fails on someone else's outage, on a captive portal,
 * and in CI without egress — and it would fail TODAY on a school that is perfectly
 * up: carmelchristian.org answers 503 to a bare curl and 200 to a browser UA
 * (`Vary: User-Agent` bot filtering). Live status is a DATED RECORD instead, in
 * source-material/branding/_shared/All Schools - Branding - Campus City and
 * Address.md, re-verified when a school is touched.
 *
 * DELIBERATELY NOT ASSERTED: coverage. `homepageUrl` is optional, like `logo` and
 * `welcomeVideoUrl`; a school without one renders its name as plain text rather
 * than a broken link. Failing on a gap would park this gate red the first time a
 * school's site is unreachable, which is the failure mode CLAUDE.md records three
 * times over (check:sepdrift, check:live-at-4,646, the identical-strings report) —
 * a checker nobody can get to zero stops being read. The count prints as an
 * informational line instead.
 *
 * COVERAGE: the school list is read from src/data/schools.json, never a hardcoded
 * array — the lesson check:ranks learned the hard way, where a literal 9-entry
 * array silently stopped covering the two schools added after it was written.
 *
 * Runs under plain Node (24+ type stripping): brands.ts is a plain typed module
 * with no import.meta.glob, so it imports cleanly here — unlike the six
 * *Program.ts card registries, which must be parsed from source.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = setup error.
 */

import { readFileSync } from 'node:fs'

// ---------------------------------------------------------------- load ------

let BRANDS
try {
  ;({ BRANDS } = await import('../src/data/brands.ts'))
} catch (e) {
  console.error(`check:schoolurls — cannot import src/data/brands.ts: ${e.message}`)
  process.exit(2)
}
if (!BRANDS || typeof BRANDS !== 'object') {
  console.error('check:schoolurls — BRANDS did not import as an object')
  process.exit(2)
}

let SLUGS
try {
  const manifest = JSON.parse(
    readFileSync(new URL('../src/data/schools.json', import.meta.url), 'utf8'),
  )
  const list = Array.isArray(manifest) ? manifest : manifest.schools
  SLUGS = new Set(list.map((s) => s.slug))
} catch (e) {
  console.error(`check:schoolurls — cannot read src/data/schools.json: ${e.message}`)
  process.exit(2)
}
if (SLUGS.size === 0) {
  console.error('check:schoolurls — schools.json listed no schools; the manifest moved or is empty')
  process.exit(2)
}

let bad = 0

// -------------------------------------------------------------- 1 · shape ---
// A malformed URL is worse than a missing one: a missing one renders as plain
// text, while a malformed one renders a live link that takes a parent nowhere.
for (const [slug, brand] of Object.entries(BRANDS)) {
  const url = brand?.homepageUrl
  if (url == null) continue
  const problems = []
  if (typeof url !== 'string' || url.trim() === '') {
    console.log(`  ✗ shape — ${slug}: homepageUrl is present but not a non-empty string`)
    bad++
    continue
  }
  if (!url.startsWith('https://')) problems.push('not https://')
  let u
  try {
    u = new URL(url)
  } catch {
    problems.push('does not parse as a URL')
  }
  if (u) {
    if (!u.hostname.includes('.')) problems.push('hostname has no dot')
    if (u.pathname !== '/') problems.push(`path beyond "/" (${u.pathname}) — root only`)
    if (u.search) problems.push(`query string (${u.search})`)
    if (u.hash) problems.push(`fragment (${u.hash})`)
  }
  if (problems.length) {
    console.log(`  ✗ shape — ${slug}: ${url} (${problems.join(', ')})`)
    bad++
  }
}

// ---------------------------------------------------------- 2 · duplicates --
// Each school appears exactly once here, keyed by slug, so two schools sharing a
// URL is always an error — a copy-paste that sends one school's readers to
// another school's front door, which renders perfectly and reads as correct.
const byUrl = new Map()
for (const [slug, brand] of Object.entries(BRANDS)) {
  const url = brand?.homepageUrl
  if (typeof url !== 'string' || !url) continue
  const key = url.replace(/\/$/, '').toLowerCase()
  const prior = byUrl.get(key)
  if (prior) {
    console.log(`  ✗ duplicate — ${prior} and ${slug} both point at ${url}`)
    bad++
  } else {
    byUrl.set(key, slug)
  }
}

// -------------------------------------------------------- 3 · unknown slug --
// A homepageUrl on a slug that is not a school in the manifest is dead weight
// that nothing renders, so nothing reveals it is stale — the same invisibility
// the college master's orphan check exists to catch. Typically a slug renamed in
// source-material while brands.ts kept the old spelling.
for (const [slug, brand] of Object.entries(BRANDS)) {
  if (brand?.homepageUrl && !SLUGS.has(slug)) {
    console.log(
      `  ✗ unknown slug — "${slug}" carries a homepageUrl but is not a school in schools.json`,
    )
    bad++
  }
}

// --------------------------------------------------------------- report -----

if (bad) {
  console.log(
    `\ncheck:schoolurls — ${bad} problem(s) in the homepageUrl entries of src/data/brands.ts.` +
      '\nEach must be an https:// homepage ROOT (no path, query or fragment), unique across' +
      '\nschools, and on a slug that exists in schools.json.',
  )
  process.exit(1)
}

// Informational only — see the DELIBERATELY NOT ASSERTED note at the top.
const linked = [...SLUGS].filter((s) => BRANDS[s]?.homepageUrl).length
console.log(
  `check:schoolurls — all ${byUrl.size} homepage URLs are well-formed roots, unique, ` +
    'and on known schools',
)
console.log(
  `  — linked ${linked}/${SLUGS.size} schools; ` +
    `${SLUGS.size - linked} render the name as plain text (no homepageUrl)`,
)
