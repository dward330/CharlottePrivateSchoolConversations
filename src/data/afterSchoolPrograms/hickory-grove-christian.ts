// Hickory Grove Christian School — After School.
//
// Transcribed from source-material/after-school/hickory-grove-christian/
// "Hickory Grove Christian - After School - Extended Day.md", which carries the
// source URLs. The school's own Afterschool Program page is the primary source
// for grades, hours and the enrichment-activity list.
//
// THE COST CARD IS OMITTED. Until 2026-11-20 the recurring rate was not
// published anywhere. It now is, on the Tuition and Fees page: "TK-5th Grade
// After School Childcare: $2,600; yearly" and "6th-12th Grade ... $1,300; yearly"
// (re-read live, plan consistency HG-16). Two annual prices with no day or
// pickup tiers do not make a planner matrix, so they ride on the coverage bars,
// the watch-outs and the Compare row instead. Billing is "billed annually and
// divided into equal payments based on the plan you select," and single-day
// drop-ins are explicitly not offered.
//
// The $35/day "Adventure Days" figure is a DIFFERENT, out-of-session program
// (child care when school is not in session, TK–7) and is deliberately NOT used
// as the recurring aftercare rate — it is carried only in the facts row so the
// distinction is on record.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The coverage timeline spans 2 pm → 6 pm, so each hour is 0.25 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 14) / 4

const AFTERSCHOOL = 'https://www.hgchristian.org/afterschool-program'
const TUITION = 'https://www.hgchristian.org/tuition-and-fees'

export const hickoryGroveChristian: AfterSchoolProgram = {
  coverage: {
    headline:
      'One 2:30–5:30 p.m. window covers TK through at least 11th grade. It holds an Afterschool program for TK–5 and a supervised Study Hall for grades 6–11. The latest pickup is 5:30.',
    subhead:
      'Both are full-year programs (no single-day drop-ins), billed annually in equal payments. The tuition page prices after-school childcare at $2,600 a year for TK–5 and $1,300 for grades 6–12; the Afterschool page describes Study Hall for grades 6–11.',
    hours: ['2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'Afterschool (TK–5)',
        dismissal: 'from 2:30, pickup by 5:30',
        startFrac: frac(14, 30),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'Afterschool · $2,600 a year',
      },
      {
        division: 'Study Hall (6–11)',
        dismissal: 'from 2:30, pickup by 5:30',
        startFrac: frac(14, 30),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'Study Hall · $1,300 a year (fee line: grades 6–12)',
      },
    ],
    facts: [
      { label: 'Latest pickup', text: '5:30 p.m.' },
      {
        label: 'Enrollment',
        text: 'full-year programs, **not available for single-day drop-ins**; "tuition is billed annually and divided into equal payments based on the plan you select"',
      },
      {
        label: 'Adventure Days (separate)',
        text: 'a DIFFERENT program — out-of-session child care for TK–7 when school is closed, **$35/day** with a week\'s preregistration; NOT the recurring aftercare rate',
      },
      { label: 'Closed', text: 'teacher workdays, holiday weeks, and summer (there is no summer wrap-around care)' },
      { label: 'Director', text: 'Belinda Jackson, Afterschool Director (704-531-4034)' },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Grades differ between two school pages (plan consistency HG-16, re-read live 2026-11-20): the Tuition and Fees page says "6th-12th Grade After School Childcare: $1,300; yearly"; the Afterschool page describes Study Hall "for students in grades 6–11". Both are attributed on the card, and the checklist asks. The old /life-as-a-lion/after-school-program URL now 404s and /admissions/tuition-and-fees redirects to the admissions home; both links were re-pointed.',
      },
      {
        kind: 'verify',
        text: 'A search aggregator surfaced Study Hall figures ($288 / $432 / $900 per year) tagged to grades 8–12, which conflicts with the school\'s own 6–11 Study Hall range and appears on no official page — treated as unconfirmed and not used.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Afterschool Program (grades, hours, activities, billing)', url: AFTERSCHOOL },
      { label: 'hgchristian.org — Tuition and Fees (after-school childcare rates)', url: TUITION },
    ],
  },

  dayInside: {
    headline:
      'The afternoon splits by age: TK–5 rotates homework help, outdoor play, reading and computer lab, while grades 6–11 get a calm, supervised Study Hall built around finishing the day\'s work.',
    subhead:
      'Both run the single 2:30–5:30 p.m. window; the two tracks are described in the school\'s own words below.',
    wordsTitle: 'The program, in the school\'s words',
    words: [
      'Homework Help',
      'Outdoor Play',
      'Reading Adventures',
      'Computer Lab Time',
      'Quiet Reading',
      'Friday Choice Time',
    ],
    wordsText:
      'The Afterschool Program (TK–5) lists Homework Help ("focused time with teacher support"), Outdoor Play ("fresh air and active time on the playground every day"), Reading Adventures ("creative activities that foster a love for reading") and Computer Lab Time ("educational games and interactive digital learning"), plus Arts & Crafts and Games Galore. Study Hall (grades 6–11) is framed as "a calm, focused space to complete homework, stay organized, and manage their workload effectively," with a Snack Break, Homework Completion, Quiet Reading and Friday Choice Time.',
    rhythm: [
      {
        time: '2:30',
        name: 'Afternoon begins',
        detail: 'TK–5 move into the Afterschool program; grades 6–11 into Study Hall',
      },
      {
        time: 'TK–5',
        name: 'Homework → play → reading → lab',
        detail: 'Homework Help, Outdoor Play, Reading Adventures and Computer Lab Time, plus Arts & Crafts and Games Galore',
      },
      {
        time: '6–11',
        name: 'Study Hall',
        detail: 'Snack Break, Homework Completion, Quiet Reading, and Friday Choice Time',
      },
      {
        time: '5:30',
        name: 'Latest pickup',
        detail: 'the single window ends at 5:30 p.m. for both tracks',
      },
    ],
    dayFilters: [],
    gradeFilters: [],
    classes: [],
    flags: [
      {
        kind: 'gap',
        text: 'No staff-to-child ratio, group size, or hour-by-hour schedule is published beyond the activity lists above. The enrichment activities are named, but they are not set up as a class catalog with days, grades or fees.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Afterschool Program (activity lists, both tracks)', url: AFTERSCHOOL },
    ],
  },

  verdict: {
    headline:
      'A single, age-split afternoon program that covers TK through at least 11th grade to 5:30 p.m. — with published activities and annual prices, but no summer coverage.',
    subhead:
      'The open questions are the missing staff ratio, which grades Study Hall serves, and the fact that both tracks are full-year commitments with no drop-in option.',
    strengths: [
      '**One window for TK through at least 11th grade** — TK–5 Afterschool and 6–11 Study Hall both run 2:30–5:30 p.m.',
      '**A clearly described afternoon** — the TK–5 activity list (homework help, outdoor play, reading, computer lab) and the 6–11 Study Hall framing are published in the school\'s own words.',
      '**An older-grade study track** — Study Hall for grades 6–11 is a genuine supervised-homework option, not just younger-child care.',
      '**A named director** — Belinda Jackson, with a direct phone line, runs the program.',
    ],
    watchouts: [
      '**Annual prices only** — the Tuition and Fees page lists $2,600 a year for TK–5 and $1,300 for grades 6–12, billed in equal payments. No monthly or per-day rate is published.',
      '**No single-day drop-ins** — both tracks are full-year commitments billed annually, so occasional-need families have no flexible option (the only drop-in is the separate $35/day out-of-session Adventure Days).',
      '**No summer coverage** — the program is closed during the summer; there is no summer wrap-around care, and summer camps are half-day only.',
      '**No staff-to-child ratio** is published for either track.',
    ],
    checklist: [
      'Is Study Hall open to 12th graders? The Afterschool page says grades 6–11, but the fee line says 6th–12th.',
      'What payment plans are offered for the $2,600 and $1,300 annual rates?',
      'What is the staff-to-child ratio in Afterschool and in Study Hall?',
      'Since there are no drop-ins, is there any way to enroll for only some afternoons a week?',
      'What do lunch, athletic and graduation fees cost? Learning Support lists the Educational Support Services fees.',
      'What child-care options exist in the summer, given the program is closed — beyond the half-day camps?',
    ],
    flags: [],
    sources: [
      { label: 'hgchristian.org — Afterschool Program', url: AFTERSCHOOL },
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
