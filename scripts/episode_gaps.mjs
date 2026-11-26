#!/usr/bin/env node
/**
 * What has the show already covered, and what does the app hold that it has not?
 *
 * The computed half of the /episode-ideas skill. It prints:
 *
 *   1. every published episode of *Charlotte Private School Conversations*, from
 *      the LIVE feed (Apple's public lookup), joined to src/data/podcastEpisodes.ts
 *   2. the drift between the two: an episode that is live but not yet in the
 *      table is still PUBLISHED, and must never be suggested again
 *   3. the school x research-area grid: episode ids where one exists, "open"
 *      where the app holds research and no episode covers it, blank where the
 *      app holds nothing
 *   4. the open pairs, grouped by area
 *
 * Why the live feed and not only the table: adding a published episode to
 * podcastEpisodes.ts is a separate PR that trails the release, so the table is
 * a lower bound on what is published. A suggestion checked only against the
 * table can duplicate last week's episode.
 *
 * The grid is a first filter, never the whole duplicate check. An episode maps
 * to ONE research area but its title names its angle (episode 1 is STEM, inside
 * Course Offerings), so "this pair has an episode" does not mean every angle of
 * the area is spoken for, and a cross-area theme never shows in the grid at
 * all. The skill reads every title and description for that.
 *
 * Usage:
 *   node scripts/episode_gaps.mjs             # live feed + table + grid
 *   node scripts/episode_gaps.mjs --offline   # table + grid only (say so in the report)
 *   node scripts/episode_gaps.mjs --json      # machine-readable, same content
 *
 * Exit codes: 0 = printed, 2 = setup error, 3 = the live feed could not be
 * read (nothing is silently skipped: rerun, or pass --offline and check the
 * show page in a browser).
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OFFLINE = process.argv.includes('--offline')
const JSON_OUT = process.argv.includes('--json')
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const SHOW_ID = '1894103555'
const LOOKUP_LIMIT = 200
const LOOKUP_URL = `https://itunes.apple.com/lookup?id=${SHOW_ID}&entity=podcastEpisode&limit=${LOOKUP_LIMIT}`

/**
 * Areas that hold nothing an episode could be made from. Read Reviews is links
 * only: no rating, grade or review text is ever in the repo.
 */
const NO_EPISODE_AREAS = new Set(['read-reviews'])

let manifest
let src
try {
  manifest = JSON.parse(readFileSync(resolve(REPO_ROOT, 'src/data/schools.json'), 'utf8'))
  src = readFileSync(resolve(REPO_ROOT, 'src/data/podcastEpisodes.ts'), 'utf8')
} catch (err) {
  console.error(`episode_gaps: could not read inputs: ${err.message}`)
  process.exit(2)
}

/** Same row shape check_podcast_episodes.mjs parses, plus `fullTitle`. */
function parseEpisodes(text) {
  const start = text.indexOf('export const EPISODES')
  if (start === -1) throw new Error('EPISODES array not found')
  const body = text.slice(start)
  const out = []
  const rowRe = /\{\s*\n\s*id:\s*(\d+),([\s\S]*?)\n  \},/g
  let m
  while ((m = rowRe.exec(body)) !== null) {
    const block = m[2]
    const str = (field) => {
      const hit = block.match(new RegExp(`\\n\\s*${field}:\\s*\\n?\\s*('((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`))
      return hit ? (hit[2] ?? hit[3]).replace(/\\(['"])/g, '$1') : null
    }
    const schoolsHit = block.match(/schools:\s*\[([\s\S]*?)\]/)
    const areaHit = block.match(/researchArea:\s*(null|'([^']*)')/)
    const appleUrl = str('appleUrl')
    out.push({
      id: Number(m[1]),
      title: str('title'),
      fullTitle: str('fullTitle'),
      appleUrl,
      trackId: appleUrl?.match(/[?&]i=(\d+)/)?.[1] ?? null,
      schools: schoolsHit ? [...schoolsHit[1].matchAll(/'([^']*)'/g)].map((s) => s[1]) : [],
      researchArea: areaHit ? (areaHit[2] ?? null) : null,
    })
  }
  return out
}

let episodes
try {
  episodes = parseEpisodes(src)
  if (episodes.length === 0) throw new Error('parsed 0 episodes')
} catch (err) {
  console.error(`episode_gaps: could not parse the episode table: ${err.message}`)
  process.exit(2)
}

// ── The live feed ────────────────────────────────────────────────────────────
let feed = null
let feedError = null
if (!OFFLINE) {
  try {
    const res = await fetch(LOOKUP_URL, { signal: AbortSignal.timeout(30_000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    feed = json.results
      .filter((r) => r.wrapperType === 'podcastEpisode')
      .map((r) => ({
        trackId: String(r.trackId),
        title: r.trackName,
        released: (r.releaseDate ?? '').slice(0, 10),
        description: (r.description ?? r.shortDescription ?? '').replace(/\s+/g, ' ').trim(),
        url: r.trackViewUrl,
      }))
      .sort((a, b) => a.released.localeCompare(b.released))
    if (feed.length === 0) throw new Error('the lookup returned no episodes')
  } catch (err) {
    feedError = err.message
  }
}

const byTrack = new Map(episodes.map((e) => [e.trackId, e]))
const feedTracks = new Set((feed ?? []).map((f) => f.trackId))
const liveNotInTable = (feed ?? []).filter((f) => !byTrack.has(f.trackId))
const tableNotInFeed = feed ? episodes.filter((e) => !feedTracks.has(e.trackId)) : []
const feedTruncated = feed !== null && feed.length >= LOOKUP_LIMIT

// ── The grid ─────────────────────────────────────────────────────────────────
const schools = manifest.schools
const topics = manifest.topics.filter((t) => !NO_EPISODE_AREAS.has(t.slug))
const docCount = new Map(manifest.matrix.map((c) => [`${c.school_slug}|${c.topic_slug}`, c.doc_count]))

const cells = []
for (const s of schools) {
  for (const t of topics) {
    const docs = docCount.get(`${s.slug}|${t.slug}`) ?? 0
    const ids = episodes
      .filter((e) => e.researchArea === t.slug && e.schools.includes(s.slug))
      .map((e) => e.id)
    cells.push({ school: s.slug, area: t.slug, docs, episodes: ids })
  }
}
const open = cells.filter((c) => c.docs > 0 && c.episodes.length === 0)
const episodeWithoutResearch = cells.filter((c) => c.docs === 0 && c.episodes.length > 0)

if (JSON_OUT) {
  // A pipe is written asynchronously, so process.exit() here cut the output at 64 KB.
  process.exitCode = feedError ? 3 : 0
  console.log(
    JSON.stringify(
      {
        generated: new Date().toISOString().slice(0, 10),
        feedChecked: feed !== null,
        feedError,
        feedTruncated,
        published: episodes.map((e) => {
          const f = (feed ?? []).find((x) => x.trackId === e.trackId)
          return { ...e, released: f?.released ?? null, description: f?.description ?? null }
        }),
        liveNotInTable,
        tableNotInFeed: tableNotInFeed.map((e) => e.id),
        cells,
        open,
      },
      null,
      2,
    ),
  )
}

if (!JSON_OUT) {
const name = (slug, list) => list.find((x) => x.slug === slug)?.name ?? slug
const line = (s = '') => console.log(s)

line('# Charlotte Private School Conversations: what is published, what is open')
line()
if (OFFLINE) {
  line('⚠️  --offline: the live feed was NOT read. The table below is a lower bound on what')
  line('    is published. Check the show page before trusting any "open" pair.')
} else if (feedError) {
  line(`⛔ The live feed could not be read (${feedError}).`)
  line('    The table below is a lower bound on what is published. Rerun, or open the show')
  line('    page in a browser and compare its newest episodes by hand.')
} else {
  line(`Live feed: ${feed.length} episodes · table: ${episodes.length} rows`)
  if (feedTruncated) {
    line(`⚠️  The lookup returned its ${LOOKUP_LIMIT}-episode maximum, so older episodes may be cut off.`)
  }
}
line()

if (liveNotInTable.length > 0) {
  line(`## ⛔ Published but NOT in podcastEpisodes.ts (${liveNotInTable.length})`)
  line('These are live episodes. Treat each as published when judging a suggestion, and')
  line('tell the user the table needs them (a separate PR).')
  line()
  for (const f of liveNotInTable) {
    line(`- ${f.released} · ${f.title}`)
    line(`  ${f.url}`)
    if (f.description) line(`  ${f.description.slice(0, 400)}`)
  }
  line()
}
if (tableNotInFeed.length > 0) {
  line(`## ⚠️ In the table but not in the live feed (${tableNotInFeed.length})`)
  for (const e of tableNotInFeed) line(`- #${e.id} ${e.fullTitle ?? e.title}`)
  line()
}

line(`## Published episodes (${episodes.length} in the table)`)
line()
for (const e of episodes) {
  const f = (feed ?? []).find((x) => x.trackId === e.trackId)
  const area = e.researchArea ? name(e.researchArea, manifest.topics) : 'no research area'
  line(`#${e.id} · ${f?.released ?? 'date n/a'} · ${area} · ${e.schools.join(', ')}`)
  line(`   ${e.fullTitle ?? e.title}`)
  if (f?.description) line(`   ${f.description.slice(0, 300)}`)
}
line()

line('## Grid: school × research area')
line('episode ids = covered · open = research in the app, no episode · blank = no research')
line()
const colW = 9
const head = topics.map((t) => t.slug.slice(0, colW - 1).padEnd(colW)).join('')
line(`${''.padEnd(26)}${head}`)
for (const s of schools) {
  const row = topics
    .map((t) => {
      const c = cells.find((x) => x.school === s.slug && x.area === t.slug)
      const v = c.episodes.length ? c.episodes.join(',') : c.docs > 0 ? 'open' : ''
      return v.slice(0, colW - 1).padEnd(colW)
    })
    .join('')
  line(`${s.slug.padEnd(26)}${row}`)
}
line()

line(`## Open pairs: research in the app, no episode (${open.length})`)
line()
for (const t of topics) {
  const hits = open.filter((c) => c.area === t.slug)
  const covered = cells.filter((c) => c.area === t.slug && c.episodes.length > 0).length
  const withDocs = cells.filter((c) => c.area === t.slug && c.docs > 0).length
  line(`${t.name} (${t.slug}): ${covered} of ${withDocs} schools covered`)
  if (hits.length) line(`   open: ${hits.map((c) => `${c.school} (${c.docs} docs)`).join(', ')}`)
}
line()

if (episodeWithoutResearch.length > 0) {
  line('## Episodes on a pair the app holds no research for (nothing to build an update from)')
  for (const c of episodeWithoutResearch) line(`- ${c.school} × ${c.area}: #${c.episodes.join(', #')}`)
  line()
}

line('The grid is a first filter. An episode maps to one area but its title names its angle,')
line('and a theme that crosses areas never shows here. Read every title above before calling')
line('an idea new.')

process.exitCode = feedError ? 3 : 0
}
