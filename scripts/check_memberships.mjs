#!/usr/bin/env node
/**
 * check:memberships — the `p4` and `hbcu` bucket tags on the "Where Graduates
 * Go" acceptance lists must agree with the master membership table.
 *
 * THE SHAPE OF THE DEFECT. `cats` is hand-typed per college per school, and
 * hand-typing drifts. check:buckets closed this for `nu75`/`lac75` by checking
 * them against the master rank table; `p4` and `hbcu` had the same risk with no
 * master to check against. Measured 2026-08-25, before src/data/collegeMemberships.ts
 * existed: 10 colleges carried `p4` in some schools and not others, and
 * `North Carolina A & T State University` carried `hbcu` in two of the three
 * schools listing it. The signature is always the same — one school right, the
 * rest wrong.
 *
 * THE RULE: for every college in every school's acceptance list,
 *   cats.includes('p4')   === isPowerFour(name)
 *   cats.includes('hbcu') === isHbcu(name)
 *
 * WHY THIS IS NOT A RANK CHECK. Unlike nu75/lac75, membership is not derivable
 * from a US News rank — it is a fixed, enumerable census, so the master is a
 * literal roster rather than a threshold. Both rosters are sourced in
 * source-material/college-support/_shared/ (Power Four - Conference Membership
 * 2026.md, HBCU - Membership and Count 2026.md).
 *
 * THE LESSON THAT BUILT THE ROSTER — read before "fixing" a violation. When this
 * check was first run, it reported 12 hbcu over-inclusions. Every one was a
 * genuine HBCU (Norfolk State, Benedict, Claflin, Voorhees, Saint Augustine's,
 * Tougaloo) that the roster simply lacked, because the roster was copied from a
 * source file enumerating the lists AS OF 2026-08-02 and the lists had grown.
 * The TAGS were right and the TABLE was wrong. A violation here is a question,
 * not a verdict: confirm which side is actually wrong before editing either.
 *
 * NAME RESOLUTION. Eleven schools transcribe these lists from eleven different
 * publications, so one institution arrives spelled a dozen ways. Resolution goes
 * through `isPowerFour`/`isHbcu`, which apply the shared `normName`, then an
 * ALIAS map, then strip a trailing campus qualifier — but ONLY when the shorter
 * name is itself a member, so `University of South Carolina (Lancaster)`, a
 * distinct two-year campus, is never collapsed into its flagship. Never
 * substring-match: "Tennessee State University" is an HBCU while "East Tennessee
 * State University" is not.
 *
 * IT ALSO GATES THE PRINTED COUNTS. The "Power Four n / 68" and "HBCUs n / 107"
 * rows (and any stat tile carrying the same figure) are DERIVED from the tags,
 * so adding a tag silently falsifies them. Adding the 54 missing tags in the
 * change that created this file left 8 of 11 Power Four counts understated —
 * Providence Day read "57 / 68" with 65 member institutions on its list.
 *
 * The counts are INSTITUTIONS, not tagged rows. The lists name one institution
 * several ways ("Arizona State University (Tempe)" and "(Downtown Phoenix)"), so
 * counting rows double-counts; `canonicalMember()` collapses them. Charlotte
 * Catholic's note — "40 rows carry the tag; the two Arizona State campuses are
 * one institution" — is exactly this distinction, and its 39 is correct.
 *
 * THE COUNTS LIVE IN TWO PLACES. Besides each school's bucket row and stat tile,
 * `src/data/metricValues.ts` carries its own copy for the Compare table. They are
 * the same figure on two surfaces and MUST move together. The browser found this
 * — after the bucket rows were corrected, Providence Day's page rendered both
 * `65 / 68` (card) and `57 / 68` (Compare) at once. Every automated check passed;
 * only opening the page showed it. This gate now covers both.
 *
 * DELIBERATELY UNCHECKED: `ivy` and `ivyplus`. `ivy` is self-evidently correct
 * (exactly the right 8 institutions, verified 2026-08-25) and `ivyplus` has no
 * settled definition to check against — it is an editorial grouping, not a
 * membership fact. nu75/lac75 belong to check:buckets.
 *
 * Runs under plain Node (24+ type stripping). Exit codes: 0 = clean,
 * 1 = violations found, 2 = setup error.
 */

import { readdirSync } from 'node:fs'

const LOCALE_RE = /\.(es|bn|ht|te|fr|fa|it|hi|ar)\.ts$/
const DIR = new URL('../src/data/collegeSupportPrograms/', import.meta.url)

let isPowerFour, isHbcu, powerFourConference, canonicalMember
try {
  ;({ isPowerFour, isHbcu, powerFourConference, canonicalMember } = await import(
    '../src/data/collegeMemberships.ts'
  ))
} catch (e) {
  console.error(`check:memberships — cannot import the master collegeMemberships.ts: ${e.message}`)
  process.exit(2)
}

/** bucket key -> [predicate, human label for the report] */
const BUCKETS = {
  p4: [(n) => isPowerFour(n), 'a Power Four member'],
  hbcu: [(n) => isHbcu(n), 'a designated HBCU'],
}

let files
try {
  files = readdirSync(DIR)
    .filter((f) => f.endsWith('.ts') && !LOCALE_RE.test(f))
    .sort()
} catch (e) {
  console.error(`check:memberships — cannot read collegeSupportPrograms/: ${e.message}`)
  process.exit(2)
}
if (files.length === 0) {
  console.error('check:memberships — no school files found; the data directory moved or is empty')
  process.exit(2)
}

const over = []
const under = []
const counts = []
const institutions = {}
let entries = 0

for (const file of files) {
  const slug = file.replace(/\.ts$/, '')
  let mod
  try {
    mod = await import(new URL(file, DIR).href)
  } catch (e) {
    console.error(`check:memberships — cannot import ${slug}: ${e.message}`)
    process.exit(2)
  }
  const program = Object.values(mod)[0]
  const colleges = program?.outcomes?.colleges ?? []
  const distinct = { p4: new Set(), hbcu: new Set() }
  for (const c of colleges) {
    entries++
    const key = canonicalMember(c.name)
    if (key && isPowerFour(c.name)) distinct.p4.add(key)
    if (key && isHbcu(c.name)) distinct.hbcu.add(key)
    const cats = c.cats ?? []
    for (const [bucket, [isMember]] of Object.entries(BUCKETS)) {
      const tagged = cats.includes(bucket)
      const member = isMember(c.name)
      if (tagged && !member) over.push({ slug, name: c.name, bucket })
      else if (!tagged && member) under.push({ slug, name: c.name, bucket })
    }
  }

  institutions[slug] = { p4: distinct.p4.size, hbcu: distinct.hbcu.size }

  // The printed "n / 68" and "n / 107" figures must equal the institution counts.
  for (const b of program?.outcomes?.buckets ?? []) {
    const m = /^(\d+)\s*\/\s*(68|107)$/.exec(String(b.count ?? '').trim())
    if (!m) continue
    const bucket = m[2] === '68' ? 'p4' : 'hbcu'
    const want = distinct[bucket].size
    if (Number(m[1]) !== want)
      counts.push({ slug, tier: b.tier, got: Number(m[1]), want, denom: m[2], where: 'buckets row' })
  }
  for (const t of program?.outcomes?.stats ?? program?.stats ?? []) {
    const m = /^(\d+)\s*(?:\/|of)\s*(68|107)$/.exec(String(t.value ?? '').trim())
    if (!m) continue
    const bucket = m[2] === '68' ? 'p4' : 'hbcu'
    const want = distinct[bucket].size
    if (Number(m[1]) !== want)
      counts.push({ slug, tier: t.label, got: Number(m[1]), want, denom: m[2], where: 'stat tile' })
  }
}

// Second surface: the Compare table's own copy of the same figures.
try {
  const { VALUE_METRICS } = await import('../src/data/metricValues.ts')
  if (!Array.isArray(VALUE_METRICS) || VALUE_METRICS.length === 0) {
    console.error(
      'check:memberships — VALUE_METRICS is empty or not an array; the Compare-table ' +
        'pass would silently verify nothing. Fix the import rather than ignoring this.',
    )
    process.exit(2)
  }
  const rows = VALUE_METRICS
  for (const row of rows) {
    for (const [slug, raw] of Object.entries(row?.values ?? {})) {
      const m = /^(\d+)\s*\/\s*(68|107)$/.exec(String(raw).trim())
      if (!m) continue
      const want = institutions[slug]?.[m[2] === '68' ? 'p4' : 'hbcu']
      if (want === undefined) continue
      if (Number(m[1]) !== want)
        counts.push({ slug, tier: row.label ?? row.key ?? 'Compare row', got: Number(m[1]), want,
          denom: m[2], where: 'metricValues.ts' })
    }
  }
} catch (e) {
  console.error(`check:memberships — cannot import metricValues.ts: ${e.message}`)
  process.exit(2)
}

const detail = (v) =>
  v.bucket === 'p4' ? powerFourConference(v.name) ?? 'not in the roster' : 'HBCU roster'

if (over.length) {
  console.log(`OVER-INCLUSION — tagged but NOT in the master roster (${over.length}):`)
  for (const v of over)
    console.log(`  ✗ ${v.slug} · ${v.name} · tagged '${v.bucket}' but is not ${BUCKETS[v.bucket][1]}`)
  console.log(
    '\n  Before removing any of these: confirm the college is genuinely not a member.\n' +
      '  The first run of this check reported 12 such "violations" and ALL of them were\n' +
      '  real HBCUs missing from the roster — the tags were right and the table was wrong.\n',
  )
}
if (under.length) {
  console.log(
    `UNDER-INCLUSION — in the master roster but not tagged, so it vanishes ` +
      `behind its own filter (${under.length}):`,
  )
  for (const v of under)
    console.log(`  ✗ ${v.slug} · ${v.name} · is ${BUCKETS[v.bucket][1]} (${detail(v)}) but lacks '${v.bucket}'`)
  console.log('')
}

if (counts.length) {
  console.log(`STALE PRINTED COUNT — the rendered figure disagrees with the tags (${counts.length}):`)
  for (const c of counts)
    console.log(
      `  ✗ ${c.slug} · ${c.where} "${c.tier}" reads ${c.got} / ${c.denom} but ` +
        `${c.want} distinct institution(s) are on the list`,
    )
  console.log(
    '\n  These are DERIVED figures: adding a tag changes them. Counted as institutions,\n' +
      '  not tagged rows — one institution written two ways counts once.\n',
  )
}

if (over.length || under.length || counts.length) {
  console.log(
    `check:memberships — ${over.length + under.length + counts.length} disagreement(s) across ` +
      `${entries} colleges in ${files.length} schools.\n` +
      'Fix whichever side is actually wrong: the `cats` array in\n' +
      'src/data/collegeSupportPrograms/<slug>.ts, or the roster in\n' +
      'src/data/collegeMemberships.ts (and its source .md in _shared/).',
  )
  process.exit(1)
}
console.log(
  `check:memberships — p4/hbcu agree with the master roster, and every printed ` +
    `n/68 and n/107 count matches its institution total, for all ${entries} colleges ` +
    `in ${files.length} schools`,
)
