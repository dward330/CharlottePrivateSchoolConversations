// Charlotte Country Day School — Student Clubs (1a / 1b / 1c).
//
// Transcribed from source-material/student-clubs/charlotte-country-day/
// "CCD - Student Clubs - Clubs Redesign Deep Research.md", which carries a
// source URL and a VERIFIED / NOT FOUND marker on every fact.
//
// This is the school the design was drawn against, and the research changed one
// thing materially: the count discrepancy is BIGGER than the design's mock
// showed. The mock flagged 9-vs-7 on the Upper School alone. The live sources
// actually disagree three ways — a 22 stat tile, a 15-name enumerated roster,
// and two divisional counts (7 US, 4 MS) that are each one lower than their own
// rosters (9 US, 5 MS). The flag says so rather than reproducing the mock.
//
// Two more research outcomes worth recording, because they contradict the
// obvious guess:
//
//  1. The Upper School page does NOT carry the "7 affinity groups" figure — it
//     never mentions affinity groups at all. That figure lives on the Student
//     Life page. The source row names the pages that actually carry each claim.
//
//  2. The Axios Charlotte feature the mock cited for the ~50% mentoring figure
//     returns HTTP 403 and could not be read. The same figure is published on
//     the school's own Beyond the Classroom page, so the citation points there
//     instead — no fact here rests on a source that could not be opened.

import type { ClubsProgram } from '../clubsProgram.ts'

const DEIB = 'https://www.charlottecountryday.org/about/deib'
const DEIB_PROGRAM = 'https://www.charlottecountryday.org/about/deib/program'
const STUDENT_LIFE = 'https://www.charlottecountryday.org/cd-experience/student-life'
const MIDDLE_SCHOOL = 'https://www.charlottecountryday.org/cd-education/middle-school'
const PARENT_COMMUNITY =
  'https://www.charlottecountryday.org/cd-experience/parent-community'
const BEYOND = 'https://www.charlottecountryday.org/cd-experience/beyond-the-classroom'
const FAST_FACTS = 'https://www.charlottecountryday.org/about/fast-facts'
const ARTS_INDUCTION = 'https://www.charlottecountryday.org/cf_news/view.cfm?newsid=1056'

export const charlotteCountryDay: ClubsProgram = {
  affinity: {
    headline:
      'Fifteen affinity groups enumerated across all three divisions — every one open to all students — under a single umbrella forum, with a student leadership corps behind it.',
    subhead:
      'A more developed structure than most peer schools publish, running from first grade through twelfth and extending to parents.',
    umbrella: {
      name: 'Diversity Awareness Forum (DAF)',
      detail:
        'the umbrella for all Upper School affinity groups since 2010 · founded 1996 · Lunch Forum est. 2014 · every student introduced via the required Freshman Seminar',
    },
    groups: [
      { name: 'Amig@s', detail: 'Latine / Hispanic affinity' },
      { name: 'Asian Affinity Club', detail: 'Asian & Asian-American affinity' },
      { name: 'Black Student Union', detail: 'Black student affinity' },
      { name: 'Interfaith Club', detail: 'religious dialogue across faiths' },
      { name: 'International Club', detail: 'international students & cultures' },
      { name: 'Jewish Culture Club', detail: 'JCC — Jewish culture & community' },
      { name: 'Multi', detail: 'multiracial affinity group' },
      {
        name: 'PRISSM',
        detail: 'Promoting Respect, Inclusion and Safety for Sexual Minorities',
      },
      { name: 'SWAG', detail: "Super Women's Affinity Group" },
    ],
    strips: [
      {
        title: 'Middle School',
        hint: '· 5 groups',
        text: 'African American Affinity Group · Jewish Culture Club · MOSAIC (Mutual Respect, Open-Mindedness, Self-Respect, Attitude, Individuality, Community) · Multiracial Affinity Group · South Asian Affinity Group, added 2021',
      },
      {
        title: 'Lower School',
        hint: '· grades 1–4',
        text: 'Students of Color Affinity Group — begun 2019 with help from POCIS and Lower School teachers. The ecosystem starts before Middle School.',
      },
      {
        title: 'Parents',
        text: 'POCIS (People of Color in Independent Schools), established here in 1999, which runs an annual gathering, a community cookout, a Lower School dance and a senior showcase · International Parents Group — families get affinity spaces too.',
      },
    ],
    leadership:
      "The Student Diversity Leadership Corps (SDLC) gives selected Middle and Upper Schoolers a formal role in the school's diversity work. Students also attend the national NAIS Student Diversity Leadership Conference, and Country Day created and hosts the Affirming Community Together (ACT) Conference for area middle schoolers — first held in 2012, it grew out of Upper Schoolers wanting to pass on what they learned at national conferences. Since 1998 the school has sent two faculty from each division and six Upper School students to the NAIS People of Color Conference every year.",
    flags: [
      {
        kind: 'count',
        text: 'Three official pages disagree. A DEIB stat tile advertises 22 affinity groups; the DEIB program page enumerates 15 by name (9 Upper, 5 Middle, 1 Lower). Both divisional counts are lower than their own rosters too — the Student Life page says 7 Upper School groups against 9 enumerated, and the Middle School page says four against five. We show the 15 that are named and flag the rest rather than silently picking one.',
      },
      {
        kind: 'gap',
        text: 'The Lower School group is listed as grades 1–4 on the program page but grades 3–4 in the DEIB timeline. The school does not reconcile the two.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — DEIB "Our Program" (the enumerated roster)', url: DEIB_PROGRAM },
      { label: 'DEIB overview (timeline, the 22 figure)', url: DEIB },
      { label: 'Student Life (the "7 affinity groups" figure)', url: STUDENT_LIFE },
      { label: 'Middle School (the "four affinity groups" figure)', url: MIDDLE_SCHOOL },
      { label: 'Parent Community (POCIS, International Parents)', url: PARENT_COMMUNITY },
    ],
  },

  service: {
    headline:
      'Roughly half the junior and senior classes mentor weekly, and the entire Upper School runs the Special Olympics Spring Games — a tradition since 1984.',
    subhead:
      'Scale and longevity are the story here: these are whole-community commitments, not sign-up-sheet clubs. Service is not tracked as a graduation hours requirement.',
    programs: [
      {
        value: '~50%',
        valueLabel: 'of juniors & seniors · weekly',
        name: 'Big Brothers Big Sisters',
        detail:
          "Sustained weekly mentoring of Rama Road Elementary students — one lunch hour a week, every week. The school's flagship service organization, and a real relationship rather than a one-off event.",
        source: { label: 'Beyond the Classroom', url: BEYOND },
      },
      {
        value: '100%',
        valueLabel: 'of Upper School · 2 days each April',
        name: 'Special Olympics Spring Games',
        detail:
          'Academics pause: students, faculty and staff host the Mecklenburg County Spring Games on the Cannon Campus as buddies, timekeepers and event crew — every year since 1984, across nearly four generations of Country Day families.',
        source: { label: 'Beyond the Classroom · School Profile', url: BEYOND },
      },
      {
        value: '175+',
        valueLabel: 'partner employers · 20+ industries',
        name: 'Senior Externship Program',
        detail:
          'Every senior completes a one-day immersion in professional life through job shadowing and mentorship — many hosts are Country Day parents and alumni — connecting interests to careers since 2017.',
        source: { label: 'Beyond the Classroom', url: BEYOND },
      },
    ],
    footnoteTitle: 'Beyond the big three',
    footnote:
      'The school also names 20+ service-learning partnerships, including Goodwill Industries, ourBridge, The Learning Collaborative, Friendship Trays and Loaves and Fishes.',
    flags: [
      {
        kind: 'not-a-club',
        text: 'Of the three signature programs, only Big Brothers Big Sisters is an organized student body. The Spring Games are a whole-division event, the Externship is an individual one-day placement, and Community Service Day, the Parents’ Association Run for Good and the IB Creativity, Activity, Service requirement are events or curricular requirements. The catalog card lists only confirmed organizations.',
      },
      {
        kind: 'gap',
        text: 'The externship partner count is inconsistent on the school’s own pages — "more than 175" in the main section, "100+" in a tile summary on that same page, and "nearly 175" in the school profile. We show the current 175+.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Beyond the Classroom', url: BEYOND },
      { label: 'Fast Facts / 2024-25 School Profile', url: FAST_FACTS },
    ],
  },

  honors: {
    headline:
      'Six selective recognition societies spanning scholarship, service, music, visual art and theatre.',
    subhead:
      'These are outcomes of achievement elsewhere in the program — a student earns their way in; nobody signs up.',
    societies: [
      {
        name: 'The Cum Laude Society',
        division: 'Upper School',
        recognizes:
          'Top-tier scholarship — founded 1906 and modeled after Phi Beta Kappa',
        feedsFrom: 'the classroom',
      },
      {
        name: 'National Honor Society',
        division: 'Upper School',
        recognizes: 'Academic achievement, service, leadership, character',
        feedsFrom: 'classroom + service',
      },
      {
        name: 'National Junior Honor Society',
        division: 'Middle School',
        recognizes: 'The Middle School counterpart to NHS',
        feedsFrom: 'classroom + service',
      },
      {
        name: 'National Art Honor Society',
        division: 'Upper School',
        recognizes: 'Visual-arts achievement',
        feedsFrom: 'The Arts',
      },
      {
        name: 'Tri-M Music Honor Society',
        division: 'Upper School',
        recognizes: 'Music achievement',
        feedsFrom: 'The Arts',
      },
      {
        name: 'International Thespian Society',
        division: 'Upper School',
        recognizes: 'Theatre achievement',
        feedsFrom: 'The Arts',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Public sources confirm the societies exist but not induction criteria — no GPA cutoff, class-rank percentile or service minimum is published for any of the six, and there is no dedicated honor-societies page. The only hard induction count anywhere is from March 2016, when 45 students were inducted across the three arts societies; a March 2026 Cum Laude ceremony was covered with no count at all. Worth asking on a tour.',
      },
      {
        kind: 'gap',
        text: 'No world-language honor society exists here — no French, Spanish or Latin society — despite those languages running through AP and IB. Nor is there a math, science or journalism society. That is an absence, not merely undocumented.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Fast Facts (the roster)', url: FAST_FACTS },
      { label: 'School news — 2016 arts induction (the only published count)', url: ARTS_INDUCTION },
    ],
  },
}
