// Covenant Day School — After School (Extended Day).
//
// Transcribed from source-material/after-school/covenant-day/ — principally
// "Covenant Day School - After School - Deep Research 2026.md" and the
// Extended Day file, which carry the source URLs. Every dollar figure and
// clock time is the school's own published rate.
//
// Three of four cards render. `dayInside` is OMITTED: the school describes
// the program in one sentence ("homework assistance and recreational time"),
// names five enrichment categories, and gates the actual class catalog behind
// LionsWeb login — so there is no rhythm, no vocabulary, and no priced class
// list to draw. The enrichment categories are carried on the coverage card's
// facts instead. Same sparse-is-worse-than-absent reasoning as Davidson Day's
// omitted cost card.
//
// The pricing quirk worth understanding before editing: Covenant Day prices
// PER 1.5-HOUR SESSION ($248/mo at five days), so full JK/K coverage stacks
// three sessions. The school's own annual table prices exactly that stack
// ($6,696 "for 10 Months") — cheaper than 10× monthly because August and
// December bill at half rate.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The timeline spans 1 pm → 6 pm — JK/K dismisses at 1:30 — so each hour is
   0.2 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 13) / 5

const EXTENDED_DAY = 'https://www.covenantday.org/campus-life/extended-day'
const FAQS = 'https://www.covenantday.org/admissions/faqs'

export const covenantDay: AfterSchoolProgram = {
  coverage: {
    headline:
      'Free before-care from 7:30 a.m. for everyone, then Extended Day to 6:00 p.m. for JK–8 in stacked 90-minute sessions.',
    subhead:
      'The 1.5-hour session is the unit of everything: JK/K needs three of them to reach 6:00, grades 1–8 need two. High school has no aftercare.',
    hours: ['1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    basisNote:
      'Prices shown are the five-day monthly rate per arrangement — sessions cost **$248/month each at five days a week**, and fewer days cost less ($58–$206). Open **The Cost Planner** below to price any combination.',
    rows: [
      {
        division: 'JK & K',
        dismissal: 'dismissal 1:30',
        startFrac: frac(13, 30),
        endFrac: frac(18),
        tiers: [
          { until: '3:00', price: '1 session', endFrac: frac(15) },
          { until: '4:30', price: '2 sessions', endFrac: frac(16, 30) },
          { until: '6:00', price: '3 sessions · $744/mo', endFrac: frac(18) },
        ],
      },
      {
        division: 'Lower School (1–5)',
        dismissal: 'dismissal 3:00',
        startFrac: frac(15),
        endFrac: frac(18),
        tiers: [
          { until: '4:30', price: '1 session', endFrac: frac(16, 30) },
          { until: '6:00', price: '2 sessions · $496/mo', endFrac: frac(18) },
        ],
      },
      {
        division: 'Middle School (6–8)',
        dismissal: 'dismissal 3:10',
        startFrac: frac(15, 10),
        endFrac: frac(18),
        tiers: [
          { until: '4:30', price: '1 session', endFrac: frac(16, 30) },
          { until: '6:00', price: '2 sessions · $496/mo', endFrac: frac(18) },
        ],
      },
      {
        division: 'High School (9–12)',
        dismissal: 'dismissal 3:15',
        startFrac: frac(15, 15),
        endFrac: frac(18),
        tiers: [],
        uncovered: true,
        flatLabel: 'No aftercare — athletics (82% play) and activities instead',
      },
    ],
    facts: [
      {
        label: 'Free before-care',
        text: 'from **7:30 a.m.** until the start of school, at no charge, school-wide — the only free morning care in this comparison',
      },
      {
        label: 'Wednesday late start',
        text: 'all grades begin at **8:50 a.m.** instead of 8:15 — before-care absorbs the difference at no charge',
      },
      {
        label: 'Enrichment',
        text: 'separate after-school classes in **music, art, sports, robotics, and outdoor experiences** register on LionsWeb; the catalog itself sits behind the login',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No enrichment-class catalog is public — LionsWeb registration is login-gated, so class names, days, grades and fees are not published. Third-party listings name piano/guitar/voice lessons, painting, and an After School Children’s Choir (grades 3–5).',
      },
    ],
    sources: [
      { label: 'covenantday.org — Extended Day', url: EXTENDED_DAY },
      { label: 'covenantday.org — Admissions FAQs (bell schedule, free before-care)', url: FAQS },
    ],
  },

  cost: {
    headline:
      'One ladder, multiplied: $58–$248 a month per 90-minute session by days per week — so the real cost is how many sessions your dismissal time forces.',
    subhead:
      'August and December bill at exactly half, which is why the school’s own annual table ($522–$6,696 "for 10 Months") is cheaper than ten times the monthly rate.',
    basis: 'monthly',
    periods: 10,
    periodsLabel: '10 billing months (Aug & Dec at half rate)',
    columnsVerified: [true, true, true, true, true],
    defaultRow: 'g18-two',
    defaultDays: 5,
    rows: [
      {
        id: 'jkk-three',
        label: 'JK–K · to 6:00 (3 sessions)',
        panelLabel: 'JK & Kindergarten · 1:30–6:00 pm, all three sessions',
        prices: [174, 336, 486, 618, 744],
      },
      {
        id: 'g18-two',
        label: 'Gr 1–8 · to 6:00 (2 sessions)',
        panelLabel: 'Grades 1–8 · dismissal–6:00 pm, two sessions',
        prices: [116, 224, 324, 412, 496],
      },
      {
        id: 'one-session',
        label: 'Any grade · 1 session',
        panelLabel: 'One 1.5-hour session (e.g. dismissal–4:30 pm)',
        prices: [58, 112, 162, 206, 248],
      },
    ],
    aside: {
      title: 'The school’s own annual table is the cheaper way to buy it.',
      text: 'Priced "for 10 Months," one session five days a week is **$2,232** (vs. $2,480 at 10× monthly) and the full three-session, five-day JK/K stack is **$6,696** — the half-rate August and December are baked in. Before-school care from 7:30 a.m. is free either way.',
    },
    fees: [
      { label: 'Drop-in', value: '$20 / session' },
      { label: 'Before-school care (7:30 a.m.–start)', value: 'free' },
      { label: 'Registration fee', value: 'none published' },
      { label: 'Late-pickup fee', value: 'none published' },
      {
        label: 'The multi-session rows above are the per-session ladder **summed by the researcher** — the school prices sessions individually ($20 drop-in to $248/month) and publishes the stacked totals only on its annual table.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'estimate',
        text: 'Multi-session monthly totals (e.g. **$744/mo** for JK/K to 6:00) are derived by stacking the school’s published per-session rates; the school’s own published figure for that arrangement is the annual **$6,696**. The single-session column is verbatim.',
      },
      {
        kind: 'verify',
        text: 'Rates are undated on the Extended Day page — confirm they are current for 2026–27 before budgeting.',
      },
    ],
    sources: [
      { label: 'covenantday.org — Extended Day (monthly + annual tables)', url: EXTENDED_DAY },
    ],
  },

  /* `dayInside` — intentionally omitted. One sentence of program description
     and a login-gated class catalog: nothing to draw. See the file header. */

  verdict: {
    headline:
      'The most parent-friendly entry price in this set — free morning care, $20 drop-ins — with a session system that quietly triples for the youngest families.',
    subhead:
      'Coverage matches the 6:00 p.m. peer standard; the catalog opacity is the one real gap.',
    strengths: [
      '**Free before-school care from 7:30 a.m., school-wide** — every peer here charges for morning care. The Wednesday 8:50 late start is absorbed free too.',
      '**Genuine flexibility**: $20 drop-ins, day-count tiers from one to five days, and an annual table with the half-rate months already priced in.',
      '**Coverage to 6:00 p.m. for JK–8** matches the best pickup time in this comparison.',
      '**The published pricing is complete and current-looking** — monthly and annual tables both, on a live page, with the August/December rule stated in plain words.',
    ],
    watchouts: [
      '**The session system compounds for JK/K**: a 1:30 dismissal means three stacked sessions to reach 6:00 — $744 a month at the monthly rate, against a single-session headline of $248 that is easy to misread as the full cost.',
      '**No aftercare for grades 9–12** — high schoolers dismiss at 3:15 into athletics or activities, not a supervised program.',
      '**The enrichment catalog is invisible** — five category names and a login wall. No class, day, grade band or fee is public.',
      '**No late-pickup fee is published**, which usually means one exists in the parent handbook — ask.',
    ],
    checklist: [
      'Are the posted Extended Day rates current for 2026–27, and when do they reset?',
      'What enrichment classes actually run this year on LionsWeb, on what days, and at what fees?',
      'What happens after 6:00 p.m. — is there a late-pickup charge, and how is it billed?',
      'Does Extended Day run on early-dismissal and conference days?',
      'For JK/K families: can a child attend only the 1:30–3:00 session on some days and stay to 6:00 on others, mixing day-counts across sessions?',
    ],
    flags: [],
    sources: [
      { label: 'covenantday.org — Extended Day', url: EXTENDED_DAY },
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
