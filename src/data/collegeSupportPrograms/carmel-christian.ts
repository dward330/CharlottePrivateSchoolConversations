// Carmel Christian School (Matthews, NC) — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the College Acceptances page, the Guidance staff page, the AP School
// Honor Roll news post, and the "College Tips and Information for HS Students"
// PDF. See source-material/college-support/carmel-christian/Carmel Christian -
// College Support - Redesign Research 2026.md for the hard data, source URLs,
// and per-metric gap notes.
//
// Two source caveats carried onto the cards as TO VERIFY flags:
//
//  1. The current-year School Profile PDF could not be relocated (every filename
//     variant 404s; Wayback was rate-limited). SAT/ACT/GPA below come from
//     Google's cache of the 2022–23 profile — Class of 2022 — and are labeled
//     as such and flagged TO VERIFY, not presented as current.
//  2. The AP School Honor Roll post states no year; its metadata (2024-02-12)
//     plus "last year's AP exams" points to the 2023 exams — flagged TO VERIFY.
//
// The acceptance list carries NO time window, NO counts and NO matriculation
// markings — it is a cumulative acceptance list, so `enrolling` is set on NO
// college and the total legend states no bold key (like Davidson Day).

import type { CollegeSupportProgram } from '../collegeSupport.ts'

const ACCEPTANCES =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487269&type=d'
const GUIDANCE_STAFF =
  'https://carmelchristian.org/apps/pages/index.jsp?uREC_ID=487268&type=d'
const AP_HONOR_ROLL =
  'https://www.carmelchristian.org/apps/news/show_news.jsp?REC_ID=896723&id=0'
const COLLEGE_TIPS =
  'https://carmelchristian.org/pdf/College_tips_and_Information_for_HS_Students.pdf'

/* The College Acceptances list, transcribed verbatim from the live page (S1):
   a cumulative acceptance list with no window, no counts and no markings.
   Because nothing is marked as matriculating, `enrolling` is set on NO entry.
   Entries carry only { name, cats } — the US News rank label is NOT stored
   here; it resolves at render from the single-source master
   src/data/collegeRankings.ts via rankLabelFor(name). Buckets
   (ivy/ivyplus/nu75/lac75/p4/hbcu) drive the filter chips. Verbatim duplicates
   from the source page are preserved. */
const colleges = [
  { name: 'Agnes Scott College', cats: ['lac75'] },
  { name: 'American University', cats: [] },
  { name: 'Anderson University', cats: [] },
  { name: 'Appalachian State University', cats: [] },
  { name: 'Arcadia University', cats: [] },
  { name: 'Arizona State University', cats: ['p4'] },
  { name: 'Auburn University', cats: ['p4'] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Belhaven University', cats: [] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [] },
  { name: 'Berry College', cats: [] },
  { name: 'Bethel School of Ministry', cats: [] },
  { name: 'Blue Mountain College', cats: [] },
  { name: 'Bluefield College', cats: [] },
  { name: 'Bob Jones School of Medicine', cats: [] },
  { name: 'Bob Jones University', cats: [] },
  { name: 'Boston University', cats: ['nu75'] },
  { name: 'Brevard College', cats: [] },
  { name: 'Brock University', cats: [] },
  { name: 'Brunswick Community College', cats: [] },
  { name: 'Butler University', cats: [] },
  { name: 'California Baptist University', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Cape Breton University', cats: [] },
  { name: 'Carson-Newman University', cats: [] },
  { name: 'Catawba University', cats: [] },
  { name: 'Cedarville University', cats: [] },
  { name: 'Central Piedmont Community College', cats: [] },
  { name: 'Centre College', cats: ['lac75'] },
  { name: 'Charleston Southern University', cats: [] },
  { name: 'Christopher Newport University', cats: [] },
  { name: 'Clemson University', cats: ['nu75', 'p4'] },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Coker College', cats: [] },
  { name: 'College of Charleston', cats: [] },
  { name: 'Colorado School of Mines', cats: [] },
  { name: 'Columbia College Chicago', cats: [] },
  { name: 'Columbia International University', cats: [] },
  { name: 'Concord University', cats: [] },
  { name: 'Covenant College', cats: [] },
  { name: 'Davidson College', cats: ['lac75'] },
  { name: 'DePaul University', cats: [] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Earlham College', cats: [] },
  { name: 'East Carolina University', cats: [] },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'Eckerd College', cats: [] },
  { name: 'Elon University', cats: [] },
  { name: 'Fairfield University', cats: [] },
  { name: 'Flagler College', cats: [] },
  { name: 'Florida Agricultural and Mechanical', cats: ['hbcu'] },
  { name: 'Florida Institute of Technology', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'] },
  { name: 'Fordham University', cats: [] },
  { name: 'Francis Marion University', cats: [] },
  { name: 'Full Sail University', cats: [] },
  { name: 'Furman University', cats: ['lac75'] },
  { name: 'Gardner-Webb University', cats: [] },
  { name: 'Georgia Institute of Technology', cats: ['nu75', 'p4'] },
  { name: 'Gordon College', cats: [] },
  { name: 'Guilford College', cats: [] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'Hampton University', cats: ['hbcu'] },
  { name: 'Harding University', cats: [] },
  { name: 'High Point University', cats: [] },
  { name: 'Hofstra University', cats: [] },
  { name: 'Houston Baptist University', cats: [] },
  { name: 'Howard University', cats: ['hbcu'] },
  { name: 'Indiana University at Bloomington', cats: ['nu75', 'p4'] },
  { name: 'Iowa State University', cats: ['p4'] },
  { name: 'James Madison University', cats: [] },
  { name: 'Juniata College', cats: [] },
  { name: 'Kansas State University', cats: ['p4'] },
  { name: 'Lee University', cats: [] },
  { name: 'Lees-McRae College', cats: [] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Liberty University', cats: [] },
  { name: 'Limestone College', cats: [] },
  { name: 'Lipscomb University', cats: [] },
  { name: 'Lynchburg College', cats: [] },
  { name: 'Malone University', cats: [] },
  { name: 'Marshall University', cats: [] },
  { name: 'Marymount Manhattan College', cats: [] },
  { name: 'Mercer University', cats: [] },
  { name: 'Meredith College', cats: [] },
  { name: 'Messiah University', cats: [] },
  { name: 'Miami University-Oxford', cats: [] },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Mississippi College', cats: [] },
  { name: 'Mississippi State University', cats: ['p4'] },
  { name: 'Montreat College', cats: [] },
  { name: 'NASCAR Technical Institute', cats: [] },
  { name: 'New York Film Academy', cats: [] },
  { name: 'New York University', cats: ['nu75'] },
  { name: 'Norfolk State University', cats: ['hbcu'] },
  { name: 'North Carolina A & T State University', cats: ['hbcu'] },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'] },
  { name: 'North Carolina Wesleyan College', cats: [] },
  { name: 'North Greenville University', cats: [] },
  { name: 'Norwich University', cats: [] },
  { name: 'Old Dominion University', cats: [] },
  { name: 'Pace University-New York City', cats: [] },
  { name: 'Palm Beach Atlantic University', cats: [] },
  { name: 'Pennsylvania College of Technology', cats: [] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Pfeiffer University', cats: [] },
  { name: 'Point Loma Nazarene University', cats: [] },
  { name: 'Point Park University', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Princeton University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Purchase College-SUNY', cats: [] },
  { name: 'Purdue University', cats: ['nu75', 'p4'] },
  { name: 'Queens University of Charlotte', cats: [] },
  { name: 'Radford University', cats: [] },
  { name: 'Randolph College', cats: [] },
  { name: 'Randolph-Macon College', cats: [] },
  { name: 'Regent University', cats: [] },
  { name: 'Rhodes College', cats: ['lac75'] },
  { name: 'Ringling College of Art & Design', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Robert Morris University', cats: [] },
  { name: 'Rollins College', cats: [] },
  { name: 'Rutgers University', cats: ['nu75', 'p4'] },
  { name: "Saint Mary's College (Indiana)", cats: [] },
  { name: 'Samford University', cats: [] },
  { name: 'Savannah College of Art & Design', cats: [] },
  { name: 'Sewanee: The University of the South', cats: ['lac75'] },
  { name: 'South Carolina State University', cats: ['hbcu'] },
  { name: "St. John's University-Queens Campus", cats: [] },
  { name: 'Stetson University', cats: [] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'] },
  { name: 'Temple University', cats: [] },
  { name: 'Tennessee Technological University', cats: [] },
  { name: 'Texas Christian University', cats: ['p4'] },
  { name: 'The American Musical & Dramatic Academy', cats: [] },
  { name: 'The American University of Paris', cats: [] },
  { name: 'The Citadel (The Military College)', cats: [] },
  { name: 'The George Washington University', cats: ['nu75'] },
  { name: "The King's College", cats: [] },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
  { name: 'The Pennsylvania State University', cats: ['nu75', 'p4'] },
  { name: 'The Savannah College of Art & Design (SCAD)', cats: [] },
  { name: 'The University of Alabama', cats: ['p4'] },
  { name: 'The University of Alabama-Tuscaloosa', cats: ['p4'] },
  { name: 'The University of Alabama-Birmingham', cats: [] },
  { name: 'The University of Alabama-Huntsville', cats: [] },
  { name: 'The University of Iowa', cats: ['p4'] },
  { name: 'The University of Oklahoma', cats: ['p4'] },
  { name: 'The University of Southern Mississippi', cats: [] },
  { name: 'The University of Tampa', cats: [] },
  { name: 'Trinity College', cats: ['lac75'] },
  { name: 'Tulane University', cats: ['nu75'] },
  { name: 'United States Marine Corps', cats: [] },
  { name: 'University of Arizona', cats: ['nu75', 'p4'] },
  { name: 'University of California-Irvine', cats: [] },
  { name: 'University of Cincinnati', cats: ['p4'] },
  { name: 'University of Colorado', cats: ['nu75', 'p4'] },
  { name: 'University of Denver', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'] },
  { name: 'University of Georgia', cats: ['nu75', 'p4'] },
  { name: 'University of Glasgow', cats: [] },
  { name: 'University of Hawaii', cats: [] },
  { name: 'University of Illinois at Urbana-Champaign', cats: ['nu75', 'p4'] },
  { name: 'University of Kansas', cats: ['p4'] },
  { name: 'University of Mary Washington', cats: [] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'] },
  { name: 'University of Miami', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'] },
  { name: 'University of Missouri', cats: ['p4'] },
  { name: 'University of Nevada-Reno', cats: [] },
  { name: 'University of North Alabama', cats: [] },
  { name: 'University of North Carolina Asheville', cats: [] },
  { name: 'University of North Carolina Chapel Hill', cats: ['nu75', 'p4'] },
  { name: 'University of North Carolina Charlotte', cats: [] },
  { name: 'University of North Carolina Greensboro', cats: [] },
  { name: 'University of North Carolina School of the Arts', cats: [] },
  { name: 'University of North Carolina Wilmington', cats: [] },
  { name: 'University of Pittsburgh', cats: ['nu75', 'p4'] },
  { name: 'University of Redlands', cats: [] },
  { name: 'University of Richmond', cats: ['lac75'] },
  { name: 'University of South Carolina', cats: ['p4'] },
  { name: 'University of South Carolina Upstate', cats: [] },
  { name: 'University of South Florida', cats: [] },
  { name: 'University of Southern Mississippi', cats: [] },
  { name: 'University of St. Andrews-Scotland', cats: [] },
  { name: 'University of Stirling', cats: [] },
  { name: 'University of Tennessee', cats: ['nu75', 'p4'] },
  { name: 'University of Utah', cats: ['p4'] },
  { name: 'University of Vermont', cats: [] },
  { name: 'University of Virginia', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin', cats: ['nu75', 'p4'] },
  { name: 'University of York', cats: [] },
  { name: 'Utah Valley University', cats: [] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia Military Institute', cats: [] },
  { name: 'Virginia Polytechnic Institute and State University', cats: ['nu75', 'p4'] },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'] },
  { name: 'Warren Wilson College', cats: [] },
  { name: 'Washington and Lee University', cats: ['lac75'] },
  { name: 'Washington College', cats: [] },
  { name: 'Watkins College of Art', cats: [] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'West Virginia Wesleyan College', cats: [] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Westmont College', cats: [] },
  { name: 'Wheaton College', cats: [] },
  { name: 'Whitman College', cats: [] },
  { name: 'William Peace University', cats: [] },
  { name: 'Wingate University', cats: [] },
  { name: 'Winston Salem State University', cats: ['hbcu'] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', cats: ['lac75'] },
  { name: 'Xavier University', cats: [] },
]

export const carmelChristian: CollegeSupportProgram = {
  /* ------------------------------------------------------- transcript ------ */
  transcript: {
    headline:
      '73% of seniors scored a 3 or higher on at least one AP exam, and 80% sat at least one — enough for the College Board’s Platinum AP School Honor Roll, its top tier.',
    subhead:
      'A broad-participation AP program: 14 AP courses across 21 sections taught by 12 teachers, with 19% of seniors sitting five or more exams.',
    stats: [
      { value: 'Platinum', label: 'AP School Honor Roll — the College Board’s top distinction' },
      { value: '73%', label: 'of seniors scored 3+ on at least one AP exam' },
      { value: '80%', label: 'of seniors sat at least one AP exam · 19% sat five or more' },
      { value: '14 / 21', label: 'AP courses / sections, taught by 12 teachers' },
    ],
    depthTitle: 'What the AP recognition rests on',
    depth: [
      {
        label: 'Breadth over a narrow elite',
        text: 'Platinum recognises schools where a large share of the senior class both takes and scores on AP exams — **80% sat an exam and 73% scored 3+**, so the recognition rests on the whole class, not a handful of specialists.',
      },
      {
        label: 'Depth in the tail',
        text: '**19% of seniors sat five or more AP exams** — a meaningful group carrying a heavy AP load, not just one or two courses.',
      },
      {
        label: 'Staffing',
        text: '**21 sections across 14 AP courses, taught by 12 teachers** — the program is spread across a real faculty rather than concentrated in one or two rooms.',
      },
    ],
    // No multi-year AP ledger: the school publishes a single-year AP snapshot,
    // not the five-year series a merit ledger charts. Left empty per the type's
    // own "omit the ledger by leaving `merit` empty" contract.
    merit: [],
    trustTitle: 'How the grade is framed',
    trust: [
      {
        label: 'Weighted, and does not rank',
        text: 'The 2022 profile reports a weighted-GPA range (**3.64–4.58**) against an unweighted range (**3.35–3.86**) and states the school does not rank students — the range stands in for a rank.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The AP School Honor Roll post states no year. Its metadata (2024-02-12) plus the phrase “last year’s AP exams” points to the 2023 exams — treated as 2023 here, TO VERIFY. Separately, a 94%-of-exams-scoring-3+ figure surfaced in Course Offerings research (May 2025, 145 students); it measures a different denominator (exams, not seniors) and is not conflated with the 73% here.',
      },
      {
        kind: 'gap',
        text: 'No National Merit / College Board recognition ledger is published — no Semifinalist, Finalist or Commended counts by year — so this card carries no merit ledger. The College Planning Timeline references National Merit only through the PSAT/NMSQT.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — AP School Honor Roll (Platinum; participation and score percentages; course/section/teacher counts)', url: AP_HONOR_ROLL },
      { label: 'carmelchristian.org — 2022–23 High School Profile (weighting, rank policy) — cached, Class of 2022, TO VERIFY' },
    ],
  },

  /* ------------------------------------------------------- counseling ------ */
  counseling: {
    headline:
      'One dedicated, NACCAP-certified college counselor runs a fully published program — a grade-by-grade timeline, a signature “College Boot Camp”, an essay workshop, and an admissions panel.',
    subhead:
      'Naviance and the Common Application are the tools; a separate academic advisor and personal counselor carry course-planning and pastoral load off the college office.',
    stats: [
      { value: '1', label: 'dedicated college counselor (NACCAP-certified)' },
      { value: 'Naviance', label: 'platform · Common Application · NCAA code 9999' },
      { value: '4-year', label: 'published grade-by-grade College Planning Timeline' },
      { value: '2 / yr', label: 'excused college-visit absences per student' },
    ],
    rosterTitle: 'Who’s in the office',
    roster: [
      {
        role: 'College Counselor',
        name: 'Marsha Berry',
        detail: 'NACCAP-certified · runs the essay workshop and proofing, submits transcripts and letters of recommendation, trains students on Naviance and the Common App, and writes the counselor LOR.',
      },
      {
        role: 'Academic Advisor',
        name: 'Dan Gwilt',
        detail: 'Course planning for grades 8–11 — the placement work that feeds the transcript.',
      },
      {
        role: 'Personal Counselor / Registrar',
        name: 'Clay Kessler',
        detail: 'Personal counseling and registrar for grades 9–12 — pastoral load carried off the college office.',
      },
      {
        role: 'ES & MS Counselor',
        name: 'Logan Campbell',
        detail: 'Elementary and middle school counseling.',
      },
    ],
    timelineTitle: 'The four-year College Planning Timeline',
    timeline: [
      {
        grade: '9',
        intensity: 'Strong Start & Good Habits',
        items: ['Build the study habits and GPA the transcript rests on', 'Get involved early — the foundation for later leadership'],
        note: 'Focus: be a strong high-school student first',
      },
      {
        grade: '10',
        intensity: 'Involvement & Service',
        items: ['Deepen involvement and service', 'Begin thinking about direction and fit'],
      },
      {
        grade: '11',
        intensity: 'Testing & College Research',
        items: ['**PSAT/NMSQT** — the National Merit gateway', 'March essay rough draft with Berry and English faculty', 'February 1:1 with Berry and family to build the list'],
        note: 'Standardized testing and college research in earnest',
      },
      {
        grade: '12',
        intensity: 'Completing Essays & Applications',
        items: ['**College Boot Camp Day** before senior year (May sign-ups)', 'June/August “Logins and Letters” sessions', 'Early-action applications in October'],
        note: 'Focus: complete essays and applications',
      },
    ],
    mechanicsTitle: 'Anatomy of a College Application — the eight parts the office coaches',
    mechanics: [
      'Transcript',
      'Test scores',
      'Essays',
      'Application',
      'Counselor LOR',
      'Teacher LOR',
      'Activities / service / leadership',
      'Resume',
    ],
    mechanicsNote:
      'That is the office’s own published “Anatomy of a College Application” framework, verbatim — eight named parts. The signature “College Boot Camp” bundles a Boot Camp Day with follow-up “Logins and Letters” sessions; a student essay-writing workshop plus proofing runs alongside, with the 11th-grade rough draft read by Berry and English faculty.',
    reachTitle: 'The office’s reach',
    reach: [
      'College rep visits during Monday/Wednesday Crew classes or lunch (5–20 minutes each)',
      'A **College Admissions Panel** — public, private and Christian-college reps, a financial-aid officer, a Marine recruiter and a campus minister',
      'Naviance links student, counselor and colleges · Common Application · NCAA code 9999',
      'Two excused college-visit absences per student per year',
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The senior class size, the seniors-per-counselor ratio and the annual college-rep-visit count are not published anywhere on the public site — so no caseload figure is stated here rather than derived from an unpublished denominator.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — Guidance staff (names, titles, NACCAP certification)', url: GUIDANCE_STAFF },
      { label: 'carmelchristian.org — College Tips and Information for HS Students (timeline, Boot Camp, tools, panel, rep visits)', url: COLLEGE_TIPS },
    ],
  },

  /* --------------------------------------------------------- outcomes ------ */
  outcomes: {
    headline:
      'Around 215 institutions appear on the published College Acceptances list — Princeton and Duke at the top, through a deep bench of NC publics and Christian colleges.',
    subhead:
      'The page carries no time window, no counts and no matriculation markings, so it reads as a cumulative acceptance list. Here it is scored against the current U.S. News tiers.',
    stats: [
      { value: '~215', label: 'institutions named on the acceptance list (no count stated)' },
      { value: '1 of 8', label: 'Ivy League — Princeton' },
      { value: '~27', label: 'Top-75 National Universities on the list' },
      { value: '8', label: 'HBCUs on the list' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '1 / 8', note: '— Princeton' },
      { tier: '“Ivy Plus”', count: '2 / 17', note: '— adds Duke' },
      { tier: 'Top-75 National Universities', count: '27 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '7 / 75', note: '— Davidson, Washington & Lee, Furman, Rhodes, Sewanee, Agnes Scott, Centre' },
      { tier: 'Power Four', count: '38 / 68' },
      { tier: 'HBCUs', count: '8 / 107', note: '— incl. Hampton, Howard, NC A&T, Florida A&M' },
    ],
    bucketsNote:
      'Counts are derived by this research from the same ~215-institution list you can filter at right, scored against the 2026 U.S. News tables — not figures the school reports. The list preserves the page’s verbatim duplicates (SCAD appears three ways; Alabama appears bare and as Tuscaloosa/Birmingham/Huntsville), and includes two non-college destinations — the United States Marine Corps and NASCAR Technical Institute.',
    collegesTitle: 'Every named acceptance',
    colleges,
    collegesTotal: '~215 institutions · no time window, counts or matriculation markings published',
    scholarships: [
      'No scholarship dollar totals published',
      'No per-class acceptance counts — the list is a single cumulative window',
      'No matriculation markings — acceptances only',
    ],
    scholarshipsNote:
      'The school publishes no scholarship-offer totals and no named-award ledger anywhere in the materials located for this pass.',
    caveat:
      'this is an acceptance list, not a matriculation list — and unlike some peer schools it marks no enrollments at all, so it shows breadth of acceptances rather than where students actually enrolled. No time window or counts are stated, so a name means at least one acceptance at some point.',
    flags: [
      {
        kind: 'verify',
        text: 'The “Xavier University” entry is ambiguous between Xavier (OH) and Xavier of Louisiana (an HBCU); it is left uncategorized pending confirmation, so the HBCU bucket count of 8 excludes it. Bucket membership near the Top-75 line (e.g. Agnes Scott, Hampden-Sydney) should be re-confirmed against the live U.S. News edition at ingest.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — College Acceptances (full named list; no window, counts or markings)', url: ACCEPTANCES },
      { label: 'U.S. News 2026 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings' },
    ],
  },

  /* ------------------------------------------------------------- edge ------ */
  edge: {
    headline:
      'The edge here is a fully published, sequenced counseling program plus a broad-participation AP record — legibility and cadence rather than national-competition credentials.',
    subhead:
      'What the school hands a family is a documented four-year plan and a top-tier College Board recognition; what it does not publish is a research-program or Olympiad track.',
    levers: [
      {
        title: 'Lever 1 — Build the record',
        hint: 'what your child brings',
        glyph: '◆',
        items: [
          '**Platinum AP School Honor Roll** — the College Board’s top tier, earned on broad participation (80% of seniors sat an exam, 73% scored 3+) rather than a narrow elite.',
          '**A heavy-load group exists** — 19% of seniors sat five or more AP exams, across a 14-course / 21-section program.',
          '**A sequenced plan** — the published four-year timeline (Strong Start → Involvement & Service → Testing & Research → Essays & Applications) means a student is building toward the application from 9th grade, not assembling it in senior fall.',
        ],
      },
      {
        title: 'Lever 2 — The office’s leverage',
        hint: 'what the building lends the file',
        glyph: '▲',
        items: [
          '**A NACCAP-certified counselor** — name recognition inside the Christian-college admissions circuit, matching the list’s deepest concentrations (Christian colleges and NC publics).',
          '**A signature program that reps see** — the College Admissions Panel brings public, private and Christian-college reps, a financial-aid officer, a Marine recruiter and a campus minister into one room for families.',
          '**A legible transcript** — a stated weighting range and no-rank policy let a reader reconstruct rigor in context, and the AP Honor Roll gives the program a third-party mark.',
        ],
        note: 'No research program, Olympiad results, or national-competition credentials are published — the differentiators are cadence and legibility, not competition results.',
      },
    ],
    flags: [],
    sources: [
      { label: 'carmelchristian.org — AP School Honor Roll (Platinum recognition)', url: AP_HONOR_ROLL },
      { label: 'carmelchristian.org — College Tips and Information for HS Students (timeline, panel)', url: COLLEGE_TIPS },
      { label: 'carmelchristian.org — Guidance staff (NACCAP certification)', url: GUIDANCE_STAFF },
    ],
  },

  /* -------------------------------------------------------- wholeClass ----- */
  wholeClass: {
    headline:
      'The most recent test and GPA data the research could locate is the Class of 2022 profile — ranges, not distributions, and TO VERIFY until the current-year profile is relocated.',
    subhead:
      'The school does not rank; the current-year School Profile PDF could not be relocated for this pass, so these figures are labeled Class of 2022 rather than presented as current.',
    scoreTables: [
      {
        title: 'SAT & ACT middle-50% ranges',
        hint: '— Class of 2022 · TO VERIFY (from a cached 2022–23 profile)',
        noPercentiles: true,
        rows: [
          { label: 'SAT total (middle 50%)', values: ['1030–1290'] },
          { label: 'ACT composite (middle 50%)', values: ['25–33'] },
        ],
        note: 'Ranges only — the cached profile publishes the middle 50%, not percentiles or tester counts. Labeled Class of 2022 because the current-year profile could not be relocated.',
      },
      {
        title: 'GPA ranges',
        hint: '— Class of 2022 · TO VERIFY',
        noPercentiles: true,
        rows: [
          { label: 'Weighted GPA', values: ['3.64–4.58'] },
          { label: 'Unweighted GPA', values: ['3.35–3.86'] },
        ],
        note: 'Ranges, not a quintile distribution — the school does not rank, and no GPA quantiles are published.',
      },
    ],
    quintiles: [],
    gpaNote:
      'No GPA distribution or quintile table is published — the weighted/unweighted ranges above (Class of 2022) are the entire GPA disclosure the research located.',
    support: [
      {
        label: 'Personal counseling on staff',
        text: 'A Personal Counselor / Registrar (Clay Kessler) serves grades 9–12, distinct from the college office — the pastoral and personal-support channel.',
      },
    ],
    supportNote:
      'No structured learning-differences program, resource room, or accommodations detail is published, and no figures on how testing accommodations are documented were located for this pass.',
    middle: [
      {
        label: 'The list matches a broad class',
        text: 'The acceptance list runs from Princeton and Duke through NC publics (Chapel Hill, NC State, UNC Charlotte, App State, East Carolina), Christian colleges, community colleges and trade destinations (NASCAR Technical Institute) — the spread of a broad, not uniformly elite, class.',
      },
      {
        label: 'When direction changes',
        text: 'Art and specialist destinations appear (SCAD, Ringling College of Art & Design, Watkins College of Art, UNC School of the Arts, New York Film Academy, The American Musical & Dramatic Academy), alongside a UK/international thread (St Andrews, Glasgow, Stirling, York, Brock, Cape Breton).',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Every figure on this card is from a cached 2022–23 profile (Class of 2022); the current-year School Profile PDF 404s under every filename variant and Wayback was rate-limited during this pass. Re-hunt the current profile at ingest and refresh these numbers.',
      },
      {
        kind: 'gap',
        text: 'No score percentiles, no GPA quintiles, no tester counts and no per-quintile outcomes are published — only the ranges above. The shape of the class is not recoverable from public sources.',
      },
    ],
    sources: [
      { label: 'carmelchristian.org — 2022–23 High School Profile (SAT/ACT/GPA ranges, rank policy) — cached, Class of 2022, TO VERIFY' },
      { label: 'carmelchristian.org — College Acceptances (breadth of destinations)', url: ACCEPTANCES },
    ],
  },

  /* ---------------------------------------------------------- verdict ------ */
  verdict: {
    headline:
      'A well-documented, sequenced counseling program and a broad-participation AP record — with the current-year quantitative profile the one real hole a visit should close.',
    subhead:
      'The process disclosure is unusually complete for a school this size; the outcomes and test data are thinner, and the latest profile could not be located.',
    points: [
      {
        label: 'The AP story is broad, not narrow',
        text: 'Platinum AP School Honor Roll earned on whole-class participation — 80% of seniors sat an exam and 73% scored 3+, with 19% sitting five or more.',
      },
      {
        label: 'The counseling program is fully published',
        text: 'A grade-by-grade timeline, a signature College Boot Camp, an essay workshop, an eight-part application framework and an admissions panel — more process detail than several larger peers publish.',
      },
      {
        label: 'A single dedicated counselor',
        text: 'One NACCAP-certified college counselor, cushioned by a separate academic advisor and personal counselor — but the senior caseload is never stated, so ask it directly.',
      },
      {
        label: 'Outcomes show breadth',
        text: 'Around 215 named acceptances led by Princeton and Duke, deep in NC publics and Christian colleges — but the list marks no matriculations, so it shows acceptances, not where students enrolled.',
      },
      {
        label: 'The quantitative profile is stale',
        text: 'The most recent SAT/ACT/GPA data the research located is Class of 2022, from a cached profile; the current-year profile could not be relocated. That is the first thing to ask for on a visit.',
      },
    ],
    checklist: [
      'How many seniors does the college counselor carry at peak season, and how large is the senior class?',
      'Can we see the current-year School Profile — what are this year’s SAT/ACT and GPA figures, and how many students test?',
      'Which AP courses actually run next year, and how are students placed into them?',
      'The acceptance list marks no enrollments — where did last year’s class actually matriculate, and in what concentrations?',
      'How are testing accommodations documented for the College Board and ACT, and what learning-support is available beyond personal counseling?',
      'Roughly how many college reps visit each year, and how does the College Admissions Panel fit the application calendar?',
    ],
    flags: [],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
