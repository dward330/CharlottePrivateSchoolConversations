// Charlotte Catholic High School — the three Student Clubs cards.
//
// The clubs directory is unusually enumerable for this roster: 76 clubs across
// six named categories, most carrying a staff advisor, a meeting room and a
// written purpose. That count was established by parsing the page's RAW HTML,
// not by reading a summary — a page-summarizer pass over the same page returned
// 106 clubs, an overcount produced by renumbering within categories. The raw
// parse yields 78 title blocks, two of which ("Links & Resources", "Stay
// Connected") are sidebar furniture rather than clubs, giving 76.
//
// Worth knowing: the school PROFILE says CCHS "offers over 50 club
// opportunities each year" — a conservative round number in prose. The
// directory is the countable source and it enumerates 76, which is what the
// Compare row uses.
//
// ⚠️ Service is a GRADUATION REQUIREMENT here, not a voluntary programme:
// 70 approved hours over four years, at least 5 of them parish service each
// year, submitted by March 1. That is why the school can claim 100%
// participation — it is structurally true rather than a survey result.
//
// See source-material/student-clubs/charlotte-catholic/ for the hard data.

import type { ClubsProgram } from '../clubsProgram.ts'

const CLUBS = 'https://www.charlottecatholic.org/departments/campus-ministry/clubs'
const HANDBOOK =
  'https://resources.finalsite.net/images/v1753815058/charlottecatholicorg/f73esbbzrom3skvql13w/25-26StudentHandbookFinal.pdf'
const PROFILE =
  'https://resources.finalsite.net/images/v1756128027/charlottecatholicorg/f5yfsecttu3cgmmtsh3f/CCHSSchoolProfile25-26FinalforOnline.pdf'
const GUIDE =
  'https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf'

export const charlotteCatholic: ClubsProgram = {
  affinity: {
    headline: '76 clubs in six categories, nearly all with a named advisor and a room.',
    subhead:
      'The directory is one of the most transparent on this roster — most entries publish a written purpose, a staff advisor and where the club actually meets.',
    umbrella: {
      name: 'Campus Ministry',
      detail:
        'The clubs directory sits under Campus Ministry rather than student activities, which shapes the mix: faith-formation and service clubs are the largest blocks, and the Campus Ministry Club itself runs monthly formation, fellowship and faith events with altar server, sacristan and peer ministry roles.',
    },
    groups: [
      { name: 'Achievers Club', detail: 'Creates an intentional space for sharing among Black students. Advisor Dr. Sigwald, Room 225.' },
      { name: 'Asian American Pacific Islander Club', detail: 'For students who share or are interested in an Asian-American and Pacific Islander background. Advisor Mr. Pham, Library.' },
      { name: 'German Club', detail: 'Promotes German language and culture. Advisor Mrs. Schmid-Rankin, Room 527.' },
      { name: 'Spanish Club', detail: 'Shares the experiences of Spanish-speaking communities. Advisor Ms. Palomino, Room 204.' },
      { name: 'Voices for All Club', detail: 'Promotes awareness and understanding of sign language. Advisor Mrs. Bick, Room 318.' },
      { name: 'Legacy Club', detail: 'Brings together students whose parents graduated from CCHS. Advisors Mrs. Clementi and Mr. Morgan, Room 218.' },
      { name: 'Mental Health Club', detail: 'Raises awareness of mental health in the school community. Advisor Mrs. Clementi, Counseling.' },
      { name: 'Morgan’s Message Club', detail: 'Normalizes conversations about mental and physical challenges among student-athletes. Advisor Mr. Christmas, Gym.' },
      { name: 'Alopecia Club', detail: 'Supports students affected by alopecia. Advisor Mrs. Best, Campus Ministry.' },
      { name: 'Food and Friends', detail: 'Food-allergy awareness, with food-drive service. Advisor Ms. Davaz, Room 205.' },
    ],
    strips: [
      {
        title: 'The six categories',
        hint: 'as the school groups them',
        text: 'Education 16 · Service 23 · Community 9 · Culture 4 · Sports 15 · General Interest 9. Service is the single largest block, which follows from a school where service is a graduation requirement.',
      },
      {
        title: 'Culture is the smallest category',
        hint: '4 of 76',
        text: 'Achievers, Asian American Pacific Islander, German and Spanish clubs. For a school of ~1,171 in a diverse metro, four identity-and-culture groups is a thin roster relative to the 23 service clubs — worth asking about on a visit.',
      },
      {
        title: 'Sports clubs are a real second tier',
        hint: '15 clubs',
        text: 'Climbing, figure skating, girls’ rugby, men’s rugby, golf, lacrosse, pickleball, ping pong, sailing, skateboarding, soccer, wakeboarding and more — several meeting off campus at Inner Peaks, Davie Park, Renaissance Skate Park and the Carolina Sports Complex. A student who does not make a 6A varsity team still has somewhere to play.',
      },
      {
        title: 'Advisors are named, rooms are published',
        text: 'Almost every one of the 76 entries carries a staff advisor and a meeting room — an unusual level of published operational detail, and a practical way for a family to ask who actually runs a group.',
      },
    ],
    leadership:
      'The school profile says CCHS "encourages all students to participate in school-sponsored clubs". The directory publishes advisors and rooms but no application process, no membership caps and no meeting schedule, so how selective any given club is — if at all — is not disclosed.',
    flags: [
      {
        kind: 'count',
        text: 'The school profile says "over 50 club opportunities"; the clubs directory enumerates 76. Both are the school’s own figures. The directory is the countable one and is what this app reports.',
      },
      {
        kind: 'gap',
        text: 'No membership numbers are published for any club, so size and selectivity cannot be judged from the directory.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — Clubs directory', url: CLUBS },
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
    ],
  },

  service: {
    headline: 'Service is not encouraged here — it is required to graduate.',
    subhead:
      '70 approved hours over four years, at least 5 of them parish service every year, documented on Canvas and due by March 1.',
    programs: [
      {
        value: '70',
        valueLabel: 'hours to graduate',
        name: 'The four-year requirement',
        detail:
          'Freshmen submit 10 hours; sophomores, juniors and seniors submit 20 each year. The total is adjusted where a student is enrolled fewer than four years. Service hours are a stated condition of graduation from CCHS.',
        source: { label: 'Student Handbook 2025-2026 (PDF)', url: HANDBOOK },
      },
      {
        value: '≥5',
        valueLabel: 'parish hours a year',
        name: 'The parish-service floor',
        detail:
          'At least five of each year’s hours must be parish service specifically — a diocesan requirement that shapes where students serve, not just how much.',
        source: { label: 'Student Handbook 2025-2026 (PDF)', url: HANDBOOK },
      },
      {
        value: '100%',
        valueLabel: 'participation',
        name: 'Whole-cohort by construction',
        detail:
          'The school profile reports 100% community-service participation. Because service is a graduation requirement rather than an opt-in programme, that figure is structurally true — it is not a measure of enthusiasm.',
        source: { label: 'School Profile 2025-2026 (PDF)', url: PROFILE },
      },
      {
        value: '23',
        valueLabel: 'service clubs',
        name: 'The service block',
        detail:
          'The largest of the six club categories: Best Buddies, Habitat for Humanity, Red Cross, Ronald McDonald House, Caritas, Mel’s Diner, Muffin Ministry, Beds for Kids, Helping Moms in Need, Golden Hearts, Live Like Bryant, Wayfinders Ambassadors and the U.S. Service Academy Club among them. Several meet off campus — at the Habitat ReStore, at St. Matthew’s Parish Center.',
        source: { label: 'Clubs directory', url: CLUBS },
      },
      {
        value: 'March 1',
        valueLabel: 'annual deadline',
        name: 'How hours are logged',
        detail:
          'Hours must be submitted by March 1 each year to be logged and approved, documented on Canvas with photographs permitted. Campus Ministry assists students in finding qualifying opportunities.',
        source: { label: 'Student Handbook 2025-2026 (PDF)', url: HANDBOOK },
      },
    ],
    footnoteTitle: 'What this means for a family',
    footnote:
      'Because every graduate completes 70 hours, service hours do not differentiate one CCHS applicant from another — the parish requirement and the leadership roles behind the hours are what a college reader can actually distinguish. A family should also note the practical load: 20 hours a year from sophomore year, with a hard March 1 cutoff, on top of a seven-class timetable.',
    flags: [],
    sources: [
      { label: 'charlottecatholic.org — Student Handbook 2025-2026 (PDF)', url: HANDBOOK },
      { label: 'charlottecatholic.org — Clubs directory', url: CLUBS },
    ],
  },

  honors: {
    headline: 'Ten honor societies, and published GPA thresholds for the academic ones.',
    subhead:
      'Four of the ten are world-language societies, which follows from a curriculum requiring two units of the same language and running four languages to AP.',
    societies: [
      { name: 'National Honor Society', division: 'Grades 9–12', recognizes: 'Scholarship, leadership, service and character — reported 3.9 GPA threshold', feedsFrom: 'the classroom' },
      { name: 'Mu Alpha Theta Math Honor Society', division: 'Grades 9–12', recognizes: 'Mathematics — reported 4.5 GPA threshold in mathematics, the highest bar of any society here', feedsFrom: 'Mathematics' },
      { name: 'Science National Honor Society', division: 'Grades 9–12', recognizes: 'Science — reported 4.25 science GPA with a 4.0 overall', feedsFrom: 'Science' },
      { name: 'Rho Kappa National Social Studies Honor Society', division: 'Grades 9–12', recognizes: 'Social studies — reported 3.75 GPA threshold', feedsFrom: 'Social Studies' },
      { name: 'International Thespian Honor Society', division: 'Grades 9–12', recognizes: 'Theatre — reported 3.0 GPA plus 60 accumulated thespian points', feedsFrom: 'The Arts' },
      { name: 'National Art Honor Society', division: 'Grades 9–12', recognizes: 'Visual art', feedsFrom: 'The Arts' },
      { name: 'Spanish Honor Society', division: 'Grades 9–12', recognizes: 'Spanish language study', feedsFrom: 'World Languages' },
      { name: 'French Honor Society', division: 'Grades 9–12', recognizes: 'French language study', feedsFrom: 'World Languages' },
      { name: 'German Honor Society', division: 'Grades 9–12', recognizes: 'German language study', feedsFrom: 'World Languages' },
      { name: 'Latin Honor Society', division: 'Grades 9–12', recognizes: 'Latin language study', feedsFrom: 'World Languages' },
    ],
    adjacent: [
      { label: 'National Merit', text: '2 Finalists and 11 Commended Students in 2025.' },
      { label: 'Service academies', text: 'Three US Naval Academy appointments in 2025, plus an Army ROTC scholarship at Cornell.' },
      { label: 'The decile chart', text: 'CCHS does not rank students, so there is no valedictorian or class-rank distinction — a 10-decile GPA chart stands in its place.' },
      { label: 'St. Augustine Scholars Program', text: 'A selective four-year classical pathway begun with a 9th-grade cohort in 2025-26 — a programme rather than a society, but the school’s most selective academic designation.' },
      { label: 'Blumey finalists', text: 'Five finalists in 2025 and five further placements in 2026 — the school’s strongest recent external competitive recognition.' },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Induction criteria are published for five of the ten societies. The four world-language societies and the National Art Honor Society are named on the school profile without a stated GPA or points threshold, and no society publishes its membership count.',
      },
      {
        kind: 'not-a-club',
        text: 'CCHS runs a school newspaper, a literary magazine, a yearbook and a podcast — but as ENGLISH COURSES (Journalism 234 and Yearbook 235), not as clubs, which is why none appears in the 76-club directory. Both are year-long electives for grades 10–12 requiring a B average in English and a teacher recommendation; Yearbook additionally requires an application and an interview.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'charlottecatholic.org — Clubs directory', url: CLUBS },
      { label: 'charlottecatholic.org — Curriculum Guide 2026-2027 (PDF)', url: GUIDE },
    ],
  },
}
