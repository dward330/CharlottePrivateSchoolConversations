// Charlotte Christian School — the six College Support cards.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the 2024–25 and 2021–22 School Profile PDFs, the College & Career
// Planning brochure, the College Planning Checklist, and Celebrating Seniors
// 2025. See source-material/college-support/charlotte-christian/Charlotte
// Christian - College Support - Redesign Research 2026.md for the hard data,
// source URLs, and gap notes.
//
// Two things shape what renders here:
//
//  1. Charlotte Christian publishes the fullest AP dashboard in this set —
//     exams, students, pass counts AND AP Scholar breakdowns, two years deep —
//     alongside a mandatory-exam policy, so its 89% rests on a non-self-selected
//     pool. It also publishes a full five-quintile GPA table.
//  2. Its learning-difference support is the weakest-documented area of the
//     entire research set: no named specialist, no named programme, and no
//     published accommodations policy. That is rendered as a gap rather than
//     filled in with the general school-counseling function, which is a
//     different thing and is described as such.
//
// The Class of 2026 figures are absent rather than estimated: Celebrating
// Seniors 2026 is live but exceeded the researcher's fetch limit.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

/* The Classes of 2023–2025 acceptance list: 186 institutions. `enrolling`
   follows the brochure's own key — an asterisk marks a college where at least
   one Class of 2025 graduate enrolled. Rank labels and buckets are scored
   against the 2026 U.S. News tables. */
const colleges = [
  { name: 'Abilene Christian University', cats: [], enrolling: true },
  { name: 'The University of Alabama-Birmingham', cats: [] },
  { name: 'Alabama A&M University', cats: ['hbcu'], enrolling: true },
  { name: 'American University', cats: [] },
  { name: 'Anderson University', cats: [] },
  { name: 'Appalachian State University', cats: [], enrolling: true },
  { name: 'University of Arizona', cats: ['p4'] },
  { name: 'Arizona State University-Tempe', cats: ['p4'] },
  { name: 'University of Arkansas', cats: ['p4'] },
  { name: 'Auburn University', cats: ['p4'], enrolling: true },
  { name: 'Averett University', cats: [] },
  { name: 'Baylor University', cats: ['p4'], enrolling: true },
  { name: 'Belhaven University', cats: [] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [], enrolling: true },
  { name: 'Biola University', cats: [] },
  { name: 'Boston College', cats: ['nu75', 'p4'] },
  { name: 'Boston University', cats: ['nu75'] },
  { name: 'Brevard College', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Butler University', cats: [] },
  { name: 'University of California-Irvine', cats: ['nu75'] },
  { name: 'University of California-San Diego', cats: ['nu75'] },
  { name: 'University of California-Santa Cruz', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Cedarville University', cats: [], enrolling: true },
  { name: 'University of Central Florida', cats: ['p4'] },
  { name: 'Central Piedmont Community College', cats: [], enrolling: true },
  { name: 'Chapman University', cats: [] },
  { name: 'Charleston Southern University', cats: [], enrolling: true },
  { name: 'Christopher Newport University', cats: [], enrolling: true },
  { name: 'University of Cincinnati', cats: ['p4'] },
  { name: 'Clemson University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Coastal Carolina University', cats: [], enrolling: true },
  { name: 'Colby College', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [], enrolling: true },
  { name: 'College of the Ozarks', cats: [] },
  { name: 'College of William and Mary', cats: ['nu75'] },
  { name: 'University of Colorado-Boulder', cats: ['p4'] },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Dark Horse Institute', cats: [] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
  { name: 'Davidson College', cats: ['lac75'], enrolling: true },
  { name: 'University of Delaware', cats: [] },
  { name: 'DePaul University', cats: [] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'East Carolina University', cats: [], enrolling: true },
  { name: 'University of Edinburgh', cats: [] },
  { name: 'Elon University', cats: [], enrolling: true },
  { name: 'Embry-Riddle Aeronautical University-Daytona Beach', cats: [] },
  { name: 'Emerson College', cats: [] },
  { name: 'Emory & Henry College', cats: [] },
  { name: 'Emory University', cats: ['nu75'] },
  { name: 'Fairfield University', cats: [], enrolling: true },
  { name: 'University of Florida', cats: ['nu75', 'p4'] },
  { name: 'Florida Agricultural & Mechanical University', cats: [] },
  { name: 'Florida Gulf Coast University', cats: [] },
  { name: 'Florida International University', cats: [] },
  { name: 'Florida Southern College', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Fordham University', cats: [], enrolling: true },
  { name: 'Furman University', cats: ['lac75'] },
  { name: 'Gardner-Webb University', cats: [] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'] },
  { name: 'George Washington University', cats: ['nu75'] },
  { name: 'University of Georgia', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Georgia Southern University', cats: [], enrolling: true },
  { name: 'Gordon College', cats: [] },
  { name: 'Grove City College', cats: [], enrolling: true },
  { name: 'Guilford College', cats: [] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'Hampton University', cats: ['hbcu'] },
  { name: 'Harding University', cats: [] },
  { name: 'High Point University', cats: [], enrolling: true },
  { name: 'Hillsdale College', cats: ['lac75'] },
  { name: 'Hollins University', cats: [] },
  { name: 'Howard University', cats: ['hbcu'] },
  { name: 'University of Illinois at Urbana-Champaign', cats: ['nu75', 'p4'] },
  { name: 'Indiana University-Bloomington', cats: ['nu75', 'p4'] },
  { name: 'University of Iowa', cats: ['p4'] },
  { name: 'James Madison University', cats: [], enrolling: true },
  { name: 'Johnson C. Smith University', cats: ['hbcu'], enrolling: true },
  { name: 'Kent State University', cats: [] },
  { name: 'University of Kentucky', cats: ['p4'], enrolling: true },
  { name: 'Loyola Marymount University', cats: [] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'LeTourneau University', cats: [] },
  { name: 'Liberty University', cats: [], enrolling: true },
  { name: 'Limestone University', cats: [] },
  { name: 'Lipscomb University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Lynn University', cats: [] },
  { name: 'Marshall University', cats: [], enrolling: true },
  { name: 'University of Maryland-College Park', cats: ['nu75'] },
  { name: 'Marymount University', cats: [] },
  { name: 'University of Mary Washington', cats: [] },
  { name: 'University of Massachusetts-Boston', cats: [] },
  { name: 'Mercer University', cats: [] },
  { name: 'Messiah University', cats: [] },
  { name: 'Methodist University', cats: [] },
  { name: 'University of Miami', cats: ['nu75', 'p4'] },
  { name: 'Miami University-Oxford', cats: [] },
  { name: 'Michigan State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'University of Michigan-Ann Arbor', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'], enrolling: true },
  { name: 'University of Montana', cats: [] },
  { name: 'Montreat College', cats: [] },
  { name: 'Morehouse College', cats: ['hbcu'] },
  { name: 'New College of Florida', cats: [] },
  { name: 'University of New Hampshire', cats: [], enrolling: true },
  { name: 'New York University', cats: ['nu75'], enrolling: true },
  { name: 'University of North Carolina at Asheville', cats: [] },
  { name: 'University of North Carolina at Charlotte', cats: [], enrolling: true },
  { name: 'University of North Carolina at Greensboro', cats: [], enrolling: true },
  { name: 'University of North Carolina at Pembroke', cats: [] },
  { name: 'University of North Carolina at Wilmington', cats: [], enrolling: true },
  { name: 'North Carolina A&T State University', cats: ['hbcu'], enrolling: true },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Northeastern University', cats: ['nu75'] },
  { name: 'North Greenville University', cats: [] },
  { name: 'University of Northern Colorado', cats: [] },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'] },
  { name: 'Nova Southeastern University', cats: [] },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
  { name: 'Ohio University', cats: [] },
  { name: 'University of Oklahoma', cats: ['p4'] },
  { name: 'Oklahoma State University', cats: ['p4'] },
  { name: 'Old Dominion University', cats: [] },
  { name: 'Pace University', cats: [] },
  { name: 'Palm Beach Atlantic University', cats: [] },
  { name: 'Palm Beach State College', cats: [] },
  { name: 'Pennsylvania State University', cats: ['nu75', 'p4'] },
  { name: 'Penn State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Pepperdine University', cats: [] },
  { name: 'University of Pittsburgh-Pittsburgh', cats: ['nu75'] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Purdue University-Main Campus', cats: ['nu75', 'p4'] },
  { name: 'Queens University of Charlotte', cats: [], enrolling: true },
  { name: 'Rensselaer Polytechnic Institute', cats: ['nu75'] },
  { name: 'Rhodes College', cats: ['lac75'] },
  { name: 'University of Richmond', cats: ['lac75'] },
  { name: 'Ringling College of Art & Design', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'University of Rochester', cats: ['nu75'] },
  { name: 'Rochester Institute of Technology', cats: [] },
  { name: 'Rollins College', cats: [] },
  { name: 'Rutgers University-New Brunswick', cats: ['nu75', 'p4'] },
  { name: 'Samford University', cats: [], enrolling: true },
  { name: 'San Diego State University', cats: [] },
  { name: 'Savannah College of Art & Design', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Shenandoah University', cats: [] },
  { name: 'The University of the South', cats: ['lac75'] },
  { name: 'University of South Carolina-Columbia', cats: [] },
  { name: 'University of Southern California', cats: ['nu75', 'p4'] },
  { name: 'University of Southern Mississippi', cats: [] },
  { name: 'University of South Florida', cats: [] },
  { name: 'Southern Methodist University', cats: ['p4'], enrolling: true },
  { name: 'Spelman College', cats: ['lac75', 'hbcu'] },
  { name: 'Stetson University', cats: [] },
  { name: 'Stevens Institute of Technology', cats: [] },
  { name: 'St. John\'s University-New York', cats: [] },
  { name: 'Suffolk University', cats: [] },
  { name: 'The University of Tampa', cats: [] },
  { name: 'Temple University', cats: [] },
  { name: 'The University of Tennessee-Knoxville', cats: ['p4'], enrolling: true },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'Texas Christian University', cats: ['p4'], enrolling: true },
  { name: 'Trinity University', cats: ['lac75'] },
  { name: 'Universal Technical Institute', cats: [] },
  { name: 'University of Virginia', cats: ['nu75', 'p4'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia Polytechnic Institute and State University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'], enrolling: true },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Wheaton College', cats: ['lac75'], enrolling: true },
  { name: 'Wingate University', cats: [], enrolling: true },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', cats: ['lac75'] },
  { name: 'Worcester Polytechnic Institute', cats: [] },
  { name: 'Xavier University of Louisiana', cats: ['hbcu'] },
]

const PROFILE_2425 = 'https://www.charlottechristian.com/academics/college-counseling'
const COUNSELING = 'https://www.charlottechristian.com/academics/college-counseling'
const CCS = 'https://www.charlottechristian.com'

export const charlotteChristian: CollegeSupportProgram = {
  /* The area's FIRST card. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/charlotte-christian/
     Charlotte Christian School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Charlotte Christian School’s applicants were admitted at a pooled 54.8% over the last five entering classes — 382 acceptances from 697 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 26.3% in Fall 2025 — 10 of 38 — against far higher rates at the less-selective universities. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '697', label: 'applications to the six universities, Fall 2021–2025' },
      { value: '54.8%', label: 'pooled admit rate — 382 of 697 across those five classes' },
      { value: '26.3%', label: 'at UNC-Chapel Hill — 10 of 38, the toughest of the six for this school' },
      { value: 'UNC-Chapel Hill', label: 'drew the most applications in Fall 2025 (38)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · Chapel Hill · the most selective of the six',
        applied: '38',
        accepted: '10',
        rate: '26.3%',
        ratePct: 0.263,
        fiveYearRate: '28.2%',
        fiveYearApplied: '163',
        fiveYearAccepted: '46',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '31',
        accepted: '14',
        rate: '45.2%',
        ratePct: 0.452,
        fiveYearRate: '35.4%',
        fiveYearApplied: '206',
        fiveYearAccepted: '73',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '11',
        accepted: '8',
        rate: '72.7%',
        ratePct: 0.727,
        fiveYearRate: '86.6%',
        fiveYearApplied: '119',
        fiveYearAccepted: '103',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · eastern NC',
        applied: '9',
        accepted: '8',
        rate: '88.9%',
        ratePct: 0.889,
        fiveYearRate: '96.3%',
        fiveYearApplied: '80',
        fiveYearAccepted: '77',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '15',
        accepted: '9',
        rate: '60.0%',
        ratePct: 0.6,
        fiveYearRate: '57.8%',
        fiveYearApplied: '109',
        fiveYearAccepted: '63',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad · largest admit rates of the six',
        applied: '3',
        accepted: '3',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '100.0%',
        fiveYearApplied: '20',
        fiveYearAccepted: '20',
      },
    ],
    methodNote:
      'Read each row as a joint figure: the rate at which that university admitted this school’s applicants — not the university’s overall admit rate, and not a measure of the school’s own selectivity. Applied/Accepted are the Fall 2025 entering class; the 5-yr column pools Fall 2021–2025 as sum(accepted)/sum(applied), so a heavy year counts more than a light one. Counts travel with every rate because several cells are single-digit.',
    flags: [
      {
        kind: 'verify',
        text: 'Rank order follows the US News **National Universities** table for NC publics. That qualifier matters: Appalachian State is ranked in **Regional Universities South**, a different list, so “top 6 in NC” is not self-defining. Re-score when the next edition lands.',
      },
    ],
    sources: [
      {
        label: 'insight.northcarolina.edu — Applied, Admitted, Enrolled (Fall 2016–2025)',
        url: 'https://insight.northcarolina.edu/t/Public/views/db_freshmen/AppliedAdmittedEnrolled?:embed=y&:isGuestRedirectFromVizportal=y',
      },
    ],
  },
  transcript: {
    headline:
      'Students in AP classes are required to sit the exam, and 89% of 2024’s exams scored 3 or higher — a rate earned on a mandated rather than self-selected pool.',
    subhead:
      'Charlotte Christian publishes the fullest AP dashboard in this set: exams, students, pass counts and a full AP Scholar breakdown, two years deep. Four credits of Biblical Studies are the transcript’s defining signature.',
    stats: [
      { value: '298', label: 'AP exams taken in 2024 (151 students)' },
      { value: '89%', label: 'of exams scored 3+ — up from 78% in 2021' },
      { value: '59', label: 'AP Scholar awards in 2024 · 203 across 2023–25' },
      { value: 'No rank', label: 'a published five-quintile GPA table stands in' },
    ],
    merit: [
      { year: '15-yr (2024–25 profile)', detail: '**14** Finalists · **48** Commended Scholars' },
      { year: '15-yr (2021–22 profile)', detail: '**16** Finalists · **45** Commended Scholars' },
      { year: '2025', detail: '**1** Commended Scholar (Jack Krause) — press separately names a Semifinalist the school does not list', unconfirmed: true },
      { year: '2025', detail: '**4** College Board National Recognition awards — 1 African American, 3 Hispanic (Class of 2024: 5)' },
    ],
    meritNote:
      'Both National Merit figures are rolling 15-year windows, which is why the Finalist count can fall from 16 to 14 while Commended rises from 45 to 48 — strong older years drop out of the window. That is arithmetically possible rather than an error, but the school does not explain it, and no per-class-year ledger is published in any edition.',
    depth: [
      {
        label: 'Mathematics',
        text: '**Calculus III** is genuine post-AP depth — multivariable and vector-valued functions, curvature, double and triple integrals, vector analysis and differential equations. It requires a 93% in AP Calculus AB or completion of BC.',
      },
      {
        label: 'Physics',
        text: 'Calculus III is paired on the profile with **AP Physics C: Electricity & Magnetism**, alongside AP Physics C: Mechanics.',
      },
      {
        label: 'Computer science',
        text: '**Thin.** A single AP Computer Science appears in the 2021–22 profile, and the current curriculum page lists no dedicated Upper School computer-science courses at all — coding work sits in Middle School electives, alongside a VEX robotics team.',
      },
      {
        label: 'World language',
        text: 'AP French, AP Spanish Language, **AP Spanish Literature** and AP Latin, over Honors ladders running to level IV. No post-AP language seminar is published.',
      },
      {
        label: 'Beyond campus',
        text: '**Winterim** supplies internships and travel. The school states plainly that it does **not maintain a formal dual-enrolment programme**.',
      },
    ],
    trust: [
      {
        label: 'Weighted — and deliberately halved',
        text: '**+0.5 for Honors, +1.0 for AP** on a 4.0 base. Note the school **halved its weighting** with the Class of 2019, down from +1.0 and +2.0, so any pre-2019 GPA is not comparable to a current one.',
      },
      {
        label: 'No rank → a five-quintile table',
        text: '“Charlotte Christian School does not rank its students”, stated flatly in both profiles — but a full five-quintile GPA table through the sixth semester is published every year, letting colleges locate a band without a rank.',
      },
      {
        label: 'A Christian-specific load signature',
        text: 'Graduation requires **27 credits including 4 of Biblical Studies**, plus a January Term credit and a half-credit Junior Seminar. Those four credits consume elective space peer schools spend elsewhere, and they are the transcript’s most distinctive feature.',
      },
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'The school markets “45+ AP and honors courses” while roughly 23 AP courses can actually be enumerated from its published materials. Both figures come from the school; the enumerable count is the verifiable one.',
      },
      {
        kind: 'verify',
        text: 'Press coverage of the 71st National Merit competition names a Class of 2025 Semifinalist who appears neither in the school’s own National Merit block nor in its senior enrollment roster, which lists only a Commended Scholar. The two sources are inconsistent about who the honorees were.',
      },
      {
        kind: 'gap',
        text: 'Only the 3+ threshold is reported — the share of exams scoring 4 or 5 is not published in any year, so no 4–5 rate should be inferred. “Most rigorous” course-load norms are likewise undefined: there is no published rubric and no statement of what fraction of students take the most demanding programme.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — College Counseling and School Profile', url: PROFILE_2425 },
      { label: 'Academics — Upper School curriculum', url: 'https://www.charlottechristian.com/academics' },
    ],
  },

  counseling: {
    headline:
      'Two college counselors split the alphabet and carry all four grades each — roughly 47 seniors apiece — under a director who has held the seat at least four years.',
    subhead:
      'The distinctive structure is Junior Seminar: a required, graded half-credit course with a mock admission committee and two mandatory college visits, rather than an optional evening programme.',
    stats: [
      { value: '~47:1', label: 'seniors per counselor (derived — no ratio is published)' },
      { value: '2', label: 'college counselors — Foxx takes K–Z, Miller A–J' },
      { value: '0.5 credit', label: 'Junior Seminar is a graded graduation requirement' },
      { value: 'Scoir', label: 'platform — not Naviance' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Jodi Foxx',
        detail: 'Director of College Counseling in both the 2021–22 and 2024–25 profiles — at least four years in the role. Students K–Z.',
      },
      {
        role: 'College Counselor',
        name: 'Lauren Miller',
        detail: 'Students A–J. Succeeded Katrina Cassier, who held the seat in 2021–22.',
      },
      {
        role: 'Registrar',
        name: 'Kirsten Mayers',
        detail: 'Owns transcripts. Personal counseling is a separate function with its own staff.',
      },
    ],
    timelineTitle: 'The four-year timeline — when individualized support begins',
    timeline: [
      {
        grade: '9',
        intensity: 'Foundational',
        items: ['Freshman Seminar, hosted in the **WIN Lab**', 'Counseling formally begins — the brochure says 8th grade, the website 9th'],
      },
      {
        grade: '10',
        intensity: 'Ramps up',
        items: ['Course-selection guidance toward Honors and AP placement', 'PSAT'],
      },
      {
        grade: '11',
        intensity: 'In earnest',
        items: ['**Junior Seminar** — a required, graded 0.5-credit course', '**Mock admission committee** exercise inside the course', '**Two mandatory college visits**'],
        note: 'The most structured junior-year requirement in this set',
      },
      {
        grade: '12',
        intensity: 'Intensive',
        items: ['Application and essay support', 'Financial-aid programming', 'Scholarship applications — ~90 named awards published for the class'],
      },
    ],
    mechanicsTitle: 'The mechanics the office owns',
    mechanics: [
      'Applications',
      'Essays',
      'Standardized testing',
      'Teacher recs',
      'Financial aid',
      'Scholarship search',
    ],
    mechanicsNote:
      'Test-optional strategy is an explicit counseling topic rather than an unstated assumption — notable given only about 84% of the class sat the SAT and 35% the ACT.',
    reach: [
      'Scoir · an annually published School Profile · CEEB **340667**',
      'NACAC · SACAC · **NACCAP** — the Christian-college counseling association',
      'A published College Planning Checklist and College & Career Planning brochure',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'Both ratios are derived — 435 Upper Schoolers ÷ 2 gives ~218:1 across all four grades, and 94 seniors ÷ 2 gives ~47:1. The school publishes neither. Because the split is alphabetical, each counselor genuinely carries all four grades, so the 218:1 figure is the honest load measure and 47:1 describes senior-year intensity. The two personal counselors are not college counselors and do not belong in the denominator.',
      },
      {
        kind: 'discrepancy',
        text: 'One Upper School counselor appears as “Olivia McCarrick” on the 2024–25 profile and “Olivia Brilhante” on the counseling brochure and Student Counseling page. Most likely the same person following a name change, but the school publishes both and it is not confirmed. The Upper School Principal is likewise listed as two different people across sources.',
      },
      {
        kind: 'gap',
        text: 'No counselor tenure, prior employer or professional background is published for anyone on the team, and no bios appear on the college counseling page. Neither rep-visit counts nor counselor campus-visit counts are published.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — College Counseling', url: COUNSELING },
      { label: 'Student Counseling (personal counseling, credentials)', url: 'https://www.charlottechristian.com/student-life' },
    ],
  },

  outcomes: {
    headline:
      '409 acceptances for 94 graduates, and 99% of graduates go on to a four-year college — but only about a sixth of the accepting institutions actually enrolled anyone.',
    subhead:
      'Charlotte Christian is the only school here that gives Christian colleges and HBCUs their own named tiers, and 14% of recent graduates attend a Christian college.',
    stats: [
      { value: '99%', label: 'of graduates attend a four-year college (100% offered admission)' },
      { value: '409', label: 'acceptances for 94 graduates — about 4.4 each' },
      { value: '64%', label: 'attend out of state · 35% private · 14% Christian college' },
      { value: '$6.4M', label: 'scholarships, Class of 2025 · $13.9M across 2023–25' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '2 / 8', note: '— Cornell and Dartmouth; Yale appears only on the older list' },
      { tier: '“Ivy Plus”', count: '4 / 17' },
      { tier: 'Top-75 National Universities', count: '30 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '7 / 75' },
      { tier: 'Power Four', count: '40 / 68' },
      { tier: 'HBCUs', count: '10 / 107', note: '— Historically Black Colleges & Universities' },
    ],
    bucketsNote:
      'Counts are computed from the same 186-institution list you can filter at right, scored against the 2026 U.S. News tables — derived analysis, not school-reported. Six of the eight Ivies are absent from the 2023–25 list; Harvard, Princeton, Brown and Penn appear on neither published list. Top-75 boundary placements in the 40–75 band are indicative, as the ranking source could not be machine-verified in full.',
    collegesTitle: 'Every acceptance, 2023–2025',
    colleges,
    collegesTotal: '186 institutions · bold = a Class of 2025 graduate enrolled',
    scholarships: [
      '$6.4M scholarships · Class of 2025',
      '$13,875,968 across the Classes of 2023–25',
      'SMU Hunt Leadership Scholars Program',
      '~90 individually named awards published',
      'Athletic awards at Florida State, Wake Forest, Kentucky',
    ],
    scholarshipsNote:
      'The Class of 2025 total is printed in the school’s own Celebrating Seniors booklet as “$6,400,00” — a digit is missing, and the school’s website renders the same figure as “more than $6.4 million”, which is used here. Publishing roughly ninety individually named awards is unusually granular. Morehead-Cain, QuestBridge and ROTC outcomes are not published, and no federal service academy appears on either list.',
    caveat:
      'this is an acceptance list across three graduating classes, not a matriculation list. The asterisk marks enrollment for the Class of 2025 only — and Duke, Cornell, Georgetown, Notre Dame, Emory, USC, UVA, Michigan, William & Mary, Colby and Boston College all carry no asterisk, meaning no Class of 2025 graduate enrolled at any of them. The most selective actual enrollments were Dartmouth (a football signee), Davidson (a golf signee), NYU (the valedictorian) and UNC–Chapel Hill (five students). The window starts at 2023, matching the floor the other schools here share; the Class of 2026 has not yet been published as a graduating class, so no 2026 acceptance list exists to extend it forward.',
    flags: [
      {
        kind: 'discrepancy',
        text: 'The school claims “99% attend a four-year college”, but its own named Class of 2025 roster shows about five of 94 graduates at a community college, a real-estate school, in childcare or taking a postgraduate year — closer to 95%. Both are the school’s own figures.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — College Counseling (School Profile, acceptance list)', url: COUNSELING },
      { label: 'College & Career Planning brochure (Classes of 2023–25 list, sector split)', url: CCS },
      { label: 'U.S. News 2026 rankings (tier scoring)', url: 'https://www.usnews.com/best-colleges/rankings/national-universities' },
    ],
  },

  edge: {
    headline:
      'The Academic Conservatory is the real differentiator — a transcript-noted arts credential — and Winterim puts every student somewhere off campus each January.',
    subhead:
      'The second lever is a Christian-college network most peer schools do not have: NACCAP membership and a named Christian-college tier that 14% of graduates actually use.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        glyph: '◆',
        items: [
          '**Academic Conservatory** — the school’s strongest published credential, and critically it is **noted on the transcript**, so it reaches the admissions reader rather than living only in a résumé. Described across sources as covering six or eight areas.',
          '**Winterim / January Term** — a required credit every year (0.25 per year toward graduation), supplying internships, travel and vocational shadowing. Note the vocational shadowing component is small: only about seven placements are published.',
          '**Junior Seminar** — a required, graded half-credit course containing a mock admission committee and two mandatory college visits. Structurally stronger than the optional evening programming most schools offer.',
          '**Athletic recruiting at scale** — 21 signees in the Class of 2025, roughly 22% of a 94-student class, with athletic scholarships at Florida State, Queens, Wake Forest, Kentucky and New Hampshire.',
          '**Seal of Biliteracy** — implemented in 2019 and awarded on a proficiency exam across two languages, though the share earning it fell from 11% of the Class of 2021 to 4% of the Class of 2024.',
        ],
      },
      {
        title: 'Lever 2 — The school’s leverage',
        glyph: '▲',
        items: [
          '**A Christian-college network with its own membership** — Charlotte Christian belongs to **NACCAP**, the Christian-college counseling association, alongside NACAC and SACAC. Its brochure gives Christian colleges a named tier, and 14% of graduates enroll at one, with live pipelines to Wheaton, Liberty, Samford, Cedarville, Grove City, Baylor and Abilene Christian.',
          '**A named HBCU tier** — Hampton, Howard, Morehouse, NC A&T and Spelman are listed as a distinct group, with confirmed Class of 2025 enrollments at NC A&T and Johnson C. Smith.',
          '**The School Profile as an instrument** — it publishes a full AP dashboard with AP Scholar breakdowns, a five-quintile GPA table, the grading scale, the weighting formula and the weighting change at the Class of 2019, plus CEEB 340667.',
          '**Granular scholarship reporting** — roughly ninety individually named awards published for a single class is far more specific than a headline dollar figure, and lets a family see which institutions actually fund this school’s students.',
        ],
        note:
          'The school does not publish a disciplinary-disclosure policy — whether and how suspensions or honor violations reach the secondary school report is absent despite NACAC membership.',
      },
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'The Academic Conservatory is described as covering six areas in the School Profile and eight on the website. Both are the school’s own figures.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Academic Conservatory', url: 'https://www.charlottechristian.com/academics' },
      { label: 'College & Career Planning brochure (Christian college and HBCU tiers)', url: CCS },
      { label: 'College Counseling (memberships, profile)', url: COUNSELING },
    ],
  },

  wholeClass: {
    headline:
      'A full five-quintile GPA table, published every year — and a visible three-year grade inflation in it, with every boundary rising while the bottom floor fell.',
    subhead:
      'The median student sits in the third quintile at roughly 3.69–4.06 weighted; because Honors adds 0.5 and AP a full point, a 4.277 top-quintile floor implies a heavy advanced load rather than a perfect record.',
    scoreTables: [
      {
        title: 'SAT score percentiles',
        hint: '— Class of 2025 · 79 testers of 94 graduates (~84%)',
        rows: [{ label: 'SAT total', values: ['—', '1110', '—', '1340', '—', '—'] }],
        note:
          'The school publishes the composite middle-50% band and a tester count only. Those endpoints ARE the 25th and 75th percentiles; the mean, the median and any Reading or Maths section split are unpublished, so none is interpolated here.',
      },
      {
        title: 'ACT score percentiles',
        hint: '— Class of 2025 · 33 testers of 94 graduates (~35%)',
        rows: [{ label: 'ACT composite', values: ['—', '23', '—', '29', '—', '—'] }],
        note:
          '79 SAT plus 33 ACT testers against 94 graduates implies substantial overlap, and since test-optional strategy is an explicit counseling topic, some graduates likely sat neither. The school publishes no combined “share who tested” figure.',
      },
    ],
    gpaTitle: 'GPA percentiles',
    gpaHint: '— the no-rank mechanism · Class of 2025 weighted GPA through the sixth semester',
    quintiles: [
      { label: 'First fifth', gpa: '4.277–4.578', detail: 'a heavy AP and Honors load' },
      { label: 'Second', gpa: '4.067–4.273', detail: 'strong advanced coursework' },
      { label: 'Third', gpa: '3.686–4.055', detail: 'the median student sits here' },
      { label: 'Fourth', gpa: '3.124–3.676', detail: 'real, named destinations exist' },
      { label: 'Fifth', gpa: '1.941–3.058', detail: 'the floor of the published table' },
    ],
    gpaNote:
      'All five quintiles are the school’s own published figures. Comparing them with the Class of 2022 table shows material movement in three years: every quintile boundary rose — the first-quintile floor from 4.133 to 4.277 and the third from 3.56 to 3.686 — while the fifth-quintile floor FELL from 2.179 to 1.941. The distribution rose at the top and stretched at the bottom. No unweighted distribution is published.',
    support: [
      {
        label: 'What is published is counseling, not learning support',
        text: 'Two Upper School counselors provide study-skills instruction, course-selection guidance, academic progress monitoring, test-anxiety management, and referrals to outside resources. That is a general counseling function rather than a learning-differences programme.',
      },
      {
        label: 'Credentials are a genuine strength',
        text: 'All counselors hold master’s degrees in counseling or a related field, and several hold clinical licences — LCMHC or LCSW.',
      },
      {
        label: 'The named academic-support structures',
        text: '**WIN (“What I Need”) labs** and advisory lessons are the named Upper School academic-support structure, and the **Media & Writing Center** is free and writing-specific. What WIN Lab delivers academically is not described.',
      },
    ],
    supportNote:
      'This is the weakest-documented area in the entire research set. No named learning specialist, no named learning-differences programme, no psycho-educational testing, no 504 or accommodation-plan process, no extended-time policy and no College Board accommodations coordination could be found. Given the school gates Honors and AP placement on an A in the prerequisite course AND mandates AP exams, that combination makes this a priority question rather than a footnote.',
    middle: [
      {
        label: 'The middle may be the best-served cohort',
        text: 'The list spans Dartmouth and Duke down to Central Piedmont Community College, Universal Technical Institute, Brevard, Montreat, Belmont Abbey, Limestone, Winthrop, Wingate and Methodist. A fourth- or fifth-quintile student at 3.12 or below has real, named destinations, and the checklist instructs students to include “every possible type of college that might be of interest”.',
      },
      {
        label: 'The Christian-college route is real, not decorative',
        text: '14% of recent graduates enroll at a Christian college, with multiple confirmed Class of 2025 enrollments at Wheaton, Liberty, Samford, Charleston Southern, Cedarville, Grove City, Baylor and Abilene Christian.',
      },
      {
        label: 'Vocational and non-traditional',
        text: 'Universal Technical Institute and Central Piedmont Community College both appear as acceptances, and Central Piedmont as an actual enrollment. No federal service academy appears on either published list.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The 2021–22 profile published no test scores at all, stating it had “insufficient testing results to report middle 50% test score ranges” for the Class of 2022 — so no multi-year test trend exists, and the 2024–25 edition is the only one carrying SAT and ACT bands.',
      },
      {
        kind: 'gap',
        text: 'No gap-year policy or counselling is published, and neither is any unweighted GPA distribution.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — School Profile (test bands, quintile table)', url: PROFILE_2425 },
      { label: 'Student Counseling (counselor credentials, WIN labs)', url: 'https://www.charlottechristian.com/student-life' },
    ],
  },

  verdict: {
    headline:
      'A structurally rigorous, transparent transcript — mandatory AP exams, a full published quintile table, a granular AP dashboard — attached to the thinnest learning-support disclosure in this set.',
    subhead:
      'The academic reporting is unusually honest. The gaps are concentrated in exactly one place, which makes the tour questions easy to aim.',
    points: [
      {
        label: 'AP exams are mandatory, so the pass rate means something',
        text: '“Students in AP classes are required to take the AP exam” — so 89% scoring 3+ in 2024, up from 78% in 2021, rests on a non-self-selected pool rather than only confident testers.',
      },
      {
        label: 'The AP dashboard is the fullest in this set',
        text: 'exams, students, pass counts and a complete AP Scholar breakdown, published two years deep — 59 AP Scholar awards in 2024 and 203 across the Classes of 2023–25.',
      },
      {
        label: 'A real quintile table, published annually',
        text: 'five quintiles through the sixth semester, so colleges can locate a student’s band without a rank — and comparing editions makes three-year grade movement visible rather than hidden.',
      },
      {
        label: 'Junior Seminar is a requirement, not an invitation',
        text: 'a graded half-credit course carrying a mock admission committee and two mandatory college visits — more structured than the optional evening programming peers offer.',
      },
      {
        label: 'The Conservatory reaches the reader',
        text: 'it is noted on the transcript, so the credential lands in the admissions file rather than only on a résumé.',
      },
      {
        label: 'A distinctive network the others do not have',
        text: 'NACCAP membership plus named Christian-college and HBCU tiers, with 14% of graduates actually enrolling at a Christian college and confirmed pipelines to Wheaton, Liberty, Samford and Baylor.',
      },
    ],
    checklist: [
      'You publish no named learning specialist, no learning-differences programme and no accommodations policy. Who supports a student with a diagnosed learning difference, and who coordinates College Board accommodations?',
      'Honors and AP placement requires an A in the prerequisite course and AP exams are mandatory. How does that combination work for a student with accommodations?',
      'What share of AP exams scored 4 or 5? Only the 3+ threshold is published.',
      'Your marketing says “45+ AP and honors courses” but roughly 23 AP courses can be enumerated. What is the actual count?',
      'Your profile reports 14 National Merit finalists on a rolling 15-year window, down from 16 three years earlier. What were the per-class counts for the last five years?',
      'The school lists one Commended Scholar for the Class of 2025 while press coverage names a Semifinalist you do not list. Which is right?',
      'You state 99% attend a four-year college, but the named senior roster shows about five of 94 elsewhere. How is that 99% calculated?',
      'What are the Class of 2026 figures — acceptances, scholarships, and test bands? None are published yet.',
    ],
    flags: [],
    sources: [
      { label: 'charlottechristian.com — College Counseling', url: COUNSELING },
      { label: 'School Profile and College & Career Planning brochure', url: CCS },
      { label: 'Verdict synthesised by the researcher from the sources cited on the cards above', },
    ],
  },
}
