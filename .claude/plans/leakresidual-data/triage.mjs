// Final triage: apply the per-locale conventions recorded in NOTES.md (#193's table)
// plus the fresh sibling evidence gathered this pass.
import { readFileSync, writeFileSync } from 'node:fs'

const rows = JSON.parse(readFileSync(process.argv[2], 'utf8'))

// KEEP predicates, keyed by locale. Each cites the evidence that decided it.
const KEEP = {
  te: [
    [/Semifinalist|Commended|Finalists|National Merit|National Hispanic|National Achievement/,
      'bare National Merit award-tier string; te keeps the award terms in Latin (47/47 measured) and translates only rows carrying extra connective prose'],
    [/^(Lower School Courses|Fine Arts electives|Upper School course access|History \/ Social Studies|Innovation electives|Personal Skills electives)$/,
      'division/course title; ledger #193 records te keeping these'],
    [/^Cross country \/ track$/, 'bare sport name used as a roster identifier (ledger #193)'],
    [/drop-in|Drop-in/, '`drop-in` kept as a loanword in te (ledger #193); the rest of the label is a division name'],
    [/^(Full Day|Full Day - Farm|Full Day \(STEM\))$/, 'category label; te keeps the `Full Day` family'],
  ],
  bn: [
    [/drop-in|Drop-in/, '`drop-in` kept as a loanword in bn (ledger #193), leaving nothing to translate'],
    [/^FBLA, Euro Challenge/, 'four organisation names plus `plus` (ledger #193)'],
  ],
  fr: [
    [/^Sessions? [\d, ]+$/, '`Session` is French; fr keeps all 24 camp session labels (measured 24/24)'],
    [/^FBLA, Euro Challenge/, 'four organisation names plus `plus`, which is also French (ledger #193)'],
  ],
  it: [
    [/^Top-75 /, 'tier label; it keeps all three Top-75 strings (ledger #193)'],
    [/^One-Acts \(NCTC\)$/, 'festival-format name beside the NCTC organiser; it keeps it as an identifier'],
  ],
  ht: [
    [/^Top-75 /, 'tier label; ht keeps the Top-75 family (ledger #193)'],
  ],
  hi: [
    [/^(Full Day|Full Day - Farm|Full Day \(STEM\))$/, 'hi keeps all three `Full Day` category labels (ledger #193)'],
    [/^One-Acts \(NCTC\)$/, 'festival-format name; hi keeps it as an identifier'],
  ],
  es: [
    [/^NCISAA, individual$/, '`individual` is spelled identically in Spanish — the correct translation is byte-identical'],
    [/sq ft/, 'unit token deliberately restored to the English figure by PR #194 (unitrevert), settled 2026-08-24'],
  ],
  fa: [
    [/electives$/i, 'elective-category label; fa keeps all 7 such labels as identifiers (Arts Electives, Physical Activity Electives, Core Content Electives) — measured'],
    [/^Upper School course access$/, 'course-title slot beside kept siblings `Honors Level Courses` / `Advanced Seminar Courses`'],
    [/^(Drawing & Painting beginner|AP Music Theory; AP art courses|Concert Choir, Chamber\/Honors Choir)/,
      'course/ensemble roster line in ladder.divisions[].items[]; fa keeps all 17 such roster lines (measured) — ledger #193'],
  ],
  ar: [
    [/^(Interdisciplinary Studies|Visual and Performing Arts|Dual Enrollment)$/,
      'Charlotte Catholic department name; ar keeps every department name at this school in Latin (6/6 measured)'],
  ],
}

const verdicts = []
for (const r of rows) {
  for (const loc of r.kept_fresh) {
    const hit = (KEEP[loc] ?? []).find(([re]) => re.test(r.en))
    verdicts.push({
      topic: r.topic, en: r.en, locale: loc,
      path: r.paths[0] ?? '?',
      translated_by: r.trans,
      verdict: hit ? 'KEEP' : 'LEAK',
      reason: hit ? hit[1] : '',
    })
  }
}

const leaks = verdicts.filter((v) => v.verdict === 'LEAK')
const keeps = verdicts.filter((v) => v.verdict === 'KEEP')
console.log(`(string,locale) pairs triaged: ${verdicts.length}`)
console.log(`  LEAK ${leaks.length}   KEEP ${keeps.length}   ratio 1:${(keeps.length / leaks.length).toFixed(2)}`)

const byLoc = {}
for (const v of leaks) byLoc[v.locale] = (byLoc[v.locale] || 0) + 1
console.log('LEAKs by locale:', Object.entries(byLoc).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '))

console.log('\n===== LEAKS =====')
for (const v of leaks.sort((a, b) => a.locale.localeCompare(b.locale) || a.topic.localeCompare(b.topic))) {
  console.log(`[${v.locale}] ${v.topic}  (translated by ${v.translated_by.length})`)
  console.log(`    ${JSON.stringify(v.en.slice(0, 120))}`)
  console.log(`    ${v.path}`)
}
writeFileSync(process.argv[3], JSON.stringify(verdicts, null, 1))
