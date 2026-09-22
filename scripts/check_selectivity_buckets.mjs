#!/usr/bin/env node
/**
 * check:buckets — the `nu75` / `lac75` filter chips on the "Where Graduates Go"
 * acceptance list must agree with the rank label printed beside the college.
 *
 * THE DEFECT THIS EXISTS FOR (measured 2026-08-25): `cats` is hand-typed per
 * college per school, so it drifted from `COLLEGE_RANKINGS` — the master table
 * that renders the label on the SAME ROW. Clicking "Top-75 National" showed
 * `University of Arizona` with `National Rank #127` printed next to it: the
 * filter and the label contradicting each other on one line. Across 11 schools
 * and 2,568 entries there were 27 over-inclusions and 155 under-inclusions.
 * Under-inclusion is the larger and far less visible half — a college that
 * renders its rank but VANISHES when the reader clicks its own filter.
 *
 * THE RULE: for every college in every school's acceptance list,
 *   cats.includes('nu75') === (label is National AND rank <= 75)
 *   cats.includes('lac75') === (label is Liberal  AND rank <= 75)
 * Inclusive at 75, and ties count — six colleges share `National Rank #59` and
 * all six qualify. The label is what the reader sees, so the label is the test.
 *
 * THE MASTER IS AUTHORITATIVE. If a bucket and a rank disagree, the `cats` array
 * is wrong; never "fix" it by editing a rank in `collegeRankings.ts`. That file
 * is the declared generated source of truth, checked against its human-readable
 * companion by check:ranks.
 *
 * THE ALIAS TRAP: resolve names with `rankLabelFor()` — NEVER by reading
 * `COLLEGE_RANKINGS` directly. The resolver applies an ALIAS map first, so
 * `Franklin & Marshall College` and `College of William & Mary` resolve only
 * through it. A planning pass that parsed the raw table reported six colleges as
 * unranked; all six were in fact ranked inside the top 75, i.e. the exact
 * opposite conclusion. Using the real resolver moved that count from 6 to 0.
 *
 * BAND LABELS NEVER QUALIFY. The master holds four label shapes: `National Rank
 * #N`, `Liberal Rank #N`, and the banded `National/Liberal Rank #N-N`. A band is
 * a range for unranked-tier schools (`#395-434`), always far outside 75, so it
 * does not qualify — and any label this checker cannot parse is treated as "does
 * not qualify" and printed, so an unexpected future shape surfaces loudly rather
 * than silently admitting or excluding colleges.
 *
 * DELIBERATELY UNCHECKED: `ivy`, `ivyplus`, `p4` and `hbcu`. Those are membership
 * facts about an athletic conference or an institution's history — not derivable
 * from a US News rank, so no rank-based rule can audit them. They carry the same
 * hand-typed drift risk with no master to check against; that is a known gap, not
 * an oversight.
 *
 * WHAT check:ranks DOES NOT DO: it verifies a ranked-bucket college HAS a rank,
 * never that the rank MATCHES the bucket. That gap is this defect, and it is why
 * 27 wrong tags shipped past a green build.
 *
 * Runs under plain Node (24+ type stripping): the data modules and the master use
 * type-only imports, so they import cleanly here.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = setup error.
 */

import { readdirSync } from 'node:fs'

/** Buckets this checker owns. Everything else in `cats` is left alone. */
const BUCKETS = ['nu75', 'lac75']
const KIND = { nu75: 'National', lac75: 'Liberal' }
const CUTOFF = 75

/** Locale overlay copies carry translated prose, not `cats`; skip them. */
const LOCALE_RE = /\.(es|bn|ht|te|fr|fa|it|hi|ar)\.ts$/

const DIR = new URL('../src/data/collegeSupportPrograms/', import.meta.url)

let rankLabelFor
try {
  ;({ rankLabelFor } = await import('../src/data/collegeRankings.ts'))
} catch (e) {
  console.error(`check:buckets — cannot import the master collegeRankings.ts: ${e.message}`)
  process.exit(2)
}

let canonicalRanked
try {
  ;({ canonicalRanked } = await import('../src/data/collegeMemberships.ts'))
} catch (e) {
  console.error(`check:buckets — cannot import collegeMemberships.ts: ${e.message}`)
  process.exit(2)
}

let files
try {
  files = readdirSync(DIR)
    .filter((f) => f.endsWith('.ts') && !LOCALE_RE.test(f))
    .sort()
} catch (e) {
  console.error(`check:buckets — cannot read collegeSupportPrograms/: ${e.message}`)
  process.exit(2)
}
if (files.length === 0) {
  console.error('check:buckets — no school files found; the data directory moved or is empty')
  process.exit(2)
}

/**
 * Does `label` put this college inside `bucket`?
 * A band (`#N-N`) or an unparseable label is "no" — and the caller prints it.
 */
function qualifies(label, bucket) {
  if (!label) return false
  const m = /^(National|Liberal) Rank #(\d+)$/.exec(label.trim())
  if (!m) return false
  return m[1] === KIND[bucket] && Number(m[2]) <= CUTOFF
}

/** Labels that parse as neither a single rank nor a band — printed as a notice. */
const unparseable = new Map()
const over = []
const under = []
const counts = []
/** slug -> { nu75, lac75 } distinct-institution tallies. */
const institutions = {}
let entries = 0

for (const file of files) {
  const slug = file.replace(/\.ts$/, '')
  let mod
  try {
    mod = await import(new URL(file, DIR).href)
  } catch (e) {
    console.error(`check:buckets — cannot import ${slug}: ${e.message}`)
    process.exit(2)
  }
  const program = Object.values(mod)[0]
  const colleges = program?.outcomes?.colleges ?? []
  const distinct = { nu75: new Set(), lac75: new Set() }
  for (const c of colleges) {
    entries++
    const label = rankLabelFor(c.name)
    // Tally DISTINCT INSTITUTIONS, not tagged rows: one institution written two
    // ways ("SUNY Buffalo" / "SUNY University at Buffalo") must count once.
    const key = canonicalRanked(c.name)
    if (key) {
      for (const bucket of BUCKETS) if (qualifies(label, bucket)) distinct[bucket].add(key)
    }
    if (label && !/^(National|Liberal) Rank #\d+(-\d+)?$/.test(label.trim()))
      unparseable.set(label, (unparseable.get(label) ?? 0) + 1)
    const cats = c.cats ?? []
    for (const bucket of BUCKETS) {
      const tagged = cats.includes(bucket)
      const ok = qualifies(label, bucket)
      if (tagged && !ok) over.push({ slug, name: c.name, bucket, label })
      else if (!tagged && ok) under.push({ slug, name: c.name, bucket, label })
    }
  }

  institutions[slug] = { nu75: distinct.nu75.size, lac75: distinct.lac75.size }

  // Surfaces 1 and 2: the `buckets` row and any stat tile on the school page.
  // Ties make the band hold more than 75 institutions, so a saturated school
  // clamps at the published denominator rather than printing "77 / 75".
  const want = (b) => Math.min(institutions[slug][b], CUTOFF)
  const bucketOf = (label) =>
    /Top-?75 National/i.test(label) ? 'nu75' : /Top-?75 Liberal/i.test(label) ? 'lac75' : null
  for (const b of program?.outcomes?.buckets ?? []) {
    const bucket = bucketOf(String(b.tier ?? ''))
    if (!bucket) continue
    const m = /^(\d+)\s*\/\s*75$/.exec(String(b.count ?? '').trim())
    if (!m) continue
    if (Number(m[1]) !== want(bucket))
      counts.push({ slug, tier: b.tier, got: Number(m[1]), want: want(bucket), where: 'buckets row' })
  }
  for (const t of program?.outcomes?.stats ?? []) {
    const bucket = bucketOf(String(t.label ?? ''))
    if (!bucket) continue
    const m = /^(\d+)\s*(?:\/|of)\s*75$/.exec(String(t.value ?? '').trim())
    if (!m) continue
    if (Number(m[1]) !== want(bucket))
      counts.push({ slug, tier: t.label, got: Number(m[1]), want: want(bucket), where: 'stat tile' })
  }
}

// Surface 3: the Compare table's own copy of the same two figures, plus the
// qual sentences that spell the number out in prose.
try {
  const { VALUE_METRICS } = await import('../src/data/metricValues.ts')
  if (!Array.isArray(VALUE_METRICS) || VALUE_METRICS.length === 0) {
    console.error(
      'check:buckets — VALUE_METRICS is empty or not an array; the Compare-table pass\n' +
        'would silently verify nothing. Fix the import rather than ignoring this.',
    )
    process.exit(2)
  }
  const KEYED = { 'bucket-nu75': 'nu75', 'bucket-lac75': 'lac75' }
  for (const row of VALUE_METRICS) {
    const bucket = KEYED[row?.key]
    if (!bucket) continue
    for (const [slug, raw] of Object.entries(row?.values ?? {})) {
      if (institutions[slug] === undefined) continue
      const want = Math.min(institutions[slug][bucket], CUTOFF)
      const m = /^(\d+)\s*\/\s*75$/.exec(String(raw).trim())
      if (m && Number(m[1]) !== want)
        counts.push({ slug, tier: row.label ?? row.key, got: Number(m[1]), want, where: 'metricValues.ts' })
    }
    // The qual prose repeats the figure in words ("58 of the top 75 ..."), and
    // a number in prose drifts exactly as easily as one in a cell.
    for (const [slug, q] of Object.entries(row?.quals ?? {})) {
      if (institutions[slug] === undefined) continue
      const want = Math.min(institutions[slug][bucket], CUTOFF)
      const m = /(\d+) of the top 75/.exec(String(q?.text ?? ''))
      if (m && Number(m[1]) !== want)
        counts.push({ slug, tier: `${row.label ?? row.key} (qual prose)`, got: Number(m[1]), want, where: 'metricValues.ts' })
    }
  }
} catch (e) {
  console.error(`check:buckets — cannot import metricValues.ts: ${e.message}`)
  process.exit(2)
}

const line = (v) =>
  `  ✗ ${v.slug} · ${v.name} · ${v.label ?? 'no rank in the master'} · ${v.bucket}: ` +
  `expected ${v.bucket === 'nu75' ? 'National' : 'Liberal'} rank ≤${CUTOFF}`

if (over.length) {
  console.log(
    `OVER-INCLUSION — tagged into a bucket its rank does not qualify for (${over.length}):`,
  )
  for (const v of over) console.log(line(v))
  console.log('')
}
if (under.length) {
  console.log(
    `UNDER-INCLUSION — qualifies by rank but is not tagged, so it vanishes ` +
      `behind its own filter (${under.length}):`,
  )
  for (const v of under) console.log(line(v))
  console.log('')
}
if (unparseable.size) {
  console.log('NOTICE — rank labels in an unrecognised shape (treated as "does not qualify"):')
  for (const [label, n] of unparseable) console.log(`  · ${label} (${n}×)`)
  console.log('')
}

if (counts.length) {
  console.log(`STALE PRINTED COUNT — the rendered figure disagrees with the ranks (${counts.length}):`)
  for (const c of counts)
    console.log(
      `  ✗ ${c.slug} · ${c.where} "${c.tier}" reads ${c.got} / 75 but ` +
        `${c.want} distinct institution(s) qualify`,
    )
  console.log(
    '\n  These are DERIVED figures: they move whenever the US News edition changes.\n' +
      '  Counted as institutions, not tagged rows — one institution written two ways\n' +
      '  counts once — and clamped at 75, because ties put more than 75 schools in\n' +
      '  the band. Recompute rather than hand-editing.\n',
  )
}

if (over.length || under.length || counts.length) {
  console.log(
    `check:buckets — ${over.length + under.length + counts.length} disagreement(s) across ` +
      `${entries} colleges in ${files.length} schools.\n` +
      'The master collegeRankings.ts is authoritative: fix the `cats` array in\n' +
      'src/data/collegeSupportPrograms/<slug>.ts, never a rank in the master.',
  )
  process.exit(1)
}
console.log(
  `check:buckets — nu75/lac75 agree with the master rank label for all ${entries} colleges ` +
    `in ${files.length} schools`,
)
