// Charlotte Latin School — After School (Hawks' Club).
//
// Transcribed from source-material/after-school/charlotte-latin/ — principally
// "Charlotte Latin - After School - Redesign Research 2026.md", which carries
// the source URLs.
//
// Latin is the only school here that bills PER SEMESTER rather than monthly, so
// the Cost Planner runs on `basis: 'semester'` and its estimate panel multiplies
// by 2 rather than by 9. Two published anomalies are surfaced rather than
// smoothed over: the site gives three different Grades 1–5 dismissal times, and
// the TK/K 1:30–4:30 row breaks the linear pricing pattern every other row
// follows.
//
// Note this entry supersedes the "Grades 1-5 REFUTED" finding in the older
// pricing note — that table is live and was returned identically on two
// independent fetches. See the correction header in the research file.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The timeline spans 1 pm → 6 pm, so each hour is 0.2 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 13) / 5

export const charlotteLatin: AfterSchoolProgram = {
  coverage: {
    headline:
      'Hawks’ Club covers TK through grade 5 to 6:00 p.m. from a dedicated after-school building, with two credentialed adults in every room.',
    subhead:
      'Coverage then stops dead: there is no paid after-school care for Middle or Upper School at all, and Middle School is the worst served — its library closes at dismissal.',
    hours: ['1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'TK & Kindergarten',
        dismissal: 'dismissal 1:30',
        startFrac: frac(13, 30),
        endFrac: frac(18),
        tiers: [
          { until: '2:55', price: 'from $345/sem', endFrac: frac(14, 55) },
          { until: '4:30', price: '$635', endFrac: frac(16, 30) },
          { until: '6:00', price: '$930', endFrac: frac(18) },
        ],
      },
      {
        division: 'Grades 1–5',
        dismissal: 'dismissal 2:55',
        startFrac: frac(14, 55),
        endFrac: frac(18),
        tiers: [
          { until: '4:30', price: '$295', endFrac: frac(16, 30) },
          { until: '6:00', price: '$600', endFrac: frac(18) },
        ],
      },
      {
        division: 'Middle School',
        dismissal: 'dismissal ~3:20',
        startFrac: frac(15, 20),
        endFrac: frac(18),
        tiers: [],
        uncovered: true,
        flatLabel: 'No care program — LS/MS library closes at dismissal',
      },
      {
        division: 'Upper School',
        dismissal: 'dismissal ~3:20',
        startFrac: frac(15, 20),
        endFrac: frac(17, 30),
        tiers: [],
        uncovered: true,
        flatLabel: 'No care program — US library open to 5:30 p.m.',
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: '**Latin Camps** — open to any child aged 3.5–18, seven weekly sessions 8 June to 31 July 2026, with after care to 5:30 p.m. Registration $45 per family, per season.',
    },
    facts: [
      {
        label: 'Non-school days',
        text: 'Hawks’ Club runs **full-day, 7:30 a.m.–4:45 p.m.** on teacher workdays, early-dismissal days and conference days — with field trips to museums, parks, bowling alleys and roller rinks',
      },
      { label: 'Runs', text: 'from the first day of school through the last' },
      {
        label: 'Activity buses',
        text: '4:30 p.m. for Lower School; 5:30 and 6:00 p.m. for Middle and Upper School',
      },
      {
        label: 'Fly Zone',
        text: 'not a paid program — the sibling-wait room for younger students whose older siblings dismiss later',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Latin’s own pages disagree on when Lower School dismisses. The After-School pages use **2:55** — the number the pricing table is built on — while Transportation says **3:05** for "TK-K Hawks Club students and Grades 1-5", and a third source says 3:10. Middle and Upper School are given as both 3:20 and 3:25.',
      },
      {
        kind: 'gap',
        text: 'The cost of the full-day non-school-day program is never stated — it is not said whether those days are included in the semester rate or billed on top.',
      },
      {
        kind: 'gap',
        text: 'No before-school care is published. The only morning data points are the 7:00–7:25 a.m. bus window and the 7:30 a.m. library opening.',
      },
    ],
    sources: [
      {
        label: 'charlottelatin.org — Extended Day (hours, tiers, non-school-day program)',
        url: 'https://www.charlottelatin.org/after-school/extended-day',
      },
      {
        label: 'charlottelatin.org — Hawks’ Club',
        url: 'https://www.charlottelatin.org/after-school/hawks-club',
      },
      {
        label: 'charlottelatin.org — Transportation (dismissal times, activity buses)',
        url: 'https://www.charlottelatin.org/student-life/transportation',
      },
      {
        label: 'charlottelatin.org — Library (LS/MS closes at dismissal; US to 5:30)',
        url: 'https://www.charlottelatin.org/academics/library',
      },
      { label: 'charlottelatinsummer.com — Latin Camps', url: 'https://www.charlottelatinsummer.com/' },
    ],
  },

  cost: {
    headline:
      'Hawks’ Club bills PER SEMESTER, not per month — two charges a year, on 23 September and 20 January.',
    subhead:
      'Pricing is almost perfectly linear: the N-day rate is exactly N times the 1-day rate, with no volume discount — except on one row that appears to break the pattern.',
    basis: 'semester',
    periods: 2,
    periodsLabel: '2 semesters',
    columnsVerified: [true, true, true, true, true],
    defaultRow: 'g15-6',
    defaultDays: 5,
    rows: [
      {
        id: 'tkk-255',
        label: 'TK/K · 1:30–2:55',
        panelLabel: 'TK & Kindergarten · 1:30–2:55 pm',
        prices: [345, 690, 1035, 1380, 1725],
      },
      {
        id: 'tkk-430',
        label: 'TK/K · 1:30–4:30',
        panelLabel: 'TK & Kindergarten · 1:30–4:30 pm',
        prices: [635, 1270, 1905, 2300, 2540],
      },
      {
        id: 'tkk-6',
        label: 'TK/K · 1:30–6:00',
        panelLabel: 'TK & Kindergarten · 1:30–6:00 pm',
        prices: [930, 1860, 2790, 3720, 4650],
      },
      {
        id: 'g15-430',
        label: 'Gr 1–5 · 2:55–4:30',
        panelLabel: 'Grades 1–5 · 2:55–4:30 pm',
        prices: [295, 590, 885, 1180, 1475],
      },
      {
        id: 'g15-6',
        label: 'Gr 1–5 · 2:55–6:00',
        panelLabel: 'Grades 1–5 · 2:55–6:00 pm',
        prices: [600, 1200, 1800, 2400, 3000],
      },
    ],
    aside: {
      title: 'The TK/K cost cliff.',
      text: 'TK and K dismiss at 1:30, grades 1–5 at 2:55. A TK/K family pays **$1,725 a semester — $3,450 a year — purely to cover the 85 minutes** that a grade 1 family gets for free.',
    },
    fees: [
      { label: 'Billed', value: '23 Sep & 20 Jan' },
      { label: 'Registration fee', value: 'not published' },
      { label: 'Late-pickup fee', value: 'not published' },
      { label: 'Schedule-change fee', value: 'not published' },
      { label: 'Drop-in rate', value: 'none published' },
      {
        label: 'Registration for 2026-27 opened on **14 May 2026 at 8:00 p.m.** — an evening hard-open is the signature of a program where popular classes fill in minutes.',
        note: true,
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The **TK/K 1:30–4:30 row does not compute.** Every other row is exactly linear, but this one prices 4 days at $2,300 and 5 days at $2,540 where linear would give $2,540 and $3,175 — so five days costs what four days should. Either an unadvertised volume discount on the most popular tier or a published error, and a $635-per-semester question. The same two values appeared in an earlier research pass, which favours "real".',
      },
      {
        kind: 'gap',
        text: 'Almost every ancillary fee is unpublished — registration, late pickup, schedule changes, cancellation and refunds, and any drop-in or occasional-use rate. No drop-in option is described anywhere; the model appears to be pre-registered fixed days only. Latin’s summer camp publishes all of these equivalents, so the school clearly can be transparent — the school-year program simply isn’t.',
      },
      {
        kind: 'gap',
        text: 'Financial-aid applicability is unstated, and the framing is discouraging: the tuition page files after-school under "other optional costs… transportation and our Extended Day and enrichment programs", with no statement that aid applies.',
      },
    ],
    sources: [
      {
        label: 'charlottelatin.org — Extended Day (the full 2026-27 per-semester matrix)',
        url: 'https://www.charlottelatin.org/after-school/extended-day',
      },
      {
        label: 'charlottelatin.org — After School (registration open date)',
        url: 'https://www.charlottelatin.org/after-school',
      },
      {
        label: 'charlottelatin.org — Tuition & Financial Assistance',
        url: 'https://www.charlottelatin.org/admissions/tuition-financial-assistance',
      },
    ],
  },

  dayInside: {
    headline:
      'Hawks’ Club runs out of a dedicated after-school building — not a borrowed cafeteria or gym — with a lead teacher and an assistant teacher in every classroom.',
    subhead:
      'The school publishes what the afternoon contains but never when: there is no hour-by-hour rhythm anywhere. What it does publish is how each division gets there.',
    rhythmTitle: 'How the afternoon starts, by division',
    rhythm: [
      {
        time: 'TK / K',
        name: 'Collected from class',
        detail:
          'Picked up by a Hawks’ Club teacher directly from their classrooms and taken to the building',
      },
      {
        time: 'Grades 1–5',
        name: 'Meet, register, snack',
        detail:
          'Meet a Hawks’ Club teacher at an assigned location for attendance and a snack',
      },
      {
        time: 'Then',
        name: 'On to enrichment',
        detail: 'The teacher walks them to their registered enrichment class',
      },
      {
        time: 'After class',
        name: 'Three ways out',
        detail: 'Front carpool, back to Hawks’ Club, or the Lower School bus at 4:30',
      },
    ],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'build friendships',
      'explore new interests',
      'a connected community',
      'structured & unstructured play',
      'community service',
      'mentorship',
    ],
    wordsText:
      '"A GREAT DAY DOESN’T NEED TO END" is the Hawks’ Club headline; the program is "a vibrant and engaging environment where students can build friendships, explore new interests, and be part of a connected after-school community" and "a welcoming space for children to transition from the school day to their home routines." In student voice, from the Lower School page: "Hawks’ Club gives us the space to transition from school to home each day. With plenty of activity and enrichment class options, we learn new skills, compete in sports, make friends, study, and play."',
    catalogTitle: 'The enrichment catalog — 27 classes',
    catalogEstimated: false,
    catalogIntro:
      'Latin publishes six-, eight- and ten-week enrichment classes "open to all Lower School students", taught by professional instructors. The **class names below are exactly as published** — but the school publishes no day, no grade range and no fee for any of them, so those columns are shown as not published rather than guessed.',
    dayFilters: [],
    gradeFilters: [],
    classes: [
      { name: 'Atomz Lab', desc: 'Outside provider — hands-on science', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Book Adventures', desc: 'Reading and story-based enrichment', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Cheer', desc: 'Cheerleading fundamentals', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Chess', desc: 'Strategy and tournament play', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Chicks with Sticks', desc: 'Outside provider — field hockey', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Clayworks', desc: 'Pottery and hand-building', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Cooking with Flik', desc: 'Run by Flik, the school’s dining services provider', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Creative Dance and Movement', desc: 'Movement and choreography', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'FabLab Engineering', desc: 'Design and fabrication challenges', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Field Hockey', desc: 'Stick skills and small-sided play', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Flag Football', desc: 'Non-contact football fundamentals', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Golf', desc: 'Swing fundamentals and short game', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Hands Create Art', desc: 'Mixed-media visual art', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Jewelry Designs', desc: 'Beading and jewellery making', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Karate', desc: 'Martial arts form and discipline', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Lacrosse', desc: 'Stick skills and team play', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Legos', desc: 'Building and construction challenges', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Matthews Playhouse Theatre', desc: 'Outside provider — performance and stagecraft', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Sumobots', desc: 'Competitive robot building', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Swim Mac', desc: 'Outside provider — SwimMAC Carolina', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Tennis', desc: 'Strokes and match play', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Ukulele', desc: 'Beginner string instruction', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Volleyball', desc: 'Passing, setting and game play', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Woodworking', desc: 'Hand tools and simple builds', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Wrestling', desc: 'Mat fundamentals and conditioning', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Yes I Can Basketball', desc: 'Outside provider — basketball skills', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
      { name: 'Yoga', desc: 'Poses, breathing and mindfulness', day: '—', grades: [], gradeLabel: 'LS', fee: '—' },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'Enrichment is a catalog of names with no operational detail — **no day of week, no grade range and no fee** for any of the 27 classes. The page that once carried that grid now returns a 404 and appears to have moved behind the parent portal.',
      },
      {
        kind: 'gap',
        text: 'No hour-by-hour daily schedule is published, and no staff-to-child ratio or group size is given — only that each classroom has a lead teacher and an assistant.',
      },
      {
        kind: 'verify',
        text: '**Talons** youth sports runs alongside for grades 3–6 — field hockey, basketball, baseball, lacrosse, co-ed soccer and cross country, 2–3 days a week between 3:00 and 5:15 p.m., at $200–$350 depending on sport. Only Fall sessions are published; winter and spring are not.',
      },
    ],
    sources: [
      {
        label: 'charlottelatin.org — Enrichment Programs (the 27-class catalog)',
        url: 'https://www.charlottelatin.org/after-school/enrichment-programs',
      },
      {
        label: 'charlottelatin.org — Extended Day (staffing, dedicated building, procedures)',
        url: 'https://www.charlottelatin.org/after-school/extended-day',
      },
      {
        label: 'charlottelatin.org — Talons youth sports',
        url: 'https://www.charlottelatin.org/after-school/youth-sports-recreation-program',
      },
      {
        label: 'charlottelatin.org — Lower School',
        url: 'https://www.charlottelatin.org/academics/lower-school',
      },
    ],
  },

  verdict: {
    headline:
      'An unusually well-housed and well-staffed Lower School program with honest, linear pricing — that stops completely at grade 5.',
    subhead:
      'The TK/K cost cliff and the near-total fee opacity are the two things to press on, and Middle School families should ask what happens at 3:20 p.m.',
    strengths: [
      '**A dedicated after-school building**, not a repurposed cafeteria or gym — materially better for a child spending three-plus hours a day there.',
      '**Two credentialed adults per room** — "a dedicated lead teacher and assistant teacher" is a stated, structural commitment.',
      '**Honest linear pricing with real granularity** — three genuine pickup times and 1–5 day choice, so a family needing exactly two days to 4:30 pays for exactly that.',
      '**Grades 1–5 pricing is genuinely modest** for this tuition tier — $295 a semester for one day a week to 4:30, and $2,950 a year for five-day coverage to 4:30.',
      '**Full-day coverage on teacher workdays and conference days**, 7:30 a.m.–4:45 p.m., with real field trips — solving the days that most often break childcare.',
      '**A deep 27-class enrichment catalog** with credible outside vendors, spanning STEM, arts and eight-plus sports.',
      '**Talons is a real athletic on-ramp**, explicitly designed as the feeder into Hawks varsity teams.',
      '**Activity-bus integration** at 4:30, 5:30 and 6:00, so after-school participation doesn’t strictly require a car at pickup.',
    ],
    watchouts: [
      '**Coverage stops dead at grade 5.** There is no Middle or Upper School after-school care of any kind. Middle School is the most stranded: its library closes at dismissal, leaving athletics or nothing.',
      '**The TK/K cost cliff is severe** — $1,725 a semester just to bridge the 85 minutes to the grade 1 bell, and $9,300 a year for five-day coverage to 6:00 p.m.',
      '**No published daily schedule** for a program a child may spend three hours a day in.',
      '**Enrichment publishes names only** — no days, no grade ranges, no fees, and the page that once held that grid now 404s.',
      '**No drop-in option is published.** The model appears to be pre-registered fixed days billed by semester, with no published way to change mid-semester.',
      '**Fee opacity across the board** — registration, late pickup, schedule changes, refunds and the non-school-day rate are all unpublished, even though the summer camp publishes every one of its equivalents.',
      '**Financial aid is not stated to apply**, and after-school is filed under "other optional costs" alongside transportation.',
      '**The site contradicts itself on dismissal times**, and one pricing row breaks the pattern every other row follows.',
    ],
    checklist: [
      'What are our options for after-school supervision once our child reaches Middle School? Is there anything between the 3:20 dismissal and the 5:30 activity bus?',
      'Please confirm the actual Grades 1–5 dismissal time — 2:55, 3:05, or 3:10? Your Transportation and After-School pages disagree.',
      'Please confirm the TK/K 1:30–4:30 rates: is five days really $2,540 and four days $2,300? Those break the pattern of every other row.',
      'Is there a Hawks’ Club registration fee, and is it per child or per family?',
      'What is the late-pickup fee after 6:00 p.m., and how is it assessed?',
      'Can we change our days mid-semester, and is there a change fee? What is the refund policy if we withdraw?',
      'Are drop-in or occasional days possible at all, and at what rate?',
      'Is the full-day non-school-day program included in our semester rate, or billed separately? Do the field trips cost extra?',
      'Is there a sibling discount, and can financial aid be applied to Hawks’ Club, enrichment or Talons?',
      'Is there any before-school care or supervised early drop-off, and from what time?',
      'What does a typical afternoon look like hour by hour — when is snack, homework, outdoor time?',
      'What is the staff-to-child ratio, and how many children are in each classroom?',
      'Can I see the current enrichment grid with days, grade ranges and per-class fees?',
      'Do enrichment fees stack on top of the Hawks’ Club semester rate, or is Hawks’ Club prorated?',
      'How quickly do popular classes fill at the 8:00 p.m. registration open, and is there a waitlist?',
      'Are there winter and spring Talons seasons, and what is the exact fee for the sport we want?',
    ],
    flags: [],
    sources: [
      {
        label: 'charlottelatin.org — After School',
        url: 'https://www.charlottelatin.org/after-school',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
