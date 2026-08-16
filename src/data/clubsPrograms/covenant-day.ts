// Covenant Day School — Student Clubs (1b and 1c).
//
// Transcribed from source-material/student-clubs/covenant-day/ — principally
// the Service and Community Engagement and Honor Societies files, which carry
// the source URLs.
//
// THE 1a AFFINITY CARD IS OMITTED, and that is the research finding rather
// than a hole in it: Covenant Day's grouping model is faith- and
// structure-based — weekly chapel separated by age, teacher-led HS Advisory
// Groups that stay together all year, daily homeroom devotions, and a missions
// program — and the school publishes no identity-based affinity groups.
// Confirmed against /campus-life/student-life and /campus-life/discipleship.
// Card 1a is an ecosystem map built from a named roster; with no roster there
// are no cells to draw, so it is omitted rather than shipped thin (the same
// treatment, for a different reason, as Davidson Day).

import type { ClubsProgram } from '../clubsProgram.ts'

const SERVICE = 'https://www.covenantday.org/campus-life/service'
const DISCIPLESHIP = 'https://www.covenantday.org/campus-life/discipleship'
const STUDENT_LIFE = 'https://www.covenantday.org/campus-life/student-life'
const PSR = 'https://www.privateschoolreview.com/covenant-day-school-profile'

export const covenantDay: ClubsProgram = {
  service: {
    headline:
      'A service ladder that scales with age — fourth graders at twenty community sites, middle schoolers twice a year, and high schoolers building housing for Pine Ridge.',
    subhead:
      'Program-based rather than hours-logged: no service-hour requirement exists, and the school publishes no annual totals.',
    programs: [
      {
        value: '~20',
        valueLabel: 'community sites · 4th grade',
        name: 'Goodness Gorillas',
        detail:
          'The Lower School signature: "fourth grade students head out into the community to serve at nearly twenty different sites" — a whole-grade deployment rather than an opt-in club.',
        source: { label: 'Service', url: SERVICE },
      },
      {
        value: '2×',
        valueLabel: 'a year · all of Middle School',
        name: 'Doulos Day',
        detail:
          'Twice a year the whole middle school serves "at various local nonprofits," then reflects together afterwards — doulos being the Greek for servant.',
        source: { label: 'Service', url: SERVICE },
      },
      {
        value: '30+',
        valueLabel: 'teens to be housed · Pine Ridge',
        name: 'ContainIt',
        detail:
          'High school students "use their different talents to transform used shipping containers" into housing for the Pine Ridge Reservation in South Dakota, aiming to provide housing for more than 30 teens — a multi-year design-and-trades build, with Restore525 as the Restoration & Sustainability department’s companion program (and a credit-bearing course).',
        source: { label: 'Service', url: SERVICE },
      },
    ],
    footnoteTitle: 'The partner network',
    footnote:
      'Named partners: Matthews HELP Center, Matthews Habitat for Humanity, Operation Christmas Child, Brookstone Schools, Jackson Park, Alexander Children’s Home, and Love INC. Missions trips run to Spain, Haiti, Belize, and Pine Ridge, with a Lower School Missions Week of missionary speakers and cultural education.',
    flags: [
      {
        kind: 'gap',
        text: 'No service-hour requirement and no annual-hours total is published anywhere — the model is deliberately program-based ("students serve together, then reflect") rather than hours-logging, so there is no number to compare against schools that publish one.',
      },
    ],
    sources: [
      { label: 'covenantday.org — Service', url: SERVICE },
      { label: 'covenantday.org — Discipleship (missions)', url: DISCIPLESHIP },
    ],
  },

  honors: {
    headline:
      'Six documented societies — but only the two arts chapters are confirmed on the school’s own pages.',
    subhead:
      'The school publishes no honor-society page: divisions, induction criteria and sponsors are unstated for every chapter.',
    societies: [
      {
        name: 'National Honor Society',
        division: 'Upper School*',
        recognizes: 'Scholarship, service, leadership, character',
        feedsFrom: 'Third-party roster only — not confirmed on a school page',
      },
      {
        name: 'National Art Honor Society',
        division: 'Upper School*',
        recognizes: 'Visual-arts achievement',
        feedsFrom: 'Third-party roster; the visual-arts program it would sit atop is school-documented',
      },
      {
        name: 'Spanish Honor Society',
        division: 'Upper School*',
        recognizes: 'Spanish-language achievement',
        feedsFrom: 'Third-party roster; Spanish runs 1–4 plus AP in the course matrix',
      },
      {
        name: 'International Thespian Society',
        division: 'High School',
        recognizes: 'Theatre participation and achievement',
        feedsFrom: 'School-confirmed — named on the theater page, atop the Blumey-winning program',
      },
      {
        name: 'Tri-M Music Honor Society',
        division: 'Secondary',
        recognizes: 'Music achievement plus service',
        feedsFrom: 'School-confirmed — named on the music page, atop the nine-ensemble program',
      },
      {
        name: 'Beta Club',
        division: 'Unstated*',
        recognizes: 'Academic achievement and service (national organization)',
        feedsFrom: 'Third-party roster only',
      },
    ],
    adjacentTitle: 'Adjacent recognition',
    adjacent: [
      {
        label: 'Academic signatures',
        text: 'A required Senior Capstone Project and the McKnight Oratory speaking event sit outside the societies as the school’s named academic distinctions.',
      },
      {
        label: 'Mock Trial',
        text: 'Courtroom artist Cornelia Knight (Covenant Day Blue) won her regional and finished 2025 state runner-up — the best-documented statewide result in this area.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Entries marked * rest on a third-party roster (privateschoolreview.com) — the school publishes no honor-society directory, so divisions, induction criteria, member counts and faculty sponsors are unpublished for every society, and the four non-arts chapters are unconfirmed on any school-owned page.',
      },
    ],
    sources: [
      { label: 'covenantday.org — Theater (Thespian Society)', url: 'https://www.covenantday.org/arts/theater' },
      { label: 'covenantday.org — Music (Tri-M)', url: 'https://www.covenantday.org/arts/music' },
      { label: 'PrivateSchoolReview — activities roster (third-party)', url: PSR },
      { label: 'covenantday.org — Student Life', url: STUDENT_LIFE },
    ],
  },
}
