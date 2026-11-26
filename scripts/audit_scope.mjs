#!/usr/bin/env node
/**
 * What a branch changed, as the cards and areas a browser audit should visit.
 *
 * WHY THIS EXISTS. audit:daterender, audit:moneyrender and audit:mobile used to
 * load every school page, every Compare topic and every admissions checklist
 * band in every locale they cover, and open and scan every card. The
 * trinitycamps Phase 2 run of audit:daterender was still going at 33 minutes. It
 * was stopped, and a scan of the one changed section did the same job in about
 * a minute. Most branches change only data or translations, so most of a full
 * sweep re-checks pages nobody touched.
 *
 * This module turns `git diff <merge-base>` into a scope: per school page, the
 * cards (or whole areas) whose data changed, plus the Compare topics and
 * admissions checklists that render the same data. The three audits import it,
 * so the rules live in exactly one place, the same lesson as i18n_topics.mjs.
 * Each audit then opens only those cards, through their deep links
 * (`/school/<slug>/#<area>/<card>`), and scans only them.
 *
 * THE FULL SWEEP IS AUTOMATIC, never a flag someone must remember. A changed
 * path in any of these switches the run to the full sweep and prints why:
 *   src/components/**  src/pages/**  src/lib/**  src/locales/*.json  any *.css
 *   src/App.tsx  src/main.tsx  index.html  vite.config.*  public/**
 *   src/data/brands.ts  src/data/highSchools.ts   (both render on every page)
 *   scripts/audit_*.mjs  (this file included)
 * So does ANY `src/` path no rule below recognizes. A scoped run that quietly
 * skipped a cross-page render bug would be a check whose sample doubles as its
 * coverage, which is exactly the defect these audits exist to catch. `--all` on
 * any audit forces the full sweep.
 *
 * What maps where (card-level where a data key is a card, area-level otherwise):
 *   src/data/<topic dir>/<slug>.ts   base vs head, per top-level key -> that card,
 *                                    or the area for a key that is not a card
 *   topic loaders (sportsProgram.ts…) that area on every school that has it
 *   courseOfferings / financialAidReports / clubCatalog / clubClusters
 *                                    accessor(slug) base vs head -> the area
 *   metricValues.ts                  per VALUE_METRICS key -> the topic's area on
 *                                    the changed schools (or every school), plus
 *                                    that Compare topic
 *   collegeMemberships/Rankings/Urls college-support on every school
 *   wellsFargoCup.ts                 sports:cup on every school with a cup card
 *   artsMatrix.ts                    the-arts on every school
 *   podcastEpisodes.ts               the whole page of each school whose episodes changed
 *   schools.json                     per school x topic documents -> the area; a
 *                                    new school -> its whole page, every Compare
 *                                    topic and its checklist
 *   src/content/<topic>/<slug>.json  the area
 *   overlays (work + built)          every stamp added, removed or retranslated ->
 *                                    its `at` locations -> card or area
 *   src/**\/*.md                      nothing (READMEs and NOTES.md never render)
 *   anything outside src/, index.html and public/   nothing
 *
 * The scope is locale-independent: a translation change in one locale audits
 * that card in every locale the audit covers.
 *
 * Usage:
 *   npm run audit:scope                         # vs main, prints reasons + summary
 *   npm run audit:scope -- --since <ref>        # vs another ref (merge-base with HEAD)
 *   npm run audit:scope -- --json
 *   npm run audit:scope -- --repo <worktree> --since <ref>   # scope another checkout
 * Uncommitted and untracked changes count, so it works before you commit.
 * Exit 0 always (it is a report).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { ACCESSORS, EXPORTS, EXTRA_LAYERS, SLUGS, TOPICS } from './i18n_topics.mjs'

// The checkout being scoped. This repo by default; `--repo <dir>` (or the
// `repo` option) points it at another worktree, which is how the verification
// fixtures are run without this script's own presence forcing a full sweep.
let ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 })

/* ---------- tables read from the checkout ---------- */

let LINKS, CARD_KEYS, TOPIC_ORDER
function loadTables() {
  // card:<topic>:<key>[@slug] -> card link, from the check:cardlink snapshot
  // (kept current by every build), so the card set is never hardcoded here.
  // A checkout older than the snapshot (pre-#493) borrows this script's own copy.
  const own = join(dirname(fileURLToPath(import.meta.url)), 'card_link_names.json')
  const theirs = join(ROOT, 'scripts/card_link_names.json')
  LINKS = JSON.parse(readFileSync(existsSync(theirs) ? theirs : own, 'utf8'))
  CARD_KEYS = {}
  for (const k of Object.keys(LINKS)) {
    const m = k.match(/^card:([^:]+):([^@]+)/)
    if (m) (CARD_KEYS[m[1]] ??= new Set()).add(m[2])
  }
  // Area order on the school page: TOPIC_ORDER in src/lib/metrics.ts; a topic
  // it does not list sorts after it, alphabetically.
  const src = readFileSync(join(ROOT, 'src/lib/metrics.ts'), 'utf8')
  const m = src.match(/const TOPIC_ORDER[^=]*=\s*\[([\s\S]*?)\]/)
  TOPIC_ORDER = m ? [...m[1].replace(/\/\/.*$/gm, '').matchAll(/'([^']+)'/g)].map((x) => x[1]) : []
}
loadTables()
const orderOf = (t) => { const i = TOPIC_ORDER.indexOf(t); return i === -1 ? 1000 + t.charCodeAt(0) : i }

const RENDER_CODE = [
  /^src\/components\//, /^src\/pages\//, /^src\/lib\//, /^src\/locales\/[^/]+\.json$/, /\.css$/,
  /^src\/App\.tsx$/, /^src\/main\.tsx$/, /^index\.html$/, /^vite\.config\./, /^public\//,
  /^scripts\/audit_[^/]+\.mjs$/,
  /^src\/data\/brands\.ts$/, /^src\/data\/highSchools\.ts$/,
]

/** Topic loader modules (types + overlay wiring) -> their topic. */
const LOADERS = {
  'src/data/admissionsPrograms.ts': 'admissions',
  'src/data/afterSchool.ts': 'after-school',
  'src/data/artsProgram.ts': 'the-arts',
  'src/data/clubsProgram.ts': 'student-clubs',
  'src/data/sportsProgram.ts': 'sports',
  'src/data/summerPrograms.ts': 'summer-programs',
  'src/data/collegeSupport.ts': 'college-support',
  'src/data/highSchoolPlacement.ts': 'high-school-placement',
  'src/data/internationalTravel.ts': 'international-travel',
  'src/data/learningSupport.ts': 'learning-support',
}

/** Single-module accessors: path -> [export, page topic]. */
const ACCESSOR_MODULES = {
  [ACCESSORS['course-offerings'][0].replace('../', '')]: [ACCESSORS['course-offerings'][1], 'course-offerings'],
  [ACCESSORS['financial-aid-report'][0].replace('../', '')]: [ACCESSORS['financial-aid-report'][1], 'financial-aid-tuition'],
  ...Object.fromEntries(EXTRA_LAYERS['student-clubs'].map(([, p, fn]) => [p.replace('../', ''), [fn, 'student-clubs']])),
}

const EVERY_SCHOOL = {
  'src/data/collegeMemberships.ts': 'college-support',
  'src/data/collegeRankings.ts': 'college-support',
  'src/data/collegeUrls.ts': 'college-support',
  'src/data/artsMatrix.ts': 'the-arts',
  // Read Reviews has no cards, so a change visits the area by its #read-reviews link.
  'src/data/reviewSites.ts': 'read-reviews',
}

/** Overlay topic -> the page topic its strings render in. */
const OVERLAY_PAGE_TOPIC = { 'financial-aid-report': 'financial-aid-tuition' }

const DIR_TOPIC = Object.fromEntries(Object.entries(TOPICS).filter(([, d]) => d).map(([t, d]) => [d, t]))

/* ---------- helpers ---------- */

/** JSON with sorted keys; functions by source, so a changed accessor still differs. */
function stable(v) {
  return JSON.stringify(v, (_k, x) => {
    if (typeof x === 'function') return `ƒ${x.toString()}`
    if (x instanceof Set) return [...x].sort()
    if (x instanceof Map) return Object.fromEntries([...x].sort())
    if (x && typeof x === 'object' && !Array.isArray(x)) {
      return Object.fromEntries(Object.keys(x).sort().map((k) => [k, x[k]]))
    }
    return x
  })
}

function readJSON(p) {
  try { return JSON.parse(readFileSync(join(ROOT, p), 'utf8')) } catch { return null }
}
function baseJSON(base, p) {
  try { return JSON.parse(git('show', `${base}:${p}`)) } catch { return null }
}

/** `git archive <base> src` into a per-SHA temp folder, reused across runs. */
function baseTree(base) {
  // Not under node_modules: Node refuses to strip TypeScript types there
  // (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING), so the .ts modules would not import.
  const dir = join(tmpdir(), 'audit-scope', base)
  if (existsSync(join(dir, '.complete'))) return dir
  const tmp = `${dir}.tmp-${process.pid}`
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp, { recursive: true })
  execFileSync('sh', ['-c', `git archive ${base} src | tar -x -C "${tmp}"`], { cwd: ROOT })
  // The repo's package.json says "type": "module"; the snapshot needs the same.
  writeFileSync(join(tmp, 'package.json'), '{"type":"module"}\n')
  writeFileSync(join(tmp, '.complete'), '')
  rmSync(dir, { recursive: true, force: true })
  renameSync(tmp, dir)
  return dir
}

const importAt = async (root, rel) => import(pathToFileURL(join(root, rel)).href)

/* ---------- the scope accumulator ---------- */

class Scope {
  constructor() {
    this.full = false
    this.reasons = []
    this.pages = new Map() // slug -> { slug, whole, areas: Map<topic, Set|'*'> }
    this.compare = new Set()
    this.checklist = new Set()
    this.allCompare = false
  }
  reason(s) { if (!this.reasons.includes(s)) this.reasons.push(s) }
  page(slug) {
    if (!this.pages.has(slug)) this.pages.set(slug, { slug, whole: false, areas: new Map() })
    return this.pages.get(slug)
  }
  goFull(why) { this.full = true; this.reason(`${why} → full`) }
  whole(slug, why) { this.page(slug).whole = true; this.reason(`${why} → ${slug} (whole page)`) }
  area(slug, topic, why) {
    this.page(slug).areas.set(topic, '*')
    this.reason(`${why} → ${slug} ${topic} (area)`)
  }
  card(slug, topic, key, why) {
    if (!CARD_KEYS[topic]?.has(key)) return this.area(slug, topic, `${why} [${key}: not a card]`)
    const p = this.page(slug)
    const cur = p.areas.get(topic)
    if (cur === '*') return this.reason(`${why} → ${slug} ${topic}:${key} (area already in scope)`)
    if (!cur) p.areas.set(topic, new Set([key]))
    else cur.add(key)
    this.reason(`${why} → ${slug} ${topic}:${key}`)
  }
}

/** Every school that has `topic`, from the manifest plus the per-school modules. */
function schoolsWith(topic, manifest) {
  const out = new Set()
  for (const m of manifest?.matrix ?? []) if (m.topic_slug === topic) out.add(m.school_slug)
  const dir = TOPICS[topic]
  if (dir) for (const s of SLUGS) if (existsSync(join(ROOT, `src/data/${dir}/${s}.ts`))) out.add(s)
  return SLUGS.filter((s) => out.has(s))
}

/* ---------- per-path rules ---------- */

async function perSchoolModule(S, path, dir, slug, ctx) {
  const topic = DIR_TOPIC[dir]
  const inBase = ctx.baseHas(path), inHead = existsSync(join(ROOT, path))
  if (!inBase || !inHead) return S.area(slug, topic, `${path} (${inHead ? 'new' : 'deleted'} file)`)
  let b, h
  try { h = await importAt(ROOT, path) } catch (e) { return S.area(slug, topic, `${path}: could not import head (${e.message.split('\n')[0]})`) }
  try { b = await importAt(ctx.baseDir(), path) } catch (e) { return S.area(slug, topic, `${path}: could not import base (${e.message.split('\n')[0]})`) }
  const name = EXPORTS[slug]
  const ho = name && h[name] ? h[name] : h, bo = name && b[name] ? b[name] : b
  const keys = new Set([...Object.keys(ho ?? {}), ...Object.keys(bo ?? {})])
  let any = false
  for (const k of keys) {
    if (stable(ho?.[k]) === stable(bo?.[k])) continue
    any = true
    S.card(slug, topic, k, path)
  }
  if (!any) S.reason(`${path} → no top-level key changed (comments or formatting only)`)
}

async function accessorModule(S, path, [fn, topic], ctx) {
  let h, b
  try { h = (await importAt(ROOT, path))[fn] } catch (e) { h = e }
  try { b = ctx.baseHas(path) ? (await importAt(ctx.baseDir(), path))[fn] : null } catch (e) { b = e }
  if (h instanceof Error || b instanceof Error || typeof h !== 'function') {
    const why = (h instanceof Error ? h : b instanceof Error ? b : new Error('no accessor')).message.split('\n')[0]
    for (const s of schoolsWith(topic, ctx.manifest)) S.area(s, topic, `${path}: could not compare (${why})`)
    return
  }
  let any = false
  for (const s of SLUGS) {
    let hv, bv
    try { hv = stable(h(s)) } catch { hv = 'ERR' }
    try { bv = b ? stable(b(s)) : 'MISSING' } catch { bv = 'ERR' }
    if (hv !== bv) { any = true; S.area(s, topic, path) }
  }
  if (!any) S.reason(`${path} → no school's ${fn}() changed`)
}

async function metricValues(S, path, ctx) {
  let H, B
  try { H = (await importAt(ROOT, path)).VALUE_METRICS } catch (e) { H = e }
  try { B = ctx.baseHas(path) ? (await importAt(ctx.baseDir(), path)).VALUE_METRICS : [] } catch (e) { B = e }
  if (H instanceof Error || B instanceof Error) {
    const why = (H instanceof Error ? H : B).message.split('\n')[0]
    for (const t of TOPIC_ORDER) for (const s of schoolsWith(t, ctx.manifest)) S.area(s, t, `${path}: could not compare (${why})`)
    S.allCompare = true
    return
  }
  const hk = new Map(H.map((m) => [m.key, m])), bk = new Map(B.map((m) => [m.key, m]))
  for (const key of new Set([...hk.keys(), ...bk.keys()])) {
    const h = hk.get(key), b = bk.get(key)
    if (stable(h) === stable(b)) continue
    const topic = (h ?? b).topic
    S.compare.add(topic)
    const why = `${path} [${key}]`
    const PER = ['values', 'subs', 'quals']
    const rest = (m) => stable(Object.fromEntries(Object.entries(m ?? {}).filter(([k]) => !PER.includes(k))))
    if (!h || !b || rest(h) !== rest(b) || h.topic !== b.topic) {
      for (const t of new Set([h?.topic, b?.topic].filter(Boolean))) {
        S.compare.add(t)
        for (const s of schoolsWith(t, ctx.manifest)) S.area(s, t, why)
      }
      continue
    }
    const slugs = new Set()
    for (const f of PER) {
      for (const s of new Set([...Object.keys(h[f] ?? {}), ...Object.keys(b[f] ?? {})])) {
        if (stable(h[f]?.[s]) !== stable(b[f]?.[s])) slugs.add(s)
      }
    }
    for (const s of slugs) S.area(s, topic, why)
  }
}

async function wellsFargoCup(S, path, ctx) {
  const dir = TOPICS.sports
  let n = 0
  for (const s of SLUGS) {
    const p = `src/data/${dir}/${s}.ts`
    let has = false
    try { const m = await importAt(ROOT, p); has = !!(m[EXPORTS[s]] ?? {}).cup } catch { /* no module */ }
    if (!has && ctx.baseHas(p)) {
      try { const m = await importAt(ctx.baseDir(), p); has = !!(m[EXPORTS[s]] ?? {}).cup } catch { /* ignore */ }
    }
    if (has) { n++; S.card(s, 'sports', 'cup', path) }
  }
  if (!n) S.reason(`${path} → no school has a cup card`)
}

async function podcastEpisodes(S, path, ctx) {
  let H, B
  try { H = (await importAt(ROOT, path)).EPISODES } catch (e) { H = e }
  try { B = ctx.baseHas(path) ? (await importAt(ctx.baseDir(), path)).EPISODES : [] } catch (e) { B = e }
  if (H instanceof Error || B instanceof Error) {
    for (const s of SLUGS) S.whole(s, `${path}: could not compare (${(H instanceof Error ? H : B).message.split('\n')[0]})`)
    return
  }
  const hk = new Map(H.map((e) => [e.id, e])), bk = new Map(B.map((e) => [e.id, e]))
  const slugs = new Set()
  for (const id of new Set([...hk.keys(), ...bk.keys()])) {
    const h = hk.get(id), b = bk.get(id)
    if (stable(h) !== stable(b)) for (const s of [...(h?.schools ?? []), ...(b?.schools ?? [])]) slugs.add(s)
  }
  for (const s of slugs) S.whole(s, path)
  if (!slugs.size) S.reason(`${path} → no episode changed`)
}

function schoolsJson(S, path, ctx, compareTopics) {
  const h = readJSON(path) ?? {}, b = baseJSON(ctx.base, path) ?? {}
  const bs = new Map((b.schools ?? []).map((s) => [s.slug, s]))
  for (const s of h.schools ?? []) {
    if (!bs.has(s.slug)) {
      S.whole(s.slug, `${path} (new school)`)
      for (const t of compareTopics) S.compare.add(t)
      S.checklist.add(s.slug)
    } else if (stable(bs.get(s.slug)) !== stable(s)) {
      S.whole(s.slug, `${path} (school entry changed)`)
    }
  }
  const group = (j) => {
    const m = new Map()
    for (const d of j.documents ?? []) {
      const k = `${d.school_slug}\u0000${d.topic_slug}`
      ;(m.get(k) ?? m.set(k, []).get(k)).push(d)
    }
    return m
  }
  const hg = group(h), bg = group(b)
  for (const k of new Set([...hg.keys(), ...bg.keys()])) {
    if (stable(hg.get(k)) === stable(bg.get(k))) continue
    const [slug, topic] = k.split('\u0000')
    if (!bs.has(slug) && !(h.schools ?? []).some((s) => s.slug === slug)) continue
    S.area(slug, topic, path)
  }
  if (stable(h.topics) !== stable(b.topics)) {
    // A renamed or added area: its header renders on every page that has it.
    const bt = new Map((b.topics ?? []).map((t) => [t.slug, stable(t)]))
    for (const t of h.topics ?? []) {
      if (bt.get(t.slug) !== stable(t)) for (const s of schoolsWith(t.slug, h)) S.area(s, t.slug, `${path} (topic ${t.slug} changed)`)
    }
  }
}

/** One overlay or work file: stamps added, removed or retranslated -> their `at`. */
async function overlayFile(S, path, topic, content, ctx) {
  const h = readJSON(path) ?? {}, b = baseJSON(ctx.base, path) ?? {}
  const pageTopic = OVERLAY_PAGE_TOPIC[topic] ?? topic
  // Collect `at` locations whose stamp changed.
  const locs = [] // [at, side]
  const units = (j) => {
    const m = new Map()
    for (const u of j.strings ?? j.sections ?? []) {
      const e = m.get(u.of) ?? { t: [], at: new Set() }
      e.t.push(u.t ?? '')
      for (const a of u.at ?? []) e.at.add(a)
      m.set(u.of, e)
    }
    return m
  }
  if (h.blocks || b.blocks) {
    // Built src/content overlay: { hash: translation }, no locations. Recover
    // them from the matching work file on either side.
    const wp = path.replace('src/data/overlays/', 'src/data/overlays/work/')
    const wh = units(readJSON(wp) ?? {}), wb = units(baseJSON(ctx.base, wp) ?? {})
    for (const of of new Set([...Object.keys(h.blocks ?? {}), ...Object.keys(b.blocks ?? {})])) {
      if ((h.blocks ?? {})[of] === (b.blocks ?? {})[of]) continue
      const at = [...(wh.get(of)?.at ?? []), ...(wb.get(of)?.at ?? [])]
      if (at.length) for (const a of at) locs.push([a, 'head'])
      else for (const s of schoolsWith(pageTopic, ctx.manifest)) S.area(s, pageTopic, `${path} [${of}: no location]`)
    }
  } else {
    const hu = units(h), bu = units(b)
    for (const of of new Set([...hu.keys(), ...bu.keys()])) {
      const x = hu.get(of), y = bu.get(of)
      if (!x) { for (const a of y.at) locs.push([a, 'base']); continue }
      if (!y) { for (const a of x.at) locs.push([a, 'head']); continue }
      if (stable(x.t.sort()) !== stable(y.t.sort())) { for (const a of new Set([...x.at, ...y.at])) locs.push([a, 'head']); continue }
      for (const a of x.at) if (!y.at.has(a)) locs.push([a, 'head'])
      for (const a of y.at) if (!x.at.has(a)) locs.push([a, 'base'])
    }
  }
  if (!locs.length) return S.reason(`${path} → no stamp changed`)

  let VM = null
  if (topic === 'metric-values') {
    VM = {}
    try { VM.head = (await importAt(ROOT, 'src/data/metricValues.ts')).VALUE_METRICS } catch { VM.head = null }
    try { VM.base = ctx.baseHas('src/data/metricValues.ts') ? (await importAt(ctx.baseDir(), 'src/data/metricValues.ts')).VALUE_METRICS : null } catch { VM.base = null }
  }
  for (const [at, side] of locs) {
    const i = at.indexOf(':')
    const slug = at.slice(0, i), p = at.slice(i + 1)
    if (topic === 'metric-values') {
      const m = p.match(/^\[(\d+)\]\.?([^.]*)\.?([^.]*)/)
      const metric = m && (VM[side] ?? VM.head ?? VM.base)?.[Number(m[1])]
      if (!metric) {
        for (const t of TOPIC_ORDER) for (const s of schoolsWith(t, ctx.manifest)) S.area(s, t, `${path} [${at}: metric not found]`)
        S.allCompare = true
        continue
      }
      S.compare.add(metric.topic)
      const why = `${path} [${metric.key}]`
      if (['values', 'subs', 'quals'].includes(m[2]) && m[3]) S.area(m[3], metric.topic, why)
      else for (const s of schoolsWith(metric.topic, ctx.manifest)) S.area(s, metric.topic, why)
      continue
    }
    if (content || topic === 'course-offerings' || topic === 'financial-aid-report') { S.area(slug, pageTopic, path); continue }
    S.card(slug, pageTopic, p.split(/[.[]/)[0], path)
  }
}

/* ---------- entry point ---------- */

export async function resolveScope({ since = 'main', all = false, compareTopics = [], repo = null } = {}) {
  if (repo) { ROOT = repo; loadTables() }
  const S = new Scope()
  const base = git('merge-base', since, 'HEAD').trim()
  const done = () => ({
    full: S.full,
    reasons: S.reasons,
    pages: S.full ? [] : [...S.pages.values()]
      .sort((a, b) => SLUGS.indexOf(a.slug) - SLUGS.indexOf(b.slug))
      .map((p) => ({ slug: p.slug, whole: p.whole, areas: Object.fromEntries(
        [...p.areas].sort(([a], [b]) => orderOf(a) - orderOf(b))) })),
    compare: new Set(S.full ? compareTopics : (S.allCompare ? compareTopics : [...S.compare].filter((t) => compareTopics.includes(t)))),
    checklist: S.full ? new Set() : S.checklist,
    base,
  })
  if (all) { S.goFull('--all'); return done() }

  const changed = new Set([
    ...git('diff', '--name-only', base).split('\n'),
    ...git('ls-files', '--others', '--exclude-standard').split('\n'),
  ].filter(Boolean))

  // Rule order: render code -> full, checked over EVERY path before any data work.
  for (const p of [...changed].sort()) {
    if (RENDER_CODE.some((r) => r.test(p))) S.goFull(p)
  }
  if (S.full) return done()

  const baseFiles = new Set(git('ls-tree', '-r', '--name-only', base, 'src').split('\n'))
  let bdir = null
  const ctx = {
    base,
    manifest: readJSON('src/data/schools.json'),
    baseHas: (p) => baseFiles.has(p),
    baseDir: () => (bdir ??= baseTree(base)),
  }

  for (const p of [...changed].sort()) {
    if (!p.startsWith('src/')) continue // docs, plans, source-material, other scripts
    if (p.endsWith('.md')) { S.reason(`${p} → nothing (never renders)`); continue }
    let m
    if ((m = p.match(/^src\/data\/([^/]+)\/([^/]+)\.ts$/)) && DIR_TOPIC[m[1]]) {
      await perSchoolModule(S, p, m[1], m[2], ctx)
    } else if (LOADERS[p]) {
      for (const s of schoolsWith(LOADERS[p], ctx.manifest)) S.area(s, LOADERS[p], p)
    } else if (ACCESSOR_MODULES[p]) {
      await accessorModule(S, p, ACCESSOR_MODULES[p], ctx)
    } else if (p === 'src/data/metricValues.ts') {
      await metricValues(S, p, ctx)
    } else if (EVERY_SCHOOL[p]) {
      for (const s of schoolsWith(EVERY_SCHOOL[p], ctx.manifest)) S.area(s, EVERY_SCHOOL[p], p)
    } else if (p === 'src/data/wellsFargoCup.ts') {
      await wellsFargoCup(S, p, ctx)
    } else if (p === 'src/data/podcastEpisodes.ts') {
      await podcastEpisodes(S, p, ctx)
    } else if (p === 'src/data/schools.json') {
      schoolsJson(S, p, ctx, compareTopics)
    } else if ((m = p.match(/^src\/content\/([^/]+)\/([^/]+)\.json$/))) {
      S.area(m[2], m[1], p)
    } else if ((m = p.match(/^src\/data\/overlays\/(?:work\/)?([a-z-]+?)(\.content)?\.([a-z]{2,3})\.json$/))) {
      await overlayFile(S, p, m[1], !!m[2], ctx)
    } else {
      S.goFull(`${p} (no scope rule)`)
      return done()
    }
  }

  // Derived visits: Compare pages that render a scoped area, and the
  // admissions checklist of any school whose admissions area is in scope.
  for (const pg of S.pages.values()) {
    for (const t of pg.areas.keys()) {
      S.compare.add(t)
      if (t === 'admissions') S.checklist.add(pg.slug)
    }
  }
  return done()
}

/** The deep-link hash (without '#') a scoped page is loaded with. '' for a whole page. */
export function hashFor(page) {
  if (page.whole) return ''
  const entries = Object.entries(page.areas)
  const area = (t) => LINKS[`area:${t}`] ?? t
  if (entries.length === 1 && entries[0][1] !== '*' && entries[0][1].size === 1) {
    const [t, keys] = entries[0]
    const k = [...keys][0]
    const card = LINKS[`card:${t}:${k}@${page.slug}`] ?? LINKS[`card:${t}:${k}`]
    if (card) return `${area(t)}/${card}`
  }
  return entries.length ? area(entries[0][0]) : ''
}

/** The scan roots for a scoped page: `{ cards: [[topic, key]], areas: [topic] }`. */
export function rootsFor(page) {
  const cards = [], areas = []
  for (const [t, v] of Object.entries(page.areas)) {
    if (v === '*') areas.push(t)
    else for (const k of v) cards.push([t, k])
  }
  return { cards, areas }
}

/**
 * Runs IN THE BROWSER (pass to page.evaluate): tag each scoped root with
 * `data-audit-root`. A card that did not render widens to its area, and an area
 * that did not render is reported, never silently skipped. Returns the notes.
 */
export function markRoots({ cards, areas }) {
  const notes = []
  document.querySelectorAll('[data-audit-root]').forEach((e) => e.removeAttribute('data-audit-root'))
  const wide = new Set(areas)
  for (const [t, k] of cards) {
    const el = document.querySelector(`details[data-card="${CSS.escape(`${t}:${k}`)}"]`)
    if (el) el.setAttribute('data-audit-root', '')
    else if (!wide.has(t)) { wide.add(t); notes.push(`card ${t}:${k} not on the page — widened to area ${t}`) }
  }
  for (const t of wide) {
    const el = document.getElementById(`topic-${t}`)
    if (el) el.setAttribute('data-audit-root', '')
    else notes.push(`area ${t} not on the page — nothing to scan there`)
  }
  return notes
}

/** Print the reasons and a one-line summary. Returns true when there is nothing to visit. */
export function printScope(scope, { prefix = '' } = {}) {
  console.log(`${prefix}scope vs ${scope.base.slice(0, 10)}:`)
  for (const r of scope.reasons) console.log(`${prefix}  ${r}`)
  if (scope.full) { console.log(`${prefix}→ full sweep`); return false }
  const cards = scope.pages.reduce((n, p) => n + Object.values(p.areas).filter((v) => v !== '*').reduce((a, v) => a + v.size, 0), 0)
  const areas = scope.pages.reduce((n, p) => n + Object.values(p.areas).filter((v) => v === '*').length, 0)
  const whole = scope.pages.filter((p) => p.whole).length
  const empty = !scope.pages.length && !scope.compare.size && !scope.checklist.size
  if (empty) { console.log(`${prefix}→ nothing in scope, use --all for a full sweep`); return true }
  console.log(`${prefix}→ ${scope.pages.length} page(s)${whole ? ` (${whole} whole)` : ''}, ${cards} card(s), ${areas} area(s), ` +
    `compare: ${[...scope.compare].join(', ') || '—'}, checklist: ${[...scope.checklist].join(', ') || '—'}`)
  for (const p of scope.pages) {
    const what = p.whole ? 'whole page' : Object.entries(p.areas).map(([t, v]) => (v === '*' ? `${t} (area)` : `${t}: {${[...v].join(', ')}}`)).join('; ')
    console.log(`${prefix}    ${p.slug}  ${p.whole ? '(no hash)' : `#${hashFor(p)}`}  ${what}`)
  }
  return false
}

/**
 * The visits a date/money audit makes for one locale, in order. Full mode is
 * the old sweep (every school, every Compare topic, every checklist band);
 * scoped mode is the scope's pages, Compare topics and checklists only. A checklist
 * is visited at its default band and at each key in that school's own guide
 * (checklistBands(), plan consistency5 7c: a fixed list named 6 of the 26). Each
 * visit is { kind: 'school'|'compare'|'checklist', url, label, roots?, admissions? }:
 * `roots` set means scan only the scoped cards and areas (a whole page has none).
 */
export function planVisits(scope, { base, lang, slugs, compareTopics, bands }) {
  if (!(bands instanceof Map)) throw new Error('planVisits: bands is the Map from checklistBands()')
  const out = []
  const pages = scope.full ? slugs.map((slug) => ({ slug, whole: true, areas: {} })) : scope.pages
  for (const p of pages) {
    const h = hashFor(p)
    out.push({
      kind: 'school',
      url: `${base}/school/${p.slug}/?lang=${lang}${h ? `#${h}` : ''}`,
      label: `/school/${p.slug}/${h ? `#${h}` : ''}`,
      route: `/school/${p.slug}/`,
      roots: p.whole ? null : rootsFor(p),
      admissions: p.whole || 'admissions' in p.areas,
    })
  }
  for (const topic of compareTopics.filter((t) => scope.full || scope.compare.has(t))) {
    const q = new URLSearchParams({ topic, schools: slugs.join(','), lang })
    out.push({ kind: 'compare', url: `${base}/compare/?${q}`, label: `/compare/ ${topic}`, route: `/compare/ ${topic}`, roots: null, admissions: true })
  }
  for (const s of scope.full ? slugs : slugs.filter((x) => scope.checklist.has(x))) {
    for (const band of ['', ...(bands.get(s) ?? [])]) {
      const q = new URLSearchParams(band ? { band, lang } : { lang })
      out.push({ kind: 'checklist', url: `${base}/school/${s}/admissions-checklist/?${q}`, label: `/school/${s}/admissions-checklist/ ${band || '(default)'}`, route: `/school/${s}/admissions-checklist/ ${band || '(default)'}` })
    }
  }
  return out
}

/** slug → that school's `guide.bands[].key`, read from its Admissions module. */
export async function checklistBands(slugs) {
  const out = new Map()
  for (const slug of slugs) {
    const file = new URL(`../src/data/admissionsPrograms/${slug}.ts`, import.meta.url)
    if (!existsSync(file)) continue // no Admissions area, so no checklist
    const program = Object.values(await import(file.href)).find((v) => v?.guide)
    const keys = program?.guide?.bands?.map((b) => b.key) ?? []
    if (!keys.length) throw new Error(`checklistBands: ${slug} has an Admissions module and no bands`)
    out.set(slug, keys)
  }
  return out
}

/** Wait until the research has rendered (audit_card_links.mjs's settle). */
export async function settle(page, ms = 1500) {
  await page.waitForFunction(() => !document.querySelector('.topic-section .loading'), null, { timeout: 30_000 })
    .catch(() => {})
  await page.waitForTimeout(ms)
}

/** A progress printer: one line per visit as it happens, never buffered into a summary. */
export function progress(total) {
  const t0 = Date.now()
  let i = 0
  return {
    step(label, started) {
      i++
      console.log(`[${i}/${total}] ${label} ${((Date.now() - started) / 1000).toFixed(1)}s`)
    },
    elapsed: () => `${((Date.now() - t0) / 1000).toFixed(0)}s`,
  }
}

/** Shared CLI flag parsing for the audits. */
export function scopeFlags(args) {
  const v = (f) => { const i = args.indexOf(f); return i === -1 ? null : args[i + 1] }
  return { all: args.includes('--all'), since: v('--since') ?? 'main', repo: v('--repo') }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2)
  const { since, repo } = scopeFlags(args)
  const ALL_COMPARE = ['financial-aid-tuition', 'admissions', 'after-school', 'summer-programs', 'college-support']
  const scope = await resolveScope({ since, repo, compareTopics: ALL_COMPARE })
  if (args.includes('--json')) {
    console.log(JSON.stringify({ ...scope,
      pages: scope.pages.map((p) => ({ ...p, hash: hashFor(p), areas: Object.fromEntries(Object.entries(p.areas).map(([t, v]) => [t, v === '*' ? '*' : [...v]])) })),
      compare: [...scope.compare], checklist: [...scope.checklist] }, null, 2))
  } else printScope(scope)
}
