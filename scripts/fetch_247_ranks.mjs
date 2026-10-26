#!/usr/bin/env node
/**
 * fetch_247_ranks.mjs — match a school's College Pipeline roster to 247Sports ranks.
 *
 * 247Sports publishes per-state recruiting lists (football, basketball, women's basketball)
 * as plain server-rendered HTML: a GET with a browser User-Agent returns 50 rows a page, no
 * login, no JavaScript. Each row carries the national, position and state rank, the stars,
 * the score, 247's listed high school and the profile link. This script pages through every
 * list for the given state and years, in both the Composite (`compositerecruitrankings`,
 * what the app renders) and the 247 in-house (`recruitrankings`, audit only) flavours, and
 * matches them against the roster in `src/data/sportsPrograms/<slug>.ts`.
 *
 *   npm run fetch:247 -- --slug providence-day
 *   npm run fetch:247 -- --slug cannon --state NC --years 2023-2027
 *
 * A match needs normalised name + class AND 247's listed high school to name this school.
 * Name + class alone is not enough: Carmel Christian's Bryce Slay ('25) matches a player
 * 247 lists at United Faith Christian Academy, so he is printed as HELD BACK, never matched.
 * The reverse sweep lists athletes 247 places at the school who are not on our roster —
 * leads for a roster backfill, not data for the app.
 *
 * Read-only: it prints tables and never writes src/. Transcribe its output into
 * `source-material/sports/<slug>/<School> - Sports - 247Sports Recruiting Rankings.md`
 * (every `##` heading containing "Recruiting") and only then into the roster's `rank247`.
 * Not chained into `npm run build`, because it needs the network. Parses rather than
 * imports the roster: the sportsPrograms module graph calls `import.meta.glob`.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** How 247 spells each school in a row's `span.meta`. Substring match. */
const SCHOOL_247 = {
  'providence-day': 'Providence Day School',
  'charlotte-christian': 'Charlotte Christian',
  'charlotte-catholic': 'Charlotte Catholic',
  'charlotte-country-day': 'Charlotte Country Day',
  'davidson-day': 'Davidson Day',
  'carmel-christian': 'Carmel Christian',
  cannon: 'Cannon School',
  'charlotte-latin': 'Charlotte Latin',
  'covenant-day': 'Covenant Day',
}

const KINDS = ['compositerecruitrankings', 'recruitrankings']
const SPORTS = ['football', 'basketball', 'womens-basketball']
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/129.0.0.0 Safari/537.36'
const MAX_PAGES = 30

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : fallback
}

const slug = arg('slug')
const state = arg('state', 'NC')
const [y0, y1] = arg('years', '2023-2027').split('-').map(Number)
if (!slug || !SCHOOL_247[slug]) {
  console.error(`usage: fetch_247_ranks.mjs --slug <${Object.keys(SCHOOL_247).join('|')}> [--state NC] [--years 2023-2027]`)
  process.exit(2)
}
const school247 = SCHOOL_247[slug]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim()
}

const pick = (html, re) => {
  const m = html.match(re)
  return m ? decode(m[1]) : null
}

function parseRows(html) {
  return html
    .split('<li class="rankings-page__list-item">')
    .slice(1)
    .map((li) => {
      const href = pick(li, /class="rankings-page__name-link" href="([^"]+)"/)
      if (!href) return null
      const nat = pick(li, /class="natrank"[^>]*>([^<]*)</)
      const st = pick(li, /class="sttrank"[^>]*>([^<]*)</)
      return {
        name: pick(li, /class="rankings-page__name-link"[^>]*>([^<]*)</),
        url: 'https://247sports.com' + href.replace(/^https?:\/\/247sports\.com/, '').replace(/high-school-\d+\/?$/, ''),
        school: pick(li, /<span class="meta">([^<]*)</) ?? '',
        pos: pick(li, /<div class="position">([^<]*)</),
        stars: (li.match(/icon-starsolid yellow/g) ?? []).length,
        score: pick(li, /<span class="score">([^<]*)</),
        national: nat && /^\d+$/.test(nat) ? +nat : null,
        posRank: pick(li, /class="posrank"[^>]*>([^<]*)</),
        state: st && /^\d+$/.test(st) ? +st : null,
        commit: pick(li, /class="img-link"[^>]*>\s*<img alt="([^"]*)"/),
      }
    })
    .filter(Boolean)
}

/** Every row of one list, paged until a page comes back empty (or repeats itself). */
async function fetchList(kind, sport, year) {
  const rows = []
  const seen = new Set()
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `https://247sports.com/season/${year}-${sport}/${kind}/?InstitutionGroup=HighSchool&State=${state}&Page=${page}`
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    const got = parseRows(await res.text()).filter((r) => !seen.has(r.url))
    await sleep(1500)
    if (!got.length) break
    got.forEach((r) => seen.add(r.url))
    rows.push(...got)
  }
  return rows
}

/** Roster rows, parsed from source. Accepts both quote styles: the files mix them. */
function readRoster() {
  const src = readFileSync(join(ROOT, 'src/data/sportsPrograms', `${slug}.ts`), 'utf8')
  const q = `(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`
  const field = (k) => new RegExp(`\\b${k}:\\s*${q}`)
  const out = []
  for (const m of src.matchAll(/\{\s*cls:[^{}]*\}/g)) {
    const get = (k) => {
      const f = m[0].match(field(k))
      return f ? (f[1] ?? f[2]).replace(/\\(.)/g, '$1') : null
    }
    out.push({ cls: get('cls'), name: get('name'), sport: get('sport'), college: get('college'), level: get('level') })
  }
  return out
}

const norm = (n) =>
  n
    .toLowerCase()
    .replace(/\b(jr|sr|ii|iii|iv)\b\.?/g, '')
    .replace(/[^a-z]/g, '')
const year = (cls) => 2000 + Number(String(cls).slice(-2))
const isRanked247Sport = (s) => /football|basketball/i.test(s ?? '')

const roster = readRoster()
if (!roster.length) {
  console.error(`no roster rows parsed from src/data/sportsPrograms/${slug}.ts`)
  process.exit(1)
}

/** lists[kind] = all rows across sports and years, tagged with sport + year. */
const lists = {}
for (const kind of KINDS) {
  lists[kind] = []
  for (const sport of SPORTS)
    for (let y = y0; y <= y1; y++) {
      process.stderr.write(`  ${kind} ${y} ${sport}…`)
      const rows = await fetchList(kind, sport, y)
      process.stderr.write(` ${rows.length}\n`)
      lists[kind].push(...rows.map((r) => ({ ...r, sport, year: y })))
    }
}

const find = (kind, r) => lists[kind].filter((x) => x.year === year(r.cls) && norm(x.name) === norm(r.name))
const atSchool = (x) => x.school.includes(school247)

const matched = []
const heldBack = []
const unmatched = []
for (const r of roster) {
  const comp = find('compositerecruitrankings', r)
  const ok = comp.find(atSchool)
  if (ok) {
    const own = find('recruitrankings', r).find(atSchool)
    matched.push({ r, c: ok, own })
  } else if (comp.length) heldBack.push({ r, c: comp[0] })
  else if (isRanked247Sport(r.sport)) unmatched.push(r)
}

const rosterKeys = new Set(roster.map((r) => `${norm(r.name)}|${year(r.cls)}`))
const reverse = lists.compositerecruitrankings.filter(
  (x) => atSchool(x) && !rosterKeys.has(`${norm(x.name)}|${x.year}`),
)

const dash = (v) => (v == null ? 'NA' : v)
console.log(`\n${slug} — 247Sports ${state} lists ${y0}–${y1} (${roster.length} roster rows, 247 school "${school247}")\n`)
console.log(`MATCHED (${matched.length}) — Composite is what the app renders`)
console.log('name | cls | composite national | composite state | stars | score | pos rank | in-house national | in-house state | 247 school | profile URL')
for (const { r, c, own } of matched)
  console.log(
    [r.name, r.cls, dash(c.national), dash(c.state), c.stars, c.score, c.posRank, dash(own?.national), dash(own?.state), c.school, c.url].join(' | '),
  )
console.log(`\nHELD BACK (${heldBack.length}) — name + class match, but 247 lists another school`)
for (const { r, c } of heldBack)
  console.log([r.name, r.cls, dash(c.national), dash(c.state), c.school, c.url].join(' | '))
console.log(`\nUNMATCHED football/basketball roster rows (${unmatched.length}) — on no ${state} list`)
for (const r of unmatched) console.log(`  ${r.cls} ${r.name} — ${r.sport} → ${r.college}`)
console.log(`\nREVERSE SWEEP (${reverse.length}) — 247 lists at ${school247}, not on our roster`)
for (const x of reverse)
  console.log(`  ${x.year} ${x.name} — ${x.sport} ${x.pos ?? ''} · ${x.stars}★ · natl ${dash(x.national)} · ${state} ${dash(x.state)} → ${x.commit ?? '—'} · ${x.url}`)
