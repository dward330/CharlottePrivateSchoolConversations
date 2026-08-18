// Gaston Day School — Student Clubs research area.
//
// Every figure is traceable to source-material/student-clubs/gaston-day/ —
// "Gaston Day School - Student Clubs - Roster Honor Societies and Signature
// Programs 2026.md".
//
// All three cards render.
//
// `affinity` is Affinity & IDENTITY groups, and Gaston Day names NONE — so the
// card ships with an empty `groups` roster and carries the gap instead, the
// same shape Cannon uses. The general club roster (Chess, Yearbook, Science
// Olympiad, iGEM, VEX Robotics and the rest) does NOT belong here: it lives in
// the Club Catalog card (src/data/clubCatalog.ts) and the Academic &
// Competitive Clubs card (src/data/clubClusters.ts). An earlier draft wrongly
// put the whole roster on this card; identity groups and interest clubs are
// different things and the card titles say so.
//
// The one genuinely notable finding here: the school's own About page carries a
// "DIVERSITY & DIFFERENCE" heading whose body is unfilled Lorem ipsum, so the
// section exists and was never written.
//
// `service` carries the three signature programs and the service ladder;
// `honors` carries the three chartered societies plus non-society recognition.

import type { ClubsProgram } from '../clubsProgram.ts'

const UPPER = 'https://www.gastonday.org/upper-school/'
const MIDDLE = 'https://www.gastonday.org/middle-school/'
const PROFILE =
  'https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf'
const PSR = 'https://www.privateschoolreview.com/gaston-day-school-profile'

export const gastonDay: ClubsProgram = {
  /* --------------------------------------------------------- 3a affinity -- */
  affinity: {
    headline:
      'Gaston Day names no affinity or identity groups at all — and its own "Diversity & Difference" page is unfilled placeholder text.',
    subhead:
      'The nearest things on the roster are cultural-interest clubs rather than identity groups, and the school publishes no DEI office, staff or programme. This is the clearest publication gap in its record.',
    umbrella: undefined,
    groups: [],
    strips: [
      {
        title: 'What is published',
        hint: '· Upper School',
        text: 'Nothing identity-based. The school\'s Upper School page describes "a wide variety of clubs" and names three by way of example — 3-D Printing Club, Green Team and International Council — none of which is an affinity group. No Black Student Union, gender or sexuality alliance, multiracial, Jewish, Asian, Latine or interfaith group appears anywhere on gastonday.org or in any third-party listing.',
      },
      {
        title: 'The cultural-interest clubs',
        hint: '· not affinity groups',
        text: 'An **International Council** and an **International Club** exist, alongside **Spanish**, **French** and **Classics** clubs. These are language and cultural-interest clubs tied to the curriculum, not identity groups with a membership basis — they are catalogued on the Club Catalog card and are listed here only to be explicit that they were considered and are not the same thing.',
      },
      {
        title: 'The international cohort',
        hint: '· ~14% of students',
        text: 'A third-party listing puts international students at about 14% of the 510 enrolled, and the Academic Profile carries a world-language exception for ESL international students — so a substantial international cohort demonstrably exists. What is not published is any student-led group, peer-support structure or buddy programme serving it. The International Program page describes admissions, homestay vetting through ABC Education Group and the Global Classroom Initiative, and names Carolyn Senter as Director of International Programs — but no student organisation.',
      },
      {
        title: 'Middle & Lower School',
        text: 'No affinity groups in either division. The Middle School publishes LEAD courses, advisory, Student Government and the Spartan Strong Volunteer Service Award; advisory sessions are described as covering "pertinent topics" and "activities promoting diversity and life skills", which is the only diversity-adjacent programming named anywhere in the school\'s published material.',
      },
      {
        title: 'Parents',
        text: 'No parent affinity or identity groups are published.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The school\'s About page carries a "DIVERSITY & DIFFERENCE" heading whose body is **unfilled Lorem ipsum placeholder text** — the section was created and never written. There is no DEI office, no named diversity staff member, no diversity statement, no affinity roster and no student diversity leadership arm anywhere on the public site. This is a stronger form of gap than a school that simply does not mention the subject.',
      },
      {
        kind: 'gap',
        text: 'Third-party commentary (Niche reviews) describes the school as lacking racial and socio-economic diversity and names inclusion as an area for growth. That is unverified opinion rather than published data, and no enrollment demographic breakdown is available from the school: NCES reports "N/A" for every racial category, and Private School Review reports 19% students of color against a 24% state average.',
      },
    ],
    sources: [
      { label: 'gastonday.org — About Us ("Diversity & Difference" heading with placeholder body)', url: 'https://www.gastonday.org/about-us/' },
      { label: 'gastonday.org — Upper School (the three named example clubs; no affinity groups)', url: UPPER },
      { label: 'gastonday.org — International Program (homestay, Global Classroom; no student group)', url: 'https://www.gastonday.org/international/' },
      { label: 'gastonday.org — Middle School (advisory, LEAD, service award)', url: MIDDLE },
      { label: 'nces.ed.gov — PSS 2023-24 (demographics reported N/A); privateschoolreview.com — 19% students of color', url: PSR },
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
