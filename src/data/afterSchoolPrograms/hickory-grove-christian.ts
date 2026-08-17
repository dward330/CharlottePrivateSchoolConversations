// Hickory Grove Christian School — After School.
//
// Transcribed from source-material/after-school/hickory-grove-christian/
// "Hickory Grove Christian - After School - Extended Day.md", which carries the
// source URLs. The school's own Afterschool Program page is the primary source
// for grades, hours and the enrichment-activity list.
//
// THE COST CARD IS OMITTED, and that is the finding: the recurring TK–5
// Afterschool rate is NOT PUBLISHED on the Afterschool Program page or the
// Tuition and Fees page — billing is described only as "billed annually and
// divided into equal payments based on the plan you select," and single-day
// drop-ins are explicitly not offered. Per no-empty-cards, the Cost card is left
// off entirely rather than shipped as a "not published" shell; the scope note
// rides in the coverage card's facts and the verdict instead.
//
// The $35/day "Adventure Days" figure is a DIFFERENT, out-of-session program
// (child care when school is not in session, TK–7) and is deliberately NOT used
// as the recurring aftercare rate — it is carried only in the facts row so the
// distinction is on record.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The coverage timeline spans 2 pm → 6 pm, so each hour is 0.25 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 14) / 4

const AFTERSCHOOL = 'https://www.hgchristian.org/life-as-a-lion/after-school-program'
const TUITION = 'https://www.hgchristian.org/admissions/tuition-and-fees'

export const hickoryGroveChristian: AfterSchoolProgram = {
  coverage: {
    headline:
      'One 2:30–5:30 p.m. window covers the whole school — an Afterschool program for TK–5 and a supervised Study Hall for grades 6–11 — with the latest pickup at 5:30.',
    subhead:
      'Both are full-year programs (no single-day drop-ins), billed annually in equal payments. The recurring rate is not published, so no price is shown on the bars.',
    hours: ['2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'Afterschool (TK–5)',
        dismissal: 'from 2:30, pickup by 5:30',
        startFrac: frac(14, 30),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'Afterschool · rate not published',
      },
      {
        division: 'Study Hall (6–11)',
        dismissal: 'from 2:30, pickup by 5:30',
        startFrac: frac(14, 30),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'Study Hall · rate not published',
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
        kind: 'gap',
        text: 'The recurring TK–5 Afterschool monthly/annual rate is not published on the Afterschool Program page or the Tuition and Fees page — the amounts live behind the school\'s "student services fees" documents / FACTS Family Portal. So no Cost Planner card is built, and the aftercare-cost Compare row is N/A for HGCS.',
      },
      {
        kind: 'verify',
        text: 'A search aggregator surfaced Study Hall figures ($288 / $432 / $900 per year) tagged to grades 8–12, which conflicts with the school\'s own 6–11 Study Hall range and appears on no official page — treated as unconfirmed and not used.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Afterschool Program (grades, hours, activities, billing)', url: AFTERSCHOOL },
      { label: 'hgchristian.org — Tuition and Fees (no after-school rate on the page)', url: TUITION },
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
        text: 'No staff-to-child ratio, group size, or hour-by-hour schedule is published beyond the activity lists above; the enrichment activities are named but not run as a filterable class catalog with days, grades or fees.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Afterschool Program (activity lists, both tracks)', url: AFTERSCHOOL },
    ],
  },

  verdict: {
    headline:
      'A single, age-split afternoon program that covers the whole school to 5:30 p.m. — with fully published activities but no published price, and no summer coverage.',
    subhead:
      'The open questions are the unpublished recurring rate, the missing staff ratio, and the fact that both tracks are full-year commitments with no drop-in option.',
    strengths: [
      '**Whole-school coverage in one window** — TK–5 Afterschool and 6–11 Study Hall both run 2:30–5:30 p.m., so there is no division gap.',
      '**A clearly described afternoon** — the TK–5 activity list (homework help, outdoor play, reading, computer lab) and the 6–11 Study Hall framing are published in the school\'s own words.',
      '**An older-grade study track** — Study Hall for grades 6–11 is a genuine supervised-homework option, not just younger-child care.',
      '**A named director** — Belinda Jackson, with a direct phone line, runs the program.',
    ],
    watchouts: [
      '**The recurring price is not published** — neither the Afterschool page nor the Tuition and Fees page states a monthly or annual rate; families must go through the student-services fee documents or FACTS portal.',
      '**No single-day drop-ins** — both tracks are full-year commitments billed annually, so occasional-need families have no flexible option (the only drop-in is the separate $35/day out-of-session Adventure Days).',
      '**No summer coverage** — the program is closed during the summer; there is no summer wrap-around care, and summer camps are half-day only.',
      '**No staff-to-child ratio** is published for either track.',
    ],
    checklist: [
      'What does the recurring Afterschool program actually cost per year for TK–5, and what payment plans are offered?',
      'Is the Study Hall for grades 6–11 the same price as the TK–5 Afterschool program, or billed separately?',
      'What is the staff-to-child ratio in Afterschool and in Study Hall?',
      'Since there are no drop-ins, is there any way to enroll for only some afternoons a week?',
      'What are the "student services fees" that hold the after-school rate, and where can we see them before enrolling?',
      'What child-care options exist in the summer, given the program is closed — beyond the half-day camps?',
    ],
    flags: [],
    sources: [
      { label: 'hgchristian.org — Afterschool Program', url: AFTERSCHOOL },
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
