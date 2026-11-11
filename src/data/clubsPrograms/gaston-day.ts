// Gaston Day School — Student Clubs research area.
//
// Every figure is traceable to source-material/student-clubs/gaston-day/ —
// "Gaston Day School - Student Clubs - Roster Honor Societies and Signature
// Programs 2026.md".
//
// TWO of three cards render. `affinity` (Affinity & Identity Groups) is OMITTED
// ENTIRELY — Gaston Day names no identity groups at all, and the material that
// does exist is a set of absences rather than content: the school's own About
// page carries a "DIVERSITY & DIFFERENCE" heading whose body is unfilled Lorem
// ipsum, there is no DEI office or named staff, and no student group serves the
// ~14% international cohort. Per the no-empty-cards rule a card with zero items
// is omitted rather than shipped as a shell of gap flags. (User call,
// 2026-08-18, at the review step.)
//
// Note the general club roster (Chess, Yearbook, Science Olympiad, iGEM, VEX
// Robotics and the rest) was never affinity material either — it lives in the
// Club Catalog card (src/data/clubCatalog.ts) and the Academic & Competitive
// Clubs card (src/data/clubClusters.ts). An earlier draft wrongly put it here.
//
// `service` carries the three signature programs and the service ladder;
// `honors` carries the one society the school names (NHS) plus non-society
// recognition. Plan thespianname (2026-11-10) removed International Thespian
// Society, National Beta Club and the "Honor Council": they came only from
// third-party listings, and the user ruled that Gaston's club data comes only
// from the school's own website or documents.

import type { ClubsProgram } from '../clubsProgram.ts'

const UPPER = 'https://www.gastonday.org/upper-school/'
const MIDDLE = 'https://www.gastonday.org/middle-school/'
const PROFILE =
  'https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf'

export const gastonDay: ClubsProgram = {
  /* --------------------------------------------------------- 3a affinity -- */
  /* ---------------------------------------------------------- 3b service -- */
  service: {
    headline:
      'Service is a graduation requirement, not a club — 25 hours every year for every Upper School student, and a 40-hour Capstone every senior must complete.',
    subhead:
      'Peer mentoring runs the length of a school year and pairs each junior and senior with a fourth grader.',
    programs: [
      {
        value: '40 hrs',
        valueLabel: 'minimum, required of every senior',
        name: 'Capstone Project',
        detail:
          'Every senior completes an approved internship, research or community-service project of no less than 40 hours. The project focuses either on preparing for a professional career or on advancing one of the school’s core values. It begins in the second semester of junior year and ends in the first semester of senior year. Students document and report on it throughout. The project carries 0.25 credit.',
        source: { label: 'gastonday.org — Academic Profile 2025-2026', url: PROFILE },
      },
      {
        value: 'Yr-long',
        valueLabel: 'juniors & seniors mentoring 4th graders',
        name: 'Sunship Earth & Peer Mentoring',
        detail:
          'Selected juniors and seniors spend several days each fall in the mountains with the fourth-grade class. They lead activities on how people and the environment affect each other. The bonds they form become a mentoring program. Each eleventh- and twelfth-grade student keeps meeting and working with their fourth-grade mentee throughout the school year.',
        source: { label: 'gastonday.org — Academic Profile 2025-2026', url: PROFILE },
      },
      {
        value: '25 hrs',
        valueLabel: 'per year, every Upper School student',
        name: 'Community Service Requirement',
        detail:
          'All Upper School students must complete a minimum of 25 hours of volunteer service each year. The minimum rises to 40 hours for National Honor Society members. Juniors also plan, organize and carry out their own community-service project.',
        source: { label: 'gastonday.org — Upper School', url: UPPER },
      },
    ],
    footnoteTitle: 'The recognition ladder above the requirement',
    footnote:
      'Beyond the 25-hour floor, the President’s Service Award recognizes Upper School students who have served 100 or more hours. The Middle School runs its own Spartan Strong Volunteer Service Award at 50+ hours a year. So there is a documented ladder at three levels: 25 required · 50 recognized in the Middle School · 100 recognized in the Upper School. The 40-hour NHS threshold sits alongside it.',
    flags: [
      {
        kind: 'not-a-club',
        label: 'REQUIREMENT',
        text: 'The Capstone and the 25-hour service obligation are graduation requirements rather than clubs. The card lists them because most Gaston Day service actually happens through them. The card also lists them because every graduate has one.',
      },
      {
        kind: 'gap',
        text: 'The school publishes no aggregate service-hour total, no count of President’s Service Award recipients, and no list of the community partners students serve with.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (Capstone, Sunship Earth, service requirement)', url: PROFILE },
      { label: 'gastonday.org — Upper School (25 hours, junior project, President’s Service Award)', url: UPPER },
      { label: 'gastonday.org — Middle School (Spartan Strong Volunteer Service Award)', url: MIDDLE },
    ],
  },

  /* ----------------------------------------------------------- 3c honors -- */
  honors: {
    headline:
      'The National Honor Society, and an Honor Code whose violations the college office will report to colleges when asked.',
    subhead:
      'The Honor Code disclosure is unusually explicit — the school states in its own profile that it reports violations, including suspension, dismissal or expulsion.',
    societies: [
      {
        name: 'National Honor Society',
        division: 'Upper School',
        recognizes:
          'Scholarship, leadership, service and character. NHS members carry a 40-hour annual service requirement against the school-wide 25.',
        feedsFrom: 'the classroom',
      },
    ],
    adjacent: [
      {
        label: 'Honor Code',
        text: 'Student conduct is governed by the Honor Code. When a college requests it, College Counseling will report any honor code violations, including suspension, dismissal or expulsion.',
      },
      {
        label: 'President’s Service Award',
        text: 'For Upper School students who have served 100 or more hours — the top rung of the service ladder.',
      },
      {
        label: 'Spartan Strong Volunteer Service Award',
        text: 'The Middle School equivalent, recognizing 50+ volunteer hours in a year.',
      },
      {
        label: 'Scholastic Art & Writing Awards',
        text: 'Blutopia has taken numerous Scholastic Art and Writing Awards and is consistently recognized in the NC Scholastic Media Association Literary Magazine Contest.',
      },
      {
        label: 'iGEM awards',
        text: 'The school says its research teams competed in iGEM for over a decade and won Silver, Gold and Bronze awards. It is the school’s most distinctive competitive recognition, and sits outside any society structure.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No induction criteria, GPA thresholds, chapter names or member counts are published for the National Honor Society — only that it exists. The National Merit program is not mentioned in the profile at all, so no Semifinalist/Commended ledger could be built.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (Honor Code reporting, NHS service threshold, Blutopia)', url: PROFILE },
      { label: 'gastonday.org — Upper School (President’s Service Award)', url: UPPER },
    ],
  },
}
