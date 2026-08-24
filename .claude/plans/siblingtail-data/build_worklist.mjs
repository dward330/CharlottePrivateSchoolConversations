import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const WORK = 'src/data/overlays/work'
const LANGS = ['es','bn','ht','te','fr','fa','it','hi','ar']
const MAX_KEPT = 2, MIN_SIBS = 3, MIN_LEN = 15

const parentOf = (path) => path
  .replace(/\[\d+\]$/, '').replace(/\.[^.[\]]+$/, '').replace(/\[\d+\]$/, '')

// Collect findings: key = english string -> { locales: Set, topics: Set, paths: Set }
const findings = new Map()

for (const LANG of LANGS) {
  const topics = [...new Set(readdirSync(WORK).filter(f => f.endsWith(`.${LANG}.json`))
    .map(f => f.replace(new RegExp(`\\.${LANG}\\.json$`), '')))].sort()
  for (const topic of topics) {
    const p = join(WORK, `${topic}.${LANG}.json`)
    if (!existsSync(p)) continue
    const raw = JSON.parse(readFileSync(p, 'utf8'))
    const mine = raw.strings ?? raw.sections ?? []
    const groups = new Map()
    for (const s of mine) {
      const en = s.text ?? '', t = s.t ?? ''
      if (!en || !t) continue
      for (const path of s.at ?? []) {
        const parent = parentOf(path)
        if (!parent) continue
        if (!groups.has(parent)) groups.set(parent, [])
        groups.get(parent).push({ en, t, path })
      }
    }
    for (const [parent, entries] of groups) {
      const kept = entries.filter(e => e.t === e.en)
      const translated = entries.length - kept.length
      if (kept.length < 1 || kept.length > MAX_KEPT) continue
      if (translated < MIN_SIBS) continue
      const seen = new Set()
      for (const k of kept) {
        if (k.en.length < MIN_LEN) continue
        if (seen.has(k.en)) continue
        seen.add(k.en)
        if (!findings.has(k.en)) findings.set(k.en, { locales: new Set(), sites: new Set() })
        const f = findings.get(k.en)
        f.locales.add(LANG)
        f.sites.add(`${topic}:${parent} (${translated}/${entries.length})`)
      }
    }
  }
}

const NOTES = readFileSync('src/data/overlays/NOTES.md', 'utf8')

// A finding is "ledgered" if its English string (or a truncated prefix of it, as
// the ledger stores long strings truncated with …) appears in NOTES.md.
const ledgered = (en) => {
  if (NOTES.includes(en)) return 'exact'
  // ledger truncates long strings; try progressive prefixes
  for (let n = Math.min(en.length, 100); n >= 30; n -= 1) {
    const pre = en.slice(0, n)
    if (NOTES.includes(pre)) return `prefix:${n}`
  }
  return null
}

const out = []
for (const [en, f] of findings) {
  out.push({
    en,
    locales: [...f.locales].sort(),
    sites: [...f.sites].sort(),
    ledger: ledgered(en),
  })
}
out.sort((a, b) => a.en.localeCompare(b.en))

const untriaged = out.filter(r => !r.ledger)
console.log(`distinct strings flagged (union of 9 locales): ${out.length}`)
console.log(`(string,locale) pairs: ${out.reduce((s,r)=>s+r.locales.length,0)}`)
console.log(`already in ledger: ${out.length - untriaged.length}`)
console.log(`UNTRIAGED distinct strings: ${untriaged.length}`)
console.log(`UNTRIAGED (string,locale) pairs: ${untriaged.reduce((s,r)=>s+r.locales.length,0)}`)
writeFileSync('/tmp/worklist.json', JSON.stringify(out, null, 2))
writeFileSync('/tmp/untriaged.json', JSON.stringify(untriaged, null, 2))
