// Charlotte Preparatory School — Student Clubs (service and honors cards).
//
// Transcribed from source-material/student-clubs/charlotte-prep/. Two cards:
//
//   service — the school's five service goals, its recurring service days and
//             the BUDEE cross-age buddy system, with dated student projects.
//   honors  — a COMPETITION ledger. Charlotte Prep has NO honor society: honor
//             society, NJHS and Beta Club return zero hits site-wide. The shared
//             card title is "Honor Societies"; whether to retitle it for this
//             school is a UX question raised at review (Trinity hit the same
//             one), not decided here.
//
// `affinity` is omitted: no student affinity groups are published. The MOSAIC
// Middle School Diversity Club is a club, not an identity roster, so it lives in
// the catalog (clubCatalog.ts).
//
// ⚠️ No student names (no-minor-names rule). The Science & Engineering Fair
// placements are carried as counts and categories, never as the children.

import type { ClubsProgram } from '../clubsProgram.ts'

const SERVICE = 'https://charlotteprep.org/community/service-learning'
const LEADERSHIP = 'https://charlotteprep.org/student-life/leadership'
const HELENE =
  'https://charlotteprep.org/community/news/stories/support-for-hurricane-helene-recovery'
const BLACK_HISTORY =
  'https://charlotteprep.org/community/news/stories/second-graders-host-an-outside-the-box-lesson-in-black-history'
const MUN = 'https://charlotteprep.org/community/news/stories/model-un-club-awarded-at-conference'
const SCIENCE_FAIR =
  'https://charlotteprep.org/community/news/stories/prep-scholar-awarded-at-state-science-fair'

export const charlottePrep: ClubsProgram = {
  service: {
    headline:
      'Service is built into the leadership program: two annual service days, a cross-age buddy system that pairs every Lower Schooler with an older student, and student-led drives.',
    subhead:
      'The school states five goals for it, from "nurture compassion and empathy for others" to "develop a life-long commitment to service and our society". "The leadership curriculum expounds on the idea of servant leadership and the importance of civic engagement."',
    programs: [
      {
        value: '2',
        valueLabel: 'annual service days',
        name: 'The Family Day of Service and the Student Morning of Service',
        detail:
          'On the Family Day of Service, "Prep families do service projects for local organizations" on and off campus. On the Student Morning of Service, "students engage in service work that addresses childhood literacy, child homelessness, animal welfare, homelessness, or economic inequality." Alongside both, the Parents Association’s holiday drive, Preppy’s Pantry, "collects coats and non-perishable food items", and Lower School students "routinely visit a local nursing home to read and play games with residents."',
        source: { label: 'charlotteprep.org — Service Learning', url: SERVICE },
      },
      {
        value: 'BUDEE',
        valueLabel: '"Be Understanding, Dedicated, Empathetic, and Engaged"',
        name: 'A buddy for every Lower Schooler',
        detail:
          'BUDEE "matches TK students from the Early School with 3rd Graders and each of the other Lower School students with a Middle School buddy", and the pairs "meet for community service, character education, and teamwork exercises." In 2023–24 the BUDEE groups ran programs for the International Day of Peace, Veterans Day, Hispanic Heritage Month, a Day of Service, Earth Day and more. Eighth graders also tutor their 4th-grade BUDEEs.',
        source: { label: 'charlotteprep.org — Leadership', url: LEADERSHIP },
      },
      {
        value: '300+',
        valueLabel: 'registered for the 2024 Hurricane Helene benefit concert',
        name: 'Student-led relief, and a 2nd-grade tradition',
        detail:
          'In October 2024 the student council ran a carpool-line supply drive for Hurricane Helene relief, every class made cards of hope, and the school co-hosted a benefit concert with 7th Street Concerts and the Sphinx Virtuosi; students "filled a moving truck with essential goods" and delivered it to the YMCA. Each February, second graders host a Black History Lunch & Learn for Charlotte community leaders — the seventh annual one was February 12, 2026.',
        source: { label: 'charlotteprep.org — "Support for Hurricane Helene Recovery", Oct 2024', url: HELENE },
      },
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — Service Learning (the five goals)', url: SERVICE },
      { label: 'charlotteprep.org — Leadership (BUDEE)', url: LEADERSHIP },
      { label: 'charlotteprep.org — Hurricane Helene relief, Oct 2024', url: HELENE },
      { label: 'charlotteprep.org — 2nd-grade Black History Lunch & Learn, Feb 2026', url: BLACK_HISTORY },
    ],
  },

  honors: {
    headline:
      'Recognition here is won, not chartered: first place in Junior Physics at the regional science fair three years running, and delegate awards at Charlotte’s Model UN conference.',
    subhead:
      'Charlotte Prep has no honor society. Its character framework is the Honor Code and the Four Pillars of leadership — respect, integrity, perseverance and courage.',
    societies: [
      {
        name: 'Science & Engineering Fair — Region 6',
        division: 'Lower and Middle School',
        recognizes:
          'Students advanced to the North Carolina State Science & Engineering Fair seven times in 2024, five in 2025 and seven in 2026 (four Elementary, three Junior), with first place in Junior Physics in each of those three years. The school reports a 3rd place in physics at the 2024 state fair.',
        feedsFrom: 'the classroom',
      },
      {
        name: 'Model UN — CHARMUN',
        division: 'Middle School',
        recognizes:
          'A club since 2020 and a CHARMUN member school since 2023. The school’s first delegate awards came in 2023; in 2024, with 20 delegates attending, it won a vocal commendation and a Most-Improved Delegate award.',
        feedsFrom: 'a club',
      },
      {
        name: 'Student Council',
        division: 'Middle School (grades 5–8)',
        recognizes:
          'Leads Middle School assemblies and organized the 2024 Hurricane Helene relief drive; in 2023 more than a third of 5th graders ran for it.',
        feedsFrom: 'the whole school',
      },
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — "Model UN Club Awarded at Conference"', url: MUN },
      { label: 'charlotteprep.org — "Prep Scholar Awarded at State Science Fair", 2024', url: SCIENCE_FAIR },
      { label: 'charlotteprep.org — Leadership (the Four Pillars)', url: LEADERSHIP },
    ],
  },
}
