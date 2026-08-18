// Gaston Day School — After School research area.
//
// Every figure is traceable to source-material/after-school/gaston-day/ —
// "Gaston Day School - After School - Program Hours and Rates 2026.md".
//
// ⚠️ TWO SOURCES DISAGREE, and the disagreement is surfaced rather than resolved
// silently. The school's own SCHEDULE OF TUITION AND FEES 2025-2026 PDF states
// Lower School care 3:00–6:00 at $95/week and Middle School care 4:00–6:00 at
// $55/week. The /afterschoolprogram/ web page states 3:15–5:30 for both, at
// "$100/month" and "$60/month". The DROP-IN rates agree exactly across both
// sources ($30/day LS, $15/day MS), which is what makes the recurring-rate
// mismatch legible as a labelling problem: $100/month for daily aftercare would
// price a whole month below four days of the same page's own drop-in rate.
//
// Resolution used here, stated on the card:
//   - RATES come from the tuition schedule (the signed fee document families are
//     billed against) — so `basis: 'weekly'` semantics, expressed through the
//     planner as a weekly figure.
//   - The OPERATING WINDOW comes from the web page for the day-inside rhythm
//     (an in-year hours change is likelier to reach a page than a fee PDF),
//     while the Compare row's `latest-pickup` uses the fee schedule's 6:00 PM.
// Both figures are shown; neither is quietly dropped.
//
// THREE of four cards render. `dayInside`'s enrichment catalog is omitted —
// the school lists enrichment as "coming soon", so there are zero classes to
// list and a catalog block would be an empty shell.

import type { AfterSchoolProgram } from '../afterSchool.ts'

const PAGE = 'https://www.gastonday.org/afterschoolprogram/'
const FEES =
  'https://www.gastonday.org/wp-content/uploads/2025/01/SCHEDULE-OF-TUITION-FEES-2025-2026.pdf'

export const gastonDay: AfterSchoolProgram = {
  /* --------------------------------------------------------- 4a coverage -- */
  coverage: {
    headline:
      'Care runs to 6:00 pm for Pre-K through 8th grade, split into a Lower School tier from 3:00 and a Middle School tier from 4:00.',
    subhead:
      'Both tiers land in the same room by mid-afternoon; the difference is when each division’s day ends, not what the programme offers.',
    hours: ['3 pm', '3:30', '4 pm', '4:30', '5 pm', '5:30', '6 pm'],
    basisNote:
      'Prices shown are the published WEEKLY rates from the school’s 2025-26 Schedule of Tuition and Fees, which assume regular enrolment; the drop-in alternative is billed per day and is listed in the facts below. See the flags below — the programme web page labels near-identical figures as monthly.',
    rows: [
      {
        division: 'Lower School',
        dismissal: 'PS–4th · dismissal 3:00',
        startFrac: 0,
        endFrac: 1,
        tiers: [],
        flatLabel: 'After School Care · $95/week or $30/day',
      },
      {
        division: 'Middle School',
        dismissal: '5th–8th · dismissal 4:00',
        startFrac: 0.333,
        endFrac: 1,
        tiers: [],
        flatLabel: 'After School Care · $55/week or $15/day',
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
      text: 'Summer care is a separate programme with its own published rates — Camp Spartan full and half days plus before-camp care from 7:45 am and after-camp care to 5:00 pm. See the Summer Programs area.',
    },
    facts: [
      {
        label: 'Drop-in',
        text: 'Available without weekly enrolment at **$30/day** (Lower School) and **$15/day** (Middle School). An **Extended Day Drop-In Fee of $25** also appears on the fee schedule.',
      },
      {
        label: 'Late pickup',
        text: '**$10 for the first 5 minutes**, then **$5 per additional 5-minute increment**. Pickup is from the front carpool line.',
      },
      {
        label: 'Registration',
        text: 'Through the **Popsicle** app — the same platform the summer camps use. Registration is free and stated as taking under five minutes.',
      },
      {
        label: 'Staff contacts',
        text: '**Letty Jimenez** (980.502.5817) and **Traci Harbin**.',
      },
      {
        label: 'Music lessons interlock',
        text: 'Middle School students waiting for a music lesson (**$35/lesson**) may work on homework in aftercare **at no charge**.',
      },
      {
        label: 'No Upper School care',
        text: 'The programme covers **Pre-K through 8th grade only**. No after-school care is published for grades 9–12, which is normal on this roster but worth stating.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The programme page says **3:15–5:30 pm** for both divisions; the 2025-26 fee schedule says **3:00–6:00** (Lower School) and **4:00–6:00** (Middle School). Both are shown here: the fee schedule sets the rates and the Compare row’s 6:00 pm latest pickup, the page sets the afternoon rhythm. A family should confirm the current window at enrolment.',
      },
      {
        kind: 'verify',
        text: 'The page prices weekly enrolment at **$100/month** (LS) and **$60/month** (MS); the fee schedule says **$95/week** and **$55/week**. The drop-in rates ($30/day, $15/day) are identical in both. The per-week reading is used, since a monthly rate below four drop-in days is not economically coherent.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Schedule of Tuition and Fees 2025-2026 (rates, 3:00–6:00 / 4:00–6:00 windows)', url: FEES },
      { label: 'gastonday.org — After School Program (3:15–5:30 window, daily schedule, late fees, registration)', url: PAGE },
    ],
  },

  /* ------------------------------------------------------------- 4b cost -- */
  cost: {
    headline:
      'At $95 a week for the Lower School and $55 for the Middle School, this is among the least expensive aftercare on the roster.',
    subhead:
      'A full school year of five-day Lower School care comes to roughly $3,420 across 36 weeks — before any drop-in days or late fees.',
    basis: 'monthly',
    periods: 36,
    periodsLabel: '36 school weeks',
    columnsVerified: [true, true, true, true, true],
    rows: [
      {
        id: 'ls-week',
        label: 'Lower School · PS–4th',
        panelLabel: 'Lower School · PS–4th · weekly enrolment',
        prices: [95, 95, 95, 95, 95],
        flatRate: true,
      },
      {
        id: 'ms-week',
        label: 'Middle School · 5th–8th',
        panelLabel: 'Middle School · 5th–8th · weekly enrolment',
        prices: [55, 55, 55, 55, 55],
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
      text: 'The published $95 and $55 figures are weekly enrolment rates that do not vary by how many afternoons a child attends — which is why those two rows show the same price in every column. Drop-in is the alternative that scales: at Lower School rates, drop-in beats weekly enrolment up to three days a week ($90 vs $95) and loses from four ($120 vs $95).',
    },
    fees: [
      { label: 'Lower School · weekly enrolment', value: '$95/week' },
      { label: 'Lower School · drop-in', value: '$30/day' },
      { label: 'Middle School · weekly enrolment', value: '$55/week' },
      { label: 'Middle School · drop-in', value: '$15/day' },
      { label: 'Extended Day Drop-In Fee', value: '$25' },
      { label: 'Music lessons', value: '$35/lesson' },
      { label: 'Late pickup — first 5 minutes', value: '$10' },
      { label: 'Late pickup — each further 5 minutes', value: '$5' },
      {
        label:
          'The 36-week year is this project’s standard planning assumption for comparability across schools, not a figure Gaston Day publishes. The school states no annual aftercare total, no registration fee, no sibling discount and no tuition-insurance terms for the programme.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The programme page labels these same figures as **$100/month** and **$60/month**. The weekly reading from the official fee schedule is used — see the Coverage card’s flag for why.',
      },
      {
        kind: 'gap',
        text: 'No registration fee, sibling discount, financial-aid pathway or annual cap is published for aftercare specifically.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Schedule of Tuition and Fees 2025-2026 (all rates above)', url: FEES },
      { label: 'gastonday.org — After School Program (drop-in and late-pickup policy)', url: PAGE },
    ],
  },

  /* -------------------------------------------------------- 4c dayInside -- */
  dayInside: {
    headline:
      'A published minute-by-minute afternoon: choice time, then snack and homework by grade level, then a STEAM group activity, then choice time again.',
    subhead:
      'Unusually for this roster, Gaston Day prints the actual clock rather than describing the programme in general terms.',
    rhythmTitle: 'The published afternoon',
    rhythm: [
      {
        time: '3:15',
        name: 'Relax / Choice Time',
        detail: 'Playground, games and socialising as students arrive from Lower School dismissal.',
      },
      {
        time: '4:00',
        name: 'Snack & homework',
        detail: 'Separated by grade level. Snack is distributed around 4:15; students may bring their own in addition.',
      },
      {
        time: '4:25',
        name: 'Whole-group activity',
        detail: 'Emphasising **STEAM and collaboration** — the one structured, all-together block of the afternoon.',
      },
      {
        time: '4:55',
        name: 'Choice time',
        detail: 'Free choice until pickup. **Tech activities are available on Fridays only.**',
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
      'The programme is framed around a decompression-then-structure rhythm: students arrive to unstructured play, move into a separated homework and snack window, come together for a STEAM-and-collaboration block, then return to choice. Middle School students waiting for music lessons may work on homework at no charge, which is the one explicit interlock with another school programme.',
    catalogTitle: 'Enrichment classes',
    catalogIntro:
      'The school lists enrichment programmes as **“coming soon”** at the time of this research, so there is no class catalog to show. This is a genuine absence rather than an un-researched gap — the section exists on the page with no offerings in it.',
    dayFilters: [],
    gradeFilters: [],
    classes: [],
    flags: [
      {
        kind: 'gap',
        text: 'Enrichment offerings are advertised as "coming soon" with no classes, days, grades or fees published — so no catalog is shown rather than an empty one.',
      },
      {
        kind: 'verify',
        text: 'This rhythm is the web page’s 3:15–5:30 window. The fee schedule’s window runs 3:00–6:00 (Lower School), so the published blocks may start 15 minutes earlier and run 30 minutes later than shown.',
      },
      {
        kind: 'gap',
        text: 'No staff-to-child ratio, capacity, or policy for early-dismissal and teacher-workday coverage is published.',
      },
    ],
    sources: [
      { label: 'gastonday.org — After School Program (the full afternoon schedule, snack, homework, tech Fridays)', url: PAGE },
      { label: 'gastonday.org — Schedule of Tuition and Fees 2025-2026 (music lessons, care windows)', url: FEES },
    ],
  },

  /* ---------------------------------------------------------- 4d verdict -- */
  verdict: {
    headline:
      'Cheap, published in detail, and genuinely structured — but with an unresolved conflict between the school’s two own sources on both hours and billing period.',
    subhead:
      'For a family that needs care to 6:00 pm, this is the least expensive option on the roster; confirm the window before relying on it.',
    strengthsTitle: 'What holds up',
    strengths: [
      '**The price is the lowest here.** $95/week for Lower School and $55/week for Middle School, with drop-in at $30 and $15 — no registration fee published.',
      '**The afternoon is published minute by minute.** Four named blocks with times, rather than a general description of "supervision and activities".',
      '**Homework is a scheduled block, not an afterthought** — 4:00–4:25, separated by grade level, with snack alongside.',
      '**There is a structured group activity every day** built around STEAM and collaboration, so the afternoon is not purely custodial.',
      '**Coverage runs to 6:00 pm** on the fee schedule — later than several peers, and covering the full Pre-K–8 span in two tiers.',
      '**It interlocks with music lessons**, letting Middle School students do homework free while waiting.',
    ],
    watchoutsTitle: 'What to check',
    watchouts: [
      '**The hours conflict.** 3:15–5:30 on the programme page versus 3:00–6:00 and 4:00–6:00 on the fee schedule — a 30-minute difference at the end of the day that matters if you are relying on it.',
      '**The billing period conflicts.** "$100/month" on the page versus "$95/week" on the fee schedule. These are very different annual totals; confirm which you will be billed.',
      '**Enrichment is "coming soon"** — the extras that other schools bundle into aftercare do not exist here yet.',
      '**No Upper School care.** Grades 9–12 have no published after-school programme.',
      '**Late fees start fast** — $10 within the first five minutes, then $5 per five minutes.',
      '**Nothing published on ratios or capacity**, so there is no way to know how many children one adult supervises.',
    ],
    checklistTitle: 'Ask on the tour',
    checklist: [
      'Which is current — 3:15–5:30 on the website, or the 3:00–6:00 and 4:00–6:00 on the fee schedule?',
      'Is the recurring rate $95 a week or $100 a month? What is the actual annual cost for five days?',
      'What is the staff-to-child ratio, and how many children are typically in the room by 5 pm?',
      'When will enrichment classes start, what will they cost, and are they inside the base rate?',
      'Does aftercare run on early-dismissal days, teacher workdays and exam days?',
      'Is there any financial-aid pathway or sibling discount for aftercare, as there is for tuition?',
      'How is the 5th–8th grade tier supervised differently from the Pre-K–4th tier once both are in the same room?',
    ],
    flags: [],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
