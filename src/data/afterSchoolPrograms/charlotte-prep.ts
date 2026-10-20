// Charlotte Preparatory School — After School.
//
// Transcribed from source-material/after-school/charlotte-prep/ ("After School
// Program Overview"), which quotes the school's After School page and its
// 2026–27 Tuition & Fees page.
//
// Unlike Trinity's (omitted: no billing basis), the `cost` card IS buildable
// here: the school publishes one annual price for the K–8 program ($4,500) and
// an hourly drop-in rate ($20/hr). It is modelled on Cannon's annual contract.
// The school publishes no days-per-week ladder, so only the 5-day column is
// filled and the others are null — rendered "—", never interpolated.
//
// The studio list is labelled "Sample" by the school and parts of it are dated
// (two leaders are no longer in the staff directory), so the catalog intro says
// it is a sample and no studio leader is named here. Studio prices are a
// CONFIRMED null — the school says each studio has a fee and never states it.

import type { AfterSchoolProgram } from '../afterSchool.ts'

const AFTER_SCHOOL = 'https://charlotteprep.org/student-life/after-school'
const TUITION = 'https://charlotteprep.org/admissions/tuition-fees'
const DIRECTORY = 'https://charlotteprep.org/about/faculty-staff-directory'
const STRATEGIC = 'https://charlotteprep.org/about/strategic-plan-2022-2027'

/** Fraction of an 8 a.m.–6 p.m. timeline window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 8) / 10

export const charlottePrep: AfterSchoolProgram = {
  coverage: {
    headline:
      'One K–8 After School Program from dismissal to 5:30 p.m. at a single annual price, a separate Extended Day for the Early School — and no morning care.',
    subhead:
      'Drop-off opens at 7:45 a.m. for Lower and Middle School and 8:00 a.m. for the Early School.',
    hours: ['8 am', '10 am', '12 pm', '2 pm', '4 pm', '6 pm'],
    basisNote:
      'Prices on the bars are the **2026–27 annual** figures from the tuition page. The school does not price after-school care by days per week; occasional use is the **$20/hour** drop-in instead.',
    rows: [
      {
        division: 'Pre-Primary & Primary',
        dismissal: 'half-day program ends 12:00',
        startFrac: frac(12),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'Extended Day · 12:00–5:30 · $5,900/yr',
      },
      {
        division: 'TK',
        dismissal: 'dismissal 2:30',
        startFrac: frac(14, 30),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'TK Extended Day · 2:30–5:30 · $2,700/yr',
      },
      {
        division: 'K – Grade 8',
        dismissal: 'begins at dismissal',
        startFrac: frac(15),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'After School Program · 3:00–5:30 · $4,500/yr',
      },
      {
        division: 'Mornings',
        dismissal: 'before school',
        startFrac: 0,
        endFrac: frac(9),
        tiers: [],
        uncovered: true,
        flatLabel: 'No before-school care — drop-off from 7:45 (8:00 Early School)',
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: '**Summer Adventures at Prep** ran seven weeks in 2026, June 8 to July 31, for campers from the Early School through 8th grade, with Before Care 8:00–9:00 a.m. and After Care 4:00–5:00 p.m. at **$60/week** each.',
    },
    facts: [
      {
        label: 'Age groups',
        text: '"kindergarteners, first and second graders, third and fourth graders, and then our middle school students"',
      },
      {
        label: 'Siblings',
        text: '"We provide complimentary care for younger students who have siblings with a later dismissal time."',
      },
      {
        label: 'Drop-in',
        text: '**$20/hour**, Montessori Kindergarten through 8th grade',
      },
      {
        label: 'Staff',
        text: '**Justen Kirchner**, Director of Auxiliary Programs, oversees after school, extended day, studios and summer camp; the staff directory lists **14** After School Program Teachers',
      },
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — After School', url: AFTER_SCHOOL },
      { label: 'charlotteprep.org — Tuition & Fees 2026–27', url: TUITION },
      { label: 'charlotteprep.org — Faculty & Staff Directory', url: DIRECTORY },
    ],
  },

  cost: {
    headline:
      'One annual price — $4,500 for K–8 afternoons to 5:30 — with a $20-an-hour drop-in for families who only need care now and then.',
    subhead:
      'The 2026–27 rates, from the school’s own tuition page. The Early School’s Extended Day is priced separately.',
    basis: 'annual',
    periods: 1,
    periodsLabel: 'annual price',
    columnsVerified: [false, false, false, false, true],
    defaultRow: 'asp',
    defaultDays: 5,
    rows: [
      {
        id: 'asp',
        label: 'K–Gr 8 · 3:00–5:30',
        panelLabel: 'Kindergarten–Grade 8 · 3:00–5:30 pm',
        prices: [null, null, null, null, 4500],
      },
      {
        id: 'tk-ext',
        label: 'TK Extended Day · 2:30–5:30',
        panelLabel: 'Transitional Kindergarten Extended Day · 2:30–5:30 pm',
        prices: [null, null, null, null, 2700],
      },
      {
        id: 'pp-ext',
        label: 'Pre-Primary/Primary Extended Day · 12:00–5:30',
        panelLabel: 'Pre-Primary/Primary Extended Day · 12:00–5:30 pm',
        prices: [null, null, null, null, 5900],
      },
    ],
    aside: {
      title: 'Or drop in by the hour.',
      text: 'Drop-in care is **$20 an hour** for Montessori Kindergarten through 8th grade. A full afternoon to 5:30 is about **$50** on drop-in, against roughly **$25 an afternoon** on the annual plan over a 180-day year.',
    },
    fees: [
      { label: 'After School Program, K–8 (annual)', value: '$4,500' },
      { label: 'Drop-in, Montessori K–8', value: '$20 / hr' },
      { label: 'Pre-Primary/Primary School Day, 12:00–2:30/3:00', value: '$3,400' },
      {
        label:
          'The **School Day** option is only "for students with siblings enrolled at Prep in TK-8th grade." **After School Studios** carry a separate fee for each class, which the school does not state.',
        note: true,
      },
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — Tuition & Fees 2026–27', url: TUITION },
      { label: 'charlotteprep.org — After School', url: AFTER_SCHOOL },
    ],
  },

  dayInside: {
    headline:
      'Snack, homework time, monthly themes, hands-on activities and free time — plus 12-week studios in language, drama, music, art and STEM.',
    subhead:
      '"Classes are led by warm and enthusiastic teachers and include a healthy mix of age-appropriate activities, homework time, and free time."',
    rhythm: [],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'afternoon snack',
      'homework time',
      'monthly themes',
      'hands-on activities',
      'free time',
      'healthy routines',
      'a loving and nurturing environment',
    ],
    catalogTitle: 'After School Studios — a sample',
    catalogIntro:
      '"A new selection of studio choices is typically offered each fall and spring, and each session lasts approximately 12 weeks." Studios run **45 minutes to an hour**, students are walked to them by their teacher, and "there is a fee, separate from Charlotte Prep\'s annual tuition, associated with each class." The school lists these as **sample** offerings, not this term’s schedule.',
    dayFilters: [],
    gradeFilters: [],
    classes: [
      { name: 'Hindi', desc: 'Weekly: speaking for younger students, writing for advanced students, and culture through art and crafts.', day: '—', grades: [], gradeLabel: 'K–4', fee: '—' },
      { name: 'Storybook Theater', desc: 'Acting and communication, ending in an informal Reader’s Theatre performance.', day: '—', grades: [], gradeLabel: 'K–2', fee: '—' },
      { name: 'One-Act Play', desc: 'Audition for and perform a one-act play.', day: '—', grades: [], gradeLabel: '3–8', fee: '—' },
      { name: 'Ukulele', desc: 'Chords and strumming.', day: '—', grades: [], gradeLabel: '3–5', fee: '—' },
      { name: 'STEM', desc: 'Tinker, design, build and test in the STEM Lab.', day: '—', grades: [], gradeLabel: '3–6', fee: '—' },
      { name: 'Beginner Print Making', desc: 'In the Art Studio, 3:15–4:00.', day: '—', grades: [], gradeLabel: '3–5', fee: '—' },
      { name: 'Intermediate Print Making', desc: 'Linoleum, screen printing and collograph, 3:15–4:00.', day: '—', grades: [], gradeLabel: '6–8', fee: '—' },
      { name: 'Primary Chorus', desc: 'Includes off-campus singing at venues such as Knights Stadium and Bojangles Coliseum.', day: '—', grades: [], gradeLabel: '1–2', fee: '—' },
      { name: 'Beginner Chorus', desc: 'Meets before school, 7:15–8:00 a.m., in the Music Cottage — 3rd and 4th graders, plus 5th and 6th graders in Band.', day: '—', grades: [], gradeLabel: '3–6', fee: '—' },
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — After School (the program and the sample studios)', url: AFTER_SCHOOL },
      { label: 'charlotteprep.org — Strategic Plan 2022–2027 (the auxiliary programs director)', url: STRATEGIC },
    ],
  },

  verdict: {
    headline:
      'A simple, clearly priced afternoon program: one annual fee for every grade K–8, an hourly fallback, and free care for a younger sibling waiting on an older one.',
    strengths: [
      '**One clear annual price.** $4,500 covers K–8 afternoons to 5:30 p.m., and a $20 hourly drop-in covers occasional use.',
      '**Free care for younger siblings** waiting for an older sibling’s later dismissal.',
      '**Four age groups with homework time built in** — K, 1–2, 3–4 and Middle School — plus a snack and monthly themes.',
      '**Twelve-week studios** in language, drama, music, art and STEM each fall and spring.',
      '**A dedicated director** runs after school, extended day, studios and summer camp together.',
    ],
    watchouts: [],
    checklist: [
      'Is after-school care offered on teacher workdays, holidays and early-dismissal days, and at what cost?',
      'What is the late-pickup policy after 5:30 p.m.?',
      'Which studios run this term, on which days, and what does each cost?',
      'Can a Montessori Kindergartner enroll in the annual After School Program, or only drop in?',
      'Does the 3% sibling discount apply to after-school fees?',
      'Is there any supervised option before 7:45 a.m.?',
    ],
    flags: [],
    sources: [
      { label: 'charlotteprep.org — After School', url: AFTER_SCHOOL },
      { label: 'charlotteprep.org — Tuition & Fees 2026–27', url: TUITION },
      { label: 'Verdict synthesized from the sources cited on the cards above' },
    ],
  },
}
