#!/usr/bin/env node
/**
 * check:travelrows — the five Global Exposure Compare rows must agree with the
 * trip ledgers they summarise.
 *
 * WHY THIS EXISTS. Compare → Global Exposure carries five Key-stats rows
 * (`travel-*`, plan `globalcompare`, 2026-10-26), every cell a count or a
 * reading over one school's trip ledger in
 * src/data/internationalTravel/<slug>.ts. VALUE_METRICS is hand-maintained, so
 * the moment a trip, homestay or credential is added to a ledger the Compare
 * cells go stale — silently, because nothing else reads both. This check
 * re-derives every cell from the ledger on every build. The counting helpers
 * live ONLY here: the rows' figures are typed into metricValues.ts and this is
 * what keeps them honest.
 *
 * COUNTING RULES (identical to the rows' notes). A `dest` splits on `,` and
 * `&` into pieces; England, Scotland and the United Kingdom fold into ONE
 * country; a DOMESTIC destination (Latin's 2025–26 New Mexico) is not a trip
 * abroad and is excluded from rows 2, 3 and 5. Any piece in neither KNOWN nor
 * DOMESTIC fails — that is the guard that would have caught New Mexico being
 * counted as a country.
 *
 * Asserts:
 *   - exactly five `international-travel` rows, keys in plan order, contiguous
 *     and LAST in VALUE_METRICS (an insert elsewhere shifts every overlay `[N]`
 *     path after it), all `compareOnly: true`;
 *   - every row lists the same school keys, including every school with a
 *     program, and a school with no program is null in all five rows;
 *   - travel-trips: the label contains TRAVEL_YEAR; value = that year's trip
 *     count and sub = "<u> Upper School · <m> Middle School" (a zero side
 *     omitted), or null with no sub when the ledger has no such year;
 *   - travel-youngest-division: the youngest division over trips abroad (the
 *     grade sub-line is hand-written from the school's wording, not derived);
 *   - travel-homestays: "<homestays> / <trips>" over trips abroad, and the
 *     window sub-line;
 *   - travel-credential: non-null iff the program has a `credential`;
 *   - travel-countries: the distinct-country count, and the window sub-line;
 *   - every non-null cell carries a `quals` tooltip.
 *
 * ROLLOVER. When 2027–28 trips are published, bump TRAVEL_YEAR and the
 * travel-trips label together; this check fails until both move.
 *
 * Run: npm run check:travelrows  (chained into `npm run build`).
 * TRAVEL_DIR=<dir> points it at a copy of the ledgers, for negative tests.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIR = process.env.TRAVEL_DIR || 'src/data/internationalTravel'
const TRAVEL_YEAR = '2026–27'
const KEYS = [
  'travel-trips',
  'travel-youngest-division',
  'travel-homestays',
  'travel-credential',
  'travel-countries',
]
const DOMESTIC = new Set(['New Mexico'])
const UK = new Set(['England', 'Scotland', 'United Kingdom'])
// Every destination piece on today's ledgers. A new one must be classified
// here (or in DOMESTIC) before it can be counted.
const KNOWN = new Set([
  'Argentina', 'Austria', 'Belgium', 'Belize', 'Brazil', 'Canada', 'China',
  'Colombia', 'Costa Rica', 'Cuba', 'Denmark', 'Dominican Republic', 'Ecuador',
  'England', 'France', 'Germany', 'Greece', 'Iceland', 'Ireland', 'Italy',
  'Japan', 'Kenya', 'Mexico', 'Morocco', 'New Zealand', 'Oman', 'Panama',
  'Peru', 'Poland', 'Portugal', 'Rwanda', 'Scotland', 'South Africa',
  'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
  'the Netherlands', 'United Arab Emirates', 'United Kingdom',
])
const DIV_ORDER = ['LS', 'MS', 'US']
const DIV_NAME = { LS: 'Lower School', MS: 'Middle School', US: 'Upper School' }

const { VALUE_METRICS } = await import(path.resolve('src/data/metricValues.ts'))

const findings = []
const programs = {}
for (const file of fs.readdirSync(DIR).sort()) {
  if (!/^[a-z-]+\.ts$/.test(file)) continue
  const mod = await import(path.resolve(DIR, file))
  programs[file.replace(/\.ts$/, '')] = Object.values(mod)[0]
}
const slugs = Object.keys(programs)
if (slugs.length === 0) {
  console.error(`check:travelrows — no programs found in ${DIR}; the import is broken`)
  process.exit(1)
}

const pieces = (dest) => dest.split(/,\s*|\s*&\s*/).map((p) => p.trim()).filter(Boolean)
const isDomestic = (trip) => pieces(trip.dest).every((p) => DOMESTIC.has(p))

for (const s of slugs) {
  for (const y of programs[s].trips?.years ?? []) {
    for (const t of y.trips) {
      for (const p of pieces(t.dest)) {
        if (!KNOWN.has(p) && !DOMESTIC.has(p)) {
          findings.push(`${s} ${y.year}: classify "${p}" as a country (KNOWN) or domestic (DOMESTIC)`)
        }
      }
    }
  }
}

/** The derived cells for one program. */
function derive(p) {
  const years = p.trips?.years ?? []
  const abroad = years.flatMap((y) => y.trips).filter((t) => !isDomestic(t))

  // "2022–23" → start 2022; "2026–27" → end "27".
  const starts = years.map((y) => Number(y.year.slice(0, 4)))
  const first = Math.min(...starts)
  const newest = years.find((y) => Number(y.year.slice(0, 4)) === Math.max(...starts))
  const n = years.length
  const window = n ? `${n} school year${n === 1 ? '' : 's'}, ${first}–${newest.year.slice(-2)}` : null

  const cur = years.find((y) => y.year === TRAVEL_YEAR)
  let trips = null
  let tripsSub
  if (cur) {
    trips = String(cur.trips.length)
    tripsSub = [...DIV_ORDER].reverse()
      .map((d) => [d, cur.trips.filter((t) => t.div === d).length])
      .filter(([, c]) => c > 0)
      .map(([d, c]) => `${c} ${DIV_NAME[d]}`)
      .join(' · ')
  }

  const youngest = DIV_ORDER.find((d) => abroad.some((t) => t.div === d))
  const homestays = abroad.filter((t) => t.homestay).length
  const countries = new Set(
    abroad.flatMap((t) => pieces(t.dest)).filter((x) => !DOMESTIC.has(x)).map((x) => (UK.has(x) ? 'United Kingdom' : x)),
  )
  return {
    'travel-trips': { value: trips, sub: tripsSub },
    'travel-youngest-division': { value: youngest ? DIV_NAME[youngest] : null },
    'travel-homestays': { value: abroad.length ? `${homestays} / ${abroad.length}` : null, sub: window },
    'travel-credential': { present: Boolean(p.credential) },
    'travel-countries': { value: countries.size ? String(countries.size) : null, sub: window },
  }
}

// Placement: five contiguous rows, in plan order, last in the array.
const idx = VALUE_METRICS.map((r, i) => (r.topic === 'international-travel' ? i : -1)).filter((i) => i >= 0)
if (idx.length !== KEYS.length) {
  findings.push(`expected ${KEYS.length} international-travel rows, found ${idx.length}`)
} else {
  if (idx.some((v, i) => v !== idx[0] + i)) findings.push(`travel rows are not contiguous (indices ${idx.join(', ')})`)
  if (idx[idx.length - 1] !== VALUE_METRICS.length - 1) {
    findings.push(`travel rows must be LAST in VALUE_METRICS (last at ${idx[idx.length - 1]}, array ends at ${VALUE_METRICS.length - 1}) — an insert elsewhere shifts overlay paths`)
  }
  const got = idx.map((i) => VALUE_METRICS[i].key).join(', ')
  if (got !== KEYS.join(', ')) findings.push(`travel row keys/order: ${got} ≠ ${KEYS.join(', ')}`)
}

const derived = Object.fromEntries(slugs.map((s) => [s, derive(programs[s])]))
const schoolKeys = idx.length ? Object.keys(VALUE_METRICS[idx[0]].values).sort().join(',') : ''

for (const rowIdx of idx) {
  const row = VALUE_METRICS[rowIdx]
  const tag = `[${rowIdx}] ${row.key}`
  if (row.compareOnly !== true) findings.push(`${tag}: missing compareOnly: true`)
  if (Object.keys(row.values).sort().join(',') !== schoolKeys) findings.push(`${tag}: school keys differ from ${VALUE_METRICS[idx[0]].key}`)
  if (row.key === 'travel-trips' && !row.label.includes(TRAVEL_YEAR)) {
    findings.push(`${tag}: label "${row.label}" must contain TRAVEL_YEAR ${TRAVEL_YEAR}`)
  }

  for (const s of slugs) {
    if (!(s in row.values)) findings.push(`${tag} ${s}: school has a program but no key in values`)
  }
  for (const [s, v] of Object.entries(row.values)) {
    const d = derived[s]?.[row.key]
    const sub = row.subs?.[s]
    if (v != null && !row.quals?.[s]) findings.push(`${tag} ${s}: non-null cell "${v}" has no quals tooltip`)
    if (!d) {
      if (v != null) findings.push(`${tag} ${s}: has a value "${v}" but no Global Exposure program`)
      if (sub != null) findings.push(`${tag} ${s}: has a sub "${sub}" but no Global Exposure program`)
      continue
    }
    if (row.key === 'travel-credential') {
      if (d.present !== (v != null)) {
        findings.push(`${tag} ${s}: value "${v}" but the program ${d.present ? 'has' : 'has no'} credential`)
      }
      continue
    }
    if (v !== d.value) findings.push(`${tag} ${s}: value "${v}" ≠ derived "${d.value}"`)
    if ('sub' in d && (sub ?? null) !== (d.sub ?? null)) {
      findings.push(`${tag} ${s}: sub "${sub}" ≠ derived "${d.sub}"`)
    }
  }
}

if (findings.length) {
  console.error(`check:travelrows — ${findings.length} finding(s):`)
  for (const f of findings) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(
  `check:travelrows — ${idx.length} rows × ${slugs.length} schools match the trip ledgers (${TRAVEL_YEAR})`,
)
