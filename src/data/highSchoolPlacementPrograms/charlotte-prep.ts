// Charlotte Preparatory School — High School Placement.
//
// The SECOND occupant of this area, after Trinity Episcopal, and the area that
// justifies adding the school: it publishes a top-two-choice acceptance rate
// for every class since 2023, a named destination list for each of those
// classes, and a twelve-step placement process.
//
// Source material: source-material/high-school-placement/charlotte-prep/
//
// Four things that shaped what is and is not here:
//
//  0. ONE CARD, NOT TWO: this school has both `outcomes` and `destinations`, so
//     hspCardsFor() renders the destination index inside Where Graduates Go
//     (user, 2026-10-19); its class picker is driven by `classTallies`.
//
//  1. THE PER-CLASS TABLE IS DELIBERATELY EMPTY (`classes: []`). `PlacementClass`
//     needs `graduates` + `acceptedCount`, and Charlotte Prep never publishes a
//     class size or a count — only the rate. The counts that fit each rate
//     (38/39, 26/27, 29/29) come from the length of each named class list, and
//     no source states that a list is the WHOLE class: the Fast Facts alumni
//     counter corroborates 2025 (+27) but leaves ten 2023–24 graduates
//     unaccounted for. The plan's default therefore applies — the rates ship as
//     stat tiles, each captioned with the size of the list it sits beside, and
//     no derived count is presented as the school's.
//
//  2. 2023 IS A DIFFERENT MEASURE. The 2022-23 Annual Report says "95% … accepted
//     into their top choice" (singular), not "one or both of their top two
//     choices", so it is not tiled beside the top-two rates. It was quoted in the
//     subhead and removed at review (user, 2026-10-19); it stays in source-material.
//
//  3. THE 10-YEAR FIGURE HAS TWO PUBLISHED VERSIONS — 96% "over the past 10
//     years" (Middle School page, added after Nov 2024) and 94% "since 2015"
//     (Feb 2024). The newer, live one is the tile; neither has a denominator,
//     so the tile carries the NO DENOM. chip. `tenYear` is not used because it
//     renders only inside the per-class table, which is empty here.
//
//  4. DESTINATIONS ARE GROUPED BY WHAT EACH SCHOOL ACTUALLY IS (the master's
//     `kind`), not by Charlotte Prep's own four headings — the user's standing
//     call from Trinity (2026-09-17). Charlotte Prep files Charlotte Lab School
//     (a public charter) as independent on its website and as public in its
//     brochure; UNCSA and the SC Governor's School (public residential arts
//     schools) under boarding; and its "Other cities and countries" mixes
//     private day schools with public ones abroad. The school's own wording is
//     preserved in source-material.

import type { HighSchoolPlacementProgram } from '../highSchoolPlacement.ts'

const BEYOND = 'https://charlotteprep.org/student-life/beyond-charlotte-prep'
const MIDDLE = 'https://charlotteprep.org/academics/middle-school'
const BROCHURE = 'https://issuu.com/charlottepreparatoryschool/docs/cp-hsbrochure_for_web'
const CLASS_2026 =
  'https://charlotteprep.org/community/news/stories/class-of-2026-high-school-destinations'
const CLASS_2025 =
  'https://charlotteprep.org/community/news/stories/class-of-2025-high-school-destinations'
const CLASS_2024 =
  'https://charlotteprep.org/community/news/stories/class-of-2024-high-school-destinations'
const CLASS_2023 =
  'https://charlotteprep.org/community/news/stories/class-of-2023-high-school-destinations'
const REPORT_2425 = 'https://issuu.com/charlottepreparatoryschool/docs/2024-2025_annual_report'
const REPORT_2324 =
  'https://issuu.com/charlottepreparatoryschool/docs/2024-2025_calendar_and_annual_report'
const REPORT_2223 =
  'https://issuu.com/charlottepreparatoryschool/docs/cp03_-_calendar_2023-24_online_version'
const MCCALLIE = 'https://charlotteprep.org/community/news/stories/prep-to-mccallie-and-beyond'
const TESTING = 'https://charlotteprep.org/community/news/stories/testing-at-charlotte-prep'

export const charlottePrep: HighSchoolPlacementProgram = {
  /* -------------------------------------------- 2a where graduates go -- */
  outcomes: {
    headline:
      '97% of the Class of 2026 were accepted into one or both of their top two high school choices — and Charlotte Prep has published a rate like it for every class since 2023.',
    subhead:
      'Fifteen members of the Class of 2026 were accepted to every school they applied to, the school says.',
    stats: [
      {
        value: '97%',
        denominator: '39 graduates named on the class list',
        caption: 'Class of 2026 · into one or both top-two choices',
      },
      {
        value: '96%',
        denominator: '27 graduates named on the class list',
        caption: 'Class of 2025 · into one or both top-two choices',
      },
      {
        value: '100%',
        denominator: '29 graduates named on the class list',
        caption: 'Class of 2024 · into one or both top-two choices',
      },
      {
        value: '96%',
        caption: 'over the past 10 years, as the school states it · an earlier page said 94% since 2015',
      },
    ],
    classes: [],
    scholarships: [
      {
        name: 'Grant D. Williams Foundation Scholarship',
        detail:
          'Providence Day School · Class of 2025 · "an exclusive four-year scholarship [that] includes a financial award and a personal mentorship with Grant Williams himself, NBA player and Providence Day alum"',
      },
      {
        name: 'Michaels-Dickson Merit Scholarship',
        detail:
          'The McCallie School · Class of 2025 · "Over the past 16 years, Charlotte Prep has sent 11 graduates to McCallie, seven of whom earned the highly selective Michaels‑Dickson Merit Scholarship."',
      },
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — Class of 2026 high school destinations, May 19 2026', url: CLASS_2026 },
      { label: '2024-2025 Annual Report (Issuu) — the 2025 rate', url: REPORT_2425 },
      { label: '2023-24 Annual Report (Issuu) — the 2024 rate', url: REPORT_2324 },
      { label: '2022-23 Annual Report (Issuu) — the 2023 rate', url: REPORT_2223 },
      { label: 'charlotteprep.org — Middle School (the 10-year rate)', url: MIDDLE },
      { label: 'charlotteprep.org — Class of 2025 high school destinations (scholarships)', url: CLASS_2025 },
      { label: 'charlotteprep.org — "Prep to McCallie and Beyond", Jan 21 2026', url: MCCALLIE },
    ],
  },

  /* ------------------------------------------------ 2b the programme -- */
  placement: {
    headline:
      'A dedicated placement team, a twelve-step path that starts before 8th grade, and a fall fair that brings over 40 high schools to campus to recruit.',
    subhead:
      'The application is parent-driven, but the school manages the rest: "Our team manages all other aspects of the process to minimize stress and provide all necessary materials."',
    stats: [
      { value: '12', denominator: 'steps in the school’s guide', caption: 'from the start of the path to acceptance' },
      { value: '40+', denominator: 'schools invited each September', caption: 'to the High School Fair and Boarding School Fair' },
      { value: 'ISEE', denominator: 'Grade 7 practice → Grade 8', caption: 'the one admissions test the school names' },
    ],
    steps: [
      {
        when: 'Spring of 7th grade — the Parent Coffee',
        kind: 'Orientation',
        text: '"Each spring, rising 8th-grade parents attend a Parent Coffee to learn about the admissions process, events, deadlines, and other tips and information to prepare for the year ahead."',
      },
      {
        when: 'Grade 7 — a practice ISEE',
        kind: 'Testing',
        text: 'Students sit the Independent School Entrance Exam for practice in 7th grade, then for high school placement in 8th, and the school provides ISEE test preparation in between: "Students learn test-taking strategies and prepare for admissions testing to gain comfort and fine tune skills."',
      },
      {
        when: 'September of 8th grade — the High School Fair',
        kind: 'Exposure',
        text: '"In September, administrators from over 40 schools are invited to Charlotte Prep\'s High School Fair and Boarding School Fair to recruit our students." The boarding fair includes a panel discussion — one 2026 family credits it with their decision to pursue boarding school.',
      },
      {
        when: 'Fall of 8th grade — meetings and school visits',
        kind: 'Fit',
        text: 'The team meets individually with each 8th grader and separately with each student\'s parents "to discuss their plans, their objectives for their child, and appropriate placement opportunities." Families are encouraged to visit open houses and tours, and students make day visits to the schools on their list.',
      },
      {
        when: 'Grade 8 — interviews',
        kind: 'Preparation',
        text: '"In Leadership class, students learn interview etiquette and conduct. They learn about proper dress, eye contact, handshake, and what to look for as they seek the school that fits them best." Teachers and administrators run mock interviews, and the brochure adds a practice interview with the head of school.',
      },
      {
        when: 'Winter of 8th grade — applications and advocacy',
        kind: 'Advocacy',
        text: '"Charlotte Prep electronically delivers our students\' complete transcripts and teacher recommendation packets to the schools prior to deadlines." The team then meets with each high school "for in-depth conversations about our student applicants and to provide further insight to ensure each student is well known."',
      },
    ],
    owns: [
      'A one-on-one meeting with every 8th grader, and a separate one with their parents',
      'Mock interviews with teachers, administrators and the head of school',
      'ISEE preparation, after a practice ISEE in 7th grade',
      'Transcripts and teacher recommendations delivered electronically before each deadline',
      'A meeting with each high school about its Charlotte Prep applicants',
    ],
    notPublished: [],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — Beyond Charlotte Prep', url: BEYOND },
      { label: '"Prep for the Next Chapter" — the school\'s placement guide (Issuu)', url: BROCHURE },
      { label: 'charlotteprep.org — "Testing at Charlotte Prep", Apr 9 2026', url: TESTING },
      { label: 'charlotteprep.org — Middle School', url: MIDDLE },
    ],
  },

  /* ----------------------------------------------- 2c where they land -- */
  destinations: {
    headline:
      'More than 60 high schools across all of Charlotte Prep’s alumni — and, for each class from 2023 to 2026, exactly where its graduates are heading.',
    subhead:
      'Choose a class to see where each of its named graduates is heading. Schools are grouped by what each one actually is.',
    /* Where each named class is heading (the class picker) — OUR count from the school's own
       class announcements (2023–2026). Names are normalised to the master's
       canonical spelling so each links: the school wrote "Charlotte Country
       Day" (2025), "East Meck High School", "South Meck High School",
       "Covenant Day", "East Mecklenburg High School IB Program" and, in 2023,
       "Central Academy of Arts & Sciences IB Program" — taken to be CATA, our
       identification. Exact spellings are in source-material (Where They Land). */
    classTallies: [
      {
        year: '2026',
        listed: 39,
        schools: [
          { name: 'Charlotte Latin School', slug: 'charlotte-latin', count: 11 },
          { name: 'Myers Park High School', count: 6 },
          { name: 'Charlotte Country Day School', slug: 'charlotte-country-day', count: 5 },
          { name: 'Providence Day School', slug: 'providence-day', count: 5 },
          { name: 'Charlotte Catholic High School', slug: 'charlotte-catholic', count: 3 },
          { name: 'Providence High School', count: 2 },
          { name: 'Carolina Day School', count: 1 },
          { name: 'Charlotte Christian School', slug: 'charlotte-christian', count: 1 },
          { name: 'East Mecklenburg High School', count: 1 },
          { name: 'Marvin Ridge High School', count: 1 },
          { name: 'South Mecklenburg High School', count: 1 },
          { name: 'Walnut Hill School for the Arts', count: 1 },
          { name: 'York Prep Academy', count: 1 },
        ],
      },
      {
        year: '2025',
        listed: 27,
        schools: [
          { name: 'Charlotte Country Day School', slug: 'charlotte-country-day', count: 6 },
          { name: 'Charlotte Latin School', slug: 'charlotte-latin', count: 6 },
          { name: 'Providence Day School', slug: 'providence-day', count: 6 },
          { name: 'Providence High School', count: 3 },
          { name: 'Myers Park High School', count: 2 },
          { name: 'Cannon School', slug: 'cannon', count: 1 },
          { name: 'Covenant Day School', slug: 'covenant-day', count: 1 },
          { name: 'East Mecklenburg High School', count: 1 },
          { name: 'McCallie School', count: 1 },
        ],
      },
      {
        year: '2024',
        listed: 29,
        schools: [
          { name: 'Charlotte Latin School', slug: 'charlotte-latin', count: 7 },
          { name: 'Providence High School', count: 7 },
          { name: 'Providence Day School', slug: 'providence-day', count: 5 },
          { name: 'Baylor School', count: 1 },
          { name: 'Charlotte Catholic High School', slug: 'charlotte-catholic', count: 1 },
          { name: 'Charlotte Christian School', slug: 'charlotte-christian', count: 1 },
          { name: 'Charlotte Country Day School', slug: 'charlotte-country-day', count: 1 },
          { name: 'East Mecklenburg High School', count: 1 },
          { name: 'McCallie School', count: 1 },
          { name: 'Myers Park High School', count: 1 },
          { name: 'St. Andrew’s School', count: 1 },
          { name: 'Weddington High School', count: 1 },
          { name: 'Woodberry Forest School', count: 1 },
        ],
      },
      {
        year: '2023',
        listed: 20,
        schools: [
          { name: 'Charlotte Latin School', slug: 'charlotte-latin', count: 5 },
          { name: 'Charlotte Country Day School', slug: 'charlotte-country-day', count: 3 },
          { name: 'Charlotte Catholic High School', slug: 'charlotte-catholic', count: 2 },
          { name: 'Northwest School of the Arts', count: 2 },
          { name: 'Providence Day School', slug: 'providence-day', count: 2 },
          { name: 'Cannon School', slug: 'cannon', count: 1 },
          { name: 'Central Academy of Technology and Arts', count: 1 },
          { name: 'East Mecklenburg High School', count: 1 },
          { name: 'McCallie School', count: 1 },
          { name: 'Northwestern High School', count: 1 },
          { name: 'Weddington High School', count: 1 },
        ],
      },
    ],
    categories: [
      {
        key: 'charlotte-independent',
        label: 'Charlotte-area independent schools',
        schools: [
          { name: 'Cannon School', slug: 'cannon' },
          { name: 'Carmel Christian School', slug: 'carmel-christian' },
          { name: 'Charlotte Catholic High School', slug: 'charlotte-catholic' },
          { name: 'Charlotte Christian School', slug: 'charlotte-christian' },
          { name: 'Charlotte Country Day School', slug: 'charlotte-country-day' },
          { name: 'Charlotte Latin School', slug: 'charlotte-latin' },
          { name: 'Covenant Day School', slug: 'covenant-day' },
          { name: 'Davidson Day School', slug: 'davidson-day' },
          { name: 'Gaston Day School', slug: 'gaston-day' },
          { name: 'Providence Day School', slug: 'providence-day' },
          { name: 'British International School of Charlotte' },
          { name: 'Trinity Christian Prep' },
          { name: 'United Faith Christian Academy' },
        ],
      },
      {
        key: 'public',
        label: 'Public, charter and magnet schools',
        schools: [
          { name: 'Ardrey Kell High School' },
          { name: 'Central Academy of Technology and Arts' },
          { name: 'Charlotte Lab School' },
          { name: 'Cuthbertson High School' },
          { name: 'East Mecklenburg High School' },
          { name: 'Hickory Ridge High School' },
          { name: 'Independence High School' },
          { name: 'Marvin Ridge High School' },
          { name: 'Myers Park High School' },
          { name: 'Northwest School of the Arts' },
          { name: 'Northwestern High School' },
          { name: 'Olympic Community of Schools' },
          { name: 'Porter Ridge High School' },
          { name: 'Providence High School' },
          { name: 'Queen’s Grant High School' },
          { name: 'South Mecklenburg High School' },
          { name: 'Union Academy' },
          { name: 'Weddington High School' },
          { name: 'West Mecklenburg High School' },
          { name: 'York Prep Academy' },
          { name: 'University of North Carolina School of the Arts' },
          { name: 'South Carolina Governor\'s School for the Arts' },
          { name: 'Campolindo High School' },
          { name: 'Christian-von-Dohm Gymnasium' },
          { name: 'Portland High School' },
          { name: 'Washington-Lee High School' },
        ],
        notes: {
          'Olympic Community of Schools': 'now Olympic High School',
          'University of North Carolina School of the Arts': 'Winston-Salem · residential arts conservatory',
          'South Carolina Governor\'s School for the Arts': 'Greenville, SC · residential arts school',
          'Campolindo High School': 'California',
          'Christian-von-Dohm Gymnasium': 'Germany',
          'Portland High School': 'Maine · the placement guide says South Portland High School',
          'Washington-Lee High School': 'Virginia · now Washington-Liberty',
        },
      },
      {
        key: 'boarding',
        label: 'Boarding schools',
        schools: [
          { name: 'American Hebrew Academy' },
          { name: 'Asheville School' },
          { name: 'Baylor School' },
          { name: 'Chatham Hall' },
          { name: 'Choate Rosemary Hall' },
          { name: 'Christ School' },
          { name: 'Currey Ingram Academy' },
          { name: 'Episcopal High School' },
          { name: 'Interlochen Arts Academy' },
          { name: 'McCallie School' },
          { name: 'Mercersburg Academy' },
          { name: 'Peddie School' },
          { name: 'Riverside Military Academy' },
          { name: 'St. Andrew’s School' },
          { name: 'Suffield Academy' },
          { name: 'Walnut Hill School for the Arts' },
          { name: 'Woodberry Forest School' },
        ],
        notes: {
          'Baylor School': 'Tennessee',
          'Chatham Hall': 'Virginia',
          'Choate Rosemary Hall': 'Connecticut',
          'Currey Ingram Academy': 'Tennessee',
          'Episcopal High School': 'Virginia',
          'Interlochen Arts Academy': 'Michigan',
          'McCallie School': 'Tennessee',
          'Mercersburg Academy': 'Pennsylvania',
          'Peddie School': 'New Jersey',
          'Riverside Military Academy': 'Georgia',
          'St. Andrew’s School': 'the school does not say which St. Andrew’s',
          'Suffield Academy': 'Connecticut',
          'Walnut Hill School for the Arts': 'Massachusetts',
          'Woodberry Forest School': 'Virginia',
        },
      },
      {
        key: 'out-of-area-independent',
        label: 'Out-of-area independent schools',
        schools: [
          { name: 'American School in London' },
          { name: 'American School of Marrakech' },
          { name: 'Carlisle School' },
          { name: 'Carolina Day School' },
          { name: 'Georgetown Day School' },
          { name: 'International Community School in London' },
          { name: 'Lincoln Community School' },
          { name: 'Sidwell Friends School' },
          { name: 'The Gregory School' },
          { name: 'Wesleyan School' },
        ],
        notes: {
          'American School in London': 'England',
          'American School of Marrakech': 'Morocco',
          'Carlisle School': 'Virginia',
          'Carolina Day School': 'Asheville',
          'Georgetown Day School': 'Washington, DC',
          'International Community School in London': 'England',
          'Lincoln Community School': 'Ghana',
          'Sidwell Friends School': 'Washington, DC',
          'The Gregory School': 'Arizona',
          'Wesleyan School': 'Georgia',
        },
      },
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — Beyond Charlotte Prep (the cumulative list)', url: BEYOND },
      { label: '"Prep for the Next Chapter" — Graduate Destinations, p. 6 (Issuu)', url: BROCHURE },
      { label: 'charlotteprep.org — Class of 2026 high school destinations', url: CLASS_2026 },
      { label: 'charlotteprep.org — Class of 2025 high school destinations', url: CLASS_2025 },
      { label: 'charlotteprep.org — Class of 2024 high school destinations', url: CLASS_2024 },
      { label: 'charlotteprep.org — Class of 2023 high school destinations', url: CLASS_2023 },
    ],
  },

  /* ------------------------------------------------------------ verdict -- */
  verdict: {
    headline:
      'A published placement rate for every recent class, a named list behind each one, and a process written down step by step.',
    points: [],
    checklist: [
      'How many students were in the Class of 2026, and is the named list the whole class? The 97% is published, but the class size behind it is not.',
      'Your Middle School page says 96% over ten years; an earlier story said 94% since 2015. Which is current, and over how many graduates?',
      'Who is on the placement team today? The 2022 guide named three roles; the current guide and staff directory name none.',
      'Is ISEE preparation still free, and is it a class or individual support?',
      'How many schools does a typical family apply to, and how many interviews does a student usually sit?',
      'How many graduates take a merit scholarship at their high school each year?',
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — Beyond Charlotte Prep', url: BEYOND },
      { label: 'charlotteprep.org — Middle School', url: MIDDLE },
      { label: '"Prep for the Next Chapter" — the school\'s placement guide (Issuu)', url: BROCHURE },
    ],
  },

  /* The school's own Vimeo "Class of 2026 High School Destinations" (0:50,
     uploaded 2026-05-19), rendered below the four-card grid — user request
     with a Claude Design artboard, 2026-10-19. The page adds no student names. */
  classVideo: { url: 'https://player.vimeo.com/video/1193696537', classYear: 2026 },
}
