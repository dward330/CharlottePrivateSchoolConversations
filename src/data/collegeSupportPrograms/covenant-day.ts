// Covenant Day School — College Support research area.
//
// Every figure is traceable to source-material/college-support/covenant-day/ —
// principally the Redesign Research 2026 dossier (bucket classification worked
// member by member) and the Outcomes file (matriculation recovered from the
// profile PDFs' bold markings via pdfplumber).
//
// All six cards render. `wholeClass` ships PARTIAL by design: the school's
// aggregate tables are strong (five-year AP series, per-class SAT/ACT, AP
// Scholar tiers) but it publishes no distributions — no GPA quantiles, no
// score percentiles — which follows from its stated no-rank policy. That
// absence is flagged on the card rather than padded over.
//
// PDF-edition dating: by COVER TEXT only. Filenames and internal metadata are
// both wrong (see the dossier's table).

import type { CollegeSupportProgram } from '../collegeSupport.ts'

const GUIDANCE = 'https://www.covenantday.org/academics/college-guidance'
const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1758547252/covenant/x8i0qddxvctsp5jqbpmt/2025-26HSGuidanceProfile.pdf'
const PROFILE_2425 =
  'https://resources.finalsite.net/images/v1726168257/covenant/jg1wjr67fw5ewgwy5bkz/2024-2025HSGuidanceProfilefinal_1.pdf'
const PROFILE_2324 =
  'https://resources.finalsite.net/images/v1695399666/covenant/zogqb5jfwbqp0henpd36/HighSchoolProfileFINAL9-12.pdf'
const HS_ACADEMICS = 'https://www.covenantday.org/academics/high-school'

export const covenantDay: CollegeSupportProgram = {
  /* The area's FIRST card. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/covenant-day/
     Covenant Day School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Covenant Day School’s applicants were admitted at a pooled 60.3% over the last five entering classes — 301 acceptances from 499 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 34.6% pooled there, against far higher rates at the less-selective campuses. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '499', label: 'applications to the six campuses, Fall 2021–2025' },
      { value: '60.3%', label: 'pooled admit rate — 301 of 499 across those five classes' },
      { value: '34.6%', label: 'at UNC-Chapel Hill — 47 of 136, the most selective of the six' },
      { value: 'NC State University', label: 'drew the most applications in Fall 2025 (42)' },
    ],
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · the most selective of the six',
        applied: '33',
        accepted: '9',
        rate: '27.3%',
        ratePct: 0.273,
        fiveYearRate: '34.6%',
        fiveYearApplied: '136',
        fiveYearAccepted: '47',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '42',
        accepted: '22',
        rate: '52.4%',
        ratePct: 0.524,
        fiveYearRate: '58.3%',
        fiveYearApplied: '168',
        fiveYearAccepted: '98',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '19',
        accepted: '17',
        rate: '89.5%',
        ratePct: 0.895,
        fiveYearRate: '90.5%',
        fiveYearApplied: '63',
        fiveYearAccepted: '57',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · largest admit rates of the six',
        applied: '7',
        accepted: '6',
        rate: '85.7%',
        ratePct: 0.857,
        fiveYearRate: '84.2%',
        fiveYearApplied: '38',
        fiveYearAccepted: '32',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '22',
        accepted: '16',
        rate: '72.7%',
        ratePct: 0.727,
        fiveYearRate: '70.0%',
        fiveYearApplied: '80',
        fiveYearAccepted: '56',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad',
        applied: '5',
        accepted: '2',
        rate: '40.0%',
        ratePct: 0.4,
        fiveYearRate: '78.6%',
        fiveYearApplied: '14',
        fiveYearAccepted: '11',
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
  /* -------------------------------------------------------- 3a transcript -- */
  transcript: {
    headline:
      '96% of AP exam scores were a 3 or higher in 2026 — the top of a five-year climb from 84% — and every AP student must sit the exam.',
    subhead:
      'A gated AP program: none for freshmen, one for sophomores, with dual enrollment through Covenant College layered on top.',
    stats: [
      { value: '96%', label: 'of AP exams scored 3+ in 2026 (401 exams, 179 students)' },
      { value: '78%', label: 'of AP scores were a 4 or 5' },
      { value: '1263 / 26', label: 'Class of 2026 SAT / ACT averages' },
      { value: '80%', label: 'of HS faculty hold advanced degrees' },
    ],
    meritTitle: 'The five-year AP line, as the profile charts it',
    merit: [
      { year: '2022', detail: '84% of AP exam scores 3+' },
      { year: '2023', detail: '93% — Class of 2023: 161 students, 324 exams; SAT 1268 / ACT 26' },
      { year: '2024', detail: '92% — Class of 2024: 168 students, 344 exams; SAT 1243 / ACT 27' },
      { year: '2025', detail: '96%' },
      { year: '2026', detail: '96% — 38 AP Scholars with Distinction, 27 with Honor, 33 Scholars' },
    ],
    meritNote:
      'Since 2006 — the first graduating class — the school counts 28 National Merit Finalists and 70 Commended students, a ledger that grew by two Finalists and nine Commended between the last two profile editions.',
    depthTitle: 'The rigor architecture',
    depth: [
      { label: 'Weighting', text: 'A+ = 4.33 unweighted; Honors +0.5; Dual Enrollment and AP +1.0. GPA computed on all subjects, grades 9–12.' },
      { label: 'AP gating', text: 'No AP for freshmen; sophomores capped at one. The profile itself calls two junior-year and four senior-year APs "a very demanding course load."' },
      { label: 'Dual enrollment', text: 'Honors Calculus, Statistics, and Literature & Philosophy carry Covenant College credit; SevenStar Academy extends the catalog online, noted on the transcript.' },
      { label: 'Graduation', text: '25 Carnegie Units, including 3 units of Bible (a Bible course every year) and a Fine Arts unit.' },
    ],
    trustTitle: 'Why colleges can read the grades',
    trust: [
      { label: 'Every AP student tests', text: 'All students enrolled in AP courses are required to take the exams — so the 96% pass rate covers the whole AP population, not a self-selected slice.' },
      { label: 'No rank, stated in full', text: '"Due to the small class size and the college-bound nature of Covenant Day’s population, we believe that class rank is not a strong discriminator… Therefore, we do not rank."' },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The AP course count moves with enrollment: 15 APs in the 2026–27 profile matrix, but up to 18 in the 2024–25 edition (which carried AP Calculus BC, Human Geography and French). Ask which APs actually run in your student’s year.',
      },
    ],
    sources: [
      { label: 'High School Profile 2026–2027 (PDF)', url: PROFILE_2627 },
      { label: 'High School Profile 2024–2025 (PDF)', url: PROFILE_2425 },
      { label: 'High School Profile 2023–24 (PDF)', url: PROFILE_2324 },
    ],
  },

  /* -------------------------------------------------------- 3b counseling -- */
  counseling: {
    headline:
      'One dedicated college counseling director — in her 23rd year at the school — for 85 seniors, the heaviest caseload in this comparison.',
    subhead:
      'The office is relational rather than productized: a NACCAP Professional of the Year with thirty years in guidance, meeting juniors and seniors throughout.',
    stats: [
      { value: '85:1', label: 'seniors per dedicated college counselor' },
      { value: '2003', label: 'the director’s tenure start at Covenant Day' },
      { value: '4', label: 'people in the guidance office' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Heather Mills',
        detail:
          'Director of Guidance and College Counseling since 2003; thirty years in guidance and college counseling; BA Oklahoma Wesleyan, MA Winthrop; named a NACCAP K-12 Professional of the Year.',
      },
      {
        role: 'Counselor',
        name: 'Kim Macurda',
        detail: 'Guidance Counselor since 2016. BA UNC Chapel Hill; MA Georgia State; former Reformed Theological Seminary registrar.',
      },
      {
        role: 'Personal',
        name: 'Emily Lee, MA, LMFT',
        detail: 'Licensed Marriage and Family Therapist, since 2021 — the clinical role, distinct from the college office.',
      },
      {
        role: 'Assistant',
        name: 'Kelly Turner',
        detail: 'Guidance Assistant since 2012.',
      },
    ],
    timelineTitle: 'The published cadence',
    timeline: [
      {
        grade: '9–10',
        intensity: 'Course-planning',
        items: ['Academic advising on course selection', 'Honors/AP placement via coursework, grades and teacher feedback'],
        note: 'No formal underclass counseling curriculum is published.',
      },
      {
        grade: '11–12',
        intensity: 'College-facing',
        items: ['The office "meets with juniors and seniors throughout their high school careers"', 'One-on-one support from course planning to application to scholarship search', 'College rep visits via the College Representatives page'],
      },
    ],
    mechanicsTitle: 'What the office says it covers',
    mechanics: [
      'Course planning toward college goals',
      'Building a strong application',
      'Identifying scholarship opportunities',
      'Academic advising and student counseling',
      'The annual High School Profile (CEEB 342532)',
    ],
    mechanicsNote:
      'The profile is the office’s application artifact: weighting key, rank policy, AP gating and the acceptance list in a two-page PDF, refreshed annually — three editions verified.',
    reach: [
      'NACCAP membership plus a Professional of the Year director — name recognition inside the Christian-college admissions circuit',
      'NACAC membership on the mainstream side',
      'A standing dual-enrollment pipe to Covenant College, the PCA’s denominational college',
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No grade-by-grade counseling timeline is published — only the junior/senior meeting cadence — and no college-counseling platform (Naviance, Scoir) is named anywhere on the public site.',
      },
      {
        kind: 'verify',
        text: 'The 85:1 ratio is derived (85 seniors ÷ 1 dedicated director). The second guidance counselor carries non-college load, so the effective college caseload may be lighter than the headline — but the school never states one.',
      },
    ],
    sources: [
      { label: 'covenantday.org — College Guidance (roster, bios)', url: GUIDANCE },
      { label: 'covenantday.org — High School academics', url: HS_ACADEMICS },
      { label: 'High School Profile 2026–2027 (85 seniors, staff table)', url: PROFILE_2627 },
    ],
  },

  /* ---------------------------------------------------------- 3c outcomes -- */
  outcomes: {
    headline:
      '225 institutions on the published 2023–2026 acceptance list — with matriculations bolded, so you can see where students actually went.',
    subhead:
      'The current window reaches Dartmouth, Penn and Duke — all three bolded as enrolled — with the deepest concentrations at NC publics and Christian colleges.',
    stats: [
      { value: '225', label: 'institutions on the 2023–2026 acceptance list' },
      { value: '85', label: 'seniors in the Class of 2027' },
      { value: '2 / 8', label: 'Ivies on the list — Dartmouth and Penn, both with matriculants' },
      { value: '46 / 68', label: 'Power Four universities on the list' },
    ],
    buckets: [
      { tier: 'Ivy League', count: '2 / 8', note: '— Dartmouth, Penn; both bolded (matriculated)' },
      { tier: '“Ivy Plus”', count: '3 / 17', note: '— adds Duke, also bolded' },
      { tier: 'Top-75 National Universities', count: '40 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '9 / 75', note: '— Davidson through Gettysburg' },
      { tier: 'Power Four', count: '46 / 68', note: '— 14 ACC · 12 SEC · 11 Big Ten · 9 Big 12' },
      { tier: 'HBCUs', count: '3 / 107', note: '— Fayetteville State, Johnson C. Smith, NC A&T' },
    ],
    bucketsNote:
      'Derived by this research from the school’s published list against the 2026 U.S. News tables — the same rosters used for the other schools here, not figures the school reports. Earlier windows ran higher: the 2018–2023 highlights include Stanford, MIT, Princeton, Brown, Cornell and Vanderbilt, and the 2021–2024 list adds five UC campuses.',
    collegesTitle: 'Every acceptance, 2023–2026',
    colleges: [
      { name: 'American College of Building Arts', cats: [] },
      { name: 'American University', cats: [] },
      { name: 'Anderson University', cats: [], enrolling: true },
      { name: 'Appalachian State University', cats: [], enrolling: true },
      { name: 'Arizona State University', cats: ['p4'] },
      { name: 'Asbury University', cats: [], enrolling: true },
      { name: 'Asheville-Buncombe Technical CC', cats: [], enrolling: true },
      { name: 'Auburn University', cats: ['p4'], enrolling: true },
      { name: 'Augustana College', cats: [] },
      { name: 'Averett University', cats: [] },
      { name: 'Bard College', cats: [] },
      { name: 'Barry University', cats: [] },
      { name: 'Barton College', cats: [] },
      { name: 'Baylor University', cats: ['p4'], enrolling: true },
      { name: 'Belmont Abbey College', cats: [], enrolling: true },
      { name: 'Belmont University', cats: [], enrolling: true },
      { name: 'Berry College', cats: [], enrolling: true },
      { name: 'Biola University', cats: [] },
      { name: 'Boston Conservatory at Berklee', cats: [] },
      { name: 'Bowling Green State University', cats: [] },
      { name: 'Brevard College', cats: [] },
      { name: 'Bridgewater College', cats: [] },
      { name: 'Cairn University', cats: [] },
      { name: 'Campbell University', cats: [] },
      { name: 'Capital University', cats: [] },
      { name: 'Carson-Newman University', cats: [] },
      { name: 'Case Western Reserve University', cats: ['nu75'] },
      { name: 'Cedarville University', cats: [], enrolling: true },
      { name: 'Central Piedmont CC', cats: [], enrolling: true },
      { name: 'Charleston Southern University', cats: [] },
      { name: 'Christopher Newport University', cats: [] },
      { name: 'Clemson University', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'Coastal Carolina University', cats: [] },
      { name: 'College of Charleston', cats: [], enrolling: true },
      { name: 'College of William & Mary', cats: ['nu75'], enrolling: true },
      { name: 'Colorado Christian University', cats: [], enrolling: true },
      { name: 'Colorado School of Mines', cats: [], enrolling: true },
      { name: 'Columbia International University', cats: [] },
      { name: 'Concordia University', cats: [] },
      { name: 'Covenant College', cats: [], enrolling: true },
      { name: 'Creighton University', cats: [] },
      { name: 'Culver-Stockton College', cats: [] },
      { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
      { name: 'Davidson College', cats: ['lac75'], enrolling: true },
      { name: 'Daytona State College', cats: [] },
      { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'], enrolling: true },
      { name: 'East Carolina University', cats: [], enrolling: true },
      { name: 'East Tennessee State Univ.', cats: [], enrolling: true },
      { name: 'Eastern Nazarene College', cats: [], enrolling: true },
      { name: 'Edgewood University', cats: [] },
      { name: 'Elmira College', cats: [] },
      { name: 'Elon University', cats: [], enrolling: true },
      { name: 'Emory University', cats: ['nu75'], enrolling: true },
      { name: 'Fayetteville State University', cats: ['hbcu'] },
      { name: 'Flagler College', cats: [] },
      { name: 'Florida Atlantic University', cats: [] },
      { name: 'Florida Polytechnic University', cats: [] },
      { name: 'Florida Southern College', cats: [], enrolling: true },
      { name: 'Florida State University', cats: ['nu75', 'p4'] },
      { name: 'Fordham University', cats: [] },
      { name: 'Fort Lewis College', cats: [] },
      { name: 'Furman University', cats: ['lac75'], enrolling: true },
      { name: 'Gardner-Webb University', cats: [], enrolling: true },
      { name: 'George Washington University', cats: ['nu75'], enrolling: true },
      { name: 'Georgia Tech', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'Gettysburg College', cats: ['lac75'] },
      { name: 'Gordon College', cats: [], enrolling: true },
      { name: 'Grand Canyon University', cats: [] },
      { name: 'Grove City College', cats: [], enrolling: true },
      { name: 'Guilford College', cats: [] },
      { name: 'Hampden-Sydney College', cats: [], enrolling: true },
      { name: 'Hampshire College', cats: [] },
      { name: 'Heidelberg University', cats: [] },
      { name: 'High Point University', cats: [], enrolling: true },
      { name: 'Houghton University', cats: [] },
      { name: 'Indiana University', cats: ['nu75', 'p4'] },
      { name: 'Indiana Wesleyan University', cats: [] },
      { name: 'Ithaca College', cats: [], enrolling: true },
      { name: 'James Madison University', cats: [] },
      { name: 'John Brown University', cats: [] },
      { name: 'John Cabot University', cats: [] },
      { name: 'Johnson & Wales University', cats: [] },
      { name: 'Johnson C. Smith University', cats: ['hbcu'] },
      { name: 'Kennesaw State University', cats: [] },
      { name: 'Kent State University', cats: [] },
      { name: 'King University', cats: [] },
      { name: 'Lee University', cats: [], enrolling: true },
      { name: 'Lees-McRae College', cats: [] },
      { name: 'Lenoir Community College', cats: [], enrolling: true },
      { name: 'Lenoir-Rhyne University', cats: [] },
      { name: 'LeTourneau University', cats: [], enrolling: true },
      { name: 'Liberty University', cats: [], enrolling: true },
      { name: 'Lipscomb University', cats: [] },
      { name: 'Louisiana State University', cats: ['p4'] },
      { name: 'Louisiana Tech University', cats: [], enrolling: true },
      { name: 'Loyola University Chicago', cats: [], enrolling: true },
      { name: 'Lynn University', cats: [] },
      { name: 'Macalester College', cats: ['lac75'], enrolling: true },
      { name: 'Mars Hill University', cats: [] },
      { name: 'Marymount Manhattan College', cats: [] },
      { name: 'Maryville College', cats: [] },
      { name: 'Massachusetts College of Pharmacy & Health Sciences', cats: [] },
      { name: 'Mercer University', cats: [] },
      { name: 'Meredith College', cats: [] },
      { name: 'Messiah University', cats: [], enrolling: true },
      { name: 'Methodist University', cats: [], enrolling: true },
      { name: 'Miami University', cats: [] },
      { name: 'Michigan State University', cats: ['nu75', 'p4'] },
      { name: 'Milligan University', cats: [] },
      { name: 'Mississippi State University', cats: ['p4'], enrolling: true },
      { name: 'Montana State University', cats: [] },
      { name: 'Montreat College', cats: [] },
      { name: 'Moody Bible Institute', cats: [] },
      { name: 'Muskingum University', cats: [] },
      { name: 'New Jersey Inst. of Technology', cats: [] },
      { name: 'New York University', cats: ['nu75'], enrolling: true },
      { name: 'Newberry College', cats: [] },
      { name: 'NC A&T State University', cats: ['hbcu'], enrolling: true },
      { name: 'North Carolina State University', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'North Greenville University', cats: [] },
      { name: 'Nova Southeastern University', cats: [], enrolling: true },
      { name: 'Ohio University', cats: [] },
      { name: 'Oklahoma Wesleyan University', cats: [] },
      { name: 'Old Dominion University', cats: [] },
      { name: 'Oral Roberts University', cats: [] },
      { name: 'Pace University', cats: [] },
      { name: 'Palm Beach Atlantic University', cats: [], enrolling: true },
      { name: 'Paul D. Camp CC', cats: [], enrolling: true },
      { name: 'Penn State University', cats: ['nu75', 'p4'] },
      { name: 'Pepperdine University', cats: [] },
      { name: 'Pfeiffer University', cats: [] },
      { name: 'Point Park University', cats: [] },
      { name: 'Purdue University', cats: ['nu75', 'p4'] },
      { name: 'Queens University of Charlotte', cats: [], enrolling: true },
      { name: 'Radford University', cats: [] },
      { name: 'Randolph-Macon College', cats: [] },
      { name: 'Regent University', cats: [] },
      { name: 'Rensselaer Polytechnic Inst.', cats: ['nu75'] },
      { name: 'Rhodes College', cats: ['lac75'] },
      { name: 'Roanoke College', cats: [], enrolling: true },
      { name: 'Roosevelt University', cats: [] },
      { name: 'Saint Louis University, Madrid', cats: [] },
      { name: 'Salem College', cats: [] },
      { name: 'Salve Regina University', cats: [] },
      { name: 'Samford University', cats: [], enrolling: true },
      { name: 'Savannah College of Art & Design', cats: [], enrolling: true },
      { name: 'Sewanee: University of the South', cats: ['lac75'] },
      { name: 'South Piedmont CC', cats: [] },
      { name: 'Southeastern CC', cats: [] },
      { name: 'Southeastern University', cats: [], enrolling: true },
      { name: 'Southern Methodist University', cats: ['p4'], enrolling: true },
      { name: 'Springfield College', cats: [], enrolling: true },
      { name: 'Syracuse University', cats: ['nu75', 'p4'] },
      { name: 'Taylor University', cats: [], enrolling: true },
      { name: 'Temple University', cats: [] },
      { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
      { name: 'Texas Christian University', cats: ['p4'] },
      { name: 'Texas State University', cats: [] },
      { name: 'The Citadel', cats: [] },
      { name: 'The College of New Jersey', cats: [], enrolling: true },
      { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
      { name: 'Tri-County Technical College', cats: [], enrolling: true },
      { name: 'Tusculum University', cats: [], enrolling: true },
      { name: 'United States Air Force Academy', cats: ['lac75'] },
      { name: 'University of Akron', cats: [] },
      { name: 'University of Alabama', cats: ['p4'], enrolling: true },
      { name: 'University of Alberta', cats: [] },
      { name: 'University of Arizona', cats: ['nu75', 'p4'] },
      { name: 'University of Arkansas', cats: ['p4'], enrolling: true },
      { name: 'University of California (SB)', cats: ['nu75'] },
      { name: 'University of Central Florida', cats: ['p4'] },
      { name: 'University of Cincinnati', cats: ['p4'], enrolling: true },
      { name: 'University of Colorado', cats: ['nu75', 'p4'] },
      { name: 'University of Connecticut', cats: ['nu75'], enrolling: true },
      { name: 'University of Florida', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of Georgia', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of Illinois', cats: ['nu75', 'p4'] },
      { name: 'University of Iowa', cats: ['p4'] },
      { name: 'University of Kansas', cats: ['p4'] },
      { name: 'University of Kentucky', cats: ['p4'], enrolling: true },
      { name: 'University of Louisville', cats: ['p4'], enrolling: true },
      { name: 'University of Lynchburg', cats: [] },
      { name: 'University of Mary Washington', cats: [] },
      { name: 'University of Maryland', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of Massachusetts', cats: ['nu75'] },
      { name: 'University of Miami', cats: ['nu75', 'p4'] },
      { name: 'University of Michigan', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of Minnesota', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of Mississippi', cats: ['p4'], enrolling: true },
      { name: 'University of New Hampshire', cats: [], enrolling: true },
      { name: 'University of NC at Asheville', cats: [] },
      { name: 'University of NC at Chapel Hill', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of NC at Charlotte', cats: [], enrolling: true },
      { name: 'University of NC at Greensboro', cats: [], enrolling: true },
      { name: 'University of NC at Pembroke', cats: [] },
      { name: 'University of NC at Wilmington', cats: [], enrolling: true },
      { name: 'University of North Georgia', cats: [] },
      { name: 'University of Notre Dame', cats: ['nu75', 'p4'] },
      { name: 'University of Pennsylvania', cats: ['ivy', 'ivyplus', 'nu75'], enrolling: true },
      { name: 'University of Richmond', cats: ['lac75'] },
      { name: 'University of South Carolina', cats: ['p4'], enrolling: true },
      { name: 'University of South Florida', cats: [], enrolling: true },
      { name: 'University of Tampa', cats: [] },
      { name: 'University of Tennessee', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of the Cumberlands', cats: [] },
      { name: 'University of Utah', cats: ['p4'] },
      { name: 'University of Virginia', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'University of Wisconsin', cats: ['nu75', 'p4'] },
      { name: 'Utah State University', cats: [] },
      { name: 'Villanova University', cats: ['nu75'] },
      { name: 'Virginia Commonwealth Univ.', cats: [] },
      { name: 'Virginia Tech', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'Wake Forest University', cats: ['nu75', 'p4'], enrolling: true },
      { name: 'Wake Technical CC', cats: [], enrolling: true },
      { name: 'Warren Wilson College', cats: [] },
      { name: 'Western Carolina University', cats: [] },
      { name: 'Western Colorado University', cats: [] },
      { name: 'Western Kentucky University', cats: [] },
      { name: 'Wheaton College', cats: [], enrolling: true },
      { name: 'William Peace University', cats: [], enrolling: true },
      { name: 'Wingate University', cats: [], enrolling: true },
      { name: 'Winthrop University', cats: [], enrolling: true },
      { name: 'Wisconsin Lutheran College', cats: [], enrolling: true },
      { name: 'Wofford College', cats: ['lac75'], enrolling: true },
      { name: 'Xavier University', cats: [], enrolling: true },
    ],
    collegesTotal: '225 institutions · bold = at least one graduate enrolled',
    scholarships: [
      'No scholarship dollar totals — checked across all three profile editions',
      'No per-class acceptance breakdowns — the lists are multi-year windows',
      'No matriculation-rate percentages',
    ],
    scholarshipsNote:
      'The bold-marks-matriculation convention is itself unusual disclosure: because both published lists carry it and overlap on the classes of 2023–24, acceptances and enrollments can be cross-validated across editions.',
    caveat:
      'A multi-year cumulative list shows breadth, not rates: each name means at least one acceptance across four graduating classes of ~85, and bold means at least one enrollment.',
    flags: [
      {
        kind: 'verify',
        text: 'The bolded matriculation names were recovered from the PDF’s font data (plain text extraction drops bold) — spot-checked but machine-extracted. The acceptance list itself extracted cleanly.',
      },
    ],
    sources: [
      { label: 'High School Profile 2026–2027 — 2023–2026 acceptances', url: PROFILE_2627 },
      { label: 'High School Profile 2024–2025 — 2021–2024 acceptances', url: PROFILE_2425 },
      { label: 'High School Profile 2023–24 — 2018–2023 highlights', url: PROFILE_2324 },
    ],
  },

  /* -------------------------------------------------------------- 3d edge -- */
  edge: {
    headline:
      'The differentiators are depth stories: a department no other school has, a housing build on Pine Ridge, and college credit from the PCA’s own college.',
    subhead:
      'No research-program or Olympiad credentials — the edge here is distinctiveness and legibility, not national competition results.',
    levers: [
      {
        title: 'Restoration & Sustainability',
        hint: 'a department of one’s own',
        glyph: '◆',
        items: [
          'A named high-school department with its own director (Dr. Rebeca Burnett) — unique among these schools',
          'Course ladder: Augustine Literacy Project, Intercultural Practicum, Introduction to Engineering, Restore525',
          'The profile gives it a stand-alone descriptive block — a transcript line no other Charlotte-area applicant carries',
        ],
      },
      {
        title: 'Signature projects',
        hint: 'what an essay gets written about',
        glyph: '▲',
        items: [
          'Senior Capstone Project — a named milestone for every student',
          'ContainIt: high schoolers converting shipping containers into housing for 30+ teens on the Pine Ridge Reservation',
          'McKnight Oratory and Mock Trial (2025 state runner-up courtroom artist) on the speaking side',
        ],
      },
      {
        title: 'Legible rigor',
        hint: 'what an admissions reader sees',
        glyph: '●',
        items: [
          'Covenant College dual-enrollment credit atop the AP matrix',
          'Every-AP-student-tests policy makes the 96% pass rate cover the whole program',
          'The no-rank policy plus a full weighting key lets readers reconstruct rigor in context',
        ],
        note: 'The support model is relational — a 30-year director in the NACCAP circuit — rather than a productized essay-bootcamp curriculum, and the school publishes none of the latter.',
      },
    ],
    flags: [],
    sources: [
      { label: 'covenantday.org — High School academics', url: HS_ACADEMICS },
      { label: 'covenantday.org — Service (ContainIt)', url: 'https://www.covenantday.org/campus-life/service' },
      { label: 'High School Profile 2026–2027', url: PROFILE_2627 },
    ],
  },

  /* -------------------------------------------------------- 3e wholeClass -- */
  wholeClass: {
    headline:
      'Strong aggregates, no distributions: per-class SAT/ACT averages and a five-year AP line, but no quantiles of any kind — by policy.',
    subhead:
      '"We do not rank" extends to the data: a school that declines to rank does not publish distribution tables either.',
    scoreTables: [
      {
        title: 'SAT & ACT class averages',
        hint: '— as published, per profile edition',
        // Averages, not percentiles — the school publishes no distribution,
        // so the percentile header is suppressed (see ScoreTable.noPercentiles).
        noPercentiles: true,
        rows: [
          { label: 'Class of 2026', values: ['SAT 1263', 'ACT 26'] },
          { label: 'Class of 2024', values: ['SAT 1243', 'ACT 27'] },
          { label: 'Class of 2023', values: ['SAT 1268', 'ACT 26'] },
          { label: '5-year averages', values: ['SAT 1261', 'ACT 26'] },
        ],
        note: 'Averages only — no percentiles, no middle-50%, no tester counts.',
      },
      {
        title: 'AP Scholar tiers, Class of 2026',
        // Tier counts, not percentiles — same suppression rule.
        noPercentiles: true,
        rows: [
          { label: 'Scholars with Distinction', values: ['38'] },
          { label: 'Scholars with Honor', values: ['27'] },
          { label: 'AP Scholars', values: ['33'] },
        ],
        note: '98 scholar designations against 179 AP students — the closest thing to a shape-of-the-class disclosure the school makes.',
      },
    ],
    quintiles: [],
    gpaNote:
      'No GPA distribution exists in any of the three profile editions — no highest/median/lowest, no quintiles. The weighting key (4.33 / +0.5 / +1.0) is the entire GPA disclosure.',
    support: [
      {
        label: 'Learning specialists',
        text: 'Five Learning Specialists and an Academic Resources Director on the high school staff table — a real support bench for a 350-student high school.',
      },
      {
        label: 'Clinical counseling',
        text: 'A Licensed Marriage and Family Therapist (Emily Lee) on staff, distinct from the college office.',
      },
      {
        label: 'Priced help',
        text: 'The tuition terms disclose that tutoring and special testing beyond classroom help are available at extra cost — a stated, priced channel rather than an unspoken one.',
      },
    ],
    supportNote:
      'AP gating (none for freshmen, one for sophomores) is itself a whole-class guardrail: rigor is sequenced by readiness rather than open-enrollment.',
    middle: [
      {
        label: 'The list shows the range',
        text: 'The bolded matriculations run from Dartmouth and Duke through Covenant College, Cedarville, Montreat, community colleges and trade-adjacent programs — a school placing only its top quartile would not produce that spread.',
      },
      {
        label: 'The NC-public backbone',
        text: 'The deepest enrolled concentrations are Chapel Hill, NC State, UNC Charlotte, App State and East Carolina — the destinations that serve the broad middle of a North Carolina class.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No distributions are published anywhere: no GPA quantiles, no score percentiles, no per-class matriculation rates. This card ships with the aggregates above because they are genuinely informative — but the shape of the class is not recoverable from public sources, and that follows from the school’s own no-rank policy.',
      },
    ],
    sources: [
      { label: 'High School Profile 2026–2027', url: PROFILE_2627 },
      { label: 'High School Profile 2024–2025', url: PROFILE_2425 },
      { label: 'High School Profile 2023–24', url: PROFILE_2324 },
    ],
  },

  /* ----------------------------------------------------------- 3f verdict -- */
  verdict: {
    headline:
      'A rigorous, legible academic product with an unusually heavy counselor caseload — and disclosure that is excellent about outcomes, silent about process.',
    subhead:
      'The profile tells colleges nearly everything; the website tells parents much less about how the counseling actually works.',
    points: [
      {
        label: 'The AP story is genuinely strong',
        text: '96% of exams at 3+, 78% at 4–5, with a required-exam policy that makes the number honest, and a five-year rising line to back it.',
      },
      {
        label: 'The heaviest caseload in this comparison',
        text: 'One dedicated college counselor for 85 seniors — cushioned by a 23-year director with NACCAP standing, but a ratio a parent should ask about directly.',
      },
      {
        label: 'Matriculation is actually visible',
        text: 'Bold marks on two overlapping multi-year lists let you verify where students enrolled, not just where they were accepted — disclosure peers rarely offer.',
      },
      {
        label: 'The ceiling is real but episodic',
        text: 'Dartmouth, Penn and Duke enrollments in the current window; Stanford/MIT/Princeton belong to earlier windows. The dependable strength is NC publics and the Christian-college network.',
      },
      {
        label: 'Process disclosure is thin',
        text: 'No counseling timeline, no platform named, no essay or application programming published — the model rides on the director’s relationships.',
      },
    ],
    checklist: [
      'How does one director manage 85 seniors at peak season — what does the junior spring / senior fall calendar actually look like?',
      'Which platform do families use — Naviance, Scoir, something else — and when do students get access?',
      'Which AP courses will actually run next year? The matrix moved from 18 to 15 between editions.',
      'What did last year’s class look like beyond the averages — how many tested, and where did the middle of the class land?',
      'How does the NC Opportunity Scholarship prerequisite interact with the aid timeline for a family also applying elsewhere?',
    ],
    flags: [],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
