// Charlotte Catholic High School — Summer Programs (youth camps).
//
// Transcribed from source-material/summer-programs/charlotte-catholic/
// "Charlotte Catholic - Summer Programs - 2026 Camp Catalog.md".
//
// ⚠️ READ THIS BEFORE INTERPRETING ANY AGE FIGURE. These are youth camps that
// CCHS ATHLETICS HOSTS FOR THE SURROUNDING COMMUNITY — they are not summer
// programming for CCHS's own 9–12 students. The campers are rising 2nd–9th
// graders and children aged 6–13, i.e. mostly YOUNGER than the school's own
// student body. On a 9–12 high school's page a "6–13" age band otherwise reads
// as a data error, so the framing is made explicit on the card itself and in
// the per-cell provenance for the summer-ages Compare row.
//
// ⚠️ MACS Summer Camp is deliberately EXCLUDED. The diocese runs an attractive
// $325/week, 8am–5pm, seven-week camp — but it serves age 5 to rising 6th grade
// AT ST. MATTHEW AND ST. PATRICK, not at Charlotte Catholic. Attributing it here
// would put wrap-around childcare on a high school's page that the high school
// does not run. This is also why summer-care-span is a deliberate null.
//
// THE COST PLANNER CARD IS OMITTED, following the Hickory Grove precedent: only
// one of the four camps publishes a price on a school page (and that flyer is a
// 2024 artifact), while baseball pricing lives on a third-party registration
// site and the basketball camp publishes none. Per no-empty-cards the planner is
// left off entirely rather than shipped modeled from one stale figure.
//
// No `photos` band: no genuine photograph of CCHS's own summer camps could be
// sourced, and the design's photo slots never ship empty.

import type { SummerProgram } from '../summerPrograms.ts'

const CAMPS = 'https://www.charlottecatholic.org/community/students/summer-camps'
const BASEBALL =
  'https://www.charlottecatholic.org/athletics/all-sports/baseball/camps-clinics'
const FLYER =
  'https://resources.finalsite.net/images/v1709839178/charlottecatholicorg/iyu7apngmnkk7rl5an1s/2024CougarCampFlyer.pdf'
const HANDBOOK =
  'https://resources.finalsite.net/images/v1753815058/charlottecatholicorg/f73esbbzrom3skvql13w/25-26StudentHandbookFinal.pdf'

export const charlotteCatholic: SummerProgram = {
  catalog: {
    headline:
      'Four sports camps CCHS runs for the surrounding community — for children aged 6 to 13, not for its own high schoolers.',
    subhead:
      'Charlotte Catholic is a 9–12 school. Its summer slate is outreach coaching for younger children in the neighbourhood, plus two non-CCHS programmes it points its own students toward.',
    intro:
      'Every camp below is a half-day athletic camp hosted by a CCHS coaching staff and open to the community. Ages are the campers’ ages, which run well below CCHS’s own 9–12 enrollment. The school runs no academic summer school and no credit recovery — its handbook twice states that a student who fails a course retakes it externally, "at their expense over the summer".',
    categoryFilters: [
      { token: 'all', label: 'All' },
      { token: 'sports', label: 'Sports' },
    ],
    dayFilters: ['Half day'],
    gradeFilters: [
      { token: 'all', label: 'All ages' },
      { token: 'elementary', label: 'Rising 2–5 / ages 6–10' },
      { token: 'middle', label: 'Rising 6–9 / ages 11–13' },
    ],
    camps: [
      {
        name: 'Cougar Basketball Camp',
        desc: 'Girls’ basketball skill development run by the CCHS coaching staff, split into a morning session for younger campers and an afternoon session for older ones.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: ['elementary', 'middle'],
        gradeLabel: 'Rising grades 2–8',
        days: ['Half day'],
        dayLabel: 'June 8–11',
        price: 'Not published',
        hours: 'Rising 2–5: 9:00 AM–12:00 PM · rising 6–8: 1:00 PM–4:00 PM',
      },
      {
        name: 'Eddie Hull Baseball Camp',
        desc: 'Multi-session baseball camp with dynamic warm-ups, baserunning, offensive and defensive station work and age-grouped gameplay. Held at Freedom Park (Dilworth LL Ballfields) rather than on the CCHS campus; campers bring their own lunch.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: ['elementary', 'middle'],
        gradeLabel: 'Ages 6–13',
        days: ['Half day'],
        dayLabel: 'June 2–5 · June 9–12 · July 21–24',
        price: 'Off-site registration',
        hours: '9:00 AM–1:00 PM (check-in 8:45 AM)',
      },
      {
        name: 'Cougar Football Camp',
        desc: 'Youth football fundamentals with the CCHS football staff. The published flyer is a 2024 document that has not been refreshed, so both the price and the dates below are what the school currently publishes rather than a confirmed 2026 slate.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: ['elementary', 'middle'],
        gradeLabel: 'Rising grades 3–9',
        days: ['Half day'],
        dayLabel: 'July',
        price: '$160',
        hours: '8:30–11:30 AM',
        estimated: true,
      },
      {
        name: 'Just4Kicks Soccer',
        desc: 'A soccer camp hosted on the CCHS site. The school lists it without dates, ages, hours or price.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: ['elementary', 'middle'],
        gradeLabel: 'Not published',
        days: ['Half day'],
        dayLabel: 'Not published',
        price: 'Not published',
        hours: 'Not published',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Three of the four camps publish no price on a school page. Eddie Hull Baseball handles fees entirely through a third-party registration site, and the basketball and soccer camps publish none at all — which is why the Cost Planner card is omitted rather than modeled.',
      },
      {
        kind: 'stale',
        text: 'The Cougar Football Camp flyer is a 2024 artifact still linked from the current site; its $160 price and grade range are reproduced as published, not confirmed for 2026.',
      },
      {
        kind: 'verify',
        text: 'The baseball camp page lists its sessions under a 2025 heading. The dates are recorded verbatim as published rather than rolled forward, because a re-typed date would assert a schedule the school has not announced.',
      },
      {
        kind: 'gap',
        text: 'There is no wrap-around or full-day care: every camp is a half-day block of three to four hours. The MACS 8am–5pm summer camp is a different school’s programme (St. Matthew and St. Patrick, age 5 to rising 6th) and is not attributed to CCHS.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — Summer camps', url: CAMPS },
      { label: 'charlottecatholic.org — Baseball camps & clinics', url: BASEBALL },
      { label: 'charlottecatholic.org — 2024 Cougar Camp flyer (PDF)', url: FLYER },
      { label: 'charlottecatholic.org — Student Handbook 2025-2026 (PDF)', url: HANDBOOK },
    ],
  },
}
