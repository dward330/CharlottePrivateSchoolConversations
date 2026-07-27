// Charlotte Country Day School — After School.
//
// Transcribed from source-material/after-school/charlotte-country-day/ —
// principally "CCD - After School - Redesign Research 2026.md", which carries
// the source URLs.
//
// CCD publishes the most granular rate ladder of the six schools: 13 rows across
// five pickup tiers and five day-counts, all on the open web. The countervailing
// finding is that its enrichment catalog is entirely invisible to prospective
// families — it lives behind the UltraCamp portal, which returned zero results
// when checked. So the Cost Planner here is the richest of the set while the
// enrichment block on 1c has no class list at all; what the school does publish
// about enrichment is its *structure* (per-grade slots, ratios, session prices),
// which is rendered as the rhythm strip instead.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The timeline spans 1 pm → 6 pm, so each hour is 0.2 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 13) / 5

export const charlotteCountryDay: AfterSchoolProgram = {
  coverage: {
    headline:
      'Extended Day covers JK through grade 8 to 6:00 p.m., with five separate pickup tiers — the finest-grained coverage ladder of any school here.',
    subhead:
      'Upper School has no Extended Day at all, and no before-school care is published for the school year. The unusually early 1:15 p.m. JK dismissal is backstopped by its own 2:00 p.m. tier.',
    hours: ['1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'Junior Kindergarten',
        dismissal: 'dismissal 1:15',
        startFrac: frac(13, 15),
        endFrac: frac(18),
        tiers: [
          { until: '2:00', price: 'from $60/mo', endFrac: frac(14) },
          { until: '3:30', price: '$140', endFrac: frac(15, 30) },
          { until: '4:30', price: '$200', endFrac: frac(16, 30) },
          { until: '6:00', price: '$255', endFrac: frac(18) },
        ],
      },
      {
        division: 'Kindergarten',
        dismissal: 'dismissal 2:00',
        startFrac: frac(14),
        endFrac: frac(18),
        tiers: [
          { until: '3:00', price: '$60', endFrac: frac(15) },
          { until: '3:30', price: '$90', endFrac: frac(15, 30) },
          { until: '4:30', price: '$140', endFrac: frac(16, 30) },
          { until: '6:00', price: '$208', endFrac: frac(18) },
        ],
      },
      {
        division: 'Grades 1–4',
        dismissal: 'dismissal 2:50–3:05',
        startFrac: frac(15),
        endFrac: frac(18),
        tiers: [
          { until: '4:30', price: '$90', endFrac: frac(16, 30) },
          { until: '6:00', price: '$175', endFrac: frac(18) },
        ],
      },
      {
        division: 'Middle School',
        dismissal: 'dismissal 3:10',
        startFrac: frac(15, 10),
        endFrac: frac(18),
        tiers: [
          { until: '4:30', price: '$60', endFrac: frac(16, 30) },
          { until: '6:00', price: '$140', endFrac: frac(18) },
        ],
      },
      {
        division: 'Upper School',
        dismissal: 'dismissal 3:15',
        startFrac: frac(15, 15),
        endFrac: frac(18),
        tiers: [],
        uncovered: true,
        flatLabel: 'No Extended Day — enrichment slot 3:45–4:45 only',
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: '**Country Day Summer Programs** — ages 4–18, 150+ camps, 8 June to 24 July 2026. Before-camp care 7:30–9:00 a.m. at $105/wk; afternoon care $85/wk. A **separate summer financial-aid application** exists.',
    },
    facts: [
      { label: 'Program year', text: '19 August 2026 – 25 May 2027' },
      {
        label: 'Drop-in',
        text: '$19/hour with a one-hour minimum — a genuine option, but it needs **24-hour advance notice**',
      },
      { label: 'Late pickup', text: '$10 per 10-minute interval after 6:00 p.m.' },
      {
        label: 'Conference & professional days',
        text: 'the program runs full-day "at a separate cost" — the amount is never stated',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No before-school care is published for the school year, despite an 8:00 a.m. start across all divisions. Morning care exists only for summer camps.',
      },
      {
        kind: 'gap',
        text: 'School holiday and break coverage is not published at all, and the full-day conference-day rate is described only as "a separate cost".',
      },
      {
        kind: 'verify',
        text: 'Registration for 2026-27 closed on **5 June 2026**. A family enrolling now may be routed to $19/hour drop-in or a waitlist; post-deadline availability is not published.',
      },
    ],
    sources: [
      {
        label: 'charlottecountryday.org — Quick Reference (all dismissal times)',
        url: 'https://www.charlottecountryday.org/bucsnet/quick-reference',
      },
      {
        label: 'charlottecountryday.org — Extended Day (tiers, program dates, drop-in, late fee)',
        url: 'https://www.charlottecountryday.org/bucsnet/after-school/extended-day',
      },
      {
        label: 'charlottecountryday.org — After School',
        url: 'https://www.charlottecountryday.org/bucsnet/after-school',
      },
      {
        label: 'charlottecountryday.org — Summer Programs',
        url: 'https://www.charlottecountryday.org/summer',
      },
    ],
  },

  cost: {
    headline:
      'Thirteen published rows across five pickup times and five day-counts — a family pays close to only what it actually uses.',
    subhead:
      'Every cell below is published on the open web, with no "call for pricing". Note the range: the same child costs $60/month at the cheapest tier and $900/month at the fullest.',
    basis: 'monthly',
    periods: 9,
    periodsLabel: '9 billing months',
    columnsVerified: [true, true, true, true, true],
    defaultRow: 'g14-6',
    defaultDays: 5,
    rows: [
      {
        id: 'jk-2',
        label: 'JK · to 2:00',
        panelLabel: 'Junior Kindergarten · to 2:00 pm',
        prices: [60, 115, 175, 210, 255],
      },
      {
        id: 'jk-3',
        label: 'JK · to 3:00',
        panelLabel: 'Junior Kindergarten · to 3:00 pm',
        prices: [115, 210, 310, 360, 450],
      },
      {
        id: 'jk-330',
        label: 'JK · to 3:30',
        panelLabel: 'Junior Kindergarten · to 3:30 pm',
        prices: [140, 255, 340, 450, 510],
      },
      {
        id: 'jk-430',
        label: 'JK · to 4:30',
        panelLabel: 'Junior Kindergarten · to 4:30 pm',
        prices: [200, 360, 470, 570, 670],
      },
      {
        id: 'jk-6',
        label: 'JK · to 6:00',
        panelLabel: 'Junior Kindergarten · to 6:00 pm',
        prices: [255, 450, 610, 725, 900],
      },
      {
        id: 'k-3',
        label: 'K · to 3:00',
        panelLabel: 'Kindergarten · to 3:00 pm',
        prices: [60, 115, 175, 210, 255],
      },
      {
        id: 'k-330',
        label: 'K · to 3:30',
        panelLabel: 'Kindergarten · to 3:30 pm',
        prices: [90, 175, 230, 310, 340],
      },
      {
        id: 'k-430',
        label: 'K · to 4:30',
        panelLabel: 'Kindergarten · to 4:30 pm',
        prices: [140, 255, 340, 450, 510],
      },
      {
        id: 'k-6',
        label: 'K · to 6:00',
        panelLabel: 'Kindergarten · to 6:00 pm',
        prices: [208, 360, 489, 615, 725],
      },
      {
        id: 'g14-430',
        label: 'Gr 1–4 · to 4:30',
        panelLabel: 'Grades 1–4 · to 4:30 pm',
        prices: [90, 175, 230, 310, 340],
      },
      {
        id: 'g14-6',
        label: 'Gr 1–4 · to 6:00',
        panelLabel: 'Grades 1–4 · to 6:00 pm',
        prices: [175, 310, 405, 490, 610],
      },
      {
        id: 'ms-430',
        label: 'MS · to 4:30',
        panelLabel: 'Middle School · to 4:30 pm',
        prices: [60, 115, 175, 210, 255],
      },
      {
        id: 'ms-6',
        label: 'MS · to 6:00',
        panelLabel: 'Middle School · to 6:00 pm',
        prices: [140, 255, 340, 450, 510],
      },
    ],
    aside: {
      title: 'Need it only occasionally?',
      text: 'Drop-in is **$19/hour** with a one-hour minimum and a one-time **$40** registration fee, separate from the $80 contract fee. It requires 24-hour advance notice.',
    },
    fees: [
      { label: 'Contract registration', value: '$80' },
      { label: 'Drop-in registration (one-time)', value: '$40' },
      { label: 'Drop-in care', value: '$19 / hr' },
      { label: 'Late pickup after 6:00', value: '$10 / 10 min' },
      { label: 'Contract change (beyond the first)', value: '$50' },
      {
        label: 'Billed monthly by the Business Office as an incidental charge. Contracts run 1–5 days a week. **One contract change per semester**, and no changes at all in August or December.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The Kindergarten 6:00 p.m. row is the only one with non-round values — $208, $489, $615 — where every other row uses round numbers. Worth confirming it is not a typo.',
      },
      {
        kind: 'gap',
        text: 'No Extended Day sibling discount is published, and no financial-aid policy for Extended Day exists: it is billed as an **incidental charge**, which places it outside the tuition-assistance envelope even though about 30% of students receive tuition aid. Summer programs, by contrast, do have their own aid application.',
      },
      {
        kind: 'verify',
        text: 'Contract rigidity is real: one change per semester, $50 for any additional change, and **no changes permitted in August or December** — the two months a family is most likely to discover its schedule was wrong.',
      },
    ],
    sources: [
      {
        label: 'charlottecountryday.org — Extended Day fees (the full 13-row table)',
        url: 'https://www.charlottecountryday.org/bucsnet/after-school/extended-day',
      },
      {
        label: 'charlottecountryday.org — ED Program Fees',
        url: 'https://www.charlottecountryday.org/bucsnet/after-school/ed-program-fees',
      },
      {
        label: 'charlottecountryday.org — Tuition & Financial Aid',
        url: 'https://www.charlottecountryday.org/admissions/tuition-financial-aid',
      },
    ],
  },

  dayInside: {
    headline:
      'Extended Day is framed around working families — "more than 50 percent of our two-parent families are dual income," and the program is built to match.',
    subhead:
      'The school publishes the components of the afternoon but never sequences them with clock times. What it does publish precisely is the enrichment structure: each division’s class begins exactly at its own dismissal bell.',
    rhythmTitle: 'Enrichment starts at the bell — published slots and ratios',
    rhythm: [
      {
        time: '1:15–1:45',
        name: 'Junior Kindergarten',
        detail: '30 minutes at a 10:1 ratio, starting the moment JK dismisses',
      },
      {
        time: '2:00–2:40',
        name: 'Kindergarten',
        detail: '40 minutes at a 12:1 ratio',
      },
      {
        time: '3:05–4:05',
        name: 'Grades 1–4',
        detail: 'A full hour at a 15:1 ratio',
      },
      {
        time: '3:20–4:20',
        name: 'Grades 5–8',
        detail: 'A full hour at a 17:1 ratio; grades 9–12 run 3:45–4:45 at 20:1',
      },
    ],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'homework time',
      'outdoor play',
      'games',
      'enrichment',
      'a healthy snack',
      'warm & structured',
    ],
    wordsText:
      '"Our Extended Day program provides a warm, structured environment for students from JK through grade 8. Whether attending daily or dropping in occasionally, students enjoy a mix of homework time, outdoor play, games, enrichment, and a healthy snack." The school’s own feature describes it as "a home away from home filled with connection, creativity, and exploration", and names real activities — collaborative art, board games, Lego building, and playground time with **Peaches, the school dog**. Upper School students, who have no Extended Day of their own, appear in the program as cross-grade helpers.',
    dayFilters: [],
    gradeFilters: [],
    classes: [],
    flags: [
      {
        kind: 'gap',
        text: 'The enrichment catalog is invisible to prospective families. The school advertises "more than 25 after-school enrichment classes" — music, art, science, chess, karate, cheerleading, field hockey, baseball, volleyball, SAT/ACT prep, coding, drama, robotics — but the class list lives behind the UltraCamp portal, which returned **zero results** when checked. No public page gives names with days, grades and fees.',
      },
      {
        kind: 'verify',
        text: 'Published enrichment session prices are **$260 for a 7-week full session** (about $37/class) and **$225 for a 3-week mini** (about $75/class), across four cycles a year — Fall, Mini-Winter, Winter and Mini-Spring.',
      },
      {
        kind: 'verify',
        text: 'The school publishes two conflicting ratios: the enrichment hub states a **12:1 maximum**, while the per-grade table above runs from 10:1 up to **20:1**. Both come from the school.',
      },
      {
        kind: 'gap',
        text: 'No hour-by-hour daily schedule is published, no Extended Day staff-to-child ratio is given, and Middle School is not described as a distinct program — grades 5–8 sit under the same JK–8 umbrella.',
      },
    ],
    sources: [
      {
        label: 'charlottecountryday.org — Program Directors (enrichment slots, ratios, session fees)',
        url: 'https://www.charlottecountryday.org/cd-experience/after-school/program-directors',
      },
      {
        label: 'charlottecountryday.org — Enrichment policies',
        url: 'https://www.charlottecountryday.org/bucsnet/after-school/enrichment',
      },
      {
        label: 'charlottecountryday.org — A purposeful and dynamic Extended Day experience',
        url: 'https://www.charlottecountryday.org/news-events/news-details-page/~board/school-news/post/a-purposeful-and-dynamic-extended-day-experience',
      },
      {
        label: 'charlottecountryday.org — After School',
        url: 'https://www.charlottecountryday.org/bucsnet/after-school',
      },
    ],
  },

  verdict: {
    headline:
      'The most flexible and most transparently priced after-school program in this set — and the one whose enrichment offering you cannot actually see before you enrol.',
    subhead:
      'Coverage stops hard at grade 8, the cost curve is steep at the top, and Extended Day appears to sit outside financial aid.',
    strengths: [
      '**The most granular pricing ladder here** — 13 rows across five pickup times and five day-counts. A JK family needing 2:00 p.m. coverage twice a week pays $115/month, not a flat care fee.',
      '**A full rate card on the open web.** Contract, drop-in, late and change fees are all published — no "call for pricing".',
      '**Built for working parents by design**, and the school says so: "more than 50 percent of our two-parent families are dual income".',
      '**Enrichment starts at the dismissal bell** for every division, with published per-grade ratios — no dead gap between school and activity.',
      '**Four enrichment cycles a year**, including a low-commitment 3-week mini at $225, so a child can sample without a season-long commitment.',
      '**Drop-in is a real option**, not a token one — $19/hour with a modest one-time $40 fee.',
      '**An on-site aquatic centre** with private and semi-private instruction, open to the public.',
      '**JK is genuinely well served** — the early 1:15 p.m. dismissal is backstopped by five pickup tiers and a developmentally sensible 30-minute class at 10:1.',
    ],
    watchouts: [
      '**No Upper School coverage.** Extended Day stops at grade 8; grades 9–12 get an enrichment slot and nothing else.',
      '**Cost compounds steeply** — JK at 6:00 p.m. five days a week is $900/month, roughly $8,100 a year on top of $24,515 tuition, about a third again over sticker.',
      '**Extended Day appears to sit outside financial aid.** It is billed as an incidental charge with no published aid policy, even though about 30% of students receive tuition assistance — and summer programs do have their own aid application.',
      '**Contract rigidity** — one change per semester, $50 for any additional change, and no changes at all in August or December.',
      '**The 2026-27 registration deadline has already passed** (5 June 2026), so a family enrolling now may face drop-in rates or a waitlist.',
      '**No published daily schedule.** Components are listed but never sequenced, and there is no homework-help staffing model.',
      '**The enrichment catalog is invisible** to prospective families — behind a portal that currently shows nothing.',
      '**Three portals, three logins** — Extended Day on Veracross, enrichment and summer on UltraCamp, swim on Jackrabbit.',
    ],
    checklist: [
      'What actually happens between 3:15 and 6:00 p.m., hour by hour? How much is homework support versus free play?',
      'Is homework help staffed by teachers, or is it supervision only?',
      'Are Middle School students programmed separately from Lower School? What does an 8th grader do at 5:00 p.m.?',
      'Does financial aid ever apply to Extended Day? If not, what do aided families do for after-care?',
      'Is there any before-school or early drop-off option during the school year?',
      'Registration closed 5 June — what are the options now for 2026-27?',
      'What is the separate cost for full-day care on conference and professional days, and how many such days are there?',
      'What happens on school holidays, snow days and breaks?',
      'Which ratio is real — the 12:1 on the enrichment hub, or the per-grade table that runs to 20:1?',
      'Is the Kindergarten 6:00 p.m. row ($208 / $489 / $615) correct, or a typo? Every other row is round-numbered.',
      'Is snack included in the monthly fee, and what are the allergy protocols?',
      'Is there any sibling discount?',
      'Can I see the actual Fall enrichment class list — names, days and grade fits — before committing?',
      'If my child does a 4:30 p.m. enrichment class, does Extended Day pick them up afterward, and does that change my bill?',
      'How are outside vendors vetted and background-checked, and who is liable?',
      'What is the staff-to-child ratio in Extended Day itself, as opposed to in enrichment classes?',
    ],
    flags: [],
    sources: [
      {
        label: 'charlottecountryday.org — After School',
        url: 'https://www.charlottecountryday.org/bucsnet/after-school',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
