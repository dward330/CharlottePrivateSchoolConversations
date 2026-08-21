#!/usr/bin/env node
/**
 * check:ncsuper — no ncAdmissions string may claim a superlative its own rows
 * contradict.
 *
 * WHY THIS EXISTS. The card shipped with six per-university `note` strings
 * hardcoded IDENTICALLY on every school. Four of them are institutional facts
 * ('Flagship STEM · Raleigh', 'Hometown campus') and are fine shared. Two made
 * a RANKING claim — 'the most selective of the six' on UNC-Chapel Hill and
 * 'largest admit rates of the six' on East Carolina — and a ranking is a joint
 * property of school × university, so it cannot be shared chrome. The subhead
 * ('UNC-Chapel Hill is the hard one') and the third stat tile carried the same
 * claim. Measured across the 11 schools: the Chapel Hill claim was false on 5,
 * the ECU claim on 6, and only 2 schools were clean on both — about what chance
 * allows, because nothing ever checked it.
 *
 * The claim is anchored on the FIVE-YEAR POOLED rate, because that is the
 * figure the subhead and stat tile quote. A row's latest-term rate can differ
 * (small single-year cells swing hard) and is deliberately not asserted on.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIR = 'src/data/collegeSupportPrograms'
const num = (s) => Number(String(s).replace(/,/g, ''))

/** Phrases that assert a ranking. Any of these in a note/subhead/stat is checked. */
const SUPERLATIVE = /most selective|largest admit|toughest|hard one|highest admit|lowest admit/i

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
    /key: '([^']+)',[\s\S]*?name: '([^']+)',[\s\S]*?note: '([^']*)',[\s\S]*?fiveYearRate: '([^']*)'/g,
  )].map((m) => ({ key: m[1], name: m[2], note: m[3], rate: parseFloat(m[4]) }))

  if (rows.length === 0) {
    findings.push(`${school}: ncAdmissions present but no university rows parsed`)
    continue
  }

  const lowest = rows.reduce((a, r) => (r.rate < a.rate ? r : a))
  const highest = rows.reduce((a, r) => (r.rate > a.rate ? r : a))

  // 1. A per-row `note` must not assert a ranking at all — it is shared across
  //    every school by content hash, so it cannot be true of each one.
  for (const r of rows) {
    if (SUPERLATIVE.test(r.note)) {
      findings.push(
        `${school}: ${r.name} note asserts a ranking — ${JSON.stringify(r.note)}. ` +
        `Row notes are shared across all schools; keep them institutional.`,
      )
    }
  }

  // 2. The subhead names the hardest campus. It must be the school's own lowest
  //    pooled rate, and quote that campus's figure.
  const sub = seg.match(/subhead:\s*\n\s*'([^']*)'/)
  if (sub && SUPERLATIVE.test(sub[1])) {
    const named = rows.find((r) => sub[1].startsWith(r.name))
    if (!named) {
      findings.push(`${school}: subhead makes a ranking claim but names no known campus first`)
    } else if (named.key !== lowest.key) {
      findings.push(
        `${school}: subhead calls ${named.name} the hard one (${named.rate}% pooled), ` +
        `but ${lowest.name} is lower at ${lowest.rate}%.`,
      )
    }
  }

  // 3. Same for the stat tile that names a campus.
  const tile = seg.match(/\{ value: '([\d.]+%)', label: 'at ([^—]+) — ([\d,]+) of ([\d,]+), ([^']*)' \}/)
  if (tile && SUPERLATIVE.test(tile[5])) {
    const name = tile[2].trim()
    const named = rows.find((r) => r.name === name)
    if (!named) {
      findings.push(`${school}: stat tile names unknown campus ${JSON.stringify(name)}`)
    } else {
      if (named.key !== lowest.key) {
        findings.push(
          `${school}: stat tile calls ${name} the toughest (${named.rate}%), ` +
          `but ${lowest.name} is lower at ${lowest.rate}%.`,
        )
      }
      if (parseFloat(tile[1]) !== named.rate) {
        findings.push(
          `${school}: stat tile shows ${tile[1]} for ${name}, whose row says ${named.rate}%.`,
        )
      }
    }
  }

  // 4. Guard the inverse claim too, wherever it may be written.
  const highClaim = seg.match(/note: '([^']*largest admit[^']*)'/)
  if (highClaim) {
    findings.push(`${school}: a note claims the largest admit rate; highest is ${highest.name} (${highest.rate}%).`)
  }
}

if (findings.length) {
  console.error('check:ncsuper FAILED\n')
  for (const f of findings) console.error('  ✗ ' + f)
  console.error(`\n${findings.length} finding(s).`)
  process.exit(1)
}
console.log('check:ncsuper OK — no ncAdmissions superlative contradicts its own rows.')
