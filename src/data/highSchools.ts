// GENERATED SOURCE OF TRUTH — the master high-school destination table.
//
// Every high school named on a K-8 school's "Where They Land" placement list
// resolves its metadata from THIS file, so one institution has exactly one
// record everywhere and cross-school conflicts are impossible by construction.
// The per-school placement files carry only { name, slug? } — never an inline
// url, kind or rank. Look a record up with `highSchoolFor(name)`.
//
// Modelled on the college masters (`collegeUrls.ts`, `collegeRankings.ts`) and
// deliberately ONE file rather than three: a high school's homepage, its kind
// and its Niche rank are all facts about the same institution, fetched in the
// same pass, and splitting them would mean three tables to keep in step for no
// gain. The college side is two files only because rankings and URLs were built
// a month apart.
//
// Human-readable companion (with a verification per row) lives at
// source-material/high-school-placement/_shared/High School Destinations.md and
// is kept in sync by `npm run check:highschools`.
//
// ──────────────────────────────────────────────────────────────────────────
// WHAT `kind` MEANS, AND WHY IT CAN DISAGREE WITH THE CARD
//
// `kind` is what the institution ACTUALLY is, verified against its own site.
// The placement card groups destinations by the SCHOOL'S OWN published
// categories, which are not always the same thing — Trinity files two NC public
// charters under "Charlotte-area independent schools", and four public/day
// schools under "Boarding and out-of-area".
//
// Where the two disagreed, the user's call (2026-09-17) was to re-group the
// card by true kind. So this table is now the grouping authority, and the
// per-school `cats` follow it. The school's own wording is preserved in
// source-material rather than on the page.
//
// ──────────────────────────────────────────────────────────────────────────
// WHY SOME ROWS HAVE NO URL — each is a CONFIRMED result, not a gap
//
//  1. CLOSED / MERGED. Northside Christian Academy closed in 2024; its old
//     domain now 301s to an unrelated Norwegian restaurant, so linking it would
//     send a parent somewhere actively wrong. Resurrection Christian School
//     merged into Charlotte United Christian Academy in 2009. Both remain on
//     the list because it is cumulative 2004-2026 and both were real
//     placements; `status` records why they do not link.
//
//  2. NAMES THAT LOOK AMBIGUOUS AND ARE NOT — a caution for the next pass.
//     Five destinations bear names shared by many schools nationally
//     ("St. Andrew's School", "St. George's School", "St. Paul's",
//     "St. Martin High School", "Faith Lutheran High School"). A first research
//     pass sent the BARE NAMES out and got four NOT CONFIRMEDs back.
//
//     The states were in the data the whole time: the placement file's own
//     `notes` map carries Delaware, Rhode Island, New Hampshire, Mississippi
//     and Nevada, sitting a few lines from the names. Always pass a
//     destination's note along with its name when resolving one of these.
//     Four of the five independently-guessed schools then matched the state the
//     school itself published, which is two signals agreeing rather than one.
//
// Coverage is therefore DELIBERATELY NOT ASSERTED by the checker, for the same
// reason check:collegeurls does not assert it: a gate nobody can ever get to
// zero stops being read (CLAUDE.md records that failure mode three times over).

// ──────────────────────────────────────────────────────────────────────────
// NICHE RANKS — what is stored, and two things to know before adding more
//
// Read VERBATIM off each school's own rank badge on the Niche listing
// ("#N Best Private K-12 Schools in Charlotte Area"), never inferred from a
// letter grade or from a card's position in the list. Niche 403s an ordinary
// fetch; a curl with a browser User-Agent returns the real HTML.
//
//  1. NICHE'S OWN SEQUENCE SKIPS #14 — IN BOTH RANKINGS. The K-12 list runs
//     1-13 then 15-26; the high-school list runs #1-#40 with #14 likewise
//     absent. The same single number missing from two independent rankings is a
//     quirk on Niche's side, not a parse error. Everything below it — Hickory Grove #16,
//     Southlake #17, Grace #32 — may therefore sit one off whatever Niche
//     intends. The numbers here are what Niche PUBLISHES, copied char-for-char,
//     which is the same rule this project applies to a tuition figure; #16 was
//     independently confirmed against a search snippet. Do not "correct" them.
//
//  2. TWO RANKINGS, LABELLED APART. K-12 schools carry
//     "Charlotte Private K-12 Niche Rank #N". A 9-12 school cannot appear in a
//     K-12 ranking at all, so Charlotte Catholic and Christ the King take
//     "Charlotte Private HS Niche Rank #N" from Niche's separate high-school
//     list. The label names both the SCALE and the SOURCE, because #2 and #22
//     are otherwise read as one ranking. The label states which list a number came from
//     because #2 and #22 are otherwise read as one scale.
//
//     Unranked is a real state: The Fletcher School IS listed in the K-12
//     ranking but carries no badge and no overall grade — it serves students
//     with learning differences, which likely leaves Niche without the data to
//     score it. It renders with no rank, which is correct.

import { normName } from './collegeRankings.ts'

/**
 * What the institution actually is, verified against its own site.
 *
 *  - `independent` — private, tuition-charging, in the Charlotte area
 *  - `public`      — public district, magnet, or tuition-free public charter
 *  - `boarding`    — residential independent school, wherever it is
 *  - `day`         — private day school OUTSIDE the Charlotte area
 *
 * `independent` and `day` are the same kind of institution split by geography,
 * because the card's categories are the school's own and its local list says
 * "Charlotte-AREA independent". A Las Vegas day school is independent but not
 * Charlotte-area, and filing it under either "Charlotte-area" or "boarding"
 * states something untrue. Added 2026-09-17 (user).
 */
export type HighSchoolKind = 'independent' | 'public' | 'boarding' | 'day'

/** Why a row carries no URL, where the reason is a finding worth keeping. */
export type HighSchoolStatus = 'closed' | 'merged' | 'ambiguous'

export type HighSchoolRecord = {
  /** What the institution actually is — see the header note on `kind`. */
  kind: HighSchoolKind
  /** Official homepage root. Absent = confirmed unlinkable, see the header. */
  url?: string
  /** City the site itself gives — the disambiguator for repeated names. */
  city?: string
  /** Two-letter state, or a country for the one non-US entry. */
  state?: string
  /**
   * Niche rank label, rendered verbatim on the row.
   *
   * Two DIFFERENT scales, which is why the label is stored whole rather than as
   * a bare number: Charlotte-metro private K-12 for the independents, national
   * boarding for the boarding schools. A bare "#3" beside a bare "#12" would
   * invite a comparison neither ranking supports.
   */
  nicheRank?: string
  /** Why this row does not link, where that is itself a finding. */
  status?: HighSchoolStatus
  /** A short qualifier shown in the companion doc, never on the page. */
  note?: string
}

/**
 * Canonical name -> record. Keys are the names EXACTLY as the placement lists
 * write them, because that is what `highSchoolFor()` is handed — the list is a
 * citation surface and names are never corrected here.
 */
export const HIGH_SCHOOLS: Record<string, HighSchoolRecord> = {
  /* ---------------------------------------------------------------------- */
  /* Charlotte-area independent — the 10 with a dossier in this app.         */
  /* These render as an INTERNAL cross-link to that dossier, so they need no  */
  /* homepage url; `kind` and `nicheRank` still apply.                       */
  /* ---------------------------------------------------------------------- */
  'Cannon School': { kind: 'independent', city: 'Concord', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #5' },
  'Carmel Christian': { kind: 'independent', city: 'Matthews', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #13' },
  'Charlotte Catholic': { kind: 'independent', city: 'Charlotte', state: 'NC', nicheRank: 'Charlotte Private HS Niche Rank #22' },
  'Charlotte Christian School': { kind: 'independent', city: 'Charlotte', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #4' },
  'Charlotte Country Day School': { kind: 'independent', city: 'Charlotte', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #3' },
  'Charlotte Latin School': { kind: 'independent', city: 'Charlotte', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #2' },
  'Covenant Day School': { kind: 'independent', city: 'Matthews', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #10' },
  'Davidson Day School': { kind: 'independent', city: 'Davidson', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #7' },
  'Hickory Grove Christian Academy': { kind: 'independent', city: 'Charlotte', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #16' },
  'Providence Day School': { kind: 'independent', city: 'Charlotte', state: 'NC', nicheRank: 'Charlotte Private K-12 Niche Rank #1' },

  /* ---------------------------------------------------------------------- */
  /* Charlotte-area independent — no dossier yet, so these link out.         */
  /* ---------------------------------------------------------------------- */
  'Grace Academy': {
    kind: 'independent',
    url: 'https://graceacademync.com',
    city: 'Matthews',
    state: 'NC',
    nicheRank: 'Charlotte Private K-12 Niche Rank #32',
    note: 'University-model K-12 Christian school, 3645 Pleasant Plains Rd',
  },
  'Southlake Christian Academy': {
    kind: 'independent',
    url: 'https://www.southlakechristian.org',
    city: 'Huntersville',
    state: 'NC',
    nicheRank: 'Charlotte Private K-12 Niche Rank #17',
    note: 'Styles itself SouthLake; JK-12, 13820 Hagers Ferry Rd',
  },
  'The Fletcher School': {
    kind: 'independent',
    url: 'https://www.thefletcherschool.org',
    city: 'Charlotte',
    state: 'NC',
    note: 'K-12 for students with learning differences, 8500 Sardis Rd',
  },
  'Christ the King Catholic High School': {
    kind: 'independent',
    url: 'https://www.ctkchs.org',
    city: 'Huntersville',
    state: 'NC',
    nicheRank: 'Charlotte Private HS Niche Rank #21',
    note: 'Confirmed via the Diocese of Charlotte listing — the name collides widely',
  },

  /* Closed / merged: on the list because it is cumulative 2004-2026. */
  'Northside Christian Academy': {
    kind: 'independent',
    city: 'Charlotte',
    state: 'NC',
    status: 'closed',
    note: 'Closed 2024. Old domain ncaknights.com now 301s to an unrelated site — never link it.',
  },
  'Resurrection Christian School': {
    kind: 'independent',
    city: 'Charlotte',
    state: 'NC',
    status: 'merged',
    note: 'Merged 2009 into Charlotte United Christian Academy. The live rcschool.org is a different school in Colorado.',
  },

  /* Filed by Trinity under independent; both are tuition-free NC PUBLIC
     charters per their own sites, so they carry kind: public and take no
     private rank. */
  'Charlotte Lab School': {
    kind: 'public',
    url: 'https://www.charlottelabschool.org',
    city: 'Charlotte',
    state: 'NC',
    note: 'Public charter, not independent — its own site says so',
  },
  'Community School of Davidson': {
    kind: 'public',
    url: 'https://www.csdspartans.org',
    city: 'Davidson',
    state: 'NC',
    note: 'Public charter, not independent — its own mission text says so',
  },

  /* ---------------------------------------------------------------------- */
  /* Boarding and out-of-area, verified against each school's own site.      */
  /* ---------------------------------------------------------------------- */
  'Asheville School': {
    kind: 'boarding',
    url: 'https://www.ashevilleschool.org',
    city: 'Asheville',
    state: 'NC',
    note: 'Cloudflare bot-blocks fetch; confirmed via Wikipedia official-website + indexed pages on its own domain',
  },
  'Bishop England High School': {
    kind: 'boarding',
    url: 'https://www.behs.com',
    city: 'Charleston',
    state: 'SC',
    note: 'Catholic college-prep, 363 Seven Farms Dr, Daniel Island',
  },
  'Blair Academy': {
    kind: 'boarding',
    url: 'https://www.blair.edu',
    city: 'Blairstown',
    state: 'NJ',
    note: '2 Park St, coed NJ boarding school founded 1848',
  },
  'Brooklyn Friends School': {
    kind: 'day',
    url: 'https://brooklynfriends.org',
    city: 'Brooklyn',
    state: 'NY',
    note: 'Quaker PreK-12, 375 Pearl St. A DAY school, not boarding',
  },
  'Cape Fear Academy': {
    kind: 'day',
    url: 'https://www.capefearacademy.org',
    city: 'Wilmington',
    state: 'NC',
    note: 'PreK-12 independent DAY school, 3900 S College Rd',
  },
  'Cardinal Gibbons High School': {
    kind: 'boarding',
    url: 'https://www.cghsnc.org',
    city: 'Raleigh',
    state: 'NC',
    note: 'The Raleigh NC school, NOT the same-named one in Fort Lauderdale FL',
  },
  'Chatham Hall': {
    kind: 'boarding',
    url: 'https://www.chathamhall.org',
    city: 'Chatham',
    state: 'VA',
    note: 'Girls 9-12 boarding/day, Episcopal tradition',
  },
  'Christ School': {
    kind: 'boarding',
    url: 'https://www.christschool.org',
    city: 'Arden',
    state: 'NC',
    note: 'Boys boarding & day, founded 1900',
  },
  'Christchurch School': {
    kind: 'boarding',
    url: 'https://www.christchurchschool.org',
    city: 'Christchurch',
    state: 'VA',
    note: 'Episcopal 9-12 boarding/day on the Rappahannock',
  },
  'Collegiate School': {
    kind: 'boarding',
    url: 'https://www.collegiaterva.org',
    city: 'Richmond',
    state: 'VA',
    note: 'DOMAIN MOVED: old collegiate-va.org 308s here. The Richmond VA school, not NYC/Houston. JK-12 day',
  },
  'Deerfield Academy': {
    kind: 'boarding',
    url: 'https://deerfield.edu',
    city: 'Deerfield',
    state: 'MA',
    note: '7 Boyden Ln',
  },
  'Episcopal High School': {
    kind: 'boarding',
    url: 'https://www.episcopalhighschool.org',
    city: 'Alexandria',
    state: 'VA',
    note: '100% residential. The Alexandria VA school, not Houston/Baton Rouge/Jacksonville',
  },
  'Hargrave Military Academy': {
    kind: 'boarding',
    url: 'https://hargrave.edu',
    city: 'Chatham',
    state: 'VA',
    note: 'Boys 7-12 + postgrad, since 1909',
  },
  'Jackson-Reed High School': {
    kind: 'public',
    url: 'https://jacksonreedhs.org',
    city: 'Washington',
    state: 'DC',
    note: 'DC\'s largest PUBLIC high school, formerly Woodrow Wilson HS (renamed 2022)',
  },
  'La Paz Community School': {
    kind: 'boarding',
    url: 'https://www.lapazschool.org',
    city: 'Guanacaste',
    state: 'Costa Rica',
    note: 'Bilingual preK-12 IB, two Guanacaste campuses',
  },
  'Lawrenceville School': {
    kind: 'boarding',
    url: 'https://www.lawrenceville.org',
    city: 'Lawrenceville',
    state: 'NJ',
    note: 'Coed 9-12 boarding and day',
  },
  'Masters School': {
    kind: 'boarding',
    url: 'https://www.mastersny.org',
    city: 'Dobbs Ferry',
    state: 'NY',
    note: 'The Masters School NY, not the UK/West Hartford ones. Grades 5-12, boarding 9-12',
  },
  'Mercersburg Academy': {
    kind: 'boarding',
    url: 'https://www.mercersburg.edu',
    city: 'Mercersburg',
    state: 'PA',
    note: 'Coed 9-12 + PG boarding/day',
  },
  'Morristown High School': {
    kind: 'public',
    url: 'https://mhs.morrisschooldistrict.org',
    city: 'Morristown',
    state: 'NJ',
    note: 'PUBLIC, Morris School District\'s only high school',
  },
  'Nauset High School': {
    kind: 'public',
    url: 'https://www.nausetschools.org/o/nrhs',
    city: 'Eastham',
    state: 'MA',
    note: 'Nauset Regional High School, PUBLIC, Cape Cod. No standalone domain; this path is its homepage',
  },
  'North Boise Jr. High School': {
    kind: 'public',
    url: 'https://north.boiseschools.org',
    city: 'Boise',
    state: 'ID',
    note: 'NAME AS PUBLISHED. The actual school is North Junior High School, a PUBLIC grades 7-9 junior high',
  },
  'Phoebus High School': {
    kind: 'public',
    url: 'https://phs.hampton.k12.va.us',
    city: 'Hampton',
    state: 'VA',
    note: 'PUBLIC, Hampton City Schools',
  },
  'Putney School': {
    kind: 'boarding',
    url: 'https://www.putneyschool.org',
    city: 'Putney',
    state: 'VT',
    note: 'Progressive coed boarding',
  },
  'Rabun Gap Nacoochee School': {
    kind: 'boarding',
    url: 'https://www.rabungap.org',
    city: 'Rabun Gap',
    state: 'GA',
    note: 'Boarding/day grades 5-12',
  },
  'Salem Academy': {
    kind: 'boarding',
    url: 'https://salemacademy.com',
    city: 'Winston-Salem',
    state: 'NC',
    note: 'All-girls boarding/day 9-12. Distinct from Salem College (salem.edu)',
  },
  'St. Mary’s School': {
    kind: 'boarding',
    url: 'https://www.sms.edu',
    city: 'Raleigh',
    state: 'NC',
    note: 'Episcopal all-girls boarding/day 9-12. Own spelling is Saint Mary\'s School',
  },
  'St. Timothy’s School': {
    kind: 'boarding',
    url: 'https://www.stt.org',
    city: 'Stevenson',
    state: 'MD',
    note: 'All-girls boarding/day 9-12, IB World School',
  },
  'Tampa Preparatory School': {
    kind: 'day',
    url: 'https://tampaprep.org',
    city: 'Tampa',
    state: 'FL',
    note: 'Grades 6-12. A DAY school, not boarding',
  },
  'The Cate School': {
    kind: 'boarding',
    url: 'https://www.cate.org',
    city: 'Carpinteria',
    state: 'CA',
    note: 'Own name is Cate School (no The)',
  },
  'The McCallie School': {
    kind: 'boarding',
    url: 'https://www.mccallie.org',
    city: 'Chattanooga',
    state: 'TN',
    note: 'All-boys boarding/day 6-12',
  },
  'The Millbrook School': {
    kind: 'boarding',
    url: 'https://www.millbrook.org',
    city: 'Millbrook',
    state: 'NY',
    note: 'Own name is Millbrook School. Distinct from Millbrook High School (NY public)',
  },
  'The Taft School': {
    kind: 'boarding',
    url: 'https://www.taftschool.org',
    city: 'Watertown',
    state: 'CT',
    note: 'Distinct from the several public Taft High Schools',
  },
  'The Thacher School': {
    kind: 'boarding',
    url: 'https://www.thacher.org',
    city: 'Ojai',
    state: 'CA',
    note: 'Boarding 9-12',
  },
  'Virginia Episcopal School': {
    kind: 'boarding',
    url: 'https://www.ves.org',
    city: 'Lynchburg',
    state: 'VA',
    note: 'Coed boarding/day 9-12',
  },
  'Woodberry Forest School': {
    kind: 'boarding',
    url: 'https://www.woodberry.org',
    city: 'Woodberry Forest',
    state: 'VA',
    note: 'All-boys boarding 9-12',
  },

  /* Ambiguous or unresolvable — NO url, by the user's call (2026-09-17).
     Each name carries no state in the source and belongs to many schools.
     Candidate sets are in the companion doc; do NOT pick the famous one. */
  'Faith Lutheran High School': {
    kind: 'day',
    url: 'https://www.faithlutheranlv.org',
    city: 'Las Vegas',
    state: 'NV',
    note: 'Trinity’s own note says Nevada. Formal name Faith Lutheran Middle School & High School, grades 6-12, LCMS. A DAY school — its own admissions pages state no on-campus boarding',
  },
  'St. Andrew’s School': {
    kind: 'boarding',
    url: 'https://www.standrews-de.org',
    city: 'Middletown',
    state: 'DE',
    note: 'Trinity’s own note says Delaware, and research independently resolved the bare name to this school — all-boarding coed Episcopal 9-12',
  },
  'St. George’s School': {
    kind: 'boarding',
    url: 'https://www.stgeorges.edu',
    city: 'Middletown',
    state: 'RI',
    note: 'Trinity’s own note says Rhode Island, matching the independently-resolved Episcopal boarding school, 372 Purgatory Rd',
  },
  'St. Martin High School': {
    kind: 'public',
    url: 'https://smhs.jcsd.ms',
    city: 'Ocean Springs',
    state: 'MS',
    note: 'Trinity’s own note says Mississippi. PUBLIC 9-12, Jackson County School District — filed by Trinity under boarding, but it is neither boarding nor independent',
  },
  'St. Paul’s': {
    kind: 'boarding',
    url: 'https://www.sps.edu',
    city: 'Concord',
    state: 'NH',
    note: 'Trinity’s own note says New Hampshire, matching the independently-resolved fully-residential Episcopal 9-12 school',
  },

  /* ---------------------------------------------------------------------- */
  /* Public, charter and magnet. No homepage links requested for these      */
  /* (user, 2026-09-17) and no private rank applies, so they carry `kind`   */
  /* only — enough for the card to group them correctly.                    */
  /* ---------------------------------------------------------------------- */
  'A.C. Reynolds High School': { kind: 'public' },
  'Ardrey Kell High School': { kind: 'public' },
  'Butler High School': { kind: 'public' },
  'Central High School': { kind: 'public' },
  'Chambers High School': { kind: 'public' },
  'Charlotte Engineering Early College': { kind: 'public' },
  'Cox Mill High School': { kind: 'public' },
  'East Gaston High School': { kind: 'public' },
  'East Lincoln High School': { kind: 'public' },
  'East Mecklenburg High School': { kind: 'public' },
  'Harding High School': { kind: 'public' },
  'Hawthorne Academy of Health Sciences': { kind: 'public' },
  'Hickory Ridge High School': { kind: 'public' },
  'Hopewell High School': { kind: 'public' },
  'Hough High School': { kind: 'public' },
  'Indian Land High School': { kind: 'public' },
  'JM Robinson High School': { kind: 'public' },
  'Julius L. Chambers High School': { kind: 'public' },
  'Lake Norman Charter School': { kind: 'public' },
  'Lake Norman High School': { kind: 'public' },
  'Langtree Charter Academy': { kind: 'public' },
  'Laurel Springs High School': { kind: 'public' },
  'Mallard Creek High School': { kind: 'public' },
  'Mountain Island Charter School': { kind: 'public' },
  'Myers Park High School': { kind: 'public' },
  'North Lincoln High School': { kind: 'public' },
  'North Mecklenburg High School': { kind: 'public' },
  'Northwest School of the Arts': { kind: 'public' },
  'Phillip O’Berry Academy of Technology': { kind: 'public' },
  'Porter Ridge High School': { kind: 'public' },
  'Providence High School': { kind: 'public' },
  'Queens Grant High School': { kind: 'public' },
  'Robinson High School': { kind: 'public' },
  'Rocky River High School': { kind: 'public' },
  'South Mecklenburg High School': { kind: 'public' },
  'Stuart W. Cramer High School': { kind: 'public' },
  'University of North Carolina School of the Arts': { kind: 'public' },
  'West Mecklenburg High School': { kind: 'public' },
  'Westwood High School': { kind: 'public' },
}

/* Built once from the canonical table, through the SAME normalizer the college
   masters use. One copy, per that module's own note — two would drift. */
const BY_NORM: Map<string, HighSchoolRecord> = new Map(
  Object.entries(HIGH_SCHOOLS).map(([name, rec]) => [normName(name), rec]),
)

/**
 * The record for a high school by any of its name spellings, or undefined if
 * the table does not carry it (so the name renders as plain text).
 */
export function highSchoolFor(name: string): HighSchoolRecord | undefined {
  return BY_NORM.get(normName(name))
}

/** The homepage for a high school, or undefined — see the header on why. */
export function highSchoolUrl(name: string): string | undefined {
  return highSchoolFor(name)?.url
}

/** The Niche rank label for a high school, rendered verbatim, or undefined. */
export function highSchoolRank(name: string): string | undefined {
  return highSchoolFor(name)?.nicheRank
}
