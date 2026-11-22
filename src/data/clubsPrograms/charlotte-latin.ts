// Charlotte Latin School — Student Clubs (1a / 1b / 1c).
//
// Transcribed from source-material/student-clubs/charlotte-latin/
// "Charlotte Latin - Student Clubs - Clubs Redesign Deep Research.md", which
// carries a source URL and a VERIFIED / REFUTED / NOT FOUND marker on every
// fact.
//
// Three research outcomes shaped this file, two of them refutations:
//
//  1. NO service-hours graduation requirement. The school states it outright:
//     "Latin does not have a formal requirement of service hours for
//     graduation," corroborated in the Upper School Profile and the Family
//     Handbook. The Service Society's 150 hours is a RECOGNITION threshold, not
//     a requirement, and 1b is written so a parent cannot misread it as one.
//
//  2. NO affinity-group count is published, so there is NO count flag on 1a.
//     The design's count-discrepancy pattern only appears where sources actually
//     disagree; here there is no number to contradict. Inventing a flag to fill
//     the slot would be dishonest. The school does run a separate affinity
//     program, Brotherhood & Belonging (plan consistency4 LAT-T13): it is named
//     in the card's text and is not added to the groups or any count.
//
//  3. Latin is the ONLY school in this set that publishes both Cum Laude
//     induction criteria AND an induction count, so its 1c carries no
//     criteria/count gap flag — the flag that fires on all five peers. Its
//     honest gap is different: subject and world-language recognition here is
//     delivered as named PRIZES rather than societies.
//
// Q&A and BSA are deliberately left unexpanded: the initialisms appear on the
// school's roster with no gloss anywhere on the site, and guessing at them would
// be fabrication.

import type { ClubsProgram } from '../clubsProgram.ts'

const BELONGING =
  'https://www.charlottelatin.org/about/community-belonging-global-education/community-and-belonging'
const ATSS =
  'https://www.charlottelatin.org/about/community-belonging-global-education/academic-transition-and-student-support'
const DIWALI_NEWS =
  'https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/charlotte-latin-celebrates-diwali'
const CLUBS = 'https://www.charlottelatin.org/student-life/student-clubs/clubs'
const SERVICE =
  'https://www.charlottelatin.org/leading-programs/student-leadership-development/service'
const CUM_LAUDE_NEWS =
  'https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/charlotte-latin-students-inducted-into-cum-laude-society'
const HANDBOOK =
  'https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf'
const US_PROFILE =
  'https://www.charlottelatin.org/uploaded/Veracross/Upper_School_Profile_for_Admissions.pdf'
const AWARDS_2025 =
  'https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/2025-honors-and-awards-ceremony'

export const charlotteLatin: ClubsProgram = {
  affinity: {
    headline:
      'Mosaic is the umbrella club, with two named sub-groups. A separate school program, Brotherhood & Belonging, is for historically underrepresented boys in grades 3–12.',
    subhead:
      'That program has Lower and Middle School parts, and the school describes the Upper School part as a future expansion. School news also names an Indian Student Alliance, which is not on the club list. The school publishes no count or full roster of affinity groups.',
    umbrella: {
      name: 'Mosaic',
      detail:
        'the umbrella club · "Under Mosaic we have Q&A and BSA"',
    },
    groups: [
      { name: 'Q&A', detail: 'sub-group of Mosaic — the school does not expand the initialism' },
      { name: 'BSA', detail: 'sub-group of Mosaic — the school does not expand the initialism' },
      {
        name: 'Girl Up',
        detail: 'to empower all women at CLS through education, advocacy and service',
      },
      {
        name: 'SISTERS',
        detail: 'pairs freshman women with upperclass women for mentoring',
      },
    ],
    strips: [
      {
        title: 'Faculty & parents',
        text: 'Vernette Rucker is Associate Director of Community and Belonging. In July 2026, the school’s former diversity page listed divisional DEI Committees for faculty and staff, Parent DEI Education Learning Sessions and a Parent Cookbook Club. It said the Cookbook Club "transforms the typical book club model into an immersive cultural experience… exploring diverse cultures one delicious recipe at a time." None of those three was an identity-based affinity group.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The old DEI page named "the student-led Diversity Club and Alliance Groups" in a single sentence. It now returns 404, and its "Diversity Club List" link redirects to the Community, Belonging and Global Education page, which has no list. No affinity group count or full roster is published, so there are no rival numbers to reconcile. Lower and Middle School groups are published under Brotherhood & Belonging (Voices, The Boys’ Room); its Upper School part is described as a future expansion. No student diversity leadership corps or national conference attendance was found on the pages read.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Community and Belonging', url: BELONGING },
      { label: 'Upper School club roster (Mosaic, Girl Up, SISTERS)', url: CLUBS },
      { label: 'Academic Transition and Student Success (Brotherhood & Belonging)', url: ATSS },
      { label: 'Latin news — Diwali (Indian Student Alliance)', url: DIWALI_NEWS },
    ],
  },

  service: {
    headline:
      'Service is deliberately not required — and students still logged 3,396 hours by the end of junior year, with a recognition society and a national first behind them.',
    subhead:
      'The school states plainly that it has no service-hours graduation requirement; what it has instead is a reflection-based recognition model running across all four Upper School years.',
    programs: [
      {
        value: '150',
        valueLabel: 'hours to be inducted · since 1997-98',
        name: 'Latin Service Society',
        detail:
          'A recognition society, not a requirement. It "recognizes students who make significant contributions to the community through service" and uses a reflection-based model across all four Upper School years. Four-year students need 150 hours, with the total reduced in proportion for transfer students. Qualifying students are inducted at the end of senior year.',
        source: { label: 'Service · Family Handbook', url: SERVICE },
      },
      {
        value: '4',
        valueLabel: 'Habitat houses funded & built',
        name: 'Habitat for Humanity',
        detail:
          'Charlotte Latin is "the first private or independent school in the country with a senior class that funded and built a Habitat for Humanity House." The community has since funded and built four, and regularly assists with builds locally and in El Salvador.',
        source: { label: 'Service', url: SERVICE },
      },
      {
        value: '3,396',
        valueLabel: 'hours · Class of 2023 by end of junior year',
        name: 'Community Partners & the Service Council',
        detail:
          'Three school-wide partners anchor the program: Baby Bundles, Special Olympics and Habitat for Humanity of the Charlotte Region. The program follows six Principles of Good Practice. Every week of the year, the Upper School Service Council organizes service activities students can join.',
        source: { label: 'Upper School Profile', url: US_PROFILE },
      },
    ],
    footnoteTitle: 'On the numbers',
    footnote:
      'An earlier profile recorded 5,485 hours for the Class of 2018 by the end of junior year. Five members of that class qualified for the Service Society, and seven students earned a Presidential Volunteer Service Award in 2016-17. A fourth program, Good Neighbors, lends campus gym space to community groups.',
    flags: [
      {
        kind: 'not-a-club',
        text: 'The school lists Blessings in a Backpack and Student Council apart from its club roster. It treats both as standing activities rather than open-enrollment clubs. Blessings in a Backpack meets every Wednesday to pack weekend food for students on free lunch. The weekly activities the Service Council organizes are also individual service, not club membership.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Service (Student Leadership Development)', url: SERVICE },
      { label: 'Family Handbook (Service Society threshold, 1997-98 founding)', url: HANDBOOK },
      { label: 'Upper School Profile for Admissions (hours)', url: US_PROFILE },
    ],
  },

  honors: {
    headline:
      'Two recognition societies plus a theatre society — and, unusually, published induction criteria and a published induction count.',
    subhead:
      'Charlotte Latin recognizes subject-area and world-language achievement through named prizes rather than honor societies, so the ledger is short by design.',
    societies: [
      {
        name: 'Cum Laude Society — Edward J. Fox Chapter',
        division: 'Upper School',
        recognizes:
          'The highest academic honor at the school — seniors in the top 20% and juniors in the top 10% of their class · 28 inducted in the most recent ceremony',
        feedsFrom: 'the classroom',
      },
      {
        name: 'Latin Service Society',
        division: 'Upper School',
        recognizes:
          'Significant contribution to the community through service — 150 hours across four years',
        feedsFrom: 'service',
      },
      {
        name: 'International Thespian Society',
        division: 'Upper School',
        recognizes:
          'Excellence in high school theatre; part of the Educational Theatre Association',
        feedsFrom: 'The Arts',
      },
    ],
    adjacent: [
      {
        label: 'Named subject prizes',
        text: 'The Victor Hugo Award (French) · Homer Award (Greek) · Petrarch Award (Latin) · Cervantes Award (Spanish) · Bausch + Lomb Honorary Science Award · Rensselaer Medal. Here, world-language and subject achievement is recognized as prizes, not chapters.',
      },
      {
        label: 'Headmaster’s List & Junior Marshals',
        text: 'The Headmaster’s List requires a 3.50 GPA with no grade below C−. Junior Marshals are juniors in the top 10% by cumulative average through the first semester of junior year, who assist at Commencement.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Charlotte Latin publishes no Middle School honor society; the Middle School club model is rotational rather than honorary, with students trying a different club every 8–10 weeks. Beyond the single Cum Laude induction article, no chapter activity is published for any society.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Cum Laude induction (chapter history, 28 inductees)', url: CUM_LAUDE_NEWS },
      { label: 'Family Handbook (induction criteria)', url: HANDBOOK },
      { label: '2025 Honors and Awards Ceremony (the named prizes)', url: AWARDS_2025 },
      { label: 'Upper School club roster (Thespian Society)', url: CLUBS },
    ],
  },
}
