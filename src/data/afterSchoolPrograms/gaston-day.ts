// Gaston Day School — After School research area.
//
// Every figure is traceable to source-material/after-school/gaston-day/ —
// "Gaston Day School - After School - Program Hours and Rates 2026.md".
//
// The 2026-27 Schedule of Tuition and Fees PDF and the /afterschoolprogram/ page
// agree (re-read 2026-11-22, plan consistency4): Lower School care 3:00–5:30 at
// $100/week, Middle School care 3:15–5:30 at $60/week, billed monthly by the
// Finance Office. Drop-in is $30/day LS and $15/day MS. The 2025-26 schedule's
// $95 / $55 and 6:00 close are superseded.
//
// THREE of four cards render. `dayInside`'s enrichment catalog is omitted —
// the fee schedule names planned enrichment subjects but no classes, and the
// page says "coming soon", so a catalog block would be an empty shell.

import type { AfterSchoolProgram } from '../afterSchool.ts'

const PAGE = 'https://www.gastonday.org/afterschoolprogram/'
const FEES =
  'https://www.gastonday.org/wp-content/uploads/2026/01/2627-GDS-Tuition-and-Fees.pdf'

export const gastonDay: AfterSchoolProgram = {
  /* --------------------------------------------------------- 4a coverage -- */
  coverage: {
    headline:
      'Care runs to 5:30 pm for Pre-K through 8th grade. The Lower School tier starts at 3:00 and the Middle School tier at 3:15.',
    subhead:
      'Both tiers end at 5:30. The school publishes one afternoon schedule, starting at 3:15.',
    hours: ['3 pm', '3:30', '4 pm', '4:30', '5 pm', '5:30'],
    basisNote:
      'Prices shown are the published WEEKLY rates from the school’s 2026–27 Schedule of Tuition and Fees. They assume regular enrollment, and the Finance Office bills them monthly. Drop-in is priced per day instead and is listed in the facts below.',
    rows: [
      {
        division: 'Lower School',
        dismissal: 'PS–4th · care from 3:00',
        startFrac: 0,
        endFrac: 1,
        tiers: [],
        flatLabel: 'After School Care · $100/week or $30/day',
      },
      {
        division: 'Middle School',
        dismissal: '5th–8th · care from 3:15',
        startFrac: 0.1,
        endFrac: 1,
        tiers: [],
        flatLabel: 'After School Care · $60/week or $15/day',
      },
      {
        division: 'Upper School',
        dismissal: '9th–12th',
        startFrac: 0,
        endFrac: 1,
        tiers: [],
        uncovered: true,
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: 'Summer care is a separate program with its own published rates — Camp Spartan full and half days plus before-camp care from 7:45 am and after-camp care to 5:00 pm. See the Summer Programs area.',
    },
    facts: [
      {
        label: 'Drop-in',
        text: 'Available without weekly enrollment at **$30/day** (Lower School) and **$15/day** (Middle School). An **Extended Day Drop-In Fee of $25** also appears on the fee schedule. For half-day Preschool and Pre-K it is $25 a day or $120 a week.',
      },
      {
        label: 'Late pickup',
        text: '**$10 for the first 5 minutes**, then **$5 per additional 5-minute increment**. Pickup is from the front carpool line.',
      },
      {
        label: 'Registration',
        text: 'Through the **Popsicle** app — the same platform the summer camps use. Registration is free and takes five minutes or less.',
      },
      {
        label: 'Staff contacts',
        text: '**Letty Jimenez** (980.502.5817, Ljimenez@gastonday.org) and **Julie Dellibovi** (jdellibovi@gastonday.org).',
      },
      {
        label: 'Music lessons interlock',
        text: 'Middle School students waiting for a music lesson (**$35 per 30-minute lesson**) may work on homework in aftercare **at no charge**.',
      },
      {
        label: 'No Upper School care',
        text: 'The program covers **Pre-K through 8th grade only**. No after-school care is published for grades 9–12, which is common but worth stating.',
      },
    ],
    flags: [],
    sources: [
      { label: 'gastonday.org — Schedule of Tuition and Fees 2026-2027 (rates, 3:00–5:30 / 3:15–5:30 windows)', url: FEES },
      { label: 'gastonday.org — After School Program (weekly rates, monthly billing, 5:30 pickup, daily schedule, late fees, registration)', url: PAGE },
    ],
  },

  /* ------------------------------------------------------------- 4b cost -- */
  cost: {
    headline:
      'Aftercare costs $100 a week for the Lower School and $60 for the Middle School.',
    subhead:
      'A full school year of five-day Lower School care comes to roughly $3,600 across 36 weeks — before any drop-in days or late fees.',
    basis: 'weekly',
    periods: 36,
    periodsLabel: '36 school weeks',
    columnsVerified: [true, true, true, true, true],
    rows: [
      {
        id: 'ls-week',
        label: 'Lower School · PS–4th',
        panelLabel: 'Lower School · PS–4th · weekly enrollment',
        prices: [100, 100, 100, 100, 100],
        flatRate: true,
      },
      {
        id: 'ms-week',
        label: 'Middle School · 5th–8th',
        panelLabel: 'Middle School · 5th–8th · weekly enrollment',
        prices: [60, 60, 60, 60, 60],
        flatRate: true,
      },
      {
        id: 'ls-drop',
        label: 'Lower School · drop-in',
        panelLabel: 'Lower School · drop-in, per day',
        prices: [30, 60, 90, 120, 150],
      },
      {
        id: 'ms-drop',
        label: 'Middle School · drop-in',
        panelLabel: 'Middle School · drop-in, per day',
        prices: [15, 30, 45, 60, 75],
      },
    ],
    defaultRow: 'ls-week',
    defaultDays: 5,
    aside: {
      title: 'The weekly rate is flat, so it does not scale with days',
      text: 'The published $100 and $60 figures are weekly enrollment rates. They stay the same however many afternoons a child attends, which is why those two rows show the same price in every column. Drop-in is the option whose cost grows with use. At Lower School rates, drop-in costs less than weekly enrollment up to three days a week ($90 vs $100). From four days, it costs more ($120 vs $100).',
    },
    fees: [
      { label: 'Lower School · weekly enrollment', value: '$100/week' },
      { label: 'Lower School · drop-in', value: '$30/day' },
      { label: 'Middle School · weekly enrollment', value: '$60/week' },
      { label: 'Middle School · drop-in', value: '$15/day' },
      { label: 'Extended Day Drop-In Fee', value: '$25' },
      { label: 'Music lessons, 30 minutes', value: '$35/lesson' },
      { label: 'Late pickup — first 5 minutes', value: '$10' },
      { label: 'Late pickup — each further 5 minutes', value: '$5' },
      {
        label:
          'This page assumes a 36-week school year so schools can be compared. Gaston Day does not publish that figure. Registration is free. The school states no annual aftercare total, no sibling discount and no refund terms for the program.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Re-read 2026-11-22: the page and the 2026-27 schedule both give $100 and $60 a week, billed monthly. The 36-week multiplier is our assumption.',
      },
      {
        kind: 'gap',
        text: 'Registration is free. No sibling discount, financial-aid pathway or annual cap is published for aftercare specifically.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Schedule of Tuition and Fees 2026-2027 (all rates above)', url: FEES },
      { label: 'gastonday.org — After School Program (drop-in and late-pickup policy)', url: PAGE },
    ],
  },

  /* -------------------------------------------------------- 4c dayInside -- */
  dayInside: {
    headline:
      'A published minute-by-minute afternoon: choice time, then snack and homework by grade level, then a STEAM group activity, then choice time again.',
    subhead:
      'Unusually, Gaston Day prints the actual clock rather than describing the program in general terms.',
    rhythmTitle: 'The published afternoon',
    rhythm: [
      {
        time: '3:15',
        name: 'Relax / Choice Time',
        detail: 'Playground, games and socializing as students arrive from Lower School dismissal.',
      },
      {
        time: '4:00',
        name: 'Snack & homework',
        detail: 'Separated by grade level. Snack is distributed around 4:15; students may bring their own in addition.',
      },
      {
        time: '4:25',
        name: 'Whole-group activity',
        detail: 'Emphasizing STEAM and collaboration — the one structured, all-together block of the afternoon.',
      },
      {
        time: '4:55',
        name: 'Choice time',
        detail: 'Free choice until pickup. Tech activities are available on Fridays only.',
      },
    ],
    wordsTitle: 'In the school’s own words',
    words: [
      'Relax/Choice Time',
      'STEAM',
      'collaboration',
      'homework help',
      'snack',
      'grade-level groups',
    ],
    wordsText:
      'The school frames the afternoon as play first, then structure. First: students arrive to unstructured play. Then they move into a separate homework and snack time, come together for a STEAM-and-collaboration block, and return to their own choice of activity. Middle School students waiting for music lessons may work on homework at no charge. That arrangement is the one stated link with another school program.',
    catalogTitle: 'Enrichment classes',
    catalogIntro:
      'The school’s page lists enrichment programs as **“coming soon”**. Its 2026–27 fee schedule names planned programs: dance, art and painting, cheer, running (Speedy Spartans), sports (volleyball and basketball), and science and nature. It says details will be sent home during the year.',
    dayFilters: [],
    gradeFilters: [],
    classes: [],
    flags: [
      {
        kind: 'gap',
        text: 'The school names planned enrichment subjects but publishes no classes, days, grades or fees, so there is no catalog yet.',
      },
      {
        kind: 'verify',
        text: 'The page’s rhythm starts at 3:15. The 2026-27 fee schedule starts Lower School care at 3:00, and the page does not describe that first 15 minutes.',
      },
      {
        kind: 'gap',
        text: 'No staff-to-child ratio, capacity, or policy for early-dismissal and teacher-workday coverage is published.',
      },
    ],
    sources: [
      { label: 'gastonday.org — After School Program (the full afternoon schedule, snack, homework, tech Fridays)', url: PAGE },
      { label: 'gastonday.org — Schedule of Tuition and Fees 2026-2027 (music lessons, care windows, planned enrichment)', url: FEES },
    ],
  },

  /* ---------------------------------------------------------- 4d verdict -- */
  verdict: {
    headline:
      'Priced and scheduled in detail, with a structured afternoon that ends at 5:30.',
    subhead:
      'A family that needs care after 5:30 will need another plan.',
    strengthsTitle: 'What holds up',
    strengths: [
      '**The price is published.** $100/week for Lower School and $60/week for Middle School, with drop-in at $30 and $15. Registration is free.',
      '**The afternoon is published minute by minute.** Four named blocks with times, rather than a general description of "supervision and activities".',
      '**Homework is a scheduled block, not an afterthought** — 4:00–4:25, separated by grade level, with snack alongside.',
      '**There is a structured group activity every day** built around STEAM and collaboration, so the afternoon is not purely custodial.',
      '**Coverage spans Pre-K through 8th grade** in two tiers, both running to 5:30 pm.',
      '**It interlocks with music lessons**, letting Middle School students do homework free while waiting.',
    ],
    watchoutsTitle: 'What to check',
    watchouts: [
      '**Pickup is by 5:30.** Neither division has a later option on the fee schedule.',
      '**The rate is weekly, but the bill is monthly.** The Finance Office bills care monthly. The school publishes no total for the year.',
      '**Enrichment is still "coming soon"** on the program page. The fee schedule names planned subjects, with no days or fees.',
      '**No Upper School care.** Grades 9–12 have no published after-school program.',
      '**Late fees start fast** — $10 within the first five minutes, then $5 per five minutes.',
      '**Nothing published on ratios or capacity**, so there is no way to know how many children one adult supervises.',
    ],
    checklist: [
      'Is any care offered after 5:30?',
      'How many weeks are billed in a school year, and what is the annual cost for five days?',
      'What is the staff-to-child ratio, and how many children are typically in the room by 5 pm?',
      'When will enrichment classes start, what will they cost, and are they inside the base rate?',
      'Does aftercare run on early-dismissal days, teacher workdays and exam days?',
      'Is there any financial aid for aftercare, as there is for tuition, or a sibling discount?',
      'How is the 5th–8th grade tier supervised differently from the Pre-K–4th tier?',
    ],
    flags: [],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
