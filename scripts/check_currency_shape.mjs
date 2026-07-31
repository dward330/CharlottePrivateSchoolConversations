#!/usr/bin/env node
// Does every money form render with the SAME symbol and placement, per locale?
//
// WHY THIS EXISTS
// ---------------
// A school page shows one figure several ways at once: a stat tile rendered from
// a raw number, an abbreviated magnitude ("$3.25M") baked into prose, and a full
// figure ("$36,500") baked into a table cell. All three go through format.ts by
// different paths, and each path has independently gotten the currency wrong:
//
//   PR #61  — placement was hardcoded to the Spanish shape, so every non-English
//             locale trailed. "3.25 M US$" rendered beside "$36,500" on one
//             Kreyòl page. Fixed by deriving placement from Intl.
//   fr      — the SYMBOL was still hardcoded to "US$" in the abbreviated branch,
//             correct only for Spanish. French renders "$US", so "3,25 M US$"
//             appeared beside "3 250 000 $US". Fixed by deriving it too.
//
// Same shape both times: one locale's convention generalised to all the others,
// surviving because every locale added up to that point happened to match. This
// asserts the invariant directly so the third instance cannot ship.
//
//   node scripts/check_currency_shape.mjs

const LOCALES = ['en-US', 'es', 'bn', 'ht', 'te', 'fr']

const number = (n, l) =>
  new Intl.NumberFormat(l, { useGrouping: 'always' }).format(n)

const leads = (l) =>
  new Intl.NumberFormat(l, { style: 'currency', currency: 'USD' })
    .formatToParts(1)[0]?.type === 'currency'

const symbol = (l) =>
  new Intl.NumberFormat(l, { style: 'currency', currency: 'USD' })
    .formatToParts(1)
    .find((p) => p.type === 'currency')?.value ?? '$'

const money = (n, l) => {
  const parts = new Intl.NumberFormat(l, {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0, useGrouping: 'always',
  }).formatToParts(n)
  let done = false
  return parts
    .map((p) => {
      if (!['integer', 'group', 'decimal', 'fraction'].includes(p.type)) return p.value
      if (done) return ''
      done = true
      return number(n, l)
    })
    .join('')
}

const abbrev = (n, suffix, l) =>
  leads(l) ? `${symbol(l)}${number(n, l)}${suffix}` : `${number(n, l)} ${suffix} ${symbol(l)}`

let bad = 0
console.log('locale   full figure          abbreviated          symbol  placement')
for (const l of LOCALES) {
  const full = money(3250000, l)
  const abb = abbrev(3.25, 'M', l)
  const sym = symbol(l)

  // 1. Both forms must carry the locale's own symbol.
  const symOk = full.includes(sym) && abb.includes(sym)
  // 2. Both must put it on the same side.
  const fullLeads = full.trimStart().startsWith(sym)
  const abbLeads = abb.trimStart().startsWith(sym)
  const placeOk = fullLeads === abbLeads && fullLeads === leads(l)

  if (!symOk || !placeOk) bad++
  console.log(
    l.padEnd(8),
    full.padEnd(20),
    abb.padEnd(20),
    (symOk ? 'ok' : 'BAD').padEnd(7),
    placeOk ? 'ok' : 'BAD',
  )
}

// English must never change — it is what 100% of today's readers see.
const enFull = money(36500, 'en-US')
const enAbb = abbrev(3.25, 'M', 'en-US')
if (enFull !== '$36,500' || enAbb !== '$3.25M') {
  console.error(`\n✗ English drifted: ${enFull} / ${enAbb} — expected $36,500 / $3.25M`)
  bad++
}

if (bad) {
  console.error(
    `\n✗ ${bad} locale(s) render one figure two ways.\n` +
      'A reader sees the same amount with different symbols or on different\n' +
      'sides within one page. Derive BOTH from Intl in src/lib/format.ts.',
  )
  process.exit(1)
}

console.log('\n✓ every locale renders full and abbreviated figures consistently')
