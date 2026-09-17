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
const CLASS_2026 = 'https://www.tescharlotte.org/blog.cfm?threadid=48'
const CLASS_2025 = 'https://www.tescharlotte.org/blog.cfm?threadid=29'
const COUNSELORS = 'https://www.tescharlotte.org/blog.cfm?threadid=6'

export const trinityEpiscopal: HighSchoolPlacementProgram = {
  /* --------------------------------------------- 2a where graduates go -- */
  outcomes: {
    headline:
      'Trinity graduates leave after 8th grade, and the school publishes where they went — 1,060 of them, across 23 classes since 2004.',
    subhead:
      'The headline split is cumulative since the first graduating class in 2004, not a single year: 31% went on to independent schools, 57% to public schools and 12% to boarding schools. Trinity publishes no placement success rate of any kind, and none is inferred here.',
    stats: [
      {
        value: '1,060',
        denominator: 'Classes of 2004–2026 · 23 years',
        caption: 'graduates on record since the first 8th-grade class',
      },
      {
        value: '31% / 57% / 12%',
        denominator: 'of 1,060 · cumulative, not per class',
        caption: 'independent / public / boarding schools',
      },
      {
        value: '51',
        denominator: 'Class of 2026 · 10 distinct high schools',
        caption: 'graduates in the most recent class',
      },
      {
        value: '30',
        denominator: '30 of 51 · 59%',
        caption: '“lifers” in the Class of 2026 — enrolled since Kindergarten',
      },
    ],
    // No per-class table: see note 1 at the top of this file.
    classes: [],
    scholarships: [],
    flags: [
      {
        kind: 'gap',
        label: 'NO PLACEMENT RATE',
        text: 'Trinity publishes no “accepted to first choice” or “top-two choice” figure, and no high school merit scholarship counts or dollars. Searched across all 100 sitemap pages, all 51 blog posts and both School Profile PDFs — “first choice”, “top two” and “97%” each return zero hits. The school’s placement story is named destination lists plus the cumulative split, never a success rate.',
      },
      {
        kind: 'verify',
        label: 'CUMULATIVE, NOT PER CLASS',
        text: 'The 31/57/12 split is across all 1,060 graduates since 2004, not any single year. The school states it that way and it should never be read as one class’s outcome.',
      },
      {
        kind: 'verify',
        label: 'LIFER RATE IS VOLATILE',
        text: 'The share of graduates who had been at Trinity since Kindergarten runs 9 of 51 (18%) in 2024, 28 of 54 (52%) in 2025 and 30 of 51 (59%) in 2026. The 2024 figure is an outlier against the two later years, so the trend is not a smooth line.',
      },
      {
        kind: 'discrepancy',
        text: 'The school’s own 2026 commencement list prints “Myers Park High School” twice — 11 bullets naming 10 distinct schools. Verified in the page’s raw HTML at positions 1 and 7; the remaining entries are alphabetical, so the leading duplicate reads as an editing slip. Counted here as 10.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
      { label: 'tescharlotte.org — Class of 2026 commencement', url: CLASS_2026 },
      { label: 'tescharlotte.org — Class of 2025 commencement', url: CLASS_2025 },
    ],
  },

  /* ---------------------------------------------- 2b placement program -- */
  placement: {
    headline:
      'Two high school counselors, one for public and independent schools and one for boarding — a structure the school added in 2023-24.',
    subhead:
      'Trinity frames the K–8 model as choosing a high school at the end of 8th grade rather than at the start of Kindergarten. The counselling roles are real and named, but the process around them is almost entirely unpublished.',
    stats: [
      {
        value: '2',
        denominator: 'public + independent · boarding',
        caption: 'high school counsellors, by published scope',
      },
      {
        value: '2023–24',
        caption: 'the school year the counsellor roles were introduced',
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
    owns: [
      'Two named counsellors covering public, independent and boarding schools, with the scope split published.',
      'A cumulative destination record kept since 2004 and republished each year in the School Profile.',
      'Named destination lists for the two most recent classes, published at commencement.',
    ],
    notPublished: [
      {
        label: 'Any outbound entrance test',
        text: 'SSAT and HSPT return zero hits site-wide. ISEE appears only three times and every instance is Trinity’s own inbound admission testing. Whatever test its 8th graders sit for high school admission, the school does not say.',
      },
      {
        label: 'A placement timeline',
        text: 'No published account of what grade the search starts, or what happens when.',
      },
      {
        label: 'High school fairs, mock interviews or test prep',
        text: 'Zero hits for any of them.',
      },
      {
        label: 'Merit scholarships won at high schools',
        text: 'No counts, no dollars, no named awards.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        label: 'NOT PUBLISHED ≠ NOT DONE',
        text: 'These gaps were established by crawling all 100 sitemap pages and all 51 blog posts. The FACTS Family Portal is gated, and a placement handbook is exactly the sort of document that would sit behind it — so this says the school does not publish these things publicly, not that it does not do them.',
      },
      {
        kind: 'discrepancy',
        text: 'The boarding counsellor’s title differs between two live school pages: the admission page calls him “Director of Admission and Boarding School Placement”, while the staff directory calls him “Associate Director of Admission”, dropping placement entirely.',
      },
      {
        kind: 'verify',
        text: 'The school writes “two high school counselors”, not “two dedicated counselors” — one of the two roles is explicitly combined with a Middle School teaching load. The 2023 article announcing the structure names a different person on the boarding side, who no longer appears in the staff directory.',
      },
    ],
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
    flags: [
      {
        kind: 'verify',
        label: 'THE SCHOOL’S OWN GROUPING',
        text: 'Trinity reports its outcomes as independent / public / boarding, and those are the three categories used here. They are kinds of school, not tiers of one, and there is no high-school ranking in this app.',
      },
      {
        kind: 'gap',
        label: 'UNEXPLAINED MARKER',
        text: 'In the source PDF, 41 of the 99 entries carry a trailing asterisk with no legend anywhere in the document — searched and confirmed absent. It plausibly marks multiple attendees, but the school does not say, so the markers are stripped here rather than published under a guessed meaning.',
      },
      {
        kind: 'discrepancy',
        text: 'The source lists several schools twice under different spellings — “Cannon School” and “The Cannon School”, “Charlotte Catholic” and “Charlotte Catholic High School”, “Chambers High School” and “Julius L. Chambers High School”, “JM Robinson High School” and “Robinson High School”. It also prints “Lake Normal High School” for Lake Norman. Duplicates are merged here and the typo is corrected with the published spelling noted.',
      },
      {
        kind: 'verify',
        label: 'CUMULATIVE, NOT A SINGLE YEAR',
        text: 'This is every destination reported across 23 graduating classes since 2004. A school appearing here may have taken one graduate in one year.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
    ],
  },

  /* ------------------------------------------------------------ verdict -- */
  verdict: {
    headline:
      'A school that documents where its graduates go, without claiming how well it placed them.',
    subhead:
      'The evidence here is unusually concrete for a middle school — a 23-year cumulative record with a denominator on every figure — and unusually quiet on outcomes. Both are worth understanding before a tour.',
    points: [
      {
        label: 'The denominator is always there',
        text: 'Every figure the school publishes carries what it is out of: 1,060 graduates across 23 classes, 51 in the Class of 2026, 30 of them lifers. Nothing is a bare percentage.',
      },
      {
        label: 'The destination list is long and checkable',
        text: '99 named high schools, including eight with their own dossier in this app — so a family can follow a Trinity graduate’s likely next step and read that school’s research directly.',
      },
      {
        label: 'Boarding is a real route, not a footnote',
        text: '12% of all graduates since 2004 went to boarding schools, there is a counsellor whose published scope is boarding placement, and the list includes Deerfield, Lawrenceville, Taft, Thacher and St. Paul’s.',
      },
      {
        label: 'The K–8 case is stated plainly',
        text: 'The school argues the high school choice is better made at the end of 8th grade than at the start of Kindergarten, after nine years of one faculty knowing the child. That is a claim a family can weigh, not a statistic.',
      },
    ],
    checklist: [
      'What standardized test do your 8th graders sit for high school admission, and when? The school publishes nothing on this.',
      'What share of last year’s class got into their first-choice high school? No figure is published, so ask for it directly.',
      'What does the placement calendar look like — when does the search start, and what happens each term?',
      'The counsellor roles began in 2023-24. How has the process changed since, and who holds each role now?',
      'Do graduates win merit scholarships at their high schools? No counts or dollars are published anywhere.',
      'The 2004–2026 destination list marks 41 of 99 schools with an asterisk and gives no legend — what does it mean?',
    ],
    flags: [
      {
        kind: 'gap',
        text: 'There is no published placement success rate to weigh against these destinations. A parent comparing Trinity with a school that advertises a “97% first-choice” figure is comparing a documented record against a marketing claim, not two like figures.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
      { label: 'tescharlotte.org — The K-8 Advantage', url: K8 },
    ],
  },
}
