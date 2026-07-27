// Cannon School — Student Clubs (1a / 1b / 1c).
//
// Transcribed from source-material/student-clubs/cannon/
// "Cannon - Student Clubs - Clubs Redesign Deep Research.md", which carries a
// source URL and a VERIFIED / SUPERSEDED / REFUTED / NOT FOUND marker on every
// fact.
//
// Four research outcomes shaped this file, two of them corrections to figures
// carried in earlier research:
//
//  1. Service hours: ~10,000, NOT ~15,000. The 15,000 figure came from the
//     2024-25 Student Profile and has been superseded by the live Upper School
//     page's "almost 10,000." The 2025-26 profile drops the stat entirely. The
//     figure is labeled Upper School rather than school-wide, because that is
//     the page it sits on.
//
//  2. Cum Laude "up to 20% of seniors" is REFUTED as a Cannon fact — 20% is the
//     national society's own cap, published nowhere by Cannon. Only the 2005
//     chapter date is confirmed, and only that is stated here.
//
//  3. Card 1a renders with an EMPTY roster. Cannon confirms affinity groups
//     exist — "our Affinity Groups" on the Upper School page — but never names
//     one, publishes no count, and has no DEI page. So the card carries its gap
//     flag and the surrounding structure instead of a grid of cells; the absence
//     is the finding. There is no count flag, because with no published number
//     there is nothing to contradict.
//
//  4. The "Infinity Group" (a group for students of color) is REFUTED: it
//     appears only in third-party review-site paraphrase, nowhere on
//     cannonschool.org. Excluded entirely.
//
// Cannon's 1c is the strongest in the set — eleven societies, two with locally
// named chapters (Maggie Coleman, Golden Quill) that are preserved verbatim.

import type { ClubsProgram } from '../clubsProgram.ts'

const US_STUDENT_LIFE =
  'https://www.cannonschool.org/cannon-life/student-life/us-student-life'
const UPPER_SCHOOL = 'https://www.cannonschool.org/academics/upper-school'
const ABOUT_DBE = 'https://www.cannonschool.org/about#dbeanchor'
const CURRICULUM = 'https://www.cannonschool.org/academics/upper-school/curriculum'
const WINTERM = 'https://www.cannonschool.org/academics/upper-school/winterm'
const MS_STUDENT_LIFE =
  'https://www.cannonschool.org/cannon-life/student-life/middle-school-student-life'
const PROFILE_2526 =
  'https://resources.finalsite.net/images/v1757349467/cannonschoolorg/i5lqf0krxcb4uejss6ul/Cannon_2526_Profile.pdf'

export const cannon: ClubsProgram = {
  affinity: {
    headline:
      'Cannon confirms affinity groups run in the Upper School — but never names a single one.',
    subhead:
      'Everything below is what the school does publish; the roster itself is the gap, and it is the most useful thing a parent can know before a tour.',
    umbrella: undefined,
    groups: [],
    strips: [
      {
        title: 'What is published',
        hint: '· Upper School',
        text: '"We have a rich club life, ranging from the significant such as our Affinity Groups, to fun and adventurous clubs like the Star Wars Club, and service-based clubs such as the Habitat Club." Clubs are student-led and faculty-supported, meeting during and after school. That sentence is the entire published record.',
      },
      {
        title: 'Middle & Lower School',
        text: 'No affinity groups appear in either division. Middle School Student Life lists academic competition teams only — Battle of the Books, Elementary Battle of the Books, Science Olympiad, Model UN, Envirothon — plus Student Council.',
      },
      {
        title: 'Parents',
        text: 'No parent affinity groups. "Parents at Cannon" is a general volunteer network organized as Connect, Create, Cultivate and Champion, with no identity-based subgroups.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No affinity group is named anywhere on cannonschool.org — no roster, no descriptors, no count, and so no count discrepancy either. There is no standalone DEI page: "Diversity, Belongingness, and Engagement" is an anchor section on the About page carrying commitment statements and twelve Individual and Community Agreements, but no groups, programs or names. No student diversity leadership arm and no national conference attendance are published.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — Upper School Student Life (the one affinity mention)', url: US_STUDENT_LIFE },
      { label: 'About — Diversity, Belongingness & Engagement', url: ABOUT_DBE },
      { label: 'Middle School Student Life', url: MS_STUDENT_LIFE },
    ],
  },

  service: {
    headline:
      'Service is explicitly not a graduation requirement — and Upper Schoolers still log almost 10,000 hours a year.',
    subhead:
      'The school frames this as evidence of commitment rather than compliance, and backs it with a universal senior capstone and a week-long experiential program.',
    programs: [
      {
        value: '~10,000',
        valueLabel: 'service hours a year · Upper School',
        name: 'Service without a requirement',
        detail:
          '"Although service is not a graduation requirement at Cannon, students\' deep sense of commitment and personal responsibility is evidenced by the collective completion of almost 10,000 service hours each year through school-wide projects and individual efforts."',
        source: { label: 'Upper School', url: UPPER_SCHOOL },
      },
      {
        value: '111',
        valueLabel: 'seniors · every one completes it',
        name: 'Senior Capstone',
        detail:
          'A service project letting every senior immerse in a philanthropic cause they care about, ending in a presentation to faculty, staff, peers and community members with time for reflection and questions. Listed among the school\'s Signature Learning Experiences.',
        source: { label: 'Upper School curriculum', url: CURRICULUM },
      },
      {
        value: '4',
        valueLabel: 'experience tracks · one week each January',
        name: 'Winterm',
        detail:
          'A week-long experiential program after winter break that "challenges students to think critically and practically, to serve others," across local-community, professional-skills and trips-and-certifications tracks. Service offerings include a Sea Island Habitat for Humanity trip and a food-bank week studying food insecurity.',
        source: { label: 'Winterm', url: WINTERM },
      },
    ],
    footnoteTitle: 'In the Middle School',
    footnote:
      'A grade-level service-learning model has students investigate topics, identify needs in teams and build action plans, with guest speakers from more than eight organizations including Special Olympics, the Society of St. Andrew Gleaning Network and the Cabarrus County Soil & Water Conservation District. Off-campus work runs to the Share the Harvest community garden, Salvation Army food drives and the Cabarrus County Bilingual Preschool.',
    flags: [
      {
        kind: 'not-a-club',
        text: 'The Senior Capstone is an individual graduation-track project and Winterm is a curricular program — neither is a club. Because service is not required, the ~10,000 hours explicitly include individual efforts rather than club membership. The Habitat Club is the exception: it is the one named service club.',
      },
      {
        kind: 'gap',
        text: 'The hours figure is unstable across the school’s own publications. An earlier 2024-25 profile said around 15,000; the current Upper School page says almost 10,000; the 2025-26 profile drops the statistic altogether. We show the current published figure and scope it to the Upper School, since that is the page carrying it.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — Upper School (current hours figure)', url: UPPER_SCHOOL },
      { label: '2025-26 Student Profile', url: PROFILE_2526 },
      { label: 'Middle School Student Life (service learning)', url: MS_STUDENT_LIFE },
    ],
  },

  honors: {
    headline:
      'Eleven honor societies — the widest span in this comparison, reaching social studies, mathematics, English, journalism, three arts and three world languages.',
    subhead:
      'These are outcomes of achievement elsewhere in the program — a student earns their way in; nobody signs up.',
    societies: [
      {
        name: 'Cum Laude Society',
        division: 'Upper School',
        recognizes: 'Overall academic excellence · chapter awarded in 2005',
        feedsFrom: 'the classroom',
      },
      {
        name: 'Maggie Coleman Chapter of Rho Kappa',
        division: 'Upper School',
        recognizes: 'Social studies achievement — the national social studies society',
        feedsFrom: 'social studies',
      },
      {
        name: 'Mu Alpha Theta',
        division: 'Upper School',
        recognizes: 'Mathematics achievement — the national mathematics society',
        feedsFrom: 'mathematics',
      },
      {
        name: 'National English Honor Society — Golden Quill Chapter',
        division: 'Upper School',
        recognizes: 'English achievement',
        feedsFrom: 'English',
      },
      {
        name: 'Quill and Scroll',
        division: 'Upper School',
        recognizes:
          'Journalism — the international honorary society for high school journalists',
        feedsFrom: 'journalism & yearbook',
      },
      {
        name: 'The National Art Honor Society',
        division: 'Upper School',
        recognizes: 'Visual-arts achievement',
        feedsFrom: 'The Arts',
      },
      {
        name: 'Tri-M Music Honor Society',
        division: 'Upper School',
        recognizes: 'Music achievement and service',
        feedsFrom: 'The Arts',
      },
      {
        name: 'International Thespian Society',
        division: 'Upper School',
        recognizes: 'Theatre achievement',
        feedsFrom: 'The Arts',
      },
      {
        name: 'National Chinese Honor Society',
        division: 'Upper School',
        recognizes: 'Chinese language achievement',
        feedsFrom: 'world languages',
      },
      {
        name: 'National French Honor Society',
        division: 'Upper School',
        recognizes: 'French language achievement',
        feedsFrom: 'world languages',
      },
      {
        name: 'National Spanish Honor Society',
        division: 'Upper School',
        recognizes: 'Spanish language achievement',
        feedsFrom: 'world languages',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No induction criteria are readable. The page invites you to "click on icon for details and eligibility criteria," but those descriptions load dynamically and are not retrievable — the underlying list carries titles and images with no body text. No annual induction counts, chapter activity, advisors or membership numbers are published anywhere, and there are no Middle School honor societies.',
      },
      {
        kind: 'gap',
        text: 'Cannon has no National Honor Society chapter — unusual for this set, and worth noting because Cum Laude appears to serve that role. No National Junior Honor Society or Science National Honor Society either.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — Upper School (the eleven-society roster)', url: UPPER_SCHOOL },
      { label: '2025-26 Student Profile (Cum Laude chapter, 2005)', url: PROFILE_2526 },
    ],
  },
}
