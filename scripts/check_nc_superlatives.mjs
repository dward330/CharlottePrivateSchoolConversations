#!/usr/bin/env node
/**
 * check:ncsuper — the two ranking labels on the ncAdmissions card must sit on
 * the university that actually earns them, for that school.
 *
 * WHY THIS EXISTS. The card shipped with six per-university `note` strings
 * hardcoded IDENTICALLY on every school. Four are institutional facts
 * ('Flagship STEM · Raleigh', 'Hometown campus') and are fine shared. Two make
 * a RANKING claim — 'the most selective of the six' and 'largest admit rates of
 * the six' — and a rate here is a joint property of school × university, so the
 * campus that earns either label differs per school. Pinned to UNC-Chapel Hill
 * and East Carolina respectively, the first was false on 5 of 11 schools and
 * the second on 6; only 2 schools were right on both.
 *
 * The labels are worth keeping — they tell a parent which campus is the hard
 * one — so the fix moves them rather than deleting them. This check asserts
 * the placement.
 *
 * ANCHOR: the LATEST-TERM (Fall 2025) rate — the ADMIT RATE column a reader
 * actually scans. Chosen 2026-08-20 after a user review of Cannon, where the
 * two columns disagreed: UNC Greensboro won the pooled 5-yr at 100% off 24
 * applicants, while UNC Charlotte showed 100% off 25 in Fall 2025 and the label
 * on the thinner row read as wrong. Ranking on the column the label sits beside
 * is what makes it legible.
 *
 * The cost is accepted knowingly: single-year cells are small, so some labels
 * now rest on very few applicants (Charlotte Christian's UNC Greensboro is
 * 3 of 3). Ties break on the larger denominator — 25 of 25 outranks 8 of 8 —
 * which limits but does not remove it. The subhead and third stat tile quote
 * the same term, so the whole card now speaks in one column.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIR = 'src/data/collegeSupportPrograms'
const num = (s) => Number(String(s).replace(/,/g, ''))

const LOW_LABEL = 'the most selective of the six'
const HIGH_LABEL = 'largest admit rates of the six'

const findings = []

for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith('.ts')) continue
  const src = fs.readFileSync(path.join(DIR, file), 'utf8')
  const start = src.indexOf('ncAdmissions:')
  if (start < 0) continue
  const end = src.indexOf('methodNote:', start)
  const seg = src.slice(start, end < 0 ? undefined : end)
  const school = file.replace(/\.ts$/, '')

  const rows = [...seg.matchAll(
    /key: '([^']+)',\s*\n\s*name: '([^']+)',[\s\S]*?note: '([^']*)',\s*\n\s*applied: '([\d,]+)',\s*\n\s*accepted: '([\d,]+)',\s*\n\s*rate: '([^']*)'/g,
  )].map((m) => ({
    key: m[1], name: m[2], note: m[3],
    applied: num(m[4]), accepted: num(m[5]), rate: parseFloat(m[6]),
  }))

  if (rows.length === 0) {
    findings.push(`${school}: ncAdmissions present but no university rows parsed`)
    continue
  }

  // Rank on the latest-term rate; a tie goes to the larger applicant pool.
  const pick = (better) => rows.reduce((a, c) =>
    better(c.rate, a.rate) ? c : c.rate === a.rate && c.applied > a.applied ? c : a)
  const lowest = pick((x, y) => x < y)
  const highest = pick((x, y) => x > y)

  for (const [label, winner, which] of [
    [LOW_LABEL, lowest, 'lowest'],
    [HIGH_LABEL, highest, 'highest'],
  ]) {
    const carriers = rows.filter((r) => r.note.includes(label))
    if (carriers.length === 0) {
      findings.push(`${school}: no row carries "${label}" (should be ${winner.name}, ${winner.rate}%)`)
    } else if (carriers.length > 1) {
      findings.push(`${school}: "${label}" appears on ${carriers.length} rows — ${carriers.map((c) => c.name).join(', ')}`)
    } else if (carriers[0].key !== winner.key) {
      findings.push(
        `${school}: "${label}" sits on ${carriers[0].name} (${carriers[0].rate}%, ` +
        `${carriers[0].accepted} of ${carriers[0].applied}), but ${winner.name} has the ${which} ` +
        `at ${winner.rate}% (${winner.accepted} of ${winner.applied}).`,
      )
    }
  }

  // The subhead and third stat tile name the hard campus in prose. Same anchor.
  const sub = seg.match(/subhead:\s*\n\s*'([^']*)'/)
  if (sub && /is the hard one/.test(sub[1])) {
    const named = rows.find((r) => sub[1].startsWith(r.name))
    if (!named) findings.push(`${school}: subhead names no known campus first`)
    else if (named.key !== lowest.key) {
      findings.push(`${school}: subhead calls ${named.name} the hard one (${named.rate}%), but ${lowest.name} is lower at ${lowest.rate}%.`)
    }
  }

  const tile = seg.match(/\{ value: '([\d.]+%)', label: 'at ([^—]+) — ([\d,]+) of ([\d,]+), ([^']*)' \}/)
  if (tile && /toughest|most selective/.test(tile[5])) {
    const name = tile[2].trim()
    const named = rows.find((r) => r.name === name)
    if (!named) findings.push(`${school}: stat tile names unknown campus ${JSON.stringify(name)}`)
    else {
      if (named.key !== lowest.key) {
        findings.push(`${school}: stat tile calls ${name} the toughest (${named.rate}%), but ${lowest.name} is lower at ${lowest.rate}%.`)
      }
      if (parseFloat(tile[1]) !== named.rate) {
        findings.push(`${school}: stat tile shows ${tile[1]} for ${name}, whose row says ${named.rate}%.`)
      }
    }
  }
}

if (findings.length) {
  console.error('check:ncsuper FAILED\n')
  for (const f of findings) console.error('  ✗ ' + f)
  console.error(`\n${findings.length} finding(s).`)
  process.exit(1)
}
console.log('check:ncsuper OK — both ranking labels sit on the university that earns them (Fall 2025 rate), on every school.')
