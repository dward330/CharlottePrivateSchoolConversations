#!/usr/bin/env node
/**
 * check:reviewlinks — the Read Reviews links (src/data/reviewSites.ts, plan
 * `readreviews`) must stay well-formed, unambiguous, recorded and compliant.
 *
 * Fails when:
 *   - a review URL is not https, or its host is not that site's `host`;
 *   - one review URL is used by two schools;
 *   - a school in the `read-reviews` manifest topic has no REVIEW_LINKS entry,
 *     or a REVIEW_LINKS school has no `read-reviews` research;
 *   - a review URL does not appear in that school's research file under
 *     source-material/read-reviews/<slug>/ (so a link cannot change without
 *     its dated record);
 *   - a SCHOOL_MAPS `embed` is not Google's own keyless embed
 *     (https://www.google.com/maps/embed?pb=…), a `link` is not an https Google
 *     Maps URL, an `apple` link is not https://maps.apple.com/? with both
 *     `address` and `q`, or one embed is used by two schools;
 *   - a map's embed, link or apple URL does not appear in that school's
 *     research file (the same trace the review links get);
 *   - a site has `logo` without `logoBasis`, a `logo` is a remote URL rather
 *     than a file under public/review-sites/, or that file does not exist (the
 *     logo rule in the plan: a logo ships only with a recorded basis).
 *
 * DELIBERATELY NOT FETCHED, like check:schoolurls: Niche and SchoolDigger answer
 * 403 to any script, and a build gate must not fail on someone else's outage.
 * Each school's research file carries the date its links were checked in a
 * browser instead.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = setup error.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const TOPIC = 'read-reviews'

let REVIEW_SITES, REVIEW_LINKS, SCHOOL_MAPS
try {
  ;({ REVIEW_SITES, REVIEW_LINKS, SCHOOL_MAPS } = await import('../src/data/reviewSites.ts'))
} catch (e) {
  console.error(`check:reviewlinks — cannot import src/data/reviewSites.ts: ${e.message}`)
  process.exit(2)
}
if (!Array.isArray(REVIEW_SITES) || !REVIEW_LINKS || !SCHOOL_MAPS) {
  console.error('check:reviewlinks — reviewSites.ts did not export REVIEW_SITES, REVIEW_LINKS and SCHOOL_MAPS')
  process.exit(2)
}

const manifest = JSON.parse(readFileSync(join(ROOT, 'src/data/schools.json'), 'utf8'))
const withTopic = new Set(
  manifest.matrix.filter((m) => m.topic_slug === TOPIC && m.doc_count > 0).map((m) => m.school_slug),
)

const problems = []
const fail = (msg) => problems.push(msg)

const parse = (u) => {
  try { return new URL(u) } catch { return null }
}

/** Every research file for one school, concatenated. */
function research(slug) {
  const dir = join(ROOT, 'source-material', TOPIC, slug)
  if (!existsSync(dir)) return ''
  return readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => readFileSync(join(dir, f), 'utf8')).join('\n')
}

// ---------------------------------------------------------------- sites -----

const siteByKey = new Map(REVIEW_SITES.map((s) => [s.key, s]))
for (const s of REVIEW_SITES) {
  if (s.logo === undefined && s.logoBasis === undefined) continue
  if (s.logo && !s.logoBasis) {
    fail(`${s.key}: has a logo but no logoBasis — a logo ships only with published terms or written permission`)
    continue
  }
  if (!s.logo) continue
  if (/^[a-z]+:|^\/\//i.test(s.logo)) {
    fail(`${s.key}: logo ${s.logo} is a remote URL — logos are never hot-linked; ship a file under public/review-sites/`)
    continue
  }
  if (!s.logo.startsWith('/review-sites/')) {
    fail(`${s.key}: logo ${s.logo} is not under public/review-sites/`)
    continue
  }
  if (!existsSync(join(ROOT, 'public', s.logo))) fail(`${s.key}: logo file public${s.logo} does not exist`)
}

// ---------------------------------------------------------------- links -----

const seenUrl = new Map()
for (const [slug, links] of Object.entries(REVIEW_LINKS)) {
  if (!withTopic.has(slug)) fail(`${slug}: has REVIEW_LINKS but no source-material/${TOPIC}/ research in the manifest`)
  const record = research(slug)
  for (const [key, url] of Object.entries(links)) {
    const site = siteByKey.get(key)
    if (!site) { fail(`${slug}: unknown review site "${key}"`); continue }
    const u = parse(url)
    if (!u || u.protocol !== 'https:') { fail(`${slug} ${key}: ${url} is not an https URL`); continue }
    if (u.host !== site.host) fail(`${slug} ${key}: host ${u.host} is not ${site.host}`)
    if (seenUrl.has(url)) fail(`${slug} ${key}: ${url} is also used by ${seenUrl.get(url)}`)
    else seenUrl.set(url, slug)
    if (!record.includes(url)) fail(`${slug} ${key}: ${url} is not in source-material/${TOPIC}/${slug}/ — record the verified link first`)
  }
}
for (const slug of withTopic) {
  if (!REVIEW_LINKS[slug]) fail(`${slug}: has ${TOPIC} research but no REVIEW_LINKS entry`)
}

// ---------------------------------------------------------------- maps ------

const EMBED = 'https://www.google.com/maps/embed?pb='
const GOOGLE_HOSTS = new Set(['www.google.com', 'google.com', 'maps.google.com', 'maps.app.goo.gl', 'goo.gl'])
const seenEmbed = new Map()
for (const [slug, m] of Object.entries(SCHOOL_MAPS)) {
  if (typeof m.embed !== 'string' || !m.embed.startsWith(EMBED) || m.embed.length <= EMBED.length) {
    fail(`${slug} map: embed is not Google's own embed URL (${EMBED}…)`)
  } else if (seenEmbed.has(m.embed)) {
    fail(`${slug} map: embed is also used by ${seenEmbed.get(m.embed)}`)
  } else seenEmbed.set(m.embed, slug)
  const l = parse(m.link)
  if (!l || l.protocol !== 'https:' || !GOOGLE_HOSTS.has(l.host) || (l.host.endsWith('google.com') && !l.pathname.startsWith('/maps'))) {
    fail(`${slug} map: link ${m.link} is not an https Google Maps URL`)
  }
  const a = parse(m.apple)
  if (!a || a.protocol !== 'https:' || a.host !== 'maps.apple.com' || a.pathname !== '/' || !a.searchParams.get('address') || !a.searchParams.get('q')) {
    fail(`${slug} map: apple ${m.apple} is not https://maps.apple.com/? with both address and q`)
  }
  if (!REVIEW_LINKS[slug]) fail(`${slug} map: has a map but no review links — the map only lives inside Read Reviews`)
  const record = research(slug)
  for (const k of ['embed', 'link', 'apple']) {
    if (typeof m[k] === 'string' && !record.includes(m[k])) {
      fail(`${slug} map: ${k} is not in source-material/${TOPIC}/${slug}/ — record the verified URL first`)
    }
  }
}

// ---------------------------------------------------------------- report ----

const nLinks = Object.values(REVIEW_LINKS).reduce((n, l) => n + Object.keys(l).length, 0)
if (problems.length) {
  console.error(`check:reviewlinks — ${problems.length} problem(s):`)
  for (const p of problems) console.error(`  ✗ ${p}`)
  process.exit(1)
}
console.log(
  `check:reviewlinks — ${nLinks} review links across ${Object.keys(REVIEW_LINKS).length} schools, ` +
    `${Object.keys(SCHOOL_MAPS).length} map(s), ${REVIEW_SITES.filter((s) => s.logo).length} logo file(s): all clean`,
)
