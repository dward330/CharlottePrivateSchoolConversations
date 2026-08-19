// Gaston Day School — the six College Support cards.
//
// Gaston Day publishes an unusually complete Academic Profile for a school of
// 510: a five-year ACT/SAT series, a five-year AP 3+ series, a full GPA-quintile
// table, a grade-distribution-by-department table, a four-year merit-scholarship
// ledger, and a ~250-institution acceptance list spanning 2019–2025. Every one
// of the six cards therefore renders with real data behind each sub-block.
//
// Every figure is transcribed from the school's OWN published materials —
// chiefly the Academic Profile 2025-2026 PDF and the College Counseling and
// Upper School pages. See source-material/college-support/gaston-day/ for the
// hard data, source URLs and gap notes.
//
// Three things worth knowing before editing:
//
//  1. The school does NOT publish percentiles — it publishes the mid-50% range.
//     The mid-50% endpoints ARE the 25th and 75th, so those columns are real;
//     the 10th, 50th and 90th render as '—' rather than being invented.
//  2. The acceptance list's bold styling (marking Class of 2025 enrollments) does
//     not survive pdftotext extraction, so NO college carries `enrolling`. That
//     is a transcription limit, stated on the card, not an absence of data.
//  3. The counselor caseload is COMPUTED, not published — 35 seniors over two
//     counselors. It is flagged and qualified rather than presented as a
//     school-stated figure.

import type { CollegeSupportProgram } from '../collegeSupport.ts'

const PROFILE =
  'https://www.gastonday.org/wp-content/uploads/2025/09/New-GDS-Profile-25-26.pdf'
const COUNSELING = 'https://www.gastonday.org/collegecounseling/'
const UPPER = 'https://www.gastonday.org/upper-school/'

/* The 2019–2025 acceptance list exactly as printed on the Academic Profile —
   231 distinct institutions. Buckets are scored against the 2026 U.S. News
   tables and the shared Power Four / HBCU rosters in
   source-material/college-support/_shared/. Rank labels are NOT stored here:
   they resolve from the master COLLEGE_RANKINGS table at render time.
   `University of California (Berkeley` and the asterisk on Bowling Green are
   reproduced verbatim from the source PDF — figures and names are copied
   char-for-char, never normalised. */
const colleges = [
  { name: 'American Musical and Dramatic Academy', cats: [] },
  { name: 'American University', cats: [] },
  { name: 'Anderson University', cats: [] },
  { name: 'Appalachian State University', cats: [] },
  { name: 'Arizona State University', cats: ['p4'] },
  { name: 'Auburn University', cats: ['p4'] },
  { name: 'Augusta University', cats: [] },
  { name: 'Ave Maria University', cats: [] },
  { name: 'Babson College', cats: [] },
  { name: 'Baylor University', cats: ['p4'] },
  { name: 'Belmont Abbey College', cats: [] },
  { name: 'Belmont University', cats: [] },
  { name: 'Berry College', cats: [] },
  { name: 'Boston University', cats: ['nu75'] },
  { name: 'Bowling Green State University (Main Campus)*', cats: [] },
  { name: 'Bradley University', cats: [] },
  { name: 'Brandeis University', cats: [] },
  { name: 'Brevard College', cats: [] },
  { name: 'Bridgewater College', cats: [] },
  { name: 'Bryn Mawr College', cats: ['lac75'] },
  { name: 'Bucknell University', cats: ['lac75'] },
  { name: 'Butler University', cats: [] },
  { name: 'Campbell University', cats: [] },
  { name: 'Carnegie Mellon University', cats: ['nu75'] },
  { name: 'Case Western Reserve University', cats: ['nu75'] },
  { name: 'Catawba College', cats: [] },
  { name: 'Centre College', cats: ['lac75'] },
  { name: 'Charleston Southern University', cats: [] },
  { name: 'Chowan University', cats: [] },
  { name: 'Citadel Military College of South Carolina', cats: [] },
  { name: 'Clemson University', cats: ['nu75', 'p4'] },
  { name: 'Coastal Carolina University', cats: [] },
  { name: 'Coker University', cats: [] },
  { name: 'Colby College', cats: ['lac75'] },
  { name: 'College of Charleston', cats: [] },
  { name: 'Colorado College', cats: ['lac75'] },
  { name: 'Colorado School of Mines', cats: [] },
  { name: 'Concordia University (Nebraska)', cats: [] },
  { name: 'Dartmouth College', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Davidson College', cats: ['lac75'] },
  { name: 'Delta State University', cats: [] },
  { name: 'Denison University', cats: ['lac75'] },
  { name: 'DePauw University', cats: ['lac75'] },
  { name: 'Dickinson College', cats: ['lac75'] },
  { name: 'Drake University', cats: [] },
  { name: 'Drexel University', cats: [] },
  { name: 'Duke University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'East Carolina University', cats: [] },
  { name: 'East Tennessee State University', cats: [] },
  { name: 'Eckerd College', cats: [] },
  { name: 'Elon University', cats: [] },
  { name: 'Embry-Riddle Aeronautical University (Daytona Beach)', cats: [] },
  { name: 'Emerson College', cats: [] },
  { name: 'Emory & Henry College', cats: [] },
  { name: 'Emory University', cats: ['nu75'] },
  { name: 'Florida Gulf Coast University', cats: [] },
  { name: 'Florida State University', cats: ['nu75', 'p4'] },
  { name: 'Franklin & Marshall College', cats: ['lac75'] },
  { name: 'Furman University', cats: ['lac75'] },
  { name: 'Gardner-Webb University', cats: [] },
  { name: 'George Washington University', cats: [] },
  { name: 'Georgetown University', cats: ['ivyplus', 'nu75'] },
  { name: 'Greensboro College', cats: [] },
  { name: 'Grinnell College', cats: ['lac75'] },
  { name: 'Guilford College', cats: [] },
  { name: 'Hampden-Sydney College', cats: [] },
  { name: 'Hampton University', cats: ['hbcu'] },
  { name: 'Hawaii Pacific University', cats: [] },
  { name: 'High Point University', cats: [] },
  { name: 'Hollins University', cats: [] },
  { name: 'Indiana University (Bloomington)', cats: [] },
  { name: 'James Madison University', cats: [] },
  { name: 'Johns Hopkins University', cats: ['ivyplus', 'nu75'] },
  { name: 'Johnson & Wales University (Providence)', cats: [] },
  { name: 'Kenyon College', cats: ['lac75'] },
  { name: 'King\'s College London', cats: [] },
  { name: 'Lee University', cats: [] },
  { name: 'Lees-McRae College', cats: [] },
  { name: 'Lehigh University', cats: ['nu75'] },
  { name: 'Lenoir-Rhyne University', cats: [] },
  { name: 'Liberty University', cats: [] },
  { name: 'Lincoln Memorial University', cats: [] },
  { name: 'Louisiana State University', cats: ['p4'] },
  { name: 'Loyola University Chicago', cats: [] },
  { name: 'Lynn University', cats: [] },
  { name: 'Marion Military Institute', cats: [] },
  { name: 'Marquette University', cats: [] },
  { name: 'Mary Baldwin University', cats: [] },
  { name: 'Maryland Institute College of Art', cats: [] },
  { name: 'Mercer University', cats: [] },
  { name: 'Meredith College', cats: [] },
  { name: 'Michigan State University', cats: ['nu75', 'p4'] },
  { name: 'Middle Tennessee State University', cats: [] },
  { name: 'Middlebury College', cats: ['lac75'] },
  { name: 'Minneapolis College of Art and Design', cats: [] },
  { name: 'Missouri University of Science and Technology', cats: [] },
  { name: 'Montreat College', cats: [] },
  { name: 'Morehead State University', cats: [] },
  { name: 'Mount Ida Campus of UMass Amherst', cats: [] },
  { name: 'New York University', cats: ['nu75'] },
  { name: 'Newberry College', cats: [] },
  { name: 'North Carolina A & T State University', cats: ['hbcu'] },
  { name: 'North Carolina Central University', cats: ['hbcu'] },
  { name: 'North Carolina State University', cats: ['nu75', 'p4'] },
  { name: 'Northeastern University', cats: ['nu75'] },
  { name: 'Pace University (New York City)', cats: [] },
  { name: 'Palm Beach Atlantic University', cats: [] },
  { name: 'Penn State University (University Park)', cats: [] },
  { name: 'Pepperdine University', cats: [] },
  { name: 'Presbyterian College', cats: [] },
  { name: 'Purdue University (Main Campus)', cats: ['nu75', 'p4'] },
  { name: 'Queens University of Charlotte', cats: [] },
  { name: 'Rensselaer Polytechnic Institute', cats: [] },
  { name: 'Rhode Island School of Design', cats: [] },
  { name: 'Rhodes College', cats: ['lac75'] },
  { name: 'Rice University', cats: ['nu75'] },
  { name: 'Roanoke College', cats: [] },
  { name: 'Rollins College', cats: [] },
  { name: 'Saint Louis University', cats: [] },
  { name: 'Salem College', cats: [] },
  { name: 'Samford University', cats: [] },
  { name: 'Santa Clara University', cats: [] },
  { name: 'Savannah College of Art and Design', cats: [] },
  { name: 'School of the Art Institute of Chicago', cats: [] },
  { name: 'School of Visual Arts', cats: [] },
  { name: 'Seton Hall University', cats: [] },
  { name: 'Sewanee: The University of the South', cats: ['lac75'] },
  { name: 'Skidmore College', cats: ['lac75'] },
  { name: 'Soka University of America', cats: [] },
  { name: 'Southern Methodist University', cats: ['p4'] },
  { name: 'St. Andrews University', cats: [] },
  { name: 'St. Bonaventure University', cats: [] },
  { name: 'St. Lawrence University', cats: [] },
  { name: 'Stanford University', cats: ['ivyplus', 'nu75', 'p4'] },
  { name: 'Stony Brook University', cats: [] },
  { name: 'SUNY at Binghamton', cats: ['nu75'] },
  { name: 'Swarthmore College', cats: ['lac75'] },
  { name: 'Sweet Briar College', cats: [] },
  { name: 'Syracuse University', cats: ['nu75', 'p4'] },
  { name: 'Temple University', cats: [] },
  { name: 'Texas A&M University', cats: ['nu75', 'p4'] },
  { name: 'The College of William and Mary', cats: [] },
  { name: 'The New School', cats: [] },
  { name: 'The Ohio State University (Main Campus)', cats: ['nu75', 'p4'] },
  { name: 'The University of Alabama', cats: ['p4'] },
  { name: 'The University of Montana', cats: [] },
  { name: 'The University of Texas at Dallas', cats: [] },
  { name: 'Tougaloo College', cats: ['lac75', 'hbcu'] },
  { name: 'Towson University', cats: [] },
  { name: 'Transylvania University', cats: [] },
  { name: 'Tufts University', cats: ['nu75'] },
  { name: 'Tulane University of Louisiana', cats: [] },
  { name: 'Underwood International College, Yonsei University', cats: [] },
  { name: 'United States Military Academy at West Point', cats: ['lac75'] },
  { name: 'University College London', cats: [] },
  { name: 'University of California (Berkeley', cats: [] },
  { name: 'University of California (Davis)', cats: [] },
  { name: 'University of California (Irvine)', cats: [] },
  { name: 'University of California (Los Angeles)', cats: [] },
  { name: 'University of California (Merced)', cats: [] },
  { name: 'University of California (Riverside)', cats: [] },
  { name: 'University of California (San Diego)', cats: [] },
  { name: 'University of California (Santa Barbara)', cats: [] },
  { name: 'University of California (Santa Cruz)', cats: [] },
  { name: 'University of Central Florida', cats: ['p4'] },
  { name: 'University of Colorado Boulder', cats: ['nu75', 'p4'] },
  { name: 'University of Connecticut', cats: ['nu75'] },
  { name: 'University of Denver', cats: [] },
  { name: 'University of Dubuque', cats: [] },
  { name: 'University of Florida', cats: ['nu75', 'p4'] },
  { name: 'University of Georgia', cats: ['nu75', 'p4'] },
  { name: 'University of Hawaii at Manoa', cats: [] },
  { name: 'University of Houston', cats: ['p4'] },
  { name: 'University of Illinois at Urbana-Champaign', cats: ['nu75', 'p4'] },
  { name: 'University of Kentucky', cats: ['p4'] },
  { name: 'University of Lynchburg', cats: [] },
  { name: 'University of Maryland', cats: ['nu75', 'p4'] },
  { name: 'University of Maryland (Baltimore County)', cats: [] },
  { name: 'University of Massachusetts (Amherst)', cats: [] },
  { name: 'University of Massachusetts (Boston)', cats: [] },
  { name: 'University of Melbourne', cats: [] },
  { name: 'University of Miami', cats: ['nu75', 'p4'] },
  { name: 'University of Michigan', cats: ['nu75', 'p4'] },
  { name: 'University of Mississippi', cats: ['p4'] },
  { name: 'University of Nebraska (Lincoln)', cats: [] },
  { name: 'University of Nevada (Las Vegas)', cats: [] },
  { name: 'University of North Carolina at Asheville', cats: [] },
  { name: 'University of North Carolina at Chapel Hill', cats: ['nu75', 'p4'] },
  { name: 'University of North Carolina at Charlotte', cats: [] },
  { name: 'University of North Carolina at Greensboro', cats: [] },
  { name: 'University of North Carolina at Pembroke', cats: [] },
  { name: 'University of North Carolina School of the Arts', cats: [] },
  { name: 'University of North Carolina Wilmington', cats: [] },
  { name: 'University of Notre Dame', cats: ['nu75', 'p4'] },
  { name: 'University of Pittsburgh (Main Campus)', cats: ['nu75', 'p4'] },
  { name: 'University of Rhode Island', cats: [] },
  { name: 'University of Richmond', cats: ['lac75'] },
  { name: 'University of Rochester', cats: ['nu75'] },
  { name: 'University of South Carolina', cats: ['p4'] },
  { name: 'University of South Carolina (Beaufort)', cats: [] },
  { name: 'University of South Florida (Main Campus)', cats: [] },
  { name: 'University of Southern California', cats: ['nu75', 'p4'] },
  { name: 'University of Sydney', cats: [] },
  { name: 'University of Tennessee (Knoxville)', cats: [] },
  { name: 'University of Toronto', cats: [] },
  { name: 'University of Tulsa', cats: [] },
  { name: 'University of Virginia (Main Campus)', cats: [] },
  { name: 'University of Washington (Seattle Campus)', cats: [] },
  { name: 'University of Wisconsin (Madison)', cats: [] },
  { name: 'University of Wisconsin (Superior)', cats: [] },
  { name: 'Utah State University', cats: [] },
  { name: 'Vanderbilt University', cats: ['nu75', 'p4'] },
  { name: 'Villanova University', cats: ['nu75'] },
  { name: 'Virginia Commonwealth University', cats: [] },
  { name: 'Virginia Polytechnic Institute and State University', cats: ['nu75', 'p4'] },
  { name: 'Wake Forest University', cats: ['nu75', 'p4'] },
  { name: 'Warren Wilson College', cats: [] },
  { name: 'Washington and Lee University', cats: ['lac75'] },
  { name: 'Wesleyan College', cats: [] },
  { name: 'West Virginia University', cats: ['p4'] },
  { name: 'West Virginia Wesleyan College', cats: [] },
  { name: 'Western Carolina University', cats: [] },
  { name: 'Western Michigan University', cats: [] },
  { name: 'Whitman College', cats: [] },
  { name: 'Wingate University', cats: [] },
  { name: 'Winston-Salem State University', cats: ['hbcu'] },
  { name: 'Winthrop University', cats: [] },
  { name: 'Wofford College', cats: ['lac75'] },
  { name: 'Xavier University', cats: [] },
  { name: 'Yale University', cats: ['ivy', 'ivyplus', 'nu75'] },
  { name: 'Young Harris College', cats: [] },]

export const gastonDay: CollegeSupportProgram = {
  /* The area's FIRST card. Unlike every other card here, these figures are
     GOVERNMENT-published — the UNC System's Insight dashboard, pulled via the
     nc-admissions-data skill — rather than the school’s own marketing number.
     Full per-term counts, the exact filter values and the provenance header are in
     source-material/college-support/gaston-day/
     Gaston Day School - College Support - UNC System Admissions.md.

     Every rate ships with its denominator: these are small cells, and a bare
     percentage off a single-digit base is not publishable. The five-year figure is
     POOLED — sum(admitted)/sum(applied) over the five most recent terms — never the
     mean of the five annual rates. */
  ncAdmissions: {
    headline:
      'Across the six top-ranked NC public universities, Gaston Day School’s applicants were admitted at a pooled 57.9% over the last five entering classes — 140 acceptances from 242 applications.',
    subhead:
      'UNC-Chapel Hill is the hard one: 29.6% pooled there, against far higher rates at the less-selective campuses. These are UNC-system figures published by the state, not the school’s own.',
    stats: [
      { value: '242', label: 'applications to the six campuses, Fall 2021–2025' },
      { value: '57.9%', label: 'pooled admit rate — 140 of 242 across those five classes' },
      { value: '29.6%', label: 'at UNC-Chapel Hill — 21 of 71, the most selective of the six' },
      { value: 'NC State University', label: 'drew the most applications in Fall 2025 (15)' },
    ],
    universities: [
      {
        key: 'unc-chapel-hill',
        name: 'UNC-Chapel Hill',
        rank: 1,
        note: 'Flagship · the most selective of the six',
        applied: '11',
        accepted: '3',
        rate: '27.3%',
        ratePct: 0.273,
        fiveYearRate: '29.6%',
        fiveYearApplied: '71',
        fiveYearAccepted: '21',
      },
      {
        key: 'nc-state-university',
        name: 'NC State University',
        rank: 2,
        note: 'Flagship STEM · Raleigh',
        applied: '15',
        accepted: '7',
        rate: '46.7%',
        ratePct: 0.467,
        fiveYearRate: '50.0%',
        fiveYearApplied: '76',
        fiveYearAccepted: '38',
      },
      {
        key: 'unc-charlotte',
        name: 'UNC Charlotte',
        rank: 3,
        note: 'Hometown campus',
        applied: '7',
        accepted: '6',
        rate: '85.7%',
        ratePct: 0.857,
        fiveYearRate: '88.6%',
        fiveYearApplied: '35',
        fiveYearAccepted: '31',
      },
      {
        key: 'east-carolina-university',
        name: 'East Carolina University',
        rank: 4,
        note: 'Greenville · largest admit rates of the six',
        applied: '4',
        accepted: '4',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '100.0%',
        fiveYearApplied: '17',
        fiveYearAccepted: '17',
      },
      {
        key: 'unc-wilmington',
        name: 'UNC Wilmington',
        rank: 5,
        note: 'Coastal · mid-selectivity',
        applied: '8',
        accepted: '6',
        rate: '75.0%',
        ratePct: 0.75,
        fiveYearRate: '67.7%',
        fiveYearApplied: '31',
        fiveYearAccepted: '21',
      },
      {
        key: 'unc-greensboro',
        name: 'UNC Greensboro',
        rank: 6,
        note: 'Piedmont Triad',
        applied: '4',
        accepted: '4',
        rate: '100.0%',
        ratePct: 1,
        fiveYearRate: '100.0%',
        fiveYearApplied: '12',
        fiveYearAccepted: '12',
      },
    ],
    methodNote:
      'Read each row as a joint figure: the rate at which that university admitted this school’s applicants — not the university’s overall admit rate, and not a measure of the school’s own selectivity. Applied/Accepted are the Fall 2025 entering class; the 5-yr column pools Fall 2021–2025 as sum(accepted)/sum(applied), so a heavy year counts more than a light one. Counts travel with every rate because several cells are single-digit.',
    flags: [
      {
        kind: 'verify',
        text: 'Rank order follows the US News **National Universities** table for NC publics. That qualifier matters: Appalachian State is ranked in **Regional Universities South**, a different list, so “top 6 in NC” is not self-defining. Re-score when the next edition lands.',
      },
      {
        kind: 'gap',
        text: 'UNC-system campuses only — the dashboard covers the 16 public UNC institutions and nothing else. It says nothing about private or out-of-state destinations, so this complements the acceptance list rather than replacing it.',
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
      'Every AP student must sit the exam, and the share scoring 3+ has climbed five years running — 72% in 2021 to 95% in 2025.',
    subhead:
      'With no class rank, the profile hands admissions readers three substitutes at once: a published GPA-quintile table, a grade-distribution-by-department table, and stated AP-load maxima that define what "most rigorous" means here.',
    stats: [
      { value: '95%', label: 'of AP students scored 3+ in 2025 — up from 72% in 2021' },
      { value: '10', label: 'AP courses, counted from the profile’s own course table' },
      { value: 'No rank', label: 'a published GPA-quintile table stands in' },
      { value: '+1.0', label: 'GPA bonus for AP · +0.50 for Honors, on a 4.0 scale' },
    ],
    meritTitle: 'College merit scholarships won by graduating classes',
    merit: [
      { year: '2025', detail: '**21** students awarded · **$3.76 million** total' },
      { year: '2024', detail: '**20** students awarded · **$3.87 million** total' },
      { year: '2023', detail: '**25** students awarded · **$2.75 million** total' },
      { year: '2022', detail: '**23** students awarded · **$2.6 million** total' },
    ],
    meritNote:
      'These are college merit awards won by graduating seniors, not Gaston Day tuition scholarships — the school’s own Kimbrell awards are separate and appear in the Financial Aid area. The dollar total rose while the headcount fell (25 students/$2.75M in 2023 → 20/$3.87M in 2024), so the per-student average roughly doubled across those two classes.',
    depthTitle: 'Where the curriculum goes deepest',
    depth: [
      {
        label: 'Mathematics',
        text: 'The fullest AP pairing on offer — both **Calculus AB** and **Calculus BC**, atop Honors PreCalculus, Honors Calculus and Honors Statistics.',
      },
      {
        label: 'Science',
        text: '**AP Biology, AP Chemistry and AP Physics II**, with Honors Environmental Science and Honors Physics beneath them. Physics II as the AP (rather than Physics 1) implies a two-year sequence.',
      },
      {
        label: 'Computer science & engineering',
        text: '**AP Computer Science**, plus Honors Engineering and Honors Robotics as electives — feeding the VEX Robotics team that reached TSA VEX Nationals in 2023.',
      },
      {
        label: 'Dual enrollment',
        text: 'DE opens in the fall of grade 11; students may replace **up to two elective credits** with DE credit in each of grades 11 and 12. **Intro to Business (H)(DE)** is taught by Gaston Day faculty. DE grades are **not** calculated into the GPA.',
      },
      {
        label: 'Beyond the classroom',
        text: 'A **Capstone Project of at least 40 hours** is required of every senior — internship, research or service — beginning in the second semester of junior year and reported on throughout.',
      },
    ],
    trustTitle: 'How the grade is engineered to be read',
    trust: [
      {
        label: 'Weighted, on a stated scale',
        text: 'A 4.0 scale with a published band table (100–97 = 4.330 down to 62–60 = 0.670); **Honors +0.50, AP +1.0**. Only GDS coursework counts — outside courses appear on the transcript but are excluded from the GPA.',
      },
      {
        label: 'No rank → a quintile table',
        text: 'The profile publishes all five GPA quintiles for the Class of 2026 at the end of junior year, so a reader can place any applicant within the class without a single #1.',
      },
      {
        label: '“Most rigorous” is defined',
        text: 'Published AP maxima — **one AP in grade 10, three in each of grades 11 and 12** — tell colleges exactly what the most demanding schedule looks like here, so a normal six-course load is not read as thin.',
      },
      {
        label: 'Grade distribution is published by department',
        text: 'A 2024-25 table gives the A+/A/A-…D spread for English, Arts, History, Math, Science and Languages — an unusual disclosure that lets a reader calibrate a GDS grade against its own department.',
      },
    ],
    flags: [
      {
        kind: 'discrepancy',
        text: 'AP course count: the profile’s own course table marks **10** AP courses, while Private School Review lists **9** — its list omits Chemistry, which the profile marks (H)(AP). The school’s own table is used.',
      },
      {
        kind: 'gap',
        text: 'The profile publishes no per-subject AP score table, no count of AP exams sat, and no National Merit ledger — so the 3+ rate is a single school-wide figure per year rather than a distribution.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (AP series, GPA quintiles, grading scale, course table, merit ledger)', url: PROFILE },
      { label: 'gastonday.org — Upper School (credit requirements, makerspace, testing)', url: UPPER },
    ],
  },

  counseling: {
    headline:
      'Two counselors for a graduating class of 35 — roughly 18 seniors each — with the four-year sequence starting in eighth grade rather than eleventh.',
    subhead:
      'The office runs on SCOIR, publishes exactly when transcripts go out, and states up front that it will report Honor Code violations when a college asks.',
    stats: [
      { value: '~18:1', label: 'seniors per counselor — computed from 35 seniors, not published' },
      { value: '2', label: 'college counselors — Director plus Assistant' },
      { value: '35', label: 'seniors in the Class of 2026' },
      { value: 'SCOIR', label: 'platform linking student, family, counselor and college' },
    ],
    roster: [
      {
        role: 'Director',
        name: 'Peter Gangemi',
        detail: 'Director of College Counseling · ext. 727',
      },
      {
        role: 'Assistant',
        name: 'Kristy Smith',
        detail: 'College Counseling Assistant · ext. 208',
      },
    ],
    timelineTitle: 'The counseling sequence — it starts in eighth grade',
    timeline: [
      {
        grade: '8',
        intensity: 'Earliest start on the roster',
        items: ['Individual meetings to build a **preliminary four-year course plan**'],
        note: 'Course planning precedes college planning by four years',
      },
      {
        grade: '9',
        intensity: 'Light touch',
        items: ['Plan expansion — personal development goals', 'Co-curricular focus', '**PSAT required**'],
        note: 'An "initial look at the college process timeline"',
      },
      {
        grade: '10',
        intensity: 'Building',
        items: ['Continued plan expansion and co-curricular focus', '**PSAT required**', 'One-day leadership workshop (grades 9–10)'],
        note: 'AP load capped at one course this year',
      },
      {
        grade: '11',
        intensity: 'In earnest',
        items: ['**Personal statement and essay preparation**', 'College exploration through **on-campus college visits**', '**PSAT and ACT both required**'],
        note: 'Capstone Project begins in the second semester',
      },
      {
        grade: '12',
        intensity: 'Intensive',
        items: ['The college application process', 'The **scholarship application process**', 'Final selection of college or university'],
        note: 'Capstone completes in the first semester',
      },
    ],
    mechanicsTitle: 'What the office states it owns',
    mechanics: [
      'Applications',
      'Personal statements & essays',
      'Scholarship applications',
      'Transcript despatch',
      'Honor Code reporting',
      'Final college selection',
    ],
    mechanicsNote:
      'Transcript practice is published rather than implied: initial transcripts carry grades through the end of junior year plus senior-year courses; Early Decision transcripts with interim first-semester grades go out in late November **by request only**; midyear transcripts go out in early January for everything else.',
    reachTitle: 'Reach and tools',
    reach: [
      '**SCOIR** — the counseling platform linking student, family, counselor and college',
      'A published **GDS Student Profile** document supporting each application',
      '**On-campus college visits** during junior year',
      'Membership of **NACAC** and **ACCIS**, the two college-counseling professional bodies',
      'Accreditation via **Cognia/SACS CASI**, with **NCAIS, SAIS and NAIS** membership',
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The ~18:1 caseload is **computed, not published** — 35 seniors over two counselors. Kristy Smith is titled Assistant/College Counseling Assistant, so a stricter reading (35 seniors over the one Director) gives 35:1. Neither figure is stated by the school.',
      },
      {
        kind: 'gap',
        text: 'The school publishes no counselor tenure, credentials or prior admissions-side experience, no count of college representatives hosted per year, and no named essay-workshop or bootcamp programme.',
      },
    ],
    sources: [
      { label: 'gastonday.org — College Counseling (roster, grade-by-grade sequence, SCOIR)', url: COUNSELING },
      { label: 'gastonday.org — Academic Profile 2025-2026 (senior count, reporting practice, Honor Code, memberships)', url: PROFILE },
    ],
  },

  outcomes: {
    headline:
      '95% of the Class of 2025 went straight to a four-year college, and the 2019–2025 acceptance list runs to 231 institutions — Yale and Dartmouth through Stanford, Duke and Johns Hopkins.',
    subhead:
      'A list this long from classes of ~35 means most of it is breadth rather than concentration: it is the set of places Gaston Day students have been admitted over seven years, not where any one class landed.',
    stats: [
      { value: '95%', label: 'of the Class of 2025 attending four-year colleges' },
      { value: '231', label: 'distinct institutions accepted, 2019–2025' },
      { value: '$3.76M', label: 'college merit scholarships, Class of 2025 (21 students)' },
      { value: '~100%', label: 'of classes historically entering four-year colleges' },
    ],
    bucketsTitle: 'How the list scores against the selectivity tiers',
    buckets: [
      { tier: 'Ivy League', count: '2 / 8', note: '— Yale and Dartmouth' },
      { tier: '“Ivy Plus”', count: '6 / 17', note: '— adds Stanford, Duke, Johns Hopkins, Georgetown' },
      { tier: 'Top-75 National Universities', count: '41 / 75' },
      { tier: 'Top-75 Liberal Arts', count: '23 / 75', note: '— incl. Swarthmore, Middlebury, Davidson, Colby, Bryn Mawr' },
      { tier: 'Power Four', count: '36 / 68' },
      { tier: 'HBCUs', count: '5 / 107', note: '— Hampton, NC A&T, NC Central, Winston-Salem State, Tougaloo' },
    ],
    bucketsNote:
      'Scored across the whole 2019–2025 window against the 2026 U.S. News tables, so these are seven-year cumulative counts, not one class. Specialty art schools on the list (RISD, SCAD, School of Visual Arts, MICA, School of the Art Institute of Chicago, Minneapolis College of Art and Design) and foreign universities (UCL, King’s College London, Toronto, Melbourne, Sydney, Yonsei) hold no U.S. News National or Liberal Arts rank and so score in no bucket — an absence of a label, not of selectivity.',
    collegesTitle: 'Every acceptance, 2019–2025',
    colleges,
    collegesTotal: '231 institutions',
    scholarshipsTitle: 'Merit scholarships won, by class',
    scholarships: [
      '2025 — $3.76M / 21 students',
      '2024 — $3.87M / 20 students',
      '2023 — $2.75M / 25 students',
      '2022 — $2.6M / 23 students',
    ],
    scholarshipsNote:
      'College merit awards won by graduating seniors. Against a class of ~35, the 2025 figure works out to well over $100K per awarded student — but note the school does not publish how many of the class applied for or received any award beyond these counts.',
    caveat:
      'This is an acceptance list, not a matriculation list. The profile bolds the institutions Class of 2025 members actually enrolled at, but that bold styling does not survive PDF text extraction — so no college here is marked as enrolling, and the list should be read as "admitted somewhere in this set over seven years" rather than "the class went here".',
    flags: [
      {
        kind: 'gap',
        text: 'The school publishes no matriculation counts, no per-college enrollment numbers and no year-by-year acceptance breakdown — the list is a single undifferentiated 2019–2025 set.',
      },
      {
        kind: 'verify',
        text: 'Enrolled-vs-accepted cannot be recovered from the published PDF by text extraction, since the distinction is carried in bold styling alone. Reading the original PDF visually would recover it.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (acceptance list, four-year rate, merit ledger)', url: PROFILE },
      { label: 'Buckets scored against source-material/college-support/_shared/ (US News 2026 rank labels, Power Four membership, HBCU roster)' },
    ],
  },

  edge: {
    headline:
      'The spike here is unusually concrete for a small school: a gold-medal iGEM synthetic-biology team, a VEX Robotics squad that reached TSA Nationals in its first year, and a required 40-hour Capstone every senior must defend.',
    subhead:
      'What the school cannot offer is name recognition at scale — Gaston Day is a 510-student school in Gastonia, not a nationally-known feeder, so the leverage argument rests on distinctiveness rather than volume.',
    levers: [
      {
        title: 'Lever 1 — Build the spike',
        hint: 'what a student can actually point at',
        glyph: '◆',
        items: [
          '**iGEM synthetic biology** — teams in 2012, 2016, 2018 and 2020, with a **gold medal** and projects including a kudzu phytotoxin and an *E. coli* K-12 isobutanol biofuel. iGEM is a university-level competition with a high-school track; fielding one from a school this size is rare.',
          '**VEX Robotics** — after years in a joint-school FIRST Robotics team that placed **4th at state**, Gaston Day launched its own team and **qualified for TSA VEX Nationals in 2023, its first year competing**.',
          '**Capstone Project** — every senior completes an internship, research or service project of **at least 40 hours**, documented and reported on across a full year. It is a requirement, so every applicant has one.',
          '**Sunship Earth peer mentoring** — juniors and seniors lead the fourth-grade class through a multi-day mountain programme, then mentor the same child for the rest of the year. A sustained leadership commitment rather than a one-off.',
          '**Blutopia** — the student-run literary and art magazine, with **numerous Scholastic Art and Writing Awards** and repeated recognition in the NC Scholastic Media Association Literary Magazine Contest.',
          '**President’s Service Award** for 100+ service hours, atop a 25-hour annual requirement (40 for NHS).',
        ],
      },
      {
        title: 'Lever 2 — The school’s leverage',
        hint: 'what the name itself does',
        glyph: '▲',
        items: [
          '**Accreditation and memberships that a reader recognises** — Cognia/SACS CASI, NCAIS, SAIS, NAIS, plus NACAC and ACCIS on the counseling side.',
          '**A profile built for admissions readers** — quintiles, a department-level grade distribution, defined AP maxima and published transcript timing all make a GDS record easy to interpret, which is leverage of a quieter kind.',
          '**An international cohort and a Global Classroom Initiative** — partnerships with overseas schools for grades 10–12 and a documented homestay programme, giving the applicant pool a genuinely international character.',
          '**A five-county draw** — Gaston, Lincoln, Cleveland, Mecklenburg and York counties, so the school is regionally rather than locally known.',
        ],
        note:
          'The school publishes no evidence of admissions-office relationships, no counts of college representative visits, and no alumni-network claims — so institutional leverage is inferred from accreditation and profile quality rather than demonstrated.',
      },
    ],
    flags: [
      {
        kind: 'verify',
        text: 'The iGEM gold medal is third-party-confirmed: the iGEM team wikis return 403 to automated fetches, so the medal level was not re-verified at source in this pass. Team participation in 2012, 2016, 2018 and 2020 is confirmed by the archived team pages.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (signature learning experiences, robotics, Capstone, Blutopia)', url: PROFILE },
      { label: 'gastonday.org — Upper School (President’s Service Award, leadership, clubs)', url: UPPER },
      { label: 'iGEM team archives — 2020.igem.org/Team:Gaston_Day_School', url: 'https://2020.igem.org/Team:Gaston_Day_School' },
    ],
  },

  wholeClass: {
    headline:
      'A class of 35 with a published five-year test series and all five GPA quintiles — enough to see the whole class, not just its top.',
    subhead:
      'The bottom fifth sits at 2.5–3.05 and the top at 4.3–4.74, so the spread is real and the school publishes it rather than leading with a single average.',
    scoreTables: [
      {
        title: 'SAT score ranges',
        hint: 'mid-50% as published — the endpoints ARE the 25th and 75th percentiles',
        rows: [
          { label: 'SAT total — 2025', values: ['—', '1190', '—', '1330', '—', '—'] },
          { label: 'SAT EBRW — 2025', values: ['—', '630', '—', '690', '—', '—'] },
          { label: 'SAT Math — 2025', values: ['—', '580', '—', '670', '—', '—'] },
          { label: 'SAT total — 2024', values: ['—', '1210', '—', '1370', '—', '—'] },
          { label: 'SAT total — 2023', values: ['—', '1060', '—', '1290', '—', '—'] },
          { label: 'SAT total — 2022', values: ['—', '1110', '—', '1310', '—', '—'] },
          { label: 'SAT total — 2021', values: ['—', '1120', '—', '1390', '—', '—'] },
        ],
        note: 'The school publishes only the middle 50%, so the 10th, 50th and 90th columns are shown as “—” rather than interpolated. Five years are given because the class is small enough that any single year swings hard — 2023 (1060–1290) and 2021 (1120–1390) bracket a 100-point range at the top end.',
      },
      {
        title: 'ACT composite ranges',
        hint: 'mid-50% composite, five-year series',
        rows: [
          { label: 'ACT composite — 2025', values: ['—', '22', '—', '28', '—', '—'] },
          { label: 'ACT composite — 2024', values: ['—', '24', '—', '31', '—', '—'] },
          { label: 'ACT composite — 2023', values: ['—', '22', '—', '28', '—', '—'] },
          { label: 'ACT composite — 2022', values: ['—', '21', '—', '28', '—', '—'] },
          { label: 'ACT composite — 2021', values: ['—', '24', '—', '32', '—', '—'] },
        ],
        note: 'All grade-11 students are required to take the ACT, so this range covers the whole class rather than a self-selected group of testers — an important difference from a school where only the college-bound test.',
      },
    ],
    gpaTitle: 'Cumulative GPA distribution',
    gpaHint: 'Class of 2026 · end of junior year · weighted 4.0 scale',
    quintiles: [
      { label: '1st Quintile', gpa: '4.3 -4.74' },
      { label: '2nd Quintile', gpa: '4.0 - 4.27' },
      { label: '3rd Quintile', gpa: '3.61 - 3.95' },
      { label: '4th Quintile', gpa: '3.09 - 3.57' },
      { label: '5th Quintile', gpa: '2.5 - 3.05' },
    ],
    gpaNote:
      'Published as ranges rather than quintile means, and the ranges are reproduced exactly as printed. Because Honors adds +0.50 and AP +1.0, a top-quintile GPA above 4.0 reflects course weighting as much as raw grades. Note the school states grades 10–12 must hold a cumulative 2.0 in core courses, so the bottom of the fifth quintile sits well clear of the academic-standing floor.',
    supportTitle: 'If a student learns differently',
    support: [
      { label: 'Learning Academy', text: 'A **Coordinate Program** for students with diagnosed learning disabilities, running alongside the standard curriculum.' },
      { label: 'Intervention', text: '**Early Reading and Math Intervention** in the Lower School, so support is not only a secondary-school offering.' },
      { label: 'Therapies on site', text: '**Speech and Language Therapy** and **Occupational Therapy** are provided at school.' },
      { label: 'Coaching', text: '**Academic Coaching** and tutoring, plus a paid on-site summer tutoring programme open to non-students at $30/half-hour.' },
      { label: 'World language exception', text: 'International students for whom English is a second language are **not required** to take an additional world language — a documented accommodation within the graduation requirements.' },
    ],
    supportNote:
      'The school does not publish how many students use the Coordinate Program, what it costs, whether there is an admissions requirement, or how testing accommodations are documented with the College Board and ACT.',
    middleTitle: 'If a student is in the middle',
    middle: [
      { label: 'Everyone gets an advisor', text: 'Every Upper School student is assigned a faculty advisor matched to their interests and needs, who **stays with them through graduation** — continuity that does not depend on being a top student.' },
      { label: 'Everyone gets the counselor', text: 'With ~18 seniors per counselor, the office reaches the whole class rather than triaging to the strongest applicants.' },
      { label: 'A six-course load, not a race', text: 'AP access is deliberately capped (1 in grade 10, 3 in grades 11 and 12), so the transcript ceiling is defined and a moderate load is normal rather than remedial.' },
      { label: 'Non-AP rigour exists', text: 'A broad Honors tier sits below the AP courses across every department, plus dual enrollment from grade 11 for students who want college credit without an AP exam.' },
      { label: 'A required spike for everyone', text: 'The 40-hour Capstone and the 25-hour annual service requirement mean every graduate has something concrete to write about, not only the students who sought it out.' },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'No tester counts are published for any year, so it is not possible to tell what share of a ~35-student class sat the SAT — a mid-50% range over a small n moves sharply with a few students.',
      },
      {
        kind: 'gap',
        text: 'The quintile table gives ranges only, with no mean SAT or ACT per quintile, so a reader cannot tie GPA band to test performance the way some peer profiles allow.',
      },
    ],
    sources: [
      { label: 'gastonday.org — Academic Profile 2025-2026 (five-year test series, GPA quintiles, grading scale)', url: PROFILE },
      { label: 'gastonday.org — Upper School (Learning Academy, advisory, testing requirements)', url: UPPER },
    ],
  },

  verdict: {
    headline:
      'A small school that publishes like a much larger one — five-year test and AP series, full GPA quintiles, a department-level grade distribution and a seven-year acceptance list.',
    subhead:
      'The reservations are about scale and disclosure, not quality: a 35-senior class makes every rate volatile, and the athletics and club rosters are thinner in public than the academic record.',
    points: [
      { label: 'The AP trend is real and rising', text: 'The 3+ rate went 72% → 76% → 86% → 89% → **95%** across 2021–2025, and because **every AP student must sit the exam**, that rate is not flattered by opting out.' },
      { label: 'Rank is replaced, not merely omitted', text: 'Most no-rank schools stop there. Gaston Day publishes a **five-band GPA quintile table**, a **grade distribution by department**, and **defined AP maxima** — three separate substitutes.' },
      { label: 'Counseling starts in eighth grade', text: 'Course planning begins four years before applications, and the ~18:1 senior caseload is among the lowest on this roster.' },
      { label: 'The spike is institutional', text: 'A **gold-medal iGEM** team, **TSA VEX Nationals in year one**, and a **required 40-hour Capstone** mean distinctiveness is built into the programme rather than left to the individual student.' },
      { label: 'The acceptance breadth is genuine', text: '**231 institutions** including Yale, Stanford, Dartmouth, Duke, Johns Hopkins and Georgetown, plus 23 top-75 liberal arts colleges — wide range for classes of ~35.' },
      { label: 'The money is disclosed', text: 'Four years of merit-scholarship totals are published — **$3.76M for 21 students in 2025** — where many schools publish none.' },
    ],
    checklist: [
      'With 35 seniors and two counselors, does Kristy Smith carry her own caseload, or is the ~18:1 figure really 35:1 against the Director?',
      'The acceptance list covers seven years — where did the last two graduating classes actually enroll, and in what concentrations?',
      'What share of a class sits the SAT versus the ACT, given the ACT is required in grade 11 and no tester counts are published?',
      'The AP cap is one course in grade 10 and three in grades 11–12 — how is that applied to a student who wants more, and does it ever get waived?',
      'What does the Learning Academy Coordinate Program cost, who qualifies, and how are College Board accommodations documented?',
      'The International Program runs through one exclusive agency (ABC Education Group) — what English-language support exists on campus for those students?',
      'Enrollment reads 510 on the school profile but 466 and 448 on third-party and federal sources — which counts preschool, and what is the Upper School number?',
    ],
    flags: [],
    sources: [
      { label: 'Verdict synthesized by the researcher from the sources cited on the cards above' },
    ],
  },
}
