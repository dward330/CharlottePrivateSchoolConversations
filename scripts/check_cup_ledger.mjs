#!/usr/bin/env node
/**
 * check:cup — the Wells Fargo Cup ledger must be internally sound, and the
 * computed rules must hold in the states no shipped school reaches yet.
 *
 * WHY THIS EXISTS. Everything the Cup card prints is computed from
 * src/data/wellsFargoCup.ts, so one mistyped cell becomes a wrong headline with
 * no error. The fixtures matter as much: only Providence Day has the card, so
 * the never-won, missing-year, "In 3A", estimate and hidden-splits paths would
 * otherwise first run on a later school's page.
 *
 * Asserts:
 *   - fall + winter + spring = points on every row that has splits;
 *   - no duplicate school-season row, in the records or the leaders;
 *   - a leader on the roster agrees with that school's record;
 *   - an estimate reaches the page as `~`, and the card wires TO VERIFY to it;
 *   - every pointSources entry is a sport in CUP_SPORTS for that season;
 *   - every CUP_SPORTS key has a `sports.cup.sport_<key>` string in en.json;
 *   - divisionRows never mixes associations;
 *   - Providence Day's card reads the figures verified from the official tables;
 *   - the inline fixtures compute what they should.
 *
 * The ledger is passed as an argument to each rule, so the fixtures never touch
 * the shipped data. Fixture slugs print through cupName as themselves.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const { CUP_RECORDS, CUP_DIVISION_LEADERS, CUP_SEASONS, CUP_SPORTS } = await import(
  '../src/data/wellsFargoCup.ts'
)
const cup = await import('../src/lib/wellsFargoCup.ts')

const fails = []
const fail = (msg) => fails.push(msg)
const eq = (name, got, want) => {
  const [g, w] = [JSON.stringify(got), JSON.stringify(want)]
  if (g !== w) fail(`${name}: got ${g}, expected ${w}`)
}

/* ----------------------------------------------------------- ledger rows -- */

const splitSum = (r, who) => {
  if (r.fall == null && r.winter == null && r.spring == null) return
  const sum = (r.fall ?? 0) + (r.winter ?? 0) + (r.spring ?? 0)
  if (sum !== r.points) {
    fail(`splits do not sum: ${who} ${r.season} fall + winter + spring = ${sum}, points = ${r.points}`)
  }
}

const seen = new Set()
for (const r of CUP_RECORDS) {
  splitSum(r, r.school)
  const key = `${r.school}|${r.season}`
  if (seen.has(key)) fail(`duplicate school-season row: ${key}`)
  seen.add(key)
  if (!CUP_SEASONS.includes(r.season)) fail(`unknown season: ${key}`)
}

const seenLeaders = new Set()
for (const l of CUP_DIVISION_LEADERS) {
  splitSum(l, l.school)
  const key = `${l.classification}|${l.season}|${l.place}`
  if (seenLeaders.has(key)) fail(`duplicate leader row: ${key}`)
  seenLeaders.add(key)
  if (!l.slug) continue
  const r = CUP_RECORDS.find((x) => x.school === l.slug && x.season === l.season)
  if (!r || r.points !== l.points || r.place !== l.place || r.classification !== l.classification) {
    fail(`leader disagrees with the ledger: ${l.school} ${l.season}`)
  }
}

/* --------------------------------------------------------- point sources -- */

const programs = join(here, '../src/data/sportsPrograms')
let cards = 0
for (const file of readdirSync(programs).filter((f) => f.endsWith('.ts'))) {
  const mod = await import(join(programs, file))
  for (const program of Object.values(mod)) {
    if (!program?.cup) continue
    cards++
    const slug = file.replace(/\.ts$/, '')
    const stats = cup.headlineStats(slug)
    if (!stats) {
      fail(`${slug} has a cup card but no ledger rows`)
      continue
    }
    for (const s of program.cup.pointSources) {
      const hit = CUP_SPORTS[stats.latest.association][s.season].some(
        (x) => x.key === s.sport && (x.gender === 'both' || x.gender === s.gender),
      )
      if (!hit) fail(`pointSources entry not in CUP_SPORTS: ${slug} ${s.gender} ${s.sport} (${s.season})`)
    }
  }
}

/* ---------------------------------------------------------------- chrome -- */

const en = JSON.parse(readFileSync(join(here, '../src/locales/en.json'), 'utf8'))
for (const lists of Object.values(CUP_SPORTS)) {
  for (const list of Object.values(lists)) {
    for (const s of list) {
      if (!en.sports.cup[`sport_${s.key}`]) fail(`no en.json string for sport: ${s.key}`)
    }
  }
}

/* ------------------------------------------------------ association wall -- */

const nchsaa = CUP_RECORDS.filter((r) => r.association === 'NCHSAA').map((r) => r.school)
for (const r of CUP_RECORDS.filter((x) => x.association === 'NCISAA')) {
  if (cup.divisionRows(r.school).some((s) => nchsaa.includes(s))) {
    fail(`divisionRows mixes associations: ${r.school} table holds an NCHSAA school`)
  }
}

/* ------------------------------------------------- shipped figures, PD -- */

const pd = cup.headlineStats('providence-day')
eq('PD cups', [pd.cupsWon, pd.seasonsTotal], [5, 6])
eq('PD streak', pd.currentStreak, 4)
eq('PD peak', [pd.peak.points, pd.peak.season], [782.5, '2022–23'])
eq('PD margin', pd.latestMargin?.value, 2.5)
eq('PD best season', pd.bestSeason, { term: 'spring', points: 270 })
eq('PD lead row', cup.leadRow('providence-day'), [25, null, 170, 67.5, 10, 2.5])
eq('PD comeback', cup.isComeback('providence-day'), true)
eq('PD table', cup.divisionRows('providence-day').length, 7)

/* -------------------------------------------------------------- fixtures -- */

const rec = (school, season, place, points, extra = {}) => ({
  school,
  association: 'NCISAA',
  classification: '3A',
  season,
  place,
  points,
  isEstimate: false,
  fall: 0,
  winter: 0,
  spring: points,
  ...extra,
})
const fx = (records, leaders = []) => ({ seasons: ['A', 'B', 'C'], records, leaders })
const lead = (school, season, place, points, extra = {}) => ({
  school,
  association: 'NCISAA',
  classification: '3A',
  season,
  place,
  points,
  fall: 0,
  winter: 0,
  spring: points,
  ...extra,
})

// Never won: no lead row, a gap row, and the best finish as the headline.
{
  const L = fx(
    [rec('x', 'A', 4, 100), rec('x', 'B', 2, 200), rec('x', 'C', 3, 150)],
    [lead('Off Roster', 'A', 1, 300), lead('Off Roster', 'B', 1, 260), lead('Other', 'C', 1, 230)],
  )
  const s = cup.headlineStats('x', L)
  eq('never won: cups', s.cupsWon, 0)
  eq('never won: streak', s.currentStreak, 0)
  eq('never won: best finish', [s.bestFinish.place, s.bestFinish.season], [2, 'B'])
  eq('never won: lead row', cup.leadRow('x', L), [null, null, null])
  eq('never won: gap row', cup.gapBehindFirst('x', L), [200, 60, 80])
  eq('never won: margin', s.latestMargin?.value, -80)
  eq('never won: margin rival', s.latestMargin?.rival.name, 'Other')
}

// A missing year: an em dash, and the streak counts only records.
{
  const L = fx([rec('x', 'A', 1, 100), rec('x', 'C', 1, 120), rec('y', 'A', 2, 90), rec('y', 'B', 1, 95), rec('y', 'C', 2, 80)])
  eq('missing year: cell', cup.cell('x', 'B', 'x', L), null)
  eq('missing year: total', cup.headlineStats('x', L).seasonsTotal, 2)
  eq('missing year: lead row', cup.leadRow('x', L), [10, null, 40])
}

// "In 3A": a table school in another class that season.
{
  const L = fx([
    rec('x', 'A', 1, 100, { classification: '2A' }),
    rec('x', 'B', 2, 100, { classification: '3A' }),
    rec('y', 'A', 5, 90, { classification: '3A' }),
    rec('y', 'B', 6, 80, { classification: '3A' }),
  ])
  eq('other class: cell', cup.cell('y', 'A', 'x', L), { otherClass: '3A' })
  eq('other class: same division', 'result' in cup.cell('y', 'B', 'x', L), true)
  eq('other class: own row', 'result' in cup.cell('x', 'A', 'x', L), true)
  eq('other class: label', cup.classLabel('x', L), '2A / 3A')
}

// An estimate reaches the page as `~`, and flags the school's table.
{
  const L = fx([rec('x', 'A', 1, 595, { isEstimate: true })])
  eq('estimate: token', cup.pointsToken(L.records[0], String), '~595')
  eq('estimate: flagged', cup.hasEstimate('x', L), true)
  eq('estimate: unflagged', cup.hasEstimate('x', fx([rec('x', 'A', 1, 595)])), false)
}
const body = readFileSync(join(here, '../src/components/SportsProgram.tsx'), 'utf8')
if (!/pointsToken\(c\.result, number\)/.test(body) || !/estimated && <ToVerify \/>/.test(body)) {
  fail('isEstimate has no render path: the card must print pointsToken and wire ToVerify')
}

// Hidden splits: the bars and the best-season tile go, the margin stays.
{
  const none = { fall: undefined, winter: undefined, spring: undefined }
  const L = fx([rec('x', 'C', 1, 300, none)], [lead('Second', 'C', 2, 250, none)])
  eq('hidden splits: rival', cup.nearestRival('x', 'C', L), null)
  eq('hidden splits: best season', cup.headlineStats('x', L).bestSeason, null)
  eq('hidden splits: margin', cup.headlineStats('x', L).latestMargin?.value, 50)
  eq('hidden splits: no comeback', cup.isComeback('x', L), false)
}

// A comeback needs the rival ahead after fall AND after winter.
{
  const own = { fall: 100, winter: 100, spring: 300 }
  const ahead = { fall: 120, winter: 120, spring: 200 }
  const behindAfterFall = { fall: 90, winter: 150, spring: 200 }
  const a = fx([rec('x', 'C', 1, 500, own)], [lead('R', 'C', 2, 440, ahead)])
  const b = fx([rec('x', 'C', 1, 500, own)], [lead('R', 'C', 2, 440, behindAfterFall)])
  eq('comeback: led both', cup.isComeback('x', a), true)
  eq('comeback: trailed after fall', cup.isComeback('x', b), false)
}

/* ---------------------------------------------------------------- report -- */

if (fails.length > 0) {
  console.error(`check:cup — ${fails.length} failure(s):`)
  for (const f of fails) console.error(`  - ${f}`)
  process.exit(1)
}
console.log(
  `check:cup — ${CUP_RECORDS.length} records, ${CUP_DIVISION_LEADERS.length} leaders, ${cards} card(s): OK`,
)
