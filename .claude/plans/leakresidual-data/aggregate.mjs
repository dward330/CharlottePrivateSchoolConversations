import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const WORK = 'src/data/overlays/work'
const LOCALES = ['es', 'bn', 'ht', 'te', 'fr', 'fa', 'it', 'hi', 'ar']

const load = (f) => {
  const p = join(WORK, f)
  if (!existsSync(p)) return null
  const r = JSON.parse(readFileSync(p, 'utf8'))
  return r.strings ?? r.sections ?? null
}

const topics = [...new Set(
  readdirSync(WORK).filter((f) => /\.[a-z]{2}\.json$/.test(f))
    .map((f) => f.replace(/\.[a-z]{2}\.json$/, '')),
)].sort()

const rec = new Map()
for (const topic of topics) {
  for (const l of LOCALES) {
    const arr = load(`${topic}.${l}.json`)
    if (!arr) continue
    for (const s of arr) {
      const en = s.text ?? ''
      const t = s.t ?? ''
      if (!en) continue
      if (!/[a-z]/.test(en)) continue
      const key = topic + '\u0000' + en
      if (!rec.has(key)) rec.set(key, { topic, en, kept: new Set(), trans: new Set(), paths: new Set() })
      const r = rec.get(key)
      if (s.at?.[0]) r.paths.add(s.at[0])
      if (!t) continue
      if (t === en) r.kept.add(l)
      else r.trans.add(l)
    }
  }
}

const rows = [...rec.values()].filter(
  (r) => r.kept.size > 0 && r.kept.size <= 2 && r.trans.size >= 2 && r.en.length >= 15,
)

console.log('leak-shaped rows (topic+string distinct):', rows.length)
console.log('distinct English strings:', new Set(rows.map((r) => r.en)).size)

const byLoc = {}, byTop = {}
for (const r of rows) {
  for (const l of r.kept) byLoc[l] = (byLoc[l] || 0) + 1
  byTop[r.topic] = (byTop[r.topic] || 0) + 1
}
const fmt = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · ')
console.log('by locale:', fmt(byLoc))
console.log('by topic:', fmt(byTop))

writeFileSync(process.argv[2], JSON.stringify(
  rows.map((r) => ({
    topic: r.topic, en: r.en,
    kept: [...r.kept].sort(), trans: [...r.trans].sort(),
    paths: [...r.paths].slice(0, 3),
  })), null, 1))
