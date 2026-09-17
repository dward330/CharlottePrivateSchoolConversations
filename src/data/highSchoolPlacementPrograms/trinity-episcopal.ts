// Trinity Episcopal School — High School Placement.
//
// The FIRST occupant of this area. PR #308 shipped the whole shape with an empty
// PROGRAMS map; this is the school it was built for.
//
// Three things about this school's data shaped what is and is not here:
//
//  1. THE PER-CLASS TABLE IS DELIBERATELY OMITTED (`classes: []`). `PlacementClass`
//     requires `acceptedPct` + `acceptedCount`, and the component renders them
//     under a chrome header reading "Accepted to a top-two choice" in all ten
//     locales. Trinity publishes NO such figure — "first choice", "top two" and
//     "97%" return zero hits across all 100 sitemap pages, all 51 blog posts and
//     both profile PDFs. Putting its lifer rate in that column would print a
//     false statement in ten languages.
//
//     What Trinity publishes instead is MATRICULATION, per class: graduates,
//     "lifers" (students enrolled since Kindergarten) and the count of distinct
//     high schools. That four-year series is carried in `stats` and in the
//     destinations card. A `lifers`/`distinctSchools` variant of PlacementClass
//     would render it properly, but that changes a shared component and ten
//     locale catalogs — a UX-gate change, raised at review rather than taken here.
//
//  2. THE CUMULATIVE SPLIT IS NOT A PER-CLASS RATE. 31/57/12 is across 1,060
//     graduates and 23 classes since 2004. It is labelled that way everywhere,
//     and it is NOT modelled as `tenYear` — that field is a percentage aggregate
//     with one figure, whereas this is a three-way split whose parts sum to 100%.
//
//  3. THE DESTINATION LIST IS CUMULATIVE AND CARRIES UNEXPLAINED MARKERS. 99
//     entries across 2004-2026, of which 41 carry a trailing asterisk with NO
//     legend anywhere in the source PDF. The asterisks are stripped here and the
//     absence is stated as a flag — publishing an interpretation of an unexplained
//     marker would be inventing data.
//
// Source material: source-material/high-school-placement/trinity-episcopal/

import type { HighSchoolPlacementProgram } from '../highSchoolPlacement.ts'

const PROFILE =
  'https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf'
const K8 = 'https://www.tescharlotte.org/admission/k-8-advantage.cfm'
const COUNSELORS = 'https://www.tescharlotte.org/blog.cfm?threadid=6'

export const trinityEpiscopal: HighSchoolPlacementProgram = {
  // NO `outcomes` CARD (user, 2026-09-16). It carried the cumulative
  // 31% independent / 57% public / 12% boarding split across 1,060 graduates
  // and the 23-class denominator. `outcomes` is optional on the type, so the
  // area now opens on `placement`. The figures remain in
  // source-material/high-school-placement/trinity-episcopal/.

  /* ------------------------------------------------ 2b the programme -- */
  placement: {
    headline:
      'Two high school counselors, one for public and independent schools and one for boarding — a structure the school added in 2023-24.',
    // Second sentence removed 2026-09-16 (it graded the school's transparency).
    subhead:
      'Trinity frames the K–8 model as choosing a high school at the end of 8th grade rather than at the start of Kindergarten.',
    stats: [
      {
        value: '2',
        denominator: 'public + independent · boarding',
        caption: 'high school counsellors, by published scope',
      },
      {
        value: '9',
        denominator: 'Kindergarten through 8th grade',
        caption: 'years on one campus before the search begins',
      },
    ],
    steps: [
      {
        when: 'Throughout Middle School — knowing the schools',
        kind: 'Exposure',
        text: 'The counsellor for public and independent placement visits area schools and, in her words, gets “a feel for who might benefit from knowing this school,” then points families toward fits based on what they want: “Do they want big class sizes? Are sports important? Extracurricular?”',
      },
      {
        when: 'Middle School — the boarding track, if a family wants it',
        kind: 'A distinct route',
        text: 'Boarding placement is handled separately and by a different person. It is not a marginal path here: 12% of all graduates since 2004 went to boarding schools, and the destination list includes Deerfield, Lawrenceville, Mercersburg, Woodberry Forest, St. Paul’s and The Taft School.',
      },
      {
        when: 'Grade 8 — the decision',
        kind: 'The K–8 thesis',
        text: 'The school’s stated case is that nine years of one faculty knowing a child produces a better-informed choice: parents “feel more confident about finding the high school that’s best suited for their child at the end of 8th Grade rather than at the beginning of Kindergarten.”',
      },
    ],
    // No owns / notPublished columns and no flags (user, 2026-09-16). The two
    // columns graded the school's transparency rather than describing the
    // programme, and the three flags were verification apparatus (a title
    // discrepancy between two staff pages, a combined teaching load, and a
    // gated-portal caveat). All of it stays in source-material/.
    owns: [],
    notPublished: [],
    flags: [],
    sources: [
      { label: 'tescharlotte.org — The K-8 Advantage', url: K8 },
      {
        label: 'tescharlotte.org — how the counsellors work with families',
        url: COUNSELORS,
      },
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
    ],
  },

  /* ----------------------------------------------- 2c where they land -- */
  destinations: {
    headline:
      'Ninety-nine named high schools across 23 graduating classes — and eight of them have their own dossier here.',
    subhead:
      'This is the school’s own cumulative list for the Classes of 2004–2026, grouped into the three kinds of destination it reports. It is a list of names only: the school publishes no per-school counts and no per-year attribution, so no destination should be read as “N students went there”.',
    categories: [
      {
        key: 'charlotte-independent',
        label: 'Charlotte-area independent schools',
        schools: [
          { name: 'Cannon School', slug: 'cannon' },
          { name: 'Carmel Christian', slug: 'carmel-christian' },
          { name: 'Charlotte Catholic', slug: 'charlotte-catholic' },
          { name: 'Charlotte Christian School', slug: 'charlotte-christian' },
          { name: 'Charlotte Country Day School', slug: 'charlotte-country-day' },
          { name: 'Charlotte Latin School', slug: 'charlotte-latin' },
          { name: 'Covenant Day School', slug: 'covenant-day' },
          { name: 'Davidson Day School', slug: 'davidson-day' },
          { name: 'Hickory Grove Christian Academy', slug: 'hickory-grove-christian' },
          { name: 'Providence Day School', slug: 'providence-day' },
          { name: 'Charlotte Lab School' },
          { name: 'Community School of Davidson' },
          { name: 'Grace Academy' },
          { name: 'Northside Christian Academy' },
          { name: 'Resurrection Christian School' },
          { name: 'Southlake Christian Academy' },
          { name: 'The Fletcher School' },
          { name: 'Christ the King Catholic High School' },
        ],
      },
      {
        key: 'public',
        label: 'Public, charter and magnet schools',
        schools: [
          { name: 'A.C. Reynolds High School' },
          { name: 'Ardrey Kell High School' },
          { name: 'Butler High School' },
          { name: 'Central High School' },
          { name: 'Chambers High School' },
          { name: 'Charlotte Engineering Early College' },
          { name: 'Cox Mill High School' },
          { name: 'East Gaston High School' },
          { name: 'East Lincoln High School' },
          { name: 'East Mecklenburg High School' },
          { name: 'Harding High School' },
          { name: 'Hawthorne Academy of Health Sciences' },
          { name: 'Hickory Ridge High School' },
          { name: 'Hopewell High School' },
          { name: 'Hough High School' },
          { name: 'Indian Land High School' },
          { name: 'JM Robinson High School' },
          { name: 'Julius L. Chambers High School' },
          { name: 'Lake Norman Charter School' },
          { name: 'Lake Norman High School' },
          { name: 'Langtree Charter Academy' },
          { name: 'Laurel Springs High School' },
          { name: 'Mallard Creek High School' },
          { name: 'Mountain Island Charter School' },
          { name: 'Myers Park High School' },
          { name: 'North Lincoln High School' },
          { name: 'North Mecklenburg High School' },
          { name: 'Northwest School of the Arts' },
          { name: 'Phillip O’Berry Academy of Technology' },
          { name: 'Porter Ridge High School' },
          { name: 'Providence High School' },
          { name: 'Queens Grant High School' },
          { name: 'Robinson High School' },
          { name: 'Rocky River High School' },
          { name: 'South Mecklenburg High School' },
          { name: 'Stuart W. Cramer High School' },
          { name: 'University of North Carolina School of the Arts' },
          { name: 'West Mecklenburg High School' },
          { name: 'Westwood High School' },
        ],
        notes: {
          'Lake Norman High School': 'published as “Lake Normal High School”',
          'University of North Carolina School of the Arts': 'Winston-Salem · residential arts conservatory',
        },
      },
      {
        key: 'boarding',
        label: 'Boarding and out-of-area schools',
        schools: [
          { name: 'Asheville School' },
          { name: 'Bishop England High School' },
          { name: 'Blair Academy' },
          { name: 'Brooklyn Friends School' },
          { name: 'Cape Fear Academy' },
          { name: 'Cardinal Gibbons High School' },
          { name: 'Chatham Hall' },
          { name: 'Christ School' },
          { name: 'Christchurch School' },
          { name: 'Collegiate School' },
          { name: 'Deerfield Academy' },
          { name: 'Episcopal High School' },
          { name: 'Faith Lutheran High School' },
          { name: 'Hargrave Military Academy' },
          { name: 'Jackson-Reed High School' },
          { name: 'La Paz Community School' },
          { name: 'Lawrenceville School' },
          { name: 'Masters School' },
          { name: 'Mercersburg Academy' },
          { name: 'Morristown High School' },
          { name: 'Nauset High School' },
          { name: 'North Boise Jr. High School' },
          { name: 'Phoebus High School' },
          { name: 'Putney School' },
          { name: 'Rabun Gap Nacoochee School' },
          { name: 'Salem Academy' },
          { name: 'St. Andrew’s School' },
          { name: 'St. George’s School' },
          { name: 'St. Martin High School' },
          { name: 'St. Mary’s School' },
          { name: 'St. Paul’s' },
          { name: 'St. Timothy’s School' },
          { name: 'Tampa Preparatory School' },
          { name: 'The Cate School' },
          { name: 'The McCallie School' },
          { name: 'The Millbrook School' },
          { name: 'The Taft School' },
          { name: 'The Thacher School' },
          { name: 'Virginia Episcopal School' },
          { name: 'Woodberry Forest School' },
        ],
        notes: {
          'Asheville School': 'Asheville',
          'Bishop England High School': 'South Carolina',
          'Blair Academy': 'New Jersey',
          'Cardinal Gibbons High School': 'Florida',
          'Chatham Hall': 'Virginia',
          'Christ School': 'Asheville',
          'Christchurch School': 'Virginia',
          'Collegiate School': 'Virginia',
          'Episcopal High School': 'Virginia',
          'Faith Lutheran High School': 'Nevada',
          'Hargrave Military Academy': 'Virginia',
          'Jackson-Reed High School': 'Washington DC',
          'La Paz Community School': 'Costa Rica',
          'Lawrenceville School': 'New Jersey',
          'Masters School': 'New York',
          'Morristown High School': 'New Jersey',
          'Nauset High School': 'Massachusetts',
          'North Boise Jr. High School': 'Idaho',
          'Putney School': 'Vermont',
          'Rabun Gap Nacoochee School': 'Georgia',
          'Salem Academy': 'Winston-Salem',
          'St. Andrew’s School': 'Delaware',
          'St. George’s School': 'Rhode Island',
          'St. Martin High School': 'Mississippi',
          'St. Mary’s School': 'Raleigh',
          'St. Paul’s': 'New Hampshire',
          'St. Timothy’s School': 'Maryland',
          'Tampa Preparatory School': 'Florida',
          'The Cate School': 'California',
          'The McCallie School': 'Tennessee',
          'The Millbrook School': 'New York',
          'The Taft School': 'Connecticut',
          'The Thacher School': 'California',
          'Virginia Episcopal School': 'Virginia',
          'Woodberry Forest School': 'Virginia',
        },
      },
    ],
    // No flags (user, 2026-09-16) — research apparatus: an unexplained
    // asterisk marker, duplicate school spellings in the source, and the
    // cumulative-not-annual caveat. All stay in source-material/.
    flags: [],
    sources: [
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
    ],
  },

  /* ------------------------------------------------------------ verdict -- */
  verdict: {
    // Lead trimmed and `points` dropped (user, 2026-09-16); the card opens on
    // its visit checklist, which is renamed from the shared "Ask on the tour".
    headline: 'High School Placement',
    points: [],
    checklist: [
      'What standardized test do your 8th graders sit for high school admission, and when? The school publishes nothing on this.',
      'What share of last year’s class got into their first-choice high school? No figure is published, so ask for it directly.',
      'What does the placement calendar look like — when does the search start, and what happens each term?',
      'The counsellor roles began in 2023-24. How has the process changed since, and who holds each role now?',
      'Do graduates win merit scholarships at their high schools? No counts or dollars are published anywhere.',
      'The 2004–2026 destination list marks 41 of 99 schools with an asterisk and gives no legend — what does it mean?',
    ],
    // No flags (user, 2026-09-16) — the 'publication gap' note compared
    // Trinity's record against another school's marketing figure.
    flags: [],
    sources: [
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
      { label: 'tescharlotte.org — The K-8 Advantage', url: K8 },
    ],
  },
}
