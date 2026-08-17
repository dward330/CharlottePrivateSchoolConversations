// Hickory Grove Christian School — Summer Programs (Summer Camps).
//
// Transcribed from source-material/summer-programs/hickory-grove-christian/
// "Hickory Grove Christian - Summer Programs - Camp Catalog.md". Every camp name,
// date, hour, grade band and instructor is copied char-for-char from 2022–2023
// Internet Archive (Wayback) snapshots.
//
// THIS CATALOG IS HISTORICAL / REPRESENTATIVE — flagged `stale`. The live 2026
// HGCS summer pages hide all camp names and prices behind the Brushfire
// registration platform (not crawlable); only eight bare session-date windows are
// shown. The Summer 2023 slate below is the last publicly enumerable one, and it
// stands as the representative shape of HGCS summer programming, not a guarantee
// of the exact 2026 names.
//
// THE COST PLANNER CARD IS OMITTED: no per-camp price appears on any live or
// archived page (pricing lives only inside the Brushfire checkout), so per
// no-empty-cards the planner is left off entirely rather than shipped modeled.
// There is also no summer wrap-around care — the after-school program is closed
// in summer and camps are half-day only.

import type { SummerProgram } from '../summerPrograms.ts'

const CAMPS_ACADEMIC = 'https://www.hgchristian.org/academics/summer-camps'
const CAMPS_ATHLETIC = 'https://www.hgchristian.org/athletics/athletic-camps'
const WB_ACADEMIC =
  'http://web.archive.org/web/20230528052540/https://www.hgchristian.org/academics/summer-camps'
const WB_ATHLETIC =
  'http://web.archive.org/web/20230528071242/https://www.hgchristian.org/athletics/athletic-camps'

export const hickoryGroveChristian: SummerProgram = {
  catalog: {
    headline:
      'A Summer 2023 slate of 17 half-day camps — 12 academic/enrichment and 5 athletic — for rising 1st–8th graders, plus one high-school College Admissions Boot Camp.',
    subhead:
      'Academic camps run 9 a.m.–1 p.m. and athletic camps 9 a.m.–12 p.m. (Football in the evening), Monday–Thursday, across roughly eight week-blocks from late May through late July.',
    intro:
      'This is the **Summer 2023 catalog, recovered from the Internet Archive** — a representative slate, not the live 2026 list, because HGCS now hides camp names and prices behind the Brushfire platform. The live 2026 page confirms eight session windows consistent with the week-blocks below. **Prices are not published anywhere** (Brushfire-only), so no cost is shown. Grades are **rising** grades.',
    categoryFilters: [
      { token: 'All', label: 'All' },
      { token: 'stem', label: 'STEM' },
      { token: 'reading', label: 'Reading & Fluency' },
      { token: 'math', label: 'Math' },
      { token: 'spanish', label: 'Spanish Immersion' },
      { token: 'faith', label: 'Faith' },
      { token: 'arts', label: 'Arts' },
      { token: 'collegeprep', label: 'College Prep' },
      { token: 'athletics', label: 'Athletics' },
    ],
    dayFilters: [],
    gradeFilters: [
      { token: 'All', label: 'All' },
      { token: 'g14', label: 'Rising 1–4' },
      { token: 'g58', label: 'Rising 5–8' },
      { token: 'hs', label: 'Rising 11–12' },
    ],
    camps: [
      /* ---------------------------------------- Academic / enrichment -- */
      {
        name: 'Science Camp',
        desc: 'Hands-on science for rising 1st–4th graders (ran two separate weeks).',
        category: 'stem',
        categoryLabel: 'STEM',
        grades: ['g14'],
        gradeLabel: 'Rising 1–4',
        days: ['Tue', 'Wed', 'Thu', 'Fri'],
        dayLabel: 'Mon–Thu (or Tue–Fri)',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'May 30–Jun 2 & Jun 5–8, 2023',
      },
      {
        name: 'Adventure Through the Bible (Old Testament)',
        desc: 'A faith-and-reading week through the Old Testament, for rising 2nd–4th graders.',
        category: 'faith',
        categoryLabel: 'Faith',
        grades: ['g14'],
        gradeLabel: 'Rising 2–4',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 5–8, 2023',
      },
      {
        name: 'Adventure Through the Bible (New Testament)',
        desc: 'A faith-and-reading week through the New Testament, for rising 2nd–4th graders.',
        category: 'faith',
        categoryLabel: 'Faith',
        grades: ['g14'],
        gradeLabel: 'Rising 2–4',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 12–15, 2023',
      },
      {
        name: 'Foundational Fluency Camp',
        desc: 'Early-reading fluency for rising 1st–2nd graders (or rising 3rd with a teacher rec); ran two weeks.',
        category: 'reading',
        categoryLabel: 'Reading & Fluency',
        grades: ['g14'],
        gradeLabel: 'Rising 1–2',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 5–8 & Jun 12–15, 2023',
      },
      {
        name: 'Math Fact Fluency (Addition) Camp',
        desc: 'Addition-fact fluency for rising 1st–3rd graders.',
        category: 'math',
        categoryLabel: 'Math',
        grades: ['g14'],
        gradeLabel: 'Rising 1–3',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 5–8, 2023',
      },
      {
        name: 'Math Fact Fluency (Subtraction) Camp',
        desc: 'Subtraction-fact fluency for rising 1st–3rd graders.',
        category: 'math',
        categoryLabel: 'Math',
        grades: ['g14'],
        gradeLabel: 'Rising 1–3',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 12–15, 2023',
      },
      {
        name: 'Spanish Immersion: Language Practice Through Games',
        desc: 'Spanish practice through games, for HGCS Spanish Immersion students.',
        category: 'spanish',
        categoryLabel: 'Spanish Immersion',
        grades: ['g14'],
        gradeLabel: 'HGCS Spanish Immersion',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 5–8, 2023',
      },
      {
        name: 'Spanish Immersion: Science Through Art',
        desc: 'Science-through-art in Spanish, for rising 1st–3rd Spanish Immersion students.',
        category: 'spanish',
        categoryLabel: 'Spanish Immersion',
        grades: ['g14'],
        gradeLabel: 'Rising 1–3 (Spanish Immersion)',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 12–15, 2023',
      },
      {
        name: 'Beyond the Brush: Bilingual Camp',
        desc: 'A bilingual visual-arts week for rising 5th–7th graders, with HGCS art teacher Ms. Izquierdo.',
        category: 'arts',
        categoryLabel: 'Arts',
        grades: ['g58'],
        gradeLabel: 'Rising 5–7',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–1 p.m.',
        weeks: 'Jun 26–29, 2023',
      },
      {
        name: 'College Admissions Boot Camp',
        desc: 'A college-prep week for rising juniors and seniors, run by the counseling staff with 1–2 campus visits.',
        category: 'collegeprep',
        categoryLabel: 'College Prep',
        grades: ['hs'],
        gradeLabel: 'Rising 11–12',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–12 p.m.',
        weeks: 'Jun 5–8, 2023',
      },
      /* -------------------------------------------------- Athletic -- */
      {
        name: 'Cheer Camp',
        desc: 'Cheerleading for rising 3rd–8th grade girls, with Varsity head coach Tish Little.',
        category: 'athletics',
        categoryLabel: 'Athletics',
        grades: ['g14', 'g58'],
        gradeLabel: 'Rising 3–8 (girls)',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–12 p.m.',
        weeks: 'Jun 5–8, 2023',
      },
      {
        name: 'Softball Camp',
        desc: 'Softball for rising 3rd–8th grade girls, with Varsity coach Brandon Williams.',
        category: 'athletics',
        categoryLabel: 'Athletics',
        grades: ['g14', 'g58'],
        gradeLabel: 'Rising 3–8 (girls)',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–12 p.m.',
        weeks: 'Jun 12–15, 2023',
      },
      {
        name: 'Football Camp',
        desc: 'Football for rising 3rd–8th grade boys, with Varsity coach Tad Baucom — an evening camp.',
        category: 'athletics',
        categoryLabel: 'Athletics',
        grades: ['g14', 'g58'],
        gradeLabel: 'Rising 3–8 (boys)',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '5 p.m.–7 p.m.',
        weeks: 'Jun 19–22, 2023',
      },
      {
        name: 'Basketball Camp',
        desc: 'Co-ed basketball for rising 3rd–8th graders, with Varsity coaches Austin Turner and Dwayne Robinson.',
        category: 'athletics',
        categoryLabel: 'Athletics',
        grades: ['g14', 'g58'],
        gradeLabel: 'Rising 3–8 (co-ed)',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–12 p.m.',
        weeks: 'Jun 26–29, 2023',
      },
      {
        name: 'Baseball Camp',
        desc: 'Baseball for rising 3rd–8th grade boys, with Varsity head coach Nick Daddio.',
        category: 'athletics',
        categoryLabel: 'Athletics',
        grades: ['g14', 'g58'],
        gradeLabel: 'Rising 3–8 (boys)',
        days: ['Mon', 'Tue', 'Wed', 'Thu'],
        dayLabel: 'Mon–Thu',
        price: '—',
        hours: '9 a.m.–12 p.m.',
        weeks: 'Jul 24–27, 2023',
      },
    ],
    flags: [
      {
        kind: 'stale',
        text: 'This is the Summer 2023 slate, recovered from Internet Archive snapshots. The live 2026 catalog is hidden behind the Brushfire registration platform, so the exact 2026 camp names were not recoverable; the live page does confirm eight session windows consistent with these week-blocks.',
      },
      {
        kind: 'gap',
        text: 'No per-camp price is published on any live or archived page — pricing exists only inside the Brushfire checkout — so no Cost Planner card is built and the summer-cost figures are N/A. There is also no summer wrap-around care: camps are half-day and the after-school program is closed in summer.',
      },
    ],
    sources: [
      { label: 'hgchristian.org — Summer Camps (live: session windows only)', url: CAMPS_ACADEMIC },
      { label: 'hgchristian.org — Athletic Camps (live)', url: CAMPS_ATHLETIC },
      { label: 'Wayback — Summer 2023 academic camp catalog', url: WB_ACADEMIC },
      { label: 'Wayback — Summer 2023 athletic camp catalog', url: WB_ATHLETIC },
    ],
  },
}
