// Charlotte Preparatory School — Summer Programs ("Summer Adventures at Prep").
//
// Transcribed from source-material/summer-programs/charlotte-prep/ — the
// school's own 12-page Summer Adventures 2026 brochure (Issuu, uploaded
// 2025-12-12) and the registration form as archived by Wayback on 2026-02-26.
// The live summer pages now 404 and no 2027 programme is posted anywhere, so
// EVERYTHING HERE DESCRIBES SUMMER 2026 and the headline says so.
//
// TWO SOURCES, TWO PRICE SETS. The brochure and the registration form disagree
// in several cells. The form's Traditional Camp weeks 3–7 are exactly the
// brochure minus $25 — the published early-bird saving ("$25 savings per week
// now through January 15, 2026") — but two form cells are HIGHER than the
// brochure, so the form is not simply an early-bird copy. The brochure is the
// school's regular price list and is what the planner uses; the form's figures
// are stated in a fee note rather than averaged or silently dropped.
//
// Grade tokens: 'pk' covers the Early School's Primary and TK campers (Young
// Adventurers), 'mk' is Montessori Kindergarten, then k and 1–8.

import type { SummerProgram } from '../summerPrograms.ts'

const BROCHURE = 'https://issuu.com/charlottepreparatoryschool/docs/summer_adventures_2026'
const FORM =
  'https://web.archive.org/web/20260226113337/https://charlotteprep.org/community/summer-camp-registration'
const LANDING =
  'https://web.archive.org/web/20260226113216/https://charlotteprep.org/community/summer-camp/summer-camp-brochure'
const NIKE = 'https://www.ussportscamps.com/soccer/nike/nike-soccer-camp-charlotte-prep-school'

const MK_8 = ['mk', 'k', '1', '2', '3', '4', '5', '6', '7', '8']
const K_8 = ['k', '1', '2', '3', '4', '5', '6', '7', '8']

export const charlottePrep: SummerProgram = {
  catalog: {
    headline:
      'Summer 2026 ran seven weeks, June 8 to July 31, for campers from the Early School through 8th grade — a traditional day camp plus a specialty or sports camp almost every week.',
    subhead:
      'Full days ran 9:00 a.m.–4:00 p.m., half days 9:00 a.m.–12:00 p.m. or 1:00–4:00 p.m. Camp was closed June 19 and the whole week of June 29–July 3, so June 15–18 was the one four-day week. Lunch was included for full-day campers.',
    categoryFilters: [
      { token: 'All', label: 'All' },
      { token: 'day', label: 'Day camp' },
      { token: 'specialty', label: 'Specialty' },
      { token: 'sports', label: 'Sports' },
      { token: 'academic', label: 'Tutoring' },
      { token: 'leadership', label: 'Junior Counselor' },
    ],
    dayFilters: [],
    gradeFilters: [
      { token: 'All', label: 'All' },
      { token: 'pk', label: 'Primary / TK' },
      { token: 'mk', label: 'Montessori K' },
      { token: 'k', label: 'K' },
      { token: '1', label: '1' },
      { token: '2', label: '2' },
      { token: '3', label: '3' },
      { token: '4', label: '4' },
      { token: '5', label: '5' },
      { token: '6', label: '6' },
      { token: '7', label: '7' },
      { token: '8', label: '8' },
    ],
    camps: [
      /* -------------------------------------------------- all seven weeks -- */
      {
        name: 'Young Adventurers',
        desc: 'The Early School camp: water days, nature walks, arts and crafts, field trips and nap time.',
        category: 'day',
        categoryLabel: 'Day camp',
        grades: ['pk'],
        gradeLabel: 'Rising Primary & TK',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$500 full · $250 half',
        hours: '9:00–4:00 or half day',
        weeks: 'All 7 weeks',
      },
      {
        name: 'Traditional Camp',
        desc: 'The core day camp: games, crafts, off-campus field trips, karaoke and snow cones. The brochure says rising MK–8; the registration form says K–7.',
        category: 'day',
        categoryLabel: 'Day camp',
        grades: MK_8,
        gradeLabel: 'Rising MK–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$525 full · $275 half',
        hours: '9:00–4:00 or half day',
        weeks: 'All 7 weeks',
      },
      {
        name: 'Junior Counselor',
        desc: 'For rising or graduated 8th graders. "Limited spots available and these positions may require an interview."',
        category: 'leadership',
        categoryLabel: 'Junior Counselor',
        grades: ['8'],
        gradeLabel: 'Rising or graduated 8th',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$300/week',
        hours: '9:00–4:00',
        weeks: 'All 7 weeks',
      },
      {
        name: 'Midsummer Tune-Up tutoring',
        desc: 'An add-on for Traditional campers, taught by Charlotte Prep teachers in "small groups of 6 or less": literacy, math and social-skills sessions for rising MK–2 (Mon–Wed), reading and writing, math and critical-thinking sessions for rising 3–5 (Thu–Fri).',
        category: 'academic',
        categoryLabel: 'Tutoring',
        grades: ['mk', 'k', '1', '2', '3', '4', '5'],
        gradeLabel: 'Rising MK–5',
        days: [],
        dayLabel: 'Mon–Wed or Thu–Fri',
        price: '$60/session · $150 for all 3',
        hours: '50-minute sessions, 9:00–11:50',
      },
      /* ------------------------------------------------- specialty camps -- */
      {
        name: 'Art Explorers Workshop',
        desc: 'A full-day art camp.',
        category: 'specialty',
        categoryLabel: 'Specialty',
        grades: MK_8,
        gradeLabel: 'Rising MK–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$600',
        hours: '9:00–4:00',
        weeks: 'June 8–12',
      },
      {
        name: 'Rhythm & Beats Music',
        desc: 'A full-day music camp.',
        category: 'specialty',
        categoryLabel: 'Specialty',
        grades: MK_8,
        gradeLabel: 'Rising MK–8',
        days: [],
        dayLabel: 'Mon–Thu',
        price: '$500',
        hours: '9:00–4:00',
        weeks: 'June 15–18',
      },
      {
        name: 'Broadway Bound Juniors',
        desc: 'A full-day musical-theatre camp. The registration form lists it at $525.',
        category: 'specialty',
        categoryLabel: 'Specialty',
        grades: MK_8,
        gradeLabel: 'Rising MK–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$550',
        hours: '9:00–4:00',
        weeks: 'June 22–26',
      },
      {
        name: 'GameMakers Coding Camp',
        desc: 'A full-day coding camp for the older grades.',
        category: 'specialty',
        categoryLabel: 'Specialty',
        grades: ['2', '3', '4', '5', '6', '7', '8'],
        gradeLabel: 'Rising 2–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$550',
        hours: '9:00–4:00',
        weeks: 'July 6–10',
      },
      {
        name: 'Master Makers: LEGO Engineering',
        desc: 'A full-day LEGO engineering camp, listed in the brochure but not on the registration form.',
        category: 'specialty',
        categoryLabel: 'Specialty',
        grades: ['mk', 'k', '1', '2', '3', '4', '5'],
        gradeLabel: 'Rising MK–5',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$550',
        hours: '9:00–4:00',
        weeks: 'July 13–17',
      },
      {
        name: 'Quantum Creators Camp',
        desc: 'A full-day STEM camp.',
        category: 'specialty',
        categoryLabel: 'Specialty',
        grades: ['2', '3', '4', '5', '6'],
        gradeLabel: 'Rising 2–6',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$550',
        hours: '9:00–4:00',
        weeks: 'July 20–24',
      },
      {
        name: 'Junior Gourmet Cooking Lab',
        desc: 'A full-day cooking camp.',
        category: 'specialty',
        categoryLabel: 'Specialty',
        grades: MK_8,
        gradeLabel: 'Rising MK–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$600',
        hours: '9:00–4:00',
        weeks: 'July 27–31',
      },
      /* --------------------------------------------- athletic adventurers -- */
      {
        name: 'Amazing Athletes',
        desc: 'A full-day multi-sport camp.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: K_8,
        gradeLabel: 'K–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$500',
        hours: '9:00–4:00',
        weeks: 'June 8–12',
      },
      {
        name: 'Kidokinetics',
        desc: 'A full-day sports camp that runs twice — $400 in the four-day week, $500 in July.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: K_8,
        gradeLabel: 'K–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$400 · $500',
        hours: '9:00–4:00',
        weeks: 'June 15–18 and July 13–17',
      },
      {
        name: 'Basketball',
        desc: 'A full-day basketball camp.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: K_8,
        gradeLabel: 'K–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$500',
        hours: '9:00–4:00',
        weeks: 'July 6–10',
      },
      {
        name: 'Volleyball',
        desc: 'A full-day volleyball camp.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: K_8,
        gradeLabel: 'K–8',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$500',
        hours: '9:00–4:00',
        weeks: 'July 20–24',
      },
      {
        name: 'Nike Soccer Camp',
        desc: 'Run on campus by a third party, US Sports Camps, and registered on its own site, for ages 6–13. Lunch is not included.',
        category: 'sports',
        categoryLabel: 'Sports',
        grades: ['1', '2', '3', '4', '5', '6', '7'],
        gradeLabel: 'Ages 6–13',
        days: [],
        dayLabel: 'Mon–Fri',
        price: '$299 half · $429 full',
        hours: '9:00–12:00 or 9:00–3:00',
        weeks: 'June 22–26 and July 27–31',
      },
    ],
    flags: [],
    sources: [
      { label: 'Summer Adventures 2026 brochure (Issuu, 12 pages)', url: BROCHURE },
      { label: 'charlotteprep.org — summer camp registration (archived Feb 26 2026)', url: FORM },
      { label: 'charlotteprep.org — summer camp brochure page (archived Feb 26 2026)', url: LANDING },
      { label: 'US Sports Camps — Nike Soccer Camp at Charlotte Prep', url: NIKE },
    ],
  },

  costPlanner: {
    headline:
      'Summer 2026 priced by the week: $525 for a full day of Traditional Camp, $500 for the Early School camp, and $500–$600 for a specialty or sports week.',
    subhead:
      'Lunch was included for full-day campers, and before- and after-care were sold by the week. Payment was due in full at registration.',
    maxWeeks: 7,
    defaultWeeks: 3,
    defaultTier: 'traditional-full',
    tiers: [
      {
        id: 'traditional-full',
        label: 'Traditional Camp, full day',
        panelLabel: 'Traditional Camp · 9:00 a.m.–4:00 p.m.',
        price: 525,
        detail: '$420 in the four-day week of June 15–18.',
      },
      {
        id: 'traditional-half',
        label: 'Traditional Camp, half day',
        panelLabel: 'Traditional Camp · half day',
        price: 275,
        detail: '$175 in the four-day week.',
      },
      {
        id: 'ya-full',
        label: 'Young Adventurers, full day',
        panelLabel: 'Young Adventurers (Primary & TK) · full day',
        price: 500,
        detail: '$400 in the four-day week.',
      },
      {
        id: 'ya-half',
        label: 'Young Adventurers, half day',
        panelLabel: 'Young Adventurers (Primary & TK) · half day',
        price: 250,
        detail: '$200 in the four-day week.',
      },
      {
        id: 'specialty-600',
        label: 'Specialty camp, $600 band',
        panelLabel: 'Specialty camp · $600',
        price: 600,
        detail: 'Art Explorers Workshop and Junior Gourmet Cooking Lab.',
      },
      {
        id: 'specialty-550',
        label: 'Specialty camp, $550 band',
        panelLabel: 'Specialty camp · $550',
        price: 550,
        detail: 'Broadway Bound Juniors, GameMakers Coding, LEGO Engineering and Quantum Creators.',
      },
      {
        id: 'sports-500',
        label: 'Sports or music camp',
        panelLabel: 'Sports / Rhythm & Beats · $500',
        price: 500,
        detail: 'Amazing Athletes, Basketball, Volleyball, Kidokinetics (July) and Rhythm & Beats.',
      },
      {
        id: 'junior-counselor',
        label: 'Junior Counselor',
        panelLabel: 'Junior Counselor · rising or graduated 8th',
        price: 300,
        detail: '$300 every week, including the four-day week.',
      },
    ],
    addons: [
      { id: 'before', label: 'Before Care 8:00–9:00 a.m.', price: 60 },
      { id: 'after', label: 'After Care 4:00–5:00 p.m.', price: 60 },
      { id: 'tutoring', label: 'Midsummer Tune-Up, one session', price: 60 },
    ],
    fees: [
      {
        label:
          '**Before and After Care together are $110/week** — $10 less than the two toggles added up. In the four-day week each is $55, or $100 for both.',
        note: true,
      },
      {
        label:
          '**Midsummer Tune-Up tutoring is $60 per session per week, or $150 for all three** — the toggle prices one session.',
        note: true,
      },
      {
        label:
          '**Early bird: "$25 savings per week now through January 15, 2026."** The registration form showed several prices $25 below the brochure, consistent with that saving, but two of its cells were higher than the brochure, so the brochure is used here as the regular price list.',
        note: true,
      },
      {
        label:
          '**Refunds:** "Refunds are available up to two weeks before camp starts. A refund fee of $150 will apply per camper."',
        note: true,
      },
      {
        label:
          '**Nike Soccer Camp is booked and paid separately** through US Sports Camps ($299 half day, $429 full day) and does not include lunch.',
        note: true,
      },
    ],
    aside: {
      title: 'Payment is due at registration.',
      text: 'Registration for summer 2026 ran on the school\'s own web form, paid by card, and closed Friday, May 29, 2026. Children in the school-year Extended-Day Program were not enrolled automatically — they had to be registered for camp like everyone else. No summer 2027 programme has been posted yet.',
    },
    flags: [],
    sources: [
      { label: 'Summer Adventures 2026 brochure (Issuu, 12 pages)', url: BROCHURE },
      { label: 'charlotteprep.org — summer camp registration (archived Feb 26 2026)', url: FORM },
    ],
  },
}
