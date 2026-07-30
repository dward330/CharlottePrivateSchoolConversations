#!/usr/bin/env node
// French-specific: catch IDENTIFIERS that drifted into translated prose.
//
// WHY THIS EXISTS, AND WHY ONLY FOR fr
// -----------------------------------
// In every other locale a string like "French III Honors" or "Pi Delta Phi" is
// conspicuously foreign, and no translator would touch it. In French they read
// as ordinary translatable prose sitting in the same work file as
// "A five-level French sequence." — which genuinely must be translated.
//
// This is the INVERSE of the Telugu leak shape. Telugu leaked via "a sentence
// wearing an identifier's clothes" (a hedge in a proper-noun field), which the
// skip audit can catch. French leaks via an IDENTIFIER WEARING A SENTENCE'S
// CLOTHES — and neither i18n_audit_skips.mjs nor check_figures.py can see it,
// because both strings are correctly classified as prose.
//
// The rule: if an English source string contains a frozen identifier, the
// French must contain it too, byte for byte. A parent cannot search
// providenceday.org for "Société Honoraire de Français" if we renamed it, and
// cannot search for "Cycle Supérieur" at all.
//
// Deliberately NOT a blanket "keep every capitalised run" rule — that would fire
// on ordinary sentence-initial words and get ignored. See §1a of
// .claude/docs/prose-translation-fr.md.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const WORK = join(ROOT, 'src/data/overlays/work')

/**
 * Strings that must survive translation unchanged.
 *
 * Course codes and world-language program names come first: those are the ones
 * that read as French prose and are therefore the actual hazard. The rest are
 * the standing cross-locale convention (institutions, platforms, societies).
 */
const FROZEN = [
  // --- the French-specific hazard: French-language course & society names ---
  'AP French Language and Culture',
  'AP French Language & Culture',
  'AP French Language',
  'Advanced Placement French Language',
  'French III Honors',
  'French III/IV Honors',
  'French IV Honors',
  'French I – IV Honors',
  'Société Honoraire de Français',
  'Pi Delta Phi',
  'Francophone',

  // --- course codes and levels ---
  'Advanced Placement',
  'Honors',
  'AP',
  'IB',

  // --- divisions & institutions ---
  'Upper School',
  'Middle School',
  'Lower School',
  'Charlotte Latin',
  'Providence Day',
  'Charlotte Christian',
  'Country Day',
  'Davidson Day',
  'Cannon',
  'NCISAA',

  // --- platforms, programs, societies ---
  'Cum Laude',
  'National Honor Society',
  'National Junior Honor Society',
  'National Merit',
  'Model UN',
  'Model United Nations',
  'Mock Trial',
  'Speech & Debate',
  'Science Olympiad',
  'Battle of the Books',
  'DECA',
  'FBLA',
  'HOSA',
  'NSDA',
  'Habitat for Humanity',
  'Special Olympics',
  'Scoir',
  'Naviance',
  'Clarity',
  'FACTS',
  'SSAT',
  'Extended Day',
]

// Longest first, so "AP French Language and Culture" is checked before "AP".
const ORDERED = [...FROZEN].sort((a, b) => b.length - a.length)

/**
 * Terms that are a course code in one sentence and an ordinary English word in
 * the next. "Honors & distinctions →" is a card heading meaning *distinctions*;
 * "French III Honors" is a course a parent types into a search box. Only the
 * second must survive untranslated.
 *
 * Treated as a term-of-art use when adjacent to a subject, level or the other
 * markers of a course listing.
 */
const AMBIGUOUS = new Set(['Honors', 'AP', 'IB', 'Cannon', 'Francophone'])

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Whole-token containment: the term must not be glued to surrounding letters.
 * Uses explicit boundaries rather than \b because several frozen terms contain
 * `&`, `/` or spaces ("Speech & Debate", "French III/IV Honors").
 */
function hasToken(text, term) {
  const re = new RegExp(`(^|[^A-Za-z])${escapeRe(term)}($|[^A-Za-z])`)
  return re.test(text)
}

function isTermUse(term, text) {
  if (term === 'Cannon') return !/Cannon Campus/.test(text)
  // "Francophone" is frozen inside a course title ("French 7 Advanced:
  // Francophone Culture through Literature") but is ordinary prose in "the
  // African Francophone world", which correctly becomes "monde francophone
  // africain". Only the title use is an identifier.
  if (term === 'Francophone') return /French \d|Advanced:/.test(text)
  // A course code sits beside a subject, a roman/arabic level, or another code.
  const near = new RegExp(
    `(${term}\\s+(?:[A-Z][a-z]+|[IVX]+|\\d)|` +
      `(?:[A-Z][a-z]+|[IVX]+|\\d)\\s+${term}|` +
      `\\d+\\s*${term}\\b|${term}\\s*(?:\\+|/)\\s*(?:AP|IB)|(?:AP|IB)\\s*(?:\\+|/)\\s*${term})`,
  )
  return near.test(text)
}

const files = process.argv[2]
  ? [`${process.argv[2]}.fr.json`]
  : readdirSync(WORK).filter((f) => f.endsWith('.fr.json'))

let checked = 0
let bad = 0

for (const file of files) {
  let doc
  try {
    doc = JSON.parse(readFileSync(join(WORK, file), 'utf8'))
  } catch {
    continue
  }

  const hits = []
  for (const s of doc.strings ?? []) {
    if (!s.t) continue
    checked++

    // PRESENCE, not occurrence count. French routinely avoids a repetition
    // English tolerates ("...en Middle School ; le modèle de clubs y est..."),
    // so demanding ×2 → ×2 flags correct prose. What matters is that the
    // identifier still appears at least once and is therefore searchable.
    const seen = new Set()
    for (const term of ORDERED) {
      if (seen.has(term)) continue
      // Whole-token match only. A substring test makes "AP" fire on "TRAP" and
      // "IB" on "ATTRIBUTE" — which is how an all-caps heading ("A COMPARISON
      // TRAP IN THE EARLY YEARS") got reported as a lost course code.
      if (!hasToken(s.text, term)) continue
      // A longer match already covers this text; skip its substrings either way.
      ORDERED.filter((t) => term.includes(t) && t !== term).forEach((t) => seen.add(t))
      if (AMBIGUOUS.has(term) && !isTermUse(term, s.text)) continue
      if (!hasToken(s.t, term)) hits.push({ term, en: s.text, fr: s.t })
    }
  }

  if (hits.length) {
    bad += hits.length
    console.error(`\n✗ ${file} — ${hits.length} identifier(s) lost in translation`)
    for (const h of hits.slice(0, 12)) {
      console.error(`\n   "${h.term}"`)
      console.error(`     en: ${h.en.slice(0, 110)}`)
      console.error(`     fr: ${h.fr.slice(0, 110)}`)
    }
    if (hits.length > 12) console.error(`\n   …and ${hits.length - 12} more`)
  }
}

if (bad) {
  console.error(
    `\n${bad} identifier(s) drifted across ${checked} strings.\n` +
      'An identifier that is translated stops being searchable — a parent cannot\n' +
      'look up a renamed course on the school\'s own website. Restore the exact\n' +
      'English string. See §1a of .claude/docs/prose-translation-fr.md.',
  )
  process.exit(1)
}

console.log(`✓ ${checked} strings · every frozen identifier preserved`)
