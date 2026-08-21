// Charlotte Catholic High School — the six College Support cards.
//
// CCHS publishes a dense two-page School Profile (2025-2026) that carries almost
// everything these cards want: a full 10-decile GPA chart, exam-level AP
// performance, mid-50% test ranges with taker counts, a 169-institution
// matriculation list, a scholarship total, National Merit counts, and the whole
// counseling roster with the senior-class size to divide it into. All six cards
// therefore render with real data behind each sub-block.
//
// Every figure is transcribed from the school's OWN published materials — chiefly
// the School Profile 2025-2026 PDF and the 2026-2027 Curriculum Guide. See
// source-material/college-support/charlotte-catholic/ for the hard data, source
// URLs and gap notes.
//
// Four things worth knowing before editing:
//
//  1. THIS IS A MATRICULATION LIST, NOT AN ACCEPTANCE LIST. The profile's own
//     heading reads "COLLEGE MATRICULATION CLASSES OF 2023-2025". A matriculation
//     list is structurally smaller than an acceptance list — a student is
//     accepted at many schools and matriculates at exactly one — so the bucket
//     counts here are NOT like-for-like against the acceptance-based schools on
//     this roster. The caveat is stated on the card, not just in this comment.
//  2. The school publishes mid-50% RANGES, not percentiles and not averages. The
//     range endpoints ARE the 25th and 75th, so those columns are real; the 10th,
//     50th, 90th and mean render as '—' rather than being invented. Because the
//     table holds no mean, it does NOT set noPercentiles — its 25th/75th columns
//     are genuine percentiles.
//  3. CCHS DOES NOT RANK STUDENTS, and publishes a 10-decile GPA chart instead of
//     quintiles. The quintile block is populated from the decile chart by pairing
//     adjacent deciles, which is stated in the gpaNote — the underlying deciles
//     are also listed so nothing is hidden behind the pairing.
//  4. AP exams are MANDATORY in every AP course here, so "94% scored 3+" is a
//     whole-cohort figure rather than a self-selected one. That materially
//     strengthens the number and is said on the card.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

const PROFILE =
  'https://resources.finalsite.net/images/v1756128027/charlottecatholicorg/f5yfsecttu3cgmmtsh3f/CCHSSchoolProfile25-26FinalforOnline.pdf'
const PROFILE_PAGE = 'https://www.charlottecatholic.org/about-us/school-profile'
const COUNSELORS =
  'https://www.charlottecatholic.org/departments/counseling/meet-our-counselors'
const GUIDE =
  'https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf'
const COMMONAPP =
  'https://www.charlottecatholic.org/departments/counseling/college-planning-grades-9-12/common-app-essay-prompts'
const NCSU = 'https://admissions.ncsu.edu/venue/charlotte-catholic-high-school/'

/* The 169 institutions CCHS graduates matriculated to across the Classes of
   2023–2025, exactly as printed on the School Profile. Buckets are scored
   against the 2026 U.S. News tables in the master COLLEGE_RANKINGS and the
   shared Power Four / HBCU rosters in source-material/college-support/_shared/.
   Rank labels are NOT stored here: they resolve from the master at render time.
   Campus parentheticals ('(Tempe)', '(Main Campus)') are reproduced verbatim
   from the source PDF — names are copied char-for-char, never normalised.

   Note the two Arizona State campuses are ONE institution for counting: the
   Power Four bucket row says 39, while 40 rows below carry the 'p4' tag. */
const colleges = [
  { name: 'American University', cats: [] },
  { name: 'Appalachian State University', cats: [] },
  { name: 'Arizona State University (Downtown Phoenix)', cats: ['p4'] },
  { name: 'Arizona State University (Tempe)', cats: ['p4'] },
  { name: 'Auburn University', cats: ['p4'] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Beacon College', cats: [] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [] },
  { name: 'Benedict College', cats: ['hbcu'] },
  { name: 'Benedictine College', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Bucknell University', cats: ['lac75'] },
  { name: 'California Polytechnic State University (San Luis Obispo)', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Carnegie Mellon University', cats: ['nu75'] },
  { name: 'Catawba College', cats: [] },
  { name: 'Catholic University of America', cats: [] },
  { name: 'Central Piedmont Community College', cats: [] },
  { name: 'Citadel Military College of South Carolina', cats: [] },
  { name: 'Clemson University', cats: ['nu75', 'p4'] },
  { name: 'Cleveland Community College', cats: [] },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Colgate University', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [] },
  { name: 'College of the Holy Cross', cats: ['lac75'] },
  { name: 'Columbia College (Chicago)', cats: [] },
  { name: 'Connecticut College', cats: ['lac75'] },
  { name: 'Cornell University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Davidson College', cats: ['lac75'] },
  { name: 'Denison University', cats: ['lac75'] },
  { name: 'DePaul University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Duquesne University', cats: [] },
  { name: 'East Carolina University', cats: [] },
  { name: 'Eckerd College', cats: [] },
  { name: 'Elon University', cats: [] },
  { name: 'Embry-Riddle Aeronautical University (Daytona Beach)', cats: [] },
  { name: 'Fairfield University', cats: [] },
  { name: 'Flagler College', cats: [] },
  { name: 'Florida International University', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'] },
  { name: 'Fordham University', cats: [] },
  { name: 'Furman University', cats: ['lac75'] },
  { name: 'George Mason University', cats: [] },
  { name: 'George Washington University', cats: ['nu75'] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'] },
  { name: 'Georgia Institute of Technology', cats: ['nu75', 'p4'] },
  { name: 'Georgia Southern University', cats: [] },
  { name: 'Georgian Court University', cats: [] },
  { name: 'Gettysburg College', cats: ['lac75'] },
  { name: 'Hamilton College', cats: ['lac75'] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'Hampton University', cats: ['hbcu'] },
  { name: 'Harvard University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Hawai\'i Pacific University', cats: [] },
  { name: 'High Point University', cats: [] },
  { name: 'Husson University', cats: [] },
  { name: 'Immaculata University', cats: [] },
  { name: 'Indiana University (Bloomington)', cats: ['nu75', 'p4'] },
  { name: 'Jacksonville University', cats: [] },
  { name: 'James Madison University', cats: [] },
  { name: 'Johnson & Wales University (Charlotte)', cats: [] },
  { name: 'Kansas State University', cats: ['p4'] },
  { name: 'Kutztown University of Pennsylvania', cats: [] },
  { name: 'Lafayette College', cats: ['lac75'] },
  { name: 'Liberty University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola University Chicago', cats: [] },
  { name: 'Loyola University Maryland', cats: [] },
  { name: 'Loyola University New Orleans', cats: [] },
  { name: 'Marist University', cats: [] },
  { name: 'Marquette University', cats: [] },
  { name: 'Mercer University', cats: [] },
  { name: 'Meredith College', cats: [] },
  { name: 'Miami University (Oxford)', cats: [] },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Middlebury College', cats: ['lac75'] },
  { name: 'Midland University', cats: [] },
  { name: 'Mississippi State University', cats: ['p4'] },
  { name: 'Montreat College', cats: [] },
  { name: 'New York University', cats: ['nu75'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'] },
  { name: 'Northwestern University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Oglethorpe University', cats: [] },
  { name: 'Ohio University (Main Campus)', cats: [] },
  { name: 'Pace University (New York City)', cats: [] },
  { name: 'Palm Beach State College', cats: [] },
  { name: 'Pellissippi State Community College', cats: [] },
  { name: 'Penn State University (University Park)', cats: ['nu75', 'p4'] },
  { name: 'PennWest Clarion', cats: [] },
  { name: 'Piedmont University', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Princeton University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Providence College', cats: [] },
  { name: 'Purdue University (Main Campus)', cats: ['nu75', 'p4'] },
  { name: 'Queens University of Charlotte', cats: [] },
  { name: 'Randolph-Macon College', cats: [] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Rose-Hulman Institute of Technology', cats: [] },
  { name: 'Saint Francis University', cats: [] },
  { name: 'Saint Mary\'s College', cats: [] },
  { name: 'Salisbury University', cats: [] },
  { name: 'San Diego State University', cats: [] },
  { name: 'Santa Barbara City College', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'Sewanee: The University of the South', cats: ['lac75'] },
  { name: 'Southern Wesleyan University', cats: [] },
  { name: 'St. Bonaventure University', cats: [] },
  { name: 'Texas Christian University', cats: ['p4'] },
  { name: 'The American University of Rome', cats: [] },
  { name: 'The New England Conservatory of Music', cats: [] },
  { name: 'The Ohio State University', cats: ['nu75', 'p4'] },
  { name: 'The University of Alabama', cats: ['p4'] },
  { name: 'The University of Tennessee (Knoxville)', cats: ['p4'] },
  { name: 'Towson University', cats: [] },
  { name: 'Tri-County Technical College', cats: [] },
  { name: 'Trident Technical College', cats: [] },
  { name: 'Tufts University', cats: ['nu75'] },
  { name: 'Tulane University of Louisiana', cats: ['nu75'] },
  { name: 'United States Air Force Academy', cats: ['lac75'] },
  { name: 'United States Military Academy at West Point', cats: ['lac75'] },
  { name: 'United States Naval Academy', cats: ['lac75'] },
  { name: 'University of Arizona', cats: ['p4'] },
  { name: 'University of Arkansas', cats: ['p4'] },
  { name: 'University of Colorado Boulder', cats: ['p4'] },
  { name: 'University of Dayton', cats: [] },
  { name: 'University of Delaware', cats: [] },
  { name: 'University of Detroit Mercy', cats: [] },
  { name: 'University of Dubuque', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'] },
  { name: 'University of Georgia', cats: ['nu75', 'p4'] },
  { name: 'University of Gloucestershire', cats: [] },
  { name: 'University of Kentucky', cats: ['p4'] },
  { name: 'University of Louisville', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Miami', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'] },
  { name: 'University of North Carolina at Asheville', cats: [] },
  { name: 'University of North Carolina at Chapel Hill', cats: ['nu75', 'p4'] },
  { name: 'University of North Carolina at Charlotte', cats: [] },
  { name: 'University of North Carolina at Greensboro', cats: [] },
  { name: 'University of North Carolina Wilmington', cats: [] },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'] },
  { name: 'University of Oklahoma', cats: ['p4'] },
  { name: 'University of Pennsylvania', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'University of Rhode Island', cats: [] },
  { name: 'University of Rochester', cats: ['nu75'] },
  { name: 'University of South Carolina', cats: ['p4'] },
  { name: 'University of South Carolina (Lancaster)', cats: [] },
  { name: 'University of South Florida (Main Campus)', cats: [] },
  { name: 'University of Virginia (Main Campus)', cats: ['nu75', 'p4'] },
  { name: 'University of Wisconsin (Madison)', cats: ['nu75', 'p4'] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'] },
  { name: 'Villanova University', cats: ['nu75'] },
  { name: 'Virginia Polytechnic Institute and State University', cats: ['nu75', 'p4'] },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'] },
  { name: 'Wake Technical Community College', cats: [] },
  { name: 'Washington and Lee University', cats: ['lac75'] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'William & Mary', cats: ['nu75'] },
  { name: 'Wingate University', cats: [] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', cats: ['lac75'] },
  { name: 'Worcester Polytechnic Institute', cats: [] },
  { name: 'Xavier University', cats: [] },
  { name: 'Yale University', cats: ['ivy', 'ivyplus', 'nu75'] },]

export const charlotteCatholic: CollegeSupportProgram = {
  /* The area's FIRST card. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/charlotte-catholic/
     Charlotte Catholic High School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Charlotte Catholic High School’s applicants were admitted at a pooled 56.0% over the last five entering classes — 1,175 acceptances from 2,100 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 23.3% in Fall 2025 — 24 of 103 — against far higher rates at the less-selective universities. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '2,100', label: 'applications to the six universities, Fall 2021–2025' },
      { value: '56.0%', label: 'pooled admit rate — 1,175 of 2,100 across those five classes' },
      { value: '23.3%', label: 'at UNC-Chapel Hill — 24 of 103, the toughest of the six for this school' },
      { value: 'NC State University', label: 'drew the most applications in Fall 2025 (141)' },
    ],
    latestTerm: '2025',
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · Chapel Hill · the most selective of the six',
        applied: '103',
        accepted: '24',
        rate: '23.3%',
        ratePct: 0.233,
        fiveYearRate: '30.5%',
        fiveYearApplied: '459',
        fiveYearAccepted: '140',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '141',
        accepted: '39',
        rate: '27.7%',
        ratePct: 0.277,
        fiveYearRate: '33.2%',
        fiveYearApplied: '632',
        fiveYearAccepted: '210',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '65',
        accepted: '57',
        rate: '87.7%',
        ratePct: 0.877,
        fiveYearRate: '89.1%',
        fiveYearApplied: '329',
        fiveYearAccepted: '293',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · eastern NC · largest admit rates of the six',
        applied: '48',
        accepted: '47',
        rate: '97.9%',
        ratePct: 0.979,
        fiveYearRate: '96.1%',
        fiveYearApplied: '230',
        fiveYearAccepted: '221',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '91',
        accepted: '62',
        rate: '68.1%',
        ratePct: 0.681,
        fiveYearRate: '65.3%',
        fiveYearApplied: '383',
        fiveYearAccepted: '250',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad',
        applied: '17',
        accepted: '16',
        rate: '94.1%',
        ratePct: 0.941,
        fiveYearRate: '91.0%',
        fiveYearApplied: '67',
        fiveYearAccepted: '61',
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
      'A weighted-only transcript, no class rank, and an AP program where the exam is not optional.',
    subhead:
      'CCHS adds one quality point for AP and Honors and shows only the weighted GPA — so the number a college reads is already the school-adjusted one.',
    stats: [
      { value: '1,064', label: 'AP exams taken, 2024-25 (345 students, grades 11–12)' },
      { value: '23', label: 'AP subjects examined' },
      { value: '94%', label: 'of AP scores were 3 or above' },
      { value: '72%', label: 'of AP scores were 4 or 5' },
    ],
    meritTitle: 'National Merit and service-academy recognition',
    merit: [
      { year: '2025', detail: '2 National Merit Finalists · 11 Commended Students' },
      { year: '2025', detail: '3 US Naval Academy appointments' },
      { year: '2025', detail: 'Army ROTC scholarship at Cornell University' },
    ],
    meritNote:
      'The profile publishes Finalists and Commended counts but no Semifinalist line, and no multi-year series — so this ledger is a single class, not a trend.',
    depthTitle: 'Where the course path runs past the standard sequence',
    depth: [
      { label: 'Mathematics', text: 'Honors Calculus, AP Calculus AB, AP Calculus BC and AP Statistics sit above Honors Pre-Calculus — four post-Pre-Calc options.' },
      { label: 'Science', text: 'AP Biology, AP Chemistry, AP Environmental Science, AP Physics 1 and AP Physics C: Mechanics, plus Honors Anatomy and Physiology, Honors Nutritional Science, Biotechnology, Forensic Science and Sports Medicine.' },
      { label: 'Computer science and engineering', text: 'AP Computer Science A and AP Cybersecurity Kickstart, above a four-course engineering strand ending in Honors Engineering Capstone.' },
      { label: 'Social studies', text: 'AP US History, AP European History, AP Psychology, AP US Government and AP Microeconomics — five AP options in one department.' },
      { label: 'World languages', text: 'French, German, Latin and Spanish each run to an AP course; Spanish continues to AP Spanish VI, a sixth-level course.' },
      { label: 'Classical pathway', text: 'The St. Augustine Scholars Program, new with a 9th-grade cohort in 2025-26, adds a four-year classical track — philosophy, logic, Latin, primary texts and Socratic seminars.' },
    ],
    trustTitle: 'How the grade is engineered to be read',
    trust: [
      { label: 'Weighted only', text: 'One additional quality point for AP and Honors classes. Only the weighted GPA appears on the transcript — there is no unweighted figure to compare against.' },
      { label: 'No class rank', text: 'The profile states plainly that "Charlotte Catholic does not rank students." A 10-decile GPA chart is published instead, so a college can place a student without a rank.' },
      { label: 'Load norms stated', text: '"Most demanding" is defined by the school as 2 AP courses in junior year plus 4 in senior year — the reader is told the ceiling rather than left to guess it.' },
      { label: 'AP entry is competitive', text: 'Students apply for each AP course; placement weighs prior coursework and grades, PSAT results and teacher feedback. AP is not open enrollment here.' },
      { label: 'Honors is rationed early', text: 'A maximum of 1 honors class in 9th grade and 5 in 10th, with at most 3 advanced classes in 9th — so an underclass transcript is capped by policy, not by ambition.' },
      { label: 'Transfer credit excluded', text: 'Transcripts reflect only classes completed at Charlotte Catholic; transfer transcripts are not added to the CCHS record.' },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No AP Scholar tier counts are published. The profile gives exam-level performance (94% scoring 3+ across 1,064 exams) instead, which is the richer disclosure — but it means the Scholar/Scholar with Distinction ledger other schools show cannot be built here.',
      },
      {
        kind: 'verify',
        text: 'The AP figures are 2024-25 while the testing and decile figures are Class of 2026. Both are as published; they are one year apart and are not combined into a single claim.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'charlottecatholic.org — Curriculum Guide 2026-2027 (PDF)', url: GUIDE },
    ],
  },

  counseling: {
    headline:
      'Six counselors and a director for 324 seniors — about 54 seniors each.',
    subhead:
      'The caseload is computed from the profile’s own two figures, not published as a ratio by the school.',
    stats: [
      { value: '~54', label: 'seniors per counselor (324 seniors ÷ 6 counselors)' },
      { value: '324', label: 'seniors in the Class of 2026' },
      { value: '~195', label: 'students per counselor across grades 9–12' },
      { value: '340 665', label: 'CEEB code' },
    ],
    roster: [
      { role: 'Director of Counseling Services', name: 'Sarah Sovchen', detail: 'sesovchen@charlottecatholic.org' },
      { role: 'Counselor', name: 'Christine Parks', detail: 'clparks@charlottecatholic.org' },
      { role: 'Counselor', name: 'Melody Clementi', detail: 'meclementi@charlottecatholic.org' },
      { role: 'Counselor', name: 'Sandy Needham', detail: 'smneedham@charlottecatholic.org' },
      { role: 'Counselor', name: 'Kara Fisher', detail: 'krfisher@charlottecatholic.org' },
      { role: 'Counselor', name: 'Heather Nobary', detail: 'hrnobary@charlottecatholic.org' },
      { role: 'Registrar', name: 'Jennifer Cramer', detail: 'jmcramer@charlottecatholic.org' },
    ],
    timelineTitle: 'The four-year timeline the counseling office publishes',
    timeline: [
      {
        grade: '9',
        intensity: 'Foundation',
        items: [
          'Placement is set by prior coursework, standardized testing and teacher feedback rather than by student request.',
          'Honors access is capped at one course; advanced courses at three.',
          'Philosophy (0.5 credit) is taken in freshman year starting with the Class of 2028.',
          'Service begins immediately — 10 hours due, at least 5 of them parish service, by March 1.',
        ],
        note: 'Focus: establish the weighted GPA that the decile chart will later place.',
      },
      {
        grade: '10',
        intensity: 'Widening',
        items: [
          'Honors access widens sharply — up to five honors courses.',
          'PSAT results begin to feed AP placement decisions.',
          'Service rises to 20 hours a year, the level it holds through graduation.',
          'Journalism and Yearbook open as electives, the school’s two publication courses.',
        ],
      },
      {
        grade: '11',
        intensity: 'Intensive',
        items: [
          'AP courses become available for the first time; students apply per course.',
          'Two AP courses in junior year is the school-stated "most demanding" benchmark.',
          'AP exams are mandatory in each AP course taken.',
          'College admissions representatives visit campus — NC State lists CCHS as a named recruiting venue.',
        ],
      },
      {
        grade: '12',
        intensity: 'Application',
        items: [
          'Four AP courses in senior year completes the "most demanding" load.',
          'The counseling office publishes the Common Application essay prompts and supports drafting against them.',
          'Transcripts carry the weighted GPA and no rank; the decile chart travels with the profile.',
          'Final service hours are due March 1, completing the 70-hour graduation requirement.',
        ],
      },
    ],
    mechanicsTitle: 'What the office owns',
    mechanics: [
      'Course placement and level changes, bounded by the master schedule',
      'AP course applications and the competitive placement decision',
      'The school profile that travels with every transcript',
      'Common Application essay-prompt guidance for seniors',
      'Hosting admissions representatives on campus',
      'Transcript production and the registrar function',
    ],
    mechanicsNote:
      'Junior and senior college-process detail is published as embedded Prezi presentations rather than as HTML, so the office almost certainly runs more structure than this list captures. Only what is verifiable in fetchable published material is listed.',
    reachTitle: 'Reach and tools',
    reach: [
      'NC State University lists Charlotte Catholic as a named admissions-visit venue.',
      'Class of 2025 graduates matriculated to 169 different colleges and universities over three years.',
      '38% of the Class of 2025 stayed in North Carolina; 81% enrolled at public universities.',
      'Three US Naval Academy appointments in 2025, plus an Army ROTC scholarship at Cornell.',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The ~54:1 senior caseload is COMPUTED from the profile’s 324 seniors and its six named counselors. The school does not publish a ratio, and the director is counted as a counselor here.',
      },
      {
        kind: 'discrepancy',
        text: 'The live counselors page shows the 2026-27 roster, which drops Sandy Needham and adds Kate McHugh. This card uses the 2025-2026 profile roster throughout, so that the six counselors and the 324 seniors come from the same year.',
      },
      {
        kind: 'gap',
        text: 'The junior and senior college-planning pages embed Prezi presentations, whose content is not reachable as text. The four-year timeline above is therefore built from published policy, not from the office’s own process deck.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'charlottecatholic.org — Meet our counselors', url: COUNSELORS },
      { label: 'charlottecatholic.org — Common App essay prompts', url: COMMONAPP },
      { label: 'admissions.ncsu.edu — Charlotte Catholic High School visit venue', url: NCSU },
    ],
  },

  outcomes: {
    headline:
      'Where 169 colleges took CCHS graduates over three years — and $17,242,184 in scholarships for one class.',
    subhead:
      'This is a matriculation list: where graduates actually enrolled, not everywhere they were admitted.',
    stats: [
      { value: '169', label: 'institutions matriculated to, Classes of 2023–2025' },
      { value: '95%', label: 'of the Class of 2025 went straight to post-secondary study' },
      { value: '$17,242,184', label: 'scholarships earned by the Class of 2025' },
      { value: '38%', label: 'of the Class of 2025 stayed in North Carolina' },
    ],
    bucketsTitle: 'Selectivity buckets across the three classes',
    buckets: [
      { tier: 'Ivy League', count: '6 / 8', note: 'absent Brown and Columbia' },
      { tier: 'Ivy Plus', count: '9 / 17', note: 'the six Ivies plus Duke, Georgetown and Northwestern' },
      { tier: 'Top-75 National Universities', count: '36 / 75' },
      { tier: 'Top-75 Liberal Arts Colleges', count: '17 / 75', note: 'includes all three service academies — Naval #3, Air Force #5, West Point #10' },
      { tier: 'Power Four', count: '39 / 68', note: '40 rows carry the tag; the two Arizona State campuses are one institution' },
      { tier: 'HBCUs', count: '2 / 107', note: 'Hampton University and Benedict College' },
    ],
    bucketsNote:
      'Every bucket here counts MATRICULATIONS, not acceptances. A student is admitted to many colleges and enrolls at one, so these counts are structurally lower than an acceptance-based list and must not be read as a harder or weaker admissions result than a school that publishes acceptances.',
    collegesTitle: 'Every matriculation, 2023–2025',
    collegesTotal: '169 institutions · the profile publishes no enrollment counts per institution',
    colleges,
    scholarshipsTitle: 'Scholarships and recognition',
    scholarships: [
      '$17,242,184 — Class of 2025 total',
      '2 National Merit Finalists (2025)',
      '11 National Merit Commended Students (2025)',
      '3 US Naval Academy appointments',
      'Army ROTC scholarship at Cornell University',
    ],
    scholarshipsNote:
      'The scholarship total is the class-wide figure the school publishes; it is not broken out by institution, by merit-versus-need, or per student.',
    caveat:
      'The profile’s own heading is "COLLEGE MATRICULATION CLASSES OF 2023-2025" — this is where graduates enrolled. Several schools on this roster publish acceptance lists instead, which are much longer by construction. Comparing the two directly understates CCHS.',
    flags: [
      {
        kind: 'gap',
        text: 'No per-institution enrollment counts are published, so no college on this list can be marked as enrolling more than one graduate.',
      },
      {
        kind: 'verify',
        text: 'Bucket membership is scored against the app’s master U.S. News 2026 table rather than by the school, which publishes the institution names only.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'charlottecatholic.org — School profile page', url: PROFILE_PAGE },
    ],
  },

  edge: {
    headline: 'What actually moves a CCHS application.',
    subhead:
      'One lever the student builds, one the school supplies by being a 74-championship NCHSAA program inside a diocesan system.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        hint: 'what a student controls',
        glyph: '◆',
        items: [
          'Take the AP load the school names as most demanding — 2 in junior year, 4 in senior year — and clear the competitive application for each course.',
          'Sit the AP exam in every AP course; it is mandatory here, so the 94% scoring 3+ is a cohort result a student is measured inside, not opted out of.',
          'Go past 70 service hours. The requirement is universal, so the hours themselves do not differentiate — the parish and leadership roles behind them do.',
          'Use the 76-club directory to build depth rather than breadth: seven honor societies carry published GPA thresholds, from NHS at 3.9 to Mu Alpha Theta at 4.5 in mathematics.',
          'For a classical or theology-facing application, the St. Augustine Scholars Program is a four-year differentiator that few applicants anywhere will carry.',
        ],
      },
      {
        title: 'Lever 2 — The school’s leverage',
        hint: 'what CCHS supplies',
        glyph: '▲',
        items: [
          'Athletic recruiting reach is real and unusual: 74 state championships since 2000, 8 Wells Fargo Cups, and 1000+ alumni who went on to play at NCAA, NAIA or junior-college level.',
          'CCHS is one of only four parochial schools competing in the NCHSAA — the public-school association — so its athletes are evaluated against the state’s largest programs rather than a private-school bracket.',
          'The school profile does the interpretive work for an admissions reader: decile chart, stated load norms, explicit no-rank policy and a defined "most demanding" benchmark.',
          'Diocesan scale shows up in outcomes — three Naval Academy appointments in one class, and service-academy matriculations at all three academies.',
          'A 650-seat Fine Arts Center dedicated in 2022, a Charlotte Symphony partnership, and a band that performs quadrennially in Dublin give arts applicants a portfolio venue.',
        ],
        note: 'No published Naviance/SCOIR-style scattergram exists, so a family cannot see admit rates by GPA band for this school.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'CCHS publishes no admissions-outcome tool (no scattergrams, no admit rates by band), so "what it takes" cannot be answered quantitatively from the school’s own materials.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'charlottecatholic.org — Curriculum Guide 2026-2027 (PDF)', url: GUIDE },
    ],
  },

  wholeClass: {
    headline: 'The whole class, not just the top of it.',
    subhead:
      'CCHS publishes mid-50% test ranges and a 10-decile GPA chart — enough to place a student honestly, and it refuses to rank them.',
    scoreTables: [
      {
        title: 'SAT and ACT, mid-50% ranges',
        hint: 'Class of 2026 · 226 SAT takers · 144 ACT takers',
        rows: [
          { label: 'SAT total', values: ['—', '1080', '—', '1360', '—', '—'] },
          { label: 'ACT composite', values: ['—', '19', '—', '28', '—', '—'] },
        ],
        note: 'The school publishes a mid-50% RANGE, not percentiles and not an average. The endpoints of a mid-50% range are by definition the 25th and 75th percentiles, so those two columns are real; the 10th, 50th, 90th and mean are not published and are shown as em-dashes rather than modelled. No section-level (EBRW / Math) split is published.',
      },
    ],
    gpaTitle: 'Weighted GPA distribution',
    gpaHint: '— Class of 2026 · from the school’s 10-decile chart · weighted, and CCHS does not rank',
    quintiles: [
      { label: 'Top fifth', gpa: '4.26–4.63', detail: '1st and 2nd deciles' },
      { label: 'Q2', gpa: '3.96–4.25', detail: '3rd and 4th deciles' },
      { label: 'Q3', gpa: '3.71–3.95', detail: '5th and 6th deciles' },
      { label: 'Q4', gpa: '3.37–3.70', detail: '7th and 8th deciles' },
      { label: 'Bottom fifth', gpa: '2.25–3.36', detail: '9th and 10th deciles' },
    ],
    gpaNote:
      'CCHS publishes DECILES, not quintiles; each row above pairs two adjacent published deciles, and the underlying bands are given in the detail line so nothing is hidden by the pairing. The published deciles are 1st 4.38–4.63, 2nd 4.26–4.37, 3rd 4.10–4.25, 4th 3.96–4.09, 5th 3.83–3.95, 6th 3.71–3.82, 7th 3.56–3.70, 8th 3.37–3.54, 9th 3.16–3.36, 10th 2.25–3.14. Every figure is weighted, with one quality point added for AP and Honors.',
    supportTitle: 'Academic support',
    support: [
      { label: 'Guided Academic Support', text: 'A scheduled course (511) rather than a pull-out service — support sits inside the timetable.' },
      { label: 'Options Program', text: 'A full parallel track — Options English 9–12, Options Year 1–4, Options PE, Math Life 1–2, Options Personal Finance and Options Financial Management: 14 courses in all.' },
      { label: 'Pathway Program', text: 'A distinct pathway course (507) alongside the Options track.' },
      { label: 'Study Hall', text: 'Timetabled (100), so a supported schedule need not sacrifice an elective slot.' },
    ],
    supportNote:
      'CCHS publishes no learning-difference policy document, no accommodation counts and no diagnostic-support staffing. The Options and Pathways courses are visible in the curriculum guide; the services behind them are not described publicly.',
    middle: [
      { label: 'The middle band is published', text: 'The 5th and 6th deciles run 3.83–3.95 and 3.71–3.82 — a family can locate a median student, which a school publishing only averages would hide.' },
      { label: 'The bottom decile is not hidden', text: 'The 10th decile is published as 2.25–3.14 rather than truncated, which is unusually candid for a school profile.' },
      { label: '95% continue immediately', text: 'Of the Class of 2025, 95% went straight to post-secondary education and 2% to two-year institutions.' },
      { label: 'Public-university weighted', text: '81% of the Class of 2025 enrolled at public universities and 19% at private ones — an outcome pattern closer to a strong public high school than to an independent day school.' },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No mean or median SAT/ACT is published, so this school cannot be placed on an averages-based comparison with schools that publish one. The mid-50% range is what exists.',
      },
      {
        kind: 'gap',
        text: 'No learning-difference or accommodations disclosure exists beyond the course names in the curriculum guide.',
      },
    ],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'charlottecatholic.org — Curriculum Guide 2026-2027 (PDF)', url: GUIDE },
    ],
  },

  verdict: {
    headline: 'A large, transparent, athletically dominant Catholic high school that publishes more than most.',
    subhead:
      'The profile answers the questions a family actually asks — and the tuition structure answers one no other school on this roster raises.',
    points: [
      { label: 'The disclosure is genuinely strong', text: 'A **10-decile GPA chart including the bottom decile**, stated load norms, an explicit no-rank policy and exam-level AP performance. Most schools publish less and frame it more favourably.' },
      { label: 'The AP rate cannot be flattered', text: '**94% of scores at 3+** across **1,064 exams** is a whole-cohort number, because **the exam is mandatory in every AP course** — weaker candidates cannot be quietly kept out of the denominator.' },
      { label: 'Read the college list as matriculations', text: '**169 institutions** is where graduates actually *enrolled*, a smaller measure than an acceptance list by construction. CCHS looks stronger, not weaker, once that is understood.' },
      { label: 'Athletics is the standout', text: '**74 state championships** since 2000 and **8 Wells Fargo Cups**, won inside the **NCHSAA** against public schools rather than in a private-school bracket.' },
      { label: 'Tuition turns on parish participation', text: '**$15,041** for a participating Catholic family against **$21,562** at the community rate — a ~30% difference driven by parish involvement rather than financial need, and the single biggest cost variable here.' },
      { label: 'The gaps are structural, not sloppy', text: 'No per-school aid figures (MACS publishes diocese-wide only), **no Form 990** (the diocese is exempt as a religious organization), and no published tuition history.' },
    ],
    checklist: [
      'Are we a participating Catholic family for tuition purposes — and what exactly does the parish require to qualify?',
      'What did Family Individualized Tuition actually award families like ours last year? The diocese publishes no per-school aid figures.',
      'My child wants AP courses — what does the application for each course weigh, and how many applicants are turned away?',
      'AP exams are mandatory here. What happens to a student who takes an AP course and does poorly on the exam?',
      'How does the counseling office split 324 seniors six ways — is a counselor assigned by alphabet, by grade, or followed through four years?',
      'What does the Options Program actually provide day to day, and who staffs the support behind those courses?',
      'The band performs in Dublin every four years — what does a family pay for that, and when is the next one?',
      'Which sports hold separate fall and spring signing days, and where are those results published?',
    ],
    flags: [],
    sources: [
      { label: 'charlottecatholic.org — School Profile 2025-2026 (PDF)', url: PROFILE },
      { label: 'discovermacs.org — Tuition & Affordability', url: 'https://www.discovermacs.org/admissions/tuitionandaffordability' },
    ],
  },
}
