#!/usr/bin/env node
/**
 * coverage_floor.mjs — what does the thinnest school we already ship look like?
 *
 * The /add-school skill judges a candidate school against the roster rather than against
 * an invented percentage: the bar is "at least as good as our thinnest shipped school".
 * That floor moves whenever a Compare row is added or a school is backfilled, so it is
 * computed here rather than transcribed into the skill, where it would quietly go stale.
 *
 *   npm run coverage:floor            # the table plus the derived bar
 *   npm run coverage:floor -- --json  # machine-readable
 *
 * Reports, per school: Compare rows carrying a value, rows explicitly null ("we looked,
 * it is not published"), and rows missing entirely (an oversight — check:metrics tells
 * these apart and so does this). Research-area coverage comes from the same manifest the
 * app renders from, so a school with no source-material for a topic shows as absent here
 * exactly as it is absent from the page.
 *
 * Read-only. Parses rather than imports metricValues.ts: it is a .ts module, and the
 * shape needed here is a literal, so a parse avoids requiring a TS loader for a stat.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const asJson = process.argv.includes('--json')

/** Slugs are bare when identifier-safe (`cannon`) and quoted when hyphenated
 *  (`'charlotte-latin'`). A regex that assumes quotes silently reports Cannon at 0%. */
const KEY = (slug) => `(?:'${slug}'|"${slug}"|(?<![\\w-])${slug})`

function readManifest() {
  const m = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8'))
  const schools = m.schools.map((s) => ({ slug: s.slug, name: s.name }))
  const topics = m.topics.map((t) => t.slug)
  // Documents key on `school_slug`/`topic_slug`; `school`/`topic` are display names.
  const docs = new Map()
  for (const d of m.documents) {
    const k = `${d.school_slug}::${d.topic_slug}`
    docs.set(k, (docs.get(k) ?? 0) + 1)
  }
  return { schools, topics, docs }
}

/** Pull each VALUE_METRICS row's `values:{…}` block by brace-matching. */
function readMetricRows() {
  const src = readFileSync(join(ROOT, 'src/data/metricValues.ts'), 'utf8')
  const rows = []
  for (const m of src.matchAll(/key:\s*'([^']+)'/g)) {
    const after = src.slice(m.index)
    const vm = /values:\s*\{/.exec(after)
    if (!vm) continue
    const start = m.index + vm.index + vm[0].length - 1
    let depth = 0
    for (let i = start; i < src.length; i++) {
      if (src[i] === '{') depth++
      else if (src[i] === '}') {
        if (--depth === 0) { rows.push({ key: m[1], body: src.slice(start, i + 1) }); break }
      }
    }
  }
  return rows
}

const { schools, topics, docs } = readManifest()
const rows = readMetricRows()
if (!rows.length) { console.error('coverage_floor: parsed 0 Compare rows — metricValues.ts shape changed?'); process.exit(1) }

const report = schools.map(({ slug, name }) => {
  let value = 0, nulled = 0, missing = 0
  for (const { body } of rows) {
    const m = new RegExp(`${KEY(slug)}\\s*:\\s*(null|'(?:[^'\\\\]|\\\\.)*')`).exec(body)
    if (!m) missing++
    else if (m[1] === 'null') nulled++
    else value++
  }
  const areas = topics.filter((t) => (docs.get(`${slug}::${t}`) ?? 0) > 0).length
  // Floor, not round: 17/30 is 56.67%, and the agreed bar is stated as 56%. Rounding up
  // would advertise a floor fractionally above the school it is calibrated to.
  return { slug, name, value, nulled, missing, rows: rows.length, areas, topics: topics.length,
           fill: Math.floor((value / rows.length) * 100) }
})

const floor = report.reduce((a, b) => (b.value < a.value ? b : a))

if (asJson) {
  console.log(JSON.stringify({ rows: rows.length, topics: topics.length, schools: report, floor }, null, 2))
} else {
  const w = Math.max(...report.map((r) => r.name.length))
  console.log(`\n${rows.length} Compare rows · ${topics.length} research areas · ${schools.length} schools\n`)
  console.log('school'.padEnd(w), ' value  null  miss   fill   areas')
  for (const r of [...report].sort((a, b) => b.value - a.value)) {
    console.log(r.name.padEnd(w),
      String(r.value).padStart(6), String(r.nulled).padStart(5), String(r.missing).padStart(5),
      `${String(r.fill).padStart(5)}%`, `${String(r.areas).padStart(6)}/${r.topics}`)
  }
  console.log(`\nThinnest shipped school: ${floor.name} — ${floor.value}/${floor.rows} rows (${floor.fill}%), ${floor.areas}/${floor.topics} areas.`)
  console.log(`\nThe /add-school bar (inclusive): a candidate needs >= ${floor.value}/${floor.rows} Compare rows`)
  console.log(`and >= ${floor.areas}/${floor.topics} research areas to match our thinnest shipped school.`)
  console.log(`\nCount in ROWS, not percentages — each row moves the figure ~${(100 / rows.length).toFixed(1)} points.`)
  if (report.some((r) => r.missing)) {
    console.log(`\nNote: ${report.filter((r) => r.missing).map((r) => `${r.name} (${r.missing})`).join(', ')} have missing`)
    console.log(`Compare keys — an oversight rather than a deliberate null. See npm run check:metrics.`)
  }
  console.log()
}
