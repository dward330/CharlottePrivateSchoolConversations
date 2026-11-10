#!/usr/bin/env node
/**
 * Re-stamp a spelling-only English change, carrying every translation over.
 * (Plan .claude/plans/usspelling.md, Step 11.)
 *
 * After `i18n_splice_work.mjs` re-extracts a locale, a changed English string
 * shows up as one dropped old entry plus one ADDED entry with `t: ''` — the
 * splice joins by stamp, so it cannot carry the translation. This script
 * pairs each added entry with its predecessor(s) BY `at` PATH in the base
 * (`main`) work file — never by index — PROVES with isSpellingOnly() that the
 * English diff is spelling-only, and copies the predecessor's `t`.
 *
 *   node scripts/i18n_restamp.mjs --lang <l> [--topic T] [--base main]
 *        [--fix-embedded] [--dry-run] [--report <md>]
 *
 * Failures (exit 1, nothing written for that locale — all-or-nothing):
 *   unpaired          no base entry at any of the new entry's `at` paths
 *   not spelling-only a predecessor's English differs by more than a mapped spelling
 *   conflict          predecessors' `t` disagree, or one is empty
 *
 * --fix-embedded (never for `fr`, where programme/centre/catalogue are correct
 * French): for each (old, new) word pair in the entry's own English diff,
 * replace whole-word, case-insensitive occurrences of `old` inside `t` with
 * `new`, case kept. Each edit is logged.
 *
 * The proof printed at the end replaces check_work_integrity.mjs, whose
 * assertion 1 fails by design on every re-stamped entry.
 */
import { readFileSync, writeFileSync, readdirSync, appendFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadConfig, isSpellingOnly, keepCase } from './check_plain_language.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WORK = 'src/data/overlays/work'
const args = process.argv.slice(2)
const argOf = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const LANG = argOf('--lang')
const TOPIC = argOf('--topic')
const BASE = argOf('--base', 'main')
const DRY = args.includes('--dry-run')
const EMBED = args.includes('--fix-embedded') && LANG !== 'fr'
const REPORT = argOf('--report')
if (!LANG) { console.error('usage: i18n_restamp.mjs --lang <l> [--topic T] [--base main] [--fix-embedded] [--dry-run] [--report <md>]'); process.exit(2) }
const cfg = loadConfig()

function baseFile(rel) {
  try {
    return JSON.parse(execFileSync('git', ['show', `${BASE}:${rel}`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 }))
  } catch { return null }
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Replace whole Latin-script words `old` (any case) with `neu`, case kept. */
function fixEmbedded(t, diffs) {
  const edits = []
  let out = t
  const seen = new Set()
  for (const [o, n] of diffs) {
    const key = o.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    const american = n.toLowerCase()
    out = out.replace(new RegExp(`(?<![A-Za-z])${escapeRe(key)}(?![A-Za-z])`, 'gi'), (m) => {
      const r = keepCase(m, american)
      edits.push([m, r])
      return r
    })
  }
  return { t: out, edits }
}

const files = readdirSync(join(ROOT, WORK))
  .filter((f) => f.endsWith(`.${LANG}.json`) && !f.includes('.content.'))
  .filter((f) => !TOPIC || f === `${TOPIC}.${LANG}.json`)

const rows = []
const failures = []
const log = []      // { topic, at, kind, old, neu, t, edits }
const writes = []
const proof = { kept: 0, keptBad: 0, carried: 0, carriedBad: 0, lostTranslation: 0 }

for (const f of files) {
  const rel = `${WORK}/${f}`
  const topic = f.slice(0, -`.${LANG}.json`.length)
  const cur = JSON.parse(readFileSync(join(ROOT, rel), 'utf8'))
  if (!Array.isArray(cur.strings)) continue
  const base = baseFile(rel)
  if (!base?.strings) { failures.push(`${topic}: no base work file at ${BASE}`); continue }
  const baseByStamp = new Map(base.strings.map((e) => [e.of, e]))
  const baseByAt = new Map()
  for (const e of base.strings) for (const a of e.at ?? []) baseByAt.set(a, e)

  const row = { topic, carried: 0, merged: 0, embedded: 0, failures: 0 }
  const expected = new Map()      // entry -> t it must hold, for the proof
  for (const e of cur.strings) {
    if (baseByStamp.has(e.of)) continue
    const already = e.t !== ''   // a re-run after a write: must reproduce exactly
    const preds = [...new Set((e.at ?? []).map((a) => baseByAt.get(a)).filter(Boolean))]
    if (!preds.length) { failures.push(`${topic} ${e.of} (${e.at?.[0]}): unpaired`); row.failures++; continue }
    let diffs = null, bad = false
    for (const p of preds) {
      const r = isSpellingOnly(p.text, e.text, cfg)
      if (!r.ok) { failures.push(`${topic} ${e.at?.[0]}: not spelling-only (${r.reason})`); bad = true; break }
      if (r.diffs.length && !diffs) diffs = r.diffs
    }
    if (bad) { row.failures++; continue }
    const ts = new Set(preds.map((p) => p.t))
    if (ts.size !== 1 || ts.has('')) { failures.push(`${topic} ${e.at?.[0]}: conflict (${ts.size} distinct predecessor translations)`); row.failures++; continue }
    let t = preds[0].t
    const merged = preds.length > 1 || preds.some((p) => p.text === e.text)
    let edits = []
    if (EMBED && diffs) ({ t, edits } = fixEmbedded(t, diffs))
    if (already && e.t !== t) { failures.push(`${topic} ${e.at?.[0]}: already re-stamped with a different t`); row.failures++; continue }
    e.t = t
    expected.set(e, t)
    row.carried++
    if (merged) row.merged++
    if (edits.length) row.embedded++
    log.push({ topic, at: e.at, kind: merged ? 'merged' : 'carried', old: preds[0].text, neu: e.text, t: preds[0].t, newT: t, edits })
  }
  // merges: an existing stamp that GAINED `at` paths (a changed string whose
  // new English equals an entry already there). Every gained path's
  // predecessor must be spelling-only away and hold the same translation.
  for (const e of cur.strings) {
    const b = baseByStamp.get(e.of)
    if (!b) continue
    const gained = (e.at ?? []).filter((a) => !(b.at ?? []).includes(a))
    if (!gained.length) continue
    const preds = [...new Set(gained.map((a) => baseByAt.get(a)).filter(Boolean))]
    let ok = preds.length > 0
    for (const p of preds) {
      if (!isSpellingOnly(p.text, e.text, cfg).ok) { failures.push(`${topic} ${gained[0]}: merge predecessor not spelling-only`); ok = false }
      else if (p.t !== e.t) { failures.push(`${topic} ${gained[0]}: merge conflict — predecessor t differs from existing t`); ok = false }
    }
    if (!preds.length) failures.push(`${topic} ${gained[0]}: gained path unpaired`)
    if (ok) { row.merged++; log.push({ topic, at: gained, kind: 'merged', old: preds[0].text, neu: e.text, t: e.t, newT: e.t, edits: [] }) }
    else row.failures++
  }
  // proof
  for (const e of cur.strings) {
    const b = baseByStamp.get(e.of)
    if (b) {
      proof.kept++
      if (b.text !== e.text || b.t !== e.t) proof.keptBad++
    } else if (expected.has(e)) {
      proof.carried++
      if (e.t !== expected.get(e)) proof.carriedBad++
    }
  }
  const curAt = new Map()
  for (const e of cur.strings) for (const a of e.at ?? []) curAt.set(a, e)
  for (const b of base.strings) {
    if (!b.t) continue
    for (const a of b.at ?? []) { const c = curAt.get(a); if (c && c.t === '') proof.lostTranslation++ }
  }
  rows.push(row)
  writes.push([rel, cur])
}

console.log(`restamp → ${LANG}${DRY ? ' (dry run)' : ''}${EMBED ? ' --fix-embedded' : ''}`)
console.log('TOPIC                    CARRIED  MERGED  EMBEDDED  FAILURES')
const tot = { carried: 0, merged: 0, embedded: 0, failures: 0 }
for (const r of rows) {
  if (r.carried || r.failures) console.log(`${r.topic.padEnd(24)} ${String(r.carried).padStart(7)} ${String(r.merged).padStart(7)} ${String(r.embedded).padStart(9)} ${String(r.failures).padStart(9)}`)
  for (const k of Object.keys(tot)) tot[k] += r[k]
}
console.log(`${'TOTAL'.padEnd(24)} ${String(tot.carried).padStart(7)} ${String(tot.merged).padStart(7)} ${String(tot.embedded).padStart(9)} ${String(tot.failures).padStart(9)}`)
for (const l of log) for (const [o, n] of l.edits) console.log(`  embedded fix ${l.topic} ${l.at[0]}: ${o} → ${n}`)
console.log(`proof: ${proof.kept} kept-stamp entries (${proof.keptBad} differ from ${BASE}); ${proof.carried} re-stamped (${proof.carriedBad} not equal to their predecessor's t or its logged fix); ${proof.lostTranslation} path(s) that ${BASE} translated now empty`)

const proofBad = proof.keptBad + proof.carriedBad + proof.lostTranslation
if (failures.length || proofBad) {
  for (const f of failures) console.error(`FAIL ${f}`)
  console.error(`${failures.length} failure(s), ${proofBad} proof violation(s) — nothing written for ${LANG}`)
  process.exit(1)
}
if (!DRY) {
  for (const [rel, cur] of writes) writeFileSync(join(ROOT, rel), JSON.stringify(cur, null, 2) + '\n')
  if (REPORT) {
    const esc = (s) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ')
    const L = [`### \`${LANG}\` — ${tot.carried} carried, ${tot.merged} merged, ${tot.embedded} with embedded fixes, 0 failures`, '']
    const merges = log.filter((l) => l.kind === 'merged')
    if (merges.length) {
      L.push('Merged (the new English equals an existing entry; both predecessors already held the same translation):', '')
      for (const m of merges) L.push(`- \`${m.topic}\` ${m.at.map((a) => `\`${a}\``).join(', ')}`)
      L.push('')
    }
    const emb = log.filter((l) => l.edits.length)
    if (emb.length) {
      L.push('| Topic | Path | Embedded fix | Translation after |', '|---|---|---|---|')
      for (const l of emb) L.push(`| ${l.topic} | \`${esc(l.at[0])}\` | ${l.edits.map(([o, n]) => `${o} → ${n}`).join(', ')} | ${esc(l.newT.length > 160 ? l.newT.slice(0, 160) + '…' : l.newT)} |`)
      L.push('')
    }
    appendFileSync(resolve(ROOT, REPORT), L.join('\n') + '\n')
  }
}
