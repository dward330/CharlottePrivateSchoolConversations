#!/usr/bin/env node
/**
 * Validate src/data/podcastEpisodes.ts against src/data/schools.json.
 *
 * The failure this guards against is invisible by construction. A row naming a
 * school or research-area slug that doesn't exist renders NOTHING — no error,
 * no console warning, no layout change — which is byte-for-byte what the
 * legitimate "this area has no episode" case looks like. Davidson Day's After
 * School section is genuinely empty, so an empty section is never evidence of a
 * bug. Only this check can tell the two apart.
 *
 * Checks:
 *   1. every schools[] entry is a real school slug in schools.json
 *   2. every non-null researchArea is a real topic slug in schools.json
 *   3. ids are unique and cover 1..N with no gaps
 *   4. every spotifyUrl is a well-formed open.spotify.com episode URL
 *   5. every appleUrl is a well-formed id1894103555?i=<digits> URL
 *   6. no two episodes share a Spotify or Apple URL (a copy-paste slip that
 *      would silently point two episodes at the same audio)
 *   7. schools[] is non-empty and free of duplicates
 *
 * The episode table is parsed from the TypeScript source rather than imported,
 * so this runs under plain node with no build step — the same approach
 * check_seo.mjs takes with TRANSLATED in src/lib/i18n.ts.
 *
 * Usage: node scripts/check_podcast_episodes.mjs [--quiet]
 * Exit codes: 0 = clean, 1 = problems found, 2 = script/setup error.
 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const QUIET = process.argv.includes('--quiet')
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const EPISODES_SRC = resolve(REPO_ROOT, 'src/data/podcastEpisodes.ts')
const SCHOOLS_JSON = resolve(REPO_ROOT, 'src/data/schools.json')

const SPOTIFY_EPISODE_RE = /^https:\/\/open\.spotify\.com\/episode\/[A-Za-z0-9]+$/
const APPLE_EPISODE_RE =
  /^https:\/\/podcasts\.apple\.com\/us\/podcast\/charlotte-private-school-conversations\/id1894103555\?i=\d+$/

const problems = []
const fail = (msg) => problems.push(msg)

let manifest
let src
try {
  manifest = JSON.parse(readFileSync(SCHOOLS_JSON, 'utf8'))
  src = readFileSync(EPISODES_SRC, 'utf8')
} catch (err) {
  console.error(`check:podcast — could not read inputs: ${err.message}`)
  process.exit(2)
}

const schoolSlugs = new Set(manifest.schools.map((s) => s.slug))
const topicSlugs = new Set(manifest.topics.map((t) => t.slug))

/**
 * Pull each episode object out of the EPISODES array literal. Field order is
 * fixed by the type, so a per-field regex over each `{ … }` block is enough and
 * avoids pulling in a TypeScript parser for four dependencies' worth of repo.
 */
function parseEpisodes(text) {
  const start = text.indexOf('export const EPISODES')
  if (start === -1) throw new Error('EPISODES array not found')
  const body = text.slice(start)

  const out = []
  // Each row starts at a `{` that is followed by an `id:` line.
  const rowRe = /\{\s*\n\s*id:\s*(\d+),([\s\S]*?)\n  \},/g
  let m
  while ((m = rowRe.exec(body)) !== null) {
    const id = Number(m[1])
    const block = m[2]

    const str = (field) => {
      const hit = block.match(
        new RegExp(`${field}:\\s*\\n?\\s*('([^']*)'|"([^"]*)")`),
      )
      return hit ? (hit[2] ?? hit[3]) : null
    }

    const schoolsHit = block.match(/schools:\s*\[([\s\S]*?)\]/)
    const schools = schoolsHit
      ? [...schoolsHit[1].matchAll(/'([^']*)'/g)].map((s) => s[1])
      : []

    const areaHit = block.match(/researchArea:\s*(null|'([^']*)')/)
    const researchArea = areaHit ? (areaHit[2] ?? null) : undefined

    out.push({
      id,
      title: str('title'),
      spotifyUrl: str('spotifyUrl'),
      appleUrl: str('appleUrl'),
      schools,
      researchArea,
    })
  }
  return out
}

let episodes
try {
  episodes = parseEpisodes(src)
} catch (err) {
  console.error(`check:podcast — could not parse the episode table: ${err.message}`)
  process.exit(2)
}

if (episodes.length === 0) {
  console.error('check:podcast — parsed zero episodes; the table shape has changed.')
  process.exit(2)
}

// 3. ids unique and contiguous from 1
const ids = episodes.map((e) => e.id)
const dupeIds = ids.filter((id, i) => ids.indexOf(id) !== i)
if (dupeIds.length) fail(`duplicate episode id(s): ${[...new Set(dupeIds)].join(', ')}`)
const maxId = Math.max(...ids)
for (let want = 1; want <= maxId; want++) {
  if (!ids.includes(want)) fail(`episode id ${want} is missing (ids run 1..${maxId})`)
}

const seenSpotify = new Map()
const seenApple = new Map()

for (const e of episodes) {
  const at = `episode ${e.id}`

  // 1. school slugs
  if (e.schools.length === 0) fail(`${at}: schools[] is empty`)
  const dupeSchools = e.schools.filter((s, i) => e.schools.indexOf(s) !== i)
  if (dupeSchools.length) fail(`${at}: duplicate school slug ${dupeSchools.join(', ')}`)
  for (const s of e.schools) {
    if (!schoolSlugs.has(s)) {
      fail(`${at}: "${s}" is not a school slug in schools.json — this row renders nothing`)
    }
  }

  // 2. research-area slug
  if (e.researchArea === undefined) {
    fail(`${at}: researchArea is missing`)
  } else if (e.researchArea !== null && !topicSlugs.has(e.researchArea)) {
    fail(
      `${at}: "${e.researchArea}" is not a topic slug in schools.json — this row renders nothing`,
    )
  }

  // 4/5. URL shapes
  if (!e.spotifyUrl || !SPOTIFY_EPISODE_RE.test(e.spotifyUrl)) {
    fail(`${at}: malformed spotifyUrl (${e.spotifyUrl ?? 'missing'})`)
  }
  if (!e.appleUrl || !APPLE_EPISODE_RE.test(e.appleUrl)) {
    fail(`${at}: malformed appleUrl (${e.appleUrl ?? 'missing'})`)
  }

  // 6. no shared URLs
  if (e.spotifyUrl) {
    if (seenSpotify.has(e.spotifyUrl)) {
      fail(`${at}: shares its spotifyUrl with episode ${seenSpotify.get(e.spotifyUrl)}`)
    } else seenSpotify.set(e.spotifyUrl, e.id)
  }
  if (e.appleUrl) {
    if (seenApple.has(e.appleUrl)) {
      fail(`${at}: shares its appleUrl with episode ${seenApple.get(e.appleUrl)}`)
    } else seenApple.set(e.appleUrl, e.id)
  }

  if (!e.title) fail(`${at}: title is missing`)
}

if (problems.length) {
  console.error(`check:podcast — ${problems.length} problem(s):\n`)
  for (const p of problems) console.error(`  ✗ ${p}`)
  process.exit(1)
}

if (!QUIET) {
  const mapped = episodes.filter((e) => e.researchArea !== null).length
  const cells = new Set()
  for (const e of episodes) {
    if (e.researchArea === null) continue
    for (const s of e.schools) cells.add(`${s}|${e.researchArea}`)
  }
  const total = schoolSlugs.size * topicSlugs.size
  console.log(
    `check:podcast — ${episodes.length} episodes clean ` +
      `(${mapped} mapped to a research area, ${episodes.length - mapped} page-level); ` +
      `${cells.size} of ${total} school×topic cells have an episode.`,
  )
}
