// Gaston Day School — Student Clubs research area.
//
// Every figure is traceable to source-material/student-clubs/gaston-day/ —
// "Gaston Day School - Student Clubs - Roster Honor Societies and Signature
// Programs 2026.md".
//
// IMPORTANT PROVENANCE CAVEAT, carried onto the card as a `verify` flag:
// the enumerated club roster is RECONSTRUCTED FROM THIRD-PARTY LISTINGS
// (Private School Review, Niche), not from a school-published dated list. The
// school's own Upper School page names only exemplar clubs ("3-D Printing Club
// to Green Team to International Council") and states that students may start a
// new club by securing a faculty sponsor — so the roster is intentionally
// open-ended and any enumeration is a snapshot, not a census. Counts derived
// from it are flagged rather than presented as school-stated figures.
//
// All three cards render. The `affinity` card carries the roster; `service`
// carries the three signature programs and the service ladder; `honors` carries
// the three chartered societies plus the non-society recognition.

import type { ClubsProgram } from '../clubsProgram.ts'

const UPPER = 'https://www.gastonday.org/upper-school/'
const MIDDLE = 'https://www.gastonday.org/middle-school/'
const PROFILE =
  'https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf'
const PSR = 'https://www.privateschoolreview.com/gaston-day-school-profile'
const IGEM = 'https://2020.igem.org/Team:Gaston_Day_School'

export const gastonDay: ClubsProgram = {
  /* --------------------------------------------------------- 3a affinity -- */
  affinity: {
    headline:
      'Twenty-eight identifiable clubs plus three honor societies, from Chess and Classics to a 3-D Printing Club, a Green Team and an International Council — with any student able to start a new one by finding a faculty sponsor.',
    subhead:
      'The standouts are not on the roster at all: a gold-medal iGEM synthetic-biology team and a VEX Robotics squad that reached TSA Nationals in its first year of competing.',
    umbrella: {
      name: 'Student-founded by design',
      detail:
        'The school states that students "can start a new club by securing a faculty sponsor," so the roster grows from student initiative rather than from a fixed central list. That is why no published count exists — and why the numbers on this card carry a count flag.',
    },
    groups: [
      { name: 'Blutopia', detail: 'US literary & arts magazine — nationally recognised' },
      { name: 'Middle School Literary Magazine' },
      { name: 'Yearbook' },
      { name: 'Chess Club' },
      { name: 'Classics Club' },
      { name: 'Drama Club' },
      { name: 'Theatre Arts' },
      { name: 'French Club' },
      { name: 'Spanish Club' },
      { name: 'Public Debate Club' },
      { name: 'Science Olympiad' },
      { name: 'Student Government', detail: 'Middle School and Upper School' },
      { name: 'Peer Mentoring', detail: 'Sunship Earth — see the Service card' },
      { name: '3-D Printing Club', detail: 'Named by the school itself' },
      { name: 'Green Team', detail: 'Named by the school itself' },
      { name: 'International Council', detail: 'Named by the school itself' },
      { name: 'Interact' },
      { name: 'Mock Trial' },
      { name: 'Quiz Bowl' },
      { name: 'FCA', detail: 'Fellowship of Christian Athletes' },
      { name: 'Art Club' },
      { name: 'Spirit Club' },
      { name: 'Junior Heart Board' },
      { name: 'International Club' },
    ],
    strips: [
      {
        title: 'iGEM — synthetic biology',
        hint: '· gold medal · 2012, 2016, 2018, 2020',
        text: 'Gaston Day has fielded four International Genetically Engineered Machine high-school teams, winning a **gold medal**. Documented projects include a **kudzu phytotoxin** and an ***E. coli* K-12 isobutanol biofuel**. iGEM is a university-level competition with a separate high-school track — fielding a team from a 510-student school is genuinely unusual, and the Duke undergraduate iGEM team has supported the Gaston Day squad.',
      },
      {
        title: 'VEX Robotics',
        hint: '· TSA Nationals, 2023',
        text: 'After years in a joint-school **FIRST Robotics** team that placed **4th at state level**, Gaston Day launched its own VEX Robotics Club and **qualified for Technology Student Association VEX Nationals in 2023 — its first year of competing**. **Robotics (H)** and **Engineering (H)** also run as Upper School courses, and the school has a renovated makerspace with 3-D printers, laser cutters and CNC machines.',
      },
      {
        title: 'Middle School',
        hint: '· grades 5–8',
        text: 'Middle School students elect **LEAD courses** (required) alongside art, drama, chorus and band, and run their own **Student Government**. The **Spartan Strong Volunteer Service Award** recognises 50+ volunteer hours a year at this level.',
      },
    ],
    leadershipTitle: 'The leadership arm',
    leadership:
      '"Every student has an opportunity for leadership" through athletics, performing arts, clubs or classroom roles, and students in **grades 9 and 10 attend a one-day leadership workshop**. Student Government runs at both Middle and Upper School level, and the student-led **Honor Council** enforces the Honor Code.',
    flags: [
      {
        kind: 'count',
        text: 'The 28-club figure is a reconstruction, not a published count. Private School Review enumerates 14 activities; the school itself names only three clubs by way of example; the rest come from third-party listings. Because students found new clubs each year with a faculty sponsor, the true roster is a moving target and no source states its size.',
      },
      {
        kind: 'gap',
        text: 'No school-published, dated club list exists — with no membership numbers, faculty sponsors, meeting times, or per-club competition results for any club other than iGEM and robotics.',
      },
      {
        kind: 'count',
        text: 'The iGEM gold medal is third-party-confirmed; the archived iGEM team wikis return 403 to automated fetches, so the medal level was not re-verified at source in this pass. Team participation across 2012, 2016, 2018 and 2020 IS confirmed by the archived team pages.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Upper School (club policy, named clubs, leadership workshop)', url: UPPER },
      { label: 'Private School Review — Gaston Day School (14-item activity list)', url: PSR },
      { label: 'gastonday.org — Academic Profile 2025-2026 (robotics history, Blutopia)', url: PROFILE },
      { label: 'iGEM team archive — 2020 Gaston Day School team', url: IGEM },
      { label: 'gastonday.org — Middle School (LEAD, student government, service award)', url: MIDDLE },
    ],
  },

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
          'Every senior completes an approved internship, research or community-service project of no less than 40 hours, focused either on preparation for a professional career or on advancing one of the school’s core values. It begins in the second semester of junior year and completes in the first semester of senior year, with documentation and reporting throughout — and carries 0.25 credit.',
        source: { label: 'gastonday.org — Academic Profile 2025-2026', url: PROFILE },
      },
      {
        value: 'Yr-long',
        valueLabel: 'juniors & seniors mentoring 4th graders',
        name: 'Sunship Earth & Peer Mentoring',
        detail:
          'Selected juniors and seniors spend several days each fall in the mountains with the fourth-grade class, leading activities on the relationship between the environment and the human race. The relationships formed become a mentoring programme: each eleventh- and twelfth-grade student continues to meet and work with their fourth-grade mentee throughout the school year.',
        source: { label: 'gastonday.org — Academic Profile 2025-2026', url: PROFILE },
      },
      {
        value: '25 hrs',
        valueLabel: 'per year, every Upper School student',
        name: 'Community Service Requirement',
        detail:
          'All Upper School students must complete a minimum of 25 hours of volunteer service each year, rising to 40 hours for National Honor Society members. Juniors additionally plan, organise and execute their own community-service project.',
        source: { label: 'gastonday.org — Upper School', url: UPPER },
      },
    ],
    footnoteTitle: 'The recognition ladder above the requirement',
    footnote:
      'Beyond the 25-hour floor, the **President’s Service Award** recognises Upper School students who have served **100 or more hours**, and the Middle School runs its own **Spartan Strong Volunteer Service Award** at **50+ hours** a year. So there is a documented ladder at three levels — 25 required, 50 recognised in the Middle School, 100 recognised in the Upper School — plus the 40-hour NHS threshold sitting alongside.',
    flags: [
      {
        kind: 'not-a-club',
        label: 'REQUIREMENT',
        text: 'The Capstone and the 25-hour service obligation are graduation requirements rather than clubs — they are listed here because they are where most Gaston Day service actually happens, and because every graduate has one.',
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
      'Three chartered honor societies, and an Honor Code enforced by a student-led Honor Council that the college office will report to admissions when asked.',
    subhead:
      'The Honor Code disclosure is unusually explicit — the school states in its own profile that it reports violations, including suspension, dismissal or expulsion.',
    societies: [
      {
        name: 'National Honor Society',
        division: 'Upper School',
        recognizes:
          'Scholarship, leadership, service and character. NHS members carry a **40-hour** annual service requirement against the school-wide 25.',
        feedsFrom: 'the classroom',
      },
      {
        name: 'National Beta Club',
        division: 'Upper School',
        recognizes:
          'Academic achievement, character, leadership and service — a second academic society alongside NHS.',
        feedsFrom: 'the classroom',
      },
      {
        name: 'International Thespian Society',
        division: 'Upper School',
        recognizes:
          'Excellence in theatre. The school charters the society but does not publish its troupe number or induction thresholds.',
        feedsFrom: 'The Arts',
      },
    ],
    adjacentTitle: 'Recognition that is not a society',
    adjacent: [
      {
        label: 'Honor Code & Honor Council',
        text: 'Student conduct is governed by the **Honor Code**, enforced by a **student-led Honor Council**. When a college requests it, College Counseling **will report any honor code violations**, including suspension, dismissal or expulsion.',
      },
      {
        label: 'President’s Service Award',
        text: 'For Upper School students who have served **100 or more hours** — the top rung of the service ladder.',
      },
      {
        label: 'Spartan Strong Volunteer Service Award',
        text: 'The Middle School equivalent, recognising **50+ volunteer hours** in a year.',
      },
      {
        label: 'Scholastic Art & Writing Awards',
        text: '**Blutopia** has taken numerous Scholastic Art and Writing Awards and is consistently recognised in the **NC Scholastic Media Association Literary Magazine Contest**.',
      },
      {
        label: 'iGEM gold medal',
        text: 'The synthetic-biology team’s **gold medal** is the school’s most distinctive competitive recognition, and sits outside any society structure.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No induction criteria, GPA thresholds, chapter names or member counts are published for any of the three societies — only that they exist. The National Merit programme is not mentioned in the profile at all, so no Semifinalist/Commended ledger could be built.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (Honor Code reporting, NHS service threshold, Blutopia)', url: PROFILE },
      { label: 'gastonday.org — Upper School (President’s Service Award)', url: UPPER },
      { label: 'Private School Review — Gaston Day School (society roster)', url: PSR },
    ],
  },
}
