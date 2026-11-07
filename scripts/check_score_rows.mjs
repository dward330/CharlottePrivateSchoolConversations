#!/usr/bin/env node
/**
 * check:scores — guards the hand-typed SAT / ACT rows on Compare › College
 * Support (`sat-scores`, `act-scores` in src/data/metricValues.ts, plan
 * testscores, 2026-11-07).
 *
 * Each cell stacks the school's published Median, Average and Middle 50%
 * (`scores[slug]`), with the class year beneath (`subs[slug]`). `values[slug]`
 * duplicates the first published line so the coverage floor, the schema doc and
 * the N/A logic read the row like any other — this check is what stops that
 * duplicate drifting.
 *
 * Asserts:
 *   - both rows exist, are college-support, and are the first two rows of that
 *     topic, SAT then ACT;
 *   - both carry `noLead` (the cells mix three statistics, so there is no
 *     "best") and `compareOnly` (the school page already shows the card);
 *   - per slug, `values[slug] == null` ⇔ no `scores[slug]` ⇔ no `subs[slug]`;
 *   - `values[slug]` equals the first non-null of median → mean → mid50;
 *   - median / mean are plain numbers, mid50 is `low–high` with an EN DASH, and
 *     every sub-line reads `(Class of YYYY)`;
 *   - the SAT and ACT rows agree on which schools have data and on each class;
 *   - traceability: every figure (both endpoints of a range) and the class year
 *     appear verbatim in src/data/collegeSupportPrograms/<slug>.ts.
 *
 * The traceability test is a substring search, so it is a FLOOR, not proof: a
 * two-digit ACT figure such as `27` will match almost any card. It catches a
 * re-typed SAT figure or a school whose card holds no such number at all.
 */
import fs from 'node:fs'
import path from 'node:path'

const { VALUE_METRICS } = await import(path.resolve('src/data/metricValues.ts'))
const DIR = 'src/data/collegeSupportPrograms'
const LINES = ['median', 'mean', 'mid50']
const KEYS = ['sat-scores', 'act-scores']

const findings = []
const cs = VALUE_METRICS.filter((r) => r.topic === 'college-support')
const rows = KEYS.map((k) => VALUE_METRICS.find((r) => r.key === k))

KEYS.forEach((k, i) => {
  const row = rows[i]
  if (!row) return findings.push(`${k}: row is missing`)
  if (row.topic !== 'college-support') findings.push(`${k}: topic is ${row.topic}`)
  if (cs[i]?.key !== k) findings.push(`${k}: must be college-support row ${i + 1} (found ${cs[i]?.key})`)
  if (!row.noLead) findings.push(`${k}: must set noLead`)
  if (!row.compareOnly) findings.push(`${k}: must set compareOnly`)
  if (!row.scores) findings.push(`${k}: has no scores field`)
})

const cardText = {}
const card = (slug) => {
  if (!(slug in cardText)) {
    const f = path.join(DIR, `${slug}.ts`)
    cardText[slug] = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
  }
  return cardText[slug]
}

let cells = 0
for (const row of rows) {
  if (!row?.scores) continue
  const k = row.key
  const scores = row.scores
  const subs = row.subs ?? {}
  const slugs = new Set([...Object.keys(row.values), ...Object.keys(scores), ...Object.keys(subs)])
  for (const slug of slugs) {
    const v = row.values[slug] ?? null
    const sc = scores[slug]
    const sub = subs[slug]
    const tag = `${k} › ${slug}`
    if (v == null) {
      if (sc) findings.push(`${tag}: has scores but values is null`)
      if (sub) findings.push(`${tag}: has a sub-line but values is null`)
      continue
    }
    if (!sc) { findings.push(`${tag}: values is '${v}' but scores has no entry`); continue }
    if (!sub) findings.push(`${tag}: values is set but subs has no entry`)
    const first = LINES.map((l) => sc[l]).find((x) => x != null)
    if (first == null) findings.push(`${tag}: every line is null`)
    else if (v !== first) findings.push(`${tag}: values '${v}' does not mirror the first published line '${first}'`)
    for (const l of ['median', 'mean']) {
      if (sc[l] != null && !/^\d+(\.\d+)?$/.test(sc[l])) findings.push(`${tag}: ${l} '${sc[l]}' is not a plain number`)
    }
    if (sc.mid50 != null && !/^\d+–\d+$/.test(sc.mid50)) {
      findings.push(`${tag}: mid50 '${sc.mid50}' must be low–high with an en dash`)
    }
    if (sub && !/^\(Class of \d{4}\)$/.test(sub)) findings.push(`${tag}: sub-line '${sub}' must read (Class of YYYY)`)
    const text = card(slug)
    if (text == null) { findings.push(`${tag}: no card file ${DIR}/${slug}.ts`); continue }
    const figs = LINES.flatMap((l) => (sc[l] == null ? [] : l === 'mid50' ? sc[l].split('–') : [sc[l]]))
    for (const f of figs) if (!text.includes(f)) findings.push(`${tag}: '${f}' does not appear in the school's card`)
    const yr = sub?.match(/\d{4}/)?.[0]
    if (yr && !text.includes(yr)) findings.push(`${tag}: class year ${yr} does not appear in the school's card`)
    cells++
  }
}

if (rows[0]?.scores && rows[1]?.scores) {
  const has = (r) => Object.keys(r.values).filter((s) => r.values[s] != null).sort().join(',')
  if (has(rows[0]) !== has(rows[1])) findings.push(`SAT and ACT rows disagree on which schools have data`)
  for (const [slug, sub] of Object.entries(rows[0].subs ?? {})) {
    if ((rows[1].subs ?? {})[slug] !== sub) findings.push(`${slug}: SAT class '${sub}' ≠ ACT class '${rows[1].subs?.[slug]}'`)
  }
}

if (findings.length) {
  console.error(`check:scores — ${findings.length} finding(s):`)
  for (const f of findings) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`check:scores — ${cells} SAT/ACT cells mirror their scores and trace to the school cards`)
