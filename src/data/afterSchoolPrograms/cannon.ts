// Cannon School — After School (ASP) and Beyond the Bell.
//
// Transcribed from source-material/after-school/cannon/ — principally
// "Cannon - After School - Redesign Research 2026.md", which carries the source
// URLs.
//
// Cannon is the third billing basis in this set: it publishes a single ANNUAL
// figure per days-per-week tier, not a monthly or per-semester rate. So this
// entry uses `basis: 'annual'` and the estimate panel drops its school-year line
// (the published number already IS the school-year total).
//
// Two things make this entry unusual. First, the rate card was very nearly lost:
// it survives only on an orphaned `backup-copy-` URL, inside a collapsed
// accordion, after the live Back-to-School Center was emptied and portal-gated
// for 2026-27. An earlier research pass concluded — reasonably, from the pages
// it checked — that Cannon published nothing. Second, the surviving rates are
// 2025-26 rather than 2026-27, so the whole matrix is flagged stale rather than
// presented as current.
//
// Cannon also has by far the richest published enrichment catalog of the six:
// 22 Beyond the Bell classes in a single session, each with a real day, grade
// band, provider and per-class fee.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* Cannon's whole day is compressed — every division dismisses at 3:00 — so the
   timeline spans 2 pm → 6 pm and each hour is 0.25 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 14) / 4

export const cannon: AfterSchoolProgram = {
  coverage: {
    headline:
      'One uniform program covers JrK through grade 8 from 3:00 to 6:00 p.m. — no age-based cutoff, no split between Lower and Middle School, and a genuine drop-in option.',
    subhead:
      'Upper School has nothing. Every division dismisses at 3:00, so the coverage question here is simply whether a child is in grade 8 or below.',
    hours: ['2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'JrK – Grade 8',
        dismissal: 'dismissal 3:00',
        startFrac: frac(15),
        endFrac: frac(18),
        tiers: [],
        flatLabel: 'After School Program · 3:00–6:00 · from $1,018/yr or $11.50/hr drop-in',
      },
      {
        division: 'Grades 9–12',
        dismissal: 'dismissal 3:00',
        startFrac: frac(15),
        endFrac: frac(18),
        tiers: [],
        uncovered: true,
        flatLabel: 'No after-school program — ASP is JrK–8 only',
      },
      {
        division: 'Early-dismissal days',
        dismissal: 'dismissal 11:45',
        startFrac: 0,
        endFrac: frac(16),
        tiers: [],
        flatLabel: 'ASP runs 11:45–4:00 — pack a lunch, the cafeteria is closed',
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: '**Camp Cannon** — ages 4–18, 8 June to 31 July 2026, open to non-Cannon families. Before care 7:30–9:00 a.m. $50/wk, after care 4:00–5:30 p.m. $60/wk, or $90/wk combined. RNs and a certified athletic trainer on site.',
    },
    facts: [
      {
        label: 'Middle School',
        text: 'students are supervised only until **3:15 p.m.** — after that they are sent to After School Care and billed, whether or not the family opted in',
      },
      {
        label: 'Before school',
        text: 'no paid program — free arrival from 7:30 a.m. only',
      },
      {
        label: 'Dismissal changes',
        text: 'must be submitted via Veracross by **1:00 p.m.** the same day',
      },
      { label: 'Snack', text: 'nut-free snacks provided daily; some may contain dairy or gluten' },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Teacher-workday and holiday coverage is not published at all — only early-dismissal days are addressed.',
      },
      {
        kind: 'gap',
        text: 'JrK and Kindergarten dismissal is not published separately; both are grouped under Lower School’s 3:00 p.m.',
      },
      {
        kind: 'verify',
        text: 'The school uses two names for one program — **ASP** on the program page and **ASC** (After School Care) in the Middle School handbook — which suggests the documentation is not tightly maintained.',
      },
    ],
    sources: [
      {
        label: 'cannonschool.org — After School Program',
        url: 'https://www.cannonschool.org/cannon-life/after-school-program',
      },
      {
        label: 'cannonschool.org — School Hours (all dismissal times)',
        url: 'https://www.cannonschool.org/academics/back-to-school-center/school-hours',
      },
      {
        label: 'cannonschool.org — Back-to-School Center backup (ASP hours, snack policy)',
        url: 'https://www.cannonschool.org/backup-copy-back-to-school-center',
      },
      {
        label: 'cannonschool.org — Middle School Handbook 2025-26 (the 3:15 rule, PDF)',
        url: 'https://resources.finalsite.net/images/v1754505716/cannonschoolorg/hy4jngrrp0al9xilkfgh/Middle_School_Student-Parent_Handbook_2025-2026.pdf',
      },
      {
        label: 'cannonschool.org — Camp Cannon',
        url: 'https://www.cannonschool.org/cannon-life/camp-cannon',
      },
    ],
  },

  cost: {
    headline:
      'Cannon prices After School as a single annual contract by days per week — with a real drop-in alternative at $11.50 an hour and no contract at all.',
    subhead:
      'These rates are 2025-26, the most recent published, and they survive only on an orphaned backup page — the live fee pages carry no dollar figures whatsoever.',
    basis: 'annual',
    periods: 1,
    periodsLabel: 'annual contract',
    columnsVerified: [true, true, true, true, true],
    defaultRow: 'asp',
    defaultDays: 5,
    rows: [
      {
        id: 'asp',
        label: 'JrK–Gr 8 · 3:00–6:00',
        panelLabel: 'JrK–Grade 8 · 3:00–6:00 pm',
        prices: [1018, 1904, 2658, 3290, 3784],
      },
    ],
    aside: {
      title: 'Or skip the contract entirely.',
      text: 'Drop-in is **$11.50 an hour** with no commitment. A family needing two afternoons a month pays roughly **$100 a year** instead of $1,904 — the most forgiving occasional-use option in this set.',
    },
    fees: [
      { label: 'Registration fee', value: '$25' },
      { label: 'Registration fee if enrolled early', value: 'waived' },
      { label: 'Drop-in care', value: '$11.50 / hr' },
      { label: 'Late pickup', value: '$1.00 / min' },
      {
        label: 'Registration runs through Veracross. The **$1/minute late fee applies to drop-in families too** — 20 minutes late is $20, nearly double the hourly rate. The registration waiver was tied to enrolling before 1 August in 2025-26; whether it repeats is not published.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'stale',
        text: 'Every figure above is **2025-26, not 2026-27**. No current rate card is published anywhere — the live Back-to-School Center was emptied and now simply points families to the My Cannon Portal. Treat these as a one-cycle-old floor and expect an increase.',
      },
      {
        kind: 'gap',
        text: 'The pricing is effectively hidden from prospective families. The rate card exists only on an orphaned backup URL inside a collapsed accordion; the program page, the tuition page and the official Non-Tuition Fees PDF all omit it — that PDF even lists "After School Program" and "Beyond the Bell" as fee-bearing while assigning them no amount, though it prices everything else down to a $98 AP exam.',
      },
      {
        kind: 'gap',
        text: 'Sibling discounts, financial-aid applicability to After School, and the billing cadence — annual up front, per semester, or monthly — are all unpublished.',
      },
      {
        kind: 'verify',
        text: 'The ladder rewards heavy users: five days ($3,784) costs only about **3.7× the one-day rate**, so the marginal day gets steadily cheaper. Five-day care is roughly 13% of JrK tuition.',
      },
    ],
    sources: [
      {
        label: 'cannonschool.org — Back-to-School Center backup (the surviving ASP rate card)',
        url: 'https://www.cannonschool.org/backup-copy-back-to-school-center',
      },
      {
        label: 'cannonschool.org — Tuition and Fees (publishes tuition, but no after-school line)',
        url: 'https://www.cannonschool.org/admission/tuition-and-fees',
      },
      {
        label: 'cannonschool.org — 2024-25 Non-Tuition Fees & Expenses (PDF)',
        url: 'https://resources.finalsite.net/images/v1705528025/cannonschoolorg/nisncbajgzs0ptdrj7qn/AllSchool24-25Non-TuitionFeesExpenses.pdf',
      },
    ],
  },

  dayInside: {
    headline:
      'The school describes homework help, sports, art, cooking, nature and a garden — but never says when any of it happens.',
    subhead:
      'What Cannon does publish in real detail is Beyond the Bell: three 10-week enrichment sessions a year, with a genuine day, grade band, provider and fee for every class.',
    rhythm: [],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'safe, nurturing environment',
      'homework assistance',
      'play sports',
      'art activities',
      'cook',
      'explore nature',
      'the garden',
    ],
    wordsText:
      '"Cannon School’s After School Program (ASP) provides students in grades JrK - 8 with a safe, nurturing environment. Students have the opportunity to receive assistance with their homework, play sports, participate in art activities, cook, discover and explore nature, and experience cultivating and observing our garden." The school adds that experiences "foster their individual, developmental, social, and emotional needs" so that "the students truly become adaptive experts". The Admission FAQs stress the flexibility: care "can be used on an as-needed, drop-in basis".',
    catalogTitle: 'Beyond the Bell — Session 3, spring 2026',
    catalogIntro:
      'Three 10-week sessions run each year for JrK–grade 8, plus private music lessons. The 22 classes below are the most recent published catalog, **9 March to 22 May 2026** — recovered from the school’s own session brochure. Fees are shown per class and per session. Note that Beyond the Bell is a **separate purchase from ASP**: a 3:00–4:00 class does not cover you to 6:00.',
    dayFilters: ['All', 'Mon', 'Tue', 'Wed', 'Thu'],
    gradeFilters: ['All', 'JrK', 'K', '1', '2', '3', '4', '5', '6', '7', '8'],
    classes: [
      { name: '3 v. 3 Basketball', desc: 'Small-sided games with Kelli Waller', day: 'Mon', grades: ['2', '3', '4', '5', '6'], gradeLabel: '2–6', fee: '$22/class · $176' },
      { name: 'Jr. Cannon Cheer', desc: 'Cheer fundamentals with Nash & Colacion', day: 'Mon', grades: ['JrK', 'K', '1', '2'], gradeLabel: 'JrK–2', fee: '$25/class · $200' },
      { name: 'Engineering Design', desc: 'Build-and-test challenges run by BrickEd', day: 'Mon', grades: ['K', '1', '2'], gradeLabel: 'K–2', fee: '$25/class · $200' },
      { name: 'Kaleidoscope of Crafts', desc: 'Mixed-media making with McKinsey & Raphael', day: 'Mon', grades: ['2', '3', '4'], gradeLabel: '2–4', fee: '$25/class · $200' },
      { name: 'LEGO Robotics Team', desc: 'Team build-and-program with Lisa Nussbaumer', day: 'Mon', grades: ['3', '4', '5'], gradeLabel: '3–5', fee: '$23/class · $184' },
      { name: 'Puppet Playhouse', desc: 'Puppet making and performance with Rhiannon Bresalier', day: 'Mon', grades: ['JrK', 'K', '1', '2'], gradeLabel: 'JrK–2', fee: '$20/class · $160' },
      { name: 'Baking with Chef Craig', desc: 'Kitchen skills and recipes with Craig Rosekrans', day: 'Tue', grades: ['1', '2', '3'], gradeLabel: '1–3', fee: '$25/class · $250' },
      { name: 'Art on The Go', desc: 'Run by AR Workshop Concord; 3:00–4:30', day: 'Tue', grades: ['3', '4', '5', '6', '7', '8'], gradeLabel: '3–8', fee: '$25/class · $250' },
      { name: 'Motion Makers', desc: 'Dance with Art in Motion Dance', day: 'Tue', grades: ['K', '1', '2'], gradeLabel: 'K–2', fee: '$20/class · $200' },
      { name: 'Nature Games', desc: 'Outdoor exploration and games with Kelli Waller', day: 'Tue', grades: ['JrK', 'K', '1', '2', '3', '4'], gradeLabel: 'JrK–4', fee: '$22/class · $220' },
      { name: 'CSF Soccer Academy', desc: 'Coached by Carolina Soccer Factory', day: 'Tue', grades: ['K', '1', '2', '3', '4', '5', '6'], gradeLabel: 'K–6', fee: '$25/class · $250' },
      { name: 'Wonder Lab: Art & Science', desc: 'Cross-disciplinary making with Mayo & Cavicchi', day: 'Tue', grades: ['JrK', 'K', '1'], gradeLabel: 'JrK–1', fee: '$25/class · $250' },
      { name: 'Ballet Class', desc: 'Taught by Le Petit Ballet Co.', day: 'Wed', grades: ['JrK', 'K', '1', '2'], gradeLabel: 'JrK–2', fee: '$30/class · $300' },
      { name: 'Beginner String Orchestra', desc: 'Ensemble strings with Anne Marie Samuel', day: 'Wed', grades: ['1', '2', '3', '4', '5', '6', '7', '8'], gradeLabel: '1–8', fee: '$30/class · $300' },
      { name: 'Golf Academy', desc: 'Run by Better Golf for Kids', day: 'Wed', grades: ['K', '1', '2', '3', '4', '5'], gradeLabel: 'K–5', fee: '$25/class · $250' },
      { name: 'Junior Sculptors', desc: 'Three-dimensional art with Alex Bresalier', day: 'Wed', grades: ['JrK', 'K', '1', '2'], gradeLabel: 'JrK–2', fee: '$20/class · $200' },
      { name: "Let's Get Organized", desc: 'Executive-function skills for Middle School, with Sherrill & O’Brien', day: 'Wed', grades: ['5', '6', '7', '8'], gradeLabel: '5–8', fee: '$25/class · $250' },
      { name: 'Young Athlete Performance (YAPP)', desc: 'Athletic development with Donnie Hayes', day: 'Wed', grades: ['2', '3', '4'], gradeLabel: '2–4', fee: '$18/class · $180' },
      { name: 'Hands On History', desc: 'Object-based history with Stephanie Lee', day: 'Thu', grades: ['4', '5', '6', '7', '8'], gradeLabel: '4–8', fee: '$20/class · $200' },
      { name: 'Introduction to Photography', desc: 'Camera basics and composition with Danielle Sandlof', day: 'Thu', grades: ['3', '4', '5', '6'], gradeLabel: '3–6', fee: '$20/class · $200' },
      { name: 'Make It Melt! Perler Beads', desc: 'Bead art with Dobbins & Fox', day: 'Thu', grades: ['K', '1', '2', '3', '4'], gradeLabel: 'K–4', fee: '$25/class · $250' },
      { name: 'Masterpiece Makers', desc: 'Painting and drawing with Danielle Lucas', day: 'Thu', grades: ['K', '1', '2', '3'], gradeLabel: 'K–3', fee: '$25/class · $250' },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Private music lessons run alongside for K–8: cello $25/class (Mon/Wed), guitar $25 (Wed/Fri), voice $30 (Tue/Thu), piano $30 (Mon/Tue/Thu) and violin or viola $30 (Tue/Thu).',
      },
      {
        kind: 'stale',
        text: 'This is the **2025-26 Session 3** catalog — the newest published. No 2026-27 Beyond the Bell catalog has been posted yet, so the specific classes will change even though the price band and structure are likely to hold.',
      },
      {
        kind: 'gap',
        text: 'No hour-by-hour daily rhythm and no staff-to-child ratios are published for the After School Program itself, and Middle School has no separate program description — grades 5–8 sit inside the same JrK–8 program.',
      },
    ],
    sources: [
      {
        label: 'cannonschool.org — Beyond the Bell enrichment program',
        url: 'https://www.cannonschool.org/cannon-life/beyond-the-bell-enrichment-program',
      },
      {
        label: 'issuu.com — Beyond the Bell Session 3, 2025-26 catalog',
        url: 'https://issuu.com/cannonschool/docs/beyond_the_bell_session_3',
      },
      {
        label: 'cannonschool.org — After School Program',
        url: 'https://www.cannonschool.org/cannon-life/after-school-program',
      },
      {
        label: 'cannonschool.org — Admission FAQs',
        url: 'https://www.cannonschool.org/admission/admission-faqs',
      },
    ],
  },

  verdict: {
    headline:
      'The most flexible program here for occasional users, with the deepest published enrichment catalog — wrapped in pricing that is technically public but practically invisible.',
    subhead:
      'The rate card survives only on an orphaned backup page, the figures are a year old, and grades 9–12 get nothing.',
    strengths: [
      '**Long, uniform coverage** — 3:00 to 6:00 p.m. every regular day across the whole JrK–8 span, with no age-based cutoff and no split Lower/Middle program.',
      '**Early-dismissal days are covered**, 11:45 a.m.–4:00 p.m., which several peers here do not do at all.',
      '**True drop-in at $11.50 an hour with no contract.** A family needing two afternoons a month pays around $100 a year rather than committing to $1,904 — the most forgiving occasional-use model in this set.',
      '**A sharp price ladder** — five days costs only about 3.7× the one-day rate, so heavy users get a real discount rather than a linear bill.',
      '**The deepest published enrichment catalog of the six** — 22 distinct classes in a single session spanning robotics, ballet, chess, pottery, golf and photography, each with a named provider and a real fee.',
      '**Enrichment is modestly priced and transparent** — $18–$30 per class, mostly $144–$300 for a 10-week session, with full refunds for cancelled classes and a make-up week.',
      '**An executive-function class for Middle School** ("Let’s Get Organized") — a genuinely unusual offering at this age.',
    ],
    watchouts: [
      '**No after-school coverage for grades 9–12 at all.** A family with an Upper Schooler and a Lower Schooler gets care for only one.',
      '**The pricing is practically hidden.** The rate card exists only on an orphaned backup URL inside a collapsed accordion, while the live page, the tuition page and the official fee PDF all omit it. A family doing normal research will not find it.',
      '**The published rates are 2025-26**, so expect an increase for 2026-27 that is not yet knowable.',
      '**The $1/minute late fee is steep and applies to drop-in families too** — 20 minutes late costs $20, nearly double the hourly rate.',
      '**Enrichment and care are separate purchases.** A 3:00–4:00 Beyond the Bell class does not cover you to 6:00, so the costs stack.',
      '**The Middle School 3:15 rule can bill you in without an opt-in** — a parent 20 minutes late for a 3:00 pickup may find their child moved into paid care.',
      '**No published daily rhythm and no staff-to-child ratios**, so you cannot tell how much of the three hours is homework versus free play.',
      '**Teacher workdays and holidays are unaddressed**, and there is no paid before-school care — only free arrival from 7:30 a.m.',
    ],
    checklist: [
      'What are the 2026-27 rates, and where are they published for prospective families? The only card I could find is 2025-26 and lives on a backup page.',
      'Is there coverage on teacher workdays, conference days and school holidays, and at what rate?',
      'What is the actual daily rhythm — how much homework time, and what is the staff-to-child ratio? Does it differ for JrK versus grade 8?',
      'Is the $25 registration-fee waiver repeating for 2026-27, and what is the deadline?',
      'How is the program billed — annually up front, per semester, or monthly? Can we switch tiers mid-year?',
      'Are there sibling discounts, or any financial aid applicable to After School or Beyond the Bell?',
      'If my child does a 3:00–4:00 Beyond the Bell class, am I charged for 4:00–6:00 on top, and does that day count against my contracted days?',
      'In Middle School, does the 3:15 auto-enrolment trigger a drop-in charge, and how are we notified?',
      'Is there any supervised space, study hall or activity bus for grades 9–12 after 3:00?',
      'On early-dismissal days, does the program end firmly at 4:00 p.m., and does the $1/minute fee start then?',
    ],
    flags: [],
    sources: [
      {
        label: 'cannonschool.org — After School Program',
        url: 'https://www.cannonschool.org/cannon-life/after-school-program',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
