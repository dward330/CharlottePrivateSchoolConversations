// Providence Day School — After School.
//
// Transcribed from source-material/after-school/providence-day/ — principally
// "Providence Day - After School - Redesign Research 2026.md" (which carries the
// source URLs), the official 2026-27 Extended Day Schedule & Fees Google Doc, the
// official Daily Schedule PDF, and the school's own Fall 2026 Enrichment Class
// Descriptions packet.
//
// This is the fullest of the six entries: PDS publishes a complete 40-cell fee
// matrix AND — via the enrichment packet — a real 15-class catalog with fees,
// days and grade bands. Every number on all four cards is published; nothing
// here is modeled, so no EST. tags appear.
//
// The two genuine gaps are structural rather than numeric: no Upper School
// coverage and no before-school care. Both are rendered as uncovered rows on the
// timeline rather than omitted, because the gap is the finding.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The coverage timeline spans 1 pm → 6 pm, so each hour is 0.2 of the window.
   frac(h) converts a clock hour to its fraction: 1 pm = 0, 3:10 pm = 0.433. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 13) / 5

export const providenceDay: AfterSchoolProgram = {
  coverage: {
    headline:
      'Two programs cover TK through grade 8 until 6:00 p.m. — a nationally recognized Extended Day for Lower School and the drop-in Clubhouse for Middle School.',
    subhead:
      'Upper School has no published option after dismissal, and there is no before-school care at any division on regular days. Summer Programs carry the coverage year-round under separate registration.',
    hours: ['1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'TK',
        dismissal: 'dismissal 1:00',
        startFrac: frac(13),
        endFrac: frac(18),
        tiers: [
          { until: '3:00', price: 'from $140/mo', endFrac: frac(15) },
          { until: '4:30', price: '$165', endFrac: frac(16, 30) },
          { until: '6:00', price: '$190', endFrac: frac(18) },
        ],
      },
      {
        division: 'Kindergarten',
        dismissal: 'dismissal 2:00',
        startFrac: frac(14),
        endFrac: frac(18),
        tiers: [
          { until: '3:00', price: '$100', endFrac: frac(15) },
          { until: '4:30', price: '$130', endFrac: frac(16, 30) },
          { until: '6:00', price: '$165', endFrac: frac(18) },
        ],
      },
      {
        division: 'Grades 1–5',
        dismissal: 'dismissal 2:50',
        startFrac: frac(15),
        endFrac: frac(18),
        tiers: [
          { until: '4:30', price: '$100', endFrac: frac(16, 30) },
          { until: '6:00', price: '$135', endFrac: frac(18) },
        ],
      },
      {
        division: 'Middle School',
        dismissal: 'dismissal 3:10',
        startFrac: frac(15, 10),
        endFrac: frac(18),
        tiers: [],
        flatLabel: 'Clubhouse · drop-in · 3:10–6:00 · $100/yr flat',
      },
      {
        division: 'Upper School',
        dismissal: 'dismissal 3:10',
        startFrac: frac(15, 10),
        endFrac: frac(18),
        tiers: [],
        uncovered: true,
        flatLabel: 'No published program — ask about supervised study',
      },
    ],
    summer: {
      season: 'JUN–AUG',
      text: '**Summer at Providence Day** carries coverage year-round — nine sessions, separate registration at summer.providenceday.org. Extended Day itself closes on the last day of school.',
    },
    facts: [
      {
        label: 'Activity Days',
        text: 'Extended Day runs 7:45 a.m.–6:00 p.m. on teacher workdays and most holidays — and opens at **7:00 a.m.** on parent-teacher conference days',
      },
      { label: 'No drop-in', text: 'for Extended Day — a weekly contract only' },
      { label: 'Late pickup', text: '$1.00 per minute after 6:00 p.m.' },
      {
        label: 'Before school',
        text: 'no program on regular days; the 7:30–7:50 a.m. arrival window is unsupervised drop-off',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The Activity Day fee is never stated. The school says a separate fee applies on teacher workdays and holidays but publishes no amount — an unbudgetable line item on exactly the days families most need coverage.',
      },
      {
        kind: 'verify',
        text: 'Grades 1–5 dismiss at **2:50** but the fee matrix bills them from **3:00**. The ten-minute gap is not explained on any published page.',
      },
    ],
    sources: [
      {
        label: 'providenceday.org — official Daily Schedule (all dismissal times, PDF)',
        url: 'https://www.providenceday.org/uploaded/Admissions/Daily_Schedule.pdf',
      },
      {
        label: 'providenceday.org — After School Options',
        url: 'https://www.providenceday.org/admissions/after-school-options',
      },
      {
        label: 'providenceday.org — Extended Day (Lower School)',
        url: 'https://www.providenceday.org/lower-school/extended-day',
      },
      {
        label: 'providenceday.org — Clubhouse (Middle School)',
        url: 'https://www.providenceday.org/middle-school/clubhouse',
      },
      { label: 'summer.providenceday.org', url: 'https://summer.providenceday.org/' },
    ],
  },

  cost: {
    headline:
      'Extended Day is priced as a monthly contract by grade, pickup time, and days per week — billed via Blackbaud, with no drop-in option at all.',
    subhead:
      'All 40 cells below are published by the school in its official 2026-27 fee document, so nothing here is projected. Pick a row and a days-per-week column to see what your schedule actually costs.',
    basis: 'monthly',
    periods: 9,
    periodsLabel: '9 billing months',
    columnsVerified: [true, true, true, true, true],
    defaultRow: 'g15-36',
    defaultDays: 5,
    rows: [
      {
        id: 'tk-13',
        label: 'TK · 1:00–3:00',
        panelLabel: 'TK · 1:00–3:00 pm',
        prices: [140, 225, 315, 400, 490],
      },
      {
        id: 'tk-1430',
        label: 'TK · 1:00–4:30',
        panelLabel: 'TK · 1:00–4:30 pm',
        prices: [165, 275, 385, 500, 610],
      },
      {
        id: 'tk-16',
        label: 'TK · 1:00–6:00',
        panelLabel: 'TK · 1:00–6:00 pm',
        prices: [190, 330, 470, 610, 750],
      },
      {
        id: 'k-23',
        label: 'K · 2:00–3:00',
        panelLabel: 'Kindergarten · 2:00–3:00 pm',
        prices: [100, 145, 195, 240, 290],
      },
      {
        id: 'k-2430',
        label: 'K · 2:00–4:30',
        panelLabel: 'Kindergarten · 2:00–4:30 pm',
        prices: [130, 210, 290, 370, 450],
      },
      {
        id: 'k-26',
        label: 'K · 2:00–6:00',
        panelLabel: 'Kindergarten · 2:00–6:00 pm',
        prices: [165, 275, 385, 500, 610],
      },
      {
        id: 'g15-3430',
        label: 'Gr 1–5 · 3:00–4:30',
        panelLabel: 'Grades 1–5 · 3:00–4:30 pm',
        prices: [100, 150, 195, 245, 290],
      },
      {
        id: 'g15-36',
        label: 'Gr 1–5 · 3:00–6:00',
        panelLabel: 'Grades 1–5 · 3:00–6:00 pm',
        prices: [135, 220, 300, 385, 470],
      },
    ],
    aside: {
      title: 'Middle School sibling?',
      text: 'Clubhouse is a flat **$100/year** registration — drop-in every school day, 3:10–6:00, with no per-day or hourly rates.',
    },
    fees: [
      { label: 'Extended Day annual registration', value: '$80 / student' },
      { label: 'Clubhouse annual registration', value: '$100 / student' },
      { label: 'Late pickup after 6:00', value: '$1.00 / min' },
      { label: 'Unplanned schedule change', value: '$30 / hr' },
      { label: 'Enrichment withdrawal, after 1 class', value: '$25' },
      {
        label: 'Schedule changes by email, by the 1st of the month. Billed monthly via Blackbaud Tuition Management. The $30/hr adjustment rate is explicitly **not** drop-in pricing — the school offers no drop-in for Extended Day.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The number of billing months is never stated. The fee document publishes monthly rates but not how many months are billed, so an annual total cannot be computed exactly — the school-year figures here assume **9 months** and should be confirmed.',
      },
      {
        kind: 'gap',
        text: 'No sibling discount is published for either tuition or Extended Day. Two children in grades 1–5 at the full 3:00–6:00 tier is $940/month.',
      },
      {
        kind: 'verify',
        text: 'Sources disagree on the billing platform: the fee document names **Blackbaud**, the tuition and aid pages reference **Clarity**, and an archived FAQ references **Smart Tuition**.',
      },
      {
        kind: 'verify',
        text: 'Financial assistance reaches after-school here, which is uncommon — the tuition page states aid "may be available for some of these additional costs", naming Extended Day and Clubhouse. It is hedged, not a guarantee.',
      },
    ],
    sources: [
      {
        label: 'providenceday.org — 2026-27 Extended Day Schedule & Fees (official document)',
        url: 'https://docs.google.com/document/d/1_5u6M_MQtSRbLpKPYFjKqSXZB2pAV3McqIaD2TFhJWE',
      },
      {
        label: 'providenceday.org — Extended Day (Lower School)',
        url: 'https://www.providenceday.org/lower-school/extended-day',
      },
      {
        label: 'providenceday.org — Clubhouse (Middle School)',
        url: 'https://www.providenceday.org/middle-school/clubhouse',
      },
      {
        label: 'providenceday.org — Tuition & Financial Assistance',
        url: 'https://www.providenceday.org/admissions/tuition-and-financial-assistance',
      },
    ],
  },

  dayInside: {
    headline:
      'Extended Day is a child-development program, not a waiting room — nurturing relationships, flexible scheduling and child-led choice are the school’s own framing.',
    subhead:
      'The enrichment afternoon is published step by step, and it changes by division: TK and K are collected from their classrooms, grades 1–2 are walked to the Dining Hall, and grades 3–5 make their own way there.',
    rhythmTitle: 'The enrichment afternoon, division by division',
    rhythm: [
      {
        time: 'TK / K',
        name: 'Collected at the door',
        detail:
          'Picked up directly from their classrooms by an Extended Day teacher and escorted to the Dining Hall',
      },
      {
        time: 'Grades 1–2',
        name: 'Walked over',
        detail: 'Brought to the Dining Hall at dismissal and checked in with Extended Day staff',
      },
      {
        time: 'Grades 3–5',
        name: 'Independent',
        detail: 'Walk themselves to the Dining Hall and check in with Extended Day staff',
      },
      {
        time: 'Then, all',
        name: 'Snack → class → dismissal',
        detail:
          'Nut-free snack and a bathroom break, escorted to enrichment, supervised throughout, escorted to dismissal',
      },
    ],
    wordsTitle: 'The Clubhouse, in the school’s words',
    words: ['study', 'catch up with friends', 'unwind', 'play', 'eat', 'safe & supervised'],
    wordsText:
      'A drop-in destination for every Middle Schooler, every school day, with no sign-up. Students may **self-register and sign themselves in and out** for practices, games, music lessons and rehearsals — a meaningfully more autonomous model than Lower School. In Lower School, study hall runs for grades 3–5 only, Monday–Thursday, 3:15–4:00 p.m., and is explicitly independent study with no one-on-one academic help.',
    catalogTitle: 'Fall 2026 enrichment classes',
    catalogIntro:
      'The school’s own Fall 2026 packet — real fees, days and grade bands. All classes run **10 sessions**; TK/K classes are $200 and grades 1–5 are $220. Students may take only **one** enrichment program per day, and enrolment in Extended Day is required to attend any of them.',
    dayFilters: ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    gradeFilters: ['All', 'TK', 'K', '1', '2', '3', '4', '5'],
    classes: [
      {
        name: 'Art',
        desc: 'Classical and modern styles on canvas with Coloring on Canvas, LLC',
        day: 'Mon',
        grades: ['TK', 'K'],
        gradeLabel: 'TK–K',
        fee: '$200',
      },
      {
        name: 'Art Explorers / Art Discoveries',
        desc: 'Drawing, painting, printing and sculpting; grades 3–5 focus on finding an artistic voice',
        day: 'Mon',
        grades: ['1', '2', '3', '4', '5'],
        gradeLabel: '1st–5th',
        fee: '$220',
      },
      {
        name: 'Wrestling',
        desc: 'Coached by Terry Tadeo, Tommy Racano and Paul Burnam — hard work, teamwork and resilience',
        day: 'Mon',
        grades: ['TK', 'K', '1', '2', '3', '4', '5'],
        gradeLabel: 'TK–5th',
        fee: 'TK/K $200 · 1–5 $220',
      },
      {
        name: 'Chess',
        desc: 'Professional instructors from the Charlotte Chess Center and Scholastic Academy',
        day: 'Tue',
        grades: ['K', '1', '2', '3', '4', '5'],
        gradeLabel: 'K–5th',
        fee: 'K $200 · 1–5 $220',
      },
      {
        name: 'YoLa — Yoga & Language',
        desc: 'Charlotte Speech & Hearing Center: literacy activities combined with pediatric yoga',
        day: 'Tue',
        grades: ['TK', 'K', '1', '2'],
        gradeLabel: 'TK–2nd',
        fee: '$200',
      },
      {
        name: 'Running Club',
        desc: 'Led by PDS Varsity Girls Track and Field Head Coach Kris Jones — hydration, rest and stretching',
        day: 'Tue',
        grades: ['4', '5'],
        gradeLabel: '4th–5th',
        fee: '$220',
      },
      {
        name: 'Science — Mad Science Jr. Exploration',
        desc: 'Air, sea and surf, colour, energy, states of matter, weather and lasers',
        day: 'Wed',
        grades: ['TK', 'K'],
        gradeLabel: 'TK–K',
        fee: '$200',
      },
      {
        name: 'Science — Crazy Chemworks',
        desc: 'Mad Science Charlotte: super-sticky stuff, glow-in-the-dark tech, potions, slime and atoms',
        day: 'Wed',
        grades: ['1', '2', '3', '4', '5'],
        gradeLabel: '1st–5th',
        fee: '$220',
      },
      {
        name: 'Theatre Explorers',
        desc: 'Storytelling through body, voice and imagination — no final performance, low pressure',
        day: 'Wed',
        grades: ['TK', 'K'],
        gradeLabel: 'TK–K',
        fee: '$200',
      },
      {
        name: 'Theatre — StageCraft Studio',
        desc: 'Improvisation, character development, scene-building, voice and ensemble collaboration',
        day: 'Wed',
        grades: ['1', '2', '3', '4', '5'],
        gradeLabel: '1st–5th',
        fee: '$220',
      },
      {
        name: 'Karate',
        desc: 'Eliza Newell, third-degree black belt — self-defence blended with respect and discipline',
        day: 'Thu',
        grades: ['TK', 'K', '1', '2', '3', '4', '5'],
        gradeLabel: 'TK–5th',
        fee: '$220',
      },
      {
        name: 'LEGO Masters: Once Upon a Brick',
        desc: 'Fairytales and legends as building challenges — balance, engineering and creative design',
        day: 'Thu',
        grades: ['1', '2', '3'],
        gradeLabel: '1st–3rd',
        fee: '$220',
      },
      {
        name: 'Coding',
        desc: 'PDS Middle School CS teacher Todd Johnson — app-building and makerspace skills on school iPads',
        day: 'Thu',
        grades: ['4', '5'],
        gradeLabel: '4th–5th',
        fee: '$220',
      },
      {
        name: 'Charger Cheer',
        desc: 'Led by Ari Patterson; the squad cheers a quarter at a fall PDS Varsity football game',
        day: 'Fri',
        grades: ['TK', 'K', '1', '2', '3', '4', '5'],
        gradeLabel: 'TK–5th',
        fee: 'TK/K $200 · 1–5 $220',
      },
      {
        name: 'Amazing Athletes',
        desc: 'The basics of 10 sports with motor-skill development, nutrition and muscle identification',
        day: 'Fri',
        grades: ['TK', 'K', '1', '2', '3', '4', '5'],
        gradeLabel: 'TK–5th',
        fee: 'TK/K $200 · 1–5 $220',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Enrichment is **gated behind Extended Day enrolment** — a class always sits on top of a monthly Extended Day charge, and Fall 2026 registration closed on 26 July with classes filled first-come, first-served.',
      },
      {
        kind: 'gap',
        text: 'No staff-to-child ratio is published for either Extended Day or Clubhouse, and Clubhouse publishes no daily structure or homework-support commitment at all.',
      },
    ],
    sources: [
      {
        label: 'providenceday.org — Fall 2026 Enrichment Class Descriptions (school packet)',
      },
      {
        label: 'providenceday.org — Extended Day (Lower School)',
        url: 'https://www.providenceday.org/lower-school/extended-day',
      },
      {
        label: 'providenceday.org — Clubhouse (Middle School)',
        url: 'https://www.providenceday.org/middle-school/clubhouse',
      },
    ],
  },

  verdict: {
    headline:
      'A strong TK–8 story: a nationally recognized Lower School program with the most transparent pricing in this set, plus a dedicated Middle School drop-in model many peers don’t offer.',
    subhead:
      'The open questions are ratios, the Upper School gap, and the unpublished Activity Day fee — exactly what a visit answers.',
    strengths: [
      '**Best-in-class price transparency** — a complete published 40-cell grade × tier × days matrix, so a family can compute its exact annual cost before applying.',
      '**Three tiers for the youngest students**, explicitly designed around sibling-pickup logistics. The 1:00 p.m. TK dismissal is a real burden and the school priced an answer to it.',
      '**A real enrichment catalog with real prices** — 15 Fall 2026 classes at $200–$220 across 10 sessions, taught by named outside professionals and PDS faculty.',
      '**A published, division-specific enrichment rhythm** with escorted transitions and a school-provided nut-free snack — unusually concrete operational detail.',
      '**Serious health and safety infrastructure** — an RN on duty daily, Magnus records integration, full CPR/AED/First Aid training, a nut-free protocol and a locked medication log.',
      '**Financial assistance may extend to Extended Day and Clubhouse**, written on the tuition page. Uncommon among peers.',
      '**Strong Activity Day coverage** — 7:45 a.m.–6:00 p.m. on teacher workdays and most holidays, opening at 7:00 a.m. on conference days.',
      '**Clubhouse is cheap and frictionless** — $100/year flat, unlimited drop-in, with self-sign-out to practices and rehearsals.',
    ],
    watchouts: [
      '**Upper School isn’t covered.** Grades 9–12 dismiss at 3:10 p.m. with no published program of any kind.',
      '**No before-school care on regular days** at any division — even though Activity Days show the capability exists at 7:45 a.m., or 7:00 a.m. on conference days.',
      '**No drop-in for Extended Day**, stated explicitly. Occasional-need families are pushed to the $30/hour adjustment rate, which the school says is not drop-in pricing.',
      '**Enrichment is gated behind Extended Day enrolment**, so a single class always carries a monthly Extended Day charge with it.',
      '**The Activity Day fee is unpublished** — an unbudgetable cost on the days that most often break childcare.',
      '**Study hall is thin** — grades 3–5 only, Monday–Thursday, 45 minutes, and explicitly independent study with no one-on-one help. Grades 1–2 get none.',
      '**Cost stacks on already-high tuition** — grades 1–5 full-time is $470/month on top of $32,960; TK full-time is $750/month on top of $25,510.',
      '**Late pickup is $1.00 per minute** and unbounded.',
    ],
    checklist: [
      'What is the Activity Day fee, and is it per-day or bundled for monthly-enrolled families?',
      'How many months is Extended Day billed — 9, 10, or 12? This changes the annual total by hundreds of dollars.',
      'Is there any Upper School after-school supervision — a library, a study hall, a supervised space — even if not a formal program?',
      'Is there truly no before-school option? If Activity Days can open at 7:00 a.m., why not regular days?',
      'What exactly happens between 2:50 and 3:00 p.m. for grades 1–5, and is it billed?',
      'How does financial assistance actually apply to Extended Day and Clubhouse — the same award rate as tuition, and does it reach enrichment fees?',
      'Which platform actually bills Extended Day — Blackbaud, Clarity, or Smart Tuition?',
      'Are there sibling discounts? Two children at $470/month is $940/month.',
      'What is the staff-to-child ratio by age group, and what is staff retention like?',
      'Can we change tiers mid-year, and does the $30/hour adjustment rate apply?',
      'Clubhouse specifics: ratio, homework support, and is the $100 really the only cost?',
      'Is Extended Day capacity-constrained at any tier, especially 3:00–6:00 five-day?',
      'If a child’s enrichment class runs to 4:45, must we buy the 6:00 p.m. tier?',
    ],
    flags: [],
    sources: [
      {
        label: 'providenceday.org — After School Options',
        url: 'https://www.providenceday.org/admissions/after-school-options',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
