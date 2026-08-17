// Carmel Christian School — After School (Extended Day Program).
//
// Transcribed from source-material/after-school/carmel-christian/ —
// "Carmel Christian - After School - Extended Day.md", which carries the source
// URLs. The strong artifact is the 2026-2027 Extended Day Handbook (7 pp.,
// "updated February 2026"), which publishes a complete PROGRAM COSTS table with
// 5-day, 3-day and drop-in rates for every session — so the Cost Planner is
// fully published and nothing on it is modeled.
//
// Two structural facts shape the cards. First, the afternoon splits by division:
// Young Cougars Club (YCC) is the K afternoon program running 1:15–3:00, and
// After School / After YCC runs 3:00–6:00 for grades 1–8 (and for YCC children
// after 3:00). Second, the 2026-27 enrichment and music-lesson list is NOT YET
// PUBLISHED ("coming August 2026"), so the enrichment catalog is empty and the
// gap is stated rather than filled.
//
// Not published, and rendered as gaps rather than guessed: registration fee,
// sibling discount, and any annual dollar total (the handbook bills monthly over
// 9 months but publishes no year figure).

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The coverage timeline spans 1 pm → 6 pm, so each hour is 0.2 of the window.
   Before School (7:30–8:00 am) falls outside this window and is carried in the
   facts row, the way Providence Day carries its morning arrival. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 13) / 5

export const carmelChristian: AfterSchoolProgram = {
  coverage: {
    headline:
      'The Extended Day Program covers K through grade 8 until 6:00 p.m., split between the kindergarten Young Cougars Club and After School care for grades 1–8.',
    subhead:
      'Before-school care opens at 7:30 a.m. for CCS students, and a longer WEE-School sibling window runs to 9:00 a.m. The whole program is built on the school’s “Grow and Go” mission — “GROW to become followers of Christ and GO make Him known to the world.”',
    hours: ['1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    basisNote:
      'Prices on the bars are the **full-time monthly rate — 5 days a week**, billed over 9 months. Each session is also sold at 3 days a week for less, and drop-in at a flat per-day rate; open **The Cost Planner** below to price any combination.',
    rows: [
      {
        division: 'Young Cougars Club (K)',
        dismissal: 'starts 1:15',
        startFrac: frac(13, 15),
        endFrac: frac(15),
        tiers: [{ until: '3:00', price: '$230/mo', endFrac: frac(15) }],
      },
      {
        division: 'After School / After YCC',
        dismissal: 'grades 1–8 · K after YCC',
        startFrac: frac(15),
        endFrac: frac(18),
        tiers: [{ until: '6:00', price: '$245/mo', endFrac: frac(18) }],
      },
    ],
    facts: [
      {
        label: 'Before school',
        text: 'CCS students **7:30–8:00 a.m.** ($110/mo 5-day); CCS siblings in the WEE School run **7:30–9:00 a.m.** ($220/mo 5-day)',
      },
      {
        label: 'After YCC',
        text: 'kindergarten YCC children join the elementary After School group for the last hour at **5:00 p.m.**; Middle School students arrive by 3:30',
      },
      { label: 'Latest pickup', text: '6:00 p.m.' },
      { label: 'Drop-in', text: '$30/day per student for YCC and After School' },
      {
        label: 'Late pickup',
        text: '$10 for the first 10 minutes, then $10 for each additional 10 minutes',
      },
      {
        label: 'Closed',
        text: 'the Friday before Christmas break and the last day of school; YCC and After School run a shortened schedule on early-dismissal days',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'A free **Morning Sibling Care** exists at 7:35 a.m. in the Worship Center, but it is NOT part of the paid Extended Day program — it is separate supervised early drop-off.',
      },
      {
        kind: 'gap',
        text: 'The 2026-2027 web overview shows Extended Day as **“Registration for 2026-2027 is now full.”** That is an operational capacity status, not a change to the published hours or prices, but it means a mid-year applicant may face a waitlist.',
      },
    ],
    sources: [
      {
        label: 'carmelchristian.org — Extended Day overview (mission, program list, status)',
        url: 'https://carmelchristian.org/extended-day',
      },
      {
        label: 'carmelchristian.org — After School Care (hours, homework, MS space)',
        url: 'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487137&type=d&pREC_ID=1082888',
      },
      {
        label: 'carmelchristian.org — Before School Care (hours)',
        url: 'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487137&type=d&pREC_ID=1082894',
      },
      {
        label: 'carmelchristian.org — 2026-2027 Extended Day Handbook (the cost table, PDF)',
        url: 'https://www.carmelchristian.org/pdf/Extended_Day%20Handbook_26-27.pdf',
      },
    ],
  },

  cost: {
    headline:
      'Every session is priced as a flat monthly rate by days per week — 5-day, 3-day, or drop-in — billed monthly over 9 months through FACTS.',
    subhead:
      'All rates below are published in the school’s 2026-2027 Extended Day Handbook, so nothing here is projected. The rate does not scale linearly with days, so a 3-day schedule is its own published figure rather than a fraction of the 5-day price.',
    basis: 'monthly',
    periods: 9,
    periodsLabel: '9 billing months',
    /* Only the 3-day (index 2) and 5-day (index 4) columns are published; the
       1-, 2- and 4-day columns are not offered as separate rates. */
    columnsVerified: [false, false, true, false, true],
    defaultRow: 'after-36',
    defaultDays: 5,
    rows: [
      {
        id: 'before-ccs',
        label: 'Before School · 7:30–8:00',
        panelLabel: 'Before School (CCS students) · 7:30–8:00 am',
        prices: [null, null, 75, null, 110],
      },
      {
        id: 'before-wee',
        label: 'Before School · WEE sibling · 7:30–9:00',
        panelLabel: 'Before School (CCS sibling in WEE School) · 7:30–9:00 am',
        prices: [null, null, 130, null, 220],
      },
      {
        id: 'ycc-13',
        label: 'Young Cougars Club · 1:15–3:00',
        panelLabel: 'Young Cougars Club (K) · 1:15–3:00 pm',
        prices: [null, null, 175, null, 230],
      },
      {
        id: 'after-36',
        label: 'After School / After YCC · 3:00–6:00',
        panelLabel: 'After School / After YCC · 3:00–6:00 pm',
        prices: [null, null, 190, null, 245],
      },
    ],
    fees: [
      { label: 'Billed', value: 'monthly over 9 months (FACTS / Family Portal)' },
      { label: 'Drop-in (YCC & After School)', value: '$30 / day per student' },
      { label: 'Drop-in (Before School, CCS)', value: '$10 / day' },
      { label: 'Drop-in (Before School, WEE sibling)', value: '$20 / day' },
      {
        label: 'Late pickup',
        value: '$10 first 10 min, then $10 / additional 10 min',
      },
      { label: 'Registration fee', value: 'not published' },
      { label: 'Sibling discount', value: 'not published' },
      {
        label: 'Enrollment is 5-day, 3-day, or drop-in, first-come first-serve and space-limited. The WEE-School Before School tier is a separate rate for CCS siblings in the WEE School, not a discount on the standard rate.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No annual dollar total is published. The handbook gives monthly rates billed over **9 months** but never states a school-year figure, so the totals here are the monthly rate × 9.',
      },
      {
        kind: 'gap',
        text: 'No registration fee and no sibling discount are published for Extended Day. Neither is stated to exist or not exist — they are simply absent from the handbook.',
      },
      {
        kind: 'verify',
        text: 'Only 5-day and 3-day rates are published for each session — there is no separate 1-, 2- or 4-day rate, so the intermediate columns show “—.” Occasional days go through the flat drop-in rate instead.',
      },
    ],
    sources: [
      {
        label: 'carmelchristian.org — 2026-2027 Extended Day Handbook (the full cost table, PDF)',
        url: 'https://www.carmelchristian.org/pdf/Extended_Day%20Handbook_26-27.pdf',
      },
      {
        label: 'carmelchristian.org — Extended Day overview',
        url: 'https://carmelchristian.org/extended-day',
      },
    ],
  },

  dayInside: {
    headline:
      'The kindergarten afternoon is the Young Cougars Club — a structured, literature-based program, not a holding room — while grades 1–8 move into After School care with homework space.',
    subhead:
      'Young Cougars Club runs three rotations — story, art and activities — around a weekly educational theme, then joins the elementary After School group for the last hour of the day.',
    rhythmTitle: 'The kindergarten afternoon (Young Cougars Club)',
    rhythm: [
      {
        time: '1:15',
        name: 'YCC begins',
        detail:
          'Kindergarten children gather for the structured, literature-based afternoon around the week’s theme',
      },
      {
        time: 'Rotations',
        name: 'Story · art · activities',
        detail:
          'Three rotations — a story block, an art block and an activities block — built on “exciting and educational weekly themes”',
      },
      {
        time: '3:00',
        name: 'Into After Care',
        detail:
          'YCC children move into After School care alongside grades 1–8; Middle School students arrive by 3:30',
      },
      {
        time: '5:00',
        name: 'One group',
        detail:
          'After-YCC children join the elementary After School group for the final hour, through 6:00 p.m. pickup',
      },
    ],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'Grow and Go',
      'structured',
      'literature based',
      'weekly themes',
      'story · art · activities',
      'homework space',
    ],
    wordsText:
      'The Extended Day mission is “GROW to become followers of Christ and GO make Him known to the world” (Matthew 28:19–20) — the “Grow and Go” framing. Young Cougars Club is described as “a structured, literature based program with 3 rotations (story, art and activities) with exciting and educational weekly themes.” After School care for grades 1–8 provides space for homework, with a separate area for Middle School students.',
    catalogTitle: 'Enrichment & music lessons',
    catalogEstimated: false,
    catalogIntro:
      'Extended Day offers Enrichment Classes and Music Enrichment Lessons within the program, but the **2026-2027 offerings are not yet published** — the school lists them as “coming August 2026,” so no class names, days, grades or fees exist to show yet.',
    dayFilters: [],
    gradeFilters: [],
    classes: [],
    flags: [
      {
        kind: 'gap',
        text: 'The **2026-2027 enrichment and music-lesson list is not yet published** (“coming August 2026”). No class names, instructors, days, grade bands or per-class fees are available for the coming year.',
      },
      {
        kind: 'gap',
        text: 'No staff-to-child ratio or group size is published for YCC or After School care, and no hour-by-hour schedule is given for the grades 1–8 afternoon beyond “homework space.”',
      },
    ],
    sources: [
      {
        label: 'carmelchristian.org — Extended Day overview (mission, YCC description, program list)',
        url: 'https://carmelchristian.org/extended-day',
      },
      {
        label: 'carmelchristian.org — After School Care (homework, Middle School space)',
        url: 'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487137&type=d&pREC_ID=1082888',
      },
    ],
  },

  verdict: {
    headline:
      'A single K–8 program that covers the whole work day — 7:30 a.m. to 6:00 p.m. — with fully published, plainly priced rates and a genuinely structured kindergarten afternoon.',
    subhead:
      'The open questions are capacity (the year is already “full”), the missing enrichment list, and the unpublished registration fee and sibling discount — exactly what a visit answers.',
    strengths: [
      '**Whole-work-day coverage in one program** — before care from 7:30 a.m. and After School to 6:00 p.m., spanning kindergarten through grade 8 without a division gap.',
      '**Fully published, readable pricing** — every session has a 5-day, 3-day and drop-in rate in the handbook, so a family can compute its exact monthly cost before applying.',
      '**A structured, literature-based kindergarten afternoon** — Young Cougars Club runs story, art and activities rotations on weekly themes, not undifferentiated supervision.',
      '**A flat drop-in rate exists** — $30/day for YCC and After School — so occasional-need families are not forced into a full contract.',
      '**Homework space for grades 1–8**, with a separate area for Middle School students who arrive by 3:30.',
      '**A mission-driven, explicitly Christian framing** — the “Grow and Go” mission runs through the whole program.',
    ],
    watchouts: [
      '**The 2026-2027 year is already listed as full.** A family applying now may face a waitlist rather than open enrollment.',
      '**The enrichment and music-lesson list is not published** for 2026-27 — promised “August 2026,” so families cannot yet see what classes or instruments are offered, on what days, or at what cost.',
      '**No registration fee or sibling discount is published**, so the true cost for a multi-child family cannot be computed from the handbook alone.',
      '**No annual dollar total is stated** — only monthly rates billed over 9 months, so the year figure must be derived.',
      '**Only 5-day and 3-day contracts are offered**, with no 2- or 4-day rate; anything in between goes through the flat drop-in rate.',
      '**No staff-to-child ratio is published** for either YCC or After School care.',
      '**Late pickup compounds** at $10 per 10 minutes, with no stated cap.',
    ],
    checklist: [
      'Is the 2026-2027 program truly full, and is there a waitlist? How far down are we, and when do spots typically open?',
      'When will the 2026-27 enrichment and music-lesson list be posted, and what classes and instruments are planned?',
      'Is there a registration fee for Extended Day, and is it per child or per family?',
      'Is there any sibling discount across the Before School, YCC and After School rates?',
      'How many months is Extended Day billed — is it exactly 9, and are there any months (December, June) that are prorated?',
      'What is the staff-to-child ratio in Young Cougars Club and in After School care?',
      'What does the grades 1–8 afternoon actually look like hour by hour — when is snack, homework, outdoor time?',
      'Can we change between 5-day, 3-day and drop-in mid-year, and is there a fee to do so?',
      'How is the late-pickup fee assessed, and is there any cap?',
      'Does financial aid apply to Extended Day at all, and to enrichment or music lessons?',
      'What is Morning Sibling Care at 7:35 a.m., and does it cost anything relative to paid before care?',
    ],
    flags: [],
    sources: [
      {
        label: 'carmelchristian.org — Extended Day overview',
        url: 'https://carmelchristian.org/extended-day',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
