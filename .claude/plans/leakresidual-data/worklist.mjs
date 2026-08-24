import { readFileSync, writeFileSync } from 'node:fs'

const rows = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const notes = readFileSync('src/data/overlays/NOTES.md', 'utf8')

// Ledger rows look like:  | `English` | `bn`, `fa` | reason |
// Collect every backticked English string that appears in a ledger table row,
// together with the locales named in its "kept by" cell.
const ledger = new Map()
for (const line of notes.split('\n')) {
  const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]*)\|/)
  if (!m) continue
  const locs = [...m[2].matchAll(/`([a-z]{2})`/g)].map((x) => x[1])
  if (!locs.length) continue
  const key = m[1].replace(/…$/, '')
  ledger.set(key, new Set([...(ledger.get(key) ?? []), ...locs]))
}

const ledgerHas = (en, loc) => {
  for (const [k, locs] of ledger) {
    if ((en === k || en.startsWith(k)) && locs.has(loc)) return true
  }
  return false
}

const out = []
for (const r of rows) {
  const fresh = r.kept.filter((l) => !ledgerHas(r.en, l))
  out.push({ ...r, kept_fresh: fresh, already_ledgered: r.kept.filter((l) => !fresh.includes(l)) })
}

const untriaged = out.filter((r) => r.kept_fresh.length)
console.log('ledger entries parsed:', ledger.size)
console.log('rows total:', out.length, '| rows with an untriaged (string,locale):', untriaged.length)

const byLoc = {}
for (const r of untriaged) for (const l of r.kept_fresh) byLoc[l] = (byLoc[l] || 0) + 1
console.log('untriaged by locale:', Object.entries(byLoc).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '))
console.log('untriaged (string,locale) pairs:', untriaged.reduce((n, r) => n + r.kept_fresh.length, 0))

writeFileSync(process.argv[3], JSON.stringify(untriaged, null, 1))

for (const r of untriaged.sort((a, b) => a.topic.localeCompare(b.topic) || a.en.localeCompare(b.en))) {
  console.log(`\n[${r.kept_fresh.join(',')}] (${r.trans.length} translated) ${r.topic}`)
  console.log(`   ${JSON.stringify(r.en.slice(0, 150))}`)
  console.log(`   at: ${r.paths[0] ?? '?'}`)
}
