// Charlotte Christian School — After School (Extended Day).
//
// Transcribed from source-material/after-school/charlotte-christian/ —
// principally "Charlotte Christian - After School - Redesign Research 2026.md",
// which carries the source URLs.
//
// Two findings shape this entry. First, the rates here are current 2026-27 and
// are 32–52% above the 2024-25 figures the older pricing note carried — that
// note has been marked superseded. Second, Charlotte Christian is the ONLY
// school of the six that publishes an actual timed daily schedule, for both
// divisions, so the 1c rhythm strip is real rather than modeled.
//
// Middle School is priced per HOUR rather than per day, so it cannot live in the
// same days-per-week matrix as Lower School. It is carried in the Cost Planner's
// aside instead, which is exactly what that slot is for.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The timeline spans 2 pm → 6 pm here — Charlotte Christian's earliest dismissal
   is 2:20 — so each hour is 0.25 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 14) / 4

export const charlotteChristian: AfterSchoolProgram = {
  coverage: {
    headline:
      'Lower School is covered to 6:00 p.m. and Middle School only to 5:00 p.m. — a full hour earlier, and one of the sharpest split deadlines in this set.',
    subhead:
      'Two cheap "Bridge Care" tiers exist purely to close the gap between the JK-K bell and the grades 1–4 bell. Upper School has no after-school care at all.',
    hours: ['2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'JK & Kindergarten',
        dismissal: 'dismissal 2:20',
        startFrac: frac(14, 20),
        endFrac: frac(18),
        tiers: [
          { until: '3:15', price: 'Bridge Care $125/mo', endFrac: frac(15, 15) },
          { until: '6:00', price: 'from $125/mo', endFrac: frac(18) },
        ],
      },
      {
        division: 'Grades 1–4',
        dismissal: 'dismissal 2:40',
        startFrac: frac(14, 40),
        endFrac: frac(18),
        tiers: [
          { until: '3:35', price: 'Bridge Care $125/mo', endFrac: frac(15, 35) },
          { until: '6:00', price: 'from $125/mo', endFrac: frac(18) },
        ],
      },
      {
        division: 'Middle School',
        dismissal: 'dismissal 3:00',
        startFrac: frac(15),
        endFrac: frac(17),
        tiers: [],
        flatLabel: 'Extended Day · 3:00–5:00 only · $8/hour',
      },
      {
        division: 'Upper School',
        dismissal: 'dismissal 3:20',
        startFrac: frac(15, 20),
        endFrac: frac(18),
        tiers: [],
        uncovered: true,
        flatLabel: 'No after-school care — athletics and arts only',
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: '**Charlotte Christian Summer Camps** — six weeks, 1 June to 17 July 2026, JK through grade 12. Early Care 8–9 a.m. and After Care 4–5 p.m. at $50/week or $10/day each; lunch bridge care is free for campers doing both a morning and an afternoon camp.',
    },
    facts: [
      {
        label: 'Auto-enrolment',
        text: 'any Lower School student **not picked up by 3:05 p.m. is taken to Extended Day and billed a $50 daily drop-in**',
      },
      {
        label: 'Middle School',
        text: 'every MS student is **automatically registered** — no form, no minimum, welcome any afternoon',
      },
      { label: 'Half days', text: '$25 per day, charged on top of the monthly fee' },
      {
        label: 'Before school',
        text: 'no paid program — students are simply "welcomed on campus at 7:15 a.m."',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No teacher-workday or holiday-break care is published anywhere. On breaks, families are likely on their own.',
      },
      {
        kind: 'verify',
        text: 'The Extended Day page references a 3:15 p.m. middle-school figure, which is the carpool-clearance deadline rather than the bell. The MS packet reconciles it: dismissal 3:00, carpool by 3:15, auto-billed to Extended Day from 3:20.',
      },
    ],
    sources: [
      {
        label: 'charlottechristian.com — Extended Day & After School Clubs',
        url: 'https://www.charlottechristian.com/campus-life/extended-day-after-school-clubs',
      },
      {
        label: 'charlottechristian.com — Admissions FAQs (division hours)',
        url: 'https://www.charlottechristian.com/admissions/faqs',
      },
      {
        label: 'charlottechristian.com — 2026-27 Lower School Extended Day packet (PDF)',
        url: 'https://resources.finalsite.net/images/v1780338464/charlotte/ahr13amhtgtsrxgzpuwt/ExtendedDayPacket.pdf',
      },
      {
        label: 'charlottechristian.com — Summer Camps',
        url: 'https://www.charlottechristian.com/campus-life/summer-camps',
      },
    ],
  },

  cost: {
    headline:
      'Lower School Extended Day is a single flat monthly ladder by days per week — one price to 6:00 p.m., with no pickup-time tiers to choose between.',
    subhead:
      'These are current 2026-27 rates, and they are 32–52% above the 2024-25 packet — the steepest increases landed on the mid-week tiers.',
    basis: 'monthly',
    periods: 9,
    periodsLabel: '9 billing months',
    columnsVerified: [true, true, true, true, true],
    defaultRow: 'ls-6',
    defaultDays: 5,
    rows: [
      {
        id: 'ls-6',
        label: 'JK–Gr 4 · to 6:00',
        panelLabel: 'JK–Grade 4 · to 6:00 pm',
        prices: [125, 175, 245, 295, 325],
      },
      {
        id: 'jkk-bridge',
        label: 'JK–K · Bridge 2:20–3:15',
        panelLabel: 'JK & Kindergarten · Bridge Care, 2:20–3:15 pm',
        /* One published monthly figure that does not vary by days per week —
           the columns repeat it rather than implying five distinct prices. */
        prices: [125, 125, 125, 125, 125],
        flatRate: true,
      },
      {
        id: 'g14-bridge',
        label: 'Gr 1–4 · Bridge 2:40–3:35',
        panelLabel: 'Grades 1–4 · Bridge Care, 2:40–3:35 pm',
        prices: [125, 125, 125, 125, 125],
        flatRate: true,
      },
    ],
    aside: {
      title: 'Middle School is priced by the hour.',
      text: 'Grades 5–8 pay **$8 per hour**, billed monthly on actual attendance, for a 3:00–5:00 p.m. window — no contract and no minimum. The full window five days a week is about **$80/week**. Late pickup starts at 5:01 p.m.',
    },
    fees: [
      { label: 'Registration fee', value: 'none published' },
      { label: 'Daily drop-in (Lower School)', value: '$50 / day' },
      { label: 'Late pickup after 6:01 (LS)', value: '$25 / quarter hr' },
      { label: 'Late pickup after 5:01 (MS)', value: '$25 / quarter hr' },
      { label: 'Half-day early dismissal', value: '$25 / day' },
      { label: 'Third-child discount', value: '25% off lowest rate' },
      {
        label: 'Billed monthly on days attended per week (Lower School) or hourly attendance (Middle School). All changes must be in writing. Bridge Care is a **flat monthly rate** — the days-per-week columns do not vary it.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Rates rose sharply between 2024-25 and 2026-27: **+32% at one day a week, +52% at two, +48% at three, +37% at four and +35% at five**. Budget forward rather than off older figures.',
      },
      {
        kind: 'verify',
        text: 'The **3:05 p.m. auto-billing rule is expensive**: miss the 2:40 carpool by 25 minutes and a $50 drop-in is charged. There is no grace tier between "on time" and a full drop-in day.',
      },
      {
        kind: 'verify',
        text: 'The sibling discount is thin — 25% for the **third** student only, applied to the lowest of the three rates. Two-child families get nothing.',
      },
      {
        kind: 'gap',
        text: 'Bridge Care is published as a flat $125/month without a days-per-week breakdown, so the columns above repeat that one published figure rather than implying five distinct prices.',
      },
    ],
    sources: [
      {
        label: 'charlottechristian.com — 2026-27 Lower School Extended Day packet (PDF)',
        url: 'https://resources.finalsite.net/images/v1780338464/charlotte/ahr13amhtgtsrxgzpuwt/ExtendedDayPacket.pdf',
      },
      {
        label: 'charlottechristian.com — Middle School Extended Day parent information (PDF)',
        url: 'https://resources.finalsite.net/images/v1749660643/charlotte/qoqgaekh4yy1z74sy0m3/MSExtendedDay-ParentInformation1.pdf',
      },
      {
        label: 'charlottechristian.com — Extended Day & After School Clubs',
        url: 'https://www.charlottechristian.com/campus-life/extended-day-after-school-clubs',
      },
    ],
  },

  dayInside: {
    headline:
      'Charlotte Christian is the only school here that publishes an actual timed daily schedule — and it protects a 45-minute homework block in both divisions.',
    subhead:
      'The Middle School program is deliberately cohort-differentiated, "tailored to the developmental needs of our two distinct cohorts — grades 5 and 6, and grades 7 and 8."',
    rhythmTitle: 'The Lower School afternoon, as published',
    rhythm: [
      {
        time: '2:40–3:00',
        name: 'Attendance, snack, play',
        detail: 'Check-in and decompression — families send their own snack',
      },
      {
        time: '3:00–3:45',
        name: 'Outdoors or activity',
        detail: 'Outdoor play or an extracurricular activity',
      },
      {
        time: '3:45–4:30',
        name: 'Homework & reading',
        detail: 'A protected 45-minute work block',
      },
      {
        time: '4:30–6:00',
        name: 'Wind-down',
        detail: 'Recreational reading, free play, craft and special movie days',
      },
    ],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'intellectual',
      'spiritual',
      'social',
      'physical development',
      'organized activities',
      'supervised free time',
    ],
    wordsText:
      '"Through organized activities and supervised free time, the Extended Day program is designed to enrich the intellectual, spiritual, social, and physical development of students." Middle School runs the same shape on a compressed clock — attendance and snack 3:00–3:30, activity 3:30–4:00, homework and reading 4:00–4:30, then free play to 5:00. **Snack is not provided in either program**: "Please send your student with a snack and water bottle." Pickup authorisation is explicit and enforced — "We will not release your child to anyone other than the parents or those authorized," with ID checks early in the year.',
    dayFilters: [],
    gradeFilters: [],
    classes: [],
    flags: [
      {
        kind: 'gap',
        text: 'The after-school club catalog is **deliberately private**: descriptions and registration go out only through the parents’ weekly *Focus* email. The school names the clubs — art, coding, flag football, lacrosse, running, soccer and STEM in Lower School; mountain biking, wrestling, chess, baseball, cheer and esports in Middle School; plus Junior Knights basketball and intramural cheerleading — but publishes **no day, no grade range and no fee** for any of them.',
      },
      {
        kind: 'verify',
        text: 'Clubs run in an "eight-week stretch of both semesters for an additional fee" — two sessions a year, priced separately from Extended Day. The amount of that fee is never stated.',
      },
      {
        kind: 'gap',
        text: 'No staff-to-student ratio and no program capacity are published for either division, and both published schedules are hedged "subject to change as needed".',
      },
    ],
    sources: [
      {
        label: 'charlottechristian.com — 2026-27 Lower School Extended Day packet (PDF)',
        url: 'https://resources.finalsite.net/images/v1780338464/charlotte/ahr13amhtgtsrxgzpuwt/ExtendedDayPacket.pdf',
      },
      {
        label: 'charlottechristian.com — Middle School Extended Day parent information (PDF)',
        url: 'https://resources.finalsite.net/images/v1749660643/charlotte/qoqgaekh4yy1z74sy0m3/MSExtendedDay-ParentInformation1.pdf',
      },
      {
        label: 'charlottechristian.com — Lower School',
        url: 'https://www.charlottechristian.com/academics/lower-school',
      },
      {
        label: 'charlottechristian.com — Extended Day & After School Clubs',
        url: 'https://www.charlottechristian.com/campus-life/extended-day-after-school-clubs',
      },
    ],
  },

  verdict: {
    headline:
      'The most operationally transparent program here — a published schedule, a protected homework block, and a genuinely clever Bridge Care tier — wrapped around rates that have risen very fast.',
    subhead:
      'The two hard edges are the split 5:00/6:00 deadlines between divisions and a club catalog you cannot see until you are already a parent.',
    strengths: [
      '**A published, structured daily rhythm** for both divisions, with a protected 45-minute homework and reading block. No other school in this set publishes its schedule at all.',
      '**Bridge Care is a real cost innovation** — $125/month to bridge the JK-K 2:20 bell to the grades 1–4 bell, instead of forcing a family onto a full $325 plan.',
      '**Middle School is pay-as-you-go at $8/hour with automatic registration** — no commitment, no form, no minimum. For occasional users this is far friendlier than a monthly tier.',
      '**The MS program is cohort-differentiated** between grades 5–6 and 7–8 — a real developmental consideration, since 8th and 5th graders in one room is a common failure mode.',
      '**Coverage to 6:00 p.m. for JK–4** is among the later end times in this market, and it is a hard, clearly stated cutoff.',
      '**Explicit, enforced pickup authorisation** with ID checks early in the year.',
      '**A deep summer bench** — roughly 100 distinct camps across six weeks, JK–12, including an Orton-Gillingham literacy intervention.',
    ],
    watchouts: [
      '**Rates jumped 32–52% in two years**, with the steepest rises on the mid-week tiers. Do not budget off older figures.',
      '**The 3:05 p.m. auto-billing rule is punitive** — 25 minutes late off the 2:40 bell costs a $50 drop-in, with no grace tier.',
      '**Middle School ends at 5:00 p.m., a full hour before Lower School.** A family with a 3rd grader and a 6th grader manages two different hard deadlines, and the MS late fee starts at 5:01.',
      '**No Upper School after-school care at all** — grades 9–12 dismiss at 3:20 with athletics, arts, or nothing.',
      '**Snack is not provided** in either program, unlike most peers here.',
      '**The sibling discount is thin** — third child only, on the lowest rate. Two-child families get nothing.',
      '**Club fees are invisible before enrolment.** You cannot price the 8-week club sessions without already receiving the parent Focus email.',
      '**Half days cost an extra $25**, so the monthly figure is a floor rather than a ceiling — and no teacher-workday or holiday care is published at all.',
    ],
    checklist: [
      'What do the 8-week after-school clubs actually cost, and can I see the current catalog with days of the week and grade ranges?',
      'Is there any care on teacher workdays and during holiday breaks, or should I plan for full coverage gaps?',
      'What is the staff-to-student ratio in Extended Day, and are staff Charlotte Christian teachers or outside hires?',
      'What is the actual capacity of Extended Day — is there ever a waitlist?',
      'Is the 3:05 auto-drop-in rule enforced strictly, and is there any grace period?',
      'Can I switch tiers mid-year, and is there proration when we do?',
      'Is there any before-school care beyond free 7:15 a.m. campus access?',
      'How much homework actually gets finished in the 45-minute block — is there active help, or is it supervision only?',
      'For Middle School: how are the 5–6 and 7–8 cohorts physically separated, and what happens between 5:00 p.m. and a later pickup?',
      'Does Extended Day run on early-dismissal days automatically, or must we opt in for the $25?',
    ],
    flags: [],
    sources: [
      {
        label: 'charlottechristian.com — Extended Day & After School Clubs',
        url: 'https://www.charlottechristian.com/campus-life/extended-day-after-school-clubs',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
