// GENERATED SOURCE OF TRUTH — the master conference/designation membership table.
//
// The `p4` and `hbcu` bucket tags on every school's "Where Graduates Go"
// acceptance list resolve from THIS file, so membership lives in exactly one
// place and a change updates every school at once. This mirrors how
// `collegeRankings.ts` owns the US News rank labels.
//
// WHY IT EXISTS: `cats` is hand-typed per college per school, and hand-typing
// drifts. Measured 2026-08-25, before this file existed: 10 colleges carried
// `p4` in some schools' lists and not others, and `North Carolina A & T State
// University` carried `hbcu` in two of the three schools listing it. The
// signature is always the same — one school right, the rest wrong — and it is
// exactly the defect that shipped 27 wrong `nu75` tags past a green build.
//
// Human-readable companions (with per-figure sources and the reasoning behind
// each denominator) live at:
//   source-material/college-support/_shared/Power Four - Conference Membership 2026.md
//   source-material/college-support/_shared/HBCU - Membership and Count 2026.md
// Add a new member to BOTH (one row each), never to just one.
//
// Names are matched through `normName` from collegeRankings.ts — the SAME
// normalization the rank labels use — so `Penn State University` and
// `Penn State University (University Park)` resolve to one member.

import { normName } from './collegeRankings.ts'

/**
 * Power Four member institutions — 68, per the committed membership file.
 *
 * READ THIS BEFORE "CORRECTING" THE COUNT. A web search returns 67, and
 * published articles routinely say the ACC has 17 members. Both are defensible
 * and answer a different question: 67 counts FOOTBALL-PLAYING members and drops
 * Notre Dame, an ACC member in every sport except football. Most writing about
 * these conferences is football coverage, so 67 surfaces first.
 *
 * This app needs 68, because these buckets count COLLEGE ACCEPTANCES, not
 * football schedules. Notre Dame appears on most schools' acceptance lists, so
 * excluding it would give a denominator a numerator can exceed.
 *
 * 64 is the stale PRE-2024-REALIGNMENT figure (Cal, Stanford and SMU to the ACC;
 * UCLA, USC, Oregon and Washington to the Big Ten).
 */
export const POWER_FOUR: Record<string, 'ACC' | 'SEC' | 'Big Ten' | 'Big 12'> = {
  // ACC — 18 (Cal, Stanford and SMU joined 2024)
  'Boston College': 'ACC',
  'University of California (Berkeley)': 'ACC',
  'Clemson University': 'ACC',
  'Duke University': 'ACC',
  'Florida State University': 'ACC',
  'Georgia Institute of Technology': 'ACC',
  'University of Louisville': 'ACC',
  'University of Miami': 'ACC',
  'University of North Carolina at Chapel Hill': 'ACC',
  'North Carolina State University': 'ACC',
  'University of Notre Dame': 'ACC', // non-football member — see the note above
  'University of Pittsburgh': 'ACC',
  'Southern Methodist University': 'ACC',
  'Stanford University': 'ACC',
  'Syracuse University': 'ACC',
  'University of Virginia': 'ACC',
  'Virginia Tech': 'ACC',
  'Wake Forest University': 'ACC',

  // SEC — 16 (Oklahoma and Texas joined 2024–25)
  'The University of Alabama': 'SEC',
  'University of Arkansas': 'SEC',
  'Auburn University': 'SEC',
  'University of Florida': 'SEC',
  'University of Georgia': 'SEC',
  'University of Kentucky': 'SEC',
  'Louisiana State University': 'SEC',
  'University of Mississippi': 'SEC',
  'Mississippi State University': 'SEC',
  'University of Missouri': 'SEC',
  'University of Oklahoma': 'SEC',
  'University of South Carolina': 'SEC',
  'University of Tennessee': 'SEC',
  'The University of Texas at Austin': 'SEC',
  'Texas A&M University': 'SEC',
  'Vanderbilt University': 'SEC',

  // Big Ten — 18 (UCLA, USC, Oregon and Washington joined 2024-08-02)
  'University of Illinois Urbana-Champaign': 'Big Ten',
  'Indiana University': 'Big Ten',
  'University of Iowa': 'Big Ten',
  'University of Maryland': 'Big Ten',
  'University of Michigan': 'Big Ten',
  'Michigan State University': 'Big Ten',
  'University of Minnesota': 'Big Ten',
  'University of Nebraska': 'Big Ten',
  'Northwestern University': 'Big Ten',
  'Ohio State University': 'Big Ten',
  'University of Oregon': 'Big Ten',
  'Penn State University': 'Big Ten',
  'Purdue University': 'Big Ten',
  'Rutgers University': 'Big Ten',
  'University of California (Los Angeles)': 'Big Ten',
  'University of Southern California': 'Big Ten',
  'University of Washington': 'Big Ten',
  'University of Wisconsin': 'Big Ten',

  // Big 12 — 16
  'University of Arizona': 'Big 12',
  'Arizona State University': 'Big 12',
  'Baylor University': 'Big 12',
  'Brigham Young University': 'Big 12',
  'University of Central Florida': 'Big 12',
  'University of Cincinnati': 'Big 12',
  'University of Colorado Boulder': 'Big 12',
  'University of Houston': 'Big 12',
  'Iowa State University': 'Big 12',
  'University of Kansas': 'Big 12',
  'Kansas State University': 'Big 12',
  'Oklahoma State University': 'Big 12',
  'Texas Christian University': 'Big 12',
  'Texas Tech University': 'Big 12',
  'University of Utah': 'Big 12',
  'West Virginia University': 'Big 12',
}

/**
 * HBCUs appearing on at least one school's acceptance list.
 *
 * This is deliberately NOT the full federal roster of 107 — it is the subset the
 * acceptance lists actually name, which is what a tag check needs. The 107
 * denominator rendered in the buckets row is a separate figure and is sourced in
 * the committed membership file; do not conflate the two.
 *
 * 107 is the U.S. Department of Education designation count. A search may return
 * ~99, the narrower NCES classification — a different methodology, not a
 * correction. The project uses the DoE count deliberately.
 */
export const HBCUS: readonly string[] = [
  'Howard University',
  'Spelman College', // also lac75 — the HBCU tag is additive, not exclusive
  'Morehouse College',
  'Hampton University',
  'Xavier University of Louisiana',
  'Florida A&M University',
  'North Carolina A&T State University',
  'North Carolina Central University',
  'Winston-Salem State University',
  'Fayetteville State University',
  'Elizabeth City State University',
  'Johnson C. Smith University', // Providence Day spells it without the period
  'Livingstone College',
  'Morgan State University',
  'Delaware State University',
  'Albany State University',
  'Clark Atlanta University',
  'Tennessee State University',
  'Virginia State University',
  'South Carolina State University',
  'Alabama A&M University',
  'Fisk University',
  'Lincoln University', // both Lincoln (PA) and Lincoln (MO) are HBCUs
  // Added 2026-08-25 when this master was first checked against the data. All
  // were already correctly tagged `hbcu` in the school files; the roster copied
  // from the source .md only covered the schools' lists AS OF 2026-08-02 and had
  // not kept up. The tags were right and the table was wrong — see the header.
  'Norfolk State University',
  'Benedict College',
  'Claflin University',
  'Clinton College',
  'Voorhees University',
  "Saint Augustine's University",
  'Tougaloo College',
]

/**
 * Names that LOOK like a member but are not — an explicit guard against
 * substring false-positives, carried over from the committed source files.
 * Kept as data so the reasoning survives; `isHbcu` never substring-matches, but
 * a future maintainer tempted to add one will find these listed.
 */
export const NOT_HBCU: readonly string[] = [
  'East Tennessee State University', // not "Tennessee State University"
  'Middle Tennessee State University',
  'Georgia Southern University', // not the HBCU "Southern University"
  'Charleston Southern University',
]

/**
 * Written variants the acceptance lists use, mapped to the canonical key above.
 * Same purpose and shape as `ALIAS` in collegeRankings.ts: the lists are
 * transcribed from eleven different school publications, so one institution
 * arrives spelled a dozen ways ("Georgia Tech", "Virginia Polytechnic Institute
 * and State University", "The Ohio State University (Main Campus)").
 *
 * Keys are ALREADY normalized by `normName`. Add a variant here rather than
 * adding a second row to POWER_FOUR/HBCUS — one institution, one row.
 *
 * A few entries fix outright misspellings in the source lists ("Deleware",
 * "Clafin", an unclosed paren). They are aliased rather than corrected in place
 * because the acceptance lists are transcriptions of what each school published.
 */
const ALIAS: Record<string, string> = {
  // Institutions written under a different NAME, not merely a campus tag —
  // these cannot be derived and must be listed.
  'georgia tech': 'Georgia Institute of Technology',
  'virginia polytechnic institute & state univ': 'Virginia Tech',
  'univ of illinois': 'University of Illinois Urbana-Champaign',
  'univ of illinois urbana champaign': 'University of Illinois Urbana-Champaign',
  'univ of illinois at urbana champaign': 'University of Illinois Urbana-Champaign',
  'indiana univ at bloomington': 'Indiana University',
  'pennsylvania state univ': 'Penn State University',
  'univ of alabama tuscaloosa': 'The University of Alabama',
  'univ of nc at chapel hill': 'University of North Carolina at Chapel Hill',
  'univ of north carolina chapel hill': 'University of North Carolina at Chapel Hill',
  'univ of california berkeley': 'University of California (Berkeley)',
  'univ of california los angeles': 'University of California (Los Angeles)',
  'univ of colorado': 'University of Colorado Boulder',

  // HBCU — spelling variants and ampersand/expansion forms.
  'north carolina a & t state univ': 'North Carolina A&T State University',
  'nc a&t state univ': 'North Carolina A&T State University',
  'florida agricultural & mechanical': 'Florida A&M University',
  'deleware state univ': 'Delaware State University',
  'clafin univ': 'Claflin University',
  'johnson c smith univ': 'Johnson C. Smith University',
}

/**
 * Campus qualifiers the lists append to a flagship's name. Stripped structurally
 * rather than aliased one spelling at a time: eleven schools transcribe these
 * from eleven publications, so the same campus arrives as "(Main Campus)",
 * "-Main Campus", ", University Park", "(Tempe)" and so on. Listing every
 * product of {campus} x {separator} would be dozens of near-duplicate rows that
 * still miss the next spelling.
 *
 * Only ever strips a trailing qualifier from a name that ALREADY resolves
 * without it — so "University of South Carolina (Lancaster)", a genuinely
 * separate two-year campus, is never collapsed into its flagship.
 */
const CAMPUS_TAGS = [
  'main campus',
  'university park',
  'univ park',
  'tempe',
  'downtown phoenix',
  'bloomington',
  'knoxville',
  'madison',
  'ann arbor',
  'twin cities',
  'new brunswick',
  'boulder',
  'urbana champaign',
  'chapel hill',
  'berkeley',
  'los angeles',
  'college park',
]


const canon = (name: string, known: (n: string) => boolean) => {
  let n = normName(name)
  const aliased = ALIAS[n]
  if (aliased) n = normName(aliased)
  if (known(n)) return n
  // Try again without a trailing campus qualifier, but ONLY if the shorter name
  // is itself a known member — never collapse a distinct branch campus.
  for (const tag of CAMPUS_TAGS) {
    if (!n.endsWith(' ' + tag)) continue
    const base = n.slice(0, -(tag.length + 1)).replace(/[\s,]+$/, '')
    if (known(base)) return base
  }
  return n
}

const P4_BY_NORM = new Map(Object.entries(POWER_FOUR).map(([n, c]) => [normName(n), c]))
const HBCU_BY_NORM = new Set(HBCUS.map(normName))

/**
 * The canonical roster key this college resolves to, or undefined.
 * Use this to count DISTINCT INSTITUTIONS: the acceptance lists name the same
 * institution several ways, so counting raw tags double-counts (Cannon carries
 * 54 `p4` tags across 51 institutions). The bucket denominators are institution
 * counts, so they must be derived through this.
 */
export function canonicalMember(name: string): string | undefined {
  const p = canon(name, (n) => P4_BY_NORM.has(n))
  if (P4_BY_NORM.has(p)) return p
  const h = canon(name, (n) => HBCU_BY_NORM.has(n))
  return HBCU_BY_NORM.has(h) ? h : undefined
}

/** The Power Four conference this college belongs to, or undefined. */
export function powerFourConference(name: string) {
  return P4_BY_NORM.get(canon(name, (n) => P4_BY_NORM.has(n)))
}

/** Is this college a Power Four member institution? */
export function isPowerFour(name: string): boolean {
  return P4_BY_NORM.has(canon(name, (n) => P4_BY_NORM.has(n)))
}

/** Is this college a designated HBCU? Exact (normalized) match, never substring. */
export function isHbcu(name: string): boolean {
  return HBCU_BY_NORM.has(canon(name, (n) => HBCU_BY_NORM.has(n)))
}
