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
 *   - an NCISAA card's table holds its whole division, because its heading says
 *     "every"; an NCHSAA card holds the published top, and its heading says that;
 *   - Providence Day's card reads the figures verified from the official tables;
 *   - the inline fixtures compute what they should;
 *   - the two Compare rows (`cup-finish`, `cup-titles`, plan `cupcompare`) are
 *     contiguous and last in VALUE_METRICS, compareOnly, noLead and carrying the
 *     `cup` header tip, name the seasons in their labels, list the same schools as `d1-commits-2426`, and
 *     every typed cell, sub-line and tooltip matches the ledger.
 *
 * The ledger is passed as an argument to each rule, so the fixtures never touch
 * the shipped data. Fixture slugs print through cupName as themselves. The
 * Compare cells are typed into metricValues.ts because coverage_floor parses
 * literals and overlays stamp the English, so this is what keeps them honest.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const {
  CUP_DIVISION_LEADERS,
  CUP_FIELD_SIZES,
  CUP_HIGH_SCHOOLS,
  CUP_RECORDS,
  CUP_SEASONS,
  CUP_SHORT_NAMES,
  CUP_SPORTS,
} = await import('../src/data/wellsFargoCup.ts')
const cup = await import('../src/lib/wellsFargoCup.ts')
const { highSchoolFor, highSchoolUrl } = await import('../src/data/highSchools.ts')
const { VALUE_METRICS } = await import('../src/data/metricValues.ts')

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
  const key = `${l.association}|${l.classification}|${l.season}|${l.place}`
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
    // Tied and duplicated places mean a count can exceed the last place, never trail it.
    for (const own of cup.recordsFor(slug)) {
      const field = CUP_RECORDS.filter(
        (r) =>
          r.season === own.season &&
          r.association === own.association &&
          r.classification === own.classification,
      )
      const last = Math.max(...field.map((r) => r.place))
      if (field.length < last) {
        fail(`division incomplete: ${slug} ${own.classification} ${own.season} lists ${field.length} schools, last place ${last}`)
      }
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
const ncisaa = CUP_RECORDS.filter((r) => r.association === 'NCISAA').map((r) => r.school)
for (const r of CUP_RECORDS.filter((x) => x.association === 'NCHSAA')) {
  if (cup.divisionRows(r.school).some((s) => ncisaa.includes(s))) {
    fail(`divisionRows mixes associations: ${r.school} table holds an NCISAA school`)
  }
}

/* ------------------------------------------------- shipped figures, PD -- */

const pd = cup.headlineStats('providence-day')
eq('PD cups', [pd.cupsWon, pd.seasonsTotal], [5, 6])
eq('PD streak', pd.currentStreak, 4)
eq('PD peak', [pd.peak.points, pd.peak.season], [782.5, '2022–23'])
eq('PD margin', pd.latestMargin?.value, 2.5)
eq('PD best season', pd.bestSeason, { term: 'spring', points: 270 })
eq('PD lead over next', cup.leadOverNext('providence-day'), [25, 120, 170, 67.5, 10, 2.5])
eq('CCD lead over next', cup.leadOverNext('charlotte-country-day'), [110, 27.5, 32.5, 177.5, 82.5, 115])
eq('Latin lead over next', cup.leadOverNext('charlotte-latin'), [71.25, 27.5, 42.5, 142.5, 92.5, 87.5])
eq('Cannon lead over next', cup.leadOverNext('cannon'), [1.25, 17.5, 12.5, 7.5, 2.5, 15])
eq('Cannon best finish', [cup.headlineStats('cannon').bestFinish.place, cup.headlineStats('cannon').bestFinish.season], [4, '2023–24'])
eq('Charlotte Christian lead over next', cup.leadOverNext('charlotte-christian'), [65, 52.5, 22.5, 5, 2.5, 80])
eq('Charlotte Christian best finish', [cup.headlineStats('charlotte-christian').bestFinish.place, cup.headlineStats('charlotte-christian').bestFinish.season], [5, '2023–24'])
eq('Covenant Day lead over next', cup.leadOverNext('covenant-day'), [17.5, 2.5, 17.5, 12.5, 50, 25])
eq('Covenant Day best finish', [cup.headlineStats('covenant-day').bestFinish.place, cup.headlineStats('covenant-day').bestFinish.season], [8, '2022–23'])
eq('Carmel Christian lead over next', cup.leadOverNext('carmel-christian'), [32.5, 85, 35, 32.5, 47.5, 137.5])
eq('Carmel Christian best finish', [cup.headlineStats('carmel-christian').bestFinish.place, cup.headlineStats('carmel-christian').bestFinish.season], [14, '2022–23'])
eq('Davidson Day lead over next', cup.leadOverNext('davidson-day'), [0, 42.5, 17.5, 125, 20, 2.5])
eq('Davidson Day table', cup.divisionRows('davidson-day').length, 53)
eq('Davidson Day classes', cup.classLabel('davidson-day'), '2A / 3A')
eq('Davidson Day last win', cup.headlineStats('davidson-day').lastWin?.classification, '2A')
eq('Gaston Day lead over next', cup.leadOverNext('gaston-day'), [22.5, 2.5, 22.5, 5, 10, 2.5])
eq('Charlotte Catholic lead over next', cup.leadOverNext('charlotte-catholic'), [15, 5, 25, 37.5, 35, 75])
eq('Charlotte Catholic table', cup.divisionRows('charlotte-catholic').length, 21)
eq('Charlotte Catholic classes', cup.classLabel('charlotte-catholic'), '3A / 4A / 6A')
eq('Charlotte Catholic cups', [cup.headlineStats('charlotte-catholic').cupsWon, cup.headlineStats('charlotte-catholic').seasonsTotal], [1, 6])
eq('Charlotte Catholic margin', [cup.headlineStats('charlotte-catholic').latestMargin?.value, cup.headlineStats('charlotte-catholic').latestMargin?.rival.name], [75, 'Watauga'])
eq('Charlotte Catholic hides the bars', cup.nearestRival('charlotte-catholic', '2025–26'), null)
eq('PD comeback', cup.isComeback('providence-day'), true)
eq('PD table', cup.divisionRows('providence-day').length, 19)
eq('PD table ends with the schools that left 4A', cup.divisionRows('providence-day').slice(-2), ['greensboro-day', 'wake-christian'])

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

// Never won: the best finish as the headline.
{
  const L = fx(
    [rec('x', 'A', 4, 100), rec('x', 'B', 2, 200), rec('x', 'C', 3, 150)],
    [lead('Off Roster', 'A', 1, 300), lead('Off Roster', 'B', 1, 260), lead('Other', 'C', 1, 230)],
  )
  const s = cup.headlineStats('x', L)
  eq('never won: cups', s.cupsWon, 0)
  eq('never won: streak', s.currentStreak, 0)
  eq('never won: best finish', [s.bestFinish.place, s.bestFinish.season], [2, 'B'])
  eq('never won: margin', s.latestMargin?.value, -80)
  eq('never won: margin rival', s.latestMargin?.rival.name, 'Other')
}

// A missing year: an em dash, and the streak counts only records.
{
  const L = fx(
    [rec('x', 'A', 1, 100), rec('x', 'C', 1, 120), rec('y', 'A', 2, 90), rec('y', 'B', 1, 95), rec('y', 'C', 2, 80)],
    [lead('y', 'A', 2, 90), lead('y', 'C', 2, 80)],
  )
  eq('missing year: cell', cup.cell('x', 'B', 'x', L), null)
  eq('missing year: total', cup.headlineStats('x', L).seasonsTotal, 2)
  eq('missing year: lead over next', cup.leadOverNext('x', L), [10, null, 40])
}

// Lead over next: any place, past a tie, last place, and an off-roster next school.
{
  const L = fx(
    [
      rec('x', 'A', 2, 100), rec('y', 'A', 1, 120), rec('z', 'A', 3, 70),
      rec('x', 'B', 3, 90, { tied: true }), rec('y', 'B', 3, 90, { tied: true }), rec('z', 'B', 5, 60),
      rec('x', 'C', 3, 50), rec('y', 'C', 1, 80), rec('z', 'C', 2, 60),
    ],
  )
  eq('next: 2nd, past a tie, last', cup.leadOverNext('x', L), [30, 30, null])
  const M = fx([rec('x', 'A', 1, 100)], [lead('Off Roster', 'A', 2, 75)])
  eq('next: off-roster 2nd', cup.leadOverNext('x', M), [25, null, null])
  eq('next: place not held', cup.leadOverNext('x', fx([rec('x', 'A', 2, 100), rec('z', 'A', 4, 70)])), [null, null, null])
  eq('next: same place, no tie mark', cup.leadOverNext('x', fx([rec('w', 'A', 14, 147.5), rec('x', 'A', 14, 142.5), rec('z', 'A', 15, 107.5)])), [35, null, null])
}

// A school that left the division sorts below it, whatever its place elsewhere.
{
  const L = fx([
    rec('x', 'A', 5, 100),
    rec('x', 'C', 5, 100),
    rec('left', 'A', 9, 90),
    rec('left', 'C', 1, 300, { classification: '2A' }),
    rec('stayed', 'C', 7, 80),
  ])
  eq('sort: left the division', cup.divisionRows('x', L), ['x', 'stayed', 'left'])
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
if (!/pointsToken\(c\.result, number\)/.test(body) || !/estimated && \(/.test(body) || !/<ToVerify \/>/.test(body)) {
  fail('isEstimate has no render path: the card must print pointsToken and wire ToVerify')
}
if (!/nchsaa \? 'sports\.cup\.tableTitleNchsaa'/.test(body)) fail('an NCHSAA table must not print the "every school" heading')

// The bars compare each school with the place right above it, or 2nd if it won.
for (const [slug, name] of [
  ['providence-day', 'Charlotte Latin'],
  ['charlotte-latin', 'Providence Day'],
  ['charlotte-country-day', 'Charlotte Latin'],
  ['cannon', 'Durham Academy'],
  ['charlotte-christian', 'Cary Academy'],
  ['covenant-day', 'Ravenscroft'],
  ['carmel-christian', 'Covenant Day'],
  ['davidson-day', 'Calvary Day'],
]) {
  eq(`${slug} bars rival`, cup.nearestRival(slug, '2025–26')?.name, name)
}
{
  const L = fx(
    [
      rec('w', 'C', 2, 500, { tied: true }),
      rec('v', 'C', 2, 500, { tied: true }),
      rec('y', 'C', 4, 300, { tied: true }),
      rec('x', 'C', 4, 300, { tied: true }),
      rec('z', 'C', 7, 100),
    ],
    [lead('Winner', 'C', 1, 600)],
  )
  eq('bars rival: a tie is passed over', cup.nearestRival('x', 'C', L)?.points, 500)
  eq('bars rival: a skipped place is passed over', cup.nearestRival('z', 'C', L)?.points, 300)
  eq('bars rival: off-roster school from leaders', cup.nearestRival('w', 'C', L)?.name, 'Winner')
  eq('bars: the gap tile still reads the winner', cup.headlineStats('x', L).latestMargin?.value, -300)
}

// Every name on a table links: a roster school to its page, any other out.
{
  const { schools } = JSON.parse(readFileSync(join(here, '../src/data/schools.json'), 'utf8'))
  const roster = new Set(schools.map((s) => s.slug))
  for (const slug of Object.keys(CUP_SHORT_NAMES)) {
    const name = CUP_HIGH_SCHOOLS[slug]
    if (roster.has(slug) && name) fail(`${slug}: on the roster, so it links to its page, not a homepage`)
    const closed = highSchoolFor(name ?? '')?.status === 'closed'
    if (!roster.has(slug) && !highSchoolUrl(name ?? '') && !closed) fail(`${slug}: off the roster with no homepage in highSchools.ts`)
  }
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

/* ---------------------------------------------------------- Compare rows -- */

const ordinal = (n) => {
  const tens = n % 100
  if (tens >= 11 && tens <= 13) return `${n}th`
  return `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'}`
}

const COMPARE_KEYS = ['cup-finish', 'cup-titles']
const latestSeason = CUP_SEASONS.at(-1)
const finish = VALUE_METRICS.find((m) => m.key === 'cup-finish')
const titles = VALUE_METRICS.find((m) => m.key === 'cup-titles')

eq('Compare rows: last in VALUE_METRICS, in order', VALUE_METRICS.slice(-2).map((m) => m.key), COMPARE_KEYS)
eq(
  'Compare rows: exactly two',
  VALUE_METRICS.filter((m) => m.key.startsWith('cup-')).map((m) => m.key),
  COMPARE_KEYS,
)
eq(
  'CUP_FIELD_SIZES 4A: the one division the ledger holds whole',
  CUP_FIELD_SIZES['NCISAA|4A'],
  CUP_RECORDS.filter(
    (r) => r.association === 'NCISAA' && r.classification === '4A' && r.season === latestSeason,
  ).length,
)

if (finish && titles) {
  const commits = VALUE_METRICS.find((m) => m.key === 'd1-commits-2426')
  for (const row of [finish, titles]) {
    eq(`${row.key}: topic`, row.topic, 'sports')
    if (row.compareOnly !== true) fail(`${row.key}: must be compareOnly`)
    if (row.noLead !== true) fail(`${row.key}: must be noLead`)
    if (row.rowTip !== 'cup') fail(`${row.key}: must carry rowTip: 'cup'`)
    eq(`${row.key}: school keys`, Object.keys(row.values).sort(), Object.keys(commits.values).sort())
  }
  if (!finish.label.includes(latestSeason)) fail(`cup-finish label must contain ${latestSeason}`)
  if (!titles.label.includes(CUP_SEASONS[0]) || !titles.label.includes(latestSeason)) {
    fail(`cup-titles label must contain ${CUP_SEASONS[0]} and ${latestSeason}`)
  }

  for (const slug of Object.keys(finish.values)) {
    const own = cup.recordsFor(slug)
    const latest = own.at(-1)

    // cup-finish: the place in the latest season, and nothing without one.
    const current = latest?.season === latestSeason ? latest : null
    const finishValue = finish.values[slug]
    const finishQual = finish.quals?.[slug]?.text
    if (!current) {
      eq(`cup-finish ${slug}: value with no ${latestSeason} record`, finishValue, null)
      eq(`cup-finish ${slug}: sub with no ${latestSeason} record`, finish.subs?.[slug] ?? null, null)
    } else {
      const size = CUP_FIELD_SIZES[`${current.association}|${current.classification}`]
      const place = `${current.tied ? 'T' : ''}${ordinal(current.place)}`
      eq(`cup-finish ${slug}: value`, finishValue, size ? `${place} of ${size}` : place)
      eq(`cup-finish ${slug}: sub`, finish.subs?.[slug], `${current.association} ${current.classification}`)
      const rival = cup.seasonRival(slug, current.season)
      if (!finishQual) {
        fail(`cup-finish ${slug}: non-null cell has no quals tooltip`)
      // The NCHSAA tooltip carries the cross-association caveat, so only its points figure is pinned.
      } else if (!rival || current.association === 'NCHSAA') {
        if (!finishQual.startsWith(`${current.points} points`)) {
          fail(`cup-finish ${slug}: tooltip must start with "${current.points} points"`)
        }
      } else {
        eq(
          `cup-finish ${slug}: tooltip`,
          finishQual,
          current.place === 1
            ? `${current.points} points. ${rival.name} was second with ${rival.points}.`
            : `${current.points} points. ${rival.name} won ${current.classification} with ${rival.points}.`,
        )
      }
    }

    // cup-titles: a partial record cannot claim six seasons.
    const whole = own.length === CUP_SEASONS.length
    const won = own.filter((r) => r.place === 1)
    const top3 = own.filter((r) => r.place <= 3).length
    eq(`cup-titles ${slug}: value`, titles.values[slug], whole ? String(won.length) : null)
    eq(
      `cup-titles ${slug}: sub`,
      titles.subs?.[slug] ?? null,
      whole && top3 > 0 ? `Top 3 in ${top3} of ${CUP_SEASONS.length}` : null,
    )
    if (whole && won.length > 0) {
      const text = titles.quals?.[slug]?.text
      if (!text) fail(`cup-titles ${slug}: a title needs a quals tooltip`)
      for (const r of won) {
        if (text && !text.includes(r.season)) fail(`cup-titles ${slug}: tooltip does not name ${r.season}`)
      }
    }
  }
}

/* ---------------------------------------------------------------- report -- */

if (fails.length > 0) {
  console.error(`check:cup — ${fails.length} failure(s):`)
  for (const f of fails) console.error(`  - ${f}`)
  process.exit(1)
}
console.log(
  `check:cup — ${CUP_RECORDS.length} records, ${CUP_DIVISION_LEADERS.length} leaders, ${cards} card(s), ${Object.keys(finish?.values ?? {}).length} Compare schools: OK`,
)
