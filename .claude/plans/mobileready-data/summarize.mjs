import { readFileSync } from 'node:fs'
const f = JSON.parse(readFileSync(process.argv[2], 'utf8'))
// Tier A (broken): content past the card edge or cut off. Tier B: usable, but needs a sideways scroll.
const BROKEN = new Set(['page-overflow', 'text-overflow', 'clipped', 'clipped-text'])
const rows = new Map()
for (const x of f) {
  if (x.kind === 'doc-overflow') continue
  const k = `${x.school} - ${x.area} - ${x.card}`
  const o = rows.get(k) ?? { broken: new Map(), scroll: new Map(), widths: new Set() }
  const bucket = BROKEN.has(x.kind) ? o.broken : o.scroll
  const sig = `${x.kind}: ${x.where.split(' < ')[0]}`
  const prev = bucket.get(sig) ?? { px: 0, w: new Set(), text: x.text }
  prev.px = Math.max(prev.px, x.px); prev.w.add(x.vw)
  bucket.set(sig, prev)
  rows.set(k, o)
}
const fmt = (m) => [...m].map(([s, v]) => `${s} (+${v.px}px @${[...v.w].sort().join('/')})`).join('; ')
console.log('=== BROKEN ===')
for (const [k, o] of [...rows].sort()) if (o.broken.size) console.log(`${k}\n    ${fmt(o.broken)}`)
console.log('\n=== SIDEWAYS SCROLL ONLY ===')
for (const [k, o] of [...rows].sort()) if (!o.broken.size && o.scroll.size) console.log(`${k}\n    ${fmt(o.scroll)}`)
const docs = f.filter((x) => x.kind === 'doc-overflow')
console.log('\n=== DOC OVERFLOW ===')
const dm = new Map(); for (const d of docs) dm.set(`${d.school}@${d.vw}`, Math.max(dm.get(`${d.school}@${d.vw}`) ?? 0, d.px))
console.log([...dm].map(([k, v]) => `${k}:+${v}`).join('  '))
